// ==UserScript==
// @name        Syntax highlighter for The Old New Thing
// @namespace   http://www.mitalia.net/
// @include     http://blogs.msdn.com/b/oldnewthing/*
// @version     1
// @require     http://balupton.github.com/jquery-syntaxhighlighter/scripts/jquery.syntaxhighlighter.min.js
// ==/UserScript==

// Not needed (and messes comments up): already has jQuery
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js

$('pre').addClass('highlight');
$.SyntaxHighlighter.init(
        {
            'wrapLines':false,
            'lineNumbers':false
        });
