// ==UserScript==
// @name        Enjuick
// @namespace   enjuick
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_xmlhttpRequest
// @include     https://juick.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.2.1/moment.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/autosize.js/1.17.1/autosize-min.js
// @resource    css https://dl.dropboxusercontent.com/s/b0ha6vhlv0utgnj/Enjuick.user.css
// @run-at      document-start
// @version     0.02 (beta)
// ==/UserScript==
var css_res = GM_getResourceText('css');
GM_addStyle(css_res);

// Убираем JQuery с сайта
window.addEventListener('beforescriptexecute', function(e) {
	e.preventDefault();
	e.stopPropagation();
}, true);

var hash;
var user_id;
var user_name;
var convs;

var parsePageVars = function(page) {
	var text = page.find('body > script').eq(0).html();
	hash = /hash='(\w+)'/.exec(text)[1];
	user_id = parseInt(/user_id=(\d+);/.exec(text)[1]);
	user_name = /user_name='([^']+)';/.exec(text)[1];
	convs = JSON.parse(/lastConversations=(.*);$/m.exec(text)[1]);
	$('.you a, .write h3 a').attr('href',user_name).attr('data-id',user_id).attr('data-name',user_name);
	$('.you img').attr('src','//i.juick.com/a/' + user_id + '.png');
	$('.write .avatar').attr('style','background-image:url(//i.juick.com/a/' + user_id + '.png)');
	$('.write h3 a, .you span').text('@' + user_name);
};

document.addEventListener('DOMContentLoaded', function() {
	try {
		parsePageVars($(document));
	} catch (e) {}
	var feed = null;
	var year = new Date().getFullYear();
	var sockets = {};
	// Подгружаем CSS, изменяем title
	$('head').append($('<link>').attr('href','//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css').attr('rel','stylesheet'));
	$('head title').text('Juick');
	// Уничтожаем body и заменяем его своим
	$(document.body).empty()
		.append($('<div>').addClass('nav')
			.append($('<a>').addClass('logo').attr('href','/'))
			.append($('<ul>')
				.append($('<li>').addClass('you')
					.append($('<a>').addClass('name').attr('href',user_name).attr('data-id',user_id).attr('data-name',user_name)
						.append($('<img>').attr('src','//i.juick.com/a/' + user_id + '.png'))
						.append($('<span>').text('@' + user_name))
					)
					.append($('<sup>')
						.append($('<i>').addClass('icon-lock'))
					)
				)
				.append($('<li>')
					.append($('<a>').attr('href','?show=discuss')
						.append($('<i>').addClass('icon-comments-alt'))
						.append($('<span>').text('Tracker'))
					)
				)
				.append($('<li>').addClass('conv dropdown-menu')
					.append($('<a>').attr('id','chat').attr('href','?show=private')
						.append($('<i>').addClass('icon-exchange'))
						.append($('<span>').text('Conversations'))
						.append($('<i>').addClass('icon icon-angle-down'))
					)
					.append($('<ul>').addClass('dropdown'))
				)
				.append($('<li>')
					.append($('<a>').attr('href','settings')
						.append($('<i>').addClass('icon-cog'))
						.append($('<span>').text('Settings'))
					)
				)
				.append($('<li>')
					.append($('<a>').attr('href','logout')
						.append($('<i>').addClass('icon-signout'))
						.append($('<span>').text('Sign out'))
					)
				)
			)
			.append($('<div>').addClass('menu-right')
				.append($('<div>').addClass('write-new')
					.append($('<button>').text('Write new post')
						.prepend($('<i>').addClass('icon-plus'))
					)
				)
				.append($('<div>').addClass('search')
					.append($('<input>').attr('placeholder','Type and hit “Enter”').attr('type','text'))
				)
			)
		)
		.append($('<div>').addClass('signin')
			.append($('<p>').text('Enter your password to post messages'))
			.append($('<input>').attr('placeholder','Password').attr('type','password'))
			.append($('<button>').text('Sign in'))
		)
		.append($('<div>').addClass('content content-feed')
			.append($('<ul>').addClass('feeds')
				.append($('<li>').addClass('selected')
					.append($('<a>').attr('id','all').attr('href','/').text('All'))
				)
				.append($('<li>')
					.append($('<a>').attr('id','top').attr('href','?show=top').text('Popular'))
				)
				.append($('<li>')
					.append($('<a>').attr('id','my').attr('href','?show=my').text('Subscriptions'))
				)
				.append($('<li>')
					.append($('<a>').attr('id','photos').attr('href','?show=photos').text('Media files'))
				)
			)
			.append($('<div>').addClass('update')
				.append($('<a>').attr('href','#').html('New posts (<span>0</span>)'))
			)
			.append($('<div>').addClass('write')
				.append($('<a>').addClass('avatar').attr('data-id',user_id).attr('data-name',user_name).attr('href',user_name).attr('style','background-image:url(//i.juick.com/a/' + user_id + '.png)'))
				.append($('<div>').addClass('message')
					.append($('<h3>')
						.append($('<a>').addClass('name').attr('data-id',user_id).attr('data-name',user_name).attr('href',user_name).text('@' + user_name))
					)
					.append($('<textarea>').addClass('text').attr('placeholder','You make our day').attr('rows','1'))
					.append($('<div>').addClass('write-footer')
						.append($('<div>').addClass('actions')
							.append($('<button>').text('Done'))
							.append($('<a>').attr('href','#').text('Cancel'))
							.append($('<span>').addClass('charnum').text('4096'))
						)
					)
				)
			)
			.append($('<div>').addClass('posts'))
			.append($('<div>').addClass('more')
				.append($('<a>').attr('href','#').text('More'))
			)
		)
		.append($('<div>').addClass('footer')
			.append($('<ul>').addClass('credits')
				.append($('<li>')
					.append($('<a>').addClass('logo').attr('href','/'))
				)
				.append($('<li>')
					.append($('<div>').addClass('link')
						.append($('<a>').attr('href','/').text('Juick.com'))
					)
					.append($('<div>').addClass('year').text('© ' + year))
					.append($('<div>').addClass('mail')
						.append($('<a>').attr('href','mailto:ugnich@gmail.com')
							.append($('<i>').addClass('icon-envelope'))
							.append($('<span>').text('ugnich@gmail.com'))
						)
					)
				)
			)
			.append($('<ul>')
				.append($('<li>')
					.append($('<a>').attr('href','help/ru/').text('Help'))
				)
				.append($('<li>')
					.append($('<a>').attr('href','help/ru/tos/').text('Terms of service'))
				)
				.append($('<li>')
					.append($('<a>').attr('href','juick/1672638').text('Donate'))
				)
			)
		);

	// Совместимость Enjuick с открывающимися URL
	function home() { // Запрос всех var с //juick.com/
		$.ajax({
			url:'//juick.com/'
		}).done(function(h){
			var page = $(new DOMParser().parseFromString(h, "text/html"));
			parsePageVars(page);
		});
	}
	var curr_href = window.location.href;
	var user_page;
	if(/.*\/tag\/.*/i.test(curr_href)) {
		var tag_name = /\/([^\/]+)$/.exec(curr_href)[1];
		var title = 'Juick — *' + tag_name;
		$('.posts').empty();
		home();
		$.ajax({
			url:'//api.juick.com/messages',
			data:{ tag:tag_name }
		}).done(function(tag){
			$('.posts').empty();
			if($('#tags').length > 0) {
				$('#tags').html('Tag: *<span>' + tag_name +'</span>');
			} else {
				$('.feeds .selected').removeClass('selected');
				$('.feeds').append($('<li>').addClass('feed selected').append($('<a>').attr('id','tags').attr('href','/tag/' + tag_name).text('Tag: *').append($('<span>').text(tag_name))))
			}
			for (var i = tag.length; i > 0; i--) {
				newMessage(tag[i - 1]);
			}
			feed = 'tag';
			lastmessage = tag[tag.length - 1].mid;
			$('.more a').attr('href','tag/' + tag_name + '?before=' + lastmessage);
			socket_all.close();
			history.pushState({},title,'/tag/' + tag_name);
			document.title = title;
		});
	} else if(user_page = /juick\.com\/([^/]+)\/(?:(\d+|\w+))?$/.exec(curr_href)) {
		var user = user_page[1];
		var message = user_page[2];
		home();
		if(message) {
			$.ajax({
				url:'//api.juick.com/thread',
				data:{mid:message}
			}).done(function(m){
				var comments = $('<div>').addClass('post-comments');
				var thread = $('<div>').addClass('post-comments-thread');
				var textarea = $('<textarea>');
				$('.feeds, .update, .more').remove();
				$('.posts').addClass('post-wrapper').empty().append(getHtml(m[0]));
				$('.post').append(comments).addClass('post-expanded');
				$('.action-expand').remove();
				newReplies[message] = [];
				sockets[message] = socket_open('wss://ws.juick.com/' + message,function(msg) {
					addReply(msg, message);
				});
				for (var i = 1; i < m.length; i++) {
					var msg = m[i];
					newReply(msg,thread,message);
				}
				comments.append(thread);
				comments.append($('<div>').addClass('update-comment')
					.append($('<a>').attr('href','#').html('New replies (<span>0</span>)'))
				);
				comments.append($('<div>').addClass('post-comments-reply')
					.append(textarea.attr('placeholder','You make our day').attr('rows','1').autosize())
					.append($('<button>').text('Done').click(function(){ comment(textarea.val(),message,'') }))
				);
			});
		}
		if(message == 'readers' || message == 'reading') {
			$.ajax({
				url:'//api.juick.com/users',
				data:{uname:user}
			}).done(function(u){
				userpage(u[0].uname,u[0].uid);
				document.title = $('title').text() + '’ subscriptions and readers';

				$('.read').fadeIn().addClass('read-expanded');
				$('.feeds').fadeOut();
				$('.posts').fadeOut();
				$('.more').fadeOut();
			});
		}
		if(!message) {
			$.ajax({
				url:'//api.juick.com/users',
				data:{uname:user}
			}).done(function(u){
				userpage(u[0].uname,u[0].uid);
			});
		}
	} else {
		load_all();
	}
	var lastmessage = null; // Подгрузка следующих сообщений
	var socket_all;
	function load_all() { // Последние сообщения, открытие сокета
		$.ajax({
			url:'//api.juick.com/messages'
		}).done(function(messages){
			for (var i = messages.length; i > 0; i--) {
				newMessage(messages [i - 1]);
			}
			socket_all = socket_open('wss://ws.juick.com/_all',addMessage);
			feed = 'all';
			lastmessage = messages[messages.length - 1].mid;
			$('.more a').attr('href','?before=' + lastmessage);
		});
	}
	if(!String.linkify) {
		String.prototype.linkify = function() {
			var re = /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-zа-я0-9+&@#\/%?=~_()|!:,.;]*[-a-zа-я0-9+&@#\/%=~_()|])/ig;
			return this.replace(re, function(match, lParens, url) {
				var rParens = '';
				lParens = lParens || '';

				// Try to strip the same number of right parens from url
				// as there are left parens.  Here, lParenCounter must be
				// a RegExp object.  You cannot use a literal
				//     while (/\(/g.exec(lParens)) { ... }
				// because an object is needed to store the lastIndex state.
				var lParenCounter = /\(/g;
				while (lParenCounter.exec(lParens)) {
					var m;
					// We want m[1] to be greedy, unless a period precedes the
					// right parenthesis.  These tests cannot be simplified as
					//     /(.*)(\.?\).*)/.exec(url)
					// because if (.*) is greedy then \.? never gets a chance.
					if (m = /(.*)(\.\).*)/.exec(url) ||
							/(.*)(\).*)/.exec(url)) {
						url = m[1];
						rParens = m[2] + rParens;
					}
				}
				return lParens + "<a href='" + url + "'>" + url + "</a>" + rParens;
			});
		};
	}
	
	function htmlify(m) {
		var wrap = function(tag, attrs) {
			return function(childNodes) {
				var element = document.createElement(tag);
				for(var i in childNodes) {
					element.appendChild(childNodes[i]);
				}
				return element;
			}
		}
		var min = function(array, selector) {
			if (!array.length) return;
			selector = selector || function(x) { return x; };
			var min = 0;
			var minValue = selector(array[0]);
			for(var i = 1; i < array.length; i++) {
				var value = selector(array[i]);
				if (value < minValue) {
					minValue = value;
					min = i;
				}
			}
			return array[min];
		}
		var process = function(text, doc, items) {
			var res;
			var nodes = [];
			while(res = min(
					items.map(function(r) { 
						return { r: r, match: r.regex.exec(text) } 
					}).filter(function(x) { 
						return x.match 
					}), 
					function(x) { 
						return x.match.index 
					})) {
				if (res.index != 0) {
					nodes.push(document.createTextNode(text.substr(0, res.match.index)));
				}

				var r = res.r;
				var match = res.match;
				var childNodes = r.recursive ? process(match[1], doc, items) : match[1];
				nodes.push(r.replace(childNodes));
				text = text.substr(match.index + match[0].length);
			}
			if (text) {
				nodes.push(document.createTextNode(text));
			}
			return nodes;
		}
		var replace = function(text, items) {
			var nodes = [];
			var doc = new DOMParser().parseFromString(text, "text/html");
			for(var node = doc.body.firstChild; node; node = node.nextSibling) {
				if (node.nodeType != 3) {
					nodes.push(node);
					continue;
				}
				var childNodes = process(node.textContent, doc, items);
				for(var i in childNodes) {
					nodes.push(childNodes[i]);
				}
			}
			return nodes;
		}
		var replacements = [
			{
				regex: /(?:\B|^)\*(.+?)\*(?:\B|$)/,
				replace: wrap('b'),
				recursive: true
			}, {
				regex: /(?:\B|^)\/(.+?)\/(?:\B|$)/,
				replace: wrap('i'),
				recursive: true
			}, {
				regex: /(?:\b|^)\_(.+?)\_(?:\b|$)/,
				replace: wrap('u'),
				recursive: true
			}, {
				regex: /\r?\n/,
				replace: function() { return $('<br>').addClass('invisible-font').get(0) },
				recursive: false
			}, {
				regex: /(?:\B|^)#(\d+)/,
				replace: function(id) { return $('<a>').attr('href', "//juick.com/" + id).text('#' + id).get(0) },
				recursive: false
			}, {
				regex: /(?:\B|^)@([\w\-]+)/,
				replace: function(name) { return $('<a>').addClass('name').attr('href', '//juick.com/' + name + '/').text('@' + name).get(0) },
				recursive: false
			},
		];
		var body = $('<div>').text(m.body).html();
		body = body.linkify();

		return replace(body, replacements);
	}
	var newMessages = []; // Кол-во новых сообщений, используется в обработчиках .update
	// HTML-функция для большинства сообщений
	function getHtml(m) {
		var juick_link = '//juick.com/' + m.user.uname + '/' + m.mid;
		var img;
		var video;
		var tags;
		var location;
		var image_link = m.photo ? m.photo.medium.replace(/\/photos-[0-9]+\//, '/p/') : '';
		var result = $('<div>').addClass('post').attr('id',m.mid)
			.append($('<div>').addClass('post-text')
				.append($('<a>').addClass('avatar').attr('href',m.user.uname + '/').attr('style','background-image:url(//i.juick.com/a/' + m.user.uid + '.png)').attr('data-name',m.user.uname).attr('data-id',m.user.uid))
				.append($('<div>').addClass('message')
					.append($('<h3>')
						.append($('<a>').addClass('name').attr('href',m.user.uname + '/').attr('data-name',m.user.uname).attr('data-id',m.user.uid).text('@' + m.user.uname))
					)
					.append($('<div>').addClass('text').append(htmlify(m)))
					.append(img = $('<div>').addClass('image'))
					.append(video = $('<div>').addClass('video'))
					.append($('<div>').addClass('post-footer')
						.append($('<ul>').addClass('actions')
							.append($('<li>').addClass('action-time')
								.append($('<a>').attr('href',juick_link).attr('title',m.timestamp).text(m.timestamp))
								.append($('<input>').attr('type','text').val('#' + m.mid))
							)
							.append($('<li>').addClass('action-expand')
								.append($('<a>').attr('href','#').text('Expand'))
							)
							.append(tags = $('<li>').addClass('action-tags'))
							.append(location = $('<li>').addClass('action').addClass('action-location'))
							.append($('<li>').addClass('action').addClass('action-subscribe')
								.append($('<a>').attr('href','post?body=S+%23' + m.mid)
									.append($('<i>').addClass('icon-comments-alt'))
									.append($('<span>').text('Subscribe'))
								)
							)
							.append($('<li>').addClass('action').addClass('action-recommend')
								.append($('<a>').attr('href','post?body=!+%23' + m.mid)
									.append($('<i>').addClass('icon-exclamation'))
									.append($('<span>').text('Recommend'))
								)
							)
							.append($('<li>').addClass('action').addClass('action-share')
								.append($('<a>').attr('href','#')
									.append($('<i>').addClass('icon-share-alt'))
									.append($('<span>').text('Share'))
								)
								.append($('<span>').addClass('invisible-dis').text(':'))
								.append($('<span>').addClass('invisible-dis').addClass('share')
									.append($('<a>').addClass('icon-facebook').attr('href','https://www.facebook.com/sharer/sharer.php?u=' + juick_link))
									.append($('<a>').addClass('icon-twitter').attr('href','https://twitter.com/intent/tweet?url='+ juick_link))
									.append($('<a>').addClass('icon-vk').attr('href','https://vk.com/share.php?url='+ juick_link))
									.append($('<a>').addClass('icon-google-plus').attr('href','https://plus.google.com/share?url='+ juick_link))
								)
							)
						)
					)
				)
			);
		if(m.photo) {
			img.append($('<a>').attr('href',image_link)
				.append($('<img>').attr('src',m.photo.small).load(function(){
					if(this.naturalWidth == 512 || this.naturalHeight == 512) {
						$(this).parent().addClass('image-zoom');
						$(this).after($('<div>').addClass('zoom'));
						$(this).attr('data-width',this.naturalWidth).css('width',$(this).attr('data-width'));
					}
				}))
			)
		} else { img.remove(); }
		if(m.video) {
			video.append($('<a>').attr('href',m.video.mp4).text('View video'));
		} else { video.remove(); }
		if(m.location) {
			location.append($('<a>').attr('data-id',m.location.place_id).attr('href','places/' + m.location.place_id)
				.append($('<i>').addClass('icon-map-marker'))
				.append($('<span>').text(m.location.name))
			)
		} else { location.remove(); }
		if(m.tags) {
			if($('.content').hasClass('content-user')) {
				var name = $('.header h2 div').attr('data-name');
				tags.append(m.tags.map(function(tag){ return '<a data-tag="' + tag + '" href="' + name + '/?tag='+ tag +'">'+ tag +'</a>'}).join(', '))
			} else {
				tags.append(m.tags.map(function(tag){ return '<a href="' + 'tag/' + tag +'">'+ tag +'</a>'}).join(', '))
			}
			if(m.tags.length == 1) {
				tags.prepend($('<i>').addClass('icon-tag'))
			} else {
				tags.prepend($('<i>').addClass('icon-tags'));
			}
		} else { tags.remove(); }
		return result;
	}
	function newMessage(m) {
		$('.posts').prepend(getHtml(m));
	}
	function normalizeMessage(m) { // Веб-сокеты отдают изображения в http и немасштабируемо
		var newlineIndex = m.body.indexOf("\n");
		if (newlineIndex > -1) {
			var img = m.body.substr(0, newlineIndex);
			if (img.match(/\/\/i.juick.com\//)) {
				var realBody = m.body.substring(newlineIndex + 1, m.body.length);
				m.photo = {
						"thumbnail": img.replace(/^http:/, 'https:').replace(/\/photos-[0-9]+\//, '/ps/'),
						"small": img.replace(/^http:/, 'https:').replace(/\/photos-[0-9]+\//, '/photos-512/'),
						"medium": img.replace(/^http:/, 'https:')
				};
				m.body = realBody;
			}
		}
		return m;
	}
	function addMessage(m) {
		if(!/[\u0600-\u06ff\u0750-\u077f]/i.test(m.body)) { // Проверяем на арабов
			newMessages.push(normalizeMessage(m));
		}
		if(newMessages.length > 0) { // Обновляем счётчик
			$('.update span').text(newMessages.length);
			$('head title').text('(' + newMessages.length + ') Juick');
			$('.update').fadeIn('500');
		}
	}
	function socket_open(url,fn,id) {
		var socket = new WebSocket(url);
		socket.onmessage = function (event) {
			if (event.data == ' ') {
				socket.send (' ');
			} else {
				fn(JSON.parse(event.data),id);
			}
		};
		return socket;
	}
	$(document).on('click','.more a',function scroll(e) { // Догрузка сообщений в зависимости от ленты
		e.preventDefault();
		function all() {
			$.ajax({
				url:'//api.juick.com/messages',
				data:{ before_mid:lastmessage }
			}).done(function(old){
				history.pushState({},document.title,'?before=' + lastmessage);
				for (var i = 0; i < old.length; i++)
					$('.posts').append(getHtml(old[i]));
				lastmessage = old[old.length - 1].mid;
				$('.more a').attr('href','?before=' + lastmessage);
			});
		}
		function top() {
			$.ajax({
				url:'//api.juick.com/messages',
				data:{ before_mid:lastmessage, popular:'1' }
			}).done(function(old){
				history.pushState({},document.title,'?show='+ feed +'&before=' + lastmessage);
				for (var i = 0; i < old.length; i++)
					$('.posts').append(getHtml(old[i]));
				lastmessage = old[old.length - 1].mid;
				$('.more a').attr('href','?show='+ feed +'&before=' + lastmessage);
			});
		}
		function my() {
			$.ajax({
				url:'//api.juick.com/home',
				data:{ hash:hash, before_mid:lastmessage }
			}).done(function(old){
				history.pushState({},document.title,'?show='+ feed +'&before=' + lastmessage);
				for (var i = 0; i < old.length; i++)
					$('.posts').append(getHtml(old[i]));
				lastmessage = old[old.length - 1].mid;
				$('.more a').attr('href','?show='+ feed +'&before=' + lastmessage);
			});
		}
		function photos() {
			$.ajax({
				url:'//api.juick.com/messages',
				data:{ before_mid:lastmessage, media:'all' }
			}).done(function(old){
				history.pushState({},document.title,'?show='+ feed +'&before=' + lastmessage);
				for (var i = 0; i < old.length; i++)
					$('.posts').append(getHtml(old[i]));
				lastmessage = old[old.length - 1].mid;
				$('.more a').attr('href','?show='+ feed +'&before=' + lastmessage);
			});
		}
		function user() {
			var user = $('.header').find('h2 div');
			var name = user.attr('data-name');
			var id = user.attr('data-id');
			$.ajax({
				url:'//api.juick.com/messages',
				data:{ before_mid:lastmessage, user_id:id }
			}).done(function(old){
				history.pushState({},document.title,'/' + name + '/?before=' + lastmessage);
				for (var i = 0; i < old.length; i++)
					$('.posts').append(getHtml(old[i]));
				lastmessage = old[old.length - 1].mid;
				$('.more a').attr('href',name + '/?before=' + lastmessage);
			});
		}
		function tag() {
			var user = $('.header').find('h2 div');
			var name = user.attr('data-name');
			var id = user.attr('data-id');
			var tag_name = $('#tags').find('span').text();
			if($('.header').length > 0) {
				$.ajax({
					url:'//api.juick.com/messages',
					data:{ before_mid:lastmessage, user_id:id, tag:tag_name }
				}).done(function(old){
					history.pushState({},document.title,'/' + name + '/?tag='+ tag_name +'&before=' + lastmessage);
					for (var i = 0; i < old.length; i++)
						$('.posts').append(getHtml(old[i]));
					lastmessage = old[old.length - 1].mid;
					$('.more a').attr('href',name + '/?tag='+ tag_name +'&before=' + lastmessage);
				});
			} else {
				$.ajax({
					url:'//api.juick.com/messages',
					data:{ before_mid:lastmessage, tag:tag_name }
				}).done(function(old){
					history.pushState({},document.title,'/tag/' + tag_name + '?before=' + lastmessage);
					for (var i = 0; i < old.length; i++)
						$('.posts').append(getHtml(old[i]));
					lastmessage = old[old.length - 1].mid;
					$('.more a').attr('href','/tag/' + tag_name + '?before=' + lastmessage);
				});
			}
		}
		function search() {
			var search = $('.search-big input').val();
			$.ajax({
				url:'//api.juick.com/messages',
				data:{ before_mid:lastmessage, search:search, page:'2' }
			}).done(function(old){
				history.pushState({},document.title,'?search=' + search + '&before=' + lastmessage);
				for (var i = 0; i < old.length; i++)
					$('.posts').append(getHtml(old[i]));
				lastmessage = old[old.length - 1].mid;
				$('.more a').attr('href','?search=' + search + '&before=' + lastmessage);
			});
		}
		function error() {
			$('.more a').text('Sorry, but error occurred');
		}
		switch(feed) {
			case 'all': all();
				break;
			case 'top': top();
				break;
			case 'my': my();
			case 'photos': photos();
				break;
			case 'user': user();
				break;
			case 'tag': tag();
				break;
			case 'search': search();
				break;
			default: error();
				break;
		}
	});
	// Выделение невидимого на странице поля с номером сообщения в формате Жаббера
	$(document).on('click','.action-time a', function(e) {
		e.preventDefault();
		$(this).parent().find('input').focus().select();
	});
	$(document).on('click','.update a',function(e){
		e.preventDefault();
		for (var i = 0; i < newMessages.length; i++)
			newMessage(newMessages[i]);
		newMessages = [];
		$('.update').fadeOut('500');
		$('head title').text('Juick');
	});
	// Авторизация и постинг
	function base_auth(pass) {
		var hash = window.btoa(unescape(encodeURIComponent(user_name + ':' + pass)));
		return "Basic " + hash;
	}
	var pass_saved = null;
	function post_do(p,t,d) {
		setTimeout(function() { 
			GM_xmlhttpRequest({
				url:'//api.juick.com/post',
				data:'body=' + encodeURIComponent(t),
				headers: {
					"Authorization":base_auth(p),
					"Content-Type":"application/x-www-form-urlencoded"
				},
				method:'POST',
				onload:d
			});
		}, 0);
	}
	function post(text,done) {
		if(!pass_saved) {
			$('.signin').fadeIn();
			$('.signin input').focus();
			$('.you sup').addClass('toggled');
			$(document).on('click','.signin button',function(){
				post_do(pass_saved,text,done);
			});
		} else {
			post_do(pass_saved,text,done);
		}
	}
	$(document).on('click','.you sup',function(){
		if($('.you sup').hasClass('toggled')) {
			$('.signin').fadeOut();
			$('.signin input').val('');
		} else {
			$('.signin').fadeIn();
			$('.signin input').focus();
		}
		$('.you sup').toggleClass('toggled');
	});
	$(document).on('click','.signin button',function(){
		pass_saved = $('.signin input').val();
		$('.you sup').removeClass('toggled');
		$('.signin').fadeOut();
		$('.signin input').val('');
		$('.signin p').text('You already signed in.');
	});
	// Возможно subscribe следует из лент убрать, хм
	$(document).on('click','.action-subscribe a',function() {
		var e = $(this);
		var id = e.parents('.post').attr('id');
		if(e.parent().hasClass('action-subscribed')) {
			post('U #' + id,function() {
				e.attr('href','/post?body=S+%23' + id);
				e.find('span').text('Subscribe');
				e.parent().removeClass('action-subscribed');
			});
		} else {
			post('S #' + id,function() {
				e.attr('href','/post?body=U+%23' + id);
				e.find('span').text('Subscribed');
				e.parent().addClass('action-subscribed');
			});
		}
		return false;
	});
	$(document).on('click','.action-recommend a',function(){
		var e = $(this);
		var id = e.parents('.post').attr('id');
		post('! #' + id,function(){
			e.find('span').text('Recommended');
			e.parent().addClass('action-recommended');
		});
		return false;
	});
	$(document).on('click','.image-zoom',function(e) { // Увеличение картинок по клику
		e.preventDefault();
		var image_large = $(this).attr('href').replace(/\/p\//, '/photos-1024/');
		$(this).find('img').one('load', function(){
			if($(this).parent().hasClass('image-zoomed')) {
				$(this).parent().removeClass('image-zoomed');
				$(this).animate({'width':$(this).attr('data-width')},'fast');
			} else {
				$(this).parent().addClass('image-zoomed');
				$(this).animate({'width':this.naturalWidth},'fast');
			}
		}).attr('src',image_large);
	});
	$(document).on('click','.action-share a',function(e){ // Отображение кнопок шаринга
		e.preventDefault();
		if($(this).hasClass('share-expand')) {
		$(this).removeClass('share-expand');
			$(this).parent().find('.invisible-dis').fadeOut();
		} else {
			$(this).addClass('share-expand');
			$(this).parent().find('.invisible-dis').fadeIn();
		}
	});
	setInterval(function(){ // Обновление времени, свыше 1 дня начинает тормозить, следует что-то сделать
		if(!moment) return;
		$('.action-time a, .timestamp').each(function(){
			var time = $(this).attr('title');
			$(this).text(moment.utc(time,'YYYY-MM-DD hh:mm:ss').fromNow())
		});
	}, 1000);
	function renderThread(t){ // Рендеринг треда
		var juick_link = t.mid + '#' + t.rid;
		var id = t.mid + '-' + t.rid;
		var image_link = t.photo ? t.photo.medium.replace(/\/photos-[0-9]+\//, '/p/') : '';
		var parent;
		var img;
		var result = $('<dl>').addClass('comment')
			.append($('<dt>').attr('id',id).attr('data-id',t.rid)
				.append($('<a>').addClass('avatar').attr('href',t.user.uname + '/').attr('style','background-image:url(//i.juick.com/a/' + t.user.uid + '.png)').attr('data-name',t.user.uname).attr('data-id',t.user.uid))
				.append($('<div>').addClass('message')
					.append($('<h3>')
						.append($('<a>').addClass('name').attr('href',t.user.uname + '/').attr('data-name',t.user.uname).attr('data-id',t.user.uid).text('@' + t.user.uname))
						.append(parent = $('<span>'))
					)
					.append($('<div>').addClass('text').append(htmlify(t)))
					.append(img = $('<div>').addClass('image'))
					.append($('<div>').addClass('comment-footer')
						.append($('<ul>').addClass('actions')
							.append($('<li>').addClass('action-time')
								.append($('<a>').attr('href',juick_link).attr('title',t.timestamp).text(t.timestamp))
								.append($('<input>').attr('type','text').val('#' + id))
							)
							.append($('<li>').addClass('action-reply')
								.append($('<a>').attr('href','#').text('Reply'))
							)
						)
					)
				)
			);
		if(t.photo) {
			img.append($('<a>').attr('href',image_link)
				.append($('<img>').attr('src',t.photo.small).load(function(){
					if(this.naturalWidth == 512 || this.naturalHeight == 512) {
						$(this).parent().addClass('image-zoom');
						$(this).after($('<div>').addClass('zoom'));
						$(this).attr('data-width',this.naturalWidth).css('width',$(this).attr('data-width'));
					}
				}))
			)
		} else { img.remove(); }
		if(t.replyto) {
			parent.text(' in reply to ')
				.append($('<a>').attr('href','#' + t.mid + '-' + t.replyto).text('/' + t.replyto)
			);
		} else { parent.remove(); }
		return result;
	}
	function comment(text,id,r) { // To do: починить комментирование
		post('#' + id + r + ' ' + text);
	}
	var newReplies = {};
	function addReply(t,id) {
		newReplies[id].push(normalizeMessage(t));
		if(newReplies[id].length > 0) { // Обновляем счётчик
			$('#' + id).find('.update-comment span').text(newReplies[id].length);
			$('#' + id).find('.update-comment').fadeIn('500');
		}
	}
	function newReply(r,c,id) {
		if(r.replyto) {
			r.body = r.body.replace(/^@([\w\-]+)/,'');
			c.find('#' + id + '-' + r.replyto).parent().append(renderThread(r));
		} else {
			c.append(renderThread(r));
		}
	}
	$(document).on('click','.action-expand a',function(e){ // Показ треда и отображение формы ответа
		e.preventDefault();
		var post = $(this).parents('.post');
		var id = post.attr('id');
		$.ajax({
			url:'//api.juick.com/thread',
			data:{mid:id}
		}).done(function(t){
			var comments = $('<div>').addClass('post-comments');
			var thread = $('<div>').addClass('post-comments-thread');
			var textarea = $('<textarea>');
			post.append(comments);
			newReplies[id] = [];
			sockets[id] = socket_open('wss://ws.juick.com/' + id,function(msg) {
				addReply(msg, id);
			});
			for (var i = 1; i < t.length; i++) {
				var msg = t[i];
				newReply(msg,thread,id);
			}
			comments.append(thread);
			comments.append($('<div>').addClass('update-comment')
				.append($('<a>').attr('href','#').html('New replies (<span>0</span>)'))
			);
			comments.append($('<div>').addClass('post-comments-reply')
				.append(textarea.attr('placeholder','You make our day').attr('rows','1').autosize())
				.append($('<button>').text('Done').click(function(){ comment(textarea.val(),id,'') }))
			);
		});
		$(this).text('Collapse').parent().removeClass('action-expand').addClass('action-collapse');
		post.addClass('post-expanded');
	});
	$(document).on('click','.update-comment a',function(e){
		e.preventDefault();
		var post = $(this).parents('.post');
		var id = post.attr('id');
		var thread = post.find('.post-comments-thread');
		var n = newReplies[id];
		e.preventDefault();
		for (var i = 0; i < n.length; i++)
			newReply(n[i],thread,id);
		newReplies[id] = [];
		$(this).parent().fadeOut('500');
	});
	$(document).on('click','.action-reply a',function(e){ // Форма ответа на ответ
		e.preventDefault();
		var id = $(this).parents('.post').attr('id');
		var comm = $(this).parents('dt');
		var reply = comm.attr('data-id');
		var textarea = $('<textarea>');
		comm.append($('<div>').addClass('post-comment-reply')
			.append(textarea.attr('placeholder','You make our day').attr('rows','1').autosize())
			.append($('<button>').text('Done').click(function(){ comment(textarea.val(),id,'/' + reply) }))
		);
		$(this).parent().removeClass('action-reply').addClass('action-cancel');
		$(this).text('Cancel');
	});
	$(document).on('click','.action-cancel a',function(e){ // Отмена написания ответа
		e.preventDefault();
		var comm = $(this).parents('dt');
		comm.find('.post-comment-reply').remove();
		$(this).parent().removeClass('action-cancel').addClass('action-reply');
		$(this).text('Reply');
	});
	$(document).on('click','.action-collapse a',function(e){ // Убирание треда и скрытие всех форм
		e.preventDefault();
		var post = $(this).parents('.post');
		var id = post.attr('id');
		post.removeClass('post-expanded').find('.post-comments').remove();
		$(this).parent().removeClass('action-collapse').addClass('action-expand');
		$(this).text('Expand');
		sockets[id].close();
	});
	$(document).on('click','.write-new button',function(){ // Кнопка «Write new post» вверху
		if($(this).hasClass('opened')){
			$('.write textarea').val('');
			$('.write .charnum').text('4096');
			$('.write').fadeOut('300');
			$('.write-new button').removeClass('opened').html('<i class="icon-plus"></i>Write new post');
		} else {
			$('.write textarea').autosize();
			$('.write').fadeIn('300');
			$('.write-new button').addClass('opened').html('<i class="icon-minus"></i>Cancel');
		}
	});
	$(document).on('click','.write .actions a',function(e){ // Кнопка «Cancel» в написании нового поста
		e.preventDefault();
		$('.write textarea').val('');
		$('.write .charnum').text('4096');
		$('.write').fadeOut('300');
		$('.write-new button').removeClass('opened').html('<i class="icon-plus"></i>Write new post');
	});
	$(document).on('click','.write button',function(){ // Кнопка отправления нового поста
		var e = $(this);
		var textarea = $('.write .text').val();
		post(textarea,function(){
			textarea.val('');
			$('.write .charnum').text('4096');
			$('.write').fadeOut('300');
			$('.write-new button').removeClass('opened').html('<i class="icon-plus"></i>Write new post');
		});
	});
	// Останавливать написание после достижения порога
	$(document).on('keypress','.write textarea',function(e){
		var max = 4096;
		var len = $(this).val().length;
		if (e.which < 0x20) {
			return;
		}
		if (len >= max) {
			e.preventDefault();
		}
	});
	// Счётчик оставшихся символов
	$(document).on('keyup','.write textarea',function(){
		var max = 4096;
		var len = $(this).val().length;
		if (len >= max) {
			$('.write .charnum').text('You have reached limit');
		} else {
			var char = max - len;
			$('.write .charnum').text(char);
		}
	});
	$(document).on('click','#top',function(e){ // Показ ленты популярных сообщений
		e.preventDefault();
		$.ajax({
			url:'//api.juick.com/messages',
			data:{popular:'1'}
		}).done(function(top){
			var title = 'Juick — Top';
			feed = 'top';
			$('.posts').empty();
			$('.feeds .selected').removeClass('selected');
			$('#top').parent().addClass('selected');
			for (var i = 0; i < top.length; i++)
				$('.posts').append(getHtml(top[i]));
			lastmessage = top[top.length - 1].mid;
			$('.more a').attr('href','?before=' + lastmessage + '&show=' + feed);
			history.pushState({}, title, '?show=' + feed);
			document.title = title;
			socket_all.close();
		});
	});
	$(document).on('click','#photos',function(e){ // Показ ленты медиафайлов
		e.preventDefault();
		$.ajax({
			url:'//api.juick.com/messages',
			data:{media:'all'}
		}).done(function(ph){
			var title = 'Juick — Media files';
			feed = 'photos';
			$('.posts').empty();
			$('.feeds .selected').removeClass('selected');
			$('#photos').parent().addClass('selected');
			for (var i = 0; i < ph.length; i++)
				$('.posts').append(getHtml(ph[i]));
			lastmessage = ph[ph.length - 1].mid;
			$('.more a').attr('href','?before=' + lastmessage + '&show=' + feed);
			history.pushState({}, title, '/?show=' + feed);
			document.title = title;
			socket_all.close();
		});
	});
	function userpage(name, id) {
		var title = 'Juick — @' + name;
		$('.header, .tags-all, .read').remove();
		$('.content').removeClass('content-feed').addClass('content-user')
			.prepend($('<div>').addClass('read')
				.append($('<div>').addClass('read-reading')
					.append($('<h2>').text('Subscriptions'))
					.append($('<ul>'))
				)
				.append($('<div>').addClass('read-readers')
					.append($('<h2>').text('Readers'))
					.append($('<ul>'))
				)
			)
			.prepend($('<div>').addClass('tags-all'))
			.prepend($('<div>').addClass('header')
				.append($('<div>').addClass('header-inner')
					.append($('<div>').addClass('avatar').attr('style','background-image:url(//i.juick.com/a/'+ id +'.png)'))
					.append($('<div>').addClass('desc')
						.append($('<h2>')
							.append($('<div>').attr('data-id',id).attr('data-name',name).text(name).prepend($('<span>').text('@')))
							.append($('<ul>')
								.append($('<li>')
									.append($('<a>').attr('href','post?body=S @' + name).text('Subscribe')
										.prepend($('<i>').addClass('icon-comments-alt'))
									)
								)
								.append($('<li>')
									.append($('<a>').attr('href','post?body=BL @' + name).text('Block')
										.prepend($('<i>').addClass('icon-ban-circle'))
									)
								)
								.append($('<li>')
									.append($('<a>').attr('href','post?body=@' + name).text('Chat')
										.prepend($('<i>').addClass('icon-exchange'))
									)
								)
							)
						)
						.append($('<ul>').addClass('stats')
							.append($('<li>').addClass('reading')
								.append($('<a>').attr('href','//juick.com/' + name + '/friends').text(' reading')
									.prepend($('<span>').text('0'))
								)
							)
							.append($('<li>').addClass('readers')
								.append($('<a>').attr('href','//juick.com/' + name + '/readers').text(' readers')
									.prepend($('<span>').text('0'))
								)
							)
						)
					)
					.append($('<div>').addClass('tags'))
				)
			
			);
		$('.feeds').empty()
			.append($('<li>').addClass('feed selected')
				.append($('<a>').attr('href',name + '/').text('All'))
			)
			.append($('<li>').addClass('feed')
				.append($('<a>').attr('href',name + '/?show=recomm').text('Recommendations'))
			)
			.append($('<li>').addClass('feed')
				.append($('<a>').attr('id','photos').attr('href',name + '/?show=photos').text('Media files'))
			)
			.append($('<li>').addClass('feed')
				.append($('<a>').attr('id','tags').attr('href',name + '/tags').text('Tags'))
			);
		$('.posts').empty();
		$.ajax({ // Счётчик читаемого пользователем
			url: '//api.juick.com/users/read',
			data: {
				uname: name
			},
			dataType: 'jsonp'
		}).done(function(r) {
			r.sort(function (a, b) {
				if (a.uname.toUpperCase() > b.uname.toUpperCase()) return 1;
				if (a.uname.toUpperCase() < b.uname.toUpperCase()) return -1;
				return 0;
			});
			for(var i = 0; i < r.length; i++) {
				var read_link = $('<li>').append($('<a>').attr('href','/' + r[i].uname + '/').addClass('name').attr('data-name',r[i].uname).attr('data-id',r[i].uid).append($('<span>').text('@' + r[i].uname)).prepend($('<img>').addClass('avatar').attr('src','//i.juick.com/as/' + r[i].uid + '.png')));
				$('.read-reading ul').append(read_link);
			}
			$('.reading span').text(r.length);
		});
		$.ajax({ // Счётчик читающих пользователя
			url: '//api.juick.com/users/readers',
			data: {
				uname: name
			},
			dataType: 'jsonp'
		}).done(function(rs) {
			rs.sort(function (a, b) {
				if (a.uname.toUpperCase() > b.uname.toUpperCase()) return 1;
				if (a.uname.toUpperCase() < b.uname.toUpperCase()) return -1;
				return 0;
			});
			for(var i = 0; i < rs.length; i++) {
				var read_link = $('<li>').append($('<a>').attr('href','/' + rs[i].uname + '/').addClass('name').attr('data-name',rs[i].uname).attr('data-id',rs[i].uid).append($('<span>').text('@' + rs[i].uname)).prepend($('<img>').addClass('avatar').attr('src','//i.juick.com/as/' + rs[i].uid + '.png')));
				$('.read-readers ul').append(read_link);
			}
			$('.readers span').text(rs.length);
		});
		$.ajax({ // Список тэгов
			url: '//api.juick.com/tags',
			data: {
				user_id: id
			},
			dataType: 'jsonp'
		}).done(function(tags) {
			var tagsMap = {};
			for(var i = 0; i < tags.length; i++) {
				var taglink = $('<a>').attr('href', name + '/?tag=' + tags[i].tag).attr('data-tag',tags[i].tag).text(tags[i].tag);
				var tag_fl = tags[i].tag[0].toUpperCase();
				if(!tagsMap[tag_fl]) {
					var div = $('<div>');
					$('.tags-all').append(div.append($('<h2>').text(tag_fl)).append($('<ul>')));
					tagsMap[tag_fl] = div
				}
				tagsMap[tag_fl].find('ul').append($('<li>').append(taglink).append($('<span>').text(tags[i].messages)));
			}
			var sorted = tags.sort(function (a, b) {
				if (a.messages > b.messages) return -1;
				if (a.messages < b.messages) return 1;
				return 0;
			});
			for(var i = 0; i < tags.length; i++) {
				var index = tags.indexOf(tags[i]);
				var taglink = $('<a>').attr('href', name + '/?tag=' + tags[i].tag).attr('data-tag',tags[i].tag).text(tags[i].tag).append($('<span>').text(tags[i].messages));
				if(index > 10) {
				} else {
					$('.tags').append(taglink);
				}
			}
			$('.tags').append($('<a>').attr('href', name + '/tags').addClass('others').text('Others'));
		});
		$.ajax({ // Показ сообщений
			url:'//api.juick.com/messages',
			data:{user_id:id},
			dataType:'json'
		}).done(function(u){
			for (var i = u.length; i > 0; i--) {
				newMessage(u[i - 1]);
			}
			feed = 'user';
			lastmessage = u[u.length - 1].mid;
			$('.more a').attr('href',name + '/?before=' + lastmessage);
		});
		history.pushState({},title,'/' + name + '/');
		document.title = title;
	}
	// Показ страниц жуикопользователей
	$(document).on('click','.name, .post .avatar, .comment .avatar, .who a',function(e){
		e.preventDefault();
		var name = $(this).attr('data-name');
		var id = $(this).attr('data-id');
		$('.read').fadeOut();
		$('.feeds, .posts, .more').fadeIn();
		userpage(name, id);
		socket_all.close();
	});
	// Показывать читаемое и читающих по клику
	$(document).on('click','.reading, .readers',function(e){
		e.preventDefault();
		var name = $('.header h2 div').attr('data-name');
		var title = 'Juick — @' + name + '’ subscriptions and readers';
		if($('.read').hasClass('read-expanded')) {
			$('.read').fadeOut().removeClass('read-expanded');
			$('.feeds').fadeIn();
			$('.posts').fadeIn();
			$('.more').fadeIn();
		} else {
			$('.read').fadeIn().addClass('read-expanded');
			$('.feeds').fadeOut();
			$('.posts').fadeOut();
			$('.more').fadeOut();
		}
		
		history.pushState({},title,'readers');
		document.title = title;
	});
	// Показывать тэг по клику на него в ленте
	$(document).on('click','.content-feed .action-tags a',function(e){
		e.preventDefault();
		var tag_name = $(this).text();
		var title = 'Juick — *' + tag_name;
		$.ajax({
			url:'//api.juick.com/messages',
			data:{ tag:tag_name }
		}).done(function(tag){
			$('.posts').empty();
			if($('#tags').length > 0) {
				$('#tags').html('Tag: *<span>' + tag_name +'</span>');
			} else {
				$('.feeds .selected').removeClass('selected');
				$('.feeds').append($('<li>').addClass('feed selected').append($('<a>').attr('id','tags').attr('href','/tag/' + tag_name).text('Tag: *').append($('<span>').text(tag_name))))
			}
			for (var i = tag.length; i > 0; i--) {
				newMessage(tag[i - 1]);
			}
			feed = 'tag';
			lastmessage = tag[tag.length - 1].mid;
			$('.more a').attr('href','tag/' + tag_name + '?before=' + lastmessage);
			socket_all.close();
			history.pushState({},title,'/tag/' + tag_name);
			document.title = title;
		});
	});
	function pm_show(id,name) { // Функция показа приватных сообщений с пользователем
		$.ajax({
			url:'//api.juick.com/pm',
			data:{ hash:hash, uname:name }
		}).done(function(pm){
			$.each(pm,function(i,item){
				var message = $('<div>').addClass('conv-message');
				var who = $('<div>').addClass('who');
				$('.content-conv .conv-messages').prepend(message.append(who)
					.append($('<div>').addClass('text').text(item.body)
						.append($('<div>').addClass('timestamp').text(item.timestamp).attr('title',item.timestamp))
					)
				)
				if(item.user.uid == user_id) {
					who.append($('<a>').attr('data-id',id).attr('data-name',user_name).attr('href',user_name + '/').attr('style','background-image:url(//i.juick.com/a/' + user_id + '.png)'));
					message.addClass('conv-message-you');
				} else {
					who.append($('<a>').attr('data-id',id).attr('data-name',name).attr('href',name + '/').attr('style','background-image:url(//i.juick.com/a/' + id + '.png)'));
				}
			});
		});
		$.each(convs,function(i,item) {
			if(item.uname==name && item.MessagesCount>0) {
				item.MessagesCount=0;
			}
		});
	}
	var conv_list = false;
	$(document).on('click','#chat',function(e){ // Обработчик клика по «Conversations»
		e.preventDefault();
		$('.conv .icon').toggleClass('icon-angle-down').toggleClass('icon-angle-up');
		convs.sort(function (a, b) {
				if (a.uname.toUpperCase() > b.uname.toUpperCase()) return 1;
				if (a.uname.toUpperCase() < b.uname.toUpperCase()) return -1;
				return 0;
		});
		if(conv_list == false) {
			$.each(convs,function(i,item){
				var unreaded;
				$('.dropdown').append($('<li>')
					.append($('<a>').attr('href','/' + item.uname + '/').attr('data-name',item.uname).attr('data-id',item.uid).text('@' + item.uname)
						.prepend($('<img>').attr('src','//i.juick.com/as/' + item.uid + '.png'))
						.append(unreaded = $('<span>').addClass('unreaded'))
					)
				);
				if(item.MessagesCount) {
					unreaded.text(item.MessagesCount)
				} else { unreaded.remove(); }
			});
			conv_list = true;
		}
		$('.dropdown').fadeToggle('300');
	});
	$(document).on('click','.dropdown a', function(e){ // Показ выпадающего списка с выбором пользователя
		e.preventDefault();
		$('.conv .icon').toggleClass('icon-angle-down').toggleClass('icon-angle-up');
		$('.dropdown li.selected').removeClass('selected');
		$(this).parent().addClass('selected');
		var name = $(this).attr('data-name');
		var id = $(this).attr('data-id');
		$('.dropdown').fadeOut('300');
		$('.content').empty().removeClass('content-feed').addClass('content-conv')
			.append($('<div>').addClass('conv-header')
				.append($('<h2>').text('@' + name))
				.append($('<div>').addClass('divider'))
			)
			.append($('<div>').addClass('conv-reply')
				.append($('<textarea>').attr('placeholder','Write your message here…').autosize())
				.append($('<button>').text('Send'))
			)
			.append($('<div>').addClass('conv-messages'));
		$('.conv-reply textarea').focus();
		feed = 'conv';
		pm_show(id,name);
		socket_all.close();
	});
	$(document).on('click','.conv-reply button',function(){ // Отправление нового приватного сообщения и показ его в переписке
		var name = $('.dropdown li.selected a').attr('data-name');
		var text = $('.conv-reply textarea').val();
		var timestamp = moment.utc().format('YYYY-MM-DD H:m:ss');
		$.ajax({
			url:'//api.juick.com/pm',
			data:{ hash:hash, uname:name, body:text },
			type:'POST'
		}).done(function(pm){
			$('.conv-reply textarea').val('');
			$('.content-conv .conv-messages').prepend($('<div>').addClass('conv-message')
				.append($('<div>').addClass('who')
					.append($('<a>').attr('data-id',id).attr('data-name',user_name).attr('href',user_name + '/').attr('style','background-image:url(//i.juick.com/a/' + user_id + '.png)'))
				)
				.append($('<div>').addClass('text').text(text)
					.append($('<div>').addClass('timestamp').text(timestamp).attr('title',timestamp))
				)
			)
		});
	});
	$(document).on('click','#my',function(e){ // Показ моих подписок, to do: фильтровать их хоть как-то
		e.preventDefault();
		$.ajax({
			url:'//api.juick.com/home',
			data:{ hash:hash }
		}).done(function(my){
			var title = 'Juick — Subscriptions';
			feed = 'my';
			$('.posts').empty();
			$('.feeds .selected').removeClass('selected');
			$('#my').parent().addClass('selected');
			for (var i = 0; i < my.length; i++)
				$('.posts').append(getHtml(my[i]));
			lastmessage = my[my.length - 1].mid;
			$('.more a').attr('href','?before=' + lastmessage + '&show=' + feed);
			history.pushState({}, title, '/?show=' + feed);
			document.title = title;
			socket_all.close();
		});
	});
	// Показ локации, карты и сообщений с ней
	// To do: сделать нормальное показывание локаций
	$(document).on('click','.action-location a',function(e){
		e.preventDefault();
		var name = $(this).find('span').text();
		var id = $(this).attr('data-id');
		$('.feeds').remove();
		$('.content').empty()
			.append($('<div>').addClass('loc-header')
				.append($('<h2>').text(name))
				.append($('<div>').addClass('divider'))
			)
			.append($('<div>').addClass('loc-map')
				.append($('<iframe>').attr('width','100%').attr('height','100%').attr('frameborder','0')
					.attr('marginwidth','0').attr('marginheight','0')
					.attr('src','//google.ru/maps?q=' + name + '&output=embed&iwloc=near'))
			)
			.append($('<div>').addClass('posts'))
		$.ajax({
			url:'//api.juick.com/messages',
			data:{place_id:id}
		}).done(function(pl){
			for (var i = 0; i < pl.length; i++) {
				$('.posts').append(getHtml(pl[i]));
			}
			socket_all.close();
		});
	});
	// Поиск
	$(document).on('keypress','.search input, .search-big input',function(e){
		var search = $(this).val();
		var title = 'Juick — Search: ' + search;
		if(e.which == 13) {
			$.ajax({
				url:'//api.juick.com/messages',
				data:{search:search},
			}).done(function(s){
				var input = $('<input>').attr('type','text');
				$('.content').empty()
					.append($('<div>').addClass('search-big')
						.append(input.attr('placeholder','Type and hit “Enter”').attr('value',search))
					)
					.append($('<div>').addClass('posts'))
					.append($('<div>').addClass('more')
						.append($('<a>').attr('href','#').text('More'))
					);
				input.focus();
				for(var i = 0; i < s.length; i++)
					$('.posts').append(getHtml(s[i]));
				lastmessage = s[s.length - 1].mid;
				feed = 'search';
				socket_all.close();
				history.pushState({}, title, '/?search=' + search);
				document.title = title;
			});
		}
	});
	$(document).on('click','#all, .logo',function(e){
		e.preventDefault();
		var title = 'Juick';
		$('.content').removeClass('content-' + feed).addClass('content-feed').empty()
			.append($('<ul>').addClass('feeds')
				.append($('<li>').addClass('selected')
					.append($('<a>').attr('id','all').attr('href','/').text('All'))
				)
				.append($('<li>')
					.append($('<a>').attr('id','top').attr('href','?show=top').text('Popular'))
				)
				.append($('<li>')
					.append($('<a>').attr('id','my').attr('href','?show=my').text('Subscriptions'))
				)
				.append($('<li>')
					.append($('<a>').attr('id','photos').attr('href','?show=photos').text('Media files'))
				)
			)
			.append($('<div>').addClass('update')
				.append($('<a>').attr('href','#').html('New posts (<span>0</span>)'))
			)
			.append($('<div>').addClass('write')
				.append($('<a>').addClass('avatar').attr('data-id',user_id).attr('data-name',user_name).attr('href',user_name).attr('style','background-image:url(//i.juick.com/a/' + user_id + '.png)'))
				.append($('<div>').addClass('message')
					.append($('<h3>')
						.append($('<a>').addClass('name').attr('data-id',user_id).attr('data-name',user_name).attr('href',user_name).text('@' + user_name))
					)
					.append($('<textarea>').addClass('text').attr('placeholder','You make our day').attr('rows','1'))
					.append($('<div>').addClass('write-footer')
						.append($('<div>').addClass('actions')
							.append($('<button>').text('Done'))
							.append($('<a>').attr('href','#').text('Cancel'))
							.append($('<span>').addClass('charnum').text('4096'))
						)
					)
				)
			)
			.append($('<div>').addClass('posts'))
			.append($('<div>').addClass('more')
				.append($('<a>').attr('href','#').text('More'))
			);
		load_all();
		history.pushState({}, title, '/');
		document.title = title;
	});
});