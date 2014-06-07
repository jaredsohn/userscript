// ==UserScript==
// @name           OkCupid Title Fixer
// @namespace      http://mysite.verizon.net/negatron/
// @description    Rewrites title tags to match forum topic, mail subject line, and journal post heading (if you go to the permalink).  This way you can bookmark things effortlessly, go through your Firefox history with the AwesomeBar, etc.
// @include        http://*.okcupid.com*
// ==/UserScript==

(function() {

var href = new String(document.location);

// GM_log("HREF: " + href);

// Mail
if (href.indexOf("messages?readmsg") != -1) {
    subject = document.getElementById("message_heading").textContent
    document.title = document.title + ': ' + subject;
    }

// Journal single-post permalinks
if (href.match(/profile\/\w+\/journal\/\d+/)) {
    postnumber = href.match(/profile\/\w+\/journal\/(\d+)/)[1]
    heading = document.getElementById('hiddenTitleCopy' + postnumber).textContent
    document.title = document.title + ': ' + heading;
    }
    

})();