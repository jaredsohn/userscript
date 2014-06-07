// ==UserScript==
// @name           Fix Subject
// @namespace      Fix Subject
// @description    Fixes the subject disappearance issue.
// @include        http://*bungie.net/Account/Profile.aspx?msgID=*
// ==/UserScript==

if(!document.URL.match(/reply/i))
{
var reply_btn = document.getElementById('ctl00_mainContent_msgDisplay_skin_replyButton'), subject = document.getElementById('ctl00_mainContent_msgDisplay_skin_subject').textContent, pseudo_subject = 're: '+subject;
reply_btn.addEventListener("click", function() {
GM_setValue("replySubject", pseudo_subject);
}, 
true);
}
else 
{
document.getElementById('ctl00_mainContent_messageForm_skin_subject').value = GM_getValue("replySubject");
}

// Poop.