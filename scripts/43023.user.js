// ==UserScript==
// @name           VkPlus
// @namespace      http://vkontakte.ru/3551861
// @description    Расширение функционала ВКонтакте.ру
// @include        http://vkontakte.ru/*
// ==/UserScript==
// Author: JUNK
// Version: 5.04


var vkpathVersion = 5.06;

var GET = parseGET();



var args = Array();
var param = Array();

// addParam(имя,по-умолчанию,минимум,максимум,дробное?)
addParam('useLinks');
addParam('shortMenu',false);
addParam('hideMyInMenu');
addParam('confirmOpinion');
addParam('directLinks',false);
addParam('newComments',false);
addParam('checkNewComments',false);
addParam('downAudio');
addParam('uniqAudio');
addParam('removeAudiosAuthor');
addParam('showDublCount');
addParam('checkUpdates');
addParam('showReply');
addParam('downVideo');
addParam('skipVersion',0,0,99*99,true);
addParam('inviteAll');
addParam('horLinks',false);
addParam('rightMenu',false);
addParam('comfirmWhenPlaying');
addParam('updatePer',5,0.05,800,true);
addParam('confirmGraffiti');
addParam('main_status',true);
addParam('inviz',true);
addParam('menuRightAlignment');
addParam('groupList');
addParam('clearGroup',false);
addParam('searchVideo');
addParam('invertTitle');
addParam('searchVideoTimeout',10,0.2,300,true);
addParam('notifyNewMessage');
addParam('notifyNewMessageOnce');
addParam('notifyNewMessageSound','');
addParam('notifyNewMessageSoundVolume',100,1,100);
addParam('widescreen',false);
addParam('widescreenInc',400,0,5000);
addParam('removeMe');
addParam('checkNewMessages');
addParam('checkNewMessagesTimeout',30,1,108000);
addParam('removeBanners',false);
addParam('popupMessage');
addParam('popupReply');
addParam('friendsonline',false);



if (GET['VkPlus'] != undefined)
	showMessageSettSaved();


setParams(args);

getParams(args);




// глобализуем параметры
// !!! Переделать все параметры в скрипте в массив param
for (var i in param) {
	var valStr;
	if (typeof(param[i]) == 'string') {
		valStr = 'var '+i+' = "'+param[i].replace(/\\/g,"\\\\").replace(/\"/g,"\\\"")+'";';
	} else
		valStr = 'var '+i+' = '+param[i].toString()+';';

	eval(valStr);
}

// ID текущего пользователя, т.е. авторизированного
var currentUserId = getCookie('remixmid');


// Добавляем служебные слои
if (document.getElementsByTagName('body').length > 0) {
	var servLayout = document.createElement('div');
	servLayout.id = 'notify_sound';
	document.getElementsByTagName('body')[0].appendChild(servLayout);
}

// ### /*

//document.getElementById('banner2').innerHTML = '';

// Широкий контакт
// by vkchk
if (widescreen) {
	var inc = widescreenInc;
		if (widescreenInc == '') {
			inc = Math.abs(document.documentElement.clientWidth - 800);
		}
	vkontakte_widescreen_mod(inc);
}

// Удаляем рекламу
if (removeBanners) {

	/*
	 * Подмена ф-ии загрузчика рекламы.
	 */
	if (typeof(unsafeWindow.BannerLoader) != 'undefined')
		unsafeWindow.BannerLoader.init = function(id) {};
	
	
	function hideSomeElement(id) {
		if (document.getElementById(id)) {
			var elem = document.getElementById(id);
			elem.style.display = 'none';	
			elem.style.visibility = 'hidden';
		}
	}
	
	
	hideSomeElement('banner1');
	hideSomeElement('banner2');
}

// Корректировка бокового меню
// Получение числа новых сообщений
var newMessagesCount = 0;
if (document.getElementById("nav") != null) {
	var elements = document.getElementById("nav").getElementsByTagName("a");
	var parts = new Array;
	var space;
	
	for (i=0;i<=elements.length-1;i++) { 
		// Получение числа новых сообщений
		if (elements[i].href.search(/\/mail\.php\?/) > -1) {
			elements[i].id = 'messageMenuItem';
			var mtch = elements[i].innerHTML.match(/\(<b>([0-9]+)<\/b>\)/);
			if (mtch != null) {
				newMessagesCount = mtch[1];
			}
		}
		
		// корректировка меню
		space = elements[i].innerHTML.indexOf(" ");
		if (space > -1) {
			parts[0] = elements[i].innerHTML.substring(0,space);
			parts[1] = elements[i].innerHTML.substring(space);
			if (shortMenu && i>1) {
				elements[i].innerHTML = parts[1];
			} else if(hideMyInMenu && parts[0].length<=4) {
				elements[i].innerHTML = "<font color='#9DCBBF'>"+parts[0]+"</font> "+parts[1];
			}
		}
	}
}

// Новое входящее сообщение
var notifySound = notifyNewMessageSound;
if (notifyNewMessageSound == '') {
	notifySound = getNorifySoundBase64();
}
if (newMessagesCount > 0 && location.pathname != '/mail.php') {
	newMessageHandler(newMessagesCount);
}
GM_setValue('messagesCount',newMessagesCount);

// Исправление ссылок на прямые
if (directLinks) {
	var elements = document.getElementsByTagName("a");
	var reg = new RegExp(/http:\/\/vkontakte\.ru\/away\.php\?to=([^&]+)/);
	for (i=0;i<=elements.length-1;i++) { 
			if (reg.test(elements[i].getAttribute("href"))) {
				var link = decodeURIComponent(elements[i].getAttribute("href").match(reg)[1]);
				elements[i].setAttribute("href",link);
			}
	}
}

// Меню справа
if (rightMenu && !widescreen) {
	var sideBar = document.getElementById("sideBar");
	var pageBody = document.getElementById("pageBody");
	
	pageBody.setAttribute('style','float: left; margin-left: 17px; margin-right: 0px;');
	sideBar.setAttribute('style','float: right; margin: 5px 20px 0px 4px;');
}
// Выравнивание меню справа
if (menuRightAlignment) {
	document.getElementById("sideBar").align='right';
	document.getElementById("sideBar").setAttribute("style","position:fixed !important;top:40px;");

}

// Предупреждение при переходе со страницы во время проигрывания аудио
if (comfirmWhenPlaying && document.getElementsByTagName('body').length) {
	document.getElementsByTagName('body')[0].setAttribute('onbeforeunload','function playingNow() {var links = document.getElementsByTagName("link");for(i in links){var ico = links[i];if (ico && ico.parentNode && (ico.rel == "shortcut icon")) {return (ico.getAttribute("href") == "/images/playicon.ico");}}} if (playingNow()) {return false};');
}

// Открывать поле отправки сообщения
if (showReply && document.getElementById("r") != null) {
	document.getElementById("r").style.display="block";
	document.getElementById("br").style.display="block";
}

// Заголовок окна
if (invertTitle) {
	document.title = document.title.split(' | ').reverse().join(' | ');
}

// Добавление пункта Комментарии
if (newComments) {
	var commLink = "<li><a id=\"comments_menuitem\" class=\"more\" href=\"news.php?act=bookmarks\">Комментарии</a></li>";
	var menuBar = document.getElementById("nav");
	if (menuBar != null) {
		if (menuBar.innerHTML.indexOf("<ol id=\"nav\" style=\"margin-bottom: 0px;\">")>-1) {	// есть хотя-бы один дополнительный пункт
			menuBar.innerHTML = menuBar.innerHTML.replace("<ol id=\"nav\" style=\"margin-bottom: 0px;\">","<ol id=\"nav\" style=\"margin-bottom: 0px;\">"+commLink);
		} else {
			menuBar.innerHTML += "<div class=\"moreDiv\"><ol id=\"nav\" style=\"margin-bottom: 0px;\">"+commLink+"</ol></div>";
		}
	}
}


// Предотвратить закрытие граффити
// ### /graffiti.php?act=draw
if (location.pathname == '/graffiti.php' && GET['act'] == 'draw' && confirmGraffiti) {
	document.getElementsByTagName('body')[0].setAttribute('onbeforeunload','return false');
}

// Удалить себя с фотографии
if (location.pathname == '/photos.php' && GET['act'] == 'show' && removeMe) {
	var element = document.getElementById('phototags').innerHTML;
	var reg = new RegExp("<a href=\"photos\\.php\\?act=user&amp;id="+currentUserId+"\">[^<]+<\/a> \\| <a href=\"#\" onclick=\"(return removeTag\\([0-9]+, '[0-9_]+'\\))");
	if (reg.test(element)) {
		var match = element.match(reg);
		var msg = document.getElementById('msg');
		if (msg != null)
			msg.innerHTML = msg.innerHTML.replace(/, ([^]+)\.$/,", <a href='#' onClick=\"document.getElementById('deleteMeLink').style.display='none';document.getElementById('msg').style.display='none';"+match[1]+"\">$1</a>.");
			
		document.getElementById('photoactions').innerHTML += getLinkForDeleteMe(match[1],'Удалить себя')
		
	}
}

// Удалить себя с видео
if (/\/video[0-9]/.test(location.pathname) && removeMe) {
	var element = document.getElementById('videotags').innerHTML;
	var reg = new RegExp("<a href=\"profile\\.php\\?id="+currentUserId+"\">[^<]+<\/a> \\(<a href=\"#\" onclick=\"(return removeTag\\([0-9]+\\))");
	if (reg.test(element)) {
		var match = element.match(reg);
		var msg = document.getElementById('message');
		if (msg != null)
			msg.innerHTML = msg.innerHTML.replace(/, ([^]+)\.$/,", <a href='#' onClick=\"document.getElementById('deleteMeLink').style.display='none';document.getElementById('message').style.display='none';"+match[1]+"\">$1</a>.");
		
		document.getElementById('videoactions').innerHTML += getLinkForDeleteMe(match[1],'Удалить себя')
	}
}

function getLinkForDeleteMe(act,text) {
	return "<a id='deleteMeLink' href='#' onClick=\"document.getElementById('deleteMeLink').style.display='none';document.getElementById('msg').style.display='none';document.getElementById('msg').style.display='none';"+act+"\">"+text+"</a>";
}


var useGMFunction = false;		// не использовать по возможности фунции GreaseMonkey
// ##########################################################################################################
// #################################
// #################################                     Проверка новых комментариев
// #################################
// ########################################################################################################## 
var xmlhttp;
var lastChkTime = parseInt(GM_getValue('commentsChkTime',0));
if (newComments && checkNewComments) {
	if (location.pathname == '/news.php' && GET['act'] == 'bookmarks') {
		var comments = parseComments(document.body.innerHTML);
		GM_setValue('comments',serializeArr(comments));
	} else {
		if (useGMFunction) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://vkontakte.ru/news.php?act=bookmarks',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
        			'Cookie': document.cookie,
					},
    			onload: checkComments
			});
		} else {
			xmlhttp = getXMLhttp();
			xmlhttp.open('GET', '/news.php?act=bookmarks', true);
			xmlhttp.onreadystatechange = checkCommentsXML;
			xmlhttp.send(null);
		}
	}
}


function checkCommentsXML() {
	if (xmlhttp.readyState == 4) {
		checkComments(xmlhttp);
	}
}

// Проверка наличия новых комментариев
function checkComments(responseDetails) {
	if (responseDetails.status == 200) {
	    	var actualComm = parseComments(responseDetails.responseText.split("<body>")[1].split("</body>")[0]);
	    	var oldComm = unserializeArr(GM_getValue('comments',''));
	    	
	    	var newCount = countArrDiffs(oldComm,actualComm);
	    	
	    	if (newCount > 0) {
	    		document.getElementById("comments_menuitem").innerHTML += " (<b>"+newCount+"</b>)";
	    	}
   	}
}
// Поиск новых записей в массиве новых коментариев по сравнению с массивом просмотренных. Во-как!
// по сути дела вычитание массивов и возврат кол-ва элементов
// ( actualComm - oldComm ).length
function countArrDiffs(oldComm,actualComm) {
	var count = 0;	// кол-во новых
	var foundedOld = 0;	// кол-во уже просмотренных из актуальных
	var j = 0;
	oldComm.sort();
	actualComm.sort();
	
	for(i=0;i<=oldComm.length-1;i++) {
		for(j=0;j<=actualComm.length-1;j++) {
			if (oldComm[i] == actualComm[j]) {
				foundedOld++;
				break;
			}
		}
	}
	count = actualComm.length - foundedOld;	// кол-во новых = всего - просмотренных

	return count;
}


// Распарсивание странички комментов
// Возвращает массив (id автора,время)
function parseComments(content) {
	var reg = new RegExp(/<td id=\"startQuote\">\s+\n\s+<div>(?:[^<>]+(?:<br>|<br \/>)*[^<>]+)*<span id=\"endQuote\">&nbsp;<\/span><\/div>(?:<br>|<br \/>)<small>\(<a href=[\"\']id([0-9]+)[\"\']>[^<>]+<\/a> <b>([^<>]+)<\/b>\)<\/small>/g);
	
	var res;
	var arr = new Array();
	var i = 0;
	
	while(res = reg.exec(content)) {
		if (res[1] != currentUserId) {
			arr[i] = res[1] + "/" + res[2];
			i++;
		}
	}
	return arr;
}



// ##########################################################################################################
// #################################
// #################################                     Обновления
// #################################
// ##########################################################################################################       

if (checkUpdates == false) {	// сбрасываем пропуск версии при отключении обновлений
	GM_setValue('skipVersion','0');
	GM_setValue('lastUpdatesCheck','0');
}
var skipVersion = parseFloat(skipVersion);
var checkVKUpdateNow = GET['checkVKUpdateNow']?true:false;
// проверка обновления VkPlus
if (checkUpdates || checkVKUpdateNow) {
	var lastUpdatesCheck = GM_getValue('lastUpdatesCheck',0);
	var lastDate = new Date(lastUpdatesCheck);
	var nowDate = new Date();
	
	if (checkVKUpdateNow)
		showDialog('Обновление VkPlus','<center><h1><font color="#444444"><b>Проверка обновления…</b></font></h1></center>','','Скрыть','',hideFunc());
	
	if (nowDate.getTime() - lastDate.getTime() < 0) {
		GM_setValue('lastUpdatesCheck',nowDate.toUTCString());
	}

	if (lastDate.getTime() < nowDate.getTime() - updatePer*60*60*1000 || checkVKUpdateNow) {
		GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://klinifini.livejournal.com/19252.html',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
					},
    			onload: Update
			});
		
		GM_setValue('lastUpdatesCheck',nowDate.toUTCString());
	}
}
function Update(responseDetails) {
	if (responseDetails.status == 200) {
	    	var data = responseDetails.responseText.split("// ====== Script Info BEGIN")[1].split("// ====== Script Info END")[0].replace(/\n\/\/ /g,"\n");
	    	var version = parseFloat(data.split("=== Version")[1].split("=== Changelog")[0]);
	    	var clog = data.split("=== Changelog")[1].split("----------");
	    	var changelog = new Array();
	    	
	    	var strings;
	    	var vers;	    
	    	var changes;
	    	for(i=0;i<=clog.length-1;i++) {
	    		strings = clog[i].split("\n");
	    		strings.pop();
	    		vers = parseFloat(strings[1]);
	    		changes = strings.slice(2);
	    		changelog.push(new Array(vers,changes));
	    	}  // ченжлог есть
	    	
	    	if (version > vkpathVersion && (version > skipVersion || checkVKUpdateNow)) {
	    		ShowNewVersionDialog(version,changelog)
	    	} else if (checkVKUpdateNow) {
	    		ShowNoNewVersion(vkpathVersion);
	    	}
   	}
}


function ShowNewVersionDialog(version,changelog) {
	var title = "Обновление VkPlus";
	var text = '<h1><font color="#444444"><b>Доступна новая версия VkPlus '+version+'</b></font></h1><br><br>Изменения в новой версии:<ul>';
	for (i=0;i<=changelog[0][1].length-1;i++) {
		text += "<li>"+changelog[0][1][i]+"</li>";
	}
	text += "</ul><div align='right'><a href='?skipVersion="+version+"'>Пропустить версию</a></div>";
	showDialog("Обновление VkPlus",text,"Обновить","Отмена",hideFunc()+"location.href='http://userscripts.org/scripts/source/xxxxx.user.js'",hideFunc());	
}
function ShowNoNewVersion(version) {
	var title = "Обновление VkPlus";
	var text = '<center><h1><font color="#444444"><b>Ваша версия VkPlus '+version+' является самой последней</b></font></h1></center>';
	showDialog("Обновление VkPlus",text,'',"Ок",'',hideFunc());
}




// ##########################################################################################################
// #################################
// #################################                     Невидимка                                   
// #################################
// ##########################################################################################################
if (inviz) {
		today = new Date();
		expire = new Date();
		expire.setTime(today.getTime()+3600000*24*365);
		expire = expire.toGMTString();

		insheder_h1 = document.getElementById('header').getElementsByTagName('h1')[0];
			if (getCookie("VKScriptInvis") == "y") {
				insheder_h1.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#696029">Невидимка [ <span><span style="color:lime">On</span><span style="color:#696029"> | </span><a href="#" onclick="document.cookie=\'VKScriptInvis=n;expires='+ expire + '\';window.location.reload();">Off</a><span style="color:#696029"> ]</span></b>';
			}
			else {
				insheder_h1.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#696029">Невидимка [ </span><a href="#" onclick="document.cookie=\'VKScriptInvis=y;expires='+ expire + '\';window.location.reload();">On</a><span style="color:#696029"> | </span><span style="color:red">Off</span><span style="color:#696029"> ]</span></b>';
			}
	Invis();
}

// ##########################################################################################################
// #################################
// #################################                     Статус                                   
// #################################
// ##########################################################################################################
if (main_status) {
	if (document.getElementById("activity_editor") != null) {
		link_main_status = document.getElementById("activity_editor").getElementsByTagName('div')[1];
		link_main_status.innerHTML = '<textarea rows="10" id="edit_activity_text" name="edit_activity_text" onblur="return activity_editor.blur();" ></textarea><a id="edit_activity_toggle" href="#" onmousedown="return activity_editor.toggle_menu(event);" onclick="return false;">&nbsp;</a>';
	}
}

// ##########################################################################################################
// #################################
// #################################                     Пригласить всех
// #################################
// ##########################################################################################################    
// ### /groups.php
if ((location.pathname == '/groups.php' || location.pathname == '/events.php') && inviteAll) {
	var elements = document.getElementsByTagName('div');
	var reg = new RegExp(/return addToInvite\(([0-9]+)\)/);
	var element;
	for (i=0;i<=elements.length-1;i++) {
		if (elements[i].className == 'iPanel') 
			element = elements[i];
	}
	
	if (element != undefined) {
		elements = element.getElementsByTagName("div");
		var action = '';
		var id;
		for (i=0;i<=elements.length-1;i++) {
			id = elements[i].getAttribute('onclick').match(reg)[1];
			action += 'if(document.getElementById("toinvite'+id+'") != null){delToInvite('+id+')};addToInvite('+id+');';
		}
		element.getElementsByTagName("tbody")[0].innerHTML = "<tr style=''><td><div class='friendRow' onclick='"+action+"'><b>Пригласить всех</b></div></td></tr>" + element.getElementsByTagName("tbody")[0].innerHTML;
	}
	
}


// ###   /video123
// ##########################################################################################################
// #################################
// #################################                     Видео
// #################################
// ##########################################################################################################    
if (/\/video[-0-9]/.test(location.pathname) && downVideo) {
	var script = document.getElementsByTagName("script")[17].innerHTML;	// 17 - номер по счету скрипта… если изменят, придется менять…
	var vtag = script.match(/'vtag','([^']*)'/)[1];
	var host = script.match(/'host','([^']*)'/)[1];
	var vkid = script.match(/'vkid','([^']*)'/)[1];
	var link = src = "http://"+host+"/assets/videos/"+vtag+vkid+".vk.flv";
	
	document.getElementById("videoactions").innerHTML += "<a href='"+link+">Скачать</a>";
}

// ###   /search.php
// ##########################################################################################################
// #################################
// #################################                     Ссылки
// #################################
// ##########################################################################################################    
if (location.pathname == '/search.php' && useLinks) {

	var reg_notfriend = new RegExp(/<a href=\"friend.php\?act=add&amp;id=([0-9]+)&amp;h=([0-9a-zA-z]+)\">([^<]*)<\/a><\/li>/);
	var reg_friend = new RegExp(/<a href=\"friend.php\?act=remove&amp;id=([0-9]+)\">([^<]*)<\/a><\/li>/);
	var reg_nopage = new RegExp(/<ul id=\"nav\" style=\"margin: 0px; width: 150px;\">\s*<\/ul>/g);
	var idReg = new RegExp(/profile.php\?id=([0-9]+)/);
	

	if (document.getElementById("searchResults") != null) {
		var resultsElement = document.getElementById("searchResults").getElementsByTagName("div");
		for (i=0;i<=resultsElement.length-1;i++) {
			if (resultsElement[i].className == 'result clearFix') {
			
				var userid;
				if (idReg.test(resultsElement[i].innerHTML)) {
					userid = resultsElement[i].innerHTML.match(idReg)[1];						
				} else {
					userid = resultsElement[i].innerHTML.match(reg_notfriend)[1];
				}
				
				var notFriendLinks,friendLinks,deletedLinks;
				if (!horLinks) {
					notFriendLinks = "<li>&nbsp;</li><li>" + getLinksForNotFriend(userid).join("</li>\n<li>") + "</li></ul>";
					friendLinks = "<li>&nbsp;</li><li>" + getLinksForDeleted(userid).join("</li>\n<li>") + "</li></ul>";
					deletedLinks = "<ul id=\"nav\" style=\"margin: 0px; width: 150px;\"><li>" + getLinksForDeleted(userid).join("</li>\n<li>") + "</li></ul>";
				} else {
					notFriendLinks = "</ul><tr><td colspan='3'><br><center>| " + getLinksForNotFriend(userid).join(" | ") + " |</center></td></tr>";
					friendLinks = "</ul><tr><td colspan='3'><br><center>| " + getLinksForDeleted(userid).join(" | ") + " |</center></td></tr>";
					deletedLinks = "<tr><td colspan='3'><br><center>| " + getLinksForDeleted(userid).join(" | ") + " |</center></td></tr>";
				}
				
				resultsElement[i].innerHTML = resultsElement[i].innerHTML.replace(reg_notfriend,"<ul id=\"nav\" style=\"margin: 0px; width: 150px;\"><a href=\"friend.php?act=add&amp;id=$1&amp;h=$2\">$3</a></li>"+notFriendLinks);
				resultsElement[i].innerHTML = resultsElement[i].innerHTML.replace(reg_friend,"<ul id=\"nav\" style=\"margin: 0px; width: 150px;\"><a href=\"friend.php?act=remove&amp;id=$1\">$2</a></li>"+friendLinks);
				resultsElement[i].innerHTML = resultsElement[i].innerHTML.replace(reg_nopage,deletedLinks);	
			}
		}		
	}
	
}

// ## /audio.php
// ##########################################################################################################
// #################################
// #################################                     Аудио
// #################################
// ##########################################################################################################    

//GM_addStyle("#downloadmp3 {background:transparent url("+downloadImg+") no-repeat scroll 100% 100%;padding-right:17px;padding-top:5px;");

if ((location.pathname == '/audio.php' || location.pathname == '/audiosearch.php') && (downAudio || uniqAudio || removeAudiosAuthor)) {
	var audioL = document.getElementById("audios");
	if (audioL == null) {
		audioL = document.getElementById("bigResult");
	}
	var elements = audioL.getElementsByTagName("div");
	
	var regDownLink = new RegExp(/operate\([0-9]+,([0-9]+),([0-9]+),\'([0-9a-zA-z]+)\',[0-9]+\);/);
	var regInfo = new RegExp(/<b id=\"performer[0-9]+\">([^<]*)<\/b> - (?:<a href=\"javasсript: showLyrics\([0-9]+,[0-9]+\);\">)?<span id=\"title[0-9]+\">([^]*)(?:<\/a>)?<\/span>[^]*/);
	var regRemove = new RegExp(/<small>\((?:<a href=\"id[0-9]+\">[^<]+<\/a>)?\)<\/small>/);
	var currElement;
	var uniqId = 0;
	var audioList = Array();
	
	for (elNum=0;elNum<=elements.length-1;elNum++) {
		currElement = elements[elNum];
		if (currElement.className != "audioRow") {
			continue;
		}

		if (downAudio) {
			var onclck = currElement.getElementsByTagName("img")[0].getAttribute("onclick");
			var res = onclck.match(regDownLink);
			res[2] = strRepeat('0',5-res[2].length)+res[2];
			var href = "http://cs"+res[1]+".vkontakte.ru/u"+res[2]+"/audio/"+res[3]+".mp3";
		
			//currElement.getElementsByTagName("tr")[0].innerHTML = "<td style=\"width: 20px;padding-top: 5px;padding-right: 5px; vertical-align: top;\"><img id='downloadmp3' width=\"17\" height=\"16\" class=\"playimg\" onClick=\"javascript:alert('A')\"></td>" + currElement.getElementsByTagName("tr")[0].innerHTML;
			currElement.getElementsByTagName("td")[0].setAttribute("style","width: 52px;");
			currElement.getElementsByTagName("td")[0].innerHTML = "<a href=\""+href+"\" target='_blank'><img src=\""+getDownloadImageBase64()+"\"></a> " + currElement.getElementsByTagName("td")[0].innerHTML;
		}
		
		

		if (uniqAudio) {
			var info = currElement.getElementsByTagName("div")[0];
			var dur = currElement.getElementsByTagName("div")[1].innerHTML;
		
			var res = info.innerHTML.match(regInfo);
			if (res == null) {
				alert("Ошибка парсинга:\n"+info.innerHTML);
			}
			
			
			if (addAudioInfo(res[1],res[2],dur,uniqId) == false) {
				//alert("Повтор: \n"+res[0]+"\n"+res[1]+"\n"+res[2]+"\n"+res[3]);
				currElement.setAttribute("style","display: none;");
			} else {
				// Показывать кол-во дубликатов
				if (showDublCount) {
					info.innerHTML += "<span style=\"color: #9DCBBF\" id=\"audioInfo"+uniqId+"\" title=\"Кол-во дубликатов\"></div>";
					uniqId++;
				}
			}
		}
		
		if (removeAudiosAuthor) {
			currElement.getElementsByTagName("td")[1].innerHTML = currElement.getElementsByTagName("td")[1].innerHTML.replace(regRemove,'');
		}
		
	}
}

function addAudioInfo(perf,titl,dur,id) {
	perf = perf.toLowerCase().replace(/\s+/g,' ').replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/^the /g,'');
	titl = titl.toLowerCase().replace(/\s+/g,' ').replace(/^\s+/g,'').replace(/\s+$/g,'');
	if (dur.length == 0) {
		len = 0;
	} else {
		len = parseInt(dur.split(":")[0]*60)+parseInt(dur.split(":")[1]);		// Внимание! Предусмотрен только формат xx:xx. Формат x:xx:xx я не встречал
	}
	//var infoHash = crc32(perf)+"/"+crc32(titl)+"/"+dur;
	
	//parseInt 
	// Поиск идентичного элемента
	for(j=0;j<=audioList.length-1;j++) {
		if (audioList[j]['perf'] == perf && audioList[j]['titl'] == titl && Math.abs(len-audioList[j]['len']) <= 5) {
			if (showDublCount) {
				audioList[j]['count']++;
				document.getElementById("audioInfo"+audioList[j]['id']).innerHTML = "("+audioList[j]['count']+")";
			}
			return false;
		}
	}
	
	var arr = new Array();
	arr['perf'] = perf;
	arr['titl'] = titl;
	arr['len'] = len;
	arr['id'] = id;
	arr['count'] = 0;
	audioList.push(arr);
	
	return true;
}

// ### /profile.php или id*
if (location.pathname == '/profile.php' || location.pathname.substring(0,3) == '/id') {
	
	// Ссылки на удалённой странице
	var reg = new RegExp(/<div style=\"margin: 100px auto; font-size: 14px; text-align: center; height: 200px;\">([^<]*)<\/div>/);
	if (reg.test(document.getElementById("userProfile").innerHTML) && useLinks) {
		var userid = getIDFromURI();
		var deletedLinks;
		if (!horLinks) {
			deletedLinks = "<div style=\"margin: 100px auto; font-size: 14px; text-align: center;\">$1<\/div><br><div id=\"leftColumn\"><div id=\"profileActions\">"+getLinksForDeleted(userid).join("\n")+"<\/div><\/div>"
		} else {
			deletedLinks = "<div style=\"margin: 100px auto; font-size: 14px; text-align: center;\">$1<\/div><div><center>| "+getLinksForDeleted(userid).join(" | ")+" |</center><\/div>";
		}
		document.getElementById("userProfile").innerHTML = document.getElementById("userProfile").innerHTML.replace(reg,deletedLinks);
	}
	
	// Подтверждение отправки анонимного мнения
	if (document.getElementById("opinions") != null && confirmOpinion) {
		var element = document.getElementById("opinions").getElementsByTagName("span")[0];
		element.innerHTML = element.innerHTML.replace(/<a href=\"javascript: postOpinion\(\)\">([^]+)<\/a>/,"<a href=\"javascript:if(confirm('Вы действительно хотите отправить анонимное сообщение?')){postOpinion();}\">$1<\/a>");
	}
	
	// группы списком
	if (groupList || clearGroup) {
		var groups =  getElementByClassName(document.getElementById("groups"),'div','flexBox clearFix aPad');
		var fJoin = ' ▪ ';
		var suffix = '';
		if (groupList) {
			fJoin = '<br>';
			//suffix = '»&nbsp;&nbsp;';
			suffix = '<img src='+getGroupImageBase64()+'>&nbsp;&nbsp;';
		}
			
		var list = groups.innerHTML.match(/<a href=.*?<\/a>/g);
		var components;
		for (i in list) {
			
			components = list[i].match(/<a href=\"(.*?)\">(.*?)<\/a>/);
			if (clearGroup) {
				components[2] = clearString(components[2]);		// очищаем
				components[2] = correctString(components[2]);	// В верхний регистр
			}
			// Удаляем пустые группы
			if (components[2] == '')
				components[2] = 'Без названия';
			
			list[i] = suffix+"<a href='"+components[1]+"'>"+components[2]+"</a>";
		}
		groups.innerHTML = list.join(fJoin);
	}

}
// ##########################################################################################################
// #################################
// #################################                     Он-лайн                                   
// #################################
// ##########################################################################################################
if (friendsonline) {
	friends_online();
}

// ##########################################################################################################
// #################################
// #################################                     Новые сообщения
// #################################
// ##########################################################################################################  
var xmlhttp;
var chkInboxInterval;
if (location.pathname == '/mail.php' && !GET['out']) {		// только на первой странице входящих
	
}
if (checkNewMessages) {
	chkInboxInterval = setInterval(downloadInbox,checkNewMessagesTimeout*1000);
}
function downloadInbox() {
	xmlhttp = getXMLhttp();
	xmlhttp.open('GET', '/mail.php', true);
	xmlhttp.onreadystatechange = parseInbox;
	xmlhttp.send(null);
}
function parseInbox() {
	if (xmlhttp.readyState == 4) {
		var el = document.createElement('div');
		el.innerHTML = xmlhttp.responseText;
		var unreadMesIds = getUnreadMessagesIds(el);
		newMessageHandler(unreadMesIds.length,unreadMesIds);
	}
}
// получаем все id непрочитанных сообщений
function getUnreadMessagesIds(element) {
	var n = 0;
	var arr = new Array();
	var elements = element.getElementsByTagName('input');
	for (i=0;i<=elements.length-1;i++) {
		if (elements[i].id.indexOf('0msg') == 0) 
			arr.push(elements[i].value);
	}
	return arr;
}
	
function setMessCountOnMenu(count) {
	var el = document.getElementById('messageMenuItem').getElementsByTagName('b');	
	if (el.length > 0) {		
		if (count == 0) 		// удаляем 
			document.getElementById('messageMenuItem').innerHTML = document.getElementById('messageMenuItem').innerHTML.replace(/ \(<b>[0-9]+?<\/b>\)/,'');
		else
			el[0].innerHTML = count;
	} else if (count>0) {
		document.getElementById('messageMenuItem').innerHTML += ' (<b>'+count+'</b>)';	
	}
}
// Событие на новое сообщение
function newMessageHandler(count,messIds) {
	// Меняем в меню
	setMessCountOnMenu(count);
	
	var oldCount = GM_getValue('messagesCount',0);
	GM_setValue('messagesCount',count);
	
	// Звук
	if (notifyNewMessage && (  !notifyNewMessageOnce || count > oldCount )) {
			playSound(notifySound,notifyNewMessageSoundVolume);
	}
	
	
	
	if (messIds == undefined && count - oldCount == 1 && popupReply) {		// Если есть новое сообщение ОДНО, то скачиваем его Id
		downloadInbox();
		return;
	}
	
	if (count > oldCount && popupMessage && (!popupReply || count - oldCount > 1)) {
		showDialog('Сообщение','<center><h2>У вас '+count+getNumericalStr(count,' новое сообщение',' новых сообщения',' новых сообщений')+'.</h2></center>','','Ок','',hideFunc());
	}
	
	// Если только однр сообщение и окно ответа неактивно
	if (count - oldCount == 1 && popupReply) {
		if (document.getElementById('replyBoxOpened') == null || document.getElementById('replyBoxOpened').value != 'true') {
			setMessCountOnMenu(count-1);		// сейчас сообщение будет прочтено
			downloadMessage(messIds[0]); 		// прочли
			GM_setValue('messagesCount',count-1);
		}
	}
}

var messageID;
function downloadMessage(id) {
	messageID = id;
	xmlhttp = getXMLhttp();
	xmlhttp.open('GET', '/mail.php?act=show&id='+id, true);
	xmlhttp.onreadystatechange = showReplyBox;
	xmlhttp.send(null);
}
function showReplyBox() {
	if (xmlhttp.readyState == 4) {
		var element = document.createElement('div');
		element.innerHTML = xmlhttp.responseText;
		var content = element.getElementsByTagName('table')[1].innerHTML;
		
		if (document.getElementById('replyBoxOpened') == null)
			document.getElementsByTagName("body")[0].innerHTML += "<input type='hidden' name='replyBoxOpened' id='replyBoxOpened' value='true'>";
		else
			document.getElementById('replyBoxOpened').value = 'true';
			
		// Исправляем интерфейс
		document.getElementsByTagName("head")[0].innerHTML += "<link rel='stylesheet' href='css/mail2.css' type='text/css'>";
		document.getElementsByTagName("head")[0].innerHTML += "<link rel='stylesheet' href='css/dialog2.css' type='text/css'>";
		content = content.replace(/<td class=\"label\"([^>]*)>([^<]+)<\/td>/g,"<td class='label'$1><font color='gray'><b>$2</b></font></td>");
		content = content.replace(/reply_field/g,'reply_to_mess');		// меняем ID на уникальные
		content = content.replace(/postMessage/g,'postMessage_2');		//
		content = content.replace(/<ul class=\"nNav\">[^]*?<\/ul>/,'<a href="mail.php?act=do_delete&amp;id='+messageID+'&amp;out=0">Удалить</a>');
		content = content.replace(/<ul class=\"nNav\">[^]*?<\/ul>/,'');
		
		showDialog('Сообщение','<table>'+content+'</table>','Закрыть','Отправить',"document.getElementById('replyBoxOpened').value = 'false';"+hideFunc(),"this.disabled=true; if (ge('reply_to_mess').value.length > 1) {ge('postMessage_2').submit();} else {alert('Вы не ввели текст сообщения.'); return false;};"+hideFunc(),485);
	}
}
	
// ##########################################################################################################
// #################################
// #################################                     Поиск видео
// #################################
// ##########################################################################################################  

var resultsContainer;
var videosPerPage = 100;
var xmlhttp;
var searchWords;
var currPage = 0;
var lastpage = 0;
var foundVideos = 0;
var strForCountFound = '';
var elemForCountFound;
var timeout;
var loaderImage = "<div align='center' id='vkLoadImg' style='display: none'><img style='position: absolute;top: 107px;' src='"+getLoaderImageBase64()+"'>" +
				"<b><span style='font-size:10px;color: gray; position: absolute; top: 109px;' id='vkPerc' title='Поиск видео'></span></b></div>";
if (location.pathname == '/video.php' && GET['gid'] && searchVideo) {
	// Добавляю панель поиска
	var gid = GET['gid'];
	var column = getElementByClassName(document.getElementById('bigResult'),'div','column results');
	var vkpSearch = GET['vkpSearch']?GET['vkpSearch']:'';
	column.innerHTML = "<div id='searchVideo' style='margin: -5px 0px 5px; text-align: right;'><form method='GET' action='video.php' name='vSearch' id='vSearch'>"+
  						"<input name='gid' value='"+GET['gid']+"' type='hidden'>"+
						"<span class='sWord'>Поиск</span> <input class='inputText inputSearch' id='quickquery' name='vkpSearch' size='20' value='"+vkpSearch+"' style='width: 150px;' type='search'>"+
  						"<input style='display: none;' class='inputSubmit' value='Go' type='submit'></form></div>"+loaderImage+column.innerHTML;
  	
  	vkpSearch = clearString(vkpSearch);
	if (vkpSearch != '') {
		resultsContainer = getElementByClassName(document.getElementById('bigResult'),'div','result_wrap');
		
		showLoader();
		// Получаю кол-во страниц и убираю номера страниц
		var pageLists = getAllElementsByClassName(document.getElementById('content'),'ul','pageList');
		
		if (pageLists.length > 0) {
			var pageLinks = pageLists[0].getElementsByTagName('a');
			lastpage = pageLinks[pageLinks.length-1].href.match(/[&?]st=([0-9]+)/)[1]/videosPerPage;
			pageLists[0].innerHTML = '';
			pageLists[1].innerHTML = '';
		} 
		
		// Строка для кол-ва найденных
		elemForCountFound = getElementByClassName(document.getElementById('bigSummary'),'div','summary');
		strForCountFound = elemForCountFound.innerHTML;
		// Заголовок
		var element = document.getElementById('header').getElementsByTagName('h1')[0];
		element.innerHTML = element.innerHTML.replace(/ » (.+)/," » <a href='/video.php?gid="+gid+"'>$1</a>");
		searchWords = getWordsForSearch(GET['vkpSearch']);
		var buff = document.createElement('div');
		
		getSearchResult(searchWords,document.documentElement,buff);	// поиск по текущей странице в буфер
		
		resultsContainer.innerHTML = '';
		resultsContainer.innerHTML = buff.innerHTML;
		
		currPage = 0;
		getVideopage(currPage,i);
	}
}
function getVideopage(gid,page) {	
	xmlhttp = getXMLhttp();
	xmlhttp.open('GET', '/video.php?gid='+gid+'&st='+page*videosPerPage, true);
	xmlhttp.onreadystatechange = parseVideoPage;
	timeout = setTimeout( function(){ xmlhttp.abort(); getVideopage(gid,page) }, searchVideoTimeout*1000);
	xmlhttp.send(null);	
}




function parseVideoPage() {
	if (xmlhttp.readyState == 4) {
		clearTimeout(timeout);
		var el = document.createElement('div');
		el.innerHTML = xmlhttp.responseText;
		getSearchResult(searchWords,el);
		
		setPercent(100/lastpage*currPage);
		if (currPage<lastpage) {
			currPage++;
			getVideopage(gid,currPage);
		} else {
			hideLoader();
			if (foundVideos == 0)
				showNotFound();
		}
			
	}
}
function setPercent(per) {
	document.getElementById('vkPerc').innerHTML = strRepeat('&nbsp;',7)+Math.round(per*100)/100+'%';
}
function setCountFoundedVideos(count) {
	elemForCountFound.innerHTML = strForCountFound + "<span class='divider'>|</span> <b>Найдено "+count+" "+getNumericalStr(count,'видеофайл','видеофайла','видеофайлов') + '.';
}
function hideLoader() {
	document.getElementById('vkLoadImg').style.display = 'none';
}
function showLoader() {
	document.getElementById('vkLoadImg').style.display = '';
}
function showNotFound() {
	document.getElementById('bigResult').innerHTML += '<div class="fallBack">Не найдено ни одной видеозаписи с подобным названием или описанием.</div>';
}
function getSearchResult(searchWords,docum,buff) {
	var allElements = getAllElementsByClassName(docum,'div','result clearFix');	
	var words = new Array();
	var title;
		
	if (buff == undefined)
		buff = resultsContainer;
	var t = 0;

	for (r in allElements) {
		
		title = getVideoTitle(allElements[r]);
		words = getWordsForSearch(title);
		
		if (countArrDiffs(words,searchWords) == 0) {
			buff.appendChild(allElements[r]);
			foundVideos++;
			setCountFoundedVideos(foundVideos);
		}

	}
}

function getVideoTitle(element) {
	return getElementByClassName(element,'div','aname').getElementsByTagName('a')[0].innerHTML;
}
function getWordsForSearch(str) {
	str = str.replace(/[^a-zA-Z0-9а-яА-Я ]/g,' ');
	str = str.toLocaleLowerCase();
	return clearString(str).split(' ');
}

// ## /settings.php
// ##########################################################################################################
// #################################
// #################################                     Настройки
// #################################
// ##########################################################################################################    
if (location.pathname == '/settings.php') {
	var contentElements = document.getElementById("content").getElementsByTagName("div");
	var menuElements;
	var editorPanelElements;
	for (i=0;i<=contentElements.length-1;i++) {
		if (contentElements[i].className == "clearFix tBar") {
			menuElements = contentElements[i].getElementsByTagName('ul')[0];
		}
		if (contentElements[i].className == "editorPanel clearFix") {
			editorPanelElements = contentElements[i];
			break;
		}
	}
	
	if (GET['act'] != 'VkPlus') {
		// Добавляем нашу вкладку
		menuElements.innerHTML += '<li>'+settInActiveLink('VkPlus','?act=VkPlus','4.8em')+'</li>';
		
	} else {
		// Убираем активность основной вкладки
		var settLink = menuElements.getElementsByTagName('li')[0];
		var settLinkA = settLink.getElementsByTagName('a')[0];
		settLink.innerHTML = settInActiveLink(settLinkA.innerHTML,'/settings.php',settLinkA.style.width);
		settLink.className = '';
		
		// Добавляем нашу вкладку
		menuElements.innerHTML += '<li class="activeLink">'+settActiveLink('VkPlus','?act=VkPlus','4.8em')+'</li>';
		
		editorPanelElements.innerHTML = "     <div id=\"cname\" class=\"settingsPanel\">"+
		"<h4>VkPlus Настройки <small><font color='#98A7B5'>версия "+vkpathVersion+"</font></small></h4><div align='right'><small><a href='?checkVKUpdateNow=1&act=VkPlus'>Проверить обновление</a></small></div>"+
		"<form method=\"GET\" id=\"VkPlusSettings\" name=\"VkPlusSettings\" action=\"\"><input type=\"hidden\" name=\"act\" value='VkPlus'><input type=\"hidden\" name=\"VkPlus\">"+
		"<table class=\"editor\" style=\"margin-left: 0px; width: 420px;\" border=\"0\" cellspacing=\"0\">"+
		"<tbody>"+

			settCheckbox('useLinks',			'Ссылки',				'Добавить ссылки на разделы профиля для пользователей с недоступной страничкой.')+
			
			
			settCheckbox('checkNewComments',	'Новые комментарии',	'Показать кол-во новых комментариев рядом с ссылкой в боковом меню.')+
			settCheckbox('downVideo',			'Скачать видео',		'Добавить ссылку для скачивания видео.')+
			settCheckbox('confirmOpinion',		'Подтверждение мнения',	'Запрашивать подтверждение перед отправкой анонимного мнения.')+
			settCheckbox('confirmGraffiti',		'Подтверждение граффити','Запрашивать подтверждение при переходе со странички рисования граффити.')+
			settCheckbox('directLinks',			'Прямые ссылки',		'Убрать промежуточную страницу при переходе по внешней ссылке.')+
			settCheckbox('inviteAll',			'Пригласить всех',		'Добавить кнопку для приглашения всех друзей в группу или на встречу (ограничение сайта: не более 40 человек в сутки).')+
			settCheckbox('searchVideo',			'Поиск видео',			'Добавить возможность поиска видео в группе.')+
			settTextbox('searchVideoTimeout',	'Таймаут',				'Макс. время закачки одной стр. при поиске видео в секундах.','20px')+	
			settCheckbox('removeMe',			'Удалить себя',			'Добавить кнопки для быстрого удаления отметки о себе на фотографии или видео.')+	
			settCheckbox('removeBanners',		'Убрать рекламу',		'Убирает невидимые фреймы с баннерами.')+
			settCheckbox('main_status',			'Большой статус',		'Редактор статуса (вводишь что хочешь, и уводишь фокус с текстового поля).')+	
				
						
			settLine('Внешний вид')+
			settCheckbox('inviz',				'Невидимка',			'Невидимость В Контакте.')+
			settCheckbox('showReply',			'Сообщение на стену',	'Всегда открывать поле для отправки сообщения на стену.')+
			settCheckbox('friendsonline',		'Ссылка "Онлайн"',		'Скрипт добавляет ссылку "Онлайн" справа от Мои Друзья.')+
			settCheckbox('shortMenu',			'Короткое меню',		'Убрать слова “Мои” в боковом меню')+
			settCheckbox('hideMyInMenu',		'Затенить слово “Мои”',	'Затенить слова “Мои” в боковом меню.')+
			settCheckbox('newComments',			'Комментарии',			'Показать ссылку на комментарии в боковом меню.')+
			settCheckbox('horLinks',			'Ссылки горизонтально',	'Располагать ссылки на разделы горизонтально.')+
			settCheckbox('menuRightAlignment',	'Магнитное меню',		'Выравнивать пункты меню по правой стороне.')+
			settCheckbox('groupList',			'Группы списком',		'Показывать группы пользователя вертикальным списком.')+
			settCheckbox('clearGroup',			'Названия групп',		'Очистить названия групп.')+
			settCheckbox('invertTitle',			'Заголовок',			'Поменять в заголовке текущий раздел и имя сайта местами.')+
			settCheckbox('widescreen',			'Широкий контакт',		'Растянуть интерфейс сайта. При включении данной опции “Меню справа” будет игнорироваться. Автор: <a href="http://userscripts.org/users/56376" target="_blank">vkchk</a>. Оригинал: <a href="http://userscripts.org/scripts/show/28971" target="_blank">widescreen vkontakte mod</a>.')+
			settTextbox('widescreenInc',		'Добавка',				'Интерфейс будет расширен на заданное число пикселей. Оставьте это поле пустым, чтобы автоматически устанавливать максимальную ширину.','30px')+	

			settCheckbox('rightMenu',			'Меню справа',			'Расположить боковое меню справа (при медленной работе может “прыгать”, конфликтует с функцией “Широкий контакт”).')+
						
			
			settLine('Аудио')+
			settCheckbox('uniqAudio',			'Дубликаты mp3',		'Убрать повторяющиеся аудиозаписи.')+
			settCheckbox('showDublCount',		'Кол-во дубликатов',	'Показать кол-во дубликатов mp3.')+
			settCheckbox('downAudio',			'Скачать mp3',			'Добавить ссылки для скачивания mp3.')+
			settCheckbox('comfirmWhenPlaying',	'Прерывание аудио',		'Подтверждать переход со страницы во время проигрывания аудио.')+
			settCheckbox('removeAudiosAuthor',	'Авторы аудио',			'Убрать в результатах поиска ссылки на профили людей, выложивших аудиозапись.')+

			settLine('Сообщения')+
			settCheckbox('notifyNewMessage',	'Звук',					'Звуковое оповещение про наличии непрочитанных входящих сообщений.')+
			settCheckbox('notifyNewMessageOnce','Только новые',			'Звуковое оповещение только для новых сообщений')+
			settTextbox('notifyNewMessageSound','Файл',					'URL-адрес звукового файла. Оставьте это поле пустым чтобы использовать стандартный файл.','250px')+			
			settTextbox('notifyNewMessageSoundVolume','Громкость',		'Уровень громкости оповещения от 1% до 100%.','30px')+	
			settCheckbox('checkNewMessages',	'Проверка в фоне',		'Проверять периодически в фоне наличие новых сообщений.')+			
			settTextbox('checkNewMessagesTimeout','Интервал',			'Интервал между каждой проверкой новых сообщений в секундах.','20px')+	
			settCheckbox('popupMessage',		'Всплывающее окно',		'Показывать всплывающее окно при поступлении новых сообщений.')+
			settCheckbox('popupReply',			'Мгновенный ответ',		'Показывать сообщение полностью с возможностью ответа.')+	
	
				
			settLine('Обновление')+
			settCheckbox('checkUpdates',		'Обновление',			'Проверять наличие новых версий VkPlus.')+		
			settTextbox('updatePer',			'Периодичность',		'Периодичность преверки обновлений в часах.','20px')+	
		
		"</tbody></table>"+
		"<div style=\"height: 30px; margin-left: 143px;\">"+
		"<ul class=\"nNav\"><li>"+
		"<b class=\"nc\"><b class=\"nc1\"><b></b></b><b class=\"nc2\"><b></b></b></b>"+
		"<span class=\"ncc\"><a href=\"javascript:document.VkPlusSettings.submit();\">Сохранить</a></span>"+
		"<b class=\"nc\"><b class=\"nc2\"><b></b></b><b class=\"nc1\"><b></b></b></b>"+
		"</li></ul></div></form></div>";
	}
}

// ##########################################################################################################
// #################################
// #################################                     Функции
// #################################
// ##########################################################################################################




// Вкладка настроки
function settInActiveLink(title,href,width) {
	return "<a href='"+href+"' style='width: "+width+"; padding-top: 0pt;'><b class='niftycorners' style='background: transparent none repeat scroll 0% 0%; margin-left: 0px; margin-right: 0px; display: block; margin-bottom: 3px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'><b style='border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 2px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;'></b><b style='border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;'></b></b>"+title+"</a>";
}
function settActiveLink(title,href,width) {
	return "<a href='"+href+"' style='width: "+width+"; padding-top: 0pt;'><b class='niftycorners' style='background: rgb(255, 255, 255) none repeat scroll 0% 0%; margin-left: 0px; margin-right: 0px; display: block; margin-bottom: 3px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'><b style='border-style: solid; border-color: rgb(154, 177, 198); border-width: 0pt 1px; margin: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: rgb(54, 99, 142);'></b><b style='border-style: solid; border-color: rgb(154, 177, 198); border-width: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: rgb(54, 99, 142);'></b></b>"+title+"</a>";
}

// Категория настройки
function settLine(title) {
	return "<tr><td colspan='3'><h4>"+title+"</h4></td></tr>";
}
// Добавить пункт настройки - галочка
function settCheckbox(name,title,desc) {
	var checked = getChecked(eval(name));
	return "<tr>"+
			"<td class=\"label\" style=\"text-align: right; vertical-align: top;\">"+title+"</td>"+
			"<td style=\"width: 20px; text-align: right; vertical-align: top;\">"+
			"<input id=\""+name+"\" name=\""+name+"\" value=\"1\" "+checked+" type=\"checkbox\"></td>"+
			"<td style=\"padding: 4px 0px 10px 10px; width: 280px; text-align: left;\"><small>"+desc+"</small>"+
			"</td>"+
			"</tr>";
}
// Добавить пункт настройки - строка
function settTextbox(name,title,desc,width) {
	var value = eval(name);
	return "<tr class='password confirm_password tallrow'>"+
			"<td class='label' style='text-align: right; vertical-align: top;'>"+title+"</td>"+
			"<td style='text-align: left; vertical-align: top;' colspan='2'>"+
			"<input id='"+name+"' name='"+name+"' value='"+value+"' type='text' style='width: "+width+";'> <br><small style=\"color: rgb(119, 119, 119);\">"+desc+"</small></td>"+
			"</tr>";
}

// Получить элемент по имени класса
function getElementByClassName(container,tag,className) {
	var elements = container.getElementsByTagName(tag);
	for (i in elements) {
		if (elements[i].className == className) {
			return elements[i];
		}
	}
}

//ф-я добавления надписи "онлайн"
function friends_online() {
	var link_li = document.getElementById("myfriends");
	if (link_li) {
		var link_online = document.createElement("a");
		link_online.setAttribute("href","friend.php?act=online");
		link_online.setAttribute("style","color:grey;");
		link_online.innerHTML="Онлайн";
		link_li.setAttribute("style","clear:both;");
		link_li.childNodes[0].setAttribute("style","width:67px;float:left;padding:3px 3px 3px 6px;margin-");
		link_li.appendChild(link_online);
	}
}

// Получить все элементы по имени класса
function getAllElementsByClassName(container,tag,className) {
	var elements = container.getElementsByTagName(tag);
	var result = new Array();
	var findClasses = className.toLowerCase().replace(/\s+/g,' ').split(' ');
	var hereClasses;
	for (var i in elements) {
		hereClasses = elements[i].className.toLowerCase().replace(/\s+/g,' ').split(' ');
		if (countArrDiffs(hereClasses,findClasses) == 0) {
			result.push(elements[i]);
		}
	}
	return result;
}

// алиас 
function getElementsByClassName(className,tag,elem) {
	if (elem == undefined)
		elem = document;
	return getAllElementsByClassName(elem,tag,className);
}
//Невидимка
function Invis() {
	if ((getCookie('VKScriptInvis') == 'y')){
		var cok = document.cookie;

		if (cok.indexOf("remixpass") != -1) 
		{
			xmlhttpinviz = getXMLhttp();
			xmlhttpinviz.onreadystatechange = function() { 
				if (xmlhttpinviz.readyState == 3 || xmlhttpinviz.readyState == 4) {
					var aCookie = cok.split("; ");
					for (var i=0; i < aCookie.length; i++)
					{
						var aCrumb = aCookie[i].split("=");
						cookieName = aCrumb[0];
						cookieValue = unescape(aCrumb[1]);
              
						if (cookieName == 'remixemail' || cookieName == 'remixmid' || cookieName == 'remixmgid' || cookieName == 'remixsid' || cookieName == 'remixpass') {
							today = new Date();
							expire = new Date();
							expire.setTime(today.getTime()+3600000*24*365);
							document.cookie= cookieName+ "="+ escape(cookieValue)+";expires="+ expire.toGMTString()+'; path=/; domain=.vkontakte.ru';
						}

						cok = '';
					}
				}
			}
			xmlhttpinviz.open('GET', 'http://vkontakte.ru/login.php?op=logout');
			xmlhttpinviz.send(1);
		}
	}
}

// Показать всплывающее окно
function showDialog(title,text,buttOk_label,buttCancel_label,buttOk_action,buttCancel_action,width) {
	if (width == undefined) {
		width = 400;
	}
	
	var head = document.getElementsByTagName("head")[0];
	var cssLink = "css/box.css";
	if (head.innerHTML.indexOf(cssLink) == -1) {
		head.innerHTML += "<script src=\"js/box2.js\">";
		head.innerHTML += "<script src=\"js/box.js\">";
		head.innerHTML += "<link rel='stylesheet' href='css/box.css' type='text/css'>";
	}
	
	var buttonOk = "";
	if (buttOk_label != '')
		buttonOk = "<div id=\"button1Cont\" class=\"button1\" onmouseover=\"this.className='button1_hover';\" onmouseout=\"this.className='button1'\" onclick=\""+buttOk_action+"\"><div class=\"button1Line\"><div id=\"button1\">"+buttOk_label+"</div></div></div>";
	
	var buttonCancel = "";
	if (buttCancel_label != '')
		var buttonCancel = "<div id=\"button2Cont\" class=\"button2\" onmouseover=\"this.className='button2_hover';\" onmouseout=\"this.className='button2'\" onclick=\""+buttCancel_action+"\"><div class=\"button2Line\"><div id=\"button2\">"+buttCancel_label+"</div></div></div>";
	if (document.getElementById("boxFader") != null) {
		document.getElementById("boxFader").id = "nahui";
	}
	
	var boxBody = document.getElementById('boxBody');
	
	// из js/box.js
	var sctop = 0;
	var fw = 0, fh = 0;
	var left,top;
	if (self.innerWidth)
	{
		fw = self.innerWidth;
		fh = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
	{
		de = document.documentElement;
		fw = de.clientWidth;
		fh = de.clientHeight;		
		sctop = document.documentElement.scrollTop;		
	}
	// end
	left = fw / 2 - width / 2 + "px";
	//top = sctop + fh / 2 - bb.clientHeight / 2 - 50 + "px";
	
	document.getElementById("boxHolder").style.display='none';
	document.getElementById("boxHolder").innerHTML = "<div id=\"boxFader\" style=\"display: block; opacity: 1; left: "+left+"; top: 117.5px;\"><div style=\"width: "+width+"px;\" id=\"boxWrap\"><div style=\"display: block;\" id=\"boxBody\"><div id=\"nameLabel\"><div id=\"boxTitle\">"+title+"</div></div><div id=\"boxMessage\">"+text+"</div><div class=\"buttons\"><table align=\"right\"><tbody><tr><td>"+buttonCancel+"</td></tr></tbody></table><table align=\"right\"><tbody><tr><td>"+buttonOk+"</td></tr></tbody></table></div></div></div><iframe id=\"boxGoodFrame\" style=\"display: none; width: 1000px; height: 1000px;\"></iframe></div>";
	document.getElementById("boxHolder").style.display='';
	
}
// javascript ф-ия ддля скрытия Окна
function hideFunc() {
	return "var vkPath_faderTimer = 0;function vkPath_hideBox() {vkPath_faderTimer = setInterval(vkPath_fadeBox, 5);vkPath_fadeBox();}function vkPath_fadeBox() {var vkPath_boxfader = document.getElementById('boxFader');if (vkPath_boxfader.style.opacity <= 0.0) {clearInterval(vkPath_faderTimer);vkPath_faderTimer = 0;vkPath_boxfader.style.display='none'};vkPath_boxfader.style.opacity = vkPath_boxfader.style.opacity - 0.28;vkPath_boxfader.style.filter = 'alpha(opacity='+vkPath_boxfader.style.opacity*100+')';}vkPath_hideBox();";
}

// Ставить галку?
function getChecked(variable) {
	return variable ? 'checked="checked"' : '';
}

// Вырываем ID пользователя ил URI
function getIDFromURI() {
	var URIpart = location.search;
	if (URIpart.length > 0) {
		URIpart = URIpart.substring(1);
		URIargs = URIpart.split('&');
		for (i=0;i<=URIargs.length-1;i++) {
			if (URIargs[i].substring(0,2) == 'id') {
				return URIargs[i].substring(3);
			}
		}
	}
	
	if (location.pathname.substring(0,3) == '/id')
		return location.pathname.substring(3);
}

// Формирование ссылок для удаленных страниц
function getLinksForDeleted(userid) {
	links = new Array();
	links[0] = "<a href=\"http://vkontakte.ru/wall.php?id="+userid+"\">Стена</a>";
	links[1] = "<a href=\"http://vkontakte.ru/notes.php?id="+userid+"\">Заметки</a>";
	links[2] = "<a href=\"http://vkontakte.ru/groups.php?id="+userid+"\">Группы</a>";
	links[3] = "<a href=\"http://vkontakte.ru/apps.php?mid="+userid+"\">Приложения</a>";
	links[4] = "<a href=\"http://vkontakte.ru/questions.php?mid="+userid+"\">Вопросы</a>";
	links[5] = "<a href=\"http://vkontakte.ru/opinions.php?id="+userid+"\">Мнения</a>";
	links[6] = "<a href=\"http://vkontakte.ru/video.php?act=tagview&id="+userid+"\">Видео с…</a>";
	links[7] = "<a href=\"http://vkontakte.ru/photos.php?act=user&id="+userid+"\">Фотографии с…</a>";
	links[8] = "<a href=\"http://vkontakte.ru/audio.php?id="+userid+"\">Аудио</a>";
	links[9] = "<a href=\"http://vkontakte.ru/video.php?id="+userid+"\">Видео</a>";
	links[10] = "<a href=\"http://vkontakte.ru/photos.php?id="+userid+"\">Фото</a>";
	return links;
}
// Формирование ссылок для недрузей
function getLinksForNotFriend(userid) {
	links = new Array();
	links[0] = "<a href=\"http://vkontakte.ru/notes.php?id="+userid+"\">Заметки</a>";
	links[1] = "<a href=\"http://vkontakte.ru/groups.php?id="+userid+"\">Группы</a>";
	links[2] = "<a href=\"http://vkontakte.ru/apps.php?mid="+userid+"\">Приложения</a>";
	links[3] = "<a href=\"http://vkontakte.ru/questions.php?mid="+userid+"\">Вопросы</a>";
	links[4] = "<a href=\"http://vkontakte.ru/video.php?act=tagview&id="+userid+"\">Видео с…</a>";
	links[5] = "<a href=\"http://vkontakte.ru/photos.php?act=user&id="+userid+"\">Фотографии с…</a>";
	links[6] = "<a href=\"http://vkontakte.ru/audio.php?id="+userid+"\">Аудио</a>";
	links[7] = "<a href=\"http://vkontakte.ru/video.php?id="+userid+"\">Видео</a>";
	links[8] = "<a href=\"http://vkontakte.ru/photos.php?id="+userid+"\">Фото</a>";
	return links;
}

// Сериализация одномерного массива (текст должны быть однострочным)
function serializeArr(arr) {
	var str = "";
	for(i=0;i<=arr.length-1;i++) {
		str += arr[i]+"\n";
	}
	return str;
}
// Десериализация одномерного массива
function unserializeArr(str) {
	var arr = str.split("\n");
	arr.pop();
	
	return arr;
}

// Сообщение - Настройки сохранены
function showMessageSettSaved() {
	var contentElements = document.getElementById("content");
	message = 'Настройки VkPlus сохранены.';
	contentElements.innerHTML = contentElements.innerHTML.replace(/(<div class=\"clearFix tBar\">[^]+)<div class=\"editorPanel clearFix\">/,"$1<div id=\"messageWrap\"><div id=\"message\">"+message+"</div></div><div class=\"editorPanel clearFix\">");

}
// получить xmlhttp. Пока только для FF
function getXMLhttp() {
	return new XMLHttpRequest();
}

/**
*
*  Распарсивание URI для получения аналога массива GET в PHP
*  с какого-то сайта, модифицированная по Windows-1251
*
**/
function parseGET(str){  

	var anchor = "";
	var GET = Array(); 
	
    var str = location.search.substring(1);
    if(str.indexOf('#')!=-1)    
    {    
        anchor = str.substr(str.indexOf('#')+1); 
        str = str.substr(0,str.indexOf('#'));
    }

    params = str.split('&');
    for (i=0; i<params.length; i++)
    {
        var keyval = params[i].split('=');
        if (keyval[1] != undefined)
        	GET[keyval[0]]=win2unicode(unescape(keyval[1].replace(/\+/g,' ')));
    }
	return (GET); 
};


/**
*
*  Перекодировка из Windows-1251 в Unicode
*  http://xpoint.ru/know-how/JavaScript/PoleznyieFunktsii?38#EscapeSovmestimyiySRusskimiBuk
*
**/
function win2unicode(str) {
   var charmap   = unescape(
      "%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
      "%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
      "%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
      "%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")
   var code2char = function(code) {
               if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)
               if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)
               return String.fromCharCode(code)
            }
   var res = ""
   for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))
   return res
}

/**
*
*  Получение значения cookies
*  http://www.codenet.ru/webmast/js/Cookies.php
*
**/
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}


/**
*
*  Javascript crc32
*  http://www.webtoolkit.info/
*
**/

function crc32 (str) {

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    str = Utf8Encode(str);

    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    if (typeof(crc) == "undefined") { crc = 0; }
    var x = 0;
    var y = 0;

    crc = crc ^ (-1);
    for( var i = 0, iTop = str.length; i < iTop; i++ ) {
        y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
        x = "0x" + table.substr( y * 9, 8 );
        crc = ( crc >>> 8 ) ^ x;
    }

    return crc ^ (-1);

};


// очистка строки от припадков 
function clearString(str) {
			str = str.replace(/<br>/g,'');		
			str = str.replace(/ $/g,'');
			str = str.replace(/([^0-9]),(?=[^ .])/g,'$1, ');
			str = str.replace(/[^a-zA-Z0-9а-яА-Я(),.!?%№\-+|\\\/ ]+/g,'');	
			str = str.replace(/\s+/g,' ');
			str = str.replace(/^\s+/g,'');
			return str;
}
// Порядковые формы слова
// (число,вещь,вещи,вещей)
function getNumericalStr(num,str1,str2,str3) {
	num = num.toString();	
	var num2 = (num.length>1) ? num[num.length-2] : 0;
	num = num[num.length-1];
	num = parseInt(num);
	num2 = parseInt(num2);
	
	
	switch (num) {
		case 1:
			if (num2 == 1)
				return str3;
			else
				return str1;
		case 2:
		case 3:
		case 4:
			if (num2 == 1)
				return str3;
			else
				return str2;
		default:
			return str3;
	}
}
// Преобразование в верхний регистр первых букв каждого слова в предложении кроме однобуквенных слов
function correctString(str) {
	var words = str.split(' ');
	for (j in words) {
		if (words[j].length > 1) { 
			words[j] = words[j].substr(0,1).toLocaleUpperCase()+words[j].substr(1).toLocaleLowerCase();
		} 
	}
	return words.join(' ');
}
// Алерт для массивов
function aalert(arr) {
	alert(formatArray(arr,0));
}
// Преобразовывает многомерный массив в строку
function formatArray(arr,level) {
	if (level == undefined) {
		level = 0;
	}
	var str="";
	for (key in arr) {
		if (typeof(arr[key]) == 'object' && arr[key] instanceof Array) {
			str += "\n"+strRepeat("\t",level)+"["+key+"]: "+formatArray(arr[key],level+1);
		} else {
			str += "\n"+strRepeat("\t",level)+"["+key+"]: “"+arr[key]+"”";
		}
	}
	if (level == 0) {
		str = str.substr(1);
	}
	return str;
}

function strRepeat(str,n) {
	if (n <= 0) {
		return ''
	} else {
		return str+strRepeat(str,n-1);
	}
}

// Воспроизвести звук
function playSound(file,volume) {
	if (volume == undefined) {
		volume=100;
	}
	document.getElementById('notify_sound').innerHTML = "<EMBED SRC='"+file+"' autostart='true' enablejavascript='true' hidden='true' volume="+volume+">";
}

// Читаем параметры из GET и сохраняем в памяти
function setParams(arr) {
	for (i in arr) {
		if (arr[i]['default'] === true || arr[i]['default'] === false) {
			
			if (GET['VkPlus'] != undefined) 
				GM_setValue(arr[i]['name'],GET[arr[i]['name']]?true:false);
			
		} else {

			// число
			var tmpValue = GET[arr[i]['name']];
			if (arr[i]['default'] == '' && GET[arr[i]['name']] == '') {
				tmpValue = '';
			} else if ( arr[i]['min'] != undefined || arr[i]['max'] != undefined ) {
				if (arr[i]['isFloat'])
					tmpValue = parseFloat(tmpValue);
				else
					tmpValue = parseInt(tmpValue);
				
				if (isNaN(tmpValue)) {
					tmpValue = arr[i]['default'];
				}
				if (arr[i]['min'] != undefined && tmpValue < arr[i]['min']) {
					tmpValue = arr[i]['min'];
				}
				if (arr[i]['max'] != undefined && tmpValue > arr[i]['max']) {
					tmpValue = arr[i]['max'];
				}	
			}
			if (arr[i]['isFloat'] && GET[arr[i]['name']] != undefined)
				tmpValue = tmpValue.toString();
			
			if (GET[arr[i]['name']] != undefined) 
				GM_setValue(arr[i]['name'],(tmpValue != undefined)?tmpValue:arr[i]['default']);
						
		}
	}
}

// Читаем параметры из памяти
function getParams(arr) {
	var tmpValue;
	for (i in arr) {
		tmpValue = GM_getValue(arr[i]['name'],arr[i]['default']);	
		if (arr[i]['isFloat'])
				tmpValue = parseFloat(tmpValue);
		param[arr[i]['name']] = tmpValue;
	}
}

// Добавляет параметр для использования
// Имя,по умолчанию, минимум, максимум, дробное, читать всегда
// Если установлен min или max, то значение укладывается в эти границы
function addParam(name,def,min,max,isFloat) {
	var a = Array();
	if (def == undefined) 
		def = true;
	if (isFloat == undefined)
		isFloat = false;
	
	a['name'] = name;
	a['default'] = def;
	a['min'] = min;
	a['max'] = max;
	a['isFloat'] = isFloat;
	
	
	args.push(a);
}

// ##########################################################################################################
// #################################
// #################################                     Base64 Files
// #################################
// ########################################################################################################## 

function getLoaderImageBase64() {
	return "data:image/gif;base64,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";
}
function getNorifySoundBase64() {
	return "data:audio/mpeg;base64,SUQzAwAAAAAHdlRDT04AAAAGAAAAT3RoZXJHRU9CAAAAGQAAAAAAU2ZNYXJrZXJzAAwAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"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"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/7ksD/gAAAASwAAAAAAAAlgAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA"+
		"IAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAABUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA==";
}
function getDownloadImageBase64() {
	return "data:image/png;base64,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";
}
function getGroupImageBase64() {
	return "data:image/gif;base64,R0lGODlhEQAOAMQAAJSUlHp6eq2trfb29rm5ufr6+u3t7ebm5rKystbW1vT09PDw8O7u7t3d3b+/v/Ly8qSkpISEhMjIyPz8/Pj4+IiIiJCQkP7+/o+Pj4mJifv7+4uLi46Ojo2NjZmZmf///yH5BAAAAAAALAAAAAARAA4AAAW24HVlW/ddXJd9X9dV15kNiqQaR8Jl"+
		"y9JwnwmG0ZBwNj5JBLBIOCKsSgISqGAkDoxF6thgWCqOBXPcVDIWTmrzqUgICEHkMtHQOwqNprDhEAgaDh16QRoWExcUEyUCjQgbFBqKExyRBRpeEAIDBBsaAxd6GKB7fRYQCARWFJEkFAsFACsZVB4WeAYDaTgGACwcHgEQHRwDCQMqBxIPXxMAEQEeKTkLXg0EBiYf"+
		"EcQVLilH3hZ9HyEAOw==";
}


// Добавление ссылки на ЖЖ
if (document.getElementById('vkontakte')) {
	var link = document.createElement('li');
	link.innerHTML = '<a href=\"http://vkontakte.ru/id3551861\">VkPlus</a>';
	document.getElementById("bFooter").getElementsByTagName('ul')[0].appendChild(link);
}


// ##########################################################################################################
// #################################
// #################################                     vkontakte_widescreen_mod by vkchk
// #################################								vkchk@ya.org
// #################################
// ########################################################################################################## 
// vkontakte_widescreen_mod 0.0.2
// written by vkchk
// feel free to send bugs and suggestions to vkchk@ya.org
function vkontakte_widescreen_mod(width_inc) {
	if (width_inc == undefined || width_inc == null)
		width_inc = 400;

	// --------------------------------------------------------------------------------

	function setWidth(elementId,orig_width) {
	   var element = document.getElementById(elementId);
	   if ( element != null)
	      element.style.width = ( orig_width + width_inc ) + "px";
	}

	function setWidthClass(classname,type,orig_width) {
	   var elems = getElementsByClassName(classname, type);
	   
	   for (var i in elems){
	      elems[i].style.width = ( orig_width + width_inc ) + "px";
	   }
	}

	// whole page width -----------------------------------------------------------
	setWidth("pageLayout",791);
	setWidth("pageBody",632);


	// fucking header fix (maunal redrawing) --------------------------------------------------------------------------------
	var header = document.getElementById("pageHeader");


	var header_border = document.createElement("div");
	header_border.setAttribute("style","position:relative; left:-2px; width:" +(791+width_inc+2)+ "px; height: 42px; background-color:#A6BBCF; -moz-border-radius:0 0 8px 8px; z-index:-1; border: 1px solid #345E8C; border-top: 0px;"); //
	header.appendChild(header_border);

	header.setAttribute("style","height:41px; -moz-border-radius:0 0 8px 8px; background-image:url(http://antibox.org/images/vk_header_line.gif); background-repeat: repeat-x;");

	setWidth("pageHeader",791);


	var header_logo = document.createElement("div");
	header_logo.setAttribute("style","position:absolute; width:131px; height:25px; top:8px; left:11px; background-image:url(http://antibox.org/images/vk_logo.gif); background-repeat: none;");
	header_logo.innerHTML = "";
	header.appendChild(header_logo);


	var header_addon = document.createElement("div");
	header_addon.setAttribute("style","position:absolute; width:"+(630+width_inc)+"px; height:2px; top:43px; left:144px; background-color:#D5DDE6; border:1px solid #EAEEF3; border-top:0px; border-bottom:0px;");
	header_addon.innerHTML = "";
	var header_addon_inner = document.createElement("div");
	header_addon_inner.setAttribute("style","position:absolute; width:"+(630+width_inc-4)+"px; height:2px; top:0px; left:1px; background-color:#FBF3C4; border:1px solid #E4DDB4; border-top:0px; border-bottom:0px;");
	header_addon_inner.innerHTML = "";
	header_addon.appendChild(header_addon_inner);
	header.appendChild(header_addon);

	// profile view ---------------------------------------------------------------
	if (location.href.search(/vkontakte\.ru\/profile\.php/i) != -1 ||
	    location.href.search(/vkontakte\.ru\/id/i) != -1) {
	   // rightColomn
	   setWidth("rightColumn",396);
	   //dataWarp - right column of the self-description
	   setWidthClass("dataWrap", "div", 260);
	   setWidth("op_field",360);
	   setWidth("reply_field",360);
	}

	// news view ------------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/news\.php/i) != -1) {
	   //feedStory
	   setWidthClass("feedStory", "td", 510);
	}

	// friends view ---------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/friend\.php/i) != -1) {
	   //friendsCont
	   setWidth("friendsCont", 606);
	}

	// photos view ----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/photos\.php/i) != -1) {
	   //feedStory
	   setWidthClass("results","div",606);
	   setWidthClass("aname", "div", 390);
	   setWidthClass("adesc", "div", 390);

	   setWidth("photocaptionleft",606);
	   setWidth("photoinfo",606);
	   setWidth("photocomment",400);
	   setWidth("commentArea",400);
	}

	// video view -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/video/i) != -1) {
	   setWidthClass("results", "div", 606);
	   setWidthClass("aname", "div", 390);
	   setWidthClass("adesc", "div", 390);
	   setWidth("videocaption",470);
	   setWidth("videoinfo",606);
	   setWidth("videocomment",400);
	   setWidth("reply_field",400);
	}

	// messages view --------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/mail\.php/i) != -1) {
	   setWidthClass("messageSnippet", "td", 300);
	   setWidth("dialog", 460);
	   setWidth("reply_field", 400);
	   document.getElementById("reply_field").style.height = "200px";
	   var elems = getElementsByClassName("formTable", "table");
	   for (var i in elems) {
	      elems[i].rows[1].cells[2].style.width = ( 285 + width_inc ) + "px";
	   }
	}                           

	// notes view -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/note/i) != -1) {
	   if (document.getElementById("notesBar") != null)
	      document.getElementById("notesBar").style.backgroundImage = "none";

	   var elems = getElementsByClassName("notesEdit", "div");
	   for (var i in elems) {
	      elems[i].style.backgroundImage = "none";
	   }
	   if (document.getElementById("sidePanel") != null){
	      document.getElementById("sidePanel").style.width = "140px";
	      document.getElementById("sidePanel").childNodes[1].style.paddingLeft = "0px";
	      setWidth("editFrame",448);
	   }
	   setWidth("mainPanel",451);
	   setWidthClass("note_body","div",350);
	   setWidth("comment",380);
	   setWidth("blogcomment",400);
	}

	// group list view ------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/groups\.php/i) != -1) {
	   setWidthClass("grouprow","div",594);
	   setWidthClass("info","td",468);
	}

	// group wiew -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/club/i) != -1) {
	   setWidthClass("left","div",395);
	   setWidthClass("dataWrap","div",260);
	}
	// group wiew -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/board/i) != -1 ||
	    location.href.search(/vkontakte\.ru\/topic/i) != -1 ) {
	   setWidthClass("postBody","div",420);

	}

	// apps wiew ------------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/apps/i) != -1) {
	   setWidthClass("appRowFixed","div",440);

	}

	// questions wiew -------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/questions/i) != -1) {
	   setWidthClass("text","div",410);
	   setWidth("reply_field",440);
	   setWidthClass("questionOut","div",584);
	   setWidthClass("questionOutTwo","div",582);

	   var elems = getElementsByClassName("questionInner", "div");
	   for (var i in elems) {
	      elems[i].parentNode.style.width = (width_inc + 520) + "px";
	   }
	}
}
