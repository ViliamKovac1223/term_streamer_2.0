using Microsoft.AspNetCore.Mvc;

namespace term_streamer_2._0.Controllers;

[ApiController]
[Route("[controller]")]
public class FilesDetailsController : ControllerBase
{
    private FileDetails fileDetails;
    public FilesDetailsController(FileDetails fileDetails)
    {
        this.fileDetails = fileDetails;
    }

    [HttpGet]
    public FileDetails Get()
    {
        return fileDetails;
    }

}
