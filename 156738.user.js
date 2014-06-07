// ==UserScript==
// @name            ILoveSkydiving Simple Layout
// @namespace       http://www.eclectide.com
// @version         0.2.4
// @description     Minimalistic layout for iloveskydiving.org
// @include         http://*iloveskydiving.org/*
// @exclude         http://iloveskydiving.org/shop/
// @author  	    Darek Kay <darekkay@gmail.com>
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

// =======================
// SCRIPT

window.addEventListener("load", main, false);

function main()
{
    insertVideoLink();
    setSimpleLayout();
}

function insertVideoLink()
{
    var urlRegex = /http.*\/\/.*iloveskydiving.org\/view\/videos\/.*/;

    if (!urlRegex.test(window.location.href))
        return;

    var addBar = document.getElementById('addThis');
    removeElement(addBar.firstChild);

    var youtubeLink = $("a[href^='http://www.youtube.com/watch?v=']").text();
    var vimeoLink = $("a[href^='http://vimeo.com/']").text();

    var link = youtubeLink ? youtubeLink : vimeoLink; // find out, which link to use

    // create direct link
    var directLink = document.createElement("div");
    directLink.innerHTML = '<div style="margin-left: 15px; margin-bottom: 10px; padding: 2px 5px 2px 5px;">'
        + '<a href="' + link + '">' + link + '</a></div>';
    addBar.appendChild(directLink);
}

function setSimpleLayout()
{
    addCss("#main, .span-24{ width: 640px; };");

    removeById("sidebar");
    removeById("copyright");
    removeById("author");

    var adContainer = document.getElementById("leader");
    while (adContainer.hasChildNodes())
        adContainer.removeChild(adContainer.firstChild);

    document.getElementById('moreDiv').appendChild(
        document.getElementById('comments')); // move comments to the drop down section
}

// =======================
// UTILS

function addCss(cssString)
{
    var head = document.getElementsByTagName('head')[0];
    if (head == null)
        head = document;

    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
}

function removeById(elementId)
{
    var elem = document.getElementById(elementId);
    removeElement(elem);
}

function removeElement(elem)
{
    if (elem != null) {
        elem.parentNode.removeChild(elem);
    }
}