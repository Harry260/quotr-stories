//Variable
var PageId = window.location.hash.substr(1).toLowerCase();

//Document load validation
$( document ).ready(function() {
    if(PageId != ''){
        loadData();
    }
    else{
        alert('null')
    }

});

//Load firebase Data

function loadData(){
    try{
        firebase.database().ref('pages/' + PageId ).once('value', function(snapshot){
            console.log('Created on:' +snapshot.val().Date + '; Logged Ip:' +snapshot.val().Ip + ';');
            document.getElementById('bX7rC3zL0qF1sI0iJhARRy5vR2xE5rR3dD6bB').innerHTML = snapshot.val().HtmlData;
            document.title = snapshot.val().Title;

            var g = document.createElement('script');
            var s = document.getElementsByTagName('script')[0];
            g.text = snapshot.val().Exjs;
            s.parentNode.insertBefore(g, s);
        });
    }
    catch(err){
        alert(err);
    }
}

