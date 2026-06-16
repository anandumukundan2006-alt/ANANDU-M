import Transaction from "../models/transactionModel.js";

// Add Transaction
export const addTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.create(req.body);

        console.log("========== TRANSACTION ADDED ==========");
        console.log("Title       :", transaction.title);
        console.log("Amount      :", transaction.amount);
        console.log("Type        :", transaction.type);
        console.log("Category    :", transaction.category);
        console.log("Date        :", transaction.date);
        console.log("=======================================");

        return res.status(201).json({
            success: true,
            message: "Transaction Added Successfully",
            data: transaction
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Transactions
export const getTransactions = async (req, res) => {

    try {

        const { userId } = req.query;

        const transactions = await Transaction.find({
            userId: userId
        });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {

            if (transaction.type === "Income") {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }

        });

        const highestIncome = transactions
            .filter(t => t.type === "Income")
            .reduce((max, t) => t.amount > max ? t.amount : max, 0);

        const highestExpense = transactions
            .filter(t => t.type === "Expense")
            .reduce((max, t) => t.amount > max ? t.amount : max, 0);

        return res.status(200).json({
            success: true,
            transactions,
            totalIncome,
            totalExpense,
            currentBalance: totalIncome - totalExpense,
            totalTransactions: transactions.length,
            highestIncome,
            highestExpense
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Transaction
export const updateTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        const transaction = await Transaction.findByIdAndUpdate(
            id,
            req.body,
            {
                returnDocument: "after"
            }
        );

        console.log("======= TRANSACTION UPDATED =======");
        console.log(transaction);
        console.log("===================================");

        return res.status(200).json({
            success: true,
            message: "Transaction Updated Successfully",
            data: transaction
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Transaction
export const deleteTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        await Transaction.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Transaction Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};