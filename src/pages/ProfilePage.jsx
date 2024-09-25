import React from 'react';
import { useSelector } from 'react-redux';
import placeholder_profile from '../assets/img/placeholder_profile.svg'

const ProfilePage = () => {
    const { user } = useSelector((state) => state.user)
    const { firstName, lastName, email, profilePhotoUrl } = user
    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="bg-red-slate-200 p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    {profilePhotoUrl ? (
                        <img
                            src={profilePhotoUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-500"
                        />
                    ) : (
                        <img src={placeholder_profile} alt="profile" className="w-32 h-32 text-red-500 mx-auto mb-4" />
                    )}
                    <h1 className="text-3xl font-bold text-red-700">{firstName} {lastName}</h1>
                </div>

                <div className="space-y-4">

                    <div className="bg-gray-50 p-4 rounded flex flex-col justify-center items-center space-y-2">
                        <h2 className="text-gray-400 font-semibold">Email</h2>
                        <p className="text-gray-700">{email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;