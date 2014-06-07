// ==UserScript==
// @name       facebook Photo Theater Killer
// @namespace  http://www.facebook.com/
// @version    2.1
// @include    http://*facebook.com/*
// @include    https://*facebook.com/*
// @copyright  Ronald Carnate
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