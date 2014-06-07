// ==UserScript==
// @name           Pennergame PN - Ordnerablage
// @namespace      11235813[Bande:Dritteliga Penner]
// @description    Laesst Nachrichten in Ordner gruppieren
// @include        http://*game*/messages/*
// @include        http://*bumrise*/messages/*
// @exclude 	   *read*
// @exclude 	   *write*
// @require		   http://zahlii.independent-irc.com/extend_js.js
// ==/UserScript==

var new_span = createElement('div');
var to_append = $('.listshop')[0];
var before = $('.listshop table')[0];
to_append.insertBefore(new_span,before);
update_check({name:'folder',ver:0.2,download:'http://userscripts.org/scripts/source/71362.user.js',url:'http://zahlii.independent-irc.com/updateinfo.xml',target:new_span});

var depth_px = 10;
var img = {
	add:'<img class="addit" src="http://zahlii.independent-irc.com/JS/img/add.png" width="20px" alt="Neuer Unterordner"/>',
	del:'<img src="http://zahlii.independent-irc.com/JS/img/del.png" width="20px" alt="Löschen"/>',
	folder:'<img src="http://zahlii.independent-irc.com/JS/img/folder.png" width="20px" alt="Ordner"/>',
	edit:'<img src="http://zahlii.independent-irc.com/JS/img/edit.png" width="20px" alt="Umbenennen"/>',
	pn:'<img src="http://static.pennergame.de/img/pv4/icons/read.gif" alt="Nachricht">',
	empty:'<img src="http://zahlii.independent-irc.com/JS/img/empty.gif" width="20px" alt="Leeren">',
};
depth = -1;
class = '';
id = 1;
parent = -1;
folder_table=false;
folder = ini_get('folder_pennergame_'+about.url.server,{});
message_list = $('#messageslist')[0];




start();


function start() {
folder=ini_get('folder_pennergame_'+about.url.server,{});
// Ab hier werden die Nachrichten angezeigt
if(!folder_table) {
message_list = $('#messageslist')[0];
folder_table = createElement('table',{width:570,cellspacing:1,cellpading:0});
var head_row = createElement('tr');
var new_cell_1 = createElement('td',{width:34,height:20,bgcolor:'#272727',style:{'-moz-border-radius-topleft':'4px'}});
var new_cell_2 = createElement('td',{style:{'vertical-align':'middle'},bgcolor:'#272727'},'<b>Name</b>');
var new_cell_3 = createElement('td',{width:80,style:{'vertical-align':'middle'},bgcolor:'#272727'},'<b>'+img.add+'</b>');
var new_cell_4 = createElement('td',{width:30,style:{'vertical-align':'middle','-moz-border-radius-topright':'4px'},bgcolor:'#272727'});
head_row.appendChild(new_cell_1);
head_row.appendChild(new_cell_2);
head_row.appendChild(new_cell_3);
$('b',new_cell_3)[0].addEventListener('click',add_folder,false);
head_row.appendChild(new_cell_4);
folder_table.appendChild(head_row);
$('.listshop')[0].insertBefore(folder_table,$('.listshop h1')[0]);
}

display_single_folder('',folder);
}


function display_single_folder(name,object) {
	depth++;
	parent++;
	var to_rem = 'child'+parent+' ';
	class += 'child'+parent+' ';
	var type,current,main_node,cell_1,cell_2,cell_3;
	for(var key in object) {
		current = object[key];
		type = type_of(current);	
		if(type=='Array') {
			//Single PN
			main_node = createElement('tr',{class:'msglist '+class,style:{display:depth==0?'':'none'}});
			cell_1 = createElement('td',{width:34,height:32,style:{'padding-left':(depth*depth_px-2)+'px','vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)','border-left':'1px solid rgb(39,39,39)'}},img.pn);
			cell_3 = createElement('td',{style:{'vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)',}},current[4]+'<br><span style="font-size: 9px; color: rgb(153, 153, 153);">'+current[5]);
			cell_2 = createElement('td',{width:400,style:{'padding-left':depth*depth_px+'px','vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)'}},'<a href="/messages/read/'+current[0]+'/"><strong>'+current[1]+'</strong></a><br><span style="font-size: 9px; color: rgb(153, 153, 153);">von <a href="/profil/id:'+current[3]+'/" style="text-decoration: none;">'+current[2]+'</a></span>');
			cell_4 = createElement('td',{width:30,style:{'vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)','border-right':'1px solid rgb(39,39,39)'}},'<a href="/messages/delete/'+current[0]+'/" class="trash">'+img.del+'</a>');
			main_node.appendChild(cell_1);
			main_node.appendChild(cell_2);
			main_node.appendChild(cell_3);
			main_node.appendChild(cell_4);
			folder_table.appendChild(main_node);
		} 
		if(type=='Object') {
			//New Subfolder
			main_node = createElement('tr',{class:'msglist '+class+' p'+(parent+1),style:{display:depth==0?'':'none'}});
			cell_1 = createElement('td',{width:34,height:32,style:{'padding-left':depth*depth_px+'px','vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)','border-left':'1px solid rgb(39,39,39)'}},img.folder);
			cell_2 = createElement('td',{width:400,style:{'padding-left':depth*depth_px+'px','vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)'}},'<b>'+key+'</b>');
			cell_3 = createElement('td',{style:{'vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)'}},'<b>'+img.add+'</b><b>'+img.edit+'</b><b>'+img.empty+'</b>');
			cell_4 = createElement('td',{width:30,style:{'vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)','border-right':'1px solid rgb(39,39,39)'}},'<span class="trash">'+img.del+'</span>');
			main_node.appendChild(cell_1);
			main_node.appendChild(cell_2);
			main_node.appendChild(cell_3);
			$('b',cell_3)[0].addEventListener('click',add_folder,false);
			$('b',cell_3)[1].addEventListener('click',rename_folder,false);
			$('b',cell_3)[2].addEventListener('click',truncate_folder,false);
			$('img',cell_4)[0].addEventListener('click',delete_folder,false);
			main_node.appendChild(cell_4);
			main_node.addEventListener('click',showhide,false);
			folder_table.appendChild(main_node);
			display_single_folder(key,current);
		}
	}
	class = class.split(to_rem).join('');
	depth--;
}
function showhide() {
	var to_hide = $('.'+(get_class_to_rem(this.className)));
	if(!to_hide[0] || to_hide[0]===undefined || to_hide[0]==null) return;
	if(to_hide[0].style.display == 'none') var disp = '';
	else var disp = 'none';
	for(var a=0;a<to_hide.length;a++) {
		to_hide[a].style.display = disp;
	}
}
function get_class_to_rem(classname) {
	var n = classname.match(/\d+/g);
	return 'child'+n[n.length-1];
}
function findit(obj,name) {
	for(var key in obj) {
		if(key==name) {
			delete obj[key];
			break;
		}
		if(type_of(obj[key])=='Object') {
			findit(obj[key],name);
		}
	}
}
function finditwrite(obj,name,append_name) {
	for(var key in obj) {
		if(key==name) {
			obj[key][append_name] = {};
			break;
		}
		if(type_of(obj[key])=='Object') {
			finditwrite(obj[key],name,append_name);
		}
	}
}
function finditrewrite(obj,name,new_name) {
	for(var key in obj) {
		if(key==name) {
			obj[new_name] = obj[key];
			delete obj[key];
		}
		if(type_of(obj[key])=='Object') {
			finditrewrite(obj[key],name,new_name);
		}
	}
}
function finditempty(obj,name) {
	for(var key in obj) {
		if(key==name) {
			for(var a in obj[key]) {
				delete obj[key][a];
			}
		}
		if(type_of(obj[key])=='Object') {
			finditempty(obj[key],name);
		}
	}
}
function add_folder() {
	var parent = this.parentNode.parentNode;
	var parent_name = $('b',parent)[0].textContent;
	var new_name = prompt('Wie soll der neue Ordner heißen?','Neuer Ordner');
	if(!new_name) return false;
	if(!parent_name || parent_name=='Name') {
		folder[new_name] = {};
	} else {
		finditwrite(folder,parent_name,new_name);
	}
	ini_set('folder_pennergame_'+about.url.server,folder);
		clear();
	start();
	//location.reload();
}
function rename_folder() {
	var parent = this.parentNode.parentNode;
	var parent_name = $('b',parent)[0].textContent;
	var new_name = prompt('Wie soll der Ordner heißen?',name);
	if(!parent_name || parent_name=='Name') {
		folder[new_name] = {};
	} else {
		finditrewrite(folder,parent_name,new_name);
	}
	ini_set('folder_pennergame_'+about.url.server,folder);
	//location.reload();
	clear();
	start();
}


function truncate_folder() {
	var parent = this.parentNode.parentNode;
	var parent_name = $('b',parent)[0].textContent;
	finditempty(folder,parent_name);
	ini_set('folder_pennergame_'+about.url.server,folder);
	//location.reload();
	clear();
	start();
}

function delete_folder(name) {
	var parent = this.parentNode.parentNode.parentNode;
	var parent_name = $('b',parent)[0].textContent;
	findit(folder,parent_name);
	ini_set('folder_pennergame_'+about.url.server,folder);
	//location.reload();
	clear();
	start();
}

function clear() {
	folder_table.parentNode.removeChild(folder_table);
	folder_table=false;
}

depth_select=-1;
s_text = '<select size="3">';
build_select(folder);
s_text += '</select>';

var reihen = $('#messageslist tr');
reihen[0].insertBefore(createElement('td',{bgcolor:'#272727'},'&nbsp;'),$('td',reihen[0])[3]);
$('td',reihen[0])[2].width = '15%';
for(var b=1;b<reihen.length-1;b++) {
	felder = $('td',reihen[b]);
	felder[0].width='10%';
	felder[1].width='45%';
	felder[2].width='15%';
	felder[3].width='5%';
	var td = createElement('td',{width:'25%',style:{'vertical-align':'middle','border-bottom':'1px solid rgb(39,39,39)'}},s_text+img.add);
	$('img',td)[0].style.paddingBottom = '13px';
	reihen[b].insertBefore(td,felder[3]);
}

message_list.innerHTML = message_list.innerHTML.replace(/onclick=".*?"/g,'');
var imgs = $('.addit',message_list);
for(c=0;c<imgs.length;c++) {
	imgs[c].addEventListener('click',add_pn,false);
}
function str_repeat(s,n) {
	return new Array(n+1).join(s);
}
function build_select(obj) {
	depth_select++;
	for(var key in obj) {
		current = obj[key];
		switch(type_of(current)) {
			case 'Array':
				break;
			case 'Object':
				s_text+='<option>'+str_repeat("-",depth_select)+key+"</option>";
				build_select(current);
				break;
		}
	}
	depth_select--;
}
function add_pn() {
	var parent = this.parentNode.parentNode;
	var h = parent.innerHTML;
	var cur = [];
	cur[0] = h.match(/read\/(\d+)\//)[1];
	cur[1] = $('strong',parent)[0].textContent;
	cur[3] = h.match(/profil\/id:(\d+)\//)[1];
	cur[2] = $('td a',parent)[1].textContent;
	var zeit =  $('td',parent)[2];
	cur[4] = zeit.textContent.match(/\d{2,2}.\d{2,2}.\d{4,4}/)[0];
	cur[5] = $('span',zeit)[0].textContent.replace(/\s+/g,'');
	var fold = $('select',parent)[0].value;
	if(fold=='' || fold===undefined || fold==null) return false;
	fold = fold.replace(/-/g,'');
	finditadd(folder,fold,cur);
	ini_set('folder_pennergame_'+about.url.server,folder);
	clear();
	start();
	//location.reload();
	//id,betreff,spielername,spielerid,datum,zeit
}
function finditadd(obj,name,insert) {
		for(var key in obj) {
		if(key==name) {
			var label = (new Date).getTime().toString();
			obj[key][label] = insert;
			break;
			
		}
		if(type_of(obj[key])=='Object') {
			finditadd(obj[key],name,insert);
		}
	}
}