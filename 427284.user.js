// ==UserScript==
// @name        ReadFile
// @namespace   namespace
// @description descriptionn
// @include     *
// @version     1
// @grant       none
// ==/UserScript==
// Read the specified text file and display it in the <pre> element below
function readfile(f) {
    var reader = new FileReader();  // Create a FileReader object
    reader.readAsText(f);           // Read the file
    reader.onload = function() {    // Define an event handler
        var text = reader.result;   // This is the file contents
        var out = document.getElementById("output");    // Find output element
        out.innerHTML = "";                             // Clear it
        out.appendChild(document.createTextNode(text)); // Display file contents
    }
    reader.onerror = function(e) {  // If anything goes wrong
        console.log("Error", e);    // Just log it
    };
}