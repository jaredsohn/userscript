// ==UserScript==
// @name           Chrome Web Store Download for Opera
// @namespace      https://addons.opera.com/en/addons/extensions/details/chrome-web-store-download-for-opera/1.1/?display=en
// @description    This extension adds a download link to the Chrome Web Store Extensions pages.
// @version        1.1
// @author         maxart
// @include     https://chrome.google.com/*
// ==/UserScript==

(function ()
{
    window.addEventListener('DOMContentLoaded', function ()
    {
        var appId = window.location.pathname.split('/')[3];
        if (appId != undefined)
        {
            var downloadUrl = "https://clients2.google.com/service/update2/crx?response=redirect&x=id%3DREPLACEME%26uc%26lang%3Den&prod=chrome&prodversion=5.0.375.99";
            downloadUrl = downloadUrl.replace("REPLACEME", appId);
            var el = document.getElementById("cx-install-free-btn");
            el.style.display = 'none';
            var section = document.getElementById("cwspage");
            section.className = section.className.replace(/\bcx-cannot-install\b/, '')
            var elParent = document.querySelectorAll('.detail-actions');
            var newEl = document.createElement('a');
            newEl.setAttribute('href', downloadUrl);
            newEl.setAttribute('id', "cx-install-free-btn");
            newEl.setAttribute('class', "detail-action-btn");
            newEl.innerHTML = "<span id='cx-install-free-text'>Download .crx</span>";
            el.parentNode.appendChild(newEl);
        }
    }, false);
})();