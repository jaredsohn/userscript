// ==UserScript==
//
// @name					updated zlowiki services
// @namespace					http://zlowiki.ru
// @description					updated zlowiki.ru services
// @author					http://zlo.rt.mipt.ru/?persmsgform=Rustem
// @author					http://zlo.rt.mipt.ru/?persmsgform=FastFlood
//
// @include					http://board.rt.mipt.ru/*
// @include					http://zlo.rt.mipt.ru/*
// @include					http://board.rt.mipt.ru./*
// @include					http://zlo.rt.mipt.ru./*
// @include					http://x.zlowiki.ru/*
// @include					http://frike.ru/*
// @include					http://takeoff.mipt.ru/*
// @include					http://www.takeoff.mipt.ru/*
//
// @grant           			        none
// ==/UserScript==

// UPGRADES:
// 16.06.2013 [+] (broken) ссылка на приват в заголовке сообщения (latin alphabetic only)
// 28.03.2014 [+] coub embedding


(function() { // host a pic
	var host = 'http://i.zlowiki.ru/';
	var places = document.getElementsByTagName('textarea');
	for (var i=0; i<places.length; i++) {
		if (places[i].name == 'body') {
		//if (places[i].name == 'post' && places[i].type == 'submit') {
			var place = places[i];
		}
	}
	if (!place) return false;

	var frame = document.createElement('iframe');
	frame.src = host + 'i';
	frame.style.display = 'block';
	frame.style.width = '600px';
	frame.style.height = '100px';
	frame.style.border = '1px solid #999';
	frame.style.margin = '15px';

	place.parentNode.appendChild(frame);
	
	window.addEventListener('message', function(e) {
		var data = eval('('+e.data+')');
		var s = (data.all) ? data.all.url : '[pic]' + host + data.files[0].name+'[/pic]\n';
		var areas = document.getElementsByTagName('textarea');
		for (var i = 0; i < areas.length; i++) {
			 areas[i].value += s.replace('\t', '\n'); 
		}
	}, false);
}) ();

(function() { // embed youtube, coub
	var page_links = document.links;
	for (var i = 0; i < page_links.length; i++) {
		if (id = page_links[i].href.match(/(?:youtube.com\/watch\?\S*v=|youtu.be\/)([\w-]+)/i)) {
			var div = document.createElement('div');
			div.innerHTML = '<iframe width="640" height="360" src="http://www.youtube.com/embed/' + id[1] + '" frameborder="0"></iframe>';
			page_links[i].parentNode.insertBefore(div, page_links[i].nextSibling);
		} else if (id = page_links[i].href.match(/(?:coub.com\/view\/)([\w-]+)/i)) {
            var div = document.createElement('div');
            div.innerHTML = '<iframe src="http://coub.com/embed/' + id[1] + '?muted=false&amp;autostart=false&originalSize=true&hideTopBar=false&noSiteButtons=false&startWithHD=true" allowfullscreen="true" frameborder="0" width="480" height="360"></iframe>'
            page_links[i].parentNode.insertBefore(div, page_links[i].nextSibling);
        }
	}
}) ();

(function() { //user search link next to his nick
	var sp1 = document.createElement('span');
	var sp2 = document.getElementsByClassName('body');
	var parentDiv = sp2[0].parentNode;
	parentDiv.insertBefore(sp1, sp2[0]);
	
	
	var a1 = document.getElementsByClassName('nn');
	var h = a1[0].parentNode.innerHTML.match(/(?:<small>\()(.*)(?:\)<\/small>)/);
		/*for (i =0; i < h.length; i++) {
		sp1.textContent += '__' + i + ': ' + h[i] + '';
		}*/
		
	var user_nick = encodeURI(a1[0].innerHTML);
	var link1 = " <small><b><a target='_blank' href='http://zlo.rt.mipt.ru:7500/search?nick=" + user_nick + "'>?</a></b></small>";
	var link2 = "<small><b><a target='_blank' href='http://zlo.rt.mipt.ru:7500/nickhost.jsp?site=0&w=n&t=" + user_nick + "'>n</a></b></small>";
	var link3 = "<small><b><a target='_blank' href='http://zlo.rt.mipt.ru:7500/nickhost.jsp?site=0&w=h&t=" + h[1] + "'>h</a></b></small>";
	var link4 = " <small><b><a target='_blank' title='Написать в приват' href='http://zlo.rt.mipt.ru/?persmsgform=" + encodeURI(user_nick) + "'>p</a></b></small>";
	
	var r = a1[0].parentNode.innerHTML.match(/(.*<\/small>)(.*)/);
    a1[0].parentNode.innerHTML = r[1] + link1 + link2 + link3 + link4 + r[2];
	var span_element = document.querySelectorAll('.reg, .own, .sel');
	for (i = 0; i < span_element.length; i++) {
		var nick = span_element[i].textContent;
		var host = span_element[i].nextSibling.textContent.match(/(?:\()(.*)(?:\))/)[1];
		var link1 = "<a target='_blank' href='http://zlo.rt.mipt.ru:7500/search?nick=" + nick + "'>?</a>";
		var link2 = "<a target='_blank' href='http://zlo.rt.mipt.ru:7500/nickhost.jsp?site=0&w=n&t=" + nick + "'>n</a>";
		var link3 = "<a target='_blank' href='http://zlo.rt.mipt.ru:7500/nickhost.jsp?site=0&w=h&t=" + host + "'>h</a>";
		var insertion_point = span_element[i].nextSibling.textContent.match(/(.*\))(.*)/);
	}
}) ();
