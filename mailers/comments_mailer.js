const nodeMailer = require('../config/nodemailer');



// another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'anant19bansal@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        // html: '<h1>Your comment is now published</h1>'
        html: htmlString
    }, (err, info)=>{
        if(err){console.log('error in sending mail, ',err); return;}
        console.log('Message Sent', info);
        return;
    });
}