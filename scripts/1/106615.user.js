// ==UserScript==
// @name           BB.com QuickSearch By Date ( Title Only )
// @namespace      Pho3NiX_Misc
// @description    Replace the default sort option for quicksearch by lastpost, technically it replace the "quicksearch=1" parameter by "sortby=lastpost". It's a quick fix the best option is for mod to put that option by default or give the choice to the user.

// @include        http://forum.bodybuilding.com/*
// @version        0.1
// @date           27/10/10
// ==/UserScript==

f3x=document.getElementById("navbar_search_menu").getElementsByTagName("form")[1];

//Sort
f3xi = document.createElement('input');
f3xi.name = "sortby"; f3xi.value="lastpost";
f3x.appendChild(f3xi);

//Search in title
f3xi = document.createElement('input');
f3xi.name = "titleonly"; f3xi.value="1";
f3x.appendChild(f3xi);