// ==UserScript==
// @name           Obsolete Post Filter
// @namespace      http://obsoleteguild.com/
// @description    GTFO
// @include        http://obsoleteguild.com/forums/viewtopic.php*
// ==/UserScript==

var getIgnoredOn = new Array();
getIgnoredOn.push('Rhythar');

var posts = document.getElementsByTagName('div');

for(var i=0; i<posts.length; i++){
     if(posts[i].getAttribute('class') && posts[i].getAttribute('class').indexOf('post ') != -1){
	var userbox = posts[i].getElementsByTagName('a');
	var gtfo = false;
	for(k=0; k<getIgnoredOn.length; k++){
	    if(userbox[4].innerHTML.indexOf(getIgnoredOn[k]) != -1){
		    gtfo = true; 
	    }
	}
	
	if(gtfo){
	    //posts[i].style.display = "none";
	    posts[i].getElementsByTagName('div')[2].innerHTML = "I am a gigantic faggot.";
	}
     }
}