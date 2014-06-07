// ==UserScript==
// @name           Myspace - Auto-Commenter
// @namespace      http://www.myspace.com/tp_
// @include        http://comment.myspace.com/*

// ==/UserScript==

 // ====EDIT THIS====
 text = "HEY HEY HEY! WHAS GO0Diie? WELL ii <P>THOUGHT THAT OUT OF THE KinDNESS OF MY HEART,<P> i'D STOP Bii TO SHO YA MADD LUV! YA DiGG? ii HOPE THAT YO0H WiLL RETURN THE FAVOR<P> WELL WHENEVA YO0H GET THiS JUST SCREAM @ MEEH iiGHT
<P>
AS ALWAiiZ
<P>
-TiMA"


 // ====NOT HERE====
 var theInput = document.getElementById("ctl00_Main_postComment_commentTextBox"); 
 theInput.value = text;