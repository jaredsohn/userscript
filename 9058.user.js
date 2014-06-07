// ==UserScript==
// @name          WikiLinkStyle
// @namespace     wp
// @version		  0.3
// @description   Style Unstyled Wiki Links
// @include       http://forums.whirlpool.net.au/forum-replies.cfm*
// @include       http://whirlpool.net.au/forum-replies.cfm*
// ==/UserScript==



 $ = unsafeWindow.jQuery; 
$("a.inter:contains('/wiki/?tag=')").each( function(){
    var wt = $(this);
    wt.attr('class', 'wiki');
    var t = wt.text()
    wt.text(t.replace( t, t.split('/wiki/?tag=')[1] ));
 });


