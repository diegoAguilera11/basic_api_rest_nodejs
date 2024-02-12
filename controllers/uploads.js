const path = require("path");
const fs = require("fs");
const { request, response } = require("express");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadArchive } = require("../helpers");
const { User, Product } = require("../models");

const loadArchive = async (req = request, res = response) => {

    try {
        const name = await uploadArchive(req.files, ['png', 'gif', 'jpg', 'jpeg', 'heic'], 'users');

        res.json({ name });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}

// const updateImage = async (req, res = response) => {

//     const { collection, id } = req.params;

//     let model;

//     switch (collection) {
//         case 'users':
//             model = await User.findById(id);
//             if (!model) {
//                 return res.status(400).json({
//                     msg: 'User not exist'
//                 });
//             }

//             break;
//         case 'products':
//             model = await Product.findById(id);
//             if (!model) {
//                 return res.status(400).json({
//                     msg: 'Product not exist'
//                 });
//             }

//             break;
//         default:
//             return res.status(500).json({
//                 msg: 'The option is not valid'
//             });
//     }

//     // Clean previous image
//     try {
//         if (model.img) {
//             const pathImage = path.join(__dirname, '../uploads', collection, model.img);
//             if (fs.existsSync(pathImage)) {
//                 fs.unlinkSync(pathImage);
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }

//     const name = await uploadArchive(req.files, ['png', 'gif', 'jpg', 'jpeg', 'heic'], collection);

//     model.img = name;
//     await model.save();

//     res.status(201).json({
//         model
//     });
// }

const updateImageCloudinary = async (req, res = response) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'User not exist'
                });
            }

            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'Product not exist'
                });
            }

            break;
        default:
            return res.status(500).json({
                msg: 'The option is not valid'
            });
    }

    // Clean previous image
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(`RestServerNodeJS/${collection}/${public_id}`);
    }

    const { tempFilePath } = req.files.archive;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath,{folder:`RestServerNodeJS/${collection}`});

    model.img = secure_url;
    await model.save();

    res.status(201).json({
        model
    });
}

const showImage = async (req, res = response) => {

    const { collection, id } = req.params;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'User not exist'
                });
            }

            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'Product not exist'
                });
            }

            break;
        default:
            return res.status(500).json({
                msg: 'The option is not valid'
            });
    }

    // Clean previous image
    try {
        if (model.img) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage);
            }
        }

        const defaultPathImage = path.join(__dirname, '../assets/default_image.png');
        return res.sendFile(defaultPathImage);

    } catch (error) {
        console.log(error);
        res.json({ msg: error })
    }
}


module.exports = {
    loadArchive,
    updateImageCloudinary,
    showImage
}