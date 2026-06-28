import { useEffect, useState } from "react";
import "../styles/CatalogManagement.css";

function CatalogManagement() {
    const [nodes, setNodes] = useState([]);
    const [currentParent, setCurrentParent] = useState(null);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        loadRootNodes();
    }, []);

    async function loadRootNodes() {
        const res = await fetch("http://localhost:5000/api/catalog/root");
        const data = await res.json();
        setNodes(data);
        setCurrentParent(null);
        setProducts([]);
    }

    async function openNode(node) {
        const res = await fetch(`http://localhost:5000/api/catalog/children/${node._id}`);
        const data = await res.json();
        setNodes(data);

        const pRes = await fetch(`http://localhost:5000/api/products/catalog/${node._id}`);
        const pData = await pRes.json();
        setProducts(pData);

        setCurrentParent(node);
    }

    async function goBack() {
        if (!currentParent?.parentId) {
            loadRootNodes();
            return;
        }

        const res = await fetch(`http://localhost:5000/api/catalog/children/${currentParent.parentId}`);
        const data = await res.json();
        setNodes(data);

        const parentRes = await fetch(`http://localhost:5000/api/catalog/${currentParent.parentId}`);
        const parentData = await parentRes.json();
        setCurrentParent(parentData);

        const pRes = await fetch(`http://localhost:5000/api/products/catalog/${currentParent.parentId}`);
        const pData = await pRes.json();
        setProducts(pData);
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function createNode() {
        const imageData = new FormData();
        imageData.append("image", image);

        const upload = await fetch("http://localhost:5000/api/products/upload-image", {
            method: "POST",
            body: imageData,
        });

        const img = await upload.json();

        const nodeData = {
            name: formData.name,
            description: formData.description,
            image: img.imageUrl,
            parentId: currentParent ? currentParent._id : null,
            createdBy: JSON.parse(localStorage.getItem("user"))?.name,
        };

        const res = await fetch("http://localhost:5000/api/catalog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(nodeData),
        });

        const data = await res.json();
        setNodes([...nodes, data]);
        setFormData({ name: "", description: "" });
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this category?")) return;

        await fetch(`http://localhost:5000/api/catalog/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setNodes(nodes.filter((n) => n._id !== id));
    }

    async function toggleStatus(node) {
        const endpoint = node.isActive ? "hide" : "show";

        await fetch(`http://localhost:5000/api/catalog/${endpoint}/${node._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setNodes(nodes.map(n =>
            n._id === node._id ? { ...n, isActive: !n.isActive } : n
        ));
    }

    async function deleteProduct(id) {
        if (!window.confirm("Delete product?")) return;

        await fetch(`http://localhost:5000/api/products/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setProducts(products.filter(p => p._id !== id));
    }

    async function toggleProductStatus(product) {
        const endpoint = product.isActive ? "hide" : "show";

        await fetch(`http://localhost:5000/api/products/${endpoint}/${product._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setProducts(products.map(p =>
            p._id === product._id ? { ...p, isActive: !p.isActive } : p
        ));
    }

    async function saveProductChanges() {
        const res = await fetch(`http://localhost:5000/api/products/update/${editingProduct._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                name: editingProduct.name,
                price: editingProduct.price,
                description: editingProduct.description,
            }),
        });

        const updated = await res.json();

        setProducts(products.map(p =>
            p._id === updated._id ? updated : p
        ));

        setEditingProduct(null);
    }

    return (
        <div className="cm-page">

            {/* HEADER */}
            <div className="cm-header">
                <h1>Catalog Management</h1>

                <div className="cm-breadcrumb">
                    <span onClick={loadRootNodes}>Root</span>
                    {currentParent && <> / <span>{currentParent.name}</span></>}
                </div>

                {currentParent && (
                    <button className="cm-back-btn" onClick={goBack}>
                        ← Back
                    </button>
                )}
            </div>

            {/* FORM */}
            <div className="cm-form">
                <h3>Add New Category</h3>

                <input
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button className="cm-primary-btn" onClick={createNode}>
                    Create Category
                </button>
            </div>

            {/* CATEGORY GRID */}
            <div className="cm-category-grid">
                {nodes.map((node) => (
                    <div
                        key={node._id}
                        className="cm-category-card"
                        onClick={() => openNode(node)}
                    >
                        <div className="cm-card-top">
                            <img src={node.image} alt={node.name} />
                            <div>
                                <h3>{node.name}</h3>
                                <span className={`cm-status ${node.isActive ? "active" : "hidden"}`}>
                                    {node.isActive ? "Active" : "Hidden"}
                                </span>
                            </div>
                        </div>

                        <p className="cm-desc">{node.description}</p>

                        <div className="cm-actions">
                            <button onClick={(e) => {
                                e.stopPropagation();
                                toggleStatus(node);
                            }}>
                                {node.isActive ? "Hide" : "Show"}
                            </button>

                            <button
                                className="cm-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(node._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* PRODUCTS */}
            {products.length > 0 && (
                <div className="cm-products">
                    <h2>Products</h2>

                    <div className="cm-product-grid">
                        {products.map((product) => (
                            <div key={product._id} className="cm-product-card">
                                <img src={product.images?.[0]} alt={product.name} />

                                <h3>{product.name}</h3>
                                <span className="cm-price">₹{product.price}</span>

                                <p>{product.description}</p>

                                <div className="cm-actions">
                                    <button onClick={() => setEditingProduct(product)}>
                                        Edit
                                    </button>

                                    <button onClick={() => toggleProductStatus(product)}>
                                        {product.isActive ? "Hide" : "Show"}
                                    </button>

                                    <button
                                        className="cm-delete"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editingProduct && (
                <div className="cm-overlay">
                    <div className="cm-modal">
                        <h3>Edit Product</h3>

                        <input
                            value={editingProduct.name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                        />

                        <input
                            value={editingProduct.price}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, price: e.target.value })
                            }
                        />

                        <textarea
                            value={editingProduct.description}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, description: e.target.value })
                            }
                        />

                        <div className="cm-modal-actions">
                            <button onClick={saveProductChanges}>Save</button>
                            <button onClick={() => setEditingProduct(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CatalogManagement;