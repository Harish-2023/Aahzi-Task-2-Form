import { useState } from 'react';
import { Box, Input, FormControl, FormErrorMessage, FormLabel, Button, Stack, Text, Center, VStack, HStack} from '@chakra-ui/react';
// import { useForm } from 'react-hook-form';
import './MultiStepForm.css';

interface FormData {
  examinationCode: string;
  tneaCounsellingCode: string;
  collegeName: string;
  addressDetails:{
    address: string,
    state: string,
    pincode: string
  };
  district: string;
  collegeDetails:{
    yearEstablished: string; 
    collegeType: string;
    website: string;
  };
  contact: {
    principalName: string,
    phoneNumber: string,
    faxNumber: string,
    emailId: string,
  },
//   courses: {
//     mech: { intake: 0, students: 0 },
//     cse: { intake: 0, students: 0 },
//     eee: { intake: 0, students: 0 },
//     ece: { intake: 0, students: 0 },
//     mba: { intake: 0, students: 0 },
//     civil: { intake: 0, students: 0 },
//   // Add more fields as needed
// },
// course:[
//     {
//         degree: string,
//         courseName: string,
//         yearStarted: string,
//         intakeDetails:[
//             {
//                 year: string,
//                 intake:string
//             },
//             {
//                 year: string,
//                 intake:string
//             }
//         ]
//     },
//     {
//         degree: string,
//         courseName: string,
//         yearStarted: string,
//         intakeDetails:[
//             {
//                 year: string,
//                 intake:string
//             },
//             {
//                 year: string,
//                 intake:string
//             }
//         ]
//     },
//     {
//         degree: string,
//         courseName: string,
//         yearStarted: string,
//         intakeDetails:[
//             {
//                 year: string,
//                 intake:string
//             },
//             {
//                 year: string,
//                 intake:string
//             }
//         ]
//     },
//     {
//         degree: string,
//         courseName: string,
//         yearStarted: string,
//         intakeDetails:[
//             {
//                 year: string,
//                 intake:string
//             },
//             {
//                 year: string,
//                 intake:string
//             }
//         ]
//     }
// ]
}

const ButtonStyleCSS = {
    width: '100%',
    height: '35px',
    borderRadius: '40px',
    outline :'none',
    border: 'none',
    // background: 'linear-gradient(to right, rgba(0,255,210), rgba(255,234,255,0.6))',
    background: 'linear-gradient(to right , #00fff0, indigo',
    fontSize : "20px",
    fontWeight: '600',
    cursor: "pointer",
    transition: '0.3s',
    color: 'white',
    letterSpacing: '3px'

}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    examinationCode: '',
    tneaCounsellingCode: '',
    collegeName: '',
    district: '',
    addressDetails: {
        address: '',
        pincode: '',
        state: ''
    },
    collegeDetails:{
        yearEstablished:'',
        collegeType: '',
        website: ''
    },
    contact:{
        principalName: '',
        phoneNumber: '',
        faxNumber: '',
        emailId: '',
    }
  });
 
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateStep = () => {
    const stepErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.examinationCode) {
        stepErrors.examinationCode = 'Examination Code is required';
      }
      if (!formData.tneaCounsellingCode) {
        stepErrors.tneaCounsellingCode = 'Counselling Code is required';
      }
      if (!formData.collegeName) {
        stepErrors.collegeName = 'College Name is required';
      }
      if (!formData.district) {
        stepErrors.district = 'District is required';
      }
      const collegeDetailErrors: FormData['collegeDetails'] = {
        yearEstablished:'',
        collegeType: '',
        website: ''
      };
      if(!formData.collegeDetails.collegeType)
      collegeDetailErrors.collegeType = "College Type is required";
      if(!formData.collegeDetails.yearEstablished)
      collegeDetailErrors.yearEstablished = "Started year is required";
      if(!formData.collegeDetails.website)
      collegeDetailErrors.website = "Website is required";
    stepErrors.collegeDetails = collegeDetailErrors;
    } 
    if (currentStep === 2) {
        const addressErrors: FormData['addressDetails'] = {
            address: '',
            state: '',
            pincode: ''
        };
        if(!formData.addressDetails.address) 
        addressErrors.address = 'Address is required'
        if(!formData.addressDetails.state) 
        addressErrors.state = 'State is required'
        if(!formData.addressDetails.pincode) 
        addressErrors.pincode = 'Pincode is required'

        stepErrors.addressDetails = addressErrors;

        const contactErrors: FormData['contact'] = {
            principalName: '',
            phoneNumber: '',
            faxNumber: '',
            emailId: '',
        };
        if(!formData.contact.emailId) 
        contactErrors.emailId = 'Email ID is required'
        if(!formData.contact.principalName) 
        contactErrors.principalName = 'Principal Name is required'
        if(!formData.contact.phoneNumber) 
        contactErrors.phoneNumber = 'Phone Number is required'
        if(!formData.contact.faxNumber) 
        contactErrors.faxNumber = 'Fax Number is required'

        stepErrors.contact = contactErrors;
        
    }

    setErrors(stepErrors);

    return Object.keys(stepErrors).length === 0;
  };


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressDetailsChange = (field: keyof FormData['addressDetails'], value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      addressDetails: {
        ...prevData.addressDetails,
        [field]: value,
      },
    }));
  };

  const handleCollegeDetailsChange = (field: keyof FormData['collegeDetails'], value: string) => {
    setFormData((prevData) => ({
        ...prevData,
        collegeDetails: {
            ...prevData.collegeDetails,
            [field]:value,
        },
    }));
  };

  const handleContactChange = (field: keyof FormData['contact'], value: string) => {
    setFormData((prevData) => ({
        ...prevData,
        contact: {
            ...prevData.contact,
            [field]:value,
        },
    }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if(validateStep())
    console.log('Form submitted:', formData);
  };

  return (
    <>
    <Box
    className='box'
    style={ 
        {
            borderRadius : '10px', 
            display : 'grid', 
            placeItems :'center', 
            width: "100%", 
            padding: "30px 25px", 
            border: "2px solid rgba(255,255,255.0.2)",
            boxShadow: "0 0 10px rgba(0,0,0,0.6)"
        }
    }>
    <form>
    <Center>
    <Text style={
        {
            fontSize :'35px',
            fontWeight : "650",
            // textShadow: "0 0 2em rgba(255,255,255,0.2), 0 0 3rem rgba(240, 230, 123, 0,3)",
            textShadow: "rgba(0,250,255,0.6) 1px 0 5px",
            color: '#00fff0',
            padding: '0px 0px 20px 0px',
            letterSpacing: '2px'
        }
    }>
        {/* Aahzi - College Entry Form */}
        Aahzi Form
    </Text>
    </Center>

      {currentStep === 1 && (
        <Stack spacing={25}>
            <HStack spacing={30}>
            <FormControl>
                <VStack spacing={15}>
                    <FormLabel>Examination Code</FormLabel>
                    <Input type='text' placeholder='Enter Examination code'
                    value={formData.examinationCode}
                    onChange={(e) => handleInputChange('examinationCode', e.target.value)}/>
                </VStack>
                    {errors.examinationCode && <p className='error'>{errors.examinationCode}</p>}
            </FormControl>

            <FormControl>
                <VStack spacing={15}>
                    <FormLabel>Counselling Code</FormLabel>
                    <Input type='text' placeholder='Enter TNEA Counselling code'
                    value={formData.tneaCounsellingCode}
                    onChange={(e) => handleInputChange('tneaCounsellingCode', e.target.value)}/>
                </VStack>
                    {errors.tneaCounsellingCode && <p className='error'>{errors.tneaCounsellingCode}</p>}
            </FormControl>
            </HStack>

            <FormControl>
                <VStack spacing={15}>
                    <FormLabel>College Name</FormLabel>
                    <Input type='text' placeholder='Enter College Name' 
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange('collegeName', e.target.value)}/>
                </VStack>                      
                <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <HStack spacing={30}>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>District</FormLabel>
                        <Input type='text' placeholder='Enter District'
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}/>
                    </VStack>
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Year Established</FormLabel>
                        <Input type='text' placeholder='Enter College Started year' 
                        value={formData.collegeDetails.yearEstablished}
                        onChange={(e) => handleCollegeDetailsChange('yearEstablished', e.target.value)}/>
                    </VStack>                      
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>
            </HStack>

            <HStack spacing={30}>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Type</FormLabel>
                        <Input type='text' placeholder='Enter College Type'
                        value={formData.collegeDetails.collegeType}
                        onChange={(e) => handleCollegeDetailsChange('collegeType', e.target.value)}></Input>
                    </VStack>
                </FormControl>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Website</FormLabel>
                        <Input type='text' placeholder='Enter College Website'
                        value={formData.collegeDetails.website}
                        onChange={(e) => handleCollegeDetailsChange('website', e.target.value)}></Input>
                    </VStack>
                </FormControl>
            </HStack>
            <Button type='submit' style={ButtonStyleCSS} onClick={nextStep}>Next</Button>
        </Stack>
    )}

    {currentStep === 2 && (
    <div>
        <Stack spacing={25}>
            <FormControl>
                <VStack spacing={15}>
                    <FormLabel>College Address</FormLabel>
                    <Input type='text' placeholder='Enter College address'
                    value={formData.addressDetails.address}
                    onChange={(e) => handleAddressDetailsChange('address', e.target.value)}/>
                </VStack>
                <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <HStack spacing={30}>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>State</FormLabel>
                        <Input type='text' placeholder='Enter State'
                        value={formData.addressDetails.state}
                        onChange={(e) => handleAddressDetailsChange('state', e.target.value)}></Input>
                    </VStack>
                </FormControl>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Pincode</FormLabel>
                        <Input type='text' placeholder='Enter Pincode'
                        value={formData.addressDetails.pincode}
                        onChange={(e) => handleAddressDetailsChange('pincode', e.target.value)}></Input>
                    </VStack>
                </FormControl>
            </HStack>
            <HStack spacing={30}>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Principal name</FormLabel>
                        <Input type='text' placeholder='Enter Principal name'
                        value={formData.contact.principalName}
                        onChange={(e) => handleContactChange('principalName', e.target.value)}></Input>
                    </VStack>
                </FormControl>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Email ID</FormLabel>
                        <Input type='text' placeholder='Enter Email ID'
                        value={formData.contact.emailId}
                        onChange={(e) => handleContactChange('emailId', e.target.value)}></Input>
                    </VStack>
                </FormControl>
            </HStack>
            <HStack spacing={30}>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Fax Number</FormLabel>
                        <Input type='text' placeholder='Enter Fax number'
                        value={formData.contact.faxNumber}
                        onChange={(e) => handleContactChange('faxNumber', e.target.value)}></Input>
                    </VStack>
                </FormControl>
                <FormControl>
                    <VStack spacing={15}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input type='text' placeholder='Enter Phone number'
                        value={formData.contact.phoneNumber}
                        onChange={(e) => handleContactChange('phoneNumber', e.target.value)}></Input>
                    </VStack>
                </FormControl>
            </HStack>
            <HStack>
                <Button type='button' style={ButtonStyleCSS} onClick={nextStep}>Next</Button>
                <Button type='button' style={ButtonStyleCSS} onClick={prevStep}>Previous</Button>
            </HStack>
        </Stack>        
    </div>
    )}

    {/* Repeat similar blocks for other steps (3 to 5) */}

    {currentStep === 5 && (
    <div>
        {/* Input fields for step 5 */}
        <button type="button" onClick={prevStep}>
        Previous
        </button>
        <button type="button" onClick={handleSubmit}>
        Submit
        </button>
    </div>
    )}
    </form>
    </Box>
    </>
  );
};

export default MultiStepForm;
