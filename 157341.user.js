// ==UserScript==
// @name           raf mail
// @namespace      nkrstic11@raf.edu.rs
// @description    auto login
// @include        https://mx1.raf.edu.rs/owa/auth*
// @version        1.0.5
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// ==/UserScript==
(function() {
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
var d=setInterval(function(){loguj()},1000);
}());
function loguj()
{

var u=GM_getValue("username", " ");
//alert(u);

if(u==" "){
u=prompt("Please enter your name","name");
GM_setValue("username", u);
//alert(GM_getValue("username"," "));
}
var p=GM_getValue('password', ' ');
if(p==" "){
p=prompt("Please enter your password","passw");
GM_setValue('password', p);
}
var us=document.getElementById("username");
us.value=u;
var pass=document.getElementById("password");
pass.value=p;
var xyz = document.getElementsByClassName("btn");
xyz[0].click();
}
window.oncontextmenu=function(e)
{
GM_deleteValue("username");
GM_deleteValue("password");
alert("reseted");
return false;
}