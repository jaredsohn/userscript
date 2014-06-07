// ==UserScript==
// @name           Good Tail
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Very Good Tail.Hello!
// @version        1.16.25
// @create         2013-01-19
// @lastmodified   2013-01-25
// @include        http*/thread*
// @include        http*forum.php?mod=viewthread&tid=*
// @include        http*forum.php?mod=post&action=reply&fid=*
// @copyright      2013+, Yulei
// ==/UserScript==

(function() {if(!window["\x6f\x70\x65\x72\x61"]){return false};
window.addEventListener(
    "DOMContentLoaded",
    function() {
//discuz_uid fid tid
if (discuz_uid>0){//是否登录，否则退出
//var inp=document.createElement('input');inp.type="checkbox";inp.id="mUA";inp.checked=true;
var ptm=document.getElementsByClassName('ptm pnpost')[0],bar=document.getElementsByClassName('bar')[0],e9=$('e_adv_9');
//ptm.appendChild(inp);
//代码参考：forum.js
var pmess = $('fastpostmessage'),Psfm = $('postform'),Fps=$('fastpostform');
var pos=Psfm || Fps;
//插入尾巴
function MUA(P) { //Custom 为自定信息，各喜好修改！
var Custom='[list][/list][float=left]\r\r\r\r\r\r[hr][size=1][color=Silver]神奇的：'+navigator.userAgent+'  ('+navigator.browserLanguage+') [/color][/size]         [/float]';
P.value +=Custom;
}
//截获提交
function gform(pos) {//fm
var posn=pos.onsubmit;
pos.onsubmit=function() {
if($('mUA').checked){
MUA(pos.message);}
posn;
}
}gform(pos);
//if (pmess) {gform(pmess)}
//if (Psfm) {gform(Psfm)}
//截获快捷键
function mess(PS) {//alert(PS.getAttribute('onkeydown'));
var fwin=$('fwin_reply');
PS.onkeydown = function(e) {//if (Psfm){alert(Psfm)};
    if ((event.ctrlKey && event.keyCode == 13 || event.altKey && event.keyCode == 83) || (event.altKey && event.keyCode == 83)) {
if(!fwin){if($('mUA').checked){MUA(PS);}}//MUA(PS);
//PSK;alert(PSK);
if (Psfm){ctlent(e ? e : event)}else if(fwin){location.href="javascript:$('postsubmit').click()";}else{seditor_ctlent(event, 'fastpostvalidate($(\'fastpostform\'))')}; //seditor_ctlent(event, '$(\'postsubmit\').click();')
//fastpostvalidate($('fastpostform'));
}
}
}
//创建选项
var Cbox='<input type="checkbox" id="mUA" title="加入签名(尾巴)" checked />';
//if (ptm) {ptm.innerHTML +=Cbox;mess(ptm)}
if (e9) {e9.innerHTML +='<br />'+Cbox;mess(pos.message)}else if (bar) {bar.innerHTML +=Cbox;mess(pos.message)}

//if(getcookie('fastpostrefresh') == 1) {$('mUA').checked=true;}

//劫持回复
var fre=document.getElementsByClassName('fastre');
for (i=0;i<fre.length;i++) {
/*fre[i].addEventListener("click",function() {
setTimeout(function(){
bar1.innerHTML +=Cbox;//mess(pos.message);
}, 2000);
}, false);*/

fre[i].onclick = function() {showWindow('reply', this.href);
//alert(this.outerHTML);alert(freo); alert(this);
setTimeout(function(){var pof=$('postform');
document.getElementsByClassName('bar')[0].innerHTML +=Cbox;
mess(pof.message);gform(pof);
}, 1000);
//showWindow('reply', this.href);
}
}


}
    }, false
);

 /* （支持：Opera12；） 
 *  好尾巴，你值得拥有.
  * 简单成就精彩 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，否则追究，后果自负 */
})();

