import { z } from "zod";
import { Form, useForm, } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { PatientFormSchema } from "../../lib/schema";
import  { useState } from "react";
import { CustomInput } from '../../components/ui/CustomInput.tsx'







type PatientFormData = z.infer<typeof PatientFormSchema>;
type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GENDER } from "../../lib";

interface DataProps {
  data?: Patient;
  type: "create" | "update";
}

export const NewPatient = ({ data, type }: DataProps) => {

  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState<string | null>(null);

  const userData = {
    first_name:  "",
    last_name: "",
    email:  "",
    phone:  "",
  };
  const form = useForm<PatientFormData>({
  resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      ...userData,
    },
  });
  return (
    <Card className="max-w-6xl w-full p-4">
      <CardHeader>
        <CardTitle>Patient Registration</CardTitle>
        <CardDescription>
          Please Provide all the information below to help us understand better
          and provide good and quality service to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form  {...form} >
           <form onSubmit={() => {

           }}  className="space-y-8 mt-5">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <>
            <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
                  <CustomInput 
                    type="input"
                    control={form.control}
                    name="first_name"
                    placeholder="First Name"
                    label="First Name"
                  />
                    <CustomInput 
                    type="input"
                    control={form.control}
                    name="last_name"
                    placeholder="Last Name"
                    label="Last Name"
                  />
                    <CustomInput 
                    type="input"
                    control={form.control}
                    name="email"
                    placeholder="example@gmail.com"
                    label="Email Address"
                  />
                 <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">

                     <CustomInput 
                    type="select"
                    control={form.control}
                    name="gender"
                    placeholder="select gender"
                    label="Gender"
                    selectList ={GENDER}
                  />

                   <CustomInput 
                    type="input"
                    control={form.control}
                    name="date_of_birth"
                    placeholder="01-01-2001"
                    label="Date of Birth"
                    inputType ='date'
                  />
                 </div>
               
               

                  
              </div>

            </>
           </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewPatient;

function customZodResolver(PatientSchema: unknown) {
  throw new Error("Function not implemented.");
}
