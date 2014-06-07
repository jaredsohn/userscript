// ==UserScript==
// @name          Planets.nu Show Tenacity Breakdown on Profile
// @description   Shows breakdown of tenacity components as tool-tip on user profile page
// @include       http://*planets.nu/#/account/*
// @include       http://planets.nu/*/history
// @include       http://play.planets.nu/*/history
// @include       http://planets.nu/*
// @include       http://play.planets.nu/*

// @version 0.4
// ==/UserScript==

function wrapper () { // wrapper for injection

// Try to test if on history page, and return if not.
if (window.location.hash.indexOf( "history" ) == -1) return;

var old_showHistory = ViewAccount.prototype.showHistory;

ViewAccount.prototype.showHistory = function(a) {
    old_showHistory.apply(this, arguments);

    //var username = $("#emaintitle").text().trim();
    //var account = nu.getAccount(username);
    var text = "Raw Tenacity:\t\t" + Math.round(a.finishtenacity * 10000) / 100 + "%\n"; 
    text    += "Daily Grind:\t\t" + Math.round(a.turntenacity * 10000) / 100 + "%\n";  
    text    += "Sector Rescue:\t" + Math.round(a.replacementtenacity * 10000) / 100 + "%";
    $("#eaccountdata").attr("title", text);
    
}

}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);