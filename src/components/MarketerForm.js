import { useState } from "react";
import { useMarketersContext } from "../hooks/useMarketersContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MarketerForm = () => {
  const { dispatch } = useMarketersContext();
  const { user } = useAuthContext();

  const [titleMarketer, setTitleMarketer] = useState("");
  const [loadMarketer, setLoadMarketer] = useState("");
  const [repsMarketerPrice, setRepsMarketerPrice] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const marketer = { titleMarketer, loadMarketer, repsMarketerPrice };

    const response = await fetch(
      "https://torleado.herokuapp.com/api/marketers",
      {
        method: "POST",
        body: JSON.stringify(marketer),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitleMarketer("");
      setLoadMarketer("");
      setRepsMarketerPrice("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_MARKTER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Marketer</h3>

      <label>Marketer Name:</label>
      <input
        type="text"
        onChange={(e) => setTitleMarketer(e.target.value)}
        value={titleMarketer}
        className={emptyFields.includes("titleMarketer") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoadMarketer(e.target.value)}
        value={loadMarketer}
        className={emptyFields.includes("loadMarketer") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setRepsMarketerPrice(e.target.value)}
        value={repsMarketerPrice}
        className={emptyFields.includes("repsMarketerPrice") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default MarketerForm;
