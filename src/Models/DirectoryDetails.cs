public class DirectoryDetails
{
    public const string ROOT_DIRECTORY_NAME = ".";

    public string directoryPath { get; private set; }
    public string rootPath { get; private set; }
    public string directoryName { get; private set; }

    public List<string> files { get; private set; }
    public List<DirectoryDetails> directories { get; private set; }
    // if previousDirectory is null, it means that this is root directory
    public DirectoryDetails? previousDirectory { get; private set; }

    public DirectoryDetails(string directoryPath, string rootPath, string directoryName)
    {
        this.directoryPath = directoryPath;
        this.directoryName = directoryName;
        this.rootPath = rootPath;

        this.files = new List<string>();
        this.directories = new List<DirectoryDetails>();
        this.previousDirectory = null;

        // If we create empty directory then don't proceed with scanning directory
        if (this.isEmptyDirectory()) return;

        this.rootPath = Utils.normalizePath(this.rootPath);
        this.directoryPath = Utils.normalizePath(this.directoryPath);
        scanDirectory();
    }

    public DirectoryDetails(DirectoryDetails previousDirectory, string directoryPath, string rootPath, string directoryName)
        : this(directoryPath, rootPath, directoryName)
    {
        this.previousDirectory = previousDirectory;
    }

    public bool isEmptyDirectory()
    {
        return string.IsNullOrEmpty(directoryName)
            && string.IsNullOrEmpty(directoryPath)
            && string.IsNullOrEmpty(rootPath);
    }

    public DirectoryDetailsDTO getDirectoryDetailsDTO()
    {
        return getDirectoryDetailsDTOFromDirectoryPath(this.directoryPath)!;
    }

    public DirectoryDetailsDTO? getDirectoryDetailsDTO(string dtoPath)
    {
        string dirPath = getDirectoryPathFromDTOPath(dtoPath);
        return getDirectoryDetailsDTOFromDirectoryPath(dirPath);
    }

    private DirectoryDetailsDTO? getDirectoryDetailsDTOFromDirectoryPath(string directoryPath)
    {
        // If directoryPath isn't equal to this directory,
        // try one of its sub-directories.
        if (!directoryPath.Equals(this.directoryPath))
        {
            foreach (DirectoryDetails d in directories)
            {
                DirectoryDetailsDTO? tmpDto =
                    d.getDirectoryDetailsDTOFromDirectoryPath(directoryPath);

                if (tmpDto != null) return tmpDto;
            }

            return null;
        }

        // If directoryPath is equal to current directory, then create dto from this directory information

        // If previousDirectory is null then set it's name to null, otherwise use it's directoryName
        string? previousDirectoryName = previousDirectory == null ? null : previousDirectory.directoryName;
        // Convert previousDirectoryName into DTO previousDirectoryName
        // /rootPath/folder -> Program.VID_URL_PATH/folder
        if (previousDirectoryName != null)
            previousDirectoryName = Utils.normalizePath(getDTOPath(previousDirectoryName));

        // Get all sub directories into list that will go in DTO
        List<string> dirs = new List<string>();
        foreach (DirectoryDetails d in directories)
            dirs.Add(getDTOPath(d.directoryName));

        return new DirectoryDetailsDTO(getDTOPath(directoryPath), files, dirs, previousDirectoryName);
    }

    public string getDirectoryPathFromDTOPath(string dtoPath)
    {
        dtoPath = Utils.normalizePath(dtoPath);

        // NOTE: dirPath = rootPath + (Program.VID_URL_PATH - dtoPath)

        // If dtoPath isn't equal to first part of Program.VID_URL_PATH, return root path
        if (dtoPath.Length <= Program.VID_URL_PATH.Length) return rootPath;
        for (int i = 0; i < Program.VID_URL_PATH.Length; i++)
            if (dtoPath.ElementAt(i) != Program.VID_URL_PATH.ElementAt(i))
                return rootPath;

        return rootPath + dtoPath.Substring(Program.VID_URL_PATH.Length + 1);
    }

    private string getDTOPath(string path)
    {
        // NOTE: dtoPath = Program.VID_URL_PATH + (directoryPath - rootPath)

        // If rootPath isn't equal to first part of directoryPath, return default path
        if (path.Length < rootPath.Length) return Program.VID_URL_PATH;
        for (int i = 0; i < rootPath.Length; i++)
            if (path.ElementAt(i) != rootPath.ElementAt(i))
                return Program.VID_URL_PATH;

        return Program.VID_URL_PATH + "/" + path.Substring(rootPath.Length);
    }

    private void scanDirectory()
    {
        try
        {
            string[] tmpFiles = Directory.GetFiles(directoryPath);
            foreach (string tmpFile in tmpFiles)
            {
                string? fileName = Utils.getFileName(tmpFile);
                if (fileName != null)
                    files.Add(fileName);
            }

            string[] tmpDirs = Directory.GetDirectories(directoryPath);
            foreach (string dir in tmpDirs)
            {
                directories.Add(new DirectoryDetails(this, directoryPath + Utils.getDirName(dir), rootPath, dir));
            }
        }
        catch (DirectoryNotFoundException)
        {
            Console.WriteLine("Directory does not exist.");
            Console.WriteLine($"Directory path: {directoryPath}");
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine($"You don't have permission to access this directory ({directoryPath})");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error has occurred; {e.Message}");
        }
    }
}
