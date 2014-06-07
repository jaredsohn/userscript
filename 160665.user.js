// ==UserScript==
// @name         [SG.hu] SyntaxHighlighter
// @namespace    http://malakai.hu/
// @version      0.1
// @description  Adds SyntaxHighlighter to SG.hu forum code blocks
// @match        http://*.sg.hu/listazas*
// @copyright    2012+, TLGreg
// @require      http://code.jquery.com/jquery-1.9.1.min.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushAppleScript.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushAS3.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushBash.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushColdFusion.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCpp.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCSharp.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCss.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushDiff.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushErlang.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushGroovy.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJava.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJavaFX.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJScript.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushDelphi.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPerl.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPhp.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPowerShell.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPython.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushRuby.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushSass.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushScala.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushSql.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushVb.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushXml.js
// @require      http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPlain.js
// ==/UserScript==

/* Monokai Theme but not a good one
$('head').append('<link rel="stylesheet" type="text/css" href="http://tmp.malakai.hu/shMonokai/shCoreMonokai.css">');
$('head').append('<link rel="stylesheet" type="text/css" href="http://tmp.malakai.hu/shMonokai/shThemeMonokai.css">');
*/

// RDark Theme
$('head').append('<link rel="stylesheet" type="text/css" href="http://alexgorbatchev.com/pub/sh/current/styles/shCoreRDark.css">');
$('head').append('<link rel="stylesheet" type="text/css" href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeRDark.css">');

$('head').append('<style>.syntaxhighlighter { padding-top: .5em; padding-bottom: .5em; }</style>');

var onPage = 0;

setInterval(function() {
	var pageIndicators = $('.ext_autopager_idicator');
    if ( pageIndicators.length > onPage ) {
    	highlight(pageIndicators.get(onPage));
        onPage = pageIndicators.length;
    }
}, 3000);

function highlight(indicator) {
    var codeBlocks = $('pre'),
        syntaxes = ['applescript', 'as3', 'bash', 'cf', 'cpp', 'csharp',
                    'css', 'diff', 'erl', 'groovy', 'java', 'jfx', 'js',
                    'pas', 'perl', 'php', 'ps', 'py', 'ruby', 'sass',
                    'scala', 'sql', 'vb', 'xml'];
    
    console.log(codeBlocks);
    
    codeBlocks.each(function() {
        var elm = $(this),
            brush = elm.attr('class').match(/brush:\s*(\w+)(?=;)/);
        
        if ( $.inArray(brush[1], syntaxes) < 0 ) {
            elm.attr('class', elm.attr('class').replace(/(brush:\s*)(\w+)(?=;)/g, "$1plain"));
        }
        elm = null;
        brush = null;
    });
    
	SyntaxHighlighter.highlight();
    
    codeBlocks = null;
    syntaxes = null;
}

highlight();