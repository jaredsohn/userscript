// JavaScript Document
// ==UserScript==
// @version         2.2.2
// @name            Better 6park
// @description     留园回帖加强浏览辅助脚本
// @include         *.6park.com/*
// @include         http://*.6park.com/*
// @exclude         http://www.6park.com/
// @exclude         http://www.6park.com/parks/star.shtml
// @exclude         http://www.6park.com/parks/eback.php?name=*
// @exclude         http://www.6park.com/cgi-bin/bvote/emailcheck.cgi
// @exclude         http://www.6park.com/parks/ereply.php
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==  
function stickPostDisplay(){
	//prepare mask and article area
	$('body').append('<div id="mask"></div>');
	$('body').append('<div id="article"></div>');

	$('body').attr('bgcolor','').css('background','#a0d880');
	$('#mask')
		.hide()
		.css('width',$(document).width())
		.css('height',$(document).height())
		.css('background','black')
		.css('opacity','0.5')
		.css('position','absolute')
		.css('top','0px')
		.css('left','0px');
		
	$('#article')
		.hide()
		.attr('bgcolor','#E6E6DD')
		.css('width',$(document).width()-($(document).width()/10*2))
		.css('background','#E6E6DD')
		.css('position','absolute')
		.css('top','10px')
		.css('left',$(document).width()/10*1)
		.css('z-index','9')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','8px');
		
		
		
		
		
	
	//stick post click event: open mask, load article, display article.
	$('.dc_bar li').click(function(e){
		e.preventDefault();
		var link=$(this).children('a').attr('href');
		$('#mask').show();
		$('#article').load(link+' table tbody tr',function(){
			//after loading article, clear up article, verify no content response, add detail button and reverse reply list.
			$('#article form').remove();
			verifyNoContent("#article a[name=followups]~ul li");
			addButton('#article a[name=followups] ~ ul > li a');
			jqReverseReply();
			
			//display the article.
			$('#article').slideDown('slow');
			
			});
		
		
	});
	
	//hide mask and article area.
	$('#mask').click(function(){
		$(this).hide();
		$('#article').hide();
		
		//pagediv is loading reply area, if stay in article area, it will be washed out in second stick post loading.so when mask hided, the pagediv area must move out article loading area.
		$("#pagediv").appendTo($('body')).hide();
	});	
	
	$('#article').dblclick(function(){
		$('#mask').trigger('click');
	});	
	
	
}



function addButton(jqtag){
    // 添加详细内容按钮
    $(jqtag).each(function()
    {
	
        $(this).after('    <button class=\"hide_button\">详细</button>');
    });
	
	$(jqtag).filter(":contains('(无内容)')").siblings('.hide_button').remove();

    // 函数
    $(".hide_button")
        .css("margin-right", "10px")
        .css("color", "#ff8800")
        .css("cursor", "pointer")
        .live('click',function() {
            $(this).css("color", "#000000");
			var link=$(this).siblings('a').attr('href');
			var post=$(this);
			
			//ajax to load the content of post.
			$("#pagediv").load(link+" table tbody tr[bgcolor=#E6E6DD]", function(){
				
				$(post).after($("#pagediv"));
				$("#pagediv").hide();
				$("#pagediv").slideDown('slow',function(){
				$('html, body').animate({ scrollTop: $('#pagediv').position().top }, 'slow');	
				});
			});
       });
}


//-----------
//ajax load the responses list in the new page.
function newResponseInSamePage(){
	var requestLink=$('table tbody tr td span a:contains("网友评论")').attr('href');
	//debug(requestLink);
					
	$('table tbody tr td.td3 form').parent().before('<tr><td><div id="response"></div></td></tr>');
	
	$('#response')
		.css('background','#E6E6DD')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','8px');
	
	$('#response').load(requestLink+" form table[cellpadding='5']",function(){
	
	newsReverse('#response table[cellpadding="5"]');
	
	$("#response table.dc_bar").remove();
		
	});
}
//---------------------
//sync domain name ready for ajax request.
function syncDomainForAjax(){
	var link = $("table.dc_bar2 a[href*='6park.com']:not([href*='"+location.host+"']), table.dc_bar a[href*='6park.com']:not([href*='"+location.host+"'])");

	var href='';
	link.each(function(i){
			href=link.eq(i).attr('href');
			href=href.replace(/.*\.6park\.com/,location.host);
			href='http://'+href;
			link.eq(i).attr('href',href);
	});
}

//for one post page, if no content in the response, show (无内容)
function verifyNoContent(selector){
	var pattern=/\(\d+ bytes\)/;
	
	var link = $(selector);
	link.each(function(){
		if($(this).text().match(pattern)[0].match(/\(0 bytes\)/))
		{
			$(this).children('a').text($(this).children('a').text()+'(无内容)');
		}
	});
}

// -----------------------------------------
// 删除微博条
function delWeibo()
{
    var webo = document.getElementById('weibozkinfo');
    if(webo)
    {
        webo.parentNode.removeChild(webo);
    }
}

// -----------------------------------------
// 删除首页广告
function delAds()
{
    // 首页上方
    $("table[width=978][bgColor=#ffffff][border=0]").remove();

    // 漂浮层
    $("#layer1,#layer2,#layer3,#layer4").remove();

    // 左侧栏
    $("td[width='82'][bgcolor='#FFFFEE']").remove();

    // 右侧栏
    $("td[width='125'][bgcolor='#FFFFEE']").remove();

    // 中部广告栏
    $(".td3[colspan='4']").remove();
    $("td[width='122'][bgcolor='#FFFFFF']").remove();

    // 首页中部右边
    $("table[bordercolor='#CCCCCC']").remove();

    // 链接广告
    $("a[href*='php?perm']").remove();
    $("a[href*='php?do']").remove();
    $("a[href*='list.6park.com']").remove();

    // 图片广告
    $("img[style='FLOAT: left'][hspace=5][vspace=1][align=top]").remove();

    // 新闻页上方
    $("table[width=976][border=0][bgcolor=#EEEEEE]").remove();

    // 新闻页右边
    $("td[bgcolor=#E5EBF3]").remove();

    // 新闻评论页
    //$("table[width='800'][bgcolor='#EEEEEE']").remove();
    //$("td[bgcolor='#CCCCCC']").remove();

    // iframe广告
    $("iframe").replaceWith('');

    // 板块广告
    $("table[width='948'][bgcolor='#ECF6FF']").remove();
    $("*[bgcolor='#EEEEEE']").not('table.dc_bar table').remove();

    // 帖子广告
    $("table[width=948][border=0].has('tbody')").remove();
    $("table[width='122'][bgcolor='#FFFFEE']").remove();
    $("table[bordercolor='#CCCCCC'][bgcolor='#F0F0F0']").remove();
}

//-----------Jquery代码,参考caoglish朋友的---------------------
// 回帖及新闻回复逆序代码
function jqReverseReply() {
	// 找到根元素
	var post_list_root = $('a[name=followups] ~ ul > li');
	
	// 逆序列表
	if(post_list_root)
	{
        reverseWholePostList(post_list_root);
    }
}

// 递归逆序整个列表
function reverseWholePostList(post_list_root)
{
	var post_list = post_list_root;
	
	for(var i=post_list.length-1;i>=0;i--)
	{
		if(post_list.eq(i).children('ul').children().length>0)
		{
			post_list_next_level = post_list.eq(i).children('ul').children();
			reverseWholePostList(post_list_next_level);
		}
	}
	
	reversePostList(post_list);
}

// 逆序单个帖子回复
function reversePostList(post_list)
{
	for(var i=post_list.length-1;i>=0;i--)
	{
		post_list.parent().append(post_list.eq(i));
	}
}

// 逆序新闻回复
function newsReverse(responseList)
{
    var post_list = $(responseList).not(".dc_bar").not(':last');
    
    post_list.each(function(){
		post_list.siblings().eq(0).after($(this));
	});
}
//-----------Jquery代码,参考caoglish朋友的---------------------

// -----------------------------------------
// 主函数入口
function parsePage()
{

	$(document).dblclick(function(){
	
		$('#button').toggle();
	
	});
	
	
	//solve ajax read chinese code issue.
	$.ajaxSetup({
				   beforeSend: function( xhr ) {
					 xhr.overrideMimeType( 'text/plain; charset=gb2312' );
					}
				});
				
	//prepare the ajax container	// 添加div-iframe		
	 $("body").prepend("<div id='pagediv'></div>");
	 $("#pagediv").hide()
		.css('background','#E6E6DD')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','8px');
		
	gotoArea();
	 
   // 留园所有页面删除广告
    delAds();
    
    // 评论或回复后,如果没错误直接返回版面首页
    if((document.URL.substr(-3)=='cgi' || document.URL.substr(-2)=='pl') && document.title.search('错误')<0)
    {
        window.location.href = document.links[document.links.length-1];
    }
    // 版面首页,处理黑名单
    else if(document.URL.substr(-5)=='shtml' && document.URL.search('newscom')<0)
    {
		syncDomainForAjax();

		stickPostDisplay();
        addButton(".dc_bar2 li a");
		if($(".dc_bar2 li a").length==0)
			addButton(".dc_bar:last li > a");
    }
    // 新闻帖子页,处理回复
    else if(document.URL.search('newscom')>=0)
    {
        newsReverse('form table[cellpadding="5"]');
    }else if(document.URL.search('news/messages')>=0)
	{
		newResponseInSamePage();
	}
    // 非新闻帖子页,处理回复
    else
    {
        // 删除微博
        delWeibo();
        jqReverseReply();
		verifyNoContent("a[name=followups]~ul li");
		addButton('a[name=followups] ~ ul > li a');
    }
}


function gotoArea(){
	$('body').append('<div id="button"></div>');
	$('#button').append('<div id="go-to-top">top</div>');
	
	$('#go-to-top')
		.css('background','black')
		.css('color','white')
		.css('font-size','10')
		.css('opacity','0.5')
		.css('position','fixed')
		.css('bottom','0px')
		.css('left','0px')
		.css('z-index','10')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','2px')
		.css('color','white')
		.css('width','45px')
		.click(function(){
			$('html, body').animate({ scrollTop: 0 }, 'slow');	
			})
		.hover(function(){
			$(this).css('background','red');
		},function(){
			$(this).css('background','black');
		})
		;
		
		$('#button').append('<div id="go-to-bottom">bottom</div>');
	
	$('#go-to-bottom')
		.css('background','black')
		.css('color','white')
		.css('font-size','10')
		.css('opacity','0.5')
		.css('position','fixed')
		.css('bottom','15px')
		.css('left','0px')
		.css('z-index','10')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','2px')
		.css('color','white')
		.css('width','45px')
		
		.click(function(){
			$('html, body').animate({ scrollTop: $(document).height() }, 'slow');	
			
			})
		.hover(function(){
			$(this).css('background','red');
		},function(){
			$(this).css('background','black');
		})
		;
		
		
		$('#button').append('<div id="go-to-pagediv">bbs article</div>');
	
	$('#go-to-pagediv')
		.css('background','black')
		.css('color','white')
		.css('font-size','10')
		.css('opacity','0.5')
		.css('position','fixed')
		.css('bottom','30px')
		.css('left','0px')
		.css('z-index','10')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','2px')
		.css('color','white')
		.css('width','45px')
		.click(function(){
			$('html, body').animate({ scrollTop: $('#pagediv').position().top }, 'slow');	
			
			})
		.hover(function(){
			$(this).css('background','red');
		},function(){
			$(this).css('background','black');
		});
		
		$('#button').append('<div id="go-to-response">new comment</div>');
	
	$('#go-to-response')
		.css('background','black')
		.css('color','white')
		.css('font-size','10')
		.css('opacity','0.5')
		.css('position','fixed')
		.css('bottom','60px')
		.css('left','0px')
		.css('z-index','10')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','2px')
		.css('color','white')
		.css('width','45px')
		.click(function(){
			$('html, body').animate({ scrollTop: $('#response').position().top }, 'slow');	
			
			})
		.hover(function(){
			$(this).css('background','red');
		},function(){
			$(this).css('background','black');
		});

}

// =========================================
$(document).ready(function() {
	parsePage();
});
