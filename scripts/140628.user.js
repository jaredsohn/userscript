// ==UserScript==
// @name       Songtaste 替换播放器
// @namespace  http://userscripts.org/scripts/show/140628
// @version    1.01
// @description  Songtaste 替换播放器 使用chrome audio标签
// @match      http://www.songtaste.com/song/*
// @copyright  2012+, XpAhH
// ==/UserScript==
$=parent.$;
var addr;
var t=$("#playicon a:first").attr("href").split("', '");
var strURL=t[1];
var Head=t[4];
var st_songid=/\d+/.exec(t[6])[0];
if(strURL.indexOf('rayfile')>0) {
    showplayer(Head+strURL+parent.GetSongType(type));
} else {
    $.ajax({
        type:'POST',
        url:'/time.php',
        cache:false,
        data:'str='+strURL+'&sid='+st_songid+'&t='+0,
        dataType:'html',
        success:function(data){
            showplayer(data);
        }
        });
}
$("#playicon,#fancybox-wrap,#fancybox-overlay").remove();
function showplayer(addr){
    $("#player").show().html($("<audio loop autoplay controls></audio>").attr("src",addr).css("margin-left","20px"));
    $(".le_url:first a").attr("href",addr).attr("download",$(".h1singer").text()+" - "+$(".mid_tit").text());
}