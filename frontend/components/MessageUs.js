import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useSendMessageMutation } from '../store/slices/api/contactApiSlice';

const MessageUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [sendMessage, { isLoading, isError, isSuccess }] = useSendMessageMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(formData).unwrap();
      setFormData({ fullName: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-300 to-blue-500 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-blue-500 opacity-30 -z-10"></div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Message Us</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 text-gray-900 p-3 border border-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 text-gray-900 p-3 border border-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 text-gray-900 p-3 border border-gray-300"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
              disabled={isLoading}
            >
              <Send className="w-5 h-5 mr-2" />
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {isError && <p className="text-red-500 mt-4 text-center">Failed to send message. Please try again.</p>}
        {isSuccess && <p className="text-green-500 mt-4 text-center">Message sent successfully!</p>}
      </div>
    </div>
  );
};

export default MessageUs;