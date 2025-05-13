// import { z } from "zod";
// import { Form, useForm, } from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import { PatientFormSchema } from "../../lib/schema";
// import  { useState } from "react";
// import { CustomInput } from '../../components/ui/CustomInput.tsx'







// type PatientFormData = z.infer<typeof PatientFormSchema>;
// type Patient = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// };


// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { GENDER } from "../../lib";

// interface DataProps {
//   data?: Patient;
//   type: "create" | "update";
// }

// export const NewPatient = ({ data, type }: DataProps) => {

//   const [loading, setLoading] = useState(false);
//   const [imgURL, setImgURL] = useState<string | null>(null);

//   const userData = {
//     first_name:  "",
//     last_name: "",
//     email:  "",
//     phone:  "",
//   };
//   const form = useForm<PatientFormData>({
//   resolver: zodResolver(PatientFormSchema),
//     defaultValues: {
//       ...userData,
//     },
//   });
//   return (
//     <Card className="max-w-6xl w-full p-4">
//       <CardHeader>
//         <CardTitle>Patient Registration</CardTitle>
//         <CardDescription>
//           Please Provide all the information below to help us understand better
//           and provide good and quality service to you.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form  {...form} >
//            <form onSubmit={() => {

//            }}  className="space-y-8 mt-5">
//             <h3 className="text-lg font-semibold">Personal Information</h3>
//             <>
//             <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
//                   <CustomInput 
//                     type="input"
//                     control={form.control}
//                     name="first_name"
//                     placeholder="First Name"
//                     label="First Name"
//                   />
//                     <CustomInput 
//                     type="input"
//                     control={form.control}
//                     name="last_name"
//                     placeholder="Last Name"
//                     label="Last Name"
//                   />
                  
//                     <CustomInput 
//                     type="input"
//                     control={form.control}
//                     name="email"
//                     placeholder="example@gmail.com"
//                     label="Email Address"
//                   />
                      
//               </div>
//         <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">

//                      <CustomInput 
//                     type="select"
//                     control={form.control}
//                     name="gender"
//                     placeholder="select gender"
//                     label="Gender"
//                     selectList ={GENDER}
//                   />

//                    <CustomInput 
//                     type="input"
//                     control={form.control}
//                     name="date_of_birth"
//                     placeholder="01-01-2001"
//                     label="Date of Birth"
//                     inputType ='date'
//                   />
//                  </div>
               
               

            

//             </>
//            </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default NewPatient;

// function customZodResolver(PatientSchema: unknown) {
//   throw new Error("Function not implemented.");
// }





// import { z } from "zod";
// import { Form, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PatientFormSchema } from "../../lib/schema";
// import { useState } from "react";
// import { CustomInput } from "../../components/ui/CustomInput.tsx";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { GENDER } from "../../lib";
// import React from "react";

// type PatientFormData = z.infer<typeof PatientFormSchema>;

// type Patient = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// };

// interface DataProps {
//   data?: Patient;
//   type: "create" | "update";
// }

// export const NewPatient = ({ data, type }: DataProps) => {
//   const [loading, setLoading] = useState(false);

//   const form = useForm<PatientFormData>({
//     resolver: zodResolver(PatientFormSchema),
//     defaultValues: {
//       first_name: data?.firstName || "",
//       last_name: data?.lastName || "",
//       email: data?.email || "",
//       phone: data?.phone || "",
//       date_of_birth: "",
//       gender: "male",
//       address: "",
//       marital_status: undefined,
//       emergency_contact_name: "",
//       emergency_contact_number: "",
//       relation: undefined,
//       blood_group: "",
//       allergies: "",
//       medical_conditions: "",
//       medical_history: "",
//       insurance_provider: "",
//       insurance_number: "",
//       privacy_consent: false,
//       service_consent: false,
//       medical_consent: false,
//       img: "",
//     },
//   });

//   const { control, handleSubmit, formState: { errors }, watch } = form;

//   // Debug form values
//   const formValues = watch();
//   React.useEffect(() => {
//     console.log("Current form values:", formValues);
//   }, [formValues]);

//   const onSubmit = (formData: PatientFormData) => {
//     setLoading(true);
//     console.log("Form submitted:", formData);
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       alert(type === "create" ? "Patient created successfully!" : "Patient updated successfully!");
//     }, 1000);
//   };

//   return (
//     <Card className="max-w-4xl w-full mx-auto shadow-lg rounded-lg mt-6">
//       <CardHeader className="border-b pb-4">
//         <CardTitle className="text-2xl font-bold text-gray-800">
//           Patient Registration
//         </CardTitle>
//         <CardDescription className="text-gray-600">
//           Please provide all the information below to help us understand you better and deliver quality service.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <Form {...form}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <section>
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <CustomInput
//                   key="first_name"
//                   type="input"
//                   control={control}
//                   name="first_name"
//                   placeholder="First Name"
//                   label="First Name"
//                   error={errors.first_name?.message}
//                 />
//                 <CustomInput
//                   key="last_name"
//                   type="input"
//                   control={control}
//                   name="last_name"
//                   placeholder="Last Name"
//                   label="Last Name"
//                   error={errors.last_name?.message}
//                 />
//                 <CustomInput
//                   key="email"
//                   type="input"
//                   control={control}
//                   name="email"
//                   placeholder="example@gmail.com"
//                   label="Email Address"
//                   error={errors.email?.message}
//                 />
//                 <CustomInput
//                   key="gender"
//                   type="select"
//                   control={control}
//                   name="gender"
//                   placeholder="Select gender"
//                   label="Gender"
//                   selectList={GENDER}
//                   error={errors.gender?.message}
//                 />
//                 <CustomInput
//                   key="date_of_birth"
//                   type="input"
//                   control={control}
//                   name="date_of_birth"
//                   placeholder="01-01-2001"
//                   label="Date of Birth"
//                   inputType="date"
//                   error={errors.date_of_birth?.message}
//                 />
//               </div>
//             </section>
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`
//                   px-6 py-2 rounded-md text-white font-medium
//                   ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
//                   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                 `}
//               >
//                 {loading ? "Submitting..." : type === "create" ? "Create Patient" : "Update Patient"}
//               </button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default NewPatient;


import { z } from "zod";
import { useForm, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormSchema } from "../../lib/schema";
import { useState, useEffect } from "react";
import { CustomInput } from "../../components/ui/CustomInput.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GENDER } from "../../lib";

type PatientFormData = z.infer<typeof PatientFormSchema>;

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

interface DataProps {
  data?: Patient;
  type: "create" | "update";
}

export const NewPatient = ({ data, type }: DataProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      first_name: data?.firstName || "",
      last_name: data?.lastName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      date_of_birth: "",
      gender: "male",
      address: "",
      marital_status: undefined,
      emergency_contact_name: "",
      emergency_contact_number: "",
      relation: undefined,
      blood_group: "",
      allergies: "",
      medical_conditions: "",
      medical_history: "",
      insurance_provider: "",
      insurance_number: "",
      privacy_consent: false,
      service_consent: false,
      medical_consent: false,
      img: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const formValues = watch();
  useEffect(() => {
    console.log("Current form values:", formValues);
  }, [formValues]);

  const onSubmit = (formData: PatientFormData) => {
    setLoading(true);
    console.log("Form submitted:", formData);
    setTimeout(() => {
      setLoading(false);
      alert(type === "create" ? "Patient created successfully!" : "Patient updated successfully!");
    }, 1000);
  };

  return (
    <Card className="max-w-5xl w-full mx-auto mt-8 shadow-md rounded-lg border">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Patient Registration
        </CardTitle>
        <CardDescription className="text-gray-600">
          Please provide all the information below to help us serve you better.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Personal Information
              </h3>

              {/* Name fields in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomInput
                  type="input"
                  control={control}
                  name="first_name"
                  placeholder="First Name"
                  label="First Name"
                  error={errors.first_name?.message}
                />
                <CustomInput
                  type="input"
                  control={control}
                  name="last_name"
                  placeholder="Last Name"
                  label="Last Name"
                  error={errors.last_name?.message}
                />
              </div>

              {/* Email on new line */}
              <div className="mt-6">
                <CustomInput
                  type="input"
                  control={control}
                  name="email"
                  placeholder="example@gmail.com"
                  label="Email Address"
                  error={errors.email?.message}
                />
              </div>

              {/* Gender and DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <CustomInput
                  type="select"
                  control={control}
                  name="gender"
                  placeholder="Select gender"
                  label="Gender"
                  selectList={GENDER}
                  error={errors.gender?.message}
                />
                <CustomInput
                  type="input"
                  control={control}
                  name="date_of_birth"
                  placeholder="01-01-2001"
                  label="Date of Birth"
                  inputType="date"
                  error={errors.date_of_birth?.message}
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {loading ? "Submitting..." : type === "create" ? "Create Patient" : "Update Patient"}
              </button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewPatient;
