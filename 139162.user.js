// ==UserScript==
// @name           FB Share Hotkey [Ctrl+Space] {by anonwins}
// @description    Share the current page on facebook, just by pressing ctrl+space!
// @namespace      http://www.grechan.com/userscripts?name=fbsharehotkey
// @author         anonwins (http://www.facebook.com/anonwins) 
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        0.1
// @include        http://*
// @include        https://*
// @history        0.1 first version, works fine.
// ==/UserScript==

var isCtrl = false
document.onkeyup=function(e){
	if(e.which == 17) { isCtrl=false }
}
document.onkeydown=function(e){
	if(e.which == 17) { isCtrl=true }
	if(e.which == 32 && isCtrl) {
		window.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href),'FBShare','height=450,width=670')
		return false
	}
}