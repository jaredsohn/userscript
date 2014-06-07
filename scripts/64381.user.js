// ==UserScript==
// @name           tribalwars-Total resources-plapl 
// @namespace      http://forum.die-staemme.de/showthread.php?t=123594
// @description    DS Nachbard?rfer v1.2 - Zeigt im Browsergame "Die St?mme" in der Ubersicht Versammlungsplatz/Nachbard?rfer die aktuell eingelesenen Rohstoff und Transportmengen an. 
// @include        http://ae*.tribalwars.ae*
// ==/UserScript==

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
//Unterschiedliche Welten
var DsWelt=location.href.split('/')[2].split('.')[0];
//Variable mit Prefix
var GmVarNameResi=DsWelt + ':rnd:';
var GmVarNameMarkt=DsWelt + ':mnd:';
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
  //H?ndlerkapazit?t im Dorf auslesen
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
  //Alle Rohstoffe auslesen
  if (location.href.match(/screen=overview_villages/) && (document.getElementById('overview').value=='prod')) {
  	var villages = new Array();
  	var villageID;
  	var SearchVillageTH = document.getElementsByTagName("th");
  	for(var y = 0; y < SearchVillageTH.length; y++)
  	{
  		if(SearchVillageTH[y].innerHTML.match('القريه'))
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
  		if (insertBeforTable[t].innerHTML.match('المجموعات')) {
  			insertBeforTable[t].parentNode.insertBefore(gzDiv, insertBeforTable[t]);
  		}
  	}	
  }
  //Alle Marktpl?tze auslesen
  if (location.href.match(/screen=overview_villages/) && (document.getElementById('overview').value=='combined')) {
  	var villages = new Array();
  	var villageID;
  	var SearchVillageTH = document.getElementsByTagName("th");
  	for(var y = 0; y < SearchVillageTH.length; y++)
  	{
  		if(SearchVillageTH[y].innerHTML.match('القريه'))
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
  //Elemente hinzufügen
  villageContent = new Array();
  if (location.href.match(/screen=place&mode=neighbor/)) {
  	var searchNeighborTable = document.getElementsByTagName("table");
  	for(var s = 0; s < searchNeighborTable.length; s++)
  	{
  	  if ((searchNeighborTable[s].className=="vis") && (searchNeighborTable[s].innerHTML.match("<th>القريه</th>"))) {
  	    var searchNeighborTR = searchNeighborTable[s].getElementsByTagName("tr");
      	for(var t = 0; t < searchNeighborTR.length; t++) {
      	  if (searchNeighborTR[t].getElementsByTagName("td").length!=0) {
      	    var searchNeighborA = searchNeighborTR[t].getElementsByTagName("td")[0].getElementsByTagName("a")[0]
      	    var VillageNeighborID = searchNeighborA.href.split("village=")[1].split("&")[0];
      	    if(typeof GM_getValue(GmVarNameResi + VillageNeighborID) != 'undefined') {
        	    villageContent.push(VillageNeighborID);
              var divNeighbor = document.createElement("div");
              divNeighbor.innerHTML = 	'<img src="'+img_wood+'" /> <span id="wood_'+VillageNeighborID+'"></span> <img src="'+img_stone+'" /> <span id="stone_'+VillageNeighborID+'"></span> <img src="'+img_iron+'" /> <span id="iron_'+VillageNeighborID+'"></span> <a href="' + location.href.split('?')[0] + '?village=' + VillageNeighborID + '&screen=market&target=' + villageID + '"><img src="'+img_market+'" /> <span id="market_'+VillageNeighborID+'"></span></a>';
          		searchNeighborA.parentNode.insertBefore(divNeighbor, searchNeighborA.nextSibling);  
            }     
          }
        }	    
      }
    }
  }
  for(var x = 0; x < villageContent.length; x++)
  {
    if(typeof GM_getValue(GmVarNameResi + villageContent[x]) != 'undefined') {
      outputRohstoffe=GM_getValue(GmVarNameResi + villageContent[x]).split(",");
      document.getElementById('wood_'+villageContent[x]).innerHTML=outputRohstoffe[0];
      document.getElementById('stone_'+villageContent[x]).innerHTML=outputRohstoffe[1];
      document.getElementById('iron_'+villageContent[x]).innerHTML=outputRohstoffe[2];
      outputMarkt=GM_getValue(GmVarNameMarkt + villageContent[x]);
      document.getElementById('market_'+villageContent[x]).innerHTML=outputMarkt; 
    }
  }
}