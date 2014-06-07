// ==UserScript==
// @name          Shuréééékiii :D
// @description   Shuréééékiii :D ² > .. <
// @author          Mini WhiteBlack
// @include     http://www.orkut.com/Profile.aspx*
// ==/UserScript==
if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
     var p = document.getElementsByTagName('h1')[0];
    p.innerHTML += "<img src='http://imagens.kboing.com.br/emoticons/16327.gif''>";    
}


