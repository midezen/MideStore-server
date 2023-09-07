import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const newProducts = req.query.new;
  const cat = req.query.cat;
  const subCat = req.query.subCat;
  let Products;
  try {
    if (newProducts) {
      Products = await Product.find().sort({ createdAt: "desc" }).limit(5);
    } else if (cat) {
      Products = await Product.find({ categories: { $in: [cat] } });
    } else if (newProducts && cat) {
      Products = await Product.find({ categories: { $in: [cat] } })
        .sort({ createdAt: "desc" })
        .limit(5);
    } else {
      Products = await Product.find();
    }
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
