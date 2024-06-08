import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Form.css";

function Form() {
  const Navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    full_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    nationality: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [ageWarning, setAgeWarning] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        const countriesData = response.data.data;
        setCountries(countriesData);
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Checking for full_name input validation
    if (name === "full_name") {
      const regex = /^[A-Za-z\s\u0600-\u06FF]+$/u;
      if (!regex.test(value) && value !== "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          full_name:
            "Full name must contain only Arabic or English letters and spaces",
        }));
        return;
      } else {
        setFormErrors((prevErrors) => {
          const { full_name, ...rest } = prevErrors;
          return rest;
        });
      }
    }

    // Checking for date_of_birth input validation
    if (name === "date_of_birth") {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (
        age < 18 ||
        (age === 18 && month < 0) ||
        (age === 18 && month === 0 && today.getDate() < birthDate.getDate())
      ) {
        setAgeWarning("You must be at least 18 years old");
      } else {
        setAgeWarning("");
      }
    }

    if (name === "nationality") {
      const selectedCountry = countries.find((country) => country.iso2 === value);
      setFormValues({ ...formValues, [name]: selectedCountry ? selectedCountry.country : value });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const validate = () => {
    let errors = {};
    if (!formValues.full_name) {
      errors.full_name = "Full name is required";
    }
    if (!formValues.date_of_birth) {
      errors.date_of_birth = "Date of birth is required";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formValues.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = "Phone number is not valid";
    }
    if (!formValues.nationality) {
      errors.nationality = "Nationality is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      Navigate("/allData");
    }
    try {
      const response = await axios.post('https://myapp-58va.onrender.com/api/users/', formValues, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.status === 201) {
          console.log('Form submitted successfully:', response.data);
          setFormValues({
            full_name: "",
            date_of_birth: "",
            email: "",
            phone: "",
            nationality: "",
          });
      } else {
          console.error('Form submission error:', response.statusText);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handlePhoneKeyPress = (e) => {
    const charCode = e.charCode || e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Full name</label>
      <input
        type="text"
        name="full_name"
        onChange={handleChange}
        value={formValues.full_name}
        className={formErrors.full_name ? "error" : ""}
      />
      {formErrors.full_name && (
        <div className="error-message">{formErrors.full_name}</div>
      )}

      <label>Date of birth</label>
      <input
        type="date"
        name="date_of_birth"
        onChange={handleChange}
        value={formValues.date_of_birth}
        className={formErrors.date_of_birth ? "error" : ""}
      />
      {formErrors.date_of_birth && (
        <div className="error-message">{formErrors.date_of_birth}</div>
      )}
      {ageWarning && <div className="age-warning">{ageWarning}</div>}

      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formValues.email}
        className={formErrors.email ? "error" : ""}
      />
      {formErrors.email && (
        <div className="error-message">{formErrors.email}</div>
      )}

      <label>Phone number</label>
      <input
        type="tel"
        name="phone"
        onChange={handlePhoneChange}
        onKeyPress={handlePhoneKeyPress}
        value={formValues.phone}
        className={formErrors.phone ? "error" : ""}
      />
      {formErrors.phone && (
        <div className="error-message">{formErrors.phone}</div>
      )}

      <label>Nationality</label>
      <select
        name="nationality"
        onChange={handleChange}
        value={countries.find((country) => country.country === formValues.nationality)?.iso2 || ""}
        className={formErrors.nationality ? "error" : ""}
      >
        <option value="">Select nationality</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.country}
          </option>
        ))}
      </select>
      {formErrors.nationality && (
        <div className="error-message">{formErrors.nationality}</div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
