// ==UserScript==
// @name        Fix pink bar and rapportive z-index
// @include     https://mail.google.tld/*
// @version     1.0
// ==/UserScript==
function removeBar() {
    // Fix Rapportive z-index
    var eB = document.getElementById("rapportive-sidebar");
    if (eB) eB.style.zIndex=0;
    
    // Eliminate pink bar
    var eC = document.getElementsByClassName('ZY')[0];
    if (eC) eC.parentNode.parentNode.style.display="none";
}
setInterval(removeBar, 1000);