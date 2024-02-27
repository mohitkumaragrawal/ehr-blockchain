import { Button } from "@nextui-org/react";
import { useState } from "react";

function HealthRecord() {
  return (
    <div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-md">
      <div>
        <h1 className="text-xl flex justify-between w-full">
          <div className="font-bold">Health Record File</div>
          <div className="opacity-70">file_name.csv</div>
        </h1>
      </div>
    </div>
  );
}

function DoctorRequest() {
  return (
    <div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-md">
      <div>Dr. Vegapunk is requesting access to your health records.</div>
      <div>Doctor Address: 0x1234...5678</div>

      <div className="flex gap-4">
        <Button>Approve</Button>
        <Button>Reject</Button>
      </div>
    </div>
  );
}

export default function Home() {
  const [file, setFile] = useState(null);

  function uploadFile() {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5001/api/v0/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("IPFS hash:", data.Hash);
        alert("File uploaded successfully! IPFS hash: " + data.Hash); 
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file == null) {
      alert("Please select a file to upload");
      return;
    }

    console.log(file);
    console.log("Uploading file...");
    uploadFile();

    // write it to the smart contract !!
  };

  return (
    <main>
      <div className="flex flex-col mx-auto max-w-6xl py-10">
        <h1 className="text-3xl font-bold">Upload Your Health Data</h1>

        <div>
          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <input
              type="file"
              id="file"
              name="file"
              className="rounded-md p-2 w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button type="submit">Upload</Button>{" "}
          </form>{" "}
        </div>

        <div className="mt-10">
          <h1 className="text-3xl font-bold">Your Health Records</h1>

          <div className="flex flex-col flex-wrap gap-4 mt-6">
            <HealthRecord />
            <HealthRecord />
            <HealthRecord />
            <HealthRecord />
            <HealthRecord />
            <HealthRecord />
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl font-bold">Pending Requests From Doctors</h1>

          <div className="flex flex-col flex-wrap gap-4 mt-6">
            <DoctorRequest />
            <DoctorRequest />
            <DoctorRequest />
            <DoctorRequest />
          </div>
        </div>
      </div>
    </main>
  );
}
