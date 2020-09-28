//Variables
var rec;
var newHtml;


//enter trigger
$('#comment-txt').keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        setthings();
    }
});

function setthings(){
    firebase.database().ref('stories/' + hashId).once('value', function (snapshot) {
        rec = snapshot.val().Comment;
        newHtml = '<div class="comment-in"><p>' + document.getElementById('comment-txt').value +'</p></div>' + '<br>' + rec;
        write_comment();
    });
}



function write_comment(){

    firebase.database().ref('stories/' + hashId ).update({
        Comment:newHtml
    });
    document.getElementById('comment-js').innerHTML = newHtml;
}


