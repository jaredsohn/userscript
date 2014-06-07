// ==UserScript==
// @name           Redbox - Show Titles
// @include        http://www.redbox.com/movies*
// ==/UserScript==

// how do I make sure it finishes loading jquery first?

$('div.box-wrapper').css({'margin-bottom':'72px','text-align':'center','font-weight':'bold'}).each( function(i){ $(this).append($(this).attr("name")); });