// ==UserScript==
// @name           Google Logo Remove
// @namespace      http://rimu.geek.nz/
// @description    Removes the google logo from the home page
// @include        http://www.google.co.nz/
// @include        http://www.google.co.m/
// ==/UserScript==
function removeDOM_id(element)
{
     var e = document.getElementById(element);
     if(!e)
          alert("There is no element with the id: "+element);
     e.removeChild(e.childNodes[0]);
}

removeDOM_id("lga");
