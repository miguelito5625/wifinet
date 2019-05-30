const appController = {};


appController.error404 = (req, res, next) => {

    res.status(404).render('404/index');
  
  };

  appController.indexPage = (req, res) => {

    res.render('index');
  
  }; 

module.exports = appController;