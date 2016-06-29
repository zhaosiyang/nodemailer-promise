/**
 * Created by zhaosiyang on 2016-06-27.
 */

var nodemailer = require('nodemailer');

var config = {
    hostEmailAddress: 'test@ez4edu.com',
    password: 'Xhunter648!',
    emailServerDomain: 'dprhcp204.doteasy.com'
};

var transporter = nodemailer.createTransport('smtps://' + config.hostEmailAddress + ':' + config.password + '@' + config.emailServerDomain);

//options example / API
//{
//    senderName: 'EZ4.0 EDU',                  // optional, default to 'easy4.0 education'
//    receivers: ['siyangkernzhao@gmail.com', 'gary.kang@ez4edu.com'],   // can be string or list of string
//    subjects: 'Please verify email',          //required
//    html: '<h1>Hello world</h1>',                 //required
//    attachments: [                                    // can be object or list of object
//    {
//        filename: 'hello1.jpg',
//        path: 'https://s3.amazonaws.com/ezfour/hello1.jpg'
//    },
//    {
//        filename: 'hello2.jpg',
//        path: 'https://s3.amazonaws.com/ezfour/hello2.jpg'
//    }]
//}

module.exports = function(options){
    var mailOptions = {};
    var senderName = options.senderName || 'easy4.0 education';
    mailOptions.from = `"${senderName}" <${config.hostEmailAddress}>`;
    if(!options.receivers){
        return console.log('Error: no receivers specified');
    }
    if (!options.subject){
        return console.log('Error: no subject specified');
    }
    if (!options.html){
        return console.log('Error: no contents specified');
    }
    if(Array.isArray(options.receivers)){
        mailOptions.to = options.receivers.join(', ');
    }
    else{
        mailOptions.to = options.receivers;
    }
    mailOptions.subject = options.subject;
    mailOptions.html = options.html;
    if (options.attachments){
        if(Array.isArray(options.attachments)){
            mailOptions.attachments = options.attachments;
        }
        else{
            mailOptions.attachments = [options.attachments];
        }
    }
    return new Promise(function(fullfill, reject){
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                reject(err);
            }
            else{
                fullfill(info);
            }
        });
    });
};

//refer to https://nodemailer.com/using-attachments/ for other kind of attachments



