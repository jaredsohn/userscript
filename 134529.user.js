// ==UserScript==
// @name          TechWeb IT龙门阵 脫水器
// @namespace     http://forum.techweb.com.cn/
// @version	      1.1
// @include       http://forum.techweb.com.cn/viewthread.php?tid=*
// @exclude       http://*.douban.com/subject/*/collections
// ==/UserScript==

var hideNonContentElement =  function(){
	$(".postauthor").css("display","none")
	$(".signatures").css("display","none")
	$(".postact").css("display","none")

	$("iframe").css("display","none")
}

function contentEval(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

contentEval( hideNonContentElement );