import React from 'react';
import { CalendarDays, Mail, MapPin, Phone, User, DollarSign, Package } from 'lucide-react';

const OrderCard = ({ orders }) => {
  return (
    <div className="grid grid-cols-1  gap-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Order ID: {order._id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">${order.orderTotal}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span className="text-xs">{order.date?.slice(0,10)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{order.firstName} {order.lastName}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm truncate">{order.email}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm truncate">{order.address}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{order.phone}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm">PIN: {order.pincode}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;