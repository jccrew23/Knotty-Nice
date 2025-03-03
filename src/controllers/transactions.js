import { getDb } from '../mongodb/connect.js';
import { ObjectId } from 'mongodb';

export  const getAllTransactions = async(req, res) => {
    try 
    {
        const db = getDb();
        const result = await db.collection('Transactions').find();

        if (!result) {
            res.status(404).send('No transactions found');
            return;
        }
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(lists);
        });
    } catch (err) {
        res.status(500).send({error:'Error getting transactions'});
    }
};

export const getTransactionById = async(req, res) => {
    try 
    {
        const id = req.params.id;
        const transactionId = new ObjectId(id);

        const db = getDb();
        const result = await db.collection('Transactions').findOne({ _id: transactionId });

        if (!result) {
            res.status(404).send('Transaction not found');
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error:'Error getting transaction'});
    }
};

export const createTransaction = async(req, res) => {
    try 
    {
        const { paymentType, transactionAmount, transactionDate, products } = req.body;
        const newTransaction = { paymentType, transactionAmount, transactionDate, products };

        const db = getDb();
        const response = await db.collection('Transactions').insertOne(newTransaction);

        if (response.acknowledged) {
            res.status(201).json(newTransaction);
        } else {
            res.status(500).send('Error creating transaction');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({error:'Error creating transaction'});
    }
};

export const updateTransaction = async (req, res) => { 
    try 
    {
        const id = req.params.id;
        const transactionId = new ObjectId(id);

        const { paymentType, transactionAmount, transactionDate, products } = req.body;
        const updatedTransaction = { paymentType, transactionAmount, transactionDate, products };

        const db = getDb();
        const result = await db.collection('Transactions').updateOne({ _id: transactionId }, { $set: updatedTransaction });

        if (result.acknowledged) {
            res.status(200).json(updatedTransaction);
        } else {
            res.status(500).send('Error updating transaction');
        }
    } catch (error) {
        res.status(500).send({error:'Error updating transaction'});
    }
};

export const deleteTransaction = async(req, res) => {
    try 
    {
        const id = req.params.id;
        const transactionId = new ObjectId(id);

        const db = getDb();
        const result = await db.collection('Transactions').deleteOne({ _id: transactionId });

        if (result.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(204).send();
        } else {
            res.status(500).send('Error deleting transaction');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:'Error deleting transaction'});
    }
};