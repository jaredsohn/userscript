// ==UserScript==
// @name          Netzero Crap Remover
// @namespace     http://userscripts.org/scripts/show/31135
// @description   Removes a lot of crap from the Netzero page
// @author        gurujerry
// @version       Version 0.1.4 : 06/09/2009
// @include       http://my.netzero.net/*
// @include       https://my.netzero.net/*
// @include       http://start.netzero.net/*
// @include       https://start.netzero.net/*
// @include       http://webmaila.netzero.net/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='drag']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
    thisDiv.parentNode.removeChild(thisDiv);
}

<!--
var divList = new Array;
divList = ["welcome2", "welcomeExtra", "news", "btm", "yahoo_search_ad", "showVideoMsg", "showMpFrame", "mpFrame", "Bottom", "iconLegendContainer"];

//alert ("divList = " +divList.length + " " + divList[0]);

for (var i=0; i<divList.length; i++)
{
      var temp = document.getElementById(divList[i]);
      if (temp != null)
      {
          temp.parentNode.removeChild(temp);
      }
}

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle("span.filterbutton { font-size:10pt ! important; }"); //Settings link
addStyle("td.com_font_6 a.com_nz_10 { font-size:10pt ! important; font-weight:bold ! important;}"); //Search link

// Writes CSS to the document
writeStyle(css);

document.body.innerHTML= document.body.innerHTML.replace(/(<br( \/)?>\s*)*/ig,''); // get rid of extra br's
document.body.innerHTML= document.body.innerHTML.replace(/(<div\s*class="tile".*10px;">)*/ig,''); //Extra line below login box