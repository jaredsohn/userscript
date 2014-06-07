// ==UserScript==
// @name        百度贴吧快速浏览帖子
// @namespace   chromeexe@sina.cn
// @description 模仿goagent issues的看帖模式
// @include     http://tieba.baidu.com/f?kw=*
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/f?kz=*
// @include     http://tieba.baidu.com/f?ie=utf-8&kw=*
// @include     http://tieba.baidu.com/f?ie=utf-16&kw=*
// @version     1
// ==/UserScript==

var floatkj=document.createElement('div')
floatkj.id="floatdiv" 
floatkj.style.position="fixed"
floatkj.style.width="auto"
floatkj.style.height="auto"
floatkj.style.visibility="hidden"
floatkj.style.border="1px solid black"
floatkj.style.backgroundColor="white"
floatkj.style.top="0px"
floatkj.style.left="0px"

GM_addStyle('#head,#com_userbar{z-index:0 !important}')

floatkj.innerHTML='<div id="rq1" align="right" style="background-color:blue">'+'<img id="kjclosebtn" src="https://ssl.gstatic.com/codesite/ph/images/close_icon.png" title="关闭" alt="关闭" style="width:16px;height:16px;cursor:pointer"/>'+'</div>'

floatkj.innerHTML+='<iframe name="a" id="kjfrm" scrolling="yes" frameborder="0" style="overflow:auto">'+'</iframe>'

document.body.appendChild(floatkj)

var sylj

sylj=document.evaluate(
'//a[@class="j_th_tit"]',
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

var mbdiv
var adiv	

mbdiv=document.evaluate(
'//div[@class="threadlist_rep_num j_rp_num"]',
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i=0;i<mbdiv.snapshotLength;i++) {
adiv=mbdiv.snapshotItem(i)
mbdiv.snapshotItem(i).index=i

function load(s,t,l,h,w){
floatkj.style.visibility="visible"
if (kj.src==sylj.snapshotItem(s).href) {
return
      }
kj.src=sylj.snapshotItem(s).href
floatkj.style.top=t
floatkj.style.left=l
kj.style.height=h
kj.style.width=w
             }
adiv.addEventListener("mouseover",function(){load(this.index,"px","px","px","px")},false)
}

var kj=document.getElementById('kjfrm')

var gbkj=document.getElementById('kjclosebtn')

gbkj.addEventListener("click",function(){kj.src=""},false)
gbkj.addEventListener("click",function(){floatkj.style.visibility="hidden"},false)

var djxsh0=document.getElementById('container')
djxsh0.addEventListener("click",function(){kj.src=""},false)
djxsh0.addEventListener("click",function(){floatkj.style.visibility='hidden'},false)

var djxsh1=document.getElementById('head')
djxsh1.addEventListener("click",function(){kj.src=""},false)
djxsh1.addEventListener("click",function(){floatkj.style.visibility='hidden'},false)

var djxsh2=document.getElementById('editor')
djxsh2.addEventListener("click",function(){kj.src=""},false)
djxsh2.addEventListener("click",function(){floatkj.style.visibility='hidden'},false)










