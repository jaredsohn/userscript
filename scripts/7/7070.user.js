// ==UserScript==
// @name          add google link
// @namespace     http://hp.vector.co.jp/authors/VA024182/
// @description   add google etc. link in bottom
// @include       *
// ==/UserScript==


var myHId='hatecha';

(function(){
	function addStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}

	function newLink(url, name, div){
		hburl=url;
		var newa;
		newa = document.createElement('a');
		newa.href = hburl;
		newa.innerHTML =name;
		div.appendChild(newa);

	}

	function DelDivB(div){
		newa = document.createElement('div');
		txt='<input type="button" value="x" onClick="this.parentNode.parentNode.style.display=\'none\';">';
		newa.innerHTML =txt;
		div.appendChild(newa);

	}


	title = document.getElementsByTagName('title');
	if (!title.length) { return; }
	var newa;
	var div;
	div = document.createElement('div');
	div.id = 'bottomtxt';

	newLink('http://mixi.jp/', "mixi.", div);
	newLink('http://b.hatena.ne.jp/' + myHId, "?B.", div);
	newLink('http://d.hatena.ne.jp/' + myHId, "?D.", div);
	newLink('http://d.hatena.ne.jp/' + myHId + '/edit', "?D-edit.", div);
	newLink('http://www.google.com', "google.", div);
	newLink('http://www.youtube.com/results?search_query=', "Utube.", div);
	newLink('http://wordlink.hatelabo.jp/w/'+document.title, "?WLink.", div);
	DelDivB(div);

	window.addEventListener(
	    "load",
	    function() {
	        document.body.appendChild(div);
	    },
	    true
	);




	addStyle(
	'#bottomtxt {'+
	'  position: fixed;' +
	'  left: 30;' +
	'  right: 0;' +
	'  bottom: 0;' +
	'  top: auto;' +
	'}' +
	'#bottomtxt a {' +
	'  float: left;' +
	'  background-color: white;' + //transparent
	'  color: blue;' +
	'}'
	);
})();

//
// ChangeLog
// 2006/12/28
// 2006/12/29 left 
// 2007/01/07 list