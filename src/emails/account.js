const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'taskapp@moodle.portfolios.dx.am',
        subject: 'Thanks for joining us',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html: '<strong>You can create your tasks and set a reminder alarm.</strong>'
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'taskapp@moodle.portfolios.dx.am',
        subject: 'We are sorry to see you go',
        text: `Hi ${name}, We are sorry to see you go but we appreciate it if you let us know how we can do better.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}