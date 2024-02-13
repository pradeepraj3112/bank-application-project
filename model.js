const mongoose =require('mongoose')

const EmployeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    Date: {
        type: Date

    }
    
});


const EmployeModel = mongoose.model("employees",EmployeSchema)
module.exports=EmployeModel