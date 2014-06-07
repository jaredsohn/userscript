// ==UserScript==
// @name            IMO Plus
// @version         0.1.2
// @author          Festum
// @namespace       http://femium.com
// @description     Makes IMO.IM more intuitive.
// @include         http*://imo.im/*
// ==/UserScript==
 // Imo style from 109937
var imostyle="div#buddypanel div.bar { font-size: 11px !important; }	div#buddypanel div.bar.grey { height: 14px !important; line-height: 14px !important; }	div#buddypanel div.blist-container.icon_view .buddyitem img.icon { width: 20px !important; padding: 0px !important; }	div#buddypanel div.blist-container.icon_view .buddyitem span.imgwrap { height: 18px !important; line-height: 18px !important; }	div#buddypanel div.blist-container.icon_view .buddyitem { height: 18px !important; line-height: 18px !important; }	div#buddypanel div.bar.grey span.button { height: 14px !important; border-left: 0px !important; border-right: 0px; }	div#buddypanel div.bar.grey .button img.sprite_icn_expand { margin: 0px 3px 0px 0px !important; }	div#buddypanel div.bar.grey .button img.sprite_icn_collapse { margin: 0px 5px 0px 0px !important; }	div#buddypanel div.bar.grey .sprite_icn_favorite { margin: 1px 4px 4px 5px !important; }	div#buddypanel div.bar.grey.sprite_group_header { border-left:0px !important; }";
imostyle+="div#account-bar { width:500px !important; }	div#account-bar span.account-status { width:310px !important; }	.promo-display{ display:none !important; }	div.bar.white span.button > img { margin-top:0px !important; margin-bottom:0px !important; }";
// adjust height of group buttons
imostyle+="div.bar.white { height:14px !important; line-height:14px !important; }";
// adjust icons at buddy lines
imostyle+="div#buddypanel div.blist-container.icon_view .buddyitem .control_container .control_buttons .control_button { margin-top:0px !important; }";
// adjust margin around online logo
imostyle+="div#buddypanel div.blist-container .buddyitem .buddyimg { margin: 0 3px !important; }";
imostyle+="div#main { background-color:#333333; }	 div.buddyicon_pol img { width:120px;height:120px;}";
GM_addStyle(imostyle);
function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js');
    script.addEventListener('load', function() {
	var script = document.createElement('script');
	script.textContent = '(' + callback.toString() + ')();'
	document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    // DISABLE THE $ GLOBAL ALIAS //
    jQuery.noConflict();
	// FOR JQUERY SCRIPTS //
	(function ($) {
		jQuery(document).ready(function () {
			setTimeout(pageStart, 1000);
			var saveBkg = null;
			$(document).keypress(function (e) {
				if (e.which == 13) {
					setTimeout(pageStart, 1000);
				}
			});
			$('#splash_imo_signin').bind('click', function () {
				setTimeout(pageStart, 1000);
			});
			function pageStart() {
				var savedBkg = getCookie('imoBoost');
				// LOAD BACKGROUND COLOR //
				if (savedBkg == null || savedBkg == 'undefined' || savedBkg == '') {
					setCookie('imoBoost', '#333333', true);
					$('div#imo div#body div#main').css('background-color', '#333333');
				} else {
					$('#main').css('background-color', savedBkg);
				}
				// BACKGROUND COLOR SELECT //
				var backgroundOptions = ['Alice Blue', 'Antique White', 'Aqua', 'Aqua Marine', 'Azure', 'Beige', 'Bisque', 'Black', 'Blanched Almond', 'Blue', 'Blue Violet', 'Brown', 'Burly Wood', 'Cadet Blue', 'Chartreuse', 'Chocolate', 'Coral', 'Cornflower Blue', 'Cornsilk', 'Crimson', 'Cyan', 'Dark Blue', 'Dark Cyan', 'Dark Golden Rod', 'Dark Gray', 'Dark Khaki', 'Dark Magenta', 'Dark Olive Green', 'Dark Orange', 'Dark Orchid', 'Dark Red', 'Dark Salmon', 'Dark Sea Green', 'Dark Slate Blue', 'Dark Slate Gray', 'Dark Turquoise', 'Dark Violet', 'Deep Pink', 'Dim Gray', 'Dodger Blue', 'Fire Brick', 'Floral White', 'Forest Green', 'Fuchsia', 'Gainsboro', 'Gold', 'Golden Rod', 'Gray', 'Green', 'Green Yellow', 'Honey Dew', 'Hot Pink', 'Indian Red', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'Lavender Blush', 'Lawn Green', 'Lemon Chiffon', 'Light Blue', 'Light Coral', 'Light Cyan', 'Light Golden Rod Yellow', 'Light Gray', 'Light Green', 'Light Pink', 'Light Salmon', 'Light Sea Green', 'Light Sky Blue', 'Light Slate Gray', 'Light Steel Blue', 'Light Yellow', 'Lime', 'Lime Green', 'Linen', 'Magenta', 'Maroon', 'Medium Aqua Marine', 'Medium Blue', 'Medium Orchid', 'Medium Purple', 'Medium Sea Green', 'Medium Slate Blue', 'Medium Spring Green', 'Medium Turquoise', 'Medium Violet Red', 'Midnight Blue', 'Mint Cream', 'Misty Rose', 'Moccasin', 'Navajo White', 'Navy', 'Old Lace', 'Olive', 'Olive Drab', 'Orange', 'Orange Red', 'Orchid', 'Pale Golden Rod', 'Pale Green', 'Pale Turquoise', 'Pale Violet Red', 'Papaya Whip', 'Peach Puff', 'Plum', 'Pink', 'Powder Blue', 'Purple', 'Red', 'Rosy Brown', 'Royal Blue', 'Saddle Brown', 'Salmon', 'Sandy Brown', 'Sea Green', 'Sea Shell', 'Sienna', 'Silver', 'Sky Blue', 'Slate Blue', 'Slate Gray', 'Slate Grey', 'Snow', 'Spring Green', 'Steel Blue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'White Smoke', 'Yellow', '#333'];
				$('span.translation_span:contains("Preferences")').closest('div').attr('id', 'prefBtn');
				$('#prefBtn').click(function () {
					$('.preference-widget').prepend('<div class="pref-section" id="backgroundColorSet"><div class="pref-section-title"><span class="translation_span">Background Color</span></div><div class="pref-option"><select id="changeBackground"></select></div></div>');
					$('.save-button').attr('id', 'betterSaveButton');
					$.each(backgroundOptions, function (val, text) {
						val = text;
						var trimText = text.replace(/ /g, '');
						$('#changeBackground').append($('<option></option>').val(trimText).html(text));
					});
					savedBkg = getCookie('imoBoost');
					$('select option[value="' + savedBkg + '"]').attr('selected', 'selected');
					$('#changeBackground').change(function () {
						$('option').click(function () {
							$('option').removeAttr('selected');
							$(this).attr('selected', 'selected');
						});
						var newBackgroundColor = $('#changeBackground option:selected').attr('value');
						$('div#imo div#body div#main').css('background-color', newBackgroundColor);
					});
					// CLOSE PREFERENCES //
					$('.cancel-button, .sprite_icn_close_2, .modal-popup-overlay').bind('click', function () {
						closePref();
					});
					function closePref() {
						savedBkg = getCookie('imoBoost');
						$('div#imo div#body div#main').css('background-color', savedBkg);
						$('#backgroundColorSet').remove();
					}
					// SAVE BACKGROUND COLOR //
					$('#betterSaveButton').bind('click', function () {
						savePref();
					});
					$('#backgroundColorSet').keypress(function (e) {
						if (e.which == 13) {
							savePref();
						}
						return false;
					});
					function savePref() {
						var newBackgroundColor = $('#changeBackground option:selected').attr('value');
						setCookie('imoBoost', newBackgroundColor, true);
						$('#betterSaveButton').unbind();
						$('#backgroundColorSet').remove();
					}
				});
				// COOKIE MONSTER //
				function setCookie(c_name, value, exdays) {
					var exdate = new Date();
					exdate.setDate(exdate.getDate() + exdays);
					var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
					document.cookie = c_name + "=" + c_value;
				}
				function getCookie(c_name) {
					var i, x, y, ARRcookies = document.cookie.split(";");
					for (i = 0; i < ARRcookies.length; i++) {
						x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
						y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
						x = x.replace(/^\s+|\s+$/g, "");
						if (x == c_name) {
							return unescape(y);
						}
					}
				}
				// ADD STYLES TO HEADER - KEEP THIS LAST //
				$('head').append('<style type="text/css">.me span.na{color:#D35900;} .bk0 span.na{color:#0163B3;}div.bar.white{height:20px;line-height:20px;font-size:14px;}div#buddypanel div.bar.white .button img.sprite_icn_expand{margin:3px 0;}div#buddypanel div.bar.white .button img.sprite_icn_collapse{margin:3px 0}div#buddypanel div.blist-container{font-size:12px;}div#buddypanel div.blist-container .buddyitem{height:15px;}.buddygrouplist{padding-left:10px;}.convlogitem{padding:4px}.convlog .ts-container{width:57px;}.ms span{line-height:17px;}#window_container .floatingwindowholder div.focused div.titlebar{background-color:#333;color:#fff;}#window_container .floatingwindowholder div.floatingwindow div.titlebar div.titleicon{padding:5 0;}.focused .convpanel div.convmain div.convbottom{background-color:#333;color:#fff;}div#imo div#window_container div.floatingwindowholder div.floatingwindow{border-color:#eee; border-radius:5px;}.convlog{border-color:#333;  bottom:68px; height:auto;}.convpanel .convbuttons{border:1px #333 solid;}.convpanel div.convmain{border:1px #333 solid;}.sprite_btn_send,#play{display:none;}.convpanel div.convmain div.convbottom div.convinput{right:0;height:50px;}.convpanel div.convmain div.convbottom{height:70px;}#window_container .floatingwindowholder div.floatingwindow div.windowbody .convpanel .convmain .convbottom{opacity:1;}div#imo div#window_container div.floatingwindowholder, div#imo div#window_container div.floatingwindowholder div.floatingwindow{min-height:340px; border-radius:5px; border-width:1px;}div.floatingwindowholder{min-width:365px !important;}div#imo div#window_container div.floatingwindowholder div.floatingwindow{box-shadow:2px 2px 20px 2px #000;}.convlog-msgs .na:after{content: ":" ;}.sys_offline{padding:2px 0;}.convpanel div.convmain div.convbottom div.convinput div.convinput-text-container textarea{height:49px;}.convpanel div.convmain div.convbottom div.convinput div.convinput-text-container{right:3px;}.convlog .ts-container, .convlog .ts{font-size:9px;}.voiceim_toggle{display:none;}</style>');
			}
			// Add down and up
			body.addEventListener("keydown", function (evt) {
				// Dirty hack, but Chrome doesn't like accessing the globals
				// apparently.  Consider revising?
				if (evt.keyCode == 33 && !evt.ctrlKey) {
					location.assign(
						"javascript:IMO.WM.TWM.focus_prev();IMO.WM.FWM.focus_prev();");
				} else if (evt.keyCode == 34 && !evt.ctrlKey) {
					location.assign(
						"javascript:IMO.WM.TWM.focus_next();IMO.WM.FWM.focus_next();");
				}
			}, false);
			// END DOCUMENT READY //
		});
		//emoticons from 135848
		var emoticon_height = 15;
		var end_img = '" height="'+emoticon_height+'px">';
		var beginning_img = '<img src="http://emoticonhq.com/';
		//Replace every known emoticon by the corresponding gif picture from emoticonhq.com
		function replaceSkypeEmoticons(content){
			content = content.replace('(angel)',     beginning_img+'images/Skype/angel.gif'+end_img);
			content = content.replace(':@',     beginning_img+'images/Skype/angry.gif'+end_img);
			content = content.replace('(hug)',     beginning_img+'images/Skype/bearhug.gif'+end_img);
			content = content.replace('(beer)',     beginning_img+'images/Skype/beer.gif'+end_img);
			content = content.replace('(blush)',     beginning_img+'images/Skype/blush.gif'+end_img);
			content = content.replace('(bow)',     beginning_img+'images/Skype/bow.gif'+end_img);
			content = content.replace('(punch)',     beginning_img+'images/Skype/boxing.gif'+end_img);
			content = content.replace('(u)',     beginning_img+'images/Skype/brokenheart.gif'+end_img);
			content = content.replace('(^)',     beginning_img+'images/Skype/cake.gif'+end_img);
			content = content.replace('(call)',     beginning_img+'images/Skype/callme.gif'+end_img);
			content = content.replace('(cash)',     beginning_img+'images/Skype/cash.gif'+end_img);
			content = content.replace('(mp)',     beginning_img+'images/Skype/cellphone.gif'+end_img);
			content = content.replace('(clap)',     beginning_img+'images/Skype/clapping.gif'+end_img);
			content = content.replace('(coffee)',     beginning_img+'images/Skype/coffee.gif'+end_img);
			content = content.replace('8-)',     beginning_img+'images/Skype/cool.gif'+end_img);
			content = content.replace(';(',     beginning_img+'images/Skype/crying.gif'+end_img);
			content = content.replace('(dance)',     beginning_img+'images/Skype/dance.gif'+end_img);
			content = content.replace('(devil)',     beginning_img+'images/Skype/devil.gif'+end_img);
			content = content.replace('(doh)',     beginning_img+'images/Skype/doh.gif'+end_img);
			content = content.replace('(d)',     beginning_img+'images/Skype/drink.gif'+end_img);
			content = content.replace('|-(',     beginning_img+'images/Skype/dull.gif'+end_img);
			content = content.replace('(emo)',     beginning_img+'images/Skype/emo.gif'+end_img);
			content = content.replace(']:)',     beginning_img+'images/Skype/evilgrin.gif'+end_img);
			content = content.replace('(flex)',     beginning_img+'images/Skype/flex.gif'+end_img);
			content = content.replace('(F)',     beginning_img+'images/Skype/flower.gif'+end_img);
			content = content.replace('(chuckle)',     beginning_img+'images/Skype/giggle.gif'+end_img);
			content = content.replace('(handshake)',     beginning_img+'images/Skype/handshake.gif'+end_img);
			content = content.replace('(happy)',     beginning_img+'images/Skype/happy.gif'+end_img);
			content = content.replace('(h)',     beginning_img+'images/Skype/heart.gif'+end_img);
			content = content.replace('(wave)',     beginning_img+'images/Skype/hi.gif'+end_img);
			content = content.replace('(inlove)',     beginning_img+'images/Skype/inlove.gif'+end_img);
			content = content.replace('(wasntme)',     beginning_img+'images/Skype/itwasntme.gif'+end_img);
			content = content.replace('(envy)',     beginning_img+'images/Skype/jealous.gif'+end_img);
			content = content.replace(':*',     beginning_img+'images/Skype/kiss.gif'+end_img);
			content = content.replace(':D',     beginning_img+'images/Skype/laughing.gif'+end_img);
			content = content.replace('(e)',     beginning_img+'images/Skype/mail.gif'+end_img);
			content = content.replace('(makeup)',     beginning_img+'images/Skype/makeup.gif'+end_img);
			content = content.replace('(mm)',     beginning_img+'images/Skype/mmm.gif'+end_img);
			content = content.replace('(~)',     beginning_img+'images/Skype/movie.gif'+end_img);
			content = content.replace('(music)',     beginning_img+'images/Skype/music.gif'+end_img);
			content = content.replace('8-|',     beginning_img+'images/Skype/nerd.gif'+end_img);
			content = content.replace('(ninja)',     beginning_img+'images/Skype/ninja.gif'+end_img);
			content = content.replace('(n)',     beginning_img+'images/Skype/no.gif'+end_img);
			content = content.replace('(nod)',     beginning_img+'images/Skype/nod.gif'+end_img);
			content = content.replace(':x',     beginning_img+'images/Skype/nospeak.gif'+end_img);
			content = content.replace('(party)',     beginning_img+'images/Skype/party.gif'+end_img);
			content = content.replace('(pi)',     beginning_img+'images/Skype/pizza.gif'+end_img);
			content = content.replace('(puke)',     beginning_img+'images/Skype/puke.gif'+end_img);
			content = content.replace('(rain)',     beginning_img+'images/Skype/rain.gif'+end_img);
			content = content.replace('(rofl)',     beginning_img+'images/Skype/rofl.gif'+end_img);
			content = content.replace(':(',     beginning_img+'images/Skype/sad.gif'+end_img);
			content = content.replace('(shake)',     beginning_img+'images/Skype/shakeno.gif'+end_img);
			content = content.replace('(skype)',     beginning_img+'images/Skype/skype.gif'+end_img);
			content = content.replace('|-)',     beginning_img+'images/Skype/sleepy.gif'+end_img);
			content = content.replace(':)',     beginning_img+'images/Skype/smile.gif'+end_img);
			content = content.replace('(smirk)',     beginning_img+'images/Skype/smirk.gif'+end_img);
			content = content.replace(':-|',     beginning_img+'images/Skype/speechless.gif'+end_img);
			content = content.replace('(*)',     beginning_img+'images/Skype/star.gif'+end_img);
			content = content.replace('(sun)',     beginning_img+'images/Skype/sun.gif'+end_img);
			content = content.replace('(sweat)',     beginning_img+'images/Skype/sweating.gif'+end_img);
			content = content.replace('(talk)',     beginning_img+'images/Skype/talking.gif'+end_img);
			content = content.replace('(think)',     beginning_img+'images/Skype/thinking.gif'+end_img);
			content = content.replace('(o)',     beginning_img+'images/Skype/time.gif'+end_img);
			content = content.replace('(yawn)',     beginning_img+'images/Skype/tired.gif'+end_img);
			content = content.replace(':p',     beginning_img+'images/Skype/tongue out.gif'+end_img);
			content = content.replace('(wait)',     beginning_img+'images/Skype/wait.gif'+end_img);
			content = content.replace('(whew)',     beginning_img+'images/Skype/whew.gif'+end_img);
			content = content.replace(';)',     beginning_img+'images/Skype/wink.gif'+end_img);
			content = content.replace(':^)',     beginning_img+'images/Skype/wondering.gif'+end_img);
			content = content.replace(':s',     beginning_img+'images/Skype/worried.gif'+end_img);
			content = content.replace('(y)',     beginning_img+'images/Skype/yes.gif'+end_img);
			content = content.replace('(bandit)',     beginning_img+'images/Skype/hiddenbandit.gif'+end_img);
			content = content.replace('(bug)',     beginning_img+'images/Skype/hiddenbug.gif'+end_img);
			content = content.replace('(drunk)',     beginning_img+'images/Skype/hiddendrunk.gif'+end_img);
			content = content.replace('(finger)',     beginning_img+'images/Skype/hiddenfinger.gif'+end_img);
			content = content.replace('(fubar)',     beginning_img+'images/Skype/hiddenfubar.gif'+end_img);
			content = content.replace('(headbang)',     beginning_img+'images/Skype/hiddenheadbang.gif'+end_img);
			content = content.replace('(mooning)',     beginning_img+'images/Skype/hiddenmooning.gif'+end_img);
			content = content.replace('(poolparty)',     beginning_img+'images/Skype/hiddenpoolparty.gif'+end_img);
			content = content.replace('(rock)',     beginning_img+'images/Skype/hiddenrockout.gif'+end_img);
			content = content.replace('(smoking)',     beginning_img+'images/Skype/hiddensmoking.gif'+end_img);
			content = content.replace('(heidy)',     beginning_img+'images/Skype/hiddensquirrell.gif'+end_img);
			content = content.replace('(swear)',     beginning_img+'images/Skype/hiddenswear.gif'+end_img);
			content = content.replace('(tmi)',     beginning_img+'images/Skype/hiddentmi.gif'+end_img);
			content = content.replace('(toivo)',     beginning_img+'images/Skype/hiddentoivo.gif'+end_img);
			return content;
		}
		//run the replace function every 0.5s
		setInterval(function() {
			$('.ms').each(function() {
				var message = $(this).html();
				var mod_message = replaceSkypeEmoticons(message);
				if (mod_message != message)
					$(this).html(mod_message);
			});
		}, 500);

	})(jQuery);
}
// Load jquery and execute main function
addJQuery(main)