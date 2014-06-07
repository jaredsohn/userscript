// ==UserScript==
// @name           Facebook - smiley
// @version        2.0
// @description    Facebook a desormais ces smileys 
// @namespace      Lord_briceekub
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        apps://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://*.userscript.org/*
// @include        apps://*.userscript.org/*
// @include        http://*.userscript.org/*
// @include        *.userscript.org/*
// ==/UserScript==

(function(d){

    var DEBUG = false;

    var script_id = 49338,
        script_version = '2.0';



    /* replaced elements class name */
    var gm_class = ' gm_smileys_replaced';



    /* smileys */
    var smiley = {
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
        ':v'    : '-304px',
        ' :3'   : '-320px',
        '(Y)'   : '-336px',    '(y)'    : '-336px',

        ':putnam:' : 'putnam',
        '<(")'     : 'penguin', '<(\'\')' : 'penguin',
        '(^^^)'    : 'shark',
        ':|]'      : 'robot',
        ':42:'     : '42'
    };



    /* detect https */
    var smileys_url = 'http://static.ak.fbcdn.net/images';

    if (location.protocol == 'https:') {
        smileys_url = 'https://s-static.ak.fbcdn.net/images';
    }



    /* RexExp all smileys */
    smileys_all = [];

    var smile;
    for (smile in smiley) {
        smileys_all.push(
            smile.replace(/[)(\^\*\.\|]/g, '\\$&').replace(/\u0000/g, '\\0')
        );
    }

    var smileys_regex = new RegExp(smileys_all.join("|"), 'gm');



    /* Log function */
    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== null) {
            GM_log(text);
        }
        return false;
    }



    /* Find elements */
    function g(id, parent)
    {
        if(id && typeof id === 'string') {
            var p = parent||d;
            id = p.querySelectorAll(id);
        }
        return id||null;
    }



    /* Location */
    var loc;

    function getLocation()
    {
        /* get location (after #) */
        loc = location.hash;

        if (loc.length === 0 || !new RegExp('#!/|sk=|ref=|php').test(loc)) {
            /* get pathname (after /) */
            loc = location.pathname.replace(/^[\/]+/, '');

            /* if not pathname get search (after ?) */
            if (loc.length === 0) {
                loc = location.search;
            }
        }

        return loc;
    }



    /* Replace smileys */
    function replace(elements)
    {
        var count =  elements.length;

        if (count <= 0 ||
            count == d.getElementsByClassName('gm_smileys_replaced').length
        ) {
            return false;
        }


        var el, class_name, data, matches, childs, child, childValue, smile,
            smile_orig, alt, html, replace_img;

        for(i = 0; i < count; i++) {
            el = elements[i];

            class_name = el.className;

            /* is replaced? */
            if (!el ||
                class_name.indexOf(gm_class) >= 0 ||
                class_name.indexOf('uiStreamPassive') >= 0 ||
                class_name.indexOf('GenericStory_Report') >= 0
            ) {
                continue;
            }

            /* add class */
            el.className += gm_class;

            data = el.innerHTML;
            /* replace tags */
            data = data.replace('&gt;', '>', 'g').replace('&lt;', '<', 'g');

            /* check smileys */
            matches = data.match(smileys_regex);

            data = null;

            if (!matches) continue;

            childs = el.childNodes;
            childs_length = childs.length;

            for(var k = 0; k < childs_length; k++) {

                child = childs[k];

                /* only text nodes */
                if (child.nodeName != '#text') continue;

                /* get value */
                data = child.nodeValue;

                var replacements = [];

                /* create node */
                html = d.createElement('span');

                matches_length = matches.length;
                for(j = 0; j < matches_length; j++) {
                    smile = matches[j];

                    if (data.indexOf(smile) >= 0) {

                        smile_orig = smile;

                        alt = smile_orig;
                        alt = alt.replace('"', '&quot;');
                        alt = alt.replace('♥', '&lt;3');

                        if (smiley[smile_orig].substr(-2) == 'px') {

                            replace_img = '<img' +
                                          ' class="emote_img gm_smiley smiley"' +
                                          ' src="'+ smileys_url + '/blank.gif"' +
                                          ' style="background-position: ' + smiley[smile_orig] + ' 0;"' +
                                          ' title="' + alt + '"' +
                                          ' alt="' + alt + '"' +
                                          '> ';

                            /* special smileys */
                            if (smile == ':-D' || smile == ':D' || smile == 'xD') {
                                smile = new RegExp(':-?D+', 'gi');

                            } else if (smile == ':-)' || smile == ':)') {
                                smile = new RegExp(':-?\\)+');

                            } else if (smile == ';-)' || smile == ';)') {
                                smile = new RegExp(';-?\\)+', 'g');

                            } else if (smile == ':-(' || smile == ':(') {
                                smile = new RegExp(':-?\\(+');

                            } else if (smile == ':/') {
                                smile = new RegExp(':-?[\\/]+[ \\s]?', 'g');

                            } else if (new RegExp('^:-?O').test(smile)) {
                                smile = new RegExp('[ \\s]?:-?O[\\s\\z]?', 'gi');

                            }

                            data = data.replace(smile, '%' + j + '%', 'gi');
                            replacements[j] = replace_img;

                        } else {
                            /* extra smileys */
                            data = data.replace(smile_orig, '%' + j + '%', 'gi');
                            replacements[j] = '<img' +
                                              ' class="gm_smiley"' +
                                              ' src="' + smileys_url + '/emote/' + smiley[smile_orig] + '.gif"' +
                                              ' title="' + alt + '"' +
                                              ' alt="' + alt + '"' +
                                              '> ';
                        }
                    }
                }

                /* replace tags back */
                data = data.replace('>', '&gt;', 'g').replace('<', '&lt;', 'g');

                /* replace smileys */
                replacements_length = replacements.length;
                for(r = 0; r < replacements.length; r++) {
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

        }


        return false;
    }



    function lookForSmileys(parentNode)
    {
        loc = getLocation();

        if (location.hostname !== 'www.facebook.com' || loc == 'www.userscript.org' || loc == 'ai.php') {
            return;
        }

        parentNode = parentNode||d;


        /* photo */
        if (new RegExp('photo.php').test(loc)) {
            replace(g(
                '#photocaption, div.commentContent>span',
                parentNode
            ));
        } else
        /* notes */
        if (new RegExp('note.php').test(loc)) {
            replace(g(
                'div.notesBlogText p, div.commentContent>span',
                d.getElementById('contentCol')
            ));
        } else {
            /* statuses */
            replace(g(
                'span.messageBody, .UIStory_Message, div.tlTxFe, div.commentContent>span',
                parentNode
            ));
        }


        createPromoBox();

        return false;
    }



    /* create promo box */
    function createPromoBox()
    {
        if (!d.getElementById('pagelet_replacesmileysbox')) {

            if (!d.getElementById('home_stream')) return false;

            if (!!(col = d.getElementById('rightCol'))) {

                html = '<div class="UIImageBlock mbs phs clearfix">' +
                         '<img alt=""' +
                             ' style="background-position: -112px 0;"' +
                             ' src="' + smileys_url + '/blank.gif"' +
                             ' class="emote_img UIImageBlock_Image smiley"' +
                         '>' +

                         '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">' +

                           '<div class="fcb">' +
                             '<b>Replace smileys</b> ' +
                             '<small>v' + script_version + '</small>' +
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

                box = document.createElement('div');
                box.setAttribute('id', 'pagelet_replacesmileysbox');
                box.innerHTML = html;
                col.appendChild(box);

                d.getElementById('open-list').addEventListener(
                    'click',
                    openWindow,
                    false
                );
            }
        }

        return false;
    }



    function openWindow(e)
    {
        e.preventDefault();

        window.open (
            'http://userscripts.kub4jz.cz/smileys/',
            null,
            'width=450,height=450,left=25,scrollbars=yes',
            true
        );

        return false;
    }



    function addStyle(css)
    {
        if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }

        else if (!!(head = d.getElementsByTagName('head')[0])) {
            style = d.createElement('style');
            try { style.innerHTML = css; }
            catch(x) { style.innerText = css; }
            style.type = 'text/css';
            head.appendChild(style);
        }

        return false;
    }



    function cssStyles()
    {
        /* box */
        addStyle(
         '' +
         ' .gm_smiley{margin:0 1px;position:relative;top:-1px;vertical-align:top;}' +
         ' .gm_smiley.smiley{background:url('+ smileys_url +'/emote/emote.gif) no-repeat scroll top center;}' +
         ' #pagelet_replacesmileysbox{line-height:1.3;margin:15px 0;}' +
         ' #pagelet_replacesmileysbox img.UIImageBlock_Image{margin-top:2px;}'
        );

        return false;
    }



    /* Start script */
    var content = d.getElementById('content');

    cssStyles();
    lookForSmileys(content);



    function afterDomNodeInserted(e)
    {
        target = e.target;

        if ((target.nodeName == 'LI') ||
            (target.nodeName == 'DIV') ||
            (target.nodeName == 'UL')
        ) {
            lookForSmileys(target);
        }

        return false;
    }



    function photoBoxUpdated(e)
    {
        target = e.relatedNode;

        if (target.id == 'fbPhotoSnowboxFeedback') {
            replace(g(
                '#fbPhotoSnowboxCaption, span.commentBody',
                d.getElementById('fbPhotoSnowbox')
            ));
        }

        return false;
    }


    window.setTimeout(function () {
        d.addEventListener(
            'DOMNodeInserted',
            afterDomNodeInserted,
            false
        );

        if (!!(PhotoBox = d.getElementById('fbPhotoSnowbox'))) {
            PhotoBox.addEventListener(
                'DOMNodeInserted',
                photoBoxUpdated,
                false
            );
        }

    }, 2000);


    /* AutoUpdater */
    if (typeof autoUpdate === 'function') {
        autoUpdate (script_id, script_version);
    }

})(document);