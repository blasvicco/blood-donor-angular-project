var nodemailer = require('nodemailer');
exports.sendAccountActivation = function(person, host, smtp) {
  var url = host + '/login/#?code=' + person._id;
  var content = 'To confirm your account click in the next link';
  var link = '<a href="' + url + '">' + url + '</a>';
  var transporter = nodemailer.createTransport(smtp.cfg);
  var mailData = {
    from : smtp.from,
    to : person.emailAddress,
    subject : 'Access to confirm and edit your details',
    text : content + '\n' + link,
    html : content + '<br />' + link
  };
  transporter.sendMail(mailData, function(err) {
    if (err) console.log(err);
  });
};

exports.sendAccountRecoveryNotification = function(req, host, smtp) {
  var url = host + '/login/#?code=' + req._id;
  var content = 'You can recovery your account using the next link: ';
  var link = '<a href="' + url + '">' + url + '</a>';
  var transporter = nodemailer.createTransport(smtp.cfg);
  var mailData = {
    from : smtp.from,
    to : req.emailAddress,
    subject : 'Your account was deleted',
    text : content + '\n' + link,
    html : content + '<br />' + link
  };
  transporter.sendMail(mailData, function(err) {
    if (err) console.log(err);
  });
};
