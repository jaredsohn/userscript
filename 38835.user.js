// ==UserScript==
// @name		Travian NPC-AddIn SC
// @version		2.5.9 sc updated by bluelovers
// @namespace	http://speed.travian.tw
// @description	Add-in for the NPC merchant updated by by bluelovers
// @author		Toxon updated by by bluelovers
/////////////////////////////////////////////////////////////////////////////
// @include		http://*travian*/dorf*
// @include		http://*travian*/build*
// @include		http://*travian*/spieler*
// @include		http://*travian*/plus*
// @include		http://*travian*/allianz*
// @include		http://*travian*/nachrichten*
// @include		http://*travian*/berichte*
// @include		http://*travian*/allianz*
/////////////////////////////////////////////////////////////////////////////
// ==/UserScript==

(function() {
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

	var localStr = new Array();

	localStr['berechnemode'] = '平衡資源模式';

	localStr['customertotal'] = '計算所需資源';
	localStr['berechneressis'] = '分配資源';

	localStr['npc'] = '和 NPC 商人交易';
	localStr['res'] = '\u8CC7\u6E90';
	localStr['re1'] = '\u6728\u6750';
	localStr['re2'] = '\u78DA\u584A';
	localStr['re3'] = '\u92FC\u9435';
	localStr['re4'] = '\u7A40\u7269';
	localStr['re5'] = localStr['re4'];

	localStr['ro_'] = '羅馬人';
	localStr['ro0'] = '\u53E4\u7F85\u99AC\u6B65\u5175';
	localStr['ro1'] = '\u7981\u885B\u5175';
	localStr['ro2'] = '\u5E1D\u570B\u5175';
	localStr['ro3'] = '\u4F7F\u8005\u9A0E\u58EB';
	localStr['ro4'] = '\u5E1D\u570B\u9A0E\u58EB';
	localStr['ro5'] = '\u5C07\u8ECD\u9A0E\u58EB';
	localStr['ro6'] = '\u885D\u649E\u8ECA';
	localStr['ro7'] = '\u706B\u7130\u6295\u77F3\u6A5F';
	localStr['ro8'] = '\u53C3\u8B70\u54E1';
	localStr['ro9'] = '\u958B\u62D3\u8005';
	localStr['ro10'] = '\u5927\u5175\u53E4\u7F85\u99AC\u6B65\u5175';
	localStr['ro11'] = '\u5927\u5175\u7981\u885B\u5175';
	localStr['ro12'] = '\u5927\u5175\u5E1D\u570B\u5175';
	localStr['ro13'] = '\u5927\u99ac\u4F7F\u8005\u9A0E\u58EB';
	localStr['ro14'] = '\u5927\u99ac\u5E1D\u570B\u9A0E\u58EB';
	localStr['ro15'] = '\u5927\u99ac\u5C07\u8ECD\u9A0E\u58EB';


	localStr['ga_'] = '高盧人';
	localStr['ga0'] = '\u65B9\u9663\u5175';
	localStr['ga1'] = '\u528D\u58EB';
	localStr['ga2'] = '\u63A2\u8DEF\u8005';
	localStr['ga3'] = '\u96F7\u6CD5\u5E2B';
	localStr['ga4'] = '\u5FB7\u9B6F\u4F0A\u9A0E\u5175';
	localStr['ga5'] = '\u6D77\u9813\u8056\u9A0E';
	localStr['ga6'] = '\u885D\u649E\u8ECA';
	localStr['ga7'] = '\u6295\u77F3\u6A5F';
	localStr['ga8'] = '\u65CF\u9577';
	localStr['ga9'] = '\u958B\u62D3\u8005';
	localStr['ga10'] = '\u5927\u5175\u65B9\u9663\u5175';
	localStr['ga11'] = '\u5927\u5175\u528d\u58eb';
	localStr['ga12'] = '\u5927\u99ac\u63A2\u8DEF\u8005';
	localStr['ga13'] = '\u5927\u99ac\u96F7\u6CD5\u5E2B';
	localStr['ga14'] = '\u5927\u99ac\u5FB7\u9B6F\u4F0A\u9A0E\u5175';
	localStr['ga15'] = '\u5927\u99ac\u6d77\u9813\u8056\u9A0E';

	localStr['ge_'] = '條頓人';
	localStr['ge0'] = '\u68CD\u68D2\u5175';
	localStr['ge1'] = '\u77DB\u5175';
	localStr['ge2'] = '\u65A7\u982D\u5175';
	localStr['ge3'] = '\u5075\u5BDF\u5175';
	localStr['ge4'] = '\u904a\u4fe0';
	localStr['ge5'] = '\u689D\u9813\u9A0E\u58EB';
	localStr['ge6'] = '\u885D\u649E\u8ECA';
	localStr['ge7'] = '\u6295\u77F3\u6A5F';
	localStr['ge8'] = '\u53F8\u4EE4\u5B98';
	localStr['ge9'] = '\u958B\u62D3\u8005';
	localStr['ge10'] = '\u5927\u5175\u68CD\u68D2\u5175';
	localStr['ge11'] = '\u5927\u5175\u77DB\u5175';
	localStr['ge12'] = '\u5927\u5175\u65A7\u982D\u5175';
	localStr['ge13'] = '\u5927\u5175\u5075\u5BDF\u5175';
	localStr['ge14'] = '\u5927\u99ac\u904a\u4fe0';
	localStr['ge15'] = '\u5927\u99ac\u689D\u9813\u9A0E\u58EB';

	localStr['party0'] = '小型派對';
	localStr['party1'] = '大型派對';

	var vorrat = new Array();
	var lager = new Array();
	var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR, volk;
	var volkK = new Array('', 'ro_', 'ga_', 'ge_');
	var summe = Array();
	var spieler = '';
	var uid = 0;
	var einheit = new Array();

	var summenzeichen = '\u2211';
	var fragezeichen = '?';
	var haken = '\u2714';

	var script_stop = 0;
	var selfurl = document.location.href ? document.location.href : window.location.href;
	var selfurl_arg = '';

	var idioma, idioma2, pack_grafico;

	getGeneralData();

	if (script_stop) {
		localStr = volkK = null;
		return;
	}

	chk_volk();

	if (script_stop) {
		localStr = volkK = null;
		return;
	}

	generiereNPCLink();

	if (selfurl.match(/build\.php(.+)?$/i)) {
		selfurl_arg = RegExp.$1;

		ressisAuslesen();

		if (!selfurl_arg) {
			insertBack();
		} else if (contains(selfurl_arg, '&t=3')) {
			generiereNPCEintrag();
		}
	}

//	alert(volk);

	function getGeneralData() {
		getlocalStr();
		einheitenFestlegen();
		leseSpielerNamen();

		var xtemp = find("//img[contains(@src, 'plus.gif')]");

		if (xtemp) {
			xtemp.src.search(/\/img\/([^\/]+)\//);
			idioma = RegExp.$1;
		} else {
			idioma = 'tw';
		}

		document.title.search(/travian\s(\w+$)/i);
		idioma2 = RegExp.$1;

		find("//link[@rel='stylesheet'][2]").href.search(/^(.*\/)(.*)\.css$/);
		pack_grafico = RegExp.$1;
	}

	function _attachEvent(obj, evt, func) {
		if(obj.addEventListener) {
			if (is_array(evt)) {
				for(var i=0; i<evt.length; i++) {
					obj.addEventListener(evt[i], func, false);
				}
			} else {
				obj.addEventListener(evt, func, false);
			}
		} else if(obj.attachEvent) {
			if (is_array(evt)) {
				for(var i=0; i<evt.length; i++) {
					obj.attachEvent("on" + evt[i], func);
				}
			} else {
				obj.attachEvent("on" + evt, func);
			}
		}
	}

	function is_array(needle) {
		return (typeof needle == 'array') ? true : false;
	}

	function generiereNPCEintrag() {

		var csstext = '';
		csstext += '.truppenlink:link, .truppenlink:visited {font-weight:normal;}';
		csstext += '.truppenlink:hover {font-weight:bold;}';
		csstext += 'input:focus {-moz-outline-style: none}';

		GM_addStyle(csstext);

		if (contains(selfurl_arg, '&tribe=')) {
			volk = gup('tribe');

			setcookie('_volk_', volk);
		}

		var tag = find("//div[@id='lmid2']//p[4]");

		var newDIV = elem('div');

		var el = elem('INPUT');
		el.type = 'checkbox';
		el.value = 1;
		el.name = 'berechnemode';
		el.hideFocus = true;

		if (getcookies('_berechnemode_', 0) > 0) el.checked = true;
//		if (gup('r1') == '') el.disabled = true;

		_attachEvent(el, 'click', function (e) {
			var who = e.target;

			setcookie('_berechnemode_', who.checked ? 1 : 0);
//			location.reload();

//			var tmp = new Array();
//
//			for (var i = 1; i < 5; i++) {
//				if (! (p = parseInt(gup('r' + i)))) {
//					p = 0
//				}
//				tmp[i - 1] = p;
//			}
//
//			if (getcookies('_berechnemode_', 0) > 0) {
//				calculateRest(tmp);
//			} else {
//				berechneRessis2(tmp);
//			}

			berechneRessis4();

//			who.blur();
		});

		var ep = elem('label');

		ep.appendChild(el);
		ep.appendChild(textelem(T('berechnemode')));

		var ep2 = elem('p');
		ep2.appendChild(ep);
		ep2.appendChild(elem('br'));
		newDIV.appendChild(ep2);

		newTABLE = elem('TABLE', '', 'width', '99%');
		newTR = elem('TR');

		einfuegen();

		newTD = elem('TD');
		newTD.vAlign = 'top';
		newTD.width = '20%';

		newB = elem('B', T('res'));
		newTD.appendChild(newB);

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (var j = 1; j <= 5; j++) {
			insertRessiLink(j, newTD)
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);
		newBR = elem('BR');
		newTD.appendChild(newBR);
		for (var j = 1; j <= 4; j++) {
			insertRessis(j, newTD)
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);
		insertCustomerLink2(newTD);

		newTR.appendChild(newTD);
		newTABLE.appendChild(newTR);
		newDIV.appendChild(newTABLE);
		insertAfter(tag, newDIV);

		if (gup('r1') != '') {
			var tmp = new Array();

			for (var i = 1; i < 5; i++) {
				if (! (p = parseInt(gup('r' + i)))) {
					p = 0
				}
				tmp[i - 1] = p;
			}

			if (getcookies('_berechnemode_', 0) > 0) {
				calculateRest(tmp);
			} else {
				berechneRessis2(tmp);
			}
		}
	}

	function insertRessiLink(r, elt) {
		// fuegt einen Link ein
		newIMG = elem('IMG');
		newIMG.src = '/img/un/r/' + r + '.gif';
		elt.appendChild(newIMG);

		var setupLink = elem('A');
		setupLink.innerHTML = ' ' + T('re' + r) + '';
		setupLink.setAttribute("href", 'javascript:void(0);');
		setupLink.className = 'truppenlink';
		setupLink.addEventListener("click",
		function() {
			if (r > 4) {
				setRessis2(r - 1, summe['now_sum']);
			} else {
				setRessis(r - 1, summe['now_sum']);
			}
		},
		false);
		elt.appendChild(setupLink);

		newBR = elem('BR');
		elt.appendChild(newBR);
	}

	function setRessis(r) {
		// verteilt die ressis entsprechend des geforderten rohstoffes
		var tmp = new Array;

		for (var i = 0; i < 4; i++) {
			if (i == r) {
				if (i < 3) {
					tmp[i] = kleinster(summe['full_data'][0], summe['now_sum']);
				}
				else {
					tmp[i] = kleinster(summe['full_data'][3], summe['now_sum']);
				}
			}
			else {
				tmp[i] = 0;
			}
		}
		calculateRest(tmp);
	}

	function setRessis2(r) {
		// verteilt die ressis entsprechend des geforderten rohstoffes
		var tmp = new Array;

		for (var i = 0; i < 4; i++) {
			if (i != 3) {
				tmp[i] = kleinster(summe['full_data'][0], Math.floor(summe['now_sum']/3));
			}
			else {
				tmp[i] = 0;
			}
		}
		calculateRest(tmp);
	}

	function einfuegen() {
		var a;

		switch (volk) {
			case 2:
				a = 21;
				break;
			case 3:
				a = 11;
				break;
			default:
				a = 1;
		}

		newTD = elem('TD');
		newTD.vAlign = 'top';
		newTD.width = '40%';
		newTR.appendChild(newTD);

		newB = elem('B', T(volkK[volk]));
		newTD.appendChild(newB);

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (j = 0; j < 3; j++) {
			insertTruppenLink(volkK[volk], j, newTD, j + a);
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (j = 3; j < 6; j++) {
			insertTruppenLink(volkK[volk], j, newTD, j + a);
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (j = 6; j < 10; j++) {
			insertTruppenLink(volkK[volk], j, newTD, j + a);
		}

		newTD = elem('TD');
		newTD.width = '40%';
		newTD.vAlign = 'top';
		newTR.appendChild(newTD);

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (j = 10; j < 13; j++) {
			insertTruppenLink(volkK[volk], j, newTD, j - 10 + a);
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (j = 13; j < 16; j++) {
			insertTruppenLink(volkK[volk], j, newTD, j - 10 + a);
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);

		for (j = 0; j < 2; j++) {
			insertTruppenLink2('party', j, newTD, j + 1);
		}

		newBR = elem('BR');
		newTD.appendChild(newBR);
		insertCustomerLink(newTD);
	}

	function insertTruppenLink(v, nr, elt, addy) {
		// fuegt einen Link ein
		var setupLink = elem('A', '<nobr> (' + berechneAnzahl(v, nr) + ') ' + einheit[v][nr][0] + '</nobr>');
		setupLink.setAttribute("href", 'javascript:void(0);');
		setupLink.className = 'truppenlink';
		setupLink.title = summe['now_sum'];
		setupLink.addEventListener("click",
		function() {
			berechneRessis(v, nr);
		},
		false);

		newIMG = elem('IMG');
		newIMG.src = 'http://help.travian.de/images/troops/tid' + parseInt(addy) + '.gif';

		newBR = elem('BR');

		elt.appendChild(newIMG);
		elt.appendChild(setupLink);
		elt.appendChild(newBR);

		var newRow = elem('span', "<input style=\"width: 90%\" size=\"2\" maxlengt=\"6\" type=\"text\" id=\"number_" + nr + "\" value=\"0\" class=\"fm\">");
		elt.appendChild(newRow);
		elt.appendChild(newBR);
	}

	function img(ref, lang_dependant){ return (!lang_dependant ? pack_grafico + "img/un/" + ref : pack_grafico + "img/" + idioma + '/' + ref); }

	function insertTruppenLink2(v, nr, elt, addy) {
		// fuegt einen Link ein
		var setupLink = elem('A', '<nobr> (' + berechneAnzahl(v, nr) + ') ' + einheit[v][nr][0] + '</nobr>');
		setupLink.setAttribute("href", 'javascript:void(0);');
		setupLink.className = 'truppenlink';
		setupLink.title = summe['now_sum'];
		setupLink.addEventListener("click",
		function() {
			berechneRessis(v, nr);
		},
		false);

		newIMG = elem('IMG');
		newIMG.src = img('a/b'+addy+'.gif');

		newBR = elem('BR');

		elt.appendChild(newIMG);
		elt.appendChild(setupLink);
		elt.appendChild(newBR);

		var newRow = elem('span', "<input style=\"width: 90%\" size=\"2\" maxlengt=\"6\" type=\"text\" id=\"number_" + nr + "\" value=\"0\" class=\"fm\">");
		elt.appendChild(newRow);
		elt.appendChild(newBR);
	}

	function insertCustomerLink(elt) {
		var setupLink = elem('A', '<nobr> ('+T('customertotal')+') </nobr>');
		setupLink.setAttribute("href", 'javascript:void(0);');
		setupLink.className = 'customerLink';
		setupLink.title = summe['now_sum'];
		setupLink.addEventListener("click",
		function() {
			berechneRessis3();
		},
		false);

		newBR = elem('BR');
		elt.appendChild(setupLink);
		elt.appendChild(newBR);
	}

	function insertCustomerLink2(elt) {
		var setupLink = elem('A', '<nobr> ('+T('berechneressis')+') </nobr>');
		setupLink.setAttribute("href", 'javascript:void(0);');
		setupLink.className = 'customerLink';
		setupLink.title = summe['now_sum'];
		setupLink.addEventListener("click",
		function() {
			berechneRessis4();
		},
		false);

		newBR = elem('BR');
		elt.appendChild(setupLink);
		elt.appendChild(newBR);
	}

	function insertRessis(r, elt) {
		newIMG = elem('IMG');
		newIMG.src = '/img/un/r/' + r + '.gif';
		elt.appendChild(newIMG);


		newB = elem('B', T('re' + r));
		elt.appendChild(newB);
		elt.appendChild(newBR);

		var p = 0;

		if (! (p = parseInt(gup('r' + r)))) {
			p = 0;
		}

		var newRow = elem('span', "<input style=\"width: 90%\" size=\"2\" maxlengt=\"7\" type=\"text\" id=\"ressis_" + r + "\" value=\""+p+"\" class=\"fm\">");
		elt.appendChild(newRow);
		elt.appendChild(newBR);

	}

	function berechneRessis(v, nr) {
		var resObj = $names("m2[]");
		var tmp = new Array;
		anzahl = berechneAnzahl(v, nr);
		if (anzahl > 0) {
			for (var i = 0; i < 4; i++) {
				tmp[i] = anzahl * einheit[v][nr][i + 1]
			}
			calculateRest(tmp);
		}
	}

	function berechneAnzahl2(v) {
		var anzahl;

		nr = arrayToInt(v);

		anzahl = (summe['now_sum'] / nr);
		for (var i = 0; i < 4; i++) {
			if ((anzahl * v[i]) > summe['full_data'][i]) {
				anzahl = summe['full_data'][i] / v[i];
			}
		}
		anzahl = Math.floor(anzahl);
		return anzahl
	}

	function berechneRessis2(v) {
		var resObj = $names("m2[]");
		var tmp = new Array;
		anzahl = berechneAnzahl2(v);
		if (anzahl > 0) {
			for (var i = 0; i < 4; i++) {
				tmp[i] = anzahl * v[i];
			}
			calculateRest(tmp);
		}
	}

	function berechneRessis3() {

		var total = new Array(4);
		total[0] = 0;
		total[1] = 0;
		total[2] = 0;
		total[3] = 0;
		for (var num = 0; num <= 15; num++) {
			var ta = $('number_' + num);

			if(ta && ta.value > 0) {
				total[0] += ta.value * einheit[volkK[volk]][num][1];
				total[1] += ta.value * einheit[volkK[volk]][num][2];
				total[2] += ta.value * einheit[volkK[volk]][num][3];
				total[3] += ta.value * einheit[volkK[volk]][num][4];
			}
		}

		for(var r = 1; r <=4; r++) {
			$('ressis_' + r).value = total[r-1];
		}
	}

	function berechneRessis4() {

		var tmp = new Array();

		for (var i = 1; i < 5; i++) {
			var p = 0;

			if (! (p = parseInt($('ressis_' + i).value))) {
				p = 0;
			}
			tmp[i - 1] = p;
		}

		if (getcookies('_berechnemode_', 0) > 0) {
			calculateRest(tmp);
		} else {
			berechneRessis2(tmp);
		}
	}

	function calculateRest(tmp) {
		var resObj = $names("m2[]");
		var rest = summe['now_sum'];

		// restliche Ressis ermitteln
		for (var i = 0; i < resObj.length; i++) {
			rest -= tmp[i];

		}
		// restliche Ressis verteilen
		while (rest > 0) {
			for (var i = 0; ((i < 4) && (rest > 0)); i++) {
				if (tmp[i] < summe['full_data'][i]) {
					tmp[i] += 1;
					rest -= 1;
				}
			}
		}
		for (var i = 0; i < 4; i++) {
			// eintragen
			resObj[i].value = tmp[i];
			// differenz ermitteln, ggf. vorzeichen + hinzufuegen
			dif = tmp[i] - parseInt($("org" + i).innerHTML);
			if (dif > 0) newHTML = "+" + dif;
			$("diff" + i).innerHTML = dif;
		}
		$("newsum").innerHTML = summe['now_sum'];
		$("remain").innerHTML = 0;
		$("submitText").innerHTML = "";
		$("submitButton").style.display = "block";
	}

	function berechneAnzahl(v, nr) {
		var anzahl;
		anzahl = (summe['now_sum'] / einheit[v][nr][5]);
		for (var i = 0; i < 4; i++) {
			if ((anzahl * einheit[v][nr][i + 1]) > summe['full_data'][i]) {
				anzahl = summe['full_data'][i] / einheit[v][nr][i + 1];
			}
		}
		anzahl = Math.floor(anzahl);
		return anzahl
	}

	function insertBack() {
		if (unsafeWindow.carry) {
			return false
		}
		var tag = find("//div[@id='lmid2']//p");
		if (tag) {
			var newA = elem('A', '[<<]', 'done', 1);
			newA.href = 'javascript:history.go(-2);';

			tag.parentNode.appendChild(newA);
		}
	}

	function arrayToInt(a){
		var h = 0;
		for(var i in a){ h += parseInt(a[i]); }
		return h;
	}

	function ressisAuslesen() {
		summe['now_data']	= Array();
		summe['now_sum']	= 0;

		summe['full_data']	= Array();
		summe['full_sum']	= 0;

		var j = 0;

		for (var i = 4; i > 0; i--) {
			b = $('l' + i);

			var perc1 = parseInt(b.innerHTML.split("/")[0]);
			var perc2 = parseInt(b.innerHTML.split("/")[1]);

			summe['now_data'][j]	= perc1;
			summe['now_sum']		+= perc1;

			summe['full_data'][j]	= perc2;
			summe['full_sum']		+= perc2;

			j++;
		}

		summe['res_data']	= Array();
		summe['res_sum']	= 0;

		var tablas = find("//div[@id='lmid2']//table[@class='f10' and not(@width)]", XPList);

		if (tablas.snapshotLength) {
			for(var j = tablas.snapshotLength - 1; j >= 0; j--) {
				var tabla = tablas.snapshotItem(j);
				var celda = tabla.rows[0].firstChild;
				var recursos = celda.textContent.split("|").splice(0, 4);

				if(recursos.length != 4) continue;

				for (var i = 0; i < recursos.length; i++){
					summe['res_data'][i] = parseInt(recursos[i]);
				}

//				summe['res_data']	= recursos;
				summe['res_sum']	= arrayToInt(recursos);
				if (summe['res_sum']) break;
			}

			var tag = find("//div[@id='lmid2']//table[@class='f10' and not(@width)]//img[@class='clock']");

			if (tag && summe['res_sum']) {

				var d = (summe['now_sum'] - summe['res_sum']);
				var newA;

				if (d >= 0) {
					for (i=0; i<4; i++) {
						if (0 > (summe['now_data'][i] - summe['res_data'][i])) {

							newA = elem('A', T('npc') + '(' + d + ')', 'done', 1);
							newA.href = 'build.php?gid=17&t=3&r1=' + summe['res_data'][0] + '&r2=' + summe['res_data'][1] + '&r3=' + summe['res_data'][2] + '&r4=' + summe['res_data'][3];

							break;
						}
					}
				} else {
					newA = textelem('NPC: ' + d);
				}

				if (newA){
					var newTR = elem('TR');
					var newTD = elem('TD', '', 'class', 'c');

					newTD.appendChild(newA);
					newTR.appendChild(newTD);

					insertAfter(tag.parentNode.parentNode, newTR);
				}
			}
		}

//		alert(summe['now_sum'] + ' : ' + summe['res_sum']);
	}

	function chk_volk () {
		volk = 0;

		if (selfurl.match(/spieler\.php(\?uid=(\d+))?$/i)) {
			var a = RegExp.$2;

			if (a == '' || a == uid) {
				ermittlevolkAusProfil(a);
			}
		} else {
			volk = getcookies('_volk_', 0);

			if (volk == 0 && !script_stop) {
				script_stop = 1;
				document.location.href = document.location.protocol + document.location.hostname + '/spieler.php'
			}
		}

		volk = parseInt(volk);
	}

	function ermittlevolkAusProfil(d) {
		var tag = find("//div[@id='lmid2']//table[@class='tbg']//td[@class='rbg']");

		if (contains(tag.textContent, ' ' +  spieler) || d == uid || d == '') {
			volk = 0;

			var trs = find("//div[@id='lmid2']//table[@class='tbg']//tr[@class='s7']/td[2]", XPList);

			if (!trs.snapshotLength) {
				script_stop = 1;
				return;
			}

			for (var i = 0; i<trs.snapshotLength; i++) {

				if (volk) {
					setcookie('_volk_', volk);
					return;
				}

				switch (trs.snapshotItem(i).textContent) {
					case localStr['ga_']:
						volk = 2;
						break;
					case localStr['ge_']:
						volk = 3;
						break;
					case localStr['ro_']:
						volk = 1;
						break;
					default:
				}
			}
		}

		script_stop = 1;
	}
	function fixcookiesname(name) {
		var cookiepre = document.domain ? document.domain: window.location.hostname;
		return cookiepre + '_' + spieler + '_' + name;
	}
	function getcookies(name, defaultVal) {
		name = fixcookiesname(name);
		if (typeof GM_getValue == 'undefined') {
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return defaultVal;
		} else return decodeURI(GM_getValue(name, defaultVal));
	}
	function setcookie(name, value, days) {
		name = fixcookiesname(name);
		if (typeof GM_setValue == "undefined") {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		} else GM_setValue(name, encodeURI(value));
	}
	function setOption(key, value) {
		var options = getcookies("options");
		if (options != '') options = options.split(",");
		else options = [];
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			options.push(key);
			options.push(encodeURIComponent(value));
		} else {
			options[myOption + 1] = encodeURIComponent(value);
		}
		options.join(",");
		setcookie("options", options);
	}
	function getOption(key, defaultValue, type) {
		var options = getcookies('options');
		options = options.split(",");
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			return defaultValue;
		}
		switch (type) {
		case "boolean":
			var myOption = (options[myOption + 1] == "true" || options[myOption + 1] == "1") ? true: false;
			break;
		case "integer":
			var myOption = parseInt(options[myOption + 1]);
			break;
		case "string":
		default:
			var myOption = decodeURIComponent(options[myOption + 1]);
			break;
		}
		return myOption;
	}
	function eatcookie(name) {
		setcookie(name, '', -1);
	}
	function t(key) {
		return T(key);
	}
	function T(key) {
		return localStr[key] ? localStr[key] : '!' + key + '!';
	}
	function generiereNPCLink() {
		var a = elem('A', T('npc'), 'href', 'build.php?gid=17&t=3');
		var tag = find("//a[contains(@href, '?chatname')]");
		if (!tag) {
			tag = find("//td[@class='menu']/a[contains(@href, 'plus.php')]");
			insertBefore(tag, a);
		} else {
			insertAfter(tag, a);
		}
	}

	function kleinster(a, b) {
		if (a < b) {
			return a;
		} else {
			return b;
		};
	}

	function seite_parameter() {
		var idx = selfurl.indexOf(fragezeichen);
		if (idx == -1) {
			return ''
		} else {
			return selfurl.substr(idx + 1);
		}
	}

	function leseSpielerNamen() {
		uid = 0;
		var tag = find("//td[@class='menu']/a[contains(@href, 'spieler.php?uid=')]");
		if (tag.href.search(/spieler\.php\?uid\=(\d+)$/i)) {
			var a = parseInt(RegExp.$1);
			uid = a;
		}
		var tag = find("//a[contains(@href, '?chatname')]");
		if (tag.href.search(/\?chatname\=[^\|].+?\|(.+?)$/ig)) {
			a = RegExp.$1;
			spieler = decodeURIComponent(a);
		}
//		if (uid == spieler) {
//			script_stop = 1;
//		}
	}

	function gup(name) {
		//		extrahiert den Parameter 'name' aus einer URL
		//		www.beispiel.de ? test = gelungen
		//		gup('test') liefert 'gelungen'
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(selfurl);
		if (results == null) return "";
		else return results[1];
	}

	function contains(a, b) {
		return (a.indexOf(b) != -1)
	}

	function $(id) {
		return document.getElementById(id);
	}

	function $names(name, doc) {
		if (!doc) var doc = document;
		return doc.getElementsByName(name);
	}

	function $tags(tag, doc) {
		if (!doc) var doc = document;
		return doc.getElementsByTagName(tag);
	}

	function find(xpath, xpres, startnode, doc) {
		if (!startnode) {
			startnode = document;
		}
		doc = doc != null ? doc: document;

		xpres = xpres ? xpres: XPFirst;

		var ret = doc.evaluate(xpath, startnode, null, xpres, null);
		return xpres == XPFirst ? ret.singleNodeValue: ret;
	}

	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	function insertBefore(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node);
	}

	function textelem(s) {
		return document.createTextNode(s);
	}

	function elem(tag, content, idt, idv, class) {
		var ret = document.createElement(tag);
		if (content) ret.innerHTML = content;
		if (idt) {
			if (typeof idt != 'array') {
				ret.setAttribute(idt, idv);
			} else {
				for (a in idt)
				ret.setAttribute(a, idt[a]);
			}
		}

		if (idv && typeof idv == 'array') {
			for (a in style)
			ret.style[a] = style[a];
		}

		if (class) ret.className = class;

		return ret;
	}

	function isInt(x) {
		var y = parseInt(x);
		if (isNaN(y)) {
			return false;
		}
		return x == y && x.toString() == y.toString();
	}

	function einheitenFestlegen() {
		var v = volkK[1];
		// Roemer
		einheit[v] = new Array();
		einheit[v][0] = new Array(localStr['ro0'], 120, 100, 180, 40, 440);
		einheit[v][1] = new Array(localStr['ro1'], 100, 130, 160, 70, 460);
		einheit[v][2] = new Array(localStr['ro2'], 150, 160, 210, 80, 600);
		einheit[v][3] = new Array(localStr['ro3'], 140, 160, 20, 40, 360);
		einheit[v][4] = new Array(localStr['ro4'], 550, 440, 320, 100, 1410);

		einheit[v][5] = new Array(localStr['ro5'], 550, 640, 800, 180, 2170);
		einheit[v][6] = new Array(localStr['ro6'], 900, 360, 500, 70, 1830);
		einheit[v][7] = new Array(localStr['ro7'], 950, 1350, 600, 90, 2990);
		einheit[v][8] = new Array(localStr['ro8'], 30750, 27200, 45000, 37500, 140450);
		einheit[v][9] = new Array(localStr['ro9'], 5800, 5300, 7200, 5500, 23800);
		einheit[v][10] = new Array(localStr['ro10'], 360, 300, 540, 120, 1320);
		einheit[v][11] = new Array(localStr['ro11'], 300, 390, 480, 210, 1380);
		einheit[v][12] = new Array(localStr['ro12'], 450, 480, 630, 240, 1800);
		einheit[v][13] = new Array(localStr['ro13'], 420, 480, 60, 120, 1080);
		einheit[v][14] = new Array(localStr['ro14'], 1650, 1320, 960, 300, 4230);
		einheit[v][15] = new Array(localStr['ro15'], 1650, 1920, 2400, 540, 6510);

		var v = volkK[2];
		// Gallier
		einheit[v] = new Array();
		einheit[v][0] = new Array(localStr['ga0'], 100, 130, 55, 30, 315);
		einheit[v][1] = new Array(localStr['ga1'], 140, 150, 185, 60, 535);
		einheit[v][2] = new Array(localStr['ga2'], 170, 150, 20, 40, 380);
		einheit[v][3] = new Array(localStr['ga3'], 350, 450, 230, 60, 1090);
		einheit[v][4] = new Array(localStr['ga4'], 360, 330, 280, 120, 1090);
		einheit[v][5] = new Array(localStr['ga5'], 500, 620, 675, 170, 1965);
		einheit[v][6] = new Array(localStr['ga6'], 950, 555, 330, 75, 1910);
		einheit[v][7] = new Array(localStr['ga7'], 960, 1450, 630, 90, 3130);
		einheit[v][8] = new Array(localStr['ga8'], 30750, 45400, 31000, 37500, 144650);
		einheit[v][9] = new Array(localStr['ga9'], 5500, 7000, 5300, 4900, 22700);
		einheit[v][10] = new Array(localStr['ga10'], 300, 390, 165, 90, 945);
		einheit[v][11] = new Array(localStr['ga11'], 420, 450, 555, 180, 1605);
		einheit[v][12] = new Array(localStr['ga12'], 510, 450, 60, 120, 3270);
		einheit[v][13] = new Array(localStr['ga13'], 1050, 1350, 690, 180, 3270);
		einheit[v][14] = new Array(localStr['ga14'], 1080, 990, 840, 360, 5895);
		einheit[v][15] = new Array(localStr['ga15'], 1500, 1860, 2025, 510, 5895);
		var v = volkK[3];
		// Germanen
		einheit[v] = new Array();
		einheit[v][0] = new Array(localStr['ge0'], 95, 75, 40, 40, 250);
		einheit[v][1] = new Array(localStr['ge1'], 145, 70, 85, 40, 340);
		einheit[v][2] = new Array(localStr['ge2'], 130, 120, 170, 70, 490);
		einheit[v][3] = new Array(localStr['ge3'], 160, 100, 50, 50, 360);
		einheit[v][4] = new Array(localStr['ge4'], 370, 270, 290, 75, 1005);
		einheit[v][5] = new Array(localStr['ge5'], 450, 515, 480, 80, 1525);
		einheit[v][6] = new Array(localStr['ge6'], 1000, 300, 350, 70, 1720);
		einheit[v][7] = new Array(localStr['ge7'], 900, 1200, 600, 60, 2760);
		einheit[v][8] = new Array(localStr['ge8'], 35500, 26600, 25000, 27200, 114300);
		einheit[v][9] = new Array(localStr['ge9'], 7200, 5500, 5800, 6500, 25000);
		einheit[v][10] = new Array(localStr['ge10'], 285, 225, 120, 120, 750);
		einheit[v][11] = new Array(localStr['ge11'], 425, 210, 255, 120, 1020);
		einheit[v][12] = new Array(localStr['ge12'], 390, 360, 510, 210, 1470);
		einheit[v][13] = new Array(localStr['ge13'], 480, 300, 150, 150, 1080);
		einheit[v][14] = new Array(localStr['ge14'], 1110, 810, 870, 225, 3015);
		einheit[v][15] = new Array(localStr['ge15'], 1350, 1545, 1440, 240, 4575);


		var v = 'party';
		einheit[v] = new Array();
		einheit[v][0] = new Array(localStr['party0'], 6400, 6650, 5940, 1340, 20330);
		einheit[v][1] = new Array(localStr['party1'], 29700, 33250, 32000, 6700, 99850);
	}

	function getlocalStr() {
		var idioma;
		var xtemp = find("//img[contains(@src, 'plus.gif')]", XPFirst);

		if (xtemp) {
			xtemp.src.search(/\/img\/([^\/]+)\//);
			idioma = RegExp.$1;
		} else {
			idioma = 'tw';
		}

		switch (idioma) {
//			case 'tw':
//			case 'hk':
//				localStr['npc'] = 'NPC';
//
//				localStr['res'] = '\u8CC7\u6E90';
//				localStr['re1'] = '\u6728\u6750';
//				localStr['re2'] = '\u78DA\u584A';
//				localStr['re3'] = '\u92FC\u9435';
//				localStr['re4'] = '\u7A40\u7269';
//
//				localStr['ro_'] = '羅馬人';
//				localStr['ro0'] = '\u53E4\u7F85\u99AC\u6B65\u5175';
//				localStr['ro1'] = '\u7981\u885B\u5175';
//				localStr['ro2'] = '\u5E1D\u570B\u5175';
//				localStr['ro3'] = '\u4F7F\u8005\u9A0E\u58EB';
//				localStr['ro4'] = '\u5E1D\u570B\u9A0E\u58EB';
//				localStr['ro5'] = '\u5C07\u8ECD\u9A0E\u58EB';
//				localStr['ro6'] = '\u885D\u649E\u8ECA';
//				localStr['ro7'] = '\u706B\u7130\u6295\u77F3\u6A5F';
//				localStr['ro8'] = '\u53C3\u8B70\u54E1';
//				localStr['ro9'] = '\u958B\u62D3\u8005';
//
//				localStr['ga_'] = '高盧人';
//				localStr['ga0'] = '\u65B9\u9663\u5175';
//				localStr['ga1'] = '\u528D\u58EB';
//				localStr['ga2'] = '\u63A2\u8DEF\u8005';
//				localStr['ga3'] = '\u96F7\u6CD5\u5E2B';
//				localStr['ga4'] = '\u5FB7\u9B6F\u4F0A\u9A0E\u5175';
//				localStr['ga5'] = '\u6D77\u9813\u8056\u9A0E';
//				localStr['ga6'] = '\u885D\u649E\u8ECA';
//				localStr['ga7'] = '\u6295\u77F3\u6A5F';
//				localStr['ga8'] = '\u65CF\u9577';
//				localStr['ga9'] = '\u958B\u62D3\u8005';
//
//				localStr['ge_'] = '條頓人';
//				localStr['ge0'] = '\u68CD\u68D2\u5175';
//				localStr['ge1'] = '\u77DB\u5175';
//				localStr['ge2'] = '\u65A7\u982D\u5175';
//				localStr['ge3'] = '\u5075\u5BDF\u5175';
//				localStr['ge4'] = '\u4FE0\u5BA2';
//				localStr['ge5'] = '\u689D\u9813\u9A0E\u58EB';
//				localStr['ge6'] = '\u885D\u649E\u8ECA';
//				localStr['ge7'] = '\u6295\u77F3\u6A5F';
//				localStr['ge8'] = '\u53F8\u4EE4\u5B98';
//				localStr['ge9'] = '\u958B\u62D3\u8005';
//
//				break;
			case 'ae':
				localStr['npc'] = 'NPC';

				localStr['res'] = '\u0627\u0644\u0627\u0646\u062A\u0627\u062C';
				localStr['re1'] = '\u0627\u0644\u062E\u0634\u0628';
				localStr['re2'] = '\u0627\u0644\u0637\u064A\u0646';
				localStr['re3'] = '\u0627\u0644\u062D\u062F\u064A\u062F';
				localStr['re4'] = '\u0627\u0644\u0642\u0645\u062D';

				localStr['ro_'] = '\u0627\u0644\u0631\u0648\u0645\u0627\u0646';
				localStr['ro0'] = '\u062C\u0646\u062F\u064A \u0623\u0648\u0644';
				localStr['ro1'] = '\u062D\u0631\u0627\u0633 \u0627\u0644\u0623\u0645\u0628\u0631\u0627\u0637\u0648\u0631';
				localStr['ro2'] = '\u062C\u0646\u062F\u064A \u0645\u0647\u0627\u062C\u0645';
				localStr['ro3'] = '\u0641\u0631\u0642\u0629 \u062A\u062C\u0633\u0633';
				localStr['ro4'] = '\u0633\u0644\u0627\u062D \u0627\u0644\u0641\u0631\u0633\u0627\u0646';
				localStr['ro5'] = '\u0641\u0631\u0633\u0627\u0646 \u0642\u064A\u0635\u0631';
				localStr['ro6'] = '\u0643\u0628\u0634';
				localStr['ro7'] = '\u0627\u0644\u0645\u0642\u0644\u0627\u0639 \u0627\u0644\u0646\u0627\u0631\u064A';
				localStr['ro8'] = '\u062D\u0643\u064A\u0645';
				localStr['ro9'] = '\u0645\u0633\u062A\u0648\u0637\u0646';

				localStr['ga_'] = '\u0627\u0644\u0627\u063A\u0631\u064A\u0642';
				localStr['ga0'] = '\u0627\u0644\u0643\u062A\u064A\u0628\u0647';
				localStr['ga1'] = '\u0645\u0628\u0627\u0631\u0632';
				localStr['ga2'] = '\u0627\u0644\u0645\u0633\u062A\u0643\u0634\u0641';
				localStr['ga3'] = '\u0631\u0639\u062F \u0627\u0644\u062C\u0631\u0645\u0627\u0646';
				localStr['ga4'] = '\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0633\u0644\u062A';
				localStr['ga5'] = '\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0647\u064A\u062F\u0648\u0627\u0646\u0631';
				localStr['ga6'] = '\u0645\u062D\u0637\u0645\u0629 \u0627\u0644\u0627\u0628\u0648\u0627\u0628 \u0627\u0644\u062E\u0634\u0628\u064A\u0629';
				localStr['ga7'] = '\u0627\u0644\u0645\u0642\u0644\u0627\u0639 \u0627\u0644\u062D\u0631\u0628\u064A';
				localStr['ga8'] = '\u0631\u0626\u064A\u0633';
				localStr['ga9'] = '\u0645\u0633\u062A\u0648\u0637\u0646';

				localStr['ge_'] = '\u0627\u0644\u062C\u0631\u0645\u0627\u0646';
				localStr['ge0'] = '\u0645\u0642\u0627\u062A\u0644 \u0628\u0647\u0631\u0627\u0648\u0629';
				localStr['ge1'] = '\u0645\u0642\u0627\u062A\u0644 \u0628\u0631\u0645\u062D';
				localStr['ge2'] = '\u0645\u0642\u0627\u062A\u0644 \u0628\u0641\u0623\u0633';
				localStr['ge3'] = '\u0627\u0644\u0643\u0634\u0627\u0641';
				localStr['ge4'] = '\u0645\u0642\u0627\u062A\u0644 \u0627\u0644\u0642\u064A\u0635\u0631';
				localStr['ge5'] = '\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u062C\u0631\u0645\u0627\u0646';
				localStr['ge6'] = '\u0645\u062D\u0637\u0645\u0629 \u0627\u0644\u0627\u0628\u0648\u0627\u0628';
				localStr['ge7'] = '\u0627\u0644\u0645\u0642\u0644\u0627\u0639';
				localStr['ge8'] = '\u0627\u0644\u0632\u0639\u064A\u0645';
				localStr['ge9'] = '\u0645\u0633\u062A\u0648\u0637\u0646';

				break;
			case 'org':
			case 'de':
			case 'at':
				localStr['npc'] = 'NPC-H\u00E4ndler';

				localStr['res'] = 'Rohstoffe';
				localStr['re1'] = 'Holz';
				localStr['re2'] = 'Lehm';
				localStr['re3'] = 'Eisen';
				localStr['re4'] = 'Getreide';

				localStr['ro_'] = 'R\u00F6mer';
				localStr['ro0'] = 'Legion\u00E4r';
				localStr['ro1'] = 'Pr\u00E4torianer';
				localStr['ro2'] = 'Imperianer';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ramme';
				localStr['ro7'] = 'Feuerkatapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Siedler';

				localStr['ga_'] = 'Gallier';
				localStr['ga0'] = 'Phalanx';
				localStr['ga1'] = 'Schwertk\u00E4mpfer';
				localStr['ga2'] = 'Sp\u00E4her';
				localStr['ga3'] = 'Theutates Blitz';
				localStr['ga4'] = 'Druidenreiter';
				localStr['ga5'] = 'Haeduaner';
				localStr['ga6'] = 'Ramme';
				localStr['ga7'] = 'Kriegskatapult';
				localStr['ga8'] = 'H\u00E4uptling';
				localStr['ga9'] = 'Siedler';

				localStr['ge_'] = 'Germanen';
				localStr['ge0'] = 'Keulenschwinger';
				localStr['ge1'] = 'Speerk\u00E4mpfer';
				localStr['ge2'] = 'Axtk\u00E4mpfer';
				localStr['ge3'] = 'Kundschafter';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teutonenreiter';
				localStr['ge6'] = 'Ramme';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Stammesf\u00FChrer';
				localStr['ge9'] = 'Siedler';

				break;
			case 'ba':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Rimljani';
				localStr['ro0'] = 'Legionar';
				localStr['ro1'] = 'Pretorijanac';
				localStr['ro2'] = 'Imperijanac';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ratni ovan';
				localStr['ro7'] = 'Vatreni katapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Naseljenik';

				localStr['ga_'] = 'Gali';
				localStr['ga0'] = 'Falanga';
				localStr['ga1'] = 'Ma\u010Devalac';
				localStr['ga2'] = 'Izvi\u0111a\u010D';
				localStr['ga3'] = 'Teutateov grom';
				localStr['ga4'] = 'Druidski jaha\u010D';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Ovan';
				localStr['ga7'] = 'Katapult';
				localStr['ga8'] = 'Starje\u0161ina';
				localStr['ga9'] = 'Naseljenik';

				localStr['ge_'] = 'Teutonci';
				localStr['ge0'] = 'Batinar';
				localStr['ge1'] = 'Kopljanik';
				localStr['ge2'] = 'Borac sa sjekirom';
				localStr['ge3'] = 'Izvi\u0111a\u010D';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teutonski Vitez';
				localStr['ge6'] = 'Ovan';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Poglavica';
				localStr['ge9'] = 'Naseljenik';

				break;
			case 'bg':
				localStr = new Array()

				localStr['npc'] = 'NPC \u0442\u044A\u0440\u0433\u043E\u0432\u0435\u0446';

				localStr['res'] = '\u0420\u0435\u0441\u0443\u0440\u0441\u0438';
				localStr['re1'] = '\u0414\u044A\u0440\u0432\u0435\u0441\u0438\u043D\u0430';
				localStr['re2'] = '\u0413\u043B\u0438\u043D\u0430';
				localStr['re3'] = '\u0416\u0435\u043B\u044F\u0437\u043E';
				localStr['re4'] = '\u0416\u0438\u0442\u043E';

				localStr['ro_'] = '\u0420\u0438\u043C\u043B\u044F\u043D\u0438';
				localStr['ro0'] = '\u041B\u0435\u0433\u0438\u043E\u043D\u0435\u0440';
				localStr['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0438\u0430\u043D\u0435\u0446';
				localStr['ro2'] = '\u0418\u043C\u0435\u043F\u0435\u0440\u0438\u0430\u043D';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = '\u0421\u0442\u0435\u043D\u043E\u0431\u043E\u0439\u043D\u043E \u041E\u0440\u044A\u0434\u0438\u0435';
				localStr['ro7'] = '\u041E\u0433\u043D\u0435\u043D \u043A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
				localStr['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
				localStr['ro9'] = '\u0417\u0430\u0441\u0435\u043B\u043D\u0438\u043A';

				localStr['ge_'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0446\u0438';
				localStr['ge0'] = '\u0411\u043E\u0435\u0446 \u0441 \u0431\u043E\u0437\u0434\u0443\u0433\u0430\u043D';
				localStr['ge1'] = '\u041A\u043E\u043F\u0438\u0435\u043D\u043E\u0441\u0435\u0446';
				localStr['ge2'] = '\u0411\u043E\u0435\u0446 \u0441 \u0431\u0440\u0430\u0434\u0432\u0430';
				localStr['ge3'] = '\u0421\u044A\u0433\u043B\u0435\u0434\u0432\u0430\u0447';
				localStr['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
				localStr['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u043A\u0438 \u0440\u0438\u0446\u0430\u0440';
				localStr['ge6'] = '\u0422\u0430\u0440\u0430\u043D';
				localStr['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
				localStr['ge8'] = '\u041F\u0440\u0435\u0434\u0432\u043E\u0434\u0438\u0442\u0435\u043B';
				localStr['ge9'] = '\u0417\u0430\u0441\u0435\u043B\u043D\u0438\u043A';

				localStr['ga_'] = '\u0413\u0430\u043B\u0438';
				localStr['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
				localStr['ga1'] = '\u041C\u0435\u0447\u043E\u043D\u043E\u0441\u0435\u0446';
				localStr['ga2'] = '\u0421\u043B\u0435\u0434\u043E\u0442\u044A\u0440\u0441\u0430\u0447';
				localStr['ga3'] = 'Theutates Thunder';
				localStr['ga4'] = '\u0414\u0440\u0443\u0438\u0434 \u043A\u043E\u043D\u043D\u0438\u043A';
				localStr['ga5'] = '\u0425\u0435\u0434\u0443\u0430\u043D';
				localStr['ga6'] = '\u0422\u0430\u0440\u0430\u043D';
				localStr['ga7'] = '\u0422\u0440\u0435\u0431\u0443\u0447\u0435\u0442';
				localStr['ga8'] = '\u0412\u043E\u0436\u0434';
				localStr['ga9'] = '\u0417\u0430\u0441\u0435\u043B\u043D\u0438\u043A';

				break;
			case 'cat':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romans';
				localStr['ro0'] = 'Legionari';
				localStr['ro1'] = 'Pretori\u00E0';
				localStr['ro2'] = 'Imper\u00E0';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ariet';
				localStr['ro7'] = 'Catapulta de foc';
				localStr['ro8'] = 'Senador';
				localStr['ro9'] = 'Colon';

				localStr['ga_'] = 'Gals';
				localStr['ga0'] = 'Falange';
				localStr['ga1'] = 'Lluitador d\'Espasa';
				localStr['ga2'] = 'Batedor';
				localStr['ga3'] = 'Genet Llampec';
				localStr['ga4'] = 'Genet Druida';
				localStr['ga5'] = 'Genet Edu';
				localStr['ga6'] = 'Ariet';
				localStr['ga7'] = 'Catapulta de guerra';
				localStr['ga8'] = 'Cacic';
				localStr['ga9'] = 'Colon';

				localStr['ge_'] = 'Germ\u00E0nics';
				localStr['ge0'] = 'Lluitador de Clava';
				localStr['ge1'] = 'Llancer';
				localStr['ge2'] = 'Lluitador de Destral';
				localStr['ge3'] = 'Emissari';
				localStr['ge4'] = 'Palad\u00ED';
				localStr['ge5'] = 'Genet Teut\u00F3';
				localStr['ge6'] = 'Ariet';
				localStr['ge7'] = 'Catapulta';
				localStr['ge8'] = 'Capitost';
				localStr['ge9'] = 'Colon';

				break;
			case 'cl':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romanos';
				localStr['ro0'] = 'Legionario';
				localStr['ro1'] = 'Pretoriano';
				localStr['ro2'] = 'Imperano';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ariete Romano';
				localStr['ro7'] = 'Catapulta de fuego';
				localStr['ro8'] = 'Senador';
				localStr['ro9'] = 'Colono';

				localStr['ga_'] = 'Galos';
				localStr['ga0'] = 'Falange';
				localStr['ga1'] = 'Luchador de Espada';
				localStr['ga2'] = 'Batidor';
				localStr['ga3'] = 'Trueno de Theutates';
				localStr['ga4'] = 'Jinete Druida';
				localStr['ga5'] = 'Jinete Eduo';
				localStr['ga6'] = 'Ariete';
				localStr['ga7'] = 'Catapulta de guerra';
				localStr['ga8'] = 'Cacique';
				localStr['ga9'] = 'Colono';

				localStr['ge_'] = 'Germanos';
				localStr['ge0'] = 'Luchador de Porra';
				localStr['ge1'] = 'Lancero';
				localStr['ge2'] = 'Luchador de Hacha';
				localStr['ge3'] = 'Emisario';
				localStr['ge4'] = 'Palad\u00EDn';
				localStr['ge5'] = 'Caballero Teut\u00F3n';
				localStr['ge6'] = 'Ariete';
				localStr['ge7'] = 'Catapulta';
				localStr['ge8'] = 'Cabecilla';
				localStr['ge9'] = 'Colono';

				break;
			case 'cn':
				localStr['npc'] = 'NPC';

				localStr['res'] = '\u8D44\u6E90';
				localStr['re1'] = '\u6728\u6750';
				localStr['re2'] = '\u6CE5\u571F';
				localStr['re3'] = '\u94C1\u5757';
				localStr['re4'] = '\u7CAE\u98DF';

				localStr['ro_'] = 'Romans';
				localStr['ro0'] = '\u53E4\u7F85\u99AC\u6B65\u5175';
				localStr['ro1'] = '\u7981\u885B\u5175';
				localStr['ro2'] = '\u5E1D\u570B\u5175';
				localStr['ro3'] = '\u4F7F\u8005\u9A0E\u58EB';
				localStr['ro4'] = '\u5E1D\u570B\u9A0E\u58EB';
				localStr['ro5'] = '\u5C07\u8ECD\u9A0E\u58EB';
				localStr['ro6'] = '\u885D\u649E\u8ECA';
				localStr['ro7'] = '\u706B\u7130\u6295\u77F3\u6A5F';
				localStr['ro8'] = '\u53C3\u8B70\u54E1';
				localStr['ro9'] = '\u958B\u62D3\u8005';

				localStr['ga_'] = 'Gauls';
				localStr['ga0'] = '\u65B9\u9663\u5175';
				localStr['ga1'] = '\u528D\u58EB';
				localStr['ga2'] = '\u63A2\u8DEF\u8005';
				localStr['ga3'] = '\u96F7\u6CD5\u5E2B';
				localStr['ga4'] = '\u5FB7\u9B6F\u4F0A\u9A0E\u5175';
				localStr['ga5'] = '\u6D77\u9813\u8056\u9A0E';
				localStr['ga6'] = '\u885D\u649E\u8ECA';
				localStr['ga7'] = '\u6295\u77F3\u6A5F';
				localStr['ga8'] = '\u65CF\u9577';
				localStr['ga9'] = '\u958B\u62D3\u8005';

				localStr['ge_'] = 'Teutons';
				localStr['ge0'] = '\u68CD\u68D2\u5175';
				localStr['ge1'] = '\u77DB\u5175';
				localStr['ge2'] = '\u65A7\u982D\u5175';
				localStr['ge3'] = '\u5075\u5BDF\u5175';
				localStr['ge4'] = '\u4FE0\u5BA2';
				localStr['ge5'] = '\u689D\u9813\u9A0E\u58EB';
				localStr['ge6'] = '\u885D\u649E\u8ECA';
				localStr['ge7'] = '\u6295\u77F3\u6A5F';
				localStr['ge8'] = '\u53F8\u4EE4\u5B98';
				localStr['ge9'] = '\u958B\u62D3\u8005';

				break;
			case 'com':
				localStr['npc'] = 'NPC merchant';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romans';
				localStr['ro0'] = 'Legionnaire';
				localStr['ro1'] = 'Praetorian';
				localStr['ro2'] = 'Imperian';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Battering Ram';
				localStr['ro7'] = 'Fire Catapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Settler';

				localStr['ga_'] = 'Gauls';
				localStr['ga0'] = 'Phalanx';
				localStr['ga1'] = 'Swordsman';
				localStr['ga2'] = 'Pathfinder';
				localStr['ga3'] = 'Theutates Thunder';
				localStr['ga4'] = 'Druidrider';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Ram';
				localStr['ga7'] = 'Trebuchet';
				localStr['ga8'] = 'Chiefain';
				localStr['ga9'] = 'Settler';

				localStr['ge_'] = 'Teutons';
				localStr['ge0'] = 'Clubswinger';
				localStr['ge1'] = 'Spearman';
				localStr['ge2'] = 'Axeman';
				localStr['ge3'] = 'Scout';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teutonic Knight';
				localStr['ge6'] = 'Ram';
				localStr['ge7'] = 'Catapult';
				localStr['ge8'] = 'Chieftain';
				localStr['ge9'] = 'Settler';

				break;
			case 'cz':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Suroviny';
				localStr['re1'] = 'D\u0159evo';
				localStr['re2'] = 'Hl\u00EDna';
				localStr['re3'] = '\u017Delezo';
				localStr['re4'] = 'Obil\u00ED';

				localStr['ro_'] = '\u0158\u00EDman\u00E9';
				localStr['ro0'] = 'Legion\u00E1\u0159';
				localStr['ro1'] = 'Pretori\u00E1n';
				localStr['ro2'] = 'Imperi\u00E1n';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = '\u0158\u00EDmansk\u00E9 beranidlo';
				localStr['ro7'] = 'Ohniv\u00FD katapult';
				localStr['ro8'] = 'Sen\u00E1tor';
				localStr['ro9'] = 'Osadn\u00EDk';

				localStr['ga_'] = 'Galov\u00E9';
				localStr['ga0'] = 'Falanga';
				localStr['ga1'] = '\u0160erm\u00ED\u0159';
				localStr['ga2'] = 'Sl\u00EDdi\u010D';
				localStr['ga3'] = 'Theutates Blesk';
				localStr['ga4'] = 'Druid jezdec';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'D\u0159ev\u011Bn\u00E9 beranidlo';
				localStr['ga7'] = 'V\u00E1le\u010Dn\u00FD katapult';
				localStr['ga8'] = 'N\u00E1\u010Deln\u00EDk';
				localStr['ga9'] = 'Osadn\u00EDk';

				localStr['ge_'] = 'Germ\u00E1ni';
				localStr['ge0'] = 'P\u00E1lka\u0159';
				localStr['ge1'] = 'O\u0161t\u011Bpa\u0159';
				localStr['ge2'] = 'Sekern\u00EDk';
				localStr['ge3'] = 'Zv\u011Bd';
				localStr['ge4'] = 'Ryt\u00ED\u0159';
				localStr['ge5'] = 'Teuton jezdec';
				localStr['ge6'] = 'Germ\u00E1nsk\u00E9 beranidlo';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Kmenov\u00FD v\u016Fdce';
				localStr['ge9'] = 'Osadn\u00EDk';

				break;
			case 'dk':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romere';
				localStr['ro0'] = 'Legion\u00E6r';
				localStr['ro1'] = 'Pr\u00E6torianer';
				localStr['ro2'] = 'Imperianer';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Rambuk';
				localStr['ro7'] = 'Brandkatapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Bos\u00E6tter';

				localStr['ga_'] = 'Gallere';
				localStr['ga0'] = 'Falanks';
				localStr['ga1'] = 'Sv\u00E6rdk\u00E6mper';
				localStr['ga2'] = 'Spion';
				localStr['ga3'] = 'Theutaterlyn';
				localStr['ga4'] = 'Druiderytter';
				localStr['ga5'] = 'Haeduaner';
				localStr['ga6'] = 'Rambuktr\u00E6';
				localStr['ga7'] = 'Krigskatapult';
				localStr['ga8'] = 'H\u00F8vding';
				localStr['ga9'] = 'Bos\u00E6tter';

				localStr['ge_'] = 'Germanere';
				localStr['ge0'] = 'K\u00F8llesvinger';
				localStr['ge1'] = 'Spydk\u00E6mper';
				localStr['ge2'] = '\u00D8ksek\u00E6mper';
				localStr['ge3'] = 'Spejder';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teutonrytter';
				localStr['ge6'] = 'Rambuk';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Stammef\u00F8rer';
				localStr['ge9'] = 'Bos\u00E6tter';

				break;
			case 'fi':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Roomalaiset';
				localStr['ro0'] = 'Legioonalainen';
				localStr['ro1'] = 'Pretoriaani';
				localStr['ro2'] = 'Imperiaani';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Muurinmurtaja';
				localStr['ro7'] = 'Tulikatapultti';
				localStr['ro8'] = 'Senaattori';
				localStr['ro9'] = 'Uudisasukas';

				localStr['ga_'] = 'Gallialaiset';
				localStr['ga0'] = 'Falangi';
				localStr['ga1'] = 'Miekkasoturi';
				localStr['ga2'] = 'Tunnustelija';
				localStr['ga3'] = 'Teutateen Salama';
				localStr['ga4'] = 'Druidiratsastaja';
				localStr['ga5'] = 'Haeduaani';
				localStr['ga6'] = 'Muurinmurtaja';
				localStr['ga7'] = 'Heittokone';
				localStr['ga8'] = 'Teutateen Salama';
				localStr['ga9'] = 'Uudisasukas';

				localStr['ge_'] = 'Teutonit';
				localStr['ge0'] = 'Nuijamies';
				localStr['ge1'] = 'Keih\u00E4smies';
				localStr['ge2'] = 'Kirvessoturi';
				localStr['ge3'] = 'Tiedustelija';
				localStr['ge4'] = 'Paladiini';
				localStr['ge5'] = 'Teutoniritari';
				localStr['ge6'] = 'Muurinmurtaja';
				localStr['ge7'] = 'Katapultti';
				localStr['ge8'] = 'P\u00E4\u00E4llikk\u00F6';
				localStr['ge9'] = 'Uudisasukas';

				break;
			case 'fr':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romains';
				localStr['ro0'] = 'L\u00E9gionnaire';
				localStr['ro1'] = 'Pr\u00E9torien';
				localStr['ro2'] = 'Imp\u00E9rian';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'B\u00E9lier';
				localStr['ro7'] = 'Catapulte de feu';
				localStr['ro8'] = 'S\u00E9nateur';
				localStr['ro9'] = 'Colon';

				localStr['ga_'] = 'Gaulois';
				localStr['ga0'] = 'Phalange';
				localStr['ga1'] = 'Combattant \u00E0 l\'\u00E9p\u00E9e';
				localStr['ga2'] = 'Eclaireur';
				localStr['ga3'] = 'Eclair de Toutatis';
				localStr['ga4'] = 'Cavalier druide';
				localStr['ga5'] = 'H\u00E9douin';
				localStr['ga6'] = 'B\u00E9lier';
				localStr['ga7'] = 'Catapulte de Guerre';
				localStr['ga8'] = 'Chiefain';
				localStr['ga9'] = 'Colon';

				localStr['ge_'] = 'Teutons';
				localStr['ge0'] = 'B\u00E9lier';
				localStr['ge1'] = 'Combattant \u00E0 la lance';
				localStr['ge2'] = 'Combattant \u00E0 la hache';
				localStr['ge3'] = 'Eclaireur';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Cavalier Teuton';
				localStr['ge6'] = 'B\u00E9lier';
				localStr['ge7'] = 'Catapulte';
				localStr['ge8'] = 'Chef de tribu';
				localStr['ge9'] = 'Colon';

				break;
			case 'gr':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = '\u03A1\u03C9\u03BC\u03B1\u03AF\u03BF\u03B9';
				localStr['ro0'] = '\u039B\u03B5\u03B3\u03B5\u03C9\u03BD\u03AC\u03C1\u03B9\u03BF\u03C2';
				localStr['ro1'] = '\u03A0\u03C1\u03B1\u03B9\u03C4\u03C9\u03C1\u03B9\u03B1\u03BD\u03CC\u03C2';
				localStr['ro2'] = '\u0399\u03BC\u03C0\u03B5\u03C1\u03B9\u03B1\u03BD\u03CC\u03C2';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = '\u03A0\u03BF\u03BB\u03B9\u03BF\u03C1\u03BA\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03BA\u03C1\u03B9\u03CC\u03C2';
				localStr['ro7'] = '\u039A\u03B1\u03C4\u03B1\u03C0\u03AD\u03BB\u03C4\u03B7\u03C2 \u03C6\u03C9\u03C4\u03B9\u03AC\u03C2';
				localStr['ro8'] = '\u0393\u03B5\u03C1\u03BF\u03C5\u03C3\u03B9\u03B1\u03C3\u03C4\u03AE\u03C2';
				localStr['ro9'] = '\u0386\u03C0\u03BF\u03B9\u03BA\u03BF\u03C2';

				localStr['ga_'] = '\u0393\u03B1\u03BB\u03AC\u03C4\u03B5\u03C2';
				localStr['ga0'] = '\u03A6\u03AC\u03BB\u03B1\u03BD\u03BE';
				localStr['ga1'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03BE\u03AF\u03C6\u03BF\u03C2';
				localStr['ga2'] = '\u0391\u03BD\u03B9\u03C7\u03BD\u03B5\u03C5\u03C4\u03AE\u03C2';
				localStr['ga3'] = '\u0391\u03C3\u03C4\u03C1\u03B1\u03C0\u03AE \u03C4\u03BF\u03C5 \u03A4\u03BF\u03C5\u03C4\u03B1\u03C4\u03AE';
				localStr['ga4'] = '\u0394\u03C1\u03BF\u03C5\u03AF\u03B4\u03B7\u03C2';
				localStr['ga5'] = '\u0399\u03B4\u03BF\u03C5\u03B1\u03BD\u03CC\u03C2';
				localStr['ga6'] = '\u03A0\u03BF\u03BB\u03B9\u03BF\u03C1\u03BA\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03BA\u03C1\u03B9\u03CC\u03C2';
				localStr['ga7'] = '\u03A0\u03BF\u03BB\u03B5\u03BC\u03B9\u03BA\u03CC\u03C2 \u03BA\u03B1\u03C4\u03B1\u03C0\u03AD\u03BB\u03C4\u03B7\u03C2';
				localStr['ga8'] = '\u0391\u03C1\u03C7\u03B7\u03B3\u03CC\u03C2';
				localStr['ga9'] = '\u0386\u03C0\u03BF\u03B9\u03BA\u03BF\u03C2';

				localStr['ge_'] = '\u03A4\u03B5\u03CD\u03C4\u03BF\u03BD\u03B5\u03C2';
				localStr['ge0'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03C1\u03CC\u03C0\u03B1\u03BB\u03BF';
				localStr['ge1'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03B1\u03BA\u03CC\u03BD\u03C4\u03B9\u03BF';
				localStr['ge2'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03C4\u03C3\u03B5\u03BA\u03BF\u03CD\u03C1\u03B9';
				localStr['ge3'] = '\u0391\u03BD\u03B9\u03C7\u03BD\u03B5\u03C5\u03C4\u03AE\u03C2';
				localStr['ge4'] = '\u03A0\u03B1\u03BB\u03B1\u03C4\u03B9\u03BD\u03CC\u03C2';
				localStr['ge5'] = '\u03A4\u03B5\u03CD\u03C4\u03BF\u03BD\u03B1\u03C2 \u03B9\u03C0\u03C0\u03CC\u03C4\u03B7\u03C2';
				localStr['ge6'] = '\u03A0\u03BF\u03BB\u03B9\u03BF\u03C1\u03BA\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03BA\u03C1\u03B9\u03CC\u03C2';
				localStr['ge7'] = '\u039A\u03B1\u03C4\u03B1\u03C0\u03AD\u03BB\u03C4\u03B7\u03C2';
				localStr['ge8'] = '\u03A6\u03CD\u03BB\u03B1\u03C1\u03C7\u03BF\u03C2';
				localStr['ge9'] = '\u0386\u03C0\u03BF\u03B9\u03BA\u03BF\u03C2';

				break;
			case 'com.hr':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Rimljane';
				localStr['ro0'] = 'Legionar';
				localStr['ro1'] = 'Pretorian';
				localStr['ro2'] = 'Imperian';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ovan za probijanje';
				localStr['ro7'] = 'Vatreni katapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Naseljenik';

				localStr['ga_'] = 'Gale';
				localStr['ga0'] = 'Falanga';
				localStr['ga1'] = 'Ma\u010Devalac';
				localStr['ga2'] = 'Traga\u010D';
				localStr['ga3'] = 'Theutatesov grom';
				localStr['ga4'] = 'Druid jaha\u010D';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Ovan za probijanje';
				localStr['ga7'] = 'Trebu\u0161e';
				localStr['ga8'] = 'Starje\u0161ina';
				localStr['ga9'] = 'Naseljenik';

				localStr['ge_'] = 'Teutonce';
				localStr['ge0'] = 'Gor\u0161tak';
				localStr['ge1'] = 'Kopljanik';
				localStr['ge2'] = 'Borac sa sjekirom';
				localStr['ge3'] = 'Izvidnik';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teutonski vitez';
				localStr['ge6'] = 'Ovan za probijanje';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Poglavica';
				localStr['ge9'] = 'Naseljenik';

				break;
			case 'hu':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'R\u00F3maiak';
				localStr['ro0'] = 'L\u00E9gi\u00F3';
				localStr['ro1'] = 'Test\u0151rs\u00E9g';
				localStr['ro2'] = 'Birodalmi';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Falt\u00F6r\u0151 kos';
				localStr['ro7'] = 'T\u0171zkatapult';
				localStr['ro8'] = 'Szen\u00E1tor';
				localStr['ro9'] = 'Telepes';

				localStr['ga_'] = 'Gallok';
				localStr['ga0'] = 'Phalanx';
				localStr['ga1'] = 'Kardos';
				localStr['ga2'] = 'Felder\u00EDt\u0151';
				localStr['ga3'] = 'Theutat Vill\u00E1m';
				localStr['ga4'] = 'Druida lovas';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Falrombol\u00F3';
				localStr['ga7'] = 'Harci-katapult';
				localStr['ga8'] = 'F\u0151n\u00F6k';
				localStr['ga9'] = 'Telepes';

				localStr['ge_'] = 'Germ\u00E1nok';
				localStr['ge0'] = 'Buzog\u00E1nyos';
				localStr['ge1'] = 'L\u00E1ndzs\u00E1s';
				localStr['ge2'] = 'Csatab\u00E1rdos';
				localStr['ge3'] = 'Csatab\u00E1rdos';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teuton lovag';
				localStr['ge6'] = 'Falt\u00F6r\u0151 kos';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'T\u00F6rzsi vezet\u00F6';
				localStr['ge9'] = 'Telepes';

				break;
			case 'co.il':
				localStr['npc'] = '\u05DE\u05E1\u05D7\u05E8 NPC';

				localStr['res'] = '\u05DE\u05E9\u05D0\u05D1\u05D9\u05DD';
				localStr['re1'] = '\u05E2\u05E6\u05D9\u05DD';
				localStr['re2'] = '\u05D8\u05D9\u05D8';
				localStr['re3'] = '\u05D1\u05E8\u05D6\u05DC';
				localStr['re4'] = '\u05D9\u05D1\u05D5\u05DC';

				localStr['ro_'] = '\u05E8\u05D5\u05DE\u05D0\u05D9\u05DD';
				localStr['ro0'] = '\u05DC\u05D9\u05D2\u05D9\u05D5\u05E0\u05E8';
				localStr['ro1'] = '\u05E4\u05E8\u05D0\u05D8\u05D5\u05E8';
				localStr['ro2'] = '\u05D0\u05D9\u05DE\u05E4\u05E8\u05D9\u05D9\u05DF';
				localStr['ro3'] = '\u05D0\u05E7\u05D5\u05D5\u05D9\u05D8\u05E1 \u05DC\u05D2\u05D8\u05D9';
				localStr['ro4'] = '\u05D0\u05E7\u05D5\u05D5\u05D9\u05D8\u05E1 \u05D0\u05D9\u05DE\u05E4\u05E8\u05D8\u05D5\u05E8\u05D9\u05E1';
				localStr['ro5'] = '\u05D0\u05E7\u05D5\u05D5\u05D9\u05D8\u05E1 \u05E7\u05D9\u05E1\u05E8\u05D9\u05E1';
				localStr['ro6'] = '\u05D0\u05D9\u05DC \u05D1\u05E8\u05D6\u05DC';
				localStr['ro7'] = '\u05D1\u05DC\u05D9\u05E1\u05D8\u05E8\u05D4';
				localStr['ro8'] = '\u05E1\u05E0\u05D8\u05D5\u05E8';
				localStr['ro9'] = '\u05DE\u05EA\u05D9\u05D9\u05E9\u05D1';

				localStr['ga_'] = '\u05D2\u05D0\u05DC\u05D9\u05D4';
				localStr['ga0'] = '\u05E4\u05D0\u05DC\u05D0\u05E0\u05E7\u05E1';
				localStr['ga1'] = '\u05D0\u05D9\u05E9 \u05D7\u05E8\u05D1';
				localStr['ga2'] = '\u05DE\u05D5\u05E6\u05D0 \u05D3\u05E8\u05DA';
				localStr['ga3'] = '\u05D1\u05E8\u05E7 \u05D8\u05D0\u05D5\u05D8\u05D0\u05D8\u05E1';
				localStr['ga4'] = '\u05D3\u05E8\u05D5\u05D0\u05D9\u05D3\u05E8\u05D9\u05D9\u05D3\u05E8';
				localStr['ga5'] = '\u05D4\u05D0\u05D5\u05D3\u05DF';
				localStr['ga6'] = '\u05D0\u05D9\u05D9\u05DC \u05D1\u05E8\u05D6\u05DC';
				localStr['ga7'] = '\u05D1\u05DC\u05D9\u05E1\u05D8\u05E8\u05D4';
				localStr['ga8'] = '\u05E6\'\u05D9\u05E4\u05D8\u05DF';
				localStr['ga9'] = '\u05DE\u05EA\u05D9\u05D9\u05E9\u05D1';

				localStr['ge_'] = '\u05D8\u05D0\u05D5\u05D8\u05D5\u05E0\u05D9\u05DD';
				localStr['ge0'] = '\u05DE\u05E0\u05D9\u05E3 \u05D0\u05DC\u05D4';
				localStr['ge1'] = '\u05D0\u05D9\u05E9 \u05D7\u05E0\u05D9\u05EA';
				localStr['ge2'] = '\u05D0\u05D9\u05E9 \u05D2\u05E8\u05D6\u05DF';
				localStr['ge3'] = '\u05E1\u05D9\u05D9\u05E8';
				localStr['ge4'] = '\u05E4\u05D0\u05DC\u05D0\u05D3\u05D9\u05DF';
				localStr['ge5'] = '\u05D0\u05D1\u05D9\u05E8 \u05D8\u05D0\u05D5\u05D8\u05D5\u05E0\u05D9';
				localStr['ge6'] = '\u05D0\u05D9\u05D9\u05DC \u05D1\u05E8\u05D6\u05DC';
				localStr['ge7'] = '\u05D1\u05DC\u05D9\u05E1\u05D8\u05E8\u05D4';
				localStr['ge8'] = '\u05E6\'\u05D9\u05E3';
				localStr['ge9'] = '\u05DE\u05EA\u05D9\u05D9\u05E9\u05D1';

				break;
			case 'it':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Risorse';
				localStr['re1'] = 'Legno';
				localStr['re2'] = 'Argilla ';
				localStr['re3'] = 'Ferro ';
				localStr['re4'] = 'Grano';

				localStr['ro_'] = 'Romani';
				localStr['ro0'] = 'Legionario';
				localStr['ro1'] = 'Pretoriano';
				localStr['ro2'] = 'Imperiano';
				localStr['ro3'] = 'Legionario a cavallo';
				localStr['ro4'] = 'Imperiano a cavallo';
				localStr['ro5'] = 'Cavalleria Romana';
				localStr['ro6'] = 'Ariete da sfondamento';
				localStr['ro7'] = 'Catapulta';
				localStr['ro8'] = 'Senatore';
				localStr['ro9'] = 'Decurione';

				localStr['ga_'] = 'Galli';
				localStr['ga0'] = 'Lanciere';
				localStr['ga1'] = 'Combattente con spada';
				localStr['ga2'] = 'Esploratore';
				localStr['ga3'] = 'Cavalleria Gallica';
				localStr['ga4'] = 'Cavalleria di difesa';
				localStr['ga5'] = 'Cavalleria avanzata';
				localStr['ga6'] = 'Ariete';
				localStr['ga7'] = 'Catapulta';
				localStr['ga8'] = 'Capo trib\u00F9';
				localStr['ga9'] = 'Decurione';

				localStr['ge_'] = 'Teutoni';
				localStr['ge0'] = 'Combattente';
				localStr['ge1'] = 'Lanciere';
				localStr['ge2'] = 'Combattente con ascia';
				localStr['ge3'] = 'Esploratore';
				localStr['ge4'] = 'Paladino';
				localStr['ge5'] = 'Cavalleria Teutonica';
				localStr['ge6'] = 'Ariete';
				localStr['ge7'] = 'Catapulta';
				localStr['ge8'] = 'Comandante';
				localStr['ge9'] = 'Decurione';

				break;
			case 'lt':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'rom\u0117n\u0173';
				localStr['ro0'] = 'legionierius';
				localStr['ro1'] = 'pretorionas';
				localStr['ro2'] = 'imperionas';
				localStr['ro3'] = 'raitas legatas';
				localStr['ro4'] = 'imperatoriaus raitelis';
				localStr['ro5'] = 'cezario raitelis';
				localStr['ro6'] = 'm\u016Bradau\u017Eys';
				localStr['ro7'] = 'ugnin\u0117 katapulta';
				localStr['ro8'] = 'senatorius';
				localStr['ro9'] = 'rom\u0117n\u0173 kolonistas';

				localStr['ga_'] = 'gal\u0173';
				localStr['ga0'] = 'falanga';
				localStr['ga1'] = 'p\u0117stininkas su kardu';
				localStr['ga2'] = 'p\u0117dsekys';
				localStr['ga3'] = 'raitas perk\u016Bnas';
				localStr['ga4'] = 'raitas druidas';
				localStr['ga5'] = 'raitas hedujas';
				localStr['ga6'] = 'taranas';
				localStr['ga7'] = 'trebu\u0161etas';
				localStr['ga8'] = 'kunigaik\u0161tis';
				localStr['ga9'] = 'gal\u0173 kolonistas';

				localStr['ge_'] = 'german\u0173';
				localStr['ge0'] = 'p\u0117stininkas su kuoka';
				localStr['ge1'] = 'ietininkas';
				localStr['ge2'] = 'p\u0117stininkas su kirviu';
				localStr['ge3'] = '\u017Evalgas';
				localStr['ge4'] = 'paladinas';
				localStr['ge5'] = 'german\u0173 raitelis';
				localStr['ge6'] = 'taranas';
				localStr['ge7'] = 'katapulta';
				localStr['ge8'] = 'german\u0173 vadas';
				localStr['ge9'] = 'kolonistas';

				break;
			case 'net':
			case 'com.mx':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romanos';
				localStr['ro0'] = 'Legionario';
				localStr['ro1'] = 'Pretoriano';
				localStr['ro2'] = 'Imperano';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Carnero';
				localStr['ro7'] = 'Catapulta de fuego';
				localStr['ro8'] = 'Senador';
				localStr['ro9'] = 'Colono';

				localStr['ga_'] = 'Galos';
				localStr['ga0'] = 'Falange';
				localStr['ga1'] = 'Luchador de Espada';
				localStr['ga2'] = 'Batidor';
				localStr['ga3'] = 'Rayo de Teutates';
				localStr['ga4'] = 'Jinete Druida';
				localStr['ga5'] = 'Jinete Eduo';
				localStr['ga6'] = 'Carnero de madera';
				localStr['ga7'] = 'Catapulta de guerra';
				localStr['ga8'] = 'Cacique';
				localStr['ga9'] = 'Colono';

				localStr['ge_'] = 'Germanos';
				localStr['ge0'] = 'Luchador de Porra';
				localStr['ge1'] = 'Lancero';
				localStr['ge2'] = 'Luchador de Hacha';
				localStr['ge3'] = 'Emisario';
				localStr['ge4'] = 'Palad\u00EDn';
				localStr['ge5'] = 'Jinete Teut\u00F3n';
				localStr['ge6'] = 'Ariete';
				localStr['ge7'] = 'Catapulta';
				localStr['ge8'] = 'Cabecilla';
				localStr['ge9'] = 'Colono';

				break;
			case 'nl':
				localStr['npc'] = 'NPC handel';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romeinen';
				localStr['ro0'] = 'Legionair';
				localStr['ro1'] = 'Praetoriaan';
				localStr['ro2'] = 'Imperiaan';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ram';
				localStr['ro7'] = 'Vuurkatapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Kolonist';

				localStr['ga_'] = 'Galli\u00EBrs';
				localStr['ga0'] = 'Phalanx';
				localStr['ga1'] = 'Zwaardvechter';
				localStr['ga2'] = 'Padvinder';
				localStr['ga3'] = 'Toetatis Donder';
				localStr['ga4'] = 'Druideruiter';
				localStr['ga5'] = 'Haeduaan';
				localStr['ga6'] = 'Trebuchet';
				localStr['ga7'] = 'Krigskatapult';
				localStr['ga8'] = 'Onderleider';
				localStr['ga9'] = 'Kolonist';

				localStr['ge_'] = 'Germanen';
				localStr['ge0'] = 'Knuppelvechter';
				localStr['ge1'] = 'Speervechter';
				localStr['ge2'] = 'Bijlvechter';
				localStr['ge3'] = 'Verkenner';
				localStr['ge4'] = 'Paladijn';
				localStr['ge5'] = 'Germaanse Ridder';
				localStr['ge6'] = 'Ram';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Leider';
				localStr['ge9'] = 'Kolonist';

				break;
			case 'no':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romere';
				localStr['ro0'] = 'Legion\u00E6r';
				localStr['ro1'] = 'Pretorianer';
				localStr['ro2'] = 'Imperian';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Rambukk';
				localStr['ro7'] = 'Brannkatapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Nybygger';

				localStr['ga_'] = 'Gallere';
				localStr['ga0'] = 'Phalanx';
				localStr['ga1'] = 'Sverdmann';
				localStr['ga2'] = 'Stifinner';
				localStr['ga3'] = 'Theutates Torden';
				localStr['ga4'] = 'Druidrider';
				localStr['ga5'] = 'Haeduaner';
				localStr['ga6'] = 'Rambukk';
				localStr['ga7'] = 'Krigskatapult';
				localStr['ga8'] = 'H\u00F8vding';
				localStr['ga9'] = 'Nybyggere';

				localStr['ge_'] = 'Germanere';
				localStr['ge0'] = 'Klubbemann';
				localStr['ge1'] = 'Spydmann';
				localStr['ge2'] = '\u00D8ksemann';
				localStr['ge3'] = 'Speider';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Teutonic Ridder';
				localStr['ge6'] = 'Rambukk';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'H\u00F8vding';
				localStr['ge9'] = 'Nybyggere';

				break;
			case 'pl':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Surowce';
				localStr['re1'] = 'Drewno';
				localStr['re2'] = 'Glina';
				localStr['re3'] = '\u017Belazo';
				localStr['re4'] = 'Zbo\u017Ce';

				localStr['ro_'] = 'Rzymianie';
				localStr['ro0'] = 'Legionista';
				localStr['ro1'] = 'Pretorianin';
				localStr['ro2'] = 'Centurion';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Taran';
				localStr['ro7'] = 'Ognista Katapulta';
				localStr['ro8'] = 'Konsul';
				localStr['ro9'] = 'Osadnik';

				localStr['ga_'] = 'Galowie';
				localStr['ga0'] = 'Falanga';
				localStr['ga1'] = 'Miecznik';
				localStr['ga2'] = 'Tropiciel';
				localStr['ga3'] = 'Grom Teutatesa';
				localStr['ga4'] = 'Jez\'dziec Druidzki';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Taran';
				localStr['ga7'] = 'Trebusz';
				localStr['ga8'] = 'Herszt';
				localStr['ga9'] = 'Osadnik';

				localStr['ge_'] = 'Germanie';
				localStr['ge0'] = 'Pa\u0322karz';
				localStr['ge1'] = 'Oszczepnik';
				localStr['ge2'] = 'Topornik';
				localStr['ge3'] = 'Zwiadowca';
				localStr['ge4'] = 'Paladyn';
				localStr['ge5'] = 'German\'ski Rycerz';
				localStr['ge6'] = 'Taran';
				localStr['ge7'] = 'Katapulta';
				localStr['ge8'] = 'W\u00F3dz';
				localStr['ge9'] = 'Osadnik';

				break;
			case 'pt':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Recursos';
				localStr['re1'] = 'Madeira';
				localStr['re2'] = 'Barro';
				localStr['re3'] = 'Ferro';
				localStr['re4'] = 'Cereal';

				localStr['ro_'] = 'Romanos';
				localStr['ro0'] = 'Legion\u0225rio';
				localStr['ro1'] = 'Pretoriano';
				localStr['ro2'] = 'Imperiano';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ar\u00EDete';
				localStr['ro7'] = 'Catapulta de Fogo';
				localStr['ro8'] = 'Senador';
				localStr['ro9'] = 'Colonizador';

				localStr['ga_'] = 'Gauleses';
				localStr['ga0'] = 'Falange';
				localStr['ga1'] = 'Espadachim';
				localStr['ga2'] = 'Batedor';
				localStr['ga3'] = 'Trov\u0227o Theutate';
				localStr['ga4'] = 'Cavaleiro Druida';
				localStr['ga5'] = 'Haeduano';
				localStr['ga6'] = 'Ar\u00EDete';
				localStr['ga7'] = 'Trabuquete';
				localStr['ga8'] = 'Chefe de Cl\u0227';
				localStr['ga9'] = 'Colonizador';

				localStr['ge_'] = 'Teut\u00F5es';
				localStr['ge0'] = 'Salteador';
				localStr['ge1'] = 'Lanceiro';
				localStr['ge2'] = 'Barbaro';
				localStr['ge3'] = 'Espi\u0227o';
				localStr['ge4'] = 'Paladino';
				localStr['ge5'] = 'Cavaleiro Teut\u0227o';
				localStr['ge6'] = 'Ariete';
				localStr['ge7'] = 'Catapulta';
				localStr['ge8'] = 'Chefe';
				localStr['ge9'] = 'Colonizadores';

				break;
			case 'ro':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resurse';
				localStr['re1'] = 'Lemn';
				localStr['re2'] = 'Lut';
				localStr['re3'] = 'Fier';
				localStr['re4'] = 'Hrana';

				localStr['ro_'] = 'Romani';
				localStr['ro0'] = 'Legionar';
				localStr['ro1'] = 'Pretorian';
				localStr['ro2'] = 'Imperian';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Berbec';
				localStr['ro7'] = 'Catapulta';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Colonist';

				localStr['ga_'] = 'Daci';
				localStr['ga0'] = 'Scutier';
				localStr['ga1'] = 'Pedestru';
				localStr['ga2'] = 'Iscoada';
				localStr['ga3'] = 'Calaret Fulger';
				localStr['ga4'] = 'Druidier';
				localStr['ga5'] = 'Tarabostes';
				localStr['ga6'] = 'Berbec';
				localStr['ga7'] = 'Catapulta';
				localStr['ga8'] = 'General';
				localStr['ga9'] = 'Colonist';

				localStr['ge_'] = 'Barbari';
				localStr['ge0'] = 'Maciucar';
				localStr['ge1'] = 'Lancier';
				localStr['ge2'] = 'Executor';
				localStr['ge3'] = 'Spion';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Cavaler teuton';
				localStr['ge6'] = 'Berbec';
				localStr['ge7'] = 'Catapulta';
				localStr['ge8'] = 'Capetenie';
				localStr['ge9'] = 'Colonist';

				break;
			case 'rs':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = '\u0420\u0438\u043C\u0459\u0430\u043D\u0438';
				localStr['ro0'] = '\u041B\u0435\u0433\u0438\u043E\u043D\u0430\u0440';
				localStr['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0438j\u0430\u043D\u0430\u0446';
				localStr['ro2'] = '\u0418\u043C\u043F\u0435\u0440\u0438j\u0430\u043D\u0430\u0446';
				localStr['ro3'] = '\u0418\u0437\u0432\u0438\u0452\u0430\u0447';
				localStr['ro4'] = '\u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432\u0430 \u041A\u043E\u045A\u0438\u0446\u0430';
				localStr['ro5'] = '\u0426\u0435\u0437\u0430\u0440\u0435\u0432\u0430 \u041A\u043E\u045A\u0438\u0446\u0430';
				localStr['ro6'] = '\u041E\u0432\u0430\u043D';
				localStr['ro7'] = '\u0412\u0430\u0442\u0440\u0435\u043D\u0438 \u043A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
				localStr['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
				localStr['ro9'] = '\u041D\u0430\u0441\u0435\u0459\u0435\u043D\u0438\u043A';

				localStr['ga_'] = '\u0413\u0430\u043B\u0438';
				localStr['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
				localStr['ga1'] = '\u041C\u0430\u0447\u0435\u0432\u0430\u043B\u0430\u0446';
				localStr['ga2'] = '\u0418\u0437\u0432\u0438\u0452\u0430\u0447';
				localStr['ga3'] = '\u0413\u0430\u043B\u0441\u043A\u0438 \u0412\u0438\u0442\u0435\u0437';
				localStr['ga4'] = '\u0414\u0440\u0443\u0438\u0434';
				localStr['ga5'] = '\u041A\u043E\u045A\u0430\u043D\u0438\u043A';
				localStr['ga6'] = '\u041E\u0432\u0430\u043D';
				localStr['ga7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
				localStr['ga8'] = '\u0421\u0442\u0430\u0440\u0435\u0448\u0438\u043D\u0430';
				localStr['ga9'] = '\u041D\u0430\u0441\u0435\u0459\u0435\u043D\u0438\u043A';

				localStr['ge_'] = '\u0422\u0435\u0443\u0442\u043E\u043D\u0446\u0438';
				localStr['ge0'] = '\u0411\u0430\u0442\u0438\u043D\u0430\u0440';
				localStr['ge1'] = '\u041A\u043E\u043F\u0459\u0430\u043D\u0438\u043A';
				localStr['ge2'] = '\u0421\u0435\u043A\u0438\u0440\u0430\u0448';
				localStr['ge3'] = '\u0418\u0437\u0432\u0438\u0452\u0430\u0447';
				localStr['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
				localStr['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u043A\u0438 \u0432\u0438\u0442\u0435\u0437';
				localStr['ge6'] = '\u041E\u0432\u0430\u043D';
				localStr['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
				localStr['ge8'] = '\u041F\u043E\u0433\u043B\u0430\u0432\u0438\u0446\u0430';
				localStr['ge9'] = '\u041D\u0430\u0441\u0435\u0459\u0435\u043D\u0438\u043A';

				break;
			case 'ru':

				localStr['npc'] = 'NPC \u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446';

				localStr['res'] = '\u0420\u0435\u0441\u0443\u0440\u0441\u044B';
				localStr['re1'] = '\u0414\u0435\u0440\u0435\u0432\u043E';
				localStr['re2'] = '\u0413\u043B\u0438\u043D\u0430';
				localStr['re3'] = '\u0416\u0435\u043B\u0435\u0437\u043E';
				localStr['re4'] = '\u0417\u0435\u0440\u043D\u043E';

				localStr['ro_'] = '\u0420\u0438\u043C\u043B\u044F\u043D\u0435';
				localStr['ro0'] = '\u041B\u0435\u0433\u0438\u043E\u043D\u0435\u0440';
				localStr['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0438\u0430\u043D\u0435\u0446';
				localStr['ro2'] = '\u0418\u043C\u0435\u043F\u0435\u0440\u0438\u0430\u043D\u0435\u0446';
				localStr['ro3'] = '\u041A\u043E\u043D\u043D\u044B\u0439 \u0420\u0430\u0437\u0432\u0435\u0434\u0447\u0438\u043A';
				localStr['ro4'] = '\u041A\u043E\u043D\u043D\u0438\u0446\u0430 \u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430';
				localStr['ro5'] = '\u041A\u043E\u043D\u043D\u0438\u0446\u0430 \u0426\u0435\u0437\u0430\u0440\u044F';
				localStr['ro6'] = '\u0422\u0430\u0440\u0430\u043D';
				localStr['ro7'] = '\u041E\u0433\u043D\u0435\u043D\u043D\u0430\u044F \u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
				localStr['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
				localStr['ro9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446';

				localStr['ga_'] = '\u0413\u0435\u0440\u043C\u0430\u043D\u0446\u044B';
				localStr['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
				localStr['ga1'] = '\u041C\u0435\u0447\u043D\u0438\u043A';
				localStr['ga2'] = '\u0421\u043B\u0435\u0434\u043E\u043F\u044B\u0442';
				localStr['ga3'] = '\u0422\u0435\u0432\u0442\u0430\u0442\u0441\u043A\u0438\u0439 \u0413\u0440\u043E\u043C';
				localStr['ga4'] = '\u0414\u0440\u0443\u0438\u0434-\u0412\u0441\u0430\u0434\u043D\u0438\u043A';
				localStr['ga5'] = '\u042D\u0434\u0443\u0439\u0441\u043A\u0430\u044F \u041A\u043E\u043D\u043D\u0438\u0446\u0430';
				localStr['ga6'] = '\u0422\u0430\u0440\u0430\u043D';
				localStr['ga7'] = '\u0422\u0440\u0435\u0431\u0443\u0447\u0435\u0442';
				localStr['ga8'] = '\u041F\u0440\u0435\u0434\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C';
				localStr['ga9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446';

				localStr['ge_'] = '\u0413\u0430\u043B\u043B\u044B';
				localStr['ge0'] = '\u0414\u0443\u0431\u0438\u043D\u0449\u0438\u043A';
				localStr['ge1'] = '\u041A\u043E\u043F\u044C\u0435\u043D\u043E\u0441\u0435\u0446';
				localStr['ge2'] = '\u0422\u043E\u043F\u043E\u0440\u0449\u0438\u043A';
				localStr['ge3'] = '\u0421\u043A\u0430\u0443\u0442';
				localStr['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
				localStr['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u043A\u0430\u044F \u041A\u043E\u043D\u043D\u0438\u0446\u0430';
				localStr['ge6'] = '\u0421\u0442\u0435\u043D\u043E\u0431\u0438\u0442\u043D\u043E\u0435 \u041E\u0440\u0443\u0434\u0438\u0435';
				localStr['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
				localStr['ge8'] = '\u0412\u043E\u0436\u0434\u044C';
				localStr['ge9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446';

				break;
			case 'se':
				localStr['npc'] = 'NPC handel';

				localStr['res'] = 'Resurser';
				localStr['re1'] = 'Tr\u00E4';
				localStr['re2'] = 'Lera';
				localStr['re3'] = 'J\u00E4rn';
				localStr['re4'] = 'Vete';

				localStr['ro_'] = 'Romare';
				localStr['ro0'] = 'Legion\u00E4rer';
				localStr['ro1'] = 'Praetorianer';
				localStr['ro2'] = 'Imperiesoldater';
				localStr['ro3'] = 'Sp\u00E5rare';
				localStr['ro4'] = 'Imperieriddare';
				localStr['ro5'] = 'Ceasarriddare';
				localStr['ro6'] = 'Murbr\u00E4cka';
				localStr['ro7'] = 'Eldkatapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Nybyggare';

				localStr['ga_'] = 'Galler';
				localStr['ga0'] = 'Falanx';
				localStr['ga1'] = 'Sv\u00E4rdsk\u00E4mpe';
				localStr['ga2'] = 'Sp\u00E5rare';
				localStr['ga3'] = 'Theutates Blixt';
				localStr['ga4'] = 'Druidryttare';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Murbr\u00E4cka';
				localStr['ga7'] = 'Krigskatapult';
				localStr['ga8'] = 'H\u00F6vding';
				localStr['ga9'] = 'Nybyggare';

				localStr['ge_'] = 'Germaner';
				localStr['ge0'] = 'Klubbman';
				localStr['ge1'] = 'Spjutman';
				localStr['ge2'] = 'Yxman';
				localStr['ge3'] = 'Scout';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Germansk knekt';
				localStr['ge6'] = 'Murbr\u00E4cka';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Stamledare';
				localStr['ge9'] = 'Nybyggare';

				break;
			case 'si':
				localStr['npc'] = 'NPC trgovanje';

				localStr['res'] = 'Surovine';
				localStr['re1'] = 'Les';
				localStr['re2'] = 'Glina';
				localStr['re3'] = '\u017Delezo';
				localStr['re4'] = '\u017Dito';

				localStr['ro_'] = 'Rimljani';
				localStr['ro0'] = 'Legionar';
				localStr['ro1'] = 'Praetorian';
				localStr['ro2'] = 'Imperian';
				localStr['ro3'] = 'Izvidnik';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Oblegovalni oven';
				localStr['ro7'] = 'Ognjeni katapult';
				localStr['ro8'] = 'Senator';
				localStr['ro9'] = 'Kolonist';

				localStr['ga_'] = 'Galci';
				localStr['ga0'] = 'Falanga';
				localStr['ga1'] = 'Me\u010Devalec';
				localStr['ga2'] = 'Stezosledec';
				localStr['ga3'] = 'Theutatesova Strela';
				localStr['ga4'] = 'Druid';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Oblegovalni Oven';
				localStr['ga7'] = 'Trebu\u0161et';
				localStr['ga8'] = 'Poglavar';
				localStr['ga9'] = 'Kolonist';

				localStr['ge_'] = 'Tevtoni';
				localStr['ge'] = 'Gorja\u010Dar';
				localStr['ge'] = 'Suli\u010Dar';
				localStr['ge'] = 'Metalec sekir';
				localStr['ge'] = 'Skavt';
				localStr['ge'] = 'Paladin';
				localStr['ge'] = 'Tevtonski vitez';
				localStr['ge'] = 'Oblegovalni oven';
				localStr['ge'] = 'Katapult';
				localStr['ge'] = 'Vodja';
				localStr['ge'] = 'Kolonist';

				break;
			case 'sk':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Rimania';
				localStr['ro0'] = 'Legion\u00E1r';
				localStr['ro1'] = 'Pretori\u00E1n';
				localStr['ro2'] = 'Imperi\u00E1n';
				localStr['ro3'] = 'Equites Leg\u00E1ti';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'R\u00EDmske baranidlo';
				localStr['ro7'] = 'Ohniv\u00FD katapult';
				localStr['ro8'] = 'Sen\u00E1tor';
				localStr['ro9'] = 'Osadn\u00EDk';

				localStr['ga_'] = 'Galovia';
				localStr['ga0'] = 'Falanx';
				localStr['ga1'] = '\u0160ermiar';
				localStr['ga2'] = 'Sliedi\u010D';
				localStr['ga3'] = 'Theutates Blesk';
				localStr['ga4'] = 'Druid jazdec';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Dreven\u00E9 baranidlo';
				localStr['ga7'] = 'Vojensk\u00FD katapult';
				localStr['ga8'] = 'N\u00E1\u010Deln\u00EDk';
				localStr['ga9'] = 'Osadn\u00EDk';

				localStr['ge_'] = 'Germ\u00E1ni';
				localStr['ge0'] = 'P\u00E1lkar';
				localStr['ge1'] = 'O\u0161tep\u00E1r';
				localStr['ge2'] = 'Bojovn\u00EDk so sekerou';
				localStr['ge3'] = '\u0160peh';
				localStr['ge4'] = 'Rytier';
				localStr['ge5'] = 'Teuton jazdec';
				localStr['ge6'] = 'Germ\u00E1nske baranidlo';
				localStr['ge7'] = 'Katapult';
				localStr['ge8'] = 'Kme\u0148ov\u00FD vodca';
				localStr['ge9'] = 'Osadn\u00EDk';

				break;
			case 'com.tr':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = 'Romal\u0131lar';
				localStr['ro0'] = 'Lejyoner';
				localStr['ro1'] = 'Pretoryan';
				localStr['ro2'] = 'Emperyan';
				localStr['ro3'] = 'Equites Legati';
				localStr['ro4'] = 'Equites Imperatoris';
				localStr['ro5'] = 'Equites Caesaris';
				localStr['ro6'] = 'Ko\u00E7ba\u015F\u0131';
				localStr['ro7'] = 'Ate\u015F Manc\u0131n\u0131\u011F\u0131';
				localStr['ro8'] = 'Senat\u00F6r';
				localStr['ro9'] = 'G\u00F6\u00E7men';

				localStr['ga_'] = 'Galyal\u0131lar';
				localStr['ga0'] = 'Phalanx';
				localStr['ga1'] = 'K\u0131l\u0131\u00E7l\u0131';
				localStr['ga2'] = 'Casus';
				localStr['ga3'] = 'Toytat\u0131n \u015Eim\u015Fe\u011Fi';
				localStr['ga4'] = 'Druyid';
				localStr['ga5'] = 'Haeduan';
				localStr['ga6'] = 'Ko\u00E7ba\u015F\u0131';
				localStr['ga7'] = 'Manc\u0131n\u0131k';
				localStr['ga8'] = 'Kabile Reisi';
				localStr['ga9'] = 'G\u00F6\u00E7men';

				localStr['ge_'] = 'Cermenler';
				localStr['ge0'] = 'Tokmak Sallayan';
				localStr['ge1'] = 'M\u0131zrak\u00E7\u0131';
				localStr['ge2'] = 'Balta Sallayan';
				localStr['ge3'] = 'Casus';
				localStr['ge4'] = 'Paladin';
				localStr['ge5'] = 'Toyton';
				localStr['ge6'] = 'Toyton';
				localStr['ge7'] = 'Manc\u0131n\u0131k';
				localStr['ge8'] = 'Reis';
				localStr['ge9'] = 'G\u00F6\u00E7men';

				break;
			case 'com.ua':
				localStr['npc'] = 'NPC';

				localStr['res'] = 'Resources';
				localStr['re1'] = 'Wood';
				localStr['re2'] = 'Clay';
				localStr['re3'] = 'Iron';
				localStr['re4'] = 'Crop';

				localStr['ro_'] = '\u0440\u0438\u043C\u043B\u044F\u043D\u0438';
				localStr['ro0'] = '\u041B\u0435\u0433\u0456\u043E\u043D\u0435\u0440';
				localStr['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0456\u0430\u043D\u0435\u0446\u044C';
				localStr['ro2'] = '\u0406\u043C\u043F\u0435\u0440\u0456\u0430\u043D\u0435\u0446\u044C';
				localStr['ro3'] = '\u041A\u0456\u043D\u043D\u0438\u0439 \u0440\u043E\u0437\u0432\u0456\u0434\u043D\u0438\u043A';
				localStr['ro4'] = '\u041A\u0456\u043D\u043D\u043E\u0442\u0430 \u0456\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430';
				localStr['ro5'] = '\u041A\u0456\u043D\u043D\u043E\u0442\u0430 \u0426\u0435\u0437\u0430\u0440\u044F';
				localStr['ro6'] = '\u0422\u0430\u0440\u0430\u043D';
				localStr['ro7'] = '\u0412\u043E\u0433\u043D\u044F\u043D\u0430 \u043A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
				localStr['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
				localStr['ro9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446\u044C';

				localStr['ga_'] = '\u0433\u0430\u043B\u043B\u0438';
				localStr['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
				localStr['ga1'] = '\u041C\u0435\u0447\u043D\u0438\u043A';
				localStr['ga2'] = '\u0421\u043B\u0456\u0434\u043E\u043F\u0438\u0442';
				localStr['ga3'] = '\u0422\u0435\u0432\u0442\u0430\u0446\u044C\u043A\u0438\u0439 \u0433\u0440\u0456\u043C';
				localStr['ga4'] = '\u0414\u0440\u0443\u0457\u0434-\u0432\u0435\u0440\u0448\u043D\u0438\u043A';
				localStr['ga5'] = '\u0415\u0434\u0443\u0439\u0441\u044C\u043A\u0430 \u043A\u0456\u043D\u043D\u043E\u0442\u0430';
				localStr['ga6'] = '\u0422\u0430\u0440\u0430\u043D';
				localStr['ga7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
				localStr['ga8'] = '\u041B\u0456\u0434\u0435\u0440';
				localStr['ga9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446\u044C';

				localStr['ge_'] = '\u0442\u0435\u0432\u0442\u043E\u043D\u0446\u0456';
				localStr['ge0'] = '\u0414\u0443\u0431\u0438\u043D\u043D\u0438\u043A';
				localStr['ge1'] = '\u0421\u043F\u0438\u0441\u043D\u0438\u043A';
				localStr['ge2'] = '\u0421\u043E\u043A\u0438\u0440\u043D\u0438\u043A';
				localStr['ge3'] = '\u0421\u043A\u0430\u0443\u0442';
				localStr['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
				localStr['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u044C\u043A\u0438\u0439 \u0432\u0435\u0440\u0448\u043D\u0438\u043A';
				localStr['ge6'] = '\u0421\u0442\u0456\u043D\u043E\u0431\u0438\u0442\u043D\u0435 \u0437\u043D\u0430\u0440\u044F\u0434\u0434\u044F';
				localStr['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
				localStr['ge8'] = '\u0412\u0430\u0442\u0430\u0436\u043E\u043A';
				localStr['ge9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446\u044C';
				break;
		}
	}

})();