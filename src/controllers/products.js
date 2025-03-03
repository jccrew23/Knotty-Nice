import { getDb } from '../mongodb/connect.js';
import { ObjectId } from 'mongodb';

export  const getAllProducts = async(req, res) => {
    try 
    {
        const db = getDb();
        const result = await db.collection('Yarn').find();

        if (!result) {
            res.status(404).send('No products found');
            return;
        }
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(lists);
        });
    } catch (err) {
        res.status(500).send({error:'Error getting product'});
    }
};

export const getProductById = async(req, res) => {
    try 
    {
        const id = `${req.params.id}`;
        const productId = new ObjectId(id);

        const db = getDb();
        const result = await db.collection('Yarn').findOne({ _id: productId });

        if (!result) {
            res.status(404).send('Product not found');
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).send({error:'Error getting product'});
    }
};

export const createProduct = async(req, res) => {
    try 
    {
        const { productName, productPrice, productCategory } = req.body;

        const newProduct = { productName, productPrice, productCategory };

        const db = getDb();
        const response = await db.collection('Yarn').insertOne(newProduct);

        if (response.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json(newProduct);
        } else {
            res.status(500).send('Error creating product');
        }
    }
    catch (error) {
        res.status(500).send({error:'Error creating product'});
    }
};

export const updateProduct = async(req, res) => { 
    try 
    {
        const id = req.params.id;
        const productId = new ObjectId(id);

        const { productName, productPrice, productCategory } = req.body;
        const updatedProduct = { productName, productPrice, productCategory };

        const db = getDb();
        const result = await db.collection('Yarn').updateOne({ _id: productId }, { $set: updatedProduct });

        if (result.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(updatedProduct);
        } else {
            res.status(500).send('Error updating product');
        }
    } catch (error) {
        res.status(500).send({error:'Error updating product'});
    }
};

export const deleteProduct = async(req, res) => {
    try 
    {
        const id = req.params.id;
        const productId = new ObjectId(id);

        const db = getDb();
        const result = await db.collection('Yarn').deleteOne({ _id: productId });

        if (result.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(204).send();
        } else {
            res.status(500).send('Error deleting product');
        }
    } catch (error) {
        res.status(500).send({error:'Error deleting product'});
    }
};
