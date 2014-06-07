// ==UserScript==
// @name        OV Profile Scripts
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Fixes formatting on specific Onverse pages through the use of CSS and Javascript
// @include     http://www.onverse.com/*
// @version     1.1
// ==/UserScript==

var b = document.body.childNodes;
for(var i=0; i < b.length; i++) {
    if(b[i].tagName == 'script' || b[i].id == 'meebo')
        document.body.removeChild(b[i]);
}
var ss = document.createElement("style");
ss.innerHTML = "/* OV Small Image Frames */ div.smallImgFrame { display: table-cell; vertical-align: middle; } div.smallImgFrame img { display: block; margin-left: auto; margin-right: auto; width: auto; height: auto; } .friendsArray .frame tr { border-spacing: 0; } /* OVCodes Image Fix */ div.OVCode img { border: 0 none; padding: 0; vertical-align: bottom; } /* OV Logo Fix */ td.header a.logolink { margin-right: 15px; }";
document.body.appendChild(ss);