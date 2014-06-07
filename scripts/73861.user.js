// ==UserScript==
// @name           FC2 Design/Level to FullScreen button 
// @version        1.0.0
// @description    Adds the cool CountClockWiseWheel button to a design/level hyperlink that opens the contraption in the FC2.swf [FullScreen]
// @include        http//sparkworkz.com/forums/*
// @include        
// ==/UserScript==

var iconUrl = "http://fantasticcontraption.com/forum/images/smilies/ccw_wheel.png";

var makeLink = function(obj, url) {
    var link = document.createElement('a');
    var icon = document.createElement('img');
    icon.setAttribute('src', iconUrl);
    icon.setAttribute('alt', 'More information');
    icon.style.verticalAlign = 'middle';
    link.appendChild(icon);
    link.setAttribute('title', 'Fullscreen');
    link.setAttribute('href', url);
    var nextSibling = links[i].nextSibling;
    obj.parentNode.insertBefore(document.createTextNode(' '), nextSibling); // Add space
    obj.parentNode.insertBefore(link, nextSibling);
};

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (links[i].hasAttribute('href')) {
        var m;
        if (m = links[i].getAttribute('href').match(/^http:\/\/(www\.)?sparkworkz\.com/fc2\/(?!index.php?)[^\?]*\?designId=([0-9]+)$/i)) {
            makeLink(links[i], 'http://www.sparkworkz.com/fc2/game/Contraption.swf?designId='+m[2]);
        } else if (m = links[i].getAttribute('href').match(/^http:\/\/(www\.)?sparkworkz\.com/fc2\/(?!index.php?)[^\?]*\?levelId=([0-9]+)$/i)) {
            makeLink(links[i], 'http://www.sparkworkz.com/fc2/game/Contraption.swf?levelId='+m[2]);
        }
    }
} 