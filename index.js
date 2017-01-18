/**
 * Created by zhaosiyang on 2016-06-27.
 */

var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');

var _transporter = null;

var config = function(options){
    if (!_transporter) {
      var _transporter = nodemailer.createTransport('smtps://' + options.email + ':' + options.password + '@' + options.server);
    }
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
                      _transporter.sendMail(newMailOptions, function(err, info){
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
                _transporter.sendMail(newMailOptions, function(err, info){
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



