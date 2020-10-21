const controller = {};

controller.list = (req, res )=>{
    // Store
    
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    //   localStorage.clear();
      const value = {
          name:'pablo',
          lastname:'hernsand'
      }

    //   localStorage.setItem('user1', JSON.stringify(value));
      console.log(localStorage.length);
      for(var  i=0; i < localStorage.length; i++){
        console.log(localStorage.getItem(localStorage.key(i)));
      }
    // localStorage.setItem('myFirstKey', JSON.stringify(value));
    // console.log(localStorage.getItem('myFirstKey'));

    // res.send('list');
    res.render('usuarios'); 
};
controller.save = (req, res )=>{
    res.send('save');
};
controller.delete = (req, res )=>{
    res.send('delete');
};

module.exports = controller; 