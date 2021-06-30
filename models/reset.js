const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        re1quired: true
    },
    token:{
        type: String,
        required: true
    },
    isValid:{
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const Reset = mongoose.model('Reset', resetSchema);
module.exports = Reset;