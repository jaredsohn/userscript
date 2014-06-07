// ==UserScript==
// @name           Disable AP banner
// @namespace      test
// @include        http://www.aripaev.ee/*
// @include        http://ap3.ee/*
// @include        http://www.ap3.ee/*
// @include        http://aripaev.ee/*

// ==/UserScript==
banner = document.getElementById("siteHeaderPanorama")    

if (banner)
    banner.parentNode.removeChild(banner)
    //document.getElementById("module1").innerHTML = "";

logo = document.getElementById("logodiv2")    
if (logo)
    logo.parentNode.removeChild(logo)

var allDivs, thisDiv;
allDivs = document.evaluate("//div[@class='siteContentPad']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    //thisDiv.parentNode.removeChild(thisDiv);
    thisDiv.style.height="20px";
}

if (document.getElementById("siteContent")){
    document.getElementById("siteContent").setAttribute('style', 'position: relative; top: 70px;');
}


