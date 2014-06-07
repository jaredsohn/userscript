// BlockFlash2 for Opera
// version 0.3-OP - version history at end of script
// September 12, 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html  
// --------------------------------------------------------------------
//
// WHAT IT DOES:  
//
// Hides Flash content until you want to see it.
// "Replaces" Flash content with a button that says [Play Flash].
// Clicking on the button plays the Flash content.
//
// More precisely, BlockFlash2 adds a button-like div before
// Flash-containing embed and object tags and switches the 
// display property of those tags to "none," i.e. makes them
// invisible.  Clicking on the button switches the display
// property to visible.
//
// Simple and unintrusive.
//
// --------------------------------------------------------------------
//
// This is a Opera user script.
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
// @name		BlockFlash2 for Opera
// @description	Hides Flash animations until you click on individual [Play Flash] buttonS.
// @include		*
// ==/UserScript==
//
// embed tags

/*
Revised by NettiCat
Revised by v - varanasi
Revised by AP - Andrew Pennebaker (andrew.pennebaker@gmail.com)
Author: JvdO = Jos van den Oever (jos@vandenoever.info)

Version history:
0.3 - 2007-10-07 - v - eliminated anonymous function, condensed code
0.2 - 2007-10-06 - v - substituted xpath function for getElement and forEach for for loop
0.1 - 2007-09-26 - v - added code to find flash in embed tags (not just object tags), revised structure, included code by pix to improve on and off.

BlockFlash_Revisited - 2006-11-28 - AP - http://userscripts.org/scripts/show/6532
BlockFlash - 2006-02-12 - JvdO - http://userscripts.org/scripts/show/3204

Inspiration for this script comes from the removeFlash script and the FlashBlock firefox extension.

*/




function check(){   

		var elems = document.getElementsByTagName("embed"); // put all embed objects in array and check each
		for ( var i=0 ; i < elems.length; i++ )
		{
		  if (elems[i].parentNode.nodeName != "OBJECT"){       // handle embeds within objects as objects
				  if(checkforflash(elems[i]))
							add_play_flash_div(elems[i]);
		  };
		}
		
		elems = document.getElementsByTagName("object");
		for ( var i=0 ; i < elems.length; i++ )
		{
		  if(checkforflash(elems[i]))
					add_play_flash_div(elems[i]);
		}

};




function init(event){   
		try{document.removeEventListener("load", init,true);}catch(e){}
		window.setTimeout("check()",100);
};




function checkforflash(potl_item){   
              // checks the element passed to it for Flash content

    if (potl_item.innerHTML.match(/.swf|shockwave|flash|eyewonder/)) {
        return true
    };
    if (potl_item.hasAttribute('type') && potl_item.getAttribute('type').match(/flash/)){
        return true
    };
    if (potl_item.hasAttribute('src') && potl_item.getAttribute('src').match(/.swf|shockwave|flash|eyewonder/)){
        return true
    };
    return false;
};




function add_play_flash_div(flash){            // places the button-like div before the flash node
    var placeholder=document.createElement("div");
    placeholder.setAttribute("class", "BlockFlash2");
    flash.parentNode.insertBefore(placeholder, flash);  
    flash.style.display='none';                // hides the Flash node
    flash.on=false;
    placeholder.style.cursor='pointer';
    placeholder.style.background='orange';     // don't like orange buttons? Change color here.
    placeholder.style.textAlign='center';
    placeholder.style.color='black';
    placeholder.innerHTML="[Play Flash]";
    placeholder.addEventListener( 'click',     // the on/off switch
        function() {
            placeholder=this;
            flash=this.nextSibling;            // acts on the Flash-containing node following the div
                if (flash.on) {
                    flash.style.display='none';
                    placeholder.innerHTML="[Play Flash]";
                    flash.on=false;
            } else {
                    flash.style.display='';    // reveals the Flash node
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



document.addEventListener("load", init,true);

