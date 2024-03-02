const express = require('express');
const connection = require('../connection');
const router = express.Router();
router.post('/create', (req, res, next) => {
    let product = req.body;
    let query = "INSERT INTO product (name, description, price) VALUES (?, ?, ?)";
    connection.query(query, [product.name, product.description, product.price], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Successfully added product" });
        } else {
            return res.status(500).json(err);
        }
    }); 
});
router.get('/read', (req, res, next) => {
    var query = "SELECT * FROM product"; 
    connection.query(query, (err, results) => {
        if (!err) { 
            return res.status(200).json(results); 
        } else {
            return res.status(500).json(err); 
        }
    });
});
router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    let product = req.body;
    var query = "UPDATE product SET name=?, description=?, price=? WHERE id=?";
    connection.query(query, [product.name, product.description, product.price, id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product ID not found" });
            }
            return res.status(200).json({ message: "Successfully updated product" });
        } else {
            return res.status(500).json(err);
            
        }
    });
});

router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "DELETE FROM product WHERE id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product ID not found" });
            }
            return res.status(200).json({ message: "Successfully deleted product" });
        } else {
            return res.status(500).json(err);
        }
    });
});





module.exports = router;