# nodemailer-promise
Using node mailer using in Promise way

## Features
* In powerful Promise way
* Can use html file as your template instead of hard code lengthy html string
* Easy to use

## Installation
`npm install nodemailer-promise --save`

## Quick Start
#### step 1: configure your email address
```
var mailer = require('nodemailer-promise');

var sendEmail = mailer.config({
    email: 'kern_zhao@126.com',
    password: 'I will not tell you',
    server: 'smtp.126.com'
});
```

#### step 2: send email
```
var options = {
    subject: 'This is the test',
    senderName: 'Siyang Zhao',
    receiver: 'siyangkernzhao@gmail.com',
    text: 'hello how are you',
};

sendEmail(options)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```

NOTE: Using your Gmail account to send an email may not work directly, for security reasons you may need to configure something, refer [https://nodemailer.com/using-gmail/]

## API
#### Options can include the following fields
1. subject: `type: String` the subject of your email
2. senderName: `type: String` the receiver will see the senderName as alias of your email, default to your email address
3. receiver: `type: String` the email address of the receiver
4. receivers: `type: [String]` the email address of multiple receivers
5. text: `type: String` the plain text you will send as your email contents
6. html: `type: String` the html string  you will send as your email contents
7. templatePath: `type: String` the path of the html file template you want to send (useful when you want to send a large html string)
8. attachments: `type: [Object]` the attachments you want to send with your email


    Note: 
    1. Either receivers or receiver field should be included.
    2. Either text or html or templatePath should be included.
    3. For the form of attachments, please refer to example 3 below.

## Examples (config omitted)
#### Example1: send an email to one receiver with inline html contents
```
var options = {
    subject: 'This is the test',
    senderName: 'Siyang Zhao',
    receiver: 'siyangkernzhao@gmail.com',
    html: '<h1>hello world</h1>',
};

sendEmail(options)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log(err)});   // if an error occurs
```
#### Example2: send an email to multiple receivers with html from another file
```
var options = {
    subject: 'This is the test',
    senderName: 'Siyang Zhao',
    receivers: ['siyangkernzhao@gmail.com', 'kern_zhao@126.com'],
    templatePath: 'path/to/your/file/hello.html',
};

sendEmail(options)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```

#### Example3: send an email to a receiver with plain text as contents, also with some attachments
```
var options = {
    subject: 'This is the test',
    senderName: 'Siyang Zhao',
    receiver: 'siyangkernzhao@gmail.com',
    text: 'hello, how are you',
    attachments: [
        {   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },
        {   // binary buffer as an attachment
            filename: 'text2.txt',
            content: new Buffer('hello world!','utf-8')
        },
        {   // file on disk as an attachment
            filename: 'text3.txt',
            path: '/path/to/file.txt' // stream this file
        },
        {   // filename and content type is derived from path
            path: '/path/to/file.txt'
        },
        {   // stream as an attachment
            filename: 'text4.txt',
            content: fs.createReadStream('file.txt')
        },
        {   // define custom content type for the attachment
            filename: 'text.bin',
            content: 'hello world!',
            contentType: 'text/plain'
        },
        {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        },
        {   // encoded string as an attachment
            filename: 'text1.txt',
            content: 'aGVsbG8gd29ybGQh',
            encoding: 'base64'
        },
        {   // data uri as an attachment
            path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        },
        {
            // use pregenerated MIME node
            raw: 'Content-Type: text/plain\r\n' +
                 'Content-Disposition: attachment;\r\n' +
                 '\r\n' +
                 'Hello world!'
        }
    ]
};

sendEmail(options)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```

## github repo (https://github.com/zhaosiyang/nodemailer-promise)

## Contact Me (kern_zhao@126.com)

