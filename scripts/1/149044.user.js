// ==UserScript==
// @name           CursedTwitter 5.2
// @namespace      luft2501.chicappa.jp
// @description    Additional keyboard shortcuts and view tweaks.
// @include        *twitter.com*
// @grant          GM_getValue
// @grant          GM_setValue
// @require		   http://code.jquery.com/jquery-1.6.4.min.js
// ==/UserScript==
//　

//---- common functions. ----

var selfScreenName;

/**
 * Get self screen name from global navigation.
 * 
 * @param	void
 * @return	void
 */
function getSelfScreenName() {
	var name;
	var t = $('li#user-dropdown.me > ul.dropdown-menu > li.current-user > a.account-summary > div.content > div.account-group');
	t.length > 0 ? name = t.attr('data-screen-name') : name = '';
	selfScreenName = name;
}

/**
 * Check whether active element is for input or not.
 * 
 * @param	void
 * @return	bool
 */
function checkActiveElement() {
	return document.activeElement.nodeName == 'INPUT' || document.activeElement.nodeName == 'TEXTAREA' ? true : false;
}

/**
 * Judge URL Types.
 * 
 * @param	string
 * @return	string
 */
function judgeUrlTypes(url) {
	if (!url) url = location.href;
	var tmp1 = url.split('://');
	var tmp2 = tmp1[1].split('/');
	var domain = tmp2[0];
	var filename = tmp2[tmp2.length-1];
	var type;
	
	switch (domain) {
	case 'twitter.com':
		if (url.indexOf('status') != -1) {
			type = 'status';
		} else if (url.indexOf('connect') != -1) {
			type = 'connect';
		} else if (url.indexOf('search') != -1) {
			type = 'search';
		} else if (url.indexOf('activity') != -1) {
			type = 'activity';
		} else if (url.indexOf('favorites') != -1) {
			type = 'favorites';
		} else if (url.indexOf('settings') != -1) {
			type = 'settings';
		} else {
			if ($('div.mini-profile').length > 0) {
				type = 'home';
			} else if ($('div.profile-card').length > 0) {
				type = 'profile';
			} else if ($('div.follow-card').length > 0) {
				type = 'list';
			} else {
				type = 'twitter';
			}
		}
		break;
	case 'movapic.com':
		type = 'movapic';
		break;
	case 'gyazo.com':
		type = 'gyazo';
		break;
	case 'path.com':
		type = 'path';
		break;
	case 'p.twipple.jp':
		type = 'twipple';
		break;
	case 'togetter.com':
		type = 'togetter';
		break;
	case 'miil.me':
		if (url.indexOf('/p') != -1) type = 'miil'
		break;
	case 'tmblr.co':
		type = 'tumblr';
		break;
	default:
		if (filename.indexOf('gif') != -1
		 || filename.indexOf('jpg') != -1
		 || filename.indexOf('jpeg') != -1
		 || filename.indexOf('png') != -1) {
			type = 'image';
		} else if (domain.indexOf('tumblr.com') != -1) {
			type = 'tumblr';
		} else if (domain.indexOf('favstar.fm') != -1 && !(url.indexOf('/t/') != -1 && url.indexOf('status') != -1)) {
			type = 'favstar';
		} else {
			type = 'others';
		}
		break;
	}
	
	return type;
}

/**
 * Send click event to specified node.
 * 
 * @param	node
 * @return	void
 */
function sendClick(node) {
	if (!node) return false;
	
	var mev = document.createEvent('MouseEvents');
	mev.initEvent('click', true, true);
	node.dispatchEvent(mev);
}

/**
 * Extract URL from specified node.
 * 
 * @param	string	ttn
 * @return	string	URL
 */
function extractUrl(ttn) {
	var result = '';
	var nodes = ttn[0].childNodes;
	
	for (i = 0; i < nodes.length; i++) {
		//result += '('+i+')'+nodes[i].nodeName+'.'+nodes[i].className+' / ';
		if (nodes[i].nodeName == 'A') {
			if (nodes[i].className.indexOf('twitter-timeline-link') != -1) {
				result += nodes[i].getAttribute('href');
			} else {
				result += nodes[i].innerHTML.stripTags();
			}
		} else if (nodes[i].nodeName == 'BR') {
			result += "\n";
		} else {
			result += nodes[i].nodeValue;
		}
	}
	
	return result;
}

/**
 * Strip tags (String prototype)
 */
String.prototype.stripTags = function(str) { return this.replace(/<\/?[^>]+>/gi, ''); };

/**
 * for debug.
 * 
 * @param	string
 * @return	void
 */
function printToSearchQuery(str) {
	if (str != '') {
		$('#search-query').val(str);
	} else {
		var d = new Date();
		$('#search-query').val(d.toString());
	}
}

//---- functions for scripts purposes. ----

/**
 * Touch new-tweets-bar.
 *
 * @param	void
 * @return	void
 */
function touchNewTweetsBar() {
	$('div.new-tweets-bar').length > 0
	? sendClick($('div.new-tweets-bar')[0])
	: void(0);
}

/**
 * font tweaks.
 * 
 * @param	void
 * @return	void
 */
function fontTweaks() {
	$('.twitter-anywhere-tweet-box-editor').css('font-size', '12px !important');
	
	$('.bio').css('font-style', 'normal');
	if (judgeUrlTypes(location.href) != 'status') $('p.js-tweet-text').css('font-size', '11px');
	if (judgeUrlTypes(location.href) == 'home') {
		$('div.content > p.js-tweet-text').css('margin', '4px 0 8px 0');
		$('div.content > p.js-tweet-text > a.twitter-atreply > b').css('font-weight', 'bold');
	}
	
	if (judgeUrlTypes(location.href) == 'connect'
	 || judgeUrlTypes(location.href) == 'profile'
	 || judgeUrlTypes(location.href) == 'list'
	 || judgeUrlTypes(location.href) == 'favorites'
	 || judgeUrlTypes(location.href) == 'twitter'
	 || judgeUrlTypes(location.href) == 'search'
	 || judgeUrlTypes(location.href) == 'home') {
		//$('div.tweet > div.content > p.js-tweet-text').css('margin', '-18px 0 0 0');
		$('div.account > div.content > p.bio').css('margin', '-18px 0 0 0');
		$('div.simple-tweet > div.content > p.js-tweet-text').css('margin', '4px 0 8px 0');
		$('div.stream-item-activity-line').css('font-size', '10px');
		/*$('div.tweet').css('margin-top', '8px');*/
		$('div.tweet-text').css('white-space', 'normal');
		$('div.tweet-text').css('font-size', '11px');
		$('div.tweet-text').css('color', '#666');
		$('div.tweet-text').css('line-height',  '150%');
		$('div.tweet-row').css('border', '1px solid rgba(220, 220, 220, 0.5)');
		$('div.tweet-row').css('border-radius', '5px');
		$('div.tweet-row').css('padding', '8px');
		$('div.tweet-row').css('background-color', 'rgb(230, 230, 230)');
	}
	
	if (judgeUrlTypes(location.href) == 'connect') $('div.tweet-row').css('width', '400px');
	
	$('strong.fullname').css('font-size', '12px');
	
	$('span.js-retweet-text').css('font-size', '10px');
	$('span.expand-stream-item').css('font-size', '10px');
	$('span.expand-stream-item').css('margin-top', '-2px');
	$('a.with-icn > b').css('font-size', '10px');
	$('a.with-icn > i').css('margin-top', '2px');
	$('a.with-icn > span.details-icon > i').css('margin-top', '2px');
}

/**
 * text tweaks.
 * 
 * @param	void
 * @return	void
 * 
 */
function textTweaks() {
	$('span.expand-action-wrapper').text('[+]');
	$('span.collapse-action-wrapper').text('[-]');
	
	$('.bio').each(function(ix, b){
		if (b.className.indexOf('checked') == -1) {
			var biotext = b.innerHTML;
			b.innerHTML = biotext.replace(/\r\n/g, "<br />\n").replace(/(\n|\r)/g, "<br />\n");
			$(b).addClass('checked');
		}
	});
}

/**
 * post tweaks.
 * 
 * @param	void
 * @return	void
 */
function postTweaks() {
	$('.stream-item').each(function(ix, i){
		if (i.className.indexOf('checked') == -1) {
			$(i).addClass('checked');
			
			// [TEST] anonymous mode
			if ($('#CT-anonymous-mode:checked').length > 0) streamItemData(i).itemHeader.hide();
			
			// mutes.
			if (streamItemData(i).screenNameStr != selfScreenName) {
				var ngs = new Array();
				if ($('#CT-ng-words-current').length > 0) {
					ngs = $('#CT-ng-words-current').val().split(',');
				} else if (GM_getValue('CT_ngWordText').length > 0) {
					ngs = GM_getValue('CT_ngWordText').split(',');
				}
				
				if (ngs.length > 0) {
					ngs.forEach(function(ng){
						if (streamItemData(i).tweetText.toLowerCase().indexOf(ng) != -1
						 || streamItemData(i).screenNameStr.toLowerCase().indexOf(ng) != -1) {
							$(i).addClass('muted');
							$(i).css('height', '56px');
							$(i).css('padding-top', '16px');
							i.innerHTML = '<span style="font-size:11px;margin-left:68px;">[- '+streamItemData(i).screenNameStr+'] '+ng+'</span>';
						}
					});
				}
			}
			
			// enpowering linebreaks.
			if (streamItemData(i).tweetTextNode.length > 0) {
				var replaced = streamItemData(i).tweetText.replace(/\r\n/g, "<br />\n");
				streamItemData(i).tweetTextNode[0].innerHTML = replaced.replace(/(\n|\r)/g, "<br />\n");
				//streamItemData(i).streamItemFooter.css('margin-top', '-20px');
			}
		}
		
	});
	
	/**
	 * add icon to footer
	 * 
	 * @param	node jquery obj
	 * @param	string
	 * @return	void
	 */
	function addIcon(nj, type) {
		switch (type) {
		case 'photo':
			dmc = 'photo';
			sm = 'image';
			break;
		case 'media':
			dmc = 'generic';
			sm = 'embed';
			break;
		}
		
		nj.iconContainer.append(mediaIcon(type, dmc, sm));
		nj.expandActionWrapper.addClass('icon-added');
		nj.collapseActionWrapper.addClass('icon-added');
	}
	
	/**
	 * HTML tags template for adding media icons.
	 * 
	 * @param	string
	 * @param	string
	 * @param	string
	 * @return	string
	 */
	function mediaIcon(type, dmc, sm) {
		return '<i data-media-type="'+type+'" data-media-class="'+dmc+'" class="js-sm-icon sm-'+sm+'"></i>';
	}
}

/**
 * setting control panel.
 * 
 * @param	void
 * @return	void
 */
function setControlPanel() {
	if (judgeUrlTypes(location.href) == 'home' && $('div.wtf-module').length > 0) {
		$('div.mini-profile').after(controlPanelBody());
		$('#CT-ng-words-current').blur(function(){ location.reload(); });
		$('#CT-ng-words-current').keyup(function(){ saveSettings(); });
		$('#CT-anonymous-mode').click(function(){ saveSettings(); });
		clearInterval(timerSettingControlPanel);
		$('div.big-avatar-list').hide();
	}
}

/**
 * control panel body HTML tags.
 * 
 * @param	void
 * @return	string
 */
function controlPanelBody() {
	var ngWords = GM_getValue('CT_ngWordText') != undefined ? GM_getValue('CT_ngWordText') : '';
	var amon = GM_getValue('CT_anonymousMode') != undefined ? GM_getValue('CT_anonymousMode') : '';
	var keyGuides = new Array();
	keyGuides.push('[?] Guide to official shortcuts.');
	keyGuides.push('[a] Touch try-again-link on load failure.');
	keyGuides.push('[H] Force reload home. (shift+h).');
	keyGuides.push('[M] Me. (shift+m).');
	keyGuides.push('[i] Open links focused tweet in new tabs.');
	keyGuides.push('[P] Open profile page of tweeter(shift+p).');
	keyGuides.push('[p] Open profile sub window of tweeter.');
	keyGuides.push('[q] Prepare QT focused tweet.');
	keyGuides.push('[Q] Prepare comment with post w/URL(shift+q).');
	keyGuides.push('[s] Toggle other favs/RTs in "connect".');
		
	var tags
	= '<div class="component" data-component-term="cursed_twitter_control_panel">'
		+'<div class="module">'
			+'<div class="flex-module">'
				+'<div class="flex-mofule-header">'
					+'<h3>Cursed twitter Control</h3>'
				+'</div>'
				+'<div class="flex-module-inner" style="padding-top:8px;" data-section-id="ctc">'
					+'<div class="ngwords">'
						+'<div class="text-area" style="padding-right:12px;">'
							+'<h4>NG words:</h4>'
							+'<div>please dont type directly in this field. tweet box is good for it, cut and paste here. and if you put alphabets in this, lowercase will be better.</div>'
							+'<textarea id="CT-ng-words-current" class="twitter-anywhere-tweet-box-editor" style="width:100%;">'
								+ngWords
							+'</textarea>'
						+'</div>'
					+'</div>'
					+'<div style="padding-top:8px;">[Key guide]<br/>'+keyGuides.join('<br/>')+'</div>'
					+'<div style="padding-top:8px;"><input type="checkbox" id="CT-anonymous-mode" '+amon+'> [TEST] Anonymous Mode</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>'
	
	return tags;
}

/**
 * indicate ratio muted/all.
 * 
 * @param	void
 * @return	void
 */
function satzbutzGauge() {
	var muted = $('.muted').length;
	var checked = $('.checked').length;
	
	if ($('#satzbutz').length == 0) {
		$('div.mini-profile > div.tweet-box').append(satzbutzGaugeBody());
		$('div.search-nav > ul.js-items-container > li.js-sidenav-link[data-name="searchResults"] > a').append(satzbutzGaugeBody());
	}
	updateSatzbutzGauge(muted, checked);
}

/**
 * satzbutz gauge body.
 * 
 * @param	void
 * @return	string
 */
function satzbutzGaugeBody() {
	var tags
	= '<div id="satzbutz" align="center" style="padding:4px 0 4px 0;">'
		+'<div id="satzbutz-gauge" style="border:dotted 1px #AAA;width:100%;height:16px;">'
			+'<div id="satzbutz-darkmatter" style="float:left;background-color:rgb(37, 37, 37);background-image:url(\'../img/twitter_web_sprite_bgs.png\');background-repeat:repeat-x;height:100%;">&nbsp;</div>'
			+'<div id="satzbutz-clearsky" style="float:right;background-color:rgb(255, 255, 255);height:100%;">&nbsp;</div>'
			+'<div style="clear:both;"/>'
		+'</div>'
		+'<div id="satzbutz-numeric" style="padding-top:4px;"></div>'
	+'</div>'
	
	return tags;
}

/**
 * update satzbutz gauge
 * 
 * @param	int
 * @param	int
 * @return	void
 */
function updateSatzbutzGauge(muted, checked) {
	var ratio = Math.round(muted / checked * 10000) / 100;
	var clearsky = 100 - ratio;

	if ($('div.mini-profile > div.tweet-box > form.tweet-form > div.tweet-content > textarea.tweet-box').length > 0)
	$('div.mini-profile > div.tweet-box > form.tweet-form > div.tweet-content > textarea.tweet-box').hide();
	if ($('div.mini-profile > div.tweet-user > div.tweet-box').length > 0) 
	$('div.mini-profile > div.tweet-user > div.tweet-box').hide();
	$('#satzbutz-darkmatter').css('width', ratio+'%');
	$('#satzbutz-clearsky').css('width', clearsky+'%');
	$('#satzbutz-numeric').text(muted+' / '+checked+' ( '+ratio+' % )');
}

/**
 * save settings.
 * 
 * @param	void
 * @return	void
 */
function saveSettings() {
	GM_setValue('CT_ngWordText', $('#CT-ng-words-current').length > 0 ? $('#CT-ng-words-current').val() : '');
	GM_setValue('CT_anonymousMode', $('#CT-anonymous-mode:checked').length > 0 ? 'checked="checked"' : '');
}

/**
 * specify focused stream item.
 * 
 * @param	void
 * @return	node
 */
function focusedStreamItem() {
	var node;
	$('.stream-item').each(function(ix, i){
		var bgc = $(i).css('background-color');
		// bgcolor != default && != muted.
		if (bgc != 'rgb(255, 255, 255)') node = i;
	});
	
	return node;
}

/**
 * specify open and hovered stream item.
 * 
 * @param	void
 * @return	node
 */
function openAndHoveredStreamItem() {
	var node;
	$('.stream-item').each(function(ix, i){
		if ($(i).hasClass('open') && $(i).hasClass('js-had-hovered-stream-item')) node = i;
	});
	
	return node;
}

/**
 * extract specified node from stream item.
 * 
 * @param	node
 * @return	object
 */
function streamItemData(item) {
	return {
		screenName:				$(item).find('a.account-group'), 
		screenNameStr:			$(item).find('a.account-group > span.username > b').text(),
		itemHeader:				$(item).find('div.stream-item-header'), 
		permalink:				$(item).find('a.js-permalink'), 
		tweetTextNode:			$(item).find('div.content > p.js-tweet-text'), 
		tweetText:				$(item).find('div.content > p.js-tweet-text').length == 0 ? '' : $(item).find('div.content > p.js-tweet-text')[0].innerHTML, 
		links:					$(item).find('p.js-tweet-text > a.twitter-timeline-link'), 
		iconContainer:			$(item).find('span.js-icon-container'), 
		streamItemFooter:		$(item).find('div.stream-item-footer'), 
		expandActionWrapper:	$(item).find('span.expand-action-wrapper'), 
		collapseActionWrapper:	$(item).find('span.collapse-action-wrapper'), 
		replyBtn:				$(item).find('div.js-original-tweet > div.content > div.stream-item-footer > ul > li > a.js-action-reply')
	};
}

/**
 * functions fired in intervals.
 *
 * @param	void
 * @return	void
 */
function intervals() {
	//printToSearchQuery();
	touchNewTweetsBar();
	fontTweaks();
	textTweaks();
	postTweaks();
	satzbutzGauge();
	if (!checkActiveElement()) sendClick($('div#page-container')[0]);
}

/**
 * key-bound functions.
 * 
 * @param	event
 * @return	void
 */
function keyBound(ev) {
	setTimeout(function(){
		//printToSearchQuery(ev.keyCode);
		fontTweaks();
		textTweaks();
		postTweaks();
		if (!checkActiveElement()) keyNavs(ev);
	}, 0.5 * 1000);
}

/**
 * additional keyboard navigations.
 * 
 * @param	event
 * @return	void
 */
function keyNavs(ev) {
	//printToSearchQuery(ev.keyCode);
	switch (ev.keyCode) {
		// [enter/space]----------------------
		case 13:
		case 32:
			setTimeout(function(){$('body')[0].focus();}, 0.5 * 1000);
			break;
		// [esc]------------------------------
		case 27:
			if ($('a.dismiss').length > 0) {
				$('a.dismiss').each(function(ix, a){
					sendClick(a);
				});
			}
			break;
		// [a]--------------------------------
		case 65:
			if ($('a.try-again-after-whale').length > 0) sendClick($('a.try-again-after-whale')[0]);
			break;
		// [h]--------------------------------
		case 72:
			if (ev.shiftKey) location.href = '/';
			break;
		// [i]--------------------------------
		case 73:
			openTwitterTimelineLinks();
			break;
		// [m]--------------------------------
		case 77:
			if (ev.shiftKey) location.href = '/'+selfScreenName;
			break;
		// [n]--------------------------------
		case 78:
			setTimeout(function(){
				$('.twitter-anywhere-tweet-box-editor').css('font-size', '12px !important');
				$('.twitter-anywhere-tweet-box-editor').css('font-family', 'Lato !important');
			}, 1 * 1000);
			break;
	    // [p]--------------------------------
	    case 80:
	    	ev.shiftKey ? gotoProfilePage() : openProfile();
	    	break;
	    // [q]--------------------------------
	    case 81:
	    	ev.shiftKey ? preparePostWithPostUrl() : prepareQt();
	    	break;
	    // [r]--------------------------------
	    case 82:
	    	if (judgeUrlTypes(location.href) == 'connect' || judgeUrlTypes(location.href) == 'twitter') prepareInlineReply();
	    	break;
	    // [s]--------------------------------
	    case 83:
	    	toggleOtherFavsRts();
	    	break;
	}
	
	/**
	 * open links in tweet text in another tabs.
	 * 
	 * @param	void
	 * @return	void
	 */
	function openTwitterTimelineLinks() {
		//printToSearchQuery('');
		var f = focusedStreamItem() || openAndHoveredStreamItem();
		if (!f) return false;
		streamItemData(f).links.each(function(ix, i){
			navigator.userAgent.indexOf('Firefox') != -1
			? GM_openInTab($(i).attr('href'))
			: window.open($(i).attr('href'));
		});
	}
	
	/**
	 * go to focused post owners profile page.
	 * 
	 * @param	void
	 * @return	void
	 */
	function gotoProfilePage() {
		//printToSearchQuery('');
		var f = focusedStreamItem() || openAndHoveredStreamItem();
		if (!f) return false;
		location.href = streamItemData(f).screenName.attr('href');
	}
	
	/**
	 * open profile window.
	 * 
	 * @param	void
	 * @return	void
	 */
	function openProfile() {
		//printToSearchQuery('');
		var f = focusedStreamItem() || openAndHoveredStreamItem();
		if (!f) return false;
		//printToSearchQuery(streamItemData(f).screenName[0].nodeName);
		sendClick(streamItemData(f).screenName[0]);
	}
	
	/**
	 * prepare post like (comment) :: (URL of focused post)
	 * 
	 * @param	void
	 * @return	void
	 */
	function preparePostWithPostUrl() {
		//printToSearchQuery('');
		var f = focusedStreamItem() || openAndHoveredStreamItem();
		if (!f) return false;

		var l = location;
		var u = 'http://twitter.com/share?text= :: https://twitter.com'+encodeURIComponent(streamItemData(f).permalink.attr('href'));
		if (!window.open(u,'t','toolbar=0,resizable=0,status=1,width=540,height=440')) l.href = u;
		void(0);
	}
	
	/**
	 * prepare inline reply on "connect" page.
	 * 
	 * @param	void
	 * @return	void
	 */
	function prepareInlineReply() {
		//printToSearchQuery('reply?');
		var f = focusedStreamItem();
		if (!f) return false;
		
		sendClick(streamItemData(f).replyBtn[0]);
	}
	
	/**
	 * prepare QT post.
	 * 
	 * @param	void
	 * @return	void
	 */
	function prepareQt() {
		//printToSearchQuery('');
		var f = focusedStreamItem() || openAndHoveredStreamItem();
		if (!f) return false;

		var l = location;
		var t;
		t = extractUrl(streamItemData(f).tweetTextNode).replace(/\s{2,}/gi, "");
		var u = 'http://twitter.com/share?text= QT @'+streamItemData(f).screenNameStr+': '+encodeURIComponent(t);
		if (!window.open(u,'t','toolbar=0,resizable=0,status=1,width=540,height=440')) l.href = u;
		void(0);
	}
	
	/**
	 * toggle other favs ans RTs in "connect" page.
	 * 
	 * @param	void
	 * @return	void
	 */
	function toggleOtherFavsRts() {
		if (judgeUrlTypes(location.href) != 'connect') return false;
		
		var f = focusedStreamItem();
		if (!f) return false;
		
		$(f).find('span.show-text').length > 0
		? sendClick($(f).find('span.show-text')[0])
		: sendClick($(f).find('span.hide-text')[0]);
	}
}

//---- main routines. ----

//intervals();
//keyBound();
getSelfScreenName();
$(document).keyup(keyBound);
timerSettingControlPanel = setInterval(setControlPanel, 5 * 1000);
setInterval(intervals, 5 * 1000);

//when whale comes up.
if ($('img.whale').length > 0 || $('img.robot').length > 0) setTimeout(function(){location.reload();}, 1 * 1000);