/**
 * Created by zhaosiyang on 2016-06-27.
 */

var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');

var config = function(options){
    var transporter = nodemailer.createTransport('smtps://' + options.email + ':' + options.password + '@' + options.server);
    return function(mailOptions){
        return new Promise(function(fullfill, reject){
            var newMailOptions = {};
            newMailOptions.subject = mailOptions.subject || null;
            var senderName = mailOptions.senderName || options.email;
            newMailOptions.from = '\"' + senderName + '\" <' + options.email + '>';

            if(!mailOptions.receivers && !mailOptions.receiver){
                reject(new Error('No receiver found'));
            }

            if(mailOptions.receivers){
                if(!Array.isArray(mailOptions.receivers)){
                    reject(new Error('Type Error: receivers should be an array of email address'));
                }
                else{
                    newMailOptions.to = mailOptions.receivers.join(', ');
                }
            }
            else{
                newMailOptions.to = mailOptions.receiver;
            }

            if(!mailOptions.text && !mailOptions.html && !mailOptions.templatePath){
                reject(new Error('No contents in your email'));
            }
            if(mailOptions.templatePath){
                fs.readFile(path.join(module.parent.filename, '..', mailOptions.templatePath), 'utf-8', function (err,data) {
                  if (err) {
                    reject(err);
                  }
                  else{
                      newMailOptions.html = data;
                      transporter.sendMail(newMailOptions, function(err, info){
                          if(err){
                              reject(err);
                          }
                          else{
                              fullfill(info);
                          }
                      });
                  }
                });
            }
            else{
                if (mailOptions.html){
                    newMailOptions.html = mailOptions.html;
                }
                else{
                    newMailOptions.text = mailOptions.text;
                }

                if(mailOptions.attachments){
                    newMailOptions.attachments = mailOptions.attachments;
                }
                transporter.sendMail(newMailOptions, function(err, info){
                    if(err){
                        reject(err);
                    }
                    else{
                        fullfill(info);
                    }
                });
            }

        });
    }
};

module.exports.config = config;

// var config = {
//     email: 'test@ez4edu.com',
//     password: 'Xhunter648!',
//     emailServerDomain: 'dprhcp204.doteasy.com'
// };

// var transporter = nodemailer.createTransport('smtps://' + config.hostEmailAddress + ':' + config.password + '@' + config.emailServerDomain);

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

// module.exports = function(options){
//     var mailOptions = {};
//     var senderName = options.senderName || 'easy4.0 education';
//     mailOptions.from = `"${senderName}" <${config.hostEmailAddress}>`;
//     if(!options.receivers){
//         return console.log('Error: no receivers specified');
//     }
//     if (!options.subject){
//         return console.log('Error: no subject specified');
//     }
//     if (!options.html){
//         return console.log('Error: no contents specified');
//     }
//     if(Array.isArray(options.receivers)){
//         mailOptions.to = options.receivers.join(', ');
//     }
//     else{
//         mailOptions.to = options.receivers;
//     }
//     mailOptions.subject = options.subject;
//     mailOptions.html = options.html;
//     if (options.attachments){
//         if(Array.isArray(options.attachments)){
//             mailOptions.attachments = options.attachments;
//         }
//         else{
//             mailOptions.attachments = [options.attachments];
//         }
//     }
//     return new Promise(function(fullfill, reject){
//         transporter.sendMail(mailOptions, function(err, info){
//             if(err){
//                 reject(err);
//             }
//             else{
//                 fullfill(info);
//             }
//         });
//     });
// };

//refer to https://nodemailer.com/using-attachments/ for other kind of attachments



