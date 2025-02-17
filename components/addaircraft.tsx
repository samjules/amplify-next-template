import { useState } from "react";
import { FileUploader } from "@aws-amplify/ui-react-storage";

const AddAircraft = () => {
  const [tailNumber, setTailNumber] = useState("");
  const [model, setModel] = useState("");
  const [imageKey, setImageKey] = useState<string>(""); // Ensure it's a string

  return (
    <div>
      <h2>Add New Aircraft</h2>
      <input
        type="text"
        placeholder="Tail Number"
        value={tailNumber}
        onChange={(e) => setTailNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <FileUploader
        acceptedFileTypes={["image/*"]}
        path="public/"
        maxFileCount={1}
        isResumable
        onUploadSuccess={(event) => {
          const uploadedKey = event.key ?? ""; // Default to empty string if undefined
          console.log("File uploaded:", uploadedKey);
          setImageKey(uploadedKey); // Set the key (guaranteed to be a string)
        }}
      />
      <button
        onClick={() => {
          console.log("Submitting Aircraft:", {
            tailNumber,
            model,
            imageKey,
          });
          // Here you'd call your Amplify Data API to save the aircraft
        }}
      >
        Add Aircraft
      </button>
    </div>
  );
};

export default AddAircraft;