// ==UserScript==
// @name        Paranoid Facebook Poster Assistance
// @namespace   PFPA
// @description Hides all your Fb Posts
// @description Log in to your Facebook
// @description Navigate to Activity Log
// @include     https://www.facebook.com/*/allactivity
// @version     1
// @grant       none
// ==/UserScript==

var TRange=null;
var GreyPencil="mrs _2fmu customimg img sp_8g08g1 sx_8e1c65";
var HideFromTimeline="mrs img sp_3vjpuj sx_eeda97";
var linkId="Beta";

function clickString () {

    var link = document.getElementById(linkId);
    link.onclick.call(link);

}

function HideFromTimelineSub (str) {

    var HideFromTimelineArray = document.getElementsByClassName(HideFromTimeline),x;

    return HideFromTimelineArray[1].id;
}

function main () { 

var GreyPencilArray[] = document.getElementsByClassName(GreyPencil),x;

    for (var i=0;i<GreyPencilArray.length;i++)
    { 
    
        linkId = GreyPencilArray[2].id;
    
        clickString();
       
        linkId = HideFrimTimelineSub();
    
        clickString();
    
    }
    
}