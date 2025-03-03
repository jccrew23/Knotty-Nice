import express from 'express';
const router = express.Router();
import * as productsController from '../controllers/products.js';
import * as validation from '../middleware/validate.js';

const idLength = 24;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - productPrice
 *         - productCategory
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The product name
 *         productPrice:
 *           type: number
 *           description: The product price
 *         productCategory:
 *           type: string
 *           description: The product category
 *       example:
 *         productName: "Chocolate Brown Soft"
 *         productPrice: 12.49
 *         productCategory: "Yarn"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of products from the database
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: The contact was not found
 *       500:
 *         description: Error getting product
 */
router.get('/products', productsController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a single product from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: An error occurred
 */
router.get('/products/:id', productsController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: An error occurred
 */
router.post('/products', validation.saveProduct, productsController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update a product in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: An error occurred
 */
router.put('/products/:id', validation.saveProduct, productsController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       500:
 *         description: An error occurred
 */
router.delete('/products/:id', productsController.deleteProduct);

export default router;