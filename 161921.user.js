// ==UserScript==
// @name         udbala
// @namespace    https://bitbucket.org/mgsk/udbala
// @version      314
// @description  UDBALA ONLY NAME NEED
// @include      http://*.quora.com/*
// @include      https://*.quora.com/*
// @copyright    Udbala Bhatnagar
// @require https://raw.github.com/brandonaaron/livequery/master/jquery.livequery.js
// ==/UserScript==

$('a.user').livequery(
    function () {
        $('a.user').text('Udbala Bhatnagar')
            .css('visibility', 'visible');
    });

// To prevent one accidentally seeing such heinous names as Joshua Engel,
// et al. before ye can banish them to the depths of hell, herein known
// to be roughly in the direction of the Southern Pansies
// of Englande; the author has taken such precautions in Stylesheets Cascading
// to make that which is visible not visible; and therefore after such 
// necessary changes as have beene conveyede, make that which is not visible
// visible: therein freeing thy Gentle Beinge of that which thou ought not
// be disturbed and poisoned; that is to say, that which thy Kind Author
// has taken steps to prevente.
$('a.user').text('Udbala Bhatnagar')
    .css('visibility', 'visible');
