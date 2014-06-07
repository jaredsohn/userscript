// ==UserScript==
// @name          Yahoo! Mail Keyboard Shortcuts
// @namespace     http://www.scdi.org/~avernet
// @description	  Yahoo! Mail Enhancements
// @include       http://*.mail.yahoo.com/ym/ShowLetter*
// ==/UserScript==

(function() {
    var nextLink;
    var previousLink;
    var backToMessagesLink;

    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].firstChild.nodeValue == "Next") {
            nextLink = links[i];
        } else if (links[i].firstChild.nodeValue == "Previous") {
            previousLink = links[i];
        } else if (links[i].firstChild.nodeValue == "Back to Messages") {
            backToMessagesLink = links[i];
        }
    }

    function keyUp(event) {
        if (!event) var event = window.event;
        if (event.keyCode == "N".charCodeAt(0)) {
            window.location = nextLink.href;
        } else if (event.keyCode == "P".charCodeAt(0)) {
            window.location = previousLink.href;
        } else if (event.keyCode == "B".charCodeAt(0)) {
            window.location = backToMessagesLink.href;
        } else if (event.keyCode == "R".charCodeAt(0)) {
            if (event.shiftKey) {
                doInstacomposeReplyAll();
            } else {
                doInstacomposeReply()
            }
        }
        //document.body.innerHTML += event.keyCode;
    }

    // Add help at the end of the page
    function addHelp() {
        document.body.innerHTML += "<p style='font-size: 10px; text-align: center'>"
            + "p: previous message | n: next message | b: back to message<br>"
            + "r: reply | R: reply all"
            + "</p>";
    }

    document.addEventListener("keyup", keyUp, false);
    addHelp();
})();
