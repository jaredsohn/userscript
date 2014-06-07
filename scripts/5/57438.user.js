// ==UserScript==
// @name           zImgQuote
// @namespace      http://www.userscripts.org/people/171
// @include        *.org:88/forums.php?action=quotepost&topicid=*
// @include        *.org:88/markets.php?action=quotepost&topicid=*
// ==/UserScript==

var body = document.getElementsByName("body")["0"];

body.value = body.value.replace(/\[img\]/g, "[i]");
body.value = body.value.replace(/\[\/img\]/g, "[/i]");
body.value = body.value.replace(/\[IMG\]/g, "[i]");
body.value = body.value.replace(/\[\/IMG\]/g, "[/i]");
body.value = body.value.replace(/\[youtube\]/g, "[i]http://www.youtube.com/watch?v=");
body.value = body.value.replace(/\[\/youtube\]/g, "[/i]");
body.value = body.value.replace(/\&\#8220\;/g, "\"");
body.value = body.value.replace(/\&\#8221\;/g, "\"");
