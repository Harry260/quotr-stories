//Variables
var _storyId;
var _title;
var _description;
var _link;
var _date;
var _ip;
var _status;
var _list;
const d = new Date();

//On load function
$(document).ready(function () {
    _getNext();
    _getStories();
    SearchReset();
});

//Get random id
function _getNext() {
    firebase.database().ref('stories').once('value', function (snapshot) {
        _storyId = Math.floor((Math.random() * snapshot.numChildren()) + 1);
        _getAsync();
        console.log(_storyId);
    });

}

//Get data from db
function _getAsync() {

    firebase.database().ref('stories/' + _storyId).on('value', function (snapshot) {
        _title = snapshot.val().Title;
        _description = snapshot.val().Description;
        _date = snapshot.val().Date;
        _ip = snapshot.val().Ip;
        _status = snapshot.val().Status;
        _link = snapshot.val().FullLink;
        assignContent();
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    var finalstory = array.join(" ");
    document.getElementById('stories-js').innerHTML = finalstory.replace(/<!--attr-space-->/g, 'data-aos="fade-up"data-aos-anchor-placement="center-bottom"');
    AOS.init();
    SearchFor();
}

function _getStories() {

    firebase.database().ref('list').on('value', function (snapshot) {
        shuffle(snapshot.val().home_list.split('<!--Shuffle gap-->'));
    });
}

///Setting final values to elements
function assignContent() {
    document.getElementById('title').textContent = _title;
    document.getElementById('sub-txt').textContent = _description;
    document.getElementById('more-link').href = _link;
    document.getElementById('nav-control-home').style ='visibility:visible; opacity:1;';
    document.getElementById('more-link-sub').style ='visibility:visible; opacity:1;';
    document.getElementById('comment-preload').href = "quote.html?=com_open=true#" + _storyId;
    document.getElementById('more-link-sub').href = _link;
}

