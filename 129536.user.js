// ==UserScript==
// @name       jc_Facebook_Funcs
// @namespace  http://jiichen.at.home/
// @require    https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.4.min.js
// @include    http://www.facebook.com/*
// @include    https://www.facebook.com/*
// @include    http://qing.weibo.com/*
// @exclude    https://apps.facebook.com/*
// @exclude    https://www.facebook.com/about/*
// @exclude    https://www.facebook.com/sharer/*
// @downloadURL https://userscripts.org/scripts/source/129536.user.js 
// @updateURL  https://userscripts.org/scripts/source/129536.meta.js
// @description  facebook 額外功能
// @description    功能 1. 網頁太長可以將某則以上臨時性移除 , 臨時移除不會使用 FB 的隱藏，重新整理網頁之後又回來了。 改成隱藏，移除似乎會造成 CPU loading 變重.
// @description           而且，最上方後來才新增(沒看過的)不會隱藏。(待測) ==> 失敗，最底下如果出現的時間晚於最上面出現的時間，那最上面的依舊會被移除。
// @description    功能 2. 左方多一個點擊區，點擊後，下拉約一頁
// @description    功能 3. 留言由左向右排 by JavaScript --> 廢棄
// @description    功能 4. 留言由左向右排 by CSS
// @description    功能 5. 照片區，已觀看過的連結變色
// @description    功能 6. 移除照片 行 功能
// @description    功能 7. app 時移除推薦專頁 區塊
// @description    功能 8. 刪除 head's script , 減少記憶體的使用
// @description  Zoom Image
// @description  Support domain/Host: wretch.cc , yam.com , qing.weibo.com , facebook(link)
// @version    2013.10.15.00h.00m
// @copyright  2012+, jc
// ==/UserScript==
GM_addStyle(".jcHideStoryContentBtn {border:1px solid blue; padding:2px; display:none; cursor:pointer;}");
GM_addStyle(".jcFBclickArea {background-color:#cc99ff; position:fixed; cursor:pointer; left:20px; top:30%; width:310px; height:600px; opacity:0.35; }");
GM_addStyle(".jcFBclickArea2 {background-color:#cc99ff; position:fixed; cursor:pointer; right:215px; top:30%; width:345px; height:600px; opacity:0.35; }");
GM_addStyle(".jcFBclickArea3 {background-color:#3399ff; position:fixed; cursor:pointer; left:20px; top:28%; width:auto; height:auto; opacity:0.35; }");
GM_addStyle(".jcFBclickArea4 {background-color:#3399ff; position:fixed; cursor:pointer; left:70px; top:28%; width:auto; height:auto; opacity:0.35; }");
GM_addStyle(".jcNewItem {width:450px; height:auto; border: 2px solid blue; }");
    
var doc_h = 0;
var jcFBindex = 0;
var jcFBmicroseconds = 500;
var globalHost = '';
var globalDomain = '';
var running_func3 = false;
var running_func3_h = 0;
var running_func3_timer = 0;
var timer_tick = 0;
$(document).ready(function() {
    
    window.setTimeout(function() {
        
        var flags   = '';
        var regex   = new RegExp('http(s|)://((.*?)(([^.]*?)\.([^.]*?)))/' , flags);
        var matches = regex.exec(top.location.href);
        globalHost    = matches[2]; // ex: www.wretch.cc
        globalDomain  = matches[4]; // ex: wretch.cc
        
        timer_tick++;
    
        doJcFBfunc1();
        doJcFBfunc2();
        doJcFBfunc4();
        doJcFBfunc5();
		doJcFBfunc6();
        doJcFBfunc7();
        
        if ((timer_tick % 120) == 1) {
            doJcFBfunc8();
        }
        
        window.setInterval(function() {
            var tmp_doc_h = $(document).height();
            // console.log('doJcFBfunc1 : ' + tmp_doc_h + ' vs ' + doc_h );
            if (tmp_doc_h != doc_h) {
                doc_h = tmp_doc_h;
                doJcFBfunc1();
                jcFBmicroseconds = 10000;
            }
        } , jcFBmicroseconds);
    
    } , 1500);
    
    
});
function doJcFBfunc1() {
    
    // 暫時移除
    $('li.genericStreamStory:visible').each(function() {
        if ($(this).attr('data-jc-flag1') != 'func1') {
       
            $(this).find('div.storyContent .highlightSelectorButton').each(function() {
                
                var btnObj = $('<span class="jcHideStoryContentBtn" data-jc-ix="' + jcFBindex + '">以上臨時移除</span>');
                btnObj.click(function() {
                    var hide_ix = parseInt($(this).attr('data-jc-ix'));
                    
                    $('li.genericStreamStory').each(function() {
                        var ox = parseInt($(this).attr('data-jc-ix')); 
                        
                        if ( ox < hide_ix ) {
                            //$(this).hide(); // 隱藏
                            $(this).remove(); // 移除
                        }
                    });
                    
                    // 重整 Scroll Bar START
                    $('body').append('<div id="jcFBTempDivArea">TEST</div>');
                    $('#jcFBTempDivArea').remove();
                    // 重整 Scroll Bar END
                    
                    $(this).get(0).scrollIntoView(true);
                    $(window).scrollTop( $(window).scrollTop() - 50 );
                });
                
                $(this).before( btnObj );
            });
            
            $(this).attr('data-jc-flag1' , 'func1')
                    .attr('data-jc-ix' , jcFBindex);
            
            jcFBindex++;
            
            $(this).mouseout(function() {
                $(this).find('.jcHideStoryContentBtn').hide();
            });
            
            $(this).mouseover(function() {
                $(this).find('.jcHideStoryContentBtn').show();
            });
        }
    });
    
    
}
function getJcPos(obj) {
	// 取得位置
	return obj.position();
	//return obj.offset();
}
function doJcNextLiItem() {
    // Next Li Item
    
    var docTop = $(window).scrollTop();
    var minJumpHeight = 350;
    $('li.uiUnifiedStory:visible').each(function() {
        var liTop = getJcPos($(this)).top;
        if (liTop > (docTop+10+minJumpHeight)) {
            $(window).scrollTop(liTop);
			$('#spanJcMsg').text('1');
            return false;
        }
        liTop = null;
    });
    var docTop2 = $(window).scrollTop();
    if (docTop2 == docTop) {
        $('li.fbTimelineUnit:visible').each(function() {
            var liTop = (getJcPos($(this)).top - 180);
            if (liTop > (docTop+10+minJumpHeight)) {
                $(window).scrollTop(liTop);
				$('#spanJcMsg').text('2');
                return false;
            }
            liTop = null;
        });
    }
    
    docTop = null;
    docTop2 = null;
    minJumpHeight = null;
}
function doJcFBfunc2() {
    // Page Down
    if ('facebook.com' == globalDomain) {
        var url = location.href;
        var win_w = $(window).width();
        //if ( (url.match(/\.php/) == null) && (url.match(/\/dialog\//) == null) && (url.match(/\/share\//) == null) ) {
        if (win_w >= 1000) {
            $('body').append('<div class="jcFBclickArea jcFBPageScrollDown">Click here to next page</div>');
            $('body').append('<div class="jcFBclickArea2 jcFBPageScrollDown">Click here to next page</div>');
            if (false == $('#home_stream').hasClass('jcFBPageScrollDown')) {
                $('#home_stream').addClass('jcFBPageScrollDown');
            }
            
            $('.jcFBPageScrollDown').click(function(e) {
                
                if ($(e.target).hasClass('jcFBPageScrollDown')) {
                    
                    var docTop = $(window).scrollTop();
                    doJcNextLiItem();
                    var docTop2 = $(window).scrollTop();
                    if (docTop == docTop2) {
                        
                        var win_h = $(window).height();
                        var doc_top = $(window).scrollTop();
                        $(window).scrollTop(doc_top + win_h - 180);
                        $('#spanJcMsg').text('3');
                        
                        win_h = null;
                        doc_top = null;
                    } 
                    docTop = null;
                    docTop2 = null;
                    
                    e.stopPropagation();
                    e.preventDefault();
                    
                }
                
            });
            
        }
        win_w = null;
        url = null;
    }
}
function doJcFBfunc4() {
    // 排列 by CSS
    if ($(document).height() > 800) {
        $('body').append('<div class="jcFBclickArea4"><input type="button" class="jcBtnFBSortDiv" value="排列 by CSS" /><span id="spanJcMsg"></span></div>');
        $('.jcBtnFBSortDiv').click(function() {
            $('#leftColContainer,#pagelet_sidebar,#rightCol').hide();
            $('.jcFBclickArea').width(150);
            $('.jcFBclickArea2').width(150).css('right' , '5px');
            
            $('#contentArea,#contentCol,#mainContainer').css('border' , '2px solid green').width( $('body').width() - 250 );
            $('.fbx #globalContainer').css('width' , 'auto');
            
            GM_addStyle("li.uiUnifiedStory {width:480px; margin-right:50px; border:2px dotted red; vertical-align:top; display: inline-block; margin-right:50px; }");
            
            if (false == $('#home_stream').hasClass('jcFBPageScrollDown')) {
                $('#home_stream').addClass('jcFBPageScrollDown');
            }
            
        });
    } else {
        // Hide FB photo zoomer
        window.setTimeout(function() {
            $('.rg3fbpz-icon').hide();
        } , 2500);
    }
}
function doJcFBfunc5() {
    // 功能 5. 照片區，已觀看過的連結變色
    var url = location.href;
    var flags = '';
    var regex = new RegExp('http(s|)://((.*?)(([^.]*?)\.([^.]*?)))/(([^/]*?)|(.*?)/(.*?))$', flags);
    var matches = regex.exec( url );
    if (undefined != matches[10]) {
        var account = matches[9];
        var path  = matches[10];
        if ('photos' == path) {
            GM_addStyle("#pagelet_photo_albums a:visited {color:#FF3060 !important; }");
            $('#pagelet_photo_albums a:visited').each(function() {
                $(this).append(' ▉▉▉');
            });
        }
        account = null;
        path = null;
    }
    
    url = null;
    flags = null;
    regex = null;
    matches = null;
    
}
function doJcFBfunc6() {
    // 功能 6. 移除照片 行 功能
    try {
        var url = location.href;
        var flags = '';
        // https://www.facebook.com/media/set/?set=a.484489361579699.122453.108903022471670&type=3
        var regex = new RegExp('http(s|):\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)(\/|$)', flags);
        var matches = regex.exec( url );
        if (undefined != matches) {
            //console.log('matches == ' + matches);
            if ((undefined != matches[4]) && ('media' == matches[3]) && ('set' == matches[4])) {
                $('#album_photos_pagelet table tr').find('td:last').each(function() {
                    var curr_tr = $(this).parents('tr');
                    if (!curr_tr.attr('jcFBfunc6Flag')) {
                        curr_tr.attr('jcFBfunc6Flag' , 1);
                        curr_tr.append('<td align="right"><button type="button" class="btnJcFBRemoveTR" title="Remove this TR line.">DelTR</button></td>');
                        curr_tr.find('.btnJcFBRemoveTR').click(function() {
                            $(this).parents('tr').remove();
                            if ($('#rightCol').length > 0) {
                                $('#rightCol').remove();
                            }
                        });
                    }
                });
                
                
            }
        }
        
        curr_tr = null
        url = null;
        flags = null;
        regex = null;
        matches = null;
    } catch (e) {
        console.log(e.message);
    }
    
    
    try {
        var url = location.href;
        var flags = '';
        // https://www.facebook.com/fineangela/photos
        var regex = new RegExp('http(s|):\/\/(.*?)\/(.*?)\/(.*?)$', flags);
        var matches = regex.exec( url );
        if (undefined != matches) {
            //console.log('matches == ' + matches);
            if ( (undefined != matches[4]) && ('photos' == matches[4]) ) {
                $('#pagelet_photo_albums table tr').each(function() {
                    var curr_tr = $(this);
                    if (!curr_tr.attr('jcFBfunc6Flag')) {
                        curr_tr.attr('jcFBfunc6Flag' , 1);
                        curr_tr.append('<td align="right"><button type="button" class="btnJcFBRemoveTR2" title="移除以上的行.">移除以上的行.</button></td>');
                        curr_tr.find('.btnJcFBRemoveTR2').click(function() {
                    
                            var loop = 1;
                            $('#pagelet_photo_albums table tr').each(function() {
                                $(this).attr('jcFBfunc6Num' , loop);
                                loop++;
                            });
                            
                            var curr = $(this).parents('tr');
                            if (curr.length > 0) {
                                var currNum = parseInt(curr.attr('jcFBfunc6Num') , 10);
                                console.log('currNum == ' + currNum);
                                $('#pagelet_photo_albums table tr').each(function() {
                                    var tNum = parseInt($(this).attr('jcFBfunc6Num') , 10);
                                    if (tNum <= currNum) {
                                        console.log('Remove tNum == ' + tNum);
                                        $(this).remove();
                                    }
                                });
                            }
                            loop = null;
                            curr = null;
                            currNum = null;
                            tNum = null;
        
                        });
                    }
                });
                
            }
        }
        
        curr_tr = null
        curr = null
        url = null;
        flags = null;
        regex = null;
        matches = null;
    } catch (e) {
        console.log(e.message);
    }
    
    window.setTimeout(function() {
        doJcFBfunc6();
    } , 2000);
}


function doJcFBfunc7() {
    // 功能 7. app 時移除推薦專頁 區塊
    if ('apps.facebook.com' == globalHost) {
        $('#pagelet_ego_pane').remove();
        window.setTimeout(function() {
            $('#pagelet_ego_pane').remove();
        } , 10000);
        
        window.setTimeout(function() {
            $('#pagelet_ego_pane').remove();
        } , 30000);
    }
    
}


function doJcFBfunc8() {
    // 功能 8. 刪除 head's script , 減少記憶體的使用
    var acount = 0;
    
    $('head').find('*').each(function() {
        if (this.tagName == 'SCRIPT') {
            acount++;
            $(this).remove();
        }
    });
    
    if (acount > 15) {
        $('head').find('*').each(function() {
            if (this.tagName == 'SCRIPT') {
                $(this).remove();
            }
        });
    }
    
    acount = null;
    
}

