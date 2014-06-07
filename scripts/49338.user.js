// ==UserScript==
// @name           facebook.com - Replace smileys
// @version        2.4.3
// @description    Replace text smileys as graphic (smileys are same as in facebook chat)
// @icon           http://userscripts.kub4jz.cz/smileys/icon.png

// @namespace      http://Kub4jz.cz
// @author         Kub4jz.cz <kub4jz@gmail.com>

// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*

// @exclude        htt*://*.facebook.com/login.php
// @exclude        htt*://*.facebook.com/sharer*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/l.php*

// @exclude        htt*://apps.facebook.com/*
// @exclude        htt*://*.facebook.com/apps/*

// @grant          GM_addStyle
// ==/UserScript==

var gm_fb_smileys = {

    script_id: 49338,
    script_version: '2.4.3',

    /* path of smileys img sprite */
    smileys_url: 'http://static.ak.fbcdn.net/images',

    /* replaced elements class name */
    gm_class: ' gm_smileys_replaced',


    init: function ()
    {
        /* Content (ajax wrapper) */
        this.content = GM.elements.getById('content');

        /* detect https */
        if (location.protocol == 'https:') {
            this.smileys_url = 'https://s-static.ak.fbcdn.net/images';
        }

        this.addCssStyles();
        this.findNodes(this.content);

        window.setTimeout(function () {
            if (this.content) {
                this.content.addEventListener(
                    'DOMNodeInserted',
                    gm_fb_smileys.onContentNodeInserted,
                    false
                );
            }

            if (!!(PhotoBox = GM.elements.getById('fbPhotoSnowlift'))) {
                PhotoBox.addEventListener(
                    'DOMNodeInserted',
                    gm_fb_smileys.onPhotoBoxNodeInserted,
                    false
                );
            }
        }, 2000);

        /* AutoUpdater */
        if (typeof autoUpdate === 'function') {
            autoUpdate(this.script_id, this.script_version);
        }

        console.info('Replace smileys initialized');
    },

    /**
     * Returns actual FB url
     * @return string
     */
    getLocation: function ()
    {
        /* get location (after #) */
        var loc = location.hash;

        if (loc.length === 0 || !new RegExp('#!/|sk=|ref=|php').test(loc)) {
            /* get pathname (after /) */
            loc = location.pathname.replace(/^[\/]+/, '');

            /* if not pathname get search (after ?) */
            if (loc.length === 0) {
                loc = location.search;
            }
        }

        return loc;
    },

    /**
     * generate RexExp of all smileys
     * @return RegExp
     */
    getSmileysRegexp: function ()
    {
      smileys_all = [];

      var smile;
      for (smile in this.smileys) {
          smileys_all.push(
              smile.replace(/[)(\^\*\.\|]/g, '\\$&').replace(/\u0000/g, '\\0')
          );
      }

      return new RegExp(smileys_all.join("|"), 'gm');
    },

    /**
     * Replace images instead of text
     * @param   DOM
     */
    replaceSmileys: function(el)
    {
        /* prevent duplication (facebook newly replace smileys in comments) */
        if (el.className.indexOf('emoticon') >= 0
            || el.className.indexOf('emote_text') >= 0
            || el.className.indexOf('emoticon_text') >= 0
            ||  el.className.indexOf(this.gm_class) >= 0
        ) {
            return;
        }

        el.className += this.gm_class;

        var parent_data = el.innerHTML;
        /* replace tags */
        parent_data = parent_data.replace('&gt;', '>', 'g').replace('&lt;', '<', 'g');

        /* check smileys */
        var matches = parent_data.match(this.getSmileysRegexp());

        if (!matches) return;

        /**
         * Element has smileys inside
         */
        var childs = el.childNodes,
            childs_length = childs.length;

        var child, data, html, matches_length, smile, smile_orig, alt, replace_img;

        for (var k = 0; k < childs_length; k++) {
            child = childs[k];

            /* only text nodes */
            if (child.nodeName != '#text') {
                if ((child.nodeName == 'DIV') ||
                    (child.nodeName == 'SPAN')
                ) {
                    this.replaceSmileys(child);
                }
                continue;
            }

            /* get value */
            data = child.nodeValue;

            var replacements = [];

            /* create node */
            html = document.createElement('span');

            matches_length = matches.length;
            for (var j = 0; j < matches_length; j++) {
                smile = matches[j];

                if (data.indexOf(smile) >= 0) {
                    smile_orig = smile;
                    smile_orig.replace(':', '\:');

                    alt = smile_orig;
                    alt = alt.replace('"', '&quot;');
                    alt = alt.replace('♥', '&lt;3');

                    if (this.smileys[smile_orig].substr(-2) == 'px') {

                        replace_img = '<img' +
                                      ' class="emoticon gm_smiley smiley"' +
                                      ' src="'+ this.smileys_url + '/blank.gif"' +
                                      ' style="background-position: ' + this.smileys[smile_orig] + ' 0;"' +
                                      ' title="' + alt + '"' +
                                      ' alt="' + alt + '"' +
                                      '>';

                        /* special smileys */
                        if (smile == ':-D' || smile == ':D' || smile == 'xD') {
                            smile = new RegExp(':-?D+', 'gi');
                        }
                        else if (smile == ':-)' || smile == ':)') {
                            smile = new RegExp(':-?\\)+');
                        }
                        else if (smile == ';-)' || smile == ';)') {
                            smile = new RegExp(';-?\\)+', 'g');
                        }
                        else if (smile == ':-(' || smile == ':(') {
                            smile = new RegExp(':-?\\(+');
                        }
                        else if (smile == ':/') {
                            smile = new RegExp(':-?[\\/]+[ \\s]?', 'g');
                        }
                        else if (new RegExp('^:-?O').test(smile)) {
                            smile = new RegExp('[ \\s]?:-?O[\\s\\z]?', 'gi');
                        }

                        data = data.replace(smile, '%' + j + '%', 'gi');
                        replacements[j] = replace_img;
                    }
                    else {
                        /* extra smileys */
                        data = data.replace(smile_orig, '%' + j + '%', 'gi');

                        replacements[j] = '<img' +
                                          ' class="emoticon gm_smiley"' +
                                          ' src="' + this.smileys_url + '/emote/' + this.smileys[smile_orig] + '.gif"' +
                                          ' title="' + alt + '"' +
                                          ' alt="' + alt + '"' +
                                          '>';
                    }
                }
            }

            /* replace tags back */
            data = data.replace('>', '&gt;', 'g').replace('<', '&lt;', 'g');

            /* replace smileys */
            replacements_length = replacements.length;
            for (var r = 0; r < replacements.length; r++) {
                data = data.replace(
                    new RegExp('%' + r + '%', 'g'),
                    replacements[r]
                );
            }
            replacements = null;

            html.innerHTML = data;
            el.replaceChild(html, child);

            /* Data reset */
            data = null;
        }
    },

    /**
     * Check if element can be replaced
     * @param   DOM
     */
    lookForSmileys: function (elements)
    {
        var count = elements.length;

        if ((count <= 0 )||
            (count == GM.elements.getByClassName(GM.string.trim(this.gm_class)).length)
        ) {
            return false;
        }

        var el, class_name;

        for (var i = 0; i < count; i++) {
            el = elements[i];

            class_name = el.className;

            /* is replaced? */
            if (!el ||
                class_name.indexOf(this.gm_class) >= 0 ||
                class_name.indexOf('uiStreamPassive') >= 0 ||
                class_name.indexOf('GenericStory_Report') >= 0
            ) {
                continue;
            }

            this.replaceSmileys(el);

            /* add class */
            //el.className += this.gm_class;
        }
    },

    /**
     * Find nodes for replace
     * @param   DOM     parentNode
     */
    findNodes: function (parentNode)
    {
        var loc = this.getLocation();

        if (location.hostname !== 'www.facebook.com' || loc == 'ai.php') {
            return;
        }

        try {
            parentNode = parentNode||this.content;

            /* photo */
            if (new RegExp('photo.php').test(loc)) {
                this.lookForSmileys(GM.elements.get(
                    '#fbPhotoPageCaption>span, div.commentContent>span',
                    parentNode
                ));
            }
            /* notes */
            else if (new RegExp('note.php').test(loc)) {
                this.lookForSmileys(GM.elements.get(
                    '.notesBlogText p, .commentContent>span',
                    document.getElementById('contentCol')
                ));
            }
            /* statuses */
            else {
                // statuses, comments
                this.lookForSmileys(GM.elements.get(
                    'span.messageBody, .uiStreamMessage, span.commentBody, span.UFICommentBody',
                    parentNode
                ));

                // text under shared content (small grey)
                this.lookForSmileys(GM.elements.get(
                    'div.shareSubtext',
                    parentNode
                ));

                // timeline
                this.lookForSmileys(GM.elements.get(
                    'span.userContent',
                    parentNode
                ));
            }
        }
        catch(e) {
            if (GM.debug.isDebugMode()) {
                console.error(e);
            }
        }
        // if Firefox
        if (navigator.userAgent.match('Firefox')) {
            this.createPromoBox();
        }
    },

    /**
     * Creates promo box in right sidebar
     */
    createPromoBox: function ()
    {
        if (!GM.elements.getById('pagelet_replacesmileysbox')) {

            if (!GM.elements.getById('home_stream')) return false;

            if (!!(col = GM.elements.getById('rightCol'))) {

                var html = '' +
                   '<div class="mbs phs clearfix">' +
                     '<img alt=""' +
                         ' style="background-position: -112px 0;"' +
                         ' src="' + this.smileys_url + '/blank.gif"' +
                         ' class="emote_img UIImageBlock_Image smiley"' +
                     '>' +

                     '<div class="UIImageBlock_ICON_Content">' +

                       '<div class="fcb">' +
                         '<b>Replace smileys</b> ' +
                         '<small>v' + this.script_version + '</small>' +
                       '</div>' +

                       '<div class="fsm fwn fcg">' +
                         '<a href="#" id="open-list">List of smileys</a>' +
                         ' &middot; ' +
                         '<a href="/pages/Replace-smileys-userscript/155692691129314">' +
                           'Become a Fan' +
                         '</a>' +
                       '</div>' +

                     '</div>' +

                   '</div>';

                var box = document.createElement('div');
                box.setAttribute('id', 'pagelet_replacesmileysbox');
                box.innerHTML = html;

                var col = GM.elements.get('.rightColumnWrapper', col).item(0)||col;
                col.appendChild(box);

                document.getElementById('open-list').addEventListener(
                    'click',
                    this.openWindow,
                    false
                );
            }
        }
    },

    /**
     * Open new window with smileys
     * @param   Event
     */
    openWindow: function (ev)
    {
        ev.preventDefault();

        window.open (
            'http://userscripts.kub4jz.cz/smileys/',
            null,
            'width=450,height=450,left=25,scrollbars=yes',
            true
        );
    },

    /**
     * Adds style to <head> of document
     * @param   string  CSS
     */
    addStyle: function (css)
    {
        if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }

        else if (!!(head = document.getElementsByTagName('head')[0])) {
            style = document.createElement('style');
            try { style.innerHTML = css; }
            catch(x) { style.innerText = css; }
            style.type = 'text/css';
            head.appendChild(style);
        }
    },

    addCssStyles: function ()
    {
        this.addStyle(
         ' .emoticon { width: 16px; height: 16px; display: inline-block; vertical-align: top; }' +
         ' .gm_smiley { margin: 0 1px; position: relative; }' +
         ' .gm_smiley.smiley { background: url('+ this.smileys_url +'/emote/emote.gif) no-repeat scroll top center; }' +
         // promo box
         ' #pagelet_replacesmileysbox { line-height: 1.3; margin: 15px 0; }' +
         ' #pagelet_replacesmileysbox img.UIImageBlock_Image { float: left; margin-top: 2px; margin-right: 5px; }' +
         // timeline highlights
         ' .fbTimelineOneColumn .userContent .gm_smiley { top: 2px; }' +
         // comments
         ' .UFICommentBody .gm_smiley, .commentBody .gm_smiley, .pageMostRecentPostList .pageOneLine .messageBody .gm_smiley { top: -1px; } '
        );
    },

    /**
     * @param   Event
     */
    onContentNodeInserted: function (ev)
    {
        var target = ev.target;

        if ((target.nodeName == 'LI') ||
            (target.nodeName == 'DIV') ||
            (target.nodeName == 'UL')
        ) {
            try {
                gm_fb_smileys.findNodes(target);
            }
            catch(e) {
                if (GM.debug.isDebugMode()) {
                    console.error(e);
                }
            }
        }
    },

    /**
     * @param   Event
     */
    onPhotoBoxNodeInserted: function (ev)
    {
        var target = ev.relatedNode;

        if (target.id == 'fbPhotoSnowliftCaption') {
            gm_fb_smileys.lookForSmileys(GM.elements.get('span.hasCaption', target));
        }
        else if (target.id == 'fbPhotoSnowliftFeedback') {
            gm_fb_smileys.lookForSmileys(GM.elements.get('span.commentBody', target));
        }
    }
};

gm_fb_smileys.smileys = {
    ':-)'   : '1px',       ':)'     : '1px',
    ':-('   : '-16px',     ':('     : '-16px',
    ':-P'   : '-31px',     ':P'     : '-31px',
                           ':-p'    : '-31px',
                           ':p '    : '-31px',
    ':-D'   : '-47px',     ':D'     : '-47px',
    ':-O'   : '-64px',     ':O '    : '-64px',
                           ':-o'    : '-64px',
                           ':o '    : '-64px',
    ';-)'   : '-79px',     ';)'     : '-79px',
    '8-)'   : '-96px',     ' 8)'    : '-96px',
    '8-|'   : '-111px',    '8|'     : '-111px',
    '>:-('  : '-128px',    '>:('    : '-128px',
    ':-/'   : '-143px',    ':/'     : '-143px',
    ':\'('  : '-160px',    ':´('    : '-160px',
                           ':,('    : '-160px',
    '3:-)'  : '-176px',    '3:)'    : '-176px',
                           ']:->'   : '-176px',
    'O:-)'  : '-192px',    'O:)'    : '-192px',
                           ' o:-)'  : '-192px',
                           ' o:)'   : '-192px',
    ':-*'   : '-208px',    ':*'     : '-208px',
    '<3'    : '-224px',    '♥'      : '-224px',
                           '*IN LOVE*' : '-224px',
    '^_^'   : '-240px',    '^^'     : '-240px',
    '-_-'   : '-256px',
    'o.O'   : '-272px',    'O.o'    : '-272px',
                           'o.o'    : '-272px',
    '>:-O'  : '-288px',    '>:o'    : '-288px',
                           '>.<'    : '-288px',
    ':v'    : '-304px',
    ' :3'   : '-320px',
    '(Y)'   : '-336px',    '(y)'    : '-336px',

    ':putnam:' : 'putnam',
    '<(")'     : 'penguin', '<(\'\')' : 'penguin',
    '(^^^)'    : 'shark',
    ':|]'      : 'robot',
    ':42:'     : '42'
};

var GM = {
    debug: {
        DEBUG: false,

        /**
         * check if debug mode is active
         * @return  bool
         */
        isDebugMode: function ()
        {
            return (this.DEBUG === true);
        },

        /**
         * Log function
         * call console.log only if DEBUG == TRUE
         */
        log: function (text)
        {
            if (this.isDebugMode() && text !== null) {
                console.log(text);
            }
        },

        /**
         * Log function
         * call console.log only if DEBUG == TRUE
         */
        error: function (text)
        {
            if (this.isDebugMode() && text !== null) {
                console.error(text);
            }
        }
    },

    elements: {
        /**
         * @param id        string  querySelector
         * @param parent    DOM     parentNode
         * @returns         DOM||null
         */
        get: function (id, parentNode)
        {
            if (id && typeof id === 'string') {
                parentNode = parentNode||document;
                id = parentNode.querySelectorAll(id);
            }
            return id||null;
        },

        /**
         * @param   id        string  element ID
         * @returns         DOM||null
         */
        getById: function (id)
        {
            return document.getElementById(id);
        },

        /**
         * @param   string        elements className
         * @returns DOM||null
         */
        getByClassName: function (className, parentNode)
        {
            parentNode = parentNode||document;
            return parentNode.getElementsByClassName(className);
        }
    },

    string: {
        trim: function (text)
        {
            return text.replace(/^\s+|\s+$/g,"");
        }
    }
};

window.onload = function ()
{
    try { gm_fb_smileys.init(); }
    catch(e) {
        if (GM.debug.isDebugMode()) {
            console.error(e);
        }
    }
}
