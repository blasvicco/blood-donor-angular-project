# blood-donor-angular-project
This is a complete example of an angular project.
Users can become blood donors just completing a simple form and selecting their address in a Map.
The data in the form will be validated.
An email to confirm the account will be sent after the form submit.
The email include a link to edit the donor information even delete it.
The map that show the donors will update automatically after a new donor is added or updated in the view range of the clients.
The contact info of the donors will be hidden until the visitors click on it to avoid robot spams.

### Live demo
- [https://blood-donor-angular-project.herokuapp.com/](https://blood-donor-angular-project.herokuapp.com/)

### Some of the technologies used in this project are:
  - Node.js
  - Express framework
  - Socket.io
  - Angular framework
  - Mongo DB
  - Karma + Jasmine

### Some external libs:
  - mongoose (http://mongoosejs.com)
  - mongoose-types (https://github.com/bnoguchi/mongoose-types)
  - mongoose-double (https://github.com/aheckmann/mongoose-double)
  - nodemailer (https://github.com/nodemailer/nodemailer)
  - angular-messages (https://github.com/angular/bower-angular-messages)
  - angularAMD (https://github.com/marcoslin/angularAMD)
  - ESRI Map (https://developers.arcgis.com/javascript/)

### Installation
```sh
$ git clone [git-repo-url] folder-name
$ cd folder-name
$ npm install
$ bower install
```

### Run
```sh
$ cd cloned-folder-name
$ node index.js
```

### Run karma test
```sh
$ cd cloned-folder-name
$ karma start public/utest/karma.conf.js
```
