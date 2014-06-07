// ==UserScript==
// @name		Userscripts.org Fancy Upload New Script Button
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-22
// @namespace	usoFancyUploadNewScriptBtn
// @include		http://userscripts.org/scripts?*
// @include		http://userscripts.org/scripts#*
// @include		http://userscripts.org/scripts
// @version		0.1.1
// @homepageURL http://userscripts.org/scripts/show/60320
// @description	This userscript will make add a 'upload new script' button to the userscripts.org script list.
// ==/UserScript==

(function(){
	var temp=document.getElementById("top_pagination");
	if(!temp) return;

	var a=document.createElement('a');
	a.className="awesome small orange";
	a.setAttribute('style','float: right;');
	a.href="/scripts/new";
	a.innerHTML="upload new script &raquo;";

	temp.parentNode.insertBefore(a,temp);
})();