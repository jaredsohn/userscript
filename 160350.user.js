// ==UserScript==
// @name		FusionGanja :: Muchkin
// @namespace		FG
// @version		2.5.7.20091014
// @author 		Пушкенъ
// @description 	Расширение для сраниц инвентаря, предмета, формы передачи предметов
// @license		GPL v3 или любая другая поздняя версия (http://www.gnu.org/copyleft/gpl.html)
// @include		http://*.ganjawars.ru/item.php?item_id=*
// @include		http://ganjawars.ru/item.php?item_id=*
// @include		http://*.ganjawars.ru/home.senditem.php*
// @include		http://ganjawars.ru/home.senditem.php*
// @include		http://*.ganjawars.ru/items.php*
// @include		http://ganjawars.ru/items.php*
// ==/UserScript==

(function() {
/* Библиотечка {{{ */
function xpathNode(xpath, contextNode) {
	return (document.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
}

function xpathNodesArray(xpath, contextNode) {
	var res = new Array();
	var sshot = document.evaluate(xpath, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (sshot != null) for (var i = 0; i < sshot.snapshotLength; i++) res.push(sshot.snapshotItem(i));
	return (res);
}

function ajaxQuery(url, method, param, async, onsuccess, onfailure) {
	var xmlHttpRequest = new XMLHttpRequest();
	if (async == true) {
		xmlHttpRequest.onreadystatechange = function () {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);
		}
	}
	if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.open(method, url, async);
	xmlHttpRequest.send(param);
	if (async == false) {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);
		else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);
	}
}
function parseBrokenInt(s) {
	var ns = s;
	while (ns.indexOf(',') != -1) ns = ns.replace(',', '');
	while (ns.indexOf('.') != -1) ns = ns.replace('.', '');
	return (parseInt(ns));
}
function parseBool(s) {
	if ((s) && s.toUpperCase() == 'TRUE') return (true)
	else return (false);
}
/* }}} Библиотечка */

if (location.href.indexOf("ganjawars.ru/item.php?item_id=") != -1) {
	/*************************************
	 ** Страница описания предмета
	 */
	var useless_link = xpathNode("//td[@class='txt']//a[contains(@href,'/market.php?buy=1')]", document);
	var lpholder = ((useless_link && useless_link.parentNode) ? useless_link.parentNode : null);
	if (lpholder == null) return; // подарки не продаются
	if (lpholder.removeChild(useless_link.nextSibling) && (lpholder.removeChild(useless_link.previousSibling)) && (lpholder.removeChild(useless_link))) useless_link = undefined
	else return;
	function market_action(itemid, action, postf) {
		if (typeof itemid == 'undefined' || itemid == null) return (undefined);
		var glandf = document.getElementById('gland').checked;
		var zlandf = document.getElementById('zland').checked;
		var plandf = document.getElementById('pland').checked;
		var island = (
			(
				(glandf && (zlandf || plandf)) || (zlandf && (glandf || plandf))
			) ? -1 : ((glandf) ? 0 : ((zlandf) ? 1 : ((plandf) ? 4 : -1)))
		);
		switch (postf) {
			case false:	return ('/market.php?stage=2&item_id='+itemid+'&action_id='+action+'&island='+island);
					break;
			case true:	return ('/market-p.php?stage=2&item_id='+itemid+'&action_id='+action);
					break;
		}
	}
	function fmtmarketlinks() {
		var itemid = /ganjawars\.ru\/item\.php\?item_id=(.*)/.exec(window.location.href)[1];
		if (itemid == null) return;
		for (var i = 1; i < 5; i++) document.getElementById('market'+i).href = market_action(itemid, i, false);
		for (var i = 1; i < 5; i++) document.getElementById('marketp'+i).href = market_action(itemid, i, true);
	}
	function checklocation() {
		ajaxQuery('/me/', 'GET', null, true, function (req) {
				var div = document.createElement('div');
				div.innerHTML = req.responseText;
				var currloc = xpathNode("//div[@id='hpdiv']/parent::td/a[contains(@href,'/map.php?sx=')]", div);
				var islandcode = currloc.textContent.substring(1,2);
				islandcode = (document.getElementById(islandcode.toLowerCase()+'land')) ? islandcode.toLowerCase() : 'g';
				document.getElementById(islandcode+'land').checked = true;
				fmtmarketlinks();
			});
	}

	var linksHTML = ""+<r><![CDATA[
	<!-- новые ссылки -->
	<b>Доска объявлений:</b> <input type="checkbox" id="gland">G-Land</input> <input type="checkbox" id="zland">Z-Land</input> <input type="checkbox" id="pland">P-Land</input><br/>
	[&nbsp;<a id="market1" href="#">Продают</a>&nbsp;],
	[&nbsp;<a id="market2" href="#">Покупают</a>&nbsp;],
	[&nbsp;<a id="market3" href="#">Сдают</a>&nbsp;],
	[&nbsp;<a id="market4" href="#">Арендуют</a>&nbsp;]<br/>
	[&nbsp;<a id="marketp1" href="#">Продам</a>&nbsp;],
	[&nbsp;<a id="marketp2" href="#">Куплю</a>&nbsp;],
	[&nbsp;<a id="marketp3" href="#">Сдам</a>&nbsp;],
	[&nbsp;<a id="marketp4" href="#">Возьму в аренду</a>&nbsp;]<br/>
	]]></r>;
	lpholder.innerHTML += linksHTML;
	checklocation();
	fmtmarketlinks();
	document.getElementById('gland').addEventListener('click', fmtmarketlinks, true);
	document.getElementById('zland').addEventListener('click', fmtmarketlinks, true);
	document.getElementById('pland').addEventListener('click', fmtmarketlinks, true);
} else if (window.location.href.indexOf("ganjawars.ru/items.php") != -1) {
	/*************************************
	 ** Страница инвентаря
	 */
	function replace_repair_links() {
		var repair_links = xpathNodesArray("//td[@class='txt'][@valign='top']/li/a[@href='/workshop.php']", document);
		if (repair_links.length > 0) {
			for (var i = 0; i < repair_links.length; i++) {
				// а вы тринадцатый псалом курили?
				if (xpathNode("//a[@href='/workshop.php']/parent::li/parent::td//a[contains(@onclick,'show_sell_window')]", repair_links[i].parentNode)) {
					var parms = /^show_sell_window\('([^']+)', (\d+) ,(?:.*)$/.exec(xpathNode("//a[@href='/workshop.php']/parent::li/parent::td//a[contains(@onclick,'show_sell_window')]", repair_links[i].parentNode).getAttribute('onclick'));
				} else {
					var parms = ['', xpathNode("//a[@href='/workshop.php']/parent::li/parent::td/parent::tr/td[@width='300']/table/tbody/tr/td[@id]", repair_links[i].parentNode).getAttribute('id'), ''];
					parms[2] = /item_(\d+)_td/.exec(parms[1])[1];
				}
				repair_links[i].href = "#"+parms[1]+","+parms[2];
				repair_links[i].addEventListener('click', function (event) {
						var itemparms = /#([^,]+),(\d+)/.exec(event.currentTarget.href);
						show_fix_window(itemparms[1], itemparms[2]);
						event.stopPropagation();
						event.preventDefault();
					}, true);
			}
			document.addEventListener("DOMNodeInserted", replace_repair_links, true);
		}
	}

	function show_fix_window(item_element, iid) {
		var pos = unsafeWindow.getElementPosition(item_element);
		var fix_window = document.getElementById("my_js_window");
	
		ajaxQuery('/workshop.php', 'GET', null, true,
			function (req) {
				var div = document.createElement('div');
				div.innerHTML = req.responseText;
				var tmp_item = xpathNode("//a[contains(@href,'/workshop.php?repair=" + iid + "')]", div);
				var tmp_md5 = (tmp_item && tmp_item.href.search(/&md5m=(.*)/) != -1) ? RegExp.$1 : '0';
				if (tmp_item) {
					tmp_item = tmp_item.parentNode.previousSibling;
					document.getElementById("fix_cost_div").innerHTML = '<b>Предмет будет отремонтирован за $'+/Стоимость ремонта: ([0-9,]+)/.exec(tmp_item.innerHTML)[1]+'</b>';
					var fix_submit = document.getElementById('fix_submit_button');
					fix_submit.title = iid + '&md5m=' + tmp_md5;
					fix_submit.addEventListener('click', function (event) {
							run_fix_submit(event.currentTarget.title);
						}, true);
				} else {
					document.getElementById('fix_cost_div').innerHTML = '<b style="color:#990000">Предмет невозможно отремонтировать</b>';
					document.getElementById("fix_submit_button").addEventListener('click', function (event) {
							hide_fix_window();
						}, true);
				}
				fix_window.setAttribute('style', ('left:' + (pos.left + 10) + ';top:' + pos.top + ';width:380;position:absolute;display:block'));
			});
	
	}

	function run_fix_submit(itemid) {
		ajaxQuery(('/workshop.php?repair=' + itemid), 'GET', null, false,
			function (req) {
				var ajaxupdater = document.createElement('script');
				ajaxupdater.type = 'text/javascript';
				ajaxupdater.innerHTML = ("new Ajax.Updater('itemsbody', 'home.do.php?j=1&item="+itemid+"', { asynchronious:false, method:'post' });");
				document.getElementsByTagName('body')[0].appendChild(ajaxupdater);
				hide_fix_window();
			});
	}

	function hide_fix_window() {
		document.getElementById("my_js_window").setAttribute('style', 'display:none');
	}
	var jswindow = document.createElement('div');
	jswindow.setAttribute('id', 'my_js_window');
	jswindow.setAttribute('style', 'display:none');
	jswindow.innerHTML = ""+<r><![CDATA[
	<table bgcolor="#990000" width="100%" cellspacing="1" cellpadding="1"><tbody><tr><td>
	<table width="100%" align="center" cellspacing="0" cellpadding="10"><tbody>
	<tr><td bgcolor="#ffffff" align="center">
	<div id="fix_cost_div" style="display:inline"></div><br/>
	<br/>
	Вы уверены? <b id="fix_submit_button" style="color:#990000;cursor:pointer">Да</b> | <b id="fix_hide_button" style="color:#000099;cursor:pointer"><b>Нет, не надо</b>
	</td></tr></tbody></table>
	</td></tr></tbody></table>
	]]></r>;
	document.getElementsByTagName('body')[0].appendChild(jswindow);
	document.getElementById('fix_submit_button').addEventListener('click', run_fix_submit, true);
	document.getElementById('fix_hide_button').addEventListener('click', hide_fix_window, true);
	replace_repair_links();
} else if (window.location.href.indexOf("ganjawars.ru/home.senditem.php") != -1) {
	/*************************************
	 ** Страница передачи предмета
	 */
	var itemid = /ganjawars\.ru\/home\.senditem\.php\?item=\d+&item_tag=([^&]+)&/.exec(window.location.href)[1];
	function get_item_cnt(iid) {
		var res = 0;
		ajaxQuery('/items.php', 'GET', null, false, function(req) {
				var div = document.createElement('div');
				div.innerHTML = req.responseText;
				res = xpathNodesArray("//font[@color='#990000']/parent::b/parent::a[contains(@href,'/item.php?item_id="+iid+"')]", div).length;
			});
		return (res);
	}
	function senditem(pokname, iid, price, cntOf, cnt, owtime, stype) {
		localCnt = cnt;
		document.getElementById('submitbtn-replaced').value = ('Отправка предмета ('+cnt+' из '+cntOf+')');
		ajaxQuery('/items.php', 'GET', null, false, function(req) {
				var div = document.createElement('div');
				div.innerHTML = req.responseText;
				if (cnt == 1) var thisone = parseInt(xpathNode("//input[@name='item']", document).value);
				var sendit = xpathNode("//a[contains(@href,'/item.php?item_id="+iid+"')]/parent::td/parent::tr/parent::tbody/parent::table/parent::td/parent::tr/td[2]/li/a[contains(@href,'home.senditem.php"+((cnt == 1) ? "?item="+thisone : '')+"')]", div);
				if (sendit == null) sendit = xpathNode("//a[contains(@href,'/item.php?item_id="+iid+"')]/parent::td/parent::tr/parent::tbody/parent::table/parent::td/parent::tr/following-sibling::tr/td/li/a[contains(@href,'home.senditem.php"+((cnt == 1) ? "?item="+thisone : '')+"')]", div);
				sendit = sendit.href;
				ajaxQuery(sendit, 'GET', null, false, function(rreq) {
						var ddiv = document.createElement('div');
						ddiv.innerHTML = rreq.responseText;
						// переменные
						var vitem = xpathNode("//input[@name='item']", ddiv).value;
						var vitem_tag = xpathNode("//input[@name='item_tag']", ddiv).value;
						var viuid = xpathNode("//input[@name='iuid']", ddiv).value;
						var senddo = '/home.senditem.php?item='+vitem+'&item_tag='+vitem_tag+'&iuid='+viuid+'&username='+pokname+'&sendprice='+price+((owtime != '1') ? ('&owned_time='+owtime) : '')+'&sendtype='+stype;
						ajaxQuery(senddo, 'GET', null, false, function(req) {
								var div = document.createElement('div');
								div.innerHTML= req.responseText;
								var send_statuss = xpathNode("//table[@class='wb'][@align='center'][@width='600']//tr[2]/td[@class='wb'][@colspan='2']", div);
								if (send_statuss.innerHTML.indexOf('Предмет успешно передан') == -1) {
									res = send_statuss.textContent;
									localCnt = cntOf;
								} else {
									res = 'Предмет успешно передан.';
								}
							});
					});
			});
		if (cnt == cntOf) {
			if (cntOf > 1 && res == 'Предмет успешно передан.') res = 'Все предметы переданы.';
			alert(res);
			window.location.href = '/items.php';
		} else {
			window.setTimeout(function (){ senditem(pokname, iid, 0, cntOf, localCnt + 1, owtime, stype); }, 2000);
		}
	}
	function sendpacket(pokname, iid, price, cnt, owtime, stype) {
		var cntOf = 1;
		senditem(pokname, iid, (price * cnt), cnt, cntOf, owtime, stype);
	}

	var send_table = xpathNode("//table[@class='wb'][@cellspacing='1'][@cellpadding='1'][@align='center'][@width='600'][1]", document);
	var targets_table = document.createElement('table');
	targets_table.setAttribute('class', 'wb');
	targets_table.setAttribute('cellpadding', '1');
	targets_table.setAttribute('cellspacing', '1');
	targets_table.setAttribute('align', 'center');
	targets_table.setAttribute('width', '600');
	targets_table.innerHTML ='<tbody><tr><td id="sendtgt" class="wb" bgcolor="#d0eed0" align="left" width="100%">Получатели: </td></tr></tbody>';
	send_table.parentNode.insertBefore(targets_table, send_table.previousSibling.previousSibling);
	function add_sendtarget(pokname, poktitle, color) {
		span = document.createElement('span');
		span.setAttribute('style','color:'+color+';text-decoration:underline;cursor:pointer');
		span.setAttribute('title', poktitle);
		span.innerHTML = pokname;
		span.addEventListener('click', function () {
			xpathNode("//input[@name='username']", document).value = pokname;
		}, true);
		document.getElementById('sendtgt').appendChild(span);
		span = document.createElement('span');
		span.innerHTML = ' ';
		document.getElementById('sendtgt').appendChild(span);
	}
	ajaxQuery('/home.friends.php', 'GET', null, true, function(req) {
			var div = document.createElement('div');
			div.innerHTML = req.responseText;
			var dudeez = xpathNodesArray("//table[@width='600']//td[@width='300'][1]//a[contains(@href,'/info.php?id=')]", div);
			for (var i = 0; i < dudeez.length; i++) add_sendtarget(dudeez[i].textContent, 'Ваш друг', '#990000');
			ajaxQuery('/sms.php', 'GET', null, true, function(req) {
					var div = document.createElement('div');
					div.innerHTML = req.responseText;
					var senderz = xpathNodesArray("//table[@class='wb'][@width='100%']//td[1]/nobr/a[contains(@href,'/info.php?id=')]", div);
					for (var i = 0; i < ((senderz.length > 10) ? 10 : senderz.length); i++) {
						add_sendtarget(senderz[i].textContent, senderz[i].parentNode.parentNode.parentNode.lastChild.textContent, '#000099');
					}
				});
		});
	var pricerow = xpathNode("//input[@name='sendprice']/parent::td", document);
	var pricerow_caption = xpathNode("//input[@name='sendprice']/parent::td/parent::tr/td[1]/b", document);
	if (pricerow_caption) pricerow_caption.innerHTML = pricerow_caption.innerHTML.replace(':', ' (за ед.) и кол-во:');
	if (pricerow) pricerow.innerHTML += ' x<input id="sendcnt" type="text" value="1" size="4"/> (<span id="itemcnt">0</span>)';
	var submitbtn = xpathNode("//input[@type='submit'][@title='Передать предмет']", document);
	submitbtn.setAttribute('type', 'button');
	submitbtn.setAttribute('id', 'submitbtn-replaced');
	var totalcnt = get_item_cnt(itemid);
	submitbtn.addEventListener('click', function() {
			if(xpathNode("//input[@id='sendcnt']", document).value <= totalcnt) {
				var sendtypez = xpathNodesArray("//input[@type='radio'][@name='sendtype']", document);
				for (var i = 0; i < sendtypez.length; i++) if (sendtypez[i].checked == true) var sendtype = sendtypez[i].value;
				switch (sendtype) {
					case '0':
					return;
					break;

					case '2':	
					if (xpathNode("//input[@id='sendcnt']", document).value > 1) {
						alert('Сдавайте вещи в аренду по одной.');
						return;
					}

					case '1':
					sendpacket(xpathNode("//input[@name='username']", document).value,
						itemid,
						((xpathNode("//input[@name='sendprice']", document)) ? parseInt(xpathNode("//input[@name='sendprice']", document).value) : 0),
						parseInt(xpathNode("//input[@id='sendcnt']", document).value),
						((xpathNode("//input[@name='owned_time']", document)) ? parseInt(xpathNode("//input[@name='owned_time']", document).value) : 0),
						sendtype);
					break;
				}
			} else {
				alert('У вас нет подобных предметов в таком количестве!');
			}
		}, true);

	if (document.getElementById('itemcnt')) document.getElementById('itemcnt').innerHTML = totalcnt;
	function replaceWarn() {
		var textTable = xpathNode("//table[@class='wb'][@cellspacing='1'][@cellpadding='1'][@align='center'][@width='600'][3]", document);
		ajaxQuery('/market-l.php', 'GET', null, false, function (req) {
				var div = document.createElement('div');
				div.innerHTML = req.responseText;
				textTable.innerHTML = xpathNode("//table[@class='wb'][@cellspacing='0'][@cellpadding='3'][@border='0']", div).innerHTML;
			});
		var removeit = xpathNodesArray("//a[contains(@href,'/market-l.php?del=')]", textTable);
		for (var i = 0; i < removeit.length; i++) {
			removeit[i].textContent = 'удалить';
			removeit[i].addEventListener('click', function(event) {
					ajaxQuery(event.currentTarget.href, 'GET', null, false);
					replaceWarn();
					event.stopPropagation();
					event.preventDefault()
				}, true);
		}
	}
	replaceWarn();
}
})();
//vim:fdm=marker
