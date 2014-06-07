// Skandiabanken Greasemonkey script
// version 0.02 Beta
// Richard H. Tingstad
//
// All statement entries with similar text (not counting preceeding dates),
// are grouped together in one row. Alle the entries' amounts are added
// together.
//
// 20090512 0.02 Checkbox to enable/disable grouping. Remembers choice.
// 20090511 0.01 Initial version.
//
// ==UserScript==
// @name           Skandiabanken statement
// @namespace      http://drop.by
// @description    Groups (sums) statement entries to/from same recipient/receiver.
// @include        https://secure.skandiabanken.no/SKBSECURE/Bank/Account/Statement/*
// ==/UserScript==
(function () {
    var table = document.getElementById(
        "ctl00_MainContentPlaceHolder_ucTransList_boxListTransactions_gridSimpleTransactionList");
    var offset = 0;
    if (table == null) {
        table = document.getElementById(
            "ctl00_MainContentPlaceHolder_ucTransList_boxListTransactions_gridTransactionList");
        offset = 1; //Seems there is one extra TD far to the left here.
    }
    if (table == null) return;

    var enabled = getValue("groupEnabled");
    if (enabled == null) {
        enabled = true;
        setValue("groupEnabled", enabled);
    }

    var rows = table.childNodes;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].tagName == "TBODY") {
            rows = rows[i].childNodes;
            break;
        }
    }
    for (i = 0; i < rows.length; i++) {
        if (rows[i].tagName == "TR") {
            var tr = document.createElement("tr");
            tr.setAttribute("id", "greasemonkey");
            var e = document.createElement("td");
            e.setAttribute("colspan", (6 + offset));
            e.appendChild(document.createTextNode("Grupper like rader "));
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            if (enabled) input.checked = true;
            input.addEventListener("click", toggle, false);
            e.appendChild(input);
            tr.appendChild(e);
            rows[i].parentNode.insertBefore(tr, rows[i]);
            break;
        }
    }
    if (enabled) {
        group();
    }
    return; //Only functions below here.

    /**
     * Group rows.
     */
    function group() {
        for (i = 0; i < rows.length; i++) {
            if (rows[i].tagName == "TR") {
                if (rows[i].getAttribute("id") == "greasemonkey") continue;
                var c = new Array(); //Column indexes.
                var p = 0;
                for (var j = 0; j < rows[i].childNodes.length; j++) {
                    if (rows[i].childNodes[j].tagName == "TD") {
                        c[p++] = j + offset;
                    }
                }
                var txt = rows[i].childNodes[c[3]].textContent
                    .replace(/\s+$/g, "").replace(/^\s+/g, "")
                    .replace(/^[0-9]{1,2}\.[0-9]{2} /, "");
                var k = 1; //Count rows in group.
                for (j = rows.length - 1; j > i; j--) {
                    if (rows[j].tagName != "TR") continue;
                    var t = rows[j].childNodes[c[3]].textContent
                        .replace(/\s+$/g, "").replace(/^\s+/g, "")
                        .replace(/^[0-9]{1,2}\.[0-9]{2} /, "");
                    if (txt == t) { //The two rows can be grouped.
                        k++;
                        for (p = 4; p < 6; p++) { //Outgoing and incoming $$$.
                            var n = parseFloat(rows[i].childNodes[c[p]]
                                .innerHTML.replace(",", ".")
                                .replace(/[^0-9.]+/g, "")) +
                                parseFloat(rows[j].childNodes[c[p]].innerHTML
                                .replace(",", ".").replace(/[^0-9.]+/g, ""));
                            if (!isNaN(n)) {
                                n = n.toFixed(2).replace(".", ","); //Fix decimals.
                                n = n.split("").reverse().join(""); //Reversed str.
                                while (n.search("[0-9]{4}") > -1) //Thousands separ.
                                    n = n.replace(/([0-9]{3})([0-9])/, "$1 $2");
                                n = n.split("").reverse().join(""); //Reverse back.
                                rows[i].childNodes[c[p]].innerHTML = n;
                            }
                        }
                        rows[j].parentNode.removeChild(rows[j]);
                    }
                }
                if (k > 1) {
                    rows[i].childNodes[c[0]].innerHTML = "&nbsp;";
                    rows[i].childNodes[c[1]].innerHTML = "&nbsp;";
                    rows[i].childNodes[c[3]].innerHTML = txt;
                    if (rows[i].childNodes[c[4]].innerHTML.search("[0-9]") > -1)
                        rows[i].childNodes[c[4]].innerHTML = "(" + k + " stk.) "
                            + rows[i].childNodes[c[4]].innerHTML;
                    else
                        rows[i].childNodes[c[5]].innerHTML = "(" + k + " stk.) "
                            + rows[i].childNodes[c[5]].innerHTML;
                }
            }
        }
    }

    function toggle() {
        if (this.checked) {
            enabled = true;
            setValue("groupEnabled", enabled);
            group();
        }
        else {
            enabled = false;
            setValue("groupEnabled", enabled);
            location.reload();
        }
    }

    function setValue(name, value) {
        if (typeof GM_setValue == 'function') {
            GM_setValue(name, value);
        }
        else {
            var date = new Date();
            date.setTime(date.getTime()+8640000000); //100 days
            document.cookie = name + "=" + value + "; expires="
                + date.toGMTString() +"; path=/";
        }
    }

    function getValue(name) {
        if (typeof GM_getValue == 'function') {
            return GM_getValue(name);
        }
        var v = document.cookie;
        v = v.substr(v.indexOf(name + "=") + name.length + 2);
        v = v.substring(0, v.indexOf(";"));
        return v;
    }

})();
