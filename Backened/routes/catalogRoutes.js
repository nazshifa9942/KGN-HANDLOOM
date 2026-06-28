const express = require("express");
const router = express.Router();

const CatalogNode = require("../models/CatalogNode");
const authMiddleware = require("../middleware/authMiddleware");
const canEditProducts = require("../middleware/permission");
const Product = require("../models/Product");

router.post(
  "/create",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    try {
      const node = await CatalogNode.create(req.body);

      res.json(node);
    } catch (error) {
      res.status(500).json({
        message: "Error creating node",
      });
    }
  }
);

router.get("/root", async (req, res) => {
  try {
    const nodes = await CatalogNode.find({
      parentId: null,
      isActive: true,
    });

    res.json(nodes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching root nodes",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const nodes = await CatalogNode.find({
      isActive: true,
    });

    res.json(nodes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching catalog",
    });
  }
});

router.get("/children/:parentId", async (req, res) => {
  try {
    const nodes = await CatalogNode.find({
      parentId: req.params.parentId,
      isActive: true,
    });

    res.json(nodes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching children",
    });
  }
});

router.put(
  "/update/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    try {
      const updated = await CatalogNode.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message: "Error updating node",
      });
    }
  }
);

router.get("/leaf-nodes", async (req, res) => {
  try {
    const allNodes = await CatalogNode.find({
      isActive: true,
    });

    const leafNodes = [];

    for (const node of allNodes) {
      const child = await CatalogNode.findOne({
        parentId: node._id,
      });

      if (!child) {
        leafNodes.push(node);
      }
    }

    res.json(leafNodes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leaf nodes",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const node = await CatalogNode.findById(req.params.id);

    res.json(node);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching node",
    });
  }
});

router.get("/path/:id", async (req, res) => {
  try {
    let currentNode = await CatalogNode.findById(req.params.id);

    const path = [];

    while (currentNode) {
      path.push({
        _id: currentNode._id,
        name: currentNode.name,
      });

      currentNode = await CatalogNode.findById(
        currentNode.parentId
      );
    }

    path.reverse();

    res.json(path);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching path",
    });
  }
});

router.delete(
  "/delete/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    try {
      const children = await CatalogNode.find({
        parentId: req.params.id,
      });

      if (children.length > 0) {
        return res.status(400).json({
          message: "Delete child categories first",
        });
      }

      await CatalogNode.findByIdAndDelete(req.params.id);

      res.json({
        message: "Deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: "Error deleting node",
      });
    }
  }
);

async function updateChildrenStatus(parentId, status) {
  const children = await CatalogNode.find({
    parentId,
  });

  for (const child of children) {
    child.isActive = status;

    await child.save();

    await updateChildrenStatus(
      child._id,
      status
    );
  }
}

async function updateProductsStatus(nodeId, status) {
  await Product.updateMany(
    { catalogNodeId: nodeId },
    { isActive: status }
  );

  const children = await CatalogNode.find({
    parentId: nodeId,
  });

  for (const child of children) {
    await updateProductsStatus(
      child._id,
      status
    );
  }
}

router.put(
  "/hide/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    try {
      const node = await CatalogNode.findById(
        req.params.id
      );

      node.isActive = false;

      await node.save();

      await updateChildrenStatus(
        node._id,
        false
      );

      await updateProductsStatus(
        node._id,
        false
      );

      res.json({
        message: "Hidden successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: "Error hiding node",
      });
    }
  }
);

router.put(
  "/show/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    try {
      const node = await CatalogNode.findById(
        req.params.id
      );

      node.isActive = true;

      await node.save();

      await updateChildrenStatus(
        node._id,
        true
      );

      await updateProductsStatus(
        node._id,
        true
      );

      res.json({
        message: "Shown successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: "Error showing node",
      });
    }
  }
);

module.exports = router;