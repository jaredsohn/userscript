// ==UserScript==
// @name       GitHub Changeset Viewer
// @namespace  http://kripet.us/
// @version    0.1
// @description  Adds Compare links to groups of commits on a GitHub Pull Request, so you can see a later batches of changes independent of the whole PR.
// @match      *://github.com/*/pull/*
// @copyright  2013+, Kristján Pétursson
// ==/UserScript==

// This script relies on GitHub already having loaded jQuery.

function addCompareLink() {
    var changeSet = $(this);

    var shas = changeSet.find('.commit-meta code a');
    var base = $(shas.get(0)).text();
    var head = $(shas.get(shas.length - 1)).text();
    
    var compare = $('<a>', {
        href: '../compare/' + base + '^...' + head,
        target: '_blank',
        style: 'color: #4183C4; margin: 10px;'
    }).text('Compare');
    
    var header = changeSet
    	.closest('.comment-content')
	    .siblings('.comment-header')
	    .children('.comment-header-right');
    
    header.prepend(compare);
}


function addCompareLinks() {
    var changeSets = $('.comment-content .commits');
    changeSets.each(addCompareLink);
}

$(addCompareLinks);