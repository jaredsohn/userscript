// ==UserScript==
// @name          Yahoo Custom Login
// @namespace     http://blogs.applibase.net/pramod/code
// @include       http://mail.yahoo.com
// @exclude       
// @description	  Enters username in Yahoo's login page
// ==/UserScript==


(function() {
    document.login_form.login.value = "pramodbiligiri";
    document.login_form.passwd.focus();
})();
