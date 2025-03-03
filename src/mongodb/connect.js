import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

let _db;

export const initDb = (callback) => {
    if (_db) {
        console.warn('Trying to init DB again!');
        return callback(null, _db); 
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then(client => {
            _db = client.db('KnottyNice');
            callback(null, _db);
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            callback(err);
            console.log('Error connecting to MongoDB', err);
        });
};

export const getDb = () => { 
    if (!_db) {
        throw Error('DB not initialized!');
    } 
    return _db;
};