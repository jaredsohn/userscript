// ==UserScript==
// @name			DSaddNoticesInMap
// @author			Heinzel
// @namespace		none
// @description		Mit diesem Script ist es moeglich Notizen in den Info-Popups der Karte einzufuegen
// @include		http://de*.die-staemme.de/game.php*screen=map*
// @include		http://de*.die-staemme.de/game.php*screen=memo*
// ==/UserScript==



Array.prototype.contains = function(cont)
{
  for(var x = 0; x < this.length; x++)
  {
	if(this[x].split(":")[0] == cont)
	  return "\"" + x + "\"";
  }
  
  return false;
}

/* Mit dieser Funktion kann man einen Cookie setzen */
function setCookie(name, value, expire)
{
  if(!name || !value)
	return false;
  
  if(!expire)
	expire = "";
  else
	expire = "expires=" + expire + ";";
  
  document.cookie = name + "=" + value + ";" + expire;
  
  return true;
}

/* Mit dieser Funktion kann man einen Cookie auslesen */
function getCookie(name)
{
  var arr = [];
  var cookie = document.cookie;
  
  if(document.cookie.match(/;/))
  {
	var cooks = cookie.split("; ");
	for(var x = 0; x < cooks.length; x++)
	{
	  var cookie = cooks[x];
	  if(cookie.match(name + "="))
	  {
		var value = cookie.replace(name + "=", "");
		break;
	  } else {
		var value = false;
	  }
	}
  } else {
	if(cookie.match(name + "="))
	  arr.push(cookie.replace(name + "=", ""));
	else
	  arr = false;
  }
  
  return value;
}

/* Diese Funktion liefert den GMT-formatierten Wert zurück, der dem Datum vom aufrufen der Funtion plus ein Jahr entspricht */
function getExpires()
{
  var obj = new Date();
  time = obj.getTime();
  time += 1*365*24*60*60*1000;
  obj.setTime(time);
  return obj.toGMTString();
}

/* Diese Funktion liefert das Element zurück, das sich hinter der ID verbirgt */
function gid(id)
{
  return document.getElementById(id);
}

/* Diese Funktion fügt im Info-Popup der Dörfer auf der Karte eine extra Zeile ein, in die später die Notizen geschrieben werden */
function addExtraRow()
{
  var newTR = document.createElement("tr");
  var newTD = document.createElement("td");
  
  newTR.id = "info_notice_row";
  newTR.style.display = "none";
  
  newTD.innerHTML = "Notizen: ";
  newTR.appendChild(newTD.cloneNode(true));
  
  newTD.id = "info_notice";
  newTD.innerHTML = "";
  newTR.appendChild(newTD);
  
  gid("info_content").firstChild.nextSibling.insertBefore(newTR, gid("info_village_groups_row"));
}

/* Diese Funktion fügt in der Karte die Elemente ein, mit denen man Notizen setzen kann */
function addInputField()
{
  var tab 	 = document.evaluate('//form/table[@class="map_container"]/parent::*/parent::td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  var div0 	 = document.createElement("div");
  var h3   	 = document.createElement("h3");
  var div1 	 = document.createElement("div");
  var fld 	 = document.createElement("textarea");
  var span 	 = document.createElement("span");
  var div2 	 = document.createElement("div");
  var input	 = document.createElement("input");
  var button = document.createElement("button");
  var link 	 = document.createElement("a");
  
  tab.id = "tab";
  
  h3.innerHTML = "Notizen";
  
  fld.id = "href";
  fld.style.cssFloat = "left";
  fld.style.border = "2px solid red";
  fld.style.backgroundColor = "#457E2B";
  fld.style.color = "#457E2B";
  fld.cols = "1";
  fld.rows = "1";
  fld.addEventListener('mouseout', function()
  {
	var id = this.value.split("id=")
	id = id[id.length-1].replace(/\D+/g, "");
	
	this.value = id;
	
	if(GM_getValue("map_notices"))
	{
	  var cook = GM_getValue("map_notices").split(",");
	  if(cook.contains(id))
	  {
		gid("note").value = unescape(cook[cook.contains(id).replace(/"/g, "")].split(":")[1]);
		gid("note").select();
	  }
	}
  }, true);
  
  span.style.fontSize = "xx-small";
  span.innerHTML = "&nbsp;Hier rein <br>&nbsp;die Dorf- <br>&nbsp;grafik ziehen.";
  
  div1.appendChild(fld);
  div1.appendChild(span.cloneNode(true));
  
  input.id = "note";
  input.type = "text";
  input.style.marginTop = "0px";
  input.setAttribute("maxlength", "40");
  
  button.style.marginLeft = "2px";
  button.type = "button";
  button.innerHTML = "Setzen";
  button.addEventListener('click', function()
  {
	var href = gid("href").value;
	var note = escape(gid("note").value.replace(/"/g, "'"));
	
	if(!href)
	{  
	  window.alert("Bitte verschieben Sie eine Dorfgrafik in das Grüne Feld!");
	  return;
	}
	
	if(!note)
	{
	  window.alert("Bitte geben Sie eine Notiz an, die Sie setzen wollen!");
 	  return;
	}
	
	if(GM_getValue("map_notices"))
	  var cook = GM_getValue("map_notices").split(",");
	else
	  var cook = [];
	
	if(cook.contains(href))
	  cook[cook.contains(href).replace(/"/g, "")] = href + ":" + note;
	else
	  cook.push(href + ":" + note);
	
	cook = cook.join(",");
	GM_setValue("map_notices", cook);
	
	gid("href").value = "";
	gid("note").value = "";
	
	location.reload();
  }, true);
  
  span.innerHTML = "<br>&nbsp;Hier rein die Notiz.<br /><br />";
  
  link.innerHTML = "&raquo; l&ouml;schen";
  link.href = "javascript: gid('popup').style.display = 'inline'; stop();";
  link.className = true;
  link.id = "clicker";
  link.addEventListener('click', function()
  {
	if(eval(this.className) == false)
	  return;
	
	this.className = false;
	
	if(!GM_getValue("map_notices"))
	{
	  insertPopup(false);
	  return;
	}
	
	var cook = GM_getValue("map_notices").split(",");
	
	for(var x = 0; x < cook.length; x++)
	  insertPopup(cook[x].split(":")[0], cook[x].split(":")[1]);
  }, false);
  
  div2.style.marginTop = "15px";
  div2.appendChild(input);
  div2.appendChild(button);
  div2.appendChild(span);
  div2.appendChild(link);
  
  div0.style.padding = "10px";
  div0.appendChild(h3);
  div0.appendChild(div1);
  div0.appendChild(div2);
  
  tab.appendChild(div0);
}

/* Diese Funktion erzeugt das Popup, in dem die Notizen gelöscht werden können */
function addHiddenField()
{
  var tab = gid("tab");
  var div = document.createElement("div");
  div.id = "popup";
  div.style.borderWidth = "2px"; 
  div.style.borderStyle = "solid"; 
  div.style.borderColor = "#804000"; 
  div.style.backgroundColor = "#DED3B9"; 
  div.style.position = "absolute"; 
  div.style.display = "none"; 
  div.style.width = "200px";
  div.style.zIndex = "5";
  
  div.innerHTML = 	'<div>' + 
					'<table class = "blind" width = "100%" height = "15px">' + 
					'<tr>' + 
					'<td align = "right">' + 
					'<a href = "javascript: gid(\'popup\').style.display = \'none\'; gid(\'in_pop\').innerHTML = \'<tr><td><i>lade...</i></td></tr>\'; gid(\'clicker\').className = \'true\'; stop();">Schließen</a>' + 
					'</td>' + 
					'</tr>' + 
					'</table>' + 
					'</div>' + 
					'<div style = "overflow: auto; background-color: #F1EDE1;">' + 
					'<table id = "in_pop">' + 
					'<tr><td><i>lade...</i></td></tr>' + 
					'</table>' + 
					'</div>' + 
					'<div>' + 
					'<table class = "blind" width = "100%" height = "15px">' + 
					'<tr>' + 
					'<td align = "right" id = "setIn">' + 
					'</td>' + 
					'</tr>' + 
					'</table>' + 
					'</div>';
  
  tab.appendChild(div);
  
  var link = document.createElement("a");
  link.href = "javascript: // do nothing";
  link.innerHTML = "&raquo; Alle l&ouml;schen";
  link.addEventListener('click', function()
  {
	if(window.confirm('Sind Sie sicher, dass Sie alle Notizen löschen wollen?'))
	{
	  GM_setValue('map_notices', false); 
	  location.reload();
	}
  }, false);
  gid('setIn').appendChild(link);
}

/* Fügt eine neue Spalte in das Löschen-Popup ein */
function insertPopup(id,note)
{
  var pop = gid('in_pop');
  
  if(!id)
  {
	pop.innerHTML = "<i>Keine Notizen vorhanden!</i>";
	return;
  }
  
  if(pop.innerHTML.match(/lade.../))
	pop.innerHTML = "";
  
  var newTr = document.createElement("tr");
  var newTd = document.createElement("td");
  
  var img = document.createElement("img");
	img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKhSURBVHjaYvz//z8DLnDw4I3/d97/YPj08z+DgIAQA8PPnwyCjJ8YAnxNGGFqAAKIEZcB23Zc/a+hJ8vALcbH8PQvA8P7bwwMXKwMDPfufGN4fOgQg7ejNIOuri4jQACxYNN88eKT/7zK0gxKUnwMr38wMHz6ysDw4TMDwxegaklFLgYWZhuG1asXg5T+BwggrC7YtOf2fxlrVQauPwwMjz4yMLDxMTAwAzWzAvHffwwMTEAtexfsYpDles4AEEBYXfCVhZvhD1DRoy9AjTwMDHxAA7iA4iDFQN8w/AQSAmLCDLfOHWQACCAmbAaAbAGBj9+BtrMxMHAC2UAzGASBmB+IOZgh4h8/fmQACCCsBrB+ec/wE+h8dnagrSCnA8XYoZoFQCEPxB9evQSrBQggrAYIcf5keHLjAwM/0Np//yDO/gN1PgdIwbsvDBf37Wfg5+dnAAggDAN+XVn4n4/zA8OjQ3sYXt79xMAINOAnEAMjgeEJED/88I1hwaRlDExMLxjU1dUZAAIIJRB/nez6z/rhNAP7FaCjf+kwnFn2gOGuiiGDgLgQgwQQf337keHYjo0Mn97fZDAzM2OIi4tjBAggeDT+OtHxn/XjWYYbpz8yXPxuynCLSYbh9YdrDBISEgxfvnxh+Pz5M9A7/4AxwsegqanJEB8fD06NAAEEdsGvywv/s306y3Dr7AegZjOGpzyGDDevbGawtjZnyMrKYmTAAwACiOnXve3/2Z5tZrh15gPDua8QzacurAPaokpQMwgABBDL6bPnGKTvvWM4/8mY4Sk/RLO2tgZDTU0NQc0gABBALHe/yzIcfWfMwCpoynAaqrmuro4ozSAAEEDgQFy4cOH/q1evMoiKijKUlpbCNT99+pRZWlr6Lz4DAAIMACr56PvHpS8oAAAAAElFTkSuQmCC";
	img.title = "Dorfübersicht";
  var link = document.createElement("a");
	link.href = location.href.split("screen=")[0] + "screen=info_village&id=" + id;
	link.appendChild(img.cloneNode(true));
  
  newTd.appendChild(link.cloneNode(true));
  newTd.style.width = "25px";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "<i>" + unescape(note) + "</i>";
  
  newTd.style.width = "150px";
  newTr.appendChild(newTd.cloneNode(true));
  newTd.innerHTML = "";
  
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsPAAALDwGS+QOlAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABzUlEQVR42mL8//8/AyUAIICYGCgEAAFEsQEAAUSxAQABRLEBAAHEiMy5yqwV8JPpr8FPpj8MQPzhF+PfBW7fnnyAyWMLcIAAAqNbjLoGDywizn/omPr/k7z6/w9MHP+fsXD/P8Yp+H8Vn3ABsgHoGCCAGG4y6So8T6x+///Uqf//29v//2dn//+fgwNCs7L+P8bD/X+OMHcBLgMAAojpnxhfvUiwjQDD7t0MDAcPMjAICzMwCApCsIAAgyUrG4MQ49/+bnEmAWyuBwggFk5jtQSWm9cYGL5/Z2AQF2dgcHGBuZeB4d8/BoaHDxlU719nuPX3RwJQdAK6AQABxMLy7S0Dg4MDA4OREc6Q5lNXZGD49BarCwACiOnTvXsMry9exB1PX74wMPDw4JQGCCCWl18/PdBcu1aBYds2BgY2NgYGFhYGBkZGiPN//2Zg+PmT4fH/nyC1F7AZABBATG9+fZt4+dVrBgZ+fkTgIeGPbMwMZ988ulDxgmEDNgMAAogp9NObCafuXl1w+v4NcKiDNQoJgelH3z4wrDiz68P33z8TcXkBIIDgKbFPnLmAW1AwX0ZGUYGfX4jh1q3LDK9eP1sAlGoE2v4AV0oECDAAPCG6XlOAvkAAAAAASUVORK5CYII=";
  img.title = "Löschen";
  link.href = "";
  link.name = id;
  link.addEventListener('click', function()
  {
	var cook = GM_getValue("map_notices").split(",");
	for(var x = 0; x < cook.length; x++)
	{
	  var aktID = cook[x].split(":")[0];
	  if(aktID == this.name)
	  {
		cook.splice(x, 1);
		cook = cook.join(",");
		GM_setValue("map_notices", cook);
		return;
	  }
	}
  }, false);
  
  link.innerHTML = "";
  link.appendChild(img);
  
  newTd.appendChild(link);
  newTd.style.width = "25px";
  newTr.appendChild(newTd);
  
  pop.appendChild(newTr);
}

/* Fügt 2 Links auf der Notizenseite ein, mit denen man die Kartennotizen ex/importieren kann */
function insertNoticeTranmission()
{
  var h2 = document.getElementsByTagName("h2")[0];
  
  var divLinks = document.createElement("div");
  var linkIm = document.createElement("a");
  var linkEx = document.createElement("a");
  
  divLinks.innerHTML = "Kartennotizen ";
  divLinks.id = "link_container";
  
  linkEx.innerHTML = "exportieren";
  linkEx.href = "javascript: var cook = '" + GM_getValue('map_notices') + "'; (" + function()
  {
    if(cook == "false")
	{
	  window.alert("Es sind keine Notizen vorhanden!");
	  return;
	}
	
	gid('link_container').style.display = 'none'; 
	gid('export_Field').removeAttribute('style');
  } + ")();";
  
  divLinks.appendChild(linkEx);
  divLinks.innerHTML += "/";
  
  linkIm.innerHTML = "importieren";
  linkIm.href = "javascript: (" + function()
  {
	gid('link_container').style.display = 'none';
	gid('import_Field').removeAttribute('style'); 
	gid('note_field_import').select();
  } + ")();";
  
  divLinks.appendChild(linkIm);
  h2.parentNode.insertBefore(divLinks, h2);
  
  
  var divImport = document.createElement("div");
  var inputIm = document.createElement("input");
  var buttonIm = document.createElement("button");
  
  divImport.innerHTML = "Notizen einf&uuml;gen: ";
  divImport.id = "import_Field";
  divImport.style.display = "none";
  
  inputIm.type = "text";
  inputIm.id = "note_field_import";
  
  divImport.appendChild(inputIm);
  
  buttonIm.type = "button";
  buttonIm.innerHTML = "Setzen";
  buttonIm.addEventListener('click', function()
  {
	var value = gid('note_field_import').value;
	
	if(!value)
	{
	  window.alert('Du musst schon nen String zum setzen einfügen!');
	  return;
	}
	
	if(!window.confirm('Sind Sie sicher, dass Sie folgende Notizen setzten wollen? \n\"' + value + '\"'))
	  return;
	
	if(GM_getValue("map_notices"))
	{
	  var cook = GM_getValue("map_notices");
	  cook = (cook.match(/,/)) ? cook.split(",") : [cook];
	  var settings = (value.match(/,/)) ? value.split(",") : [value];
	  
	  for(var x = 0; x < settings.length; x++)
	  {
		var id = settings[x].split(":")[0];
		if(cook.contains(id))
		{
		  cook[cook.contains(id).replace(/"/g, "")] = id + ":" + cook[cook.contains(id).replace(/"/g, "")].split(":")[1] + " Importiert%3A " + settings[x].split(":")[1];
		} else {
		  cook.push(settings[x])
		}
	  }
	} else {
	  cook = value;
	}
	
	GM_setValue('map_notices', cook.toString(","));
	location.reload();
  }, false);
  
  divImport.appendChild(buttonIm);
  h2.parentNode.insertBefore(divImport, h2);
  
  
  var divExport = document.createElement("div");
  var buttonEx = document.createElement("button");
  var hidden = document.createElement("input");
  var imgEx = document.createElement("img");
  
  imgEx.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKhSURBVHjaYvz//z8DLnDw4I3/d97/YPj08z+DgIAQA8PPnwyCjJ8YAnxNGGFqAAKIEZcB23Zc/a+hJ8vALcbH8PQvA8P7bwwMXKwMDPfufGN4fOgQg7ejNIOuri4jQACxYNN88eKT/7zK0gxKUnwMr38wMHz6ysDw4TMDwxegaklFLgYWZhuG1asXg5T+BwggrC7YtOf2fxlrVQauPwwMjz4yMLDxMTAwAzWzAvHffwwMTEAtexfsYpDles4AEEBYXfCVhZvhD1DRoy9AjTwMDHxAA7iA4iDFQN8w/AQSAmLCDLfOHWQACCAmbAaAbAGBj9+BtrMxMHAC2UAzGASBmB+IOZgh4h8/fmQACCCsBrB+ec/wE+h8dnagrSCnA8XYoZoFQCEPxB9evQSrBQggrAYIcf5keHLjAwM/0Np//yDO/gN1PgdIwbsvDBf37Wfg5+dnAAggDAN+XVn4n4/zA8OjQ3sYXt79xMAINOAnEAMjgeEJED/88I1hwaRlDExMLxjU1dUZAAIIJRB/nez6z/rhNAP7FaCjf+kwnFn2gOGuiiGDgLgQgwQQf337keHYjo0Mn97fZDAzM2OIi4tjBAggeDT+OtHxn/XjWYYbpz8yXPxuynCLSYbh9YdrDBISEgxfvnxh+Pz5M9A7/4AxwsegqanJEB8fD06NAAEEdsGvywv/s306y3Dr7AegZjOGpzyGDDevbGawtjZnyMrKYmTAAwACiOnXve3/2Z5tZrh15gPDua8QzacurAPaokpQMwgABBDL6bPnGKTvvWM4/8mY4Sk/RLO2tgZDTU0NQc0gABBALHe/yzIcfWfMwCpoynAaqrmuro4ozSAAEEDgQFy4cOH/q1evMoiKijKUlpbCNT99+pRZWlr6Lz4DAAIMACr56PvHpS8oAAAAAElFTkSuQmCC";
  imgEx.title = "Dorfübersicht";
  
  divExport.innerHTML = "Welche Notizen wollen Sie exportieren? <br /><br />";
  divExport.id = "export_Field";
  divExport.style.display = "none";
  
  var cook = GM_getValue("map_notices");
  if(!cook)
	return;
  
  cook = (cook.match(/,/)) ? cook.split(",") : [cook];
  
  for(var x = 0, len = cook.length; x < len; x++)
  {
	var inputEx = document.createElement("input");
	var labelEx = document.createElement("label");
	var linkEx = document.createElement("a");
	
	inputEx.type = "checkbox";
	inputEx.id = "note_field_export_" + x;
	inputEx.setAttribute('checked', true);
	
	labelEx.setAttribute("for", "note_field_export_" + x);
	labelEx.innerHTML = "&nbsp;<i>" + unescape(cook[x].split(":")[1]) + "</i>";
	
	linkEx.appendChild(imgEx);
	linkEx.href = location.href.split("screen=")[0] + "screen=info_village&id=" + cook[x].split(":")[0];
	
	divExport.appendChild(inputEx);
	divExport.appendChild(labelEx);
	divExport.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	divExport.appendChild(linkEx);
	divExport.innerHTML += "<br />";
  }
  
  hidden.type = "hidden";
  hidden.id = "LenContainer";
  hidden.value = len;
  divExport.appendChild(hidden);
  
  buttonEx.type = "button";
  buttonEx.innerHTML = "String ausgeben";
  buttonEx.setAttribute("onclick", "var cook = '" + GM_getValue('map_notices') + "'; (" + function()
  {
	var len = gid('LenContainer').value;
	var arr = [];
	cook = (cook.match(/,/)) ? cook.split(",") : [cook];
	
	for(var x = 0; x < len; x++)
	{
	  var check = gid('note_field_export_' + x);
	  
	  if(check.checked)
		arr.push(cook[x]);
	}
	
	arr = arr.join();
	
	if(!arr)
	{
	  window.alert("Sie haben keine Notizen ausgewählt!");
	  return;
	}
	
	gid('export_container').value = arr;
	gid('export_container').select();
  } + ")()");
  
  divExport.innerHTML += "<br />";
  divExport.appendChild(buttonEx);
  
  inputEx.type = "text";
  inputEx.id = "export_container";
  inputEx.value = "";
  inputEx.size = "40";
  
  divExport.innerHTML += "<br /><br /><br />"
  divExport.appendChild(inputEx);
  divExport.innerHTML += "<br /><br />";
  
  
  h2.parentNode.insertBefore(divExport, h2);
}

function main()
{
  if(location.href.match(/screen=memo/))
  {
	insertNoticeTranmission();
	return;
  }
  
  addExtraRow();
  addInputField();
  addHiddenField();
  
  if(!GM_getValue("map_notices"))
	return;
  
  var cook = GM_getValue("map_notices").split(",");
  var ids = [], notes = [];
  
  for(var x = 0; x < cook.length; x++)
  {
	ids.push(cook[x].split(":")[0]);
	notes.push(cook[x].split(":")[1]);
  }
  
  var links = gid("mapOld").getElementsByTagName("a");
  
  for(var x = 0; x < links.length; x++)
  {
	var id = links[x].href.match(/id=(\d+)/)[1]
	
	for(var y = 0; y < ids.length; y++)
	{
	  if(ids[y] == id)
	  {
		links[x].setAttribute('onmouseover', 'gid("info_notice").innerHTML = "' + unescape(notes[y]) + '"; gid("info_notice_row").removeAttribute("style");');
		links[x].setAttribute('onmouseout', 'gid("info_notice").innerHTML = ""; gid("info_notice_row").style.display = "none";');
	  }
	}
  }
}

main();