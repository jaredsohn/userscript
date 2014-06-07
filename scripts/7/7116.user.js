// ==UserScript==
// @name          Add HatenaBookmark button for HatenaWordlink etc.
// @namespace     http://wordlink.hatelabo.jp/
// @description   Add Hatena Bookmark Hot Topic button etc.
// @include       http://wordlink.hatelabo.jp/*
// @version       1.0.5
// ==/UserScript==
// @copyright     Shinpei at Chiyorozu
// @modify        tabasa & charlie
// 
// change the 'myId'



var targetObj, title, formObj, spanObj, spanElement;
var myId;

myId = 'hatecha';



function addIcon( src, alt, title, href ) {
	var hatenabkmk_link, hatenabkmk_logo;

	hatenabkmk_logo = document.createElement('img');
	hatenabkmk_logo.src = src;
	hatenabkmk_logo.alt = alt;
	// hatenabkmk_logo.width = 50;
	hatenabkmk_logo.title = title;
	hatenabkmk_logo.hspace = 5;

	hatenabkmk_link = document.createElement('a');
	hatenabkmk_link.href = href;
	hatenabkmk_link.appendChild(hatenabkmk_logo);


	formObj = document.getElementsByTagName('h3')[0];

	if (!formObj) {
		targetObj.parentNode.insertBefore(hatenabkmk_link, targetObj.nextSibling);
	} else {
		targetObj = formObj.lastChild;
		targetObj.parentNode.insertBefore(hatenabkmk_link, targetObj.nextSibling);
	}
}


// --------

spanObj = document.getElementsByTagName('SPAN');

for (var i = 0;i < spanObj.length; i++) {
	spanElement = spanObj.item(i);
	if (spanElement.getAttribute('class')=='title'){
		targetObj = spanElement;
		if(!targetObj) { return; }
		title = spanElement.firstChild.nodeValue;
		if(!title.length) { return; }
		break;
	}
}

addIcon(
	'http://d.hatena.ne.jp/images/b_entry_de.gif',
	'HatenaBookmark button',
	'HatenaBookmark hot topics',
	'http://b.hatena.ne.jp/t/' + title + '?sort=hot'
);


addIcon(
	'http://www.hatena.ne.jp/users/profile_s.gif',
	'HatenaBookmark button',
	'my HatenaBookmark',
	'http://b.hatena.ne.jp/' + myId + '/' + title
);


addIcon(
	'http://b.hatena.ne.jp/images/keyword.gif',
	'HatenaDiaryKeyword button',
	'Diary keyword',
	'http://d.hatena.ne.jp/keyword/' + title
);


addIcon(
	'http://www.hatena.ne.jp/images/top/side_q.gif',
	'HatenaSearch button',
	'hatena search',
	'http://search.hatena.ne.jp/search?word=' + title
);


addIcon(
	'http://www.hatena.ne.jp/images/top/side_webservice.gif',
	'GoogleSearch button',
	'google search',
	'http://www.google.com/search?q=' + title
);


addIcon(
	'http://www.hatena.ne.jp/images/top/side_mobile.gif',
	'GoogleImageSearch button',
	'google image search',
	'http://images.google.com/images?q=' + title
);

addIcon(
	'http://www.hatena.ne.jp/images/top/side_f.gif',
	'fotolife button',
	'fotolife',
	'http://f.hatena.ne.jp/search?word=' + title
);

addIcon(
	'http://news.google.com/intl/ja/nav_first.gif',
	'GoogleNews button',
	'google news',
	'http://news.google.com/news?hl=ja&ned=jp&q=' + title
);


addIcon(
	'http://sf.livedoor.com/img/bell.gif',
	'matome button',
	'matome',
	'http://www.matome.jp/keyword/' + title
);

addIcon(
	'http://i.yimg.jp/images/points/yp_icn_s.gif',
	'yahooNews button',
	'yahoo News',
	'http://nsearch.yahoo.co.jp/bin/search?p=' + title + '&to=0&b=1&c=&st=n'
);

addIcon(
	'http://images-jp.amazon.com/images/G/09/icons/icon-books.gif',
	'amazon button',
	'amazon',
	'http://www.amazon.co.jp/exec/obidos/search-handle-url/field-keywords=' + title
);

addIcon(
	'http://b.hatena.ne.jp/images/bookmark.gif',
	'wikipedia button',
	'wikipedia',
	'http://ja.wikipedia.org/wiki/' + title
);

addIcon(
	'http://www.youtube.com/img/c_logo_no_text.gif',
	'wikipedia button',
	'wikipedia',
	'http://www.youtube.com/results?search_type=search_videos&search_query=' + title
);

addIcon(
	'http://www.hatena.ne.jp/images/rss.gif',
	'wikipedia button',
	'wikipedia',
	'http://r.hatena.ne.jp/keyword/' + title
);

