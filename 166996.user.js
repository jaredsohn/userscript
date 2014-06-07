// ==UserScript==
// @name           Add select option
// @description    Permits to add an option to each selectbox
// @include        *

// ==/UserScript==
var selects = document.evaluate("//select", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var selname = null;
var selid = null;
var seldesc = null;
var optdesc = null;
var opttext = null;
var optval = null;

for (var i = 0; i < selects.snapshotLength; i++) {
    selname = selects.snapshotItem(i).name;
    selid = selects.snapshotItem(i).id;

    if (selname == null) {
        seldesc = "with no name";
    } else if (selname == "") {
        seldesc = "with empty name";
    } else {
        seldesc = "with name " + selname;
    }
    if (selid == null) {
        seldesc = seldesc + ", no ID";
    } else if (selid == "") {
        seldesc = seldesc + ", empty ID";
    } else {
        seldesc = seldesc + ", ID " + selid;
    }
    
    if (selects.snapshotItem(i).options.length) {
        optdesc = " and options:\r\n";
        for (var j = 0; j < selects.snapshotItem(i).options.length; j++) {
            if (selects.snapshotItem(i).options[j].selected) {
                optdesc = optdesc + "[*] " + selects.snapshotItem(i).options[j].text + "\r\n        " + selects.snapshotItem(i).options[j].value + "\r\n";
            } else {
                optdesc = optdesc + "    " + selects.snapshotItem(i).options[j].text + "\r\n        " + selects.snapshotItem(i).options[j].value + "\r\n";
            }
        }
    } else {
        optdesc = " and no options, ";
    }
    
    opttext = prompt("Please, input the text for a new option of the select " + seldesc + optdesc + "or Cancel", (selects.snapshotItem(i).options.length + 1).toString());
    if (opttext != null) {
        optval = prompt("Please, input the value for the new option of the select " + seldesc + optdesc + "or Cancel", (selects.snapshotItem(i).options.length + 1).toString());
        if (optval != null) {
            selects.snapshotItem(i).add(new Option(opttext, optval), null);
        }
    }
}
