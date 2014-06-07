// ==UserScript==
// @name           Force Reader
// @namespace      http://rubicore.com/projects/scripts
// @description    Skip Googles ig/reader question when adding feeds
// @include        http://www.google.com/ig/add?feedurl*
// @author         Jason Sypher
// ==/UserScript==
(function(){
	var body= document.getElementsByTagName("body")[0];
	var buttons = [];
	var regex = new RegExp('bt');
	var tags = body.getElementsByTagName("*");
	for(var i=0,j=tags.length; i<j; i++){
		if(regex.test(tags[i].className)) buttons.push(tags[i]);
	}
	if(buttons[1]) window.location=buttons[1].href;
	
})();
