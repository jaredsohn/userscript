// ==UserScript==
// @name           Stellar Saviour
// @namespace      http://rhyley.org/gm/
// @description    Hides posts from selected authors
// @include        http://stellar.io/*
// ==/UserScript==



(function(d){

function needstobesaved(theStr){
  // place the display names of users you want to block here
  // example: blackList = new Array('John Smith','Jane Doe');
  var blackList = new Array('Merlin Mann','Horse ebooks');
  var blacklisted = false;
  
  for(var i=0;i<=blackList.length;i++) {
      var blackWord = ''+blackList[i];
      if(theStr.toLowerCase().indexOf(blackWord.toLowerCase())>=0) {
        blacklisted = true;
      }
  }
  return blacklisted;
}

var metaPosts = document.getElementsByClassName('meta');
var last_check = 0;

function check_for_saving() { 
	for (var i=last_check;i<metaPosts.length;i++) {
		// yes, this is gross
		var savedfrom = needstobesaved(metaPosts[i].getElementsByTagName('a')[0].innerHTML);
		if (savedfrom) {
			metaPosts[i].parentNode.parentNode.removeChild(metaPosts[i].parentNode.previousSibling.previousSibling);
			metaPosts[i].parentNode.parentNode.removeChild(metaPosts[i].parentNode.previousSibling);
			metaPosts[i].parentNode.parentNode.removeChild(metaPosts[i].parentNode.nextSibling);
			metaPosts[i].parentNode.parentNode.removeChild(metaPosts[i].parentNode);
		}
	}
	last_check = metaPosts.length;
}
setInterval(check_for_saving, 200);
}(document));