// ==UserScript==
// @id             GoogleGroupsTopbarCollapser
// @name           Google Groups Topbar Collapser
// @version        0.1
// @namespace      xolve.net
// @author         Xolve
// @description    
// @include        https://groups.google.com/forum/*
// @include        http://groups.google.com/forum/*
// @run-at         window-load
// ==/UserScript==

var hoverElement;

function toggleMenu() {
    if (hoverElement.style.display == "none") {
        hoverElement.style.display = "block";
        hoverElement.style.visibility = "visible";
        console.log(hoverElement.style.display);
        console.log(hoverElement.style.left);
    } else {
        hoverElement.style.display = "none";
    }
}

function modifyPage() {
    // craete the menu button
    hoverMenuButton = document.createElement("div");
    hoverMenuButton.style.borderColor = "navy";
    hoverMenuButton.style.borderStyle = "solid";
    hoverMenuButton.style.borderWidth = "2px";
    hoverMenuButton.style.cursor = "pointer";
    hoverMenuButton.style.float = "left";
    hoverMenuButton.style.position = "fixed";
    hoverMenuButton.style.top = "0px";
    hoverMenuButton.style.left = "0px";
    hoverMenuButton.style.width = "15px";
    hoverMenuButton.style.height = "12px";
    hoverMenuButton.onclick = toggleMenu;

    hoverMenuButtonText = document.createElement("p");
    hoverMenuButtonText.innerHTML = ">>";
    hoverMenuButtonText.style.fontSize = "7pt";
    hoverMenuButtonText.style.fontStyle = "italic";
    hoverMenuButtonText.style.margin = "0px";
    hoverMenuButton.appendChild(hoverMenuButtonText);

    // remove elment from page diaplay
    hoverElement = document.getElementById("gb");
    hoverElement.style.display = "none";
    hoverElement.style.position = "fixed";
    hoverElement.style.top = "0px";
    hoverElement.style.left = hoverMenuButton.style.width;
    hoverElement.style.width = (parseInt(screen.width) - parseInt(hoverMenuButton.style.width)) + "px";

    bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.appendChild(hoverMenuButton);
}

modifyPage();
