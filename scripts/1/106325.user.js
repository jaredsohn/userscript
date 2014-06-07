// ==UserScript==

// @name			Gold Chatovod
// @namespace		glodchatovod
// @description		Additional features to Chatovod chats.
// @include			http://*chatovod.ru/widget*
// @copyright		2011, Imperor [Roman Smirnov]
// @license			GNU GPL
// @version			0.5.11
// @author			Imperor (Roman Smirnov)
// @icon			http://ebsb.ru/gm/goldchatovod/icon.png

// @history		0.5.11: Small bug fixes.
// @history		0.5.10: Added login remembering feature.
// @history		0.5.9: Added script info in configs. Small bug fixes.
// @history		0.5.8: Added new config
// @history		0.5.7: Script now tells updates
// @history		0.5.6: Added Country display. Small bug fixes.
// @history		0.5.5: Full Google Chrome support
// @history		0.5.4: Added some configs
// @history		0.5.3: Small bug fixes
// @history		0.5.2: When ads are destroyed chat's height is full frame
// @history		0.5.1: Ads are not shown again and no messages like 'turn off script'
// @history		0.5: Detecting users who use Gold Chatovod and outputs their OS and browsers
// @history		0.4 a: Added basement for detecting users who use Gold Chatovod too
// @history		0.3: Added BBcodes. Added config like 'always send messages in bold'
// @history		0.2.3: Small improvements
// @history		0.2.2: Settings now show script version
// @history		0.2.1: Update feature update :)
// @history		0.2: Added version check feature, added custom smilies 80+
// @history		0.1.1: New content loads detection
// @history		0.1: Released

// ==/UserScript==

var adsBlock;
var adsHeight;
var scriptVersion = '0.5.11';
var scriptID = '106325';
var repeatCheck = true;
var checkInterval = 2;
var userCheckInterval = 15;
var injID;
var intID;
var serverPath = 'http://ebsb.ru/gm/goldchatovod/';
var adsText = 'Обновление 0.5.11:<br>- Небольшие баг-фиксы.';

var html = document.documentElement;
var aWindow = (typeof unsafeWindow != 'undefined')? unsafeWindow: window;
var Firefox = false;
var Opera = false;
FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
Opera = navigator.userAgent.indexOf('Opera')>-1;

if (!FireFox && !Opera) {
	var comDiv = document.createElement('div');
	comDiv.id = 'chromeCom';
	comDiv.width = '1px';
	comDiv.height = '1px';
	comDiv.style.display = 'hidden';
	comDiv.setAttribute('onclick', 'return window;');
	document.body.appendChild(comDiv);
	comDiv = document.getElementById('chromeCom');
	aWindow = comDiv.onclick();
}

// Google Chrome 
if(!GM_getValue) 
{
	function GM_getValue(key,defaultVal) 
	{
		var retValue = localStorage.getItem(key);
		if ( !retValue ) 
		{
			return defaultVal;
		}
		return retValue;
	}

	function GM_setValue(key,value) 
	{
		localStorage.setItem(key, value);
	}
		
	function GM_deleteValue(value) 
	{
		localStorage.removeItem(value);
	}
	/*
	function GM_xmlhttpRequest (params) {
  		var request = new XMLHttpRequest()
  
  		request.onreadystatechange = function() {
    	if (params.onreadystatechange) params.onreadystatechange(request)
    		if (request.readyState == 4) {
      			if (request.status >= 200 && request.status < 400) if (params.onload) params.onload(request)
      			else if (params.onerror) params.onerror(request)
    		}
  		}
  
  		request.open(params.method, params.url, true)
  		if (params.headers) for (name in params.headers)
    		request.setRequestHeader(name, params.headers[name])
  
  		request.send(params.data)
  		return request
	}
	*/
}

function replace(search, replace, subject){
	var ra = replace instanceof Array,
		sa = subject instanceof Array,
		l = (search = [].concat(search)).length,
		replace = [].concat(replace),
		i = (subject = [].concat(subject)).length;
	while(j = 0, i--)
		while(subject[i] = subject[i].split(search[j]).join(ra ? replace[j] || "" : replace[0]), ++j < l);
	return sa ? subject : subject[0];
}

var injectVersionServer;

function gold_CheckInjectVersion() {
	if (aWindow.injectVersion != undefined) {
		clearInterval(injID);
		var injectVersionClient = GM_getValue('injectVersion', 'none');
		injectVersionServer = aWindow.injectVersion;
		var injectVersionDesc = aWindow.injectVersionDesc;
		if (injectVersionClient != injectVersionServer) {
			GM_setValue('injectVersion', injectVersionServer);
			alert('Gold Chatovod\n\n'+injectVersionDesc);
		}
	}
}

function gold_Destroy() {
	adsBlock = document.getElementsByClassName('chatAds')[0];
	adsBlock.style.display = 'none';
	document.getElementsByClassName('chatFooter')[0].style.bottom = '0px';
	document.getElementsByClassName('chatMain')[0].style.bottom = '62px';
        var chatAdsEnabled = false;
}

function gold_Router() {
	if (document.getElementsByClassName('chatAds')[0]) {
		clearInterval(intID);
		if (!document.getElementsByClassName('chatSetupNickname hidden')[0]) {
			var rememberLogin = GM_getValue('rememberLogin', false);
			var lastLogin = GM_getValue('lastLogin', false);
			if (lastLogin !== false && rememberLogin) {
				loginDiv=document.getElementsByClassName('chatSetupNickname')[0];
				loginField = loginDiv.getElementsByTagName('input')[0];
				loginButton = loginDiv.getElementsByTagName('input')[1];
				loginField.value = lastLogin;
				loginButton.click();
			}
		}
		intID = setInterval(gold_Init, 50);
	}
}

function gold_Init() {
	if (document.getElementsByClassName('chatSetupNickname hidden')[0]) {
		clearInterval(intID);
		gold_Inject();
		gold_Destroy();
		injID = setInterval(gold_CheckInjectVersion, 100);
		gold_SetPageParams();
		gold_addTextConfig();
		gold_addConfigListener();
		lastLogin = aWindow.userNick;
		GM_setValue('lastLogin', lastLogin);
	}
}

function gold_loadConfigWindow() {
sel1=''; sel2=''; sel3=''; os1=''; br1=''; cn1=''; ct1=''; cp1='';
si = GM_getValue('ShowInfo', 'left');
if (si == 'left') sel2 = ' selected';
if (si == 'none') sel1 = ' selected';
if (si == 'right') sel3 = ' selected';
sos = GM_getValue('ShowInfo_OS', 1);
if (sos == 1) os1 = ' checked';
sbr = GM_getValue('ShowInfo_Browser', 1);
if (sbr == 1) br1 = ' checked';
sco = GM_getValue('ShowInfo_Country', 1);
if (sco == 1) cn1 = ' checked';
cht = GM_getValue('ChangeTitle', 1);
if (cht == 0) ct1 = ' checked';
crm = GM_getValue('rememberLogin', false);
if (crm) cp1 = ' checked';
newcode = '<table width=570px style="margin-left: 10px; margin-right: 10px;" cellspacing=10>'
	+ '<tr><th colspan=2 style="font-size: 18px">Настройки Gold Chatovod</th></tr>'
	+ '<tr><th colspan=2>Информация о скрипте</th></tr>'
	+ '<tr><td align=left>Версия Gold Chatovod</td><td align=left>v'+scriptVersion+' (<a href="javascript:;" id="gc_configCheckUpdate">проверить обновления</a>)</td></tr>'
	+ '<tr><td align=left>Версия инъекции</td><td align=left>v'+injectVersionServer+'</td></tr>'
	+ '<tr><th colspan=2>Список пользователей</th></tr>'
	+ '<tr><td align=left>Отображать доп. информацию о пользователе</td><td align=left><select id="gc_config_ShowInfo">'
	+ '<option'+sel1+' value="none">не отображать</option>'
	+ '<option'+sel2+' value="left">слева от имени</option>'
	+ '<option'+sel3+' value="right">справа от имени</option>'
	+ '</select></td></tr>'
	+ '<tr><td align=left valign=middle>Какую доп. информацию отображать</td><td align=left><div align=left>'
	+ '<input'+cn1+' type="checkbox" id="gc_config_ShowCountry"> Страну<br>'
	+ '<input'+os1+' type="checkbox" id="gc_config_ShowOS"> ОС<br>'
	+ '<input'+br1+' type="checkbox" id="gc_config_ShowBrowser"> Браузер'
	+ '</div></td></tr>'
	+ '<tr><th colspan=2>Общие настройки</th></tr>'
	+ '<tr><td align=left>Менять заголовок <b>только</b> при новых сообщениях</td><td align=left>'
	+ '<input'+ct1+' type="checkbox" id="gc_config_ChangeTitle"></td></tr>'
	+ '<tr><td align=left>Запоминать логин</td><td align=left>'
	+ '<input'+cp1+' type="checkbox" id="gc_config_RememberLogin"></td></tr>'
	+ '<tr style="font-size: 16px;"><td align=left><a href="javascript:;" id="gc_configSave">Сохранить</a></td><td align=right><a href="javascript:;" id="gc_configClose">Закрыть</a></td></tr></table>';
	
if (document.getElementById('gc_configWindow') === null) {
	confDiv = document.createElement('div');
	confDiv.id = 'gc_configWindow';
	confDiv.className = 'gc_configWindowClass';
	left = (html.clientWidth/2)-200;
	height = (html.clientHeight/2)-100;
	confDiv.style.width = '600px';
	confDiv.style.height = 'auto';
	confDiv.style.position = 'fixed';
	confDiv.style.left = left+'px';
	confDiv.style.top = '10px';
	confDiv.style.border = '2px solid black';
	confDiv.style.backgroundColor = '#bbb';
	confDiv.style.zIndex = 99999;
	confDiv.style.opacity = 0;
	confDiv.innerHTML = newcode;
	document.getElementsByClassName('chat')[0].appendChild(confDiv);
	
} else {
	document.getElementById('gc_configWindow').innerHTML = newcode;
}
document.getElementById('gc_configClose').addEventListener('click', function (evt) {
	Hide('gc_configWindow', 0);
}, true);
document.getElementById('gc_configCheckUpdate').addEventListener('click', function (evt) {
	repeatCheck = true;
	gold_CheckUpdates();
}, true);
}

function gold_addSaveConfigListener() {
	document.getElementById('gc_configSave').addEventListener('click', function (evt) {
		si = document.getElementById('gc_config_ShowInfo').value;
		sos = document.getElementById('gc_config_ShowOS').checked;
		sbr = document.getElementById('gc_config_ShowBrowser').checked;
		sco = document.getElementById('gc_config_ShowCountry').checked;
		cht = document.getElementById('gc_config_ChangeTitle').checked;
		crm = document.getElementById('gc_config_RememberLogin').checked;
		if (sos) sos=1; else sos=0;
		if (sbr) sbr=1; else sbr=0;
		if (sco) sco=1; else sco=0;
		if (cht) cht=0; else cht=1;
		GM_setValue('ShowInfo', si);
		GM_setValue('ShowInfo_OS', sos);
		GM_setValue('ShowInfo_Browser', sbr);
		GM_setValue('ShowInfo_Country', sco);
		GM_setValue('ChangeTitle', cht);
		GM_setValue('rememberLogin', crm);
		alert('Gold Chatovod:\n\nНастройки сохранены! Сейчас чат будет перезагружен!');
		history.go(0)
	}, true);
}

function gold_addConfigListener() {
	confButton = document.getElementById('app777');
	if (confButton === null) {
		setTimeout(gold_addConfigListener, 100);
	}
	confButton.addEventListener('click', function (evt) {
		gold_loadConfigWindow();
		gold_addSaveConfigListener();
		Show('gc_configWindow', 1);
		}, true);
		gold_updUserList();
}

function gold_SetPageParams() {
	lastv = GM_getValue('lastVersion', '0.5.6');
	if (lastv != scriptVersion) {
		GM_setValue('alertShown', 0);
		GM_setValue('lastVersion', scriptVersion);
	}
	aWindow.gc_scriptVersion = scriptVersion;
	aWindow.gc_msgBold = GM_getValue('msgBold', 0);
	aWindow.gc_msgItalics = GM_getValue('msgItalics', 0);
	aWindow.gc_msgUnder = GM_getValue('msgUnder', 0);
	aWindow.gc_changeTitle = GM_getValue('ChangeTitle', 1);
	aWindow.gc_adsText = adsText;
	aWindow.gc_alertShown = GM_getValue('alertShown', 0);
	GM_setValue('alertShown', 1);
}

function gold_addTextConfig() {
	thatDiv = document.getElementsByClassName('chatSendLinksPanel')[0];
	confBold = document.createElement('input');
	confBold.type = 'checkbox';
	confBold.id = 'gc_msgBold';
	if (GM_getValue('msgBold',0)==1) confBold.checked = true;
	textBold = document.createTextNode("Жирный");
	confItal = document.createElement('input');
	confItal.type = 'checkbox';
	confItal.id = 'gc_msgItalics';
	if (GM_getValue('msgItalics',0)==1) confItal.checked = true;
	textItal = document.createTextNode("Курсив");
	confUnde = document.createElement('input');
	confUnde.type = 'checkbox';
	confUnde.id = 'gc_msgUnder';
	if (GM_getValue('msgUnder',0)==1) confUnde.checked = true;
	textUnde = document.createTextNode("Подчеркнутый");
	confBold.addEventListener('change', gold_saveMsgBold, false);
	confItal.addEventListener('change', gold_saveMsgItal, false);
	confUnde.addEventListener('change', gold_saveMsgUnde, false);
	thatDiv.appendChild(confBold);
	thatDiv.appendChild(textBold);
	thatDiv.appendChild(confItal);
	thatDiv.appendChild(textItal);
	thatDiv.appendChild(confUnde);
	thatDiv.appendChild(textUnde);
}

function gold_saveMsgBold() {
	newValue = document.getElementById('gc_msgBold').checked;
	if (newValue) newValue = 1;
		else newValue = 0;
	GM_setValue('msgBold', newValue);
	gold_SetPageParams();
}

function gold_saveMsgItal() {
	newValue = document.getElementById('gc_msgItalics').checked;
	if (newValue) newValue = 1;
		else newValue = 0;
	GM_setValue('msgItalics', newValue);
	gold_SetPageParams();
}

function gold_saveMsgUnde() {
	newValue = document.getElementById('gc_msgUnder').checked;
	if (newValue) newValue = 1;
		else newValue = 0;
	GM_setValue('msgUnder', newValue);
	gold_SetPageParams();
}

function gold_Inject() {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.src = 'http://ebsb.ru/gm/goldchatovod/inject.js?'+Math.random();
	document.body.appendChild(script);
}
var gcCounter=0;
function gold_updUserList() {
	userName = aWindow.userNick;
	if (document.getElementsByClassName('chatUsersCount')[0].innerHTML === '?') {
		setTimeout(gold_updUserList, 500);
		return;
	}
	gcCounter = 0;
	document.getElementsByClassName('chatMessages')[0].style.width = '85%';
	document.getElementsByClassName('chatPeople')[0].style.width = '15%';
	document.getElementsByClassName('chatEventDiv2')[0].style.width = '83%';
	document.getElementsByClassName('chatBlankDiv')[0].style.width = '83%';
	comURL = 'http://ebsb.ru/gm/goldchatovod/com.php?act=hello&username='+userName+'&rand='+Math.random();
	GM_xmlhttpRequest({
		method: "GET",
		url: comURL,
		onload: function(response) {
			data = JSON.parse(response.responseText);
			userNum = data.username.length;
			curn = 0;
			while (curn<userNum) {
				gold_inspectUser(data.username[curn], data.browser[curn], data.os[curn], data.ip[curn], data.country_code[curn], data.country_name[curn], data.city[curn]);
				curn++;
			}
			gold_recountUsers();
			setTimeout(gold_updUserList, (userCheckInterval*1000)+3000);
		}
		});
}

function gold_recountUsers() {
	titl=document.getElementsByClassName('chatPeopleTitle')[0];
	if (document.getElementById('gcCounterNum') !== null) {
		document.getElementById('gcCounterNum').innerHTML = gcCounter;
	} else {
		newLine = document.createElement('br');
		gcCount = document.createElement('span');
		gcCount.id = 'gcCounter';
		gcCount.innerHTML = 'С GoldChatovod <span id="gcCounterNum">'+gcCounter+'</span> чел.';
		titl.appendChild(newLine);
		titl.appendChild(gcCount);
	}
}

function gold_inspectUser(username, browser, os, ip, cc, cn, city) {
	list = document.getElementsByClassName('chatPeopleList')[0];
	users = list.getElementsByClassName('chatUserWrapper');
	ul = users.length;
	cu = 0;
	uses=0;
	while(cu<ul) {
		curu = users[cu];
		indiv = curu.getElementsByClassName('chatUser')[0];
		inh = indiv.innerHTML;
		inh = replace('<br>', '', inh);
		indiv.innerHTML = inh;
		if (username == inh) {
			gcCounter++;
			if (curu.getElementsByClassName('chatUserBrowser')[0] !== undefined) {
				return false;
			}
			indiv.style.color = '#cfb53b';
			newinh = document.createElement('span');
			newinh.className = "chatUserBrowser";
			switch (os) {
				case 'windows':
				alto = 'Windows';
				break
				case 'linux':
				alto = 'Linux';
				break
				case 'mac':
				alto = 'Mac OS';
				break
				default:
				alto = 'Неизвестно';
				break
			}
			switch (browser) {
				case 'firefox':
				altb = 'Mozilla Firefox';
				break
				case 'opera':
				altb = 'Opera';
				break
				case 'chrome':
				altb = 'Google Chrome';
				break
				default:
				altb = 'Неизвестно';
				break
			}
			if (ip.length > 6) {
				alto = alto + ', ' + ip;
				altb = altb + ', ' + ip;
			}
				newhtml = '';
				if (GM_getValue('ShowInfo', 'left') == 'none') return true;
				if (GM_getValue('ShowInfo_Country', 1) == 1) newhtml = newhtml+' <img align="top" alt="'+cn+', '+city+'" title="'+cn+', '+city+'" src="'+serverPath+'flags/'+cc+'.png"> ';
				if (GM_getValue('ShowInfo_OS', 1) == 1) newhtml = newhtml+' <img alt="'+alto+'" title="'+alto+'" src="'+serverPath+'os_'+os+'.png"> ';
				if (GM_getValue('ShowInfo_Browser', 1) == 1) newhtml = newhtml+' <img alt="'+altb+'" title="'+altb+'" src="'+serverPath+'browser_'+browser+'.png"> ';
				if (newhtml.length>0) {
					newinh.innerHTML =  newhtml;
					if (GM_getValue('ShowInfo', 'left') == 'left') {
						curu.insertBefore(newinh, indiv);
					} else {
						curu.appendChild(newinh);
					}
				}
			return true;
		}
		cu++;
	}
	return false;
}
var hT, sT;
function Show(objId, x) {
	var obj = document.getElementById(objId);
	op = (obj.style.opacity)?parseFloat(obj.style.opacity):parseInt(obj.style.filter)/100;
	if(op < x) {
		if (obj.style.display == 'none') {
			if (obj.id =='goldVersionMessage') {
				obj.style.display = 'table';
			} else {
				obj.style.display = 'block';
			}
		}
		clearTimeout(hT);
		op += 0.1;
		obj.style.opacity = op;
		obj.style.filter='alpha(opacity='+op*100+')';
		sT=setTimeout(function () { Show(objId, x); },30);
	}
}
function Hide(objId, x) {
	var obj = document.getElementById(objId);
	op = (obj.style.opacity)?parseFloat(obj.style.opacity):parseInt(obj.style.filter)/100;
	if(op > x) {
		clearTimeout(sT);
		op -= 0.1;
		obj.style.opacity = op;
		obj.style.filter='alpha(opacity='+op*100+')';
		if (op<0.1) {
			obj.style.display = 'none';
		}
		hT=setTimeout(function () { Hide(objId, x); },30);
	}
}

function gold_CheckUpdates() {
	if (!repeatCheck) return;
	var urlCheck = 'http://ebsb.ru/gm/goldchatovod/version.php?'+Math.random();
	var scriptFileURL = 'http://userscripts.org/scripts/source/'+scriptID+'.user.js';
	var scriptHomepageURL = 'http://userscripts.org/scripts/show/'+scriptID;
	GM_xmlhttpRequest({
  		method: "GET",
  		url: urlCheck,
  		onload: function(response) {
  			receivedData = JSON.parse(response.responseText);
  			dataValid = false;
  			if (receivedData) {
  				newVersion = receivedData.version;
  				dataValid = true;
  			}
    		if ((scriptVersion !== newVersion) && dataValid) {
    			repeatCheck = false;
    			if (document.getElementById('goldVersionMessage')===null) {
    				messageDiv = document.createElement("table");
					messageDiv.id = "goldVersionMessage";
					messageDiv.style.border = "1px solid #e5db68";
					messageDiv.style.backgroundColor = "#faf3c0";
					messageDiv.style.fontSize = "18px";
					messageDiv.style.margin = "5px";
					messageDiv.style.left = 0;
					messageDiv.style.width = '99%';
					messageDiv.style.top = 0;
					messageDiv.style.opacity = 0.1;
					messageDiv.style.fontFamily = 'Helvetica, sans-serif;';
					messageDiv.border = 0;
					messageDiv.style.zIndex = 100000;
					messageDiv.style.position = 'absolute';
					messageDiv.innerHTML = '<tr width="100%"><td align=center valign=center style="height: 35px; width: 32px; padding-right: 5px; border-right: 4px dotted #e77013;"><img height=22 width=22 src="http://ebsb.ru/gm/goldchatovod/upd.png" align="middle"></td><td valign=center style="padding-left: 10px; padding-top: 4px;"><font color="#a09a71">Gold Chatovod:</font> доступна новая версия скрипта <b>'+newVersion+'</b></td><td align=right style="padding-top: 4px;" width="270px"><a id="goldVersionMessageUpd" style="padding: 5px; color: #a09a71;" href="'+scriptFileURL+'">обновить</a> <a style="padding: 5px; color: #a09a71;" href="'+scriptHomepageURL+'" target="_blank">подробнее</a> <a style="padding: 5px; color: #a09a71;" href="javascript:void(0);" id="goldVersionMessageHide">скрыть</a></td></tr>';
					document.body.appendChild(messageDiv);
					document.getElementById("goldVersionMessageHide").addEventListener("click", function(evt) {
						Hide('goldVersionMessage', 0);
					}, true);
					document.getElementById("goldVersionMessageUpd").addEventListener("click", function(evt) {
						alert('Gold Chatovod:\nПосле обновления перезагрузите страницу!');
					}, true);
				}
				Show('goldVersionMessage', 1);
    		}
  		}
	});
	if (repeatCheck) {
		setTimeout(gold_CheckUpdates, checkInterval*60*1000);
		setTimeout(gold_CheckInjectVersion, (checkInterval*60*1000)+5000);
	}
}

gold_CheckUpdates();
intID = setInterval(gold_Router, 100);