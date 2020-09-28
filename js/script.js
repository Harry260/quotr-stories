//Share with twitter
var twitterShare = document.querySelector('[data-js="twitter-share"]');

twitterShare.onclick = function (e) {
  e.preventDefault();
  var twitterWindow = window.open('https://twitter.com/share?url=' + _link, 'twitter-popup', 'height=350,width=600');
  copyToClipboard(_link);
  if (twitterWindow.focus) { twitterWindow.focus(); }
  return false;
}

//Share with Facebook
var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function (e) {
  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + _link, 'facebook-popup', 'height=350,width=600');
  if (facebookWindow.focus) { facebookWindow.focus(); }
  return false;
}


//Report Article
function flag(type) {

  if (type == 'flaghome') {
    firebase.database().ref('flags/' + _storyId).set({
      StoryId: _storyId,
      Date: "Reported on : " + d.getDate() + ' ' + d.getMonth() + ' ' + d.getFullYear()
    });
  }
  else {
    firebase.database().ref('flags/' + window.location.hash.substr(1)).set({
      StoryId: window.location.hash,
      Date: "Reported on : " + d.getDate() + ' ' + d.getMonth() + ' ' + d.getFullYear()
    });
  }
}

//textarea autogrow
function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}



//Share from Viewer page

var twitterShare2 = document.querySelector('[data-js="twitter-share2"]');

twitterShare2.onclick = function (e) {
  e.preventDefault();
  var twitterWindow = window.open('https://twitter.com/share?url=' + "_link", 'twitter-popup', 'height=350,width=600');
  copyToClipboard("_link");
  if (twitterWindow.focus) { twitterWindow.focus(); }
  return false;
}

//Share with Facebook
var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function (e) {
  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + _link, 'facebook-popup', 'height=350,width=600');
  if (facebookWindow.focus) { facebookWindow.focus(); }
  return false;
}

//Close comment toggle
function closeComment() {
  document.getElementById('com-sec').style = "visibility: hidden; opacity: 0;";
}

function openComment() {
  document.getElementById('com-sec').style = "visibility: visible;   opacity: 1;";
}

function SearchFor(query) {
  var input, filter, cards, cardContainer, h5, title, i;
  input = document.getElementById("myFilter");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("stories-js");
  cards = cardContainer.getElementsByClassName("card-box");
  for (i = 0; i < cards.length; i++) {
      title = cards[i].querySelector("h1.card-title");
      if (title.innerText.toUpperCase().indexOf(filter) > -1) {
          cards[i].style.display = "";
      } else {
          cards[i].style.display = "none";
      }
  }
}

