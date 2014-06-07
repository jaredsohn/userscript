// ==UserScript==
// @name           NewSMTH - BoardList + ConView 
// @namespace      idleawei.newsmth.net
// @description    NewSMTH 新视图 : 版面文章列表+文章内容
// @include        http://www.newsmth.net/bbsdoc.php
// ==/UserScript==

var cando = null;
window.addEventListener(
'load',
function() { 

// cando 判断是否有表示文档已载入完成的标志出现
cando = document.body.innerHTML.indexOf("kbsrcInfo");
//alert(cando);
if (cando > '-1')
{	
document.body.innerHTML = '<div><div style="width:59.8%;float:left;">' + document.body.innerHTML  + '</div><div style = "width:40%;margin-left:60%;margin-top:1px;"> <iframe src = ""  width= 100%  height= 100% name= ifd frameborder = 0> <p>Your browser does not support iframes.</p></iframe></div></div>';

//add target 		
var links = document.getElementsByTagName('a');
var l, i;
for (i = 0; l = links[i]; i++) {
	if ((l.getAttribute('href').indexOf("bbscon") >= 0)||(l.getAttribute('href').indexOf("bbstcon") >= 0)||(l.getAttribute('href').indexOf("bbsqry") >= 0))
	{
		if(l.getAttribute('target') == null )
		{
		l.setAttribute('target', 'ifd');
		}
		}
		}
//end add target
}

},
true);
