// ==UserScript==
// @name           Reddit - NSFW toggle button
// @namespace      http://userscripts.org/scripts/show/106810
// @author         gavin19
// @description    Adds a NSFW button to switch NSFW on or off.
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/* 
// @exclude        http://*.reddit.com/*/*/comments/*
// @exclude        https://*.reddit.com/*/*/comments/*
// @version        1.2
// ==/UserScript==
(function () {
    var nsfwToggle = {

        createNSFWButton: function () {
            var parentDiv = document.querySelector('#header-bottom-right .flat-list');
            var dv = document.createElement("span");
            dv.setAttribute("id", "nsfwSpan");
            dv.innerHTML = '<button type="button" style="border:0 none;font-size:100%;" id="nsfwButton" value=" NSFW ">NSFW</button> | ';
            parentDiv.parentNode.insertBefore(dv, parentDiv);
        },
        setNSFW: function (nsfwValue, nsfwDisplay) {
            var over18 = document.querySelectorAll('.linklisting .over18');
            if (over18.length > 0) {
                for (var x = 0, leno = over18.length; x < leno; x += 1) {
                    over18[x].setAttribute('style', 'display :' + nsfwDisplay);
                }
            }
            document.querySelector('#nsfwButton').textContent = nsfwValue;
        },
        addListener: function () {
            document.querySelector('#nsfwButton').addEventListener('click', function () {
                if (this.textContent === "NSFW") {
                    nsfwToggle.setNSFW("SFW", "none");
                } else {
                    nsfwToggle.setNSFW("NSFW", "block");
                }
            });
        },
        init: function () {
            this.createNSFWButton();
            this.addListener();
            document.body.addEventListener('DOMNodeInserted', function (event) {
                if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') != -1)) {
                    var nsfwVal = document.querySelector('#nsfwButton').textContent;
                    if ((typeof (nsfwVal) === "undefined") || (nsfwVal === "NSFW")) {
                        nsfwToggle.setNSFW("NSFW", "block");
                    } else {
                        nsfwToggle.setNSFW("SFW", "none");
                    }
                }
            }, true);
        }
    };
    if (document.body && document.querySelector('.listing-page:not(.profile-page)')) {
        setTimeout(function () {
            nsfwToggle.init();
        }, 300);
    }
}());