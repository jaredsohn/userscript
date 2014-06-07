// ==UserScript==
// @name            /r/dota2 flair links
// @author          zedadex
// @namespace       steamcommunity.com/id/zedadex
// @description     Turns the flair on /r/dota2 into links, edited by reaverxai for /r/dota2.
// @license         Commons, CC-BY-SA
// @version	    1.1.2
// @include         http://reddit.com/r/dota2*
// @include         http://www.reddit.com/r/dota2*
// @include         http://www.reddit.com/r/Dota2*
// @include         http://www.reddit.com/r/DotA2*
// @include     /^http://www\.reddit\.com/r/DotA2.*$/*
// @released        2011-09-09
// @updated         2011-09-09
// @compatible      Greasemonkey, Chrome, Opera
// ==/UserScript==


(function(){

/*
	The "ultimate" GetElementsByClassName implementation, developed by Robert Nyman. This is here for Opera support.
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};



/*
     Start of actual code
*/

var flairArray = document.getElementsByClassName('flair');
for(i=0;i<flairArray.length;i++)
{
var steamURL = flairArray[i].innerHTML;
var steamID = steamURL.replace("http://steamcommunity.com/profiles/","")

/* BETA - grab user status from steamcommunity.com */

function updatePlayerStatus(steamID,i) {
playerStatus = "Profile";
GM_xmlhttpRequest({
  method: "GET",
  //synchronous: "TRUE",
  url: "http://steamcommunity.com/profiles/" + steamID,
  onload: function(response) {
    pageContents = response.responseText;
    pageContents = pageContents.substr(pageContents.search("OnlineStatus"),100);

     spanID = "player"+steamID+"_"+i;
     divIcon = document.getElementById(spanID).parentNode.parentNode;

     if (pageContents.search("currentlyPlaying")>0){playerStatus = "<span style='color:#8cb359;'>In-Game</span>";}
     if (pageContents.search("statusOnline")>0){playerStatus = "<span style='color:#86b5d9;'>Online</span>";}
     if (pageContents.search("statusOffline")>0){playerStatus = "<span style='color:#a6a4a1;'>Offline</span>";}

     document.getElementById(spanID).innerHTML=playerStatus;
    }
  });
return playerStatus;
}
dev="";
if (steamID=="76561198013620583") {dev = ", <a href='http://redd.it/kaucc'>Feedback</a>"}
flairArray[i].innerHTML = "<a href='" + steamURL + "'><span id='player"+steamID+"_"+i+"'>" + "Profile" + "</span></a> [<a title='Add (must have steam running)' href='steam://friends/add/" + steamID + "'>+</a>,<a title='Message (must have steam running)' href='steam://friends/message/" + steamID + "'>m</a>], "+ dev;
updatePlayerStatus(steamID,i);
}

})();