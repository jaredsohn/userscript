// ==UserScript==
// @name           HWM_Friends_Tabs
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/home.php
// @include        http://www.heroeswm.ru/friends.php
// ==/UserScript==

var id_re = /pl_info.php\?id=\d+/;
var table_arr = document.getElementsByTagName('table');
var friends_cell;
var friends;
var new_cell;

var input; 
var button; 

var index;
var renamingIndex;

var adding = false;
var deleting = false;
var renaming = false;

var MAX_LENGTH = 32;

var home_delim = '<br/>';	//Разделитель для страницы персонажа, для вывода в одну строчку через запятую закомментировать эту и раскомментировать следующую строку 
//var home_delim = ','; 	//
var friends_delim = ','; //Не менять - возможны баги) 

var tab_arr;
updateTabArr();

function updateTabArr() {
	tab_arr = (decodeURIComponent(GM_getValue('tabs', '')) != '')?(('all' + friends_delim + decodeURIComponent(GM_getValue('tabs', ''))).split(friends_delim)):(['all']);
}

if (location.href.indexOf('home.php') != -1) {
	friends_cell = table_arr[table_arr.length - 1].parentNode.parentNode.parentNode.childNodes[9].childNodes[0];
	friends = friends_cell.innerHTML.replace(/<br>/g, '').split(',');
	createTabs();
	getFriends();
}
else if (location.href.indexOf('friends.php') != -1) {
	input = $$('input');
	button = $$('input');
	friends_cell = document.getElementsByTagName('form')[0];
	createTable();
	updateFriendsTable();
	for (var i = 1; i < tab_arr.length; i++) {
		addTabI(i);
	}	
	showA();
}

//friends.php+
function updateFriendsTable() {
	var tr_arr = friends_cell.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes;
	for (var i = 3; i < tr_arr.length; i++) {
		var td = $$('td');
		var a = $$('a');
		a.title = '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0433\u0440\u0443\u043f\u043f\u0443';
		a.href = 'javascript: void(0)';
		a.innerHTML = "[+]";
		a.addEventListener('click', addToGroup, false);
		td.appendChild(a);
		td.setAttribute('class', 'wbwhite');
		td.setAttribute('align', 'center');
		tr_arr[i].insertBefore(td, tr_arr[i].childNodes[2]);
		
		var td = $$('td');
		var a = $$('a');
		a.title = '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0433\u0440\u0443\u043f\u043f\u044b';
		a.href = 'javascript: void(0)';
		a.innerHTML = "[-]";
		a.addEventListener('click', deleteFromGroup, false);
		td.appendChild(a);
		td.setAttribute('class', 'wbwhite');
		td.setAttribute('align', 'center');
		tr_arr[i].insertBefore(td, tr_arr[i].childNodes[3]);		
		
		var a = tr_arr[i].childNodes[4].childNodes[1];
		a.id = a.href;
		a.href = 'javascript: void(0)';
		a.addEventListener('click', removeFriend, false);
	}
	for (var i = 0; i < 3; i++) {
		tr_arr[i].childNodes[0].setAttribute('colspan', '5');
	}
}

function removeFriend(){
	var nick = getNick(this.parentNode.parentNode.childNodes[1].innerHTML);
    if (confirm('\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c ' + nick + ' \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439?')) {
		hideA();
		for (var i = 1; i < tab_arr.length; i++) {
			$('id_' + i).childNodes[1].innerHTML = remove(nick, $('id_' + i).childNodes[1].innerHTML);
			GM_setValue('gr_' + i, encodeURIComponent($('id_' + i).childNodes[1].innerHTML));
		}
 		showA();
        location.href = this.id;
    }
}

function addToGroup(){
	if (deleting) {return;}
    if (adding) {
		if (this.parentNode.parentNode.childNodes[0].innerHTML != index) {return;}
        var select = $('select');
        var i = select.selectedIndex;
		if (i > 0) {
			i = select.options[i].value;
			var nick = getNick(this.parentNode.parentNode.childNodes[1].innerHTML);
			$('id_' + i).childNodes[1].innerHTML += ((($('id_' + i).childNodes[1].innerHTML == '') ? ('') : (',')) + nick);
//			GM_setValue('gr_' + i, encodeURIComponent($('id_' + i).childNodes[1].innerHTML));
			GM_setValue('gr_' + i, GM_getValue('gr_' + i, '') == '' ? encodeURIComponent(nick) : GM_getValue('gr_' + i, '') + friends_delim + encodeURIComponent(nick));
		}
        select.parentNode.removeChild(select);
        adding = false;
		showA();
    } else {
        if (tab_arr.length <= 1) {
            alert('\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u0443 \u0433\u0440\u0443\u043f\u043f\u0443');
            return;
        }
		index = this.parentNode.parentNode.childNodes[0].innerHTML;
        adding = true;
		hideA();
        
        var select = $$('select');
        select.id = 'select';
        
		select.options[select.options.length] = new Option('---', 0);
        for (var i = 1; i < tab_arr.length; i++) {
			var nick = getNick(this.parentNode.parentNode.childNodes[1].innerHTML);
			if (!IN(nick, decodeURIComponent(GM_getValue('gr_' + i, '')).split(','))) {
                if (tab_arr[i] != '') {
                    select.options[select.options.length] = new Option(decodeURIComponent(tab_arr[i]), i);
                }
			}
        }
	    this.parentNode.appendChild(select);
    }
}

function deleteFromGroup() {
	if (adding) {return;}
    if (deleting) {
		if (this.parentNode.parentNode.childNodes[0].innerHTML != index) {return;}
        var select = $('select');
        var i = select.selectedIndex;
		if (i > 0) {
			i = select.options[i].value;
			var nick = getNick(this.parentNode.parentNode.childNodes[1].innerHTML);
			$('id_' + i).childNodes[1].innerHTML = remove(nick, $('id_' + i).childNodes[1].innerHTML);
			GM_setValue('gr_' + i, encodeURIComponent($('id_' + i).childNodes[1].innerHTML));
		}
        select.parentNode.removeChild(select);
        deleting = false;
		showA();
    } else {
        if (tab_arr.length <= 1) {
            return;
        }
        deleting = true;
		hideA();
        index = this.parentNode.parentNode.childNodes[0].innerHTML;
        var select = $$('select');
        select.id = 'select';
        
		select.options[select.options.length] = new Option('---', 0);
        for (var i = 1; i < tab_arr.length; i++) {
			var nick = getNick(this.parentNode.parentNode.childNodes[1].innerHTML);
			if (IN(nick, decodeURIComponent(GM_getValue('gr_' + i, '')).split(','))) {
                if (tab_arr[i] != '') {
                    select.options[select.options.length] = new Option(decodeURIComponent(tab_arr[i]), i);
                }				
			}
        }
	    this.parentNode.appendChild(select);
    }	
}

function getNick(s){
    var i;
    while ((i = s.indexOf('<')) != -1) {
        s = s.substring(0, i) + s.substring(s.indexOf('>') + 1);
    }
	var arr = [' ', '&nbsp;', '\0', '\n'];
	for (var j = 0; j < arr.length; j++) {
		while ((i = s.indexOf(arr[j])) != -1) {
			s = s.substring(i + arr[j].length);
		}
	}
	return s;
}

function createTable(){
    var table = $$('table');
    table.setAttribute('width', '900');
    table.setAttribute('align', 'center');
    friends_cell.parentNode.appendChild(table);
    
    var tbody = $$('tbody');
    table.appendChild(tbody);
    
    var td = $$('td');
    tbody.appendChild(td);
    
    var tr = $$('tr');
    td.appendChild(tr);
    
    table = $$('table');
	table.id = 'gr_table';
    table.setAttribute('class', 'wbwhite');
    tr.appendChild(table);
    
    tbody = $$('tbody');
    table.appendChild(tbody);
	
    tr = $$('tr');
    tbody.appendChild(tr);
	
	td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
	tr.appendChild(td);
	input.type = 'input';
//	input.maxlength = 5;
	td.appendChild(input);
    
	button.type = 'button';
	button.addEventListener( 'click', addTab , false );
	button.setAttribute('value', '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c');
	td.appendChild(button);
}

function addTab() {
	input.value = input.value.replace(/,/g, '');
	if (input.value == '') {
		alert('\u0418\u043c\u044f \u0433\u0440\u0443\u043f\u043f\u044b \u043d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u043e');
		return;
	}
	if (IN(input.value, tab_arr)) {
		alert('\u0413\u0440\u0443\u043f\u043f\u0430 \u0441 \u0442\u0430\u043a\u0438\u043c \u0438\u043c\u0435\u043d\u0435\u043c \u0443\u0436\u0435 \u0435\u0441\u0442\u044c');
		return;
	}
	
	if (input.value.length > MAX_LENGTH) {
		if (!confirm('\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043b\u0438\u043d\u043d\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u044b. \u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c?')) {
			return;
		}
	}
	var tbody = input.parentNode.parentNode.parentNode;
	
	var tr = $$('tr');
	tr.id = 'id_' + tab_arr.length;
	tr.setAttribute('align', 'center');
    tbody.appendChild(tr);
	
    var td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
	td.innerHTML = '<b>' + input.value + '</b>';
    tr.appendChild(td);
	    
    td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
//	td.addEventListener( "mousemove", showA , false );
//	td.addEventListener( "mouseover", showA , false );
//	td.addEventListener( "mouseout", hideA , false );	
    tr.appendChild(td);	
	
	td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
    tr.appendChild(td);
	
	var a = $$('a');
	a.href = 'javascript: void(0)';
	a.title = '\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u0442\u044c';
	a.innerHTML = '[Rename]';
	a.addEventListener('click', rename, false);
	td.appendChild(a);		

	var a = $$('a');
	a.href = 'javascript: void(0)';
	a.title = '\u041f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u0432\u0432\u0435\u0440\u0445';
	a.innerHTML = '<b>[\u2191]</b>';
	a.addEventListener('click', up, false);
	td.appendChild(a);		

	var a = $$('a');
	a.href = 'javascript: void(0)';
	a.title = '\u041f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u0432\u043d\u0438\u0437';
	a.innerHTML = '<b>[\u2193]</b>';
	a.addEventListener('click', down, false);
	td.appendChild(a);	
	
	tab_arr[tab_arr.length] = input.value; 
	
	GM_setValue('tabs', GM_getValue('tabs', '') != '' ? GM_getValue('tabs', '') + ',' + encodeURIComponent(input.value) : encodeURIComponent(input.value));
	GM_setValue('gr_' + (tab_arr.length - 1), '');
	input.value = '';
}

function addTabI(i) {
	if (tab_arr[i] == '') {return;}
	var tbody = input.parentNode.parentNode.parentNode;
	
	var tr = $$('tr');
	tr.id = 'id_' + i;
	tr.setAttribute('align', 'center');
    tbody.appendChild(tr);
	
    var td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
	td.innerHTML = '<b>' + decodeURIComponent(tab_arr[i]) + '</b>';
    tr.appendChild(td);
	    
    td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
//	td.addEventListener( "mousemove", showA , false );
//	td.addEventListener( "mouseover", showA , false );
//	td.addEventListener( "mouseout", hideA , false );
	td.innerHTML = GM_getValue('gr_' + i, '');
    tr.appendChild(td);	
	
    td = $$('td');
	td.setAttribute('style', 'border:1px solid #000;padding:3px 0;text-align:center;');
    tr.appendChild(td);
	
	var a = $$('a');
	a.href = 'javascript: void(0)';
	a.title = '\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u0442\u044c';
	a.innerHTML = '[Rename]';
	a.addEventListener('click', rename, false);
	td.appendChild(a);		

	var a = $$('a');
	a.href = 'javascript: void(0)';
	a.title = '\u041f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u0432\u0432\u0435\u0440\u0445';
	a.innerHTML = '<b>[\u2191]</b>';
	a.addEventListener('click', up, false);
	td.appendChild(a);		

	var a = $$('a');
	a.href = 'javascript: void(0)';
	a.title = '\u041f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u0432\u043d\u0438\u0437';
	a.innerHTML = '<b>[\u2193]</b>';
	a.addEventListener('click', down, false);
	td.appendChild(a);		
}

function showA() {
	for (var i = 1; i < tab_arr.length; i++) {
		if ($('id_'+ i) == null) {continue;}
		if ($('id_'+ i).childNodes[1].innerHTML == '') {continue;}
		var fr_arr = $('id_'+ i).childNodes[1].innerHTML.split(friends_delim);
		for (var j = 0; j < fr_arr.length; j++) {
			fr_arr[j] = '<a href="' + getHref(decodeURIComponent(fr_arr[j])) + '"' + '>' + decodeURIComponent(fr_arr[j]) + '</a>';
		}
		$('id_'+ i).childNodes[1].innerHTML = fr_arr.join(friends_delim);
	}
}

function hideA() {
	for (var i = 1; i < tab_arr.length; i++) {
		if ($('id_'+ i).childNodes[1].innerHTML == '') {continue;}
		$('id_'+ i).childNodes[1].innerHTML = decodeURIComponent(GM_getValue('gr_' + i, ''));
	}
}

function getHref(nick) {
	var a_arr = document.getElementsByTagName('a');
	for (var i = 0; i < a_arr.length; i++) {
		if (a_arr[i].childNodes[0].innerHTML == nick) {
			return a_arr[i].href; 
		}
	}
	return '';
}

function rename() {
	if (renaming) {
		if (this.parentNode.parentNode.id.split('_')[1] != renamingIndex) {return;}
		var text = $('text');
		var v = text.value;
		if (v == '') {
			if (confirm('\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u0443 \u0433\u0440\u0443\u043f\u043f\u0443?')) {
				text.parentNode.removeChild(text);
				removeTab(renamingIndex);
				this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
				renaming = false;
				updateIDs();
				updateTabArr();
				showA();
				return;
			} else {
				text.parentNode.removeChild(text);
				renaming = false;
				this.parentNode.parentNode.childNodes[0].innerHTML = '<b>' + tab_arr[parseInt(renamingIndex)] + '</b>';
				showA();
				return;				
			}
		}
		text.parentNode.removeChild(text);
		this.parentNode.parentNode.childNodes[0].innerHTML = '<b>' + v + '</b>';
		
		var tabs = decodeURIComponent(GM_getValue('tabs', '')).split(friends_delim);
		tabs[parseInt(renamingIndex) - 1] = encodeURIComponent(v);
		GM_setValue('tabs', tabs.join(friends_delim));
		
		updateTabArr();
		
		renaming = false;
		showA();
	} else {
		renaming = true;
		hideA();
		renamingIndex = this.parentNode.parentNode.id.split('_')[1];
		var n = this.parentNode.parentNode.childNodes[0];
		var text = $$('input');
		text.type = 'text';
		text.id = 'text';
		text.value = n.childNodes[0].innerHTML; 
		
		n.innerHTML = '';
		n.appendChild(text);
	}
}

function removeTab(index) {
	index = parseInt(index);
	tab_arr.splice(index, 1);
	var t = decodeURIComponent(GM_getValue('tabs', '')).split(friends_delim);
	t.splice(index - 1, 1);
	for (var i = 0; i < t.length; i++) {
		t[i] = encodeURIComponent(t[i]);
	}
	GM_setValue('tabs', t.join(friends_delim));
	for (var i = index; i < tab_arr.length; i++) {
		GM_setValue('gr_' + i, GM_getValue('gr_'+ (i + 1), ''));
	}
}

function updateIDs() {
	var table = $('gr_table');
	var tr_arr = table.childNodes[0].childNodes;
	for (var i = 1; i < tr_arr.length; i++) {
		tr_arr[i].id = 'id_' + i;
	} 
}

function up() {
	if (renaming) {return;}
	var i = parseInt(this.parentNode.parentNode.getAttribute('id').split('_')[1]);
	if (i == 1) {return;}
	var tr1 = $('id_' + i);
	var tr2 = $('id_' + (i - 1));
	this.parentNode.parentNode.parentNode.insertBefore(tr1, tr2);
	tr1.id = 'id_' + (i - 1);
	tr2.id = 'id_' + (i);
	
	var s1 = GM_getValue('gr_' + i, '');
	var s2 = GM_getValue('gr_' + (i - 1), '');
	GM_setValue('gr_' + i, s2);
	GM_setValue('gr_' + (i - 1), s1);
	
	var tabs = GM_getValue('tabs', '').split(friends_delim);
	for (var j = 0; j < tabs.length; j++) {
		tabs[j] = decodeURIComponent(tabs[j]);
	}		
	var temp = tabs[i - 1];
	tabs[i - 1] = tabs[i - 2];
	tabs[i - 2] = temp;
	for (var j = 0; j < tabs.length; j++) {
		tabs[j] = encodeURIComponent(tabs[j]);
	}	
	GM_setValue('tabs', tabs.join(friends_delim));
	
	updateTabArr();
}

function down() {
	if (renaming) {return;}
	var i = parseInt(this.parentNode.parentNode.getAttribute('id').split('_')[1]);
	if (i >= tab_arr.length - 1) {return;}
	var tr1 = $('id_' + i);
	var tr2 = $('id_' + (i + 1));
	this.parentNode.parentNode.parentNode.insertBefore(tr2, tr1);
	tr1.id = 'id_' + (i + 1);
	tr2.id = 'id_' + (i);
	
	var s1 = GM_getValue('gr_' + i, '');
	var s2 = GM_getValue('gr_' + (i + 1), '');
	GM_setValue('gr_' + i, s2);
	GM_setValue('gr_' + (i + 1), s1);
	
	var tabs = GM_getValue('tabs', '').split(friends_delim);
//	alert(tabs);
	for (var j = 0; j < tabs.length; j++) {
		tabs[j] = decodeURIComponent(tabs[j]);
	}		
//	alert(tabs[i] +'\t' + tabs[i - 1]);
	var temp = tabs[i];
	tabs[i] = tabs[i - 1];
	tabs[i - 1] = temp;
//	alert(tabs[i] +'\t' + tabs[i - 1]);
	for (var j = 0; j < tabs.length; j++) {
		tabs[j] = encodeURIComponent(tabs[j]);
	}	
	GM_setValue('tabs', tabs.join(friends_delim));
	
	updateTabArr();
}

//friends.php-

//home.php+

function createTabs(){
    var d = $$('table');
    d.setAttribute('cellspacing', 0);
    d.setAttribute('cellpadding', 0);
    var tr = $$('tr');
    var td = $$('td');
    td.style.borderBottom = '1px solid #000';
    td.innerHTML = '&nbsp;&nbsp;';
    tr.appendChild(td);
    for (var i = 0; i < tab_arr.length; i++) {
        createTab(i, tr);
    }
    d.appendChild(tr);
    
    function createTab(id, tr){
        var td = $$('td');
        td.id = 'tab_' + id;
        td.setAttribute('style', 'border:1px solid #000;padding:3px 0;width:70px;text-align:center;');
        td.innerHTML = tab_arr[id];
        tr.appendChild(td);
		if (tab_arr[id] == '') {
			td.style.display = 'none';
		}
		
        var td = $$('td');
        td.style.borderBottom = '1px solid #000';
        td.innerHTML = '&nbsp;&nbsp;';
        tr.appendChild(td);
		
		if (tab_arr[id] == '') {
			td.style.display = 'none';
		}		
    }
    
    td = $$('td');
    td.setAttribute('class', 'wbwhite');
    td.setAttribute('valign', 'top');
    td.appendChild(d);
    new_cell = td;
    friends_cell.parentNode.insertBefore(td, friends_cell);
    friends_cell.style.display = 'none';
    
    var div = $$('div');
    div.id = 'friends';
    new_cell.appendChild(div);
}

function getMenu(cur){
    for (var i = 0; i < tab_arr.length; i++) {
        if (cur == i) {
            var o2 = $('tab_' + i);
            o2.style.borderBottom = '0px solid #000';
            o2.style.fontWeight = 'bold';
            o2.style.backgroundColor = '#F5F3EA';
            o2.innerHTML = tab_arr[i];
        }
        else {
            var o1 = $('tab_' + i);
            o1.style.borderBottom = '1px solid #000';
            o1.style.fontWeight = 'normal';
            o1.innerHTML = '';
            o1.style.backgroundColor = '#FFFAF0';
            a = $$('a');
            a.href = 'javascript:void(0);';
            a.setAttribute("tab_name", i);
            a.addEventListener("click", clickMenu, false);
            a.appendChild(document.createTextNode(tab_arr[i]));
            o1.appendChild(a);
        }
    }
}

function clickMenu(){
    GM_setValue('tab', parseInt(this.getAttribute('tab_name')));
    getFriends(home_delim);
}

function getFriends(){
    var name;
    var tab = GM_getValue('tab', -1);
    if (tab == -1 || tab >= tab_arr.length) {
        tab = 0;
        GM_setValue('tab', 0);
    }
    getMenu(tab);
    
    var div = $('friends');
    div.innerHTML = '';
    var fr = decodeURIComponent(GM_getValue('gr_' + tab, '')) != '' ? decodeURIComponent(GM_getValue('gr_' + tab, '')).split(friends_delim) : [];
    for (var j = 0; j < friends.length; j++) {
        if (tab > 0) {
			if (IN(getNick(friends[j]), fr)) {
				div.innerHTML += friends[j] + home_delim;
			}
        }
        else {
            div.innerHTML += friends[j] + home_delim;
        }
    }
}

//home.php-

function $(id){
    return document.getElementById(id);
}

function $$(tn){
    return document.createElement(tn);
}

function IN(e, a) {
	for (var i = 0; i < a.length; i++) {
		if (e == a[i]) {
			return true;
		}
	}
	return false;
}

function remove(e, s) {
	if (e == s) {
		return '';
	}
	var i = s.indexOf(e);
	if (i == -1) {
		return s;
	}
	//var re = new RegExp(friends_delim + friends_delim); 
	return (s.substring(0, i) + s.substring(i + e.length)).replace(/,,/g, ',').replace(/^,/, '').replace(/,$/, '');
}
