// ==UserScript==
// @name           facebook.com - Mike it!
// @version        1.3.6
// @description    To se mi líbí -> Mike it
// @namespace      http://Kub4jz.cz
// @author         Kub4jz.cz <kub4jz@gmail.com>

// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://www.facebook.com/*

// @exclude        http://*.facebook.com/login.php
// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http://apps.facebook.com/*
// @exclude        http://*.facebook.com/apps/*
// ==/UserScript==

(function(d){

    const DEBUG = false;

    const script_id = 90059;
    const script_version = '1.3.6';

    /* replaced elements class name */
    const gm_class = ' gm_mike_it';


    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
            GM_log(text);
        }
        return false;
    }


    function g(id, parent)
    {
        if (id && typeof id === 'string') {
            var p = parent||d;
            id = p.querySelectorAll(id);
        }
        return id||null;
    }


    function generateButtons()
    {
        var links = g('button.as_link > span.default_message,'
                     +'.UIActionLinks.UIActionLinks_bottom,'
                     +'.uiButtonText, .uiButton>input'
                     , d.getElementById('content'));

        var link, like_text;

        for (var i = 0; i < links.length; i++) {
            link = links[i];

            if (link.className.indexOf(gm_class) >= 0) {
                continue;
            }

            link.className += gm_class;

            var like_text = link.textContent;

            if (like_text == 'To se mi líbí' || like_text == 'Like') {
                link.innerHTML = link.innerHTML.replace(like_text, 'Mike it!');
            } else
            if (like_text == 'Už se mi to nelíbí' || like_text == 'Unlike') {
                link.innerHTML = link.innerHTML.replace(like_text, 'UnMike');
            } else
            if (link.value && (link.value == 'To se mi líbí' || link.value == 'Like')) {
                link.value = link.value.replace(new RegExp('(To se mi líbí|Like)'), 'Mike it!');
            }
        }

        editSentences();

        delete links, link, like_text, i;
        return false;
    }


    function editSentences()
    {
        var msgs = g('.uiUfiLike .UIImageBlock_Content,'
                    +'.uiStreamMessage.uiStreamPassive,' // fan pages
                    +'li.notification,' // notifikace
                    +'div.uiUnifiedStory' // profil
                    , d.getElementById('globalContainer'));

        var msg;

        for (var i = 0; i <= msgs.length - 1; i++) {
            msg = msgs.item(i);

            if (msg.className.indexOf(gm_class) >= 0) {
                continue;
            }

            msg.className += gm_class;

            msg.innerHTML = msg.innerHTML.replace('líbí', 'majkuje', 'gmi');
            msg.innerHTML = msg.innerHTML.replace('oblíbil', 'omajkoval', 'gmi');
            msg.innerHTML = msg.innerHTML.replace(' like', ' mike', 'gmi');
        }

        delete msgs, msg, i;
        return false;
    }

    /* Start script */
    generateButtons();

    setTimeout(function() {
        var t;
        d.getElementById('content').addEventListener('DOMNodeInserted', function () { clearTimeout(t); t = setTimeout(generateButtons, 100); }, false);
        /* notifikace */
        d.getElementById('jewelNotifs').addEventListener('DOMNodeInserted', function () { clearTimeout(t); t = setTimeout(editSentences, 100); }, false);
    }, 2000);

    /* AutoUpdater */
    if (typeof autoUpdate === 'function') {
        autoUpdate (script_id, script_version);
    }

})(document);
