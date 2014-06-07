// ==UserScript==
// @name          Userscripts.org - Forum Syntax Highlighting
// @namespace     http://userscripts.org/users/23652
// @description   Gives you syntax highlighting for pre blocks on forums
// @include       http://userscripts.org/topics/*
// @include       http://userscripts.org/home/comments*
// @include       https://userscripts.org/topics/*
// @include       https://userscripts.org/home/comments*
// @copyright     JoeSimmons
// @version       1.0.4
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.0.js
// @require       https://raw.github.com/joesimmons/jsl/master/jsl.ajax.js
// @downloadURL   http://userscripts.org/scripts/source/185155.user.js
// @updateURL     http://userscripts.org/scripts/source/185155.meta.js
// @grant         GM_xmlhttpRequest
// ==/UserScript==

/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

    
/*
    This script uses SHJS, which is used by Userscripts.org also
    http://shjs.sourceforge.net/
*/

/* CHANGELOG

1.0.4 (12/26/2013)
    - added a css rule so the right font gets used with the code blocks

1.0.3 (12/1/2013)
    - added different highlighting for CSS, HTML, and JavaScript
    - switched to official SHJS svn files using JSL's ajax plugin to
        load the scripts so they work on https USO (read 1.0.2 changes to understand)

1.0.2 (11/30/2013)
    - switched to the USO hosted SHJS files
        sourceforge doesn't support https for its CDN servers,
        so the added highlighting scripts won't work on the
        https version of Userscripts.org due to a security error

1.0.1 (11/30/2013)
    - changed to using the same highlighter as Userscripts.org (SHJS)

1.0.0 (11/30/2013)
    - created

*/

/* TO DO
    Add separate CSS and HTML highlighting (they currently are highlighted as JS)
*/

JSL.runAt('interactive', function () {
    'use strict';

    var themeUrls = [
        '/stylesheets/sh_style.css'
    ];
    var scriptUrls = [
        'http://shjs.sourceforge.net/sh_main.min.js',
        'http://shjs.sourceforge.net/lang/sh_css.min.js',
        'http://shjs.sourceforge.net/lang/sh_html.min.js',
        'http://shjs.sourceforge.net/lang/sh_javascript.min.js'
    ];
    var rScriptName = /\/(sh_[a-z_]+)(\.min)?\.js/;
    var langs = {
        'css' : /([a-zA-Z-]+)\s*:\s*([a-zA-Z0-9\s.#]+)(\s*!important\s*)?;/,

        'html' : /^((\s*<[^>]+>[\s\S]*<\/[a-zA-Z]+>\s*)|(\s*<[^/>]+\/>)\s*)+$/,

        'javascript' : /var [a-zA-Z$_][a-zA-Z0-9$_]*(\s*=\s*[^;\n\r]+)?[;\n\r]|function\s*\([^)]*\)\s*\{[^}]*\}|(^|[()\[\].,\s+])[a-zA-Z$_][a-zA-Z0-9$_]*\s*\([^)]*\)/
        //              matches a var declaration                             | matches a function declaration | matches a function invocation
    };
    var precedence = {'javascript' : 3, 'html' : 2, 'css' : 1};
    var codeBlocks;

    function getLang(string) {
        var foundLang = 'sourceCode', // default, so the script doesn't die
            highestFoundPrecedence = 0,
            matchedLangs = [],
            lang;

        // find languages that resemble the string's language
        for (lang in langs) {
            if ( langs.hasOwnProperty(lang) && string.match( langs[lang] ) ) {
                matchedLangs.push( precedence[lang] );
            }
        }

        // figure out the highest precedence language that was found
        highestFoundPrecedence = Math.max.apply(null, matchedLangs);
        for (lang in langs) {
            if ( highestFoundPrecedence === precedence[lang] ) {
                foundLang = lang;
            }
        }

        return foundLang;
    }

    // run by JoeSimmons
    function run(t) {
        var s = document.createElement('script'),
            body = document.body;

        s.type = 'text/javascript';
        s.innerHTML = t;

        body.appendChild(s);
        body.removeChild(s);
    }

    function doHighlight() {
        codeBlocks.each(function () {
            var pre = this,
                code = pre.getElementsByTagName('code')[0];

            if (code) {
                pre.innerHTML = code.innerHTML;
            }

            pre.innerHTML = pre.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            pre.setAttribute( 'class', 'sh_' + getLang(pre.textContent) );
        });

        run('sh_highlightDocument();');
    }

    JSL.runAt('interactive', function () {
        // change <code> elements with newlines in them to <pre>
        // also replace <br> with a newline in <code> tags
        JSL('code').each(function () {
            var rBr = /(<|&lt;)br(\s*\/)?(>|&gt;)/g,
                rNewline = /[\r\n]/,
                parentPreExists = JSL(this).parent('pre').exists,
                pre;

            if ( this.innerHTML.match(rNewline) || this.innerHTML.match(rBr) ) {
                if (!parentPreExists) {
                    // replace this <code> tag with a <pre> tag
                    pre = document.createElement('pre');
                    pre.innerHTML = this.innerHTML.replace(rBr, '\n');
                    this.parentNode.replaceChild(pre, this);
                } else {
                    // make this <code> tag's contents the parent's contents
                    this.innerHTML = this.innerHTML.replace(rBr, '\n');
                    this.parentNode.innerHTML = this.innerHTML;
                }
            }
        });

        codeBlocks = JSL('.posts .post .body pre');

        // make sure the page is not in a frame & there are code blocks to highlight
        if (!codeBlocks.exists || window !== window.top) { return; }

        // make sure the pre/code blocks have the right font & size
        JSL.addStyle('' +
            'pre, code { ' +
                'font-family: Consolas, "Courier New", "Ubuntu Sans Mono", "DejaVu Sans Mono", monospace !important; ' +
                'font-size: 9pt !important; ' +
            '}' +
        '');

        // add the required highlighting styles
        JSL.each(themeUrls, function (themeUrl) {
            JSL('html > head').append('link', {
                type : 'text/css',
                rel : 'stylesheet',
                href : themeUrl
            });
        });

        // add the required highlighting scripts
        JSL.ajax(scriptUrls, {
            onload : function (resp) {
                JSL('html > head').append('script', {
                    id : resp.url.match(rScriptName)[1],
                    type : 'text/javascript',
                    innerHTML : resp.responseText
                });

                if (JSL.ajax().length === 0) {
                    window.setTimeout(doHighlight, 500);
                }
            }
        });
    });
});