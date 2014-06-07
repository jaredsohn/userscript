// ==UserScript==
// @name           Extra citations for oper.ru' comments, v.0.5.1
// @namespace      oper.ru
// @include        http://*oper.ru/news/read.php*
// @include        http://*oper.ru/gallery/view.php*
// @include        http://*oper.ru/torture/read.php*

// ==UserScript==

/*
    (C) viklequick, 2008-2009.
    Applied only to main comments/gallery/archive, not forum.
    Supporting platforms: FF/Greasemonkey, Opera, IE/IE7pro.
*/

/* ---------------------------------------------------------------------
    Constants and arrays for filtration
   --------------------------------------------------------------------- */

// Persons to be not removed from comments
var alwaysShow = new Array();
alwaysShow[0] = 'Goblin'; // Главный
alwaysShow[1] = 'FVL';    // Мега-Камрад
alwaysShow[2] = 'Gedeon'; // Камрад
alwaysShow[3] = unescape('%u0424%u0412%u041B') + ' (FVL)'; // Мега-Камрад 

// далее мои личные предпочтения 
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
alwaysShow[16] = 'Merlin';
alwaysShow[17] = 'Light';
alwaysShow[18] = 'viklequick'; // I'm author of this script ;-)
alwaysShow[19] = 'Digger';

// honored labels indicates that persons ain't trolls
var honoredLabels = new Array();
honoredLabels[0] = unescape('%u0433%u0440%u043E%u0441%u0441%u043C%u0435%u0439%u0441%u0442%u0435%u0440'); // гроссмейстер
honoredLabels[1] = unescape('%u043A%u0430%u043C%u0440%u0430%u0434'); // камрад
honoredLabels[2] = unescape('%u043C%u043E%u0434%u0435%u0440%u0430%u0442%u043E%u0440'); // модератор
honoredLabels[3] = unescape('%u0441%u0432%u0438%u0440%u0435%u043F%u044B%u0439%u0020%u043F%u043E%u0434%u0440%u0443%u0447%u043D%u044B%u0439'); // свирепый подручный

// list of colored jeans ;-)
var notGrayColors = new Array();
notGrayColors[0] = '#ffa519'; // forum member
notGrayColors[1] = '#ffff50'; // Goblin' club
notGrayColors[2] = '#ff2020'; // Goblin
notGrayColors[3] = '#ccc674'; // candidate
notGrayColors[4] = '#ffffff'; // white
notGrayColors[5] = '#c5c5c5'; // grayed

// labels in russian to be sure it affects code pages violation
var lblComments   = unescape('%u041A%u043E%u043C%u043C%u0435%u043D%u0442%u0430%u0440%u0438%u0438'); // Комментарии
var lblReply      = unescape('%u041E%u0442%u0432%u0435%u0442%u0438%u0442%u044C');    // Ответить
var lblMegaKamraden = unescape('%u0422%u043E%u043B%u044C%u043A%u043E%u0020%u043C%u0435%u0433%u0430%u002D%u043A%u0430%u043C%u0440%u0430%u0434%u044B'); // Mega-Kamraden
var lblMegaKamradenButQuoted = lblMegaKamraden + unescape('%u0020%u0438%u0020%u043E%u0442%u0432%u0435%u0442%u044B%u0020%u0438%u043C');
var lblNoLabels   = unescape('%u0411%u0435%u0437%u0020%u043F%u043E%u0433%u043E%u043D'); // Без погон
var lblShowBack   = unescape('%u0426%u0443%u0440%u044E%u043A%u0020%u0441%u043A%u0440%u044B%u0442%u043E%u0435'); // Цурюк скрытое
var lblAnswerTo   = unescape('%u041A%u043E%u043C%u0443');
var lblAuthors    = unescape('%u0410%u0432%u0442%u043E%u0440%u044B');
var lblAuthor     = unescape('%u0410%u0432%u0442%u043E%u0440');
var lblWrote      = unescape('%u041E%u0442%u043C%u0435%u0442%u0438%u043B%u0438%u0441%u044C%u0020%u0442%u0443%u0442');
var lblHide       = unescape('%u0441%u043A%u0440%u044B%u0442%u044C');
var lblFVL        = unescape('%u0424%u0412%u041B');
var lblHideAll    = unescape('%u0412%u0441%u0451%u0020%u043F%u0440%u043E%u0447%u0435%u043B');
var lblExLinks    = unescape('%u0426%u044B%u043D%u043A%u0438');

var lblTotalSite3 = unescape('%u041C%u0435%u0433%u0430%u002D%u0448%u0442%u0430%u043D%u044B');
var lblTotalSite4 = lblTotalSite3 + ' ' + unescape('%u0438%u0020%u043A%u0430%u043D%u0434%u0438%u0434%u0430%u0442%u044B');
var lblTotalSite5 = unescape('%u041D%u0435%u0020%u0441%u0435%u0440%u043E%u0448%u0442%u0430%u043D%u043D%u044B%u0435');
var lblReload     = unescape('%u0417%u0430%u0020%u0441%u0432%u0435%u0436%u0430%u043A%u043E%u043C');

// hide too rich content
var lblImagesSpl  = unescape('%u041A%u0430%u0440%u0442%u0438%u043D%u043A%u0438');

/* ---------------------------------------------------------------------
    Cached variables and global flags
   --------------------------------------------------------------------- */

// markers
var varAuthor = '';
var isFVL = false;
var isGoblin = false;
var isEcoross = false;
var isGedeon = false;
var isDigger = false;
var isQuoted = false;

// For cros-loading of pages
var this_is_Opera = navigator.appName.toLowerCase().indexOf("opera") != -1;
var this_is_IE = navigator.appName.toLowerCase().indexOf("explorer") != -1;
var storage = this_is_IE ? new PsJsSV() : new GMSV();

var EltsOnPage = 100;       // auto-computed
var TimeToAutoClick = 2000; // 2s
var MaxLinksToNClick= 250;  // if thread > N posts no sense of no-click options
var MaxLinksToNFloat= 0;    // how much treads embed in body not floating

var ProfileOn = true; // shows self-checks for makeCitations() function as it long-time
var DoMotion  = true; // new google reader like motion support
var DoNoClick = true;// don't click option
var DoStats   = true; // show or not statistic about links and authors

/* ---------------------------------------------------------------------
    Implementation: utility functions
   --------------------------------------------------------------------- */

// numeric sort
function NumCmp(a, b){ return a - 0 < b - 0 ? -1 : (a - 0 == b - 0 ? 0 : 1); }

// checks if such item already in array
function contains(array, v, map)
{
    if(map) return map[v] == true;
    for(var i in array) 
        if(array[i] == v) return true;
    return false;
}

// Cookie storage
function Cookies() {
    this.get = function(id) {
        var begin, end;
        id = escape(id);
        if (document.cookie.length > 0) {
            begin = document.cookie.indexOf(id+"=");
            if (begin != -1) {
                begin += id.length+1;
                end = document.cookie.indexOf(";", begin);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(begin, end)); 
            }
        }
        return null;
    }

    this.set = function(id, value, expireDays) {
        var expiry = new Date ();
        expiry.setTime(expiry.getTime() + (expireDays * 24 * 3600 * 1000));
        document.cookie = escape(id) + "=" + escape(value) +
            ((expireDays == null) ? "" : "; expires=" + expiry.toGMTString());
    }

    this.remove = function(id) {
        if (this.get(id)) document.cookie = escape(id) + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

// Greasemonkey storage
function GMSV() {
    this.get = function(id) {
        return GM_getValue(id, null);
    }

    this.set = function(id, value, expireDays) {
        GM_setValue(id, value);
    }

    this.remove = function(id) {
        if (this.get(id)) this.set(id, '');
    }
}

// PersistJS
function PsJsSV() {
    this.storage = new Persist.Store('oper.ru');
    this.retn = null;
    this.get = function(id) {
        // actually callback works in sync' context
        store.get(id, function(ok, val) { if(ok) this.retn = val; });
        return this.retn;
    }

    this.set = function(id, value, expireDays) {
        store.set(id, value);
    }

    this.remove = function(id) {
        store.remove(id);
    }
}


// get clean URL http://oper.ru?t=12345678
function getBaseRef() {
    var baseref = document.location.href;
    var z = baseref.indexOf('&');
    if(z>0) baseref = baseref.substring(0, z);
    z = baseref.indexOf('#');
    if(z>0) baseref = baseref.substring(0, z);
    return baseref;
}

// number of topic
function getBaseId() {
    var baseref = document.location.href;
    var z = baseref.indexOf('?t=');
    if(z>0) baseref = baseref.substring(z + 3);
    z = baseref.indexOf('&');
    if(z>0) baseref = baseref.substring(0, z);
    z = baseref.indexOf('#');
    if(z>0) baseref = baseref.substring(0, z);
    return baseref;
}

// get current page number, 0 for 'page=all' mode
function getCurrentPage() {
    var baseref = document.location.href;
    var z = baseref.indexOf('#');
    if(z>0) baseref = baseref.substring(0, z);
    z = baseref.indexOf('&page=');
    if(z>0){ 
        var zz = baseref.substring(z + 6);
        return zz == 'all' ? 0 : zz;
    }
    return 0;
}

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

// find outer table by specific DIV
function getOuterTable(o)
{
    if(o == null) return o;
    if(o.nodeName.toLowerCase() == "table") return o;
    return getOuterTable(o.parentNode);
}

// Cleanup
function cleanCache(addedToo) {
    var a = window.gmcache;
    for(x in a) {
        if(a[x]['refs']) a[x]['refs'] = null;
        if(a[x]['quote']) a[x]['quote'] = null;
        if(a[x]['hrefs']) a[x]['hrefs'] = null;
        if(a[x]['author']) a[x]['author'] = null;
        if(a[x]['index']) a[x]['index'] = null;
        if(a[x]['linked']) a[x]['linked'] = null;

        // it is special case as we adding links after cleanup
        // if(addedToo && a[x]['added']) a[x]['added'] = null;
        // if(addedToo && a[x]['added_splash']) a[x]['added_splash'] = null;
    }
}

// simple string buffer
function StringBuffer() { 
    this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string) { 
    this.buffer.push(string); 
    return this; 
}; 

StringBuffer.prototype.toString = function toString() { 
    return this.buffer.join(""); 
}; 

/* ---------------------------------------------------------------------
    Implementation: persistence
   --------------------------------------------------------------------- */

// persistence: remember what;'s hidden on specific page and restore it back

// cookies are limited to 4k so we can't simply list all hidden elements; too many space for big threads.
// so we're using form '1-20,40-50,92,107-109'.
// this function restores list of indexes from string
function unrollHiddenList() {
    var bref = getBaseId();
    var ll = storage.get("s+" + bref);
    var idxs = ll ? ll.split(',') : null;
    if(idxs == null) return null;

    var ret = new Array();
    for(var j=0;j<idxs.length;++j) {
        if(idxs[j] == '') continue;
        var cj = idxs[j].indexOf('-') > 0;
        if(cj) {
            var diap = idxs[j].split('-');
            for(var k=diap[0] - 0; k<= diap[1] - 0; ++k)
                ret[ret.length] = k;
        }
        else 
            ret[ret.length] = idxs[j] - 0;
    }
    return ret;
}

// this function collapses numbers into string form
function applyHiddenList(idxs) {
    var bref = getBaseId();
    var ll = '';
    idxs.sort(NumCmp);
    var prev = -1;
    var def = false;
    for(var j=0;j<idxs.length;++j) {
        if(idxs[j] > 0){ 
            if(prev - 0 + 1 == idxs[j] - 0) {
                if(!def) {
                    def = true;
                    ll += '-';
                }
                ++prev;
            }
            else {
                if(def) {
                    ll += prev;
                    def = false;
                }
                ll += ',' + idxs[j];
                prev = idxs[j] - 0;
            }
        }
    }
    if(def) ll += prev;
    storage.set("s+" + bref, ll, 365);
}

/* ---------------------------------------------------------------------
    Implementation: show back
   --------------------------------------------------------------------- */

// show back hidden comments
function showCommentsBack()
{
    var allElements, elt;
    allElements = document.getElementsByTagName('table');
    for (var i = 0; i < allElements.length; i++) {
        elt = allElements[i];
        elt.style.display = '';
    }
    markAllNotHidden();
}

/* ---------------------------------------------------------------------
    Implementation: hide by filters
   --------------------------------------------------------------------- */

// hide all but proper colors
// Hide comments from persons who has labels (except honored labels)
// Hide all comments except few persons
// Hide all comments except few persons and answers to
function hideGrays(depth){ dropCommentsImpl(4, depth); }
function dropTrolls()    { dropCommentsImpl(1, 0);     }
function dropComments()  { dropCommentsImpl(2, 0);     }
function dropCommentsButQuotes(){ dropCommentsImpl(3, 0); }

// kind = 
//      1 - without labelled aka trolls, 
//      2 - only honored persons, 
//      3 - only honored persons w/quotes
//      4 - only honored persons AND non-grayed

function dropCommentsImpl(kind, depth)
{
    var allElements, elt, xid, table;
    var divs, divtxt = '';

    allElements = document.getElementsByTagName('div');
    for (var i = 0; i < allElements.length; i++) {
        elt = allElements[i];
        xid = elt.id.toLowerCase();

        if("to" == xid.substring(0, 2) /*|| "quote" == xid.substring(0, 5)*/) {
            divs = elt.parentNode;

            var gogo = false;
            if(kind!=2){
                for(var j=0;j<divs.childNodes.length;++j) {
                    if(divs.childNodes[j].nodeName.toUpperCase() == "DIV") {
                    //  if(!this_is_IE && divs.childNodes[j].className!="text10") continue;
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
            }
            // no label => not trolls
            if(kind == 1 && !gogo) continue;

            table = getOuterTable(elt);
            if(table!=null && typeof(table)!="undefined") {
                var divtxt = '' + table.innerHTML;
                var pass = false;

                for(var j = 0; j < alwaysShow.length; ++j) {
                    var hlabel = alwaysShow[j];
                    if(kind == 2 || kind == 4){ 
                        if(hlabel=='AborT')
                            hlabel = 'alt=\"' + hlabel + '\"';
                        else
                            hlabel = '<b>' + hlabel + '</b>';
                    }
                    if(divtxt.indexOf(hlabel) >=0) {
                        pass = true;
                        break;
                    }
                    if(this_is_IE) { 
                        hlabel = alwaysShow[j];
                        if(kind == 2 || kind == 4){ 
                            if(hlabel=='AborT')
                                hlabel = 'ALT=' + hlabel;
                            else
                                hlabel = '<B>' + hlabel + '</B>';
                        }
                        if(divtxt.indexOf(hlabel) >=0) {
                            pass = true;
                            break;
                        }
                    }
                }
                if(kind==2 || kind == 4){ 
                    hlabel = '(FVL)</b>';
                    if(divtxt.indexOf(hlabel) >=0) pass = true;
                    if(this_is_IE){ 
                        hlabel = '(FVL)</B>';
                        if(divtxt.indexOf(hlabel) >=0) pass = true;
                    }
                }

                if(kind == 4 && !pass) {
                    for(var j = 0; j < notGrayColors.length && j < depth; ++j) {
                        var probe = '<font color="' + notGrayColors[j] + '" size="2"><b>';
                        if(divtxt.indexOf(probe) >=0) {
                            pass = true;
                            break;
                        }
                        if(this_is_IE) {
                            probe = '<FONT color=' + notGrayColors[j] + ' size=2><B>';
                            if(divtxt.indexOf(probe) >=0) {
                                pass = true;
                                break;
                            }
                        }
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

/* ---------------------------------------------------------------------
    Implementation: thread computing
   --------------------------------------------------------------------- */

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

// find extern links in text
function findExLinksTo(divtxt)
{
    var retn = new Array();
    var mask = '<a rel="nofollow" target="_blank" href="';
    var j = -1, k;
    for(;;) {
        j = divtxt.indexOf(mask, j + 1);
        if(j<0) break;
        k = divtxt.indexOf('\"', j + mask.length + 1);
        if(k<0) continue;
        var xlink = divtxt.substring(j + mask.length, k);
        retn.push(xlink);
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

function coverColor(el2)
{
    if(!el2 || !el2.style) return 'pink';

    if(el2.style.color && el2.style.color != '') 
        return el2.style.color;
    if(el2.style.font && el2.style.font.color && el2.style.font.color != '') 
        return el2.style.font.color;
    if(el2.color && el2.color != '') 
        return el2.color;
    return coverColor(el2.parentNode);
}

// build band in array pair [index, [author, to, quote, refs, linked]]
function buildBand()
{
    var a = new Array();

    var allElements, elt, xid;
    var divtxt = '';

    allElements = document.getElementsByTagName('div');
    for (var i = 0; i < allElements.length; i++) {
        elt = allElements[i];
        xid = elt.id.toLowerCase();
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
            xitem['hrefs'] = new Array();

            var el2 = elt.parentNode.getElementsByTagName('b');
            xitem['jeans'] = coverColor(el2[0]);

            a[idx] = xitem;

            if(author.indexOf('FVL') >=0) isFVL = true;
            if(author.indexOf('Goblin') >=0) isGoblin = true;
            if(author.indexOf('Gedeon') >=0) isGedeon = true;
            if(author.indexOf('Ecoross') >=0) isEcoross = true;
            if(author.indexOf('Digger') >=0) isDigger = true;
        }
        else if("quote" == xid.substring(0, 5)) {
            idx = xid.substring(5);
            if(idx<0) continue;
            divtxt = elt.innerHTML;
            if(typeof(divtxt) == "undefined") continue;

            var xitem = a[idx];
            xitem['quote'] = elt;
            xitem['refs'] = findReplies(divtxt);
            xitem['hrefs'] = findExLinksTo(divtxt);
            findLinks(a, idx, xitem['refs']);

            if(varAuthor && varAuthor!='' && divtxt.indexOf(varAuthor) > 0) isQuoted = true;
        }
    }
    return a;
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
    // map is cache of all values for fast contains check
    var map = new Array();
    for(var i in wiredlinks) map[wiredlinks[i]] = true;

    var links  = a[index]['linked'];
    for(var i in links)
        if(!contains(wiredlinks, links[i], map)) {
            wiredlinks.push(links[i]);
            map[links[i]] = true;
        }
    links  = a[index]['refs'];
    for(var i in links)
        if(!contains(wiredlinks, links[i], map)) {
            wiredlinks.push(links[i]);
            map[links[i]] = true;
        }

     // for newly added links add sub-links recursively
    for(var j=0; j < wiredlinks.length; ++j) {
        if(wiredlinks[j] == index) continue;
        if(typeof(a[wiredlinks[j]]) == 'undefined' || !a[wiredlinks[j]]) continue;
        
        links = a[wiredlinks[j]]['linked'];
        for(var i in links)
            if(!contains(wiredlinks, links[i], map)) {
                wiredlinks.push(links[i]);
                map[links[i]] = true;
            }

        links = a[wiredlinks[j]]['refs'];
        for(var i in links)
            if(!contains(wiredlinks, links[i], map)) {
                wiredlinks.push(links[i]);
                map[links[i]] = true;
            }
    }
}

// merges all authors of citatuons in one array
function fillAuthors(target, a, index, za)
{
    // map is cache of all values for fast contains check
    var map = new Array();
    for(var i in target) map[target[i]] = true;

    var refs = za;
    for(var i in refs) {
     // if(refs[i] == index) continue;
        if(typeof(a[refs[i]]) == 'undefined' || !a[refs[i]]) continue;

        var author = a[refs[i]]['author'];
        if(contains(target, author, map)) continue;
        target.push(author);
        map[author] = true;
    }
    return target;
}

/* ---------------------------------------------------------------------
    Implementation: links creation
   --------------------------------------------------------------------- */

// add red color for text
function colorize(label) {
    if(label == 'Goblin' || label.indexOf('FVL') >=0 || label == varAuthor ||
            label == 'Ecoross' || label == 'Gedeon' || label == 'Digger') 
        return '<font color=#ff2020>' + label + '</font>';
    if(label.indexOf('oper.ru') >=0)
        return '<font color=#ff2020>' + label + '</font>';
    return label;
}

// makes links to filter by author
function mkAuthorLink(ref, label)
{
    var newElt = document.createElement('a');
    newElt.href = ref + '&name=' + label + '#comments';
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode(label));
    if(label == 'Goblin' || label.indexOf('FVL') >=0 || label == varAuthor) 
        newElt.style.color = '#ff2020';
    return newElt;
}

// makes link to reference in article
function mkRefLink(ref, label, index)
{
    var newElt = document.createElement('a');
    var pageIdx = Math.round((label - 1) / EltsOnPage - 0.5);
    var orgpIdx = Math.round((index - 1) / EltsOnPage - 0.5);
    var newref = '';

    if(pageIdx > 0)
        newref = ref + '&page=' + pageIdx + '#' + label;
    else if(EltsOnPage > 100) // page=all
        newref = ref + '&page=all#' + label;
    else
        newref = ref + '#' + label;

    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode('#' + label));
    if(label == index) newElt.style.color = '#ff2020';
    if(pageIdx!=orgpIdx) newElt.style.color = '#a0a0a0';
    if(this_is_IE)
        newElt.href='javascript:gmclick(-7,' + label + ',"' + newref + '")';
    else
        newElt.href='javascript:void(-7,' + label + ',"' + newref + '")';
    return newElt;
}

function mkAuthorLink_str(ref, label, jb)
{
    var color = (label == 'Goblin' || label.indexOf('FVL') > 0 || label == varAuthor 
            ? ' style="color:#ff2020;"' 
            : ' style="color: ' + jb[label] + ';"');

    return '<a class="text13" href="' + ref + '&name=' + label + '#comments"' + 
        color + '>' +
        label + '</a> ';
}

function makeBackLink()
{
    return '<br><a class="text13" href=\'javascript:void(-7,0,"-");\'>&nbsp;[<<]</a>';
}

function mkRefLink_str(ref, label, index)
{
    var pageIdx = Math.round((label - 1) / EltsOnPage - 0.5);
    var orgpIdx = Math.round((index - 1) / EltsOnPage - 0.5);
    var newref = '';

    if(pageIdx > 0)
        newref = ref + '&page=' + pageIdx + '#' + label;
    else if(EltsOnPage > 100)
        newref = ref + '&page=all#' + label;
    else
        newref = ref + '#' + label;

    if(this_is_IE)
        newref = 'javascript:gmclick(-7,' + label + ',"' + newref + '")';
    else
        newref = 'javascript:void(-7,' + label + ',"' + newref + '")';

    var color = '';    
    if(label == index) color = ' style="color:#ff2020;"'; 
    if(pageIdx!=orgpIdx) color = ' style="color:#a0a0a0;"';
    return '<a href=' + newref + ' class="text13"' + color + '>#' + label + '</a> ';
}

// convert koi8r to Unicode

var cpkoi8h='%E1%E2%F7%E7%E4%E5%F6%FA%E9%EA%EB%EC%ED%EE%EF%F0%F2%F3%F4%F5%E6%E8%E3%FE%FB%FD%FF%F9%F8%FC%E0%F1%C1%C2%D7%C7%C4%C5%D6%DA%C9%CA%CB%CC%CD%CE%CF%D0%D2%D3%D4%D5%C6%C8%C3%DE%DB%DD%DF%D9%D8%DC%C0%D1';
var cpkoi8u='%u0431%u0432%u0447%u0437%u0434%u0435%u0446%u044A%u0439%u043A%u043B%u043C%u043D%u043E%u043F%u0440%u0442%u0443%u0444%u0445%u0436%u0438%u0433%u044E%u044B%u044D%u044F%u0449%u0448%u044C%u0430%u0441%u0411%u0412%u0427%u0417%u0414%u0415%u0426%u042A%u0419%u041A%u041B%u041C%u041D%u041E%u041F%u0420%u0422%u0423%u0424%u0425%u0416%u0418%u0413%u042E%u042B%u042D%u042F%u0429%u0428%u042C%u0410%u0421';

function koiToU(lnk) {
    var j = -1; 
    for(;;) {
        j = lnk.indexOf('%', j + 1);
        if(j<0) break;
        if(j>0 && lnk[j+1]=='u') continue;
        var llh = lnk.substring(j, j+3);
        var idx = cpkoi8h.indexOf(llh);
        if(idx<0) continue;
        lnk = lnk.substring(0, j) + cpkoi8u.substring(idx / 3 * 6, idx / 3 * 6 + 6) + lnk.substring(j+3);
    }
    return lnk;
}

function utf8ToU(lnk) {
    return decodeURIComponent( lnk );
}

// make link bit smaller
function wrapLink(lnk) {
    if(!lnk) return lnk;
    if(lnk.indexOf('%') >=0){ 
     // lnk = koiToU(lnk);
     // lnk = unescape(lnk);
        lnk = utf8ToU(lnk);
    }
    if(lnk.indexOf('http://') == 0) lnk = lnk.substring(7);
    if(lnk.indexOf('www.') == 0) lnk = lnk.substring(4);
    if(lnk.lastIndexOf('/') == lnk.length - 1) lnk = lnk.substring(0, lnk.length - 1);
    return lnk;
}

/* ---------------------------------------------------------------------
    Implementation: don't click support
   --------------------------------------------------------------------- */

window.gOT = function(o) {
    if(o == null) return o;
    if(o.nodeName.toLowerCase() == "table") return o;
    return window.gOT(o.parentNode);
}

window.dkGo = function(article, lnk) {
    if(article && article != '0') {
        var a  = window.gmcache;
        if(!a || !a[article]) {
            window.gmNoClickBackPlane.push('' + document.location.href);
            document.location.replace(lnk);
            return;
        }

        var tbl = window.gOT(a[article]['to']);
        if(tbl && tbl.style.display == 'none') tbl.style.display = '';
        
        window.gmNoClickBackPlane.push('' + document.location.href);
        document.location.replace(lnk);
    }
    else {
        lnk = window.gmNoClickBackPlane.pop();
        if(lnk) document.location.replace(lnk);
    }
}

function initDontClickOption() { 
    window.dk_article = '';
    window.dk_link = '';
    window.dk_ref = null;
    window.gmcache = new Array();
    window.gmNoClickBackPlane = new Array();
    window.dk_time = 0;
}

window.gMOver = function(Ereignis) {
    if (!Ereignis) Ereignis = window.event;
    var jjs = this.href;

    var jsflag = jjs.indexOf("javascript:void(-7,") >= 0;
    if(jsflag) {
        var j = jjs.indexOf("javascript:void(-7,");
        var k  = jjs.indexOf(',', j + 20);
        var kind2  = jjs.substring(j + 19, k);
        k = jjs.indexOf('"');
        var k2 = jjs.indexOf('"', k + 1);
        var lnk= jjs.substring(k + 1, k2);

        // redirect to self link is strange
        // color fix is needed to FF compatibility
        var curColor = ('' + this.style.color).toLowerCase();
        if(curColor.indexOf('rgb(255, 32, 32)') >=0)   curColor = '#ff2020';
        if(curColor.indexOf('rgb(160, 160, 160)') >=0) curColor = '#a0a0a0';

        if(curColor!='#ff2020' && curColor != '#a0a0a0') {
            window.dk_article = kind2;
            window.dk_link = lnk;
            window.dk_time = new Date().getTime();
            window.dk_ref  = this;

            this.style.borderWidth = '1px';
            this.style.borderColor = 'red';
            this.style.borderStyle = 'solid';

            window.setTimeout(function() {
                if(window.dk_ref) {
                    window.dk_ref.style.borderColor = 'blue';
                    if(new Date().getTime() >= window.dk_time + TimeToAutoClick - TimeToAutoClick / 5)
                        window.dkGo(window.dk_article, window.dk_link);
                    window.dk_ref = null;
                }
            }, TimeToAutoClick);
        }
    }
}

window.gMOut = function() {
    this.style.borderStyle = 'none';
    this.style.borderWidth = '0px';
    window.dk_ref = null;
}

function addDontClickEvents(al)
{
    for (var i = 0; i < al.length; i++) {
        if (al[i].getAttributeNode("href")) {
            // only movements on links at page
            al[i].addEventListener('mouseover', window.gMOver, true);
            al[i].addEventListener('mouseout', window.gMOut, true);
        }
    }
}

/* ---------------------------------------------------------------------
    Implementation: motion support
   --------------------------------------------------------------------- */

var lastTableUsed = null;
var lastThreadUsed= 0;
var floatingDiv = null;

function addMotionSupport(table, index, noempty)
{
    if(!table) return;
    table.title = index;
    table.addEventListener('mouseover', !noempty ? gtOut2 : gtOver, false);
 // table.addEventListener('mouseout', gtOut, false);
}

function hiliteMe(a, goodIndex) 
{
    var orgpIdx = Math.round((goodIndex - 1) / EltsOnPage - 0.5);
    for(var j=0;j<a.length;++j) {
        var label = a[j].innerHTML; // label
        var pageIdx = Math.round((label.substring(1) - 1) / EltsOnPage - 0.5);
        if(label == 'Goblin' || label.indexOf('FVL') >=0 || 
                label == varAuthor || label == '#' + goodIndex) 
            a[j].style.color = '#ff2020';
        else if(label[0] == '#' && pageIdx != orgpIdx) 
            a[j].style.color = '#a0a0a0';        
        else if(DoNoClick && a.length < MaxLinksToNClick && 
                (label.substring(1, 3) == '[&' || (label[0] == '#' && pageIdx == orgpIdx))) 
            a[j].style.color = '#10e070';
        else if(label[0] == '#')
            a[j].style.color = '';
    }
}

function applyCitationHints(a, j, xdiv)
{
    if(!xdiv) xdiv = a[j]['divref'];
    var xdivstr = a[j]['added'];
    if(!xdivstr) return;

    for(;;) {
        var tmps = xdivstr.substring(0, 4);
        if(tmps == '<br>' || tmps == '<BR>') {
            xdivstr = xdivstr.substring(4);
            a[j]['added'] = xdivstr;
            continue;
        }
        break;
    }

    if(!xdiv) {
        xdiv = document.createElement('span');
        xdiv.className = 'text13';
        a[j]['divref'] = xdiv;

        xdiv.style.display = 'none';
        xdiv.innerHTML = xdivstr;
        xdiv.style.display = '';

        var elt = a[j]['to'];
        elt.parentNode.insertBefore(xdiv, elt.nextSibling);
    }
    else {
        xdiv.style.display = 'none';
        xdiv.innerHTML = xdivstr;
        xdiv.style.display = '';
    }
}

function removeCitationHints(a, j)
{
    var xdiv = a[j]['divref'];
    var xdivstr = a[j]['added_splash'];
    if(xdiv){
        xdiv.style.display = 'none';
        xdiv.innerHTML = xdivstr;
        xdiv.style.display = '';
    }
}

function makeFloatingDiv()
{
    if(!floatingDiv) {
        floatingDiv = document.createElement('div');
        floatingDiv.style.position = "absolute";
        floatingDiv.style.width = '210px';
        floatingDiv.style.display = 'none';
        floatingDiv.style.backgroundColor = '#101010';
        floatingDiv.style.borderColor = '#00E070';
        floatingDiv.style.borderWidth = '2px';
        floatingDiv.style.borderStyle = 'groove';
        floatingDiv.style.padding = '2px';
        floatingDiv.valign = 'top';
        document.getElementsByTagName('body')[0].appendChild(floatingDiv);
    }
}

function getOffsetY(a)
{
    if(!a || typeof(a) == "undefined" || a.tagName == 'BODY' || a.nodeName == 'BODY') return 0;
    return a.offsetTop + getOffsetY(a.offsetParent);
}

function gtOver(Ereignis) 
{
    if (lastTableUsed == this) return;
    if (!Ereignis) Ereignis = window.event;
    if (floatingDiv) floatingDiv.style.display = 'none';

    var a = window.gmcache;
    var j = this.title;

    if (lastTableUsed) {
        var sameThread = false;
        var za = a[j]['wiredlinks'];

        for(var k in za) {
            if(typeof(a[za[k]]) == "undefined" || !a[za[k]]) continue;
            if(za[k] == lastThreadUsed) {
                sameThread = true;
                break;
            }
        }
        if(!sameThread) gtOut2 ();
    }   
    lastThreadUsed= j;
    lastTableUsed = this;

    var za = a[j]['wiredlinks'];
    if(za.length < MaxLinksToNFloat) {
        for(var k in za) {
            if(typeof(a[za[k]]) == "undefined" || !a[za[k]]) continue;
            if(za[k] < j) continue;
            applyCitationHints(a, za[k]);
        }
        var xdiv = a[j]['divref'];
        if(xdiv) {
            var alist = xdiv.getElementsByTagName('a');
            if (DoNoClick && alist.length < 2*MaxLinksToNClick) addDontClickEvents(alist);
            hiliteMe(alist, j);
        }
    }
    else {
        // FIXME: too long thread, such floating needed here
        makeFloatingDiv();

        // floatingDiv.style.top = '100px';
        var xdiv = a[j]['table'];
        if (!xdiv) xdiv = a[j]['to'];
        if (xdiv) floatingDiv.style.top = '' + (29 + getOffsetY(xdiv)) + 'px';
        floatingDiv.style.left = '100px';
        
        floatingDiv.style.display = 'none';
        applyCitationHints(a, j, floatingDiv);
        var alist = floatingDiv.getElementsByTagName('a');
        hiliteMe(alist, j);
        if (DoNoClick && alist.length < 2*MaxLinksToNClick) addDontClickEvents(alist);
        floatingDiv.style.display = '';
    }
}

function gtOut2() 
{
    if(!lastTableUsed) return;

    var a = window.gmcache;
    var j = lastThreadUsed;
    
    if(!a[j]) return;
    var za = a[j]['wiredlinks'];
    for(var k in za) {
        if(typeof(a[za[k]]) == "undefined" || !a[za[k]]) continue;
        removeCitationHints(a, za[k]);
    }
    removeCitationHints(a, j);
    lastTableUsed = null;
}

function gtOut(Ereignis) 
{
    if (!Ereignis) Ereignis = window.event;
    var a = window.gmcache;
    var j = this.title;

    var za = a[j]['wiredlinks'];
    for(var k in za) {
        if(typeof(a[za[k]]) == "undefined" || !a[za[k]]) continue;
        removeCitationHints(a, za[k]);
    }
    removeCitationHints(a, j);
}

/* ---------------------------------------------------------------------
    Implementation: make citations on every comment, and authors/links ref tables
   --------------------------------------------------------------------- */
var authorsCache;
var authListCache;
var linksListCache;

function ts() { return (new Date()).getTime(); }

// builds citations for every comment
function makeCitations()
{
    var a = window.gmcache;
    var authors = new Array();
    var quotes  = new Array();
    var autrefs = new Array();

    // calculating base ref for page links
    var baseref = getBaseRef();

    // once we have citations we need to fill an arrays 
    //    [author, wrote=[...]]
    //    [index, referred_from=[...]]
    //    [index, referred_from_authors=[...]]

    var t1;
    if(ProfileOn) t1 = ts();
    var ta = 0;
    var twl= 0;
    var tsort = 0;
    var tt, ttstart;
    if(ProfileOn) ttstart = ts();

    var profile = new Array();
    var jeansBase= new Array();

    for(var j in a) {
        var author = a[j]['author'];
        var jeans = a[j]['jeans'];
        if(jeans) jeansBase[author] = jeans;

        if(!authors[author]) authors[author] = new Array();
        authors[author].push(j);

        var za = a[j]['wiredlinks'];
        if(za.length == 0) { // first time we counting wires; 
                             // for all other cases we just using the same data
            if(ProfileOn) tt = ts();
            fillWiredLinks(za, a, j);
            if(ProfileOn) twl += ts() - tt;

            if(ProfileOn) tt = ts();
            za.sort(NumCmp);
            if(ProfileOn) tsort += ts() - tt;

            a[j]['wiredlinks'] = za;
            for(var jk in za) {
                if(!za[jk] || !a[za[jk]]) continue;
                a[za[jk]]['wiredlinks'] = za;
            }

            if(!autrefs[j]) autrefs[j] = new Array();
            if(ProfileOn) tt = ts();
            fillAuthors(autrefs[j], a, j, za);
            autrefs[j].sort();
            if(ProfileOn) ta += ts() - tt;
        }
        if(ProfileOn) twl += ts() - tt;
    }
    var t2;
    if(ProfileOn) t2 = ts();
    if(ProfileOn) profile['find'] = t2 - t1;
    if(ProfileOn) profile['find.links'] = twl;
    if(ProfileOn) profile['find.sort.links'] = tsort;
    if(ProfileOn) profile['find.authors'] = ta;
    if(ProfileOn) t1 = ts();

    // first part - highlight FVL & Goblin
    // ... and add motion support
    for(var j in a) {
        var el2 = getOuterTable(a[j]['to']);
        if(!el2) continue;
        a[j]['table'] = el2;

        var el2ih = el2.innerHTML;
        if(el2ih.indexOf('FVL') >= 0 || 
                el2ih.indexOf(lblFVL) >=0 ||
                el2ih.indexOf('Goblin') >=0 ||
                el2ih.indexOf('Digger') >= 0 ||
                (varAuthor.length > 0 && el2ih.indexOf(varAuthor) >= 0)
        ) {
        //  el2.style.backgroundColor = 'blue';
            el2.style.borderWidth = '2';
            el2.style.borderColor = 'red';
            el2.style.borderStyle = 'solid';
        }
    }

    if(ProfileOn) t2 = ts();
    if(ProfileOn) profile['hlte'] = t2 - t1;
    if(ProfileOn) t1 = ts();

    // now we ready to add more links for every band piece
    var count = 0;
    twl = 0;
    for(var j in a) {
        var buf = new StringBuffer();
        var bufSplash = new StringBuffer();
        if(autrefs[j] && autrefs[j].length > 0) {
            if(links.length <= MaxLinksToNFloat) buf.append('<br><br>');
            buf.append('&nbsp;');
            bufSplash.append('<br><br>');
            for(var k in autrefs[j]) {
                buf.append(mkAuthorLink_str(baseref, autrefs[j][k], jeansBase));
                ++count;
                if(count % 2 == 0){ 
                    buf.append('<br>&nbsp;');
                    bufSplash.append('<br>');
                }
            }
            if(count % 2 != 0){ 
                buf.append('<br>');
                bufSplash.append('<br>');
            }
            buf.append('<br>&nbsp;');
            bufSplash.append('<br>');
        }

        // links
        var links = a[j]['wiredlinks'];
        if(links.length > 0) {
            var zeroIndex = 0;
            for(var jjk in links)
                if(typeof(a[links[jjk]]) != "undefined") {
                    zeroIndex = jjk;
                    break;
                }    

            if(links[zeroIndex] == j) {
                count = 0;
                for(var z in links) {
                    buf.append(mkRefLink_str(baseref, links[z], j));
                    ++count;
                    if(count % 5 == 0){ 
                        buf.append('<br>&nbsp;');
                        bufSplash.append('<br>');
                    }
                }
                if (DoNoClick){ 
                    buf.append(makeBackLink());
                    bufSplash.append('<br>');
                }
                buf.append('<br>&nbsp;' + mkLink_str('6,' + j, lblHide));
                bufSplash.append('<br>...');
                a[j]['added'] = buf.toString();
                a[j]['added_splash'] = links.length > MaxLinksToNFloat ? '' : bufSplash.toString();
            }
            else if(a[links[zeroIndex]]) { // use the same contenmts for all links in thread
                a[j]['added'] = a[links[zeroIndex]]['added'];
                a[j]['added_splash'] = a[links[zeroIndex]]['added_splash'];
            }

            if(DoMotion) {
                var el2 = a[j]['table'];
                addMotionSupport(el2, j, true);
            }
        }
        else {
            if(DoMotion) {
                var el2 = a[j]['table'];
                addMotionSupport(el2, j, false);
            }
        }
    }

    if(ProfileOn) t2 = ts();
    if(ProfileOn) profile['build'] = t2 - t1;
    if(ProfileOn) t1 = ts();

    // collecting authors statistic
    var autlist = new Array();
    for(var k in authors) autlist.push(k);
    autlist.sort();

    if(ProfileOn) t2 = ts();
    if(ProfileOn) profile['sort.authors'] = t2 - t1;
    if(ProfileOn) t1 = ts();

    // collecting extra links statistic: [author = [links], [refs]]
    var xlinks = new Array();
    for(var j in a) {
        var curll = a[j]['hrefs'];
        var author = a[j]['author'];
        for(var i=0;curll && i < curll.length; ++i) {
            var curlli = curll[i];
            if(!xlinks[author]) xlinks[author] = new Array();
            if(!xlinks[author]['links']) xlinks[author]['links'] = new Array();
            if(!xlinks[author]['refs'])  xlinks[author]['refs']  = new Array();

            if(!contains(xlinks[author]['refs'], j))       xlinks[author]['refs'].push(j);
            if(!contains(xlinks[author]['links'], curlli)) xlinks[author]['links'].push(curlli);
        }
    }

    if(ProfileOn) t2 = ts();
    if(ProfileOn) profile['stat'] = t2 - t1;
    if(ProfileOn) t1 = ts();

    // now we ready to add authors list at page with citations
    if(DoStats) {
        authorsCache = authors;
        authListCache= autlist;
        linksListCache= xlinks;

        var funName = this_is_IE ? 'gmclick' : 'void';
        var allElements, elt;
        allElements = document.getElementsByTagName('font');
        for (var i = 0; i < allElements.length; i++) {
            elt = allElements[i];
            if(elt.innerHTML.indexOf(lblComments) >=0) {
                if(ProfileOn) tt = ts();
                var sb = new StringBuffer();

                sb.append('<a href="javascript:'+funName+'(-4,1)">[' + lblAuthors + ']</a>');
                sb.append('<div id=citations1 style="display:none" align="center">');
                sb.append('</div>');

                sb.append('<a href="javascript:'+funName+'(-4,2)">[' + lblExLinks + ']</a>');
                sb.append('<div id=citations2 style="display:none" align="center">');
                sb.append('</div><br/>');

                if(ProfileOn) profile['extra.build'] = ts() - tt;
                if(ProfileOn) tt = ts();
                var xdiv = document.createElement('center');
                xdiv.className = 'text13';
                xdiv.style.display='none';
                xdiv.innerHTML = sb.toString();

                // siblibg 2 times to keep it below buttons added earlier
                elt.parentNode.insertBefore(xdiv, elt.nextSibling.nextSibling);
                xdiv.style.display='';
                if(ProfileOn) profile['extra.insert'] = ts() - tt;
                break;
            }
        }
        if(ProfileOn) t2 = ts();
        if(ProfileOn) profile['extra'] = t2 - t1;
        if(ProfileOn) t1 = ts();
    }

    cleanCache(false);
    if(ProfileOn) t2 = ts();
    if(ProfileOn) profile['clean'] = t2 - t1;
    if(ProfileOn) t1 = ts();

    if(!DoMotion) {
        for(var j in a) {
            var elt = a[j]['to'];
            var xdivstr = a[j]['added'];
            a[j]['added'] = null;
            a[j]['added_splash'] = null;

            var xdiv = document.createElement('span');
            xdiv.style.display='none';
            xdiv.className = 'text13';
            xdiv.innerHTML = xdivstr;
            elt.parentNode.insertBefore(xdiv, elt.nextSibling);
            xdiv.style.display = '';
        }

        if(ProfileOn) t2 = ts();
        if(ProfileOn) profile['insert'] = t2 - t1;
        if(ProfileOn) t1 = ts();
    }

    if(ProfileOn) profile['all'] = ts() - ttstart;

    if(ProfileOn && GM_log)
        for(var i in profile)
            GM_log(' ... makeCitations[' + i + '] = ' + (profile[i] / 1000.0) + 's');
}

/* ---------------------------------------------------------------------
    Implementation: navigation functions
   --------------------------------------------------------------------- */

function buildAuthorsCitations()
{
    var sb = new StringBuffer();
    var autlist = authListCache;
    var authors = authorsCache;
    var baseref  =getBaseRef();
    authListCache = null;
    var funName = this_is_IE ? 'gmclick' : 'void';

    sb.append('<br><table width=90% border=0 bgcolor="#303030"><tr><td class="text13" width=25%>' + lblAuthor + '</td><td class="text13">' + lblWrote + '</td></tr>');
    for(var k in autlist) {
     // authors[autlist[k]].sort();
        sb.append('<tr height=3><td colspan=3><hr color="#505050" noshade="noshade" size="1"></td></tr>');
        sb.append('<tr><td class="text13" valign=top><a href="' + baseref + '&name=' + autlist[k] + '#comments">'+colorize(autlist[k])+' (' + authors[autlist[k]].length + ')</a></td><td>');
        for(var x in authors[autlist[k]]) 
            sb.append('<a href=\'javascript:' + funName + '(-7,'+authors[autlist[k]][x]+',"#' + authors[autlist[k]][x] + '")\' class="text13">#' + authors[autlist[k]][x] + '</a>, ');
        sb.append('</td></tr>');
    }
    sb.append('</table>');
    return sb.toString();
}

function buildLinksCitations()
{
    var sb = new StringBuffer();
    var xlinks  = linksListCache;
    var authors = authorsCache;
    var funName = this_is_IE ? 'gmclick' : 'void';
    var baseref  =getBaseRef();

    linksListCache = null;

    sb.append('<br><table width=90% border=0 bgcolor="#303030"><tr><td class="text13" width=25%>' + lblAuthor + '</td><td class="text13" width="20%">' + lblWrote + '</td><td width="55%">' + lblExLinks + '</td></tr>');
    for(var k in xlinks) {
        sb.append('<tr height=3><td colspan=3><hr color="#505050" noshade="noshade" size="1"></td></tr>');
        sb.append('<tr><td class="text13" valign=top><a href="' + baseref + '&name=' + k + '#comments">'+ colorize(k) + '</a></td><td valign=top>');
        xlinks[k]['refs'].sort(NumCmp);
        for(var x in xlinks[k]['refs']) 
            sb.append('<a href="#' + xlinks[k]['refs'][x] + '" class="text13">#' + xlinks[k]['refs'][x] + '</a>, ');
        sb.append('</td><td>');
        for(var x in xlinks[k]['links']) 
            sb.append('<a class="text13" href="' + xlinks[k]['links'][x] + '">' + colorize(wrapLink(xlinks[k]['links'][x])) + '</a><br>');
        sb.append('</td></tr>');
    }
    sb.append('</table>');
    return sb.toString();
}

function showCitationsTable(kind2)
{
    var elt = document.getElementById('citations' + kind);
    if(elt.style.display == '') elt.style.display = 'none';
    else{ 
        if(elt.innerHTML.length == 0) 
            elt.innerHTML = kind2 == 1 ? buildAuthorsCitations() : buildLinksCitations();
        elt.style.display = '';
    }
}

function lookupFirstOnPage(za, now)
{
    var pageIdx = Math.round((now - 1) / EltsOnPage - 0.5);
    var retn = now;
    for(var j in za) {
        var jj = za[j];
        var zaIdx = Math.round((jj - 1) / EltsOnPage - 0.5);
        if(zaIdx != pageIdx) continue;
        if(jj - 0 < retn) retn = jj;
    }
    return retn;
}

// simply marks all links not hidden in array but checks current page boundaries.
function markAllNotHidden () {
    var curP = getCurrentPage();
    var idxs = unrollHiddenList();
    if(!idxs) return;

    for(var j=0;j<idxs.length;++j) 
        if(idxs[j] >= curP*EltsOnPage + 1 && idxs[j] <= curP * EltsOnPage + (EltsOnPage - 1))
            idxs[j] = 0;
    applyHiddenList(idxs);
}

// marks idx comment as hidden
function markAsHidden (idx, startIndex) {
    var idxs = unrollHiddenList();
    if(!idxs) idxs = new Array();

    for(var j=0;j<idxs.length;++j)
        if(idxs[j]==idx) return; // already hidden
    idxs[idxs.length] = idx;
    applyHiddenList(idxs);
}

// marks idx comment as not hidden
function markNotHidden (idx) {
    var idxs = unrollHiddenList();
    if(!idxs) return;
    for(var j=0;j<idxs.length;++j)
        if(idxs[j]==idx) idxs[j] = 0;
    applyHiddenList(idxs);
}

/* ---------------------------------------------------------------------
    Implementation: hide elements back
   --------------------------------------------------------------------- */

// applies hidden marks on page; useful at page load
function hideAlreadyHiddenLinks() {
    var idxs = unrollHiddenList();
    var a  = window.gmcache;
    if(!a || !idxs) return;

    for(var j=0;j<idxs.length;++j) {
        var index = idxs[j];
        if(typeof(a[index]) == "undefined" || !a[index]) continue;
        tbl = getOuterTable(a[index]['to']);
        if(tbl) tbl.style.display = 'none';
    }
}

/* ---------------------------------------------------------------------
    Implementation: hide/show of band of comments
   --------------------------------------------------------------------- */

// hide thread
function hideThread(index)
{
    var a  = window.gmcache;
    if(!a || !a[index]) return;

    var za = a[index]['wiredlinks'];
    var zaidx = lookupFirstOnPage(za, index);

    document.location.replace('#' + zaidx);

    var tbl = getOuterTable(a[index]['to']);
    if(tbl) tbl.style.display = 'none';
    markAsHidden(index, index);

    if(a[index]['divref']) a[index]['divref'].innerHTML = '';
    for(var j in za) {
        if(typeof(a[za[j]]) == "undefined" || !a[za[j]]) continue;
        tbl = getOuterTable(a[za[j]]['to']);
        if(tbl) tbl.style.display = 'none';
        markAsHidden(za[j], index);
        if(za[j]['divref']) za[j]['divref'].innerHTML = '';
    }
}

// show article if needed
function showArticle(index)
{
    var a  = window.gmcache;
    if(!a || !a[index]) return;
    var tbl = getOuterTable(a[index]['to']);
    if(tbl && tbl.style.display == 'none') tbl.style.display = '';
    markNotHidden(index);
}

// hide article if needed
function hideArticle(index)
{
    var a  = window.gmcache;
    if(!a || !a[index]) return;
    var tbl = getOuterTable(a[index]['to']);
    if(tbl) tbl.style.display = 'none';
    // markAsHidden() is not necessary here as it called from hideAllOnPage()
}

// mark all page articles as readed
function hideAllOnPage () {
    var curP = getCurrentPage();
    var idxs = unrollHiddenList();
    if(!idxs) idxs = new Array();
    var a  = window.gmcache;
    if(!a) return;

    for(var k=curP*EltsOnPage + 1;k <= curP * EltsOnPage + EltsOnPage; ++k) {
        var did = false;
        if(!a[k]) continue;
        for(var j=0;j<idxs.length;++j) {
            if(idxs[j] == k){
                did = true;
                break;
            }
        }
        if(did) continue;
        idxs[idxs.length] = k;
        hideArticle(k);
    }
    applyHiddenList(idxs);
}

/* ---------------------------------------------------------------------
    Implementation: extra menu on top/bottom of whole band
   --------------------------------------------------------------------- */

// outer links are marked by specific case as it handled out of the page scope
function mkLink(kind, label)
{
    var newElt = document.createElement('a');
    var funName = this_is_IE ? 'gmclick' : 'void';
    newElt.href='javascript:'+funName+'(-'+kind+')';
    newElt.myLink = true;
    newElt.kind = kind;
    newElt.title = label;
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode('[' + label + ']'));
    return newElt;
}

function mkLink_str(kind, label)
{
    var funName = this_is_IE ? 'gmclick' : 'void';
    return '<a id="link' + kind + '" class="text13" href="javascript:'+funName+'(-'+kind+')">[' + label + ']</a>';
}

function mkLink2(kind, kind2, label)
{
    var newElt = document.createElement('a');
    var funName = this_is_IE ? 'gmclick' : 'void';
    newElt.href='javascript:'+funName+'(-'+kind+',' + kind2 + ')';
    newElt.myLink = true;
    newElt.kind = kind;
    newElt.title = label;
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode('[' + label + ']'));
    return newElt;
}

function mk_FVL_Link(base, label, name)
{
    var newElt = document.createElement('a');
    newElt.href= base + '&name=' + name + '#comments';
    newElt.myLink = true;
    newElt.title = label;
    newElt.className = 'text13';
    newElt.style.backgroundColor = '#00003f';
    newElt.style.borderColor = 'red';
    newElt.style.borderWidth = '1px';
    newElt.style.borderStyle = 'groove';
    newElt.style.fontSize = '15pt';
    if(!this_is_IE) newElt.style.fontStyle = 'bold';
    //newElt.style.paddingLeft = '10px';
    //newElt.style.paddingRight= '10px';
    //newElt.style.marginLeft  = '10px';
    newElt.style.color = 'red';

    newElt.appendChild(document.createTextNode('[' + label + ']'));
    return newElt;
}

function mk_FVL_Link_2(base, label, name)
{
    var newElt = document.createElement('a');
    newElt.href= base + '&name=' + name + '#comments';
    newElt.title = label;
    newElt.className = 'text13';
    newElt.style.color = 'red';
    newElt.appendChild(document.createTextNode('[' + label + ']'));
    return newElt;
}

function mk_CenterPane(x){
    return x;
}

function mkReloadLink(base, label)
{
    var newElt = document.createElement('a');
    if(!this_is_IE)
        newElt.href= 'javascript:document.location.reload()';
    else
        newElt.href= 'javascript:gmreload()';
    newElt.title = label;
    newElt.className = 'text13';
    newElt.appendChild(document.createTextNode('[' + label + ']'));
    return newElt;
}

function makeDivWExtraLinks(base, hdr) {
    var xdiv = document.createElement('center');
    xdiv.className = 'text13';
    xdiv.id = hdr ? 'vk_up' : 'vk_down';

    // markers
    if(hdr) {
        if(isFVL)       xdiv.appendChild(mk_FVL_Link(base, 'FVL', '%E6%F7%EC%20%28FVL%29'));
        if(isGoblin)    xdiv.appendChild(mk_FVL_Link(base, 'Goblin', 'Goblin'));
        if(isEcoross)   xdiv.appendChild(mk_FVL_Link(base, 'Ecoross', 'Ecoross'));
        if(isGedeon)    xdiv.appendChild(mk_FVL_Link(base, 'Gedeon', 'Gedeon'));
        if(isDigger)    xdiv.appendChild(mk_FVL_Link(base, 'Digger', 'Digger'));
        if(isQuoted)    xdiv.appendChild(mk_FVL_Link(base, varAuthor, varAuthor));
        if(isFVL || isGoblin || isEcoross || isGedeon || isQuoted) xdiv.appendChild(document.createElement('br'));
    }

    if(hdr) {
        xdiv.appendChild(document.createElement('br'));
        xdiv.appendChild(mkLink2(1, 1, lblNoLabels));
        xdiv.appendChild(mkLink2(1, 2, lblMegaKamraden));
        xdiv.appendChild(mkLink2(1, 3, lblMegaKamradenButQuoted));
        xdiv.appendChild(document.createElement('br'));
        xdiv.appendChild(mkLink2(2, 3, lblTotalSite3));
        xdiv.appendChild(mkLink2(2, 4, lblTotalSite4));
        xdiv.appendChild(mkLink2(2, 5, lblTotalSite5));
        xdiv.appendChild(document.createElement('br'));
    }
    xdiv.appendChild(mkLink(3, lblShowBack));
    xdiv.appendChild(mkLink(5, lblHideAll));
    xdiv.appendChild(mkReloadLink(base, lblReload));
    xdiv.appendChild(document.createElement('br'));
    if(!hdr) xdiv.appendChild(document.createElement('br'));

    return xdiv;
}

/* ---------------------------------------------------------------------
    Implementation: main event listener
   --------------------------------------------------------------------- */

// adds links only after page was rendered and scripts was gone
function goLoad() {
    if(document.location.href.indexOf('&name=') > 0) return;

    // all means up to 10.000 comments
    EltsOnPage = document.location.href.indexOf('page=all') > 0 ? 10000 : 100 ;

    // don't clicking: initialization; should be as early as possible
    // and before buildBand
    initDontClickOption();

    // changes background color
    document.getElementsByTagName('body')[0].style.backgroundColor = '#202020';

    // finds author of comments (from form' autocompletion)
    var form = document.forms.item(1);
    varAuthor = form ? form.elements.item(2).value : 'unnamed';

    // pre-calculations: finding FVL, Goblin, etc, and collecting
    // all comments on page, without deep analysis
    window.gmcache = buildBand();

    // find comments section and add extra links
    var base = getBaseRef();
    var allElements, elt, xdiv;
    allElements = document.getElementsByTagName('font');
    for (var i = 0; i < allElements.length; i++) {
        elt = allElements[i];
        if(elt.innerHTML.indexOf(lblComments) >=0) {
            // add extra links here
            xdiv = makeDivWExtraLinks(base, true);
            elt.parentNode.insertBefore(xdiv, elt.nextSibling);
            break;
        }
    }

    allElements = document.getElementsByTagName('a');
    for (var i = 0; i < allElements.length; i++) {
        elt = allElements[i];
        if(elt.name!='down') continue;
        xdiv = makeDivWExtraLinks(base, false);
        elt.parentNode.insertBefore(xdiv, elt.nextSibling);
        break;
    }

    // hide too rich banners: /me only!!!
    // let Goblin get money from all others ;-)
    if(varAuthor == 'viklequick') {
        allElements = document.getElementsByTagName('div');
        for (var i = 0; i < allElements.length; i++) {
            elt = allElements[i];
            if(elt.id == 'topbanner' || elt.id.substring(0, 5) == 'banner') {
                elt.style.display='none';
            }
            if(elt.className=='banner' || elt.className == 'banners') {
                elt.style.display='none';
            }
        }
    }
    checkMegaPeopleIfExists();

    // hides already hidden links
    hideAlreadyHiddenLinks();

    // adds citations
    makeCitations();

    // adding don't clicking support
    if(DoNoClick && !DoMotion) addDontClickEvents(document.getElementsByTagName("a"));

    // cleanup
    cleanCache(true);
}

/* ---------------------------------------------------------------------
    Implementation: menu handler
   --------------------------------------------------------------------- */

// decode commands
function get2ndKind(href)
{
    var j = href.indexOf('javascript:void(-');
    var k = href.indexOf(')', j + 18);
    kind = href.substring(j + 19, k);
    return kind;
}

// http://oper.ru/news/read.php?t=1051603627#comments
// handle extra links were added
function doClickImpl(event) {
    // event.target is the element that was clicked
    if(event.target.href) {
        var j = event.target.href.indexOf('javascript:void(-');
        if( j >=0 ) {
            // kind is group of operations' prefix: 0..9
            var kind1 = event.target.href.substring(j + 16, j + 18);
            var kind2 = get2ndKind(event.target.href);
            var lnk = '';
            var rest = '';
            if(kind1 == '-7'){ 
                var k  = event.target.href.indexOf(',', j + 20);
                kind2  = event.target.href.substring(j + 19, k);

                k      = event.target.href.indexOf('"');
                var k2 = event.target.href.indexOf('"', k + 1);
                lnk= event.target.href.substring(k + 1, k2);
            }
            gmclick(kind1, kind2, lnk, rest);
        }
    }
}

// handle extra links were added
// 0 - reserved
// 1 - filter comments by alwaysShow and honoredLabels lists, 1-3, see dropCommentsImpl
// 2 - filter comments by jenas' color, 3..5
// 3 - show all hidden back
// 4 - authors' and links table, 1..2
// 5 - mark all as read
// 6 - hide specific thread (2nd arg)
// 7 - comments' extra links: jump to (2nd/3rd args)
// 8 - unused
// 9 - unused

function gmclick(kind, kind2, lnk, rest)
{
    if(kind == '-1') dropCommentsImpl(kind2 - 0);
    else if(kind == '-2') dropCommentsImpl(4, kind2 - 0);
    else if(kind == '-3') showCommentsBack();
    else if(kind == '-4') showCitationsTable(kind2 - 0);
    else if(kind == '-5') hideAllOnPage();
    else if(kind == '-6') hideThread(kind2);
    else if(kind == '-7'){ 
        if(kind2 != '0') {
            showArticle(kind2);
            window.gmNoClickBackPlane.push('' + document.location.href);
            document.location.replace(lnk);
        }
        else {
            lnk = window.gmNoClickBackPlane.pop();
            if(lnk) document.location.replace(lnk);
        }
    }
}

function gmreload() {
    var bref = getBaseRef();
    var cpid = getCurrentPage();
    if(cpid - '0' > 0) bref += '&page=' + cpid;
    bref += '&rdn=' + Math.random();
    bref += '#comments';
    document.location.replace(bref);
}

/* ---------------------------------------------------------------------
    Implementation: set events
   --------------------------------------------------------------------- */

if(!this_is_IE) {
    window.addEventListener("load", goLoad, false);
    document.addEventListener('click', doClickImpl, true);
}
else {
    goLoad();
}

/* ---------------------------------------------------------------------
    Implementation: scan other pages for mega-camrades
   --------------------------------------------------------------------- */

function checkMegaPeopleIfExists() {
    checkInPages('Gedeon');
    checkInPages('Ecoross');
    checkInPages('%E6%F7%EC%20%28FVL%29', 'FVL');
 // checkInPages('Goblin');
}

function checkInPagesCallback(name, text, name2) {
    if(name2==null) name2=name;
    var idx = text.indexOf(lblComments);
    if(idx < 0) idx = 0;

    if(text.indexOf(name2, idx) > 0) {
        var base = getBaseRef();
        var allElements, elt, xdiv;
        allElements = document.getElementsByTagName('font');

        for (var i = 0; i < allElements.length; i++) {
            elt = allElements[i];
            if(elt.innerHTML.indexOf(lblComments) > 0) {
                var ctx = mk_CenterPane(mk_FVL_Link_2(base, name2, name));
            //  elt = elt.prevSibling;
                elt = elt.nextSibling; // .nextSibling; // .nextSibling;
            //  elt = elt.nextSibling.nextSibling.nextSibling;
                elt.appendChild(ctx);
                //.nextSibling.nextSibling;
            //  elt = elt.nextSibling.nextSibling;
            //  elt.parentNode.insertBefore(ctx, elt.nextSibling);
                break;
            }
        }
    }
}

function checkInPages(name, name2)
{
    if(this_is_IE) {
        var req = PRO_xmlhttpRequest();
        req.open('GET', getBaseRef() + '&name=' + name + '#comments', true);
        req.send(null);
        checkInPagesCallback(name, req.responseText, name2);
    }
    else if(GM_xmlhttpRequest) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: getBaseRef() + '&name=' + name + '#comments',
            onload: function(responseDetails) {
                checkInPagesCallback(name, responseDetails.responseText, name2);
            }
        });
    }
}

/* -----------------------------------------
    PersistJS library, with Gears/Flash active
   -------------------------------------------- */

(function(){if(window.google&&google.gears){return;}
var factory=null;if(typeof GearsFactory!='undefined'){factory=new GearsFactory();}else{try{factory=new ActiveXObject('Gears.Factory');if(factory.getBuildInfo().indexOf('ie_mobile')!=-1){factory.privateSetGlobalObject(this);}}catch(e){if((typeof navigator.mimeTypes!='undefined')&&navigator.mimeTypes["application/x-googlegears"]){factory=document.createElement("object");factory.style.display="none";factory.width=0;factory.height=0;factory.type="application/x-googlegears";document.documentElement.appendChild(factory);}}}
if(!factory){return;}
if(!window.google){google={};}
if(!google.gears){google.gears={factory:factory};}})();if(typeof deconcept=="undefined")var deconcept=new Object();if(typeof deconcept.util=="undefined")deconcept.util=new Object();if(typeof deconcept.SWFObjectUtil=="undefined")deconcept.SWFObjectUtil=new Object();deconcept.SWFObject=function(swf,id,w,h,ver,c,quality,xiRedirectUrl,redirectUrl,detectKey){if(!document.getElementById){return;}
this.DETECT_KEY=detectKey?detectKey:'detectflash';this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(swf){this.setAttribute('swf',swf);}
if(id){this.setAttribute('id',id);}
if(w){this.setAttribute('width',w);}
if(h){this.setAttribute('height',h);}
if(ver){this.setAttribute('version',new deconcept.PlayerVersion(ver.toString().split(".")));}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}
if(c){this.addParam('bgcolor',c);}
var q=quality?quality:'high';this.addParam('quality',q);this.setAttribute('useExpressInstall',false);this.setAttribute('doExpressInstall',false);var xir=(xiRedirectUrl)?xiRedirectUrl:window.location;this.setAttribute('xiRedirectUrl',xir);this.setAttribute('redirectUrl','');if(redirectUrl){this.setAttribute('redirectUrl',redirectUrl);}}
deconcept.SWFObject.prototype={useExpressInstall:function(path){this.xiSWFPath=!path?"expressinstall.swf":path;this.setAttribute('useExpressInstall',true);},setAttribute:function(name,value){this.attributes[name]=value;},getAttribute:function(name){return this.attributes[name];},addParam:function(name,value){this.params[name]=value;},getParams:function(){return this.params;},addVariable:function(name,value){this.variables[name]=value;},getVariable:function(name){return this.variables[name];},getVariables:function(){return this.variables;},getVariablePairs:function(){var variablePairs=new Array();var key;var variables=this.getVariables();for(key in variables){variablePairs.push(key+"="+variables[key]);}
return variablePairs;},getSWFHTML:function(){var swfNode="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute('swf',this.xiSWFPath);}
swfNode='<embed type="application/x-shockwave-flash" src="'+this.getAttribute('swf')+'" width="'+this.getAttribute('width')+'" height="'+this.getAttribute('height')+'"';swfNode+=' id="'+this.getAttribute('id')+'" name="'+this.getAttribute('id')+'" ';var params=this.getParams();for(var key in params){swfNode+=[key]+'="'+params[key]+'" ';}
var pairs=this.getVariablePairs().join("&");if(pairs.length>0){swfNode+='flashvars="'+pairs+'"';}
swfNode+='/>';}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute('swf',this.xiSWFPath);}
swfNode='<object id="'+this.getAttribute('id')+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute('width')+'" height="'+this.getAttribute('height')+'">';swfNode+='<param name="movie" value="'+this.getAttribute('swf')+'" />';var params=this.getParams();for(var key in params){swfNode+='<param name="'+key+'" value="'+params[key]+'" />';}
var pairs=this.getVariablePairs().join("&");if(pairs.length>0){swfNode+='<param name="flashvars" value="'+pairs+'" />';}
swfNode+="</object>";}
return swfNode;},write:function(elementId){if(this.getAttribute('useExpressInstall')){var expressInstallReqVer=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(expressInstallReqVer)&&!this.installedVer.versionIsValid(this.getAttribute('version'))){this.setAttribute('doExpressInstall',true);this.addVariable("MMredirectURL",escape(this.getAttribute('xiRedirectUrl')));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}
if(this.skipDetect||this.getAttribute('doExpressInstall')||this.installedVer.versionIsValid(this.getAttribute('version'))){var n=(typeof elementId=='string')?document.getElementById(elementId):elementId;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute('redirectUrl')!=""){document.location.replace(this.getAttribute('redirectUrl'));}}
return false;}}
deconcept.SWFObjectUtil.getPlayerVersion=function(){var PlayerVersion=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){PlayerVersion=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");PlayerVersion=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(PlayerVersion.major==6){return PlayerVersion;}}
try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}
if(axo!=null){PlayerVersion=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}
return PlayerVersion;}
deconcept.PlayerVersion=function(arrVersion){this.major=arrVersion[0]!=null?parseInt(arrVersion[0]):0;this.minor=arrVersion[1]!=null?parseInt(arrVersion[1]):0;this.rev=arrVersion[2]!=null?parseInt(arrVersion[2]):0;}
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major)return false;if(this.major>fv.major)return true;if(this.minor<fv.minor)return false;if(this.minor>fv.minor)return true;if(this.rev<fv.rev)return false;return true;}
deconcept.util={getRequestParameter:function(param){var q=document.location.search||document.location.hash;if(q){var pairs=q.substring(1).split("&");for(var i=0;i<pairs.length;i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return pairs[i].substring((pairs[i].indexOf("=")+1));}}}
return"";}}
deconcept.SWFObjectUtil.cleanupSWFs=function(){var objects=document.getElementsByTagName("OBJECT");for(var i=0;i<objects.length;i++){objects[i].style.display='none';for(var x in objects[i]){if(typeof objects[i][x]=='function'){objects[i][x]=function(){};}}}}
if(deconcept.SWFObject.doPrepUnload){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);}
window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);}
if(Array.prototype.push==null){Array.prototype.push=function(item){this[this.length]=item;return this.length;}}
var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;Persist=(function(){var VERSION='0.1.0',P,B,esc,init,empty,ec;ec=(function(){var EPOCH='Thu, 01-Jan-1970 00:00:01 GMT',RATIO=1000*60*60*24,KEYS=['expires','path','domain'],esc=escape,un=unescape,doc=document,me;var get_now=function(){var r=new Date();r.setTime(r.getTime());return r;}
var cookify=function(c_key,c_val){var i,key,val,r=[],opt=(arguments.length>2)?arguments[2]:{};r.push(esc(c_key)+'='+esc(c_val));for(i=0;i<KEYS.length;i++){key=KEYS[i];if(val=opt[key])
r.push(key+'='+val);}
if(opt.secure)
r.push('secure');return r.join('; ');}
var alive=function(){var k='__EC_TEST__',v=new Date();v=v.toGMTString();this.set(k,v);this.enabled=(this.remove(k)==v);return this.enabled;}
me={set:function(key,val){var opt=(arguments.length>2)?arguments[2]:{},now=get_now(),expire_at,cfg={};if(opt.expires){opt.expires*=RATIO;cfg.expires=new Date(now.getTime()+opt.expires);cfg.expires=cfg.expires.toGMTString();}
var keys=['path','domain','secure'];for(i=0;i<keys.length;i++)
if(opt[keys[i]])
cfg[keys[i]]=opt[keys[i]];var r=cookify(key,val,cfg);doc.cookie=r;return val;},has:function(key){key=esc(key);var c=doc.cookie,ofs=c.indexOf(key+'='),len=ofs+key.length+1,sub=c.substring(0,key.length);return((!ofs&&key!=sub)||ofs<0)?false:true;},get:function(key){key=esc(key);var c=doc.cookie,ofs=c.indexOf(key+'='),len=ofs+key.length+1,sub=c.substring(0,key.length),end;if((!ofs&&key!=sub)||ofs<0)
return null;end=c.indexOf(';',len);if(end<0)
end=c.length;return un(c.substring(len,end));},remove:function(k){var r=me.get(k),opt={expires:EPOCH};doc.cookie=cookify(k,'',opt);return r;},keys:function(){var c=doc.cookie,ps=c.split('; '),i,p,r=[];for(i=0;i<ps.length;i++){p=ps[i].split('=');r.push(un(p[0]));}
return r;},all:function(){var c=doc.cookie,ps=c.split('; '),i,p,r=[];for(i=0;i<ps.length;i++){p=ps[i].split('=');r.push([un(p[0]),un(p[1])]);}
return r;},version:'0.2.1',enabled:false};me.enabled=alive.call(me);return me;}());empty=function(){};esc=function(str){return'PS'+str.replace(/_/g,'__').replace(/ /g,'_s');};C={search_order:['gears','localstorage','whatwg_db','globalstorage','flash','ie','cookie'],name_re:/^[a-z][a-z0-9_ -]+$/i,methods:['init','get','set','remove','load','save'],sql:{version:'1',create:"CREATE TABLE IF NOT EXISTS persist_data (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)",get:"SELECT v FROM persist_data WHERE k = ?",set:"INSERT INTO persist_data(k, v) VALUES (?, ?)",remove:"DELETE FROM persist_data WHERE k = ?"},flash:{div_id:'_persist_flash_wrap',id:'_persist_flash',path:'persist.swf',size:{w:1,h:1},args:{autostart:true}}};B={gears:{size:-1,test:function(){return(window.google&&window.google.gears)?true:false;},methods:{transaction:function(fn){var db=this.db;db.execute('BEGIN').close();fn.call(this,db);db.execute('COMMIT').close();},init:function(){var db;db=this.db=google.gears.factory.create('beta.database');db.open(esc(this.name));db.execute(C.sql.create).close();},get:function(key,fn,scope){var r,sql=C.sql.get;if(!fn)
return;this.transaction(function(t){r=t.execute(sql,[key]);if(r.isValidRow())
fn.call(scope||this,true,r.field(0));else
fn.call(scope||this,false,null);r.close();});},set:function(key,val,fn,scope){var rm_sql=C.sql.remove,sql=C.sql.set,r;this.transaction(function(t){t.execute(rm_sql,[key]).close();t.execute(sql,[key,val]).close();if(fn)
fn.call(scope||this,true,val);});},remove:function(key,fn,scope){var get_sql=C.sql.get;sql=C.sql.remove,r,val;this.transaction(function(t){if(fn){r=t.execute(get_sql,[key]);if(r.isValidRow()){val=r.field(0);t.execute(sql,[key]).close();fn.call(scope||this,true,val);}else{fn.call(scope||this,false,null);}
r.close();}else{t.execute(sql,[key]).close();}});}}},whatwg_db:{size:200*1024,test:function(){var name='PersistJS Test',desc='Persistent database test.';if(!window.openDatabase)
return false;if(!window.openDatabase(name,C.sql.version,desc,B.whatwg_db.size))
return false;return true;},methods:{transaction:function(fn){if(!this.db_created){var sql=C.sql.create;this.db.transaction(function(t){t.executeSql(sql,[],function(){this.db_created=true;});},empty);}
this.db.transaction(fn);},init:function(){var desc,size;desc=this.o.about||"Persistent storage for "+this.name;size=this.o.size||B.whatwg_db.size;this.db=openDatabase(this.name,C.sql.version,desc,size);},get:function(key,fn,scope){var sql=C.sql.get;if(!fn)
return;scope=scope||this;this.transaction(function(t){t.executeSql(sql,[key],function(t,r){if(r.rows.length>0)
fn.call(scope,true,r.rows.item(0)['v']);else
fn.call(scope,false,null);});});},set:function(key,val,fn,scope){var rm_sql=C.sql.remove,sql=C.sql.set;this.transaction(function(t){t.executeSql(rm_sql,[key],function(){t.executeSql(sql,[key,val],function(t,r){if(fn)
fn.call(scope||this,true,val);});});});return val;},remove:function(key,fn,scope){var get_sql=C.sql.get;sql=C.sql.remove;this.transaction(function(t){if(fn){t.executeSql(get_sql,[key],function(t,r){if(r.rows.length>0){var val=r.rows.item(0)['v'];t.executeSql(sql,[key],function(t,r){fn.call(scope||this,true,val);});}else{fn.call(scope||this,false,null);}});}else{t.executeSql(sql,[key]);}});}}},globalstorage:{size:5*1024*1024,test:function(){return window.globalStorage?true:false;},methods:{key:function(key){return esc(this.name)+esc(key);},init:function(){this.store=globalStorage[this.o.domain];},get:function(key,fn,scope){key=this.key(key);if(fn)
fn.call(scope||this,true,this.store.getItem(key));},set:function(key,val,fn,scope){key=this.key(key);this.store.setItem(key,val);if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=this.key(key);val=this.store[key];this.store.removeItem(key);if(fn)
fn.call(scope||this,(val!==null),val);}}},localstorage:{size:-1,test:function(){return window.localStorage?true:false;},methods:{key:function(key){return esc(this.name)+esc(key);},init:function(){this.store=localStorage;},get:function(key,fn,scope){key=this.key(key);if(fn)
fn.call(scope||this,true,this.store.getItem(key));},set:function(key,val,fn,scope){key=this.key(key);this.store.setItem(key,val);if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=this.key(key);val=this.getItem(key);this.store.removeItem(key);if(fn)
fn.call(scope||this,(val!==null),val);}}},ie:{prefix:'_persist_data-',size:64*1024,test:function(){return window.ActiveXObject?true:false;},make_userdata:function(id){var el=document.createElement('div');el.id=id;el.style.display='none';el.addBehavior('#default#userData');document.body.appendChild(el);return el;},methods:{init:function(){var id=B.ie.prefix+esc(this.name);this.el=B.ie.make_userdata(id);if(this.o.defer)
this.load();},get:function(key,fn,scope){var val;key=esc(key);if(!this.o.defer)
this.load();val=this.el.getAttribute(key);if(fn)
fn.call(scope||this,val?true:false,val);},set:function(key,val,fn,scope){key=esc(key);this.el.setAttribute(key,val);if(!this.o.defer)
this.save();if(fn)
fn.call(scope||this,true,val);},load:function(){this.el.load(esc(this.name));},save:function(){this.el.save(esc(this.name));}}},cookie:{delim:':',size:4000,test:function(){return P.Cookie.enabled?true:false;},methods:{key:function(key){return this.name+B.cookie.delim+key;},get:function(key,val,fn,scope){key=this.key(key);val=ec.get(key);if(fn)
fn.call(scope||this,val!=null,val);},set:function(key,val,fn,scope){key=this.key(key);ec.set(key,val,this.o);if(fn)
fn.call(scope||this,true,val);},remove:function(key,val,fn,scope){var val;key=this.key(key);val=ec.remove(key)
if(fn)
fn.call(scope||this,val!=null,val);}}},flash:{test:function(){if(!window.SWFObject||!deconcept||!deconcept.SWFObjectUtil)
return false;var major=deconcept.SWFObjectUtil.getPlayerVersion().major;return(major>=8)?true:false;},methods:{init:function(){if(!B.flash.el){var o,key,el,cfg=C.flash;el=document.createElement('div');el.id=cfg.div_id;document.body.appendChild(el);o=new SWFObject(this.o.swf_path||cfg.path,cfg.id,cfg.size.w,cfg.size.h,'8');for(key in cfg.args)
o.addVariable(key,cfg.args[key]);o.write(el);B.flash.el=document.getElementById(cfg.id);}
this.el=B.flash.el;},get:function(key,fn,scope){var val;key=esc(key);val=this.el.get(this.name,key);if(fn)
fn.call(scope||this,val!==null,val);},set:function(key,val,fn,scope){var old_val;key=esc(key);old_val=this.el.set(this.name,key,val);if(fn)
fn.call(scope||this,true,val);},remove:function(key,fn,scope){var val;key=esc(key);val=this.el.remove(this.name,key);if(fn)
fn.call(scope||this,true,val);}}}};var init=function(){var i,l,b,key,fns=C.methods,keys=C.search_order;for(i=0,l=fns.length;i<l;i++)
P.Store.prototype[fns[i]]=empty;P.type=null;P.size=-1;for(i=0,l=keys.length;!P.type&&i<l;i++){b=B[keys[i]];if(b.test()){P.type=keys[i];P.size=b.size;for(key in b.methods)
P.Store.prototype[key]=b.methods[key];}}
P._init=true;};P={VERSION:VERSION,type:null,size:0,add:function(o){B[o.id]=o;C.search_order=[o.id].concat(C.search_order);init();},remove:function(id){var ofs=C.search_order.indexOf(id);if(ofs<0)
return;C.search_order.splice(ofs,1);delete B[id];init();},Cookie:ec,Store:function(name,o){if(!C.name_re.exec(name))
throw new Error("Invalid name");if(!P.type)
throw new Error("No suitable storage found");o=o||{};this.name=name;o.domain=o.domain||location.hostname||'localhost.localdomain';this.o=o;o.expires=o.expires||365*2;o.path=o.path||'/';this.init();}};init();return P;})();

// ==/UserScript==
