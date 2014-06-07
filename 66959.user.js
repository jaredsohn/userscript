// ==UserScript==
// @name			joyful reader
// @namespace		http://www.douban.com/people/33455349/
// @description     改善帖子阅读性
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        	http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @include			http://www.douban.com/group/topic/*
// @version        	1.2
/* @reason
增加一个按键功能。
键位J：将重新排版过后的文章内容备份
到邮箱。需要事先登入
http://bokunoturu.appspot.com/sign
@end*/
// ==/UserScript==

var thisScript = {
    name: "悦读器",
    id: "66959",
    version: "1.2"
}
var updater = new Updater(thisScript);
updater.check();



// 屏蔽谷歌广告
$('#google_ads_slot_group_topic_new_top_right').remove();

// 话题第一页
if ($('.topic-content').length !== 0) {
    var win_width = window.screen.width * .85;
    var win_css = {
        '-webkit-box-shadow': '5px 2px 6px #000',
        '-moz-box-shadow': '5px 2px 6px #000',
        'position': 'absolute',
        'width': win_width + 'px',
        'background-color': '#5FB404',
        'border': '1px solid #000',
        'padding': '15px',
        'text-align': 'left',
    };
    
    var new_topic_css = function(){
        var font_size = GM_getValue("font_size") || 24;
        var line_height = GM_getValue("line_height") || 30;
        ;
        return {
            css: function(){
                return {
                    'font-size': font_size + 'px',
                    'font-family': '宋体',
                    'color': '#8A084B',
                    'line-height': line_height + 'px',
                }
            },
            increment: function(v){
                font_size = font_size + v;
                line_height = line_height + v;
                GM_setValue('font_size', font_size);
                GM_setValue('line_height', line_height);
            }
        }
    }();
    
    var win_show = function(){
        if ($('#win').css('display') === 'none') {
            var w = (window.screen.width - win_width) / 2;
            $('#win').css('top', window.pageYOffset + 80 + 'px')
            $('#win').css('left', window.pageXOffset + w)
            // var newTopicDoc = str + $('.topic-doc p').html().replace(/<br>\s*/g, "<br><br>" + str);
            var newParts = "", parts = $('.topic-doc p').html().split('<br>');
            for (cnt in parts) {
                var part = $.trim(parts[cnt]);
                if (part !== '') {
                    newParts += "&nbsp;&nbsp;&nbsp;&nbsp;" + part + "<br><br>"
                }
            }
            $('#win_body').html(newParts);
            $('#win_body').css(new_topic_css.css())
            $('#win').show();
        }
        else {
            $('#win').hide();
        }
    };
    
    var frame = "<div id =\"win\"><table><tr><td width='" + (win_width - 50) + "'><h1 id = 'title'>title</h1></td><td  width='50' align='right'><a id = 'close_button' href='javascript:void(0)'>X</a></td></tr></table><div id ='win_body'></div></div>";
    var save_file_form = "<form id ='sava_content' method='post' action='http://bokunoturu.appspot.com/kits/savefile'><input type = 'hidden' id = 'file_name' name = 'file_name' /><input type = 'hidden' id = 'file_content' name = 'file_content' /></form>"
	//var save_file_form = "<form id ='sava_content' method='post' action='http://127.0.0.1:8080/kits/savefile'><input type = 'hidden' id = 'file_name' name = 'file_name' /><input type = 'hidden' id = 'file_content' name = 'file_content' /></form>"
	
    var performer = "<p class=\"pl2\">&gt;<a id ='performer' href=\"javascript:void(0)\">悦读</a></p><br/> "
    
    
    $('body').prepend(frame);
	$('body').prepend(save_file_form);
    $('#win').css(win_css);
    $('#close_button').click(function(){
        $('#win').hide();
    });
    $('#title').text($('#content h1').text());
    $('#win').hide()
    
    $('.aside p:first').append(performer);
    $('#performer').click(function(){
        win_show();
    });
    
    $(window).keydown(function(event){
        if (event.target.tagName !== 'INPUT' || event.target.tagName !== 'TEXTAREA') {
            if (event.keyCode === 82) { // 鍵位r
                win_show();
            }
            if ($('#win').css('display') !== 'none') {
                if (event.keyCode === 75) { // 鍵位k
                    new_topic_css.increment(-2)
                    $('#win_body').css(new_topic_css.css());
                }
                if (event.keyCode === 76) { // 鍵位l
                    new_topic_css.increment(2);
                    $('#win_body').css(new_topic_css.css());
                }
				if (event.keyCode === 74) { // 鍵位J
				    var mail_name = prompt("输入\修改需要保存的文章名词", $('#content h1').text());
					var mail = prompt("输入邮箱地址(需登入http://bokunoturu.appspot.com/sign)", GM_getValue('mail',''));
					
					if($.trim(mail_name) !== '' && $.trim(mail_name) !== '') {
						
						if(encodeURIComponent($('#win').html()).length > 200000){
							alert("文章过长,大于200000,不予备份，下个版本或将改进!!!")
							return;
						}	
						GM_xmlhttpRequest({
							method:'POST',
							headers: {
    							"Content-Type": "application/x-www-form-urlencoded"
  							},
							url:"http://bokunoturu.appspot.com/kits/bkp1f",
							data:'mail='+mail+'&mail_name='+mail_name+'&mail_content='+encodeURIComponent($('#win').html()),
							onload:function(responseDetails){
								GM_setValue('mail',mail);
								alert('提交成功 ！！！');
							}
						})
					}
                }
            }
        }
    });
}