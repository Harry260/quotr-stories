var _html = '<!--html body code here-->\n<!--Paste or write the body code only! you can write the head codes in another page-->\n<h1>My page</h1>';
var _css = '/*css code here*/\n\n*{\npadding: 0;\nmargin: 0;\nbox-sizing: border-box;\n}';
var _js = '//JavaScript Code here';
var _head  = '<!--html head code here-->\n<meta name="viewport" content="width=device-width, initial-scale=1.0">';

var stat = 'h';

var codex;
function _init(){
    document.getElementById('code').value = _html;
}

function changeLang(){

    document.getElementById('addhtml').style = 'display:none';
    document.getElementById('addjs').style = 'display:none';
    document.getElementById('addcss').style = 'display:none';

    if(stat == 'h'){
        stat = 'hd';
        document.getElementById('s-t').textContent = '.html - head'
        document.getElementById('s-t').style.backgroundColor = '#0366d6';
        document.getElementById('code').value = _head;
    }
    else if (stat == 'hd'){
        stat = 'c';
        document.getElementById('s-t').textContent = '.css'
        document.getElementById('s-t').style.backgroundColor = '#violet';
        document.getElementById('code').value = _css;
        document.getElementById('addcss').style = 'display:block';

    }

    else if (stat == 'c'){
        stat = 'j';
        document.getElementById('s-t').textContent = '.js'
        document.getElementById('s-t').style.backgroundColor = '#26aa5a';
        document.getElementById('code').value = _js;
        document.getElementById('addjs').style = 'display:block';

    }

    else if(stat == 'j'){
        stat =  'h';
        document.getElementById('s-t').textContent = '.html - body'
        document.getElementById('s-t').style.backgroundColor = '#6a11cb';
        document.getElementById('code').value = _html;
        document.getElementById('addhtml').style = 'display:block';

    }

    else{}

}


function onCapture(){

    if(stat == 'h'){
        update('h');
    }
    else if(stat == 'c'){
        update('c');
    }
    else if(stat == 'hd'){
        update('hd');
    }
    else if(stat == 'j'){
        update('j');
    }
    else{}
    alert(stml + css + js + head);

}

//function lol(){ alert('lol');}

function update(lang){
    if(lang == 'c'){
        _css = document.getElementById('code').value;
    }
    else if(lang == 'h'){
        _html = document.getElementById('code').value;
    }
    else if(lang == 'hd'){
        _head = document.getElementById('code').value;
    }
    else if(lang == 'j'){
        _js = document.getElementById('code').value;
    }
    else{}

}

function setCode(){
    codex = '<!DOCTYPE html><html><head>' + _head +'<style>' + _css + '</style></head><body>' + _html + '<script>' + _js + '</script></body></html><!--Open source @ har.to-->'
    document.getElementById('rslt').innerHTML = codex;

    var g = document.createElement('script');
    var s = document.getElementsByTagName('script')[0];
    g.text = _js;
    s.parentNode.insertBefore(g, s);

}

function openPrev(){
    document.getElementById('rpane').style = 'opacity:1;visibility:visible;'
    document.getElementById('float-btn').style = 'opacity: 1;visibility: visible;transition: 0.4s;';
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        document.getElementById('rpane').style = 'opacity0; visibility:hidden;'
        document.getElementById('rslt').innerHTML = ' ';
        document.getElementById('float-btn').style = 'opacity: 0;visibility: hidden;transition: 0.4s';
    }
};


document.getElementById('inputhtml') .addEventListener('change', function() { 

    var fr = new FileReader();
    fr.onload=function(){ 

        if(stat == 'h'){
            _html = fr.result.split('<body>').pop().split('</body>'); 
            document.getElementById('code').value = _html;
        }
        else{
            _head = fr.result.split('<head>').pop().split('</head>')[0]; 
            document.getElementById('code').value = _head;
        }

        document.getElementById('code').style.height = "10px";
        document.getElementById('code').style.height = (document.getElementById('code').scrollHeight)+"px";
    } 
    fr.readAsText(this.files[0]); 

}) 

document.getElementById('inputcss') .addEventListener('change', function() { 

    var fr=new FileReader();
    fr.onload=function(){ 
        _css =fr.result; 
        document.getElementById('code').value = _css;

        document.getElementById('code').style.height = "10px";
        document.getElementById('code').style.height = (document.getElementById('code').scrollHeight)+"px";
    } 
    fr.readAsText(this.files[0]); 
    
}) 

document.getElementById('inputjs') .addEventListener('change', function() { 

    var fr=new FileReader();
    fr.onload=function(){ 
        _js =fr.result; 
        document.getElementById('code').value = _js;

        document.getElementById('code').style.height = "10px";
        document.getElementById('code').style.height = (document.getElementById('code').scrollHeight)+"px";
    } 
    fr.readAsText(this.files[0]); 
    
}) 
