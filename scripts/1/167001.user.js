// ==UserScript==
//
// @name           RuneScape Quickswitch
// @description    Quickly hop worlds from the safety of your browser
//
// @author         GreenXen
//
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
//
// @version        1.0
//
// @include        http://oldschool*.runescape.com/*
//
// @history        1.0 Initial release
//
// ==/UserScript==

console.log("RuneScape Quickswitch is active!");

//User settings - Change this only if you do not want to have the full world list
var start = 1;
var stop = 78;
//End of user settings

//A collection of worlds which do not exist and should not be included in the list
var badWorlds = new Array(7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 63, 64, 71, 72);

//Setup the combo box area
prepareComboBoxArea();

/**
 * Changes the current page to the page of the desired world
 * @param world
 */
function switchWorld(world) {
    if (world >= start && world <= stop) {
        console.log("Switching to world " + world);
        document.location.href = "http://oldschool" + world + ".runescape.com/j1";
    }
}

/**
 * Creates the combo box, populates it, and replaces the search box with the combo box
 */
function prepareComboBoxArea() {
    var select = document.createElement("select");
    select.onchange = function () {
        switchWorld(this.value);
    };

    select.value = "Select A World...";

    var combobox = document.createElement("option");
    combobox.setAttribute("value", 1 + "");
    combobox.innerHTML = "Select World... ";
    select.appendChild(combobox);

    for (var i = start; i < stop + 1; i++) {
        if (badWorlds.indexOf(i) > -1) {
            continue;
        }
        var option = document.createElement("option");
        option.setAttribute("value", i.toString());
        option.innerHTML = "World " + i.toString();
        select.appendChild(option);
    }



    var existingForm = document.getElementsByTagName("form")[0];
    if (existingForm) {
        existingForm.replaceChild(select, existingForm.children[0]);
        existingForm.removeChild(existingForm.children[1]);
    }

}
