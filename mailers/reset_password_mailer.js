const nodeMailer = require('../config/nodemailer');
const Reset = require('../models/reset');

exports.newPassword = (reset) => {
    console.log(reset);
    let htmlString = nodeMailer.renderTemplate({reset: reset}, '/reset-password/reset-password.ejs');
    nodeMailer.transporter.sendMail({
        from: 'anant19bansal@gmail.com',
        to: reset.user.email,
        subject: 'Reset Password on CodeMania19',
        html: htmlString
    }, (err, info) => {
        if(err){console.log('error in sending mail for reset password, ',err); return;}
        return;
    });
}