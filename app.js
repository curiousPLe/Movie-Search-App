var express = require("express");
var app = express();
var request = require("request");

// prepare server
app.use(express.static("public"));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static("node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use('/js', express.static("node_modules/jquery/dist")); // redirect JS jQuery
app.use('/css', express.static("node_modules/bootstrap/dist/css")); // redirect CSS bootstrap

app.set("view engine","ejs");

app.get("/",function(req,res){
     res.render("search");
});

app.get("/results",function(req,res){
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + req.query.searchKey;
    request(url, function(error,response,body){
        if (!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            res.render("results", {parsedData:parsedData});
        };
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS BEEN CONNECTED.")
})