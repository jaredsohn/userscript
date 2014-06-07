// ==UserScript==
// @name           Extra citations for oper.ru' comments
// @namespace      oper.ru
// @include        http://oper.ru/news/read.php*

// ==UserScript==

/*
    (C) viklequick, 2008, he-he.
    Applied only to main comments, not gallery/forum/etc.
    Forum will not be supported easy; but gallery just need 
    to be added to list of assosciated URLs.
*/

// Persons to be not removed from comments at all
var alwaysShow = new Array();
alwaysShow[0] = 'Goblin'; // Главный
alwaysShow[1] = 'FVL';    // Мега-Камрад
alwaysShow[2] = 'Gedeon'; // Камрад

// далее мои личные предпочтения 
alwaysShow[3] = 'viklequick'; // I'm author of this script ;-)
alwaysShow[4] = 'panzerschpecht';
alwaysShow[5] = 'Landadan';
alwaysShow[6] = 'lylyM';
alwaysShow[7] = 'Ecoross';
alwaysShow[8] = 'AborT';
alwaysShow[9] = unescape('%u0421%u0438%u0431%u0438%u0440%u044F%u043A'); // Сибиряк
alwaysShow[10] = unescape('0411%u0435%u0448%u0435%u043D%u044B%u0439%u0020%u043F%u0440%u0430%u043F%u043E%u0440'); // Бешеный прапор
alwaysShow[11] = unescape('%u0427%u0438%u0442%u0430%u0442%u0435%u043B%u044C'); // Не помню
alwaysShow[12] = 'razoom1';
alwaysShow[13] = 'Vitus';
alwaysShow[14] = 'ALT';
alwaysShow[15] = 'pikachu';

// honored labels indicates that persons ain't trolls
var honoredLabels = new Array();
honoredLabels[0] = unescape('%u0433%u0440%u043E%u0441%u0441%u043C%u0435%u0439%u0441%u0442%u0435%u0440'); // гроссмейстер
honoredLabels[1] = unescape('%u043A%u0430%u043C%u0440%u0430%u0434'); // камрад
honoredLabels[2] = unescape('%u043C%u043E%u0434%u0435%u0440%u0430%u0442%u043E%u0440'); // модератор

// labels in russian to be sure it affects code pages violation
var lblComments   = unescape('%u041A%u043E%u043C%u043C%u0435%u043D%u0442%u0430%u0440%u0438%u0438'); // Комментарии
var lblReply      = unescape('%u041E%u0442%u0432%u0435%u0442%u0438%u0442%u044C');    // Ответить
var lblNoComments = unescape('%u0422%u043E%u043B%u044C%u043A%u043E%u0020%u043C%u0435%u0433%u0430%u002D%u043A%u0430%u043C%u0440%u0430%u0434%u044B'); // Mega-Kamraden
var lblNoCommentsButQuoted = lblNoComments + unescape('%u0020%u0438%u0020%u043E%u0442%u0432%u0435%u0442%u044B%u0020%u0438%u043C');
var lblNoLabels   = unescape('%u0411%u0435%u0437%u0020%u043F%u043E%u0433%u043E%u043D'); // Без погон
var lblShowBack   = unescape('%u0426%u0443%u0440%u044E%u043A%u0020%u0441%u043A%u0440%u044B%u0442%u043E%u0435'); // Цурюк скрытое
var lblAnswerTo   = unescape('%u041A%u043E%u043C%u0443');
var lblAuthors    = unescape('%u0410%u0432%u0442%u043E%u0440%u044B');
var lblAuthor     = unescape('%u0410%u0432%u0442%u043E%u0440');
var lblWrote      = unescape('%u041E%u0442%u043C%u0435%u0442%u0438%u043B%u0438%u0441%u044C%u0020%u0442%u0443%u0442');

// remove all comments completely and at all w/o undo
// reserved for future use, don't added to menus/links
function dropAllComments() {
    var texts = document.body.innerHTML;
    var i1 = texts.indexOf('<font class=yheader size=4 color=#ffffff><b>' + lblComments + '</b></font>');
    var i2 = texts.indexOf('value="' + lblReply + '">');
    if(i2>0) i2 = texts.indexof('</table>', i2);
    if(i1>0 && i2>0) texts = texts.substring(0, i1) + texts.substring(i2+1);
    document.body.innerHTML = texts;
}

// find oyter table by specific DIV
function getOuterTable(o)
{
    if(o == null) return o;
    if(o.nodeName.toLowerCase() == "table") return o;
    return getOuterTable(o.parentNode);
}

// show back hidden comments
function showCommentsBack()
{
    var allElements, elt;
    allElements = document.getElementsByTagName('table');
    for (var i = 0; i < allElements.length; i++) {
        elt = allElements[i];
        elt.style.display = '';
    }
}

// kind = 
//      1 - without labelled aka trolls, 
//      2 - only honored persons, 
//      3 - only honored persons w/quotes
function dropCommentsImpl(kind)
{
    var allElements, elt, xid, table;
    var divs, divtxt = '';

    allElements = document.evaluate(
        '//div[@id]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        elt = allElements.snapshotItem(i);
        xid = elt.id.toLowerCase();

        if("to" == xid.substring(0, 2) || "quote" == xid.substring(0, 5)) {
            divs = elt.parentNode;

            var gogo = false;
            if(kind!=2){
                for(var j=0;j<divs.childNodes.length;++j) {
                    if(divs.childNodes[j].nodeName.toUpperCase() == "DIV") {
                        if(divs.childNodes[j].className!="text10") continue;

                        divtxt = divs.childNodes[j].innerHTML;
                        if(typeof(divtxt) == "undefined") continue;

                        gogo = true;
                        break;
                    }
                }
                // trusted persons always allowed
                for(var k=0;k<honoredLabels.length;++k) {
                    if(divtxt.indexOf(honoredLabels[k]) >=0 ) {
                        gogo = false;
                        break;
                    }
                }
                if(gogo) GM_log('citation ' + xid + ': author = ' + divtxt + ': hidden');
            }
            // no label => not trolls
            if(kind == 1 && !gogo) continue;

            table = getOuterTable(elt);
            if(typeof(table)!="undefined") {
                var divtxt = '' + table.innerHTML;
                var pass = false;
                for(var j = 0; j < alwaysShow.length; ++j) {
                    var hlabel = alwaysShow[j];
                    if(kind == 2) hlabel = '<b>' + hlabel + '</b>';
                    if(divtxt.indexOf(hlabel) >=0) {
                        pass = true;
                        break;
                    }
                }
                if(!pass){ 
                    table.style.display = "none";
                    table.toBeShown = true;
                }
            }
        }
    }
}

// Hide comments from persons who has labels (except honored labels)
function dropTrolls()
{
    dropCommentsImpl(1);
}

// Hide all comments except few persons
function dropComments()
{
    dropCommentsImpl(2);
}

// Hide all comments except few persons and answers to
function dropCommentsButQuotes()
{
    dropCommentsImpl(3);
}

// find replies in text
function findReplies(divtxt)
{
    var retn = new Array();
    var j = -1, k;
    for(;;) {
        j = divtxt.indexOf('">#', j + 1);
        if(j<0) break;
        k = divtxt.indexOf('<', j + 3);
        if(k<0) continue;
        var num = divtxt.substring(j + 3, k);
        retn.push(num);
    }
    return retn;
}

// find articles which have answers
function findLinks(a, idx, refs)
{
    for(var j in refs) 
        if(typeof(a[refs[j]]) != 'undefined' && a[refs[j]]) 
            a[refs[j]]['linked'].push(idx);
}

// build band in array pair [index, [author, to, quote, refs, linked]]
function buildBand()
{
    var a = new Array();

    var allElements, elt, xid;
    var divtxt = '';

    allElements = document.evaluate(
        '//div[@id]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        elt = allElements.snapshotItem(i);
        xid = elt.id.toLowerCase();

        var idx = -1;
        if("to" == xid.substring(0, 2)){ 
            idx = xid.substring(2);
            if(idx<0) continue;

            // getting author name
            divtxt = elt.innerHTML;
            if(typeof(divtxt) == "undefined") continue;
            divtxt = divtxt.substring(6, divtxt.length - (3 + ('' + idx).length));
            var author = divtxt;

            var xitem = new Array();
            xitem['author'] = author;
            xitem['index'] = idx;
            xitem['to'] = elt;
            xitem['linked'] = new Array();
            xitem['wiredlinks'] = new Array();
            a[idx] = xitem;
        }
        else if("quote" == xid.substring(0, 5)) {
            idx = xid.substring(5);
            if(idx<0) continue;
            divtxt = elt.innerHTML;
            if(typeof(divtxt) == "undefined") continue;

            var xitem = a[idx];
            xitem['quote'] = elt;
            xitem['refs'] = findReplies(divtxt);
            findLinks(a, idx, xitem['refs']);
        }
    }
    return a;
}

// checks if such item already in array
function contains(array, v)
{
    for(var i in array) 
        if(array[i] == v) return true;
    return false;
}

// merges all citatuons in one array
function fillCitations(target, a, index)
{
    // check if ref related to other page
    if(typeof(a[index]) == 'undefined' || !a[index]) return;

    var refs = a[index]['refs'];
    for(var i in refs) {
        if(contains(target, refs[i])) continue;
        target.push(refs[i]);
        fillCitations(target, a, refs[i]);
    }
    return target;
}

// merges all links to specific item a[index]
// both backward (replied) and forward (have replies)
function fillWiredLinks(wiredlinks, a, index)
{
    // initiate links
    var links  = a[index]['linked'];
    for(var i in links)
        if(!contains(wiredlinks, links[i])) 
            wiredlinks.push(links[i]);
    links  = a[index]['refs'];
    for(var i in links)
        if(!contains(wiredlinks, links[i])) 
            wiredlinks.push(links[i]);

     // for newly added libnks add sub-links recursively
    for(var j=0; j < wiredlinks.length; ++j) {
        if(wiredlinks[j] == index) continue;
        if(typeof(a[wiredlinks[j]]) == 'undefined' || !a[wiredlinks[j]]) continue;
        
        links = a[wiredlinks[j]]['linked'];
        for(var i in links)
            if(!contains(wiredlinks, links[i])) 
                wiredlinks.push(links[i]);

        links = a[wiredlinks[j]]['refs'];
        for(var i in links)
            if(!contains(wiredlinks, links[i])) 
                wiredlinks.push(links[i]);
    }
}

// merges all authors of citatuons in one array
function fillAuthors(target, a, index, za)
{
    var refs = za;
    for(var i in refs) {
        if(refs[i] == index) continue;
        if(typeof(a[refs[i]]) == 'undefined' || !a[refs[i]]) continue;

        var author = a[refs[i]]['author'];
        if(contains(target, author)) continue;
        target.push(author);
    }
    return target;
}

// makes links to filter by author
function mkAuthorLink(ref, label)
{
    var newElt = document.createElement('a');
    newElt.href = ref + '&name=' + label + '#comments';
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode(label));
    return newElt;
}

// makes link to refrence in article (page scope only)
function mkRefLink(ref, label)
{
    var newElt = document.createElement('a');
    newElt.href = '#' + label;
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode('#' + label));
    return newElt;
}

// builds citations for every comment
function makeCitations()
{
    var a = buildBand();
    var authors = new Array();
    var quotes  = new Array();
    var autrefs = new Array();

    // calculating base ref for page links
    var baseref = window.location.href;
    var z = baseref.indexOf('&');
    if(z>0) baseref = baseref.substring(0, z);
    z = baseref.indexOf('#');
    if(z>0) baseref = baseref.substring(0, z);

    // once we have citations we need to fill an arrays 
    //    [author, wrote=[...]]
    //    [index, referred_from=[...]]
    //    [index, referred_from_authors=[...]]
    for(var j in a) {
        var author = a[j]['author'];
        if(!authors[author]) authors[author] = new Array();
        authors[author].push(j);

        var za = a[j]['wiredlinks'];
        fillWiredLinks(za, a, j);
        za.sort();
        a[j]['wiredlinks'] = za;

    /*
        if(!quotes[j]) quotes[j] = new Array();
        fillCitations(quotes[j], a, j);
        quotes[j].sort();
    */ 

        if(!autrefs[j]) autrefs[j] = new Array();
        fillAuthors(autrefs[j], a, j, za);
        autrefs[j].sort();

    }

    // now we ready to add more links for every band piece
    for(var j in a) {
        var elt = a[j]['to'];
        // empty place

        var xdiv = document.createElement('span');
        xdiv.className = 'text13';

        xdiv.appendChild(document.createElement('br'));
        xdiv.appendChild(document.createElement('br'));

        for(var k in autrefs[j]) {
            xdiv.appendChild(mkAuthorLink(baseref, autrefs[j][k]));
            xdiv.appendChild(document.createTextNode(' '));
        }
        xdiv.appendChild(document.createElement('br'));
        xdiv.appendChild(document.createElement('br'));

        // references are part of wired links
     /* for(var k in quotes[j]) {
            xdiv.appendChild(mkRefLink(baseref, quotes[j][k]));
            xdiv.appendChild(document.createTextNode(' '));
        }
     // xdiv.appendChild(document.createElement('br'));
     // xdiv.appendChild(document.createElement('br'));
     */
        // links
        var links = a[j]['wiredlinks'];
        links.sort();
        for(var z in links) {
            xdiv.appendChild(mkRefLink(baseref, links[z]));
            xdiv.appendChild(document.createTextNode(' '));
        }
        xdiv.appendChild(document.createElement('br'));
        elt.parentNode.insertBefore(xdiv, elt.nextSibling);
    }

    var autlist = new Array();
    for(var k in authors) autlist.push(k);
    autlist.sort();

    // now we ready to add authors list at page with citations
    var allElements, elt;
    allElements = document.evaluate(
        "//font[@class='yheader']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        elt = allElements.snapshotItem(i);
        if(elt.innerHTML.indexOf(lblComments) >=0) {
            var xdiv = document.createElement('span');
            xdiv.className = 'text13';

            var text = '<a href="javascript:void(-5)">[' + lblAuthors + ']</a>';
            text += '<div id=citations style="display:none" align="center">';
            text += '<br><table border=0><tr><td class="text13" width=35%>' + lblAuthor + '</td><td class="text13">' + lblWrote + '</td></tr>';
            for(var k in autlist) {
                authors[autlist[k]].sort();
                text += '<tr><td class="text13"><a href="' + baseref + '&name=' + autlist[k] + '#comments">'+autlist[k]+' (' + authors[autlist[k]].length + ')</a></td><td>';
                for(var x in authors[autlist[k]]) 
                    text += '<a href="#' + authors[autlist[k]][x] + '" class="text13">#' + authors[autlist[k]][x] + '</a>, ';
                text += '</td></tr>';
            }
            text += '</table></div>';
            xdiv.innerHTML = text;

            // siblibg 2 times to keep it below buttons added earlier
            elt.parentNode.insertBefore(xdiv, elt.nextSibling.nextSibling);
            break;
        }
    }
}

// registers menu points

GM_registerMenuCommand("Add citations", makeCitations, 'o', 'control shift', 'c');
GM_registerMenuCommand("Hide trolls", dropTrolls, 'r', 'control shift', 'r');
GM_registerMenuCommand("Hide comments", dropComments, 'e', 'control shift', 'e');
GM_registerMenuCommand("Hide comments but quotes", dropCommentsButQuotes, 'e', 'control shift', 'e');
GM_registerMenuCommand("Show hidden comments back", showCommentsBack, 'b', 'control shift', 'b');
GM_registerMenuCommand("Show authors list", showCommentsBack, 'b', 'control shift', 'b');

function showCitationsTable()
{
    var elt = document.getElementById('citations');
    elt.style.display = '';
}

// outer links are makrked by specific case as it handled out of the page scope
function mkLink(kind, label)
{
    var newElt = document.createElement('a');
    newElt.href='javascript:void(-'+kind+')';
    newElt.myLink = true;
    newElt.kind = kind;
    newElt.title = label;
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode('[' + label + ']'));
    return newElt;
}

// adds links only after page was rendered and scripts was gone
window.addEventListener("load", function(e) {
  // find comments section and add extra links
    var allElements, elt;
    allElements = document.evaluate(
        "//font[@class='yheader']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        elt = allElements.snapshotItem(i);
        if(elt.innerHTML.indexOf(lblComments) >=0) {
            // add extra links here
            var xdiv = document.createElement('span');
            xdiv.className = 'text13';

            xdiv.appendChild(document.createElement('br'));
            xdiv.appendChild(mkLink(1, lblNoLabels));
            xdiv.appendChild(mkLink(2, lblNoComments));
            xdiv.appendChild(mkLink(3, lblNoCommentsButQuoted));
            xdiv.appendChild(mkLink(4, lblShowBack));

            elt.parentNode.insertBefore(xdiv, elt.nextSibling);
            break;
        }
    }

    // changes background color
    document.getElementsByTagName('body')[0].style.backgroundColor = '#202020';

    // adds citations
    makeCitations();

}, false);

// handle extra links were added
document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
    if(event.target.href) {
        var j = event.target.href.indexOf('javascript:void(-');
        if( j >=0 ) {
            var kind = event.target.href.substring(j + 17, j + 18);

                 if(kind == '1') dropTrolls ();
            else if(kind == '2') dropComments();
            else if(kind == '3') dropCommentsButQuotes();
            else if(kind == '4') showCommentsBack();
            else if(kind == '5') showCitationsTable();
        }
    }
}, true);

// ==/UserScript==
