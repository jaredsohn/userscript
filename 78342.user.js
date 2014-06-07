// ==UserScript==
// @name           Switch to hard setting
// @namespace      GLB
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function convert(){
	for(var i=0,j=ids.length; i<j; i++) {
		var url = 'http://goallineblitz.com/game/player_tactics.pl?player_id=' +ids[i]+ '&play_intensity=hard&action=Update'
		setTactics(url)
	}
	alert('Done, with only ' +ids.length+ " pagehits...kill the site why don't ya?")
}

function setTactics(url1) {
	GM_xmlhttpRequest({
	method: 'GET',
	url: url1,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
}

var playernames = getElementsByClassName('player_name', document)
var playernames = getElementsByClassName('player_name', document)
var ids = new Array()
for(var i=0,j=playernames.length; i<j; i++) {
	ids[i] = playernames[i].href.split('player_id=', 2)[1]
}

var playerheading = getElementsByClassName('medium_head', document)[2]
var button = document.createElement('input')
button.setAttribute('type', 'button')
button.setAttribute('value', 'Convert players to Hard intensity')
button.addEventListener('click', convert, false)
playerheading.appendChild(button)