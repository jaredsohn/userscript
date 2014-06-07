// ==UserScript==
// @name			Quickcollection
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Add Items quickly to your Collections
// @date			2012-08-22
// @version			0.3
// @include			http://activeden.net/*
// @include			http://audiojungle.net/*
// @include			http://themeforest.net/*
// @include			http://videohive.net/*
// @include			http://graphicriver.net/*
// @include			http://3docean.net/*
// @include			http://codecanyon.net/*
// @include			http://marketplace.tutsplus.com/*
// @include			http://photodune.net/*
// ==/UserScript==
(function () {



    function quickcollection() {

        	var username = $('#user_username').text();

	if (!username || !JSON) return false;

	var refreshindays = 1,
		cont, now = new Date().getTime(),
		lastcheck = getCookie('quickcollection_lastcheck');

	var currentid = 0;
	$('#new_collection, #bookmark_form').submit(function () {
		localStorage.removeItem('quickcollection');
	});

	if (!lastcheck) {
		localStorage.removeItem('quickcollection');
		setCookie('quickcollection_lastcheck', now, refreshindays);
	}
	if (location.hash == '#bookmark_form') {
		$('#collection_create_link').find('a').trigger('click');
		$('#name').focus();
	}

	getCollections(function (collections) {


		var html = getHTML(collections);


		cont = $('<div>', {
			'id': 'quickcollection'
		}).css({
			"position": "absolute",
			"zIndex": "2000",
			"background-color": '#F4F4F4',
			"border": "1px solid #BBBBBB",
			"text-align": "left",
			"-webkit-box-shadow": "4px 4px 0 0 rgba(35, 35, 35, 0.1)",
			"-moz-box-shadow": "4px 4px 0 0 rgba(35, 35, 35, 0.1)",
			"box-shadow": "4px 4px 0 0 rgba(35, 35, 35, 0.1)",
			"font-size": "10px",
			"display": "block",
			"padding": "10px"
		}).html('' + html + '').hide().appendTo('body').bind('mouseleave', function () {
			$(this).stop().fadeTo(50, 0, function () {
				cont.css({
					'left': -300
				});
			});
		}).delegate('a', 'click', function () {
			var _this = $(this),
				collectionid = _this.data('id');
			if (collectionid) {
				add(currentid, collectionid, '', function () {
					//alert('Item successfully added to "'+_this.text()+'"');						  
				}, function () {
					alert('Couldn\'t save item to "' + _this.text() + '"');
					localStorage.removeItem('quickcollection');
					_this.remove();
				});

			} else if (_this.is('.quickcollection_new')) {

				if (name = prompt('New Collection', 'Enter Collection Name')) {
					add(currentid, collectionid, name, function () {
						alert('Item successfully added to new collection "' + name + '"');
						refreshcollection();
					}, function () {
						alert('Couldn\'t save item to "' + name + '"');
						localStorage.removeItem('quickcollection');
					});
				}
				return false

			} else if (_this.is('.quickcollection_refresh')) {

				refreshcollection();

			}
			return false;
		});

		var h = cont.height();

		$('img[data-preview-url], .audio-container').each(function () {
			var _this = $(this),
				itemname = _this.data('itemName');
			wrapper = _this.parent().parent().css('position', 'relative');
			if (!wrapper.is('.thumbnail')) {
				wrapper = _this.parent();
				if (!wrapper.is('.thumbnail')) {
					return false;
				}
			}
			if (wrapper.find('a').eq(0).is('.quickcollection')) return false;
			var href = wrapper.find('a').attr('href').split('?')[0],
				id = href.split('/').pop();

			wrapper.hover(function () {
				$(this).find('a.quickcollection').fadeIn(100);
			}, function () {
				$(this).find('a.quickcollection').fadeOut(100);
			});

			$('<a>', {
				"class": "quickcollection",
				title: 'Bookmark "' + itemname + '"',
				href: '#'
			}).data('id', id).css({
				"position": "absolute",
				"display": "block",
				"border": "0 !important",
				"background": "url(http://3.envato-static.com/images/common/icons-buttons/account-dropdown-5af2a6fbdc.png) no-repeat -5px -90px",
				"width": 10,
				"height": 16,
				"zIndex": 1,
				"margin-left": "16px",
				"padding": "0"
			}).html('').hide().prependTo(wrapper).click(function () {
				var _this = $(this),
					_o = _this.offset();
				currentid = _this.data('id');
				cont.css({
					'top': _o.top - (h / 4) + 'px',
					'left': (_o.left) + 'px'
				}).stop().fadeTo(200, 1);
				return false;
			});

		});

	});

	function getHTML(collections) {
		var html = '<span style="font-weight:700;">Quickcollection</span> | <a href="#" class="quickcollection_new">new Collection</a> | <a href="#" class="quickcollection_refresh" style="font-size:14px" title="refresh list">&#8635;</a>';

		for (name in collections) {
			html += '<br><a href="#" style="line-height:16px;white-space:nowrap" data-id="' + collections[name] + '">' + name + '</a>';
		}

		return html;

	}


	function refreshcollection() {
		localStorage.removeItem('quickcollection');
		getCollections(function (collections) {
			html = getHTML(collections);
			cont.html(html);
		})
	}


	function getCollections(callback) {
		var collections = $.parseJSON(localStorage.getItem('quickcollection'));
		if (!collections) {
			$.get(getURL(), function (data) {

				collections = {};

				data = data.match(/<a href="\/collections\/(\d+)-[^"]+">([^<]+)/g) || [];
				var count = data.length;
				for (var i = 0; i < count; i++) {
					collections[data[i].substr(data[i].lastIndexOf('>') + 1)] = data[i].match(/\d+/)[0];
				}
				localStorage.setItem('quickcollection', JSON.stringify(collections));
				callback(collections);

			});
		}
		callback(collections);
	}

	function add(itemid, collectionid, collectionname, success, error) {
		$('#ajax-feedback').show();
		$.ajax('/bookmarks/create?item_id=' + itemid, {
			data: {
				name: collectionname,
				collection_id: collectionid
			},
			type: 'POST',
			cache: false,
			success: function (d) {
				success(d);
			},
			complete: function () {
				$('#ajax-feedback').hide();
			},
			error: function (d) {
				error(d);
			}

		});
	};

	function getURL() {
		return '/user/' + username + '/bookmarks';
	};

	function setCookie(cookieName, value, daysToExpire, path, domain, secure) {
		var expiryDate;

		if (daysToExpire) {
			expiryDate = new Date();
			expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 8.64e7));
		}

		document.cookie = cookieName + '=' + (value.toString()) + (daysToExpire ? ';expires=' + expiryDate.toGMTString() : '') + ';path=' + (path ? path : '/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
		return getCookie(cookieName);
	}

	function getCookie(cookieName) {
		var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
			cookieMatch = cookiePattern.exec(document.cookie);
		if (cookieMatch) {
			return cookieMatch[2];
		}
		return 0;
	};





    }

    var inject = document.createElement("script");

    inject.setAttribute("type", "text/javascript");
    inject.appendChild(document.createTextNode("(" + quickcollection + ")()"));

    (document.head || document.documentElement).appendChild(inject);


})();