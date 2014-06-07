// ==UserScript==
// @name           VKontakte Infinite Everything
// @author         Andrew Korzhuev
// @namespace      VK
// @description    Infinite wall, messages, discussions. Scroll it down and get next page.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @version        1.5b
// ==/UserScript==

function $(id) {
	return document.getElementById(id);
}

function getKeys(arr) {
	var keys = [];
	for (var i in arr)
		keys.push(i);
	return keys;
}

function classToStr(cls) {
	var res = '{';
	for(var i in cls)
		res += '"'+i+'": "'+cls[i]+'", ';
	res += '}';
	return res;
}

function getParam(name) {
	if ($(name) !== null)
		return $(name).value;
	
	var reg = new RegExp(name+"=(.*?)(?:$|&|#)", "im");
	var match = reg.exec(window.location);
	if (match != null)
		return match[1];

	return 0;
}

//Chrome & Opera hack
var aWindow = (typeof unsafeWindow == 'undefined' ? window : unsafeWindow );

myAjax = {
	progressDiv : "<div id='noResults' style='margin: 8px 0px 8px 8px; padding: 128px 0px; text-align: center; background: #FFF; border: 1px solid #DAE2E8; color: #777; font-size: 13px; display: block; left: 0; width: 100%; height: 150px;'><img src='images/progress7.gif'/></div>",
	done : function () {},
	fail : function () {},
	unFail : function () {},
	
	post : function (field, url, query, onDone, onFail) {
		$(field).innerHTML += myAjax.progressDiv;

		aWindow.Ajax.Post({url: url, query: query, 
			onDone: function(obj, text) {
				$(field).innerHTML = $(field).innerHTML.replace(/<div id=("|')noResults("|')(.*?)<\/div>/i, '');
				onDone(text);
				myAjax.done();
		}, onFail: function() {
			if (onFail !== undefined)
				onFail();
			myAjax.fail();
		}});
	}
};

board = {
	offset : getParam('offset')*1,
	max : 0,
	order : 0,
	gid : 0,
	
	init : function () {
		$('pages_bottom').style.display = 'none';
		board.max = $('pages_count').value*1;
		board.gid = $('gid').value*1;
	},
	
	getOrder : function () {
		if ($('order') && $('order').value) {
			var order = $('order').value*1;
			if (order != board.order)
				board.offset = 0;
			board.order = order;
		}
	},
	
	list : function () {
		board.getOrder();
		board.offset += 50;
		if (Math.ceil(board.offset / 50) > board.max)
			return;
		myAjax.post('rows_content', 'board.php?act=a_get_topics_page&gid='+board.gid, {offset: board.offset, order: board.order},
			function (text) {
				$('rows_content').innerHTML += JSON.parse(text).html
					.replace(/style=('|")border-top-width:1px;\1/i, '');
			});
	}
};

search = {
	offset : getParam('offset')*1,
	add : 20,
	max : 1e3,
	query : {},

	init : function () {
		$('pagesBottom').style.display = 'none';
	},
	
	getInfo : function () {
		var form = aWindow.ge('filterForm');
		var query = {};
		query = aWindow.serializeForm(form);
		query.uf = 1;
		for (var i in query) {
			if (!query[i] || (form[i] && form[i]['active'] == '0') ||
					query[i] == '0' && i != 'c[country]' && i != 'c[lang]') 
				delete query[i];
	    
			if (getParam(i) != 0)
				query[i] = getParam(i); 
		}
		if (!query['c[section]'])
			query['c[section]'] = 'people';
		if (query['c[q]']) 
			query['c[q]'] = query['c[q]'].replace(/\//g, ' ');
		if (query.offset == undefined)
			delete search.query.offset;
		if (classToStr(search.query) != classToStr(query)) {
			search.offset = getParam('offset')*1;
			myAjax.unFail();
		}
		search.query = query;

		var match = $('searchSummary').innerHTML
			.replace(/<([a-z][a-z0-9]*?).*?>.*?<\/\1>/im, '')
			.replace(/[^\d\-\(]/igm, '')
			.match(/([0-9]*?)\(([0-9]*?)\-([0-9]*?)$/im);
		if (match != null) {
			search.add = match[3] - match[2] + 1;
			search.max = match[1]*1;
		}
	},
	
	list : function () {
		search.getInfo();
		search.offset += search.add;
		if (search.offset > search.max) {
			myAjax.done();
			return;
		}
		search.query['offset'] = search.offset;
		myAjax.post('results', '/gsearch.php?ajax=1', search.query,
			function (text) {
				text = JSON.parse(text);
				$('results').innerHTML += text.rows; 
			}, function () { alert('fffuuu');});
	}
};

photos = {
	offset : getParam('st')*1,
	url : '',
	max : 0,
	
	init : function () {
		var str = window.location + "";
		var match = str.match(/\/(album-?[0-9]*?_[0-9]*?)(\?|$)/im);
		if (match != null)
			photos.url = match[1];
		match = aWindow.document.body.innerHTML.match(/<div class="summary">([0-9]*?) /im);
		if (match != null)
			photos.max = match[1];
		
		//TODO: works only in firefox
		var node = document.evaluate('//div[@class="footerBar clearFix"]/ul[@class="pageList"]', document, null, 9, null).singleNodeValue;
		node.style.display = 'none';
	},
	
	list : function () {
		photos.offset += 20;
		if (photos.offset >= photos.max) {
			photos.fail();
			return;
		}
		
		myAjax.post('album', photos.url, {st: photos.offset},
			function (text) {
				var match = text.match(/<div id="album">([\s\S]*?)<\/div>/im);
				if (match != null)
					$('album').innerHTML += match[1];			
			});
	}
};

discuss = {
	offset: getParam('offset')*1,
	tid : 0,
	oid : 0,
	max : 0,
	
	init : function () {
		var str = window.location + ""; 
		var match = str.match(/topic([0-9\-]*?)_([0-9]*?)($|&|#)/im);
		if (match != null) {
			discuss.oid = match[1];
			discuss.tid = match[2];
		}
		
		match = aWindow.document.body.innerHTML.match(/"text":"\{\\"summary\\":\\".*? ([0-9]*?) .*?\\",/im);
		if (match != null)
			discuss.max = match[1];
		
		$('pages_bottom').style.display = 'none';
	},
	
	list : function () {
		discuss.offset += 20;
		if (discuss.offset >= discuss.max) {
			myAjax.fail();
			return;
		}
		myAjax.post('rows_content', 'board.php', {act: 'a_get_posts_page', oid: discuss.oid, tid: discuss.tid, offset: discuss.offset},
			function (text) {
				if (text == 'error') {
					myAjax.fail();
					return;
				}
				$('rows_content').innerHTML += JSON.parse(text).html;
			});
	}
		
};

wall = {
	currentPage : 0,
	userId : 0,
	
	init : function () {
		wall.userId = getParam('mid')*1;
		if ((document.location+'').search('club') != -1)
			wall.userId = -wall.userId;
	},

	list : function () {
		wall.currentPage++;
		myAjax.post('fBox2', 'wall.php', {act: 'get10', oid: wall.userId, page: wall.currentPage},
			function (text) {
				$('fBox2').innerHTML += aWindow.parseResponse(text)
				.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/img, "")
				.replace(/<div( id="upArrow[0-9]*?")? class="upArrow"( id="upArrow[0-9]*?")?>[\s\S]*?<\/div>/img, "")
				.replace(/<div( id="dArrow[0-9]*?")? class="dArrow"( id="dArrow[0-9]*?")?>[\s\S]*?<\/div>/img, "");
			});
	}
};

messages = {
	currentPage : getParam('st')*1,
	out : getParam('out'),
	
	init : function () {
		$('pagesBottom').style.display = 'none';
	},
	
	list : function () {
		messages.currentPage += 20;
		myAjax.post('messages_wrap', '/mail.php', {filter: 'all', out: messages.out, st: messages.currentPage},
			function (text) {
				$('messages_rows').innerHTML += JSON.parse(text).content
				.replace(/<table cellspacing="0" id="messages_rows" class="inbox">[\s\S]*?<tr>[\s\S]*?<\/tr>/img, "")
				.replace(/<\/table>$/img, "");
			});
	}
};

router = {
	isEnd : false,
	doing : false,
	method : {},
		
	hackScroll : function () {
		if (document.documentElement.scrollTop != window.pageYOffset && typeof window.pageYOffset !== 'undefined')
			return window.pageYOffset;
		return document.documentElement.scrollTop;	
	},
	
	isNearBottom : function () {
		return (document.height - router.hackScroll() - window.innerHeight - 200 < 0);		
	},

	init : function (method) {
		if (typeof method.init !== 'undefined')
			method.init();
		router.method = method;
		myAjax.done = function () { router.doing = false; };
		myAjax.fail = function () { router.isEnd = true; };
		myAjax.unFail = function () {router.isEnd = false; };
	},
	
	route : function () {
		if (router.isNearBottom() && !router.isEnd && !router.doing) {
			router.doing = true;
			router.method.list();
		}		
	},
};

var table = {'fBox2' : wall, 'messages_rows' : messages, 'topic' : discuss, 
			 'album' : photos, 'searchResults' : search, 'board' : board};
for (var x in table)
	if ($(x) !== null || (new RegExp('/'+x, 'i')).test(document.location)) {
		router.init(table[x]);
		break;
	}

window.addEventListener(
		'scroll',
		function() { router.route(); },
		false);