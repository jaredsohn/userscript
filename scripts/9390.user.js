// ==UserScript==
// @name          SubToBaiduCang
// @description   Subscribe url to cang.baidu.com
// @namespace     http://hi.baidu.com/riso/
// @include       *
//by LiaoRuoxue (http://hi.baidu.com/riso/)
//Email:ruoxue@gmail.com
// ==/UserScript==

if (top.location == document.location)
{
	add_btn ();
}

function add_btn()
{
 var div = document.createElement("DIV");
 div.style.position = "fixed";
 div.style.right = "0px";
 div.style.bottom = "0px";
 div.style.visibility = "visible";
 div.style.width = "20px";
 div.style.height = "20px";
 div.style.cursor = "pointer";
 div.style.zIndex = 1000;
 div.innerHTML = "<img src='http://cang.baidu.com/-/remote/fav3.jpg' alt='添加搜藏' style='padding: 0pt; vertical-align: middle ! important; margin-bottom: 2px ! important;' border='0'/>";
 div.addEventListener('click',
  function() 
  {
   window.open('http://cang.baidu.com/do/add?it='+encodeURIComponent(document.title.substring(0,76))+'&iu='+encodeURIComponent(location.href)+'&fr=ien#nw=1','_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes'); 
  },
  false);
 document.body.appendChild(div);
}