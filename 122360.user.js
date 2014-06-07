// ==UserScript==
// @name                人人网自动回访 RenRen Auto Return the Visits
// @namespace           renren_revisit
// @include				*.renren.com/*
// @description         在www.renren.com/myfoot.do页面上自动回访所有最近来访 auto return all the visits on http://www.renren.com/myfoot.do
// @version				0.2
// @run-at         		document-end
// ==/UserScript==

if (window.location.href.indexOf("http://www.renren.com/home") !== -1) {
	window.onload = function ()
	{
		document.getElementById('footPrint').getElementsByTagName('div')[1].getElementsByTagName('a')[8].innerHTML="一键<br/>回访";
	}
}

if (window.location.href.indexOf("http://www.renren.com/myfoot.do") !== -1) {
	r=confirm("回访所有最近来访? Visit all friends above?");
	if (r==true) {
		var users=document.getElementsByTagName("a");
		var i;
		for (i=0; i<users.length; i++) {
			if (users[i].className === "name") {
				var visitor=document.createElement("iframe");
				var url=users[i].href;
				visitor.setAttribute("src", url);
				visitor.style.display = "none";
				document.body.appendChild(visitor);
			}
		}
		alert("已回访，为节省系统资源请关闭页面 Finished, please close this page");
	}
}

