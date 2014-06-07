// ==UserScript==
// @name           Fuuka Thread Updater
// @namespace      http://userscripts.org/users/198925
// @include        http://archive.foolz.us/*/thread/*
// @include        http://fuuka.warosu.org/*/thread/*
// @include        http://archive.installgentoo.net/cgi-board.pl/*/thread/*
// @include        http://no-info.no-ip.info/board.pl/*/thread/*
// @include        http://archive.no-ip.org/*/thread/*
// @include        https://md401.homelinux.net/4chan/cgi-board.pl/*/thread/*
// @version        0.2.1
// ==/UserScript==

(function() {

// Common functions

function F(exp,root) { return document.evaluate(exp,root||document,null,9,null).singleNodeValue; }
function qS(exp,root) { return (root||document).querySelector(exp); }
function qSa(exp,root) { return (root||document).querySelectorAll(exp); }
function I(id) { return document.getElementById(id); }

function C(tag,id,innerHTML) {
	var res = document.createElement(tag);
	if (id) res.id = id;
	if (innerHTML) res.innerHTML = innerHTML;
	return res;
}

function load(key,def) { return (typeof(GM_deleteValue)=='undefined')?localStorage.getItem(key)||def:GM_getValue(key,def); }
function save(key,value) { 
	if (typeof(GM_deleteValue)=='undefined') localStorage.setItem(key,value);
	else GM_setValue(key,value);
}

// Global variables

var title, anchor, unread = [], timer,
	innerX, innerY, QR,
	origTitle = document.title,
	updaterEnabled = eval(load('fuukaUpdaterEnabled',true)),
	QREnabled = eval(load('fuukaQREnabled',true)),
	modifyTitle = eval(load('fuukaModifyTitle',true)),
	DELAY = parseInt(load('fuukaUpdateInterval',15)),
	seconds = DELAY;
	
// Thread updater functions

function check() {
	if (!updaterEnabled) {
		if (/Checking/.test(timerText())) timerText('Stopped.');
		return;
	}
	var xml = new XMLHttpRequest();
	xml.open('GET',document.URL,true);
	xml.onload = function() {
		var temp = C('div',null,this.responseText.match(/<body.*?>((?:.|\n)+)<\/body>/)[1]),
			targets = qSa('td.reply, td.subreply',temp);
		for (var i=0;i<targets.length;i++) {
			if (!(y=targets[i]).id||document.getElementById(y.id)) continue;
			if (/subreply/.test(y.className)) y.className = 'reply subreply';
			anchor.parentNode.insertBefore((table=F('ancestor::table[1]',y)),anchor);
			unread.push(table.offsetTop);
			addQR(table);
		}
		manageTitle();
		timerText(seconds=DELAY);
		if (!updaterEnabled && /Checking/.test(timerText())) timerText('Stopped.');
		else if (updaterEnabled) timer = setInterval(manageDiv,1000);
	}
	xml.send();
}

function timerText(text) {
	var target = I('fuukaTimer');
	if (text) target.innerHTML = text;
	return target.innerHTML;
}

function manageUpdater() {
	save('fuukaUpdaterEnabled',(updaterEnabled=this.checked));
	if (!updaterEnabled) {
		if (timer) clearInterval(timer);
		if (!/Checking/.test(timerText())) timerText('Stopped.');
	}
	else {
		timerText((seconds=DELAY));
		timer = setInterval(manageDiv,1000);
	}
}

function manageDiv() {
	if (seconds-->0) I('fuukaTimer').innerHTML = seconds;
	else {
		clearInterval(timer);
		timerText('Checking...');
		check();
	}
}

function manageTitle() {
	if (!modifyTitle) return;
	else {
		if (!title) {
			var originalTitle = document.title;
			var board = qS('div > h1').innerHTML.match(/^[^\s]+/)[0],
				temp = C('div',null,qS('blockquote').innerHTML.replace(/<br>/g,' ').replace(/<.+?>/g,'')),
				text = temp.childNodes.length==0?'':temp.firstChild.nodeValue.slice(0,100);
			title = board + ' - ' + text;
		}
		document.title = '(' + unread.length + ') ' + title;
	}
}

// Quick reply functions

function addQR(root) {
	var targets = qSa('a.js',root||document);
	for (var i=0;i<targets.length;i++) targets[i].addEventListener('click',showQR,false);
}

function showQR(e) {
	if (e.which!=1||!QREnabled) return;
	e.preventDefault();
	var lastX = load('fuukaLastX','30px'), lastY = load('fuukaLastY','30px')
	if (parseInt(lastX)>document.body.scrollWidth) lastX = '30px';
	if (parseInt(lastY)>document.body.scrollHeight) lastY = '30px';
	if (!QR) {
		QR = C('div','fuukaQR','<div>Quick reply <a>X</a></div>');
		QR.style.left = lastX;
		QR.style.top = lastY;
		var form = QR.appendChild(document.querySelector('form#postform').cloneNode(false)),
			targets = qSa('td.subreply > *:not(.theader)',anchor);
		for (var i=0;i<targets.length;i++) form.appendChild(targets[i].cloneNode(true));
		form.target = 'mark';
		form.addEventListener('submit',function() { document.querySelector('div#fuukaQR tr:last-child').style.display = 'none'; },false);
		document.body.appendChild(QR);
		qS('#fuukaQR > div > a').addEventListener('click',function() { document.body.removeChild(QR); QR = null; },false);
		qS('#fuukaQR > div').addEventListener('mousedown',function(e) {
			if (e.target.nodeName=='A') return;
			e.preventDefault();
			innerX = e.layerX; innerY = e.layerY;
			document.addEventListener('mousemove',drag,false);
			document.addEventListener('mouseup',endDrag,false);
		},false);
	}
	if (this.className=='js') qS('#fuukaQR textarea[name="KOMENTO"]').value += '>>' + this.innerHTML + '\n';
}

function drag(e) {
	e.preventDefault();
	QR.style.left = (e.clientX - innerX) + 'px';
	QR.style.top = (e.clientY - innerY) + 'px';
}

function endDrag() {
	document.removeEventListener('mousemove',drag,false);
	document.removeEventListener('mouseup',endDrag,false);
	save('fuukaLastX',QR.style.left);
	save('fuukaLastY',QR.style.top);
}

// Stylesheet

var style = C('style');
style.type = 'text/css';
style.innerHTML =
	'#fuukaUpdater { position: fixed; bottom: 0; right: 0; border: 1px black solid; padding: 0px 5px 5px 5px; background: inherit; text-align: center; }\
	#fuukaTimer, #fuukaUpdater span:last-child, #fuukaUpdater table * { font-size: 12px; font-family: Georgia, Verdana, "Times New Roman", Serif; }\
	#fuukaUpdater table td:first-child { text-align: left; padding-right: 5px; }\
	#fuukaUpdater table input[name="fuukaInterval"] { padding: 0px; }\
	#fuukaUpdater hr { margin-top: 3px; margin-bottom: 0px; }\
	#fuukaUpdater span:last-child { text-decoration: underline; cursor: pointer; }\
	#fuukaUpdater:not(:hover) *:not(#fuukaTimer) { display: none; }\
	#fuukaQR { position: fixed; padding: 5px; border: 1px black solid; background: inherit; }\
	#fuukaQR > div { background: #98c1a9 !important; margin-bottom: 5px; padding-left: 5px; }\
	#fuukaQR > div:hover { cursor: move; }\
	#fuukaQR > div > a { float: right; margin-right: 5px; cursor: pointer; }\
	#fuukaMark, #fuukaQR input[name="delposts"] { display: none; }'
document.getElementsByTagName('head')[0].appendChild(style);

// Quick reply prep

addQR();

var mark = C('iframe','fuukaMark');
mark.name = 'mark';
mark.addEventListener('load',function() { if (target=qS('div#fuukaQR')) document.body.removeChild(target); },false);
document.body.appendChild(mark);

// Updater prep

anchor = F('//table[.//textarea]');

seconds = DELAY;
document.body.appendChild(C('div','fuukaUpdater',
	'<table cellpadding="0" cellspacing="0"><tbody><tr><td>Thread updater</td><td><input type="checkbox" name="fuukaUpdater" />\
	<tr><td colspan="2"><hr /></td></tr>\
	<tr><td>Quick Reply</td><td><input type="checkbox" name="fuukaQR"/></td></tr>\
	<tr><td>Modify title</td><td><input type="checkbox" name="fuukaTitle" /></td></tr>\
	<tr><td>Interval</td><td><input style="width: 25px" name="fuukaInterval" /></td></tr></tbody></table><hr />\
	<span id="fuukaTimer"></span><br><span>Update now</span>'));

timerText(DELAY);
qS('div#fuukaUpdater input[name="fuukaUpdater"]').checked = updaterEnabled;
qS('div#fuukaUpdater input[name="fuukaQR"]').checked = QREnabled;
qS('div#fuukaUpdater input[name="fuukaTitle"]').checked = modifyTitle;
qS('div#fuukaUpdater input[name="fuukaInterval"]').value = DELAY;

(inputs=qSa('div#fuukaUpdater input'))[0].addEventListener('click',manageUpdater,false);

inputs[1].addEventListener('click',function(e) {
	if (e.which!=1) return;
	save('fuukaQREnabled',(QREnabled=this.checked));
},false);

inputs[2].addEventListener('click',function(e) {
	if (e.which!=1) return;
	save('fuukaModifyTitle',(modifyTitle=this.checked));
	if (!modifyTitle) document.title = origTitle;
	else manageTitle();
},false);

qS('div#fuukaUpdater span:last-child').addEventListener('click',function(e) {
	if (e.which!=1||/Checking/.test(timerText())) return;
	if (value=parseInt(qS('div#fuukaUpdater input[name="fuukaInterval"]').value)) save('fuukaUpdateInterval',(DELAY=value));
	clearInterval(timer);
	timerText('Checking...');
	check();
},false);

var targets = document.evaluate('.//table[.//td[contains(@class,"reply")]]',document,null,6,null);
for (var i=1;i<targets.snapshotLength;i++) unread.push((x=targets.snapshotItem(i)).offsetTop);
unread = unread.filter(function(x) { return x>window.innerHeight; });

document.addEventListener('scroll',function(e) {
	if (unread.length==0||unread[0]>(y=window.pageYOffset+window.innerHeight)) return;
	unread = unread.filter(function(x) { return x>y; });
	manageTitle();
},false);

// Main

if (!updaterEnabled) timerText('Stopped.')
else timer = setInterval(manageDiv,1000);
manageTitle();

})();// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://*/*
// @copyright  2011+, You
// ==/UserScript==