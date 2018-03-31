/**
 * Created by zhaosiyang on 2016-06-27.
 */

var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');

var _transporter = null;

var config = function(options) {
    if (!_transporter) {
        var _transporter = nodemailer.createTransport(options);
    }
    return function(mailOptions) {
        return new Promise(function(resolve, reject) {
            _transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }
};

module.exports.config = config;
