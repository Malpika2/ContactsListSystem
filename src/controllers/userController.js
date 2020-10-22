const { render } = require('ejs');
const nodemailer = require('nodemailer');
const controller = {};
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

var users = JSON.parse(localStorage.getItem('users'));
// var contacts = JSON.parse(localStorage.getItem('contacts'));

controller.list = (req, res ) =>{
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var contacts_array = [];
    for (var key in contacts) {
        if(contacts[key]['id_user'] ===req.session.passport.user.id ){
            contacts_array.push(contacts[key]);
        }
    }
    const user = users[req.session.passport.user.id];
    res.render('homepage',{contacts:contacts_array,user});
};


controller.signup = (req, res) => {
    // Save register into localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    let idUser = Date.now();
    let {username,password, email } = req.body;
    console.log(users);
    if(users==null){
        let simpleArray = {'000000':{'user_id':'000000','username':username,'password':password,'email':email}};
        localStorage['users'] = JSON.stringify(simpleArray); 
    }
    else{
    users[idUser] = {"user_id":idUser,"username":username,"password":password, 'email':email};
    localStorage['users'] = JSON.stringify(users);
    }
    res.render('login',{message:'Register successful',type:'success'});
}


controller.login = (req, res ) => {
    res.render('login',{message:'User or password invalid',type:'danger'});
}

controller.editProfile = (req, res )=>{
    const id_user = req.session.passport.user.id;
    var users = JSON.parse(localStorage.getItem('users'));
    let user = users[id_user];
    console.log(user);
    res.render('editProfile',{user:user});
};
controller.saveProfile = (req, res ) => {
    var users = JSON.parse(localStorage.getItem('users'));
    let {username, password, email ,user_id} = req.body;

    users[user_id] = {"user_id":user_id,"username":username,"password":password, 'email':email};
    localStorage['users'] = JSON.stringify(users);
    res.redirect('/');
}

controller.saveContact = (req, res ) => {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    const {name, lastName, email, number} = req.body;
    const idContact = Date.now();
    const id_user = req.session.passport.user.id;
    if(contacts==null){

        let simpleContact = {'111111':{"contact_id":idContact,"name":name,"lastName":lastName, "email":email, "number":number,"id_user":id_user}};
        console.log(simpleContact); 
        localStorage['contacts'] = JSON.stringify(simpleContact); 
    }else{
        contacts[idContact] = {"contact_id":idContact,"name":name,"lastName":lastName, "email":email, "number":number, "id_user":id_user};
        localStorage['contacts'] = JSON.stringify(contacts);
    }
    // Send email whith nodemailer
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'anthonytestmails@gmail.com',
                   pass: 'testmails003.'
               }
           });
           const mailOptions = {
            from: 'anthonytestmails@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Contact List System', // Subject line
            html: '<p>We added you in our contact list. Thank you.</p>'// plain text body
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    res.redirect('/');
}
controller.deleContact = (req, res ) => {
    let idDelete = req.params.id;
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts[idDelete] = undefined;
    localStorage['contacts'] = JSON.stringify(contacts);
    console.log(contacts);
    // var filterContacts = contacts.filter(contacts[])
    res.redirect('/');
}
controller.editContact = (req, res) => {
    let id = req.params.id;
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    const contact = contacts[id];
    res.render('editContact',{contact:contact});
    
}
controller.updateContact = (req, res) => {
    let {name, lastName, email, number,contact_id} = req.body;
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts[contact_id] = {"contact_id":contact_id,"name":name,"lastName":lastName, "email":email, "number":number,"id_user":req.session.passport.user.id};
    localStorage['contacts'] = JSON.stringify(contacts);
    res.redirect('/');
}
controller.recoveryPassword = (req, res ) => {
    res.render('recovery');
}
controller.sendEmailRecoveryPassword = (req, res ) => {
    let {email} =  req.body;
    var users = JSON.parse(localStorage.getItem('users'));

    for (const key in users) {
        const element = users[key];
        if(element['email'] === email){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'anthonytestmails@gmail.com',
                       pass: 'testmails003.'
                   }
               });
               const mailOptions = {
                from: 'anthonytestmails@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Contact List System', // Subject line
                html: '<p>Your password is:'+element['password']+'</p>'// plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
             });
        }
    }
    res.redirect('/');
}
module.exports = controller; 