// ==UserScript==
// @name        Kitkat Dropdown
// @description Assists in some basic form filling.
// @include 	https://g.kitkat.ca/en/
// @namespace   d__p___
// ==/UserScript==

var upcDropdown = document.createElement("select"); // create the dropdown
var upcBox = document.getElementById('upc'); // find the upc textbox
upcBox.parentNode.insertBefore(upcDropdown, upcBox.nextSibling); // insert dropdown after upc textbox

var upcvalues = ["05980331", "059800204736", "059800623360", "059800216920", "059800299367"];

for (var x in upcvalues) { // build elements in dropdown
    var opt = document.createElement("option");
    
    var content = document.createTextNode(upcvalues[x]);
    opt.appendChild(content);
    
    var attr = document.createAttribute("value");
    attr.nodeValue = upcvalues[x];
    opt.setAttributeNode(attr);
    
    upcDropdown.appendChild(opt);
}

upcDropdown.addEventListener("click", function() {upcBox.value = upcDropdown.value;}, false);

// Check checkboxes, too
var checkboxes = ["chkAge", "chkCanada", "chkAgree"];

for (var x in checkboxes) {
    checkbox = document.getElementById(checkboxes[x]);
    checkbox.checked=true;
}

// Annswer skilltesting question, too
var skillTestingBox = document.getElementById('skilltesting');
skillTestingBox.value = "16";
