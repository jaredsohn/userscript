// ==UserScript==
// @name        LT Sort Author Works - LibraryThing
// @namespace   http://userscripts.org/users/brightcopy
// @description Add sorting to works on author pages.
// @include     http*://www.librarything.com/author/*
// @version     2
// ==/UserScript==

var lists = document.body.getElementsByClassName('worklist');
var DEFAULT_IGNORE = 'a,an,the';
var ignoreWords = GM_getValue('ltSortAuthorIgnore', DEFAULT_IGNORE).replace(/ +/, '').split(',');

function a(href, onclick, text, node) {
    d(node.firstChild);
    var e = document.createElement('a');
    e.setAttribute('href', href);
    e.appendChild(document.createTextNode(text));
    node.insertBefore(e, node.firstChild);
    e.addEventListener('click', onclick.bind(this, e));

    return e;
}

function d(node) {
    node.parentNode.insertBefore(document.createTextNode(' | '), node);
}

for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
    if (list.className.split(' ').indexOf('have') === -1) {
        var ul = list.getElementsByTagName('ul')[0];

        var e = list.previousSibling;
        while (e !== null && e.className !== 'workSimpleHead') {
            e = e.previousSibling;
        }

        var r = e.getElementsByClassName('r')[0];
        r.style.width = 'auto';

        a('#sortbytitle', sortWorks.bind(this, ul, sortByTitle), 'sort by title', r);
        a('#sortbycopies', sortWorks.bind(this, ul, sortByCopies), 'sort by copies', r).style.fontWeight = 'bold';
    }
}

function sortByCopies(obj1, obj2) {
    if (obj1.copies > obj2.copies) {
        return -1;
    }
    else if (obj1.copies < obj2.copies) {
        return 1;
    }
    else if (obj1.title !== obj2.title) {
        return sortByTitle(obj1, obj2);
    }
    else {
        return 0;
    }
}

function sortByTitle(obj1, obj2) {
    var cmp = obj1.title.localeCompare(obj2.title);

    if (cmp === 0) {
        return sortByCopies(obj1, obj2);
    }
    else {
        return cmp;
    }
}

var decimal = 0.1.toLocaleString()[1];
var comma = decimal === ',' ? '.' : ',';
var numRE = new RegExp('(\\d),(\\d\\d)(?=\\d)', 'g');

function processTitle(title) {
    var titleWords = title.replace(/ +/g, ' ').split(' ');
    var i = 0;
    while (i < titleWords.length) {
        titleWords[i] = titleWords[i].toLocaleLowerCase();
        if (i === 0 && ignoreWords.indexOf(titleWords[i]) !== -1) {
            titleWords.splice(i, 1);
        }
        else {
            var num = Number(titleWords[i].replace(numRE, '$1$2'));
            if (!isNaN(num)) {
                titleWords[i] = ('000000000' + num).slice(-10);
            }
            i++;
        }
    }

    return titleWords.join(' ');
}

function sortWorks(ul, fn, link, evt) {
    if (link.style.fontWeight !== 'bold') {
        var items = [];

        var elems = ul.getElementsByTagName('li');

        for (var i = 0; i < elems.length; i++) {
            var node = elems[i];
            items.push({
                node:node,
                title:processTitle(node.getElementsByTagName('a')[0].getAttribute('title')),
                copies:Number(node.getElementsByTagName('span')[0].textContent.split(" ")[0].replace(',', ''))
            });
        }

        var links = link.parentNode.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            if (links[i].style.fontWeight === 'bold') {
                links[i].style.fontWeight = '';
            }
        }
        link.style.fontWeight = 'bold';

        items.sort(fn);

        var html = '';
        items.forEach(function (item) {
            html += item.node.outerHTML;
        });

        var elems = ul.getElementsByClassName('showmore_showlink');
        if (elems.length === 1) {
            html += elems[0].outerHTML;
        }

        ul.innerHTML = html;
    }

    evt.preventDefault();
}

GM_registerMenuCommand('Leading title words to ignore', function() {
    ignoreWords = prompt('Enter the list of initial words to ignore, separated by commas.', ignoreWords.join(',')).replace(/ +/, '').toLocaleLowerCase().split(',');
    GM_setValue('ltSortAuthorIgnore', ignoreWords.join(','));
});
