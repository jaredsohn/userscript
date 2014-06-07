// ==UserScript==
// @name        Schauburg Karlsruhe: add calendar microformats
// @namespace   duskofaquarius.tools
// @include     /^http://(www\.)?schauburg\.de/(programm|titel)\.php/
// @version     0.9.3
// @license	MIT License
// ==/UserScript==

// time zone handling ------------------------------

// Europe/Berlin time zone data from 2012 to 2020
// extracted from tzdata ( http://gitorious.org/tz )

var berlinTZ = [
    {
	"from": 1319936400000, // 2011-10-30T01:00:00Z
	"to": 1332637200000, // 2012-03-25T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1332637200000, // 2012-03-25T01:00:00Z
	"to": 1351386000000, // 2012-10-28T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1351386000000, // 2012-10-28T01:00:00Z
	"to": 1364691600000, // 2013-03-31T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1364691600000, // 2013-03-31T01:00:00Z
	"to": 1382835600000, // 2013-10-27T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1382835600000, // 2013-10-27T01:00:00Z
	"to": 1396141200000, // 2014-03-30T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1396141200000, // 2014-03-30T01:00:00Z
	"to": 1414285200000, // 2014-10-26T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1414285200000, // 2014-10-26T01:00:00Z
	"to": 1427590800000, // 2015-03-29T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1427590800000, // 2015-03-29T01:00:00Z
	"to": 1445734800000, // 2015-10-25T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1445734800000, // 2015-10-25T01:00:00Z
	"to": 1459040400000, // 2016-03-27T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1459040400000, // 2016-03-27T01:00:00Z
	"to": 1477789200000, // 2016-10-30T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1477789200000, // 2016-10-30T01:00:00Z
	"to": 1490490000000, // 2017-03-26T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1490490000000, // 2017-03-26T01:00:00Z
	"to": 1509238800000, // 2017-10-29T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1509238800000, // 2017-10-29T01:00:00Z
	"to": 1521939600000, // 2018-03-25T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1521939600000, // 2018-03-25T01:00:00Z
	"to": 1540688400000, // 2018-10-28T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1540688400000, // 2018-10-28T01:00:00Z
	"to": 1553994000000, // 2019-03-31T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1553994000000, // 2019-03-31T01:00:00Z
	"to": 1572138000000, // 2019-10-27T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1572138000000, // 2019-10-27T01:00:00Z
	"to": 1585443600000, // 2020-03-29T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    },
    {
	"from": 1585443600000, // 2020-03-29T01:00:00Z
	"to": 1603587600000, // 2020-10-25T01:00:00Z
	"dst": true,
	"offset": 7200,
	"name": "CEST"
    },
    {
	"from": 1603587600000, // 2020-10-25T01:00:00Z
	"to": 1616893200000, // 2021-03-28T01:00:00Z
	"dst": false,
	"offset": 3600,
	"name": "CET"
    }
];

berlinTZ.name = "Europe/Berlin";

function unavailableTZMessage(zone, millis) {
    return ;
}

// returns all posible zone entries within +/- 24 h of the given time
// so that ambiguities can be detected / fixed
function findZoneEntries(zone, millis, pad) {
    if (pad === undefined) pad = 24*3600*1000;

    var entries = zone.filter(function(e){ return millis+pad >= e.from && millis-pad < e.to });

    if (entries.length > 0)
	return entries;

    throw "Time zone info not available for "
	+ zone.name + ", " 
	+ new Date(millis).getFullYear() +".";
}

// create a correct date with the given time zone
// for illegal or ambiguous dates, a warning is logged
// and an estimation is returned
function createDate(yr, mon, day, hr, min, zone) {

    // interpret date as utc date
    var utc = new Date( Date.UTC(yr,mon-1, day, hr, min) );
    var entries = 
	findZoneEntries(zone, utc.getTime())
	.map(function(e){

	    return new Date(utc.getTime() - 1000*(e.offset))})

	.filter(function(tm){

	    var tzes = findZoneEntries(zone, tm.getTime(), 0);

	    if (tzes.length != 1) 
		return false;

	    var tze = tzes[0];

	    var check = new Date(tm.getTime() + 1000*(tze.offset));
	    return check.getUTCFullYear() == yr
		&& check.getUTCMonth()+1 == mon
		&& check.getUTCDate() == day
		&& check.getUTCHours() == hr
		&& check.getUTCMinutes() == min;

	});

    if (entries.length == 0)
	throw "illegal date: "+ yr +"-"+ mon +"-"+ day +" "+ hr +":"+ min
	+ " in zone " + zone.name;

    if (entries.length > 2)
	throw "something must be seriously wrong with the time zone data!";

    if (entries.length > 1) 
	entries[0].state="AMBIGUOUS";

    if (entries.length == 1)
	entries[0].state="OK";

    return entries[0];

}


// utility functions ------------------------------

function addCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
}

function xpath(xp, root)
{
    if(root === undefined) root = document;
    return document.evaluate(xp, root, null, 
			     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpath1(xp, root)
{
    var res = xpath(xp, root);
    return (res.snapshotLength > 0) ? res.snapshotItem(0) : null;
}

function estimateYear(now, mon, day) {
    var yr = now.getFullYear();
    var then = new Date(yr,mon,day,0,0,0,0);
    var maxDist = 0.4 * 365 * 24 * 3600 * 1000;
    if (then.getTime() -  now.getTime() > maxDist) return yr-1;
    if ( now.getTime() - then.getTime() > maxDist) return yr+1;
    return yr;
}

function surroundElement(elem, surrounding) {
    elem.parentNode.insertBefore(surrounding, elem);
    surrounding.appendChild(elem);
}

function padLeft(str, padChar, width) {
    return (Array(width+1).join(padChar)+str).slice(-width);
}

Date.prototype.toTimezoneOffset = function() {
    var tzo = this.getTimezoneOffset();

    if (tzo == 0) 
	return "Z";

    // negative timezone offset means positive offset in iso8601 stamps
    var sig = tzo<0 ? "+" : "-";
    tzo = (tzo<0)?-tzo:tzo;

    return sig
	+ padLeft(tzo / 60, "0", 2)
	+ ":"
	+ padLeft(tzo % 60, "0", 2);
}

function newElem(e) {
    var name = 'div';

    if (e.name !== undefined)
	name = e.name;

    var res = document.createElement(name);

    if (e.klass !== undefined) 
	res.className = e.klass;

    if (e.contents !== undefined)
	res.innerHTML = e.contents;
    
    return res;
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(str) {
      return this.lastIndexOf(str, 0) === 0;
  }
}

if (typeof String.prototype.trim != 'function') {
    String.prototype.trim = function(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}

if (typeof Date.prototype.toLocalISOString != 'function') {
    Date.prototype.toLocalISOString = function() {
	return ""+this.getFullYear()
	    +"-"+padLeft(this.getMonth()+1,"0",2)
	    +"-"+padLeft(this.getDate(),"0",2)
	    +"T"+padLeft(this.getHours(),"0",2)
	    +":"+padLeft(this.getMinutes(),"0",2)
	    +":"+padLeft(this.getSeconds(),"0",2)
	    +this.toTimezoneOffset();
    }
}


// site-specific logic starts here ------------------------------

function insertHCalendarData() {
    var dateRE = /[^,]*,\s*([0-9]+)\.\s*([0-9]+)\./;
    var timeRE = /(..)\.(..)/;
    var now = new Date();
    
    var changed = false;
    
    var dayHeaders = xpath("//h5");

    for (var i = dayHeaders.snapshotLength - 1; i >= 0; i--) {
	var elm = dayHeaders.snapshotItem(i);
	var tab = elm.nextSibling;
	
	if (tab.tagName != "TABLE") continue;
	if (!dateRE.test(elm.textContent)) continue;
    
	mo = dateRE.exec(elm.textContent);
	var mon=parseInt(mo[2],10);
	var day=parseInt(mo[1],10);

	var rowResults = xpath(".//tr", tab);
	for (var j = rowResults.snapshotLength - 1; j >= 0; j--) {
	    
	    var row = rowResults.snapshotItem(j);
	    var cols = xpath(".//td", row);

	    row.className = "vevent";
	    changed = true;
	    
	    var timeCell = cols.snapshotItem(0);
	    var descrCell = cols.snapshotItem(1);
	    
	    descrCell.className="summary";
	    
	    var time = timeRE.exec( timeCell.textContent );
	    var hr = parseInt(time[1],10);
	    var mn = parseInt(time[2],10);
	    
	    var yr = estimateYear(now, mon, day);
	    var evt_date = createDate(yr, mon, day, hr, mn, berlinTZ);
	
	    // hCalendar time
	    var newTimeCell = document.createElement("td");
	    var abbr = document.createElement("abbr");
	    abbr.className = "dtstart";
	    abbr.setAttribute("title", evt_date.toLocalISOString());
	    abbr.innerHTML = timeCell.innerHTML;
	    newTimeCell.appendChild(abbr);
	    
	    // hCalendar location
	    var loc = document.createElement("span");
	    loc.setAttribute("style", "display: none");
	    loc.className = "location";
	    loc.appendChild(document.createTextNode("Schauburg"));
	    newTimeCell.appendChild(loc);
	    
	    timeCell.parentNode.replaceChild(newTimeCell, timeCell);
	    
	}
    }

    if (changed) 
	addCss("abbr { border: 0; }");

}

function insertHCardData()
{
    var title = xpath1(".//img[@alt='Schauburg-Logo']");
    if (!title) return;
    
    var hcard = document.createElement("div");
    hcard.className = "vcard geo";
    hcard.innerHTML="<div style='display: none'>"
	+"<span class='org'>Schauburg Karlsruhe</span>,"
	+" <span class='adr'>"
	+"    <span class='street-address'>Marienstraße 16</span>,"
	+"    <span class='postal-code'>76137</span>"
	+"    <span class='locality'>Karlsruhe</span>"
	+"</span>"
	+" (<abbr class='latitude' title='49.003234'>49° 0' 11\"N</abbr>" 
	+" <abbr class='longitude' title=8.407835'>8,4° 24' 28\"O</abbr>)"
	+"</div>"
    ;
    surroundElement(title, hcard);
}

function spruceUpImpressum() {
    var impr = xpath1("//p[preceding-sibling::*[position()=1 and name()='H4']]");
    if (!impr) return;

    impr.className = "vcard";

    var lines = xpath("text()", impr);
    for (var i = impr.childNodes.length - 1; i >= 0; i--) {
	var c = impr.childNodes.item(i);

	if (c.localName)
	    continue;

	var line = c.textContent.trim();

	if (i == 0) {
	    surroundElement(c, newElem({name:'span', klass:'org', contents:''}));
	}

	var tel = line.split(/^(?:Telefon:)/);
	if (tel.length > 1) {
	    c.innerHTML = tel[0];
	    c.textContent = tel[1];
	    //c.appendChild(newElem({name:'span', klass:'tel', contents:tel[1]}));
	}

	addCss('.org { font-weight: bold; }');
    }
}


// run it...
try {
    insertHCalendarData();
    insertHCardData();
    spruceUpImpressum();
} catch (e) {
    alert(e);
}


// Runtime Tests ------------------------------

var SHOULD_FAIL = "should fail";
var run_tests = false;

function rep(ye,mo,da,ho,mi,tz, comment) {
    try {

	var dat = createDate(ye,mo,da,ho,mi,tz);

    } catch (e) {
	
	GM_log("caught " + e);
	if (comment === SHOULD_FAIL) {
	    return;
	}

	throw e;
    }

    GM_log(
	comment!==undefined?comment:"", 
	dat.state,
	dat.toLocalISOString()
    );
}

if (run_tests) {
 
   GM_log("spring");
    rep(2012, 01, 24, 21, 0, berlinTZ);
    rep(2012, 03, 24, 21, 0, berlinTZ);
    rep(2012, 03, 24, 22, 0, berlinTZ);
    rep(2012, 03, 24, 23, 0, berlinTZ);
    rep(2012, 03, 25, 0, 0, berlinTZ);
    rep(2012, 03, 25, 1, 0, berlinTZ);
    rep(2012, 03, 25, 1,59, berlinTZ);
    rep(2012, 03, 25, 2, 0, berlinTZ, SHOULD_FAIL);
    rep(2012, 03, 25, 2, 1, berlinTZ, SHOULD_FAIL);
    rep(2012, 03, 25, 2, 59, berlinTZ, SHOULD_FAIL);
    rep(2012, 03, 25, 3, 0, berlinTZ);
    rep(2012, 03, 25, 4, 0, berlinTZ);

    GM_log("fall");
    rep(2012, 10, 27,23, 0, berlinTZ);
    rep(2012, 10, 28, 0, 0, berlinTZ);
    rep(2012, 10, 28, 1, 0, berlinTZ); //
    rep(2012, 10, 28, 1,59, berlinTZ);
    rep(2012, 10, 28, 2, 0, berlinTZ);
    rep(2012, 10, 28, 2,10, berlinTZ, "ambiguous");
    rep(2012, 10, 28, 2,50, berlinTZ, "ambiguous");
    rep(2012, 10, 28, 3, 0, berlinTZ);
    rep(2012, 10, 28, 3,10, berlinTZ);
    rep(2012, 10, 28, 3,50, berlinTZ);
    rep(2012, 10, 28, 4, 0, berlinTZ);
    rep(2012, 10, 28, 5, 0, berlinTZ);
    rep(2012, 10, 28, 6, 0, berlinTZ);

}