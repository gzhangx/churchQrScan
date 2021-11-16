import { useEffect, useRef, useState } from "react"

export default function VideoBrowser() {
  const [txt, setTxt] = useState("init")
  const canvasRef = useRef(null)
  const photoRef = useRef(null)
  const videoRef = useRef()
  useEffect(() => {
    const constraints = {
      video: {
        facingMode: "environment",
      },
    }
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        const video = document.querySelector("video")
        if (video) {
          video.srcObject = mediaStream
          video.onloadedmetadata = function (e) {
            video.play()
          }
        }
      })
    } else {
      setTxt("--failed--- no navigator.mediaDevices")
    }
  })
  const takePhoto = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const width = 100
    const height = 100
    {
      canvas.width = width
      canvas.height = height
      context.drawImage(videoRef.current, 0, 0, width, height)

      var data = canvas.toDataURL("image/png")
      photoRef.current.setAttribute("src", data)
    }
  }
  return (
    <div>
      <div>bbb{txt}aaa</div>
      <video ref={videoRef} id="camera"></video>
      <p>canvas below</p>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <p>image below</p>
      <img ref={photoRef} id="photo" alt="The screen capture will appear in this box." />
      <button onClick={() => takePhoto()}>shoot</button>
    </div>
  )
}
