import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/Slices/authSlice';
import axios from 'axios';

export default function Navbar() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true })
            dispatch(logout()); // update redux state
            navigate("/login"); // redirect user
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group"
                    >
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl group-hover:scale-105 transition-transform duration-200">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Shortly
                        </span>
                    </Link>

                    {/* Right Section */}
                    {!isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <NavLink
                                to="/login"
                                end
                                className={({ isActive }) =>
                                    `px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50 border border-gray-700/50 hover:border-emerald-500/50'
                                    }`
                                }
                            >
                                Sign In
                            </NavLink>

                            <NavLink
                                to="/signup"
                                end
                                className={({ isActive }) =>
                                    `px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                                        : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl'
                                    }`
                                }
                            >
                                Get Started
                            </NavLink>

                        </div>
                    ) : (
                        <div className="flex items-center space-x-6">
                            {/* User Info */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-white font-medium text-sm">Welcome back!</p>
                                    <p className="text-gray-400 text-xs">{user?.email || 'User'}</p>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center space-x-1">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 hover:border-red-600 rounded-lg font-medium transition-all duration-200 group"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}