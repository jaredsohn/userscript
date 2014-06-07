// ==UserScript==
// @name         Disable Xtube.com autoplay
// @version      1.2
// @description  Modifies embed tag to set autoplay to false
// @namespace     http://www.xtube.com/
// @match        http://*xtube.com/*
// @include       http*://*.xtube.com/*
// @copyright    2012+, Azaxiel
// @require      http://li45-88.members.linode.com/js/basic_functions.js
// @updateURL    http://li45-88.members.linode.com/js/noautoplayonxtube.update.js
// @downloadURL  http://li45-88.members.linode.com/js/noautoplayonxtube.user.js
// @run-at       document-start
// ==/UserScript==

//First we have to modify an inline javascript that sets the "flashvars" attribute in the embed tag
var taglist=document.getElementById("flash_holder").parentElement.childNodes;
for (var i=0;i<taglist.length;i++) {
    if (taglist[i].tagName != "SCRIPT") {
        continue;
    } else if (taglist[i].tagName == "SCRIPT") {
        var scripttag=taglist[i];
        break;
    }
}
//Setup a variable containing a child element of the parent element onto which we'll append the new script tag
var scriptgoeshere=document.getElementById("flash_holder");
//Get the source of the script from the tag
var scriptcontents=scripttag.innerHTML;
//Modify the source to set autoplay to false
var newscriptcontents=scriptcontents.replace('"auto_play", "true"','"auto_play", "false"');
//Remove original script tag
scripttag.parentNode.removeChild(scripttag);
//Create new script tag and attribute objects for type and id
var newscripttag=document.createElement("script")
var newscripttype=document.createAttribute("type");
var newscriptid=document.createAttribute("id");
newscripttype.value='text/javascript';
newscriptid.value="attrsrc";
//Insert new script tag
scriptgoeshere.parentElement.appendChild(newscripttag);
//Select newly inserted script tag in order to set type, id, and source attributes
var newscriptobj=scriptgoeshere.parentElement.lastChild;
newscriptobj.setAttributeNode(newscripttype);
newscriptobj.setAttributeNode(newscriptid);
newscriptobj.innerHTML=newscriptcontents;

//check to make sure embed tag's flashvars attribute doesn't have auto_play=true by default
var flashvars=document.getElementById("flash_sender").getAttribute("flashvars");
if (flashvars.match('auto_play=true') == 'auto_play=true') {
	var embedtag = document.getElementById("flash_sender");
	var newflashvars = flashvars.replace('auto_play=true','auto_play=false');
	var newatt = document.createAttribute("flashvars");
	newatt.value = newflashvars;
	embedtag.setAttributeNode(newatt);
	} 
