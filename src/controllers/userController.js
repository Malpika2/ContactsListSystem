const controller = {};
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
controller.list = (req, res )=>{
    // If are not logged in

    res.render('login',{message:''});

    // If you are logged in
};
controller.signup = (req, res) => {
    for(var key in localStorage){
        console.log(key);
    }
    let {username,password } = req.body;
    let idUser = Date.now();
    let value = JSON.parse(localStorage.getItem('users'));
    value[idUser] = {"user_id":idUser,"username":username,"password":password};
    localStorage['users'] = JSON.stringify(value);
    console.log(req.body);

    res.redirect('/');
}
controller.login = (req, res ) => {
    let {username,password } = req.body;
    console.log(username, password);
    // Get values
    var users = JSON.parse(localStorage.getItem('users'));
    for (const key in users) {
        const element = users[key];
        if(element['username'] === username){
            if(element['password'] === password){
                res.redirect('/');
            }
        }
    }
    res.render('login',{message:'User or password invalid'});
}
controller.update = (req, res )=>{
    res.send('save');
};

module.exports = controller; 