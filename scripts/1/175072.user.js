// ==UserScript==
// @name           Music Liker Gospel
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Music Liker to Gospel Fine - BaiduMp3.
// @version        2.00.30
// @create         2013-03-06
// @lastmodified   2013-07-30
// @include        http://music.baidu.com/song/*/download*
// @run-at         document-idle
// @copyright      2013+, Yulei
// @updateURL      https://
// @downloadURL    https://
// ==/UserScript==

(function() { var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
function Yu(){win.$('.btn-download').each(function(){ var Ts=win.$(this),Id=Ts.attr('id');Ts.find('.txt').text('下载 '+Id); 
if(Ts.attr("href").indexOf('ting.baidu')!=-1){Ts.css({'display':'inline-block','color':'yellow'})}else if(win.$('#bit'+Id).length==1){
Ts.unbind('click').one("mouseover",function(){win.$.ajax({url:"http://music.baidu.com/data/music/links",data:{songIds:Number(Ts.attr('class').match(/\d+/)),rate:Id},type:"get",async:false,dataType: "json",success: function(y){
Ts.attr("href",y.data.songList[0].songLink.replace("128.",Id+"."));}})}).css({'display':'inline-block','color':'gold'})};
}); win.$('.downpage-adbanner').remove();
//感谢“007111”提供接口参考：yhz61010.iteye.com
}

if(window.chrome){Yu()}else{window.addEventListener('DOMContentLoaded',Yu,false)};


})();

 /* （兼容：Firefox18、Chromes23；其它主流浏览器；支持：Opera12；） 
 *主旨：简化流程、节省时间，改善体验。（化复杂的步骤为简，节约大量宝贵的时间浪费！）
 *  音乐爱好者的福音，目前只集成百度音乐，后续更多尽请期待！
  * 音乐音为美 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
   */

