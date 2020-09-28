//Variables
var _innerHtml;
var _date;
var _title;
var _ip;


//Get Client Ip adress
$.getJSON("https://api.ipify.org/?format=json", function(e) {
    _ip = e.ip;
});

const d = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//alert(document.getElementById('proj-title').value);
$( "#publishgo" ).click(function() {
    var idgo = document.getElementById('ProjId').value;
    if(idgo != '' ){
        checkId(idgo.toLowerCase());
    }
    else{
       //checkId(document.getElementById('ProjId'));
       document.getElementById('statusAvilable').textContent = 'Id cannot be empty.';
       document.getElementById('statusAvilable').style.color ='pink';
    }
});


//Check id availability
function checkId(Checkid){
    _assignWriteVar();
    firebase.database().ref('pages/' + Checkid ).once('value', function(snapshot){
        try{
            console.log(snapshot.val().Ip + '**');
            document.getElementById('statusAvilable').textContent = Checkid + ' is not available.';
        }
        catch{
            document.getElementById('statusAvilable').textContent = 'Your super-cool id ( ' + Checkid +  ' ) is available!';
            _writeAsync(Checkid);
            writePrew();
        }
    });
}

function writePrew(){
    document.getElementById('statusAvilable').innerHTML = '<a style="color:white;cursor:pointer" target="_blank"  id="link-view" href="../page.html#' + document.getElementById('ProjId').value + '">View site.</a>'
    document.getElementById('link-view').click();
    document.getElementById('code-area').remove();
    document.getElementById('pub-lay').innerHTML = '<p class="tag-button" title="Copy link">Copy link</p> ';
    copyToClipboard(document.getElementById('link-view').href);

}

function closeSelf(){
    window.close();
}

//Assign Writable value
function _assignWriteVar(){
    document.getElementById('statusAvilable').style.color ='grey';
    _innerHtml = codex;
    _date = d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
    _title = document.getElementById('proj-title').value;
}


//Wriye writable data
function _writeAsync(id){
    //alert('TITLE:' + _title + ' , dATE:' + _date + ' , iD:' + _id + ' ,iP:' + _ip + ' ,HTML:' + _innerHtml);
    firebase.database().ref('pages/' + id).set({
        HtmlData:_innerHtml,
        Title:_title,
        Date:_date,
        Ip:_ip,
        Exjs:_js,
        Exhtml:_html,
        Excss:_css,
    });
}


function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}