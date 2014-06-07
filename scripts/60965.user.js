// ==UserScript==
// @name		Better Mixx Create Niche Link
// @author		Erik Vold
// @datecreated	2009-10-31
// @lastupdated	2009-10-31
// @namespace	mixxGroupsCreateNiche
// @include		http://www.mixx.com/groups*
// @include		http://www.mixx.com/community
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will create a better 'create new niche' link
// ==/UserScript==

(function(){
	var m=document.evaluate("//*[@id='nav-secondary']/ul[1]",document,null,9,null).singleNodeValue;
	if(!m) return;
	var li=document.createElement("li");
	if (window.location.href.match(/^http:\/\/www.mixx.com\/community/)) {
		var c=document.evaluate(".//*[@class='current']",m,null,9,null).singleNodeValue;
		if(c) c.className="";
		li.className = 'current';
	}
	li.innerHTML='<a href="http://www.mixx.com/community">Create Your Niche Now!</a>';
	m.appendChild(li);

	var old=document.getElementsByClassName('create-community')[0];
	if(old) old.parentNode.removeChild(old);
})();