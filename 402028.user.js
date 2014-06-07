// ==UserScript==
// @name       LGM Comment Browser
// @namespace  http://niko.cat/
// @version    0.1
// @description  Browse nested LGM comments chronologically
// @match      http://www.lawyersgunsmoneyblog.com/*
// @copyright  2014+, You
// ==/UserScript==

var comments = jQuery('li.comment');

// ids are formatted as 'comment-<id>'
function parseId(id) {
    return parseInt(id.substring(8));
}

var ids = comments.map(function() { return parseId(this.id); }).get();
var sortedIds = ids.slice();
sortedIds.sort(function(a, b) { return a - b; });
var sortedPos = {};
for (var i = 0; i < sortedIds.length; ++i) {
    sortedPos[sortedIds[i]] = i;
}

var hoverbox = jQuery('<span id="hoverbox" style="position:relative; float:right">' +
                      '<span style="position:absolute">' +
                      '\xa0<a class="prev-link" href="#">☜︎</a>' + 
                      '\xa0<a class="up-link" href="#">☝︎︎</a>' + 
                      '\xa0<a class="next-link" href="#">☞︎︎</a>' +
                      '</span>' +
                      '</span>');

function hover() {
    jQuery('#hoverbox').remove();
    var body = jQuery(this).closest('.comment-body');
    var chain = jQuery(this).parents('li.comment');
    var comment = chain.first();
    var depth = chain.length;
    var id = parseId(comment[0].id);
    var index = sortedPos[id];
    var prev = sortedIds[((index == 0) ? (sortedIds.length) : (index)) - 1];
    var next = sortedIds[(index + 1) % sortedIds.length];
    var up = comment.parent().closest('li.comment');
    up = (up.length) ? parseId(up[0].id) : id;
    jQuery(hoverbox)
    .children().css('right', ((7 - depth) * 16) + 'px').end()
    .find('a.prev-link').attr('href', '#comment-' + prev).end()
    .find('a.up-link').attr('href', '#comment-' + up).end()
    .find('a.next-link').attr('href', '#comment-' + next).end();    
    body.find('div.comment-author').append(hoverbox);
}

function unhover() {
    jQuery('#hoverbox').remove();
}

jQuery(document).delegate('.comment-body', 'mouseenter', hover);
jQuery(document).delegate('.comment-body', 'mouseleave', unhover);
