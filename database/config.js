const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
        });
        console.log('BD');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}




module.exports = {
    dbConnection,
}