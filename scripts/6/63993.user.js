// ==UserScript==
// @name           DS Gruppenzugehoerigkeit
// @namespace      http://forum.die-staemme.de/showthread.php?t=107720
// @description    DS Gruppenzugehörigkeit v1.4.6 - Gruppezueghörigkeit - Groepsverbanden - Zeigt im Browsergame "Die Stämme" die gespeicherte Gruppenzugehörigkeit in Gebäuden und Übersichten an.
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include 	     http://*.tribalwars.nl/*
// ==/UserScript==

var grpRow=2; //Anpassung für Aktualisierung über die Gruppenübersicht bei zusätzlichen Scripten die eventuell vor Gruppenzugehoerigkeit laufen müssen / Standard = 2
var viewGroup = false; //(true/false) Ausgabe der Gruppe auf den Übersichten Kombiniert, Produktion, Truppen, Gebäude, Forschung 
var viewTitleGroup = true; //(true/false) Ausgabe der Gruppe als Title auf den Übersichten Kombiniert, Produktion, Truppen, Gebäude, Forschung 
var viewNeighbor = false; //(true/false) Ausgabe der Gruppe auf dem Versammlungsplatz / Nachbardörfer 
var viewTitleNeighbor  = true; //(true/false) Ausgabe der Gruppe als Title auf den Versammlungsplatz / Nachbardörfer
var viewGroupName = false; //Ausgabe der Gruppe mit Minuszeichen - im Dorflink
var version_nr = '1.4.6';
//DE
if(location.href.match(/die-staemme.de/)) {
	var version = "DS - Gruppenzugehörigkeit " + version_nr;
	var msg_01 = 'Gruppenzugehörigkeiten aktualisieren';
	var msg_02 = 'Gruppenzugehörigkeit wurde aktualisiert!';
	var msg_03 = 'Fehler! Anzahl der Array sind ungleich';
	var msg_04 = 'Gruppenzugehörigkeit wurde gespeichert!';
	var msg_05 = 'nicht zugeordnet';
	var msg_06 = 'Gruppenzugehörigkeit';
	var msg_07 = 'aktualisieren';
	var msg_08 = 'Hauptgebäude|Kaserne|Stall|Werkstatt|Adelshof|Schmiede|Versammlungsplatz|Marktplatz|Statue|Rekrutieren';
	var msg_09 = 'bearbeiten';
	var msg_10 = 'Gruppen';
	var msg_11 = 'Dorf';
}
//CH
if(location.href.match(/staemme.ch/)) {
	var version = "DS - Gruppezueghörigkeit " + version_nr;
	var msg_01 = 'Gruppezueghörigkeit aktualisiere';
	var msg_02 = 'Gruppezueghörigkeit isch aktualisiert worde!';
	var msg_03 = 'Fähler! Azau Array isch unglich';
	var msg_04 = 'Gruppezueghörigkeit isch gspicheret worde!';
	var msg_05 = 'nid zuegordnet';
	var msg_06 = 'Gruppezueghörigkeit';
	var msg_07 = 'aktualisiere';
	var msg_08 = 'Houptgeböide|Kasärne|Stau|Wärkstatt|Adushof|Schmied|Vrsammligsplatz|Marktplatz|Statue|Rekrutiere';
	var msg_09 = 'bearbeiten';
	var msg_10 = 'Gruppe';
	var msg_11 = 'Dorf';
}
//NL
if(location.href.match(/tribalwars.nl/)) {
	var version = "DS - Groepsverbanden " + version_nr;
	var msg_01 = 'Groepsverbanden update!';
	var msg_02 = 'Groepsverbanden zijn geupdate!';
	var msg_03 = 'Fout! Aantal array zijn niet gelijk';
	var msg_04 = 'Groepsverbanden zijn opgeslagen!';
	var msg_05 = 'Niet toegewezen';
	var msg_06 = 'Groepsverbanden';
	var msg_07 = 'update';
	var msg_08 = 'Hoofdgebouw|Kazerne|Stal|Werkplaats|Adelshoeve|Sme derij|Verzamelplaats|Marktplaats|Standbeeld|Recruitment';
	var msg_09 = 'bewerk';
	var msg_10 = 'Groepen';
	var msg_11 = 'Dorp';
}
//Unterschiedliche Welten
var DsWelt=location.href.split('/')[2].split('.')[0];
//Variable mit Prefix
var GmVarName=DsWelt + ':gz:';
//GET variablen auslesen
(function(){
	var s = window.location.search.substring(1).split('&');
	if(!s.length) return;
	window.$_GET = {};
	for(var i  = 0; i < s.length; i++) {
		var parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
}())
function htmlspecialchars_decode (string, quote_style) {
    // Convert special HTML entities back to characters  
    var optTemp = 0, i = 0, noquotes= false;
    if (typeof quote_style === 'undefined') {
        quote_style = 2;    }
    string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE' : 1,        'ENT_HTML_QUOTE_DOUBLE' : 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE' : 4,
    };    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);        for (i=0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            }            else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
        // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
    }    if (!noquotes) {
        string = string.replace(/&quot;/g, '"');
    }
    // Put this in last place to avoid escape being double-decoded
    string = string.replace(/&amp;/g, '&'); 
    return string;
}
//Array für ID overview
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}
overview = new Array("combined", "prod", "units", "buildings", "tech");
if (viewNeighbor==true) {
  //Gruppen für Nachbardörfer 
  if (location.href.match(/screen=place&mode=neighbor/)) {
  	var searchNeighborTable = document.getElementsByTagName("table");
  	for(var s = 0; s < searchNeighborTable.length; s++)
  	{
  	  if ((searchNeighborTable[s].className=="vis") && (searchNeighborTable[s].innerHTML.match("<th>"+msg_11+"</th>"))) {
  	    var searchNeighborTR = searchNeighborTable[s].getElementsByTagName("tr");
      	for(var t = 0; t < searchNeighborTR.length; t++) {
      	  if (searchNeighborTR[t].getElementsByTagName("td").length!=0) {
      	    var searchNeighborA = searchNeighborTR[t].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
      	    var VillageNeighborID = searchNeighborA.href.split("village=")[1].split("&")[0];
      		  var divNeighbor = document.createElement("div");
      		  if (typeof GM_getValue(GmVarName + VillageNeighborID)!='undefined') {
        		  var villageGroups=GM_getValue(GmVarName + VillageNeighborID).split("<a href=");
              divNeighbor.innerHTML = villageGroups[0];
        			searchNeighborA.parentNode.insertBefore(divNeighbor, searchNeighborA.nextSibling);            
            }
          }
        }	    
      }
    }
  }
}
if (viewTitleNeighbor==true) {
  //Gruppen für Nachbardörfer 
  if (location.href.match(/screen=place&mode=neighbor/)) {
  	var searchNeighborTable = document.getElementsByTagName("table");
  	for(var s = 0; s < searchNeighborTable.length; s++)
  	{
  	  if ((searchNeighborTable[s].className=="vis") && (searchNeighborTable[s].innerHTML.match("<th>"+msg_11+"</th>"))) {
  	    var searchNeighborTR = searchNeighborTable[s].getElementsByTagName("tr");
      	for(var t = 0; t < searchNeighborTR.length; t++) {
      	  if (searchNeighborTR[t].getElementsByTagName("td").length!=0) {
      	    var searchNeighborA = searchNeighborTR[t].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
            var VillageNeighborID = searchNeighborA.href.split("village=")[1].split("&")[0];
            var titleNeighbor = document.createAttribute("title");
            if (typeof GM_getValue(GmVarName + VillageNeighborID)!='undefined') {
              titleNeighbor.nodeValue = htmlspecialchars_decode(GM_getValue(GmVarName + VillageNeighborID).split("<a")[0].replace('&nbsp;&nbsp;',' '),'ENT_NOQUOTES');
              searchNeighborA.setAttributeNode(titleNeighbor);
            }   		  
          }
        }	    
      }
    }
  }
}
if (viewGroupName==true) {
  //Ausgabe einer Gruppe im Dorflink 
  if (location.href.match(/screen=overview_villages/) && in_array(document.getElementById('overview').value,overview))
  {
  	var searchSpanLableText = document.getElementsByTagName("a");
  	for(var sn = 0; sn < searchSpanLableText.length; sn++)
  	{ 
  		if (searchSpanLableText[sn].innerHTML.match('<span id="label_text_')) {
  		  var aktVillageID = searchSpanLableText[sn].href.split('village=')[1].split('&')[0];
  		  if (typeof GM_getValue(GmVarName + aktVillageID)!='undefined') {
    		  var span = document.createElement("span");
    		  var spanOutput = GM_getValue(GmVarName + aktVillageID).split('<a')[0];
    		  var groups = spanOutput.split('; ');
          var groupOutput = '';
        	for(var sg = 0; sg < groups.length; sg++)
        	{          
    		    if (groups[sg][0]=='-') groupOutput=groups[sg];
    		  }
    		  span.innerHTML = groupOutput;
          //searchSpanLableText[sn].parentNode.insertBefore(span, searchSpanLableText[sn]);
          searchSpanLableText[sn].appendChild(span);
        }
  		}		
  	}
  }
}
if (viewGroup==true) {
  //Gruppen für die Übersichten
  if (location.href.match(/screen=overview_villages/) && in_array(document.getElementById('overview').value,overview))
  {
  	var searchSpan = document.getElementsByTagName("span");
  	for(var s = 0; s < searchSpan.length; s++)
  	{
  		if (searchSpan[s].innerHTML.match('<span id="label_')) {
  		  var aktVillageID = searchSpan[s].getAttribute('id').replace("label_","");
  		  var div = document.createElement("div");
  		  if (typeof GM_getValue(GmVarName + aktVillageID)!='undefined') {
          div.innerHTML = GM_getValue(GmVarName + aktVillageID).split("<a")[0];
  			  searchSpan[s].parentNode.insertBefore(div, searchSpan[s].nextSibling);
  			}
  		}		
  	}
  }
}
if (viewTitleGroup==true) {
  //Gruppen für den Title
  if (location.href.match(/screen=overview_villages/) && in_array(document.getElementById('overview').value,overview))
  {
  	var searchSpan = document.getElementsByTagName("span");
  	for(var s = 0; s < searchSpan.length; s++)
  	{
  		if (searchSpan[s].innerHTML.match('<span id="label_')) {
  		  var aktVillageID = searchSpan[s].getAttribute('id').replace("label_","");
        var titleGroup = document.createAttribute("title");
        if (typeof GM_getValue(GmVarName + aktVillageID)!='undefined') {
          titleGroup.nodeValue = htmlspecialchars_decode(GM_getValue(GmVarName + aktVillageID).split("<a")[0].replace('&nbsp;&nbsp;',' '),'ENT_NOQUOTES');
          var groupElement = document.getElementById("label_"+aktVillageID);
          groupElement.setAttributeNode(titleGroup);
        }
  		}		
  	}
  }
}
//Alle Gruppen aktualisieren Übersichten/Gruppen
if(location.href.match(/screen=overview_villages/) && (document.getElementById('overview').value=='groups'))
{
	var UpdVillage = new Array();
	var UpdGroup = new Array();
	var countUpd=0;
	var TDrow=grpRow;
	var SearchVillage = document.getElementsByTagName("th");
	for(var y = 0; y < SearchVillage.length; y++)
	{
		if(SearchVillage[y].innerHTML.match(msg_11))
		{
			for(var j = 0; j < SearchVillage[y].parentNode.parentNode.getElementsByTagName("td").length; j++)
			{
				if(SearchVillage[y].parentNode.parentNode.getElementsByTagName("td")[j].innerHTML.match(/span id="label_/)) 
        {
					UpdVillage[countUpd] = SearchVillage[y].parentNode.parentNode.getElementsByTagName("td")[j].innerHTML.substr(18).split('"')[0];
				}
				if (j==TDrow)
				{
					UpdGroup[countUpd]= SearchVillage[y].parentNode.parentNode.getElementsByTagName("td")[j].innerHTML;
					TDrow=TDrow+4;
					countUpd++;
				}
			}
		}
	}
	if (UpdVillage.length==UpdGroup.length) 
	{
  	if (UpdVillage.length>0) {
  		for (var u = 0; u < UpdVillage.length; u++) 
  		{	
  			GM_deleteValue(GmVarName + UpdVillage[u]);
  			GM_setValue(GmVarName + UpdVillage[u], UpdGroup[u] + '&nbsp;&nbsp;<a href="javascript:popup_scroll(\'groups.php?&amp;mode=village&amp;village_id=' + UpdVillage[u] + '\', 300, 400);">» ' + msg_09 + '</a>');
      }
    	var gzDiv = document.createElement("div");		
    	gzDiv.setAttribute("style", "margin: -2px 0px 0px 1px;padding: 2px 7px 2px 0px;width:99%;background-color:#F7EED3", false);
      gzDiv.innerHTML = "<b>" + msg_02 + "</b>";
    	var insertBeforTable = document.getElementsByTagName("table");
    	for(var t = 0; t < insertBeforTable.length; t++)
    	{
    		if (insertBeforTable[t].innerHTML.match(msg_10)) {
    			insertBeforTable[t].parentNode.insertBefore(gzDiv, insertBeforTable[t]);
    		}
    	}	
  	}	
	}
}
//Gruppenzugehörigkeit einzeln aktualisieren / speichern über Dorfübersicht
if(location.href.match(/village=(.*)screen=overview/) && !location.href.match(/village=(.*)screen=overview_villages/)) {
	var imgs = document.getElementsByTagName("img");
	for(var x = 0; x < imgs.length; x++)
	{
		if(imgs[x].src.match(/villages\.png/) && imgs[x].parentNode.href.match(/village_id=/))
		{
		  var villageID = imgs[x].parentNode.href.split("#")[0].split("village_id=")[1].split("&")[0];
		  break;
		}
	}
	if (typeof villageID!='undefined') {
		var SearchGroup = document.getElementsByTagName("th");
		for(var x = 0; x < SearchGroup.length; x++)
		{
			if(SearchGroup[x].innerHTML.match(msg_06))
			{
				for(var i = 0; i < SearchGroup[x].parentNode.parentNode.getElementsByTagName("td").length; i++)
				{										
					if ((villageGroup!=undefined) && (i==SearchGroup[x].parentNode.parentNode.getElementsByTagName("td").length-1))
					{
						villageGroup = villageGroup + '&nbsp;&nbsp;' + SearchGroup[x].parentNode.parentNode.getElementsByTagName("td")[i].innerHTML;
					}
					if ((villageGroup!=undefined) && (i<SearchGroup[x].parentNode.parentNode.getElementsByTagName("td").length-1))
					{
						villageGroup = villageGroup + '; ' + SearchGroup[x].parentNode.parentNode.getElementsByTagName("td")[i].innerHTML;
					}
					if (villageGroup==undefined) var villageGroup = SearchGroup[x].parentNode.parentNode.getElementsByTagName("td")[i].innerHTML;					
				}
			  break;
			}
		}
		if (typeof SearchGroup[x]!='undefined') {
  		if(SearchGroup[x].innerHTML.match(msg_06)) {
  			if (villageGroup) {
  				if (villageGroup.split(";").length==4) villageGroup='<span style="font-style: italic;" class="grey">' + msg_05 + '</span>&nbsp;&nbsp;' + villageGroup;
          GM_deleteValue(GmVarName + $_GET['village']);
          GM_setValue(GmVarName + villageID, villageGroup);
  			}	
  			if(location.href.match(/akt=group/) && (villageGroup)) SearchGroup[x].innerHTML="<b>" + msg_02 + "</b>";	  
  			else SearchGroup[x].innerHTML="<b>" + msg_04 + "</b>";		
  		}    
    } else {
      if (typeof GM_getValue(GmVarName + $_GET['village'])!='undefined') GM_deleteValue(GmVarName + $_GET['village']);    
    }		
	}
}
//Ausgabe der Gruppenübersicht
if(location.href.match(/screen=church|screen=main|screen=barracks|screen=stable|screen=garage|screen=snob|screen=smith|screen=place|screen=market|screen=statue|screen=train/))
{
  var h2s = document.getElementsByTagName("h2");
  for(var x = 0; x < h2s.length; x++) {
  	if(h2s[x].innerHTML.match(msg_08))
  	{
  	  var h2 = h2s[x];
  	  break;
  	}
  }
  if(!h2)
	return;
	if(!villageID) {
		var imgs = document.getElementsByTagName("img");
		for(var x = 0; x < imgs.length; x++)
		{
			if(imgs[x].src.match(/villages\.png/) && imgs[x].parentNode.href.match(/village_id=/))
			{
			  var villageID = imgs[x].parentNode.href.split("#")[0].split("village_id=")[1].split("&")[0];
			  break;
			}
		}
	} 
	if ((typeof GM_getValue(GmVarName + villageID)!='undefined') && (typeof villageID!='undefined')) {
  	var group = GM_getValue(GmVarName + villageID);
  	if (group!=undefined) {
  		var span = document.createElement("span");
  		var aktLink = location.href.split('?');
  		span.innerHTML = "<b title=\"" + version + "\">" + msg_06 + ":</b> " + group + "&nbsp;&nbsp;<a title=\"" + version + "\"href=\"" + aktLink[0] + "?village=" + villageID + "&screen=overview\">&raquo; " + msg_07 + "</a><br /><br />";
  		h2.parentNode.insertBefore(span, h2.nextSibling);
  	}
  }
}