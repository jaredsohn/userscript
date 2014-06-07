
// ==UserScript==
// @name del.icio.us Search via JavaScript Prompt
// @namespace http://benschmaus.com/greasemonkey
// @description Enables you to perform a del.icio.us search from any web page via JavaScript prompt.
// ==/UserScript==

(
function() {
    // Change this to your del.icio.us user name.
    var userName = 'benjamin.schmaus';

    // Change this if you'd like to use a different key to launch
    // the prompt box.
    var yourAccessKey = "Z";

    var url = 'http://del.icio.us/';

    function bes_keyUpHandler(event) {
        if (event.keyCode == yourAccessKey.charCodeAt(0)) {
            //alert("Going to search del.icio.us");
            bes_displayPrompt();
        }
    }

    function bes_displayPrompt() {
        var searchTag = prompt('del.icio.us Query');
        if (searchTag != null) {
            var query = 'tag/' + searchTag;
            if (searchTag.search(/^me:/) != -1) {
                var arSearch = searchTag.split(':');
                query = userName + '/' + arSearch[1];
            }
            window.location = url + query;
        }
    }
    document.addEventListener("keyup", bes_keyUpHandler, false);

})();
