/*
    Make textareas textilable.
    (c) Roberto De Almeida, roberto@dealmeida.net
    http://dealmeida.net/

    This script makes all textareas in a website textilable. Just mouse
    over a textarea for some time and a small button will pop on the top
    left corner. Press the button and the text will be converted using the
    Textile syntax through a CGI Python script running on my server.
    
    If you are concerned with security and/or privacy you should run your
    own CGI script on your server. The script can be found here

        http://dealmeida.net/code/textilable.py.txt

    and it depends on Python and my PyTextile module.

    This code is distributed according to the GPL. The popup window code
    was copied^H^H^H^H^H^Hinspired by the Zoom Image script:

        http://www.smartmenus.org/down/zoom-image.user.js
*/

// ==UserScript==
// @name            Textilable (2005-07-13)
// @namespace       http://dealmeida.net
// @description     Make textareas textilable.
// @include         http://*
// @include         https://*
// ==/UserScript==

(function() {

    var treshold = 12;
    var delay = 1.2;
    var to;

    function init() {
        var textareas = window._content.document.getElementsByTagName("textarea");

        // Add menu handlers for each textarea.
        var i;
        for (i = 0; i < textareas.length; i++) {
            // Add event.
            textareas[i].addEventListener("mouseover", function(){handler(this)}, false);
            textareas[i].addEventListener("mouseout", function(){hideMenu(this)}, false);

            // Add id.
            if (!textareas[i].getAttribute("id")) textareas[i].setAttribute("id", "__textarea_" + i);
        }
    }

    function handler(textarea) {
        // Only show menu if we have a few characters.
        if (textarea.value.length > treshold) {
            to = setTimeout(function(){showMenu(textarea)}, delay*1000);
        }
    }

    function showMenu(textarea) {
        //alert(textarea.getAttribute("id"));
        var menuid = "__menu_" + textarea.id;
        var menu = window._content.document.getElementById(menuid);
        if (!menu) {
            menu = buildMenu(textarea);
        }
        menu.style.visibility = "visible";
    }

    function buildMenu(textarea) {
        var menuid = "__menu_" + textarea.id;
        var menu = window._content.document.createElement("div");
        menu.setAttribute("id", menuid);
        menu.addEventListener("mouseover", function(){showMenu(textarea)}, false);

        // Style button.
        with (menu.style) {
            background = "#eee";
            border = "1px solid";
            borderColor = "#ffffdd #857A4A #857A4A #ffffdd";
            font = "normal 10px sans-serif";
            margin = "0";
            padding = "0.2em";
            position = "absolute";
            left = textarea.offsetLeft + "px";
            top = textarea.offsetTop + "px";
            zIndex = 10000000;
        }
        
        // Add link.
        var link = window._content.document.createElement("a");
        var text = window._content.document.createTextNode("Textile this textarea");
        link.style.cursor = "pointer";
        link.addEventListener("click", function(){textile(textarea)}, false);
        link.appendChild(text);
        menu.appendChild(link);

        textarea.appendChild(menu);
        //window._content.document.body.appendChild(menu);
        return menu;
    }

    function hideMenu(textarea) {
        // Clear timeout.
        if (to) {
            clearTimeout(to);
            to = 0;
        }

        // Hide menu.
        var menu = window._content.document.getElementById("__menu_" + textarea.id);
        if (menu) menu.style.visibility = "hidden";
    }

    function textile(textarea) {
        var script = document.createElement("script");
        script.setAttribute("src", "http://dealmeida.net/textilable.cgi?id=" + textarea.id + "&text=" + escape(textarea.value));
        script.setAttribute("type", "text/javascript");

        // Attach script that does the conversion.
        var head = window._content.document.getElementsByTagName("head");
        head[0].appendChild(script);
    }

    init();

})();
