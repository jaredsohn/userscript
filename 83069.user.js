// ==UserScript==
// @name           autofill
// @namespace      autofill
// @description    autofill
// @author         algkmn | www.aligokmen.com
// @include        *
// ==/UserScript==

var objecta = document.createElement('script');
objecta.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
objecta.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(objecta);

function wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(wait, 100); }
    else {$ = unsafeWindow.jQuery;
        main(); }}

wait();
function main(){

$(document).ready(function(){

username = '';
password = '';
email = '';

$("input[type=text][name=username]").val(username);
$("input[type=text][name=email]").val(email);
$("input[type=text][name=email_confirm]").val(email);
$("input[type=text][name=emailconfirm]").val(email);
$("input[type=password][name=new_password]").val(password);
$("input[type=password][name=password_confirm]").val(password);
$("input[type=password][name=password]").val(password);
$("input[type=password][name=passwordconfirm]").val(password);
});
}