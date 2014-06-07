// ==UserScript==
// @name           vimus
// @namespace      aeosynth
// @description    VIM UserScript
// @version        0.3.2
// @copyright      2010, 2011 James Campos <james.r.campos@gmail.com>
// @license        MIT; http://en.wikipedia.org/wiki/Mit_license
// @include        *
// @exclude        https://*.google.com/*
// ==/UserScript==

/* Copyright (c) 2010, 2011 James Campos <james.r.campos@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* TODO
 * more vbell
 * visual mode
 * `real` normal mode
 */

var Mark, Mode, Pos, Url, d, g, follow, keydown, keypress, kill, move;

Mark = {
    get: function() {
        var offset;
        if (offset = Mark.marks[g.key])
            window.scrollTo(0, Mark.marks[g.key]);
        else
            vbell();
    },
    marks: {},
    set: function() {
        Mark.marks[g.key] = window.pageYOffset;
    },
};

Mode = {
    insert: function(e) {
        var prevent;
        prevent = true;
        switch (g.key) {
            case '<Esc>': d.activeElement.blur(); break;
            case '^a': move('left', 'line'); break;
            case '^b': move('left', 'character'); break;
            case '^d': kill('right', 'character'); break;
            case '^e': move('right', 'line'); break;
            case '^f': move('right', 'character'); break;
            case '^h': kill('left', 'character'); break;
            case '^k': kill('right', 'line'); break;
            case '^u': kill('left', 'line'); break;
            case '^w': kill('left', 'word'); break;
            default: prevent = false; break;
        }
        if (prevent)
            e.preventDefault();
    },

    normal: function(e) {
        var prevent;
        prevent = true;
        if (g.buffer) {
            g.buffer();
            g.buffer = null;
        }
        else {
            switch (g.key) {
                case 'G': window.scrollTo(0, d.documentElement.scrollHeight); break;
                case 'H': history.back(); break;
                case 'L': history.forward(); break;
                case 'U': window.location = Url.root(); break;
                case '^a': window.location = Url.increment(1); break;
                case 'd':
                    //Firefox note: dom.allow_scripts_to_close_windows in about:config must be true
                    window.close(); break;
                case 'g': window.scrollTo(0,0); break;
                case 'h': window.scrollBy(-20, 0); break;
                case 'j': window.scrollBy(0, 20); break;
                case 'k': window.scrollBy(0, -20); break;
                case 'l': window.scrollBy(20, 0); break;
                case 'm': g.buffer = Mark.set; break;
                case 'r': location.reload(); break;
                case 'u': window.location = Url.parent(); break;
                case '^x': Url.decrement(1); break;
                case "'": g.buffer = Mark.get; break;
                case '[': follow(/prev/i); break;
                case ']': follow(/next/i); break;
                default: prevent = false; break;
            }
        }
        if (prevent)
            e.preventDefault();
    },

    visual: function(e) {
        //TODO
    },
};

Pos = {
    bol: function(i, value) {//beginning of line
        if (i != 0)
            while (--i && (value[i] != '\n'));
        return i ? i + 1 : 0;
        // if we're not at beginning of input, back up one char
    },
    bow: function(i, value) {//beginning of word
        if (i != 0)
            while (--i && /\s/.test(value[i]));//skip whitespace
        if (i != 0)
            while (--i && /\S/.test(value[i]));//skip non-whitespace
        return i ? i + 1 : 0;
    },
    eol: function(i, value) {//end of line
        var l;
        l = value.length;
        if (i != l)
            while ((value[i] != '\n') && (++i < l));
        return i;
    },
    get: function(direction, granularity) {
        var ae, i, pos, value;
        ae = d.activeElement;
        i = ae.selectionStart;
        pos = {};
        value = ae.value;
        if (direction == 'left') {
            pos.right = i;
            switch (granularity) {
                case 'character': pos.left = Pos.pc(i, value); break;
                case 'line': pos.left = Pos.bol(i, value); break;
                case 'word': pos.left = Pos.bow(i, value); break;
            }
        }
        else {//direction == 'right'
            pos.left = i;
            switch (granularity) {
                case 'character': pos.right = Pos.nc(i, value); break;
                case 'line': pos.right = Pos.eol(i, value); break;
            }
        }
        return pos;
    },
    nc: function(i, value) {//next character
        var l;
        l = value.length;
        if (i < l)
            ++i;
        return i;
    },
    pc: function(i, value) {//prev character
        if (i > 0)
            --i;
        return i;
    },
};

Url = {
    decrement: function(count) {
        var n, path;
        path = location.pathname;
        n = path.match(/\d+/);
        if (n) {
            n = Number(n) - count;
            path = path.replace(/\d+/, n);
        }
        return path;
    },
    increment: function(count) {
        var n, path;
        path = location.pathname;
        n = path.match(/\d+/);
        if (n) {
            n = Number(n) + count;
            path = path.replace(/\d+/, n);
        }
        else {
            path = path.replace(/\/?$/, '/1');
        }
        return path;
    },
    parent: function() {
        var path;
        path = location.pathname.split('/');
        path.pop();
        path = path.join('/');
        return Url.root() + path;
    },
    root: function() {
        return location.protocol + '//' + location.hostname;
    },
};

d = document;

g = {//globals
    buffer: null,
    key: '',
};

follow = function(regex) {
    var links = d.links;
    for (var i = 0, l = links.length; i < l; i++) {
        if (regex.test(links[i].textContent))
            window.location = links[i].href;
    }
};

keydown = function(e) {
    var ae, kc, nodeName, s;
    ae = d.activeElement;
    nodeName = ae.nodeName;
    if (nodeName == 'TEXTAREA' || nodeName == 'INPUT') {
        if (ae.selectionStart == ae.selectionEnd)
            Mode.mode = Mode.insert;
        else
            Mode.mode = Mode.visual;
    }
    else
        Mode.mode = Mode.normal;

    kc = e.keyCode;
    // non-alpha keys can produce keycodes equal to a-z charcodes.
    if (65 <= kc && kc <= 90) {// A-Z
        s = String.fromCharCode(kc);
        if (!e.shiftKey)
            s = s.toLowerCase();
        g.key = (e.ctrlKey ? '^' : '') + s;
    }
    else {
        switch (kc) {
            case 27:  g.key = '<Esc>'; break;
            case 219: g.key = '['; break;
            case 221: g.key = ']'; break;
            case 222: g.key = "'"; break;
            default:  g.key = ''; break;
        }
    }
};

keypress = function(e) {
    Mode.mode(e);
};

kill = function(direction, granularity) {
    var ae, pos, value;
    ae = d.activeElement;
    pos = Pos.get(direction, granularity);
    value = ae.value;

    if ((pos.left == pos.right) && (granularity == 'line') && (pos.left != 0)) {
        //help out the kill-by-line funks
        if (direction == 'left')
            --pos.left;
        else//direction == 'right'
            ++pos.right;
    }
    ae.value = value.slice(0, pos.left) + value.slice(pos.right);
    ae.setSelectionRange(pos.left, pos.left);
};

move = function(direction, granularity) {
    var ae, pos;
    ae = d.activeElement;
    pos = Pos.get(direction, granularity);

    pos = (direction == 'left') ? pos.left : pos.right;//XXX ugly
    ae.setSelectionRange(pos, pos);
};

vbell = function() {
    var div;
    div = d.createElement('div');
    div.id = 'vbell';
    d.body.appendChild(div);
    setTimeout(function() {
        d.body.removeChild(d.getElementById('vbell'));
    }, 20);
};

if (typeof GM_addStyle == 'undefined') {
    window.GM_addStyle = function(css) {
        var style;
        style = d.createElement('style');
        style.type = 'text/css';
        style.textContent = css;
        d.getElementsByTagName('head')[0].appendChild(style);
    };
}

GM_addStyle('\
    #vbell {\
        background: #000000;\
        height: 100%;\
        left: 0px;\
        position: fixed;\
        top: 0px;\
        width: 100%;\
    }\
');

d.addEventListener('keydown', keydown, true);
d.addEventListener('keypress', keypress, true);
