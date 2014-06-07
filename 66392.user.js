// ==UserScript==
// @name         DS_NeueIncsFiltern
// @author	pinjam
// @include        http://de*.die-staemme.de/game.php?*mode=incomings*
// ==/UserScript==


//******************************** GM für Opera emulieren ***************************
if(!GM_getValue) {
	function GM_getValue(name, defaultValue) {
		var reg = new RegExp(name + "=(.+?);");
		var value = document.cookie.match(reg);
		if(value == null) {
			value = defaultValue;
		} else {
			value = value[1];
		}
		
		return value;
	};
	
	function GM_setValue(name, value) {
		var date = new Date();
		date.setYear(date.getYear()+1905);
		var expires = date.toGMTString();
		
		document.cookie = name + "=" + value + ";expires=" + expires;
	};
	
	function GM_deleteValue(name) {
		document.cookie = name + "=;expires=Sun, 27 Jun 1999 13:09:38 GMT";
	};
}

//***************************************** Eigentliches Script ********************************************
(function incsfiltern() {
	var tabelle = document.getElementById('incomings_table');
	
	//******************** Autostart Test ******************
	var autostart = 0;
	var checkStart = document.createElement('input');
	checkStart.setAttribute('type', 'checkbox');
	checkStart.addEventListener('click', function(evt)
	{
		if (checkStart.checked==true) autostart = 1; else autostart = 0;
		GM_setValue('DSIncsFilter_start', autostart);
	}, false);
	if (GM_getValue('DSIncsFilter_start', autostart) == 1) checkStart.checked = true;
	
	
	//*********************** Trigger ************************
	var trigger = "Angriff";
	var textboxTrigger = document.createElement('input');
	textboxTrigger.setAttribute('type', 'text');
	textboxTrigger.setAttribute('size', '20');
	textboxTrigger.addEventListener('blur', function(evt)
	{
		if (textboxTrigger.value == '' || textboxTrigger.value == ' ') GM_setValue('DSIncsFilter_trigger', 'Angriff');
		else GM_setValue('DSIncsFilter_trigger', textboxTrigger.value);
	}, false);
	textboxTrigger.value = GM_getValue('DSIncsFilter_trigger', '');
	if (textboxTrigger.value == '') textboxTrigger.value = 'Angriff';
	trigger = textboxTrigger.value;
	if (textboxTrigger.value == 'Angriff') textboxTrigger.value = '';
	
	//*********************** Time ************************
	var time = 0;
	var textboxTime = document.createElement('input');
	textboxTime.setAttribute('type', 'text');
	textboxTime.setAttribute('size', '20');
	textboxTime.addEventListener('blur', function(evt)
	{
		if (textboxTime.value == '' || textboxTime.value == ' ') GM_deleteValue('DSIncsFilter_Time');
		else GM_setValue('DSIncsFilter_Time', textboxTime.value);
	}, false);
	textboxTime.value = GM_getValue('DSIncsFilter_Time', '');
	time = textboxTime.value;
	
	//******************** Ausblenden nach Start ****************************
	var check = document.createElement('input');
	check.setAttribute('type', 'checkbox');
	if (checkStart.checked) check.checked = true;
	var zeilen = tabelle.getElementsByTagName("tr").length-2;
	for(i=0; i<=zeilen-1; i++) 
	{
		if (check.checked==true)
		{
			if (document.getElementById("editInput["+i+"]").value != 'Angriff' && document.getElementById("editInput["+i+"]").value.indexOf(trigger) == -1)
			{
				var xx = tabelle.getElementsByTagName("tr")[i+1].getElementsByClassName("timer")[0].innerHTML;
				if(parseInt(xx.substr(xx.indexOf(":")+1,2))+parseInt(xx.substr(0,xx.indexOf(":")))*60 >= time) tabelle.getElementsByTagName("tr")[i+1].style.display = 'none';
			}
		}
		else
		{
			tabelle.getElementsByTagName("tr")[i].style.display = '';
		};
	};
	//************************* Ausblenden nach Klick **************************
	check.addEventListener('click', function(evt)
	{
		for(i=0; i<=zeilen-1; i++) 
		{
			if (check.checked==true)
			{
				if (document.getElementById("editInput["+i+"]").value != 'Angriff' && document.getElementById("editInput["+i+"]").value.indexOf(trigger) == -1)
				{
					var xx = tabelle.getElementsByTagName("tr")[i+1].getElementsByClassName("timer")[0].innerHTML;
					if(parseInt(xx.substr(xx.indexOf(":")+1,2))+parseInt(xx.substr(0,xx.indexOf(":")))*60 >= time) tabelle.getElementsByTagName("tr")[i+1].style.display = 'none';
				}
			}
			else
			{
				tabelle.getElementsByTagName("tr")[i+1].style.display = '';
			};
		}
	}, false);
	
	//********************** Anzeigen ***************************
	var div = document.createElement('div');
	div.setAttribute('style', 'padding: 3px; font-weight:bold');
	div.appendChild(check);
	div.appendChild(document.createTextNode(' umbenannte Incs ausblenden -- '));

	//************************ Einstellungen ************************
	
	var lnk = div.appendChild(document.createElement("a"));
	div.appendChild(document.createElement('br'));
	div.appendChild(document.createElement('br'));
    lnk.href = "javascript:void(0)";
    lnk.innerHTML = " Einstellungen";
    lnk.addEventListener("click", function(){ var frm = document.getElementById("einstellungen"); frm.style.display="block"; frm.style.left="50%"; frm.style.top="50%"; frm.style.marginLeft = "-250px"; frm.style.marginTop="-200px";}, false );

	var einst = document.body.appendChild(document.createElement("div"), tabelle);
    einst.style.position = "absolute";
    einst.zIndex = 1000;
    einst.style.display = "none";
    einst.style.padding = "0px";
    einst.id = "einstellungen";
    
	//******************** Popup-HTML-Code ***************************
    html = '<table class="main" style="width:100%; border:2px solid #804000;">';
    html += '<tr><th><table cellspacing="0" cellpadding="0" style="width:100%"><tr><th>Einstellungen</th><th style="text-align:right;"><a id="einst_close" href="javascript:void(0)">Schliessen</a></th></tr></table></th></tr>';
	html += '<tr style="white-space:nowrap" class="nowrap row_b"><th><table class="vis" style="border:0px solid #804000; width:100%; font-weight:normal">';
	html += '<tr><td align="center" id="automatic"></td><td>Angriffe automatisch ausblenden</td></tr>';
	html += '<tr><td align="center" id="trigger"></td><td>Keyword zum dauerhaften Einblenden</td></tr>';
	html += '<tr><td align="center" id="finaltime"></td><td>feste Anzeigezeit bis zur Ankunft (in min)</td></tr>';
	html += '</table></th></tr>';
    html += '<tr><th><table cellspacing="0" cellpadding="0" style="width:100%"><tr><th><font size="1">&copy;2010 by pinjam</font></th></tr></table></th></tr></table>';
	einst.innerHTML = html;

	document.getElementById("automatic").appendChild(checkStart);
	document.getElementById("trigger").appendChild(textboxTrigger);
	document.getElementById("finaltime").appendChild(textboxTime);
	
    lnk = document.getElementById("einst_close");
    lnk.addEventListener("click", function() { document.getElementById("einstellungen").style.display="none"; }, false );

	//**********************Abschließen **********************
	tabelle.parentNode.insertBefore(div,tabelle);

})();

//****************** Funktion aufrufen *************************
//incsfiltern();