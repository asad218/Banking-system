const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel = require('../models/account.model');

async function createTransaction(req, res) {
    const { FromAccount, ToAccount, amount, idempotencyKey } = req.body;
    if(!FromAccount || !ToAccount || !amount || !idempotencyKey){
        return res.status(400).json({
             message: "Missing required fields" 
            });
    }

    /*
         checking if FromAccount and ToAccount exist
    */

    const fromUserAccount = await accountModel.findOne({
        _id:FromAccount
    })
     const ToUserAccount = await accountModel.findOne({
        _id:ToAccount
    })

    if(!fromUserAccount || !ToUserAccount) {
        return res.status(404).json({
            message: "FromAccount or ToAccount not found"
        });
    }


    /*
       checking idempotency key to avoid duplicate transactions
    */

    const isTransactionExist = await transactionModel.findOne({
        idempotencyKey:idempotencyKey
    })
    if(isTransactionExist){
        if(isTransactionExist.status === "SUCCESS"){
            return res.status(200).json({
                message: "Transaction already exists with this idempotencyKey and is successful",
                transaction: isTransactionExist
            });
        }else if(isTransactionExist.status === "PENDING"){
            return res.status(202).json({
                message: "Transaction already exists with this idempotencyKey and is pending",
                transaction: isTransactionExist
            });
        }else if(isTransactionExist.status === "FAILED"){
            return res.status(500).json({
                message: "Transaction processing failed",
                transaction: isTransactionExist
            });
        }
        else if(isTransactionExist.status === "REVERSED"){
            return res.status(500).json({
                message: "Transaction processing  is reversed  retry ",
                transaction: isTransactionExist
            });
        }
    }

    /*
       check
        account status 
    */
    if(fromUserAccount.status !== "ACTIVE" || ToUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "FromAccount or ToAccount is not active"
        });
    }

    /* derive sender balance from ledger */


    
    
    
}


async function createInitialFundTransaction(req, res) {
    const { ToAccount, amount, idempotencyKey } = req.body;
    if(!ToAccount || !amount || !idempotencyKey){
        return res.status(400).json({
             message: "Missing required fields" 
            });
    }
    
    /*
         checking if ToAccount exist
    */  
   const toUserAccount = await accountModel.findOne({
        _id:ToAccount
    })

    if(!toUserAccount) {
        return res.status(404).json({
            message: "ToAccount not found"
        });
    }

    const fromUSerAccount = await accountModel.findOne({
        systemUSer:true,
        user : req.user._id
    })

    // 03 : 06 :: 44

    /*
       checking idempotency key to avoid duplicate transactions
    */
}
module.exports = { createTransaction }