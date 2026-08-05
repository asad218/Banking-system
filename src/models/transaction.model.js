const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    FromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a FromAccount"]
    },
     ToAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a Toccount"]
    },
    status:{
        type:String,
        enum:{
            values: ["PENDING","SUCCESS","FAILED","REVERSED"],
            message: "Status must be one of PENDING, SUCCESS, FAILED, REVERSED"
        },
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: [true, "Transaction must have an amount"],
        min: [0, "Transaction amount must be positive"]
    },
    idempotencyKey:{
        type: String,
        required: [true, "Transaction must be associated with a unique idempotencyKey"],    
        unique: true,
        index: true

    }

},{
    timestamps: true
})


const TransactionModel = mongoose.model("transaction", transactionSchema);

module.exports = TransactionModel;
    