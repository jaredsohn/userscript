// ==UserScript==
// @name        贴吧帖子页数
// @namespace   http://tieba.baidu.com/f?kw=chrome
// @description 帖子外显示帖子页数（如果有的话）
// @include     http://tieba.baidu.com/f*kw=*
// @version     1
// ==/UserScript==

function addCss(css){
var style=document.createElement('style')
var cssNode=document.createTextNode(css)
style.appendChild(cssNode)
if (document.head) {
document.head.appendChild(style)
}
else {
document.documentElement.appendChild(style)
}
}
addCss('#pgshow>:not(:first-child){margin-left:3px}#pgshow>a:hover{color:rgba(255,0,0,0.9)}#pgshow>a:active{color:rgba(0,255,0,0.9)}')

var pgshow=document.createElement('p')
pgshow.id='pgshow'

function pn(x){
var xhr=new XMLHttpRequest()
xhr.onload=function(){
  var a=this.responseXML.querySelector('li.l_pager.pager_theme_2')
  if (a.innerHTML){
  a.removeChild(a.firstElementChild)
  a.removeChild(a.lastElementChild.previousElementSibling)
  var b=this.responseXML.querySelector('li.l_reply_num>span.red')
  if (b.innerHTML<=10){
  a.removeChild(a.lastElementChild)
  }
  else {
  a.lastElementChild.innerHTML=b.innerHTML==11?b.innerHTML:'...'+b.innerHTML
  }
  var c=0
  while (c<a.childNodes.length){
  if (a.childNodes[c].nodeType==3){
  a.removeChild(a.childNodes[c])
  }
  else {
  c++
  }
  }
  pgshow.innerHTML=a.innerHTML
  x.querySelector('div.threadlist_li_right.j_threadlist_li_right').appendChild(pgshow)
  pgshow.style.display='block'
  Array.prototype.forEach.call(pgshow.children,function(a){
  a.target='_blank'
  a.addEventListener('click',function(){
  pgshow.style.display='none'
  },false)
  })
  }
  }
xhr.open('GET',x.querySelector('a.j_th_tit').href)
xhr.responseType='document'
xhr.send()
}

var tielist=document.querySelectorAll('li[class~="j_thread_list"]'),t

Array.prototype.forEach.call(tielist,function(a){
a.addEventListener('dblclick',function(){
pn(this)
if (typeof t!='undefined'){
clearTimeout(t)
}
t=setTimeout(function(){
pgshow.style.display='none'
},7000)
},false)
a.querySelector('a.j_th_tit').addEventListener('mouseover',function(){
pgshow.style.display='none'
},false)
})










		