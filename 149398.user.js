// ==UserScript==
// @name          	lolQuotationMark
// @version        	1.05
// @namespace  		http://userscripts.org/users/19413
// @downloadURL		http://userscripts.org/scripts/source/149398.user.js
// @updateURL		http://userscripts.org/scripts/source/149398.user.js
// @include        	http://*lol*.com/forums.php?action=editpost&postid=*
// @include        	http://*lol*.com/forums.php?action=quotepost&topicid=*
// @include        	http://*lol*.com/markets.php?action=editpost&postid=*
// @include             http://*lol*.com/markets.php?action=quotepost&topicid=*
// @grant          	none
// ==/UserScript==

var body = document.getElementsByName("body")["0"];

body.value = body.value.replace(/\&\#8220\;/g, "\"");
body.value = body.value.replace(/\&\#8221\;/g, "\"");
body.value = body.value.replace(/\&\#8216\;/g, "\'");
body.value = body.value.replace(/\&\#8217\;/g, "\'");
body.value = body.value.replace(/\&\#8211\;/g, "-");