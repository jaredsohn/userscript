// ==UserScript==
// @name			Dayviews.com - HBFS Edition
// @namespace		http://dayviews.com/denocle/
// @version			0.2.5.4
// @description		Dayviews.com, but better
// @copyright		Denocle 2014 Copyleft - Steal this code, please
// @icon			http://i.imgur.com/OmI6KUN.png
// @include			/^https?:\/\/.*dayviews\.com\/.*$/
// @grant			GM_addStyle
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_xmlhttpRequest
// @grant			GM_log
// @require			http://code.jquery.com/jquery-latest.min.js
// @downloadURL		https://userscripts.org/scripts/source/166622.user.js
// ==/UserScript==

(function() {


	//===================================
	//			Settings
	//===================================

	// window.addEventListener("hashchange", 		fireOnNewPage,	false);

	// waitForKeyElements('#showContentTextHtml',			fireOnNewPage);
	// waitForKeyElements('#picture',						fireOnNewPage);
	// waitForKeyElements('#imageComments',				fireOnNewPage);
	// waitForKeyElements('.commentContent',				fireOnNewPage);
	// waitForKeyElements('#showContentTextHtml',			fireOnNewPage);
	// waitForKeyElements('.commentHolder',				fireOnNewPage);
	// waitForKeyElements('#userstatus_right',				fireOnNewPage);
	// waitForKeyElements('#right',						fireOnNewPage);
	// waitForKeyElements('#frontpageRecommended',			fireOnNewPage);
	// waitForKeyElements('#fsImageText',					fireOnNewPage);
	// waitForKeyElements('#fsImage',						fireOnNewPage);
	// waitForKeyElements('#image_chooser_content_inner',	fireOnNewPage);
	// waitForKeyElements('.usr',							fireOnNewPage);
	// waitForKeyElements('#showContentTitle',				fireOnNewPage);
	// waitForKeyElements('#uploadMultiDiv',				fireOnNewPage);
	// waitForKeyElements('#top',							fireOnNewPage);
	waitForKeyElements('#showContentImage',					removeFrontpageImagePopup);

	// $(document).on('click', function() {
	// 	fireOnNewPage();
	// });


	if (GM_getValue('sendStatsPrompt', true)) {
		waitForKeyElements('#holder', sendStatsPrompt);
	}

	if (GM_getValue('sendStats', false)) {
		waitForKeyElements('#holder', sendStats);
	}

	if (GM_getValue('fixBrokenImages', true)) {
		waitForKeyElements('.openImage', fixBrokenImages);
	}

	if (GM_getValue('enableCustomFavicon') == true) {
		waitForKeyElements('link', switchFavicon);
	}

	//===================================
	//			Executions
	//===================================

	function fireOnNewPage() {

		//===================================
		//			Mandatory functions
		//===================================

		// Remove ads
		removeAd();

		// Add the script config menu
		addScriptMenu();

		// For setting a custom profile image
		customProfileImage();

		//===================================
		//			Optional functions
		//===================================

		// Get direct link from copy protected images
		if (GM_getValue('addImageButton', true)) {
			addDirectLinkButton();
		}

		// Remove copy protection
		if (GM_getValue('removeCopyProtection', true)) {
			removeCopyProtection();
		}

		// Remove prompt on outgoing links
		if (GM_getValue('removeOutgoingUrlPrompt', true)) {
			removeOutgoingUrlPromtp();
		}

		// Load images in comments on load
		if (GM_getValue('mediaInComments', true)) {
			loadImagesInComments();
		}

		// Add minifier to comments
		if (GM_getValue('addCommentMinifier', true)) {
			addCommentMinifier();
		}

		// Fix title to show ÅÄÖ
		if (GM_getValue('fixTitle', true)) {
			fixTitle();
		}

		// Enable HD on every user
		if (GM_getValue('enableHD', true)) {
			enableHD();
		}

		// Showing feed on frontpage
		if (GM_getValue('feedOnFront', false)) {
			getFeed();
		}

		//Switches out regular resolution images to HD version if available
		if (GM_getValue('betterImage', true)) {
			betterImage();
		}

		//Switch to better image if [hd][/hd] tags are provided in the image desription
		if (GM_getValue('hdTags', true)) {
			hdTags();
		}

		// Switches broken images to a "missing image"
		if (GM_getValue('fixBrokenImages', true)) {
			fixBrokenImages();
		}

		// Removes useless "Translate" links in image description
		if (GM_getValue('removeTranslate', true)) {
			removeTranslate();
		}

		// Switches ot the custom favicon
		if (GM_getValue('enableCustomFavicon', false)) {
			switchFavicon();
		}

		// Popup on hover for frontpage thumbnails
		if (GM_getValue('enableFrontpageImagePopup', true)) {
			frontpageImagePopup();
		}

		if (GM_getValue('widenSite', true)) {
			fixProgressWidth()
		}

	}

	// Fire on init
	fireOnNewPage();

	//===================================
	//		Element settings
	//===================================

	$(document).on('click', '#get-direct-link', function () {getDirectLink();});

	$(document).on('click', '#addCommentSubmit', function () {loadImagesInComments();});

	// Shows captions on images on the front page on hover
	$(document).on('mouseenter', '.frontpageImageDiv', function () {
		$(this).find('.cap').fadeIn('fast').css('display', 'block !important');
	});
	$(document).on('mouseleave', '.frontpageImageDiv', function () {
		$(this).find('.cap').fadeOut('fast');
	});

	if (GM_getValue('removeOutgoingUrlPrompt', true)) {
		$(document).on('mouseenter', '#showContentTextHtml, #showContentComments, .postlist_post_text', function () {removeOutgoingUrlPromtp()});
	}
	$(document).on('click', '.hide-comment', function () {hideComment($(this))});

	$(document).on('click', '#script_menu_toggle', function () {$('#script_menu').slideToggle()});
	$(document).on('click', '#script-close', function () {$('#script_menu').slideUp()});

	$(document).on('click', '#script_menu ul.tabs li', function () {
		$('#script_menu ul.tabs li').removeClass('active');
		$(this).addClass('active');
		var thing = $(this).data('tab');
		$('div.hbfs').hide(0);
		$('div.hbfs.'+thing).show(0);
		$('#script-menu-response').hide(0);
	});

	$(document).on('click', '#broken-image-default', function () {GM_deleteValue('brokenImage'); $('#fix-broken-images').val('')});
	$(document).on('click', '#hbfs-about-link', function () {hbfs_about(); $('#script_menu').slideUp('fast')});
	$(document).on('click', '#hbfs_inner .close', function () {$('#hbfs_outer').fadeOut('fast').remove()});

	$(document).on('click', '#select_profile_image_url', function () {
		var url = $('#profile_image_url').val();
		unsafeWindow.setNewImage(url);
		unsafeWindow.bdb.misc.hidePopup()
	});

	// Confirm send stats prompt
	$(document).on('click', 'button.hbfs_stats', function () {
		var val = $(this).data('stats');
		GM_setValue('sendStats', val);
		GM_setValue('sendStatsPrompt', false);
		location.reload(true);
	});

	// Script config  save
	$(document).on('click', '#script-save', function () {
		$('#script_menu input[type=checkbox]').each(function() {
			var name = $(this).attr('name'),
				value = ($(this).is(':checked')) ? true : false;

			GM_setValue(name, value);
		});

		$('#script_menu input[type=text]').each(function() {
			var name = $(this).attr('name'),
				value = $(this).val();
			if (typeof name !== 'undefined' && name !== false) {
				console.log('Saving', name);
				GM_setValue(name, value);
			}
		});


		if (GM_getValue('enableCustomTheme') == true) {
			// Elements that uses the Theme color
			$('.bdbBg, .icon img,  img.icon, .badge, button,  a.buttonStyle, ul.tabs li a.active, .userstatus_icons.active_tab span, #fancybox-wrap.fancy-bdbstyle, #fancybox-wrap.fancy-bdbstyle #fancybox-title, #autodateAll.active, .userstatus_icons .newContent div.newEvents').css('background-color', GM_getValue('themeColor'));

			// Elements that uses the Badge color
			$('.userstatus_icons .newContent div:not(.newEvents), .badge, .messageBadge, .groupItem .groupNewImages, .badge.new').css('background-color', GM_getValue('badgeColor'));
			$('.gotoUser img[style*=outline]').css('outline', 'solid 1px '+  GM_getValue('badgeColor'));
		}

		if (GM_getValue('enableNickColor') == true) {
			// Elements that will have the nick color
			$('.userLink[name='+ getUsername() +']').css('color', GM_getValue('nickColor'));
		}

		if (GM_getValue('enableCustomBackground') == true) {
			// This will be a bitch...
			var choise = $('#script_menu input[type=radio][name=customBackground]:checked').val(),
				val;

			if (choise == 'custom-image') {
				// If choise is a custom url
				val = $('#custom-background-image').val();
			} else if (choise == 'custom-color') {
				// If choise is a color
				val = $('#custom-background-color').val();
			} else {
				// Else it's a predefined image url
				val = $('#script_menu input[type=radio][name=customBackground]:checked').val();
			}

			GM_setValue('customBackground', val);

			if (val.substr(0, 1) == '#') {
				// If the custom background is set to be a color
				$('body').css('background', val);
			} else {
				// Otherwise it will be a image, doesn't matter if it is a custom url or not.
				$('body').css('background', 'url('+val+')');
			}
		}

		if (GM_getValue('enableCustomFavicon') == true) {
			var choise = $('#script_menu input[type=radio][name=customFavicon]:checked').val();
			GM_setValue('customFavicon', choise);
			switchFavicon();
		}

		$('#script-menu-response').hide(0).html('Settings saved - <a href="javascript:location.reload(true);">Reload page</a>').fadeIn();
		// unsafeWindow.bdb.ajax.reloadCurrentContent();
	});

	//===================================
	//			Functions
	//===================================

	// This function sends some stats to my server, only your username and version of the script that you are using will be sent
	// You can disable this from the script config menu
	function sendStats() {
		var username = getUsername(),
			version = GM_info.script.version;
		if (username && version) {
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://acid.nu/hbfs.php',
				data: 'user='+ username +'&version='+ version,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				onload: function(data) {
					var r = $.parseJSON(data.responseText);
					//console.log(r.msg);
				}
			});
		}
	}

	function sendStatsPrompt() {
		if ($('#hbfs_outer').length == 0) {
			$('body').prepend([	'<div id="hbfs_outer">',
									'<div id="hbfs_inner">',
									'<img src="http://i.imgur.com/qStmgmi.png" alt="Close" class="close" />',
									'<div class="title">',
										'<h1>Dayviews HBFS</h1>',
										'<i>Harder Better Faster Stronger</i><br />',
									'</div><br />',
									'Is it okay to collect your username and what version of the script you are using?<br /><br />',
									'Only I will see that information and it is to have some statistics over how many users my script have.<br /><br />',
									'If you change your mind later this option can be canged from the script menu.<br /><br />',
									'/ Denocle',
									'<hr />',
									'<button class="hbfs_stats" data-stats="1">Allow</button>',
									'<button class="hbfs_stats red" data-stats="0">Deny</button>',
									'</div>',
								'</div>'
								].join(''));
			$('#hbfs_outer').css('display', 'block').fadeIn('fast');
			$('#hbfs_inner').css('height', 'auto');
		}
	}

	function removeAd() {
		// Hides banners
		$('#panorama_ad, #inNewsAd, #compactAd, #uploadMeta').remove();

		// Redirects the user if the big, annoying, fullscreen splash ad is present
		if (document.URL.match(/(splash.php)/g)) {
			unsafeWindow.window.location = '/';
		}
	}

	function removeTranslate() {
		$('.translateStyles').remove();
	}

	function removeOutgoingUrlPromtp() {
		$('.commentContent a:not(.translateStyles), #showContentTextHtml a:not(.translateStyles), .commentDiscussionContent a:not(.translateStyles), .postlist_post_text a:not(.translateStyles)').removeAttr('onclick').attr('target', '_blank');
	}

	function addDirectLinkButton() {
		if ($('#get-direct-link').length == 0) {
			$('#showContentImageTools').prepend('<a href="javascript:;" id="get-direct-link" title="Get the URL for the image" original-title="Get URL"><button class="small bdbBg">Get link <i class="link-down-arrow"></i></button></a>');
		}
		if ($('#showContentImageTools input').length) {
			$('#showContentImageTools input').remove();
		}
	}

	function getDirectLink() {
		var link = getCurrentImage(),
			a = $('#get-direct-link');
		if (!a.next().is('input')) {
			$('<input type="text" value="'+link+'" />').insertAfter(a);
		} else {
			a.next().remove();
		}
		a.next().select();
	}

	function getCurrentImage() {
		return $('#picture').attr('src');
	}

	function getCurrentImageId() {
		if ($('#topLoginId').val()) {
			return $('#topLoginId').val();
		} else {
			var link = document.URL,
				array = link.split('/'),
				id = array[array.length - 2];
			if (!isNaN(id)) {
				return id;
			}
		}
	}

	function getCurrentDiaryname() {
		return $('input[name=diaryname]').val();
	}

	function getUsername() {
		// I would just have used "unsafeWindow.bdb.currentUser", but it says it doesn't work when it runs in other functions
		if (unsafeWindow.bdb) {
			return unsafeWindow.bdb.currentUser;
		} else if ($('#userstatus_friends').length != 0) {
			var str = $('#userstatus_friends').attr('href');
			if (str) {
				var array = element.split("/"),
					user = array[3];
				return user;
			}
		}
	}

	function getInfo() {
		var id = getCurrentImageId(),
			user = getCurrentDiaryname();

		if (!isNaN(id) && user) {
			unsafeWindow.$.getJSON('/p/ajax.html?action=getJsonImage&id='+ id +'&diaryname='+ user +'&read_exif=', function(data) {
				return data;
			});
		}
	}

	function betterImage(img) {
		if ($('#picture').width() <= 720) {
			var currentId = getCurrentImageId(),
				imgWidth = $('#picture').width();
			if (unsafeWindow.currentFullsizeImage) {
				if (unsafeWindow.currentFullsizeImage.id == currentId) {
					$('#picture').attr('src', unsafeWindow.currentFullsizeImage.fullsizeSrc);
				}
			}
		}
	}

	function hdTags() {
		if ($('#showContentTextHtml').length != 0) {
			var str = $('#showContentTextHtml').html(),
				nStr = str.match("\[[hd](.*)\[/hd\]]");

			if (nStr) {
				var newhtml = str.replace(nStr[0], ""),
					out = nStr[0].match("href=\"(.*?)\""),
					link = out[1],
					picture = $('#picture');

				picture.attr('src', link);
				picture.load(function () {
					$('#showContentTextHtml').html(newhtml);
					if (GM_getValue('fixTitle')) {
						fixTitle();
					}
				});
			}
		}
	}

	function addCommentMinifier() {
		if ($('.commentTop .minify-comment').length == 0) {
			$('.commentTop').prepend('<span class="minify-comment"><a href="javascript:;" class="hide-comment"><button class="small bdbBg">-</button></a></span>');
		}
	}

	function hideComment(elem) {

		elem.closest('.commentHolder').find('.baseCommentDiv .commentAvatarHolder, .baseCommentDiv .commentTextShort, .baseCommentDiv .commentTextLong, .commentDiscussionHolder, .commentFooter').slideToggle('fast');

		var current = elem.html();

		if (current == '<button class="small bdbBg">+</button>') {
			elem.html('<button class="small bdbBg">-</button>');
		} else {
			elem.html('<button class="small bdbBg">+</button>');
		}
	}

	function removeCopyProtection() {
		$('#fsSpacerImage').remove();
		$('#spacerImage').remove();
	}

	function fixTitle() {
		var currentTitle = $('title:first').text();
		if (currentTitle != 'Dayviews - En plats för dina minnen i bilder' && currentTitle != 'Dayviews - A place for your photos. A place for your memories.' && currentTitle != 'dayviews' && $('#showContentTextHtml').length != 0) {
			var text = $('#showContentTextHtml').text();
			$('title').text(text);
		}
	}

	function enableHD() {
		if ($('#showFullsizeSelectorOnHover').css('visibility') == 'hidden') {
			var id = getCurrentImageId();
			//unsafeWindow.loadImage(id, 'next', '');
			$('#showFullsizeSelectorOnHover').css('visibility', 'visible');
		}
	}

	function clickOutsideOf(element) {
		$(document).mouseup(function (e) {
			var container = $(element);
			if (container.has(e.target).length === 0 && !container.is(e.target)) {
				container.hide();
			}
		});
	}

	// Switch image and YouTube links in comments to actual images and videos
	function loadImagesInComments() {
		$('.commentTextShort a, .commentDiscussionContent a').each(function () {
			var str = $(this).attr('href'),
				array = str.split('.'),
				end = array[array.length-1];

			var allowedTypes = new Array('jpg', 'jpeg', 'gif', 'png');

			if ($.inArray(end, allowedTypes) != -1) {

				$('<a href="'+str+'" target="_blank"><img class="inCommentImg" src="'+str+'" style="max-width:642px; max-height:400px; display:block;"></a>').insertAfter(this);
				$(this).text('');

				var holder = $(this).closest('div[id^="commentText_"]'),
					img = $(this).next('a').find('img.inCommentImg'),
					currentHeight = holder.height();

				$(img).load(function () {
					var imgHeight = img.height(),
						expand = holder.closest('.commentHolder').find('.commentExpandText').css('display');

					if (expand == 'none') {
						 holder.css('max-height', (imgHeight + currentHeight) +'px');
					}

				});
				$(this).remove();

			}

			if ($(this).hasClass('youtubeLink')) {

				var id = linkifyYouTubeURLs(str);
				$('<iframe width="480" height="360" src="http://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>').insertAfter(this);

				var holder = $(this).closest('div[id^="commentText_"]'),
					expand = holder.closest('.commentHolder').find('.commentExpandText').css('display');

				if (expand == 'none') {
					holder.css('max-height', '475px');
				}

				$(this).remove();
			}

		});
	}

	function switchFavicon() {
		var url = $('link[rel="shortcut icon"]')[0].href,
			icon = GM_getValue('customFavicon');

		if (url == 'http://cdn08.dayviews.com/cdn/img/favicon_orange.ico' || url == '') {
			unsafeWindow.bdb.misc.setFavicon(icon);
		}
	}

	// Function from TheRaz (TRProductions @ DV)
	function getFeed(){
		var user = getUsername();
		if ($('#frontpageRecommended').height() && !$('#frontpageRecommended').find('#eventsDiv').height() && user) {
			$('#frontpageRecommended').css('width', 'auto').css('overflow-y', 'scroll').css('padding-right', '20px');
			$('#frontpageRecommended').load('/'+user+'/friends/ #eventsDiv', function () {
				$('.albumEvent').height('50');
				$('.showEventsDiv').remove();
				$('.events_row_images').find('img').each(function(){
					$(this).width('30').height('30');
				});
				$('.events_avatar').width('50').height('50');
				$('.events_avatar').find('img').each(function(){
					$(this).width('50').height('50');
				});
				$('.events_desc').width('300');
				$('.events_row_content').width('800');
				$('.albumImage').width('36').height('36');
			});
		}
	}

	function getMaxHeight() {
		if ($(window).height() < 720) {
			return 720;
		} else {
			return $(window).height();
		}
	}

	function fixBrokenImages() {
		var img = GM_getValue('brokenImage', 'http://i.imgur.com/Be5jOTv.png');
		if (img == '') {
			img = 'http://i.imgur.com/Be5jOTv.png';
		}
		$('img').error(function () {
			$(this).unbind('error').attr('src', img);
		});
	}

	function fixProgressWidth() {
		if ($('#uploadMultiDiv').length != 0) {
			unsafeWindow.progressWidth = 980;
		}
	}

	function linkifyYouTubeURLs(text) {
		var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w]*(?:['"][^<>]*>|<\/a>))[?=&+%\w-]*/ig;
		return text.replace(re, '$1');
	}

	function customProfileImage() {
		var holder = $('#image_chooser_left'),
			div = $('#custom_profile_image');

		if (holder.height() && !div.height()) {
			$([	'<div id="custom_profile_image">',
					'<input id="profile_image_url" type="text" placeholder="Image URL..." /><br />',
					'<button id="select_profile_image_url" class="small">Choose</button>',
				'</div>'
			].join('')).insertAfter(holder);
		}
	}

	function frontpageImagePopup() {
		$(document).on('mousemove', '.frontpageImageDiv', function(e) {
			var imgWidth = $('#fontpage-image-popup').width(),
				imgHeight = $('#fontpage-image-popup').height(),
				fromTop = $(window).scrollTop(),
				winHeight = e.pageY - fromTop,
				endX = e.pageX - imgWidth / 2,
				endY = e.pageY - imgHeight - 20,
				margin = 10;

			// Image out of bounds on top
			if (imgHeight + (margin * 2) > winHeight - margin) {
				endX = e.pageX + margin
				endY = fromTop + margin;

				// Image out of bounds to the right
				if (e.pageX > window.innerWidth - imgWidth - (margin * 3)) {
					endX = e.pageX - (imgWidth + margin);
				}
			}

			// Image out of bounds on left
			else if (e.pageX - margin < imgWidth / 2) {
				endX = margin;
			}

				// Image out of bounds to the right
				else if (window.innerWidth < e.pageX + (imgWidth / 2) + (margin * 2)) {
					endX = window.innerWidth - (imgWidth + (margin * 2));
				}

				$('#fontpage-image-popup').css({
					left: endX,
					top: endY
				});
		}).on('mouseenter', '.frontpageImageDiv', function(e) {
			var originalString = $(this).find('img').attr('src'),
				parts = originalString.split('/');

			// Here we remove the first character of the last item in the array, which will give us the full resolution image
			parts[parts.length - 1] = parts[parts.length - 1].substr(1);

			bigImg = parts.join('/');

			var big = $('<img />', {'id': 'fontpage-image-popup', src: bigImg});
			$('body').append(big);
			$('#fontpage-image-popup').fadeIn(100);
		}).on('mouseleave', '.frontpageImageDiv', function(e) {
			$('#fontpage-image-popup').remove();
		}).on('click', '.frontpageImageDiv img', function(e) {
			setTimeout(function() {
				$('#fontpage-image-popup').remove();
			}, 1000);
		});

		$(document).on('mouseenter', '#fontpage-image-popup', function() {
			$(this).remove();
		});
	}

	function removeFrontpageImagePopup() {
		$('#fontpage-image-popup').remove();
	}

	function addScriptMenu() {
		if ($('#script_menu_toggle').length == 0) {


			// We get some default values here, the ones with checkboxes we set a bit down after the HTML insert
			var brokenImage = GM_getValue('brokenImage', ''),
				themeColor = GM_getValue('themeColor', '#8abdff'),
				badgeColor = GM_getValue('badgeColor', '#ff9100'),
				nickColor = GM_getValue('nickColor', '#000000'),
				bgColor = GM_getValue('bgColor', '#E6E6E6');

			$( ['<div id="script_menu_toggle">Config</div>',
				'<div id="script_menu">',
					'<a href="javascript:;" id="hbfs-about-link">About this script</a>',
					'<h2>HBFS Config</h2>',

					'<ul class="tabs">',
						'<li class="hbfs tab active" data-tab="general">General</li>',
						'<li class="hbfs tab" data-tab="design-colors">Colors</li>',
						'<li class="hbfs tab" data-tab="design-images">Background</li>',
						'<li class="hbfs tab" data-tab="favicon">Favicon</li>',
					'</ul>',

					'<div id="script-menu-response"></div>',

					'<div class="hbfs general">',
						'<label><input name="enableHD" type="checkbox" /><span>Enable HD for all users</span></label> <a href="javascript:;" class="questionmark" title="This does not make every image high res, but it will however enable the fullscreen mode for all users.">?</a><br />',
						'<label><input name="widenSite" type="checkbox" /><span>Widen site</span></label><a href="javascript:;" class="questionmark" title="Make the whole site much wider.">?</a><br />',
						'<label><input name="nicerStyles" type="checkbox" /><span>Enable cleaner design</span></label><a href="javascript:;" class="questionmark" title="Switches out some design elements, no rounded cornes etc.">?</a><br />',
						'<label><input name="mediaInComments" type="checkbox" /><span>Images and videos in comments</span></label><a href="javascript:;" class="questionmark" title="Images and YouTube links in comments becomes embedded.">?</a><br />',
						'<label><input name="removeCopyProtection" type="checkbox" /><span>Remove copy protection</span></label><a href="javascript:;" class="questionmark" title="Removes the transparent \'Do_not_copy.gif\' over images.">?</a><br />',
						'<label><input name="addImageButton" type="checkbox" /><span>Add direct URL button to images</span></label><a href="javascript:;" class="questionmark" title="Adds a button below images that will display the direct URL to the image when clicked.">?</a><br />',
						'<label><input name="addCommentMinifier" type="checkbox" /><span>Enable minification of comments</span></label><a href="javascript:;" class="questionmark" title="Adds a button to each comment that slides up and hides that comment when clicked.">?</a><br />',
						'<label><input name="feedOnFront" type="checkbox" /><span>Friend feed on frontpage</span></label><a href="javascript:;" class="questionmark" title="Switches out the recommended image on the frontpage and instead displays your friend feed.">?</a><br />',

						'<label><input name="removeOutgoingUrlPrompt" type="checkbox" /><span>Remove URL prompt</span></label><a href="javascript:;" class="questionmark" title="Remove the warning when clicking on an outgoing link.">?</a><br />',
						'<label><input name="fixTitle" type="checkbox" /><span>Fix browser title</span></label><a href="javascript:;" class="questionmark" title="Fixes the browsers title when a image description contains ÅÄÖ.">?</a><br />',
						'<label><input name="betterImages" type="checkbox" /><span>Switch images to high resolution</span></label><a href="javascript:;" class="questionmark" title="Switches out normal resolution images to high resolution versions, if they are available.">?</a><br />',
						'<label><input name="hdTags" type="checkbox" /><span>Enable HD tags</span></label><a href="javascript:;" class="questionmark" title="If the tag [hd]http://highresimg.jpg[/hd] is in the description, that link will be used as the image.">?</a><br />',
						'<label><input name="removeTranslate" type="checkbox" /><span>Remove Google translate links</span></label><a href="javascript:;" class="questionmark" title="Removes links that say \'Translate\' in comments and image descriptions.">?</a><br />',
						'<label><input name="enableFrontpageImagePopup" type="checkbox" /><span>Magnify images on frontpage</span></label><a href="javascript:;" class="questionmark" title="This will make the thumbnails on the frontpage popup in full resolution when hovering over them.">?</a><br />',
						'<label><input name="sendStats" type="checkbox" /><span>Send statistics</span></label><a href="javascript:;" class="questionmark" title="Sends your username and version of HBFS to my server, nothing else will be logged. This information will not be publically displayed.">?</a><br />',

						'<hr />',

						'<label><input name="fixBrokenImages" type="checkbox" /><span>Replace missing images</span></label><a href="javascript:;" class="questionmark" title="When enabled, missing images will be replace by a \'Missing image\'-image. Or you can enter your own image URL below.">?</a><br />',
						'<input name="brokenImage" id="broken-image-replace" type="text" placeholder="Custom image URL..." value="'+ brokenImage +'" /> <button id="broken-image-default" class="small" title="Click this to remove the image URL you have entered and insted use the default one.">Revert to default</button><br />',
					'</div>',

					'<div class="hbfs design-colors" style="display:none;">',
						'<label><input name="enableCustomTheme" type="checkbox" /><span>Enable custom theme colors</span></label><a href="javascript:;" class="questionmark" title="Switch to any theme color you want.">?</a><br />',
						'<span>Theme color:</span><br />',
						'<input name="themeColor" class="minicolors-input" type="text" value="'+ themeColor +'" /><br />',
						'<span>Badge color:</span> <a href="javascript:;" class="questionmark" title="The color that new content will have. Such as the indicator that displays how many new comments you have, or images your friends have uploaded.">?</a><br />',
						'<input name="badgeColor" class="minicolors-input" type="text" value="'+ badgeColor +'" /><br />',
						'<hr />',
						'<label><input name="enableNickColor" type="checkbox" /><span>Use custom nick color</span></label><a href="javascript:;" class="questionmark" title="Your nickname will be displayed in given color, this will NOT be visible for other users.">?</a><br />',
						'<span>Nickname color:</span><br />',
						'<input name="nickColor" class="minicolors-input" type="text" value="'+ nickColor +'" /><br />',
					'</div>',

					'<div class="hbfs design-images" style="display:none;">',
						'<label><input name="enableCustomBackground" type="checkbox" /><span>Enable custom background</span></label><br />',

						'<label class="hbfs-background-option"><input name="customBackground" type="radio" checked value="http://i.imgur.com/pmeChVT.png" /><div class="hbfs-background-thumbnail"></div></label>',
						'<label class="hbfs-background-option"><input name="customBackground" type="radio" value="http://i.imgur.com/Db8QgNu.png" /><div class="hbfs-background-thumbnail"></div></label>',
						'<label class="hbfs-background-option"><input name="customBackground" type="radio" value="http://i.imgur.com/MkR1ZPu.png" /><div class="hbfs-background-thumbnail"></div></label>',
						'<label class="hbfs-background-option"><input name="customBackground" type="radio" value="http://i.imgur.com/3poQrZ6.png" /><div class="hbfs-background-thumbnail"></div></label>',
						'<label class="hbfs-background-option"><input name="customBackground" type="radio" value="http://i.imgur.com/J28qQvK.png" /><div class="hbfs-background-thumbnail"></div></label>',
						'<label class="hbfs-background-option"><input name="customBackground" type="radio" value="http://i.imgur.com/fuxpHvW.png" /><div class="hbfs-background-thumbnail"></div></label>',
						'<br />',
						'<br />',
						'Custom: ',
						'<br />',
						'<label><input name="customBackground" type="radio" value="custom-image" />Image:</label> <input id="custom-background-image" placeholder="URL to image..." type="text" />​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​<br />',
						'<br />',
						'<label><input name="customBackground" type="radio" value="custom-color" />Color:</label> <input id="custom-background-color" class="minicolors-input" type="text" value="'+ bgColor +'" />​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​<br />',
					'</div>',

					'<div class="hbfs favicon" style="display:none;">',
						'<label><input name="enableCustomFavicon" type="checkbox" /><span>Enable custom favicon</span></label><br />',

						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" checked value="http://i.imgur.com/Dtr92Jf.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/uPrGKNc.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/5Zwi3x6.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/bkCvFEo.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/0JKxfUv.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/Kpw8yGR.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/xdmcpLn.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/m5Pwb1T.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/0ujPHk1.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/BrDgK8y.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
						'<label class="hbfs-favicon-option"><input name="customFavicon" type="radio" value="http://i.imgur.com/fQdOZht.png" /><div class="hbfs-favicon-thumbnail"></div></label>',
					'</div>',

					'<br />',

					'<button id="script-save" class="small bdbBg">Save</button> <button id="script-close" style="float:right;" class="small bdbBg">Close</button><br />',
				'</div>'
			].join("")).insertAfter('#userstatus_gotomenu_div');

			// Here we set the checkboxes
			$('input[type=checkbox]').each(function () {
				var option = $(this).attr('name');

				if (option == 'feedOnFront' || option == 'sendStats' || option == 'enableCustomTheme' || option == 'enableNickColor' || option == 'enableCustomBackground' || option == 'enableCustomFavicon') {
					if (GM_getValue(option, false)) {
						$(this).prop('checked', true);
					} else if (option == 'enableCustomTheme') {
						// This disabled the colorpicker inputs for theme and badge color if the user doesn't want custom theme colors
						$('input[name=themeColor]').attr('disabled', true);
						$('input[name=badgeColor]').attr('disabled', true);
					} else if (option == 'enableNickColor') {
						// This disabled the colorpicker input for nick color if the user doesn't want a custom nick name color
						$('input[name=nickColor]').attr('disabled', true);
					} else if (option == 'enableCustomBackground') {
						// This disables the radiobuttons for predefined background patterns
						$('input[name=customBackground]').attr('disabled', true);
					} else if (option == 'enableCustomFavicon') {
						// This disables the radiobuttons for the favicons
						$('input[name=customFavicon]').attr('disabled', true);
					}
				} else if (GM_getValue(option, true)) {
					$(this).prop('checked', true);
				}
			});

			//====================================
			// Live updates for disabled inputs
			//====================================

			// This disables the colorpicker inputs for custom theme colors when unchecking the "Enable custom theme colors"
			$(document).on('click', 'input[name=enableCustomTheme]', function () {
				if ($(this).prop('checked') == true) {
					$('input[name=themeColor]').attr('disabled', false);
					$('input[name=badgeColor]').attr('disabled', false);
				} else {
					$('input[name=themeColor]').attr('disabled', true);
					$('input[name=badgeColor]').attr('disabled', true);
				}
			});

			// This disabled the colorpicker input for nick color when unchecking the "Use custom nick color"
			$(document).on('click', 'input[name=enableNickColor]', function () {
				if ($(this).prop('checked') == true) {
					$('input[name=nickColor]').attr('disabled', false);
				} else {
					$('input[name=nickColor]').attr('disabled', true);
				}
			});

			// This disables the radiobuttons for predefined background patterns when unchecking the "Enable custom background"
			$(document).on('click', 'input[name=enableCustomBackground]', function () {
				if ($(this).prop('checked') == true) {
					$('input[name=customBackground]').attr('disabled', false);
				} else {
					$('input[name=customBackground]').attr('disabled', true);
				}
			});

			// This disables the radiobuttons for the favicons when unchecking the "Enable custom favicon"
			$(document).on('click', 'input[name=enableCustomFavicon]', function () {
				if ($(this).prop('checked') == true) {
					$('input[name=customFavicon]').attr('disabled', false);
				} else {
					$('input[name=customFavicon]').attr('disabled', true);
				}
			});

			// Here we set the radio button for the background image
			var background = GM_getValue('customBackground', 'none');
			$('input[type=radio][name=customBackground]').each(function () {
				if (background == $(this).val()) {
					$(this).prop('checked', true);
					$('#custom-background-image').val('');
					return false;
				} else if (background.substr(0, 1) == '#') {
					$('input[name=customBackground][type=radio][value=custom-color]').prop('checked', true);
					$('#custom-background-color').val(background);
				} else {
					$('input[name=customBackground][type=radio][value=custom-image]').prop('checked', true);
					if (background != 'none') {
						$('#custom-background-image').val(background);
					}
				}
			});

			// Here we set the radio button for the favicons
			var favicon = GM_getValue('customFavicon');
			$('input[type=radio][name=customFavicon]').each(function () {
				if (favicon == $(this).val()) {
					$(this).prop('checked', true);
				}
			});

			// Here we load the thumbnails for the predefined background images
			$('.hbfs-background-thumbnail').each(function () {
				var img = $(this).prev().val();
				$(this).css('background', 'url('+ img +')');
			});

			// Here we load the favicons
			$('.hbfs-favicon-thumbnail').each(function () {
				var img = $(this).prev().val();
				$(this).css('background', 'url('+ img +')');
			});

			loadColorpicker();
			clickOutsideOf('#script_menu');
		}
	}

	function hbfs_about() {
		$('body').prepend([	'<div id="hbfs_outer">',
								'<div id="hbfs_inner">',
								'<img src="http://i.imgur.com/qStmgmi.png" alt="Close" class="close" />',
								'<div class="title">',
									'<h1>Dayviews HBFS</h1>',
									'<i>Harder Better Faster Stronger</i><br />',
								'</div><br /><br />',
								'<a href="https://userscripts.org/scripts/show/166622" target="_blank">Script page</a><br />',
								'Version: '+ GM_info.script.version +'<br /><br />',
								'Made by <a href="/Denocle/">Denocle</a> with some help from <a href="/TRProductions/">Raz</a>.<br /><br />',
								'Copyleft 2014',
								'</div>',
							'</div>'
							].join(''));
		$('#hbfs_outer').fadeIn('fast');
	}

	function waitForKeyElements (selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
		var targetNodes, btargetsFound;

		if (typeof iframeSelector == "undefined")
			targetNodes	 = $(selectorTxt);
		else
			targetNodes	 = $(iframeSelector).contents ()
											   .find (selectorTxt);

		if (targetNodes  &&  targetNodes.length > 0) {
			btargetsFound   = true;
			/*--- Found target node(s).  Go through each and act if they
				are new.
			*/
			targetNodes.each ( function () {
				var jThis		= $(this);
				var alreadyFound = jThis.data ('alreadyFound')  ||  false;

				if (!alreadyFound) {
					//--- Call the payload function.
					var cancelFound	 = actionFunction (jThis);
					if (cancelFound)
						btargetsFound   = false;
					else
						jThis.data ('alreadyFound', true);
				}
			} );
		}
		else {
			btargetsFound   = false;
		}

		//--- Get the timer-control variable for this selector.
		var controlObj	  = waitForKeyElements.controlObj  ||  {};
		var controlKey	  = selectorTxt.replace (/[^\w]/g, "_");
		var timeControl	 = controlObj [controlKey];

		//--- Now set or clear the timer as appropriate.
		if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
			//--- The only condition where we need to clear the timer.
			clearInterval (timeControl);
			delete controlObj [controlKey]
		}
		else {
			//--- Set a timer, if needed.
			if ( ! timeControl) {
				timeControl = setInterval ( function () {
						waitForKeyElements (	selectorTxt,
												actionFunction,
												bWaitOnce,
												iframeSelector
											);
					},
					300
				);
				controlObj [controlKey] = timeControl;
			}
		}
		waitForKeyElements.controlObj   = controlObj;
	}

	//=============================================
	//						CSS
	//=============================================

	GM_addStyle([
		// Making some space for the script menu
		".userstatus_icons {padding:13px 4px 5px; margin-left:10px;}",
		"#userstatus_links, #userstatus_left, #userstatus_right {width:auto !important;}",
		"#userstatus_links #userstatus_right div {float:right; margin:3px 0px 0px 10px;}",
		"#extLogin, #loginbar_left {width:auto;}",
		"#userstatus_icons, #userstatus_left {padding-right:15px;}",
		"#loginbar a {margin-right:0px;}",

		//Style for script config menu
		"#script_menu_toggle {width:57px; height:16px; left:170px; top:17px; background: url(http://i.imgur.com/9E9DEl5.png) no-repeat right; text-align:left; cursor:pointer; color:#fff; font-weight:bold;}",
		"#script_menu {display:none; position:absolute; top:50px; left:570px; width:280px; box-shadow:2px 2px 3px #aaaaaa; background:#f2f2f2; padding:20px; text-align:left; z-index:2000; color:#000;}",
		"#script_menu div {float:none !important; width:auto; height:auto;}",
		"#script_menu ul.tabs {margin:12px 0px 10px !important;}",
		"#script_menu ul.tabs li {padding:5px 10px; margin-right:3px; cursor:pointer;}",
		"#script_menu ul.tabs li.active {background:"+ $('.bdbBg').css('background-color') +"; color:#fff;}",
		"#script_menu input {width:auto; height:auto; margin-right:5px; border-radius:0px; vertical-align:baseline;}",
		"#script_menu input[type=text] {font-size:14px; color:#000; border:solid 1px #adadad; box-shadow:2px 2px 10px #ededed; padding:3px;}",
		"#script-menu-response {display:none; width:100%; padding:5px 10px; margin:0px -10px 10px auto !important; background-color:#ccc;}",
		"#hbfs-about-link {float:right; margin-top:6px;}",
		"#script_menu a:link {color:#2998ff;}",
		"#script_menu .questionmark {margin-left:6px; cursor:help;}",
		"#script_menu hr {border:none; border-bottom:solid 1px #ccc; margin:12px 0px;}",

		"label.hbfs-background-option, label.hbfs-favicon-option {position:relative; display:inline-block; width:auto; height:auto;}",
		"label.hbfs-background-option input {position:absolute; top:20px;}",
		"div.hbfs-background-thumbnail {display:inline-block !important; width:50px !important; height:50px !important; margin:5px 10px 5px 23px !important; border:solid 1px #ccc;}",

		"label.hbfs-favicon-option input {position:absolute; top:4px;}",
		"div.hbfs-favicon-thumbnail {display:inline-block !important; width:16px !important; height:16px !important; margin:5px 10px 5px 23px !important; border:solid 1px #ccc;}",

		// About popup
		"#hbfs_outer {position:fixed; width:100%; height:100%; background:rgba(0, 0, 0, 0.8); display:none; z-index:3000;}",
		"#hbfs_inner {position:fixed; top:43%; margin-top:-150px; left:50%; margin-left:-150px; width:300px; height:240px; box-shadow:5px 5px 20px #141414; border:solid 1px #111; background:#1a1a1a; padding:20px; text-align:left; color:#fff; z-index:3001;}",
		"#hbfs_inner .title {text-align:center;}",
		"#hbfs_inner .close {position:absolute; top:-8px; right:-14px; cursor:pointer;}",

		// Frontpage popup on hover
		"#fontpage-image-popup {max-height: 500px; max-width: 700px; position: absolute; z-index: 1000000; box-shadow: 4px 4px 20px #1D1D1D; display: none;}",

		// Custom profile image form, or whatever
		"#custom_profile_image {position:absolute; left:10px; bottom:20px; text-align:left;}",

		//Hide ads
		"#panorama_ad, #inNewsAd, #right, #compactAd, #uploadMeta {display:none !important;}"
	].join("\n"));

	if (GM_getValue('widenSite', true)) {
		var maxHeight = getMaxHeight();
		GM_addStyle([
			"#holder {width: 1240px;}",
			"#top_whole {width:1208px;}",
			"#contentHolder {width:1200px; padding: 0px 20px 60px;}",
			"#frontPageImagesHolder {width:900px;}",
			".contentImageList.threeInfrontPageImagesHolder div {margin:0px; width:180px; height:180px; overflow:hidden;}",
			".frontpageImageDiv .gotoImage img {width:178px; height:178px;}",
			".frontpageImageDiv .cap {display:none;}",
			"#content {width:980px;}",
			".contentImageList div {margin:0px 0px 10px 10px;}",
			"#userImages, .contentImageList {margin:0px 0px 20px 0px;}",
			"#profilepicture, #profileoverlay {height:500px;}",
			"#profilepicture {width:auto;}",
			"#profilepicture.M {background:url(http://cdn08.dayviews.com/cdn/img/v4/profile_defaultpic_M.png) left bottom no-repeat #efefef;}",
			"#profilepicture.F {background:url(http://cdn08.dayviews.com/cdn/img/v4/profile_defaultpic_F.png) left bottom no-repeat #efefef;}",
			"#profileinfo {height:460px;}",
			"#profilepictureimage {width:980px; max-width:980px; height:auto;}",
			".contentLeft {width:730px;}",
			".contentRight {padding: 15px 0px 0px 15px;}",
			"#showContentOrganizeDiv {width:930px;}",
			"#showContentCommentTextareaDiv {width:670px}",
			"#commentTextarea {width:678px}",
			".commentTop,.commentTextLong, .commentTextShort {width:670px;}",
			".commentDiscussionHolder {width:700px;}",
			".commentDiscussionReply .commentTextLong, .commentDiscussionReply .commentTextShort, .commentDiscussionTop {width:605px;}",
			".commentDiscussionReply {padding:5px 30px 8px 5px;}",
			".commentDiscussionReply .commentTools {right:26px;}",
			".commentDiscussionExpandBar {margin-left:5px;}",
			"#recentCommentsDiv .commentDiscussionContent {width:auto;}",
			"#showContentImage td {width:974px}",
			"#picture {max-width:974px !important; max-height:"+ maxHeight +"px !important}",
			"#showContentImage #imageLoadingGif {left:464px;}",
			"#showContentText, #organizeShowTextarea {width:770px;}",
			".recentCommentHolder .commentHolderBg {width:822px !important}",
			"#recentCommentsDiv .commentDiscussionReply, #recentCommentsDiv .commentReplyBox {width:757px !important;}",
			".message {width:auto;}",
			".messageBody {width:712px;}",
			"#main_diary_top.textil, #main_diary_top {background-size:cover;}",
			"#footer {width:1160px}",
			".module_graph {width:520px !important; margin-left:-50px;}",
			"#showContentImageTools, #organizeShowDiv {float:none;}",
			".link-down-arrow {display:inline-block; width:12px; height:14px; background:url(http://cdn08.dayviews.com/cdn/img/goto_arrow_sprite.png) no-repeat 0px 6px; margin-bottom:-1px;}",
			"#footerDummy {padding: 0px 20px 4px 920px;}",
			"#publishWrite .imgSettingsHolder {width:713px;}",
			"#publishWrite .sandBox textarea {width:710px;}",
			".commentReplyBox {width:660px;}",
			".commentReplyBox .commentText {width:602px;}",
			"#recentCommentsDiv .commentReplyBox .commentText {width:690px !important;}",
			".events_row_content {width:690px;}",
			"#gotoUploadedImagesDiv {margin-top:50px !important;background:url(http://cdn07.dayviews.com/cdn/img/upload_uploaded.png) no-repeat scroll center center #efefef !important;}",
			"#publishImagesContentDiv {{width:}}",
			"#threadShowMore {width:850px !important;}",
			"#showContentOrganizeDiv .col {width:310px !important;}",
			".sc #frontPageBoxes {left:auto !important; right:0px;}",
			"#frontpageScrollLoadingBar, #groupsScrollLoadingBar, #monthScrollLoadingBar, #tagsScrollLoadingBar, #bloggseGalleryScrollLoadingBar, #mainpageScrollLoadingBar {width: 900px;}",
			"#frontpageScrollLoadingBar img, #tagsScrollLoadingBar img, #groupsScrollLoadingBar img, #monthScrollLoadingBar img, #bloggseGalleryScrollLoadingBar img, #mainpageScrollLoadingBar img {margin-left: 360px;}",

			"#uploadMultiDiv div.sandBox {width:900px !important;}",
			"#upload_meta_help {width:930px;}",
			"#uploadingDiv .progress {background:url(http://cdn07.dayviews.com/cdn/img/loading_bg_long_2.png) center repeat-x; width:980px !important; padding:15px 0px; margin:0px 0px 10px -1px;}",
			".overlay[class*='loading'] {width:980px !important;}",
			"#publishWrite .sandBox .publishLoading {left:347px;}",

			// Forum
			"#forumList {width:900px;}",
			"#threadList {width:1200px;}",
			"#forumList .forumList_col_1 {width:740px;}",
			"#threadList .threadList_col2 {width:700px;}",
			"#postlist .postlist_post {display:block; width:1100px !important;}",
			".postlist_row {width:auto;}",
			"#moderators, #threadList {float:none; display:block;}",
			"#group_threadlist #threadList {width:auto;}",
			"#group_threadlist .postlist_post {width:880px !important;}",

			// News
			"#content .newsInbox, .newsPostSeparator {width:940px;}",

			// Groups
			"#findGroups .groupsHeader {width:890px;}",
			"#findGroups {width:920px;}",
			".list .group {width:200px;}",

			// Contest
			"#content_wide .contentLeft {width:auto; max-width:960px;}",

			// Show today
			"#showTodaySearch {width:1160px;}",
			"#showTodaySearch .sandBox {width:auto !important;}",

			"#image_chooser_content_inner img {left:0 !important;}"
			].join("\n"));
	}

	if (GM_getValue('nicerStyles', true)) {
		GM_addStyle([
		// Just some nicer styles
		"#commentTextarea, .commentText, textarea, input[type=text], #messages_pickuser, #password, select {border-radius:0px; border:solid 1px #adadad; box-shadow:2px 2px 10px #ededed;}",
		"input[type=text], #password {padding:3px;}",
		"button.small, a.buttonStyle.small {border-radius:0px; box-shadow:2px 2px 4px #ccc;}",

		// Stuff that doesn't need a box shadow
		"#addFriendPop.addfriendLink, #top_searchField, #closeFeedback, .uploadPublishButton, .hasDatepicker, #userLogin, #loginButton {box-shadow:none !important;}",

		// Other things that just don't need border radius
		".friend .editFriend ul, .group .editGroup ul, #blockUserText, #fpHDInfoBox, #fancybox-outer, #upload_meta_help, .groupHeader, .groupContent, ul.tabs li a.active, ul.tabs li a, #inviteFriends, .sandBox, .active_tab, #fancybox-wrap, .imageControllBar, .bdbBg, #userLogin, #passwordLogin, #loginButton, #userstatus_signup_div, #fpRegisterLink, #top_searchField, .fpSignature, #groupname, .createGroupCheckbox, .messageBadge, button, a.buttonStyle, #profilecontrolls img {border-radius:0px !important;}"
		].join("\n"));
	}

	if (GM_getValue('enableCustomTheme', true)) {
		var badgeColor = GM_getValue('badgeColor', 'orange');
		if (badgeColor == '') {
			badgeColor = 'orange';
		}

		var themeColor = GM_getValue('themeColor', $('.bdbBg').css('background-color'));


		GM_addStyle([
			".bdbBg, .icon img, img.icon, .badge,button, a.buttonStyle, ul.tabs li a.active, .userstatus_icons.active_tab span, #fancybox-wrap.fancy-bdbstyle, #fancybox-wrap.fancy-bdbstyle #fancybox-title, #autodateAll.active, .userstatus_icons .newContent div.newEvents {background-color:"+ themeColor +"}",
			".userstatus_icons .newContent div:not(.newEvents), #left_calendar .newImage, .groupItem .groupNewImages, .messageBadge, .badge.new {background-color:"+ badgeColor +" !important;}",
			".unseenComment {border-left:3px solid "+ badgeColor +" !important;}",
			".gotoUser img[style*=outline] {outline:solid 1px "+ badgeColor +" !important;}",
			"div[style*='color:#FF9900'], .unseen, #friendsList .blue .unseen, #friendsList .green .unseen, #friendsList .red .unseen, #friendsList .purple .unseen, #friendsList .black .unseen {color:"+ badgeColor +" !important;}"
			].join("\n"));
	}

	if (GM_getValue('enableCustomNick', true)) {
		GM_addStyle(".userLink[name="+ getUsername() +"] {color:"+ GM_getValue('nickColor', '') +";}");
		GM_addStyle("a.gotoUser[name="+ getUsername() +"] {color:"+ GM_getValue('nickColor', '') +";}");
		GM_addStyle("a.gotoForumUser[name="+ getUsername() +"] {color:"+ GM_getValue('nickColor', '') +";}");
	}

	if (GM_getValue('enableCustomBackground') == true) {
		var val = GM_getValue('customBackground', 'none');

		if (val.substr(0, 1) == '#') {
			GM_addStyle("body {background:"+ val +";}");
		} else {
			GM_addStyle("body {background:url("+ val +");}");
		}

	}

	if (GM_getValue('fixBrokenImages') == true) {
		GM_addStyle(".postlist_userinfo_avatar img {width:50px; height:50px;}");
	}

	function loadColorpicker() {
		// Chrome has an built in colorpicker, but since no other browser do, we need to include this plugin
		// Minified version of Minicolorpicker
		// http://labs.abeautifulsite.net/jquery-miniColors/
		$.minicolors={defaultSettings:{animationSpeed:100,animationEasing:"swing",change:null,changeDelay:0,control:"hue",defaultValue:"",hide:null,hideSpeed:100,inline:false,letterCase:"lowercase",opacity:false,position:"default",show:null,showSpeed:100,swatchPosition:"left",textfield:true,theme:"default"}};$.extend($.fn,{minicolors:function(method,data){switch(method){case"destroy":$(this).each(function(){destroy($(this))});return $(this);case"hide":hide();return $(this);case"opacity":if(data===undefined){return $(this).attr("data-opacity")}else{$(this).each(function(){refresh($(this).attr("data-opacity",data))});return $(this)}case"rgbObject":return rgbObject($(this),method==="rgbaObject");case"rgbString":case"rgbaString":return rgbString($(this),method==="rgbaString");case"settings":if(data===undefined){return $(this).data("minicolors-settings")}else{$(this).each(function(){var settings=$(this).data("minicolors-settings")||{};destroy($(this));$(this).minicolors($.extend(true,settings,data))});return $(this)}case"show":show($(this).eq(0));return $(this);case"value":if(data===undefined){return $(this).val()}else{$(this).each(function(){refresh($(this).val(data))});return $(this)}case"create":default:if(method!=="create"){data=method}$(this).each(function(){init($(this),data)});return $(this)}}});function init(input,settings){var minicolors=$('<span class="minicolors" />'),defaultSettings=$.minicolors.defaultSettings;if(input.data("minicolors-initialized")){return}settings=$.extend(true,{},defaultSettings,settings);minicolors.addClass("minicolors-theme-"+settings.theme).addClass("minicolors-swatch-position-"+settings.swatchPosition).toggleClass("minicolors-swatch-left",settings.swatchPosition==="left").toggleClass("minicolors-with-opacity",settings.opacity);if(settings.position!==undefined){$.each(settings.position.split(" "),function(){minicolors.addClass("minicolors-position-"+this)})}input.addClass("minicolors-input").data("minicolors-initialized",true).data("minicolors-settings",settings).prop("size",7).prop("maxlength",7).wrap(minicolors).after('<span class="minicolors-panel minicolors-slider-'+settings.control+'"><span class="minicolors-slider"><span class="minicolors-picker"></span></span><span class="minicolors-opacity-slider"><span class="minicolors-picker"></span></span><span class="minicolors-grid"><span class="minicolors-grid-inner"></span><span class="minicolors-picker"><span></span></span></span></span>');input.parent().find(".minicolors-panel").on("selectstart",function(){return false}).end();if(settings.swatchPosition==="left"){input.before('<span class="minicolors-swatch"><span></span></span>')}else{input.after('<span class="minicolors-swatch"><span></span></span>')}if(!settings.textfield){input.addClass("minicolors-hidden")}if(settings.inline){input.parent().addClass("minicolors-inline")}updateFromInput(input,false,true)}function destroy(input){var minicolors=input.parent();input.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeProp("maxlength").removeClass("minicolors-input");minicolors.before(input).remove()}function refresh(input){updateFromInput(input)}function show(input){var minicolors=input.parent(),panel=minicolors.find(".minicolors-panel"),settings=input.data("minicolors-settings");if(!input.data("minicolors-initialized")||input.prop("disabled")||minicolors.hasClass("minicolors-inline")||minicolors.hasClass("minicolors-focus")){return}hide();minicolors.addClass("minicolors-focus");panel.stop(true,true).fadeIn(settings.showSpeed,function(){if(settings.show){settings.show.call(input.get(0))}})}function hide(){$(".minicolors-input").each(function(){var input=$(this),settings=input.data("minicolors-settings"),minicolors=input.parent();if(settings.inline){return}minicolors.find(".minicolors-panel").fadeOut(settings.hideSpeed,function(){if(minicolors.hasClass("minicolors-focus")){if(settings.hide){settings.hide.call(input.get(0))}}minicolors.removeClass("minicolors-focus")})})}function move(target,event,animate){var input=target.parents(".minicolors").find(".minicolors-input"),settings=input.data("minicolors-settings"),picker=target.find("[class$=-picker]"),offsetX=target.offset().left,offsetY=target.offset().top,x=Math.round(event.pageX-offsetX),y=Math.round(event.pageY-offsetY),duration=animate?settings.animationSpeed:0,wx,wy,r,phi;if(event.originalEvent.changedTouches){x=event.originalEvent.changedTouches[0].pageX-offsetX;y=event.originalEvent.changedTouches[0].pageY-offsetY}if(x<0){x=0}if(y<0){y=0}if(x>target.width()){x=target.width()}if(y>target.height()){y=target.height()}if(target.parent().is(".minicolors-slider-wheel")&&picker.parent().is(".minicolors-grid")){wx=75-x;wy=75-y;r=Math.sqrt(wx*wx+wy*wy);phi=Math.atan2(wy,wx);if(phi<0){phi+=Math.PI*2}if(r>75){r=75;x=75-(75*Math.cos(phi));y=75-(75*Math.sin(phi))}x=Math.round(x);y=Math.round(y)}if(target.is(".minicolors-grid")){picker.stop(true).animate({top:y+"px",left:x+"px"},duration,settings.animationEasing,function(){updateFromControl(input,target)})}else{picker.stop(true).animate({top:y+"px"},duration,settings.animationEasing,function(){updateFromControl(input,target)})}}function updateFromControl(input,target){function getCoords(picker,container){var left,top;if(!picker.length||!container){return null}left=picker.offset().left;top=picker.offset().top;return{x:left-container.offset().left+(picker.outerWidth()/2),y:top-container.offset().top+(picker.outerHeight()/2)}}var hue,saturation,brightness,rgb,x,y,r,phi,hex=input.val(),opacity=input.attr("data-opacity"),minicolors=input.parent(),settings=input.data("minicolors-settings"),panel=minicolors.find(".minicolors-panel"),swatch=minicolors.find(".minicolors-swatch"),grid=minicolors.find(".minicolors-grid"),slider=minicolors.find(".minicolors-slider"),opacitySlider=minicolors.find(".minicolors-opacity-slider"),gridPicker=grid.find("[class$=-picker]"),sliderPicker=slider.find("[class$=-picker]"),opacityPicker=opacitySlider.find("[class$=-picker]"),gridPos=getCoords(gridPicker,grid),sliderPos=getCoords(sliderPicker,slider),opacityPos=getCoords(opacityPicker,opacitySlider);if(target.is(".minicolors-grid, .minicolors-slider")){switch(settings.control){case"wheel":x=(grid.width()/2)-gridPos.x;y=(grid.height()/2)-gridPos.y;r=Math.sqrt(x*x+y*y);phi=Math.atan2(y,x);if(phi<0){phi+=Math.PI*2}if(r>75){r=75;gridPos.x=69-(75*Math.cos(phi));gridPos.y=69-(75*Math.sin(phi))}saturation=keepWithin(r/0.75,0,100);hue=keepWithin(phi*180/Math.PI,0,360);brightness=keepWithin(100-Math.floor(sliderPos.y*(100/slider.height())),0,100);hex=hsb2hex({h:hue,s:saturation,b:brightness});slider.css("backgroundColor",hsb2hex({h:hue,s:saturation,b:100}));break;case"saturation":hue=keepWithin(parseInt(gridPos.x*(360/grid.width())),0,360);saturation=keepWithin(100-Math.floor(sliderPos.y*(100/slider.height())),0,100);brightness=keepWithin(100-Math.floor(gridPos.y*(100/grid.height())),0,100);hex=hsb2hex({h:hue,s:saturation,b:brightness});slider.css("backgroundColor",hsb2hex({h:hue,s:100,b:brightness}));minicolors.find(".minicolors-grid-inner").css("opacity",saturation/100);break;case"brightness":hue=keepWithin(parseInt(gridPos.x*(360/grid.width())),0,360);saturation=keepWithin(100-Math.floor(gridPos.y*(100/grid.height())),0,100);brightness=keepWithin(100-Math.floor(sliderPos.y*(100/slider.height())),0,100);hex=hsb2hex({h:hue,s:saturation,b:brightness});slider.css("backgroundColor",hsb2hex({h:hue,s:saturation,b:100}));minicolors.find(".minicolors-grid-inner").css("opacity",1-(brightness/100));break;default:hue=keepWithin(360-parseInt(sliderPos.y*(360/slider.height())),0,360);saturation=keepWithin(Math.floor(gridPos.x*(100/grid.width())),0,100);brightness=keepWithin(100-Math.floor(gridPos.y*(100/grid.height())),0,100);hex=hsb2hex({h:hue,s:saturation,b:brightness});grid.css("backgroundColor",hsb2hex({h:hue,s:100,b:100}));break}input.val(convertCase(hex,settings.letterCase))}if(target.is(".minicolors-opacity-slider")){if(settings.opacity){opacity=parseFloat(1-(opacityPos.y/opacitySlider.height())).toFixed(2)}else{opacity=1}if(settings.opacity){input.attr("data-opacity",opacity)}}swatch.find("SPAN").css({backgroundColor:hex,opacity:opacity});doChange(input,hex,opacity)}function updateFromInput(input,preserveInputValue,firstRun){var hex,hsb,opacity,x,y,r,phi,minicolors=input.parent(),settings=input.data("minicolors-settings"),swatch=minicolors.find(".minicolors-swatch"),grid=minicolors.find(".minicolors-grid"),slider=minicolors.find(".minicolors-slider"),opacitySlider=minicolors.find(".minicolors-opacity-slider"),gridPicker=grid.find("[class$=-picker]"),sliderPicker=slider.find("[class$=-picker]"),opacityPicker=opacitySlider.find("[class$=-picker]");hex=convertCase(parseHex(input.val(),true),settings.letterCase);if(!hex){hex=convertCase(parseHex(settings.defaultValue,true))}hsb=hex2hsb(hex);if(!preserveInputValue){input.val(hex)}if(settings.opacity){opacity=input.attr("data-opacity")===""?1:keepWithin(parseFloat(input.attr("data-opacity")).toFixed(2),0,1);if(isNaN(opacity)){opacity=1}input.attr("data-opacity",opacity);swatch.find("SPAN").css("opacity",opacity);y=keepWithin(opacitySlider.height()-(opacitySlider.height()*opacity),0,opacitySlider.height());opacityPicker.css("top",y+"px")}swatch.find("SPAN").css("backgroundColor",hex);switch(settings.control){case"wheel":r=keepWithin(Math.ceil(hsb.s*0.75),0,grid.height()/2);phi=hsb.h*Math.PI/180;x=keepWithin(75-Math.cos(phi)*r,0,grid.width());y=keepWithin(75-Math.sin(phi)*r,0,grid.height());gridPicker.css({top:y+"px",left:x+"px"});y=150-(hsb.b/(100/grid.height()));if(hex===""){y=0}sliderPicker.css("top",y+"px");slider.css("backgroundColor",hsb2hex({h:hsb.h,s:hsb.s,b:100}));break;case"saturation":x=keepWithin((5*hsb.h)/12,0,150);y=keepWithin(grid.height()-Math.ceil(hsb.b/(100/grid.height())),0,grid.height());gridPicker.css({top:y+"px",left:x+"px"});y=keepWithin(slider.height()-(hsb.s*(slider.height()/100)),0,slider.height());sliderPicker.css("top",y+"px");slider.css("backgroundColor",hsb2hex({h:hsb.h,s:100,b:hsb.b}));minicolors.find(".minicolors-grid-inner").css("opacity",hsb.s/100);break;case"brightness":x=keepWithin((5*hsb.h)/12,0,150);y=keepWithin(grid.height()-Math.ceil(hsb.s/(100/grid.height())),0,grid.height());gridPicker.css({top:y+"px",left:x+"px"});y=keepWithin(slider.height()-(hsb.b*(slider.height()/100)),0,slider.height());sliderPicker.css("top",y+"px");slider.css("backgroundColor",hsb2hex({h:hsb.h,s:hsb.s,b:100}));minicolors.find(".minicolors-grid-inner").css("opacity",1-(hsb.b/100));break;default:x=keepWithin(Math.ceil(hsb.s/(100/grid.width())),0,grid.width());y=keepWithin(grid.height()-Math.ceil(hsb.b/(100/grid.height())),0,grid.height());gridPicker.css({top:y+"px",left:x+"px"});y=keepWithin(slider.height()-(hsb.h/(360/slider.height())),0,slider.height());sliderPicker.css("top",y+"px");grid.css("backgroundColor",hsb2hex({h:hsb.h,s:100,b:100}));break}if(!firstRun){doChange(input,hex,opacity)}}function doChange(input,hex,opacity){var settings=input.data("minicolors-settings");if(hex+opacity!==input.data("minicolors-lastChange")){input.data("minicolors-lastChange",hex+opacity);if(settings.change){if(settings.changeDelay){clearTimeout(input.data("minicolors-changeTimeout"));input.data("minicolors-changeTimeout",setTimeout(function(){settings.change.call(input.get(0),hex,opacity)},settings.changeDelay))}else{settings.change.call(input.get(0),hex,opacity)}}}}function rgbObject(input){var hex=parseHex($(input).val(),true),rgb=hex2rgb(hex),opacity=$(input).attr("data-opacity");if(!rgb){return null}if(opacity!==undefined){$.extend(rgb,{a:parseFloat(opacity)})}return rgb}function rgbString(input,alpha){var hex=parseHex($(input).val(),true),rgb=hex2rgb(hex),opacity=$(input).attr("data-opacity");if(!rgb){return null}if(opacity===undefined){opacity=1}if(alpha){return"rgba("+rgb.r+", "+rgb.g+", "+rgb.b+", "+parseFloat(opacity)+")"}else{return"rgb("+rgb.r+", "+rgb.g+", "+rgb.b+")"}}function convertCase(string,letterCase){return letterCase==="uppercase"?string.toUpperCase():string.toLowerCase()}function parseHex(string,expand){string=string.replace(/[^A-F0-9]/ig,"");if(string.length!==3&&string.length!==6){return""}if(string.length===3&&expand){string=string[0]+string[0]+string[1]+string[1]+string[2]+string[2]}return"#"+string}function keepWithin(value,min,max){if(value<min){value=min}if(value>max){value=max}return value}function hsb2rgb(hsb){var rgb={};var h=Math.round(hsb.h);var s=Math.round(hsb.s*255/100);var v=Math.round(hsb.b*255/100);if(s===0){rgb.r=rgb.g=rgb.b=v}else{var t1=v;var t2=(255-s)*v/255;var t3=(t1-t2)*(h%60)/60;if(h===360){h=0}if(h<60){rgb.r=t1;rgb.b=t2;rgb.g=t2+t3}else{if(h<120){rgb.g=t1;rgb.b=t2;rgb.r=t1-t3}else{if(h<180){rgb.g=t1;rgb.r=t2;rgb.b=t2+t3}else{if(h<240){rgb.b=t1;rgb.r=t2;rgb.g=t1-t3}else{if(h<300){rgb.b=t1;rgb.g=t2;rgb.r=t2+t3}else{if(h<360){rgb.r=t1;rgb.g=t2;rgb.b=t1-t3}else{rgb.r=0;rgb.g=0;rgb.b=0}}}}}}}return{r:Math.round(rgb.r),g:Math.round(rgb.g),b:Math.round(rgb.b)}}function rgb2hex(rgb){var hex=[rgb.r.toString(16),rgb.g.toString(16),rgb.b.toString(16)];$.each(hex,function(nr,val){if(val.length===1){hex[nr]="0"+val}});return"#"+hex.join("")}function hsb2hex(hsb){return rgb2hex(hsb2rgb(hsb))}function hex2hsb(hex){var hsb=rgb2hsb(hex2rgb(hex));if(hsb.s===0){hsb.h=360}return hsb}function rgb2hsb(rgb){var hsb={h:0,s:0,b:0};var min=Math.min(rgb.r,rgb.g,rgb.b);var max=Math.max(rgb.r,rgb.g,rgb.b);var delta=max-min;hsb.b=max;hsb.s=max!==0?255*delta/max:0;if(hsb.s!==0){if(rgb.r===max){hsb.h=(rgb.g-rgb.b)/delta}else{if(rgb.g===max){hsb.h=2+(rgb.b-rgb.r)/delta}else{hsb.h=4+(rgb.r-rgb.g)/delta}}}else{hsb.h=-1}hsb.h*=60;if(hsb.h<0){hsb.h+=360}hsb.s*=100/255;hsb.b*=100/255;return hsb}function hex2rgb(hex){hex=parseInt(((hex.indexOf("#")>-1)?hex.substring(1):hex),16);return{r:hex>>16,g:(hex&65280)>>8,b:(hex&255)}}$(document).on("mousedown.minicolors touchstart.minicolors",function(event){if(!$(event.target).parents().add(event.target).hasClass("minicolors")){hide()}}).on("mousedown.minicolors touchstart.minicolors",".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider",function(event){var target=$(this);event.preventDefault();$(document).data("minicolors-target",target);move(target,event,true)}).on("mousemove.minicolors touchmove.minicolors",function(event){var target=$(document).data("minicolors-target");if(target){move(target,event)}}).on("mouseup.minicolors touchend.minicolors",function(){$(this).removeData("minicolors-target")}).on("mousedown.minicolors touchstart.minicolors",".minicolors-swatch",function(event){var input=$(this).parent().find(".minicolors-input"),minicolors=input.parent();if(minicolors.hasClass("minicolors-focus")){hide(input)}else{show(input)}}).on("focus.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}show(input)}).on("blur.minicolors",".minicolors-input",function(event){var input=$(this),settings=input.data("minicolors-settings");if(!input.data("minicolors-initialized")){return}input.val(parseHex(input.val(),true));if(input.val()===""){input.val(parseHex(settings.defaultValue,true))}input.val(convertCase(input.val(),settings.letterCase))}).on("keydown.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}switch(event.keyCode){case 9:hide();break;case 27:hide();input.blur();break}}).on("keyup.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}updateFromInput(input,true)}).on("paste.minicolors",".minicolors-input",function(event){var input=$(this);if(!input.data("minicolors-initialized")){return}setTimeout(function(){updateFromInput(input,true)},1)});

		GM_addStyle([
			".minicolors {position: relative;display: inline-block;z-index: 1;}",
			".minicolors-focus {z-index: 2;}",
			".minicolors.minicolors-theme-default .minicolors-input {margin: 0px;margin-right: 3px;border: solid 1px #CCC;font: 14px sans-serif;width: 65px;height: 16px;border-radius: 0;box-shadow: inset 0 2px 4px rgba(0, 0, 0, .04);padding: 2px;margin-right: -1px;}",
			".minicolors-theme-default.minicolors .minicolors-input {vertical-align: middle;outline: none;}",
			".minicolors-theme-default.minicolors-swatch-left .minicolors-input {margin-left: -1px;margin-right: auto;}",
			".minicolors-theme-default.minicolors-focus .minicolors-input, .minicolors-theme-default.minicolors-focus .minicolors-swatch {border-color: #999;}",
			".minicolors-hidden {position: absolute;left: -9999em;}",
			".minicolors-swatch {position: relative;width: 23px;height: 23px;margin-top: -4px;text-align: left;background: url(https://raw.github.com/claviska/jquery-miniColors/master/jquery.minicolors.png) -80px 0;border: solid 1px #CCC;vertical-align: middle;display: inline-block;}",
			".minicolors-swatch SPAN {position: absolute;width: 100%;height: 100%;background: none;display: inline-block;}",
			".minicolors-panel {position: absolute;top: 26px;left: 0;width: 173px;height: 152px;background: white;border: solid 1px #CCC;box-shadow: 0 0 20px rgba(0, 0, 0, .2);display: none;}",
			".minicolors-position-top .minicolors-panel {top: -156px;}",
			".minicolors-position-left .minicolors-panel {left: -83px;}",
			".minicolors-position-left.minicolors-with-opacity .minicolors-panel {left: -104px;}",
			".minicolors-with-opacity .minicolors-panel {width: 194px;}",
			".minicolors .minicolors-grid {position: absolute;top: 1px;left: 1px;width: 150px;height: 150px;background: url(https://raw.github.com/claviska/jquery-miniColors/master/jquery.minicolors.png) -120px 0;cursor: crosshair;}",
			".minicolors .minicolors-grid-inner {position: absolute;top: 0;left: 0;width: 150px;height: 150px;background: none;}",
			".minicolors-slider-saturation .minicolors-grid {background-position: -420px 0;}",
			".minicolors-slider-saturation .minicolors-grid-inner {background: url(https://raw.github.com/claviska/jquery-miniColors/master/jquery.minicolors.png) -270px 0;}",".minicolors-slider-brightness .minicolors-grid {background-position: -570px 0;}",
			".minicolors-slider-brightness .minicolors-grid-inner {background: black;}",
			".minicolors-slider-wheel .minicolors-grid {background-position: -720px 0;}",
			".minicolors-slider, .minicolors-opacity-slider {position: absolute;top: 1px;left: 152px;width: 20px;height: 150px;background: white url(https://raw.github.com/claviska/jquery-miniColors/master/jquery.minicolors.png) 0 0;cursor: crosshair;}",
			".minicolors-slider-saturation .minicolors-slider {background-position: -60px 0;}",
			".minicolors-slider-brightness .minicolors-slider {background-position: -20px 0;}",
			".minicolors-slider-wheel .minicolors-slider {background-position: -20px 0;}",
			".minicolors-opacity-slider {left: 173px;background-position: -40px 0;display: none;}",
			".minicolors-with-opacity .minicolors-opacity-slider {display: block;}",
			".minicolors-grid .minicolors-picker {position: absolute;top: 70px;left: 70px;width: 10px;height: 10px;border: solid 1px black;border-radius: 10px;margin-top: -6px;margin-left: -6px;background: none;}",
			".minicolors-grid .minicolors-picker SPAN {position: absolute;top: 0;left: 0;width: 6px;height: 6px;border-radius: 6px;border: solid 2px white;}",
			".minicolors-picker {position: absolute;top: 0;left: 0;width: 18px;height: 2px;background: white;border: solid 1px black;margin-top: -2px;}",
			".minicolors-inline .minicolors-input, .minicolors-inline .minicolors-swatch {display: none;}",
			".minicolors-inline .minicolors-panel {position: relative;top: auto;left: auto;display: inline-block;}",
			".minicolors-input[disabled='disabled'] {background:#ebebeb; color:#666666 !important;}"
			].join("\n"));

		$('.minicolors-input').minicolors();
	}

	$.cssHooks.backgroundColor = {
		get: function(elem) {
			if (elem.currentStyle)
				var bg = elem.currentStyle["backgroundColor"];
			else if (window.getComputedStyle)
				var bg = document.defaultView.getComputedStyle(elem,
					null).getPropertyValue("background-color");
			if (bg.search("rgb") == -1)
				return bg;
			else {
				bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				function hex(x) {
					return ("0" + parseInt(x).toString(16)).slice(-2);
				}
				return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			}
		}
	}

	// Easy clean of all script settings
	function resetSettings() {
		var keys = GM_listValues();
		for (var i=0, key=null; key=keys[i]; i++) {
			GM_deleteValue(key);
		}
	}
	// resetSettings();
})(jQuery);