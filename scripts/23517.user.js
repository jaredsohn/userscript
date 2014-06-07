// ==UserScript==
// @name           Wowhead Item Wishlist
// @namespace      wowhead
// @description    Adds an item wishlist to an item page
// @include        http://*wowhead.com/?item=*
// ==/UserScript==
//
// Script by Daedal, but because this is my first greater Greasemonkey script,
// I had to take a lot of help from other scripts, especially from WoWHead Equipment List.
// Credit goes to Jon Rock  who made that one :)
//
// The code may not be so clean yet, Ill clean it up later
//
function getElementByClass(parent, type, name) {
	var temp = parent.getElementsByTagName(type);
	for (var i = 0; i < temp.length; i++) {
		if (temp[i].className == name)
		 return temp[i];
	}
	return false;
}

function AddCurrent(evt) {
	var numitems = GM_getValue("numitems", 0);
	var loc = location.href;
	var aa = loc.indexOf("=")+1;
	var bb = loc.indexOf("#");
	var len = 5;
	if (bb != -1) { len = bb-aa; }
	var iidi = loc.substr(aa, len);
	var name0 = document.getElementById('tt'+iidi).getElementsByTagName("b")[0].innerHTML;
	var id0 = document.getElementById('tt'+iidi).getElementsByTagName("b")[0].className;
	numitems++;
	GM_setValue("item"+numitems+"name", name0);
	GM_setValue("item"+numitems+"qua", id0);
	GM_setValue("item"+numitems+"id", iidi);
	GM_setValue("numitems", numitems);	
	ReBuild();
}

function Clean() {
	var a, b, c, d, e;
	e = 0;
	var numitems = GM_getValue("numitems", 0);
	for (var i = 1; i <= numitems; i++)
	{
		a = GM_getValue("item"+i+"name", "error");
		if (a == "") {
			e = 1;
			b = GM_getValue("item"+(i+1)+"name", "");
			c = GM_getValue("item"+(i+1)+"qua", "");
			d = GM_getValue("item"+(i+1)+"id", "");
			GM_setValue("item"+i+"name", b);
			GM_setValue("item"+i+"qua", c);
			GM_setValue("item"+i+"id", d);
			GM_setValue("item"+(i+1)+"name", "");
			GM_setValue("item"+(i+1)+"qua", "");
			GM_setValue("item"+(i+1)+"id", "");
		}
	}
	
}

function ReBuild() {
	var Td = document.getElementById('WishList_infotable');
	Td.parentNode.removeChild(Td);
	var DiV = document.getElementById('WishList_items');
	var td = document.createElement("td");
	td.style.margin = '0 0 0 0';
	td.style.padding = '0 0 0 0';
	td.id = 'WishList_infotable';
	td.width='200px';
	BuildWishList(td);
	DiV.appendChild(td);
	}

function Remove(evt) {
	var el = evt['currentTarget'].id;
	var num = el.substr(3);
	GM_setValue("item"+num+"name", "");
	GM_setValue("item"+num+"qua", "");
	GM_setValue("item"+num+"id", "");
	Clean();
	var numitems = GM_getValue("numitems", 0);
	numitems--;
	GM_setValue("numitems", numitems);
	ReBuild();
}

function BuildWishList(inelement) {
	var numitems = GM_getValue("numitems", 0);
	for (var i = 1; i <= numitems; i++)
	{
	var a = document.createElement("a");
		var name1 = GM_getValue("item"+i+"name", "error");
		var qq1 = GM_getValue("item"+i+"qua", "error");
		var id1 = GM_getValue("item"+i+"id", "error");
		a.innerHTML = "["+name1+"]";
		a.className = qq1;
		a.style.textDecoration = 'none';
		a.href = '?item=' + id1;
		inelement.appendChild(a);
	var a = document.createElement("a");
		a.innerHTML = "&nbsp;&nbsp;x";
		a.id = 'del'+i;
		a.style.textDecoration = 'none !important';
		a.href = 'javascript:;';
		a.addEventListener('click', Remove, false);
		inelement.appendChild(a);
		var br = document.createElement("br");
		inelement.appendChild(br);
	}
}
	
	var wishlist = document.createElement("div");
	wishlist.className = 'minibox';
	wishlist.style.width = '200px';
	var div = document.createElement("div");
	div.id = 'WishList';
	div.style.marginTop = '-10px';
	div.style.position = 'relative';
	var table = document.createElement("table");
	table.id = 'WishList_table';
	table.width = '100%';
	table.colSpacing = '0';
	table.colPadding = '0';
	table.style.margin = '0 0 0 0';
	table.style.padding = '0 0 0 0';
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.style.padding = '4px';
	th.width = '100%';
	var span = document.createElement("span");
	span.id = 'CharData_toggletext';
	span.style.color = 'white !important';
	span.style.textDecoration = 'none';
	span.innerHTML = "Wishlist&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	span.style.cssFloat = 'center';
	th.appendChild(span);
	var a = document.createElement("a");
	a.innerHTML = "[add current]";
	a.style.textDecoration = 'none !important';
	a.href = 'javascript:;';
	a.addEventListener('click', AddCurrent, false);
	th.appendChild(a);
	tr.appendChild(th);
	table.appendChild(tr);
	var tr = document.createElement("tr");
	tr.id = 'WishList_items';
	tr.width='200px';
	var td = document.createElement("td");
	td.style.margin = '0 0 0 0';
	td.style.padding = '0 0 0 0';
	td.id = 'WishList_infotable';
	td.width='200px';
	BuildWishList(td);
	tr.appendChild(td);
	table.appendChild(tr);
	div.appendChild(table);
	div.style.visibility = 'visible';
	wishlist.appendChild(div);
	getElementByClass(document.getElementById('main-contents'), 'div', 'text').insertBefore(wishlist,document.getElementsByTagName('h1')[1]);