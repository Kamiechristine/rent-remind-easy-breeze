
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TenantDashboard from '@/components/TenantDashboard';
import AddTenantForm from '@/components/AddTenantForm';
import Header from '@/components/Header';

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  rentAmount: number;
  dueDate: string;
  status: 'paid' | 'due' | 'late';
  lastPayment?: string;
}

const Index = () => {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      rentAmount: 1200,
      dueDate: '2025-01-01',
      status: 'paid',
      lastPayment: '2024-12-28'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      email: 'sarah.johnson@email.com',
      rentAmount: 950,
      dueDate: '2025-01-05',
      status: 'due'
    },
    {
      id: '3',
      name: 'Mike Davis',
      phone: '+1 (555) 456-7890',
      email: 'mike.davis@email.com',
      rentAmount: 1500,
      dueDate: '2024-12-20',
      status: 'late'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addTenant = (newTenant: Omit<Tenant, 'id'>) => {
    const tenant: Tenant = {
      ...newTenant,
      id: Date.now().toString()
    };
    setTenants(prev => [...prev, tenant]);
    setShowAddForm(false);
  };

  const updateTenantStatus = (id: string, status: Tenant['status']) => {
    setTenants(prev => 
      prev.map(tenant => 
        tenant.id === id 
          ? { ...tenant, status, lastPayment: status === 'paid' ? new Date().toISOString().split('T')[0] : tenant.lastPayment }
          : tenant
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Management</h1>
            <p className="text-gray-600">Manage rent reminders and tenant information</p>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Add Tenant
          </button>
        </div>

        <TenantDashboard 
          tenants={tenants} 
          onUpdateStatus={updateTenantStatus}
        />

        {showAddForm && (
          <AddTenantForm
            onAddTenant={addTenant}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
