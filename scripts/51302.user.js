// ==UserScript==
// @name           XKCD - Show Mouse Overs On Page & Arrow Navigation
// @namespace      http://xkcd.com/
// @include        http://xkcd.com/*
// ==/UserScript==
(function() {
    var images = document.getElementsByTagName('img');
    var title = '';
    var theImage = null;
    for (var x = 0; x < images.length && !theImage; x++) {
        var src = images[x].getAttribute('src');
        if (src.indexOf('http://imgs.xkcd.com/comics/') >= 0) {
            theImage = images[x];
            title = theImage.getAttribute('title');
        }
    }
    var theParent = theImage.parentNode;
    
    var generatePageTitle = function() {    
        var url = String(window.location);
        var urlArray = url.split('/');
        var strComicNumber = null;
        for (var n = urlArray.length - 1; (n >= 0) && (strComicNumber == null); n--) {
            if (!isNaN(parseFloat(urlArray[n]))) {
                strComicNumber = urlArray[n];
            }
        }
        if (strComicNumber == null) {
            var searchString = 'Permanent link to this comic: http://xkcd.com/';
            var h3array = document.getElementsByTagName('h3');
            var searchIndex = -1;
            for (var n = 0; (n < h3array.length) && (searchIndex < 0); n++) {
                var innerHTML = h3array[n].innerHTML;
                searchIndex = innerHTML.indexOf(searchString);
                if (searchIndex >= 0) {
                    strComicNumber = innerHTML.substr(searchString.length,innerHTML.indexOf('/',searchString.length) - searchString.length);
                }
            }
        }
        
        if (strComicNumber != null) {
            var comicNumber = Number(strComicNumber);
            if (comicNumber < 10) {
                strComicNumber = '00' + strComicNumber;
            }
            else if (comicNumber < 100) {
                strComicNumber = '0' + strComicNumber;
            }
        }
        
        var middleContent = document.getElementById('middleContent');
        var h1 = null;
        try {
            h1 = middleContent.getElementsByTagName('h1')[0];
        }
        catch (err) {
            GM_log('Error finding title: ' + err.message);
            return;
        }
        
        document.title = strComicNumber + ' - xkcd - ' + h1.innerHTML;
    }
    generatePageTitle();
    
    theParent.insertBefore(document.createElement('br'),theImage.nextSibling);
    
    var titleDiv = document.createElement('div');
    titleDiv.innerHTML = title;
    titleDiv.style.width = '400px';
    titleDiv.style.border = '1px solid black';
    titleDiv.style.backgroundColor = 'lightblue';
    
    var center = document.createElement('center');
    center.appendChild(titleDiv);
    
    theParent.insertBefore(center,theImage.nextSibling);
    
    var anchors = document.getElementsByTagName('a');
    var prev = '';
    var next = '';
    for (var x = 0; x < anchors.length; x++) {
        var a = anchors[x];
        if (a.getAttribute('accesskey') == 'p') {
            prev = a.getAttribute('href');
        }
        else if (a.getAttribute('accesskey') == 'n') {
            next = a.getAttribute('href');
        }
    }
    
    document.addEventListener('keyup',function(e) {
        if (e.keyCode == 37) { //Prev (Left)
            if (prev.length > 0) {
                if (prev == '#') {
                    alert('No more before this one.');
                }
                else {
                    window.location = 'http://xkcd.com' + prev;
                }
            }
        }
        else if (e.keyCode == 39) { //Next (Right)
            if (next.length > 0) {
                if (next == '#') {
                    alert('No more after this one.');
                }
                else {
                    window.location = 'http://xkcd.com' + next;
                }
            }
        }
    },false);
})();