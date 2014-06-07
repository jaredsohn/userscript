// ==UserScript==

// @name           /b/ Numbers !

// @description    Replace the XX in the post numbers

// @include        http://boards.4chan.org/b/*




// ==/UserScript==

    String.prototype.startsWith = function (str)
    { return (this.match("^" + str) == str) }

    var regex = new RegExp(/\d{6}XXX/);
    var links = document.getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--) {
        if (regex.test(links[i].innerHTML)) {
            if (links[i].href.startsWith('javascript')) 
            {
                links[i].innerHTML = links[i].href.substring(links[i].href.length - 11, links[i].href.length - 2);
            }
            else links[i].innerHTML = links[i].href.substring(links[i].href.length - 9);
        }
    }