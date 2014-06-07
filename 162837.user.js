// ==UserScript==
// @name       新浪微博颜文字插件
// @namespace  http://weibo.com/nauni
// @version    0.1
// @description  新浪微博颜文字插件
// @match      http://weibo.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @copyright  http://weibo.com/nauni
// ==/UserScript==

setTimeout(function(){
$('div#pl_content_publisherTop').prepend('<div style="position:relative; top:48px; left:5px;"><a href="javascript:void(0);" id="toggleMenu" class="W_ico12 icon_choose"  title="插件菜单"></a>');
$('div#pl_content_publisherTop').prepend('<div style="position:absolute; display: none; top: 0; left: 0;z-index:1" class="layer_menu_list"><ul><li><a href="javascript:void(0)" id="ywz">颜文字</a></li></ul></div>');
$('div.input').prepend('<div class="biaoqing_box" style="display: none;"><a>(⌒▽⌒)</a><a>（￣▽￣）</a><a>(=・ω・=)</a><a>(｀・ω・´)</a><a>(〜￣△￣)〜</a><a>(･∀･)</a><a>(°∀°)ﾉ</a><a>(￣3￣)</a><a>╮(￣▽￣)╭</a><a>( ´_ゝ｀)</a><a>←_←</a><a>→_→</a><a>(&lt;_&lt;)</a><a>(&gt;_&gt;)</a><a>(;¬_¬)</a><a>("▔□▔)/</a><a>(ﾟДﾟ≡ﾟдﾟ)!?</a><a>Σ(ﾟдﾟ;)</a><a>Σ( ￣□￣||)</a><a>(´；ω；`)</a><a>（/TДT)/</a><a>(^・ω・^ )</a><a>(｡･ω･｡)</a><a>(●￣(ｴ)￣●)</a><a>ε=ε=(ノ≧∇≦)ノ</a><a>(´･_･`)</a><a>(-_-#)</a><a>（￣へ￣）</a><a>(￣ε(#￣) Σ</a><a>ヽ(`Д´)ﾉ</a><a>(╯°口°)╯(┴—┴</a><a>（\#-_-)\┯━┯</a><a>_(:3」∠)_</a><a>(笑)</a><a>(汗)</a><a>(泣)</a><a>(苦笑)</a></div>');
$('#toggleMenu').click(function(){
	$('div.layer_menu_list').toggle();
    $('div.layer_menu_list').css("top","188px");
    $('div.layer_menu_list').css("left","auto");
});
var flag=0;
$('a#ywz').click(function(){
    if(flag==0){
		$('div.biaoqing_box').fadeIn(100);
        flag=1;
    }else{
        $('div.biaoqing_box').fadeOut(100);
        flag=0;
    }
});
$('.biaoqing_box a').click(function() {
    $(".input_detail").append($(this).html());
    flag=0;
    $('.biaoqing_box').fadeOut(100);
});
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
addGlobalStyle('.biaoqing_box{border: 1px solid #444;border-left: 2px solid #444;box-shadow: 0 3px 0 #DDD;padding: 10px;border-radius: 5px;width: 547px;background: #fafafa;z-index: 1200;position: absolute}.biaoqing_box a{color: #111;float: left;border-radius: 5px;-webkit-transition: background .3s;display: block;padding: 3px 5px 3px 5px;margin: 0 5px 5px 5px}.biaoqing_box a: hover{background: #DDD}');
},5);