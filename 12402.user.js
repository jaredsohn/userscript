// ==UserScript==
// @name           CollegeHumor Comment Expander
// @namespace      *collegehumor.com*
// @description    Expands comments automatically.
// @include        *collegehumor.com/picture*
// @include        *collegehumor.com/article*
// @include        *collegehumor.com/video*
// ==/UserScript==
//version 0.75 (arbitrary, yes. But I'm the programmer, I make the rules.)
//improvements: Should be WAY faster. Grabbing from a pool of tags about 1/3rd the size. 
//improvements: Also, I got rid of a senseless secondary loop. 

//Just grabs a list of every span, regex's them to find the ones used to hold expansion links, and calls that toggle function from the id included in that tag. 
window.setTimeout(function(){
var spans = [];
var comment_ids = [];
spans = document.getElementsByTagName('span');
expand_finder = /show_replies_link_[0-9]/;
regsplitter = /[0-9]+/;
for each (span in spans) { 
	if(expand_finder.test(span.id)) {
		comment_id = regsplitter.exec(span.id);
unsafeWindow.toggleReplies('comment_'+comment_id,comment_id,'true', false, 0);
	}
}
},5);