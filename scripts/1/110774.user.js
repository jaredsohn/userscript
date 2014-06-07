// ==UserScript==
// @name        lalalala Rasmus never happened
// @description Disappears rasmus threads
// @include     http://interact.stltoday.com/forums/viewforum.php*
// @version     1
// ==/UserScript==


var badword = "rasmus|jay|cf|centerfield|scrabble|zep|dotel|edwin";
var titleregex = new RegExp('class=\"topictitle\"\>.*'+badword+'.*', 'i');
var tags = new Array();

function getElementByClass(theClass) {
  var tags = document.getElementsByTagName("*");
  for (i=0; i<tags.length; i++) {
    if (tags[i].className==theClass) {
      for (x=0; x<tags[i].rows.length; x++) {
        var indexOf = tags[i].rows[x].innerHTML.search(titleregex);
        if (indexOf >= 0) {
          tags[i].rows[x].style.display='none';
        }
      }
    }
  }
}

getElementByClass("forumline");