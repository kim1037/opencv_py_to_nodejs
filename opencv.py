import socketio
import cv2

# set socketio
sio = socketio.Client()
sio.connect('http://localhost:3000/')

# 開啟webcam
cap = cv2.VideoCapture(0)  # 0: use built-in webcam, 1 or 2: use USB webcam

# control loop
is_closing = False

while not is_closing:
    ret, frame = cap.read()  # get frame from webcam

    if not ret:
        print("無法讀取攝影機")
        break

    _, buffer = cv2.imencode('.jpg', frame)  # from image to binary buffer

    # socket.io
    sio.emit('python-opencv', buffer.tobytes())  # send frames to server
    @sio.on('close-opencv')
    def close():
        global is_closing
        is_closing = True

    # # show webcam window
    # frame = cv2.resize(frame, (720, 480))
    # cv2.imshow('Webcam', frame)

    # # control webcam window
    # key = cv2.waitKey(1)
    # if key == 27:  # 按下esc結束視窗
    #     break

# cv2.destroyAllWindows() # 關閉視窗
cap.release()
sio.disconnect()