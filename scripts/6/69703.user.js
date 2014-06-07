// ==UserScript==
// @name           EBA FoodSuggest
// @namespace      http://userscripts.org/scripts/show/69703
// @description    Schlägt eine passende Menge Futter für die Ameisen bei eatenbyants.de vor.
// @author         Fabian Beckmann
// @include        http://www.eatenbyants.de/ameisenzimmer.php*
// @include        http://eatenbyants.de/ameisenzimmer.php*
// @include        http://www.ameisenspiel.de/ameisenzimmer.php*
// @include        http://ameisenspiel.de/ameisenzimmer.php*
// @version        0.4
// ==/UserScript==

/*
MIT License
-------------
Copyright (c) 2010 Fabian Beckmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Werte geben an:
//  - Zucker  pro Prozent und Arbeiterin
//  - Protein pro Prozent und Larve
var ebaConst = {
    // Einheimische Ameisen
    'Formica fusca'         : [
        function(x) {return 1.53e-3},
        function(x) {return 7.05e-4} ],
    'Formica sanguinea'         : [
        function(x) {return 1.5e-3},
        function(x) {return 7.0e-4} ],
    'Myrmica rubra'         : [
        function(x) {return 2.5e-3},
        function(x) {return 4.5e-3} ],
    'Camponotus ligniperda' : [
        function(x) {return 6.1e-3},
        function(x) {return 7.1e-4} ],
    'Temnothorax nylanderi' : [
        function(x) {return 2.5e-3},
        function(x) {return 3.2e-3} ],
    'Lasius emarginatus'    : [
        function(x) {return 1.5e-3},
        function(x) {return 1.4e-4} ],
    'Lasius niger'          : [
        function(x) {return 1.5e-3},
        function(x) {return 9.0e-4} ],
    'Lasius flavus'         : [
        function(x) {return 1.5e-3},
        function(x) {return 8.0e-4} ],
    'Lasius fuliginosus'    : [
        function(x) {return 1.41e-3},
        function(x) {return 7.0e-4} ],
    // Südeuropäische Ameisen
    'Pheidole pallidula'    : [
        function(x) {return 2.55e-3},   // Zucker
        function(x) {return 5.15e-3} ], // Protein
    'Messor barbarus'       : [
        function(x) {return 2.51e-3},
        function(x) {return 5.0e-3}],
    'Cataglyphis velox'     : [
        function(x) {return 4.0e-3},
        function(x) {return 5.7e-3}],
    'Camponotus cruentatus' : [
        function(x) {return 2.47e-3},
        function(x) {return 4.20e-3}],
    //Exotische Ameisen 
    'Camponotus substitutus': [
        function(x) {return 5.02e-3},
        function(x) {return 5.7e-3} ],
	'Acromyrmex spec.': [
		function(x) {return 2.55e-3},
		function(x) {return 5.1e-3} ],
	'Polyrhachis dives': [
		function(x) {return 3.0e-3},
		function(x) {return 5.0e-3} ],
	'Crematogaster scutellaris': [
		function(x) {return 4.0e-3},
		function(x) {return 6.0e-3} ],
};

// Liste der Arten die sich von Koernern bzw. Ameisenbrot ernaehren:
var ebaKoernerFresser = {
    'Messor barbarus'	: true,
    'Messor Alexandri'	: true,
    'Messor struktor'	: true,
};

//Liste der Arten die sich von Blättern bzw. einem Pilz ernaehren:
var ebaPilzZuechter = {
    'Acromyrmex spec.'		: true,
    'Acromyrmex versicolor' : true,
};

var antName, workerCount, larvenCount, sugarNeed, proteinNeed;

var loaded = false;
function onLoad() {
    if (!loaded)
        loaded = true;
    else
        return;
        
    getAntName();
    getFoodNeed();
    getAnimalCount();
    
    if (sugarNeed == undefined)
    	return; // Wir sind auf einer Seite, auf der nicht gefüttert werden kann.

    if (!(antName in ebaConst)) { // Die Ameise ist noch nicht statistisch erfasst.
    	document.getElementById('shopitem').innerHTML =
    		'<p>F&uuml;r diese Art ist automatisches F&uuml;ttern noch nicht implementiert.</p>'
    		+ document.getElementById('shopitem').innerHTML;
    } else {
        antConst = ebaConst[antName];
        sugar = workerCount * sugarNeed * antConst[0](workerCount);
        protein = larvenCount * proteinNeed * antConst[1](workerCount);
    
        fillFeedField(1, Math.ceil(sugar));
        fillFeedField(2, Math.ceil(protein));
    }
    
    injectStatMaker();
    if (document.body.innerHTML.indexOf('gefüttert') > 0)
        doStat2();
}

document.addEventListener('load', onLoad, true);

function getAntName() {
    var allElements = document.getElementsByTagName('h3');
    
    for (var i = 0; i < allElements.length; i++) {
        var thisElement = allElements[i];
        antName = thisElement.innerHTML;
        var endTagAt = antName.indexOf('<');
        if (endTagAt == -1)
            endTagAt = antName.length;
        antName = antName.substr(12, endTagAt - 12);
        antName = antName.replace(/ +$/,'');
        return;
    }
    antName = -1;
}

function getFoodNeed() {
    var allElements, thisElement;
    allElements = document.evaluate(
        '//span[@id]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        need = thisElement.firstChild.title;
        need = need.substr(0, need.length - 1);
        
        if (thisElement.id.indexOf('sugarhunger') == 0) {
            if (antName in ebaKoernerFresser)
                sugarNeed = 100 - need;
            else
                sugarNeed = need;
                
		} else if (thisElement.id.indexOf('proteinhunger') == 0) {
            if (antName in ebaPilzZuechter)
                proteinNeed = 100 - need;
            else
                proteinNeed = need;

        } else break;

        thisElement.parentNode.lastChild.replaceWholeText(" "+need+"%");
    }
}

function getAnimalCount() {
    var allElements, thisElement;
    allElements = document.evaluate(
        '//td[@class="liste"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        if (thisElement.innerHTML.indexOf("Arbeiterinnen") > -1) {
            workerCount = parseInt(thisElement.nextSibling.innerHTML);
            //break;
        } else if (thisElement.innerHTML.indexOf("Larven") > -1) {
            larvenCount = parseInt(thisElement.nextSibling.innerHTML);
            break;
        }
    }
    
    return -1;
}

function fillFeedField(fieldId, amount) {
    var allElements, thisElement;
    allElements = document.evaluate(
        '//input[@name]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    var count = 1;
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        if (thisElement.name == 'amount') {
            if (count == fieldId) {
                if (amount > -1)
                    thisElement.value = amount;
                return thisElement.value;
            } else {
                count++;
            }
        }
    }
}

function doStat1(buttonId) {
    if (buttonId == 1) {
        sugar = fillFeedField(1, -1);
        GM_setValue('amount', sugar);
        GM_setValue('fed', 'sugar');
        GM_setValue('percentBefore', sugarNeed);
        //alert('antName:'+antName+' workerCount:'+workerCount+' sugar:'+sugar);
    } else {
        protein = fillFeedField(2, -1);
        GM_setValue('amount', protein);
        GM_setValue('fed', 'protein');
        GM_setValue('percentBefore', proteinNeed);
        //alert('antName:'+antName+' workerCount:'+workerCount+' protein:'+protein);
    }
    return false;
}

function doStat2() {
    leftFood = '';
    
    fed = GM_getValue('fed');
    
    var allElements, thisElement;
    allElements = document.evaluate(
        '//td[@class="liste"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = allElements.snapshotLength-1; i >= 0; i++) {
        thisElement = allElements.snapshotItem(i);
        if (thisElement.innerHTML == "100%") {
            foodElement = thisElement.previousSibling.previousSibling;
            nameElement = foodElement.previousSibling;
            leftFood = foodElement.innerHTML;
            name = nameElement.innerHTML;
            if (name.indexOf("Zucker") + name.indexOf("Honig") + name.indexOf("samen") > -3) {
            	if (fed == "sugar")
            		break;
            } else if (fed == "protein") {
            	break;
            }
        }
    }

    amount = parseFloat(GM_getValue('amount')) - parseFloat(leftFood);
    // Die Nachkommastellen werden entfernt, indem wir beide Werte mal zehn nehmen.
    percenta = parseInt( GM_getValue('percentBefore') * 10 );
    percentb = parseInt( (fed == 'sugar') ? sugarNeed *10 : proteinNeed *10 );
    // Nach der Berechnung wird das Komma wieder um eine Stelle nach links verschoben.
    percent = parseFloat(parseInt(percenta) - parseInt(percentb)) / 10 ;
    //alert('fed:'+fed+' amount:'+amount+' percent:'+percent+' antName:'+antName+' workerCount:'+workerCount);
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://phaseq.de/ebastatserver.php?action=send&antName='+antName+'&workerCount='+workerCount+'&larvenCount='+larvenCount+'&fed='+fed+'&amount='+amount+'&percent='+percent,
    	headers: {
        //'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    	},
    	onload: function(responseDetails) {
        	/*alert('Statistik-Server: ' + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Antwort:\n' + responseDetails.responseText);*/
    	}
	});
}

function injectStatMaker() {
    var allElements, thisElement;
    allElements = document.evaluate(
        '//input[@type="submit"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        if (i == 0)
            thisElement.addEventListener('click', function(){doStat1(1);}, true);
        else if (i == 1)
            thisElement.addEventListener('click', function(){doStat1(2);}, true);
    }
}

var Cookie = { 
  PREFIX:'_greasekit', 
  get: function( name ){ 
    var nameEQ = escape(Cookie._buildName(name)) + "=", ca = 
document.cookie.split(';'); 
    for (var i = 0, c; i < ca.length; i++) { 
      c = ca[i]; 
      while (c.charAt(0) == ' ') c = c.substring(1, c.length); 
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length); 
    } 
    return null; 
  }, 
  set: function( name, value, options ){ 
    options = (options || {}); 
    if ( options.expiresInOneYear ){ 
      var today = new Date(); 
      today.setFullYear(today.getFullYear()+1, today.getMonth, today.getDay()); 
      options.expires = today; 
    } 
    var curCookie = escape(Cookie._buildName(name)) + "=" + escape(value) + 
      ((options.expires) ? "; expires=" + options.expires.toGMTString() : "") + 
      ((options.path)    ? "; path="    + options.path : "") + 
      ((options.domain)  ? "; domain="  + options.domain : "") + 
      ((options.secure)  ? "; secure" : ""); 
    document.cookie = curCookie; 
  }, 
  hasCookie: function( name ){ 
    return document.cookie.indexOf( escape(Cookie._buildName(name)) ) > -1; 
  }, 
  _buildName: function(name){ 
    return Cookie.PREFIX + '_' + name; 
  } 
}; 

if(typeof GM_getValue === "undefined") GM_getValue = Cookie.get; 
if(typeof GM_setValue === "undefined") GM_setValue = Cookie.set; 


if(typeof GM_xmlhttpRequest === "undefined") { 
  GM_xmlhttpRequest = function(/* object */ details) { 
    details.method = details.method.toUpperCase() || "GET"; 
    if(!details.url) { 
      throw("GM_xmlhttpRequest requires an URL."); 
      return; 
    } 
    // build XMLHttpRequest object 
    var oXhr, aAjaxes = []; 
    if(typeof ActiveXObject !== "undefined") { 
      var oCls = ActiveXObject; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"}; 
    } 
    if(typeof XMLHttpRequest !== "undefined") 
      aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined}; 
    for(var i=aAjaxes.length; i--; ) 
      try{ 
	oXhr = new aAjaxes[i].cls(aAjaxes[i].arg); 
	if(oXhr) break; 
      } catch(e) {} 
    // run it 
    if(oXhr) { 
      if("onreadystatechange" in details) 
	oXhr.onreadystatechange = function() 
	  { details.onreadystatechange(oXhr) }; 
      if("onload" in details) 
	oXhr.onload = function() { details.onload(oXhr) }; 
      if("onerror" in details) 
	oXhr.onerror = function() { details.onerror(oXhr) }; 
      oXhr.open(details.method, details.url, true); 
      if("headers" in details) 
	for(var header in details.headers) 
	  oXhr.setRequestHeader(header, details.headers[header]); 
      if("data" in details) 
	oXhr.send(details.data); 
      else 
	oXhr.send(); 
    }
    else {
      throw ("This Browser is not supported, please upgrade.");
    }
  } 
} 