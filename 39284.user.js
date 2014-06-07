// ==UserScript==
// @name           Gothador Easy Creature Killer
// @namespace      http://userscripts.org/users/42648
// @description    Keeps the creature locator skill pop-up in the same window, puts in the coords for the next creature, clicks the teleport button and clicks the multi-kill button.  (doesn't work... error in the input/teleport script...don't know how to fix it. if anyone knows how, please let me know!)
// @include        http://www.gothador.com/
// @include        http://www.gothador.com/index.php
// @include        http://www.gothador.com/locatecreature.*
// ==/UserScript==



var locatorTitle = 'Gothador - Devilishly Addictive! ({CODE_VERSION})'

//------sticking creature creator pop-out inside gothador UI.
if (document.title=locatorTitle)
{
var pageInsert = document.createElement("center");
var placePoint = document.getElementsByTagName('center')[document.getElementsByTagName('center').length];
pageInsert.innerHTML='<iframe frameborder=0 scrolling="no" height=125 src="http://gothador.com/locatecreature.php?PHPSESSID={SESSION_ID}"></iframe>';
document.getElementsByTagName('body')[0].insertBefore(pageInsert, placePoint);
}



//------Once they're displayed by the creature locator, get the coordinates.
if (document.title=locatorTitle)
{



    //-------Extract the coords from the info message.
    var locatorText = document.getElementsByTagName('td')[12].getElementsByTagName('font')[0].innerHTML
    if (locatorText.indexOf("(")!=-1) //---look for the parenthesis.
    {
    var Coords=locatorText.substring(locatorText.indexOf("(")+1,locatorText.length-2)
    var xCoord=Coords.substring(0,Coords.indexOf(","))
    var yCoord=Coords.substring(Coords.indexOf(",")+1,Coords.length)
   var creatureName=locatorText.substring(locatorText.indexOf("'")+1,locatorText.indexOf("'",locatorText.indexOf("'")+1))
  
  
    //--------Set Cookie here with coords and creature selected name.
function setCookie()
{
//---------Expiration for creature name is a year, but expiration for coords is only 10 seconds so that it doesn't automatically try to kill something when you log in two days later.
var exdate=new Date();
exdate.setDate(exdate.getDate()+365);
var extime=new Date();
extime.setTime(extime.getTime()+30000);

window.parent.top.document.cookie='creature'+ "=" +escape(creatureName)+((1==null) ? "" : ";expires="+exdate.toGMTString());
window.parent.top.document.cookie='x'+ "=" +escape(xCoord)+((1==null) ? "" : ";expires="+extime.toGMTString());
window.parent.top.document.cookie='y'+ "=" +escape(yCoord)+((1==null) ? "" : ";expires="+extime.toGMTString());
}





  
  
        //-------Put the x/y coords in their respective fields on the main gothador page and teleport there.
        for (i=0;window.parent.top.document.getElementsByTagName('input').length;i++)
        {
            if (window.parent.top.document.getElementsByTagName('input')[i].value=Coords)
            {
            window.parent.top.document.getElementsByTagName('input')[i-2].value=xCoord
            window.parent.top.document.getElementsByTagName('input')[i-1].value=yCoord
            window.parent.top.document.getElementsByTagName('input')[i].click()
        }

    }//-------------End get coordinates from info message. But we're still in conditional statement for the smaller page.
  



     //-------------Scroll to the bottom part of the page into view and select from the drop down the last selected creature using the cookie.
   
     window.parent.top.scroll(0,20000)
     if (getCookie('creature')!=''){
     var i=0
     for (i=0;i<=document.getElementsByTagName('option').length; i++)
    {
    if (document.getElementsByTagName('option')[i].innerHTML==getCookie('creature'))
        {
                  document.getElementsByName('locate_creature')[0].selectedIndex=i
    break
        }
    }}




  
    //----------Check if I'm on the map square that I wanted to be on, loop through to find the actions section for the selected creature, then click the multi-kill button closest to it.

    
    if (window.parent.top.document.getElementsByTagName('body')[0].innerHTML.indexOf('Actions for Map Location (' + getCookie('x') + ',' + getCookie('y') + ')...')!=-1)
    {
        var k=0
        while (k<=window.parent.top.document.getElementsByTagName('tr').length)
        {
    if (window.parent.top.document.getElementsByTagName('tr')[k].getElementsByTagName('td')[0].innerHTML=='<font style="font-size: 9px;" color="#ffffff" face="Small Fonts">Actions for ' + getCookie('creature').toLowerCase() + '...</font>')
    {
	
	window.parent.top.location = window.parent.top.document.getElementsByTagName('tr')[k+1].getElementsByTagName('td')[0].getElementsByTagName('font')[0].getElementsByTagName('font')[0].getElementsByTagName('a')[0].href

    }
        k++
        }
    }  


}



//---------Cookie Functions

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}


function setCookie()
{
//---------Expiration for creature name is a year, but expiration for coords is only 10 seconds so that it doesn't automatically try to kill something when you log in two days later.
var exdate=new Date();
exdate.setDate(exdate.getDate()+365);
var extime=new Date();
extime.setTime(extime.getTime()+30000);

window.parent.top.document.cookie='creature'+ "=" +escape(creatureName)+((1==null) ? "" : ";expires="+exdate.toGMTString());
window.parent.top.document.cookie='x'+ "=" +escape(xCoord)+((1==null) ? "" : ";expires="+extime.toGMTString());
window.parent.top.document.cookie='y'+ "=" +escape(yCoord)+((1==null) ? "" : ";expires="+extime.toGMTString());
}
}