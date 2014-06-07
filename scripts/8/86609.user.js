// ==UserScript==
// @name            BwT Enhancer
// @decsription     Removes the annoying attachment popup & displays torrent details in-line.
// @author          1nfected
// @version         0.2
// @namespace       1nfected
// @license         CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include         http://www.bwtorrents.com/forumdisplay*
// @include         http://www.bwtorrents.com/showthread*
// ==/UserScript==

(function() {

testGM();

// Test for Greasemonkey API & adapt accordingly
function testGM() {
	const LOG_PREFIX = 'BwT Enhancer: ';
	var debugging = true;
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? GM_log : window.opera ? function(msg) { opera.postError(LOG_PREFIX+msg); } : function(msg) { try { console.log(LOG_PREFIX+msg); } catch(e) {} }
	debug = function(msg) { if(debugging) log(msg); }
	xhr = isGM ? GM_xmlhttpRequest : function(obj) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState == 4 && obj.onload) { obj.onload(request); } }
		request.onerror = function() { if(obj.onerror) { obj.onerror(request); } }
		try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
		if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
		request.send(obj.data); return request;
	}
}

////////////////////// HELPER FUNCTIONS //////////////////////

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

//////////////////// END HELPER FUNCTIONS ////////////////////


var url = window.location.href;

// Redirect page with threads sorted by start time.
if(url.indexOf("forumdisplay.php") != -1 && url.indexOf("sort=dateline") == -1) window.location.replace(url+"\&sort=dateline");

// Attachments Popup remover
var links = $('//a[contains(@href,"popAttach")]');
for(var i = 0, l = links.length; i < l; i++) {
	var link = links[i];
	if(link.href.indexOf('popAttach') != -1) {
		link.href = "http://www.bwtorrents.com/attachment.php?" + link.href.match(/'\?(.*)'/)[1];
	}
}

// Inline torrent details loader
var attachments = $('.attachments');
if(!attachments) return;

addStyle('.attachments ul>table.tborder[width="400"]{width:100%!important}.attachments ul>table.tborder[width=\"400\"] .table_content{max-height:400px;overflow-y:auto;padding: 5px 10px}.attachments ul>table.tborder[width=\"400\"]>tbody{background:lightgrey;border:1px solid grey}.attachments ul>table.tborder[width=\"400\"]>tbody td{padding:2px 3px!important}');

for(var i = 0, l = attachments.length; i < l; i++) {
	var attachment = attachments[i];
	var attachmentTable = $('table',attachment)[0];
	
	var peerlistExpandBtn = $('./tbody[1]//a[contains(@onclick,"toggle_collapse")]',document,true,attachmentTable);
	var leecherExpandBtn = $('./tbody[5]//a[contains(@onclick,"toggle_collapse")]',document,true,attachmentTable);
	
	if(peerlistExpandBtn) {
		peerlistExpandBtn.addEventListener('click',function(e) {
			debug('Peer list button clicked');
			var peerlistLink = $('./tbody[2]//a[contains(@href,"peerlist.php")]',document,true,attachmentTable);
			if(peerlistLink) {
				debug('Fetching peer list');
				fetchDetails(peerlistLink.href,function(response) {
					var temp = $c('div',{innerHTML:response});
					var t = $('table',temp)[0];
					if(!t) { debug('No table'); return; }
					var r = $('tr',t)[0];
					r.parentNode.removeChild(r);
					var peerlist = $c('div',{className:'table_content'});
					peerlist.appendChild(t);
					peerlistLink.parentNode.replaceChild(peerlist, peerlistLink);
				});
			}
		},false);
	}
	
	if(leecherExpandBtn) {
		leecherExpandBtn.addEventListener('click',function(e) {
			debug('Leecher button clicked');
			var leecherLink = $('./tbody[6]//a[contains(@onclick,"lastSnatch.php")]',document,true,attachmentTable);
			if(leecherLink) {
				debug('Fetching leecher list');
				var url = leecherLink.getAttribute('onclick');
				url = 'http://www.bwtorrents.com/'+url.split('\'')[1].split('\'')[0];
				fetchDetails(url,function(response) {
					var temp = $c('div',{innerHTML:response});
					var t = $('table',temp)[0];
					if(!t) { debug('No table'); return; }
					var leecherlist = $c('div',{className:'table_content'});
					leecherlist.appendChild(t);
					var parent = leecherLink.parentNode;
					parent.innerHTML = '';
					parent.appendChild(leecherlist);
				});
			}
		},false);
	}
}

function fetchDetails(url,callback) {
	debug('Performing XHR');
	xhr({
		method: 'GET',
		url: url,
		onload: function (responseDetails) {
			callback(responseDetails.responseText);
        }
    });
}

})();