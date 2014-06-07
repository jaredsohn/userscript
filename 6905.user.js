// ==UserScript==
// @name           Forum Redesign - ViewThread (Second page)
// @namespace      http://www.myspace.com
// @description    Additional Teaxt area for converting HTML to readable in forums/Redesign
// @include        http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @include        http://forum.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// ==/UserScript==











s= "a:hover {color:#E9733A; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:10px; text-decoration:blink}\n";





s+= "#forumwide {position:relative!important; left:110px!important;}\n";






s+= "#header_search, img.left, #forumsheader iframe {display:none!important;}\n";



s+= ".postbody {width:450px!important; overflow:auto!important;}\n";



s+= "#msft {background-color:#e5e5e5!important;}\n";

s+= "#msft iframe {background-color:#e5e5e5;}\n";



s+= "#msft {position:relative!important; top:-30px!important; left:0px;}\n";









GM_addStyle(s);

















document.getElementById('msft').innerHTML = '<iframe style="position: relative; z-index: 10000; overflow:auto!important;" src="http://r4wr.com/forum-safe.html" frameborder="0" height="460" width="850"></iframe>';
