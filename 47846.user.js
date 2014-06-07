// ==UserScript==
// @version 0.9
// @name Act On Profile (GMT)
// @author Mortificant
// @namespace http://userscripts.org/scripts/source/47846
// @description Puts a set of f5-able action links at the top of UD profiles
// @include http://*urbandead.com/*.cgi*
// ==/UserScript==


/*
   Including the copyright from some of the contained co_ordinates code.
   All code is under GPL.

   Copyright 2005 Sebastian Wiers - swiers@gmail.com

   This is distributed under the terms of the GPL.
   http://www.gnu.org/licenses/gpl.txt

*/



//**************************************************
//  ****   START PROFILES ONLY SECTION  ****
if (document.title.match (/Urban Dead - Profile/)){
//**************************************************



//**************************************************
//  ****   VARIABLES   ****
ProfileID = location.href.match(/\d+/) ;
wwwLoc = location.href.match(/http:\/\/www.urbandead.com|http:\/\/urbandead.com/);
var reg = new RegExp(/^Urban\ Dead\ -\ Profile\ -\ ([^\(]+)\ \(/);
Name = reg.exec(document.title);
Attack = "<a href=' " +wwwLoc+ "/map.cgi?&target="  ;
//**************************************************



//**************************************************
//  make input bar at top of page
//**************************************************
var DoProTop= "<table width='100%' bgcolor='#000000'><tr>"     ;
    DoProTop+="<td align='left'>"  ;
    DoProTop+=Attack+ProfileID+"&weapon=maul'> [Claw] </a>"    ;
    DoProTop+=Attack+ProfileID+"&weapon=teeth'> [Bite] </a>"    ;
    DoProTop+=Attack+"b&weapon=maul'> [Barricades] </a>"    ;
    DoProTop+="<td align='right'>"  ;
    DoProTop+="<a href="+wwwLoc+"/contacts.cgi?add="+ProfileID+" '> [+Contact] </a>"  ;
    DoProTop+="<a href='http://iwitness.urbandead.info/index.php?q=id="+ProfileID+"%22'> [Iwitness?] </a>"  ;
    DoProTop+="<a href='http://ud-malton.info/rg/i/"+ProfileID+" '> [is PKer?] </a>"  ;
    DoProTop+="<tr></tr><tr>"+Name[1]+" || "+wwwLoc+"/profile.cgi?id="+ProfileID+"</tr>";
    DoProTop+="</table>"    ;

document.body.innerHTML = DoProTop + document.body.innerHTML;
//**************************************************



//**************************************************
//  ****   END PROFILES ONLY SECTION  ****
}
//**************************************************/

