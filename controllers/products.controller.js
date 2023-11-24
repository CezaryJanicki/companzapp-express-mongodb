const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
exports.getById = async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
exports.postNew = async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = new Product({ name: name });
    await newProduct.save();
    res.json({ message: 'OK' });
    res.json(newProduct);
  } catch(err) {
    res.status(500).json({ message: err });
  }
}
exports.change = async (req, res) => {
  const { name } = req.body;
  try {
    const pro = await(Product.findById(req.params.id));
    if(pro) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name }});
      res.json({ message: 'OK' });
      res.json(Product.findById(req.params.id));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
exports.delete = async (req, res) => {
  try {
    const pro = await(Product.findById(req.params.id));
    if(pro) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
      res.json(Product.findById(req.params.id));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
