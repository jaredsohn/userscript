// ==UserScript==
// @name          SkepticalHatchet
// @namespace     enm
// @author        ENM
// @version       0.5.1
// @description   Removes unwanted comment authors from Skeptical OB.
// @run-at        document-end
// @license       Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)
// @match         http://skepticalob.blogspot.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Load the block list from greasemonkey storage.
var blockList = JSON.parse(GM_getValue('blockList', '{"authors" : []}'));
if (!blockList) {
    blockList = {"authors" : []};
}

// Adds an author to the block list.
function blockAuthor(ev) {
    ev.preventDefault();
    blockList.authors.push(ev.data.author);
    $(ev.data.parent).hide();
    GM_setValue("blockList", JSON.stringify(blockList));
    
    window.location.reload();
};

// Removes an author from the block list.
function unblockAuthor(ev) {
    ev.preventDefault();
    var index = -1;
    for (var ii = 0; ii < blockList.authors.length; ii++) {
        if (blockList.authors[ii].indexOf(ev.data.author) != -1) {
            index = ii;
            break;
        }
    }
    
    if (index >= 0) {
        blockList.authors.splice(index, 1);
        GM_setValue("blockList", JSON.stringify(blockList));
    }
    window.location.reload();
};

// Blocks comments from unwanted authors, and adds links to allow for
// (un)blocking of authors.
function blockComments() {
    
    // Expand all comments in the page so we don't miss any hidden ones.
    $("div.js-kit-replies-expand-label").click();
    
    // Look at every comment, to block or allow future blocking.
    $("span.js-singleCommentName").not(".skepticalHatchet-processed").each(function() {
        $(this).addClass('skepticalHatchet-processed');
        
        var author = this.innerHTML;
        var blocked = false;
        for (var ii = 0; ii < blockList.authors.length; ii++) {
            if (author.indexOf(blockList.authors[ii]) != -1) {
                // This author has been blocked.
                blocked = true;
                break;
            }
        }
        
        var d = document.createElement('div');
        var a = document.createElement('a');
        a.setAttribute('href', 'javascript:;');
        if (blocked) {
            // This author has been blocked. Provide a link to unblock the author.
            var p = this.parentNode.parentNode.parentNode.parentNode;
            $(p).hide();
            var atext = document.createTextNode('Unblock ' + author);
            a.appendChild(atext);
            d.appendChild(a);
            p.parentNode.appendChild(d);
            $(a).bind('click', {author : author}, unblockAuthor);
            $(a).addClass('skepticalHatchet');
        } else {
            // This author has NOT been blocked. Provide a link to block the author.
            var atext = document.createTextNode('Block Author');
            a.appendChild(atext);
            d.appendChild(a);
            this.appendChild(d);
            var p = this.parentNode.parentNode.parentNode.parentNode;
            $(a).bind('click', {author : author, parent : p}, blockAuthor);
            $(a).addClass('skepticalHatchet');
        }
    });

    // Trigger another run in ten seconds, to catch any auto-refreshes.
    setTimeout(blockComments, 10000);
}

// In Chrome/Tampermonkey, this seems to run before the comments are loaded, so a 5s delay is there to catch them.
setTimeout(blockComments, 5000);
