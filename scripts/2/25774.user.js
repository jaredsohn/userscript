// ==UserScript==
// @name          smugmug_move_photos
// @namespace     http://rahdeck.smugmug.com/
// @description   allows to select full rows in move photo tool
// @include       http://*.smugmug.com/*tool=splitbulk
// ==/UserScript==
window.addEventListener("load", function() {
    var photos_rows = document.evaluate("//td[@align='left']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var begin = 0;

    function selectFromTo(imageFrom, imageTo) {
            imageFrom = parseInt(imageFrom);
            imageTo = parseInt(imageTo);
            for (var i = imageFrom; i <= imageTo; i++) {
                unsafeWindow.select(i);
            }
    };

    for (var i = 1; i < photos_rows.snapshotLength; i++) {
        var start = begin;
        var end = start + 5;
        var button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('class','buttons');
        button.setAttribute('value','Select All in Row');
        button.setAttribute('start',start);
        button.setAttribute('end',end);
        button.selected = false;
        thisPhoto = photos_rows.snapshotItem(i);
        nextTd = thisPhoto.nextSibling;
        nextTd.parentNode.insertBefore(button, nextTd.nextSibling);
        button.addEventListener("click", function(e) { selectFromTo(e.target.getAttribute('start'), e.target.getAttribute('end')); }, false);
        button.addEventListener("click", function(e) {
            if (e.target.selected == true) {
                e.target.value = "Select All in Row";
                e.target.selected = false;
            } else {
                e.target.value = "Unselect All in Row";
                e.target.selected = true;
            }
        }, false);
        begin += 6;
    }
}, false);