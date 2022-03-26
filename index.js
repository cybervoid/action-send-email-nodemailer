"use strict";

const core = require('@actions/core');
const github = require('@actions/github');
let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");

async function main() {

    // from: process.env.FROM,
    //     to: process.env.TO,
    //     subject: process.env.SUBJECT,
    //     text: process.env.BODY,
    //     html: process.env.BODY,

    const to = core.getInput('to');
    const from = core.getInput('from');
    const subject = core.getInput('subject');
    const body = core.getInput('body');

    const ses = new aws.SES({
        apiVersion: "2010-12-01",
        region: "us-east-1",
    });
    let transporter = nodemailer.createTransport({
        SES: {ses, aws},
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: body,
        html: body,
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(err => core.setFailed(err));
