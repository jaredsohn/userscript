// ==UserScript==
// @name           Riteriu scriptas
// @namespace      http://userscripts.org/scripts/show/46062
// @description    KhanWars 1.0 User Script
// @description    Created by booraz (e-mail greiciusv@gmail.com, skype: booraz)
// @description    Tested only with lithuanian language
// @version        1.31
// @include        http://riteriai1.draugas.lt/*
// @include        http://riteriai2.draugas.lt/*
// @include        http://riteriai3.draugas.lt/*
// @include        http://riteriai4.draugas.lt/*
// @include        http://riteriai5.draugas.lt/*
// ==/UserScript==

function functionMain(e) {
	var b = document.getElementById('firsttime');
	var langArr = new Array();

	if (b==null) {
		var RunTime = new Array(1);
		RunTime[0] = new Date().getTime();
		// Language setup
		langArr['OPTIONS'] = 'Options';
		langArr['SCEXE'] = 'Script executed succsefully. Server: ';
		langArr['SCMENIU'] = 'Script Meniu';
		langArr['ADDMENIU'] = 'Additional Meniu';
		langArr['SCOPTITLE'] = 'Khanwars script option';
		langArr['SCOPSAVE'] = 'Save';
		langArr['SCOPCANCEL'] = 'Cancel';
		langArr['SCOPEXTMSGMENU'] = ' Extra messages menu';
		langArr['SCOPMAP'] = ' Map table button';
		langArr['SCOPBARALL'] = ' Barracks information everywhere';
		langArr['SCOPBARUPG'] = ' Barracks info only in upgrades';
		langArr['SCOPATTACK'] = ' Under attack sound';
		langArr['SCOPOPTBOX'] = ' Marches option box';
		langArr['SCOPRELOAD'] = ' Auto reload: ';
		langArr['SCOPSPY'] = ' Spy report analyzer';
		langArr['SCOPMARLIN'] = ' Marches info lines';
		langArr['SCOPMARKET1'] = ' Market additional links';
		langArr['SCOPMARKET2'] = ' Market action: ';
		langArr['SCOPALLYLC'] = ' Ally last connect (only with VIP)';
		langArr['SCOPDBLCLK'] = ' Mouse double click goes up';
		langArr['SCOPMSGLINKS'] = ' Messages links add';
		langArr['SCOPBLDRES'] = ' Building needed resources';
		langArr['SCOPSHKEYS'] = ' Shortcut Keys';
		langArr['SPYREPWAR'] = 'Warriors';
		langArr['SPYREPRES'] = 'Resources';
		langArr['SPYREPPOP'] = 'Populiation';
		langArr['SPYREPLVL'] = 'Level';
		langArr['SPYREPINF'] = 'Information about';
		langArr['SPYREPMAX'] = 'Max army';
		langArr['SPYREPIN'] = 'In castle';
		langArr['SPYREPOUT'] = 'Outside castle';
		// spy report needs warriors in english
		langArr['MRKTFILT'] = 'Filter without VIP';
		langArr['GOLD'] = 'Gold';
		langArr['IRON'] = 'Iron';
		langArr['WOOD'] = 'Wood';
		langArr['FOOD'] = 'Food';
		langArr['FGOLD'] = 'Gold';
		langArr['FIRON'] = 'Iron';
		langArr['FWOOD'] = 'Wood';
		langArr['FFOOD'] = 'Food';
		langArr['SENDRES'] = 'Send resources';
		langArr['ZEROS'] = 'Zeros';
		langArr['EQUALLY'] = 'Equally';
		langArr['ALL'] = 'All';
		langArr['LIKEGOLD'] = 'Like gold';
		langArr['TRANSPORT'] = 'Transport';
		langArr['MARKET'] = 'Market';
		langArr['STABLE'] = 'Stable';
		langArr['BUILDINGS'] = 'Buildings';
		langArr['MARCHES'] = 'Marches';
		langArr['WRITENOTE'] = 'Write note';
		langArr['SENDEDMSG'] = 'Sended messages';

		var ot = document.createElement('div');
		ot.setAttribute('id','firsttime');
		document.getElementsByTagName('body')[0].appendChild(ot);
		
		var stuff_to_remove = [
				"//div[@id='advisor-activate']/a[1]",
				"//div[@id='submenu']/h3/div[@class='sub']/div[@class='title' and contains(text(),'Reklama')]",
				"//div[@id='submenu']/div[@class='banner']",
				"//ul[@class='kosmosas']",
				"//div[@class='title' and contains(text(),'\"Kosmoso karai\"')]",
				"//div[@class='title' and contains(text(),'Draugas.lt')]",
				"//div[@id='submenu']/h3[1]/following-sibling::ul[1]"
		];
			
		var news_text;

		if (document.baseURI.indexOf("pohod.php")>-1) {
			if (document.baseURI.indexOf("botcaptcha.php")==-1) {
				embedFunction(SetAvg);
				addAvgLinks();
				unhideElements();
				if (getCookie('marchesinfo')=='true') marchesInfo();
			}
			if (getCookie('option_box')=='true') optionEnlarger();
		}
		// Links near castles (Marches, Market)
		castles();
		// Change title of all pages
		titles();
		// botcaptcha.php
		if (document.baseURI.indexOf("botcaptcha.php")>-1) {
			var stuff_to_remove_add = [
				"//div[@class='errorsmall']",
			];
			removeDivItems(stuff_to_remove_add);
		}
		// Shortcut keys
		if (getCookie('shortcutKeys')=='true') shortcutKeysAdd();
		// Market coordinates
		if (document.baseURI.indexOf("market.php?action=2")>-1) {
			//if (getCookie('marketlinks')=='true') 
			marketLinks();
			setTimeout(setMarketCoords,100);
		}
		// Market Filter
		if (document.baseURI.indexOf("market.php?action=1")>-1) {
			embedFunction(marketFilter2);
			marketFilter();
		}
		// Send Coins to player
		if (document.baseURI.indexOf("begen-transfer.php?player")>-1) {
			addPlayerNameCoins();
		}
		// Market coordinates
		if (document.baseURI.indexOf("barracks.php")>-1) {
			setBarracksLinks();
		}
		// Buildings building time
		if (document.baseURI.indexOf("buildings.php")>-1) {
			getBuildingTime();
			//if (getCookie('buildingNeededRes')=='true') 
			getBuildingNeededRes();
		}
		// Get alliance last connection
		if (document.baseURI.indexOf("viewsauz.php")>-1) {
			//allyPlayers();
			if (getCookie('allylastconnect')=='true') getAllianceLastConnection();
		}
		// Preview page, extra button send resources
		if (document.baseURI.indexOf("preview.php")>-1) {
			previewSendResButton();
			previewSendGoldButton();
		}
		// Personal messages links add, if url received
		if (document.baseURI.indexOf("news.php")>-1 && document.baseURI.indexOf("type=1")>-1) {
			if (getCookie('messageLinksAdd')=='true') messagesLinksAdd();
		}
		// Inside market additional properties
		if (document.baseURI.indexOf("market.php?action=4")>-1) {
			insideMarketLinks();
		}
		// Messages write textarea expander
		if (document.baseURI.indexOf("writenote.php")>-1) {
			writeNote();
		}
		// Get all barracks info
		if (getCookie('all_barracks')=='true') infoTimers();
		else if ((document.baseURI.indexOf("upgrades.php")>-1)&&(getCookie('all_barracks_upg')=='true')) infoTimers();
		
		// Under attack sound and Extra messages menu not in map and overview pages
		if ((document.baseURI.indexOf("map.php")==-1)||(document.baseURI.indexOf("overview.php")==-1)) {
			removeDivItems(stuff_to_remove);
			if (getCookie('under_attack')=='true') underAttack();
			if (getCookie('messages_menu')=='true') extraMenu();
		}
		// Remains of battle sum
		if (document.baseURI.indexOf('vip_poleta.php')>-1) {
			remainsOfBattle();
		}
		// Adds extra styles
		GM_addStyle(".myfont { padding-left: 8px; color: #CCCCCC !important; font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 11px !important; }");
		GM_addStyle(".mysetmax { padding-top: 8px; padding-left: 10px; color: white; font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 12px !important; }");
		
		// Spy Report Analyser
		if ((document.baseURI.indexOf('news.php?type=5')>-1 || (document.baseURI.indexOf('news.php?ot=')>-1 && document.baseURI.indexOf('type=5')>-1)) && (getCookie('spyreport')=='true')) SpyReportAnalyser();
		
		// Map table
		if ((document.baseURI.indexOf('bigmap')==-1)&&(document.baseURI.indexOf('map.php')>-1)&&(getCookie('map_table')=='true')) {
			addLink( 'Langelio duomenys', 'javascript:get_map_props();', 'viewLegend');
			embedFunction(get_map_props);
		}
		// Auto reload
		if (getCookie('reloadtime')) setTimeout(function(){autoreload();},getCookie('reloadtime')*1000);
		// Change market action
		if (getCookie('marketaction')=='true') changeMarketAction(getCookie('marketindex'));

	} // END =======================================
	
	//=======================
	// FUNCTIONS BLOCK
	//=======================
	
	//=======================
	// Info timers
	//=======================
	
	function infoTimers() {
		getall_barracks();
		buildingTime();
		upgradeTime();
	}
	
	//=======================
	// Info timers
	//=======================
	
	function allyPlayers() {
		var n = document.getElementsByClassName('box');
		var ally_players = (1*n[1].childNodes[1].childNodes[3].childNodes.length-1)/2;
		var newHTML = "<div class=\"left\">Žaidėjai:</div><div class=\"right\">" + ally_players + " </div>";
		n[0].childNodes[3].innerHTML = n[0].childNodes[3].innerHTML + newHTML;
	}
	
	//=======================
	// HTML title changer
	//=======================
	
	function titles() {
		var n = document.getElementById('res-population');
		if (document.baseURI.indexOf("buildings.php")==-1) document.title = document.title.substr(39) + " - " + n.textContent;
	}
	
	//=======================
	// Market Filter
	//=======================
	
	function marketFilter() {
		var n = document.getElementsByClassName('box');
		var div = document.createElement('div');
		div.setAttribute('class','box');
		div.setAttribute('id','box_filter');
		var h2 = document.createElement('h2');
		h2.innerHTML = 'Filtras be VIP';
		div.innerHTML = '<table width=\"100%\" align=\"center\" border=\"0\"><tbody><tr><td>Siūlo:</td><td align=\"left\">' +
		'<input id=\"sg1\" class=\"form\" type=\"checkbox\" value=\"Aukso\"><label for=\"sg1\"> Aukso</label><br>' +
		'<input id=\"si1\" class=\"form\" type=\"checkbox\" value=\"Geležies\"><label for=\"si1\"> Geležies</label><br>' +
		'<input id=\"sw1\" class=\"form\" type=\"checkbox\" value=\"Medienos\"><label for=\"sw1\"> Medienos</label><br>' +
		'<input id=\"sf1\" class=\"form\" type=\"checkbox\" value=\"Maisto\"><label for=\"sf1\"> Maisto</label></td><td>Prašo:</td><td align=\"left\">' +
		'<input id=\"bg1\" class=\"form\" type=\"checkbox\" value=\"Aukso\"><label for=\"bg1\"> Aukso</label><br>' +
		'<input id=\"bi1\" class=\"form\" type=\"checkbox\" value=\"Geležies\"><label for=\"bi1\"> Geležies</label><br>' +
		'<input id=\"bw1\" class=\"form\" type=\"checkbox\" value=\"Medienos\"><label for=\"bw1\"> Medienos</label><br>' +
		'<input id=\"bf1\" class=\"form\" type=\"checkbox\" value=\"Maisto\"><label for=\"bf1\"> Maisto</label></td></tr></tbody></table>' +
		'<div class=\"clear2\"></div><div class=\"buttonrow\"><button align=\"center\" type=\"reset\" name=\"Filter\" value=\"filter\" onclick=\"marketFilter2();\"class=\"success\">Filtruoti skelbimus</button></div>';
		n[0].parentNode.appendChild(h2);
		n[0].parentNode.appendChild(div);
	}
	
	function marketFilter2() {
		var tbody = document.getElementsByTagName('tbody')[0];
		for (var i=1;i<tbody.childNodes.length;i=i+2) {
			if (document.getElementById('sg1').checked) { 
				if (tbody.childNodes[i].childNodes[1].innerHTML.indexOf('Aukso')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('si1').checked) { 
				if (tbody.childNodes[i].childNodes[1].innerHTML.indexOf('Geležies')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('sw1').checked) {
				if (tbody.childNodes[i].childNodes[1].innerHTML.indexOf('Medienos')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('sf1').checked) {
				if (tbody.childNodes[i].childNodes[1].innerHTML.indexOf('Maisto')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('bg1').checked) {
				if (tbody.childNodes[i].childNodes[3].innerHTML.indexOf('Aukso')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('bi1').checked) {
				if (tbody.childNodes[i].childNodes[3].innerHTML.indexOf('Geležies')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('bw1').checked) {
				if (tbody.childNodes[i].childNodes[3].innerHTML.indexOf('Medienos')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
			if (document.getElementById('bf1').checked) {
				if (tbody.childNodes[i].childNodes[3].innerHTML.indexOf('Maisto')==-1) tbody.childNodes[i].setAttribute('style','display: none !important;');
			}
		}
	}
	
	//=======================
	// Shortcut Keys
	//=======================
	
	function shortcutKeysAdd() {
		document.addEventListener("keydown", _gmscr_handle_key_press, false);
		
		function _gmscr_handle_key_press(evt) {
			var which_pressed = String.fromCharCode(evt.which).toLowerCase();
			
			var n = document.getElementsByTagName('a');
			var bd = new Array();
			var bb = 0;
			for (var i=0;i<n.length;i++) {
				if (n[i].href.indexOf('main.php')>-1) { 
					bd[bb] = n[i].href; 
					bb++; 
				}
			}
			if (evt.altKey==true) {
				switch(which_pressed){
					case "z": location.href = 'pohod.php'; break;
					case "x": location.href = 'buildings.php'; break;
					case "c": location.href = 'upgrades.php'; break;
					case "1": if (bd.length>0) location.href = bd[0]; break;
					case "2": if (bd.length>1) location.href = bd[1]; break;
					case "3": if (bd.length>2) location.href = bd[2]; break;
					case "4": if (bd.length>3) location.href = bd[3]; break;
					case "5": if (bd.length>4) location.href = bd[4]; break;
					case "6": if (bd.length>5) location.href = bd[5]; break;
					case "7": if (bd.length>6) location.href = bd[6]; break;
					case "8": if (bd.length>7) location.href = bd[7]; break;
					case "9": if (bd.length>8) location.href = bd[8]; break;
					case "0": if (bd.length>9) location.href = bd[9]; break;
				}
			}
		}
	}
	
	//=======================
	// Player and castle preview add extra button to send resources to player
	//=======================
	
	function previewSendResButton() {
		var n = document.getElementsByClassName('buttonrow');
		var input = document.createElement('input');
		var nkt = document.getElementsByClassName('textformbox');
		var x = nkt[1].childNodes[5].childNodes[0].textContent.split(':')[0];
		var y = nkt[1].childNodes[5].childNodes[0].textContent.split(':')[1];
		input.setAttribute('value','Siųsti resursus');
		input.setAttribute('onclick',"document.location='market.php?action=2&"+x+"&"+y+"'");
		input.setAttribute('type','button');
		n[1].appendChild(document.createTextNode(' '));
		n[1].appendChild(input);
	}
	
	//=======================
	// Add player name at coins
	//=======================
	
	function addPlayerNameCoins() {
		var n = document.getElementsByName('field')[0];
		n.value = location.href.split('=')[1];
	}
	
	//=======================
	// Player and castle preview add extra button to send resources to player
	//=======================
	
	function previewSendGoldButton() { 
		var n = document.getElementsByClassName('buttonrow');
		var input = document.createElement('input');
		var nkt = document.getElementsByClassName('textformbox');
		input.setAttribute('value','Siųsti auksinius');
		input.setAttribute('onclick',"document.location='begen-transfer.php?player="+nkt[0].childNodes[8].textContent+"'");
		input.setAttribute('type','button');
		n[0].appendChild(document.createTextNode(' '));
		n[0].appendChild(input);
	}
	
	//=======================
	// Get buildings needed resources
	//=======================
	
	function getBuildingNeededRes() {
		var n = document.getElementsByClassName('sub');
		var gold = document.getElementById('res-gold').textContent.split(':')[1];
		var iron = document.getElementById('res-iron').textContent.split(':')[1];
		var wood = document.getElementById('res-wood').textContent.split(':')[1];
		var food = document.getElementById('res-food').textContent.split(':')[1];
		for (var i=0; i<n.length; i++) {
			if (n[i].childNodes.length>14) {
					var b_gold = n[i].childNodes[1].childNodes[1].innerHTML;
					var b_iron = n[i].childNodes[3].childNodes[1].innerHTML;
					var b_wood = n[i].childNodes[5].childNodes[1].innerHTML;
					var b_food = n[i].childNodes[7].childNodes[1].innerHTML;
					t_gold = gold - b_gold;
					t_iron = iron - b_iron;
					t_wood = wood - b_wood;
					t_food = food - b_food;
					if (t_gold<0) n[i].childNodes[1].childNodes[1].innerHTML = n[i].childNodes[1].childNodes[1].innerHTML + '(' + t_gold + ')';
					if (t_iron<0) n[i].childNodes[3].childNodes[1].innerHTML = n[i].childNodes[3].childNodes[1].innerHTML + '(' + t_iron + ')';
					if (t_wood<0) n[i].childNodes[5].childNodes[1].innerHTML = n[i].childNodes[5].childNodes[1].innerHTML + '(' + t_wood + ')';
					if (t_food<0) n[i].childNodes[7].childNodes[1].innerHTML = n[i].childNodes[7].childNodes[1].innerHTML + '(' + t_food + ')';
			}
		}
	}
	
	//=======================
	// Remains of Battle
	//=======================
	
	function remainsOfBattle() {
		var n = document.getElementsByClassName('special');
		for (var i=0; i<n.length;i++) {
			var gold = n[i].nextSibling.nextSibling.childNodes[1].innerHTML;
			var iron = n[i].nextSibling.nextSibling.childNodes[3].innerHTML;
			var wood = n[i].nextSibling.nextSibling.childNodes[5].innerHTML;
			var food = n[i].nextSibling.nextSibling.childNodes[7].innerHTML;
			var dead = n[i].nextSibling.nextSibling.childNodes[9].innerHTML;
			var sum = gold*1 + iron*1 + wood*1 + food*1;
			var d_count = 0;
			var dead_tmp = dead;
			while (dead_tmp>199) {
				dead_tmp = dead_tmp / 2;
				d_count++;
			}
			var strong = document.createElement('strong');
			strong.appendChild(document.createTextNode(sum));
			n[i].nextSibling.nextSibling.appendChild(document.createTextNode(', '));
			n[i].nextSibling.nextSibling.appendChild(strong);
			n[i].nextSibling.nextSibling.appendChild(document.createTextNode(' Viso'));
			
			var strong = document.createElement('strong');
			strong.appendChild(document.createTextNode(d_count));
			n[i].nextSibling.nextSibling.appendChild(document.createTextNode(', '));
			n[i].nextSibling.nextSibling.appendChild(strong);
		}
	}
	
	//=======================
	// messages Links add <a> html tag
	//=======================
	
	function messagesLinksAdd() {
		var n = document.getElementsByClassName('box message');
		for (var i=0;i<n.length;i++) {
			var b = n[i].childNodes[1].textContent.indexOf('http://');
			if (b>-1) {
				var c = n[i].childNodes[1].textContent.indexOf(' ', b);
				if (c == -1) c = n[i].childNodes[1].textContent.length;
				var hrefas = n[i].childNodes[1].textContent.substring(b, c);
				var a = document.createElement('a');
				a.appendChild(document.createTextNode(hrefas));
				a.href = hrefas;
				a.target = '_blank';
				var br = document.createElement('br');
				n[i].childNodes[1].appendChild(br);
				n[i].childNodes[1].appendChild(a);
			}
		}
	}
	
	//=======================
	// Write Note expander
	//=======================
	
	function writeNote() {
		var n = document.getElementsByName('player_id')[0];
		n.type = 'text';
		GM_addStyle(".box .formbox .rightlarge { height: 200px !important;}");
		GM_addStyle(".box .formbox .large { height: 200px !important;}");
		var m = document.getElementsByName('msg')[0];
		m.cols = 40;
		m.rows = 12;
	}
	
	//=======================
	// Remove Div unneeded div items
	//=======================
	
	function removeDivItems(stuff_to_remove) {
		function $x(p, context) {
			if (!context) context = document;
			var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
			return arr;
		}
		stuff_to_remove.forEach(
			function(xpath) {
				$x(xpath).forEach(
					function(item) {
						item.parentNode.removeChild(item);
					}
				);
			}
		);
	}
	
	//=======================
	// set Barracks links / 3 or / 2 regarding to barracks level
	//=======================
	
	function setBarracksLinks() {
		var n = document.getElementsByClassName('suba');
		if (n.length>0) {
			for (var i=0;i<n.length;i++) {
				var ind = n[i].childNodes.length*1-1;
				var divas = 3;
				if (ind==3) divas = 2;
				maxd3 = Math.round((n[i].childNodes[ind].innerHTML.split(' ')[1]-1)/divas);
				n[i].childNodes[1].name
				var a = document.createElement('a');
				a.href = "javascript:setMaximum('"+n[i].childNodes[1].name+"',"+maxd3+");";
				a.innerHTML = "&nbsp;&nbsp;" + maxd3;
				n[i].appendChild(a);
			}
		}
	}
	
	//=======================
	// Get buildings building time
	//=======================
	
	function getBuildingTime() {
		var n = document.getElementById('bxx');
		if (n != null) { 
			addNearLinkTime('a','Pastatai',n.innerHTML);
			document.title = document.title.substr(39) + " " + n.innerHTML;
		}
		else {
			addNearLinkTime('a','Pastatai','--:--:--');
			document.title = document.title.substr(39) + " " + '--:--:--';
			if (getCookie('autoBuilding')=='true') {
				var n = document.getElementsByTagName('a');
				for (var i=0;i<n.length;i++) {
					if (n[i].href.indexOf('?tb_id')>-1) {
						if (n[i].href.indexOf('=6')>-1) location.href = n[i].href;
					}
				}
			}
		}
	}
	
	//=======================
	// Get alliance last connection
	//=======================
	
	function getAllianceLastConnection() {
		var n = document.getElementsByClassName('special');
		for (var i=0;i<n.length;i++) {
			urlas = n[i].childNodes[1].href;
			function addInfo(txt) {
				pr = txt.indexOf('Paskutinis prisijungimas:');
				var b;
				b = txt.substr(pr,55);
				return b;
			}
			GM_xmlhttpRequest({
				method:"GET",
				url:urlas,
				headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
				onload:	
					function(response) { 
						lastConnect = ' '+response.responseText.substr(response.responseText.indexOf('Paskutinis prisijungimas:')+55,20);
						player = response.responseText.substring(response.responseText.indexOf('player_to')+10,response.responseText.indexOf("';",response.responseText.indexOf('player_to')));
						for (var m=0;m<n.length;m++) {
							if (n[m].childNodes[1].textContent==player) {
								n[m].appendChild(document.createTextNode(lastConnect));	
							}
						}
					}
			});
		}
	}
	
	//=======================
	// Extra messages menu
	//=======================
	
	function extraMenu() {
		GM_xmlhttpRequest({
			method:'GET',
			url:'http://' + document.domain + '/news.php',
			headers:{ 'User-Agent':'Mozilla/5.0', 'Accept':'text/xml'},
			onload:function(response) {
				news_text = response.responseText;
				var i;
				var asm='Asmeninės', mus='Mušio', sni='Šnipų', tur='Turgaus', zyg='Žygių';
				var tmp = 0;
				var pr = news_text.indexOf('<b>',tmp)+3;
				var pb = news_text.indexOf('</b>',tmp);
				if (pr>-1 && pb>-1) asm = asm + ' ' + news_text.substring(pr,pb);
				tmp = pb + 5;
				pr = news_text.indexOf('<b>',tmp)+3;
				pb = news_text.indexOf('</b>',tmp);
				if (pr>-1 && pb>-1) mus = mus + ' ' + news_text.substring(pr,pb);
				tmp = pb + 5;
				pr = news_text.indexOf('<b>',tmp)+3;
				pb = news_text.indexOf('</b>',tmp);
				if (pr>-1 && pb>-1) sni = sni + ' ' + news_text.substring(pr,pb);
				tmp = pb + 5;
				pr = news_text.indexOf('<b>',tmp)+3;
				pb = news_text.indexOf('</b>',tmp);
				if (pr>-1 && pb>-1) tur = tur + ' ' + news_text.substring(pr,pb);
				tmp = pb + 5;
				pr = news_text.indexOf('<b>',tmp)+3;
				pb = news_text.indexOf('</b>',tmp);
				if (pr>-1 && pb>-1) zyg = zyg + ' ' + news_text.substring(pr,pb);
				var meniuItems = ['Žygiai', 'Rašyti žinutę', asm, mus, sni, tur, zyg, 'Išsiųstos žinutės'];
				var meniuLinks = ['http://' + document.domain + '/pohod.php', 'http://' + document.domain + '/writenote.php', 
				'http://' + document.domain + '/news.php?type=1', 'http://' + document.domain + '/news.php?type=2', 
				'http://' + document.domain + '/news.php?type=5', 'http://' + document.domain + '/news.php?type=3', 
				'http://' + document.domain + '/news.php?type=4', 'http://' + document.domain + '/news.php?allsent=yes'];
				
				addsMeniuTable('botcheck', 'Papildomas meniu', meniuItems, meniuLinks);
			}
		});
	}
	
	//=======================
	// Marches option enlarger
	//=======================
	
	function optionEnlarger() {
		var obj = document.getElementsByTagName("select");
		if (obj.length==1) obj[0].setAttribute("size",obj[0].getElementsByTagName("option").length);
	}
	
	//=======================
	// Buildings & Upgrades time
	//=======================
	
	function buildingTime() {
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://" + document.domain + "/buildings.php",
			headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {	getBuildingTime(response.responseText);	}
		});
		function getBuildingTime(text) {
			var mm = text.indexOf("timer=",m);
			if (mm>-1) {
				var m = text.indexOf("if",mm);
				addNearLinkTime('a','Pastatai',stringFromTime(text.substring(mm+6,m)));
			}
			else addNearLinkTime('a','Pastatai','--:--:--');
		}
	}
	function upgradeTime() {
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://" + document.domain + "/upgrades.php",
			headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {	getUpgradeTime(response.responseText); }
		});
		function getUpgradeTime(text) {
			var mm = text.indexOf("timer =");
			if (mm>-1) {
				var m = text.indexOf(";",mm);
				addNearLinkTime('a','Kalvė',stringFromTime(text.substring(mm+7,m)));
			}
			else addNearLinkTime('a','Kalvė','--:--:--');
		}
	}
	
	function addNearLinkTime(arg1,arg2,time) {
		var n = document.getElementsByTagName(arg1);
		for (var j=0;j<n.length;j++) if (n[j].text==arg2) n[j].textContent=arg2+' '+time;
	}
	
	//=======================
	// Change market action
	//=======================
	
	function changeMarketAction(arg1) {
		var bb = document.getElementsByTagName('a');
		m = -1;
		for (var i=0;i<bb.length;i++) if (bb[i].href.indexOf('market.php?action=1')>-1 && bb[i].innerHTML=='Turgus') m = i;
		if (m>-1) bb[m].href = 'market.php?action='+arg1;
	}
	
	//=======================
	// Inside market additional links
	//=======================
	
	function insideMarketLinks() {
		var sc = document.getElementsByClassName('paging')[0].parentNode.getElementsByTagName('script')[3];
		var factor = sc.innerHTML.substr(sc.innerHTML.indexOf('factor')+9,4);
		document.getElementsByClassName('textformbox')[0].childNodes[5].textContent = document.getElementsByClassName('textformbox')[0].childNodes[5].textContent + ' (Keitimo santykis: '+factor+')';
		addResLinks(0,false);
		addResLinks(10000,true);
		addResLinks(25000,true);
		addResLinks(100000,true);
		function addResLinks(arg1, arg2) {
			addLink(arg1, "javascript:selOneRes("+arg1+",'pg',"+arg2+");",'pg');
			addLink(arg1, "javascript:selOneRes("+arg1+",'pj',"+arg2+");",'pj');
			addLink(arg1, "javascript:selOneRes("+arg1+",'pd',"+arg2+");",'pd');
			addLink(arg1, "javascript:selOneRes("+arg1+",'ph',"+arg2+");",'ph');
		}
		baseMarket();
	}
	
	//=======================
	// Set Market Coordinates
	//=======================
	
	function marketLinks() {
		var gabenama = document.getElementsByClassName('textformbox')[0].childNodes[5].textContent;
		addLink('Nuliai', 'javascript:selAvgRes(0);','btn_send');
		addLink('Vienodai', 'javascript:selAvgRes('+(gabenama/4)+');','btn_send');
		addLink('Visi', 'javascript:selAllRes();','btn_send');
		addLink('Kaip aukso', 'javascript:selAvgRes(-1);','btn_send');
		updateResInfo(true);
		var gab = 0;
		addResLinks(gab);
		gab = gabenama/2;
		addResLinks(gab);
		gab = gabenama;
		addResLinks(gab);
		function addResLinks(arg1) {
			addLink(arg1, "javascript:selOneRes("+arg1+",'sendg');",'sendg');
			addLink(arg1, "javascript:selOneRes("+arg1+",'sendj');",'sendj');
			addLink(arg1, "javascript:selOneRes("+arg1+",'sendd');",'sendd');
			addLink(arg1, "javascript:selOneRes("+arg1+",'sendh');",'sendh',true);
		}
		
		embedFunction(selAllRes);
		embedFunction(selAvgRes);
		embedFunction(updateResInfo);
		
		function updateResInfo(arg1) {
			sum = document.getElementsByName('sendg')[0].value*1 + document.getElementsByName('sendj')[0].value*1 +	document.getElementsByName('sendd')[0].value*1 + document.getElementsByName('sendh')[0].value*1;
			fontpr = document.createElement('font');
			fontpr.setAttribute('id','fontas');
			if (sum>document.getElementsByClassName('textformbox')[0].childNodes[5].textContent.substr(0,document.getElementsByClassName('textformbox')[0].childNodes[5].textContent.indexOf(' '))) {
				fontpr.color = 'red';	
			}
			else {
				fontpr.color = 'green';
			}
			fontpr.appendChild(document.createTextNode(" (Gabensite: "+sum+")"));
			if (arg1) document.getElementsByClassName('textformbox')[0].childNodes[5].appendChild(fontpr);
			else { 
				document.getElementById('fontas').parentNode.removeChild(document.getElementById('fontas'));
				document.getElementsByClassName('textformbox')[0].childNodes[5].appendChild(fontpr);
			}
		}
		function selAllRes() {
			document.getElementsByName('sendg')[0].value = document.getElementById('res-gold').textContent.split(':')[1];
			document.getElementsByName('sendj')[0].value = document.getElementById('res-iron').textContent.split(':')[1];
			document.getElementsByName('sendd')[0].value = document.getElementById('res-wood').textContent.split(':')[1];
			document.getElementsByName('sendh')[0].value = document.getElementById('res-food').textContent.split(':')[1];
			updateResInfo();
		}
		function selAvgRes(arg1) {
			if (arg1==-1) arg1 = document.getElementById('sendg').value;
			document.getElementsByName('sendg')[0].value = arg1;
			document.getElementsByName('sendj')[0].value = arg1;
			document.getElementsByName('sendd')[0].value = arg1;
			document.getElementsByName('sendh')[0].value = arg1;
			updateResInfo();
		}
		baseMarket();
	}
	
	function baseMarket() {
		function selOneRes(res,idas,arsum) {
			if (arsum) document.getElementsByName(idas)[0].value = document.getElementsByName(idas)[0].value*1 + res*1;
			else document.getElementsByName(idas)[0].value = res;
			updateResInfo();
		}
		embedFunction(selOneRes);
	}
	
	//=======================
	// Set Market Coordinates
	//=======================
	
	function setMarketCoords() {
		var prop = location.href.split('&');
		if (prop.length === 3) {
			document.getElementById('sendx').value = prop[1];
			document.getElementById('sendy').value = prop[2];
		}
	}
	
	//=======================
	// Castles way
	//=======================
	
	function castles() {
		var img_src_marches = 'data:image/gif;base64,' +
		'R0lGODlhBwAIAPcAANnZ2enp6Yq9V9vb2+/v7+rq6vLy8ubm5ujo6NjY2PDw8Ovr6+zs7OHh4eLi4uDg' +
		'4Nra2t3d3fT09N/f3+7u7tfX1/Hx8d7e3uTk5JLFX+3t7efn59zc3Krdd+Pj4+Xl5cnIyMfFxfb29ouK' +
		'ijNmAJmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACwAAAAABwAIAAAIMwAJkCARYMMHDxpIdCBxAIODBQozkHDwoEBEASQmILhIAsQBhRhBcPhAQqLIAR4G' +
		'ngQQEAA7';
		var img_src_market = 'data:image/bmp;base64,' +
		'Qk32AgAAAAAAADYAAAAoAAAADgAAABAAAAABABgAAAAAAMACAAAAAAAAAAAAAAAAAAAAAAAAQID/QID/' +
		'QID/QID/QID/QID/QID/QID/QID/QID/QID/QID/QID/QID/AABAgP9AgP9AgP9AgP9AgP9AgP9AgP9A' +
		'gP9AgP9AgP9AgP9AgP9AgP9AgP8AAECA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA' +
		'/0CA/wAAQID/QID/QID/AECAAECAQID/QID/QID/QID/AECAAECAAECAQID/QID/AABAgP9AgP9AgP8A' +
		'QIAAQIBAgP9AgP9AgP8AQIAAQIBIQIBAgP9AgP9AgP8AAECA/0CA/0CA/wBAgABAgECA/0CA/wBAgABA' +
		'gABAgECA/0CA/0CA/0CA/wAAQID/QID/QID/AECAAECAQID/AECAAECAAECAQID/QID/QID/QID/QID/' +
		'AABAgP9AgP9AgP8AQIAAQIAAQIAAQIAAQIBAgP9AgP9AgP9AgP9AgP9AgP8AAECA/0CA/0CA/wBAgABA' +
		'gABAgABAgABAgABAgECA/0CA/0CA/0CA/0CA/wAAQID/QID/QID/AECAAECAQID/QID/QID/AECAAECA' +
		'QID/QID/QID/QID/AABAgP9AgP9AgP8AQIAAQIBAgP9AgP9AgP8AQIAAQIBAgP9AgP9AgP9AgP8AAECA' +
		'/0CA/0CA/wBAgABAgECA/0CA/0CA/wBAgABAgECA/0CA/0CA/0CA/wAAQID/QID/QID/AECAAECAAECA' +
		'AECAAECAAECAAECAQID/QID/QID/QID/AABAgP9AgP9AgP8AQIAAQIAAQIAAQIAAQIBIQIBAgP9AgP9A' +
		'gP9AgP9AgP8AAECA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/0CA/wAAQID/QID/' +
		'QID/QID/QID/QID/QID/QID/QID/QID/QID/QID/QID/QID/AAA=';


		var n = id('castles');
		var a = n.getElementsByTagName('a');
		for (var i=0;i<a.length;i=i+3) {
			var pr = a[i].textContent.indexOf('(');
			var vd = a[i].textContent.indexOf(':');
			var pb = a[i].textContent.indexOf(')');
			var x = a[i].textContent.substring(pr+1,vd);
			var y = a[i].textContent.substring(vd+1,pb);
			var newa = document.createElement('a');
			var img_node1 = document.createElement('img');
			img_node1.src = img_src_marches;
			newa.href = 'pohod.php?attackx='+x+'&attacky='+y;
			img_node1.alt = 'Siųsti į žygį';
			img_node1.setAttribute('style','margin-left: 4px;');
			newa.appendChild(img_node1);
			a[i].parentNode.appendChild(newa);
			var newb = document.createElement('a');
			var img_node2 = document.createElement('img');
			img_node2.src = img_src_market;
			newb.href = 'market.php?action=2&'+x+'&'+y;
			img_node2.alt = 'Siųsti resursus';
			img_node2.setAttribute('style','border: 0px; margin-left: 3px;');
			img_node2.width = 10;
			newb.appendChild(img_node2);
			a[i].parentNode.appendChild(newb);
		}
	}
	
	//=======================
	// Info marches
	//=======================
	
	function marchesInfo() {
		var n = document.getElementsByTagName('a');
		if (n.length>0) {
			for (var i=0;i<n.length;i++) {
				if (n[i].href.indexOf('javascript:alert')>-1) {
					var m = n[i].href.split('%20');
					var brr = document.createTextNode(m[1]+', '+m[3]+', '+m[5]+', '+m[8]+', '+m[11]);
					n[i].parentNode.appendChild(brr);
					n[i].parentNode.removeChild(n[i]);
				}
			}
		}
	}
	
	//=======================
	// Auto reload
	//=======================
	
	function autoreload()
	{
		if (getCookie('autoreload')=='true') location.reload();
	}
	//=======================
	// Unhide hidden coordinates elements
	//=======================
	
	function unhideElements() {
		var stilius = 'align: center; background:#644527 none repeat scroll 0 0; border:1px solid #815F3F; color:#FFFFFF; font-size:12px; padding:2px;';
		n = document.getElementsByTagName('input');
		if (n.length>0) {
			var m=0;
			if (n[0].parentNode.name=='form1') {
				m = 2; 
				for (var i=0; i<m; i++) {
					n[i].setAttribute('type','text');
					n[i].setAttribute('size','3');
					n[i].setAttribute('style',stilius);
				}
			}
			else if (n[0].parentNode.name=='formClock') m = 3;
			if (m==2) {
				n = document.getElementsByTagName('input');
				n[0].parentNode.appendChild(document.createTextNode('Tikslo koordinatės: '))
				n[0].parentNode.appendChild(n[0])
				n = document.getElementsByTagName('input');
				n[0].parentNode.appendChild(n[0])
			}
			if (m==3) {
				n = document.getElementsByTagName('input');
				f = document.getElementsByClassName('formbox')[0];

				divr = document.createElement('div');
				divl = document.createElement('div');
				divr.setAttribute('class','right');
				divr.setAttribute('id','time1');
				divl.setAttribute('class','left');
				h = n[0].value;
				m = n[1].value;
				s = n[2].value;
				cntt = h*3600 + m*60 + s*1;
				divr.setAttribute('title',cntt);
				divr.appendChild(document.createTextNode('-'));
				divl.appendChild(document.createTextNode('Serverio laikas:'));
				f.appendChild(divl);
				f.appendChild(divr);
				var v=new Date();
				GM_log(stringFromTime(cntt)+" ---------- "+v.getTime());
				divr = document.createElement('div');
				divl = document.createElement('div');
				divr.setAttribute('class','right');
				divr.setAttribute('id','time2');
				divl.setAttribute('class','left'); 
				poht = cntt;
				if (document.getElementById("z").innerHTML.indexOf('-')==-1) {
					hpt = document.getElementById("z").innerHTML.split(':')[0];
					mpt = document.getElementById("z").innerHTML.split(':')[1];
					spt = document.getElementById("z").innerHTML.split(':')[2];
					poht = poht + hpt*3600 +mpt*60 + spt*1;
				}
				divr.setAttribute('title',poht);
				divr.appendChild(document.createTextNode('-'));
				divl.appendChild(document.createTextNode('Atvykimo laikas:'));
				f.appendChild(divl);
				f.appendChild(divr);
				
				
				GM_addStyle('.box .formbox { height: 409px !important;}');
				timers();
				embedFunction(timers);
				embedFunction(stringFromTime);
			}
		}
	}

	function stringFromTime(arg1) {
		var v=new Date();
		var n=new Date();
		var o=new Date();
		var s=arg1-Math.round((n.getTime()-v.getTime())/1000);
		var m=0;
		var h=0;
		if(s>59){ m=Math.floor(s/60); s=s-m*60; }
		if(m>59){ h=Math.floor(m/60); m=m-h*60; }
		if(s<10){ s='0'+s; }
		if(m<10){ m='0'+m; }
		return h%24+':'+m+':'+s;
	}
	
	function timers()
	{
		var zzz=document.getElementById("z");
		var srv1=document.getElementById('time1');
		var srv2=document.getElementById('time2');
		var ss=srv1.title;
		if (zzz.innerHTML.indexOf(':')>-1) {
			hpt = zzz.innerHTML.split(':')[0];
			mpt = zzz.innerHTML.split(':')[1];
			spt = zzz.innerHTML.split(':')[2];
			poht = ss*1 + hpt*3600 + mpt*60 + spt*1;
			srv2.innerHTML = stringFromTime(poht);
		}
		srv1.innerHTML=stringFromTime(ss);
		srv1.title=srv1.title*1+1;
		window.setTimeout("timers();",999);
	}
	
	//=======================
	// Spy report analyser
	//=======================
	
	function SpyReportAnalyser() {
		n = document.getElementsByTagName('p');
		lng_army = 'Kariai';
		lng_buildings = 'Pastatai';
		lng_resources = 'Resursai';
		lng_pop = 'Populiacija';
		
		for (var j=0;j<n.length;j++) {
			buildpop = 0; 
			armypop = 0;
			resources = 0;
			army = false; spyreport = false;
			buildings = false;
			res = false;

			if (n[j].textContent.indexOf('Informacija apie')>-1) {
				var b = '';
				for (var i=0;i<n[j].childNodes.length;i++) { 
					if (n[j].childNodes[i].textContent!='') b = b + n[j].childNodes[i].textContent + "|"; 
				}
				var ns = b.split('|');
				for (var z=0;z<ns.length;z++) {
					if (ns[z].indexOf(lng_pop)>-1) {
						popvalue = ns[z+1].substr(0,ns[z+1].indexOf('/'));
						maxvalue = ns[z+1].substr(1+ns[z+1].indexOf('/'));
						popdiff = maxvalue - popvalue;
					}
					if (ns[z].indexOf('sti ')>-1 || ns[z].indexOf('astiprin')>-1) { army = false; res = false; buildings = false; }
					if (army) {
						row = ns[z].split(':');	
						unitsname = row[0];
						if (unitsname.indexOf('Bajorai')>-1) unitpop = 100;
						else if (unitsname.indexOf('Taranai')>-1) unitpop = 5; 
						else if (unitsname.indexOf('Balista')>-1) unitpop = 6; 
						else if (unitsname.indexOf('Katapultos')>-1) unitpop = 8; 
						else if (unitsname.indexOf('Trebušetai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Sunkioji kavalerija')>-1) unitpop = 6; 
						else if (unitsname.indexOf('Lengvoji kavalerija')>-1) unitpop = 4; 
						else if (unitsname.indexOf('Šnipai')>-1) unitpop = 2; 
						else if (unitsname.indexOf('Raiti šauliai')>-1) unitpop = 8; 
						else if (unitsname.indexOf('Karvedžiai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Kryžiuočių riteriai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Apgulties bokštai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Tangra dvasininkai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Vienuoliai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Janičarai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Būgnininkai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Alebardininkai')>-1) unitpop = 10; 
						else if (unitsname.indexOf('Huskarla')>-1) unitpop = 10; 
						else unitpop = 1;
						units = row[1].split(' ')[1];
						armypop = armypop + units * unitpop;
					}
					if (buildings) {
						lvl = ns[z].substring(ns[z].indexOf('(')+1,ns[z].indexOf('lygis')-1)
						buildpop = buildpop + lvl * 10;
					}
					if (res) {
						resource = ns[z].substr(0,ns[z].indexOf(' '));
						resources = resources + resource * 1;
					}
					if ((ns[z].indexOf(lng_army)>-1)&&(n[j].textContent.indexOf('ra.')==-1)) { spyreport = true; army = true; buildings = false; }
					if (ns[z].indexOf(lng_buildings)>-1) { buildings = true; res = false; }
					if (ns[z].indexOf(lng_resources)>-1) { res = true; }
				}
				for (var z=0;z<n[j].childNodes.length;z++) {
					if (n[j].childNodes[z].textContent==lng_army) n[j].childNodes[z].textContent = lng_army + ' (Pilyje: '+armypop+' pop. Ne pilyje: '+(popvalue-armypop-buildpop)+' pop.)';
					if (n[j].childNodes[z].textContent.indexOf(lng_buildings)>-1) n[j].childNodes[z].textContent = lng_buildings + ' (Viso: '+buildpop+' pop.)';
					if (n[j].childNodes[z].textContent.indexOf(lng_resources)>-1) n[j].childNodes[z].textContent = lng_resources + ' (Viso: '+resources+')';
					if (n[j].childNodes[z].textContent.indexOf(lng_pop)>-1 && spyreport) n[j].childNodes[z].textContent = n[j].childNodes[z].textContent + ' (Galima maksimali kariuomenė: '+(maxvalue-buildpop)+')';
				}
				
			}
		}
	}
	
	//=======================
	// Play sound if under attack
	//=======================

	function underAttack() {
		var z = id('underAttack');
		if (z) playSound();
	}

	function playSound()
	{
		body = document.getElementsByTagName('body')[0];
		var emb = document.createElement('embed');
		emb.src = "http://www.freesoundfiles.tintagel.net/Audio/free-wav-files-alarms/RING.WAV";
		emb.setAttribute("autostart", "true");
		emb.setAttribute("loop", "true");
		emb.setAttribute("hidden", "true");
		emb.setAttribute("volume", "100");
		body.appendChild(emb);
	}

	//===================
	// Select part of Army or part of any unit
	//===================

	function SetAvg(arg1) { 
		var unitsToSendTable = document.getElementById("units_to_send"); 
		var n = unitsToSendTable.getElementsByTagName("a"); 
		var aCount = n.length; 
		for (var i = 0; i < aCount; i++) { 
			if (n[i].className=="set_min") { 
				var b = n[i-1].getAttribute("onclick"); 
				vid = (b.split('\'')[3]-(b.split('\'')[3]%arg1))/arg1;	
				oncl = "setMaximum(\'"+b.split('\'')[1]+"\',\'"+vid+"\');";	
				setMaximum(b.split('\'')[1],vid);
			}
		}
	}

	function addAvgLinks() {
		var n, b, oncl, vid;
		n = document.getElementsByTagName("a");
		function createAvgLink(arg1) {
			var a = document.createElement('a');
			a.appendChild(document.createTextNode('1/'+arg1));
			a.href = 'javascript:SetAvg('+arg1+');'; 
			a.setAttribute("class", "mysetmax");
			n[i].parentNode.appendChild(document.createTextNode(" / "));
			n[i].parentNode.appendChild(a);
		}
		for(var i=0; i<n.length; i++){
			if(n[i].className=="set_min"){
				b = n[i-1].getAttribute("onclick");
				vid = (b.split('\'')[3]-(b.split('\'')[3]%2))/2;
				oncl = "setMaximum(\'"+b.split('\'')[1]+"\',\'"+vid+"\');";
				var a = document.createElement('a');
				a.appendChild(document.createTextNode("("+vid+")"));
				a.href = 'javascript:void(0);';
				a.setAttribute("class", "mysetmax");
				a.setAttribute("onclick", oncl);
				n[i].parentNode.appendChild(document.createTextNode(" / "));
				n[i].parentNode.appendChild(a);
			}
			if(n[i].href=="javascript:setAll(false);") for (var j=2;j<=4;j++) createAvgLink(j);
		}
	}

	//=======================
	// Get map properties table ( all castles, coordinates,  house levels, players, alliance, last connect, remains of battles)
	//=======================

	function get_map_props() {
		var ma=document.getElementsByClassName("wrapper");
		var b=document.getElementsByClassName("largeMapFrame");
		var x=0,y=0,z=0;
		var rt = document.getElementsByClassName("map_table");
		var tbl = document.createElement("table");
		tbl.setAttribute("width","100%");
		tbl.setAttribute("class","map_table");
		for (y=0;y<ma[x].childNodes.length;y++) {
			var text = ma[x].childNodes[y].title;
			var lvl = ma[x].childNodes[y].className;
			if (text && text.indexOf('clean up')==-1) {
				var txt1 = text.split("<br/>");
				var cell1 = document.createElement("td");
				cell1.setAttribute("class","mysetmax");
				var tt = txt1[0].substring(txt1[0].indexOf("[")+1,txt1[0].indexOf("]"));
				var n_nr = lvl.substr(lvl.indexOf("-")+1);
				if (n_nr==24) n_nr=30; if (n_nr==23) n_nr=29; 
				if (n_nr==22) n_nr=27; if (n_nr==21) n_nr=25; 
				if (n_nr==20) n_nr=24; if (n_nr==19) n_nr=22; 
				if (n_nr==18) n_nr=20; if (n_nr==17) n_nr=19; 
				if (n_nr==16) n_nr=17; if (n_nr==15) n_nr=15;
				if (n_nr<15) n_nr--; 
				cell1.appendChild(document.createTextNode(tt.substr(tt.indexOf("("))+" "+n_nr+"lvl"));
				var row = document.createElement("tr"), be_clan = true;
				if (text.indexOf("clan.gif")>0) be_clan = false;
				row.appendChild(cell1);
				for (h=0;h<txt1.length;h++) {
					var cell2 = document.createElement("td");
					cell2.setAttribute("class","mysetmax");
					if (be_clan && h==3) {
						var cell3 = document.createElement("td");
						cell3.setAttribute("class","mysetmax");
						cell3.appendChild(document.createTextNode("---"));
						row.appendChild(cell3);
					}
					cell2.appendChild(document.createTextNode(txt1[h].substr(txt1[h].indexOf("/>")+2)));
					row.appendChild(cell2);
				}
				tbl.appendChild(row);
			}
		}
		if (rt.length>0) rt[0].parentNode.removeChild(rt[0]);
		b[0].parentNode.appendChild(tbl);
	}

	//=======================
	// Get info about barracks army building time
	//=======================

	function getall_barracks() {
		var resall = "", load_all = 0;
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://" + document.domain + "/barracks.php?unit_type=1",
			headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {	addNearLinkTime('a','Kareivinės',time_from_response(response.responseText)); }
		});

		GM_xmlhttpRequest({
			method:"GET",
			url:"http://" + document.domain + "/barracks.php?unit_type=2",
			headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {	addNearLinkTime('a','Arklidės',time_from_response(response.responseText)); }
		});

		GM_xmlhttpRequest({
			method:"GET",
			url:"http://" + document.domain + "/barracks.php?unit_type=4",
			headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {	addNearLinkTime('a','Dirbtuvės',time_from_response(response.responseText));	}
		});

		GM_xmlhttpRequest({
			method:"GET",
			url:"http://" + document.domain + "/barracks.php?unit_type=3",
			headers:{ "User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
			onload:function(response) {	addNearLinkTime('a','Orderis',time_from_response(response.responseText)); }
		});

		function time_from_response(txt) {
			var ind = txt.lastIndexOf("cnt_all");
			if (ind!=-1) {
				var ind1 = 0, ind2 = 0, time, h, m, s;
				ind1 = txt.indexOf("<strong>",ind)+8;
				ind2 = txt.indexOf("</strong>",ind);
				time = txt.substring(ind1,ind2);
				h = Math.floor(time/3600);
				m = Math.floor((time-h*3600)/60);
				s = time-h*3600-m*60;
				if (h<10) h = "0" +h;
				if (m<10) m = "0" +m;
				if (s<10) s = "0" +s;
				return h + ":"+ m + ":" + s;
			}
			return "--:--:--";
		}
	}

	//=========================
	// Add extra links in mainnav menu, Script copied from Joe Simmons
	//=========================

	function id(ID) {
		if(ID) { return document.getElementById(ID); }
		else { return false; }
	}

	function addLink(arg1, arg2, arg3, arg4) {
		var n, a;
		if (arg4) n = document.getElementsByName(arg3)[0];
		else n = id(arg3);
		var a = document.createElement('a');
		var br = document.createElement('br');
		a.appendChild(document.createTextNode(arg1));
		a.href = arg2;
		a.setAttribute("class", "mysetmax");
		n.appendChild(document.createTextNode(" "));
		n.parentNode.appendChild(a);
	}

	function addLink1(arg1, arg2, arg3) {
		var n, a, b;
		n = id(arg3);
		a = document.createElement("li");
		a.setAttribute("id",arg3);
		b = document.createElement("a");
		b.appendChild(document.createTextNode(arg1));
		b.href = arg2;
		a.appendChild(b);
		n.parentNode.appendChild(a);
	}

	function addsMeniuTable(arg1, meniuHeader, meniuItems, meniuLinks) {
		var n = document.getElementsByClassName(arg1)[0];
		var h3 = document.createElement('h3');
		var divSub = document.createElement('div');
		var divTitle = document.createElement('div');
		divSub.setAttribute('class','sub');
		divTitle.setAttribute('class','title');
		divTitle.appendChild(document.createTextNode(meniuHeader));
		divSub.appendChild(divTitle);
		h3.appendChild(divSub);
		ul = document.createElement('ul');
		ul.setAttribute('style',"background: rgb(61, 0, 0) url(img/reborn/mn_box_bknd_vip.jpg) no-repeat scroll right bottom; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;");
		
		function createListItem(textNode, link) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.setAttribute('href',link);
			a.appendChild(document.createTextNode(textNode));
			li.appendChild(a);
			ul.appendChild(li);
		}
		
		for (var i=0;i<meniuItems.length;i++) {
			createListItem(meniuItems[i], meniuLinks[i]);
		}
		
		n.parentNode.appendChild(h3);
		n.parentNode.appendChild(ul);
	}
	
	//========================
	// Embed function in html
	//========================

	function embedFunction(s) {
		document.body.appendChild(document.createElement("script")).innerHTML=s.toString();
	}

	//========================
	// Menu window
	//========================

	GM_addStyle(".props { display:block; cursor:move; padding: 20px 0px 20px 0px; position:absolute; color: white; background-color: black; border:2px; border-color:grey; z-index:10000; -moz-border-radius:5px;}");
	GM_addStyle(".tarea {background-color: rgb(82, 82, 82); color: white; font-size:12px;}");
	GM_addStyle("input.buttons {padding: 3px; margin: 2px 0px 10px 10px; font-size:12px;   font-weight:bold;   color:#000000;   border-width:1px;}");

	function goLite(FRM,BTN)
	{
	   window.document.forms[FRM].elements[BTN].style.color = "#FFFFFF";
	   window.document.forms[FRM].elements[BTN].style.backgroundColor = "#000000";
	}

	function goDim(FRM,BTN)
	{
	   window.document.forms[FRM].elements[BTN].style.color = "#000000";
	   window.document.forms[FRM].elements[BTN].style.backgroundColor = "";
	}

	embedFunction(goDim);
	embedFunction(goLite);
	embedFunction(options_window);

	function options_window() {
		function closeForm() {
			var rem_menu = document.getElementById("props");
			rem_menu.innerHTML = '';
			var rem_menu = document.getElementById("properties");
			rem_menu.innerHTML = '';
		}
		var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
		closeBtn = document.createElement('img');
		closeBtn.src = sCloseBtn;
		form = document.createElement("form");
		form.setAttribute('name','properties');
		form.setAttribute('id','properties');
		form.setAttribute('style','background-color: rgb(82,82,82); cursor: default;');
		form.appendChild(document.createElement("br"));
		var stilius1 = 'background-color: rgb(82, 82, 82); color: white; margin: 10px;';
		var stilius2 = 'background-color: rgb(82, 82, 82); color: white; margin-left: 10px;';
		function createElem(elem,type,name,textnode,style) {
			var input = document.createElement(elem);
			input.setAttribute('type',type);
			input.setAttribute('name',name);
			if (style) {
				input.setAttribute('style',style);
				input.setAttribute('size','3');
			}
			else input.setAttribute('style','margin-left:10px;');
			form.appendChild(input);
			if (textnode) form.appendChild(document.createTextNode(textnode));
			if (name!='autoreload' && name!='marketaction') form.appendChild(document.createElement("br"));
		}
		
		createElem('input',	'checkbox',	'messages_menu',	' Extra messages menu'						);
		createElem('input',	'checkbox',	'map_table',		' Map table button'							);
		createElem('input',	'checkbox',	'all_barracks',		' Barracks information everywhere'			);
		createElem('input',	'checkbox',	'all_barracks_upg',	' Barracks info only in upgrades'			);
		createElem('input',	'checkbox',	'under_attack',		' Under attack sound'						);
		createElem('input',	'checkbox',	'option_box',		' Marches option box'						);
		createElem('input',	'checkbox',	'autoreload',		' Auto reload: '							);
		createElem('input',	'text',		'reloadtime',		' s', 								stilius2);
		createElem('input',	'checkbox',	'spyreport',		' Spy report analyzer'						);
		createElem('input',	'checkbox',	'marchesinfo',		' Marches info lines'						);
		//createElem('input',	'checkbox',	'marketlinks',		' Market additional links'					);
		createElem('input',	'checkbox',	'marketaction',		' Market action: '							);
		createElem('input',	'text',		'marketindex',		' ', 								stilius2);
		//createElem('input',	'checkbox',	'allylastconnect',	' Ally last connect (only with VIP)'		);
		//createElem('input',	'checkbox',	'mouseDblClick',	' Mouse double click goes up'				);
		createElem('input',	'checkbox',	'messageLinksAdd',	' Messages links add'						);
		//createElem('input',	'checkbox',	'buildingNeededRes',' Building needed resources'				);
		createElem('input',	'checkbox',	'shortcutKeys',		' Shortcut Keys'							);
		createElem('input',	'checkbox',	'autoBuilding',		' Auto Building'							);
		
		input = document.createElement("textarea");
		input.setAttribute('style',stilius1);
		input.setAttribute('name','tarea');
		input.setAttribute('cols','42');
		input.setAttribute('rows','10');
		input.value = getCookie('note').replace(/,/g,'\n');
		form.appendChild(document.createElement('br'));
		form.appendChild(input);
		form.appendChild(document.createElement("br"));
		
		input = document.createElement("input");
		input.setAttribute('type','button');
		input.addEventListener("click", 
			function () {
				setCookie('map_table', document.properties.map_table.checked);
				setCookie('all_barracks', document.properties.all_barracks.checked);
				setCookie('all_barracks_upg', document.properties.all_barracks_upg.checked);
				setCookie('messages_menu', document.properties.messages_menu.checked);
				setCookie('note', document.properties.tarea.value.split('\n'));
				setCookie('under_attack', document.properties.under_attack.checked);
				setCookie('option_box', document.properties.option_box.checked);
				setCookie('autoreload', document.properties.autoreload.checked);
				setCookie('reloadtime', document.properties.reloadtime.value);
				setCookie('spyreport', document.properties.spyreport.checked);
				setCookie('marchesinfo', document.properties.marchesinfo.checked);
				//setCookie('marketlinks', document.properties.marketlinks.checked);
				setCookie('marketaction', document.properties.marketaction.checked);
				setCookie('marketindex', document.properties.marketindex.value);
				//setCookie('allylastconnect', document.properties.allylastconnect.checked);
				//setCookie('mouseDblClick', document.properties.mouseDblClick.checked);
				setCookie('messageLinksAdd', document.properties.messageLinksAdd.checked);
				//setCookie('buildingNeededRes', document.properties.buildingNeededRes.checked);
				setCookie('shortcutKeys', document.properties.shortcutKeys.checked);
				setCookie('autoBuilding', document.properties.autoBuilding.checked);
				closeForm();
			}, 
		0);
		input.setAttribute('name','save1');
		input.setAttribute('class','buttons');
		input.setAttribute('value','Save');
		input.setAttribute('title','Save and exit');
		input.setAttribute('onMouseOver','goLite(this.form.name,this.name)');
		input.setAttribute('onMouseOut','goDim(this.form.name,this.name)');
		form.appendChild(input);

		input = document.createElement('input');
		input.setAttribute('type','button');
		input.addEventListener('click',	function () {closeForm();}, 0);
		input.setAttribute('value','Cancel');
		input.setAttribute('name','cancel1');
		input.setAttribute('class','buttons');
		input.setAttribute('title','Exit');
		input.setAttribute('onMouseOver','goLite(this.form.name,this.name)');
		input.setAttribute('onMouseOut','goDim(this.form.name,this.name)');
		form.appendChild(input);
		
		var divDic = document.getElementById('props');
		var divTitp = document.createElement('p');
		var divTit = document.createTextNode('Khanwars script option');
		closeBtn.setAttribute('style','float: right; margin: 0px 10px 5px 0px; cursor: pointer;');
		closeBtn.addEventListener("click", function () { closeForm(); }, 0);
		divDic.appendChild(closeBtn);
		divTitp.setAttribute('style','text-align: center; text-weight: bold; cursor: default;');
		divTitp.appendChild(divTit);
		divDic.appendChild(divTitp);
		divDic.appendChild(form);
		
		if (getCookie('all_barracks_upg')=='true') document.properties.all_barracks_upg.checked = true;
		if (getCookie('messages_menu')=='true') document.properties.messages_menu.checked = true;
		if (getCookie('map_table')=='true') document.properties.map_table.checked = true;
		if (getCookie('all_barracks')=='true') document.properties.all_barracks.checked = true;
		if (getCookie('under_attack')=='true') document.properties.under_attack.checked = true;
		if (getCookie('option_box')=='true') document.properties.option_box.checked = true;
		if (getCookie('autoreload')=='true') document.properties.autoreload.checked = true;
		if (getCookie('spyreport')=='true') document.properties.spyreport.checked = true;
		if (getCookie('marchesinfo')=='true') document.properties.marchesinfo.checked = true;
		//if (getCookie('marketlinks')=='true') document.properties.marketlinks.checked = true;
		if (getCookie('marketaction')=='true') document.properties.marketaction.checked = true;
		//if (getCookie('allylastconnect')=='true') document.properties.allylastconnect.checked = true;
		//if (getCookie('mouseDblClick')=='true') document.properties.mouseDblClick.checked = true;
		if (getCookie('messageLinksAdd')=='true') document.properties.messageLinksAdd.checked = true;
		//if (getCookie('buildingNeededRes')=='true') document.properties.buildingNeededRes.checked = true;
		if (getCookie('shortcutKeys')=='true') document.properties.shortcutKeys.checked = true;
		if (getCookie('autoBuilding')=='true') document.properties.autoBuilding.checked = true;
		document.properties.reloadtime.value = getCookie('reloadtime'); 
		document.properties.marketindex.value = getCookie('marketindex'); 
	}

	//===================
	// Start of Cookies
	//===================

	embedFunction(getCookie);
	embedFunction(setCookie);

	function setCookie(c_name,value)
	{
		expiry = new Date();
		expiry.setDate(expiry.getDate() + 14);
		document.cookie=c_name+ "=" + escape(value) + ";expires="+expiry.toGMTString();
	}

	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1; 
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return "";
	}

	//====================
	// Double click event listener
	//====================

	if (getCookie('mouseDblClick')=='true') document.addEventListener("dblclick",function(){scrollTo(0,0);},true);
	
	//====================
	// Draggable menu
	//====================
	
	var divDic = document.createElement('div');
	divDic.setAttribute('id','props');
	divDic.setAttribute('class','props');
	divDic.addEventListener('mousedown', dragHandler, false);
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(divDic);

	var savedTarget=null; 
	var orgCursor=null;   
	var dragOK=false;     
	var dragXoffset=0;    
	var dragYoffset=0;    
   
	vidPaneID = document.getElementById('props'); 	
	vidPaneID.style.top='75px';                     
	vidPaneID.style.left='205px';                    

   
	function moveHandler(e){
		if (e == null) return;
		if ( e.button<=1 && dragOK ){
			savedTarget.style.left = e.clientX - dragXoffset + 'px';
			savedTarget.style.top = e.clientY - dragYoffset + 'px';
			return false;
		}
	}

	function cleanup(e) {
		document.removeEventListener('mousemove',moveHandler,false);
		document.removeEventListener('mouseup',cleanup,false);
		savedTarget.style.cursor=orgCursor;

		dragOK=false; 
		didDrag=true;
	}

	function dragHandler(e){
		var htype='-moz-grabbing';
		if (e == null) return; 
		var target = e.target;
		orgCursor=target.style.cursor;
	  
		if(target.nodeName!='DIV') return;
		if (target.className=="props") {
			savedTarget=target;       
			target.style.cursor=htype;
			dragOK=true;
			dragXoffset = e.clientX-target.offsetLeft;
			dragYoffset = e.clientY-target.offsetTop;
			
			target.style.left = e.clientX - dragXoffset + 'px';
			target.style.right = null;
		
			document.addEventListener('mousemove',moveHandler,false);
			document.addEventListener('mouseup',cleanup,false);
			return false;
		}
    }
	
	//====================
	// Script execute time
	//====================
	
	RunTime[1] = new Date().getTime();
	var timeval="" + (RunTime[1]-RunTime[0]);
	
	var meniuI = ['Opcijos', 'Skriptas užsikrovė: '+timeval+' ms'];
	var meniuL = ['javascript:options_window();',''];
	var ids = 'botcheck';
	if (document.getElementsByClassName(ids)) {
		addsMeniuTable(ids, 'Skripto meniu', meniuI, meniuL);
	}
		
	GM_log("Skriptas sėkmingai įvykdytas. Serveris: " + document.domain);
}

if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
} else {
	window.attachEvent('onload', functionMain);
}

//========================
// END OF SCRIPT
//========================