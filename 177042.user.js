// ==UserScript==
// @name        baneed
// @namespace   trotar os leigos
// @include     http://trophymanager.com/club/1801114/
// @version     1
// ==/UserScript==


if (location.href.indexOf("/1801114/") != -1){
    
    var baned = document.getElementsByClassName("box")[0];
    var img = document.createElement("img");
    img.setAttribute("src", "/pics/club_banned.png");
    img.setAttribute("style", "position:absolute; top:200px; left:380px; z-index: 3");
    baned.appendChild(img);
    document.appendChild(baned);
 
    
    
}