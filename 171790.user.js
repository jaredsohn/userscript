// ==UserScript==
// @name       Github Fluid (100% width)
// @namespace  http://dirkraft.github.io/
// @version    0.1
// @description  Type '+' (which requires shift) to hide vertical tablature and expand the layout to 100%. Type '-' to revert the layout and show vertical tablature again.
// @match      http*://github.com/*
// @copyright  2013+, Jason Dunkelberger (dirkraft)
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(function() {
    $(document).keypress(function(jqEvent) {
        if ("+".charCodeAt(0) == jqEvent.which) {

            // for repository pages
            $('.repository-sidebar').hide();
            $('.container:has(#js-repo-pjax-container)').css('width', '97.5%');
            
            // for issues pages
            $('.discussion-sidebar').hide();
            $('.discussion-timeline').css('width', 'auto');

            // star of the show
            $('#js-repo-pjax-container').css('width', 'auto');
            
        } else if ("-".charCodeAt(0) == jqEvent.which) {

            // for repository pages
            $('.repository-sidebar').show();
            $('#js-repo-pjax-container').css('width', '');

            // for issues pages
            $('.discussion-sidebar').show();
            $('.discussion-timeline').css('width', '');

            // star of the show
            $('.container:has(#js-repo-pjax-container)').css('width', '');
        }
    });
});