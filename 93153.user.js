// ==UserScript==
// @name          MusicBrainz: Edit ARs using entity IDs
// @description	  Allows specifying entity IDs in the lookup boxes when editing an AR.
// @namespace     http://userscripts.org/users/266906
// @author        Michael Wiencek <mwtuea@gmail.com>
// @version       1.0
// @license       GPL
// @include       http://musicbrainz.org/edit/relationship/edit.html?type=*&id=*
// ==/UserScript==

function allowEntityIDs() {

    var button = document.createElement("button");
    // Greasemonkey only works with addEventListener, but we don't want multiple
    // click events attached to the button. buttonEvent keeps track of the last
    // added event, so that we can remove it when adding a new one.
    var buttonEvent = null;

    if (typeof unsafeWindow == "undefined")
        unsafeWindow = window;

    // Defined at:
    // http://musicbrainz.org/scripts/jsselect.js
    // http://musicbrainz.org/scripts/ar-frontend.js
    var jsselect = unsafeWindow.jsselect;
    var arfrontend = unsafeWindow.arfrontend;

    // Append the button to the UI.
    jsselect.selectbox
        .getElementsByClassName("ajaxSelectButtonBox")[0]
        .appendChild(button);

    // Returns true if str is a number.
    function isNum(str) {
        return str.match(/^[0-9]+$/) ? true : false;
    }

    // Removes any click event registered on the button.
    function removeButtonEvent() {
        if (buttonEvent != null) {
            button.removeEventListener("click", buttonEvent, true);
            buttonEvent = null;
        }
    }

    // Inserts "[Type] ID: " before entity links.
    function formatLink(container, type) {
        var span = container.firstChild;
        var a = span.firstChild;
        var txt = document.createTextNode(type + " ID: ");
        span.insertBefore(txt, a);
    }

    // Two entities on the page: 0 and 1.
    for (var i = 0; i <= 1; i++) {(function (n) {

        // Get the entity's type, and capitalize the first letter.
        var type = document.getElementById("link" + n + "type").value;
        if (type == "album")
            type = "release";
        type = type.charAt(0).toUpperCase() + type.slice(1);

        // We can't edit URLs.
        if (type == "url")
            return;

        var container = document.getElementById("AR_ENTITY_" + n);
        var linkedit = document.getElementById("_linkedit" + n);
        var linkeditimg = document.getElementById("_linkeditimg" + n);
        var link = document.getElementById("link" + n);
        var linkname = document.getElementById("link" + n + "name");

        // linkeditimg is the small button that toggles the input field.
        linkeditimg.addEventListener("click", function() {

            // This is true when linkeditimg has been toggled off.
            if (linkedit.value == 0) {

                // Iffy way to check that we were using an entity ID.
                if (link.value == linkname.value)
                    formatLink(container, type);

                removeButtonEvent();

            } else {

                // Grab the input field that appeared.
                var input = container.getElementsByTagName("input")[0];

                // Disables our button as long as the input is not a number.
                input.addEventListener("keyup", function() {
                    button.disabled = !isNum(this.value);
                }, true);

                // We need to change the context of the button after input
                // focus. Having both entity inputs visible and alternating
                // focus would break things otherwise.
                input.addEventListener("focus", function() {
                    removeButtonEvent();

                    var click = function() {
                        var id = input.value;

                        if (isNum(id)) {
                            arfrontend.setEntity(n, {id: id, name: id});
                            formatLink(container, type);
                            jsselect.hide(true);
                            removeButtonEvent();
                        }
                    };

                    buttonEvent = click;
                    button.addEventListener("click", click, true);
                    button.textContent = "Use " + type + " ID";
                    button.disabled = !isNum(this.value);

                }, true);

            }

        }, true);

    })(i);}
}

if (window.chrome) {
    // Escape Chrome's "sandbox" to get a hold of jsselect and arfrontend.
    var script = document.createElement("script");
    script.appendChild(document.createTextNode("(" + allowEntityIDs + ")();"));
    document.body.appendChild(script);
} else {
    // Fix Firefox executing the script too early.
    window.addEventListener("load", allowEntityIDs, true);
}
