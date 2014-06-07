// ==UserScript==
// @name        Blokuj gorące
// @namespace   Marmite Script
// @description Niezoptymalizowane, napisane na szybko blokowanie gorących dyskusji
// @include     http://*wykop.pl/ludzie/czarne-listy*
// @include     http://*wykop.pl/mikroblog*
// @include     http://*wykop.pl/wpis*
// @include     http://*wykop.pl/mikroblog/hot*
// @version     1.2
// @run-at      document-end 
// ==/UserScript==

var blockHot = function blockHot(hotPage) {
    "use strict";
    var blNicks,
        blTags,
	nick,
        content,
        i,
        j,
        k,
	maxHots,
        maxBlNicks,
        maxBlTags,
        hots,
        tags;

    hotPage = (typeof hotPage === 'boolean') ? hotPage : false;

    blNicks = localStorage.getItem('blNicks');
    blTags = localStorage.getItem('blTags');

    if (blNicks === null) {
        blNicks = [];
    } else {
        blNicks = blNicks.split(',');
    }

    if (blTags === null) {
        blTags = [];
    } else {
        blTags = blTags.split(',');
    }

    if (blNicks.length === 0 && blTags.length === 0) {
        return;
    }

    maxBlNicks = blNicks.length;
    maxBlTags = blTags.length;

    if (hotPage) {
        hots = document.querySelectorAll('#activities-stream li.rel');
    } else {
        hots = document.querySelectorAll('article.pding10_0');
    }

    maxHots = hots.length;

    for (i = 0; i < maxHots; i += 1) {
        try {
            if (hotPage) {
                nick = hots[i].querySelector('strong.fbold').textContent;
            } else {
                nick = hots[i].querySelector('span.hvline').textContent;
            }
            content = hots[i].querySelector('p').textContent;
            tags = content.match(/#\w+/g);

            for (j = 0; j < maxBlNicks; j += 1) {
                if (nick === blNicks[j]) {
                    if (hotPage) {
                        hots[i].style.display = 'none';
                    } else {
                        hots[i].parentNode.style.display = 'none';
                    }
                    throw new Error();
                }
            }

            for (j = 0; j < tags.length; j += 1) {
                for (k = 0; k < maxBlTags; k += 1) {
                    if (tags[j] === blTags[k]) {
                        if (hotPage) {
                            hots[i].style.display = 'none';
                        } else {
                            hots[i].parentNode.style.display = 'none';
                        }
                        throw new Error();
                    }
                }
            }
        } catch (e) {
          //nie ma bledu, taka tam mala proba podkrecenia szybkosci ;)
        }
    }
};

var setBl = function setBl() {
    "use strict";
    var maxBlNicks,
        maxBlTags,
        nicks = [],
        tags = [],
        blNicks,
        blTags,
        bl,
        i,
        item;

    if (localStorage.getItem('blNicks')) {
        localStorage.removeItem('blNick');
    }

    if (localStorage.getItem('blTags')) {
        localStorage.removeItem('blTags');
    }

    bl = document.querySelectorAll('ul.peoplewall');
    blNicks = bl[0].querySelectorAll('li');
    blTags = bl[1].querySelectorAll('li');

    maxBlNicks = blNicks.length;
    maxBlTags = blTags.length;

    for (i = 0; i < maxBlNicks; i += 1) {
        item = blNicks[i].firstElementChild.firstChild.textContent;
        nicks.push(item);
    }

    for (i = 0; i < maxBlTags; i += 1) {
        item = blTags[i].firstElementChild.firstChild.textContent;
        tags.push(item);
    }

    localStorage.setItem('blNicks', nicks);
    localStorage.setItem('blTags', tags);

    return;
};


var script = document.createElement('script');
if (document.location.href.indexOf('czarne-listy') !== -1) {
    script.textContent = setBl.toString() + '; setBl()';
}
else {
    script.textContent = blockHot.toString();
    if (document.location.href.indexOf('mikroblog/hot') !== -1) {
        script.textContent += '; blockHot(true)';
    }

    script.textContent += '; blockHot()';
}

document.body.appendChild(script);
