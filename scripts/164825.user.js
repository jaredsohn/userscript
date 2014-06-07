// ==UserScript==
// @name           131 Bulk Loader (No Gap)
// @version        3.0
// @description    利用131.com一页多图功能一次性无缝显示（最多）300页漫画；解除鼠标右键（另存为）限制；取消（除最后一页的）鼠标左键翻页功能以防止误点；图片自适应窗口宽度
// @match          http://comic.131.com/content/*/*/*.*html*
// @require        http://userscripts.org/scripts/source/164164.user.js
// @require        http://userscripts.org/scripts/source/167761.user.js
// @grant          none
// ==/UserScript==

var TIME_OUT = 10000;
var PRELOAD_INDICATOR = 'fl opens';
var IMAGE_DIV = "mh_zdimg";
var originalUrl;

function bulkLoad() {
	var argsArray = getQueryStringArgs();
	var size = 300;
	var idArray = location.href.substring(location.href.indexOf("/content/") + 9, location.href.lastIndexOf("/")).split('/');
	var sid = parseInt(idArray[0]), bid = parseInt(idArray[1]), total = 0;
	var pageNumber = parseInt(location.href.substring(location.href.lastIndexOf('/') + 1, location.href.lastIndexOf('.')));
	var page = parseInt((pageNumber - 1) / size) + 1;
	
	if (page > 0 && size > 0 && sid > 0 && bid > 0) {
		//设置漫画中心图链接为loading图片
		$("#comicBigPic").attr("src", "http://res.files.131.com/zhuanti/20120718_kuaiba/skins/ie7/loading.gif");
		$.ajax({
			url: "/json/" + sid + "/" + bid + ".js",
			dataType: 'json',
			async: false,
			success: function(data) {
				if (data != null && data.imageslist != null) {
					total = data.total;
					size = total > size ? size : total;
					var pageCount = parseInt((total + size - 1) / size);
					var imgsHtml = '';
					var nextHref = '';
					if (page == pageCount) {
						nextHref = 'javascript:lastPage(\'' + data.nexturl + '\', ' + data.islast + ');';
					}
					else {
						nextHref = getNextHrefExceptTheLast();
					}
					
					var isAutoFix = document.getElementById('inputAutoFix1').checked;
					
					var j;
					for (j = pageNumber - 1; j < (page * size > total ? total - 1 : page * size - 1); j++) {
						imgsHtml += '<div class="mh_zdimg" style="display: block;">';
						imgsHtml += '<a style="display: inline-block;"><img src="' + data.imageslist[j].imgurl + '" /></a>';
						imgsHtml += '</div>';
					}
					imgsHtml += '<div class="mh_zdimg" style="display: block;">';
					imgsHtml += '<a href="' + nextHref + '" style="display: inline-block;"><img src="' + data.imageslist[j].imgurl + '" /></a>';
					imgsHtml += '</div>';
					
					$(".mh_zdimg").slice(1).remove();
					$(".mh_zdimg").replaceWith(imgsHtml);
					
					//重新设置漫画当前页数显示及上，下一页链接，以及重新填充select标签快捷选页
					$.each($(".wh_fg .fr"), function(index, item) {
						if (page == 1 && page != pageCount) {
							$(item).children().eq(1).unbind('click').click(function(event) { alert("已经是第一页了。 ^_^"); return false; });
							$(item).children().eq(3).attr("href", getNextHrefExceptTheLast());
						} else if (page != 1 && page == pageCount) {
							$(item).children().eq(1).attr("href", getPreviousHrefExceptTheFirst());
							$(item).children().eq(3).unbind('click').click(function(event) { lastPage(data.nexturl, data.islast); return false; });
						} else if (page == 1 && page == pageCount) {
							$(item).children().eq(1).unbind('click').click(function(event) { alert("已经是第一页了。 ^_^"); return false; });
							$(item).children().eq(3).unbind('click').click(function(event) { lastPage(data.nexturl, data.islast); return false; });
						} else if (page != 1 && page != pageCount) {
							$(item).children().eq(1).attr("href", getPreviousHrefExceptTheFirst());
							$(item).children().eq(3).attr("href", getNextHrefExceptTheLast());
						}
						$(item).children().eq(0).children("em").html(pageNumber + "-" + (page * size > total ? total : page * size));
						$(item).children().eq(2).change(function(event) {
							location.href = 
								location.href.substring(0, location.href.lastIndexOf('/') + 1) + 
								$(this).val() + 
								location.href.substring(
									location.href.lastIndexOf('.'), location.href.lastIndexOf('html') + 4
								);
							return false;
						});
						$(item).children().eq(2).find("option[value='" + pageNumber + "']").attr("selected", true);
					});
					//设置每页多少张图片select标签的选中值
					$("#selPageSizeSetting1").find("option[value='" + size + "']").attr("selected", true);
					$("#selPageSizeSetting2").find("option[value='" + size + "']").attr("selected", true);
					
					$(window.document.body).unbind('keyup').keyup(function(event) {
						var keyCode = event.which;
						if (keyCode == 37) {
							if (page == 1) {
								alert("已经是第一页了。 ^_^");
							} else {
								location = getPreviousHrefExceptTheFirst();
							}
							return false;
						}
						else if (keyCode == 39) {
							if (page == pageCount) {
								lastPage(data.nexturl, data.islast);
							} else {
								location = getNextHrefExceptTheLast();
							}
							return false;
						}
					});
				}
			}
		});
	}
	
	document.getElementById('inputAutoFix1').onclick();
	$(window.document.body).focus();
}

function init() {
	originalUrl = document.location.href;
}

function restoreOnFailure() {
	if (document.getElementsByClassName(PRELOAD_INDICATOR)[0]) {
		if (document.getElementsByClassName(IMAGE_DIV).length <= 1) {
			if (originalUrl) {
				var s = document.getElementsByName('jumpMenu')[0];
				if (s.selectedIndex != s.length - 1) {
					document.location.href = originalUrl.split('?page=')[0] + '?';
				}
			}
		}
	}
}

init();
if (originalUrl) { 
	if (!originalUrl.contains('&size=') && !originalUrl.endsWith('.html?')) {
		setTimeout(restoreOnFailure, TIME_OUT);
		
		appendScript(autofix, document.body);
		appendScript(fitWindowWidth, getSystemJS().parentNode, true);
		appendScript(checkCheckboxes, getSystemJS().parentNode, true);
		appendScript(bulkLoad, document.body, true);
		appendScript(resetJumpMenu, getSystemJS().parentNode, true);
		
		var image = document.getElementsByClassName(IMAGE_DIV)[0];
		if (image) {
			jAddEventListener(image, 'DOMNodeRemoved', removedHandler, 200);
		}
		var jumpMenus = document.getElementsByName('jumpMenu');
		var jumpMenuHandlers = new Array(jumpMenus.length);
		for (var i = 0; i < jumpMenus.length; i++) {
			jAddEventListener(jumpMenus[i], 'DOMNodeRemoved', jumpMenuHandler, 200);
		}
	}
}

function removedHandler(event) {
	appendScript(bulkLoad, document.body, true);
}

function jumpMenuHandler(event, currentTarget) {
	jRemoveEventListener(currentTarget, 'DOMNodeRemoved', jumpMenuHandler);
	appendScript(resetJumpMenu, getSystemJS().parentNode, true);
}


function resetJumpMenu() {
	var selOptions = '';
	for (var i = 1; i <= total; i++) {
		selOptions += '<option value="' + i + '">第' + i + '图</option>';
	}
	
	$('.fr select[name="jumpMenu"]').html(selOptions).val(pageNum);
}

function getSystemJS() {
	var scriptTags = document.body.getElementsByTagName('script');
	for (var i = 0; i < scriptTags.length; i++) {
		if (scriptTags[i].src.contains('System.js')) {
			return scriptTags[i];
		}
	}
}

function fitWindowWidth() {
	$('#inputAutoFix1, #inputAutoFix2').unbind('click').attr('onclick', "\
		var checked = $(this).prop('checked');\
		$('#inputAutoFix1, #inputAutoFix2').prop('checked', checked);\
		$('.mh_zdimg input[type=\"checkbox\"]').prop('checked', checked);\
		autofix(0, $('.mh_zdimg img'), checked);\
		Response.Cookies('ComicAutoFix', checked ? 1 : 0, 0365, '/', '131.com');");
	
	$(window).resize(function() {
		$('#inputAutoFix1').get(0).onclick();
	});
}

function checkCheckboxes() {
	var isAutoFix = Request.Cookies('ComicAutoFix');
	if (1 == isAutoFix) {
		$('#inputAutoFix1, #inputAutoFix2').prop("checked", true);
	} else {
		$('#inputAutoFix1, #inputAutoFix2').prop("checked", false);
	}
}

function autofix(windowWidth, jQueryImage, isAuto) {
	if (isAuto) {
		var MARGIN = 2;
		jQueryImage.css('maxWidth', $(window).width() - MARGIN);
	}
	else {
		jQueryImage.css('maxWidth', 'none');
	}
}

function appendScript(newFunction, container, isSelfInvoking) {
	var newScript = document.createElement("script");
	
	if (!isSelfInvoking) {
		newScript.innerHTML = newFunction.toString();
	}
	else {
		newScript.innerHTML = '(' + newFunction.toString() + ')()';
	}

	if (isElement(container)) {
		container.appendChild(newScript);	
	}
}

function isElement(o) {
	return (
		'object' === typeof HTMLElement ? o instanceof HTMLElement : 
		o && typeof o === 'object' && 1 === o.nodeType && 'string' === typeof o.nodeName
	);
}

function getNextHrefExceptTheLast() {
	return (parseInt(location.href.substring(location.href.lastIndexOf('/') + 1, location.href.lastIndexOf('.'))) + 1) + '';
}
function getPreviousHrefExceptTheFirst() {
	return (parseInt(location.href.substring(location.href.lastIndexOf('/') + 1, location.href.lastIndexOf('.'))) - 1) + '';
}