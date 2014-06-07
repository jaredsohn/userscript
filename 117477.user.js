// ==UserScript==
// @name          Syntax Highlighter for DelphiMaster
// @namespace     http://roman.yankovsky.me
// @description   Enables syntax highlighting for delphimaster.ru and delphimaster.net 
// @version       2012.02.20
// @include       http://delphimaster.ru/cgi-bin/forum.pl*
// @include       http://*.delphimaster.ru/cgi-bin/forum.pl*
// @include       http://delphimaster.net/*
// @include       http://*.delphimaster.net/*
// @exclude       http://delphimaster.ru/cgi-bin/anketa.pl*
// @exclude       http://*.delphimaster.ru/cgi-bin/anketa.pl*
// @require       http://roman.yankovsky.me/wp-content/plugins/syntaxhighlighter/syntaxhighlighter3/scripts/shCore.js?ver=3.0.83c.1
// @require       http://roman.yankovsky.me/wp-content/plugins/syntaxhighlighter/syntaxhighlighter3/scripts/shBrushDelphi.js?ver=3.0.83c.2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

(function() {

var GM_CSS = document.createElement('link');
    GM_CSS.href = 'http://roman.yankovsky.me/wp-content/plugins/syntaxhighlighter/syntaxhighlighter3/styles/shCore.css?ver=3.0.83c';
    GM_CSS.type = 'text/css';
    GM_CSS.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(GM_CSS);

var GM_CSS = document.createElement('link');
    GM_CSS.href = 'http://roman.yankovsky.me/wp-content/plugins/syntaxhighlighter/syntaxhighlighter3/styles/shThemeDefault.css?ver=3.0.83c';
    GM_CSS.type = 'text/css';
    GM_CSS.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(GM_CSS);   

highlightCode();

})();

function highlightCode() {

  $('code').each(function() {
            $(this).html($(this).html().replace(/(<br>)|(<br \/>)|(<p>)|(<\/p>)/g, "\r\n"));
            $(this).html($(this).html().replace(/(<b>)|(<\/b>)|(<i>)|(<\/i>)|(<u>)|(<\/u>)/g, ""));
            $(this).html($(this).html().replace(/<a href=\"(.+)" target=\"_blank\">(.+)<\/a>/gi, "$1"));
        });

  $('code').addClass('brush: delphi; title: ; notranslate');

  SyntaxHighlighter.config.tagName = 'code';
  SyntaxHighlighter.config.strings.expandSource = '+ expand source';
  SyntaxHighlighter.config.strings.help = '?';
  SyntaxHighlighter.config.strings.alert = 'SyntaxHighlighter\n\n';
  SyntaxHighlighter.config.strings.noBrush = 'Can\'t find brush for: ';
  SyntaxHighlighter.config.strings.brushNotHtmlScript = 'Brush wasn\'t configured for html-script option: ';
  SyntaxHighlighter.defaults['pad-line-numbers'] = false;
  SyntaxHighlighter.defaults['tab-size'] = 2;
  SyntaxHighlighter.defaults['toolbar'] = false;
  SyntaxHighlighter.all();

}