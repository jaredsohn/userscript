// ==UserScript==
// @id             alberswil.ch-fullheight
// @name           <www.alberswil.ch> Full Screen
// @version        0.1
// @namespace      
// @author         Kuno Meyer
// @description    Displays <www.alberswil.ch> at full screen height.
// @include        http://backoffice.apswiss.ch/albers.mv*
// @run-at         document-end
// ==/UserScript==

var el = document.getElementById('container')

if (el)
    el.style.height = "auto"
