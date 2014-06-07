// ==UserScript==
// @name           wretch.cc jc scripts
// @namespace      http://jc-script.com/
// @description    ...
// @description    Fix by jc to wretch.cc
// @include        http://www.wretch.cc/*
// @require        http://192.168.10.15/files/jquery-1.6.1.min.js
// @version        0.3.2
// @copyright  2012, jc
// ==/UserScript==


GM_addStyle("#divJcAddIframe {position:fixed; cursor:pointer; top:230px; right:110px; border:1px solid #66CCFF; background-color:yellow; color:blue; padding:2px; font-size:11px; z-index:100;}");
GM_addStyle(".jcRemoveTr,.jcRemoveTr3,#jcAddIFrames_Btn {height:35px; padding: 3px; color:black;}");
GM_addStyle("#jcNextPageLoadFlag {display:block; position:fixed; right:10px; bottom: 30px; background-color:yellow; width:150px; border:1px solid black; padding:3px;}");
    
function jcAddLinks() {
    // 增加連結文字，避免有些圖都沒有連結，看不見到底有無瀏覽過.
    //alert( $('a img').length );
    // alert( $($('a img').get(0)).parent().html() );
    $('a img').each(function() {
        $(this).parent().attr('target' , '_blank');
        $(this).parent().append('<br /><br />++jcURL++');
    });
    
    // 避免"照片展開"功能被隱藏
    $('#ad_square').prepend('<a class="small-c" href="javascript: document.cookie = \'showall=1\'; location.reload();" style="color:blue; font-size:12px; background-color:black; cursor:pointer;">JC_照片展開</a>');
}

function jcFixLinks() {
    // 修改連結，去除 http://tw.rd.yahoo.com/referurl/wretch/album/score/0/113/*http://www.wretch.cc/album/album.php?id=shamu&book=8
    //              http://tw.rd.yahoo.com/referurl/wretch/album/score/6/0/*http://www.wretch.cc/album/album.php?id=comingkevin&book=147
    // 並加入相簿頂層連結 http://www.wretch.cc/album/album.php?id=ksnancy&book=123 ==> http://www.wretch.cc/album/ksnancy
    
    
    var fix_count = 0;
    
    
    $('a').each(function() {
        var aurl = $(this).attr('href');
   
        if ('' != aurl) { 
            if (-1 != aurl.indexOf('rd.yahoo.co') ) {
                var apos = aurl.indexOf('*');
                var album_url = aurl.substr(apos+1);
                
                $(this).attr('href' , album_url);
                fix_count++;
                
                apos = null;
                album_url = null;
            }
        }
        
        aurl = null;
    });
    
    $('a:not(:has(img))').each(function() {
        
        var aurl = $(this).attr('href');
        
        if ('' != aurl) {
            if ( (-1 != aurl.indexOf('id=') ) && (-1 != aurl.indexOf('book=') ) ) {
                var apos1 = aurl.indexOf('?id=');
                var album_id = aurl.substr(apos1+4);
                var apos2 = album_id.indexOf('&');
                
                if (-1 != apos2) {
                    album_id = album_id.substr(0 , apos2);
                }
                
                $(this).append('<br /><span><a href="http://www.wretch.cc/album/' + album_id + '">[Album]</a></span>');
                
                apos1 = null;
                album_id = null;
                apos2 = null;
            }
        }
        
        aurl = null;
        
    });
    
    fix_count = null;
    
}

function jcOpenwin( aurl , e ) {
    // 開啟至背景Tab
    var p1 = window.open( aurl );
    window.focus();
    
    var x = e.pageX;
    var y = e.pageY;
    var ahtml1 = $('<span class="jcOWmark1" style="position:absolute; left:' + (x+50) + 'px; top:' + (y-10) + 'px; display:inline-block; width:20px; height:20px; background-color:yellow; border:1px solid black;">o</span>');
    
    $('body').append( ahtml1 );
    
    p1.onload = function(){ 
        ahtml1.remove();

    }
    
}

function jcChgLinkTarget() {
    // 連結加入 target="_blank"

    $('a').live('click' , function(e) {
        

        var aurl = $(this).attr('href');
        
        if (-1 != aurl.indexOf('book=') ) {

            jcOpenwin( aurl , e );
            
            aurl = null;

            return false;
        } else {
            
            aurl = null;
            
            return true;
        }


    });
}


function jcAddIFramesBtn() {
    
	var s = '<div id="divJcAddIframe">' + 
            '<label><input type="checkbox" id="chkJcStop" />Stop &nbsp;</label><input type="button" id="jcAddIFrames_Btn" value="JC Add IFrames" />' + 
            '<div><label><input type="checkbox" id="chkJcStopClickEmptyNextPage" />停止按空白處下一頁。</label></div>' +
            '</div>';
	$('#ad_square').prepend(s);
	$('#jcAddIFrames_Btn').click(function() {
		jcClickAddIFramesBtn2();
	});
    
}


function get_img_keyword(thumb_url)
{
    // 回傳 縮圖與大圖同樣都有的關鍵字 (一般式利用檔名)
    var thumb_len = 0;
    var idx = thumb_url.indexOf("thumbs/t");
    thumb_len = 8;
    
    var s = thumb_url.substr(idx + thumb_len);
    var idx2 = s.indexOf('?');
    return s.slice(0, idx2);
}

var showing_count = 0;

function jcClickAddIFramesBtn2() {
    // 展開大圖
    var acount = 0;
    
    var regex = new RegExp('(http(s|)://.*?/.*?/.*?/)(thumbs/t)(.*?$)', '');
    
    showing_count = 0;
    
    $('img').each(function() {
        
        if ('a' != $(this).parent().get(0).tagName) {
            
            var asrc = $(this).attr('src');
            var url = $(this).parent().attr('href');
            
            if ( (-1 != asrc.indexOf('wretch.yimg.com')) && (-1 != asrc.indexOf('thumbs')) ) {
                
                var aflag1 = $(this).attr('jcFlag1');
                
            if ('iframe' != aflag1) {
                
		var img_keyword = get_img_keyword(asrc);
                var matchs = regex.exec(asrc);
                var bigimg_src = matchs[1] + matchs[4];
                var chk1 = $('#chkJcStop').attr('checked');
                
                if (chk1) {
                    return false; // STOP
                }
                
                var newobj = $('<div />');
                
                showing_count++;
                
                newobj.css('border' , '3px solid red')
                    .load(url + ' img[src*="' + img_keyword + '"]:eq(0)' , 
                          function( responseText, textStatus, XMLHttpRequest ) {
                              
                              $(this).find('img').load(function() {
                                  
                                  var adjust_img_width  = 50;
                                  var adjust_img_height = 100;
                                  
                                  $(this).width(adjust_img_width)
					.height(adjust_img_height);
				      
                                  showing_count--;
                    
                                  if (showing_count < 1) {
                                      window.setTimeout(jcClickAddIFramesBtn2 , 500);
                                  }
                                  
                                  //$(this).remove();
                                  $(this).hide(2000, function(){ $(this).remove(); });
				    
                              });
                              
                              $(this).append('<div style="color:red;">OK</div>');
                              
                          });
                
                $(this).after( newobj );
                
                $(this).attr('jcFlag1' , 'iframe');
                
                if ( acount == 0 ) {
                    $(this).get(0).scrollIntoView(true);
                }
                
                if ( 9 == (acount % 10)) {
                    return false;
                }
                
                acount++;
                
                newobj = null;
                matchs = null;
                chk1 = null;
            }
            
            aflag1 = null;
            
        }
        
        asrc = null;
    }
        
    });
    
    acount = null;
    regex = null;
    
}

if(typeof jcPageNum == 'undefined') {
    var jcPageNum = 1;
    var goingdown = true;
    var goingdown_count = 10;
}

function jcGetNextPage() {
    // 取得下一頁
    var doc_h = $(document).height();
    var doc_top = $(document).scrollTop();
    var win_h = $(window).height();
    
    if ((doc_h - win_h - doc_top) <= 350 ) {
        if ($('#next').length > 0) {
            
            var url = $('#next').attr('href');
            
            $('#next').removeAttr('id');
            $('#next').removeAttr('id');
            
            if (-1 != location.href.indexOf('/album/show.php?')) {
                if (url.indexOf('&sp=')==-1) {
                    url = url + '&sp=0';
                }
            }
            
            $('body').append('<div id="jcNextPageLoadFlag">jc Load Next Page</div>');
            $('body').append('<hr /><div align="center"><a href="' + url + '"> jc Next Page ' + jcPageNum + ' </a></div><div id="jcNextPageEmptyArea"></div>');
            jcPageNum++;
            
            
            $('#jcNextPageEmptyArea').load(url + ' #bigcontainer table' , function() {
                $('#jcNextPageEmptyArea').removeAttr('id');
                $('#jcNextPageLoadFlag').remove();
            });
            
            url = null;

        }
    }
    
    // 如為 wretch show.php ，則自動 scroll 至最下面，以便啟動 NextPage
    if (-1 != location.href.indexOf('/album/show.php?')) {
        if (goingdown) {
            var top1 = $(document).scrollTop();
            $('html, body').scrollTop( 999999 );
            var top2 = $(document).scrollTop();
            if ((top1 == top2) || (jcPageNum > goingdown_count)) {
                goingdown = false;
                $('.jc_hide_iframe_next_page').remove();
            }
            
            top1 = null;
            top2 = null;
        }
    }
    
    doc_h = null;
    doc_top = null;
    win_h = null;
    
}


function jcAddDelTrBtn() {
    // 增加刪除X行按鈕
    $('#ad_square tr').each(function() {
        if ($(this).find('img').length > 0) {
            $(this).append('<td><input type="button" class="jcRemoveTr" value="Remove TR" /></td>');
            $(this).append('<td><input type="button" class="jcRemoveTr3" value="Remove TR 3" /></td>');
        }
    });
 
    $('#ad_square input.jcRemoveTr').live('click' , function() {
        var next_tr = $(this).closest('tr').next('tr');
        
        next_tr.remove();
        $(this).closest('tr').remove();
        
        next_tr = null;
    });
    
    $('#ad_square input.jcRemoveTr3').live('click' , function() {
        var del_count = 3*2-1;
        
        for (var i = 0; i < del_count; i++) {
            var next_tr = $(this).closest('tr').next('tr');
            
            next_tr.remove();
            
            next_tr = null;
        }
        $(this).closest('tr').remove();
        
        del_count = null;
        
    });
}

function jcAddClickNextPage() {
	// 按空白地方則自動下一頁
	$('#bigcontainer').click(function(e) {
		if (!$('#chkJcStopClickEmptyNextPage').attr('checked')) {
                    
                    if (('INPUT' != e.target.nodeName) && ('LABEL' != e.target.nodeName) && ('A' != e.target.nodeName) ) {
                        var winH = $(window).height();
                        var sTop = $(document).scrollTop();
                        $(document).scrollTop( sTop + winH - 100 );
                        winH = null;
                        sTop = null;
                    }
		}
	});
}

function stopBackgroundMusic() {
    // 停止背景音樂的自動播放
    try {
        window.setTimeout(function() {
            unsafeWindow.jwplayer("automusic").stop();
            $('embed').remove();
        }, 500);
        window.setTimeout(function() {
            $('embed').remove();
        }, 500);
        window.setTimeout(function() {
            unsafeWindow.jwplayer("automusic").stop();
            $('embed').remove();
        }, 1000);
        window.setTimeout(function() {
            unsafeWindow.jwplayer("automusic").stop();
            $('embed').remove();
        }, 2000);
        window.setTimeout(function() {
            unsafeWindow.jwplayer("automusic").stop();
            $('embed').remove();
        }, 3000);
        window.setTimeout(function() {
            unsafeWindow.jwplayer("automusic").stop();
            $('embed').remove();
        }, 5000);
    } catch(e) {
        
    }
}

$(document).ready(function() {

    if (window == window.top) {
        
        // 單一相簿
        if (-1 != location.href.indexOf('album.php') ) {
            window.setTimeout(jcAddLinks , 200);
            window.setTimeout(jcAddIFramesBtn , 200);
            window.setTimeout(jcAddDelTrBtn , 300);
	    window.setTimeout(jcAddClickNextPage , 300);
        }
        
        if ( ( (-1 != location.href.indexOf('album') ) && (-1 != location.href.indexOf('func') ) ) || ('http://www.wretch.cc/album/' == location.href) ) {
            window.setTimeout(jcFixLinks , 1200);
            
        }
        
        // 相簿群
        if ( (-1 != location.href.indexOf('album') )  ) {
            window.setTimeout(jcChgLinkTarget , 200);
            
            window.setInterval(function() {
                jcGetNextPage();
            }, 1000);
            
        }
        
        // 停止背景音樂的自動播放
        stopBackgroundMusic();
        
    }

});
