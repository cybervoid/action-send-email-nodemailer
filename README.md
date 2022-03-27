# Send email via Nodemailer Github Action

This action allows to Send an Email via [Nodemailer](https://nodemailer.com), a Nodejs module to send Emails.

## Key features:

- Heavy focus on security
- Support of multiple transports (SMTP, AWS SES)
- Unicode support (like emojie support)

Full list of [Features](https://nodemailer.com/about/#nodemailer-features)

## Example usage

```yaml
- name: Send mail
  uses: cybervoid//action-send-email-nodemailer@v1
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  with:
    to: recipient@example.com,other-recipient@example.com
    from: '"John Smith <jsmith@example.com>"'
    subject: 'This is my subject'
    body: Sample email from ${{github.repository}}. Hello World!
- name: Was the email sent
  run: echo "Was the email sent? ${{ steps.message.outputs.message }}"
```

## Outputs

### `message`

Returned message object from Nodemailer

So far I only need the integration for AWS SES. If you need to add another transporter PRs are welcome or open an issue.

## Steps to Setup AWS SES as a transport

- Generate `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with proper permissions to use SES
- Add them as Github Secret
- Include as environment variable when calling the action.
