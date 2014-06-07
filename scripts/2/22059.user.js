// vim: et tw=80 ts=4 sw=4 ai

// ==UserScript==
// @name           Seattle Public Library Rename Change Status Button
// @description    Changes the "Change Status" button to reflect what action it will take.
// @namespace      http://www.arthaey.com
// @include        https://catalog.spl.org/ipac20/ipac.jsp?*submenu=holds*
// @author         Arthaey Angosii
// @version        1.1
// ==/UserScript==
//
// CHANGELOG:
//  v1.1 - highlight selected rows
//  v1.0 - initial release

window.addEventListener("load", function() {

    var button = document.getElementsByName("changestatus")[0];

    var unsuspend = 0;
    var suspend = 0;

    function run() {
        GM_addStyle("tr.selected * { background-color: lightyellow !important; }");

        updateButton();

        var checkboxes = document.getElementsByName("waitingholdselected");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener(
                "change",
                checkStatusFunc(checkboxes[i], i),
                true
            );
        }
    }

    function checkStatusFunc(checkbox, i) {
        return function() {
            var row = checkbox.parentNode.parentNode;
            var status = row.childNodes[3].textContent;

            if (status.match(/suspend/i)) {
                unsuspend += (checkbox.checked ? 1 : -1);
            }
            else if (status.match(/active/i)) {
                suspend += (checkbox.checked ? 1 : -1);
            }

            row.className = (checkbox.checked ? "selected" : null );
            console.log("Row class name: " + row.className);

            updateButton();
        }
    }

    function updateButton() {
        button.style.backgroundColor = null;

        if (suspend && unsuspend) {
            button.value = "Mixed Status!";
            button.style.backgroundColor = "red !important";
        }
        else if (suspend) {
            button.value = "Suspend";
        }
        else if (unsuspend) {
            button.value = "Activate";
        }
        else {
            button.value = "Toggle Status";
        }
    }

    run();

}, true);
