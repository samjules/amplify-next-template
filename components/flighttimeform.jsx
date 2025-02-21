import { generateClient } from "aws-amplify/data";
import "../app/app.css";
import { useState, useEffect } from "react";

const client = generateClient();

const FlightTimeForm = () => {
  const [formData, setFormData] = useState({
    startHobbs: "",
    endHobbs: "",
    startTach: "",
    endTach: "",
    pilot: "",
    aircraftId: "",
  });

  const [flightTimes, setFlightTimes] = useState([]); // ✅ State to store flight times

  // ✅ Fetch flight times from the database
  const fetchFlightTimes = async () => {
    try {
      const { data } = await client.models.FlightTime.list();
      setFlightTimes(data);
    } catch (error) {
      console.error("Error fetching flight times:", error);
    }
  };

  // ✅ Fetch flight times on component mount
  useEffect(() => {
    fetchFlightTimes();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.models.FlightTime.create({
        startHobbs: parseInt(formData.startHobbs),
        endHobbs: parseInt(formData.endHobbs),
        startTach: parseInt(formData.startTach),
        endTach: parseInt(formData.endTach),
        pilot: formData.pilot,
        aircraftId: formData.aircraftId,
      });

      alert("Flight time submitted successfully!");
      setFormData({
        startHobbs: "",
        endHobbs: "",
        startTach: "",
        endTach: "",
        pilot: "",
        aircraftId: "",
      });

      fetchFlightTimes(); // ✅ Refresh the flight times list
    } catch (error) {
      console.error("Error submitting flight time:", error);
      alert("Failed to submit flight time.");
    }
  };

  return (
    <div className="row">
      <div className="main-menu">
        <form className="flight_time" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="hobbs_start">Hobbs Start</label>
            <input className="input" name="startHobbs" value={formData.startHobbs} onChange={handleChange} />
          </div>

          <div>
            <label className="label" htmlFor="hobbs_end">Hobbs End</label>
            <input className="input" name="endHobbs" value={formData.endHobbs} onChange={handleChange} />
          </div>

          <div>
            <label className="label" htmlFor="tach_start">Tach Start</label>
            <input className="input" name="startTach" value={formData.startTach} onChange={handleChange} />
          </div>

          <div>
            <label className="label" htmlFor="tach_end">Tach End</label>
            <input className="input" name="endTach" value={formData.endTach} onChange={handleChange} />
          </div>

          <div>
            <label className="label" htmlFor="pilot_name">Pilot Name</label>
            <select className="input" name="pilot" value={formData.pilot} onChange={handleChange}>
              <option value="">Select Pilot</option>
              <option value="Bob">Bob</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="aircraft_id">Aircraft Tail-Number</label>
            <select className="input" name="aircraftId" value={formData.aircraftId} onChange={handleChange}>
              <option value="">Select Aircraft</option>
              <option value="N12345">N12345</option>
            </select>
          </div>

          <button className="button" type="submit">Enter Flight Time</button>
        </form>
      </div>




      {/* ✅ Repeater Section to Show Flight Times */}

      <div className="main-menu">

      <div className="flight-times-list">
        <h2>Flight Time Records</h2>
        {flightTimes.length > 0 ? (
          <ul>
            {flightTimes.map((flight) => (
              <li key={flight.id} className="flight-entry">
                <strong>Pilot:</strong> {flight.pilot} | <strong>Aircraft:</strong> {flight.aircraftId} | 
                <strong> Hobbs:</strong> {flight.startHobbs} - {flight.endHobbs} | 
                <strong> Tach:</strong> {flight.startTach} - {flight.endTach}
              </li>
            ))}
          </ul>
        ) : (
          <p>No flight time records found.</p>
        )}
      </div>
    </div>

      </div>

      
  );
};

export default FlightTimeForm;