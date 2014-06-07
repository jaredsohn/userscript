// ==UserScript==
// @name           DSPHPBB Reservierung de21
// @namespace      DSPHPBB
// @include        http://de21*/game.php*
// ==/UserScript==

//***************************************************************************
//*                              reservierung.user.js
//*                            -------------------
//*   author               : AZIM, Hathor, studentl
//*   copyright            : (C) DSphpbb team
//*   HP                   : www.dsphpbb.net
//*
//*   revision              2009/03/16 - 19:45:00 (svn 50)
//*
//***************************************************************************/

// Url zum Forum mit / am Ende
// Url to the forum with a slash at the end
var dsphpbburl='http://web590.jenny.webhoster.ag/s21/';

// Url zum DS-Server mit / am Ende
// Url to the DS server with a slash at the end
var dsserver = 'http://de21.die-staemme.de/';

//Die Staemme Spielername, zum markieren eigener reservierter Doerfer - Sonderzeichen in HTML-Entry Format. Siehe Forum fuer weitere Infos
//Tribal Wars playername, so your villages get marked
var dsuser = 'TotalWar 101';

//Benutzername in Forum
//Username in the Forum
var username = 'TotalWar 101';

//MD5 Verschlusselte Password (Rueckgabe von: ajax.php?action=get_md5_pass)
//MD5 encoded password (return value of: ajax.php?action=get_md5_pass&username=FORUMUSER&pass=FORUMPASS)
var pass_md5 = '$H$9q7SdsXqprANeKY0N9VZD3VAhoiU57/';

if(window.frames[1])
{
	var curloc = window.frames[1].location;
	var doc = window.frames[1].document;
	if(doc.location.href.search(/game.php/)<=0)
	{
		var curloc = window.frames[0].location;
		var doc = window.frames[0].document;
	}
}
else
{
	var curloc = window.location;
	var doc = window.document;
}

var search = new RegExp(dsserver, 'i');
if(curloc.href.search(search) >= 0) 
{
	if(checkBrowserName('opera'))
	{
		if (/screen=map/.test(curloc.search))
		{
			var xmlHttp;
			var changed = 0;
			//auslesen des Kartenmittelpunktes
			var allDivs, thisDiv;
			
			window.setInterval(
			function()
			{
				if (!check()) return;
				koordinaten = document.evaluate(
				"//table[@id='mapCoords']/*/tr",
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var koords = new Array(2);
				groesse = koordinaten.snapshotItem(0).cells[1].getAttribute('rowspan');
				koords[1] = parseInt(koordinaten.snapshotItem(0).cells[0].innerHTML) + (groesse/2 -0.5);
				koords[0] = parseInt(koordinaten.snapshotItem(groesse).cells[1].innerHTML) + (groesse/2 -0.5);
				
				
				xmlHttp=GetXmlHttpObject();
				if (xmlHttp==null)
				{
					alert ("Opera Userscript not found. \nOpera Userscript nicht gefunden");
					exit;
				}
				var url=dsphpbburl+'ajax.php?username='+username+'&pass_md5='+pass_md5+'&action=get_res&mkoor='+koords[0]+'|'+koords[1];
				xmlHttp.onreadystatechange=stateChangedMap;
				xmlHttp.open("GET",url,true);
				xmlHttp.send(null);
			}, 300);
		}
		
		if(/screen=info_village/.test(curloc.search))
		{
			var xmlHttp;
			var el = curloc.search.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];
			
			xmlHttp=GetXmlHttpObject();
			if (xmlHttp==null)
			{
				alert ("Opera Userscript not found. \nOpera Userscript nicht gefunden");
				exit;
			}
			var url=dsphpbburl+'ajax.php?username='+username+'&pass_md5='+pass_md5+'&action=get_res&vid='+el;
			xmlHttp.onreadystatechange=stateChangedVillage;
			xmlHttp.open("GET",url,true);
			xmlHttp.send(null);
		}
	}
	else if(checkBrowserName('firefox'))
	{
		if (/screen=map/.test(curloc.search))
		{
			var changed = 0;
			//auslesen des Kartenmittelpunktes
			var allDivs, thisDiv;

			window.setInterval(
			function()
			{
				if (!check()) return;
				
				koordinaten = document.evaluate(
				"//table[@id='mapCoords']/*/tr",
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var koords = new Array(2);
				groesse = koordinaten.snapshotItem(0).cells[1].getAttribute('rowspan');
				koords[1] = parseInt(koordinaten.snapshotItem(0).cells[0].innerHTML) + (groesse/2 -0.5);
				koords[0] = parseInt(koordinaten.snapshotItem(groesse).cells[1].innerHTML) + (groesse/2 -0.5);
				
				GM_xmlhttpRequest
				({
					method:'GET',
					url:dsphpbburl+'ajax.php?username='+username+'&pass_md5='+pass_md5+'&action=get_res&mkoor='+koords[0]+'|'+koords[1],
					onload: function(responseDetails)
					{
						eval("var reservedVillages="+responseDetails.responseText);
						var i,map;
						map = document.getElementById('mapOld').firstChild;
						if (!map) map = document.getElementById('mapNew').firstChild;
						var a = map.getElementsByTagName('a');
						
						for(i in a)
						{
							if (/village=/.test(a[i].href))
							{
								var erg = a[i].href.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];
								var village = in_array(erg, reservedVillages);
								if (village)
								{
									if (!((imgtag = document.evaluate(getElementXPath(a[i].parentNode) + "/div[@class='lay2']/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength > 0));
											((imgtag = document.evaluate(getElementXPath(a[i].parentNode) + "/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength > 0);
											
									if ((imgtag.snapshotItem(0).src != dsphpbburl+"images/villages/res.gif") && (imgtag.snapshotItem(0).src != dsphpbburl+"images/villages/myres.gif") && (imgtag.snapshotItem(0).src != dsphpbburl+"images/villages/thread.gif"))
									{
										var url = "url(" + imgtag.snapshotItem(0).src + ")";
										a[i].parentNode.style.backgroundImage = url;
										// if village is my reservation
										
										if (village['user'] == dsuser) imgtag.snapshotItem(0).src = dsphpbburl+"images/villages/myres.gif";
										// if village is from a thread (unreserved)
										else if (village['user'] == '' ) imgtag.snapshotItem(0).src = dsphpbburl+"images/villages/thread.gif";
										else 
										{
											imgtag.snapshotItem(0).src = dsphpbburl+"images/villages/res.gif";
											// wenn onmouseover auf dem dorf vorhanden ist, dann ändere es entsprechend unseren vorstellungen
											if (a[i].getAttribute('onmouseover')) 
											{
												// hole alte werte der onxxx funktionen
												var over = a[i].getAttribute('onmouseover');
												var out  = a[i].getAttribute('onmouseout');
												
												// hänge neue Methoden an die alten dran
												var mouseover = ("{" + over + ";" +generateOnMouseOver(village) + ";}"); 
												var mouseout  = ("{" + out + ";" +generateOnMouseOut() + ";}"); 
												
												// neue funktion onmouseover und onmouseout fertig, zuweisen zu elementen
												// --> set onmouseover/out to div
												
												//imgtag.snapshotItem(0).setAttribute('onmouseover', mouseover);
												a[i].setAttribute('onmouseover', mouseover);
												
												//imgtag.snapshotItem(0).setAttribute('onmouseout', mouseout);
												a[i].setAttribute('onmouseout', mouseout);
												
											}
										}
									}
									
								}
							}
						}
						changed = map;
					}
				});
			}, 300);
		}

		if(/screen=info_village/.test(curloc.search))
		{
			//ermitteln der ID des aktuell ausgewählten Dorfes
			var el = curloc.search.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];
			GM_xmlhttpRequest
			({
					method:'GET',
					url:dsphpbburl+'ajax.php?username='+username+'&pass_md5='+pass_md5+'&action=get_res&vid='+el,
					onload: function(responseDetails)
					{
						if(responseDetails.status == 200)
						{
							eval("var reservedVillages="+responseDetails.responseText);
							var lang = new Array(3);
							lang['comment'] = reservedVillages[0]['lang_comment'];
							lang['reserved'] = reservedVillages[0]['lang_reserved'];
							lang['reserve'] = reservedVillages[0]['lang_reserve'];
							lang['available'] = reservedVillages[0]['lang_available'];
							
							var village = get_village(reservedVillages, curloc);
							var allDivs, thisDiv;
								allDivs = document.evaluate(
									"//table[@class='vis left']//*/tr",
									doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							thisDiv = allDivs.snapshotItem(5);
							// Dorf wirklich reserviert
							if(village && !village['free'] && village['user'] != "")
							{
								var tr = document.createElement('tr');
								var td1 = document.createElement('td');
								td1.innerHTML = lang['reserved']+':';
								var td2 = document.createElement('td');
								var link = document.createElement('a');
								link.href = village['user_link'];
								link.title = village['user'];
								link.innerHTML = village['user'];
								td2.appendChild(link);
								
								// eigene Reservierung löschen
								if ((village['user'] == dsuser) && (village['user_forum'].toLowerCase() == username.toLowerCase())) {
									var dellink = document.createElement('a');
									var delico = document.createElement('img');
									delico.src = dsphpbburl+"images/villages/icon_res_delete.gif";
									delico.alt = "Reservierung freigeben";
									dellink.appendChild(delico);
									dellink.href = "javascript:void(0);";
									var koords = allDivs.snapshotItem(1).childNodes[1].innerHTML;
									dellink.addEventListener("click", function(event) { evalres(koords, 'del_res');return false; }, false); 
									td2.appendChild(document.createTextNode(" "));
									td2.appendChild(dellink);
								}
								tr.appendChild(td1);
								tr.appendChild(td2);
			
								thisDiv.parentNode.insertBefore(tr, allDivs.snapshotItem(allDivs.snapshotLength));
								if(village['comment'])
								{
									var tr2 = document.createElement('tr');
									var td11 = document.createElement('td');
									td11.innerHTML = lang['comment']+':';
									
									var td21 = document.createElement('td');
									td21.innerHTML = village['comment'];
									tr2.appendChild(td11);
									tr2.appendChild(td21);
									thisDiv.parentNode.insertBefore(tr2, allDivs.snapshotItem(allDivs.snapshotLength));
								}
							} else if(village && !village['free'] && village['user'] == "") 
							{
								// Reservierungsthread und frei
								var tr4 = document.createElement('tr');
								var td1 = document.createElement('td');
								td1.innerHTML = lang['available']+':';
								var td2 = document.createElement('td');
								var a4 = document.createElement('a');
								var koor = allDivs.snapshotItem(1).innerHTML.match(/(\d{1,3}\|\d{1,3})/);
								a4.addEventListener("click", function(event) { evalres(RegExp.$1, 'add_res');return false; }, false); 
								a4.href = "javascript:void(0);";
								a4.innerHTML = lang['reserve'];
								td2.appendChild(a4);
								tr4.appendChild(td1);
								tr4.appendChild(td2);
								thisDiv.parentNode.insertBefore(tr4, allDivs.snapshotItem(allDivs.snapshotLength));
							
							} else if(!village) //&& village['free'] 
							{
								//Dorf frei
								var tr3 = document.createElement('tr');
								var td3 = document.createElement('td');
								var td31 = document.createElement('td');
								var a3 = document.createElement('a');
								var koor = allDivs.snapshotItem(1).innerHTML.match(/(\d{1,3}\|\d{1,3})/);
								a3.addEventListener("click", function(event) { evalres(RegExp.$1, 'add_res');return false; }, false); 
								a3.href = "javascript:void(0);";
								a3.innerHTML = lang['reserve'];
								td3.appendChild(a3);
								tr3.appendChild(td3);
								tr3.appendChild(td31);
								thisDiv.parentNode.insertBefore(tr3, allDivs.snapshotItem(allDivs.snapshotLength));
							}
						}
					}
			});
		}
	}
}

function check() {
	if (changed == 0) return true;
	var map;
	map = document.getElementById('mapOld').firstChild;
	if (!map) map = document.getElementById('mapNew').firstChild;
	return map != changed;
}
function in_array(el,arr) {
	var j;
	for (j in arr) {
		if (arr[j]['id'] == el) return arr[j];
	}
	return false;
}
function get_village(arr, loc) {
	var el = loc.search.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];
	var j;
	for (j in arr)
		if (arr[j]['id'] == el) return arr[j];
	return false;
}

// anfrage an forum, ob reservierung ok ist
function evalres(koords, type) {
	query_url = dsphpbburl + "ajax.php?username=" + username + "&pass_md5=" + pass_md5 + "&action=" + type +"&koor=" + koords;
	if (type == "add_res") {
		comment = prompt("Kommentar?","");
		if (!comment=="") query_url += "&comment="+comment;
	}
	
	if(checkBrowserName('firefox'))
	{
		GM_xmlhttpRequest
		({
			method:'GET',
			url:query_url,
			onload: function(responseDetails)
			{
				// umwandeln des ergebnisses in ein javascript array
				var antwort = eval(responseDetails.responseText);
				reserveAnswer(antwort) 
			}
			
		});
	} 
	else if (checkBrowserName('opera'))
	{
		var xmlHttp;
		
		xmlHttp=GetXmlHttpObject();
		if (xmlHttp==null)
		{
			alert ("Browser does not support HTTP Request");
			exit;
		}
		var url=query_url;
		xmlHttp.onreadystatechange=function(test){
			if (xmlHttp.readyState==4)
			{
				var antwort = eval(xmlHttp.responseText);
				reserveAnswer(antwort);
				return false;
			}
		};
		xmlHttp.open("GET",url,true);
		xmlHttp.send(null);
	}
}

function reserveAnswer(antwort)
{
	if (antwort) {
		var htmldecode = document.createElement('td');
		//array auswerten: null wenn leer, sonst text
		var meldung = (antwort[0]['meldung'] == "")? null:antwort[0]['meldung'] + "\n";
		var meldung_erfolg = (antwort[0]['meldung_erfolg'] == "")? null:antwort[0]['meldung_erfolg'] + "\n";
		var meldung_besetzt = (antwort[0]['meldung_besetzt'] == "")? null:antwort[0]['meldung_besetzt'] + "\n";
		var meldung_geloescht = (antwort[0]['meldung_geloescht'] == "")? null:antwort[0]['meldung_geloescht'];
		
		// display all messages returned from query
		if (meldung) {
			htmldecode.innerHTML = meldung.replace(/<br \/>/g, "\n");
			alert(htmldecode.textContent);
		}
		if (meldung_erfolg) {
			htmldecode.innerHTML = meldung_erfolg.replace(/<br \/>/g, "\n");
			alert(htmldecode.textContent);
		}
		if (meldung_besetzt) {
			htmldecode.innerHTML = meldung_besetzt.replace(/<br \/>/g, "\n");
			alert(htmldecode.textContent);
		}
		if (meldung_geloescht) {
			htmldecode.innerHTML = meldung_geloescht.replace(/<br \/>/g, "\n");
			alert(htmldecode.textContent);
		}
		// frame auf browsercache neu laden
		history.go(0);
	}
}

function generateOnMouseOver(village) {
var string ="var infoDiv;"
			// hole alle tabellenzeilen der tabelle info_content
			+ "infoDiv = document.evaluate(\"//table[@id='info_content']//*/tr\","
			+ " window.document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);"
			// prüfe, ob tabellenzeile für reservierenden existiert
			+ "if (!document.getElementById('info_res')) {"
				// create new tr if not existing
				+ "	var tr = document.createElement('tr');"
				+ "	tr.setAttribute('id', 'info_res');"
					//tr.setAttribute('style', 'display:none');
				+ "	var td1 = document.createElement('td');" //reservieren
				+ "	td1.innerHTML = 'Reserviert: ';"
				+ "	var td2 = document.createElement('td');" // wer reserviert
				+ "	td2.innerHTML = '" + village['user'] + "';"
				+ "	tr.appendChild(td1);"
				+ "	tr.appendChild(td2);"
				+ "	infoDiv.snapshotItem(0).parentNode.appendChild(tr);"
					// extend bonus image size
				+ "	infoDiv.snapshotItem(0).firstChild.rowSpan = (infoDiv.snapshotItem(0).firstChild.getAttribute('rowspan') + 1);"
			+ "} "
			// prüfe, ob tabellenzeile für comment existiert
			+ "if (!document.getElementById('info_res_comment')) {"
					// create new tr if not existing
				+ "	var tr = document.createElement('tr');"
				+ "	tr.setAttribute('id', 'info_res_comment');"
				//tr.setAttribute('style', 'display:none');
				+ "	var td1 = document.createElement('td'); "//reservieren
				+ "	td1.innerHTML = 'Kommentar: ';"
				+ "	var td2 = document.createElement('td');" // wer reserviert
				+ "	td2.innerHTML = '" + village['comment'] + "';"
				+ "	tr.appendChild(td1);"
				+ "	tr.appendChild(td2);"
				+ "	infoDiv.snapshotItem(0).parentNode.appendChild(tr);"
				// extend bonus image size
				+ "	infoDiv.snapshotItem(0).firstChild.rowSpan = (infoDiv.snapshotItem(0).firstChild.getAttribute('rowspan') + 1);"
			+ "} "
			// sure, that the divs are existing, now we use them
			+ "{"
					// get tr from reservation and each td inside
				+ "	info_res_tr = document.evaluate(\"//tr\[@id='info_res'\]//td\","
				+ "window.document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);"
				+ "	info_res_com_tr = document.evaluate(\"//tr[@id='info_res_comment']//td\","
				+ "window.document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);"
				+ "	info_res_tr.snapshotItem(1).innerHTML = '" + village['user'] + "';"
				+ "	info_res_tr.snapshotItem(1).parentNode.setAttribute('style', '');"
				+ "if (" + village['comment'].length + ">=1) {"
					+ "	info_res_com_tr.snapshotItem(1).innerHTML = '" + village['comment'] + "';"
					+ " info_res_com_tr.snapshotItem(1).parentNode.setAttribute('style', '');"	
				+ "} else {"
					+ "info_res_com_tr.snapshotItem(1).parentNode.setAttribute('style', 'display:none');"
				+ "}"
			+ "}";
	return string;
}

function generateOnMouseOut() {
	var string =""
		+ "if (temp=document.getElementById('info_res_comment'))"
		+ "	temp.setAttribute('style', 'display:none');"
		+ "if (temp = document.getElementById('info_res')){}"
		+ "	temp.setAttribute('style', 'display:none');";
	return string;
}

function getElementXPath(elt)
{
     var path = "";
     for (; elt && elt.nodeType == 1; elt = elt.parentNode)
     {
   	idx = getElementIdx(elt);
	xname = elt.tagName;
	if (idx > 1) xname += "[" + idx + "]";
	path = "/" + xname + path;
     }
 
     return path;	
}

function getElementIdx(elt)
{
    var count = 1;
    for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)
    {
        if(sib.nodeType == 1 && sib.tagName == elt.tagName)	count++
    }
    
    return count;
}


// OPERA only:

function stateChangedMap() 
{ 
	if (xmlHttp.readyState==4)
	{
		eval("var reservedVillages="+xmlHttp.responseText);
		var i,map;
		map = document.getElementById('mapOld').firstChild;
		if (!map) map = document.getElementById('mapNew').firstChild;
		var a = map.getElementsByTagName('a');
		
		for(i in a)
		{
			if (/village=/.test(a[i].href))
			{
				var erg = a[i].href.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];
				var village = in_array(erg, reservedVillages);
				if (village)
				{
					if (!((imgtag = document.evaluate(getElementXPath(a[i].parentNode) + "/div[@class='lay2']/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength > 0));
							((imgtag = document.evaluate(getElementXPath(a[i].parentNode) + "/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength > 0);
							
					if ((imgtag.snapshotItem(0).src != dsphpbburl+"images/villages/res.gif") && (imgtag.snapshotItem(0).src != dsphpbburl+"images/villages/myres.gif") && (imgtag.snapshotItem(0).src != dsphpbburl+"images/villages/thread.gif"))
					{
						var url = "url(" + imgtag.snapshotItem(0).src + ")";
						a[i].parentNode.style.backgroundImage = url;
						// if village is my reservation
						
						if (village['user'] == dsuser) imgtag.snapshotItem(0).src = dsphpbburl+"images/villages/myres.gif";
						// if village is from a thread (unreserved)
						else if (village['user'] == '' ) imgtag.snapshotItem(0).src = dsphpbburl+"images/villages/thread.gif";
						else 
						{
							imgtag.snapshotItem(0).src = dsphpbburl+"images/villages/res.gif";
							// wenn onmouseover auf dem dorf vorhanden ist, dann ändere es entsprechend unseren vorstellungen
							if (a[i].getAttribute('onmouseover')) 
							{
								// hole alte werte der onxxx funktionen
								var over = a[i].getAttribute('onmouseover');
								var out  = a[i].getAttribute('onmouseout');
								
								// hänge neue Methoden an die alten dran
								var mouseover = ("{" + over + ";" +generateOnMouseOver(village) + ";}"); 
								var mouseout  = ("{" + out + ";" +generateOnMouseOut() + ";}"); 
								
								// neue funktion onmouseover und onmouseout fertig, zuweisen zu elementen
								// --> set onmouseover/out to div
								
								//imgtag.snapshotItem(0).setAttribute('onmouseover', mouseover);
								a[i].setAttribute('onmouseover', mouseover);
								
								//imgtag.snapshotItem(0).setAttribute('onmouseout', mouseout);
								a[i].setAttribute('onmouseout', mouseout);
								
							}
						}
					}
					
				}
			}
		}
		changed = map;
	}
	// alert(xmlHttp.responseText);
}

function stateChangedVillage()
{
	if (xmlHttp.readyState==4)
	{
		eval("var reservedVillages="+xmlHttp.responseText);
		var lang = new Array(3);
		lang['comment'] = reservedVillages[0]['lang_comment'];
		lang['reserved'] = reservedVillages[0]['lang_reserved'];
		lang['reserve'] = reservedVillages[0]['lang_reserve'];
		lang['available'] = reservedVillages[0]['lang_available'];
		
		var village = get_village(reservedVillages, curloc);
		var allDivs, thisDiv;
			allDivs = document.evaluate(
				"//table[@class='vis left']//*/tr",
				doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		thisDiv = allDivs.snapshotItem(5);
		// Dorf wirklich reserviert
		if(village && !village['free'] && village['user'] != "")
		{
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			td1.innerHTML = lang['reserved']+':';
			var td2 = document.createElement('td');
			var link = document.createElement('a');
			link.href = village['user_link'];
			link.title = village['user'];
			link.innerHTML = village['user'];
			td2.appendChild(link);
			
			// eigene Reservierung löschen
			if ((village['user'] == dsuser) && (village['user_forum'].toLowerCase() == username.toLowerCase())) {
				var dellink = document.createElement('a');
				var delico = document.createElement('img');
				delico.src = dsphpbburl+"images/villages/icon_res_delete.gif";
				delico.alt = "Reservierung freigeben";
				dellink.appendChild(delico);
				dellink.href = "javascript:void(0);";
				var koords = allDivs.snapshotItem(1).childNodes[1].innerHTML;
				dellink.addEventListener("click", function(event) { evalres(koords, 'del_res');return false; }, false); 
				td2.appendChild(document.createTextNode(" "));
				td2.appendChild(dellink);
			}
			tr.appendChild(td1);
			tr.appendChild(td2);

			thisDiv.parentNode.insertBefore(tr, allDivs.snapshotItem(allDivs.snapshotLength));
			if(village['comment'])
			{
				var tr2 = document.createElement('tr');
				var td11 = document.createElement('td');
				td11.innerHTML = lang['comment']+':';
				
				var td21 = document.createElement('td');
				td21.innerHTML = village['comment'];
				tr2.appendChild(td11);
				tr2.appendChild(td21);
				thisDiv.parentNode.insertBefore(tr2, allDivs.snapshotItem(allDivs.snapshotLength));
			}
		} else if(village && !village['free'] && village['user'] == "") 
		{
			// Reservierungsthread und frei
			var tr4 = document.createElement('tr');
			var td1 = document.createElement('td');
			td1.innerHTML = lang['available']+':';
			var td2 = document.createElement('td');
			var a4 = document.createElement('a');
			var koor = allDivs.snapshotItem(1).innerHTML.match(/(\d{1,3}\|\d{1,3})/);
			a4.addEventListener("click", function(event) { evalres(RegExp.$1, 'add_res');return false; }, false); 
			a4.href = "javascript:void(0);";
			a4.innerHTML = lang['reserve'];
			td2.appendChild(a4);
			tr4.appendChild(td1);
			tr4.appendChild(td2);
			thisDiv.parentNode.insertBefore(tr4, allDivs.snapshotItem(allDivs.snapshotLength));
		
		} else if(!village) //&& village['free'] 
		{
			//Dorf frei
			var tr3 = document.createElement('tr');
			var td3 = document.createElement('td');
			var td31 = document.createElement('td');
			var a3 = document.createElement('a');
			var koor = allDivs.snapshotItem(1).innerHTML.match(/(\d{1,3}\|\d{1,3})/);
			a3.addEventListener("click", function(event) { evalres(RegExp.$1, 'add_res');return false; }, false); 
			a3.href = "javascript:void(0);";
			a3.innerHTML = lang['reserve'];
			td3.appendChild(a3);
			tr3.appendChild(td3);
			tr3.appendChild(td31);
			thisDiv.parentNode.insertBefore(tr3, allDivs.snapshotItem(allDivs.snapshotLength));
		}
	}
}


function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new opera.XMLHttpRequest();
	}
	catch (e)
	{
	 
	}
	return xmlHttp;
}

// Browserweiche zur unterscheidung von opera und firefox
function checkBrowserName(name)
{  
	var agent = navigator.userAgent.toLowerCase();  
	if (agent.indexOf(name.toLowerCase())>-1) {  
		return true;  
	}  
	return false;  
}