// Node.js/Express Server "app.js" for "LumberJack" 

// ** LumberJack-Setup **
// This is your server application. It's a Node.js runtime and Express build. 
// It uses EJS to dynamically render page content. You will need to edit this 
// file. Look for the setup instructions below. You must install all dependecies 
// locally and on your host.

// NPM Package to install on your host
// const secure = require("ssl-express-www");

// Dependencies 
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const favicon = require('express-favicon');
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');
var prismicEndpoint = 'https://lumberjack.prismic.io/api/v2';

const app = express();
// app.use(secure); // forces https and removes www
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Prismic
// Standardized URLs for known types
var linkResolver = function (doc) {
    if (doc.type === 'blog') return "/post/" + doc.uid;
    if (doc.type === 'page') return "/" + doc.uid;
    // Fallback for other types, in case new custom types get created
    return "/";
};

// Middleware to inject prismic context
app.use(function (req, res, next) {
    res.locals.ctx = {
        endpoint: prismicEndpoint,
        linkResolver: linkResolver,
    };
    res.locals.PrismicDOM = PrismicDOM;
    next();
});

// Initialize the prismic api
function initApi(req) {
    return Prismic.getApi(prismicEndpoint, {
        req: req
    });
};
// END Prismic

// ** LumberJack-Setup - Page titles and menu links
// You need to change the appropriate route handler to reflect your page names 
// and titles. Observe capitalizations. Do not change the routing for /posts.

// Route Handlers

app.get('/', function (req, res) {
    res.render('home', {
        pageTitle: 'LumberJack',
    });
});

app.get('/about', function (req, res) {
    res.render('about', {
        pageTitle: "About",
    });
});

app.get('/technology', function (req, res) {
    res.render('technology', {
        pageTitle: "Technology",
    });
});

app.get('/blog', function (req, res) {
    initApi(req).then(function (api) {
        api.query(
            Prismic.Predicates.at('document.type', 'post')
        ).then(function (response) {
            // "response" is the data object you can view with the Prismic API browser.
            res.render('blog', {
                document: response.results,
                pageTitle: "Blog",
            });
        });
    });
});

app.get('/posts/:postTitle', function (req, res) {
    let url = './posts/' + req.params.postTitle;
    initApi(req).then(function (api) {
        api.query(
            Prismic.Predicates.at('document.type', 'post')
        ).then(function (response) {
            // "response" is the data object you can view with the Prismic API browser.
            if (url) {
                res.render('post', {
                    document: response.results,
                    pageTitle: "Blog Post",
                    title: req.params.postTitle.replace(/-/g, ' '),
                });
            }
        });
    });
});

app.get('/media', function (req, res) {
    res.render('media', {
        pageTitle: "Media",
    });
});

app.get('/contact', function (req, res) {
    res.render('contact', {
        pageTitle: "Contact",
        responseBool: false,
    });
});

app.post('/contact', async (req, res) => {

    let ifError = false;

    // Data recieved from the contact form
    let {
        user_name,
        user_email,
        message
    } = req.body;

    // ** LumberJack-Setup **
    // This is your nodemailer module. 

    // Mailer transport object 
  
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log(err)
            reject('Error');
          }
          resolve(token);
        });
      });
    
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
  
    // ** LumberJack-Setup - Editing supplied HTML email templates **

    // Templates
    function inquiryTemplate() {

        // Do not remove backtick. Only edit HTML markup below. Be mindful of the objects with ${this} syntax, they are data values 
        // coming from the form and must not be changed. Stick to single quotes, only use inline CSS styles.

        let inqTemplate = `

                <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>
                    <h2>Hi Ash, someone is looking at the LumberJack Theme</h2>
                        <p>Below is a copy of the email.</p> 
                    <h2>From:</h2>
                        <p style='padding: 0 30px;'><strong>${user_name}</strong></p>
                    <h2>Email:</h2>
                        <p style='padding: 0 30px;'>${user_email}</p>
                    <h2>Message:</h2>
                        <p style='padding: 0 30px;'>${message}</p>
                </div>
            
            `; // Do not remove backtick

        let output = inqTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
        return output;
    };

    function confirmTemplate() {

        // Do not remove backtick. Only edit HTML markup below. Be mindful of the objects with ${this} syntax, they are data values coming 
        // from the form and must not be changed. Stick to single quotes, only use inline CSS styles.

        let confTemplate = `

                <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>   
                    <h2>Hi ${user_name}, thanks for checking out LumberJack.</h2>
                        <p>This is an automatic response confirming that your email was sent. I will reach out to you within the next few days. Below is a copy of your email.</p> 
                        <p>Remember, this is an automatic email and doesn't accept replys.</p>
                    <h2>From:</h2>
                        <p style='padding: 0 30px;'><strong>${user_name}</strong></p>  
                    <h2>Email:</h2>
                        <p style='padding: 0 30px;'>${user_email}</p>
                    <h2>Message:</h2>
                        <p style='padding: 0 30px;'>${message}</p>
                </div>

            `; // Do not remove backtick

        let output = confTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
        return output;
    };

    // ** LumberJack-Setup - New Email Template **

    /* 

    function newTemplate() {

        // This is a new email template for you to use. Simply uncomment the template, email object, and parsing lines of code associated 
        // with "newTemplate", as well as the parsed object in the exports at the bottom. Head over to your "/app.js" and look for the setup 
        // comments in the /post request.


        // Do not remove backtick. Only edit HTML markup below. Be mindful of the objects with ${this} syntax, they are data values coming 
        // from the form and must not be changed. Stick to single quotes, only use inline CSS styles.

        let newTemplate = `

        <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>
            <h2>Hello, this is a new template for you to use.</h2>
                <p>Below is a copy of the email.</p> 
            <h2>From:</h2>
                <p style='padding: 0 30px;'><strong>${user_name}</strong></p>
            <h2>Email:</h2>
                <p style='padding: 0 30px;'>${user_email}</p>
            <h2>Message:</h2>
                <p style='padding: 0 30px;'>${message}</p>
        </div>
        
        `; // Do not remove backtick

        let output = newTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
        return output;
    };

    */

    // Nodemailer email objects
    function mailNewInquiry(user_name, user_email, message) {
        return `{"from": "ashthomasweb@gmail.com",
                "to": "ashthomasweb@gmail.com",
                "subject": "A person is reaching out about the LumberJack theme.",
                "html": "${inquiryTemplate()}"}`;
    };

    function mailConfirmation(user_name, user_email, message) {
        return `{"from": "ashthomasweb@gmail.com",
                "to": "${user_email}",
                "subject": "This is your email confirmation from Ashley, the developer of LumberJack!",
                "html": "${confirmTemplate()}"}`;
    };

    /*
    function newEmailTemp(user_name, user_email, message) {
        return `{"from": "your@email.here",
        "to": "${user_email}",
        "subject": "This is your email confirmation",
        "html": "${newTemplate()}"}`;
    };
    */

    // Object parsing
    let inquiry = JSON.parse(mailNewInquiry(user_name, user_email, message));
    let finalConfirm = JSON.parse(mailConfirmation(user_name, user_email, message));
    // let newEmailTemplate = JSON.parse(newEmailTemp(user_name, user_email, message));

    // Transporter objects
    var userInquiry = transporter.sendMail(inquiry);
    var userConfirm = transporter.sendMail(finalConfirm);
    // var newEmail = transporter.sendMail(newEmailTemplate);

    // Populate the new variable into the Promise below, and add results to the 
    // console.log. Example below:
    /*
    Promise.all([userInquiry, userConfirm, newEmail])
        .then(([resultInq, resultConf, resultNew]) => {
            console.log("Emails sent", resultInq, resultConf, resultNew);
        }) 
    */

    // Upon completion, sends response to page indicating success or failure.
    Promise.all([userInquiry, userConfirm])
        .then(([resultInq, resultConf]) => {
            console.log("Emails sent", resultInq, resultConf);
        })
        .catch((err) => {
            console.log(err);
            ifError = true;
        })
        .finally(() => {
            res.render('contact', {
                pageTitle: "Contact",
                responseBool: true,
                isError: ifError,
            });
            transporter.close();
        });

});

// || Listener 

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.log(`Server started at port ${port}.`));

// || END of document
