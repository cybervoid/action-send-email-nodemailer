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
        from: process.env.FROM,
        to: process.env.TO,
        subject: process.env.SUBJECT,
        text: process.env.BODY,
        html: process.env.BODY,
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
