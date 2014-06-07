// ==UserScript==
// @name           xfdt-pro
// @namespace      xfdt-pro
// @include        http://www.forumdeitroll.it/*
// @exclude        http://www.forumdeitroll.it/disclaimer.aspx
// ==/UserScript==

// FDT
// Copyright (C) 2008-2009 Wakko Warner, Achille/Penthotal, Sarrusofono
//               (http://thewakkowarner.netsons.org/,
//                http://www.forumdeitroll.it/,
//                http://ravanator.acmetoy.com/)
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Ed. Master e` il mio signore e padrone.

// Check dell'ultima versione in SVN
var SVN_REV = "$Rev: 56 $"; // svn propset svn:keywords "Rev" xfdt-pro.user.js

function toggle_albero_cuccagna() {
	var albero = document.getElementById('tdAlberoDellaCuccagna');
	albero.style['display'] = (albero.style['display'] == '') ?
			'none'  : '';
	if (albero.style['display'] == 'none')
		setUserValue('hideCuccagna', 'true');
	else
		setUserValue('hideCuccagna', 'false');
}

var links = document.getElementsByTagName('a');
var prev_msg = null;
var next_msg = null;
for (var c = 0; c < links.length; ++c) {
	if (links[c].href.match(/\'/)) continue;

	if (links[c].title == "Precedente") prev_msg = links[c].href;
	else if (links[c].title == "Successivo") next_msg = links[c].href;

//	if (links[c].className == 'fh1') {
//	links[c].style.color = "";
//	}

//	links[c].href = links[c].href.replace(/&m_rid=0$/g, '');

	if ((prev_msg != null) && (next_msg != null)) break;
}

if ((prev_msg != null) || (next_msg != null)) {
	// prev_msg = (prev_msg != null ? prev_msg : '#');
	// next_msg = (next_msg != null ? next_msg : '#');

	document.addEventListener("keydown", function(event) {
		if (quoteInPaginaAperto) return true;
		var code = event.which;
		if (((code == 74) || (code == 106)) && (next_msg != null)) unsafeWindow.location.href = next_msg;
		else if (((code == 75) || (code == 107)) && (prev_msg != null)) unsafeWindow.location.href = prev_msg;
	},true);
}

function belink_albero_cuccagna() {
	var td = document.getElementsByTagName("td");
	var tr = document.getElementsByTagName("tr");
	var tdcontent = null;
	var tdaction = null;
	var i = 0;
	for (c=0; c<(td.length); c++) {
		if ((td[c].className == "content")) {
			tdcontent = td[c];
			if (i==1) {
				break;
			}
			i++;
		}
	}

	for (c=0; c<(tr.length); c++) {
		if ((tr[c].className == "paginazione")) {
			tdaction = tr[c].firstChild.nextSibling.nextSibling.nextSibling;
			break;
		}
	}

	if (tdcontent != null) { // Se al passo precedente l'ho trovato...
		if (tdaction != null) {
			tdaction.innerHTML += "<a href='javascript:void(0);' class='textfolder' id='belink_albero'>Albero della Cuccagna</a> | ";
			tdaction.innerHTML += "<a href='javascript:void(0);' class='textfolder' id='fdtchat1'>FDT Chat</a> | ";
			tdaction.innerHTML += "<a href='javascript:void(0);' class='textfolder' id='belink_pifeed'>PI Feed<img src='http://punto-informatico.it/images/ico_feedrss.gif'></a>";
			// check ultima versione via SVN
			if (toCheckUpdate()) {
				checkForUpdate(tdaction);
			}
		}
	}
	document.getElementById('belink_albero').addEventListener("click", function(event) {toggle_albero_cuccagna();return false;}, true);
	document.getElementById('fdtchat1').addEventListener('click',preinitChat,false);
	document.getElementById('belink_pifeed').addEventListener('click', loadPIFeed, false);
}

function toCheckUpdate() {
	var today = new Date();
	var todayStr = today.getYear()+'/'+today.getMonth()+'/'+today.getDate();
	var lastUpdateStr = getUserValue('lastUpdate');
	if (lastUpdateStr) {
		if (todayStr != lastUpdateStr) {
			setUserValue('lastUpdate', todayStr);
			return true;
		}
		else return false;
	} else {
		setUserValue('lastUpdate', todayStr);
		return true;
	}
}

function checkForUpdate(tdaction) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://ravanator.acmetoy.com/svn/xfdt-pro.user-lastversion.sh",
		onload: function(responseDetails) {
			var ultimaVersioneSVN = parseInt(responseDetails.responseText);
			var versioneCorrente = SVN_REV.replace("$Rev: ", "");
			versioneCorrente = versioneCorrente.replace(" $", "");
			if (ultimaVersioneSVN > parseInt(versioneCorrente)) {
				// piglia il log dell'ultima versione
				GM_xmlhttpRequest({
						method: 'GET',
						url: "http://ravanator.acmetoy.com/svn/xfdt-pro.user-lastlog.sh",
						onload: function(responseDetails) {
							tdaction.innerHTML += " | <a href='http://ravanator.acmetoy.com/svn/xfdt-pro.user.js' class='textfolderblu' id='belink_script' title='" + responseDetails.responseText + "'>Nuova versione script !<img src='http://ravanator.acmetoy.com/xfdt/greasemonkey.png'></a>";
						}
				});
			}
		}
	});
}

// pija preferences utente nel cookie o nel localstorare (HTML5)
function getUserValue(valueName, defaultValue) {
	var returnValue;
	if (typeof(localStorage) == 'undefined') {
		// brouser vecchio come exsinistro => usa i cookies
		returnValue = Get_Cookie(valueName);
	} else {
		// HTML5
		returnValue = localStorage.getItem(valueName);
	}
	if (defaultValue != 'undefined' && returnValue == null) {
		return defaultValue;
	}
	return returnValue;
}

// setta preferences utente nel cookie o nel localstorare (HTML5)
function setUserValue(valueName, value) {
	if (typeof(localStorage) == 'undefined') {
		// brouser vecchio come exsinistro => usa i cookies
		Set_Cookie(valueName, value);
	} else {
		// HTML5
		localStorage.setItem(valueName, value);
	}
}

//http://techpatterns.com/downloads/javascript_cookies.php -- il belink contiene la versione commentata
function Set_Cookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}
function Get_Cookie( check_name ) {
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ ) {
		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if ( cookie_name == check_name ) {
			b_cookie_found = true;
			if ( a_temp_cookie.length > 1 ) {
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) {
		return null;
	}
}
function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) )
		document.cookie = name + "=" +
		( ( path ) ? ";path=" + path : "") +
		( ( domain ) ? ";domain=" + domain : "" ) +
		";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

String.prototype.trim=function () {
	function trimleft(str)
	{
		while (str.charAt(0)==' ')
			str=str.substring(1);
		return str;
	}
	function trimright(str)
	{
		while (str.charAt(str.length-1)==' ')
			str=str.substring(0,str.length-1);
		return str;
	}
	return trimleft(trimright(this));
};
Array.prototype.filter=function (f) {
	var arr=new Array();
	for (var i=0;i<this.length;i++)
		if (f(this[i],i,this))
			arr=arr.concat(this[i]);
	return arr;
};

var pageUrl = unsafeWindow.location.href;
//configurazione
var colorizeEnabled = true;

// valori checkbox utente
var hidePedoes = getUserValue("hidePedoes", "true");
var hideANOnimo = getUserValue("hideANOnimo", "true");
var hideCuccagna = getUserValue("hideCuccagna", "false");
var checkFdtBox = 'true' == getUserValue('checkFdtBox');
var checkUpper = "true" === getUserValue("checkUpper")

var quoteInPaginaAperto = false;

var URL_PI_FEED = 'http://punto-informatico.it/fader/pixml.xml';


//per tutte le pagine
document.title = 'Forum di Punto Informatico';
document.getElementById('testata').parentNode.removeChild(document.getElementById('testata'));


//http://fdt.pastebin.com/f17cc1dfb
//gestione ajax
function URLEncode(plaintext)
{
	var SAFECHARS = "0123456789" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
	"abcdefghijklmnopqrstuvwxyz" +
	"-_.!~*'()";
	var HEX = '0123456789ABCDEF';

	var encoded = '';
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
		if (ch == ' ') {
			encoded += '+'; // x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
			encoded += ch;
		} else {
			var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
				encoded += '+';
			} else {
				encoded += '%';
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	}
	return encoded;
}

function HTMLEncode(str)
{
	var div = document.createElement('div');
	var text = document.createTextNode(str);
	div.appendChild(text);
	return div.innerHTML;
}


function removeNode(node)
{
	node.parentNode.removeChild(node);
}

//gestione del forum

function clessidra(element)
{
	document.body.style.cursor='wait';
	element.style.display='block';
	element.innerHTML='<img src="images/clessidra.gif" alt="Attendere prego" border="0"/>';
}

function popola(div, image, value)
{
	document.body.style.cursor='default';
	div.innerHTML = value;
	image.setAttribute('src', 'images/m-.gif');
}

function load_thread(image, m_id, m_rid)
{
	var div = image.parentNode;
	while (div.nodeName.toLowerCase() != 'div') {
		div = div.parentNode;
	}
	div = div.nextSibling;

	clessidra(div);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.forumdeitroll.it/ht.aspx?m_id=' + m_id + '&m_rid=' + m_rid,
		onload: function(response)
		{
		if (response.readyState == 4 && response.status==200) {
			popola(div, image, response.responseText);
		}
		}
	});
}

function load_forum(image, f_id, lvl)
{
	var div = image.parentNode.parentNode.lastChild;

	clessidra(div);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.forumdeitroll.it/HF.aspx?f_id=' + f_id + '&lvl=' + lvl,
		onload: function(response)
		{
		if (response.readyState == 4 && response.status == 200) {
			popola(div, image, response.responseText);
		}
		}
	});
}

//FDT-box functions
function load_message(id, pos)
{
	var div = document.getElementById('innerdiv');
	clessidra(div);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.forumdeitroll.it/pbShowMessage.aspx?pos=' + pos + '&id=' + id,
		onload: function(response)
		{
		if (response.readyState == 4 && response.status == 200) {
			document.body.style.cursor='default';
			div.innerHTML = response.responseText;
		}
		}
	});
}

function mark_messages(type, pos)
{
	var list = new Array();
	var cbxs = document.getElementsByTagName('input');
	for (var i=0; i<cbxs.length; i++) {
		if (cbxs[i].getAttribute('name') == 'chkPiBox' && cbxs[i].checked) {
			list.push(cbxs[i].value);
		}
	}
	if (list.length > 0) {
		if ( 0 < type && type <= 3) {
			var msg = new Array(
					'Stai per eliminare dalla PI Box tutti i messaggi selezionati.\nSei sicuro?',
					'I messaggi inviati diveranno letti quando il destinatario aprirÃ  il messaggio.',
			'I messaggi inviati non possono essere marcati come non letti.');

			if ( type != 1 || window.confirm(msg[type-1]) ) {
				if (type != 1 && pos == 2) {
					alert(msg[type-1]);
				} else {
					window.location.href = 'http://www.forumdeitroll.it/pbMarkMessage.aspx?pos=' + pos +
					'&mtype=' + type +
					'&Ids=' + URLEncode(list.join(',')) +
					'&ref=' + URLEncode(window.location.href);
				}
			}
		}
	}
}

//http://pastebin.com/f24711cb3
function parseStrike(html) {
	return html.replace(/&lt;s&gt;(.*?)&lt;\/s&gt;/g,'<s>$1</s>');
}
function parseSpoiler(html) {
	return html.replace(/\[sp\](.*?)\[\/sp\]/g,'<span style="background-color: #000000" onmouseover="this.setAttribute(\'style\',\'background-color: #000000; color: #ffffff\')" onmouseout="this.setAttribute(\'style\',\'background-color: #000000; color: #000000\')">$1</span>');
}
function parseGiornFAIL(html) {
	return html.replace(/\>http:\/\/www\.ilgiornale\.it/gi, ">www.ilgiorn<b>FAIL</b>.it");
}

function fixNickLink(nick) {
	var nick_name=encodeURIComponent(nick.innerHTML);
	nick_name=nick_name.replace(/%20/g,'+');
	nick.setAttribute('href','http://fdt.freehostia.com/wiki/doku.php?id=' + nick_name);
}

//se pagine inserimento - modifica messaggio
if (pageUrl.indexOf('r.aspx') != -1 || pageUrl.indexOf('p.aspx') != -1) {
	div = document.getElementsByTagName('div');
	for (c=0; c<(div.length); c++) {
		if (div[c].getAttribute('class')=='emotitoli' && div[c].innerHTML=='Inserimento') {
			// aggiungi tastini per strike e spoiler
			var a=document.createElement('a');
			a.setAttribute('onclick','javascript:formatta(\'<s>\',\'\',\'</s>\',true);return false;');
			a.setAttribute('title','Barrato');
			a.setAttribute('href','javascript:void(0)');
			a.setAttribute('style','color: black; text-decoration: none;');
			a.innerHTML='<img border="0" height="20" alt="Barrato" style="" src="http://punto-informatico.it/images/strike.gif"/>';
			div[c].parentNode.insertBefore(a,div[c]);

			a=document.createElement('a');
			a.setAttribute('onclick','javascript:formatta(\'[sp]\',\'\',\'[/sp]\',true);return false;');
			a.setAttribute('title','Spoiler');
			a.setAttribute('href','javascript:void(0)');
			a.innerHTML='[spoiler]';
			div[c].parentNode.insertBefore(a,div[c]);

		}
	}
	// pagina di composizione del messaggio: Centra il contenuto
	var divMessaggio = document.getElementById("pnlThread");
	if (divMessaggio) {
		var actualNode = divMessaggio;
		while(true) {
			// risaliamo l'albero fino al td che contiene divMessaggio
			actualNode = actualNode.parentNode;
			if (actualNode.nodeName.toLowerCase() == "td") {
				// rimuoviamo colspan=2
				actualNode.removeAttribute("colspan");
				// aggiungiamo un td con width=30% sopra questo (Come la riga
				// sopra, tutto bello allineato =) !)
				var nuovoTd = document.createElement("td");
				nuovoTd.setAttribute("width", "30");
				actualNode.parentNode.insertBefore(nuovoTd, actualNode);
				break;
			}
		}
	}
}

//Colorize by wakko - mod_aquÃ¬
//TODO: 'sto metodo fa di tutto, sarÃ  il caso di cambiare nome
function colorize() {
	// link nickname2wiki
	var a=document.getElementsByTagName('a');
	for (var i=0;i<a.length;i++) {
		if (a[i].getAttribute('class')=='nick' && a[i].getAttribute('title')==null) {
			fixNickLink(a[i]);
			break;
		}
	}

	// TODO:levare 'sto if e relativa var o metterlo all'interno
	if (colorizeEnabled) {
		level1 = '#007BDF';
		level2 = '#00AF59';
		level3 = '#9A00EF';
		level4 = '#AF6F00';
		div = document.getElementsByTagName('div');
		var fromANOnimo = false;
		for (c=0; c<(div.length); c++) {
			if (div[c].className == 'csxItem') {
				if (div[c].innerHTML.match(/<b>non autenticato<\/b>/)) {
					fromANOnimo = true;
				}
			}
			if ((div[c].parentNode.className == 'funcbarthread')) {

				for (var i = 0; i < div[c].childNodes.length; ++i) {
					if (div[c].childNodes[i].nodeName == 'A') { // Youtube
						var href = div[c].childNodes[i].attributes.getNamedItem('href').value;

						var matched = href.match(/^https?:\/\/(www|it)\.youtube\.com\/watch\?v=(.{11})/);

						if (matched != null) {
							//alert("changing link A to youtube embed" + div[c].childNodes[i].innerHTML);
							var youcode = matched[2];

							var newnode = document.createElement('object');

							newnode.setAttribute('width', '425');
							newnode.setAttribute('height', '350');

							newnode.innerHTML = "<param name='movie' value='http://www.youtube.com/v/"+youcode+"'></param><param name='wmode' value='transparent'></param><embed src='http://www.youtube.com/v/"+youcode+"' type='application/x-shockwave-flash' wmode='transparent' width='425' height='350'></embed>";

							div[c].replaceChild(newnode, div[c].childNodes[i]);
						}
						// nascondi le porcherie postate da ANOnimo malato
						var aNode = div[c].childNodes[i];
						if (aNode.childNodes.length != 0 && aNode.childNodes[0].nodeName == 'IMG') {
							var imgNode = aNode.childNodes[0];
							var src = imgNode.attributes.getNamedItem('src').value;
							if (src.match(/^http:/)) { // immagine "esterna"
								if (hideANOnimo == "true" && fromANOnimo) {
									// sostituisci il contenuto per tutte le immagini esterne
									imgNode.style.display = 'none';
									var contentNode = document.createElement('div');
									contentNode.innerHTML = "Probabile porcheria <b>" + src + "</b>";
									contentNode.setAttribute('onclick', "javascript:this.nextSibling.style.display='';this.style.display='none';return false;");
									aNode.insertBefore(contentNode, imgNode);
								} else {
									// bonus
									var img = new Image();
									img.src = src;
									if (img.height < 150 || img.width < 150) { // mostra nella piccolezza attuale
										imgNode.width = img.width;
										imgNode.height = img.height;
									}
								}
							}
						}
					} else if (div[c].childNodes[i].nodeName == 'BLOCKQUOTE') {
						// Fix code-tag width
						var pre = div[c].childNodes[i].getElementsByTagName('PRE')[0];
						pre.setAttribute('width', '100%');
					}
				}

				var myhtml = div[c].innerHTML;
				var myhtmlarray = myhtml.split('<br>');
				myhtml = '';
				for (z=0; z<(myhtmlarray.length); z++) {
					if (myhtmlarray[z].substring(0,20)=='&gt; &gt; &gt; &gt; ') {
						myhtmlarray[z] = '<span style="color: ' + level4 + ';">' + balance(myhtmlarray[z]) + '</span>';
					} else if (myhtmlarray[z].substring(0,15)=='&gt; &gt; &gt; ') {
						myhtmlarray[z] = '<span style="color: ' + level3 + ';">' + balance(myhtmlarray[z]) + '</span>';
					} else if (myhtmlarray[z].substring(0,10)=='&gt; &gt; ') {
						myhtmlarray[z] = '<span style="color: ' + level2 + ';">' + balance(myhtmlarray[z]) + '</span>';
					} else if (myhtmlarray[z].substring(0,5)=='&gt; ') {
						myhtmlarray[z] = '<span style="color: ' + level1 + ';">' + balance(myhtmlarray[z]) + '</span>';
					}
					myhtml = myhtml + myhtmlarray[z] + '<br>';
				}
				myhtml = parseStrike(myhtml);
				myhtml = parseSpoiler(myhtml);
				myhtml = parseGiornFAIL(myhtml);
				div[c].innerHTML = myhtml;
			}
		}
	}
}

//fix colorize: bilanciamento tag aperti <i> <b> <u>
function balance(htmline) {
	var countOpenItalic = countTags('<i>', htmline);
	var countCloseItalic = countTags('</i>', htmline);
	if (countOpenItalic > countCloseItalic) htmline += '</i>';
	else if (countOpenItalic < countCloseItalic) htmline = '<i>' + htmline;
	var countOpenBold = countTags('<b>', htmline);
	var countCloseBold = countTags('</b>', htmline);
	if (countOpenBold > countCloseBold) htmline += '</b>';
	else if (countOpenBold < countCloseBold) htmline = '<b>' + htmline;
	var countOpenUnderline = countTags('<u>', htmline);
	var countCloseUnderline = countTags('</u>', htmline);
	if (countOpenUnderline > countCloseUnderline) htmline += '</u>';
	else if (countOpenUnderline < countCloseUnderline) htmline = '<u>' + htmline;
	return htmline;
}
function countTags(toSearch, whereToSearch) {
	var count = 0;
	for (var i = 0 ; i < whereToSearch.length - toSearch.length ; i++ ) {
		if (whereToSearch.substring(i, i+toSearch.length) == toSearch ) count++;
	}
	return count;
}

if (
		pageUrl.indexOf('m.aspx') != -1 ||
		pageUrl.indexOf('ms.aspx') != -1) {

	colorize();
}

//per pagine con alberino dei subforum
if (
		pageUrl.indexOf('hp.aspx') != -1 ||
		pageUrl.indexOf('m.aspx') != -1 ||
		pageUrl.indexOf('ms.aspx') != -1 ||
		pageUrl.indexOf('pb.aspx') != -1 ||
		pageUrl.indexOf('tb.aspx') != -1 ||
		pageUrl == 'http://www.forumdeitroll.it/') {

	// handler per click sx
	document.addEventListener('click', function(event)
			{
		if (event.button == 0) {
			var el = event.target;
			var alt = el.getAttribute('alt');
			var onclick = el.getAttribute('onclick');
			if (alt == 'Apri ramo') {
				var val = /OC[a-zA-Z]+\(this,\'(\d+)\',\'(\d+)\'\);/.exec(onclick);
				if (val) {
					load_thread(el, val[1], val[2]);
				}
			} else if (alt == 'Clicca per aprire') {
				var val = /OCForum\(this,\'(\d+)\',\'(\d+)\'\);/.exec(onclick);
				if (val) {
					load_forum(el, val[1], val[2]);
				}
			} else if (el.getAttribute('href') == '#msg') {
				var val = /LoadMessagePiBox\((\d+),(\d+)\);/.exec(onclick);
				if (val) {
					el.style.fontWeight='normal';
					load_message(val[1], val[2]);
				}
			} else if (el.getAttribute('class')=='textfolderblu') {
				var val = /MarkMessagePiBox\((\d+),(\d+)\);/.exec(el.getAttribute('href'));
				if (val) {
					mark_messages(val[1], val[2]);
				}
			}
		}
			}, true);

	var div = document.getElementById('innerdiv');
	if (div) {
		var script = div.nextSibling;
		while (script && script.nodeName.toLowerCase() != 'script') {
			script = script.nextSibling;
		}
		if (script) {
			var m = /LoadThread\((\d+), (\d+)\);/.exec(script.innerHTML);
			if (m) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.forumdeitroll.it/HTM.aspx?m_id=' + m[1] + '&m_rid=' + m[2],
					onload: function(response)
					{
					if (response.readyState == 4 && response.status == 200 ) {
						div.innerHTML = response.responseText;
					}
					}
				});
			}
		}
	}

	// belink aggiuntivi
	var forumPanelDiv;
	var forumPanelImg = document.getElementsByTagName('img');
	for (var i = 0 ; i < forumPanelImg.length ; i++ ) {
		if (forumPanelImg[i].getAttribute('src') == 'images/forumtype/fp.gif') {
			forumPanelDiv = forumPanelImg[i].parentNode.parentNode;
			break;
		}
	}
	if (forumPanelDiv != null) {
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><a class="textfolder" href="tb.aspx"><img src="images/forumtype/10thread.gif"> Segnalibri</a>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"> <a class="textfolder" target="_blank" href="http://ravanator.acmetoy.com/motorino/search" id="proottlink">Cerca con <img src="http://ravanator.acmetoy.com/img/logo_proot.png"></a>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><input type="text" id="q"><button id="cerca"><img src="http://ravanator.acmetoy.com/img/logo_proot.png"></button>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><a class="textfolder" href="http://www.piforum.it"><img src="images/pi.gif" style="width: 14px; height: 14px;"> Torna a PiForum</a>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><a class="textfolder" href="http://www.forumdeitroll.it/p.aspx?f_id=127"><img src="images/forumtype/2.gif"> Inizia una nuova discussione</a>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><a class="textfolder" href="http://fdt.pastebin.com/" target="_blank"><img src="images/forumtype/3.gif">fdt private pastebin</a>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><label class="textfolderblu"><input type="checkbox" '+((hidePedoes == 'true')?'checked="true"':'')+' id="chkProcura"> Nascondi Thread Procura</label>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><label class="textfolderblu"><input type="checkbox" '+((hideANOnimo == 'true')?'checked="true"':'')+' id="chkHideANOnimo"> Nascondi immagini da ANOnimo</label>';
		//	  forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><label class="textfolderblu"><input type="checkbox" '+((hideCuccagna == 'true')?'checked="true"':'')+' id="chkCuccagna"> Nascondi Automaticamente Albero</label>';
		forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><label class="textfolderblu"><input type="checkbox" '+((checkFdtBox)?'checked="true"':'')+' id="chkFdtBox"> Controlla Pvt Automagicamente</label>';
        forumPanelDiv.innerHTML += '<br/><img class="dotto" alt=" " src="images/trasp.gif"><img class="dotto" alt=" " src="images/trasp.gif"><label class="textfolderblu"><input type="checkbox" '+((checkUpper)?'checked="true"':'')+' id="chkUpper"> Abbassa la cresta</label>';

	}

	// cerca con proott
	document.getElementById("cerca").addEventListener("click", function(event) {
		if (event.button == 0) {
			var q = document.getElementById('q').value;
			var url = "http://ravanator.acmetoy.com/motorino/search?meta=on&smegma=0&q=" + unsafeWindow.encodeURIComponent(q);
			GM_openInTab(url);
		}
	}, true);
	document.getElementById("q").addEventListener("keydown", function(event) {
		if (event.which == 13) {
			var q = document.getElementById('q').value;
			var url = "http://ravanator.acmetoy.com/motorino/search?meta=on&smegma=0&q=" + unsafeWindow.encodeURIComponent(q);
			GM_openInTab(url);
			return false;
		}
	}, true);

	// checkbox per mostrare/nascondere la Procura di Catania
	document.getElementById("chkProcura").addEventListener("click", function(event) {
		var checked = document.getElementById("chkProcura").checked;
		var hidePedoesStr = ""+checked;
		setUserValue("hidePedoes", hidePedoesStr);
		hidePedoes = hidePedoesStr;
	}, true);

	// checkbox per mostrare/nascondere le immagini postate da ANOnimo malato
	document.getElementById("chkHideANOnimo").addEventListener("click", function(event) {
		var checked = document.getElementById("chkHideANOnimo").checked;
		var hideANOnimoStr = ""+checked;
		setUserValue("hideANOnimo", hideANOnimoStr);
		hideANOnimo = hideANOnimoStr;
	}, true);

    document.getElementById("chkUpper").addEventListener("click", function(event) {
        checkUpper = document.getElementById("chkUpper").checked
        setUserValue("checkUpper", checkUpper)
    }, true);

	// checkbox per mostrare/nascondere automaticamente l'albero dei thread
	/*  document.getElementById("chkCuccagna").addEventListener("click", function(event) {
		var checked = document.getElementById("chkCuccagna").checked;
		var hideCuccagnaStr = ""+checked;
		Set_Cookie("hideCuccagna", hideCuccagnaStr);
		hideCuccagna = hideCuccagnaStr;
	}, true);*/

	// fdtbox
	document.getElementById("chkFdtBox").addEventListener("click", function(event) {
		var checked = document.getElementById("chkFdtBox").checked;
		var checkFdtBoxStr = ""+checked;
		setUserValue("checkFdtBox", checkFdtBoxStr);
		checkFdtBox = 'true' == checkFdtBoxStr;
	}, true);
}

//http://pastebin.com/m1daedbcd
if (checkFdtBox && pageUrl.indexOf('pb.aspx') == -1) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.forumdeitroll.it/pb.aspx',
		onload: function(xhr) {
		if (xhr.responseText.search(/bolder/) != -1) {
			var images = document.getElementsByTagName('img');
			var piboxImg = null;
			for (var i = 0; i < images.length; i++) {
				if (images[i].getAttribute("alt") == "PI Box") {
					piboxImg = images[i];
				} else if (images[i].getAttribute("src") == "images/pibox-animato-trasp.gif") {
					images[i].setAttribute("src", "http://punto-informatico.it/images/icona_pibox_a.gif");
				}
			}
			if (piboxImg != null)
				piboxImg.parentNode.innerHTML = "<blink><img src='http://punto-informatico.it/images/icona_pibox_a.gif'> &nbsp;Hai PVT!!!</blink>";
		}
	}
	});
}

//quota nei messaggi
if (unsafeWindow.location.href.indexOf('m.aspx') != -1) {
	var img = document.getElementsByTagName('img');
	var unQuota = null;
	var first = true;
	for (var i=0;i<img.length;i++) {
		if (img[i].src.indexOf('images/quota.gif') != -1){
			if (first) first = false;
			else {
				unQuota = img[i];
				break;
			}
		}
	}
	// nei sondaggi non c'Ã¨
	if (unQuota) {
		var td = unQuota.parentNode.parentNode;
		//senza type="button" diventa automagicamente submit
		td.innerHTML += '<button type="button" id="quota"><img src="images/emo/pirata.gif"></button>';
		td = document.getElementById('innerdiv').parentNode;
		var style = td.getAttribute('style');
		if (style == null)
			style = 'text-align: center;';
		else
			style += ';text-align: center;';
		td.setAttribute('style', style);
		document.getElementById('quota').addEventListener('click', function(event){
			if(quoteInPaginaAperto) return false;
			quoteInPaginaAperto = true;
			var m_id = unsafeWindow.location.href.substring(unsafeWindow.location.href.indexOf("m_id="));
			m_id = m_id.substring(5);// length di m_id=
			if (m_id.indexOf("&") != -1)
				m_id = m_id.substring(0,m_id.indexOf("&"));
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.forumdeitroll.it/r.aspx?quote=1&m_id='+m_id,
				onload: function(xhr) {
				var txareaStart = xhr.responseText.indexOf('<textarea ');
				var txareaEnd = xhr.responseText.indexOf('</textarea>', txareaStart) + 11; // + </textarea> length
				var txArea = xhr.responseText.substring(txareaStart,txareaEnd);

				var titoloStart = xhr.responseText.indexOf('<input name="txtTitle" type="text" value="') + 42;
				var titoloEnd = xhr.responseText.indexOf('"', titoloStart);
				var txTitolo = xhr.responseText.substring(titoloStart,titoloEnd);

				// replace viewstate
				var response = xhr.responseText;
				var start = response.indexOf('__VIEWSTATE" value="');
				start += 20;
				var end = response.indexOf('"', start);
				var vs = response.substring(start, end);
				var vecchiovs = document.getElementsByName('__VIEWSTATE')[0].value;
				document.getElementsByName('__VIEWSTATE')[0].value = vs;

				start = response.indexOf('__EVENTVALIDATION" value="');
				start += 26;
				end = response.indexOf('"', start);
				var ev = response.substring(start,end);
				var parentHidden = document.getElementsByName('__VIEWSTATE')[0].parentNode;
				var evNode = document.createElement('input');
				evNode.type = "hidden";
				evNode.name = "__EVENTVALIDATION";
				evNode.id = "__EVENTVALIDATION";
				evNode.value = ev;
				parentHidden.appendChild(evNode);

				var txInner = '<input name="txtTitle" value="'+txTitolo+'" size="40" tabindex="1"><br>';
				txInner += txArea + '<br>';
				txInner += '<input type="text" name="txtNickName" tabindex="3">&nbsp;';
				txInner += '<input type="password" name="txtPass" tabindex="4"><br>';
				txInner += '<img src="JpegImage.aspx?fooparam='+Math.random()+'" id="imgcaptcha"><input type="text" name="txtCodeNumber" tabindex="5"><br>';
				txInner += '<input type="submit" name="cmdPostMessage" id="cmdPostMessage" value="Invia" tabindex="6"><br>';

				td.innerHTML = txInner + td.innerHTML;

				document.getElementById('imgcaptcha').addEventListener('click', function(event) {
					if (event.button == 0) {
						var o = document.getElementById("imgcaptcha");
						o.src = "JpegImage.aspx?" + (new Date).getTime().toString();
					}
				}, true);

				document.getElementById('cmdPostMessage').addEventListener('click', function(event) {
					if (event.button == 0) {
						document.forms[0].action = 'http://www.forumdeitroll.it/r.aspx?m_id='+m_id+'&quote=1&m_rid=0';
						document.forms[0].submit();
					}
				}, true);

				document.getElementsByName("txtPost")[0].focus();
			}
			});
		},true);
	}
}
if (hidePedoes == 'true') {
	if (unsafeWindow.location.href.indexOf('hp.aspx') != -1 || unsafeWindow.location.href == 'http://www.forumdeitroll.it' || unsafeWindow.location.href == 'http://www.forumdeitroll.it/') {
		var belinks = document.getElementsByTagName('a');
		for ( var i = 0 ; i < belinks.length ; i++ ) {
			if (belinks[i] != null && belinks[i].innerHTML == 'Proc di Catania') {
				if (belinks[i].getAttribute('style') == 'color: green; font-weight: bold;') {
					var divThread = belinks[i].parentNode.parentNode;
					if (divThread.tagName == 'DIV' && divThread.className == 'fh5') {
						divThread.parentNode.removeChild(divThread);
						belinks = document.getElementsByTagName('a');
						i = 0;
					}
				}
			}
		}
	}
}

function get_nick()
{
	function rand_num()
	{
		function get_rand_digit()
		{
			return Math.floor(Math.random() * 10);
		}
		var num='';
		for (var i=0;i<7;i++)
			num+=get_rand_digit();
		return num;
	}
	return 'user' + rand_num();
}

function chat(sid,nick,chan,t,q,nicks)
{
	function responseHandler(xhr)
	{
		function parseResponse(responseText)
		{
			var response=eval('(' + responseText + ')');
			for (var i=0;i<response.length;i++)
				if (response[i][0]=='c')
					parseCmd({'name':response[i][1],'sender':response[i][2],'arg':response[i][3]});
		}
		function parseCmd(cmd)
		{
			switch (cmd.name)
			{
			case '001':
			{
				send_cmd('JOIN',[chan],++t);
				break;
			}
			case 'PING':
			{
				send_cmd('PONG',[cmd.arg[0]],++t);
				break;
			}
			case '353':
			{
				nicks=nicks.concat(cmd.arg[3].trim().split(' '));
				break;
			}
			case '366':
			{
				send_cmd('QUIT',[':'],++t);
				q=1;
				show(nicks.filter(function (v,i,arr) {return v!=nick && v!=('@' + nick) && v!=('+' + nick);}));
				break;
			}
			}
		}
		if (xhr.readyState==4 && xhr.status==200)
		{
			var response=parseResponse(xhr.responseText);
			if (q==0) chat(sid,nick,chan,t+1,0,nicks);
		}
	}
	function send_cmd(cmd,args,t)
	{
		var details={'method':'POST',
				'url':'http://webchat.freenode.net/e/p?t=' + t,
				'headers':{'Content-Type':'application/x-www-form-urlencoded'},
				'data':'c=' + cmd + ' ' + args.join(' ') + '&s=' + sid};
		GM_xmlhttpRequest(details);
	}
	function show(nicks)
	{
		var txt='<div class="textfolder"><a href="http://webchat.freenode.net/?channels=' + encodeURIComponent(chan) + '" target="_blank">' + chan + '</a>: ';
		txt+=nicks.join('&nbsp;&nbsp;');
		txt+='<div style="text-align: center;"><a id="chiudi" href="javascript:void(0)">Chiudi</a></div></div>';
		document.getElementById('fdtchat2').innerHTML=txt;
		document.getElementById('chiudi').addEventListener('click',remove_fdtchat,false);
	}
	var details={'method':'POST',
			'url':'http://webchat.freenode.net/e/s?t=' + t,
			'headers':{'Content-Type':'application/x-www-form-urlencoded'},
			'data':'s=' + sid,
			'onreadystatechange':responseHandler};
	GM_xmlhttpRequest(details);
}

function init()
{
	var nick=get_nick();
	function responseHandler(xhr)
	{
		if (xhr.readyState==4 && xhr.status==200)
		{
			var response=eval('(' + xhr.responseText + ')');
			var sid=response[0] && response[1];
			if (sid!=false) chat(sid,nick,'##fdt',1,0,new Array());
		}
	}
	var details={'method':'POST',
			'url':'http://webchat.freenode.net/e/n?t=0',
			'headers':{'Content-Type':'application/x-www-form-urlencoded'},
			'data':'nick=' + nick,
			'onreadystatechange':responseHandler};
	GM_xmlhttpRequest(details);
}

function preinitChat()
{
	var tr1=document.getElementsByTagName('tr');
	remove_fdtchat();
	for (var i=0;i<tr1.length;i++)
		if (tr1[i].getAttribute('class')=='paginazione')
		{
			var tr2=document.createElement('tr');
			tr2.setAttribute('id','fdtchat');
			tr2.setAttribute('valign','middle');
			tr2.setAttribute('style','height: 19px;');
			tr2.setAttribute('class','paginazione');
			var td1=document.createElement('td');
			td1.setAttribute('width','50');
			td1.setAttribute('align','left');
			td1.innerHTML='&nbsp;';
			var td2=document.createElement('td');
			td2.setAttribute('id','fdtchat2');
			td2.setAttribute('align','left');
			td2.setAttribute('style','font-size: 1.2em;');
			td2.innerHTML='<div class="textfolder"><img src="images/clessidra.gif"/>&nbsp;Attendere prego...</div>';
			tr2=tr1[i].parentNode.appendChild(tr2);
			tr2.appendChild(td1);
			tr2.appendChild(td2);
			break;
		}
	init();
	return false;
}

function remove_fdtchat()
{
	var fdtchat=document.getElementById('fdtchat');
	if (fdtchat)
		fdtchat.parentNode.removeChild(fdtchat);
}

//NASCONDE ALBERO DELLA CUCCAGNA
var tables = document.getElementsByTagName('table');
for (var c = 0; c < tables.length; ++c) {
	var table = tables[c];
	if (table.parentNode.nodeName != 'FORM') continue;
	for (var i = 0; i < table.rows.length; ++i) {
		if (table.rows[i].innerHTML.match(/Forum Panel/) != null) {
			table.rows[i].cells[1].setAttribute('colspan', '2');
			if (hideCuccagna == 'true')
				table.rows[i].cells[0].style.display = 'none';
			else
				table.rows[i].cells[0].style.display = '';
			table.rows[i].cells[0].id = 'tdAlberoDellaCuccagna';
		}
	}
}

function loadPIFeed() {
	document.getElementById('belink_pifeed').removeEventListener('click', loadPIFeed, false);
	var tr1=document.getElementsByTagName('tr');
	// scopizzato dalla chat di codroipo - se non funziona cercate lui
	for (var i=0;i<tr1.length;i++)
		if (tr1[i].getAttribute('class')=='paginazione')
		{
			var tr2=document.createElement('tr');
			tr2.setAttribute('id','pifeed');
			tr2.setAttribute('valign','middle');
			tr2.setAttribute('style','height: 19px;');
			tr2.setAttribute('class','paginazione');
			var td1=document.createElement('td');
			td1.setAttribute('width','50');
			td1.setAttribute('align','left');
			td1.innerHTML='&nbsp;';
			var td2=document.createElement('td');
			td2.setAttribute('id','pifeed2');
			td2.setAttribute('align','left');
			td2.setAttribute('style','font-size: 1.2em;');
			td2.innerHTML='<div class="textfolder"><img src="images/clessidra.gif"/>&nbsp;Attendere prego...</div>';
			tr2=tr1[i].parentNode.appendChild(tr2);
			tr2.appendChild(td1);
			tr2.appendChild(td2);
			break;
		}

	GM_xmlhttpRequest({
		url: URL_PI_FEED,
		method: 'GET',
		onreadystatechange: function(xhr) {
		if (xhr.readyState == 4) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "text/xml");
			var items = doc.getElementsByTagName('item');
			// alert('loaded '+items.length+' PItems');
			document.getElementById('pifeed2').innerHTML = '';
			try {
				for (var i = 0; i < items.length; i++) {
					var title = null;
					var href = null;
					var description = null;
					for (var j = 0; j < items[i].childNodes.length; j++) {
						if (items[i].childNodes[j].tagName == 'title') {
							title = items[i].childNodes[j].childNodes[0].nodeValue;
						} else if (items[i].childNodes[j].tagName == 'link') {
							href = items[i].childNodes[j].childNodes[0].nodeValue;
						} else if (items[i].childNodes[j].tagName == 'title') {
							description = items[i].childNodes[j].childNodes[0].nodeValue;
						}
					}
					// tooltip con title e alt non funzionano? :'(
					var a = document.createElement('a');
					a.setAttribute('href', href);
					a.setAttribute('title', description);
					a.innerHTML = title;
					document.getElementById('pifeed2').appendChild(a);
					var img = document.createElement('img');
					img.setAttribute('src', 'http://punto-informatico.it/images/ico_feedrss.gif');
					img.setAttribute('alt', description);
					a.appendChild(img);
					document.getElementById('pifeed2').appendChild(document.createTextNode(' '));
				}
			} catch (e) {alert(e.message);};
		}
	}
	});
	document.getElementById('belink_pifeed').addEventListener('click', closePIFeed, false);
	document.getElementById('belink_pifeed').innerHTML = 'Chiudi Feed';
	return false;
}

function closePIFeed() {
	document.getElementById('pifeed').parentNode.removeChild(document.getElementById('pifeed'));
	document.getElementById('belink_pifeed').removeEventListener('click', closePIFeed, false);
	document.getElementById('belink_pifeed').addEventListener('click', loadPIFeed, false);
	document.getElementById('belink_pifeed').innerHTML = 'PI Feed<img src=\'http://punto-informatico.it/images/ico_feedrss.gif\'>';
}

if (
		pageUrl.indexOf('hp.aspx') != -1 ||
		pageUrl.indexOf('m.aspx') != -1 ||
		pageUrl.indexOf('ms.aspx') != -1 ||
		pageUrl.indexOf('pb.aspx') != -1 ||
		pageUrl.indexOf('tb.aspx') != -1 ||
		pageUrl == 'http://www.forumdeitroll.it/') {
	belink_albero_cuccagna();
}

var cleanup = function(xpExp) {
    
    var xpr = document.evaluate(xpExp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    alpha = /^[A-Za-z]$/

    var c = 0
    var node
    while ((node=xpr.snapshotItem(c++)) != null) {

        if (node && node.nodeValue) {
            var reply = node.nodeValue.indexOf("Re: ") == 0
            var letters = 0, upcases = 0
            for (var i = reply ? 4 : 0; i < node.nodeValue.length; i++) {
                var chr = node.nodeValue.charAt(i)
                if (chr.match(alpha)) {
                    letters++
                    if (chr === chr.toUpperCase())
                        upcases++
                }
            }
            var ratio = upcases/letters
            if ( ratio > 0.75)
                if (reply)
                    node.nodeValue = "Re: " + node.nodeValue.substring(4).toLowerCase()
                else
                    node.nodeValue = node.nodeValue.toLowerCase()
            //node.nodeValue += ' ('+ Math.round(ratio*Math.pow(10,2))/Math.pow(10,2) +')'
        }
    }
}


if (
        pageUrl.indexOf("hp.aspx") !== -1 ||
        pageUrl === "http://www.forumdeitroll.it/") {
    if (checkUpper) {
        //panel
        cleanup("/html/body/form/table/tbody/tr[3]/td[2]/div/table/tbody/tr[2]/td/div/a/text()")
        cleanup("/html/body/form/table/tbody/tr[3]/td[2]/div/table/tbody/tr[2]/td/div/div/a/text()")

        //forum
        cleanup("/html/body/form/table/tbody/tr[3]/td[2]/div/table/tbody/tr[3]/td/div/div/div/div/a/text()")
    }
}

//Se hai letto fino qui vuol dire che non trombi.
//Bidet! Bidet!
