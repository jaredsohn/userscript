// ==UserScript==
// @name           Kingdom of Loathing Menubar Link - kbay
// @namespace      http://forums.kingdomofloathing.com/vb/member.php?u=111934
// @description    Adds a link to kbay in the KoL menubar. Designed for full mode only. Based loosely on SomeStranger's Useful Toplinks script.
// @include        *kingdomofloathing.com/topmenu.php*
// @include        *127.0.0.1:60080/topmenu.php*
// ==/UserScript==

function GM_post( dest, vars, callback ) {
			 GM_xmlhttpRequest({
			    method: 'POST',
			    url: 'http://'+document.location.host + dest,
			    headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: vars,
					onload:function(details) {
						if( typeof callback=='function' ){
							callback( details.responseText);
						}
				}
	});
}
function GM_get(dest, callback) {
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://'+ document.location.hostname + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}
function goSomewhere(location) {
	top.frames[2].document.location = location;
}
function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
addGlobalStyle(<r><![CDATA[
	#link {
			margin-left:.4em;
			font-size:7pt;
			text-decoration:underline;
			cursor:pointer;
		}
	#rlink {
			margin-left:.5em;
			font-size:7pt;
			text-decoration:underline;
			cursor:pointer;
		}
	]]></r>.toString());

function createLink(t,n,c,l,css) {
	var newLink = document.createElement('span');
	with (newLink) {
		title=t;
		appendChild(document.createTextNode(n));
		newLink.id=css;
		addEventListener('click',c,true);
	}
	links[l].parentNode.insertBefore(newLink, links[l].nextSibling);
}
	
var links = document.getElementsByTagName('a');

createLink("Go to kbay","kbay",function() { goSomewhere("http://kbay.turias.net");},5,"link");