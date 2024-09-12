# Term_streamer_2.0
Term_streamer_2.0 is improvement on my old
[project](https://github.com/ViliamKovac1223/term-streamer), this rewrite is
made in C# and client side is made using react. Term_streamer_2.0 allows you to
stream video files from you terminal on your local network.

# Usage
Basic usage of term_streamer

```bash
cd src
dotnet build
./bin/Debug/net8.0/term-streamer_2.0 -f /path/to/the/video.mp4
```

# All command options
-h # print help menu

-f <file> # file to stream

-d <directory_with_video_files> # directory to stream from

-p <port> # port to stream on, default port is 8000

You have to use -f or -d flag

# Installation

## Install dependencies
First you'll need to download and install
[LibGetoptLike](https://github.com/ViliamKovac1223/LibGetoptLike), please refer
to the LibGetoptLike documentation on installation. You can easily install it
by cloning the repo inside the main project folder.

```bash
git clone https://github.com/ViliamKovac1223/LibGetoptLike.git
```

## Install program
Building the application from the source:

```bash
cd src
dotnet build
```

To build the frontend, go to the client folder, and run commands to install
frontend dependencies and building frontend.
```bash
cd ../client
npm install
npm run build
```

After building program you can link binary to the folder which is in the $PATH
variable.

```bash
cd ../src
ln -s $(pwd)/bin/Debug/net8.0/term-streamer_2.0 ~/.local/bin/term-streamer_2.0
```

# Fake internet money
If you like my work and want to support me by some fake internet money, here is
my monero address.

8AW9BM1E5d67kaX3SiAT6B91Xvn4urhBeGL3FUWezSkRarSmxrAfvUK5XD5VcasXStHT6aYXwjVMrhm4YCNXTqGpRUekQ6i
