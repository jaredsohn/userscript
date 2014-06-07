// ==UserScript==
// @name        IkariamCLI
// @namespace   ikariamscript.webege.com
// @description Ikariam's Command-line interface
// @include     http://s*.*.ikariam.com/*
// @grant       unsafeWindow
// @version     0.0.3
// @downloadURL https://userscripts.org/scripts/source/152573.user.js
// @updateURL   https://userscripts.org/scripts/source/152573.meta.js
// @changelog   Alpha version
// ==/UserScript==
window.addEventListener('load', function(e) {
	var body = document.body;
	if(!window.localStorage.getItem('ownerName') && unsafeWindow.dataSetForView.backgroundView == 'city') {
		window.localStorage.setItem('ownerName', unsafeWindow.ikariam.backgroundView.screen.data.ownerName)
	}
	var username = window.localStorage.getItem('ownerName');
	
	var backgroundView = unsafeWindow.backgroundView;
	
	var model = unsafeWindow.ikariam.getModel();
	var relatedCityData = model.relatedCityData;
	console.log(model);
	
	if(unsafeWindow.dataSetForView.backgroundView == 'city') {
		bodyHtml = body.innerHTML; //first get data from page  and make it JSON
		var updateBackgroundData = bodyHtml.indexOf('updateBackgroundData"', 0); // get citydatastring
		var updateTemplateData = bodyHtml.indexOf('"updateTemplateData', updateBackgroundData); // find end
		var relatedCityDataHack = JSON.parse('{' + (bodyHtml.substring(updateBackgroundData + 23, updateTemplateData - 3)) + ''); // make substring of data
		console.log(relatedCityDataHack);
	
		if(!window.localStorage.getItem('islandId')) {
			window.localStorage.setItem('islandId', relatedCityDataHack.islandId)
		}
	}
	var islandId = window.localStorage.getItem('islandId');

	var msgError = 'Usa help; Comando non trovato';

	var oldCommand = [''];
	var oldCommandIndex = null;

	var init = function() {
		//window.localStorage.clear();

		setStyle();
		
		// set prompt
		var prompt = username
			+ ':' + ((backgroundView === 'city') ? '~' : (backgroundView === 'worldmap_iso') ? 'worldmap' : backgroundView)
			+ '&gt; '
		;
		
		var clispan = document.createElement('span');
		clispan.setAttribute('class', 'white');

		clispan.innerHTML = prompt;

		var cliform = document.createElement('form');
		cliform.onsubmit = onSubmit;

		var cliinput = document.createElement('input');
		cliinput.setAttribute('type', 'text');
		cliinput.setAttribute('id', 'clitext');
		cliinput.setAttribute('autocomplete', 'off');
		cliinput.setAttribute('accesskey', 'c');
		cliinput.onkeydown = function(e) {
			if(e.keyCode != 38 && e.keyCode != 40) return;
			
			oldCommandIndex = (oldCommandIndex != null) ? oldCommandIndex : oldCommand.length;
			
			if (e.keyCode == 38 && oldCommandIndex > 0) { //up arrow
				oldCommandIndex--;
			} else if(e.keyCode == 40 && oldCommandIndex < oldCommand.length) { //down arrow
				oldCommandIndex++;
			}
			if(oldCommandIndex != oldCommand.length) {
				var e = document.getElementById('clitext');
				e.value = oldCommand[oldCommandIndex];
			} else {
				var e = document.getElementById('clitext');
				e.value = '';
			}
		}

		var clidiv = document.createElement('div');
		clidiv.setAttribute('id', 'ikariamcli');

		appendChild(clidiv, clispan);
		appendChild(clidiv, cliform);
		appendChild(cliform, cliinput);
		appendChild(body, clidiv);

		cliinput.focus();
	};

	var onSubmit = function() {
		var e = document.getElementById('clitext');
		var cmd = e.value;
		e.value = '';
		cmd = trim(cmd);
		
		if(cmd == '') return false;
		
		if(cmd != oldCommand[oldCommand.length-1]) oldCommand.push(cmd);
		exeCommand(cmd);
		e.focus();
		return false;
	}

	var exeCommand = function(cmd) {
		oldCommandIndex = null;
		switch(cmd) {
			case 'help':
				writeMsg('Usa: whoami, ally, gohome, help', 5000);
				break;
			case 'whoami':
				writeMsg('Sei tu!', 5000);
				break;
/*
			case 'resource':
				var url = '?view=resource'
				+ '&type=resource'
				+ '&islandId=' + islandId
				;
				window.location.href(url);
				return false;
				break;
			case 'tradegood':
				var url = '?view=island'
				+ '&type=' + relatedCityData[relatedCityData.selectedCity]['tradegood']
				+ '&dialog=' + relatedCityData[relatedCityData.selectedCity]['tradegood']
				+ '&islandId=' + islandId
				+ 'backgroundView=island'
				;
				alert(url);
				window.location.href(url);
				break;
			case 'goto':
				break;
*/
			case 'gohome':
				var cityId = relatedCityData[relatedCityData.selectedCity]['id']
				var url = '?view=city'
				+ '&cityId=' + cityId
				//+ '&dialog=academy'
				//+ '&position=9'
				;
				console.log(url);
				console.log(relatedCityData);
				ajaxHandlerCall(url);
				return false;
				break;
			case 'ally':
				if(backgroundView == 'worldmap_iso') {
					writeMsg("Il comando non può essere eseguito qui", 2000, cmd);
					return false;
					break;
				}
				var cityId = relatedCityData[relatedCityData.selectedCity]['id']
				var url = '?view=sendIKMessage'
					+ '&allyId=' + unsafeWindow.dataSetForView.avatarAllyId
					+ '&msgType=51'
					+ '&cityId=' + relatedCityData[relatedCityData.selectedCity]['id']
					+ '&templateView=embassy'
					+ '&currentTab=tabEmbassy'
				;
				unsafeWindow.ajaxHandlerCall(url);
				break;
			default:
				writeMsg(msgError, 2000, cmd);
				break;
		}
	}

	var writeMsg = function(text, tempo, textRewrite) {
		var e = document.getElementById('clitext');
		e.value = text;
		e.disabled = true;
		setTimeout(function(param) {
			param = param || '';
			var e = document.getElementById('clitext');
			e.value = param;
			e.disabled = false;
		}, tempo, textRewrite);
	}

	var setStyle = function() {
		var clistyle = document.createElement('style');
		clistyle.innerHTML = ' \
		#ikariamcli { \
			padding: 3px 16px; \
			position: absolute; \
			top: 142px; \
			width: 366px; \
			height: 22px; \
			line-height: 20px; \
			z-index: 59; \
			background: url("/skin/layout/bg_breadcrumbs.png") no-repeat scroll left top transparent; \
			right: 0px; \
			color: #FFFFFF;\
		} \
		#ikariamcli form { \
			display: inline-block; \
			width: 70%; \
		} \
		#ikariamcli input { \
			border: 0; \
			color: #FFFFFF; \
			background-color: transparent; \
			width: 100%; \
		} \
		';
		appendChild(body, clistyle);
	}

	var appendChild = function(node, element) {
		node.appendChild(element);
	}

	var trim = function(str, charlist) {
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: mdsjack (http://www.mdsjack.bo.it)
		// +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
		// +      input by: Erkekjetter
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +      input by: DxGx
		// +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
		// +    tweaked by: Jack
		// +   bugfixed by: Onno Marsman
		var whitespace, l = 0, i = 0; str += '';
		if (!charlist) { // default list
			whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		} else { // preg_quote custom list
			charlist += ''; whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
		}
		l = str.length; for (i = 0; i < l; i++) { if (whitespace.indexOf(str.charAt(i)) === -1) { str = str.substring(i); break; } }
		l = str.length; for (i = l - 1; i >= 0; i--) { if (whitespace.indexOf(str.charAt(i)) === -1) { str = str.substring(0, i + 1); break; } }
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	}

	init();
}, false);