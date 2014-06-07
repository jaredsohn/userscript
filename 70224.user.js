// ==UserScript==
// @name           Standaard.be cleaned up
// @description    Standaard.be without ugly side info
// @namespace      http://userscripts.org/scripts/review/70224
// @include        http://standaard.be/*
// @include        http://www.standaard.be/*
// @include        http://www.destandaard.be/*
// @include        http://destandaard.be/*
// ==/UserScript==

var parent;
var text;
var i;

// Remove video box (and other junk in article pages)
var div;
var divs = document.getElementsByTagName("div");


for(i = 0; i < divs.length; i++)
{
    div = divs[i];

    if(div.className.indexOf("slot video-box") >= 0)
    {
        parent = div.parentNode;
        parent.parentNode.style.display = "none";
        break;
    }
}

// Remove blog box
var p_box;
var p_boxes = document.getElementsByTagName("p");

for(i = 0; i < p_boxes.length; i++)
{
    p_box = p_boxes[i];

    if(p_box.className.indexOf("module") >= 0)
    {
        text = p_box.innerHTML.toLowerCase();
        if(text.indexOf("fotoredactie blogt") >= 0)
        {
            parent = p_box.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent.parentNode.style.display = "none";

            break;
        }
    }
}
