
// ==UserScript==
// @name Yahoo Mail Extras
// @namespace http://benschmaus.com/greasemonkey
// @description Undisplays advertisements in Yahoo mail and adds an 'extras' toolbar.
// @include http://*.mail.yahoo.com/*
// ==/UserScript==

(
function() {
    // We only want to run this script in the main frame
    // (the window named 'ymailman').
    if ((self.name == 'ymailmain') || (top.frames.length == 0)) {
        //alert('Current window name is ymailmain');
        var topBannerDiv = document.getElementById('northbanner');
        if (topBannerDiv != null) {
            //alert('Top ad banner div is not null, undisplaying ad. . .');
            //alert(topBannerDiv);
            topBannerDiv.style.display = 'none';
        }
        var leftBannerAdContainer = document.getElementById('leftnavad');
        //alert('Left banner ad container: ' + leftBannerAdContainer);
        if (leftBannerAdContainer != null) {
            //alert('Left banner div not null, undisplaying ad. . .');
            leftBannerAdContainer.style.display = 'none';
        } else {
            //alert('Left banner div is null.');
        }
        var bottomBannerAdContainer = document.getElementById('swads');
        //alert('Bottom banner ad container: ' + bottomBannerAdContainer);
        if (bottomBannerAdContainer != null) {
            //alert('Bottom banner div not null, undisplaying ad. . .');
            bottomBannerAdContainer.style.display = 'none';
        } else {
            //alert('Bottom banner div is null.');
        }
        var fontElements = document.getElementsByTagName('font');
        for (var i = 0; i < fontElements.length; i++) {
            var fontEl = fontElements[i];
            //alert(fontEl.firstChild.data);
            if (fontEl.firstChild.data == 'ADVERTISEMENT') {
                // The table element that contains the ad.
                var adContainer = fontEl.parentNode.parentNode.parentNode;
                //alert("Ad container element: " + adContainer);
                adContainer.style.display = 'none';
            }
        }
        var centerAd = document.getElementsByTagName("center").item(0);
        if (centerAd != null) {
            centerAd.style.display = 'none';
        }

        // Adds "Check Unread" and "Clear Unread" links in a toolbar.
        // These buttons select and unselect only messages that are unread.
        window.addEventListener(
            'load',
            function(e) {
                var folderNameContainer = document.getElementsByTagName("h2").item(0);
                if (folderNameContainer != null &&
                    // don't put toolbar on the welcome screen
                    folderNameContainer.firstChild.data.indexOf('Welcome, ') == -1
                ) {
                    //alert(folderNameContainer.innerHTML);
                    var extrasContainer = folderNameContainer.parentNode;
                    var curHtml = extrasContainer.innerHTML;
                    extrasContainer.innerHTML =
                        "<div style='width:400px;margin-top:5px;margin-bottom:5px;" +
                        "padding:2px;border:1px solid #999;text-align:left;" +
                        "background:#ccc'>" +
                        "<b>Yahoo Mail Extras:</b> " +
                        "<a href='javascript:schmausb_toggleReadMsgs(true);" +
                        "'>Check Unread</a> - " +
                        "<a href='javascript:schmausb_toggleReadMsgs(false);'>" +
                        "Clear Unread</a></div>" + curHtml;
                }
            },
            false
        );
        window.schmausb_toggleReadMsgs = function(checkState) {
            //alert('Running schmausb_checkReadMsgs()');
            var trs = document.getElementsByTagName("tr");
            for (var i = 0; i < trs.length; i++) {
                var tr = trs[i];
                // New messages are contained inside a table
                // row with a class of 'msgnew'.
                if (tr.getAttribute('class') == 'msgnew') {
                    // We get all the form inputs contained inside
                    // of the row, and we check the first checkbox we
                    // find.
                    var inputs = tr.getElementsByTagName('input');
                    //alert(inputs[0]);
                    if (inputs[0].type == 'checkbox') {
                        inputs[0].checked = checkState;
                    }
                }
            }
        }
    }
}
)();
