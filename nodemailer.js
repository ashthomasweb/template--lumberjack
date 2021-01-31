// Nodemailer functions and templates for "Looseleashdog" 

// ** LumberJack-Setup **
// This is your nodemailer module. 
// You will need to edit this file. Look for the setup instructions below.


// Dependencies
const nodemailer = require("nodemailer");
const {
    user_name,
    user_email,
    message,
} = require('./app.js');

// Mailer transport object 
var transporter = nodemailer.createTransport({
    host: 'mi3-ts3.a2hosting.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
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
    return `{"from": "info@ashthomasweb.com",
    "to": "rideoutweb@gmail.com",
    "subject": "A person is reaching out about the LumberJack theme.",
    "html": "${inquiryTemplate()}"}`;
};

function mailConfirmation(user_name, user_email, message) {
    return `{"from": "info@ashthomasweb.com",
    "to": "${user_email}",
    "subject": "This is your email confirmation from LumberJack!",
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


// Exports
module.exports = {
    transporter,
    inquiry,
    finalConfirm,
    // newEmailTemplate,
};

// END of document