// ==UserScript==
// @name			Add Google Analytics Profile Name To Page Title
// @namespace		gaProfileInTitle
// @include			https://www.google.com/analytics/*
// @match			https://www.google.com/analytics/*
// @datecreated		2009-10-30
// @lastupdated		2009-10-30
// @version			0.1
// @author			Erik Vergobbi Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will add the Google Analytics profile name to the page title and remove "Google Analytics" from the page title.
// ==/UserScript==
(function(){
	var p_=document.getElementById("profile");
	if(!p_) return;
	var p=p_.options[p_.selectedIndex].innerHTML.replace(/^\s+/i,"").replace(/\s+$/i,"");
	var i=0,t=document.title.split(" - ");
	for(;i<t.length;i++) if(t[i].match(/Google Analytics/i)) break;
	if(i<t.length) t.splice(i,1);
	if(p.match(/Click to select Website Profile/i)) return document.title=t.join(" - ");
	t.splice(1,0,p);
	t=t.join(" - ");
	document.title=t;
})();