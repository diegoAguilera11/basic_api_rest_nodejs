

const { Product } = require("../models");

const productService = require("../services/productService");

const { obtainUidJWT } = require("../helpers/obtain-user-jwt");










const getProducts = async (req = request, res = response) => {

    try {
        const { limit, init = 0 } = req.query;
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('user', 'name')
                .skip(Number(init))
                .limit(Number(limit)),
        ]);

        res.json({
            total,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }

}

const getProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const product = await Product.findById(id).populate('user', 'name');

    res.json({
        product
    });
}

const postProducts = async (req = request, res = response) => {

    const { name, description, price, category } = req.body;

    // Obtain JWT
    const authHeader = req.headers['authorization'];

    // Separate the token from the "Bearer" prefix
    token = authHeader && authHeader.split(' ')[1];
    const uid = obtainUidJWT(token);

    // Generate new product
    const data = {
        name,
        description,
        price,
        user: uid,
        category
    }

    const product = await productService.createProduct(data);

    res.status(201).json(product);
}

const putProducts = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const { status, user, ...data } = req.body;

        data.name = data.name.toUpperCase();

        // Obtain JWT
        const authHeader = req.headers['authorization'];

        // Separate the token from the "Bearer" prefix
        token = authHeader && authHeader.split(' ')[1];
        const uid = obtainUidJWT(token);
        data.user = uid;

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact with the administrator',
        });
    }
}


const deleteProduct = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        // Delete product
        const deletedProduct = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
        res.status(200).json({
            msg: 'Category deleted',
            deletedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact with the administrator',
        });
    }
}



module.exports = {
    getProducts,
    getProduct,
    postProducts,
    putProducts,
    deleteProduct
}