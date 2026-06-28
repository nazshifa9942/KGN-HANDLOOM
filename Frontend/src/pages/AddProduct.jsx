import { useState, useEffect } from "react";
import "../styles/addProduct.css";

function AddProduct() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        catalogNodeId: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [catalogNodes, setCatalogNodes] = useState([]);
    const [whatsappNumber, setWhatsappNumber] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/catalog/leaf-nodes")
            .then((res) => res.json())
            .then((data) => setCatalogNodes(data));
    }, []);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!whatsappNumber || whatsappNumber.length < 10) {
            alert("Enter valid WhatsApp number");
            return;
        }

        if (!whatsappNumber.startsWith("91")) {
            alert("Use country code (e.g. 91...)");
            return;
        }
        const token = localStorage.getItem("token");

        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadResponse = await fetch(
            "http://localhost:5000/api/products/upload-image",
            {
                method: "POST",
                body: imageData,
            }
        );

        const uploadResult = await uploadResponse.json();

        const productData = {
            ...formData,
            images: [uploadResult.imageUrl],
            whatsappNumber: whatsappNumber.trim(),
            createdBy: JSON.parse(localStorage.getItem("user"))?.name,
        };

        const response = await fetch(
            "http://localhost:5000/api/products/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            }
        );

        if (!response.ok) {
            alert("❌ Failed to add product");
            return;
        }

        alert("✅ Product added successfully");

        setFormData({
            name: "",
            price: "",
            catalogNodeId: "",
            description: "",
        });

        setImageFile(null);
        setWhatsappNumber("");
    }

    return (
        <div className="add-product-page">

            <h1 className="page-title">Add Product</h1>

            <form className="add-product-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Select Category</label>
                    <select
                        name="catalogNodeId"
                        value={formData.catalogNodeId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Catalog</option>
                        {catalogNodes.map((node) => (
                            <option key={node._id} value={node._id}>
                                {node.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>WhatsApp Number(with country code)</label>
                    <input
                        type="text"
                        placeholder="e.g. 919876543210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Add Product
                </button>

            </form>
        </div>
    );
}

export default AddProduct;