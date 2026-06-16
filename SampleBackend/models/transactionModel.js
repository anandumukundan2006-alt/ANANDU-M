import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: ["Income", "Expense"],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    date: {
        type: Date,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

}, {
    timestamps: true
});

const Transaction = mongoose.model("transactions", transactionSchema);

export default Transaction;