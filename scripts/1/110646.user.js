// ==UserScript==
// @name           ChatAlert
// @author         Dapi
// @version        1.2
// @description    Tells you about new messages in the chat of alliance.
// @include        http://*s*ikariam.*
// ==/UserScript==


	var divTag = document.createElement("style");
    divTag.setAttribute("type","text/css");
    divTag.innerHTML = "#chatMessages li:nth-child(odd){background: #fdf7dd;} #chatMessages li:nth-child(even){background: #ffeacf}";
    document.head.appendChild(divTag);
	
	var divTag = document.createElement("script");
    divTag.setAttribute("type","text/javascript");
	divTag.innerHTML  = "	var adres = '?action=ChatWindow&function=poll'; \n";
	divTag.innerHTML += "function getCookie(n){ \n";
	divTag.innerHTML += "	return(n=document.cookie.match('(^| )'+n+'(=([^;]*)|;)'))?unescape(n[3]):false \n";
	divTag.innerHTML += "} \n";
	divTag.innerHTML += "function checkChatAC(add){ \n";
	divTag.innerHTML += "var ObiektXMLHttp; \n";
	divTag.innerHTML += "if (window.XMLHttpRequest){  \n";
	divTag.innerHTML += "	ObiektXMLHttp = new XMLHttpRequest(); \n";
	divTag.innerHTML += "}else if (window.ActiveXObject){  \n";
	divTag.innerHTML += "	ObiektXMLHttp = new ActiveXObject(\"Microsoft.XMLHTTP\"); \n";
	divTag.innerHTML += "}\n";
    divTag.innerHTML += "ObiektXMLHttp.onreadystatechange = function() { \n";
	divTag.innerHTML += "	if(ObiektXMLHttp.readyState == 4) { \n";
	divTag.innerHTML += "		if(ObiektXMLHttp.status == 200) { \n";
	divTag.innerHTML += "			var last_id		= \"\"; \n";
	divTag.innerHTML += "			var output		= ObiektXMLHttp.responseText; \n";
	divTag.innerHTML += "			var output1		= output.replace('[[\"insert\",[','').split(']],[') \n";
	divTag.innerHTML += "			var last_mess	= output1[0].split('],[') \n";
	divTag.innerHTML += "			var last_id		= last_mess[last_mess.length-1].replace(/\"/g,'').split(',') \n";
	divTag.innerHTML += "			if(getCookie('wiadomosci_czatu') != last_id[0]){ \n";
	divTag.innerHTML += "				var czat_menu = document.getElementsByClassName('chat')[0].getElementsByTagName('a')[0].getElementsByClassName('textLabel')[0]; \n";
	divTag.innerHTML += "				czat_menu.style.color='#ffdc26'; \n";
	divTag.innerHTML += "				czat_menu.innerHTML = czat_menu.innerHTML.blink() \n";
	divTag.innerHTML += "				document.getElementsByClassName('chat')[0].getElementsByTagName('a')[0].setAttribute('onclick',\"checkChatAC('true');\")\n";
	divTag.innerHTML += "			} \n";
	divTag.innerHTML += "			if(add == 'true'){ \n";
	divTag.innerHTML += "				document.cookie='wiadomosci_czatu='+last_id[0]; \n";
	divTag.innerHTML += "				var czat_menu = document.getElementsByClassName('chat')[0].getElementsByTagName('a')[0].getElementsByClassName('textLabel')[0]; \n";
	divTag.innerHTML += "				czat_menu.style.color='#fff'; \n";
	divTag.innerHTML += "				czat_menu.innerHTML = czat_menu.innerHTML.replace(/blink/g,'span'); \n";
	divTag.innerHTML += " 			} \n";
	divTag.innerHTML += "		} \n";
	divTag.innerHTML += "	} \n";
	divTag.innerHTML += "}; \n";
	divTag.innerHTML += "ObiektXMLHttp.open(\"POST\",adres,true); \n";
	divTag.innerHTML += "ObiektXMLHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8'); \n";
	divTag.innerHTML += "ObiektXMLHttp.send(\"null\"); \n";	
	divTag.innerHTML += "if(document.getElementById('chatWindow').style.display == 'block'){ \n";
	divTag.innerHTML += "	var zamknij = document.getElementById('resizablepanel_chat_h').getElementsByClassName('div1')[0].getElementsByClassName('div2')[0].getElementsByTagName('p')[0].getElementsByTagName('span')[0].getElementsByTagName('a')[0]; \n";
	divTag.innerHTML += " 	zamknij.setAttribute('onclick',\"checkChatAC('true');\"); \n";
	divTag.innerHTML += "} \n";
	divTag.innerHTML += "} \n";
	divTag.innerHTML += "checkChatAC(); \n";
	divTag.innerHTML += "setInterval('checkChatAC()',5000)";
	
    document.head.appendChild(divTag);
	
	var scriptId = '110646';
	var version  = '1.2';
	if(GM_getValue(scriptId+'Update') < Math.round((new Date()).getTime() / 1000)-60*60*24*7){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+scriptId+'.user.js',
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var out = responseDetails.responseText;
				var a = out.split('//');
				var b = a[4].split(' ');
				var newv = parseInt(b[b.length-1].replace('\n','').replace('.',''));
				if(newv > parseInt(version.replace('.',''))){
					update();
				}
			}
		});
		GM_setValue(scriptId+'Update', Math.round((new Date()).getTime() / 1000))
	}
	function update(){
		divTag = document.createElement("div");
		divTag.setAttribute("id","updateChatAlert_bg");
		divTag.setAttribute("style","position: fixed; z-index: 1000; background: #000; top: 0; left: 0; width: 100%; height: 100%; filter: alpha(opacity=50); -moz-opacity: 0.5; opacity: 0.5;;");
		document.body.appendChild(divTag);
		if(location.href.indexOf('.pl')>=0){ lang ='pl' }else{ lang ='en' }
		var komunikat1 = new Array();
		var komunikat2 = new Array();
		var komunikat3 = new Array();
		komunikat1['pl'] = '<br>Pojawiła się nowa wersja skryptu <b>ChatAlert</b>!<br>Aktualizacja do najnowszej wersji jest wysoce zalecana!'
		komunikat1['en'] = '<br>Appeared a new version of script <b>ChatAlert</b>!<br>Upgrading to the latest version is highly recommended!'
		komunikat2['pl'] = 'Aktualizuj!'
		komunikat2['en'] = 'Update!'
		komunikat3['pl'] = 'Przypomnij później'
		komunikat3['en'] = 'Remind later'
		divTag = document.createElement("div");
		divTag.setAttribute("id","updateChatAlert");
		divTag.setAttribute("style","position: fixed; z-index: 1001; color: #000; background: #fff; border: 1px solid #000; top: 50%; left: 50%; width: 300px; height: 200px; margin-left: -150px; margin-top: -100px;");
		divTag.innerHTML  = komunikat1[lang];
		divTag.innerHTML += '<div style="background: #f2f2f2; border-top: 1px solid #cccccc; position: absolute; z-index: 1003; bottom: 0; width: 100%; height: 50px;"><input onclick="location.href=\'http://userscripts.org/scripts/source/'+scriptId+'.user.js\'" onmouseover="this.style.borderColor=\'#dbc1a7\';" onmouseout="this.style.borderColor=\'#999999\';" style="cursor: pointer; margin-top: 10px; padding: 3px; border: 1px solid #999999;" type="button" value="'+komunikat2[lang]+'"> <input onclick="document.getElementById(\'updateChatAlert\').style.display=\'none\'; document.getElementById(\'updateChatAlert_bg\').style.display=\'none\'" onmouseover="this.style.borderColor=\'#dbc1a7\';" onmouseout="this.style.borderColor=\'#999999\';" style="cursor: pointer; margin-top: 10px; padding: 3px; border: 1px solid #999999;" type="button" value="'+komunikat3[lang]+'"></div>';
		document.body.appendChild(divTag);
	}