// ==UserScript==
// @name           Userscripts.org - show new comments and installs
// @namespace      http://arvixx.blogspot.com
// @description    Show which scripts on your scripts-page that has new comments or installs since last time you checked. 
// @include        http://userscripts.org/users/*;scripts
// ==/UserScript==
/*
"Imitation is the sincerest form of flattery" 
http://www.gnu.org/copyleft/gpl.html 

Changelog:

2007-03-27	1.2
* Removed the signs from the total count of new installs or comments
* Redid the sorting so that the most interesting scripts should be on top, 
	where intresetingness is measured in the number of new comments.

2007-03-22	1.1a
* Fixed a bug with humanized times (in the last 1 hour => in the last hour)

2007-03-22	1.1
* Humanize numbers (10000 => 10,000)
* Show humanized time since last check (1 hour ago etc)

2007-03-21	1.0
* First version

*/

var yourscripts = ( trim($x("id('content')/h1/text()")[0].data) == 'Your scripts' );

if (yourscripts) {
	GM_addStyle('.pos { color: green ! important; } .neg { color: red ! important; }');
	var totalnewcomments = 0;
	var totalnewinstalls = 0;
	var scriptdata = deserialize('scriptdata');
	var rowdata = [];
}

var totalinstalls = 0;
var totalcomments = 0;

var scripttable = $xs("id('content')/table[@class='wide forums']/tbody");
var scriptrows = $x(".//tr[not(th)]", scripttable);
scriptrows.forEach(function (scriptrow) {
	var scripthref = $xs("./td[@class='script-meat']/a/@href", scriptrow);
	var comments = $xs("./td[@class='inv lp']/p[1]", scriptrow);
	var installs = $xs("./td[@class='inv lp']/p[2]", scriptrow);
	
	if (!(comments && installs && scripthref)) 
		return;
	
	var ncomments = comments.textContent.match(/^([\d,]+) /);
	var ninstalls = installs.textContent.match(/^([\d,]+) /);
	var scriptid = scripthref.value.match(/([\d,]+)$/);
	
	if ( !((scriptid = scriptid[1]) && (ninstalls = ninstalls[1]) && (ncomments = ncomments[1])) )
		return;
	
	ninstalls = parseCommaInt(ninstalls);
	ncomments = parseCommaInt(ncomments);
	
	totalinstalls += ninstalls;
	totalcomments += ncomments;
	
	if (yourscripts) {
		var script;
		if (script = scriptdata[scriptid]) {
			var diffinstalls = ninstalls - script.ninstalls;
			var diffcomments = ncomments- script.ncomments;
			totalnewinstalls += diffinstalls;
			totalnewcomments += diffcomments;
			
			if (diffinstalls)
				installs.appendChild(createDiffSpan(diffinstalls));
			if (diffcomments)
				comments.appendChild(createDiffSpan(diffcomments));
			if (diffcomments || diffinstalls) {
				rowdata.push({
					'diffinstalls': diffinstalls,
					'diffcomments': diffcomments,
					'scriptrow': scriptrow
				});
			}
			
		}
		
		scriptdata[scriptid] = {
			'ncomments': ncomments,
			'ninstalls': ninstalls
		};
	}
});

//sort rows that got interesting scripts
if (yourscripts) {
	rowdata.sort(function(a,b) {
		var dcomm = b['diffcomments'] - a['diffcomments'];
		var dinst = b['diffinstalls'] - a['diffinstalls'];
		return (dcomm != 0 ? dcomm : dinst);
	});
	for (var i = rowdata.length-1; i >= 0; i--) {
		scripttable.insertBefore(rowdata[i].scriptrow, scripttable.firstChild.nextSibling);
	}
}

//display totalnumber of installs and comments
var statbar  = $xs("id('content')/p[@class='subtitle']");
if (statbar) {
	statbar.appendChild(txt(" / " + humanizeInt(totalinstalls) + " installs "));
	statbar.appendChild(txt(" / " + humanizeInt(totalcomments) + " comments "));
	
	if (yourscripts) {
		var lastcheck = new Date(GM_getValue('lastcheck', false)*1000);
		var now = new Date();
		if (lastcheck && (totalnewcomments || totalnewinstalls)) {
			statbar.appendChild(txt(" / "));
			if (totalnewinstalls) {
				var df = colorNumberSpan(totalnewinstalls);
				statbar.appendChild(df);
				statbar.appendChild(txt( " new " + pluralize('install', totalnewinstalls)));
			}
			if (totalnewcomments && totalnewinstalls)
				statbar.appendChild(txt(' and '));
			if (totalnewcomments) {
				var df = colorNumberSpan(totalnewcomments);
				statbar.appendChild(df);
				statbar.appendChild(txt( " new " + pluralize('comment', totalnewcomments)));
			}
			
			var htimediff = humanizeTime(now - lastcheck, lastcheck);
			if (htimediff)
				statbar.innerHTML += " in the last " + htimediff;
			else
				statbar.innerHTML += " since " + formatDate(lastcheck);
		}
		GM_setValue('lastcheck', Math.floor(now/1000));
	}
}

if (yourscripts)
	serialize('scriptdata', scriptdata);
	
	
//std functions

function txt(str) {
	return document.createTextNode(str);
}

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $xs(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	return doc.evaluate(xpath, root||doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function humanizeInt(n) {
	n += '';
	for(var i = n.length-3; i > 0; i -= 3) {
		n = n.substring(0,i) + ',' + n.substring(i);
        }
        return n;
}

function humanizeTime(t, date) {
	var timeunits = [
		{name: 'millisecond', min: 0, max: 1000},
		{name: 'second', min: 1000, max: 60*1000},
		{name: 'minute', min: 60*1000, max: 60*60*1000},
		{name: 'hour', min: 60*60*1000, max: 24*60*60*1000},
		{name: 'day', min: 24*60*60*1000, max: 7*24*60*60*1000}
	];
	
	
	var ret = false;
	for (var i = 0, timeunit = null; timeunit = timeunits[i]; i++) {
		if (between(timeunit.min, t, timeunit.max)) {
			var timeval = Math.floor(t/(timeunit.min != 0 ? timeunit.min : 1));
			ret = (timeval != 1 ? timeval + " " : '') + pluralize(timeunit.name, timeval);
		}
	}
	
	return ret;
}

function formatDate(date) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
	var hour = date.getHours();
	var am = hour >= 0 && hour  <= 12;
	var time = (am ? hour : hour - 12 ) + ":" + pad(date.getMinutes(), 0, 2) + (am ? 'am' : 'pm');
	return [months[date.getMonth()], 
		date.getDate() + ',', 
		date.getFullYear(), 
		time].join(" ");
}

function pad(what, wth, howmuch) {
	what += ''; wth += '';
	while (what.length < howmuch) what = wth + what;
	return what;
}

function between(min, val, max) {
    return (min <= val && val < max);
}

function pluralize(word, n) {
	return word + (n != 1 ? 's' : '');
}

function deserialize(name) {
	return eval(GM_getValue(name, '({})') );
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

function createDiffSpan(diff) { //this and colorNumberSpan can be merged now
	var diffspan = colorNumberSpan(diff);
	diffspan.textContent =  ' (' + (diff > 0 ? ('+' + diff) : diff)  +')';
	return diffspan;
}

function colorNumberSpan(diff) {
	var diffh = humanizeInt(diff);
	var diffspan = document.createElement('span');
	diffspan.textContent =  diffh;
	diffspan.setAttribute('class', (diff < 0) ? 'neg' : (diff > 0 ? 'pos' : ''));
	return diffspan;
}

function trim(str) {
	return str.replace(/(^\s*|\s*$)/g, '');
}

function parseCommaInt(str) {
	return parseInt(str.replace(/,/g, ''), 10);
}