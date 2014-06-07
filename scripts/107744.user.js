// ==UserScript==
// @name VK_prison_friends
// @version 1.05_beta
// @author dinar_007
// @namespace Vkontakte_prison_check_friends_by_dinar_007
// @include http://vk.com/*
// @include http://vkontakte.ru/*
// ==/UserScript==

var currentFriendId = null;
var currentOutputId = null;

var currentOutputTalentDetailId = null;
var currentOutputTalentDetailLinkId = null;

var user = GM_getValue('mt_user');

var auth_key = GM_getValue('mt_auth_key');

var mt_Url={encode:function(string){return escape(this._utf8_encode(string));},decode:function(string){return this._utf8_decode(unescape(string));},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}}

window.mt_checkUserInfo=function(){
	var friends = document.getElementsByClassName ('user_block');
	if (!friends.length) {
		friends = document.getElementsByClassName ('people_row');	
		
	}
	if (!friends) return;	
	var html = '';
	var id = '';
	var cont = null;
	var a = null;
	var img = null;
	var sss = null;
	for (var i = 0; i < friends.length; i++) {
		if (friends[i].getAttribute('mt:sets') != '1') {
			friends[i].setAttribute ('mt:sets', '1');
			cont = friends[i].getElementsByClassName('online');
			if (!cont.length) {
				sss = friends[i].getElementsByClassName('info');
				if (sss && sss.length) {
					sss = sss[0];
					sss.innerHTML = sss.innerHTML + '<div class="online"></div>'
					cont = friends[i].getElementsByClassName('online');
				}
			}	
			if (!cont || !cont.length) return;			
			cont = cont[0];
			html = cont.innerHTML;			
			img = friends[i].getElementsByTagName('img');
			img = img[0];
			id = img.src;			
			id = id.match(/\/u([0-9]+)\//g);			
			if (id && id.length) {
				id = id[0];
				id = id.replace(/\//g, '');
				id = id.replace(/u/g, '');
			} else {			
				id = false;
			}
			
			if (!id) {
				id = friends[i].id;
				if (!id) {			
					var tmp = friends[i].getElementsByTagName('a');
					if (tmp && tmp.length) {
						tmp = tmp[0];
						id = tmp.href;
						id = id.match(/([0-9]+)/g);
						if (id && id.length) {
							id = id[0];
						} else {
							id = false;
						}
					}
				}		
				if (id) {
					id = id.replace(/\/id/g, '');
					id = id.replace(/user_block/g, '');
					id = id.replace(/suggestion([0-9]+)_/g, '');
				}
			}
			
			if (!id) {
				id = friends[i].innerHTML;
				id = id.match (/peopleAddToFriends\(([0-9]+)/g);
				if (id && id.length) {
					id = id[0].match(/([0-9]+)/g);
					if (id && id.length) {
						id = id[0];
					} else {
						id = false;
					}
				}
 
			}
			
			if (!id) return;
						
			 
			
			html += '<br><br><span id="PrisonInfoBtn_' + id + '" class="group2 fl_l" style="cursor: pointer; background-color: #000000; color: #ffffff; font-weight: bold;" mt:id="' + id + '">Досье из тюряги</span><br><br>';
			cont.innerHTML = html;
			cont.style.overflow = '';
			
			sss = document.createElement ('table');
			sss.innerHTML = '<table width="100%"><tr><td align="right"><span id="PrisonInfoLayoutClose_' + id + '" style="cursor: pointer; color: #2B587A; display: none;" mt:id="' + id + '" title="Скрыть информацию">Свернуть</span></td></tr><tr><td><div id="PrisonInfoLayout_' + id + '" style="display: none; width: 100%;" class="PrisonInfo"></div></td></tr></table>';
			friends[i].appendChild (sss);
			sss.setAttribute('width', '100%');
			document.getElementById('PrisonInfoLayoutClose_' + id).addEventListener ('click', function () {				
				document.getElementById('PrisonInfoLayout_' + this.getAttribute('mt:id')).style.display = 'none';
				this.style.display = 'none';
			}, false);
			a = document.getElementById('PrisonInfoBtn_' + id);
			a.addEventListener ('click', function (e) {
				currentFriendId = this.getAttribute ('mt:id');
				currentOutputId = 'PrisonInfoLayout_' + currentFriendId;
				currentOutputTalentDetailId = 'PrisonInfoDetail_' + currentFriendId;
				currentOutputTalentDetailLinkId = 'PrisonInfoDetailLink_' + currentFriendId;
				mt_getUserInfo();
			}, false);
		}
	}
}

window.setInterval(function(){
    mt_checkUserInfo();
},500);

if(user == '' || user == undefined || auth_key == '' || auth_key == undefined){
    mt_getOwnerUserInfo();
}
function mt_setContent(html){
    document.getElementById(currentOutputId).innerHTML = html;
    document.getElementById(currentOutputId).style.display = '';
    document.getElementById(currentOutputId.replace('_', 'Close_')).style.display = '';
}

function mt_setErrorContent(html){
    mt_setContent('<strong>Ошибка:</strong> ' + html);
}

function mt_log(html){
    document.getElementById(currentOutputId).innerHTML += '<div>' + html + '</div>';
    document.getElementById(currentOutputId).style.display = '';
    document.getElementById(currentOutputId.replace('_', 'Close_')).style.display = '';
}
function mt_hideLoader(){
    if (document.getElementsByClassName('am_prison_loader')) {
        var loaders = document.getElementsByClassName('am_prison_loader');
        if (loaders && loaders.length) {
	        for (var i in loaders) {
	        	if (loaders[i].style) {
	        		loaders[i].style.display = 'none';
	        	}
	        }
        }
    }
}

function mt_getOwnerUserInfo(){if(document.body.innerHTML.match(/\"id\":(\d+),/)){user=parseInt(document.body.innerHTML.match(/\"id\":(\d+),/)[1]);}else{return;}
GM_xmlhttpRequest({method:'GET',url:'/app1979194',onload:function(response){if(response.status==200){if(response.responseText.match(/\"auth_key\":\"(.+?)\"/)){auth_key=response.responseText.match(/\"auth_key\":\"(.+?)\"/)[1];GM_setValue('mt_user',user);GM_setValue('mt_auth_key',auth_key);/*mt_log('auth_key получен');*//*mt_getUserInfo();*/}else{mt_log('<b>Ошибка:</b> Не могу определить <strong>auth_key</strong>');mt_hideLoader();return;}}else{mt_log('<b>Ошибка при загрузке тюряги:</b> HTTP_STATUS='+response.status+' ['+response.statusText+']');mt_hideLoader();return;}},onerror:function(response){mt_log('Не могу загрузить тюрягу (HTTP_STATUS='+response.status+') ['+response.statusText+']');mt_hideLoader();return;}});
}

function mt_getUserInfo(){
	//mt_log('ID найден (' + currentFriendId + '). Получаем информацию о пользователе');
	mt_setContent('<img class="am_prison_loader" src="/images/progress7.gif" />');
	GM_xmlhttpRequest({
	    method: 'GET'
	   ,url: 'http://109.234.155.198/prison/universal.php?getFriendModels&method=getFriendModels&user=' + user + '&key=' + auth_key + '&friend_uid=' + currentFriendId
	   ,onload: function(response){
            mt_responseHandler(response);
	   }
	   ,onerror: function(response){
	       mt_responseHandler(response);
	   }
	});
}

function mt_responseHandler(response){
	if(response.status == 200){
		if(response.responseText == '<result>0</result>'){
			GM_setValue('mt_user', '');
			GM_setValue('mt_auth_key', '');
			mt_log('неверный auth_key');
			mt_getOwnerUserInfo();
			return;
		}
		if(response.responseText.match(/<error>/i)){
			var error_msg = 'Неизвестная ошибка';
			if (response.responseText.match(/<msg>(.+?)<\/msg>/i)){
				var error_msg = response.responseText.match(/<msg>(.+?)<\/msg>/i)[1];
			}
			if (error_msg == 'friend player not found') {
				mt_log ('<span style="color: gray; font-size: 0.9em;">У пользователя не установлена <strong>Тюряга</strong></span>');
			} else {
				mt_log('<b>Ошибка:</b> ' + error_msg);
			}
			mt_hideLoader();
			return;
		}
		mt_setUserInfo(response.responseText);
	}else{
		mt_hideLoader();
		mt_log('<b>Ошибка при загрузке информации:</b> HTTP_STATUS=' + response.status + ' [' + response.statusText + ']');
		return;
	}
}

function mt_setUserInfo(text){
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(text, "text/xml");
	var nsResolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
	var html = '';
	
	var playerTalents = xmlDoc.evaluate('//talent', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
	var talent = playerTalents.iterateNext();
	sumtalents = 0;
	var talent_id;
	var talent_detail = [];
	while (talent){
	    cnt = parseInt(talent.textContent);
	    talent_id = parseInt(talent.getAttribute('id'));
	    sumtalents += cnt;
	    talent_detail[talent_detail.length] = {id: talent_id, value: cnt};
        talent = playerTalents.iterateNext();
	}
	if (sumtalents == 358) {
	   html += mt_printRow('<b>В таланты вложено очков:</b>', '<b><span style="color: green;">' + sumtalents + '</span></b>');
	} else if (sumtalents <= 70) {
	   html += mt_printRow('<b>В таланты вложено очков:</b>', '<b><span style="color: red;">' + sumtalents + '</span></b>');
	} else {
	   html += mt_printRow('<b>В таланты вложено очков:</b>', '<b>' + sumtalents + '</b>');
	}
	
	var name = mt_Url.decode(xmlDoc.evaluate('//name', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext().textContent);
	html += mt_printRow('Кликуха:', name);
	var cell = xmlDoc.evaluate('//background', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext().textContent;
	var cellName = mt_getCellName(cell);
	html += mt_printRow('Сидит в камере:', cellName);
	var bread = xmlDoc.evaluate('//beard', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext().textContent;
	var breadName = mt_getBreadName(bread);
	html += mt_printRow('Не брился:', breadName);
	/*html += mt_printTitle('Победы');
	html += '<br />';*/
	var bossNames = [
	    'Кирпич'
	   ,'Сизый'
	   ,'Махно'
	   ,'Лютый'
	   ,'Шайба'
	   ,'Палыч'
	   ,'Циклоп'
	   ,'Бес'
	   ,'Паленй'
	   ,'Борзов'
	   ,'Хирург'
	];
	var boss_id;
	var bosses = xmlDoc.evaluate('//boss', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
	var boss = bosses.iterateNext();
	var bossshow = '';
	var winshow = '';
	var hirurg = 0;
	var kirpich = 0;
	var palych = 0;
	var slashcounter = 0;
	var aBoss = new Array();
	var b_id;
	while (boss){
		b_id = parseInt(boss.getAttribute('id'));
		if (b_id == 11) b_id = 5.5;
		aBoss[aBoss.length] = {
		     id: b_id
		    ,cnt: parseInt(boss.textContent)
		    ,real_id: parseInt(boss.getAttribute('id'))
		};
		boss = bosses.iterateNext();
	}
	aBoss.sort(mt_sIncrease);
	var isGroupB1 = false;
	var isGroupB2 = false;

	for (var i=0; i < aBoss.length; i++){
	   if (aBoss[i].real_id - 1 == 10) { hirurg = aBoss[i].cnt; } // хирург
	   if (aBoss[i].real_id - 1 == 0) { kirpich = aBoss[i].cnt; } // кирпич
	   if (aBoss[i].real_id - 1 == 5) { palych = aBoss[i].cnt; } // палыч
	   /*if (aBoss[i].real_id - 1 == 10 || aBoss[i].real_id - 1 == 0 || aBoss[i].real_id - 1 == 5) {
	       slashcounter++;
	       bossshow += bossNames[aBoss[i].real_id - 1];
	       winshow += aBoss[i].cnt;
	       if (slashcounter < 3) {
	         bossshow += '/';
	         winshow += '/';
	       }
	       html += mt_printRow(bossNames[aBoss[i].real_id - 1], aBoss[i].cnt);
	   }*/
	}
	if (kirpich > 500) { kirpich = '<span style="color: green">' + kirpich + '</span>' } else if (kirpich == 0) { kirpich = '<span style="color: red">' + kirpich + '</span>' }
	kirpich = '<strong>' + kirpich + '</strong>';
	if (palych > 100) { palych = '<span style="color: green">' + palych + '</span>' } else if (palych == 0) { palych = '<span style="color: red">' + palych + '</span>' }
	palych = '<strong>' + palych + '</strong>';
	if (hirurg > 0) { hirurg = '<span style="color: green">' + hirurg + '</span>' }
	hirurg = '<strong>' + hirurg + '</strong>';
	html += mt_printRow('Кирпич/Палыч/Хирург', kirpich + '/' + palych + '/' + hirurg);
	
	html += mt_printRow('<a target="_blank" href="/ww_official_public">Подпишись на наш клан</a>', '<div align="right"><span style="color: gray">Some change by Anabioz999</span></div>');
	mt_setContent(html);
	document.getElementById(currentOutputTalentDetailLinkId).addEventListener('click', mt_showHideTalentDetail, false);
}

function mt_showHideTalentDetail(){
    var obj = document.getElementById(currentOutputTalentDetailId);
    if (obj.style.display == 'none'){
        obj.style.display = 'block';
        document.getElementById (currentOutputTalentDetailLinkId).innerHTML = 'Скрыть подробности';
    } else {
        obj.style.display = 'none';
        document.getElementById(currentOutputTalentDetailLinkId).innerHTML = 'Показать подробности';
    }
}

function mt_sIncrease(i, ii){
    if (i.id > ii.id)
        return 1;
    else if (i.id < ii.id)
        return-1;
    else
        return 0;
}

function mt_printRow(title, value){
    value = value ? value : '&nbsp;';
    return '<div class="clear_fix"><div class="label fl_l" style="white-space: nowrap; width: 200px;">' + title + '</div><div class="labeled fl_l" style="margin-left: 100px;">' + value + '</div></div>';
}

function mt_printTitle(text, a){
    if (!a) a = '';
    return '<h4 style="height: 4px; padding-top: 10px;">' + a + '<b style="padding-right: 6px; font-size: 11px; background-color: white;">' + text + '</b></h4>';
}

function mt_getCellName(number){
    switch(number){
        case'0': return 'Обычная'; break;
        case'1': return 'Кирпича'; break;
        case'2': return 'Махно'; break;
        case'3': return 'Лютого'; break;
        case'4': return 'Шайбы'; break;
        case'5': return 'Палёного'; break;
        case'6': return 'Борзова'; break;
        case'7': return 'Хирурга'; break;
        default: return 'Новенькая (' + number + ')';break;
    }
}

function mt_getBreadName(number){
    switch(number){
        case '0': return '<span style="color: green"><strong>0</strong></span> дней'; break;
        case '1': return '<strong>1</strong> день'; break;
        case '2': return '<strong>2</strong> дня'; break;
        case '3': return '<strong>3</strong> дня'; break;
        case '4': return '<strong>4</strong> дня'; break;
        case '5': return '<span style="color: red;"><strong>5</strong></span> дней'; break;
        default: return number + ' дней'; break;
    }
}
