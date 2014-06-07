// ==UserScript==
// @name           WoWArmory -> WoWHead Equipment List
// @namespace      WHCP
// @include        http://*wowhead.com/?item=*
// ==/UserScript==

var server = "US" //EU or US
var name = "CHANGE THIS" //Your Character's Name
var realm = "CHANGE THIS" //Your Character's Realm
var default_visibility = "Hidden" //Hidden or Shown

//Do not edit below here.

function GetArmoryData(realm, character, host) {
 GM_xmlhttpRequest({
    method: 'GET',
    url: "http://"+host+"/character-sheet.xml?r="+realm+"&n="+character+"",
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
        var items = dom.getElementsByTagName('item');
	GM_setValue('charname', dom.getElementsByTagName('character')[0].getAttribute('name'));
        for (var i = 0; i < items.length; i++) {
            item_id = items[i].getAttribute('id');
            item_icon = items[i].getAttribute('icon');
            item_slot = items[i].getAttribute('slot');
		GM_setValue(item_slot, item_id);
		GetItemData(item_id)
        }
    }
 });
}

function GetItemData(item_id) {
 GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.wowhead.com/?item="+item_id+"&xml",
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
        item_name = dom.getElementsByTagName('name')[0].textContent;
        item_quality = dom.getElementsByTagName('quality')[0].getAttribute('id');
        item_tooltip = dom.getElementsByTagName('htmlTooltip')[0].textContent;
	  test = GM_getValue(item_id, 0);
	  if (test == 0) {
	   GM_setValue(item_id, item_name);
	   GM_setValue(item_id+'_quality', item_quality);
	   GM_setValue(item_id+'_tooltip', item_tooltip);
	  }
    }
 });
}

function GetHost() {
	if (server == "US") { return 'www.wowarmory.com' } 
	if (server == "EU") { return 'eu.wowarmory.com' }
}

function RefreshArmory() {
      table = document.getElementById('CharData_itemtable');
      td = document.getElementById('CharData_infotable');
      if (table) 
       table.parentNode.removeChild(table);
	document.getElementById('CharData_titletext').innerHTML = "<img src=http://www.wowhead.com/images/loading.gif><img src=http://www.wowhead.com/images/loading2.gif>";

 for (var i = 0; i < 19; i++) {
 GM_setValue(i, 0);
 }
GetArmoryData(realm, name, GetHost());
setTimeout(PopulateItems, 5000)
}

ReturnTable();

function ReturnTable() {
	var minibox = document.createElement("div");
	minibox.className = 'minibox';
	minibox.style.width = '200px';
	var div = document.createElement("div");
	div.id = 'CharData';
	div.style.marginTop = '-10px';
	div.style.position = 'relative';

	var table = document.createElement("table");
	table.id = 'CharData_table';
	table.width = '100%';
	table.colSpacing = '0';
	table.colPadding = '0';
	table.style.margin = '0 0 0 0';
	table.style.padding = '0 0 0 0';

	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.style.padding = '4px';
	th.width = '100%';

	var a = document.createElement("a");
	a.id = 'CharData_toggletext';
	a.style.color = 'white !important';
	a.style.textDecoration = 'none';
	if (GM_getValue('charname', 0) != 0) {
	 if(default_visibility == 'Hidden') { a.innerHTML = '[+]'; } else { a.innerHTML = '[-]'; }
        } else {
         a.innerHTML = "";
        }
	a.addEventListener("click", Toggle, false);
	a.href = "javascript:;";
	a.style.cssFloat = 'right';

	th.appendChild(a);
	
	var a = document.createElement("a");
	a.id = 'CharData_titletext';
	a.style.cssFloat = 'left';
	a.style.color = 'white !important';
	a.style.textDecoration = 'none';
	if (GM_getValue('charname', 0) != 0) {
	 a.innerHTML = GM_getValue('charname', 0)+"'s Character Profile";
      } else {
       a.innerHTML = "Click Here.";
      }
	a.addEventListener("click", RefreshArmory, false);
	a.href = "javascript:;";

	th.appendChild(a);

	tr.appendChild(th);
	table.appendChild(tr);

	var tr = document.createElement("tr");
	tr.id = 'CharData_items';
	tr.width='200px';

	var td = document.createElement("td");
	td.style.margin = '0 0 0 0';
	td.style.padding = '0 0 0 0';
	td.id = 'CharData_infotable';
	td.width='200px';
	tr.appendChild(td);
	table.appendChild(tr);
	div.appendChild(table);

	minibox.appendChild(div);
	getElementByClass(document.getElementById('main-contents'), 'div', 'text').insertBefore(minibox,document.getElementsByTagName('h1')[1])
	if(default_visibility == 'Hidden') { Toggle() }
	PopulateItems();
}

function getElementByClass(parent, type, name) {
	var temp = parent.getElementsByTagName(type);
	for (var i = 0; i < temp.length; i++) {
		if (temp[i].className == name)
		 return temp[i];
	}
	return false;
}

function PopulateItems() {
      table = document.getElementById('CharData_itemtable');
      td = document.getElementById('CharData_infotable');
	if (GM_getValue('charname', 0) != 0) {
	 document.getElementById('CharData_titletext').innerHTML = GM_getValue('charname', 0)+"'s Character Profile";
      } else {
       document.getElementById('CharData_titletext').innerHTML = "Click Here.";
      }
	var table = document.createElement("table");
	table.id = 'CharData_itemtable';
	table.style.width = '100%';
	table.style.margin = '0 0 0 0';
	table.style.border = '1px';
	td.appendChild(table);

	var tr2 = document.createElement("tr");
	var td2 = document.createElement("td");
	td2.style.margin = '0 0 0 0';
	td2.style.padding = '0 0 0 0';
	td2.colSpan = '2';
	td2.style.borderTop = '1px solid #404040';
	tr2.appendChild(td2);
	table.appendChild(tr2);
	table.cellPadding = '0';
	table.cellSpacing = '0';
	for (var i = 0; i < 19; i++)
	{
		item_id = GM_getValue(i, 0);
		item_name = GM_getValue(item_id, 0);
		item_tooltip = GM_getValue(item_id+'_tooltip', 0);
		item_class = 'q'+GM_getValue(item_id+'_quality', 0);
		if(item_id > 0) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.style.padding = '0 0 0 0';
		td.style.borderTop = '0';
		td.style.borderLeft = '1px solid #404040';
		td.style.borderBottom = '1px solid #404040';
		td.style.borderRight = '1px solid #404040';
		var span = document.createElement("span");

			var a = document.createElement("a");
			a.innerHTML = "<- ";
			a.href = "javascript:;";
			a.id = item_id;
			a.name = 'nottransfered';
			a.style.textDecoration = 'none';
			a.addEventListener('click', CompareItem, false);
			span.appendChild(a);


		var a = document.createElement("a");
		a.innerHTML = item_name;
		a.className = item_class;
		a.style.textDecoration = 'none';
		a.href = '?item=' + item_id;
		a.setAttribute("onmouseover", "Tooltip.showAtCursor(event, '"+lolescape(item_tooltip)+"')");
		a.setAttribute("onmousemove", "Tooltip.cursorUpdate(event)");
		a.setAttribute("onmouseout", "Tooltip.hide()");
		span.appendChild(a);
		td.appendChild(span);
		tr.appendChild(td);

		table.appendChild(tr);
  }
 }
 
}


function CompareItem(evt) {
		if(document.getElementById('compared')) {
		var div = document.getElementById('compared');
		div.parentNode.removeChild(div);
		}
		var item_id = evt['currentTarget'].id;
		var divs = document.getElementsByTagName("div");
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].id.match(/tt(.+)/, i)) {
				var divnum = i;
			}
			if (divs[i].id.match(/ic(.+)/, i)) {
				var div2num = i;
			}
		}
		var div = document.createElement("div");
		div.id = 'compared';
		div.className = 'tooltip';
		div.style.width = '700px';
		div.style.float = 'left';
		div.style.paddingTop = '1px';
		div.style.visibility = 'visible';
		div.innerHTML = '<table><tbody><tr><td>'+GM_getValue(item_id + '_tooltip', 0)+'<th style="background-position: right top;"></th></tr><tr><th style="background-position: left bottom;"></th><th style="background-position: right bottom;"></th></tr></tbody></table>';
		 div.getElementsByTagName("b")[0].addEventListener('click', RemoveCompare, false);
		if (div.getElementsByTagName("table")[1]) {
		 div.getElementsByTagName("table")[1].width = '100%';
		}
		divs[divnum].parentNode.insertBefore(div, divs[divnum].nextSibling);
}

function RemoveCompare(evt) {
	if(document.getElementById('compared')) {
	var div = document.getElementById('compared');
	div.parentNode.removeChild(div);
	}
}

function Toggle(evt) {
	var div = document.getElementById('CharData_items');
	if(div.style.visibility == 'hidden') { div.parentNode.parentNode.style.height = ''; div.style.visibility = 'visible'; document.getElementById('CharData_toggletext').innerHTML = '[-]'; }
	else { div.style.visibility = 'hidden'; div.parentNode.parentNode.style.height = '24px'; document.getElementById('CharData_toggletext').innerHTML = '[+]'; }
}

function lolescape(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '\'', '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}
