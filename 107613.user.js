// ==UserScript==
// @name           Common Knowledge 
// @namespace      userscript
// @description    Reveals the answers
// @include        http://www.puzzability.com/cgi-bin/commonknowledge.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var $app = $('applet:first');

$('<div id="answer"></div>')
    .css({"text-align":"left", "padding":"1em", "font-weight": "bold" })
    .hide()
    .insertAfter($app);

var str = $('param[name=wordstoguess]', $app).val().toUpperCase().replace(/%/g, "<br/>")+"<br/><br/>";
str += $('param[name=solution]', $app).val().toUpperCase().replace(/%/g, "<br/>")+"<br/><br/>";
str += $('param[name=finalfact]', $app).val();
$('#answer').html(str);

$('<div>Show Answers</div>')
    .css({ "text-decoration": "underline", cursor: "pointer", float: "right" })
    .bind('click', function(){ $('#answer').toggle() })
    .insertAfter($app);
