// ==UserScript==
// @name       IntelliSearch Jira URLs in Flowdock
// @namespace  intellisearch
// @version    0.2
// @description  Monitors the page for patterns of text matching issue keys in Jira and creates URLs from them.
// @include https://www.flowdock.com/app/*
// @copyright  IntelliSearch AS
// ==/UserScript==

(function() {

    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    var jiraUrl = 'http://jira.intellisearch.com';
    
    var pattern = /([a-z]+)-([0-9]+)/gi; // The pattern to match Jira issue keys, e.g: ABC-123, TEST-456, etc.
    var replacement = "<a href=\"" + jiraUrl + "/browse/$1-$2\" title=\"Open $1-$2 in Jira\" target=\"_blank\">$1-$2</a>"; // The replacement text
    var splitPattern = /\<a.+?\<\/a\>/gim; // The pattern to split the text by - should split hyperlinks by default as they should not be tampered with
    
    var modifyLinks = function() {
        // Grab all elements on the page that are div#chat (main flow or 1-on-1) and div.inbox-panel.single (context)
        // Then find all div.content and div.excerpt child elements that are not .tampered
        // Then return only those that return true for the pattern match
        var $els = $('div#chat,div.inbox-panel.single').find('div.content:not(.tampered):not(:has(.attachment,.file)),div.excerpt:not(.tampered)').filter(function(){ return pattern.test(this.innerText); });
        // Loop through these elements
        $els.each( function() {
            var $this = $(this);
            // Get the HTML
            var html = $this.html();
            // Split the HTML in to segments, default split is by hyperlinks (should not replace text within any pre-generated hyperlinks)
            var segments = html.split(splitPattern);
            // Loop through these segments
            for(var i in segments) {
                // If segment is not at least 3 characters, it probably isn't a match
                if(segments[i].length <= 3) { continue; }
                // Make a replacement pattern from the segment text
                var segmentPattern = new RegExp(escapeRegExp(segments[i]), 'g');
                // Replace text in the segment according to the original pattern rule
                var segmentReplacement = segments[i].replace(pattern, replacement);
                // Replace matches against the segment pattern in the HTML with the replacement text
                html = html.replace(segmentPattern, segmentReplacement);
            }
            // Updates HTML on the element
            $this.html(html);
            // Mark this element as tampered (will not be selected on next run)
			$this.addClass('tampered');
        });
        // Run this again in 5 seconds
        setTimeout(function() { modifyLinks(); }, 5000);
    };
    
    modifyLinks();
    
})();