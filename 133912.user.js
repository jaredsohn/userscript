// ==UserScript==
// @id             XolveGoogleTopBarCollapser
// @name           Google Topbar Collapser
// @version        0.3
// @namespace      xolve.net
// @author         Xolve
// @description    Collapses the top Google navbar and searchbar to provide more space for content.
// @include        https://www.google.tld/calendar/*
// @include        http://www.google.tld/calendar/*
// @include        https://www.google.tld/reader/view/*
// @include        http://www.google.tld/reader/view/*
// @include        https://groups.google.tld/forum/*
// @include        http://groups.google.tld/forum/*
// @include        https://news.google.tld/*
// @include        http://news.google.tld/*
// @include        https://maps.google.tld/*
// @include        http://maps.google.tld/*
// @include        https://docs.google.tld/*
// @include        http://docs.google.tld/*
// @run-at         document-end
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
    // create the menu button
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
    hoverMenuButton.style.zIndex = "10"; // above all elements
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
