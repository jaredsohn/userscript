// ==UserScript==
// @name           add/remove allcomments to lasvegassun.com url 
// @namespace      lasvegassun.com
// @description    add allcomments to story URLS via "ALT/A" keypress , remove via "ALT/Z" keypress
// ==/UserScript==

function KeyCheck(e)
{
    var unicode=e.keyCode
    var actualkey=String.fromCharCode(unicode)
    if (e.altKey){
        if (actualkey=="A") {
            if (!(window.location.href.indexOf('allcomments') != -1)) {
              window.location.assign(window.location.href+='allcomments/');
            }
        }
        else if (actualkey=="Z") {
            if ((window.location.href.indexOf('allcomments') != -1)) {
              window.location.assign(window.location.href.replace("/allcomments/","/"));
            }
        }
     }
}

window.addEventListener('keydown', KeyCheck, true);

