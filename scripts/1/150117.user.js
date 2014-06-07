// ==UserScript==
// @id             tiebaduixing
// @name           tieba队形
// @version        20121015.1
// @namespace	nhnhwsnh  
// @author       nhnhwsnh
// @description    
// @include			http://tieba.baidu.com/*
// @include			http://tieba.baidu.com.cn/*
// @updateURL      https://userscripts.org/scripts/source/150117.meta.js
// @downloadURL    https://userscripts.org/scripts/source/150117.user.js
// @run-at         document-end
// ==/UserScript==

//20121015.1增加自动发表功能，用户可以自己设置autosubmit
//20121014.1加入了一个小功能“复用”直接复制并性状这一楼的内容
//20121013.8精简代码，感谢@坐怀则乱 协助测试
//20121013.7微调队形两个字的位置，让它出现在楼层号之前
//20121013.6修复 点队形之后，ctrl+enter成了粘贴队形内容
//20121013.5尝试修复吧友反馈的问题，引用了校长之怒中的代码
var split = '<br />—————————楼下的，保持队形——————————<br />';  //这个是分割线，你可以自定义滴~~~PS:<br />表示换行
var autosubmit=true
//JQuery支持
var JQueryDiv = document.createElement("div");
JQueryDiv.setAttribute("onclick", "return $;");
$ = JQueryDiv.onclick();

if(document.getElementById("lzonly")){
    displayUser();
}
function displayUser(){
    var $users=$("a.p_author_name");
    var $tbodys=$users.parent().parent().parent().parent().parent();
    for(var i=0;i<$users.length;i++){
        info(i,$tbodys);
    }
    $('div.p_postlist').find('.lzl_cnt').each(function(i) {
        displayUserLzl($(this));
    });
    document.addEventListener('DOMNodeInserted', function(event) {
        var $users = $(event.target).find('a.p_author_name');
        var $tbodys = $users.parent().parent().parent().parent().parent();
        var $reply = $(event.target).find('a.lzl_link_unfold');
        $(event.target).find('div.l_post').each(function(i) {
            info(i,$tbodys);
        });

        $(event.target).find('.lzl_cnt').each(function(i) {
            displayUserLzl($(this));
        });
    }, true);
}
function displayUserLzl($this) {
		var content = $this.find('.lzl_content_main').text();
		content = content.replace(/(<br>)+/gi, '<br>');
		Reply(content, $this.find('.lzl_s_r'));
	}
function info(i,$tbodys){
    var $tbody = $tbodys.eq(i);
    var $target = $tbody.find('ul.p_tail').find('li').eq(0).find('span');
    var content = $tbody.find('.d_post_content').html();
    Reply(content,$target);
}
function Reply(uc,$ths){
    var ca = document.createElement('a');
    ca.href = 'javascript:void(0);'
    ca.innerHTML = '队形';
    ca.addEventListener('click', function() {
        uc = uc.replace(/—————————楼下的，保持队形———————————/gi, '<br>').replace(split, '<br>');
        var temp=uc+split+'<br />';
        $("div.tb-editor-editarea").html(temp);
        $("div.tb-editor-editarea").focus()
        if(autosubmit) unsafeWindow.rich_postor._submit();
    }, false);	
    $ths.prepend(' | ');
    $ths.prepend(ca);
}