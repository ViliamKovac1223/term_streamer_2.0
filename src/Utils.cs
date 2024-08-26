public class Utils
{

    public static string getAbsolutePath(string path)
    {
        string currDirectory = Environment.CurrentDirectory;
        string combPath = System.IO.Path.Combine(currDirectory, path);
        string fullPath = Path.GetFullPath(combPath);

        return fullPath;
    }

}
