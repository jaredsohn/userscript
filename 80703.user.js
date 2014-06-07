// ==UserScript==
// @name           test
// @namespace      *inci.sozlukspot.com*
// @description    test
// @include        *inci.sozlukspot.com/w/*
// ==/UserScript==
//version 1

//Just grabs a list of every span, regex's them to find the ones used to hold expansion links, and calls that toggle function from the id included in that tag. 
window.setTimeout(function(){
var spans = [];
var comment_ids = [];
spans = document.getElementsByTagName('span');
expand_finder = /[0-9]/;
regsplitter = /[0-9]+/;
for each (span in spans) { 
	if(expand_finder.test(span.id)) {
		comment_id = regsplitter.exec(span.id);
unsafeWindow.toggleReplies('comment_'+comment_id,comment_id,'true', false, 0);
	}
}
},5);