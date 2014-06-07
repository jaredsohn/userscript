// ==UserScript==
// @name       jc Image Zoomer
// @namespace  http://jiichen.at.home/
// @description  Zoom Image
// @description  Support domain/Host: wretch.cc , yam.com , qing.weibo.com , facebook(link)
// @require    http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// @include    http://www.wretch.cc/album/album.php?id=*
// @include    http://www.wretch.cc/album/*
// @include    http://album.blog.yam.com/*
// @include    http://qing.weibo.com/*
// @include    http://www.facebook.com/*
// @include    https://www.facebook.com/*
// @include    http://photo.pchome.com.tw/*
// @exclude    https://apps.facebook.com/*
// @downloadURL https://userscripts.org/scripts/source/123063.user.js 
// @updateURL  https://userscripts.org/scripts/source/123063.meta.js
// @version    0.5.1
// @history    0.4: add support facebook.com's externel link
// @history    0.3: add support photo.pchome.com.tw
// @copyright  2012, jc
// ==/UserScript==


//GM_addStyle("#jcZoomImgArea {position:fixed; top:0px; left:100px; border:3px solid #66CCFF; background-color:gray; padding:2px; z-index:2147483647;}");
GM_addStyle("#jcZoomImgArea {position:fixed; top:0px; left:100px; border:3px solid #66CCFF; background-color:gray; padding:2px; z-index:1000000;}");

var globalImageMinWidth = 30;  // mouseenter 時圖的最小寬度
var globalImageMinHeight = 30; // mouseenter 時圖的最小高度
var globalMouseStatus = 0; // 0: mouseleave ; 1: mouseenter
var globalDivId = 'jcZoomImgArea';

var globalHost = ''; // Host , ex: qing.weibo.com
var globalDomain = ''; // 網域 , ex: weibo.com


function doJcMouseEnter(url , img_filename , x , y) {
    // Mouse Enter
    // 放大圖檔
    // 1. load url
    // 2. get big image url
    // 3. create(or reuse) div area to show big image
    // 4. hide div area when mouse leave the small image
    if ($('#' + globalDivId).length === 0) {
        $('body').append('<div id="' + globalDivId + '"></div>');
    }
    var divObj = $('#' + globalDivId);
    
    divObj.find('*').remove();
    
    divObj.css('left' , (x + 50) + 'px');
    
    
    divObj.load(url + ' img[src*="' + img_filename + '"]:eq(0)' , 
                function( responseText, textStatus, XMLHttpRequest ) {
                    $(this).find('img').load(function() {
                        var win_h = $(window).height();
                        var win_w = $(window).width()-30;
                        var max_img_w = Math.max(x-50 , parseInt(win_w/2 , 10)-50);
                        
                        var big_img_width  = $(this).width();
                        var big_img_height = $(this).height();
                        
                        var adjust_img_width  = big_img_width;
                        var adjust_img_height = big_img_height;
                        // 依據 img 寬高調整 div 位置
                        
                        var space1 = 10; // 預留之空白或邊框寬度
                        if ((big_img_height + space1) > win_h) {
                            adjust_img_height = (win_h - space1);
                            adjust_img_width  = parseInt(adjust_img_height * (big_img_width / big_img_height) , 10);
                        }
                        
                        if ((big_img_width + space1) > max_img_w) {
                            adjust_img_width  = max_img_w;
                            adjust_img_height = parseInt(adjust_img_width * (big_img_height / big_img_width) , 10);
                        }
                        
                        $(this).width(adjust_img_width)
                            .height(adjust_img_height);
                        
                        //if (x > (win_w/2)) {
                        if ((x + 50 + adjust_img_width) > win_w) {
                            divObj.css('left' , (x - adjust_img_width - 50) + 'px');
                        }
                        
                    });
                });
    //divObj.load(url + ' img');
    
    
    divObj.show();
    
}


function get_img_keyword(thumb_url)
{
    // 回傳 縮圖與大圖同樣都有的關鍵字 (一般式利用檔名)
    var thumb_len = 0;
		var idx = 0;
    if ('yam.com' == globalDomain) {
        idx = thumb_url.indexOf("/album/t_");
        thumb_len = 9;
    } else if ('wretch.cc' == globalDomain) {
        idx = thumb_url.indexOf("thumbs/t");
        thumb_len = 8;
    } else if ('photo.pchome.com.tw' == globalHost) {
        idx = thumb_url.indexOf('s.jpg');
        thumb_len = 13;
        return thumb_url.substr(idx - thumb_len , thumb_len );
    } else if ('qing.weibo.com' == globalHost) {
        idx = thumb_url.indexOf("/bmiddle/");
        thumb_len = 9;
    } else {
        return -1;
    }
    var s = thumb_url.substr(idx + thumb_len);
    var idx2 = s.indexOf('?');
    return s.slice(0, idx2);
}

function doJcZoomUrl2(url , x , y) {
    // Zoom 第二種方式
    
    //alert(url);
    
    // 避開 HoverImage 的重疊
    //if ($('.rg3fbpz-tooltip').length > 0) {
    //    var hzImg = $('.rg3fbpz-tooltip');
    //} else {
    //    var hzImg = $('#hzImg');
    //}
    
    //if ((globalMouseStatus == 1) && ((hzImg.is(':hidden')) || (hzImg.width() <= 250))) {
	if (globalMouseStatus == 1) {
        
        if ($('#' + globalDivId).length === 0) {
            $('body').append('<div id="' + globalDivId + '"></div>');
        }
        var divObj = $('#' + globalDivId);
        
        divObj.find('*').remove();
        
        divObj.css('left' , (x + 20) + 'px');
        
				try {
					var flags2   = '';
					var regex2   = new RegExp('(http(s|)://)((.*?)(([^.]*?)\.([^.]*?)))/' , flags2);
					var matches2 = regex2.exec(url);
					if (!( (matches2 == false) || (matches2 == null) || (typeof matches2 == undefined) )) {
						var aPre     = matches2[1]; // ex: https://
						var aHost    = matches2[3]; // ex: www.wretch.cc
						var aDomain  = matches2[5]; // ex: wretch.cc
					}
        } catch(e) {
					console.log('ERROR: ' + e.message);
				}
				
        
				if (!( (matches2 == false) || (matches2 == null) || (typeof matches2 == undefined) )) {
					divObj.load(url + ' img' , function(response, status, xhr) {
							
							if ('success' == status) {
									
									$(this).find('script').remove();
									$(this).find('embed').remove();
									$(this).find('object').remove();
									$(this).find('style').remove();
									
									$(this).find('img').each(function() {
											var aSrc = $(this).attr('src');
											if ( (undefined != aSrc) && (aSrc.match(/http(s|):\/\//) === null) ) {
													var nSrc = aPre + aHost + '/' + aSrc;
													$(this).attr('src' , nSrc );
											}
											
									}).load(function() {
											if ($(this).width() <= 50) {
													$(this).remove();
											} else if ($(this).height() <= 50) {
													$(this).remove();
											} else if (($(this).height()*2) < $(this).width()) { // 橫幅廣告或 logo 的可能性很高
													$(this).remove();
											} else {
													var win_h = $(window).height();
													var win_w = $(window).width()-30;
													var max_img_w = Math.max(x-50 , parseInt(win_w/2 , 10)-50);
													
													var big_img_width  = $(this).width();
													var big_img_height = $(this).height();
													
													var adjust_img_width  = big_img_width * 2;
													var adjust_img_height = big_img_height * 2;
													// 依據 img 寬高調整 div 位置
													
													var space1 = 25; // 預留之空白或邊框寬度
													if ((adjust_img_height + space1) > win_h) {
															adjust_img_height = (win_h - space1);
															adjust_img_width  = parseInt(adjust_img_height * (big_img_width / big_img_height) , 10);
													}
													
													if ((adjust_img_width + space1) > max_img_w) {
															adjust_img_width  = max_img_w;
															adjust_img_height = parseInt(adjust_img_width * (big_img_height / big_img_width) , 10);
													}
													
													//alert( win_w + ' x ' + win_h + ' : ' + big_img_width + ' x ' + big_img_height + ' vs ' + adjust_img_width + ' x ' + adjust_img_height );
													
													$(this).width(adjust_img_width)
															.height(adjust_img_height);
													
													//if (x > (win_w/2)) {
													if ((x + 20 + adjust_img_width) > win_w) {
															divObj.css('left' , (x - adjust_img_width - 20) + 'px');
													}
											}
											
											window.setTimeout(function() {
													$('#hzImg').hide();
													//alert('xx');
											} , 3000 );
									});
									
							} else {
									divObj.hide(); // 失敗則隱藏
							}
							
					});
					
					
					divObj.show();
					//hzImg.css('opacity' , 0);
					//$('.rg3fbpz-tooltip').css('opacity' , 0);
					//$('#hzImg').css('display' , 'none');
        }
    }
    
}

function doJcLoadFacebookImage(thumb_src , x , y) {
    // Load Facebook Image
    
    if (globalMouseStatus == 1) {
        
        
        if ($('#' + globalDivId).length === 0) {
            $('body').append('<div id="' + globalDivId + '"></div>');
        }
        
        
        var divObj = $('#' + globalDivId);
        //alert(divObj.find('*').length);
        
        divObj.find('*').remove();
        
        
        //alert('xx1');
        divObj.css('left' , (x + 20) + 'px');
        //alert('xx2');
        
        //https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash3/c0.0.403.403/p403x403/554689_3768521765276_1404934998_n.jpg
				try {
					bigImage = '';
					var flags2   = '';
					var regex2   = new RegExp('(http(s|)://)(.*?/)(.*?/)(.*?/)(.*?/)((.*?)\.(jpg|gif|png))' , flags2);
					var matches2 = regex2.exec(thumb_src);
					if (!( (matches2 == false) || (matches2 == null) || (typeof matches2 == undefined) )) {
						var aPre      = matches2[1]; // ex: https://
						var aHost     = matches2[3]; // ex: fbcdn-sphotos-a.akamaihd.net/
						var aMidName  = matches2[4]; // ex: hphotos-ak-ash3/
						var aImgName  = matches2[7]; // ex: 554689_3768521765276_1404934998_n.jpg
						var bigImage  = aPre + aHost + aMidName + aImgName;
					}
        } catch(e) {
					console.log('ERROR: ' + e.message);
				}
				
				if ('' != bigImage) {
					divObj.show();
					divObj.append('<img id="jcImgZoom3" src="' + bigImage + '" border="0" />');
					$('#jcImgZoom3').load(function() {
							var win_h = $(window).height();
							var win_w = $(window).width()-30;
							var max_img_w = Math.max(x-50 , parseInt(win_w/2 , 10)-50);
							
							var big_img_width  = $(this).width();
							var big_img_height = $(this).height();
							
							var adjust_img_width  = big_img_width * 2;
							var adjust_img_height = big_img_height * 2;
							// 依據 img 寬高調整 div 位置
							
							var space1 = 25; // 預留之空白或邊框寬度
							if ((adjust_img_height + space1) > win_h) {
									adjust_img_height = (win_h - space1);
									adjust_img_width  = parseInt(adjust_img_height * (big_img_width / big_img_height) , 10);
							}
							
							if ((adjust_img_width + space1) > max_img_w) {
									adjust_img_width  = max_img_w;
									adjust_img_height = parseInt(adjust_img_width * (big_img_height / big_img_width) , 10);
							}
							
							//alert( win_w + ' x ' + win_h + ' : ' + big_img_width + ' x ' + big_img_height + ' vs ' + adjust_img_width + ' x ' + adjust_img_height );
							
							$(this).width(adjust_img_width)
									.height(adjust_img_height);
							
							//if (x > (win_w/2)) {
							if ((x + 20 + adjust_img_width) > win_w) {
									divObj.css('left' , (x - adjust_img_width - 20) + 'px');
							}
							
							$('#hzImg').hide();
							window.setTimeout(function() {
									$('#hzImg').hide();
									//alert('xx');
							} , 1500 );
					});
        }
        
        
    }
    
    
}

function doJcMouseLeave() {
    // Mouse Leave
    var divObj = $('#' + globalDivId);
    
    divObj.hide();
	divObj.find('*').remove();
}

function JcMouseEnterEvent(thisObj , e) {
    var imgObj = $(thisObj);
    var aObj = $(thisObj).parents('a');
    globalMouseStatus = 1;
    
    //alert(imgObj.html());    alert(aObj.html());
    
    var t1 = false;
    var t2 = false;
    
    if ('IMG' == imgObj[0].tagName) {
        t1 = (imgObj.width() >= globalImageMinWidth);
        t2 = (imgObj.height() >= globalImageMinHeight);
    } else {
        t1 = true;
        t2 = true;
    }
    
    if ( t1 && t2 ) {
        // alert( imgObj.width() + ' x ' + imgObj.height() );
        var thumb_src = imgObj.attr('src');
        var img_filename = -1;
        if (typeof thumb_src !== 'undefined' && thumb_src !== false) {
            img_filename = get_img_keyword(thumb_src);
        } 
        
        if (-1 != img_filename) {
            doJcMouseEnter(aObj.attr('href') , img_filename , e.pageX , e.pageY);
        } else {
            //alert(aObj.html());
            //alert(thumb_src);
            if ('facebook.com' == globalDomain) {
                doJcLoadFacebookImage(thumb_src , e.pageX , e.pageY);
            } else {
                window.setTimeout(function() {
                    doJcZoomUrl2(aObj.attr('href') , e.pageX , e.pageY);
                } , 1200);
            }
        }
        
    } else {
        //alert('No match image min width & height:' + imgObj.width() + ' x ' + imgObj.height() );
    }
}

function JcMouseLeaveEvent(thisObj) {
    globalMouseStatus = 0;
    doJcMouseLeave();
}

$(document).ready(function() {
    
    var flags   = '';
    var regex   = new RegExp('http(s|)://((.*?)(([^.]*?)\.([^.]*?)))/' , flags);
    //var regex   = new RegExp('http(s|)://((.*?)(([^.]*?)\.([^.]*?)))//' , flags);
    var matches = regex.exec(location.href);
    globalHost    = matches[2]; // ex: www.wretch.cc
    globalDomain  = matches[4]; // ex: wretch.cc
    //alert('Host = ' + host + "\nDomain = " + domain);
    
    $('a img').live('mouseenter' , function(e) {
        JcMouseEnterEvent(this , e);
    });
    
    $('a img').live('mouseleave' , function() {
        JcMouseLeaveEvent(this);
    });
    
    if ('facebook.com' == globalDomain) {
        $('a span').live('mouseenter' , function(e) {
            JcMouseEnterEvent(this , e);
        });
        
        $('a span').live('mouseleave' , function() {
            JcMouseLeaveEvent(this);
        });
        
        
    }
    
});
