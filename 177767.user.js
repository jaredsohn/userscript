// ==UserScript==
// @name       Minethings ship hotkeys
// @version    0.1
// @description  Type the first letter of a city name to set destination, and 's' to send the ship.
// @match      http://*.minethings.com/vehicles/send/*
// @copyright  2013+, Hotrootsoup
// ==/UserScript==

var box = document.getElementById("MinersVehicleRouteId");
var button = document.getElementsByClassName("send_button")[0];
var i = 0;

if (!box || !button) {return;}

function setDestination(theKey) {
    for (i=0; i<box.options.length; i++) {
        var txt = box.options[i].innerHTML;
        if (txt.charAt(0).toLowerCase() === theKey) {
            box.selectedIndex = i;
            box.onchange();
            break;
        }
    }
}

window.addEventListener("keyup", function(e) {
    var pressed = String.fromCharCode(e.which).toLowerCase();
    
    if (!pressed) {
        return;
    }
    
    else if (pressed === "s") {
        button.click();
    }
        
    else {
        setDestination(pressed);
    }
});