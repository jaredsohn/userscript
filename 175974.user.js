// ==UserScript==
// @name       Better Autocards
// @namespace  http://userscripts.org/users/497853
// @version    1.3
// @description  Replaces Gatherer autocards with magiccards.info scans
// @match      http://community.wizards.com/go/thread/view/*
// @match      http://community.wizards.com/go/post/reply/*
// @copyright  2013+, Glasir
// @grant      GM_xmlhttpRequest
// ==/UserScript==

(function() {
    
    function getCardNameFromLink(link) {
        var paramList = link.split('?')[1].split('&');
        for (var i = 0; i < paramList.length; ++i) {
            var nameVal = paramList[i].split('=');
            if (nameVal[0] === 'name') {
                // Found the name parameter. Normalize it: lower-case, and replace urlencoded spaces with normal ones.
                var name = nameVal[1];
                while (name.indexOf('%20') > -1) {
                    name = name.replace('%20', ' ');
                }
                return name.toLowerCase();
            }
        }
    }
    
    function getCardPathFromLink(link) {
        var setInfo = link.getAttribute('href');
        
        // magiccards.info card pages are of the form  magiccards.info/[set]/[language]/[collector number].html
        // magiccards.info card images are of the form magiccards.info/[language]/[set]/[collector number].jpg
        // switch the parts around.
        var parts = setInfo.split('/'),			// looks like ["", "set", "language", "collectornum.html"]
            cardPath = parts[2] + '/' + parts[1] + '/' + (parts[3].split('.')[0]) + '.jpg';
        
        return cardPath;
    }
    
    function getMagiccardsImgLink(page, cardname) {
        var imgs = page.getElementsByTagName('img');
        for (var i = 0; i < imgs.length; ++i) {
            if (imgs[i].src.indexOf('scans') > -1) {
                return imgs[i].src;
            }
        }
        
        // OK, didn't find an image with 'scans' in the src link.
        // That means that there were multiple results from the query (example: "Sleep", "Addle").
        var links = page.getElementsByTagName('a');
        for (var i = 0; i < links.length; ++i) {
            if (links[i].innerHTML.toLowerCase() === cardname.toLowerCase()) {
                var cardPath = getCardPathFromLink(links[i]);
                return 'http://magiccards.info/scans/' + cardPath;
            }
        }
        
        // If we get here, something went wrong, and I don't know why.
        // Return nothing, so the img src doesn't get overwritten.
        //console.log('uh oh, failed to find page for normal card ' + cardname);
    }
    
    function getSplitCardImgLink(page, cardname) {
        var sides = cardname.toLowerCase().split(' // '),
            links = page.getElementsByTagName('a');
        
        for (var i = 0; i < links.length; ++i) {
            var linkText = links[i].innerHTML.toLowerCase();
            if (linkText.indexOf('/') > -1 && linkText.indexOf(sides[0]) > -1 && linkText.indexOf(sides[1]) > -1) {
                // Found a link with a slash and both parts of the card name in it.
                // It's probably the right link!
                var cardPath = getCardPathFromLink(links[i]);
                return 'http://magiccards.info/scans/' + cardPath;
            }
        }
        
        //console.log('uh oh, failed to find page for split card ' + cardname);
    }
    
    function fixAutocard(img, cardname) {
        var queryStr = cardname,
            parser = getMagiccardsImgLink,
            split = false;
        
        if (cardname.indexOf(' // ') > -1) {
            // This is a split card; the Gatherer search link looks like, e.g., "Life%20//%20Death"
            // magiccards.info doesn't like that, so search for "Life Death" instead
            var sides = cardname.split(' // ');
            queryStr = sides[0] + ' ' + sides[1];
            parser = getSplitCardImgLink;
            split = true;
        }
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://magiccards.info/query?v=olist&s=cname&q=' + queryStr,
            onload: function(response) {
                var responseXML = document.implementation.createHTMLDocument('');
                responseXML.documentElement.innerHTML = response.responseText;
                var magiccardsImg = parser(responseXML, cardname);
                if (magiccardsImg) {
                    // console.log('Rewriting src image for '  + cardname + ' to ' + magiccardsImg);
                    img.src = magiccardsImg;
                }
                
                // rotate split card images
                if (split) {
                    img.setAttribute('style', '-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); transform: rotate(90deg);');
                }
            }
        });
    }
    
    function fixAutocards() {
        var autocards = document.getElementsByClassName('linkCardHoverImage');
        for (var i = 0; i < autocards.length; ++i) {
            var img = autocards[i].children[0];
            var cardname = getCardNameFromLink(img.src);
            fixAutocard(img, cardname);
        }
    }
    
    fixAutocards();
})();
