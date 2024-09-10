const Product = require('../models/products');
require('dotenv').config();


exports.postAddProduct = async (req, res, next) => {
    try {
        const { name, description, links } = req.body;
        console.log('Received Data:', { name, description, links });
        if (!name || !description) {
            return res.status(400).json({ message: 'Ürün adı ve açıklaması gereklidir' });
        }
        if (!Array.isArray(links) || links.length === 0) {
            return res.status(400).json({ message: 'En az bir görsel URL eklemelisiniz.' });
        }
        const product = new Product({
            name,
            description,
            images: links
        });
        await product.save();
        res.status(201).json({ message: 'Ürün başarıyla eklendi', product });
    } catch (error) {
        console.error('Ürün eklenirken bir hata oluştu:', error);
        res.status(500).json({ message: 'Ürün eklenirken bir hata oluştu', error: error.message });
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
        console.log('Ürünler', products)
    } catch (error) {
        console.error('Ürünler getirilirken bir hata oluştu:', error);
        res.status(500).json({ message: 'Ürünler getirilirken bir hata oluştu', error: error.message });
    }
}

exports.postDeleteProduct = async (req, res, next) => {
    const id = req.body.productid;

    try {
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ message: 'Silmek istediğiniz ürün bulunamadı' });
        }

        await Product.deleteOne({ _id: id });
        return res.status(200).json({ message: 'Ürün başarıyla silindi' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ürün silinemedi', error: err });
    }
};


exports.getProductById = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error('Ürün getirilirken bir hata oluştu:', error);
        res.status(500).json({ message: 'Ürün getirilirken bir hata oluştu', error: error.message });
    }
};

exports.updateProduct = async (req, res, next) => {
    const { productId, name, description, images } = req.body;

    try {
        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }

        product.name = name;
        product.description = description;
        product.images = images; 

        await product.save();

        return res.status(200).json({ message: 'Ürün başarıyla güncellendi' });
    } catch (err) {
        console.error('Ürün güncellenirken bir hata oluştu:', err);
        return res.status(500).json({ message: 'Ürün güncellenemedi', error: err });
    }
};