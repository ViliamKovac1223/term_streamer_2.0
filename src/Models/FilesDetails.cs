public class FileDetails
{
    public string? file { get; }
    public string? directory { get; }

    public FileDetails(ArgParser argParser)
    {
        this.file = null;
        this.directory = null;

        // Get file path that is exposed to the web if possible
        if (!string.IsNullOrEmpty(argParser.file))
            this.file = Program.VID_URL_PATH + "/" + argParser.getFileName();

        // Get directory path that is exposed to the web if possible
        if (!string.IsNullOrEmpty(argParser.directory))
            this.directory = Program.VID_URL_PATH;
    }

}
