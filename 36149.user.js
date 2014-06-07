// ==UserScript==
// @name		Getchu.com - open links _blank for aisex.com
// @description	Getchu.com - open links _blank for aisex.com
// @include		*.aisex.com*
// @exclude		*.js
// @exclude		*.gif
// @exclude		*.jpg
// @exclude		*.png
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

function _attachEvent(obj, evt, func) {
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(obj.attachEvent) {
		obj.attachEvent("on" + evt, func);
	}
}

function find(xpath, xpres, startnode, doc){
	if (!startnode) {startnode=document;}
	doc = doc != null ? doc : document;

	xpres = xpres ? xpres : XPList;

	var ret = doc.evaluate(xpath, startnode, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function preg_replace(search, replace, str, mode) {
	var len = search.length;

	if (mode) {

		for(var i = 0; i < len; i++) {
			str = str.replace(search[i], typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
		}

	} else {

		for(var i = 0; i < len; i++) {
			alert(' ------ ' + search[i] + ' ------ ');

			re = new RegExp(search[i], "ig");
			str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
		}

	}
	return str;
}

function addslashes(str) {
	return preg_replace(['\\\\', '\\\'', '\\\/', '\\\(', '\\\)', '\\\[', '\\\]', '\\\{', '\\\}', '\\\^', '\\\$', '\\\?', '\\\.', '\\\*', '\\\+', '\\\|'], ['\\\\', '\\\'', '\\/', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', '\\^', '\\$', '\\?', '\\.', '\\*', '\\+', '\\|'], str);
}

function addslashes_perg(str) {
	var a = str.split('');
	var s = '';
	var c = '';
	for (var i=0; i<a.length;i++) {
		if (i == 0 && a[i] == 'h') a[i] = a[i] + '\?';

		switch (a[i]) {
			case '?':
			case '/':
				a[i] = '\\' + a[i];
				break;
		}

		s += c + a[i];

		c = '\\s\?';
	}

	return s;
}

function fixurl_emptyspace (search, str) {
	var len = search.length;

	for(var i = 0; i < len; i++) {
		search[i] = search[i].replace(/\s+/ig, '');

		re = new RegExp(addslashes_perg(search[i]), "ig");
		str = str.replace(re, search[i]);
	}

	return str;
}

function link_blank () {
	var D = document;
	var a = D.getElementsByTagName('A');
	var tag;

	for(var i=0; i<a.length; i++) {
		tag = a[i];

		var url = tag.getAttribute('href');

		if (/soft\.phtml\?/i.test(url)) {
			tag.setAttribute('target', '_blank');
		}
	}
}

var elems = find('//span[@class="tpc_content"]');

for (var i=0; i < elems.snapshotLength; i++) {
	elem = elems.snapshotItem(i);

	html = fixurl_emptyspace(
		[
			'http://disk.iqho.com/mcncc.php?Mcncc='

			, '.easy-share.com/'
			, 'http://getchumirror01.twgogo.org/soft.aspx?id='
			, 'http://www.91files.com/?'
			, 'http://www.getchu.com/soft.phtml?id='
			, 'http://www.jandown.com/link.php?ref='
			, 'http://www.m 6ff.com/link.php?ref='
			, 'http://www.m ybtfile.com/torrent/'
			, 'http://www.mediafire.com/?'
			, 'http://www.mybigdir.com/'
			, 'http://www.seedurl.com/link.php?ref='
			, 'http://www.sendspace.com/file/'
			, 'http://pm.d-dream.com/detail.php?arg_tno='
			, 'http://www.comshop.co.jp/g-haku/index.php?jan='
			, 'http://210.155.150.145/soft.phtml?id='

			, 'http'
		]
		, elem.innerHTML
	);

	elem.innerHTML = html;
}

document.body && link_blank();

_attachEvent(window, 'load', function() {
		link_blank();

//		setTimeout(link_blank, 5000);
//		setInterval(link_blank, 5000);
});