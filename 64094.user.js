// ==UserScript==
// @name           DS Nachbardoerfer
// @namespace      http://forum.die-staemme.de/showthread.php?t=123594
// @description    DS Nachbardörfer v1.4 - Zeigt im Browsergame "Die Stämme" in der Übersicht Versammlungsplatz/Nachbardörfer die aktuell eingelesenen Rohstoff, Transportmengen und Truppen an. 
// @include        http://*.die-staemme.de/*
// ==/UserScript==

var viewConfig='none'; // (none/block)
var fontSize='0.9em';
var imgSize='13px';
var marginTop='5px';
function strip_tags (str, allowed_tags) {
    // Strips HTML and PHP tags from a string
    // version: 909.322
    // discuss at: http://phpjs.org/functions/strip_tags    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    var key = '', allowed = false;
    var matches = [];    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = ''; 
    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };
     // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }
     str += '';
    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);
     // Go through all HTML tags
    for (key in matches) {
        if (isNaN(key)) {
            // IE7 Hack
            continue;        }
        // Save HTML tag
        html = matches[key].toString();
         // Is tag not in allowed list? Remove from str!
        allowed = false;
        // Go through all allowed tags
        for (k in allowed_array) {            // Init
            allowed_tag = allowed_array[k];
            i = -1;
            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
            if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}
            // Determine
            if (i == 0) {                allowed = true;
                break;
            }
        }
         if (!allowed) {
            str = replacer(html, "", str); // Custom replace. No regexing
        }
    }
     return str;
}
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

if(location.href.match(/screen=place&mode=neighbor/)) {
  if (viewConfig=='none') viewContent = '<a href="#" id="rohstoffe" onclick="ShowAndHide(\'rohstoffe\');">Rohstoffe anzeigen</a>&nbsp;&nbsp;&nbsp;<a href="#" id="truppen" onclick="ShowAndHide(\'truppen\');">Truppen anzeigen</a>';
  if (viewConfig=='block') viewContent = '<a href="#" id="rohstoffe" onclick="ShowAndHide(\'rohstoffe\');">Rohstoffe ausblenden</a>&nbsp;&nbsp;&nbsp;<a href="#" id="truppen" onclick="ShowAndHide(\'truppen\');">Truppen ausblenden</a>';
  var h3s = document.getElementsByTagName("h3")[0];
	var h3div = document.createElement("div");
	h3div.innerHTML = '<script type=text/javascript>' + 
  eval(
    function ShowAndHide(nameStr) { 
      if (nameStr=='rohstoffe') {
        for(var rx = 0; rx < document.getElementsByName("rohstoffe").length; rx++) {
          if (document.getElementsByName("rohstoffe")[rx].style.display == 'none') {
            document.getElementsByName("rohstoffe")[rx].style.display='block';
            document.getElementById("rohstoffe").innerHTML='Rohstoffe ausblenden';
          } else {
            document.getElementsByName("rohstoffe")[rx].style.display='none';
            document.getElementById("rohstoffe").innerHTML='Rohstoffe anzeigen';
          }
        }
      } 
      if (nameStr=='truppen') {
        for(var tx = 0; tx < document.getElementsByName("truppen").length; tx++) {
          if (document.getElementsByName("truppen")[tx].style.display == 'none') {
            document.getElementsByName("truppen")[tx].style.display='block';
            document.getElementById("truppen").innerHTML='Truppen ausblenden';
          } else {
            document.getElementsByName("truppen")[tx].style.display='none';
            document.getElementById("truppen").innerHTML='Truppen anzeigen';
          }
        }
      }
      return; 
    }
  ) + '</script>'+viewContent;
  h3s.parentNode.insertBefore(h3div, h3s.nextSibling);
}

//Unterschiedliche Welten
var DsWelt=location.href.split('/')[2].split('.')[0];
//Variable mit Prefix
var GmVarNameResi=DsWelt + ':rnd:';
var GmVarNameMarkt=DsWelt + ':mnd:';
var GmVarNameUnit=DsWelt + ':und:';
//VillageID auslesen
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
  //Grafiken
  var img_iron = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAMFBMVEXx691lYGC1q6vTx8V7d3eMg4NwbW2gmJhKRkY9OTlSUlJaUlJSSkpCQkL37u45MTEP1OXQAAAAAXRSTlMAQObYZgAAAJlJREFUeF51zKEOglAYBeDfTWew4MbQKPfiKBa4BpLzosMM2zV7DTqNTGagMobRWYgUkg9g5hGIPoZv4D814knfdnYO/E3v8EPnXs2/4JXnfZRfBqekQLRCSWJNRXXpxFQlRy2YtQ4eO5RL7dSKcDzMrrJeGhuAwD+WdB9hSZz+baaf8ZZNn1umj/CDmC9mjxWA9krUQnBozBsAzRvIjLgoPgAAAABJRU5ErkJggg==';
  var img_stone = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAJ1BMVEX3795wJgSMNwSNQyPIXhHjdRboeibQiVvMsqbjxKzizsVdIAPv5+cNP2mmAAAAAXRSTlMAQObYZgAAAIJJREFUeF6FzrEKglAUxvEPWlzPaWwTstnsEeTgA1xPL6C3xqQgLjgovoDQUluvEI136s1UhFZ/059v+rAg+NfNPZt5Olh76qf6SV6ken8D1T4t1WhZ4xqziazkZ1TxumAxckRL35C2VjOsyBNxpBcEn433xALgQSPeYdQliXs1C58GDXAadGc21xAAAAAASUVORK5CYII=';
  var img_wood = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAMFBMVEX37943IglJOhxgQRlyTh55WzWQbzSnejqce0qxhUzBnErQplIgFgmchGutjGPOpGeDw9rpAAAAAXRSTlMAQObYZgAAAIhJREFUeF6FzD0OgjAAR/G/TUwcZXewfs3qYpiN1YHBSEI0YSEEewFCoivcgA1HmOwRXEhcWTkAp+hKSQ/QN/2mB3MtjzS4TJztgIkIj9ZcYfz8BdbipOR6X//vplcQxl67VR5OQR75WbJspnTv7CK+NcDo4h9ERWsAS7r5lI0+r99BrUW8PUz15sYcAZRWSIQAAAAASUVORK5CYII=';
  var img_market = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRF////3dG3gUsNeUMGwqyKfEcLmG022cyw2cuvkGMrd0EGp4RWrY1jf0kKiFsqkWYxgk0OhlERXi4GxbGQnHpUjmIwpIFVt5x1d0ILybeboX5TvaJ5mnE9nHVFjV8plGgygV9qHgAAAAF0Uk5TAEDm2GYAAAC3SURBVHjaJE/bFsIgDEvLxW04LiJM0cH//6Ud5qVN2pyTAADpYVhtRRMmlhbPvPr8Necy+bprYBRAsxeFXNqedAmyvU7CwdqpRraQi3dtDgwnJ9WsryyPNYCz2Nqe+OLIO6IfYYRoNuPLCH1HEsHa9HgkKxgGcVoMc3R/y3gK31opVYlSLY7Xu6lKoZCMN39AX8OVUAaoxi7BsPQo0csVPa23WabymXvPZ3S3f12pH1NiO+v/BBgAxssLPv1EMKUAAAAASUVORK5CYII=';
  //Rohstoffe im Dorf auslesen
  var wood = document.getElementById('wood').innerHTML;
  var stone = document.getElementById('stone').innerHTML;
  var iron = document.getElementById('iron').innerHTML;
  if (typeof GM_getValue(GmVarNameResi + villageID)!='undefined') GM_deleteValue(GmVarNameResi + villageID);
  GM_setValue(GmVarNameResi + villageID,wood+','+stone+','+iron);
  //Händlerkapazität im Dorf auslesen
  if (location.href.match(/screen=market/)) {
  	var searchMarket = document.getElementsByTagName("th");
  	for(var s = 0; s < searchMarket.length; s++)
  	{
  	 if (searchMarket[s].innerHTML.match('Maximale Transportmenge:')) {
        market = searchMarket[s].innerHTML.split(':');
        if (typeof GM_getValue(GmVarNameMarkt + villageID)!='undefined') GM_deleteValue(GmVarNameMarkt + villageID);
        GM_setValue(GmVarNameMarkt + villageID,market[1]);
      }
    }
  }
  //Truppen vom Versamlungsplatz auslesen
  if (location.href.match(/screen=place/) && !location.href.match(/mode=units/) && !location.href.match(/mode=sim/) && !location.href.match(/mode=neighbor/)) {
    var villageUnits='';
  	if (typeof document.getElementsByName('spear')[0]!='undefined') villageUnits='unit_spear='+document.getElementsByName('spear')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('sword')[0]!='undefined') villageUnits=villageUnits+',unit_sword='+document.getElementsByName('sword')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('axe')[0]!='undefined') villageUnits=villageUnits+',unit_axe='+document.getElementsByName('axe')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('archer')[0]!='undefined') villageUnits=villageUnits+',unit_archer='+document.getElementsByName('archer')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('light')[0]!='undefined') villageUnits=villageUnits+',unit_light='+document.getElementsByName('light')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('marcher')[0]!='undefined') villageUnits=villageUnits+',unit_marcher='+document.getElementsByName('marcher')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('heavy')[0]!='undefined') villageUnits=villageUnits+',unit_heavy='+document.getElementsByName('heavy')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('ram')[0]!='undefined') villageUnits=villageUnits+',unit_ram='+document.getElementsByName('ram')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('catapult')[0]!='undefined') villageUnits=villageUnits+',unit_catapult='+document.getElementsByName('catapult')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('knight')[0]!='undefined') villageUnits=villageUnits+',unit_knight='+document.getElementsByName('knight')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
  	if (typeof document.getElementsByName('snob')[0]!='undefined') villageUnits=villageUnits+',unit_snob='+document.getElementsByName('snob')[0].nextSibling.nextSibling.innerHTML.replace("(","").replace(")","");
    if (villageUnits!='') GM_setValue(GmVarNameUnit + villageID,villageUnits);
  }
  //Alle Rohstoffe auslesen
  if (location.href.match(/screen=overview_villages/) && (document.getElementById('overview').value=='prod')) {
  	var villages = new Array();
  	var villageID;
  	var SearchVillageTH = document.getElementsByTagName("th");
  	for(var y = 0; y < SearchVillageTH.length; y++)
  	{
  		if(SearchVillageTH[y].innerHTML.match('Dorf'))
  		{
  		  var SearchVillageTD = SearchVillageTH[y].parentNode.parentNode.getElementsByTagName("td");
  			for(var j = 0; j < SearchVillageTD.length; j++)
  			{
  				if(SearchVillageTD[j].innerHTML.match(/span id="label_text_/)) 
          {
            villageID=SearchVillageTD[j].innerHTML.split("label_text_")[1].split("\"")[0];
  				}
  				if(SearchVillageTD[j].innerHTML.match(/holz.png|lehm.png|eisen.png/)) 
          {
            rohstoffe = strip_tags(SearchVillageTD[j].innerHTML).split(' ');
            wood = rohstoffe[0].replace('.','');
            stone = rohstoffe[1].replace('.','');
            iron = rohstoffe[2].replace('.','');
            if (typeof GM_getValue(GmVarNameResi + villageID)!='undefined') GM_deleteValue(GmVarNameResi + villageID);
            GM_setValue(GmVarNameResi + villageID,wood+','+stone+','+iron); 
          }
  			}
  		}
  	}
  	var gzDiv = document.createElement("div");		
  	gzDiv.setAttribute("style", "margin: -2px 0px 0px 1px;padding: 2px 7px 2px 0px;width:99%;background-color:#F7EED3", false);
    gzDiv.innerHTML = "<b>Rohstoffmengen gespeichert</b>";
  	var insertBeforTable = document.getElementsByTagName("table");
  	for(var t = 0; t < insertBeforTable.length; t++)
  	{
  		if (insertBeforTable[t].innerHTML.match('Gruppen')) {
  			insertBeforTable[t].parentNode.insertBefore(gzDiv, insertBeforTable[t]);
  		}
  	}	
  }
  //Alle Marktplätze auslesen
  if (location.href.match(/screen=overview_villages/) && (document.getElementById('overview').value=='combined')) {
  	var villages = new Array();
  	var villageID;
  	var SearchVillageTH = document.getElementsByTagName("th");
  	for(var y = 0; y < SearchVillageTH.length; y++)
  	{
  		if(SearchVillageTH[y].innerHTML.match('Dorf'))
  		{
  		  var SearchVillageTD = SearchVillageTH[y].parentNode.parentNode.getElementsByTagName("td");
  			for(var j = 0; j < SearchVillageTD.length; j++)
  			{
  				if(SearchVillageTD[j].innerHTML.match(/span id="label_text_/)) 
          {
            villageID=SearchVillageTD[j].innerHTML.split("label_text_")[1].split("\"")[0];
  				}
  
  				if(SearchVillageTD[j].innerHTML.match('<a href="game.php?village=|screen=market|/">')) 
          {
            market = SearchVillageTD[j].innerHTML.split(">")[1].split("<")[0].split("/")[0]*1000;
            if (typeof GM_getValue(GmVarNameMarkt + villageID)!='undefined') GM_deleteValue(GmVarNameMarkt + villageID);
            GM_setValue(GmVarNameMarkt + villageID,market); 
          }
  			}
  		}
  	}
  	var gzDiv = document.createElement("div");		
  	gzDiv.setAttribute("style", "margin: -2px 0px 0px 1px;padding: 2px 7px 2px 0px;width:99%;background-color:#F7EED3", false);
    gzDiv.innerHTML = "<b>Transportmengen gespeichert</b>";
  	var insertBeforTable = document.getElementsByTagName("table");
  	for(var t = 0; t < insertBeforTable.length; t++)
  	{
  		if (insertBeforTable[t].innerHTML.match('Gruppen')) {
  			insertBeforTable[t].parentNode.insertBefore(gzDiv, insertBeforTable[t]);
  		}
  	}
  }
  //Alle Truppen im Dorf auslesen
  if (location.href.match(/screen=overview_villages/) && (document.getElementById('overview').value=='units')) {
  	var units = new Array();
  	var villageID;  
  	var SearchVillageTR = document.getElementsByTagName("TR");
  	var SearchUnitTH = document.getElementsByTagName("TH");
  	var setUnits = new Array();
  	var checkSetValue=0;
  	for(var z = 0; z < SearchUnitTH.length; z++)
  	{  	
  	 if (SearchUnitTH[z].innerHTML.match("/unit/unit_")) setUnits.push(SearchUnitTH[z].innerHTML.split('graphic/unit/')[1].split('.png')[0]);
  	}
  	for(var y = 0; y < SearchVillageTR.length; y++)
  	{
  		if(SearchVillageTR[y].className=='units_home')
  		{
  		  villageID = SearchVillageTR[y].innerHTML.split('village=')[1].split('&')[0];
  		  var villageUnits='';
  		  for(var u = 0; u < setUnits.length; u++) {
  		    if (villageUnits=='') villageUnits=setUnits[u] + '=' + SearchVillageTR[y].getElementsByTagName("TD")[u+1].innerHTML;
  		    else villageUnits=villageUnits + ',' + setUnits[u] + '=' + SearchVillageTR[y].getElementsByTagName("TD")[u+1].innerHTML;
        }
        GM_setValue(GmVarNameUnit + villageID,villageUnits);
        checkSetValue=1;
  		}
  	}
  	if (checkSetValue==1) {
    	var gzDiv = document.createElement("div");		
    	gzDiv.setAttribute("style", "margin: -2px 0px 0px 1px;padding: 2px 7px 2px 0px;width:99%;background-color:#F7EED3", false);
      gzDiv.innerHTML = "<b>Truppen gespeichert</b>";
    	var insertBeforTable = document.getElementsByTagName("table");
    	for(var t = 0; t < insertBeforTable.length; t++)
    	{
    		if (insertBeforTable[t].innerHTML.match('Gruppen')) {
    			insertBeforTable[t].parentNode.insertBefore(gzDiv, insertBeforTable[t]);
    		}
    	}    
    }
  }
  //Elemente hinzufügen
  villageContent = new Array();
  if (location.href.match(/screen=place&mode=neighbor/)) {
  	var searchNeighborTable = document.getElementsByTagName("table");
  	for(var s = 0; s < searchNeighborTable.length; s++)
  	{
  	  if ((searchNeighborTable[s].className=="vis") && (searchNeighborTable[s].innerHTML.match("<th>Dorf</th>"))) {
  	    var searchNeighborTR = searchNeighborTable[s].getElementsByTagName("tr");
      	for(var t = 0; t < searchNeighborTR.length; t++) {
      	  if (searchNeighborTR[t].getElementsByTagName("td").length!=0) {
      	    var searchNeighborA = searchNeighborTR[t].getElementsByTagName("td")[0].getElementsByTagName("a")[0]
      	    var VillageNeighborID = searchNeighborA.href.split("village=")[1].split("&")[0];
      	    if(typeof GM_getValue(GmVarNameResi + VillageNeighborID) != 'undefined') {
        	    villageContent.push(VillageNeighborID);
              var divNeighbor = document.createElement("div");
              divNeighbor.innerHTML = 	'<div name="rohstoffe" style="display:'+viewConfig+';margin-top:'+marginTop+'"><img style="width:'+imgSize+';height:'+imgSize+'" src="'+img_wood+'" /> <span style="font-size:'+fontSize+'" id="wood_'+VillageNeighborID+'"></span> <img style="width:'+imgSize+';height:'+imgSize+'" src="'+img_stone+'" /> <span style="font-size:'+fontSize+'" id="stone_'+VillageNeighborID+'"></span> <img style="width:'+imgSize+';height:'+imgSize+'" src="'+img_iron+'" /> <span style="font-size:'+fontSize+'" id="iron_'+VillageNeighborID+'"></span> <a href="' + location.href.split('?')[0] + '?village=' + VillageNeighborID + '&screen=market&target=' + villageID + '"><img style="width:'+imgSize+';height:'+imgSize+'" src="'+img_market+'" /> <span style="font-size:'+fontSize+'" id="market_'+VillageNeighborID+'"></span></a></div><div name="truppen" style="display:'+viewConfig+';margin-top:'+marginTop+'" id="units_'+VillageNeighborID+'">&nbsp;</div>';
          		searchNeighborA.parentNode.insertBefore(divNeighbor, searchNeighborA.nextSibling);  
            }     
          }
        }	    
      }
    }
  }
  for(var v = 0; v < villageContent.length; v++) {
    if(typeof GM_getValue(GmVarNameResi + villageContent[v]) != 'undefined') {
      outputRohstoffe=GM_getValue(GmVarNameResi + villageContent[v]).split(",");
      document.getElementById('wood_'+villageContent[v]).innerHTML=addCommas(outputRohstoffe[0]).replace(',','.');
      document.getElementById('stone_'+villageContent[v]).innerHTML=addCommas(outputRohstoffe[1]).replace(',','.');
      document.getElementById('iron_'+villageContent[v]).innerHTML=addCommas(outputRohstoffe[2]).replace(',','.'); 
    }
    if(typeof GM_getValue(GmVarNameMarkt + villageContent[v]) != 'undefined') {
      outputMarkt=GM_getValue(GmVarNameMarkt + villageContent[v]);
      document.getElementById('market_'+villageContent[v]).innerHTML=addCommas(outputMarkt).replace(',','.');    
    }
    if(typeof GM_getValue(GmVarNameUnit + villageContent[v]) != 'undefined') {
      var unitData=GM_getValue(GmVarNameUnit + villageContent[v]).split(',');
      var outputUnits1='';
      var outputUnits2='';
      for(var w = 0; w < unitData.length; w++)
      {   
        if (unitData[w].split('=')[1]!=0) {
          outputUnits1=outputUnits1+'<td style="text-align:center"><img style="width:'+imgSize+';height:'+imgSize+'" src="/graphic/unit/'+unitData[w].split('=')[0]+'.png"/></td>';
          outputUnits2=outputUnits2+'<td style="font-size:'+fontSize+'">'+unitData[w].split('=')[1]+'</td>';
        }
      }
      document.getElementById('units_'+villageContent[v]).innerHTML='<table><tr>'+outputUnits1+'</tr><tr>'+outputUnits2+'</tr></table>';    
    }
  }
}