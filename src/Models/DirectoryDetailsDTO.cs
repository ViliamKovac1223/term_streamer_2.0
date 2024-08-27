public class DirectoryDetailsDTO
{
    public List<string>? files { get; }
    public List<string>? directories { get; }
    public string directoryPath { get; }
    public string? previousDirectory { get; }

    public DirectoryDetailsDTO(string directoryPath, List<string>? files,
            List<string>? directories, string? previousDirectory)
    {
        this.directoryPath = directoryPath;
        this.directories = directories;
        this.previousDirectory = previousDirectory;

        if (files != null && files.Count() != 0)
            this.files = files;
        else
            this.files = null;
    }
}
