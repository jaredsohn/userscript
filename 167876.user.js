// ==UserScript==
// @name		Konachan: Main Page Tag Completion
// @namespace	Zolxys
// @description	Adds tag completion to the search box on the front page.
// @include	http://konachan.com/
// @include	http://konachan.net/
// @version	1.1
// ==/UserScript==
var f = String(function(){
new TagCompletionBox(document.getElementById('tags'));
if (TagCompletion)
	TagCompletion.observe_tag_changes_on_submit(document.getElementById('tags').up('form'), document.getElementById('tags'), null);
});
var ne = document.createElement('script');
ne.setAttribute('type','text/javascript');
ne.innerHTML=f.substring(f.indexOf('\n') + 1, f.lastIndexOf('}'));
document.head.appendChild(ne);
