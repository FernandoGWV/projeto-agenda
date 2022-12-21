

exports.meuMiddleWare =  (req, res, next) => {
res.locals.errors = req.flash('errors')
res.locals.sucess = req.flash('sucess')
res.locals.user = req.session.user
next()
}

exports.checkCsrfError = (err,req, res, next) =>{
  if (err  ) {
return res.send('BAD CSRF')
  }
next()
}

exports.csfrMiddleware = (req, res, next) =>{
  res.locals.csrfToken = req.csrfToken()
  next()
} 

exports.loginRequired = (req,res , next) =>{
  if(!req.session.user){
    req.flash('errors', 'você precisa fazer login.')
    req.session.save(() =>{
      res.redirect('/')
    })
    return

  }
  next()
}