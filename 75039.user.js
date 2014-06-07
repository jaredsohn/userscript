//
//
// ==UserScript==
// @name          Dirty Profile Notepad
// @namespace     http://dirty.ru/
// @description   dirty profile notepad
// @include       http://www.dirty.ru/users/*
// @include       http://dirty.ru/users/*
// ==/UserScript==


var dn_body = document.body.innerHTML;

var dn_self = document.body.innerHTML.split('dirty.ru/users/')[1].split('"')[0];
var dn_self_name = document.body.innerHTML.split('dirty.ru/users/')[1].split('<')[0].split('>')[1];

dn_user = dn_body.split(' class="vote" uid="');
dn_user = dn_user[1].split('"');
dn_user = dn_user[0];

dn_username = dn_body.split(' class="vote" uid="');
dn_username = dn_username[1].split(' href="">');
dn_username = dn_username[1].split('</');
dn_username = dn_username[0];

dn_body = "";

var dn_self = (dn_self==dn_user)?1:0;

if(dn_self==0){

	var dn_all = document.getElementsByTagName("td");

	dn_all[4].innerHTML = '<div id="dn_switcher2" style="margin-bottom:4px;display:none">[<a style="cursor:pointer;text-decoration:underline" onClick="document.getElementById(\'dn_switcher2\').style.display=\'none\';document.getElementById(\'dn_switcher\').style.display=\'block\';document.getElementById(\'dn_notepad\').style.display=\'block\';document.getElementById(\'dn_notepad_edit\').style.display=\'none\'">отменить редактирование</a>]</div><div id="dn_switcher" style="margin-bottom:4px;display:block">[<a style="cursor:pointer;text-decoration:underline" onClick="document.getElementById(\'dn_switcher2\').style.display=\'block\';document.getElementById(\'dn_switcher\').style.display=\'none\';document.getElementById(\'dn_notepad\').style.display=\'none\';document.getElementById(\'dn_notepad_edit\').style.display=\'block\'">редактировать</a>]</div><div id="dn_notepad_edit" style="display:none"><form onSubmit="return false"><textarea id="dn_textarea" style="width:95%;height:150px;padding:5px"></textarea><div align="right" style="width:95%"><input class="dn_submit" type="image" src="http://img.dirty.ru/lepro/yarrr.gif" style="border:0;margin:5px -10px 10px 0"></div></form></div><div id="dn_notepad" style="display:block;margin:9px 0 5px 0"><table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td width="11" height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif)"></td><td style="background-color:#d9d9d9"></td><td width="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif);background-position:right top"></td></tr><tr><td style="background-color:#d9d9d9"></td><td style="background-color:#d9d9d9;font-size:14pt;color:#696969" id="dn_notepad_td"><center><div style="width:30px;height:30px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center></td><td style="background-color:#d9d9d9"></td></tr><tr><td height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif);background-position:left bottom"></td><td style="background-color:#d9d9d9"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif);background-position:right bottom"></td></tr></table></div>'+dn_all[4].innerHTML;
	dn_all = "";

	dn_layer = document.getElementById("dn_notepad_td");

	function dn_get_hash(param){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/write/',true);
		xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.status==200){
					temp = xmlhttp.responseText;
					temp = temp.split(' name=wtf value="');
					temp = temp[1].split('"');
					temp = temp[0];
					if(param=="inbox") dn_new_inbox(temp);
					else dn_write_note(temp,document.getElementById("dn_textarea").value);
				}
				else if(xmlhttp.status==404) alert("URL doesn't exist!");
			}
		}
		xmlhttp.send(null);
	}

	function dn_get_inbox_num(){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/',true);
		xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.status==200){
					temp = xmlhttp.responseText;

					if(temp.indexOf('http://pit.dirty.ru/dirty/1/2010/04/23/11119-040541-f56ca7cbb6ae11943ec582da08875f63.png')>0){

						temp = temp.split('http://pit.dirty.ru/dirty/1/2010/04/23/11119-040541-f56ca7cbb6ae11943ec582da08875f63.png');
						temp = temp[1].split('a href="/my/inbox/');
						temp = temp[1].split('"');
						temp = temp[0];
						dn_set_cookie(temp);
						dn_storage = temp;
						dn_getNote(temp);
					}
					else dn_get_hash("inbox");
				}
				else if(xmlhttp.status==404) alert("URL doesn't exist!");
			}
		}
		xmlhttp.send(null);
	}

	function dn_new_inbox(hash){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/write',true);
		xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/write/');
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.status==200) dn_get_inbox_num();
				else if(xmlhttp.status==404) alert("URL doesn't exist!");
			}
		}
		xmlhttp.send('run=01&wtf='+hash+'&whom='+dn_self_name+'&comment=%3Cimg+src%3D%22http%3A%2F%2Fpit.dirty.ru%2Fdirty%2F1%2F2010%2F04%2F23%2F11119-040541-f56ca7cbb6ae11943ec582da08875f63.png%22+alt%3D%22%22%3E');
	}

	function dn_getNote(num){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/'+num,true);
		xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.status==200) dn_parseInbox(xmlhttp.responseText);
				else if(xmlhttp.status==404) dn_get_inbox_num();
			}
		}
		xmlhttp.send(null);
	}

	function dn_parseInbox(text){

		dn_username = dn_username.split('-').join('&#150;');

		if(text.indexOf('<div class="dt"><b>'+dn_username)>0){

			temp = text.split('<div class="dt"><b>'+dn_username);
			temp = temp[temp.length-1].split('</div>');
			temp = temp[0];

			temp_name = temp.split('<br>');
			temp_body = temp.substring(temp_name[0].length+4,temp.length);

			temp2 = temp_body.split('<br>').join("\r\n");
			temp2 = temp2.split('&#150;').join('-');
			temp2 = temp2.split('<span class=irony>').join('<irony>');
			temp2 = temp2.split('</span>').join('</irony>');


			dn_layer.innerHTML = temp_body;
			document.getElementById("dn_textarea").value = temp2;
		}
		else{
			dn_layer.innerHTML = '<center>...</center>';
		}
	}

	function dn_write_note(hash,text){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/'+dn_storage,true);
		xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/write/');
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.status==200){
					dn_layer.innerHTML = text.split("\n").join('<br>');
				}
				else if(xmlhttp.status==404) alert("URL doesn't exist!");
			}
		}
		xmlhttp.send('wtf='+hash+'&step=1&i=01&comment=<b>'+dn_username+'</b><br>'+text);
	}

	function dn_set_cookie(num){
		document.cookie = "d3.notepad.inbox="+num+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
	}

	function check_cookie(){

		if(document.cookie.indexOf('d3.notepad.inbox=')>0){
			temp = document.cookie.split('d3.notepad.inbox=');
			temp = temp[1].split(";");
			return temp[0];
		}
		else return 0;
	}

	function dn_submit(e){
		if(e.target.className=='dn_submit'){
			dn_layer.innerHTML = '<center><div style="width:30px;height:30px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
			document.getElementById("dn_switcher2").style.display="none";
			document.getElementById("dn_switcher").style.display="block";
			document.getElementById("dn_notepad").style.display="block";
			document.getElementById("dn_notepad_edit").style.display="none";
			dn_get_hash("note");
		}
	}

	var dn_storage = check_cookie();

	if(dn_storage==0) dn_get_inbox_num();
	else dn_getNote(dn_storage);

	document.addEventListener('click',dn_submit,true);
}