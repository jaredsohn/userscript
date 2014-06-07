// ==UserScript==
// @name       teamfortress.tv frag filter
// @namespace  http://github.com/dy-dx
// @version    0.1.2
// @description  Hides posts below a specified fragcount threshold.
// @match      http://teamfortress.tv/forum/thread/*
// @copyright  2012+, dy/dx
// ==/UserScript==

// hide posts below or equal to this threshold:
var fragThreshold = -10;


GM_addStyle('.fragged > div:not(.post-header) { display: none; }'
            + '.post-header { position: relative; }'
            + '.fragged-text { width: 100px; position: absolute; top: 9px; left: -moz-calc(50% - 50px); left: -webkit-calc(50% - 50px); left: calc(50% - 50px); text-align: center; color: #E63B35; font-weight: bold; }');

function toggleFragged (post) {
    // check if param is a mouse event or dom element
    if (!post.nodeType) {
        // return if a child node (they're all spans) was clicked instead of the post-header div or fragged-text div.
        if (post.target.tagName !== 'DIV') { return false; }
        post = this.parentNode;
    }
    post.classList.toggle('fragged');
}

// loop through posts and check the frag values
var posts = document.getElementsByClassName('post');
for (var i = 0, post; post = posts[i]; ++i) {
    var fragValueText = post.getElementsByClassName('frag-count')[0].textContent;
    var fragValue = parseInt(fragValueText.replace('–', '-'), 10);
    if (fragValue <= fragThreshold) {
        toggleFragged(post);
        
        var postHeader = post.getElementsByClassName('post-header')[0];

        // Add click listener to post header
        postHeader.addEventListener('click', toggleFragged, false);
        
        // Insert "Fragged" div element into post header
        var fraggedText = document.createElement('div');
        fraggedText.innerHTML = 'Fragged';
        fraggedText.className = 'fragged-text';
        postHeader.insertBefore(fraggedText, null);
    }
}