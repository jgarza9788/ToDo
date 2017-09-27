VideoInfo
--------------
An Electron app that reads metadata about video files and displays it.
Version: v0.1

![https://github.com/jgarza9788/videoinfo/blob/master/docs/images/Screenshot_v0.1.png](https://raw.githubusercontent.com/jgarza9788/videoinfo/master/docs/images/Screenshot_v0.1.png)

<!-- TOC -->

- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
    - [node.js](#nodejs)
    - [npm](#npm)
    - [electron](#electron)
    - [ffmpeg](#ffmpeg)
- [Using](#using)
- [Troubleshooting](#troubleshooting)
    - [ffmpeg path](#ffmpeg-path)

<!-- /TOC -->

# Requirements

## node.js
[Download from Here](https://nodejs.org/en/download/)
**Use Terminal/CMD to see if you have it already** 
```
node --version
```

## npm
This can be installed with node.js
**Use Terminal/CMD to see if you have it already**
```
npm --version
```

## electron
**install using the code below in Terminal/CMD**
```
npm install -g electron
```

##ffmpeg
>FFmpeg is the leading multimedia framework, able to decode, encode, transcode, mux, demux, stream, filter and play pretty much anything that humans and machines have created.

[Download from Here](https://www.ffmpeg.org/download.html)


# Using

**make sure you have git installed and use this in Terminal/CMD**
```
# Clone this repository
git clone https://github.com/jgarza9788/videoinfo
# Go into the repository
cd videoinfo
# Install dependencies
npm install
# Run the app
npm start
```

# Troubleshooting

## ffmpeg path

In index.js line 37 the path to ffprobe.exe will need to be changed depending on your system and how you installed ffmpeg.

![https://github.com/jgarza9788/videoinfo/blob/master/docs/images/TS_ffmpegPath.png](https://raw.githubusercontent.com/jgarza9788/videoinfo/master/docs/images/TS_ffmpegPath.png)