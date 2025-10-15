import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: `${__dirname}/.env` });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB Connection...');
console.log('Connection String:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    return TestModel.create({ test: 'Connection test' });
  })
  .then((doc) => {
    console.log('✅ Test document created:', doc);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('✅ Connection closed successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    if (err.code) console.error('Error Code:', err.code);
    if (err.codeName) console.error('Error Code Name:', err.codeName);
    process.exit(1);
  });
