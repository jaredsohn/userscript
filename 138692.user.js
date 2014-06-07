// ==UserScript==

// @name            reChatovod
// @namespace       rechatovod
// @description     Дополнительные функции для чатов Чатовод (http://chatovod.ru)
// @include         http://*chatovod.ru/widget*
// @copyright       2012, NikoB [Roman Smirnov]
// @license         GNU GPL
// @version         0.2.4
// @date            23.07.2012
// @author          NikoB (Roman Smirnov)
// @icon            http://smirnov.tk/rechatovod/icon_32.png
// @updateURL       https://userscripts.org/scripts/source/138692.meta.js
// @downloadURL     https://userscripts.org/scripts/source/138692.user.js

// @history         0.2.4:   Foundation for users extended information
// @history         0.2.3:   Added support for Greasemonkey updates
// @history         0.2.2:   Sound notification when an update is available
// @history         0.2.1:   When updates are forcelly checked and no updates available, notification appears
// @history         0.2:     Added configuration. Get rid of collisions with page scripts
// @history         0.1.4:   Foundation for configuration
// @history         0.1.3:   Rewritten initialization, modified anti-ads mechanism
// @history         0.1.2:   Greasemonkey compatibility (no warning about destroyed ads)
// @history         0.1.1:   Code cleanup
// @history         0.1:     Released

// ==/UserScript==

function re_Init(callback) {
    var script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

var re_main = function() {
	var re_scriptVersion = '0.2.4';
	var re_scriptBuild = '64';
	var re_scriptID = '138692';
	var re_checkInterval = 10;
	var re_checkForUpdates = true;

	// Server variables
	var re_serverPath = 'http://smirnov.tk/rechatovod/';
	var re_checkUpdatesPath = re_serverPath + 'checkUpdates.php';
	var re_submitUserPath = re_serverPath + 'submitUser.php';
	var re_scriptFileURLMirror = re_serverPath + 'rechatovod.user.js';
	var re_scriptFileURL = 'http://userscripts.org/scripts/source/' + re_scriptID + '.user.js';
	var re_scriptHomepageURL = 'http://userscripts.org/scripts/show/' + re_scriptID;
	
	var re_config = new Array();
	
	function re_submitUser() {
		if ((logged === false) || (logged === 'false')) return;
		$.ajax({
			type: "GET",
			url: re_submitUserPath,
			data: 'chat='+chatId+'&uid='+loggedId+'&username='+userNick+'&version='+re_scriptVersion+'&build='+re_scriptBuild+'&rand='+Math.random(),
			crossDomain: true,
			dataType: "jsonp",
			success: function (response) {
				// Do nothing
				// Soon: retrieve other users information and apply it on page
			}
		});
	}
	
	function re_checkUpdates(re_force) {
		if (((re_checkForUpdates === 'false') || (re_checkForUpdates === false )) && !(re_force === 'undefined')) return;
		$.ajax({
  			type: "GET",
  			url: re_checkUpdatesPath + '?' + Math.random(),
  			crossDomain: true,
  			dataType: "jsonp",
  			success: function(response) {
  				newVersion = response.version;
  				newBuild = response.build;
  				dataValid = true;
    			if (((re_scriptVersion !== newVersion) || (re_scriptBuild !== newBuild)) && dataValid) {
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
						messageDiv.style.display = 'none';
						messageDiv.style.fontFamily = 'Helvetica, sans-serif;';
						messageDiv.border = 0;
						messageDiv.style.zIndex = 100001;
						messageDiv.style.position = 'absolute';
						messageDiv.innerHTML = '<tr width="100%"><td align=center valign=center style="height: 35px; width: 32px; padding-right: 5px; border-right: 4px dotted #e77013;"><img height=22 width=22 src="http://smirnov.tk/rechatovod/icon.png" align="middle"></td><td valign=center style="padding-left: 10px; padding-top: 4px;"><font color="#a09a71">reChatovod:</font> доступна новая версия скрипта <b>'+newVersion+' (Build: '+newBuild+')</b></td><td align=right style="padding-top: 4px;" width="270px"><a id="goldVersionMessageUpd" style="padding: 5px; color: #a09a71;" href="'+re_scriptFileURL + '?' + Math.random() + '">обновить</a> <a style="padding: 5px; color: #a09a71;" href="'+re_scriptHomepageURL + '?' + Math.random() + '" target="_blank">подробнее</a> <a style="padding: 5px; color: #a09a71;" href="javascript:void(0);" id="goldVersionMessageHide">скрыть</a></td></tr>';
						document.body.appendChild(messageDiv);
						document.getElementById("goldVersionMessageHide").addEventListener("click", function(evt) {
							$('#goldVersionMessage').fadeOut(1000);
							re_checkForUpdates = false;
						}, true);
						document.getElementById("goldVersionMessageUpd").addEventListener("click", function(evt) {
							alert('reChatovod:\nПосле обновления перезагрузите страницу!');
						}, true);
					}
					$.sound.play();
					$('#goldVersionMessage').fadeIn(1000);
				} else if (re_force === true) {
					if (document.getElementById('goldVersionMessageNo')===null) {
    					messageDiv = document.createElement("table");
						messageDiv.id = "goldVersionMessageNo";
						messageDiv.style.border = "1px solid #e5db68";
						messageDiv.style.backgroundColor = "#faf3c0";
						messageDiv.style.fontSize = "18px";
						messageDiv.style.margin = "5px";
						messageDiv.style.left = 0;
						messageDiv.style.width = '99%';
						messageDiv.style.top = 0;
						messageDiv.style.display = 'none';
						messageDiv.style.fontFamily = 'Helvetica, sans-serif;';
						messageDiv.border = 0;
						messageDiv.style.zIndex = 100000;
						messageDiv.style.position = 'absolute';
						messageDiv.innerHTML = '<tr width="100%"><td align=center valign=center style="height: 35px; width: 32px; padding-right: 5px; border-right: 4px dotted #e77013;"><img height=22 width=22 src="http://smirnov.tk/rechatovod/icon.png" align="middle"></td><td valign=center style="padding-left: 10px; padding-top: 4px;"><font color="#a09a71">reChatovod:</font> у вас установлена самая новая версия скрипта!</td><td align=right style="padding-top: 4px;" width="270px"><a style="padding: 5px; color: #a09a71;" href="'+re_scriptHomepageURL + '?' + Math.random() + '" target="_blank">подробнее</a> <a style="padding: 5px; color: #a09a71;" href="javascript:void(0);" id="goldVersionMessageHideNo">закрыть</a></td></tr>';
						document.body.appendChild(messageDiv);
						document.getElementById("goldVersionMessageHideNo").addEventListener("click", function(evt) {
							$('#goldVersionMessageNo').fadeOut(1000);
						}, true);
					}
					$('#goldVersionMessageNo').fadeIn(1000);
				}
    		}
  		});
		setTimeout(re_checkUpdates, re_config['checkInterval']*60*1000);
	}

	function re_destroyAds() {
		if ((re_config['destroyAds'] === 'false') || (re_config['destroyAds'] === false)) return;
		showNextAds = function(prev) {
			// Do nothing.
		};
		chatAdsEnabled = false;
		clearTimeout(chatAdsTimer);
		$('.chatAds').hide();
		$('.chatFooter').css('bottom', '0px');
		$('.chatMain').css('bottom', '62px');
		chatScrollBottomActiveDivHeight = chatScrollBottomActiveDiv.outerHeight();
		chatTabsUl.find('.appTab:not(#reChatovod)').remove();
	}
	
	function re_removeEventSign() {
		if ((re_config['destroyEvent'] === 'false') || (re_config['destroyEvent'] === false)) return;
		$('.chatEventDiv2').hide();
		$('.chatBlankDiv').hide();
		$('.chatMessages').css('margin-top', '5px');
	}
	
	function re_loadScript() {
		re_loadConfigs();
		re_destroyAds();
		re_checkUpdates();
		re_removeEventSign();
		re_addConfigButton();
		re_submitUser();
	}
	
	function re_addConfigButton() {
		var m = $('<li class="appTab" id="reChatovod"><a href="#" style="background-image:url(\'http://smirnov.tk/rechatovod/icon_16.png\')"><span>Настройки reChatovod</span></a></li>');
		chatTabsUl.append(m);
		chatReloadTabsStatus();
		$(".appTab > a").die("click");
		$(".appTab > a").live("click", function() {
        var appid = $(this).parent().attr("id");
        if (appid == "chat_app_add") {
            chatAddApp("app"+Math.random(),"Тестовое \"пр'иложение","http://st1.chatovod.ru/i/apps/add.png");
        } else {
        	if (appid == 'reChatovod') {
        		re_configWindow();
        	} else {
            	chatOpenApp(appid.substring(3));
            }
        }
        return false;
        });
        function chatOpenApp(appid) {
        	if (appid == 'reChatovod') { return false; }
	        return chatOpenPopup("/app"+appid,"app"+appid,650,600);
	    };
	}
	
	function re_loadConfigs() {
		re_config['destroyAds'] = re_getValue('re_destroyAds', true);
		re_config['destroyEvent'] = re_getValue('re_destroyEvent', true);
		re_config['checkUpdates'] = re_getValue('re_checkUpdates', true);
		re_checkForUpdates = re_config['checkUpdates'];
		re_config['checkInterval'] = re_getValue('re_checkInterval', 10);
	}
	
	function re_saveConfigs() {
		re_setValue('re_destroyAds', re_config['destroyAds']);
		re_setValue('re_destroyEvent', re_config['destroyEvent']);
		re_setValue('re_checkUpdates', re_config['checkUpdates']);
		re_setValue('re_checkInterval', re_config['checkInterval']);
	}
	
	function re_configWindow() {
		var re_sel = new Array();
		
		if ((re_config['destroyAds'] === 'true') || (re_config['destroyAds'] === true)) { re_sel['destroyAds'] = ' checked'; } else { re_sel['destroyAds'] = ''; }
		if ((re_config['destroyEvent'] === 'true') || (re_config['destroyEvent'] === true)) { re_sel['destroyEvent'] = ' checked'; } else { re_sel['destroyEvent'] = ''; }
		if ((re_config['checkUpdates'] === 'true') || (re_config['checkUpdates'] === true)) { re_sel['checkUpdates'] = ' checked'; } else { re_sel['checkUpdates'] = ''; }
		
		re_windowCode = '<table width=570px style="margin-left: 10px; margin-right: 10px;" cellspacing=10>'
	+ '<tr><th colspan=2 style="font-size: 18px">Настройки reChatovod</th></tr>'
	+ '<tr><th colspan=2>Информация о скрипте</th></tr>'
	+ '<tr><td align=left>Версия reChatovod</td><td align=left>v' + re_scriptVersion + ' Build: ' + re_scriptBuild + ' (<a href="javascript:;" id="re_configCheckUpdate">проверить обновления</a>)</td></tr>'
	+ '<tr><th colspan=2>Общие настройки</th></tr>'
	+ '<tr><td align=left>Проверять обновления автоматически</td><td align=left>'
	+ '<input'+re_sel['checkUpdates']+' type="checkbox" id="re_config_checkUpdates"></td></tr>'
	+ '<tr><td align=left>Убирать рекламу</td><td align=left>'
	+ '<input'+re_sel['destroyAds']+' type="checkbox" id="re_config_destroyAds"></td></tr>'
	+ '<tr><td align=left>Убирать объявление</td><td align=left>'
	+ '<input'+re_sel['destroyEvent']+' type="checkbox" id="re_config_destroyEvent"></td></tr>'
	+ '<tr style="font-size: 16px;"><td align=left><a href="javascript:;" id="re_configSaveBut">Сохранить</a></td><td align=right><a href="javascript:;" id="re_configCloseBut">Закрыть</a></td></tr></table>';
	
	if (document.getElementById('re_configWindow') === null) {
		confDiv = document.createElement('div');
		confDiv.id = 're_configWindow';
		confDiv.className = 're_configWindowClass';
		left = (document.documentElement.clientWidth/2)-200;
		height = (document.documentElement.clientHeight/2)-100;
		confDiv.style.width = '600px';
		confDiv.style.height = 'auto';
		confDiv.style.position = 'fixed';
		confDiv.style.left = left+'px';
		confDiv.style.top = '50px';
		confDiv.style.border = '2px solid #61c4f2';
		confDiv.style.backgroundColor = '#4fb6ff';
		confDiv.style.zIndex = 100000;
		confDiv.style.display = 'none';
		confDiv.innerHTML = re_windowCode;
		document.getElementsByClassName('chat')[0].appendChild(confDiv);
	} else {
		document.getElementById('re_configWindow').innerHTML = re_windowCode;
	}
	
	document.getElementById('re_configCheckUpdate').addEventListener('click', function (evt) { re_checkUpdates(true); }, true);
	document.getElementById('re_configCloseBut').addEventListener('click', function (evt) { re_configClose(); }, true);
	document.getElementById('re_configSaveBut').addEventListener('click', function (evt) { re_configSave(); }, true);
	
	$('#re_configWindow').fadeIn(1000);
	
	}
	
	function re_configSave() {
		re_config['destroyAds'] = $('#re_config_destroyAds').is(':checked');
		re_config['destroyEvent'] = $('#re_config_destroyEvent').is(':checked');
		re_config['checkUpdates'] = $('#re_config_checkUpdates').is(':checked');
		re_configClose();
		re_saveConfigs();
		re_destroyAds();
		re_removeEventSign();
	}
	
	function re_configClose() {
		$('#re_configWindow').fadeOut(1000);
	}
	
	function re_getValue(key, defaultVal) {
		var retValue = localStorage.getItem(key);
		if ( retValue === undefined || retValue === null)
		{
			return defaultVal;
		}
		return retValue;
	}
	
	function re_setValue(key, value) {
		localStorage.setItem(key, value);
	}
	
	function re_remValue(value) {
		localStorage.removeItem(value);
	}
	
	re_loadScript();
}

var aWindow = (typeof unsafeWindow != 'undefined')? unsafeWindow: window;
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
var Opera = navigator.userAgent.indexOf('Opera')>-1;

if (!FireFox && !Opera) {
	var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    aWindow = div.onclick();
}

if (FireFox || Opera) { aWindow.addEventListener('load', function() { re_Init(re_main); }, false); } else { aWindow.onload = re_Init(re_main); }