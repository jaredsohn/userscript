// ==UserScript==
// @name           BvS Item Organizer
// @namespace      BvS
// @include        http://*animecubed.com/billy/bvs/itemorderold*
// @description    Sort items by tags.
// ==/UserScript==
/*
Copyright (c) 2009 Daniel Karlsson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var ITEMS = [];
var INPUT_SAFETY_LINE;

function clean(tag)
{
	// Clean up a tag
	tag = tag.replace(/\s+/g, " ");
	tag = tag.replace(/^\s+/, "");
	tag = tag.replace(/\s+$/, "");
	tag = tag.replace(/[^\w\d\s]/g, "");
	return tag;
}

function Item()
{
	this.tags = [];
	this.inputNode = null;
	
	this.setTags = function(tags) {
		this.tags = tags.split(/,/);
		for (var i in this.tags)
			this.tags[i] = clean(this.tags[i]);
	}
	this.addTag = function(tag) {
		if (this.hasTag(tag))
			return;
		this.tags.push(tag);
	}
	this.removeTag = function(tag) {
		for (var i in this.tags)
			if (this.tags[i] == tag)
				this.tags.splice(i, 1);
	}
	this.hasTag = function(tag) {
		for (var i in this.tags)
			if (this.tags[i] == tag)
				return true;
		return false;
	}
	this.saveTags = function() {
		for (var i in this.tags)
			this.tags[i] = clean(this.tags[i]);
		this.tags.sort();
		GM_setValue(this.key, this.tags.join(","));
	}
}

function lockFlag(item)
{
	if (item.hasTag("locked"))
		return "<span title='Locked'>L</span>"
	return "";
}

function permFlag(item)
{
	if (item.hasTag("perm"))
		return "<span title='Permanent'>P</span>"
	return "";
}

function cmpItem(a, b)
{
	var d = a.sortKey - b.sortKey;
	if (d)
		return d;
	if (a.name > b.name)
		return 1;
	else if (a.name < b.name)
		return -1;
	return 0;
}

var trs = document.evaluate("//table[@class='stats']/tbody/tr", document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Scan item list and store items
var locked = false;
var icount = 0;
for (var i = 0; i < trs.snapshotLength; i++) {
	var tr = trs.snapshotItem(i);
	
	var perm = false;
	var b = tr.getElementsByTagName("b");
	if (b.length > 1)
		perm = true;
	b = b[b.length - 1];
	
	var name = b.innerHTML;
	if (name == "ITEM SAFETY LINE") {
		INPUT_SAFETY_LINE = tr.getElementsByTagName("input")[0].name;
		locked = true;
		continue;
	}

	var qty = 0;
	var match = tr.innerHTML.match(/Quantity: (\d.*)/);
	if (match)
		qty = parseInt(match[1].replace(/[^\d]/g, ""));
	
	ITEMS[icount] = new Item();
	ITEMS[icount].name = name;
	ITEMS[icount].key = name.replace(/[^\w\d]/g, "").toLowerCase();
	ITEMS[icount].qty = qty;

	// Check if we have saved tags
	if (GM_getValue(ITEMS[icount].key)) {
		ITEMS[icount].tags = GM_getValue(ITEMS[icount].key).split(",");
	} else {
		if (locked)
			ITEMS[icount].addTag("locked");
	}
	if (perm)
		ITEMS[icount].addTag("perm");
	else
		ITEMS[icount].removeTag("perm");
	
	ITEMS[icount].inputNodeName = tr.getElementsByTagName("input")[0].getAttribute("name");

	icount++;
}

function sortItemList()
{
	var table = document.getElementById("wrapper").getElementsByTagName("table")[0];
	
	var tbody = document.createElement("tbody");
	var oldtbody = document.getElementById("wrapper").getElementsByTagName("tbody")[0];
	if (oldtbody) {
		// Store tags before we replace the table
		for (i in ITEMS) {
			var tagInput = document.getElementsByName("tags" + ITEMS[i].key)[0];
			ITEMS[i].setTags(tagInput.value);
			ITEMS[i].saveTags();
		}
		table.replaceChild(tbody, oldtbody);
	} else
		table.appendChild(tbody);
	
	// Clean up the sort order input value
	var sortOrderInput = document.getElementsByName("sortOrder")[0];
	var sortOrder = sortOrderInput.value;
	sortOrder = sortOrder.split(",");
	var tagset = {};
	var tmplist = [];
	for (var i in sortOrder) {
		var reverse = /^\!/.test(sortOrder[i]);
		var tag = clean(sortOrder[i]);
		if (tag == "locked")
			continue; // Ignore, this will be inserted as first element later
		if (!tagset[tag]) {
			tmplist.push((reverse ? "!" : "") + tag);
			tagset[tag] = true;
		}
	}
	sortOrder = tmplist;
	sortOrder.splice(0,0,"!locked");
	sortOrderInput.value = sortOrder.join(",");
	GM_setValue("sortOrder", sortOrder.join(","));
	
	// Sort items
	for (var j in ITEMS)
		ITEMS[j].sortKey = 0;
	var n = 1.0;
	for (var i in sortOrder) {
		var tag = clean(sortOrder[i]);
		var vtag = 0, vntag = n;
		if (/^\!/.test(sortOrder[i])) {
			vtag = n;
			vntag = 0;
		}
		for (var j in ITEMS)
			ITEMS[j].sortKey += ITEMS[j].hasTag(tag) ? vtag : vntag;
		n /= 2;
	}
	ITEMS.sort(cmpItem);

	// Write new table and form
	var form = document.getElementById("wrapper").getElementsByTagName("form")[0];
	var icount = 1;
	var firstLocked = -1;
	for (var i in ITEMS) {
		var tr = document.createElement("tr");
		tbody.appendChild(tr);
		if (firstLocked == -1 && ITEMS[i].hasTag("locked"))
			firstLocked = icount;
		tr.innerHTML = "<td class='qty'>" + ITEMS[i].qty + "</td>" +
			"<td class='" + (ITEMS[i].hasTag("perm") ? "perm" : "item") + "'>" +
			ITEMS[i].name + "</td>" +
			"<td><input type='text' name='tags" + ITEMS[i].key + "' value='" +
			ITEMS[i].tags.join(",") + "'/></td>";
		document.getElementsByName(ITEMS[i].inputNodeName)[0].value =
			icount + (ITEMS[i].hasTag("locked") ? 1 : 0);
		icount++;
	}
	document.getElementsByName(INPUT_SAFETY_LINE)[0].value = firstLocked;
}

GM_addStyle("#wrapper {padding: 0; font-size: 12px; font-family: arial;}");
GM_addStyle("#wrapper table {font-size: 12px; width: 100%;}");
GM_addStyle("#wrapper thead {font-weight: bold;}");
GM_addStyle("#wrapper input {width: 100%;}");
GM_addStyle(".qty {text-align: right;}");
GM_addStyle(".item {font-weight: bold;}");
GM_addStyle(".perm {font-weight: bold; color: #A10000;}");

var name = document.evaluate("//input[@name='player']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
var pwd = document.evaluate("//input[@name='pwd']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
var oldForm = document.evaluate("//form[@name='reorg']", document, null,
	XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");
oldForm.parentNode.replaceChild(wrapper, oldForm);

wrapper.innerHTML = "" + <r><![CDATA[
<h3>Sort order</h3>
<p>
<input name="sortOrder" width="100%"/>
</p>
<p>
<a href="#">Update (Oi! Click this to apply tags and stuff)</a><br/>
<a href="javascript:document.reorg.submit();">Confirm Reorganization</a>
</p>
<table>
<thead>
<tr>
<td class="qty">Qty</td>
<td>Name</td>
<td>Tags</td>
</tr>
</thead>
</table>
<form method="post" action="itemorderold.html" name="reorg">
<input type="hidden" value="go" name="reorg" />
</form>
]]></r>

var form = wrapper.getElementsByTagName("form")[0];
var input = document.createElement("input");
input.setAttribute("type", "hidden");
input.setAttribute("name", "player");
input.setAttribute("value", name);
form.appendChild(input);
input = document.createElement("input");
input.setAttribute("type", "hidden");
input.setAttribute("name", "pwd");
input.setAttribute("value", pwd);
form.appendChild(input);

for (var i in ITEMS) {
	input = document.createElement("input");
	input.setAttribute("type", "hidden");
	input.setAttribute("name", ITEMS[i].inputNodeName);
	form.appendChild(input);
}
input = document.createElement("input");
input.setAttribute("type", "hidden");
input.setAttribute("name", INPUT_SAFETY_LINE);
form.appendChild(input);

var sortOrder = "!locked,!perm";
if (GM_getValue("sortOrder"))
	sortOrder = GM_getValue("sortOrder");
var sortOrderInput = document.getElementsByName("sortOrder")[0];
sortOrderInput.value = sortOrder;

sortItemList();

wrapper.getElementsByTagName("a")[0].addEventListener(
	'mousedown',
	function(event) {
		sortItemList();
		return;
	},
	true);
