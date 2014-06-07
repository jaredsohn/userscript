// ==UserScript==
// @name           rolldabeats collection tabulator
// @namespace      http://madmax.wash.st/~scott/userscripts
// @description    makes rolldabeats a bit more useable
// @include        http://www.rolldabeats.com/*
// ==/UserScript==

// ***************************
// Stuff for /collection/*
//     (a filtering table display)

var collectionTable;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) { return; }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}

function colourTable() {
    rows = collectionTable.getElementsByTagName("tr");
    for (var i=1; i < rows.length; i++) {
        thisRow = rows[i];
        thisRow.className = i%2==0?'even':'odd';
    }
}

function unique(col) {
    rows = collectionTable.getElementsByTagName("tr");
    unq = [];
    for (var i=1; i<rows.length; i++) {
        if ((rows[i].childNodes[col].firstChild.nodeType == 1) & (rows[i].childNodes[col].firstChild.tagName == 'span')) {

            tLast = rows[i].childNodes[col].firstChild.lastChild.textContent;
            tFirst = rows[i].childNodes[col].firstChild.firstChild.textContent;

            if (unq.indexOf(tFirst) == -1) {unq.push(tFirst);}
            if (unq.indexOf(tLast)  == -1) {unq.push(tLast);}
        } else {
            t = rows[i].childNodes[col].textContent;
            if (unq.indexOf(t) == -1) { unq.push(t); }
        }
    }
    return unq.sort();
}

function addFilters() {
    cols = collectionTable.getElementsByTagName("th");
    colNums = [0, 2];
    for (var i=0; i<colNums.length; i++) {
        s = document.createElement("select");
        u = unique(colNums[i]);
        s.options[0] = new Option('--All--', '');
        for (var v=0; v<u.length; v++) {
            s.options[v+1] = new Option(u[v]);
        }
        cols[colNums[i]].appendChild(document.createElement("br"));
        cols[colNums[i]].appendChild(s);
        s.id = colNums[i]; // a little dirty, perhaps

        s.addEventListener("change", function(evt) {
            s = collectionTable.getElementsByTagName("select");
            for (var i=0; i<s.length; i++) {
                if (s[i] != this) { s[i].value = ''; }
            }
            rows = collectionTable.getElementsByTagName("tr");
            col = this.id;
            num = 1;
            for (var i=1; i<rows.length; i++) {
                if (rows[i].childNodes[col].textContent.indexOf(this.value) == -1) {
                    rows[i].style.display = 'none';
                } else {
                    rows[i].style.display = '';
                    rows[i].className = num++%2 == 0? 'even':'odd';
                }
            }
        }, true);
    }
}

function makeRow(elementLabel, elementRelease, elementArtist, elementTitle) {
    myRow = document.createElement("tr");
    cellLabel = document.createElement("td");
    cellRelease = document.createElement("td");
    cellArtist = document.createElement("td");
    cellTitle = document.createElement("td");
    cellFormat = document.createElement("td");

    cellLabel.appendChild(elementLabel);
    cellRelease.appendChild(elementRelease);
    cellArtist.appendChild(elementArtist);

    fmt = /\s*\[.+\]\s*$/.exec(elementTitle.textContent);
    if (fmt) {
        fmt = fmt[0];
        cellFormat.appendChild(document.createTextNode(fmt.replace(/[\[\]\s]/g, '')));
        elementTitle.textContent = elementTitle.textContent.replace(/\s*\[.+\]\s*$/,'');
    }
    cellTitle.appendChild(elementTitle);

    myRow.appendChild(cellLabel);
    myRow.appendChild(cellRelease);
    myRow.appendChild(cellArtist);
    myRow.appendChild(cellTitle);
    myRow.appendChild(cellFormat);
    return myRow;
}

function makeCollectionTable() {
	var lineBreaks;
        collectionTable = document.createElement("table");
        collectionTable.cellSpacing = 0;
        collectionTable.width = "100%";
        header = document.createElement("tr");
        header.innerHTML = "<th>Label</th><th>Catalogue</th><th>Artist</th><th>Title</th><th>Format</th>";
        collectionTable.appendChild(header);

        content = document.getElementById("content");
        para = content.getElementsByTagName("p")[0];
        para.appendChild(document.createElement("br"));

        content.insertBefore(collectionTable, para);

	lineBreaks = para.getElementsByTagName("br");
        for (var i=0; i < lineBreaks.length; i++) {
            thisBreak = lineBreaks[i];
            t = thisBreak.previousSibling;
            if (t.textContent.substr(0, 3) != ' - ') {
                artist = t.textContent.substr(2, t.textContent.indexOf(' - ')-2);
                a = document.createTextNode(artist);
                t.textContent = t.textContent.substr(t.textContent.indexOf(' - ')+3);
                dummy = t;
            } else {
                t.textContent = t.textContent.substr(3);
                a = t.previousSibling;
                dummy = a.previousSibling;
                if (dummy.textContent == ' & ') {
                  span = document.createElement("span");
                  f = dummy.previousSibling;
                  new_dummy = f.previousSibling;
                  span.appendChild(f);
                  span.appendChild(dummy);
                  span.appendChild(a);
                  a = span;
                  dummy = new_dummy;
                }
            }
            c = dummy.previousSibling;
            dummy = c.previousSibling;
            l = dummy.previousSibling;
            collectionTable.appendChild(makeRow(l, c, a, t));
        }
        content.removeChild(para);
        addGlobalStyle('tr.even { background-color: #ffe; }');
        addGlobalStyle('tr.odd { background-color: #fef; }');
        colourTable();
        addFilters();
}


// *****************************
// Stuff for 
//         http://www.rolldabeats.com/artist/*
//         http://www.rolldabeats.com/label/*
//         http://www.rolldabeats.com/search/all/*

// this stuff whacks buttons all over the search results to add releases to
// your collection

function modifyCollection(action, releaseId, onload, onerror) {
// action is either "add" or "remove"
    data = 'action='+action+'&release_id='+releaseId;
    GM_xmlhttpRequest({
        url: "http://www.rolldabeats.com/alter_collection.php",
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        onload: onload,
        onerror: onerror,
        data: data
        });
}

function addCollection(releaseId, callback) { modifyCollection('add', releaseId, callback); }
function removeCollection(releaseId, callback) { modifyCollection('remove', releaseId, callback); }

function getReleaseId(href, releaseCode, callbackFunction) {
    function f(responseDetails) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(responseDetails.responseText, "application/xml");
        ct = doc.getElementById("commenttext");
        m = ct.textContent.match(/\((\d)+x\)/)
        if (m) {
            releaseData[releaseCode].collectionCount = m[1];
        }
        fields = doc.getElementById("collection_add").getElementsByTagName("input");
        for (var i=0; i<fields.length; i++) {
            if (fields[i].name == "release_id") {
                callbackFunction(fields[i].value);
            }
        }
    }
    function f_error(responseDetails) {
        alert("error fetching release information");
    }
    GM_xmlhttpRequest({url: href,
        method: 'GET',
        onload: f,
        onerror: f_error});
}

var releaseData = {};

function addButtonsForReleaseLink(lnk) {
    span = document.createElement("span");
    counter = document.createElement("span");
    lnk.parentNode.insertBefore(span, lnk);
    releaseCode = lnk.textContent;
    inCollection = testCollectionLink(lnk);
    if (!(releaseCode in releaseData)) {
        count = null;
        if (!inCollection) { count = 0; }
        if (lnk.parentNode.parentNode.className == "incollection") {
            // count the number of times this release is in the collection..
            c = lnk.nextSibling.nextSibling;
            // hopefully, c will be a <dfn> element
            count = c.textContent.length;
        }
        counter.innerHTML = {0: ' ', 1: '1', 2: '>1', null: '?'}[count];
        releaseData[releaseCode] = {'spanElements': [], 'collectionCount': count, 'release_id': null};
    }
    releaseData[releaseCode].spanElements.push(span);

    btnAdd = document.createElement("button");
    btnAdd.innerHTML = "add";
    span.appendChild(btnAdd);
    span.appendChild(counter);
    btnRemove = document.createElement("button");
    btnRemove.innerHTML = "remove";
    span.appendChild(btnRemove);

    f_add=function(href, releaseCode) {
        return function() {
            ppp = this.parentNode.parentNode.parentNode;
            if (ppp.tagName == "tr") {
                if (ppp.className.indexOf("incollection") == -1) {
                    ppp.className = ppp.className + " incollection";
                }
            }
            function incrementCount() {
                releaseData[releaseCode].collectionCount++;
                for (var i=0; i<releaseData[releaseCode].spanElements.length; i++) {
                    s = releaseData[releaseCode].spanElements[i];
                    s.childNodes[1].innerHTML = releaseData[releaseCode].collectionCount;
                    if (releaseData[releaseCode].collectionCount > 0) {
                        s.childNodes[2].disabled = "";
                    }
                }
            }
            if (!releaseData[releaseCode].release_id) {
                function rememberReleaseId(id) {
                    releaseData[releaseCode].release_id = id; 
                    addCollection(releaseData[releaseCode].release_id, incrementCount);
                }
                getReleaseId(href, releaseCode, rememberReleaseId);
            } else {
                addCollection(releaseData[releaseCode].release_id, incrementCount);
            }
        }
    }(lnk.href, releaseCode);
    f_remove = function(href, releaseCode) {
        return function() {
            ppp = this.parentNode.parentNode.parentNode;
            if (ppp.tagName == "tr") {
                if (releaseData[releaseCode].collectionCount == 1) {
                    ppp.className = ppp.className.split(' ')[0];
                }
            }
            function decrementCount() {
                releaseData[releaseCode].collectionCount--;
                for (var i=0; i<releaseData[releaseCode].spanElements.length; i++) {
                    s = releaseData[releaseCode].spanElements[i];
                    s.childNodes[1].innerHTML = releaseData[releaseCode].collectionCount;
                    if (releaseData[releaseCode].collectionCount == 0) {
                        s.childNodes[2].disabled = "disabled";
                    }
                }
            }
            if (!releaseData[releaseCode].release_id) {
                function rememberReleaseId(id) {
                    releaseData[releaseCode].release_id = id; 
                    removeCollection(releaseData[releaseCode].release_id, decrementCount);
                    
                }
                getReleaseId(href, releaseCode, rememberReleaseId);
            } else {
                removeCollection(releaseData[releaseCode].release_id, decrementCount);
            }
        }
    }(lnk.href, releaseCode);
    btnAdd.addEventListener("click", f_add, true);
    btnRemove.addEventListener("click", f_remove, true);
    if (releaseData[releaseCode].collectionCount === 0) {
        btnRemove.disabled = "disabled";
    }
}


function addButtons() {
all_links = document.getElementsByTagName("a");
for (var i=0; i<all_links.length; i++) {
    var thisLink = all_links[i];
    if (thisLink.href.substr(0, 35) == 'http://www.rolldabeats.com/release/') {
        //alert(thisLink.parentNode.parentNode.className);
        addButtonsForReleaseLink(thisLink);
    }
}
}

var myCollection = '';
var myCollectionXml = null;

function collectionLoaded(responseDetails) {
    myCollection = responseDetails.responseText;
    var parser = new DOMParser();
    myCollectionXml = parser.parseFromString(responseDetails.responseText, 'application/xml');
    addButtons();
}

function reEscape(chars) {
    result = '';
    for (var i=0; i<chars.length; i++) {
        if ('\\^$*+?.()|{}[]'.indexOf(chars.substr(i,1))) {
            result = result + '\\';
        }
        result = result + chars.substr(i,1);
    }
    return result;
}
function testCollection(release_code) { return myCollection.match(reEscape(release_code)); }
function testCollectionLink(release_link) {
  xp = myCollectionXml.evaluate("//a[@href='" + release_link.href + "']", myCollectionXml, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  return xp.length > 0;
}

l = document.location.href;
if (l.match(/http:\/\/www\.rolldabeats\.com\/(artist|label|search\/(all|title))\//)) {
    addGlobalStyle('button { font-size: 100%; padding: 0; background-color: #d0eef6; border: 1px solid #333; cursor: pointer; }');
    GM_xmlhttpRequest({
        'url': 'http://www.rolldabeats.com/collection',
        'method': 'GET',
        'onload': collectionLoaded
        });
}
else if (l.substr(0,38) == "http://www.rolldabeats.com/collection/") {
        makeCollectionTable();
}
