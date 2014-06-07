// ==UserScript==
// @name           goofin
// @namespace      goofin
// @description    Hide ads and footer. Toggle header.
// @include        http://finance.google.com/*
// ==/UserScript==

var body_wrap = document.getElementById('home-main');
var hdr = body_wrap.childNodes[1];
var chartTable = document.getElementById('mktsumm');

toggleHeader();
hideAds();
hideFooter();
addToggleLink();

function toggleHeader() {
    hdr.style.display = (hdr.style.display=='none' ? '' : 'none');
}

function hideAds() {
    // There's only one iframe in the page so find it and turn off display.
    var ifs = document.getElementsByTagName('iframe');
    for(var i=0; i<ifs.length; i++) {
        ifs[i].style.display = 'none';
    }
    // The ad label is the only div with a class name of ad-label.
    // Find it and swap the chart table for the first child (label text).
    var divs = document.getElementsByTagName('div');
    for(var i=0; i<divs.length; i++) {
        if (divs[i].className == 'ad-label') {
            divs[i].replaceChild(chartTable, divs[i].firstChild);
            break;
        }
    }
}

function addToggleLink() {
    var guser = document.getElementById('guser');
    var acct_links = guser.childNodes[1];
    var togLink = document.createElement('a');
    togLink.appendChild(document.createTextNode("Toggle"));
    togLink.addEventListener("click", toggleHeader, false);
    togLink.setAttribute("href", '#');
    acct_links.innerHTML = ' | ' + acct_links.innerHTML;
    acct_links.insertBefore(togLink, acct_links.firstChild);
}

function hideFooter() {
    var elm = document.getElementById('footer');
    if(elm) elm.style.display = 'none';
}
