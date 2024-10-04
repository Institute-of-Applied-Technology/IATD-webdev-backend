// index.js 
const mongoose = require('mongoose'); 
async function main() { 
//Please note that this string would be different for everyone. 
    const uri = "mongodb+srv://iatd_student:TVgwGwaln3xxpGC5@cluster0.ef7iqvh.mongodb.net/iatd_student_expense_tracker"; 
    try { 
        await mongoose.connect(uri); 
        const db = mongoose.connection.db; 
        const dbName = db.databaseName; 
        console.log(`Connected to MongoDB Atlas using Mongoose! Database Name: ${dbName}`); 
        const collections = await db.listCollections().toArray(); 
        console.log(`Database Info: ${dbName} has ${collections.length} collections`); 
    } catch (e) { 
        console.error(e); 
    } 
} 
main().catch(console.error); 

