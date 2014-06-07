// ==UserScript==
// @name			Envatitor Embedded
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Envatitor for the Envato Forums
// @date			2012-08-22
// @version			0.8
// @include			http://activeden.net/forums/*
// @include			http://audiojungle.net/forums/*
// @include			http://themeforest.net/forums/*
// @include			http://videohive.net/forums/*
// @include			http://graphicriver.net/forums/*
// @include			http://3docean.net/forums/*
// @include			http://codecanyon.net/forums/*
// @include			http://marketplace.tutsplus.com/forums/*
// @include			http://photodune.net/forums/*

// @include			http://activeden.net/upload/*
// @include			http://audiojungle.net/upload/*
// @include			http://themeforest.net/upload/*
// @include			http://videohive.net/upload/*
// @include			http://graphicriver.net/upload/*
// @include			http://3docean.net/upload/*
// @include			http://codecanyon.net/upload/*
// @include			http://marketplace.tutsplus.com/upload/*
// @include			http://photodune.net/upload/*

// @include			http://activeden.net/item/*/edit/*
// @include			http://audiojungle.net/item/*/edit/*
// @include			http://themeforest.net/item/*/edit/*
// @include			http://videohive.net/item/*/edit/*
// @include			http://graphicriver.net/item/*/edit/*
// @include			http://3docean.net/item/*/edit/*
// @include			http://codecanyon.net/item/*/edit/*
// @include			http://marketplace.tutsplus.com/item/*/edit/*
// @include			http://photodune.net/item/*/edit/*

// @include			http://activeden.net/item/*/discussion/*
// @include			http://audiojungle.net/item/*/discussion/*
// @include			http://themeforest.net/item/*/discussion/*
// @include			http://videohive.net/item/*/discussion/*
// @include			http://graphicriver.net/item/*/discussion/*
// @include			http://3docean.net/item/*/discussion/*
// @include			http://codecanyon.net/item/*/discussion/*
// @include			http://marketplace.tutsplus.com/item/*/discussion/*
// @include			http://photodune.net/item/*/discussion/*

// @include			http://activeden.net/author_dashboard*
// @include			http://audiojungle.net/author_dashboard*
// @include			http://themeforest.net/author_dashboard*
// @include			http://videohive.net/author_dashboard*
// @include			http://graphicriver.net/author_dashboard*
// @include			http://3docean.net/author_dashboard*
// @include			http://codecanyon.net/author_dashboard*
// @include			http://marketplace.tutsplus.com/author_dashboard*
// @include			http://photodune.net/author_dashboard*

// ==/UserScript==
(function () {

    function envatitor_embedded() {

	var textarea, image_url = 'http://icons.revaxarts.com/fam/',
		username = $('#user_username').text(),
		$preview, interval, livepreview = (getCookie('envatitor_embeded_livepreview') == 'false') ? false : true,
		smileys = {
			'happy': ':)',
			'sad': ':(',
			'tongue': ':P',
			'wink': ';)',
			'angry': ':x',
			'expressionless': ':|',
			'laugh': ':D',
			'puzzled': ':S',
			'cool': '8-)',
			'surprised': ':O',
			'asleep': ':asleep:',
			'bashful': ':bashful:',
			'bashfulcute': ':bashfulcute:',
			'bigevilgrin': ':bigevilgrin:',
			'bigsmile': ':bigsmile:',
			'bigwink': ':bigwink:',
			'chuckle': ':chuckle:',
			'crying': ':crying:',
			'confused': ':confused:',
			'confusedsad': ':confusedsad:',
			'dead': ':dead:',
			'delicious': ':delicious:',
			'depressed': ':depressed:',
			'evil': ':evil:',
			'evilgrin': ':evilgrin:',
			'grin': ':grin:',
			'impatient': ':impatient:',
			'inlove': ':inlove:',
			'kiss': ':kiss:',
			'mad': ':mad:',
			'nerdy': ':nerdy:',
			'notfunny': ':notfunny:',
			'ohrly': ':ohrly:',
			'reallyevil': ':reallyevil:',
			'sarcasm': ':sarcasm:',
			'shocked': ':shocked:',
			'sick': ':sick:',
			'silly': ':silly:',
			'sing': ':sing:',
			'smitten': ':smitten:',
			'smug': ':smug:',
			'stress': ':stress:',
			'sunglasses': ':sunglasses:',
			'sunglasses2': ':sunglasses2:',
			'superbashfulcute': ':superbashfulcute:',
			'tired': ':tired:',
			'whistle': ':whistle:',
			'winktongue': ':winktongue:',
			'yawn': ':yawn:',
			'zipped': ':zipped:'
		},
		type;

	$('.fancy-comment').bind('click', function () {
		setTimeout(function () {
			init();
		}, 800);
	});

	init();


	function init() {
		type = getType();
		if (type) {
			switch (type) {
			case 'newThread':
				textarea = $('#thread_message_content');
				break;
			case 'postReply':
				textarea = $('textarea[name=content]');
				break;
			case 'comment':
				textarea = $('textarea#reply_text');
				break;
			case 'item':
				textarea = $('textarea#description');
				break;
			case 'itemcomment':
				textarea = $('textarea#item_comment_content');
				break;
			default:
				return false;
			}

			UI();
			preview();

			$('#envatitor_embeded_bar').delegate('a', 'click', function () {
				var button_id = $(this).attr("id").substr(18);
				var start = '<' + button_id + '>';
				var end = '</' + button_id + '>';
				var replaceArray = new Array();

				var param = "";
				if (button_id == 'img') {
					param = prompt("Enter image URL", "http://");
					if (param) {
						start = '<img src="' + param + '" />';
						end = '';
					} else {
						return false;
					}
				} else if (button_id == 'a') {
					param = prompt("Enter URL", "http://");
					if (param) {
						start = '<a href="' + param + '">';
					} else {
						return false;
					}
				} else if (button_id == 'smiley') {
					$('#envatitor_embeded_smileys').slideToggle(200);
					return false;
				}
				insert(start, end, replaceArray);
				return false;
			});

			$('#envatitor_embeded_smileys').delegate('img', 'click', function () {
				var code = $(this).attr('alt');
				insert(code, '', []);
				$('#envatitor_embeded_smileys').slideUp(200);
				updatePreview();
			});

			$('#envatitor_embeded_livepreview').bind('click', function () {
				livepreview = !livepreview;
				$(this).html('livepreview is ' + (livepreview ? 'ON' : 'OFF'));
				setCookie('envatitor_embeded_livepreview', livepreview);
				updatePreview();
				return false;
			});

			textarea.bind({
				focus: function () {
					$('#envatitor_embeded_smileys').slideUp(200);
					$(document).bind('keyup', updatePreview);
				},
				blur: function () {
					$(document).unbind('keyup', updatePreview);
				},
				keydown: function (e) {
					if (e.which == 13 && e.shiftKey) {
						insert('', '<br />\n', []);
						return false;
					}
				}
			}).focus();


			if (type == 'newThread') {
				$('#thread_subject').bind('keyup', function () {
					var val = $(this).val();
					if (val != '') {
						$('h1').first().text($(this).val());
					} else {
						$('h1').first().text('Start new thread');
					}
				}).trigger('keyup');
			}

			updatePreview();

		}
	}

	function insert(start, end, replaceArray) {
		element = textarea[0];
		if (document.selection) {
			element.focus();
			sel = document.selection.createRange();
			newT = sel.text;
			if (start == '<ul>' || start == '<ol>') {
				newT = $.trim(newT);
				start = start + '\n<li>';
				newT = newT.replace(/\n|\c/g, '</li>\n<li>');
				end = '</li>\n' + end;
			}
			sel.text = start + newT + end;
		} else if (element.selectionStart || element.selectionStart == '0') {
			element.focus();
			var startPos = element.selectionStart;
			var endPos = element.selectionEnd;
			newT = element.value.substring(startPos, endPos);
			if (start == '<ul>' || start == '<ol>') {
				newT = $.trim(newT);
				start = start + '\n<li>';
				newT = newT.replace(/\r/g, '').replace(/\n|\c/g, '</li>\n<li>');
				end = '</li>\n' + end;
			}
			element.value = element.value.substring(0, startPos) + start + newT + end + element.value.substring(endPos, element.value.length);
		} else {
			element.value += start + end;
		}
		updatePreview();
	}

	function UI() {
		var html = '<div id="envatitor_embeded_bar" style="position:relative">';
		html += '<a href="#" id="envatitor_embeded_h3" title="Heading 3" style="margin-right:5px;"><img src="' + image_url + 'text_heading_3.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_h4" title="Heading 4" style="margin-right:5px;"><img src="' + image_url + 'text_heading_4.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_h5" title="Heading 5" style="margin-right:5px;"><img src="' + image_url + 'text_heading_5.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_strong" title="Bold" style="margin-right:5px;"><img src="' + image_url + 'text_bold.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_em" title="Italic" style="margin-right:5px;"><img src="' + image_url + 'text_italic.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_del" title="Strike" style="margin-right:5px;"><img src="' + image_url + 'text_strikethrough.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_ins" title="Underline" style="margin-right:5px;"><img src="' + image_url + 'text_underline.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_code" title="Codeline (<code>)" style="margin-right:5px;"><img src="' + image_url + 'tag.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_pre" title="Codeblock (<pre>)" style="margin-right:5px;"><img src="' + image_url + 'script.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_ol" title="Ordered List" style="margin-right:5px;"><img src="' + image_url + 'text_list_numbers.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_ul" title="Unordered List" style="margin-right:5px;"><img src="' + image_url + 'text_list_bullets.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_a" title="Insert Link" style="margin-right:5px;"><img src="' + image_url + 'link.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_blockquote" title="Quotation" style="margin-right:5px;"><img src="' + image_url + 'comment.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_img" title="Insert Image" style="margin-right:5px;"><img src="' + image_url + 'image.png" style="padding:0;" /></a>';
		html += '<a href="#" id="envatitor_embeded_smiley" title="Insert Smiley" style="margin-right:5px;"><img src="' + image_url + 'emoticon_smile.png" style="padding:0;" /></a>';
		html += '<ul id="envatitor_embeded_smileys" style="border:1px solid #BBBBBB;width:180px;display:none;overflow:hidden;position:absolute;left:260px;background-color:#f4f4f4;-webkit-border-bottom-right-radius: 5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-bottomright: 5px;-moz-border-radius-bottomleft: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;">';
		$.each(smileys, function (i, k) {
			html += '<li style="float:left;padding:2px;cursor:pointer;list-style:none;"><img title="' + i + '" src="/images/smileys/' + i + '.png" alt="' + k + '" style="padding:0;"/></li>';
		});
		html += '</ul>';
		html += '</div>';
		textarea.wrap('<div id="envatitor_embeded_bar_wrap"></div>');
		$("#envatitor_embeded_bar_wrap").prepend(html);

	}

	function preview() {
		var thumb = getCookie('envatitor_embeded_thumb') || 'http://0.envato-static.com/images/common/icons-buttons/default-user.jpg';
		var badges = getCookie('envatitor_embeded_badges');

		var html = '<div class="post"><div class="poster"><div class="poster-info"><div class="poster-info-wrapper"><a title="' + username + '" class="thumbnail" id="envatitor_embeded_thumb" href="/user/' + username + '">';
		html += '<img width="80" height="80" src="' + thumb + '" class="" alt="' + username + '"></a>';
		html += '<div class="meta-info"><div class="meta-container"></div></div><div class="arrow sprite"><!-- --></div></div></div>';
		html += '<ul class="badges" id="envatitor_embeded_badges">' + badgesHTML(badges) + '</ul></div>';
		html += '<div class="content-box" style="width:624px;"><div class="post-content"><div class="post-header"><strong class="poster-name"><a href="/user/' + username + '">' + username + '</a></strong><small>says</small></div>';
		var preview = '<div class="post-body" id="envatitor_embeded_preview"></div>';
		var ahtml = '<div class="post-tools"><small><a id="envatitor_embeded_livepreview" href="#">livepreview is ' + (livepreview ? 'ON' : 'OFF') + '</a> | <a href="http://userscripts.org/scripts/show/111044">The Envatitor Embedded</a></small></div></div></div></div></div>';
		switch (type) {
		case 'newThread':
			$('.content-box').eq(0).before(html + preview + ahtml);
			break;
		case 'postReply':
			$('.forums').eq(0).append(html + preview + ahtml);
			break;
		case 'comment':
			return false;
			break;
		case 'itemcomment':
			return false;
			break;
		case 'item':
			html = '<a href="#attribute_fields">Down</a><div class="item-description" style="width:620px;position:relative;left:-110px;background-color:#D2D1D0;overflow:hidden;padding:5px;height:auto;-moz-box-shadow:inset 0 0 6px rgba(3,3,3,0.6);-webkit-box-shadow:inset 0 0 6px rgba(3,3,3,0.6);box-shadow:inset 0 0 6px rgba(3,3,3,0.6);"><div class="text" id="envatitor_embeded_preview"></div></div><a id="envatitor_embeded_to_top">Back to top</a>';
			var wrap = $('#envatitor_embeded_bar_wrap');
			wrap.css({
				'top': '200px',
				'zIndex': 2000,
				'right': '20px',
				'background-color': '#F4F4F4',
				'padding': '5px'
			}).after(html + preview + ahtml);


			var pos = wrap.offset().top;
			$('#envatitor_embeded_to_top').click(function () {
				$('body, html').animate({
					'scrollTop': pos
				});
			});
			$(document).bind('scroll', function () {
				var offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (offset > pos && offset < pos + $preview.height()) {
					wrap.css({
						'position': 'fixed'
					})
					$preview.parent().css('margin-top', '200px');
				} else {
					wrap.css({
						'position': 'static'
					})
					$preview.parent().css('margin-top', '2px');
				}
			});
			break;
		default:
			return false;
		}
		$preview = $('#envatitor_embeded_preview');
		if (!getCookie('envatitor_embeded_thumb')) {
			$('#envatitor_embeded_thumb').load('/user/' + username + '/profile .avatar img:first', function (data) {
				thumb = $('#envatitor_embeded_thumb').find('img').attr('src');
				setCookie('envatitor_embeded_thumb', thumb, 7);
				$('#envatitor_embeded_thumb').find('img').attr('src', thumb);
			});
		}

		if (!getCookie('envatitor_embeded_badges')) {
			$('#envatitor_embeded_badges').load('/user/' + username + '/profile .badges:first', function (data) {
				badges = [];
				$('#envatitor_embeded_badges').find('li').each(function () {
					badges.push($(this).attr('class'));
				});
				setCookie('envatitor_embeded_badges', badges.join('|'), 7);
			});
		}
	}

	function badgesHTML(badges) {
		if (!badges) return '';
		html = '';
		badges = badges.split('|');
		$.each(badges, function (i, e) {
			html += '<li class="' + e + '">' + e + '</li>';
		});
		html += '';
		return html;
	}

	function updatePreview() {
		clearInterval(interval);
		if (!livepreview) return;
		interval = setTimeout(function () {
			var output = textarea.val();
			$.each(smileys, function (i, k) {
				var regex = new RegExp(k.replace('(', '\\(').replace(')', '\\)').replace('|', '\\|'), 'g');
				output = output.replace(regex, '<img src="/images/smileys/' + i + '.png">');
			});
			output = "\n" + output + "\n";
			output = output.replace(/([^\n])\n([^\n])/g, '$1&#10687;$2');
			output = output.replace(/\n\n/g, '\n\n\n');
			output = output.replace(/\n(.*)\n\n/g, '<p>$1</p>');
			output = output.replace(/(\W)\*(.*)\*(\W)/g, '$1<strong>$2</strong>$3');
			output = output.replace(/<blockquote>\|\|\+([0-9]+)\|([a-zA-Z0-9_]+) said-\|\|/g, '<blockquote><a class="byline" href="/forums/message/go_to/$1">$2 said</a><br/>');
			output = output.replace(/(\W)_(.*)_(\W)/g, '$1<em>$2</em>$3');
			output = output.replace(/(\W)-(.*)-(\W)/g, '$1<del>$2</del>$3');
			output = output.replace(/\n<\/pre>/g, '&#10687;&#10687;</pre>');
			output = output.replace(/&#10687;/g, '\n');
			$preview.html(output);
		}, 200);
	}

	function getType() {
		if ($('#thread_message_content').length) {
			return 'newThread';
		} else if ($('#thread_reply_content').length) {
			return 'postReply';
		} else if ($('textarea#reply_text').length) {
			return 'comment';
		} else if ($('textarea#item_comment_content').length) {
			return 'itemcomment';
		} else if ($('textarea#description').length) {
			return 'item';
		}
		return false;
	}

	function setCookie(cookieName, value, daysToExpire, path, domain, secure) {
		var expiryDate;

		if (daysToExpire) {
			expiryDate = new Date();
			expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 8.64e7));
		}

		document.cookie = cookieName + '=' + (value.toString()) + (daysToExpire ? ';expires=' + expiryDate.toGMTString() : '') + ';path=' + (path ? path : '/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
		return getCookie(cookieName);
	};

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
    inject.appendChild(document.createTextNode("(" + envatitor_embedded + ")()"));

    (document.head || document.documentElement).appendChild(inject);

})();