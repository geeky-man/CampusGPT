import { useState } from "react"
import axios from "axios"

function UploadPage() {

  const [file, setFile] = useState(null)

  const [message, setMessage] = useState("")

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF file")
      return
    }

    const formData = new FormData()

    formData.append("file", file)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setMessage(response.data.message)

    } catch (error) {

      console.log(error)

      setMessage("Upload failed")
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-blue-400 mb-3">
          Upload Documents
        </h1>

        <p className="text-slate-400 mb-8">
          Upload syllabus PDFs, notices, regulations, or placement documents.
        </p>

        <label className="border-2 border-dashed border-slate-600 hover:border-blue-400 transition-all duration-300 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer bg-slate-900/50">

          <div className="text-6xl mb-4">
            📄
          </div>

          <p className="text-xl text-slate-300 mb-2">
            Drag & Drop PDF Here
          </p>

          <p className="text-sm text-slate-500">
            or click to browse files
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

        </label>

        {
          file && (
            <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Selected File
                </p>

                <p className="text-white font-medium mt-1">
                  {file.name}
                </p>

              </div>

              <div className="text-green-400 text-2xl">
                ✓
              </div>

            </div>
          )
        }

        <button
          onClick={handleUpload}
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/20"
        >
          Upload PDF
        </button>

        {
          message && (
            <div className="mt-6 text-center">

              <p className="text-green-400 text-lg font-medium">
                {message}
              </p>

            </div>
          )
        }

      </div>

    </div>
  )
}

export default UploadPage