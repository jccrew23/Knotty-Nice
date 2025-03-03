import express from 'express';
const router = express.Router();
import * as transactionsController from '../controllers/transactions.js';
import * as validation from '../middleware/validate.js';

const idLength = 24;

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - paymentType
 *         - transactionAmount
 *         - transactionDate
 *         - products
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         paymentType:
 *           type: string
 *           description: The payment type
 *         transactionAmount:
 *           type: number
 *           description: The transaction amount
 *         transactionDate:
 *           type: string
 *           description: The transaction date
 *         products:
 *           type: array
 *           description: The products in the transaction
 *       example:
 *         paymentType: "Credit Card"
 *         transactionAmount: 42.49
 *         transactionDate: "2021-01-01"
 *         products: [Chocolate Brown Soft, SundaeSwirl Crochet, Blueberry Muffin]
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Retrieve a list of transactions from the database
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: The transactions were not found
 *       500:
 *         description: Error getting transactions
 */
router.get('/transactions', transactionsController.getAllTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     description: Retrieve a single transaction from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: An error occurred
 */
router.get('/transactions/:id', transactionsController.getTransactionById);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Add a new transaction to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: An error occurred
 */
router.post('/transactions', validation.saveTransaction, transactionsController.createTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     description: Update a transaction in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: An error occurred
 */
router.put('/transactions/:id', validation.saveTransaction, transactionsController.updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     description: Delete a transaction from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       500:
 *         description: An error occurred
 */
router.delete('/transactions/:id', transactionsController.deleteTransaction);

export default router;