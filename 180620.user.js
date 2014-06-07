// ==UserScript==
// @name        Wallbase Batch Link generator + original Link generator
// @include     http://wallbase.cc/*
// @grant       none
// ==/UserScript==
var script = document.createElement( 'script' ),
	getStatus = new String,
	imgFound = 0,
	pagesFound = 0,
	failedOnce = false,
	failProcessDetails = {currentUrl:'', nextPageUrl:'', i: 0, pageType: '', linkChecked:0},
	failGetOrigin = {convertedLink: 0, i:0},
	clearList = true;
script.onload = function () {
    jQuery.noConflict( true ); //remove this and image load fails
	buildHTML(); // builds the panel HTML
};
script.src = 'http://code.jquery.com/jquery-2.0.3.min.js';
document.head.appendChild(script);

function buildHTML(){
	var getLinkPanel = '<div id="custPanel">';
			getLinkPanel += '<div id="mainCont">';
				getLinkPanel += '<div id="btnCont">'
					getLinkPanel += '<div id="getLinkBtnCont" class="btnCont">';
						getLinkPanel += '<a class="getLinkBtn" href="javascript:;">Get links</a>';
					getLinkPanel += '</div>';
					getLinkPanel += '<div id="getPagesBtnCont" class="btnCont">';
						getLinkPanel += '<a class="getPageBtn" href="javascript:;">Get links from all pages</a>';
					getLinkPanel += '</div>';
					getLinkPanel += '<div id="getImgCont" class="btnCont">';
						getLinkPanel += '<a class="getImgBtn" href="javascript:;">Generate download button</a>';
					getLinkPanel += '</div>';
					getLinkPanel += '<div id="getCustomCont" class="btnCont">';
						getLinkPanel += '<a class="getCustomLink" href="javascript:;">Scan custom list</a>';
					getLinkPanel += '</div>';
					getLinkPanel += '<div id="failBtnCont" class="btnCont">';
						getLinkPanel += '<a class="failBtn" href="javascript:;">Continue ...</a>';
					getLinkPanel += '</div>';
				getLinkPanel += '</div>'
				getLinkPanel += '<div id="statusCont">';
					getLinkPanel += '<p>Images Found : <span class="imgFound"></span></p>';
					getLinkPanel += '<p>Pages Found : <span class="pagesFound"></span></p>';
					getLinkPanel += '<p>Progress : <span class="progress"></span></p>';
				getLinkPanel += '</div>';
				getLinkPanel += '<div id="listCont">';
					getLinkPanel += '<form><textarea id="customLinkList">http://wallbase.cc/wallpaper/884506' + '\n' + 'http://wallbase.cc/wallpaper/884985' + '\n' + 'http://wallbase.cc/wallpaper/885325' + '\n' + 'http://wallbase.cc/wallpaper/885444' + '\n' + 'http://wallbase.cc/wallpaper/885473' + '\n' + 'http://wallbase.cc/wallpaper/886986' + '\n' + 'http://wallbase.cc/wallpaper/886992' + '\n' + 'http://wallbase.cc/wallpaper/887140' + '\n' + 'http://wallbase.cc/wallpaper/889283' + '\n' + 'http://wallbase.cc/wallpaper/889653\</textarea></form>';
					getLinkPanel += '<div id="linkList"><ul></ul></div>';
				getLinkPanel += '</div>';
			getLinkPanel += '</div>';
			getLinkPanel += '<a class="togglePanelBtn" href="javascript:;">Show/Hide Panel</a>';
		getLinkPanel += '</div>';
	jQuery('body').prepend(getLinkPanel);
	jQuery('.getLinkBtn, .getPageBtn, .getImgBtn, .getCustomLink').on('click', generateList); // bind click event to the button to generate list of original Links from thumbs
	//$('.getImgBtn').trigger('click');
	jQuery('.togglePanelBtn').click(function(){
		jQuery('#mainCont').slideToggle();
	});
	buildCSS(); // sets the CSS of the panel
};
function buildCSS(){
	var panelCss = '#custPanel{position: fixed; top:0; left:0; background:#000; width:100%; z-index: 1000; font-size:16px;} ';
		panelCss += '#mainCont, .btnCont a, .btnCont a, #statusCont, .btnCont a, .btnCont, #listCont, #btnCont{float:left;}';
		panelCss += '#mainCont{display:none; width:90%; min-height:100px; padding:10px 5%;}';
		panelCss += '#statusCont{font-size:18px;}';
		panelCss += '#linkList, #customLinkList{float:right; width:800px; min-height:250px; max-height:400px; overflow:auto;}';
		panelCss += '#customLinkList{float:left; resize:no-resize;}';
		panelCss += '#linkList li{font-size:18px;}';
		panelCss += '#failBtnCont{display:none;}'
		panelCss += '#failBtnCont.active{display:block;}';
		panelCss += '#failBtnCont a{background:red;}'
		panelCss += '.btnCont{margin:0 10px 0 0; font-size:14px;}';
		panelCss += '.btnCont a{background:#fff; padding:5px 10px; color:#000; text-transform:uppercase; text-align:center;} ';
		panelCss += '.togglePanelBtn{background:#fff; width:200px; height:20px; padding:5px 10px; color:#000; text-transform:uppercase; text-align:center; position:absolute; left:0; bottom:-30px;}';
		panelCss += '#listCont{width:100%; margin:20px 0 0;}'
		panelCss += '.dlBtn{background:#fff; border:1px solid:#000; color:#000; position:absolute; bottom:10px; right:10px; width:30px; height:20px; padding:5px;}';
	jQuery('head').prepend('<style>'+ panelCss +'</style>');
};
function generateList(){
	updateStatus(false, false, 'loading');
	var getLinkBtn = $(this).hasClass('getLinkBtn'),
		getImgBtn = $(this).hasClass('getImgBtn'),
		getCustomBtn = $(this).hasClass('getCustomLink'),
		getPageBtn = $(this).hasClass('getPageBtn');
	if(getLinkBtn){
		var target = jQuery('#thumbs div[id^="thumb"]');
		target.each(function(index){
			var imgLink = jQuery(jQuery(this).find('.wrapper').children('a')[1]).prop('href');
			jQuery.get(imgLink, function(data){
				var imgLinkOrigin = jQuery(data).find('.content.clr img').attr('src');
				buildList(imgLinkOrigin);
			});
			updateStatus((imgFound += 1), false, false);
		});
	}else if(getPageBtn){
		jQuery('#thumbs div[id^="thumb"]').each(function(){
			var imgLink = jQuery(jQuery(this).find('.wrapper').children('a')[1]).prop('href');
			jQuery('#linkList ul').append('<li>' + imgLink + '</li>');
			updateStatus((imgFound += 1), false, false);
		});
		updateStatus(false, (pagesFound += 1), false);
		var currentUrl = window.location.href;
		if (currentUrl.indexOf('?') != -1){
			currentUrl = currentUrl.split('?'),
			linkChecked = 0, // first value = current, second already started get
			i = 32,
			nextPageUrl = currentUrl[0] + '/index/' + i + '?' +  currentUrl[1];
			getNextPage(currentUrl, nextPageUrl, 'tag');
		}else if(currentUrl.indexOf('toplist') != -1){
			linkChecked = 0, // first value = current, second already started get
			i = 32,
			nextPageUrl = currentUrl + '/index/' + i;
			getNextPage(currentUrl, nextPageUrl, 'toplist');
		};
	}else if(getImgBtn){
		var totalElem = jQuery('#thumbs div[id^="thumb"] .wrapper').length - 1;
		updateStatus(totalElem, false, false);
		jQuery('#thumbs div[id^="thumb"]').each(function(index){
			var targetCont = jQuery(this).find('.wrapper'),
			dlBtnExist = targetCont.children('.dlBtn');
			if(dlBtnExist.length == 0){
				var imgLink = jQuery(jQuery(this).find('.wrapper').children('a')[1]).prop('href'),
				imgLinkOrigin;
				jQuery.get(imgLink, function(data){
					imgLinkOrigin = jQuery(data).find('.content.clr img').attr('src');
					jQuery('#linkList ul').append('<li>' + imgLinkOrigin + '</li>');
					var dlBtn = '<a class="dlBtn" href="'+ imgLinkOrigin +'" download="'+ imgLinkOrigin +'" target="_blank">DL</a>';
					targetCont.append(dlBtn);
					if (index == totalElem){
					}
				});
			};
		});
		detectScroll();
	}else if(getCustomBtn){
		var customList = jQuery('#customLinkList'),
			customListVal = jQuery('#customLinkList').val();
			customListVal = customListVal.split('\n'),
			customValLength = customListVal.length - 1;
			updateStatus(customListVal.length, false, false);
		jQuery(customListVal).each(function(index){
			var imgLink = (customListVal[index]);
			buildList(imgLink);
			if(index == customValLength){
				setTimeout(function(){
					getOriginalLink();
				}, 1000);
			}
		});
	}
};
function buildList(imgLink){
	if(clearList){
		jQuery('#linkList li').remove();
		clearList = false;
	}
	jQuery('#linkList ul').append('<li>' + imgLink + '</li>');	
};
function getNextPage(currentUrl, nextPageUrl, pageType, failNum, failCheck){
	if(failNum && failCheck){
		i = failNum,
		linkChecked = failCheck;
		jQuery('#failBtnCont').removeClass('active');
	}
	var checkNextPage = setInterval(function(){
		if(linkChecked != i || failedOnce){
			failedOnce = false;
			jQuery('#failBtnCont a').off('click');
			linkChecked = i;
			jQuery.get(nextPageUrl, function(data) {
				var noMorePage = jQuery(data).hasClass('notice1');
				if(noMorePage){
					updateStatus(false, false, 'Done!');
					clearInterval(checkNextPage);
					getOriginalLink();
				}else{
					//retrieve List of thumb links
					jQuery(data).find('.wrapper').each(function(){
						var imgLink = jQuery(jQuery(this).children('a')[1]).prop('href');
						jQuery('#linkList ul').append('<li>' + imgLink + '</li>');
						updateStatus((imgFound += 1), false, false);
					});
					//prepare next link
					i = i + 32;
					if( pageType == 'tag' ){
						nextPageUrl = currentUrl[0] + '/index/' + i + '?' +  currentUrl[1];
					}else if(pageType == 'toplist'){
						nextPageUrl = currentUrl + '/index/' + i;
					}
				};
				updateStatus(false, (pagesFound += 1), false);
			}).fail(function(){
				jQuery('#failBtnCont').addClass('active');
				failedOnce = true;
				failProcessDetails.currentUrl = currentUrl,
				failProcessDetails.nextPageUrl = nextPageUrl,
				failProcessDetails.i = i,
				failProcessDetails.pageType = pageType,
				failProcessDetails.linkChecked = linkChecked;
				clearInterval(checkNextPage);
				jQuery('#failBtnCont a').click(function(){
					getNextPage(failProcessDetails.currentUrl, failProcessDetails.nextPageUrl, failProcessDetails.pageType, failProcessDetails.i, failProcessDetails.linkChecked);
				});
			});
		};
	},2000);
};
function getOriginalLink(failNum, failCon){
	var i = 0,
		convertedLink = 0,
		totalelem = jQuery('#linkList li').length;
	if(failNum && failCon){
		i = failNum,
		convertedLink = failCon;	
	}
	var checkNextPage = setInterval(function(){
		if(i == convertedLink || failedOnce){
			if(!failedOnce)
				convertedLink++;
			failedOnce = false;
			if(i == totalelem){
				clearInterval(checkNextPage);
				updateStatus(false, false, ('Done!'));
			}else{
				var imgLink = jQuery(jQuery('#linkList li')[i]).text();
				jQuery.get(imgLink, function(data){
					var imgLinkOrigin = jQuery(data).find('.content.clr img').attr('src');
					jQuery(jQuery('#linkList li')[i]).text(imgLinkOrigin);
					i++;
					updateStatus(false, false, ('Processing original link image ' + i));
				}).fail(function(){
					jQuery('#failBtnCont').addClass('active');
					failedOnce = true;
					failGetOrigin.convertedLink = convertedLink,
					failGetOrigin.i = i;
					clearInterval(checkNextPage);
					jQuery('#failBtnCont a').click(function(){
						getOriginalLink(failGetOrigin.i, failGetOrigin.convertedLink);
					});
				});
			};
		}
	},2000);
	
}
function updateStatus(imgStatus, pagesStatus, progressStatus){
	if(imgStatus){
		jQuery('.imgFound').text(imgStatus);
	}
	if(pagesStatus){
		jQuery('.pagesFound').text(pagesStatus);
	}
	if(progressStatus){
		jQuery('.progress').text(progressStatus);
	}
};

var elemH = $('#thumbs').height(),
	winH = $(window).height(),
	elementPos = elemH - winH,
	fnRunning = false;
function detectScroll(){
	if(!fnRunning){
		elemH = $('#thumbs').height(),
		winH = $(window).height(),
		elementPos = elemH - winH;
		jQuery(window).scroll(function(){
			var elementPosRel = jQuery(window).scrollTop();
			if (elementPos < elementPosRel){
				elemH = $('#thumbs').height(),
				elementPos = elemH - (winH);
				$('.getImgBtn').trigger('click');
			} 
		});
	};
	fnRunning = true;
};