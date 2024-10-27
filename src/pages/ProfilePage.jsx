import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import placeholder_profile from '../assets/img/placeholder_profile.svg'
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.user)
    const { firstName, lastName, email, profilePhotoUrl } = user
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [ordersVisible, setOrdersVisible] = useState(false)
   

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await fetch(`./api/order/get`)
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message)
            }else{
                setOrders(data.orders)
                setOrdersVisible(true)
                
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
       
    }

    const handleViewOrders = () => {
        fetchOrders()
        
    }

    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="bg-red-slate-200 p-8 rounded-lg flex flex-col justify-center items-center shadow-lg max-w-md w-full">
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
                <div className='space-y-4'>
                    {ordersVisible ? (
                        <>
                        {loading ? (
                            <Loading />
                        ) : (
                           <OrderCard orders={orders} />
                        )}
                        </>
                    ):(
                        <>
                        <button onClick={()=>handleViewOrders()} className='bg-green-500 text-white py-2 px-4 rounded'>View Orders</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
           