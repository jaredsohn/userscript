/* vim: ts=4 noet ai :
   -*- coding: utf-8 -*-

   RSS Panel X - RSS/Atom/hAtom/OPML Reader for Greasemonkey
   Copyright 2006 - 2007, 2009  Benjamin C. Wiley Sittler
   Copyright 2005, 2006  Johannes la Poutre
   Portions Copyright 2004 - 2006  CommerceNet Consortium, LLC

   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License
   as published by the Free Software Foundation; either version 2
   of the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

   Contact Information:

   Benjamin C. Wiley Sittler
   E-mail: bsittler@gmail.com
   6214 Plumas Ave
   Richmond, CA 94804
   U.S.A.

*/
/*

  Works with RSS versions 0.91 .. 2.0, Atom 0.3 .. 1.0, hAtom 0.1, and OPML 1.0

  Changelog:

  version 2.01-bsittler15 (experimental)
  - new homepage and contact info
  - parse HTML inside dc:description

  version 2.01-bsittler14 (experimental)
  - less buggy hina, hina-di and LIRS parsing

  version 2.01-bsittler13 (experimental)
  - support rel="feed"
  - ignore rel="alternate stylesheet"
  - support for LIRS, hina and hina-di blogroll formats

  version 2.01-bsittler12 (experimental)
  - rel="service.feed"
  - work around namespaced node creation failures in ie6 and below
  - allow missing rel attribute in atom link element
  - fall back to non-empty innerText when no child nodes are present
  - menu item "Autodetect+" which also supports <a rel="alternate" href="...">...</a>
  - allow null namespace for RSS elements in RDF, as caused by MoinMoin bug in pre-2.4 Python

  version 2.01-bsittler11 (experimental)
  - fix cascade bug seen on frameset pages (gmail, etc.)

  version 2.01-bsittler10 (experimental)
  - text/xml+opml
  - some DOAP and Semantic MediaWiki support
  - bugfix for occasional "missing" feeds

  version 2.01-bsittler9 (experimental)
  - support rel="outline" (sometimes used for OPML)

  version 2.01-bsittler8 (experimental)
  - work around for a Firebug crash (disable RSS Panel X for file:* URI pattern)
  - fix bug in UTF-8 decoder

  version 2.01-bsittler7 (experimental)
  - remap C1 control characters according to CP1252/Mac assignments
  - rewrote HTML parser
  - partial support for RDF ( http://www.w3.org/RDF/ )
  - partial support for FOAF ( http://xmlns.com/foaf/0.1/ )
  - added root element namespace-based format detection

  version 2.01-bsittler6 (experimental)
  - workarounds for OmniWeb event handling bugs
  - handles feeds incorrectly delivered as HTML in Firefox 1.x
  - added an Accept header with a list of supported media types

  version 2.01-bsittler5 (experimental)
  - support for OPML 1.0 ( http://www.opml.org/ )
  - support for RSS 1.0 with mod_enclosure ( http://www.xs4all.nl/~foz/mod_enclosure.html )
  - plays nicely with the Firefox 2.0 feed reader
  - workarounds for various MSIE rendering bugs

  version 2.01-bsittler4 (experimental)
  - added key accelerators (Alt+R and Alt+Shift+R) -- but they don't
  work for me in Greasemonkey 0.6.6.20061017.0 (tested in Firefox
  1.5 and 2.0rc3)
  * &RSS Panel X Autodetect = Alt+R
  * RSS Panel X &for this feed = Alt+Shift+R
  * About RSS Panel &X
  suggested by Mysteriously Nameless User ( http://userscripts.org/people/1976 )
  apparently similar to an unreleased version by Desert Fox ( http://userscripts.org/people/552 )
  - changed namespace again ( http://zoehep.xent.com/~bsittler/rsspanel.html )
  suggested by Mysteriously Nameless User ( http://userscripts.org/people/1976 )
  - new homepage ( http://zoehep.xent.com/~bsittler/rsspanel.html )
  - the bookmarklet now works as a Konqueror Minitool for RSS, Atom and hAtom feeds

  version 2.01-bsittler3 (experimental)
  - now works in Safari with Creammonkey 0.7 ( http://8-p.info/Creammonkey/ )
  - now listed on userscripts.org ( http://userscripts.org/scripts/show/6073 )

  version 2.01-bsittler2 (experimental)
  - now it's called "RSS Panel X" (i.e. "eXperimental" RSS Panel)
  - better overflow handling in Opera and MSIE
  - switched namespace to avoid collisions
  - repointed update URL to avoid spamming someone else w/my bugs
  - generated a new GUID for Greasemonkey Compiler
  http://www.letitblog.com/greasemonkey-compiler/
  - GUID: {79067fdd-38db-8dee-6a6a-94814903ca7e}
  - unofficial version by "Benjamin C. Wiley Sittler"

  version 2.01-bsittler1 (experimental)
  - duplicate feeds are suppressed ( < img alt="..." / > is not handled uniformly, though)
  - hAtom 0.1 support ( http://microformats.org/wiki/hatom )
  - Atom 1.0 support ( http://atomenabled.org/ )
  - multi-feed support
  - tested as GM, Opera and Turnabout user scripts, and as plain .js
  - new GM menu items for panel redisplay and feed reading
  - unofficial version by "Benjamin C. Wiley Sittler"

  version 2.01
  - minor tweak to fix compatibility with Safari 2.0.x and possible
  problems with other browsers as well.

  version 2.00
  - compatibility with Firefox 1.5 and GM 0.6.4 (release candidate)
  - enhanced security model: used XPCNativeWrapper to access
  native DOMParser object
  - added "check for updates" functionality; had to remove
  top level wrapper function to do this in a clean way.
  - Fix: apparently GM_XmlhttpRequest now needs fully qualified url.
  - reset margin on divs (some CSS sheets define a non zero value for
  every plain div, don's ask me why).
  - replace missing title and links with 'Untitled item #X" and
  #RSS_MISSING_LINK respectively.

  Version 1.18
  - fix for Firefox 1.5x; all events implemented in a W3C compliant way.
  Some code taken from "DOM-Drag" by Aaron Boodman, 2001
  http://www.youngpup.net/2001/domdrag
  Final version from Book Burro:
  http://www.lysator.liu.se/~jhs/userscript/bookburro/0.16.user.js

  Version 1.17
  - work around for Turnabout where GM_XmlhttpRequest returns
  resultXML as text string (= alias for resultText), Aaargh!
  - minor design tweaks for MSIE's CSS box model
  NOTE:
  - XMLHttpRequest is still very fragile under Turnabout ;-(

  Version 1.16
  - minor fixes to restore MSIE compatibility
  Welcome back, turnabout users!
  - fix with GM_log
  - call document as property of window (global) object
  (waiting for new GM version)

  Version 1.15
  - use GM_xmlhttpRequest() if available (GM 0.2.6+):
  loads any RSS feed, regardless of originating domain
  this means for instance that feedburner feeds are working.

  Version 1.14
  - logging through GM_Log if available (GM 0.3.3+)
  - namespace now points at the script's home page

  Version 1.13
  - fix for RSS feeds missing elements
  Thanks to Andy Dustman for hhis patch.

  Version 1.12
  - fix character encoding again (pure ASCII)

  Version 1.11
  - minior fix with character encoding (UTF-8)
  - generated GUID for Greasemonkey Compiler
  http://www.letitblog.com/greasemonkey-compiler/
  - GUID: {821ac008-72db-4ccd-94b9-722ccba5b28a}

  Version 1.10
  - Changed license to GPL
  Added by Brandan Lloyd:
  - Added title bar to make it draggable,
  - Allow the user to double-click to open and close so that
  clicking on a link doesn't toggle the view state,
  - Added a little icon for opening and with a single-click,
  - Added a scroll bar so that if the Reader is longer
  than the page the user can scroll.

  Version 1.03
  - Added a link to the discovered RSS feed (suggested by Nathan Howell)

  Version 1.02
  - Moved link to RSS home to mottom of list (suggested by Neil Kandalgaonkar)

  Version 1.01
  - Initial release

*/

// ==UserScript==
// @name                  RSS Panel X
// @namespace    http://zoehep.xent.com/~bsittler/rsspanel.html
// @description   Displays RSS, Atom, hAtom and OPML directly from originating website
// @include        *
// @exclude        file:*
// ==/UserScript==

(function(window, targetURI, scriptURI) {
    var isKHTML = navigator.userAgent.indexOf('KHTML') != -1;
    var isOpera = (typeof (window.opera) != 'undefined') && ! isKHTML;
    var isAppleWebKit = navigator.userAgent.indexOf('AppleWebKit') != -1;
    var isOmniWeb = navigator.userAgent.indexOf('OmniWeb') != -1;
    var isMSIE = navigator.userAgent.indexOf('MSIE') != -1;
    var isGecko = (navigator.userAgent.indexOf('Gecko') != -1) && ! isKHTML && ! isOpera;

    var bugScopingIsBroken = isKHTML && ! isAppleWebKit;
    var bugAttributesUndecodedInXHTML = isOpera;
    var bugEventListenersAreBroken = isOpera || (isAppleWebKit && isOmniWeb);
    var bugAttachEventIsBroken = isAppleWebKit && isOmniWeb;
    /*@cc_on
      /*@if (@_jscript_version >= 5.7) // MSIE 7
      var bugPositionFixedIsIgnored = false;
      @else @*/
    var bugPositionFixedIsIgnored = isMSIE;
    /*@end
      @*/

    // needed to overcome Konqueror scoping bugs
    var xparseInt = ((typeof(parseInt) != 'undefined') && ! bugScopingIsBroken) ? function(s){return parseInt(s);} : function(s){return window.parseInt(s);};
    var xisNaN = ((typeof(isNaN) != 'undefined') && ! bugScopingIsBroken) ? function(n){return isNaN(n);} : function(n){return window.isNaN(n);};
    var xescape = ((typeof(escape) != 'undefined') && ! bugScopingIsBroken) ? function(s){return escape(s);} : function(s){return window.escape(s);};
    var xunescape = ((typeof(unescape) != 'undefined') && ! bugScopingIsBroken) ? function(s){return unescape(s);} : function(s){return window.unescape(s);};
    var xencodeURIComponent = ((typeof(encodeURIComponent) != 'undefined') && ! bugScopingIsBroken) ? function(s){return encodeURIComponent(s);} : function(s){return window.encodeURIComponent(s);};
    var xdecodeURIComponent = ((typeof(decodeURIComponent) != 'undefined') && ! bugScopingIsBroken) ? function(s){return decodeURIComponent(s);} : function(s){return window.decodeURIComponent(s);};
    var xfromCharCode = ((typeof(String) != 'undefined') && ! bugScopingIsBroken) ? function(c){return String.fromCharCode(c);} : function(c){return window.String.fromCharCode(c);};
    var xnewArray = ((typeof(Array) != 'undefined') && ! bugScopingIsBroken) ? function(n){return new Array(n);} : function(n){return new window.Array(n);};
    var xround = ((typeof(Math) != 'undefined') && ! bugScopingIsBroken) ? function(n){return Math.round(n);} : function(n){return window.Math.round(n);};
    var xfloor = ((typeof(Math) != 'undefined') && ! bugScopingIsBroken) ? function(n){return Math.floor(n);} : function(n){return window.Math.floor(n);};
    var now = ((typeof(Date) != 'undefined') && ! bugScopingIsBroken) ? function(){return new Date;} : function(){return new window.Date;};

    // XML namespaces we care about
    var namespaces = {
        'atom': 'http://www.w3.org/2005/Atom',
        'bio': 'http://purl.org/vocab/bio/0.1/',
        'cc0': 'http://creativecommons.org/ns#',
        'cc': 'http://web.resource.org/cc/',
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'dc': 'http://purl.org/dc/elements/1.1/',
        'dc0': 'http://purl.org/metadata/dublin_core#',
        'ddc': 'http://purl.org/net/ddc#',
        'doap': 'http://usefulinc.com/ns/doap#',
        'enclosure': 'http://purl.oclc.org/net/rss_2.0/enc#',
        'feedburner': 'http://rssnamespace.org/feedburner/ext/1.0',
        'foaf': 'http://xmlns.com/foaf/0.1/',
        'label': 'http://www.w3.org/2004/12/q/contentlabel#',
        'owl': 'http://www.w3.org/2002/07/owl#',
        'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
        'rss': 'http://purl.org/rss/1.0/',
        'rss0': 'http://my.netscape.com/rdf/simple/0.9/',
        'smw': 'http://smw.ontoware.org/2005/smw#',
        'xhtml': 'http://www.w3.org/1999/xhtml',
        'xs': 'http://www.w3.org/2001/XMLSchema#',
        'xul': 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };

    // do not make a text node longer than this, it will expose all
    // sorts of browser bugs; the actual limit is slightly larger,
    // 4096 is a nice round number.
    var MAXTXTSZ = 4096;

    // like String.fromCharCode(ord), but encodes surrogate pairs and
    // only processes one argument
    var unichr = function (ord) {
        if ((ord >= 0) && (ord <= 0xffff))
        {
            return xfromCharCode(ord);
        }
        if ((ord >= 0x10000) && (ord <= 0x10ffff))
        {
            // encode as a UTF-16 surrogate pair
            ord = ord - 0x10000;
            return xfromCharCode(0xd800 | (ord >> 10)) + xfromCharCode(0xdc00 | (ord & 0x3ff));
        }
        throw 'unichr: argument must be in Unicode range (U+0000 ... U+10FFFF)';
    };

    // like c.charCodeAt(0), but works for surrogate pairs and
    // requires c to contain exactly one unicode character
    var uniord = function(c) {
        c = '' + c;
        if (c.length == 1)
        {
            var o = c.charCodeAt(0);
            return o;
        }
        if (c.length == 2)
        {
            var cc0 = c.charCodeAt(0);
            var cc1 = c.charCodeAt(1);
            if ((cc0 >= 0xd800)
                &&
                (cc0 <= 0xdbff)
                &&
                (cc1 >= 0xdc00)
                &&
                (cc1 <= 0xdfff))
            {
                var o = 0x10000 + (((cc0 & 0x3ff) << 10) | (cc1 & 0x3ff));
                return o;
            }
        }
        throw 'uniord: argument must be a single unicode character or surrogate pair';
    };

    var rep = function(s, count) {
        s = s ? ('' + s) : '';
        if (! s) return s;
        var o = [];
        var mx = xfloor(MAXTXTSZ / s.length);
        if (! mx) mx = 1;
        while (count)
        {
            var seg = (count > mx) ? mx : count;
            count = count - seg;
            o[o.length] = xnewArray(1 + seg).join(s ? ('' + s) : '');
        }
        return o.join('');
    };

    // quote a string for use in a JavaScript or ECMAScript string
    // literal in a context where the character encoding is not known;
    // converts non-printable-ASCII characters to hexadecimal escape
    // sequences

    // NOTE: this produces '\\x' + hex + hex escape sequences not
    // permitted by JSON (RFC 4627)

    // NOTE: this escapes '<', '&', and the '>' in ']]' + '>' so that
    // the result is safe to put inside a CDATA section or in HTML
    // PCDATA without further escaping.

    var escapeJavaScript = function(s) {
        if (! s) return s;
        s = '' + s;
        var o = [];
        for (var i = 0; i < s.length; i ++)
        {
            var ch = s.charAt(i);
            var c = s.charCodeAt(i);
            if (c >= 0x100)
            {
                o[o.length] = '\\u' + (0x10000 + s.charCodeAt(i)).toString(16).toLowerCase().substr(1);
            }
            else if (ch == '\x09')
            {
                o[o.length] = '\\t';
            }
            else if (ch == '\x0a')
            {
                o[o.length] = '\\n';
            }
            else if (ch == '\x0d')
            {
                o[o.length] = '\\r';
            }
            else if (ch == '\x08')
            {
                o[o.length] = '\\b';
            }
            else if (ch == '\x0c')
            {
                o[o.length] = '\\f';
            }
            else if ((ch == '\\')
                     ||
                     (ch == '\"')
                     ||
                     (ch == '\''))
            {
                o[o.length] = '\\' + ch;
            }
            else if ((c < 0x20)
                     ||
                     (c == 0x26)
                     ||
                     (c == 0x3c)
                     ||
                     ((c >= 0x7f)
                      &&
                      (c <= 0xff)))
            {
                o[o.length] = '\\x' + (0x100 + s.charCodeAt(i)).toString(16).toLowerCase().substr(1);
            }
            else
            {
                o[o.length] = ch;
            }
        }
        return o.join('').split(']]' + '>').join(']]\\x3e');
    };

    // UTF-16 to UTF-8
    var utf8 = function (s) {
        if (! s) return s;
        if (typeof(s) != 'string') s = '' + s;
        var e;
        try
        {
            return xunescape(xencodeURIComponent(s));
        }
        catch (e)
        {
            var o = [];
            for (var i = 0; i < s.length; i ++)
            {
                var ch = s.charAt(i);
                var c = uniord(ch);
                if ((((c >> 10) << 10) == 0xd800)
                    &&
                    ((i + 1) < s.length))
                {
                    var ch2 = s.charAt(i + 1);
                    var c2 = uniord(ch2);
                    if (((c2 >> 10) << 10) == 0xdc00)
                    {
                        i = i + 1;
                        ch = ch + ch2;
                        c = uniord(ch);
                    }
                }
                var ee;
                try
                {
                    o[o.length] = xunescape(xencodeURIComponent(ch));
                }
                catch (ee)
                {
                    if ((c >= 0x00) && (c <= 0x7f))
                    {
                        o[o.length] = ch;
                    }
                    else if ((c >= 0x80) && (c <= 0x10ffff))
                    {
                        var bs = '';
                        var b0 = 0x80;
                        while (c)
                        {
                            var b = 0x80 | (c & 0x3f);
                            c = c >> 6;
                            if (! c)
                            {
                                if (! ((b0 >> 1) & b))
                                {
                                    b = b | b0;
                                    b0 = 0;
                                }
                            }
                            bs = xfromCharCode(b) + bs;
                            if (b0)
                            {
                                b0 = (b0 >> 1) | 0x80;
                            }
                        }
                        if (b0)
                        {
                            bs = xfromCharCode(b0) + bs;
                        }
                        o[o.length] = bs;
                    }
                }
            }
            return o.join('');
        }
    };

    // all characters excluding NUL, surrogates, U+??FFFE, and U+??FFFF
    var utf8_character_pat = (
        '(?:' +
        '[\\x01-\\x7f]' + // U+0001 .. U+007F
        '|' +
        '[\\xc2-\\xdf][\\x80-\\xbf]' + // U+0080 .. U+07FF
        '|' +
        '\\xe0[\\xa0-\\xbf][\\x80-\\xbf]' + // U+0800 .. U+0FFF
        '|' +
        '[\\xe1-\\xec\\xee][\\x80-\\xbf]{2}' + // U+1000 .. U+CFFF, U+E000 .. U+EFFF
        '|' +
        '\\xed[\\x80-\\x9f][\\x80-\\xbf]' + // U+D000 .. U+D7FF
        '|' +
        '\\xef(?:[\\x80-\\xbe][\\x80-\\xbf]|\\xbf[\\x80-\\xbd])' + // U+E000 .. U+FFFD
        '|' +
        '\\xf0(?:[\\x90-\\x9e\\xa0-\\xae\\xb0-\\xbe][\\x80-\\xbf]{2}|[\\x9f\\xaf\\xbf](?:[\\x80-\\xbe][\\x80-\\xbf]|\\xbf[\\x80-\\xbd]))' + // U+10000 .. U+1FFFD, ... U+30000 .. U+3FFFD
        '|' +
        '[\\xf1-\\xf3](?:[\\x80-\\x8e\\x90-\\x9e\\xa0-\\xae\\xb0-\\xbe][\\x80-\\xbf]{2}|[\\x8f\\x9f\\xaf\\xbf](?:[\\x80-\\xbe][\\x80-\\xbf]|\\xbf[\\x80-\\xbd]))' + // U+40000 .. U+4FFFD, ... U+F0000 .. U+FFFFD
        '|' +
        '\\xf4(?:[\\x80-\\x8e][\\x80-\\xbf]{2}|\\x8f(?:[\\x80-\\xbe][\\x80-\\xbf]|\\xbf[\\x80-\\xbd]))' + // U+100000 .. U+10FFFD
        ')');
    var _utf8_characters_re = new RegExp(
        // pattern
        utf8_character_pat,
        // flags
        'g');


    // pattern for binary data mixed with UTF-8, unpaired surrogate
    // (CESU-8) sequences, and sequences representing U+??FFFE and
    // U+??FFFF
    var _utf8_cesu8_binary_re = new RegExp(
        // pattern
        utf8_character_pat +
        '|' +
        '(' + (
            '\\xef\\xbf[\\xbe\\xbf]' + // U+FFFE, U+FFFF
            '|' +
            '\\xf0[\\x9f\\xaf\\xbf]\\xbf[\\xbe\\xbf]' + // U+1FFFE, U+1FFFF, U+2FFFE, U+2FFFF, U+3FFFE, U+3FFFF
            '|' +
            '[\\xf1-\\xf3][\\x8f\\x9f\\xaf\\xbf]\\xbf[\\xbe\\xbf]' + // U+4FFFE, U+4FFFF, U+5FFFE, U+5FFFF, ... U+FFFFE, U+FFFFF
            '|' +
            '\\xf4\\x8f\\xbf[\\xbe\\xbf]' + // U+10FFFE, U+10FFFF
            '|' +
            '\\xed[\\xa0-\\xbf][\\x80-\\xbf]') + // U+D800 .. U+DFFF (CESU-8/unpaired surrogates)
        ')' +
        '|' +
        '(' + (
            '[\\x80-\\xff]') +  // invalid bytes
        ')',
        // flags
        'g');

    // UTF-8 to UTF-16
    var utf16 = function (s) {
        if (! s) return s;
        if (typeof(s) != 'string') s = '' + s;
        var sa = s.split('\0');
        var o = [];
        for (var i = 0; i < sa.length; i ++)
        {
            if (sa[i].replace(_utf8_characters_re, '') == '')
            {
                var e;
                try
                {
                    o[o.length] = xdecodeURIComponent(xescape(sa[i]));
                    continue;
                }
                catch (e)
                {
                }
            }
            var oo = [];
            if (sa[i].replace(
                    _utf8_cesu8_binary_re,
                    function (m, cesu8, invalid) {
                        m = '' + m;
                        cesu8 = cesu8 ? ('' + cesu8) : cesu8;
                        invalid = invalid ? ('' + invalid) : invalid;
                        if (invalid) {
                            oo[oo.length] = '\ufffd';
                            return '';
                        }
                        if (! cesu8) {
                            var ee;
                            try
                            {
                                oo[oo.length] = xdecodeURIComponent(xescape(m));
                                return '';
                            }
                            catch (ee)
                            {
                            }
                        }
                        if (m.length == 1)
                        {
                            oo[oo.length] = m;
                            return '';
                        }
                        var c = m.charCodeAt(0) & (0x7f >> m.length);
                        for (var j = 1; j < m.length; j ++)
                        {
                            c = (c << 6) | (m.charCodeAt(j) & 0x3f);
                        }
                        oo[oo.length] = unichr(c);
                        return '';
                    }) != '')
            {
                throw "Unable to process some parts of the UTF-8 sequence.";
            }
            o[o.length] = oo.join('');
        }
        s = o.join('\0');
        return s;
    };

    // Regular expressions using UTF-8 for actual regexp processing --
    // no case-insensitive mode [tables for that are truly huge], but
    // it supports all of Unicode (U+0000 ... U+10ffff). While
    // processing the NUL byte is remapped to '\xff' since the KJS
    // usage of PCRE cannot handle NUL inside patterns or in input --
    // the NUL-induced failures are silent but deadly.

    var re_utf8 = function (s) {
        if (! s) return s;
        s = '' + s;
        return utf8(s).split('\x00').join('\xff');
    };

    var re_utf16 = function (s) {
        if (! s) return s;
        s = '' + s;
        s = s.split('\xff');
        s = s.join('\x00');
        s = utf16(s);
        return s;
    };

    // Special regular expression character escapes
    var _re_escapes = {
        'a': '\x07',
        'b': '\x08',
        't': '\t',
        'n': '\n',
        'v': '\x0b',
        'f': '\x0c',
        'r': '\r',
        'e': '\x1b'
    };

    // Database of special regular expression character classes
    // generated by brute-force matching all of Unicode 4.1 using the
    // python 2.5 sre module.
    var _re_cclasses = {
        '\\D': re_utf8('\x00-\/:-\xb1\xb4-\xb8\xba-\u065f\u066a-\u06ef\u06fa-\u0965\u0970-\u09e5\u09f0-\u0a65\u0a70-\u0ae5\u0af0-\u0b65\u0b70-\u0be5\u0bf0-\u0c65\u0c70-\u0ce5\u0cf0-\u0d65\u0d70-\u0e4f\u0e5a-\u0ecf\u0eda-\u0f1f\u0f2a-\u103f\u104a-\u1368\u1372-\u17df\u17ea-\u180f\u181a-\u1945\u1950-\u19cf\u19da-\u206f\u2071-\u2073\u207a-\u207f\u208a-\u245f\u2469-\u2473\u247d-\u2487\u2491-\u24e9\u24eb-\u24f4\u24fe\u2500-\u2775\u277f\u2789\u2793-\uff0f\uff1a-\\U0001049f\\U000104aa-\\U00010a3f\\U00010a44-\\U0001d7cd\\U0001d800-\\U0010ffff'),
        '\\S': re_utf8('\x00-\x08\x0e-\x1b!-\x84\x86-\x9f\xa1-\u167f\u1681-\u1fff\u200c-\u2027\u202a-\u202e\u2030-\u205e\u2060-\u2fff\u3001-\\U0010ffff'),
        '\\W': re_utf8('\x00-\/:-@\[-\^\`\{-\xa9\xab-\xb1\xb4\xb6-\xb8\xbb\xbf\xd7\xf7\u0242-\u024f\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02ed\u02ef-\u0379\u037b-\u0385\u0387\u038b\u038d\u03a2\u03cf\u03f6\u0482-\u0489\u04cf\u04fa-\u04ff\u0510-\u0530\u0557-\u0558\u055a-\u0560\u0588-\u05cf\u05eb-\u05ef\u05f3-\u0620\u063b-\u063f\u064b-\u065f\u066a-\u066d\u0670\u06d4\u06d6-\u06e4\u06e7-\u06ed\u06fd-\u06fe\u0700-\u070f\u0711\u0730-\u074c\u076e-\u077f\u07a6-\u07b0\u07b2-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0965\u0970-\u097c\u097e-\u0984\u098d-\u098e\u0991-\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba-\u09bc\u09be-\u09cd\u09cf-\u09db\u09de\u09e2-\u09e5\u09f2-\u09f3\u09f8\u09fa-\u0a04\u0a0b-\u0a0e\u0a11-\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a-\u0a58\u0a5d\u0a5f-\u0a65\u0a70-\u0a71\u0a75-\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba-\u0abc\u0abe-\u0acf\u0ad1-\u0adf\u0ae2-\u0ae5\u0af0-\u0b04\u0b0d-\u0b0e\u0b11-\u0b12\u0b29\u0b31\u0b34\u0b3a-\u0b3c\u0b3e-\u0b5b\u0b5e\u0b62-\u0b65\u0b70\u0b72-\u0b82\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0be5\u0bf3-\u0c04\u0c0d\u0c11\u0c29\u0c34\u0c3a-\u0c5f\u0c62-\u0c65\u0c70-\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba-\u0cbc\u0cbe-\u0cdd\u0cdf\u0ce2-\u0ce5\u0cf0-\u0d04\u0d0d\u0d11\u0d29\u0d3a-\u0d5f\u0d62-\u0d65\u0d70-\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe-\u0dbf\u0dc7-\u0e00\u0e31\u0e34-\u0e3f\u0e47-\u0e4f\u0e5a-\u0e80\u0e83\u0e85-\u0e86\u0e89\u0e8b-\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8-\u0ea9\u0eac\u0eb1\u0eb4-\u0ebc\u0ebe-\u0ebf\u0ec5\u0ec7-\u0ecf\u0eda-\u0edb\u0ede-\u0eff\u0f01-\u0f1f\u0f34-\u0f3f\u0f48\u0f6b-\u0f87\u0f8c-\u0fff\u1022\u1028\u102b-\u103f\u104a-\u104f\u1056-\u109f\u10c6-\u10cf\u10fb\u10fd-\u10ff\u115a-\u115e\u11a3-\u11a7\u11fa-\u11ff\u1249\u124e-\u124f\u1257\u1259\u125e-\u125f\u1289\u128e-\u128f\u12b1\u12b6-\u12b7\u12bf\u12c1\u12c6-\u12c7\u12d7\u1311\u1316-\u1317\u135b-\u1368\u137d-\u137f\u1390-\u139f\u13f5-\u1400\u166d-\u166e\u1677-\u1680\u169b-\u169f\u16eb-\u16ed\u16f1-\u16ff\u170d\u1712-\u171f\u1732-\u173f\u1752-\u175f\u176d\u1771-\u177f\u17b4-\u17d6\u17d8-\u17db\u17dd-\u17df\u17ea-\u17ef\u17fa-\u180f\u181a-\u181f\u1878-\u187f\u18a9-\u18ff\u191d-\u1945\u196e-\u196f\u1975-\u197f\u19aa-\u19c0\u19c8-\u19cf\u19da-\u19ff\u1a17-\u1cff\u1dc0-\u1dff\u1e9c-\u1e9f\u1efa-\u1eff\u1f16-\u1f17\u1f1e-\u1f1f\u1f46-\u1f47\u1f4e-\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e-\u1f7f\u1fb5\u1fbd\u1fbf-\u1fc1\u1fc5\u1fcd-\u1fcf\u1fd4-\u1fd5\u1fdc-\u1fdf\u1fed-\u1ff1\u1ff5\u1ffd-\u206f\u2072-\u2073\u207a-\u207e\u208a-\u208f\u2095-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u2132\u213a-\u213b\u2140-\u2144\u214a-\u2152\u2183-\u245f\u249c-\u24e9\u2500-\u2775\u2794-\u2bff\u2c2f\u2c5f-\u2c7f\u2ce5-\u2cfc\u2cfe-\u2cff\u2d26-\u2d2f\u2d66-\u2d6e\u2d70-\u2d7f\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf-\u3004\u3008-\u3020\u302a-\u3030\u3036-\u3037\u303d-\u3040\u3097-\u309c\u30a0\u30fb\u3100-\u3104\u312d-\u3130\u318f-\u3191\u3196-\u319f\u31b8-\u31ef\u3200-\u321f\u322a-\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u33ff\u4db6-\u4dff\u9fbc-\u9fff\ua48d-\ua7ff\ua802\ua806\ua80b\ua823-\uabff\ud7a4-\uf8ff\ufa2e-\ufa2f\ufa6b-\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb1e\ufb29\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbb2-\ufbd2\ufd3e-\ufd4f\ufd90-\ufd91\ufdc8-\ufdef\ufdfc-\ufe6f\ufe75\ufefd-\uff0f\uff1a-\uff20\uff3b-\uff40\uff5b-\uff65\uffbf-\uffc1\uffc8-\uffc9\uffd0-\uffd1\uffd8-\uffd9\uffdd-\uffff\\U0001000c\\U00010027\\U0001003b\\U0001003e\\U0001004e-\\U0001004f\\U0001005e-\\U0001007f\\U000100fb-\\U00010106\\U00010134-\\U0001013f\\U00010179-\\U00010189\\U0001018b-\\U000102ff\\U0001031f\\U00010324-\\U0001032f\\U0001034b-\\U0001037f\\U0001039e-\\U0001039f\\U000103c4-\\U000103c7\\U000103d0\\U000103d6-\\U000103ff\\U0001049e-\\U0001049f\\U000104aa-\\U000107ff\\U00010806-\\U00010807\\U00010809\\U00010836\\U00010839-\\U0001083b\\U0001083d-\\U0001083e\\U00010840-\\U000109ff\\U00010a01-\\U00010a0f\\U00010a14\\U00010a18\\U00010a34-\\U00010a3f\\U00010a48-\\U0001d3ff\\U0001d455\\U0001d49d\\U0001d4a0-\\U0001d4a1\\U0001d4a3-\\U0001d4a4\\U0001d4a7-\\U0001d4a8\\U0001d4ad\\U0001d4ba\\U0001d4bc\\U0001d4c4\\U0001d506\\U0001d50b-\\U0001d50c\\U0001d515\\U0001d51d\\U0001d53a\\U0001d53f\\U0001d545\\U0001d547-\\U0001d549\\U0001d551\\U0001d6a6-\\U0001d6a7\\U0001d6c1\\U0001d6db\\U0001d6fb\\U0001d715\\U0001d735\\U0001d74f\\U0001d76f\\U0001d789\\U0001d7a9\\U0001d7c3\\U0001d7ca-\\U0001d7cd\\U0001d800-\\U0001ffff\\U0002a6d7-\\U0002f7ff\\U0002fa1e-\\U0010ffff'),
        '\\d': re_utf8('0-9\xb2-\xb3\xb9\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1369-\u1371\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u2070\u2074-\u2079\u2080-\u2089\u2460-\u2468\u2474-\u247c\u2488-\u2490\u24ea\u24f5-\u24fd\u24ff\u2776-\u277e\u2780-\u2788\u278a-\u2792\uff10-\uff19\\U000104a0-\\U000104a9\\U00010a40-\\U00010a43\\U0001d7ce-\\U0001d7ff'),
        '\\s': re_utf8('\t-\r\x1c-\x20\x85\xa0\u1680\u2000-\u200b\u2028-\u2029\u202f\u205f\u3000'),
        '\\w': re_utf8('0-9A-Z_a-z\xaa\xb2-\xb3\xb5\xb9-\xba\xbc-\xbe\xc0-\xd6\xd8-\xf6\xf8-\u0241\u0250-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ee\u037a\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03f5\u03f7-\u0481\u048a-\u04ce\u04d0-\u04f9\u0500-\u050f\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0640-\u064a\u0660-\u0669\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u076d\u0780-\u07a5\u07b1\u0904-\u0939\u093d\u0950\u0958-\u0961\u0966-\u096f\u097d\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09e6-\u09f1\u09f4-\u09f7\u09f9\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a66-\u0a6f\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0ae6-\u0aef\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b66-\u0b6f\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0be6-\u0bf2\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c66-\u0c6f\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0ce6-\u0cef\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61\u0d66-\u0d6f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32-\u0e33\u0e40-\u0e46\u0e50-\u0e59\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0ed0-\u0ed9\u0edc-\u0edd\u0f00\u0f20-\u0f33\u0f40-\u0f47\u0f49-\u0f6a\u0f88-\u0f8b\u1000-\u1021\u1023-\u1027\u1029-\u102a\u1040-\u1049\u1050-\u1055\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1369-\u137c\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u17e0-\u17e9\u17f0-\u17f9\u1810-\u1819\u1820-\u1877\u1880-\u18a8\u1900-\u191c\u1946-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u19d0-\u19d9\u1a00-\u1a16\u1d00-\u1dbf\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2070-\u2071\u2074-\u2079\u207f-\u2089\u2090-\u2094\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2131\u2133-\u2139\u213c-\u213f\u2145-\u2149\u2153-\u2182\u2460-\u249b\u24ea-\u24ff\u2776-\u2793\u2c00-\u2c2e\u2c30-\u2c5e\u2c80-\u2ce4\u2cfd\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312c\u3131-\u318e\u3192-\u3195\u31a0-\u31b7\u31f0-\u31ff\u3220-\u3229\u3251-\u325f\u3280-\u3289\u32b1-\u32bf\u3400-\u4db5\u4e00-\u9fbb\ua000-\ua48c\ua800-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\uac00-\ud7a3\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\\U00010000-\\U0001000b\\U0001000d-\\U00010026\\U00010028-\\U0001003a\\U0001003c-\\U0001003d\\U0001003f-\\U0001004d\\U00010050-\\U0001005d\\U00010080-\\U000100fa\\U00010107-\\U00010133\\U00010140-\\U00010178\\U0001018a\\U00010300-\\U0001031e\\U00010320-\\U00010323\\U00010330-\\U0001034a\\U00010380-\\U0001039d\\U000103a0-\\U000103c3\\U000103c8-\\U000103cf\\U000103d1-\\U000103d5\\U00010400-\\U0001049d\\U000104a0-\\U000104a9\\U00010800-\\U00010805\\U00010808\\U0001080a-\\U00010835\\U00010837-\\U00010838\\U0001083c\\U0001083f\\U00010a00\\U00010a10-\\U00010a13\\U00010a15-\\U00010a17\\U00010a19-\\U00010a33\\U00010a40-\\U00010a47\\U0001d400-\\U0001d454\\U0001d456-\\U0001d49c\\U0001d49e-\\U0001d49f\\U0001d4a2\\U0001d4a5-\\U0001d4a6\\U0001d4a9-\\U0001d4ac\\U0001d4ae-\\U0001d4b9\\U0001d4bb\\U0001d4bd-\\U0001d4c3\\U0001d4c5-\\U0001d505\\U0001d507-\\U0001d50a\\U0001d50d-\\U0001d514\\U0001d516-\\U0001d51c\\U0001d51e-\\U0001d539\\U0001d53b-\\U0001d53e\\U0001d540-\\U0001d544\\U0001d546\\U0001d54a-\\U0001d550\\U0001d552-\\U0001d6a5\\U0001d6a8-\\U0001d6c0\\U0001d6c2-\\U0001d6da\\U0001d6dc-\\U0001d6fa\\U0001d6fc-\\U0001d714\\U0001d716-\\U0001d734\\U0001d736-\\U0001d74e\\U0001d750-\\U0001d76e\\U0001d770-\\U0001d788\\U0001d78a-\\U0001d7a8\\U0001d7aa-\\U0001d7c2\\U0001d7c4-\\U0001d7c9\\U0001d7ce-\\U0001d7ff\\U00020000-\\U0002a6d6\\U0002f800-\\U0002fa1d')
    };

    var _re_cclass_re = /^\[(\^?)((\\[DSWdsw]|(\\[0-7]{1,3}|\\x[0-9a-fA-F][0-9a-fA-F]|\\U[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\[^DSWdsw\x80-\xfe]|[^\\\]\x80-\xfe]|\\?[\xc0-\xf4][\x80-\xbf]+)(-(\\[0-7]{1,3}|\\x[0-9a-fA-F][0-9a-fA-F]|\\U[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\[^DSWdsw\x80-\xfe]|[^\\\x80-\xfe]|\\?[\xc0-\xf4][\x80-\xbf]+))?)+)\]$/;

    var _re_cclass_part_re = /(\\[DSWdsw])|(\\[0-7]{1,3}|\\x[0-9a-fA-F][0-9a-fA-F]|\\U[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\[^DSWdsw\x80-\xfe]|[^\\\x80-\xfe]|\\?[\xc0-\xf4][\x80-\xbf]+)(-(\\[0-7]{1,3}|\\x[0-9a-fA-F][0-9a-fA-F]|\\U[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]|\\[^DSWdsw\x80-\xfe]|[^\\\x80-\xfe]|\\?[\xc0-\xf4][\x80-\xbf]+))?/g;

    var _re_cclass_char_re = /^\\([0-7]{1,3})|\\x([0-9a-fA-F][0-9a-fA-F])|\\U([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])|\\u([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])|\\([^DSWdsw\x80-\xfe])|([^\\\x80-\xfe])|\\?([\xc0-\xf4][\x80-\xbf]+)$/

        var _re_cclass_char = function (s) {
        return s.replace(
            _re_cclass_char_re,
            function (m, octal, hex8, hex32, hex16, escaped, unescaped, multibyte) {
                if (octal) {
                    cc = 0;
                    octal = '' + octal;
                    while (octal.length)
                    {
                        cc = (cc * 8) + xparseInt(octal.substr(0, 1));
                    }
                    return re_utf8(unichr(cc));
                }
                if (hex8 || hex32 || hex16)
                {
                    return re_utf8(unichr(xparseInt('0x' + (hex8 ? hex8 : (hex32 ? hex32 : hex16)))));
                }
                if (escaped)
                {
                    if (_re_escapes[escaped])
                    {
                        return _re_escapes[escaped];
                    }
                    return escaped;
                }
                if (unescaped || multibyte)
                {
                    return unescaped ? unescaped : multibyte;
                }
                throw "Invalid Regular Expression: unrecognized character in literal";
            });
        return s;
    };
    var _re_cclass_cache = {};

    var _re_quote_byte = function (cc) {
        if (((cc >= uniord('0')) && (cc <= uniord('9')))
            ||
            ((cc >= uniord('A')) && (cc <= uniord('Z')))
            ||
            ((cc >= uniord('a')) && (cc <= uniord('z')))
            ||
            (cc == uniord('_'))
            ||
            (cc == uniord(' ')))
        {
            return unichr(cc);
        }
        if ((cc >= 0x20) && (cc < 0x7f))
        {
            return '\\' + unichr(cc);
        }
        return '\\x' + (0x100 + cc).toString(16).substr(1);
    };
    _re_quote_byte = (
        function () {
            var _re_quote_byte_memoized = xnewArray(256);
            for (var i = 0; i < 256; i ++)
            {
                _re_quote_byte_memoized[i] = _re_quote_byte(i);
            }
            return function (cc) { return _re_quote_byte_memoized[cc]; };
        })();
    // convert UTF-16 RegExp character classes to corresponding UTF-8
    // byte patterns; this supports Python-style \U00xxxxxx escapes to
    // represent characters outside the BMP; case-insensitivity (flags
    // = 'i') is only effective for the ASCII range, pending inclusion
    // of data files from a particular Unicode revision and an
    // efficient implementation.
    var re_cclass = function (s, flags) {
        s = re_utf8(s);
        flags = flags ? flags : '';
        var caseInsensitive = (flags.indexOf('i') >= 0);
        var key = (caseInsensitive ? 'i' : ' ') + s;
        if (_re_cclass_cache[key] != void(null))
        {
            return _re_cclass_cache[key];
        }
        var m = s.match(_re_cclass_re);
        if (! m)
        {
            throw "Invalid Regular Expression: syntax error in character class";
        }
        var sense = m[1] ? false : true;
        var ranges = xnewArray(256);
        var makeSeq = function (node, inner, prefix) {
            prefix = prefix ? prefix : '';
            var parensNeeded = false;
            if (node == 1)
            {
                return sense ? '' : '[^\\x01-\\xff]';
            }
            if ((! node)
                ||
                (node == '*'))
            {
                if (node ? (! sense) : sense)
                {
                    return '[^\\x01-\\xff]';
                }
                else
                {
                    if (! prefix)
                    {
                        return '(?:[\\x01-\\x7f\\xff]|[\\xc2-\\xfe][\\x80-\\xbf]+)';
                    }
                    var b0 = prefix.charCodeAt(0);
                    if ((b0 == 0xff)
                        ||
                        ((b0 & 0xc0) != 0xc0))
                    {
                        return '';
                    }
                    if (((b0 & 0xe0) == 0xc0) && (prefix.length < 2))
                    {
                        return (prefix.length < 2) ? '[\\x80-\\xbf]' : '';
                    }
                    if (((b0 & 0xf0) == 0xe0) && (prefix.length < 3))
                    {
                        return (prefix.length == 2) ? '[\\x80-\\xbf]' : ((b0 == 0xe0) ? '[\\xa0-\\xbf][\\x80-\\xbf]' : ('[\\x80-\\xbf]{' + (3 - prefix.length) + '}'));
                    }
                    if (((b0 & 0xf8) == 0xf0) && (prefix.length < 4))
                    {
                        return (prefix.length == 3) ? '[\\x80-\\xbf]' : ((((b0 == 0xf0) || (b0 == 0xf4))
                                                                          && (prefix.length == 1))
                                                                         ?
                                                                         ((b0 == 0xf0) ? '[\\x90-\\xbf][\\x80-\\xbf]{2}' : '[\\x80-\\x8f][\\x80-\\xbf]{2}')
                                                                         :
                                                                         ('[\\x80-\\xbf]{' + (4 - prefix.length) + '}'));
                    }
                    return '';
                }
            }
            var o = [];
            var tails = {};
            for (var i = sense ? 0 : 1; i < 256; i ++)
            {
                var iprefix = prefix + (i ? xfromCharCode(i) : '');
                if ((i == 0xc0)
                    ||
                    (i == 0xc1)
                    ||
                    ((i > 0xf4)
                     &&
                     (i < 0xff))
                    ||
                    (((i & 0xc0) == 0x80)
                     &&
                     ! inner)
                    ||
                    (((! (i & 0x80))
                      ||
                      ((i & 0xc0) == 0xc0))
                     &&
                     inner)
                    ||
                    ((iprefix >= '\xe0\x80')
                     &&
                     (iprefix <= '\xe0\x9f'))
                    ||
                    ((iprefix >= '\xf0\x80')
                     &&
                     (iprefix <= '\xf0\x8f'))
                    ||
                    ((iprefix >= '\xf4\x90')
                     &&
                     (iprefix < '\xff')))
                {
                    continue;
                }
                if (node[i] || ! sense)
                {
                    var tail = makeSeq(node[i], true, iprefix);
                    if (node[i] && (! tail) && ! sense)
                    {
                        continue;
                    }
                    if (! tails[tail])
                    {
                        tails[tail] = [ o.length, [ ] ];
                    }
                    if ((i > 1)
                        &&
                        tails[tail][1].length
                        &&
                        (tails[tail][1][tails[tail][1].length - 1][1] == (i - 1)))
                    {
                        tails[tail][1][tails[tail][1].length - 1][1] = i;
                    }
                    else
                    {
                        tails[tail][1][tails[tail][1].length] = [ i, i ];
                    }
                    var head = [];
                    var headempty = false;
                    for (var j = 0; j < tails[tail][1].length; j ++)
                    {
                        var k = tails[tail][1][j];
                        if (! k[0] && ! k[1])
                        {
                            headempty = true;
                        }
                        else
                        {
                            head[head.length] = _re_quote_byte(k[0]);
                            if (k[1] != k[0])
                            {
                                if (k[1] > (k[0] + 1))
                                {
                                    head[head.length] = '-';
                                }
                                head[head.length] = _re_quote_byte(k[1]);
                            }
                        }
                    }
                    if ((tail.indexOf('[^\\x01-\\xff]') >= 0)
                        &&
                        (! headempty))
                    {
                        continue;
                    }
                    if ((headempty
                         ||
                         tail)
                        &&
                        (! inner))
                    {
                        parensNeeded = true;
                    }
                    o[tails[tail][0]] = (
                        (headempty ? '(?:' : '')
                        +
                        ((head.length > 1) ? '[' : '')
                        +
                        head.join('')
                        +
                        ((head.length > 1) ? ']' : '')
                        +
                        tail
                        +
                        (headempty ? ')?' : ''));
                }
            }
            if (! o.length)
            {
                return '[^\\x01-\\xff]';
            }
            if (o.length != 1)
            {
                parensNeeded = true;
            }
            return (
                (parensNeeded ? '(?:' : '')
                +
                o.join('|')
                +
                (parensNeeded ? ')' : ''));
        };
        var addSeq = function (seq, endSeq) {
            var node = ranges;
            for (var i = 0; i < seq.length; i ++)
            {
                var cc = seq.charCodeAt(i);
                if ((! node[cc]) || (node[cc] == '*'))
                {
                    if (((i + 1) < seq.length)
                        &&
                        (cc & 0x80)
                        &&
                        (cc != 0xff)
                        &&
                        (seq.substr(i + 1).split('\x80').join('') == '')
                        &&
                        ((node[cc] == '*')
                         ||
                         (endSeq
                          &&
                          ((endSeq.length > seq.length)
                           ||
                           ((endSeq.length == seq.length)
                            &&
                            (endSeq > seq)
                            &&
                            ((endSeq.substr(0, i + 1) > seq.substr(0, i + 1))
                             ||
                             (endSeq.substr(i + 1).split('\xbf').join('\x80') == seq.substr(i + 1))))))))
                    {
                        node[cc] = '*';
                        var skip = (
                            uniord(re_utf16(seq.substr(0, i + 1) + rep('\xbf', seq.substr(i + 1).length)))
                            -
                            uniord(re_utf16(seq)));
                        return skip;
                    }
                    else
                    {
                        node[cc] = ((i + 1) < seq.length) ? xnewArray(256) : 1;
                    }
                }
                if ((i + 1) < seq.length)
                {
                    if (node[cc] == 1)
                    {
                        node[cc] = xnewArray(256);
                        node[cc][0] = 1;
                    }
                    node = node[cc];
                }
            }
            return 0;
        };
        var addRange = function (startSeq, endSeq) {
            for (var i = startSeq; i <= endSeq; i++)
            {
                var seq = unichr(i);
                if (caseInsensitive && (i < 0x80))
                {
                    if (seq.toLowerCase() != seq)
                    {
                        addSeq(re_utf8(seq.toLowerCase()));
                    }
                    if (seq.toUpperCase() != seq)
                    {
                        addSeq(re_utf8(seq.toUpperCase()));
                    }
                }
                i += addSeq(re_utf8(seq), re_utf8((i >= 0x80) ? unichr(endSeq) : void(null)));
            }
        };
        if (m[2].replace(
                _re_cclass_part_re,
                function (m, specialSeq, startSeq, endPart, endSeq) {
                    if (specialSeq)
                    {
                        return _re_cclasses[specialSeq];
                    }
                    return m;
                }).replace(
                    _re_cclass_part_re,
                    function (m, specialSeq, startSeq, endPart, endSeq) {
                        if (specialSeq)
                        {
                            throw "Invalid Regular Expression: special sequence " + specialSeq + " could not be rewritten";
                        }
                        startSeq = uniord(re_utf16(_re_cclass_char(startSeq)));
                        endSeq = endSeq ? uniord(re_utf16(_re_cclass_char(endSeq))) : startSeq;
                        addRange(startSeq, endSeq);
                        return '';
                    }))
        {
            throw "Invalid Regular Expression: character class parse error";
        }
        _re_cclass_cache[key] = makeSeq(ranges);
        return _re_cclass_cache[key];
    };

    // here's the script I used to dump the cache:
    var _dump_cclass_cache = function() {
        var cls = '';
        for (var clsk in _re_cclass_cache)
        {
            cls+='_re_cclass_cache[re_utf8(\'' + escapeJavaScript(re_utf16(clsk)) + '\')]=\'' + escapeJavaScript(re_utf16(_re_cclass_cache[clsk])) + '\';';
        }
        window.prompt('_re_cclass_cache contents:', cls);
    };

    var xml_forbidden_pat = '[\x00-\b\x0b\f\x0e-\x1f\ud800-\udfff\ufffe\uffff]';
    var xml_discouraged_pat = '[\x7f-\x84\x86-\x9f\ufdd0-\ufddf\ud83f\udffe\ud83f\udfff\ud87f\udffe\ud87f\udfff\ud8bf\udffe\ud8bf\udfff\ud8ff\udffe\ud8ff\udfff\ud93f\udffe\ud93f\udfff\ud97f\udffe\ud97f\udfff\ud9bf\udffe\ud9bf\udfff\ud9ff\udffe\ud9ff\udfff\uda3f\udffe\uda3f\udfff\uda7f\udffe\uda7f\udfff\udabf\udffe\udabf\udfff\udaff\udffe\udaff\udfff\udb3f\udffe\udb3f\udfff\udb7f\udffe\udb7f\udfff\udbbf\udffe\udbbf\udfff\udbff\udffe\udbff\udfff]';
    var c1_pat = '[\x80-\x9f]';
    var ws_pat = '[\\s]';

    // pre-heat the cache
    _re_cclass_cache[re_utf8(' ' + xml_forbidden_pat)]='(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\xff]|\\xed[\\xa0-\\xbf][\\x80-\\xbf]|\\xef\\xbf[\\xbe\\xbf])';
    _re_cclass_cache[re_utf8(' ' + xml_discouraged_pat)]='(?:\\x7f|\\xc2[\\x80-\\x84\\x86-\\x9f]|\\xef\\xb7[\\x90-\\x9f]|\\xf0[\\x9f\\xaf\\xbf]\\xbf[\\xbe\\xbf]|[\\xf1-\\xf3][\\x8f\\x9f\\xaf\\xbf]\\xbf[\\xbe\\xbf]|\\xf4\\x8f\\xbf[\\xbe\\xbf])';
    _re_cclass_cache[re_utf8(' ' + c1_pat)]='(?:\\xc2[\\x80-\\x9f])';
    _re_cclass_cache[re_utf8(' ' + ws_pat)]='(?:[\\x09-\\x0d\\x1c- ]|\\xc2[\\x85\\xa0]|\\xe1\\x9a\\x80|\\xe2(?:\\x80[\\x80-\\x8b\\xa8\\xa9\\xaf]|\\x81\\x9f)|\\xe3\\x80\\x80)';

    // seed the cache in case one of those changed...
    _re_cclass_cache[re_utf8(' ' + xml_forbidden_pat)]=re_cclass(xml_forbidden_pat);
    _re_cclass_cache[re_utf8(' ' + xml_discouraged_pat)]=re_cclass(xml_discouraged_pat);
    _re_cclass_cache[re_utf8(' ' + c1_pat)]=re_cclass(c1_pat);
    _re_cclass_cache[re_utf8(' ' + ws_pat)]=re_cclass(ws_pat);

    //_dump_cclass_cache();

    var xml_forbidden_re = new RegExp(
        // pattern
        re_cclass(xml_forbidden_pat),
        // flags
        'g');

    // compatibility characters are also discouraged, but not detected by this regex
    var xml_discouraged_re = new RegExp(
        // pattern
        re_cclass(xml_discouraged_pat),
        // flags
        'g');

    // replace characters disallowed in XML with the replacement character
    var xml_unicode_filter = function(s) {
        if (! s) return s;
        s = re_utf8(s);
        s = s.replace(xml_forbidden_re, function (m) { return re_utf8('\ufffd'); });
        s = re_utf16(s);
        return s;
    };

    // quote a string for use in XML text or attribute value (not
    // CDATA, though)
    var escapeXML = function(s) {
        if (! s) return s;
        s = xml_unicode_filter(s);
        s = s.split('&').join('&' + 'amp;').split('<').join('&' + 'lt;').split('>').join('&' + 'gt;').split('\"').join('&' + 'quot;').split('\'').join('&' + '#39;');
        return re_utf16(re_utf8(s).replace(xml_discouraged_re, function (m) { return '&#' + uniord(re_utf16(m)) + ';'; }));
    };

    // Konqueror cross-domain restrictions sometimes break everything...
    if ((typeof(self) != 'undefined')
        &&
        window
        &&
        (typeof(window.document) == 'undefined')
        &&
        (self != window))
    {
        var msg = "FAILED";
        var msglong = "RSS Panel X failed to load due to insufficient JavaScript privileges.";
        self.onload = function() {
            if (targetURI && scriptURI)
            {
                var eepu;
                try
                {
                    self.open('data:text/html;charset=utf-8,'
                              +
                              xencodeURIComponent(
                                  '<' + '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
                                  +
                                  '<' + 'html xmlns="http://www.w3.org/1999/xhtml">'
                                  +
                                  '<' + 'head>'
                                  +
                                  '<' + 'title>RSS Panel X<' + '/title>'
                                  +
                                  '<' + 'link rel="alternate" href="' + escapeXML('' + targetURI) + '" />'
                                  +
                                  '<' + '/head>'
                                  +
                                  '<' + 'body>'
                                  +
                                  '<' + 'div style="font: 8pt sans-serif;font-weight: normal;font-family: \'Arial Narrow\', \'Helvetica CY\', \'FreeSans\', Arial, Helvetica, sans-serif;position:fixed;top:45%;width:100%;text-align:center;">'
                                  +
                                  escapeXML("RSS Panel X was unable to display in the original page due to JavaScript security restrictions.")
                                  +
                                  '<' + 'br />'
                                  +
                                  '<' + 'a href="javascript:self.close()">'
                                  +
                                  escapeXML("Click here to close this window.")
                                  +
                                  '<' + '/a>'
                                  +
                                  '<' + '/div>'
                                  +
                                  '<' + 'script type="text/javascript" src="'
                                  +
                                  escapeXML(scriptURI)
                                  +
                                  '"><' + '/script>'
                                  +
                                  '<' + '/body>'
                                  +
                                  '<' + '/html>'));
                    msg = "See Pop-Up";
                    msglong = "RSS Panel X has tried to open in a pop-up window.";
                }
                catch (eepu)
                {
                }
            }
            self.location.replace('data:text/html;charset=utf-8,'
                                  +
                                  xencodeURIComponent(
                                      '<' + '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
                                      +
                                      '<' + 'html xmlns="http://www.w3.org/1999/xhtml">'
                                      +
                                      '<' + 'body style="line-height: 15px; height: 15px; width: 70px; position: absolute; top: 0px; left: px; margin: 0px; padding: 4px; border: 1px solid #fcc; text-align: center; color: #fff; background: #f00; font: 12pt sans-serif; font-family: \'Arial Narrow\', \'Helvetica CY\', \'FreeSans\', Arial, Helvetica, sans-serif; overflow: hidden;" title="' + escapeXML(msglong) + '">'
                                      +
                                      escapeXML(msg)
                                      +
                                      '<' + '/body>'
                                      +
                                      '<' + '/html>'),
                                  true);
        };
        return;
    }

    // "global" scope variables
    var RSSPanelVersion = "2.01-bsittler15";

    // connection timeout for XMLHttpRequest in milliseconds
    var WatchdogTimeout = 40e3;

/* ************************** bel *****************************
 *   COLOR & OPACITY Constants for the RSS Reader.
 **************************************************************/
    var intify = function(s) {
        var n = s.length + 2;
        s = s + xfromCharCode(n);
        for (var i = 0; i < s.length; i ++)
        {
            n = ((n & 0xfff800) >> 11) ^ ((n & 0x0007ff) << 11) ^ n ^ ((s.charCodeAt(i) * 0x001001) & 0xffff);
        }
        return n;
    };

    var get_location;
    var _get_location = function() {
        var eel;
        try
        {
            var location_cached = (
                (defined(window.document.location)
                 &&
                 window.document.location)
                ?
                window.document.location
                :
                window.location
                );
            get_location = function () { return location_cached; };
            return get_location();
        }
        catch (eel)
        {
            return '';
        }
    };
    get_location = _get_location;

    /* start urllib.js */
    var undef = void(null);
    var defined = function(o) {
        return o != undef;
    };
    var _remove_dot_segments_re = /(^\.\.?\/|^\.\.?$)|(^\/\.\/|^\/\.$)|(^\/\.\.\/|^\/\.\.$)|^\/?[^\/]/;
    var remove_dot_segments = function(path) {
        path = '' + path;
        var opath = '';
        while (path)
        {
            var m = path.match(_remove_dot_segments_re);
            if (m)
            {
                if (m && m[1])
                {
                    path = path.substr(m[1].length);
                }
                else if (m && m[2])
                {
                    path = '/' + path.substr(m[2].length);
                }
                else if (m && m[3])
                {
                    path = '/' + path.substr(m[3].length);
                    opath = opath.replace(/\/[^\/]*$|^[^\/]*$/, '');
                }
                else
                {
                    opath += m[0];
                    path = path.substr(m[0].length);
                }
            }
            else
            {
                opath += path;
                path = '';
            }
        }
        return opath;
    };
    var _URL_re = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
    var _URL_allowed_re = /([-:\/?#\[\]@!$&\'()*+,;=a-zA-Z0-9._~]+)|(%[46][1-9a-fA-F]|%[57][0-9aA]|%3[0-9]|%2[dDeE]|%5[fF]|%7[eE])|(%[0-9a-fA-F][0-9a-fA-F])|.|\n/;
    var _URL_unreserved_pat = '[-._~a-zA-Z0-9]';
    var _URL_pct_encoded_pat = '(?:%[0-9a-fA-F]{2,2})';
    var _URL_sub_delims_pat = '[!$&\'()*+,;=]';
    var _URL_userinfo_pat = '(?:(?:' + _URL_unreserved_pat + '|' + _URL_pct_encoded_pat + '|' + _URL_sub_delims_pat + '|:)*)';
    var _URL_dec_octet_pat = '(?:[0-9]|[1-9][0-9]{2,3}|2[0-4][0-9]|25[0-5])';
    var _URL_IPv4address_pat = '(?:' + _URL_dec_octet_pat + '\\.' + _URL_dec_octet_pat + '\\.' + _URL_dec_octet_pat + '\\.' + _URL_dec_octet_pat + ')';
    var _URL_h16_pat = '(?:[0-9a-fA-F]{4,4})';
    var _URL_ls32_pat = '(?:' + _URL_h16_pat + ':' + _URL_h16_pat + '|' + _URL_IPv4address_pat + ')';
    var _URL_IPv6address_pat = (
        '(?:' +
        [
            '(?:' + _URL_h16_pat + ':){6,6}' + _URL_ls32_pat,
            '::(?:' + _URL_h16_pat + ':){5,5}' + _URL_ls32_pat,
            _URL_h16_pat + '?::(?:' + _URL_h16_pat + ':){4,4}' + _URL_ls32_pat,
            '(?:(?:' + _URL_h16_pat + ':)?' + _URL_h16_pat + ')?::(?:' + _URL_h16_pat + ':){3,3}' + _URL_ls32_pat,
            '(?:(?:' + _URL_h16_pat + ':){0,2}' + _URL_h16_pat + ')?::(?:' + _URL_h16_pat + ':){2,2}' + _URL_ls32_pat,
            '(?:(?:' + _URL_h16_pat + ':){0,3}' + _URL_h16_pat + ')?::' + _URL_h16_pat + ':' + _URL_ls32_pat,
            '(?:(?:' + _URL_h16_pat + ':){0,4}' + _URL_h16_pat + ')?::' + _URL_ls32_pat,
            '(?:(?:' + _URL_h16_pat + ':){0,5}' + _URL_h16_pat + ')?::' + _URL_h16_pat,
            '(?:(?:' + _URL_h16_pat + ':){0,6}' + _URL_h16_pat + ')?::'].join('|') +
        ')');
    var _URL_IPvFuture_pat = '(?:v[0-9a-fA-F]+\\.(?:' + _URL_unreserved_pat + '|' + _URL_sub_delims_pat + '|:)+)';
    var _URL_IP_literal_pat = '(?:\\[(?:' + _URL_IPv6address_pat + '|' + _URL_IPvFuture_pat + ')\\])';
    var _URL_reg_name_pat = '(?:' + _URL_unreserved_pat + '|' + _URL_pct_encoded_pat + '|' + _URL_sub_delims_pat + ')*';
    var _URL_host_pat = '(?:' + _URL_IP_literal_pat + '|' + _URL_IPv4address_pat + '|' + _URL_reg_name_pat + ')';
    var _URL_port_pat = '(?:[0-9]*)';
    var _URL_authority_pat = '(' + _URL_userinfo_pat + '@)?(' + _URL_host_pat + ')(:' + _URL_port_pat + ')?';
    var _URL_authority_re = new RegExp('^' + _URL_authority_pat + '$');
    var fix_mailboxes = function (s) {
        /* TODO: normalize mailboxes, as seen in RFC822 and RFC2822 */
        return s;
    };
    var fix_pct_encoding = function (s) {
        /* normalize percent-encoding */
        return utf16((utf8(s)).replace(
                         _URL_allowed_re,
                         function (m, normal_unencoded, unreserved_pct_encoded, pct_encoded) {
                             m = '' + m;
                             if (normal_unencoded) return m;
                             if (unreserved_pct_encoded) return xunescape(m);
                             if (pct_encoded) return m.toUpperCase();
                             return xescape(m).split('+').join('%2B').split('\x7f').join('%7F');
                         }));
    };
    var _URL_scheme_default_port = { 'http': 80, 'https': 443, 'ftp': 21, 'gopher': 70, 'telnet': 23, 'ssh': 22, 'nntp': 119, 'nttps': 563 };
    var _URL_scheme_empty_abspath_is_root = { 'file': true, 'http': true, 'https': true, 'ftp': true, 'gopher': true, 'telnet': true, 'ldap': true };
    var URL = function(s, b, strict) {
        s = '' + s;
        /* conversion from IRI to URI and normalization of percent-escapes */
        s = fix_pct_encoding(s);
        /* parsing */
        var m = s.match(_URL_re);
        if (! m)
        {
            m = [ undef, undef, undef, undef, undef, s, undef, undef, undef, undef ];
        }
        /* see RFC 3986 */
        this.scheme = m[1] ? m[2] : undef;
        this.authority = m[3] ? m[4] : undef;
        this.path = m[5];
        this.query = m[6] ? m[7] : undef;
        this.fragment = m[8] ? m[9] : undef;
        /* normalization of scheme */
        if (this.scheme) this.scheme = this.scheme.toLowerCase();
        /* conversion to string */
        this.toString = function() {
            return ((defined(this.scheme) ? (this.scheme + ':') : '')
                    +
                    (defined(this.authority) ? ('//' + this.authority) : '')
                    +
                    (defined(this.path) ? this.path : '')
                    +
                    (defined(this.query) ? ('?' + this.query) : '')
                    +
                    (defined(this.fragment) ? ('#' + this.fragment) : ''));
        };
        if (b != null)
        {
            var r = new URL(this);
            b = new URL(b);
            if ((! strict) && (r.scheme == b.scheme))
            {
                r.scheme = undef;
            }
            if (defined(r.scheme))
            {
                this.scheme = r.scheme;
                this.authority = r.authority;
                this.path = remove_dot_segments(r.path);
                this.query = r.query;
            }
            else
            {
                if (defined(r.authority))
                {
                    this.authority = r.authority;
                    this.path = remove_dot_segments(r.path);
                    this.query = r.query;
                }
                else
                {
                    if (! r.path)
                    {
                        this.path = b.path;
                        if (defined(r.query))
                        {
                            this.query = r.query;
                        }
                        else
                        {
                            this.query = b.query;
                        }
                    }
                    else
                    {
                        if (r.path && r.path.substr(0, 1) == '/')
                        {
                            this.path = remove_dot_segments(r.path);
                        }
                        else
                        {
                            if (defined(b.authority) && (b.path == ''))
                            {
                                this.path = '/' + r.path;
                            }
                            else
                            {
                                this.path = b.path.substr(0, b.path.lastIndexOf('/') + 1) + r.path;
                            }
                            this.path = remove_dot_segments(this.path);
                        }
                        this.query = r.query;
                    }
                    this.authority = b.authority;
                }
                this.scheme = b.scheme;
            }
            this.fragment = r.fragment;
        }
        /* normalization of authority */
        if (defined(this.authority))
        {
            this.authority = this.authority.replace(
                _URL_authority_re,
                function (m, userinfo, host, port)
                {
                    this.userinfo = '' + (userinfo || '');
                    this.host = '' + (host || '');
                    /* normalize host part to lower case but re-normalize percent-escapes to uppercase */
                    this.host = fix_pct_encoding(this.host.toLowerCase());
                    this.port = '' + (port || '');
                    /* omit empty port */
                    if (this.port == ':') this.port = '';
                    /* strip leading zeros from port */
                    this.port = this.port.replace('^:0+([1-9][0-9]*|[0-9])$', ':$1');
                    /* omit default port for common URL schemes */
                    if (this.scheme
                        &&
                        this.port
                        &&
                        (_URL_scheme_default_port[this.scheme] == xparseInt(this.port.substr(1))))
                    {
                        this.port = '';
                    }
                    this.userinfo = this.userinfo ? this.userinfo.substr(0, this.userinfo.length - 1) : undef;
                    this.host = this.host ? this.host : undef;
                    this.port = this.port ? this.port.substr(1) : undef;
                    return (defined(this.userinfo) ? (this.userinfo + '@') : '') + (this.host || '') + (defined(this.port) ? (':' + this.port) : '');
                });
        }
        /* scheme-specific empty path normalization */
        if (_URL_scheme_empty_abspath_is_root[this.scheme]
            &&
            defined(this.authority)
            &&
            (! this.path))
        {
            this.path = '/';
        }
        /* file: empty authority normalization */
        if ((this.scheme == 'file')
            &&
            ((defined(this.authority) && (this.authority == 'localhost'))
             ||
             ((! this.authority) && this.path && (this.path.substr(0, 1) == '/'))))
        {
            this.authority = '';
        }
        /* mailto: normalization (see RFC2368) */
        if ((this.scheme == 'mailto') && (this.path))
        {
            var headers = {};
            if (this.path) this.path = this.path.split('+').join('%2B');
            var m = (this.path || '').match(/^(.*)?([?][^?&=]*=[^?&]*([&][^?&=]*=[^?&]*)*)?$/);
            if (! m)
            {
                if (this.path) headers[':to'] = fix_pct_encoding(xescape(fix_mailboxes(xunescape(this.path))));
            }
            else
            {
                if (m[1]) headers[':to'] = fix_pct_encoding(xescape(fix_mailboxes(xunescape(m[1]))));
                var headers_list = (m[2] || '?').substr(1).split('&');
                for (var ihl = 0; ihl < headers_list.length; ihl ++)
                {
                    var header = headers_list[ihl];
                    var hname = header.substr(0, header.indexOf('='));
                    var hvalue = header.substr(hname.length + 1);
                    hname = fix_pct_encoding(xescape(xunescape(hname.toLowerCase())));
                    hvalue = fix_pct_encoding(xescape(xunescape(hvalue)));
                    if (hname == 'to') hvalue = fix_pct_encoding(xescape(fix_mailboxes(xunescape(hvalue))));
                    if (defined(headers[':' + hname]))
                    {
                        headers[':' + hname] += '%2C%20' + hvalue;
                    }
                    else
                    {
                        headers[':' + hname] = hvalue;
                    }
                }
            }
            /* only allow known-safe headers (to, subject, keywords, and body) */
            this.path = headers[':to'] || '';
            var headers_list = [];
            var safe_headers = [ 'subject', 'keywords', 'body' ];
            for (var ihl = 0; ihl < safe_headers.length; ihl ++)
            {
                var hname = safe_headers[ihl];
                var hvalue = headers[':' + hname];
                if (defined(hvalue))
                {
                    headers_list[headers_list.length] = hname + '=' + hvalue.split('=').join('%3D');
                }
            }
            if (headers_list.length) this.path += '?' + headers_list.join('&');
        }
        /* normalization of path (absolute case) */
        if (this.path && (this.path.substr(0, 1) == '/'))
        {
            this.path = remove_dot_segments(this.path);
        }
    };
    /* end urllib.js */
    var location_minusFragment = function(src)
        {
            src = new URL(src);
            src.fragment = undef;
            return src.toString();
        }

    var hostname = '';
    var eehn;
    try
    {
        hostname = (get_location()).hostname;
    }
    catch (eehn)
    {
    }
    var SHUFFLESEED = intify(('' + hostname).toLowerCase().replace(/^.*\.([^.]+\.([^.]+\.[a-z][a-z0-9]|[a-z][-a-z0-9]+[a-z0-9]))\.?$/, '$1').replace(/^www\./, ''));
    var shuffle = function(pal) {
        var s = SHUFFLESEED;
        while (s)
        {
            var n = s % pal.length;
            s = s / pal.length;
            pal = pal.substr(n, 1) + pal.substr(0, n) + pal.substr(n + 1);
        }
        return '#' + pal;
    };
    var BACKGROUND       = shuffle("cff");
    var TEXT             = shuffle("000");
    var BORDER           = shuffle("09f");
    var TITLE_BACKGROUND = shuffle("09f");
    var TITLE_BORDER     = shuffle("cdf");
    var TITLE_TEXT       = shuffle("fff");
    var OPACITY          = "0.85";

    /* feed handling */
    var feedTypes = {
        'application/rss+xml': true,
        'application/rdf+xml': true,
        'application/atom+xml': true,
        'application/xhtml+xml': true,
        'application/xml': true,
        'text/html': true,
        'text/xml': true,
        'text/x-opml': true,
        'text/xml+opml': true
    };
    var feedTags = {
        'feed': true,
        'RDF': true,
        'rss': true,
        'opml': true
    };
    var feedNamespaces = {};
    feedNamespaces[namespaces.atom] = true;
    feedNamespaces[namespaces.rss] = true;
    feedNamespaces[namespaces.rss0] = true;
    feedNamespaces[namespaces.foaf] = true;
    feedNamespaces[namespaces.rdf] = true;
    feedNamespaces[namespaces.doap] = true;
    /* XHTML tag handling */
    var xhtml = {
        'suppress': {
            'script': true,
            'style': true,
            'textarea': true,
            'title': true
        },
        'valueAttr': {
            'img': 'alt'
        },
        'breakAfter': {
            'br': true,
            'p': true,
            'div': true,
            'hr': true,
            'h1': true,
            'h2': true,
            'h3': true,
            'h4': true,
            'h5': true,
            'blockquote': true,
            'address': true,
            'table': true,
            'tr': true,
            'td': true,
            'form': true,
            'pre': true,
            'xmp': true,
            'listing': true,
            'ol': true,
            'ul': true,
            'menu': true,
            'dir': true,
            'li': true,
            'dl': true,
            'dt': true,
            'dd': true
        },
        'entities': {
            /* xml */
            'amp': '\x26',
            'apos': '\x27',
            'gt': '\x3e',
            'lt': '\x3c',
            'quot': '\x22',
            /* mathml private use */
            'b.phis': '\ue724',
            'b.Upsilon': '\ue723',
            'BadBreak': '\ue894',
            'elinters': '\ue3a7',
            'false': '\ue8a7',
            'fjlig': '\ue3b2',
            'GoodBreak': '\ue893',
            'IndentingNewLine': '\ue891',
            'LeftSkeleton': '\ue850',
            'NotANumber': '\ue8aa',
            'plank': '\ue2d5',
            'RightSkeleton': '\ue851',
            'trpezium': '\ue2ec',
            'true': '\ue8ab',
            /* xhtml + mathml, more or less */
            'Aacgr': '\u0386',
            'aacgr': '\u03ac',
            'Aacute': '\xc1',
            'aacute': '\xe1',
            'Abreve': '\u0102',
            'abreve': '\u0103',
            'ac': '\u223e',
            'acd': '\u223f',
            'acE': '\u223e\u0333',
            'Acirc': '\xc2',
            'acirc': '\xe2',
            'acute': '\xb4',
            'Acy': '\u0410',
            'acy': '\u0430',
            'AElig': '\xc6',
            'aelig': '\xe6',
            'af': '\u2061',
            'Afr': '\ud835\udd04',
            'afr': '\ud835\udd1e',
            'Agr': '\u0391',
            'agr': '\u03b1',
            'Agrave': '\xc0',
            'agrave': '\xe0',
            'alefsym': '\u2135',
            'aleph': '\u2135',
            'Alpha': '\u0391',
            'alpha': '\u03b1',
            'Amacr': '\u0100',
            'amacr': '\u0101',
            'amalg': '\u2a3f',
            'and': '\u2227',
            'And': '\u2a53',
            'andand': '\u2a55',
            'andd': '\u2a5c',
            'andslope': '\u2a58',
            'andv': '\u2a5a',
            'ang': '\u2220',
            'ange': '\u29a4',
            'angle': '\u2220',
            'angmsd': '\u2221',
            'angmsdaa': '\u29a8',
            'angmsdab': '\u29a9',
            'angmsdac': '\u29aa',
            'angmsdad': '\u29ab',
            'angmsdae': '\u29ac',
            'angmsdaf': '\u29ad',
            'angmsdag': '\u29ae',
            'angmsdah': '\u29af',
            'angrt': '\u221f',
            'angrtvb': '\u22be',
            'angrtvbd': '\u299d',
            'angsph': '\u2222',
            'angst': '\u212b',
            'angzarr': '\u237c',
            'Aogon': '\u0104',
            'aogon': '\u0105',
            'Aopf': '\ud835\udd38',
            'aopf': '\ud835\udd52',
            'ap': '\u2248',
            'apacir': '\u2a6f',
            'ape': '\u224a',
            'apE': '\u2a70',
            'apid': '\u224b',
            'ApplyFunction': '\u2061',
            'approx': '\u2248',
            'approxeq': '\u224a',
            'Aring': '\xc5',
            'aring': '\xe5',
            'Ascr': '\ud835\udc9c',
            'ascr': '\ud835\udcb6',
            'Assign': '\u2254',
            'ast': '\x2a',
            'asymp': '\u2248',
            'asympeq': '\u224d',
            'Atilde': '\xc3',
            'atilde': '\xe3',
            'Auml': '\xc4',
            'auml': '\xe4',
            'awconint': '\u2233',
            'awint': '\u2a11',
            'b.alpha': '\ud835\udec2',
            'b.beta': '\ud835\udec3',
            'b.chi': '\ud835\uded8',
            'b.Delta': '\ud835\udeab',
            'b.delta': '\ud835\udec5',
            'b.epsi': '\ud835\udec6',
            'b.epsiv': '\ud835\udedc',
            'b.eta': '\ud835\udec8',
            'b.Gamma': '\ud835\udeaa',
            'b.gamma': '\ud835\udec4',
            'b.Gammad': '\u03dc',
            'b.gammad': '\u03dd',
            'b.iota': '\ud835\udeca',
            'b.kappa': '\ud835\udecb',
            'b.kappav': '\ud835\udede',
            'b.Lambda': '\ud835\udeb2',
            'b.lambda': '\ud835\udecc',
            'b.mu': '\ud835\udecd',
            'b.nu': '\ud835\udece',
            'b.Omega': '\ud835\udec0',
            'b.omega': '\ud835\udeda',
            'b.Phi': '\ud835\udebd',
            'b.phi': '\ud835\uded7',
            'b.phiv': '\ud835\udedf',
            'b.Pi': '\ud835\udeb7',
            'b.pi': '\ud835\uded1',
            'b.piv': '\ud835\udee1',
            'b.Psi': '\ud835\udebf',
            'b.psi': '\ud835\uded9',
            'b.rho': '\ud835\uded2',
            'b.rhov': '\ud835\udee0',
            'b.Sigma': '\ud835\udeba',
            'b.sigma': '\ud835\uded4',
            'b.sigmav': '\ud835\uded3',
            'b.tau': '\ud835\uded5',
            'b.Theta': '\ud835\udeaf',
            'b.thetas': '\ud835\udec9',
            'b.thetav': '\ud835\udedd',
            'b.Upsi': '\ud835\udebc',
            'b.upsi': '\ud835\uded6',
            'b.Xi': '\ud835\udeb5',
            'b.xi': '\ud835\udecf',
            'b.zeta': '\ud835\udec7',
            'backcong': '\u224c',
            'backepsilon': '\u03f6',
            'backprime': '\u2035',
            'backsim': '\u223d',
            'backsimeq': '\u22cd',
            'Backslash': '\u2216',
            'Barv': '\u2ae7',
            'barvee': '\u22bd',
            'barwed': '\u2305',
            'Barwed': '\u2306',
            'barwedge': '\u2305',
            'bbrk': '\u23b5',
            'bbrktbrk': '\u23b6',
            'bcong': '\u224c',
            'Bcy': '\u0411',
            'bcy': '\u0431',
            'bdquo': '\u201e',
            'becaus': '\u2235',
            'Because': '\u2235',
            'because': '\u2235',
            'bemptyv': '\u29b0',
            'bepsi': '\u03f6',
            'bernou': '\u212c',
            'Bernoullis': '\u212c',
            'Beta': '\u0392',
            'beta': '\u03b2',
            'beth': '\u2136',
            'between': '\u226c',
            'Bfr': '\ud835\udd05',
            'bfr': '\ud835\udd1f',
            'Bgr': '\u0392',
            'bgr': '\u03b2',
            'bigcap': '\u22c2',
            'bigcirc': '\u25ef',
            'bigcup': '\u22c3',
            'bigodot': '\u2a00',
            'bigoplus': '\u2a01',
            'bigotimes': '\u2a02',
            'bigsqcup': '\u2a06',
            'bigstar': '\u2605',
            'bigtriangledown': '\u25bd',
            'bigtriangleup': '\u25b3',
            'biguplus': '\u2a04',
            'bigvee': '\u22c1',
            'bigwedge': '\u22c0',
            'bkarow': '\u290d',
            'blacklozenge': '\u29eb',
            'blacksquare': '\u25aa',
            'blacktriangle': '\u25b4',
            'blacktriangledown': '\u25be',
            'blacktriangleleft': '\u25c2',
            'blacktriangleright': '\u25b8',
            'blank': '\u2423',
            'blk12': '\u2592',
            'blk14': '\u2591',
            'blk34': '\u2593',
            'block': '\u2588',
            'bne': '\x3d\u20e5',
            'bnequiv': '\u2261\u20e5',
            'bnot': '\u2310',
            'bNot': '\u2aed',
            'Bopf': '\ud835\udd39',
            'bopf': '\ud835\udd53',
            'bot': '\u22a5',
            'bottom': '\u22a5',
            'bowtie': '\u22c8',
            'boxbox': '\u29c9',
            'boxdl': '\u2510',
            'boxdL': '\u2555',
            'boxDl': '\u2556',
            'boxDL': '\u2557',
            'boxdr': '\u250c',
            'boxdR': '\u2552',
            'boxDr': '\u2553',
            'boxDR': '\u2554',
            'boxh': '\u2500',
            'boxH': '\u2550',
            'boxhd': '\u252c',
            'boxHd': '\u2564',
            'boxhD': '\u2565',
            'boxHD': '\u2566',
            'boxhu': '\u2534',
            'boxHu': '\u2567',
            'boxhU': '\u2568',
            'boxHU': '\u2569',
            'boxminus': '\u229f',
            'boxplus': '\u229e',
            'boxtimes': '\u22a0',
            'boxul': '\u2518',
            'boxuL': '\u255b',
            'boxUl': '\u255c',
            'boxUL': '\u255d',
            'boxur': '\u2514',
            'boxuR': '\u2558',
            'boxUr': '\u2559',
            'boxUR': '\u255a',
            'boxv': '\u2502',
            'boxV': '\u2551',
            'boxvh': '\u253c',
            'boxvH': '\u256a',
            'boxVh': '\u256b',
            'boxVH': '\u256c',
            'boxvl': '\u2524',
            'boxvL': '\u2561',
            'boxVl': '\u2562',
            'boxVL': '\u2563',
            'boxvr': '\u251c',
            'boxvR': '\u255e',
            'boxVr': '\u255f',
            'boxVR': '\u2560',
            'bprime': '\u2035',
            'breve': '\u02d8',
            'Breve': '\u02d8',
            'brvbar': '\xa6',
            'Bscr': '\u212c',
            'bscr': '\ud835\udcb7',
            'bsemi': '\u204f',
            'bsim': '\u223d',
            'bsime': '\u22cd',
            'bsol': '\x5c',
            'bsolb': '\u29c5',
            'bsolhsub': '\x5c\u2282',
            'bull': '\u2022',
            'bullet': '\u2022',
            'bump': '\u224e',
            'bumpe': '\u224f',
            'bumpE': '\u2aae',
            'Bumpeq': '\u224e',
            'bumpeq': '\u224f',
            'Cacute': '\u0106',
            'cacute': '\u0107',
            'cap': '\u2229',
            'Cap': '\u22d2',
            'capand': '\u2a44',
            'capbrcup': '\u2a49',
            'capcap': '\u2a4b',
            'capcup': '\u2a47',
            'capdot': '\u2a40',
            'CapitalDifferentialD': '\u2145',
            'caps': '\u2229\ufe00',
            'caret': '\u2041',
            'caron': '\u02c7',
            'Cayleys': '\u212d',
            'ccaps': '\u2a4d',
            'Ccaron': '\u010c',
            'ccaron': '\u010d',
            'Ccedil': '\xc7',
            'ccedil': '\xe7',
            'Ccirc': '\u0108',
            'ccirc': '\u0109',
            'Cconint': '\u2230',
            'ccups': '\u2a4c',
            'ccupssm': '\u2a50',
            'Cdot': '\u010a',
            'cdot': '\u010b',
            'cedil': '\xb8',
            'Cedilla': '\xb8',
            'cemptyv': '\u29b2',
            'cent': '\xa2',
            'centerdot': '\xb7',
            'CenterDot': '\xb7',
            'Cfr': '\u212d',
            'cfr': '\ud835\udd20',
            'CHcy': '\u0427',
            'chcy': '\u0447',
            'check': '\u2713',
            'checkmark': '\u2713',
            'Chi': '\u03a7',
            'chi': '\u03c7',
            'cir': '\u25cb',
            'circ': '\u02c6',
            'circeq': '\u2257',
            'circlearrowleft': '\u21ba',
            'circlearrowright': '\u21bb',
            'circledast': '\u229b',
            'circledcirc': '\u229a',
            'circleddash': '\u229d',
            'CircleDot': '\u2299',
            'circledR': '\xae',
            'circledS': '\u24c8',
            'CircleMinus': '\u2296',
            'CirclePlus': '\u2295',
            'CircleTimes': '\u2297',
            'cire': '\u2257',
            'cirE': '\u29c3',
            'cirfnint': '\u2a10',
            'cirmid': '\u2aef',
            'cirscir': '\u29c2',
            'ClockwiseContourIntegral': '\u2232',
            'CloseCurlyDoubleQuote': '\u201d',
            'CloseCurlyQuote': '\u2019',
            'clubs': '\u2663',
            'clubsuit': '\u2663',
            'colon': '\x3a',
            'Colon': '\u2237',
            'colone': '\u2254',
            'Colone': '\u2a74',
            'coloneq': '\u2254',
            'comma': '\x2c',
            'commat': '\x40',
            'comp': '\u2201',
            'compfn': '\u2218',
            'complement': '\u2201',
            'complexes': '\u2102',
            'cong': '\u2245',
            'congdot': '\u2a6d',
            'Congruent': '\u2261',
            'conint': '\u222e',
            'Conint': '\u222f',
            'ContourIntegral': '\u222e',
            'Copf': '\u2102',
            'copf': '\ud835\udd54',
            'coprod': '\u2210',
            'Coproduct': '\u2210',
            'copy': '\xa9',
            'copysr': '\u2117',
            'CounterClockwiseContourIntegral': '\u2233',
            'crarr': '\u21b5',
            'cross': '\u2717',
            'Cross': '\u2a2f',
            'Cscr': '\ud835\udc9e',
            'cscr': '\ud835\udcb8',
            'csub': '\u2acf',
            'csube': '\u2ad1',
            'csup': '\u2ad0',
            'csupe': '\u2ad2',
            'ctdot': '\u22ef',
            'cudarrl': '\u2938',
            'cudarrr': '\u2935',
            'cuepr': '\u22de',
            'cuesc': '\u22df',
            'cularr': '\u21b6',
            'cularrp': '\u293d',
            'cup': '\u222a',
            'Cup': '\u22d3',
            'cupbrcap': '\u2a48',
            'CupCap': '\u224d',
            'cupcap': '\u2a46',
            'cupcup': '\u2a4a',
            'cupdot': '\u228d',
            'cupor': '\u2a45',
            'cups': '\u222a\ufe00',
            'curarr': '\u21b7',
            'curarrm': '\u293c',
            'curlyeqprec': '\u22de',
            'curlyeqsucc': '\u22df',
            'curlyvee': '\u22ce',
            'curlywedge': '\u22cf',
            'curren': '\xa4',
            'curvearrowleft': '\u21b6',
            'curvearrowright': '\u21b7',
            'cuvee': '\u22ce',
            'cuwed': '\u22cf',
            'cwconint': '\u2232',
            'cwint': '\u2231',
            'cylcty': '\u232d',
            'dagger': '\u2020',
            'Dagger': '\u2021',
            'daleth': '\u2138',
            'darr': '\u2193',
            'Darr': '\u21a1',
            'dArr': '\u21d3',
            'dash': '\u2010',
            'dashv': '\u22a3',
            'Dashv': '\u2ae4',
            'dbkarow': '\u290f',
            'dblac': '\u02dd',
            'Dcaron': '\u010e',
            'dcaron': '\u010f',
            'Dcy': '\u0414',
            'dcy': '\u0434',
            'DD': '\u2145',
            'dd': '\u2146',
            'ddagger': '\u2021',
            'ddarr': '\u21ca',
            'DDotrahd': '\u2911',
            'ddotseq': '\u2a77',
            'deg': '\xb0',
            'Del': '\u2207',
            'Delta': '\u0394',
            'delta': '\u03b4',
            'demptyv': '\u29b1',
            'dfisht': '\u297f',
            'Dfr': '\ud835\udd07',
            'dfr': '\ud835\udd21',
            'Dgr': '\u0394',
            'dgr': '\u03b4',
            'dHar': '\u2965',
            'dharl': '\u21c3',
            'dharr': '\u21c2',
            'DiacriticalAcute': '\xb4',
            'DiacriticalDot': '\u02d9',
            'DiacriticalDoubleAcute': '\u02dd',
            'DiacriticalGrave': '\x60',
            'DiacriticalTilde': '\u02dc',
            'diam': '\u22c4',
            'Diamond': '\u22c4',
            'diamond': '\u22c4',
            'diamondsuit': '\u2666',
            'diams': '\u2666',
            'die': '\xa8',
            'DifferentialD': '\u2146',
            'digamma': '\u03dd',
            'disin': '\u22f2',
            'div': '\xf7',
            'divide': '\xf7',
            'divideontimes': '\u22c7',
            'divonx': '\u22c7',
            'DJcy': '\u0402',
            'djcy': '\u0452',
            'dlcorn': '\u231e',
            'dlcrop': '\u230d',
            'dollar': '\x24',
            'Dopf': '\ud835\udd3b',
            'dopf': '\ud835\udd55',
            'Dot': '\xa8',
            'dot': '\u02d9',
            'DotDot': '\x20\u20dc',
            'doteq': '\u2250',
            'doteqdot': '\u2251',
            'DotEqual': '\u2250',
            'dotminus': '\u2238',
            'dotplus': '\u2214',
            'dotsquare': '\u22a1',
            'doublebarwedge': '\u2306',
            'DoubleContourIntegral': '\u222f',
            'DoubleDot': '\xa8',
            'DoubleDownArrow': '\u21d3',
            'DoubleLeftArrow': '\u21d0',
            'DoubleLeftRightArrow': '\u21d4',
            'DoubleLeftTee': '\u2ae4',
            'DoubleLongLeftArrow': '\u27f8',
            'DoubleLongLeftRightArrow': '\u27fa',
            'DoubleLongRightArrow': '\u27f9',
            'DoubleRightArrow': '\u21d2',
            'DoubleRightTee': '\u22a8',
            'DoubleUpArrow': '\u21d1',
            'DoubleUpDownArrow': '\u21d5',
            'DoubleVerticalBar': '\u2225',
            'downarrow': '\u2193',
            'DownArrow': '\u2193',
            'Downarrow': '\u21d3',
            'DownArrowBar': '\u2913',
            'DownArrowUpArrow': '\u21f5',
            'DownBreve': '\x20\u0311',
            'downdownarrows': '\u21ca',
            'downharpoonleft': '\u21c3',
            'downharpoonright': '\u21c2',
            'DownLeftRightVector': '\u2950',
            'DownLeftTeeVector': '\u295e',
            'DownLeftVector': '\u21bd',
            'DownLeftVectorBar': '\u2956',
            'DownRightTeeVector': '\u295f',
            'DownRightVector': '\u21c1',
            'DownRightVectorBar': '\u2957',
            'DownTee': '\u22a4',
            'DownTeeArrow': '\u21a7',
            'drbkarow': '\u2910',
            'drcorn': '\u231f',
            'drcrop': '\u230c',
            'Dscr': '\ud835\udc9f',
            'dscr': '\ud835\udcb9',
            'DScy': '\u0405',
            'dscy': '\u0455',
            'dsol': '\u29f6',
            'Dstrok': '\u0110',
            'dstrok': '\u0111',
            'dtdot': '\u22f1',
            'dtri': '\u25bf',
            'dtrif': '\u25be',
            'duarr': '\u21f5',
            'duhar': '\u296f',
            'dwangle': '\u29a6',
            'DZcy': '\u040f',
            'dzcy': '\u045f',
            'dzigrarr': '\u27ff',
            'Eacgr': '\u0388',
            'eacgr': '\u03ad',
            'Eacute': '\xc9',
            'eacute': '\xe9',
            'easter': '\u2a6e',
            'Ecaron': '\u011a',
            'ecaron': '\u011b',
            'ecir': '\u2256',
            'Ecirc': '\xca',
            'ecirc': '\xea',
            'ecolon': '\u2255',
            'Ecy': '\u042d',
            'ecy': '\u044d',
            'eDDot': '\u2a77',
            'Edot': '\u0116',
            'edot': '\u0117',
            'eDot': '\u2251',
            'ee': '\u2147',
            'EEacgr': '\u0389',
            'eeacgr': '\u03ae',
            'EEgr': '\u0397',
            'eegr': '\u03b7',
            'efDot': '\u2252',
            'Efr': '\ud835\udd08',
            'efr': '\ud835\udd22',
            'eg': '\u2a9a',
            'Egr': '\u0395',
            'egr': '\u03b5',
            'Egrave': '\xc8',
            'egrave': '\xe8',
            'egs': '\u2a96',
            'egsdot': '\u2a98',
            'el': '\u2a99',
            'Element': '\u2208',
            'ell': '\u2113',
            'els': '\u2a95',
            'elsdot': '\u2a97',
            'Emacr': '\u0112',
            'emacr': '\u0113',
            'empty': '\u2205',
            'emptyset': '\u2205',
            'EmptySmallSquare': '\u25fb',
            'emptyv': '\u2205',
            'EmptyVerySmallSquare': '\u25ab',
            'emsp': '\u2003',
            'emsp13': '\u2004',
            'emsp14': '\u2005',
            'ENG': '\u014a',
            'eng': '\u014b',
            'ensp': '\u2002',
            'Eogon': '\u0118',
            'eogon': '\u0119',
            'Eopf': '\ud835\udd3c',
            'eopf': '\ud835\udd56',
            'epar': '\u22d5',
            'eparsl': '\u29e3',
            'eplus': '\u2a71',
            'epsi': '\u03f5',
            'Epsilon': '\u0395',
            'epsilon': '\u03b5',
            'epsiv': '\u03b5',
            'eqcirc': '\u2256',
            'eqcolon': '\u2255',
            'eqsim': '\u2242',
            'eqslantgtr': '\u2a96',
            'eqslantless': '\u2a95',
            'Equal': '\u2a75',
            'equals': '\x3d',
            'EqualTilde': '\u2242',
            'equest': '\u225f',
            'Equilibrium': '\u21cc',
            'equiv': '\u2261',
            'equivDD': '\u2a78',
            'eqvparsl': '\u29e5',
            'erarr': '\u2971',
            'erDot': '\u2253',
            'escr': '\u212f',
            'Escr': '\u2130',
            'esdot': '\u2250',
            'esim': '\u2242',
            'Esim': '\u2a73',
            'Eta': '\u0397',
            'eta': '\u03b7',
            'ETH': '\xd0',
            'eth': '\xf0',
            'Euml': '\xcb',
            'euml': '\xeb',
            'euro': '\u20ac',
            'excl': '\x21',
            'exist': '\u2203',
            'Exists': '\u2203',
            'expectation': '\u2130',
            'ExponentialE': '\u2147',
            'exponentiale': '\u2147',
            'fallingdotseq': '\u2252',
            'Fcy': '\u0424',
            'fcy': '\u0444',
            'female': '\u2640',
            'ffilig': '\ufb03',
            'fflig': '\ufb00',
            'ffllig': '\ufb04',
            'Ffr': '\ud835\udd09',
            'ffr': '\ud835\udd23',
            'filig': '\ufb01',
            'FilledSmallSquare': '\u25fc',
            'FilledVerySmallSquare': '\u25aa',
            'flat': '\u266d',
            'fllig': '\ufb02',
            'fltns': '\u25b1',
            'fnof': '\u0192',
            'Fopf': '\ud835\udd3d',
            'fopf': '\ud835\udd57',
            'ForAll': '\u2200',
            'forall': '\u2200',
            'fork': '\u22d4',
            'forkv': '\u2ad9',
            'Fouriertrf': '\u2131',
            'fpartint': '\u2a0d',
            'frac12': '\xbd',
            'frac13': '\u2153',
            'frac14': '\xbc',
            'frac15': '\u2155',
            'frac16': '\u2159',
            'frac18': '\u215b',
            'frac23': '\u2154',
            'frac25': '\u2156',
            'frac34': '\xbe',
            'frac35': '\u2157',
            'frac38': '\u215c',
            'frac45': '\u2158',
            'frac56': '\u215a',
            'frac58': '\u215d',
            'frac78': '\u215e',
            'frasl': '\u2044',
            'frown': '\u2322',
            'Fscr': '\u2131',
            'fscr': '\ud835\udcbb',
            'gacute': '\u01f5',
            'Gamma': '\u0393',
            'gamma': '\u03b3',
            'Gammad': '\u03dc',
            'gammad': '\u03dd',
            'gap': '\u2a86',
            'Gbreve': '\u011e',
            'gbreve': '\u011f',
            'Gcedil': '\u0122',
            'Gcirc': '\u011c',
            'gcirc': '\u011d',
            'Gcy': '\u0413',
            'gcy': '\u0433',
            'Gdot': '\u0120',
            'gdot': '\u0121',
            'ge': '\u2265',
            'gE': '\u2267',
            'gel': '\u22db',
            'gEl': '\u2a8c',
            'geq': '\u2265',
            'geqq': '\u2267',
            'geqslant': '\u2a7e',
            'ges': '\u2a7e',
            'gescc': '\u2aa9',
            'gesdot': '\u2a80',
            'gesdoto': '\u2a82',
            'gesdotol': '\u2a84',
            'gesl': '\u22db\ufe00',
            'gesles': '\u2a94',
            'Gfr': '\ud835\udd0a',
            'gfr': '\ud835\udd24',
            'gg': '\u226b',
            'Gg': '\u22d9',
            'ggg': '\u22d9',
            'Ggr': '\u0393',
            'ggr': '\u03b3',
            'gimel': '\u2137',
            'GJcy': '\u0403',
            'gjcy': '\u0453',
            'gl': '\u2277',
            'gla': '\u2aa5',
            'glE': '\u2a92',
            'glj': '\u2aa4',
            'gnap': '\u2a8a',
            'gnapprox': '\u2a8a',
            'gnE': '\u2269',
            'gne': '\u2a88',
            'gneq': '\u2a88',
            'gneqq': '\u2269',
            'gnsim': '\u22e7',
            'Gopf': '\ud835\udd3e',
            'gopf': '\ud835\udd58',
            'grave': '\x60',
            'GreaterEqual': '\u2265',
            'GreaterEqualLess': '\u22db',
            'GreaterFullEqual': '\u2267',
            'GreaterGreater': '\u2aa2',
            'GreaterLess': '\u2277',
            'GreaterSlantEqual': '\u2a7e',
            'GreaterTilde': '\u2273',
            'gscr': '\u210a',
            'Gscr': '\ud835\udca2',
            'gsim': '\u2273',
            'gsime': '\u2a8e',
            'gsiml': '\u2a90',
            'Gt': '\u226b',
            'gtcc': '\u2aa7',
            'gtcir': '\u2a7a',
            'gtdot': '\u22d7',
            'gtlPar': '\u2995',
            'gtquest': '\u2a7c',
            'gtrapprox': '\u2a86',
            'gtrarr': '\u2978',
            'gtrdot': '\u22d7',
            'gtreqless': '\u22db',
            'gtreqqless': '\u2a8c',
            'gtrless': '\u2277',
            'gtrsim': '\u2273',
            'gvertneqq': '\u2269\ufe00',
            'gvnE': '\u2269\ufe00',
            'Hacek': '\u02c7',
            'hairsp': '\u200a',
            'half': '\xbd',
            'hamilt': '\u210b',
            'HARDcy': '\u042a',
            'hardcy': '\u044a',
            'harr': '\u2194',
            'hArr': '\u21d4',
            'harrcir': '\u2948',
            'harrw': '\u21ad',
            'Hat': '\x5e',
            'hbar': '\u210f',
            'Hcirc': '\u0124',
            'hcirc': '\u0125',
            'hearts': '\u2665',
            'heartsuit': '\u2665',
            'hellip': '\u2026',
            'hercon': '\u22b9',
            'Hfr': '\u210c',
            'hfr': '\ud835\udd25',
            'HilbertSpace': '\u210b',
            'hksearow': '\u2925',
            'hkswarow': '\u2926',
            'hoarr': '\u21ff',
            'homtht': '\u223b',
            'hookleftarrow': '\u21a9',
            'hookrightarrow': '\u21aa',
            'Hopf': '\u210d',
            'hopf': '\ud835\udd59',
            'horbar': '\u2015',
            'HorizontalLine': '\u2500',
            'Hscr': '\u210b',
            'hscr': '\ud835\udcbd',
            'hslash': '\u210f',
            'Hstrok': '\u0126',
            'hstrok': '\u0127',
            'HumpDownHump': '\u224e',
            'HumpEqual': '\u224f',
            'hybull': '\u2043',
            'hyphen': '\u2010',
            'Iacgr': '\u038a',
            'iacgr': '\u03af',
            'Iacute': '\xcd',
            'iacute': '\xed',
            'ic': '\u2063',
            'Icirc': '\xce',
            'icirc': '\xee',
            'Icy': '\u0418',
            'icy': '\u0438',
            'idiagr': '\u0390',
            'Idigr': '\u03aa',
            'idigr': '\u03ca',
            'Idot': '\u0130',
            'IEcy': '\u0415',
            'iecy': '\u0435',
            'iexcl': '\xa1',
            'iff': '\u21d4',
            'Ifr': '\u2111',
            'ifr': '\ud835\udd26',
            'Igr': '\u0399',
            'igr': '\u03b9',
            'Igrave': '\xcc',
            'igrave': '\xec',
            'ii': '\u2148',
            'iiiint': '\u2a0c',
            'iiint': '\u222d',
            'iinfin': '\u29dc',
            'iiota': '\u2129',
            'IJlig': '\u0132',
            'ijlig': '\u0133',
            'Im': '\u2111',
            'Imacr': '\u012a',
            'imacr': '\u012b',
            'image': '\u2111',
            'ImaginaryI': '\u2148',
            'imagline': '\u2110',
            'imagpart': '\u2111',
            'imath': '\u0131',
            'imof': '\u22b7',
            'imped': '\u01b5',
            'Implies': '\u21d2',
            'in': '\u2208',
            'incare': '\u2105',
            'infin': '\u221e',
            'infintie': '\u29dd',
            'inodot': '\u0131',
            'int': '\u222b',
            'Int': '\u222c',
            'intcal': '\u22ba',
            'integers': '\u2124',
            'Integral': '\u222b',
            'intercal': '\u22ba',
            'Intersection': '\u22c2',
            'intlarhk': '\u2a17',
            'intprod': '\u2a3c',
            'InvisibleComma': '\u2063',
            'InvisibleTimes': '\u2062',
            'IOcy': '\u0401',
            'iocy': '\u0451',
            'Iogon': '\u012e',
            'iogon': '\u012f',
            'Iopf': '\ud835\udd40',
            'iopf': '\ud835\udd5a',
            'Iota': '\u0399',
            'iota': '\u03b9',
            'iprod': '\u2a3c',
            'iquest': '\xbf',
            'Iscr': '\u2110',
            'iscr': '\ud835\udcbe',
            'isin': '\u2208',
            'isindot': '\u22f5',
            'isinE': '\u22f9',
            'isins': '\u22f4',
            'isinsv': '\u22f3',
            'isinv': '\u2208',
            'it': '\u2062',
            'Itilde': '\u0128',
            'itilde': '\u0129',
            'Iukcy': '\u0406',
            'iukcy': '\u0456',
            'Iuml': '\xcf',
            'iuml': '\xef',
            'Jcirc': '\u0134',
            'jcirc': '\u0135',
            'Jcy': '\u0419',
            'jcy': '\u0439',
            'Jfr': '\ud835\udd0d',
            'jfr': '\ud835\udd27',
            'jmath': '\x6a',
            'Jopf': '\ud835\udd41',
            'jopf': '\ud835\udd5b',
            'Jscr': '\ud835\udca5',
            'jscr': '\ud835\udcbf',
            'Jsercy': '\u0408',
            'jsercy': '\u0458',
            'Jukcy': '\u0404',
            'jukcy': '\u0454',
            'Kappa': '\u039a',
            'kappa': '\u03ba',
            'kappav': '\u03f0',
            'Kcedil': '\u0136',
            'kcedil': '\u0137',
            'Kcy': '\u041a',
            'kcy': '\u043a',
            'Kfr': '\ud835\udd0e',
            'kfr': '\ud835\udd28',
            'Kgr': '\u039a',
            'kgr': '\u03ba',
            'kgreen': '\u0138',
            'KHcy': '\u0425',
            'khcy': '\u0445',
            'KHgr': '\u03a7',
            'khgr': '\u03c7',
            'KJcy': '\u040c',
            'kjcy': '\u045c',
            'Kopf': '\ud835\udd42',
            'kopf': '\ud835\udd5c',
            'Kscr': '\ud835\udca6',
            'kscr': '\ud835\udcc0',
            'lAarr': '\u21da',
            'Lacute': '\u0139',
            'lacute': '\u013a',
            'laemptyv': '\u29b4',
            'lagran': '\u2112',
            'Lambda': '\u039b',
            'lambda': '\u03bb',
            'lang': '\u2329',
            'Lang': '\u300a',
            'langd': '\u2991',
            'langle': '\u2329',
            'lap': '\u2a85',
            'Laplacetrf': '\u2112',
            'laquo': '\xab',
            'larr': '\u2190',
            'Larr': '\u219e',
            'lArr': '\u21d0',
            'larrb': '\u21e4',
            'larrbfs': '\u291f',
            'larrfs': '\u291d',
            'larrhk': '\u21a9',
            'larrlp': '\u21ab',
            'larrpl': '\u2939',
            'larrsim': '\u2973',
            'larrtl': '\u21a2',
            'lat': '\u2aab',
            'latail': '\u2919',
            'lAtail': '\u291b',
            'late': '\u2aad',
            'lates': '\u2aad\ufe00',
            'lbarr': '\u290c',
            'lBarr': '\u290e',
            'lbbrk': '\u3014',
            'lbrace': '\x7b',
            'lbrack': '\x5b',
            'lbrke': '\u298b',
            'lbrksld': '\u298f',
            'lbrkslu': '\u298d',
            'Lcaron': '\u013d',
            'lcaron': '\u013e',
            'Lcedil': '\u013b',
            'lcedil': '\u013c',
            'lceil': '\u2308',
            'lcub': '\x7b',
            'Lcy': '\u041b',
            'lcy': '\u043b',
            'ldca': '\u2936',
            'ldquo': '\u201c',
            'ldquor': '\u201e',
            'ldrdhar': '\u2967',
            'ldrushar': '\u294b',
            'ldsh': '\u21b2',
            'le': '\u2264',
            'lE': '\u2266',
            'LeftAngleBracket': '\u2329',
            'leftarrow': '\u2190',
            'LeftArrow': '\u2190',
            'Leftarrow': '\u21d0',
            'LeftArrowBar': '\u21e4',
            'LeftArrowRightArrow': '\u21c6',
            'leftarrowtail': '\u21a2',
            'LeftBracketingBar': '\uf603',
            'LeftCeiling': '\u2308',
            'LeftDoubleBracket': '\u301a',
            'LeftDoubleBracketingBar': '\uf605',
            'LeftDownTeeVector': '\u2961',
            'LeftDownVector': '\u21c3',
            'LeftDownVectorBar': '\u2959',
            'LeftFloor': '\u230a',
            'leftharpoondown': '\u21bd',
            'leftharpoonup': '\u21bc',
            'leftleftarrows': '\u21c7',
            'leftrightarrow': '\u2194',
            'LeftRightArrow': '\u2194',
            'Leftrightarrow': '\u21d4',
            'leftrightarrows': '\u21c6',
            'leftrightharpoons': '\u21cb',
            'leftrightsquigarrow': '\u21ad',
            'LeftRightVector': '\u294e',
            'LeftTee': '\u22a3',
            'LeftTeeArrow': '\u21a4',
            'LeftTeeVector': '\u295a',
            'leftthreetimes': '\u22cb',
            'LeftTriangle': '\u22b2',
            'LeftTriangleBar': '\u29cf',
            'LeftTriangleEqual': '\u22b4',
            'LeftUpDownVector': '\u2951',
            'LeftUpTeeVector': '\u2960',
            'LeftUpVector': '\u21bf',
            'LeftUpVectorBar': '\u2958',
            'LeftVector': '\u21bc',
            'LeftVectorBar': '\u2952',
            'leg': '\u22da',
            'lEg': '\u2a8b',
            'leq': '\u2264',
            'leqq': '\u2266',
            'leqslant': '\u2a7d',
            'les': '\u2a7d',
            'lescc': '\u2aa8',
            'lesdot': '\u2a7f',
            'lesdoto': '\u2a81',
            'lesdotor': '\u2a83',
            'lesg': '\u22da\ufe00',
            'lesges': '\u2a93',
            'lessapprox': '\u2a85',
            'lessdot': '\u22d6',
            'lesseqgtr': '\u22da',
            'lesseqqgtr': '\u2a8b',
            'LessEqualGreater': '\u22da',
            'LessFullEqual': '\u2266',
            'LessGreater': '\u2276',
            'lessgtr': '\u2276',
            'LessLess': '\u2aa1',
            'lesssim': '\u2272',
            'LessSlantEqual': '\u2a7d',
            'LessTilde': '\u2272',
            'lfisht': '\u297c',
            'lfloor': '\u230a',
            'Lfr': '\ud835\udd0f',
            'lfr': '\ud835\udd29',
            'lg': '\u2276',
            'lgE': '\u2a91',
            'Lgr': '\u039b',
            'lgr': '\u03bb',
            'lHar': '\u2962',
            'lhard': '\u21bd',
            'lharu': '\u21bc',
            'lharul': '\u296a',
            'lhblk': '\u2584',
            'LJcy': '\u0409',
            'ljcy': '\u0459',
            'll': '\u226a',
            'Ll': '\u22d8',
            'llarr': '\u21c7',
            'llcorner': '\u231e',
            'Lleftarrow': '\u21da',
            'llhard': '\u296b',
            'lltri': '\u25fa',
            'Lmidot': '\u013f',
            'lmidot': '\u0140',
            'lmoust': '\u23b0',
            'lmoustache': '\u23b0',
            'lnap': '\u2a89',
            'lnapprox': '\u2a89',
            'lnE': '\u2268',
            'lne': '\u2a87',
            'lneq': '\u2a87',
            'lneqq': '\u2268',
            'lnsim': '\u22e6',
            'loang': '\u3018',
            'loarr': '\u21fd',
            'lobrk': '\u301a',
            'longleftarrow': '\u27f5',
            'LongLeftArrow': '\u27f5',
            'Longleftarrow': '\u27f8',
            'LongLeftRightArrow': '\u27f7',
            'longleftrightarrow': '\u27f7',
            'Longleftrightarrow': '\u27fa',
            'longmapsto': '\u27fc',
            'LongRightArrow': '\u27f6',
            'longrightarrow': '\u27f6',
            'Longrightarrow': '\u27f9',
            'looparrowleft': '\u21ab',
            'looparrowright': '\u21ac',
            'lopar': '\u2985',
            'Lopf': '\ud835\udd43',
            'lopf': '\ud835\udd5d',
            'loplus': '\u2a2d',
            'lotimes': '\u2a34',
            'lowast': '\u2217',
            'lowbar': '\x5f',
            'LowerLeftArrow': '\u2199',
            'LowerRightArrow': '\u2198',
            'loz': '\u25ca',
            'lozenge': '\u25ca',
            'lozf': '\u29eb',
            'lpar': '\x28',
            'lparlt': '\u2993',
            'lrarr': '\u21c6',
            'lrcorner': '\u231f',
            'lrhar': '\u21cb',
            'lrhard': '\u296d',
            'lrm': '\u200e',
            'lrtri': '\u22bf',
            'lsaquo': '\u2039',
            'Lscr': '\u2112',
            'lscr': '\ud835\udcc1',
            'lsh': '\u21b0',
            'Lsh': '\u21b0',
            'lsim': '\u2272',
            'lsime': '\u2a8d',
            'lsimg': '\u2a8f',
            'lsqb': '\x5b',
            'lsquo': '\u2018',
            'lsquor': '\u201a',
            'Lstrok': '\u0141',
            'lstrok': '\u0142',
            'Lt': '\u226a',
            'ltcc': '\u2aa6',
            'ltcir': '\u2a79',
            'ltdot': '\u22d6',
            'lthree': '\u22cb',
            'ltimes': '\u22c9',
            'ltlarr': '\u2976',
            'ltquest': '\u2a7b',
            'ltri': '\u25c3',
            'ltrie': '\u22b4',
            'ltrif': '\u25c2',
            'ltrPar': '\u2996',
            'lurdshar': '\u294a',
            'luruhar': '\u2966',
            'lvertneqq': '\u2268\ufe00',
            'lvnE': '\u2268\ufe00',
            'macr': '\xaf',
            'male': '\u2642',
            'malt': '\u2720',
            'maltese': '\u2720',
            'map': '\u21a6',
            'Map': '\u2905',
            'mapsto': '\u21a6',
            'mapstodown': '\u21a7',
            'mapstoleft': '\u21a4',
            'mapstoup': '\u21a5',
            'marker': '\u25ae',
            'mcomma': '\u2a29',
            'Mcy': '\u041c',
            'mcy': '\u043c',
            'mdash': '\u2014',
            'mDDot': '\u223a',
            'measuredangle': '\u2221',
            'MediumSpace': '\u205f',
            'Mellintrf': '\u2133',
            'Mfr': '\ud835\udd10',
            'mfr': '\ud835\udd2a',
            'Mgr': '\u039c',
            'mgr': '\u03bc',
            'mho': '\u2127',
            'micro': '\xb5',
            'mid': '\u2223',
            'midast': '\x2a',
            'midcir': '\u2af0',
            'middot': '\xb7',
            'minus': '\u2212',
            'minusb': '\u229f',
            'minusd': '\u2238',
            'minusdu': '\u2a2a',
            'MinusPlus': '\u2213',
            'mlcp': '\u2adb',
            'mldr': '\u2026',
            'mnplus': '\u2213',
            'models': '\u22a7',
            'Mopf': '\ud835\udd44',
            'mopf': '\ud835\udd5e',
            'mp': '\u2213',
            'Mscr': '\u2133',
            'mscr': '\ud835\udcc2',
            'mstpos': '\u223e',
            'Mu': '\u039c',
            'mu': '\u03bc',
            'multimap': '\u22b8',
            'mumap': '\u22b8',
            'nabla': '\u2207',
            'Nacute': '\u0143',
            'nacute': '\u0144',
            'nang': '\u2220\u20d2',
            'nap': '\u2249',
            'napE': '\u2a70\u0338',
            'napid': '\u224b\u0338',
            'napos': '\u0149',
            'napprox': '\u2249',
            'natur': '\u266e',
            'natural': '\u266e',
            'naturals': '\u2115',
            'nbsp': '\xa0',
            'nbump': '\u224e\u0338',
            'nbumpe': '\u224f\u0338',
            'ncap': '\u2a43',
            'Ncaron': '\u0147',
            'ncaron': '\u0148',
            'Ncedil': '\u0145',
            'ncedil': '\u0146',
            'ncong': '\u2247',
            'ncongdot': '\u2a6d\u0338',
            'ncup': '\u2a42',
            'Ncy': '\u041d',
            'ncy': '\u043d',
            'ndash': '\u2013',
            'ne': '\u2260',
            'nearhk': '\u2924',
            'nearr': '\u2197',
            'neArr': '\u21d7',
            'nearrow': '\u2197',
            'nedot': '\u2250\u0338',
            'NegativeMediumSpace': '\u200b',
            'NegativeThickSpace': '\u200b',
            'NegativeThinSpace': '\u200b',
            'NegativeVeryThinSpace': '\u200b',
            'nequiv': '\u2262',
            'nesear': '\u2928',
            'nesim': '\u2242\u0338',
            'NestedGreaterGreater': '\u226b',
            'NestedLessLess': '\u226a',
            'NewLine': '\n',
            'nexist': '\u2204',
            'nexists': '\u2204',
            'Nfr': '\ud835\udd11',
            'nfr': '\ud835\udd2b',
            'ngE': '\u2267\u0338',
            'nge': '\u2271',
            'ngeq': '\u2271',
            'ngeqq': '\u2267\u0338',
            'ngeqslant': '\u2a7e\u0338',
            'nges': '\u2a7e\u0338',
            'nGg': '\u22d9\u0338',
            'Ngr': '\u039d',
            'ngr': '\u03bd',
            'ngsim': '\u2275',
            'nGt': '\u226b\u20d2',
            'ngt': '\u226f',
            'ngtr': '\u226f',
            'nGtv': '\u226b\u0338',
            'nharr': '\u21ae',
            'nhArr': '\u21ce',
            'nhpar': '\u2af2',
            'ni': '\u220b',
            'nis': '\u22fc',
            'nisd': '\u22fa',
            'niv': '\u220b',
            'NJcy': '\u040a',
            'njcy': '\u045a',
            'nlarr': '\u219a',
            'nlArr': '\u21cd',
            'nldr': '\u2025',
            'nlE': '\u2266\u0338',
            'nle': '\u2270',
            'nleftarrow': '\u219a',
            'nLeftarrow': '\u21cd',
            'nleftrightarrow': '\u21ae',
            'nLeftrightarrow': '\u21ce',
            'nleq': '\u2270',
            'nleqq': '\u2266\u0338',
            'nleqslant': '\u2a7d\u0338',
            'nles': '\u2a7d\u0338',
            'nless': '\u226e',
            'nLl': '\u22d8\u0338',
            'nlsim': '\u2274',
            'nLt': '\u226a\u20d2',
            'nlt': '\u226e',
            'nltri': '\u22ea',
            'nltrie': '\u22ec',
            'nLtv': '\u226a\u0338',
            'nmid': '\u2224',
            'NoBreak': '\u2060',
            'NonBreakingSpace': '\xa0',
            'Nopf': '\u2115',
            'nopf': '\ud835\udd5f',
            'not': '\xac',
            'Not': '\u2aec',
            'NotCongruent': '\u2262',
            'NotCupCap': '\u226d',
            'NotDoubleVerticalBar': '\u2226',
            'NotElement': '\u2209',
            'NotEqual': '\u2260',
            'NotEqualTilde': '\u2242\u0338',
            'NotExists': '\u2204',
            'NotGreater': '\u226f',
            'NotGreaterEqual': '\u2271',
            'NotGreaterFullEqual': '\u2266\u0338',
            'NotGreaterGreater': '\u226b\u0338',
            'NotGreaterLess': '\u2279',
            'NotGreaterSlantEqual': '\u2a7e\u0338',
            'NotGreaterTilde': '\u2275',
            'NotHumpDownHump': '\u224e\u0338',
            'NotHumpEqual': '\u224f\u0338',
            'notin': '\u2209',
            'notindot': '\u22f5\u0338',
            'notinE': '\u22f9\u0338',
            'notinva': '\u2209',
            'notinvb': '\u22f7',
            'notinvc': '\u22f6',
            'NotLeftTriangle': '\u22ea',
            'NotLeftTriangleBar': '\u29cf\u0338',
            'NotLeftTriangleEqual': '\u22ec',
            'NotLess': '\u226e',
            'NotLessEqual': '\u2270',
            'NotLessGreater': '\u2278',
            'NotLessLess': '\u226a\u0338',
            'NotLessSlantEqual': '\u2a7d\u0338',
            'NotLessTilde': '\u2274',
            'NotNestedGreaterGreater': '\u2aa2\u0338',
            'NotNestedLessLess': '\u2aa1\u0338',
            'notni': '\u220c',
            'notniva': '\u220c',
            'notnivb': '\u22fe',
            'notnivc': '\u22fd',
            'NotPrecedes': '\u2280',
            'NotPrecedesEqual': '\u2aaf\u0338',
            'NotPrecedesSlantEqual': '\u22e0',
            'NotReverseElement': '\u220c',
            'NotRightTriangle': '\u22eb',
            'NotRightTriangleBar': '\u29d0\u0338',
            'NotRightTriangleEqual': '\u22ed',
            'NotSquareSubset': '\u228f\u0338',
            'NotSquareSubsetEqual': '\u22e2',
            'NotSquareSuperset': '\u2290\u0338',
            'NotSquareSupersetEqual': '\u22e3',
            'NotSubset': '\u2282\u20d2',
            'NotSubsetEqual': '\u2288',
            'NotSucceeds': '\u2281',
            'NotSucceedsEqual': '\u2ab0\u0338',
            'NotSucceedsSlantEqual': '\u22e1',
            'NotSucceedsTilde': '\u227f\u0338',
            'NotSuperset': '\u2283\u20d2',
            'NotSupersetEqual': '\u2289',
            'NotTilde': '\u2241',
            'NotTildeEqual': '\u2244',
            'NotTildeFullEqual': '\u2247',
            'NotTildeTilde': '\u2249',
            'NotVerticalBar': '\u2224',
            'npar': '\u2226',
            'nparallel': '\u2226',
            'nparsl': '\u2afd\u20e5',
            'npart': '\u2202\u0338',
            'npolint': '\u2a14',
            'npr': '\u2280',
            'nprcue': '\u22e0',
            'npre': '\u2aaf\u0338',
            'nprec': '\u2280',
            'npreceq': '\u2aaf\u0338',
            'nrarr': '\u219b',
            'nrArr': '\u21cf',
            'nrarrc': '\u2933\u0338',
            'nrarrw': '\u219d\u0338',
            'nrightarrow': '\u219b',
            'nRightarrow': '\u21cf',
            'nrtri': '\u22eb',
            'nrtrie': '\u22ed',
            'nsc': '\u2281',
            'nsccue': '\u22e1',
            'nsce': '\u2ab0\u0338',
            'Nscr': '\ud835\udca9',
            'nscr': '\ud835\udcc3',
            'nshortmid': '\u2224',
            'nshortparallel': '\u2226',
            'nsim': '\u2241',
            'nsime': '\u2244',
            'nsimeq': '\u2244',
            'nsmid': '\u2224',
            'nspar': '\u2226',
            'nsqsube': '\u22e2',
            'nsqsupe': '\u22e3',
            'nsub': '\u2284',
            'nsube': '\u2288',
            'nsubE': '\u2ac5\u0338',
            'nsubset': '\u2282\u20d2',
            'nsubseteq': '\u2288',
            'nsubseteqq': '\u2ac5\u0338',
            'nsucc': '\u2281',
            'nsucceq': '\u2ab0\u0338',
            'nsup': '\u2285',
            'nsupe': '\u2289',
            'nsupE': '\u2ac6\u0338',
            'nsupset': '\u2283\u20d2',
            'nsupseteq': '\u2289',
            'nsupseteqq': '\u2ac6\u0338',
            'ntgl': '\u2279',
            'Ntilde': '\xd1',
            'ntilde': '\xf1',
            'ntlg': '\u2278',
            'ntriangleleft': '\u22ea',
            'ntrianglelefteq': '\u22ec',
            'ntriangleright': '\u22eb',
            'ntrianglerighteq': '\u22ed',
            'Nu': '\u039d',
            'nu': '\u03bd',
            'num': '\x23',
            'numero': '\u2116',
            'numsp': '\u2007',
            'nvap': '\u224d\u20d2',
            'nvdash': '\u22ac',
            'nvDash': '\u22ad',
            'nVdash': '\u22ae',
            'nVDash': '\u22af',
            'nvge': '\u2265\u20d2',
            'nvgt': '\x3e\u20d2',
            'nvHarr': '\u2904',
            'nvinfin': '\u29de',
            'nvlArr': '\u2902',
            'nvle': '\u2264\u20d2',
            'nvlt': '\x3c\u20d2',
            'nvltrie': '\u22b4\u20d2',
            'nvrArr': '\u2903',
            'nvrtrie': '\u22b5\u20d2',
            'nvsim': '\u223c\u20d2',
            'nwarhk': '\u2923',
            'nwarr': '\u2196',
            'nwArr': '\u21d6',
            'nwarrow': '\u2196',
            'nwnear': '\u2927',
            'Oacgr': '\u038c',
            'oacgr': '\u03cc',
            'Oacute': '\xd3',
            'oacute': '\xf3',
            'oast': '\u229b',
            'ocir': '\u229a',
            'Ocirc': '\xd4',
            'ocirc': '\xf4',
            'Ocy': '\u041e',
            'ocy': '\u043e',
            'odash': '\u229d',
            'Odblac': '\u0150',
            'odblac': '\u0151',
            'odiv': '\u2a38',
            'odot': '\u2299',
            'odsold': '\u29bc',
            'OElig': '\u0152',
            'oelig': '\u0153',
            'ofcir': '\u29bf',
            'Ofr': '\ud835\udd12',
            'ofr': '\ud835\udd2c',
            'ogon': '\u02db',
            'Ogr': '\u039f',
            'ogr': '\u03bf',
            'Ograve': '\xd2',
            'ograve': '\xf2',
            'ogt': '\u29c1',
            'OHacgr': '\u038f',
            'ohacgr': '\u03ce',
            'ohbar': '\u29b5',
            'OHgr': '\u03a9',
            'ohgr': '\u03c9',
            'ohm': '\u2126',
            'oint': '\u222e',
            'olarr': '\u21ba',
            'olcir': '\u29be',
            'olcross': '\u29bb',
            'oline': '\u203e',
            'olt': '\u29c0',
            'Omacr': '\u014c',
            'omacr': '\u014d',
            'Omega': '\u03a9',
            'omega': '\u03c9',
            'Omicron': '\u039f',
            'omicron': '\u03bf',
            'omid': '\u29b6',
            'ominus': '\u2296',
            'Oopf': '\ud835\udd46',
            'oopf': '\ud835\udd60',
            'opar': '\u29b7',
            'OpenCurlyDoubleQuote': '\u201c',
            'OpenCurlyQuote': '\u2018',
            'operp': '\u29b9',
            'oplus': '\u2295',
            'or': '\u2228',
            'Or': '\u2a54',
            'orarr': '\u21bb',
            'ord': '\u2a5d',
            'order': '\u2134',
            'orderof': '\u2134',
            'ordf': '\xaa',
            'ordm': '\xba',
            'origof': '\u22b6',
            'oror': '\u2a56',
            'orslope': '\u2a57',
            'orv': '\u2a5b',
            'oS': '\u24c8',
            'oscr': '\u2134',
            'Oscr': '\ud835\udcaa',
            'Oslash': '\xd8',
            'oslash': '\xf8',
            'osol': '\u2298',
            'Otilde': '\xd5',
            'otilde': '\xf5',
            'otimes': '\u2297',
            'Otimes': '\u2a37',
            'otimesas': '\u2a36',
            'Ouml': '\xd6',
            'ouml': '\xf6',
            'ovbar': '\u233d',
            'OverBar': '\xaf',
            'OverBrace': '\ufe37',
            'OverBracket': '\u23b4',
            'OverParenthesis': '\ufe35',
            'par': '\u2225',
            'para': '\xb6',
            'parallel': '\u2225',
            'parsim': '\u2af3',
            'parsl': '\u2afd',
            'part': '\u2202',
            'PartialD': '\u2202',
            'Pcy': '\u041f',
            'pcy': '\u043f',
            'percnt': '\x25',
            'period': '\x2e',
            'permil': '\u2030',
            'perp': '\u22a5',
            'pertenk': '\u2031',
            'Pfr': '\ud835\udd13',
            'pfr': '\ud835\udd2d',
            'Pgr': '\u03a0',
            'pgr': '\u03c0',
            'PHgr': '\u03a6',
            'phgr': '\u03c6',
            'Phi': '\u03a6',
            'phi': '\u03d5',
            'phiv': '\u03c6',
            'phmmat': '\u2133',
            'phone': '\u260e',
            'Pi': '\u03a0',
            'pi': '\u03c0',
            'pitchfork': '\u22d4',
            'piv': '\u03d6',
            'planck': '\u210f',
            'planckh': '\u210e',
            'plankv': '\u210f',
            'plus': '\x2b',
            'plusacir': '\u2a23',
            'plusb': '\u229e',
            'pluscir': '\u2a22',
            'plusdo': '\u2214',
            'plusdu': '\u2a25',
            'pluse': '\u2a72',
            'PlusMinus': '\xb1',
            'plusmn': '\xb1',
            'plussim': '\u2a26',
            'plustwo': '\u2a27',
            'pm': '\xb1',
            'Poincareplane': '\u210c',
            'pointint': '\u2a15',
            'Popf': '\u2119',
            'popf': '\ud835\udd61',
            'pound': '\xa3',
            'pr': '\u227a',
            'Pr': '\u2abb',
            'prap': '\u2ab7',
            'prcue': '\u227c',
            'pre': '\u2aaf',
            'prE': '\u2ab3',
            'prec': '\u227a',
            'precapprox': '\u2ab7',
            'preccurlyeq': '\u227c',
            'Precedes': '\u227a',
            'PrecedesEqual': '\u2aaf',
            'PrecedesSlantEqual': '\u227c',
            'PrecedesTilde': '\u227e',
            'preceq': '\u2aaf',
            'precnapprox': '\u2ab9',
            'precneqq': '\u2ab5',
            'precnsim': '\u22e8',
            'precsim': '\u227e',
            'prime': '\u2032',
            'Prime': '\u2033',
            'primes': '\u2119',
            'prnap': '\u2ab9',
            'prnE': '\u2ab5',
            'prnsim': '\u22e8',
            'prod': '\u220f',
            'Product': '\u220f',
            'profalar': '\u232e',
            'profline': '\u2312',
            'profsurf': '\u2313',
            'prop': '\u221d',
            'Proportion': '\u2237',
            'Proportional': '\u221d',
            'propto': '\u221d',
            'prsim': '\u227e',
            'prurel': '\u22b0',
            'Pscr': '\ud835\udcab',
            'pscr': '\ud835\udcc5',
            'PSgr': '\u03a8',
            'psgr': '\u03c8',
            'Psi': '\u03a8',
            'psi': '\u03c8',
            'puncsp': '\u2008',
            'Qfr': '\ud835\udd14',
            'qfr': '\ud835\udd2e',
            'qint': '\u2a0c',
            'Qopf': '\u211a',
            'qopf': '\ud835\udd62',
            'qprime': '\u2057',
            'Qscr': '\ud835\udcac',
            'qscr': '\ud835\udcc6',
            'quaternions': '\u210d',
            'quatint': '\u2a16',
            'quest': '\x3f',
            'questeq': '\u225f',
            'rAarr': '\u21db',
            'race': '\u29da',
            'Racute': '\u0154',
            'racute': '\u0155',
            'radic': '\u221a',
            'raemptyv': '\u29b3',
            'rang': '\u232a',
            'Rang': '\u300b',
            'rangd': '\u2992',
            'range': '\u29a5',
            'rangle': '\u232a',
            'raquo': '\xbb',
            'rarr': '\u2192',
            'Rarr': '\u21a0',
            'rArr': '\u21d2',
            'rarrap': '\u2975',
            'rarrb': '\u21e5',
            'rarrbfs': '\u2920',
            'rarrc': '\u2933',
            'rarrfs': '\u291e',
            'rarrhk': '\u21aa',
            'rarrlp': '\u21ac',
            'rarrpl': '\u2945',
            'rarrsim': '\u2974',
            'rarrtl': '\u21a3',
            'Rarrtl': '\u2916',
            'rarrw': '\u219d',
            'ratail': '\u291a',
            'rAtail': '\u291c',
            'ratio': '\u2236',
            'rationals': '\u211a',
            'rbarr': '\u290d',
            'rBarr': '\u290f',
            'RBarr': '\u2910',
            'rbbrk': '\u3015',
            'rbrace': '\x7d',
            'rbrack': '\x5d',
            'rbrke': '\u298c',
            'rbrksld': '\u298e',
            'rbrkslu': '\u2990',
            'Rcaron': '\u0158',
            'rcaron': '\u0159',
            'Rcedil': '\u0156',
            'rcedil': '\u0157',
            'rceil': '\u2309',
            'rcub': '\x7d',
            'Rcy': '\u0420',
            'rcy': '\u0440',
            'rdca': '\u2937',
            'rdldhar': '\u2969',
            'rdquo': '\u201d',
            'rdquor': '\u201d',
            'rdsh': '\u21b3',
            'Re': '\u211c',
            'real': '\u211c',
            'realine': '\u211b',
            'realpart': '\u211c',
            'reals': '\u211d',
            'rect': '\u25ad',
            'reg': '\xae',
            'ReverseElement': '\u220b',
            'ReverseEquilibrium': '\u21cb',
            'ReverseUpEquilibrium': '\u296f',
            'rfisht': '\u297d',
            'rfloor': '\u230b',
            'Rfr': '\u211c',
            'rfr': '\ud835\udd2f',
            'Rgr': '\u03a1',
            'rgr': '\u03c1',
            'rHar': '\u2964',
            'rhard': '\u21c1',
            'rharu': '\u21c0',
            'rharul': '\u296c',
            'Rho': '\u03a1',
            'rho': '\u03c1',
            'rhov': '\u03f1',
            'RightAngleBracket': '\u232a',
            'rightarrow': '\u2192',
            'RightArrow': '\u2192',
            'Rightarrow': '\u21d2',
            'RightArrowBar': '\u21e5',
            'RightArrowLeftArrow': '\u21c4',
            'rightarrowtail': '\u21a3',
            'RightBracketingBar': '\uf604',
            'RightCeiling': '\u2309',
            'RightDoubleBracket': '\u301b',
            'RightDoubleBracketingBar': '\uf606',
            'RightDownTeeVector': '\u295d',
            'RightDownVector': '\u21c2',
            'RightDownVectorBar': '\u2955',
            'RightFloor': '\u230b',
            'rightharpoondown': '\u21c1',
            'rightharpoonup': '\u21c0',
            'rightleftarrows': '\u21c4',
            'rightleftharpoons': '\u21cc',
            'rightrightarrows': '\u21c9',
            'rightsquigarrow': '\u219d',
            'RightTee': '\u22a2',
            'RightTeeArrow': '\u21a6',
            'RightTeeVector': '\u295b',
            'rightthreetimes': '\u22cc',
            'RightTriangle': '\u22b3',
            'RightTriangleBar': '\u29d0',
            'RightTriangleEqual': '\u22b5',
            'RightUpDownVector': '\u294f',
            'RightUpTeeVector': '\u295c',
            'RightUpVector': '\u21be',
            'RightUpVectorBar': '\u2954',
            'RightVector': '\u21c0',
            'RightVectorBar': '\u2953',
            'ring': '\u02da',
            'risingdotseq': '\u2253',
            'rlarr': '\u21c4',
            'rlhar': '\u21cc',
            'rlm': '\u200f',
            'rmoust': '\u23b1',
            'rmoustache': '\u23b1',
            'rnmid': '\u2aee',
            'roang': '\u3019',
            'roarr': '\u21fe',
            'robrk': '\u301b',
            'ropar': '\u2986',
            'Ropf': '\u211d',
            'ropf': '\ud835\udd63',
            'roplus': '\u2a2e',
            'rotimes': '\u2a35',
            'RoundImplies': '\u2970',
            'rpar': '\x29',
            'rpargt': '\u2994',
            'rppolint': '\u2a12',
            'rrarr': '\u21c9',
            'Rrightarrow': '\u21db',
            'rsaquo': '\u203a',
            'Rscr': '\u211b',
            'rscr': '\ud835\udcc7',
            'Rsh': '\u21b1',
            'rsh': '\u21b1',
            'rsqb': '\x5d',
            'rsquo': '\u2019',
            'rsquor': '\u2019',
            'rthree': '\u22cc',
            'rtimes': '\u22ca',
            'rtri': '\u25b9',
            'rtrie': '\u22b5',
            'rtrif': '\u25b8',
            'rtriltri': '\u29ce',
            'RuleDelayed': '\u29f4',
            'ruluhar': '\u2968',
            'rx': '\u211e',
            'Sacute': '\u015a',
            'sacute': '\u015b',
            'sbquo': '\u201a',
            'sc': '\u227b',
            'Sc': '\u2abc',
            'scap': '\u2ab8',
            'Scaron': '\u0160',
            'scaron': '\u0161',
            'sccue': '\u227d',
            'sce': '\u2ab0',
            'scE': '\u2ab4',
            'Scedil': '\u015e',
            'scedil': '\u015f',
            'Scirc': '\u015c',
            'scirc': '\u015d',
            'scnap': '\u2aba',
            'scnE': '\u2ab6',
            'scnsim': '\u22e9',
            'scpolint': '\u2a13',
            'scsim': '\u227f',
            'Scy': '\u0421',
            'scy': '\u0441',
            'sdot': '\u22c5',
            'sdotb': '\u22a1',
            'sdote': '\u2a66',
            'searhk': '\u2925',
            'searr': '\u2198',
            'seArr': '\u21d8',
            'searrow': '\u2198',
            'sect': '\xa7',
            'semi': '\x3b',
            'seswar': '\u2929',
            'setminus': '\u2216',
            'setmn': '\u2216',
            'sext': '\u2736',
            'sfgr': '\u03c2',
            'Sfr': '\ud835\udd16',
            'sfr': '\ud835\udd30',
            'sfrown': '\u2322',
            'Sgr': '\u03a3',
            'sgr': '\u03c3',
            'sharp': '\u266f',
            'SHCHcy': '\u0429',
            'shchcy': '\u0449',
            'SHcy': '\u0428',
            'shcy': '\u0448',
            'ShortDownArrow': '\u2193',
            'ShortLeftArrow': '\u2190',
            'shortmid': '\u2223',
            'shortparallel': '\u2225',
            'ShortRightArrow': '\u2192',
            'ShortUpArrow': '\u2191',
            'shy': '\xad',
            'Sigma': '\u03a3',
            'sigma': '\u03c3',
            'sigmaf': '\u03c2',
            'sigmav': '\u03c2',
            'sim': '\u223c',
            'simdot': '\u2a6a',
            'sime': '\u2243',
            'simeq': '\u2243',
            'simg': '\u2a9e',
            'simgE': '\u2aa0',
            'siml': '\u2a9d',
            'simlE': '\u2a9f',
            'simne': '\u2246',
            'simplus': '\u2a24',
            'simrarr': '\u2972',
            'slarr': '\u2190',
            'SmallCircle': '\u2218',
            'smallsetminus': '\u2216',
            'smashp': '\u2a33',
            'smeparsl': '\u29e4',
            'smid': '\u2223',
            'smile': '\u2323',
            'smt': '\u2aaa',
            'smte': '\u2aac',
            'smtes': '\u2aac\ufe00',
            'SOFTcy': '\u042c',
            'softcy': '\u044c',
            'sol': '\x2f',
            'solb': '\u29c4',
            'solbar': '\u233f',
            'Sopf': '\ud835\udd4a',
            'sopf': '\ud835\udd64',
            'spades': '\u2660',
            'spadesuit': '\u2660',
            'spar': '\u2225',
            'sqcap': '\u2293',
            'sqcaps': '\u2293\ufe00',
            'sqcup': '\u2294',
            'sqcups': '\u2294\ufe00',
            'Sqrt': '\u221a',
            'sqsub': '\u228f',
            'sqsube': '\u2291',
            'sqsubset': '\u228f',
            'sqsubseteq': '\u2291',
            'sqsup': '\u2290',
            'sqsupe': '\u2292',
            'sqsupset': '\u2290',
            'sqsupseteq': '\u2292',
            'squ': '\u25a1',
            'square': '\u25a1',
            'Square': '\u25a1',
            'SquareIntersection': '\u2293',
            'SquareSubset': '\u228f',
            'SquareSubsetEqual': '\u2291',
            'SquareSuperset': '\u2290',
            'SquareSupersetEqual': '\u2292',
            'SquareUnion': '\u2294',
            'squarf': '\u25aa',
            'squf': '\u25aa',
            'srarr': '\u2192',
            'Sscr': '\ud835\udcae',
            'sscr': '\ud835\udcc8',
            'ssetmn': '\u2216',
            'ssmile': '\u2323',
            'sstarf': '\u22c6',
            'Star': '\u22c6',
            'star': '\u2606',
            'starf': '\u2605',
            'straightepsilon': '\u03f5',
            'straightphi': '\u03d5',
            'strns': '\xaf',
            'sub': '\u2282',
            'Sub': '\u22d0',
            'subdot': '\u2abd',
            'sube': '\u2286',
            'subE': '\u2ac5',
            'subedot': '\u2ac3',
            'submult': '\u2ac1',
            'subne': '\u228a',
            'subnE': '\u2acb',
            'subplus': '\u2abf',
            'subrarr': '\u2979',
            'subset': '\u2282',
            'Subset': '\u22d0',
            'subseteq': '\u2286',
            'subseteqq': '\u2ac5',
            'SubsetEqual': '\u2286',
            'subsetneq': '\u228a',
            'subsetneqq': '\u2acb',
            'subsim': '\u2ac7',
            'subsub': '\u2ad5',
            'subsup': '\u2ad3',
            'succ': '\u227b',
            'succapprox': '\u2ab8',
            'succcurlyeq': '\u227d',
            'Succeeds': '\u227b',
            'SucceedsEqual': '\u2ab0',
            'SucceedsSlantEqual': '\u227d',
            'SucceedsTilde': '\u227f',
            'succeq': '\u2ab0',
            'succnapprox': '\u2aba',
            'succneqq': '\u2ab6',
            'succnsim': '\u22e9',
            'succsim': '\u227f',
            'SuchThat': '\u220b',
            'sum': '\u2211',
            'Sum': '\u2211',
            'sung': '\u266a',
            'sup': '\u2283',
            'Sup': '\u22d1',
            'sup1': '\xb9',
            'sup2': '\xb2',
            'sup3': '\xb3',
            'supdot': '\u2abe',
            'supdsub': '\u2ad8',
            'supe': '\u2287',
            'supE': '\u2ac6',
            'supedot': '\u2ac4',
            'Superset': '\u2283',
            'SupersetEqual': '\u2287',
            'suphsol': '\u2283\x2f',
            'suphsub': '\u2ad7',
            'suplarr': '\u297b',
            'supmult': '\u2ac2',
            'supne': '\u228b',
            'supnE': '\u2acc',
            'supplus': '\u2ac0',
            'supset': '\u2283',
            'Supset': '\u22d1',
            'supseteq': '\u2287',
            'supseteqq': '\u2ac6',
            'supsetneq': '\u228b',
            'supsetneqq': '\u2acc',
            'supsim': '\u2ac8',
            'supsub': '\u2ad4',
            'supsup': '\u2ad6',
            'swarhk': '\u2926',
            'swarr': '\u2199',
            'swArr': '\u21d9',
            'swarrow': '\u2199',
            'swnwar': '\u292a',
            'szlig': '\xdf',
            'Tab': '\t',
            'target': '\u2316',
            'Tau': '\u03a4',
            'tau': '\u03c4',
            'tbrk': '\u23b4',
            'Tcaron': '\u0164',
            'tcaron': '\u0165',
            'Tcedil': '\u0162',
            'tcedil': '\u0163',
            'Tcy': '\u0422',
            'tcy': '\u0442',
            'tdot': '\x20\u20db',
            'telrec': '\u2315',
            'Tfr': '\ud835\udd17',
            'tfr': '\ud835\udd31',
            'Tgr': '\u03a4',
            'tgr': '\u03c4',
            'there4': '\u2234',
            'therefore': '\u2234',
            'Therefore': '\u2234',
            'Theta': '\u0398',
            'theta': '\u03b8',
            'thetasym': '\u03d1',
            'thetav': '\u03d1',
            'THgr': '\u0398',
            'thgr': '\u03b8',
            'thickapprox': '\u2248',
            'thicksim': '\u223c',
            'ThickSpace': '\u2009\u200a\u200a',
            'thinsp': '\u2009',
            'ThinSpace': '\u2009',
            'thkap': '\u2248',
            'thksim': '\u223c',
            'THORN': '\xde',
            'thorn': '\xfe',
            'tilde': '\u02dc',
            'Tilde': '\u223c',
            'TildeEqual': '\u2243',
            'TildeFullEqual': '\u2245',
            'TildeTilde': '\u2248',
            'times': '\xd7',
            'timesb': '\u22a0',
            'timesbar': '\u2a31',
            'timesd': '\u2a30',
            'tint': '\u222d',
            'toea': '\u2928',
            'top': '\u22a4',
            'topbot': '\u2336',
            'topcir': '\u2af1',
            'Topf': '\ud835\udd4b',
            'topf': '\ud835\udd65',
            'topfork': '\u2ada',
            'tosa': '\u2929',
            'tprime': '\u2034',
            'trade': '\u2122',
            'triangle': '\u25b5',
            'triangledown': '\u25bf',
            'triangleleft': '\u25c3',
            'trianglelefteq': '\u22b4',
            'triangleq': '\u225c',
            'triangleright': '\u25b9',
            'trianglerighteq': '\u22b5',
            'tridot': '\u25ec',
            'trie': '\u225c',
            'triminus': '\u2a3a',
            'TripleDot': '\x20\u20db',
            'triplus': '\u2a39',
            'trisb': '\u29cd',
            'tritime': '\u2a3b',
            'Tscr': '\ud835\udcaf',
            'tscr': '\ud835\udcc9',
            'TScy': '\u0426',
            'tscy': '\u0446',
            'TSHcy': '\u040b',
            'tshcy': '\u045b',
            'Tstrok': '\u0166',
            'tstrok': '\u0167',
            'twixt': '\u226c',
            'twoheadleftarrow': '\u219e',
            'twoheadrightarrow': '\u21a0',
            'Uacgr': '\u038e',
            'uacgr': '\u03cd',
            'Uacute': '\xda',
            'uacute': '\xfa',
            'uarr': '\u2191',
            'Uarr': '\u219f',
            'uArr': '\u21d1',
            'Uarrocir': '\u2949',
            'Ubrcy': '\u040e',
            'ubrcy': '\u045e',
            'Ubreve': '\u016c',
            'ubreve': '\u016d',
            'Ucirc': '\xdb',
            'ucirc': '\xfb',
            'Ucy': '\u0423',
            'ucy': '\u0443',
            'udarr': '\u21c5',
            'Udblac': '\u0170',
            'udblac': '\u0171',
            'udhar': '\u296e',
            'udiagr': '\u03b0',
            'Udigr': '\u03ab',
            'udigr': '\u03cb',
            'ufisht': '\u297e',
            'Ufr': '\ud835\udd18',
            'ufr': '\ud835\udd32',
            'Ugr': '\u03a5',
            'ugr': '\u03c5',
            'Ugrave': '\xd9',
            'ugrave': '\xf9',
            'uHar': '\u2963',
            'uharl': '\u21bf',
            'uharr': '\u21be',
            'uhblk': '\u2580',
            'ulcorn': '\u231c',
            'ulcorner': '\u231c',
            'ulcrop': '\u230f',
            'ultri': '\u25f8',
            'Umacr': '\u016a',
            'umacr': '\u016b',
            'uml': '\xa8',
            'UnderBar': '\x20\u0332',
            'UnderBrace': '\ufe38',
            'UnderBracket': '\u23b5',
            'UnderParenthesis': '\ufe36',
            'Union': '\u22c3',
            'UnionPlus': '\u228e',
            'Uogon': '\u0172',
            'uogon': '\u0173',
            'Uopf': '\ud835\udd4c',
            'uopf': '\ud835\udd66',
            'uparrow': '\u2191',
            'UpArrow': '\u2191',
            'Uparrow': '\u21d1',
            'UpArrowBar': '\u2912',
            'UpArrowDownArrow': '\u21c5',
            'UpDownArrow': '\u2195',
            'updownarrow': '\u2195',
            'Updownarrow': '\u21d5',
            'UpEquilibrium': '\u296e',
            'upharpoonleft': '\u21bf',
            'upharpoonright': '\u21be',
            'uplus': '\u228e',
            'UpperLeftArrow': '\u2196',
            'UpperRightArrow': '\u2197',
            'upsi': '\u03c5',
            'Upsi': '\u03d2',
            'upsih': '\u03d2',
            'Upsilon': '\u03a5',
            'upsilon': '\u03c5',
            'UpTee': '\u22a5',
            'UpTeeArrow': '\u21a5',
            'upuparrows': '\u21c8',
            'urcorn': '\u231d',
            'urcorner': '\u231d',
            'urcrop': '\u230e',
            'Uring': '\u016e',
            'uring': '\u016f',
            'urtri': '\u25f9',
            'Uscr': '\ud835\udcb0',
            'uscr': '\ud835\udcca',
            'utdot': '\u22f0',
            'Utilde': '\u0168',
            'utilde': '\u0169',
            'utri': '\u25b5',
            'utrif': '\u25b4',
            'uuarr': '\u21c8',
            'Uuml': '\xdc',
            'uuml': '\xfc',
            'uwangle': '\u29a7',
            'vangrt': '\u299c',
            'varepsilon': '\u03b5',
            'varkappa': '\u03f0',
            'varnothing': '\u2205',
            'varphi': '\u03c6',
            'varpi': '\u03d6',
            'varpropto': '\u221d',
            'varr': '\u2195',
            'vArr': '\u21d5',
            'varrho': '\u03f1',
            'varsigma': '\u03c2',
            'varsubsetneq': '\u228a\ufe00',
            'varsubsetneqq': '\u2acb\ufe00',
            'varsupsetneq': '\u228b\ufe00',
            'varsupsetneqq': '\u2acc\ufe00',
            'vartheta': '\u03d1',
            'vartriangleleft': '\u22b2',
            'vartriangleright': '\u22b3',
            'vBar': '\u2ae8',
            'Vbar': '\u2aeb',
            'vBarv': '\u2ae9',
            'Vcy': '\u0412',
            'vcy': '\u0432',
            'vdash': '\u22a2',
            'vDash': '\u22a8',
            'Vdash': '\u22a9',
            'VDash': '\u22ab',
            'Vdashl': '\u2ae6',
            'vee': '\u2228',
            'Vee': '\u22c1',
            'veebar': '\u22bb',
            'veeeq': '\u225a',
            'vellip': '\u22ee',
            'verbar': '\x7c',
            'Verbar': '\u2016',
            'vert': '\x7c',
            'Vert': '\u2016',
            'VerticalBar': '\u2223',
            'VerticalLine': '\x7c',
            'VerticalSeparator': '\u2758',
            'VerticalTilde': '\u2240',
            'VeryThinSpace': '\u200a',
            'Vfr': '\ud835\udd19',
            'vfr': '\ud835\udd33',
            'vltri': '\u22b2',
            'vnsub': '\u2282\u20d2',
            'vnsup': '\u2283\u20d2',
            'Vopf': '\ud835\udd4d',
            'vopf': '\ud835\udd67',
            'vprop': '\u221d',
            'vrtri': '\u22b3',
            'Vscr': '\ud835\udcb1',
            'vscr': '\ud835\udccb',
            'vsubne': '\u228a\ufe00',
            'vsubnE': '\u2acb\ufe00',
            'vsupne': '\u228b\ufe00',
            'vsupnE': '\u2acc\ufe00',
            'Vvdash': '\u22aa',
            'vzigzag': '\u299a',
            'Wcirc': '\u0174',
            'wcirc': '\u0175',
            'wedbar': '\u2a5f',
            'wedge': '\u2227',
            'Wedge': '\u22c0',
            'wedgeq': '\u2259',
            'weierp': '\u2118',
            'Wfr': '\ud835\udd1a',
            'wfr': '\ud835\udd34',
            'Wopf': '\ud835\udd4e',
            'wopf': '\ud835\udd68',
            'wp': '\u2118',
            'wr': '\u2240',
            'wreath': '\u2240',
            'Wscr': '\ud835\udcb2',
            'wscr': '\ud835\udccc',
            'xcap': '\u22c2',
            'xcirc': '\u25ef',
            'xcup': '\u22c3',
            'xdtri': '\u25bd',
            'Xfr': '\ud835\udd1b',
            'xfr': '\ud835\udd35',
            'Xgr': '\u039e',
            'xgr': '\u03be',
            'xharr': '\u27f7',
            'xhArr': '\u27fa',
            'Xi': '\u039e',
            'xi': '\u03be',
            'xlarr': '\u27f5',
            'xlArr': '\u27f8',
            'xmap': '\u27fc',
            'xnis': '\u22fb',
            'xodot': '\u2a00',
            'Xopf': '\ud835\udd4f',
            'xopf': '\ud835\udd69',
            'xoplus': '\u2a01',
            'xotime': '\u2a02',
            'xrarr': '\u27f6',
            'xrArr': '\u27f9',
            'Xscr': '\ud835\udcb3',
            'xscr': '\ud835\udccd',
            'xsqcup': '\u2a06',
            'xuplus': '\u2a04',
            'xutri': '\u25b3',
            'xvee': '\u22c1',
            'xwedge': '\u22c0',
            'Yacute': '\xdd',
            'yacute': '\xfd',
            'YAcy': '\u042f',
            'yacy': '\u044f',
            'Ycirc': '\u0176',
            'ycirc': '\u0177',
            'Ycy': '\u042b',
            'ycy': '\u044b',
            'yen': '\xa5',
            'Yfr': '\ud835\udd1c',
            'yfr': '\ud835\udd36',
            'YIcy': '\u0407',
            'yicy': '\u0457',
            'Yopf': '\ud835\udd50',
            'yopf': '\ud835\udd6a',
            'Yscr': '\ud835\udcb4',
            'yscr': '\ud835\udcce',
            'YUcy': '\u042e',
            'yucy': '\u044e',
            'yuml': '\xff',
            'Yuml': '\u0178',
            'Zacute': '\u0179',
            'zacute': '\u017a',
            'Zcaron': '\u017d',
            'zcaron': '\u017e',
            'Zcy': '\u0417',
            'zcy': '\u0437',
            'Zdot': '\u017b',
            'zdot': '\u017c',
            'zeetrf': '\u2128',
            'ZeroWidthSpace': '\u200b',
            'Zeta': '\u0396',
            'zeta': '\u03b6',
            'Zfr': '\u2128',
            'zfr': '\ud835\udd37',
            'Zgr': '\u0396',
            'zgr': '\u03b6',
            'ZHcy': '\u0416',
            'zhcy': '\u0436',
            'zigrarr': '\u21dd',
            'Zopf': '\u2124',
            'zopf': '\ud835\udd6b',
            'Zscr': '\ud835\udcb5',
            'zscr': '\ud835\udccf',
            'zwj': '\u200d',
            'zwnj': '\u200c'
        },
        'c1': {
            'cp1252': {
                '\x80': '\u20AC',
                '\x81': '\x81',
                '\x82': '\u201A',
                '\x83': '\u0192',
                '\x84': '\u201E',
                '\x85': '\u2026',
                '\x86': '\u2020',
                '\x87': '\u2021',
                '\x88': '\u02C6',
                '\x89': '\u2030',
                '\x8a': '\u0160',
                '\x8b': '\u2039',
                '\x8c': '\u0152',
                '\x8d': '\x8D',
                '\x8e': '\u017D',
                '\x8f': '\x8F',
                '\x90': '\x90',
                '\x91': '\u2018',
                '\x92': '\u2019',
                '\x93': '\u201C',
                '\x94': '\u201D',
                '\x95': '\u2022',
                '\x96': '\u2013',
                '\x97': '\u2014',
                '\x98': '\u02DC',
                '\x99': '\u2122',
                '\x9a': '\u0161',
                '\x9b': '\u203A',
                '\x9c': '\u0153',
                '\x9d': '\x9D',
                '\x9e': '\u017E',
                '\x9f': '\u0178'
            },
            'mac': {
                '\x80': '\xC4',
                '\x81': '\xC5',
                '\x82': '\xC7',
                '\x83': '\xC9',
                '\x84': '\xD1',
                '\x85': '\xD6',
                '\x86': '\xDC',
                '\x87': '\xE1',
                '\x88': '\xE0',
                '\x89': '\xE2',
                '\x8a': '\xE4',
                '\x8b': '\xE3',
                '\x8c': '\xE5',
                '\x8d': '\xE7',
                '\x8e': '\xE9',
                '\x8f': '\xE8',
                '\x90': '\xEA',
                '\x91': '\xEB',
                '\x92': '\xED',
                '\x93': '\xEC',
                '\x94': '\xEE',
                '\x95': '\xEF',
                '\x96': '\xF1',
                '\x97': '\xF3',
                '\x98': '\xF2',
                '\x99': '\xF4',
                '\x9a': '\xF6',
                '\x9b': '\xF5',
                '\x9c': '\xFA',
                '\x9d': '\xF9',
                '\x9e': '\xFB',
                '\x9f': '\xFC'
            }
        }
    };

    var _c1_re = new RegExp(
        // pattern
        re_cclass(c1_pat),
        // flags
        'g');
    var c1_to_unicode = function(s) {
        if (! s) return s;
        s = re_utf8(s);
        s = s.replace(_c1_re, function (m) { return re_utf8(xhtml.c1.cp1252[re_utf16(m)]); });
        s = s.replace(_c1_re, function (m) { return re_utf8(xhtml.c1.mac[re_utf16(m)]); });
        s = re_utf16(s);
        return s;
    };

    var dbg = function(msg, lvl) {
        if (typeof(GM_log) == "function") {
            GM_log(msg);
        } else {
            window.status = msg;
        }
    };
    var dom_getDocumentElement = function(DOM) {
        if (! DOM)
        {
            return null;
        }
        if ((typeof (DOM.documentElement) != 'undefined')
            &&
            (DOM.documentElement != null))
        {
            return DOM.documentElement;
        }
        for (var node = DOM.firstChild; node; node = node.nextSibling)
        {
            if (node.nodeType == 1)
            {
                return node;
            }
        }
        return DOM;
    };
    var dom_getLocalName = function(node) {
        if ((! node)
            ||
            (node.nodeType != 1))
        {
            return 'HTML';
        }
        if (typeof(node.localName) != 'undefined')
        {
            if (node.localName != null)
            {
                return node.localName;
            }
        }
        return node.tagName.substr(node.tagName.indexOf(':') + 1);
    };
    var getInnerText;
    // attempt to detect browser-native feed readers
    var smellsLikeAFeed = function(documentElement) {
        var smashCaseXHTML = function(s) { return s; };
        var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
        var isHTML = false;
        if (documentElement)
        {
            if ({'html':true}[(documentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement))])
            {
                isHTML = true;
            }
        }
        // Firefox 2.0 feed handler
        if (isHTML
            &&
            ((documentElement.id ? documentElement.id : documentElement.getAttribute('id')) == 'feedHandler')
            &&
            documentElement.ownerDocument
            &&
            documentElement.ownerDocument.getElementById
            &&
            documentElement.ownerDocument.getElementById('feedSubscribeLine'))
        {
            var feedSubscribeLine = documentElement.ownerDocument.getElementById('feedSubscribeLine');
            if (feedSubscribeLine.firstChild
                &&
                (feedSubscribeLine.firstChild.nodeType == 1)
                &&
                (feedSubscribeLine.firstChild.namespaceURI == namespaces.xul))
            {
                return true;
            }
        }
        if (isHTML
            &&
            (documentElement.childNodes.length > 1)
            &&
            (documentElement.childNodes[1].nodeType == 1)
            &&
            ((documentElement.childNodes[1].namespaceURI || namespaces.xhtml) == namespaces.xhtml)
            &&
            ((documentElement.childNodes[1].namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement.childNodes[1])) == 'body'))
        {
            // Internet Explorer XML Display
            if (re_utf8((documentElement.childNodes[1].className || documentElement.childNodes[1].getAttribute('class') || '')).split(_ws_re).join(' ').match(/(^| )st( |$)/))
            {
                var spans = dom_getElements(documentElement.childNodes[1], 'span', namespaces.xhtml);
                if (! spans.length)
                {
                    spans = dom_getElements(documentElement.childNodes[1], 'span');
                }
                for (var ispan = 0; ispan < spans.length; ispan ++)
                {
                    var span = spans[ispan];
                    if (re_utf8((span.className || span.getAttribute('class') || '')).split(_ws_re).join(' ').match(/(^| )t( |$)/))
                    {
                        var tagName = getInnerText(span).replace(/.*:/,'');
                        if (feedTags[tagName])
                        {
                            return true;
                        }
                        break;
                    }
                }
            }
            // Firefox 1.x XML-as-HTML rendering
            var originalDocumentElement = undef;
            for (var child = documentElement.childNodes[1].firstChild; child; child = child.nextSibling)
            {
                if (child.nodeType == 1)
                {
                    if (defined(originalDocumentElement))
                    {
                        originalDocumentElement = undef;
                        break;
                    }
                    else
                    {
                        originalDocumentElement = child;
                    }
                }
            }
            if (originalDocumentElement
                &&
                ((feedTags[(originalDocumentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(originalDocumentElement))])
                 ||
                 (feedNamespaces[originalDocumentElement.namespaceURI])))
            {
                return true;
            }
        }
        return false;
    };
    // smoke test
    var unverifiedSetTimeout = true;
    var eeust;
    try
    {
        window.setTimeout(function() { unverifiedSetTimeout = false; }, 1);
    }
    catch (eeust)
    {
    }
    var rss_discover;
    var rss_init = function(event, autorun, lookInBody) {
        var feeds = rss_discover(lookInBody);
        // read rss if feeds are discovered
        var sharedState;
        sharedState = {
            'location': get_location(),
            'feeds': feeds,
            '_locked': [],
            'lock': function(action)
            {
                if (sharedState._locked.length) sharedState._locked[sharedState._locked.length] = action;
                else
                {
                    sharedState._locked = [ function() { } ];
                    action();
                }
            },
            'unlock': function()
            {
                if (sharedState._locked.length)
                {
                    var action = sharedState._locked[sharedState._locked.length - 1];
                    sharedState._locked.length -= 1;
                    action();
                };
            }
        };
        for (var feed in feeds)
        {
            for (var iit = 0; iit < feeds[feed].length; iit ++)
            {
                var efeeds;
                try
                {
                    rss_req(feed, sharedState, feeds[feed][iit]);
                }
                catch (efeeds)
                {
                    dbg('failed to load feed ' + feed + ': ' + efeeds.message ? efeeds.message : efeeds.toString());
                }
            }
        }
        var rss_this_page = function() {
            var efeed;
            try
            {
                var href = ('' + get_location()).replace(/^feed:(\/\/)*/, '');
                var uri = new URL(href);
                if (! uri.scheme)
                {
                    href = 'http://' + href;
                }
                rss_req(location_minusFragment(href), sharedState);
            }
            catch (efeed)
            {
            }
        };
        // in case we are viewing a feed...
        if (! feeds[location_minusFragment(get_location())])
        {
            var smashCaseXHTML = function(s) { return s; };
            var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
            var documentElement = dom_getDocumentElement(window.document);
            var isHTML = false;
            if (documentElement)
            {
                if ({'html':true}[(documentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement))])
                {
                    isHTML = true;
                }
            }
            if (feedTags[dom_getLocalName(documentElement)]
                ||
                feedNamespaces[documentElement.namespaceURI]
                ||
                smellsLikeAFeed(documentElement)
                ||
                ((new URL(get_location())).scheme == 'feed'))
            {
                rss_this_page();
            }
            if (isHTML)
            {
                var hdlr = function() {
                    rss_render(window.document, location_minusFragment(get_location()), sharedState);
                };
                if (! autorun)
                {
                    hdlr();
                }
                else
                {
                    if (((typeof (window.document.readyState) != 'undefined')
                         &&
                         (window.document.readyState == 'complete'))
                        ||
                        (typeof(GM_xmlhttpRequest) == 'undefined'))
                    {
                        if (unverifiedSetTimeout) hdlr();
                        else window.setTimeout(hdlr, 1);
                    }
                    else
                    {
                        addEventHandler(window, 'load', hdlr);
                    }
                }
            }
        }
    };

    var _leading_ws_re = new RegExp(
        // pattern
        '^' + ws_pat + '+',
        // flags
        '');
    var _content_type_parameter_re = new RegExp(
        // pattern
        ws_pat + '*(;.*)$',
        // flags
        '');
    var _alternate_rel_re = /(^| )(alternate)( |$)/i;
    var _feed_rel_re = /(^| )(service\.feed|meta|outline|feed)( |$)/i;
    var _stylesheet_rel_re = /(^| )(stylesheet)( |$)/i;
    var is_feed_rel = function(rel) {
        rel = re_utf8(rel).split(_ws_re).join(' ');
        return (rel.match(_feed_rel_re)
                ||
                (rel.match(_alternate_rel_re)
                 &&
                 (! rel.match(_stylesheet_rel_re))));
    };
    rss_discover = function(lookInBody) {
        var srcs = [];
        var src = '';
        var links = dom_getElements(window.document, 'link', namespaces.xhtml);
        if (! links.length)
        {
            links = dom_getElements(window.document, 'link');
        }
        for (var i=0; i< links.length; i++) {
            var rel = links[i].rel ? links[i].rel : links[i].getAttribute('rel');
            var rev = links[i].rev ? links[i].rev : links[i].getAttribute('rev');
            rel = (rel || (rev != null)) ? rel : 'alternate';
            rel = rel ? rel : '';
            var type = links[i].type ? links[i].type : links[i].getAttribute('type');
            type = type ? type : 'application/rss+xml';
            if (is_feed_rel(rel)
                &&
                feedTypes[re_utf16(re_utf8(type).toLowerCase().replace(_content_type_parameter_re, '').replace(_leading_ws_re, ''))])
            {
                src = links[i].href ? links[i].href : links[i].getAttribute('href');
                if (src != null)
                {
                    srcs[srcs.length] = [ '' + (src ? src : ''), type ];
                }
            }
        }
        if (lookInBody) { /* ok, this is too non-standards-compliant even for me -bsittler */
            var smashCaseXHTML = function(s) { return s; };
            var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
            links = window.document.links;
            if (links == null)
            {
                links = dom_getElements(window.document, 'a', namespaces.xhtml);
                if (! links.length)
                {
                    links = dom_getElements(window.document, 'a');
                }
            }
            for (var i=0; i< links.length; i++) {
                if ({'link':true}[((dom_getDocumentElement(window.document)).namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(links[i]))])
                {
                    continue;
                }
                var rel = links[i].rel ? links[i].rel : links[i].getAttribute('rel');
                var rev = links[i].rev ? links[i].rev : links[i].getAttribute('rev');
                rel = rel ? rel : '';
                var type = links[i].type ? links[i].type : links[i].getAttribute('type');
                type = type ? type : 'text/html';
                if (is_feed_rel(rel)
                    &&
                    feedTypes[re_utf16(re_utf8(type).toLowerCase().replace(_content_type_parameter_re, '').replace(_leading_ws_re, ''))])
                {
                    src = links[i].href ? links[i].href : links[i].getAttribute('href');
                    if (src != null)
                    {
                        srcs[srcs.length] = [ '' + (src ? src : ''), type ];
                    }
                }
            }
        }
        var feeds = {};
        for (var iisrc = 0; iisrc < srcs.length; iisrc ++)
        {
            var src = srcs[iisrc][0];
            var type = srcs[iisrc][1];
            // Slashdot link looks like HREF="//slashdot.org/index.rss"
            if (src.indexOf('//') == 0) {
                src = (get_location()).protocol + src;
            }
            // GM_XmlhttpRequest needs fully qualified URL as of 0.6.4
            var srcu = (new URL(src, get_location()));
            src = srcu.toString();
            // dbg("src=" + src);
            // only fetch feeds from known-safe protocols
            if (!({'http': true, 'https': true, 'gopher': true, 'ftp': true})[srcu.scheme])
            {
                continue;
            }
            // disallow explicit ports in the well-known ports range
            if (defined(srcu.port) && (xparseInt(srcu.port) >= 0) && (xparseInt(srcu.port) <= 1023))
            {
                continue;
            }
            var types = feeds[src] || [];
            types[types.length] = type;
            feeds[src] = types;
        }
        return feeds;
    };
    var xmldlls = [ 'msxml2', 'microsoft', 'msxml', 'msxml3' ];
    var xmlparsercontrols = [ 'domdocument', 'xmldoc' ];
    var xmlhttpcontrols = [ 'xmlhttp' ];
    var rss_req = function(src, sharedState, feedType) {
        if (! sharedState)
        {
            sharedState = {
                'location': get_location(),
                'feeds': [ src ],
                '_locked': [],
                'lock': function(action)
                {
                    if (sharedState._locked.length) sharedState._locked[sharedState._locked.length] = action;
                    else
                    {
                        sharedState._locked = [ function() { } ];
                        action();
                    }
                },
                'unlock': function()
                {
                    if (sharedState._locked.length)
                    {
                        var action = sharedState._locked[sharedState._locked.length - 1];
                        sharedState._locked.length -= 1;
                        action();
                    };
                }
            };
        }
        sharedState.lock(function() { rss_req_real(src, sharedState, feedType); });
    };
    // initialize XHR object
    var rss_req_real = function(src, sharedState, feedType) {
        if (! src) return;
        var req = null;
        var handled = false;
        var acceptTypes = [];
        if (feedType) acceptTypes[acceptTypes.length] = feedType + ';q=1.0';
        for (var acceptType in feedTypes)
        {
            if (feedTypes[acceptType]
                &&
                (acceptType != feedType))
            {
                acceptTypes[acceptTypes.length] = acceptType+';q=0.9';
            }
        }
        // http://diveintogreasemonkey.org/api/GM_xmlhttpRequest.html
        if (typeof(GM_xmlhttpRequest) == 'function')
        {
            // dbg('XHR: GM');
            src = new URL(src);
            if (src.query)
            {
                src.query = src.query.split(':').join('%3A');
            }
            src = src.toString();
            var e;
            try
            {
                GM_xmlhttpRequest(
                    {
                      method: 'GET',
                            url: src,
                            headers: { 'User-agent': 'Mozilla/5.0 (compatible) GM RSS Panel X', 'Accept': acceptTypes.join(', ') },
                            onload: function(req)
                        {
                            return rss_response(req, src, sharedState);
                        },
                            onerror: function(req)
                        {
                            sharedState.unlock();
                        }
                    });
                handled = true;
            }
            catch (e)
            {
                dbg('GM_xmlhttpRequest failed for ' + src + ': ' + e.message ? e.message : e.toString());
            }
        }
        if (! handled)
        {
            // handle feed through "native" XHR object
            if (window.XMLHttpRequest) {
                try {
                    req = new window.XMLHttpRequest();
                } catch(e) {
                    dbg((e.message) ? e.message : e.toString());
                    req = false;
                }
                // branch for IE/Windows ActiveX version
            } else if (window.ActiveXObject) {
                var e;
                for (var dlli = 0; dlli < xmldlls.length; dlli ++)
                {
                    var dll = xmldlls[dlli];
                    for (var controli = 0; controli < xmlhttpcontrols.length; controli ++)
                    {
                        var component = xmlhttpcontrols[controli];
                        try {
                            req = new window.ActiveXObject(dll + '.' + component);
                            // dbg('xmlhttp ' + dll + '.' + component);
                            break;
                        } catch (e) {
                        }
                    }
                    if (req)
                    {
                        break;
                    }
                }
                if (! req)
                {
                    dbg('no xml http control was found: ' + (e.message ? e.message : e.toString()));
                }
            }

        }
        if (req) {
            // We run this from a setTimeout to work around a
            // Konqueror bug; also gives the user agent a chance to
            // respond to user input between feeds
            window.setTimeout(
                function() {
                    var e;
                    try {
                        req.open('GET', src, true);
                        var watchdog = undef;
                        req.onreadystatechange = function() {
                            if (defined(watchdog))
                            {
                                window.clearTimeout(watchdog);
                                watchdog = null;
                            }
                            rss_response(req, src, sharedState);
                        };
                        var eesrh;
                        try
                        {
                            req.setRequestHeader('User-agent', 'Mozilla/5.0 (compatible) RSS Panel X');
                            req.setRequestHeader('Accept', acceptTypes.join(', '));
                        }
                        catch (eesrh)
                        {
                        }
                        req.send(null);
                        watchdog = window.setTimeout(
                            function()
                            {
                                watchdog = null;
                                req.onreadystatechange = function() {};
                                req.abort();
                                sharedState.unlock();
                                dbg("XHR timeout for URL " + src);
                            }, WatchdogTimeout);
                    } catch(e) {
                        sharedState.unlock();
                        dbg((e.message) ? e.message : e.toString());
                    }
                }, 100);
        }
        else if (! handled)
        {
            sharedState.unlock();
            dbg('no XHR for URL ' + src);
        }
    };
    var parseXML = function(xmlString, contentType, ignoreErrors) {
        contentType = contentType ? contentType : 'application/xml';
        var DOM = null;
        if (typeof(XPCNativeWrapper) == 'function') {
            var dp = new XPCNativeWrapper(window, 'DOMParser()');
            // dbg('XPC Wrapped DOM Parser: '+typeof(dp));
            var parser = new dp.DOMParser();
            // dbg('DOM Parser: '+typeof(parser));
            DOM = parser.parseFromString(xmlString, contentType);
            if (dom_getLocalName(dom_getDocumentElement(DOM)) == 'parsererror')
            {
                if (! ignoreErrors) dbg(getInnerText(DOM));
                DOM = null;
            }
            // fallback to content window object; this would fail
            // in GM 0.6.4+ but the safe option has succeeded already.
        } else if (typeof(window.DOMParser) != 'undefined') {
            // dbg("parsing DOMParser");
            var parser = new window.DOMParser();
            DOM = parser.parseFromString(xmlString, contentType);
            // This horrendous and brittle mess is to detect an XML
            // parsing error in Konqueror
            if (defined(DOM.documentElement)
                &&
                DOM.documentElement.namespaceURI == namespaces.xhtml
                &&
                DOM.documentElement.localName == 'html'
                &&
                DOM.documentElement.childNodes.length == 1
                &&
                DOM.documentElement.firstChild.nodeType == 1
                &&
                DOM.documentElement.firstChild.namespaceURI == namespaces.xhtml
                &&
                DOM.documentElement.firstChild.localName == 'body'
                &&
                DOM.documentElement.firstChild.childNodes.length == 4
                &&
                DOM.documentElement.firstChild.firstChild.nodeType == 1
                &&
                DOM.documentElement.firstChild.firstChild.namespaceURI == namespaces.xhtml
                &&
                DOM.documentElement.firstChild.firstChild.localName == 'h1'
                &&
                DOM.documentElement.firstChild.firstChild.childNodes.length == 1
                &&
                DOM.documentElement.firstChild.firstChild.firstChild.nodeType == 3
                &&
                DOM.documentElement.firstChild.firstChild.firstChild.nodeValue == 'XML parsing error'
                &&
                DOM.documentElement.firstChild.childNodes[1].nodeType == 3
                &&
                DOM.documentElement.firstChild.childNodes[2].nodeType == 1
                &&
                DOM.documentElement.firstChild.childNodes[2].namespaceURI == namespaces.xhtml
                &&
                DOM.documentElement.firstChild.childNodes[2].localName == 'hr'
                &&
                DOM.documentElement.firstChild.childNodes[2].childNodes.length == 0
                &&
                DOM.documentElement.firstChild.childNodes[3].nodeType == 1
                &&
                DOM.documentElement.firstChild.childNodes[3].namespaceURI == namespaces.xhtml
                &&
                DOM.documentElement.firstChild.childNodes[3].localName == 'pre')
            {
                if (! ignoreErrors) dbg(DOM.documentElement.firstChild.childNodes[1].nodeValue);
                DOM = null;
            }
            if (dom_getLocalName(dom_getDocumentElement(DOM)) == 'parsererror')
            {
                if (! ignoreErrors) dbg(getInnerText(DOM));
                DOM = null;
            }
        } else if (window.ActiveXObject) {
            DOM = null;

            var e;
            for (var dlli = 0; dlli < xmldlls.length; dlli ++)
            {
                var dll = xmldlls[dlli];
                for (var controli = 0; controli < xmlparsercontrols.length; controli ++)
                {
                    var component = xmlparsercontrols[controli];
                    try {
                        DOM = new window.ActiveXObject(dll + '.' + component);
                        // dbg('parsing ' + dll + '.' + component);
                        break;
                    } catch (e) {
                    }
                }
                if (DOM)
                {
                    break;
                }
            }
            if (DOM)
            {
                DOM.loadXML(xmlString);
                if (DOM.parseError.errorCode != 0) {
                    if (! ignoreErrors) dbg(DOM.parseError.reason);
                    DOM = null;
                }
            }
            else
            {
                if (! ignoreErrors) dbg('no xml parser control was found: ' + (e.message ? e.message : e.toString()));
            }
        } else {
            if (! ignoreErrors) dbg('no xml parser control was found');
        }
        return DOM;
    };
    /* this detects a bizarre Safari XML-parsing bug */
    var nullNS = undef;
    (function() {
        var e;
        try
        {
            nullNS = parseXML('<' + 'rss>' + '<' + 'link/>' + '<' + '/rss>', 'application/xml').documentElement.firstChild.namespaceURI;
        }
        catch (e)
        {
        }
    })();

    var rss_response = function(req, src, sharedState) {
        // dbg('XHR status: ' + req.status);
        // only if req is "loaded"
        if (req.readyState == 4) {
            sharedState.unlock();
            // only if "OK"
            if (req.status == 200) {
                // handle result
                // rss_render(req.responseXML, src, sharedState);
                // responseXML is not available with GM_XHR
                // http://www.mozilla.org/xmlextras/parseserialize.html
                // Aaargggg!
                // Turnabout sets responseXML to the same string as resultText
                if (req.responseXML && typeof(req.responseXML) != "string") {
                    // dbg("parsing Native XHR " + typeof(req.responseXML));
                    rss_render(req.responseXML, src, sharedState);
                } else {
                    // try parsing the resultText
                    var DOM = parseXML(req.responseText, 'application/xhtml+xml');
                    if (DOM != null)
                    {
                        rss_render(DOM, src, sharedState);
                    }
                }
            } else {
                if (src == location_minusFragment(get_location()))
                {
                    rss_render(window.document, src, sharedState);
                }
                else
                {
                    dbg("XHR response error: " + req.status + "; " + req.statusText + "\nURL: " + src);
                }
            }
        }
    };
    var dom_setStyle = function(elt, str) {
        var eess;
        try
        {
            elt.setAttribute("style", str);
            if (elt.style.setAttribute) {
                elt.style.setAttribute("cssText", str, 0);
            }
            if (bugPositionFixedIsIgnored)
            {
                if (elt.style.position == 'fixed')
                {
                    elt.style.position = 'absolute';
                }
            }
        }
        catch (eess)
        {
        }
    };
    var dom_createElementRSS = function(DOM, tagName) {
        if (typeof(DOM.createElementNS) != 'undefined')
        {
            var e;
            try
            {
                return DOM.createElementNS(null, tagName);
            }
            catch (e)
            {
            }
        }
        return DOM.createElement(tagName);
    };
    var dom_createElementAtom = function(DOM, tagName) {
        if (typeof(DOM.createElementNS) != 'undefined')
        {
            var e;
            try
            {
                return DOM.createElementNS(namespaces.atom, tagName);
            }
            catch (e)
            {
            }
        }
        var node = DOM.createElement(tagName);
        var e;
        try
        {
            node.namespaceURI = namespaces.atom;
        }
        catch (e)
        {
            return null;
        }
        return node;
    };
    var dom_createElementContent = function(DOM, tagName) {
        if (typeof(DOM.createElementNS) != 'undefined')
        {
            var e;
            try
            {
                return DOM.createElementNS(namespaces.content, tagName);
            }
            catch (e)
            {
            }
        }
        var node = DOM.createElement(tagName);
        var e;
        try
        {
            node.namespaceURI = namespaces.content;
        }
        catch (e)
        {
            return null;
        }
        return node;
    };
    var dom_createElementFeedburner = function(DOM, tagName) {
        if (typeof(DOM.createElementNS) != 'undefined')
        {
            var e;
            try
            {
                return DOM.createElementNS(namespaces.feedburner, tagName);
            }
            catch (e)
            {
            }
        }
        var node = DOM.createElement(tagName);
        var e;
        try
        {
            node.namespaceURI = namespaces.feedburner;
        }
        catch (e)
        {
            return null;
        }
        return node;
    };
    var dom_createElementXHTML = function(tagName) {
        var smashCaseXHTML = function(s) { return s; };
        var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
        var documentElement = dom_getDocumentElement(window.document);
        var isHTML = false;
        if (documentElement)
        {
            if ({'html':true}[(documentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement))])
            {
                isHTML = true;
            }
        }
        if (documentElement.namespaceURI || ! isHTML)
        {
            var e;
            try
            {
                return window.document.createElementNS(namespaces.xhtml, tagName);
            }
            catch (e)
            {
            }
        }
        return window.document.createElement(tagName);
    };
    var dom_appendText = function(elt, txt) {
        txt = '' + txt;
        txt = xml_unicode_filter(txt);
        while (txt.length)
        {
            var brk = MAXTXTSZ;
            if (txt.substr(brk, 1)
                &&
                ((txt.substr(brk, 1).charCodeAt(0) & 0xfc00) == 0xdc00))
            {
                // do not split a UTF-16 surrogate pair in two
                brk = brk - 1;
            }
            elt.appendChild((elt.ownerDocument ? elt.ownerDocument : window.document).createTextNode(txt.substr(0, brk)));
            txt = txt.substr(brk);
        }
        return elt;
    };
    var dom_createLink = function(url, txt, title, css, real_url) {
        var a = dom_createElementXHTML('a');
        a.setAttribute("href", url);
        /* ************************** bel *****************************
         *   Added a change here to make sure that the links created
         *  with our TEXT color.
         * ************************************************************/
        dom_setStyle(a, "color:"+TEXT+";" + (css ? css : ''));
        if (title) a.setAttribute('title', title);
        dom_appendText(a, txt);
        if (real_url && (url != real_url))
        {
            var oc = 'location = unescape(\'' + xescape(real_url) + '\'); return false;';
            var eeoc;
            try
            {
                a.setAttribute('onclick', oc);
                a.onclick = oc;
            }
            catch (eeoc)
            {
                a.onclick = new Function(oc);
            }
        }
        return a;
    };
    var dom_getAttribute = function(node, attr, ns) {
        if (! node) return undef;
        if (node.nodeType != 1) return undef;
        if (! ns)
        {
            return node.getAttribute(attr);
        }
        if (typeof(node.getAttributeNS) != 'undefined')
        {
            return node.getAttributeNS(ns, attr);
        }
        var eega;
        try
        {
            for (var i = 0; i < node.attributes.length; i ++)
            {
                var eegaa;
                try
                {
                    var attrnode = node.attributes[i];
                    var localName = attrnode.localName ? attrnode.localName : attrnode.name.substr(attrnode.name.indexOf(':') + 1);
                    if (attrnode.namespaceURI != ns)
                    {
                        continue;
                    }
                    if (localName != attr)
                    {
                        continue;
                    }
                    return attrnode.value;
                }
                catch (eegaa)
                {
                }
            }
        }
        catch (eega)
        {
        }
        return undef;
    };
    var dom_getElements = function(node, elt, ns) {
        var eege;
        try
        {
            if ((typeof(elt.getElementsByTagNameNS) != 'undefined')
                &&
                (ns || ! nullNS))
            {
                var list = node.getElementsByTagNameNS(ns, elt);
                if (list.length)
                {
                    return list;
                }
            }
            var list = node.getElementsByTagName((ns != null) ? '*' : elt);
            var olist = [];
            var smashCaseXHTML = function(s) { return s; };
            var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
            var documentElement = dom_getDocumentElement(node.ownerDocument ? node.ownerDocument : window.document);
            var isHTML = false;
            if (documentElement)
            {
                if ({'html':true}[(documentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement))])
                {
                    isHTML = true;
                }
            }
            for (var i = 0; i < list.length; i ++)
            {
                var child = list[i];
                var smashCase = (child.namespaceURI || ! isHTML) ? smashCaseXHTML : smashCaseHTML;
                if (((ns == '*')
                     ||
                     ((ns == namespaces.xhtml)
                      &&
                      isHTML
                      &&
                      (! child.namespaceURI))
                     ||
                     ((! ns)
                      &&
                      (child.namespaceURI == nullNS))
                     ||
                     ((child.namespaceURI ? child.namespaceURI : null) == (ns ? ns : null)))
                    &&
                    ((elt == '*')
                     ||
                     (smashCase(dom_getLocalName(child)) == elt)))
                {
                    olist[olist.length] = child;
                }
            }
            return olist;
        }
        catch (eege)
        {
        }
        return [];
    };
    var textFromHTML;
    var dom_getNodeValue = function(node) {
        if ((! node.firstChild) && (typeof(node.innerText) != 'undefined') && node.innerText)
        {
            return node.innerText;
        }
        var o = [];
        for (var child = node.firstChild; child; child = child.nextSibling)
        {
            if ((child.nodeType == 3)
                ||
                (child.nodeType == 4))
            {
                o[o.length] = child.nodeValue;
            }
        }
        return o.join('');
    };
    var dom_getFirstNodeValue = function(node, elt, ns) {
        try {
            var list = dom_getElements(node, elt, ns);
            var txt = '';
            if (list.length)
            {
                return dom_getNodeValue(list[0]);
            }
        } catch (e) {
            // dbg("missing element " + elt + "\nError: " + e.message);
        }
        return '';
    };
// this returns a sort of text flattening of a DOM tree that
// is slightly XHTML-aware
    getInnerText = function(node) {
        var documentElement = dom_getDocumentElement(node.ownerDocument ? node.ownerDocument : window.document);
        var htmlNS = namespaces.xhtml;
        var smashCaseXHTML = function(s) { return s; };
        var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
        var isHTML = false;
        if (documentElement)
        {
            if ({'html':true}[(documentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement))])
            {
                htmlNS = documentElement.namespaceURI;
                isHTML = true;
            }
        }
        var output = [];
        for (var child = node.firstChild; child; child = child.nextSibling)
        {
            if (child.nodeType == 1)
            {
                var e;
                try
                {
                    output[output.length] = getInnerText(child);
                }
                catch (e)
                {
                }
                try
                {
                    if ((! child.namespaceURI)
                        ||
                        (child.namespaceURI == namespaces.xhtml)
                        ||
                        (child.namespaceURI == htmlNS))
                    {
                        var smashCase = (child.namespaceURI || ! isHTML) ? smashCaseXHTML : smashCaseHTML;
                        var tagName = smashCase(dom_getLocalName(child));
                        if (xhtml.suppress[tagName])
                        {
                            output[output.length - 1] = '';
                        }
                        if (xhtml.valueAttr[tagName] &&
                            child.getAttribute(xhtml.valueAttr[tagName]))
                        {
                            output[output.length - 1] = child.getAttribute(xhtml.valueAttr[tagName]);
                        }
                        if (xhtml.breakAfter[tagName])
                        {
                            output[output.length] = '\n';
                        }
                    }
                }
                catch (e)
                {
                }
            }
            else if (child.nodeType == 3 || child.nodeType == 4)
            {
                output[output.length] = child.nodeValue;
            }
        }
        return output.join('');
    };
    var parseXHTML = function(xhtml, uri) {
        var doc = (
            '<' + '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
            +
            '<' + 'html xmlns="http://www.w3.org/1999/xhtml">'
            +
            '<' + 'head>'
            +
            '<' + 'title>'
            +
            'From: '
            +
            escapeXML(uri)
            +
            '<' + '/title>'
            +
            '<' + '/head>'
            +
            '<' + 'body>' + xhtml + '<' + '/body>'
            +
            '<' + '/html>');
        var DOM = parseXML(doc, 'application/xhtml+xml', true);
        if (DOM == null)
        {
            throw "Parsing failed";
        }
        if ((dom_getDocumentElement(DOM).nodeType != 1) ||
            (dom_getDocumentElement(DOM).namespaceURI != namespaces.xhtml) ||
            (dom_getLocalName(dom_getDocumentElement(DOM)) != 'html') ||
            (dom_getDocumentElement(DOM).childNodes.length != 2))
        {
            throw "Not XHTML 1.x";
        }
        return DOM;
    };
    // this is large and hairy, but allows us to "parse" HTML and
    // extract the text in a single pass without recursion, and
    // remove entity and numeric character references in a second
    // nonrecursive pass; this actually implements a hybrid of the
    // tag soup, SGML, and XML parsing models, and has special
    // knowledge of the following constructs:
    // (a) HTML/SGML-style comments
    // (b) XML-style CDATA sections
    // (c) HTML-style XMP and LISTING (no markup inside)
    // (d) HTML-style SCRIPT, STYLE, TEXTAREA, and TITLE (no markup,
    // content ignored; this is similar to xhtml.suppress)
    // (e) HTML-style PLAINTEXT (no markup after open tag)
    // and
    // (f) other tag-like objects. This regex is ASCII-only.
    var _textFromHTML_re = /([<]!--([^-]|-[^-])*--(\s*--([^-]|-[^-])*--)*[>])|([<]!\[CDATA\[(([^\]]|\][^\]]|\]\][^>\]])*\]*)\]\][>])|([<][xX][mM][pP](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([^<]|[<][^\/<]|[<]\/[^xX<]|[<]\/[xX][^mM<]|[<]\/[xX][mM][^pP<]|[<]\/[xX][mM][pP][^\s><])*([<]|[<]\/|[<]\/[xX]|[<]\/[xX][mM]|[<]\/[xX][mM][pP]\s*)*)([<]\/[xX][mM][pP]\s*[>]|$))|([<][lL][iI][sS][tT][iI][nN][gG](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([^<]|[<][^\/<]|[<]\/[^lL<]|[<]\/[lL][^iI<]|[<]\/[lL][iI][^sS<]|[<]\/[lL][iI][sS][^tT<]|[<]\/[lL][iI][sS][tT][^iI<]|[<]\/[lL][iI][sS][tT][iI][^nN<]|[<]\/[lL][iI][sS][tT][iI][nN][^gG<]|[<]\/[lL][iI][sS][tT][iI][nN][gG][^\s><])*([<]|[<]\/|[<]\/[lL]|[<]\/[lL][iI]|[<]\/[lL][iI][sS]|[<]\/[lL][iI][sS][tT]|[<]\/[lL][iI][sS][tT][iI]|[<]\/[lL][iI][sS][tT][iI][nN]|[<]\/[lL][iI][sS][tT][iI][nN][gG]\s*)*)([<]\/[lL][iI][sS][tT][iI][nN][gG]\s*[>]|$))|([<][sS][cC][rR][iI][pP][tT](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([^<]|[<][^\/<]|[<]\/[^sS<]|[<]\/[sS][^cC<]|[<]\/[sS][cC][^rR<]|[<]\/[sS][cC][rR][^iI<]|[<]\/[sS][cC][rR][iI][^pP<]|[<]\/[sS][cC][rR][iI][pP][^tT<]|[<]\/[sS][cC][rR][iI][pP][tT][^\s><])*([<]|[<]\/|[<]\/[sS]|[<]\/[sS][cC]|[<]\/[sS][cC][rR]|[<]\/[sS][cC][rR][iI]|[<]\/[sS][cC][rR][iI][pP]|[<]\/[sS][cC][rR][iI][pP][tT]\s*)*)([<]\/[sS][cC][rR][iI][pP][tT]\s*[>]|$))|([<][sS][tT][yY][lL][eE](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([^<]|[<][^\/<]|[<]\/[^sS<]|[<]\/[sS][^tT<]|[<]\/[sS][tT][^yY<]|[<]\/[sS][tT][yY][^lL<]|[<]\/[sS][tT][yY][lL][^eE<]|[<]\/[sS][tT][yY][lL][eE][^\s><])*([<]|[<]\/|[<]\/[sS]|[<]\/[sS][tT]|[<]\/[sS][tT][yY]|[<]\/[sS][tT][yY][lL]|[<]\/[sS][tT][yY][lL][eE]\s*)*)([<]\/[sS][tT][yY][lL][eE]\s*[>]|$))|([<][tT][iI][tT][lL][eE](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([^<]|[<][^\/<]|[<]\/[^tT<]|[<]\/[tT][^iI<]|[<]\/[tT][iI][^tT<]|[<]\/[tT][iI][tT][^lL<]|[<]\/[tT][iI][tT][lL][^eE<]|[<]\/[tT][iI][tT][lL][eE][^\s><])*([<]|[<]\/|[<]\/[tT]|[<]\/[tT][iI]|[<]\/[tT][iI][tT]|[<]\/[tT][iI][tT][lL]|[<]\/[tT][iI][tT][lL][eE]\s*)*)([<]\/[tT][iI][tT][lL][eE]\s*[>]|$))|([<][tT][eE][xX][tT][aA][rR][eE][aA](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([^<]|[<][^\/<]|[<]\/[^tT<]|[<]\/[tT][^eE<]|[<]\/[tT][eE][^xX<]|[<]\/[tT][eE][xX][^tT<]|[<]\/[tT][eE][xX][tT][^aA<]|[<]\/[tT][eE][xX][tT][aA][^rR<]|[<]\/[tT][eE][xX][tT][aA][rR][^eE<]|[<]\/[tT][eE][xX][tT][aA][rR][eE][^aA<]|[<]\/[tT][eE][xX][tT][aA][rR][eE][aA][^\s><])*([<]|[<]\/|[<]\/[tT]|[<]\/[tT][eE]|[<]\/[tT][eE][xX]|[<]\/[tT][eE][xX][tT]|[<]\/[tT][eE][xX][tT][aA]|[<]\/[tT][eE][xX][tT][aA][rR]|[<]\/[tT][eE][xX][tT][aA][rR][eE]|[<]\/[tT][eE][xX][tT][aA][rR][eE][aA]\s*)*)([<]\/[tT][eE][xX][tT][aA][rR][eE][aA]\s*[>]|$))|([<][pP][lL][aA][iI][nN][tT][eE][xX][tT](\s([^>""'']|"[^""]*"|'[^'']*')*)?[>](([<]|[^<])*$))|([<]([^<>'""']|"[^""]*"|'[^'']*')*[>])/g;
    // like xhtml.valueAttr
    var _textFromHTML_valueAttr_re = /^[<]img(\s([^>""'']|"[^""]*"|'[^'']*')*)?\salt\s*=(\s*\'([^'']*)\'|\s*\"([^""]*)\"|([^''""\/\s>]*))([^>""'']|"[^""]*"|'[^'']*')*\/?[>]/gi;
    // like xhtml.breakAfter
    var _textFromHTML_breakAfter_re = /^[<]\/?(br|p|div|hr|h[1-5]|blockquote|address|table|tr|td|form|pre|xmp|listing|ol|ul|menu|dir|li|dl|dt|dd)(\s([^>""'']|"[^""]*"|'[^'']*')*)?\/?[>]/gi;
    // pseudo-HTML plain-text extractor
    textFromHTML = function(html) {
        html = re_utf8(html).replace(
            _textFromHTML_re,
            function (s,
                      comment, comment1, comment2, comment3,
                      cdata, cdata1, cdata2,
                      xmp, xmp1, xmp2, xmp3, xmp4, xmp5, xmp6,
                      listing, listing1, listing2, listing3, listing4, listing5, listing6,
                      script, script1, script2, script3, script4, script5, script6,
                      style, style1, style2, style3, style4, style5, style6,
                      title, title1, title2, title3, title4, title5, title6,
                      textarea, textarea1, textarea2, textarea3, textarea4, textarea5, textarea6,
                      plaintext, plaintext1, plaintext2, plaintext3, plaintext4,
                      tag, tag1) {
                if (comment || script || style || title || textarea)
                {
                    return '';
                }
                if (cdata)
                {
                    return escapeXML(cdata1 ? cdata1 : '');
                }
                if (xmp)
                {
                    return '\n' + escapeXML(xmp3 ? xmp3 : '') + '\n';
                }
                if (listing)
                {
                    return '\n' + escapeXML(listing3 ? listing3 : '') + '\n';
                }
                if (plaintext)
                {
                    return '\n' + escapeXML(plaintext3 ? plaintext3 : '') + '\n';
                }
                if (tag)
                {
                    var o = '';
                    s.replace(_textFromHTML_valueAttr_re,
                              function (s, g1, g2, g3, g4, g5, g6, g7) {
                                  o = ((g4 ? g4 : '') + (g5 ? g5 : '') + (g6 ? g6 : '')).split('<').join('&lt;').split('>').join('&gt;');
                                  return s;
                              });
                    s.replace(_textFromHTML_breakAfter_re,
                              function (s) {
                                  o = '\n';
                                  return s;
                              });
                    return o;
                }
                return s;
            });
        var tokens = html.match(/&([A-Za-z.0-9]+|#[0-9]+|#[xX][0-9a-fA-F]+);?|[^&]|./g);
        if (! tokens) tokens = [];
        for (var tokenNum = 0; tokenNum < tokens.length; tokenNum ++)
        {
            var token = tokens[tokenNum];
            if (token.substr(0, 2) == '&#')
            {
                var ord = 0xfffd;
                var e;
                try
                {
                    ord = xparseInt(token.replace(/^&#x0*([1-9a-f][0-9a-f]*|0);?$/i, '0x$1').replace(/^&#0*([1-9][0-9a-f]*|0);?$/i, '$1'));
                }
                catch (e)
                {
                }
                // characters not allowed in well-formed XML are
                // left as references
                if (((ord != 0x09)
                     &&
                     (ord != 0x0a)
                     &&
                     (ord != 0x0d)
                     &&
                     (ord < 0x20))
                    ||
                    ((ord >= 0xd800)
                     &&
                     (ord <= 0xdfff))
                    ||
                    (ord == 0xfffe)
                    ||
                    (ord == 0xffff)
                    ||
                    (ord > 0x10ffff)
                    ||
                    (! (ord >= 0x00)))
                {
                    continue;
                }
                token = re_utf8(unichr(ord));
            }
            else if (token.substr(0, 1) == '&')
            {
                var entity = token.replace(/^&([A-Za-z.0-9]+);?$/, '$1');
                if ((typeof(xhtml.entities[entity]) != 'undefined') &&
                    (xhtml.entities[entity] != null))
                {
                    token = re_utf8(xhtml.entities[entity]);
                }
            }
            tokens[tokenNum] = token;
        }
        return xml_unicode_filter(re_utf16(tokens.join('')));
    };
    var removeMarkup = function(xhtmlOrHTML, uri) {
        var text = xhtmlOrHTML;
        var e;
        try
        {
            text = getInnerText(dom_getElements(parseXHTML(xhtmlOrHTML, uri), 'body', namespaces.xhtml)[0]);
        }
        catch (e) {
            var ee;
            try
            {
                text = textFromHTML(xhtmlOrHTML);
            }
            catch (ee)
            {
            }
        }
        return text;
    };
    var _ws_re = new RegExp(
        // pattern
        re_cclass(ws_pat) + '+',
        // flags
        'g');
    var _surrounding_ws_re = new RegExp(
        // pattern
        '^' + re_cclass(ws_pat) + '+|' + re_cclass(ws_pat) + '+$',
        // flags
        'g');
    var singleLineTruncated = function(s) {
        s = s ? ('' + s) : '';
        s = xml_unicode_filter(s);
        s = re_utf16(re_utf8(s).replace(_ws_re, ' ').replace(_surrounding_ws_re, ''));
        var brk = MAXTXTSZ;
        if (s.substr(brk, 1)
            &&
            ((s.substr(brk, 1).charCodeAt(0) & 0xfc00) == 0xdc00))
        {
            // do not split a UTF-16 surrogate pair in two
            brk = brk - 1;
        }
        s = s.substr(0, brk);
        return s;
    };
    var textFromAtomElement = function(node) {
        var t = [];
        for (var child = node.firstChild; child; child = child.nextSibling)
        {
            if ((node.getAttribute("type") || "html").match(/^(xhtml|.*\/(.*[+])?xml)$/i))
            {
                var e;
                try
                {
                    var xs = null;
                    if (typeof(XPCNativeWrapper) == 'function')
                    {
                        xs = new XPCNativeWrapper(window, 'XMLSerializer()');
                    }
                    else if (typeof(window.XMLSerializer) != 'undefined')
                    {
                        xs = new window.XMLSerializer();
                    }
                    if (xs != null)
                    {
                        t[t.length] = xs.serializeToString(child);
                        continue;
                    }
                    else if (typeof (child.xml) != 'undefined')
                    {
                        t[t.length] = child.xml;
                        continue;
                    }
                    throw "No serializer";
                }
                catch (e)
                {
                    var ee;
                    try
                    {
                        t = [];
                        t[t.length] = escapeXML(getInnerText(node));
                        break;
                    }
                    catch (ee)
                    {
                    }
                }
            }
            if (child.nodeType == 3 || child.nodeType == 4)
            {
                t[t.length] = child.nodeValue;
            }
        }
        return t.join('');
    };
    var rssFromOPML = function(OPMLDOM, src) {
        var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
        var rss = dom_getDocumentElement(RSSDOM);
        var channel = dom_createElementRSS(RSSDOM, 'channel');
        rss.appendChild(channel);
        var opmlNS = dom_getDocumentElement(OPMLDOM).namespaceURI;
        for (var child = dom_getDocumentElement(OPMLDOM).firstChild; child; child = child.nextSibling)
        {
            if (child.nodeType == 1
                &&
                ((child.namespaceURI == opmlNS)
                 ||
                 ((! opmlNS)
                  &&
                  (child.namespaceURI == nullNS))))
            {
                if (dom_getLocalName(child) == 'head')
                {
                    var grandchildren = dom_getElements(child, 'title', opmlNS);
                    if (grandchildren && grandchildren.length)
                    {
                        var grandchild = grandchildren[0];
                        var title = dom_createElementRSS(RSSDOM, 'title');
                        dom_appendText(title, getInnerText(grandchild) || '');
                        channel.appendChild(title);
                    }
                }
                else if (dom_getLocalName(child) == 'body')
                {
                    var grandchildren = dom_getElements(child, 'outline', opmlNS);
                    for (var i = 0; i < grandchildren.length; i ++)
                    {
                        var grandchild = grandchildren[i];
                        if (grandchild.getAttribute('isComment') == 'true') continue;
                        var item = dom_createElementRSS(RSSDOM, 'item');
                        var text = grandchild.getAttribute('text');
                        var titleText = grandchild.getAttribute('title');
                        var href = grandchild.getAttribute('url') || grandchild.getAttribute('htmlUrl') || grandchild.getAttribute('xmlUrl');
                        if (text && ! href)
                        {
                            var eeph;
                            try
                            {
                                var anchors = dom_getElements(dom_getDocumentElement(parseXHTML(text, src)), 'a', namespaces.xhtml);
                                if (anchors.length == 1)
                                {
                                    href = anchors[0].href ? anchors[0].href : anchors[0].getAttribute('href');
                                }
                            }
                            catch (eeph)
                            {
                            }
                        }
                        if ((! titleText) || (! text))
                        {
                            for (var inners = grandchild.firstChild; inners; inners = inners.nextSibling)
                            {
                                if ((dom_getLocalName(inners) == 'outline')
                                    &&
                                    ((inners.namespaceURI == opmlNS)
                                     ||
                                     ((! opmlNS)
                                      &&
                                      (inners.namespaceURI == nullNS)))
                                    &&
                                    (inners.getAttribute('isComment') == 'true'))
                                {
                                    if (! titleText)
                                    {
                                        titleText = text;
                                    }
                                    text = inners.getAttribute('text');
                                    break;
                                }
                            }
                        }
                        if (titleText || text)
                        {
                            var prefix = '';
                            for (var parent = grandchild.parentNode; (parent && (parent != child)); parent = parent.parentNode)
                            {
                                if ((dom_getLocalName(parent) == 'outline')
                                    &&
                                    ((parent.namespaceURI == opmlNS)
                                     ||
                                     ((! opmlNS)
                                      &&
                                      (parent.namespaceURI == nullNS))))
                                {
                                    prefix = escapeXML(singleLineTruncated(removeMarkup(parent.getAttribute('title') || parent.getAttribute('text') || ''))) + '|' + prefix;
                                }
                            }
                            var title = dom_createElementRSS(RSSDOM, 'title');
                            dom_appendText(title, prefix + (titleText ? escapeXML(titleText) : text));
                            item.appendChild(title);
                            if (titleText && text)
                            {
                                var description = dom_createElementRSS(RSSDOM, 'description');
                                dom_appendText(description, text);
                                item.appendChild(description);
                            }
                        }
                        if (href)
                        {
                            var link = dom_createElementRSS(RSSDOM, 'link');
                            dom_appendText(link, href);
                            item.appendChild(link);
                        }
                        channel.appendChild(item);
                    }
                }
            }
        }
        return RSSDOM;
    };

    var rssFromRDF = function(RDFDOM, src) {
        var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
        var rss = dom_getDocumentElement(RSSDOM);
        var channel = dom_createElementRSS(RSSDOM, 'channel');
        rss.appendChild(channel);
        var RDF = dom_getDocumentElement(RDFDOM);
        var bioNS = namespaces.bio;
        var cc0NS = namespaces.cc0;
        var ccNS = namespaces.cc;
        var contentNS = namespaces.content;
        var dc0NS = namespaces.dc0;
        var dcNS = namespaces.dc;
        var ddcNS = namespaces.ddc;
        var doapNS = namespaces.doap;
        var feedburnerNS = namespaces.feedburner;
        var foafNS = namespaces.foaf;
        var labelNS = namespaces.label;
        var owlNS = namespaces.owl;
        var rdfNS = namespaces.rdf;
        var rdfsNS = namespaces.rdfs;
        var rss0NS = namespaces.rss0;
        var rssNS = namespaces.rss;
        var smwNS = namespaces.smw;
        var looksLikeRSS = (dom_getLocalName(RDF) == 'RDF');
        var promoteChannel = undef;
        var hasAnItem = false;
        var allnodes = dom_getElements(RDFDOM, '*', '*');
        for (var i = 0; i < allnodes.length; i ++)
        {
            var child = allnodes[i];
            if ((child.nodeType == 1)
                &&
                (child.namespaceURI == namespaces.atom)
                &&
                (dom_getLocalName(child) == 'link'))
            {
                if (re_utf8(child.getAttribute('rel')).split(_ws_re).join(' ').match(/(^| )self($| )/i))
                {
                    var link = dom_createElementAtom(RSSDOM, 'link');
                    if (link)
                    {
                        link.setAttribute('href', child.getAttribute('href'));
                        link.setAttribute('rel', 'self');
                        channel.appendChild(link);
                    }
                }
            }
            else if ((child.nodeType == 1)
                &&
                (((child.namespaceURI == foafNS)
                  &&
                  ((dom_getLocalName(child) == 'Person')
                   ||
                   (dom_getLocalName(child) == 'Agent')
                   ||
                   (dom_getLocalName(child) == 'Document')
                   ||
                   (dom_getLocalName(child) == 'Project')
                   ||
                   (dom_getLocalName(child) == 'Organization')
                   ||
                   (dom_getLocalName(child) == 'Group')))
                 ||
                 ((child.namespaceURI == rdfNS)
                  &&
                  (dom_getLocalName(child) == 'Description'))
                 ||
                 (((child.namespaceURI == rssNS)
                   ||
                   (child.namespaceURI == rss0NS)
                   ||
                   (child.namespaceURI == nullNS))
                  &&
                  ((dom_getLocalName(child) == 'channel')
                   ||
                   (dom_getLocalName(child) == 'item')))
                 ||
                 ((child.namespaceURI == smwNS)
                  &&
                  (dom_getLocalName(child) == 'Thing'))
                 ||
                 ((child.namespaceURI == labelNS)
                  &&
                  (dom_getLocalName(child) == 'ContentLabel'))
                 ||
                 ((child.namespaceURI == owlNS)
                  &&
                  (dom_getLocalName(child) == 'Class')
                  ||
                  (dom_getLocalName(child) == 'Ontology'))
                 ||
                 ((child.namespaceURI == doapNS)
                  &&
                  ((dom_getLocalName(child) == 'Project')
                   ||
                   (dom_getLocalName(child) == 'Version')))
                 ||
                 (((child.namespaceURI == ccNS)
                   ||
                   (child.namespaceURI == cc0NS))
                  &&
                  ((dom_getLocalName(child) == 'Work')
                   ||
                   (dom_getLocalName(child) == 'License')))
                 ||
                 (((child.namespaceURI == dcNS)
                   ||
                   (child.namespaceURI == dc0NS))
                  &&
                  ((dom_getLocalName(child) == 'Subject')
                   ||
                   (dom_getLocalName(child) == 'MESH')
                   ||
                   (dom_getLocalName(child) == 'Relation')))))
            {
                for (var pn = child.parentNode; pn; pn = pn.parentNode)
                {
                    if ((pn.nodeType == 1)
                        &&
                        ((pn.namespaceURI == rssNS)
                         ||
                         (pn.namespaceURI == rss0NS)
                         ||
                         (pn.namespaceURI == nullNS))
                        &&
                        (dom_getLocalName(pn) == 'item'))
                    {
                        break;
                    }
                }
                if (pn) continue;
                if (dom_getLocalName(child) == 'Class')
                {
                    for (var grandchild = child.firstChild; grandchild; grandchild = grandchild.nextSibling)
                    {
                        if ((grandchild.nodeType == 1)
                            &&
                            ((grandchild.namespaceURI != rdfsNS)
                             ||
                             (dom_getLocalName(grandchild) != 'isDefinedBy')))
                        {
                            break;
                        }
                    }
                    if (! grandchild) continue;
                }
                var slink = undef;
                var alt_slink = (dom_getAttribute(child, 'about', rdfNS)
                                 ||
                                 dom_getAttribute(child, 'about', undef)
                                 ||
                                 dom_getAttribute(child, 'resource', rdfNS)
                                 ||
                                 dom_getAttribute(child, 'resource', undef));
                var alt_slink2 = undef;
                var stitle_override = undef;
                var stitle = (dom_getAttribute(child, 'Title', dcNS)
                              ||
                              dom_getAttribute(child, 'title', dcNS)
                              ||
                              dom_getAttribute(child, 'Title', dc0NS)
                              ||
                              dom_getAttribute(child, 'title', dc0NS));
                var alt_stitle = dom_getAttribute(child, 'Heading', ddcNS);
                var sdesc_append = undef;
                var sdesc = (dom_getAttribute(child, 'Description', dcNS)
                             ||
                             dom_getAttribute(child, 'Description', dc0NS)
                             ||
                             dom_getAttribute(child, 'description', dcNS)
                             ||
                             dom_getAttribute(child, 'description', dc0NS));
                var item = dom_createElementRSS(RSSDOM, 'item');
                if (looksLikeRSS
                    &&
                    (dom_getLocalName(child) == 'channel'))
                {
                    if (promoteChannel != undef)
                    {
                        looksLikeRSS = false;
                    }
                    else
                    {
                        promoteChannel = item;
                    }
                }
                else if (looksLikeRSS
                         &&
                         (dom_getLocalName(child) == 'item'))
                {
                    hasAnItem = true;
                }
                if ((dom_getLocalName(child) == 'Subject')
                    &&
                    (child.parentNode == RDF))
                {
                    channel.insertBefore(item, channel.firstChild)
                }
                else
                {
                    channel.appendChild(item);
                }
                for (var grandchild = child.firstChild; grandchild; grandchild = grandchild.nextSibling)
                {
                    if ((grandchild.nodeType == 1)
                        &&
                        (grandchild.namespaceURI == rdfNS)
                        &&
                        ((dom_getLocalName(grandchild) == 'Seq')
                         ||
                         (dom_getLocalName(grandchild) == 'Bag')))
                    {
                        var lis = [];
                        for (var li = grandchild.firstChild; li; li = li.nextSibling)
                        {
                            if ((li.nodeType == 1)
                                &&
                                (li.namespaceURI == rdfNS)
                                &&
                                (dom_getLocalName(li) == 'li'))
                            {
                                lis[lis.length] = dom_getNodeValue(li);
                            }
                        }
                        alt_stitle = alt_stitle ? alt_stitle : (lis.length ? lis.join('\n/\n') : alt_stitle);
                    }
                    else if ((grandchild.nodeType == 1)
                        &&
                        ((((grandchild.namespaceURI == dcNS)
                           ||
                           (grandchild.namespaceURI == dc0NS))
                          &&
                          ((dom_getLocalName(grandchild) == 'title')
                           ||
                           (dom_getLocalName(grandchild) == 'Title')
                           ||
                           (dom_getLocalName(grandchild) == 'subject')
                           ||
                           (dom_getLocalName(grandchild) == 'Subject')))
                         ||
                         ((grandchild.namespaceURI == rdfsNS)
                          &&
                          (dom_getLocalName(grandchild) == 'label'))
                         ||
                         (((grandchild.namespaceURI == rssNS)
                           ||
                           (grandchild.namespaceURI == rss0NS)
                           ||
                           (grandchild.namespaceURI == nullNS))
                          &&
                          (dom_getLocalName(grandchild) == 'title'))
                         ||
                         (((grandchild.namespaceURI == foafNS)
                           ||
                           (grandchild.namespaceURI == doapNS))
                          &&
                          (dom_getLocalName(grandchild) == 'name'))
                         ||
                         ((grandchild.namespaceURI == doapNS)
                          &&
                          (dom_getLocalName(grandchild) == 'revision'))
                         ||
                         ((grandchild.namespaceURI == foafNS)
                          &&
                          (dom_getLocalName(grandchild) == 'nick'))))
                    {
                        if ((dom_getLocalName(grandchild) == 'nick')
                            ||
                            (dom_getLocalName(grandchild) == 'subject')
                            ||
                            (dom_getLocalName(grandchild) == 'Subject')
                            ||
                            (dom_getLocalName(grandchild) == 'revision'))
                        {
                            alt_stitle = alt_stitle ? alt_stitle : dom_getNodeValue(grandchild);
                        }
                        else if (dom_getLocalName(grandchild) == 'label')
                        {
                            stitle_override = stitle_override ? stitle_override : dom_getNodeValue(grandchild);
                        }
                        else
                        {
                            stitle = stitle ? stitle : dom_getNodeValue(grandchild);
                            if (((grandchild.namespaceURI == rssNS)
                                 ||
                                 (grandchild.namespaceURI == nullNS))
                                &&
                                (dom_getLocalName(grandchild) == 'title'))
                            {
                                stitle = stitle ? removeMarkup(stitle) : stitle;
                            }
                        }
                    }
                    else if ((grandchild.nodeType == 1)
                             &&
                             ((((grandchild.namespaceURI == dcNS)
                                ||
                                (grandchild.namespaceURI == dc0NS)
                                ||
                                (grandchild.namespaceURI == rssNS)
                                ||
                                (grandchild.namespaceURI == rss0NS)
                                ||
                                (grandchild.namespaceURI == nullNS)
                                ||
                                (grandchild.namespaceURI == doapNS))
                               &&
                               ((dom_getLocalName(grandchild) == 'description')
                                ||
                                (dom_getLocalName(grandchild) == 'Description')))
                              ||
                              ((grandchild.namespaceURI == bioNS)
                               &&
                               (dom_getLocalName(grandchild) == 'olb'))
                              ||
                              ((grandchild.namespaceURI == rdfsNS)
                               &&
                               (dom_getLocalName(grandchild) == 'comment'))
                              ||
                              ((dom_getLocalName(grandchild) == 'Has_quote')
                               &&
                               (child.namespaceURI == smwNS)
                               &&
                               (dom_getAttribute(grandchild, 'datatype', rdfNS) == (namespaces.xs + 'string')))
                              ||
                              ((grandchild.namespaceURI == doapNS)
                               &&
                               (dom_getLocalName(grandchild) == 'shortdesc'))))
                    {
                        if (dom_getLocalName(grandchild) == 'comment')
                        {
                            sdesc_append = (sdesc_append ? (sdesc_append + '\n/\n') : '') + dom_getNodeValue(grandchild);
                        }
                        else
                        {
                            sdesc = sdesc ? sdesc : dom_getNodeValue(grandchild);
                            if (((grandchild.namespaceURI == rssNS)
                                 ||
                                 (grandchild.namespaceURI == nullNS)
                                 ||
                                 (grandchild.namespaceURI == dcNS)
                                 ||
                                 (grandchild.namespaceURI == dc0NS))
                                &&
                                (dom_getLocalName(grandchild) == 'description'))
                            {
                                sdesc = sdesc ? removeMarkup(sdesc) : sdesc;
                            }
                        }
                    }
                    else if ((grandchild.nodeType == 1)
                             &&
                             (((grandchild.namespaceURI == rdfsNS)
                               &&
                               (dom_getLocalName(grandchild) == 'seeAlso'))
                              ||
                              (((grandchild.namespaceURI == rssNS)
                                ||
                                (grandchild.namespaceURI == nullNS)
                                ||
                                (grandchild.namespaceURI == rss0NS))
                               &&
                               (dom_getLocalName(grandchild) == 'link'))
                              ||
                              ((grandchild.namespaceURI == smwNS)
                               &&
                               (dom_getLocalName(grandchild) == 'hasArticle'))
                              ||
                              ((grandchild.namespaceURI == doapNS)
                               &&
                               ((dom_getLocalName(grandchild) == 'homepage')
                                ||
                                (dom_getLocalName(grandchild) == 'old-homepage')
                                ||
                                (dom_getLocalName(grandchild) == 'file-release')))
                              ||
                              ((grandchild.namespaceURI == foafNS)
                               &&
                               ((dom_getLocalName(grandchild) == 'homepage')
                                ||
                                (dom_getLocalName(grandchild) == 'mbox')
                                ||
                                (dom_getLocalName(grandchild) == 'workInfoHomepage')
                                ||
                                (dom_getLocalName(grandchild) == 'weblog')))))
                    {
                        if ((dom_getLocalName(grandchild) == 'mbox')
                            ||
                            (dom_getLocalName(grandchild) == 'old-homepage')
                            ||
                            (dom_getLocalName(grandchild) == 'file-release'))
                        {
                            alt_slink2 = alt_slink2 ? alt_slink2 : dom_getAttribute(grandchild, 'resource', rdfNS);
                        }
                        else if (dom_getLocalName(grandchild) == 'seeAlso')
                        {
                            alt_slink = alt_slink ? alt_slink : dom_getAttribute(grandchild, 'resource', rdfNS);
                        }
                        else
                        {
                            slink = slink ? slink : ((dom_getLocalName(grandchild) == 'link') ? dom_getNodeValue(grandchild) : dom_getAttribute(grandchild, 'resource', rdfNS));
                        }
                    }
                    else if ((grandchild.nodeType == 1)
                             &&
                             (grandchild.namespaceURI == feedburnerNS)
                             &&
                             (dom_getLocalName(grandchild) == 'origLink'))
                    {
                        var origLink = dom_createElementFeedburner(RSSDOM, 'origLink');
                        if (origLink)
                        {
                            dom_appendText(origLink, dom_getNodeValue(grandchild));
                            item.appendChild(origLink);
                        }
                    }
                    else if ((grandchild.nodeType == 1)
                             &&
                             (grandchild.namespaceURI == contentNS)
                             &&
                             (dom_getLocalName(grandchild) == 'encoded'))
                    {
                        var contentEncoded = dom_createElementContent(RSSDOM, 'encoded');
                        if (contentEncoded)
                        {
                            dom_appendText(contentEncoded, dom_getNodeValue(grandchild));
                            item.appendChild(contentEncoded);
                        }
                    }
                }
                alt_slink = alt_slink ? alt_slink : alt_slink2;
                stitle = stitle_override ? stitle_override : stitle;
                stitle = stitle ? stitle : alt_stitle;
                stitle = stitle ? stitle : alt_slink;
                if (((child.namespaceURI == ccNS)
                     ||
                     (child.namespaceURI == cc0NS))
                    &&
                    (stitle == undef))
                {
                    stitle = 'cc:' + dom_getLocalName(child);
                }
                if (stitle != undef)
                {
                    var title = dom_createElementRSS(RSSDOM, 'title');
                    dom_appendText(title, escapeXML(stitle));
                    if ((item.firstChild)
                        &&
                        (item.firstChild.nodeType == 1)
                        &&
                        (item.firstChild.namespaceURI == item.namespaceURI)
                        &&
                        (dom_getLocalName(item.firstChild) == 'title'))
                    {
                        item.appendChild(title);
                    }
                    else
                    {
                        item.insertBefore(title, item.firstChild);
                    }
                }
                slink = slink ? slink : alt_slink;
                if (slink != undef)
                {
                    var link = dom_createElementRSS(RSSDOM, 'link');
                    dom_appendText(link, slink);
                    item.appendChild(link);
                }
                sdesc = sdesc ? (sdesc + (sdesc_append ? ('\n/\n' + sdesc_append) : '')) : sdesc_append;
                if (sdesc != undef)
                {
                    var description = dom_createElementRSS(RSSDOM, 'description');
                    dom_appendText(description, escapeXML(sdesc));
                    item.appendChild(description);
                }
            }
        }
        if (looksLikeRSS && promoteChannel && hasAnItem)
        {
            var cursor = channel.firstChild;
            for (var child = promoteChannel.firstChild; child; child = child.nextSibling)
            {
                var childClone = child.cloneNode(true);
                child.parentNode.removeChild(child);
                channel.insertBefore(childClone, cursor);
            }
            promoteChannel.parentNode.removeChild(promoteChannel);
        }
        return RSSDOM;
    };
    var rssFromAtom = function(ATOMDOM, src) {
        var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
        var rss = dom_getDocumentElement(RSSDOM);
        var channel = dom_createElementRSS(RSSDOM, 'channel');
        rss.appendChild(channel);
        var atomNS = dom_getDocumentElement(ATOMDOM).namespaceURI;
        var feedburnerNS = namespaces.feedburner;
        for (var child = dom_getDocumentElement(ATOMDOM).firstChild; child; child = child.nextSibling)
        {
            if (child.nodeType == 1 && child.namespaceURI == atomNS)
            {
                if (dom_getLocalName(child) == 'title')
                {
                    var title = dom_createElementRSS(RSSDOM, 'title');
                    dom_appendText(title, textFromAtomElement(child));
                    channel.appendChild(title);
                }
                else if (dom_getLocalName(child) == 'link')
                {
                    if (re_utf8(child.getAttribute('rel')).split(_ws_re).join(' ').match(/(^| )self($| )/i))
                    {
                        var link = dom_createElementAtom(RSSDOM, 'link');
                        if (link)
                        {
                            link.setAttribute('href', child.getAttribute('href'));
                            link.setAttribute('rel', 'self');
                            channel.appendChild(link);
                        }
                    }
                }
                else if (dom_getLocalName(child) == 'entry')
                {
                    var item = dom_createElementRSS(RSSDOM, 'item');
                    for (var grandchild = child.firstChild; grandchild; grandchild = grandchild.nextSibling)
                    {
                        if (grandchild.nodeType == 1 && grandchild.namespaceURI == atomNS)
                        {
                            if (dom_getLocalName(grandchild) == 'title')
                            {
                                var title = dom_createElementRSS(RSSDOM, 'title');
                                dom_appendText(title, textFromAtomElement(grandchild));
                                item.appendChild(title);
                            }
                            else if (dom_getLocalName(grandchild) == 'content')
                            {
                                var description = dom_createElementRSS(RSSDOM, 'description');
                                dom_appendText(description, textFromAtomElement(grandchild));
                                item.insertBefore(description, item.firstChild);
                            }
                            else if (dom_getLocalName(grandchild) == 'summary')
                            {
                                var description = dom_createElementRSS(RSSDOM, 'description');
                                dom_appendText(description, textFromAtomElement(grandchild));
                                item.appendChild(description);
                            }
                            else if (dom_getLocalName(grandchild) == 'link')
                            {
                                if (re_utf8(grandchild.getAttribute('rel') || 'alternate').split(_ws_re).join(' ').match(/(^| )alternate($| )/i))
                                {
                                    var link = dom_createElementRSS(RSSDOM, 'link');
                                    dom_appendText(link, grandchild.getAttribute('href'));
                                    item.appendChild(link);
                                }
                                if (re_utf8(grandchild.getAttribute('rel') || 'alternate').split(_ws_re).join(' ').match(/(^| )enclosure($| )/i))
                                {
                                    var enclosure = dom_createElementRSS(RSSDOM, 'enclosure');
                                    enclosure.setAttribute('url', grandchild.getAttribute('href'));
                                    item.appendChild(enclosure);
                                }
                            }
                        }
                        else if ((grandchild.nodeType == 1)
                                 &&
                                 (grandchild.namespaceURI == feedburnerNS)
                                 &&
                                 (dom_getLocalName(grandchild) == 'origLink'))
                        {
                            var origLink = dom_createElementFeedburner(RSSDOM, 'origLink');
                            if (origLink)
                            {
                                dom_appendText(origLink, dom_getNodeValue(grandchild));
                                item.appendChild(origLink);
                            }
                        }
                    }
                    channel.appendChild(item);
                }
            }
        }
        return RSSDOM;
    };
    // extract hAtom 0.1 feed(s) from HTML/XHTML DOM
    // http://microformats.org/wiki/hatom
    var dom_getInlineFeeds = function(DOM, src) {
        var documentElement = dom_getDocumentElement(DOM);
        if (! documentElement)
        {
            return null;
        }
        var htmlNS = documentElement.namespaceURI;
        var smashCaseXHTML = function(s) { return s; };
        var smashCaseHTML = function(s) { return s ? s.toLowerCase() : s; };
        if (! {'html':true}[(documentElement.namespaceURI ? smashCaseXHTML : smashCaseHTML)(dom_getLocalName(documentElement))])
        {
            return null;
        }
        var body = documentElement.body;
        if (! body)
        {
            var bodies = dom_getElements(documentElement, 'body', htmlNS);
            if (bodies.length)
            {
                body = bodies[0];
            }
            else
            {
                body = documentElement;
            }
        }
        var head = null;
        var heads = dom_getElements(documentElement, 'head', htmlNS);
        if (heads.length)
        {
            head = heads[0];
        }
        var feeds = [];
        var txthead = function(elt)
        {
            for (var child = elt.firstChild; child; child = child.nextSibling)
            {
                var eeth;
                try
                {
                    if (child.nodeType == 1)
                    {
                        return txthead(child);
                    }
                    if ((child.nodeType == 3)
                        ||
                        (child.nodeType == 4))
                    {
                        if (child.nodeValue)
                        {
                            return child.nodeValue;
                        }
                    }
                }
                catch (eeth)
                {
                }
            }
            return '';
        };
        var lirsParse = function(elt)
        {
            if (('\n' + txthead(elt)).indexOf('\nLIRS,') == -1) return false;
            var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
            var feed = {
                'dom': RSSDOM,
                'src': location_minusFragment(src),
                'format': 'LIRS',
                'carrier': 'text',
                'found': false
            };
            var rss = dom_getDocumentElement(feed.dom);
            channel = dom_createElementRSS(feed.dom, 'channel');
            rss.appendChild(channel);
            feeds[feeds.length] = feed;
            var titleNode = dom_createElementRSS(feed.dom, 'title');
            channel.appendChild(titleNode);
            dom_appendText(titleNode, '');
            var iht = getInnerText(elt);
            if (iht
                &&
                (('\n' + iht).indexOf('\nLIRS,') != -1))
            {
                /* looks like LIRS */
                var lirs_items = iht.split('\r\n').join('\n').split('\r').join('\n').split('\n');
                for (var hii = 0; hii < lirs_items.length; hii ++)
                {
                    var lirs_item = lirs_items[hii];
                    if (lirs_item)
                    {
                        if (lirs_item.indexOf('#') == 0) continue;
                        if (lirs_item.indexOf('LIRS,') == 0)
                        {
                            var _lirs_re = /^LIRS,(?:(?:[^\\,]|\\.)*,){4,4}((?:[^\\,]|\\.)*)(?:,((?:[^\\,]|\\.)*))/;
                            var m = re_utf8(lirs_item).match(_lirs_re);
                            if (m)
                            {
                                feed.found = true;
                                var itemNode = dom_createElementRSS(feed.dom, 'item');
                                if (m[2])
                                {
                                    var titleNode = dom_createElementRSS(feed.dom, 'title');
                                    itemNode.appendChild(titleNode);
                                    dom_appendText(titleNode, escapeXML(re_utf16(m[2].replace(/\\./g, '$1'))));
                                }
                                if (m[1])
                                {
                                    var link = dom_createElementRSS(feed.dom, 'link');
                                    var url = new URL(re_utf16(m[1].replace(/\\./g, '$1')), location_minusFragment(src));
                                    url = url.toString();
                                    dom_appendText(link, url);
                                    itemNode.appendChild(link);
                                }
                                channel.appendChild(itemNode);
                            }
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            return feed.found;
        };
        var hinaParse = function(elt)
        {
            if (txthead(elt).indexOf('<' + '!--HINA_') != 0) return false;
            var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
            var feed = {
                'dom': RSSDOM,
                'src': location_minusFragment(src),
                'format': 'hina',
                'carrier': 'text',
                'found': false
            };
            var rss = dom_getDocumentElement(feed.dom);
            channel = dom_createElementRSS(feed.dom, 'channel');
            rss.appendChild(channel);
            feeds[feeds.length] = feed;
            var titleNode = dom_createElementRSS(feed.dom, 'title');
            channel.appendChild(titleNode);
            dom_appendText(titleNode, '');
            var iht = getInnerText(elt);
            if (iht
                &&
                (iht.indexOf('<' + '!--HINA_') == 0))
            {
                /* looks like hina.txt */
                var hina_items = iht.split('\r\n').join('\n').split('\r').join('\n').split('\n');
                for (var hii = 0; hii < hina_items.length; hii ++)
                {
                    var hina_item = hina_items[hii];
                    if (hina_item)
                    {
                        if (hina_item.indexOf('<' + '!--HINA_') == 0)
                        {
                            var _hina_re = /^[<]!--HINA_(?:[^-]|-[^-])*-+->([<][Aa] [Hh][Rr][Ee][Ff]=(?:\"([^\"]*)\"|\'([^\']*)\')>([^<]*)[<]\/[Aa]>)?(?: *\/ +)?(.*)$/;
                            var m = re_utf8(hina_item).match(_hina_re);
                            if (m)
                            {
                                feed.found = true;
                                var itemNode = dom_createElementRSS(feed.dom, 'item');
                                if (m[4])
                                {
                                    var titleNode = dom_createElementRSS(feed.dom, 'title');
                                    itemNode.appendChild(titleNode);
                                    dom_appendText(titleNode, re_utf16(m[4]));
                                }
                                if (m[1])
                                {
                                    var link = dom_createElementRSS(feed.dom, 'link');
                                    var url = new URL(re_utf16(m[2] ? m[2] : (m[3] ? m[3] : '')), location_minusFragment(src));
                                    url = url.toString();
                                    dom_appendText(link, url);
                                    itemNode.appendChild(link);
                                }
                                channel.appendChild(itemNode);
                            }
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            return feed.found;
        };
        var hinaDiParse = function(elt)
        {
            if ((txthead(elt).indexOf('HINA/2.') != 0) && (txthead(elt).split('\r\n').join('\n').split('\r').join('\n').toUpperCase().indexOf('\n\nURL:') <= 0)) return false;
            var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
            var feed = {
                'dom': RSSDOM,
                'src': location_minusFragment(src),
                'format': 'hina-di',
                'carrier': 'text',
                'found': false
            };
            var rss = dom_getDocumentElement(feed.dom);
            channel = dom_createElementRSS(feed.dom, 'channel');
            rss.appendChild(channel);
            feeds[feeds.length] = feed;
            var titleNode = dom_createElementRSS(feed.dom, 'title');
            channel.appendChild(titleNode);
            dom_appendText(titleNode, '');
            var iht = getInnerText(elt);
            /* looks like hina.di */
            var hinaDi_items = iht.split('\r\n').join('\n').split('\r').join('\n').split('\n\n');
            for (var hii = 1; hii < hinaDi_items.length; hii ++)
            {
                var hinaDi_item = hinaDi_items[hii];
                if (hinaDi_item.split('\n').join(''))
                {
                    var itemNode = dom_createElementRSS(feed.dom, 'item');
                    var hinaDi_lines = hinaDi_item.split('\n');
                    var hinaDi = {};
                    for (var hili = 0; hili < hinaDi_lines.length; hili ++)
                    {
                        var hinaDi_line = hinaDi_lines[hili];
                        var cl = hinaDi_line.indexOf(':');
                        if (cl == -1) return false;
                        var hname = hinaDi_line.substr(0, cl).toLowerCase().replace(/-[a-z]/g, function (mm) { return ('' + mm).substr(1).toUpperCase(); }).replace(/-/g, '_');
                        var hvalue = re_utf16(re_utf8(hinaDi_line.substr(cl + 1)).replace(_leading_ws_re, ''));
                        hinaDi[hname] = hvalue;
                    }
                    if (defined(hinaDi.url))
                    {
                        feed.found = true;
                        var link = dom_createElementRSS(feed.dom, 'link');
                        var url = new URL(hinaDi.url, location_minusFragment(src));
                        url = url.toString();
                        dom_appendText(link, url);
                        itemNode.appendChild(link);
                    }
                    else
                    {
                        return false;
                    }
                    if (defined(hinaDi.xWdbTitle))
                    {
                        var titleNode = dom_createElementRSS(feed.dom, 'title');
                        itemNode.appendChild(titleNode);
                        dom_appendText(titleNode, hinaDi.xWdbTitle);
                    }
                    else if (defined(hinaDi.xTsaTitle))
                    {
                        var titleNode = dom_createElementRSS(feed.dom, 'title');
                        itemNode.appendChild(titleNode);
                        dom_appendText(titleNode, hinaDi.xTsaTitle);
                    }
                    else if (defined(hinaDi.title))
                    {
                        var titleNode = dom_createElementRSS(feed.dom, 'title');
                        itemNode.appendChild(titleNode);
                        dom_appendText(titleNode, hinaDi.title);
                    }
                    channel.appendChild(itemNode);
                }
            }
            return feed.found;
        };
        var hAtomParse = function(elt, feed, channel, item)
        {
            var found = 0;
            if (elt.nodeType == 1)
            {
                var classDict = {};
                var relDict = {};
                var tagName = null;
                var href = null;
                var smashCase = elt.namespaceURI ? smashCaseXHTML : smashCaseHTML;
                if ((! elt.namespaceURI)
                    ||
                    (elt.namespaceURI == namespaces.xhtml)
                    ||
                    (elt.namespaceURI == htmlNS))
                {
                    tagName = smashCase(dom_getLocalName(elt));
                    var classList = re_utf8(smashCase(elt.className ? elt.className : elt.getAttribute('class')) || '').split(_ws_re);
                    var relList = re_utf8(smashCase(elt.getAttribute('rel')) || '').split(_ws_re);
                    for (var i = 0; i < classList.length; i ++)
                    {
                        classDict[classList[i]] = true;
                    }
                    if (tagName == 'a')
                    {
                        href = elt.href ? elt.href : elt.getAttribute('href');
                        if (bugAttributesUndecodedInXHTML && htmlNS)
                        {
                            // XXX opera leaves entities undecoded in XHTML attributes
                            href = textFromHTML('<' + 'span>' + href + '<' + '/span>');
                        }
                        if (href != null)
                        {
                            for (var i = 0; i < relList.length; i ++)
                            {
                                relDict[relList[i]] = true;
                            }
                        }
                    }
                }
                if ((! feed) || (! channel) || classDict['hfeed'])
                {
                    var fragment = '';
                    if (classDict['hfeed'] && elt.getAttribute('id'))
                    {
                        fragment = '#' + elt.getAttribute('id');
                    }
                    var RSSDOM = parseXML('<' + 'rss>' + '<' + '/rss>');
                    feed = {
                        'dom': RSSDOM,
                        'src': location_minusFragment(src) + fragment,
                        'format': 'hAtom',
                        'carrier': htmlNS ? 'XHTML' : 'HTML',
                        'hasTitle': false,
                        'found': false
                    };
                    var rss = dom_getDocumentElement(feed.dom);
                    channel = dom_createElementRSS(feed.dom, 'channel');
                    rss.appendChild(channel);
                    var title = dom_createElementRSS(feed.dom, 'title');
                    var it = head ? escapeXML(dom_getFirstNodeValue(head, 'title')) : '';
                    it = it ? it : (DOM['title'] ? DOM['title'] : '');
                    dom_appendText(title, it);
                    channel.appendChild(title);
                    feeds[feeds.length] = feed;
                }
                if (classDict['hentry'] || classDict['hfeed'])
                {
                    found = found + 1;
                    feed.found = true;
                }
                if (classDict['hentry'])
                {
                    var itemNode = dom_createElementRSS(feed.dom, 'item');
                    var contentNode = dom_createElementRSS(feed.dom, 'description');
                    itemNode.appendChild(contentNode);
                    item = {
                        'node': itemNode,
                        'hasTitle': false,
                        'summary': null,
                        'content': contentNode,
                        'hasPermaLink': false
                    };
                    channel.appendChild(item.node);
                    var fragment = '';
                    if (elt.getAttribute('id'))
                    {
                        fragment = '#' + elt.getAttribute('id');
                    }
                    var link = dom_createElementRSS(feed.dom, 'link');
                    dom_appendText(link, location_minusFragment(src) + fragment);
                    item.node.appendChild(link);
                }
                // XXX feed-title is a non-standard extension to hAtom 0.1
                if (classDict['feed-title'] && ! feed.hasTitle)
                {
                    var title = dom_createElementRSS(feed.dom, 'title');
                    var it = escapeXML(getInnerText(elt));
                    dom_appendText(title, it);
                    channel.insertBefore(title, channel.firstChild);
                    feed.hasTitle = true;
                }
                if (item)
                {
                    if (classDict['entry-title'] && ! item.hasTitle)
                    {
                        var title = dom_createElementRSS(feed.dom, 'title');
                        var it = escapeXML(getInnerText(elt));
                        dom_appendText(title, it);
                        item.node.insertBefore(title, item.node.firstChild);
                        item.hasTitle = true;
                    }
                    else if (tagName && tagName.match(/^h[1-5]$/) && ! item.hasTitle)
                    {
                        var title = dom_createElementRSS(feed.dom, 'title');
                        var it = escapeXML(getInnerText(elt));
                        dom_appendText(title, it);
                        item.node.appendChild(title);
                    }
                    if (classDict['entry-content'])
                    {
                        var it = escapeXML(getInnerText(elt));
                        dom_appendText(item.content, '<' + 'div>' + it + '<' + '/div>');
                    }
                    if (classDict['entry-summary'])
                    {
                        if (! item.summary)
                        {
                            var summaryNode = dom_createElementRSS(feed.dom, 'description');
                            item.node.appendChild(summaryNode);
                            item.summary = summaryNode;
                        }
                        var it = escapeXML(getInnerText(elt));
                        dom_appendText(item.summary, '<' + 'div>' + it + '<' + '/div>');
                    }
                    if (relDict['bookmark'] && ! item.hasPermaLink)
                    {
                        var link = dom_createElementRSS(feed.dom, 'link');
                        dom_appendText(link, href);
                        item.node.insertBefore(link, item.node.firstChild);
                        item.hasPermaLink = true;
                    }
                    if (relDict['enclosure'])
                    {
                        var enclosure = dom_createElementRSS(feed.dom, 'enclosure');
                        enclosure.setAttribute('url', href);
                        item.node.appendChild(enclosure);
                    }
                }
                if ((! item)
                    ||
                    (! ({'q': true, 'blockquote': true})[tagName]))
                {
                    for (var child = elt.firstChild; child; child = child.nextSibling)
                    {
                        var eec;
                        try
                        {
                            found = found + hAtomParse(child, feed, channel, item);
                        }
                        catch (eec)
                        {
                        }
                    }
                }
                if (classDict['hentry'] && item)
                {
                    if (! item.hasTitle)
                    {
                        var title = dom_createElementRSS(feed.dom, 'title');
                        var it = head ? escapeXML(dom_getFirstNodeValue(head, 'title')) : '';
                        dom_appendText(title, it);
                        item.node.appendChild(title);
                    }
                    if (! item.content.firstChild)
                    {
                        item.content.parentNode.removeChild(item.content);
                        item.content = null;
                    }
                }
            }
            return found;
        };
        if (hAtomParse(body) || hinaParse(body) || hinaDiParse(body) || lirsParse(body))
        {
            var ofeeds = [];
            for (var i = 0; i < feeds.length; i ++)
            {
                if (feeds[i].found)
                {
                    ofeeds[ofeeds.length] = feeds[i];
                }
            }
            return ofeeds;
        }
        return null;
    };
    var dom_getContentType = function(DOM) {
        if (typeof(DOM.contentType) != 'undefined')
        {
            return DOM.contentType;
        }
    };
    // actually a forward declaration, unless something explodes
    // between here and the self test code
    var test = function () {};
    var rss_render = function(DOM, src, sharedState, format, carrier) {
        format = format ? format : 'RSS';
        carrier = carrier ? carrier : 'XML';
        if (sharedState == null)
        {
            sharedState = {
                'location': get_location(),
                'feeds': { }
            };
            sharedState['feeds'][src] = true;
        }
        if (sharedState['bodies'] == null)
        {
            sharedState['bodies'] = [];
        }
        if (sharedState['linkies'] == null)
        {
            sharedState['linkies'] = {};
        }
        var legit = sharedState['feeds'][src];
        var usesFilters = false;
        var eeuf;
        try
        {
            if (typeof(window.document.body.style.filter) == 'string')
            {
                usesFilters = true;
            }
        }
        catch(eeuf)
        {
        }
        if ((dom_getContentType(DOM) == 'application/atom+xml')
            ||
            (dom_getLocalName(dom_getDocumentElement(DOM)) == 'feed'))
        {
            DOM = rssFromAtom(DOM, src);
            format = "Atom";
            legit = true;
        }
        else if ((dom_getContentType(DOM) == 'application/rdf+xml')
                 ||
                 (dom_getLocalName(dom_getDocumentElement(DOM)) == 'RDF')
                 ||
                 (dom_getDocumentElement(DOM).namespaceURI == namespaces.rdf))
        {
            DOM = rssFromRDF(DOM, src);
            format = "RDF";
            legit = true;
        }
        else if (dom_getDocumentElement(DOM).namespaceURI == namespaces.doap)
        {
            DOM = rssFromRDF(DOM, src);
            format = "DOAP";
            legit = true;
        }
        else if (dom_getDocumentElement(DOM).namespaceURI == namespaces.foaf)
        {
            DOM = rssFromRDF(DOM, src);
            format = "FOAF";
            legit = true;
        }
        else if ((dom_getContentType(DOM) == 'text/x-opml')
                 ||
                 (dom_getContentType(DOM) == 'text/xml+opml')
                 ||
                 (dom_getLocalName(dom_getDocumentElement(DOM)) == 'opml'))
        {
            DOM = rssFromOPML(DOM, src);
            format = "OPML";
            legit = true;
        }
        else if ({'HTML': true, 'html': true}[dom_getLocalName(dom_getDocumentElement(DOM))])
        {
            var ifeeds = dom_getInlineFeeds(window.document, get_location());
            if (ifeeds)
            {
                for (var i = 0; i < ifeeds.length; i ++)
                {
                    var ifeed = ifeeds[i];
                    rss_render(ifeed.dom, ifeed.src, sharedState, ifeed.format, ifeed.carrier);
                }
            }
            return;
        }
        else
        {
            legit = true;
        }
        if (! legit)
        {
            return;
        }
        var box = null;
        var ebox;
        try
        {
            if (box == null)
            {
                if ((sharedState['box'] != null) &&
                    (sharedState['box'].parentNode))
                {
                    box = sharedState['box'];
                    for (var pn = box.parentNode; pn; pn = pn.parentNode)
                    {
                        if (pn == dom_getDocumentElement(window.document)) break;
                    }
                    if (! pn)
                    {
                        box = null;
                        sharedState['box'] = null;
                        sharedState['offset'] = (sharedState['offset'] ? sharedState['offset'] : 0) + 1;
                    }
                }
            }
            sharedState['box'] = box;
        }
        catch (ebox)
        {
        }
        if (box == null)
        {
            sharedState['box'] = null;
            sharedState.collapsedHeight = '15px';
            sharedState.expandedHeight = 'auto';
        }

        var titleFontStyle = "font: 8pt sans-serif;font-weight: bold;font-family: 'Arial Narrow', 'Helvetica CY', 'FreeSans', Arial, Helvetica, sans-serif";
        var itemFontStyle = "font: 8pt sans-serif;font-weight: normal;font-family: 'Arial Narrow', 'Helvetica CY', 'FreeSans', Arial, Helvetica, sans-serif";

        if (box == null)
        {
            box = dom_createElementXHTML("div");
            var os = 1 + 15 * (sharedState['offset'] ? sharedState['offset'] : 0);
            dom_setStyle(box,
                         "position:fixed;z-index:32766;top:" + os + "px;left:" + os + "px;margin:0px;background-color:" +
                         BACKGROUND + ";border:1px solid " + BORDER +
                         ";padding:4px;text-align:left;opacity:" + OPACITY + ";" + (usesFilters ? ('filter: alpha(opacity=' + xround(100 * parseFloat('' + OPACITY)) + ');') : '') + itemFontStyle + ";overflow:hidden;width:250px;height:15px;max-height:100%;margin-bottom:15px;");
        }

        /* ************************** bel *****************************
         *   Create a title (titlebar) element for dragging.
         *  Set title attribute and style.
         *  Add a space then the current title of the document.
         *  Set the pointer on the title bar to be a move pointer.
         * ************************************************************/
        var title = dom_createElementXHTML("div");
        title.setAttribute('title',"Double-Click title to expand/collapse");
        if (sharedState['box'] == null)
        {
            dom_setStyle(title,
                         "position:absolute;top:1px;left:1px;z-index:32767;margin:0px;background-color:" +
                         TITLE_BACKGROUND + ";border:1px solid " + TITLE_BORDER +
                         ";padding:4px;text-align:left;width:246px;height:11px;overflow:hidden;margin-bottom:15px;cursor:move;color:"
                         + TITLE_TEXT + ";" + titleFontStyle);
        }
        else
        {
            dom_setStyle(title,
                         "position:absolute;left:1px;z-index:32767;margin:0px;background-color:" +
                         TITLE_BACKGROUND + ";border:1px solid " + TITLE_BORDER +
                         ";padding:4px;text-align:left;width:246px;height:11px;overflow:hidden;margin-bottom:15px;cursor:move;color:"
                         + TITLE_TEXT + ";" + titleFontStyle);
        }
        var ftitle = dom_getFirstNodeValue(DOM, 'title', '*');
        ftitle = removeMarkup(ftitle, src);
        ftitle = c1_to_unicode(singleLineTruncated(ftitle));
        dom_appendText(title, ftitle);

        /* ************************** bel *****************************
         *   Set the pointer on the close button to cursor so that it
         *  looks like you can do something with it.
         * ************************************************************/
        var close = dom_createElementXHTML("div");
        dom_setStyle(close,
                     "margin:0px;position:absolute;top:3px;right:3px;width:10px;height:10px;border:1px solid " + TITLE_BORDER +
                     ";line-height:8px;text-align:center;cursor:pointer;" +
                     "background-color:" + TITLE_BACKGROUND + ";color:" + TITLE_TEXT);

        close.setAttribute('title',"Click to close panel");
        addEventHandler(close, 'click',
                        function() {
                            box.style.display = "none";
                            if ((xunescape((new URL(get_location())).fragment).split('_').join(' ').split('-').join(' ').toLowerCase() == 'RSS Panel X self test'.toLowerCase())
                                &&
                                ((new URL(get_location())).scheme == 'file')
                                &&
                                ((new URL(get_location())).path.match(/\/rsspanel.html$/)))
                            {
                                test();
                            }
                        });
        dom_appendText(close, "x");

        /* ************************** bel *****************************
         *   Create a open (expand/collapse) element for expanding and
         *  collapsing the RSS Reader.
         *  Set the cursor to pointer.
         *  Set the title.
         * ************************************************************/
        var open  = dom_createElementXHTML("div");
        dom_setStyle(open,
                     "margin:0px;position:absolute;top:3px;right:17px;width:10px;height:10px;border:1px solid " + TITLE_BORDER +
                     ";line-height:8px;text-align:center;cursor:pointer;" +
                     "background-color:" + TITLE_BACKGROUND + ";color:" + TITLE_TEXT);
        open.setAttribute('title',"Click to expand/collapse");
        dom_appendText(open, ">");

        /* ************************** bel *****************************
         *   This on(dbl-)click function for the open object currently
         *  sets the RSS Reader's height appropriately, sets the overflow
         *  property to create a scrollbar, resets the right position
         *  for the open and close buttons to move them away from the
         *  scrollbar, and then sets the inner HTML of the open button
         *  to the appropriate symbol for conrtact or expand.
         * ************************************************************/
        var expander = function() {
            // closed state
            var bodyDisplay = 'none';
            if (box.style.height == sharedState.collapsedHeight) {
                bodyDisplay = 'block';
                box.style.height = sharedState.expandedHeight;
                box.style.overflow = 'auto';
                sharedState['close'].style.right = '13px';
                sharedState['open'].style.right = '27px';
                sharedState['open'].firstChild.nodeValue = '<';
            } else {
                box.style.height = sharedState.collapsedHeight;
                box.style.overflow = 'hidden';
                sharedState['close'].style.right = '3px';
                sharedState['open'].style.right = '17px';
                sharedState['open'].firstChild.nodeValue = '>';
                var eecs;
                try
                {
                    if (xparseInt(box.style.left) < 0)
                    {
                        box.style.left = 0;
                    }
                }
                catch (eecs)
                {
                }
                try
                {
                    if (xparseInt(box.style.top) < 0)
                    {
                        box.style.top = 0;
                    }
                }
                catch (eecs)
                {
                }
            }
            for (var i = 0; i < sharedState['bodies'].length; i ++)
            {
                var bodyDiv = sharedState['bodies'][i];
                var eebd;
                try
                {
                    if (bodyDiv.style.display != bodyDisplay)
                    {
                        bodyDiv.style.display = bodyDisplay;
                    }
                }
                catch (eebd)
                {
                }
            }
            if (bodyDisplay == 'block')
            {
                var innerHeight = (
                    (defined(window.innerHeight)
                     &&
                     window.innerHeight)
                    ?
                    window.innerHeight
                    :
                    ((defined(window.document.documentElement)
                      &&
                      defined(window.document.documentElement.clientHeight)
                      &&
                      window.document.documentElement.clientHeight)
                     ?
                     window.document.documentElement.clientHeight
                     :
                     ((defined(window.document.body)
                       &&
                       defined(window.document.body.clientHeight)
                       &&
                       window.document.body.clientHeight)
                      ?
                      window.document.body.clientHeight
                      :
                      undef)));
                if (defined(innerHeight)
                    &&
                    (typeof(box.clientHeight) != 'undefined')
                    &&
                    xparseInt('' + box.clientHeight)
                    &&
                    (xparseInt('' + innerHeight) < (9 + xparseInt('' + (box.style.top ? box.style.top : 0)) + xparseInt('' + box.clientHeight))))
                {
                    var newHeight = (xparseInt('' + innerHeight) - 1 - 9 - xparseInt('' + (box.style.top ? box.style.top : 0)));
                    if (newHeight < (9 + 15 + 40))
                    {
                        newHeight = 9 + 15 + 40;
                    }
                    box.style.height = '' + newHeight + 'px';
                }
            }
        };

        addEventHandler(open, 'click', expander);
        if (sharedState['box'] != null)
        {
            close.style.right = "13px";
            open.style.right = "27px";
            open.firstChild.nodeValue = "<";
        }

        /* ************************** bel *****************************
         *   Add the open and close button to the title bar, then add
         *  the title bar to the RSS Reader.
         * ************************************************************/
        title.appendChild(open);
        title.appendChild(close);

        var realsrc = src;
        try {
            var atomlinks = dom_getElements(DOM, 'link', namespaces.atom);
            for (var iial = 0; iial < atomlinks.length; iial ++)
            {
                var atomlink = atomlinks[iial];
                if (re_utf8(atomlink.getAttribute('rel')).split(_ws_re).join(' ').match(/(^| )self($| )/i))
                {
                    realsrc = atomlink.getAttribute('href') || realsrc;
                }
            }
        } catch (e) {
        }
        var ul = dom_createElementXHTML("ul");
        dom_setStyle(ul, "padding-left: 14px; padding-top: 20px;" + itemFontStyle);
        var items = [];
        try {
            items = dom_getElements(DOM, 'item', '*');
        } catch (e) {
            var li = dom_createElementXHTML("li");
            dom_setStyle(li, itemFontStyle);
            dom_appendText(li, "RSS doesn't contain any items!");
            ul.appendChild(li);
        }
        var linkyKey = ftitle;
        for (var i=0; i< items.length; i++) {
            var n = items[i];
            var rssNS = n.namespaceURI;
            var feedburnerNS = namespaces.feedburner;
            var descType = (dom_getDocumentElement(DOM).namespaceURI == namespaces.rss0) ? 'text/plain' : 'text/html';
            var desc = dom_getFirstNodeValue(n, 'encoded', namespaces.content);
            if (desc)
            {
                descType = 'text/html';
            }
            else
            {
                var descnodes = dom_getElements(n, 'description', rssNS);
                if (descnodes && descnodes.length)
                {
                    desc = dom_getFirstNodeValue(n, 'description', rssNS);
                    descType = (descnodes[0].getAttribute('type') != null) ? descnodes[0].getAttribute('type') : descType;
                }
            }
            var ititle = dom_getFirstNodeValue(n, 'title', rssNS) || "Untitled item #" + i;
            ititle = c1_to_unicode(singleLineTruncated(removeMarkup(ititle, src)));
            desc = c1_to_unicode(singleLineTruncated((descType.toLowerCase() == 'text/plain') ? desc : removeMarkup(desc, src)));
            var enclosures = dom_getElements(n, 'enclosure', rssNS);
            var enclosureURI = null;
            for (var iien = 0; iien < enclosures.length; iien ++)
            {
                var een;
                try
                {
                    var enclosure = enclosures[iien];
                    enclosureURI = enclosure.getAttribute("url") || null;
                    if (enclosureURI != null)
                    {
                        break;
                    }
                }
                catch (een)
                {
                }
            }
            if (enclosureURI == null)
            {
                enclosures = dom_getElements(n, 'enclosure', namespaces.enclosure);
                for (var iien = 0; iien < enclosures.length; iien ++)
                {
                    var een;
                    try
                    {
                        var enclosure = enclosures[iien];
                        enclosureURI = dom_getAttribute(enclosure, 'resource', namespaces.rdf);
                        if (enclosureURI != null)
                        {
                            break;
                        }
                    }
                    catch (een)
                    {
                    }
                    try
                    {
                        var enclosure = enclosures[iien];
                        enclosureURI = enclosure.getAttribute("url") || null;
                        if (enclosureURI != null)
                        {
                            break;
                        }
                    }
                    catch (een)
                    {
                    }
                }
            }
            var linkuri = dom_getFirstNodeValue(n, 'origLink', feedburnerNS) || dom_getFirstNodeValue(n, 'link', rssNS) || enclosureURI || dom_getFirstNodeValue(n, 'guid', rssNS) || "#RSS_MISSING_LINK";
            var reallinkuri = dom_getFirstNodeValue(n, 'link', rssNS) || enclosureURI || dom_getFirstNodeValue(n, 'guid', rssNS) || "#RSS_MISSING_LINK";
            var a = dom_createLink(
                linkuri,
                ititle,
                desc,
                itemFontStyle,
                reallinkuri);
            linkyKey = linkyKey + (
                '\n'
                +
                c1_to_unicode(singleLineTruncated('' + (new URL('' + linkuri))))
                +
                '\n'
                +
                c1_to_unicode(singleLineTruncated(getInnerText(a)))
                +
                '\n'
                +
                c1_to_unicode(singleLineTruncated(desc)));
            var li = dom_createElementXHTML("li");
            /* ************************** bel *****************************
             *   Set the style for the list item to always be our TEXT color
             *   to avoid clashing colors with the list items on the
             *   existing page.
             * ************************************************************/
            dom_setStyle(li, "color:" + TEXT + ";" + itemFontStyle);
            li.appendChild(a);
            ul.appendChild(li);
        }
        var div = dom_createElementXHTML("div");
        div.appendChild(ul);
        var linky = dom_createLink(src, "Link to " + format + " feed", format + " feed " + carrier, itemFontStyle);
        if (sharedState['linkies'][linkyKey] != null)
        {
            sharedState['linkies'][linkyKey].parentNode.insertBefore(linky, sharedState['linkies'][linkyKey].nextSibling);
            sharedState['linkies'][linkyKey].parentNode.insertBefore(dom_createElementXHTML('br'),
                                                                     linky);
            sharedState['linkies'][linkyKey] = linky;
            return;
        }
        if (location_minusFragment(sharedState['location']) != location_minusFragment(_get_location())) return;
        dom_getDocumentElement(window.document).setAttribute('q', (dom_getDocumentElement(window.document).getAttribute('q') ? (dom_getDocumentElement(window.document).getAttribute('q') + '\n \n') : '') + linkyKey);
        sharedState['linkies'][linkyKey] = linky;
        div.appendChild(linky);
        div.appendChild(dom_createElementXHTML("br"));
        div.appendChild(dom_createLink("http://xent.com/~bsittler/rsspanel.html?v="+RSSPanelVersion,
                                       "Check for RSS Panel X updates",
                                       "Current version: v" + RSSPanelVersion, itemFontStyle));
        addEventHandler(title, 'dblclick', expander);
        box.appendChild(title);
        if (box.style.height == sharedState.collapsedHeight)
        {
            div.style.display = 'none';
            if (sharedState['box'] != null)
            {
                title.style.display = 'none';
            }
        }
        box.appendChild(div);

        sharedState['bodies'][sharedState['bodies'].length] = div;
        if (sharedState['box'] == null)
        {
            var documentElement = dom_getDocumentElement(window.document);
            var htmlNS = documentElement.namespaceURI;
            var body = documentElement.body;
            if (! body)
            {
                var bodies = dom_getElements(documentElement, 'body', htmlNS);
                if (bodies.length)
                {
                    body = bodies[0];
                }
                else
                {
                    body = documentElement;
                }
            }
            body.appendChild(box);
            sharedState['box'] = box;
            sharedState['open'] = open;
            sharedState['close'] = close;
            sharedState['title'] = title;
            // detect and work around one of the broken MSIE box models
            if ((typeof(box.clientHeight) != 'undefined')
                &&
                (box.clientHeight == 13)
                &&
                (typeof(box.currentStyle) != 'undefined'))
            {
                var parts = {'box':true, 'open':true, 'close':true, 'title':true};
                for (var partname in parts)
                {
                    var part = sharedState[partname];
                    part.style.height = (''
                                         +
                                         (xparseInt(part.currentStyle.height)
                                          +
                                          xparseInt(part.currentStyle.paddingTop)
                                          +
                                          xparseInt(part.currentStyle.borderTopWidth)
                                          +
                                          xparseInt(part.currentStyle.paddingBottom)
                                          +
                                          xparseInt(part.currentStyle.borderBottomWidth))
                                         +
                                         'px');
                    part.style.width = (''
                                        +
                                        (xparseInt(part.currentStyle.width)
                                         +
                                         xparseInt(part.currentStyle.paddingLeft)
                                         +
                                         xparseInt(part.currentStyle.borderLeftWidth)
                                         +
                                         xparseInt(part.currentStyle.paddingRight)
                                         +
                                         xparseInt(part.currentStyle.borderRightWidth))
                                        +
                                        'px');
                }
                sharedState.collapsedHeight = box.style.height;
            }
        }
        else
        {
            title.style.height = sharedState.title.style.height;
            title.style.width = sharedState.title.style.width;
            open.style.height = sharedState.open.style.height;
            open.style.width = sharedState.open.style.width;
            close.style.height = sharedState.close.style.height;
            close.style.width = sharedState.close.style.width;
            sharedState['bodies'][sharedState['bodies'].length] = title;
        }
        title.drag = new Drag(title, box); // make draggable
        if (dom_getDocumentElement(window.document)
            &&
            (dom_getDocumentElement(window.document)).innerHTML
            &&
            box.innerHTML
            &&
            ((dom_getDocumentElement(window.document)).innerHTML.indexOf(box.innerHTML) == -1))
        {
            for (var pn = box.parentNode; pn; pn = pn.parentNode)
            {
                if (pn == dom_getDocumentElement(window.document)) break;
            }
            if (! pn)
            {
                if (sharedState['bodies'][0].parentNode != box)
                {
                    sharedState['box'] = sharedState['bodies'][0].parentNode;
                }
                else
                {
                    sharedState['box'] = null;
                    sharedState['offset'] = (sharedState['offset'] ? sharedState['offset'] : 0) + 1;
                }
                sharedState['linkies'][linkyKey] = null;
                rss_render(DOM, src, sharedState, format, carrier);
            }
        }
        if (location_minusFragment(sharedState['location']) != location_minusFragment(_get_location()))
        {
            if (sharedState['box'] != null)
            {
                var eewb;
                try
                {
                    var box = sharedState['box'];
                    sharedState['box'] = null;
                    box.parentNode.removeChild(box);
                }
                catch (eewb)
                {
                }
            }
        }
    };

// Modified DOM-Drag from Book Burro 0.16
    var Drag = function(){ this.init.apply( this, arguments ); };

    Drag.fixE = function( e ) {
        if( typeof e == 'undefined' ) e = window.event;
        if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
        if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
        return e;
    };

    Drag.prototype.init = function( handle, dragdiv ) {
        this.div = dragdiv || handle;
        this.handle = handle;
        if( xisNaN(xparseInt(this.div.style.left)) ) this.div.style.left  = '0px';
        if( xisNaN(xparseInt(this.div.style.top)) ) this.div.style.top = '0px';
        this.onDragStart = function(){};
        this.onDragEnd = function(){};
        this.onDrag = function(){};
        this.onClick = function(){};
        this.mouseDown = addEventHandler(this.handle, 'mousedown', this.start, this);
    };

    Drag.prototype.start = function( e ) {
        // this.mouseUp = addEventHandler(this.handle, 'mouseup', this.end, this);
        e = Drag.fixE(e);

        this.started = now();
        var y = this.startY = xparseInt(this.div.style.top);
        var x = this.startX = xparseInt(this.div.style.left);
        this.onDragStart(x, y);
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        if (this.documentMove) removeEventHandler( window.document, 'mousemove', this.documentMove );
        if (this.documentStop) removeEventHandler( window.document, 'mouseup', this.documentStop );
        if (this.divStop) removeEventHandler( this.div, 'mouseup', this.divStop );
        this.documentMove = addEventHandler(window.document, 'mousemove', this.drag, this);
        this.documentStop = addEventHandler(window.document, 'mouseup', this.end, this);
        this.divStop = addEventHandler(this.div, 'mouseup', this.end, this);
        if (e.preventDefault) e.preventDefault();
        return false;
    };

    Drag.prototype.drag = function( e ) {
        e = Drag.fixE(e);
        var ey = e.clientY;
        var ex = e.clientX;
        var y = xparseInt(this.div.style.top);
        var x = xparseInt(this.div.style.left);
        var nx = ex + x - this.lastMouseX;
        var ny = ey + y - this.lastMouseY;
        this.div.style.left = nx + 'px';
        this.div.style.top  = ny + 'px';
        this.lastMouseX     = ex;
        this.lastMouseY     = ey;
        this.onDrag(nx, ny);
        if (e.preventDefault) e.preventDefault();
        return false;
    };

    Drag.prototype.end = function() {
        removeEventHandler( window.document, 'mousemove', this.documentMove );
        removeEventHandler( window.document, 'mouseup', this.documentStop );
        removeEventHandler( this.div, 'mouseup', this.divStop );
        this.documentMove = null;
        this.documentStop = null;
        this.divStop = null;
        var time = now() - this.started;
        var x = xparseInt(this.div.style.left),  dx = x - this.startX;
        var y = xparseInt(this.div.style.top), dy = y - this.startY;
        this.onDragEnd( x, y, dx, dy, time );
        if( (dx*dx + dy*dy) < (4*4) && time < 1e3 )
            this.onClick( x, y, dx, dy, time );
    };

    var removeEventHandler = function( target, eventName, eventHandler ) {
        if( target.addEventListener && ! bugEventListenersAreBroken)
        {
            target.removeEventListener( eventName, eventHandler, true );
        }
        else if( target.attachEvent && ! bugAttachEventIsBroken)
        {
            target.detachEvent( 'on' + eventName, eventHandler );
        }
        else
        {
            target['on'+eventName] = function(){};
        }
    };

    var addEventHandler = function( target, eventName, eventHandler, scope ) {
        var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
        if( target.addEventListener && ! bugEventListenersAreBroken)
        {
            target.addEventListener( eventName, f, true );
        }
        else if( target.attachEvent && ! bugAttachEventIsBroken)
        {
            target.attachEvent( 'on' + eventName, f );
        }
        else
        {
            target['on'+eventName] = f;
        }
        return f;
    };

    notice = function() {
        window.alert(
            'RSS Panel X v' + RSSPanelVersion + ' - RSS/Atom/hAtom/OPML Reader for Greasemonkey\n'
            + ('$Date: 2009/02/03 02:06:25 $\n'.split('/').join('-'))
            + 'Copyright \xa9 2006 - 2007  Benjamin C. Wiley Sittler\n'
            + 'Copyright \xa9 2005, 2006  Johannes la Poutr\xe9\n'
            + 'Portions Copyright \xa9 2004 - 2006  CommerceNet Consortium, LLC\n'
            + '\n'
            + 'This program is free software; you can redistribute it and/or\n'
            + 'modify it under the terms of the GNU General Public License\n'
            + 'as published by the Free Software Foundation; either version 2\n'
            + 'of the License, or (at your option) any later version.\n'
            + '\n'
            + 'This program is distributed in the hope that it will be useful,\n'
            + 'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
            + 'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n'
            + 'GNU General Public License for more details.\n'
            + '\n'
            + 'You should have received a copy of the GNU General Public License\n'
            + 'along with this program; if not, write to the Free Software\n'
            + 'Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA\n'
            + '\n'
            + 'Contact Information:\n'
            + '\n'
            + 'Benjamin C. Wiley Sittler <' + 'bsittler@gmail.com>\n'
            + '6214 Plumas Ave\n'
            + 'Richmond, CA 94804\n'
            + 'U.S.A.\n');
    };


// initialize
    rss_init(null, true, false);

    var registerMenuCommand = function(title, closure, hotkey, modifiers, menuaccel) {
        if (typeof(GM_registerMenuCommand) != 'undefined')
        {
            var e;
            try
            {
                GM_registerMenuCommand(title, closure, hotkey, modifiers, menuaccel);
            }
            catch (e)
            {
                var ee;
                try
                {
                    GM_registerMenuCommand(title, closure, hotkey, modifiers);
                }
                catch (ee)
                {
                    var eee;
                    try
                    {
                        GM_registerMenuCommand(title, closure);
                    }
                    catch (eee)
                    {
                        dbg('cannot register menu command: ' + (eee.message ? eee.message : eee.toString()));
                    }
                }
            }
        }
    };

    test = function () {
        var aea;
        var aeb;
        var aeo;
        var reset_eq = function () {
            aea = undef;
            aeb = undef;
            aeo = undef;
        };
        var eq = function (a, b) {
            aea = a;
            aeb = b;
            aeo = '!=';
            return a == b;
        };
        var closures = [
            function () { return true; },
            function () { return eq(escapeJavaScript(' 0-9A-Za-z_'), ' 0-9A-Za-z_'); },
            function () { return eq(escapeJavaScript('1 <' + ' 2 &' + ' 2 > 0'), '1 \\x3c 2 \\x26 2 > 0'); },
            function () {
                return eq(escapeJavaScript('this looks like <' + 'html> text &' + 'amp; <' + '![CDATA[CDATA]]' + '> <' + '/html>, doesn\'t it?'),
                          'this looks like \\x3chtml> text \\x26amp; \\x3c![CDATA[CDATA]]\\x3e \\x3c/html>, doesn\\\'t it?');
            },
            function () {
                return eq(escapeJavaScript(
                              '\b\t\n\x0b\f\r\\\"\'\x00\x0b\x0e\x1f' +
                              '\ufffe\uffff\udfff\ud800\ud800\udc00\udbff\udfff'),
                          '\\b\\t\\n\\x0b\\f\\r\\\\\\\"\\\'\\x00\\x0b' +
                          '\\x0e\\x1f\\ufffe\\uffff\\udfff\\ud800' +
                          '\\ud800\\udc00\\udbff\\udfff');
            },
            function () { return eq(unichr(0x10000), '\ud800\udc00'); },
            function () { return eq(unichr(0x10fffd), '\udbff\udffd'); },
            function () { return eq(unichr(0x10ffff), '\udbff\udfff'); },
            function () { return eq(unichr(0xd800), '\ud800'); },
            function () { return eq(unichr(0xdc00), '\udc00'); },
            function () { return eq(unichr(0), '\0'); },
            function () { return eq(unichr(0xfffd), '\ufffd'); },
            function () { return eq(unichr(0xfffe), '\ufffe'); },
            function () { return eq(unichr(0xffff), '\uffff'); },
            function () { return eq(uniord('\ud800\udc00'), 0x10000); },
            function () { return eq(uniord('\udbff\udffd'), 0x10fffd); },
            function () { return eq(uniord('\udbff\udfff'), 0x10ffff); },
            function () { return eq(uniord('\ud800'), 0xd800); },
            function () { return eq(uniord('\udc00'), 0xdc00); },
            function () { return eq(uniord('\0'), 0); },
            function () { return eq(uniord('\ufffd'), 0xfffd); },
            function () { return eq(uniord('\ufffe'), 0xfffe); },
            function () { return eq(uniord('\uffff'), 0xffff); },
            function () { return eq(utf8('\0'), '\0'); },
            function () { return eq(utf8('\t\n\r 0-9A-Za-z_'), '\t\n\r 0-9A-Za-z_'); },
            function () { return eq(utf8('\x7f'), '\x7f'); },
            function () { return eq(utf8('\x80'), '\xc2\x80'); },
            function () { return eq(utf8('\u07ff'), '\xdf\xbf'); },
            function () { return eq(utf8('\u0800'), '\xe0\xa0\x80'); },
            function () { return eq(utf8('\u0fff'), '\xe0\xbf\xbf'); },
            function () { return eq(utf8('\u1000'), '\xe1\x80\x80'); },
            function () { return eq(utf8('\u20ac'), '\xe2\x82\xac'); },
            function () { return eq(utf8('\ucfff'), '\xec\xbf\xbf'); },
            function () { return eq(utf8('\ud000'), '\xed\x80\x80'); },
            function () { return eq(utf8('\ud7ff'), '\xed\x9f\xbf'); },
            function () { return eq(utf8('\ue000'), '\xee\x80\x80'); },
            function () { return eq(utf8('\ufffd'), '\xef\xbf\xbd'); },
            function () { return eq(utf8('\ufffe'), '\xef\xbf\xbe'); },
            function () { return eq(utf8('\uffff'), '\xef\xbf\xbf'); },
            function () { return eq(utf8('\ud800\udc00'), '\xf0\x90\x80\x80'); },
            function () { return eq(utf8('\ud8bf\udfff'), '\xf0\xbf\xbf\xbf'); },
            function () { return eq(utf8('\ud8c0\udc00'), '\xf1\x80\x80\x80'); },
            function () { return eq(utf8('\udbbf\udfff'), '\xf3\xbf\xbf\xbf'); },
            function () { return eq(utf8('\udbc0\udc00'), '\xf4\x80\x80\x80'); },
            function () { return eq(utf8('\udbff\udfff'), '\xf4\x8f\xbf\xbf'); },
            function () { return eq(utf8('\ud800'), '\xed\xa0\x80'); },
            function () { return eq(utf8('\udbff'), '\xed\xaf\xbf'); },
            function () { return eq(utf8('\udc00'), '\xed\xb0\x80'); },
            function () { return eq(utf8('\udfff'), '\xed\xbf\xbf'); },
            function () { return eq(utf16('\0'), '\0'); },
            function () { return eq(utf16('\1'), '\1'); },
            function () { return eq(utf16('\t\n\r 0-9A-Za-z_'), '\t\n\r 0-9A-Za-z_'); },
            function () { return eq(utf16('\x7f'), '\x7f'); },
            function () { "overlong U+0000"; return eq(utf16('\xc0\x80'), '\ufffd\ufffd'); },
            function () { "overlong U+007F"; return eq(utf16('\xc1\xbf'), '\ufffd\ufffd'); },
            function () { return eq(utf16('\xc2\x80'), '\x80'); },
            function () { return eq(utf16('\xdf\xbf'), '\u07ff'); },
            function () { "overlong U+0000"; return eq(utf16('\xe0\x80\x80'), '\ufffd\ufffd\ufffd'); },
            function () { "overlong U+0800"; return eq(utf16('\xe0\x9f\xbf'), '\ufffd\ufffd\ufffd'); },
            function () { return eq(utf16('\xe0\xa0\x80'), '\u0800'); },
            function () { return eq(utf16('\xe0\xbf\xbf'), '\u0fff'); },
            function () { return eq(utf16('\xe1\x80\x80'), '\u1000'); },
            function () { return eq(utf16('\xe2\x82\xac'), '\u20ac'); },
            function () { return eq(utf16('\xec\xbf\xbf'), '\ucfff'); },
            function () { return eq(utf16('\xed\x80\x80'), '\ud000'); },
            function () { return eq(utf16('\xed\x9f\xbf'), '\ud7ff'); },
            function () { return eq(utf16('\xee\x80\x80'), '\ue000'); },
            function () { return eq(utf16('\xef\xbf\xbd'), '\ufffd'); },
            function () { return eq(utf16('\xef\xbf\xbe'), '\ufffe'); },
            function () { return eq(utf16('\xef\xbf\xbf'), '\uffff'); },
            function () { "overlong U+0000"; return eq(utf16('\xf0\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd'); },
            function () { "overlong U+FFFF"; return eq(utf16('\xf0\x80\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd'); },
            function () { return eq(utf16('\xf0\x90\x80\x80'), '\ud800\udc00'); },
            function () { return eq(utf16('\xf0\xbf\xbf\xbf'), '\ud8bf\udfff'); },
            function () { return eq(utf16('\xf1\x80\x80\x80'), '\ud8c0\udc00'); },
            function () { return eq(utf16('\xf3\xbf\xbf\xbf'), '\udbbf\udfff'); },
            function () { return eq(utf16('\xf4\x80\x80\x80'), '\udbc0\udc00'); },
            function () { return eq(utf16('\xf4\x8f\xbf\xbf'), '\udbff\udfff'); },
            function () { "UCS U-110000"; return eq(utf16('\xf4\x90\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS U-1FFFFF"; return eq(utf16('\xf7\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS overlong U+0000"; return eq(utf16('\xf8\x80\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS overlong U-1FFFFF"; return eq(utf16('\xf8\x83\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS U-200000"; return eq(utf16('\xf8\x84\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS U-3FFFFFF"; return eq(utf16('\xfb\xbf\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS overlong U+0000"; return eq(utf16('\xfc\x80\x80\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS overlong U-3FFFFFF"; return eq(utf16('\xfc\x83\xbf\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS U-4000000"; return eq(utf16('\xfc\x84\x80\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "UCS U-7FFFFFFF"; return eq(utf16('\xfd\xbf\xbf\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "FSS-UTF 0x80000000"; return eq(utf16('\xfe\x80\x80\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "FSS-UTF 0xBFFFFFFF"; return eq(utf16('\xfe\xbf\xbf\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "FSS-UTF 0xC0000000"; return eq(utf16('\xff\x80\x80\x80\x80\x80'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { "FSS-UTF 0xFFFFFFFF"; return eq(utf16('\xff\xbf\xbf\xbf\xbf\xbf'), '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'); },
            function () { return eq(utf16('\xed\xa0\x80'), '\ud800'); },
            function () { return eq(utf16('\xed\xaf\xbf'), '\udbff'); },
            function () { return eq(utf16('\xed\xb0\x80'), '\udc00'); },
            function () { return eq(utf16('\xed\xbf\xbf'), '\udfff'); },
            function () { return eq(utf16(utf8(unichr(0x10000))), '\ud800\udc00'); },
            function () { return eq(utf16(utf8(unichr(0x10fffd))), '\udbff\udffd'); },
            function () { return eq(utf16(utf8(unichr(0x10ffff))), '\udbff\udfff'); },
            function () { return eq(utf16(utf8(unichr(0xd800))), '\ud800'); },
            function () { return eq(utf16(utf8(unichr(0xdc00))), '\udc00'); },
            function () { return eq(utf16(utf8(unichr(0))), '\0'); },
            function () { return eq(utf16(utf8(unichr(0xfffd))), '\ufffd'); },
            function () { return eq(utf16(utf8(unichr(0xfffe))), '\ufffe'); },
            function () { return eq(utf16(utf8(unichr(0xffff))), '\uffff'); },
            function () { return eq(uniord(utf16(utf8('\ud800\udc00'))), 0x10000); },
            function () { return eq(uniord(utf16(utf8('\udbff\udffd'))), 0x10fffd); },
            function () { return eq(uniord(utf16(utf8('\udbff\udfff'))), 0x10ffff); },
            function () { return eq(uniord(utf16(utf8('\ud800'))), 0xd800); },
            function () { return eq(uniord(utf16(utf8('\udc00'))), 0xdc00); },
            function () { return eq(uniord(utf16(utf8('\0'))), 0); },
            function () { return eq(uniord(utf16(utf8('\ufffd'))), 0xfffd); },
            function () { return eq(uniord(utf16(utf8('\ufffe'))), 0xfffe); },
            function () { return eq(uniord(utf16(utf8('\uffff'))), 0xffff); },
            function () { "U+10000, U+10FFFF encode == U+10000 encode + U+10FFFF encode"; return eq(utf8('\ud800\udc00\udbff\udfff'), (utf8('\ud800\udc00') + utf8('\udbff\udfff'))); },
            function () { "U+10000 round trip"; return eq(utf16(utf8('\ud800\udc00')), '\ud800\udc00'); },
            function () { "U+10FFFF round trip"; return eq(utf16(utf8('\udbff\udfff')), '\udbff\udfff'); },
            function () { "U+10000, U+10FFFF round trip"; return eq(utf16(utf8('\ud800\udc00\udbff\udfff')), '\ud800\udc00\udbff\udfff'); },
            function () { "non-BMP literal U+10000"; return eq(re_cclass('[\ud800\udc00]'), '(?:\\xf0\\x90\\x80\\x80)'); },
            function () { "non-BMP escaped U+10000"; return eq(re_cclass('[\\U00010000]'), '(?:\\xf0\\x90\\x80\\x80)'); },
            function () { "non-BMP literal U+10FFFD"; return eq(re_cclass('[\udbff\udffd]'), '(?:\\xf4\\x8f\\xbf\\xbd)'); },
            function () { "non-BMP escaped U+10FFFD"; return eq(re_cclass('[\\U0010fffd]'), '(?:\\xf4\\x8f\\xbf\\xbd)'); },
            function () { "non-BMP literal U+10FFFF"; return eq(re_cclass('[\udbff\udfff]'), '(?:\\xf4\\x8f\\xbf\\xbf)'); },
            function () { "non-BMP escaped U+10FFFF"; return eq(re_cclass('[\\U0010ffff]'), '(?:\\xf4\\x8f\\xbf\\xbf)'); },
            function () { "explicit literal unpaired surrogates (0xd800, 0xdc00)"; return eq(re_cclass('[\udc00\ud800]'), '(?:\\xed[\\xa0\\xb0]\\x80)'); },
            function () { "explicit escaped unpaired surrogates (0xd800, 0xdc00)"; return eq(re_cclass('[\\ud800\\udc00]'), '(?:\\xed[\\xa0\\xb0]\\x80)'); },
            function () { "explicit literal unpaired surrogates (0xdbff, 0xdffd)"; return eq(re_cclass('[\udffd\udbff]'), '(?:\\xed(?:\\xaf\\xbf|\\xbf\\xbd))'); },
            function () { "explicit escaped unpaired surrogates (0xdbff, 0xdffd)"; return eq(re_cclass('[\\udbff\\udffd]'), '(?:\\xed(?:\\xaf\\xbf|\\xbf\\xbd))'); },
            function () { "explicit literal unpaired surrogates (0xdbff, 0xdfff)"; return eq(re_cclass('[\udfff\udbff]'), '(?:\\xed[\\xaf\\xbf]\\xbf)'); },
            function () { "explicit escaped unpaired surrogates (0xdbff, 0xdfff)"; return eq(re_cclass('[\\udbff\\udfff]'), '(?:\\xed[\\xaf\\xbf]\\xbf)'); },
            function () { return eq(re_cclass('[0-0]'), '0'); },
            function () { return eq(re_cclass('[0]'), '0'); },
            function () { return eq(re_cclass('[0-9]'), '[0-9]'); },
            function () { return eq(re_cclass('[a-z]'), '[a-z]'); },
            function () { return eq(re_cclass('[A-Z]'), '[A-Z]'); },
            function () { return eq(re_cclass('[A-z]'), '[A-z]'); },
            function () { return eq(re_cclass('[a-Z]'), '[^\\x01-\\xff]'); },
            function () { return eq(re_cclass('[A-Za-z]'), '[A-Za-z]'); },
            function () { return eq(re_cclass('[a-zA-Z]'), '[A-Za-z]'); },
            function () { return eq(re_cclass('[\\x00]'), '\\xff'); },
            function () { return eq(re_cclass('[\x00]'), '\\xff'); },
            function () { return eq(re_cclass('[\\x00-\\x00]'), '\\xff'); },
            function () { return eq(re_cclass('[\x00-\x00]'), '\\xff'); },
            function () { return eq(re_cclass('[a-z\\x00-\\x00]'), '[a-z\\xff]'); },
            function () { return eq(re_cclass('[a-z\x00-\x00]'), '[a-z\\xff]'); },
            function () { return eq(re_cclass('[a-z\\x00-\\x000-9]'), '[0-9a-z\\xff]'); },
            function () { return eq(re_cclass('[a-z\x00-\x000-9]'), '[0-9a-z\\xff]'); },
            function () { return eq(re_cclass('[\\U00002122]'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\\U00002122-\\U00002122]'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\\u2122]'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\\u2122-\\u2122]'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\u2122]'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\u2122-\u2122]'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\\U00002122]'), '(?:[a-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\\U00002122-\\U00002122]'), '(?:[a-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\\u2122]'), '(?:[a-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\\u2122-\\u2122]'), '(?:[a-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\u2122]'), '(?:[a-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\u2122-\u2122]'), '(?:[a-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[0-9]', 'i'), '[0-9]'); },
            function () { return eq(re_cclass('[a-z]', 'i'), '[A-Za-z]'); },
            function () { return eq(re_cclass('[A-Z]', 'i'), '[A-Za-z]'); },
            function () { return eq(re_cclass('[A-z]', 'i'), '[A-z]'); },
            function () { return eq(re_cclass('[a-Z]', 'i'), '[^\\x01-\\xff]'); },
            function () { return eq(re_cclass('[A-Za-z]', 'i'), '[A-Za-z]'); },
            function () { return eq(re_cclass('[a-zA-Z]', 'i'), '[A-Za-z]'); },
            function () { return eq(re_cclass('[\\x00]', 'i'), '\\xff'); },
            function () { return eq(re_cclass('[\x00]', 'i'), '\\xff'); },
            function () { return eq(re_cclass('[\\x00-\\x00]', 'i'), '\\xff'); },
            function () { return eq(re_cclass('[\x00-\x00]', 'i'), '\\xff'); },
            function () { return eq(re_cclass('[a-z\\x00-\\x00]', 'i'), '[A-Za-z\\xff]'); },
            function () { return eq(re_cclass('[a-z\x00-\x00]', 'i'), '[A-Za-z\\xff]'); },
            function () { return eq(re_cclass('[a-z\\x00-\\x000-9]', 'i'), '[0-9A-Za-z\\xff]'); },
            function () { return eq(re_cclass('[a-z\x00-\x000-9]', 'i'), '[0-9A-Za-z\\xff]'); },
            function () { return eq(re_cclass('[\\u2122-\\u2122]', 'i'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\u2122-\u2122]', 'i'), '(?:\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\\u2122-\\u2122]', 'i'), '(?:[A-Za-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[a-z\u2122-\u2122]', 'i'), '(?:[A-Za-z]|\\xe2\\x84\\xa2)'); },
            function () { return eq(re_cclass('[\\s]'), '(?:[\\x09-\\x0d\\x1c- ]|\\xc2[\\x85\\xa0]|\\xe1\\x9a\\x80|\\xe2(?:\\x80[\\x80-\\x8b\\xa8\\xa9\\xaf]|\\x81\\x9f)|\\xe3\\x80\\x80)'); },
            function () { return eq(re_cclass('[\\d]'), '(?:[0-9]|\\xc2[\\xb2\\xb3\\xb9]|\\xd9[\\xa0-\\xa9]|\\xdb[\\xb0-\\xb9]|\\xe0(?:[\\xa5\\xa7\\xa9\\xab\\xad\\xaf\\xb1\\xb3\\xb5][\\xa6-\\xaf]|[\\xb9\\xbb][\\x90-\\x99]|\\xbc[\\xa0-\\xa9])|\\xe1(?:\\x81[\\x80-\\x89]|\\x8d[\\xa9-\\xb1]|\\x9f[\\xa0-\\xa9]|[\\xa0\\xa7][\\x90-\\x99]|\\xa5[\\x86-\\x8f])|\\xe2(?:\\x81[\\xb0\\xb4-\\xb9]|\\x82[\\x80-\\x89]|\\x91[\\xa0-\\xa8\\xb4-\\xbc]|\\x92[\\x88-\\x90]|\\x93[\\xaa\\xb5-\\xbd\\xbf]|\\x9d[\\xb6-\\xbe]|\\x9e[\\x80-\\x88\\x8a-\\x92])|\\xef\\xbc[\\x90-\\x99]|\\xf0(?:\\x90(?:\\x92[\\xa0-\\xa9]|\\xa9[\\x80-\\x83])|\\x9d\\x9f[\\x8e-\\xbf]))'); },
            function () { return eq(re_cclass('[\\w]'), '(?:[0-9A-Z_a-z]|\\xc2[\\xaa\\xb2\\xb3\\xb5\\xb9\\xba\\xbc-\\xbe]|\\xc3[\\x80-\\x96\\x98-\\xb6\\xb8-\\xbf]|[\\xc4-\\xc8\\xca\\xd0\\xd1\\xda][\\x80-\\xbf]|\\xc9[\\x80\\x81\\x90-\\xbf]|\\xcb[\\x80\\x81\\x86-\\x91\\xa0-\\xa4\\xae]|\\xcd\\xba|\\xce[\\x86\\x88-\\x8a\\x8c\\x8e-\\xa1\\xa3-\\xbf]|\\xcf[\\x80-\\x8e\\x90-\\xb5\\xb7-\\xbf]|\\xd2[\\x80\\x81\\x8a-\\xbf]|\\xd3[\\x80-\\x8e\\x90-\\xb9]|\\xd4[\\x80-\\x8f\\xb1-\\xbf]|\\xd5[\\x80-\\x96\\x99\\xa1-\\xbf]|\\xd6[\\x80-\\x87]|\\xd7[\\x90-\\xaa\\xb0-\\xb2]|\\xd8[\\xa1-\\xba]|\\xd9[\\x80-\\x8a\\xa0-\\xa9\\xae\\xaf\\xb1-\\xbf]|\\xdb[\\x80-\\x93\\x95\\xa5\\xa6\\xae-\\xbc\\xbf]|\\xdc[\\x90\\x92-\\xaf]|\\xdd[\\x8d-\\xad]|\\xde[\\x80-\\xa5\\xb1]|\\xe0(?:\\xa4[\\x84-\\xb9\\xbd]|\\xa5[\\x90\\x98-\\xa1\\xa6-\\xaf\\xbd]|\\xa6[\\x85-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb6-\\xb9\\xbd]|\\xa7[\\x8e\\x9c\\x9d\\x9f-\\xa1\\xa6-\\xb1\\xb4-\\xb7\\xb9]|\\xa8[\\x85-\\x8a\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5\\xb6\\xb8\\xb9]|\\xa9[\\x99-\\x9c\\x9e\\xa6-\\xaf\\xb2-\\xb4]|\\xaa[\\x85-\\x8d\\x8f-\\x91\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xab[\\x90\\xa0\\xa1\\xa6-\\xaf]|\\xac[\\x85-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xad[\\x9c\\x9d\\x9f-\\xa1\\xa6-\\xaf\\xb1]|\\xae[\\x83\\x85-\\x8a\\x8e-\\x90\\x92-\\x95\\x99\\x9a\\x9c\\x9e\\x9f\\xa3\\xa4\\xa8-\\xaa\\xae-\\xb9]|\\xaf[\\xa6-\\xb2]|\\xb0[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9]|[\\xb1\\xb5][\\xa0\\xa1\\xa6-\\xaf]|\\xb2[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9\\xbd]|\\xb3[\\x9e\\xa0\\xa1\\xa6-\\xaf]|\\xb4[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb9]|\\xb6[\\x85-\\x96\\x9a-\\xb1\\xb3-\\xbb\\xbd]|\\xb7[\\x80-\\x86]|\\xb8[\\x81-\\xb0\\xb2\\xb3]|\\xb9[\\x80-\\x86\\x90-\\x99]|\\xba[\\x81\\x82\\x84\\x87\\x88\\x8a\\x8d\\x94-\\x97\\x99-\\x9f\\xa1-\\xa3\\xa5\\xa7\\xaa\\xab\\xad-\\xb0\\xb2\\xb3\\xbd]|\\xbb[\\x80-\\x84\\x86\\x90-\\x99\\x9c\\x9d]|\\xbc[\\x80\\xa0-\\xb3]|\\xbd[\\x80-\\x87\\x89-\\xaa]|\\xbe[\\x88-\\x8b])|\\xe1(?:\\x80[\\x80-\\xa1\\xa3-\\xa7\\xa9\\xaa]|\\x81[\\x80-\\x89\\x90-\\x95]|\\x82[\\xa0-\\xbf]|\\x83[\\x80-\\x85\\x90-\\xba\\xbc]|[\\x84\\x88\\x91-\\x98\\xb4-\\xb6\\xb8\\xb9][\\x80-\\xbf]|\\x85[\\x80-\\x99\\x9f-\\xbf]|\\x86[\\x80-\\xa2\\xa8-\\xbf]|[\\x87\\xbb][\\x80-\\xb9]|\\x89[\\x80-\\x88\\x8a-\\x8d\\x90-\\x96\\x98\\x9a-\\x9d\\xa0-\\xbf]|\\x8a[\\x80-\\x88\\x8a-\\x8d\\x90-\\xb0\\xb2-\\xb5\\xb8-\\xbe]|\\x8b[\\x80\\x82-\\x85\\x88-\\x96\\x98-\\xbf]|\\x8c[\\x80-\\x90\\x92-\\x95\\x98-\\xbf]|\\x8d[\\x80-\\x9a\\xa9-\\xbc]|\\x8e[\\x80-\\x8f\\xa0-\\xbf]|\\x8f[\\x80-\\xb4]|\\x90[\\x81-\\xbf]|\\x99[\\x80-\\xac\\xaf-\\xb6]|\\x9a[\\x81-\\x9a\\xa0-\\xbf]|\\x9b[\\x80-\\xaa\\xae-\\xb0]|\\x9c[\\x80-\\x8c\\x8e-\\x91\\xa0-\\xb1]|\\x9d[\\x80-\\x91\\xa0-\\xac\\xae-\\xb0]|\\x9e[\\x80-\\xb3]|\\x9f[\\x97\\x9c\\xa0-\\xa9\\xb0-\\xb9]|\\xa0[\\x90-\\x99\\xa0-\\xbf]|\\xa1[\\x80-\\xb7]|\\xa2[\\x80-\\xa8]|\\xa4[\\x80-\\x9c]|\\xa5[\\x86-\\xad\\xb0-\\xb4]|\\xa6[\\x80-\\xa9]|\\xa7[\\x81-\\x87\\x90-\\x99]|\\xa8[\\x80-\\x96]|\\xba[\\x80-\\x9b\\xa0-\\xbf]|\\xbc[\\x80-\\x95\\x98-\\x9d\\xa0-\\xbf]|\\xbd[\\x80-\\x85\\x88-\\x8d\\x90-\\x97\\x99\\x9b\\x9d\\x9f-\\xbd]|\\xbe[\\x80-\\xb4\\xb6-\\xbc\\xbe]|\\xbf[\\x82-\\x84\\x86-\\x8c\\x90-\\x93\\x96-\\x9b\\xa0-\\xac\\xb2-\\xb4\\xb6-\\xbc])|\\xe2(?:\\x81[\\xb0\\xb1\\xb4-\\xb9\\xbf]|\\x82[\\x80-\\x89\\x90-\\x94]|\\x84[\\x82\\x87\\x8a-\\x93\\x95\\x99-\\x9d\\xa4\\xa6\\xa8\\xaa-\\xad\\xaf-\\xb1\\xb3-\\xb9\\xbc-\\xbf]|\\x85[\\x85-\\x89\\x93-\\xbf]|\\x86[\\x80-\\x82]|\\x91[\\xa0-\\xbf]|\\x92[\\x80-\\x9b]|\\x93[\\xaa-\\xbf]|\\x9d[\\xb6-\\xbf]|\\x9e[\\x80-\\x93]|\\xb0[\\x80-\\xae\\xb0-\\xbf]|\\xb1[\\x80-\\x9e]|\\xb2[\\x80-\\xbf]|\\xb3[\\x80-\\xa4\\xbd]|\\xb4[\\x80-\\xa5\\xb0-\\xbf]|\\xb5[\\x80-\\xa5\\xaf]|\\xb6[\\x80-\\x96\\xa0-\\xa6\\xa8-\\xae\\xb0-\\xb6\\xb8-\\xbe]|\\xb7[\\x80-\\x86\\x88-\\x8e\\x90-\\x96\\x98-\\x9e])|\\xe3(?:\\x80[\\x85-\\x87\\xa1-\\xa9\\xb1-\\xb5\\xb8-\\xbc]|\\x81[\\x81-\\xbf]|\\x82[\\x80-\\x96\\x9d-\\x9f\\xa1-\\xbf]|\\x83[\\x80-\\xba\\xbc-\\xbf]|\\x84[\\x85-\\xac\\xb1-\\xbf]|[\\x85\\x90-\\xbf][\\x80-\\xbf]|\\x86[\\x80-\\x8e\\x92-\\x95\\xa0-\\xb7]|\\x87[\\xb0-\\xbf]|\\x88[\\xa0-\\xa9]|\\x89[\\x91-\\x9f]|\\x8a[\\x80-\\x89\\xb1-\\xbf])|\\xe4(?:[\\x80-\\xb5\\xb8-\\xbf][\\x80-\\xbf]|\\xb6[\\x80-\\xb5])|[\\xe5-\\xe8\\xeb\\xec][\\x80-\\xbf]{2}|\\xe9(?:[\\x80-\\xbd][\\x80-\\xbf]|\\xbe[\\x80-\\xbb])|\\xea(?:[\\x80-\\x91\\xb0-\\xbf][\\x80-\\xbf]|\\x92[\\x80-\\x8c]|\\xa0[\\x80\\x81\\x83-\\x85\\x87-\\x8a\\x8c-\\xa2])|\\xed(?:[\\x80-\\x9d][\\x80-\\xbf]|\\x9e[\\x80-\\xa3])|\\xef(?:[\\xa4-\\xa7\\xaa\\xb0-\\xb3\\xba][\\x80-\\xbf]|\\xa8[\\x80-\\xad\\xb0-\\xbf]|\\xa9[\\x80-\\xaa\\xb0-\\xbf]|\\xab[\\x80-\\x99]|\\xac[\\x80-\\x86\\x93-\\x97\\x9d\\x9f-\\xa8\\xaa-\\xb6\\xb8-\\xbc\\xbe]|\\xad[\\x80\\x81\\x83\\x84\\x86-\\xbf]|\\xae[\\x80-\\xb1]|\\xaf[\\x93-\\xbf]|\\xb4[\\x80-\\xbd]|\\xb5[\\x90-\\xbf]|\\xb6[\\x80-\\x8f\\x92-\\xbf]|\\xb7[\\x80-\\x87\\xb0-\\xbb]|\\xb9[\\xb0-\\xb4\\xb6-\\xbf]|\\xbb[\\x80-\\xbc]|\\xbc[\\x90-\\x99\\xa1-\\xba]|\\xbd[\\x81-\\x9a\\xa6-\\xbf]|\\xbe[\\x80-\\xbe]|\\xbf[\\x82-\\x87\\x8a-\\x8f\\x92-\\x97\\x9a-\\x9c])|\\xf0(?:\\x90(?:\\x80[\\x80-\\x8b\\x8d-\\xa6\\xa8-\\xba\\xbc\\xbd\\xbf]|\\x81[\\x80-\\x8d\\x90-\\x9d]|[\\x82\\x90\\x91][\\x80-\\xbf]|\\x83[\\x80-\\xba]|\\x84[\\x87-\\xb3]|\\x85[\\x80-\\xb8]|\\x86\\x8a|\\x8c[\\x80-\\x9e\\xa0-\\xa3\\xb0-\\xbf]|\\x8d[\\x80-\\x8a]|\\x8e[\\x80-\\x9d\\xa0-\\xbf]|\\x8f[\\x80-\\x83\\x88-\\x8f\\x91-\\x95]|\\x92[\\x80-\\x9d\\xa0-\\xa9]|\\xa0[\\x80-\\x85\\x88\\x8a-\\xb5\\xb7\\xb8\\xbc\\xbf]|\\xa8[\\x80\\x90-\\x93\\x95-\\x97\\x99-\\xb3]|\\xa9[\\x80-\\x87])|\\x9d(?:[\\x90\\x96-\\x99][\\x80-\\xbf]|\\x91[\\x80-\\x94\\x96-\\xbf]|\\x92[\\x80-\\x9c\\x9e\\x9f\\xa2\\xa5\\xa6\\xa9-\\xac\\xae-\\xb9\\xbb\\xbd-\\xbf]|\\x93[\\x80-\\x83\\x85-\\xbf]|\\x94[\\x80-\\x85\\x87-\\x8a\\x8d-\\x94\\x96-\\x9c\\x9e-\\xb9\\xbb-\\xbe]|\\x95[\\x80-\\x84\\x86\\x8a-\\x90\\x92-\\xbf]|\\x9a[\\x80-\\xa5\\xa8-\\xbf]|\\x9b[\\x80\\x82-\\x9a\\x9c-\\xba\\xbc-\\xbf]|\\x9c[\\x80-\\x94\\x96-\\xb4\\xb6-\\xbf]|\\x9d[\\x80-\\x8e\\x90-\\xae\\xb0-\\xbf]|\\x9e[\\x80-\\x88\\x8a-\\xa8\\xaa-\\xbf]|\\x9f[\\x80-\\x82\\x84-\\x89\\x8e-\\xbf])|[\\xa0-\\xa9][\\x80-\\xbf]{2}|\\xaa(?:[\\x80-\\x9a][\\x80-\\xbf]|\\x9b[\\x80-\\x96])|\\xaf(?:[\\xa0-\\xa7][\\x80-\\xbf]|\\xa8[\\x80-\\x9d])))'); },
            function () { return eq(re_cclass('[\\d\\w]'), '(?:[0-9A-Z_a-z]|\\xc2[\\xaa\\xb2\\xb3\\xb5\\xb9\\xba\\xbc-\\xbe]|\\xc3[\\x80-\\x96\\x98-\\xb6\\xb8-\\xbf]|[\\xc4-\\xc8\\xca\\xd0\\xd1\\xda][\\x80-\\xbf]|\\xc9[\\x80\\x81\\x90-\\xbf]|\\xcb[\\x80\\x81\\x86-\\x91\\xa0-\\xa4\\xae]|\\xcd\\xba|\\xce[\\x86\\x88-\\x8a\\x8c\\x8e-\\xa1\\xa3-\\xbf]|\\xcf[\\x80-\\x8e\\x90-\\xb5\\xb7-\\xbf]|\\xd2[\\x80\\x81\\x8a-\\xbf]|\\xd3[\\x80-\\x8e\\x90-\\xb9]|\\xd4[\\x80-\\x8f\\xb1-\\xbf]|\\xd5[\\x80-\\x96\\x99\\xa1-\\xbf]|\\xd6[\\x80-\\x87]|\\xd7[\\x90-\\xaa\\xb0-\\xb2]|\\xd8[\\xa1-\\xba]|\\xd9[\\x80-\\x8a\\xa0-\\xa9\\xae\\xaf\\xb1-\\xbf]|\\xdb[\\x80-\\x93\\x95\\xa5\\xa6\\xae-\\xbc\\xbf]|\\xdc[\\x90\\x92-\\xaf]|\\xdd[\\x8d-\\xad]|\\xde[\\x80-\\xa5\\xb1]|\\xe0(?:\\xa4[\\x84-\\xb9\\xbd]|\\xa5[\\x90\\x98-\\xa1\\xa6-\\xaf\\xbd]|\\xa6[\\x85-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb6-\\xb9\\xbd]|\\xa7[\\x8e\\x9c\\x9d\\x9f-\\xa1\\xa6-\\xb1\\xb4-\\xb7\\xb9]|\\xa8[\\x85-\\x8a\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5\\xb6\\xb8\\xb9]|\\xa9[\\x99-\\x9c\\x9e\\xa6-\\xaf\\xb2-\\xb4]|\\xaa[\\x85-\\x8d\\x8f-\\x91\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xab[\\x90\\xa0\\xa1\\xa6-\\xaf]|\\xac[\\x85-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xad[\\x9c\\x9d\\x9f-\\xa1\\xa6-\\xaf\\xb1]|\\xae[\\x83\\x85-\\x8a\\x8e-\\x90\\x92-\\x95\\x99\\x9a\\x9c\\x9e\\x9f\\xa3\\xa4\\xa8-\\xaa\\xae-\\xb9]|\\xaf[\\xa6-\\xb2]|\\xb0[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9]|[\\xb1\\xb5][\\xa0\\xa1\\xa6-\\xaf]|\\xb2[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9\\xbd]|\\xb3[\\x9e\\xa0\\xa1\\xa6-\\xaf]|\\xb4[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb9]|\\xb6[\\x85-\\x96\\x9a-\\xb1\\xb3-\\xbb\\xbd]|\\xb7[\\x80-\\x86]|\\xb8[\\x81-\\xb0\\xb2\\xb3]|\\xb9[\\x80-\\x86\\x90-\\x99]|\\xba[\\x81\\x82\\x84\\x87\\x88\\x8a\\x8d\\x94-\\x97\\x99-\\x9f\\xa1-\\xa3\\xa5\\xa7\\xaa\\xab\\xad-\\xb0\\xb2\\xb3\\xbd]|\\xbb[\\x80-\\x84\\x86\\x90-\\x99\\x9c\\x9d]|\\xbc[\\x80\\xa0-\\xb3]|\\xbd[\\x80-\\x87\\x89-\\xaa]|\\xbe[\\x88-\\x8b])|\\xe1(?:\\x80[\\x80-\\xa1\\xa3-\\xa7\\xa9\\xaa]|\\x81[\\x80-\\x89\\x90-\\x95]|\\x82[\\xa0-\\xbf]|\\x83[\\x80-\\x85\\x90-\\xba\\xbc]|[\\x84\\x88\\x91-\\x98\\xb4-\\xb6\\xb8\\xb9][\\x80-\\xbf]|\\x85[\\x80-\\x99\\x9f-\\xbf]|\\x86[\\x80-\\xa2\\xa8-\\xbf]|[\\x87\\xbb][\\x80-\\xb9]|\\x89[\\x80-\\x88\\x8a-\\x8d\\x90-\\x96\\x98\\x9a-\\x9d\\xa0-\\xbf]|\\x8a[\\x80-\\x88\\x8a-\\x8d\\x90-\\xb0\\xb2-\\xb5\\xb8-\\xbe]|\\x8b[\\x80\\x82-\\x85\\x88-\\x96\\x98-\\xbf]|\\x8c[\\x80-\\x90\\x92-\\x95\\x98-\\xbf]|\\x8d[\\x80-\\x9a\\xa9-\\xbc]|\\x8e[\\x80-\\x8f\\xa0-\\xbf]|\\x8f[\\x80-\\xb4]|\\x90[\\x81-\\xbf]|\\x99[\\x80-\\xac\\xaf-\\xb6]|\\x9a[\\x81-\\x9a\\xa0-\\xbf]|\\x9b[\\x80-\\xaa\\xae-\\xb0]|\\x9c[\\x80-\\x8c\\x8e-\\x91\\xa0-\\xb1]|\\x9d[\\x80-\\x91\\xa0-\\xac\\xae-\\xb0]|\\x9e[\\x80-\\xb3]|\\x9f[\\x97\\x9c\\xa0-\\xa9\\xb0-\\xb9]|\\xa0[\\x90-\\x99\\xa0-\\xbf]|\\xa1[\\x80-\\xb7]|\\xa2[\\x80-\\xa8]|\\xa4[\\x80-\\x9c]|\\xa5[\\x86-\\xad\\xb0-\\xb4]|\\xa6[\\x80-\\xa9]|\\xa7[\\x81-\\x87\\x90-\\x99]|\\xa8[\\x80-\\x96]|\\xba[\\x80-\\x9b\\xa0-\\xbf]|\\xbc[\\x80-\\x95\\x98-\\x9d\\xa0-\\xbf]|\\xbd[\\x80-\\x85\\x88-\\x8d\\x90-\\x97\\x99\\x9b\\x9d\\x9f-\\xbd]|\\xbe[\\x80-\\xb4\\xb6-\\xbc\\xbe]|\\xbf[\\x82-\\x84\\x86-\\x8c\\x90-\\x93\\x96-\\x9b\\xa0-\\xac\\xb2-\\xb4\\xb6-\\xbc])|\\xe2(?:\\x81[\\xb0\\xb1\\xb4-\\xb9\\xbf]|\\x82[\\x80-\\x89\\x90-\\x94]|\\x84[\\x82\\x87\\x8a-\\x93\\x95\\x99-\\x9d\\xa4\\xa6\\xa8\\xaa-\\xad\\xaf-\\xb1\\xb3-\\xb9\\xbc-\\xbf]|\\x85[\\x85-\\x89\\x93-\\xbf]|\\x86[\\x80-\\x82]|\\x91[\\xa0-\\xbf]|\\x92[\\x80-\\x9b]|\\x93[\\xaa-\\xbf]|\\x9d[\\xb6-\\xbf]|\\x9e[\\x80-\\x93]|\\xb0[\\x80-\\xae\\xb0-\\xbf]|\\xb1[\\x80-\\x9e]|\\xb2[\\x80-\\xbf]|\\xb3[\\x80-\\xa4\\xbd]|\\xb4[\\x80-\\xa5\\xb0-\\xbf]|\\xb5[\\x80-\\xa5\\xaf]|\\xb6[\\x80-\\x96\\xa0-\\xa6\\xa8-\\xae\\xb0-\\xb6\\xb8-\\xbe]|\\xb7[\\x80-\\x86\\x88-\\x8e\\x90-\\x96\\x98-\\x9e])|\\xe3(?:\\x80[\\x85-\\x87\\xa1-\\xa9\\xb1-\\xb5\\xb8-\\xbc]|\\x81[\\x81-\\xbf]|\\x82[\\x80-\\x96\\x9d-\\x9f\\xa1-\\xbf]|\\x83[\\x80-\\xba\\xbc-\\xbf]|\\x84[\\x85-\\xac\\xb1-\\xbf]|[\\x85\\x90-\\xbf][\\x80-\\xbf]|\\x86[\\x80-\\x8e\\x92-\\x95\\xa0-\\xb7]|\\x87[\\xb0-\\xbf]|\\x88[\\xa0-\\xa9]|\\x89[\\x91-\\x9f]|\\x8a[\\x80-\\x89\\xb1-\\xbf])|\\xe4(?:[\\x80-\\xb5\\xb8-\\xbf][\\x80-\\xbf]|\\xb6[\\x80-\\xb5])|[\\xe5-\\xe8\\xeb\\xec][\\x80-\\xbf]{2}|\\xe9(?:[\\x80-\\xbd][\\x80-\\xbf]|\\xbe[\\x80-\\xbb])|\\xea(?:[\\x80-\\x91\\xb0-\\xbf][\\x80-\\xbf]|\\x92[\\x80-\\x8c]|\\xa0[\\x80\\x81\\x83-\\x85\\x87-\\x8a\\x8c-\\xa2])|\\xed(?:[\\x80-\\x9d][\\x80-\\xbf]|\\x9e[\\x80-\\xa3])|\\xef(?:[\\xa4-\\xa7\\xaa\\xb0-\\xb3\\xba][\\x80-\\xbf]|\\xa8[\\x80-\\xad\\xb0-\\xbf]|\\xa9[\\x80-\\xaa\\xb0-\\xbf]|\\xab[\\x80-\\x99]|\\xac[\\x80-\\x86\\x93-\\x97\\x9d\\x9f-\\xa8\\xaa-\\xb6\\xb8-\\xbc\\xbe]|\\xad[\\x80\\x81\\x83\\x84\\x86-\\xbf]|\\xae[\\x80-\\xb1]|\\xaf[\\x93-\\xbf]|\\xb4[\\x80-\\xbd]|\\xb5[\\x90-\\xbf]|\\xb6[\\x80-\\x8f\\x92-\\xbf]|\\xb7[\\x80-\\x87\\xb0-\\xbb]|\\xb9[\\xb0-\\xb4\\xb6-\\xbf]|\\xbb[\\x80-\\xbc]|\\xbc[\\x90-\\x99\\xa1-\\xba]|\\xbd[\\x81-\\x9a\\xa6-\\xbf]|\\xbe[\\x80-\\xbe]|\\xbf[\\x82-\\x87\\x8a-\\x8f\\x92-\\x97\\x9a-\\x9c])|\\xf0(?:\\x90(?:\\x80[\\x80-\\x8b\\x8d-\\xa6\\xa8-\\xba\\xbc\\xbd\\xbf]|\\x81[\\x80-\\x8d\\x90-\\x9d]|[\\x82\\x90\\x91][\\x80-\\xbf]|\\x83[\\x80-\\xba]|\\x84[\\x87-\\xb3]|\\x85[\\x80-\\xb8]|\\x86\\x8a|\\x8c[\\x80-\\x9e\\xa0-\\xa3\\xb0-\\xbf]|\\x8d[\\x80-\\x8a]|\\x8e[\\x80-\\x9d\\xa0-\\xbf]|\\x8f[\\x80-\\x83\\x88-\\x8f\\x91-\\x95]|\\x92[\\x80-\\x9d\\xa0-\\xa9]|\\xa0[\\x80-\\x85\\x88\\x8a-\\xb5\\xb7\\xb8\\xbc\\xbf]|\\xa8[\\x80\\x90-\\x93\\x95-\\x97\\x99-\\xb3]|\\xa9[\\x80-\\x87])|\\x9d(?:[\\x90\\x96-\\x99][\\x80-\\xbf]|\\x91[\\x80-\\x94\\x96-\\xbf]|\\x92[\\x80-\\x9c\\x9e\\x9f\\xa2\\xa5\\xa6\\xa9-\\xac\\xae-\\xb9\\xbb\\xbd-\\xbf]|\\x93[\\x80-\\x83\\x85-\\xbf]|\\x94[\\x80-\\x85\\x87-\\x8a\\x8d-\\x94\\x96-\\x9c\\x9e-\\xb9\\xbb-\\xbe]|\\x95[\\x80-\\x84\\x86\\x8a-\\x90\\x92-\\xbf]|\\x9a[\\x80-\\xa5\\xa8-\\xbf]|\\x9b[\\x80\\x82-\\x9a\\x9c-\\xba\\xbc-\\xbf]|\\x9c[\\x80-\\x94\\x96-\\xb4\\xb6-\\xbf]|\\x9d[\\x80-\\x8e\\x90-\\xae\\xb0-\\xbf]|\\x9e[\\x80-\\x88\\x8a-\\xa8\\xaa-\\xbf]|\\x9f[\\x80-\\x82\\x84-\\x89\\x8e-\\xbf])|[\\xa0-\\xa9][\\x80-\\xbf]{2}|\\xaa(?:[\\x80-\\x9a][\\x80-\\xbf]|\\x9b[\\x80-\\x96])|\\xaf(?:[\\xa0-\\xa7][\\x80-\\xbf]|\\xa8[\\x80-\\x9d])))'); },
            function () { return eq(re_cclass('[^\\s]'), '(?:[\\x01-\\x08\\x0e-\\x1b\\!-\\x7f\\xff]|\\xc2[\\x80-\\x84\\x86-\\x9f\\xa1-\\xbf]|[\\xc3-\\xdf][\\x80-\\xbf]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|\\xe1(?:[\\x80-\\x99\\x9b-\\xbf][\\x80-\\xbf]|\\x9a[\\x81-\\xbf])|\\xe2(?:\\x80[\\x8c-\\xa7\\xaa-\\xae\\xb0-\\xbf]|\\x81[\\x80-\\x9e\\xa0-\\xbf]|[\\x82-\\xbf][\\x80-\\xbf])|\\xe3(?:\\x80[\\x81-\\xbf]|[\\x81-\\xbf][\\x80-\\xbf])|[\\xe4-\\xef][\\x80-\\xbf]{2}|\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[^\\d]'), '(?:[\\x01-\\/\\:-\\x7f\\xff]|\\xc2[\\x80-\\xb1\\xb4-\\xb8\\xba-\\xbf]|[\\xc3-\\xd8\\xda\\xdc-\\xdf][\\x80-\\xbf]|\\xd9[\\x80-\\x9f\\xaa-\\xbf]|\\xdb[\\x80-\\xaf\\xba-\\xbf]|\\xe0(?:[\\xa0-\\xa4\\xa6\\xa8\\xaa\\xac\\xae\\xb0\\xb2\\xb4\\xb6-\\xb8\\xba\\xbd-\\xbf][\\x80-\\xbf]|[\\xa5\\xa7\\xa9\\xab\\xad\\xaf\\xb1\\xb3\\xb5][\\x80-\\xa5\\xb0-\\xbf]|[\\xb9\\xbb][\\x80-\\x8f\\x9a-\\xbf]|\\xbc[\\x80-\\x9f\\xaa-\\xbf])|\\xe1(?:[\\x80\\x82-\\x8c\\x8e-\\x9e\\xa1-\\xa4\\xa6\\xa8-\\xbf][\\x80-\\xbf]|\\x81[\\x8a-\\xbf]|\\x8d[\\x80-\\xa8\\xb2-\\xbf]|\\x9f[\\x80-\\x9f\\xaa-\\xbf]|[\\xa0\\xa7][\\x80-\\x8f\\x9a-\\xbf]|\\xa5[\\x80-\\x85\\x90-\\xbf])|\\xe2(?:[\\x80\\x83-\\x90\\x94-\\x9c\\x9f-\\xbf][\\x80-\\xbf]|\\x81[\\x80-\\xaf\\xb1-\\xb3\\xba-\\xbf]|\\x82[\\x8a-\\xbf]|\\x91[\\x80-\\x9f\\xa9-\\xb3\\xbd-\\xbf]|\\x92[\\x80-\\x87\\x91-\\xbf]|\\x93[\\x80-\\xa9\\xab-\\xb4\\xbe]|\\x9d[\\x80-\\xb5\\xbf]|\\x9e[\\x89\\x93-\\xbf])|[\\xe3-\\xee][\\x80-\\xbf]{2}|\\xef(?:[\\x80-\\xbb\\xbd-\\xbf][\\x80-\\xbf]|\\xbc[\\x80-\\x8f\\x9a-\\xbf])|\\xf0(?:\\x90(?:[\\x80-\\x91\\x93-\\xa8\\xaa-\\xbf][\\x80-\\xbf]|\\x92[\\x80-\\x9f\\xaa-\\xbf]|\\xa9[\\x84-\\xbf])|[\\x91-\\x9c\\x9e-\\xbf][\\x80-\\xbf]{2}|\\x9d(?:[\\x80-\\x9e\\xa0-\\xbf][\\x80-\\xbf]|\\x9f[\\x80-\\x8d]))|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[^\\w]'), '(?:[\\x01-\\/\\:-\\@\\[-\\^\\`\\{-\\x7f\\xff]|\\xc2[\\x80-\\xa9\\xab-\\xb1\\xb4\\xb6-\\xb8\\xbb\\xbf]|\\xc3[\\x97\\xb7]|\\xc9[\\x82-\\x8f]|\\xcb[\\x82-\\x85\\x92-\\x9f\\xa5-\\xad\\xaf-\\xbf]|[\\xcc\\xdf][\\x80-\\xbf]|\\xcd[\\x80-\\xb9\\xbb-\\xbf]|\\xce[\\x80-\\x85\\x87\\x8b\\x8d\\xa2]|\\xcf[\\x8f\\xb6]|\\xd2[\\x82-\\x89]|\\xd3[\\x8f\\xba-\\xbf]|\\xd4[\\x90-\\xb0]|\\xd5[\\x97\\x98\\x9a-\\xa0]|\\xd6[\\x88-\\xbf]|\\xd7[\\x80-\\x8f\\xab-\\xaf\\xb3-\\xbf]|\\xd8[\\x80-\\xa0\\xbb-\\xbf]|\\xd9[\\x8b-\\x9f\\xaa-\\xad\\xb0]|\\xdb[\\x94\\x96-\\xa4\\xa7-\\xad\\xbd\\xbe]|\\xdc[\\x80-\\x8f\\x91\\xb0-\\xbf]|\\xdd[\\x80-\\x8c\\xae-\\xbf]|\\xde[\\xa6-\\xb0\\xb2-\\xbf]|\\xe0(?:[\\xa0-\\xa3\\xbf][\\x80-\\xbf]|\\xa4[\\x80-\\x83\\xba-\\xbc\\xbe\\xbf]|\\xa5[\\x80-\\x8f\\x91-\\x97\\xa2-\\xa5\\xb0-\\xbc\\xbe\\xbf]|\\xa6[\\x80-\\x84\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb3-\\xb5\\xba-\\xbc\\xbe\\xbf]|\\xa7[\\x80-\\x8d\\x8f-\\x9b\\x9e\\xa2-\\xa5\\xb2\\xb3\\xb8\\xba-\\xbf]|\\xa8[\\x80-\\x84\\x8b-\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xb7\\xba-\\xbf]|\\xa9[\\x80-\\x98\\x9d\\x9f-\\xa5\\xb0\\xb1\\xb5-\\xbf]|\\xaa[\\x80-\\x84\\x8e\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xab[\\x80-\\x8f\\x91-\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xac[\\x80-\\x84\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xad[\\x80-\\x9b\\x9e\\xa2-\\xa5\\xb0\\xb2-\\xbf]|\\xae[\\x80-\\x82\\x84\\x8b-\\x8d\\x91\\x96-\\x98\\x9b\\x9d\\xa0-\\xa2\\xa5-\\xa7\\xab-\\xad\\xba-\\xbf]|\\xaf[\\x80-\\xa5\\xb3-\\xbf]|\\xb0[\\x80-\\x84\\x8d\\x91\\xa9\\xb4\\xba-\\xbf]|[\\xb1\\xb5][\\x80-\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xb2[\\x80-\\x84\\x8d\\x91\\xa9\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xb3[\\x80-\\x9d\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xb4[\\x80-\\x84\\x8d\\x91\\xa9\\xba-\\xbf]|\\xb6[\\x80-\\x84\\x97-\\x99\\xb2\\xbc\\xbe\\xbf]|\\xb7[\\x87-\\xbf]|\\xb8[\\x80\\xb1\\xb4-\\xbf]|\\xb9[\\x87-\\x8f\\x9a-\\xbf]|\\xba[\\x80\\x83\\x85\\x86\\x89\\x8b\\x8c\\x8e-\\x93\\x98\\xa0\\xa4\\xa6\\xa8\\xa9\\xac\\xb1\\xb4-\\xbc\\xbe\\xbf]|\\xbb[\\x85\\x87-\\x8f\\x9a\\x9b\\x9e-\\xbf]|\\xbc[\\x81-\\x9f\\xb4-\\xbf]|\\xbd[\\x88\\xab-\\xbf]|\\xbe[\\x80-\\x87\\x8c-\\xbf])|\\xe1(?:\\x80[\\xa2\\xa8\\xab-\\xbf]|\\x81[\\x8a-\\x8f\\x96-\\xbf]|\\x82[\\x80-\\x9f]|\\x83[\\x86-\\x8f\\xbb\\xbd-\\xbf]|\\x85[\\x9a-\\x9e]|\\x86[\\xa3-\\xa7]|[\\x87\\xbb][\\xba-\\xbf]|\\x89[\\x89\\x8e\\x8f\\x97\\x99\\x9e\\x9f]|\\x8a[\\x89\\x8e\\x8f\\xb1\\xb6\\xb7\\xbf]|\\x8b[\\x81\\x86\\x87\\x97]|\\x8c[\\x91\\x96\\x97]|\\x8d[\\x9b-\\xa8\\xbd-\\xbf]|\\x8e[\\x90-\\x9f]|\\x8f[\\xb5-\\xbf]|\\x90\\x80|\\x99[\\xad\\xae\\xb7-\\xbf]|\\x9a[\\x80\\x9b-\\x9f]|\\x9b[\\xab-\\xad\\xb1-\\xbf]|\\x9c[\\x8d\\x92-\\x9f\\xb2-\\xbf]|\\x9d[\\x92-\\x9f\\xad\\xb1-\\xbf]|\\x9e[\\xb4-\\xbf]|\\x9f[\\x80-\\x96\\x98-\\x9b\\x9d-\\x9f\\xaa-\\xaf\\xba-\\xbf]|\\xa0[\\x80-\\x8f\\x9a-\\x9f]|\\xa1[\\xb8-\\xbf]|\\xa2[\\xa9-\\xbf]|[\\xa3\\xa9-\\xb3\\xb7][\\x80-\\xbf]|\\xa4[\\x9d-\\xbf]|\\xa5[\\x80-\\x85\\xae\\xaf\\xb5-\\xbf]|\\xa6[\\xaa-\\xbf]|\\xa7[\\x80\\x88-\\x8f\\x9a-\\xbf]|\\xa8[\\x97-\\xbf]|\\xba[\\x9c-\\x9f]|\\xbc[\\x96\\x97\\x9e\\x9f]|\\xbd[\\x86\\x87\\x8e\\x8f\\x98\\x9a\\x9c\\x9e\\xbe\\xbf]|\\xbe[\\xb5\\xbd\\xbf]|\\xbf[\\x80\\x81\\x85\\x8d-\\x8f\\x94\\x95\\x9c-\\x9f\\xad-\\xb1\\xb5\\xbd-\\xbf])|\\xe2(?:[\\x80\\x83\\x87-\\x90\\x94-\\x9c\\x9f-\\xaf\\xb8-\\xbf][\\x80-\\xbf]|\\x81[\\x80-\\xaf\\xb2\\xb3\\xba-\\xbe]|\\x82[\\x8a-\\x8f\\x95-\\xbf]|\\x84[\\x80\\x81\\x83-\\x86\\x88\\x89\\x94\\x96-\\x98\\x9e-\\xa3\\xa5\\xa7\\xa9\\xae\\xb2\\xba\\xbb]|\\x85[\\x80-\\x84\\x8a-\\x92]|\\x86[\\x83-\\xbf]|\\x91[\\x80-\\x9f]|\\x92[\\x9c-\\xbf]|\\x93[\\x80-\\xa9]|\\x9d[\\x80-\\xb5]|\\x9e[\\x94-\\xbf]|\\xb0\\xaf|\\xb1[\\x9f-\\xbf]|\\xb3[\\xa5-\\xbc\\xbe\\xbf]|\\xb4[\\xa6-\\xaf]|\\xb5[\\xa6-\\xae\\xb0-\\xbf]|\\xb6[\\x97-\\x9f\\xa7\\xaf\\xb7\\xbf]|\\xb7[\\x87\\x8f\\x97\\x9f-\\xbf])|\\xe3(?:\\x80[\\x80-\\x84\\x88-\\xa0\\xaa-\\xb0\\xb6\\xb7\\xbd-\\xbf]|\\x81\\x80|\\x82[\\x97-\\x9c\\xa0]|\\x83\\xbb|\\x84[\\x80-\\x84\\xad-\\xb0]|\\x86[\\x8f-\\x91\\x96-\\x9f\\xb8-\\xbf]|\\x87[\\x80-\\xaf]|\\x88[\\x80-\\x9f\\xaa-\\xbf]|\\x89[\\x80-\\x90\\xa0-\\xbf]|\\x8a[\\x8a-\\xb0]|[\\x8b-\\x8f][\\x80-\\xbf])|\\xe4(?:\\xb6[\\xb6-\\xbf]|\\xb7[\\x80-\\xbf])|\\xe9(?:\\xbe[\\xbc-\\xbf]|\\xbf[\\x80-\\xbf])|\\xea(?:\\x92[\\x8d-\\xbf]|[\\x93-\\x9f\\xa1-\\xaf][\\x80-\\xbf]|\\xa0[\\x82\\x86\\x8b\\xa3-\\xbf])|\\xed(?:\\x9e[\\xa4-\\xbf]|[\\x9f-\\xbf][\\x80-\\xbf])|\\xee[\\x80-\\xbf]{2}|\\xef(?:[\\x80-\\xa3\\xb8][\\x80-\\xbf]|\\xa8[\\xae\\xaf]|\\xa9[\\xab-\\xaf]|\\xab[\\x9a-\\xbf]|\\xac[\\x87-\\x92\\x98-\\x9c\\x9e\\xa9\\xb7\\xbd\\xbf]|\\xad[\\x82\\x85]|\\xae[\\xb2-\\xbf]|\\xaf[\\x80-\\x92]|\\xb4[\\xbe\\xbf]|\\xb5[\\x80-\\x8f]|\\xb6[\\x90\\x91]|\\xb7[\\x88-\\xaf\\xbc-\\xbf]|\\xb9[\\x80-\\xaf\\xb5]|\\xbb[\\xbd-\\xbf]|\\xbc[\\x80-\\x8f\\x9a-\\xa0\\xbb-\\xbf]|\\xbd[\\x80\\x9b-\\xa5]|\\xbe\\xbf|\\xbf[\\x80\\x81\\x88\\x89\\x90\\x91\\x98\\x99\\x9d-\\xbf])|\\xf0(?:\\x90(?:\\x80[\\x8c\\xa7\\xbb\\xbe]|\\x81[\\x8e\\x8f\\x9e-\\xbf]|\\x83[\\xbb-\\xbf]|\\x84[\\x80-\\x86\\xb4-\\xbf]|\\x85[\\xb9-\\xbf]|\\x86[\\x80-\\x89\\x8b-\\xbf]|[\\x87-\\x8b\\x93-\\x9f\\xa1-\\xa7\\xaa-\\xbf][\\x80-\\xbf]|\\x8c[\\x9f\\xa4-\\xaf]|\\x8d[\\x8b-\\xbf]|\\x8e[\\x9e\\x9f]|\\x8f[\\x84-\\x87\\x90\\x96-\\xbf]|\\x92[\\x9e\\x9f\\xaa-\\xbf]|\\xa0[\\x86\\x87\\x89\\xb6\\xb9-\\xbb\\xbd\\xbe]|\\xa8[\\x81-\\x8f\\x94\\x98\\xb4-\\xbf]|\\xa9[\\x88-\\xbf])|[\\x91-\\x9c\\x9e\\x9f\\xab-\\xae\\xb0-\\xbf][\\x80-\\xbf]{2}|\\x9d(?:[\\x80-\\x8f\\xa0-\\xbf][\\x80-\\xbf]|\\x91\\x95|\\x92[\\x9d\\xa0\\xa1\\xa3\\xa4\\xa7\\xa8\\xad\\xba\\xbc]|\\x93\\x84|\\x94[\\x86\\x8b\\x8c\\x95\\x9d\\xba\\xbf]|\\x95[\\x85\\x87-\\x89\\x91]|\\x9a[\\xa6\\xa7]|\\x9b[\\x81\\x9b\\xbb]|\\x9c[\\x95\\xb5]|\\x9d[\\x8f\\xaf]|\\x9e[\\x89\\xa9]|\\x9f[\\x83\\x8a-\\x8d])|\\xaa(?:\\x9b[\\x97-\\xbf]|[\\x9c-\\xbf][\\x80-\\xbf])|\\xaf(?:[\\x80-\\x9f\\xa9-\\xbf][\\x80-\\xbf]|\\xa8[\\x9e-\\xbf]))|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[^\\d\\w]'), '(?:[\\x01-\\/\\:-\\@\\[-\\^\\`\\{-\\x7f\\xff]|\\xc2[\\x80-\\xa9\\xab-\\xb1\\xb4\\xb6-\\xb8\\xbb\\xbf]|\\xc3[\\x97\\xb7]|\\xc9[\\x82-\\x8f]|\\xcb[\\x82-\\x85\\x92-\\x9f\\xa5-\\xad\\xaf-\\xbf]|[\\xcc\\xdf][\\x80-\\xbf]|\\xcd[\\x80-\\xb9\\xbb-\\xbf]|\\xce[\\x80-\\x85\\x87\\x8b\\x8d\\xa2]|\\xcf[\\x8f\\xb6]|\\xd2[\\x82-\\x89]|\\xd3[\\x8f\\xba-\\xbf]|\\xd4[\\x90-\\xb0]|\\xd5[\\x97\\x98\\x9a-\\xa0]|\\xd6[\\x88-\\xbf]|\\xd7[\\x80-\\x8f\\xab-\\xaf\\xb3-\\xbf]|\\xd8[\\x80-\\xa0\\xbb-\\xbf]|\\xd9[\\x8b-\\x9f\\xaa-\\xad\\xb0]|\\xdb[\\x94\\x96-\\xa4\\xa7-\\xad\\xbd\\xbe]|\\xdc[\\x80-\\x8f\\x91\\xb0-\\xbf]|\\xdd[\\x80-\\x8c\\xae-\\xbf]|\\xde[\\xa6-\\xb0\\xb2-\\xbf]|\\xe0(?:[\\xa0-\\xa3\\xbf][\\x80-\\xbf]|\\xa4[\\x80-\\x83\\xba-\\xbc\\xbe\\xbf]|\\xa5[\\x80-\\x8f\\x91-\\x97\\xa2-\\xa5\\xb0-\\xbc\\xbe\\xbf]|\\xa6[\\x80-\\x84\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb3-\\xb5\\xba-\\xbc\\xbe\\xbf]|\\xa7[\\x80-\\x8d\\x8f-\\x9b\\x9e\\xa2-\\xa5\\xb2\\xb3\\xb8\\xba-\\xbf]|\\xa8[\\x80-\\x84\\x8b-\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xb7\\xba-\\xbf]|\\xa9[\\x80-\\x98\\x9d\\x9f-\\xa5\\xb0\\xb1\\xb5-\\xbf]|\\xaa[\\x80-\\x84\\x8e\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xab[\\x80-\\x8f\\x91-\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xac[\\x80-\\x84\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xad[\\x80-\\x9b\\x9e\\xa2-\\xa5\\xb0\\xb2-\\xbf]|\\xae[\\x80-\\x82\\x84\\x8b-\\x8d\\x91\\x96-\\x98\\x9b\\x9d\\xa0-\\xa2\\xa5-\\xa7\\xab-\\xad\\xba-\\xbf]|\\xaf[\\x80-\\xa5\\xb3-\\xbf]|\\xb0[\\x80-\\x84\\x8d\\x91\\xa9\\xb4\\xba-\\xbf]|[\\xb1\\xb5][\\x80-\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xb2[\\x80-\\x84\\x8d\\x91\\xa9\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xb3[\\x80-\\x9d\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xb4[\\x80-\\x84\\x8d\\x91\\xa9\\xba-\\xbf]|\\xb6[\\x80-\\x84\\x97-\\x99\\xb2\\xbc\\xbe\\xbf]|\\xb7[\\x87-\\xbf]|\\xb8[\\x80\\xb1\\xb4-\\xbf]|\\xb9[\\x87-\\x8f\\x9a-\\xbf]|\\xba[\\x80\\x83\\x85\\x86\\x89\\x8b\\x8c\\x8e-\\x93\\x98\\xa0\\xa4\\xa6\\xa8\\xa9\\xac\\xb1\\xb4-\\xbc\\xbe\\xbf]|\\xbb[\\x85\\x87-\\x8f\\x9a\\x9b\\x9e-\\xbf]|\\xbc[\\x81-\\x9f\\xb4-\\xbf]|\\xbd[\\x88\\xab-\\xbf]|\\xbe[\\x80-\\x87\\x8c-\\xbf])|\\xe1(?:\\x80[\\xa2\\xa8\\xab-\\xbf]|\\x81[\\x8a-\\x8f\\x96-\\xbf]|\\x82[\\x80-\\x9f]|\\x83[\\x86-\\x8f\\xbb\\xbd-\\xbf]|\\x85[\\x9a-\\x9e]|\\x86[\\xa3-\\xa7]|[\\x87\\xbb][\\xba-\\xbf]|\\x89[\\x89\\x8e\\x8f\\x97\\x99\\x9e\\x9f]|\\x8a[\\x89\\x8e\\x8f\\xb1\\xb6\\xb7\\xbf]|\\x8b[\\x81\\x86\\x87\\x97]|\\x8c[\\x91\\x96\\x97]|\\x8d[\\x9b-\\xa8\\xbd-\\xbf]|\\x8e[\\x90-\\x9f]|\\x8f[\\xb5-\\xbf]|\\x90\\x80|\\x99[\\xad\\xae\\xb7-\\xbf]|\\x9a[\\x80\\x9b-\\x9f]|\\x9b[\\xab-\\xad\\xb1-\\xbf]|\\x9c[\\x8d\\x92-\\x9f\\xb2-\\xbf]|\\x9d[\\x92-\\x9f\\xad\\xb1-\\xbf]|\\x9e[\\xb4-\\xbf]|\\x9f[\\x80-\\x96\\x98-\\x9b\\x9d-\\x9f\\xaa-\\xaf\\xba-\\xbf]|\\xa0[\\x80-\\x8f\\x9a-\\x9f]|\\xa1[\\xb8-\\xbf]|\\xa2[\\xa9-\\xbf]|[\\xa3\\xa9-\\xb3\\xb7][\\x80-\\xbf]|\\xa4[\\x9d-\\xbf]|\\xa5[\\x80-\\x85\\xae\\xaf\\xb5-\\xbf]|\\xa6[\\xaa-\\xbf]|\\xa7[\\x80\\x88-\\x8f\\x9a-\\xbf]|\\xa8[\\x97-\\xbf]|\\xba[\\x9c-\\x9f]|\\xbc[\\x96\\x97\\x9e\\x9f]|\\xbd[\\x86\\x87\\x8e\\x8f\\x98\\x9a\\x9c\\x9e\\xbe\\xbf]|\\xbe[\\xb5\\xbd\\xbf]|\\xbf[\\x80\\x81\\x85\\x8d-\\x8f\\x94\\x95\\x9c-\\x9f\\xad-\\xb1\\xb5\\xbd-\\xbf])|\\xe2(?:[\\x80\\x83\\x87-\\x90\\x94-\\x9c\\x9f-\\xaf\\xb8-\\xbf][\\x80-\\xbf]|\\x81[\\x80-\\xaf\\xb2\\xb3\\xba-\\xbe]|\\x82[\\x8a-\\x8f\\x95-\\xbf]|\\x84[\\x80\\x81\\x83-\\x86\\x88\\x89\\x94\\x96-\\x98\\x9e-\\xa3\\xa5\\xa7\\xa9\\xae\\xb2\\xba\\xbb]|\\x85[\\x80-\\x84\\x8a-\\x92]|\\x86[\\x83-\\xbf]|\\x91[\\x80-\\x9f]|\\x92[\\x9c-\\xbf]|\\x93[\\x80-\\xa9]|\\x9d[\\x80-\\xb5]|\\x9e[\\x94-\\xbf]|\\xb0\\xaf|\\xb1[\\x9f-\\xbf]|\\xb3[\\xa5-\\xbc\\xbe\\xbf]|\\xb4[\\xa6-\\xaf]|\\xb5[\\xa6-\\xae\\xb0-\\xbf]|\\xb6[\\x97-\\x9f\\xa7\\xaf\\xb7\\xbf]|\\xb7[\\x87\\x8f\\x97\\x9f-\\xbf])|\\xe3(?:\\x80[\\x80-\\x84\\x88-\\xa0\\xaa-\\xb0\\xb6\\xb7\\xbd-\\xbf]|\\x81\\x80|\\x82[\\x97-\\x9c\\xa0]|\\x83\\xbb|\\x84[\\x80-\\x84\\xad-\\xb0]|\\x86[\\x8f-\\x91\\x96-\\x9f\\xb8-\\xbf]|\\x87[\\x80-\\xaf]|\\x88[\\x80-\\x9f\\xaa-\\xbf]|\\x89[\\x80-\\x90\\xa0-\\xbf]|\\x8a[\\x8a-\\xb0]|[\\x8b-\\x8f][\\x80-\\xbf])|\\xe4(?:\\xb6[\\xb6-\\xbf]|\\xb7[\\x80-\\xbf])|\\xe9(?:\\xbe[\\xbc-\\xbf]|\\xbf[\\x80-\\xbf])|\\xea(?:\\x92[\\x8d-\\xbf]|[\\x93-\\x9f\\xa1-\\xaf][\\x80-\\xbf]|\\xa0[\\x82\\x86\\x8b\\xa3-\\xbf])|\\xed(?:\\x9e[\\xa4-\\xbf]|[\\x9f-\\xbf][\\x80-\\xbf])|\\xee[\\x80-\\xbf]{2}|\\xef(?:[\\x80-\\xa3\\xb8][\\x80-\\xbf]|\\xa8[\\xae\\xaf]|\\xa9[\\xab-\\xaf]|\\xab[\\x9a-\\xbf]|\\xac[\\x87-\\x92\\x98-\\x9c\\x9e\\xa9\\xb7\\xbd\\xbf]|\\xad[\\x82\\x85]|\\xae[\\xb2-\\xbf]|\\xaf[\\x80-\\x92]|\\xb4[\\xbe\\xbf]|\\xb5[\\x80-\\x8f]|\\xb6[\\x90\\x91]|\\xb7[\\x88-\\xaf\\xbc-\\xbf]|\\xb9[\\x80-\\xaf\\xb5]|\\xbb[\\xbd-\\xbf]|\\xbc[\\x80-\\x8f\\x9a-\\xa0\\xbb-\\xbf]|\\xbd[\\x80\\x9b-\\xa5]|\\xbe\\xbf|\\xbf[\\x80\\x81\\x88\\x89\\x90\\x91\\x98\\x99\\x9d-\\xbf])|\\xf0(?:\\x90(?:\\x80[\\x8c\\xa7\\xbb\\xbe]|\\x81[\\x8e\\x8f\\x9e-\\xbf]|\\x83[\\xbb-\\xbf]|\\x84[\\x80-\\x86\\xb4-\\xbf]|\\x85[\\xb9-\\xbf]|\\x86[\\x80-\\x89\\x8b-\\xbf]|[\\x87-\\x8b\\x93-\\x9f\\xa1-\\xa7\\xaa-\\xbf][\\x80-\\xbf]|\\x8c[\\x9f\\xa4-\\xaf]|\\x8d[\\x8b-\\xbf]|\\x8e[\\x9e\\x9f]|\\x8f[\\x84-\\x87\\x90\\x96-\\xbf]|\\x92[\\x9e\\x9f\\xaa-\\xbf]|\\xa0[\\x86\\x87\\x89\\xb6\\xb9-\\xbb\\xbd\\xbe]|\\xa8[\\x81-\\x8f\\x94\\x98\\xb4-\\xbf]|\\xa9[\\x88-\\xbf])|[\\x91-\\x9c\\x9e\\x9f\\xab-\\xae\\xb0-\\xbf][\\x80-\\xbf]{2}|\\x9d(?:[\\x80-\\x8f\\xa0-\\xbf][\\x80-\\xbf]|\\x91\\x95|\\x92[\\x9d\\xa0\\xa1\\xa3\\xa4\\xa7\\xa8\\xad\\xba\\xbc]|\\x93\\x84|\\x94[\\x86\\x8b\\x8c\\x95\\x9d\\xba\\xbf]|\\x95[\\x85\\x87-\\x89\\x91]|\\x9a[\\xa6\\xa7]|\\x9b[\\x81\\x9b\\xbb]|\\x9c[\\x95\\xb5]|\\x9d[\\x8f\\xaf]|\\x9e[\\x89\\xa9]|\\x9f[\\x83\\x8a-\\x8d])|\\xaa(?:\\x9b[\\x97-\\xbf]|[\\x9c-\\xbf][\\x80-\\xbf])|\\xaf(?:[\\x80-\\x9f\\xa9-\\xbf][\\x80-\\xbf]|\\xa8[\\x9e-\\xbf]))|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass(utf16('[\xc2\x80-\xdf\xbf]')), '(?:[\\xc2-\\xdf][\\x80-\\xbf])'); },
            function () { return eq(re_cclass(utf16('[^\xc2\x80-\xdf\xbf]')), '(?:[\\x01-\\x7f\\xff]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|[\\xe1-\\xef][\\x80-\\xbf]{2}|\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { "UTF-16 + unpaired surrogates"; return eq(re_cclass('[\0-\\U0010FFFF]'), '(?:[\\x01-\\x7f\\xff]|[\\xc2-\\xdf][\\x80-\\xbf]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|[\\xe1-\\xef][\\x80-\\xbf]{2}|\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { "valid UTF-16"; return eq(re_cclass('[\0-\ud7ff\ue000-\\U0010FFFF]'), '(?:[\\x01-\\x7f\\xff]|[\\xc2-\\xdf][\\x80-\\xbf]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|[\\xe1-\\xec\\xee\\xef][\\x80-\\xbf]{2}|\\xed[\\x80-\\x9f][\\x80-\\xbf]|\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { "UCS-2"; return eq(re_cclass('[\0-\uffff]'), '(?:[\\x01-\\x7f\\xff]|[\\xc2-\\xdf][\\x80-\\xbf]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|[\\xe1-\\xef][\\x80-\\xbf]{2})'); },
            function () { "non-UCS-2"; return eq(re_cclass('[\\U00010000-\\U0010ffff]'), '(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { "negated UTF-16 + unpaired surrogates"; return eq(re_cclass('[^\0-\\U0010FFFF]'), '[^\\x01-\\xff]'); },
            function () { "negated valid UTF-16"; return eq(re_cclass('[^\0-\ud7ff\ue000-\\U0010FFFF]'), '(?:\\xed[\\xa0-\\xbf][\\x80-\\xbf])'); },
            function () { "negated UCS-2"; return eq(re_cclass('[^\0-\uffff]'), '(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { "negated non-UCS-2"; return eq(re_cclass('[^\\U00010000-\\U0010ffff]'), '(?:[\\x01-\\x7f\\xff]|[\\xc2-\\xdf][\\x80-\\xbf]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|[\\xe1-\\xef][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[\\S]'), '(?:[\\x01-\\x08\\x0e-\\x1b\\!-\\x7f\\xff]|\\xc2[\\x80-\\x84\\x86-\\x9f\\xa1-\\xbf]|[\\xc3-\\xdf][\\x80-\\xbf]|\\xe0[\\xa0-\\xbf][\\x80-\\xbf]|\\xe1(?:[\\x80-\\x99\\x9b-\\xbf][\\x80-\\xbf]|\\x9a[\\x81-\\xbf])|\\xe2(?:\\x80[\\x8c-\\xa7\\xaa-\\xae\\xb0-\\xbf]|\\x81[\\x80-\\x9e\\xa0-\\xbf]|[\\x82-\\xbf][\\x80-\\xbf])|\\xe3(?:\\x80[\\x81-\\xbf]|[\\x81-\\xbf][\\x80-\\xbf])|[\\xe4-\\xef][\\x80-\\xbf]{2}|\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2}|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[\\D]'), '(?:[\\x01-\\/\\:-\\x7f\\xff]|\\xc2[\\x80-\\xb1\\xb4-\\xb8\\xba-\\xbf]|[\\xc3-\\xd8\\xda\\xdc-\\xdf][\\x80-\\xbf]|\\xd9[\\x80-\\x9f\\xaa-\\xbf]|\\xdb[\\x80-\\xaf\\xba-\\xbf]|\\xe0(?:[\\xa0-\\xa4\\xa6\\xa8\\xaa\\xac\\xae\\xb0\\xb2\\xb4\\xb6-\\xb8\\xba\\xbd-\\xbf][\\x80-\\xbf]|[\\xa5\\xa7\\xa9\\xab\\xad\\xaf\\xb1\\xb3\\xb5][\\x80-\\xa5\\xb0-\\xbf]|[\\xb9\\xbb][\\x80-\\x8f\\x9a-\\xbf]|\\xbc[\\x80-\\x9f\\xaa-\\xbf])|\\xe1(?:\\x81[\\x8a-\\xbf]|[\\x82-\\x8c\\x8e-\\x9e\\xa1-\\xa4\\xa6\\xa8-\\xbf][\\x80-\\xbf]|\\x8d[\\x80-\\xa8\\xb2-\\xbf]|\\x9f[\\x80-\\x9f\\xaa-\\xbf]|[\\xa0\\xa7][\\x80-\\x8f\\x9a-\\xbf]|\\xa5[\\x80-\\x85\\x90-\\xbf])|\\xe2(?:[\\x80\\x83-\\x90\\x94-\\x9c\\x9f-\\xbf][\\x80-\\xbf]|\\x81[\\x80-\\xaf\\xb1-\\xb3\\xba-\\xbf]|\\x82[\\x8a-\\xbf]|\\x91[\\x80-\\x9f\\xa9-\\xb3\\xbd-\\xbf]|\\x92[\\x80-\\x87\\x91-\\xbf]|\\x93[\\x80-\\xa9\\xab-\\xb4\\xbe]|\\x9d[\\x80-\\xb5\\xbf]|\\x9e[\\x89\\x93-\\xbf])|[\\xe3-\\xee][\\x80-\\xbf]{2}|\\xef(?:[\\x80-\\xbb\\xbd-\\xbf][\\x80-\\xbf]|\\xbc[\\x80-\\x8f\\x9a-\\xbf])|\\xf0(?:\\x90(?:[\\x80-\\x91\\x93-\\xa8\\xaa-\\xbf][\\x80-\\xbf]|\\x92[\\x80-\\x9f\\xaa-\\xbf]|\\xa9[\\x84-\\xbf])|[\\x91-\\x9c\\x9e-\\xbf][\\x80-\\xbf]{2}|\\x9d(?:[\\x80-\\x9e\\xa0-\\xbf][\\x80-\\xbf]|\\x9f[\\x80-\\x8d]))|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[\\W]'), '(?:[\\x01-\\/\\:-\\@\\[-\\^\\`\\{-\\x7f\\xff]|\\xc2[\\x80-\\xa9\\xab-\\xb1\\xb4\\xb6-\\xb8\\xbb\\xbf]|\\xc3[\\x97\\xb7]|\\xc9[\\x82-\\x8f]|\\xcb[\\x82-\\x85\\x92-\\x9f\\xa5-\\xad\\xaf-\\xbf]|[\\xcc\\xdf][\\x80-\\xbf]|\\xcd[\\x80-\\xb9\\xbb-\\xbf]|\\xce[\\x80-\\x85\\x87\\x8b\\x8d\\xa2]|\\xcf[\\x8f\\xb6]|\\xd2[\\x82-\\x89]|\\xd3[\\x8f\\xba-\\xbf]|\\xd4[\\x90-\\xb0]|\\xd5[\\x97\\x98\\x9a-\\xa0]|\\xd6[\\x88-\\xbf]|\\xd7[\\x80-\\x8f\\xab-\\xaf\\xb3-\\xbf]|\\xd8[\\x80-\\xa0\\xbb-\\xbf]|\\xd9[\\x8b-\\x9f\\xaa-\\xad\\xb0]|\\xdb[\\x94\\x96-\\xa4\\xa7-\\xad\\xbd\\xbe]|\\xdc[\\x80-\\x8f\\x91\\xb0-\\xbf]|\\xdd[\\x80-\\x8c\\xae-\\xbf]|\\xde[\\xa6-\\xb0\\xb2-\\xbf]|\\xe0(?:[\\xa0-\\xa3\\xbf][\\x80-\\xbf]|\\xa4[\\x80-\\x83\\xba-\\xbc\\xbe\\xbf]|\\xa5[\\x80-\\x8f\\x91-\\x97\\xa2-\\xa5\\xb0-\\xbc\\xbe\\xbf]|\\xa6[\\x80-\\x84\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb3-\\xb5\\xba-\\xbc\\xbe\\xbf]|\\xa7[\\x80-\\x8d\\x8f-\\x9b\\x9e\\xa2-\\xa5\\xb2\\xb3\\xb8\\xba-\\xbf]|\\xa8[\\x80-\\x84\\x8b-\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xb7\\xba-\\xbf]|\\xa9[\\x80-\\x98\\x9d\\x9f-\\xa5\\xb0\\xb1\\xb5-\\xbf]|\\xaa[\\x80-\\x84\\x8e\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xab[\\x80-\\x8f\\x91-\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xac[\\x80-\\x84\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xad[\\x80-\\x9b\\x9e\\xa2-\\xa5\\xb0\\xb2-\\xbf]|\\xae[\\x80-\\x82\\x84\\x8b-\\x8d\\x91\\x96-\\x98\\x9b\\x9d\\xa0-\\xa2\\xa5-\\xa7\\xab-\\xad\\xba-\\xbf]|\\xaf[\\x80-\\xa5\\xb3-\\xbf]|\\xb0[\\x80-\\x84\\x8d\\x91\\xa9\\xb4\\xba-\\xbf]|[\\xb1\\xb5][\\x80-\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xb2[\\x80-\\x84\\x8d\\x91\\xa9\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xb3[\\x80-\\x9d\\x9f\\xa2-\\xa5\\xb0-\\xbf]|\\xb4[\\x80-\\x84\\x8d\\x91\\xa9\\xba-\\xbf]|\\xb6[\\x80-\\x84\\x97-\\x99\\xb2\\xbc\\xbe\\xbf]|\\xb7[\\x87-\\xbf]|\\xb8[\\x80\\xb1\\xb4-\\xbf]|\\xb9[\\x87-\\x8f\\x9a-\\xbf]|\\xba[\\x80\\x83\\x85\\x86\\x89\\x8b\\x8c\\x8e-\\x93\\x98\\xa0\\xa4\\xa6\\xa8\\xa9\\xac\\xb1\\xb4-\\xbc\\xbe\\xbf]|\\xbb[\\x85\\x87-\\x8f\\x9a\\x9b\\x9e-\\xbf]|\\xbc[\\x81-\\x9f\\xb4-\\xbf]|\\xbd[\\x88\\xab-\\xbf]|\\xbe[\\x80-\\x87\\x8c-\\xbf])|\\xe1(?:\\x80[\\xa2\\xa8\\xab-\\xbf]|\\x81[\\x8a-\\x8f\\x96-\\xbf]|\\x82[\\x80-\\x9f]|\\x83[\\x86-\\x8f\\xbb\\xbd-\\xbf]|\\x85[\\x9a-\\x9e]|\\x86[\\xa3-\\xa7]|[\\x87\\xbb][\\xba-\\xbf]|\\x89[\\x89\\x8e\\x8f\\x97\\x99\\x9e\\x9f]|\\x8a[\\x89\\x8e\\x8f\\xb1\\xb6\\xb7\\xbf]|\\x8b[\\x81\\x86\\x87\\x97]|\\x8c[\\x91\\x96\\x97]|\\x8d[\\x9b-\\xa8\\xbd-\\xbf]|\\x8e[\\x90-\\x9f]|\\x8f[\\xb5-\\xbf]|\\x90\\x80|\\x99[\\xad\\xae\\xb7-\\xbf]|\\x9a[\\x80\\x9b-\\x9f]|\\x9b[\\xab-\\xad\\xb1-\\xbf]|\\x9c[\\x8d\\x92-\\x9f\\xb2-\\xbf]|\\x9d[\\x92-\\x9f\\xad\\xb1-\\xbf]|\\x9e[\\xb4-\\xbf]|\\x9f[\\x80-\\x96\\x98-\\x9b\\x9d-\\x9f\\xaa-\\xaf\\xba-\\xbf]|\\xa0[\\x80-\\x8f\\x9a-\\x9f]|\\xa1[\\xb8-\\xbf]|\\xa2[\\xa9-\\xbf]|[\\xa3\\xa9-\\xb3\\xb7][\\x80-\\xbf]|\\xa4[\\x9d-\\xbf]|\\xa5[\\x80-\\x85\\xae\\xaf\\xb5-\\xbf]|\\xa6[\\xaa-\\xbf]|\\xa7[\\x80\\x88-\\x8f\\x9a-\\xbf]|\\xa8[\\x97-\\xbf]|\\xba[\\x9c-\\x9f]|\\xbc[\\x96\\x97\\x9e\\x9f]|\\xbd[\\x86\\x87\\x8e\\x8f\\x98\\x9a\\x9c\\x9e\\xbe\\xbf]|\\xbe[\\xb5\\xbd\\xbf]|\\xbf[\\x80\\x81\\x85\\x8d-\\x8f\\x94\\x95\\x9c-\\x9f\\xad-\\xb1\\xb5\\xbd-\\xbf])|\\xe2(?:[\\x80\\x83\\x87-\\x90\\x94-\\x9c\\x9f-\\xaf\\xb8-\\xbf][\\x80-\\xbf]|\\x81[\\x80-\\xaf\\xb2\\xb3\\xba-\\xbe]|\\x82[\\x8a-\\x8f\\x95-\\xbf]|\\x84[\\x80\\x81\\x83-\\x86\\x88\\x89\\x94\\x96-\\x98\\x9e-\\xa3\\xa5\\xa7\\xa9\\xae\\xb2\\xba\\xbb]|\\x85[\\x80-\\x84\\x8a-\\x92]|\\x86[\\x83-\\xbf]|\\x91[\\x80-\\x9f]|\\x92[\\x9c-\\xbf]|\\x93[\\x80-\\xa9]|\\x9d[\\x80-\\xb5]|\\x9e[\\x94-\\xbf]|\\xb0\\xaf|\\xb1[\\x9f-\\xbf]|\\xb3[\\xa5-\\xbc\\xbe\\xbf]|\\xb4[\\xa6-\\xaf]|\\xb5[\\xa6-\\xae\\xb0-\\xbf]|\\xb6[\\x97-\\x9f\\xa7\\xaf\\xb7\\xbf]|\\xb7[\\x87\\x8f\\x97\\x9f-\\xbf])|\\xe3(?:\\x80[\\x80-\\x84\\x88-\\xa0\\xaa-\\xb0\\xb6\\xb7\\xbd-\\xbf]|\\x81\\x80|\\x82[\\x97-\\x9c\\xa0]|\\x83\\xbb|\\x84[\\x80-\\x84\\xad-\\xb0]|\\x86[\\x8f-\\x91\\x96-\\x9f\\xb8-\\xbf]|\\x87[\\x80-\\xaf]|\\x88[\\x80-\\x9f\\xaa-\\xbf]|\\x89[\\x80-\\x90\\xa0-\\xbf]|\\x8a[\\x8a-\\xb0]|[\\x8b-\\x8f][\\x80-\\xbf])|\\xe4(?:\\xb6[\\xb6-\\xbf]|\\xb7[\\x80-\\xbf])|\\xe9(?:\\xbe[\\xbc-\\xbf]|\\xbf[\\x80-\\xbf])|\\xea(?:\\x92[\\x8d-\\xbf]|[\\x93-\\x9f\\xa1-\\xaf][\\x80-\\xbf]|\\xa0[\\x82\\x86\\x8b\\xa3-\\xbf])|\\xed(?:\\x9e[\\xa4-\\xbf]|[\\x9f-\\xbf][\\x80-\\xbf])|\\xee[\\x80-\\xbf]{2}|\\xef(?:[\\x80-\\xa3\\xb8][\\x80-\\xbf]|\\xa8[\\xae\\xaf]|\\xa9[\\xab-\\xaf]|\\xab[\\x9a-\\xbf]|\\xac[\\x87-\\x92\\x98-\\x9c\\x9e\\xa9\\xb7\\xbd\\xbf]|\\xad[\\x82\\x85]|\\xae[\\xb2-\\xbf]|\\xaf[\\x80-\\x92]|\\xb4[\\xbe\\xbf]|\\xb5[\\x80-\\x8f]|\\xb6[\\x90\\x91]|\\xb7[\\x88-\\xaf\\xbc-\\xbf]|\\xb9[\\x80-\\xaf\\xb5]|\\xbb[\\xbd-\\xbf]|\\xbc[\\x80-\\x8f\\x9a-\\xa0\\xbb-\\xbf]|\\xbd[\\x80\\x9b-\\xa5]|\\xbe\\xbf|\\xbf[\\x80\\x81\\x88\\x89\\x90\\x91\\x98\\x99\\x9d-\\xbf])|\\xf0(?:\\x90(?:\\x80[\\x8c\\xa7\\xbb\\xbe]|\\x81[\\x8e\\x8f\\x9e-\\xbf]|\\x83[\\xbb-\\xbf]|\\x84[\\x80-\\x86\\xb4-\\xbf]|\\x85[\\xb9-\\xbf]|\\x86[\\x80-\\x89\\x8b-\\xbf]|[\\x87-\\x8b\\x93-\\x9f\\xa1-\\xa7\\xaa-\\xbf][\\x80-\\xbf]|\\x8c[\\x9f\\xa4-\\xaf]|\\x8d[\\x8b-\\xbf]|\\x8e[\\x9e\\x9f]|\\x8f[\\x84-\\x87\\x90\\x96-\\xbf]|\\x92[\\x9e\\x9f\\xaa-\\xbf]|\\xa0[\\x86\\x87\\x89\\xb6\\xb9-\\xbb\\xbd\\xbe]|\\xa8[\\x81-\\x8f\\x94\\x98\\xb4-\\xbf]|\\xa9[\\x88-\\xbf])|[\\x91-\\x9c\\x9e\\x9f\\xab-\\xae\\xb0-\\xbf][\\x80-\\xbf]{2}|\\x9d(?:[\\x80-\\x8f\\xa0-\\xbf][\\x80-\\xbf]|\\x91\\x95|\\x92[\\x9d\\xa0\\xa1\\xa3\\xa4\\xa7\\xa8\\xad\\xba\\xbc]|\\x93\\x84|\\x94[\\x86\\x8b\\x8c\\x95\\x9d\\xba\\xbf]|\\x95[\\x85\\x87-\\x89\\x91]|\\x9a[\\xa6\\xa7]|\\x9b[\\x81\\x9b\\xbb]|\\x9c[\\x95\\xb5]|\\x9d[\\x8f\\xaf]|\\x9e[\\x89\\xa9]|\\x9f[\\x83\\x8a-\\x8d])|\\xaa(?:\\x9b[\\x97-\\xbf]|[\\x9c-\\xbf][\\x80-\\xbf])|\\xaf(?:[\\x80-\\x9f\\xa9-\\xbf][\\x80-\\xbf]|\\xa8[\\x9e-\\xbf]))|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[\\D\\W]'), '(?:[\\x01-\\/\\:-\\x7f\\xff]|\\xc2[\\x80-\\xb1\\xb4-\\xb8\\xba-\\xbf]|\\xc3[\\x97\\xb7]|[\\xc4-\\xc8\\xca\\xcc\\xd0\\xd1\\xda\\xdf][\\x80-\\xbf]|\\xc9[\\x82-\\x8f]|\\xcb[\\x82-\\x85\\x92-\\x9f\\xa5-\\xad\\xaf-\\xbf]|[\\xcd\\xd8][\\xbb-\\xbf]|\\xce[\\x87\\x8b\\x8d\\xa2]|\\xcf[\\x8f\\xb6]|\\xd2[\\x82-\\x89]|\\xd3[\\x8f\\xba-\\xbf]|\\xd4[\\x90-\\xb0]|\\xd5[\\x97\\x98\\x9a-\\xa0]|\\xd6[\\x88-\\xbf]|\\xd7[\\xab-\\xaf\\xb3-\\xbf]|\\xd9[\\x80-\\x9f\\xaa-\\xbf]|\\xdb[\\x80-\\xaf\\xba-\\xbf]|\\xdc[\\x91\\xb0-\\xbf]|\\xdd[\\xae-\\xbf]|\\xde[\\xa6-\\xb0\\xb2-\\xbf]|\\xe0(?:[\\xa0-\\xa3\\xbf][\\x80-\\xbf]|\\xa4[\\xba-\\xbc\\xbe\\xbf]|[\\xa5\\xa7\\xa9\\xab\\xad\\xaf\\xb1\\xb3\\xb5][\\x80-\\xa5\\xb0-\\xbf]|\\xa6[\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb3-\\xb5\\xba-\\xbc\\xbe\\xbf]|\\xa8[\\x8b-\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xb7\\xba-\\xbf]|\\xaa[\\x8e\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xac[\\x8d\\x8e\\x91\\x92\\xa9\\xb1\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xae[\\x84\\x8b-\\x8d\\x91\\x96-\\x98\\x9b\\x9d\\xa0-\\xa2\\xa5-\\xa7\\xab-\\xad\\xba-\\xbf]|\\xb0[\\x8d\\x91\\xa9\\xb4\\xba-\\xbf]|\\xb2[\\x8d\\x91\\xa9\\xb4\\xba-\\xbc\\xbe\\xbf]|\\xb4[\\x8d\\x91\\xa9\\xba-\\xbf]|\\xb6[\\x97-\\x99\\xb2\\xbc\\xbe\\xbf]|\\xb7[\\x87-\\xbf]|\\xb8[\\xb1\\xb4-\\xbf]|[\\xb9\\xbb][\\x80-\\x8f\\x9a-\\xbf]|\\xba[\\x83\\x85\\x86\\x89\\x8b\\x8c\\x8e-\\x93\\x98\\xa0\\xa4\\xa6\\xa8\\xa9\\xac\\xb1\\xb4-\\xbc\\xbe\\xbf]|\\xbc[\\x80-\\x9f\\xaa-\\xbf]|\\xbd[\\x88\\xab-\\xbf]|\\xbe[\\x8c-\\xbf])|\\xe1(?:\\x80[\\xa2\\xa8\\xab-\\xbf]|\\x81[\\x8a-\\xbf]|[\\x82\\x84\\x88\\x90-\\x98\\xa3\\xa9-\\xb9][\\x80-\\xbf]|\\x83[\\x86-\\x8f\\xbb\\xbd-\\xbf]|\\x85[\\x9a-\\x9e]|\\x86[\\xa3-\\xa7]|[\\x87\\xbb][\\xba-\\xbf]|\\x89[\\x89\\x8e\\x8f\\x97\\x99\\x9e\\x9f]|\\x8a[\\x89\\x8e\\x8f\\xb1\\xb6\\xb7\\xbf]|\\x8b[\\x81\\x86\\x87\\x97]|\\x8c[\\x91\\x96\\x97]|\\x8d[\\x80-\\xa8\\xb2-\\xbf]|\\x8e[\\x90-\\x9f]|\\x8f[\\xb5-\\xbf]|\\x99[\\xad\\xae\\xb7-\\xbf]|\\x9a[\\x9b-\\x9f]|\\x9b[\\xab-\\xad\\xb1-\\xbf]|\\x9c[\\x8d\\x92-\\x9f\\xb2-\\xbf]|\\x9d[\\x92-\\x9f\\xad\\xb1-\\xbf]|\\x9e[\\xb4-\\xbf]|\\x9f[\\x80-\\x9f\\xaa-\\xbf]|[\\xa0\\xa7][\\x80-\\x8f\\x9a-\\xbf]|\\xa1[\\xb8-\\xbf]|\\xa2[\\xa9-\\xbf]|\\xa4[\\x9d-\\xbf]|\\xa5[\\x80-\\x85\\x90-\\xbf]|\\xa6[\\xaa-\\xbf]|\\xa8[\\x97-\\xbf]|\\xba[\\x9c-\\x9f]|\\xbc[\\x96\\x97\\x9e\\x9f]|\\xbd[\\x86\\x87\\x8e\\x8f\\x98\\x9a\\x9c\\x9e\\xbe\\xbf]|\\xbe[\\xb5\\xbd\\xbf]|\\xbf[\\x85\\x8d-\\x8f\\x94\\x95\\x9c-\\x9f\\xad-\\xb1\\xb5\\xbd-\\xbf])|\\xe2(?:[\\x80\\x83\\x87-\\x90\\x94-\\x9c\\x9f-\\xaf\\xb2\\xb8-\\xbf][\\x80-\\xbf]|\\x81[\\x80-\\xaf\\xb1-\\xb3\\xba-\\xbf]|\\x82[\\x8a-\\xbf]|\\x84[\\x83-\\x86\\x88\\x89\\x94\\x96-\\x98\\x9e-\\xa3\\xa5\\xa7\\xa9\\xae\\xb2\\xba\\xbb]|\\x85[\\x8a-\\x92]|\\x86[\\x83-\\xbf]|\\x91[\\x80-\\x9f\\xa9-\\xb3\\xbd-\\xbf]|\\x92[\\x80-\\x87\\x91-\\xbf]|\\x93[\\x80-\\xa9\\xab-\\xb4\\xbe]|\\x9d[\\x80-\\xb5\\xbf]|\\x9e[\\x89\\x93-\\xbf]|\\xb0\\xaf|\\xb1[\\x9f-\\xbf]|\\xb3[\\xa5-\\xbc\\xbe\\xbf]|\\xb4[\\xa6-\\xaf]|\\xb5[\\xa6-\\xae\\xb0-\\xbf]|\\xb6[\\x97-\\x9f\\xa7\\xaf\\xb7\\xbf]|\\xb7[\\x87\\x8f\\x97\\x9f-\\xbf])|\\xe3(?:\\x80[\\x88-\\xa0\\xaa-\\xb0\\xb6\\xb7\\xbd-\\xbf]|\\x81\\x80|\\x82[\\x97-\\x9c\\xa0]|\\x83\\xbb|\\x84[\\x80-\\x84\\xad-\\xb0]|\\x86[\\x8f-\\x91\\x96-\\x9f\\xb8-\\xbf]|\\x87[\\x80-\\xaf]|\\x88[\\x80-\\x9f\\xaa-\\xbf]|\\x89[\\x80-\\x90\\xa0-\\xbf]|\\x8a[\\x8a-\\xb0]|[\\x8b-\\x8f][\\x80-\\xbf])|\\xe4(?:\\xb6[\\xb6-\\xbf]|\\xb7[\\x80-\\xbf])|[\\xe5-\\xe8\\xeb\\xec\\xee][\\x80-\\xbf]{2}|\\xe9(?:\\xbe[\\xbc-\\xbf]|\\xbf[\\x80-\\xbf])|\\xea(?:\\x92[\\x8d-\\xbf]|[\\x93-\\x9f\\xa1-\\xaf][\\x80-\\xbf]|\\xa0[\\x82\\x86\\x8b\\xa3-\\xbf])|\\xed(?:\\x9e[\\xa4-\\xbf]|[\\x9f-\\xbf][\\x80-\\xbf])|\\xef(?:[\\x80-\\xa7\\xaa\\xaf-\\xb3\\xb5\\xb8\\xba][\\x80-\\xbf]|\\xa8[\\xae\\xaf]|\\xa9[\\xab-\\xaf]|\\xab[\\x9a-\\xbf]|\\xac[\\x87-\\x92\\x98-\\x9c\\x9e\\xa9\\xb7\\xbd\\xbf]|\\xad[\\x82\\x85]|\\xae[\\xb2-\\xbf]|\\xb4[\\xbe\\xbf]|\\xb6[\\x90\\x91]|\\xb7[\\x88-\\xaf\\xbc-\\xbf]|\\xb9\\xb5|\\xbb[\\xbd-\\xbf]|\\xbc[\\x80-\\x8f\\x9a-\\xbf]|\\xbd[\\x9b-\\xa5]|\\xbe\\xbf|\\xbf[\\x88\\x89\\x90\\x91\\x98\\x99\\x9d-\\xbf])|\\xf0(?:\\x90(?:\\x80[\\x8c\\xa7\\xbb\\xbe]|\\x81[\\x8e\\x8f\\x9e-\\xbf]|[\\x82\\x87-\\x8b\\x90\\x91\\x93-\\x9f\\xa1-\\xa7\\xaa-\\xbf][\\x80-\\xbf]|\\x83[\\xbb-\\xbf]|\\x84[\\xb4-\\xbf]|\\x85[\\xb9-\\xbf]|[\\x86\\x8d][\\x8b-\\xbf]|\\x8c[\\x9f\\xa4-\\xaf]|\\x8e[\\x9e\\x9f]|\\x8f[\\x84-\\x87\\x90\\x96-\\xbf]|\\x92[\\x80-\\x9f\\xaa-\\xbf]|\\xa0[\\x86\\x87\\x89\\xb6\\xb9-\\xbb\\xbd\\xbe]|\\xa8[\\x81-\\x8f\\x94\\x98\\xb4-\\xbf]|\\xa9[\\x84-\\xbf])|[\\x91-\\x9c\\x9e-\\xa9\\xab-\\xae\\xb0-\\xbf][\\x80-\\xbf]{2}|\\x9d(?:[\\x80-\\x90\\x96-\\x99\\xa0-\\xbf][\\x80-\\xbf]|\\x91\\x95|\\x92[\\x9d\\xa0\\xa1\\xa3\\xa4\\xa7\\xa8\\xad\\xba\\xbc]|\\x93\\x84|\\x94[\\x86\\x8b\\x8c\\x95\\x9d\\xba\\xbf]|\\x95[\\x85\\x87-\\x89\\x91]|\\x9a[\\xa6\\xa7]|\\x9b[\\x81\\x9b\\xbb]|\\x9c[\\x95\\xb5]|\\x9d[\\x8f\\xaf]|\\x9e[\\x89\\xa9]|\\x9f[\\x80-\\x8d])|\\xaa(?:\\x9b[\\x97-\\xbf]|[\\x9c-\\xbf][\\x80-\\xbf])|\\xaf(?:\\xa8[\\x9e-\\xbf]|[\\xa9-\\xbf][\\x80-\\xbf]))|[\\xf1-\\xf3][\\x80-\\xbf]{3}|\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'); },
            function () { return eq(re_cclass('[^\\S]'), '(?:[\\x09-\\x0d\\x1c- ]|\\xc2[\\x85\\xa0]|\\xe1\\x9a\\x80|\\xe2(?:\\x80[\\x80-\\x8b\\xa8\\xa9\\xaf]|\\x81\\x9f)|\\xe3\\x80\\x80)'); },
            function () { return eq(re_cclass('[^\\D]'), '(?:[0-9]|\\xc2[\\xb2\\xb3\\xb9]|\\xd9[\\xa0-\\xa9]|\\xdb[\\xb0-\\xb9]|\\xe0(?:[\\xa5\\xa7\\xa9\\xab\\xad\\xaf\\xb1\\xb3\\xb5][\\xa6-\\xaf]|[\\xb9\\xbb][\\x90-\\x99]|\\xbc[\\xa0-\\xa9])|\\xe1(?:\\x80[\\x80-\\xbf]|\\x81[\\x80-\\x89]|\\x8d[\\xa9-\\xb1]|\\x9f[\\xa0-\\xa9]|[\\xa0\\xa7][\\x90-\\x99]|\\xa5[\\x86-\\x8f])|\\xe2(?:\\x81[\\xb0\\xb4-\\xb9]|\\x82[\\x80-\\x89]|\\x91[\\xa0-\\xa8\\xb4-\\xbc]|\\x92[\\x88-\\x90]|\\x93[\\xaa\\xb5-\\xbd\\xbf]|\\x9d[\\xb6-\\xbe]|\\x9e[\\x80-\\x88\\x8a-\\x92])|\\xef\\xbc[\\x90-\\x99]|\\xf0(?:\\x90(?:\\x92[\\xa0-\\xa9]|\\xa9[\\x80-\\x83])|\\x9d\\x9f[\\x8e-\\xbf]))'); },
            function () { return eq(re_cclass('[^\\W]'), '(?:[0-9A-Z_a-z]|\\xc2[\\xaa\\xb2\\xb3\\xb5\\xb9\\xba\\xbc-\\xbe]|\\xc3[\\x80-\\x96\\x98-\\xb6\\xb8-\\xbf]|[\\xc4-\\xc8\\xca\\xd0\\xd1\\xda][\\x80-\\xbf]|\\xc9[\\x80\\x81\\x90-\\xbf]|\\xcb[\\x80\\x81\\x86-\\x91\\xa0-\\xa4\\xae]|\\xcd\\xba|\\xce[\\x86\\x88-\\x8a\\x8c\\x8e-\\xa1\\xa3-\\xbf]|\\xcf[\\x80-\\x8e\\x90-\\xb5\\xb7-\\xbf]|\\xd2[\\x80\\x81\\x8a-\\xbf]|\\xd3[\\x80-\\x8e\\x90-\\xb9]|\\xd4[\\x80-\\x8f\\xb1-\\xbf]|\\xd5[\\x80-\\x96\\x99\\xa1-\\xbf]|\\xd6[\\x80-\\x87]|\\xd7[\\x90-\\xaa\\xb0-\\xb2]|\\xd8[\\xa1-\\xba]|\\xd9[\\x80-\\x8a\\xa0-\\xa9\\xae\\xaf\\xb1-\\xbf]|\\xdb[\\x80-\\x93\\x95\\xa5\\xa6\\xae-\\xbc\\xbf]|\\xdc[\\x90\\x92-\\xaf]|\\xdd[\\x8d-\\xad]|\\xde[\\x80-\\xa5\\xb1]|\\xe0(?:\\xa4[\\x84-\\xb9\\xbd]|\\xa5[\\x90\\x98-\\xa1\\xa6-\\xaf\\xbd]|\\xa6[\\x85-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb6-\\xb9\\xbd]|\\xa7[\\x8e\\x9c\\x9d\\x9f-\\xa1\\xa6-\\xb1\\xb4-\\xb7\\xb9]|\\xa8[\\x85-\\x8a\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5\\xb6\\xb8\\xb9]|\\xa9[\\x99-\\x9c\\x9e\\xa6-\\xaf\\xb2-\\xb4]|\\xaa[\\x85-\\x8d\\x8f-\\x91\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xab[\\x90\\xa0\\xa1\\xa6-\\xaf]|\\xac[\\x85-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xad[\\x9c\\x9d\\x9f-\\xa1\\xa6-\\xaf\\xb1]|\\xae[\\x83\\x85-\\x8a\\x8e-\\x90\\x92-\\x95\\x99\\x9a\\x9c\\x9e\\x9f\\xa3\\xa4\\xa8-\\xaa\\xae-\\xb9]|\\xaf[\\xa6-\\xb2]|\\xb0[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9]|[\\xb1\\xb5][\\xa0\\xa1\\xa6-\\xaf]|\\xb2[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9\\xbd]|\\xb3[\\x9e\\xa0\\xa1\\xa6-\\xaf]|\\xb4[\\x85-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb9]|\\xb6[\\x85-\\x96\\x9a-\\xb1\\xb3-\\xbb\\xbd]|\\xb7[\\x80-\\x86]|\\xb8[\\x81-\\xb0\\xb2\\xb3]|\\xb9[\\x80-\\x86\\x90-\\x99]|\\xba[\\x81\\x82\\x84\\x87\\x88\\x8a\\x8d\\x94-\\x97\\x99-\\x9f\\xa1-\\xa3\\xa5\\xa7\\xaa\\xab\\xad-\\xb0\\xb2\\xb3\\xbd]|\\xbb[\\x80-\\x84\\x86\\x90-\\x99\\x9c\\x9d]|\\xbc[\\x80\\xa0-\\xb3]|\\xbd[\\x80-\\x87\\x89-\\xaa]|\\xbe[\\x88-\\x8b])|\\xe1(?:\\x80[\\x80-\\xa1\\xa3-\\xa7\\xa9\\xaa]|\\x81[\\x80-\\x89\\x90-\\x95]|\\x82[\\xa0-\\xbf]|\\x83[\\x80-\\x85\\x90-\\xba\\xbc]|[\\x84\\x88\\x91-\\x98\\xb4-\\xb6\\xb8\\xb9][\\x80-\\xbf]|\\x85[\\x80-\\x99\\x9f-\\xbf]|\\x86[\\x80-\\xa2\\xa8-\\xbf]|[\\x87\\xbb][\\x80-\\xb9]|\\x89[\\x80-\\x88\\x8a-\\x8d\\x90-\\x96\\x98\\x9a-\\x9d\\xa0-\\xbf]|\\x8a[\\x80-\\x88\\x8a-\\x8d\\x90-\\xb0\\xb2-\\xb5\\xb8-\\xbe]|\\x8b[\\x80\\x82-\\x85\\x88-\\x96\\x98-\\xbf]|\\x8c[\\x80-\\x90\\x92-\\x95\\x98-\\xbf]|\\x8d[\\x80-\\x9a\\xa9-\\xbc]|\\x8e[\\x80-\\x8f\\xa0-\\xbf]|\\x8f[\\x80-\\xb4]|\\x90[\\x81-\\xbf]|\\x99[\\x80-\\xac\\xaf-\\xb6]|\\x9a[\\x81-\\x9a\\xa0-\\xbf]|\\x9b[\\x80-\\xaa\\xae-\\xb0]|\\x9c[\\x80-\\x8c\\x8e-\\x91\\xa0-\\xb1]|\\x9d[\\x80-\\x91\\xa0-\\xac\\xae-\\xb0]|\\x9e[\\x80-\\xb3]|\\x9f[\\x97\\x9c\\xa0-\\xa9\\xb0-\\xb9]|\\xa0[\\x90-\\x99\\xa0-\\xbf]|\\xa1[\\x80-\\xb7]|\\xa2[\\x80-\\xa8]|\\xa4[\\x80-\\x9c]|\\xa5[\\x86-\\xad\\xb0-\\xb4]|\\xa6[\\x80-\\xa9]|\\xa7[\\x81-\\x87\\x90-\\x99]|\\xa8[\\x80-\\x96]|\\xba[\\x80-\\x9b\\xa0-\\xbf]|\\xbc[\\x80-\\x95\\x98-\\x9d\\xa0-\\xbf]|\\xbd[\\x80-\\x85\\x88-\\x8d\\x90-\\x97\\x99\\x9b\\x9d\\x9f-\\xbd]|\\xbe[\\x80-\\xb4\\xb6-\\xbc\\xbe]|\\xbf[\\x82-\\x84\\x86-\\x8c\\x90-\\x93\\x96-\\x9b\\xa0-\\xac\\xb2-\\xb4\\xb6-\\xbc])|\\xe2(?:\\x81[\\xb0\\xb1\\xb4-\\xb9\\xbf]|\\x82[\\x80-\\x89\\x90-\\x94]|\\x84[\\x82\\x87\\x8a-\\x93\\x95\\x99-\\x9d\\xa4\\xa6\\xa8\\xaa-\\xad\\xaf-\\xb1\\xb3-\\xb9\\xbc-\\xbf]|\\x85[\\x85-\\x89\\x93-\\xbf]|\\x86[\\x80-\\x82]|\\x91[\\xa0-\\xbf]|\\x92[\\x80-\\x9b]|\\x93[\\xaa-\\xbf]|\\x9d[\\xb6-\\xbf]|\\x9e[\\x80-\\x93]|\\xb0[\\x80-\\xae\\xb0-\\xbf]|\\xb1[\\x80-\\x9e]|\\xb2[\\x80-\\xbf]|\\xb3[\\x80-\\xa4\\xbd]|\\xb4[\\x80-\\xa5\\xb0-\\xbf]|\\xb5[\\x80-\\xa5\\xaf]|\\xb6[\\x80-\\x96\\xa0-\\xa6\\xa8-\\xae\\xb0-\\xb6\\xb8-\\xbe]|\\xb7[\\x80-\\x86\\x88-\\x8e\\x90-\\x96\\x98-\\x9e])|\\xe3(?:\\x80[\\x85-\\x87\\xa1-\\xa9\\xb1-\\xb5\\xb8-\\xbc]|\\x81[\\x81-\\xbf]|\\x82[\\x80-\\x96\\x9d-\\x9f\\xa1-\\xbf]|\\x83[\\x80-\\xba\\xbc-\\xbf]|\\x84[\\x85-\\xac\\xb1-\\xbf]|[\\x85\\x90-\\xbf][\\x80-\\xbf]|\\x86[\\x80-\\x8e\\x92-\\x95\\xa0-\\xb7]|\\x87[\\xb0-\\xbf]|\\x88[\\xa0-\\xa9]|\\x89[\\x91-\\x9f]|\\x8a[\\x80-\\x89\\xb1-\\xbf])|\\xe4(?:[\\x80-\\xb5\\xb8-\\xbf][\\x80-\\xbf]|\\xb6[\\x80-\\xb5])|[\\xe5-\\xe8\\xeb\\xec][\\x80-\\xbf]{2}|\\xe9(?:[\\x80-\\xbd][\\x80-\\xbf]|\\xbe[\\x80-\\xbb])|\\xea(?:[\\x80-\\x91\\xb0-\\xbf][\\x80-\\xbf]|\\x92[\\x80-\\x8c]|\\xa0[\\x80\\x81\\x83-\\x85\\x87-\\x8a\\x8c-\\xa2])|\\xed(?:[\\x80-\\x9d][\\x80-\\xbf]|\\x9e[\\x80-\\xa3])|\\xef(?:[\\xa4-\\xa7\\xaa\\xb0-\\xb3\\xba][\\x80-\\xbf]|\\xa8[\\x80-\\xad\\xb0-\\xbf]|\\xa9[\\x80-\\xaa\\xb0-\\xbf]|\\xab[\\x80-\\x99]|\\xac[\\x80-\\x86\\x93-\\x97\\x9d\\x9f-\\xa8\\xaa-\\xb6\\xb8-\\xbc\\xbe]|\\xad[\\x80\\x81\\x83\\x84\\x86-\\xbf]|\\xae[\\x80-\\xb1]|\\xaf[\\x93-\\xbf]|\\xb4[\\x80-\\xbd]|\\xb5[\\x90-\\xbf]|\\xb6[\\x80-\\x8f\\x92-\\xbf]|\\xb7[\\x80-\\x87\\xb0-\\xbb]|\\xb9[\\xb0-\\xb4\\xb6-\\xbf]|\\xbb[\\x80-\\xbc]|\\xbc[\\x90-\\x99\\xa1-\\xba]|\\xbd[\\x81-\\x9a\\xa6-\\xbf]|\\xbe[\\x80-\\xbe]|\\xbf[\\x82-\\x87\\x8a-\\x8f\\x92-\\x97\\x9a-\\x9c])|\\xf0(?:\\x90(?:\\x80[\\x80-\\x8b\\x8d-\\xa6\\xa8-\\xba\\xbc\\xbd\\xbf]|\\x81[\\x80-\\x8d\\x90-\\x9d]|[\\x82\\x90\\x91][\\x80-\\xbf]|\\x83[\\x80-\\xba]|\\x84[\\x87-\\xb3]|\\x85[\\x80-\\xb8]|\\x86\\x8a|\\x8c[\\x80-\\x9e\\xa0-\\xa3\\xb0-\\xbf]|\\x8d[\\x80-\\x8a]|\\x8e[\\x80-\\x9d\\xa0-\\xbf]|\\x8f[\\x80-\\x83\\x88-\\x8f\\x91-\\x95]|\\x92[\\x80-\\x9d\\xa0-\\xa9]|\\xa0[\\x80-\\x85\\x88\\x8a-\\xb5\\xb7\\xb8\\xbc\\xbf]|\\xa8[\\x80\\x90-\\x93\\x95-\\x97\\x99-\\xb3]|\\xa9[\\x80-\\x87])|\\x9d(?:[\\x90\\x96-\\x99][\\x80-\\xbf]|\\x91[\\x80-\\x94\\x96-\\xbf]|\\x92[\\x80-\\x9c\\x9e\\x9f\\xa2\\xa5\\xa6\\xa9-\\xac\\xae-\\xb9\\xbb\\xbd-\\xbf]|\\x93[\\x80-\\x83\\x85-\\xbf]|\\x94[\\x80-\\x85\\x87-\\x8a\\x8d-\\x94\\x96-\\x9c\\x9e-\\xb9\\xbb-\\xbe]|\\x95[\\x80-\\x84\\x86\\x8a-\\x90\\x92-\\xbf]|\\x9a[\\x80-\\xa5\\xa8-\\xbf]|\\x9b[\\x80\\x82-\\x9a\\x9c-\\xba\\xbc-\\xbf]|\\x9c[\\x80-\\x94\\x96-\\xb4\\xb6-\\xbf]|\\x9d[\\x80-\\x8e\\x90-\\xae\\xb0-\\xbf]|\\x9e[\\x80-\\x88\\x8a-\\xa8\\xaa-\\xbf]|\\x9f[\\x80-\\x82\\x84-\\x89\\x8e-\\xbf])|[\\xa0-\\xa9][\\x80-\\xbf]{2}|\\xaa(?:[\\x80-\\x9a][\\x80-\\xbf]|\\x9b[\\x80-\\x96])|\\xaf(?:[\\xa0-\\xa7][\\x80-\\xbf]|\\xa8[\\x80-\\x9d])))'); },
            function () { return eq(re_cclass('[^\\D\\W]'), '(?:[0-9]|\\xc2[\\xb2\\xb3\\xb9]|\\xc3[\\x80-\\x96\\x98-\\xb6\\xb8-\\xbf]|\\xc9[\\x80\\x81\\x90-\\xbf]|\\xcb[\\x80\\x81\\x86-\\x91\\xa0-\\xa4\\xae]|[\\xcd\\xd8][\\x80-\\xba]|\\xce[\\x80-\\x86\\x88-\\x8a\\x8c\\x8e-\\xa1\\xa3-\\xbf]|\\xcf[\\x80-\\x8e\\x90-\\xb5\\xb7-\\xbf]|\\xd2[\\x80\\x81\\x8a-\\xbf]|\\xd3[\\x80-\\x8e\\x90-\\xb9]|\\xd4[\\x80-\\x8f\\xb1-\\xbf]|\\xd5[\\x80-\\x96\\x99\\xa1-\\xbf]|\\xd6[\\x80-\\x87]|\\xd7[\\x80-\\xaa\\xb0-\\xb2]|\\xd9[\\xa0-\\xa9]|\\xdb[\\xb0-\\xb9]|\\xdc[\\x80-\\x90\\x92-\\xaf]|\\xdd[\\x80-\\xad]|\\xde[\\x80-\\xa5\\xb1]|\\xe0(?:\\xa4[\\x80-\\xb9\\xbd]|[\\xa5\\xa7\\xa9\\xab\\xad\\xaf\\xb1\\xb3\\xb5][\\xa6-\\xaf]|\\xa6[\\x80-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb6-\\xb9\\xbd]|\\xa8[\\x80-\\x8a\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5\\xb6\\xb8\\xb9]|\\xaa[\\x80-\\x8d\\x8f-\\x91\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xac[\\x80-\\x8c\\x8f\\x90\\x93-\\xa8\\xaa-\\xb0\\xb2\\xb3\\xb5-\\xb9\\xbd]|\\xae[\\x80-\\x83\\x85-\\x8a\\x8e-\\x90\\x92-\\x95\\x99\\x9a\\x9c\\x9e\\x9f\\xa3\\xa4\\xa8-\\xaa\\xae-\\xb9]|\\xb0[\\x80-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9]|\\xb2[\\x80-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb3\\xb5-\\xb9\\xbd]|\\xb4[\\x80-\\x8c\\x8e-\\x90\\x92-\\xa8\\xaa-\\xb9]|\\xb6[\\x80-\\x96\\x9a-\\xb1\\xb3-\\xbb\\xbd]|\\xb7[\\x80-\\x86]|\\xb8[\\x80-\\xb0\\xb2\\xb3]|[\\xb9\\xbb][\\x90-\\x99]|\\xba[\\x80-\\x82\\x84\\x87\\x88\\x8a\\x8d\\x94-\\x97\\x99-\\x9f\\xa1-\\xa3\\xa5\\xa7\\xaa\\xab\\xad-\\xb0\\xb2\\xb3\\xbd]|\\xbc[\\xa0-\\xa9]|\\xbd[\\x80-\\x87\\x89-\\xaa]|\\xbe[\\x80-\\x8b])|\\xe1(?:\\x80[\\x80-\\xa1\\xa3-\\xa7\\xa9\\xaa]|\\x81[\\x80-\\x89]|\\x83[\\x80-\\x85\\x90-\\xba\\xbc]|\\x85[\\x80-\\x99\\x9f-\\xbf]|\\x86[\\x80-\\xa2\\xa8-\\xbf]|[\\x87\\xbb][\\x80-\\xb9]|\\x89[\\x80-\\x88\\x8a-\\x8d\\x90-\\x96\\x98\\x9a-\\x9d\\xa0-\\xbf]|\\x8a[\\x80-\\x88\\x8a-\\x8d\\x90-\\xb0\\xb2-\\xb5\\xb8-\\xbe]|\\x8b[\\x80\\x82-\\x85\\x88-\\x96\\x98-\\xbf]|\\x8c[\\x80-\\x90\\x92-\\x95\\x98-\\xbf]|\\x8d[\\xa9-\\xb1]|\\x8e[\\x80-\\x8f\\xa0-\\xbf]|\\x8f[\\x80-\\xb4]|\\x99[\\x80-\\xac\\xaf-\\xb6]|\\x9a[\\x80-\\x9a\\xa0-\\xbf]|\\x9b[\\x80-\\xaa\\xae-\\xb0]|\\x9c[\\x80-\\x8c\\x8e-\\x91\\xa0-\\xb1]|\\x9d[\\x80-\\x91\\xa0-\\xac\\xae-\\xb0]|\\x9e[\\x80-\\xb3]|\\x9f[\\xa0-\\xa9]|[\\xa0\\xa7][\\x90-\\x99]|\\xa1[\\x80-\\xb7]|\\xa2[\\x80-\\xa8]|\\xa4[\\x80-\\x9c]|\\xa5[\\x86-\\x8f]|\\xa6[\\x80-\\xa9]|\\xa8[\\x80-\\x96]|\\xba[\\x80-\\x9b\\xa0-\\xbf]|\\xbc[\\x80-\\x95\\x98-\\x9d\\xa0-\\xbf]|\\xbd[\\x80-\\x85\\x88-\\x8d\\x90-\\x97\\x99\\x9b\\x9d\\x9f-\\xbd]|\\xbe[\\x80-\\xb4\\xb6-\\xbc\\xbe]|\\xbf[\\x80-\\x84\\x86-\\x8c\\x90-\\x93\\x96-\\x9b\\xa0-\\xac\\xb2-\\xb4\\xb6-\\xbc])|\\xe2(?:\\x81[\\xb0\\xb4-\\xb9]|\\x82[\\x80-\\x89]|\\x84[\\x80-\\x82\\x87\\x8a-\\x93\\x95\\x99-\\x9d\\xa4\\xa6\\xa8\\xaa-\\xad\\xaf-\\xb1\\xb3-\\xb9\\xbc-\\xbf]|\\x85[\\x80-\\x89\\x93-\\xbf]|\\x86[\\x80-\\x82]|\\x91[\\xa0-\\xa8\\xb4-\\xbc]|\\x92[\\x88-\\x90]|\\x93[\\xaa\\xb5-\\xbd\\xbf]|\\x9d[\\xb6-\\xbe]|\\x9e[\\x80-\\x88\\x8a-\\x92]|\\xb0[\\x80-\\xae\\xb0-\\xbf]|\\xb1[\\x80-\\x9e]|\\xb3[\\x80-\\xa4\\xbd]|\\xb4[\\x80-\\xa5\\xb0-\\xbf]|\\xb5[\\x80-\\xa5\\xaf]|\\xb6[\\x80-\\x96\\xa0-\\xa6\\xa8-\\xae\\xb0-\\xb6\\xb8-\\xbe]|\\xb7[\\x80-\\x86\\x88-\\x8e\\x90-\\x96\\x98-\\x9e])|\\xe3(?:\\x80[\\x80-\\x87\\xa1-\\xa9\\xb1-\\xb5\\xb8-\\xbc]|\\x81[\\x81-\\xbf]|\\x82[\\x80-\\x96\\x9d-\\x9f\\xa1-\\xbf]|\\x83[\\x80-\\xba\\xbc-\\xbf]|\\x84[\\x85-\\xac\\xb1-\\xbf]|[\\x85\\x90-\\xbf][\\x80-\\xbf]|\\x86[\\x80-\\x8e\\x92-\\x95\\xa0-\\xb7]|\\x87[\\xb0-\\xbf]|\\x88[\\xa0-\\xa9]|\\x89[\\x91-\\x9f]|\\x8a[\\x80-\\x89\\xb1-\\xbf])|\\xe4(?:[\\x80-\\xb5\\xb8-\\xbf][\\x80-\\xbf]|\\xb6[\\x80-\\xb5])|\\xe9(?:[\\x80-\\xbd][\\x80-\\xbf]|\\xbe[\\x80-\\xbb])|\\xea(?:[\\x80-\\x91\\xb0-\\xbf][\\x80-\\xbf]|\\x92[\\x80-\\x8c]|\\xa0[\\x80\\x81\\x83-\\x85\\x87-\\x8a\\x8c-\\xa2])|\\xed(?:[\\x80-\\x9d][\\x80-\\xbf]|\\x9e[\\x80-\\xa3])|\\xef(?:\\xa8[\\x80-\\xad\\xb0-\\xbf]|\\xa9[\\x80-\\xaa\\xb0-\\xbf]|\\xab[\\x80-\\x99]|\\xac[\\x80-\\x86\\x93-\\x97\\x9d\\x9f-\\xa8\\xaa-\\xb6\\xb8-\\xbc\\xbe]|\\xad[\\x80\\x81\\x83\\x84\\x86-\\xbf]|\\xae[\\x80-\\xb1]|\\xb4[\\x80-\\xbd]|\\xb6[\\x80-\\x8f\\x92-\\xbf]|\\xb7[\\x80-\\x87\\xb0-\\xbb]|\\xb9[\\x80-\\xb4\\xb6-\\xbf]|\\xbb[\\x80-\\xbc]|\\xbc[\\x90-\\x99]|\\xbd[\\x80-\\x9a\\xa6-\\xbf]|\\xbe[\\x80-\\xbe]|\\xbf[\\x80-\\x87\\x8a-\\x8f\\x92-\\x97\\x9a-\\x9c])|\\xf0(?:\\x90(?:\\x80[\\x80-\\x8b\\x8d-\\xa6\\xa8-\\xba\\xbc\\xbd\\xbf]|\\x81[\\x80-\\x8d\\x90-\\x9d]|\\x83[\\x80-\\xba]|\\x84[\\x80-\\xb3]|\\x85[\\x80-\\xb8]|[\\x86\\x8d][\\x80-\\x8a]|\\x8c[\\x80-\\x9e\\xa0-\\xa3\\xb0-\\xbf]|\\x8e[\\x80-\\x9d\\xa0-\\xbf]|\\x8f[\\x80-\\x83\\x88-\\x8f\\x91-\\x95]|\\x92[\\xa0-\\xa9]|\\xa0[\\x80-\\x85\\x88\\x8a-\\xb5\\xb7\\xb8\\xbc\\xbf]|\\xa8[\\x80\\x90-\\x93\\x95-\\x97\\x99-\\xb3]|\\xa9[\\x80-\\x83])|\\x9d(?:\\x91[\\x80-\\x94\\x96-\\xbf]|\\x92[\\x80-\\x9c\\x9e\\x9f\\xa2\\xa5\\xa6\\xa9-\\xac\\xae-\\xb9\\xbb\\xbd-\\xbf]|\\x93[\\x80-\\x83\\x85-\\xbf]|\\x94[\\x80-\\x85\\x87-\\x8a\\x8d-\\x94\\x96-\\x9c\\x9e-\\xb9\\xbb-\\xbe]|\\x95[\\x80-\\x84\\x86\\x8a-\\x90\\x92-\\xbf]|\\x9a[\\x80-\\xa5\\xa8-\\xbf]|\\x9b[\\x80\\x82-\\x9a\\x9c-\\xba\\xbc-\\xbf]|\\x9c[\\x80-\\x94\\x96-\\xb4\\xb6-\\xbf]|\\x9d[\\x80-\\x8e\\x90-\\xae\\xb0-\\xbf]|\\x9e[\\x80-\\x88\\x8a-\\xa8\\xaa-\\xbf]|\\x9f[\\x8e-\\xbf])|\\xaa(?:[\\x80-\\x9a][\\x80-\\xbf]|\\x9b[\\x80-\\x96])|\\xaf(?:[\\x80-\\xa7][\\x80-\\xbf]|\\xa8[\\x80-\\x9d])))'); },
            function () { return eq(re_cclass('[\uf000-\uf002]'), '(?:\\xef\\x80[\\x80-\\x82])'); },
            function () { return eq(re_cclass('[\ueffd-\uefff]'), '(?:\\xee\\xbf[\\xbd-\\xbf])'); },
            function () { return eq(re_cclass('[\uf000-\uf001]'), '(?:\\xef\\x80[\\x80\\x81])'); },
            function () { return eq(re_cclass('[\ueffe-\uefff]'), '(?:\\xee\\xbf[\\xbe\\xbf])'); },
            function () { return eq(re_cclass('[\uefff-\uf000]'), '(?:\\xee\\xbf\\xbf|\\xef\\x80\\x80)'); },
            function () { return eq(re_cclass('[\ueffe-\uf001]'), '(?:\\xee\\xbf[\\xbe\\xbf]|\\xef\\x80[\\x80\\x81])'); },
            function () { return eq(re_cclass('[\ueffd-\uf002]'), '(?:\\xee\\xbf[\\xbd-\\xbf]|\\xef\\x80[\\x80-\\x82])'); },
            function () { return eq(re_cclass('[\\x]'), 'x'); },
            function () { return eq(re_cclass('[\\u]'), 'u'); },
            function () { return eq(re_cclass('[\\U]'), 'U'); },
            function () { return eq(re_cclass('[\\x0]'), '[0x]'); },
            function () { return eq(re_cclass('[\\u0]'), '[0u]'); },
            function () { return eq(re_cclass('[\\U0]'), '[0U]'); },
            function () {
                "surrogates, U+??FFFE, and U+??FFFF";
                return eq(
                    re_cclass('[\ud800-\udfff\ufffe\uffff\\U0001fffe\\U0001ffff\\U0002fffe\\U0002ffff\\U0003fffe\\U0003ffff\\U0004fffe\\U0004ffff\\U0005fffe\\U0005ffff\\U0006fffe\\U0006ffff\\U0007fffe\\U0007ffff\\U0008fffe\\U0008ffff\\U0009fffe\\U0009ffff\\U000afffe\\U000affff\\U000bfffe\\U000bffff\\U000cfffe\\U000cffff\\U000dfffe\\U000dffff\\U000efffe\\U000effff\\U000ffffe\\U000fffff\\U0010fffe\\U0010ffff]'),
                    '(?:\\xed[\\xa0-\\xbf][\\x80-\\xbf]|\\xef\\xbf[\\xbe\\xbf]|\\xf0[\\x9f\\xaf\\xbf]\\xbf[\\xbe\\xbf]|[\\xf1-\\xf3][\\x8f\\x9f\\xaf\\xbf]\\xbf[\\xbe\\xbf]|\\xf4\\x8f\\xbf[\\xbe\\xbf])');
            },
            function () {
                "all characters excluding NUL, surrogates, U+??FFFE, and U+??FFFF";
                return eq(
                    re_cclass('[^\x00\ud800-\udfff\ufffe\uffff\\U0001fffe\\U0001ffff\\U0002fffe\\U0002ffff\\U0003fffe\\U0003ffff\\U0004fffe\\U0004ffff\\U0005fffe\\U0005ffff\\U0006fffe\\U0006ffff\\U0007fffe\\U0007ffff\\U0008fffe\\U0008ffff\\U0009fffe\\U0009ffff\\U000afffe\\U000affff\\U000bfffe\\U000bffff\\U000cfffe\\U000cffff\\U000dfffe\\U000dffff\\U000efffe\\U000effff\\U000ffffe\\U000fffff\\U0010fffe\\U0010ffff]'),
                    utf8_character_pat);
            },
            function () { return eq(xml_unicode_filter(undef), undef); },
            function () { return eq(xml_unicode_filter(''), ''); },
            function () {
                "frobidden in XML";
                return eq(xml_unicode_filter(
                              '\x00\b\x0b\f\x0e\x1f' +
                              '\ufffe\uffff\udfff\ud800'),
                          '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                          '\ufffd\ufffd\ufffd\ufffd');
            },
            function () {
                "allowed in XML";
                return eq(
                    xml_unicode_filter('\ud800\udc00\udbff\udfff'),
                    '\ud800\udc00\udbff\udfff');
            },
            function () {
                return eq(escapeXML('<' + '&>' + '\"' + '\''), '&' + 'lt;&' + 'amp;&' + 'gt;&' + 'quot;&' + '#39;');
            },
            function () {
                return eq(escapeXML('\t\n\x0b\f\r 0-9A-Za-z\x85\xa0'), '\t\n\ufffd\ufffd\r 0-9A-Za-z\x85\xa0');
            },
            function () { return eq(escapeXML('\ud7ff\ue000'), '\ud7ff\ue000'); },
            function () { return eq(escapeXML('\ud800\udc00'), '\ud800\udc00'); },
            function () { return eq(escapeXML('\udbff\udc00'), '\udbff\udc00'); },
            function () { return eq(escapeXML('\ud800\udfff'), '\ud800\udfff'); },
            function () { return eq(escapeXML('\udbff\udfff'), '&' + '#1114111;'); },
            function () {
                return eq(escapeXML('\x00\x01\x02\x03\x04\x05\x06\x07' +
                                    '\b\x0b\f\x0e\x0f\x10\x11\x12' +
                                    '\x13\x14\x15\x16\x17\x18\x19\x1a' +
                                    '\x1b\x1c\x1d\x1e\x1f'),
                          '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                          '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                          '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                          '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                          '\ufffd');
            },
            function () { return eq(escapeXML('\ud800\udbff'), '\ufffd\ufffd'); },
            function () { return eq(escapeXML('\udc00\udfff'), '\ufffd\ufffd'); },
            function () {
                return eq(escapeXML(
                              '\x7f\x80\x81\x82\x83\x84\x86\x87\x88\x89\x8a' +
                              '\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95' +
                              '\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f' +
                              '\ufdd0\ufdd1\ufdd2\ufdd3\ufdd4\ufdd5\ufdd6' +
                              '\ufdd7\ufdd8\ufdd9\ufdda\ufddb\ufddc\ufddd' +
                              '\ufdde\ufddf\ud83f\udffe\ud83f\udfff\ud87f' +
                              '\udffe\ud87f\udfff\ud8bf\udffe\ud8bf\udfff' +
                              '\ud8ff\udffe\ud8ff\udfff\ud93f\udffe\ud93f' +
                              '\udfff\ud97f\udffe\ud97f\udfff\ud9bf\udffe' +
                              '\ud9bf\udfff\ud9ff\udffe\ud9ff\udfff\uda3f' +
                              '\udffe\uda3f\udfff\uda7f\udffe\uda7f\udfff' +
                              '\udabf\udffe\udabf\udfff\udaff\udffe\udaff' +
                              '\udfff\udb3f\udffe\udb3f\udfff\udb7f\udffe' +
                              '\udb7f\udfff\udbbf\udffe\udbbf\udfff\udbff' +
                              '\udffe\udbff\udfff'),
                          '&' + '#127;&' + '#128;&' + '#129;&' + '#130;&' + '#131;&' + '#132;&' + '#134;&' + '#135;' +
                          '&' + '#136;&' + '#137;&' + '#138;&' + '#139;&' + '#140;&' + '#141;&' + '#142;&' + '#143;' +
                          '&' + '#144;&' + '#145;&' + '#146;&' + '#147;&' + '#148;&' + '#149;&' + '#150;&' + '#151;' +
                          '&' + '#152;&' + '#153;&' + '#154;&' + '#155;&' + '#156;&' + '#157;&' + '#158;&' + '#159;' +
                          '&' + '#64976;&' + '#64977;&' + '#64978;&' + '#64979;&' + '#64980;&' + '#64981;' +
                          '&' + '#64982;&' + '#64983;&' + '#64984;&' + '#64985;&' + '#64986;&' + '#64987;' +
                          '&' + '#64988;&' + '#64989;&' + '#64990;&' + '#64991;&' + '#131070;' +
                          '&' + '#131071;&' + '#196606;&' + '#196607;&' + '#262142;&' + '#262143;' +
                          '&' + '#327678;&' + '#327679;&' + '#393214;&' + '#393215;&' + '#458750;' +
                          '&' + '#458751;&' + '#524286;&' + '#524287;&' + '#589822;&' + '#589823;' +
                          '&' + '#655358;&' + '#655359;&' + '#720894;&' + '#720895;&' + '#786430;' +
                          '&' + '#786431;&' + '#851966;&' + '#851967;&' + '#917502;&' + '#917503;' +
                          '&' + '#983038;&' + '#983039;&' + '#1048574;&' + '#1048575;&' + '#1114110;' +
                          '&' + '#1114111;');
            },
            function () { return eq(c1_to_unicode(' 0-9A-Za-z_'), ' 0-9A-Za-z_'); },
            function () {
                "C1 \u2192 Unicode mappings";
                return eq(
                    c1_to_unicode(
                        '\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a' +
                        '\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95' +
                        '\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f'),
                    '\u20ac\xc5\u201a\u0192\u201e\u2026\u2020\u2021' +
                    '\u02c6\u2030\u0160\u2039\u0152\xe7\u017d\xe8' +
                    '\xea\u2018\u2019\u201c\u201d\u2022\u2013\u2014' +
                    '\u02dc\u2122\u0161\u203a\u0153\xf9\u017e\u0178');
            },
            function () {
                "c1_to_unicode does not break Unicode mappings";
                return eq(
                    c1_to_unicode(
                        '\u20ac\xc5\u201a\u0192\u201e\u2026\u2020\u2021' +
                        '\u02c6\u2030\u0160\u2039\u0152\xe7\u017d\xe8' +
                        '\xea\u2018\u2019\u201c\u201d\u2022\u2013\u2014' +
                        '\u02dc\u2122\u0161\u203a\u0153\xf9\u017e\u0178'),
                    '\u20ac\xc5\u201a\u0192\u201e\u2026\u2020\u2021' +
                    '\u02c6\u2030\u0160\u2039\u0152\xe7\u017d\xe8' +
                    '\xea\u2018\u2019\u201c\u201d\u2022\u2013\u2014' +
                    '\u02dc\u2122\u0161\u203a\u0153\xf9\u017e\u0178');
            },
            function () { return eq(textFromHTML(''), ''); },
            function () {
                return eq(textFromHTML('&' + 'lt;&' + 'amp;&' + 'gt;&' + 'quot;&' + '#39;'),
                          '<' + '&>' + '\"' + '\'');
            },
            function () {
                return eq(textFromHTML('\t\n\x0b\f\r 0-9A-Za-z\x85\xa0'),
                          '\t\n\ufffd\ufffd\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + 'Tab;&' + 'NewLine;&' + '#x0b;&' + '#x0c;&' + '#13;&' + '#32;&' + '#x30;&' + '#x2d;&' + '#x39;A-Za-z&' + '#x85;&' + 'nbsp;'),
                          '\t\n&' + '#x0b;&' + '#x0c;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + 'Tab&' + 'NewLine&' + '#x0b&' + '#x0c&' + '#13&' + '#32&' + '#x30&' + '#x2d&' + '#x39;A-Za-z&' + '#x85&' + 'nbsp'), '\t\n&' + '#x0b&' + '#x0c\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#x9;&' + '#xa;&' + '#xb;&' + '#xc;&' + '#xd;&' + '#x20;&' + '#x30;&' + '#x2d;&' + '#x39;A-Za-z&' + '#x85;&' + '#xa0;'), '\t\n\&' + '#xb;&' + '#xc;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#x0009;&' + '#x000a;&' + '#x000b;&' + '#x000c;&' + '#x000d;&' + '#x00020;&' + '#x00030;&' + '#x0002d;&' + '#x00039;A-Za-z&' + '#x00085;&' + '#x000a0;'), '\t\n&' + '#x000b;&' + '#x000c;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#x9;&' + '#xA;&' + '#xB;&' + '#xC;&' + '#xD;&' + '#x20;&' + '#x30;&' + '#x2D;&' + '#x39;A-Za-z&' + '#x85;&' + '#xA0;'), '\t\n&' + '#xB;&' + '#xC;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#X9;&' + '#Xa;&' + '#Xb;&' + '#Xc;&' + '#Xd;&' + '#X20;&' + '#X30;&' + '#X2d;&' + '#X39;A-Za-z&' + '#X85;&' + '#Xa0;'), '\t\n&' + '#Xb;&' + '#Xc;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#X9;&' + '#XA;&' + '#XB;&' + '#XC;&' + '#XD;&' + '#X20;&' + '#X30;&' + '#X2D;&' + '#X39;A-Za-z&' + '#X85;&' + '#XA0;'), '\t\n&' + '#XB;&' + '#XC;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#9;&' + '#10;&' + '#11;&' + '#12;&' + '#13;&' + '#32;&' + '#48;&' + '#45;&' + '#57;A-Za-z&' + '#133;&' + '#160;'), '\t\n&' + '#11;&' + '#12;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + '#0009;&' + '#00010;&' + '#00011;&' + '#00012;&' + '#00013;&' + '#00032;&' + '#00048;&' + '#00045;&' + '#00057;A-Za-z&' + '#000133;&' + '#000160;'), '\t\n&' + '#00011;&' + '#00012;\r 0-9A-Za-z\x85\xa0');
            },
            function () {
                return eq(textFromHTML('&' + 'NonBreakingSpace'), textFromHTML('&' + 'nbsp'));
            },
            function () {
                return eq(textFromHTML('&' + 'NonBreakingSpaceFoo'), '&' + 'NonBreakingSpaceFoo');
            },
            function () { return eq(textFromHTML('\ud7ff\ue000'), '\ud7ff\ue000'); },
            function () { return eq(textFromHTML('\ud800\udc00'), '\ud800\udc00'); },
            function () { return eq(textFromHTML('\udbff\udc00'), '\udbff\udc00'); },
            function () { return eq(textFromHTML('\ud800\udfff'), '\ud800\udfff'); },
            function () { return eq(textFromHTML('&' + '#1114111;'), '\udbff\udfff'); },
            function () {
                return eq(textFromHTML(
                              '\x00\x01\x02\x03\x04\x05\x06\x07' +
                              '\b\x0b\f\x0e\x0f\x10\x11\x12' +
                              '\x13\x14\x15\x16\x17\x18\x19\x1a' +
                              '\x1b\x1c\x1d\x1e\x1f'), ('\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                                                        '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                                                        '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                                                        '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd' +
                                                        '\ufffd'));
            },
            function () { return eq(textFromHTML('\ud800\udbff'), '\ufffd\ufffd'); },
            function () { return eq(textFromHTML('\udc00\udfff'), '\ufffd\ufffd'); },
            function () {
                return eq(
                    textFromHTML(
                        '&' + '#127;&' + '#128;&' + '#129;&' + '#130;&' + '#131;&' + '#132;&' + '#134;&' + '#135;' +
                        '&' + '#136;&' + '#137;&' + '#138;&' + '#139;&' + '#140;&' + '#141;&' + '#142;&' + '#143;' +
                        '&' + '#144;&' + '#145;&' + '#146;&' + '#147;&' + '#148;&' + '#149;&' + '#150;&' + '#151;' +
                        '&' + '#152;&' + '#153;&' + '#154;&' + '#155;&' + '#156;&' + '#157;&' + '#158;&' + '#159;' +
                        '&' + '#64976;&' + '#64977;&' + '#64978;&' + '#64979;&' + '#64980;&' + '#64981;' +
                        '&' + '#64982;&' + '#64983;&' + '#64984;&' + '#64985;&' + '#64986;&' + '#64987;' +
                        '&' + '#64988;&' + '#64989;&' + '#64990;&' + '#64991;&' + '#131070;' +
                        '&' + '#131071;&' + '#196606;&' + '#196607;&' + '#262142;&' + '#262143;' +
                        '&' + '#327678;&' + '#327679;&' + '#393214;&' + '#393215;&' + '#458750;' +
                        '&' + '#458751;&' + '#524286;&' + '#524287;&' + '#589822;&' + '#589823;' +
                        '&' + '#655358;&' + '#655359;&' + '#720894;&' + '#720895;&' + '#786430;' +
                        '&' + '#786431;&' + '#851966;&' + '#851967;&' + '#917502;&' + '#917503;' +
                        '&' + '#983038;&' + '#983039;&' + '#1048574;&' + '#1048575;&' + '#1114110;' +
                        '&' + '#1114111;'),
                    '\x7f\x80\x81\x82\x83\x84\x86\x87\x88\x89\x8a' +
                    '\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95' +
                    '\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f' +
                    '\ufdd0\ufdd1\ufdd2\ufdd3\ufdd4\ufdd5\ufdd6' +
                    '\ufdd7\ufdd8\ufdd9\ufdda\ufddb\ufddc\ufddd' +
                    '\ufdde\ufddf\ud83f\udffe\ud83f\udfff\ud87f' +
                    '\udffe\ud87f\udfff\ud8bf\udffe\ud8bf\udfff' +
                    '\ud8ff\udffe\ud8ff\udfff\ud93f\udffe\ud93f' +
                    '\udfff\ud97f\udffe\ud97f\udfff\ud9bf\udffe' +
                    '\ud9bf\udfff\ud9ff\udffe\ud9ff\udfff\uda3f' +
                    '\udffe\uda3f\udfff\uda7f\udffe\uda7f\udfff' +
                    '\udabf\udffe\udabf\udfff\udaff\udffe\udaff' +
                    '\udfff\udb3f\udffe\udb3f\udfff\udb7f\udffe' +
                    '\udb7f\udfff\udbbf\udffe\udbbf\udfff\udbff' +
                    '\udffe\udbff\udfff');
            },
            function () { return eq(textFromHTML('&' + '#xd800;&' + '#xdc00;'), '&' + '#xd800;&' + '#xdc00;'); },
            function () { return eq(textFromHTML('&' + '#x10000;'), '\ud800\udc00'); },
            function () { return eq(textFromHTML('&' + '#x;'), '&' + '#x;'); },
            function () { return eq(textFromHTML('&' + '#;'), '&' + '#;'); },
            function () { return eq(textFromHTML('&' + '#x'), '&' + '#x'); },
            function () { return eq(textFromHTML('&' + '#'), '&' + '#'); },
            function () { return eq(textFromHTML('&' + '#0;'), '&' + '#0;'); },
            function () { return eq(textFromHTML('&' + '#x0;'), '&' + '#x0;'); },
            function () { return eq(textFromHTML('&' + '#000000000000000000000000000000000000000000000000;'), '&' + '#000000000000000000000000000000000000000000000000;'); },
            function () { return eq(textFromHTML('&' + '#x0000000000000000000000000000000000000000000000000;'), '&' + '#x0000000000000000000000000000000000000000000000000;'); },
            function () { return eq(textFromHTML('&' + '#000000000000000000000000000000000000000000000009;'), '\t'); },
            function () { return eq(textFromHTML('&' + '#x0000000000000000000000000000000000000000000000009;'), '\t'); },
            function () { return eq(textFromHTML('This is silly'), 'This is silly'); },
            function () { return eq(textFromHTML('This<' + 'br>is silly'), 'This\nis silly'); },
            function () { return eq(textFromHTML('This<' + 'br/>is silly'), 'This\nis silly'); },
            function () { return eq(textFromHTML('This<' + 'br />is silly'), 'This\nis silly'); },
            function () { return eq(textFromHTML('This<' + 'BR>is silly'), 'This\nis silly'); },
            function () { return eq(textFromHTML('This<' + 'BR/>is silly'), 'This\nis silly'); },
            function () { return eq(textFromHTML('This<' + 'BR />is silly'), 'This\nis silly'); },
            function () { return eq(textFromHTML('This<' + '!-- foo the bar! --> is silly'), 'This is silly'); },
            function () { return eq(textFromHTML('This<' + '!-- 1 > 2 --> is silly'), 'This is silly'); },
            function () { return eq(textFromHTML('This<' + '!-- is silly'), 'This<' + '!-- is silly'); },
            function () { return eq(textFromHTML('This<' + '!-- -- is not silly> is silly'), 'This is silly'); },
            function () { return eq(textFromHTML('This<' + '! is not silly > is silly'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'title>'), ''); },
            function () { return eq(textFromHTML('<' + 'title><' + '/title>'), ''); },
            function () { return eq(textFromHTML('<' + 'title>foo the bar<' + '/title>'), ''); },
            function () { return eq(textFromHTML('<' + 'title><' + 'img alt=This is not silly /> is silly<' + '/title>'), ''); },
            function () { return eq(textFromHTML('<' + 'script>'), ''); },
            function () { return eq(textFromHTML('<' + 'script><' + '/script>'), ''); },
            function () { return eq(textFromHTML('<' + 'script>foo the bar<' + '/script>'), ''); },
            function () { return eq(textFromHTML('<' + 'script><' + 'img alt=This is not silly /> is silly<' + '/script>'), ''); },
            function () { return eq(textFromHTML('<' + 'style>'), ''); },
            function () { return eq(textFromHTML('<' + 'style><' + '/style>'), ''); },
            function () { return eq(textFromHTML('<' + 'style>foo the bar<' + '/style>'), ''); },
            function () { return eq(textFromHTML('<' + 'style><' + 'img alt=This is not silly /> is silly<' + '/style>'), ''); },
            function () { return eq(textFromHTML('<' + 'textarea>'), ''); },
            function () { return eq(textFromHTML('<' + 'textarea><' + '/textarea>'), ''); },
            function () { return eq(textFromHTML('<' + 'textarea>foo the bar<' + '/textarea>'), ''); },
            function () { return eq(textFromHTML('<' + 'textarea><' + 'img alt=This is not silly /> is silly<' + '/textarea>'), ''); },
            function () { return eq(textFromHTML('<' + 'img alt="This <' + 'title> is silly">'), 'This <' + 'title> is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This <' + 'title><' + '/title> is silly">'), 'This <' + 'title><' + '/title> is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This <' + 'title><' + '[CDATA[]]' + '><' + '/title> is silly">'), 'This <' + 'title><' + '[CDATA[]]' + '><' + '/title> is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This is silly">'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=\'This is silly\'>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This is silly"/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=\'This is silly\'/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This is silly" />'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=\'This is silly\' />'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=This is not silly /> is silly'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This"> is <' + 'img alt="silly">'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=\'This\'> is <' + 'img alt=\'silly\'>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=This> is <' + 'img alt=silly>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt="This"/> is <' + 'img alt="silly"/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=\'This\'/> is <' + 'img alt=\'silly\'/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt=This/> is <' + 'img alt=silly/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt ="This"> is <' + 'img alt= "silly">'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt =\'This\'> is <' + 'img alt= \'silly\'>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt =This> is <' + 'img alt=silly>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt ="This"/> is <' + 'img alt= "silly"/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt =\'This\'/> is <' + 'img alt= \'silly\'/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'img alt =This/> is <' + 'img alt=silly/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT="This"> is <' + 'iMg AlT="silly">'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT=\'This\'> is <' + 'iMg AlT=\'silly\'>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT=This> is <' + 'iMg AlT=silly>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT="This"/> is <' + 'iMg AlT="silly"/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT=\'This\'/> is <' + 'iMg AlT=\'silly\'/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT=This/> is <' + 'iMg AlT=silly/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT ="This"> is <' + 'iMg AlT= "silly">'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT =\'This\'> is <' + 'iMg AlT= \'silly\'>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT =This> is <' + 'iMg AlT=silly>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT ="This"/> is <' + 'iMg AlT= "silly"/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT =\'This\'/> is <' + 'iMg AlT= \'silly\'/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'iMg AlT =This/> is <' + 'iMg AlT=silly/>'), 'This is silly'); },
            function () { return eq(textFromHTML('<' + 'qMg AlT =This/>This is silly<' + 'qMg AlT=silly/>'), 'This is silly'); },
            function () { return eq(textFromHTML('&' + 'lt;img alt=&' + '#x22;This is hard &' + 'amp;amp; silly!&' + 'quot; /&' + 'gt;'), '<' + 'img alt="This is hard &' + 'amp; silly!" />'); },
            function () { return eq(textFromHTML('<' + 'img alt="<' + 'img alt=&' + '#x22;This is hard &' + 'amp;amp; silly!&' + 'quot; />" />'), '<' + 'img alt="This is hard &' + 'amp; silly!" />'); },
            function () { return eq(textFromHTML('<' + '![CDATA[]]' + '>'), ''); },
            function () { return eq(textFromHTML('<' + '![CDATA[<' + 'img alt="This is hard &' + 'amp; silly!" />]]' + '>'), '<' + 'img alt="This is hard &' + 'amp; silly!" />'); },
            function () { return eq(textFromHTML('<' + '![CDATA['), '<' + '![CDATA['); },
            function () { return eq(textFromHTML('<' + '![CDATA[<' + '![CDATA[]]]]' + '><' + '![CDATA[>]]' + '>'), '<' + '![CDATA[]]' + '>'); },
            function () { return eq(textFromHTML('<' + 'plaintext>'), '\n\n'); },
            function () { return eq(textFromHTML('<' + 'plaintext><' + '/plaintext>'), '\n<' + '/plaintext>\n'); },
            function () { return eq(textFromHTML('This is hard <' + 'plaintext>&' + ' silly!'), 'This is hard \n&' + ' silly!\n'); },
            function () { return eq(textFromHTML('<' + 'plaintext><' + 'img alt="This is hard &' + 'amp; silly!" />'), '\n<' + 'img alt="This is hard &' + 'amp; silly!" />\n'); },
            function () { return eq(textFromHTML('<' + 'xmp>'), '\n\n'); },
            function () { return eq(textFromHTML('<' + 'xmp><' + '/xmp>'), '\n\n'); },
            function () { return eq(textFromHTML('This is <' + 'xmp>h&#x61rd<' + '/xmp><em>!</em>'), 'This is \nh&#x61rd\n!'); },
            function () { return eq(textFromHTML('This is hard <' + 'xmp>&' + ' silly!'), 'This is hard \n&' + ' silly!\n'); },
            function () { return eq(textFromHTML('<' + 'xmp><' + 'img alt="This is hard &' + 'amp; silly!" />'), '\n<' + 'img alt="This is hard &' + 'amp; silly!" />\n'); },
            function () { return eq(textFromHTML('<' + 'xmp><' + 'img alt="This is hard &' + 'amp; silly!" /><' + '/xmp>'), '\n<' + 'img alt="This is hard &' + 'amp; silly!" />\n'); },
            function () { return eq(textFromHTML('<' + 'listing>'), '\n\n'); },
            function () { return eq(textFromHTML('<' + 'listing><' + '/listing>'), '\n\n'); },
            function () { return eq(textFromHTML('This is <' + 'listing>h&#x61rd<' + '/listing><em>!</em>'), 'This is \nh&#x61rd\n!'); },
            function () { return eq(textFromHTML('This is hard <' + 'listing>&' + ' silly!'), 'This is hard \n&' + ' silly!\n'); },
            function () { return eq(textFromHTML('<' + 'listing><' + 'img alt="This is hard &' + 'amp; silly!" />'), '\n<' + 'img alt="This is hard &' + 'amp; silly!" />\n'); },
            function () { return eq(textFromHTML('<' + 'listing><' + 'img alt="This is hard &' + 'amp; silly!" /><' + '/listing>'), '\n<' + 'img alt="This is hard &' + 'amp; silly!" />\n'); },
            function () { return eq(textFromHTML('<' + '![CDATA[<' + 'img alt="This is hard &' + 'amp; silly!" />]]' + '>'), '<' + 'img alt="This is hard &' + 'amp; silly!" />'); },
            function () { return eq(textFromHTML('<' + '![CDATA['), '<' + '![CDATA['); },
            function () { return eq(textFromHTML('<' + '![CDATA[<' + '![CDATA[]]]]' + '><' + '![CDATA[>]]' + '>'), '<' + '![CDATA[]]' + '>'); },
            function () { return eq(rep('X', 0), ''); },
            function () { return eq(rep('X', 1), 'X'); },
            function () { return eq(rep('X', 10), 'XXXXXXXXXX'); },
            function () { return eq(rep('X', 4 * MAXTXTSZ).length, (4 * MAXTXTSZ)); },
            function () { return eq(singleLineTruncated(''), ''); },
            function () { return eq(singleLineTruncated('Hello, world!'), 'Hello, world!'); },
            function () { return eq(singleLineTruncated('Hello, world!  Go suck pond water.\r\n'), 'Hello, world! Go suck pond water.'); },
            function () { return eq(singleLineTruncated('This contains &nbsp; characters: \xa0 \u00a0'), 'This contains &nbsp; characters:'); },
            function () { "256 \xd7 X"; return eq(singleLineTruncated(rep('X', MAXTXTSZ)), rep('X', MAXTXTSZ)); },
            function () { "256 \xd7 U+D800"; return eq(singleLineTruncated(rep('\ud800', MAXTXTSZ)), rep('\ufffd', MAXTXTSZ)); },
            function () { "256 \xd7 U+DC00"; return eq(singleLineTruncated(rep('\udc00', MAXTXTSZ)), rep('\ufffd', MAXTXTSZ)); },
            function () { "128 \xd7 U+10000"; return eq(singleLineTruncated(rep('\ud800\udc00', 1 + (MAXTXTSZ >> 1))), rep('\ud800\udc00', (MAXTXTSZ >> 1))); },
            function () { "128 \xd7 U+DC00, U+D800"; return eq(singleLineTruncated(rep('\udc00\ud800', 1 + (MAXTXTSZ >> 1))), ('\ufffd' + rep('\ud800\udc00', ((MAXTXTSZ - 1) >> 1)))); },
            function () { "256 \xd7 U+10000"; return eq(singleLineTruncated(rep('\ud800\udc00', MAXTXTSZ)), rep('\ud800\udc00', (MAXTXTSZ >> 1))); },
            function () { "256 \xd7 U+DC00, U+D800"; return eq(singleLineTruncated(rep('\udc00\ud800', MAXTXTSZ)), ('\ufffd' + rep('\ud800\udc00', ((MAXTXTSZ - 1) >> 1)))); },
            function () { "Hello! and 4096 whitespace characters"; return eq(singleLineTruncated(rep(' \t\n\r', MAXTXTSZ) + 'Hello!' + rep(' \t\n\r', MAXTXTSZ)), 'Hello!'); },
            function () { "1024 \xd7 X"; return eq(singleLineTruncated(rep('X', 4 * MAXTXTSZ)), rep('X', MAXTXTSZ)); },
            function () { "1024 \xd7 U+D800"; return eq(singleLineTruncated(rep('\ud800', 4 * MAXTXTSZ)), rep('\ufffd', MAXTXTSZ)); },
            function () { "1024 \xd7 U+DC00"; return eq(singleLineTruncated(rep('\udc00', 4 * MAXTXTSZ)), rep('\ufffd', MAXTXTSZ)); },
            function () { "1024 \xd7 U+10000"; return eq(singleLineTruncated(rep('\ud800\udc00', 4 * MAXTXTSZ)), rep('\ud800\udc00', (MAXTXTSZ >> 1))); },
            function () { "1024 \xd7 U+DC00, U+D800"; return eq(singleLineTruncated(rep('\udc00\ud800', 4 * MAXTXTSZ)), ('\ufffd' + rep('\ud800\udc00', ((MAXTXTSZ - 1) >> 1)))); },
            function () { "Hello! and 8192 whitespace characters"; return eq(singleLineTruncated(rep(' \t\n\r', 4 * MAXTXTSZ) + 'Hello!' + rep(' \t\n\r', 4 * MAXTXTSZ), 1), 'Hello!'); },
            function () { "Done."; window.alert("RSS Panel X self test: success!"); return true; }
            ];
        var i = 0;
        var runTest;
        var oldMAXTXTSZ = MAXTXTSZ;
        var oldStatus = '';
        var eett;
        try
        {
            oldStatus = window.status;
        }
        catch (eett)
        {
        }
        MAXTXTSZ = 256;
        runTest = function () {
            var done = false;
            var closure = closures[i];
            var eet;
            try
            {
                var eest;
                try
                {
                    window.status = 'test ' + i + ': ' + singleLineTruncated('' + closure) + ' at ' + now();
                }
                catch (eest)
                {
                }
                reset_eq();
                if (! closure())
                {
                    var aem = '';
                    if (aeo != undef)
                    {
                        aem = escapeJavaScript(aea);
                    }
                    window.prompt('test ' + i + ' failed: ' + singleLineTruncated('' + closure) + ' at ' + now(), aem);
                    done = true;
                }
            }
            catch (eet)
            {
                window.alert('test ' + i + ' exception: ' + (eet.message ? eet.message : eet.toString()) + ' code: ' + singleLineTruncated('' + closure) + ' at ' + now());
                done = true;
            }
            i = i + 1;
            if (i >= closures.length)
            {
                done = true;
            }
            if (! done)
            {
                var hdl = undef;
                if (! unverifiedSetTimeout)
                {
                    var eewst;
                    try
                    {
                        hdl = window.setTimeout(runTest, 1);
                    }
                    catch (eewst)
                    {
                    }
                }
                return hdl;
            }
            else
            {
                MAXTXTSZ = oldMAXTXTSZ;
                var eest;
                try
                {
                    window.status = oldStatus;
                }
                catch (eest)
                {
                }
                return -1;
            }
        };
        var hdl;
        while ((hdl = runTest()) == undef)
        {
        }
    };

    // register menu items where possible
    registerMenuCommand("RSS Panel X Autodetect", rss_init, 'r', 'alt', 'r');
    registerMenuCommand("RSS Panel X Autodetect+", function(){rss_init(undef, undef, true);}, undef, undef, '+');
    registerMenuCommand("RSS Panel X for this feed",
                        function () {
                            rss_req(location_minusFragment(get_location()));
                        }, 'r', 'alt shift', 'f');
    registerMenuCommand("RSS Panel X self test", test, undef, undef, 't');
    registerMenuCommand("About RSS Panel X", notice, undef, undef, 'x');

})((typeof(rssPanelTargetWindow)=='undefined')?window:((function(){return rssPanelTargetWindow;})()),
   (typeof(rssPanelTargetURI)=='undefined')?void(null):((function(){return rssPanelTargetURI;})()),
   (typeof(rssPanelScriptURI)=='undefined')?void(null):((function(){return rssPanelScriptURI;})()));

/*
 * $Log: rsspanel.user.js,v $
 * Revision 1.205  2009/02/03 02:06:25  bsittler
 * new contact info
 *
 * Revision 1.204  2009/02/03 02:02:33  bsittler
 * bsittler15; parse HTML inside dc:description
 *
 * Revision 1.203  2009/02/03 00:55:53  bsittler
 * fixed quoting of a backslash, so back to regexp literal
 *
 * Revision 1.202  2009/01/23 01:25:51  bsittler
 * use RegExp constructor for one expression which gave the Lobo browser indigestion
 *
 * Revision 1.201  2008/09/15 15:12:40  bsittler
 * homepage moved to xent.com
 *
 * Revision 1.200  2007/05/30 03:41:46  bsittler
 * bsittler14
 *
 * Revision 1.199  2007/05/30 03:39:33  bsittler
 * oops, that is author, not description
 *
 * Revision 1.198  2007/05/30 03:30:32  bsittler
 * even more lax hina-di parsing
 *
 * Revision 1.197  2007/05/30 03:03:33  bsittler
 * do not draw panels after page transition
 *
 * Revision 1.196  2007/05/30 02:58:02  bsittler
 * do not render panel onto wrong page
 *
 * Revision 1.195  2007/05/30 02:50:25  bsittler
 * quoting in hina.di is not well-defined; for now we treat the title as HTML
 *
 * Revision 1.194  2007/05/30 02:04:32  bsittler
 * more relaxed hina-di parsing
 *
 * Revision 1.193  2007/05/30 01:58:02  bsittler
 * less buggy still
 *
 * Revision 1.192  2007/05/30 01:03:12  bsittler
 * massive cleanup to hina, hina-di and LIRS code; support for some WWW-Dancing-Bee extensions
 *
 * Revision 1.191  2007/05/29 10:15:09  bsittler
 * *** empty log message ***
 *
 * Revision 1.190  2007/05/29 10:03:34  bsittler
 * more resilient hina-di
 *
 * Revision 1.189  2007/05/29 09:39:30  bsittler
 * next rev begins
 *
 * Revision 1.188  2007/05/29 09:28:33  bsittler
 * changelog: lirs + hina + hina-di
 *
 * Revision 1.187  2007/05/29 09:25:57  bsittler
 * LIRS too
 *
 * Revision 1.186  2007/05/29 09:07:28  bsittler
 * hina-di
 *
 * Revision 1.185  2007/05/29 08:46:09  bsittler
 * better HINA
 *
 * Revision 1.184  2007/05/29 08:31:19  bsittler
 * original HINA support
 *
 * Revision 1.183  2007/05/29 05:03:00  bsittler
 * typo
 *
 * Revision 1.182  2007/05/29 05:01:34  bsittler
 * support rel="feed" and ignore rel="alternate stylesheet"
 *
 * Revision 1.181  2007/05/29 03:09:32  bsittler
 * add support for alternate creative commons namespace
 *
 * Revision 1.180  2007/05/28 04:56:06  bsittler
 * next rev
 *
 * Revision 1.179  2007/05/28 03:58:39  bsittler
 * oops, do not run regexes on null
 *
 * Revision 1.178  2007/05/24 05:02:42  bsittler
 * better url canonicalization (still not perfect)
 *
 * Revision 1.177  2007/05/23 15:21:25  bsittler
 * more moinmoin bugfix: use rss1.0 semantics for null namespaced rss elements
 *
 * Revision 1.176  2007/05/23 15:16:55  bsittler
 * workaround for moinmoin bug
 *
 * Revision 1.175  2007/05/23 05:58:37  bsittler
 * canonicalize URLs before comparison
 *
 * Revision 1.174  2007/05/23 05:03:19  bsittler
 * changelog
 *
 * Revision 1.173  2007/05/23 04:53:30  bsittler
 * looking in the body is possible, but not the default
 *
 * Revision 1.172  2007/05/23 04:06:10  bsittler
 * find in-document feed references
 *
 * Revision 1.171  2007/05/23 04:03:50  bsittler
 * also find feeds linked to inside the document
 *
 * Revision 1.170  2007/05/23 03:39:49  bsittler
 * default atom link rel to "alternate"
 *
 * Revision 1.169  2007/05/23 03:35:59  bsittler
 * changelog
 *
 * Revision 1.168  2007/05/23 02:50:48  bsittler
 * workaround for truly horrible MSIE bug relating to the HTML <title/> element
 *
 * Revision 1.167  2007/05/23 01:02:10  bsittler
 * changelog, too
 *
 * Revision 1.166  2007/05/23 01:01:03  bsittler
 * copy with broken atom feeds where link is missing the rel attribute
 *
 * Revision 1.165  2007/05/23 00:59:14  bsittler
 * changelog
 *
 * Revision 1.164  2007/05/23 00:54:24  bsittler
 * fix bug with namespaced nodes in ie6 and below
 *
 * Revision 1.163  2007/05/23 00:29:59  bsittler
 * rel="service.feed"
 *
 * Revision 1.162  2007/05/22 17:05:33  bsittler
 * bsittler11
 *
 * Revision 1.161  2007/05/22 05:42:58  bsittler
 * update changelog for 2.01-bsittler10
 *
 * Revision 1.160  2007/05/22 05:41:58  bsittler
 * better error handling
 *
 * Revision 1.159  2007/05/22 04:59:37  bsittler
 * found a way to fix the broken DOM
 *
 * Revision 1.158  2007/05/22 04:27:26  bsittler
 * copy with orphaned boxes
 *
 * Revision 1.157  2007/05/22 03:32:32  bsittler
 * that did not help, actually
 *
 * Revision 1.156  2007/05/22 03:02:07  bsittler
 * better support for DOMs that get redone between feed fetches
 *
 * Revision 1.155  2007/05/22 02:27:14  bsittler
 * do not trust setTimeout
 *
 * Revision 1.154  2007/05/22 02:15:29  bsittler
 * typo
 *
 * Revision 1.153  2007/05/22 02:05:04  bsittler
 * rel=self hack removed, too many feeds get it wrong
 *
 * Revision 1.152  2007/05/21 19:58:27  bsittler
 * owl:Class is only interesting when it has more than just rdfs:isDefinedBy inside
 *
 * Revision 1.151  2007/05/21 19:53:27  bsittler
 * owl:Class is first-class, too
 *
 * Revision 1.150  2007/05/21 19:36:02  bsittler
 * NDEBUG
 *
 * Revision 1.149  2007/05/21 19:35:07  bsittler
 * oops
 *
 * Revision 1.148  2007/05/21 19:31:43  bsittler
 * support <atom:link rel="self" href="..." /> in RDF, Atom and RSS feeds
 *
 * Revision 1.147  2007/05/21 19:09:19  bsittler
 * oops! omitted real_url should not break the feed
 *
 * Revision 1.146  2007/05/21 19:02:11  bsittler
 * working (?) onclick
 *
 * Revision 1.145  2007/05/21 18:51:45  bsittler
 * fix multihandler feedburner click bug
 *
 * Revision 1.144  2007/05/21 18:46:20  bsittler
 * support feedburner:origLink using onclick handler to navigate to (feedburner) link; add support for bio extensions to FOAF; cleaner support for enclosures
 *
 * Revision 1.143  2007/05/21 18:02:19  bsittler
 * scrap that feedburner stuff; may re-add it later
 *
 * Revision 1.142  2007/05/21 18:00:06  bsittler
 * support feedburner origLink (ideally we'd add an onclick handler to navigate via the feedburner link in this case... but that requires more sophisticated handling)
 *
 * Revision 1.141  2007/05/21 17:53:39  bsittler
 * subject goes first
 *
 * Revision 1.140  2007/05/21 17:49:20  bsittler
 * more consistent
 *
 * Revision 1.139  2007/05/21 17:22:19  bsittler
 * MESH
 *
 * Revision 1.138  2007/05/21 17:20:58  bsittler
 * fix braino
 *
 * Revision 1.137  2007/05/21 17:03:49  bsittler
 * more dc casing workarounds
 *
 * Revision 1.136  2007/05/21 17:02:15  bsittler
 * typo
 *
 * Revision 1.135  2007/05/21 16:59:38  bsittler
 * better dc workarounds; better rdfs:comment support
 *
 * Revision 1.134  2007/05/21 16:51:30  bsittler
 * rdfs:label wins, too; multiple rdfs:comment instances are concatenated
 *
 * Revision 1.133  2007/05/21 16:46:04  bsittler
 * rdfs:comment gets priority for better ICRA support
 *
 * Revision 1.132  2007/05/21 05:52:48  bsittler
 * better support for semantic mediawiki hacks
 *
 * Revision 1.131  2007/05/20 21:39:11  bsittler
 * better content label support (still a hack)
 *
 * Revision 1.130  2007/05/20 21:29:38  bsittler
 * content labels
 *
 * Revision 1.129  2007/05/20 06:19:41  bsittler
 * typo
 *
 * Revision 1.128  2007/05/20 06:16:20  bsittler
 * doap
 *
 * Revision 1.127  2007/05/20 06:15:46  bsittler
 * more DOAP-y
 *
 * Revision 1.126  2007/05/20 05:54:56  bsittler
 * typo
 *
 * Revision 1.125  2007/05/20 05:54:02  bsittler
 * ignore rdf stuff inside rss items
 *
 * Revision 1.124  2007/05/20 05:12:35  bsittler
 * smw articles
 *
 * Revision 1.123  2007/05/20 05:01:12  bsittler
 * some smw support
 *
 * Revision 1.122  2007/05/19 16:35:23  bsittler
 * be more careful about touching the radioactive location
 *
 * Revision 1.121  2007/04/26 09:31:50  bsittler
 * bsittler10
 *
 * Revision 1.120  2007/04/26 09:30:58  bsittler
 * text/xml+opml
 *
 * Revision 1.119  2007/04/26 04:37:33  bsittler
 * bsittler9
 *
 * Revision 1.118  2007/04/26 04:35:20  bsittler
 * support rel=outline
 *
 * Revision 1.117  2007/04/25 21:28:52  bsittler
 * fixed version number
 *
 * Revision 1.116  2007/04/13 00:03:14  bsittler
 * update old copyright info
 *
 * Revision 1.115  2007/04/04 19:44:08  bsittler
 * bsittler8
 *
 * Revision 1.114  2007/04/04 19:41:34  bsittler
 * changelog for previous
 *
 * Revision 1.113  2007/04/04 19:39:38  bsittler
 * exclude file:* to workaround a firebug crash
 *
 * Revision 1.112  2007/04/03 06:25:33  bsittler
 * *** empty log message ***
 *
 * Revision 1.111  2007/04/02 23:56:54  bsittler
 * *** empty log message ***
 *
 * Revision 1.110  2007/03/07 05:31:20  bsittler
 * *** empty log message ***
 *
 * Revision 1.109  2007/03/06 03:37:05  bsittler
 * *** empty log message ***
 *
 * Revision 1.108  2006/11/22 00:12:00  bsittler
 * *** empty log message ***
 *
 * Revision 1.107  2006/11/18 20:00:13  bsittler
 * i'm not interested.
 *
 * Revision 1.106  2006/11/18 19:26:32  bsittler
 * less strict about capitalization for dc:title; add support for
 * foaf:Document; add support for foaf:interest (as a top-level node)
 *
 * Revision 1.105  2006/11/18 06:46:27  bsittler
 * partial RDF and FOAF support, better root-element-namespace based format detection
 *
 * Revision 1.104  2006/11/13 19:04:02  bsittler
 * add an explicit test for correct handling of \xa0
 *
 * Revision 1.103  2006/11/13 18:56:44  bsittler
 * reindented, and now character classes are unicode 4.1/ppython 2.5-compatible
 *
 * Revision 1.102  2006/11/10 18:17:07  bsittler
 * new html parser works in konqueror, yay!
 *
 * Revision 1.101  2006/11/07 04:05:53  bsittler
 * character classes work now, but are horribly inefficient for large
 * unicode ranges including \S, \D and \W.
 *
 * Revision 1.100  2006/11/06 02:54:33  bsittler
 * start down the road toward full unicode support -- added a UTF-8
 * codec; only run unit tests when requested
 *
 * Revision 1.99  2006/11/05 05:19:16  bsittler
 * ooops! fix spurious warning
 *
 * Revision 1.98  2006/11/05 05:13:50  bsittler
 * reorg menu items
 *
 * Revision 1.97  2006/11/05 05:12:47  bsittler
 * do not run tests except as a menu item
 *
 * Revision 1.96  2006/11/05 03:29:09  bsittler
 * leave invalid numeric character references undecoded rather than
 * converting them to the replacement character.
 *
 * Revision 1.95  2006/11/04 21:32:40  bsittler
 * add support for <' + 'dir>
 *
 * Revision 1.94  2006/11/04 18:16:20  bsittler
 * remove mapping of 0x8f from cp1252
 *
 * Revision 1.93  2006/11/04 17:52:30  bsittler
 * remove bogus comments from recode output (yay for franglais!)
 *
 * Revision 1.92  2006/11/04 06:20:28  bsittler
 * updated changelog
 *
 * Revision 1.91  2006/11/04 06:17:35  bsittler
 * more unit tests; fix some bugs in xhtml.entities; improve textFromHTML
 * so that it is at least theoretically "correct" for some tagsoup-like
 * definition of HTML (tested in Firefox and Opera)
 *
 * Revision 1.90  2006/11/03 06:34:04  bsittler
 * more smoke tests
 *
 * Revision 1.89  2006/11/03 06:28:33  bsittler
 * ooops! remove alert
 *
 * Revision 1.88  2006/11/03 06:27:27  bsittler
 * added a javascript escaping function (not used yet); improve the XML escaping function; add a few smoke tests
 *
 * Revision 1.87  2006/11/02 21:35:29  bsittler
 * bsittler7!
 *
 * Revision 1.86  2006/11/02 21:34:32  bsittler
 * added cp1252/mac-style fallback remapping for text in the C1 range
 *
 * Revision 1.85  2006/10/29 05:46:06  bsittler
 * added changelog entry for 2.01-bsittler6
 *
 * Revision 1.84  2006/10/29 05:41:09  bsittler
 * nearly rsspanel2.01-bsittler6
 *
 * Revision 1.83  2006/10/29 03:41:12  bsittler
 * consolidate browser checks and use bug flags rather than browser
 * family flags to control behavior
 *
 * Revision 1.82  2006/10/28 22:57:15  bsittler
 * headers for xmlhttprequest too
 *
 * Revision 1.81  2006/10/27 19:59:42  bsittler
 * a bit of refactoring, and send an Accept: header (at least when using GM_XmlhttpRequest)
 *
 * Revision 1.80  2006/10/27 19:19:31  bsittler
 * improve msie xml display detection; support feed sniffing in firefox
 * when xml is sent with an html content-type
 *
 * Revision 1.79  2006/10/27 09:28:31  bsittler
 * try to autosniff when viewing feed:, but this does not actually work...
 *
 * Revision 1.78  2006/10/27 08:45:57  bsittler
 * add OPML to format lists
 *
 * Revision 1.77  2006/10/27 08:29:11  bsittler
 * belatedly bump version number to 2.01-bsittler5; work around the MSIE
 * box bugs for subsequent feeds too
 *
 * Revision 1.76  2006/10/27 08:01:08  bsittler
 * msie does not have getAttributeNS (at least in some cases)
 *
 * Revision 1.75  2006/10/27 07:13:12  bsittler
 * better OPML
 *
 * Revision 1.74  2006/10/27 07:04:07  bsittler
 * OPML!
 *
 * Revision 1.73  2006/10/27 05:14:56  bsittler
 * "support" OPML by flattening it into an RSS feed
 *
 * Revision 1.72  2006/10/27 04:28:41  bsittler
 * disallow excessively crafty container-escaping behavior
 *
 * Revision 1.71  2006/10/27 04:25:14  bsittler
 * make sure there are no tag open or tag close sequences in the source
 * so that it hopefully passes html-tidy's tests
 *
 * Revision 1.70  2006/10/27 04:02:35  bsittler
 * add support for mod_enclosure
 *
 * Revision 1.69  2006/10/27 02:50:39  bsittler
 * work around horrible flaws in both of the MSIE box models (strict and
 * lax -- both too buggy to use!)
 *
 * Revision 1.68  2006/10/26 00:13:52  bsittler
 * workaround for opera foolishness re: not fetching the self-url for
 * file: pages
 *
 * Revision 1.67  2006/10/25 23:16:34  bsittler
 * be a bit more robust
 *
 * Revision 1.66  2006/10/25 22:35:11  bsittler
 * better konqueror error-handling (cross-site scripting restrictions);
 * tries to pop up a separate window if unable to access window.document;
 * there's now a watchdog timer for XMLHttpRequest (set to 40s.)
 *
 * Revision 1.65  2006/10/25 20:03:43  bsittler
 * firefox feed detector works
 *
 * Revision 1.64  2006/10/25 19:37:30  bsittler
 * missing comma, add support for firefox feed reader
 *
 * Revision 1.63  2006/10/25 19:15:27  bsittler
 * always downcase scheme
 *
 * Revision 1.62  2006/10/25 19:13:00  bsittler
 * scheme is case-insensitive; support application/xml alternates
 *
 * Revision 1.61  2006/10/25 04:49:58  bsittler
 * typo
 *
 * Revision 1.60  2006/10/25 00:13:21  bsittler
 * deal sensibly with konqueror's completely bogus scheme for error
 * reporting
 *
 * Revision 1.59  2006/10/24 23:41:09  bsittler
 * back to async
 *
 * Revision 1.58  2006/10/24 21:08:33  bsittler
 * now works as a Konqueror Minitool for RSS, Atom and hAtom feeds
 *
 * Revision 1.57  2006/10/24 20:09:39  bsittler
 * use relative URLs for XMLHttpRequest when possible and not running inside Greasemonkey
 *
 * Revision 1.56  2006/10/24 20:04:34  bsittler
 * new homepage and namespace
 *
 * Revision 1.55  2006/10/24 19:36:57  bsittler
 * switch to preprelease version and change namespace (again!)
 *
 * Revision 1.54  2006/10/24 18:30:26  bsittler
 * registering a menu command with accelerators does not work in turnabout, so try again without accelerators if an exception is raised
 *
 * Revision 1.53  2006/10/24 18:15:18  bsittler
 * Added keyboard and= menu key accelerators:
 * &RSS Panel X Autodetect = Alt+R
 * RSS Panel X &for this feed = Alt+Shift+R
 * About RSS Panel &X
 *
 * Revision 1.52  2006/10/23 16:55:18  bsittler
 * start work on 2.01-bsittler4 (as of previous rev, actually)
 *
 * Revision 1.51  2006/10/23 16:54:58  bsittler
 * source should be us-ascii
 *
 * Revision 1.50  2006/10/23 09:03:09  bsittler
 * oops! bitrot for "rss panel x for this feed"
 *
 * Revision 1.49  2006/10/23 06:20:39  bsittler
 * more hacks
 *
 * Revision 1.48  2006/10/23 06:12:16  bsittler
 * un-break non-Konqueror browsers
 *
 * Revision 1.47  2006/10/23 05:46:27  bsittler
 * work in konqueror as a bookmarklet (hAtom only for now)
 *
 * Revision 1.47  2006/10/23 05:43:43  bsittler
 * remove bogus rcs keywords in old log entry; fix a bunch of stray refs
 * to document -> window.document; work around some Konqueror bugs (works
 * now for hAtom as a Minitools favorite, but not for anything requiring
 * XMLHttpRequest yet...)
 *
 * Revision 1.46  2006/10/23 03:24:35  bsittler
 * userscripts too!
 *
 * Revision 1.45  2006/10/23 03:22:03  bsittler
 * typo!
 *
 * Revision 1.44  2006/10/23 02:45:12  bsittler
 * patched to work with CreamMonkey 0.7; it turns out that in Safari the
 * following nonsensical assertion is true:
 *
 * ((new window.DOMParser).parseFromString('<' + 'link/>').documentElement.namespaceURI
 *  ==
 *  'http://www.w3.org/1999/xhtml')
 *
 * Revision 1.43  2006/10/22 22:37:06  bsittler
 * updated changelog
 *
 * Revision 1.42  2006/10/22 22:36:23  bsittler
 * overflow fix works in MSIE now, too
 *
 * Revision 1.41  2006/10/22 22:02:24  bsittler
 * display dates in iso8601 style
 *
 * Revision 1.40  2006/10/22 22:00:00  bsittler
 * added Log and Date keywords
 *
 */

