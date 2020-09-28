function shareTw(linkPage){
    window.open('https://twitter.com/share?url=' + linkPage, 'twitter-popup', 'height=350,width=600');
    if(twitterWindow.focus) { twitterWindow.focus(); }
    return false;
}

function shareFb(linkPage){
    var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + linkPage, 'facebook-popup', 'height=350,width=600');
    if(facebookWindow.focus) { facebookWindow.focus(); }
      return false;
}

//Variables
var viewTitle;
var viewDes;
var viewDate;
var viewLink;
var viewip;
var hashId = window.location.hash.substr(1);
var Exlink;
var Comments;


//Doc ready function
$(document).ready(function () {
    _getDataAsync();
    if(window.location.search === '?=com_open=true'){
        openComment();
    }
    
});

//Get data async
function _getDataAsync() {

    firebase.database().ref('stories/' + hashId).on('value', function (snapshot) {

        viewTitle = snapshot.val().Title;
        viewDes = snapshot.val().Description;
        viewDate = snapshot.val().Date;
        viewip = snapshot.val().Ip;
        Exlink = snapshot.val().Link;
        Comments = snapshot.val().Comment;
        assignViewContent();
    });
}

//Assign content
function assignViewContent(){
    document.getElementById('view-title').textContent = viewTitle;
    document.getElementById('view-description').innerHTML = viewDes;
    document.getElementById('view-date').textContent = viewDate;
    document.getElementById('remix').href = 'write.html?=' + viewTitle + "&split&" + viewDes;
    document.getElementById('comment-js').innerHTML= Comments;
    console.log("This article was made from " + viewip);

    if(document.getElementById('view-description').innerHTML === "undefined"){
        window.replace('404.html')
    }
    else{}

    document.getElementById('sp').style = "visibility: hidden; opacity: 0;";
}
