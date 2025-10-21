import React, { useState, useEffect, useMemo } from 'react';

// --- SVG Icons for Dark Mode ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const DollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h4z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const SortIcon = () => <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.074 2.074 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.122 2.122 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.847-1.087Z" /></svg>;

// --- Helper Functions ---
const getUniqueProfessionalPhoto = (name, id) => {
    const firstName = name.split(' ')[0];
    const femaleNames = ['Leanne', 'Clementine', 'Patricia', 'Chelsey', 'Glenna', 'Clementina'];
    const gender = femaleNames.includes(firstName) ? 'women' : 'men';
    const photoId = id % 100;
    return `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`;
};

// This function is now only used for NEW employees created via the form.
const getProfessionalEmail = (name) => {
    const nameParts = name.replace(/Mrs\.|Mr\./g, '').trim().split(' ');
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';
    return lastName ? `${firstName}.${lastName}@empower.hr` : `${firstName}@empower.hr`;
};

// --- Re-designed Components for Dark Mode ---

const Sidebar = () => (
    <div className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-white border-b border-gray-700">
            Empower HR
        </div>
        <nav className="flex-grow px-4 py-6">
            <ul>
                <li>
                    <a href="#" className="flex items-center px-4 py-3 bg-gray-700 text-white rounded-lg">
                        <HomeIcon />
                        <span className="ml-4">Dashboard</span>
                    </a>
                </li>
            </ul>
        </nav>
        <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-500">
            &copy; 2025 Empower HR
        </div>
    </div>
);

const EmployeeTable = ({ employees, onSelectEmployee, onAddEmployeeClick }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const sortedEmployees = useMemo(() => {
        let sortableItems = [...employees];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [employees, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const SortableHeader = ({ children, name }) => (
        <th scope="col" className="px-6 py-3" onClick={() => requestSort(name)}>
            <div className="flex items-center cursor-pointer">
                {children} <SortIcon />
            </div>
        </th>
    );

    return (
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Employee Roster</h1>
                    <p className="text-gray-400 mt-1">Manage all employees in your organization.</p>
                </div>
                <button onClick={onAddEmployeeClick} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    <PlusIcon /> Add Employee
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="p-4"></th>
                            <SortableHeader name="name">Employee</SortableHeader>
                            <SortableHeader name="designation">Designation</SortableHeader>
                            <SortableHeader name="location">Location</SortableHeader>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map(employee => (
                            <tr key={employee.id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <img className="w-10 h-10 rounded-full" src={employee.photoUrl} alt={`${employee.name} profile`} />
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {employee.name}
                                    <div className="text-xs text-gray-400">{employee.email}</div>
                                </th>
                                <td className="px-6 py-4">{employee.designation}</td>
                                <td className="px-6 py-4">{employee.location}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onSelectEmployee(employee)} className="font-medium text-blue-500 hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Modal = ({ children, onClose, title }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
        <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 border border-gray-700" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const EmployeeFormModal = ({ onAddEmployee, onClose }) => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !designation || !location || !salary) {
            alert('Please fill out all fields.');
            return;
        }
        const newEmployeeId = Date.now();
        onAddEmployee({
            id: newEmployeeId, name, designation, location, salary,
            email: getProfessionalEmail(name),
            photoUrl: getUniqueProfessionalPhoto(name, newEmployeeId),
        });
        onClose();
    };
  
    const InputField = ({ id, label, placeholder, icon, type = "text", value, onChange }) => (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>
                <input type={type} id={id} value={value} onChange={onChange} className="border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder={placeholder} required />
            </div>
        </div>
    );
    
    return (
        <Modal onClose={onClose} title="Add New Employee">
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField id="name" label="Name" placeholder="e.g., Jane Doe" icon={<UserIcon />} value={name} onChange={(e) => setName(e.target.value)} />
                <InputField id="designation" label="Designation" placeholder="e.g., Software Engineer" icon={<BriefcaseIcon />} value={designation} onChange={(e) => setDesignation(e.target.value)} />
                <InputField id="location" label="Location" placeholder="e.g., New York, NY" icon={<LocationIcon />} value={location} onChange={(e) => setLocation(e.target.value)} />
                <InputField id="salary" label="Salary" placeholder="e.g., 95000" icon={<DollarIcon />} type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </form>
        </Modal>
    );
};

const EmployeeDetailModal = ({ employee, onClose }) => {
    if (!employee) return null;

    const DetailItem = ({ icon, label, value }) => (
        <div className="flex items-center text-gray-300"><div className="w-6 h-6 mr-4 text-gray-400">{icon}</div><div><p className="text-xs font-bold uppercase text-gray-500">{label}</p><p className="text-lg">{value}</p></div></div>
    );

    return (
        <Modal onClose={onClose} title="Employee Details">
            <div className="flex flex-col items-center p-4">
                <img className="h-32 w-32 rounded-full object-cover shadow-xl border-4 border-gray-600" src={employee.photoUrl} alt={`${employee.name}'s profile`} />
                <h2 className="text-3xl font-bold text-white mt-4">{employee.name}</h2>
                <p className="text-md text-blue-400">{employee.email}</p>
                <div className="w-full mt-8 space-y-4">
                    <DetailItem icon={<BriefcaseIcon />} label="Designation" value={employee.designation || 'N/A'} />
                    <DetailItem icon={<LocationIcon />} label="Location" value={employee.location || 'N/A'} />
                    <DetailItem icon={<DollarIcon />} label="Salary" value={employee.salary ? `$${Number(employee.salary).toLocaleString()}` : 'N/A'} />
                </div>
            </div>
        </Modal>
    );
};

// --- Main App Component ---
export default function App() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isFormModalOpen, setFormModalOpen] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                let data = await response.json();
                
                // Map API data to the structure our components expect
                data = data.map(emp => ({
                    id: emp.id,
                    name: emp.name,
                    email: emp.email, // Use email directly from API
                    photoUrl: getUniqueProfessionalPhoto(emp.name, emp.id), // Keep photo generation
                    designation: emp.company.bs.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), // Capitalize designation
                    location: emp.address.city, // Use city for location
                    salary: Math.floor(Math.random() * (150000 - 60000 + 1)) + 60000, // Keep random salary
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
        setEmployees(prev => [newEmployee, ...prev]);
    };

    return (
        <div className="flex h-screen bg-gray-800 text-gray-100 font-sans">
            <Sidebar />
            <main className="flex-1 p-10 overflow-auto">
                {loading && <div className="text-center">Loading...</div>}
                {error && <div className="text-center text-red-500">Error: {error}</div>}
                {!loading && !error && (
                    <EmployeeTable
                        employees={employees}
                        onSelectEmployee={setSelectedEmployee}
                        onAddEmployeeClick={() => setFormModalOpen(true)}
                    />
                )}
            </main>
            {isFormModalOpen && (
                <EmployeeFormModal
                    onAddEmployee={handleAddEmployee}
                    onClose={() => setFormModalOpen(false)}
                />
            )}
            {selectedEmployee && (
                <EmployeeDetailModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
}



