// ==UserScript==
// @name           Userscripts.org Install Shortcut
// @description    Adds an INSTALL button next to a script link
// @author         1nfected
// @version        0.2.1
// @namespace      1nfected
// @license        CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*

// @require       http://www.betawarriors.com/bin/gm/57756user.js

// @history       0.2.1 Changed @require for updater to point to the betawarriors domain.

// ==/UserScript==

(function() {

testGM();

// Test for Greasemonkey API & adapt accordingly
function testGM() {
	const LOG_PREFIX = 'USc.o Install Link: ';
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? GM_log : window.opera ? function(msg) { opera.postError(LOG_PREFIX+msg); } : function(msg) { try { console.log(LOG_PREFIX+msg); } catch(e) {} }
	var debugging = true;
	debug = function(msg) { if(debugging) log('** Debug: '+msg+' **'); }
	addStyle = isGM ? GM_addStyle : function(css) { var head = $('head')[0]; if(!head) return; head.appendChild($c('style',{type:'style/text',innerHTML:css})); }
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

addStyle('.scriptInstallLink{display:inline-block;vertical-align:middle;width:16px;height:16px;margin:0 2px 0 -2px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID/mc5MQYVWVNCGTbEtNZGDBj1ogolEMR5UJA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ+31DQCc5L/nmT/P/3749ACAFBECBxiEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv/NfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0lXrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P/ZZsDaSqUkCJYVJGwKMnHTDlmWgTZ/CvjkW4sKTScP1WC+oZsKAxpwv5gyEUnAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw+jTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5fUBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8BlYrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j+9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT/gCamg6gEbsT3XvYjvIP6i9gu2ShhOWb+BvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU+iIqnyQMF+mPvJQr/FCsHwDJgG30ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY+6otr3oGpWCB/SPAAJaJRguGUxB0AAAAAElFTkSuQmCC);}');

var links = $('//a'); //log(links.length);
for(var i = 0; i < links.length; i++) {
	var link = links[i];
	if(link.href && link.href.match(/^https?:\/\/userscripts\.org\/scripts\/show\/\d+/)) {
		var parent = link.parentNode;
		if((parent.nodeName == 'LI' && parent.className == 'menu') || // Script ABOUT page
		   (parent.nodeName == 'H1' && parent.className == 'title') ||  // Script TITLE
		   (parent.className == 'favorite')) // Add to Favorites link
				continue;
		var node = $c('a',{className:'scriptInstallLink',href:'http://userscripts.org/scripts/source/'+link.href.match(/userscripts\.org\/scripts\/show\/(\d+)\/?/)[1]+'.user.js'});
		/*if(link.nextSibling) {
			parent.insertBefore(node, link.nextSibling);
		} else {
			parent.appendChild(node);
		}*/
		parent.insertBefore(node, link);
	}
}

if(typeof ScriptUpdater == 'object') ScriptUpdater.check(89482, '0.2.1'); // Check for update [Uses PhasmaExMachina's Script Updater]

// Fix docment title
document.title = document.title.replace(/&ndash;/,'-');

})();