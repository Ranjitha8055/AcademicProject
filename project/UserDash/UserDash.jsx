import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, ShoppingCart } from "lucide-react";

const initialMenu = [
  { id: 1, name: "Paneer Tikka", category: "Specials", price: 300 },
  { id: 2, name: "Mutton Curry", category: "Specials", price: 400 },
  { id: 3, name: "Veg Biryani", category: "Main Course", price: 250 },
];

export default function Admin() {
  const navigate = useNavigate();

  const [view, setView] = useState("Dashboard");
  const [newSpecial, setNewSpecial] = useState({ name: "", price: "" });

  const [menu, setMenu] = useState(() => {
    const stored = localStorage.getItem("menu");
    return stored ? JSON.parse(stored) : initialMenu;
  });

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    return stored
      ? JSON.parse(stored)
      : [
          { username: "john", email: "john@gmail.com" },
          { username: "sita", email: "sita@gmail.com" },
        ];
  });

  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem("orders");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 101,
            total: 500,
            date: "28-02-2026",
            time: "12:30 PM",
            status: "Pending",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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

    setMenu([...menu, newItem]);
    setNewSpecial({ name: "", price: "" });
  };

  const updateOrderStatus = (id, status) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );
    setOrders(updated);
  };

  const deleteOrder = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
  };

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pending = orders.filter((o) => o.status === "Pending").length;

    return { totalUsers, totalOrders, revenue, pending };
  }, [users, orders]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-amber-100 via-yellow-600 to-amber-100 text-black p-6 flex flex-col shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center drop-shadow-lg">
          User  user Dashboard  
        </h2>

        <nav className="flex flex-col gap-3 flex-1">
          <button
            onClick={() => setView("Dashboard")}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white font-semibold"
          >
            <BarChart3 size={18} />
            Dashboard
          </button>

          <button
            onClick={() => setView("Orders")}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white font-semibold"
          >
            <ShoppingCart size={18} />
            Orders
          </button>

          <button
            onClick={() => setView("Users")}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white font-semibold"
          >
            <Users size={18} />
            Users
          </button>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-black hover:bg-amber-800 text-white px-4 py-2 rounded font-bold"
        >
          ← Back
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* DASHBOARD */}
        {view === "Dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-yellow-700">
              Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded shadow">
                <p>Total Users</p>
                <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <p>Total Orders</p>
                <h2 className="text-3xl font-bold">{stats.totalOrders}</h2>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <p>Total Revenue</p>
                <h2 className="text-3xl font-bold text-black">
                  ₹{stats.revenue}
                </h2>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <p>Pending Orders</p>
                <h2 className="text-3xl font-bold text-black">
                  {stats.pending}
                </h2>
              </div>
            </div>

            {/* Add Special */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Add Special Item
              </h2>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  className="border p-2 rounded w-full"
                  value={newSpecial.name}
                  onChange={(e) =>
                    setNewSpecial({ ...newSpecial, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded w-32"
                  value={newSpecial.price}
                  onChange={(e) =>
                    setNewSpecial({ ...newSpecial, price: e.target.value })
                  }
                />
                <button
                  onClick={addSpecial}
                  className="bg-amber-900 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </>
        )}

        {/* ORDERS */}
        {view === "Orders" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-yellow-700">
              Orders Management
            </h1>

            <div className="bg-white p-6 rounded shadow">
              <table className="w-full border">
                <thead className="bg-yellow-400">
                  <tr>
                    <th className="p-2">Order ID</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="text-center border-t">
                      <td className="p-2">{o.id}</td>
                      <td className="p-2">₹{o.total}</td>
                      <td className="p-2">{o.date} {o.time}</td>
                      <td className="p-2">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            updateOrderStatus(o.id, e.target.value)
                          }
                          className="border p-1 rounded"
                        >
                          <option>Pending</option>
                          <option>Preparing</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteOrder(o.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* USERS */}
        {view === "Users" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-yellow-700">
              Users Management
            </h1>

            <div className="bg-white p-6 rounded shadow">
              <table className="w-full border">
                <thead className="bg-yellow-400">
                  <tr>
                    <th className="p-2">Username</th>
                    <th className="p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.username} className="text-center border-t">
                      <td className="p-2">{u.username}</td>
                      <td className="p-2">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}