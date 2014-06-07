// ==UserScript==
// @name           Newgrounds Mod/God Me
// @namespace      mod_god_me@snakehole.net
// @description    Become a Mod or God
// @include        http://*.newgrounds.com/*
// @exclude        http://*.newgrounds.com/audio/listen/*
// @exclude        http://*.newgrounds.com/portal/view/*
// ==/UserScript==

// In previous versions you would need to edit this script.
// Now use the Newgrounds Mod/God Me Setup user script command of the Greasemonkey menu.



var me=GM_getValue("StormyJet");
var mode=GM_getValue("mode","true");
var links = document.getElementsByTagName('a');

var userpage=me.toLowerCase() +'.newgrounds';
var match=document.location.href.match(userpage);

function modOrGod(mode) {
	if (mode==true){
		for (i=0; i<links.length; i++) {
			if (links[i].innerHTML.match(me) != null ){
				if (links[i].parentNode.className == 'dotted' || links[i].parentNode.className == 'dottedtall'){
					links[i].className = "moderator";
				}
			}
		}
		var re=/[NDLEF].gif/; // set regexp
		for (i=0; i<document.images.length; i++) { // loop through images
			if (document.images[i].alt==me){
				document.images[i].src=document.images[i].src.replace(re, 'G.gif'); // replace with mod aura
			}
	}
// replace userpage level icon
	if(match == userpage){
		document.getElementById('ulevel').style.backgroundImage=document.getElementById('ulevel').style.backgroundImage.replace(re, 'G.gif');
		}
	}
	if (mode==false){
		stats = document.getElementsByClassName('userstats');
	for (i=0; i<stats.length; i++) {
		if (stats[i].getElementsByTagName('img')[0].alt==me){
			stats[i].getElementsByTagName('img')[0].src='http://licon.ngfiles.com/ng_god.gif';
			stats[i].innerHTML=stats[i].innerHTML.replace(/(<a href="\/lit\/faq#upa_rank">LEVEL)(.*)(<\/a>)/, '<a href="/lit/faq#upa_rank">LEVEL 60</a>');
		}
	}
// replace userpage level icon
	if(match == userpage){
		document.getElementById('ulevel').style.backgroundImage="url(http://licon.ngfiles.com/ng_god.gif)";
		document.getElementById('ulevel').innerHTML=document.getElementById('ulevel').innerHTML.replace(/(<a href="http:\/\/www.newgrounds.com\/lit\/faq#upa_level">Level<\/a>: <strong>)(.*)(<\/strong>)/, '<a href="http://www.newgrounds.com/lit/faq#upa_level">Level</a>: <strong>60</strong>');
		}
	}
}

GM_registerMenuCommand("Newgrounds Mod/God Me Setup", function() {
var setMe = prompt('Mod/God Me Setup:\nWhat is your Newgrounds user name? Leave blank to skip');
if(setMe != ""){
GM_setValue("me", setMe);
}
var setMode = confirm('Mod/God Me Setup:\nWhat mode do you want Mod/God to be? Ok= Mod, Cancel = God.');
GM_setValue("mode", setMode);
});

modOrGod(mode);