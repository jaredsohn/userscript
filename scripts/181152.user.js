// ==UserScript==
// @name        Skip Fly
// @namespace   skipfly
// @description Remove advertising screen at adf.ly, shorte.st and allanalpass.com. Also auto continue after waiting!
// @author      PumaDias
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.9
// @updateURL   https://userscripts.org/scripts/source/181152.user.js
// @downloadURL https://userscripts.org/scripts/source/181152.user.js
// @homepage    https://userscripts.org/scripts/show/181152
// @grant       none
// @include     http://*.allanalpass.com/*
// @include     http://adf.ly/*
// @include     http://sh.st/*
// ==/UserScript==

var element = false;
var url = window.location.href.toLowerCase();

if (url.indexOf('allanalpass.com')!=-1) {
    if (url.indexOf('verify/')!=-1) window.location.href = window.location.href.replace('verify/','');
    element = document.getElementById('skiplink');
} else if (url.indexOf('adf.ly')!=-1) {
    document.getElementById('sitebar').style.display = 'none';
    document.getElementById('Interstitual').style.height = '0px';
    element = document.getElementById('skip_button');
} else if (url.indexOf('sh.st')!=-1) {
    document.getElementById('intermediate-ad').style.display = 'none';
    element = document.getElementById('skip_button');
}

if (element) {
    var div = document.createElement('div');
    div.innerHTML = '<div style="position:absolute;top:0px;top:0px;width:100%;height:100%;background:#fff;z-index:10000000000"><div style="margin:10% auto;width:240px;padding:10px;background:#E5EECC;border:#90C140 3px solid;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;text-align:center;font-size:26px;font-family:Arial;font-weight:bold;color:#90C140">Please wait...<div id="counterhack" style="font-size:38px;color:#000">0</div></div></div>';
    document.body.appendChild(div);
    var count = 0;
    if (typeof(element) != 'undefined' && element != null) {
        setInterval(function(){
            count++; document.getElementById('counterhack').innerHTML = count;
            if (element.href.length && element.href.toLowerCase()!=url) {
                document.body.innerHTML = '';
                if (element.href.indexOf(window.location) != -1) element.click();
                else window.location = element.href;
            }
        },1000);
    }
}