// ==UserScript==
// @name        Syntax Highlighter per HTML.it
// @include     http://forum.html.it/forum/showthread.php?*
// @include     http://forum.html.it/forum/newreply.php?*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require     http://balupton.github.com/jquery-syntaxhighlighter/scripts/jquery.syntaxhighlighter.min.js
// ==/UserScript==

$('div.boxcode').find('pre').addClass('highlight').css(
        {
            'border-style': 'none',
            'margin-bottom': '0px'
        });
$('div.boxcode').css(
        {
            'padding-bottom': '0',
            'padding-top': '0'
        });
$.SyntaxHighlighter.init(
        {
            'wrapLines':false,
            'lineNumbers':false
        });

// SyntaxHighlighter imposta per qualche motivo white-space a normal anche se gli si dice 'wrapLines':false,
// per cui nel layout del forum il risultato è che manda a capo le parole; a complicare la cosa, se al momento
// di chiamare init non ha ancora caricato tutto aspetta 1200 msec; per questo motivo, dobbiamo impostare la
// nostra override in modo che avvenga dopo che SyntaxHighlighter abbia fatto il suo mestiere
setTimeout(function()
        {
            $('div.boxcode').find('pre').css('white-space', '');
        }, 1210);
