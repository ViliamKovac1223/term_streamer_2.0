using Microsoft.AspNetCore.Mvc;

namespace term_streamer_2._0.Controllers;

[ApiController]
[Route("[controller]")]
public class FilesDetailsController : ControllerBase
{
    private FileDetails fileDetails;
    private DirectoryDetails root;

    public FilesDetailsController(FileDetails fileDetails, DirectoryDetails root)
    {
        this.fileDetails = fileDetails;
        this.root = root;
    }

    [HttpGet]
    public FileDetails Get()
    {
        return fileDetails;
    }

    [HttpGet("DirectoryDetails")]
    public DirectoryDetailsDTO? GetDirectory(string? path)
    {
        if (root.isEmptyDirectory()) return null;

        // If there is no given argument return DirectoryDetailsDTO from root path
        if (string.IsNullOrEmpty(path)) return root.getDirectoryDetailsDTO();

        // Otherwise return DirectoryDetailsDTO from given argument
        return root.getDirectoryDetailsDTO(path);
    }

}
