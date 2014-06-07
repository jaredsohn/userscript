// ==UserScript==
// @name           Wioski jako lista rozwijana w plemionach
// @namespace      plemiona_lista
// @include        http://*plemiona.pl/*
// ==/UserScript==

function getParam(name) {
  if (name == 'GETURL') {
    var regexS = "(.*)/(.*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  } else {
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  }
  if( results == null )
    return "";
  else
    return results[1];
}

function warnBotProtection() {
    alert('Włączona ochrona przed botami. Wyłącz greasemonkey, kliknij kółko i włącz greasemonkey ponownie.');
}
	if (document.body.innerHTML.indexOf('captcha.php') < 0)
	{ 
		if(document.URL.indexOf('game.php?screen=overview_villages&intro&popup')>0)
		{
	   	var linki=document.getElementsByTagName("a");
	   	var baseURL = getParam('GETURL');
	   	var wioski = '';
	   	var sDropDown = '<tr><td colspan="8">Wybierz wioske: <select onchange="window.location.href=this.value">';
	   	var eDropDown = '</select></td></tr>'
	   	for (var i = 0; i < linki.length; i++) {
	   		if (linki[i].href.indexOf('game.php?village=') > 0)
	   		{
	   			if (linki[i].href.indexOf('&screen=overview&')> 0)
	   			{
	   				wioski += '<option value="'+linki[i].href+'">'+linki[i].innerHTML+'</option>';
	   			}
	   		}
	   	}
	   	if (wioski != '') {
	   		var lista = sDropDown+wioski+eDropDown;
	   		GM_setValue('listaWiosek', lista);
	   	}
	   	
		}
	var x = document.getElementById('quickbar');
	x.innerHTML=GM_getValue('listaWiosek')+x.innerHTML;
	}
	else
	{
    warnBotProtection()
	}