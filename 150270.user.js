// ==UserScript==
// @name          屏蔽贴吧隐藏音乐
// @include       http://tieba.baidu.com/*
// ==/UserScript==
// @grant unsafeWindow


javascript:
var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;
var reg = new RegExp('^http.*autoPlay=(t|%74)(r|%72)(u|%75)(e|%65).*', 'i');
$('embed.BDE_Music').each(function()
{
if(reg.test($(this).attr("src")))
{
$(this).after('<div style="font: 14px/20px 宋体; color: red; border: 1px dashed red; height: 30px; width: 450px; padding: 10px 0px 0px 23px;margin:10px 0px 0px 10px" class="antispam_tip">提示：该楼层中的视频或音乐存在自动播放的风险，已被脚本自动屏蔽</div>');
$(this).remove();
}
});
void(0);