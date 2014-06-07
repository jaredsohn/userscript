// ==UserScript==
// @name          Reformed Alignmentism Grey Space No More
// @description   Fills the Grey Space on all pages of the CasualCollective.com
// @include       http://casualcollective.com/*
// @include       http://*.casualcollective.com/*
// ==/UserScript==
// © 2008 by John "Ruffnekk" Willemse for the Reformed Alignmentism.
// Free to distribute unmodified.

GM_registerMenuCommand("Enter image URL...",SelectImage);

if (GM_getValue("imageURL")==null)
{
   GM_setValue("imageURL","http://farm3.static.flickr.com/2013/2367172528_aeae87ec59.jpg?v=0");
}  

ccBody = document.getElementsByTagName("body")[0];
ccBodyTables = ccBody.getElementsByTagName("table");
ccAppendTable = ccBodyTables[3];
ccAppendBody = ccAppendTable.getElementsByTagName("tbody")[0];
ccAppendRow = ccAppendBody.getElementsByTagName("tr")[0];

ccAppendRow.innerHTML += "<td><img src='http://www.casualcollective.com/images/spacer.gif' alt='' height='5' width='5'></td><td valign='top' width='90%'><div class='brownTitle'><div class='txt'><b>REFORMED ALIGNMENTISM</b></div></div><div><table border='0' cellpadding='0' cellspacing='0'><img src='"+GM_getValue("imageURL")+"'</img></table></div>";

function SelectImage()
{
   selectedImage = prompt("Enter the URL of the image you would like to use.\r\nYou have to reload the current page to see the changes.",GM_getValue("imageURL"));
   
   if (selectedImage==null || selectedImage=="")
      selectedImage="http://farm3.static.flickr.com/2013/2367172528_aeae87ec59.jpg?v=0";
      
   GM_setValue("imageURL",selectedImage);
}
