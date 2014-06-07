// ==UserScript==
// @name                Find StopArrestingMe Comments
// @description         Searches a thread on Fark for instances of StopArrestingMe comments and then provides anchor links to those comments found
// @include http://www.fark.com/*
// @include http://fark.com/*
// ==/UserScript==


(function() {
	var results = document.evaluate("//a[@href='http://www.fark.com/cgi/users.pl?login=StopArrestingMe']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(results.snapshotLength) {
		var css = '.gm-alertbox { position: fixed; top: 0; left: 0; }'+
				  '.gm-alertbox ul { margin: 0; padding: 0; }'+
				  '.gm-alertbox li { float: left; list-style: none; margin: 0; padding: 0; }'+
				  '.gm-alertbox li a { float: left; display: block; margin-right: 10px; }'+
				  '.gm-alertbox a { color: #00529B; }'+
				  '.close { position: absolute; top: 0; right: 0; font-size: 8px; }'+
				  '.info { border: 1px solid; padding: 0px 10px 10px; color: #00529B; background-color: #BDE5F8; }';
		var dummyDiv = document.createElement('div');
		var holder = document.createElement('div');
		holder.setAttribute('class', 'gm-alertbox info');
		holder.setAttribute('id', 'gm-sam-alertbox');
		addGlobalStyle(css);
		var content = '<p>This is a StopArrestingMe thread.</p>';
		content = content+'<a class="close" onclick="javascript:removeBox();">Close</a>';
		content = content+'<ul>';
		for (var i = 0; i <= results.snapshotLength - 1; i++) {
			var elm = results.snapshotItem(i);
			content = content+'<li><a href="#'+elm.id+'">StopArrestingMe Comment</a></li>';
		}
		content = content+'</ul>';
		holder.innerHTML = content;
		dummyDiv.appendChild(holder);
		document.body.insertBefore(dummyDiv.firstChild, document.body.firstChild);
	}
	function embedFunction(s) {
		document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	}
	function removeBox() {
		el = document.getElementById('gm-sam-alertbox');
		el.style.display='none';
	}
	embedFunction(removeBox);

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
})();