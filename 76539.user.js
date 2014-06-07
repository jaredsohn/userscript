// ==UserScript==
// @name           CiteU AutoAuth
// @namespace      http://diveintogreasemonkey.org/download/
// @description    automatique authentification for Internet in CIUP
// @include        http://internet.ciup.fr/
// ==/UserScript==

function autofill(){
        var login = "123456789";
        var password = "XXXXX";
        document.getElementsByName('admin_id').item(0).value = login;
        document.getElementsByName('admin_pw').item(0).value = password;
}
function submiting(){
        document.forms[0].submit();
}
autofill();
submiting();