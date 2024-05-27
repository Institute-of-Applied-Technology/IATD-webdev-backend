// index.js
const mongoose = require('mongoose');
async function main() {
    const uri = "mongodb+srv://iatd_student:TVgwGwaln3xxpGC5@cluster0.ef7iqvh.mongodb.net/iatd_student_expense_tracker";
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas using Mongoose!");
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:");
        collections.forEach(collection => {
            console.log(collection.name);
        });
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);

