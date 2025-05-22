
import React, { useState } from 'react';
import { Calendar, Phone, Mail, DollarSign, CheckCircle, AlertCircle, XCircle, Send } from 'lucide-react';
import { Tenant } from '@/pages/Index';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';

interface TenantDashboardProps {
  tenants: Tenant[];
  onUpdateStatus: (id: string, status: Tenant['status']) => void;
}

const TenantDashboard: React.FC<TenantDashboardProps> = ({ tenants, onUpdateStatus }) => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'due' | 'late'>('all');
  const [sendingReminders, setSendingReminders] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const filteredTenants = tenants.filter(tenant => 
    filter === 'all' || tenant.status === filter
  );

  const getStatusIcon = (status: Tenant['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'due':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'late':
        return <XCircle className="text-red-500" size={20} />;
    }
  };

  const getStatusColor = (status: Tenant['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'due':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'late':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const statusCounts = {
    paid: tenants.filter(t => t.status === 'paid').length,
    due: tenants.filter(t => t.status === 'due').length,
    late: tenants.filter(t => t.status === 'late').length,
  };

  const handleSendReminder = async (tenant: Tenant) => {
    setSendingReminders(prev => ({ ...prev, [tenant.id]: true }));
    
    try {
      // In a real application, this would call an API to send the reminder
      // For now, we'll simulate a network request with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reminder sent",
        description: `Successfully sent a reminder to ${tenant.name}`,
      });
      
      console.log(`Reminder sent to ${tenant.name} (${tenant.email})`);
    } catch (error) {
      toast({
        title: "Failed to send reminder",
        description: `Could not send reminder to ${tenant.name}`,
        variant: "destructive",
      });
      console.error("Failed to send reminder:", error);
    } finally {
      setSendingReminders(prev => ({ ...prev, [tenant.id]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.paid}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Due</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.due}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.late}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        {(['all', 'paid', 'due', 'late'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tenant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tenant.status)} mt-2`}>
                    {getStatusIcon(tenant.status)}
                    {tenant.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{tenant.phone}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">{tenant.email}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <DollarSign size={16} />
                  <span className="text-sm font-medium">${tenant.rentAmount}/month</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">Due: {new Date(tenant.dueDate).toLocaleDateString()}</span>
                </div>

                {tenant.lastPayment && (
                  <div className="text-xs text-gray-500">
                    Last payment: {new Date(tenant.lastPayment).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  {tenant.status !== 'paid' && (
                    <button
                      onClick={() => onUpdateStatus(tenant.id, 'paid')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark Paid
                    </button>
                  )}
                  
                  <Button
                    onClick={() => handleSendReminder(tenant)}
                    disabled={sendingReminders[tenant.id]}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    variant="default"
                  >
                    {sendingReminders[tenant.id] ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={16} /> Send Reminder
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-500">No tenants match the current filter.</p>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
