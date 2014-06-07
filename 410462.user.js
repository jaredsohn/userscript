
// ==UserScript==
// @name       Rust autoAirdrop for MikroMann server
// @namespace  Auto AirDrop
// @version    1.0.0
// @description  Auto airdrop for MikroMann Rust server
// @match      https://clanforge.multiplay.co.uk/mh289488/servers/275043
// @copyright  Robin Lien
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==


var timeH = 7200, timeL = 1800, nextDrop = getNextDropTime();
 
$(document).ready(function() {

    alert("test");
    
    
    setInterval(function() {
        alert("drop")
    },
    nextDrop);
    
    
});

function getNextDropTime(){
    return 5 + Math.floor(Math.random() * 10);
}