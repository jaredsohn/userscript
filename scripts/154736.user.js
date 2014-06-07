// ==UserScript==
// @name       jc_Image_Zoomer_2
// @namespace  http://jiichen.at.home/
// @description  Zoom Image
// @description  Support domain/Host: wretch.cc , yam.com , qing.weibo.com , facebook(link)
// @require    http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js
// @include    http://www.wretch.cc/album/*
// @include    http://album.blog.yam.com/*
// @include    http://qing.weibo.com/*
// @include    http://weibo.com/*
// @include    http://www.weibo.com/*
// @include    http://photo.pchome.com.tw/*
// @include    http://*/thread*
// @include    http://*.4chan.org/*
// @exclude    http://www.youtube.com/
// @exclude    https://www.facebook.com/
// @exclude    https://app.facebook.com/
// @downloadURL https://userscripts.org/scripts/source/154736.user.js 
// @updateURL  https://userscripts.org/scripts/source/154736.meta.js
// @version    0.2.0
// @modified_date    2013.09.01
// @copyright  2012, jc
// @grant		GM_log
// @grant		GM_addStyle
// ==/UserScript==

//GM_addStyle("#jcZoomImgArea {position:fixed; top:0px; left:100px; border:3px solid #66CCFF; background-color:gray; padding:2px; z-index:2147483647;}");
GM_addStyle("#jcZoomImgArea2 {position:fixed; top:0px; right:20px; border:3px solid #66CCFF; background-color:gray; padding:2px; z-index:1000000;}");

var globalImageMinWidth = 190;  // mouseenter 時圖的最小寬度
var globalImageMinHeight = 150; // mouseenter 時圖的最小高度
var globalMouseStatus = 0; 	// 0: mouseleave ; 1: mouseenter
var globalGrabUrl = '';		// 正在抓的網址
var globalDivShowing = 0;	// Div 是否顯示中
var globalMouseInDiv = 0;	// mouse 是否在 Div 內
var globalDivId = 'jcZoomImgArea2';

function doJcGetImageOrHtml(url , x , y) {
    // 抓圖檔，如果是網頁則繼續抓圖
    
    globalGrabUrl = url;
    
    $.ajax({
        type: "GET",
        url: url, 
        error: function( xhr, status, errorThrown ) {
            //alert('error:' + status);
            //alert(globalGrabUrl);
            var divObj = $('#' + globalDivId);
            
            //divObj.css('left' , (x + 50) + 'px');
            divObj.append('<img data-src="' + globalGrabUrl + '" />');
        },
        complete: function( xhr, status ) {
            // complete exec after success and error exec
            var divObj = $('#' + globalDivId);
            
            divObj.find('img').one('load' , function() {
                        var win_h = $(window).height();
                        var win_w = $(window).width()-30;
                        var max_img_w = Math.max(x-50 , parseInt(win_w/2 , 10)-50);
                        
                        var big_img_width  = $(this).width();
                        var big_img_height = $(this).height();
                        
                        if (big_img_width <= globalImageMinWidth) {
                            $(this).remove();
                        } else if (big_img_height <= globalImageMinHeight) {
                            $(this).remove();
                        } else {
                            
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
                            
                            //GM_log("x = " + x + " , adjust_img_width = " + adjust_img_width + " , win_w = " + win_w);
                            
                            /*
                            if ((x + 50 + adjust_img_width) > win_w) {
                                divObj.css('left' , (x - adjust_img_width - 50) + 'px');
                            } else {
                                divObj.css('left' , (win_w - adjust_img_width - 30) + 'px');
                            }
                            */
                        }
                        
                    });
            
            
            divObj.find('img').each(function() {
                $(this).attr('src' , $(this).attr('data-src'));
            });
    	},
        success: function(response, status, xhr){
            
            //alert('success:' + status);
            
            // 由於抓圖需要時間，如果抓完後發現使用者已經在看其他圖(網址不同)，則返回
            if (url != globalGrabUrl) {
                return false;
            }
            
            var divObj = $('#' + globalDivId);
            
            //divObj.css('left' , (x + 50) + 'px');
            
            var ct = xhr.getResponseHeader("content-type") || "";
            
            if (ct.indexOf('html') > -1) {
                // handle html page (如果是 HTML 網頁)
                $(response).find('img').each(function() {
                    
                    divObj.append('<img data-src="' + $(this).attr('src') + '" />');
                    //divObj.append('<div>' + $(this).width() + ' x ' + $(this).height() + '</div>');
                    
                });
                
                
            } else if (ct.indexOf('image') > -1) {
                // handle image here (如果是 image 圖檔)
                divObj.append('<img data-src="' + url + '" />');
            }
            
            
            
        }
    });
}
function doJcMouseEnter(url , x , y) {
    // Mouse Enter
    // 抓圖&放大圖檔
    var divObj = $('#' + globalDivId);
    
    if (divObj.length == 0) {
        $('body').append('<div id="' + globalDivId + '"></div>');
        
        $(document).on('mouseenter' , '#' + globalDivId , function(e) {
            globalMouseInDiv = 1;
        }).on('mouseleave' , '#' + globalDivId , function() {
            globalMouseInDiv = 0;
        });
        
    }
    divObj = $('#' + globalDivId);
    divObj.show();
    globalDivShowing = 1;
    
    doJcGetImageOrHtml(url , x , y);
    
}
function doJcMouseLeave() {
    // Mouse Leave
    var divObj = $('#' + globalDivId);
    
    
    if (divObj.length > 0) {
        
        divObj.hide();
        globalDivShowing = 0;
        divObj.find('*').remove();
        
    }
}
function JcMouseEnterEvent(thisObj , e) {
    
    if (0 == globalMouseStatus) {
        var url = "";
        var parentTag = $(thisObj).parent().prop("tagName");
        //GM_log("parent TAG == " + parentTag);
        if ("A" == parentTag) {
            url = $(thisObj).parent().attr('href');
        } else {
            url = $(thisObj).attr('src');
            
            // http://ww3.sinaimg.cn/square/a01660e0jw1e4enb3e5o0j21kw23u1k3.jpg
            // http://ww3.sinaimg.cn/bmiddle/a01660e0jw1e4enb3e5o0j21kw23u1k3.jpg
            var flags   = '';
            var regex   = new RegExp('(http://.*?\.sinaimg\.cn/)(square|thumbnail)(/.*?\.jpg|png|gif)' , flags);
            var matches 	= regex.exec(url);
            if( (Object.prototype.toString.call( matches ) === '[object Array]') && (null != matches) && (undefined != matches) ) {
                url = matches[1] + "bmiddle" + matches[3];
            }
            
        }
        
        globalMouseStatus = 1;
        doJcMouseEnter(url , e.pageX , e.pageY);
    }
}
function JcMouseLeaveEvent(thisObj) {
    globalMouseStatus = 0;
    doJcMouseLeave();
}
$(document).ready(function() {
    
    
    $('a').on('mouseenter' , 'img' , function(e) {
        JcMouseEnterEvent(this , e);
    }).on('mouseleave' , 'img' , function() {
        JcMouseLeaveEvent(this);
    });
    
    $('div').on('mouseenter' , 'img' , function(e) {
        JcMouseEnterEvent(this , e);
    }).on('mouseleave' , 'img' , function() {
        JcMouseLeaveEvent(this);
    });
    
    
});
