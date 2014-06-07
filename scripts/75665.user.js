// ==UserScript==
// @name           Macro Combat Compacter
// @namespace      kol.interface.unfinished
// @description    Compacts the divisions shown when using fight macros in KoL, displaying only the last.
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://127.0.0.1:*/fight.php*
// ==/UserScript==

//Version 1.1
// - also now shows effect gains/losses
//Version 1.0

function compact() {
    var hrs = document.evaluate( '//hr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    var stuff = [];
	var ids = 1;
    // gather contents
    for (var i=hrs.snapshotLength-1;i>=0;i--) {
        var hr2 = hrs.snapshotItem(i);
		var itemids = "";
        stuff[i] = document.createElement('div');
        stuff[i].setAttribute('class','compactDiv');
        while (hr2.previousSibling && hr2.previousSibling.tagName!='HR' && hr2.previousSibling.tagName!='BR') {
            var n = hr2.previousSibling;
            n.parentNode.removeChild(n);
			if (stuff[i].firstChild)
				stuff[i].insertBefore(n,stuff[i].firstChild);
			else
				stuff[i].appendChild(n);
        }
        stuff[i].setAttribute('style','display:none'); 
        hr2.parentNode.insertBefore(stuff[i],hr2);
        hr2.addEventListener('click',expandDivH,true);
        hr2.setAttribute('title','click to display round '+(i+1));
		var r = findAcquires(stuff[i]);
		if (r.length>0) {
			for (var j=0;j<r.length;j++) {
				itemids = itemids + " " + ids;
				r[j].setAttribute('id','compactAcquire_'+ids);
				ids++;
				stuff[i].parentNode.insertBefore(r[j],stuff[i]);
			}
			stuff[i].setAttribute('compactAcquire',itemids);
		}
    }
}

// delete any duplicated item/meat acquisitions
function removeAcquires(alist) {
	var aa = alist.split(' ');
	for (var i=0;i<aa.length;i++) {
		if (aa[i]) {
			var r = document.getElementById('compactAcquire_'+aa[i]);
			if (r) {
				r.parentNode.removeChild(r);
			}
		}
	}
	
}

// expand a single div and delete any item/meat acquisitions
function expandDiv(d) {
    var s = d.getAttribute("style");
    if (s.match(/display\s*:\s*none\s*;?/i)) {
        d.setAttribute("style",s.replace(/display\s*:\s*none\s*;?/i,''));
		var itemlist = d.getAttribute('compactAcquire');
		if (itemlist) {
			removeAcquires(itemlist);
		}
	}
}

// handler for introduced divs
function expandDivH() {
    var d = this.previousSibling;
    if (d && d.tagName=='DIV') {
        expandDiv(d);
    }
	this.removeEventListener('click',expandDivH,true);
}

// expand all divs handler
function expandAllDivs(e) {
    var ds = document.getElementsByClassName('compactDiv');
    if (ds) {
        for (var i=0;i<ds.length;i++) {
            expandDiv(ds[i]);
        }
    }
}

// change the jump to bottom button to an expand all rounds button
function addExpandAll() {
    var b = document.getElementById('jumptobot');
    b.addEventListener('click',expandAllDivs,false);
    b.setAttribute('title','click to expand all rounds');
    b.innerHTML = '(expand rounds)';
}

// return clones of all item/meat acquisitions from the supplied root element
function findAcquires(doc) {
    var r = [];
    var msg = ['.//td[text()="You acquire an item: "]',
               './/td[text()="You acquire an effect: "]',
               './/td[text()="You lose an effect: "]'];

    for (var m=0;m<msg.length;m++) {
        var ps = document.evaluate(msg[m],doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        if (ps.snapshotLength>0) {
            for (var i=0;i<ps.snapshotLength;i++) {
                var p = ps.snapshotItem(i).parentNode;
                while (p && p.tagName!='CENTER')
                    p = p.parentNode;
                if (p) {
                    r[r.length] = p.cloneNode(true);
                }
            }
        }
    }
    ps = document.evaluate('.//td[contains(text(),"Meat.")]',doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    if (ps.snapshotLength>0) {
        for (var i=0;i<ps.snapshotLength;i++) {
            var p = ps.snapshotItem(i);
            if (p.innerHTML && p.innerHTML.match(/You gain [0-9]+ Meat./)) {
                p = p.parentNode;
                while (p && p.tagName!='CENTER')
                    p = p.parentNode;
                if (p) {
                    r[r.length] = p.cloneNode(true);
                }
            }
        }
    }
    return r;
}

if (document.getElementById('jumptobot')) {
    compact();
    addExpandAll();
}
