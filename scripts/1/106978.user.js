// ==UserScript==
// @name           Google+ 增强脚本
// @description    Tweaks to the layout and features of Google+
// @author         Jerome Dane
// @website        http://userscripts.org/scripts/show/106166
// @version        0.015
//
// License        Creative Commons Attribution 3.0 Unported License http://creativecommons.org/licenses/by/3.0/
//
// Copyright (c) 2011 Jerome Dane
//
// Permission is hereby granted, free of charge, to any person obtaining 
// a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all 
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/106368.user.js
// @require        http://userscripts.org/scripts/source/106223.user.js
//
// @history        0.015 Improved positioning and stability of image previews 
// @history        0.015 Increased max size of previews to window height - 40 pixels 
// @history        0.015 Fixed circles view being unusable with fixed navigation enabled 
// @history        0.015 Added easy mentioning [+] symbol after profile names (enabled by default) 
// @history        0.015 "Add to circles" and "in circles" button now fixed on profile pages for fixed nav (thanks Matt Kruse) 
// @history        0.015 Fixed inability to scroll profile columns when using fixed navigation and small windows (thanks Terry May)
// @history        0.014 Added fast mute option to add a mute button and remove muted notice 
// @history        0.014 Removed post buttons option 
// @history        0.013 Added favicon badge to show number of new notices 
// @history        0.012 Added option to fix navigation elements 
// @history        0.011 Fixed stretching of images in previews to 400px when the original is smaller
// @history        0.011 Preview images now work on hangout notice avatars
// @history        0.010 Prevented execution of script within iFrames such as notifications preview popup
// @history        0.010 Increased the width of rollover previews to 400 from 300 (may be a setting eventually)
// @history        0.010 Image rollover preview will now reposition itself to stay within the viewable window
// @history        0.010 Image rollover preview now works on avatars in posts
// @history        0.010 Image rollover preview now works on avatars in vCards (little person previews)
// @history        0.010 Fixed handling of preview images with sz=## in the source
// @history        0.009 Added rollover previews to images in posts
// @history        0.009 Added MIT license to source
// @history        0.008 Display post actions as buttons instead of a dropdown menu (disabled by default)
// @history        0.008 Added a "Hide" tab to the options window to allow hiding Google+ elements
// @history        0.008 Added a donate button to the about tab of the options window
// @history        0.007 Yellow "post muted" notices will now fade out after a few seconds
// @history        0.006 Fixes to Thumbnails Only feature
// @history        0.005 Images in posts can now forced to thumbnails
// @history        0.004 Added options dialog with link in Google settings menu
// @history        0.004 Full width feature can now be disabled
// @history        0.003 Fixed header not left aligned in Google Chrome
// @history        0.003 Notifications view is now full width
// @history        0.003 Included jQuery UI in anticipation of next version 
// @history        0.003 Included Script Options in anticipation of next version 
// @history        0.002 Profiles are now full width as well
// @history        0.001 Initial release
//
// ==/UserScript==

var version = 0.015;
var refreshInterval = 1000;

// much of the code for this section originated at http://userscripts.org/scripts/show/24430
// and is used here in a modified form with Peter Wooley's consent
function FavIcon(gPlusIcon) {
	var self = this;
	this.self = this;
	this.src = gPlusIcon;
	this.foreground = "#2c3323";
	this.background = "#fef4ac";
	this.borderColor = "#fef4ac";
	this.construct = function() {				
		this.head = document.getElementsByTagName('head')[0];
		this.pixelMaps = {
			numbers: [
				[
					[0,1,1,0],
					[1,0,0,1],
					[1,0,0,1],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[0,1,0],
					[1,1,0],
					[0,1,0],
					[0,1,0],
					[1,1,1]
				],
				[
					[1,1,1,0],
					[0,0,0,1],
					[0,1,1,0],
					[1,0,0,0],
					[1,1,1,1]
				],
				[
					[1,1,1,0],
					[0,0,0,1],
					[0,1,1,0],
					[0,0,0,1],
					[1,1,1,0]
				],
				[
					[0,0,1,0],
					[0,1,1,0],
					[1,0,1,0],
					[1,1,1,1],
					[0,0,1,0]
				],
				[
					[1,1,1,1],
					[1,0,0,0],
					[1,1,1,0],
					[0,0,0,1],
					[1,1,1,0]
				],
				[
					[0,1,1,0],
					[1,0,0,0],
					[1,1,1,0],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[1,1,1,1],
					[0,0,0,1],
					[0,0,1,0],
					[0,1,0,0],
					[0,1,0,0]
				],
				[
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,1],
					[0,0,0,1],
					[0,1,1,0]
				],
			]
		};
		return true;
	};
	this.getIconCanvas = function(callback) {
		if(!self.iconCanvas) {
			self.iconCanvas = document.createElement('canvas');
			self.iconCanvas.height = self.iconCanvas.width = 16;
			
			var image = new Image();
			$(image).load(function() {
				// fill the canvas with the background favicon's data
				var ctx = self.iconCanvas.getContext('2d');
				ctx.drawImage(image, 0, 2, 14, 14);
				callback(self.iconCanvas);
			});
			image.src = self.src;
		} else {
			callback(self.iconCanvas);
		}
	};
	this.getBadgedIcon = function(unread, callback) {
		if(!self.textedCanvas) {
			self.textedCanvas = [];
		}
		if(!self.textedCanvas[unread]) {
			
			self.getIconCanvas(function(iconCanvas) {
				
				var textedCanvas = document.createElement('canvas');
				textedCanvas.height = textedCanvas.width = iconCanvas.width;
				var ctx = textedCanvas.getContext('2d');
				ctx.drawImage(iconCanvas, 0, 0);
				
				ctx.fillStyle = self.background;
				ctx.strokeStyle = self.border ? self.border : '#000000';
				ctx.strokeWidth = 1;
				
				var count = unread.length;
				var bgHeight = self.pixelMaps.numbers[0].length;
				var bgWidth = 0;
				var padding = count > 2 ? 0 : 1;
				
				for(var index = 0; index < count; index++) {
					bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
					if(index < count-1) {
						bgWidth += padding;
					}
				}
				bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;
				
				ctx.fillRect(textedCanvas.width-bgWidth-4,1,bgWidth+4,bgHeight+4);
				
				var digit;
				var digitsWidth = bgWidth;
				for(var index = 0; index < count; index++) {
					digit = unread[index];
					if (self.pixelMaps.numbers[digit]) {
						var map = self.pixelMaps.numbers[digit];
						var height = map.length;
						var width = map[0].length;
						
						ctx.fillStyle = self.foreground;
						
						for (var y = 0; y < height; y++) {
							for (var x = 0; x < width; x++) {
								if(map[y][x]) {
									ctx.fillRect(14- digitsWidth + x, y+3, 1, 1);
								}
							}
						}
						
						digitsWidth -= width + padding;
					}
				}	
				if(self.border) {
					ctx.strokeRect(textedCanvas.width-bgWidth-3.5,1.5,bgWidth+3,bgHeight+3);
				}
				self.textedCanvas[unread] = textedCanvas;
				callback(self.textedCanvas[unread].toDataURL('image/png'));
			});
		} else {
			callback(self.textedCanvas[unread].toDataURL('image/png'));
		}
	};
	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if ((links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/png";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		
		self.head.appendChild(newIcon);
		
		var shim = document.createElement('iframe');
		shim.width = shim.height = 0;
		document.body.appendChild(shim);
		shim.src = "icon";
		document.body.removeChild(shim);
	};
	this.set = function(num) {
		if(typeof(num) == 'undefined' || (!num && num.toString() != '0')) num = '';
		if(num != '') {
			self.getBadgedIcon(num.toString(), function(src) {
				self.setIcon(src);
			});
		} else {
			self.setIcon(this.src);
		}
	};
	this.toString = function() { return '[object FavIconAlerts]'; }
	
	return this.construct();
}

function loadOptions() {
	Config.scriptName = 'Google+ Tweaks';
	Config.options = {
		"常规":{
			"faviconBadge":{
				label:'增强的通知提醒',
				type:'checkbox',
				description:'在G+标签栏显示新的未读通知数',
				'default':true
			},
			"fullWidth":{
				label:'宽屏显示',
				type:'checkbox',
				description:'将G+页面等宽放大至屏幕宽度',
				'default':true
			},
			"fadeMuteNotices":{
				label:'显示 "撤销忽略"的提示',
				type:'checkbox',
				description:'以淡出效果显示"撤销忽略"的提示',
				'default':false
			},
			"fastMute":{
				label:'快速静音',
				type:'checkbox',
				description:'为每条信息流添加"忽略此信息"按钮',
				'default':true
			},
			"easyMentions":{
				label:'快速回复',
				type:'checkbox',
				description:'在用户名后面添加+按钮，点击则可以指定回复',
				'default':true
			},
			/*
			"postButtons":{
				label:'Post Buttons',
				type:'checkbox',
				description:'Display post actions as buttons instead of a menu',
				'default':false
			},
			*/
			"mouseOverImages":{
				label:'滑动预览',
				type:'checkbox',
				description:'鼠标移至图片上方时显示放大预览图',
				'default':true
			},
			"thumbsOnly":{
				label:'缩略图显示',
				type:'checkbox',
				description:'强制所有图片以缩略图形式显示',
				'default':false
			},
			"fixedNavigation":{
				label:'固定导航',
				type:'checkbox',
				description:'使上方和左右两边的导航区"置顶"',
				'default':false
			},
			'seeAbout':{
				type:'html',
				text:'<div><br/></div>' +
					'<p>即将添加更多功能. 点击 <strong>关于</strong> 标签查看更多信息.</p>'
			}
		},
		"隐藏":{
			"hideWelcomeLink":{
				label:'欢迎链接',
				type:'checkbox',
				description:'隐藏左栏的欢迎链接'
			},
			"hideChatRoster":{
				label:'聊天列表',
				type:'checkbox',
				description:'隐藏左栏的聊天列表'
			},
			"hideSendFeedback":{
				label:'发送反馈',
				type:'checkbox',
				description:'隐藏右下角的发送反馈按钮'
			},
			"hidePlusMention":{
				label:'提及用户的前缀',
				type:'checkbox',
				description:'隐藏信息流或评论中所提及的用户名前面的"+" '
			},
			"hideRightColLabel":{
				type:'html',
				text:'<p"> </p>'
			},
			"hideRightCol":{
				label:'右边栏',
				type:'checkbox',
				description:'隐藏整个右边栏'
			},
			"hideSuggestions":{
				label:'推荐',
				type:'checkbox',
				description:'隐藏系统推荐的人'
			},
			"hideGoMobile":{
				label:'在手机上使用',
				type:'checkbox',
				description:'隐藏"在手机上使用"的功能 '
			},
			"hideSendInvites":{
				label:'发送邀请',
				type:'checkbox',
				description:'隐藏"发送邀请"的功能'
			},
			"postButtonsLabel":{
				type:'html',
				text:'<p style=""> </p>'
			},
			"hideReportAbuse":{
				label:'举报滥用',
				type:'checkbox',
				description:'隐藏"举报滥用"的选项'
			},
			"hideBlockUser":{
				label:'阻止某人',
				type:'checkbox',
				description:'隐藏"阻止此人"的选项'
			},
			"hideLinkToPost":{
				label:'此信息的链接',
				type:'checkbox',
				description:'隐藏"此信息的链接"选项'
			}
		},
		"关于":{
			'about':{
				type:'html',
				text:'<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=773DHSKBK7PXQ" title="Show your love for Google+ Tweaks"><img src="https://lh3.googleusercontent.com/-I9688G68QNo/ThpTzbY_xjI/AAAAAAAAAHA/yhD7MXWhvKw/green_100.png" style="float:right;"/></a>' +
					'<p style="margin-top:0;"><strong><a href="http://userscripts.org/scripts/show/106166">' +
					'Google+ Tweaks</a></strong> v' + version + ' by <a href="">Jerome Dane</a></p>' +
					'<p> Google+功能和布局的修改和增强</p>' +
					'<p>做这个脚本是兴趣使然. 真实生活中的事情才是我优先考虑的. 介个可有可无.</p>' +
					'<p>此脚本是一个测试版本, 还有很大的完善空间. ' +
						'如果您发现BUG或者有神马建议, 请直接在 ' +
						'<a href="http://userscripts.org/scripts/discuss/106166">discussions</a>中发表评论. ' +
						'我将尽快进行更新.</p>' +
					'<p>' +
						'<a href="https://plus.google.com/107905455800180378660/posts">' +
							'<img style="display:inline-block; vertical-align:middle;" src="https://lh3.googleusercontent.com/-IvtEWk93sCM/ThitYp1QudI/AAAAAAAAAGY/piLimw2CogM/google_plus_badge_32.png"/>' +
						'</a>' +
						' for update, <a href="https://plus.google.com/107905455800180378660/posts">圈我哦亲`(*∩_∩*)′</a>' +
					' 汉化 by <a href="https://plus.google.com/101979249534200472360/posts">Mr.left</a>' +
					'</p>'
			}
		}
	}
}
var favicon = null;
function faviconInit() {
	var gPlusIcon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJubm3guLi7/Ly8v/zExMf8yMjL/MjIy/zMzM/8yMjL/MjIy/zExMf8vLy//Li4u/y0tLf+enp50////AP///wAvLy//MTEx/zMzM/80NDT/NTU1/zY2Nv8mJib/JiYm/zU1Nf80NDT/MjIy/zAwMP8uLi7/LS0t/////wD///8AMjIy/zQ0NP82Njb/ODg4/zo6Ov87Ozv/09HR/9PR0f86Ojr/ODg4/zY2Nv80NDT/MjIy/y8vL/////8A////ADU1Nf84ODj/Ozs7/z09Pf8/Pz//QEBA/+Pi4v/j4uL/Pz8//z09Pf87Ozv/ODg4/zU1Nf8yMjL/////AP///wA5OTn/PDw8/z8/P/8tLS3/Ly8v/y8vL//o5+f/6Ofn/y8vL/8tLS3/LCws/zw8PP85OTn/NTU1/////wD///8APDw8/0BAQP9CQkL/7ezs/+3s7P/t7Oz/7ezs/+3s7P/t7Oz/7ezs/+3s7P8/Pz//Ozs7/zg4OP////8A////AD8/P/9CQkL/RUVF//Hx8f/x8fH/8fHx//Hx8f/x8fH/8fHx//Hx8f/x8fH/QkJC/z4+Pv86Ojr/////AP///wBAQED/RERE/0dHR/9JSUn/SUlJ/0lJSf/29fX/9vX1/0lJSf9JSUn/R0dH/0RERP9AQED/PDw8/////wD///8AQkJC/0ZGRv9ISEj/SUlJ/0lJSf9JSUn/+fn5//n5+f9ISEj/SEhI/0dHR/9GRkb/QkJC/z4+Pv////8A////AENDQ/9HR0f/SUlJ/0lJSf9JSUn/SUlJ//39/f/9/f3/SUlJ/0lJSf9JSUn/R0dH/0NDQ/8/Pz//////AP///wBERET/R0dH/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0dHR/9DQ0P/Pz8//////wD///8ANzc3/zo6Ov88PDz/PDw8/zw8PP88PDz/PDw8/zw8PP88PDz/PDw8/zw8PP86Ojr/Nzc3/zQ0NP////8A////AA8P1f8PD9X/Dw/V/+hpM//oaTP/6Gkz/+hpM/8lmQD/JZkA/yWZAP8mkwP/EbLu/xGy7v8Rsu7/////AP///wCHh+p+Dw/V/w8P1f/oaTP/6Gkz/+hpM//oaTP/JZkA/yWZAP8lmQD/JpQE/xGy7v8Rsu7/jNr2ef///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAADAAwAA//8AAA%3D%3D';
	favicon = new FavIcon(gPlusIcon);
	favicon.foreground = '#fef4ac'; 
	favicon.background = '#bb0000'; 
	favicon.border = false;
}
function faviconUpdate() {
	var numNotices = $('#gbgs1').text();
	if(numNotices.match(/^\d+$/) && numNotices.toString() != '0') {
		favicon.set(numNotices);
	} else {
		favicon.set();
	}
}
function fullWidth() {
	var leftCol = '.a-p-la-T.d-s-r.a-b-p-la-T';
	$(leftCol).attr('id', 'BC_LEFT_COL');

	var contentCol = '#contentPane';

	$(contentCol).before($(rightColSelector));

	contentCol += '.a-p-M-T.a-p-M-T-gi-xc';

	var leftColWidth = $(leftCol).width();
	var rightColWidth = $(rightColSelector).width();
	var contentWidth = $(document).width() - (Config.get('hideRightCol') ? 0 : leftColWidth)  - rightColWidth - 32;
	var profileWidth = $(document).width() - 233;

	css += 
		// header 
		'.a-U-T .a-A.a-U-A { width:100%; }' +

		// inner content padding
		'#content .a-p-A-T.a-A.a-p-A-xc-zb { width:100%;  }' +

		// left column
		leftCol + ' { width:188px; float:left; }' +
		
		// center content
		contentCol + ' { width:' + contentWidth  + 'px; }' +
		contentCol + ' { margin-left:188px; }' +
		contentCol + '.a-p-M-T-gi-xc { display:block; }'+

		// center content padding
		contentCol + ' > div { width:' + contentWidth  + 'px; float:left; }' +

		// center content elements
		contentCol + ' .a-f-n-A, #contentPane .a-f-p { width:100%; }' +

		contentCol + ' .n-ci, ' + contentCol + ' .v-u-y-m { margin-right:40px; }'+

		// post view content column
		'#contentPane.a-p-M-T.a-p-M-T-hk-xc { width:100%; }' +

		// profile view content column
		'#contentPane .vcard { width:' + profileWidth + 'px; }' +
		'#contentPane .vcard > div:first-child { width:' + profileWidth + 'px !important; }' +
		
		// notifications view (click "Notifications" at the bottom of the list in the left column)
		'#contentPane.a-p-M-T.a-p-M-T-Gp-xc { width:' + ($(document).width() - leftColWidth - 25) + 'px !important; }' +
		'#contentPane.a-p-M-T.a-p-M-T-Gp-xc .MJI2hd { width:100%; }' +
		'#contentPane.a-p-M-T.a-p-M-T-Gp-xc .a-b-l-C-ka { width:100%; padding:0; }' +
		'#contentPane.a-p-M-T.a-p-M-T-Gp-xc .a-b-l-C-Vb { margin:20px; }' +
		
		// incomming view 
		

		// right column
		rightColSelector + ' { float:right; padding-right:10px; }' +

		// photos
		'#contentPane > div[token*="photos"], #contentPane .a-g-IPJ4If { padding-left:210px; }' +	
		'#contentPane .a-g-kmrBZe { padding:0; }';
}
function thumbsOnly() {
	var maxHeight = 46;
	var maxWidth = 62;
	
	$(postMediaSelector).each(function() {
		if($(this).height() > maxHeight && $(this).width() > maxHeight) {
			var parentWrapper = $(this).parent();
			function shrinkParentWrapper() {
				parentWrapper.height(maxHeight);		// reduce height of container
				parentWrapper.width(maxWidth);		// reduce width of container
			}
			if(this.src.match(/(jpg|jpeg|png|gif)$/i)) {
				var file = this.src.match(/[^\/]+$/)[0];	
				var newSrc = this.src.replace(/[^\/]+\/[^\/]+$/, '') + 'w' + maxWidth + '-h' + maxHeight + '-p/' + file;
				this.src = newSrc;
				parentWrapper.next().remove();		// remove next <br>
				shrinkParentWrapper();
				var nextWrapper = $(this).parent().next();
				if($('img', nextWrapper).size() > 0) {
					nextWrapper.before($(this).parent());
					$(this).parent().attr('class',  nextWrapper.attr('class')); // get the class of the first thumbnail in the row
				}
			} else if($(playVideoIconSelector, parentWrapper).size() == 0) {
				$(this).css('max-height', maxHeight);
				$(this).css('max-width', maxWidth);
				shrinkParentWrapper();
			}
		}
	});
}
function fadeMuteNotices() {
	$(mutedNoticeSelector).each(function() {
		var _this = this;
		setTimeout(function() {
			$(_this).fadeOut(1000, function() {
				$(this).remove();
			});
		}, 3000);
	});
}
function postButtons() {
	$(postMenuItemSelector).each(function() {
		if(!$(this).attr('title')) {
			this.title = $(this).text();
		}
	});
}
function stylePostButtons() {
	css +=
		sharedByIncomingNoticeSelector + ' { width:350px; }' +
		postMenuSelector + ' {' +
			'display:block !important; visibility:visible !important;' +
			'right:20px !important; top:12px !important;' +
			'border:none !important; background:none !important; box-shadow:none !important;' +
			'text-align:right;' +
		'}' +
		postButtonSelector + ' {' +
			'display:none !important;' +
		'}' +
		postMenuItemSelector + ' {' +
			'padding:0 !important; width:20px; height:20px; display:inline-block;' +
			'opacity:0.7; background:none; background:no-repeat center;' +
		'}' +
		postMenuItemSelector + ':hover { opacity:1; border:none !important; }' +
		postMenuItemSelector + ' div { display:none; }' +
		// link to post button
		postMenuItemSelector + '.a-b-f-i-Wf { background-image:url(https://lh6.googleusercontent.com/-pwDtUlemFzg/Thw-OsM3f0I/AAAAAAAAAJQ/9wekDuZ6d8s/link_go_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Wf:hover { background-image:url(https://lh6.googleusercontent.com/-xA-sySybywI/Thw-Ogf3PGI/AAAAAAAAAJU/DR7PSHSUZeU/link_go.png); }' +
		// report abuse button
		postMenuItemSelector + '.a-b-f-i-Ic-db { background-image:url(https://lh4.googleusercontent.com/-0FwgYOP457c/ThxOiMjDVeI/AAAAAAAAAJg/pZ7E6U77Fj0/error_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Ic-db:hover { background-image:url(https://lh6.googleusercontent.com/-xOwzzGwIAx4/ThxOiAt13xI/AAAAAAAAAJk/uduK06VftVo/error.png); }' +
		// mute button
		postMenuItemSelector + '.a-b-f-i-Fb-C { background-image:url(https://lh3.googleusercontent.com/-lZDyA7RaVHQ/Thw6SRRp-lI/AAAAAAAAAI0/qRIid0xFWJs/sound_mute_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Fb-C:hover { background-image:url(https://lh4.googleusercontent.com/-5NYOXadhJOs/Thw5O1SYBoI/AAAAAAAAAIs/zOvmkFAcrks/ound_mute.png); }' +
		// unmute button
		postMenuItemSelector + '.a-b-f-i-kb-C { background-image:url(https://lh5.googleusercontent.com/-bDo6UL0neMM/ThxVgUAntlI/AAAAAAAAALs/ZXKxUGrsb5E/sound_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-kb-C:hover { background-image:url(https://lh3.googleusercontent.com/-g-N2pGj2fJE/ThxVgrFUTzI/AAAAAAAAALw/Akn9FSAZfEk/sound.png); }' +
		// edit post button
		postMenuItemSelector + '.a-b-f-i-Ka-C { background-image:url(https://lh5.googleusercontent.com/-bnEeS-_bg78/ThxPST5jEoI/AAAAAAAAAJw/u2v_hEuS7UY/pencil_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Ka-C:hover { background-image:url(https://lh5.googleusercontent.com/-tvOZ5CGtWzA/ThxPSQCLv-I/AAAAAAAAAJ0/phWP6Bzayws/pencil.png); }' +
		// delete post button
		postMenuItemSelector + '.a-b-f-i-cb-C { background-image:url(https://lh5.googleusercontent.com/-CMY5G5I5Qh0/ThxQcnMmsZI/AAAAAAAAAKE/8U9W2AitifA/delete_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-cb-C:hover { background-image:url(https://lh6.googleusercontent.com/-oDjRx7jTA8c/ThxQcpav6HI/AAAAAAAAAKI/aYS1rCS8za4/delete.png); }' +
		// disable comments button
		postMenuItemSelector + '.a-b-f-i-Ii-Xb { background-image:url(https://lh6.googleusercontent.com/-ODqNX1j57IY/ThxSCt_TcMI/AAAAAAAAAKw/wTIfVw4bIfE/comments_lock_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Ii-Xb:hover { background-image:url(https://lh4.googleusercontent.com/-4iB_oM6vT_A/ThxSCllBBtI/AAAAAAAAAKs/GxMFD9AhA3Q/comments_lock.png); }' +
		// enable comments button
		postMenuItemSelector + '.a-b-f-i-Jj-Xb { background-image:url(https://lh6.googleusercontent.com/-oLc5bRVF1iU/ThxSflYTN7I/AAAAAAAAAK8/OBwK8wsQZZ4/comments_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Jj-Xb:hover { background-image:url(https://lh3.googleusercontent.com/-cAQuS2y0r94/ThxSfp90eWI/AAAAAAAAALA/FpixV8BLm9I/comments.png); }' +
		// disable reshare button
		postMenuItemSelector + '.a-b-f-i-Ii-u { background-image:url(https://lh4.googleusercontent.com/-s9v8CaIaVpI/ThxUHSD2PUI/AAAAAAAAALM/K7JHLliHfH8/lock_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Ii-u:hover { background-image:url(https://lh3.googleusercontent.com/-pC-vyWr74DM/ThxUHmaYaLI/AAAAAAAAALQ/TiVXECoHptI/lock.png); }' +
		// enable reshare button
		postMenuItemSelector + '.a-b-f-i-Jj-u { background-image:url(https://lh4.googleusercontent.com/-KKE4tulObP0/ThxU9qkt_uI/AAAAAAAAALc/h6HvDkJcYHw/lock_open_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-Jj-u:hover { background-image:url(https://lh4.googleusercontent.com/-4biJT7ewr5U/ThxU9mbtXWI/AAAAAAAAALg/e-oSBoGHfsA/lock_open.png); }' +
		// block person button
		postMenuItemSelector + '.a-b-f-i-r-mb { background-image:url(https://lh5.googleusercontent.com/-zl4QxNIuy2g/Thw8VSAX-MI/AAAAAAAAAI8/lzIqJljVnkw/user_delete_desaturated.png); }' +
		postMenuItemSelector + '.a-b-f-i-r-mb:hover { background-image:url(https://lh5.googleusercontent.com/-TcYdTcWkYbA/Thw8VURT2XI/AAAAAAAAAJA/oG5yT4PtIi8/user_delete.png); }' +
		'';
}
function stylePreviewDiv() {
	previewDiv = document.createElement('div');
	previewDiv.id = 'bcGplusTweaksPreview';
	previewDiv.innerHTML = '<img src=""/>';
	$(previewDiv).mousemove(repositionPreviewWindow);
	$('body').append(previewDiv);
	
	css += '#bcGplusTweaksPreview { ' +
		'border:2px solid red; display:none; position:absolute; z-index:5000;' + 
		'max-width:' + previewWidthMax + 'px; border:4px double #333; background:#fff; box-shadow: 0 5px 8px rgba(0, 0, 0, 0.6);' +
	'}' +
		'#bcGplusTweaksPreview img { ' +
		'margin-bottom:-3px; max-width:' + previewWidthMax + 'px;' +
	'}';
}
function repositionPreviewWindow(e) {
	$(previewDiv).css('left', e.pageX + 30);
	$(previewDiv).css('top', e.pageY - 30);
	
	var h = $('img', previewDiv).height();
	var w = $('img', previewDiv).width();
	
	var bottom = parseInt($(previewDiv).css('top').replace(/[^\d]/, '')) + h - $(document).scrollTop();
	var right = parseInt($(previewDiv).css('left').replace(/[^\d]/, '')) + w;
	if(right > $(window).width()) {
		if(e.pageX - w - 30 > 10) {
			$(previewDiv).css('left', e.pageX - w - 30);
		}
	}
	if(bottom > $(window).height()) {
		$(previewDiv).css('top', $(window).height() - 20 - h + $(document).scrollTop());
	}
}
function mouseOverImages() {
	enableMouseOverPreviewOnImage(postMediaSelector);
	enableMouseOverPreviewOnImage(postAvatarSelector);
	enableMouseOverPreviewOnImage(myAvatarSelector);
	enableMouseOverPreviewOnImage(vcardAvatarSelector);
	enableMouseOverPreviewOnImage(vcardAvatarInCommonSelector);
	enableMouseOverPreviewOnImage(hangoutNoticeAvatarSelector);
}
function fastMuteActivate() {
	$('span[role="button"].d-h.a-f-i-Ia-D-h.a-b-f-i-Ia-D-h').each(function() {
		try {
			if($('.bcGTweaksMute', $(this).parent()).size() == 0 && $('.a-f-i-Jf-Om.a-b-f-i-Jf-Om', $(this).parent()).size() == 0) {
				var m = document.createElement('div');
				m.className = 'bcGTweaksMute';
				m.innerHTML = '&nbsp;';
				m.style.cursor = 'pointer';
				var mb = $('.a-b-f-i-Fb-C', $(this).parent().parent().next())[0];
				if(mb) {
					$(this).before(m);
					m.title = $(mb).text();
					$(m).click(function() {
						simulateClick(mb);
					});
				}
			}
		} catch(e) { console.log(e); }
	});
}
function fixedNavigation() {
	var leftWidth = $(leftColSelector).width();
	var rightColOffset = ($(window).width() / 2) + 280;
	
	css += 
		'div.a-Eo-T #gb { position:fixed; top:0; width:100%; }' +
		'div.a-U-T { position:fixed; top:30px; z-index:1000; }' +
		'#content { padding-top:90px; }' +
		'#gbg { z-index:1200; }' +
		leftColSelector + ' > div { position:fixed; top:90px; width:' + (leftWidth + 20) + 'px; height:' + ($(window).height() - 90) + 'px; overflow-y:auto; overflow-x:hidden; }' +
		rightColSelector + ' { position:fixed; top:90px; ' + 
			(Config.get('fullWidth') ? 'right:0;' : 'left:' + rightColOffset + 'px;') + 
		' }' +
		// notifications view
		'#contentPane.a-p-M-T.a-p-M-T-Gp-xc { margin-left: ' + (Config.get('fullWidth') ? leftWidth : 0) + 'px !important; }' + 
		// pictures view
		'#contentPane.a-p-M-T.a-p-M-T-ud-oc > div > .a-g-kmrBZe { position:fixed; top:90px; }' +
		// profile view
		'#contentPane .a-b-c-ka-Mc.a-c-ka-Mc { position:fixed; top:90px; ' + 
			(Config.get('fullWidth') ? '' : 'left:' + (rightColOffset - 760) + 'px;') + 
		' }' +
		// profile left column (thanks for the heads up Matt Mastracci)
		profileColumnSelector + ' { overflow-y:auto; height:' + ($(window).height() - 90) + 'px !important; width:214px; }' +
		// "add to circles button (thanks Matt Kruse)
		'.a-p-M-T.a-p-M-T-hk-xc .a-b-c-K.a-c-K {position:fixed; right:0; top:35px; z-index:9999;}'
		;
}
function enableMouseOverPreviewOnImage(selector) {
	$(selector).each(function() { 
		var img = this;
		if($(img).attr('rel') != 'bcGplusTwImgPrvw') {
			$(img).attr('rel', 'bcGplusTwImgPrvw');
			$(img).mouseover(function(e) {
				currentPreviewTarget = img;
				setTimeout(function() {
					if(currentPreviewTarget) {
						var src = currentPreviewTarget.src.replace(/\/w\d+[^\/]+\//, '/w' + previewWidthMax + '/');
						src = src.replace(/sz=\d+/, '');
						src = src.replace(/resize_h=\d+/, '');
						src = src.replace(/&$/, '');
						$('img', previewDiv).load(function() {
							if(currentPreviewTarget) {
								
								$(previewDiv).show();
								//repositionPreviewWindow(e);
								setTimeout(function() { repositionPreviewWindow(e); }, 200);
								//setTimeout(function() { repositionPreviewWindow(e); }, 200);
								//setTimeout(function() { repositionPreviewWindow(e); }, 400);
								/*
								$(previewDiv).fadeIn(function() {
									repositionPreviewWindow(e);
								});
								*/
							}
						});
						$('img', previewDiv).attr('src', src);
					}
				}, 500);
			});
			$(img).mouseout(function() {
				$(previewDiv).fadeOut(function() {
					$('img', previewDiv).attr('src', '');
				});
				currentPreviewTarget = false;
			});
			$(img).mousemove(function(e) {
				currentPreviewTarget = this();
				repositionPreviewWindow(e);
			});
		}
	});
}
function easyMentionsPoll() {
	$(postSelector + ' ' + profileLinkSelector).each(function() {
		var link = this;
		if(link.rel != 'bcGTweakEzMntn' && $('img', link).size() == 0) {
			link.rel = 'bcGTweakEzMntn';
			var mention = document.createElement('span');
			mention.innerHTML = "+";
			mention.title = "Mention " + link.innerHTML + " in your comment";
			mention.className = 'bcGTweakEzMntn'
			$(mention).click(function() {
				// find post wrapper
				var wrapper = null;
				if($(link).parent().attr('class') == 'a-f-i-go') {	// main post author
					wrapper = $(link).parent().parent().parent().parent().parent();
				} else if($(link).prev().attr('class') == 'proflinkPrefix') {	// mention within comment
					if($(link).parent().parent().attr('class') == 'a-b-f-i-p-R') {
						wrapper = $(link).parent().parent().parent().parent().parent().parent().parent(); // mention in post
					} else {
						wrapper = $(link).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent(); // mention in comment
					}
				} else {	// comment author
					wrapper = $(link).parent().parent().parent().parent().parent().parent().parent().parent();
				}
				var addCommentLink = $('span.d-h.a-b-f-i-W-h[role="button"]', wrapper)[0];
				simulateClick(addCommentLink);
				
				function insertMentionRef(name, id) {
					var editor = $('.v-J-n-m-Gc.editable', wrapper); 
					if(editor.size() > 0) {
						
						if(navigator.userAgent.match(/chrome/i)) {
							var html = ' <span> </span><button contenteditable="false" tabindex="-1" style="white-space: nowrap; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(221, 221, 221); border-right-color: rgb(221, 221, 221); border-bottom-color: rgb(221, 221, 221); border-left-color: rgb(221, 221, 221); border-top-left-radius: 2px 2px; border-top-right-radius: 2px 2px; border-bottom-right-radius: 2px 2px; border-bottom-left-radius: 2px 2px; display: inline-block; font: normal normal normal 13px/1.4 Arial, sans-serif; margin-top: 0px; margin-right: 1px; margin-bottom: 0px; margin-left: 1px; padding-top: 0px; padding-right: 1px; padding-bottom: 0px; padding-left: 1px; vertical-align: baseline; color: rgb(51, 102, 204); background-position: initial initial; background-repeat: initial initial; " class="n-QXyXGe" data-token-entity="@' + id + '" oid="' + id + ' +"><span style="color: rgb(136, 136, 136); ">+</span>' + name + ' </button><span>&nbsp;</span>';
						} else {
							var html = ' <span> </span><input type="button" tabindex="-1" value="+' + name + '" style="white-space: nowrap; background: none repeat scroll 0% 0% rgb(238, 238, 238); border: 1px solid rgb(221, 221, 221); border-radius: 2px 2px 2px 2px; display: inline-block; font: 13px/1.4 Arial,sans-serif; margin: 0pt 1px; padding: 0pt 1px; vertical-align: baseline; color: rgb(51, 102, 204);" class="n-QXyXGe" data-token-entity="@' + id + '" oid="' + id + '"><span>&nbsp;</span>';

						}
						
						editor.attr('tabfocus', '0');
						//editor.focus();

						if($('iframe', editor).size() > 0) {
							editor = $('iframe', editor).contents().find("body");
						}
						
						var existingHtml = editor.html().replace(/^(\n|\s)*<\/*br>(\n|\s)*/, '').replace(/(\n|\s)*<\/*br>(\n|\s)*$/, '')
						editor.html(existingHtml +  html);
						editor.focus();
						editor.attr('')
						
						setTimeout(function() {
							
							placeCaretAtEnd( editor[0]);
						}, 100);
						
					} else {
						setTimeout(function() {
							insertMentionRef(name, id);
						}, 200);
					}
				}
				
				// http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
				function placeCaretAtEnd(el) {
				    el.focus();
				    if (typeof window.getSelection != "undefined"
				            && typeof document.createRange != "undefined") {
				        var range = document.createRange();
				        range.selectNodeContents(el);
				        range.collapse(false);
				        var sel = window.getSelection();
				        sel.removeAllRanges();
				        sel.addRange(range);
				    } else if (typeof document.body.createTextRange != "undefined") {
				        var textRange = document.body.createTextRange();
				        textRange.moveToElementText(el);
				        textRange.collapse(false);
				        textRange.select();
				    }
				}

				insertMentionRef(link.innerHTML, $(link).attr('oid'));
				
				//alert(post.attr('id'));
				//var addComment = $(postAddCommentSelector  
				
			});
			$(link).after(mention);
		}
	});
}

function simulateClick(element) {
    var clickEvent;
    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("mousedown", true, true)
    element.dispatchEvent(clickEvent);
    
    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("click", true, true)
    element.dispatchEvent(clickEvent);
    
    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("mouseup", true, true)
    element.dispatchEvent(clickEvent);
}

if(!document.location.toString().match(/frame/)) {
	loadOptions();

	var css = '';
	
	
	var contentSelector = '#contentPane';
	var hangoutNoticeAvatarSelector = '.a-f-i-ie-p img[src*="googleusercontent"]';
	var leftColSelector = '.a-p-la-T.d-s-r.a-b-p-la-T';
	var mutedNoticeSelector = '.a-f-i-Fb-Un';
	var myAvatarSelector = 'img.a-b-Rf-Lz.a-Rf-Lz';
	var playVideoIconSelector = '.ea-S-ei';
	var plusOnePostButtonSelector = '.a-f-i-bg button';
	var postAvatarSelector = 'img.a-f-i-q.a-b-f-i-q';
	var postSelector = contentSelector + ' div[id^="update"]';
	var postBodySelector = '.a-b-f-S-oa';
	var postMediaSelector = '#contentPane ' + postBodySelector + ' img[src*="googleusercontent"]';
	var postMenuSelector = '.a-f-i-Ia-D[role="menu"]';
	var postAddCommentSelector = postSelector + ' span.d-h.a-b-f-i-W-h[role="button"]';
	var postMenuItemSelector = postMenuSelector + ' div[role="menuitem"]';
	var postButtonSelector = 'h3.a-za + span[role="button"]';
	var profileColumnSelector = '.a-b-c-ka-Mc.a-c-ka-Mc'
	var profileLinkSelector = 'a[oid]';
	var rightColSelector = '.a-b-Cs-T.a-Cs-T.d-s-r';
	var suggestionsSelector = '.a-b-j-lc-Rd-A';
	var sharedByIncomingNoticeSelector = '.a-f-i-Jf-Om.a-b-f-i-Jf-Om';
	var vCardSelector = 'table.a-ia-ta';
	var vcardAvatarSelector = vCardSelector + ' img.a-ia-tk[src*="googleusercontent"]';
	var vcardAvatarInCommonSelector = vCardSelector + ' img.a-ia-Bq[src*="googleusercontent"]';
	
//	if(Config.get('postButtons')) stylePostButtons();
	
	var previewDiv = null;
	var previewHeightMax = $(window).height() - 40;
	var previewWidthMax = previewHeightMax;
	var currentPreviewTarget = false;
	if(Config.get('mouseOverImages') && $('#gb').size() > 0) stylePreviewDiv();
	
	if(Config.get('faviconBadge')) {
		faviconInit();
		setInterval(faviconUpdate, 5);
	}
	
	setInterval(function() {
		if(Config.get('thumbsOnly')) thumbsOnly();
		if(Config.get('fadeMuteNotices')) fadeMuteNotices();
		//if(Config.get('postButtons')) postButtons();
		if(Config.get('mouseOverImages')) mouseOverImages();
		if(Config.get('fastMute')) fastMuteActivate();
		if(Config.get('easyMentions')) easyMentionsPoll();
		
	}, refreshInterval);
	
	if(Config.get('hideWelcomeLink')) css += leftColSelector + ' .a-b-la-A h2 + a, ' + leftColSelector + ' .a-b-la-A h2 + a + div { display:none; }';
	if(Config.get('hideChatRoster')) css += '#oz-chat-roster { display:none !important; }';
	if(Config.get('hideSendFeedback')) css += 'a.a-eo-eg[href*="forum"] { display:none !important; }';
	if(Config.get('hidePlusMention')) css += '.proflinkPrefix { display:none !important; }';
	
	// right column
	if(Config.get('hideRightCol')) css += rightColSelector + ' { display:none; }';
	if(Config.get('hideSuggestions')) css += suggestionsSelector + ' { display:none; }';
	if(Config.get('hideGoMobile')) css += rightColSelector + ' .a-kh-Ae div:first-child + div + div + div { display:none; }';
	if(Config.get('hideSendInvites')) css += rightColSelector + ' .a-kh-Ae div:first-child + div + div + div + div { display:none; }';
	
	// post actions
	if(Config.get('hideBlockUser')) css += postMenuItemSelector + '.a-b-f-i-r-mb { display:none; }';
	if(Config.get('hideReportAbuse')) css += postMenuItemSelector + '.a-b-f-i-Ic-db { display:none; }';
	if(Config.get('hideLinkToPost')) css += postMenuItemSelector + '.a-b-f-i-Wf { display:none; }';
	
	if(Config.get('fullWidth')) fullWidth();
	
	if(Config.get('fixedNavigation')) fixedNavigation();
	
	if(Config.get('fastMute')) {
		css +=
			'.bcGTweaksMute { ' +
					'background:url(https://lh3.googleusercontent.com/-lZDyA7RaVHQ/Thw6SRRp-lI/AAAAAAAAAI0/qRIid0xFWJs/sound_mute_desaturated.png) center no-repeat;' +
					'padding:1px 15px; opacity:.5;' +
					'position:absolute; right:50px; top:11px; border:1px solid #aaa; border-radius:2px; }' +
					'.bcGTweaksMute:hover { opacity:1;' +
						'background-image:url(https://lh4.googleusercontent.com/-5NYOXadhJOs/Thw5O1SYBoI/AAAAAAAAAIs/zOvmkFAcrks/ound_mute.png); background-color:#eee;' +
					'}';
		if(!Config.get('fadeMuteNotices')) {
			css += mutedNoticeSelector + ' { display:none !important; }';
		}
	}

	if(Config.get('easyMentions')) {
		css+= postSelector + ' .bcGTweakEzMntn { cursor:pointer; opacity:0.5; font-size:8px; position:relative; top:-1px; ' +
				'margin:0 5px 0 3px; white-space: nowrap; background-color: rgb(238, 238, 238); border:1px solid rgb(221, 221, 221);' +
				'display: inline-block; padding:0 4px; color: rgb(51, 102, 204); }' +
			 postSelector + ' .bcGTweakEzMntn:hover { opacity:1; }';
		
	}
	
	// add options link
	$('a[href*="preferences"].gbgt + div ol.gbmcc li:eq(1)').after('\
			<li class="gbkc gbmtc"><a class="gbmt" href="javascript:void(0)" id="bcGTweaksOptLnk">Google+ tweaks</a></li>\
	');
	$('#bcGTweaksOptLnk').click(function() {
		Config.open();
	});
			
	// implement CSS
	if(css != '') {
		if(typeof(GM_addStyle) == 'function') {
			GM_addStyle(css);
		} else {
			var sheet = document.createElement('style') ;
			sheet.innerHTML = css;
			document.body.appendChild(sheet);
		}
	}
}