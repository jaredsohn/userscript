// ==UserScript==
// @name           miself's Monopoly City Streets utilities
// @namespace      http://userscripts.org 
// @description    Helps finding streets and building
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        011
// ==/UserScript==

function addInlineJavascript(content)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) return;
    
    script = document.createElement('script');
    script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
    head.appendChild(script);
}

function registerMiselfMCSUtils() {
    if (typeof(MCS) == 'undefined') {
        window.setTimeout("registerMiselfMCSUtils()", 2000);
        return;
    }
    
    var expires = new Date();
    expires.setTime(expires.getTime() - 1);
    expires = expires.toGMTString();
    document.cookie = "n=; expires=" + expires + "; path=/";
    document.cookie = "h=; expires=" + expires + "; path=/";
    
    $.ajax({
        url: "http://userscripts.org/scripts/source/61885.user.js",
        cache: true,
        dataType: "script"
    });
}

addInlineJavascript(registerMiselfMCSUtils);
addInlineJavascript("var HK = null;");
addInlineJavascript("var g_nickname = null;");
addInlineJavascript("var g_hash = null;");
registerMiselfMCSUtils();
