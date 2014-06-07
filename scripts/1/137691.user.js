// ==UserScript==
// @name        USO - add useful links
// @namespace   mikecupcake
// @include     http*://userscripts.org/*
// @grant	none
// @version     1.2
// ==/UserScript==

header = document.querySelector("#top .container");

newDiv = document.createElement("div");
newDiv.innerHTML = "<a href='/posts'>new posts</a> | "
                 + "<a href='/home/scripts'>my scripts</a> | "
                 + "<a href='/scripts/new?form=true'>paste new script</a> "
                 ;
newDiv.style.float = "left";

header.appendChild(newDiv);