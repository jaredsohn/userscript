// ==UserScript==
// @name           Help.com UserDing(V3)
// @namespace      help
// @description    makes a ding when someone mentions your name in help.com/chat
// @include        http://help.com/chat
// ==/UserScript==


// please note that if you have adblock or adblock plus turned on, you will need to do the following, or it may effect performance.
//go to tools>adblock plus/adblock>options> and make sure that show tabs on flash and java is turned off.

var stringnote = /\ballcall|enternamehere|alternatenamehere\b/i; // this is a regex.  the /i makes it case insensitive
var curtime = 0;

var player = document.createElement('div');
player.setAttribute('id','player');
document.body.appendChild(player);
player.appendChild(document.createElement('div')); // just so it has a child
player.style.visibility='hidden';


setInterval(function(){
var x = document.getElementsByTagName('div');
for(var y = 0; y < x.length; y++){
    if(x[y].getAttribute('class')=='chat-message' && x[y].hasChildNodes()){
	var q = x[y].parentNode.parentNode;
	var time = parseInt(q.getAttribute('id').substring(8));
	if(time >= curtime){
	    var node;
	    for(var i = 0; i < x[y].childNodes.length; i++){
		node = x[y].childNodes[i];
		if(node.nodeName == '#text'){
		    if(time > curtime){
			if(node.nodeValue.match(stringnote)){
			    player.removeChild(player.firstChild);
			    var sound = document.createElement('embed');
			    sound.setAttribute('src','http://simplythebest.net/sounds/MP3/sound_effects_MP3/sound_effect_MP3_files/bang_1.mp3');
			    sound.setAttribute('autostart','true');
			    sound.setAttribute('loop','false');
			    player.appendChild(sound);
			    //	alert('Your name is called');
			}
		    }
		    else if(time == curtime && node.nodeValue.match(stringnote)){
			x[y].parentNode.parentNode.setAttribute('style','background-color:#bbbbff');
		    }
		}
	    }
	    curtime = time;
	}
    }
}
}, 1000);