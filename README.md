# nodemailer-promise
Using node mailer using in Promise way

## Features
* In powerful Promise way
* Can use html file as your template instead of hard code lengthy html string
* Easy to use

## Installation
`npm install nodemailer-promise --save`

## Quick Start
### step 1: configure your email address
```
var mailer = require('nodemailer-promise');

var sendEmail = mailer.config({
    host: 'smtp.126.com',
    auth:{
      user: 'kern_zhao@126.com',
      pass: 'I will not tell you'
    }
});
```

### step 2: send email

```
var message = {
    from: 'sender@server.com',
    to: 'receiver@sender.com',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
};

sendEmail(message)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```
#### Commmon fields

* from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted ’“Sender Name” sender@server.com‘, see Address object for details
* to - Comma separated list or an array of recipients email addresses that will appear on the To: field
* cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
* bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
* subject - The subject of the email
* text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…’})
* html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…‘})
* attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.
#### More advanced fields

##### Routing options
* sender - An email address that will appear on the Sender: field (always prefer from if you’re not sure which one to use)
* replyTo - An email address that will appear on the Reply-To: field
* inReplyTo - The Message-ID this message is replying to
* references - Message-ID list (an array or space separated string)
* envelope - optional SMTP envelope, if auto generated envelope is not suitable (see SMTP envelope for details)

##### Content options
* attachDataUrls – if true then convert data: images in the HTML content of this message to embedded attachments
* watchHtml - Apple Watch specific HTML version of the message
* icalEvent – iCalendar event to use as an alternative. See details here
* alternatives - An array of alternative text contents (in addition to text and html parts) (see Using alternative content for details)
* encoding - identifies encoding for text/html strings (defaults to ‘utf-8’, other values are ‘hex’ and ‘base64’)
* raw - existing MIME message to use instead of generating a new one. See details here
* textEncoding - force content-transfer-encoding for text values (either quoted-printable or base64). By default the best option is detected (for lots of ascii use quoted-printable, otherwise base64)

##### Header options

* priority - Sets message importance headers, either ‘high’, ‘normal’ (default) or ‘low’.
* headers - An object or array of additional header fields (e.g. {“X-Key-Name”: “key value”} or [{key: “X-Key-Name”, value: “val1”}, {key: “X-Key-Name”, value: “val2”}]). Read more about custom headers here
* messageId - optional Message-Id value, random value will be generated if not set
* date - optional Date value, current UTC string will be used if not set
* list - helper for setting List-* headers (see more here)

##### Security options
* disableFileAccess - if true, then does not allow to use files as content. Use it when you want to use JSON data from untrusted source as the email. If an attachment or message node tries to fetch something from a file the sending returns an error. If this field is also set in the transport options, then the value in mail data is ignored
* disableUrlAccess - if true, then does not allow to use Urls as content. If this field is also set in the transport options, then the value in mail data is ignored

NOTE: Using your Gmail account to send an email may not work directly, for security reasons you may need to configure something, refer [https://nodemailer.com/usage/using-gmail/]

## API
### General options
* service – can be set to the name of a well-known service so you don’t have to input the port, host, and secure options (see Well-known Services)
* port – is the port to connect to (defaults to 587 is secure is false or 465 if true)
* host – is the hostname or IP address to connect to (defaults to ‘localhost’)
* auth – defines authentication data (see authentication section below)
* authMethod – defines preferred authentication method, defaults to ‘PLAIN’
### TLS options
* secure – if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
* tls – defines additional node.js TLSSocket options to be passed to the socket constructor, eg. {rejectUnauthorized: true}.
* ignoreTLS – if this is true and secure is false then TLS is not used even if the server supports STARTTLS extension
* requireTLS – if this is true and secure is false then Nodemailer tries to use STARTTLS even if the server does not advertise support for it. If the connection can not be encrypted then message is not sent
### Connection options
* name – optional hostname of the client, used for identifying to the server, defaults to hostname of the machine
* localAddress – is the local interface to bind to for network connections
* connectionTimeout – how many milliseconds to wait for the connection to establish
* greetingTimeout – how many milliseconds to wait for the greeting after connection is established
* socketTimeout – how many milliseconds of inactivity to allow
### Debug options
* logger – optional bunyan compatible logger instance. If set to true then logs to console. If value is not set or is false then nothing is logged
* debug – if set to true, then logs SMTP traffic, otherwise logs only transaction events
Security options
* disableFileAccess – if true, then does not allow to use files as content. Use it when you want to use JSON data from untrusted source as the email. If an attachment or message node tries to fetch something from a file the sending returns an error
* disableUrlAccess – if true, then does not allow to use Urls as content
Pooling options
* pool – see Pooled SMTP for details about connection pooling
Proxy options
* proxy – all SMTP based transports allow to use proxies for making TCP connections to servers. Read about proxy support in Nodemailer from here


#### This proyects is based on [nodemailer](https://www.npmjs.com/package/nodemailer) so the documentation [here](https://nodemailer.com/about/) is valid for this library.

## Examples (config omitted)
#### Example1: send an email to one receiver with inline html contents
```
var message = {
    from: 'sender@server.com',
    to: 'receiver@sender.com',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
};

sendEmail(message)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```
#### Example2: send an email to multiple receivers with html from another file
```
var message = {
    from: 'sender@server.com',
    to: ['siyangkernzhao@gmail.com', 'kern_zhao@126.com'],
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
};
sendEmail(message)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```

#### Example3: send an email to a receiver with plain text as contents, also with some attachments
```
var options = {
    from: 'sender@server.com',
    to: 'receiver@sender.com',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
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
