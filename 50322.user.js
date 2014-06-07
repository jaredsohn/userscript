// ==UserScript==
// @name           Add links to Fantastic Contraption Resource
// @version        0.0.1
// @description    Level/design links in the FantasticContraption.com forum will get an icon next to them that will link to their respective pages on the Fantastic Contraption Resource website. Borrowed heavily from the sk89q scripts.
// @include        http://fantasticcontraption.com/forum/*
// @include        http://*.fantasticcontraption.com/forum/*
// ==/UserScript==

var iconUrl = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6ElEQVR4nG3TO4vUWRAF8F/d7hkfs4wI6iAOOKIi4isw00RBhA3Uz2Bg4tcwNDIUDDZRZLN1EQwEUXMfqOALTRR19j+DjE+c6VsG/Z+etteCk9yqU+dU3XsZifrC8WxczcZ/2fjeYiEb/9bnTvYe6Y5yQO+RqWxcy8a3bGTOyZxvMSezkdlYysb13gMbl3kB9YmJmHINRzNEvgn5El+iXzWRYhtla5LgTn3rROeAhYBsXMSZJOqN4GWhjlgMbE/lzypI4VK+d7ZTXzkSq5xXjNW7weOyQhgGzIVcpMwI7Ndxu8Sk01ids3hYVorpu/jRYqltdD/kLBiLNc52caq//aA3pNYj9lZxIBknP5C3Ct9CPg0xlVQHu5gQfXsDcmKmimM5OIr11G6V1wuzQUmqDWVgNy1vmErZlWJknLITk7+sthR8l8RMe0U9jCdbhhpmO9qy3IZBbr6Lhzhc9qX8o8enYDrFkFLOk2+wGQvYXvtCvO7mossx5hAitiFyRXk5fpC3O6xJZojpQebvYtFfrYsVu6PxNfrX+DnEusFi7+cHV/pP+Z09MeYmpvz6ErR5XgdrMU5szbc6TpZp9wbF2diBf7D7d03EwN2znHOi7PLifzXZmMzGufYrL2WjN4SP2bhQn9s0zPkJMTzgbHVivikAAAAASUVORK5CYII=";

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
        if (m = links[i].getAttribute('href').match(/^http:\/\/(www\.)?fantasticcontraption\.com\/(?!flash.php)[^\?]*\?designId=([0-9]+)$/i)) {
            makeLink(links[i], 'http://fantasticcontraption.com/flash.php?designId='+m[2]);
        } else if (m = links[i].getAttribute('href').match(/^http:\/\/(www\.)?fantasticcontraption\.com\/(?!flash.php)[^\?]*\?levelId=([0-9]+)$/i)) {
            makeLink(links[i], 'http://fantasticcontraption.com/flash.php?levelId='+m[2]);
        }
    }
}