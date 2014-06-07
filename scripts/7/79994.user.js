// ==UserScript==
// @name          Flickr On Black Button
// @description   Adds "Small On Black" and "Large On Black" button to a Flickr photo page
// @namespace     http://akikorhonen.org/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// Based upon the original by Simon Whitaker (simon AT netcetera DOT org)  that was based upon the original by Fabricio Zuardi (http://www.mamata.com.br/greasemonkey/)
// By Aki Korhonen (http://akikorhonen.org/)
// Edit by GeekShadow to work on last Flickr update
// ==/UserScript==

(
    function(){

        if (document.getElementById("photo-sidebar-report")) {

            pid = location.pathname.split('/')[3];
			
			var smallOnBlack_img = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAWCAIAAAAetxgyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWRJREFUeNrsV9uNhDAM3ABF8EMnNEId1EEXSLRCGUj80AISj4vOYuS18wBpdbpIOx+RbSbJZJYkrNn3/ZUOsldSSExuIfJ5ngPsqqr+kVyrNSwoSsiyt5/rOI7PyjXYalEpPhqXaIyh4DxPG9sWdYqJgFgTwkstdKltW6fQruucdYyb57mYkkRgDVy0YPrGlNgvTNNEQd/3ASZoHOcFWEuxbgEUORnYPYicDGEPnHxup1NldMzAG/+Zg4wmMBfuL5L4Ihb7NfLuClf4Fgkrxq4l9TaFTxSjgtTX97FcbOGo0MRutfwXiHXgJOi+POXtA7lRa+2ItGd9gnCk6Lroi/SZu03T4OBY1xXxTbO1MvLMOYJwVy/GK9ceqPqDoSjkLW1pT98Wn7t4dHPZb5ewxTAMdV37Zt22bRxH6722gUbnlvAA04vUR8YjbbARuVW8LItTblmWWusfw3z/TXzlJir3R4ABAOHAjrKuoOkEAAAAAElFTkSuQmCC";
			var largeOnBlack_img = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAWCAIAAAAetxgyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUVJREFUeNrsVt0NhCAMPg6H8MVNXMQ5nMMtTFzFMUx8cQUTjdccSW1KqXiX+yGxD6aFD/j4LAWzrustHbvfkrLE6GYsHsdRQRdF8Ud0gatO6BDwaTN41CKp6DBrLT27EMLXtTgfQ9bi90YlA1hd1yK0aZpTSiB1dGjINnZIdAc5G4bBOW3bKkiEiUYnDFGhyFBvyA4qw7Zt76Qa4+3rJ27jq4XMPk3ZACa0Q9JUVgYGc5fp6hxjTKScvh/69brw5+g6fsA1kmgytxr9iaIjAsQEwJB+T9A9lNYlHy2c/hoMEBqL4Tl1q6rCwjHPs1iY9PQVJRRnUI6XOGSnCwXVfzBkGb+lAfZaORNpKUKIQwxFd11XlmVo1WVZ+r4H7X0Z2I3FHHr22cUrgrHLF9iwGBhP0yTSzfPc5/qzJ871PL/opkX3IcAAek5nfIo4m1QAAAAASUVORK5CYII=";
			
            var containerA = document.createElement("div");
            var linkA = '<a style="background: #FFFFFF;" href="http://bighugelabs.com/flickr/onblack.php?id=' + pid + '" style="text-decoration: none;"><img src="'+smallOnBlack_img+'" alt="SmallOnBlack"></a>';
            containerA.innerHTML = linkA;
			
            addlInfo = document.evaluate("//a[contains(@id, 'flag-this-photo-link')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;
            addlInfo.appendChild(containerA);
			
			var containerA = document.createElement("div");
            var linkA = '<a style="background: #FFFFFF;" href="http://bighugelabs.com/flickr/onblack.php?id=' + pid + '&size=large" style="text-decoration: none;"><img src="'+largeOnBlack_img+'" alt="LargeOnBlack"></a>';
            containerA.innerHTML = linkA;
			
            addlInfo = document.evaluate("//a[contains(@id, 'flag-this-photo-link')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;
            addlInfo.appendChild(containerA);

        }
    }
)();
