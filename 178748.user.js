// ==UserScript==
// @name       QQ邮箱
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  QQ邮箱边栏改造
// @match      https://mail.qq.com/cgi-bin/frame_html*
// @require      http://code.jquery.com/jquery-1.9.0.min.js
// @copyright  2012+, You
// ==/UserScript==
//http://userscripts.org/scripts/edit_src/178748

$(function(){
    //隐藏原左侧工具栏，放大主内容区
    $('.fdbody').hide();
    $('#leftPanel').hide();
    $('#sepLineTd').hide();
    $('#mainFrameContainer').css('position','static');
    
    //侧边栏容器
	$('<div class="rightNav"></div>').appendTo('body');
    
    //添加到侧边栏容器
    $('#navBarTd').appendTo('.rightNav');
    $('#navBarTd').removeClass('navbar fdul');
    $('.fdul').appendTo('.rightNav');
    
    $('.rightNav').find('a').each(function(){
     	$(this).html("<em>"+$(this).html()+"</em>"+$(this).html());
    });
    $('.fdul').show();
    $('.txtflow').closest('em').css('width','500px').css('text-align','left');
    
    //页面添加样式
	var styles = '';
    styles += '<style type="text/css">';
        styles += '*{margin:0;padding:0;list-style-type:none;}';
        styles += 'a,img{border:0;text-decoration:none;}';
        styles += 'body{font:12px/180% Arial, Helvetica, sans-serif, "新宋体";background:#DCDCDC;}';
        styles += '/* rightNav */';
        styles += '.rightNav{position:fixed;top:0;right:0;z-index:9999;width:140px;cursor:pointer;margin:0px;}';
        styles += '*html,*html body /* 修正IE6振动bug */{background-image:url(about:blank);background-attachment:fixed;}';
        styles += '*html .rightNav{position:absolute;top:expression(eval(document.documentElement.scrollTop));}';
        styles += '.rightNav a{display:block;position:relative;height:30px;line-height:30px;margin-bottom:2px;background:#fff;padding-right:10px;width:130px;overflow:hidden;cursor:pointer;right:-75px;}';
        styles += '.rightNav a:hover{text-decoration:none;color:#1974A1;}';
        styles += '.rightNav a:hover em{background:#00b700}';
        styles += '.rightNav a em{display:block;float:left;width:40px;background:#1974A1;color:#fff;font-size:12px;text-align:center;margin-right:10px;font-style:normal;}';
    	styles += 'li.fn {background: none;}';
    styles += '</style>';
    $(styles).appendTo('head');
    
    //侧边栏
    var btb=$(".rightNav");
    var tempS;
    $(".rightNav").hover(function(){
        var thisObj = $(this);
        tempS = setTimeout(function(){
            thisObj.find("a").each(function(i){
                var tA=$(this);
                setTimeout(function(){
                    tA.animate({right:"0"},300);
                },50*i);
            });
        },200);
    },function(){
        if(tempS){
            clearTimeout(tempS);
        }
        $(this).find("a").each(function(i){
            var tA=$(this);
            setTimeout(function(){
                tA.animate({right:"-75"},300,function(){
                });
            },50*i);
        });
    });

})