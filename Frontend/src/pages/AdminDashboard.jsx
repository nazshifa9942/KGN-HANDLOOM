import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showSalary, setShowSalary] = useState({});
  const [selectedTab, setSelectedTab] = useState("staff");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://kgn-handloom.onrender.com/api/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  console.log(users);

  async function handleDisableUser(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://kgn-handloom.onrender.com/api/auth/disable-staff/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    setUsers(
      users.map((user) =>
        user._id === id
          ? { ...user, isActive: false }
          : user
      )
    );
  }

  async function handleEnableUser(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://kgn-handloom.onrender.com/api/auth/enable-staff/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    setUsers(
      users.map((user) =>
        user._id === id
          ? { ...user, isActive: true }
          : user
      )
    );
  }


  async function handleDeleteUser(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://kgn-handloom.onrender.com/api/auth/delete-user/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setUsers(users.filter((user) => user._id !== id));
    }

  }

  const filteredUsers = users
    .filter((user) => {
      if (selectedTab === "staff") {
        return user.role === "staff";
      }

      if (selectedTab === "admin") {
        return user.role === "admin";
      }

      if (selectedTab === "editor") {
        return (
          user.role === "staff" &&
          user.permission === "editor"
        );
      }

      return false;
    })
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.mobile.includes(search)
      );
    });


  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>

        <Link to="/admin/create-user">
          <button className="create-btn">+ Create User</button>
        </Link>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Staff</h3>
          <p>{users.filter(u => u.role === "staff").length}</p>
        </div>

        <div className="stat-card">
          <h3>Admins</h3>
          <p>{users.filter(u => u.role === "admin").length}</p>
        </div>

        <div className="stat-card">
          <h3>Editors</h3>
          <p>
            {users.filter(
              u => u.role === "staff" && u.permission === "editor"
            ).length}
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={selectedTab === "staff" ? "active" : ""}
          onClick={() => setSelectedTab("staff")}
        >
          Staff
        </button>

        <button
          className={selectedTab === "editor" ? "active" : ""}
          onClick={() => setSelectedTab("editor")}
        >
          Editors
        </button>

        <button
          className={selectedTab === "admin" ? "active" : ""}
          onClick={() => setSelectedTab("admin")}
        >
          Admin
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or mobile..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID WRAPPER (IMPORTANT) */}
      <div className="user-list">

        {filteredUsers.map((user) => (
          <div key={user._id} className="user-card">

            {/* GOLD CORNER */}
            <div className="corner-fold"></div>


            <div className="user-top-grid">

              {/* PHOTO */}
              <img
                src={user.photoUrl}
                alt={user.name}
                className="user-photo"
              />

              {/* LEFT INFO */}
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p><strong>Mobile:</strong> {user.mobile}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </div>

              {/* RIGHT INFO */}
              <div className="user-info right">
                <p className={user.isActive ? "status active" : "status inactive"}>
                  {user.isActive ? "Active" : "Disabled"}
                </p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Permission:</strong> {user.permission}</p>
              </div>

            </div>


            <div className="aadhaar-section">

              <img
                src={user.aadhaarFrontUrl}
                alt="Aadhaar"
                className="aadhaar-img"
              />
              <img
                src={user.aadhaarBackUrl}
                alt="Aadhaar"
                className="aadhaar-img"
              />
            </div>

            <div className="card-bottom">

              {/* SALARY */}
              <div>
                <p className="salary-text">
                  {showSalary[user._id]
                    ? `₹${user.monthlySalary}`
                    : "******"}
                </p>

                <button
                  className="salary-btn"
                  onClick={() =>
                    setShowSalary({
                      ...showSalary,
                      [user._id]: !showSalary[user._id],
                    })
                  }
                >
                  {showSalary[user._id] ? "Hide Salary" : "Show Salary"}
                </button>
              </div>

              <Link to={`/admin/edit-user/${user._id}`}>
                <button className="action-btn edit-btn">
                  Edit
                </button>
              </Link>

              {/* ACTION */}
              {user.isActive ? (
                <button
                  className="action-btn disable-btn"
                  onClick={() => handleDisableUser(user._id)}
                >
                  Disable
                </button>
              ) : (
                <button
                  className="action-btn enable-btn"
                  onClick={() => handleEnableUser(user._id)}
                >
                  Enable
                </button>
              )}

              <button
                className="action-btn delete-btn"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminDashboard;