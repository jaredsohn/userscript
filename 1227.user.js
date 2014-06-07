/* 
 deliciousbuddies.user.js
 Add buddies to side bar on your del.icio.us home page.

 USAGE:

 Adding a bud:
 1. Go to your delicious homepage: del.icio.us/userfoo.
 2. Click on del.icio.us/buds which should appear at top of right column.
 3. Type name of a bud in add.bud text input and hit enter.
 Removing a bud:
 1. Click (delete.bud) link at right of buddy's name in del.icio.us/buds 
    list.
 
 ...
 Special shout out to the author of this script:
 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/rsspanel.user.js
 Without it, this script would have taken me a lot longer to write. ;)
 ...
 One thing to note ... a little hackish, but we don't allow list view
 of tags, because this screws up my nested list of links for buds!  But
 cloud view is superior anyhow ;)
 ...
 Download the latest from:
 http://www.cc.gatech.edu/ugrads/d/dpaces/scripts/deliciousbuddies.user.js

 version: $Revision$
 date: $Date$
 author: Drew Smathers
*/

// ==UserScript==
// @name  del.icio.us/buds
// @author Drew Smathers
// @namespace http://xix.python-hosting.org/ns/del.icio.us/buds
// @description displays list of delicious buddies most recent links
// @include http://del.icio.us/*
// @exclude 
// ==/UserScript==

(function() {
    
    var dBaseUrl = 'http://del.icio.us/'
    var dBaseRssUrl = dBaseUrl + 'rss/';
    var gReq; // "native" XHR object
    var dDivs, dBudsLI, dBudsH3, dBudImage, dBudsTitleSpan, dRightColUL, dBudArray, dBudsList;
    var newlabel, newfold;

    function dBudInit() {

    
        /* first things first : see if we need to add/del bud */
        var actionVals = parseQuery();
        GM_log("parsed query: " + actionVals);
        if (actionVals.length == 2) {
            if (actionVals[0]) addBud(actionVals[0]);
            if (actionVals[1]) delBud(actionVals[1]);
        }

        cloudHack();
    
        dBudsLI = document.createElement('li');
        dBudsLI.setAttribute('class', 'bundle fold');
        dBudsTitleSpan = document.createElement('span');
        dBudsTitleSpan.appendChild(document.createTextNode('del.icio.us/buds'));
        dBudsH3 = document.createElement('h3');
        dBudsH3.setAttribute('class', 'label arrow');
        dBudsH3.appendChild(dBudsTitleSpan);
        dBudsList = document.createElement('ul');
        dBudsLI.appendChild(dBudsH3);
        var form = buildBudForm();
        dBudsLI.appendChild(form);
        form.appendChild(dBudsList);
        getElementsByClass(document, 'right', 'div')[0].setAttribute('class', 'cloud right'); // lil hack
        dRightColUL = getElementsByClass(document, 'right', 'div')[0].getElementsByTagName('ul')[0];
        /* put her at the top */
        var firstLi = dRightColUL.getElementsByTagName('li')[1];
        dRightColUL.insertBefore(dBudsLI, firstLi);
        GM_log('appended li to right column list');
             
        makeDeliciousFold(dBudsLI, dBudsH3, dBudsTitleSpan);

        dBudArray = GM_getValue('dBuds', '').split(' ');
        dBudArray = dBudArray[0].length? dBudArray : [];
        GM_log("buddies : " + dBudArray);
        for (var i = 0; i < dBudArray.length; i++) {
            GM_log("(init) Added buddy " + dBudArray[i]);
            rssRequest(dBaseRssUrl + dBudArray[i]);
        } 
    }

    function makeDeliciousFold(fold, label, span) {
        //ffhack();
        label.label = span.innerHTML.replace(/[ ;]+/g,'');
        Fold.makeArrow(label, 'd');
                    
        newfold = document.createElement('li');
        newfold.className = fold.className; swapClass(newfold, 'fold', 'grey');
        
        newlabel = label.cloneNode(true);
        newlabel.getElementsByTagName('img')[0].src="/img/arrow.r.gif";
        
        newfold.appendChild(newlabel);
        fold.parentNode.insertBefore(newfold,fold);
        
        if(Fold.folded[label.label]) { newfold.style.display = 'block'; fold.style.display = 'none'; }
        else newfold.style.display = 'none';
        
        label.style.cursor = newlabel.style.cursor = 'pointer';
        label.onclick = Fold.makeToggle(newfold, fold, label.label, true);
        newlabel.onclick = Fold.makeToggle(fold, newfold, label.label);
    }

    function cloudHack() {
        listPatt = /settagview=list/;
        cloudPatt = /settcloudview=list/;
        anchors = document.getElementsByTagName('a');
        for (var i = 0; i < anchors.length; i++) {
            href = anchors[i].getAttribute('href');
            if (cloudPatt.test(href)) {
                document.location = href;
            }
            if (listPatt.test(href)) {
                anchors[i].style.display = 'none';
            }
        }
    }

    function buildBudForm() {
        var form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.setAttribute('action', '');
        form.setAttribute('name', 'dAddBudForm');
        var addLabel = document.createElement('span');
        addLabel.setAttribute('class', 'meta');
        addLabel.appendChild(document.createTextNode('add.bud: '));
        var addInput = document.createElement('input');
        addInput.setAttribute('size', '10');
        addInput.setAttribute('name', 'dBudAdd');        
        var hiddenDelInput = document.createElement('input');
        hiddenDelInput.setAttribute('type', 'hidden');
        hiddenDelInput.setAttribute('name', 'dBudDel');
        hiddenDelInput.setAttribute('value', '');
        form.appendChild(addLabel);
        form.appendChild(addInput);
        form.appendChild(hiddenDelInput);
        return form;
    }

    function addBud(bud) {
        /* make sure bud hasn't been added already */
        GM_log("adding buddy " + bud);
        var buds = GM_getValue('dBuds', '').split(' ');
        GM_log("(addBud) buddies: " + buds);
        buds = buds[0].length? buds : [];
        for (var i = 0; i < buds.length; i++) {
            if (buds[i] == bud) {
                GM_log("Buddy " + bud + " already added");
                return;
            }
        }
        /* Add the new buddy */
        var newBuds = new Array(buds.length + 1);
        for (var i = 0; i < buds.length; i++) {
            newBuds[i] = buds[i];
        }
        newBuds[buds.length] = bud;
        GM_setValue('dBuds', newBuds.join(' '));
    }

    function delBud(bud) {
        GM_log('deleting bud ' + bud);
        var buds = GM_getValue('dBuds', '').split(' ');
        if (!buds.length) return;
        var newBuds = new Array(buds.length - 1);
        var idx = 0;
        try { // just to be sane
            for (var i = 0 ; i < buds.length; i++) {
                if (buds[i] != bud) newBuds[idx++] = buds[i];
            }
        } catch (e) {
            GM_log('Tried to remove buddy that doesn\'t exist! (' + bud + ')');
            return;
        }
        GM_setValue('dBuds', newBuds.join(' '));
    }

    function parseQuery() {
        var query = "" + window.location;
        GM_log(window.location);
        var expected = ['dBudAdd', 'dBudDel'];
        try {
            var values = new Array(2);
            var fields = query.split('?')[1].split('&');
            GM_log("fields : " + fields);
            for (var i = 0; i < 2; i++) {
                if (fields[i].split('=')[0] != expected[i]) return [];
                values[i] = fields[i].split('=')[1];
            }
            return values;
        } catch (e) {
            GM_log("Exception occured while parsing fields : " + e);
            return [];
        }
    }

    function errLog(msg) {
        if (typeof(GM_log == "function")) {
            GM_log(msg);
        } else {
            window.status = msg;
        }
    }
       
    function rssRequest(src) {
        if (! src) return;
        if (typeof(GM_xmlhttpRequest) == 'function') {
            GM_log("Making request for rss source " + src);
            GM_xmlhttpRequest(
                {
                    method: 'GET', 
                    url: src,
                    headers: {
                            'User-agent': 'Mozilla/4.0 (compatible) GM Delicious Buds',
                    },
                    onload: rssResponse,
                });
        } else {
            // handle feed through "native" XHR object
            try {
                gReq = (typeof(XMLHttpRequest) == "object") ?
                    new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                errLog((e.message) ? e.message : e.toString());
                return;
            }
            try {
                gReq.onreadystatechange = rssResponse;
                gReq.open("GET", src);
                gReq.send(null);
            } catch(e) {
                errLog((e.message) ? e.message : e.toString());
            }
        }
    }

    function rssResponse(resource) {
        GM_log("Got response with resource " + resource);
        if (resource) gReq = resource; // for GM_XHR
        if (gReq.readyState == 4) {
            if (gReq.status == 200) {
                GM_log("Status OK ... initializing parser");
                var parser = new DOMParser();
                var DOM = parser.parseFromString(gReq.responseText, "application/xhtml+xml");
                rssRender(DOM);
            } else {
                errLog("XHR response: " + gReq.statusText);
            }
        }
    }

    function domGetElements(node, elm) {
        var list = node.getElementsByTagName(elm);
        return (list.length) ? list : node.getElementsByTagNameNS("*", elm); 
    }

    function domGetFirstNodeValue(node, elt) {
        try {
            var list = domGetElements(node, elt);
            return list[0].firstChild.nodeValue;
        } catch (e) {
            errLog("missing element " + elt);
            return "";
        }
    }

   function domCreateLink(url, txt, title) {
        var a  = document.createElement("a");
        a.setAttribute("href", url);
        if (title) a.setAttribute("title", title);
        a.appendChild(document.createTextNode(txt));
        return a;
    }

    function rssRender(DOM) {
        
        var title = domGetElements(DOM, 'title')[0].firstChild.nodeValue;
        if (!title) {
            GM_log("Title element of rss feed empty!");
            return;
        }
        GM_log("title is : " + title);
        
        var bName = title.substr(12);
        var dBudNameH4 = document.createElement('h4');
        var dBudNameSpan = document.createElement('span');
        var dBudLI = document.createElement('li');
        dBudLI.setAttribute('class', 'bundle fold options');
        dBudNameH4.setAttribute('class', 'label arrow');
        dBudNameSpan.appendChild(document.createTextNode(bName + ' '));
        dBudNameH4.appendChild(dBudNameSpan);
        var dBudDelAnchor = document.createElement('a');
        dBudDelAnchor.setAttribute('href', '?dBudAdd=&dBudDel='+bName);
        dBudDelAnchor.appendChild(document.createTextNode('(delete.bud)'));
        dBudDelAnchor.style.color = '#e66';
        dBudDelAnchor.style.fontSize = '79%';
        dBudNameH4.appendChild(dBudDelAnchor);

        var recentItemsList = document.createElement('ul');
        var items;
        try {
            items = domGetElements(DOM, 'item');
        } catch (e) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode("No items!"));
            recentItemsList.appendChild(li);
            return;
        }
        
        // ... a link to bookmarks
        var li = document.createElement('li');
        var bkmrk = domCreateLink(
            dBaseUrl + bName,
            '(' + bName + '.bookmarks' + ')',
            'Bookmarks page for bud: ' + bName); 
        //bkmrk.setAttribute('class', 'meta');
        bkmrk.style.fontSize = '77%';
        //bkmrk.style.marginBottom = '23px';
        bkmrk.style.color = '#333';
        bkmrk.style.backgroundColor = '#bbe';
        bkmrk.style.padding = '2px';
        li.appendChild(bkmrk);
        recentItemsList.appendChild(li);

        
        var count = (items.length < 10)? items.length : 10;
        for (var i = 0; i < count; i++) {
            var node = items[i]
            var desc = domGetFirstNodeValue(node, 'description');
            var ct = document.createElement('span');
            ct.setAttribute('class', 'meta');
            ct.appendChild(document.createTextNode((i+1) + '] '));
            var anchor  = domCreateLink(
                domGetFirstNodeValue(node, "link"),
                domGetFirstNodeValue(node, "title"),
                desc);
            var li = document.createElement('li'); 
            var dateSpan = document.createElement('span');
            dateSpan.setAttribute('class', 'meta');
            var date = domGetFirstNodeValue(node, "date");
            var dateTxt = ' (' + date.substr(0,10);
            var dateTxt = dateTxt + ' ' + date.substr(11,5) + ')'
            dateSpan.appendChild(document.createTextNode(dateTxt));
            li.appendChild(ct);
            li.appendChild(anchor);
            li.appendChild(dateSpan);
            recentItemsList.appendChild(li);
        }

        
        dBudLI.appendChild(dBudNameH4);
        dBudLI.appendChild(recentItemsList);
        dBudsList.appendChild(dBudLI);
        makeDeliciousFold(dBudLI, dBudNameH4, dBudNameSpan);
    }

    dBudInit();
 })()
