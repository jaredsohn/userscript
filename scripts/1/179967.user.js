// ==UserScript==
// @name       Yahoo Mail "Upgrade Your Browser" Redirector
// @namespace  http://www.patrickmollohan.tumblr.com/
// @version    1.0
// @description  This script automatically redirects you to your Yahoo inbox if you are experiencing the "Upgrade Your Browser" page
// @match      http://*/*
// @copyright  2013, Patrick Mollohan
// @run-at document-start
// ==/UserScript==

redirectToPage("http://us-mg6.mail.yahoo.com/neo/launch?.rand=", "http://us-mg6.mail.yahoo.com/neo/launch?reason=ignore&rs=1");

function redirectToPage(page1, page2){
if(window.location.href.indexOf(page1) != -1){
    window.location.href = page2;
}
}