import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    // State for toggling edit mode
    const [isEditing, setIsEditing] = useState(false);
    
    // State to hold the profile data fetched from the server
    const [profileData, setProfileData] = useState(null);
    
    // State to manage the data in the form fields while editing
    const [formData, setFormData] = useState(null);
    
    const navigate = useNavigate();

    // --- DATA FETCHING AND SESSION HANDLING ---

    // This effect runs when the component mounts to fetch the user's profile
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token is found
                return;
            }

            try {
                // Set up the standard Authorization header
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                };
                // Make the API call to the backend
                const { data } = await axios.get('http://localhost:5000/api/profile', config);
                
                setProfileData(data); // Set the display data
                setFormData(data);    // Initialize the form with fetched data
            } catch (error) {
                console.error('Could not fetch profile:', error);
                localStorage.removeItem('token'); // Clear invalid token
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);
    
    // --- SIGN OUT HANDLER ---
    const handleSignOut = () => {
        // Clear the user's token from storage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login');
    };


    // --- FORM INPUT HANDLERS ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }));
    };

    const handleArrayChange = (e, field) => {
        const values = e.target.value.split(',').map(item => item.trim());
        setFormData(prev => ({ ...prev, [field]: values }));
    };

    // --- API CALLS FOR SAVING AND DELETING ---

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.put('http://localhost:5000/api/profile', formData, config);
            
            setProfileData(data); // Update the view with the saved data
            setIsEditing(false);  // Exit edit mode
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleCancel = () => {
        setFormData(profileData); // Revert any changes made in the form
        setIsEditing(false);      // Exit edit mode
    };
    
    const handleDeleteSession = async () => {
        if (window.confirm("Are you sure you want to cancel this session?")) {
            const token = localStorage.getItem('token');
            try {
                 const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                await axios.delete('http://localhost:5000/api/session', config);
                
                // Update the state to reflect the deletion
                const updatedProfile = { ...profileData, session: null };
                setProfileData(updatedProfile);
                setFormData(updatedProfile);
                alert('Session cancelled successfully.');
            } catch (error) {
                console.error('Failed to cancel session', error);
                alert('Failed to cancel session. Please try again.');
            }
        }
    };

    // --- RENDER LOGIC ---

    // Display a loading message until data is fetched from the server
    if (!profileData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '2rem' }}>
                Loading Profile...
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', fontFamily: "'Inter', sans-serif" }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '18px', fontWeight: '600' }}>
                    ← Back to Dashboard
                </Link>
                <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>Profile</h1>
                <button onClick={handleSignOut} style={{
                    background: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                }}>
                    Sign Out
                </button>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
                {/* Left Column */}
                <div style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '30px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', height: 'fit-content' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>{profileData.avatar}</div>
                        <h2 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
                            {profileData.firstName || 'User'} {profileData.lastName}
                        </h2>
                        <p style={{ margin: 0, color: '#718096', fontSize: '16px' }}>
                            {profileData.experience || 'No experience listed'}
                        </p>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Upcoming Session Section */}
                     <div style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '30px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }}>
                        <h2 style={{ margin: '0 0 20px 0', color: '#2d3748' }}>Upcoming Session</h2>
                        {profileData.session && profileData.session.title ? (
                            <div>
                                <h3 style={{ color: '#667eea', margin: '0 0 10px 0' }}>{profileData.session.title}</h3>
                                <p style={{ margin: '0 0 5px 0' }}><strong>Date:</strong> {new Date(profileData.session.date).toLocaleDateString()}</p>
                                <p style={{ margin: '0 0 15px 0' }}><strong>Time:</strong> {profileData.session.time}</p>
                                <button onClick={handleDeleteSession} style={{ background: '#e53e3e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                                    Cancel Session
                                </button>
                            </div>
                        ) : (
                            <p style={{ color: '#718096' }}>No upcoming sessions scheduled. Create one from the dashboard!</p>
                        )}
                    </div>

                    {/* Profile Details Section */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '30px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ margin: 0, color: '#2d3748' }}>Profile Details</h2>
                            <button onClick={isEditing ? handleCancel : () => setIsEditing(true)} style={{ background: isEditing ? '#e53e3e' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {isEditing ? (
                            // Edit Form
                            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>First Name</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Last Name</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Bio</label>
                                        <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px', resize: 'vertical' }}/>
                                    </div>
                                     {/* --- ADDED EXPERIENCE AND EDUCATION INPUTS --- */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Experience</label>
                                            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Education</label>
                                            <input type="text" name="education" value={formData.education} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Skills (comma-separated)</label>
                                        <input type="text" value={formData.skills.join(', ')} onChange={(e) => handleArrayChange(e, 'skills')} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                    </div>
                                     <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Interests (comma-separated)</label>
                                        <input type="text" value={formData.interests.join(', ')} onChange={(e) => handleArrayChange(e, 'interests')} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                         <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>GitHub URL</label>
                                            <input type="text" name="github" value={formData.socialLinks.github} onChange={handleSocialLinkChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>LinkedIn URL</label>
                                            <input type="text" name="linkedin" value={formData.socialLinks.linkedin} onChange={handleSocialLinkChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                         <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>Twitter URL</label>
                                            <input type="text" name="twitter" value={formData.socialLinks.twitter} onChange={handleSocialLinkChange} style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}/>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                        <button type="submit" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            // Display Mode
                            <div style={{ display: 'grid', gap: '25px' }}>
                                <div>
                                    <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>About</h3>
                                    <p style={{ color: '#4a5568', lineHeight: '1.6' }}>{profileData.bio || 'No bio provided.'}</p>
                                </div>
                                <div>
                                    <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>Contact</h3>
                                    <div style={{ display: 'grid', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontWeight: '600', color: '#4a5568' }}>Email:</span>
                                            <span style={{ color: '#718096' }}>{profileData.email}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontWeight: '600', color: '#4a5568' }}>Location:</span>
                                            <span style={{ color: '#718096' }}>{profileData.location || 'Not specified'}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* --- ADDED EXPERIENCE AND EDUCATION DISPLAY --- */}
                                <div>
                                    <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>Experience & Education</h3>
                                    <div style={{ display: 'grid', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontWeight: '600', color: '#4a5568' }}>Experience:</span>
                                            <span style={{ color: '#718096' }}>{profileData.experience || 'Not specified'}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontWeight: '600', color: '#4a5568' }}>Education:</span>
                                            <span style={{ color: '#718096' }}>{profileData.education || 'Not specified'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>Skills</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {profileData.skills && profileData.skills.length > 0 ? profileData.skills.map((skill, index) => (
                                            <span key={index} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                                                {skill}
                                            </span>
                                        )) : <p style={{ color: '#718096' }}>No skills listed.</p>}
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>Interests</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                         {profileData.interests && profileData.interests.length > 0 ? profileData.interests.map((interest, index) => (
                                            <span key={index} style={{ background: '#e6fffa', color: '#2c7a7b', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                                                {interest}
                                            </span>
                                        )) : <p style={{ color: '#718096' }}>No interests listed.</p>}
                                    </div>
                                </div>
                                <div>
                                     <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>Social Links</h3>
                                     <div style={{ display: 'flex', gap: '15px' }}>
                                         <a href={profileData.socialLinks.github || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>GitHub</a>
                                         <a href={profileData.socialLinks.linkedin || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>LinkedIn</a>
                                         <a href={profileData.socialLinks.twitter || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Twitter</a>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

