// ==UserScript==
// @id             6bff05a0-e8ec-4afa-9cd5-03f6dbebc0b5
// @name           Bkokator
// @version        1.0
// @namespace      
// @author         Unlink
// @description    
// @include        https://www.facebook.com/*
// @run-at         document-end
// ==/UserScript==

(function () {
window.setInterval(function () {
    if (window.location.pathname == "/Rytmusjepan") {
       window.location.href = "http://colorfully.eu/wp-content/uploads/2012/08/no-woman-no-cry-facebook-cover-600x222.jpg";
    }
}, 100);
}());