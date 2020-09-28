//Variables
var no;
var date;
var ip;
let title;
let description;
var stat;
var id;
var link = "#";
var storyLink;
const d = new Date();
const defData = window.location.search.substr(2).split('&split&');
var rec_list;
var new_story_list;

//get month in letter
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

$(document).ready(function () {
    document.getElementById("write-title").textContent = defData[0].replace(/%20/g, " ");
    document.getElementById('write-description').value = defData[1].replace(/%20/g, " "); 
});

//get client ip
$.getJSON("https://api.ipify.org/?format=json", function(e) {
    ip = e.ip;
});


//get value to set id of new story
function _getId(){

    firebase.database().ref('stories').once('value', function(snapshot) { 
        no = snapshot.numChildren() + 1;
        _assign();
    });
}

//Assign value to each variable
function _assign(){
    id = no;
    title = document.getElementById("write-title").textContent;
    description = document.getElementById('write-description').value;
    link = document.getElementById("link-text").value;
    stat = 1;
    storyLink = "quote.html#" + no;
    date = d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();

    if(description !== ''){
        _write(); 
    }
    else{
        alert("Hey! Give a catchy description that explains your idea!");
    }
}


//function - on click (publish)
document.getElementById('goPublish').onclick = function(){
    _getId();
}


//firebase write function
function _write(){

    if(title !== ''){
        
        document.getElementById('progress-overlay').style = "  visibility: visible;   opacity: 1;";
        firebase.database().ref('stories/' + id ).set({
            Title:title,
            Description:description,
            Date:date,
            Ip:ip,
            Status:stat,
            Link:link,
            FullLink:storyLink,
            Comment: '<!--Comments goes here-->'
        });
        setlist();
    }
    else{
        alert('Woo..Give an awesome title like you!\n Because the title serves to attract attention');
    }
}


//Set list to add item
function setlist(){
    firebase.database().ref('list').once('value', function (snapshot) {
        rec_list = snapshot.val().home_list;
        new_story_list = '<div class="card-box"  <!--attr-space--> ><p class="card-date" >'+ date + '</p><h1 class="card-title">' + title + '</h1><p class="card-para" >' + description + '</p><a class="card-btn" href="' + storyLink + '">Read more</a></div>' + '<!--Shuffle gap-->' + rec_list;
        additem(new_story_list);
    });
}


//Push list
function additem(item){

    firebase.database().ref('list').update({
        home_list:item
    });
}
