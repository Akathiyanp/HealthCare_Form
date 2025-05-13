import { useState,  } from "react";

const GENDER = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];

const MARITAL_STATUS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "separated", label: "Separated" }
];

// Custom select component that works correctly
const CustomSelect = ({ 
  label, 
  
  options, 
  value, 
  onChange, 
  error 
}: { 
  label: string; 
  name: string; 
  options: { value: string; label: string }[]; 
  value: string; 
  onChange: (value: string) => void; 
  error?: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className="w-full border rounded-md bg-white px-3 py-2 text-left flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{options.find(option => option.value === value)?.label || `Select ${label}`}</span>
          <svg
            className={`h-5 w-5 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Define relation options for emergency contact
const RELATION_OPTIONS = [
  { value: "spouse", label: "Spouse" },
  { value: "parent", label: "Parent" },
  { value: "child", label: "Child" },
  { value: "sibling", label: "Sibling" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" }
];

// Define blood group options
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BLOOD_GROUP_OPTIONS = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" }
];

// Custom input component
const CustomInput = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  error 
}: { 
  label: string; 
  type?: string; 
  name: string; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string; 
  error?: string 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

interface PatientData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export const NewPatient = ({ data, type = "create" }: { data?: PatientData; type?: string }) => {
  const [loading, setLoading] = useState(false);
  interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string;
    address: string;
    marital_status: string;
    emergency_contact_name: string;
    emergency_contact_number: string;
    relation: string;
    blood_group: string;
    allergies: string;
    medical_conditions: string;
    medical_history: string;
    insurance_provider: string;
    insurance_number: string;
    privacy_consent: boolean;
    service_consent: boolean;
    medical_consent: boolean;
  }

  const [formData, setFormData] = useState<FormData>({
    first_name: data?.firstName || "",
    last_name: data?.lastName || "",
    email: data?.email || "",
    phone: data?.phone || "",
    date_of_birth: "",
    gender: "male",
    address: "",
    marital_status: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    relation: "",
    blood_group: "",
    allergies: "",
    medical_conditions: "",
    medical_history: "",
    insurance_provider: "",
    insurance_number: "",
    privacy_consent: false,
    service_consent: false,
    medical_consent: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (name: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.marital_status) newErrors.marital_status = "Marital status is required";
    
    // Validate consent checkboxes
    if (!formData.privacy_consent) newErrors.privacy_consent = "You must agree to the privacy policy";
    if (!formData.service_consent) newErrors.service_consent = "You must agree to the terms of service";
    if (!formData.medical_consent) newErrors.medical_consent = "You must agree to the medical treatment terms";
    
    return newErrors;
  };
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    console.log("Form submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(type === "create" ? "Patient created successfully!" : "Patient updated successfully!");
    }, 1000);
  };
  
  return (
    <div className="max-w-5xl w-full mx-auto mt-8 shadow-md rounded-lg border bg-white">
      <div className="border-b pb-4 px-6 pt-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Patient Registration
        </h2>
        <p className="text-gray-600">
          Please provide all the information below to help us serve you better.
        </p>
      </div>
      
      <div className="pt-6 px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Personal Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>

            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={(value) => handleChange("first_name", value)}
                placeholder="First Name"
                error={errors.first_name}
              />
              <CustomInput
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={(value) => handleChange("last_name", value)}
                placeholder="Last Name"
                error={errors.last_name}
              />
            </div>

            {/* Email field */}
            <div className="mt-6">
              <CustomInput
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                placeholder="example@gmail.com"
                error={errors.email}
              />
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <CustomSelect
                label="Gender"
                name="gender"
                options={GENDER}
                value={formData.gender}
                onChange={(value) => handleChange("gender", value)}
                error={errors.gender}
              />
              <CustomInput
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(value) => handleChange("date_of_birth", value)}
                error={errors.date_of_birth}
              />
            </div>

            {/* Phone & Marital Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <CustomInput
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
                placeholder="Phone Number"
                error={errors.phone}
              />
              <CustomSelect
                label="Marital Status"
                name="marital_status"
                options={MARITAL_STATUS}
                value={formData.marital_status}
                onChange={(value) => handleChange("marital_status", value)}
                error={errors.marital_status}
              />
            </div>

            {/* Address */}
            <div className="mt-6">
              <CustomInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={(value) => handleChange("address", value)}
                placeholder="Street, City, ZIP"
                error={errors.address}
              />
            </div>
          </section>
          
          {/* Section: Family Information */}
          <section className="pt-6 bg-gray-50  rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Family Information
            </h3>
            
            {/* Emergency Contact */}
            <div className="mt-6">
              <CustomInput
                label="Emergency contact name"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={(value) => handleChange("emergency_contact_name", value)}
                placeholder="Emergency Contact Name"
                error={errors.emergency_contact_name}
              />
            </div>
            
            <div className="mt-6">
              <CustomInput
                label="Emergency contact"
                name="emergency_contact_number"
                value={formData.emergency_contact_number}
                onChange={(value) => handleChange("emergency_contact_number", value)}
                placeholder="Emergency Contact Number"
                error={errors.emergency_contact_number}
              />
            </div>
            
            <div className="mt-6">
              <CustomSelect
                label="Relation"
                name="relation"
                options={RELATION_OPTIONS}
                value={formData.relation}
                onChange={(value) => handleChange("relation", value)}
                error={errors.relation}
              />
            </div>
          </section>
          
          {/* Section: Medical Information */}
          <section className="pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Medical Information
            </h3>
            
            <div className="mt-6">
              <CustomInput
                label="Blood group"
                name="blood_group"
                value={formData.blood_group}
                onChange={(value) => handleChange("blood_group", value)}
                placeholder="Blood Group"
                error={errors.blood_group}
              />
            </div>
            
            <div className="mt-6">
              <CustomInput
                label="Allergies"
                name="allergies"
                value={formData.allergies}
                onChange={(value) => handleChange("allergies", value)}
                placeholder="Allergies"
                error={errors.allergies}
              />
            </div>
            
            <div className="mt-6">
              <CustomInput
                label="Medical conditions"
                name="medical_conditions"
                value={formData.medical_conditions}
                onChange={(value) => handleChange("medical_conditions", value)}
                placeholder="Medical conditions"
                error={errors.medical_conditions}
              />
            </div>
            
            <div className="mt-6">
              <CustomInput
                label="Medical history"
                name="medical_history"
                value={formData.medical_history}
                onChange={(value) => handleChange("medical_history", value)}
                placeholder="Medical history"
                error={errors.medical_history}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <CustomInput
                label="Insurance provider"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={(value) => handleChange("insurance_provider", value)}
                placeholder="Insurance provider"
                error={errors.insurance_provider}
              />
              <CustomInput
                label="Insurance number"
                name="insurance_number"
                value={formData.insurance_number}
                onChange={(value) => handleChange("insurance_number", value)}
                placeholder="Insurance number"
                error={errors.insurance_number}
              />
            </div>
          </section>
          
          {/* Consent Section */}
          <section className="pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Consent
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="privacy_consent"
                    type="checkbox"
                    checked={formData.privacy_consent}
                    onChange={(e) => handleChange("privacy_consent", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacy_consent" className="font-medium text-gray-700">
                    Privacy Policy Agreement
                  </label>
                  <p className="text-gray-500">
                    I consent to the collection, storage, and use of my personal and health information as outlined in the Privacy Policy. I understand how my data will be used, who it may be shared with, and my rights regarding access, correction, and deletion of my data.
                  </p>
                  {errors.privacy_consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.privacy_consent}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="service_consent"
                    type="checkbox"
                    checked={formData.service_consent}
                    onChange={(e) => handleChange("service_consent", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="service_consent" className="font-medium text-gray-700">
                    Terms of Service Agreement
                  </label>
                  <p className="text-gray-500">
                    I agree to the Terms of Service, including my responsibilities as a user of this healthcare management system, the limitations of liability, and the dispute resolution process. I understand that continued use of this service is contingent upon my adherence to these terms.
                  </p>
                  {errors.service_consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.service_consent}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="medical_consent"
                    type="checkbox"
                    checked={formData.medical_consent}
                    onChange={(e) => handleChange("medical_consent", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="medical_consent" className="font-medium text-gray-700">
                    Informed Consent for Medical Treatment
                  </label>
                  <p className="text-gray-500">
                    I provide informed consent to receive medical treatment and services through this healthcare management system. I acknowledge that I have been informed of the nature, risks, benefits, and alternatives to the proposed treatments and that I have the right to ask questions and receive further information before proceeding.
                  </p>
                  {errors.medical_consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.medical_consent}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex ">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading
                ? "Submitting..."
                : type === "create"
                ? "Submit"
                : "Update Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatient;