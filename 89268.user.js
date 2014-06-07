// ==UserScript==
// @name           Facebook Emotion Replacer(PRO)
// @description    Replaces emotions with better ones!
// @include        http://*.facebook.com/*
// ==/UserScript==


const DEBUG = false;

const script_id = 49338;
const script_version = '1';

// replaced elements class name
const gm_class = ' gm_smileys_replaced';

// # smileys
var smiley = new Array();

smiley[':-D']  = '-48px';   smiley[':D'] = '-48px';     smiley['xD'] = '-48px';

smiley['3:-)'] = '-176px';  smiley['3:)'] = '-176px';
smiley['O:-)'] = '-192px';  smiley['O:)'] = '-192px';
smiley[':-)']  = '0px';     smiley[':)']  = '0px';

smiley['>:-('] = '-128px';  smiley['>:('] = '-128px';
smiley[':-(']  = '-16px';   smiley[':(']  = '-16px';

smiley['>:-O'] = '-288px';  smiley['>:o'] = '-288px';
smiley[':-O']  = '-64px';   smiley[':O']  = '-64px';

smiley[';-)']  = '-80px';   smiley[';)']  = '-80px';
smiley[':-P']  = '-32px';   smiley[':P']  = '-32px';

smiley['8-)']  = '-96px';
smiley['8-\|']  = '-111px';

smiley[':-/']  = '-144px';  smiley[' :/'] = '-144px';
smiley[':\'('] = '-160px';  smiley[':´('] = '-160px';   smiley[':,('] = '-160px';

smiley[':-*']  = '-208px';
smiley['<3']   = '-224px';  smiley['♥']   = '-224px';   smiley['*IN LOVE*'] = '-224px';
smiley['^_^']  = '-240px';
smiley['-_-']  = '-256px';
smiley['o.O']  = '-272px';  smiley['O.o'] = '-272px';

smiley[':v']   = '-304px';
smiley[' :3']  = '-320px';

smiley[':putnam:'] = 'putnam';
smiley['<(")']     = 'penguin';
smiley['(^^^)']    = 'shark';
smiley[':|]']      = 'robot';
smiley[':42:']     = '42';

// RexExp all smileys
var smileys_all = new Array();

for (smile in smiley) {
    smileys_all.push(smile.replace(/[\)\(\^\*\.\:\|]/g, '\\$&').replace(/\u0000/g, '\\0'));
}

const smileys_regex = new RegExp(smileys_all.join("|"), 'g');
delete smileys_all;


function log(text)
{
    if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
        GM_log(text);
    }
    return false;
}


function g(id)
{
    if(id && typeof id === 'string') {
        id = document.querySelectorAll(id);
    }
    return id||null;
}


function replace(elements)
{
    var count, el, class_name, data, matches, smile, smile_orig, alt, html, replace_img;

    count =  elements.length;

    if (count <= 0) return false;

    for(i = 0; i <= count - 1; i++) {
        el = elements.item(i);

        class_name = el.className;

        // is replaced?
        if (!el ||
            class_name.indexOf(gm_class) >= 0 ||
            class_name.indexOf('uiStreamPassive') >= 0 ||
            class_name.indexOf('GenericStory_Report') >= 0
        ) {
            continue;
        } else {
            el.className += gm_class;
        }

        data = el.textContent;

        matches = data.match(smileys_regex);

        if (!matches) continue;

        for(j = 0; j < matches.length; j++) {
            smile = matches[j];

            // get new data
            if (data == null) data = el.textContent;

            if (data.indexOf(smile) >= 0) {

                smile_orig = smile;

                smile = smile.replace('>', '&gt;');
                smile = smile.replace('<', '&lt;');

                alt = smile_orig;
                alt = alt.replace(')', '&shy;)');
                alt = alt.replace('"', '&quot;');
                alt = alt.replace(':', '&#58;&shy;');
                alt = alt.replace('♥', '&lt;3');

                html = el.innerHTML;

                if (new RegExp('px').test(smiley[smile_orig]) === true) {

                    replace_img = ' <img class="emote_img gm_smiley smiley"'
                                + ' src="http://static.ak.fbcdn.net/images/blank.gif"'
                                + ' style="background-position: ' + smiley[smile_orig] + ' 0px;"'
                                + ' title="' + alt + '" alt="' + alt + '">';

                    // special smileys
                    if (smile == ':-D' || smile == ':D' || smile == 'xD') { smile = new RegExp('([:|x]-?D+)', 'gi'); }
                    else if (smile == ':-)' || smile == ':)') { smile = new RegExp('(:-?[\)]+)', 'g'); }
                    else if (smile == ';-)' || smile == ';)') { smile = new RegExp('(;-?[\)]+)', 'g'); }
                    else if (smile == ':-(' || smile == ':(') { smile = new RegExp('(:-?[\(]+)', 'g'); }

                    el.innerHTML = html.replace(smile, replace_img, 'g');

                } else {
                    // extra smileys
                    el.innerHTML = html.replace(smile, ' <img class="gm_smiley"' +
                                                       ' src="http://static.ak.fbcdn.net/images/emote/' + smiley[smile_orig] + '.gif"' +
                                                       ' title="' + alt + '" alt="' + alt + '">', 'gi');
                }

                // data reset
                data = null;
                continue;
            }
        }
    }

    delete elements, count, el, class_name, matches, smile, data, alt, html, replace_img;

    return false;
}

var htmlLength_before = 0;

function smileys()
{
    var c;
    if (c = document.getElementById('content')) {
        var htmlLength = c.innerHTML.length;

        if (htmlLength == htmlLength_before) {
            return false;
        }

        htmlLength_before = htmlLength;
        delete c;
    }

    // get location (after #)
    var loc = location.hash;

    if (loc.length == 0 || !new RegExp('#!/|sk=|ref=|php').test(loc)) {
        // get pathname (after /)
        loc = location.pathname.replace(new RegExp('^[/]+', ''), '');

        // if not pathname get search (after ?)
        if (loc.length == 0) loc = location.search;
    }

    // photo
    if (new RegExp('photo.php').test(loc)) {
        replace(document.getElementsByClassName("photocaption_text"));
    } else
    // photos with comments
    if (new RegExp('photo_comments.php').test(loc)) {
        replace(document.getElementsByClassName("walltext"));
    } else
    // messages
    if (new RegExp('sk=messages&tid=|/inbox/|sk=sent&tid=').test(loc)) {
        replace(g("div.message_pane div.GBThreadMessageRow_Body_Content"));
    } else
    // topic messages
    if (new RegExp('topic.php').test(loc)) {
        replace(document.getElementsByClassName("UIImageBlock_Content"));
    } else
    // notes
    if (new RegExp('note.php').test(loc)) {
        replace(g('.notesBlogText'));
    } else {
        // statuses
        replace(g('#content li h6.uiStreamMessage, #content .UIStory_Message'));
    }

    // everytime replace comments
    replace(g('#content div.commentContent'));

    delete loc;


    // create promo box
    if (!document.getElementById('pagelet_replacesmileysbox')) {

        if (!document.getElementById('home_stream')) return false;

        if (col = document.getElementById('rightCol')) {

            var html;

            html = '<div class="UIImageBlock clearfix mbs">'
                 + '<img alt="" style="background-position: -112px 0px;" src="http://static.ak.fbcdn.net/images/blank.gif" class="emote_img UIImageBlock_Image smiley">'
                 + '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">'
                 + '<div class="fcb"><b>Replace smileys</b> <small>v' + script_version + '</small></div>'
                 + '<div class="fsm fwn fcg">'
                 + '<a href="http://www.facebook.com/TonyWhiteHere">Friend The Creator?</a>'
                 //+ ' or visit a <a href="http://userscripts.org/scripts/show/89268" target="_blank">Homepage</a>'
                 + '</div>'
                 + '</div>'
                 + '</div>';

            var box = document.createElement('div');
            box.setAttribute('id', 'pagelet_replacesmileysbox');
            box.innerHTML = html;
            col.appendChild(box);

            delete col, html, box;
        }

    }

    return false;
}

function addStyle(css)
{
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (head = document.getElementsByTagName('head')[0]) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		head.appendChild(style);
	}

    delete head, style, css;

    return false;
}

function cssStyles()
{
    /* box */
    addStyle(
     ' img.emote_img {}'
    +' img.gm_smiley { position: relative; top: -1px; vertical-align: top; }'
    +' img.gm_smiley.smiley { background-image: url(http://static.ak.fbcdn.net/images/emote/emote.gif); background-repeat: no-repeat; background-attachment: scroll; }'
    +' #pagelet_replacesmileysbox { line-height: 1.2em; margin: 15px 0; }'
    +' #pagelet_replacesmileysbox img.UIImageBlock_Image { margin-top: 2px; }'
    );

    return false;
}


var home_stream;
function starter()
{
    home_stream = document.getElementById('content');

    cssStyles();
    smileys();

    if (home_stream) {
        setTimeout( function () {
            var t;
            home_stream.addEventListener("DOMNodeInserted", function () { clearTimeout( t ); t = setTimeout( smileys, 120 ) }, false);
        }, 300);
    }

    if (typeof autoUpdate === 'function') {
        autoUpdate (script_id, script_version);
    }

    return false;
}

starter();