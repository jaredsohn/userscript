// ==UserScript==
// @name           facebook.com - Muhammad Asri Reply button
// @version        1.7.8
// @description    Add a reply button to comments Facebook
// @namespace      Kub4jz.cz
// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http*://www.facebook.com/*
// @match          http*://www.facebook.com/*

// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http://apps.facebook.com/*
// @exclude        http://*facebook.com/apps/*

// ==/UserScript==

(function(d){

    const DEBUG = false;

    const script_id = 49378;
    const script_version = '1.7.8';

    const gm_class = ' gm_reply_button';

    var button_text;
    var last_insert;

    // get lang
    const lang = d.getElementsByTagName('html')[0].getAttribute('lang');

    var text = new Array;
    text['en'] = 'Reply';
    text['cs'] = 'Reagovat';


    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
            GM_log(text);
        }
        return false;
    }


    function getButtonText()
    {
        return text[lang] ? text[lang] : text['en'];
    }

    function simulateKeyEvent(keyCodeArg, element)
    {
        var evt = document.createEvent("KeyboardEvent");
                  evt.initKeyEvent ("keypress", true, true, window,
                  0, 0, 0, 0,
                  keyCodeArg, 0);

        element.dispatchEvent(evt);

        return false;
    }


    function insertName(evt)
    {
        var parent, link, string, first_name, insert_text, commentsWrapper, textarea, pretext, posttext;

        evt.preventDefault();

        try {
            parent = evt.target.parentNode.parentNode;

            link = parent.getElementsByClassName('actorName')[0];
            string = link.textContent;

            var name = new Array();
            name = string.split(' ');
            first_name = name[0];

            insert_text = '@' + first_name + ': ';

            commentsWrapper = parent.parentNode;

            var i = 0;
            while (i < 10 && commentsWrapper.tagName !== 'ul' && commentsWrapper.className.indexOf('uiList uiUfi') == -1) {
                commentsWrapper = commentsWrapper.parentNode;
                i++;
            }

            textarea = commentsWrapper.getElementsByTagName('textarea')[0];
            textarea.focus(); textarea.focus();

            if (textarea.value == '') last_insert = null;

            if (string != last_insert) { 
                pretext = textarea.value.substring(0, textarea.selectionStart);
                posttext = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
                textarea.value = pretext + insert_text + posttext;

                simulateKeyEvent(39, textarea);

                last_insert = string;
            }
        } catch (e) {
            log(e);
        }

        delete parent, link, string, first_name, insert_text, commentsWrapper, textarea, pretext, posttext;
        return false;
    }


    var divs_length_before = 0;

    function addButtons()
    {
        var divs = d.getElementsByClassName('commentActions');
        var div, button;

        for (i = 0; i <= divs.length-1; i++) {
            div = divs[i];

            if (div.className.indexOf(gm_class) >= 0) {
                if (button = div.getElementsByClassName('replyButton')[0])
                    button.addEventListener('click', insertName, false);

                continue;
            }

            div.className += gm_class;

            // create & add reply button
            button = d.createElement('a');
            button.setAttribute('class', 'replyButton');
            button.innerHTML = button_text;

            button.addEventListener('click', insertName, false);

            // add separator
            div.innerHTML += ' · ';

            div.insertBefore(button, null);
        }

        delete divs, div, button;
        return false;
    }

    /* Start Script */
    if (content = d.getElementById('content')) {
        button_text = getButtonText();
        addButtons();
        var t;
        content.addEventListener('DOMNodeInserted', function() { clearTimeout(t); t = setTimeout(addButtons, 125); }, false);
    }

    /* AutoUpdater */
    if (typeof autoUpdate == 'function') {
        autoUpdate (script_id, script_version);
    }

})(document);