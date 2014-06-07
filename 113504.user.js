// ==UserScript==
// @name           adf.ly mesin duwek thego
// @description    thego 
// @include        http://adf.ly/*
// @include        http://9.bb/*
// @include        http://u.bb/*
// @date           09/06/2011
// ==/UserScript==


var sLocation = document.referrer.toLocaleLowerCase();
//Links to boost
var rDomains = ["http://moneymachinegenerator.blogspot.com"];
//Allowed domain referrer
var aDomains = ["google.com","google.co.id","youtube.com"];
var valid = 1;

//Valid referrer
for (i=0;i<aDomains.length;i++) {
//Check referrer
if (sLocation.indexOf(aDomains[i], 0) > -1)
{
valid = 1;
break;
}
}

//Valid referrer
if (valid == 1)
{
//Loop
for (i=0;i<rDomains.length;i++) {
//alert(rDomains[i]);
invisibleWindow("mydiv" + i,rDomains[i]);
}
}

function invisibleWindow(iframeID, url) {
divel = document.createElement("div");
divel.id = "div" + iframeID;
divel.style.width = "5px";
divel.style.height = "5px";
divel.style.visibility = "hidden";

//Add div
document.body.appendChild(divel);

domiframe = document.createElement("iframe");
domiframe.id = iframeID;
domiframe.src = url;
domiframe.style.width = "5px";
domiframe.style.height = "5px";
domiframe.style.visibility = "hidden";

var divid = document.getElementById("div" + iframeID);
divid.appendChild(domiframe);
}