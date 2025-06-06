import React, { useState } from "react";
import axios from "axios";

export default function MedicalScanUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        const response = await axios.post("/predict", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      setResult(response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Medical Scan Upload</h2>
      <input
        type="file"
        accept="image/*,application/dicom"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        {uploading ? "Uploading..." : "Upload and Predict"}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
