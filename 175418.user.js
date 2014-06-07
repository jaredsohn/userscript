// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Check if Flash Player is Activated on your webpage
// @version         1.0
// ==/UserScript==

//alert('Flash plugin check');

function pluginActive(pname) {
    for (var i = 0;i < navigator.plugins.length;i++) {
        if (navigator.plugins[i].name.indexOf(pname) != -1) {
            return true;
        }
    }
    return false;
}

var flashStatus = pluginActive("Shockwave Flash");

alert("Flash plugin " + flashStatus);
