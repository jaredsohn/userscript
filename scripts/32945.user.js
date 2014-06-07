// ==UserScript==
// @name           Mixi Service List Navigation
// @namespace      http://ohaco.jp/
// @include        http://mixi.jp/*
// @include        http://*.mixi.jp/*
// @version        1.0.0
// ==/UserScript==

(function() {
	var serviceNavigation, globalNavigation01;
	var allUnorderedList = document.getElementsByTagName('ul');

	for(i = 0; i < allUnorderedList.length; i++ ) {
		if(allUnorderedList[i].className == 'serviceNavigation') {
			serviceNavigation = allUnorderedList[i];
		}
		if(allUnorderedList[i].className == 'globalNavigation01') {
			globalNavigation01 = allUnorderedList[i];
		}
	}

	serviceNavigation.innerHTML = '';

	var diary = document.createElement('li');
	var community = document.createElement('li');
	var video = document.createElement('li');
	var album = document.createElement('li');
	var music = document.createElement('li');
	var review = document.createElement('li');
	var news = document.createElement('li');

	serviceNavigation.appendChild(diary);
	serviceNavigation.appendChild(community);
	serviceNavigation.appendChild(video);
	serviceNavigation.appendChild(album);
	serviceNavigation.appendChild(music);
	serviceNavigation.appendChild(review);
	serviceNavigation.appendChild(news);

	diary.innerHTML = '<a href="http://mixi.jp/search_diary.pl" title="\u65E5\u8A18">\u65E5\u8A18</a>';
	community.innerHTML = '<a href="http://mixi.jp/search_community.pl" title="\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3">\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3</a>';
	video.innerHTML = '<a href="http://video.mixi.jp/search_video.pl" title="\u52D5\u753B">\u52D5\u753B</a>';
	album.innerHTML = '<a href="http://mixi.jp/search_album.pl" title="\u30D5\u30A9\u30C8">\u30D5\u30A9\u30C8</a>';
	music.innerHTML = '<a href="http://music.mixi.jp/search_music.pl" title="\u30DF\u30E5\u30FC\u30B8\u30C3\u30AF">\u30DF\u30E5\u30FC\u30B8\u30C3\u30AF</a>';
	review.innerHTML = '<a href="http://mixi.jp/search_review.pl" title="\u30EC\u30D3\u30E5\u30FC">\u30EC\u30D3\u30E5\u30FC</a>';
	news.innerHTML = '<a href="http://news.mixi.jp/list_news.pl" title="\u30CB\u30E5\u30FC\u30B9">\u30CB\u30E5\u30FC\u30B9</a>';

	var globalListItem = globalNavigation01.getElementsByTagName('li');

	for(i = 0 ; i < 2 ; i++ ) {
		globalNavigation01.removeChild(globalListItem[0]);
	}

	document.getElementById('headerArea').style.position = 'relative';
	document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].style.padding = '37px 0 0 0';

	serviceNavigation.style.position = 'absolute';
	serviceNavigation.style.top = '86px';
	serviceNavigation.style.left = '-12px';
	serviceNavigation.style.width = '640px';

	var serviceListItem = serviceNavigation.getElementsByTagName('li');
	var anchorWidth = '87px';
	var anchorHeight = '18px';

    // for IE BackCompat
	if(document.compatMode == 'BackCompat' && !document.evaluate) {
		anchorWidth = '88px'
		anchorHeight = '23px'
	}

	for(i = 0; i < serviceListItem.length; i++ ) {
		serviceListItem[i].style.display = 'inline';
		serviceListItem[i].style.marginLeft = '-12px';

		var anchor = serviceListItem[i].getElementsByTagName('a')[0];

		anchor.style.padding = '5px 0 0 0';
		anchor.style.width = anchorWidth;
		anchor.style.height = anchorHeight;
		anchor.style.background = 'url(http://img.mixi.jp/img/basic/heading/body_contents007.gif) 50% 0';
		anchor.style.fontSize = '12px';
		anchor.style.color = '#333';
		anchor.style.textIndent = '0';
		anchor.style.textAlign = 'center';
		anchor.style.textDecoration = 'none';
		anchor.style.borderLeft = 'solid 1px #ccc';
	}

	news.style.borderRight = 'solid 1px #ccc';

	globalNavigation01.style.position = 'absolute';
	globalNavigation01.style.top = '40px';
	globalNavigation01.style.right = '0';
	globalNavigation01.style.width = '192px';
	globalNavigation01.style.minWidth = '192px';
})();
