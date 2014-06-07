// ==UserScript==
// @name           Mini Fast Reply
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Mini quick reply.Fast feeling!
// @version        2.05.27
// @create         2013-01-16
// @lastmodified   2013-03-27
// @include        http*/thread*
// @include        http*forum.php?mod=viewthread&tid=*
// @copyright      2013+, Yulei
// ==/UserScript==

(function() {if(!window["\x6f\x70\x65\x72\x61"]){return false};
window.addEventListener(
    "DOMContentLoaded",
    function() {//部分代码参考：common.js
var re1=document.getElementsByClassName('fastre'),ed1=document.getElementsByClassName('editp');
var re=re1[0],ed=ed1[0];
//discuz_uid fid tid
var Pfm = $('postform'),FPfm = $('fastpostform');
var Ppos=Pfm || FPfm;
if (discuz_uid>0){//是否登录，否则退出啊
if (re) {
var Ytip=['\u4eca\u5929\u5929\u6c14\u4e0d\u9519','\u660e\u5929\u518d\u6765\u770b\u770b','\u597d\u554a\uff0c\u52a0\u6cb9\uff01','\u5fc3\u60f3\u4e8b\u6210\uff0c\u9a6c\u5230\u6210\u529f','\u5927\u529b\u652f\u6301\uff0c\u597d\u6837\u7684\uff01\u8036\uff01','\u4e0d\u660e\u89c9\u5386','\u597d\u4f3c\u5389\u5bb3\uff0cMARK','\u975e\u5e38\u611f\u8c22\u5206\u4eab\uff0c\u652f\u6301\u4e00\u4e0b\uff01\u54e6\u8036\uff01'];
var Ytip1=parseInt(Math.random()*Ytip.length);var rand=Ytip[Ytip1];
var fform=$('fastpostform'); //$('fastpostform').action

var TAil='[list][/list][float=left][hr][size=1][color=Silver]Intact Magical: '+navigator.userAgent+'  ('+navigator.browserLanguage+') [/color][/size]         [/float]';
function Yevent(Fsay,Ffre) {
Fsay.value=rand;
Fsay.onclick = function() {
this.style.color="#000";
}
//失焦事件
Fsay.onblur = function() {
if(!this.value || this.value==rand) {
this.value=rand;
this.style.color="#CDCDCD";
this.style.width='22%';
//this.style.border="1px yellow solid";
}
}
//双击事件
Fsay.ondblclick= function() {if(!this.value) {Stips();return false};Sdata(this);
}
//按下事件
Fsay.name=Ffre;
Fsay.onkeydown = function() {//onkeypress
if(event.keyCode==13){if(!this.value) {Stips();return false};
  Sdata(this)}
 }
}
//截获回复
function Ereply() {
var fre=document.getElementsByClassName('fastre');
for (i=0;i<fre.length;i++) {
var SayI='<input type="text" name="mage" id="fastsay'+i+'" title="回车发送{Enter}" onmouseover="this.style.width=\'70%\';this.focus();this.click();" class="fastsay"> <input type="checkbox" name="mbox" id="YUA" title="加入签名(尾巴)" checked />'; //id="YUA'+i+'"
fre[i].outerHTML=fre[i].outerHTML+SayI;
//var mage=document.getElementsByName('mage'),mbox=document.getElementsByName('mbox');
//for (i=0;i<mage.length;i++) {
//var msay=mage[i];
var Fsay=$('fastsay'+[i]+'');
var Ffre=fre[i];
Yevent(Fsay,Ffre);
}}
//截获循环结束了

//来个漂亮的提示怎么样
function Stips() {
showError('哈哈，开什么玩笑，你难道不想说点什么吗？:)');
}

function Sdata(th) {var parN=th.parentNode;
if(parN.getElementsByTagName('input')[1].checked){
th.value=th.value+TAil;}
if(!$('fastsay0')){
 $('fastpostform').message.value=th.value;$('fastpostsubmit').click();th.value='';return;
};
showWindow('reply', th.name);//hideWindow('reply')
var tva=th;
postf = window.setInterval(function () {$('fwin_reply').style.display='none';var pom=$('postform') || "",pomev=pom.message;
if (pomev){pomev.value=tva.value;$('postsubmit').click();clearInterval(postf);tva.value='';}}, 100);
  }

}
var sl = document.createElement("style");
sl.type = "text/css";
sl.id = "mire";
sl.textContent = ".fastsay{\
display:inline;\
 bottom:5px;\
left:22%; color:#CDCDCD;\
border: 1px solid #5D9DF5;\
margin-right:3px; width:22%;\
-o-transition:width .5s ease-in;\
}\
.fastsay:focus{border: 2px #5D9DF5 solid;box-shadow: 0 0 3px #5D9DF5;}\
.pob em{float:none !important}";
document.head.appendChild(sl);


if(typeof Fsay=='undefined'){
re.outerHTML +='<input type="text" name="mage" id="fastsay" title="回车发送{Enter}" onmouseover="this.style.width=\'70%\';this.focus();this.click();" class="fastsay"> <input type="checkbox" name="mbox" id="YUA" title="加入签名(尾巴)" checked />';
}
var YUA0=$('YUA');var fssay=$('fastsay');
if (YUA0) {YUA0.outerHTML +='<span id="bton"><input type="button" value="默" name="setCK0" id="setCK0" class="pn pnc" /><input type="button" value="浮" style="background:red" name="setCK1" id="setCK1" class="pn pnc" /><input type="button" value="层" style="background:green" name="setCK2" id="setCK2" class="pn pnc" /></span> <style>#bton{width:14px;height:18px;margin-top:8px;overflow:hidden;position:absolute;-o-transition:width .4s ease-in-out;}#bton:hover{width:60px;overflow:visible;}#setCK0,#setCK1,#setCK2{height:18px;}</style>';
var delay="25920000";
$('setCK0').onclick = function() {
setcookie('MiFsReply', 0, delay);
fssay.style.position="static";
location.reload();
}
$('setCK1').onclick = function() {
setcookie('MiFsReply', 1, delay);
fssay.style.position="fixed";
location.reload();
}
$('setCK2').onclick = function() {setCK2();
setcookie('MiFsReply', 2, delay);
}
 }

function setCK2() {
Ereply();
$('YUA').parentNode.removeChild($('YUA'));
fssay.parentNode.removeChild(fssay);
fssay.style.position="static";
}

if(getcookie('MiFsReply') == 2) {setCK2();return;}
if(getcookie('MiFsReply') == 1) {Yevent(fssay);fssay.style.position="fixed";}
if(!getcookie('MiFsReply') || getcookie('MiFsReply') == 0) {Yevent(fssay);}

}
    }, false
);

 /* （支持：Opera12；） 
 *  迷你快速回复,快得真不一样！.Mini fast reply.
  *  支持记录设置模式，如浮动、每层楼
   *  代码精简了很多，不少参考来自原程序JS文件，及思路、架构
    * 简单成就精彩 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，否则追究，后果自负 */
})();

