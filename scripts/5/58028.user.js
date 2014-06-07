// ==UserScript==
// @name           Earthlink Webmail Preview Message Fullscreen
// @namespace      LeCapitan
// @include        https://webmail.b.earthlink.net/wam/index.jsp*
// ==/UserScript==

window.addEventListener(
    "load",
    function(e)
    {
        var messageTable = document.getElementById('msgListTable60');
        messageTable.height = 200;
        var messageFrame = document.getElementById('iePreview60');
        messageFrame.height = window.innerHeight - 284;
        var mainDiv = document.getElementById('webmail_main_content');
        mainDiv.insertBefore(document.createElement('hr'), messageFrame);
    },
    false);