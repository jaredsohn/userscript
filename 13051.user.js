// ==UserScript==
// @author      Risi
// @namespace	http://userscripts.org/
// @name		Travian: Send Scouts!
// @description	Travian useful send scouts button.
// @include     http://s*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @exclude     http://s*.travian.*/dorf1*
// @exclude     http://s*.travian.*/dorf2*
// @version     1.0.3
// ==/UserScript==

/*
 * --Credits--
 * Some code was borrowed from other useful user scripts: 
 *   - Travian Multicrop Finder ( functions tss_loadXMLDoc() and tss_processReqChange())
 *   - Beyond Travian (function elem()).
 */

////////////////////////  Settings  ////////////////////////////
var iScoutsNumber = 1;  // How many scouts should we send?
//////////////////////////////////////////////////////////////

var myRace = parseInt(getOption("RACE", 0));  //we make sure this is integer
var sScoutUnitName = "";  //this will be set automatically
var sNotScoutUnitName = "";  //this will be set automatically
switch(myRace) {
	case 1:
		var tScoutImg = 'data:image/gif;base64,R0lGODlhEAAQANU/AOrz5FuGPoKtZGqYSlN8OYyyc/H06vT58qjEk1qEPYWvaPj49E1zNYKla4coK+Tv3v7//pEqLlB0OHCYVXqnXPn8+ExuNFF3N5G9c3GiUJaNWdjUwb6miX2rXlaAOqlSTbJVTm1SMsXatcfcuIClZvLs5tnozqZdU4ivbaPAj5q9gevv4nu0X71vZmyRUnViOZnAflJ5OMrivJm+f8BKTpoxM7KNertMTFqAQZa7fGZFLbLOnn5JM6RuX1qNQP///yH5BAEAAD8ALAAAAAAQABAAAAaBwJ9wSCwaj8aNrXf6tBbIH8jhiNRuq2grQo3QSlEOTxd6aQxRmY9B8LEAUcDAcgkIHtEDhXFJUEZRFQIXMR4dM3hHggwSCQMYOSIAEEUVCgQXBAkZGDAoBSmJPxAqjDgJFx4DCgUoAkQ7FxY4CCkkExMFCIBDJiQuDWgQBweUUVFBADs%3D';
		break;
	case 0:
	case 2:
		var tScoutImg = 'data:image/gif;base64,R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
		break;
}
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var aCoordinatesCache = new Array();
var iCount = 0;

function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1)
		GM_log(msg);
}

function tss_makeForm(aCoordinates, oLink, iCount) {  
	_log(2, "Coordinates: "+aCoordinates[0]+","+aCoordinates[1]+","+aCoordinates[2]);
	var oForm = document.createElement('form');
	oForm.setAttribute("method", "POST");
	oForm.setAttribute("action", "a2b.php?");
	oForm.setAttribute("id", "snd_"+iCount);
	oForm.setAttribute("name", "snd_"+iCount);
	oForm.style.display = "none";
	var tFormContent = '<input type="hidden" name="b" value="1">';
	tFormContent += '<input class="fm" type="Text" name="' +sScoutUnitName+ '" value="'+iScoutsNumber+'" size="2" maxlength="6">';
	tFormContent += '<input type="Radio" name="c" value="2" checked><input type="Radio" name="c" value="3" checked><input type="Radio" name="c" value="4" >';  // Check Normal Attack
	tFormContent += '<input class="fm" type="Text" name="dname" value="" size="10" maxlength="20">';  // Name of the target
	tFormContent += '<input class="fm" type="Text" name="x" value="'+aCoordinates[1]+'" size="2" maxlength="4">';  // Target's X axis
	tFormContent += '<input class="fm" type="Text" name="y" value="'+aCoordinates[2]+'" size="2" maxlength="4">';  // Target's Y axis
	tFormContent += '<input class="fm" type="Text" name="t1" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t7" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t9" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t2" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t5" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t8" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t10" value="" size="2" maxlength="6"><input class="fm" type="Text" name="t6" value="" size="2" maxlength="6">';
	tFormContent += '<input class="fm" type="Text" name="' +sNotScoutUnitName+ '" value="" size="2" maxlength="6">';
	oForm.innerHTML = tFormContent;
	GM_log(tFormContent);
	document.body.appendChild(oForm);
	var atklink = elem('a',"<img src='" + tScoutImg + "' style='margin:3px 0px 1px 3px; display: inline' height=10 width=10 title='Send scouts' alt='[Spy]' border=0>");
	atklink.href = 'javascript:document.getElementById("snd_'+iCount+'").submit();';		
	oLink.parentNode.insertBefore(atklink, oLink.nextSibling);
}

function tss_findCoordinates(kid, oLink, iCount) {
  tss_loadXMLDoc(oLink.href, oLink, iCount);
}

function tss_loadXMLDoc(myUrl, oLink, iCount) {
	if (window.XMLHttpRequest) {
		eval("req"+iCount+" = new XMLHttpRequest();");
		eval("req"+iCount+".onreadystatechange = function() {tss_processReqChange(req"+iCount+", oLink, iCount)};");
		eval("req"+iCount+".open('GET', myUrl, true);");
		eval("req"+iCount+".send(null);");
	}
}

function tss_processReqChange(req, oLink, iCount) {
  var aCoordinates = new Array();
	if (req.readyState == 4) {
		if (req.status == 200) {
			var reqTxt = req.responseText;
			var re = /<div id="lmid2">.*<h1>.*\(([-]?[0-9]{1,3})\|([-]?[0-9]{1,3})\)<\/h1>/i;
				_log(3, reqTxt);
			var aCoordinates = reqTxt.match(re);
				_log(3, "aCoordinates: " + aCoordinates);
			if (aCoordinates && aCoordinates[1] && aCoordinates[2]){				  
				tss_makeForm(aCoordinates, oLink, iCount);
				_log(2, "X and Y found: "+aCoordinates[1]+","+aCoordinates[2]);
			} else {
				_log(2, "The village info not found.");
			}		

		} else {
	    _log(2,"There was a problem retrieving the XML data:\n" + req.statusText);
		}
	}
}


function elem(tag, content){ 
		var ret = document.createElement(tag);  
		ret.innerHTML = content;  
		return ret;
}

function readCookie(name) {
	var reg = new RegExp(name + "=([^;\n\r]*);?", "i");
	var data = reg.exec(document.cookie);
	if (data == null || data.length <= 1) {
		return '';	
	}	
	return data[1];
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";	
	document.cookie = name+"="+value+expires+"; path=/";	
	return true;
}

function setRomans() {
	setOption("RACE", 0); 
	alert("Your race was set to Romans.");
	location.reload();
}
function setTeutons() {
	setOption("RACE", 1); 
	alert("Your race was set to Teutons.");
	location.reload();
}
function setGauls() {
	setOption("RACE", 2); 
	alert("Your race was set to Gauls.");
	location.reload();
}
function showRace() {
	myRace = parseInt(getOption("RACE", 0));
	switch(myRace) {
		case 0:
			var sRace = "Romans";
			break;
		case 1:
			var sRace = "Teutons";
			break;
		case 2:
			var sRace = "Gauls";
			break;
		default:
			var sRace = "unknown";
			break;
	}
	alert("Your currently selected race is " + sRace + ".");
}

function setOption(key, value) {
	var options = readCookie("TSS_OPTIONS");
	if(options != '') options = options.split(",");
	else options = [];
	var myOption = options.indexOf(key);
	if(myOption < 0) {
		options.push(key);
		options.push(value);
	} else {
		options[myOption + 1] = value;
	}
	options.join(",");
	createCookie("TSS_OPTIONS", options);
}

function getOption(key, defaultValue) {
	var options = readCookie('TSS_OPTIONS');
	options = options.split(",");
	var myOption = options.indexOf(key);
	if(myOption < 0) {return defaultValue;}
	return options[myOption + 1];
}

function tss_onLoad() {
	var oForm = null;
	var iCount = 0;  
	
	switch(myRace) {
		case 0:
			GM_registerMenuCommand("Travian Send Scouts: Teutons", setTeutons);
			GM_registerMenuCommand("Travian Send Scouts: Gauls", setGauls);
			break;
		case 1:
			GM_registerMenuCommand("Travian Send Scouts: Romans", setRomans);
			GM_registerMenuCommand("Travian Send Scouts: Gauls", setGauls);
			break;
		case 2:
			GM_registerMenuCommand("Travian Send Scouts: Romans", setRomans);
			GM_registerMenuCommand("Travian Send Scouts: Teutons", setTeutons);
			break;
	}
	
	GM_registerMenuCommand("Travian Send Scouts: Show race", showRace);
	
	sScoutUnitName = (myRace > 1) ? "t3":"t4";
	sNotScoutUnitName = (myRace > 1) ? "t4":"t3";
	var re = /.*karte\.php\?d=(\d+).*/i;	
	if (re.test(window.location.href)) { // on the karte page
		var sXpathExpr = "//div[@id='lmid2']//h1";
		var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(xpathRes.snapshotLength > 0) {
				_log(3, xpathRes.snapshotItem(0).innerHTML);
			var re = /.*\(([-]?[0-9]{1,3})\|([-]?[0-9]{1,3})\)$/i;			
			var aCoordinates = xpathRes.snapshotItem(0).innerHTML.match(re);
			sXpathExpr = "//div[@class='map_details_actions']//a";
			xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(xpathRes.snapshotLength > 0) {
				for (var i = 0; i < xpathRes.snapshotLength; ++i) {
					if(xpathRes.snapshotItem(i).getAttribute("href").match(/a2b\.php.*/i)) {
						var oLink = xpathRes.snapshotItem(i);
					}
				}
			}
			if(oLink == null) return;			
			tss_makeForm(aCoordinates, oLink, iCount);
		}
	} else {  // on other pages
		var links = document.getElementsByTagName("a");
		for(var i = 0; i < links.length; i++){		
			if (aMatches = links[i].href.search(/karte.php\?d=(\d+)/) > 0) {
				iCount++;
					_log(2, "Other pages: " + iCount+" "+links[i].href);
					_log(3, "aMatches:\n" + aMatches[0] + "\n" + aMatches[1]);
				tss_findCoordinates(aMatches[1] ,links[i], iCount);
			}
		}
	}	
}



// --- Main Code Block ---
_log(0, "TSS started");

window.addEventListener( 'load', tss_onLoad, false);
