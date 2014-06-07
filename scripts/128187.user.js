// ==UserScript==
// @name           Wait for it
// @namespace      http://userscripts.org/scripts/show/128187
// @description    Wait for something. Silently reloads the page every X seconds until some condition is met
// @version        1.02
// @include        *
// ==/UserScript==

GM_registerMenuCommand('Wait for something...', function(){

	var search = prompt('Wait for what?\n'+
		'Can be some literal text in the page, a regular expression, CSS selector or XPath query\n'+
		'Leave blank to wait for any change',
		localStorage['wfi_wfw'] || '');
	if(search === null) return;

	var html = null;
	try{ var re = new RegExp(search, 'i'); }
	catch(e){ re = null; }

	function check(doc){
		if(!search){
			if(doc == document) return false;
			var d = doc.documentElement.innerHTML;
			if(!html) html = d;
			return html != d;
		}

		//CSS
		try{ if(doc.querySelector(search)) return true; }
		catch(e){}

		//XPath
		try{
			var res = doc.evaluate(search, doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
			if(res.singleNodeValue) return true;
		}
		catch(e){}

		//RegExp
		if(re && re.test(doc.documentElement.textContent)) return true;

		//text
		return doc.documentElement.textContent.indexOf(search) > -1;
	}

	if(check(document)){
		alert('"'+search+'" is already there, nothing to wait for...');
		return;
	}

	var secs = prompt('Check every how many seconds?', localStorage['wfi_secs'] || 30)*1;
	if(!secs) return;

	localStorage['wfi_wfw'] = search;
	localStorage['wfi_secs'] = secs;

	var div = document.createElement('div');
	div.innerHTML = 'Waiting for '+(search ? '"'+search+'"' : 'anything')+' every '+secs+' seconds... Last checked at <span id="wfi_last"/>';
	div.style.position = 'fixed';
	div.style.top = '0';
	div.style.left = '0';
	div.style.backgroundColor = '#ffc';
	document.body.appendChild(div);
	var last = document.getElementById('wfi_last');

	var xhr = new XMLHttpRequest();
	function load(){
		document.body.removeChild(div);
		if(check(document)){
			alert((search ? '"'+search+'"' : 'somehing')+' found in '+document.title);
		}
		else{
			document.body.appendChild(div);
			
			xhr.open('GET', document.location.href, true);
			xhr.send();
			last.innerHTML = new Date();
		}
	}

	var doc = document.implementation.createHTMLDocument('');
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200){
			doc.documentElement.innerHTML = xhr.responseText;
			if(check(doc)){
				alert((search ? '"'+search+'"' : 'somehing')+' found in '+document.title);
				document.location.reload();
			}
			else setTimeout(load, secs*1000);
		}
	};

	load();
});