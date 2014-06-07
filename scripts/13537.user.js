// ==UserScript==
// @name          Oug :D
// @description   Oug :D ² > .. <
// @author          Mini WhiteBlack
// @include     http://www.orkut.com/Profile.aspx*
// ==/UserScript==
if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
     var p = document.getElementsByTagName('h1')[0];
    p.innerHTML += "<img src='http://img3.orkut.com/images/mittel/1188842528/34705978.jpg''>";    
}