// ==UserScript==
// @name          Planets.nu Add More Links to Main Menu
// @description   Adds links to main menu in new client for Planets Mag, DIE HARD, Donovan's, vgapcalc, old forums
// @include       http://*planets.nu/*
// @version 0.2
// ==/UserScript==

function wrapper () { // wrapper for injection

    var links = "<li><a href='http://planets.nu/_library/diehard/diehard.html' target='_blank'>DIE HARD</a></li>";
    links    += "<li><a href='http://www.donovansvgap.com' target='_blank'>Donovan's</a></li>";
    links    += "<li><a href='http://www.vgaplanets.ca/vgapcalc.php' target='_blank'>VgapCalc</a></li>";
    links    += "<li><a href='http://planetsmagazine.com' target='_blank'>Planets Mag</a></li>";    
    links    += "<li><a href='http://planets.nu/forums'>Forums</a></li>";

    $("#emainmenu").css( 'width', '990px');
    $("#emainmenu").prepend(links);

}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);