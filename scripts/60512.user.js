// ==UserScript==
// @name           Lavendar
// @namespace      GLB
// @include        http://goallineblitz.com/*
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

var teams = getElementsByClassName('team_secondary_color', document)
for(var i=0,j=teams.length; i<j; i++) {
	var test = teams[i].getAttribute('src')
	if (test == '../images/game/design/team_cards/secondary_lavender.png') {
		teams[i].setAttribute('src', '../images/game/design/team_cards/secondary_lavendar.png')
	}
}