// ==UserScript==
// @name        KolFloristFriar
// @namespace   a
// @include	    *kingdomofloathing.com/topmenu.php*
// @include	    *127.0.0.1:*/topmenu.php*
// @include     localhost:*.kingdomofloathing.com/topmenu.php*
// @grant       none
// ==/UserScript==

//KolFloristFriar
//by Lightwolf (Aka ripped code off of DrEvi1's Raid Manager)

// Adds FloristFriar link to top pane

if ((window.location.pathname == "/topmenu.php"))
{
    var tdOffset = 11;
    var imgWidth = 50;
    var imgHeight = 50;

    var tableAnchor = document.getElementsByTagName("table")[0];
    var tdTags = tableAnchor.getElementsByTagName("td");
    
    //Loop to last <td>, then insert new <td> tag with Florist Friar link
    var anchor = tdTags[tdTags.length-tdOffset];

    var clanTd = document.createElement('td');
    var clanLink = document.createElement('a');
    var clanImage = document.createElement('img');
    clanImage.setAttribute("src","http://images.kingdomofloathing.com/otherimages/forestvillage/friarcottage.gif");
    clanTd.setAttribute("rowspan","2");
    clanImage.setAttribute("width",imgWidth);
    clanImage.setAttribute("height",imgHeight);
    clanImage.setAttribute("align","right");
    clanImage.setAttribute("border","0");
    clanLink.setAttribute("href","place.php?whichplace=forestvillage&action=fv_friar");
    clanLink.setAttribute('target','mainpane');
  
    clanLink.appendChild(clanImage);
    clanTd.appendChild(clanLink);
    
    anchor.parentNode.insertBefore(clanTd, anchor.nextSibling);

}	