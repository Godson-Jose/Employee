import React, { useState, useEffect } from 'react';
import './App.css';
import localEmployees from './data/employees.json';

// --- Icon Components (as SVGs for better customization) ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const DollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h4z" />
    </svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- Helper Components ---

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
    <p className="font-bold">Operation Failed</p>
    <p>Could not fetch employee data. Reason: {message}</p>
  </div>
);

// --- Enhanced Photo & Email Logic ---
const maleFirstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth', 'Ervin', 'Dennis', 'Kurtis', 'Nicholas'];

const getUniqueProfessionalPhoto = (name, id) => {
    const firstName = name.split(' ')[0].replace('Mrs.', '').trim();
    const gender = maleFirstNames.some(maleName => firstName.includes(maleName)) ? 'men' : 'women';
    const photoId = id % 100;
    return `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`;
};

const getProfessionalEmail = (name) => {
    const nameParts = name.replace(/Mrs\.|Mr\./g, '').trim().split(' ');
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';
    
    if (lastName) {
      return `${firstName}.${lastName}@empower.hr`;
    }
    return `${firstName}@empower.hr`;
};


// --- Main Components ---

const EmployeeCard = ({ employee, onSelectEmployee }) => {
  return (
    <div 
        onClick={() => onSelectEmployee(employee)}
        className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="flex items-center space-x-4">
        <img className="h-14 w-14 rounded-full object-cover shadow-md" src={employee.photoUrl} alt={`${employee.name}'s profile`} />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {employee.name}
          </p>
          <p className="text-sm text-gray-600 truncate">
            {employee.email}
          </p>
        </div>
      </div>
    </div>
  );
};

const EmployeeDashboard = ({ employees, onSelectEmployee }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Employee Dashboard</h1>
        <p className="text-gray-600 mt-2">View and manage your team's information.</p>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-10 bg-white/50 backdrop-blur-sm rounded-xl">
            <p className="text-gray-600">No employee data to display.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} onSelectEmployee={onSelectEmployee} />
          ))}
        </div>
      )}
    </div>
  );
};

const InputField = ({ id, placeholder, icon, type = "text", value, onChange }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
            placeholder={placeholder}
            required
        />
    </div>
);

const EmployeeForm = ({ onAddEmployee }) => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !designation || !location || !salary) {
            alert('Please fill out all fields.');
            return;
        }

        const newEmployeeId = Date.now();

        const newEmployee = {
            id: newEmployeeId,
            name,
            email: getProfessionalEmail(name), 
            photoUrl: getUniqueProfessionalPhoto(name, newEmployeeId),
            designation,
            location,
            salary
        };

        onAddEmployee(newEmployee);

        setName('');
        setDesignation('');
        setLocation('');
        setSalary('');
    };
  
    return (
    <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">New Employee Details</h1>
        <p className="text-gray-600 mb-8">Fill out the form to add a new team member.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <InputField id="name" placeholder="e.g., Jane Doe" icon={<UserIcon />} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <InputField id="designation" placeholder="e.g., Software Engineer" icon={<BriefcaseIcon />} value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <InputField id="location" placeholder="e.g., New York, NY" icon={<LocationIcon />} value={location} onChange={(e) => setLocation(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <InputField id="salary" placeholder="e.g., 95000" icon={<DollarIcon />} type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
          <div className="pt-4">
             <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployeeDetailModal = ({ employee, onClose }) => {
    if (!employee) return null;
    
    const handleContentClick = (e) => e.stopPropagation();

    const DetailItem = ({ icon, label, value }) => (
        <div className="flex items-center text-gray-700">
            <div className="w-6 h-6 mr-3 text-indigo-500">{icon}</div>
            <div>
                <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
                <p className="text-lg">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out scale-95 hover:scale-100" onClick={handleContentClick}>
                <div className="p-6 text-right">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <XIcon />
                    </button>
                </div>

                <div className="flex flex-col items-center -mt-4 px-8 pb-8">
                    <img className="h-32 w-32 rounded-full object-cover shadow-xl border-4 border-white" src={employee.photoUrl} alt={`${employee.name}'s profile`} />
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">{employee.name}</h2>
                    <p className="text-md text-indigo-600">{employee.email}</p>

                    <div className="w-full mt-8 space-y-4">
                        <DetailItem icon={<BriefcaseIcon />} label="Designation" value={employee.designation || 'N/A'} />
                        <DetailItem icon={<LocationIcon />} label="Location" value={employee.location || 'N/A'} />
                        <DetailItem icon={<DollarIcon />} label="Salary" value={employee.salary ? `$${Number(employee.salary).toLocaleString()}` : 'N/A'} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function App() {
  const [page, setPage] = useState('dashboard');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Prefer local JSON bundled with the app for consistent employee data
        let data = Array.isArray(localEmployees) && localEmployees.length ? localEmployees : null;

        // Fallback to remote API if local data is unavailable
        if (!data) {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          data = await response.json();
        }

        const designations = ['Software Engineer', 'Product Manager', 'UX/UI Designer', 'Data Scientist', 'Marketing Head', 'Lead Developer', 'QA Tester', 'DevOps Engineer', 'HR Manager', 'Project Lead'];
        const locations = ['New York, NY', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Berlin, DE', 'Paris, FR', 'Toronto, CA', 'San Francisco, CA', 'Singapore', 'Mumbai, IN'];

        data = data.map(emp => ({
            ...emp,
            email: getProfessionalEmail(emp.name),
            photoUrl: getUniqueProfessionalPhoto(emp.name, emp.id),
            designation: designations[emp.id % designations.length],
            location: locations[emp.id % locations.length],
            salary: Math.floor(Math.random() * (150000 - 60000 + 1)) + 60000,
        }));
        setEmployees(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = (newEmployee) => {
    setEmployees(prevEmployees => [newEmployee, ...prevEmployees]);
    setPage('dashboard');
  };
  
  const handleSelectEmployee = (employee) => {
      setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
      setSelectedEmployee(null);
  };

  const NavLink = ({ children, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
        isActive
          ? 'bg-white text-indigo-600 shadow-md'
          : 'text-white hover:bg-white/20'
      }`}
    >
      {children}
    </button>
  );

  const renderContent = () => {
      if (loading) return <Spinner />;
      if (error) return <ErrorMessage message={error} />;
      
      switch(page) {
          case 'dashboard':
              return <EmployeeDashboard employees={employees} onSelectEmployee={handleSelectEmployee} />;
          case 'form':
              return <EmployeeForm onAddEmployee={handleAddEmployee} />;
          default:
              return <EmployeeDashboard employees={employees} onSelectEmployee={handleSelectEmployee} />;
      }
  };

  return (
    <div 
        className="min-h-screen bg-gray-200 font-sans bg-cover bg-center" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2070&auto=format&fit=crop')"}}
    >
      <div className="min-h-screen bg-black/10 backdrop-blur-sm">
          <nav className="bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                  <span className="font-bold text-2xl text-white tracking-wider">Empower HR</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/20 p-2 rounded-xl">
                  <NavLink onClick={() => setPage('dashboard')} isActive={page === 'dashboard'}>
                    Dashboard
                  </NavLink>
                  <NavLink onClick={() => setPage('form')} isActive={page === 'form'}>
                    Employee Form
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
    
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {renderContent()}
          </main>
          
          <EmployeeDetailModal employee={selectedEmployee} onClose={handleCloseModal} />
      </div>
    </div>
  );
}
