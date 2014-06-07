// ==UserScript==
// @name           Hagnks Favourites
// @namespace      kol.interface.unfinished
// @description    Allows you to save and recall sets of items from Hagnks in Kingdom of Loathing
// @include        http://*kingdomofloathing.com/storage.php*
// @include        http://127.0.0.1:*/storage.php*
// @version        1.0
// ==/UserScript==

// Version 1.0

// local copy of favourites
var favlist;

// get stored copy of favourites, or a default if none
function getFavs() {
    var favs = JSON.parse(GM_getValue('hagnkfavs','{"Frat Warrior outfit":[{"name":"beer helmet","number":"2069","qty":"1"},{"name":"bejeweled pledge pin","number":"2353","qty":"1"},{"name":"distressed denim pants","number":"2070","qty":"1"}],"War Hippy outfit":[{"name":"bullet-proof corduroys","number":"2032","qty":"1"},{"name":"reinforced beaded headband","number":"2337","qty":"1"},{"name":"round purple sunglasses","number":"2033","qty":"1"}]}'));
    favlist = favs;
    return favs;
}

// save current favlist 
function saveFavs() {
    GM_setValue('hagnkfavs',JSON.stringify(favlist));
}

var intervaltag;

function addNotice(t) {
    var n = document.getElementById('hagnkfavnotice');
    if (n) {
        if (n.firstChild)
            n.replaceChild(document.createTextNode(t),n.firstChild);
        else
            n.appendChild(document.createTextNode(t));
        if (intervaltag) {
            clearInterval(intervaltag);
            intervaltag = '';
        }
        n.style.color = '#000000';
        n.setAttribute('fade','000000');
        intervaltag = setInterval(function () {
                var c = n.getAttribute('fade');
                c = parseInt(c,16);
                c += parseInt('111111',16);
                c = c.toString(16);
                if (c.length>6) {
                    c = 'FFFFFF';
                    if (intervaltag)
                        clearInterval(intervaltag);
                    intervaltag = '';
                }
                n.style.color = '#'+c;
                n.setAttribute('fade',c);
            }, 100);
    }
}

function setNotice(t) {
    var n = document.getElementById('hagnkfavnotice');
    if (n) {
        if (n.firstChild)
            n.replaceChild(document.createTextNode(t),n.firstChild);
        else
            n.appendChild(document.createTextNode(t));
        if (intervaltag) {
            clearInterval(intervaltag);
            intervaltag = '';
        }
        n.style.color = '#000000';
        n.setAttribute('fade','000000');
    }
}

// create interface
function addSettings() {
    var x = document.evaluate( '//select[@name="whichitem1"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (x.singleNodeValue) {
        var p = x.singleNodeValue.parentNode.parentNode;
        var cell = p.insertCell(-1);
        cell.setAttribute('valign','top');

        var b = document.createElement('input');
        b.setAttribute('type','button');
        b.setAttribute('value','Save');
        b.setAttribute('title','Click this to save the current set of item selections.');
        b.addEventListener('click',saveButton,false);

        var bc = document.createElement('input');
        bc.setAttribute('type','button');
        bc.setAttribute('value','Clear selection');
        bc.setAttribute('title','Click this to reset each of the dropdowns on the left back to "-select an item-".');
        bc.addEventListener('click',clearButton,false);

        var ta = document.createElement('input');
        ta.setAttribute('type','textarea');
        ta.setAttribute('width','24');
        ta.setAttribute('id','hagnkfavname');
        ta.setAttribute('title','To add a new set, select the items (and quantities) from the dropdowns on the left, then enter the name of the favourite set here, and click save.  To delete a set, enter the name and click save without selecting any items.');

        var notice = document.createElement('div');
        notice.setAttribute('stle','font-height:small;');
        notice.setAttribute('id','hagnkfavnotice');

        var s = createFavSelect();
        
        cell.appendChild(s);
        cell.appendChild(document.createElement('br'));
        cell.appendChild(ta);
        cell.appendChild(document.createTextNode('\u00A0\u00A0'));
        cell.appendChild(b);
        cell.appendChild(document.createElement('br'));
        cell.appendChild(bc);
        cell.appendChild(document.createElement('br'));
        cell.appendChild(notice);
    }
}

// create the select bar
function createFavSelect() {
    var olds = document.getElementById('hagnkfavselect');
    var s = document.createElement('select');
    s.setAttribute('id','hagnkfavselect');

    s.addEventListener("change", doChoice, true);

    var favs = getFavs();
    var option = document.createElement('option');
    option.appendChild(document.createTextNode('-- Select Fav --'));
    option.setAttribute('value','');
    s.appendChild(option);
    for (f in favs) {
        option = document.createElement('option');
        option.appendChild(document.createTextNode(f));
        option.setAttribute('value',f);
        option.setAttribute('title',formatTT(favs[f]));
        s.appendChild(option);
    }
    if (olds) {
        olds.parentNode.replaceChild(s,olds);
    } else
        return s;
}

// format for tool-tip
function formatTT(f) {
    var t = '';
    for (var i=0;i<f.length;i++) {
        if (i>0)
            t += ', ';
        if (f[i].qty)
            t += f[i].qty+' '+f[i].name;
        else
            t += 'all '+f[i].name;
    }
    return t;
}

// get current hagnk selection state
function getState() {
    var state = [];
    for (var i=1;i<=11;i++) {
        var s = document.getElementsByName('whichitem'+i);
        if (s && s.length>0) {
            s = s[0];
            if (s.selectedIndex>0) {
                var n = s.options[s.selectedIndex].value;
                var nam = s.options[s.selectedIndex].innerHTML.replace(/\s*\([0-9]+\)\s*$/,'');
                var q = document.getElementsByName('howmany'+i);
                if (q && q.length>0) {
                    q = q[0].value;
                }
                state[state.length] = {name:nam,number:n,qty:q};
            }
        }
    }
    return state;
}

// handler for save button
function saveButton(e) {
    var n = document.getElementById('hagnkfavname');
    if (n && n.value) {
        var st = getState();
        if (st.length>0) {
            favlist[n.value] = st;
            addNotice('Saved fav: '+n.value);
        } else if (n.value in favlist) {
            delete favlist[n.value];
            addNotice('Deleted fav: '+n.value);
        }
        saveFavs();
        createFavSelect();
        n.value = '';
    } else {
        alert('You need to enter a name for the favourite in order to save it!');
    }
}

// change the current hagnk selection state to match 
// the given one
function setState(i,fi) {
    var s = document.getElementsByName('whichitem'+i);
	var rc = true;
    if (!s || s.length==0) {
        unsafeWindow.addlist();
        s = document.getElementsByName('whichitem'+i);
    }
    if (s && s.length>0) {
        s = s[0];
		s.selectedIndex = 0;
        var opts = s.options;
        for (var j=0;j<opts.length;j++) {
            if (opts[j].value==fi.number) {
                s.selectedIndex = j;
                rc = false;
				break;
            }
        }
		var q = document.getElementsByName('howmany'+i);
		if (q && q.length>0) {
			if (s.selectedIndex>0)
				q[0].value = fi.qty;
			else
				q[0].value = '';
		}
    }
	return rc;
}

// clear the given selection
function clearState(i) {
    var s = document.getElementsByName('whichitem'+i);
    if (s && s.length>0) {
        s = s[0];
        s.selectedIndex = 0;
        var q = document.getElementsByName('howmany'+i);
        if (q && q.length>0) {
            q[0].value = '';
        }
    }
}

// handler for clear button
function clearButton(e) {
    for (var i=0;i<=11;i++) {
        clearState(i);
    }
}

// handler for favourite selection
function doChoice(e) {
    if (this.selectedIndex>0) {
        var c = favlist[this.options[this.selectedIndex].value];
		var fail = false;
        if (c) {
            var i;
            setNotice('Loading fav ...');
            for (i=1;i<=c.length;i++) {
                fail |= setState(i,c[i-1]);
            }
            for (;i<=11;i++) {
                clearState(i);
            }
        }
        this.selectedIndex = 0;
		if (fail)
			addNotice('Item(s) not found!');
		else
			addNotice('Fav loaded!');
    }
}

addSettings();
