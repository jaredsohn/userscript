// ==UserScript==
// @name           4chan Post Number Restorer
// @namespace      http://turnor.co.uk/scripts/
// @description    Fixes the XXX at the end of the post numbers on 4chan.
// @include        http://boards.4chan.org/*
// ==/UserScript==

(function() {
    
    String.prototype.contains = function(str) {
        return this.indexOf(str) > -1;
    }
    
    var fixPostNumbers = function(root) {
    
        var xpathResult = document.evaluate(
            '//a[@class="quotejs"][contains(., "XXX")]',
            root,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        
        for (var i=0; i<xpathResult.snapshotLength; i++) {
            var node = xpathResult.snapshotItem(i);
            var href = node.getAttribute('href');
            
            var start, end;
            
            if(href.contains('#q')) {
                start = href.indexOf('#q') + 2;
                end   = href.length;
            } else if(href.contains('javascript:')) {
                start = 18;
                end = href.length - 2;
            } else {
                // Shrug
                continue;
            }
            
            node.innerHTML = href.substring(start, end);
        }
    
    }
    
    // Initial fixing.
    fixPostNumbers(document);
    
    // Make sure it plays nicely with the 4chan Firefox extension et al.
    document.addEventListener('DOMNodeInserted', function(e) {
        fixPostNumbers(e.target);
    }, false);
    
})();
