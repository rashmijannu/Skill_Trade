"use client";
import React, { useState } from "react";
import Select from "react-select";
import { Input, Textarea, SvgIcon, styled } from "@mui/joy";
import { Button as CustomButton } from "@/components/ui/button";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MdDeleteOutline } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Avatar from "@mui/material/Avatar";

import {
  services,
  steps,
  city_mapping,
  Service_mapping,
} from "../../_Arrays/Arrays";

import { useAuth } from "@/app/_context/UserAuthContent";
import UserPrivateRoutes from "../../_components/privateroutes/UserPrivateRoutes";
import toast, { Toaster } from "react-hot-toast";
import { Backdrop, CircularProgress } from "@mui/material";

const CreateRequest = () => {
  //mui
  const [activeStep, setActiveStep] = useState(0);

  //form data
  const [service, setService] = useState(null);
  const [customService, setCustomService] = useState("");
  const [description, setDescription] = useState("");
  const [time, settime] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState("");
  const [date, setdate] = useState("");
  const [coordinates, setCoordinates] = useState(""); // Updated to store coordinates
  // useful states
  const [isCustomService, setIsCustomService] = useState(false);
  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const [pincode, Setpincode] = useState(null);
  const [city, Setcity] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const searchParams = useSearchParams();
  const workerId = searchParams.get("id");
  const workerName = searchParams.get("name");
  const expertise = searchParams.get("expertise");
  const defaultService = services.find((s) => s.value === expertise) || null;
  const minDate = new Date();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  const locations = [
    {
      value: `${auth?.user?.Address}`,
      label: `Your account address (${auth?.user?.Address})`,
    },
    { value: "current", label: "Your current location" },
  ];

  const cityOptions = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "pune", label: "Pune" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "jaipur", label: "Jaipur" },
    { value: "lucknow", label: "Lucknow" },
    { value: "indore", label: "Indore" },
  ];

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url); // cleanup previous
        return { file, url: imageUrl };
      });
    }
  };

  const getHumanReadableAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const readableAddress = data.display_name || "Unknown Location";
      return readableAddress;
    } catch (error) {
      console.error("Error fetching human-readable address:", error.message);
      return "Unknown Location";
    }
  };

  const handleLocationChange = async (selectedLocation) => {
    setLocation(selectedLocation);

    if (selectedLocation.value === "current") {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
            });
          });

          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          const address = await getHumanReadableAddress(latitude, longitude);
          setCustomLocation(address);
        } catch (error) {
          console.error("Error getting location:", error);
          setCustomLocation("Unknown Location");
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
        setCustomLocation("Geolocation not supported");
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!description || !time || !date || !pincode) {
      toast.error("All fields are required");
      return;
    }
    if (
      (!location && !customLocation) ||
      (!service && !customService && !defaultService)
    ) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("user", auth.user._id);
    formData.append(
      "service",
      isCustomService
        ? customService
        : defaultService
        ? defaultService.value
        : service?.value
    );
    formData.append("description", description);
    formData.append("image", image?.file ? image.file : null);
    formData.append("time", time);
    formData.append("date", date);
    formData.append(
      "location",
      location?.value === "current" || isCustomLocation
        ? customLocation
        : location?.value
    );
    formData.append("pincode", pincode);
    formData.append("city", city);
    formData.append("coordinates", JSON.stringify(coordinates));
    formData.append("workerid", workerId);

    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/request/CreateRequest`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await request.json();

      if (result.success) {
        toast.success(result.message);
        // PredictPrice();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    } finally {
      setLoading(false);
    }
  }

  // async function PredictPrice() {
  //   try {
  //     if (!service || !city || !time) {
  //       return;
  //     }

  //     // Start loading
  //     setLoading(true);

  //     const City = city.trim().toLowerCase();
  //     const InputService = Service_mapping[service];
  //     const InputCity = city_mapping[City];

  //     const response = await fetch(
  //       "https://pricepredictionapi-kl6p.onrender.com/predict",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           serviceType: InputService,
  //           city: InputCity,
  //           time: time,
  //         }),
  //       }
  //     );

  //     if (response) {
  //       const data = await response.json();
  //       setPredictedPrice(data.predictedPrice);
  //       setActiveStep(3);
  //     }

  //     // End loading
  //     setLoading(false);
  //   } catch (error) {
  //     setActiveStep(3);
  //     setLoading(false);
  //     toast.error("Error in price prediction");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const isStepOptional = (step) => step === 1;

  return (
    <Box sx={{ width: "100%" }}>
      {/* backdrop  */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Toaster position="bottom-center" reverseOrder={false} />
      <p className="w-full text-center font-bold text-3xl mt-20 sm:mt-4 flex justify-center ">
        Create Request
        {workerId && workerName && (
          <span className="flex ml-2 gap-2 items-center">
            To Hire{" "}
            <Avatar
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/workers/GetWorkerImage/${workerId}`}
              sx={{ width: 35, height: 35 }}
            />{" "}
            {workerName}
          </span>
        )}
      </p>
      <Stepper
        activeStep={activeStep}
        className="xl:w-1/2 sm:w-3/4 w-[90%] m-auto mt-10"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div className="flex flex-col justify-center items-center gap-y-4 h-[500px]">
          <p className="font-bold text-2xl">Request submitted</p>

          {/* {predictedPrice !== null && (
            <p className="text-lg font-medium text-green-600">
              Estimated Price: ₹{predictedPrice}
            </p>
          )} */}

          <Image
            src="/success.svg"
            className="w-[300px]"
            alt="Success"
            width={300}
            height={300}
          />

          <Link href="/user/view_request">
            <CustomButton>View request</CustomButton>
          </Link>
          
        </div>
      ) : (
        <React.Fragment>
          <form
            onSubmit={handleSubmit}
            className="xl:w-1/2 sm:w-3/4 w-[90%] mt-4 mb-10 flex flex-col gap-y-3 justify-center p-4 formshadow items-center rounded-md m-auto"
          >
            {activeStep === 0 && (
              <React.Fragment>
                <Select
                  required
                  options={services}
                  isDisabled={defaultService ? true : isCustomService}
                  value={defaultService || service}
                  onChange={setService}
                  className="w-full"
                  placeholder="Select service"
                />
                <div className="flex gap-3 items-center justify-center w-full">
                  <p className="font-bold text-red-600">
                    Service not available?
                  </p>
                  <CustomButton
                    type="button"
                    onClick={() => setIsCustomService(!isCustomService)}
                  >
                    {isCustomService ? "Revert" : "Add custom service"}
                  </CustomButton>
                </div>

                {isCustomService && (
                  <Input
                    name="custom_service"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Request custom service"
                    className="w-full"
                    required
                  />
                )}
                <Textarea
                  name="description"
                  placeholder="Describe your problem"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-40 overflow-y-scroll scrollbar-hide"
                  required
                />
              </React.Fragment>
            )}
            {activeStep === 1 && (
              <React.Fragment>
                <div className="flex flex-col items-center mt-4 w-full">
                  <Button
                    component="label"
                    variant="outlined"
                    color="neutral"
                    className="w-full"
                    startDecorator={
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                          />
                        </svg>
                      </SvgIcon>
                    }
                  >
                    Upload a file
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {image && (
                    <div className="mt-2 flex">
                      <img
                        src={image.url}
                        alt="Uploaded preview"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <MdDeleteOutline
                        className="text-red-600 text-xl cursor-pointer"
                        onClick={() => setImage(null)}
                      />
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
            {activeStep === 2 && (
              <div className="w-full flex flex-col gap-6">
                <Select
                  required
                  options={locations}
                  isDisabled={isCustomLocation}
                  value={location}
                  onChange={handleLocationChange} // Use the new handler
                  className="w-full"
                  placeholder="Select location"
                />

                <div className="flex gap-3 items-center justify-center w-full">
                  <p className="font-bold text-red-600">
                    Need service somewhere else?
                  </p>
                  <CustomButton
                    type="button"
                    onClick={() => setIsCustomLocation(!isCustomLocation)}
                  >
                    {isCustomLocation ? "Revert" : "Add custom location"}
                  </CustomButton>
                </div>
                {isCustomLocation && (
                  <Input
                    name="custom_location"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder="Enter custom location"
                    className="w-full"
                  />
                )}
                <input
                  type="text"
                  maxLength={6}
                  className="p-2 border-2 border-gray-300 rounded-md"
                  value={pincode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      Setpincode(value);
                    }
                  }}
                  placeholder="Area Pincode"
                />

                {/* city  */}
                <Select
                  options={cityOptions}
                  value={cityOptions.find((c) => c.value === city)}
                  onChange={(selected) => Setcity(selected?.value || "")}
                  placeholder="Select city"
                  className="w-full"
                />

                <DatePicker
                  onChange={(date) => setdate(date)}
                  selected={date}
                  className="border border-gray-300 w-full p-2 rounded-md"
                  placeholderText="Select date"
                  minDate={minDate}
                  dateFormat="dd/MM/yyyy"
                />

                <input
                  type="time"
                  className="p-2 border-2 border-gray-300 rounded-md"
                  value={time}
                  onChange={(e) => {
                    settime(e.target.value);
                  }}
                  placeholder="select time"
                />
              </div>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleNext} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                disabled={loading}
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </form>
        </React.Fragment>
      )}
    </Box>
  );
};

export default UserPrivateRoutes(CreateRequest);
