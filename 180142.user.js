// ==UserScript==
// @name           Gangs Fakes Generator
// @author         Bassem
// @namespace      TW
// @description    Generates many kinds of fakes scripts + player claimlist + player table format
// @include        http://ae*.tribalwars.ae/game.php?*&screen=info_player*
// @include        http://us*.tribalwars.us/game.php?*&screen=info_player*
// @version        1.1
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({
	cache : true
});

(function($) {
	var txt = "";
	function GangsFakesGenerator() {
		try {
			var lang = {
				'ae' : {
					'tv' : 'اي من الاكواد تحب ان تستعمل ؟ \n 1 : متسلسل \n 2 :  هجوم عشوائي \n 3 : دعم عشوائي \n 4 : دعم وهجوم عشوائي \n 5 : تجسس \n 6 : الاحداثيات \n 7 : قائمة الحجوزات \n 8 : تحويل قرى اللاعب الى جدول \n\n اضغط على <Esc> او "cancel":\tللخروج\n',
					'ks' : 'قارة ؟ \nمثال : 33 \nمثال: 24 35 44 34 55 76 \nاو اترك الخانة فارغة لجميع القرى',
					'ts' : 'اي نوع من القوات تحب ان تبدأ به ؟ \n\n 1 - ابدأ "بالمحطمات" + "المقاليع". \n 2 - ابدأ "رمح" + "فأس".',
					'playerName' : 'اللاعب',
					'points' : 'النقاط',
					'rank' : 'الترتيب',
					'OpponentsDefeated' : 'ترتيب افضل قبيلة',
					'tribe' : 'القبيلة',
					'village' : 'القرى',
					'point' : 'نقاط',
					'OD' : 'الخصوم المهزومون-OD',
					'villageClaimList' : 'قائمة القرى',
					'errormsg' : 'كان هناك خطأ في هذه الصفحة.\n\nوصف الخطأ:',
					'errormsg2' : '\n\nانقر فوق موافق للمتابعة.\n\n',
					'errormsg3' : 'هذا السكريبت يعمل  فقط من صفحة ملف اللاعب -> screen=info_player'
				},
				'en' : {
					'tv' : 'Which code do you wish to use? \n 1 : Sequential \n 2 : Random \n 3 : Random support \n 4 : Random attacks and support \n 5 : Scouts \n 6 : Coords \n 7 : Claim List \n 8 : Format Player Vills into table \n\n Press <Esc> or "cancel":\tTo Exit\n',
					'ks' : "Ks? \nExample: 33 \nExample: 24 35 44 34 55 76 \nOr leave empty for all villages",
					'ts' : 'Wich type of units to send ? \n\n 1 - Start with "Ram" & "Cautapult" \n 2 - Start with "Spear" & "Axe"',
					'playerName' : 'player name',
					'points' : 'Points',
					'rank' : 'Rank',
					'OpponentsDefeated' : 'Opponents Defeated',
					'tribe' : 'Tribe',
					'village' : 'village',
					'point' : 'Point',
					'OD' : 'Opponents defeated-OD',
					'villageClaimList' : 'village Claim List',
					'errormsg' : 'There was an error on this page.\n\nError description:',
					'errormsg2' : '\n\nClick OK to continue.\n\n',
					'errormsg3' : 'This script must be run from\nthe players profile -> screen=info_player'
				},
			};

			function add_textBox(text) {
				d = doc;
				t = d.getElementById('villages_list').parentNode.getElementsByTagName('TABLE')[0];
				r = d.createElement('tr');
				e = d.createElement('td');
				e.setAttribute('colspan', 2);
				w = d.createElement('h2');
				w.appendChild(d.createTextNode('wIcked_Script'));
				n = d.createElement('textarea');
				n.setAttribute('rows', 10);
				n.setAttribute('cols', 55);
				n.setAttribute('onFocus', 'this.select()');
				n.appendChild(d.createTextNode(text));
				e.appendChild(w);
				e.appendChild(n);
				r.appendChild(e);
				t.appendChild(r);
				d.resated = true
			}

			function trim(str) {
				return str.replace(/^\s+|\s+$/g, "");
			}

			function _lz(n, l) {
				n = String(n);
				while (n.length < l)
				n = "0" + n;
				return n
			}

			function _villInKs(v, Ks) {
				var i;
				v = v.split("|"), i;
				for ( i = 0; i < Ks.length; ++i)
					if (parseInt(String(v[1])[0] + String(v[0])[0]) == Ks[i])
						return 1;
				return 0
			}

			function _InKs(Vs) {
				var Ks = prompt(bas.ks, "").match(/\d+/g);
				if (!Ks)
					return Vs;
				var i, j = -1, rVills = [];
				for ( i = 0; i < Vs.length; ++i)
					if (_villInKs(Vs[i], Ks))
						rVills[++j] = Vs[i];
				return rVills
			}

			function _InKsIds(Vs, Ids) {
				var Ks = prompt(bas.ks, "").match(/\d+/g);
				if (!Ks)
					return Ids;
				var i, j = -1, rVills = [];
				for ( i = 0; i < Vs.length; ++i)
					if (_villInKs(Vs[i], Ks))
						rVills[++j] = Ids[i];
				return rVills
			}

			function gcn(classname, el) {
				return (el != undefined ? el.getElementsByClassName(classname) : document.getElementsByClassName(classname));
			}

			function gid(id, el) {
				return (el != undefined ? el.getElementById(id) : document.getElementById(id));
			}

			function gtn(tagname, el) {
				return (el != undefined ? el.getElementsByTagName(tagname) : document.getElementsByTagName(tagname));
			}

			function gbn(name, el) {
				return (el != undefined ? el.getElementsByName(name) : document.getElementsByName(name));
			}

			/*getting the outerHTML of an element*/
			function htmlInclusive(elem) {
				return $('<div />').append($(elem).clone()).html();
			}

			function fnAjax(url, method, params, type, isAsync) {
				var error = null;
				var payload = null;

				$.ajax({
					'async' : isAsync,
					'url' : url,
					'data' : params,
					'dataType' : type,
					'type' : String(method || 'GET').toUpperCase(),
					'error' : function(req, status, err) {
						error = 'ajax: ' + status;
					},
					'success' : function(data, status, req) {
						payload = data;
					}
				});

				return payload;
			}

			var url = document.location.href;
			var langs = url.match(/\/\/(\D{2})\d+\./);
			langs = langs ? langs[1] : false;
			var std_lang = 'en';
			var _server = langs ? langs : std_lang;
			var bas = lang[_server] ? lang[_server] : lang[std_lang];

			var ClaimListFormat = "(n) ---> [claim](vCoords)[/claim] --- (vPoints)";

			var doc = document;
			var _world = game_data.world;
			var _host = window.location.host;

			/*http://ae18.tribalwars.ae/interface.php?func=get_config*/
			var _archer = $(fnAjax('/interface.php', 'GET', {
				'func' : 'get_config'
			}, 'xml', false)).find('config');

			var archer = parseInt(_archer.find('archer').text(), 10);

			if (!url.match(/screen=info_player/g)) {
				alert(bas.errormsg3);
			} else {
				var type = prompt(bas.tv, '2');
			}

			/* Quit if cancelled or blank */
			if (type == null)
				return 0;
			/* or this
			 if (!option) {
			 return;
			 }*/

			/*This checks to see if its over 100 rows (if it is, then it means that annoying button is there, which you need to get rid of*/
			var table = gid("villages_list", doc);
			if (table.tBodies[0].rows.length > 100 && table.tBodies[0].rows.length < 102) {
				var str = table.tBodies[0].rows[100].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("onclick").replace("return false", "");
				var patt1 = /\d+/g;
				var x = (str.match(patt1));
				Player.getAllVillages(this, '/game.php?village=' + x[0] + '&screen=info_player&ajax=fetch_villages&player_id=' + x[1]);
				table.tBodies[0].deleteRow(100);
				/*end();*/
			}

			/*to wait 1 second for the "getAllVillages" button to be clicked before excuting add_textBox function*/
			setTimeout(function() {
				add_textBox(crds_n_pnts());
			}, 1000);

			/*main function*/
			function crds_n_pnts() {
				var output = '';
				var coordsList = '';
				var ids = '';
				var i, k = 0, villName, villCoords, villPoints, tmpOutput, _tmpOutput, ts;
				var targetID = doc.URL.match(/id=\d{1,}/i)[0].replace("id=", '');
				var pImage = "[img]http://ae.twstats.com/image.php?type=playergraph&graph=points&id=" + targetID + "&s=" + _world + "[/img]";
				var odImage = "[img]http://ae.twstats.com/image.php?type=playergraph&graph=od&id=" + targetID + "&s=" + _world + "[/img]";

				/*First Table*/
				var base = gid('content_value', doc);
				var targetName = base.childNodes[1].innerHTML;
				var rows = gtn('TABLE' , base)[1].childNodes[1].childNodes;
				var player = gtn('TH', rows[0])[0].textContent;
				var points = gtn('TD', rows[2])[1].textContent;
				var rank = gtn('TD', rows[4])[1].textContent;
				var OpponentsDefeated = gtn('TD', rows[6])[1].textContent.replace(/^\s+|\s+$/g, "");
				var ally = gtn('TD', rows[8])[1].textContent.replace(/^\s+|\s+$/g, "");

				/*Second Table*/
				/*to find tr tags*/
				var coordsRows = gid('villages_list', doc).childNodes[3].childNodes;

				for ( i = 1; i < coordsRows.length; i += 2) {
					if (coordsRows[i].childNodes.length == 3) {

						coordsList += coordsRows[i].childNodes[1].innerHTML + " ";
						ids += coordsRows[i].childNodes[0].innerHTML.match(/id=(\d+)/i)[1] + " "
					}
				}
				ids = ids.slice(0, ids.length - 1);
				coordsList = coordsList.slice(0, coordsList.length - 1);

				/* Sequential */

				if (type == '1') {
					coordsList = _InKs(coordsList.split(" ")).join(" ");
					if (archer == 0) {
						output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)) {  doc.getElementById('troop_confirm_go').click();} else {coords='" + coordsList + "'; coords=coords.split(' '); index=0; farmcookie=document.cookie.match('(^|;) ?farm=([^;]*)(;|$)'); if(farmcookie!=null) index=parseInt(farmcookie[2]); if(index>=coords.length) alert('last village'); if(index>=coords.length) index=0; coords=coords[index]; coords=coords.split('|'); index=index+1; cookie_date=new Date(2099,11,11); document.cookie ='farm='+index+'; expires='+cookie_date.toGMTString (); doc.forms[0].x.value=coords[0]; doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('spy',-1)||a('light',-1)||a('heavy',-1));doc.units.attack.click();}end();";
					} else if (archer == 1) {
						output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)) {  doc.getElementById('troop_confirm_go').click();} else {coords='" + coordsList + "'; coords=coords.split(' '); index=0; farmcookie=document.cookie.match('(^|;) ?farm=([^;]*)(;|$)'); if(farmcookie!=null) index=parseInt(farmcookie[2]); if(index>=coords.length) alert('last village'); if(index>=coords.length) index=0; coords=coords[index]; coords=coords.split('|'); index=index+1; cookie_date=new Date(2099,11,11); document.cookie ='farm='+index+'; expires='+cookie_date.toGMTString (); doc.forms[0].x.value=coords[0]; doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));doc.units.attack.click();}end();";
					}

					/* Random */

				} else if (type == '2') {
					coordsList = _InKs(coordsList.split(" ")).join(" ");
					ts = prompt(bas.ts, '1');
					if (archer == 0) {
						if (ts == '1') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('spy',-1)||a('light',-1)||a('heavy',-1));doc.units.attack.click();}end();";
						} else if (ts == '2') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('sword',-1)||a('axe',-1)||a('spear',-1)||a('spy',-1)||a('light',-1)||a('heavy',-1));doc.units.attack.click();}end();";
						}
					} else if (archer == 1) {
						if (ts == '1') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));doc.units.attack.click();}end();";
						} else if (ts == '2') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));doc.units.attack.click();}end();";
						}
					}

					/*  Random support */

				} else if (type == '3') {
					coordsList = _InKs(coordsList.split(" ")).join(" ");
					ts = prompt(bas.ts, '1');
					if (archer == 0) {
						if (ts == '1') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('spy',-1)||a('light',-1)||a('heavy',-1));doc.units.support.click();}end();";
						} else if (ts == '2') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('sword',-1)||a('axe',-1)||a('spear',-1)||a('spy',-1)||a('light',-1)||a('heavy',-1));doc.units.support.click();}end();";
						}
					} else if (archer == 1) {
						if (ts == '1') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));doc.units.support.click();}end();";
						} else if (ts == '2') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));doc.units.support.click();}end();";
						}
					}

					/* Random attacks and support */

				} else if (type == '4') {
					coordsList = _InKs(coordsList.split(" ")).join(" ");
					ts = prompt(bas.ts, '1');
					if (archer == 0) {
						if (ts == '1') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('spy',-1)||a('light',-1)||a('heavy',-1));if(Math.round(Math.random()*5)>1){doc.units.attack.click();}else{doc.units.support.click();}}end();";
						} else if (ts == '2') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));if(Math.round(Math.random()*5)>1){doc.units.attack.click();}else{doc.units.support.click();}}end();";
						}
					} else if (archer == 1) {
						if (ts == '1') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('ram',-1)||a('catapult',-1)||a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));if(Math.round(Math.random()*5)>1){doc.units.attack.click();}else{doc.units.support.click();}}end();";
						} else if (ts == '2') {
							output = "javascript:var doc=(window.frames.length>0)?window.main.document:document;url=doc.URL;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}if(url.indexOf('screen=place')!=-1 && url.indexOf('try=confirm')!=-1 && (url.indexOf('php?village=n') == -1 && url.indexOf('php?village=p') == -1)){ doc.getElementById('troop_confirm_go').click();} else{coords='" + coordsList + "';coords=coords.split(' ');index=Math.round(Math.random()*(coords.length-1));coords=coords[index];coords=coords.split('|');doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];(a('sword',-1)||a('axe',-1)||a('spear',-1)||a('Archer',-1)||a('spy',-1)||a('light',-1)||a('Mounted archer',-1)||a('heavy',-1));if(Math.round(Math.random()*5)>1){doc.units.attack.click();}else{doc.units.support.click();}}end();";
						}
					}

					/* Scouts */

				} else if (type == '5') {
					coordsList = _InKsIds(coordsList.split(" "), ids.split(" ")).join(" ");
					output = "javascript:doc=document;function a(b,c){ var g,e;var h=doc.units[b]; if(h==null)return 0; e=h.nextSibling;do{ e=e.nextSibling;}while(e.nodeType!=1); g=parseInt(e.firstChild.nodeValue.match(/(\\d+)/)[1],10); f=(c<0)?c*-1:g-c;if(f>g) f=g; h.value=f;return f;}var host = window.location.host;var spys = parseInt(doc.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/(\\d+)/));if(doc.URL.match(/scouts=\\d+/g)){var scouts=doc.URL.match(/scouts=(\\d+)/i)[1];a('spy',-(scouts));doc.units.attack.click()}else if(doc.URL.match(/screen=place/g)&&doc.URL.match(/&try=confirm/g)){var inputs=doc.getElementsByTagName('input'),i,k;for(i=0;i<inputs.length;i++){if(inputs[i].id.indexOf('new_attack_name')!=-1){inputs[i].value='============================';inputs[i+1].click()}}doc.forms[0].submit.click()}else{sitter='';if(doc.URL.match(/t=\\d+/i))sitter=doc.URL.match(/t=\\d+/i);ids='" + coordsList + "'.split(' ');cv=doc.URL.match(/village=(\\d+)/i)[1];var ft=prompt('Number of tabs:\\n e.g1: 100\\n e.g2: 20-60',ids.length);var start,en;if(ft.match('-')){start=parseInt(ft.split('-')[0])-1;en=parseInt(ft.split('-')[1])}else{start=0;en=parseInt(ft)}var scouts=prompt('Number of tabs is: '+(en-start)+'\\n Enter number of scouts: \\n',Math.floor(spys/(en-start)));for(var i=start;i<en;++i)window.open('http://' + host + '/game.php?village='+cv+'&screen=place&target='+ids[i]+'&'+sitter+'&scouts='+scouts)}end();";

					/* Coords */

				} else if (type == '6') {
					coordsList = _InKs(coordsList.split(" ")).join(" ");
					output = coordsList

					/* Claim List */

				} else if (type == '7') {
					output = "[player]" + targetName + "[/player]" + "\n.\n.\n[u][b]" + bas.points + "[/b][/u]\n\n" + pImage + "\n.\n.\n[u][b]" + bas.OD + "[/b][/u]\n\n" + odImage + "\n.\n.\n[u][b]" + bas.villageClaimList + "[/b][/u]\n\n[spoiler]";
					coordsList = _InKs(coordsList.split(" ")).join(" ");
					for ( i = 1; i < coordsRows.length; i += 2) {
						if (coordsRows[i].childNodes.length != 3 || coordsList.indexOf(coordsRows[i].childNodes[1].innerHTML) == -1)
							continue;
						villPoints = coordsRows[i].childNodes[2].innerHTML.match(/\d+/g);
						if (villPoints.length > 1)
							villPoints = villPoints[0] + "." + villPoints[1];
						else
							villPoints = villPoints[0];
						tmpOutput = ClaimListFormat.replace("(n)", '[b][color=#ff0000][size=12]' + _lz(++k, 4) + '[/size][/color][/b]');
						tmpOutput = tmpOutput.replace("(vCoords)", coordsRows[i].childNodes[1].innerHTML);
						/*tmpOutput = tmpOutput.replace("(vName)", coordsRows[i].childNodes[0].childNodes[0].innerHTML);*/
						tmpOutput = tmpOutput.replace("(vPoints)", villPoints);
						output += tmpOutput + "\n"
					}
					output += "[/spoiler]";

					/* Format Player Vills into table */

				} else if (type == '8') {

					coordsList = _InKs(coordsList.split(" ")).join(" ");

					output = '[table]';
					output += '[**][b]' + bas.playerName + ':[/b][||][player]{player}[/player][/**]' + '\r\n';
					output += '[*][b]' + bas.points + ':[/b][|]{points}[/*]' + '\r\n';
					output += '[*][b]' + bas.rank + ':[/b][|]{rank}[/*]' + '\r\n';
					output += '[*][b]' + bas.OpponentsDefeated + ':[/b][|]{OpponentsDefeated}[/*]' + '\r\n';
					output += '[*][b]' + bas.tribe + ':[/b][|][ally]{ally}[/ally][/*][/table]' + '\r\n\r\n';

					var newformat = output.replace('{player}', player).replace('{points}', points).replace('{rank}', rank).replace('{OpponentsDefeated}', OpponentsDefeated).replace('{ally}', ally);

					output = newformat;
					output += '[table][**]N.[||]' + bas.village + ':[||]' + bas.points + ':[/**]' + '\r\n';
					for ( i = 1; i < coordsRows.length; i += 2) {
						if (coordsRows[i].childNodes.length != 3 || coordsList.indexOf(coordsRows[i].childNodes[1].innerHTML) == -1)
							continue;
						villPoints = coordsRows[i].childNodes[2].innerHTML.match(/\d+/g);
						if (villPoints.length > 1)
							villPoints = '[b]' + villPoints[0] + "." + villPoints[1] + '[/b]';
						else
							villPoints = '[b]' + villPoints[0] + '[/b]';

						_tmpOutput = '[*][b][color=#ff0e0e]' + _lz(++k, 1) + '[/color][/b][|][claim]{coordinates}[/claim][|]{_points}[/*]' + '\r\n';
						output += _tmpOutput.replace('{coordinates}', coordsRows[i].childNodes[1].innerHTML).replace('{_points}', villPoints);

					}
					output += '[/table]';

				}

				return output
			}

		} catch(err) {
			txt = bas.errormsg + err.message + bas.errormsg2;
			alert(txt);
		}
	}

	GangsFakesGenerator();
})(jQuery);
void 0;
