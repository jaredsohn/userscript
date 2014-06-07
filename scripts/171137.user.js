// ==UserScript==
// @name        Wikipedia Syntax Highlighting
// @namespace   http://userscripts.org/users/69817
// @include     http://pt.wikipedia.org/w/index.php?*&action=edit*
// @include     https://pt.wikipedia.org/w/index.php?*&action=edit*
// @require     http://mwcodemirror.sourceforge.net/js/codemirror.js
// @require     http://mwcodemirror.sourceforge.net/js/editor.js
// @require     http://mwcodemirror.sourceforge.net/js/highlight.js
// @require     http://mwcodemirror.sourceforge.net/js/mirrorframe.js
// @require     http://mwcodemirror.sourceforge.net/js/parsemw.js
// @require     http://mwcodemirror.sourceforge.net/js/select.js
// @require     http://mwcodemirror.sourceforge.net/js/stringstream.js
// @require     http://mwcodemirror.sourceforge.net/js/tokenize.js
// @require     http://mwcodemirror.sourceforge.net/js/undo.js
// @require     http://mwcodemirror.sourceforge.net/js/util.js
// @version     1
// ==/UserScript==

// BUGGY!

/*
var editor = CodeMirror.fromTextArea('wpTextbox1', {
    height: "300px",
    parserfile: "http://mwcodemirror.sourceforge.net/js/parsemw.js",
    stylesheet: "http://mwcodemirror.sourceforge.net/css/mwcolors.css",
    path: "http://mwcodemirror.sourceforge.net/js/"
});
*/

// see source code of http://mwcodemirror.sourceforge.net/

var editor = CodeMirror.fromTextArea('wpTextbox1', {
    height: "300px",
    parserfile: "parsemw.js",
    stylesheet: "http://mwcodemirror.sourceforge.net/css/mwcolors.css",
    path: "/"
});


/*
codemirror.js
editor.js
highlight.js
mirrorframe.js
parsemw.js
select.js
stringstream.js
tokenize.js
undo.js
util.js
*/

// first I tried with the first "require" only...
