// ==UserScript==
// @id             FacebookList
// @name           Facebook List Home
// @version        1.0.1
// @namespace      codybrumfield.com
// @author         Cody Brumfield
// @description    Opens a list as your start page in Facebook 
// @include        http://www.facebook.com/
// @include        https://www.facebook.com/
// @exclude        
// @grant       none
// @run-at         document-end
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
// ==UserScript==
// @id             FacebookList
// @name           Facebook List Home
// @version        1.0.0
// @namespace      codybrumfield.com
// @author         Cody Brumfield
// @description    Opens a list as your start page in Facebook 
// @include        http://www.facebook.com/
// @include        https://www.facebook.com/
// @exclude        
// @run-at         document-end
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
var login = getUrlVars()["login"];
var url = $('a[title="Close Friends"]').attr("href");
if (url || login) {
window.location = $('a[title="Close Friends"]').attr("href");
} else {
window.location = window.location.pathname + "?login=1";
}