// ==UserScript==
// @name           Super rapid8 downloader
// @namespace      http://userscripts.org/scripts/show/149997
// @author         EulerIntegral
// @description    When you open a url to download (extabit for example) it automatically copy it's url and put on rapid8 for you.
// @version        1.0
//
// @match          http://rapid8.com/*
// @match          http://rapid8.com
//
// @match          http://extabit.com/file/*
// @match          http://filepost.com/files/*
// @match          http://rapidgator.net/file/*
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==


var pageURL = window.location.href;

var sitesRegExp = /http:\/\/extabit.com\/file\/.*|http:\/\/filepost.com\/files\/.*|http:\/\/rapidgator.net\/file\/.*/gi;

var form;
if (pageURL.match(sitesRegExp) && pageURL.match(/http/g).length == 1) {
    window.location.href = 'http://rapid8.com#' + window.location.href;
    
} else if (pageURL.match(/http:\/\/rapid8.com\/#/)) { // Stage 1
    window.onbeforeunload=null;
    window.onunload=null;
    
    pageURL = pageURL.split('#')[1];
    
    form = $('#dlform'); // The link form
    form.find('marquee').detach(); // Delete the favicons on the search box, they are anoying
    form.find('#address_box').eq(0).attr('value', pageURL); // Put the URL into the search box
    form.css({'max-width':'460px', 'margin':'10px auto', 'display':'table'});
    
    $('body').children().detach();
    $('body').append(form);
    
    form.attr('action', form.attr('action') + '#' + pageURL); // Add the link url to be passed to stage 2
    
    form.find('#go').click(); // Click download button 
    
} else { // Stage 2    
    window.onbeforeunload=null;
    window.onunload=null;
    
    pageURL = pageURL.split('#')[1];
    
    // Need a better way to use this function
    el = document.createElement('script');
    el.innerHTML = 'inputDLURL();';
    document.body.appendChild(el);
    
    form = $('#loadlngarea'); // The download button
    form.children().not('form').detach(); // Delete the useless text
    form.append('<a href="' + pageURL + '">' + pageURL + '<\a>');
    form.css({'max-width':'460px', 'margin':'10px auto', 'display':'table'});
    
    $('body').children().detach();
    $('body').append(form); 
};