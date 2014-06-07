// ==UserScript==
// @name           GreaseMandrill
// @namespace      http://thomas-rosenau.de/
// @description    CSS/JavaScript Syntax Highlighter
// @require        http://jsbeautifier.org/beautify.js
// @include        *
// ==/UserScript==

(function () { function GreaseMandrill() {



////// config zone  //////

// NOTE: Some of these options will be overwritten by menu settings (n/a in Opera)

var UPDATECHECKINTERVAL = 60; // days
var OPERA_SHOWUPDATENOTICE = true;
var THEME = 'default';
var MAXLENGTH = 100; // kB; do not automatically highlight files larger than this
var GREASEMANDRILLTOGGLE = 'G';
var LINEBREAKTOGGLE = 'W'; // opera doesn't like 'W', cf. http://help.opera.com/Windows/9.50/en/keyboard.html#single-key
var PRELOADTHUMBNAILS = false;
var IMAGEDIMENSIONTOOLTIPS = false;
var SHOWLINENUMBERS = true;
var INDENTJAVASCRIPT = true;
var THUMBNAILTEMPLATE =
    '<div style="-moz-border-radius: 7px; background-color: lightyellow; border: 2px outset gray; padding: 7px;">\
         <img src="%href%" style="max-width: 500px; max-height: 500px; display: block; margin: 0 auto; border: 1px solid silver; background-image:%checkers%"/>\
         <div style="position: relative; text-align: center; margin-top: 5px; font-family: monospace; font-weight: bold; font-size: 12px; color: #ededd0;">\
            %width% \u00D7 %height%\
            <span style="width: 100%; position:absolute; left: -2px; top: -2px; color: black; font-weight: normal; ">\
                %width% \u00D7 %height%\
            </span>\
        </div>\
    </div>'; // fancy
//var THUMBNAILTEMPLATE = '<img src="%href%" style="background-image: %checkers%; border: 1px solid gray">'; // plain

THEMES = {

/* NOTE: "Courier New italic" has a funked-up line-height, whereas "Courier New italic bold" is ok
         So don't use "font-style: italic" without "font-weight: bold" if your browser's monospace font is "Courier New"
*/
    'default': {
        DEFAULT: 'background: white; color: black;',
        LINENUMBERS: 'color: #AAA; background-color: #f6f6f6;',
        ERROR: 'background-color: #F09; color: white; font-weight: bolder;',
        WHITESPACE: '',
        COMMENT: 'color: #C0C0C0; font-weight: bold; font-style: italic;',
        LINECOMMENT: 'color: #C0C0C0; font-weight: bold; font-style: italic;',
        CONDITIONALCOMPILATION: 'background-color: #f4f4f4; color: #999',
        KEYWORD: 'color: #D5006A;',
        OPERATOR: 'font-weight: bold; color: #00A;',
        STRING: 'color: #0080C0; background-color: #F7FFF9;',
        SINGLESTRING: 'color: #008000; background-color: #F7FDFF;',
        FUNCTION: '',
        JQUERY: 'color: #628dcf;',
        REGEX: 'background-color: #FCF5FF; color: #8000FF;',
        KEYWORDCONST: 'color: darkorchid;',
        BUILTIN: 'color: saddlebrown;',
        RESERVED: 'border-bottom: 1px dashed #f09;',
        NUMBER: 'color: #FF8000; font-weight: bold;',
        FLOAT: '',
        HEX: '',
        OCT: '',
        INTEGER: '',
        ATRULE: 'color: #600; font-weight: bold;',
        TAGNAME: 'color: #4000FF; font-weight: bold;',
        ID: 'color: #00A0FF;',
        CLASSNAME: 'color: #FF8000;',
        ATTRIBUTE: 'font-style: italic; font-weight: bold;',
        PSEUDOCLASS: 'color: #090;',
        PROPERTY: 'color: #D5006A;',
        PROPRIETARY: 'background-color: #fff7fb; border-bottom: 1px dashed #d5006a;',
        CSS_KEYWORD: 'color: inherit;',
        URL: 'background-color: #FCF5FF; color: #8000FF;',
        'URL:hover': 'text-decoration: underline;',
        LENGTH: '',
        COLOR: '',
        'COLOR:hover': 'font-weight: bold; cursor: default;',
        IMPORTANT: 'background-color: #ffffe4;'
    },

    'Userscripts.org': {
        DEFAULT: 'background-color: white; color: black;',
        LINENUMBERS: 'background-color: #DDDDDD',
        COMMENT: 'color:green',
        KEYWORD: 'color: #B26818;',
        STRING: 'color: red;',
        FUNCTION: 'color: blue;',
        REGEX: 'color: #cc00cc;',
        KEYWORDCONST: 'color:#B26818;',
        BUILTIN: 'color:#B26818;',
        RESERVED: 'color:#B26818;',
        NUMBER: 'color:red',
        ID: 'color: #B26818;',
        CLASSNAME: 'color: #B26818;',
        PROPERTY: 'color:#B26818;',
        CSS_KEYWORD: 'color:red;',
        URL: 'color:red;',
        LENGTH: 'color:red;',
        COLOR: 'color:red;',
        'COLOR:hover': 'color: blue;',
        IMPORTANT: 'color: red;'
    },

    'Wikipedia': {
        DEFAULT: 'background-color: #F9F9F9; color: black;',
        LINENUMBERS: 'background-color: #E0E0E0',
        COMMENT: 'color:#009900; font-style:italic; font-weight: bold;',
        KEYWORD: 'font-weight: bold; color:#000066;',
        STRING: 'color:#3366CC;',
        SINGLESTRING: 'color:#3366CC;',
        REGEX: 'color:#0066FF;',
        KEYWORDCONST: 'color:#003366; font-weight: bold',
        BUILTIN: 'color:#006600;',
        RESERVED: 'color:#003366; font-weight: bold',
        NUMBER: 'color: #c00',
        HEX: 'color: inherit;',
        CSS_OPERATOR: 'color:#66CC66;',
        CSS_STRING: 'color: red;',
        CSS_SINGLESTRING: 'color: red;',
        CSS_COMMENT: 'color:#808080; font-style:italic; font-weight: bold;',
        ATRULE: 'color:#A1A100;',
        ID: 'color:#CC00CC;',
        CLASSNAME: 'color:#6666FF;',
        PSEUDOCLASS: 'color:#3333FF;',
        PROPERTY: 'font-weight: bold;',
        CSS_KEYWORD: 'color:#993333; font-weight: normal;',
        URL: 'color:#993333;',
        LENGTH: 'color:#993333;',
        COLOR: 'color:#993333;',
        'COLOR:hover': 'font-weight: bold;',
    },

    'John Resig': {
        DEFAULT: 'background-color: black; color:#73C836;',
        LINENUMBERS: 'background-color: gray; color: black;',
        'LANG:JS': 'font-family: Monaco,"Courier New",monospace',
        'LANG:CSS': 'background-color: white; color:black;',
        COMMENT: 'color: rgb(95,97,126);',
        KEYWORD: 'color: #96A6C8',
        OPERATOR: 'color: white;',
        STRING: 'color: rgb(204,140,60);',
        JQUERY: 'color: rgb(204,140,60);',
        REGEX: 'color: rgb(153,0,102);',
        BUILTIN: 'color: #CC8C3C;',
        NUMBER: 'color: rgb(133,142,244);',
        CSS_COMMENT: 'color: #4040c2;',
        CSS_OPERATOR: 'color: inherit',
        PROPERTY: 'color: navy; font-weight: bold;',
        CSS_KEYWORD: 'color: blue;',
        'URL:hover': 'text-decoration: underline;',
        CSS_STRING: 'color: teal;',
        LENGTH: 'color: red;',
        COLOR: 'color: green;',
        'COLOR:hover': 'font-weight: bold; cursor: default;',
    },

    'PHP.net': {
        DEFAULT: 'background-color:#F0F0F0; color: #0000BB;',
        LINENUMBERS: 'color: #FF8000;',
        KEYWORD: 'color: #007700;',
        ERROR: 'background-color: #fee; color: #660000; border: 1px solid #660',
        BUILTIN: 'color: #007700;',
        OPERATOR: 'color: #007700;',
        STRING: 'color: #d00;',
        REGEX: 'color: black;',
        COMMENT: 'color: #FF8000;',
        PROPERTY: 'color: #007700;',
        ATRULE: 'color: black',
        ATTRIBUTE: 'color: black',
        TAGNAME: 'color: black',
        ID: 'color: black',
        CLASSNAME: 'color: black',
        PSEUDOCLASS: 'color: #007700;',
        IMPORTANT: 'color: #007700;',
        'COLOR:hover': 'font-weight: bold;',
        URL: 'color:black'
    },

    'easter': {
        DEFAULT: 'background-color: #ffff80; color: #2C7B34;',
        LINENUMBERS: 'color: orange;',
        KEYWORD: 'color: #1d45d6; font-weight: bold;',
        STRING: 'color: #ca4be3;',
        REGEX: 'color: #ca4be3;',
        COMMENT: 'color: #24c815; font-style: italic; font-weight: bold;',
        NUMBER: 'color: #e11a70;',
        OPERATOR: 'color: #fa4700;',
        FUNCTION: 'color: #1d45d6;',
        OPERATOR: 'color: #fa4700;',
        CLASSNAME: 'color: #26aae7; font-weight: bold;',
        ID: 'color: #26aae7; font-weight: bold;',
        PROPERTY: 'color: #1d45d6; font-weight: bold;',
        CSS_KEYWORD: 'color: #ca4be3; font-weight: normal',
        URL: 'color: #ca4be3;',
        LENGTH: 'color: #ca4be3;',
        COLOR: 'color: #ca4be3;',
        'COLOR:hover': 'color: black;',
        IMPORTANT: 'color: #ca4be3;'
    },

    'bright': {
        DEFAULT: 'background-color: #ffffff; color: #401e7a;',
        LINENUMBERS: 'color: gray;',
        KEYWORD: 'color: #ff3030; font-weight: bold;',
        STRING: 'color: #1861a7;',
        REGEX: 'color: #1861a7;',
        COMMENT: 'color: #38ad24;',
        INTEGER: 'color: #32ba06;',
        FLOAT: 'color: #32ba06;',
        HEX: 'color: #32ba06;',
        OCT: 'color: #32ba06;',
        OPERATOR: 'color: #3030ee;',
        FUNCTION: 'color: #d11ced;',
        OPERATOR: 'color: #3030ee;',
        CLASSNAME: 'color: #0000ff;',
        ID: 'color: #0000ff;',
        PROPERTY: 'color: #ff3030; font-weight: bold;',
        CSS_KEYWORD: 'color: #1861a7; font-weight: normal',
        URL: 'color: #1861a7;',
        LENGTH: 'color: #1861a7;',
        COLOR: 'color: #1861a7;',
        'COLOR:hover': 'color: darkorange',
        IMPORTANT: 'color: #1861a7;'
    },

    'greenlcd': {
        DEFAULT: 'background-color: #003400; color: #00bb00;',
        LINENUMBERS: 'color: #060;',
        KEYWORD: 'color: #00ed00; font-weight: bold;',
        STRING: 'color: #dfdfdf;',
        REGEX: 'color: #dfdfdf;',
        COMMENT: 'color: #888888; font-style: italic;  font-weight: bold;',
        NUMBER: 'color: #ffffff;',
        OPERATOR: 'color: #2fe7a9;',
        FUNCTION: 'color: #c0ff73;',
        OPERATOR: 'color: #2fe7a9;',
        CLASSNAME: 'color: #beef13;',
        ID: 'color: #beef13;',
        PROPERTY: 'color: #00ed00; font-weight: bold;',
        CSS_KEYWORD: 'color: #dfdfdf; font-weight: normal',
        URL: 'color: #dfdfdf;',
        LENGTH: 'color: #dfdfdf;',
        COLOR: 'color: #dfdfdf;',
        'COLOR:hover': 'color: white',
        IMPORTANT: 'color: #dfdfdf;'
    },

    'neon': {
        DEFAULT: 'background-color: #000000; color: #ffffff;',
        LINENUMBERS: 'color: #ff6;',
        KEYWORD: 'color: #00ffff; font-weight: bold;',
        STRING: 'color: #cd00ff;',
        REGEX: 'color: #cd00ff;',
        COMMENT: 'color: #00ff00; font-style: italic;  font-weight: bold;',
        NUMBER: 'color: #ff00ff;',
        OPERATOR: 'color: #ee5896; font-weight: bold;',
        FUNCTION: 'color: #ffffff; font-weight: bold;',
        OPERATOR: 'color: #ee5896; font-weight: bold;',
        CLASSNAME: 'color: #ef1347; font-weight: bold;',
        ID: 'color: #ef1347; font-weight: bold;',
        PROPERTY: 'color: #00ffff; font-weight: bold;',
        CSS_KEYWORD: 'color: #cd00ff;',
        URL: 'color: #cd00ff;',
        LENGTH: 'color: #cd00ff;',
        COLOR: 'color: #cd00ff;',
        'COLOR:hover': 'color: orange;',
        IMPORTANT: 'color: #cd00ff;'
    },

    'vim': {
        DEFAULT: 'background: white; color: black;',
        ERROR: 'background: red; color: white;',
        COMMENT: 'color: #3465A4',
        KEYWORD: 'color: #C4A000',
        STRING: 'color: #c00;',
        REGEX: 'color: #c00;',
        KEYWORDCONST: 'color: #c00;',
        BUILTIN: 'color: #4E9A06;',
        ATRULE: 'color: #75507B;',
        TAGNAME: 'color: #C4A000;',
        ID: 'color: #06989A;',
        CLASSNAME: 'color: #06989A;',
        PSEUDOCLASS: 'color: #75507b;',
        PROPERTY: 'color: #4E9A06;',
        CSS_KEYWORD: 'color: #4E9A06;',
        URL: 'color: #c00;',
        'URL:hover': 'text-decoration: underline;',
        LENGTH: 'color: #c00;',
        COLOR: 'color: #c00;',
        'COLOR:hover': 'text-decoration: underline;',
        IMPORTANT: 'color: #75507B;'
    },

    'puristic': {
        DEFAULT: 'background-color: white; color: black;',
        LINENUMBERS: 'color: #aaa; padding: 0;',
        KEYWORD: 'font-weight: bold;',
        COMMENT: 'color: #0c0',
        STRING: 'color: blue',
        REGEX: 'color: red',
        NUMBER: 'color: red',
        COLOR:  'font-weight: bold;',
        LENGTH:  'color: red',
        ATRULE: 'font-weight: bold;'
    }

};




////// do not edit below this line //////


var RUNNINGINGM = (typeof GM_setValue == 'function');

if (!RUNNINGINGM) {
    GM_setValue = GM_getValue = function(a, b) { return b; };
}

var CURRENTVERSION = 8;
var SCRIPTNUMBER = 37029;
var TESTURLJS = 'http://wiki.greasespot.net/skins/common/wikibits.js'; // performance test
var TESTURLCSS = 'http://wiki.greasespot.net/skins/monobook/main.css'; // performance test
var THUMBNAILER = 'http://thomas-rosenau.de/scripts/thumbnailer/thumbnailer.2.js';

var CONST = {
    DAY_IN_MS: 1000*60*60*24,

    A: document.createElement('a'),
    SPAN: document.createElement('span'),
    GRADIENT: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAPoCAYAAAAftpReAAAAAXNSR0IArs4c6QAAAKdJREFUWMPlWEEOgDAIa/X/b8abN41AYXPzsJgoXUuREYHvFw8A8Cw87ztXmPi9xzCLUbPY5hm69hFlVErQlQ0XQNqtXqd7Y9W+URzLrIR3B13fEbvKMfjA3JyFpcIKe9Q6WAHv6hEsy7P65NQ0PI2/xex7qQWLxhra4YCDpXhwmH2IYcPsg+VkqQvE5uCshirBK26Mq0j9475cTtG+nJH9z7CR6FmWCz1DGRx3M6XxAAAAAElFTkSuQmCC)'
};

///////////////////////////////////////////////////////
/*                Helper Functions                   */
///////////////////////////////////////////////////////

function byId(inp) { return document.getElementById(inp); }

function toArray(obj) {
    if (obj.constructor == XPathResult) {
        var arr = new Array;
        var n;
        while (n = res.iterateNext())
            arr.push(n);
        return arr;
    } else
        return Array.prototype.slice.call(obj);
}

var GM_addStyle = (typeof GM_addStyle == 'function') ? GM_addStyle : function(contents) {
    var s = document.createElement('style');
    s.type = 'text/css';
    s.appendChild(document.createTextNode(contents));
    document.getElementsByTagName('head')[0].appendChild(s);
};

function keyCodeOf(str) {
    switch (str.toLowerCase()) {
        case 'tab':
        case 'tabulator':
            return 9;
            break;
        case 'enter':
        case 'return':
            return 13;
            break;
        case 'shift':
            return 16;
            break;
        case 'ctrl':
        case 'control':
            return 17;
            break;
        case 'alt':
            return 18;
            break;
        case 'esc':
        case 'escape':
            return 27;
            break;
        default:
            break;
    }
    if (/^[a-z]$/i.test(str))
        return (str.toLowerCase().charCodeAt(0) - 32);
    else
        return undefined;
}

var setInnerHTML = function(el, string) {
    // element.innerHTML does not work on plain text files in FF; this restriction is similar to
    // http://groups.google.com/group/mozilla.dev.extensions/t/55662db3ea44a198
    var self = arguments.callee;
    if (typeof self.supportsInnerHTML == 'undefined') {
        var testParent = document.createElement('div');
        testParent.innerHTML = '<p/>';
        // self.supportsInnerHTML = (testParent.firstChild.nodeType == Node.ELEMENT_NODE);
        self.supportsInnerHTML = (testParent.firstChild.nodeType == document.ELEMENT_NODE); // HACK for http://greasemonkey.devjavu.com/ticket/260
    }
    if (self.supportsInnerHTML) {
        el.innerHTML = string;
        return el;
    } else {
        if (typeof self.cleanDocument == 'undefined')
            self.cleanDocument = createHTMLDocument();
        if (el.parentNode) {
            var cleanEl = self.cleanDocument.importNode(el, false);
            cleanEl.innerHTML = string;
            el.parentNode.replaceChild(document.adoptNode(cleanEl), el);
        } else {
            var cleanEl = self.cleanDocument.adoptNode(el);
            cleanEl.innerHTML = string;
            el = document.adoptNode(cleanEl);
        }

        return el;
    }

    function createHTMLDocument() {
        if (typeof document.implementation.createHTMLDocument == 'function') {
            return document.implementation.createHTMLDocument();
        }
        // Firefox does not support document.implementation.createHTMLDocument()
        // cf. http://www.quirksmode.org/dom/w3c_html.html#t12
        // The following is taken from http://gist.github.com/49453
        if (typeof XSLTProcessor != 'undefined') {
            var templ = '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">'
                    + '<xsl:output method="html"/><xsl:template match="/">'
                    + '<html><head><title/></head><body/></html>'
                    + '</xsl:template></xsl:stylesheet>';
            var proc = new XSLTProcessor();
            proc.importStylesheet(new DOMParser().parseFromString(templ, 'text/xml'));
            return proc.transformToDocument(document.implementation.createDocument('', 'fooblar', null));
        } else {
            var f = document.createElement('iframe');
            f.style.setProperty('display', 'none', 'important');
            f.src = 'data:text/html,<!DOCTYPE html><html><title></title></html>';
            document.body.appendChild(f);
            document.body.removeChild(f);
            return f.contentDocument;
        }
    }
};

function makeLinksAndThumbnails(highlightedCode, overridePreload) {
    var scr = document.createElement('script');
    scr.setAttribute('type', 'text/javascript');
    scr.setAttribute('src', THUMBNAILER);
    scr.addEventListener('load', function() {
        var w = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
        var tn = w.TomsThumbnailer(!overridePreload && PRELOADTHUMBNAILS);
        var urlElements = toArray(highlightedCode.getElementsByTagName('a'));
        for (var i = 0; i < urlElements.length; i++) {
            if (/\.css(["']?$|\?)/.test(urlElements[i].href)) {
                if (urlElements[i].href != document.location.href)
                    tn.addThumbnail(urlElements[i], null, true, '<div style="border: 2px outset gray; background-color: #f8ffff; background-image:' + CONST.GRADIENT + '; -moz-border-radius: 7px; padding: 0 8px 8px 0;"><iframe SRC="' + urlElements[i].href + '" scrolling="no" style="width: 400px; height: 250px; border: none;"></iframe></div>');
                continue;
            }
            if (!/htc["']?$/.test(urlElements[i].href))
                tn.addThumbnail(urlElements[i], null, IMAGEDIMENSIONTOOLTIPS, THUMBNAILTEMPLATE);
        }
        var colorElements = toArray(highlightedCode.getElementsByClassName('COLOR'));
        for (var i = 0; i < colorElements.length; i++) {
            tn.addThumbnail(colorElements[i], false, false, '<div style="width: 30px; height: 30px; border: 2px solid gray; -moz-border-radius: 17px; background-color: ' + colorElements[i].firstChild.nodeValue + '"></div>');
        }
    }, false);
    document.body.appendChild(scr);
    var urlElements = toArray(highlightedCode.getElementsByClassName('URL'));
    for (var i in urlElements) {
        var urlElement = urlElements[i];
        var linkText = urlElement.firstChild.nodeValue.replace(/^["']|["']$/g, '');
        var a = CONST.A.cloneNode(false);
        a.appendChild(urlElement.cloneNode(true));
        a.href = linkText;
        urlElement.parentNode.replaceChild(a, urlElement);
    }
}

function resetStyle(el) { /* cf. http://www.w3.org/TR/CSS21/propidx.html */
    var defaults = [
        ['auto',   'bottom', 'clip', 'height', 'left', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside', 'playDuring', 'tableLayout', 'top', 'width', 'zIndex'],
        ['medium', 'borderWidth', 'fontSize', 'outlineWidth', 'pitch', 'volume'],
        ['none',   'backgroundImage', 'borderStyle', 'clear', 'counterIncrement', 'counterReset', 'cue', 'float', 'listStyleImage', 'maxHeight', 'maxWidth', 'outlineStyle', 'textDecoration', 'textTransform'],
        ['normal', 'content', 'fontStyle', 'fontVariant', 'fontWeight', 'letterSpacing', 'lineHeight', 'unicodeBidi', 'whiteSpace', 'wordSpacing'],
        ['0',      'borderSpacing', 'margin', 'minHeight', 'minWidth', 'padding', 'pause', 'textIndent']
    ];
    var userAgentDependend = ['borderColor', 'color', 'cursor', 'fontFamily', 'textAlign', 'quotes', 'voiceFamily']; /* cursor should actually be 'auto', but results are a little strange in FF */
    for (var i in defaults) {
        for (var j = 1; j < defaults[i].length; j++)
            el.style[defaults[i][j]] = defaults[i][0];
    }
    for (var i in userAgentDependend) {
        el.removeAttribute(userAgentDependend[i], false);
    }
    with (el.style) {
        azimuth = 'center';
        backgroundAttachment = 'scroll';
        backgroundColor = 'transparent';
        backgroundPosition = '0% 0%';
        backgroundRepeat = 'repeat';
        borderCollapse = 'separate';
        captionSide = 'top';
        direction = 'ltr';
        display = 'inline';
        elevation = 'level';
        emptyCells = 'show';
        listStylePosition = 'outside';
        listStyleType = 'disc';
        orphans = '2';
        outlineColor = 'black';
        /* outlineColor = 'invert'; */ /* Firefox doesn't like this*/
        overflow = 'visible';
        pitchRange = '50';
        position = 'static';
        richness = '50';
        textAlign = 'start';
        verticalAlign = 'baseline';
        visibility = 'visible';
        widows = '2';
        if (el.tagName) {
            switch (el.tagName.toLowerCase()) {
                case 'area': case 'base': case 'basefont': case 'head': case 'meta': case 'script': case 'style': case 'title': case 'noembed': case 'param':
                    display = 'none';
                    break;
                case 'html': case 'address': case 'blockquote': case 'body': case 'dd': case 'div': case 'dl': case 'dt': case 'fieldset': case 'form': case 'frame': case 'frameset': case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': case 'noframes': case 'ol': case 'p': case 'ul': case 'center': case 'dir': case 'hr': case 'menu': case 'pre':
                    display = 'block';
                    break;
                case 'li':
                    display = 'list-item';
                    break;
                case 'table':
                    display = 'table';
                    break;
                case 'tr':
                    display = 'table-row';
                    break;
                case 'td': case 'th':
                    display = 'table-cell';
                    break;
                case 'thead':
                    display = 'table-header-group';
                    break;
                case 'tbody':
                    display = 'table-row-group';
                    break;
                case 'tfoot':
                    display = 'table-footer-group';
                    break;
                case 'col':
                    display = 'table-column';
                    break;
                case 'colgroup':
                    display = 'table-column-group';
                    break;
                case 'caption':
                    display = 'table-caption';
                    break;
                default:
                    display = 'inline';
                    break;
            }
        }
    }
}
///////////////////////////////////////////////////////
/*                    Messenger                      */
///////////////////////////////////////////////////////

function message(inputString, duration, fontColor, backgroundColor, borderColor) {
    var MARGIN = 2;
    duration = duration ? duration : 3000;
    fontColor = fontColor ? fontColor : 'black';
    bgColor = backgroundColor ? backgroundColor : 'lightyellow';
    frameColor = borderColor ? borderColor : 'black';
    var container = document.createElement('p');
    resetStyle(container);
    with(container.style) {
        backgroundColor = bgColor;
        border = '1px solid ' + frameColor;
        color = fontColor;
        cursor = 'pointer';
        maxWidth = '40%';
        padding = '.3em';
        position = 'fixed';
        visibility = 'hidden';
        whiteSpace = 'pre-wrap';
    }
    container.appendChild(document.createTextNode(inputString));
    document.body.appendChild(container);
    var quirksMode = document.compatMode == 'BackCompat';
    var scrollbarTest = quirksMode ? document.body : document.documentElement;
    var bodyHasVerticalScrollbar = (scrollbarTest.scrollHeight != scrollbarTest.clientHeight);
    var bodyHasHorizontalScrollbar = (scrollbarTest.scrollWidth != scrollbarTest.clientWidth);
    var windowInnerWidth = window.innerWidth || document.documentElement.offsetWidth;
    var windowInnerHeight = window.innerHeight || document.documentElement.offsetHeight;
    if (bodyHasHorizontalScrollbar) windowInnerHeight -= 20;
    if (bodyHasVerticalScrollbar) windowInnerWidth -= 20;
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;
    container.style.top = windowInnerHeight + 'px';
    container.style.left = (windowInnerWidth - containerWidth - MARGIN) + 'px';
    container.style.visibility = 'visible';
    function pushUp(el) {
        var minTop = windowInnerHeight - containerHeight - MARGIN;
        var elTop = parseFloat(el.style.top);
        if (elTop > minTop) {
            el.style.top = (elTop - 1) + 'px';
        }
        else {
            window.clearInterval(interval);
            var to = window.setTimeout(function() { el.parentNode.removeChild(el); }, duration);
            el.addEventListener('click', function() {
                window.clearTimeout(to);
                el.parentNode.removeChild(el);
            }, false);
        }

    }
    var interval = window.setInterval(pushUp, 10, container);
    return container;
}

var init = function() {
    UPDATECHECKINTERVAL = GM_getValue('updateCheckInterval', UPDATECHECKINTERVAL);
    THEME = GM_getValue('theme', THEME);
    MAXLENGTH = GM_getValue('maxlength', MAXLENGTH);
    PRELOADTHUMBNAILS = GM_getValue('preloadthumbnails', PRELOADTHUMBNAILS);
    SHOWLINENUMBERS = GM_getValue('showlinenumbers', SHOWLINENUMBERS);
    INDENTJAVASCRIPT = GM_getValue('indentjavascript', INDENTJAVASCRIPT);
    STYLE = THEMES[THEME];
    var ff = /Firefox\/([0-9]+)/.exec(navigator.userAgent);
    if ((!ff && !window.opera)
            || (ff && ff[1] < 3) // ff[1] contains Firefox Version
            || (window.opera && parseFloat(navigator.appVersion) < 9.5)) {
        throw new Error('GreaseMandrill requires Firefox >= 3 or Opera >= 9.5');
    }
    try { checkForUpdates(false); } catch (e) { // ... we all like the opera
        if (OPERA_SHOWUPDATENOTICE && window.opera && window.opera.postError)
            window.opera.postError('GreaseMandrill sez: "Sorry, automatic update checking does not work in Opera.\nPlease visit http://userscripts.org/scripts/review/' + SCRIPTNUMBER + '/ to see if a new version is available.\nYou are now using version: ' + CURRENTVERSION + '\nYou can turn this message off by editing the script."');
    }
    makeStylesheet();
};

///////////////////////////////////////////////////////
/*                   Stylesheets                     */
///////////////////////////////////////////////////////

window.setGreaseMandrillStyle = function(style) {
    if (typeof style['DEFAULT'] == 'undefined')
        style['DEFAULT'] = '';
    var styleText = (shouldHighlightFile() ? 'html,body,' : '' ) + 'apre.GreaseMandrill { ' + style['DEFAULT'] + ' }\n';
    styleText += 'pre.GreaseMandrill * { color: inherit; font-size: inherit; font-family: inherit; font-variant: inherit; font-weight: normal; font-style: inherit; font-size: inherit; text-decoration: none; text-transform: inherit; }\n';
    for (var i in style) {
        if (i == 'DEFAULT') continue;
        if (/^LANG:/.test(i))
            styleText += 'pre.GreaseMandrill.' + i.replace(/^LANG:/g, '') + ' { ' + style[i] + ' }\n';
        else
            styleText += 'pre.GreaseMandrill span.' + i + ' { ' + style[i] + ' }\n';
    }
    var newStyleEl = document.createElement('style');
    newStyleEl.type = 'text/css';
    newStyleEl.id = 'GreaseMandrill-stylesheet';
    newStyleEl.appendChild(document.createTextNode(styleText));
    var oldStyleEl = byId('GreaseMandrill-stylesheet');
    if (oldStyleEl && oldStyleEl.parentNode) {
       oldStyleEl.parentNode.replaceChild(newStyleEl, oldStyleEl);
    } else {
        document.getElementsByTagName('head')[0].appendChild(newStyleEl);
    }
};

function makeStylesheet() {
    GM_addStyle(
          '#GreaseMandrill-menutab, #GreaseMandrill-menu { background: #F4F4F4; border-width: 2px; border-color: #CCC #666 #666 #CCC; border-style: solid; font-family: sans-serif; position: fixed; }'
        + '#GreaseMandrill-menutab { cursor: pointer; font-size: 15px; font-weight: bold; height: 20px; line-height: 20px;' + (window.opera ? '' : '-moz-border-radius-bottomleft: 15px;') + ' padding: 10px 2ex; z-index: 5; text-align: center; top: -30px; right: -15ex; border-top-width: 0px; border-right-width: 0px; -moz-user-select: none; }'
        + '#GreaseMandrill-menutab:hover { top:0px; right:0px; } '
        + '#GreaseMandrill-menu { color: black; margin: auto; padding: 1em; top: 0px; bottom: 0px; z-index: 32020; left: 0px; right: 0px; max-width: 45em; max-height: 30em;' + (window.opera ? '' : '-moz-border-radius: 15px;') + 'overflow: auto; font-size: 14px; }'
        + '#GreaseMandrill-menu { background-image: ' + CONST.GRADIENT + '; background-position: left top; background-repeat: repeat-x; }'
        + '#GreaseMandrill-menu h1 { margin: .3em 0 .7em; text-align: center; font-size: 140%;}'
        + '#GreaseMandrill-menu h1 span { position: absolute; top: -2px; left: -1px; color: gray; }'
        + '#GreaseMandrill-menu h1 span.shadow { color: white; position: relative; }'
        + '#GreaseMandrill-menu input[type="text"] { text-align: center; }'
        + '#GreaseMandrill-menu input[type="checkbox"], #GreaseMandrill-menu label { cursor: pointer; }'
        + '#GreaseMandrill-closebutton { font-size: 1.3em; cursor: pointer; position: absolute; right: .2em; top: 0; padding: .2em; }'
        + '#GreaseMandrill-closebutton:hover { color: red; }'
        + '.GreaseMandrill-Link { cursor: pointer; text-decoration: underline; color: blue; }'
        + '#GreaseMandrill-HomeLink { position: absolute; bottom: 0px; right: 0px; margin-right: 1em;}'
        + 'pre.GreaseMandrill { font-family: monospace;' + (window.opera ? ' display: table; }' : ' }')
        + 'pre.GreaseMandrill > div { display: table-row; font-family: inherit; }'
        + 'pre a, pre a:hover { text-decoration: none; color: inherit; }'
        + 'pre.GreaseMandrill a { outline: none; text-decoration: none; cursor: pointer; } pre.GreaseMandrill a:hover { text-decoration: underline; }'
        + 'pre .mainContents {display: table-cell; padding: 0 0 0 8px; white-space: inherit; vertical-align: top; margin: 0; }'
        + 'pre span.LINENUMBERS { visibility: hidden; display: table-cell; padding: 0 .7em; -moz-border-radius: 0; text-align: right; -moz-user-select: none; vertical-align: top;}'
        + 'pre.GreaseMandrill span.LINENUMBERS { visibility: visible; }'
        + (shouldHighlightFile() ? ' body {margin: 0; height: 100%;} pre {margin: 0; padding: 8px; }' : '')
    );
    setGreaseMandrillStyle((typeof STYLE != 'undefined') ? STYLE : THEMES['default']);
}

///////////////////////////////////////////////////////
/*                 Update Checker                    */
///////////////////////////////////////////////////////

var checkForUpdates = function(forced) {
    if (typeof GM_xmlhttpRequest == 'undefined') throw new Error('Need GM_xmlhttpRequest to search for updates');
    if (UPDATECHECKINTERVAL <= 0 && !forced) return;
    var lastUpdateCheck = GM_getValue('lastUpdateCheck', 0);
    var now = parseInt((new Date()).getTime() / CONST.DAY_IN_MS);
    if (lastUpdateCheck == 0 && !forced) { // first run
        GM_setValue('lastUpdateCheck', now);
        return;
    }
    if ((now - lastUpdateCheck < UPDATECHECKINTERVAL) && !forced) {
        return;
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/review/' + SCRIPTNUMBER + '?format=txt',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/xml,text/html'
        },
        onload: function(re) {
            if (re.status != 200) return;
            GM_setValue('lastUpdateCheck', now);
            var text = re.responseText.replace(/&#x000A;/g, '\n');
            var scriptname = /\/\/\s*@name\s+(.+)/.exec(text)[1];
            var latestVersion = parseFloat(/var\s+CURRENTVERSION\s*=\s*([0-9]+(\.[0-9]+)?)/.exec(text)[1]);
            var lastCheckedVersion = parseFloat(GM_getValue('latestVersion', 0));
            if (latestVersion == lastCheckedVersion && !forced)
                return; // don't notify more than once
            if (latestVersion > CURRENTVERSION) {
                if (confirm('A new version of "' + scriptname + '" is available.\n'
                            + '\nInstalled version: ' + CURRENTVERSION
                            + '\nNew version: ' + latestVersion
                            + '\n\nDo you want to install it?')) {
                    window.location.href = 'http://userscripts.org/scripts/source/' + SCRIPTNUMBER + '.user.js';
                }
            } else if (forced)
                message('You have the latest version of \"' + scriptname + '\".');
            GM_setValue('latestVersion', latestVersion.toString());
        }
    });
};

///////////////////////////////////////////////////////
/*                     Menu                          */
///////////////////////////////////////////////////////

function Menu() {
    var menu;
    var _performanceTest = performanceTest;
    this.createMenu = function() {
        menu = document.createElement('div');
        menu.id = 'GreaseMandrill-menu';
        var options = '';
        for (var i in THEMES) {
            options += '<option' + (i == THEME ? ' selected="selected">' : '>') + i + '</opttion>';
        }

        setInnerHTML(menu,
                     '<span id="GreaseMandrill-closebutton">&#x00D7;</span>'
                   + '<h1><span class="shadow">GreaseMandrill Configuration'
                   + '<span>GreaseMandrill Configuration</span></span></h1>'
                   + '<hr/>'
                   + '<p>Do not highlight files larger than <input id="GreaseMandrill-maxlength" type="text" size="3" maxlength="3" value="' + MAXLENGTH + '"></input> kilobytes. (0 = always highlight)</p>'
                   + '<p><span class="GreaseMandrill-Link" id="GreaseMandrill-performanceTestLink">Run performance test</span> (This will freeze your browser for a few seconds)</p>'
                   + '<hr/>'
                   + '<p>Check for updates every <input id="GreaseMandrill-updateInterval" type="text" size="2" maxlength="2" value="' + UPDATECHECKINTERVAL + '"/> days. (0 = never)</p>'
                   + '<p><span class="GreaseMandrill-Link" id="GreaseMandrill-updatecheckLink" >...now</span></p>'
                   + '<hr/>'
                   + '<p><input type="checkbox" id="GreaseMandrill-linenumberSelector" name="GreaseMandrill-linenumberSelector"' + (SHOWLINENUMBERS ? ' checked="checked" ' : '') + '> <label for="GreaseMandrill-linenumberSelector">Show line numbering (requires refresh)</label></p>'
                   + '<p><input type="checkbox" id="GreaseMandrill-jsIndentSelector" name="GreaseMandrill-jsIndentSelector"' + (INDENTJAVASCRIPT ? ' checked="checked" ' : '') + '> <label for="GreaseMandrill-jsIndentSelector">Indent JavaScript using JSBeautifier (requires refresh)</label></p>'
                   + '<p><input type="checkbox" id="GreaseMandrill-preloadSelector" name="GreaseMandrill-preloadSelector"' + (PRELOADTHUMBNAILS ? ' checked="checked" ' : '') + '> <label for="GreaseMandrill-preloadSelector">Preload images for thumbnails in CSS files</label></p>'
                   + '<p>Use this color scheme: <select id="GreaseMandrill-styleSelector">' + options + '</select> </p>'
                   + '<p>(Edit the script to add your own scheme)</p>'
                   + '<hr/>'
                   + '<p id="GreaseMandrill-HomeLink"><a href="http://userscripts.org/scripts/show/' + SCRIPTNUMBER + '">Visit GreaseMandrill Homepage</a></p>'
        );
        // TODO: add more options
        document.body.appendChild(menu);
        var closeMenu = this.closeMenu;
        byId('GreaseMandrill-closebutton').addEventListener('click', closeMenu, false);
        byId('GreaseMandrill-performanceTestLink').addEventListener('click', _performanceTest, false);
        byId('GreaseMandrill-updatecheckLink').addEventListener('click', function() { checkForUpdates(true) }, false);
        byId('GreaseMandrill-updateInterval').addEventListener('change', function(){
            UPDATECHECKINTERVAL = parseInt(this.value) || 0;
            GM_setValue('updateCheckInterval', UPDATECHECKINTERVAL);
        }, false);
        byId('GreaseMandrill-styleSelector').addEventListener('change', function() {
            THEME = this[this.selectedIndex].value;
            GM_setValue('theme', THEME);
            window.setGreaseMandrillStyle(THEMES[THEME]);
        }, false);
        byId('GreaseMandrill-maxlength').addEventListener('change', function() {
            MAXLENGTH = parseInt(this.value) || 0;
            GM_setValue('maxlength', MAXLENGTH);
        }, false);
        byId('GreaseMandrill-linenumberSelector').addEventListener('change', function() {
            SHOWLINENUMBERS = this.checked;
            GM_setValue('showlinenumbers', SHOWLINENUMBERS);
        }, false);
        byId('GreaseMandrill-jsIndentSelector').addEventListener('change', function() {
            INDENTJAVASCRIPT = this.checked;
            GM_setValue('indentjavascript', INDENTJAVASCRIPT);
        }, false);
        byId('GreaseMandrill-preloadSelector').addEventListener('change', function() {
            PRELOADTHUMBNAILS = this.checked;
            GM_setValue('preloadthumbnails', PRELOADTHUMBNAILS);
        }, false);
    };
    this.closeMenu = function(){
        if (menu && menu.parentNode) {
            menu.parentNode.removeChild(menu);
        }
    };
    this.toggleMenu = function() {
        if (!menu) {
            this.createMenu();
            this.showMenu();
        } else
            if (menu.parentNode)
                this.closeMenu();
            else
                document.body.appendChild(menu);
    };
    this.showMenu = function() {
        if (menu) {
            var closeMenu = this.closeMenu;
            window.addEventListener('keydown', function(e) {
                if(e.keyCode == keyCodeOf('Esc'))
                    closeMenu();
            }, false);
            document.body.appendChild(menu);
        } else {
            this.createMenu();
        }
    };
    this.createTab = function() {
        var menuTab = document.createElement('div');
        with (menuTab) {
            id = 'GreaseMandrill-menutab';
            var self = this;
            addEventListener('click', function() {
                if (!RUNNINGINGM) { window.open('http://userscripts.org/scripts/show/' + SCRIPTNUMBER); }
                else {
                    self.toggleMenu.apply(self);
                }
            }, false);
            style.right = '0px';
            style.left = 'auto';
            style.top = '0px';
            title = 'GreaseMandrill - \u00A9 Thomas Rosenau 2008-2009';
        }
        var s = CONST.SPAN.cloneNode(false);
        s.style.display = 'none';
        s.appendChild(document.createTextNode('/* Highlighted by '));
        menuTab.appendChild(s);
        var MyString = 'GreaseMandrill';
        for(var i = 0; i < MyString.length; i++) {
            var s = CONST.SPAN.cloneNode(false);
            s.appendChild(document.createTextNode(MyString[i]));
            s.style.color = 'hsl(' + (180 - 360 * i / MyString.length) + ', 100%, 42%)';
           menuTab.appendChild(s);
        }
        s = CONST.SPAN.cloneNode(false);
        s.style.display = 'none';
        s.appendChild(document.createTextNode(' */'));
        s.appendChild(document.createElement('br'));
        menuTab.appendChild(s);
        document.body.appendChild(menuTab);
        window.setTimeout(function() { menuTab.style.right = ''; menuTab.style.top = ''; }, 3000);
    };

    this.createTab();
}

///////////////////////////////////////////////////////
/*               Performance Test                    */
///////////////////////////////////////////////////////

var performanceTest = function() {
    var timeTotal = 0;
    var sizeTotal = 0;
    var hl = new GreaseMandrillHighlighter(greaseMandrillSyntax);
    function showResults(time, size) {
            if (timeTotal) {
                timeTotal += time;
                sizeTotal += size;
                message('Performance test results: ' + timeTotal + ' ms for ' + sizeTotal + ' bytes\n(' + parseInt(10*(1000*sizeTotal/timeTotal)/1024)/10 + ' kbytes per second)', 10000);
            } else {
                timeTotal += time;
                sizeTotal += size;
            }
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: TESTURLJS,
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': '*/*'
        },
        onload: function(re) {
            if (re.status != 200) return;
            var code = re.responseText;
            var start = new Date();
            hl.highlight(code, 'JS', false);
            var dur = new Date() - start;
            showResults(dur, code.length);
            GM_xmlhttpRequest({
                method: 'GET',
                url: TESTURLCSS,
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': '*/*'
                },
                onload: function(re) {
                    if (re.status != 200) return;
                    var code = re.responseText;
                    var start = new Date();
                    var highlightedCode = hl.highlight(code, 'CSS', false);
                    makeLinksAndThumbnails(highlightedCode, true);
                    var dur = new Date() - start;
                    showResults(dur, code.length);
                }
            });
        }
    });
};

///////////////////////////////////////////////////////
/*              Highlighter Engine                   */
///////////////////////////////////////////////////////

function GreaseMandrillHighlighter(syntax) {
    var compiledSyntax = {};

    var compileState = function(state) {
        for (var i = 0; i < state.length; i++) {
            if (state[i] instanceof Array) {
                var re = state[i][0];
                if (re instanceof RegExp) {
                    state[i][0] = re.compile(re.source, (re.ignoreCase ? 'i' : '') + 'y');
                }
                if (typeof state[i][2] == 'string') {
                    state[i][2] = new Array(state[i][2]);
                }
                if (/^\^/.test(re.source)) {
                    state[i].onlyAtStart = true;
                }
            }
        }
        return state;
    };

    var normalize = function(lang) {
        var result = {};
        for (var state in lang) {
            var combinedState = new Array();
            for (var i = 0; i < lang[state].length; i++) {
                currentRule = lang[state][i];
                if (typeof currentRule == 'string' && currentRule[0] != '-') {
                    combinedState = combinedState.concat(lang[currentRule]);
                } else {
                    combinedState.push(currentRule);
                }
            }
            result[state] = compileState(combinedState);
        }
        return result;
    };

    this.highlight = function(input, language, replaceInput) {

        var addStates = function(nextStates) {
            if (typeof nextStates == 'string')
                nextStates = new Array(nextStates);
            if (nextStates) {
                for (var i = 0; i < nextStates.length; i++) {
                    var nextState = nextStates[i];
                    if (/^-/.test(nextState)){
                        stateStack.length += parseInt(nextState);
                    } else {
                        stateStack.push(nextState);
                    }
                }
            }
        };

        var output = function(string, cssClass, language, forced) {
            if (!string.length && !forced) return;
            string = string.replace(/[&<]/g, function(inp) {
                switch(inp) {
                    case '&':
                        return '&amp;';
                        break;
                    case '<':
                        return '&lt;';
                        break;
                    default:
                        return inp;
                        break
                }
            });
            if (cssClass == prevClass && !forced) {
                outString += string;
            } else {
                if (prevClass) {
                    outString += '</span>';
                }
                if (cssClass)
                    outString += '<span class="' + cssClass + cssClass.replace(/^|\s+/g, ' ' + language + '_') + '">' + string;
                else
                    outString += string;
                prevClass = cssClass;
            }
        };

        var outString = '<div>';
        var stateStack = ['root'];
        var prevClass = null;
        var currentPos = 0;
        var text = (typeof input == 'string') ? input : input.textContent;
        if (language == 'JS' && INDENTJAVASCRIPT) {
            text = js_beautify(text);
        }
        if (SHOWLINENUMBERS) {
            outString += '<span class="LINENUMBERS"><span style="display:none;">/* Line numbers by GreaseMandrill </span>';
            var lineBreaks = text.match(/\n/g);
            var numberOfLineBreaks = lineBreaks ? lineBreaks.length : 0;
            if (/[^\n]$/.test(text)) numberOfLineBreaks++;
            for (var i = 1; i <= numberOfLineBreaks; i++) {
                outString += i + '\n';
            }
            outString += '<span style="display:none;">*/</span></span>'
        }
        outString += '<pre class="mainContents">'
        if (!compiledSyntax[language])
            compiledSyntax[language] = normalize(syntax[language]);
        if (!compiledSyntax[language].root) {
            message('GreaseMandrill: Bogus syntax definition "' + language + '"');
            return null;
        }
        var lexer = compiledSyntax[language];
        var l = text.length;
        if (!/\n/.test(text)) text = text + '\n';
        outerLoop: while (currentPos < l) {
            var currentState = lexer[stateStack[stateStack.length -1]];
            for (var i = 0; i < currentState.length; i++) {
                currentRule = currentState[i];
                if (currentRule instanceof Array && currentRule[0] instanceof RegExp) {
                    currentRE = currentRule[0];
                    currentRE.lastIndex = currentPos;
                    var result = currentRE.exec(text);
                    if (result && (!currentRule.onlyAtStart || currentPos == 0)) {
                        result = result[0];
                        addStates(currentRule[2]);
                        output(result, currentRule[1], language);
                        currentPos += result.length;
                        continue outerLoop;
                    }
                } else {
                    addStates(currentRule);
                    continue outerLoop;
                }
            }
            output(text[currentPos], 'ERROR', language);
            currentPos++;
        }
        output('', null, language, true);
        var preElement = document.createElement('pre');
        preElement.className = 'GreaseMandrill';
        preElement.className += ' ' + language;
        outString += '</pre></div>';
        setInnerHTML(preElement, outString);
        if (language == 'CSS') {
            // special treatment for '\' in CSS attributes
            var escapedProps = toArray(preElement.getElementsByClassName('ESCAPEDPROPERTY'));
            for (var i = 0; i < escapedProps.length; i++) {
                var escapedProp = escapedProps[i].textContent;
                var originalClassName = escapedProps[i].className;
                escapedProps[i].className = originalClassName.replace(/ESCAPEDPROPERTY/g, 'ERROR');
                if (/\\[\\0-9a-f]/i.test(escapedProp)) continue;
                var unescapedProp = escapedProp.replace(/\\/g, '');
                for (var j = 0; j < lexer['rules'].length; j++) {
                    var currentRule = lexer['rules'][j];
                    if (currentRule[1] != 'PROPERTY') continue;
                    currentRule[0].lastIndex = 0;
                    if (currentRule[0].test(unescapedProp)) {
                        escapedProps[i].className = originalClassName.replace(/ESCAPEDPROPERTY/g, 'PROPERTY');
                        break;
                    }
                }
            }
        }
        if (replaceInput && input.parentNode) {
            input.parentNode.replaceChild(preElement, input);
            var ln = SHOWLINENUMBERS ? preElement.getElementsByClassName('LINENUMBERS')[0] : null;
            window.addEventListener('keydown', function(e) {
                if (e.keyCode == keyCodeOf(GREASEMANDRILLTOGGLE)) {
                    if (/\bGreaseMandrill\b/.test(preElement.className)) {
                        preElement.className = preElement.className.replace(/\bGreaseMandrill\b/, '');
                    } else {
                        preElement.className += ' GreaseMandrill';
                    }
                }
            }, false);
            window.addEventListener('keydown', function(e) {
                if (e.keyCode == keyCodeOf(LINEBREAKTOGGLE)) {
                    s = preElement.style;
                    s.whiteSpace = (s.whiteSpace != 'pre-wrap') ? 'pre-wrap' : 'pre';
                    if (ln) {
                        ln.style.display = (ln.style.display == 'none') ? '' : 'none';
                    }
                }
            }, false);
            // DEBUG
            window.addEventListener('keydown', function(e) {
                if (e.keyCode == 112) {
                    e.preventDefault();
                    var ops = toArray(document.getElementsByClassName('OPERATOR'));
                    for (var i in ops) {
                        setInnerHTML(ops[i], ops[i].innerHTML.replace(/(\}.*)/g, '$1\n'));
                    }
                }
            }, false);
            // GUBED
        }
        return preElement;
    };
}

///////////////////////////////////////////////////////
/*             syntax definitions                    */
///////////////////////////////////////////////////////

// these are just for better human readability:
function IMPORT(x) { return x; }
function POP(x) { return '-' + (x ? x.toString() : '1'); }
function FALLTHROUGH(x) { return new Array(x); }

var greaseMandrillSyntax = {
    'JS': {
        'whitespaceandcomments': [
            [/\n\s*-->.*/, 'COMMENT LINECOMMENT'],
            [/\s+/, 'WHITESPACE'],
            [/<!--.*/, 'COMMENT LINECOMMENT'],
            [/\/\*@[\s\S]*?@\*\//, 'COMMENT CONDITIONALCOMPILATION'],
            [/\/\*[\s\S]*?\*\//, 'COMMENT'],
            [/\/\/.*/, 'COMMENT LINECOMMENT']
        ],
        'slashstartsregex': [
            IMPORT('whitespaceandcomments'),
            [/\/(\\[\s\S]|[^[/\\\n]|\[(\\.|[^\]\\\n])*])+\/([gim]+\b|\B)/, 'REGEX', POP()],
            [/\/.*/, 'ERROR'],
            POP()
        ],
        'root': [
            [/^(?=\s|\/|<!--)/, null, 'slashstartsregex'],
            IMPORT('whitespaceandcomments'),
            [/\+\+|--|~|&&|\?|:|\|\||\\$|(<<|>>>?|==?|!=?|[-<>+*%&\|\^/])=?/, 'OPERATOR', 'slashstartsregex'],
            [/[{(\[;,]/, 'OPERATOR', 'slashstartsregex'],
            [/[})\]]|\.(?=[^0-9])/, 'OPERATOR'],
            [/jQuery\b|\$(?=[.(;\s])|(ajax|ajaxSetup|attr|clean|css|curCSS|data|dequeue|dir|each|Event|extend|filter|find|fx|get|getJSON|getScript|globalEval|grep|handleError|httpData|httpNotModified|httpSuccess|inArray|isArray|isFunction|isXMLDoc|makeArray|map|merge|multiFilter|noConflict|nodeName|nth|param|post|prop|queue|ready|removeData|sibling|speed|swap|trim|unique)(?=[ \t]*\()/, 'FUNCTION JQUERY'],
            [/(add|addClass|after|ajaxComplete|ajaxError|ajaxSend|ajaxStart|ajaxStop|ajaxSuccess|andSelf|animate|append|appendTo|attr|before|bind|blur|change|children|click|clone|closest|contents|css|data|dblclick|dequeue|die|domManip|each|empty|end|eq|error|extend|fadeIn|fadeOut|fadeTo|filter|find|focus|get|hasClass|height|hide|hover|html|index|init|insertAfter|insertBefore|is|keydown|keypress|keyup|live|_load|load|map|mousedown|mouseenter|mouseleave|mousemove|mouseout|mouseover|mouseup|next|nextAll|not|offset|offsetParent|one|outerHeight|outerWidth|parent|parents|position|prepend|prependTo|prev|prevAll|pushStack|queue|ready|remove|removeAttr|removeClass|removeData|replaceAll|replaceWith|resize|scroll|scrollLeft|scrollTop|select|serialize|serializeArray|setArray|show|siblings|size|slideDown|slideToggle|slideUp|sort|splice|stop|submit|text|_toggle|toggle|toggleClass|trigger|triggerHandler|unbind|unload|val|width|wrap|wrapAll|wrapInner)(?=[ \t]*\()/, 'FUNCTION JQUERY'], // 'push' and 'slice' belong to Array
            [/(fn|browser|cache|expr|event|isReady|readyList|support|props|ajaxSettings|lastModified|active|easing|timers|offset|boxModel)\b/, 'KEYWORD JQUERY'],
            [/(for|in|while|do|break|return|continue|switch|case|default|if|else|throw|try|catch|finally|new|delete|typeof|instanceof|void)\b/, 'KEYWORD', 'slashstartsregex'],
            [/(var|with|function|this)\b/, 'KEYWORD'],
            [/(abstract|boolean|byte|char|class|const|debugger|double|enum|export|extends|final|float|goto|implements|import|int|interface|long|native|package|private|protected|public|short|static|super|synchronized|throws|transient|volatile)\b/, 'KEYWORD RESERVED'],
            [/(true|false|null|NaN|Infinity|undefined)\b/, 'KEYWORD KEYWORDCONST'],
            [/(document|body|window|navigator|(inn|out)er(Height|HTML|Width)|(offset|scroll)(Height|Left|Top|Width)|length)\b/, 'KEYWORD BUILTIN'],
            [/(Array|Boolean|Date|Error|Function|Math|netscape|Number|Object|Packages|RegExp|String|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|(add|remove)EventListener|alert|(clear|set)(Interval|Timeout)|dispatchEvent)\b/, 'FUNCTION BUILTIN'],
            [/(attributes|childElementCount|childNodes|data|(first|last)(Element)?Child|(next|previous)(Element)?Sibling|node(Name|Type|Value)|parentNode|append(Child|Data)|cloneNode|deleteData|getAttribute(Node|NS)?|getElementById|getElementsBy(Name|TagName(NS)?)|hasChildNodes|importNode|insert(Before|Data)|remove(Attribute(Node)?|Child)|replace(Child|Data)|setAttribute(Node)?|className|id|title|tagName|Image|cookie|create(Attribute(NS)?|Element(NS)?|TextNode)|ownerDocument|normalize|isSupported|namespaceURI|prefix|localName|hasAttributes|documentElement|prototype|constructor|apply|call|content(Document|Window)|arguments|arity|calle[er]|toString)\b/, 'KEYWORD BUILTIN'],
            [/(concat|join|push|pop|reverse|(un)?shift|sp?lice|sort)\b/, 'FUNCTION BUILTIN'], // Array
            [/(char(Code)?At|(lastI|i)ndexOf|match|replace|search|split|substr(ing)?|to(Lower|Upper)Case)\b/, 'FUNCTION BUILTIN'], // String
            [/(exec|test)\b/, 'FUNCTION BUILTIN'], // RegExp
            [/[$a-zA-Z_][$a-zA-Z0-9_]*(?=[ \t]*\()/, 'FUNCTION'],
            [/[$a-zA-Z_][$a-zA-Z0-9_]*/, null],
            [/0x[0-9a-fA-F]+/, 'NUMBER HEX'],
            [/[0-9]*\.[0-9]+([eE][+-]?[0-9]+)?|[0-9]+(\.|[eE]-[0-9]+)/, 'NUMBER FLOAT'],
            [/0[0-7]+/, 'NUMBER OCT'],
            [/[0-9]+([eE]+?[0-9]+)?/, 'NUMBER INTEGER'],
            [/"(\\.|\\\n|[^\\"\n])*"/, 'STRING'],
            [/'(\\.|\\\n|[^\\'\n])*'/, 'STRING SINGLESTRING']
            // the above will allow C-style backslash-escaped linebreaks,
            // which is actually not part of the ECMA-Standard, cf.
            // http://www.nczonline.net/blog/2006/12/26/interesting-javascript-string-capability/#comment-902
            // This is the correct according to the standard:
            // [/"(\\.|[^\\"\n])*"/, 'STRING'],
            // [/'(\\.|[^\\'\n])*'/, 'STRING SINGLESTRING']
        ]
    },

    'CSS': {
        // the following keywords should not be modified: 'rules', 'ESCAPEDPROPERTY', 'PROPERTY', 'URL', 'COLOR'
        'whitespaceandcomments': [
            [/\s+/, 'WHITESPACE'],
            [/\/\*[\s\S]*?\*\//, 'COMMENT']
        ],
        'strings': [
            [/"(\\.|\\\n|[^\\"\n])*"/, 'STRING'],
            [/'(\\.|\\\n|[^\\'\n])*'/, 'STRING SINGLESTRING'],
            [/['"].*/, 'ERROR']
        ],
        'selector': [
            IMPORT('whitespaceandcomments'),
            [/{/, 'OPERATOR', [POP(), 'rules']],
            [/[>+,~()]/, 'OPERATOR'],
            [/[[](?=[^{]*])/, 'OPERATOR', 'attributeselector'],
            [/\.[^[\](){}>=+.,:;!&|?^~#$\s]+/, 'CLASSNAME'],
            [/#[^[\](){}>=+.,:;!&|?^~#$\s]+/, 'ID'],
            [/::(?=(first-(line|letter)|before|after|selection)\b)/i, 'OPERATOR', 'pseudoclass'],
            [/:/, 'OPERATOR', 'pseudoclass'],
            [/./, 'TAGNAME']
        ],
        'attributeselector': [
            IMPORT('whitespaceandcomments'),
            IMPORT('strings'),
            [/]/, 'OPERATOR', POP()],
            [/[~|^$*]?=/, 'OPERATOR'],
            [/./, 'ATTRIBUTE']
        ],
        'pseudoclass': [
            [/(link|visited|hover|focus|active|(first|last|only)-(child|of-type)|empty|root|target)\b/i, 'PSEUDOCLASS', POP()],
            [/(first-(line|letter)|before|after|selection)\b/i, 'PSEUDOCLASS', POP()],
            [/lang\(\w+\)/i, 'PSEUDOCLASS', POP()],
            [/not(?=\([^{]*\))/i, 'PSEUDOCLASS', POP()],
            [/(nth-(last-)?(of-type|child)\(\d+\))/i, 'PSEUDOCLASS', POP()],
            [/{/, 'OPERATOR', [POP(), 'rules']],
            [/[>+,~]/, 'OPERATOR', POP()],
            [/\s+/, 'WHITESPACE', POP()]
        ],
        'rules': [
            IMPORT('whitespaceandcomments'),
            [/:/, 'OPERATOR', 'values'],
            [/}/, 'OPERATOR', POP()],
            [/;/, 'OPERATOR'],
            [/([a-z-]*\\[a-z]+[a-z-]*)/i, 'ESCAPEDPROPERTY'],
            [/(background(-(attachment|color|image|position|repeat))?|border(-collapse|-spacing|(-(bottom|top|left|right))?(-(color|style|width))?)|(margin|padding)(-(bottom|top|left|right))?|font(-(size|stretch|style|variant|weight))|((min|max)-)?(height|width)|outline(-(color|style|width))?|bottom|caption-side|clear|clip|color|content|cursor|direction|display|empty-cells|float|left|letter-spacing|line-height|list-style(-(image|position|type))?|orphans|overflow(-[xy])?|position|quotes|right|table-layout|text-(align|decoration|indent|transform)|top|unicode-bidi|vertical-align|visibility|white-space|widows|word-spacing|z-index|size|marks|page(-break-(before|after|inside))?|orphans|widows|volume|pause(-(before|after))?|cue(-(before|after))?|play-during|azimuth|elevation|speech-rate|pitch(-range)?|stress|richness|speak(-(header|punctuation|numeral))?|src)\b(?=[^-]|$)/i, 'PROPERTY'],
            [/font(-family)?\b(?=[^-]|$)/i, 'PROPERTY', [POP(), 'fontrule']],
            [/voice-family\b(?=[^-]|$)/i, 'PROPERTY', [POP(), 'voicefamilyrule']],
            [/counter-(increment|reset)\b(?=[^-]|$)/i, 'PROPERTY', [POP(), 'counterrule']],
            [/(alignment-(adjust|baseline)|appearance|background-(break|clip|origin|size)|baseline-shift|binding|bookmark-(label|level|target)|border-(((top|bottom)-(left|right)-)?radius|break|image|length)|box-(align|direction|flex(-group)?|lines|orient|pack|shadow|sizing)|change-bar(-(class|offset|side))?|clear-after|color-profile|column-(break-(after|before)|count|fill|gap|rule(-(color|style|width))?|span|width)|columns|crop|display-(model|role)|dominant-baseline|drop-initial-(after|before)-(adjust|align)|drop-initial-(size|value)|fit(-position)?|float-offset|font-(effect|emphasize(-(position|style))?|size-adjust|smooth)|grid-(columns|rows)|hanging-punctuation|hyphenate-(after|before|character|lines|resource)|hyphens|icon|image-(orientation|resolution)|inline-box-align|insert-position|line-stacking(-(ruby|shift|strategy))?|make-element|marquee-(direction|play-count|speed|style)|move-to|nav-(down|index|left|right|up)|opacity|outline-offset|overflow-style|page-policy|presentation-level|prototype(-insert-(policy|position))?|punctuation-trim|rendering-intent|resize|rotation(-point)?|ruby-(align|overhang|position|span)|string-set|tab-side|target(-(name|new|position))?|text-(align-last|emphasis|height|justify|outline|replace|shadow|wrap)|white-space-collapse|word-(break|wrap))\b(?=[^-]|$)/i, 'PROPERTY'],
            [/-(khtml|ms|moz|o|wap|webkit)-[a-z_\-]+|behavior|filter|zoom/i, 'PROPRIETARY PROPERTY']
        ],
        'fontrule': [
            IMPORT('whitespaceandcomments'),
            [/:/, 'OPERATOR', 'fontvalues'],
            [/}/, 'OPERATOR', POP()]
        ],
        'voicefamilyrule': [
            IMPORT('whitespaceandcomments'),
            [/:/, 'OPERATOR', 'voicefamilyvalues'],
            [/}/, 'OPERATOR', POP()]
        ],
        'counterrule': [
            IMPORT('whitespaceandcomments'),
            [/:/, 'OPERATOR', 'countervalues'],
            [/}/, 'OPERATOR', POP()]
        ],
        'url': [
            [/\(/, 'OPERATOR'],
            [/\s+/, 'WHITESPACE'],
            [/"(\\.|[^\\"\n])*"/, 'URL STRING'],
            [/'(\\.|[^\\'\n])*'/, 'URL STRING SINGLESTRING'],
            [/(\\.|[^\s)])+(?=\s*\))/, 'URL'],
            [/\)/, 'OPERATOR', POP()],
            [/[^\s]+\s(?!\))/, 'ERROR']
        ],
        'values': [
            IMPORT('whitespaceandcomments'),
            IMPORT('strings'),
            [/,/, 'OPERATOR'],
            [/;/, 'OPERATOR', POP()],
            [/}/, 'OPERATOR', POP(2)],
            [/url(?=\()/i, 'KEYWORD', 'url'],
            [/attr(?=\()/i, 'KEYWORD', 'identifier'],
            [/rect(?=\()/i, 'KEYWORD', 'shape'],
            [/#([0-9a-f]{3}){1,2}\b/i, 'COLOR'],
            [/#([0-9a-f]+)\b/i, 'ERROR'],
            [/(rgb|hsl)a?\([^);}]+\)/, 'COLOR'],
            [/(Active(Border|Caption)|AppWorkspace|Background|Button(Face|Highlight|Shadow|Text)|CaptionText|GrayText|Highlight(Text)?|Inactive(Border|Caption(Text)?)|InfoBackground|InfoText|Menu(Text)?|Scrollbar|ThreeD(DarkShadow|Face|Highlight|(Light)?Shadow)|Window(Frame|Text)?)\b/i, 'COLOR'],
            [/(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gr[ae]y|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenrodYellow|LightGreen|LightGr[ae]y|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, 'COLOR'],
            [/(absolute|(lower|upper)-alpha|armenian|auto|avoid|baseline|bidi-override|blink|block|bold(er)?|both|bottom|capitalize|center|circle|cjk-ideographic|collapse|compact|crosshair|dashed|decimal(-leading-zero)?|default|disc|dotted|double|embed|e-resize|(extra-|semi-|ultra-)?(condensed|expanded)|fixed|georgian|groove|hebrew|help|hidden|hide|(hiragana|katakana)(-iroha)?|inherit|inline(-block|-table)?|inset|inside|invert|italic|justify|larger?|left|light(er)?|line-through|list-item|lower(case|-(greek|latin|roman))|ltr|marker|middle|move|narrower|none|(no-)?(open|close)-quote|no-repeat|normal|nowrap|([ns][ew]?|[ew])-resize|oblique|outset|outside|overline|pointer|pre(-line|-wrap)?|progress|relative|repeat(-[xy])?|ridge|right|rtl|run-in|scroll|separate|show|small(-caps)?|smaller|solid|square|s-resize|static|sub|super|table(-(caption|cell|(column|row)(-group)?)|-(header|footer)-group)?|text(-(bottom|top))?|thick|thin|top|transparent|underline|upper(case|-latin|-roman)|visible|wait|wider|medium|x?x-large|x?x-small)\b(?!-)/i, 'KEYWORD'],
            [/(behind|(center|far)-(left|right)|(left|right)(-side|wards)|above|below|(high|s?low|fast)(er)?|level|x-(high|s?low|fast|loud|soft)|mix|always|once|continuous|digits|code|spell-out|loud|silent|soft)\b(?!-)/i, 'KEYWORD'],
            [/!\s*important\b/i, 'IMPORTANT'],
            [/[+-]?\d*\.?\d+(%\B|(em|ex|px|in|cm|mm|pt|pc|deg|g?rad|m?s|k?Hz)?\b)/i, 'LENGTH'],
            [/-(khtml|ms|moz|o|wap|webkit)-[a-z_\-]+/, 'PROPRIETARY'],
            [/hand|(expression|(progid:DXImageTransform\.Microsoft\.)?(Alpha(ImageLoader)?|BasicImage|Chroma|Compositor|(Drop)?Shadow|Glow|Light|(Gradient|Mask)Filter))\([^;}]+\)/i, 'PROPRIETARY']
        ],
        'shape': [ // cf. http://www.w3.org/TR/CSS21/visufx.html#value-def-shape
            [/[(,]/, 'OPERATOR'],
            [/\s+/, 'WHITESPACE'],
            [/\)/, 'OPERATOR', POP()],
            [/auto\b/, 'KEYWORD'],
            [/[+-]?\d*\.?\d+(%\B|(em|ex|px|in|cm|mm|pt|pc)?\b)/i, 'LENGTH'],
            [/[;]/, 'ERROR', POP(2)]
        ],
        'identifier': [ // cf. http://www.w3.org/TR/CSS21/generate.html#propdef-content
            [/\(/, 'OPERATOR'],
            [/\)/, 'OPERATOR', POP()],
            [/\s/, 'ERROR', POP()],
            [/./, null]
        ],
        'fontvalues': [
            IMPORT('whitespaceandcomments'),
            IMPORT('strings'),
            [/,/, 'OPERATOR'],
            [/;/, 'OPERATOR', [POP(2), 'rules']],
            [/}/, 'OPERATOR', POP(2)],
            [/(medium|x?x-large|x?x-small|(sans-)?serif|cursive|fantasy|monospace)\b/i, 'KEYWORD'],
            [/!\s*important\b/i, 'IMPORTANT'],
            [/[+-]?\d*\.?\d+(%\B|(em|ex|px|in|cm|mm|pt|pc)?\b)/i, 'LENGTH'],
            [/./, null]
        ],
        'voicefamilyvalues': [
            IMPORT('whitespaceandcomments'),
            IMPORT('strings'),
            [/,/, 'OPERATOR'],
            [/;/, 'OPERATOR', [POP(2), 'rules']],
            [/}/, 'OPERATOR', POP(2)],
            [/(male|female|child)\b/i, 'KEYWORD'],
            [/!\s*important\b/i, 'IMPORTANT'],
            [/./, null]
        ],
        'countervalues': [
            IMPORT('whitespaceandcomments'),
            IMPORT('strings'),
            [/,/, 'OPERATOR'],
            [/;/, 'OPERATOR', [POP(2), 'rules']],
            [/}/, 'OPERATOR', POP(2)],
            [/(inherit|none)\b/i, 'KEYWORD'],
            [/!\s*important\b/i, 'IMPORTANT'],
            [/./, null]
        ],
        'atrule': [
            IMPORT('whitespaceandcomments'),
            IMPORT('strings'),
            [/{/, 'OPERATOR', [POP(), 'atrulecontents']],
            [/;/, 'OPERATOR', POP()],
            [/@[\w-]+/, 'ATRULE'],
            [/(all|braille|embossed|handheld|print|projection|screen|speech|tty|tv)\b/, 'KEYWORD'],
            [/url(?=\()/i, 'KEYWORD', 'url'],
            [/,/, 'OPERATOR'],
            [/./, null]
        ],
        'import': [
            IMPORT('whitespaceandcomments'),
            [/url(?=\()/i, 'KEYWORD', 'url'],
            [/"(\\.|[^\\"\n])*"/, 'URL STRING'],
            [/'(\\.|[^\\'\n])*'/, 'URL STRING SINGLESTRING'],
            [/(all|braille|embossed|handheld|print|projection|screen|speech|tty|tv)\b/, 'KEYWORD'],
            [/,/, 'OPERATOR'],
            [/;/, 'OPERATOR', POP()],
            [/./, null]
        ],
        'atrulecontents': [
            IMPORT('whitespaceandcomments'),
            [/}/, 'OPERATOR', POP()],
            FALLTHROUGH('selector')
        ],
        'root': [
            IMPORT('whitespaceandcomments'),
            [/<!--/, 'COMMENT'],
            [/-->/, 'COMMENT'],
            [/@(font-face|page)\b/, 'ATRULE', 'selector'],
            [/@import\b/, 'ATRULE', 'import'],
            [/(?=@)/, null, 'atrule'],
            FALLTHROUGH('selector')
        ]
    },

    'DIFF' : { // HACK (experimental)
        'root': [
            [/\+.*/, 'PSEUDOCLASS'],
            [/-.*/, 'KEYWORD'],
            [/@@.*/, 'REGEX'],
            [/.+/, 'COMMENT'],
            [/\n/, 'WHITESPACE']
        ]
    }

    // TODO: TXT syntax
};

///////////////////////////////////////////////////////
/*                     main                          */
///////////////////////////////////////////////////////

init();
var hl = new GreaseMandrillHighlighter(greaseMandrillSyntax);
if (atJsFile()) {
    var code = document.getElementsByTagName('pre')[0];
    var text = code.textContent;
    code.className = 'GreaseMandrill LANG:JS';
} else if (atCssFile()) {
    var code = document.getElementsByTagName('pre')[0];
    code.className = 'GreaseMandrill LANG:CSS';
} else if (atDiffFile()) {
    var code = document.getElementsByTagName('pre')[0];
    code.className = 'GreaseMandrill LANG:DIFF';
}
var preElements = toArray(document.getElementsByClassName('GreaseMandrill'));
var highlightableElements = new Array();
var textLength = 0;
for (var i in preElements) {
    var code = preElements[i];
    var langMatch = code.className.match(/LANG:[^\s]+/);
    if (!langMatch) continue;
    textLength += code.textContent.length;
    highlightableElements.push(code);
}
if (textLength <= MAXLENGTH * 1024 || MAXLENGTH <= 0) {
    for (var i in highlightableElements) {
        var code = highlightableElements[i];
        var lang = code.className.match(/LANG:[^\s]+/)[0].replace(/LANG:/, '');
        highlightedCode = hl.highlight(code, lang, true);
        if (lang == 'CSS') makeLinksAndThumbnails(highlightedCode);
    }
} else {
    for (var i in highlightableElements) {
        var code = highlightableElements[i];
        message('GreaseMandrill: Code is larger than ' + MAXLENGTH + ' kB.\nClick in the code to highlight.');
        code.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var lang = this.className.match(/LANG:[^\s]+/)[0].replace(/LANG:/, '');
            highlightedCode = hl.highlight(this, lang, true);
            if (lang == 'CSS') makeLinksAndThumbnails(highlightedCode);
        }, false);
    }
}
new Menu();

} // end of wrapper GreaseMandrill()

function atJsFile() {
    return (/[-/](java|ecma)script$/.test(document.contentType)
            || /(\.[aj]s(\?.*)?|[?=]js|\.json)$/.test(location.href.toLowerCase()));
}

function atCssFile() {
    return (document.contentType == 'text/css'
            || /(\.css(\?.*)?|[?=]css)$/.test(location.href.toLowerCase()));
}

function atTextFile() {
    return (document.contentType == 'text/plain'
            || /(\.txt(\?.*)?|[?=]txt)$/.test(location.href.toLowerCase()));
}

function atDiffFile() {
    return (document.contentType == 'text/plain'
            && /(\.diff(\?.*)?)$/.test(location.href.toLowerCase()));
}

function epmtyHead() {
    return !document.getElementsByTagName('head')[0].innerHTML;
}

function shouldHighlightFile() {
    var inFrame = false;
    try {
        inFrame = (window.top != window);
    } catch (ignore) {}
    if (inFrame) {
        return false;
    }
    var self = arguments.callee;
    if (!self.cachedValue)
        self.cachedValue = ((atJsFile() || atCssFile() || atDiffFile() /*|| atTextFile() */) && epmtyHead());
    return self.cachedValue;
}

function shouldHighlightCode() {
    return !!document.getElementsByClassName('GreaseMandrill')[0];
}

var w = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
if (!w.greaseMandrillLoaded) {
    if(shouldHighlightFile() || shouldHighlightCode()) GreaseMandrill();
}
w.greaseMandrillLoaded = true;

})(); // end of anonymous wrapper
