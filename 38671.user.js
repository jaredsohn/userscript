// ==UserScript==
// @name           Auto Fill Password Fields
// @namespace      http://userscripts.org/users/23652
// @description    Automatically enters your password into fields
// @include        http://*.*/*
// @include        https://*.*/*
// @copyright      JoeSimmons
// ==/UserScript==

function main() {
var f, ae_pw = GM_getValue('ae_pw', ''),
fields = document.evaluate("//input[@type='password']", document, null, 6, null);
if(ae_pw=='') {options();}
else {
for(var i=fields.snapshotLength-1; i>=0; i--) fields.snapshotItem(i).value = ae_pw;
}
}

function options() {
var ae_pw = prompt('Password to remember');
if(ae_pw!='') {
GM_setValue('ae_pw', ae_pw);
main();
} else {alert('Invalid password');options();}
}

main();