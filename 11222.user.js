// ==UserScript==
// @name           NewzLeech helper
// @namespace      http://madmax.wash.st/~scott/userscripts
// @description    Adds an RSS feed to newzleech's search results page, and makes entire rows clickable.. plus buggy shift-click support
// @include        http://www.newzleech.com/usenet/?*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) { return; }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}


function getByName(el, nm) {
    for (var i=0; i<el.length; i++) {
        f = el[i];
        if (f.name == nm) { return f; }
    }
}

function addRss(href) {
    head = document.getElementsByTagName("head")[0];
    link = document.createElement("link");
    link.rel = "alternate";
    link.type = "application/rss+xml";
    link.href = href;
    head.appendChild(link);
}

function keyToValue(select, id) {
    for (var i=0; i < select.options.length; i++) {
        opt = select.options[i];
        if (opt.value == id) {
            return opt.text;
        }
    }
}

function bookmarkCurrentSearch() {
    searchForm = getByName(document.forms, 'search');
    q = getByName(searchForm.elements, 'q').value;
    g = getByName(searchForm.elements, 'group');

    groupName = null;
    if (g.value) {
        groupName = keyToValue(g, groupId);
    }
    url = "http://www.newzleech.com/rss.php?s="+q;
    if (groupName) { url = url + '&g=' + groupName; }
    addRss(url);
}

function xpath(query) {
    return document.evaluate(
        query, 
        document,
        null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null);
}

setRow = function(row, check) {
    //row.setAttribute("title", "Click to " + ((check) ? "remove from" : "add to") + " selection");
    row.style.color = ((check) ? "#c00" : "black");
    row.style.backgroundColor = ((check) ? "#ffc" : "white");
    row.getElementsByTagName("input")[0].checked = check;
}

function easyClick() {
    addGlobalStyle('tr.contentcol:hover, tr.content:hover { background-color: #ffb ! important; cursor: pointer; }');

    var rows = xpath("//tr[td/input[@type='checkbox']]")
    r = rows.iterateNext();
    
    while (r) {
        r.addEventListener("click", function(evt) {
            var inp = this.getElementsByTagName("input")[0];
            if (evt.target.tagName == "A") { return false; } // ignore clicks on anchors
			
            if (evt.target != inp) inp.checked = !inp.checked;
            setRow(this, inp.checked);
            
            var storeValue = inp.checked;
            	
            if (evt.shiftKey && unsafeWindow.$last) { // handle shift-clicks
                window.getSelection().removeAllRanges(); // clear selected text
                var shiftRows = xpath("//tr[td/input[@type='checkbox']]");
                s = false;
                var thisrow = shiftRows.iterateNext();
                while (thisrow) {
                    var thisInp = thisrow.getElementsByTagName("input")[0];
                    if (thisInp.id == inp.id || thisInp.id == unsafeWindow.$last) {
                        setRow(thisrow, storeValue);
                        s = !s;
                    }
                    if (s)
                        setRow(thisrow, storeValue);
                    thisrow = shiftRows.iterateNext();
                }
            }
            unsafeWindow.$last = inp.id; // store clicked row for next time
			
            evt.stopPropagation();
        }, true);
        
        r = rows.iterateNext();
    }
}

bookmarkCurrentSearch();
easyClick();
