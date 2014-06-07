// ==UserScript==
// @name           	JTV custom username
// @author         	frank38
// @version        	0.4
// @namespace      	
// @description	   	highlight and customize user name
// @include		   	*justin.tv/*
// @include		   	*justin.tv/*/popout*
// @include		   	*justin.tv/chat/*

// ==/UserScript==

//emu GM funk for chrome
//if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {

addCookie("mature_allowed", "true");
addCookie("see_abusive", "true");

if (typeof(localStorage) == 'undefined')
	return; //local storage not supported by this browser.
	
if (!localStorage["JTV_CUSTOM_NAME"] ) 
	localStorage.setItem("JTV_CUSTOM_NAME", JSON.stringify({}));

var cNameList = JSON.parse(localStorage.getItem("JTV_CUSTOM_NAME"));

if(document.location.href.match(/directory/))
	if(document.getElementsByClassName('list_item channel').length)
		highlight(document.getElementsByClassName('list_item channel'));

if(!document.getElementById('viewers'))
	return;

//http://webfx.eae.net/dhtml/sortabletable/sortabletable.html
script1 = document.createElement('script');
script1.src = 'http://webfx.eae.net/dhtml/sortabletable/js/sortabletable.js';
document.getElementsByTagName('head')[0].appendChild(script1);

var lists = document.getElementById('viewers').getElementsByClassName('nick');

document.getElementById('chat_viewers_dropmenu_button').addEventListener('click', showList, false);


//highlight channel
function highlight(elements) {
	for (i=0; i<elements.length; i++) {
		href = elements[i].getElementsByTagName('a')[0].getAttribute('href');
		id = href.substr(1);
		if(cNameList[id.toLowerCase()]) {
			elements[i].getElementsByTagName('a')[2].innerHTML = '<strong style="color:#F00">' + id + '</strong>';
		}
	}
}

function showList() {
	
	//clear nodes.
	items = document.getElementsByClassName('custom_name');
	for(i=0; i<items.length; i++) {
		items[i].parentNode.removeChild(items[i]);
	}
	
	if(document.getElementById('chat_viewers_dropmenu').scrollWidth<=0) {
		document.getElementById('custom_name_list').innerHTML = '';
		return;
	}
	
	if(!document.getElementById('custom_div')) {
		a = document.createElement('div');
		a.id = 'custom_div';
		a.className = 'dropmenu_links_container clearfix';
		a.innerHTML = 'Edit : <span id="target_id"></span><br />Name : <input id="custom_value" size="11" onmouseover="this.focus();"/> <input type="button" id="save_name" value="save"> <input type="button" id="delete_name" value="X" title="delete"> <br />  <input type="button" id="edit_all" value="All list">';
		document.getElementById('chat_viewers_dropmenu').appendChild(a);
		document.getElementById('save_name').addEventListener('click', saveItem, false);
		document.getElementById('delete_name').addEventListener('click', deleteItem, false);
		document.getElementById('edit_all').addEventListener('click', allItem, false);
	}
	
	if(!document.getElementById('custom_name_container')) {
		a = document.createElement('li');
		a.id = 'custom_name_container';
		a.innerHTML = '<h4>Custom User List (in this channel)</h4>';
		
		b = document.createElement('ul');
		b.id = 'custom_name_list';
		b.className = 'viewer_list';
		
		a.appendChild(b);
		
		pn = document.getElementById('viewers');
		pn.insertBefore(a, parent.firstChild);
	}
	

	for(i=0; i<lists.length; i++) {
		a = document.createElement('strong');
		a.className = 'custom_name';
		a.style.paddingLeft = '5px';
		a.style.color = '#F00';
		id = lists[i].firstChild.innerHTML;
		if(cNameList[id.toLowerCase()]) {
			a.innerHTML = cNameList[id.toLowerCase()];
			b = document.createElement('li');
			b.innerHTML = id + ' (' + cNameList[id.toLowerCase()] + ')';
			document.getElementById('custom_name_list').appendChild(b);
		}
		lists[i].setAttribute('onclick', 'javascript:document.getElementById("target_id").innerHTML=this.firstChild.innerHTML; document.getElementById("custom_value").value=this.lastChild.innerHTML');
		if(lists[i].innerHTML.indexOf('custom_name') == -1)
			lists[i].appendChild(a);
	}
}
function saveItem() {
	target = document.getElementById('target_id');
	customName = document.getElementById('custom_value');
	if (target.innerHTML == '' || customName.value.length == 0)
		return;
	delete cNameList[target.innerHTML.toLowerCase()];
	cNameList[target.innerHTML.toLowerCase()] = customName.value;
	target.innerHTML = '';
	customName.value = '';
	writeData();
}

function deleteItem() {
	target = document.getElementById('target_id');
	customName = document.getElementById('custom_value');
	delete cNameList[target.innerHTML.toLowerCase()];
	target.innerHTML = '';
	customName.value = '';
	writeData();
}

function _saveItem() {
	target = this.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML;
	customName = this.parentNode.parentNode.parentNode.childNodes[1].firstChild.value;
	if (target.length == 0 || customName.length == 0)
		return;
	delete cNameList[target.toLowerCase()];
	cNameList[target.toLowerCase()] = customName;
	writeData();
}

function _deleteItem() {
	target = this.parentNode.parentNode.parentNode.firstChild.firstChild;
	delete cNameList[target.innerHTML.toLowerCase()];
	target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
	writeData();
}

function addNew() {
	target = document.getElementById('newId');
	customName = document.getElementById('newName');
	if(target.value.length == 0 || customName.value.length == 0)
		return;
	cNameList[target.value.toLowerCase()] = customName.value;
	writeData();
	
	//insert 
	tr = document.createElement('tr');
	tr.style.padding = '5px 5px';
	td1 = document.createElement('td');
	td2 = document.createElement('td');
	td3 = document.createElement('td');
	td1.innerHTML = '<span>' + target.value.toLowerCase() + '</span>';
	td2.innerHTML = '<input type="text" style="padding-left: 10px;" value="' + cNameList[target.value.toLowerCase()] + '">';
	td3.innerHTML = '<span style="padding-left: 10px;"><input type="button" value="Save" class="_saveItem"> <input type="button" value="X" class="_deleteItem"></span>';
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	document.getElementById('custom_table').appendChild(tr);
	
	_save = document.getElementsByClassName('_saveItem');
	_del = document.getElementsByClassName('_deleteItem');
	_save[_save.length-1].addEventListener('click', _saveItem, false);
	_del[_del.length-1].addEventListener('click', _deleteItem, false);
	target.value = '';
	customName.value = '';
}

function allItem() {
	if(document.getElementById('edit_items'))
		return;
	a = document.createElement('div');
	a.id = 'edit_items';
	a.className = 'dropmenu_links_container clearfix';
	a.style.margin = '0 auto';
	a.style.padding = '5px';
	a.style.width = '300px';
	a.style.position = 'absolute';
	a.style.top = '100px';
	a.style.left = '30%';
	a.style.width = '410px';
	a.maxHeight = '500px';
	a.zIndex = '9999';
	a.style.backgroundColor = '#DDD';
	a.style.color = '#000';
	
	b = document.createElement('div');
	b.innerHTML = '<h2 style="text-align: center;">Edit all custom name</h2><hr />';
	b.innerHTML += 'ID:<input type="text" id="newId" size="12"> Name:<input type="text" id="newName" size="12"> <input type="button" id="addNew" value="Add">';
	b.innerHTML += '<input type="button" value="close" onclick="javascript:document.body.removeChild(this.parentNode.parentNode);">';
	b.innerHTML += '<hr />';
	
	a.appendChild(b);
	c = document.createElement('div');
	c.style.overflowX = 'hidden';
	c.style.overflowY = 'scroll';
	c.style.maxHeight = '300px';
	table = document.createElement('table');
	table.id = 'custom_table';
	table.className = 'sort-table';
	table.style.width = '100%';
	c.appendChild(table);
	a.appendChild(c);
	
	tbody = document.createElement('tbody');
	thead = document.createElement('thead');
	tr = document.createElement('tr');
	td1 = document.createElement('td');
	td2 = document.createElement('td');
	td3 = document.createElement('td');
	
	td1.innerHTML = 'User ID';
	td2.innerHTML = 'Custom Name';
	td3.innerHTML = 'Commands';
	
	td1.title = 'Sorttable';
	td2.title = 'Sorttable';
	
	td1.style.textAlign = 'center';
	td1.style.border = '1px solid #FFF';
	td1.style.cursor = 'pointer';
	td1.style.fontWeight = 'blod';
	td2.style.textAlign = 'center';
	td2.style.border = '1px solid #FFF';
	td2.style.cursor = 'pointer';
	td2.style.fontWeight = 'blod';
	td3.style.textAlign = 'center';
	td3.style.border = '1px solid #FFF';
	td3.style.fontWeight = 'blod';
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	thead.appendChild(tr);
	table.appendChild(thead);
	table.appendChild(tbody);
	for (key in cNameList) {
		tr = document.createElement('tr');
		tr.style.padding = '5px 5px';
		td1 = document.createElement('td');
		td2 = document.createElement('td');
		td3 = document.createElement('td');
		td1.style.paddingLeft = '2px';
		td1.innerHTML = '<span>' + key + '</span>';
		td2.innerHTML = '<input type="text" style="padding-left: 10px;" value="' + cNameList[key] + '">';
		td3.innerHTML = '<span style="padding-left: 10px;"><input type="button" value="Save" class="_saveItem"> <input type="button" value="X" class="_deleteItem"></span>';
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tbody.appendChild(tr);
	}
	document.body.appendChild(a);
	
	document.getElementById('addNew').addEventListener('click', addNew, false);
	for (i=0; i<document.getElementsByClassName('_saveItem').length; i++) {
		document.getElementsByClassName('_saveItem')[i].addEventListener('click', _saveItem, false);
		document.getElementsByClassName('_deleteItem')[i].addEventListener('click', _deleteItem, false);
	}
	
	var st = new w.SortableTable( document.getElementById("custom_table"),
	["String", "String", "None"] );
	
}

function writeData() {
	localStorage.setItem("JTV_CUSTOM_NAME", JSON.stringify(cNameList));
}

function addCookie(key, value) {
    if ( !key ) {
        return false;
    }
    document.cookie
        = key + '=' + escape(value) + '; '
        + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
        + 'path=/; ';
};

//************************************************//
/*
var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
this.GM_getValue=function (key,def) {
	return w.localStorage[key] || def;
};
this.GM_setValue=function (key,value) {
	return w.localStorage[key]=value;
};
this.GM_deleteValue=function (key) {
	w.localStorage.removeItem(key);
};
//}

var cNameList;
if(typeof uneval == 'function') {
	cNameList = eval(GM_getValue("JTV_CUSTOM_NAME", "({})"));
} else {
	cNameList = JSON.parse(GM_getValue("JTV_CUSTOM_NAME"));
}

if(document.location.href.match(/directory/))
	if(document.getElementsByClassName('list_item channel').length)
		highlight(document.getElementsByClassName('list_item channel'));

if(!document.getElementById('viewers'))
	return;

//http://webfx.eae.net/dhtml/sortabletable/sortabletable.html
script1 = document.createElement('script');
script1.src = 'http://webfx.eae.net/dhtml/sortabletable/js/sortabletable.js';
document.getElementsByTagName('head')[0].appendChild(script1);

var lists = document.getElementById('viewers').getElementsByClassName('nick');

document.getElementById('chat_viewers_dropmenu_button').addEventListener('click', showList, false);


//highlight channel
function highlight(elements) {
	for (i=0; i<elements.length; i++) {
		href = elements[i].getElementsByTagName('a')[0].getAttribute('href');
		id = href.substr(1);
		if(cNameList[id.toLowerCase()]) {
			elements[i].getElementsByTagName('a')[2].innerHTML = '<strong style="color:#F00">' + id + '</strong>';
		}
	}
}

function showList() {
	
	//clear nodes.
	items = document.getElementsByClassName('custom_name');
	for(i=0; i<items.length; i++) {
		items[i].parentNode.removeChild(items[i]);
	}
	
	if(document.getElementById('chat_viewers_dropmenu').scrollWidth<=0) {
		document.getElementById('custom_name_list').innerHTML = '';
		return;
	}
	
	if(!document.getElementById('custom_div')) {
		a = document.createElement('div');
		a.id = 'custom_div';
		a.className = 'dropmenu_links_container clearfix';
		a.innerHTML = 'Edit : <span id="target_id"></span><br />Name : <input id="custom_value" size="11" onmouseover="this.focus();"/> <input type="button" id="save_name" value="save"> <input type="button" id="delete_name" value="X" title="delete"> <br />  <input type="button" id="edit_all" value="All list">';
		document.getElementById('chat_viewers_dropmenu').appendChild(a);
		document.getElementById('save_name').addEventListener('click', saveItem, false);
		document.getElementById('delete_name').addEventListener('click', deleteItem, false);
		document.getElementById('edit_all').addEventListener('click', allItem, false);
	}
	
	if(!document.getElementById('custom_name_container')) {
		a = document.createElement('li');
		a.id = 'custom_name_container';
		a.innerHTML = '<h4>Custom User List (in this channel)</h4>';
		
		b = document.createElement('ul');
		b.id = 'custom_name_list';
		b.className = 'viewer_list';
		
		a.appendChild(b);
		
		pn = document.getElementById('viewers');
		pn.insertBefore(a, parent.firstChild);
	}
	

	for(i=0; i<lists.length; i++) {
		a = document.createElement('strong');
		a.className = 'custom_name';
		a.style.paddingLeft = '5px';
		a.style.color = '#F00';
		id = lists[i].firstChild.innerHTML;
		if(cNameList[id.toLowerCase()]) {
			a.innerHTML = cNameList[id.toLowerCase()];
			b = document.createElement('li');
			b.innerHTML = id + ' (' + cNameList[id.toLowerCase()] + ')';
			document.getElementById('custom_name_list').appendChild(b);
		}
		lists[i].setAttribute('onclick', 'javascript:document.getElementById("target_id").innerHTML=this.firstChild.innerHTML; document.getElementById("custom_value").value=this.lastChild.innerHTML');
		if(lists[i].innerHTML.indexOf('custom_name') == -1)
			lists[i].appendChild(a);
	}
}
function saveItem() {
	target = document.getElementById('target_id');
	customName = document.getElementById('custom_value');
	if (target.innerHTML == '' || customName.value.length == 0)
		return;
	delete cNameList[target.innerHTML.toLowerCase()];
	cNameList[target.innerHTML.toLowerCase()] = customName.value;
	target.innerHTML = '';
	customName.value = '';
	writeData();
}

function deleteItem() {
	target = document.getElementById('target_id');
	customName = document.getElementById('custom_value');
	delete cNameList[target.innerHTML.toLowerCase()];
	target.innerHTML = '';
	customName.value = '';
	writeData();
}

function _saveItem() {
	target = this.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML;
	customName = this.parentNode.parentNode.parentNode.childNodes[1].firstChild.value;
	if (target.length == 0 || customName.length == 0)
		return;
	delete cNameList[target.toLowerCase()];
	cNameList[target.toLowerCase()] = customName;
	writeData();
}

function _deleteItem() {
	target = this.parentNode.parentNode.parentNode.firstChild.firstChild;
	delete cNameList[target.innerHTML.toLowerCase()];
	target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
	writeData();
}

function addNew() {
	target = document.getElementById('newId');
	customName = document.getElementById('newName');
	if(target.value.length == 0 || customName.value.length == 0)
		return;
	cNameList[target.value.toLowerCase()] = customName.value;
	writeData();
	
	//insert 
	tr = document.createElement('tr');
	tr.style.padding = '5px 5px';
	td1 = document.createElement('td');
	td2 = document.createElement('td');
	td3 = document.createElement('td');
	td1.innerHTML = '<span>' + target.value.toLowerCase() + '</span>';
	td2.innerHTML = '<input type="text" style="padding-left: 10px;" value="' + cNameList[target.value.toLowerCase()] + '">';
	td3.innerHTML = '<span style="padding-left: 10px;"><input type="button" value="Save" class="_saveItem"> <input type="button" value="X" class="_deleteItem"></span>';
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	document.getElementById('custom_table').appendChild(tr);
	
	_save = document.getElementsByClassName('_saveItem');
	_del = document.getElementsByClassName('_deleteItem');
	_save[_save.length-1].addEventListener('click', _saveItem, false);
	_del[_del.length-1].addEventListener('click', _deleteItem, false);
	target.value = '';
	customName.value = '';
}

function allItem() {
	if(document.getElementById('edit_items'))
		return;
	a = document.createElement('div');
	a.id = 'edit_items';
	a.className = 'dropmenu_links_container clearfix';
	a.style.margin = '0 auto';
	a.style.padding = '5px';
	a.style.width = '300px';
	a.style.position = 'absolute';
	a.style.top = '100px';
	a.style.left = '30%';
	a.style.width = '410px';
	a.maxHeight = '500px';
	a.zIndex = '9999';
	a.style.backgroundColor = '#DDD';
	a.style.color = '#000';
	
	b = document.createElement('div');
	b.innerHTML = '<h2 style="text-align: center;">Edit all custom name</h2><hr />';
	b.innerHTML += 'ID:<input type="text" id="newId" size="12"> Name:<input type="text" id="newName" size="12"> <input type="button" id="addNew" value="Add">';
	b.innerHTML += '<input type="button" value="close" onclick="javascript:document.body.removeChild(this.parentNode.parentNode);">';
	b.innerHTML += '<hr />';
	
	a.appendChild(b);
	c = document.createElement('div');
	c.style.overflowX = 'hidden';
	c.style.overflowY = 'scroll';
	c.style.maxHeight = '300px';
	table = document.createElement('table');
	table.id = 'custom_table';
	table.className = 'sort-table';
	table.style.width = '100%';
	c.appendChild(table);
	a.appendChild(c);
	
	tbody = document.createElement('tbody');
	thead = document.createElement('thead');
	tr = document.createElement('tr');
	td1 = document.createElement('td');
	td2 = document.createElement('td');
	td3 = document.createElement('td');
	
	td1.innerHTML = 'User ID';
	td2.innerHTML = 'Custom Name';
	td3.innerHTML = 'Commands';
	
	td1.title = 'Sorttable';
	td2.title = 'Sorttable';
	
	td1.style.textAlign = 'center';
	td1.style.border = '1px solid #FFF';
	td1.style.cursor = 'pointer';
	td1.style.fontWeight = 'blod';
	td2.style.textAlign = 'center';
	td2.style.border = '1px solid #FFF';
	td2.style.cursor = 'pointer';
	td2.style.fontWeight = 'blod';
	td3.style.textAlign = 'center';
	td3.style.border = '1px solid #FFF';
	td3.style.fontWeight = 'blod';
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	thead.appendChild(tr);
	table.appendChild(thead);
	table.appendChild(tbody);
	for (key in cNameList) {
		tr = document.createElement('tr');
		tr.style.padding = '5px 5px';
		td1 = document.createElement('td');
		td2 = document.createElement('td');
		td3 = document.createElement('td');
		td1.style.paddingLeft = '2px';
		td1.innerHTML = '<span>' + key + '</span>';
		td2.innerHTML = '<input type="text" style="padding-left: 10px;" value="' + cNameList[key] + '">';
		td3.innerHTML = '<span style="padding-left: 10px;"><input type="button" value="Save" class="_saveItem"> <input type="button" value="X" class="_deleteItem"></span>';
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tbody.appendChild(tr);
	}
	document.body.appendChild(a);
	
	document.getElementById('addNew').addEventListener('click', addNew, false);
	for (i=0; i<document.getElementsByClassName('_saveItem').length; i++) {
		document.getElementsByClassName('_saveItem')[i].addEventListener('click', _saveItem, false);
		document.getElementsByClassName('_deleteItem')[i].addEventListener('click', _deleteItem, false);
	}
	
	var st = new w.SortableTable( document.getElementById("custom_table"),
	["String", "String", "None"] );
	
}

function writeData() {
	if(typeof uneval == 'function') {
		GM_setValue('JTV_CUSTOM_NAME', uneval(cNameList)); //firefox
	} else {
		GM_setValue("JTV_CUSTOM_NAME", obj2str(cNameList)); //chromium
	}
}

function obj2str(o) {
    var r = [];  
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";  
    if (typeof o == "object") {  
        if (!o.sort) {  
            for (var i in o)  
                r.push("\"" + i + "\":" + obj2str(o[i]));  
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {  
                r.push("toString:" + o.toString.toString());  
            }  
            r = "{" + r.join() + "}";
        } else {  
            for (var i = 0; i < o.length; i++)  
                r.push(obj2str(o[i]))  
            r = "[" + r.join() + "]";
        }  
        return r;  
    }  
    return o.toString();  
} 

*/