// ==UserScript==
// @name       facebook Photo Theater Killer
// @namespace  http://www.facebook.com/
// @version    2.1
// @description  Kills the annoying (IMHO) new photo theater on facebook. Instead loads the old photo viewer, as long as facebook keeps it running. This has been tested in Chrome with the Tampermonkey extension. Feel free to test and modify to make it work as need be.
// @description  2.1: Fixed an issue in newer versions of Firefox/Greasemonkey that caused the script to error out.
// @description  2.0: Added some functionality to capture the click before it can launch the theater. The theater still OCCASIONALLY shows up, but not as often as before.
// @include    http://*facebook.com/*
// @include    https://*facebook.com/*
// @copyright  2011+, David Harvey
// @license    GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function () {
        linkModifier();
        checkForPhotoTheater();
    })();

        function linkModifier() {
            var anchors = document.getElementsByTagName('a');
            for(i = 0; i < anchors.length; i++)
            {
                var currentAnchor = anchors[i];
                if(currentAnchor != null && (currentAnchor.rel == "theater" || currentAnchor.className.match(/uiMediaThumb|uiPhotoThumb/)))
                {
                    currentAnchor.addEventListener("click", function(e)
                    {
                        if (!e)
                            e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation)
                            e.stopPropagation();
                        window.location.assign(this.href);
                        return false;
                    }, false);
                }
            }

            anchor_count = anchors.length;
            setTimeout(linkModifier, 5000);
        }

        function checkForPhotoTheater() {
            var fbPhotoTheater = document.getElementById('fbPhotoTheater');
            if (fbPhotoTheater != null && window.getComputedStyle(fbPhotoTheater, null).display == "block")
            {
                fbPhotoTheater.style.display = "none";
                if (document.body != null && document.body.baseURI != null && document.body.baseURI.match(/(\?|&)theater(&|$)/i))
                {
                    window.location.replace(document.body.baseURI.replace(/(\?theater$)|(&theater$)|((&)theater&)/, "$4"));
                }
                else if (window.location != null && window.location.href != null && window.location.href.match(/(\?|&)theater(&|$)/i))
                {
                    window.location.replace(window.location.href.replace(/(\?theater$)|(&theater$)|((&)theater&)/, "$4").replace(/(facebook\.com\/).*#!\//i, "$1"));
                }
                else
                    setTimeout(checkForPhotoTheater, 100);
            }
            else
            {
                if (fbPhotoTheater != null && document.body != null && document.body.baseURI != null && document.body.baseURI.match(/(\?|&)theater(&|$)/i))
                {
                    window.location.replace(document.body.baseURI.replace(/(\?theater$)|(&theater$)|((&)theater&)/, "$4"));
                }
                else if (window.location != null && window.location.href != null && window.location.href.match(/(\?|&)theater(&|$)/i))
                {
                    window.location.replace(window.location.href.replace(/(\?theater$)|(&theater$)|((&)theater&)/, "$4").replace(/(facebook\.com\/).*#!\//i, "$1"));
                }
                else
                    setTimeout(checkForPhotoTheater, 100);
            }
        }