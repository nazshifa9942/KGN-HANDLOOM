import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddUser() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const isEditMode = Boolean(id);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        alternateMobile: "",
        address: "",
        password: "",
        monthlySalary: "",
        notes: "",
        permission: "viewer",
    });

    const [photo, setPhoto] = useState(null);
    const [aadhaarFront, setAadhaarFront] = useState(null);
    const [aadhaarBack, setAadhaarBack] = useState(null);

    useEffect(() => {
        if (!isEditMode) return;

        const token = localStorage.getItem("token");

        fetch(`https://kgn-handloom.onrender.com/api/auth/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFormData({
                    name: data.name || "",
                    mobile: data.mobile || "",
                    alternateMobile: data.alternateMobile || "",
                    address: data.address || "",
                    password: "",
                    monthlySalary: data.monthlySalary || "",
                    notes: data.notes || "",
                    permission: data.permission || "viewer",
                    photoUrl: data.photoUrl || "",
                    aadhaarFrontUrl: data.aadhaarFrontUrl || "",
                    aadhaarBackUrl: data.aadhaarBackUrl || "",
                });
            });

    }, [id, isEditMode]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // ✅ VALIDATION FIRST
        if (!isEdit && (!photo || !aadhaarFront || !aadhaarBack)) {
            alert("Please upload all images");
            return;
        }

        try {
            let photoUrl = formData.photoUrl;
            let aadhaarFrontUrl = formData.aadhaarFrontUrl;
            let aadhaarBackUrl = formData.aadhaarBackUrl;

            // PHOTO
            if (photo) {
                const photoData = new FormData();
                photoData.append("image", photo);

                const photoRes = await fetch(
                    "https://kgn-handloom.onrender.com/api/products/upload-image",
                    {
                        method: "POST",
                        body: photoData,
                    }
                );

                const photoResult = await photoRes.json();
                photoUrl = photoResult.imageUrl;
            }

            // AADHAAR FRONT
            if (aadhaarFront) {
                const frontData = new FormData();
                frontData.append("image", aadhaarFront);

                const frontRes = await fetch(
                    "https://kgn-handloom.onrender.com/api/products/upload-image",
                    {
                        method: "POST",
                        body: frontData,
                    }
                );

                const frontResult = await frontRes.json();
                aadhaarFrontUrl = frontResult.imageUrl;
            }

            // AADHAAR BACK
            if (aadhaarBack) {
                const backData = new FormData();
                backData.append("image", aadhaarBack);

                const backRes = await fetch(
                    "https://kgn-handloom.onrender.com/api/products/upload-image",
                    {
                        method: "POST",
                        body: backData,
                    }
                );

                const backResult = await backRes.json();
                aadhaarBackUrl = backResult.imageUrl;
            }

            const finalUser = {
                ...formData,
                photoUrl,
                aadhaarFrontUrl,
                aadhaarBackUrl,
                createdBy: JSON.parse(localStorage.getItem("user"))?.name,
            };


            // 5. SEND TO BACKEND
            let response;

            if (isEdit) {
                response = await fetch(
                    `https://kgn-handloom.onrender.com/api/auth/update-user/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(finalUser),
                    }
                );
            } else {
                response = await fetch(
                    "https://kgn-handloom.onrender.com/api/auth/create-user",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(finalUser),
                    }
                );
            }

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert(isEdit ? "User updated successfully!" : "User created successfully!");

        } catch (error) {
            console.log(error);
            alert("Error creating user");
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>{isEdit ? "Edit Staff" : "Add Staff"}</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="mobile"
                    value={formData.mobile}
                    type="number"
                    placeholder="Mobile"
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    type=" number"
                    placeholder="Alternate Mobile"
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="address"
                    value={formData.address}
                    placeholder="Address"
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="password"
                    value={formData.password}
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="monthlySalary"
                    value={formData.monthlySalary}
                    type="number"
                    placeholder="Monthly Salary"
                    onChange={handleChange}
                />
                <br /><br />

                <textarea
                    name="notes"
                    value={formData.notes}
                    placeholder="Notes"
                    onChange={handleChange}
                />
                <br /><br />

                <label>Upload Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
                <br /><br />

                <label>Upload Aadhaar FRONT:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAadhaarFront(e.target.files[0])}
                />
                <br /><br />

                <label>Upload Aadhaar BACK:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAadhaarBack(e.target.files[0])}
                />
                <br /><br />

                <select
                    name="permission"
                    value={formData.permission}
                    onChange={handleChange}
                >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                </select>

                <br />
                <br />
                <button type="submit">
                    {isEditMode ? "Update User" : "Create User"}
                </button>
            </form>
        </div>
    );
}

export default AddUser;