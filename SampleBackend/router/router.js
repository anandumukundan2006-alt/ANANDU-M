import express from "express";

import {
    signup,
    login,
    updateProfile
} from "../controllers/userController.js";

import {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactionController.js";

import {
    addCategory,
    getCategories
} from "../controllers/categoryController.js";

const router = express.Router();


// ================= USER ROUTES =================

router.post("/signup", signup);

router.post("/login", login);

router.put("/profile/:id", updateProfile);


// ============== TRANSACTION ROUTES ==============

router.post("/transaction", addTransaction);

router.get("/transaction", getTransactions);

router.put("/transaction/:id", updateTransaction);

router.delete("/transaction/:id", deleteTransaction);


// ================ CATEGORY ROUTES ================

router.post("/category", addCategory);

router.get("/category", getCategories);


export default router;