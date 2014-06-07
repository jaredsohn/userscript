// ==UserScript==
// @version        1.0
// @name           OSM track uploader
// @author         Emilien Klein
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Helps to upload GPS tracks to OpenStreetMap.org
// @include        http://www.openstreetmap.org/user/*/traces
// ==/UserScript==

/*

History:

14/01/2010 - v1.0 - First version

*/

//unsafeWindow.console.log("XX");

startProcess();

function startProcess(){
    // Add an event listener on the GPS track
    $("trace_gpx_file").addEventListener("change", updateDescription, true);
}

function updateDescription(){
    var filename, desc, i, firstUpperCasePassed;
    // Pre-populate the track description from the name of the file
    filename = $("trace_gpx_file").value.replace(".gpx", "");
    desc = "";
    for(i = 0; i < filename.length; i++){
        // If the char is upper case
        if(filename[i] <= 'Z' && filename[i] >= 'A') {
            if(firstUpperCasePassed) {
                desc = desc + " - ";
            } else {
                firstUpperCasePassed = true;
            }
        }
        desc = desc + filename[i];
        // Don't keep the first char(s) if it's a digit
        if(filename[i] <= '9' && filename[i] >= '0' && desc.length == 1){
            desc = "";
        }
    }
    // Remove some unneeded " - "
    desc = desc.replace("El - ", "El ");
    desc = desc.replace("La - ", "La ");
    desc = desc.replace("Las - ", "Las ");
    desc = desc.replace("Los - ", "Los ");
    desc = desc.replace("De - ", "De ");
    desc = desc.replace("San - ", "San ");
    desc = desc.replace("Con - ", "Con ");
    desc = desc.replace("The - ", "The ");
    desc = desc.replace("To - ", "To ");
    desc = desc.replace("By - ", "By ");
    desc = desc.replace("Le - ", "Le ");
    desc = desc.replace("Rue - ", "Rue ");
    desc = desc.replace("Des - ", "Des ");
    desc = desc.replace("Het - ", "Het ");
    desc = desc.replace("Den - ", "Den ");
    
    // Set the description in the web page
    $("trace_description").value = desc;
}

// From http://wiki.greasespot.net/Code_snippets#document.getElementById_helper
function $() {
    var z=[], i=0, el;
    if (arguments.length==1) {
        return document.getElementById(arguments[0]);
    }
    while(el = document.getElementById(arguments[i++])) {
        if (el) {
            z.push(el);
        }
    }
    return z;
}
