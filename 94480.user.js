// ==UserScript==
// @name           ModerTools
// @description    Tools for forum-moders
// @namespace      klavogonki
// @include        http://klavogonki.ru/forum/news*
// @include        http://klavogonki.ru/forum/general*
// @include        http://klavogonki.ru/forum/events*
// @include        http://klavogonki.ru/forum/academy*
// @include        http://klavogonki.ru/forum/problems*
// @include        http://klavogonki.ru/forum/flood*
// @include        http://klavogonki.ru/forum/testing*
// @author         Fenex
// @version        2.0.7
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function checked_box_forum(fnx_n){
	var a1 = document.getElementsByClassName('item');
	for (i=0;i<a1.length;i++)
		a1[i].getElementsByTagName('input')[0].checked = fnx_n;
}
function invert(){
	var a1 = document.getElementsByClassName('item');
	for (i=0;i<a1.length;i++)
		a1[i].getElementsByTagName('input')[0].click();
}
function send_forumTitle(id_theme) {
	document.getElementById('load_img_'+id_theme).style.display = "";
	new (Ajax.Request)("/ajax/forum-edit-title", {parameters: {topic: id_theme, title: document.getElementById('txt_'+id_theme).value}, onSuccess: function (transport) {document.getElementById('load_img_'+id_theme).style.display = "none";document.getElementById('btn_'+id_theme).style.display = "none";document.getElementById('a_href_'+id_theme).style.display = "";(document.getElementById('btn_'+id_theme).parentNode.parentNode.getElementsByTagName('a')[0]).getElementsByTagName('noindex')[0].innerHTML = document.getElementById('txt_'+id_theme).value;(document.getElementById('btn_'+id_theme).parentNode.parentNode.getElementsByTagName('a')[0]).style.display = "";}});
}
function edit_forumTitle(id_theme) {
	document.getElementById('txt_'+id_theme).value = (document.getElementById('btn_'+id_theme).parentNode.parentNode.getElementsByTagName('a')[0]).getElementsByTagName('noindex')[0].innerHTML;
	document.getElementById('btn_'+id_theme).style.display = "";
	document.getElementById('a_href_'+id_theme).style.display = "none";	
	(document.getElementById('btn_'+id_theme).parentNode.parentNode.getElementsByTagName('a')[0]).style.display = "none";
	document.getElementById('txt_'+id_theme).focus();
}
function close_forumTitle(id_theme) {
	document.getElementById('btn_'+id_theme).style.display = "none";
	document.getElementById('a_href_'+id_theme).style.display = "";	
	(document.getElementById('btn_'+id_theme).parentNode.parentNode.getElementsByTagName('a')[0]).style.display = "";
}
function closeTitle() {
	$('topic-title-edit-block').hide();
	$('topic-title-block').show();
}
function invert_topic() {
	var mchks = document.getElementsByClassName('list')[0].getElementsByClassName('chkbox');
	for (i=0;i<mchks.length;i++)
		mchks[i].getElementsByTagName('input')[0].checked = (!(mchks[i].getElementsByTagName('input')[0].checked));
	count_posts();
}
function checked_box_topic(fnx_n) {
	var mchks = document.getElementsByClassName('list')[0].getElementsByClassName('chkbox');
	for (i=0;i<mchks.length;i++)
		mchks[i].getElementsByTagName('input')[0].checked = fnx_n;
	count_posts();
}
function uncheck(id) {
	document.getElementById('post-'+id).parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked = false;
	count_posts();
}
function count_posts() {
	var arr="";
	var id_popup = '"popup"';
	var e = document.getElementsByClassName('list')[0].getElementsByClassName('chkbox');
	var count=0;
	for (k=0;k<e.length;k++) {
		if(e[k].getElementsByTagName('input')[0].checked) {
			var id = e[k].getElementsByTagName('input')[0].getAttribute("name").substring(5, e[k].getElementsByTagName('input')[0].getAttribute("name").length-1);
			var author = document.getElementById('username-'+id).innerHTML;
			var post_href = '"' + location.href.substring(0, location.href.lastIndexOf('/')+1) + '#post' + id + '"';
			var author_href = '"' + document.getElementById('username-'+id).getAttribute('href') + '"';
			arr+="[<span style='cursor:pointer;'><b onmouseout='$("+id_popup+").hide();' onmousemove='showPost("+id+", "+'"'+author_href.substr(10)+")'><a style='color:black; text-decoration:none;' href="+post_href+">"+id+"</a></b>"+"(<a href="+author_href+">"+author+"</a>)<img src='http://klavogonki.ru/img/logout.gif' title='Снять выделение' onclick='uncheck("+id+")' /></span>] ";
			count++;
		}
	}	
	document.getElementById('numbers_check_posts').innerHTML = "<b><u>Выбраны сообщения ("+count+"):</u> </b>"+arr;
}
function showPost(id_post, id_user) {
	var info = ((document.getElementById('text-'+id_post).innerHTML).replace(/\[.*?\]/g, '')).substring(0, 750)+"<br />...";
	var login = (document.getElementById('username-'+id_post).innerHTML);
	var obj = $("popup");
	var content = $("popup_content");
	content.update('<table><tr><td><a href="/profile/'+id_user+'/" style="background: transparent url(http://img.klavogonki.ru/avatars/'+id_user+'.gif) no-repeat scroll 0% 0%; padding-left: 20px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">'+login+'</a> | (ID: '+id_user+')</td></tr><tr><td>'+info+'</td></tr><table>');
	obj.style.left=window.mouseX+10+"px";
	obj.style.top=window.mouseY-75+"px";
	obj.show();
}
	//title-moder
	if(document.getElementById('topic-title-edit-block')) {
		var el = document.getElementById('topic-title-edit-block').getElementsByTagName('button')[0];
		var a = document.createElement('button');
		a.innerHTML = 'Отмена';
		a.setAttribute('onclick', 'closeTitle()');
		el.parentNode.insertBefore(a, el.nextSibling);
		var s=document.createElement('script');
		s.innerHTML = closeTitle;
		document.body.appendChild(s);
	}
	
	//topic-moder
	if((document.getElementsByClassName('list')[0])&&(document.getElementsByClassName('list')[0].getElementsByClassName('chkbox'))&&(document.getElementsByClassName('list')[0].getElementsByClassName('chkbox').length > 0)) {
		var f = document.getElementsByClassName('list')[0].getElementsByClassName('chkbox');
		for(i=0;i<f.length;i++)
			if(f[i].getElementsByTagName('input')[0])
				f[i].getElementsByTagName('input')[0].setAttribute('onclick', 'count_posts()');
		var s = document.createElement('script');
		s.innerHTML = checked_box_topic+count_posts+uncheck+showPost+invert_topic;
		document.body.appendChild(s);
		var createElem = document.createElement('span');
		createElem.innerHTML = '<input type="button" value="Выбрать всё" id="fnx_btn_check_all_topic" onclick="checked_box_topic(true);"> <input type="button" value="Снять со всех" id="fnx_btn_decheck_all_topic" onclick="checked_box_topic(false);"> <input style="dislay:none;" type="button" value="Инвертировать" id="fnx_btn_invert_all_topic" onclick="invert_topic();"><br><div id="numbers_check_posts"></div>';
		document.getElementById('move-block').parentNode.parentNode.insertBefore(createElem, document.getElementById('move-block').parentNode.nextSibling);
		count_posts();
	}
	
	//forum-moder
	if(document.getElementsByClassName('item')[0] && document.getElementsByClassName('item')[0].getElementsByTagName('input')[0]) {
		var s = document.createElement('script');
		s.innerHTML = checked_box_forum + invert + edit_forumTitle + send_forumTitle + close_forumTitle + closeTitle;
		document.body.appendChild(s);
		
		var createElem = document.createElement('span');
		createElem.innerHTML = ' <input type="button" value="Выбрать всё" id="fnx_btn_check_all_forum" onclick="checked_box_forum(true);"> <input type="button" value="Снять со всех" id="fnx_btn_decheck_all_forum" onclick="checked_box_forum(false);"> <input type="button" value="Инвертировать" id="fnx_btn_invert_all_forum" onclick="invert();"><br>';
		document.getElementById('write-link').parentNode.insertBefore(createElem, document.getElementById('write-link'));
		
		for (i=0; i<document.getElementsByClassName('item').length;i++) {
			var id_topic = document.getElementsByClassName('item')[i].getElementsByTagName('input')[0].getAttribute('name').substring(6, document.getElementsByClassName('item')[i].getElementsByTagName('input')[0].getAttribute('name').length - 1);
			var a_href = document.createElement('span');
			a_href.innerHTML = ' <span style="display:none" id="btn_'+id_topic+'"><input style="width:60%" id="txt_'+id_topic+'" type="text" /><input type="button" value="ОК" onclick="send_forumTitle('+id_topic+')" /><input type="button" value="Отмена" onclick="close_forumTitle('+id_topic+')" /></span><a id="a_href_'+id_topic+'" href="javascript:edit_forumTitle('+id_topic+')"><img src="http://klavogonki.ru/img/pencil.png" /></a> <img id="load_img_'+id_topic+'" src="/img/small_loading.gif" style="display:none">';
			document.getElementsByClassName('item')[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].parentNode.insertBefore(a_href, document.getElementsByClassName('item')[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].nextSibling);
		}
	}