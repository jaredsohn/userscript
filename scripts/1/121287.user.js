// ==UserScript==
// @name           better for browse 163
// @namespace      better for browse 163
// @author         liangguohuan
// @email          liangguohuan@gmail.com
// @description    163 内面浏览优化，地址栏包含日期类似 11/1224/03/ 的页面处理
// @mod_date       2012-1-1
// @version        1.1
// @include        *.163.com*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

/**
* 2012-1-1：修正　$('#endText').nextAll().remove(); 造成一些内容缺失，所以改为 $('#endMore').nextAll().remove();
* 所有不显示的元素采用 remove() 方法,而不是 hide() 方法,是为了 hide()　元素还会作些XHR请求.
*/

var currLocation = document.location.href;
var reg = /[\d]{2,}\/[\d]{2,}\/[\d]{2,}/;
var regimg = /\/photoview\//;
if (reg.test(currLocation)) {

    //取得当前页面页数
    function getPageNum() {
        var pageNum = 1;
        $.each($('.endPageNum:eq(0) a'), function(){
            var p = $(this).text();
            if(/[\d]+/.test(p) && p*1 > 1) {
                pageNum++;
            }
        });
        return pageNum;
    }
    
    //排序处理
    function orderPageNav() {
        var count = $('.pageNavForLoad > a').size();
        if (count > 1) {
            $.each($('.pageNavForLoad > a'), function(){
                var count = $('.pageNavForLoad > a').size();
                for(var i=0;i<count;i++) {
                    for(j=count-1;j>i;j--) {
                        if($('.pageNavForLoad > a').eq(j).attr('page')*1 < $('.pageNavForLoad > a').eq(j-1).attr('page')*1) {
                            $('.pageNavForLoad > a').eq(j).insertBefore($('.pageNavForLoad > a').eq(j-1));
                        }
                    }
                }
            });
        }
    }
    
    //var bh = $('.NTES-nav').outerWidth();
    //var resetWidth = bh - parseInt($('.endContent').css('padding-left'))*2;
    var bh = 600 + parseInt($('.endContent').css('padding-left'))*2;
    var resetWidth = 600;
    
    $('.endPageNum').hide();
    $(document.body).eq(0).prepend($('.endPageNum'));
    $('#endMore').nextAll().remove();
    $('#endText iframe').parent().remove();
    $('.endYoDao').remove();
    $('.endContent:gt(0)').remove();
    $('.endContent > h1:eq(0)').css('text-align', 'center');
    $('.endContent > .info:eq(0)').css('text-align', 'center');
    $('.endContent').parent().nextAll().remove();
    $('.endContent').parent().css({
        background:'none',
        background:'#F6FCFF',
        border:'1px #ccc solid',
        width:bh + 'px',
    });
    $('.colR').remove();
    $(document.body).eq(0).append('<div class="pageNavForLoad"></div>');
    
    var css = '\n\
        #endText,.path,.endContent { width: ' + resetWidth + 'px;}\n\
        .pageLineNum { clear:both; background:#fff; padding:5px 0px; text-align:center; font-weight:bold; display:none }\n\
        .pageNavForLoad { display:none; text-align:left; position:fixed; right:50px; bottom:10px; max-width:300px; }\n\
        .pageNavForLoad a { display:block; line-height:22px; font-size:14px; }\n\
    ';
    addStyle(css);  
    
    var pageNum = getPageNum();
    var num = 1;
    $.each($('.endPageNum:eq(0) a'), function(){
        var p = $(this).text();
        if(/[\d]+/.test(p) && p*1 > 1) {
            //console.log($(this).attr('href'));
            var currPage = $('<div class="pageLineNum"><a name="pageContent_' + p + '">第　' + p + '　页</a></div>');
            $('.endContent:eq(0)').append(currPage);
            var option = {
                method: 'GET',
                url: $(this).attr('href'),
                data:null,
                onload: function(data){
                    num++;
                    var title = $(data.responseText).find('#endText p:has(strong):eq(0)').text();
                    title = title.replace(/^[ 　]+/, '').replace(/[ 　]+$/, '');
                    $('.pageNavForLoad').append('<a page="' + p + '" target="_self" href="#pageContent_' + p + '">' + p + ')&nbsp;' + title + '</a>');
	                $(data.responseText).find('#endText').insertAfter(currPage);
	                $(currPage).show();
	                $('.pageNavForLoad').show();
	                //最后一次请求才排序
	                if(num == pageNum && pageNum > 1) {
	                    orderPageNav();
	                }
                }
            }
            GM_xmlhttpRequest(option);
        }
    });
} else if (regimg.test(currLocation)) {
    /*
    var imglist = $('#photoList').html().replace(/(&lt;)/g, '<').replace(/(&gt;)/g, '>');
    $('.nph_photo_view').css('height', 'auto');
    //$('#photoView').empty();
    $('.nph_photo_view img').css('margin-bottom', '10px');
    $.each($(imglist).find('i:[title="img"]'), function(i, item){
        if (i > 0) {
            $('<img style="margin-bottom:10px" src="' + $(this).text() + '" />').appendTo('#photoView');
        }
    });
    */
}

function addStyle(css) {
    var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
    $('head:eq(0)').append(style);
}

function sleep(numberMillis) {   
    var now = new Date();   
    var exitTime = now.getTime() + numberMillis;  
    while (true) {
        now = new Date();      
        if (now.getTime() > exitTime){
            return;   
        }
    } 
}