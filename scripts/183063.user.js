// ==UserScript==
// @name         Vetlearn Registration Prompt Remover
// @namespace    http://www.vetlearn.com/
// @version      0.1
// @description  Removes the registration prompt on vetlearn.com
// @match        http://*.vetlearn.com/*
// @match        https://*.vetlearn.com/*
// ==/UserScript==

function removeElementById(id)
{
    var elem = document.getElementById(id);
    if (elem != null)
    {
        elem.parentNode.removeChild(elem);
    }
}

removeElementById("exposeMask");
removeElementById("flow");