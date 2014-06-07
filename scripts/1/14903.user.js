// ==UserScript==
// @name		bluebottle Hide Ads
// @description	Removes ads from the bluebottle.com webmail interface
// @include		http://mail.bluebottle.com/webmail/*
// ==/UserScript==

var i;
for (i = 0; i < (document.getElementsByTagName("a").length); i++){
	if (document.getElementsByTagName("a")[i].innerHTML == "Hide ads"){
		eval(document.getElementsByTagName("a")[i].href);
	}
}

function $(id) {
  return document.getElementById(id);
}

var theta = 0;
function hideId(id) {
	theta = theta + 0.3;
	opacity = (Math.cos(theta)+1)/2;
	if (theta < Math.PI) {
		$(id).style.opacity = opacity;
		if ($('messagecontent')) {
			$('messagecontent').style.width = (600+(1-opacity)*200)+"px";
		}
		setTimeout('hideId("'+id+'")',50);
	}
	else {
		if ($('messagecontent')) {
			$('messagecontent').style.width = '800px';
		}
		$(id).style.display = 'none';
	}
}