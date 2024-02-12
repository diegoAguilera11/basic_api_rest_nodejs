const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadArchive = async (files, allowedExtensions, folder = '') => {


    return new Promise((resolve, reject) => {
        
        const { archive } = files;
        const shortName = archive.name.split('.');
        const extension = shortName[shortName.length - 1];
    
    
        // Validate extension
        if (!allowedExtensions.includes(extension)) {
            reject( `The extension ${extension} is not allowed`);
        }
    
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, '/' + tempName);
    
        archive.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    });
}

module.exports = {
    uploadArchive
}