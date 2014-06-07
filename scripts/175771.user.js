// ==UserScript==
// @name                Sortable Time in Audible Wishlist
// @description         Adds a time column to each page of the Audible Wishlist.
// @version             1.0.2
// @author              Michael Sergio <mikeserg@gmail.com>
// @namespace           https://github.com/michaelsergio/Sortable-Time-in-Audible-Wishlist
// @include             /http://www.audible.com/wl*/
// @grant               none
// @icon                http://www.audible.com/favicon.ico
// ==/UserScript==

/*jslint browser: true, white:true, devel:true, browser:true */


(function() {
    "use strict";

    var HEADER_NAME = "Time",
        EXT_NAME = "adbl-ext-time",
        COL_NUM = 7,
        sortDesc = false;

    function timeMakeInt(a) {
        var ahr, amin;
        ahr = (a.match(/(\d+) hr/) || 0)[1] || 0;
        amin = (a.match(/(\d+) min/) || 0)[1] || 0;
        return parseInt(ahr, 10) + parseInt(amin, 10) * 0.01; // Number should have float place in range .0 - .59
    }

    function timeTextComparator(a, b) {
        var aNum = timeMakeInt(a),
            bNum = timeMakeInt(b);

        if (aNum === bNum) { return 0; }
        return aNum < bNum ? -1 : 1;

    }

    function sortTable(table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            if (a.cells[col].textContent === HEADER_NAME) { return -1; }
            return reverse // `-1 *` if want opposite order
                * timeTextComparator(a.cells[col].textContent.trim(),
                                     b.cells[col].textContent.trim());
        });
        for (i = 0; i < tr.length; i += 1) {
            // append each row in order
            // 0 is the header, so the odd numbered rows are 'even'
            if (i % 2 == 1) tr[i].classList.add("adbl-even");
            else tr[i].classList.remove("adbl-even");
            tb.appendChild(tr[i]);
        }
    }

    function audibleParse() {
        var wishlist = document.getElementsByTagName("table")[1],
            all_rows = wishlist.getElementsByTagName('tr'),
            length = all_rows.length,
            i,
            row,
            linkDiv,
            header,
            url,
            xhr,
            cell;
        for (i = 0; i < length; i += 1) {
            row = all_rows[i];
            linkDiv = row.getElementsByClassName('adbl-prod-title');
            if (linkDiv.length === 0) {
                console.log("creating time");
                console.log(row);
                
                header = document.createElement("th");
                header.innerHTML = '<a class="adbl-link" href="#!">' + HEADER_NAME + '</a>';
                header.id = EXT_NAME;

                header.onclick = function() {
                    sortTable(wishlist, COL_NUM, sortDesc);
                    sortDesc = !sortDesc;
                    return false;
                };
                row.appendChild(header);
            }
            else {
                url = linkDiv[0].getElementsByTagName('a')[0].href;
                console.log(url);
                //get links

                xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    console.log("loaded " + url);
                    cell = this.theRow.insertCell(-1);
                    cell.className = 'adbl-col-7';
                    cell.innerHTML = this.responseXML.getElementsByClassName('adbl-run-time')[0].textContent;
                };
                xhr.onerror = function() {
                    var message = "error loading " + url;
                    console.log(message);
                    //var elem = document.getElementById('mast-member-acct');
                    //elem.innerHTML = message;
                };
                
                xhr.theRow = row;
                xhr.open("get", url, true);
                xhr.responseType = 'document';
                console.log("the request:");
                console.log(xhr);
                xhr.send();
            }           
        }

    }



    //window.addEventListener("load", audibleParse, false);
    audibleParse();

})();
