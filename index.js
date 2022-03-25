"use strict";

let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");


async function main() {
    const ses = new aws.SES({
        apiVersion: "2010-12-01",
        region: "us-east-1",
    });
    let transporter = nodemailer.createTransport({
        SES: {ses, aws},
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.FROM}>`,
        to: process.env.TO, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
