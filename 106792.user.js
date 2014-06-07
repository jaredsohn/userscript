// ==UserScript==
// @name           twitter url expander
// @namespace      http://twitter.com/
// @description    Expand shorted url
// @include        http://twitter.com/
// ==/UserScript==

$('a.twitter-timeline-link').each(function(i,a){
$(a).attr('href', $(a).attr('title'));
a.innerHTML=$(a).attr('title');
});