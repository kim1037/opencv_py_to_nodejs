# opencv_py_to_nodejs
This is a project that displays streaming video from a USB camera or IP camera (RTSP) on the web. It uses Python 3.11.6 and at least version 8.17.0 of Node.js. Please ensure the required environments are installed before launching the project.

## Getting Started
Follow the instructions below to set up and run the project on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install:

- NVM - To install node modules
- Node.js >= 8.17.0 - To build the web server
- Python >= 3.11.6 - To capture the camera stream

### Installing
1. Download and install [NVM](https://github.com/coreybutler/nvm-windows/releases) (nvm-setup.exe) on your local machine (for windows)
2. Execute nvm-setup.exe and keep pressing Next until the installation is completed
3. Open the Start menu, type Windows PowerShell, select Windows PowerShell, and then select Run as administrator.
4. Enter the command in powershell:  `nvm install 8.17.0` and `nvm use v8.17.0` 
5. Download and install [Python 3](https://www.python.org/downloads/)
6. Clone this project `git clone https://github.com/kim1037/opencv_py_to_nodejs.git`
7. Install all npm modules the project needs: `npm install`
8. Install python modules belows:
   ```
    pip install requests
    pip install python-socketio
    pip install opencv-python
   ```

## Run the project
1. Open the `opencv.py`
Change the camera source to your configuration, you can use a built-in local camera `0` , an external USB camera `1 or 2` , or an RTSP URL.
```
cap = cv2.VideoCapture(0)  # 0: use bulit-in webcam, 1 or 2: use USB webcam, or rtsp url
# cap = cv2.VideoCapture(rtsp://192.168.1.111/test2)
```
2. Run the node.js server
```npm run dev```

3. Preview Streaming Camera on web browser by go to this URL: [127.0.0.1:3000](http://127.0.0.1:3000)
