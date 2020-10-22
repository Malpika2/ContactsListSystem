const controller = {};
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
controller.list = (req, res ) =>{
    res.render('homepage',{message:''});
};


controller.signup = (req, res) => {
    // Save register into localStorage

    for(var key in localStorage){
        console.log(key);
    }
    let {username,password } = req.body;
    let idUser = Date.now();
    let value = JSON.parse(localStorage.getItem('users'));
    value[idUser] = {"user_id":idUser,"username":username,"password":password};
    localStorage['users'] = JSON.stringify(value);
    console.log(req.body);

    res.render('login',{message:'Register successful',type:'success'});
}


controller.login = (req, res ) => {
   
    res.render('login',{message:'User or password invalid',type:'danger'});
}



controller.update = (req, res )=>{
    res.send('save');
};

module.exports = controller; 