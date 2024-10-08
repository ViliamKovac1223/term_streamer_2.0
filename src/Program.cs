using Microsoft.Extensions.FileProviders;
using System.Reflection;

public class Program
{

    public const string VID_URL_PATH = "/vids";

    static void Main(string[] args)
    {
        Console.CancelKeyPress += new ConsoleCancelEventHandler(onExit);

        ArgParser argParser = new ArgParser(args);

        if (
                // If help flag is given print help menu and exit program
                argParser.isHelp
                // Or if neither file or directory flag were used print help menu and exit program
                || (string.IsNullOrEmpty(argParser.file)
                        && string.IsNullOrEmpty(argParser.directory))
                // Or if both file and directory flag were used exit the program
                || (!string.IsNullOrEmpty(argParser.file)
                        && !string.IsNullOrEmpty(argParser.directory)))
        {
            help();
            return;
        }

        // Check if file or directory is valid
        if (!string.IsNullOrEmpty(argParser.file) && !argParser.checkFileArgument())
        {
            Console.WriteLine("Given file doesn't exist.");
            return;
        }
        else if (!string.IsNullOrEmpty(argParser.directory) && !argParser.checkDirectoryArgument())
        {
            Console.WriteLine("Given directory doesn't exist.");
            return;
        }

        DirectoryDetails root;
        if (argParser.directory != null)
            root = new DirectoryDetails(argParser.directory,
                    argParser.directory,
                    DirectoryDetails.ROOT_DIRECTORY_NAME);
        else
            root = new DirectoryDetails("", "", "");

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddSingleton<ArgParser>(argParser);
        builder.Services.AddScoped<FileDetails>();
        builder.Services.AddSingleton<DirectoryDetails>(root);

        builder.WebHost.UseUrls($"http://*:{argParser.port}/");

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        // Get binary location
        string binaryLocation = Assembly.GetExecutingAssembly().Location;
        // Get a src directory relative to position of binary, it's 3 directory backwards
        string? srcDirectory = binaryLocation;
        for (int i = 0; i < 3; i++)
            srcDirectory = Utils.getParentDirectory(srcDirectory);
        if (srcDirectory == null)
        {
            Console.WriteLine("We couldn't locate wwwroot directory, make sure that binary is in original location. Never copy binary just link it.");
            return;
        }
        string wwwrootDirectory = srcDirectory + "wwwroot/";

        app.UseStaticFiles();
        app.UseFileServer(new FileServerOptions
        {
            FileProvider = new PhysicalFileProvider(wwwrootDirectory)
        });

        // Add file directory to the streamable directories
        if (!string.IsNullOrEmpty(argParser.file))
        {
            string? filePath = argParser.getPathToTheFile();
            if (!string.IsNullOrEmpty(filePath))
            {
                // Get full path from relative path
                string fullPath = Utils.getAbsolutePath(filePath);

                app.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(fullPath),
                    RequestPath = VID_URL_PATH
                });
            }
        }
        // Add directory to the streamable directories
        else if (!string.IsNullOrEmpty(argParser.directory))
        {
            // Get full path from relative path
            string fullPath = Utils.getAbsolutePath(argParser.directory);

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(fullPath),
                RequestPath = VID_URL_PATH
            });
        }

        app.Run();
    }

    private static void help()
    {
        Console.WriteLine("-h # print help menu");
        Console.WriteLine("-f <file> # file to stream");
        Console.WriteLine("-d <directory_with_video_files> # directory to stream from");
        Console.WriteLine($"-p <port> # port to stream on, default port is {ArgParser.DEFAULT_PORT}");
        Console.WriteLine("you have to use -f or -d flag");
    }

    private static void onExit(object? sender, ConsoleCancelEventArgs e)
    {
        Environment.Exit(0);
    }
}
