// ==UserScript==
// @name           刮刮乐
// @namespace      http://tiancaihb.tk/
// @description    
// @include        http://zhjw.cic.tsinghua.edu.cn/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        http://zhjw.cic.thu.edu.cn/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        http://zhjw.cic.tsinghua.edu.cn/cj.cjCjbAll.do?m=yjs_yxkccj*
// @include        http://zhjw.cic.thu.edu.cn/cj.cjCjbAll.do?m=yjs_yxkccj*
// @include        https://sslvpn.tsinghua.edu.cn:11001/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        https://sslvpn.tsinghua.edu.cn:11001/cj.cjCjbAll.do?m=yjs_yxkccj*
// ==/UserScript==

var hwnd_Move=0;
var hwnd_Opacity=0;
var t=0;
var gt=new Array(0,0,0);

function main()
{
    var htm, i;
    var j = [0,0,0];
    
    var tbls = document.getElementsByTagName("table");
    var tbl1;
    for (i=0; i<tbls.length; i++) {
        tbl1 = tbls[i];
        if (tbl1.textContent.indexOf('课程号')>0) {
            break;
        }
    }
    var trs = tbl1.getElementsByTagName("TR");

    for (i=1; i<trs.length; i++) {
        var tds = trs[i].getElementsByTagName("TD");
        if (tds.length != 11) continue;
		var s = tds[5].textContent;

        var   x,y,w,h;
        oRect   =   tds[5].getBoundingClientRect();
        x=oRect.left;
        y=oRect.top;
        w=oRect.width;
        h=oRect.height;
		if (s.indexOf('***') >= 0) tds[5].textContent = '嘤嘤';
        drawRectangle(x,y,w,h);
    }
    
}
function drawRectangle(x,y,width,height){
 for(i=0;i<width;i+=3){
  for(j=0;j<height;j+=3){
   drawPixel(x+i,y+j);
  }
 }
}
function drawPixel(x,y){
 var  div = document.createElement("div");
 div.setAttribute("style","background-color:#000; top:"+y+"px; left:"+x+"px; width:3px; height:3px; position:absolute; border:none");
 div.setAttribute("onmouseout","document.body.removeChild(this)");
 document.body.appendChild(div);
}
 
//window.addEventListener("load", main, false);
main();
