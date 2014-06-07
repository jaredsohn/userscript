// ==UserScript==
// @name		Facepunch Toolkit
// @namespace	http://facepunch.com
// @author		Elysian
// @license		http://creativecommons.org/licenses/by-sa/3.0/
// @description	Collection of Facepunch additions/mini edits.
// @include		http://facepunch.com/*
// @include 	http://www.facepunch.com/*
// @version 	1.1
// ==/UserScript==

/* ---------------------------------------------------------
						GET UID
----------------------------------------------------------*/

var uid = document.getElementById('navbar-login').getElementsByTagName('strong')[0].parentNode.href.split("u=")[1];

/* ----------------------------------------------------------
						FUNCTIONS
-----------------------------------------------------------*/
function addJavascript(jsname,pos) {
	var th = document.getElementsByTagName(pos)[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null
}
/* ---------------------------------------------------------
					COOKIE MAGIC
----------------------------------------------------------*/

var cookie = readCookie(uid);
if(cookie){ var settings = cookie.split(","); }
else {
	addJavascript("http://pdo.elementfx.com/fp/getsettings.php?uid="+uid, "body");
}
if(location.href.match('cookie=1')){
	addJavascript("http://pdo.elementfx.com/fp/getsettings.php?uid="+uid, "body");
}

/* ---------------------------------------------------------
					SETTINGS PANEL
----------------------------------------------------------*/

document.getElementsByClassName('buttons')[0].innerHTML += '</a><a href="http://pdo.elementfx.com/fp/settings.php?uid='+uid+'" target="_blank"><img src="http://pdo.elementfx.com/fp/options.gif" alt="Facepunch Toolkit Options" title="Facepunch Toolkit Options"/></a>';


/* ---------------------------------------------------------
					ACTUAL CHANGES
----------------------------------------------------------*/

if( document.getElementsByClassName('navbit').length == 0 ){//Index page
	if(settings[0]=="true"){
		var forumviewers = document.getElementsByClassName( "viewing" );
		for(v=0;v<forumviewers.length;v++){
			forumviewers[v].style.display = 'none';
		}
	}
	if(settings[1]=="true"){
		var subforums = document.getElementsByClassName( "subforumlist" );
		for(q=0;q<subforums.length;q++){
			subforums[q].style.display = 'none';
		}
	}
	if(settings[2]=="true"){
		document.getElementById('cat407').style.display='none';
	}
	if(settings[3]=="true"){
		document.getElementById('cat197').style.display='none';
	}
	if(settings[4]=="true"){
		var des = document.getElementsByClassName( "forumdescription" );
		for(d=0; d<des.length; d++){
			des[d].style.display = 'none';
		}
	}
	if(settings[5]=="true"){
		var alts = document.getElementsByClassName( "forumlastpost" );
		for(a=0; a<alts.length; a++){
			if(a%2==1){
				alts[a].style.background = settings[6];
				alts[parseInt(a-1)].style.background = settings[7];
			}
		}
	}
}

if(location.href.match('showthread.php')){
	if(settings[8]=="true"){
		var ignore = document.getElementsByClassName( "postbitignored" );
		for(i=0;i<ignore.length;i++){
			ignore[i].style.display='none';
		}
	}
	if(settings[9]=="true"){
		document.getElementById('qr_defaultcontainer').style.display ='none';
	}
}

/* FORUM VIEW */

if(location.href.match('forumdisplay.php')){
	if(settings[10]=="true"){
		var posticons = document.getElementsByClassName( "threadicon" );
		var threads = document.getElementsByClassName( "threadtitle" );
		for(p=0;p<posticons.length;p++){
			if(posticons[p].innerHTML.match('NSFW')){
				var a = threads[parseInt(p-1)].innerHTML;
				threads[parseInt(p-1)].innerHTML = '<b>[NSFW]</b> '+a;
			}
			posticons[p].style.display = 'none';
		}
	}
	if(settings[11]=="true"){
		var threadratings = document.getElementsByClassName( "threadratings" );
		for(r=0;r<threadratings.length;r++){
			threadratings[r].style.display = 'none';
		}
	}
}

