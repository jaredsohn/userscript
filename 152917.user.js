// ==UserScript==
// @name       Travian T4 Select All Reports And Messages
// @namespace  
// @version    1.0
// @description  Adds a "select all" check box to the reports and messages tab in Travian T4
// @match      http://*.travian.*/berichte.php*
// @match      http://*.travian.*/nachrichten.php*
// @copyright  2012+, Anders Krogh Mortensen
// ==/UserScript==
var selectAllString = "Select all";
function uncheckSA() {
    document.getElementsByName('selectAll')[0].checked=false;
};
function checkAll() {
    var inputs = document.forms[0].elements;
    // Check all checkboxes if select all has been checked
    if (document.getElementsByName('selectAll')[0].checked) {
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox") {
                inputs[i].checked = true;
            }
        }
    }
    // Uncheck all checkboxes if select all has been unchecked
    else {
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox") {
                inputs[i].checked = false;
            }
        }
    }
};
// Add onChange events for all checkboxes
var inputs = document.forms[0].elements;
for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
        inputs[i].addEventListener("change", uncheckSA, false);
    }
}
// Add the "Select all" checkbox at the bottom of the table
var node = document.getElementsByClassName('footer')[0];
if (!node) {
    node = document.getElementsByClassName('administration')[0];
}
var oldHTML = node.innerHTML;
node.innerHTML = '<div class="markAll" style="width: 96px; margin-right: 0px; margin-left: 8px; float: left;"><input class="check" type="checkbox" name="selectAll" id="selectAllid"> <label for="selectAllid">' + selectAllString + '</label></div>' + oldHTML;
// Add onChange event for the "Select all" checkbox
document.getElementsByName('selectAll')[0].addEventListener("click",checkAll, false);