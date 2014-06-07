// ==UserScript==
// @name           BodyMod.org Video Downloader
// @namespace      None
// @description    Adds a Download Link for Videos.
// @include        http://www.bodymod.org/mods/mods.aspx?ID=*
// ==/UserScript==
function fiddle(){
  var fileVar = document.evaluate( "id('theMod')/object/@flashvars", document, null, XPathResult.STRING_TYPE, null ).stringValue;
  fileVar = fileVar.replace(/^file=/,'');
  var playerNode = document.getElementById("theMod");
  if (playerNode && fileVar) {
    var downloadLink = document.createElement("a");
    
    var href = document.createAttribute("href");
    href.nodeValue=fileVar;
    downloadLink.setAttributeNode(href);
    
    downloadLink.innerHTML = 'Direct Link to the Video';
    
    var div = document.createElement("div");    
    var style = document.createAttribute("style");
    style.nodeValue="padding:5px;position:relative;text-align:center;";
    div.setAttributeNode(style);
    
    div.appendChild(downloadLink);
    
    var modCaption = document.getElementById('modCaption');
    modCaption.parentNode.insertBefore(div,modCaption);
  }
}

window.addEventListener(
    'load', 
    fiddle,
    true);
