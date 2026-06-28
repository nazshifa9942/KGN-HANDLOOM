import { useState, useEffect } from "react";
import "../styles/heroBanner.css";

function HeroBannerManager() {
    const [imageFile, setImageFile] = useState(null);
    const [banners, setBanners] = useState([]);
    const [fileKey, setFileKey] = useState(Date.now());

    // fetch banners
    useEffect(() => {
        fetch("http://localhost:5000/api/banners")
            .then(res => res.json())
            .then(data => setBanners(data));
    }, []);

    async function handleUpload() {
        if (!imageFile) {
            alert("Please select an image");
            return;
        }

        // Step 1: Upload to Cloudinary (your existing API)
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadRes = await fetch(
            "http://localhost:5000/api/products/upload-image",
            {
                method: "POST",
                body: imageData,
            }
        );

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
            alert("Image upload failed");
            return;
        }

        // Step 2: Save banner in DB
        const saveRes = await fetch(
            "http://localhost:5000/api/banners/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: uploadResult.imageUrl,
                }),
            }
        );

        const savedData = await saveRes.json();

        if (!saveRes.ok) {
            alert(savedData.error || "Failed to save banner");
            return;
        }

        alert("Banner added successfully");

        // update UI instantly
        setBanners((prev) => [savedData.banner, ...prev]);

        setImageFile(null);

        setTimeout(() => {
            setFileKey(Date.now());
        }, 0);
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Delete this image?");
        if (!confirmDelete) return;

        const res = await fetch(
            `http://localhost:5000/api/banners/${id}`,
            {
                method: "DELETE",
            }
        );

        if (!res.ok) {
            alert("Failed to delete");
            return;
        }

        // remove from UI instantly
        setBanners((prev) => prev.filter((b) => b._id !== id));
    }

    async function handleToggle(id) {
        const res = await fetch(
            `http://localhost:5000/api/banners/toggle/${id}`,
            {
                method: "PUT",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert("Failed to update");
            return;
        }

        // update UI instantly
        setBanners((prev) =>
            prev.map((b) =>
                b._id === id ? { ...b, isActive: !b.isActive } : b
            )
        );
    }

    return (
        <div className="hb-page">

            <h1 className="hb-title">Homepage Banner Images</h1>

            {/* Upload Section */}
            <div className="hb-upload">
                <input
                    key={fileKey}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="hb-file"
                />

                <button
                    onClick={handleUpload}
                    disabled={!imageFile}
                    className={`hb-upload-btn ${!imageFile ? "disabled" : ""}`}
                >
                    Upload Image
                </button>
            </div>

            {/* Divider */}
            <div className="hb-divider" />

            {/* Images */}
            <h2 className="hb-subtitle">Current Images</h2>

            <div className="hb-grid">
                {banners.map((banner) => (
                    <div
                        key={banner._id}
                        className={`hb-card ${!banner.isActive ? "inactive" : ""}`}
                    >
                        <img src={banner.image} alt="banner" />

                        <div className="hb-actions">
                            <button
                                onClick={() => handleDelete(banner._id)}
                                className="hb-delete"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => handleToggle(banner._id)}
                                className="hb-toggle"
                            >
                                {banner.isActive ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default HeroBannerManager;