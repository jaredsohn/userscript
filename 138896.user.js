// ==UserScript==
// @name           NoEquipeBar
// @version        1.1
// @namespace      http://userscripts.org/users/fredp42
// @description    Remove the status bar from equipe.fr.
// @include        http://www.lequipe.fr/*
// @grant          none
// ==/UserScript==

function remove_by_id(id)
{
    var element = document.getElementById(id);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

remove_by_id('toolbar');
remove_by_id('rebonds');

// remove une
var script = document.createElement("script");
script.setAttribute('type','text/javascript');
script.text="function setToasterQuoti(){}";
document.body.appendChild(script);
