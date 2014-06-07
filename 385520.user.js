// ==UserScript==
// @name       DIKUsjov Restyler
// @namespace  http://mathemaniac.org
// @version    1.0
// @description  Gør DIKUsjov mindre ubehagelig.
// @match      http://dikusjov.dk/koncern-it/*
// @copyright  2014, Sebastian Paaske Tørholm
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

(function () {
	// Fjern det eksisterende stylesheet
	$('link').remove();
    
    // Fjern tvungne linjeskift
    $('br').remove();
    
    // Navngiv elementer
    $('h1:nth-of-type(1)').addClass('main-title');
    $('h1:nth-of-type(2)').addClass('secondary-title');
    $('.secondary-title + p').addClass('nav-menu');
    
    // Flyt titlen + menuen ind i sin egen boks
    $('.main-title').before('<div id="title-box" />');
    $('#title-box').nextUntil('.secondary-title').appendTo('#title-box');
    
    // Flyt author + titel sammen med nummer
    $('.comicbox p').appendTo('.secondary-title');
    $('.secondary-title p').before(" &ndash; ");
    
    // Flyt titel + navigation ind i comic-boksen
    $('.secondary-title').prependTo('.comicbox');
    $('.nav-menu').appendTo('.comicbox');
    
    // Centrér comic-boksen
    $('.comicbox').wrap('<div class="centerbox" />');
    
    // Fjern "..." fra frem/tilbage
    $('.nav-menu').contents().filter(function() {
    	return this.nodeType == 3; //Node.TEXT_NODE
  	}).remove();
    
    // Navngiv frem/tilbage-knapperne
    $('.nav-menu a:nth-child(1)').addClass('back-link');
    $('.nav-menu a:nth-child(2)').addClass('forward-link');
    
    // Put pile på frem/tilbage-knapperne
    $('.back-link').prepend("&laquo; ");
    $('.forward-link').append(" &raquo;");
   
   	var css = [
        "body { margin: 0; background-color: #E0FEE0 }",
        "#title-box { width: 100%; text-align: center; background-color: darkseagreen; padding: 0.5em 0;}",
        ".main-title {  margin: 0em; }",
        "p#menu { margin-top: 0.25em; margin-bottom: 0; }",
        ".secondary-title { margin: 0.25em; margin-left: 0.5em; padding: 0; }",
        ".secondary-title p { display: inline-block; margin: 0; }",
        ".comicbox { margin-left: 2em; display: inline-block; }",
        ".centerbox { text-align: center; width: 100%; }",
        ".back-link { float: left; }",
        ".forward-link { float: right; }",
        "a { text-decoration: none; }",
    ].join("\n");
    
    var b64css = btoa(css);
    
    $('head').append('<link type="text/css" rel="stylesheet" href="data:text/css;base64,' + b64css + '"/>');
})();