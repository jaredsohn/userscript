// ==UserScript==
// @name           Travian Message Popup
// @namespace      Travian:ondy1985
// @description    Pops up message detail in new window
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// @exclude        http://*.travian.*/*?id=*
// ==/UserScript==

var w = window.innerWidth;;
var h = window.innerHeight;

var popW = 700, popH = 600;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;

for (var i = 0; i < document.links.length; i++) {
	var a = document.links[i];	
	if (a.href.search(/(be|nach)richte[n]?[.]php[?]id=/i) != -1) {
		a.setAttribute("onclick", "window.open('" + a.href + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");		
	}
}


---------------------------------------------------------------------------------------------------

// ==UserScript==
// @name           Travian: current/max Bounty ML v1
// @description    Show current/max bounty etc.
// @include        http://*.travian.*/berichte.php?id=*
// ==/UserScript==



var t = new Array(0, 
40, 20, 50,  0, 100, 70, 0, 0, 0, 3000, 
60, 40, 50,  0, 110, 80, 0, 0, 0, 3000,  
30, 45,  0, 75,  35, 65, 0, 0, 0, 3000 
);

//alert(t[1]);  

function find(xpath,xpres) {
	var ret = document.evaluate(xpath,document,null,xpres,null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE,
    XPUList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

function elem(tag,content) {
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}

function getUnits() {
	ret = new Array(11);
	unitline = new Array(11);
	//get relevant lines: 0 = troops sent, 1 = casualties or prisoners, 2 = prisoners (iffy)
	unitline[0] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[3]/td/text()", XPOList);
	unitline[1] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[4]/td/text()", XPOList);
	unitline[2] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[5]/td/text()", XPOList);

	var len = unitline[0].snapshotLength-1;
	if (unitline[1].snapshotLength > 5){
		if (unitline[2].snapshotLength > 5){
			for (i=1; i<=len; i++) ret[i-1] = parseInt(unitline[0].snapshotItem(i).nodeValue) - (parseInt(unitline[1].snapshotItem(i).nodeValue) + parseInt(unitline[2].snapshotItem(i).nodeValue));
			} else for (i=1; i<=len; i++) ret[i-1] = parseInt(unitline[0].snapshotItem(i).nodeValue) - parseInt(unitline[1].snapshotItem(i).nodeValue);
	}
//alert (ret);
	return ret;
}

//function getBags() {
//	ret = new Array(11);
//	unitline = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[2]/td/img/@src", XPOList);
//	var len = unitline.snapshotLength-1;
//	for (i=0; i<=len; i++){
//		current = unitline.snapshotItem(i);
//		ret[i] =t[(current.nodeValue).substring((current.nodeValue).lastIndexOf("/")+1,(current.nodeValue).length-4)];
//	}
//alert (ret);
//	return ret;
//}

// for the sake of integration
// code by kispaljr
function getBags() {
	ret = new Array(11);
	unitline_images = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[2]/td/img/@src", XPOList);
	
	var len = unitline_images.snapshotLength-1;
	for (j=0, i=0; i<=len; i++){
		img_url = unitline_images.snapshotItem(i).nodeValue;
		if (img_url.substr(0, 9) == "img/un/u/") {
			ret[j++] =t[img_url.substring(img_url.lastIndexOf("/")+1, img_url.length-4)]; 
		}
	}
	return ret;
}




function pBty() {
	var ret = 0;
	var units = getUnits();
	var bags = getBags();
	var len = units.length;
	for (i=0; i<len-1; i++) {ret += bags[i] * units[i];}
	return ret;
}

function totalBty() {
	var total = 0;
	bty = find("//tr[@class='cbg1']/td[@class='s7']/text()", XPOList);
	if (bty.snapshotLength > 0){
		for (i=0; i<=3; i++ ){
			total += parseInt(bty.snapshotItem(i).nodeValue);
		}
	}
	return total;
}


window.addEventListener( 'load', function( e ) {
	btyrow = find("//tr[@class='cbg1']/td[@class='s7']/text()", XPOList);
	//filter out reports we don't care about
	if ( btyrow.snapshotLength === 0 || btyrow.snapshotLength === 2 ) return;
	//save first node for later abuse
	var content = totalBty().toString() + "/" + pBty().toString();
//alert(content);
	var firstNode = btyrow.snapshotItem(0);
	var pNode = firstNode.parentNode;
	//do we have a hero ?
	var colspan = find ("//table/tbody/tr[4]/td/table[1]/tbody/tr[1]/td[2]/@colspan",XPOList);
	colspan.snapshotItem(0).nodeValue == "10" ? pNode.setAttribute("colspan", "7") : pNode.setAttribute("colspan", "8");
	//create box
	var tpd = elem ("td", content);
	tpd.className = "s7";
	tpd.setAttribute("colspan", "3");
	//attach it to DOM
	pNode.parentNode.appendChild(tpd);
},false);


--------------------------------------------------------------------------------


// ==UserScript==
// @name            Travian Quick Report v1.4b
// @author          mikrop
// @include         http://s*.travian.*/berichte.php*
// @include         http://s*.travian.*/nachrichten.php*
// @include         http://s*.travian.*/allianz.php?s=3
// @include         http://s*.travian.*/karte.php?d=*&c=*
// @version         Latest version 1.4b
// @description		CZ: Script slouzi pro rychlejsi prochazeni hlaseni a vojenskych udalosti
// @description		EN: This script provides to quick passing reports and troop events        
// ==/UserScript==

//-- constants --

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var URL = { BERICHTE: 'BERICHTE', NACHRICHTEN: 'NACHRICHTEN', ALLIANZ: 'ALLIANZ', KARTE: 'KARTE' };
var urlResult = urlResult();
var XPTbgTab = ".//table[contains(@class, 'tbg')]";

//---------------

function find(xpath, xpres) {
    var ret = document.evaluate(xpath, document, null, xpres, null);
    return (xpres) == XPFirst ? ret.singleNodeValue : ret;
}

function urlResult() {
	
	if (location.href.indexOf('berichte.php') != -1) {
		return (URL.BERICHTE);
	} else if (location.href.indexOf('nachrichten.php') != -1) {
		return (URL.NACHRICHTEN);
	} else if (location.href.indexOf('allianz.php') != -1) {
		return (URL.ALLIANZ);
	} else if (location.href.indexOf('karte.php') != -1) {
		return (URL.KARTE);
	}
	
}

/**
 * Podle urlResult priradi hodnotu definovanemu attributu v poradi
 * var attributesArray = new Array(URL.BERICHTE, URL.NACHRICHTEN, URL.ALLIANZ, URL.KARTE);
 * 
 * @param {Object} attributesArray
 */
function setObjectAttribute(attributesArray) {

	var attribute = null;
	switch (urlResult) {
		case URL.BERICHTE:
	  		attribute = attributesArray[0]; 
			break;
		case URL.NACHRICHTEN:
			attribute = attributesArray[1];
		  	break;
		case URL.ALLIANZ:
			attribute = attributesArray[2];
		  	break;
		case URL.KARTE:
		  	attribute = attributesArray[3];
			break;
		default:
		  	GM_log('Nastaveni pro neznamou url');
			break;
	}
		
	return (attribute);

}

function xmlhttpRequest(url, anonymousFunction) {

    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
            'Accept': 'text/xml, text/html',
        },
        onload: function(response) {
			if (response.status == 200 || response.status == 304) {
				var tmp = window.document.createElement('div');
        			tmp.innerHTML = response.responseText;
				anonymousFunction(tmp);
			}
			else {
				GM_log('XML request error: ' + response.status);
			}	 	
        }
    });

}

function createReportElements(parent) {
	
	var elDivPaddingright = new Array('', '30px', '', '');
	var elDiv = window.document.createElement('div');
		elDiv.setAttribute('class', 'report');
		elDiv.style.paddingright = setObjectAttribute(elDivPaddingright);
		elDiv.style.textAlign = 'right';
		elDiv.style.minWidth = '350px';
		elDiv.style.display = 'none';
		
	var elTdColspan	= new Array(3, 4, 4, 0);
	var elTd = window.document.createElement('td');
		elTd.setAttribute('colspan', setObjectAttribute(elTdColspan));
		elTd.appendChild(elDiv);
		
	if (urlResult == URL.KARTE) {
		parent.parentNode.parentNode.parentNode.insertBefore(elTd, parent.nextSibling);
	} else {
		var elTr = window.document.createElement('tr');
		elTr.appendChild(elTd);
		parent.parentNode.insertBefore(elTr, parent.nextSibling);
	}
	
}

function resultXPTab(tmp) {
	
	var XPTabArray = new Array(XPTbgTab, ".//table[contains(@class, 'f10')]", XPTbgTab, XPTbgTab);
	var XPTab = setObjectAttribute(XPTabArray);
	var result = document.evaluate(XPTab, tmp, null, XPList, null);
	
	if (result.snapshotLength) {
		return (result.snapshotItem(0));	
	} else {
	  	return (null);
	}
	tmp = null;
	
}

function appendReportElement(i, tbgTab) {
	
	var sampleXp = ".//div[contains(@class, 'report')]"; 
	var result = find(sampleXp, XPList);
	
	var parentDiv = result.snapshotItem(i);
		parentDiv.appendChild(tbgTab);	
	
}

function myEventListener(parent, j, e, d) {
	
	parent.addEventListener(e, function(event) {
		var el = event.target;
		
		var elDiv = null;
		if (urlResult == URL.KARTE) {
			elDiv = el.parentNode.parentNode.parentNode.childNodes[(5 + j)].firstChild;
		} else {
			elDiv = el.parentNode.parentNode.nextSibling.firstChild.firstChild;	
		}
			elDiv.style.display = d;
			
	}, false);
	
}

function addReportListener(parent, j) {
	
	var objectEvents = { e: ['mouseover', 'mouseout'], d: ['block', 'none'] };
	for (var i = 0; i < 2; i++) {
		myEventListener(parent, j, objectEvents.e[i], objectEvents.d[i]);
    }	
	
}

(function() {

	var sampleXp = null;
	if (urlResult == URL.KARTE) {
		sampleXp = "//table[@class='f10']/tbody/tr/td[2]/li/a";
	} else {
		sampleXp = XPTbgTab + "/tbody/tr[not(@class='rbg' or @class='cbg1')]";	
	}
	var result = find(sampleXp, XPList);	
	
    if (result.snapshotLength) {

		var i = 0;
		for (j = 0; j < result.snapshotLength; j++) {
		
			var parent = result.snapshotItem(j);

			createReportElements(parent);
			
			var pageAnchor = null;
			if ((urlResult == URL.BERICHTE) || (urlResult == URL.ALLIANZ)) {
				pageAnchor = parent.childNodes[3].firstChild;
			} else if (urlResult == URL.NACHRICHTEN) {
				pageAnchor = parent.childNodes[2].firstChild;
			} else if (urlResult == URL.KARTE) {
				
				/* 
				 * Klicka, aby nedochazelo po zobrazeni reportu k odsunuti ostatnich odkazu a tim vyvolani 
				 * udalosti onMouseOut
				 */ 
				parent.parentNode.parentNode.style.verticalAlign = 'top';
				pageAnchor = parent;
				
			}
			
			addReportListener(pageAnchor, j);

			xmlhttpRequest(pageAnchor.href, function(tmp) {
				var XPTab = resultXPTab(tmp);
				appendReportElement(i++, XPTab);
			});

		}
		
	}	

})();

----------------------------------------------------

// ==UserScript==
// @name           Travian: Antifarm\Troop saver
// @namespace      n\a
// @include        http://*.travian*.*/dorf1.php*
// ==/UserScript==

//Change these to some valid coordinates for your server
xSave = "-7";
ySave =  "3";

var reload = true;

loginCheck();
setTimeout(function(){autoreload()},900000); 
checkImg(document)
function getArrivalTime()
{

div = document.getElementById('ltbw0');
if (!div) {div = document.getElementById('ltbw1'); }
rows = div.getElementsByTagName("tr");
  for (x=0;x<rows.length;x++)
  {
  cells = rows[x].getElementsByTagName("td");
    
    if (cells[0].innerHTML.search('att1') > 0)
    {
     arrival = cells[4].getElementsByTagName("span")[0].innerHTML;
     
    }
  } 
hours = parseInt(arrival.split(':')[0]);
minutes = parseInt(arrival.split(':')[1]);
seconds = parseInt(arrival.split(':')[2]);

totSeconds = hours*60*60 + minutes*60 + seconds 
  if (totSeconds < 30)
  {
  GM_log(">30 seconds");
  reload = false;
  saveTroops();
  }else{
  window.setTimeout(function(){getArrivalTime()},1000);
  }

}


function checkImg(doc)
{

	var ex = "//img[contains(@src,'att1')]";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) { getArrivalTime();}
}



//saveTroops();



function saveTroops(){
GM_log("Preparing to send away");
url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    prepSave(pulled);
    }
  		    });
}
function prepSave(pulled) 
{
t1 = getTotalUnit(pulled,'t1')
t2 = getTotalUnit(pulled,'t2')
t3 = getTotalUnit(pulled,'t3')
t4 = getTotalUnit(pulled,'t4')
t5 = getTotalUnit(pulled,'t5')
t6 = getTotalUnit(pulled,'t6')
t7 = getTotalUnit(pulled,'t7')
t8 = getTotalUnit(pulled,'t8')
t9 = getTotalUnit(pulled,'t9')
t10 = getTotalUnit(pulled,'t10')
t11 = getTotalUnit(pulled,'t11')

if (t1 < 1 && t2 < 1 && t3 < 1 && t4 < 1 && t5 < 1 && t6 < 1 && t7 < 1 && t8 < 1 && t9 < 1 && t10 < 1 && t11 < 1)
{
return;
}

url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
data = 'b=1&t1='+t1+'&t4='+t4+'&t7='+t7+'&t9='+t9+'&t2='+t2+'&t5='+t5+'&t8='+t8+'&t10='+t10+'&t11='+t11+'&t3='+t3+'&t6='+t6+'&c=2&dname=&x='+xSave+'&y='+ySave+'&s1=ok';

GM_log(url + data);

    GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText;
    finishSave(pulled);

    }
  		    });
}

function finishSave(pulled)
{
	idValue = getValue(pulled, 'id');
	aValue = getValue(pulled, 'a');
	cValue = getValue(pulled, 'c');
	kidValue = getValue(pulled, 'kid');
	t1Value = getValue(pulled, 't1');
	t2Value = getValue(pulled, 't2');
	t3Value = getValue(pulled, 't3');
	t4Value = getValue(pulled, 't4');
	t5Value = getValue(pulled, 't5');
	t6Value = getValue(pulled, 't6');
	t7Value = getValue(pulled, 't7');
	t8Value = getValue(pulled, 't8');
	t9Value = getValue(pulled, 't9');
	t10Value = getValue(pulled, 't10');
	t11Value = getValue(pulled, 't11');
url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
  data = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value+'&s1=ok&attacks=&cords=';
  GM_log(url + data);
    GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
    {
    GM_log("Troops sent away");
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    window.setTimeout(function(){retreat()},16000);
    GM_log("Troops will be retreated in 16 seconds");
    }
  		    });
  
}

function retreat ()
{
GM_log("Preparing to retreat troops");
url = "http://" + document.domain + "/build.php?id=39&" + getActiveVillage();
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    
    finishRetreat(pulled);
    }
  		    });
}
function finishRetreat(code)
{
	var ex = ".//img[contains(@src,'del.gif')]/..";
	tag = document.evaluate( 
  	ex,
    	code,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	
    	if(tag.snapshotLength)
    	{
      url = "" + tag.snapshotItem(0)
      GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
    GM_log("Troops retreated");
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    
    GM_log("saved");
    }
  		    });
      }


}

function getTotalUnit(doc,t)
{
var ex = ".//a[contains(@OnClick,'" + t + "')][@href='#']";
	result = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (result.snapshotLength)
{
thisResult = result.snapshotItem(0).innerHTML;
return ((thisResult.substring(1,thisResult.length-1)))
}else{
      return 0;
      }

}

function getValue(doc, name)
{
var ex = ".//input[@type='hidden'][@name='" + name + "']";
tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength)
  {
	aTag = tag.snapshotItem(0);
	return(aTag.value);
	}else{
  return 0;
  }

}
function getActiveVillage()
{
var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

  if (tag.snapshotLength)
  {
	temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	return temp[0];
  }else{
  return 0	
}
}
loginCheck();
function loginCheck()
{
if (document.getElementsByName('login'))
{
var ex = ".//input[@value='login']";
tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

var ex = ".//input[@type='password' and contains(@value, '*')]";
tag2 = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    if(tag.snapshotLength && tag2.snapshotLength)
    {
    loginButton = tag.snapshotItem(0);
    loginButton.click();
    }
}
}

function autoreload()
{
if (reload)
{
url = "http://google.com";
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
        // this reloading method avoids the browser asking whether to submit form again
    if (location.href.indexOf('#') > 0) {
        location.href = location.href.substring(0, location.href.length - 1);  // remove trailing '#' or reload won't work   
    }
    else {
        location.href = location.href;
    }
    }
  		    });
}

}

-----------------------------------------------------

// ==UserScript==
// @name           Travian TSU info v1.0
// @author                 FreeWare <freeware_ (at) mail (dot) ru>
// @namespace      FreeWare
// @description    Adds "Travian Server Utils" button next to each player or alliance
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*
// @exclude        http://www.travian.*
// ==/UserScript==

function getServerName() {
        return location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i)[1];
}
var url;

var w = window.innerWidth;;
var h = window.innerHeight;

var popW = 800, popH = 600;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;
var out = "";

function append(elem, color) {  
        var child = document.createElement("a");
        child.setAttribute("onclick", "window.open('" + url + "', new Date().getTime(), 'scrollbars=1, fullscreen =\"yes\"'); return false;"); //width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"
        child.setAttribute("href", url);
        child.setAttribute("style", "display: inline; margin-left: 5px; color: " + color + ";");
        child.innerHTML = "#";
        elem.parentNode.insertBefore(child,elem.nextSibling);
}

var ttt,loc;
loc = location+"!";

for (var i = 0; i < document.links.length; i++) {
        var a = document.links[i];
        var server = getServerName();
        if (a.parentNode.className != 'txt_menue' && a.parentNode.className != 'menu' ) {
                if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i) != -1) {
                        var who = a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');

ttt = loc.substring(loc.indexOf("travian")+8);
ttt = ttt.substring(0,ttt.indexOf("/")) + loc.charAt(loc.indexOf(".")-1);
url = "http://www.travutils.com/?s="+ttt+"&ida="+who+"";
                        append(a, '#6F84FF');                   
                } else if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i) != -1) {
                        var who = a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
ttt = loc.substring(loc.indexOf("travian")+8);
ttt = ttt.substring(0,ttt.indexOf("/")) + loc.charAt(loc.indexOf(".")-1);
url = "http://www.travutils.com/?s="+ttt+"&idu="+who+"";
                        append(a, '#17A3FF');
                }
        }
}

-----------------------------------------------------------------------


// ==UserScript==
// @name          Travian MarketPlace and Rally point auto-helper +
// @namespace     http://userscripts.org/scripts/show/28218
// @description   Adds a list of villages to market and rally screens.
// @include       http://s*.travian.*/build.php*
// @include       http://s*.travian.*/a2b.php*
// @author        msimic, based on Guy Fraser and original by Ankur Saxena
// ==/UserScript==
GM_registerMenuCommand( "Set additional marketplace targets", MPTSetup );

 var brally=window.location.href.match(/a2b/);
 
function mpTarget(i)
{
	word = prompt("Set marketplace target " + i + " (format: Villagename|Xcoord|Ycoord)\nPress Cancel to delete the old village.",GM_getValue('marketplaceTarget'+i, ''));
	if (word==null) {
	  GM_setValue('marketplaceTarget' + i, "");
	  return false;
	}
	GM_setValue('marketplaceTarget' + i, word);
	return true;
}

function rlTarget(i)
{
	word = prompt("Set rally target " + i + " (format: Villagename|Xcoord|Ycoord|type)\ntype can be 1 (reinforcement), 2 (attack), 3 (raid)\nPress Cancel to delete the old village.",GM_getValue('rallyTarget'+i, ''));
	if (word==null) {
	  GM_setValue('rallyTarget' + i, "");
	  return false;
	}
	GM_setValue('rallyTarget' + i, word);
	return true;
}

document.addEventListener("keydown",MPhotKeys,true); 

function MPTSetup() {
	var i = 0;
  for (i=1;i<=5;i++) {
  	 if (!brally) {
  	 	if (mpTarget(i)!=true) break;
  	 } else {
  	 	if (rlTarget(i)!=true) break;
  	 }
  }
}

function MPhotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==0)&&(event.ctrlKey==1))) 
        {
            if(event.keyCode==77)                   //m
            {
							MPTSetup();
            }
        }
}

(function() {

 // array of the village data (populated later)
 var villages = [];

 // get all village names
 var searchNames = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[1]/a";
 var names = document.evaluate(searchNames, document, null, XPathResult.ANY_TYPE, null);

 // get their X coords
 var searchXs = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[2]/table/tbody/tr/td[1]";
 var Xs = document.evaluate(searchXs, document, null, XPathResult.ANY_TYPE, null);

 // get their Y coords
 var searchYs = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[2]/table/tbody/tr/td[3]";
 var Ys = document.evaluate(searchYs, document, null, XPathResult.ANY_TYPE, null);

 // Go through each village and add it's details to the villages array
 var thisName = names.iterateNext();
 var thisX = Xs.iterateNext();
 var thisY = Ys.iterateNext();
 //var alertText = "gooo!\n";
 while (thisName) {
  thisX = thisX.textContent.substr(1); // remove opening (
  thisY = parseInt(thisY.textContent); // remove closing )
  //alertText += thisName.textContent + " @ ("+thisX+","+thisY+")\n"
  villages.push({name:thisName.textContent, x:thisX, y:thisY});
  thisName = names.iterateNext();
  thisX = Xs.iterateNext();
  thisY = Ys.iterateNext();
 }
 //alert(alertText);

 // reverse villages list so it's in same sequence as what is shown in right sidebar
 villages.reverse();

 // get node to attach the select list to
 var node = document.getElementsByName('y')[0];

 // build the select list
 var sel = "<select>";
 var i = villages.length;
  if (brally) {
  	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=0;document.snd.y.value=0;'>- Custom rally targets -</option>"; 		
	 for (cnt = 1; cnt<=5; cnt++) {
	 	var rlTarget = GM_getValue('rallyTarget'+cnt, '-');
	 	if (rlTarget!="" && rlTarget!="-") {
	 		var target_array=rlTarget.split("|");
	 		var atttype = target_array[3]-1;
	  		sel += "<option value = '"+(-1*i)+"' onClick='document.getElementsByName(\"c\")[" + atttype + "].checked=true;document.snd.x.value="+target_array[1]+";document.snd.y.value="+target_array[2]+";'>"+target_array[0]+"</option>"; 			
	 	}
	 }
	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=0;document.snd.y.value=0;'>- Own villages -</option>"; 		  	
  } else {
  	sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=0;document.snd.y.value=0;'>- Custom market targets -</option>"; 	
	 for (cnt = 1; cnt<=5; cnt++) {
	 	var mpTarget = GM_getValue('marketplaceTarget'+cnt, '-');
	 	if (mpTarget!="" && mpTarget!="-") {
	 		var target_array=mpTarget.split("|");
	  	sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value="+target_array[1]+";document.snd.y.value="+target_array[2]+";'>"+target_array[0]+"</option>"; 			
	 	}
	 }
	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=0;document.snd.y.value=0;'>- Own villages -</option>"; 		 
 }
 while (-1<--i) {
  // this version with coords in drop-down:
  //sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+" ("+villages[i].x+","+villages[i].y+")</option>";
  // this version without coords in drop-down:
  sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+"</option>";
 }
 sel += "</select>";

 // add the select box to the node
 if (!brally) {
	node.parentNode.parentNode.innerHTML += sel;
 }
 else {
 	node.parentNode.innerHTML += sel;
 }
})();

--------------------------------------------------

// ==UserScript==
// @author		usr8472@gmail.com 
// @name		Travian: Resource++ v3 Arabic 
// @namespace	http://userscripts.org/
// @description	Travian resource 
// @include		http://*.travian.*php*
// @include		http://*.travian3.*php*
// @exclude 	http://forum.travian.*
// @exclude 	http://*.travian.*/index.php*
// @exclude 	http://*.travian.*/anleitung.php*
// @exclude 	http://*.travian.*/login.php*
// @exclude 	http://*.travian.*/logout.php*
// @exclude 	http://*.travian.*/chat.php*
// @exclude 	http://*.travian.*/impressum.php*
// @exclude 	http://*.travian.*/karte2.php*
// @exclude 	http://www.travian.*
// @exclude 	http://forum.travian3.*
// @exclude 	http://*.travian3.*/index.php*
// @exclude 	http://*.travian3.*/anleitung.php*
// @exclude 	http://*.travian3.*/login.php*
// @exclude 	http://*.travian3.*/logout.php*
// @exclude 	http://*.travian3.*/chat.php*
// @exclude 	http://*.travian3.*/impressum.php*
// @exclude 	http://*.travian3.*/karte2.php*
// @exclude 	http://www.travian.*
// ==/UserScript==

var eventSource= (navigator.appName.indexOf== 'Opera') ? document : window; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false); //to be run on load of the page

var loc=window.location.href; // the current page href
var lang;

var order=0;// what is the order of the resources lumber to crop or crop to lumber
var fields=[]; //setup the space for the resource names
var langfile=[]//multi lang support, the space for the different translations
var resource; //setup the space for the resource data
var overflow;//setup the space for the overflow data
var autotime; // the timeout control, to update the countdown of overflow
var pagetime; //the time on the page server
var military=true; // is the pagetime 24 or 12 based clock

function onLoad(){ // runs the differnt functions and procedures, 
	
	lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ );
	if(!lang) {
	lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop(); } 
	else {
	lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
	}
	
	if(!lang) return;
	
	fields[lang]=gatherFields(); // gets the names of the resources
	if(!fields[lang]) return; //if you can't find the names of the resources you don't need to run this script, return to stop the script
		
	switch(lang){//load only the lang you need into memory
		case '.se':
		langfile[lang]=['Behöver för uppgradering:','överfullt om','förbruka om','Resurs Meters','Resurs Bars', 
		' ','Tillräckligt med råvaror idag klockan ',"Tillräckligt med råvaror imorgon klockan ",  "Tillräckligt med råvaror om ",
		" dagar, kl " , " Efter max väntan: ",  "Överskott: ","Vänta: ","Saknar","Klar"," Vänta: " ,"Blanserad",
		"Förbruka överskott om: ","Uppgradera ", " resurs produktion.","Neutral balans.", "Bygg ut magasin", "Bygg ut silo"];
		break;    
		case '.uk':
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		' Clock' ,'Enough resources today at ',"Enough resources tomorrow at ", "Enough resources in ", 
		" days at " , " After max wait: " , "Storage: ","Wait time: ","Deficit" ,"Surplus"," Max wait: ","Balanced",
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance.", "Extend Warehouse" , "Extend Granary"];		
		break;
		case '.com':
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		" o'clock",'Enough resources today at ',"Enough resources tomorrow at ", "Enough resources in ", 
		" days at ", " After max wait: " , "Storage: ","Wait time: ","Deficit","Surplus", " Max wait: ","Balanced",   
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance." , "Extend Warehouse" , "Extend Granary"   ];						
		break;
                case '.ae':
		langfile[lang]=['الموارد المحتاجة للارتقاء:','', 'مستنفذ','وقت امتلاء المخازن','مؤشر الموارد', 
		" التوقيت",'الموارد كافية اليوم عند ',"الموارد كافية غداً عند ", "المصادر كافية عند ", 
		" days at ", "  " , "وقت انتظار: ","وقت انتظار: ","عجز","فائض", " وقت الانتظار: ","متوازن",   
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance." , "Extend Warehouse" , "Extend Granary"   ];						
		break;
		case '.hu':
		langfile[lang]=[ 'Fejlesztéshez kell:', 'betelik', 'betelt', 'Nyersanyagok' , 'Nyersanyagok',
		' órakor' ,'Elég nyersanyag ma ',"Elég nyersanyag holnap ", "Elég nyersanyag ",
		" nap múlva " , " Max várakozás után: " , "Készleten: ","Várj: ","Hiány" ,"Többlet"," Max várakozás: ","Kiegyensúlyozott",
		"A többlet elfogy: ","Fejlesztés "," nyersanyag termelés.","Semleges egyensúly.", "Fejlesztd hozzá a raktárat!" , "Fejlesztd hozzá a magtárat!"    ];
		break;
		case '.de':
		langfile[lang]=['Für Ausbau benoetigt:','Überschuß', 'Erschöpft','Resourcenmeter','Resourcenbalken', 
		' Uhr','Genug Resourcen heute um ',"Genug Resourcen morgen um  ", "Genug Resourcen in ", 
		" Tagen um ", " Nach maximaler Wartezeit: " , "Vorrat: ","Wartezeit: ","Defizit","Überschuß", " Maximale Wartezeit: ","Ausgeglichen",   
		"Überschuß aufgebraucht in: ","Ausbau "," Resourcenproduktion.","Neutrale Bilanz." , "Rohstofflager erweitern" , "Kornspeicher erweitern" ];
		break
		case '.sk':
		langfile[lang]=['Stavba vyžaduje:','pretečie', 'vyčerpané','Merač surovín','Ukazatele zásob', 
		' hod','Dostatok surovín dnes o ',"Dostatok surovín zajtra o ", "Dostatok surovín za ", 
		" dní o ", " Po max. čakaní: " , "Sklad: ","Čakacia doba: ","Chýba nám","Prebytok", " Max. doba čakania: ","Vyvážené",
		"Prebytok vyčerpaný za: ","Vylepši "," produkciu surovín.","Vyváženosť." , "Rozšír sklad" , "Rozšír sýpku"];		
		break;
		case '.cz':
		langfile[lang]=['Stavba vyžaduje:','přeteče', 'vyčerpáno','Merič surovin','Ukazatele zásob',
		' hod','Dostatek surovin dnes v ',"Dostatek surovin zítra v ", "Dostatek surovin za ",
		" dny v ", " Po max. vyčkávaní: " , "Sklad: ","Čekací doba: ","Chybí nám","Přebytek", " Max. vyčkávaní: ","Vyvážené",
		"Přebytek vyčerpaný za: ","Vylepši "," produkci surovín.","Vyváženost."
		, "Vylepši sklad" , "Vylepši sýpku"];
		break;
		case '.bg':
       langfile[lang]=['Нужни за upgrade:','запълване', 'изчерпване','Resource Meters','Графики на ресурсите',
       ' часа','Достатъчно ресурси днес в ',"Достатъчно ресурси утре в", "Достатъчно ресурси в ", " дни в ", " След максимално изакване: " , 
	   "Склад: ","Време заизчакване: ","Недостиг","Излишък", " Максимално изчакване: ","Балансирано", "Изчерпване на излишъка след: ","Upgrade ",
	   " Добив наресурси.","Neutral balance." , "Разширете склада" , "Разширете хамбара"];
       break;
		default:
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		' Clock' ,'Enough resources today at ',"Enough resources tomorrow at ", "Enough resources in ", 
		" days at " , " After max wait: " , "Storage: ","Wait time: ","Deficit" ,"Surplus"," Max wait: ","Balanced",
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance.", "Extend Warehouse" , "Extend Granary"];					
		break;
	}
	
	//if somehow the lang file is not in the script, return because it can't display the information correctly       
	if(!langfile[lang]) return;

	resource=getResourceInfo(); // gathers the current store, capacity and production of each resource
	if(!resource) return; // if no resources exist on the page, return to stop the script
	overflow=calOverflow(); // computes the overflow information using resource information
	if(!overflow) return; //if overflow can't be computed, return to stop the script

	if(loc.indexOf('build')!=-1){
		getTime();
		resourcePerBuild();
	}
	
	var tme=menu();//make the menu
	if(!tme) return; // if we can't make the menu return
	addElement( tme ); // add the menu to the page
	if(!returnObjById('blocktimer')) return; //if we can't find the added menu return
	autotime = window.setTimeout(countdown, 1000); // start the timeout
		
}


function rowOpera(i,leftval){
var tol= (leftval<50) ? 150 : 255;
var sec=155-leftval;
	
var testmain = document.createElement( 'div' );
var value = document.createElement( 'div' );
var bar = document.createElement( 'table' );
var row= document.createElement( 'tr' );
var left= document.createElement( 'td' );
var right= document.createElement( 'td' );
var simg = document.createElement( 'img' );
	
	testmain.style.width='500px';
	testmain.style.height='16px';

	simg.src="img/un/r/"+(i+1)+".gif";
	simg.className='res';
	simg.style.cssFloat="left";
	simg.title=fields[lang][i];
	simg.alt=fields[lang][i];

	bar.style.cssFloat="left";
	bar.style.width='442px';
	bar.style.height='16px';
	bar.style.backgroundColor="white"
	bar.setAttribute("cellpadding","1");
	bar.setAttribute("cellspacing","0");

	left.id=fields[lang][i]+"left";
	right.id=fields[lang][i]+"right";
	value.id=fields[lang][i]+"value";
	
	
	left.style.width=leftval+'%';
	left.style.backgroundColor=rgb2HEX(sec, sec, parseInt(tol*(leftval/100)) );
	right.style.width=(100-leftval)+'%';
		
	if(leftval>=90){
		value.setAttribute("style","text-decoration:blink;");
		value.style.color='red';
	} else {
		value.setAttribute("style","text-decoration:none;");
	}
	
	value.style.width='40px';
	value.appendChild( document.createTextNode(  leftval+"%"  )  );
	value.style.cssFloat="left"
	value.title=leftval;

row.appendChild(left);
row.appendChild(right);
bar.appendChild(row);

testmain.appendChild( simg );
testmain.appendChild( value );
testmain.appendChild( bar );

testmain.id='resbar'+i;

return testmain
}

function returnObjById( id ){ //compatibility, gets the object by id, based on different returns of document 
    if (document.getElementById)
        return document.getElementById(id);
    else if (document.all)
        return document.all[id];
    else if (document.layers)
        return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
     
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
       arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

function addElement(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
var htmldoc=returnObjById("lmid2");
	
	if(!htmldoc) {
		htmldoc=document.getElementsByTagName('body')[0];
		if(!htmldoc) return;
		theElement.style.marginLeft="130px";  
		theElement.style.marginBottom="10px";
		theElement.style.width="550px";

		if(loc.indexOf('dorf2')!=-1){
			theElement.style.top="150px";}
		else {
			theElement.style.top="50px";}
	} else {
		theElement.style.width = "500px";
		if(loc.indexOf('karte.php?d=')!=-1){       
			theElement.style.top="428px";       
		}
	}
	
	htmldoc.appendChild(theElement);
}

function formatTime(maxtime, hours, minutes, seconds, off){ // given maxtime in secs and and offset values, returns a array of [hrs,min,sec]
     return [Math.floor(maxtime/3600)+hours+off,(Math.floor(maxtime/60)%60)+minutes,(maxtime % 60)+seconds];
}

function gatherFields(){//gathers the name of each resource
	var orgbar=returnObjById('lres0');
	if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
	if(!orgbar) {orgbar=returnObjById('lres');}
	if(!orgbar) return;
	var resbar=orgbar.getElementsByTagName('img');
	var ret=fields[lang]=[resbar[0].title,resbar[1].title,resbar[2].title,resbar[3].title]
	var idbar=orgbar.getElementsByTagName('td');
	if(idbar[1].id.indexOf('1')==-1) order=1;
return ret;
}

function rgb2HEX(red, green, blue){ // given red green blue values return their hexcode
    var decColor = red + (256 * green) + (65536 * blue);//offset each value and create a new int
	
	decColor=decColor.toString(16);//convert to a base16 string
	
	while( decColor.length < 6){//append 0 till it is a 6 length string
		decColor="0"+decColor;
	}
	
    return "#"+decColor;
}

function formatTimeString(maxtime){ // maxtime in seconds returns it in hh:mm:ss h format
     var helper=formatTime(maxtime, 0, 0, 0, 0);
     if(helper[1] < 10){helper[1] = "0"+helper[1];}
     if(helper[2] < 10){helper[2] = "0"+helper[2];}
     return helper[0]+':'+helper[1]+':'+helper[2]+' h';
}

function getResourceInfo(){ //using the resource values on the page, return the production, store, and capacity values as an array
	var resource=new Array();
	for(var i=1;i<=4;i++) {
		var rtd  = returnObjById("l"+i);
		if(!rtd) return;
		resource.push( [parseInt(rtd.title),parseInt(rtd.textContent.match(/\-?(\d+)\//)),parseInt(rtd.textContent.replace(/(\d+)\//,""))] );
	}
	
	if(!order) { //if the order is 0 return the array as is, if not reverse the array
		return resource;
	} else {
		return resource.reverse();
	}
	
}

function calOverflow(){ //using the resource values, return the overflow information as an array
	var sec=[];

	for(var i=0;i<4;i++) {
		if(resource[i][0]>0){
			sec[i] = [ Math.ceil(3600*(resource[i][2]-resource[i][1])/resource[i][0]),langfile[lang][1]];
		} else if(resource[i][0]<0){
			sec[i] = [ Math.ceil(3600*(-resource[i][1])/resource[i][0]), langfile[lang][2] ];
		} else {
			sec[i]=[ 0, langfile[lang][16] ];
		}
	}


	return sec;
}

function menu(){ //create an resource menu
	var mymenu = document.createElement( 'table' );
	mymenu.id="blocktimer";
	mymenu.setAttribute('style', 'z-index:5;');
	mymenu.setAttribute('cellspacing', 1);
	mymenu.setAttribute('cellpadding', 1);
	mymenu.className = "tbg";
	mymenu.style.marginTop="36px";
	mymenu.style.clear = "both";
	mymenu.style.position="relative"; 

	var row =document.createElement("tr");
	var cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.setAttribute('align', 'center');
	cell.appendChild(      document.createTextNode(  langfile[lang][3]  )          );
	cell.className = "rbg";
	row.appendChild( cell );

	mymenu.appendChild(row);

	for(var i=0; i<4; i++){
		row =document.createElement("tr");
				
		for(var j=0; j<2; j++){
			var c=i+j;
			cell = document.createElement("td");
			var inSpan = document.createElement("span");
			
			var newText = document.createTextNode(    fields[lang][c]+" "+overflow[c][1]+": "   );
			cell.appendChild(newText);
			cell.setAttribute('align', 'center');
			inSpan.id=fields[lang][c]+"timer";
			inSpan.style.color= (overflow[c][0]<300) ? "red" : "green";
			newText = document.createTextNode(formatTimeString(overflow[c][0]));
			inSpan.appendChild(newText);
			cell.appendChild(inSpan);
			row.appendChild( cell);
		}	
		
		i++;
		
		mymenu.appendChild( row);
	}
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.setAttribute('align', 'center');
	cell.appendChild(      document.createTextNode(  langfile[lang][4]   )          );
	cell.className = "rbg";
	row.appendChild( cell );
	mymenu.appendChild(row);

	for(var i=0; i<4; i++){

	var leftval=parseInt(resource[i][1]/resource[i][2] *100);
	var inRow=rowOpera(i,leftval);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.appendChild(      inRow         );
	row.appendChild(      cell         );
	
	mymenu.appendChild( row );
	}
		
return mymenu;
}


function estTime(time){//using the pagetime and the wait time for the resource, returns a time field of when the resource will be ready
     var days=0;
     var head="";
     var tail=langfile[lang][5];

     while(time[2]>=60){
     time[2]-=60;
     time[1]+=1;
     }

     while(time[1]>=60){
     time[1]-=60;
     time[0]+=1;
     }

     while(time[0]>=24){
	     time[0]-=24;
	     days+=1;
     }

     if(time[0]<10){
		time[0]="0"+time[0];
     }
     if(time[1]<10){
		time[1]="0"+time[1];
     }
     if(time[2]<10){
		time[2]="0"+time[2];
     }

     if(days==0){
		head=langfile[lang][6];
     } else if(days==1){
		head=langfile[lang][7];
     } else {
		head=langfile[lang][8] +days + langfile[lang][9];
     }
     
return head+time[0]+":"+time[1]+":"+time[2]+tail;
}

function getTime(){ // gets the time from the page or use java time
	var servertime=returnObjById("tp1").textContent;
		
	if(!servertime) {
		var Digital=new Date();
		pagetime=[Digital.getHours(),Digital.getMinutes(),Digital.getSeconds()];
		if(pagetime[0]>12)military=true;
		return;
	}
	
	pagetime=timeField(servertime);	
	servertime=pagetime;
	
	if(servertime==-1) {
		var Digital=new Date();
		pagetime=[Digital.getHours(),Digital.getMinutes(),Digital.getSeconds()];
	} 

	if(pagetime[0]>12) military=true;
	
}

function timeField(time) { // convert a hh:mm:ss time stamp to seconds
   var limit = time.split(":");
   return (limit.length == 3) ? ([parseInt(limit[0]) , parseInt(limit[1]) , parseInt(limit[2])]) : -1;
}

function countdown(){//updates all countdown values and displays

	var go=false;
	resource=getResourceInfo();
		
	for(var i=0; i<4; i++){
	
		if(overflow[i][0]>0){
			go=true;
			overflow[i][0]--;
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);
			var color=(overflow[i][0]<300) ? "red" : "green";
			var newSpan = document.createElement("span");
			
			newSpan.id=fields[lang][i]+"timer";
			newSpan.appendChild(    document.createTextNode(formatTimeString(overflow[i][0])));
			
			if(newSpan.style.color.indexOf(color)==-1){
				newSpan.style.color=color;
			}
			
			var old=returnObjById(fields[lang][i]+"timer") ;
			old.parentNode.replaceChild(newSpan,old );
			
			old=returnObjById(fields[lang][i]+"value");

			if(parseInt(old.title)!=leftval){
				overflow=calOverflow();
				old=returnObjById("resbar"+i);
				old.parentNode.replaceChild(rowOpera(i,leftval),old );
			}

			
		} else {
				var old=returnObjById(fields[lang][i]+"timer") ;
	
				if(old.textContent.indexOf("0:00:00 h")==-1){    
					old.textContent="0:00:00 h";
					old.style.color='red';
					old=returnObjById("resbar"+i);
					old.parentNode.replaceChild(rowOpera(i,100),old );
				}
		}
	}
	
	if(go){
		autotime = window.setTimeout(countdown, 1000);} 
	else {
		clearTimeout(autotime); //kill the timeout
		return;
	}
}

function resourceBuildBar(vals){//create a resource needed menu given an array of values
var div1 = document.createElement("div");
var inTable = document.createElement("table");
var row = document.createElement("tr");
var cell = document.createElement("td");

inTable.className = "tbg";
inTable.style.width = "500px";
inTable.setAttribute('cellspacing', 1);
inTable.setAttribute('cellpadding', 1);
cell.setAttribute("colspan",4);


cell.appendChild(      document.createTextNode( langfile[lang][0] )          );
cell.className = "rbg";
row.appendChild( cell );
inTable.appendChild( row );
	
	for(var i=0; i<4; i++){
		row = document.createElement("tr");
		row.style.color=vals[i][3];
		cell = document.createElement("td");
		var simg = document.createElement("img");
		simg.src="img/un/r/"+(i+1)+".gif";
		simg.alt=fields[lang][i];
		simg.title=fields[lang][i];
		cell.appendChild(simg);
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild( document.createTextNode( vals[i][0] ) );
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild( document.createTextNode( vals[i][1] ) );
		row.appendChild(cell);
		cell = document.createElement("td");
		if(vals[i][4]){
			cell.appendChild( document.createTextNode( vals[i][2]  +" |"+langfile[lang][10]+  vals[i][4] )   );}
		else {
			cell.appendChild( document.createTextNode( vals[i][2] ) );
		}
		row.appendChild(cell);
		inTable.appendChild(row);
	}

return inTable;
}



function resourcePerBuild(){ // search the page for resource needed to build, and calculates the surplus, deficit or other information

var need = document.evaluate('//table[@class="f10"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var end = need.snapshotLength;
if(end==0) return;

var resourceBlock=new Array();

for(var i=0; i<end; i++){
	var current=need.snapshotItem(i);
	var tdcells=current.getElementsByTagName('td');
	var cout=0;
	
	for(var k=0; k<tdcells.length; k++){
		if(tdcells[k].getAttribute('class')=='s7'){cout++;}
	}	
	
	if(cout==0){
		var c=current.textContent;
		if( c.indexOf(" | ")!=-1 && c.charAt(0)!="\n" ) {
			 resourceBlock.push( current );}
	}
	
}

end=resourceBlock.length;
if(end==0) return;

	for(var i=0; i<end; i++){
	var current=resourceBlock[i].textContent.split(" | ");

		var stuff=[];
		var maxtime=0;
		for(var j=0; j<4; j++){
			var cneed = parseInt( current[j] );
			var cproduction = parseInt( resource[j][0] );
			var cstore = parseInt( resource[j][1] );
			var cdiff = cstore-cneed;
			var ctime;
			var font="green"
						
			if(cproduction<0){
				if(cdiff>0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][17]+formatTimeString(temp);
				}
				else if(cdiff<0){
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19]; 
					font="red"
				}
				else {      
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19];    
					font="red"					
				}
				
			} else if(cproduction>0){
				if(cdiff>0){
					ctime=langfile[lang][11]+(cdiff/cneed*100).toFixed(2)+"%";
				}
				else if(cdiff<0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][12]+formatTimeString(temp); 
					font="red"
				}
				else {      
					ctime=langfile[lang][20];
				}
				
			} else {
			
				if(cdiff>0){    
					ctime=langfile[lang][20];
				}
				else if(cdiff<0){   
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19]; 
					font="red"
				}
				else {      
					ctime=langfile[lang][20];                      
				}
			}
			
			if(cdiff<0){         
				stuff[j]=[langfile[lang][13],(-cdiff),ctime,font];
			}
			else if(cdiff>0){   
				stuff[j]=[langfile[lang][14],cdiff,ctime,font];    
			}
			else {              
				stuff[j]=[langfile[lang][16],0,ctime,font];     
			}
			
					 
		}
		
		var holdtable;
		var w=false;
		var g=false;
		var blink=false;
		var over=false;
		
		var wblink=false;
		var gblink=false;
		
		var wover=false;
		var gover=false;
		
			if(maxtime>0){
			
				for(var k=0;k<4; k++){
				
					var left=Math.ceil((maxtime/3600)*resource[k][0])+resource[k][1];    
					var cap=parseInt(  resource[k][2] )	; 
					
					if(left>cap){
						if(k!=3){
							wover=true;
							w=true;
						} else{
							gover=true;
							g=true;
						}
						
						over=true;
						stuff[k].push( left +'*');
					} else {
						stuff[k].push( left );
					}
					
					if(current[k]>cap)	{
						
						if(k!=3){
							w=true;
							wblink=true;
							stuff[k].push( langfile[lang][21] );
						} else{
							g=true;
							gblink=true;
							stuff[k].push( langfile[lang][22] );
						}
						
						blink=true;
					}
						
						
				}
				
				holdtable=resourceBuildBar(stuff);
				
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				cell.setAttribute("colspan",4);
				var timer=estTime( formatTime(maxtime+pagetime[0]*3600+pagetime[1]*60+pagetime[2],0,0,0,0) );
				
				cell.appendChild( document.createTextNode(  timer+" |"+langfile[lang][15]+formatTimeString(maxtime) )   ); 
				row.appendChild( cell );
				holdtable.appendChild( row );
				
				if(w || g){
					var msg="";
					row = document.createElement("tr");
					cell = document.createElement("td");
					
					if( w && g){
						msg=langfile[lang][21];
						if(wover) msg+='*';
						msg+=" and "+langfile[lang][22];
						if(gover) msg+='*';
					} else if(w){
						msg=langfile[lang][21];
						if(wover) msg+='*';
					} else {
						msg=langfile[lang][22];
						if(wover) msg+='*';
					}					
					
					if(blink){
						cell.setAttribute("style","text-decoration:blink;");
						cell.style.color="red"; 
					} else {
						cell.style.color="green"; 
					}
					
					cell.setAttribute("colspan",4);
					cell.appendChild( document.createTextNode(  msg )   ); 
					row.appendChild( cell );
					holdtable.appendChild( row );
				}
				

			} else {
				holdtable=resourceBuildBar(stuff);
			}

			resourceBlock[i].appendChild( holdtable );
	}
}

---------------------------------------------

// ==UserScript==
// @name           Travian Forum BBCode Help
// @namespace      http://userscripts.org/users/60390
// @description    Agrega un menu en el foro para usar el Codigo. The script adds a menu in the forum to use the color code.
// @include        http://*.travian.*/allianz.php?*ac=newtopic
// @include        http://*.travian.*/allianz.php?*ac=newpost
// @include        http://*.travian.*/allianz.php?*ac=edittopic
// @include        http://*.travian.*/allianz.php?*ac=editpost
// ==/UserScript==


(function(){
	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addBBCode(tag,value) {' +
		'if (value=="0") return;' +
		'var message = document.getElementsByName("text")[0];' +
		'if (value=="") {' +
			'var str1 = "[" + tag + "]";' +
			'var str2 = "[/" + tag + "]";}' +
		'else {' +
			'var str1 = "[" + tag + "=" + value + "]";' +
			'var str2 = "[/" + tag + "]";}' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'var seltext = rng.text;' +
			'rng.text = str1 + seltext + str2;' +
			'rng.collapse(false);' +
			'rng.move("character",-str2.length);' +
			'rng.moveStart("character",-seltext.length);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var seltext = message.value.substring(start,message.selectionEnd);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str1 + seltext + str2 + endtext;' +
			'message.selectionStart = start + str1.length;' +
			'message.selectionEnd = start + str1.length + seltext.length;' +
		'}' +
		'message.focus();' +
	'}';
	var form = document.getElementsByTagName("form")[0];
	form.parentNode.insertBefore(script,form);
	var igm = document.getElementsByTagName("textarea")[0];
	var logo = document.createElement("tr");
	var logo1 = document.createElement("tr");
	logo.innerHTML += "<select onchange='addBBCode(\"font\",this.value)'><option value='0'>FONT</option><option value='arial'><span style='font-family:Arial'>Arial</span></option><option value='comic sans ms'><span style='font-family:comic sans ms'>Comic</span></option><option value='courier new'><span style='font-family:courier new'>Courier</span></option><option value='tahoma'><span style='font-family:tahoma'>Tahoma</span></option><option value='times new roman'><span style='font-family:times new roman'>Times</span></option><option value='verdana'><span style='font-family:verdana'>Verdana</span></option></select> ";
	logo.innerHTML += "<select onchange='addBBCode(\"size\",this.value)'><option value='0'>SIZE</option><option value='7'>tiny</option><option value='10'>small</option><option value='12'>normal</option><option value='16'>big</option><option value='20'>huge</option></select> ";
	logo.innerHTML += "<select onchange='addBBCode(\"color\",this.value)'><option value='0'>COLOR</option><option value='black' style='color:black'>black</option><option value='silver' style='color:silver'>silver</option><option value='gray' style='color:gray'>gray</option><option value='maroon' style='color:maroon'>maroon</option><option value='#A52A2A' style='color:brown'>brown</option><option value='red' style='color:red'>red</option><option value='orange' style='color:#FFA500'>orange</option><option value='yellow' style='color:yellow'>yellow</option><option value='lime' style='color:lime'>lime</option><option value='green' style='color:green'>green</option><option value='olive' style='color:olive'>olive</option><option value='teal' style='color:teal'>teal</option><option value='aqua' style='color:aqua'>aqua</option><option value='blue' style='color:blue'>blue</option><option value='navy' style='color:navy'>navy</option><option value='purple' style='color:purple'>purple</option><option value='fuchsia' style='color:fuchsia'>fuchsia</option><option value='#FFC0CB' style='color:pink'>pink</option><option value='white' style='color:white'>white</option></select> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"b\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/bold.gif' alt='Bold Text' title='Bold Text' border='0' /></a><a href='javascript:addBBCode(\"i\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/italic.gif' alt='Italic Text' title='Italic Text' border='0' /></a><a href='javascript:addBBCode(\"u\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/underline.gif' alt='Underlined Text' title='Underlined Text' border='0' /></a><img src='http://forum.travian.com.ar/images/travian/editor/separator.gif' alt='Separador' title='Separador' border='0' /> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\left\")'><img src='http://forum.travian.com.ar/images/travian/editor/justifyleft.gif' alt='Left Text' title='Left Text' border='0' /></a>";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\center\")'><img src='http://forum.travian.com.ar/images/travian/editor/justifycenter.gif' alt='Center Text' title='Center Text' border='0' /></a>";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\rright\")'><img src='http://forum.travian.com.ar/images/travian/editor/justifyright.gif' alt='Right Text' title='Right Text' border='0' /></a> <img src='http://forum.travian.com.ar/images/travian/editor/separator.gif' alt='Separador' title='Separador' border='0' /> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"url\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/createlink.gif' alt='Add Link' title='Add Link' border='0' /></a>";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"img\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/insertimage.gif' alt='Insert Image' title='Insert Image' border='0' /></a><img src='http://forum.travian.com.ar/images/travian/editor/separator.gif' alt='Separador' title='Separador' border='0' /> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"quote\",\"\")'><img src='http://forum.travian.com.ar/images/travian/editor/quote.gif' alt='Citar' title='Citar' border='0' /></a>";

	igm.parentNode.insertBefore(logo, igm);
	igm.parentNode.insertBefore(logo1, igm);
})();



----------------------------------------------------
// ==UserScript==
// @name           TravianMap
// @namespace      travianmap
// @author         FranMod
// @version        1.1
// @description    Large Map button
// @include        http://*.travian.*/karte.php*
// ==/UserScript==

/*** Code to create Large Map Button ***************************************************************************************/

var timeLoad = 500;		// Wait time between loads
var timeRandom = 300;		// time = timeLoad + random(timeRandom)
var forceScriptImages = false;	// Set true if you want to use the images from the script

window.addEventListener('DOMContentLoaded', main, false);
if (document.body) main();

function main() {
	if(location.search != '' && location.search.indexOf('z=') == -1 && location.search.indexOf('newdid') == -1)
		return;
	addImage();
}

function addImage() {
	var content = document.getElementById('lmid2');

	var link = document.createElement('a');
	link.title = 'Large map';
	link.href = 'javascript:void(0)';
	link.addEventListener('click', openMapWindow, false);
	
	var img = document.createElement('img');
	img.setAttribute('style', 'position:absolute; width:33px; height:25px; z-index:79; left:26px; top:88px;');
	img.src = 'data:image/gif;base64,R0lGODlhIQAZANU/ALKwstLR0qbhVZjeQGmmIOXl5XPSBrXqasPqlvX19W+0HW1rcIjVKsPCxGaVL' +
		  'YiFjP/+/1NxL5TdOE1MTtHwq6njYeb30p7fSbfodHCNT5ybn930wrvnh/n5+JfiN+zr7KnbbZKod16DMYJ+h46Oj1hkSpOQl+Hu' +
		  '0/z7/b+7xnl0faHlRuP1zXe/HojGPODg4fv4/e3z4/by+Y7aLfn2/cvKzfHx8XzZDsrXudva2/P47VpZW2Nfabe2uZHcMgAAACH' +
		  '5BAEAAD8ALAAAAAAhABkAQAb/wN+v4kOwLMKkcslsIgyiCe/RyyUgTSWk8wI8Mi2PYvSqCE5o9IXBiWWTl1klfSI8Cu+8fom40E' +
		  '8HDAQREyoaAVc5IQozB3+ABGQCFxZYe3uVEBAcLoMRESU7OzwLKiMaNQk6OCEZIiIOBC0MDAMrdng/fY9oAjcGIB8oLBwHGBUXE' +
		  'soXAhUVLjU2un4HHi2EPCYNBR2WP1sFKSZgHhhoB5EvPx05DVbel0kQCS89JBoFZicDDGfwl318nHCR4sOQM7wq3LiBAIaQDRVm' +
		  'IHyE6weKAgEC5CjwwUaCDiiWzLPxoUCBHAEa9ACgwQSJHgZ/cPAhYIDNCxUwIKBAYYMexQoIEAy4gQEGll2PDswgkEGbDAsMDAw' +
		  'w9wiDAhN4hKappgCbtgIJvn2oMU6BD0db0+mSIIbQDiovujUB14CEgzAnrJL5EQOACio5dPzLMy+HFwJqIaCQGy8LBBo5XiQINA' +
		  'PEicGNKTC4IKPDwTRrQMTAzISCBB9z6mD9/Ihfm38QJVK8M2TFgRUrJDBoQcCBbwchAqCgYMDACl5oKspIoaL5AxMaADSokTGHM' +
		  'BT1Wj4YoWJBiRIRXpHI1XguigQ2SL4Q9iMIADs=';

	link.appendChild(img);
	content.insertBefore(link, content.firstChild);
}

/*** Code to generate the Large Map Screen *********************************************************************************/

function openMapWindow() {
	var win; // Popup window
	var doc; // New document
	
	var src; // DOMUtils for the main window
	var dst; // DOMUtils for the new window

	var imgData = new Array();
	
	src = DOMUtils();

	var c_id = getCenterCode(src);
	if (!c_id) return;
	
	var c_xy = id2xy(c_id);

	loadImages();
	var graphicPack = isGraphicPack();
	
	win = window.open('', c_id, 'top=100,left=25,width=975,height=550');
	doc = win.document;

	dst = DOMUtils();
	dst.initDocument(doc);
		
	generateWindow(c_xy);
	
	var cl = getCornersLand();
	loadData();
//	loadFalseData();

	function isGraphicPack() {
		var img = src.id('n1').src;
		return decodeURL(img) != '/img/un/a/x.gif';
	}

	/*** Code to retrieve the information ******************************************************************************/

	function xy2id(p) {
		return (1 + p.x + 400) + (801 * Math.abs(p.y - 400));
	}

	function id2xy(id) {
		var x = (id % 801)? (id % 801) - 401: 400;
		var y = 400 - (id - 401 - x) / 801;
		return {x:x, y:y};
	}

	function getCenterCode(dom) {
		// Try new servers: May 08
		var area = dom.id('a_3_3');
		if (area) {
			return parseInt(area.href.substring(area.href.indexOf('d=') + 2).split('&')[0]);
		}
		
		// Old servers
		var map = dom.xs('//div[@id="lmid2"]//map[starts-with(@id, "map")]');
		if (map) {
			return parseInt(map.id.substring(3));
		}

		GM_Log('Error: Center can not be obtained');
		return null;
	}

	function getImagesRefs(dom) {
		var refs = new Array(7);
		for (var i = 0; i < 7; i++)
			refs[i] = new Array(7);

		var images = dom.xa('//div[@class="mdiv"]/img');
		for each (var img in images) {
			var id = parseInt(img.getAttribute('class').substring(2));
			var x = (id - 1) % 7;
			var y = Math.floor((id - 1) / 7);
			refs[y][x] = img.src;
		}

		return refs;
	}

	function getDataLand(dom) {
		var data = new Array(7);
		for (var j = 0; j < 7; j++) {
			data[j] = new Array(7);
			for (var i = 0; i < 7; i++)
				data[j][i] = new Object();
		}
	
		// Try new servers: May 08
		var script = dom.xs('//div[@id="map_content"]//script');
		if (script) {
			var m_c = new Object();
			eval(script.innerHTML);
			if (!m_c.ad) {
				GM_log('Error: Parsing script, with no m_c object');
				return null;
			}

			for (var j = 0; j < 7; j++) {
				for (var i = 0; i < 7; i++) {
					var land = data[j][i];
					var info = m_c.ad[i][6-j];
					land.x = parseInt(info.x);
					land.y = parseInt(info.y);
					land.cx = c_xy.x;
					land.cy = c_xy.y;
					land.img = info.src;
					land.href = info.href;
					if (info.name) {
						land.city = new Object();
						land.city.name = info.dname;
						land.city.pop = parseInt(info.ew);
						land.city.owner = info.name;
						land.city.ally = info.ally;
					}
					else
						land.city = null;
				}
			}
			return data;
		}
		
		// Old servers
		var pc = c_xy;
		var imgs = getImagesRefs(dom);
		var area = dom.xa('//div[@id="lmid2"]//map[starts-with(@id, "map")]/area[starts-with(@href, "karte.php?d=")]');
		var i = 0;
		var j = 0;
		for each (a in area) {
			var txt = a.getAttribute('onmouseover');
			var info = txt.substring(4, txt.length - 1).split(',').map(function(it) {return it.substring(1, it.length - 1); });
			
			var land = data[j][i];
			land.cx = c_xy.x;
			land.cy = c_xy.y;
			land.img = imgs[j][i];
			land.href = a.href.substring(a.href.indexOf('karte.php'));
			
			if (info.length == 2) {
				land.x = parseInt(info[0]);
				land.y = parseInt(info[1]);
				land.city = null;
			}
			else {
				land.x = parseInt(info[4]);
				land.y = parseInt(info[5]);
				land.city = new Object();
				land.city.name = info[0];
				land.city.pop = info[2];
				land.city.owner = info[1];
				land.city.ally = info[3];
			}
		
		
			i = (i + 1) % 7;
			if (i == 0) j++;
		}
		return data;
	}

	function updateSquare(dom) {
		var c = getCenterCode(dom);
		var q = cl.indexOf(c);
		if (!c || q == -1) {
			GM_log('Error: Data unexpected, retrieving pages info');
			return;
		}

		var data = getDataLand(dom);
		
		for (var j = 0; j < 7; j++) {
			for (var i = 0; i < 7; i++) {
				var p = convertCoords(i, j, q);
				if (p) updateTile(p.x, p.y, data[j][i]);
			}
		}
	
		function convertCoords(i, j, q) {
			if (q == 0) return {x:i,y:j};
			else if (q == 1) return {x:i+6,y:j};
			else if (q == 2) return {x:i+6,y:j+6};
			else if (q == 3) return {x:i,y:j+6};
			else return null;
		}
	}

	function decodeURL(url) {
		var expr = /((\w*):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+\.[^#?\s]+)/;
		var res = url.match(expr);
		return res[4] + res[6];
	}
	
	function getCornersLand() {
		var centers = new Array(4);
		var dx = [-3, 3, 3, -3];
		var dy = [3, 3, -3, -3];

		var p = {x:0, y:0};
		for (var i = 0; i < 4; i++) {
			p.x = c_xy.x + dx[i];
			if (p.x < -400) p.x += 801;
			if (p.x >  400) p.x -= 801;
			p.y = c_xy.y + dy[i];
			if (p.y < -400) p.y += 801;
			if (p.y >  400) p.y -= 801;
			centers[i] = xy2id(p);
		}
		return centers;
	}

	function getPage(addr) {
		GM_log('Retrieving page: ' + addr + ' on ' + new Date());
		var req = new XMLHttpRequest();
		req.open('GET', addr, true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4) {
				if(req.status == 200) {
					var dom = DOMUtils();
					dom.initResponse(req.responseText);
					updateSquare(dom);
				}
			}
		};
		req.send(null);
	}

	function loadData() {
		var time = 0;
		for (var i = 0; i < 4; i++) {
			if (!cl[i]) continue;
			var addr = 'karte.php?z=' + cl[i];
			setTimeout(makeGetPage(addr), time);
			time += $rnd(timeRandom) + timeLoad;
		}
		function makeGetPage(addr) { return function() { getPage(addr); } }
	}

// 	function loadFalseData() {
// 		var c = getCenterCode(src);
// 		var t = cl[0];
// 		cl[0] = c;
// 		updateSquare(src);
// 		cl[0] = t;
// 		t = cl[1];
// 		cl[1] = c;
// 		updateSquare(src);
// 		cl[1] = t;
// 		t = cl[1];
// 		cl[2] = c;
// 		updateSquare(src);
// 		cl[2] = t;
// 		t = cl[3];
// 		cl[3] = c;
// 		updateSquare(src);
// 		cl[3] = t;
// 	}

	/*** Code to generate the shifts ***********************************************************************************/

	function updateCenter() {
		doc.getElementById('x').firstChild.nodeValue = c_xy.x;
		doc.getElementById('y').firstChild.nodeValue = c_xy.y;
	
		dst.xs('//input[@name="xp"]').value = c_xy.x;
		dst.xs('//input[@name="yp"]').value = c_xy.y;
	}

	function jumpNewPosition() {
		var xp = dst.xs('//input[@name="xp"]').value;
		var yp = dst.xs('//input[@name="yp"]').value;

		if (isNaN(xp * 1) || isNaN(parseInt(xp)) || isNaN(yp * 1) || isNaN(parseInt(yp))) {
			dst.xs('//input[@name="xp"]').value = c_xy.x;
			dst.xs('//input[@name="yp"]').value = c_xy.y;
			return;
		}

		if (xp < -400) xp = -400;
		if (xp > 400) xp = 400;
		if (yp < -400) yp = -400;
		if (yp > 400) yp = 400;

		c_xy = {x: xp*1, y: yp*1};
		updateCenter();
		
		cl = getCornersLand();
		loadData();
	}

	function shiftMap() {
		var p1, p2;
		var hor, start, inc;

		var dir = this.getAttribute('dir');
		if (dir == 'north') {
			hor = true;
			start = 12;
			inc = -1;
			id1 = cpid({x: c_xy.x - 3, y: c_xy.y + 10});
			id2 = cpid({x: c_xy.x + 3, y: c_xy.y + 10});
			c_xy = cp({x: c_xy.x, y: c_xy.y + 7});
			cl = [id1, id2, null, null];
		}
		else if (dir == 'east') {
			hor = false;
			start = 0;
			inc = 1;
			id1 = cpid({x: c_xy.x + 10, y: c_xy.y + 3});
			id2 = cpid({x: c_xy.x + 10, y: c_xy.y - 3});
			c_xy = cp({x: c_xy.x + 7, y: c_xy.y});
			cl = [null, id1, id2, null];
		}
		else if (dir == 'south') {
			hor = true;
			start = 0;
			inc = 1;
			id1 = cpid({x: c_xy.x + 3, y: c_xy.y - 10});
			id2 = cpid({x: c_xy.x - 3, y: c_xy.y - 10});
			c_xy = cp({x: c_xy.x, y: c_xy.y - 7});
			cl = [null, null, id1, id2];
		}
		else if (dir == 'west') {
			hor = false;
			start = 12;
			inc = -1;
			id1 = cpid({x: c_xy.x - 10, y: c_xy.y + 3});
			id2 = cpid({x: c_xy.x - 10, y: c_xy.y - 3});
			c_xy = cp({x: c_xy.x - 7, y: c_xy.y});
			cl = [id1, null, null, id2];
		}

		updateCenter();
		
		for (var i = 0; i < 6; i++) {
			var di = start + inc * i;
			var si = start + inc * (i + 7);
			shiftLine(di, si);
		}
		for (var i = 6; i < 13; i++) {
			var di = start + inc * i;
			clearLine(di);
		}
		loadData();

		function cpid(p) {
			return xy2id(cp(p));
		}
		
		function cp(p) {
			if (p.x < -400) p.x += 801;
			if (p.x > 400) p.x -= 801;
			if (p.y < -400) p.y += 801;
			if (p.y > 400) p.y -= 801;
			return p;
		}
		
		function shiftLine(dst, src) {
			for (var i = 0; i < 13; i++) {
				if (hor) copyTile(i, dst, i, src);
				else copyTile(dst, i, src, i);
			}
		}

		function clearLine(dst) {
			for (var i = 0; i < 13; i++) {
				if (hor) clearTile(i, dst);
				else clearTile(dst, i);
			}
		}
		
		function copyTile(i, j, x, y) {
			var idst = dst.id('i_' + i + '_' + j);
			var isrc = dst.id('i_' + x + '_' + y);
			idst.src = isrc.src;
			
			var adst = dst.id('a_' + i + '_' + j);
			var asrc = dst.id('a_' + x + '_' + y);
			set('pos_x');
			set('pos_y');
			set('v_link');
			set('v_name');
			set('v_owner');
			set('v_pop');
			set('v_ally');
			
			function set(at) {
				return adst.setAttribute(at, asrc.getAttribute(at));
			}
		}
	
		function clearTile(i, j) {
			var idst = dst.id('i_' + i + '_' + j);
			idst.src = imgData['/img/un/m/t0.gif'];
			
			var adst = dst.id('a_' + i + '_' + j);
			set('pos_x');
			set('pos_y');
			set('v_link');
			set('v_name');
			set('v_owner');
			set('v_pop');
			set('v_ally');
			
			function set(at) {
				return adst.setAttribute(at, '');
			}
		}
	}

	function generateEventsMap() {
		dst.xs('//input[@name="s1"]').addEventListener('click', jumpNewPosition, false);
		var mouse = doc.getElementById('bg_image').style;
		var arrows = dst.xa('//area[@shape="circle"]');
		for each (var arrow in arrows) {
			arrow.addEventListener('click', shiftMap, false);
			arrow.addEventListener('mouseover', function() {mouse.cursor = 'pointer'}, false);
			arrow.addEventListener('mouseout', function() {mouse.cursor = 'default'}, false);
		}
			;
	}
	
	/*** Code to generate the screen ***********************************************************************************/

	function createStyle() {
		var style = dst.cn('style');
		style.type = 'text/css';
		style.innerHTML='\nbody {color:#000; font-size:10pt; background:#FFF; margin-top:0px; margin-bottom:0px; ' +
				'margin-left:0px; margin-right:0px; font-family:Verdana, Arial, Helvetica, sans-serif;}\n' +
				'h1, h2, h3, span, form, img, li {margin:0; padding:0;}\n' +
				'h1 {font-size:18pt;}\n' +
				'.f8 {font-size:8pt;}\n' +
				'.map_infobox_grey {background-color:#F0F0F0; width:100%;}\n' +
				'table.map_infobox_grey tr {background-color: #FFF;}\n' +
				'.c {color:#C0C0C0;}\n' +
				'.b {font-weight:bold}\n' +
				'.tbg {background-color: #C0C0C0; width:100%; text-align:center; font-size:10pt;}\n' +
				'table.tbg tr {background-color: #FFFFFF;}\n' +
				'.rbg {background-color: #FFFFFF; font-weight:bold; background-image: url(' + imgData['tbg'] + ');}\n' +
				'table.tbg tr.cbg1 td, td.cbg1 {background-color:#F5F5F5}\n' +
				'table.tbg td.cbg2 {background-color:#71D000}\n' +
				'table.tbg tr.s7 td, td.s7 {padding-left:7px; text-align:left}\n' +
				'table.tbg tr.r7 td, td.r7 {padding-right:7px; text-align:right}\n' +
				'.slr3 { padding-left:3px; padding-right:3px; text-align:center}\n' +
				'table.tbg td.ou {border-top:1px solid #71D000; border-bottom:1px solid #71D000; background-color:#F0FFF0; }\n' +
				'table.tbg td.li {border-left:1px solid #71D000 }\n' +
				'table.tbg td.re {border-right:1px solid #71D000}\n';

		return style;
	}

	function createInput() {
		var input = dst.cn('div');
		input.setAttribute('style', 'position:absolute; width:180px; height:80px; z-index:500; left:10px; top:465px;');
		input.innerHTML='<table align="center" cellspacing="0" cellpadding="3">' +
				'<tr>' +
				'<td><b>x</b></td>' +
				'<td><input name="xp" value="' + c_xy.x + '" size="2" maxlength="4"></td>' +
				'<td><b>y</b></td>' +
				'<td><input name="yp" value="' + c_xy.y + '" size="2" maxlength="4"></td>' +
				'<td></td>' +
				'<td><input type="image" value="ok" border="0" name="s1" src="' + imgData['ok'] + '" width="50" height="20"></input></td>' +
				'</tr>' +
				'</table>';
		return input;
	}
	
	function createTitle() {
		var title = dst.cn('div');
		title.setAttribute('style', 'position:absolute; width:200px; height:80px; z-index:500; left:10px; top:10px;');
		title.innerHTML='<table width="100%" cellspacing="0" cellpadding="0">' +
				'<tr>' +
				'<td width="30%"><h1>Map</h1></td>' +
				'<td align="right" style="white-space:nowrap;" width="33%"><h1>(<span id="x">' + c_xy.x + '</span></h1></td>' +
				'<td align="center" style="white-space:nowrap;" width="4%"><h1>| </h1></td>' +
				'<td align="left" style="white-space:nowrap;" width="33%"><h1><span id="y">' + c_xy.y + '</span>)</h1></td>' +
				'</tr>' +
				'</table>';

		return title;
	}

	function createInfoBox() {
		var info = dst.cn('div');
		info.id = 'tb';
		info.setAttribute('style', 'position:absolute; width:170px; height:80px; z-index:500; right:20px; top:20px;');
		info.innerHTML = '<table class="f8 map_infobox_grey" width="100%" cellspacing="1" cellpadding="2">' +
				 '<tr><td class="c b" colspan="2" align="center">' + 'Details:' + '</td></tr>' +
				 '<tr><td class="c s7" width="45%" >' + 'Player:' + '</td><td class="c s7">-</td></tr>' +
				 '<tr><td class="c s7">' + 'Population:' + '</td><td class="c s7">-</td></tr>' +
				 '<tr><td class="c s7">' + 'Alliance:' + '</td><td class="c s7">-</td></tr>' +
				 '</table>';
		return info;
	}
	
	function getStylePos(x, y) {
		var left = (432 - 36 * y) + 37 * x;
		var top = (-20 + 20 * y) + 20 * x;
		return 'position:absolute; left:' + left + 'px; top:' + top + 'px;';
	}

	function createContainerMap() {
		var div = dst.cn('div');
		div.align = 'center';
		div.setAttribute('style', 'position:absolute; z-index:50; left:10px; top:0px;');

		for (var j = 0; j < 13; j++) {
			for (var i = 0; i < 13; i++) {
				var img = dst.cn('img');
				img.id = 'i_' + i + '_' + j;
				img.setAttribute('style', getStylePos(i, j));
				img.src = imgData['/img/un/m/t0.gif'];
				div.appendChild(img);
			}
		}
		return div;
	}

	function getPolyPos(x, y) {
		var px = (442 - 36 * y) + 37 * x;
		var py = (33 + 20 * y) + 20 * x;
		return px + "," + py + "," + (px + 36) + "," + (py - 20) + "," + (px + 73) + "," + py + "," + (px + 36) + "," + (py + 20);
	}

	function createMapAreas() {
		var map = dst.cn('map');
		map.name = 'map2';
		map.innerHTML = '<area dir="north" href="#" coords="762,115,30" shape="circle" title="North">' +
				'<area dir="east"  href="#" coords="770,430,30" shape="circle" title="East">' +
				'<area dir="south" href="#" coords="210,430,30" shape="circle" title="South">' +
				'<area dir="west"  href="#" coords="200,115,30" shape="circle" title="West">';

		for (var j = 0; j < 13; j++) {
			for (var i = 0; i < 13; i++) {
				var area = dst.cn('area');
				area.id = 'a_' + i + '_' + j;
				area.href = '#';
				area.shape = 'poly';
				area.coords = getPolyPos(i, j);
				area.setAttribute('pos_x', '');
				area.setAttribute('pos_y', '');
				area.setAttribute('v_link', '#');
				area.setAttribute('v_name', '');
				area.setAttribute('v_owner', '');
				area.setAttribute('v_pop', '');
				area.setAttribute('v_ally', '');
				area.addEventListener('click', makeEventMouseClick(), false);
				area.addEventListener('mouseover', makeEventMouseOver(), false);
				area.addEventListener('mouseout', makeEventMouseOut(), false);
				map.appendChild(area);
			}
		}

		return map;
	}
			
	function makeEventMouseClick() {
		return function() {
			href = this.getAttribute('v_link');
			win.opener.location = win.opener.location.protocol + '//' + win.opener.location.hostname + '/' + href;
		}
	}

	function makeEventMouseOver() {
		return function() {
			doc.getElementById('bg_image').style.cursor = 'pointer';

			var x = this.getAttribute('pos_x');
			var y = this.getAttribute('pos_y');
			var name = this.getAttribute('v_name');
			var owner = this.getAttribute('v_owner');
			var pop = this.getAttribute('v_pop');
			var ally = this.getAttribute('v_ally');
			doc.getElementById('x').firstChild.nodeValue = x;
			doc.getElementById('y').firstChild.nodeValue = y;
			
			var info = doc.getElementById('tb');
			if (name) {
				var table = '<table cellspacing="1" cellpadding="2" class="tbg f8"><tr><td class="rbg f8" colspan="2"></a>' + name +
					    '</td></tr><tr><td width="45%" class="s7 f8">' + 'Player:' +
					    '</td><td class="s7 f8">' + owner +
					    '</td></tr><tr><td class="s7 f8">' + 'Population:' +
					    '</td><td class="s7 f8" id="ew">' + pop +
					    '</td></tr><tr><td class="s7 f8">' + 'Alliance:' +
					    '</td><td class="s7 f8">' + ally +
					    '</td></tr></table>';
				info.innerHTML = table;
			}
			else {
				var table = '<table class="f8 map_infobox_grey" cellspacing="1" cellpadding="2"><tr><td class="c b" colspan="2" align="center"></a>' + 'Details:' +
					    '</td></tr><tr><td width="45%" class="c s7">' + 'Player:' +
					    '</td><td class="c s7">-</td></tr><tr><td class="c s7">' + 'Population:' +
					    '</td><td class="c s7">-</td></tr><tr><td class="c s7">' + 'Alliance:' +
					    '</td><td class="c s7">-</td></tr></table>';
				info.innerHTML = table;
			}
		}
	}

	function makeEventMouseOut() {
		return function() {
			doc.getElementById('bg_image').style.cursor = 'default';
			doc.getElementById('x').firstChild.nodeValue = c_xy.x;
			doc.getElementById('y').firstChild.nodeValue = c_xy.y;
			
			var info = doc.getElementById('tb');
			var table = '<table class="f8 map_infobox_grey" cellspacing="1" cellpadding="2"><tr><td class="c b" colspan="2" align="center"></a>' + 'Details:' +
					'</td></tr><tr><td width="45%" class="c s7">' + 'Player:' +
					'</td><td class="c s7">-</td></tr><tr><td class="c s7">' + 'Population:' +
					'</td><td class="c s7">-</td></tr><tr><td class="c s7">' + 'Alliance:' +
					'</td><td class="c s7">-</td></tr></table>';
			info.innerHTML = table;
		}
	}

	function updateTile(i, j, data) {
		var img = dst.id('i_' + i + '_' + j);
		img.src = getImage(data.img);
		var area = dst.id('a_' + i + '_' + j);
		area.setAttribute('pos_x', data.x);
		area.setAttribute('pos_y', data.y);
		area.setAttribute('v_link', data.href);
		area.setAttribute('v_name', data.city? data.city.name: '');
		area.setAttribute('v_owner', data.city? data.city.owner: '');
		area.setAttribute('v_pop', data.city? data.city.pop: '');
		area.setAttribute('v_ally', data.city? data.city.ally: '');
	}

	function createBG() {
		var img = dst.cn('img');
		img.id = 'bg_image';
		img.setAttribute('style', 'position:absolute; width:975px; height:550px; z-index:400; left:0px; top:0px');
		img.border = '0';
		img.src = imgData['bg'];
		img.useMap = '#map2';
		return img;
	}
	
	function generateWindow() {
		var head = dst.xs('//head');
		head.innerHTML = '';
		head.appendChild(dst.cn('title'));
		head.appendChild(createStyle());

		var body = dst.xs('//body');
		body.innerHTML = '';
		body.appendChild(createInput());
		body.appendChild(createTitle());
		body.appendChild(createInfoBox());
		body.appendChild(createContainerMap());
		body.appendChild(createMapAreas());
		body.appendChild(createBG());

		generateEventsMap();
	}

	/*** Help functions ************************************************************************************************/
	
	function $rnd(num) {
		return Math.round(Math.random() * 1000);
	}

	function DOMUtils() {
		var obj = new Object();

		obj.document = document;
		obj.context = document;

		obj.initDocument = initDocument;
		obj.initResponse = initResponse;

		obj.cn = cn;
		obj.ct = ct;
		
		obj.id = id;
		obj.xs = xs;
		obj.xa = xa;

		return obj;
		
		function initDocument(document, context) {
			if (!context) context = document;
			this.document = document;
			this.context = context;
		}

		function initResponse(response) {
			var ans = this.document.createElement('div');
			ans.innerHTML = response;
			var ansDoc = this.document.implementation.createDocument('', '', null);
			ansDoc.appendChild(ans);
			this.initDocument(ansDoc, ans);
		}

		function cn(tag, content) {
			var elem = this.document.createElement(tag);
			if (content) elem.innerHTML(content);
			return elem;
		}

		function ct(text) {
			return this.document.createTextNode(text);
		}

		function id(name) {
			return this.document.getElementById(name);
		}

		function xs(expr) {
			var res = this.document.evaluate(expr, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			return res.singleNodeValue;
		}
		
		function xa(expr) {
			var arr = [];
			var xpr = this.document.evaluate(expr, this.context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; item = xpr.snapshotItem(i); i++)
				arr.push(item);
			return arr.length == 0? null: arr;
		}
	}

	/*** Data functions ************************************************************************************************/

	function getImage(src) {
		if (graphicPack && !forceScriptImages)
			return src;

		src.match(/^.*(\/img\/un\/m\/.*\.gif)$/);
		return imgData[RegExp.$1];
	}
	
	function loadImages() {
		imgData['bg'] = 'data:image/png;base64,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';
		imgData['tbg'] = 'data:image/gif;base64,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';
		imgData['ok'] = 'data:image/gif;base64,R0lGODlhMgAUAMQfANHzpLbEoPb/5NH9eo7eLe390tb8iOb+t/L+2979oNv9lLPqa6HkScPwg+j8w9z4se39zKnmWrTwU6nrRr/1X878csf5ap7mOZPhLIrdIYLaGHHQAH/YFMDAwND9dP///yH5BAEAAB8ALAAAAAAyABQAAAX/4Pd1ZGmeaKqunTgGXizP9GDb8Z3jdB8HrQ7M5zMojkeDMblUGAZEGrATrRkSh2w2gd12DwkFtBojkXPXQ0HARjjUAjfcnRiTzef0esPfICACfAV7Gw51Zx54VQMKcHwQCHwIgX6Ub2KIilGMB5QQB4B8lJ5gBoiJHRWqq6yqnJZZo32SYAOtt6skFru8vbyNkYVYwcGzhgO+ybwkFM3Oz84GD8EOD9OSj9QAA9DdziQS4eLj4g0ABYIPDpTU6BsFDw0U5PThJBP4+fr5FOYQkpbcWRPYQMK+g/hIXFjIsCFDBgvMOZj1AMDEDQAs8gHQgIHDjwtJYBhJsmTJCxEWVmRc2UBlxpYsI1wwSXMkiQw4c+rcSQDigp8LIjBIGXToT487k+YkoaGp06dQmxKYOhUnVatVo2ptSiIAh69gw4odS7asWQ5AXpxdy3ZtWhEs4sqdKyIEADs=';
		imgData['/img/un/m/d00.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAP7HAaF7AqzXgJzLdPXvsdzszH+oU7jhksXkp7TozN26Fcvmstjy59HOlbTTonhWGLuPEZG3dNHpu8G/h8PdroW6X8ffm9XpweL38YKPSa+yfL/int/tz5/FiXGPjImIY9vlo6mfbs/jvtnrx4V3PNK1XLqlJb/w4rWfVerhpXHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoBAYmCiIwAAI6PfYiNK5OTKyuReyorAZwAnaWijZZ1iKaTHK+wmpyIc5GZHAAcBbu8u5udlXChoq66BSPIIg7LI7uvmqlujKa4FCIjF9kSFBEGER0UzQW4s6pltrnGEssS7QvvCAIOCBQSF+KcorRkrMQAx8guuFuAoOCGDQURvGuHbBwHaMHCMArQ6phACQscdHBwcEMEAQdCdlRoTxy5U+a0YOKE6xjGZQgifAh5oIMCBR8ykBjAc4CA/wUMm5ED9ilLv026kGGM6cGACRMaHGhQMOlmAA0MEoDY2gDovXGdIHrCMtHUilcuCXbwQALCJggBTFBVQKLuhwsEQEywQPLrQ1koUzZBV0pEp6RLPZJ48GEuBBQfQqCoG2JxigYMTghACFRo2HypBCPB1KqUg04WJSDYUNODBw0TJtRF0aDBhBAPSEwg0GBABQYMDnCW4DlsK4qii0w8ZfxwWtYDTjh4rYFEowAoUmifkIIAAZ8DDGDoIByBvXEiKFgr3WnfEVa/mneS0CHCAOEDEjCIkOGD9QAQKFCCdwQSkMJHvmHAwH0KfUVBBxCeZhYq7gmxkizyhUXTAQIgkP8fBgbo1JZbVZmg3YkIVoDBCfcdYF4zFyhDwQXybRLRcvlk6NwFGzhwwIcGVCCAAA3ctAkACgTwQXf28bQieAIQB5aOgFESDCajYNjcBRTANKQAH0pggAUgNGBdgEgG8MAD3YEJ5gkVtLiBlH/paGM0Q0QCWHMiVOBNBwixVkECGCAAQgomqJlbBoo+gMJWPGXlk3CdTZnhJKMUZcRy8o3gAAULgIoAhxVYYGAGBhhAAqrWrfkABCE0AEICCQwQwUcbLHDPM8blQ0mFo02j5Y6qbUDmVgxgkIAAGTxg32KMOQBcAxeARNOcxX0GWnLvhRLfWcdQ8BMCDoCZwAkYYODhQAQaoaCBfulqNgEIFpSna7amZAKsE5xqAu6nGB30Y37nnpCsgifQytOQe3HmVytE7QsFaRgilhh0PFWgscY9cTiki14J9VB83EbByiilJHURQauxtuGGHR0UskP5IufFhZrsgs1ACcV8UEIL3SPyKZWUbIWwm+i8M0bvNN10OyWJjKHEN6+UclIBZSOQQDMiY9JfVhp9cyaaoMWL1106cIEzvJYSkRpH5QMLByN02YEIr5yCKdVoWE3lNVriKUdZw/ZKiSd8txE3c3q/jQeWpcTnyCHTYIo4JBMlzofmWQQBADs=';
		imgData['/img/un/m/d01.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAIW0X6vXgZzLdZxrEO/MDNzsy/XvsbjhkcXkp7Pny8qlEMvmstjy59HOlbPToYaMV5+BKNHou62oe8PdrgbXAcffm9XpweL38WRZKeDu0mZwU7/inpq9fXGPjNvlo8/jvtjrxreiVwNzAL7w5Orhpd/tz3HQAYhUBMHszr+/hHHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoiIomCiIwUFI6PfYiNKxQrmpyReyorIpMZpaWcjY54iCsZFBklsbIlrpMriHORjbCxBb6/vrGnlXChGaMUvb4gIB8Oz7/ClKptJiKlyQUTHyAW3hETAAAcAhMgwSW2uGiI1sklvhHPFhERC/cIAQ4IE97nBcJErRvDSlS2Aszo2VuAoOGGDQ0R3ItggRlAWtMGfmEkohWFZQoXOODg4OEGDgEOqDQpkeI/jJtubZT0Ch5CCyL3cXig8gAH/wUKHjyAIKCogAAL6r3MwEmgRisFN8FaZg8BgA4AgKZwIIGAV68QODBA4aFsg6QWgjHVlMlSFY5NeSGsyqGDBghfFUBQ8HXA0AcWDHhIUaFlWoBNbd1y+0SXrQ+t4HVjeFKDhgdfIYR4ICEEBM4PMJBoMDYAxKTnaDVt2uipEkycYq5w0OpmBAQbfHboICFFCggDQjRokEICBg0pDDQQAIABgwOnKwJcm5iSTCYcZa+eCsJebgEjEvCWAHxAcBLoU5AwYOAo8wspIVIE+GHCttUxXQ9hpXg1pwwRCEAOdAIkwAAAQmlgHlAhsOegASSg9B4DAhwgkXQTcKAhbf61xv8YbP6FmEFPKiEgAAoXIGjZXl8RoAB6MAIQwHsjVGhhBOdY4Ew/IdpCzCKN9Bfif/BYsIEDBxSYoowBNNCiVwr4tR45RV1Q44wB4DjdkP5llAgmHXG5ggUTPJNPADMmcAEKAFTgQQML8kXAACecsB6W4AFg4wZaliBmbKK0RkQkmmjHyQfikANRbgCoiYAHJOhVJwTA1XlCCGUVxUACR0G3gHSqcWndJ0dkFyIIDkywgKoIHBBAmxA+oKKsClqqWQMeoICCgCht8OlFYlKiXxEg+jcVPbi5WRYDFyQQQGh60nmcA841YEFKPfGZGnWxxUSNE/xpJ9kESCHgQJojXHDhwUjPhCCBgeqOEEAKHlQA3YXb4tcWY+AGGRc8qXr3XYEJjDACsxcwMAIKnB41bwXR5btaJfxCAaJUktVD2cDMiSOOUa6iaSFaqammWMVUsDJKKZKF5FBuJJJo0kMkX8TUNNdxgQnGIGnM0MszR5SUSyWvRXEYjMSmTEI+3+P0RBRVVLQ6KHfhWE02JeTN1uBI/RItrgiaBlws2wSMNvOgA/YmP6oRVStlxwJCmQ58IMzNwlZ9xs6ymWIKNzej8m0ccP3J1mJ6sxGVobG1vYqpgAp0SNKTdDSsHmBefkniWQQBADs=';
		imgData['/img/un/m/d02.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKzXgJzLdP2np+/MDNzszPPsrn+oU5BfCbjhksXkp7TozNGkBcvnstjy59HOlbTTolxYPKl7GJG3dNHpu8G/h8PdroW6X8ffm9XpweL38d/t0IKPSa+yfL/inp/FiXGPjIeJZd/ioqyfZs/jvtnrx4R7QsWkV7ymKr/w4nHQAOHu0/8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KSmGLCkrK4mCiIwCAo6PfYiNKgIqmpyReykqK5OcpZyNjniInAIarq+vk5uIc5GNsAS5urmworRvoaKTrrkkxiMPySS8rpSpbYwqGq0EFSMkGNkTFRIGEh4VywTNs5Zmtq0auRPJE+4M8AkADwkVExjirqe/Y6vC6sawvWOQoGCHDgUTwHNnbJwGTY34fWG0glUxDO8eeHhwsIMEAAhCdlR4L5+mTSrMbcFESh0BEhMYJEsgAURIBB4WLACxoUSA/58BADBguOxhqUoqq/hDCRAmQQkfDJw4weEBhwFYsUbg0EABgxAhHAzFN66Us5RYKJoi5jSBhw8QImRdEOFE1hJ4S2AoEILCBZJkjZ70lLQJuk0jpAGMmcAjBAggskYwAULECbwiSkAo4KABCgAIhxYVfLTSE0ysSj2Q9hJjY5wfPnCgQKHEAREOHFAQAaEEBc4BLDRogCD0hKKmWFFCy4QiyuSsnXZAEADFA9kcIhw4MBls3xAFCgQNYCCDh+IJ7o0bUcGaKZQSi6wiBZ3TBA8SAhQPoKCBhA0glKCdTiaEZ2B4HwWXQQP6KURWBR5EuFpyEamEWn3J3YQAAAnwl/+BAT0JuEBWA5wAloEJWpABCvohkN4yGCBTAQbQkWLaIo3QhyEn6mDQwQPUKfChBQAA4ACJWC1wAAgIArXieAAcV9aOZlW4iFo7YlDBTEUC4OEEBlwQVgQR6ITVdhCA56WXKFjQYgdSklbfJqiYE8lgyY1ggTceIDSdBUImAN4J2h1QwgaF3gbWT10FVZxoU2K43CdHOAcdCQ9UwICmCWxowQXhbWCAAYeSut12EeAWggIKBCDBRx0wgI8+kt6oxIXJEeNaB2KC1UAGCgCwAQT5oQnCA8M5gAFIN8E5WnL0PePEfM9FV4FQCTzgpQIoZJDBAxJoJAIH/Xn7GQUhXIDKnqzIvZdJfNPmuBYBmcZ0EHX8cYvCrwuiwOpPRfoVWmDQIWXFhZuw9U5j0wFlwcMPA7VhkS6O9SyehVGxyiiKtbYwwxqG3NFBFjvEyrtesMTjRQMlNPJBCS2Ez8W+wLtSRZoQ85JAMcHjs8/ulDTaNOWUcdgrO2OTDUYYzRgQMw85k7EYWCKtS0BbPoAB1FHXzMZSPMKiAQlbejBCL5PYCo0k1eZJQmqiSBsHllROajMwwejo7t21WAq33KBEk3ZKU+eBidqQFK5FEAA7';
		imgData['/img/un/m/d03.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKzXgJzLdJBfCfXPBdzszPPsrn+oU7jhksXkp7TozNKmBMvnstjy59HOlbTTol5aPKl7GJG3dNHpu8G/h8PdroW6X8ffm6ez/tXpweL38d/t0IOARK+yfL/inp/FiXGPjAAk/4iMXt/ioqmfbs/jvtnrx9y+NL2nJb/w4rWfVXHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCogIImCiIwXF46PfYiNKxcrmpyReyorIJOcpZyNjniInBcarq+vk5uIc5GNsAS5urmworRvoaKTrrklxiQOySW8rpSpbYwrGq0EFCQlGNkSFBEGER4UywTNs5Zmtq0auRLJEu4L8AgADggUEhjirqe/Y6vC6sawvVuAoGCHDgURwHNnbJwGTY34fWEEglUxDO8ceHBwsEMEAAdCdlR4L5+mTSvMbcFESh2BEhIWJEMQIUTIAx4UKAgRYkOA/58BACxguOxhqUoqq/hDCRAmwQgfDJw4wcEBBxMDspqAwIFBggUiRDQYim9cKWcpsVA0RcwpAg8fHkDIOkABhBN0BWzYi6GAiAkWSJY1etJT0iboNpGQBjAmAo8PHoTAujVFiBEp9o7Y8KBAAwYoACAcWpTw0UpPMLEq5UDaS4yPcX74wGHChA0CUjRoMGHEgw0TPAeowIDBgdESippiRSktE4ool7t22uFAABQOaHOAIEAAhBRh/4ooUCBoAAMZPBxHcG8cCQrWTKGUWGQVKemcJHiIEOB4gAQM1NQTdzqZQN6B5H00XAYM9KdQWRR4IGFry0Wkkmr4LXfTAQAg8P9fBgbstQEECtA1wAlhHahgBRmg0N8B7C2DATIUYCAdKagt0sh9GXKiDgYdOGBdAiBWAAAADWBlogIChJAgUC2aB0ByZvV4loWLrNUjBhTMdCQAH0pggAViQUBiiUwK8MB4YIKJQgUvdkClafhtgoo5kRS2HAkVeOMBQtVVQCQC453AnV4jdpdbWD95FdRxpFWZYXOfHAGddCU4QMECmyLAYQUWkBeCASFuEKKi3o3QgAgJJBBABB91sAA++kyaoxIYLkcMbB2QGRYDGSQAAGf8dSeZA8U1gAFIN8lZ2nL3PeOEfdFNR4FQCDgAZgIoZJCBAxFolAIHAHob2gQiWLDK3qzKyZcJfdPuyBYBmsZ0kHX/cYsCsAyi0OpPRwI22mDSIWUFhpu09c5j1QFVwcMPA8XhkTCS9ayeh1GxyiiMvbYwwxuG3NFBFjvEyrtesOTjRQMlNPJBCS2Ez8W+wLtSRZoQ85JAMcHjs8/ulFTaNOWUkdgrO2OTDUYY1RgQMw85k7EYWiKtS0BdOoAB1FHXzMZSPsKiQQldekBCL5PcCo0k1e5ZwmqiSBuHllZSajMwwfDo7t21XAq33KBEk3ZKU+eBidqQFK5FEAA7';
		imgData['/img/un/m/d04.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKzXgJzLdP2np+/MDNzszPPsrn+oU5BfCbjhksXkp7TozNGkBcvnstjy59HOlbTTolxYPKl7GJG3dNHpu8G/h8PdroW6X8ffm9XpweL38d/t0IKPSa+yfL/inp/FiXGPjIeJZd/ioqyfZs/jvtnrx4R7QsWkV7ymKr/w4nHQAOHu0/8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KSmGLCkrK4mCiIwCAo6PfYiNKgIqmpyReykqK5OcpZyNjniInAIarq+vk5uIc5GNsAS5urmworRvoaKTrrkkxiMPySS8rpSpbYwqGq0EFSMkGNkTFRIGEh4VywTNs5Zmtq0auRPJE+4M8AkADwkVExjirqe/Y6vC6sawvWOQoGCHDgUTwHNnbJwGTY34fWG0glUxDO8eeHhwsIMEAAhCdlR4L5+mTSrMbcFESh0BEhMYJEsgAURIBB4WLACxoUSA/58BADBguOxhqUoqq/hDCRAmQQkfDJw4weEBhwFYsUbg0EABgxAhHAzFN66Us5RYKJoi5jSBhw8QImRdEOFE1hJ4S2AoEILCBZJkjZ70lLQJuk0jpAGMmcAjBAggskYwAULECbwiSkAo4KABCgAIhxYVfLTSE0ysSj2Q9hJjY5wfPnCgQKHEAREOHFAQAaEEBc4BLDRogCD0hKKmWFFCy4QiyuSsnXZAEADFA9kcIhw4MBls3xAFCgQNYCCDh+IJ7o0bUcGaKZQSi6wiBZ3TBA8SAhQPoKCBhA0glKCdTiaEZ2B4HwWXQQP6KURWBR5EuFpyEamEWn3J3YQAAAnwl/+BAT0JuEBWA5wAloEJWpABCvohkN4yGCBTAQbQkWLaIo3QhyEn6mDQwQPUKfChBQAA4ACJWC1wAAgIArXieAAcV9aOZlW4iFo7YlDBTEUC4OEEBlwQVgQR6ITVdhCA56WXKFjQYgdSklbfJqiYE8lgyY1ggTceIDSdBUImAN4J2h1QwgaF3gbWT10FVZxoU2K43CdHOAcdCQ9UwICmCWxowQXhbWCAAYeSut12EeAWggIKBCDBRx0wgI8+kt6oxIXJEeNaB2KC1UAGCgCwAQT5oQnCA8M5gAFIN8E5WnL0PePEfM9FV4FQCTzgpQIoZJDBAxJoJAIH/Xn7GQUhXIDKnqzIvZdJfNPmuBYBmcZ0EHX8cYvCrwuiwOpPRfoVWmDQIWXFhZuw9U5j0wFlwcMPA7VhkS6O9SyehVGxyiiKtbYwwxqG3NFBFjvEyrtesMTjRQMlNPJBCS2Ez8W+wLtSRZoQ85JAMcHjs8/ulDTaNOWUcdgrO2OTDUYYzRgQMw85k7EYWCKtS0BbPoAB1FHXzMZSPMKiAQlbejBCL5PYCo0k1eZJQmqiSBsHllROajMwwejo7t21WAq33KBEk3ZKU+eBidqQFK5FEAA7';
		imgData['/img/un/m/d05.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKzXgJzLdJBfCfXPBdzszPPsrn+oU7jhksXkp7TozNKmBMvnstjy59HOlbTTol5aPKl7GJG3dNHpuwHq5sG/h8PdroW6X8ffm9XpweL38d/t0IOARK+yfL/inp/FiXGPjIiMXt/iogCgnqmfbs/jvtnrx9y+NL2nJb/w4rWfVXHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoiIomCiIwTE46PfYiNKxMrmpyReyorIpOcpZyNjniInBMarq+vk5uIc5GNsAS5urmworRvoaKTrrklxiQOySW8rpSpbYwrGq0EFSQlGNkSFREGER4VywTNs5Zmtq0auRLJEu4L8AgADggVEhjirqe/Y6vC6sawvVuAoGCHDgURwHNnbJwGTY34fWEkglUxDO8ceHBwsEMEAAdCdlR4L5+mTSvMbcFESh2BEhIWJEMQAUTIAx4UKAABYkOA/58BACxguOxhqUoqq/hDCRAmwQgfDJw4wcEBBxMDspqAwIFBggUhQjQYim9cKWcpsVA0RcwpAg8fHkDIOkABhBN0BWzYi6FACAoXSJY1etJT0iboNpGQBjAmAo8PHoDAujUFiBEp9o7Y8KBAAwYoACAcWpTw0UpPMLEq5UDaS4yPcX74wIEChQ0CUjRoQGHEgw0UPAewwIDBgdESippiRSktE4ool7t22uFAABQOaHOAIEAAhBRh/4YoUCBoAAMZPBxHcG8ciQrWTKGUWGQVKemcJHiIEOB4gAQM1NQTdzqZQN6B5H00XAYM9KdQWRV4IGFry0Wkkmr4LXfTAQAg8P9fBgbstQEECtA1wAlhHaigBRmg0N8B7C2DATIVYCAdKagt0sh9GXKiDgYdOGBdAiBaAAAADWBlogICgJAgUC2aB0ByZvV4loWLrNUjBhXMdCQAH0pgwAViQUBiiUwK8MB4YIKJggUvdkClafhtgoo5kRS2HAkWeOMBQtVZQCQC453AnV4jdpdbWD95FdRxpFWZYXOfHAGddCU4UMECmyLAoQUXkAeCASFuEKKi3o3QQAgJJBBABB91sAA++kyaoxIYLkcMbB2QGRYDGSQAAGf8dSeZA8U1gAFIN8lZ2nL3PeOEfdFNV4FQCDgAZgIoZJCBAxFolAIHAHobGgUhXLDK3qzKyZcJfdPuyBYBmsZ0kHX/cYsCsAyi0OpPRwI22mDSIWUFhpu09c5j1QFlwcMPA8XhkTCS9ayeh1GxyiiMvbYwwxuG3NFBFjvEyrtesOTjRQMlNPJBCS2Ez8W+wLtSRZoQ85JAMcHjs8/ulFTaNOWUkdgrO2OTDUYY1RgQMw85k7EYWiKtS0BdOoAB1FHXzMZSPsKiQQldekBCL5PcCo0k1e5ZwmqiSBuHllZSajMwwfDo7t21XAq33KBEk3ZKU+eBidqQFK5FEAA7';
		imgData['/img/un/m/d10.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKF7AvzHAnCvR5PIaabWf83Xqe7trtzsy7GFHMrls8yqDsTkp9Xy8X5WDcrJmKesmNDourbTod7t0I6Kbrrgl+Du0ou3bPD79NXqwcnr3IK9WLLeyaqwecC8koKQRaPGhOLKTK2bPs/jwNzhpJ6baNjrxse0anZuR7OsSN7FKXHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoAAImCiIwBAY6PfYiNFZOTKyuReyoVAJOaEhIBFaKNlnWIFaeTB7KyppsViHORjbWzJb4lspsSorhtF4uvowGyvxjOz7+0lI7GjLwBvs4Q2xgR3ty+B7bFZ7rLB9kFIhAJCQsLIhYCFh8J4OIBw5VlrqKTJdpKeHu3gAKFAghFKFxgDwIGYAdOrWLlhRGAWtgwbHO3AGGEgh8moXjgoACFd/YeBuPk6QumSRLEaUwQYYTNEJMUcAiRYlMA/wUnInBk+BAYy0oUqyDqtAndzIIUCDhAkCIFCATKcp444aEDgwwGDNhUOWzFtJZXLDKNCZDdu6gYHpzo0GFqiBMmUgCd8ABBAw5iHQh1CGzYpk7koJgLsOKVrKdRCWRYYYFEAQcdSJiY4ODEhAlbt5IYEeErQwiFRbQT0WniE0xMOYlgi8GdQckSNBBogBkBgg4F6Hbg8JmEghQWCGhgIIIosAQfokcwSwntEouMO2mPEBMygQ0MBhDw0IDEhEYhwqrncALnzwEalg/GcACDCG8YqGdPXGTpYe2dVOCUbRRokMEFBAygQAAkoICAZeqFJdcEIIAQgngDMPBRAmRVAP+gWa3tQ8RL1H0Y4IBQLdeBBwvm5EBJBYQ1glgPPDABCQ0AIB4DHzgXkYcm6icidiwFSRuBBnKAQAgL7rUVAgpE6cAIFjxAQiO+fcAjQzT9GKR+0+CCySglfiggQAQOMJ15E3p2QlYKYOUBaFA20EBpAzAklJdBbtIINUNEot+H3XwDFQEfZBDBAB90YIAD0THZogJ2cjCCByggmoFuPpZl4iSjfHIEdh/GM089UA2wQQYUzPgBAeMBkCMAWNk5mgEERDDZACdxWBiQZVLC36iMxNaYQOoQmOCMI2gggHgeeHACBxG8aWcIH8SYgQS8nkafKUD+B6gT/nHiWAlu2RT+lgMlbADfANCS8IEAAHgmbwfMEtBrh9qdNWwTpGriFDvrJihABl9lkMEGDG8QQQGrIgxBXTadVhgsrYlKBWzUPeZWQQnGpzADJF9wAclf0fPBChSUtA1EsOy3xVLKMPPUoSE7K8DO8THqjTspwaxJI9bNLElMGc00lEFMN30SPA2pJI6HSIXBSCqbAKQRO0MRRFA7KUmN8b8VvXRONltvo/bazoQTkUTjlrPLKcw0A40I0dByCjFJmdGPMLPMQlMEEOUDi4humJ2KKaYcQNMHs5Gywip0qEVdKpiLgA8AnpCduAqxZQeiWYjjMSZj4vZterGgdg6JRZ5fojoXQQAAOw==';
		imgData['/img/un/m/d11.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAJmXapLHaqbVgfLMAaBxD9zsy83Xqe7trsvltM2oDsXlqdXy8crJmK+VK6esmNHougfXAnKrSLfTot/tz+Du0nRuSrfglHxWDvL8+dbqwcnr3AR0AbLeycC8kqLDg+DHNoK8WtDjwNzhpNjrxr2yboOKSsbqxsDioHLQAdzx3HHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCobG4mCiIwQEI6PfYiNFBAUmisrkXsoFBuTFBOnE5yNjngqohMQpwWzs6eTm4hzriiNsrQjwCO0BaejuW0YLK+kELPBGdDRwbWUrGwYvLbOIxkP3ggZEuLeGcCzpcdnu6TbGQYhDwgICgohIBEBHgjkwsSplWUQqWrGrdsIcfROKJRg4F2IEArkPShHrVG6L4w22ALWLZ6CEw0lKLDgYcAAEg4YGFAY0Vs/WBA8WeKCadKEAtziSRDBs4HJ/wQkAHww+bOCBAQn6IGjmMpTpZlWEHmKdTPnPAsWBDBo8KFrAwJEBySoUKFEhwUaDhzgyZTCimqfsGT0ZApnt3kjBZhwUKFDh60NKpD4MLaEAwIXAKxlcHSisKaTZEJ1EonZiroF7p7IKkBDChAADDDoACAogwoAAJAlC0CEBLQtH4eQF8IpQMqMpnpaEaKqx82dPwu4MJoAgQ4G/HYImjrBBxACQCwwEbsAAg/YJbylFJdJxpi7PUm42e1jVg4LAggokbiEccVq1Xqo4FNsABDSBSiYmDmEuAy7gXdREVJFFh5dds2zGQieCRBAAgMA8FVo8anFl1AfNKBeAAuIBP/OY24daNuAmIh4IAUJjmSBdB2UAOFPDKhkgFoirOWAA6kZp94CHpywD4gmbrfCbd+BF6RvV62oAQkENADhWAAQQF8CVDIgAgA4GpcAAR7w6CMCEhATYpBvWZQIJhuQeVmKWAWgXWoXllUBWD99VUIJcyZwwQWvBeDjUWKSGdMqM0Ui5IHhjGOeAB5oIEE+HRzAAHZOvqjnBR6IUAIAjGoAnY8PAGkid6Ac8d2B9uCjz2YWBMCBBifU6IEAAkRgnHFf7dnaAQJI4JmfEbU16m1KlBgeBQe9o2BWAdQoAn7q3YmaBHPu2YAHM/5qQVL8FRMgeNbgdmhdI3jEk1oMjMD3wX0BRAuAB7aW9W4HzgqQ1IeBTtXIJ5M1cSq5d6HrYAQaoKWBBhwkzAFDrxZswl88VXdKeE9FldtbN2X22wkO4nfwAiBjgAHIaEHnwQonqORSLZoIuIVUpGRs1UfAdXxPBDhD2+tRLYXKMlz9XlGTzB3hpRCrWCV9dD37OMbykKVitAEnzdhVNF70ZJ21RE4TE9mAYCDCyyTtdPQN19449hIsFqmRESrbcCRNCNPUAosxQZMhkCZwD2OdOGvDRGwbNW1iCtxgetCbJm61rcu+dHEieQgFaJJm1LqoMJWR4VECdh1oGglu3naUOMnlpLeS0eeHpJ5FEAA7';
		imgData['/img/un/m/d12.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAPyopnCvR5PIaabWf/LMAdzsy5RkCM/Vp+7trsrls8yqDsTkp9Xy8WZZNMXGlq6EGqmxn9DourbUot/tz+Du0o6Kbrrgl4u3bPD79P8BAdXqwcnr3IK9WLLeyaStfIKQRaPGhODHNq2bPs/jwNzhpJ6bZtjrxsGzhHtyRratTXHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoZGYmCiIwAAI6PfYiNFAAUmisrkXsqFBmTFBOnE5yNjniIpgCnBbKyp5ObiHORjbGzJr4mswWno7htGIumpACyvxrOz7+0lKxsGIy1zCbOEdwaEt/dvrKlxWe6ywW+GgsjEQkJC+wXARcgCeG0qZVlrqPL2hoimPgWb4EFCxIOHBjBcMG9CBqACZtW7gujDLXUcYO3QKEEgyAIEEgBwcEBC/HuRZQGwJMlLpgmTUgXMIEEEjhFiFTgQUQI/5E7UUjg6DAisFSeKr20gsgTrJna3Bm0MMDBgxBYHxgASkABigYfIDDYgAABzpVIp33CctGTKZpSDQ7QAKFBSasiUKQI4bXCia8ezDoYCvEohRWTXC51cq7l2wI15Q7YsOJCiQMOHJQ4UeEAigoVUIhGUYKEhLEOBQob8W5E0n2MGTn1tGIEVA3wDk6mwGFAAwcnHjw4gfmEcdAlFIS4MIADgxFFgSUAQV0CYkprmVxsSduThJmRqXZgIGDABwMlKhgwIKKsew8odHYVwME5YQ2QR3zTQJt7xSJNJdadWzTlZgEHG2AwgAAKEFBCCg9c5l5ZdVWAlQjlCcDARwmgdf/YgK/9hwmIA1JQ4FTOOfBBgztlplBZJJgFAQQVlLBeeQyAEJ0wH4KYGGzbcUfiCrcZiGBwIjTYlwEoPKDAkweQcIEHNhogHAg5OmQTj0P21wgumGTQ5QomamOgANalB19ooW21k1afNamAAb+R59BQXA7Z0iovRXIdiN6AM9UAIGwggQAgOICAA9QlyeKcDXhAwgcpELpBbzsiRSJ2oByx3YAjzFPPmR1sYEGMIAxgnlZWirAeejEOIAFlAqDUoWGbwqbEiN1RMBA7Bi4YIwkcBFDeBx+g4IEEKLwqAggHILABBbWmht8w/XFHTWx/kgmVVDiV5YAJHdAnwLEegBDvAJ01JjrsALZ66KWY/zHWiGO3uSPuggFsMNYGG3QgcAcJlepvBJnhlNpRE3SnFFOyITYTZHFRRR+C/jLAAAYYaDxWPSCsYIFJ3EiUioCLVdEUKRNHxZFuC9YXwMwB1IfoN/CoZLImjWQHkyQtb/NOQQcVbTRKwOLD5cNgMMIJOgBtRFRBBb2j0koTtVSvRTFBHTU3YIcNkVH5UKTGRahkow40I0RTNjEp8yOKJmkHU4BNEphcCyVbp9E1J6jMZBMItmly2Jd0tOUWJ4yPUADPn/TtRlPdDsh33Ll8OtsK2/Ix4iT0Yp5HmJJfIroWQQAAOw==';
		imgData['/img/un/m/d13.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAHCvR5PIaabWgfLMAZRlCtzsy83Xqe7trsvls8yqDsTkp9Xy8XJpQcrJmK6FG6esmNDpu7fToqe0/d/tz+Du0o6Kbrrgl4u3bAEl/vD79Nbqwcnr3IK9WLLeyaqwecC8koSOQ6PGhODHNq6cQc/jwNzhpJ6baNjrxse0arOsSHHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoYGImCiIwSEo6PfYiNFBIUmisrkXsqFBiTFBOnE5yNjniIphKnBbKyp5ObiHORjbGzJ74nswWno7htGYumpBKyvxrOz7+0lKxsGYy1zCcaENwIGhHg3Bq+sqXFZ7rLBb4aBiQQCAgKCiQXABchCOLAwqmVZa5GLdO27QS4eQosWIhgwB0JEgriQRgnrdG5L4ww1GLXbV7DCAlDDBiQ4kEDAxbm6YPAb8IkT5a4YJo0Yd02BBFK6BwxMoGH/xEiRvZkEEGeSmfAUnmqFNMKIk+wamqDl9CCgAYORGh1QEDogAQMGID4sGDDgQM6KSqd9glLRk+mbFJNKADCAwYfPmAdwQCFCLAVHhAg4AFtg6ITk1JY8fJTUyfpJKyIW+AmXQEbVlwwYaDBBxMoKjRgUKFC2LAmSkQoG5GlMBLxSCz9B5kRVE8rSEilqhAzBQ4CGHh24OCDgbwfPJQ2kUDEBQEcFkDUBwxBiOsRGFNqyySjZNyeItS0bLXDggACQBAwUWHwiLPwPTDg+TUAh+gC9GmoTAKcBtzfXVTEU42BN5lN8ijEwQYZCBBAAgOYkIIDnMF31l0VaDUCegEsAP+SN4oZiJtFTWEiooEUIFhVdB+AAGFPDZxkwFkloPXAAxWYMBh6C4TQWognvkSbd9+duMJuCVqwoAcOjAAhYAQw4EACVDZQwgUP6EgAcSH0GBFOwixmJFQkLvLWmClqk2QA2bGHIWkMdNUTVyCYNmWUqwUQUVFhjinZKjFFop2I34RTlQAhbBBBACF8cEAD1zn5YgKDeVACCCkgugFwP/YZJAaOPSaEdwbWc08+VQXQwQYW1BiCAOlxtaWs69UoQASZBZASiJ4aSImAR5gIHgUGuZOkgzWWwAEA6IEAAgMeRBCneyHMuAEFura23zAAfkdNbYNOhqQCOp3VwAkd2Bf1QLMmhABAlDk2mqwAu6olJmONODYFqXFNhYC5DgKwQVkbbNDBwR0wtOrAEOilU6engMeUU7YxVlNlc1ll34IDL7BABhl4XBY+IaxgwUnctKRJgFs8RcrF/s5jFawbA2AzAPcxCo48K6nMlqhXzATzNvAYVZVCSCM9D2z70LLYxGAwwok6BHVjNEIIxbMSRcK8BCxGM1FdNTdFr0T2OC25ZJEaGaGSDTvQkBANLS4RAzQZAUV1cTA4RZC2S7/ejY4km5jiNk4h6KbJ09/GceZknEROQgGagApKHU+F6ytteWBCCoBLCY65bZNYLvodnn99yOlYBAEAOw==';
		imgData['/img/un/m/d14.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAPyopnCvR5PIaabWf/LMAdzsy5RkCM/Vp+7trsrls8yqDsTkp9Xy8WZZNMXGlq6EGqmxn9DourbUot/tz+Du0o6Kbrrgl4u3bPD79P8BAdXqwcnr3IK9WLLeyaStfIKQRaPGhODHNq2bPs/jwNzhpJ6bZtjrxsGzhHtyRratTXHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoZGYmCiIwAAI6PfYiNFAAUmisrkXsqFBmTFBOnE5yNjniIpgCnBbKyp5ObiHORjbGzJr4mswWno7htGIumpACyvxrOz7+0lKxsGIy1zCbOEdwaEt/dvrKlxWe6ywW+GgsjEQkJC+wXARcgCeG0qZVlrqPL2hoimPgWb4EFCxIOHBjBcMG9CBqACZtW7gujDLXUcYO3QKEEgyAIEEgBwcEBC/HuRZQGwJMlLpgmTUgXMIEEEjhFiFTgQUQI/5E7UUjg6DAisFSeKr20gsgTrJna3Bm0MMDBgxBYHxgASkABigYfIDDYgAABzpVIp33CctGTKZpSDQ7QAKFBSasiUKQI4bXCia8ezDoYCvEohRWTXC51cq7l2wI15Q7YsOJCiQMOHJQ4UeEAigoVUIhGUYKEhLEOBQob8W5E0n2MGTn1tGIEVA3wDk6mwGFAAwcnHjw4gfmEcdAlFIS4MIADgxFFgSUAQV0CYkprmVxsSduThJmRqXZgIGDABwMlKhgwIKKsew8odHYVwME5YQ2QR3zTQJt7xSJNJdadWzTlZgEHG2AwgAAKEFBCCg9c5l5ZdVWAlQjlCcDARwmgdf/YgK/9hwmIA1JQ4FTOOfBBgztlplBZJJgFAQQVlLBeeQyAEJ0wH4KYGGzbcUfiCrcZiGBwIjTYlwEoPKDAkweQcIEHNhogHAg5OmQTj0P21wgumGTQ5QomamOgANalB19ooW21k1afNamAAb+R59BQXA7Z0iovRXIdiN6AM9UAIGwggQAgOICAA9QlyeKcDXhAwgcpELpBbzsiRSJ2oByx3YAjzFPPmR1sYEGMIAxgnlZWirAeejEOIAFlAqDUoWGbwqbEiN1RMBA7Bi4YIwkcBFDeBx+g4IEEKLwqAggHILABBbWmht8w/XFHTWx/kgmVVDiV5YAJHdAnwLEegBDvAJ01JjrsALZ66KWY/zHWiGO3uSPuggFsMNYGG3QgcAcJlepvBJnhlNpRE3SnFFOyITYTZHFRRR+C/jLAAAYYaDxWPSCsYIFJ3EiUioCLVdEUKRNHxZFuC9YXwMwB1IfoN/CoZLImjWQHkyQtb/NOQQcVbTRKwOLD5cNgMMIJOgBtRFRBBb2j0koTtVSvRTFBHTU3YIcNkVH5UKTGRahkow40I0RTNjEp8yOKJmkHU4BNEphcCyVbp9E1J6jMZBMItmly2Jd0tOUWJ4yPUADPn/TtRlPdDsh33Ll8OtsK2/Ix4iT0Yp5HmJJfIroWQQAAOw==';
		imgData['/img/un/m/d15.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAHCvR5PIaabWgfLMAZRlCtzsy83Xqe7trsvls8yqDsTkp9Xy8XJpQcrJmK6FGwLq5aesmNDpu7fTot/tz+Du0o6Kbrrgl4u3bPD79AGgntbqwcnr3IK9WLLeyaqwecC8koSOQ6PGhODHNq6cQc/jwNzhpJ6baNjrxse0arOsSHHQAOHu0////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/KiqGLCoZGYmCiIwPD46PfYiNFA8UmisrkXsqFBmTFBOnE5yNjniIpg+nBbKyp5ObiHORjbGzJ74nswWno7htGIumpA+yvxrOz7+0lKxsGIy1zCcaEdwIGhLg3Bq+sqXFZ7rLBb4aBiQRCAgKCiQXABchCOLAwqmVZa5GLdO27QS4eQosWJBgwB0JEgriRRgnrdG5L4wy1GLXbV5DCQlDDBiQAkIDAxbm6YvAb8IkT5a4YJo0Yd02BBJK6BwxMoGH/xEiRvZkIEGeSmfAUnmqFNMKIk+wamqDl9CCgAYORGh1QEDogAQMGID4sGDDgQM6KSqd9glLRk+mbFJNKCACBAYfPmAdwQCFCLAVIBAg4AFtg6ITk1JY8fJTUyfpHqyIW+AmXQEbVlwwYaDBBxMoKjRgUKFC2LAmSkgoG5GlMBLxSCz9B5kRVE8rSEilqhAzBQ4CGHh24OCDgbwfPJQ2kUDEBQEcFkDUBwxBiOsSGFNqyySjZNyeJNS0bLXDggACQBAwUWHwiLPwPTDg+TUAh+gC9GmoTAKcBtzfXVTEU42BN5lN8ijEwQYYCBBAAgOYkIIDnMF31l0VaDUCegEsAP+SN4oZiJtFTWEiooEUIFhVdB+AAGFPDZxkwFkloAUBBBWYMBh6C4TQWognvkSbd9+duMJuCVqwoAcOjAAhYAQw4EACVDZQwgUQ6EgAcSH0GBFOwixmJFQkLvLWmClqk2QA2bGHIWkMdNUTVyCYNmWUqwUQUVFhjinZKjFFop2I34RTlQAhbCBBACF8cEAD1zn5YgKDeVACCCkgugFwP/YZZAaOPSaEdwbWc08+VQXQwQYW1BiCAOlxtaWs69UogASZBZASiJ4aSImAR5gIHgUGuZOkgzWWwAEA6IEAAgMeSBCneyHMuAEFura23zAAfkdNbYNOhqQCOp3VwAkd2Bf1QLMmhABAlDk2mqwAu6olJmONODYFqXFNhYC5DgKwQVkbbNDBwR0wtOrAEeilU6engMeUU7YxVlNlc1ll34IDL7AABhh4XBY+IaxgwUnctKRJgFs8RcrF/s5jFawbA2AzAPcxCo48K6nMlqhXzATzNvAYVZVCSCM9D2z70LLYxGAwwok6BHVjNEIIxbMSRcK8BCxGM1FdNTdFr0T2OC25ZJEaGaGSDTvQkBANLS4RAzQZAUV1cTA4SZC2S7/ejY4km5jiNk4h6KbJ09/GceZknEROQgGagApKHU+F6ytteWBCCoBLCY65bZNYLvodnn99yOlYBAEAOw==';
		imgData['/img/un/m/d20.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAPrIBMvmsq1ZBqqzoKKABdTpv7DUkuDu0c/y98uSCvfvt7rl84m2a3LQAuLQXNPOkrPKsIiOfnxiJZbBdHisWaWpgrvYqsm5beTYio+HSrCJR6LHhL2nV7/in8Tr5Gt4aMvlw+rknO/MGaOmQOTdppifdNW4D7+9js7t1tbenNvsybvhyP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/DQ2GLA0EBImCiIwAAI6PfYiNB5OTBweRew0HBJwAKiqlKo2OeIidm6awpq+Ic5GNsqYFursFIr6mlXChqZO5vAUBycenjZZrjLgiu8nKFgYW1AG6vqW0aLbSBRYlIyXI1CsgGwwQECDZAb+p3mOIwCYYISkmmxXtAxUCCqwwYACEdMq2NXPmhREBU74spAghgYODByVOnAi4oeOEDSUoMChRwt8CEBIdYHCgwtMXTMV6JQORIsIJDA8eGDDQoaeB/xEmRkQIutNABX4iTJCQV4lhlVaaAISjhsJDhgsPEiTgUIEngwz8JpnI0LPDhgRSHbzTxYyAyysOXanQFcDAChQRKlS8QEDABgMbCYQFkCADgQw8I3zIeWIBCm0FNnWiB8UWJ2MBzOLtCrKEhKsdMSTQkCFpBg0cJFTYsBEDBg4lELx7FwBEp4VPMLkqBoJuXRALVvdMVkGE1BEAsJ4gqUE1CQUhPGPQICABBATJPFqI6tbpEYcAOolXYeFchwl4Bww/cSFBWBMEsCp4QKK+AgUTQug9kUCAatkFoFReVOF54p0QrUgm3gFznWMXAgb1VAADWm1yGAESYHDfhiRQMP8ABiOUU8IGFZykjCniFYgbETBFtWAnDWY2gQcI+COhAg5oUAIHGpB22n0hcEDCCR+UMNQkI2RW4godQNbSixZ6Ax4nL8JI13k0+mMABX9t+MAJGlxwH3UC+BfCAx98kIFUJmRWwgIWbOBklZtQEgwmo7i4YIwdMLBCjQNMwECXIdz33IanlRnmAxHkdcEFn3XwZpxOPpniJKo4EwmBe4pzzQQUeBBBCTxpo4ICvjigAAkPKHBCBNTlxQGjJ3BQ5mgDIDCBCpUuiCkAn3zXSIEwgsCASILSmBdPBeDIT1A6QSCBBBGUKYAGJGSgrVYCZHBSqWydUiAllCGhW1SwXGP/7IyiVpBCTu5t0l9q1MJK7XOMElBYBB5MYMCJ4qp4oLmhvDJXMjttsMJyX3omgL79+ZdmBBKQdIKhCnxQAQgIoFCqqW0ZOAV4EJm3QQqsAlRCBhJMMMEIZUpQ0MwApVDCBdoWasAETcYjQktNWaHbKdJAUOhrHiyQV6MZTGCYBB8wUNYGAxhZQQQL1BpCCP/6XMpbWbQyigkhvHbBzhYg4IHGJHHA1UAVaHQ1jSi4zEEKyoiQycBPMSLCAfEgfCyNaq8wQKOKTcwvAh0zwFMHFqxUwDzlcgGNCr6IUNc6DHjgOeOgh+4BChY43rXPKlT+Eia++OYRA7BTIDuyHRWVVZDeq6Th0FxTwWPAX3/tlFAvlLNhD9HhHFOXAQ2G40swb8CECiyTBxAnCJj/nErucsSFbizYY5q66tGHwqkrrkCfB57hKcg9H7phKnIgeJLvh/1bBAEAOw==';
		imgData['/img/un/m/d21.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAMznswl3BKqzoNXpwKBaCODu0vDLCrHUkRDXCHLQAs/y98ymDvbvt7yBFrrl84m2a9POkrTPrIaMepbBdNfGYXisWaWpg8Hbsr6rY+XYjodyM52MUaLHhbWfQ7/in8Tr5GZwYMPmyerknJ6xPePdp5afeErcL7+8is7t1tbemtvsynDhRf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/CQmGLAkBAYmCiIwICI6PfYiNBQgFmpyRewkFAZMFKqanjY54iJwIp6+mk66Ic5GNsAO5urmvlXChKqOuKrsDAMfHuyqUqm2MscS6yAADFwcR09QDkyq0aLYIuRclHSXGyBchHA8RESHZvMHeY4imoykiKQsG/BbtAhYCCrQgQIC7d8kGmGg07wujALEAXMAHAgMFCCVOnAjIoeMEDiUqPChRwp+DEBMhHFihooAlLpi45UKWImMGCCoPeNh5YMSC/xESfh4YaoGfgQUkqNn7lIWVJlPnjqH4sAEDhAYLMFjQ+WCDUX4adnrgsM8AhXe8mLnE8pAT1GMHQqCQYEFDhxMNCHA4sBGr0QUaNGzQKQEEzhMOUGhbtsnlyyfgNkE1NhZFyQMgSwim0DFDgw5eAVclYIHDCQwZMmAooQDthQsDODF8rARTK7fSAMR1UHrnsaL8Rhg4AeFEiQ0dSJNgIKIEgQzJG0RQINHjBU2U1jJ52JhTqQjnPEywLMD3CQpl+TW4yAACifcMGEwQURcvAQ0WqIuD7b1xwyKskOIdbufEpYBBvj2wQHoNbNCABhnEJyEJFQgAXTklcGDBScmYMv+gbL4QYduHA0YDgHgfKODPTgMwQMEGJWCwwYwaNBCfCBiQcAIIJUhgVAcnbniBB4uRSEqI3HVHookoqhjBARXsJWFxVcW3AQFYaiACBCCA4NVRJ5bgQAQcdEhif7Mt0taZpczkwQMhqCjABA9IKUJ8y0k4I5YbXCQBXRYRIMEBYpLZYUsfbpLKS5Fg9yEx1kQwQQUfkKTTMSowwA8FDJAAAQMnSHAlXR1AIMEJyRHQQAMCKDCBCocmGoBjtAnBXYkDPCASnSnSpVOLFPyoUgSBSZCXqiTQuCoBG5x0aTwDUvLfESO6RcwBsD0wwQcf0JUCTgv+RQAGGvBorAYSLGf/6qobSPDBBAfEKmAzTgQoGTFwYRaCccVppipWWXZZGEkC4MkACBYMoAAKlyq1TCbTNsHdZMeMlcJNAB2nwQQTXIllQSADVNMJM955wAREOiwKU1TYtkwuEdyp2gcO0PXnBh3fB8IDYnEgQI8WSODAaSKIEC813GjXVCijXCCCaiecfIECHyBMUgdaDWSBRkGniALHGKSQjFq1XhFTAdMcoGuKVIcgwJ9/CuyuAgs/oJMHB0Q4gDwRa/HMy3Ct8wC3bNNtON0foBCB3UcDwE3fXUQ2EwAePWB5BZjv2tFQjW/DkBoPRTN52nvtNRQyubgSIugJQFPM5E++PsnqzkgyMcwpe19gKDTB0BvHmrCYAkAsELFcSyiOGkn7HZiM0p9sZTPPCHazQp5H89bzkX0WQQAAOw==';
		imgData['/img/un/m/d22.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAMzmtKyzndXqwferpODu0vDLCrDTkc7y98ymDpdkCvbvt8GGEbjk7/sIBIm2a3LQAsnEjbTPrIySiWlhN5bCc3isWaipgsHbst3IXsS5ceTUj4yMW8hDBKmZSJ56PODcpaLGhL6nV7/in8Tr5JmhdnWBdsTmx+rkn56xPc7t1tTXmNzsy////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/Dw+GLA8NDYmCiIwDA46PfYiNBAMEmpyRew8EDZMrpaYrjY54iJwDp6+TrohzkY2mAri5urillXChqKS7AgDFxbuUqm2Mpa66xgACFwYR0NECpLNotQO4FyQdJMTGFyYgDhERJta5qNpjiL0WKicqCAX4FukBFv3+FgECqFt3DFujd18YNWgG4AK9CSEwQCABwUA/EBgpgCBRwQEJEvoYmLjwQYUGDaUsccE0KVcxEx8kQDhZ0YCImwZQIECxYaeB/58W8BVA8CFar09ZWGlagQtaihEeMmhYgCCDBZsONgjF5+GmCBD3CmBYxysZAZVUFBIo1RSAARMpJJBIECJDggQgDGSYG3aoBw8bbG4oAaEwgxTXVkzyhNYJt01siX2Ne3Ujib8ZME7t0MFvhxAJrkKwcDIEiQNkL1wQwOlg4ySYWnFaca3YWwYBQNwsFhQfigIZVEzc0GGChQ8KTszV0CHBgggHGma8oInS2SYKN3GaHWGcCApxA+yGkKFvgQXBFdD7gFwBhRMWJkBYcNcCam+rt2tHWITV4u2ztfXWAQLt5gACfS2wgQcJaKDAgw9+UEEAzIVDAggWiFTQCgC25v8LEbF1CCBTklEwwgH63CSAAhiEE0IHf3mwwIMnhPABBCWQUIJQHQAgQoYXiJAYhwAu9mF22okYmY8mohiBARXkBaFwHWTwIIMccOBBPSVMoNVQPpLAQAQgHFOKiK24tohaaC4pggMmoBgABQ5IeUKEECqwYJYeYKBCCRJYkAEGCWwggphkmklkkaIcBKJ/Sa7F1DQRUFDBCBJIYFMxKyiADwYKfOAgBHsG2oEKEgQAmnMLBHAABbQZtWiaZ/E3RHYjAuBAR3SeWMJVIqyIAY8VRTBBoR5kucAHGyy4AH0biLQpL7NSYqsRIc7GlAEX6GoipvOoYE9fCNA1wQQSLAj/2J0qODvYCBQYsGF1rb0GWyiLkWibASCYEABFE931bLkJnAvoBB8FQKMCvwpwQAqbymrWtUxkt6SPIKhwIz8dbDABBRQ0d1dAJPNzaAbN3mkABUIOWYm9jjGjGC4R3KlBCCMwEGi6G1CwQcElOOAVCP9uYEEJDEAQwgknyBsNKddpEc8oF5xwcwYrX3AAAzl+FEII//TDjwUSnJgCyCGocMzEXrBEADQG7HriASP4m6kEJeSN99wpOGDTTQ7i8nIYMndj2zkOjKD4AYw33vgIKUTgt9MAZAPzSix1M05GDnRewee8YvQT5QYps40tz1jD7+o/GYNLNx+qEY9iJO5SO8yTw0wS+zKSuBKZACtc8OQ1vjtKSyavmAJAMwshRYdS/3Vo7eVxYDKKfvUewkh1DdQKiUIU+xH+FkEAADs=';
		imgData['/img/un/m/d23.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAMvms6iyotTpv6tbBAYr+eDu0fDLCrDTkae29s/y98ymDvbvt72EGbrl84m2a3LQAtPOkrTPrIiOfXhhJZbBdMHbsXisWaWpg9fGYb6saeXXjZN/P6CSVKLGhLulSb/in8Tr5Gt4aMPmyerknZ6xPePcpZegdr+9i8HJ187t1tbemtvsyf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/Dw+GLA8EBImCiIwICI6PfYiNBQgFmpyRew8FBJMFK6anjY54iJwIp6+mk66Ic5GNsAK5urmvlXChK6OuK7u5AMfFK5SqbYyxxLrHyBUHEdIAupMrtGi2CLkVJh4mAtcVIh0OEREi19gCpr5kiPEBKiMqCgb7F+sBFwADXggQgF27dwJQNOIGhhGBWAAq3JuQAQMEEydOAOzAkUIHExYcmDDRr4EIiRBKoFhRwBIXTNqMHVMh4YQGCBAOHPjA8wAJ/wUkJADVeeDCPgMKSmCL9ykLK02mZAJIAWJDBggMFGS4sNPBhqP7NvD80EGfAQzteC1ricUhp6jlDohIIcHEBA8nBgzocOCEiQFmkW4YvFNCCJwnGqR4p2xTS5dPvG2CC4AsXa4fTQzGwFEDAw4cBHPwMIHriQwaNGQwkSBthQoCOC2ErARTq7fRAMhtcKEDz2NG95EwcAKCX9ClSywYYdfzAAYREkTsWEETJbZMHDrmVCpCucoULv8+gSGwAQYWF6QsoXwBhREXJpxgMKC0dHCwuTtmaIQVKe64fSdXAgXxJIADCgT2GQMTaLDAgw+WYEEAGoA2UgcXmISMKQDKJv/PELZ1CCA04IGQQD8GLoABByZkANpgDDw4QgYlnBCCCRIcxUFlGVbwAWMikiKPdtuJSOIHFJjYzwEW8AWhcRxk8OAGeg2wwQgQhBBCaEhVZkIDEXQApIitzLaIW2SWYswHDohwYgAUOODkCBFCuAAHVA7AgUUSSHBBRQNI8MGXYTLGUoebpOJSJNZ1SAw1EVBgAQh17bTUAvtgsEAJECxwggRU+ukBBDV5oBcDDASQAAUrGIooAY/RJoR2Ix4YUpwm+rmTACoeNWo1E0wgAX3PlfAiqlaaZCkvh5bJHxIhvmXKAbA5kCSlF6iAU4JHKTBABsH2ycAGEihH6gafSQD/AgUHbMjSf8w44d9kxByjUwci+GWcXc9lpdcEWkowwUgnyLhACBcIkEAKli6lTCbPytvIMDKRpQKn/+A5AQUUcPAvQSD/o0KLoNF5AAU/OixKU1TYpkwuEdCpgQcgNOBnnxtQQCXADozVQQA4XiBBA6eNMEK72GiDnVOhjFLBCDOfcHIFCYCA8EgeeCAQQBkJbWIKHGegAjJryXoFTAVgY68DkyZQtQgB9NlnwOq6nYIDO/HkIDyVmO3UQy/HlY4DIBTu9uGIg5BCBHgjDYA2EX8hmUwdOWC5BZjfyhFRyAiwjN9hOASNVNIcwBdfOnXueTCRl0GPMqMXA0AEB8TuNDklrXcjyTCnwFMB7QA8E0y8caAJiynBP7xN7s2E0miQH65C620rH8KIdbAyL72ZhWifRRAAOw==';
		imgData['/img/un/m/d24.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAMzmtKyzndXqwferpODu0vDLCrDTkc7y98ymDpdkCvbvt8GGEbjk7/sIBIm2a3LQAsnEjbTPrIySiWlhN5bCc3isWaipgsHbst3IXsS5ceTUj4yMW8hDBKmZSJ56PODcpaLGhL6nV7/in8Tr5JmhdnWBdsTmx+rkn56xPc7t1tTXmNzsy////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/Dw+GLA8NDYmCiIwDA46PfYiNBAMEmpyRew8EDZMrpaYrjY54iJwDp6+TrohzkY2mAri5urillXChqKS7AgDFxbuUqm2Mpa66xgACFwYR0NECpLNotQO4FyQdJMTGFyYgDhERJta5qNpjiL0WKicqCAX4FukBFv3+FgECqFt3DFujd18YNWgG4AK9CSEwQCABwUA/EBgpgCBRwQEJEvoYmLjwQYUGDaUsccE0KVcxEx8kQDhZ0YCImwZQIECxYaeB/58W8BVA8CFar09ZWGlagQtaihEeMmhYgCCDBZsONgjF5+GmCBD3CmBYxysZAZVUFBIo1RSAARMpJJBIECJDggQgDGSYG3aoBw8bbG4oAaEwgxTXVkzyhNYJt01siX2Ne3Ujib8ZME7t0MFvhxAJrkKwcDIEiQNkL1wQwOlg4ySYWnFaca3YWwYBQNwsFhQfigIZVEzc0GGChQ8KTszV0CHBgggHGma8oInS2SYKN3GaHWGcCApxA+yGkKFvgQXBFdD7gFwBhRMWJkBYcNcCam+rt2tHWITV4u2ztfXWAQLt5gACfS2wgQcJaKDAgw9+UEEAzIVDAggWiFTQCgC25v8LEbF1CCBTklEwwgH63CSAAhiEE0IHf3mwwIMnhPABBCWQUIJQHQAgQoYXiJAYhwAu9mF22okYmY8mohiBARXkBaFwHWTwIIMccOBBPSVMoNVQPpLAQAQgHFOKiK24tohaaC4pggMmoBgABQ5IeUKEECqwYJYeYKBCCRJYkAEGCWwggphkmklkkaIcBKJ/Sa7F1DQRUFDBCBJIYFMxKyiADwYKfOAgBHsG2oEKEgQAmnMLBHAABbQZtWiaZ/E3RHYjAuBAR3SeWMJVIqyIAY8VRTBBoR5kucAHGyy4AH0biLQpL7NSYqsRIc7GlAEX6GoipvOoYE9fCNA1wQQSLAj/2J0qODvYCBQYsGF1rb0GWyiLkWibASCYEABFE931bLkJnAvoBB8FQKMCvwpwQAqbymrWtUxkt6SPIKhwIz8dbDABBRQ0d1dAJPNzaAbN3mkABUIOWYm9jjGjGC4R3KlBCCMwEGi6G1CwQcElOOAVCP9uYEEJDEAQwgknyBsNKddpEc8oF5xwcwYrX3AAAzl+FEII//TDjwUSnJgCyCGocMzEXrBEADQG7HriASP4m6kEJeSN99wpOGDTTQ7i8nIYMndj2zkOjKD4AYw33vgIKUTgt9MAZAPzSix1M05GDnRewee8YvQT5QYps40tz1jD7+o/GYNLNx+qEY9iJO5SO8yTw0wS+zKSuBKZACtc8OQ1vjtKSyavmAJAMwshRYdS/3Vo7eVxYDKKfvUewkh1DdQKiUIU+xH+FkEAADs=';
		imgData['/img/un/m/d25.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAMzns6qzoNXpwKtbBAvp4ODu0vDLCrDUks/y98ymDvbvt72DGAainLrl84m2a3LQAtPOkrTPrIqMcnZhJpbBdHisWaWpg8HbstfGYb6rY+PYj499P6OSUaLHhbmgP7/in8Tr5MPmyXB/eezkm56xPVrqyNbhnePdp5aee7+8is7t1tvsyv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/Dw+GLA8MDImCiIwEBI6PfYiNBQQFmpyRew8FDJMFK6anjY54iJwEp6+mk66Ic5GNsAK5urmvlXChK6OuK7sCAMfHuyuUqm2MscS6yAACFwcR09QCkyu0aLYEuRcoHijGyBchHQ4RESHZvMHeY4imjSYjJgkG/BbtARYCCrQQIIC7d8kElGg07wsjBrEAXMA3IQMGCChSpAjYoSOFDigqOECBwl+DEBMhfCixooAlLpi45UJmIqMGCBAOHPjA8wCJ/wQkJADVecACPwMJTlCz9ykLK02mzh1TAWJDBggLEmSwsNPBhqP8NvD80GGfAQzveDFzieUhp6jHDoRQUXKChxQDBnQ4sHGAWaQbAu+UIAJnigYqtC3b5PLlE3CbohojS5crSK8bMHTUsIADB8AcMkyw0CFFBg0aMqBAkPbCBQGcGDpWgqnVW2kA5DYgzfOYUX4kDKSAkAKF59EnFIxAMUGDhwELIiCQ6PGCJkpsmTxkzKlUhHMfKNAN0DsFhr8GFlxUAOGEewUKKIywMCHFggGjp4t73Z1xwyKskNLdbefIhYBBvTmQwF+dLdAcfBCeUEEAGnhGUgcWnJSMKQPG5v8LEbV1OGA0AIQHAgL+8CSAAhhwgEIGngW2AHwjZHBCCiKgIMJRHJSY4QUfKCYiKR9ux52IJJqIYgQHVLAXhMSFBt8GeQ2wwQgQiCDCZ0iViEIDEXSwoYj9ybaIW2SWMtMHDoSAYgAUOPDkCPAlB6EEVA7AwUUSSGCBRQNI8MGXYW7YUoebpPJSJNd1SIw1EVBQAQgk7XTMCgrwg4ECJ0CgQAp4BmqBBxiZltcCCwSAAAUrGIooA43NJsR2IwrggEhxnujnTiticBSp10wwgQT3QXdCjKgGepKl8QxIyX9HhPgWMQe85gAFIIDgpwk4LXhUAgOINiyxG0iQHATEdib/AggUHOCqgM04EWBkxMR1QAchFEccc9BllZewIkgwAUkB1KmACBYIgIAKli61TCbQNrGdZMeQhRoEAHGwwQQUUMDBvwWFDFBNoEpA5wEUBOmwKE1RUdsyuURAZ2ogNOBnnxtQQOUEGzgwVgcBoHBzA6bl4y413GTnVCijXDBCaimgfAECIORIkgceDBSQRhZIcKIKHZ+WzFqyXhFTAdMccOuJVIcQdJ9aBrwuAgs7sNMHB2iggADyRKzFMzDHtY4D2bJN9+F0g6BCBHYfDQA3fncB2UwAeOTA5RVkjmtHRCGzDUNqPBQN5WnvtZdOnm/TNxv1LDP6LscwWcw2z5b9M40kw5zC9wWFQhNMvHGgCYspAMQCUcu1hNLokB/mgcko/cVmux21TQJr5M4/hD0f22cRBAA7';
		imgData['/img/un/m/d30.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKBmB/vIBK/Rk9jrx6OABM6bBODu0fXsttTy97rU1I2Pb62zksDZq9LKls/lvGhfNXLQAqDKgWqUUK+oevzdQLC9rIe6Y4yDVcBFBtO5apV1NKKVYO3KGeTfrpmmi+HXmkyaCrePMWx9dYOTlPXjgvP79cW7irOnV8Hj49q5Ccu2LJ2cef///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EBCGLBAEBImCiIwBAY6PfYiNBpOTBgaRexAGBJMOFhIWEQ6ijZZ1iJ2bAwMCDA4OA5uerW+RmbiywMEcw7KVcKGiKQHACyEpJ7bRtsCUjm6MswUpBAwDDAAFARQmFeUVCQkopiocy4hpvcsqkxwTHisAkyoXCgsTExskgBhogcGHYu/IvBpAYBiDBxsaNFixoIKICxpEjBhxq9TAjx7SoeDAalcXRgRkDROAwoOJDw0OHPCwUYGIBwo8dGMQQYKG/wsSFpwIMKzdAE9fME2SlYIBggQaTjQIUeBAgwUeKigYceKZgg0rFBCYMEKBsgAqRiJMiOWVJqLeBDxV8CCECQAAZHZYIKDChHmTUlwQoUFABMISJ1RAIKsa0isoYcly4LTCCg8XwGqIeaDDgQ8hRk0qoEHDhgre/klcsCIB41y6psQLYAAY5acXnDVl4KEBCQoSIhzQEGIDhxSmQwAw4XnChQ8rintAgSJap5JPMHVywGlyNxQKchfAcEFAg78pVKRI8XnFiswPLkzoUOKAguViT7RGYDgCg7cEPLYESrQZ8F9tk0WA2wobbKDBBKCJFgBpGVi1gAlgNdDBBxIcsP+ABhxsEMAJFTHGQDdvFciWEa/A1gmCtihYzgAVebDABwSEMA9pG+Ql049WSfAAhARoU0AIfaFgoCwvFogdEUq99eKLCVqAgAcOLIAXcRt0cN4GJ/zUQQckHGCCXhWdYsIDRWKAgXvUdXPUlCkas0gjLtJZJXjfEACAnxp0YKB7zHWggDicmdCPCDqGMEEIGIQApwECMDknLJtgh8koUk45mQVWZkVcI8Vd8OKGBKwXjl4NeHCTBuupYNNpFSgZgSwMCDBlpqxA2WJ3uXbjQARWanXBAw+UBhGQHbA5HgYTkAChCSKIoAAFFIRwlC2LCVDpLKpgOsonRxBoQCmnpFL/yoIMwncABxSQENN5kF4AgJsaWDWCP8ppsIA3KCDgH5OcaGKnEtrVRks0tyKwwAW8TbBAB84EkEIBnFmFkZsbZADTAj0WWd4CAgtwCy4FW5NdKLEMMKyCKKwgwQA/qhDOaACc8JmiGrw5wQkwTVBAAQD8FPCJBGeyYnZ41sbBy3Nt2EGPfw69ZWcaAKBAz5F6tmEGOLnmHzGikEuFdrg8HUEEXk6ggGUbxOdB1gA8UMECyCqwtZidydSAa7QMo+IWr4zCgUwfSBwWluFVkHV8K9yk0QPuVcCAPwpoeIC3DpAUoEltSUJzBk6h4zY/DACkEwPmVFTOAgooloADDXxQnSZDZnvBiNMcWPkUAyZMEJYCl9m4wPH/yO4aAg4IcAIHAywNRi8OKYgAdQkAf6E/ylMXMAIWmOw56GOgJIsKviOgPgIltF/C+uuHzwD0lZSwxkJEpWAYLd9f3zyxKggcSaSnBqUswxu5MgyowieAFECPISqTQ2TeEgyXoexzBOQFMlxUIEpkcA6bog1sIsgH7UwCg5BAyQcvQT4uBAEAOw==';
		imgData['/img/un/m/d31.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsALNMB67SkOHu0tfqxNOmBPbtuPTLBtXz97rU0hDXCI+LZK6zlc/nvrF3BL7aqNPLl3LQAmyUVK+peaDKgQl3BPnbQFFjTbLArIa5ZI53ONzszNG3LXleIqGaalybE7KFOOrjrZqjheLZoG59dIiSh/P79fThfreiQMq8gcHk50OXA8zcuf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EBCGLBAUFImCiIwJCY6PfYiNAgkCmpyRexACFJMMGBEYEysajY54iBoaCbAaAwEODKqTsohzkY2zA8HCw8GwlXAQxpO0AwsfBicM0tMMwpStbYwaAR4bJysDKwAEBhUoCxfpCAgppg7LvGi+CQMbBvcSCyEN9xsKCgskSOjgoaAHDClorYo35tUqeg4sdHjwIAS6EQo+jCBBolopFSA9qAjBLsU1hl8YUaCVgEGAFCFQUCxQIARHBSMsKAjhYICD/wkRMoyIsODEPQbLNFjigmlSMAcODiDIIOHBBwIgHui7wPHEhg4kOthsIIEjOQMbUlRbiNIKIgGxmDkIIFUBhw8oGgCgKWJBgAsS7N0jIDRDgAkjMsiUcOFAsGsCllJRCZcZg6gXxGZQ0CHDA5ogCog4wW9whgwdLvgUSFEfAscDJnmS7GSeLMtRp14l4GBFiAcmKkSYACLDCQUGCHf4wAFFaAkfHiwXmyLFihUMODVqqwQTp+yVB1zWkOLfVQAZLjwIjBYtCBEhOmTkQBVEiQJ2UShoIPb14QkOaEJJZE2otIkAAcIVDAMT1BWfAlSJ8EFpySlWgFYoiPWACCJEUP/AAhn4Y0A+jWkA1QCcdBIZbUO8JVuK4UnTIDrNXGCRCA14VWEHHNDkYwFZRWCBBDgSYOQHFyyQAoIDwAKjKMcQ4d2TKcIi3gQYHBDCCgs00IBxHWQlAWengQCCCQWgABo6p6DAQQMEAAAAdSn05CSMskVp4IFUWskgQgo44OWgGawggG8dOCcCchV8liYJC4xwwgkfQAfAB9QJEECTtFCpyXaJYEKBpzFikGUIF2QwYQOYKpDiAEUSwA9fFeWUgZEbkDBCakpqMEGTKwTw5CasLBWJgJz4ZMuVWV7wDwf0ZcBBBz+K8GacAEhgApEojLBRBRV8AOwKjQWwqYmGpjj/4CdHGChAKaekUkpdHci3WY/lmPDZeh9cKid6WUEKHX0LaLBCCgcseycnlHBnxJS13ILdBAyksEAEDoSQDwhGDebohRnJiZcIWnXgJWFJpjBBAGvFciA2tYWSVDATNJhCBxEM4OMGZyXHgQTv6dcvCRKcQLIEcNKnAMInNgmZw0wY6GfNdb0HgsknEwBtBkBKG/KlIgApgpsKvAZgy5Ww+AQmsNDDIHHrKZCZXTv1C22SHEiU0WYrmEnTA/7dsgyBWrwyCgN85SNfCAz8k2oDHHCW00YSoepAQAo8EJq5SP2itluS6IxCbgiM+Q+iW5KbDjqsK8AYAivMBMIAaYehjk0sAzQoVZIDKUBCCMAvIHxAAl2wzgEHuHQCPVB3YdtPyFeHQJLDF79OSchjwPJJaqgUTABZIi9+CeSXIL742r9DOyIlrOEQRIfZwoD41h2mvS2TROlGU7dBZS6WpjLXO4wBszioZBYIhAUD2rYSdtHhLciiUsM+JwdR8ellFKyDd/K3IkiopHmXyGAWggAAOw==';
		imgData['/img/un/m/d32.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAK/Rk/eqpOHu0p5nCNfqxdSrDPXst/TLBtXz97rT0o2Pb7C1ks/mvbmEDr/ZqvsIBM7FkWdgN3LQAmqUUK+oeqDLgfXXPrC9roa5ZIyDVdztzc66a8BFBpR1NaKVYLeSN+bfqZqmjNrRm0yaCmx9dYOTlPP79fPfgbepUMHk59bcvJ2cef///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EhKGLBIPD4mCiIwBAY6PfYiNAgECmpyRexICD5MMGBMYFQwajY54iBoaAbAaBAAODKqTsohzkY2zBMHCw8GwlXASxpO0BAsNByi40rjClK1tjBoAHwUeDgQOAwUHFgsX5xcJCSmmDsu8aL4BBCgH9hQhK88HBRkKCxQoeJgwoiCGFLRWwRvzatU8BxE8QICwwhyJDB1IlCjBgECpgiBDrEthbeEXRg9oBWAAIEUICCJEGDAQYqMCEhEUhPjmoMKE/w4ZJiyoZ4HBMg2WuGCaFMyBAwQJOqAQwc0AhAUhLigogaIACgUeVihoQKGEgnEHNqToqNCkFUQCYjFzAACqgggfIAwYMBPEAgAA0fLLQKIDgAqFYVK4gCCYNQFJqaCMy4zB0wsrVmQI2wFCXwNU9/Hr0MHDBXABYy5YkaAxgUmeIjuRJ6vy0wQZGhQo4PTlCQsTKhgY8MHDaA8fBkAAYYBCBhEriodIsRaXBlHHZjPixIATLI8ONKRQkLsAhwwARFAYxx505s0RMlAAYcKAAuX3w7Y+XMGBJkqQNYHSJgL4F1cwDFQAVQYreOBBB/N9IFoBHWwA2gIbhLUcCBMYsP9ABxYYh4I5CGjgFAGcdAKZbEPABVuKlHmUIAIXLNDMBSEsIAJx7JXG10xAggDBBBFQcII4u30AwAUIfQMLjNi5hQmUMH6XIAYIhMDAAnt1UJyQAlEAFAggnGBVX+acAkEEunHAQWbUOXkdjLBlNyCBVFpZwUEKhNPAAH92oEKBmW2oADmeGbDBPyR8gMIHFHzAwQdwakPAd1Rq0ggvmDyQaYylYBkCAB00YGppGaSowo67PdOXCCHg1MFuFtzkgTkIVXApXVBuwkpSkfzHCTi2eLQnjeRFEAFpEQFpAAhsmseBkfMtQAIJClhgwQeXqsAAYwAAcCkA3aUI4CdHDCj/QCmnpFLKgpl5AJ8B5JzgGQSRnjeAmx0IWQJAyXWwgIkpINDfpXNyQolb6W4nQC234KJrCgtk4EAIFCwAwgf2HNBAoqBh5KYHG4AgwgIeANoPANNVQC7CL16j3X/fEVCBgimsMAEBQO7W8Z/ziQCBAh28SQEKJlNg6gBAFXzipY8xLGAjtRmrYAIKkAlCyoDq1uWzHQxAtJsfMGfACRvk1Fp/bLXF4hOYwDJPghWAqQBmHsQXQtgDRFCjsgoQDZQKz84EwX63HPX2FK+MwkBfGYsVAgHkXRB2fCvgpFEEmV3gAEAKLGdAuEb9sngVS/G8wW0JUEBenwLtpAI655iznIACiyWwqkwGEFDJ6VdkE4vNCED1OQViKbBCCDku4HxAubeGAEsozCO1F7T1VDx16jj/fPQjFY8BuSWpgVIwAGBZ/PomtG/C+uuP747viJiwRkMPHWYLA+uvddj4tphEdtywlNo4JVx7wgAA3WEMmcUBJbOIICzYQgmkXI+AoRBWiua0MOAhQ10K44QDQbEdAa4IEii54CU8iIUgAAA7';
		imgData['/img/un/m/d33.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKpPBq7SkOHu0tfqxNWnAwYr+vbtuPTLBtXz+LrU06e19ouJZa6zlc/mvLJ3BL/aqdPLl2ZfOHLQAq+odmqUUKDKgfnbQLLArI11Noa5ZNzszNG3LaGWWrOFNurjrZmliuLZoEyaCmt9doWSi/P79fThfsq8gb/j7NTbu7yeLZuadsno1v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EhKGLBIFBYmCiIwKCo6PfYiNAgoCmpyRexICBZMNGRQZFQ0ajY54iBoaCrAaAwEPDaqTsohzkY2zA8HCw8GwlXASxpO0AwwdBxO40rjClK1tjBoBHBscDwMJAAQHFiYMF+gJCSumD8u8aL4KAxsH9hMMKg72GwsLDBMmqKAQomCGEysGrII35tWqeQ8icIAAQcU5EQs6iBgxosGAUgVDfkiA0BrDL4wK0FLQIMCKDyYoGjDwgeMCEREWfPj2oAIF/wwLKDBIYa/BMg2WuGCaFOzBAwQJMEyA0IGABwgMPlzgOKHbAg4qRjiYMELFuAMbTnhceNIKIgGxmD0IAHVBhA4mHACYCYJBgAtd7R0ggEEEhgAVDMeccAFBMGsCklJJCZdZg6cXVHzgABYDhJkeDIBIsc8eYQwqLgx4EJBivgSOB0zyJNmJPFmWn0ZNQYCA0w8QSligUMEDhhQcBmPg0AGAidATJqrowOEDwgYoGnBq1FYJJk7aK398oOGEv6oAMFyAELjeBg8gVKj4ikGqBxIGFjhf4AAsbMQVPKAJJZE1kdImAggIVzANVFCXfBxIBUIHpSlnggFYmVAdBCCAQP+BAQxg0A005yCwglMDcNJJZLUN8dZsKoqHi4PnNHPBBwyA4EAK9RDGwV4zBXkVBRFMoGNvBKRwAQMnJKiQBjGKcgwR30WpIiwfVZABAh80wIADDhzHwVUTLDBBfR6gUIIBFxrgwTmnmBCBAwQAAIB8CH0DS5SzTXkgglZi2eBBCzwA5qEYoJCgfM+BsAA5n7E5AgMipJBCBxM01wGeKwTwZIpWmpQIJgVYyYmgGWypFQYUOkDdAioOcCQB+/AFwQc4YdDbBiN8teQJGlSg0Fx8SnmNEJEMyMlqtmS5ZWZ2RVCfREGKNmedAExQgpEmiLCRBRZ0oFB2jQXgqQa3xEj/4CdHHChAKaekUsqDKkTIQQQGkFPCZ+xpamd6V006QQrpMYDuCQg0u6eKlHRnRJW13DLjCicwUOgH+HhAlD0pRIphRnbiBQJWHIBJ2K8VBLBWLAgea2AoRwVTgYMnDDRAkBucNVi28JkAsgoBjTwBnektgDCKCkHmMBMHCjpzXfB5ECGYvNmJgZv1gQxAByC4CYKcC8AW4MqVtPgEJrDM02Bx7C2Q2b06NQdABEtGEMF8HQCFggehYfjfLcsUqMUrozTAFz7zfTCAPxdg4EBOKuC00d2pPQDQAhCEZq5Rv5jtliQ3m6BbAmX6w1p1KKCAzpKs58NYAijI5MEAZYeRjk0sAzgI1ZICyacZjgwEH9DrsCHQ0gTzLN3FbT0hgMAJJySwZPAAEU8SwghkoLJJaqQUTABbOi8+CeSTIL742rtDOyIkrOEQRIjZssIKzs+PmPa2TDKlG0vh5pS5WkqVudxhDJch4xezSKAGVBELlbCLDm9RVqj25wp3caJlnrPDd/THIkikRHmXyKAWggAAOw==';
		imgData['/img/un/m/d34.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAK/Rk/eqpOHu0p5nCNfqxdSrDPXst/TLBtXz97rT0o2Pb7C1ks/mvbmEDr/ZqvsIBM7FkWdgN3LQAmqUUK+oeqDLgfXXPrC9roa5ZIyDVdztzc66a8BFBpR1NaKVYLeSN+bfqZqmjNrRm0yaCmx9dYOTlPP79fPfgbepUMHk59bcvJ2cef///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EhKGLBIPD4mCiIwBAY6PfYiNAgECmpyRexICD5MMGBMYFQwajY54iBoaAbAaBAAODKqTsohzkY2zBMHCw8GwlXASxpO0BAsNByi40rjClK1tjBoAHwUeDgQOAwUHFgsX5xcJCSmmDsu8aL4BBCgH9hQhK88HBRkKCxQoeJgwoiCGFLRWwRvzatU8BxE8QICwwhyJDB1IlCjBgECpgiBDrEthbeEXRg9oBWAAIEUICCJEGDAQYqMCEhEUhPjmoMKE/w4ZJiyoZ4HBMg2WuGCaFMyBAwQJOqAQwc0AhAUhLigogaIACgUeVihoQKGEgnEHNqToqNCkFUQCYjFzAACqgggfIAwYMBPEAgAA0fLLQKIDgAqFYVK4gCCYNQFJqaCMy4zB0wsrVmQI2wFCXwNU9/Hr0MHDBXABYy5YkaAxgUmeIjuRJ6vy0wQZGhQo4PTlCQsTKhgY8MHDaA8fBkAAYYBCBhEriodIsRaXBlHHZjPixIATLI8ONKRQkLsAhwwARFAYxx505s0RMlAAYcKAAuX3w7Y+XMGBJkqQNYHSJgL4F1cwDFQAVQYreOBBB/N9IFoBHWwA2gIbhLUcCBMYsP9ABxYYh4I5CGjgFAGcdAKZbEPABVuKlHmUIAIXLNDMBSEsIAJx7JXG10xAggDBBBFQcII4u30AwAUIfQMLjNi5hQmUMH6XIAYIhMDAAnt1UJyQAlEAFAggnGBVX+acAkEEunHAQWbUOXkdjLBlNyCBVFpZwUEKhNPAAH92oEKBmW2oADmeGbDBPyR8gMIHFHzAwQdwakPAd1Rq0ggvmDyQaYylYBkCAB00YGppGaSowo67PdOXCCHg1MFuFtzkgTkIVXApXVBuwkpSkfzHCTi2eLQnjeRFEAFpEQFpAAhsmseBkfMtQAIJClhgwQeXqsAAYwAAcCkA3aUI4CdHDCj/QCmnpFLKgpl5AJ8B5JzgGQSRnjeAmx0IWQJAyXWwgIkpINDfpXNyQolb6W4nQC234KJrCgtk4EAIFCwAwgf2HNBAoqBh5KYHG4AgwgIeANoPANNVQC7CL16j3X/fEVCBgimsMAEBQO7W8Z/ziQCBAh28SQEKJlNg6gBAFXzipY8xLGAjtRmrYAIKkAlCyoDq1uWzHQxAtJsfMGfACRvk1Fp/bLXF4hOYwDJPghWAqQBmHsQXQtgDRFCjsgoQDZQKz84EwX63HPX2FK+MwkBfGYsVAgHkXRB2fCvgpFEEmV3gAEAKLGdAuEb9sngVS/G8wW0JUEBenwLtpAI655iznIACiyWwqkwGEFDJ6VdkE4vNCED1OQViKbBCCDku4HxAubeGAEsozCO1F7T1VDx16jj/fPQjFY8BuSWpgVIwAGBZ/PomtG/C+uuP747viJiwRkMPHWYLA+uvddj4tphEdtywlNo4JVx7wgAA3WEMmcUBJbOIICzYQgmkXI+AoRBWiua0MOAhQ10K44QDQbEdAa4IEii54CU8iIUgAAA7';
		imgData['/img/un/m/d35.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANUsAKxPBq7SkOHu0tfqxNWnAwvp3/btuPTLBtXz+LrU0ouJZa60ls/mvLJ3BL/aqdPLlwainGhfNXLQAq+pd2qVT6DKgfnbQLPBrIa5ZI11NtzszNG3LaKWWrKENurjrZmliuLZoEyaCoWSi2t9dvP79fThfsq8gb/j7NTbu7ydMpuadsno1v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAABKAEoAAAb/QJZwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EhKGLBIQEImCiIwFBY6PfYiNAgUCmpyRexICEJMMGBQYFQwajY54iBoaBbAaAwEODKqTsohzkY2zA8HCw8GwlXASxpO0AwsdBxO40rjClK1tjBoBFBscDgMJAAQHFiYLF+gJCSumDsu8aL4FAxsH9hMfKg32GwoKCxMmqKAQoiCGEysGrII35tWqeQ4iqHjwQMW5EQo6jBAhgsGAUgVDfkiA0BrDL4wg0CrAIMCKDyYoGjDwgaOCEREUfPjmoAKF/wwKKCxIYY/BMg2WuGCaFMyBAwQJMkx40IGAhwcLPlzgyKGbAg4qRDSYIELFuAMbTnhceNIKIgGxmDkIAFVBhA4mGgCYCWJBAID17BHIMCJDgAqFY064gCCYNQFJqaSEy4zB0wsqPnAAm+HBTA8GQKTYJzhDBhUXBjgISHGBigSNB0zyFNmJPFmVn0ZNQYCA0w8PSligUMFDhhQcDgzm0AGACdATOFTswOEDQgYoGHBq1FYJJk7aKX90oOGEv6oAMlx4MKGeew8gVKj4anqCBxIGFDhX0AAs7MMVOKAJJZA1kdImAggIVzAMVFCXfBxIBUIHpCmXgQkGYGVCdQ+AAP8CBQYskEE30JyDwApODcBJJ5DVNsRbs60oHi4OLrBAMxd8sAAIDaRQz3J7zSTkVRREMAGPvRGQwgULnJCgQhrIKMoxRHwn5YqwfFQBBgh8wMACDTRwHAdXTaDABKZ5gEIJBmBogAfnnGJCBA0QAAAA8iH0DSxSzkblgQhemWWDByngQJiIZoBCgvI9B4IC5HjWpggLjJBCCh1M0FwHea4QAJQqXmlSIphAcCUng2LApVYZUNgAdQqsOACSBOzD1wMf4JRBbxuI8BWTJ2hQgUJz9TnlNUJEMiAnqtmiJZeY2RWBaRFwIGRodNoJwAQlHGnCCBtZYEEHCmXHWACfanD/i4wEfnLEgQKUckoqpTyoQoQcRGAAOSV4xt6md6Z3FaUTpJDeAuqegICzfK5ISXdGWFnLLTSucMIChn4wwQIeEGVPCpJmmNGdHJgAAlYchDkYsBUEsFYsCCJrYChHBVOBgycMNICQG5yl3LbwmTCyCgGdPEGd0yqgcIoKPQYxEwcOenNd8HkQYZi83ZnBm6aNDEAHILwJwpwKwBbgy5W4+AQmsMzTYHHsKYBZvjo1B0AETEYgUUZAoeABaBn+d8syBWrxyigM8LXxfB8M4M8FGTSQkwo4bSSRRQ4ApMADoKFr1C9quyXJziboloCZ/qxWHQooMOn6Oa4tlgAKMnkwkkDaYWQTywAOQsWkQPJlpqONAAV0gToIINDSBPM83cVtPSV/wgkJMEm88eqQpDACGLhskhopBRMAl8mXT8L5JJRffvfu3I4ICWs4BNFhtqywQvL2H9a9LZNQ6cZSuHEKurakKnS5wxgyQ8YvZsFADagiFipxFx3esixR+c8V8OJEzEJnh+/0r0WQSInzLsFBLQQBADs=';
		imgData['/img/un/m/o1.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKAOZ/AFmKVAI3AhdYF1lbKnh2TtzqzAFKAtDdxOn124OlepSlhYaYfdTixTtnN0d6RBlKF+by2AFhAzVMGt7q0NvmzeLv1DtzOWuLZa69owFCAuTw1hpgGnWEXStkKqjBm8/fvo6cgyJWH4qkgcvbt2iTYn6bdwBVAQBdAaS6mnmLZQlbCpGadABQArzMp8TTtgBZAsPNt77KsuLx1LXDqlx/VCg9E/L7456qhneicJuwiA9REImTaA1KDbrLrczXv9fiyt/s0LzQp5upksXVuaSyjKzCok9vSAtACihNJqS1mrHEprTMqjxcMaS8k2JoPiFmH+743+Hx0+Tu1hFFDTBcKxBZEAJeAwddCL7SswZeBwVbBrjDrQJVBAlTCqq4n8jasgFSAwRWBeDq0gVQBjJqMANaBOHu03HQAODt0ay0mH+Qd3aWcA5hDt/n0TVyL+T11eHs1AVIBQdNBY6vhuf12LC5mN/vzbbFn9jnyAlXCmV/X+nx25yvkqCzlr/Trv///yH5BAEAAH8ALAAAAABKAEoAQAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam49nZp8MCA4ANhgbJzwZXA4aFEMabhc/QJ9nnIRnuZ9mEA4hHREPOg5tCQpUXAYGGWMRJwEZLAEGXBkBLyZHU2xxVVpWcTVhek9VMRB0Bwe1to6eu59oeHVOLV9BBCFsYU8kMR4knkBTZuUIGAEhTJzQQobPHj08IpTpYmBMjRV+XHz4VAHerlyYcr3zCIEBiAFNGKCRAWRCBSBfVtz4MMFjrVuZdJkBibOnz59AgwodSrSou3cFJnig8pGnUVw2K0BYoMJEnBcBwOgQAIaFgQ1ejGgxMS1OnBNdMlTxse6jJJ02/3ktOHLCSpUjBl5kyCvtBJg4D7rUmBLBQBy+GRQ2+AEBQYwNcY5YMWDlLxgyFBboONHBBYQKFWY0PRrXDOiOpvcoOGKicOIXVxoU2aLjhY4SEEasIBDkg4bS7YiO9AgETVyRT5MrX868ufPn0KNLn049uSen1Qvp1AABAwsjbvKggGDazI8J2K3DRbCGRQgDHUAwAROBy+ENMBwYaHClgxEWKDDgAzs+6UQBAm4kgEURjW3xgAEsmGBAACZkcYQWgS2TwQsR5BHHhiZkkEEEHcQghQ046AFPcJ3YpIEYNFwBBoVeXYFEBCF0EcGMR7xwQmIZyBEAC3qZ8EAddNhxA/8TcZjAAgt5RHBEBmCQAMUPFnSBwgTG7cTiIHB5JJUIHSjEwgMheKXCCWxQIYEIZIQRIhdWIWGBHA9s4MwDakABQwgRSAPGGNjI0cASGjCQgxNN1AScImHuIhUDQdzAgQdffCJDDEhUNmReXFBBBAEKONDDHnBecUIZEtzwRhRdHvflJJHCU4EGJZChxQtlTGHEADfgMYEeApzAhQAYIMBdWyum91OtQOCBRwGl2eSsc7WumN223Hbr7bfghivuuOSWa+656Kar7rrsBjWruCKZ4YMQXoY7kgZzHEDCBgz85tZ08ZrhBQZQAHFBGcKMQYMGDItRwhYENjfSByTMAIb/BXsskMEJLKjiAAUJOIABGwCIccEQEQ8VKQQwWECWXoBtAJsyZKjxRBYPgIFnFg6IQIIYo/WkUwwH0PGbBm0YYYCEWLGggkFUCqAGFS+8YJgc9O3FxgXoaOACBl6++9YuPqDARxhkjAKFFBggsUxXBkSAlQFHQMPCEV1YUU1iIfoYxwIJiOGABW+gVi8kkSIwwxPSBBrHBnpwYQQTXGAVBxd+7TXGNBFYkwcAJCiwQw0bWPECnieEkIccJSAAxRwOwPFvItnSAQMSCkVDZAaSgZGBpwFUIcEDPyrjY1Z50FAABBP0oYMBU4SR1zLJ05HEGBfDoYHh2A0XFQQiNPDN/wYPTGEVF3JPA4YwJkwhxwtxIFHFCQQZ6QUCFMQYRwBhEHkFzQeYwyk20AdlTYABsgvaHwLmEQoARAIkWAIWjIA1NlFhABwolle68oIpCGAKD1ABbCwgAgSAoEcRGAMLBoUjJ4wgUS24Ax5kJbYFes8MePjABxjwgS/4YQUD6IEGlKWbGsghRGRhQWwSwIQVLAECUliDrl4ABh44gAM3KIDRqlVD2pUGCAUAAqxoYQY6+IAKfrFbBKzwgAV8gAYsIAYEhpCCAcyhCS0ogL88gpxLZMtWGkjBA6xgBQEEAH1scMAM9BC3MFjgADnUIbWOU6BqSYEPFmDDQowguhxkajQJOKCCG3DgAsM1yyg3xOGo7vCF03QEDUCQARpipUDlZKsjpqQkwFJprS5Kp1bXAlcwOREIADs=';
		imgData['/img/un/m/o10.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/ALrMptjq9dzqzd/QeXWRVaSykcfW1MjXt5ircuHu06ipb5moiFyXKNPjw4qXiK67qIigb/folNDMg+H0/4+NUGN6P/Lhgvzsjd7sz/LiivL6/bbSmu38/6KuLa3AlcHcqLWqXsS6arTFoerbgOr2/aCbW6LEh7vGwOX4/9nny+3gkv/xjM3fvOPv1fvpiPblhcLQsdfepXumVdblx7nKiOTq7s/e4uHw+dXnxuLtznHQAN/t0dfoyP/vltnpyf///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+9QlvrvvF4OZNXwY8VcgUOu4RJ08keK1cLy2uoVgnDQTJwUFJwGGNxMoHCQcAQ8LIgUMMjs7bGItBwBub05eaqBqOywHEBUVHg0NeiwFJSAjPS8WtBkqFgMjFxcKMDlfMzBfdgk8YV9yWHKfYMcJlj5iadLRPKEJnXBXc9jZ2t/g4eLj5OXm50xyLesJOHrd3uhCzGo4NCAnBjU1jBz+EwAnkCBhQEEJBBsaPHuHTAq3BG1EOJgBaocBAgXE4NmBg8WGQTI2bJCwYsULFQMGZLCVwYXLCwMkHBCTI4UIACmuiUnW5KGY/xkIZDx4YCCACRkFILUQYCxBmhkeXg1QEcHFigEeckYLFW8cvS/sMLRwyqmrvLNo06pdy7at27dw48ol54XnXCM+F+54AIHMO7tol5F12lEGgwolSihYzFhGhQ0stgrY2g2cHLFfhh7DUMCBA0QoABoKcEODaRI3DE3gcEOBDBPO2k1rGIUeBndqIEBQKCYFg98yEH7YYGKBAwIVCBCggCCEhOcxGmBIodCHNQAdsndYIIDFTrN5v0Rj4XnH7C8NeDQo4D0BqQQNSF5wEWFXhPsXXgxwft8FgAO3dQcADAcYB8M052GjhE8YhCGAB0nZkAgHp2ngmQO8HRAVCC+YNP+CBSMMcMEKIcz0zBocxQYYFQ9VkgZHB8DAUCgCkMECAB4gUMABM8JjjjrSjLGDcQc0wMACTkHDiVzhuXHXk1BGKeWUVFZp5ZVYZqnlllx26eWXYHrF5TJjIWPWXV/ppGBcgoXygAMCFEAADicuuZZt7Qw3nEgbfMACC8NhIMAxlVT241ej0LAYBRQoUMhoNhhwwglRKUDDB9ZwdaYyaaKnIweKTECaaaaRlhoiExhQgAIboJFpkj4q84EJPrRQyQMZjQGBDAsEIJqvE9xAgmmnMgIQCpLI0CMoK6ZDz2ZhENqGCYcN1adIBdjAgagGeHbCcQsA8IEHwrBxTAoQZLf/QE7HbDqPFw7OYB4GDYSBAQE6EFBmJQ1AQIApJgSMgL8gSGBBBvX1oIIuFrgggQi8OVjAKRQcYCuz3nSaQpGZ5WoJgs7scIADC0gXQ0m4vPDCSirTonKIL/iSA70A6LiBcQKkEAaddv7Q5jPRpACDVrF94QEDBJyXggIcInwffruAkFgGPWSw4y9f5JBDjTpruml49baQoY6TSjpIAaoIMAMAClAQQsshfviCVRIokPMXMGCYIG1QdLoAAw8MNKyoN3DgQAUFPHCMADAgUMIALiisAlUkencbGGVxCoqGOC6wAAFICwMKz6NE9QoIIFAAANZcWSbKMziEMRZTQMsGMkoL0wnAupno6FCmGHrsMMMDGcobu07N9v6VNXHK+F+9zzjjbmBpcoQxleElj/30WQQBADs=';
		imgData['/img/un/m/o11.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/ALPHp9bo8HGQVOHu06rGkZGpd12bLMjY1uDTfMfVttrpy5aqifzsi8fGirK9qOL0/qyqdPbomYuab/Lig6a5m1V5MIyXhs/ivrWuXouLWNPkxKSwMPPkiez8/8DZp97s0KG4guzdgev2/La8l7/Jo/L6/u/ilcDMstfnyMzAbf/wjKOrgtjZn//0k+7gjNbjyPrpiKSwlKSdW7e3hMDPzd7v+dvjwub4/3uoVffmhePtzJqlnPfnjM7cvXHQAP///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+/QNvt/P4DSKxRyOmGWlAbsHPi7RRw+Pe+6P/oMzaHQ7O2B6YxUUHTcPDzU1IiUijA83JQ4CEgkKdnRdgxY7CyAgOAQEHjo6CRA8DAgIIQwwEzARtAy2HDwmJhEmDC0pAicDCgo9DmIKFxqZb5tXdF5vmWJvYAQSAAsWLwPUYHFyWHVw4OHm5+jp6uvs7e5N42Eo387vc9WEbxcFFQIUCxQoGCgA5kIPHDhQiGomJV43Sx8cnDhlIQMFbz0aIICRQxYHDrBgMFDRokUOFhouXEjAz0CAG4lEPChRItIDETdoFCBgwcGw/y/1ljgEk0nBCgQqGKxiwCEphxw5Rip1EcHWSAwjuuEA0Y2hu2iD7FQjV86e2bNo06pdy7at27dw434lJxdJPEILBFgYG9QsNKIKdNDwVKEAgBs1HokQEaCABAMC+JblQsfbh3luFkjoOizfMAIQRoimwahGgNM0YsgAccErFLBfLiiIsaH2BgADUGSyoeBDDxYNgjcQfSIBig8eLPQxYOBAgBqKokenWeOEAxKqW9M14pCamB4SPIj3QEDAih4kZnFAkAIB1By6TLgQaZUFCQonxJwQ8ElAgR0O0HDAchIIUIEB3rgxWREOTSNWAikkBQMH8YWAQYQdyWIVLwzk0P9CA5kRwEyC21kx1DAnFJCBDBjIkAFzBxYwwgosugcLBhJw85OCfaHToIMLGNBDDxZY4BmPcZ2oYF1MNunkk1BGKeWUVFZp5ZVYZqnlllx2qc6CU/5Fj5SwjfVNkkomUMGaPUm2VjT5xLBABiB44EgJihywQgIgAIAHMyWuo+QXxQxGA0CLHHAAAQUk4JujCeCmgI6BUgaWN7oRNUgPF6CggX6lkADCCgWssYIEEpCgHVA9TuEDeZiZKQAO3mgwzweZEGCAA5N0sBhNMilSwwEOSNBDfmO+VuYAK2wggwQj9vZBNl84YEGshEpwwA0H0ADAadLdJKwZK4BAgng6gjn/B1gvULrfmjLcKsYLJzTAwAT3uqBCUkoh0EAPfK4JmQE4SGIadDctBl0JHQQgwafUBLXsBRQAoMEZRM6wggcUcINKDq5MIHIIOcBAlXyrJMVCNzHsEFDLB5j2EmI1AFDxaQIYcAKlyf4gJhjWFgBCKTgU5kEPFLjQggkysGhLCCHwEItVIu1rCwIkFGAAAboRWSQIBhp9Am48qutzNMd1k4AaZCuAwgoYcuSCfLFwEAEPIkPFgws5fOQhCTp0Q412gC4ZxbJfpN3DDPtOyEsILoSAL32xSL53UzDMkPgHEhDUTKuHIz4AABlgsFFSIaSAQR9NpzCB1TDsm0IBOsZAQ7bh4SD+QgLYjZBApB7YnlsCjzUtw54j9syO6Lld5ugAGjgAKM+sqjVOPhr0AIACJ1BQVDVmo3ViG59HeSLoUKK/RRAAOw==';
		imgData['/img/un/m/o12.gif'] = 'data:imgData/gif;base64,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';
		imgData['/img/un/m/o2.gif'] = 'data:imgData/gif;base64,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';
		imgData['/img/un/m/o3.gif'] = 'data:imgData/gif;base64,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';
		imgData['/img/un/m/o4.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AOiXWujWkeblt9jnyZKfkeTpxNzJiuHu09J4M7TFodiUWtiMUbZtNdmladu3eNfbr9e8g5RKEsbUuOneoLWESNSHTbBTDd7gs9+sbdObYci1d9DdwnifWtjOn93rzlOVJ8uCS8KRWOXx1pNVJsd6QOLv1Hg+EraZZ6u7dNmuc4Y8A5eJTd/t0c6OVuDt0uCRVs6gZ8alcbx3QuLu0uPv0KNlNeWNS3HQAOHu0uLszcfAd8WxbdOwcoixX4iQhv///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+7wdvuDwlyUuH25c4m1NYw1KZpeEQNh8c5dJAEJh7AIBExcbEh5fcAc4LjhmYWtdjYwlEhIDYIuKOXoGEAotFjIAAAsvAKWiCxUgC6IALSkTAi6NZ2hXa15lOCw5EKMRKiokDRclHoaNtmm3uY/Lz9DR0tPU1dbXTmsHIoiOzthqtAczEAgRDAA2COsvLxUQLMjiZ1LajbMHZAOGcC7+BwUCnLAw4sWCdetMVRhlQ8GKFRkq2LBhSgGEWAPIzPu2xF4kFv08VMKh6AKEBg0gdNhnqEAHAx1iaSyjrFouMTNmisEFrqfP/59AgwodSrSo0aNIe3rhmFTNzXlfmILD1chDpwztXmQgZkmcVC1rPHSrWmCCAwUKXtSoQcKUgwuFvvyDWjMb1AMlBqDg8CHBjL94YjAAMSodAwsMHCjWoSPBgwAGABmILCCH17pCPDZy82WAJRcsGB0QYCBFA1EvQIwwYaKGqVOsFtQwEWGEDAu1KedIQICuEs1hQrsRC2bDhrJ6HGDgAQGGAh47UBiAQWoBqQoxKl/GAlwuo4wlXAjQAKOVQggSEshL9vXZmrGHHqRIgSHlBVrtgXZ31LS///8ABijggAQWaOCBCCao4IIMNujgNJgRiEs3+SH1lFcW7ndXhTZtdv/cAx10cEEB69EUITQaHpBDByEQVooCosBgQAHwmcFhFSl+UYABLRBWgQXBmCDDCyRAwM1dtZwYxQ3pvSFaGAP4QIAI45QVgAMtMMCAAhhgMMEGBCTwhgf7bKgkEsCVAJ8HHBBQyQahqTgBBCdhAEMDGVDAwwR8FpADYAVccIEAAhSwUUcXihHnIQd4kEAhOORQQAg1wNiKQdal9sIKH3ygQwZoKUAKDAHIslFNiYphiAuGLBrPLJrEQAICpTAQDJAjmHcKAxFEgFsEMlBwQql/erBBjTspQ1UjA+zigw8bPKmilQ1Y6k4rIIBQyrYAoDXKYABkEEgOxuKX334ipOuMgRuWiLZIDgJA5gAJFlhAwbYLtGBpdaQo4IABEzyg0071QFXmAXO4mUMONNAQLyCBctDDBBqg1UIGJ3TgAUkmnplNql94MIsLiJBcQHnpVPBOeq2y0AZ+KM7jQg4OaIkQKxqQiA972NyA7AEXZGADCQxUsEADAqjJs36JIjKAqclkaKaA3d3Yn9VXBAEAOw==';
		imgData['/img/un/m/o5.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/ANjoyeblt+SUWMTStuHu05WgkuPqxNjOl7fFqt2SV85vJuPcp+rZldecYNuNU9aGSrpqLtilabeLVMuDTNi1eOjTi2aGLnmfU9zit+DLh5uJRo5DCq6zg61RDYiyYeLv1OTw1tS6fsqsdtCKUqyYeMOiad3rzr12QM2VW8x9QY1UKN7Agno5COqZXOLu0uCHRM29gt/t0eTv0XHQAODt0uLszePv1ejvz8mMQ+Du0svdua5hKNSrbNmxb1mkLP///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+5wRvuCweByecYmztMwEIIdNcIKNQEMUDpRej7KqMAJfMTlfbW5lZk5ehiY6CAMBGQ4CAgkTIwktLZMjmRAPDTAZDBUNDg4vDy8vDiIiCwYEJoZpWGmKbiYxXzY2uoKBbohnV2lftMPIycrLzM3Oz9CJXiAfY7bRRreGBDk0NQEVEQmoLwIQExkY2wTCXdrbJjSDNAYMDQKZLQ08pZQCKQoCOoDQoUSAGmBo0JD1xcSgGAyDtVNSzM2HAAdKoGhQIgMHBAZCYqjhYhAYFwYCYDhwYAGGBQBoiJnI7N06dsew6dzJs6fP/59AgwodSrRoNC85jRapeNMYzaNMDX1jQJXBggCwJCZLY6Lauhy6uN1YkCFCgx0nIqz4E/Hm0yU2DX2ocYCHBgsSDqQU0SDBAwgnKLU4kRchHRo2dBTwYOGC26dRycikUSjHWAkbzrHYsHmCJgEOVLBQMYISiRIVRK1YfdVwmByyCpF5KyTyl2ouXHw7gCLBiAmTeGh0MEKCAhwMDHwAYafApQknUkwSECGATGu03ZHJDdaFCRle6wyg86UbgbCHrzvNziWNVzLoaaCfyV6n7TJK8+vfz7+///8ABijggAQWaOCBCCaoYE0G2vJeUvvFNVtRtjQ1W301NVVDDToA4P/CLBhqcR8ZBizAAD8JNNAABX+4ht1WEiY0Dw0uLFDBCA7ssMEOD0yAQgYLyGCSRCHCNQACAOTwnhuUDQJHPQxkgAMPfjAgw4fltXVhFEwNIuSSYNRggAc+eOAQARhwAAMJHTxASQISiBAAegzZ0cgcs8AVoxsGhPCAJAKgUEEFKDxwyXT5QCDBQVjG4sEFCMQ235ZD7AnGmQ3FgFIIJ1wCkAIpOKCJJhuUukFpKYxwQABYGWACL17p8gEASa6TU4WG5ECrI5D8A4EAE6igQmAC/IYPjpOgoGYDI5Q2KgUG3JDbedzooiVOtN0HwrYKAbAADPeAlgAmoI16Qgcp8HByVYlrSgCBqdFBgMIC6lkjhaU1MFACcJSU8GgGFLBYwStgADDAAhQ0kI8DCUSwgJbXEBNjSAtUHMANBghZ0msm8bIGG/HQiB8ylnJjUgwIIFBvPLkoRN9ReLoBW7WvxfRyTyM2VeQzOR/in20QAhj0MEEAADs=';
		imgData['/img/un/m/o6.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AMfVtdnnyuqZW9fIcqu2jebZh/3siuHu0+jhtvfpm1uXJ+bpx7zJqZilK8plF1xoHNa2hs7GkOTUpo2KScyudfPjhOCSV9qNUpV7SbapWaxmL5CVaK2teLKTVtCeav/xjZ2okJJCBvHjjLNVDXWcRo2Xj9OIT8qCSbG7nv/4kdrfvJZXJLC+K8/cv8N2PPDjmM+UXseLTtiCPu7eg8qdUJ+hd/npiPbmhn2CcGsyB3HQAPnqj769h+Pv1cTTPf///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+9Qdvt8eqlX4VGavdHpn+HwIYB2XqKuDe98AClVTKB4tAQQYAx83Bog3MzYVFYcVNogGNyI2CQk7O4spPAcbGy1fdV1gLQwcHTAuKysaFgIWFhASEh0mFrcCAhcXLhe6wBYeGJ2mNRh+BACBphgoJH6hB6NXdV4LPAokNDEnLievAiYrIy4CJxIIC2DsonNZdtNy7/T19vf4+fr7/E51PT0AEIiAgoEoav3otGMHgEMBGx9EFEhTwECKS5gQMUqQJsEHAyJ4BJgmJR67BRIgqPTgQYCHWQha4CghDcyCFigIMIgAQIWK/xYqGBCYkKHQx0htMnR48KBBgz8NSNSMM4+JyS8Lsh5QoaABrlivLMDQkKNsWQ25YImVsA7MSHZV9XnBmlUPiLftrCXcy7ev37+AAwseTLiw4b1eEB4uYpJAig82Ctz4kMLAAB4MAihGfPUAChAlCKCYkehGJhuLJLURESGzvHp28CwEE+GjARs3OBYoMENpBQNnZsxwtIO3RNLF8cb1N7v5QlMTJgxQVGDAAAoZsk8/SkmEiB0iSH/Y4ZSFeRY1qB7pvJVEh1gXZMiXcQHGS61ZESBIhyGEOQsXhGUfBQAwsIF0EBlQwAQadNDBZzgEkseEcShhhwQkUNCSABMoAP8DDBDsRwEMAIb1iwAuOKCiiicIoMEII2hAgQSllIDCAT0E0EKBb202RWcLUGACLxZoEMIKQ55IYli4UKCOW3n5CJsXANQADQkwXBCDAhPAIB8E66gwwY3qFcZeTcstpuaabLbp5ptwxinnnHTWaeedeOap557vpBmnNbK99uZcBxBQxkczEACCNH7+ZQ07AfBQmQGXvFDAd4+JJKhfhB7QQgmg7WQGbzPc0IhqH0igwkH8sJfHHihAMhxpGCWgGlIRFYAAAJvO4Sptj00igho73EDBADtg4ghupnb0wg4pRBCKXljoIFAAgXpKwgYkACDIDB8polt4FTx02w3oqnb/mw3sItIWq1D8egAIG1SpKK+egkDUZB/1a5ttiAS3iERsWMTBBg34MAEOPS4BZFYL6KeOVp4ZFMBIOtIbHQYTfOJxdANUAJkIl7CB7g4ZJMxCAywojFevnU64AAQmyAAOMLAQxIC3C0XMgUpAq+STQESJjJtFNIzgwApM5fBAhM4h9OgXXJWwwQUOhKB1CBpcoIEGMNCSEkssvVjOL7mM40IEAVQZXXYdc7DHFxuUgAMDd8ElpRDxYKNADDjTAF+IL3gQiwsmnHMiWOGc4x9bFxfo2gFto9AhCWO4E8U1EdMSwQYR6Bpki+Iw7ngIMIaQgwa6mPCNCWB+AcLsC1FraYWrEkyAgQtdy+AC4lqu0goMwbyUzruU5wXbSRwoAMsFJmjgSzgXrACOLBBEwFagyjUKWw8LNO9HAxmolcEKIajoAVsLtJaj3o5eowItFFDAgaoTu3Wx5oR1Fmq2ezNMZ3oQwDYVUAtBAAA7';
		imgData['/img/un/m/o7.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AKO0lpeikeDt0oyUj7jGq0ZnJdvqzcfVuMjM08bhprrWnHGTVNfb47K3u8DcoaKppVaVJne0ScPIzqqzpr7Cx62ytre7wqvLin6XZ9Ljwc3R152ip6ersbrDuISccIqlbLK9rpy5f97sz8LOuJWpgdHV3GqlPEuBKbTJopadnObp77zPq9jly6e/j9Xix8vYv+Hu0+Tw1s/ev1ifJd/i6XHQANjoydbnx7TSlXuiW3+FgYKtYLDBob/Wr1+CO////yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+6zBvt/DAgUGC8qCM7jGJdbeMIEhBjMYRODDY9OoWDQIFhIHKwo4LQMVDBIcEgw0i4kyamUwLi5rbE5elWAoJBAYEw8NAzocDwAyKCGtHwUFPrAXCQ4OtTs7CYa2Ch8tPGiUX29Yb5xfIwEDBmItKAMhJC4jJAcwIgYwN2fDmm1XcDDF4OXm5+jp6uvs7ZtedNvaxOTubp3YeC8oIwQDAyzikJjh4gCIDRr6NAAjAk+Zb12QzUvz5UYcAyMaBNqAgIEFHQFqLYh14gMGABsobKjgR4IECgMe8JCggUIOEyQ2cLBAgQIC/w0MGPSAAOAhRCXiKtnI8CUDygoNLJSoqUFDiZ4IeCiQYYNOjGYvzjisdDQdMjBeeXiQQbaevbdw48qdS7eu3bt48+pt58XtXjdnYbAwZUDsWL/2jmGLAYpHjhkeRowojM1MjAEWXuBDrOXN2C9q7BysIAFBCQQSKowAwwKVBQY/VXQA42/CZ2JSkMkRAMBEgBSYYIzo0GBPCg0fOXRUGaJFzgYag9IAilwDDQpss8EYVZpC6oD0jiQ1Y+OLiN8hRkA6bYEnhw0BAPjwgeHChVf06fMIcUGBAxw41BICBDPMEIEHAAQQAA88mLBDDiQMswZSZ4lAUQYWmpHMBDtRAP+bBA+gkEACF8hSwAL+ObACAD3IkMAKLsQgYXjhnCWADQDElEIFCKTAgQaNlFABCB6kcEIL+JTXVlnmjOeQCDcsMMMJOAWwgTZ2GKXXeJ0w+deXYIYp5phklmnmmWimqeaabLbp5ptwcuElmYplUmZgIgRH1pZJgQfDAQE8YIBFFGk5FycEfHCDATmEEoANeNxRxggASMhZk4EJkAEBoGAgAgt6EuCBkiBwwMAESnY5Z434UPICCDzuMcEXMvAgQAUcNMBABaeBZ4AME8xDz6pd9HDBDTJK6MIEiQAlwQYWIIDABCBINkEDFEBCAw0qSDCJYAxCqmoU4wngwgM6RPr/xQo5bZBSe1EFEAIODijgrgQl7FRVUCyVAEJDcXxhAA8gUNCBZrhRGDBoMMhHgJIjcFACAxRUsMED8Y2wQgcgpEDCB1ZyQEFUQDFQQgOlLSJBCyuwcFADJUjQACANdBAMjUIEBoYNFn0BQAreUTBVachZTEAPsJz4Sw4cDaARBTLZ1wKAO5hgtQcpWdyezC1ARsC4OSd1IxgGrHBCCCCAwABHHJDGwQQh8PDxBSEkXcAJC/AXoAMmRFCLAjnksAMEJIyghgAYRGjppT9wCUMGMcSwggwu8ECACwLAaB4KLUxAAQj74dBfAjj48EGKCuzSSwstfIvPOLm9XkeqBnQwewBCDGiwUmmgK1CiDwtMLoMMDwzwwlcaZkJsE46H0W6uPaFcwsRBMWDCBfGUIWyXTZYhAgEBeLCHKTsEUMEEAHiwwAkFDJCGWOa15U4N2cdP6wNStuxBurIzvg6X5QHAAgBwghmsBjSUWF5idCaCVOEsTI7zHwQVeIUgAAA7';
		imgData['/img/un/m/o8.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AIuSkFmZJ+Hu08bUu7nJqmiHSqi6l0dqJ7vXm7K2u8XipHHQAMfM0tvqzJimi22mRKqzpNba4qnIiZi2eLvEuXmMbbi9wbXNnKessczQ19HV3JmkldLlwMLGzaCnqMDdoZ6hqIWlY73Sqb3CyIOTd4ihcq+6psvZva2yt6zFldnmy46pc5mwhsDNtN7s0JadnNXix8/ewZzDeNzf5t/j6JKfiKCulbDMkdfnyOPv1bTRlHuZYJ+8gLLApXuuV////yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+1wIXAMLxqQSmBsuQYtUqaXNcMGCS1zYzzlzjacYDC42ACU3PRgjHR0AIxYrEyUPB5FkJwkjIxgJGhEdLwAwcXB2XXE4Ozs+DwQQgS81PgGwLAQSBRMxOD01OwEhLxgWHiMgliMMnQ4mJANxBCWtcDhyc1d2XnAcIjc6Ex8KHCkVDjofCOUfOjU2JyvLqy3TdNTWovH19vf4+fr7/P1OdjkCgpIGz98Qa2bCYHihKUIGCyAyaFgYA04aFw0sCrgQwMCXUFLuDIQDAwUDRCM2GEDwoaUCBDpSSNCBgMUEGRMm8CCXwgMG/w0ZPJDoYcECihcVfr2qYMJAqwc9BGQMVVCJyIFvBgA4YQYCgQbRzOCwMUNDB6AaNDB4mCABhg0iXKjgcLFqPoQ4MsLYAKAijgewllUzSLiw4cOIEytezLix48eEvdCDbOTqQLCgJheuZoYCDRozIswY4ZarmRYe37h4k9muFjsu8pwhYMEhaQaiHSbokMDDi0YdzcQA4EBAjBZEe3wa6XoJwpEkFCg4x7Lb9JY3bhQIECnSCgksLGhAMSKDaNwPLaFAgaHGAxHMXVs2c8LBgwERHDKwJAYED8Ah7BCCBC/pIIFOMkjgFAgWSITBWR1gQMEnAhFggwpv5OBCRR9lZv8VQqxZtEwcLpTAAigw7FCAAy1AgAIiGWTQwVEQVNTCBi6sEIAJUVGFxXx69cDCC+VNRMBqAhBQQAUVDNkgChmgAEBRAPhWA0H8AESKVKuJgNMEN6wQAg885ESAGZotNt9qq50QAGVwxinnnHTWaeedeOap55589unnn4AGelef1cgmjZ3PjQSSY9XEMKKiZQyUZmSdZZAJMChEasYEAbzwgmmSNlfPVQN4kMBnNGhgwVkWANACiV+80UBGMZTw6KSvJWoBaB2gpwENEhmFgQMi1PqqcMsJoEINyVIlKhQLfJACDrL90UEEGlBgwQvidZDBMAyC4EEJKxRQg7k9bND/wgAYmBfBehBMGGoUlgmUZArTsYRACjyUo8MNLPQAwQ4lVHDADjfwsMMBbTBQSVoMoAAUaR6A0EKziyYxXxwnmGCBCSl0o811+kqAgHbdHVBAChRQ8NBbJtgQATAMYABChC+8QgJfZLRWh6Jm9EBBAjEmwMB4IBigwIESWNcSTDcgoMAF2QEAwtEW7JZADCr8cQIMFOxSwFQwGLCjoXFMxpkZIpiwwwMpWOCwMCh44EENATwA2A4HkjnBCiUE4AMLIKCw27USaaIBACaAMqsZNkBwzVSDITFfCSWYkUPMBARgww4sqGBDCz74wJoK2/nwLQAJkBdxKye44MBW9BGgp2MLUwmAw7OWA+17rHGAbYLRD73QQVkJAFBjxw3EcKYAHFRuxVVv4JAGBR44AIMiGDwqAAsPUNCQWgkUVUnFd1+Qtj2JCtBDASE0ScAFxbJQ0QkGH+BDCTZsAIErFehEe2yAq3ssAG2rsV4eYrCDCRSgFtg50ASu5AIOHOowG5MKAHYgghMgoARvI4AKMCSHx9wBSWaAQRpStJ0CmvA5dHHhnGSohSAAADs=';
		imgData['/img/un/m/o9.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/APjniKSzkrfHp9jmyV6bL5OqeHSSWpyoid7ResfVuFdvK4qecY+XjuHu0/fplomJU8XjpqOsKaywc8jJiLrWnLO5uunchNbb46JvNMDdoqq3oqrIibPOlcLHzaGsnr3Bx7m9w9HW3cbL0c3bv6issq2xt83R2H6nWd3rz56iqf7ujJefmsHOtLG+pq6+lvHhg+7hk//0j9LgxN3g5svht8W2Zr/QreLm7Jq3eXHQAJiWWpqLcKK9hX6KfrK+Jv///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+8w1GqhDxBc5NGSEAgYTIBAYrUHJ8zFVTFxibv9Ffb8DAikpFR8hJiUiIQkuGi0gJCs9FSQGCgYLBi0PCgo6FBkBG6AZGRAuLH97XX0yIy08Ai0EsQENLBMAKg4xDg4quirAAA4ALy+6jS4nJywaAwULBQQsAR5+KNJ+qjlYezkoNjoPDzoMDAIr230NAyMHBAIsHjISCX8N3XneXvn6+wADChxIsKDBgwib8GnQhkAADV++JTTSD98XGmZkPOwAIkWHCyAYaODggUQJECY0RIigo06HGTNS/evSb1YqDxpwnLBkQMDO/wdrdshIwCGBDQM70QlwYWNChgmjKHDgUMoUBAo8cGyAoGFFhRAd7ogodKDHCG5OFvbpceBFDGMAjB0LRheZBRi+gsVwKlVAphMLaKhKWLEdmARhzAxgJ3Gi48eQI0ueTLmy5cuYM0/0skrzEbUyDnhAbOMAirNoI3/7I6CAAHIBErCAJKPBCQWmWTAwxPHCDZgVDMzkssdPCwYpIMpgYbLChRAXol8wEeKD9RKRCqzo+GDlGHMgDF34IAD1cIUWvyTwwAAegRMrSnxIkSjFB5AcS3TgUUBrp/8KcCDBGlSVAsFUEGTgQgsVVIBaROf9oFYD/Wm1QQHkWKITD7It1v+ABz2ggEICMMQgDAwoOgCDCjEggEOFWp3ghowLpEACCSmAAAJHGxCwgAA2WBThEBPW1oBgE7wV15LAHHOMLwggAACKKFowgQC1oeBBCJEY54EABxhgpD/89OGCDhaYCICaCNSgw5tw1lCDlAC0+UABWYKBT2MFTfgHCgO4gMk9fnjoIYSZTQjonp416uijkEYq6aSUVmrppZhmqummnHbqKUFDSvoNCwX40Vmk/aDAQA9pGEDAOvkkyocGBaTyhQarLtbGCNsMQIkGk1U0QHcERFDAGT+OsAwBGrAggEkfzBDdbycgpGgD8NzjAQslmHCBCHMcwEEDI6xAwnQpHOD/QggzmBAfCASEegUfI5yDjwyPtNDCByCEUJ0iIJSQwgor5NiBGGP4IIF+1IFgAwp8WpFDBhssVu499TLwESIkdFBdvyR8IPB8JCygIwM7KIBBJw8s0EMAAiSQQAY4mEEmFNeCgcIyDJgkH7+HiDCDvx/QusCLt/1HgAE8vAlBgk9TIJUpGTAAq7wSevFgA0d10oMGbiy9wg49vFuBBwfQp8jZG2yQVX/9ZcDBAg+MkmApFFjzgQgddFCCoYgSic8IOCRwgLgQ4PCAAVJnckA5MgxQKAo0cMDDBBZYMFdcL7ioFQcUQLDBTtMQ4IKN4dVB3QU2EPC1kP+slkBWWi1w9AIDK5ww+gl+2NCDCxMEb4EwwAxDJTIxuHDACpls0FrYJyzPgActCPCeAaXueSpFhf3R7BcjBHMXlcYU74svKiBT5z0FHOvHlw3cw8IKDLQj4qFYf/ZnHwJIoKaKxYjLMJYkp/GhiEUqQABzQPAtEnjABiwQkQtcALHtUWEhKBCAB3TwAmH8QkXEA4AFooSM4glDFwCoAQ9oUDkeQMAGNMBfQFLlggfUwBhtetMBbDACGbhCAAFYwJtY8iMZuEAAh7rZQbzgjlesoAWnEVEfYCW5cAxAcoGDDAbZ0QYXPKhQMsSMn9Rzlm1YsFFjPOOk1JiHIAAAOw==';
		imgData['/img/un/m/t0.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKAMQfANTmxMPcsuTw18zhu9joyarMlprChLXTopS+fdzrzbHQnd7s0ODt0qPHjcjet7nWp8Har+Hu03HQAOLv1OPv1eLu1OLv1ePv1uDu0uHu1N3szr3Yq+Tv1s/jv+Hu0v///yH5BAEAAB8ALAAAAABKAEoAQAX/4CeOZGmeaKqubOu+cCzPdG3feK7vrxT9wKBwGJTwSJJkhJGgEJ9CioABjVwEgko1kuwRJ4vBwJHQ/iwEQOFBcG7f7+4t6YNHJok8AzNhpN1ARkc4SlyCg4iJiouMjY6PkC1JFQITQ3SRJnV2nE+HPZtVlpWdFxOAQhNYqEFNUHIshVusnVufjaFwmJm8vb6/wMHCw8TFxseZPrDIJbK6t8nOta/QOkkaltPalzK520BoBQEHF2ZAAgMICAYAtETLI9JCGRkOCgAGAQJDFebfQn46+OOWQh4RAQDsAdj3z1a1GAbhoAvQ4YADChWyvYOnKInGbRyDRfzxkJnJkyhTzKpcybKly5cwY8qcSbOmzZs7SqqkYyGQTmPePB2jA/InroZFjOYMijRpopFNNyqNBaFBm6jaQqpwlnGbgA4dHDhgGAVAhwDY4qyA6nUAAAIMBqIRS+DCF0+fmA65oIHCgAQfsaZKYNFDFVhEh2QQcKDBAQQQsgDhkCBAH8ERLNiVWtAbJSwfBTxQ4FgyZiFTkcCxQIEAhtMktcJg+0bVBFWcUkOcRqEDBAMPCmwgsIBAYEORJLj7MsFCvx/Nnf6i/WqoXukp5cnOrptGCAA7';
		imgData['/img/un/m/t1.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKAOZ/ACpaCOTw1svguleiIIOYcTp0D5zDhnaHbYO0at/s0XS2RObx2GyJVVlwTczZvbXTotvqzNLewoSmaWO2J3PGNr/Sr8XdtNDkwZa6f0pxLNzrzaLHjdjlyqu3n9npyuPw1bS+qUqNGdTmxazOmM/bwHaoWODt0oySisfUuqbJksnWvJKgiOf02MLbsXqSZmRsaanMlb7ZrMDar+Xy17zHr9zpz9Plw9bnx0aAG8PcsXB7d+Hu03HQAOLv1OPv1eLv1eLu1N3sz+Hu1OPv1r/MsOHu0tvl0L/Mr+Du0qy7tGG9Heby2ZCYicnW1dPe3nzSPYy4cXR/bODr09foyOLu1T6CDLjVpt/t0bfEws7jvpelncXQuJuxknquYaOsq3jCQ7C9oNfl5WXBIXHOLNDjwOn03dPfxn6Hh9bjxlywH32Ef4KMf5yrjZyziI+amJWdl3GmSrTCpbXNoMfettTg38TcsuTw1bO8vefv3MngubHRn5aiiOHs1Zinh5ynj////yH5BAEAAH8ALAAAAABKAEoAQAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam488OzsLeCoKUGYsPRoXMiNZAZ+vsDychDy1sLewRQkJATMLQCY9PbgJHBEOJA4OaDsfuM+1nc/T1NXW16/Rl7U8Cz8+wztAV0F1EOHYsbOZtjva6/Dx8vP09fb3+I3t0O/5g5470O2o4aLAgAkHx3xpI+XWri0v3DTxcgLEDFyyItkSeK2HBxMiDEAx0CWGCB+4fHjYgABBCjIo01Hrp2jfqwUBEvQYAgsYhAAc0/2YYmHEhhgwMt4DaA1IghgGuPmbSrWq1atYs2rdyrWr16meaH79xyOAs089EthoETOWUqrc/z4NIVEijV0lOCTUiAnu1YcrNFQkuJjtLSebsHrUiLOnAYDHAApk6OPABNoERAg00HFGS5I7a7gsmSmJqcwdARb4WNI25YKARYLKFPun1hQrQE4PEfbjw4cAQKn1COCj7+lqhgshPs78FvBhlj/R1ugpgJUSCDCMmILSh4UWKUZokH3twwKp9pZfKz5ciLvkWNVnG0u/vv37+PPr38+/v///AAYo4IAEFkgPfPrFVViCtwhjB0ZecTOcGTW4Mk4OI8BwEj/xfVKGHBLAMQAFGBihE1AeBOEeWizMcNZ7+NQSxCs98MFACE9QQIEYaShAxGiJ/caEDmqcsAULr+Q2Hf8myyl2hB8ZVIFDFSEooIALlb1iAglgRPECFk7QEcYbKjx4C3rbWJNABEeAwQYBBzBAAA0RQADLlmCssEIUB0SxRgdmkCcdgonIJ5wwwnwgzDTF/TAMoqcRKoih0wgDxBx6QPCAB66kJMIqBszxQ3M09tONDz+YgIRMAcxxgwYQeGADGVl4INsQPwigwa7RkeoWWWX5KmxzaBpC6bDHCbHifBoJ1xoso/q6mgxz7PAABMVS0g4wVmxgQAucvhKABw/YcA5zQwhgBQRZ5CGpJZ4scIEFQUyhQW4BtPDABnO8Ruy7s5iGVg+OMrdkegJXo9IVarkTYcK3+JDFwVwtR3EFfRdjEggAOw==';
		imgData['/img/un/m/t2.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKAJEDALjQpnHQAOHu0////yH5BAEAAAMALAAAAABKAEoAAAL+nI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMDgNKQ0AQYBqjT4E1uqxat1esT8sNX3lRsXnrrVG5AAGgfUZLZWDr+x4Pz1/17R2eJ9eyFlgolmZSZrhohijSxxg59ggpKUnloehmyanHofXXKQq1N0Ho9jYamapX6qCpOgroCVFZyBpb6IgAm+t75tj7O9woZUuMLCiczLx3yjyMuXAMfemqsFwded2QrZ23G0H93cUt4U1uboEOrY7B/is9AjmrGk4JimfvUqUveo8Cni53KQQCwzGuFUF+CQHaQLfwYR+HZKpQ/HGRQwEAOw==';
		imgData['/img/un/m/t3.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AKy1tJilj6jLlOTw1o66d9LlwsLOzXR/eW15bqq4moCLecXdtN7s0KOumrTSodrn552mpVFYUJjBgszhu4KLhszbvrO/voybgrrFxHeBgN3qzpOdm9npyrnVpr3Vq+by17jGqun22sLMtrDQndvqzMrXu11mYdrmy2VyX4+WlKHGjN3rzsLasL7ZrOHu03HQAOLv1OLu1OPv1eDu0t/t0eHu0uHu1OLv1eLu09Ld3dbnx8XTtcfVvNbjx+Hv0////yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+3y5vuAaeEwuv7jEl7o8ptEUGUvOAGh8fOw8e6BztFgFA19qXXozDBwCigIkAzcyDBUVJwxskA4eIzExep2DZ1dqXp6kbKBooaOEqKytrq+wsbKztE5reaK1RqNlMHoyGi0cDiu+paddvKU4NBUJCiYIBjkYEA8bIAM4pXmbnC4DHRISHQPfq0y33OvryLHKx+i68/T19vf4+fr7/P3+tF7k/UvzgoMOBsY6CdQlih23hVrUkXnUQMEFER8EleFAYkUxbjJkDJICr5uOZwdQRKAAYUOEACE0OnQR48YCFYomCBrAUwZE/4mdYNAI5CFBggABUBzIASDCBR4uEoLZJJUUjAksaDQyowRoDAYMPqzQQeMbNwYkCpSdGQNiFKAz27lFBXfm3Hp1wbgbyLev37+AAwseTLiw4cOIEytezLgx3cQN9e7l+0Ikqcn3GgrtwKGqnruyStKMC5pL3k4DZMj0VJpKXRgfNIT4sKeACgcCVliOh/ltpxAiTGwAQKEBjtVfZMCAYdYTnwIxaLhoTZCUhhIXTGSAkIElhQm049Kc0YGAABUdZJjtLeQ0GRgnQDRIoHTDNAsQAgzwvE6QL5ExsACITtMhI5onMtBQQlJKHZACBBSkYBEDN4g3UQEjSEDAAuaMgWlOZHrAMMAIE4wAyAk9lNBAABbtgFAZM9CAFn96DPABDLsV2BtcnHTAwggOmIfDNyLuZ8MeE+DWAXPisYcEPJtEpZxDNuDYHG9YuGfhZa0cuCUZ1EX0JZhOwqKlQv6cWWBgcIWZZplYBAEAOw==';
		imgData['/img/un/m/t4.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AKnLlcfctqSyl3qwU4nVUuLu1EeKF42ahIiybGS1KNHkwjpuFNDcxuTw1rPRoWRvZ3mEeN3q0GnDJ1GFKrjHqlisG5WohNrlzNjl5YGTcEluLW+uQuby2XTJNq+7oZ22iGuDVy5YDsLNtFaeIZrCg5eimdjpycvgultxR+j12m26NdXix9vpzNzqzt/t0t3sz5uko77YrOHu03HQAODu0mWWQOLv1H3RQOHv02O9Iuz437fDwmOtLGymQUOBFv///yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+5zJvuACLdAqgM/o74xLnLnRNpkDwIqn7w2XzHzv391dfnc2Kx4HCz4LCwYTCwk3KgkSEgMUAg8POxgYHCUUHIJogFduXicvLjYvLS4mel82sXE2HC8NDS80aWtsWG8yo73Cw8TFxsfIycpNv3/By0NeoV8FdtN+vFDN13tntwg9IxUqFgwXIj0dAxegXxwpKQ1op9ahz0rbfbEydg0MGiEChliQYcWtBrLq/VkmjRuwe9AiSpxIsaLFixgzatzIEZkXiB2F5LOXTWKpNDZYsAgQQ+E1kFm27XNIs09JJw393BpUi4JB/34s5gBQIE+QDRMKXJ4BOVIQjVcy/C0YcaODJBU1eFQYkaOChg8c5EGAcACCgJ01wdws0hRNARcMAoiw9MECBQuLfPgYQWCAABECBBw4kKGEiAgv10rJd8sEAAAnSNCYtUKEh8siAgAggSDGC6VqYPZqS1P0RDeggYVczbq169ewY8ueTbu27du4c+vezduY4tgn1f7umFPQ8NOM+ZC0WPxLAwUAAhRNrIy0DBcuXpiYXtO0FetpEx8P5E1BDO7TCigP791IW1UnAqTiOb2BiRgOdE2baXMJeKMuXPCBCghEEE8DAAxgwXahNOCAdNM809w0rdhhgwsf9JCDJBX4gMdADRuMkIAKH1xgRgMrlOABAylY08B61In0XxpwgTDVCFwlsIAKHXQgQQ4jkHDBBR48AAMGO8AAA0LdiTYjP4VYgIJAIWiAiDgV5KCOIQ9A0GUJJZjFgX72LHbNhQU0kAIHHOhAgSIDLTKBCDRcsMKdK7TAnzPjMTMhLA3QwIGFLngAAQqIZiBCSiZ89tIw0thAwwkuRLYZCTG0gMMXLbBwAQvYOYAACUOhFxpDRaknSyg2mAFje8U8udBGM8J60Ui2EtcnFkEAADs=';
		imgData['/img/un/m/t5.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKAJECAOHu03HQAP///wAAACH5BAEAAAIALAAAAABKAEoAAALjlI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMDgNKQwAQYBqjT4A1uqxat1esT8sNX3lRsXnrrVHPbLRUBm7L36+4fE5Pre98btpU1icY9idiN4iY5xGI2OhXmMHoOOnHcUhJCRmxh9lJqNgg6TlaCXFJSqrpdIqKWijaGvvpJFvbhgVrW0vHqeuqyuo7qIqQKywIGhp8LEbssMxMpWHMDPVB7Zs8DT0qTcKdqQ3S6+oCzucMeH6WrrdearPujYPt9oMtngPbrhPI3/NPQwEAOw==';
		imgData['/img/un/m/t6.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AM7jvsvhu9Hkwd7t0K3Omb7YrLvXqbnVpuHu1N3sz9zrzsbetcjet9XmxrDQneHu03HQAOPv1eLu1OLv1OTw1uLv1eTw1+Xw1+Pv1uDt0cjfuMPbstfoyNrqy8rguc7ivY66drXToubx2KjKlLLRns/jv2ymUaHHjOfy2tLlw+Pw1uDu0q/PnOHu0p7FiYO1a5jAgZzDhtvrzcngudjpydnpytnqytrpy9TmxNbnxuXx2MHar7TSoJ3Eh7bTo////yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+4Q8vhGaoyCRfM/o9BfCJULe30miZFbbv5LKff+YPBYnMTAGE2ZvXXYROjoSEWeOfJGSfIdXb16TfTYAGJJsbVhwD5WgpaanqKmqq6ytTaJ2l65GmJm2d59QsLd7EisCGRS8vKRLcBgWFhQUjRYdCn6ZFB4sBx7RkbmrtXYSFNijxbPj5OXm5+jp6uvs7e6sXuLvQ28WkJ7a45fdw2jyWrv6DYugjFm+VwLVXChA4IMeXhEiXBBx78y/gAkzJjzoBhOFEi9MgOjhIcECB2UgRqhDjGMUjP3yqKD0rxTMMxNkMPAx4oMw1zU1zd1cM6+o0aNIkypdyrSp06dQo0qdSrWq1VQule6zmNUdN0pe30xQsCNFC5bZum5L1C8oqKEauZqCGzeWW0QPEHSqK8mCAA0MgIV7+bVCggMJwPFB8KDDT1sTBuAQYKBAg4pq4TLOVGGACxYBKvIdTG90Gmam95DaumdzaoGykOyKkKMACcQRKkzg8HqS2iOYLnAgsKGEBwUhNAxIDDlHgA0obMW2AjPlrQgT/j5WPbdfhe00XX29M2EGDwIcRPv7jQpuhAEfbjz0F9Y3+3QY7xrVjyUIADs=';
		imgData['/img/un/m/t7.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/ALfTpGZxZuLu1HeKbKnMldLlwmO9IeTw1nLKMdrqyy1cC426dYyWiam2m7nHrMLbsc7ivXKwRubx2FyyHN3rz83avpvBhZu2hZOkg0KDE5aelLHDn7C6uYGVb9nmy0ZzJdbjyNPexaHGjMbSuF6pJ6/PnOHs1OHu1MzY2NXh4eHu03HQAODu0uLv1OHv1LzXqlx+Qd/q02SfOG6IWIWxZ+Dt0Zypo3d/eMPPtXnLPsvXvMjfuMLPzs/cwNbnx////yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+1ypvuCweBxecYmrNFnckkg2kYtAsq6LBS2yIN21gwUmED4HbhIUNSxjJzEgPRU9OhUeEnl+ZHxXaV5rBy0Cli0JOwUPEC1mZ1hqKpiprq+wsbKztLW2TauXrbdDm34upCIlACUQB5ZiqFCrEg8EAACedQchMBkk2AY5EQ4mYhQCDQE2KBoMI3RfhKUUBTXq0CKDZcpLucj4YSd5lWI19bNWtKDwQgQBAvPWaOLFsKHDhxAjSpxIsaLFiwy97MKIxheyjbw0+ekU6t1HgFvurWnRSV2nAzD75SsjRSA/P20cyJgwwcCE/w8XKI1hIQGEgxBtwrhIUEKEiB01Kp2QsOOFO5A/1ByAUOIFgAIyxUgA0KHDBwVoFXyA0QDEiS8nPGyYEeAGAxscOAxwkM6Op7BgUHacSbjwF6xRVBoW+6DEMBafWCFOdU8CBAJVEwDWdTGNgMhjBHMcTbq06dOoU6tezbq169ewY8ueTZuLaNQiA9/ujG93w9yFJ9fyWGdzaN+2iZM5cOKrDwJ48gm3orjOgwcUdkDY4cO4nYWqkB0QEMLEscXfkRepTqaNBRo7I2yg4J1QSzaUKNz/MlC/7zShDJKAHxKE8AEJOeRggE80JHAeGCx5cMOEGoQggQv8sSBCBAtYALZADScIUMMDLzzTQh67eNTCA+8RQN9KIDTAgAIZ1JjBNhggBQYFI4hzAw8ppFCOB/1MRRKEFCTwwGataOKgUGvgUQINFzSAwQADzIABDiFQEAaPVjIQwAB2beCBC28FNxl7YQgQ04ksGbcPHi7AuZh666Gn53F4KsHmni2QwoJJYPzzinLoteBDUwuU4Ml0ZyBq2SGJ+OEmIZDGokYoJTRqwQ4P1tHncCuMh4dxmUqkWKoYsVpFEAA7';
		imgData['/img/un/m/t8.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKANU/AM7jvsvhu9Hkwd7t0K3Omb7YrLvXqbnVpuHu1N3sz9zrzsbetcjet9XmxrDQneHu03HQAOPv1eLu1OLv1OTw1uLv1eTw1+Xw1+Pv1uDt0cjfuMPbstfoyNrqy8rguc7ivY66drXToubx2KjKlLLRns/jv2ymUaHHjOfy2tLlw+Pw1uDu0q/PnOHu0p7FiYO1a5jAgZzDhtvrzcngudjpydnpytnqytrpy9TmxNbnxuXx2MHar7TSoJ3Eh7bTo////yH5BAEAAD8ALAAAAABKAEoAQAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2+4Q8vhGaoyCRfM/o9BfCJULe30miZFbbv5LKff+YPBYnMTAGE2ZvXXYROjoSEWeOfJGSfIdXb16TfTYAGJJsbVhwD5WgpaanqKmqq6ytTaJ2l65GmJm2d59QsLd7EisCGRS8vKRLcBgWFhQUjRYdCn6ZFB4sBx7RkbmrtXYSFNijxbPj5OXm5+jp6uvs7e6sXuLvQ28WkJ7a45fdw2jyWrv6DYugjFm+VwLVXChA4IMeXhEiXBBx78y/gAkzJjzoBhOFEi9MgOjhIcECB2UgRqhDjGMUjP3yqKD0rxTMMxNkMPAx4oMw1zU1zd1cM6+o0aNIkypdyrSp06dQo0qdSrWq1VQule6zmNUdN0pe30xQsCNFC5bZum5L1C8oqKEauZqCGzeWW0QPEHSqK8mCAA0MgIV7+bVCggMJwPFB8KDDT1sTBuAQYKBAg4pq4TLOVGGACxYBKvIdTG90Gmam95DaumdzaoGykOyKkKMACcQRKkzg8HqS2iOYLnAgsKGEBwUhNAxIDDlHgA0obMW2AjPlrQgT/j5WPbdfhe00XX29M2EGDwIcRPv7jQpuhAEfbjz0F9Y3+3QY7xrVjyUIADs=';
		imgData['/img/un/m/t9.gif'] = 'data:imgData/gif;base64,R0lGODlhSgBKAOZ/ACpaCOTw1svguleiIIOYcTp0D5zDhnaHbYO0at/s0XS2RObx2GyJVVlwTczZvbXTotvqzNLewoSmaWO2J3PGNr/Sr8XdtNDkwZa6f0pxLNzrzaLHjdjlyqu3n9npyuPw1bS+qUqNGdTmxazOmM/bwHaoWODt0oySisfUuqbJksnWvJKgiOf02MLbsXqSZmRsaanMlb7ZrMDar+Xy17zHr9zpz9Plw9bnx0aAG8PcsXB7d+Hu03HQAOLv1OPv1eLv1eLu1N3sz+Hu1OPv1r/MsOHu0tvl0L/Mr+Du0qy7tGG9Heby2ZCYicnW1dPe3nzSPYy4cXR/bODr09foyOLu1T6CDLjVpt/t0bfEws7jvpelncXQuJuxknquYaOsq3jCQ7C9oNfl5WXBIXHOLNDjwOn03dPfxn6Hh9bjxlywH32Ef4KMf5yrjZyziI+amJWdl3GmSrTCpbXNoMfettTg38TcsuTw1bO8vefv3MngubHRn5aiiOHs1Zinh5ynj////yH5BAEAAH8ALAAAAABKAEoAQAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam488OzsLeCoKUGYsPRoXMiNZAZ+vsDychDy1sLewRQkJATMLQCY9PbgJHBEOJA4OaDsfuM+1nc/T1NXW16/Rl7U8Cz8+wztAV0F1EOHYsbOZtjva6/Dx8vP09fb3+I3t0O/5g5470O2o4aLAgAkHx3xpI+XWri0v3DTxcgLEDFyyItkSeK2HBxMiDEAx0CWGCB+4fHjYgABBCjIo01Hrp2jfqwUBEvQYAgsYhAAc0/2YYmHEhhgwMt4DaA1IghgGuPmbSrWq1atYs2rdyrWr16meaH79xyOAs089EthoETOWUqrc/z4NIVEijV0lOCTUiAnu1YcrNFQkuJjtLSebsHrUiLOnAYDHAApk6OPABNoERAg00HFGS5I7a7gsmSmJqcwdARb4WNI25YKARYLKFPun1hQrQE4PEfbjw4cAQKn1COCj7+lqhgshPs78FvBhlj/R1ugpgJUSCDCMmILSh4UWKUZokH3twwKp9pZfKz5ciLvkWNVnG0u/vv37+PPr38+/v///AAYo4IAEFkgPfPrFVViCtwhjB0ZecTOcGTW4Mk4OI8BwEj/xfVKGHBLAMQAFGBihE1AeBOEeWizMcNZ7+NQSxCs98MFACE9QQIEYaShAxGiJ/caEDmqcsAULr+Q2Hf8myyl2hB8ZVIFDFSEooIALlb1iAglgRPECFk7QEcYbKjx4C3rbWJNABEeAwQYBBzBAAA0RQADLlmCssEIUB0SxRgdmkCcdgonIJ5wwwnwgzDTF/TAMoqcRKoih0wgDxBx6QPCAB66kJMIqBszxQ3M09tONDz+YgIRMAcxxgwYQeGADGVl4INsQPwigwa7RkeoWWWX5KmxzaBpC6bDHCbHifBoJ1xoso/q6mgxz7PAABMVS0g4wVmxgQAucvhKABw/YcA5zQwhgBQRZ5CGpJZ4scIEFQUyhQW4BtPDABnO8Ruy7s5iGVg+OMrdkegJXo9IVarkTYcK3+JDFwVwtR3EFfRdjEggAOw==';
	}
}
