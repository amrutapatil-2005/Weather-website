const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const port=8000;

//public satic path 
const staticpath=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../src/templates/views")
app.use(express.static(staticpath));
const partials_path=path.join(__dirname,"../src/templates/partials")

app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);


app.get("/home",(req,res)=>{
  res.render('index');
});
app.get("/about",(req,res)=>{
  res.render('about');
});
app.get("/weather",(req,res)=>{
  res.render('weather');
});

app.get("*",(req,res)=>{
  res.render('404error',{
    errormsg:'Oops!Page Not found'

  });
});
app.listen(port,()=>{
  console.log(`hello listening on 8000`);

})