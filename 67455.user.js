// ==UserScript==
// @name           VKontakte Group Banning Easy | Лёгкий бан в группах
// @description    Теперь банить в группах можно сразу со стены или из комментариев к чему-либо. Автоматически комментарий или пост на стене отправляется в спам (можно щёлкнуть с Ctrl, чтобы этого не произошло). При просмотре фотографий в альбомах ссылки для бана могут появиться с задержкой до трёх секунд, это нормально. Скрипт - бета-версия, обо всех проблемах пишите.
// @version        1beta
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://vkontakte.ru/*
// ==/UserScript==

if (typeof(unsafeWindow) == "undefined") unsafeWindow = new Object;

unsafeWindow.searchBox = false;

unsafeWindow.doBan = function(gid,mid,tid,e) {
	
//	alert(event.target);

if (!e.ctrlKey)
{
	try 
	{
		unsafeWindow.reportSpamPost(tid,"-"+gid);
	} catch(e) {
		unsafeWindow.reportSpamComment("-"+gid,tid);
	}
}

unsafeWindow.console.log(e);

var boxTitle, boxDoneLabel;

boxTitle = 'Отправить в изолятор';
boxDoneLabel = 'Заблокировать';
boxContentParams = {b:1};

unsafeWindow.show('loadProgress');
//if (!searchBox) {
	searchBox = new unsafeWindow.MessageBox({progress: 'invProgress'});
//}
searchBox.setOptions({title: boxTitle});

var onInvite = function(obj, text) {
	
	unsafeWindow.hide('loadProgress');
	searchBox.content(text);
	searchBox.removeButtons();
	searchBox.addButton({label: 'Отмена', style: 'button_no', onClick:searchBox.hide});
	searchBox.addButton({label: boxDoneLabel, onClick: function() {
		unsafeWindow.show('invProgress');
		var options = {onSuccess: function(obj, text) {
		unsafeWindow.hide('invProgress');
		searchBox.removeButtons();
		searchBox.addButton({label: 'Закрыть', style: 'button_no', onClick: function() {
			searchBox.hide();
		}});
	searchBox.content(text);
	setTimeout("searchBox.hide(600)", 1200);

	refreshCurrentSection();

	}, onCaptchaShow: function() {
	hide('invProgress');
	}};
	unsafeWindow.ge('inv_hash').value = unsafeWindow.decodehash(unsafeWindow.ge('inv_hash').value);
	unsafeWindow.Ajax.postWithCaptcha('groups_ajax.php', unsafeWindow.serializeForm(unsafeWindow.ge('invForm')), options);
	}});
	searchBox.show();
};
unsafeWindow.Ajax.Send('groups_ajax.php', unsafeWindow.extend({act: 'a_inv_by_link', page: 'http%3A%2F%2Fvkontakte.ru%2Fid'+mid, gid: gid}, boxContentParams), onInvite);
return false;
return true;
}


unsafeWindow.addBanToActions = function()
{
	if (document.location.href.indexOf("/club")!=-1 || document.location.href.indexOf("/group.php")!=-1 || document.getElementById("wrapHI").getElementsByTagName("A")[0].href.indexOf("/club")!=-1)
	{
		acti = document.getElementsByClassName("actions");//,document.getElementById("wall"));
		if (document.location.href.indexOf("/club")!=-1)
		{
			groupId = (document.location.pathname.split("?")[0].replace("/club",""));
		} else {
			groupId = document.getElementById("wrapHI").getElementsByTagName("A")[0].href.replace("http://vkontakte.ru","").replace("/club","");
		}
	
		for (i in acti)
		{
			if (acti[i].innerHTML.indexOf("doBan")!=-1) { return false; }
			mid = acti[i].parentNode.parentNode.getElementsByClassName("memLink")[0].href.split("/id")[1];
			tid = acti[i].parentNode.parentNode.getElementsByClassName("text")[0].id.replace("wPost","");
			if (tid == "") tid = acti[i].parentNode.parentNode.parentNode.id.replace("comm",""); // it's a comment, baby
			acti[i].innerHTML += "<span class='sdivide'>|</span><a href=\"javascript://\" onclick=\"doBan("+groupId+","+mid+","+tid+",event);return false;\"><small>Забанить</small></a>";
		}
	setTimeout("addBanToActions()","3000");
	}
}

unsafeWindow.addBanToActions();