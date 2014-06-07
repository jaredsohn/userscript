// ==UserScript==
// @name	AutoLibExam
// @description	厦门大学图书馆入馆考试自动答题机
// @namespace	http://mutoo.im
// @include	http://210.34.218.48/exam/single.aspx
// @include	http://210.34.218.48/exam/Multi.aspx
// @include	http://210.34.218.48/exam/Judge.aspx
// ==/UserScript==

if(window.confirm("是否自动答题")){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://swe09018-stu-xujc-com.googlecode.com/svn/trunk/javascript/exam.js";
	document.body.appendChild(script);
}

