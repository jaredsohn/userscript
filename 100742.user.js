// ==UserScript==
// @name           Shacknews Youtube Post Remover
// @namespace      http://userscripts.org/users/72838
// @description    test
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include        http://www.shacknews.com/chatty*
// @match		   http://www.shacknews.com/chatty*
// ==/UserScript==

// Remove youtube posts
$('.oneline_body:contains(youtube.com), .postbody:contains(youtube.com)').closest('li').empty().remove();

// Bindings for N-FINITE Shack
document.addEventListener('DOMNodeInserted', function(e) {
	var node = e.relatedNode;
	$(node).find('.oneline_body:contains(youtube.com), .postbody:contains(youtube.com)').closest('li').empty().remove();
}, false);