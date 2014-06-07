// ==UserScript==
// @name           Flasher
// @author        Leif-Bengt Viktor 
// @version       1.4.3
// @namespace      fl-gr
// @include      *flashback.*
// ==/UserScript==
if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
	initiateFlasher(unsafeWindow.jQuery);
} else {
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
		script.addEventListener('load', function () {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	addJQuery(initiateFlasher);
}

function initiateFlasher(arg) {
	if (arg) {
		$ = arg;
	}

	var ajaxQueue = [];
	var processAjaxQueue = function () {
		if (ajaxQueue.length > 0) {
			for (ajax in ajaxQueue) {
				var obj = ajaxQueue[ajax];

				try {
					GM_xmlhttpRequest(obj);
				} catch (e) {};
			}
			ajaxQueue = [];
		}
	};

	setInterval(function () {
		processAjaxQueue();
	}, 100);

	function gmAjax(obj) {
		ajaxQueue.push(obj);
	}

	var Flasher = {};

	Flasher.defaultSettings = {
		changeLayout: {
			value: true,
			label: 'Ändra layout',
			html: '<input type="checkbox"/>'
		},
		autoLoadPage: {
			value: true,
			label: 'Ladda nästa sida',
			html: '<input type="checkbox"/>'
		},
		favoritesPage: {
			value: true,
			label: 'Nyheter för favoriter',
			html: '<input type="checkbox"/>'
		},
		showPictures: {
			value: true,
			label: 'Visa bilder',
			html: '<input type="checkbox"/>'
		},
		showPicturesButtons: {
			value: false,
			label: 'Visa knappar för bilder',
			html: '<input type="checkbox"/>'
		},
		showMagicImageFetch: {
			value: false,
			label: 'Visa "försök hitta bild" knapp för länkar',
			html: '<input type="checkbox"/>'
		},
		shortenQuotes: {
			value: true,
			label: 'Förkorta citat längre än 250 tecken',
			html: '<input type="checkbox"/>'
		},
		showVideos: {
			value: true,
			label: 'Visa videos',
			html: '<input type="checkbox"/>'
		},
		resizeTextarea: {
			value: true,
			label: 'Ändra dynamiskt storleken på inläggsrutan',
			html: '<input type="checkbox"/>'
		},
		favorites: {
			value: '',
			label: 'Favorit-forum',
			html: '<textarea id="flasher-favorite-selector"></textarea>'
		},
		maxImageWidth: {
			value: 800,
			label: 'Maxbredd på bilder',
			html: '<input type="text"/>'
		},
		maxImageHeight: {
			value: 800,
			label: 'Maxhöjd på bilder',
			html: '<input type="text"/>'
		},
		showExpandedUrl: {
			value: true,
			label: 'Visa expanderade url',
			html: '<input type="checkbox"/>'
		},
		showGallery: {
			value: true,
			label: 'Aktivera bildgalleri',
			html: '<input type="checkbox"/>'
		}
	};
	Flasher.currentSettings = {};
	Flasher.init = function (refresh) {
		if (!refresh) {
			Flasher.setupSettings();
			Flasher.setupTemplates();
		}
		Flasher.setupStatus();
		Flasher.setupCacheVars();
		Flasher.setupCacheCollections();
		Flasher.fixLeaveLinks();

		if (Flasher.status.isTopic) {
			Flasher.setupVideoLinks();
			Flasher.setupShortenQuotes();
			Flasher.setupImageLinks();

			if (!refresh && Flasher.currentSettings.autoLoadPage.value) {
				Flasher.setupAutoLoadPage();
			}
		}
		if (!refresh) {
			Flasher.setupMenu();
			Flasher.fixLayout();
			Flasher.setupFavorites();
			Flasher.setupFavoritesPage();
			Flasher.generalFixes();
			if (Flasher.currentSettings.showGallery.value) {
				Flasher.setupGallery();
			}
		}
	};
	Flasher.setupGallery = function () {
		var $galleryButton = $('<li class="l0 right-menu"><a href="#">Visa galleri</a></li>').appendTo('.top-menu-main').click(function (event) {
			$('.flasher-gallery').remove();

			var $gallery = $('<div class="flasher-gallery" />').appendTo('body').click(function (event) {
				$(this).remove();
				return false;
			});

			$('.flasher-image').each(function (index) {
				$(this).clone().appendTo($gallery).show();
			});
			return false;
		});
	};
	Flasher.generalFixes = function () {
		$('[class*="post-bbcode"]').width('100%');
		$('a[onclick*="open"]').remove();
		if (window.location.pathname.match(/.php/)) {
			if (Flasher.currentSettings.resizeTextarea.value) {
				$('#vB_Editor_001_textarea').each(function (index) {
					var originHeight = $(this).height();

					$(this).css({
						'line-height': '15px',
						'padding': '10px',
						'overflow': 'hidden'
					});

					var $dummy = $('<div />').appendTo('body').css({
						'position': 'absolute',
						'top': 0,
						'left': -2000,
						'font-size': $(this).css('font-size'),
						'line-height': $(this).css('line-height'),
						'padding': '10px'
					}).width($(this).width());


					$(this).keyup(function () {
						$dummy.html($(this).val().replace(/\n/g, '<br>'));

						if ($dummy.height() > originHeight) {
							$(this).height($dummy.height() + 15);
						}
						else {
							$(this).height(originHeight);
						}
					}).keyup();
				});
			}
			$extraControls = $('<div id="extra-controls"/>').append($('#vB_Editor_001_save').clone()).append($('[value="Förhandsgranska meddelande"]').clone());
			$('div.smallfont:contains("Meddelande")').after($extraControls);
		}
		$(document).keyup(function (e) {
			if (e.ctrlKey && e.which == 37) {
				var $prevEl = $('a[title*="Föregående sida"]:first');
				if ($prevEl.length) {
					window.location = $prevEl.attr('href');
				}
			}
			if (e.ctrlKey && e.which == 39) {
				var $nextEl = $('a[title*="Nästa sida"]:first');
				if ($nextEl.length) {
					window.location = $nextEl.attr('href');
				}
			}
		});
	};
	Flasher.setupTemplates = function () {
		Flasher.templates = {
			image: $('<img class="flasher-image"/>').css({
				'max-width': Flasher.currentSettings.maxImageWidth.value + 'px',
				'max-height': Flasher.currentSettings.maxImageHeight.value + 'px'
			})
		};
	};
	Flasher.setupSettings = function () {
		$.each(Flasher.defaultSettings, function (key, value) {
			Flasher.currentSettings[key] = {
				label: Flasher.defaultSettings[key].label,
				html: Flasher.defaultSettings[key].html
			};
			var userChoice = localStorage.getItem(key);
			var choice;

			if (userChoice !== null) {
				choice = userChoice;
			} else {
				choice = Flasher.defaultSettings[key].value;
			}

			if (typeof choice === 'string') {
				if (choice.match(/true/i)) {
					Flasher.currentSettings[key].value = true;
				} else if (choice.match(/false/i)) {
					Flasher.currentSettings[key].value = false;
				} else if (choice.match(/^[0-9]+$/i)) {
					Flasher.currentSettings[key].value = parseInt(choice, 10);
				} else {
					Flasher.currentSettings[key].value = choice;
				}
			} else {
				Flasher.currentSettings[key].value = choice;
			}
		});
	};
	Flasher.setupFavorites = function () {
		if (Flasher.currentSettings.favorites.value) {
			var favorites = Flasher.currentSettings.favorites.value;
			var favArr = favorites.split(/#/);
			var $favMenu = $('<ul id="flasher-favorites"/>');
			$.each(favArr, function (index) {
				var content = this.split(/_/);
				var $li = $('<li />').append('<a href="/' + content[1] + '">' + content[0] + '</a>').appendTo($favMenu);
			});
			$favMenu.appendTo('body');
		}
	};
	Flasher.setupFavoritesPage = function () {
		if (Flasher.currentSettings.favoritesPage.value) {
			var $favoritesPageButton = $('<li class="favorites-page-toggle"><a>Visa nyheter bland favoriter</a></li>').click(function() {
				var favUrls = $('#flasher-favorites > li:not(.favorites-page-toggle) a').map(function(){return $(this).attr('href');}).get();
				var favText = $('#flasher-favorites > li:not(.favorites-page-toggle) a').map(function(){return $(this).text();}).get().join(', ');

				(function generateFavPage(index) {
					if (favUrls[index]) {
						$.ajax({
							url: favUrls[index],
							success: function (html) {
								var $newDom = $(html);
								if (index === 0) {
									$('#site-container').html($newDom.find('#site-container').html()).find('.list-forum-title').remove();
									$('.navbar').filter(':not(:last)').add('#navbar-final').add('.list-forum-title').remove();
									$('.navbar a').text('Nyheter bland favoriter - '+favText);
									$('.navcontrolbar').each(function() {
										$(this).closest('table').remove();
									});
									$('.tborder:has(.forum-summary)').remove();
									$('.tborder:last').remove();
									$('#threadslist tbody tr:gt(0):not(:has(a[class*="new"]))').remove();
								} else {
									$newDom.find('#threadslist tbody tr:gt(0):has(a[class*="new"])').appendTo('#threadslist tbody');
								}
								generateFavPage(index+1);
							}
						});
					}
				})(0);
			});

			$favoritesPageButton.css('float', 'right').find('a').css('border-right', '0');
			$('#flasher-favorites').prepend($favoritesPageButton);
		}
	};
	Flasher.setupAutoLoadPage = function () {
		$(window).scroll(function () {
			if ($(window).scrollTop() > $(document).height() - $(window).height() - 500 && !Flasher.isFetchingNewPage) {
				Flasher.isFetchingNewPage = true;
				var $next = $('a[title*="Nästa sida"]:last');

				if ($next.length && $next.attr('href')) {
					var nextUrl = window.location.protocol + '//' + window.location.hostname + $next.attr('href');

					$.ajax({
						url: nextUrl,
						success: function (html) {
							var $newDom = $(html);

							$('.alignr.navcontrolbar:first').html($newDom.find('.alignr.navcontrolbar:first').html());
							$('.alignr.navcontrolbar:last').html($newDom.find('.alignr.navcontrolbar:last').html());

							$('div').filter('#posts:last').after($newDom.find('#posts'));

							Flasher.isFetchingNewPage = false;

							Flasher.init(true);
						},
						error: function () {
							if (callback) {
								callback('error');
							}
						}
					});
				}

			}
		});

	};
	Flasher.setupMenu = function () {
		$(document).keypress(function (e) {
			if (e.altKey && e.charCode == 160 || e.ctrlKey && e.charCode == 32) {
				$('.right-menu:first').click();
				$('.top-search').find('input:first').val('').focus();
				return false;
			}
		});

		var $menu = $('<ul id="flasher-menu"></ul>');

		var $menuToggle = $('<li class="l1"><a href="#">Flasher</a></li>').click(function (event) {
			if (!$(event.target).closest('#flasher-menu').length) {
				if (!$(this).is('.active')) {
					$(this).addClass('active');
					$menu.empty();
					$.each(Flasher.currentSettings, function (key, value) {
						var $li = $('<li data-key="' + key + '"><label>' + (this.label || key) + '</label>' + (this.html || '') + '</li>').data('meta', value).appendTo($menu).find(':input').val(this.value).bind('change blur', function (event) {
							var meta = $(this).closest('li').data('meta');
						}).end();

						if ($li.find(':input').is(':checkbox')) {
							if (this.value) {
								$li.find(':input').attr('checked', 'checked');
							}
							else {
								$li.find(':input').removeAttr('checked');
							}
						}
					});
					$('<li><input id="flasher-menu-save-reload" value="Spara ändringar och ladda om" type="button"><input id="flasher-menu-save" value="Spara ändringar" type="button"><input value="Stäng" id="flasher-menu-close" type="button"></li>').appendTo($menu);

					$('#flasher-favorite-selector').bind('focus', function (event) {
						if (!$('#flasher-favorite-selecter').length) {
							$.ajax({
								url: 'https://www.flashback.org/a-o',
								success: function (html) {
									var $dom = $(html);

									$list = $dom.find('#forumlist').removeAttr('id').attr('id', 'flasher-favorite-selecter').appendTo('body').find('a').click(function (event) {
										var $sel = $('#flasher-favorite-selector');
										var newText = $(this).text() + '_' + $(this).attr('href').replace(/\//, '');
										if ($sel.val()) {
											$sel.val($sel.val() + '#' + newText);
										}
										else {
											$sel.val(newText);
										}

										if (Flasher.removeSelectorTimeout) {
											clearTimeout(Flasher.removeSelectorTimeout);
										}

										return false;
									}).end().find('tbody').prepend('<tr><td colspan="3" id="select-title">Klicka på kategori för att lägga till, spara ändringar för att spara favorit-ändringar.</td></tr>');
									$('#flasher-favorite-selecter').css('left', ($('#flasher-menu').width() + 10) + 'px');
								},
								error: function () {
									if (callback) {
										callback('error');
									}
								}
							});
						}

					}).bind('blur', function (event) {
						Flasher.removeSelectorTimeout = setTimeout(function () {
							$('#flasher-favorite-selecter').remove();
						}, 200);
					});

					$menu.show().css('top', $('#top-menu').height() + 6);
				}
				else {
					$(this).removeClass('active');
					$menu.hide();
				}
				return false;
			}
		}).css('position', 'relative').append($menu);

		$('#flasher-menu-save-reload').live('click', function (event) {
			$('#flasher-menu-save').click();
			setTimeout(function () {
				window.location = window.location;
			}, 100);
		});

		$('#flasher-menu-save').live('click', function (event) {
			$('#flasher-favorite-selector').blur();

			$('[data-key]').each(function (index) {
				var key = $(this).attr('data-key');

				var val;
				if ($(this).find(':input').is(':checkbox')) {
					val = $(this).find(':input').is(':checked');
				}
				else {
					val = $(this).find(':input').val();
				}
				localStorage.setItem(key, val);
			});

			Flasher.setupSettings();
			$menuToggle.click();
			return false;
		});

		$('#flasher-menu-close').live('click', function (event) {
			$menuToggle.click();
			return false;
		});

		$('.top-menu-main').prepend($menuToggle);
	};
	Flasher.setupStatus = function () {
		Flasher.status = {
			isTopic: !! window.location.href.match(/.(org|info)\/(t|s|p)/)
		};
	};
	Flasher.fixLayout = function () {
		$('<style>.flasher-gallery{cursor: pointer; position: fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.7); overflow: auto;}.flasher-gallery img{max-width: 100% !important; max-height: 100% !important; border: 10px solid #fff;display:block;margin:45px auto 0}.openAll{float: left;}.find-images-button{font-size: 9px; margin: 0 0 0 5px;} .l1 a {font-size: 80% !important;};#dummySiteContainer{position: absolute;top:0;left: -3000px;}#extra-controls{padding: 10px 0;}#flasher-favorite-selector{font-size:9px; height:100px; width:153px;}#select-title{font-weight: bold;font-size: 15px;padding: 10px;} .flasher-toggle { font-weight: bold; font-size: 9px; cursor: pointer; } .flasher-toggle:hover { color: #333; } .flasher-broken-link { font-weight: bold; color: red !important; } #flasher-menu { display: none; position: fixed; top: 26px; left: 5px; background: #fff; border: 3px solid #ccc; border-top: 0; padding: 5px; } #flasher-menu li { text-align: left; border-bottom: 1px solid #ddd; padding: 5px 10px; } #flasher-menu label { vertical-align: top;display: inline-block; width: 150px; font-weight: bold; } #flasher-menu-save { margin: 0 3px 0 0; }#flasher-favorites{position: fixed;bottom:0;left:0;right:0;background:#fff;border-top: 3px solid #000;}#flasher-favorites a{float: left; border-right:1px solid #CCCCCC; color:#676767; cursor:pointer; font-size:1em; font-weight:normal; letter-spacing:0.1em; line-height:1.8em; padding:0.5em 0.8em; text-decoration:none; text-transform:uppercase;}#flasher-favorites a:hover{color:#fff;background:#000;}body{padding: 0 0 30px !important;}#flasher-favorite-selecter{background:none repeat scroll 0 0 #FFFFFF; border:3px solid #000000; bottom:0; left:360px; overflow:scroll; position:absolute; right:10px; top:85px;width: auto !important;}body #flasher-favorite-selecter *{width: auto !important;}</style>').appendTo('head');

		if (!Flasher.currentSettings.changeLayout.value) {
			return false;
		}

		$('<style>.right-menu{float: right; cursor: pointer;};.signature{display: none;} ul#top-tabs { position: fixed; top: 26px; left: 0;}#site-container { padding: 0 !important; } #site {width: auto !important; } .flasher-image { max-width: 1000px; display: block; min-height: 100px; min-width: 100px; background: #fff; } .top-search { padding:0 5px; position:absolute; right:0; top:26px; display: none; } .top-search * { font-size: 10px; } .top-search .clear { display: none; } #top-menu ul.top-menu-main { text-align: left; } .fb_adsys_wrapper_TextAds { display: none !important; } #footer { display: none; } .post-left { width: 105px !important; } td.thead { font-size: 9px; white-space: nowrap; } #site-main { padding: 0 0px 0 10px !important; }</style>').appendTo('head');

		var $search = $('.box-right:first').appendTo('#top-menu').addClass('top-search');
		$search.find('thead').remove();

		$toggle = $('<div class="flasher-toggle">Visa/Göm alternativ</div>').click(function (event) {
			$search.find('.clear').toggle();
			return false;
		});

		if ($.trim($search.find('.clear:eq(1)').text())) {
			$search.find('.clear:eq(1)').before($toggle);
		}
		if ($('.top-search').length) {
			var showString = 'Visa sök';
			var hideString = 'Göm sök';

			if (window.location.pathname.match(/subscription/)) {
				showString = 'Visa sidpanel';
				hideString = 'Göm sidpanel';
			}

			var $searchToggle = $('<li class="l0 right-menu"><a href="#">' + showString + '</a></li>').toggle(function () {
				$(this).find('a').text(hideString);
				$('.top-search').show().css('top', $('#top-menu').height() + 6);
				return false;
			}, function () {
				$(this).find('a').text(showString);
				$('.top-search').hide();
				return false;
			}).appendTo('.top-menu-main');
		}

		$('#top, #top-banner, #site-right').remove();

		$('ul#top-tabs').css('top', $('#top-menu').height() + 6);
		$('#site').css('padding-top', $('#top-menu').height() + $('#top-tabs').height());
	};
	Flasher.setupCacheVars = function () {
		Flasher.vars = {
			container: $('#site-left')
		};
	};
	Flasher.setupCacheCollections = function () {
		Flasher.collection = {
			a: $('.post, .panel').find('a[href*="http"]')
		};
	};
	Flasher.fixLeaveLinks = function () {
		Flasher.collection.a.filter('a[href*="leave.php"]').each(function (index) {
			try {
					var newHref = $(this).attr('href').replace(/.*leave.php?\?u=/, '');
					$(this).attr('href', decodeURIComponent(newHref.replace(/\+/g, " ")));
			} catch(e) {}
		});
	};
	Flasher.setupVideoLinks = function () {
		if (Flasher.currentSettings.showVideos.value) {
			Flasher.collection.a.filter(':not(".fixedVideo")').each(function (index) {
				var $this = $(this);
				if (!$this.closest('.post-quote, .signature').length) {
					var href = $this.attr('href');

					if (href && href.match(/youtube.com/)) {
						var youtubeId = href.match(/v=([^&]*)/);

						if (youtubeId && youtubeId[1]) {
							var youtubeHtml = '<object width="560" height="340"><param name="movie" value="http://www.youtube.com/v/##id##&hl=en_US&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/##id##&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="560" height="340"></embed></object><br>';
							$this.before(youtubeHtml.replace(/##id##/ig, youtubeId[1]));
						}
						$this.addClass('fixedVideo');
					}
				}
			});
		}
	};
	Flasher.setupShortenQuotes = function () {
		if (Flasher.currentSettings.shortenQuotes.value) {
			$('.post-quote:not(.fixed)').each(function () {
				var $quoteContainer = $(this).find('div:eq(1)');
				if ($quoteContainer.text().length > 250) {
					$quoteContainer.data('originText', $quoteContainer.html());

					var $toggleButton = $('<input type="button" value="Visa citat-texten">').toggle(function () {
						$(this).attr('value', 'Visa citat-texten');
						$quoteContainer.html($quoteContainer.html().substr(0, 250) + '...');
					}, function () {
						$(this).attr('value', 'Göm delar av citat-texten');
						$quoteContainer.html($quoteContainer.data('originText'));
					}).click().css('float', 'right');

					$(this).find('div:eq(0)').prepend($toggleButton);
				}
			}).addClass('fixed');
		}
	};
	Flasher.addImage = function (a, element, url) {
		var $toggleImage = null;
		var $imageLink = $('<a target="_blank" class="customMatch"/>').attr('href', url).append(element.attr('src', url));
		if (Flasher.currentSettings.showPicturesButtons.value) {
			if (Flasher.currentSettings.showPictures.value) {
				$toggleImage = $('<input type="button" value="Göm bild" class="find-images-button">').toggle(function () {
					$(this).val('Visa bild');
					element.hide();
				}, function () {
					$(this).val('Göm bild');
					element.css('display', 'block');
				});
			} else {
				$toggleImage = $('<input type="button" value="Visa bild" class="find-images-button">').toggle(function () {
					$(this).val('Göm bild');
					element.css('display', 'block');
				}, function () {
					$(this).val('Visa bild');
					element.hide();
				});
			}

			var $openAllContainer = $(a).closest('tbody').find('.alignr:first');
			if (!$openAllContainer.find('.openAll').length) {
				var $toggleAll = $('<input type="button" value="Toggla bilder" class="find-images-button openAll"/>').click(function (event) {
					var $buttons = $(this).closest('table').find('.find-images-button').filter(':not(.openAll)');
					var $container = $buttons.filter(':first').closest('div');

					$('#' + $container.attr('id') + ' .find-images-button:not(.openAll)').click();

					return false;
				});
				$openAllContainer.prepend($toggleAll);
			}
		}

		$(a).before($imageLink);

		if (!Flasher.currentSettings.showPictures.value) {
			element.hide();
		} else {
			$imageLink.find('img').hide().load(function() {
				$(this).show();
			});
		}

		if (Flasher.currentSettings.showPicturesButtons.value) {
			$imageLink.before($toggleImage);
		}
	};
	Flasher.getImages = function (selector, page, $a, args) {
		var options = $.extend({}, {}, args);

		var $images = $(page).find(selector);
		var originUrl = $a.attr('href');
		if ($images.length) {
			if (options.deeper) {
				$images.each(function (index) {
					Flasher.getPage($(this).parent().attr('href'), function (page) {
						Flasher.getImages(options.deeper, page, $a);
					});
				});
			} else {
				$images.each(function (index) {
					var newUrl = $(this).attr('src');

					if (!newUrl.match(originUrl.substr(0, 4))) {
						newUrl = originUrl.match(/http:\/\/[^\/]*/) + newUrl;

					}
					Flasher.addImage($a, Flasher.templates.image.clone(), newUrl);
				});
			}
		}
		else {
			$a.addClass('flasher-broken-link');
		}
	};
	Flasher.setupImageLinks = function () {
		var siteFixes = {
			'bdb': {
				url: new RegExp('(?!.*jpe?g$)(?!.*png$)bilddagboken.se', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#picture', page, $a);
					});
				}
			},
			'quikk': {
				url: new RegExp('quikk.se', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.addImage($a, Flasher.templates.image.clone(), url);
				}
			},
			'bayimg': {
				url: new RegExp('(?!.*jpe?g$)(?!.*png$).bayimg.com', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#mainImage', page, $a);
					});
				}
			},
			'pixbox': {
				url: new RegExp('(?!.*jpe?g$)(?!.*png$)pixbox.se', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#thePicture', page, $a);
					});
				}
			},
			'imagebam': {
				url: new RegExp('imagebam.com', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#the_image', page, $a);
						Flasher.getImages('img[src*="thumbnails"]', page, $a, {
							deeper: '#the_image'
						});
					});
				}
			},
			'mypicx': {
				url: new RegExp('mypicx.com', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('img[src*="thumb"]', page, $a);
					});
				}
			},
			'imagevenue': {
				url: new RegExp('imagevenue.com', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#thepic', page, $a);
					});
				}
			},
			'echo.cx': {
				url: new RegExp('echo.cx', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#main_image', page, $a);
					});
				}
			},
			'tinypic': {
				url: new RegExp('tinypic.com/view', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#imgElement', page, $a);
					});
				}
			},
			'piclair': {
				url: new RegExp('piclair.com/', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#resizeimg', page, $a);
					});
				}
			},
			'dumparump': {
				url: new RegExp('dumparump.com/view', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('img[alt*="osted"]:first', page, $a);
					});
				}
			},
			'pict': {
				url: new RegExp('pict.com/view', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#fotocontext img', page, $a);
					});
				}
			},
			'blocket': {
				url: new RegExp('blocket.se', 'ig'),
				extractUrl: function (url, $a) {
					$a.attr('href', url.replace(/&amp;/g, '&'));
				}
			},
			'imageshack': {
				url: new RegExp('imageshack.us/(my|i/)', 'ig'),
				extractUrl: function (url, $a) {
					Flasher.getPage(url, function (page) {
						Flasher.getImages('#main_image, .thumb-img img', page, $a);
					});
				}
			}
		};
		Flasher.collection.a.filter(':not(".customMatch")').each(function (index) {
			var $a = $(this);
			var linkText = $a.text();
			var href = $a.attr('href');

			$.each(siteFixes, function (key, value) {
				if (href.match(this.url)) {
					if (!$a.closest('.post-quote, .signature').length) {
						var newHref = this.extractUrl(href, $a);
					}
					else {
						if (href.match(/blocket/)) {
							this.extractUrl(href, $a);
						}
					}
					$a.addClass('customMatch');
				}
			});

			if (Flasher.currentSettings.showExpandedUrl.value) {
				if (linkText.match(/^http.*\.\.\./)) {
					$(this).text(href);
				}
			}
		});
		Flasher.collection.a.filter(':not(".fixedImageWide, .customMatch")').each(function (index) {
			var href = $(this).attr('href');

			if (!$(this).closest('.post-quote, .signature').length) {
				if (href.match(/(jpe?g|png|gif|bmp)/ig)) {
					if (!$('img[src="' + href + '"]').length) {
						Flasher.addImage(this, Flasher.templates.image.clone(), href);
						$(this).addClass('fixedImage');
					}
				}
			}

		}).addClass('fixedImageWide');

		if (Flasher.currentSettings.showMagicImageFetch.value) {
			Flasher.collection.a.filter(':not(".fixedImage, .fixedWildCard, .fixedVideo, .customMatch")').each(function (index) {
				var $this = $(this);
				if (!$this.closest('.post-quote, .signature').length) {
					var $toggleImage = $('<input type="button" value="Försök hämta bild" class="find-images-button">').click(function () {
						$toggleImage.val('Försöker ');
						var loadCount = 0;
						var loading = setInterval(function () {
							loadCount++;
							if (loadCount > 30) {
								clearTimeout(loading);
							}
							$toggleImage.val($toggleImage.val() + '.');
						}, 100);
						var $dummySite = $('<div class="dummySiteContainer" />').appendTo('body');
						Flasher.getPage($this.attr('href'), function (html) {
							$dummySite.html(html);
							var largestImage = null;
							var previousArea = 0;
							$dummySite.find('img').each(function (index) {
								var thisArea = $(this).width() * $(this).height();

								if (!largestImage || thisArea > previousArea) {
									largestImage = this;
								}
								previousArea = thisArea;
							});
							var $image = $(largestImage).removeAttr('class').removeAttr('id').css({
								'max-width': Flasher.currentSettings.maxImageWidth.value + 'px',
								'max-height': Flasher.currentSettings.maxImageHeight.value + 'px'
							}).addClass('flasher-image');

							var newUrl = $image.attr('src');

							if (!newUrl.match($this.attr('href').substr(0, 4))) {
								newUrl = $this.attr('href').match(/http:\/\/[^\/]*/) + newUrl;
								$image.attr('src', newUrl);
							}

							$this.before($image);
							$toggleImage.remove();
							$dummySite.remove();
							clearTimeout(loading);
						});
						return false;
					});

					$(this).after($toggleImage);
				}
			}).addClass('fixedWildCard');
		}
	};
	Flasher.getPage = function (href, callback) {
		gmAjax({
			method: 'GET',
			url: href,
			onload: function (results) {
				if (callback) {
					callback(results.responseText.replace(/script/gi, 'scrupt').replace(/link/gi, 'lunk').replace(/onload/gi, 'onno'));
				}
			},
			onerror: function () {
				if (callback) {
					callback('error');
				}
			}
		});
	};
	Flasher.init();
};