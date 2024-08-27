using LibGetoptLike;

public class ArgParser
{
    public bool isHelp { get; private set; }
    public string? file { get; private set; }
    public string? directory { get; private set; }
    public string port { get; private set; }

    public const string DEFAULT_PORT = "8080";

    public ArgParser(string[] args)
    {
        port = DEFAULT_PORT;
        GetoptLike getopt = new GetoptLike(args, "hf:d:p:");
        // Get a list of processed arguments
        List<GetoptArg> gArgs = getopt.gArgs;

        foreach (GetoptArg gArg in gArgs)
        {
            switch (gArg.shortFlag)
            {
                case "h":
                    isHelp = true;
                    break;
                case "f":
                    file = gArg.argument;
                    break;
                case "d":
                    directory = gArg.argument;
                    break;
                case "p":
                    if (!string.IsNullOrEmpty(gArg.argument))
                        port = gArg.argument;
                    break;
            }
        }
    }

    public bool checkFileArgument()
    {
        if (string.IsNullOrEmpty(file)) return false;

        return File.Exists(file);
    }

    public bool checkDirectoryArgument()
    {
        if (string.IsNullOrEmpty(directory)) return false;

        return Directory.Exists(directory);
    }

    public string? getPathToTheFile()
    {
        if (string.IsNullOrEmpty(file)) return null;

        int lastSlashIndex = file.LastIndexOf('/');

        // If there is no slash in the file path, return null
        if (lastSlashIndex == -1) return null;
        if (file.Length <= lastSlashIndex + 1) return null;

        return file.Substring(0, lastSlashIndex + 1);
    }

    public string? getFileName()
    {
        return Utils.getFileName(file);
    }

    public string? getFileExtension()
    {
        if (string.IsNullOrEmpty(file)) return null;
        int lastSlashIndex = file.LastIndexOf('/');
        int lastDotIndex = file.LastIndexOf('.');

        // If lastDotIndex is not valid return null
        if (lastDotIndex == -1 || lastDotIndex < lastSlashIndex) return null;
        if (file.Length <= lastDotIndex + 1) return null;

        return file.Substring(lastDotIndex + 1);
    }
}
