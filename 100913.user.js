// ==UserScript==
// @name           LibraryThing Work Editions Grid
// @namespace      http://userscripts.org/users/brightcopy
// @description    Changes the editions display on the work pages to a sortable grid.
// @include        http*://*.librarything.tld/combine.php?author=*
// @include        http*://*.librarything.tld/work/*/editions*
// @license        Public Domain
// @version        2
// ==/UserScript==

// start: translate only this section
var TRANSLATE_TITLE = 'Title';
var TRANSLATE_AUTHOR = 'Author';
var TRANSLATE_ISBN = 'ISBN';
var TRANSLATE_NUMBER = '#';
var TRANSLATE_MULTI_SORT_HINT = 'Click to allow sorting on multiple columns';
// end: translate only this section

var SORT_ASCENDING = 0;
var SORT_DESCENDING = 1;

// ISBN of this book
var bookISBN;
try {
    bookISBN = document.body.getElementsByClassName('Z3988')[0].getAttribute('title').match(/rft\.isbn=([^&]+)/)[1];
} catch (e) {}

// creates an editionsDiv table
var editionsDiv = document.getElementById('editions');
var workSimpleHead = document.evaluate('//table[@class="workSimpleHead"]//tr', document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
var gridDiv = document.getElementById('ltwegMain');
var byAuthorDiv = document.getElementById('ltwegAuthor');
var byTitleDiv = document.getElementById('ltwegTitle');
var groupedDiv = document.getElementById('ltwegGrouped');

var editionsList = [];
var tableBodyDiv;

var FIELD_TITLE = 0;
var FIELD_AUTHOR = 1;
var FIELD_ISBN = 2;
var FIELD_COPIES = 3;

var fields = [
    // translate: if translating, translate only the "label" value to your language
    {name:"Title", label:TRANSLATE_TITLE, direction:SORT_ASCENDING, sortField:"ntitle"},
    {name:"Author", label:TRANSLATE_AUTHOR, direction:SORT_ASCENDING, sortField:"nauthor"},
    {name:"ISBN", label:TRANSLATE_ISBN, direction:SORT_ASCENDING, sortField:"nISBN"},
    {name:"Copies", label:TRANSLATE_NUMBER, direction:SORT_DESCENDING, sortField:"Copies"}
];

var sorts = [
    FIELD_COPIES,
    FIELD_TITLE,
    FIELD_AUTHOR,
    FIELD_ISBN
];

var multisort;

function setEditionStyles() {
    GM_addStyle('.ltwegHeader { text-align:left; border-bottom: 1px solid black; }');

    GM_addStyle('#ltwegEditionsTable td, #ltwegEditionsTable th { padding-left:1em; text-indent:-1em; padding-right: 1em }');
    GM_addStyle('#ltwegEditionsTable.multisort td, #ltwegEditionsTable th { padding-left:1em; text-indent:-1em; padding-right: 1em }');

    GM_addStyle('.ltwegCopies { min-width:20px }');

    GM_addStyle('.ltwegDup { color:#999999 }');
    GM_addStyle('.ltwegRow5 { border-bottom:1px solid #B0B0B0 }');

    GM_addStyle('#ltwegHeaderMultisort { text-align:center } ');

    GM_addStyle('#ltwegHeaderMultisortLink { display:inline-block; width:16px; height:16px; vertical-align:middle; ' +
        'background:url("http://www.librarything.com/pics/c.png") no-repeat scroll -102px 0px transparent; }');

    GM_addStyle('.ltwegMultisortChecked { background-position:-119px 0px !important }');

    GM_addStyle('.ltwegSeparate { display:inline-block; width:20px; height:16px; vertical-align:middle; ' +
        'background:url("http://www.librarything.com/pics/c.png") no-repeat scroll -21px -180px transparent; }');

    GM_addStyle('#ltwegHeaderBody td a:visited, #ltwegHeaderBody a:link { color:black !important }');
    GM_addStyle('#ltwegHeaderBody td.ltwegDup a:visited, #ltwegHeaderBody td.ltwegDup a:link { color:#999999 !important }');

    GM_addStyle('#ltwegEditionsTable tr.selected { background: #AF9 }');
}

function parseEditons() {
    var copiesRE = /^\((?:<span[^>]+>)?(\d*).+ onclick="[^\(]+\((\d+), *(\d+)\)/;
    var nameAuthorISBN = /^(.+) \/ (.+) \(ISBN (.+)\) *$/;
    var nameAuthor = /^(.+) \/ (.+) *$/;
    var nameISBN = /^(.+) \(ISBN (.+)\) *$/;

    for (i = 0; i < editionsDiv.childNodes.length - 2; i += 3) {
        var text = editionsDiv.childNodes[i].textContent;

        var matches;
        var title = '';
        var author = '';
        var ISBN = '';

        matches = copiesRE.exec(editionsDiv.childNodes[i + 1].innerHTML);

        if (!matches) {
            continue;
        }

        var copies = Number(matches[1]) || 0;
        var separate = [matches[2], matches[3]];

        if (matches = nameAuthorISBN.exec(text)) {
            title = matches[1];
            author = matches[2];
            ISBN = matches[3];
        }
        else if (matches = nameAuthor.exec(text)) {
            title = matches[1];
            author = matches[2];
        }
        else if (matches = nameISBN.exec(text)) {
            title = matches[1];
            ISBN = matches[2];
        }
        else {
            title = text;
        }

        author = author || '';
        title = title || '';
        ISBN = ISBN || '';

        var edition = {Copies:copies, ntitle:normalize(title), nauthor:normalize(author), nISBN:normalize(ISBN),
            separate:separate};

        edition.ISBNraw = ISBN;

        if (ISBN != '') {
            ISBN = '<a href="/search.php?searchtype=work&sortchoice=0&search=' +
                encodeURIComponent(ISBN) + '">' + escapeHTML(ISBN) + '</a>';
        }

        if (title != '') {
            title = '<a href="/search.php?searchtype=21&sortchoice=0&search=' +
                encodeURIComponent(title) + '">' + escapeHTML(title) + '</a>';
        }

        if (author != '') {
            author = '<a href="/search.php?searchtype=authorname&sortchoice=0&search=' +
                encodeURIComponent(author) + '">' + escapeHTML(author).replace(" ", "&nbsp;") + '</a>';
        }

        edition.Title = title;
        edition.Author = author;
        edition.ISBN = ISBN;

        editionsList.push(edition);
    }
}

function normalize(value) {
    if (value == null) {
        return ''
    }
    else {
        return value.toLowerCase().replace(/[^a-z0-9]/g, "");
    }
}

function editionsCompareWrap(b1, b2) {
    var result = editionsCompare(b1, b2);

    return result;
}

function editionsCompare(b1, b2) {
    for (var i = 0; i < (multisort && multisortChecked() ? sorts.length : 1); i++) {
        var field = fields[sorts[i]];
        if (b1[field.sortField] < b2[field.sortField]) {
            if (field.direction == SORT_ASCENDING) {
                return -1
            }
            else //if (field.direction == SORT_DESCENDING)
            {
                return 1
            }
        }
        else if (b1[field.sortField] > b2[field.sortField]) {
            if (field.direction == SORT_ASCENDING) {
                return 1
            }
            else //if (field.direction == SORT_DESCENDING)
            {
                return -1
            }
        }
    }

    return 0;
}

function buildEditionsTable() {
    var i;
    var html = '<table style="border-collapse: collapse; min-width:80%" id="ltwegEditionsTable">' +
        '<thead><tr>';

    for (i = 0; i < fields.length; i++) {
        var field = fields[i];

        html +=
            '<th class="ltwegHeader ltweg' + field.name + '">' +
                '<a id="ltwegHeaderLink' + i + '" class="ltwegHeaderLinkSort" href="javascript:return false;">' +
                field.label +
                '<sup> </sup>' +
                '<sup class="ltwegSortArrow">' +
                '<img id="ltwegSortArrow' + i + '" src="" style="display:none">' +
                '</sup>' +
                '<sup id="ltwegHeaderSup' + i + '" style="display:none"> </sup>' +
                '</a>' +
                '</th>'
    }

    html +=
        '<th class="ltwegHeader" id="ltwegHeaderMultisort">' +
            '<a id="ltwegHeaderMultisortLink" href="javascript:return false;" title="' + TRANSLATE_MULTI_SORT_HINT + '"></a>' +
            '</th>';

    html += '</tr></thead><tbody id="ltwegHeaderBody"></tbody></table>';

    editionsDiv.style.display = 'none';
    gridDiv = document.createElement('div');
    editionsDiv.parentNode.appendChild(gridDiv);
    gridDiv.innerHTML = html;

    var td = document.createElement('td');
    workSimpleHead.appendChild(td);
    td.style.textAlign = 'right';

    var gridLink = document.createElement('a');
    gridLink.setAttribute('href', '#');
    gridLink.appendChild(document.createTextNode('grid'));
    td.appendChild(gridLink);
    gridLink.style.fontWeight = 'bold';
    gridLink.addEventListener('click', function (e) {
        gridLink.style.fontWeight = 'bold';
        originalLink.style.fontWeight = '';
        gridDiv.style.display = '';
        editionsDiv.style.display = 'none';
        return false;
    }, false);

    td.appendChild(document.createTextNode(' | '));

    var originalLink = document.createElement('a');
    originalLink.setAttribute('href', '#');
    originalLink.appendChild(document.createTextNode('original'));
    td.appendChild(originalLink);
    originalLink.addEventListener('click', function (e) {
        gridLink.style.fontWeight = '';
        originalLink.style.fontWeight = 'bold';
        editionsDiv.style.display = '';
        gridDiv.style.display = 'none';
        return false;
    }, false);

    tableBodyDiv = document.getElementById('ltwegHeaderBody');

    document.getElementById('ltwegHeaderLink0').addEventListener('click', function (e) {
        doHeaderClick(e, 0)
    }, false);
    document.getElementById('ltwegHeaderLink1').addEventListener('click', function (e) {
        doHeaderClick(e, 1)
    }, false);
    document.getElementById('ltwegHeaderLink2').addEventListener('click', function (e) {
        doHeaderClick(e, 2)
    }, false);
    document.getElementById('ltwegHeaderLink3').addEventListener('click', function (e) {
        doHeaderClick(e, 3)
    }, false);

    multisort = document.getElementById('ltwegHeaderMultisortLink');
    multisort.addEventListener('click', doMultisortClick, false);

    syncArrows();

    buildEditions();
}

function buildEditions() {
    editionsList.sort(editionsCompareWrap);

    var selectedISBN = (window.location.search.match(/isbn=([^&]+)/) || []).pop();
    if (selectedISBN === undefined) {
        selectedISBN = bookISBN;
    }

    var html = '';
    var anchored = false;

    var lastClass = 'ltwegEven';
    for (var i = 0; i < editionsList.length; i++) {
        var edition = editionsList[i];

        html += '<tr class="' + ((edition.ISBNraw === selectedISBN) ? 'selected ' : '') +
            (edition.thisBook ? 'thisbook ' : '') + ((editionsList.length > 9) &&
            (i % 5 == 4) ? 'ltwegRow5' : '') + '">';

        for (var f = 0; f < fields.length; f++) {
            var field = fields[f];

            html += '<td' + (isDup(i, field) && f != FIELD_COPIES ? ' class="ltwegDup"' : '') + '>';

            if (edition.ISBNraw === selectedISBN && !anchored && window.location.search !== '') {
                html += '<a name="grid"></a>';
                anchored = true;
            }

            html += edition[field.name] + '</td>';
        }

        html += '<td class="' + lastClass + '"></a><a href="/work_separate.php?book=' +
            edition.separate[0] + '&work=' + edition.separate[1] + '"><span class="ltwegSeparate"></span></a></td>';

        html += '</tr>';
    }

    tableBodyDiv.innerHTML = html;

    if (anchored) {
        window.location.hash = '#grid';
    }
}

function isDup(i, field) {
    return i != 0 && editionsList[i][field.sortField] == editionsList[i - 1][field.sortField];
}

function multisortChecked() {
    return multisort.className != '';
}

function doMultisortClick(e) {
    stopBubbling(e);

    var isMultisort = !multisortChecked();  // about to flip
    multisort.className = isMultisort ? 'ltwegMultisortChecked' : '';

    syncArrows();
}

function syncArrows() {
    var isMultisort = multisortChecked();  // about to flip

    for (i = 0; i < fields.length; i++) {
        var sup = document.getElementById('ltwegHeaderSup' + i);
        sup.style.display = isMultisort ? '' : 'none';
        setTextContent(sup, sorts.indexOf(i) + 1);

        var arrow = document.getElementById('ltwegSortArrow' + i);

        arrow.style.display = (isMultisort || sorts[0] == i) ? '' : 'none';

        arrow.src = (fields[i].direction == SORT_ASCENDING) ?
            'http://static.librarything.com/pics/sort-up.gif'
            : 'http://static.librarything.com/pics/sort-down.gif';
    }
}

function doHeaderClick(e, clickedIndex) {
    stopBubbling(e);

    var isMultisort = multisortChecked();

    if (isMultisort && sorts[sorts.length - 1] == clickedIndex || !isMultisort && sorts[0] == clickedIndex) {
        fields[clickedIndex].direction =
            (fields[clickedIndex].direction == SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING)
    }
    else {
        for (var i = 0; i < sorts.length; i++) {
            if (sorts[i] == clickedIndex) {
                sorts.splice(i, 1);
                break;
            }
        }

        if (isMultisort) {
            sorts.push(clickedIndex)
        }
        else {
            fields[clickedIndex].direction = SORT_ASCENDING;
            sorts.unshift(clickedIndex);
        }
    }

    syncArrows();

    buildEditions();

    return false;
}

function stopBubbling(e) {
    if (!e) {
        e = window.event;
    }

    e.cancelBubble = true;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
}

function setTextContent(node, text) {
    if (node.innerText) {
        node.innerText = text
    }
    else if (node.textContent) {
        node.textContent = text;
    }
}

function escapeHTML(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


try {
    if (editionsDiv && workSimpleHead && !gridDiv) {
        setEditionStyles();
        parseEditons();
        buildEditionsTable();
    }
} catch (err) {
    console.log(err);
}