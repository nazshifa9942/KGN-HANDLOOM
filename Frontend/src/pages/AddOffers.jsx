import { useState, useEffect } from "react";
import "../styles/Addoffers.css";

function AddOffers() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const [offers, setOffers] = useState([]);

    // ✅ FETCH OFFERS (FIXED)
    async function fetchOffers() {
        const res = await fetch("http://localhost:5000/api/offers/admin/all");
        const data = await res.json();
        setOffers(data);
    }

    useEffect(() => {
        fetchOffers();
    }, []);

    // ✅ ADD OFFER
    async function handleSubmit(e) {
        e.preventDefault();

        if (!image) {
            alert("Image required");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        const res = await fetch("http://localhost:5000/api/offers/add", {
            method: "POST",
            body: formData,
        });

        await res.json();

        alert("Offer added!");

        setTitle("");
        setDescription("");
        setImage(null);

        fetchOffers();
    }

    // ✅ DELETE (FIXED)
    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this offer?");

        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/api/offers/delete/${id}`, {
            method: "DELETE",
        });

        fetchOffers();
    }

    // ✅ TOGGLE (FIXED)
    async function toggleActive(id, currentStatus) {
        const url = currentStatus
            ? `http://localhost:5000/api/offers/hide/${id}`
            : `http://localhost:5000/api/offers/show/${id}`;

        await fetch(url, { method: "PUT" });

        fetchOffers();
    }

    return (
        <div className="offer-page">

            {/* HEADER */}
            <h1 className="offer-title">Manage Offers</h1>

            {/* ================= ADD FORM ================= */}
            <div className="offer-form-card">
                <h2>Add Offer</h2>

                <form onSubmit={handleSubmit} className="offer-form">

                    <input
                        className="offer-input"
                        placeholder="Title (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        className="offer-textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        className="offer-file"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button className="offer-submit">
                        Add Offer
                    </button>
                </form>
            </div>

            {/* ================= LIST ================= */}
            <h2 className="offer-subtitle">Current Offers</h2>

            <div className="offer-grid">
                {offers.map((offer) => (
                    <div
                        key={offer._id}
                        className={`offer-card ${!offer.isActive ? "inactive" : ""}`}
                    >
                        <img src={offer.image} alt={offer.title} />

                        <div className="offer-content">
                            <h4>{offer.title || "No Title"}</h4>
                            <p>{offer.description}</p>
                        </div>

                        <div className="offer-actions">
                            <button
                                className="offer-delete"
                                onClick={() => handleDelete(offer._id)}
                            >
                                Delete
                            </button>

                            <button
                                className="offer-toggle"
                                onClick={() => toggleActive(offer._id, offer.isActive)}
                            >
                                {offer.isActive ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default AddOffers;