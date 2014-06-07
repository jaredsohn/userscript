// ==UserScript==
// @name       APSU D2L Login Layout Fix
// @version    1.3
// @description  Modifies the layout of the APSU D2L login screen. Removes the junk iframes and makes the login box bigger.
// @match      http*://elearn.apsu.edu/*
// @exclude	   http*://elearn.apsu.edu/d2l/*
// @copyright  2014+, Stephen Schuetrumpf
// ==/UserScript==

var tables = document.getElementsByTagName("table"); 
for(var outer = 0; outer < tables.length; outer++) 
{ 
    if(tables[outer].width == "150") 
    {
        //tables[outer].width = "300";
        tables[outer].width = "50%";
        tables[outer].style.left = "25%";
        tables[outer].style.top = "40%";
        tables[outer].style.position = "absolute";
        tables[outer].align = "center"
        var inputs = tables[outer].getElementsByTagName("input");
        for(var inner = 0; inner < inputs.length; inner++)
        { 
            if(inputs[inner].size == "9") 
            { 
                inputs[inner].size = "20"; 
            }
        }
    }
} 

var frames = document.getElementsByTagName('iframe');
for(var i = 0; i < frames.length; i++) 
{ 
    frames[i].parentNode.removeChild(frames[i]); 
}

/* I have no idea why, but for some reason, this block needs to run twice before it works. */

var frames = document.getElementsByTagName('iframe');
for(var i = 0; i < frames.length; i++) 
{ 
    frames[i].parentNode.removeChild(frames[i]); 
}