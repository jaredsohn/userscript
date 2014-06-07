// ==UserScript==
// @name           Onet NoSport
// @namespace      http://userscripts.org/users/useridnumber
// @include        *www.onet.pl*
// ==/UserScript==


var DivS=document.getElementsByTagName("div");
for( var i=DivS.length-1; i>=0 ; i-- )
{
   if ( DivS[i].className=="box_head sport" )
   {
      DivS[i].style.display='none';
   }
}


var aLst = document.getElementsByTagName("a");
for (i= aLst.length-1 ; i>=0 ; i--)
{
   if ( aLst[i].href.match(/sport|doda|dody/)  )
   {
          aLst[i].style.display='none';
   }
}
	       
