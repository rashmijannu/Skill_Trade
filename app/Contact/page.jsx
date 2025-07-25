"use client";
import React, { useState } from "react";
import { FaGithub, FaEnvelope, FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image"


const Footer = dynamic(() => import("../_components/Footer"), { ssr: false });

const ContactForm = () => {
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Message, SetMessage] = useState("");
  const [loading, Setloading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      Setloading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/SubmitUserQueryForm`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ Name, Email, Message }),
        }
      );
      if (response.status === 200) {
        // toast.success("We received your query");
        alert("We received your query");
        SetName("");
        SetEmail("");
        SetMessage("");
      } else {
        // toast.error("Please try after some time");
        alert("Please try after some time");
      }
    } catch (error) {
      // toast.error("Something went wrong");
      alert("Something went wrong");
    } finally {
      Setloading(false);
    }
  }

  return (
    <div className="w-full ">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
          <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors duration-200 bg-gray-50 focus:bg-white"
              id="name"
              required
              placeholder="Enter your full name"
              value={Name}
              onChange={(e) => SetName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors duration-200 bg-gray-50 focus:bg-white"
              id="email"
              required
              placeholder="Enter your email address"
              value={Email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              Message *
            </label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
              id="message"
              rows="5"
              required
              placeholder="Tell us how we can help you..."
              value={Message}
              onChange={(e) => SetMessage(e.target.value)}
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="w-full ">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
        </div>
        
        
        {/* Contact Us */}
        <div className="flex justify-center mb-6">
          <div className="w-88 h-62 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Image
            src="/contactpg.svg"
            alt="contact support"
            className="w-82 h-62 rectangle-full object-cover shadow-lg mb-2"
            width={500}
            height={500}
          />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-xl">
            <FaEnvelope className="text-xl text-gray-300" />
            <div>
              <p className="font-semibold">Email</p>
              <a href="mailto:asharma7588@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                asharma7588@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-xl">
            <FaEnvelope className="text-xl text-gray-300" />
            <div>
              <p className="font-semibold">Support</p>
              <a href="mailto:Mohitsinghtadhiyal8@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                Mohitsinghtadhiyal8@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-xl">
            <FaLinkedin className="text-xl text-gray-300" />
            <div>
              <p className="font-semibold">LinkedIn</p>
              <a 
                href="https://www.linkedin.com/in/ayush-sharma-a155a8267" 
                target="_blank" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Ayush Sharma
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeveloperSection = () => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet the Developer</h3>
      
      <div className="flex flex-col items-center">
        <Image
            src="/Ayush2.jpg"
            alt="Ayush Sharma"
            className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
            width={200}
            height={200}
          />

        
        <h4 className="text-xl font-bold text-gray-900 mb-1">Ayush Sharma</h4>
        <p className="text-gray-600 mb-6">Developer and Project Manager</p>
        
        <div className="flex space-x-4">
          <a
            href="https://github.com/AyushSharma72"
            target="_blank"
            className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 transform hover:scale-110"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="mailto:asharma7588@gmail.com"
            className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors duration-200 transform hover:scale-110"
          >
            <FaEnvelope className="text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayush-sharma-a155a8267"
            target="_blank"
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200 transform hover:scale-110"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-black">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are here for you. How can we help?
          </p>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <ContactForm />
            <ContactInfo />
          </div>
          
          {/* Developer Section */}
          <div className="max-w-2xl mx-auto">
            <DeveloperSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;