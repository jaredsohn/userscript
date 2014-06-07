// ==UserScript==
// @name           Confirm Save Thread
// @namespace      confirmsavethread
// @description    Confirms if you want to save a thread before you save it. Prevents accidentally saving threads, for the most part.
// @include        *.bungie.net/*/posts.aspx?postID=*
// ==/UserScript==
var saveThread = document.getElementById('ctl00_trackTopicLinkButton');
saveThread.href = "javascript:if(confirm('Would you like to save this thread?') == true) { __doPostBack('ctl00$trackTopicLinkButton', ''); }";