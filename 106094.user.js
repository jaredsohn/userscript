// ==UserScript==
// @name           E-Hentai Gallery Tools
// @version        1.1
// @namespace      http://userscripts.org/scripts/show/106094
// @match          http://g.e-hentai.org/*
// @match          http://exhentai.org/*
// @run-at         document-end
// ==/UserScript==

function get(query,s) {
	return Array.prototype.slice.call((s||document).querySelectorAll(query),0);
}

if (document.getElementById('newtagfield')) { // gallery

	// ---------- SEARCH FOR DUPLICATE BUTTONS ----------

	get('.gdtl a > img, .gdtm a > img').forEach(function(x) {
		var a = x.parentNode.parentNode.appendChild(document.createElement('a'));
		var hash = x.src.match(/([a-f0-9]{40,40})/);
		if (!hash) return;
		a.innerHTML = '\u2716';
		a.className = 'duplicateButton';
		a.target = '_blank';
		a.href = window.location.protocol + '//' + window.location.host + '/?f_shash=' + hash[1];
		a.title = 'Check for duplicates';
	});

	// ---------- INLINE EXPUNGING/RENAMING ----------

	var iframe = document.createElement('iframe'), isHidden = true, lastURL;
	iframe.id = 'inlineIframe';
	iframe.style.cssText = 'width: 100%; height: 380px; border-width: 0px; position: relative; margin-top: -380px;';
	
	function resizeIframe(height,margin) {
		if (height != null) iframe.style.height = height + 'px';
		if (margin != null) iframe.style.marginTop = margin + 'px';
		else iframe.style.marginTop = (-parseInt(iframe.style.height,10)) + 'px';
		isHidden = parseInt(iframe.style.marginTop,10) < 0;
	}
	
	function loadIframe(event,URL) {
	
		if (event && event.which != 1) return;
		if (event) {
			event.preventDefault();
			var url = this.getAttribute('target').match(/'(.+?)'/)[1];
		}
		
		// hide iframe
		if (!event || (!isHidden && lastURL == url)) {
			resizeIframe();
			return;
		}
		
		// load event
		iframe.addEventListener('load',function() {
		
			var doc = iframe.contentDocument;
			resizeIframe(doc.body.clientHeight,0);
			
			// check if rename petition
			if (doc.querySelector('[name="nid_r"]')) {
				if (doc.body.innerHTML.indexOf('getElementById("rename_r")') != -1) {
					// petition submitted, need to close iframe
					var HTML = doc.body.innerHTML;
					var roman = parseInt(HTML.match(/getElementById\("rename_r"\).innerHTML=(\d+);/)[1],10);
					document.getElementById('rename_r').innerHTML = roman;	
					var japanese = parseInt(HTML.match(/getElementById\("rename_j"\).innerHTML=(\d+);/)[1],10);				
					document.getElementById('rename_j').innerHTML = japanese;	
					loadIframe(); // hide iframe
				}
			}
			
			else { // expunge petition
			
				// expunge results
				if (doc.evaluate('.//a[text()="Close Window"]',doc,null,9,null).singleNodeValue) {
					if (doc.body.innerHTML.indexOf('getElementById("expungecount")') != -1) {
						var n = parseInt(x.match(/window.opener.document.getElementById\("expungecount"\).innerHTML=(.+?);/),10);
						document.getElementById('expungecount').innerHTML = n;
					}
					loadIframe(); // hide iframe
				}
				
				// main window
				else {
					var log = doc.querySelector('[name="log"]');
					if (log) {
						log.addEventListener('click',fetchLog,false);
						log.removeAttribute('onclick');
					}
				}
				
			}
			
		},false);
		
		// load iframe
		iframe.src = url;
		lastURL = url;		
		
	}
	
	function fetchLog(event) {
	
		event.preventDefault();
		if (this.className == 'stdbtn_clicked') return;
		
		this.className = 'stdbtn_clicked';
		var xhr = new XMLHttpRequest();
		xhr.open('POST',iframe.src,true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
				if (this.readyState != 4 || this.status != 200) return;
				var temp = document.createElement('div');
				temp.innerHTML = this.responseText;
				temp = temp.querySelector('.stuffbox');
				iframe.contentDocument.body.appendChild(temp);	
		};
		xhr.send('expungecat=1&expungexpl=Enter+an+explanation+for+this+expunge+here.+It+should+detail+the+location+of+the+duplicate%2C+the+specific+RoE+transgression%2C+or+why+you+feel+this+gallery+is+garbage%2C+depending+on+complaint+type.&log=Show+Expunge+Log');
		
	}
	
	document.body.insertBefore(iframe,document.body.firstChild);
	
	get('#expungelink, #renamelink').forEach(function(x) {
		x.addEventListener('click',loadIframe,false);
		x.setAttribute('target',x.getAttribute('onclick'));
		x.removeAttribute('onclick');
	});
	
	// ---------- GLOBAL STYLE ----------

	var agent = /Chrome/.test(navigator.userAgent)?'-webkit':/Firefox/.test(navigator.userAgent)?'-moz':'-o';

	var style = document.createElement('style');
	style.innerHTML =
		'.duplicateButton { color: lightcoral; margin-left: 2px; }' +
		'.duplicateButton:hover { color: red; !important; }' +
		'#inlineIframe { display: block; AGENT-transition: all .4s ease-in 0s; }';
	
	style.innerHTML = style.innerHTML.replace(/AGENT/g,agent);		
	document.querySelector('head').appendChild(style);
	
} else if (/gallerypopups/i.test(window.location.href)) { // gallery popup

	var style = document.createElement('style');
	style.innerHTML = '.stuffbox { display: inline-block !important; vertical-align: middle; height: auto !important; }' +
		'form > div { height: auto !important; }' + 
		'.e-HentaiPopup { display: none !important; }'; // prevent highlighter from cockblocking this script
	document.head.appendChild(style);

} else { // gallery list

	// ---------- COMMON SEARCH SHORTCUTS ----------

	var target = document.querySelector('.nopm + .nopm');
	
	var template = window.location.protocol + '//' + window.location.host + '/?f_doujinshi=1&f_manga=1&f_artistcg=1&f_gamecg=1&f_western=1&f_non-h=1&f_imageset=1&f_cosplay=1&f_asianporn=1&f_misc=1&f_search=';
	var buttons = ['','<a href="' + template + 'already+uploaded">Already uploaded</a>',
		'<a href="' + template + 'replaced">Replaced</a>',
		'<a href="' + template + 'prohibited+content">Prohibited</a>',
		'<a href="' + template + 'compilation">Compilation</a>'];

	target.innerHTML += buttons.join(' &nbsp; &nbsp; ');

}