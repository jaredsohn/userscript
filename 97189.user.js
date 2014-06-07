// ==UserScript==
// @name       Alte Facebook-Foto anzeige
// @namespace  http://www.facebook.com/
// @description  Alte Facebook Foto anzeige
// @description  2.0.1: Fixed the timeout on the script to check the links for updating.
// @description  2.0: Added some functionality to capture the click before it can launch the theater. The theater still OCCASIONALLY shows up, but not as often as before.
// @description  1.1: Fixed an instance that I saw where it was merely hiding the theater, not reloading into the album.
// @include    http://*facebook.com/*
// @include    https://*facebook.com/*
// @author     Christopher Ram
// ==/UserScript==

(function () {
        linkModifier();
        checkForPhotoTheater();
    })();

        function linkModifier() {
            var anchors = document.getElementsByTagName('a');
            for(i = 0; i < anchors.length; i++)
                if(anchors[i].className.match(/uiMediaThumb|uiPhotoThumb/))
                    anchors[i].onclick = function(e)
                    {
                        if (!e)
                            e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation)
                            e.stopPropagation();
                        window.location.assign(this.href);
                        return false;
                }

            anchor_count = anchors.length;
            setTimeout(linkModifier, 500);
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