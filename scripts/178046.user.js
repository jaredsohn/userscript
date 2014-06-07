// ==UserScript==
// @name           Untie URL(ReShortUrl)
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Untie URL/Shortlink(Restore URL/Shortlink),ReURL.Resolve redirect source.
// @version        1.05.22
// @create         2013-09-14
// @lastmodified   2013-09-22
// @include        http://*
// @include        https://*
// @exclude        http://192.168.*
// @copyright      2013+, Yulei
// @run-at         document-end
// @grant			GM_xmlhttpRequest
// @grant			GM_setClipboard
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_registerMenuCommand
// @icon			http://s3.amazonaws.com/uso_ss/icon/178046/large.png
// @updateURL      https://userscripts.org/scripts/source/178046.meta.js
// @downloadURL    https://userscripts.org/scripts/source/178046.user.js
// ==/UserScript==

(function() {
var _Q=function(d) {return document.querySelector(d)};
    function Yyu(t){return t.getAttribute('Yu')}
    function Yx(e){var YD=_Q('#YDn');var YY=111;if (!window.chrome)YY=151;YD.style.top=e.screenY-YY+"px";YD.style.left=e.screenX-20+"px";YD.style.display='';}
var Yod= !GM_getValue('YUL') ? "HEAD" : "GET";
window.setTimeout(function(){ //延迟1秒，避免压力山大
var l=document.links,k=l.length;
for (var i=0; i<k; i++){
    if (l[i].href && l[i].href.indexOf('http')==0 && !l[i].href.indexOf(location.href+'#')==0){
if(GM_getValue('YUA')==2){
setTimeout(function(){  GM_xmlhttpRequest({
  url: l[i].href,
  method: Yod,
  onload: function(y) {
  l[i].href=y.finalUrl;
  }
  });},i*500);
}else{
        l[i].addEventListener("mouseover",function(e){ var t=this;
    if(location.hostname.indexOf('google')>0){t.removeAttribute('onmousedown');return};//针对GG的劫持
    if (!/^#|^ja|\.\w{2,3}$/i.test(t.href)){ 
    if (Yyu(t)){if(GM_getValue('YUA')==1){t.href=Yyu(t);}else{_Q('#YNd').href=_Q('#YNd').innerHTML=Yyu(t);Yx(e);}}else{
  GM_xmlhttpRequest({
  url: t.href,
  method: Yod,
  onload: function(y) {
      if (y.status<1){t.title="此网站挂了！"}
      if (y.status == '404' || y.status == '403'){t.title="40X啦，找不到你的！"} 
      if (y.finalUrl != t.href){ var TUrl=y.finalUrl=='/' ? 'http://'+t.href.split('/')[2] : y.finalUrl;
      if(GM_getValue('YUA')==1){t.href=TUrl;}else{Yx(e);_Q('#YNd').href=_Q('#YNd').innerHTML=TUrl;
      if(!Yyu(t)){t.title+='\n你打开后的地址(源地址)为：\n'+y.finalUrl;t.style.color='red';t.setAttribute('Yu',TUrl)}} t.setAttribute('Yu',TUrl)}
  }
  }); t.addEventListener("mouseout",function(e){_Q('#YDn').style.display='none'});}}
      },false);
    }}
}
},1000);
var aa=document.createElement('div');aa.id="YDn";
    aa.setAttribute('style','width:auto;z-index:9999;display:none;position:fixed;border:1px solid #D2DF1D;max-width:80%;margin:0px 0px 38px;background-color:#E0E967;opacity:0.85;border-radius:10px 10px 20px;transition:all 1s ease-out;-webkit-transition:all 1s ease-out;box-shadow:3px 3px 2px Silver;');
document.body.appendChild(aa);
    aa.innerHTML='<i>你打开后的地址(源地址)为：</i><span title="复制地址（成功不提示，否则反之）" style="color:#19AAD5;cursor:pointer;" id="Ycp">[复制]</span><br><div style="overflow:hidden;width:98%"><a id="YNd" target="_blank" style="color:#1F76B0" title="By Yulei"></a></div><b style="font-family:Tahoma,Verdana,Arial;transform: rotate(-90deg);-webkit-transform: rotate(-90deg);position:absolute;width:20px;height:35px;left:10px;bottom:-21px;color:#D2DF1D;">∠</b>';
    aa.onmouseover=function(){this.style.display=''};aa.onmouseout=function(){this.style.display='none'}
_Q('#Ycp').onclick=function(){GM_setClipboard(_Q('#YNd').href)}

function RMC(z,f) {
    GM_registerMenuCommand(z,f);
}
function LRE() {
location.reload();
}
function Yok() {
    GM_setValue('YUL','ok');LRE()
}
function Ygk() {
    GM_setValue('YUL',false);LRE()
}

function YAr() {
    GM_setValue('YUA','1');LRE()
}
function YAyr() {
    GM_setValue('YUA','2');LRE()
}
function YA() {
    GM_setValue('YUA',false);LRE()
}
//默认提示不替换原链接
RMC('打开多重源',Yok);RMC('关闭多重源',Ygk);
RMC('半自动替换原链接[不提示]',YAr);RMC('自动替换原链接[谨慎]',YAyr);
RMC('恢复自动开关为默认',YA);

})();

 /* （支持：Chromes29(TM)、Firefox23(SI、GM)、Opera15(TM)；） 
*
 *主旨：简化流程、节省时间，改善体验。（化复杂的步骤为简，节约大量宝贵的时间浪费！）生存有道，放过别人也是放过自己。
  *  UURL.user.js短网址(短链接)还原(解析)长网址,解短网址/链接. 重定向/跳转终结！302|还我地址来。
   * 解网址 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
    */
