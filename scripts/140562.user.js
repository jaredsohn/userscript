// ==UserScript==

// @name           Building Mover

// @namespace      Kongo

// @version        1.0

// @description    Building Mover

// @include        http://*.travian.*/dorf2.php*
// @include        http://*.travian.*/dorf1.php*
// @include        http://www.vfthis.net/*/*

// ==/UserScript==

(function() {
	var RunTime = [ new Date().getTime() ];

	function allInOneOpera() {
		var version = '2.8.6';

		notRunYet = false;
		RunTime[2] = new Date().getTime();
		var audiofile = 'http://simplythebest.net/sounds/MP3/MP3_files/event_MP3_files/touch_tone.mp3';
		var bgcolor = [ '#66ff66', 'yellow', 'red' ]; // resoursebar colors
		var vHColor = '#777777'; // hints (second name) color
		var cnColors = [ '#F8FFD8', '#FFE85B', '#FF8888', '#F0B8FF', '#A0F0A0' ]; // Center
		var income = [];
		var incomepersecond = [];
		var iresNow = [];
		var resNow = [];
		var fullRes = [];
		var abFL = false;
		var triFL = true;
		var raceFL = true;
		var nextFL = true;
		var timerRB = [];
		var timerP = [];
		var lastTimerP = [ 0, 0, 0 ];
		var lastTimerB = 0;
		var timerB = [];
		var timerB3 = [];
		var timerF = [];
		var timerOv = [];
		var timerN = [];
		var villages_id = [];
		var village_aid = 0;
		var village_aNum = 0;
		var villages_count = 0;
		var linkVSwitch = [];
		var progressbar_time = 0;
		var lastAlert = RunTime[0];
		var loadServerTime = 0;
		var langs = [ 'auto', 'English (en)', 'Ø¹Ø±Ø¨ÙŠ (ar)',
				'Ð‘ÑŠÐ»Ð³Ð°Ñ€Ñ�ÐºÐ¸ (bg)', 'Bosanski (bs)', 'Deutsch (de)',
				'Î•Î»Î»Î·Î½Î¹ÎºÎ¬ (el)', 'EspaÃ±ol (es)', 'Ù�Ø§Ø±Ø³ÛŒ (fa)',
				'FranÃ§ais (fr)', 'Hrvatski (hr)', 'Magyar (hu)',
				'Italiano (it)', 'Nederlands (nl)', 'Polski (pl)',
				'PortuguÃªs (pt)', 'RomÃ¢nÄƒ (ro)', 'Ð ÑƒÑ�Ñ�ÐºÐ¸Ð¹ (ru)',
				'Ð¡Ñ€Ð¿Ñ�ÐºÐ¸ (sr)', 'Svenska (sv)', 'TÃ¼rkÃ§e (tr)',
				'Ð£ÐºÑ€Ð°Ñ—Ð½Ñ�ÑŒÐºÐ° (ua)', 'Tiáº¿ng Viá»‡t (vi)',
				'ä¸­æ–‡ (zh)' ];
		var crtPath = window.location.href;
		var lMap = '';
		var crtName = crtPath.match(/^.*\/\/(.+?)\//)[1];
		var fullName = crtPath.match(/^.*\/\/.+\/+?/)[0];
		var crtLang = crtName.split('.');
		crtLang = crtLang[crtLang.length - 1];
		var flinks = new Object();
		var windowID = []; // 0-Setup, 1-Overview, 2-distanceTips, 3-notes,
		// 4-Reports,
		// 5-links, 6-editLink, 7-editAnalyzers, 8-seveLog,
		// 9-troopRes
		var pageElem3 = [ 'side_navi', // 0- left side. include menu, profile
		// etc.
		'content', // 1- main block in center
		'side_info', // 2- right side. include village list, links, quest.
		'mid', // 3- central block. include left menu, main content and right
		// menu
		'llist', // 4- links from plus
		'vlist', // 5- villages list
		'ltimeWrap', // 6- server time
		];
		var pageElem4 = [ 'side_info', // 0- include profile.
		'content', // 1- main block in center
		'side_info', // 2- right side. include village list, links, quest.
		'mid', // 3- central block. include left menu, main content and right
		// menu
		'llist', // 4- links from plus
		'vlist', // 5- villages list
		'betaBox', // 6- server time
		];
		var ver4FL = $g(pageElem3[0]) ? false : true;
		var pageElem = ver4FL ? pageElem4.slice() : pageElem3.slice();

		var docDir = [ 'left', 'right' ];
		var ltr = true;
		if (document.defaultView.getComputedStyle(document.body, null)
				.getPropertyValue("direction") == 'rtl') {
			docDir = [ 'right', 'left' ];
			ltr = false;
		}
		var coordDir = (ltr || ver4FL) ? 'ltr' : 'rtl';

		var sK = 1;
		var sM = 1;
		if (/[xyz]3|speed/i.test(crtPath)) {
			sM = 3;
			sK = 2;
			sC = [ 16 / 3, 100 ];
		}
		if (/[xyz]2|t1/i.test(crtPath)) {
			sM = 2;
			sK = 2;
			sC = [ 8, 100 ];
		}
		if (/[xyz]5/i.test(crtPath)) {
			sM = 5;
			sK = 2;
			sC = [ 3.2, 100 ];
		}
		if (/[xyz]10/i.test(crtPath)) {
			sM = 10;
			sK = 4;
			sC = [ 1.6, 100 ];
		}
		// also culturePoints()

		var RB = new Object();
		RB.village_dorf1 = [ 0 ];
		RB.village_dorf11 = [ 0 ];
		RB.village_dorf12 = [ 0 ];
		RB.village_dorf13 = [ 0 ];
		RB.village_dorf14 = [ 0 ];
		RB.village_Dorf2 = [ 0, 0, 0, 0, 0 ];
		RB.village_Var = [ 0, 0, 0 ];
		RB.village_PPH = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		RB.overview = [ -1, '0' ];
		RB.wantsMem = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		// 1 2 3 4 5 6 7 8 9 10 11 12 13, 14 15 16 17 18 19 20 21 22 23
		RB.dictionary = [ 0, 'Ally', 'Merchants', 'Tournament Square',
				'Duration', 'resource balance', 'Rally point', 'Marketplace',
				'Barracks', 'Stable', 'Workshop', 'Buy', 'Attacks', 0, 'at ',
				'Map', 'Reinforcement', 'Attack: Normal', 'Attack: Raid',
				'Culture points', 'Crop consumption', 'capacity', 'farm-list',
				'' ];
		RB.dictFL = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 1 ];
		// RB.dictFL[23] - version t4.x
		RB.dictTR = [ 'none', 'Legionnaire', 'Praetorian', 'Imperian',
				'Equites Legati', 'Equites Imperatoris', 'Equites Caesaris',
				'Battering Ram', 'Fire Catapult', 'Senator', 'Settler',
				'Clubswinger', 'Spearman', 'Axeman', 'Scout', 'Paladin',
				'Teutonic Knight', 'Ram', 'Catapult', 'Chief', 'Settler',
				'Phalanx', 'Swordsman', 'Pathfinder', 'Theutates Thunder',
				'Druidrider', 'Haeduan', 'Ram', 'Trebuchet', 'Chieftain',
				'Settler' ];
		RB.dictRp = [ "Won as attacker without losses.",
				"Won as attacker with losses.", "Lost as attacker.",
				"Won as defender without losses.",
				"Won as defender with losses.",
				"Lost as defender with losses.",
				"Lost as defender without losses.",
				"Spying was successful and not detected.",
				"Spying was successful, but detected.", "Spying failed.",
				"Spying was stopped successfully.",
				"Spying could not be stopped." ];
		RB.dictRpFL = Array(12);
		RB.market_fi = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		RB.tropsI = new Array(300);
		RB.trFL = new Array(31);
		RB.XY = [ 200, 10, // 0-Setup
		700, 430, // 1-Resource bar
		200, 100, // 2-Overview
		5, 400, // 3-Links
		400, 50, // 4-Report&Messages
		400, 130, // 5-Notes
		100, 50, // 6-Alerts
		10, 30, // 7-vlist
		10, 250, // 8-BIGicons
		200, 100, // 9-LinkEdit
		10, 250, // 10-attackInfo
		200, 100 // 11-attackFilter
		];
		RB.vHint = [];
		RB.vList = [];
		RB.attackList = [ RunTime[0] ];
		RB.bodyH = [ 0, 0, 0 ]; // 0-resourcebar,1-vlist,2-links
		RB.ln3 = []; // links for village
		RB.vBM = [];

		var img_igm = "data:image/gif;base64,R0lGODlhCwAIAIABAH9/f////yH5BAEKAAEALAAAAAALAAgAAAIUDI5oEO3L2ItSmnYw1bdTO31JVgAAOw==";
		var img_car = "data:image/gif;base64,R0lGODlhEgAMAIQWAKuZY+DUr8q6iol4RWJTKPLpzPz79fn05sC2l9bNs8vCqdTOvOzm1dzTutvQsLWphrmvkdvVwuTdyKeacPr37efk2v///////////////////////////////////////yH5BAEAAB8ALAAAAAASAAwAAAVW4Cd+DTAQAjOua2CigMPO7hAIpjm3LkEAuEFlJyoUfrbgYkcpBAa4mwkyMxhdN+lgEGEdnNmA1ITwgsXiIGHCMgjQN9zrMZMABfIXQbFLAP4mJwRlIiEAOw==";
		var img_def = "data:image/gif;base64,R0lGODlhEgAMAOMMAHJWAIpQAIFhAIxyH5l6AMeLAL2fAJmusNWzANStcOjMANDh4////////////////yH5BAEKAA8ALAAAAAASAAwAAARP8MmzpLXrXLkI+OBHVBtAEIahKOkJbI+JqqzhwnK6th48nLraaQBDmIItAAJWEMx2NkEB9igAkAbAFJYICLCCQGLT7V53ALH4spaELF1JBAA7";
		var img_att = "data:image/gif;base64,R0lGODlhEgAMAIQeALzO0P/SAIGXmeTLptStcPL390RSU5R4TdXEqMLU1ujw8dClY6a0tt7AXIaNjnqLjeTHXL/S1IVRAMGymeXSmbt+IK/CxGU+AJmusOO2AN7q672OAHGIitDh4////////yH5BAEKAB8ALAAAAAASAAwAAAVX4Cd+QDeeXwegqaCwimCyiXx2NisC3KxxK93IwtFoBBYhiiPgYJQiSubzw3A+GYqQsgl0rIbARiusbKYfcUVJkFzOmc1FsmYNKhdRAyKaD1gIB0ITCCIhADs=";
		var img_refr = "data:image/gif;base64,R0lGODlhEAAQAOMKACtVgCtVqiuAqlWAqlWA1ICAqoCqqoCq1Kqq1KrU1P///////////////////////yH5BAEKAA8ALAAAAAAQABAAAARW8MkHap14ghCGD4CmcV5xnFZIbVaHvMOhtuOBJMkMEEEGnIhZRgIYJG6q4SqlYyqJL8QgiZklUJnAYUo8ImRJwXQmfW2ZFwoIYDgUPpxkugIHVX0pTAQAOw==";
		var img_del = "data:image/gif;base64,R0lGODlhEAAMAIABAP8AAP///yH5BAEKAAEALAAAAAAQAAwAAAIfTICmu5j8lAONMuOwvTLzun3HJI5WBKGotrYrlpZBAQA7";
		var img_edit = "data:image/gif;base64,R0lGODlhEAAMAKEAAP///3HQAHV8bf///yH5BAEKAAMALAAAAAAQAAwAAAIinH+iyBnyGoIwREntE/hpilUe11QZWX5X+qEl5b6LNMVSAQA7";
		var img_info = "data:image/gif;base64,R0lGODlhDAAKAIABAH9/f////yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=";
		var img_tinfo = "data:image/gif;base64,R0lGODlhDAAMAMIEAACAgICAgICA/4D//////////////////yH5BAEKAAcALAAAAAAMAAwAAAMkeBohwio2R4OkhNQzqX9dplVf9pUjiaWgZ26TOALXR0fcBCkJADs=";
		var img_hide = "data:image/gif;base64,R0lGODlhDAAYAIABAExMTP///yH5BAEKAAEALAAAAAAMABgAAAIrjI8Hy20NQXIpxCmXlY/rXX1VNypcKZbqGlEtE55jGtfgDWr0FdOIvwoUAAA7";
		var img_cp = "data:image/gif;base64,R0lGODlhCwAOAIABAAAAAP///yH5BAEKAAEALAAAAAALAA4AAAIbjA2nB7nsXmhxpSYdtuzFioTeZFEeBU5mlgYFADs=";
		var img_clipIn = "data:image/gif;base64,R0lGODlhEAAMAKECAGZmZrq6AP///////yH5BAEKAAIALAAAAAAQAAwAAAIblI+pFrHZontS0tqWBMDCyHkfdpFl9CBZyh4FADs=";
		var img_clipOut = "data:image/gif;base64,R0lGODlhEAAMAKECAGZmZrq6AP///////yH5BAEKAAIALAAAAAAQAAwAAAIelH+By6Hc3INGypasW1tP7lHVJRrAVgrAWK4Z5aYFADs=";
		var img_bmove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAAAgCAMAAABkSNU7AAAAAXNSR0IArs4c6QAAAGNQTFRFaAAAAAAAAABVVQAAVQBVqgAAAFUAAFVVVVUAVVVVVVWqqlUAqlVVqlWq/1UA/1VVVaoAVapVVaqqqqoAqqpVqqqq/6oA/6pV/6qqVf8Aqv8Aqv9Vqv+qqv////9V//+q////3pvvvAAAAAF0Uk5TAEDm2GYAAANUSURBVEjHrZaLktMwDEXXmAYJGxpTqQm7aez//0qu5LTZB+xrUGfSSeoeXz2du7s3rD21u0+btn+bfgzV3mefgKmqcNmMWXD/IeQOEia3IiJXoJTBnxr4Hcgby/+UUqBWF5hKTofZfinS7MEixahSX0NuLFt5Ok3rNE0UZMmHzdL2rUsV8X0MetX5d9qlOAsG3JpCpMWkucFtiVkEcvHYeBWXQlfXX9YG3DydVxMGO08Sw6/AbXP4YCDuzsIDBwK5lFq46LMastsKGmRtOJcXiIL2gLmROA6BuAELNlQe5IlEp1siHSQbkCJc4ag3nJBrxVamUA2omQW8wKQ70BPH83rexcESqeU50lN5iu3W1fJvAVDsyNBC1CVeYyfcJKV1lZ2IIrOS4Ehll1dVVjcQouik8yysWsAl2WLozrYqhVPaFaYYKbMLpF2e9uTDmLgdZ51VhLksuLjL3VsEA2GSdK2WSc7E8ARMQ+7RE+8O7JMzATc7ULEWPDhuAjtPBXuc3EtPy4kMRrYKkarX6HGiq3E+ttSOLc9Zg23BxSPoPCxHxjQQpJGVIWoZ2uzDg/N6ch/M1UCyorhzmzOICUQeRxpc35UnBE4LQSVNkiNHEwY12HgYCnikXm3ASWBLiswtzU6bo4wP97/HzlPPhw5WuhyahiDTGeGwYgkBX0PQiiYwn0cDpS+czIu5HZqCly6HPIwPD1s+XCB+jvZf431pGtMJhWU4e2a90HNSwJsIPJlUZkltTqizljLd34+3AuxAxIpOYvpaNV0AAWcFmGSTt2ACJvghlARuZtb5Z5t+tpw57PW8DQMMvPN0zpq/o5VDrTee5Zd6141jGUeMaKUhzscWy3S8cDIePR4JfeCUYRhRxycBCvI2ntULqqt3//AVlVHtDBhJv+WoOSE71kLPTim/XZBKCj+yTqhBMDuv/EI/LZclJUHpqo09dF2xBbxgHGK/sryYgNvgRhiLhQ7mzkpFJ2Ci4tKnKgaquw6ozTjM6CJ/H/rb0ypWw94+5nRmI+V8Ax5ssPbh93jet9eOI2tun0jwz9R6dDKokHa5ACTPzqP29tlbtXQql6HYgbmdwv24fHxeto+8G9jIlP0EfnGet//4uvGxlyN9laT/6y3rLdAf9yuedFIpoQQAAAAASUVORK5CYII=";

		/** ********************* common library *************************** */

		var useDOMs = typeof window.localStorage == 'undefined' ? false : true;
		var khtmlFL = /khtml/i.test(navigator.appVersion);
		if (!(typeof GM_getValue == 'undefined' || khtmlFL)) {
			if (useDOMs)
				if (GM_getValue('brokenFF', 0) == 1)
					useDOMs = false;
				else {
					GM_setValue('brokenFF', 1);
					if (typeof window.localStorage.setItem != "undefined")
						GM_setValue('brokenFF', 2);
				}
		}
		if (typeof GM_addStyle == 'undefined') {
			function GM_addStyle(css) {
				var head = document.getElementsByTagName('head')[0];
				if (head) {
					var style = document.createElement("style");
					style.type = "text/css";
					style.appendChild($t(css));
					head.appendChild(style);
				}
			}
		}

		function $xf(xpath, xpt, startnode, aDoc) {
			var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
			var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
			var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
			if (!aDoc)
				aDoc = document;
			if (!startnode)
				startnode = document;
			var xpres = XPFirst;
			switch (xpt) {
			case 'i':
				xpres = XPIterator;
				break;
			case 'l':
				xpres = XPList;
				break;
			case 'r':
				xpres = XPResult;
				break;
			}
			;
			var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
			return (xpres == XPFirst ? ret.singleNodeValue : ret);
		}
		;
		function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
			var aR = new XMLHttpRequest();
			aR.onreadystatechange = function() {
				if (aR.readyState == 4
						&& (aR.status == 200 || aR.status == 304))
					onSuccess(aR);
				else if (aR.readyState == 4 && aR.status != 200)
					onFailure(aR);
			};
			aR.open(aMethod, url, true);
			if (aMethod == 'POST')
				aR.setRequestHeader('Content-Type',
						'application/x-www-form-urlencoded; charset=utf-8');
			aR.send(param);
		}
		;
		Number.prototype.NaN0 = function() {
			return isNaN(this) ? 0 : this;
		};
		String.prototype.trim = function() {
			return this.replace(/&nbsp;/g, '').replace(/^\s+|\s+$/g, '');
		};
		String.prototype.onlyText = function() {
			return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(
					/<[\s\S]+?>/g, '');
		};
		String.prototype.firstText = function() {
			return this.replace(/&lt;/, '<').split('<')[0].trim();
		};
		function $g(aID) {
			return (aID != '' ? document.getElementById(aID) : null);
		}
		;
		function $gn(aID) {
			return (aID != '' ? document.getElementsByName(aID) : null);
		}
		;
		function $gt(str, m) {
			return (typeof m == 'undefined' ? document : m)
					.getElementsByTagName(str);
		}
		;
		function $gc(str, m) {
			return (typeof m == 'undefined' ? document : m)
					.getElementsByClassName(str);
		}
		;
		function $at(aElem, att) {
			if (att !== undefined) {
				for ( var xi = 0; xi < att.length; xi++) {
					aElem.setAttribute(att[xi][0], att[xi][1]);
					if (att[xi][0].toUpperCase() == 'TITLE')
						aElem.setAttribute('alt', att[xi][1]);
				}
				;
			}
			;
		}
		;// Acr111-addAttributes
		function $t(iHTML) {
			return document.createTextNode(iHTML);
		}
		;
		function $e(nElem, att) {
			var Elem = document.createElement(nElem);
			$at(Elem, att);
			return Elem;
		}
		;
		function $ee(nElem, oElem, att) {
			var Elem = $e(nElem, att);
			if (oElem !== undefined)
				if (typeof (oElem) == 'object')
					Elem.appendChild(oElem);
				else
					Elem.innerHTML = oElem;
			return Elem;
		}
		;
		function $c(iHTML, att) {
			return $ee('TD', iHTML, att);
		}
		function $a(iHTML, att) {
			return $ee('A', iHTML, att);
		}
		function $am(Elem, mElem) {
			if (mElem !== undefined)
				for ( var i = 0; i < mElem.length; i++) {
					if (typeof (mElem[i]) == 'object')
						Elem.appendChild(mElem[i]);
					else
						Elem.appendChild($t(mElem[i]));
				}
			return Elem;
		}
		;
		function $em(nElem, mElem, att) {
			var Elem = $e(nElem, att);
			return $am(Elem, mElem);
		}
		;
		function offsetPosition(el) {
			var oL = 0, oT = 0;
			do {
				oL += el.offsetLeft;
				oT += el.offsetTop;
			} while (el = el.offsetParent);
			return [ oL, oT ];
		}
		function toNumber(aValue) {
			return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));
		}
		;
		function insertAfter(node, rN) {
			rN.parentNode.insertBefore(node, rN.nextSibling);
		}
		;
		function ajaxNDIV(aR) {
			var ad = $ee('div', aR.responseText,
					[ [ 'style', 'display:none;' ] ]);
			return ad;
		}
		;
		function $ib(node, rN) {
			rN.parentNode.insertBefore(node, rN);
		}
		;
		function dummy() {
			return;
		}
		;
		jsVoid = 'javaScript:void(0)';
		jsNone = 'return false;';
		function esc(str) {
			return str.toString().replace(/@/g, "%40");
		}
		function unesc(str) {
			return str.replace(/%40/g, "@");
		}
		function newOption(node, text, value) {
			node.appendChild($ee('OPTION', text, [ [ 'value', value ] ]));
		}

		function formatTime(secc, aFormat) {
			// aFormat: 0 = h:mm:ss (h = 0->... can be more than 24); 1 = days,
			// h:mm:ss;
			// 2 = h:mm:ss (h = 0->23:59:59 = only time); 3 = h:mm (h = 0->...
			// can be
			// more than 24); 4 = days h:mm; 5 = h:mm
			if (isNaN(secc) || secc === Infinity)
				return '--:--';
			var ht = secc < 0 ? "-" : "";
			var sec = Math.abs(secc);
			var h = Math.floor(sec / 3600);
			var m = Math.floor(sec / 60) % 60;
			var s = parseInt(sec % 60);
			switch (aFormat) {
			case 4:
			case 1:
				var d = Math.floor(h / 24);
				h = h - d * 24;
				if (d > 0)
					ht += d + " ";
				break;
			case 2:
			case 5:
				h = h % 24;
				break;
			}
			ht += h + ":" + (m > 9 ? m : '0' + m);
			if (aFormat < 3)
				ht += ":" + (s > 9 ? s : '0' + s);
			h = null;
			m = null;
			s = null;
			d = null;
			return ht;
		}

		function toSeconds(hTime) {
			var p = hTime.match(/(\d+):(\d+):(\d+)/);
			return p ? (p[1] >= 0 ? 1 : -1)
					* ((Math.abs(p[1]) * 3600) + (p[2] * 60) + (p[3] * 1)) : 0;
		}

		function httpGet(url) {
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, false);
			xhttp.send(null);
			return xhttp.responseText;
		}

		function getRandom(x, y) {
			return x + Math.round(Math.random() * y);
		}

		/** ******************* travian library **************************** */

		function id2xy(vid) {
			var arrXY = new Array;
			var ivid = parseInt(vid);
			arrXY[0] = ((ivid - 1) % 801) - 400;
			arrXY[1] = 400 - Math.floor((ivid - 1) / 801);
			return arrXY;
		}

		function xy2id(x, y) {
			return (1 + (parseInt(x) + 400) + (801 * Math
					.abs(parseInt(y) - 400)));
		}

		function getVid(hr) {
			var vIdH = hr.match(/[&\?][zd]=(\d+)/);
			if (vIdH)
				vId = vIdH[1];
			else {
				vIdH = hr.match(/[&\?]x=(-?\d+)&y=(-?\d+)/);
				vId = vIdH ? xy2id(vIdH[1], vIdH[2]) : 0;
			}
			return vId;
		}

		function getVidFromCoords(txt) {
			var xy = new Array;
			if (/coordinateX/.test(txt)) {
				xy[1] = txt.match(/coordinateX.+?(-?\d{1,3})/)[1];
				xy[2] = txt.match(/coordinateY.+?(-?\d{1,3})/)[1];
			} else
				xy = txt.match(/\((-?\d{1,3})\D+?(-?\d{1,3})\)/);
			return xy ? xy2id(xy[1], xy[2]) : -1;
		}

		function printCoords(vID) {
			var xy = id2xy(vID);
			return '(' + xy[0] + '|' + xy[1] + ')';
		}

		function calcDistance(id1, id2) {
			var myXY = id2xy(id1);
			var dXY = id2xy(id2);
			dX = Math.min(Math.abs(dXY[0] - myXY[0]), Math.abs(801 - Math
					.abs(dXY[0] - myXY[0])));
			dY = Math.min(Math.abs(dXY[1] - myXY[1]), Math.abs(801 - Math
					.abs(dXY[1] - myXY[1])));
			return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		}

		function getTTime(dist, speed, arena, artefact, shoes) {
			var artSp = [ 1, 0.33, 0.5, 0.67, 1.5, 2, 3 ];
			var shK = shoes ? shoes : 0;
			speed *= artSp[artefact];
			var aradius = ver4FL ? 20 : 30;
			if ((arena > 0 || shK > 0) && dist > aradius) {
				return Math.round((dist - aradius)
						/ (speed * (1 + arena * 0.1 + shK)) * 3600 + aradius
						/ speed * 3600);
			} else {
				return Math.round(dist / speed * 3600);
			}
		}

		function getUserID() {
			var uLink = $xf("//div[@id='" + pageElem[0]
					+ "']//a[contains(@href, 'spieler.php')]");
			return (uLink) ? uLink.href.split("uid=")[1] : null;
		}
		;

		var initRes = true;
		function getResources() {
			if (initRes) {
				if (ver4FL)
					try {
						var resources = {};
						eval($xf('//script[contains(text(),"resources.production")]').innerHTML);
					} catch (e) {
						loadVCookie('vPPH', 'village_PPH');
					}
				for ( var i = 0; i < 4; i++) {
					var wholeRes = ver4FL ? $g("l" + (1 + i)) : $g("l"
							+ (4 - i));
					if (!wholeRes)
						return false;
					if (ver4FL) {
						if (typeof resources != 'undefined')
							income[i] = resources.production['l' + (1 + i)];
						else {
							var resT = $g('production');
							if (resT) {
								income[i] = resT.rows[1 + i].cells[2].innerHTML
										.match(/-?\d+/)[0];
							} else {
								income[i] = RB.village_PPH[i];
							}
						}
					} else {
						income[i] = parseInt(wholeRes.getAttribute('title'));
					}
					incomepersecond[i] = income[i] / 3600;
					wholeRes = wholeRes.innerHTML.split("/");
					iresNow[i] = parseInt(wholeRes[0]);
					if (resNow[i] < 0)
						resNow[i] = 0;
					fullRes[i] = parseInt(wholeRes[1]);
				}
				resNow = iresNow.slice();
				initRes = false;
				saveVCookie('vPPH', income.concat(resNow).concat(fullRes)
						.concat(Math.round(RunTime[0] / 1000)));
			} else {
				var tnow = new Date().getTime();
				for ( var i = 0; i < 4; i++) {
					resNow[i] = Math.round(((tnow - RunTime[0]) / 1e3)
							* incomepersecond[i] + iresNow[i]);
					if (resNow[i] > fullRes[i])
						resNow[i] = fullRes[i];
					if (resNow[i] < 0)
						resNow[i] = 0;
				}
			}
			return true;
		}

		function getServerTime() {
			if (loadServerTime == 0)
				loadServerTime = toSeconds($g('tp1').innerHTML);
			return loadServerTime
					+ Math.round(((new Date().getTime()) - RunTime[0]) / 1e3);
		}

		function getTimeOffset() {
			return (new Date().getHours())
					- parseInt($g('tp1').innerHTML.match(/\d+/)[0]);
		}

		function absTime(time, stime) {
			var serverTime = stime || getServerTime();
			var tTime = Math.abs(time) + serverTime;
			if (Math.abs(time) < 86400)
				if (tTime > 86400)
					tTime -= 86400;
			return tTime;
		}

		function $eT(tO, time, ft, att) { // tO-type of Object, time -
			// relative time,
			// ft - time format, att - attributes
			var tTime = absTime(time);
			var dstr = tTime > 86400 ? (new Date(
					(Math.abs(time) + getTimeOffset() * 3600) * 1e3
							+ (new Date().getTime()))).toDateString()
					+ ' ' : '';
			var att2 = [ [ 'title', dstr + formatTime(tTime, 2) ] ];
			if (att !== undefined)
				att2 = att.concat(att2);
			return $ee(tO, formatTime(time, ft), att2);
		}

		function showRunTime() {
			var ltime = $g(pageElem[6]);
			if (!(ltime)) {
				ltime = $ee(
						'DIV',
						$e('BR'),
						[ [
								'style',
								'position:absolute; left:'
										+ (ltr ? 10
												: document.body.clientWidth - 100)
										+ 'px;top:'
										+ (xyBody[1] + 2)
										+ 'px;color:black;background-color:cyan;padding:1px 5px;border-radius: 2em;' ] ]);
				document.body.appendChild(ltime);
			} else if (!ver4FL)
				ltime.style.margin = "0px 20px";
			RunTime[1] = new Date().getTime();
			var fts = " RB:<b>" + (RunTime[1] - RunTime[0]);
			// fts += "</b>/<b>" + (RunTime[1]-RunTime[2]);
			// fts += "</b>/<b>" + (RunTime[3]-RunTime[2]);
			ltime
					.insertBefore($ee("span", fts + "</b>ms"),
							$gt('br', ltime)[0]);
		}

		/** *********** CSS & ID **************** */

		var allIDs = [ 'mbuyf', // 0-mbuyf
		'resoursebar', // 1-resourcebar
		'progressbar', // 2-progressbar (class)
		'rb_tooltip', // 3-rb_tooltip
		'flDIV', // 4-flDIV (class)
		'newDd', // 5-newDd (class)
		'RBSetup', // 6-RBSetup
		'gnTable', // 7-gnTable (class)
		'rbOverview', // 8-rbOverview
		'rbLinks', // 9-rbLinks
		'pbOview', // 10-pbOview(123) (class)
		'rb_sum', // 11-rb_sum
		'rb_sum2', // 12-rb_sum2
		'redLine', // 13-redLine (class)
		'flDIV', // 14-flDIV(num)
		'buttons', // 15- buttons (class)
		'progressbar-completed', // 16-progressbar-completed
		'rbOtime', // 17-rbOtime
		'sf', // 18-sf
		'bordered', // 19-bordered
		'total', // 20-total
		'invisT', // 21-invisT
		'audio', // 22-audio alerts
		'attAlert', // 23-attack alert
		'FreezePaneOff', // 24-FreezePaneOff (class)
		'FreezePaneOn', // 25-FreezePaneOn (class)
		'InnerFreezePane', // 26-InnerFreezePane
		'FreezePane', // 27-FreezePane
		'alarmClock', // 28-alarmClock
		'existT', // 29-mark for links (class)
		'res_sum', // 30-res_sum
		'ww_res_sum', // 31-ww_res_sum
		/* images */

		'hide', // 32-img_hide (class)
		'car', // 33- cargo
		'def', // 34- defender
		'att', // 35- attack
		'igm', // 36- igm
		'info', // 37- user info
		'edit', // 38- edit
		'del', // 39- delete
		'clipin', // 40- clip in
		'clipout', // 41- clip out
		/* no images */

		'TMbuildingtags', // 42- (class)
		'tm_uplevel', // 43- (class) - now vacant!
		'marketWW', // 44- template for merchant-tables (id)
		'mrgn', // 45- padding for image
		'selected', // 46- selected elements
		'tinfo', // 47- img_tinfo
		'vl' // 48- village list icons
		];

		// RunTime[2] = new Date().getTime();
		function randomizeIDs() {
			function replacer(n) {
				return rtStr[parseInt(n)];
			}
			// 0 1 2 3 4 5 6 7 8 9
			var rtStr = [ 'd', 'h', 'w', 'l', 'y', 'm', 't', 'a', 'b', 'i' ];
			var UUIDs = '';
			for ( var i = 0; i < allIDs.length; i++) {
				do {
					var rID_num = (Math.round(Math.random()
							* Math.pow(10, Math.random() * 3 + 5) + 1e3))
							.toString();
					var rID = rID_num.replace(/\d/g, replacer);
					var Rej = new RegExp(rID);
				} while (Rej.test(UUIDs))
				UUIDs += rID + ',';
				allIDs[i] = rID;
			}
		}
		randomizeIDs();
		// RunTime[3] = new Date().getTime();

		acss = "table#"
				+ allIDs[0]
				+ " {width:100%; border-collapse:collapse; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}"
				+ "table#"
				+ allIDs[0]
				+ " td {background-color:transparent; border:1px solid silver; padding:2px;}"
				+ "table#"
				+ allIDs[0]
				+ " td."
				+ allIDs[18]
				+ " {background-color:#FFE4B5;}"
				+ "table#"
				+ allIDs[1]
				+ " {border-collapse:collapse; text-align:left; background-color:white; padding:0px; margin:0px;}"
				+ "table#"
				+ allIDs[1]
				+ " tr {height:18px;border-collapse:collapse; text-align:left;}"
				+ "table#"
				+ allIDs[1]
				+ " td {font-size:8pt;overflow:visible;white-space:nowrap;background-color:transparent; border:1px solid silver; padding:0px;}"
				+ "table#"
				+ allIDs[1]
				+ " td."
				+ allIDs[11]
				+ " {font-size:8pt;background-color:#FFFFAF; text-align:right;}"
				+ "table#"
				+ allIDs[1]
				+ " td."
				+ allIDs[12]
				+ " {background-color:#FFFFAF;height:18px; text-align:center; font-size:11px;}"
				+ "table#"
				+ allIDs[1]
				+ " th {border:1px solid silver;height:18px;text-align:left;direction:ltr;white-space:nowrap;}"
				+ "table#"
				+ allIDs[1]
				+ " th a {color:black; font-size:11px; "
				+ (ver4FL ? ""
						: 'font-family: "Arial", "Helvetica", "Verdana", sans-serif;')
				+ "}"
				+ "."
				+ allIDs[2]
				+ " {width: 200px; }"
				+ "div#"
				+ allIDs[3]
				+ " {position:absolute;z-index:10000;border:1px solid silver;text-align:center;background-color:#FFFFE0;}"
				+ "."
				+ allIDs[4]
				+ " {position:absolute;border:1px solid silver;text-align:center;background-color:yellow;border-radius:5px;}"
				+ "."
				+ allIDs[5]
				+ " {width:100%;height:6px;text-align:center;background-color: #D0D0FF;cursor:move;font-size:6pt;}"
				+ "table#"
				+ allIDs[6]
				+ " {width:auto;border-collapse:collapse; text-align:left; background-color:#F0F0F0; margin:1px;}"
				+ "table#"
				+ allIDs[6]
				+ " td {background-color:transparent; border:1px solid silver; padding:2px;}"
				+ "table#"
				+ allIDs[6]
				+ " td input {width:150px;text-align:right}"
				+ "."
				+ allIDs[7]
				+ " {width:auto;border-collapse:collapse; text-align:left; background-color:transparent; margin:1px;}"
				+ "."
				+ allIDs[7]
				+ " td {background-color:transparent; border:1px solid silver; padding:0px 2px;text-align:right;}"
				+ "."
				+ allIDs[7]
				+ " td img {margin:0px 3px;}"
				+ "table#"
				+ allIDs[8]
				+ " {min-width:350px;width:auto;border-collapse:collapse; text-align:left; background-color:#F8F8F8; margin:1px;}"
				+ "table#"
				+ allIDs[8]
				+ " tr {border-collapse:collapse; text-align:left;} table#"
				+ allIDs[8]
				+ " tbody tr:hover {background-color:#E5E5F0;}"
				+ "table#"
				+ allIDs[8]
				+ " td {overflow:visible;white-space:nowrap;background-color:transparent;padding:0px 5px 1px;}"
				+ "table#"
				+ allIDs[8]
				+ " td a {color:black;} table#"
				+ allIDs[8]
				+ " thead td {text-align:center;}"
				+ "table#"
				+ allIDs[8]
				+ " td."
				+ allIDs[17]
				+ " {text-align:right;font-size:8pt;}"
				+ "table#"
				+ allIDs[8]
				+ " td."
				+ allIDs[10]
				+ " {font-size:11px;width:54px;border:1px solid silver;background-color:transparent;padding:0px;}"
				+ "table#"
				+ allIDs[9]
				+ " {width:auto;border-collapse:collapse; background-color:white; margin:0px;}"
				+ "table#"
				+ allIDs[9]
				+ " tr {border-collapse:collapse;} table#"
				+ allIDs[9]
				+ " tbody tr:hover {background-color:#E5E5F0;}"
				+ "table#"
				+ allIDs[9]
				+ " td {white-space:nowrap;text-align:left;background-color:transparent;padding:0px 5px 1px;}"
				+ "table#"
				+ allIDs[9]
				+ " thead td {font-weight:bold;color:#3C3C3C;} table#"
				+ allIDs[9]
				+ " a {font-size:12px;"
				+ (ver4FL ? "color:#252525;font-weight:normal;" : "")
				+ "}"
				+ "."
				+ allIDs[10]
				+ "1 {width:100%;background-color:"
				+ bgcolor[0]
				+ ";float:left;margin:0px; display:inline;padding:0px 2px;}"
				+ "."
				+ allIDs[10]
				+ "2 {width:100%;background-color:"
				+ bgcolor[1]
				+ ";float:left;margin:0px; display:inline;padding:0px 2px;}"
				+ "."
				+ allIDs[10]
				+ "3 {width:100%;background-color:"
				+ bgcolor[2]
				+ ";float:left;margin:0px; display:inline;padding:0px 2px;}"
				+
				/* "table#vlist {border-collapse:collapse;}" + */"table#vlist tbody td {background-color:transparent;} table#vlist tr:hover {background-color:#E5E5F0;}"
				+ "."
				+ allIDs[13]
				+ " {width:100%; border-collapse:collapse; border:1px solid silver;margin-bottom:15px;} ."
				+ allIDs[13]
				+ " td{text-align:center; background-color:#FFC0C0; padding:1px; margin:1px;}"
				+ "."
				+ allIDs[19]
				+ " {border:1px solid silver; text-align:right;}"
				+ "tbody."
				+ allIDs[20]
				+ " {background-color:#F8FFEE;} tbody."
				+ allIDs[20]
				+ " td {background-color:transparent;text-align:center;} tbody."
				+ allIDs[20]
				+ " th {background-color:transparent;}"
				+ "."
				+ allIDs[21]
				+ " {border-collapse:collapse;background-color:transparent;} ."
				+ allIDs[21]
				+ " td {background-color:transparent;}"
				+ "button."
				+ allIDs[15]
				+ " {color:black;border-width:2px;border-style:outset;border-color:#C6B7A2;background-color:#C6B7A2;padding:0px 5px;margin:1px 2px;}"
				+ "."
				+ allIDs[24]
				+ " { visibility:hidden; display:none; position:absolute; top:-100px; left:-100px; }"
				+ "."
				+ allIDs[25]
				+ " { position:absolute; top:0px; left:0px; visibility:visible; display:block; width:100%; height:100%; background-color: black; z-index: 20000; opacity:0.7; padding-top: 20%; }"
				+ "."
				+ allIDs[26]
				+ " { text-align:center; width:66%; background-color:#000015; color:white; font-size:large; border:dashed 2px #FF00AA; padding:9px; } ."
				+ allIDs[26]
				+ " button {color:white;}"
				+ "span."
				+ allIDs[29]
				+ " { visibility:hidden; display:none; }"
				+ "."
				+ allIDs[42]
				+ " {background-image:none !important; background-color:white; border:thin solid #000000; padding-top: 3px; border-radius: 2em; -moz-border-radius: 2em;"
				+ "font: normal normal 600 "
				+ (ver4FL ? "14px/16px Arial"
						: "12px/16px Verdana,Arial,Helvetica,sans-serif !important; z-index:19; text-align:center; position:absolute; visibility:hidden")
				+ "; line-height:16px !important; width:22px !important; height:19px !important;}"
				+ "table#"
				+ allIDs[31]
				+ " td a {color:black;font-weight:normal;}"
				+ "."
				+ allIDs[32]
				+ " { padding:0px 2px;cursor:pointer;height:11px;width:12px;background: url("
				+ img_hide + ") no-repeat 0px 0px; }" + "." + allIDs[33]
				+ " { height:12px;width:18px;background: url(" + img_car
				+ ") no-repeat 0px 0px; }" + "." + allIDs[34]
				+ " { height:12px;width:18px;background: url(" + img_def
				+ ") no-repeat 0px 0px; }" + "." + allIDs[35]
				+ " { height:12px;width:18px;background: url(" + img_att
				+ ") no-repeat 0px 0px; }" + "." + allIDs[36]
				+ " { height:8px;width:11px;background: url(" + img_igm
				+ ") no-repeat 0px 0px;margin:0px 3px; }" + "." + allIDs[37]
				+ " { height:10px;width:12px;background: url(" + img_info
				+ ") no-repeat 0px 0px;margin:0px 3px; }" + "." + allIDs[38]
				+ " { height:12px;width:16px;background: url(" + img_edit
				+ ") no-repeat 0px 0px;cursor:pointer; }" + "." + allIDs[39]
				+ " { height:12px;width:16px;background: url(" + img_del
				+ ") no-repeat 0px 0px;cursor:pointer; }" + "." + allIDs[47]
				+ " { height:12px;width:12px;background: url(" + img_tinfo
				+ ") no-repeat 0px 0px;margin:0px 5px; }" + "img." + allIDs[45]
				+ " {margin:0px 3px;} ." + allIDs[46]
				+ " * {background-color:#ECECEC !important;}";

		if (/karte|position/.test(crtPath))
			acss += "." + allIDs[40]
					+ " { height:12px;width:16px;background: url(" + img_clipIn
					+ ") no-repeat 0px 0px;cursor:pointer; }" + "."
					+ allIDs[41] + " { height:12px;width:16px;background: url("
					+ img_clipOut + ") no-repeat 0px 0px;cursor:pointer; }";

		if (ver4FL)
			acss += "table#vlist td{padding:0;line-height:16px;text-align:"
					+ docDir[0]
					+ ";white-space:nowrap;}table#vlist thead td{background-color:#FFF;height:22px;text-align:center;padding:0px 3px;}"
					+ "table#vlist td.dot{width:10px;padding:0 3px;}table#vlist td.link{padding-right:10px;}table#vlist thead td a{font-weight:bold;color:#3C3C3C;}"
					+ "table#vlist tbody td{font-size:12px;padding:0 2px;}table#vlist td.hl{color:#FF8000;}table#vlist td.link{font-size:14px;}table#vlist {border-collapse:collapse;}"
					+ "table#vlist td a{font-weight:normal;color:#252525;}table#vlist td a.active{font-weight:bold;color:#252525;}"
					+ // #FF8000;
					"div#build.gid17 table.send_res td {padding:2px 3px;} div.alliance table#offs td.sub div {"
					+ (ltr ? "padding-left" : "padding-right")
					+ ":44px;}"
					+ "div.subjectWrapper {width:95% !important; margin-"
					+ docDir[0]
					+ ";"
					+ docDir[0]
					+ ":16px;} div.reports table#overview td.sub .iReport {position:relative;"
					+ docDir[0]
					+ ":-4px;}"
					+ "td.coords,th.coords a{white-space:normal !important;} #side_info .listing ul li:hover a {background-color:white;} #side_info .listing ul {padding-"
					+ docDir[1]
					+ ":16px;}"
					+ "span."
					+ allIDs[48]
					+ " {position:relative;float:"
					+ docDir[1]
					+ ";margin-top:-17px;padding-top:3px;height:15px;background-color:#F7EBBE;} span."
					+ allIDs[48]
					+ " a {display:inline !important;margin:0px !important;}";

		GM_addStyle(acss);

		/** ***********tooltips elements**************** */
		function makeTooltip(ttObj) {
			var ttD = $g(allIDs[3]);
			if (!ttD) {
				ttD = $e('DIV', [ [ 'id', allIDs[3] ] ]);
				document.body.appendChild(ttD);
				document.addEventListener("mousemove", updateTooltip, false);
			}
			ttD.appendChild(ttObj);
			return ttD;
		}
		function removeTooltip() {
			var ttD = $g(allIDs[3]);
			if (ttD) {
				document.removeEventListener("mousemove", updateTooltip, false);
				document.body.removeChild(ttD);
				timerP.length = lastTimerP[0];
				timerB.length = lastTimerB;
			}
		}
		function updateTooltip(e) {
			updatePosition(allIDs[3], [ e.pageX, e.pageY ]);
		}
		function updatePosition(wn, xy, sh) {
			var ttD = $g(wn);
			if (!ttD)
				return;
			var dW = ttD.clientWidth;
			var dH = ttD.clientHeight;
			var y = xy[1] + 8;
			if (sh) {
				var x = RB.XY[sh * 2];
			} else {
				var x = xy[0] + 8;
				if (x + dW > window.innerWidth + window.scrollX)
					x = x > dH + 16 ? x - dW - 16 : 0;
			}
			ttD.style.left = x + "px";
			if (y + dH > window.innerHeight + window.scrollY)
				y = y > dH + 16 ? y - dH - 16 : 0;
			ttD.style.top = y + "px";
		}
		;
		function addToolTip(newITT, nd) {
			if (newITT) {
				tiImg = trImg(allIDs[47]);
				tiImg.addEventListener("mouseover", function() {
					makeTooltip(newITT);
				}, false);
				tiImg.addEventListener("mouseout", removeTooltip, false);
				nd.appendChild(tiImg);
			}
		}
		/** ***********drag elements**************** */
		var dragMaster = (function() {
			var dragObject;
			var mouseOffset;
			var mouseDownAt;
			function getMouseOffset(target, e) {
				var docPos = offsetPosition(target);
				return {
					x : e.pageX - docPos[0],
					y : e.pageY - docPos[1]
				};
			}
			function mouseUp() {
				if (mouseDownAt) {
					mouseDownAt = null;
				} else {
					savePosition(dragObject);
					dragObject = null;
				}
				document.removeEventListener('mousemove', mouseMove, true);
				document.removeEventListener('mouseup', mouseUp, true);
			}
			function mouseMove(e) {
				if (mouseDownAt)
					if (Math.abs(mouseDownAt.x - e.pageX) < 10
							&& Math.abs(mouseDownAt.y - e.pageY) < 10)
						return;
				with (dragObject.style) {
					position = 'absolute';
					top = e.pageY - mouseOffset.y + 'px';
					left = e.pageX - mouseOffset.x + 'px';
				}
				mouseDownAt = null;
				return false;
			}
			function mouseDown(e) {
				if (e.which != 1)
					return;
				dragObject = this.parentNode;
				mouseOffset = getMouseOffset(this, e);
				mouseDownAt = {
					x : e.pageX,
					y : e.pageY,
					dragObject : this
				};
				document.addEventListener('mousemove', mouseMove, true);
				document.addEventListener('mouseup', mouseUp, true);
				return false;
			}
			return {
				makeDraggable : function(element) {
					element.addEventListener('mousedown', mouseDown, true);
				}
			}
		}())
		/** ********end**drag elements**************** */

		function savePosition(objName) {
			objNum = parseInt(objName.id.match(/\d+$/)[0]);
			if (objNum > 20)
				return;
			RB.XY[objNum * 2] = objName.style.left.match(/^\d+/)[0];
			RB.XY[objNum * 2 + 1] = objName.style.top.match(/^\d+/)[0];
			saveCookie('xy', 'XY');
		}

		var divSN = 100;
		function makeFloat(flObj, ix, iy, sid) {
			flId = sid !== undefined ? sid : ++divSN;
			var zindex = 5999;
			switch (flId) {
			case 4:
				zindex = 9999;
				break;
			case 21:
				zindex = 10001;
				break;
			}
			bd = $e('div', [
					[ 'id', allIDs[14] + flId ],
					[ 'class', allIDs[4] ],
					[
							'style',
							'left:' + ix + 'px;top:' + iy + 'px;z-index:'
									+ zindex + ';' ] ]);
			bdr = $ee('div', '', [ [ 'class', allIDs[5] ],
					[ 'onmousedown', jsNone ] ]);
			bd.appendChild(bdr);
			bd.appendChild(flObj);
			document.body.appendChild(bd);
			dragMaster.makeDraggable(bdr);
			return allIDs[14] + flId;
		}

		function makeFloatD(flObj, mNum) {
			var ix = RB.XY[mNum * 2] < 1 ? 1 : RB.XY[mNum * 2];
			var iy = RB.XY[mNum * 2 + 1] < xyBody[1] ? xyBody[1]
					: RB.XY[mNum * 2 + 1];
			return makeFloat(flObj, ix, iy, mNum);
		}

		function closeWindowN(num) {
			if (windowID[num] == undefined)
				return false;
			var wo = $g(windowID[num]);
			if (!wo)
				return false;
			wo.parentNode.removeChild(wo);
			windowID[num] = undefined;
			return true;
		}

		function bodyHide(body) {
			if (body[0].getAttribute('style', 2) === null) {
				body[0].setAttribute('style', 'display:none');
				RB.bodyH[body[1]] = 1;
				if (body[2])
					body[2].style.backgroundPosition = '0px -12px';
			} else {
				body[0].removeAttribute('style');
				RB.bodyH[body[1]] = 0;
				if (body[2])
					body[2].removeAttribute('style');
			}
			saveCookie('bodyH', 'bodyH');
		}

		/** ************************ build pages *************************** */

		// begin Travian - add needed resources automatically under
		// build/upgrade link
		function needed_show(base) {
			function saveWantsMem(wantsResM) {
				var noplace = '';
				var ofFL = false;
				for ( var i = 0; i < 4; i++)
					if (wantsResM[i + 5] > fullRes[i])
						ofFL = true;
				if (ofFL) {
					noplace = gtext("noplace");
					if (wantsResM[4] != village_aid)
						RB.wantsMem = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
				} else
					RB.wantsMem = wantsResM.slice();
				RB.wantsMem[4] = village_aid;
				saveCookie('Mem', 'wantsMem');
				alert(noplace + "\nSaved: " + RB.wantsMem[0] + " | "
						+ RB.wantsMem[1] + " | " + RB.wantsMem[2] + " | "
						+ RB.wantsMem[3]);
			}
			function showPlusTimer() {
				var j = timerB.length;
				timerB[j] = new Object();
				timerB[j].time = Math.abs(Math.round(wantsRes
						/ incomepersecond[e]));
				timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
				return timerB[j].obj;
			}

			var neededRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
			wfl = false;
			var wantsResMem = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			var wantsResMemP = RB.wantsMem.slice();

			var forNPC = [ 0, 0 ];
			var beforeThis = $e('DIV');
			for ( var e = 0; e < 4; e++) {
				wantsResMem[e + 5] = parseInt(neededRes[e + 1]);
				wantsResMemP[e + 5] = parseInt(wantsResMemP[e + 5])
						+ wantsResMem[e + 5];
				var wantsRes = resNow[e] - wantsResMem[e + 5];
				var wantsResP = resNow[e] - wantsResMemP[e + 5];
				if (wantsResP < 0)
					wantsResMemP[e] = Math.abs(wantsResP);
				forNPC[0] += wantsRes;
				forNPC[1] += incomepersecond[e];
				beforeThis.appendChild(trImg('r' + (e + 1)));
				if (wantsRes >= 0) {
					if (income[e] < 0)
						beforeThis.appendChild($em('SPAN', [
								'+' + wantsRes + ' (', showPlusTimer(), ') ' ],
								[ [ 'style', 'color:green;' ] ]));
					else
						beforeThis.appendChild($ee('SPAN',
								'+' + wantsRes + ' ', [ [ 'style',
										'color:green;' ] ]));
				} else {
					beforeThis
							.appendChild($em('SPAN',
									[
											wantsRes + ' (',
											(income[e] > 0 ? showPlusTimer()
													: '--:--'), ') ' ], [ [
											'style', 'color:red;' ] ]));
					wantsResMem[e] = Math.abs(wantsRes);
					wfl = true;
				}
			}
			if (RB.Setup[11] > 0 && forNPC[0] < 0) {
				var j = timerB.length;
				timerB[j] = new Object();
				timerB[j].time = Math.abs(Math.round(forNPC[0] / forNPC[1]));
				timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
				beforeThis.appendChild($em('SPAN', [ '(',
						trImg('npc_inactive'), ' ', timerB[j].obj, ') ' ]));
			}
			var memP = $a('(M)', [ [ 'href', jsVoid ] ]);
			memP.addEventListener('click', function(x) {
				return function() {
					saveWantsMem(x);
				}
			}(wantsResMem), 0);
			beforeThis.appendChild(memP);
			if (RB.wantsMem[4] == village_aid) {
				var memP = $a(' (M+)', [ [ 'href', jsVoid ] ]);
				memP.addEventListener('click', function(x) {
					return function() {
						saveWantsMem(x);
					}
				}(wantsResMemP), 0);
				beforeThis.appendChild(memP);
			}

			return beforeThis;
		}

		function convertCoordsInMessagesToLinks() {
			var cM = $xf("//div[@*='message']");
			if (cM) {
				var arXY = [];
				var iHTML = cM.innerHTML;
				var iHTML2 = iHTML;
				var j = 0;
				var villageLink = [];
				var Rej = /<a.+?\/a>/gi; // new Travian IGM extended tags
				while ((arXY = Rej.exec(iHTML)) != null) {
					var mLink = arXY[0];
					villageLink[j] = "<span>" + mLink + "</span>";
					iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
				}
				var Rej = /(https?:\/\/[\S]+)(<.*>|$| )+?/gi; // URLs
				while ((arXY = Rej.exec(iHTML)) != null) {
					var mLink = arXY[1].match(/(.*?)(?:\.|,|<|\))?$/)[1];
					villageLink[j] = "<span><a target='_blank' href='" + mLink
							+ "'>" + mLink + "</a></span>";
					iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
				}
				var Rej = /[\/:]?(-?\d+)(?:<.+?>)?\s*?([\|\/\\ ])?(?:<.+?>)?\s*?(-?\d+)(?![\$\/%\d:])/g;
				while ((arXY = Rej.exec(iHTML)) != null) {
					if (/^[\/:]/.test(arXY[0]))
						continue;
					if (!(arXY[2] != undefined || arXY[3] < 0))
						continue;
					if (Math.abs(arXY[1]) > 400 || Math.abs(arXY[3]) > 400)
						continue;
					villageLink[j] = "<span><a href='karte.php?"
							+ (ver4FL ? "x=" + arXY[1] + "&y=" + arXY[3] : "z="
									+ xy2id(arXY[1], arXY[3])) + "'>" + arXY[0]
							+ "</a></span>";
					iHTML2 = iHTML2.replace(arXY[0], "<#!" + (j++) + "/>");
				}
				for ( var i = 0; i < j; i++) {
					iHTML2 = iHTML2.replace("<#!" + i + "/>", villageLink[i]);
				}
				villageLink.length = 0;
				cM.innerHTML = iHTML2;
				var mLinks = $xf('.//span/a', 'l', cM);
				for ( var i = 0; i < mLinks.snapshotLength; i++) {
					distanceTooltip(mLinks.snapshotItem(i), 0);
					sendResTropAdd(mLinks.snapshotItem(i), 1);
					linkHint(mLinks.snapshotItem(i));
				}
			}
		}

		/** *********************** cookie *************************** */

		var cookieDelim = [ [ ")\\.([-\\.\\d]+)", '.', '/' ],
				[ ")@_(.*?)@#_", '@_', '@#_' ] ];

		function loadVCookie(nameCoockie, contentCookie, vID, cType) {
			var cvID = vID || village_aid;
			var cvT = cType || 0;
			var RCookie = GM_getValue(GMcookieID + nameCoockie, '');
			var Rej = new RegExp("(" + cvID + cookieDelim[cvT][0]);
			var oneCookie = RCookie.match(Rej);
			if (cvT == 1)
				RB[contentCookie].length = 0;
			if (oneCookie != undefined) {
				var cookieValue = oneCookie[2].split(cookieDelim[cvT][1]);
				var sI = cvT == 0 ? 0 : 1;
				var contentLength = cvT == 0 ? RB[contentCookie].length
						: cookieValue[0].length == 0 ? 0
								: parseInt(cookieValue[0]);
				for ( var j = 0; j < contentLength; j++) {
					RB[contentCookie][j] = cookieValue[j + sI] == undefined ? 0
							: cvT == 0 ? parseInt(cookieValue[j])
									: unesc(cookieValue[j + sI]);
				}
			} else
				for ( var j = 0; j < RB[contentCookie].length; j++)
					RB[contentCookie][j] = 0;
		}

		function loadZVCookie(nameCoockie, contentCookie, vID) {
			var cvID = vID || village_aid;
			loadVCookie(nameCoockie, contentCookie, vID, 1);
			if (RB[contentCookie].length == 0)
				RB[contentCookie][0] = 0;
		}

		function saveVCookie(nameCoockie, contentCookie, cType) {
			var newCookie = '';
			var cvT = cType || 0;
			var oldCookie = GM_getValue(GMcookieID + nameCoockie, '');
			for ( var i = 0; i < villages_count; i++) {
				newCookie += villages_id[i] + cookieDelim[cvT][1];
				if (villages_id[i] == village_aid) {
					if (cvT == 1)
						newCookie += contentCookie.length + cookieDelim[cvT][1];
					for ( var j = 0; j < contentCookie.length; j++) {
						if (contentCookie[j] !== undefined)
							newCookie += esc(contentCookie[j])
									+ cookieDelim[cvT][1];
					}
				} else {
					var Rej = new RegExp("(" + villages_id[i]
							+ cookieDelim[cvT][0]);
					var oldOneCookie = oldCookie.match(Rej);
					if (oldOneCookie != undefined)
						newCookie += oldOneCookie[2];
				}
				newCookie += cookieDelim[cvT][2];
			}
			GM_setValue(GMcookieID + nameCoockie, newCookie);
		}

		function saveCookie(nameCoockie, contentCookie) {
			var newCookie = '';
			for ( var j = 0; j < RB[contentCookie].length; j++)
				newCookie += RB[contentCookie][j] + '@_';
			GM_setValue(GMcookieID + nameCoockie, newCookie);
		}

		function loadCookie(nameCoockie, contentCookie) {
			var RCookie = GM_getValue(GMcookieID + nameCoockie, '');
			if (RCookie != '') {
				var cookieValue = RCookie.split('@_');
				for ( var j = 0; j < RB[contentCookie].length; j++)
					if (cookieValue[j] !== undefined)
						if (cookieValue[j].length > 0)
							RB[contentCookie][j] = cookieValue[j];
			}
		}

		function saveOVCookie(nameCoockie, contentCookie) {
			var newCookie = '';
			for ( var i = 0; i < villages_id.length; i++)
				if (contentCookie[villages_id[i]] !== undefined)
					if (contentCookie[villages_id[i]].length > 0)
						newCookie += villages_id[i] + cookieDelim[1][1]
								+ esc(contentCookie[villages_id[i]])
								+ cookieDelim[1][2];
			GM_setValue(GMcookieID + nameCoockie, newCookie);
		}

		function saveODCookie(nameCoockie, contentCookie) {
			var newCookie = '';
			for ( var i = 0; i < linkVSwitch.length; i++) {
				var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
				if (contentCookie[nd] !== undefined)
					newCookie += nd + cookieDelim[1][1] + contentCookie[nd]
							+ cookieDelim[1][2];
			}
			GM_setValue(GMcookieID + nameCoockie, newCookie);
		}

		function loadOVCookie(nameCoockie, contentCookie) {
			var RCookie = GM_getValue(GMcookieID + nameCoockie, '');
			var oneCookie = [];
			var cCount = 0;
			var Rej = new RegExp("(\\d+" + cookieDelim[1][0], 'g');
			while ((oneCookie = Rej.exec(RCookie)) != null) {
				RB[contentCookie][oneCookie[1]] = unesc(oneCookie[2]);
				cCount++;
			}
			return cCount;
		}

		function loadAllCookie() {
			loadVCookie('Dorf2', 'village_Dorf2');
			loadVCookie('VV', 'village_Var');
			loadCookie('OV', 'overview');
			loadCookie('Mem', 'wantsMem');
			loadCookie('DictTR', 'dictTR');
			loadCookie('AS', 'serversAN');

			if (lMap != '' && lMap != RB.dictionary[15]) {
				RB.dictionary[15] = lMap;
				saveCookie('Dict', 'dictionary');
			}
			// if( ! /^1\.6\./.test(RB.Setup[0]) ) RB.Setup = RB.dSetup.slice();
			// else
			// RB.Setup[0] = version;
		}

		/**
		 * *********************** distance calculation
		 * **************************
		 */

		var TTime = [ [ 19, [ 24 ] ], // Theutates Thunder
		[ 17, [ 23 ] ], // Pathfinder
		[ 16, [ 4, 25 ] ], // Equites Legati, Druidrider
		[ 14, [ 5 ] ], // Equites Imperatoris
		[ 13, [ 26 ] ], // Haeduan
		[ 10, [ 6, 15 ] ], // Equites Caesaris, Paladin
		[ 9, [ 14, 16 ] ], // Scout
		[ 7, [ 3, 11, 12, 21 ] ], // Imperian, Clubswinger, Spearman, Phalanx
		[ 6, [ 1, 13, 22 ] ], // Legionnaire, Axeman, Swordsman
		[ 5, [ 2, 10, 20, 29, 30 ] ], // Praetorian, Settler, Chieftain
		[ 4, [ 7, 9, 17, 19, 27 ] ], // Battering Ram, Senator, Ram, Chief,
		// Ram
		[ 3, [ 8, 18, 28 ] ] // Fire Catapult, Catapult, Trebuchet
		];
		var MTime = [ 16, 12, 24 ];

		function showAllTTime(vType, tVil, arena, art, shoes) {
			function appendTTime(htt) {
				var htg = formatTime(htt, 0);
				newTR.appendChild($c(htg));
				return htt;
			}
			function appendTime() {
				htf = absTime(ht);
				timerP[t] = new Object();
				timerP[t].time = htf;
				timerP[t].obj = $c(formatTime(htf, 1));
				newTR.appendChild(timerP[t++].obj);
				newTABLE.appendChild(newTR);
			}

			var artefact = art || RB.Setup[3];
			var shK = shoes || 0;
			var newTABLE = $e('TABLE', [ [ 'class', allIDs[7] ] ]);
			var serverTime = getServerTime();
			var tR = vType < 1 ? parseInt(RB.Setup[2]) + 1 : 0; // troop race

			var t = lastTimerP[0];
			timerP.length = t;
			if (typeof (tVil) != 'object') {
				var distance = calcDistance(tVil, village_aid);
				if (ver4FL) {
					var xy = id2xy(tVil);
					var nL = $a(printCoords(tVil), [
							[
									'href',
									'position_details.php?x=' + xy[0] + '&y='
											+ xy[1] ],
							[ 'style', 'color:#252525;' ] ]);
				} else
					var nL = $a(printCoords(tVil), [
							[ 'href', 'karte.php?z=' + tVil ],
							[ 'style', 'color:#252525;' ] ]);
				nL.appendChild($e('SPAN', [ [ 'class', allIDs[29] ] ]));
				var newTR = $ee('TR', $c(nL, [ [ 'style',
						'font-weight:bold;direction:' + coordDir + ';' ] ]));
			} else {
				var distance = calcDistance(tVil[0], tVil[1]);
				var newTR = $ee('TR', $c('----'));
			}
			newTR.appendChild($c(' &lt;-&gt; '
					+ parseFloat(distance.toFixed(2)), [ [ 'colspan',
					(tR > 0 ? 2 : 4) ] ]));
			newTABLE.appendChild(newTR);

			if (distance > 0) {
				if (vType < 2) {
					var newTR = $e('TR');
					var ht = appendTTime(getTTime(distance,
							MTime[parseInt(RB.Setup[2])] * sM, 0, 0));
					var attr = vType < 1 ? undefined : [ [ 'colspan', 3 ] ];
					newTR.appendChild($c(trImg(allIDs[33], RB.dictionary[2]),
							attr));
					appendTime();
				}
				if (vType > -1) {
					if (ver4FL) {
						var newTR = $e('TR');
						var ht = appendTTime(getTTime(distance, RB.dictFL[19],
								arena, 0));
						var attr = vType < 1 ? undefined : [ [ 'colspan', 3 ] ];
						newTR.appendChild($c(trImg('unit uhero'), attr));
						appendTime();
					}
					for ( var i = 0; i < TTime.length; i++) {
						var newTR = $e('TR');
						var ht = appendTTime(getTTime(distance, TTime[i][0]
								* sK, arena, parseInt(artefact), shK));
						var j = 0;
						var fl = tR ? false : true;
						for ( var k = 0; k < 3; k++) {
							var fl2 = tR ? false : true;
							var newTD = $e('TD');
							while (TTime[i][1][j] < (11 + 10 * k)) {
								if (Math.ceil((TTime[i][1][j]) / 10) == tR) {
									fl = true;
									fl2 = true;
								}
								newTD.appendChild(trImg('unit u'
										+ TTime[i][1][j],
										RB.dictTR[TTime[i][1][j++]]));
							}
							if (fl2)
								newTR.appendChild(newTD);
						}
						if (fl) {
							appendTime();
						}
					}
				}
			}
			lastTimerP[1] = t;
			return newTABLE;
		}

		function distanceTooltipGen(e) {
			makeTooltip(showAllTTime(0, getVid(this.getAttribute('href')),
					RB.village_Var[1]));
		}
		function distanceTooltipGen2(e) {
			makeTooltip(showAllTTime(1, getVid(this.getAttribute('href')),
					RB.village_Var[1]));
		}
		function distanceTooltip(target, tp) {
			if (!/[&\?][zd]=\d+|[&\?]x=-?\d+&y=-?\d+/.test(target
					.getAttribute('href')))
				return;
			if (tp == 0)
				target.addEventListener("mouseover", distanceTooltipGen, false);
			else
				target
						.addEventListener("mouseover", distanceTooltipGen2,
								false);
			target.addEventListener("mouseout", removeTooltip, false);
		}

		function addShowDistanceIn(ss, vt) {
			var newP = $g(allIDs[0]);
			if (!(newP))
				newP = $e('DIV', [ [ 'style', 'float:' + docDir[1] + ';' ],
						[ 'id', allIDs[0] ] ]);
			ss.parentNode.insertBefore(newP, ss);
			$gn('x')[0].addEventListener('keyup', function() {
				showDistanceIn(vt);
			}, false);
			$gn('y')[0].addEventListener('keyup', function() {
				showDistanceIn(vt);
			}, false);
			lastTimerP[2] = lastTimerP[0];
			showDistanceIn(vt);
		}

		var distInVilage = new Object;
		var distInVilageFL = true;
		function showDistanceIn(vt) { // travel time
			var dd = $g(allIDs[0]);
			if (!dd)
				return;
			var dX = parseInt($gn('x')[0].value);
			var dY = parseInt($gn('y')[0].value);
			var ddd = dd.firstChild;
			if (ddd)
				dd.removeChild(ddd);
			lastTimerP[0] = lastTimerP[2];
			var xy = $g(allIDs[29]);
			if (xy)
				xy.parentNode.removeChild(xy);
			if (isNaN(dX) || isNaN(dY))
				return;
			xy = xy2id(dX, dY);
			dd.appendChild(showAllTTime(vt, xy, RB.village_Var[1]));
			lastTimerP[2] = lastTimerP[0];
			lastTimerP[0] = lastTimerP[1];
			GM_setValue(GMcookieID + 'next', xy);
			if (distInVilageFL) {
				var vLinks = $xf(vLinksPat, 'l');
				for ( var vn = 0; vn < vLinks.snapshotLength; vn++)
					distInVilage[villages_id[vn]] = vLinks.snapshotItem(vn).innerHTML;
				distInVilageFL = false;
			}
			ddd = ver4FL ? $gn('y')[0].parentNode.parentNode
					: $gn('y')[0].parentNode;
			if (typeof distInVilage[xy] != 'undefined') {
				ddd.appendChild($ee('SPAN', distInVilage[xy], [
						[ 'style', 'margin:0px 5px;font-size:12px;' ],
						[ 'id', allIDs[29] ] ]));
			} else {
				var ht = getVTip(xy);
				if (ht != '') {
					ddd
							.appendChild($ee(
									'SPAN',
									ht,
									[
											[
													'style',
													'color:'
															+ vHColor
															+ ';margin:0px 5px;font-size:12px;' ],
											[ 'id', allIDs[29] ] ]));
				}
			}
		}

		/** *********************** other *************************** */

		function addARLinks(myVid, aDirect) {
			var newLinks = $e('span');
			var armStyle = aDirect == 0 ? allIDs[34] : allIDs[35];
			var a2bUrl = RB.dictFL[23] == 0 ? 'a2b.php?z='
					: 'build.php?id=39&tt=2&z=';
			var ref = $ee('a', trImg(armStyle), [ [ 'href', a2bUrl + myVid ],
					[ 'onClick', 'return false;' ] ]);
			ref.addEventListener('click', function(x) {
				return function() {
					sendArmy(x);
				};
			}(myVid), false);
			newLinks.appendChild(ref);
			if (aDirect < 2) {
				var ref = $ee('a', trImg(allIDs[33]), [
						[
								'href',
								'build.php?z=' + myVid + '&gid=17'
										+ (RB.dictFL[23] == 0 ? '' : '&t=5') ],
						[ 'onClick', 'return false;' ] ]);
				ref.addEventListener('click', function(x) {
					return function() {
						sendResourses(x);
					};
				}(myVid), false);
				newLinks.appendChild(ref);
			}
			return newLinks;
		}

		function sendResTropAdd(aLink, aType) {
			if (RB.Setup[15] == 0)
				return;
			var vId = getVid(aLink.getAttribute('href'));
			if (vId == village_aid || vId == 0)
				return;
			insertAfter(addARLinks(vId, aType), aLink);
		}

		// begin Quick actions to my other villages

		function vlist_addButtonsT4() {
			villages_count = loadOVCookie('vList', 'vList');
			var flNew = false;
			var vLink = [];
			var aV = $xf('.//li/a', 'l', $g('villageList'));
			// workaround for T4 "Dinah" p1
			var tt = crtPath.match(/tt=\d+/);
			var ttFL = tt ? true : false;
			// end
			for ( var i = 0; i < aV.snapshotLength; i++) {
				linkVSwitch[i] = aV.snapshotItem(i).getAttribute('href');
				// workaround for T4 "Dinah" p2
				if (ttFL && aV.snapshotItem(i).href.indexOf(tt[0]) == -1)
					aV.snapshotItem(i).href += "&" + tt;
				// end
				var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
				if (RB.vList[nd] === undefined)
					flNew = true;
				else {
					villages_id[i] = RB.vList[nd];
					if (/active/.test(aV.snapshotItem(i).getAttribute('class'))) {
						village_aid = villages_id[i];
						village_aNum = i;
					}
					linkHint(aV.snapshotItem(i), villages_id[i]);
				}
			}
			if (villages_count != aV.snapshotLength)
				flNew = true;
			if (flNew) {
				linkVSwitch.length = 0;
				RB.vList.length = 0;
				var ad = $ee('div', httpGet(fullName + 'spieler.php?uid='
						+ userID), [ [ 'style', 'display:none;' ] ]);
				var aVB = $xf(
						'.//div[@id="villageList"]//div[@class="list"]/ul/li/a[@title]',
						'l', ad);
				lMap = $xf('.//li[@id="n3"]/a', 'f', ad).getAttribute('title');
				ad = null;
				villages_count = aVB.snapshotLength;
				for ( var i = 0; i < villages_count; i++) {
					var nd = aVB.snapshotItem(i).getAttribute('title');
					did = getVidFromCoords(nd);
					linkVSwitch[i] = aVB.snapshotItem(i).getAttribute('href');
					var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
					RB.vList[nd] = did;
					villages_id[i] = did;
				}
				saveODCookie('vList', RB.vList);
			}
		}

		var lastColor = [ 4, 4, 4, 4 ];

		function newStyle(e, j, sp) {
			var color = (j == 2 && sp) ? "white" : "black";
			var addCss = "."
					+ allIDs[16]
					+ e
					+ " div {color: "
					+ color
					+ ";background-color:"
					+ bgcolor[j]
					+ ";float: right;width: 100%;height:18px;margin-top:0px; display:inline;}";
			lastColor[e] = j;
			return addCss;
		}

		function progressbar_updValues() {
			getResources();
			var addCss = '';
			for ( var j = 0; j < 4; j++) {
				var spaceLeft = fullRes[j] - resNow[j];
				var percentUsed2 = resNow[j] / fullRes[j] * 100;
				var percentUsed = Math.round(percentUsed2);

				timerRB[j].pb.setAttribute("style", "width: "
						+ Math.round(percentUsed2 * 2) + "px;");
				timerRB[j].pval.innerHTML = percentUsed + "%";
				if (incomepersecond[j] != 0) {
					if (timerRB[j].time != 0) {
						timerRB[j].time += incomepersecond[j] > 0 ? -1 : 1;
						timerRB[j].val.innerHTML = formatTime(timerRB[j].time,
								0);
					}
				}

				var sp = incomepersecond[j] > 0 ? true : false;
				if (percentUsed < 60)
					sp = false;
				if (timerRB[j].time < parseFloat(RB.Setup[6]) * 3600) {
					if (lastColor[j] != 2) {
						addCss += newStyle(j, 2, sp);
					}
				} else if (timerRB[j].time < parseFloat(RB.Setup[5]) * 3600) {
					if (lastColor[j] != 1) {
						addCss += newStyle(j, 1, sp);
					}
				} else {
					if (lastColor[j] != 0) {
						addCss += newStyle(j, 0, sp);
					}
				}

				// Start kram89 code heavily modified Serj_LV :)
				if (ver4FL && RB.bodyH[0] == 1) {
					if (timerN.length < 4) {
						var resource = Math.floor(incomepersecond[j] * 3600);
						timerN[j] = new Object();
						var resoColor = resource < 0 ? 'red' : 'black';
						timerN[j].resotime = timerRB[j].val.cloneNode(true);
						timerN[j].perreso = $e('span');
						timerN[j].divme1 = $ee(
								'P',
								$em(
										'span',
										[
												'( ',
												$ee('span', resource, [ [
														'style',
														'color:' + resoColor
																+ ';' ] ]),
												' ', timerN[j].resotime, ' ',
												timerN[j].perreso, ')' ],
										[ [
												'style',
												"font-size:8pt !important;background-color:white;white-space:nowrap;position:absolute;"
														+ docDir[1] + ":0px;" ] ]),
								[ [
										'style',
										'position:relative;top:8px;'
												+ docDir[1] + ':0px;' ] ]);
						$gt('li', $g('res'))[j].appendChild(timerN[j].divme1);
					}

					timerN[j].resotime.innerHTML = formatTime(timerRB[j].time,
							0);
					timerN[j].perreso.innerHTML = percentUsed + ' %';

					function changeColor(obj, color) {
						if (timerN[j][obj + '_color'] != color) {
							timerN[j][obj + '_color'] != color;
							timerN[j][obj].setAttribute('style', 'color:'
									+ color + ';');
						}
					}

					if (percentUsed < 50) {
						changeColor('perreso', 'blue');
					} else if (parseInt(percentUsed) < 70) {
						changeColor('perreso', '#FF6600');
					} else if (parseInt(percentUsed) > 80) {
						changeColor('perreso', 'red');
					}

					if (timerRB[j].time < parseFloat(RB.Setup[6]) * 3600) {
						changeColor('resotime', 'red');
					} else if (timerRB[j].time < parseFloat(RB.Setup[5]) * 3600) {
						changeColor('resotime', '#9900CC');
					} else {
						changeColor('resotime', 'green');
					}

				} else if (timerN.length != 0) {
					$g('res').getElementsByTagName('li')[j]
							.removeChild(timerN[j].divme1);
					if (j == 3)
						timerN.length = 0;
				}
				// end code

			}
			if (addCss != '')
				GM_addStyle(addCss);
			for ( var i = 0; i < timerP.length; i++) {
				timerP[i].obj.innerHTML = formatTime(++timerP[i].time, 1);
			}
			for ( var i = 0; i < timerB.length; i++) {
				if (timerB[i].time != 0) {
					timerB[i].time += timerB[i].time > 0 ? -1 : 1;
					timerB[i].obj.innerHTML = formatTime(timerB[i].time,
							(typeof timerB[i].ft == 'undefined') ? 0
									: timerB[i].ft);
				}
			}
			for ( var i = 0; i < timerB3.length; i++) {
				if (timerB3[i].time > 0)
					timerB3[i].obj.innerHTML = formatTime(--timerB3[i].time, 3);
				else if (timerB3[i].time == 0) {
					timerB3[i].obj.style.color = 'red';
					timerB3[i].time--;
					show_alert();
				}
			}
			for ( var i = 0; i < timerF.length; i++) {
				timerF[i].obj.innerHTML = formatTime(++timerF[i].time, 0);
			}
			for ( var i = 0; i < timerOv.length; i++) {
				if (timerOv[i].time != 0) {
					timerOv[i].time += timerOv[i].dir;
					timerOv[i].obj.innerHTML = formatTime(timerOv[i].time, 0);
				}
			}
		}

		function progressbar_ReInit() {
			for ( var j = 0; j < 4; j++)
				if (incomepersecond[j] != 0) {
					var spaceLeft = fullRes[j] - resNow[j];
					timerRB[j].time = incomepersecond[j] > 0 ? Math
							.round(spaceLeft / incomepersecond[j]) : Math
							.round(resNow[j] / incomepersecond[j]);
					var tTime = absTime(timerRB[j].time);
					var dstr = tTime > 86400 ? (new Date((Math
							.abs(timerRB[j].time) + getTimeOffset() * 3600)
							* 1e3 + (new Date().getTime()))).toDateString()
							+ ' ' : '';
					timerRB[j].val.title = dstr + formatTime(tTime, 2);
				}
		}

		function saveSpaceLeftToMem() {
			if (closeWindowN(10))
				return;

			function resRecalc() {
				nK = parseInt(newPR.value).NaN0();
				for ( var i = 0; i < 4; i++) {
					RB.wantsMem[i] = Math.round(fullRes[i] * nK / 100
							- resNow[i]);
					if (RB.wantsMem[i] < 0)
						RB.wantsMem[i] = 0;
					ressA[i].innerHTML = RB.wantsMem[i];
				}
			}
			function svOK() {
				saveCookie('Mem', 'wantsMem');
				if (nK > 0) {
					RB.dictFL[21] = nK;
					saveCookie('DictFL', 'dictFL');
				}
				closeWindowN(10);
			}

			var nK = RB.dictFL[21];
			if (nK < 1)
				nK = 90;
			var newT = $e('TABLE', [ [ 'class', allIDs[7] ],
					[ 'style', 'background-color:#FAFAFF;' ] ]);
			var newPR = $e('INPUT', [ [ 'type', 'TEXT' ], [ 'size', 2 ],
					[ 'maxlength', 2 ], [ 'value', nK ] ]);
			newPR.addEventListener('keyup', resRecalc, false);
			var btnOK = $ee('BUTTON', "ok", [ [ 'class', allIDs[15] ],
					[ 'onClick', jsNone ] ]);
			btnOK.addEventListener('click', svOK, true);
			newT
					.appendChild($em('TR', [ $em('TD', [ newPR, '%' ]),
							$c(btnOK) ]));
			var ressA = [];
			RB.wantsMem = [ 0, 0, 0, 0, village_aid ];
			for ( var i = 0; i < 4; i++) {
				ressA[i] = $c(RB.wantsMem[i]);
				newT.appendChild($em('TR',
						[ $c(trImg('r' + (i + 1))), ressA[i] ]));
			}
			resRecalc();
			var xy = offsetPosition(this.parentNode);
			windowID[10] = makeFloat(newT, xy[0] + 120, xy[1] + 25);
		}

		function fillXY(nXY) {
			if (/[&?]z=\d/.test(crtPath))
				return;
			var myVid = nXY || GM_getValue(GMcookieID + 'next', -1);
			if (myVid > 0) {
				var arXY = id2xy(myVid);
				if ($gn('x').length < 1)
					return;
				$gn('x')[0].value = arXY[0];
				$gn('y')[0].value = arXY[1];
				nextFL = false;
			}
		}

		function fillXYtoRP() {
			fillXY();
			if ($g('troops')) {
				var ss = $g('btn_ok');
				if (ss) {
					addShowDistanceIn(ss, 0);
					ss.parentNode.addEventListener('keyup', a2bInfo, false);
					ss.parentNode.addEventListener('click', a2bInfo, false);
				}
			}
		}

		function sendArmy(myVid) {
			if ($gn('t9').length > 0) {
				fillXY(myVid);
				showDistanceIn(0);
			} else {
				if (myVid != village_aid)
					GM_setValue(GMcookieID + 'next', myVid);
				document.location.href = RB.dictFL[23] == 0 ? 'a2b.php'
						: 'build.php?id=39&tt=2';
			}
			return false;
		}

		function sendResourses(myVid) {
			if ($gn('r1').length > 0) {
				fillXY(myVid);
				showDistanceIn(-1);
			} else {
				if (RB.village_Dorf2[0] != 0) {
					if (myVid != village_aid)
						GM_setValue(GMcookieID + 'next', myVid);
					document.location.href = 'build.php?id='
							+ RB.village_Dorf2[0]
							+ (RB.dictFL[23] == 0 ? '' : '&t=5');
				} else {
					document.location.href = 'build.php?z=' + myVid + '&gid=17'
							+ (RB.dictFL[23] == 0 ? '' : '&t=5');
				}
			}
			return false;
		}

		/** *********************** Setup ************************** */

		function okTD(funcOk, funcCancel, sp) {
			var newBTO = $ee('BUTTON', "ok", [ [ 'class', allIDs[15] ],
					[ 'onClick', jsNone ] ]);
			newBTO.addEventListener('click', funcOk, true);
			var newBTX = $ee('BUTTON', "cancel", [ [ 'class', allIDs[15] ],
					[ 'onClick', jsNone ] ]);
			newBTX.addEventListener('click', funcCancel, true);
			var at = [ [ 'style', 'text-align:right' ] ];
			if (parseInt(sp) != NaN)
				at.push([ 'colspan', sp ]);
			return $em('TD', [ newBTO, newBTX ], at);
		}

		// function gtext(txt) {
		// var ntxt = typeof DICT['en'][txt] == 'undefined' ? 'Error!'
		// : DICT['en'][txt];
		// if (typeof DICT[LC] == 'undefined')
		// return ntxt;
		// if (typeof DICT[LC][txt] != 'undefined')
		// ntxt = DICT[LC][txt];
		// else if (typeof DICT[LC]["fb"] != 'undefined')
		// if (typeof DICT[DICT[LC]["fb"]] != 'undefined')
		// if (typeof DICT[DICT[LC]["fb"]][txt] != 'undefined')
		// ntxt = DICT[DICT[LC]["fb"]][txt];
		// return ntxt;
		// }

		RB.dSetup = [// 0 1 2 3 4 5 6 7 8 9
		/* 0 */version, 0, 0, 0, 1, 7, 1, 1, 3, 0,
		/* 1 */2, 1, 2, 0, 1, 1, 2, 0, 1, 2,
		/* 2 */1, 1, 1, 10, 80, 1, 1, 0, 0, audiofile,
		/* 3 */0, 15, 1, 1, 0, 0, 1, 1, 1, 0,
		/* 4 */'', '', '', '', '' ];
		RB.Setup = RB.dSetup.slice();

		var vLinksPat = ver4FL ? '//div[@id="villageList"]//li/a'
				: '//table[@id="vlist"]//div/a[contains(@href, "newdid")]';

		function overviewWarehouse() {
			function refreshOview() {
				if ((parseInt(RB.overview[1]) + 900) > nowTime)
					return;
				RB.overview[0] = 0;
				RB.overview[1] = crtPath.split("?")[0]
						+ clearAntibot(linkVSwitch[village_aNum]);
				saveCookie('OV', 'overview');
				document.location.href = fullName + 'dorf1.php';
			}

			var overviewD = $e('TABLE', [ [ 'id', allIDs[8] ] ]);
			var newTHead = $e('THEAD');

			var refreshImg = $e('IMG', [ [ 'src', img_refr ],
					[ 'title', "refresh" ], [ 'style', 'cursor:pointer;' ] ]);
			refreshImg.addEventListener('click', refreshOview, true);
			var newTR = $em('TR', [ $c(refreshImg), $c(trImg('r1')),
					$c(trImg('r2')), $c(trImg('r3')), $c(trImg('&nbsp;')),
					$c(trImg('r4')), $c(trImg('&nbsp;')), $c(trImg('r5')),
					$c('') ]);
			newTHead.appendChild(newTR);

			overviewD.appendChild(newTHead);

			var newTBody = $e('TBODY');
			var t = 0;
			var nowTime = Math.round((new Date().getTime()) / 1000);
			var vLinks = $xf(vLinksPat, 'l');
			for ( var vn = 0; vn < vLinks.snapshotLength; vn++) {
				var vName = vLinks.snapshotItem(vn).cloneNode(true);
				if (villages_id[vn] == village_aid)
					$at(vName, [ [ 'style', 'color:#71D000;' ] ]);
				var newTR = $ee('TR', $c(vName));
				loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

				var minLeft = Number.POSITIVE_INFINITY;
				for ( var i = 0; i < 4; i++) {
					var deltaTime = RB.village_PPH[12] > 0 ? nowTime
							- parseInt(RB.village_PPH[12]) : 0;
					var nowResInV = Math.round(RB.village_PPH[i] / 3600
							* deltaTime + RB.village_PPH[i + 4]);
					if (nowResInV > RB.village_PPH[i + 8])
						nowResInV = RB.village_PPH[i + 8];
					if (nowResInV < 0)
						nowResInV = 0;
					var secLeft = RB.village_PPH[i] > 0 ? Math
							.round((RB.village_PPH[i + 8] - nowResInV)
									/ (RB.village_PPH[i] / 3600)) : Math
							.round(nowResInV / (RB.village_PPH[i] / 3600));
					if (secLeft < minLeft)
						minLeft = secLeft;
					var nowResInVP = Math.round(nowResInV
							/ RB.village_PPH[i + 8] * 100);
					var clr;
					if (secLeft < parseFloat(RB.Setup[6]) * 3600) {
						clr = 3;
					} else if (secLeft < parseFloat(RB.Setup[5]) * 3600) {
						clr = 2;
					} else {
						clr = 1;
					}
					var newPval = $ee('DIV', nowResInVP + '%', [ [ 'class',
							allIDs[10] + clr ] ]);
					newPval.setAttribute("style", "width: "
							+ Math.round(nowResInVP / 2) + "px;");
					newTR.appendChild($c(newPval, [ [ 'class', allIDs[10] ] ]));
					if (i > 1) {
						timerOv[t] = new Object();
						timerOv[t].time = minLeft;
						timerOv[t].obj = $eT('TD', minLeft, 0, [ [ 'class',
								allIDs[17] ] ]);
						timerOv[t].dir = RB.village_PPH[i] > 0 ? -1 : 1;
						if (Math.abs(minLeft) < 600)
							timerOv[t].obj.setAttribute('style',
									'text-decoration:blink;');
						newTR.appendChild(timerOv[t++].obj);
						minLeft = Number.POSITIVE_INFINITY;
					}
				}
				newTR.appendChild($c(RB.village_PPH[3], [ [ 'style',
						'text-align:right' ] ]));
				newTR.appendChild($c(addARLinks(villages_id[vn], 0)));
				newTBody.appendChild(newTR);
			}
			overviewD.appendChild(newTBody);
			return overviewD;
		}

		function trImg(cl, et) {
			var ecl = [ [ 'class', cl ], [ 'src', 'img/x.gif' ] ];
			if (typeof et != 'undefined')
				ecl.push([ 'title', et ]);
			return $e('IMG', ecl);
		}

		function humanRF(num) {
			var rnum = parseInt(num);
			var dnum = Math.abs(rnum);
			var sign = rnum < 0 ? '-' : '';
			var ddnum = 0;
			var fnum = '';
			while (dnum > 1000) {
				ddnum = ('00' + (dnum % 1000)).substr(-3, 3);
				dnum = Math.floor(dnum / 1000);
				fnum = ddnum + ',' + fnum;
			}
			fnum = dnum + ',' + fnum;
			return sign + fnum.substr(0, fnum.length - 1);
		}

		function overviewResources() {
			var overviewD = $e('TABLE', [ [ 'id', allIDs[8] ] ]);
			var newTHead = $ee('THEAD', $em('TR', [ $c(' '), $c(trImg('r1')),
					$c(trImg('r2')), $c(trImg('r3')), $c(' '), $c(trImg('r4')),
					$c(' '), $c(abFL ? '&#931;' : ''), $c(trImg('clock')),
					$c('') ]));

			overviewD.appendChild(newTHead);

			var newTBody = $e('TBODY');
			var t = 0;
			var resSumm = [ 0, 0, 0, 0 ];
			var nowTime = Math.round((new Date().getTime()) / 1000);
			var vLinks = $xf(vLinksPat, 'l');
			for ( var vn = 0; vn < vLinks.snapshotLength; vn++) {
				var vName = vLinks.snapshotItem(vn).cloneNode(true);
				if (villages_id[vn] == village_aid)
					$at(vName, [ [ 'style', 'color:#71D000;' ] ]);
				var newTR = $ee('TR', $c(vName));
				loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

				var allResInV = 0;
				for ( var i = 0; i < 4; i++) {
					var deltaTime = RB.village_PPH[12] > 0 ? nowTime
							- parseInt(RB.village_PPH[12]) : 0;
					var nowResInV = Math.round(RB.village_PPH[i] / 3600
							* deltaTime + RB.village_PPH[i + 4]);
					if (nowResInV > RB.village_PPH[i + 8])
						nowResInV = RB.village_PPH[i + 8];
					if (nowResInV < 0)
						nowResInV = 0;
					resSumm[i] += nowResInV;
					allResInV += nowResInV;
					var attr = [ [ 'class', allIDs[19] ] ];
					if (RB.village_PPH[i] < 0)
						attr[1] = [ 'style', 'color:red;' ];
					newTR.appendChild($c(humanRF(nowResInV), attr));
					if (i == 2)
						newTR.appendChild($c('/' + RB.village_PPH[8], [ [
								'style', 'font-size:8pt;' ] ]));
				}
				newTR.appendChild($c('/' + RB.village_PPH[11], [ [ 'style',
						'font-size:8pt;' ] ]));
				newTR.appendChild($c(abFL ? humanRF(allResInV) : '', [ [
						'style', 'font-weight:bold;text-align:right' ] ]));
				if (villages_id[vn] != village_aid)
					newTR.appendChild($c(formatTime(getTTime(calcDistance(
							villages_id[vn], village_aid),
							MTime[parseInt(RB.Setup[2])] * sM, 0, 0), 0)));
				else
					newTR.appendChild($c('&lt;--'));
				newTR.appendChild($c(addARLinks(villages_id[vn], 0)));
				newTBody.appendChild(newTR);
			}
			overviewD.appendChild(newTBody);
			var newTR = $ee('TR', $c('&nbsp;'));
			for ( var i = 0; i < 4; i++) {
				newTR.appendChild($c(humanRF(resSumm[i]), [ [ 'style',
						'text-align:right;' ] ]));
				if (i > 1)
					newTR.appendChild($c(' '));
			}
			newTR.appendChild($c(' ', [ [ 'colspan', 3 ] ]));
			overviewD.appendChild($ee('TFOOT', newTR));
			return overviewD;
		}

		function overviewTroops() {
			var overviewD = $e('TABLE', [ [ 'id', allIDs[8] ] ]);

			var newTBody = $e('TBODY');
			var vLinks = $xf(vLinksPat, 'l');
			for ( var vn = 0; vn < vLinks.snapshotLength; vn++) {
				var vName = vLinks.snapshotItem(vn).cloneNode(true);
				if (villages_id[vn] == village_aid)
					$at(vName, [ [ 'style', 'color:#71D000;' ] ]);
				var newTR = $ee('TR', $c(vName));

				loadZVCookie('Dorf12', 'village_dorf12', villages_id[vn]);
				var t = 0;
				var hfl = false;
				if (RB.village_dorf12[0] > 0) {
					var tT = $e('TABLE', [ [ 'class', allIDs[7] ],
							[ 'style', 'width:100%;' ] ]);
					if (RB.village_dorf12[1] == 'hero')
						hfl = true;
					t = hfl ? 3 : 1;
					var fl = false;
					var nR1 = $e('TR');
					var nR2 = $e('TR');
					for ( var i = 1; i < 51; i++) {
						nR1.appendChild($c(trImg('unit u' + i)));
						if (i == RB.village_dorf12[t]) {
							nR2.appendChild($c(RB.village_dorf12[t + 1]));
							fl = true;
							t += 2;
						} else
							nR2.appendChild($c(0));
						if ((i % 10) == 0) {
							if (fl) {
								tT.appendChild(nR1);
								tT.appendChild(nR2);
								fl = false;
							}
							var nR1 = $e('TR');
							var nR2 = $e('TR');
						}
					}
					newTR.appendChild($c(tT));
				} else
					newTR.appendChild($c('&nbsp;'));
				if (hfl)
					newTR.appendChild($em('TD', [
							$ee('DIV', trImg('unit uhero')),
							$ee('DIV', RB.village_dorf12[2]) ]));
				else
					newTR.appendChild($c(''));
				newTR.appendChild($c(addARLinks(villages_id[vn], 0)));
				newTBody.appendChild(newTR);
			}
			overviewD.appendChild(newTBody);

			return overviewD;
		}

		function overviewAll() {
			if (closeWindowN(1)) {
				timerOv.length = 0;
				return;
			}
			if (villages_count < 2)
				return;

			function ovWarehouse() {
				ovBuild(overviewWarehouse());
			}
			function ovResources() {
				ovBuild(overviewResources());
			}
			function ovTroops() {
				ovBuild(overviewTroops());
			}
			function ovBuild(ovNew) {
				ovDIV.removeChild(overviewD);
				overviewD = ovNew;
				ovDIV.appendChild(overviewD);
			}
			function overviewClose() {
				timerOv.length = 0;
				closeWindowN(1);
			}

			var ovDIV = $e('DIV');
			var linkOW = $a("warehouse", [ [ 'href', jsVoid ] ]);
			linkOW.addEventListener('click', ovWarehouse, true);
			var linkOR = $a("resources", [ [ 'href', jsVoid ] ]);
			linkOR.addEventListener('click', ovResources, true);
			var linkOT = $a("troops", [ [ 'href', jsVoid ] ]);
			linkOT.addEventListener('click', ovTroops, true);
			var menuD = $em('TD', [ linkOW, ' | ', linkOR, ' | ', linkOT ], [ [
					'style', 'text-align:left;' ] ]);

			var menuR = $ee('TR', menuD);

			var newBTX = $ee('BUTTON', "close" + ' (X)', [
					[ 'class', allIDs[15] ], [ 'onClick', jsNone ],
					[ 'style', 'direction:ltr;float:right;' ] ]);
			newBTX.addEventListener('click', overviewClose, true);
			menuR.appendChild($c(newBTX));

			var menuT = $ee('TABLE', menuR, [ [ 'style',
					'background-color:#F8F8F8;' ] ]);
			ovDIV.appendChild(menuT);

			var overviewD = overviewWarehouse();

			ovDIV.appendChild(overviewD);
			windowID[1] = makeFloatD(ovDIV, 2);
		}

		function clearAntibot(oldURL) {
			var clearURL = oldURL.replace(/&c=[\w]{6,6}/, '');
			return clearURL;
		}

		var serversAC = 6;
		RB.serversAN = new Array(serversAC);

		function linkHint(aLink, vID) {
			var ahref = aLink.getAttribute('href');
			if (!ahref)
				return;
			avID = vID || getVid(ahref);
			if (RB.vHint[avID] != undefined) {
				aLink.appendChild($ee('SPAN', ' ' + RB.vHint[avID], [ [
						'style', 'color:' + vHColor + ';' ] ]));
			} else {
				var ht = getVTip(avID);
				if (ht != '') {
					var ltext = aLink.innerHTML.onlyText().length;
					if (ltext < 20)
						aLink.appendChild($ee('SPAN', ' '
								+ ht.substr(0, 20 - ltext), [ [ 'style',
								'color:' + vHColor + ';' ] ]));
				}
			}
		}

		function setLC() {
			if (RB.Setup[1] > 0)
				return langs[RB.Setup[1]].match(/\((\w+)\)/)[1];
			lang = navigator.language;
			if (/^ar/i.test(lang))
				return 'ar';
			else if (/^bs/i.test(lang) || crtLang == 'ba')
				return 'bs';
			else if (/^bg/i.test(lang))
				return 'bg';
			else if (/^de/i.test(lang))
				return 'de';
			else if (/^fa/i.test(lang))
				return 'fa';
			else if (/^fr/i.test(lang))
				return 'fr';
			else if (/^hr/i.test(lang) || crtLang == 'hr')
				return 'hr';
			else if (/^hu/i.test(lang))
				return 'hu';
			else if (/^it/i.test(lang))
				return 'it';
			else if (/^pl/i.test(lang))
				return 'pl';
			else if (/^pt/i.test(lang))
				return 'pt';
			else if (/^ua/i.test(lang) || crtLang == 'ua')
				return 'ua';
			else if (/^ro/i.test(lang))
				return 'ro';
			else if (/^ru/i.test(lang))
				return 'ru';
			else if (/^sr/i.test(lang))
				return 'sr';
			else if (/^sv/i.test(lang))
				return 'sv';
			else if (/^tr/i.test(lang))
				return 'tr';
			else if (/^zh/i.test(lang))
				return 'zh';
			else if (/^vi/i.test(lang))
				return 'vi';
			else if (/^el/i.test(lang) || crtLang == 'gr')
				return 'el';
			else if (/^nl/i.test(lang))
				return 'nl';
			else
				return 'en';
		}

		function scanTropsData() {
			function scanTropsDataR(hn) {
				ajaxRequest(fullName + 'manual.php?typ=1&s=' + hn, 'GET', null,
						function(ajaxResp) {
							var j = (hn - 1) * 10;
							var allTD = [];
							var helpText = ajaxResp.responseText;
							var Rej = /td>([\s\S]+?)<\/td/gi;
							var t = 0;
							var tt = 0;
							var fl = false;
							var tmp = new Array(10);
							while ((allTD = Rej.exec(helpText)) != null) {
								var n = allTD[1].onlyText().match(/\d+/);
								if (n) {
									if (parseRules[t++])
										tmp[tt++] = parseInt(n[0]);
								} else {
									fl = true; // new travian help
								}
							}
							for ( var t = 0; t < 10; t++) {
								if (fl)
									RB.tropsI[j++] = tmp[parseCont[t]];
								else
									RB.tropsI[j++] = tmp[t];
							}
							RB.dictTR[hn] = helpText.match(/alt="(.+?)"/)[1];
							RB.trFL[hn] = 1;
							saveCookie('trFL', 'trFL');
							saveCookie('tropsI', 'tropsI');
							saveCookie('DictTR', 'dictTR');
							if (RB.dictFL[18] == "0") {
								RB.dictionary[20] = helpText
										.match(/class="r5".+?alt="(.+?)"/)[1];
								saveCookie('Dict', 'dictionary');
								RB.dictFL[18] = 1;
								saveCookie('DictFL', 'dictFL');
							}
						}, dummy);
			}
			// 0 1 2 3 4 5 6 7 8 9 10
			var parseRules = [ true, true, true, true, true, true, true, true,
					true, true, false ];
			var parseCont = [ 4, 5, 6, 0, 1, 2, 3, 7, 8, 9 ];
			for ( var i = 0; i < 31; i++)
				RB.trFL[i] = 0;
			if (RB.dictFL[13] == 1) {
				loadCookie('trFL', 'trFL');
				loadCookie('tropsI', 'tropsI');
			} else {
				RB.trFL[0] = 1;
				RB.dictFL[13] = 1;
				saveCookie('DictFL', 'dictFL');
			}
			if (RB.Setup[20] == 2) {
				RB.dictFL[13] = 0;
				saveCookie('DictFL', 'dictFL');
				RB.Setup[20] = 1;
				saveCookie('RBSetup', 'Setup');
			}
			var curTO = 0;
			for ( var i = 1; i < 31; i++) {
				if (RB.trFL[i] == 1)
					continue;
				curTO += getRandom(500, 1000);
				setTimeout(function(x) {
					return function() {
						scanTropsDataR(x);
					}
				}(i), curTO);
			}
			if (curTO == 0) {
				RB.dictFL[13] = 2;
				saveCookie('DictFL', 'dictFL');
			}
		}

		function troopInfo(tt, val) {
			if (RB.dictFL[13] < 2)
				return 0;
			if (triFL) {
				loadCookie('tropsI', 'tropsI');
				// 1 2 3 4 5 6 7 8 9 10
				var parseRules2 = [ -1, 1, 2, -1, -1, -1, -1, 4, -1, 3 ];
				var nature = [ // http://t4.answers.travian.com/index.php?aid=109
				[ 10, 25, 20, 1, 20 ], [ 20, 35, 40, 1, 20 ],
						[ 60, 40, 60, 1, 20 ], [ 80, 66, 50, 1, 20 ],
						[ 50, 70, 33, 2, 20 ], [ 100, 80, 70, 2, 20 ],
						[ 250, 140, 200, 3, 20 ], [ 450, 380, 240, 3, 20 ],
						[ 200, 170, 250, 3, 20 ], [ 600, 440, 520, 5, 20 ],
						[ 20, 35, 50, 1, 6 ], // natarian
						[ 65, 30, 10, 1, 7 ], [ 100, 90, 75, 1 ],
						[ 0, 10, 0, 1, 25 ], [ 155, 80, 50, 2, 14 ],
						[ 170, 140, 80, 3 ], [ 250, 120, 150, 6, 5 ],
						[ 60, 45, 10, 5, 3 ], [ 80, 50, 50, 1, 5 ],
						[ 30, 40, 40, 1, 5 ] ];
				var j = RB.tropsI.length;
				for ( var i = 0; i < 20; i++)
					for ( var t = 0; t < 10; t++)
						RB.tropsI[j++] = parseRules2[t] < 0 ? 0
								: nature[i][parseRules2[t]];
				triFL = false;
			}
			return parseInt(RB.tropsI[(tt - 1) * 10 + val]);
		}

		function gti(p1, p2, p3) {
			return (troopInfo(parseInt(p1), p2) * p3).NaN0();
		}
		function troopsDorf1() {
			if (RB.Setup[20] == 0)
				return;
			var tinfoT = $g('troops');
			if (!tinfoT)
				return;
			tiImg = trImg(allIDs[47]);
			tiImg.addEventListener("mouseover", showTroopsITT, false);
			tiImg.addEventListener("mouseout", removeTooltip, false);
			tinfoT.rows[0].cells[0].appendChild(tiImg);
		}
		function showTroopsITT() {
			var ITTb = $e('TBODY');
			var newITT = $ee('TABLE', ITTb, [ [ 'class', allIDs[7] ] ]);
			loadZVCookie('Dorf12', 'village_dorf12');
			var tt = 0;
			var tc = 0;
			var ti = [ 0, 0, 0, 0, 0 ];
			var ts = [ 0, 0, 0, 0, 0 ];
			for ( var i = 0; i < RB.village_dorf12[0]; i++) {
				tn = RB.village_dorf12[i * 2 + 1];
				tt = parseInt(tn);
				tc = parseInt(RB.village_dorf12[i * 2 + 2]);
				var atfl = ((tt % 10) < 7 && troopInfo(tt, 9) > 1) ? false
						: true;
				ti = [ atfl ? gti(tt, 0, tc) : 0, atfl ? 0 : gti(tt, 0, tc),
						gti(tt, 1, tc), gti(tt, 2, tc), gti(tt, 9, tc) ];
				if (tt > 30)
					ti[0] = 0;
				ts = [ atfl ? ts[0] + ti[0] : ts[0],
						atfl ? ts[1] : ts[1] + ti[1], ts[2] + ti[2],
						ts[3] + ti[3], ts[4] + ti[4] ];
				ITTb.appendChild($em('TR', [ $c(trImg('unit u' + tn)),
						$c(humanRF(ti[0])), $c(humanRF(ti[1])),
						$c(humanRF(ti[2])), $c(humanRF(ti[3])),
						$c(humanRF(ti[4])) ]));
			}
			var tHead = $ee('THEAD', $em('TR', [ $c('&#931;'),
					$c(humanRF(ts[0])), $c(humanRF(ts[1])), $c(humanRF(ts[2])),
					$c(humanRF(ts[3])), $c(humanRF(ts[4])) ]));
			tHead.appendChild($em('TR', [ $c(''),
					$em('TD', [ trImg('att_all'), trImg('unit u13') ]),
					$em('TD', [ trImg('att_all'), trImg('unit u16') ]),
					$c(trImg('def_i')), $c(trImg('def_c')), $c(trImg('r5')) ]));
			newITT.appendChild(tHead);
			makeTooltip(newITT);
		}

		function getTroopsInOasis(vf) {
			var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]',
					'l', vf);
			if (troopsTR.snapshotLength < 1)
				return false;
			var ITTb = $e('TBODY');
			var newITT = $ee('TABLE', ITTb, [ [ 'class', allIDs[7] ] ]);
			var ti = [ 0, 0, 0 ];
			var ts = [ 0, 0, 0 ];
			for ( var i = 0; i < troopsTR.snapshotLength; i++) {
				tt = parseInt($gt('IMG', troopsTR.snapshotItem(i))[0]
						.getAttribute('class').match(/\d+/)[0]);
				tc = toNumber(troopsTR.snapshotItem(i).cells[1].innerHTML);
				ti = [ gti(tt, 1, tc), gti(tt, 2, tc), gti(tt, 9, tc) ];
				ts = [ ts[0] + ti[0], ts[1] + ti[1], ts[2] + ti[2] ];
				ITTb.appendChild($em('TR', [ $c(trImg('unit u' + tt)),
						$c(humanRF(ti[0])), $c(humanRF(ti[1])),
						$c(humanRF(ti[2])) ]));
			}
			var tHead = $ee('THEAD', $em('TR',
					[ $c('&#931;'), $c(humanRF(ts[0])), $c(humanRF(ts[1])),
							$c(humanRF(ts[2])) ]));
			tHead.appendChild($em('TR', [ $c(''), $c(trImg('def_i')),
					$c(trImg('def_c')), $c(trImg('r5')) ]));
			newITT.appendChild(tHead);
			return newITT;
		}

		function a2bInfo() {
			var ts = [ 0, 0, 0, 0, 0, 0 ];
			if (raceFL) {
				var troopImg = $xf('.//img[contains(@class,"unit u")]', 'f',
						cont);
				if (!troopImg)
					return;
				race = Math.floor(parseInt(troopImg.getAttribute('class')
						.match(/\d+/)[0]) / 10);
				if (race != RB.Setup[2]) {
					RB.Setup[2] = race;
					saveCookie('RBSetup', 'Setup');
				}
				raceFL = false;
			}
			var inputs = $gt('INPUT', cont);
			for ( var i = 0; i < inputs.length; i++) {
				if (/t\d+/.test(inputs[i].getAttribute('name'))) {
					var rtt = parseInt(inputs[i].getAttribute('name').match(
							/\d+/)[0]);
					if (rtt == 11)
						continue;
					var tt = rtt + (parseInt(RB.Setup[2]) * 10);
					var tc = parseInt(inputs[i].value);
					if (isNaN(tc))
						continue;
					var atfl = (rtt < 7 && troopInfo(tt, 9) > 1) ? false : true;
					ts = [ atfl ? ts[0] + gti(tt, 0, tc) : ts[0],
							atfl ? ts[1] : ts[1] + gti(tt, 0, tc),
							ts[2] + gti(tt, 1, tc), ts[3] + gti(tt, 2, tc),
							ts[4] + gti(tt, 8, tc), ts[5] + gti(tt, 9, tc) ];
				}
			}
			var rP = $g(allIDs[21]);
			if (rP)
				rP.parentNode.removeChild(rP);
			rP = $e('P',
					[ [ 'id', allIDs[21] ], [ 'style', 'max-width:50%;' ] ]);
			rT = $e('TABLE', [ [ 'class', allIDs[7] ] ]);
			rT.appendChild($em('TR', [ $c(''), $c(trImg('unit u13')),
					$c(trImg('unit u16')) ]));
			rT.appendChild($em('TR', [ $c(trImg('att_all')),
					$c(humanRF(ts[0])), $c(humanRF(ts[1])) ]));
			rT.appendChild($em('TR', [ $c(trImg('def1')), $c(humanRF(ts[2])),
					$c(humanRF(ts[3])) ]));
			rT.appendChild($ee('TR', $c('', [ [ 'colspan', '3' ] ])));
			rT.appendChild($em('TR', [ $c(trImg('r5')),
					$c(humanRF(ts[5]), [ [ 'colspan', '2' ] ]) ]));
			rT.appendChild($em('TR', [ $c(trImg(allIDs[33])),
					$c(humanRF(ts[4]), [ [ 'colspan', '2' ] ]) ]));
			rP.appendChild(rT);
			if ($g('btn_ok'))
				$g('btn_ok').parentNode.appendChild(rP);
			else if ($g('raidListSlot'))
				insertAfter(rP, $g('raidListSlot'));
		}

		function show_alert() {
			var nt = new Date().getTime();
			if (lastAlert > nt - 5e3)
				return;
			var audioT = $g(allIDs[22]);
			if (audioT)
				audioT.parentNode.removeChild(audioT);
			switch (parseInt(RB.Setup[28])) {
			case 1: // alert
				alert('ding ding');
				break;
			case 2: // HTML5 audio
				cont.appendChild($e('AUDIO', [ [ 'id', allIDs[22] ],
						[ 'src', RB.Setup[29] ], [ 'autoplay', 'true' ],
						[ 'loop', 'false' ] ]));
				break;
			case 3: // EMBED audio
				cont.appendChild($e('EMBED', [ [ 'id', allIDs[22] ],
						[ 'src', RB.Setup[29] ], [ 'hidden', 'true' ],
						[ 'autostart', 'true' ], [ 'loop', 'false' ] ]));
				break;
			case 4: // FLASH player
				cont
						.appendChild($e(
								'EMBED',
								[
										[ 'id', allIDs[22] ],
										[ 'type',
												'application/x-shockwave-flash' ],
										[
												'flashvars',
												'audioUrl=' + RB.Setup[29]
														+ '&autoPlay=true' ],
										[ 'src',
												'http://www.google.com/reader/ui/3523697345-audio-player.swf' ],
										[ 'width', 400 ], [ 'height', 27 ],
										[ 'quality', 'best' ] ]));
				break;
			}
			lastAlert = nt;
		}

		function testAudio() {
			var sW = $g(windowID[0]);
			if (!sW)
				return;
			lastAlert = 0;
			RB.Setup[28] = $gn(28)[0].value;
			RB.Setup[29] = $gn(29)[0].value;
			show_alert();
		}

		/** *********************** begin test zone ************************** */

		var normalizeProductionCount = 8;

		function addFarmToMapT4(el) {
			function farmAdd() {
				GM_setValue(GMcookieID + 'next', xy);
				document.location.href = fullName
						+ 'build.php?gid=16&tt=99&action=showSlot&lid='
						+ RB.village_Var[2] + '&sort=distance&direction=asc';
			}
			if (RB.village_Var[2] > 0) {
				var md = $gc('detailImage', el ? el : cont);
				if (md.length == 0)
					return;
				var xy = $xf('.//a[contains(@href,"z=")]', 'f', md[0]);
				if (xy) {
					xy = getVid(xy.getAttribute('href'));
					var link = $a(RB.dictionary[22], [ [ 'href', '#' ],
							[ 'class', 'a arrow' ] ]);
					link.addEventListener('click', farmAdd, false);
					$gc('options', md[0])[0].appendChild($ee('DIV', link, [ [
							'class', 'option' ] ]));
				}
			}
		}

		function analyzerBattle() {
			if (RB.Setup[25] == 0 || RB.dictFL[13] < 2)
				return;
			var report = $g('report_surround');
			if (!(report))
				return;
			if (!($g('attacker')))
				return;
			var tt = $gt('TABLE', report);
			if (tt.length < 2)
				return;

			function parseTroops(pRows, pRU, ptS) {
				var pRace = Math
						.floor(parseInt($gt('IMG', pRows[1].cells[1])[0]
								.getAttribute('class').match(/u(\d+)/)[1]) / 10);
				for ( var i = 10; i > 0; i--) {
					tCount = parseInt(pRows[2].cells[i].innerHTML).NaN0();
					var tKirillC = tCount;
					if (tCount > 0) {
						for (j = 0; j < pRU.length; j++)
							ptS[0][j] += troopInfo(pRace * 10 + i, pRU[j])
									* tCount;
						if (i < 7 && troopInfo(pRace * 10 + i, 9) > 1)
							ptS[2] += troopInfo(pRace * 10 + i, 0) * tCount;
					}
					if (pRows.length > 3)
						if (pRows[3].cells.length > 3) {
							tCount = parseInt(pRows[3].cells[i].innerHTML);
							if (tCount > 0) {
								for (j = 0; j < pRU.length; j++)
									ptS[1][j] += troopInfo(pRace * 10 + i,
											pRU[j])
											* tCount;
								tKirillC -= tCount;
							}
						}
					kirillS = (tKirillC > 0 ? tKirillC : '') + ',' + kirillS;
				}
				kirillS = 'r' + kirillRace[pRace] + 'u'
						+ kirillS.replace(/,*$/, '');
				return ptS;
			}

			var attakerN = ver4FL ? $gc('role', tt[0].rows[0].cells[0])[0].innerHTML
					: tt[0].rows[0].cells[0].innerHTML;
			var defenderN = ver4FL ? $gc('role', tt[1].rows[0].cells[0])[0].innerHTML
					: tt[1].rows[0].cells[0].innerHTML;

			var kirilloid = '#a:';
			var aRow = tt[0].rows;
			var tCount = 0;
			var atS = [ [ 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0 ], 0 ];
			var aRU = [ 0, 8, 3, 4, 5, 6, 9 ];
			var kirillRace = ver4FL ? [ 0, 1, 2, 3, 4 ] : [ 1, 2, 3, 0, 4 ];
			var kirillS = '';
			var atS = parseTroops(aRow, aRU, atS);
			kirilloid += kirillS + (ver4FL ? 'Ub' : '') + '#d:';
			if (ver4FL)
				kirilloid = kirilloid.replace(/r0(uUb)?/g, '');
			atS[0][1] -= atS[1][1];
			var goods = $gc('res', tt[0]);
			var ress = goods.length > 0 ? goods[0].innerHTML
					.match(/<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?/)
					: [ 0, 0, 0, 0, 0 ];
			ress = [ 0, parseInt(ress[1]), parseInt(ress[2]),
					parseInt(ress[3]), parseInt(ress[4]) ];
			if (ver4FL && goods.length > 1) {
				var crC = parseInt(goods[1].innerHTML.onlyText());
				if (!isNaN(crC)) {
					var pbonus = 0;
					for ( var i = 1; i < 5; i++) {
						var t = ress[i] - crC;
						pbonus += t < 0 ? 0 : t;
					}
					var pbonusS = $ee('SPAN', ' ( &#931;= ' + pbonus + ' ) ');
					if (pbonus > 0) {
						var newT = $e('TABLE', [ [ 'class', allIDs[7] ] ]);
						for (i = 1; i < 11; i++) {
							var trC = troopInfo(i
									+ (parseInt(RB.Setup[2]) * 10), 8);
							if (trC > 1) {
								newT
										.appendChild($em(
												'TR',
												[
														$c(trImg('unit u'
																+ (i + parseInt(RB.Setup[2]) * 10))),
														$c(Math.ceil(pbonus
																/ trC)) ]));
							}
						}
						pbonusS.addEventListener("mouseover", function() {
							makeTooltip(newT);
						}, false);
						pbonusS.addEventListener("mouseout", removeTooltip,
								false);
					}
					goods[1].appendChild(pbonusS)
				}
			}

			var dfS = [ [ 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0 ], 0 ];
			var dRU = [ 1, 2, 3, 4, 5, 6, 9 ];
			var kirillRace = ver4FL ? [ 0, 1, 2, 3, 4 ] : [ 1, 2, 3, 4, 5 ];
			var kirillSd = '';
			for (dTc = 1; dTc < tt.length; dTc++) {
				var dRow = tt[dTc].rows;
				if (dRow.length < 2)
					continue;
				kirillS = '';
				var dfS = parseTroops(dRow, dRU, dfS);
				kirillSd += kirillS + (ver4FL ? 'U#' : ';');
			}
			kirilloid += kirillSd.substring(0, 2) + (ver4FL ? '#' : ';')
					+ kirillSd;
			kirilloid = kirilloid.replace((ver4FL ? /r.uU#/g : /r.u;/g), '');
			if (ver4FL)
				kirilloid = kirilloid.replace(/r0u/g, 'u');
			kirilloid = kirilloid.replace(/[;#]$/, (ver4FL ? '' : '#'));

			var adCoords = $xf('.//a[contains(@href, "karte.php")]', 'l',
					report);
			if (adCoords.snapshotLength > 1) {
				var atCoord = getVid(adCoords.snapshotItem(0).getAttribute(
						'href'));
				var dfCoord = getVid(adCoords.snapshotItem(1).getAttribute(
						'href'));
				var distance = Math.round(calcDistance(atCoord, dfCoord));
				var distRef = $ee('SPAN', '&lt;- ' + distance + ' -&gt;', [ [
						'style', 'white-space:nowrap;' ] ]);
				distRef
						.addEventListener(
								"mouseover",
								function() {
									var al = parseInt(RB.Setup[9]) == 0 ? parseInt(RB.village_Var[1])
											: parseInt(RB.Setup[9]) - 1;
									makeTooltip(showAllTTime(1, [ atCoord,
											dfCoord ], al));
								}, false);
				distRef.addEventListener("mouseout", removeTooltip, false);
			} else
				var distRef = ' ';

			var newTABLE = $e('TABLE', [ [ 'class', allIDs[7] ],
					[ 'style', 'background-color:white;width:100%;' ] ]);
			newTABLE.appendChild($em('TR', [ $c(distRef), $c(attakerN),
					$c(defenderN), $c('total') ]));
			// strength
			var newTR = $ee('TR', $em('TD', [ trImg('unit u13'), '+',
					trImg('unit u16') ]));
			var strAP = atS[0][0] - atS[2];
			newTR.appendChild($em('TD', [ humanRF(strAP), ' + ',
					humanRF(atS[2]) ]));
			newTR.appendChild($em('TD', [ humanRF(dfS[0][0]), ' + ',
					humanRF(dfS[0][1]) ]));
			var proc = [ 0, 0 ];
			proc[0] = Math.round(strAP / (strAP + dfS[0][0]) * 100).NaN0();
			proc[1] = Math.round(atS[2] / (atS[2] + dfS[0][1]) * 100).NaN0();
			newTR.appendChild($c(proc[0]
					+ ' + '
					+ proc[1]
					+ ' = '
					+ Math.round((proc[0] + proc[1])
							/ (proc[0] > 0 && proc[1] > 0 ? 2 : 1)) + '%'));
			newTABLE.appendChild(newTR);
			// crop
			proc[0] = Math.round(atS[1][6] / (atS[1][6] + dfS[1][6]) * 100)
					.NaN0();
			var newTR = $em('TR', [ $c(trImg('r5')),
					$c(humanRF(atS[0][6]) + '/' + humanRF(atS[1][6])),
					$c(humanRF(dfS[0][6]) + '/' + humanRF(dfS[1][6])),
					$c(proc[0] + '%') ]);
			newTABLE.appendChild(newTR);
			// resource
			var newTR = $ee('TR', $em('TD', [ trImg('r1'), '+', trImg('r2'),
					'+', trImg('r3'), '+', trImg('r4'), '=' ]));
			proc[0] = atS[1][2] + atS[1][3] + atS[1][4] + atS[1][5];
			if (atS[0][1] == 0)
				ress = [ 0, 0, 0, 0, 0 ];
			proc[5] = ress[1] + ress[2] + ress[3] + ress[4];
			proc[1] = dfS[1][2] + dfS[1][3] + dfS[1][4] + dfS[1][5];
			proc[4] = proc[1] + proc[5];
			proc[2] = Math.round((proc[0]) / (proc[0] + proc[4]) * 100).NaN0();
			newTR.appendChild($em('TD', [
					humanRF(atS[1][2]) + ' + ' + humanRF(atS[1][3]) + ' + '
							+ humanRF(atS[1][4]) + ' + ' + humanRF(atS[1][5]),
					$e('BR'), ' = ' + humanRF(proc[0]) ]));
			newTR.appendChild($em('TD', [
					humanRF(dfS[1][2] + ress[1]) + ' + '
							+ humanRF(dfS[1][3] + ress[2]) + ' + '
							+ humanRF(dfS[1][4] + ress[3]) + ' + '
							+ humanRF(dfS[1][5] + ress[4]), $e('BR'),
					' = ' + humanRF(proc[4]) ]));
			newTR.appendChild($c(proc[2] + '%'));
			newTABLE.appendChild(newTR);
			// carry
			var newTR = $ee('TR', $c(trImg(allIDs[33])));
			proc[4] = atS[0][1] > 0 ? Math.round(proc[5] / atS[0][1] * 100) : 0;
			newTR.appendChild($c(proc[4] + '%'));
			newTR.appendChild($c($a('(kirilloid)',
					[
							[
									'href',
									'http://travian.kirilloid.ru/warsim'
											+ (ver4FL ? '2' : '') + '.php'
											+ kirilloid ],
							[ 'target', '_blank' ],
							[ 'style', 'font-size:11px;' ] ])));
			proc[4] = proc[5] > 0 ? Math.round((proc[5] - proc[0]) / proc[5]
					* 100) : '--';
			newTR.appendChild($c(proc[4] + '%'));
			newTABLE.appendChild(newTR);

			var toLog = $a('travian-reports.net');
			toLog.addEventListener("click", addReport, true);
			newTABLE.appendChild($ee('TR', $c(toLog, [ [ 'colspan', 4 ] ])));

			tt[0].parentNode.appendChild(newTABLE);
		}

		function returnQuickHelp() {
			var qh = $g('anwersQuestionMark');
			var i = "return Travian.Game.iPopup(0,0, 'gid');"; // 'return
			// Travian.iPopup(0,0);'
			if (qh)
				$at($gt('A', qh)[0], [ [ 'href', '#' ], [ 'onclick', i ] ]);
			else
				$g('mid').parentNode
						.appendChild($ee('div', $e('A', [ [ 'href', '#' ],
								[ 'target', '_blank' ], [ 'onclick', i ] ]),
								[ [ 'id', "anwersQuestionMark" ] ]));
		}

		function rpDefaultAction() {
			var nc = $xf('.//input[@name="c"]', 'l', cont);
			if (nc.snapshotLength < 3)
				return;
			if (RB.Setup[27] > 0)
				if (typeof nc.snapshotItem(RB.Setup[27]).getAttribute(
						'disabled') != "string")
					nc.snapshotItem(RB.Setup[27]).checked = true;
			if (RB.dictFL[16] > 0)
				return;
			for ( var i = 0; i < nc.snapshotLength; i++) {
				RB.dictionary[16 + i] = nc.snapshotItem(i).parentNode.innerHTML
						.onlyText().trim();
			}
			saveCookie('Dict', 'dictionary');
			RB.dictFL[16] = 1;
			saveCookie('DictFL', 'dictFL');
		}

		function addReport() {
			if (closeWindowN(8))
				return;
			var reportO = $g('report_surround');
			if (!(reportO))
				return;

			function cancelLog() {
				closeWindowN(8);
			}

			var report = reportO.cloneNode(true);
			var rt = $gc(allIDs[7], report)[0];
			rt.parentNode.removeChild(rt);

			var reportV = report.innerHTML.replace(/<button[\s\S]+?button>/g,
					'').replace(/\"\"/g, '').replace(/<script[\s\S]+?script>/g,
					'').replace(/alt=\"(.+?)\"/g, ">$1<a").replace(/\s{2,}/g,
					' ').replace(/<\/th>|<\/td>/g, "\t").replace(
					/<\/div>|<\/tr>/g, "\n").onlyText()
					.replace(/\n{2,}/g, '\n');
			var form = $e('FORM', [ [ 'method', 'post' ],
					[ 'action', 'http://travian-reports.net/convert' ],
					[ 'target', '_blank' ] ]);
			form.appendChild($e('input', [ [ 'type', 'hidden' ],
					[ 'name', 'design' ], [ 'value', (ver4FL ? 1 : 0) ] ]));
			form.appendChild($ee('textarea', reportV, [ [ 'name', 'report' ],
					[ 'cols', 30 ], [ 'rows', 10 ] ]));
			form.appendChild($em('DIV', [
					$e('input', [ [ 'type', 'checkbox' ],
							[ 'name', 'anonymous' ] ]), "anonymous" ]));
			form.appendChild($em('DIV', [
					$e('input', [ [ 'type', 'checkbox' ], [ 'name', 'h_a' ] ]),
					"hide attaker" ]));
			form.appendChild($em('DIV', [
					$e('input', [ [ 'type', 'checkbox' ], [ 'name', 'h_d' ] ]),
					"hide defender" ]));
			var newBTX = $ee('BUTTON', "cancel", [ [ 'class', allIDs[15] ],
					[ 'onClick', jsNone ] ]);
			newBTX.addEventListener('click', cancelLog, true);
			form.appendChild($em('DIV', [
					$e('input', [ [ 'type', 'submit' ], [ 'name', 'step1' ] ]),
					newBTX ]));
			var newRF = $ee('DIV', form,
					[ [ 'style', 'background-color:cyan;' ] ]);

			var xy = offsetPosition(this);
			windowID[8] = makeFloat(newRF, xy[0] - 100, xy[1] - 250, 21);
		}

		/** ************************ center number *************************** */
		function centerNumber() {

			var dorf = 0;
			var bCost = [
					[ 0 ],// dummy
					[// lumberCost gid = 1
					[ 0, 0, 0, 0, 0, 0 ], [ 40, 100, 50, 60, 1, 2 ],
							[ 65, 165, 85, 100, 1, 3 ],
							[ 110, 280, 140, 165, 2, 4 ],
							[ 185, 465, 235, 280, 2, 5 ],
							[ 310, 780, 390, 465, 2, 6 ],
							[ 520, 1300, 650, 780, 3, 8 ],
							[ 870, 2170, 1085, 1300, 4, 10 ],
							[ 1450, 3625, 1810, 2175, 4, 12 ],
							[ 2420, 6050, 3025, 3630, 5, 14 ],
							[ 4040, 10105, 5050, 6060, 6, 16 ],// 10
							[ 6750, 16870, 8435, 10125, 7, 18 ],
							[ 11270, 28175, 14090, 16905, 9, 20 ],
							[ 18820, 47055, 23525, 28230, 11, 22 ],
							[ 31430, 78580, 39290, 47150, 13, 24 ],
							[ 52490, 131230, 65615, 78740, 15, 26 ],
							[ 87660, 219155, 109575, 131490, 18, 29 ],
							[ 146395, 365985, 182995, 219590, 22, 32 ],
							[ 244480, 611195, 305600, 366715, 27, 35 ],
							[ 408280, 1020695, 510350, 612420, 32, 38 ],
							[ 681825, 1704565, 852280, 1022740, 38, 41 ],// 20
							[ 1138650, 2846620, 1423310, 1707970, 38, 44 ],
							[ 1901540, 4753855, 2376925, 2852315, 38, 47 ],
							[ 3175575, 7938935, 3969470, 4763360, 38, 50 ],
							[ 5303210, 13258025, 6629015, 7954815, 38, 53 ],
							[ 8856360, 22140900, 11070450, 13284540, 38, 56 ] // 25
					],
					[// clayCost gid = 2
					[ 0, 0, 0, 0, 0, 0 ], [ 80, 40, 80, 50, 1, 2 ],
							[ 135, 65, 135, 85, 1, 3 ],
							[ 225, 110, 225, 140, 2, 4 ],
							[ 375, 185, 375, 235, 2, 5 ],
							[ 620, 310, 620, 390, 2, 6 ],
							[ 1040, 520, 1040, 650, 3, 8 ],
							[ 1735, 870, 1735, 1085, 4, 10 ],
							[ 2900, 1450, 2900, 1810, 4, 12 ],
							[ 4840, 2420, 4840, 3025, 5, 14 ],
							[ 8080, 4040, 8080, 5050, 6, 16 ],// 10
							[ 13500, 6750, 13500, 8435, 7, 18 ],
							[ 22540, 11270, 22540, 14090, 9, 20 ],
							[ 37645, 18820, 37645, 23525, 11, 22 ],
							[ 62865, 31430, 62865, 39290, 13, 24 ],
							[ 104985, 52490, 104985, 65615, 15, 26 ],
							[ 175320, 87660, 175320, 109575, 18, 29 ],
							[ 292790, 146395, 292790, 182995, 22, 32 ],
							[ 488955, 244480, 488955, 305600, 27, 35 ],
							[ 816555, 408280, 816555, 510350, 32, 38 ],
							[ 1363650, 681825, 1363650, 852280, 38, 41 ],// 20
							[ 2277295, 1138650, 2277295, 1423310, 38, 44 ],
							[ 3803085, 1901540, 3803085, 2376925, 38, 47 ],
							[ 6351150, 3175575, 6351150, 3969470, 38, 50 ],
							[ 10606420, 5303210, 10606420, 6629015, 38, 53 ],
							[ 17712720, 8856360, 17712720, 11070450, 38, 56 ] // 25
					],
					[// ironCost gid = 3
					[ 0, 0, 0, 0, 0, 0 ], [ 100, 80, 30, 60, 1, 3 ],
							[ 165, 135, 50, 100, 1, 5 ],
							[ 280, 225, 85, 165, 2, 7 ],
							[ 465, 375, 140, 280, 2, 9 ],
							[ 780, 620, 235, 465, 2, 11 ],
							[ 1300, 1040, 390, 780, 3, 13 ],
							[ 2170, 1735, 650, 1300, 4, 15 ],
							[ 3625, 2900, 1085, 2175, 4, 17 ],
							[ 6050, 4840, 1815, 3630, 5, 19 ],
							[ 10105, 8080, 3030, 6060, 6, 21 ],// 10
							[ 16870, 13500, 5060, 10125, 7, 24 ],
							[ 28175, 22540, 8455, 16905, 9, 27 ],
							[ 47055, 37645, 14115, 28230, 11, 30 ],
							[ 78580, 62865, 23575, 47150, 13, 33 ],
							[ 131230, 104985, 39370, 78740, 15, 36 ],
							[ 219155, 175320, 65745, 131490, 18, 39 ],
							[ 365985, 292790, 109795, 219590, 22, 42 ],
							[ 611195, 488955, 183360, 366715, 27, 45 ],
							[ 1020695, 816555, 306210, 612420, 32, 48 ],
							[ 1704565, 1363650, 511370, 1022740, 38, 51 ],// 20
							[ 2846620, 2277295, 853985, 1707970, 38, 54 ],
							[ 4753855, 3803085, 1426155, 2852315, 38, 57 ],
							[ 7938935, 6351150, 2381680, 4763360, 38, 60 ],
							[ 13258025, 10606420, 3977410, 7954815, 38, 63 ],
							[ 22140900, 17712720, 6642270, 13284540, 38, 66 ] // 25
					],
					[// cropCost gid = 4
					[ 0, 0, 0, 0, 0, 0 ], [ 70, 90, 70, 20, 1, 0 ],
							[ 115, 150, 115, 35, 1, 0 ],
							[ 195, 250, 195, 55, 2, 0 ],
							[ 325, 420, 325, 95, 2, 0 ],
							[ 545, 700, 545, 155, 2, 0 ],
							[ 910, 1170, 910, 260, 3, 1 ],
							[ 1520, 1950, 1520, 435, 4, 2 ],
							[ 2535, 3260, 2535, 725, 4, 3 ],
							[ 4235, 5445, 4235, 1210, 5, 4 ],
							[ 7070, 9095, 7070, 2020, 6, 5 ],// 10
							[ 11810, 15185, 11810, 3375, 7, 6 ],
							[ 19725, 25360, 19725, 5635, 9, 7 ],
							[ 32940, 42350, 32940, 9410, 11, 8 ],
							[ 55005, 70720, 55005, 15715, 13, 9 ],
							[ 91860, 118105, 91860, 26245, 15, 10 ],
							[ 153405, 197240, 153405, 43830, 18, 12 ],
							[ 256190, 329385, 256190, 73195, 22, 14 ],
							[ 427835, 550075, 427835, 122240, 27, 16 ],
							[ 714485, 918625, 714485, 204140, 32, 18 ],
							[ 1193195, 1534105, 1193195, 340915, 38, 20 ],// 20
							[ 1992635, 2561960, 1992635, 569325, 38, 22 ],
							[ 3327700, 4278470, 3327700, 950770, 38, 24 ],
							[ 5557255, 7145045, 5557255, 1587785, 38, 26 ],
							[ 9280620, 11932225, 9280620, 2651605, 38, 28 ],
							[ 15498630, 19926810, 15498630, 4428180, 38, 30 ] // 25
					],
					[// sawmillCost gid = 5
					[ 0, 0, 0, 0, 0, 0 ], [ 520, 380, 290, 90, 1, 4 ],
							[ 935, 685, 520, 160, 1, 6 ],
							[ 1685, 1230, 940, 290, 2, 8 ],
							[ 3035, 2215, 1690, 525, 2, 10 ],
							[ 5460, 3990, 3045, 945, 2, 12 ] ],
					[// brickyardCost gid = 6
					[ 0, 0, 0, 0, 0, 0 ], [ 440, 480, 320, 50, 1, 3 ],
							[ 790, 865, 575, 90, 1, 5 ],
							[ 1425, 1555, 1035, 160, 2, 7 ],
							[ 2565, 2800, 1865, 290, 2, 9 ],
							[ 4620, 5040, 3360, 525, 2, 11 ] ],
					[// ironFoundryCost gid = 7
					[ 0, 0, 0, 0, 0, 0 ], [ 200, 450, 510, 120, 1, 6 ],
							[ 360, 810, 920, 215, 1, 9 ],
							[ 650, 1460, 1650, 390, 2, 12 ],
							[ 1165, 2625, 2975, 700, 2, 15 ],
							[ 2100, 4725, 5355, 1260, 2, 18 ] ],
					[// grainMillCost gid = 8
					[ 0, 0, 0, 0, 0, 0 ], [ 500, 440, 380, 1240, 1, 3 ],
							[ 900, 790, 685, 2230, 1, 5 ],
							[ 1620, 1425, 1230, 4020, 2, 7 ],
							[ 2915, 2565, 2215, 7230, 2, 9 ],
							[ 5250, 4620, 3990, 13015, 2, 11 ] ],
					[// bakeryCost gid = 9
					[ 0, 0, 0, 0, 0, 0 ], [ 1200, 1480, 870, 1600, 1, 4 ],
							[ 2160, 2665, 1565, 2880, 1, 6 ],
							[ 3890, 4795, 2820, 5185, 2, 8 ],
							[ 7000, 8630, 5075, 9330, 2, 10 ],
							[ 12595, 15535, 9135, 16795, 2, 12 ] ],
					[// warehouseCost gid = 10
					[ 0, 0, 0, 0, 0, 0 ], [ 130, 160, 90, 40, 1, 1 ],
							[ 165, 205, 115, 50, 1, 2 ],
							[ 215, 260, 145, 65, 2, 3 ],
							[ 275, 335, 190, 85, 2, 4 ],
							[ 350, 430, 240, 105, 2, 5 ],
							[ 445, 550, 310, 135, 3, 6 ],
							[ 570, 705, 395, 175, 4, 7 ],
							[ 730, 900, 505, 225, 4, 8 ],
							[ 935, 1155, 650, 290, 5, 9 ],
							[ 1200, 1475, 830, 370, 6, 10 ],// 10
							[ 1535, 1890, 1065, 470, 7, 12 ],
							[ 1965, 2420, 1360, 605, 9, 14 ],
							[ 2515, 3095, 1740, 775, 11, 16 ],
							[ 3220, 3960, 2230, 990, 13, 18 ],
							[ 4120, 5070, 2850, 1270, 15, 20 ],
							[ 5275, 6490, 3650, 1625, 18, 22 ],
							[ 6750, 8310, 4675, 2075, 22, 24 ],
							[ 8640, 10635, 5980, 2660, 27, 26 ],
							[ 11060, 13610, 7655, 3405, 32, 28 ],
							[ 14155, 17420, 9800, 4355, 38, 30 ] // 20
					],
					[// granaryCost gid = 11
					[ 0, 0, 0, 0, 0, 0 ], [ 80, 100, 70, 20, 1, 1 ],
							[ 100, 130, 90, 25, 1, 2 ],
							[ 130, 165, 115, 35, 2, 3 ],
							[ 170, 210, 145, 40, 2, 4 ],
							[ 215, 270, 190, 55, 2, 5 ],
							[ 275, 345, 240, 70, 3, 6 ],
							[ 350, 440, 310, 90, 4, 7 ],
							[ 450, 565, 395, 115, 4, 8 ],
							[ 575, 720, 505, 145, 5, 9 ],
							[ 740, 920, 645, 185, 6, 10 ],// 10
							[ 945, 1180, 825, 235, 7, 12 ],
							[ 1210, 1510, 1060, 300, 9, 14 ],
							[ 1545, 1935, 1355, 385, 11, 16 ],
							[ 1980, 2475, 1735, 495, 13, 18 ],
							[ 2535, 3170, 2220, 635, 15, 20 ],
							[ 3245, 4055, 2840, 810, 18, 22 ],
							[ 4155, 5190, 3635, 1040, 22, 24 ],
							[ 5315, 6645, 4650, 1330, 27, 26 ],
							[ 6805, 8505, 5955, 1700, 32, 28 ],
							[ 8710, 10890, 7620, 2180, 38, 30 ] // 20
					],
					[// blacksmithCost gid = 12
					[ 0, 0, 0, 0, 0, 0 ], [ 170, 200, 380, 130, 2, 4 ],
							[ 220, 255, 485, 165, 3, 6 ],
							[ 280, 330, 625, 215, 3, 8 ],
							[ 355, 420, 795, 275, 4, 10 ],
							[ 455, 535, 1020, 350, 5, 12 ],
							[ 585, 685, 1305, 445, 6, 15 ],
							[ 750, 880, 1670, 570, 7, 18 ],
							[ 955, 1125, 2140, 730, 9, 21 ],
							[ 1225, 1440, 2740, 935, 10, 24 ],
							[ 1570, 1845, 3505, 1200, 12, 27 ],// 10
							[ 2005, 2360, 4485, 1535, 15, 30 ],
							[ 2570, 3020, 5740, 1965, 18, 33 ],
							[ 3290, 3870, 7350, 2515, 21, 36 ],
							[ 4210, 4950, 9410, 3220, 26, 39 ],
							[ 5390, 6340, 12045, 4120, 31, 42 ],
							[ 6895, 8115, 15415, 5275, 37, 46 ],
							[ 8825, 10385, 19730, 6750, 44, 50 ],
							[ 11300, 13290, 25255, 8640, 53, 54 ],
							[ 14460, 17015, 32325, 11060, 64, 58 ],
							[ 18510, 21780, 41380, 14155, 77, 62 ] // 20
					],
					[// armouryCost gid = 13
					[ 0, 0, 0, 0, 0, 0 ], [ 130, 210, 410, 130, 2, 4 ],
							[ 165, 270, 525, 165, 3, 6 ],
							[ 215, 345, 670, 215, 3, 8 ],
							[ 275, 440, 860, 275, 4, 10 ],
							[ 350, 565, 1100, 350, 5, 12 ],
							[ 445, 720, 1410, 445, 6, 15 ],
							[ 570, 925, 1805, 570, 7, 18 ],
							[ 730, 1180, 2310, 730, 9, 21 ],
							[ 935, 1515, 2955, 935, 10, 24 ],
							[ 1200, 1935, 3780, 1200, 12, 27 ],// 10
							[ 1535, 2480, 4840, 1535, 15, 30 ],
							[ 1965, 3175, 6195, 1965, 18, 33 ],
							[ 2515, 4060, 7930, 2515, 21, 36 ],
							[ 3220, 5200, 10150, 3220, 26, 39 ],
							[ 4120, 6655, 12995, 4120, 31, 42 ],
							[ 5275, 8520, 16630, 5275, 37, 46 ],
							[ 6750, 10905, 21290, 6750, 44, 50 ],
							[ 8640, 13955, 27250, 8640, 53, 54 ],
							[ 11060, 17865, 34880, 11060, 64, 58 ],
							[ 14155, 22865, 44645, 14155, 77, 62 ] // 20
					],
					[// tournamentSquareCost gid = 14
					[ 0, 0, 0, 0, 0, 0 ], [ 1750, 2250, 1530, 240, 1, 1 ],
							[ 2240, 2880, 1960, 305, 1, 2 ],
							[ 2865, 3685, 2505, 395, 2, 3 ],
							[ 3670, 4720, 3210, 505, 2, 4 ],
							[ 4700, 6040, 4105, 645, 2, 5 ],
							[ 6015, 7730, 5255, 825, 3, 6 ],
							[ 7695, 9895, 6730, 1055, 4, 7 ],
							[ 9850, 12665, 8615, 1350, 4, 8 ],
							[ 12610, 16215, 11025, 1730, 5, 9 ],
							[ 16140, 20755, 14110, 2215, 6, 10 ],// 10
							[ 20660, 26565, 18065, 2835, 7, 12 ],
							[ 26445, 34000, 23120, 3625, 9, 14 ],
							[ 33850, 43520, 29595, 4640, 11, 16 ],
							[ 43330, 55705, 37880, 5940, 13, 18 ],
							[ 55460, 71305, 48490, 7605, 15, 20 ],
							[ 70990, 91270, 62065, 9735, 18, 22 ],
							[ 90865, 116825, 79440, 12460, 22, 24 ],
							[ 116305, 149540, 101685, 15950, 27, 26 ],
							[ 148875, 191410, 130160, 20415, 32, 28 ],
							[ 190560, 245005, 166600, 26135, 38, 30 ] // 20
					],
					[// mainBuildingCost gid = 15
					[ 0, 0, 0, 0, 0, 0 ], [ 70, 40, 60, 20, 2, 2 ],
							[ 90, 50, 75, 25, 3, 3 ],
							[ 115, 65, 100, 35, 3, 4 ],
							[ 145, 85, 125, 40, 4, 5 ],
							[ 190, 105, 160, 55, 5, 6 ],
							[ 240, 135, 205, 70, 6, 8 ],
							[ 310, 175, 265, 90, 7, 10 ],
							[ 395, 225, 340, 115, 9, 12 ],
							[ 505, 290, 430, 145, 10, 14 ],
							[ 645, 370, 555, 185, 12, 16 ],// 10
							[ 825, 470, 710, 235, 15, 18 ],
							[ 1060, 605, 905, 300, 18, 20 ],
							[ 1355, 775, 1160, 385, 21, 22 ],
							[ 1735, 990, 1485, 495, 26, 24 ],
							[ 2220, 1270, 1900, 635, 31, 26 ],
							[ 2840, 1625, 2435, 810, 37, 29 ],
							[ 3635, 2075, 3115, 1040, 44, 32 ],
							[ 4650, 2660, 3990, 1330, 53, 35 ],
							[ 5955, 3405, 5105, 1700, 64, 38 ],
							[ 7620, 4355, 6535, 2180, 77, 41 ] // 20
					],
					[// rallyPointCost gid = 16
					[ 0, 0, 0, 0, 0, 0 ], [ 110, 160, 90, 70, 1, 1 ],
							[ 140, 205, 115, 90, 1, 2 ],
							[ 180, 260, 145, 115, 2, 3 ],
							[ 230, 335, 190, 145, 2, 4 ],
							[ 295, 430, 240, 190, 2, 5 ],
							[ 380, 550, 310, 240, 3, 6 ],
							[ 485, 705, 395, 310, 4, 7 ],
							[ 620, 900, 505, 395, 4, 8 ],
							[ 795, 1155, 650, 505, 5, 9 ],
							[ 1015, 1475, 830, 645, 6, 10 ],// 10
							[ 1300, 1890, 1065, 825, 7, 12 ],
							[ 1660, 2420, 1360, 1060, 9, 14 ],
							[ 2130, 3095, 1740, 1355, 11, 16 ],
							[ 2725, 3960, 2230, 1735, 13, 18 ],
							[ 3485, 5070, 2850, 2220, 15, 20 ],
							[ 4460, 6490, 3650, 2840, 18, 22 ],
							[ 5710, 8310, 4675, 3635, 22, 24 ],
							[ 7310, 10635, 5980, 4650, 27, 26 ],
							[ 9360, 13610, 7655, 5955, 32, 28 ],
							[ 11980, 17420, 9800, 7620, 38, 30 ] // 20
					],
					[// marketplaceCost gid = 17
					[ 0, 0, 0, 0, 0, 0 ], [ 80, 70, 120, 70, 4, 4 ],
							[ 100, 90, 155, 90, 4, 6 ],
							[ 130, 115, 195, 115, 5, 8 ],
							[ 170, 145, 250, 145, 6, 10 ],
							[ 215, 190, 320, 190, 7, 12 ],
							[ 275, 240, 410, 240, 9, 15 ],
							[ 350, 310, 530, 310, 11, 18 ],
							[ 450, 395, 675, 395, 13, 21 ],
							[ 575, 505, 865, 505, 15, 24 ],
							[ 740, 645, 1105, 645, 19, 27 ],// 10
							[ 945, 825, 1415, 825, 22, 30 ],
							[ 1210, 1060, 1815, 1060, 27, 33 ],
							[ 1545, 1355, 2320, 1355, 32, 38 ],
							[ 1980, 1735, 2970, 1735, 39, 41 ],
							[ 2535, 2220, 3805, 2220, 46, 44 ],
							[ 3245, 2840, 4870, 2840, 55, 48 ],
							[ 4155, 3635, 6230, 3635, 67, 52 ],
							[ 5315, 4650, 7975, 4650, 80, 56 ],
							[ 6805, 5955, 10210, 5955, 96, 60 ],
							[ 8710, 7620, 13065, 7620, 115, 64 ] // 20
					],
					[// embassyCost gid = 18
					[ 0, 0, 0, 0, 0, 0 ], [ 180, 130, 150, 80, 5, 3 ],
							[ 230, 165, 190, 100, 6, 5 ],
							[ 295, 215, 245, 130, 7, 7 ],
							[ 375, 275, 315, 170, 8, 9 ],
							[ 485, 350, 405, 215, 10, 11 ],
							[ 620, 445, 515, 275, 12, 13 ],
							[ 790, 570, 660, 350, 14, 15 ],
							[ 1015, 730, 845, 450, 17, 17 ],
							[ 1295, 935, 1080, 575, 21, 19 ],
							[ 1660, 1200, 1385, 740, 25, 21 ],// 10
							[ 2125, 1535, 1770, 945, 30, 24 ],
							[ 2720, 1965, 2265, 1210, 36, 27 ],
							[ 3480, 2515, 2900, 1545, 43, 30 ],
							[ 4455, 3220, 3715, 1980, 51, 33 ],
							[ 5705, 4120, 4755, 2535, 62, 36 ],
							[ 7300, 5275, 6085, 3245, 74, 39 ],
							[ 9345, 6750, 7790, 4155, 89, 42 ],
							[ 11965, 8640, 9970, 5315, 106, 45 ],
							[ 15315, 11060, 12760, 6805, 128, 48 ],
							[ 19600, 14155, 16335, 8710, 153, 51 ] // 20
					],
					[// barracksCost gid = 19
					[ 0, 0, 0, 0, 0, 0 ], [ 210, 140, 260, 120, 1, 4 ],
							[ 270, 180, 335, 155, 1, 6 ],
							[ 345, 230, 425, 195, 2, 8 ],
							[ 440, 295, 545, 250, 2, 10 ],
							[ 565, 375, 700, 320, 2, 12 ],
							[ 720, 480, 895, 410, 3, 15 ],
							[ 925, 615, 1145, 530, 4, 18 ],
							[ 1180, 790, 1465, 675, 4, 21 ],
							[ 1515, 1010, 1875, 865, 5, 24 ],
							[ 1935, 1290, 2400, 1105, 6, 27 ],// 10
							[ 2480, 1655, 3070, 1415, 7, 30 ],
							[ 3175, 2115, 3930, 1815, 9, 33 ],
							[ 4060, 2710, 5030, 2320, 11, 36 ],
							[ 5200, 3465, 6435, 2970, 13, 39 ],
							[ 6655, 4435, 8240, 3805, 15, 42 ],
							[ 8520, 5680, 10545, 4870, 18, 46 ],
							[ 10905, 7270, 13500, 6230, 22, 50 ],
							[ 13955, 9305, 17280, 7975, 27, 54 ],
							[ 17865, 11910, 22120, 10210, 32, 58 ],
							[ 22865, 15245, 28310, 13065, 38, 62 ] // 20
					],
					[// stableCost gid = 20
					[ 0, 0, 0, 0, 0, 0 ], [ 260, 140, 220, 100, 2, 5 ],
							[ 335, 180, 280, 130, 3, 8 ],
							[ 425, 230, 360, 165, 3, 11 ],
							[ 545, 295, 460, 210, 4, 14 ],
							[ 700, 375, 590, 270, 5, 17 ],
							[ 895, 480, 755, 345, 6, 20 ],
							[ 1145, 615, 970, 440, 7, 23 ],
							[ 1465, 790, 1240, 565, 9, 26 ],
							[ 1875, 1010, 1585, 720, 10, 29 ],
							[ 2400, 1290, 2030, 920, 12, 32 ],// 10
							[ 3070, 1655, 2595, 1180, 15, 36 ],
							[ 3930, 2115, 3325, 1510, 18, 40 ],
							[ 5030, 2710, 4255, 1935, 21, 44 ],
							[ 6435, 3465, 5445, 2475, 26, 48 ],
							[ 8240, 4435, 6970, 3170, 31, 52 ],
							[ 10545, 5680, 8925, 4055, 37, 56 ],
							[ 13500, 7270, 11425, 5190, 44, 60 ],
							[ 17280, 9305, 14620, 6645, 53, 64 ],
							[ 22120, 11910, 18715, 8505, 64, 68 ],
							[ 28310, 15245, 23955, 10890, 77, 72 ] // 20
					],
					[// workshopCost gid = 21
					[ 0, 0, 0, 0, 0, 0 ], [ 460, 510, 600, 320, 4, 3 ],
							[ 590, 655, 770, 410, 4, 5 ],
							[ 755, 835, 985, 525, 5, 7 ],
							[ 965, 1070, 1260, 670, 6, 9 ],
							[ 1235, 1370, 1610, 860, 7, 11 ],
							[ 1580, 1750, 2060, 1100, 9, 13 ],
							[ 2025, 2245, 2640, 1405, 11, 15 ],
							[ 2590, 2870, 3380, 1800, 13, 17 ],
							[ 3315, 3675, 4325, 2305, 15, 19 ],
							[ 4245, 4705, 5535, 2950, 19, 21 ],// 10
							[ 5430, 6020, 7085, 3780, 22, 24 ],
							[ 6950, 7705, 9065, 4835, 27, 27 ],
							[ 8900, 9865, 11605, 6190, 32, 30 ],
							[ 11390, 12625, 14855, 7925, 39, 33 ],
							[ 14580, 16165, 19015, 10140, 46, 36 ],
							[ 18660, 20690, 24340, 12980, 55, 39 ],
							[ 23885, 26480, 31155, 16615, 67, 42 ],
							[ 30570, 33895, 39875, 21270, 80, 45 ],
							[ 39130, 43385, 51040, 27225, 96, 48 ],
							[ 50090, 55535, 65335, 34845, 115, 51 ] // 20
					],
					[// academyCost gid = 22
					[ 0, 0, 0, 0, 0, 0 ], [ 220, 160, 90, 40, 5, 4 ],
							[ 280, 205, 115, 50, 6, 6 ],
							[ 360, 260, 145, 65, 7, 8 ],
							[ 460, 335, 190, 85, 8, 10 ],
							[ 590, 430, 240, 105, 10, 12 ],
							[ 755, 550, 310, 135, 12, 15 ],
							[ 970, 705, 395, 175, 14, 18 ],
							[ 1240, 900, 505, 225, 17, 21 ],
							[ 1585, 1155, 650, 290, 21, 24 ],
							[ 2030, 1475, 830, 370, 25, 27 ],// 10
							[ 2595, 1890, 1065, 470, 30, 30 ],
							[ 3325, 2420, 1360, 605, 36, 33 ],
							[ 4255, 3095, 1740, 775, 43, 36 ],
							[ 5445, 3960, 2230, 990, 51, 39 ],
							[ 6970, 5070, 2850, 1270, 62, 42 ],
							[ 8925, 6490, 3650, 1625, 74, 46 ],
							[ 11425, 8310, 4675, 2075, 89, 50 ],
							[ 14620, 10635, 5980, 2660, 106, 54 ],
							[ 18715, 13610, 7655, 3405, 128, 58 ],
							[ 23955, 17420, 9800, 4355, 153, 62 ] // 20
					],
					[// crannyCost gid = 23
					[ 0, 0, 0, 0, 0, 0 ], [ 40, 50, 30, 10, 1, 0 ],
							[ 50, 65, 40, 15, 1, 0 ], [ 65, 80, 50, 15, 2, 0 ],
							[ 85, 105, 65, 20, 2, 0 ],
							[ 105, 135, 80, 25, 2, 0 ],
							[ 135, 170, 105, 35, 3, 1 ],
							[ 175, 220, 130, 45, 4, 2 ],
							[ 225, 280, 170, 55, 4, 3 ],
							[ 290, 360, 215, 70, 5, 4 ],
							[ 370, 460, 275, 90, 6, 5 ] // 10
					],
					[// townhallCost gid = 24
					[ 0, 0, 0, 0, 0, 0 ], [ 1250, 1110, 1260, 600, 6, 4 ],
							[ 1600, 1420, 1615, 770, 7, 6 ],
							[ 2050, 1820, 2065, 985, 9, 8 ],
							[ 2620, 2330, 2640, 1260, 10, 10 ],
							[ 3355, 2980, 3380, 1610, 12, 12 ],
							[ 4295, 3815, 4330, 2060, 15, 15 ],
							[ 5500, 4880, 5540, 2640, 18, 18 ],
							[ 7035, 6250, 7095, 3380, 21, 21 ],
							[ 9005, 8000, 9080, 4325, 26, 24 ],
							[ 11530, 10240, 11620, 5535, 31, 27 ],// 10
							[ 14755, 13105, 14875, 7085, 37, 30 ],
							[ 18890, 16775, 19040, 9065, 45, 33 ],
							[ 24180, 21470, 24370, 11605, 53, 36 ],
							[ 30950, 27480, 31195, 14855, 64, 39 ],
							[ 39615, 35175, 39930, 19015, 77, 42 ],
							[ 50705, 45025, 51110, 24340, 92, 46 ],
							[ 64905, 57635, 65425, 31155, 111, 50 ],
							[ 83075, 73770, 83740, 39875, 133, 54 ],
							[ 106340, 94430, 107190, 51040, 160, 58 ],
							[ 136115, 120870, 137200, 65335, 192, 62 ] // 20
					],
					[// residenceCost gid = 25
					[ 0, 0, 0, 0, 0, 0 ], [ 580, 460, 350, 180, 2, 1 ],
							[ 740, 590, 450, 230, 3, 2 ],
							[ 950, 755, 575, 295, 3, 3 ],
							[ 1215, 965, 735, 375, 4, 4 ],
							[ 1555, 1235, 940, 485, 5, 5 ],
							[ 1995, 1580, 1205, 620, 6, 6 ],
							[ 2550, 2025, 1540, 790, 7, 7 ],
							[ 3265, 2590, 1970, 1015, 9, 8 ],
							[ 4180, 3315, 2520, 1295, 11, 9 ],
							[ 5350, 4245, 3230, 1660, 12, 10 ],// 10
							[ 6845, 5430, 4130, 2125, 15, 12 ],
							[ 8765, 6950, 5290, 2720, 18, 14 ],
							[ 11220, 8900, 6770, 3480, 21, 16 ],
							[ 14360, 11390, 8665, 4455, 26, 18 ],
							[ 18380, 14580, 11090, 5705, 31, 20 ],
							[ 23530, 18660, 14200, 7300, 37, 22 ],
							[ 30115, 23885, 18175, 9345, 44, 24 ],
							[ 38550, 30570, 23260, 11965, 53, 26 ],
							[ 49340, 39130, 29775, 15315, 64, 28 ],
							[ 63155, 50090, 38110, 19600, 77, 30 ] // 20
					],
					[// palaceCost gid = 26
					[ 0, 0, 0, 0, 0, 0 ], [ 550, 800, 750, 250, 6, 1 ],
							[ 705, 1025, 960, 320, 7, 2 ],
							[ 900, 1310, 1230, 410, 9, 3 ],
							[ 1155, 1680, 1575, 525, 10, 4 ],
							[ 1475, 2145, 2015, 670, 12, 5 ],
							[ 1890, 2750, 2575, 860, 15, 6 ],
							[ 2420, 3520, 3300, 1100, 18, 7 ],
							[ 3095, 4505, 4220, 1405, 21, 8 ],
							[ 3965, 5765, 5405, 1800, 26, 9 ],
							[ 5075, 7380, 6920, 2305, 31, 10 ],// 10
							[ 6495, 9445, 8855, 2950, 37, 12 ],
							[ 8310, 12090, 11335, 3780, 45, 14 ],
							[ 10640, 15475, 14505, 4835, 53, 16 ],
							[ 13615, 19805, 18570, 6190, 64, 18 ],
							[ 17430, 25355, 23770, 7925, 77, 20 ],
							[ 22310, 32450, 30425, 10140, 92, 22 ],
							[ 28560, 41540, 38940, 12980, 111, 24 ],
							[ 36555, 53170, 49845, 16615, 133, 26 ],
							[ 46790, 68055, 63805, 21270, 160, 28 ],
							[ 59890, 87110, 81670, 27225, 192, 30 ] // 20
					],
					[// treasuryCost gid = 27
					[ 0, 0, 0, 0, 0, 0 ], [ 2880, 2740, 2580, 990, 7, 4 ],
							[ 3630, 3450, 3250, 1245, 9, 6 ],
							[ 4570, 4350, 4095, 1570, 10, 8 ],
							[ 5760, 5480, 5160, 1980, 12, 10 ],
							[ 7260, 6905, 6505, 2495, 15, 12 ],
							[ 9145, 8700, 8195, 3145, 18, 15 ],
							[ 11525, 10965, 10325, 3960, 21, 18 ],
							[ 14520, 13815, 13010, 4990, 26, 21 ],
							[ 18295, 17405, 16390, 6290, 31, 24 ],
							[ 23055, 21930, 20650, 7925, 37, 27 ],// 10
							[ 29045, 27635, 26020, 9985, 45, 30 ],
							[ 36600, 34820, 32785, 12580, 53, 33 ],
							[ 46115, 43875, 41310, 15850, 64, 36 ],
							[ 58105, 55280, 52050, 19975, 77, 39 ],
							[ 73210, 69655, 65585, 25165, 92, 42 ],
							[ 92245, 87760, 82640, 31710, 111, 46 ],
							[ 116230, 110580, 104125, 39955, 133, 50 ],
							[ 146450, 139330, 131195, 50340, 160, 54 ],
							[ 184530, 175560, 165305, 63430, 192, 58 ],
							[ 232505, 221205, 208285, 79925, 230, 62 ] // 20
					],
					[// tradeOfficeCost gid = 28
					[ 0, 0, 0, 0, 0, 0 ], [ 1400, 1330, 1200, 400, 4, 3 ],
							[ 1790, 1700, 1535, 510, 4, 5 ],
							[ 2295, 2180, 1965, 655, 5, 7 ],
							[ 2935, 2790, 2515, 840, 6, 9 ],
							[ 3760, 3570, 3220, 1075, 7, 11 ],
							[ 4810, 4570, 4125, 1375, 9, 13 ],
							[ 6155, 5850, 5280, 1760, 11, 15 ],
							[ 7880, 7485, 6755, 2250, 13, 17 ],
							[ 10090, 9585, 8645, 2880, 15, 19 ],
							[ 12915, 12265, 11070, 3690, 19, 21 ],// 10
							[ 16530, 15700, 14165, 4720, 22, 24 ],
							[ 21155, 20100, 18135, 6045, 27, 27 ],
							[ 27080, 25725, 23210, 7735, 32, 30 ],
							[ 34660, 32930, 29710, 9905, 39, 33 ],
							[ 44370, 42150, 38030, 12675, 46, 36 ],
							[ 56790, 53950, 48680, 16225, 55, 39 ],
							[ 72690, 69060, 62310, 20770, 67, 42 ],
							[ 93045, 88395, 79755, 26585, 80, 45 ],
							[ 119100, 113145, 102085, 34030, 96, 48 ],
							[ 152445, 144825, 130670, 43555, 115, 51 ] // 20
					],
					[// greatBarrackCost gid = 29
					[ 0, 0, 0, 0, 0, 0 ], [ 630, 420, 780, 360, 1, 4 ],
							[ 805, 540, 1000, 460, 1, 6 ],
							[ 1030, 690, 1280, 590, 2, 8 ],
							[ 1320, 880, 1635, 755, 2, 10 ],
							[ 1690, 1125, 2095, 965, 2, 12 ],
							[ 2165, 1445, 2680, 1235, 3, 15 ],
							[ 2770, 1845, 3430, 1585, 4, 18 ],
							[ 3545, 2365, 4390, 2025, 4, 21 ],
							[ 4540, 3025, 5620, 2595, 5, 24 ],
							[ 5810, 3875, 7195, 3320, 6, 27 ],// 10
							[ 7440, 4960, 9210, 4250, 7, 30 ],
							[ 9520, 6345, 11785, 5440, 9, 33 ],
							[ 12185, 8125, 15085, 6965, 11, 36 ],
							[ 15600, 10400, 19310, 8915, 13, 39 ],
							[ 19965, 13310, 24720, 11410, 15, 42 ],
							[ 25555, 17035, 31640, 14605, 18, 46 ],
							[ 32710, 21810, 40500, 18690, 22, 50 ],
							[ 41870, 27915, 51840, 23925, 27, 54 ],
							[ 53595, 35730, 66355, 30625, 32, 58 ],
							[ 68600, 45735, 84935, 39200, 38, 62 ] // 20
					],
					[// greatStableCost gid = 30
					[ 0, 0, 0, 0, 0, 0 ], [ 780, 420, 660, 300, 2, 5 ],
							[ 1000, 540, 845, 385, 3, 8 ],
							[ 1280, 690, 1080, 490, 3, 11 ],
							[ 1635, 880, 1385, 630, 4, 14 ],
							[ 2095, 1125, 1770, 805, 5, 17 ],
							[ 2680, 1445, 2270, 1030, 6, 20 ],
							[ 3430, 1845, 2905, 1320, 7, 23 ],
							[ 4390, 2365, 3715, 1690, 9, 26 ],
							[ 5620, 3025, 4755, 2160, 10, 29 ],
							[ 7195, 3875, 6085, 2765, 12, 32 ],// 10
							[ 9210, 4960, 7790, 3540, 15, 36 ],
							[ 11785, 6345, 9975, 4535, 18, 40 ],
							[ 15085, 8125, 12765, 5805, 21, 44 ],
							[ 19310, 10400, 16340, 7430, 26, 48 ],
							[ 24720, 13310, 20915, 9505, 31, 52 ],
							[ 31640, 17035, 26775, 12170, 37, 56 ],
							[ 40500, 21810, 34270, 15575, 44, 60 ],
							[ 51840, 27915, 43865, 19940, 53, 64 ],
							[ 66355, 35730, 56145, 25520, 64, 68 ],
							[ 84935, 45735, 71870, 32665, 77, 72 ] // 20
					],
					[// citywallCost gid = 31
					[ 0, 0, 0, 0, 0, 0 ], [ 70, 90, 170, 70, 1, 0 ],
							[ 90, 115, 220, 90, 1, 0 ],
							[ 115, 145, 280, 115, 2, 0 ],
							[ 145, 190, 355, 145, 2, 0 ],
							[ 190, 240, 455, 190, 2, 0 ],
							[ 240, 310, 585, 240, 3, 1 ],
							[ 310, 395, 750, 310, 4, 2 ],
							[ 395, 505, 955, 395, 4, 3 ],
							[ 505, 650, 1225, 505, 5, 4 ],
							[ 645, 830, 1570, 645, 6, 5 ],// 10
							[ 825, 1065, 2005, 825, 7, 6 ],
							[ 1060, 1360, 2570, 1060, 9, 7 ],
							[ 1355, 1740, 3290, 1355, 11, 8 ],
							[ 1735, 2230, 4210, 1735, 13, 9 ],
							[ 2220, 2850, 5390, 2220, 15, 10 ],
							[ 2840, 3650, 6895, 2840, 18, 12 ],
							[ 3635, 4675, 8825, 3635, 22, 14 ],
							[ 4650, 5980, 11300, 4650, 27, 16 ],
							[ 5955, 7655, 14460, 5955, 32, 18 ],
							[ 7620, 9800, 18510, 7620, 38, 20 ] // 20
					],
					[// earthwallCost gid = 32
					[ 0, 0, 0, 0, 0, 0 ], [ 120, 200, 0, 80, 1, 0 ],
							[ 155, 255, 0, 100, 1, 0 ],
							[ 195, 330, 0, 130, 2, 0 ],
							[ 250, 420, 0, 170, 2, 0 ],
							[ 320, 535, 0, 215, 2, 0 ],
							[ 410, 685, 0, 275, 3, 1 ],
							[ 530, 880, 0, 350, 4, 2 ],
							[ 675, 1125, 0, 450, 4, 3 ],
							[ 865, 1440, 0, 575, 5, 4 ],
							[ 1105, 1845, 0, 740, 6, 5 ],// 10
							[ 1415, 2360, 0, 945, 7, 6 ],
							[ 1815, 3020, 0, 1210, 9, 7 ],
							[ 2320, 3870, 0, 1545, 11, 8 ],
							[ 2970, 4950, 0, 1980, 13, 9 ],
							[ 3805, 6340, 0, 2535, 15, 10 ],
							[ 4870, 8115, 0, 3245, 18, 12 ],
							[ 6230, 10385, 0, 4155, 22, 14 ],
							[ 7975, 13290, 0, 5315, 27, 16 ],
							[ 10210, 17015, 0, 6805, 32, 18 ],
							[ 13065, 21780, 0, 8710, 38, 20 ] // 20
					],
					[// palisadeCost gid = 33
					[ 0, 0, 0, 0, 0, 0 ], [ 160, 100, 80, 60, 1, 0 ],
							[ 205, 130, 100, 75, 1, 0 ],
							[ 260, 165, 130, 100, 2, 0 ],
							[ 335, 210, 170, 125, 2, 0 ],
							[ 430, 270, 215, 160, 2, 0 ],
							[ 550, 345, 275, 205, 3, 1 ],
							[ 705, 440, 350, 265, 4, 2 ],
							[ 900, 565, 450, 340, 4, 3 ],
							[ 1155, 720, 575, 430, 5, 4 ],
							[ 1475, 920, 740, 555, 6, 5 ],// 10
							[ 1890, 1180, 945, 710, 7, 6 ],
							[ 2420, 1510, 1210, 905, 9, 7 ],
							[ 3095, 1935, 1545, 1160, 11, 8 ],
							[ 3960, 2475, 1980, 1485, 13, 9 ],
							[ 5070, 3170, 2535, 1900, 15, 10 ],
							[ 6490, 4055, 3245, 2435, 18, 12 ],
							[ 8310, 5190, 4155, 3115, 22, 14 ],
							[ 10635, 6645, 5315, 3990, 27, 16 ],
							[ 13610, 8505, 6805, 5105, 32, 18 ],
							[ 17420, 10890, 8710, 6535, 38, 20 ] // 20
					],
					[// stonemasonCost gid = 34
					[ 0, 0, 0, 0, 0, 0 ], [ 155, 130, 125, 70, 1, 2 ],
							[ 200, 165, 160, 90, 1, 3 ],
							[ 255, 215, 205, 115, 2, 4 ],
							[ 325, 275, 260, 145, 2, 5 ],
							[ 415, 350, 335, 190, 2, 6 ],
							[ 535, 445, 430, 240, 3, 8 ],
							[ 680, 570, 550, 310, 4, 10 ],
							[ 875, 730, 705, 395, 4, 12 ],
							[ 1115, 935, 900, 505, 5, 14 ],
							[ 1430, 1200, 1155, 645, 6, 16 ],// 10
							[ 1830, 1535, 1475, 825, 7, 18 ],
							[ 2340, 1965, 1890, 1060, 9, 20 ],
							[ 3000, 2515, 2420, 1355, 11, 22 ],
							[ 3840, 3220, 3095, 1735, 13, 24 ],
							[ 4910, 4120, 3960, 2220, 15, 26 ],
							[ 6290, 5275, 5070, 2840, 18, 29 ],
							[ 8050, 6750, 6490, 3635, 22, 32 ],
							[ 10300, 8640, 8310, 4650, 27, 35 ],
							[ 13185, 11060, 10635, 5955, 32, 38 ],
							[ 16880, 14155, 13610, 7620, 38, 41 ] // 20
					],
					[// breweryCost gid = 35
					[ 0, 0, 0, 0, 0, 0 ], [ 1460, 930, 1250, 1740, 5, 6 ],
							[ 2045, 1300, 1750, 2435, 6, 9 ],
							[ 2860, 1825, 2450, 3410, 7, 12 ],
							[ 4005, 2550, 3430, 4775, 8, 15 ],
							[ 5610, 3575, 4800, 6685, 10, 18 ],
							[ 7850, 5000, 6725, 9360, 12, 22 ],
							[ 10995, 7000, 9410, 13100, 14, 26 ],
							[ 15390, 9805, 13175, 18340, 17, 30 ],
							[ 21545, 13725, 18445, 25680, 21, 34 ],
							[ 30165, 19215, 25825, 35950, 25, 38 ] // 10
					],
					[// trapperCost gid = 36
					[ 0, 0, 0, 0, 0, 0 ], [ 100, 100, 100, 100, 1, 4 ],
							[ 130, 130, 130, 130, 1, 6 ],
							[ 165, 165, 165, 165, 2, 8 ],
							[ 210, 210, 210, 210, 2, 10 ],
							[ 270, 270, 270, 270, 2, 12 ],
							[ 345, 345, 345, 345, 3, 15 ],
							[ 440, 440, 440, 440, 4, 18 ],
							[ 565, 565, 565, 565, 4, 21 ],
							[ 720, 720, 720, 720, 5, 24 ],
							[ 920, 920, 920, 920, 6, 27 ],// 10
							[ 1180, 1180, 1180, 1180, 7, 30 ],
							[ 1510, 1510, 1510, 1510, 9, 33 ],
							[ 1935, 1935, 1935, 1935, 11, 36 ],
							[ 2475, 2475, 2475, 2475, 13, 39 ],
							[ 3170, 3170, 3170, 3170, 15, 42 ],
							[ 4055, 4055, 4055, 4055, 18, 46 ],
							[ 5190, 5190, 5190, 5190, 22, 50 ],
							[ 6645, 6645, 6645, 6645, 27, 54 ],
							[ 8505, 8505, 8505, 8505, 32, 58 ],
							[ 10890, 10890, 10890, 10890, 38, 62 ] // 20
					],
					[// herosMansionCost gid = 37
					[ 0, 0, 0, 0, 0, 0 ], [ 700, 670, 700, 240, 1, 2 ],
							[ 930, 890, 930, 320, 1, 3 ],
							[ 1240, 1185, 1240, 425, 2, 4 ],
							[ 1645, 1575, 1645, 565, 2, 5 ],
							[ 2190, 2095, 2190, 750, 2, 6 ],
							[ 2915, 2790, 2915, 1000, 3, 8 ],
							[ 3875, 3710, 3875, 1330, 4, 10 ],
							[ 5155, 4930, 5155, 1765, 4, 12 ],
							[ 6855, 6560, 6855, 2350, 5, 14 ],
							[ 9115, 8725, 9115, 3125, 6, 16 ],// 10
							[ 12125, 11605, 12125, 4155, 7, 18 ],
							[ 16125, 15435, 16125, 5530, 9, 20 ],
							[ 21445, 20525, 21445, 7350, 11, 22 ],
							[ 28520, 27300, 28520, 9780, 13, 24 ],
							[ 37935, 36310, 37935, 13005, 15, 24 ],
							[ 50450, 48290, 50450, 17300, 18, 27 ],
							[ 67100, 64225, 67100, 23005, 22, 30 ],
							[ 89245, 85420, 89245, 30600, 27, 33 ],
							[ 118695, 113605, 118695, 40695, 32, 36 ],
							[ 157865, 151095, 157865, 54125, 37, 39 ] // 20
					],
					[// greatWarehouseCost gid = 38
					[ 0, 0, 0, 0, 0, 0, 0 ], [ 650, 800, 450, 200, 1, 1 ],
							[ 830, 1025, 575, 255, 1, 2 ],
							[ 1065, 1310, 735, 330, 2, 3 ],
							[ 1365, 1680, 945, 420, 2, 4 ],
							[ 1745, 2145, 1210, 535, 2, 5 ],
							[ 2235, 2750, 1545, 685, 3, 6 ],
							[ 2860, 3520, 1980, 880, 4, 7 ],
							[ 3660, 4505, 2535, 1125, 4, 8 ],
							[ 4685, 5765, 3245, 1440, 5, 9 ],
							[ 5995, 7380, 4150, 1845, 6, 10 ],// 10
							[ 7675, 9445, 5315, 2360, 7, 12 ],
							[ 9825, 12090, 6800, 3020, 9, 14 ],
							[ 12575, 15475, 8705, 3870, 11, 16 ],
							[ 16095, 19805, 11140, 4950, 13, 18 ],
							[ 20600, 25355, 14260, 6340, 15, 20 ],
							[ 26365, 32450, 18255, 8115, 18, 22 ],
							[ 33750, 41540, 23365, 10385, 22, 24 ],
							[ 43200, 53170, 29910, 13290, 27, 26 ],
							[ 55295, 68055, 38280, 17015, 32, 28 ],
							[ 70780, 87110, 49000, 21780, 38, 30 ] // 20
					],
					[// greatGranaryCost gid = 39
					[ 0, 0, 0, 0, 0, 0 ], [ 400, 500, 350, 100, 1 ],
							[ 510, 640, 450, 130, 1, 2 ],
							[ 655, 820, 575, 165, 2, 3 ],
							[ 840, 1050, 735, 210, 2, 4 ],
							[ 1075, 1340, 940, 270, 2, 5 ],
							[ 1375, 1720, 1205, 345, 3, 6 ],
							[ 1760, 2200, 1540, 440, 4, 7 ],
							[ 2250, 2815, 1970, 565, 4, 8 ],
							[ 2880, 3605, 2520, 720, 5, 9 ],
							[ 3690, 4610, 3230, 920, 6, 10 ],// 10
							[ 4720, 5905, 4130, 1180, 7, 12 ],
							[ 6045, 7555, 5290, 1510, 9, 14 ],
							[ 7735, 9670, 6770, 1935, 11, 16 ],
							[ 9905, 12380, 8665, 2475, 13, 18 ],
							[ 12675, 15845, 11090, 3170, 15, 20 ],
							[ 16225, 20280, 14200, 4055, 18, 22 ],
							[ 20770, 25960, 18175, 5190, 22, 24 ],
							[ 26585, 33230, 23260, 6645, 27, 26 ],
							[ 34030, 42535, 29775, 8505, 32, 28 ],
							[ 43555, 54445, 38110, 10890, 38, 30 ] // 20
					],
					[// WWCost gid = 40
					[ 0, 0, 0, 0, 0, 0 ], [ 66700, 69050, 72200, 13200, 0, 1 ],
							[ 68535, 70950, 74185, 13565, 0, 2 ],
							[ 70420, 72900, 76225, 13935, 0, 3 ],
							[ 72355, 74905, 78320, 14320, 0, 4 ],
							[ 74345, 76965, 80475, 14715, 0, 5 ],
							[ 76390, 79080, 82690, 15120, 0, 6 ],
							[ 78490, 81255, 84965, 15535, 0, 7 ],
							[ 80650, 83490, 87300, 15960, 0, 8 ],
							[ 82865, 85785, 89700, 16400, 0, 9 ],
							[ 85145, 88145, 92165, 16850, 0, 10 ],// 10
							[ 87485, 90570, 94700, 17315, 0, 12 ],
							[ 89895, 93060, 97305, 17790, 0, 14 ],
							[ 92365, 95620, 99980, 18280, 0, 16 ],
							[ 94905, 98250, 102730, 18780, 0, 18 ],
							[ 97515, 100950, 105555, 19300, 0, 20 ],
							[ 100195, 103725, 108460, 19830, 0, 22 ],
							[ 102950, 106580, 111440, 20375, 0, 24 ],
							[ 105785, 109510, 114505, 20935, 0, 26 ],
							[ 108690, 112520, 117655, 21510, 0, 28 ],
							[ 111680, 115615, 120890, 22100, 0, 30 ],// 20
							[ 114755, 118795, 124215, 22710, 0, 33 ],
							[ 117910, 122060, 127630, 23335, 0, 36 ],
							[ 121150, 125420, 131140, 23975, 0, 39 ],
							[ 124480, 128870, 134745, 24635, 0, 42 ],
							[ 127905, 132410, 138455, 25315, 0, 45 ],
							[ 131425, 136055, 142260, 26010, 0, 48 ],
							[ 135035, 139795, 146170, 26725, 0, 51 ],
							[ 138750, 143640, 150190, 27460, 0, 54 ],
							[ 142565, 147590, 154320, 28215, 0, 57 ],
							[ 146485, 151650, 158565, 28990, 0, 60 ],// 30
							[ 150515, 155820, 162925, 29785, 0, 64 ],
							[ 154655, 160105, 167405, 30605, 0, 68 ],
							[ 158910, 164505, 172010, 31450, 0, 72 ],
							[ 163275, 169030, 176740, 32315, 0, 76 ],
							[ 167770, 173680, 181600, 33200, 0, 80 ],
							[ 172380, 178455, 186595, 34115, 0, 84 ],
							[ 177120, 183360, 191725, 35055, 0, 88 ],
							[ 181995, 188405, 197000, 36015, 0, 92 ],
							[ 186995, 193585, 202415, 37005, 0, 96 ],
							[ 192140, 198910, 207985, 38025, 0, 100 ],// 40
							[ 197425, 204380, 213705, 39070, 0, 105 ],
							[ 202855, 210000, 219580, 40145, 0, 110 ],
							[ 208430, 215775, 225620, 41250, 0, 115 ],
							[ 214165, 221710, 231825, 42385, 0, 120 ],
							[ 220055, 227805, 238200, 43550, 0, 125 ],
							[ 226105, 234070, 244750, 44745, 0, 130 ],
							[ 232320, 240505, 251480, 45975, 0, 135 ],
							[ 238710, 247120, 258395, 47240, 0, 140 ],
							[ 245275, 253915, 265500, 48540, 0, 145 ],
							[ 252020, 260900, 272800, 49875, 0, 150 ],// 50
							[ 258950, 268075, 280305, 51245, 0, 156 ],
							[ 266070, 275445, 288010, 52655, 0, 162 ],
							[ 273390, 283020, 295930, 54105, 0, 168 ],
							[ 280905, 290805, 304070, 55590, 0, 174 ],
							[ 288630, 298800, 312430, 57120, 0, 180 ],
							[ 296570, 307020, 321025, 58690, 0, 186 ],
							[ 304725, 315460, 329850, 60305, 0, 192 ],
							[ 313105, 324135, 338925, 61965, 0, 198 ],
							[ 321715, 333050, 348245, 63670, 0, 204 ],
							[ 330565, 342210, 357820, 65420, 0, 210 ],// 60
							[ 339655, 351620, 367660, 67220, 0, 217 ],
							[ 348995, 361290, 377770, 69065, 0, 224 ],
							[ 358590, 371225, 388160, 70965, 0, 231 ],
							[ 368450, 381435, 398835, 72915, 0, 238 ],
							[ 378585, 391925, 409800, 74920, 0, 245 ],
							[ 388995, 402700, 421070, 76985, 0, 252 ],
							[ 399695, 413775, 432650, 79100, 0, 259 ],
							[ 410685, 425155, 444550, 81275, 0, 266 ],
							[ 421980, 436845, 456775, 83510, 0, 273 ],
							[ 433585, 448860, 469335, 85805, 0, 280 ],// 70
							[ 445505, 461205, 482240, 88165, 0, 288 ],
							[ 457760, 473885, 495505, 90590, 0, 296 ],
							[ 470345, 486920, 509130, 93080, 0, 304 ],
							[ 483280, 500310, 523130, 95640, 0, 312 ],
							[ 496570, 514065, 537520, 98270, 0, 320 ],
							[ 510225, 528205, 552300, 100975, 0, 328 ],
							[ 524260, 542730, 567490, 103750, 0, 336 ],
							[ 538675, 557655, 583095, 106605, 0, 344 ],
							[ 553490, 572990, 599130, 109535, 0, 352 ],
							[ 568710, 588745, 615605, 112550, 0, 360 ],// 80
							[ 584350, 604935, 632535, 115645, 0, 369 ],
							[ 600420, 621575, 649930, 118825, 0, 378 ],
							[ 616930, 638665, 667800, 122090, 0, 387 ],
							[ 633895, 656230, 686165, 125450, 0, 396 ],
							[ 651330, 674275, 705035, 128900, 0, 405 ],
							[ 669240, 692820, 724425, 132445, 0, 414 ],
							[ 687645, 711870, 744345, 136085, 0, 423 ],
							[ 706555, 731445, 764815, 139830, 0, 432 ],
							[ 725985, 751560, 785850, 143675, 0, 441 ],
							[ 745950, 772230, 807460, 147625, 0, 450 ],// 90
							[ 766460, 793465, 829665, 151685, 0, 460 ],
							[ 787540, 815285, 852480, 155855, 0, 470 ],
							[ 809195, 837705, 875920, 160140, 0, 480 ],
							[ 831450, 860745, 900010, 164545, 0, 490 ],
							[ 854315, 884415, 924760, 169070, 0, 500 ],
							[ 877810, 908735, 950190, 173720, 0, 510 ],
							[ 901950, 933725, 976320, 178495, 0, 520 ],
							[ 926750, 959405, 1000000, 183405, 0, 530 ],
							[ 952235, 985785, 1000000, 188450, 0, 540 ],
							[ 1000000, 1000000, 1000000, 193630, 0, 550 ] // 100
					],
					[// horsedtCost gid = 41
					[ 0, 0, 0, 0, 0, 0 ], [ 780, 420, 660, 540, 4, 5 ],
							[ 1000, 540, 845, 690, 4, 8 ],
							[ 1280, 690, 1080, 885, 5, 11 ],
							[ 1635, 880, 1385, 1130, 6, 14 ],
							[ 2095, 1125, 1770, 1450, 7, 17 ],
							[ 2680, 1445, 2270, 1855, 9, 20 ],
							[ 3430, 1845, 2905, 2375, 11, 23 ],
							[ 4390, 2365, 3715, 3040, 13, 26 ],
							[ 5620, 3025, 4755, 3890, 15, 29 ],
							[ 7195, 3875, 6085, 4980, 19, 31 ],// 10
							[ 9210, 4960, 7790, 6375, 22, 35 ],
							[ 11785, 6345, 9975, 8160, 27, 39 ],
							[ 15085, 8125, 12765, 10445, 32, 43 ],
							[ 19310, 10400, 16340, 13370, 39, 47 ],
							[ 24720, 13310, 20915, 17115, 46, 51 ],
							[ 31640, 17035, 26775, 21905, 55, 55 ],
							[ 40500, 21810, 34270, 28040, 67, 59 ],
							[ 51840, 27915, 43865, 35890, 80, 63 ],
							[ 66355, 35730, 56145, 45940, 96, 67 ],
							[ 84935, 45735, 71870, 58800, 115, 71 ] // 20
					] ];

			fieldsOfVillage = {
				'f1' : [ 3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 9
				// crop
				'f2' : [ 2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 3-4-5-6
				'f3' : [ 0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 4-4-4-6
				'f4' : [ 0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 4-5-3-6
				'f5' : [ 0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 5-3-4-6
				'f6' : [ 3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3 ], // 15
				// crop
				'f7' : [ 0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 4-4-3-7
				'f8' : [ 2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 3-4-4-7
				'f9' : [ 2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 4-3-4-7
				'f10' : [ 2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ], // 3-5-4-6
				'f11' : [ 2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3 ], // 4-3-5-6
				'f12' : [ 0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1 ]
			// 5-4-3-6
			};
			// 'f99': 'Natarian village',

			// â€ºâ€º Main.
			function TM_ShowMainBuildingNumbers() {

				var gid;
				var countArray, checkWW = false;
				var mapOffset = 1;
				// â€ºâ€º Map1 holds building names, level and building spot IDs
				// in area
				// elements (2 are duplicate walls to be ignored).

				// active buildings
				var bldText = $xf('//script[contains(text(),"bld=")]');
				var bldArr = new Array(41);
				if (bldText) {
					eval(bldText.innerHTML);
					for ( var i = 0; i < bld.length; i++)
						bldArr[bld[i]['aid']] = bld[i]['stufe'];
				}

				var mapInfo = ver4FL ? $g('clickareas') : $g('map2');
				if (mapInfo) {
					countArray = 22;
					dorf = 2;
					mapOffset = 19;
					var levels = $gt('DIV', $g('levels'));
					var lRef = 0;
				} else {
					mapInfo = $g('rx');
					if (mapInfo) {
						countArray = 18;
						dorf = 1;
						if (ver4FL)
							var levels = $gt('DIV', $g('village_map'));
						else {
							var dtop = 68;
							var dleft = ltr ? 3 : 225;
						}
					}
				}

				if (!(mapInfo))
					return;

				var areaElements = $gt('area', mapInfo);
				var imageElements = $gt('img', $g('village_map'));
				var BuildingLevel, smallDIV, coords;

				if (dorf == 2) {
					if (countArray > imageElements.length - 1) {
						checkWW = true;
						countArray = areaElements.length;
					}
					if (ver4FL) {
						// tables for T4 from Qusai Abu Hilal Ù‚ØµÙŠ Ø£Ø¨Ùˆ
						// Ù‡Ù„Ø§Ù„
						bCost[13] = [// smithy (T4) gid = 13
						[ 0, 0, 0, 0, 0, 0 ], [ 180, 250, 500, 160, 2, 4 ], // to
						// lvl
						// 1:
						// 180
						// 250
						// 500
						// 160
						// 4 OK
						[ 230, 320, 640, 205, 3, 6 ], // to lvl 2: 230 320 640
						// 205 2 OK
						[ 295, 410, 820, 260, 3, 8 ], // to lvl 3: 295 410 820
						// 260 2 OK
						[ 375, 525, 1050, 335, 4, 10 ],// to lvl 4: 375 525
						// 1050 335 2 OK
						[ 485, 670, 1340, 430, 5, 12 ],// to lvl 5: 485 670
						// 1340 430 2 OK
						[ 620, 860, 1720, 550, 6, 15 ],// to lvl 6: 620 860
						// 1720 550 3 OK
						[ 790, 1100, 2200, 705, 7, 18 ], // to lvl 07: // 790
						// 1100 2200 705 3
						[ 1015, 1405, 2815, 900, 9, 21 ], // to lvl 08: //
						// 1015 1405 2815
						// 900
						// 3
						[ 1295, 1800, 3605, 1155, 10, 24 ],// to lvl 09: 1295
						// 1800 3605 1155 3
						// OK
						[ 1660, 2305, 4610, 1475, 12, 27 ],// to lvl 10: //
						// 1660 2305 4610
						// 1475
						// 3 OK
						[ 2125, 2950, 5905, 1890, 15, 30 ],// to lvl 11: //
						// 2125 2950 5905
						// 1890
						// 3 OK
						[ 2720, 3780, 7555, 2420, 18, 33 ],// to lvl 12: //
						// 2720 3780 7555
						// 2420
						// 3
						[ 3480, 4835, 9670, 3095, 21, 36 ],// to lvl 13: //
						// 3480 4835 9670
						// 3095
						// 3 OK
						[ 4455, 6190, 12380, 3960, 26, 39 ], // to lvl 14: //
						// 4455 6190
						// 12380
						// 3960 3 OK
						[ 5705, 7925, 15845, 5070, 31, 42 ], // to lvl 15: //
						// 5705 7925
						// 15845
						// 5070 3 OK
						[ 7300, 10140, 20280, 6490, 37, 46 ],// to lvl 16: //
						// 7300 10140
						// 20280 6490 4 OK
						[ 9345, 12980, 25960, 8310, 44, 50 ],// to lvl 17: //
						// 9345 12980
						// 25960 8310 4 OK
						[ 11965, 16615, 33230, 10635, 53, 54 ],// to lvl 18: //
						// 11965 16615
						// 33230 10635 4 OK
						[ 15315, 21270, 42535, 13610, 64, 58 ], // to lvl 19: //
						// 15315 21270
						// 42535 13610 OK
						[ 19600, 27225, 54445, 17420, 77, 62 ] // to lvl 20: //
						// 19600 27225
						// 54445 17420 4
						];
						bCost[36] = [// trapperCost gid = 36
						[ 0, 0, 0, 0, 0, 0 ], [ 80, 120, 70, 90, 1, 4 ], // To
						// lvl
						// 1:
						// OK
						[ 100, 155, 90, 115, 1, 6 ], // To lvl 2: OK
						[ 130, 195, 115, 145, 2, 8 ], // To lvl 3: OK
						[ 170, 250, 145, 190, 2, 10 ],// To lvl 4: OK
						[ 215, 320, 190, 240, 2, 12 ],// To lvl 5: OK
						[ 275, 410, 240, 310, 3, 15 ],// To lvl 6: OK
						[ 350, 530, 310, 395, 4, 18 ],// To lvl 7: OK
						[ 450, 675, 395, 505, 4, 21 ],// To lvl 8: OK
						[ 575, 865, 505, 650, 5, 24 ],// To lvl 9: OK
						[ 740, 1105, 645, 830, 6, 27 ], // To lvl 10: OK
						[ 945, 1415, 825, 1065, 7, 30 ], // To lvl 11: OK
						[ 1210, 1815, 1060, 1360, 9, 33 ], // To lvl 12: OK
						[ 1545, 2320, 1355, 1740, 11, 36 ],// To lvl 13: OK
						[ 1980, 2970, 1735, 2230, 13, 39 ],// To lvl 14: OK
						[ 2535, 3805, 2220, 2850, 15, 42 ],// To lvl 15: OK
						[ 3245, 4870, 2840, 3650, 18, 46 ],// To lvl 16: OK
						[ 4155, 6230, 3635, 4675, 22, 50 ],// To lvl 17: OK
						[ 5315, 7975, 4650, 5980, 27, 54 ],// To lvl 18: OK
						[ 6805, 10210, 5955, 7655, 32, 58 ],// To lvl 19: OK
						[ 8710, 13065, 7620, 9800, 38, 62 ] // To lvl 20: OK
						];
					}
				}

				for ( var i = 0; i < countArray; i++) {
					BuildingLevel = /\d+/.exec(areaElements[i].alt);
					if (!BuildingLevel)
						BuildingLevel = /\d+/.exec(areaElements[i].title);
					if (!BuildingLevel)
						continue;

					if (dorf == 2) {
						gid = parseInt(/(\d+)\S*$/.exec(imageElements[i]
								.getAttribute('class'))[1]);
						if (checkWW) {
							if (ver4FL && i == 6)
								gid = 40;
							if (!ver4FL && i == 8)
								gid = 40;
						}
						smallDIV = levels[lRef++];
						if (!ver4FL
								&& /map/i.test(imageElements[i]
										.getAttribute('class')))
							gid = 31 + parseInt(RB.Setup[2]);
					}
					if (dorf == 1) {
						var typeOfVillage = $g('village_map').getAttribute(
								'class');
						gid = fieldsOfVillage[typeOfVillage][i] + 1;
						smallDIV = ver4FL ? levels[i] : $g('rx').appendChild(
								$ee('div', BuildingLevel[0], [ [ 'class',
										allIDs[42] ] ]));
					}

					if (!ver4FL && dorf == 1) {
						coords = areaElements[i].coords.split(',');
						smallDIV.style.top = parseInt(coords[1]) + dtop + 'px';
						smallDIV.style.left = parseInt(coords[0]) + dleft
								+ 'px';
						smallDIV.style.visibility = "visible";
					} else
						smallDIV.className += ' ' + allIDs[42];
					if (bldArr[i + mapOffset]) {
						if (khtmlFL) {
							var y = 0;
							setInterval(function(x) {
								return function() {
									if (y > 0) {
										x.style.color = 'white';
										y = 0;
									} else {
										x.style.color = 'black';
										y = 1;
									}
								}
							}(smallDIV), 1000);
						} else
							smallDIV.style.textDecoration = 'blink';
						BuildingLevel[0] = bldArr[i + mapOffset];
					}

					try {
						var resneed = bCost[gid][parseInt(BuildingLevel[0]) + 1];
					} catch (err) {
						// alert( gid +' /// '+ BuildingLevel +' /// '+
						// getMaxLevel(gid));
						continue;
					}

					if (parseInt(BuildingLevel[0]) == getMaxLevel(gid)) {
						smallDIV.style.backgroundColor = getColor(4);// green
					} else if (resneed[0] > fullRes[0]
							|| resneed[1] > fullRes[0]
							|| resneed[2] > fullRes[0]
							|| resneed[3] > fullRes[3]) {
						smallDIV.style.backgroundColor = getColor(3);// magenta
					} else if ((resNow[0] + resNow[1] + resNow[2] + resNow[3]) >= (resneed[0]
							+ resneed[1] + resneed[2] + resneed[3])) {
						if (resNow[0] >= resneed[0] && resNow[1] >= resneed[1]
								&& resNow[2] >= resneed[2]
								&& resNow[3] >= resneed[3]) {
							smallDIV.style.backgroundColor = getColor(0);// white
						} else {
							smallDIV.style.backgroundColor = getColor(1);// orange
							// #FFC85B
						}
					} else if (parseInt(resneed[0]) > resNow[0]
							|| parseInt(resneed[1]) > resNow[1]
							|| parseInt(resneed[2]) > resNow[2]
							|| parseInt(resneed[3]) > resNow[3]) {
						smallDIV.style.backgroundColor = getColor(2);// red
					}
				}
			}

			function getColor(x) {
				return RB.Setup[40 + x].length > 1 ? RB.Setup[40 + x]
						: cnColors[x];
			}

			function getMaxLevel(gid) {
				var maxLevel;
				switch (gid) {
				case 1:
				case 2:
				case 3:
				case 4:
					if (village_aid == RB.dictionary[0])
						maxLevel = RB.dictFL[17] == 1 ? 12 : 25;
					else
						maxLevel = 10;
					break;
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
					maxLevel = 5;
					break;
				case 23:
				case 35:
					maxLevel = 10;
					break;
				case 40:
					maxLevel = 100;
					break;
				default:
					maxLevel = 20;
				}
				return (maxLevel)
			}

			function cultureCalc() {
				var blevel = $gc('level', $gt('h1', cont)[0]);
				if (blevel.length == 0)
					return;
				var contr = $g('contract');
				if (!contr)
					return;
				if ($gt('INPUT', contr).length > 0)
					return;
				blevel = parseInt(blevel[0].innerHTML.match(/\d+/)[0]);
				var bid = parseInt($g('build').getAttribute('class').match(
						/\d+/)[0]);
				var clocks = ver4FL ? $gc('clocks', contr)
						: $gc('clock', contr);
				if (clocks.length > 0) {
					var cB = $em('SPAN', [
							' ',
							$e('IMG', [ [ 'src', img_cp ],
									[ 'title', RB.dictionary[19] ] ]),
							' ' + bCost[bid][blevel][4] + ' -> '
									+ bCost[bid][blevel + 1][4] + ' ',
							$e('IMG', [ [ 'src', 'img/x.gif' ],
									[ 'class', 'r5' ],
									[ 'title', RB.dictionary[20] ] ]),
							' ' + bCost[bid][blevel][5] + ' -> '
									+ bCost[bid][blevel + 1][5] ]);
					if (ver4FL) {
						var cl = $gc('clear', contr);
						$ib(cB, cl[cl.length - 1]);
					} else
						contr.appendChild(cB);
				} else {
					var cB = $em('SPAN', [
							' ',
							$e('IMG', [ [ 'src', img_cp ],
									[ 'title', RB.dictionary[19] ] ]),
							' ' + bCost[bid][blevel][4] + ' ',
							$e('IMG', [ [ 'src', 'img/x.gif' ],
									[ 'class', 'r5' ],
									[ 'title', RB.dictionary[20] ] ]),
							' ' + bCost[bid][blevel][5] ]);
					contr.appendChild(cB);
				}
			}

			TM_ShowMainBuildingNumbers();
			if (/build/.test(window.location.href))
				cultureCalc();
		}
		/**
		 * **************************** end Center Number
		 * ***************************
		 */

		function allyQStats() {
			var members = $g('member');
			if (!members)
				return;
			var t4 = true;
			if (members.rows[0].cells.length > 3)
				t4 = false;
			if (t4)
				members.rows[0].cells[0].setAttribute("colspan", "2");
			var sumC = 0, sumV = 0;
			for ( var i = 1; i < members.rows.length; i++) {
				if (t4)
					$ib($c(i), members.rows[i].cells[0]);
				sumC += parseInt(members.rows[i].cells[2].innerHTML);
				sumV += parseInt(members.rows[i].cells[3].innerHTML);
			}
			i--;
			var blue = $xf('.//img[contains(@class,"online1")]', 'l', cont);
			var semafor = $c('&nbsp;');
			if (blue.snapshotLength > 0) {
				semafor.appendChild($em('SPAN', [
						blue.snapshotItem(0).cloneNode(true), ' = ',
						blue.snapshotLength ]));
				for ( var t = 2; t < 6; t++) {
					var blue = $xf(
							'.//img[contains(@class,"online' + t + '")]', 'l',
							cont);
					if (blue.snapshotLength > 0)
						semafor.appendChild($em('SPAN', [ ' ; ',
								blue.snapshotItem(0).cloneNode(true), ' = ',
								blue.snapshotLength ]));
				}
			}
			var newT = $em('TR', [
					$c(semafor, [ [ 'colspan', 2 ] ]),
					$c(sumC + ' / ' + i + ' = ' + Math.round(sumC / i), [ [
							'style', 'text-align:' + docDir[1] + ';' ] ]),
					$c(sumV + ' / ' + i + ' = ' + Math.round(sumV / i), [ [
							'style', 'text-align:' + docDir[1] + ';' ] ]) ]);
			if (members.rows[1].cells.length > 4)
				newT.appendChild($c('&nbsp;', [ [ 'colspan',
						members.rows[1].cells.length - 4 ] ]));
			members.appendChild($ee('TBODY', newT));
		}

		function calcTroopCost() {
			function resRecalc() {
				allWR = [ 0, 0, 0, 0, 0, 0 ];
				var nc = 0;
				for ( var i = 0; i < wRes.length; i++) {
					nc = parseInt(wRes[i][0].value).NaN0();
					for ( var t = 0; t < 6; t++)
						allWR[t] += wRes[i][t + 2] * nc;
				}
				var wantD = '>' + allWR[1] + ' >' + allWR[2] + ' >' + allWR[3]
						+ ' >' + allWR[4];

				var newBTX = $ee('BUTTON', "close" + ' (X)', [
						[ 'onClick', jsNone ], [ 'class', allIDs[15] ],
						[ 'style', 'direction:ltr' ] ]);
				newBTX.addEventListener('click', closeTip, true);

				var nts = tshift > 0 ? tshift
						+ (RunTime[0] - (new Date().getTime())) / 1e3 : 0;
				var newR = $em('TR', [
						$em('TD', [ trImg('clock'), ' ',
								$eT('SPAN', allWR[0] + nts, 0), ' ',
								trImg('r5'), ' ', allWR[5] ]), $c(newBTX) ]);
				var newTbl = $ee('TABLE', newR, [ [ 'class', allIDs[7] ],
						[ 'style', 'background-color:#FAFAFF;' ] ]);
				var newT = needed_show(wantD);
				newR = $ee('TR', $c(newT, [ [ 'colspan', 2 ] ]));
				newTbl.appendChild(newR);
				closeWindowN(9);
				var xy = offsetPosition(this);
				windowID[9] = makeFloat(newTbl, xy[0] - (ltr ? 100 : 300),
						xy[1] - 60);
			}
			function closeTip() {
				closeWindowN(9);
			}

			var inp = $gt('INPUT', cont);
			var t = 0;
			var wRes = [];
			for ( var i = 0; i < inp.length; i++) {
				var tinp = inp[i];
				var tname = tinp.getAttribute('name');
				var tarm = tname.match(/t(\d+)/);
				if (tarm)
					tarm = tarm[1];
				else
					continue;
				var base = ver4FL ? $gc('showCosts', tinp.parentNode)[0].innerHTML
						: $gc('details', tinp.parentNode.parentNode)[0].innerHTML;
				var nRes = base
						.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
				var nTime = toSeconds(base);
				wRes[t++] = [ tinp, tname, nTime, parseInt(nRes[1]),
						parseInt(nRes[2]), parseInt(nRes[3]),
						parseInt(nRes[4]), parseInt(nRes[5]) ];
				tinp.addEventListener('keyup', resRecalc, false);
				tinp.addEventListener('click', resRecalc, false);
			}
			var tshift = 0;
			var upt = $xf('.//table[@class="under_progress"]', 'l', cont);
			if (upt.snapshotLength > 0) {
				upt = upt.snapshotItem(0);
				var ts = $xf('.//td[@class="dur"]/span', 'l', upt);
				tshift = toSeconds(ts.snapshotItem(ts.snapshotLength - 1).innerHTML);
				var allUC = new Object();
				var mFL = false;
				var ts = $xf('.//td[@class="desc"]/img', 'l', upt);
				for ( var i = 0; i < ts.snapshotLength; i++) {
					var uclass = ts.snapshotItem(i).getAttribute('class');
					if (typeof (allUC[uclass]) == 'undefined')
						allUC[uclass] = [ '', 0, 0 ];
					allUC[uclass][0] = ts.snapshotItem(i).getAttribute('alt');
					allUC[uclass][1] += parseInt(ts.snapshotItem(i).parentNode.innerHTML
							.onlyText().match(/\d+/)[0]);
					if (allUC[uclass][2] > 0)
						mFL = true;
					else
						allUC[uclass][2]++;
				}
				if (mFL) {
					var ts = $xf('.//tbody', 'f', upt);
					for ( var i in allUC)
						ts.appendChild($ee('TR', $em('TD', [
								trImg(allIDs[45] + ' ' + i, allUC[i][0]),
								' ' + allUC[i][1] + ' ' + allUC[i][0] ], [ [
								'colspan', 3 ] ])));
					// insertAfter($em('DIV',[trImg(allIDs[45]+'
					// '+i,allUC[i][0]),'
					// '+allUC[i][1]+' '+allUC[i][0]],[['style','margin:5px
					// 10px;']]), upt);
				}
			}
		}

		function saveHeroSpeed() {
			var sb = $gc("speed tooltip", cont);
			if (sb.length > 0) {
				RB.dictFL[19] = sb[0].innerHTML.match(/>\s*?(\d+)/)[1];
				saveCookie('DictFL', 'dictFL');
			}
		}
		function getVTip(vID) {
			if (isNaN(vID) || RB.Setup[36] != 1)
				return '';
			var newTip = '';
			if (RB.vHint[vID] != undefined)
				newTip = RB.vHint[vID];
			else if (typeof flinks[vID] != 'undefined')
				newTip = flinks[vID];
			return newTip;
		}

		function convertLinks() {
			function fillObj(arr) {
				for ( var i = 0; i < arr.length; i++) {
					var oneLink = arr[i].split("\/@_");
					var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
					flinks[tVId] = oneLink[1];
				}
			}
			flinks = new Object();
			loadVCookie('ln3', 'ln3', village_aid, 1);
			if (RB.ln3[0] == 0)
				RB.ln3.length = 0;
			fillObj(RB.ln3);
			var alinks = GM_getValue(GMcookieID + "ln", "").split("@@_");
			alinks.splice((alinks.length - 1), 1);
			fillObj(alinks);
		}
		function villageBMover() {
			function expCoords(coor) {
				var xy = coor.split(',');
				if (xy[11] - xy[1] < 20) {
					for ( var i = 0; i < 5; i++)
						xy[i * 2 + 1] = parseInt(xy[i * 2 + 1]) - 40;
				}
				return [ xy.join(","), parseInt(xy[0]), parseInt(xy[1]) ];
			}
			function checkChange() {
				var newCookie = [ 0 ];
				for ( var i = 0; i < crossN.length; i++) {
					if (crossN[i] != crossR[i]) {
						newCookie[0]++;
						newCookie.push(crossR[i], crossN[i]);
					}
				}
				if (newCookie[0] > 0)
					saveVCookie('vBM', newCookie, 1);
			}
			function villBMClick(bn) {
				if (startFL) {
					aBuild = crossN[bn];
					imgs[aBuild].setAttribute('style', 'top:0px;left:'
							+ (ltr ? 0 : 505) + 'px;z-index:600;');
					zBN = bn;
					startFL = false;
					var xy = expCoords(areas[bn].getAttribute('coords'));
					zImg.setAttribute('style', 'top:' + (xy[2] + 30)
							+ 'px;left:' + (xy[1] + (ltr ? 20 : -35))
							+ 'px;z-index:500;');
				} else {
					imgs[aBuild].setAttribute('style', iCoords[bn]);
					if (bn == zBN) {
						startFL = true;
						zImg.setAttribute('style', 'display:none;');
					} else {
						tBuild = crossN[bn];
						crossN[bn] = aBuild;
						crossN[zBN] = tBuild;
						aBuild = tBuild;
						imgs[aBuild].setAttribute('style', 'top:0px;left:'
								+ (ltr ? 0 : 505) + 'px;z-index:600;');
					}
					checkChange();
				}
			}
			function villBMCancel() {
				saveVCookie('vBM', [ 0 ], 1);
				location.reload(true);
			}
			function villBMStart() {
				if (inAct) {
					location.reload(true);
				} else {
					for ( var i = 0; i < areas.length; i++) {
						areas[i].setAttribute('href', jsVoid);
						if (i < areasCount) {
							areas[i].addEventListener('click', function(x) {
								return function() {
									villBMClick(x)
								}
							}(i), false);
							iCoords[i] = imgs[i].getAttribute('style');
						}
					}
					for (i = levels.length - 1; i >= 0; i--)
						levels[i].parentNode.removeChild(levels[i]);
					act.style.backgroundColor = 'yellow';
					$at($gt('IMG', act)[0], [ [ 'title', "ok" ] ]);
					var act_r = $ee(
							'DIV',
							"cancel",
							[ [
									'style',
									'position:absolute;top:10px;left:'
											+ (ltr ? 510 : 40)
											+ 'px;z-index:500;width:79px;background-color:red;text-align:center;cursor:pointer;' ] ]);
					act_r.addEventListener('click', villBMCancel, false);
					vmap.appendChild(act_r);
					inAct = true;
					zImg = trImg(allIDs[47], 'empty');
					zImg.setAttribute('style', 'display:none;');
					vmap.appendChild(zImg);
				}
			}

			var vmap = $g('village_map');
			if (!vmap)
				return;
			var aBuild = 0;
			var tBuild = 0;
			var aCoords = [];
			var iCoords = [];
			var zBN = 0;
			var zImg = '';
			var imgs = $gc('building', vmap);
			var areas = $gt('AREA', cont);
			var cross = [];
			if (imgs.length < 21)
				return;
			loadZVCookie('vBM', 'vBM');
			var areasCount = 20;
			for ( var i = 0; i < areas.length; i++)
				cross[i] = i;
			var crossN = cross.slice();
			var crossR = cross.slice();
			var levels = $gt('DIV', $g('levels'));
			var levelsRef = [];
			for (i = 0; i < levels.length; i++)
				levelsRef[levels[i].getAttribute('class').match(/\d+/)[0] - 19] = i;
			if (RB.vBM[0] > 0) {
				for (i = 0; i < areasCount; i++) {
					aCoords[i] = areas[i].getAttribute('coords');
					iCoords[i] = imgs[i].getAttribute('style');
				}
				for (i = 0; i < RB.vBM[0]; i++) {
					var f = RB.vBM[i * 2 + 1];
					var t = RB.vBM[i * 2 + 2];
					cross[f] = t;
					crossR[t] = f;
					imgs[t].setAttribute('style', iCoords[f]);
					var xy = expCoords(aCoords[f]);
					areas[t].setAttribute('coords', xy[0]);
					if (typeof (levelsRef[t]) != 'undefined')
						levels[levelsRef[t]].setAttribute('style', 'left:'
								+ (xy[1] + (ltr ? 20 : -35)) + 'px; top:'
								+ (xy[2] + 10) + 'px;');
				}
			}

			var inAct = false;
			var startFL = true;
			var act = $ee(
					'DIV',
					$e('IMG', [ [ 'src', img_bmove ],
							[ 'title', "Move Buildings" ] ]),
					[ [
							'style',
							'position:absolute;top:30px;left:'
									+ (ltr ? 510 : 40)
									+ 'px;z-index:500;width:79px;height:32px;cursor:pointer;' ] ]);
			act.addEventListener('click', villBMStart, false);
			vmap.appendChild(act);
		}

		function oasisKirilloid(vf) {
			var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]',
					'l', vf);
			if (troopsTR.snapshotLength < 1)
				return false;

			var kirillRace = ver4FL ? [ '', 'r1', 'r2' ] : [ 'r1', 'r2', 'r3' ];
			var kirillS = ver4FL ? kirillRace[RB.Setup[2]]
					+ 'RuUb#d:p500r3#r3u' : kirillRace[RB.Setup[2]]
					+ 'uR#d:r4p500;r4u';

			var anim = new Array(10);
			for ( var i = 0; i < troopsTR.snapshotLength; i++)
				anim[parseInt($gt('IMG', troopsTR.snapshotItem(i))[0]
						.getAttribute('class').match(/\d+/)[0]) - 31] = toNumber(troopsTR
						.snapshotItem(i).cells[1].innerHTML);

			for (i = 0; i < 10; i++)
				kirillS += anim[i] ? anim[i] + ',' : ',';
			kirillS = '#a:' + kirillS.replace(/,*$/, (ver4FL ? 'U' : 'U#'));
			return $a('(kirilloid)', [
					[
							'href',
							'http://travian.kirilloid.ru/warsim'
									+ (ver4FL ? '2' : '') + '.php' + kirillS ],
					[ 'target', '_blank' ], [ 'style', 'font-size:11px;' ] ]);
		}

		// start script
		RunTime[2] = new Date().getTime();
		if (!($g('l1')))
			return;
		var userID = getUserID();
		var GMcookieID = crtName + '-' + userID + '-';

		var xyBody = offsetPosition($xf('//body/div[@*="wrapper"]'));

		loadOVCookie('vHint', 'vHint');
		loadCookie('xy', 'XY');
		loadCookie('bodyH', 'bodyH');
		loadCookie('DictFL', 'dictFL');
		vlist_addButtonsT4();
		loadCookie('Dict', 'dictionary');

		if (villages_id[0] == 0)
			if (RB.dictionary[0] == 0) {
				document.location.href = fullName + 'spieler.php?uid=' + userID;
			} else {
				villages_id[0] = parseInt(RB.dictionary[0]);
				village_aid = villages_id[0];
			}
		loadAllCookie();
		var LC = setLC();
		var arena = RB.dictFL[3] == 0 ? ("arena") : RB.dictionary[3];

		if (RB.overview[0] > -1) {
			var i = parseInt(RB.overview[0]) + 1;
			if (i > villages_count) {
				RB.overview[0] = -2;
				saveCookie('OV', 'overview');
				setTimeout(function() {
					document.location.href = RB.overview[1];
				}, getRandom(300, 1000));
			} else {
				RB.overview[0] = i;
				saveCookie('OV', 'overview');
				var newdid = linkVSwitch[i - 1].match(/newdid=\d+/i)[0];
				setTimeout(function() {
					document.location.href = fullName + 'dorf1.php?' + newdid;
				}, getRandom(300, 1000));
			}
			return;
		} else if (RB.overview[0] == -2) {
			RB.overview[0] = -1;
			RB.overview[1] = Math.round(RunTime[0] / 1000);
			saveCookie('OV', 'overview');
			overviewAll();
		}

		var cont = $g(pageElem[1]);
		var contXY = offsetPosition(cont);
		var contRight = ltr ? contXY[0] + cont.clientWidth : contXY[0];
		var contTop = contXY[1];

		if (/dorf2.php/.test(crtPath))
			villageBMover();

		setTimeout(function() {
			progressbar_updValues();
			setInterval(progressbar_updValues, 1000);
		}, (1000 - progressbar_time - ((new Date().getTime()) - RunTime[0])));

		if (nextFL)
			if (GM_getValue(GMcookieID + 'next', -1) > 0)
				GM_setValue(GMcookieID + 'next', -1);

		/** ******** end of main code block *********** */
	}

	function backupStart() {
		if (notRunYet) {
			var l4 = document.getElementById('l4');
			if (l4)
				allInOneOpera();
			else
				setTimeout(backupStart, 500);
		}
	}

	var notRunYet = true;
	if (/khtml/i.test(navigator.appVersion))
		allInOneOpera();
	else if (window.addEventListener)
		window.addEventListener("load", function() {
			if (notRunYet)
				allInOneOpera();
		}, false);
	setTimeout(backupStart, 500);

})();
