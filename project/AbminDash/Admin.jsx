import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Users, ShoppingCart, TrendingUp, Settings, LogOut, Menu as MenuIcon, X } from "lucide-react";
import { useAuth } from "../src/context/useAuth";

const initialMenu = [
  { id: 1, name: "Paneer Tikka", category: "Specials", price: 300 },
  { id: 2, name: "Mutton Curry", category: "Specials", price: 400 },
  { id: 3, name: "Veg Biryani", category: "Main Course", price: 250 },
];

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menu, setMenu] = useState(() => {
    const storedMenu = localStorage.getItem("menu");
    return storedMenu ? JSON.parse(storedMenu) : initialMenu;dd
  });

  const [view, setView] = useState("Dashboard");
  const [newSpecial, setNewSpecial] = useState({ name: "", price: "" });

  const [users, setUsers] = useState(() => {
    const s = localStorage.getItem("users");
    return s ? JSON.parse(s) : [];
  });

  const [admins, setAdmins] = useState(() => {
    const s = localStorage.getItem("admins");
    return s ? JSON.parse(s) : [{ username: "admin", password: "admin123" }];
  });

  const [orders, setOrders] = useState(() => {
    const s = localStorage.getItem("orders");
    return s ? JSON.parse(s) : [];
  });

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addSpecial = () => {
    if (!newSpecial.name || !newSpecial.price) return;
    const newItem = {
      id: Date.now(),
      name: newSpecial.name,
      price: Number(newSpecial.price),
      category: "Specials",
    };
    setMenu((m) => [...m, newItem]);
    setNewSpecial({ name: "", price: "" });
  };

  const removeSpecial = (id) => {
    setMenu((m) => m.filter((item) => item.id !== id));
  };

  const removeUser = (username) => {
    if (!confirm(`Remove user ${username}? This cannot be undone.`)) return;
    setUsers((u) => u.filter((x) => x.username !== username));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      return updated;
    });
  };

  const deleteOrder = (orderId) => {
    if (!confirm(`Delete order ${orderId}?`)) return;
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const pending = orders.filter((o) => o.status === "Pending").length;
    return { totalUsers, totalOrders, revenue, pending };
  }, [users, orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">

      {/* Main Container */}
      <div className="flex min-h-[calc(100vh-100px)] relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`fixed md:relative w-72 md:w-72 bg-gradient-to-b from-amber-900 to-amber-800 text-white p-6 shadow-xl z-40 h-full md:h-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          </div>
          
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => { setView("Dashboard"); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                view === "Dashboard" 
                  ? "bg-amber-700 text-white shadow-lg" 
                  : "hover:bg-amber-700 text-amber-100"
              }`}
            >
              <BarChart3 size={20} />
              Dashboard
            </button>

            <Link
              to="/Menu1"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-700 transition font-medium text-amber-100 hover:text-white"
            >
              🍽️ Menu
            </Link>

            <button
              onClick={() => { setView("Orders"); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                view === "Orders" 
                  ? "bg-amber-700 text-white shadow-lg" 
                  : "hover:bg-amber-700 text-amber-100"
              }`}
            >
              <ShoppingCart size={20} />
              Orders
            </button>

            <button
              onClick={() => { setView("Users"); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                view === "Users" 
                  ? "bg-amber-700 text-white shadow-lg" 
                  : "hover:bg-amber-700 text-amber-100"
              }`}
            >
              <Users size={20} />
              Users
            </button>

            <button
              onClick={() => { setView("Settings"); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                view === "Settings" 
                  ? "bg-amber-700 text-white shadow-lg" 
                  : "hover:bg-amber-700 text-amber-100"
              }`}
            >
              <Settings size={20} />
              Settings
            </button>
          </nav>

          <div className="mt-8 pt-6 border-t border-amber-700">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              ← Go Back
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto w-full md:w-auto">
          {view === "Dashboard" && (
            <>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">Dashboard</h2>
                <p className="text-sm sm:text-base text-amber-700">Welcome to Golden Essence Admin Panel</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
                {/* Users Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-blue-600 font-semibold text-sm mb-1">Total Users</div>
                      <div className="text-4xl font-bold text-blue-900">{stats.totalUsers}</div>
                    </div>
                    <Users size={40} className="text-blue-300" />
                  </div>
                </div>

                {/* Orders Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-600 font-semibold text-sm mb-1">Total Orders</div>
                      <div className="text-4xl font-bold text-green-900">{stats.totalOrders}</div>
                    </div>
                    <ShoppingCart size={40} className="text-green-300" />
                  </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-amber-700 font-semibold text-sm mb-1">Total Revenue</div>
                      <div className="text-3xl font-bold text-amber-900">₹{stats.revenue}</div>
                    </div>
                    <TrendingUp size={40} className="text-amber-300" />
                  </div>
                </div>

                {/* Pending Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-red-600 font-semibold text-sm mb-1">Pending Orders</div>
                      <div className="text-4xl font-bold text-red-900">{stats.pending}</div>
                    </div>
                    <ShoppingCart size={40} className="text-red-300" />
                  </div>
                </div>
              </div>

              {/* Recent Orders Section */}
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Recent Orders</h3>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No orders yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                          <tr>
                            <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Amount</th>
                            <th className="px-6 py-3 text-left font-semibold">Date</th>
                            <th className="px-6 py-3 text-left font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-100">
                          {orders
                            .slice()
                            .reverse()
                            .slice(0, 6)
                            .map((o) => (
                              <tr key={o.id} className="hover:bg-amber-50 transition">
                                <td className="px-6 py-4 font-semibold text-amber-900">{o.id}</td>
                                <td className="px-6 py-4 font-bold text-amber-700">₹{o.total}</td>
                                <td className="px-6 py-4 text-gray-600">{o.date} {o.time}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                    o.status === "Delivered" ? "bg-green-100 text-green-700" :
                                    o.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                    "bg-gray-100 text-gray-700"
                                  }`}>
                                    {o.status || "Pending"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Specials Management */}
              <div className="mt-8 sm:mt-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4 sm:mb-6">🌟 Specials Management</h2>

                <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-4 sm:p-6 mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-4">Add New Special</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <input
                      type="text"
                      placeholder="Special Name (e.g., Paneer Tikka)"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-amber-300 focus:border-amber-600 focus:outline-none text-sm sm:text-base"
                      value={newSpecial.name}
                      onChange={(e) =>
                        setNewSpecial({ ...newSpecial, name: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      className="w-20 sm:w-24 px-2 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-amber-300 focus:border-amber-600 focus:outline-none text-sm sm:text-base"
                      value={newSpecial.price}
                      onChange={(e) =>
                        setNewSpecial({ ...newSpecial, price: e.target.value })
                      }
                    />
                    <button
                      onClick={addSpecial}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition shadow-lg text-sm sm:text-base whitespace-nowrap"
                    >
                      ➕ Add
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
                  {menu.filter((item) => item.category === "Specials").length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <p className="text-gray-500 text-base sm:text-lg">No specials yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm sm:text-base">
                        <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                          <tr>
                            <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Special Name</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Price</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-100">
                          {menu
                            .filter((item) => item.category === "Specials")
                            .map((item) => (
                              <tr key={item.id} className="hover:bg-amber-50 transition">
                                <td className="px-3 sm:px-6 py-2 sm:py-4 font-semibold text-amber-900">🍽️ {item.name}</td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 font-bold text-amber-700">₹{item.price}</td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4">
                                  <button
                                    onClick={() => removeSpecial(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {view === "Orders" && (
            <>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">Orders Management</h2>
                <p className="text-sm sm:text-base text-amber-700">Manage all customer orders</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
                {orders.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-base sm:text-lg">No orders found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm md:text-base">
                      <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                        <tr>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Order ID</th>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Amount</th>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Date & Time</th>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Status</th>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-100">
                        {orders
                          .slice()
                          .reverse()
                          .map((o) => (
                            <tr key={o.id} className="hover:bg-amber-50 transition">
                              <td className="px-2 sm:px-6 py-2 sm:py-4 font-semibold text-amber-900">{o.id}</td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 font-bold text-amber-700">₹{o.total}</td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 text-gray-600 text-xs sm:text-base">{o.date} {o.time}</td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4">
                                <select
                                  value={o.status || "Pending"}
                                  onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                  className="border-2 border-amber-300 rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                  <option>Pending</option>
                                  <option>Preparing</option>
                                  <option>Delivered</option>
                                  <option>Cancelled</option>
                                </select>
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4">
                                <button
                                  onClick={() => deleteOrder(o.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold transition text-xs sm:text-base"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {view === "Users" && (
            <>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">Users Management</h2>
                <p className="text-sm sm:text-base text-amber-700">Manage registered users</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
                {users.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-base sm:text-lg">No registered users</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm md:text-base">
                      <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                        <tr>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Username</th>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Email</th>
                          <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-100">
                        {users.map((u) => (
                          <tr key={u.username} className="hover:bg-amber-50 transition">
                            <td className="px-2 sm:px-6 py-2 sm:py-4 font-semibold text-amber-900">👤 {u.username}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 text-gray-600 text-xs sm:text-base">{u.email || "-"}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4">
                              <button
                                onClick={() => removeUser(u.username)}
                                className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold transition text-xs sm:text-base"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {view === "Settings" && (
            <>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">Settings</h2>
                <p className="text-sm sm:text-base text-amber-700">Golden Essence Restaurant Information</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-amber-50 border-2 border-amber-300 rounded-xl shadow-lg p-4 sm:p-8 max-w-2xl">
                <div className="space-y-4 sm:space-y-6">
                  <div className="border-b border-amber-200 pb-3 sm:pb-4">
                    <label className="block text-amber-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">🍴 Restaurant Name</label>
                    <p className="text-lg sm:text-2xl font-bold text-amber-700">Golden Essence</p>
                  </div>
                  
                  <div className="border-b border-amber-200 pb-3 sm:pb-4">
                    <label className="block text-amber-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">🕐 Operating Hours</label>
                    <p className="text-base sm:text-lg text-gray-700">10:00 AM - 11:00 PM (Daily)</p>
                  </div>
                  
                  <div className="border-b border-amber-200 pb-3 sm:pb-4">
                    <label className="block text-amber-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">📧 Contact Email</label>
                    <p className="text-base sm:text-lg text-gray-700">info@goldenessence.com</p>
                  </div>
                  
                  <div className="border-b border-amber-200 pb-3 sm:pb-4">
                    <label className="block text-amber-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">📱 Phone Number</label>
                    <p className="text-base sm:text-lg text-gray-700">+91 98765 43210</p>
                  </div>
                  
                  <div className="pb-4">
                    <label className="block text-amber-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">📍 Location</label>
                    <p className="text-base sm:text-lg text-gray-700">Bangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
