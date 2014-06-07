// ==UserScript==
// @id             TestlinkUE
// @name           Testlink usability enhancer
// @version        1.4
// @namespace      http://195.26.167.181/testlink/lib/
// @author         Yakov Shuvaev
// @description    
// @include        http://195.26.167.181/testlink/lib/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/128194.user.js
// ==/UserScript==
(function(){
     var f = document.getElementById("bug_id");
     if (f) {
        f.setAttribute('maxlength', 200);
        f.setAttribute('size', 200);
     }
     else {
        console.log("no field");
     }
})();