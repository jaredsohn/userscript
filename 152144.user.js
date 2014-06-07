// ==UserScript==
// @name      change bbs posts' tags
// @author     tumuyan
// @version    0.2
// @include     *fid*
// @include     *forum*
// @namespace  http://userscripts.org/scripts/show/152144
// ==/UserScript==


/* 
case到break是一行规则。增加规则可以使用复制并修改文字即可。
phpwind的标签需要添加一对英文中括号 
opera需要保存为utf-8格式
 */


var cssdel = document.createElement("style");
		cssdel.type="text/css";
		cssdel.innerHTML = ' tr#delme{display:none !important;height:0px !important;} ';
		document.head.appendChild(cssdel);
var sumtag = document.getElementsByTagName("a");
for (var i = sumtag.length - 1; i >= 0 ; i --) {
    var sumt=sumtag[i].innerHTML
    
    switch (sumt)


{ /*  此为discuz 屏蔽标签 */   
 case "版本及资讯":
    var aimtag = sumtag[i].parentNode.parentNode.parentNode;
        aimtag.id="delme"; 
           break;
       /*  此为phpwind 屏蔽标签 */                 
 case "[新闻]":
       var aimtag = sumtag[i].parentNode.parentNode;
        aimtag.id="delme";  
           break;   

/*  以下为修改原标签到新标签 第一个是个discuz的例子*/     
  case "求助":
     sumtag[i].innerHTML="泪求"
     break
/*  以下为修改原标签到新标签 第二个是个phpwind例子*/  
  case "[求助]":
     sumtag[i].innerHTML="[泪求]"
     break
   case "分享":
     sumtag[i].innerHTML="敬上"
     break
   case "已解决":
     sumtag[i].innerHTML="告退"
    case "教程":
    sumtag[i].innerHTML="告退";
     break
   default:
     var a=0
}}