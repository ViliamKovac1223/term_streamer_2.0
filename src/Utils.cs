public class Utils
{

    /// <summary>
    /// Get parent directory from given path.
    /// For example:
    /// "/path/to/file" -> "/path/"
    /// "/path/to/" -> "/path/"
    /// </summary>
    /// <param name="path">Given path.</param>
    /// <returns>Parent's path.</returns>
    public static string? getParentDirectory(string? path)
    {
        if (string.IsNullOrEmpty(path)) return null;
        int lastSlashIndex = path.LastIndexOf('/');

        // If there is no slash in the path, return null
        if (lastSlashIndex == -1) return null;

        // Remove the previously found slash
        path = path.Substring(0, lastSlashIndex);

        // Find and remove everything till second last slash
        lastSlashIndex = path.LastIndexOf('/');
        // If there is no second last slash, then return null;
        // because there is no parent folder.
        if (lastSlashIndex == -1) return null;
        return path.Substring(0, lastSlashIndex + 1);
    }

    public static string getAbsolutePath(string path)
    {
        string currDirectory = Environment.CurrentDirectory;
        string combPath = System.IO.Path.Combine(currDirectory, path);
        string fullPath = Path.GetFullPath(combPath);

        return fullPath;
    }

    public static string? getFileName(string? path)
    {
        if (string.IsNullOrEmpty(path)) return null;

        int lastSlashIndex = path.LastIndexOf('/');

        // If there is no slash in the file path, return entire file name
        if (lastSlashIndex == -1) return path;

        if (path.Length <= lastSlashIndex + 1) return null;

        return path.Substring(lastSlashIndex + 1);
    }

    public static string? getDirName(string? path)
    {
        if (string.IsNullOrEmpty(path)) return null;

        if (path.ElementAt(path.Length - 1) == '/')
            path.Remove(path.Length - 1);

        int lastSlashIndex = path.LastIndexOf('/');

        // If there is no slash in the file path, return entire file name
        if (lastSlashIndex == -1) return path;

        if (path.Length <= lastSlashIndex + 1) return null;

        return path.Substring(lastSlashIndex + 1);
    }

    public static string normalizePath(string path)
    {
        if (path.Last() == '/') return path;
        path += '/';
        return path;
    }

}
