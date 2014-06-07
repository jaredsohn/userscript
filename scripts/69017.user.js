// ==UserScript==
// @name           VKontakte Wall Cleaner
// @namespace      VK
// @author         Andrew Korzhuev
// @description    Delete everything from your wall
// @include        http://vkontakte.ru/id*
// @include        http://vkontakte.ru/club*
// @include        http://vk.com/id*
// @include        http://vk.com/club*
// @version        1.0b
// ==/UserScript==

function $ (id) {
	return document.getElementById(id);
}

wall = {
	userId : 0,
	res : [],
	maxId : 0,
	id : 0,
	overall : 0,

	myGetWallPage : function (oid, page) {
	  if (unsafeWindow.isVisible(unsafeWindow.ge('progr2'))) {
	    return;
	  }
	  unsafeWindow.show('progr2');
	  unsafeWindow.Ajax.Post({url: 'wall.php', query: {act: 'get10', oid: oid, page: page}, onDone: function(obj, text) {
		  unsafeWindow.hide('progr2');
		  unsafeWindow.ge('fBox2').innerHTML = unsafeWindow.parseResponse(text);
		  setTimeout(wall.clearWall(), 1000);
	  }, onFail: function() {
		  unsafeWindow.hide('progr2');
	  }});
	},
	
	
	del : function () {
		unsafeWindow.deletePost(wall.res[wall.id], wall.userId);
		wall.id++;
		wall.overall++;
		if (wall.id >= wall.maxId)
			wall.myGetWallPage(wall.userId, 0);
		else 
			setTimeout(wall.del, 1000*(wall.overall % 10 == 0 ? 5 : 1) + Math.floor(Math.random()*1000));
	},
	
	clearWall : function () {
		wall.res = [];
		var match = unsafeWindow.document.body.innerHTML.match(/deletePost\(([0-9]*?),/ig);
		for (var x in match)
			wall.res.push(match[x].match(/deletePost\(([0-9]*?),/i)[1]*1);
		wall.maxId = match.length - 1;
		wall.id = 0;
		setTimeout(wall.del, 1000);
	},
	
	init : function () {
		if (! /deletePost/i.test(unsafeWindow.document.body.innerHTML))
			return;

		var container = document.evaluate("//div[@class='fSub_right']", document, null, 9, null).singleNodeValue;
		container.innerHTML = '<a id="wallClear">Очистить стену</a><span class="divide">|</span>' + container.innerHTML;
		$('wallClear').addEventListener('click', function () {
				var container = document.evaluate("//div[@id='wall']/div/div[@class='flexHeader clearFix']/div/h2", document, null, 9, null).singleNodeValue;
				container.innerHTML = 'Попей кофе, почитай книжку - это надолго.';
				wall.clearWall(); 
			}, false);
		
		wall.userId = $('mid').value*1;
		if ((document.location+'').search('club') != -1)
			wall.userId = -wall.userId;
	}
}

window.addEventListener(
		'load',
		function() { wall.init(); },
		false);