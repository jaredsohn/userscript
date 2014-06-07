// ==UserScript==
// @name           UserDing(V4)
// @namespace      help
// @description    makes a ding when someone mentions your name at help.com/chat
// @include        http://help.com/chat
// ==/UserScript==

var AlternateName = "alternatename"; // modify this to add another alternate name.

// please note that if you have adblock or adblock plus turned on, you will need to do the following, or it may effect performance.
//go to tools>adblock plus/adblock>options> and make sure that show tabs on flash and java is turned off.

if (GM_getValue("MatchName", "")=="")
{ 
var Namex = prompt("Enter the name to match.  additional names can be added by editing the source code.  press home on this page anywhere to reset this variable.","nameToAlertOn");
GM_setValue("MatchName", Namex);
};

var Name1 = '\\b'+GM_getValue( "MatchName", "allcall")+'|allcall|'+AlternateName+'\\b';
var stringnote = new RegExp(Name1, "i");
var curtime = 0;

var player = document.createElement('div');
player.setAttribute('id','player');
document.body.appendChild(player);
player.appendChild(document.createElement('div')); // just so it has a child
player.style.visibility='hidden';

targetElement = window.document;

targetElement.addEventListener("keyup", function(e) { var unicode=e.keyCode? e.keyCode : e.charCode; if(unicode==36){Name1 = prompt("Enter the name to match",GM_getValue( "MatchName", "allcall")); GM_setValue("MatchName", Name1); Name1 = GM_getValue( "MatchName", "allcall"); };}, false);

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