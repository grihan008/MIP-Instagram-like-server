var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 80));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

// Simple hello world route
app.get('/', function(req, res) {
    res.send("Hello world");
});

var users = [{
            id: "fx34d",
            username: "user",
            password: "pass",
            fullName: "Donald Trump",
            profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg",
            postCount: 13,
            followers: 52,
            following: 2,
            activity: [
                {
                    userId: 2,
                    username: "POTUS",
                    fullName: "President of United States",
                    profileImageSmall: "https://pbs.twimg.com/profile_images/738744285101580288/OUoCVEXG.jpg",
                    type: "commented",
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    userId: 3,
                    username: "HillaryC",
                    fullName: "Hillary Clinton",
                    profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg",
                    type: "liked",
                    comment: "",
                    userRefs: [],
                    tags: []
                }
            ]
        }
    ];

var posts = [
        {
            id: 0,
            user: {
                id: 1,
                username: "dtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg" 
            },                                                 
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892, 
            caption: "Always winning #elections",
            tags: ['elections'],         
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "POTUS"
                    },                    
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "HillaryC"
                    },                    
                    comment: "Damn right @POTUS",
                    userRefs: ["POTUS"],
                    tags: []       
                },
            ]

        }
    ]

app.post('/login', function(req,res){
    console.log("test");
    console.log(req.body);
    var u = users.find(function(element){
         return (element.username === req.body.username) && (element.password === req.body.password);        
    });

    if(u !== undefined)
    {
        return res.json(u);
    }
    else
    {
        return res.sendStatus(401);
    }
});

app.post('/addUser', function(req,res){
    var length = users.push({
        id:"sda",
        username: req.body.username,
        password: req.body.password,
        fullName: "Dude",
        profileImageSmall: "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png"
    });
    if (users[length-1].username==req.body.username){
        return res.json(res.json(users[length-1]));
    }
    else{
        return res.sendStatus(401);
    }
});

app.get('/posts/relevant', function(req, res) {
    res.json(posts);
});

app.get('/posts/:id', function(req, res) {    
    res.json(posts[req.params.id]);
});

// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
