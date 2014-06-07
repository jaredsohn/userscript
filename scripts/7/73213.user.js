// ==UserScript==
// @name            Userscripts.org Admin Enhancer
// @author          1nfected
// @version         0.6
// @description     For the Scriptwrights! Cleans up the install stats by removing days which have 0 installs & Draws a nice graph representing install stats. Works on Firefox, Chrome & Opera!
// @namespace       1nfected
// @license         CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include         http://userscripts.org/*
// @include         https://userscripts.org/*
// ==/UserScript==


(function() {

testGM();

try { if(self != window.top) { debug('Can\'t run in frames.'); return; } }
catch(e) { debug(e); return; }

// Update related
var scriptID = '73213';
var version = '0.6';

// Others
var zeroList = [];
var installCount = [];
var highestInstallCount = 0;
var highestInstallDate;
var admin_section;
var installRows;
var charturl;

// Sanitizer settings
var duration = 600; // Duration of animation
var steps = 17; // No of steps in animation
var maxt = 5000; // Max time taken to hide the rows (in ms)

////////////////////// HELPER FUNCTIONS //////////////////////

// Check for Greasemonkey API & adapt accordingly
function testGM() {
	const STORAGE_PREFIX = 'uscoae-';
	const LOG_PREFIX = 'UScO Admin Enhancer: ';
	var debugging = false;
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? GM_log : window.opera ? function(msg) { opera.postError(LOG_PREFIX+msg); } : function(msg) { try { console.log(LOG_PREFIX+msg); } catch(e) {} }
    debug = function(msg) { if(debugging) log('Debug: '+msg); }
	addStyle = isGM ? GM_addStyle : function(css) { var head = $('head')[0]; if(!head) return; head.appendChild($c('style',{type:'style/text',innerHTML:css})); }
	setValue = isGM ? GM_setValue : function(name,value) { switch (typeof(value)) { case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.') < 0) { localStorage.setItem(STORAGE_PREFIX+name,'N]'+value); } break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name,'B]'+value); break; } }
    getValue = isGM ? GM_getValue : function(name,defValue) { var value = localStorage.getItem(STORAGE_PREFIX+name); if(value == null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true'; } } return value; }
	deleteValue = isGM ? GM_deleteValue : function(name) { localStorage.removeItem(STORAGE_PREFIX+name); }
	xhr = isGM ? GM_xmlhttpRequest : function(obj) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
		request.onerror = function() { if(obj.onerror) { obj.onerror(request); } }
		try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
		if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
		request.send(obj.data); return request;
	}
}

// All in one function to get elements
function $(q,root,single,context) {
	root = root || document;
	context = context || root;
	if(q[0] == '#') return root.getElementById(q.substr(1));
	if(q.match(/^[\/*]|^\.[\/\.]/)) {
		if(single) return root.evaluate(q,context,null,9,null).singleNodeValue;
		var arr = []; var xpr = root.evaluate(q,context,null,7,null);
		for(var i = 0, len = xpr.snapshotLength; i < len; i++) arr.push(xpr.snapshotItem(i));
		return arr;
	}
	if(q[0] == '.') return root.getElementsByClassName(q.substr(1));
	return root.getElementsByTagName(q);
}

// Function to create an Element
function $c(type,props) {
	var node = document.createElement(type);
	if(props && typeof props == 'object') { for(prop in props) if(prop) node[prop] = props[prop]; }
	return node;
}

// Function to add a style
function addStyle(css) {
	var head = $('head')[0];
	if(!head) return;
	var style = $c('style',{type:'text/css'});
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
}

// Get textContent from table row
function getRowText(row,col) {
	return installRows[row].children[col].textContent;
}

// Returns the difference in the two dates passed, in a "Humanized" form.
// Author: Mindeye @userscripts.org
function getDateDiffString(dateNew, dateOld) {
	var dateDiff = new Date(dateNew.getTime() - dateOld.getTime());
	dateDiff.setUTCFullYear(dateDiff.getUTCFullYear() - 1970);

	var strDateDiff = '', timeunitValue = 0;
	var timeunitsHash = { year: 'getUTCFullYear', month: 'getUTCMonth', day: 'getUTCDate', hour: 'getUTCHours', minute: 'getUTCMinutes', second: 'getUTCSeconds', millisecond: 'getUTCMilliseconds' };

	for (var timeunitName in timeunitsHash) {
		timeunitValue = dateDiff[timeunitsHash[timeunitName]]() - ((timeunitName == 'day') ? 1 : 0);
		if (timeunitValue !== 0) {
			if ((timeunitName == 'millisecond') && (strDateDiff.length !== 0)) continue;
			strDateDiff += ((strDateDiff.length === 0) ? '' : ', ') + timeunitValue + ' ' + timeunitName + (timeunitValue>1?'s':'');
		}
	}
	return strDateDiff.replace(/,([^,]*)$/, ' and$1');
}

//////////////////// END HELPER FUNCTIONS ////////////////////

var url = window.location.href;

// LET THE FUN BEGIN ~
if(url.match(/^https?:\/\/userscripts\.org\/scripts\/admin\/\d+/))
	window.addEventListener('load', init, false);
else if(url.match(/^https?:\/\/userscripts\.org\/home\/scripts/))
	addLinks();

update();

function init() {
	admin_section = $('.admin_section')[0];
	installRows = $('tr',admin_section);
	rowCount = installRows.length;
	incompleteTable = getRowText(rowCount-1,0) == '2009-06-07';
	if(rowCount < 4 || (rowCount == 4 && getRowText(2,0) == '2009-06-07')) return; // Not enuff data to draw graph.
	
	// Install Stats Graph stuff...
	parseRows();
	generateChart();
	showData();
	
	// Add style
	addStyle('p.subtitle{margin:-5px 0 8px}');
	
	// Hide rows with 0 installs...
	colorize();
	window.setTimeout(dofadeOut, 2000);
	
	update();
}

function parseRows() {
	for(var i = 0; i < rowCount; i++) {
		if(getRowText(i,0) == '2009-06-07') continue;
		
		var count = getRowText(i,1);
		if(count == '0') zeroList.push(installRows[i]);
		if(count.match(/\d+/) || count == '') {
			count = (count == '') ? parseInt(getRowText(i,2)) : parseInt(count);
			installCount.push(count);
			if(count > highestInstallCount) {
				highestInstallCount = count;
				highestInstallDate = getRowText(i,0);
			}
		}
	}
}

function generateChart() {
	var dots = installCount.length;
	var maxSize = admin_section.offsetWidth - 20;
	if(maxSize > 1000 ) maxSize = 1000; // Google chart max width is 1000px!
	var cht = 'lc'; // Chat type
	var chs = (dots*5+30 > maxSize ? maxSize : dots*5+30)+"x"+65; // Chart dimensions
	var chma = '15,15,0,15'; // Inner Padding LRTB
	var chco = 'F29000'; // Line color
	var chm = 'B,FFDDAA,0,0,0'; // Fill color
	var chxt = 'x,y,r';
	var chxl = '0:||1:|0|'+Math.round(highestInstallCount/3)+'|'+Math.round(highestInstallCount/3*2)+'|'+highestInstallCount+'|2:|0|'+Math.round(highestInstallCount/3)+'|'+Math.round(highestInstallCount/3*2)+'|'+highestInstallCount;
	var chxs= '0,000000,11,0,_|1,000000,11,-1,_|2,000000,11,1,_';
	var chg = '100,33.33,2,4'; // Grid lines
	var chd = [];
	var factor = 100/highestInstallCount;
	for(var i = installCount.length-1; i >= 0; i--) chd.push(Math.round(installCount[i]*factor));
	
	charturl = 'http://chart.apis.google.com/chart?cht='+cht+'&chs='+chs+'&chma='+chma+'&chco='+chco+'&chm='+chm+'&chxt='+chxt+'&chxl='+chxl+'&chxs='+chxs+'&chg='+chg+'&chd=t:'+chd.toString();
}

function showData() {
	var div = $c('div',{id:'install_graph'});
	div.appendChild($c('img',{id:'chart',src:charturl}));
	div.appendChild($c('p',{className:'subtitle',innerHTML:'<b>Script Age</b>: '+scriptAge()}));
	div.appendChild($c('p',{className:'subtitle',innerHTML:'<b>Avg Installs</b>: <b>'+avgInstalls()+'</b>'}));
	div.appendChild($c('p',{className:'subtitle',innerHTML:'<b>Higest Installs</b>: <b>'+highestInstallCount+'</b> on '+highestInstallDate}));
	admin_section.insertBefore(div, $('table',admin_section)[0]);
}

function scriptAge() {
	var start = getRowText(rowCount-1,0).split('-');
	var now = getRowText(1,0).split('-');
	age = getDateDiffString(new Date(now[0],now[1],now[2]), new Date(start[0],start[1],start[2]));
	if(incompleteTable) age = 'More than '+age;
	return age;
}

function avgInstalls() {
	var avg = Math.round(parseInt(getRowText(1,2))/(rowCount-1));
	if(incompleteTable) avg += ' (Since 7th June 2009)';
	return avg;
}

function colorize() {
	for(var i = 0, len = zeroList.length ; i < len ; i++) {
		window.setTimeout(function(element) {
			for (i = 0; i <= 1; i += (1 / steps)) {
				window.setTimeout(function(element, level) {
					element.style.background = 'rgba(255,0,0,' + level * 0.7 + ')';
				}, i * duration, element, i);
			}
		}, 1000, zeroList[i]);
	}
}

function dofadeOut() {
	for(var i = 0, len = zeroList.length ; i < len ; i++) {
		window.setTimeout(function(element) {
			for (i = 0; i <= 1; i += (1 / steps)) {
				window.setTimeout(function(element, level) {
					element.style.opacity = level;
				}, i * duration, element, 1 - i);
			}
			window.setTimeout(function(element) { element.style.display = 'none'; }, duration, element);
		}, len*100 <= maxt ? (i+1)*100 : (i+1)*maxt/len, zeroList[i]);
	}
}

function addLinks() {
	var scriptRows = $('//tr[contains(@id,"scripts-")]');
	for(var i = 0, l = scriptRows.length; i < l; i++) {
		var script = scriptRows[i];
		var id = script.id.match(/-(\d+)/)[1];
		
		var links = script.children[1];
		links.innerHTML = links.innerHTML.replace(/\s*\|\s*/,'');
		links.innerHTML += '<a href="/scripts/admin/'+id+'">admin</a>';
		
		var reviews = script.children[2];
		if(reviews.innerHTML.match('no&nbsp;reviews'))
			reviews.innerHTML = '<a href="/scripts/reviews/'+id+'">no reviews</a>';
		
		var posts = script.children[3];
		posts.innerHTML = '<a href="/scripts/discuss/'+id+'">'+posts.innerHTML+'</a>';
		
		var fans = script.children[4];
		fans.innerHTML = '<a href="/scripts/fans/'+id+'">'+fans.innerHTML+'</a>';
	}
	
	addStyle('tr[id^="scripts-"] .inv > a { display: block }');
}

function update() {
	if(getValue('version') != version) { deleteValue('updateAvailable'); deleteValue('updateDate'); deleteValue('updateVersion'); setValue('version', version); }
	var minUpdateInterval = 60 * 60 * 24; // 1 day
	var maxUpdateInterval = 60 * 60 * 24 * 7; // 1 week
	var curTime = Math.round(new Date().getTime() / 1000);
	var lastCheck = getValue('lastUpdateCheck');
	if(lastCheck) {
		var diff = curTime - lastCheck;
		if(getValue('updateAvailable') && diff < maxUpdateInterval) { log('Showing update notification from last update check.'); showUpdate(getValue('updateVersion'), getValue('updateDate')); return; }
		if(diff < minUpdateInterval) { log('Too early for another update check.'); return; }
	}
	log('Checking for update...');
	checkUpdate(curTime);
}

function checkUpdate(time) {
	xhr({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+scriptID+'.meta.js',
		onload: function(responseDetails) {
			if(responseDetails.status == 200) {
				var meta = responseDetails.responsegetRowText;				
				var curVer = meta.match(/\/\/\s\@version\s+(.*)/)[1];
				if(curVer && version != curVer) {
					var date = meta.match(/\/\/\s\@uso:timestamp\s+(.*)\s\+/)[1];
					log('Update found! v'+curVer+' released on '+date);
					window.setTimeout(showUpdate, 1000, curVer, date);
					setValue('updateAvailable', true);
					setValue('updateVersion', curVer);
					setValue('updateDate', date);
				} else { log('No update found.'); }
				setValue('lastUpdateCheck', time);
			}
		}
	});
}

function showUpdate(ver, date) {
	var curTime = Math.round(new Date().getTime() / 1000);
	var lastOffer = getValue('lastUpdateOffered');
	if(!lastOffer || (curTime - lastOffer > 60*60*24)) {
		setValue('lastUpdateOffered', curTime);
		if(confirm('Userscripts.org Admin Enhancer: Update available!\nv'+ver+' released on '+date+'\nGo to download page?'))
			window.open('http://userscripts.org/scripts/show/'+scriptID);
	}
}

})();