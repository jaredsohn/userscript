// ==UserScript==
// @name           FA-MoveBox
// @namespace      FA-MoveBox
// @description    Removes the left column, moves menu box to top.
// @include        http://www.furaffinity.net/view/*
// @include        http://www.furaffinity.net/full/*
// ==/UserScript==


function toggleoption()
{
    GM_setValue("MoveBox", !GM_getValue("MoveBox", false) );
    if(GM_getValue("MoveBox", false))
    { 
      move_box(); 
    } 
    else
    {
      window.location.reload(); 
    }
}


function move_box()
{
    var box=document.getElementById("sidebar-loves-adblock");
    
//                                            div            a        td           \n         td
    var headerMenu=document.getElementById("fa_header").parentNode.parentNode.nextSibling.nextSibling;

    var newTD = document.createElement("TD");
    box.style.height="135px";
    box.style.maxHeight="135px";
    box.style.overflow="hidden";
    newTD.appendChild(box);
    headerMenu.parentNode.insertBefore(newTD,headerMenu);
}

GM_registerMenuCommand('Toggle "Move Box"', toggleoption);

if(GM_getValue("MoveBox", false)){  move_box(); }

