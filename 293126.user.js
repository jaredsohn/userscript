// ==UserScript==
// @name        Better Google Homepage
// @namespace   www.irl-gaming.tumblr.com/My-scripts
// @description Adds google Images, Gmail, youtube, maps, and more to the top of google's homepage just like it used to be for faster access
// @include     https://www.google.com/
// @include     http://www.google.com/
// @version     1.0
// @grant       GM_registerMenuCommand 
// @grant       GM_setValue
// @grant       GM_getValue
// @author      DjSaturn - Adrian C.
// ==/UserScript==



//custom commands
GM_registerMenuCommand( "Add/Remove seperator bar", removeBar );
var hrVisible = GM_getValue("barVisible", true);

//Defining
function removeBar() {
    hrVisible = !hrVisible;
    GM_setValue("barVisible", hrVisible);
    if (hrVisible) newSeperator.color = defColor;
    else newSeperator.color = "#FFFFFF";
}
var defColor = "#E6E6E6"
var TopElement = document.getElementById('lga');
var linkNames =["Images","Maps","Gmail","Youtube","Translate","News"];
var linkSrc=["https://www.google.com/imghp?hl=en&tab=wi","https://maps.google.com/","https://mail.google.com/","http://www.youtube.com","https://translate.google.com","https://news.google.com"];
var newSeperator = document.createElement('hr');
{
    newSeperator.id = "newLine";
    newSeperator.width = "100%";
    if(hrVisible)newSeperator.color = defColor;
    else newSeperator.color = "#FFFFFF";
}

var links = [];

for(i=0;i<linkNames.length;i++)
{
    links[i] = document.createElement('a');
    links[i].id = linkNames[i];
    links[i].href = linkSrc[i];
    links[i].innerHTML = "<strong>"+ "&nbsp &nbsp &nbsp" + linkNames[i] + "&nbsp &nbsp &nbsp" + "</strong>";
    links[i].style ="text-decoration: none; color: inherit;";
}

//insertion
TopElement.parentNode.insertBefore(newSeperator,TopElement);

for(ii=0;ii<links.length;ii++)
{
    newSeperator.parentNode.insertBefore(links[ii],newSeperator);
    
}




