// BlockFlash2 
// version 0.4.1 - version history at end of script
// April 9, 2011
// Released under the GPL license 
// http://www.gnu.org/copyleft/gpl.html  
// ---------------------------------------------------------------
//
// WHAT IT DOES:  
//
// Hides Flash content until you want to see it.
// "Replaces" Flash individual flash elements with a button that says [Play Flash].
// Clicking on the button plays the Flash element.  This enables one to turn on 
// the flash content you want and avoid what you don't want to see.
//
// More precisely, BlockFlash2 adds a button-like div before
// Flash-containing embed and object tags and switches the 
// display property of those tags to "none," i.e. makes them
// invisible.  Clicking on the button makes the Flash div visible 
// again.
//
// Simple and unintrusive.
//        
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools/Greasemonkey, there will be a menu item "Install User         
// Script...".  Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF BlockFlash2, go to

// Tools/Manage User Scripts and manually uninstall the previous

// version before installing this one.  
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "BlockFlash2", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name		BlockFlash2
// @fullname            BlockFlash2
// @namespace		http://userscripts.org/scripts/show/45343
// @description	Hides Flash animations until you click on individual [Play Flash] buttons.
// @include		*
// @exclude
// ==/UserScript==
//

// embed tags
xpath("//embed").forEach(function(embed) {            // put all embed objects in array and check each
    if (embed.parentNode.nodeName != "OBJECT" && embed.parentNode.style.display != "none"){       // handle embeds within objects as objects
	if(checkforflash(embed)){add_play_flash_div(embed)};
   };
});

// object tags
xpath("//object").forEach(function(object) {     
    if(checkforflash(object)){add_play_flash_div(object)};
});

function checkforflash(potl_item){                    // checks the element passed to it for Flash content
    if (potl_item.hasAttribute("flashvars") ){
	return true
    };
    if (potl_item.hasAttribute("type") && potl_item.getAttribute("type").match(/flash|shockwave/)){
	return true
    };
    if (potl_item.hasAttribute("src") && potl_item.getAttribute("src").match(/.swf|shockwave|flash|eyewonder/)){
	return true
    };
    if (potl_item.innerHTML.match(/.swf|shockwave|flash|eyewonder/)) {
	return true
    };
    return false;
};

function add_play_flash_div(flash){            // places the button-like div before the flash node
    var placeholder=document.createElement("div");
    savedDisplay = flash.style.display;
    placeholder.setAttribute("class", "BlockFlash2");
    flash.parentNode.insertBefore(placeholder, flash);  
    flash.style.display='none';                // hides the Flash node
    flash.on=false;
    placeholder.style.cursor='pointer';
    placeholder.style.background='orange';     // don't like orange buttons? Change color here.
    placeholder.style.textAlign='center';
    placeholder.style.textTransform='capitalize';
    placeholder.style.color='black';
    placeholder.innerHTML="[Play Flash]";
    placeholder.addEventListener( 'click',     // the on/off switch
	function() {
	    placeholder=this;
	    flash=this.nextSibling;            // acts on the Flash-containing node following the div
		if (this.innerHTML=="[Stop Flash]") {
		    flash.style.display='none';
		    flash.style.visibility = 'hidden';
		    placeholder.innerHTML="[Play Flash]";
		    flash.on=false;
	    } else {
		    flash.style.display=savedDisplay;  // reveals the Flash node
		    flash.style.visibility='visible';
		    placeholder.innerHTML="[Stop Flash]";
		    flash.on=true;
	    }
	},
	true
    );
    return true;
}

function xpath (p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
};

/*

Revised by v - varanasi
Revised by AP - Andrew Pennebaker (andrew.pennebaker@gmail.com)
Author: JvdO = Jos van den Oever (jos@vandenoever.info)

Version history:
0.41 - 2011-04-9 - v - fixed name bug per swiney's suggestion (duh!) and improved stop/start per d0uub
0.4 - 2009-03-27 - v - improved [Play Flash] operation and removed option to ignore tiny flash elements
0.31 - 2008-03-24 - v - improved [Play Flash] operation, added preference and default not to tag 1 pixel flash elements
0.3 - 2007-10-07 - v - eliminated anonymous function, condensed code
0.2 - 2007-10-06 - v - substituted xpath function for getElement and forEach in place of for loop
0.1 - 2007-09-26 - v - added code to find flash in embed tags (not just object tags), revised structure, included code by pix to improve on and off.

BlockFlash_Revisited - 2006-11-28 - AP - http://userscripts.org/scripts/show/6532
BlockFlash - 2006-02-12 - JvdO - http://userscripts.org/scripts/show/3204

Inspiration for this script comes from the removeFlash script and the FlashBlock firefox extension.
*/
