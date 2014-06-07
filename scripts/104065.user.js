// ==UserScript==
// @name           Hagnks Favourites
// @namespace      kol.interface.unfinished
// @description    Allows you to save and recall sets of items from Hagnks in Kingdom of Loathing
// @include        http://*kingdomofloathing.com/storage.php*
// @include        http://127.0.0.1:*/storage.php*
// @author	   Clump
// @contributor	   Charon the Hand
// @version        1.0
// ==/UserScript==

// Version 1.0
//heavily modified to cooperate with retro storage (after the great graphical storage revamp of ought 11)

if (!$('img[src *= "hagnk"]'))
	return
// local copy of favourites
var intervaltag, favlist = JSON.parse(GM_getValue('hagnkfavs','{"Frat Warrior outfit":[{"name":"beer helmet","number":"2069","qty":"1"},{"name":"bejeweled pledge pin","number":"2353","qty":"1"},{"name":"distressed denim pants","number":"2070","qty":"1"}],"War Hippy outfit":[{"name":"bullet-proof corduroys","number":"2032","qty":"1"},{"name":"reinforced beaded headband","number":"2337","qty":"1"},{"name":"round purple sunglasses","number":"2033","qty":"1"}]}'));

addSettings();

function addNotice(t) {
    var n = document.getElementById('hagnkfavnotice');
    if (n) {
        n.textContent = t
        if (intervaltag) {
            clearInterval(intervaltag);
            intervaltag = null;
        }
        n.style.color = '#000000';
        var index = 0
        intervaltag = setInterval(function () {
			var c = 16 * ++index
			n.style.color = 'rgb(' + c + ',' + c + ',' + c + ')';
			if (index == 16)
				clearInterval(intervaltag);
		}, 100);
    }
}

// create interface
function addSettings() {
	var cell = $('fieldset').parentNode.appendChild(CE('fieldset', 'valign|top', 'style|margin:0px 25px; padding:15px; border:solid black 2px;'));
	cell.appendChild(CE('legend', 'text|Favorite sets'))
	cell.appendChild(CE('br'));
	cell.appendChild(CE('input','type|text', 'style|width:240px; margin:10px', 'id|hagnkfavname', 'title|To add a new set, select the items (and quantities) from the dropdowns on the left, then enter the name of the favourite set here, and click save.  To delete a set, enter the name and click save without selecting any items.'));
	cell.appendChild(CE('input', 'type|button', 'class|button', 'value|Save', 'title|Click this to save the current set of item selections.')).addEventListener('click', saveButton, false)
	cell.appendChild(CE('br'));
	cell.appendChild(CE('input', 'type|button', 'class|button', 'value|Clear selection', 'title|Click this to reset all of the dropdowns.')).addEventListener('click', clearState, false);
	cell.appendChild(CE('br'));
	cell.appendChild(CE('div', 'id|hagnkfavnotice', 'style|font-size:10pt; height:1em;', 'text|'));
	cell.insertBefore(createFavSelect(), cell.firstChild);
}

// create the select bar
function createFavSelect() {
    var olds = $('#hagnkfavselect');
    var s = CE('select', 'id|hagnkfavselect')
    s.addEventListener("change", doChoice, true);
    var option = CE('option', 'value|', 'text|-- Select Fav --');
    s.appendChild(option);
    for (f in favlist) {
        s.appendChild(CE('option', 'value|' + f, 'text|' + f, 'title|' + formatTT(favlist[f])));
    }
    if (olds)
        olds.parentNode.replaceChild(s, olds);
    else
        return s;
}

// format for tool-tip
function formatTT(f) {
    var t = '';
    for (var i=0; i<f.length; i++) {
        if (i > 0)
            t += ', ';
        if (f[i].qty)
            t += f[i].qty + ' ' + f[i].name;
        else
            t += 'all ' + f[i].name;
    }
    return t;
}


// handler for save button
function saveButton(e) {
    var n = $('#hagnkfavname');
    if (n && n.value) {
        var st = getState();
        if (st.length > 0) {
            favlist[n.value] = st;
            addNotice('Saved fav: ' + n.value);
        } else if (n.value in favlist) {
            delete favlist[n.value];
            addNotice('Deleted fav: ' + n.value);
        }
		GM_setValue('hagnkfavs', JSON.stringify(favlist));
        createFavSelect();
        n.value = null;
    } else {
        alert('You need to enter a name for the favourite in order to save it!');
    }
}

// get current hagnk selection state
function getState() {
    var state = [];
   	var DDLs = $('select', true)
   	var len = DDLs.length - 2
    for (var i=0; i<len; i++) {
		var s = DDLs[i]
		if (s.selectedIndex > 0) {
			var n = s.options[s.selectedIndex].value;
			var nam = s.options[s.selectedIndex].textContent.match(/(.*)\s\(/)[1]
			var q = s.previousSibling.value
			state[state.length] = {name:nam, number:n, qty:q};
        }
    }
    return state;
}

// change the current hagnk selection state to match the given one
function setState(i, fi) {
	var rc = true;
   	var DDLs = $('select', true)
	var s = DDLs[i - 1]
    if (i != 1) 
    {
		var len = DDLs.length - 2
		if (i > len && len <= 10)
		{
			var clone = DDLs[0].parentNode.cloneNode(true)
			clone.firstChild.value = null
			DDLs[0].parentNode.parentNode.insertBefore(clone, DDLs[0].parentNode.nextSibling)
			s = clone.lastChild
		}
	}
	s.selectedIndex = 0;
	var opts = s.options;
	for (var j=0; j<opts.length; j++) {
		if (opts[j].value == fi.number) {
			s.selectedIndex = j;
			rc = false;
			break;
		}
	}
	var q = s.previousSibling
	if (s.selectedIndex > 0)
		q.value = fi.qty;
	else
		q.value = null;
	return rc;
}

// clear the given selection
function clearState(i) {
   	if (isNaN(i))
		i = 0
   	var DDLs = $('select', true)
   	var len = DDLs.length - 2
    for (;i<=len; i++) {
		var s = DDLs[i]
		var q = s.previousSibling
		s.selectedIndex = 0;
		q.value = null;
	}
}

// handler for favourite selection
function doChoice(e) {
    if (this.selectedIndex > 0) {
        var c = favlist[this.options[this.selectedIndex].value];
		var fail = false;
        if (c) {
            for (var i=1; i<=c.length; i++) {
                fail |= setState(i, c[i - 1]);
            }
            clearState(i - 1);
        }
        this.selectedIndex = 0;
		if (fail)
			addNotice('Item(s) not found!');
		else
			addNotice('Fav loaded!');
    }
}
function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag);
	for (var i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|');
		if (attr[0] == 'text')
			node.textContent = attr[1];
		else
			node.setAttribute(attr[0], attr[1]);
	}
	return node;
}

function $(selector, all)
{
	if (all)
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	else
		return document.querySelector(selector);
}
