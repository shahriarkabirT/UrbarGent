import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const GetInTouch = () => {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">Get In Touch</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    <ContactCard
                        Icon={MapPin}
                        title="Address"
                        details={[
                            "5th Floor, House 1289, Road 11, Avenue 02",
                            "Mirpur DOHS, Dhaka 1216"
                        ]}
                        color="bg-blue-200"
                        iconColor="text-blue-600"
                    />
                    <ContactCard
                        Icon={Phone}
                        title="Phone"
                        details={[
                            "Main: +8801795148792"
                        ]}
                        color="bg-green-200"
                        iconColor="text-green-600"
                    />
                    <ContactCard
                        Icon={Mail}
                        title="Email"
                        details={[
                            "shahriarkabir078@gmail.com",
                        ]}
                        color="bg-yellow-200"
                        iconColor="text-yellow-600"
                    />
                </div>
            </div>
        </div>
    );
};

const ContactCard = ({ Icon, title, details, color, iconColor }) => {
    return (
        <div className={`p-8 rounded-lg shadow-xl ${color} text-gray-800 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out`}>
            <div className={`flex justify-center mb-4 ${iconColor}`}>
                <Icon className="w-14 h-14" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="space-y-2">
                {details.map((detail, index) => (
                    <p key={index} className="text-lg">{detail}</p>
                ))}
            </div>
        </div>
    );
};

export default GetInTouch;