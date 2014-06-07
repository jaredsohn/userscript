// ==UserScript==
// @name        4Chan Image Splay
// @namespace   http://datfeel.com/
// @description Splays images from the current board in a grid pattern
// @copyright	J. Darren Hampton
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     *//boards.4chan.org/*
// @updateURL	https://datfeel.com/feelware/4Chan_Image_Splay/4Chan_Image_Splay.meta.js
// @downloadURL https://datfeel.com/feelware/4Chan_Image_Splay.user.js
// @version     1.08
// @grant	none
// ==/UserScript==

//Settings:
var BackgroundColor = "rgba(0,0,0,0.9)", //Background overlay color
	TextOutline = "text-shadow:-1px -1px 0 #000000,1px -1px 0 #000000,-1px 1px 0 #000000,1px 1px 0 #000000;", //Text Outline
	TextStyle = "color:#FFFFFF;font-size:24pt;position:fixed;z-index:1000;cursor:pointer;" + TextOutline, gD, //Text Style (Don't delete gD here, it's a helper variable)
	StartPos = "bottom:10px;right:25px;",
	ExitPos = "bottom:10px;right:25px;",
	OpenThreadPos = "bottom:90px;right:25px;",
	OpenPostPos = "bottom:50px;right:25px;",
	PostTextPos = "top:10px;right:25px;",
	PostTextBackgroundColor = "rgb(25,25,25)", //Background color when Post Text is hovered over.
	minSize = 10, //If both image dimensions are less than this, ignore the image.
	getImgDimensionsFromText = gD = true, //Attempt to get full-size image dimensions from text in post. If the dimensions aren't posted for you, turn this option to false.
	enableImageIteration = true, //Turn on option to cycle through images
	imageIterationHoverBackgroundColor = "rgba(50,50,50,0.75)",
	showBoardList = true, //Show the board list.
	showPageList = true, //Show the page list when not in a thread.
	allowKeyControl = true; //Allow Esc to exit/close picture and left-right arrows to iterate through pictures
//End Settings

//Globals
var $ = jQuery.noConflict(true),
	OrigBodyOverflow = $("body").css('overflow');
	
if (document.URL.indexOf('catalog') < 0 && $('a.fileThumb').length > 0) {
	$(document.body).append('<div id="iSSplay" style="'+StartPos+TextStyle+'">Splay Images</div>');
	var keyFlag = true;
	if (allowKeyControl)
		$(document).keypress(function (e) {
			switch(e.keyCode){
				case 27:
					if (keyFlag)
						$('#iSSplayExit').click();
					else {
						$('#iSFocus').remove();
						keyFlag = true;
					}
					return false;
				case 37:
					if (enableImageIteration && !keyFlag)
						$('#iSLeft').click();
					break;
				case 39:
					if (enableImageIteration && !keyFlag)
						$('#iSRight').click();
					break;
				default:
			}
			return true;
		});
	$('#iSSplay').click(function () {
		//localStorage.removeItem('iSSplay');
		
		//Trigger infinite scrolling images
		var scrollPosition = $(document).scrollTop();
		$(window).scrollTop($(document).height());
		$(window).scrollTop(scrollPosition);
		
		$("body").css('overflow','hidden');
		var maxFlag = false, inThread = document.URL.lastIndexOf('/') > 28;
		$(document.body).prepend('<div id="iSPics" style="overflow:auto;position:fixed;top:0;left:0px;height:100%;width:100%;z-index:1;background-color:'+BackgroundColor+';" />');
		var centerImage = function (img, trueHeight) {
			var tHeight = (trueHeight == null || isNaN(trueHeight) || $(this).attr('error') == '404' ? $(img).height() : trueHeight),
				wHeight = $(window).height(),
				newY = 0;
			if ($('#iS404').length > 0) {
				return false;
			}
			if (tHeight < wHeight) {
				if (maxFlag) {
					$(img).click();
					return false;
				}
				newY = (wHeight - tHeight) / 2;
				$(img).css('cursor', 'default');
				$(img).off('click');
			} else {
				if (maxFlag)
					return false;
				$(img).css('cursor', '-moz-zoom-in').css('cursor', '-webkit-zoom-in');
				$(img).click(function () {
					maxFlag = true;
					$(img).parent().attr('style','position:absolute;text-align:center;top:0;width:100%;height:100%;');
					$(img).attr('style','position:relative;overflow:auto;');
					$(img).css('cursor', '-moz-zoom-out').css('cursor', '-webkit-zoom-out');
					$(img).off('click').click(function () {
						maxFlag = false;
						$(img).parent().attr('style','position:fixed;text-align:center;top:0;width:100%;height:100%;');
						$(img).attr('style','position:relative;max-width:100%;max-height:100%;').off('click').remove('#iSXImg');
						centerImage(img, tHeight);
						return false;
					});
					//$('#iSPics').scrollTop(0);
					return false;
				})
			}
			$(img).css('top',newY+'px');
		};
		
		var t = $('a.fileThumb'), imgTotal = t.length - 1, skip = 0;
		for (var i = 0; i <= imgTotal; i++) {
			var temp = t[i].cloneNode(true);
			$(temp).find('img.expanded-thumb').remove();
			$(temp).find('img').css('display', "");
			if ($(temp).find('img').height() < minSize && ($(temp).find('img').width() < minSize)) {
				skip++;
				continue;
			}
			$(temp).attr('thread',$(t[i]).closest('.thread').attr('id').substring(1));
			$(temp).attr('post',$(t[i]).closest('.post').attr('id').substring(1));
			$(temp).append('<div class="postText" style="display:none;" />');
			$(temp).find('.postText').append($(t[i]).closest('.postContainer').find('.postMessage').clone(true).html());
			if (gD) {
				var tempText = $($(t[i]).parent().find('.fileText')[0]).text(), h;
				if (tempText.indexOf('Spoiler Image') == tempText.indexOf('(') + 1) { //Dastardly spoilers
					$(temp).attr('trueWidth', tempText.substring(h = tempText.lastIndexOf(',')+2, tempText.indexOf('x', h)));
					$(temp).attr('trueHeight', tempText.substring(h = tempText.lastIndexOf('x')+1, tempText.length - 1));
				} else {
					$(temp).attr('trueWidth', tempText.substring(h = tempText.indexOf(',')+2, tempText.indexOf('x', h)));
					$(temp).attr('trueHeight', tempText.substring(h = tempText.indexOf('x', tempText.indexOf(',')) + 1, tempText.indexOf(',', h)));
				}
			}
			if (enableImageIteration) {
				$(temp).attr('id', 'iS'+(i-skip));
			}
			$('#iSPics').append(temp);
		}
		imgTotal -= skip;
		$('#iSPics .fitToPage').remove();
		$('#iSPics img').show();
		$('#iSPics a,#iSPics img').off('click');
		$('#iSPics a').click(function (event) {
			$('<div id="iSFocus" style="position:fixed;text-align:center;top:0;width:100%;height:100%;" />').prependTo('#iSPics');
			$('#iSFocus').append('<img id="iSImg" style="position:relative;max-width:100%;max-height:100%;"/>');
			$('#iSImg').error(function () {
				$(this).off('error').error(function () {
					$('#iSFocus').append('<div id="iS404" style="top:41%;'+TextStyle+'position:relative;cursor:default;font-size:1000%;">404</div>');
				}).attr({src: 'https://sys.4chan.org/image/error/404/rid.php', error: '404'});
				centerImage($(this));
			}).attr('src',$(this).attr('href'));
			maxFlag = false, keyFlag = false;
			var trueHeight = (gD != true ? null : parseInt($(this).attr('trueHeight'))),
				thread = $(this).attr('thread'), post = $(this).attr('post'),
				threadUrl = (inThread ? '' : 'res/') + thread,
				postUrl = (inThread ? '' : 'res/') + thread + '#p' + post,
				postText = $(this).find('.postText').clone(true).css('display', ''),
				current = (enableImageIteration ? parseInt($(this).attr('id').substring(2)) : null);
			if (!inThread) {
				$('#iSFocus').append('<a id="iSOpenThread" class="iSOptions" href="'+threadUrl+'" style="'+OpenThreadPos+TextStyle+'">Go To Image\'s Thread</a>');
				$('#iSOpenThread').click(function () {
					localStorage.iSSplay = true;
					window.location = $(this).attr('href');
				});
			}
			$('#iSFocus').append('<a class="iSOptions" href="'+postUrl+'" style="'+OpenPostPos+TextStyle+'">Go To Image\'s Post</a>',
				'<div id="iSPostText" class="iSOptions" style="'+PostTextPos+TextStyle+'overflow:auto;max-width:98%;max-height:99%;"><u>Post\'s Text</u><div class="postText" style="display:none" /></div>');
			$('#iSPostText .postText').append(postText.clone(true).html());
			$('#iSPostText').hover(function () {
					$(this).css('background-color', PostTextBackgroundColor);
					$(this).find('.postText').show();
				}, function () {
					$(this).css('background-color', '');
					$(this).find('.postText').hide();
			}).click('a', function (e) {
				if ($(e.target).prop("tagName") == 'A') {
					window.location = $(e.target).attr('href');
					$('#iSSplayExit').click();
					return false;
				}
			});
			$('.iSOptions:not(#iSPostText,#iSOpenThread)').click(function () {
				$('#iSSplayExit').click();
			});
			if (!gD)
				$('#iSImg').load(function () {
					centerImage($('#iSImg'));
				});
			else
				centerImage($('#iSImg'), trueHeight);
			$(window).off('resize').resize(function () {
				centerImage($('#iSImg'), trueHeight);
			});
			$('#iSFocus,#iSPics').click(function() { keyFlag = true; $('#iSFocus').remove(); return false; });
			if (enableImageIteration == true) {
				$('#iSFocus').append('<div id="iSLeft" style="top:0;left:0;height:100%;width:5%;'+TextStyle+'z-index:999;"><span style="position:relative;top:48%;">&lt;</span></div>',
					'<div id="iSRight" style="top:0;right:0px;height:100%;width:5%;'+TextStyle+'z-index:999;"><span style="position:relative;top:48%;">&gt;</span></div>');
				$('#iSLeft,#iSRight').hover(function () {
						$(this).css('background-color',imageIterationHoverBackgroundColor);
					}, function () {
						$(this).css('background-color','');
				});
				$('#iSLeft').click(function() {
					if (--current < 0) current = imgTotal;
					$('#iSFocus').click();
					$('#iS'+current).click();
					return false;
				});
				$('#iSRight').click(function() {
					if (++current > imgTotal) current = 0;
					$('#iSFocus').click();
					$('#iS'+current).click();
					return false;
				});
			}
			return false;
		});
		$(this).hide();
		$('#iSPics').append('<div id="iSSplayExit" style="'+ExitPos+TextStyle+'">Exit</div>')
		$('#iSSplayExit').click(function() {
			$("body").css('overflow', OrigBodyOverflow);
			localStorage.removeItem('iSSplay');
			$('#iSPics').remove();
			$('#iSSplay').show();
			$(this).remove();
		});
		var clicked = function (e, el) {
			localStorage.iSSplay = true;
			//Links and forms lose clickability after image focus for some reason, this fixes them.
			if ($(el).prop("tagName") == 'A') {
				window.location = $(el).attr('href');
			}
			else
				window.location = $(el).parent().attr('action');
		};
		
		if (!inThread && showPageList) {
			var pageList = $('.pagelist.desktop')[0].cloneNode(true);
			$(pageList).attr('style', 'float:none;border-style:none;');
			$(pageList).find('a,input').click(function (e) { clicked(e, this); }).mouseup(function (e) { clicked(e, this); });
			var pageList2 = $(pageList).clone(true);
			$(pageList).attr('id','iSPager1');
			$(pageList2).attr('id','iSPager2');
			$('#iSPics').prepend(pageList).append(pageList2);
		}
		if (showBoardList) {
			var boardList = $('#boardNavDesktop')[0].cloneNode(true);
			$(boardList).css('background-color',$($('.post.reply')[0]).css('background-color'));
			$(boardList).find('a').click(function (e) { clicked(e, this); }).mouseup(function (e) { clicked(e, this); });
			$('#iSPics').prepend($(boardList).clone(true)).append(boardList);
		}
	});
	if (localStorage['iSSplay'] == 'true')
		$('#iSSplay').click();
}