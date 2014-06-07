// ==UserScript==
// @name           Music Liker Gospel
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Music Liker to Gospel Fine - BaiduMp3.
// @version        1.02.06
// @create         2013-03-06
// @lastmodified   2013-03-06
// @include        http://music.baidu.com/song/*
// @run-at         document-idle
// @copyright      2013+, Yulei
// @updateURL      https://
// @downloadURL    https://
// ==/UserScript==

(function() {
function Yu(){
var Bhr=document.getElementsByClassName('high-rate')[0],Bl=document.getElementsByTagName('li'),Bld=document.getElementsByClassName('login-down')[0],Bda=document.getElementsByClassName('downpage-adbanner')[0],Bdl=document.getElementById("download"),Bbds=document.getElementsByClassName('btn-download-span')[0];
function TBurl(Urlc){
var url=Urlc.outerHTML.match(/\/\d+\\\/\d+\.mp3\?xcode=\w+/).toString();
return url.replace(/\\/,'');
}
var BTit=" title='[点击直接下载] - By Yulei'",BUrl="http://zhangmenshiting.baidu.com/data2/music";
if(Bld){Bld.style="color:yellow;background-color:gold;font-size:20px;font-weight:bold";}else{
if (Bhr){
Bhr.innerHTML="<span class='excellent-icon'></span><a href='"+BUrl+TBurl(Bhr)+"'"+BTit+"><i class='high-tip'>超高品质（320kbps mp3）</i></a>";
}if (Bl[1]){Bl[1].innerHTML="<a href='"+BUrl+TBurl(Bl[1])+"'"+BTit+">"+Bl[1].innerHTML+"</a>";
}}if (Bl[0]){Bl[0].innerHTML="<a href='"+BUrl+TBurl(Bl[0])+"'"+BTit+">"+Bl[0].innerHTML+"</a>";
}Bda.style.display="none";//alert(Bda.style.display);
Bdl.style.display="none";Bbds.style.display="none";
//document.getElementById("bit192").style.display="none";
if (!window.opera){
document.getElementById("bit128").parentNode.removeChild(document.getElementById("bit128"));
document.getElementById("bit192").parentNode.removeChild(document.getElementById("bit192"));
Bld.style.color="yellow";Bld.style.backgroundColor="gold";Bld.style.fontSize="20px";
}
}

if(window.opera){window.addEventListener('DOMContentLoaded',Yu,false)}else{Yu()};

/*

http://play.baidu.com/*
http://music.baidu.com/album/*

*/

})();

 /* （兼容：Firefox18、Chromes23；其它主流浏览器；支持：Opera12；） 
 *  音乐爱好者的福音，目前只集成百度音乐，后续更多尽请期待！
  * 音乐音为美 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
   */

