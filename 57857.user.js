// --------------------------------------------------------------------
//
// ==UserScript==
// @name          igoogle
// @namespace     http://diveintogreasemonkey.org/download/
// @description   igoogle
// @include       http://www.google.com/*
// @include       http://www.google.cn/*
// ==/UserScript==


var   mail   =   document.createElement("a");  
var   text = document.createTextNode("邮箱");
      mail.href="https://mail.google.com/mail";
	  mail.className="gb1";
	  mail.appendChild(text);
      document.getElementById("gbar").appendChild(mail);

var reader = document.createElement("a");
	reader.href="https://www.google.com/reader/view/";
var text2=document.createTextNode("阅读器");
	  reader.appendChild(text2);
	  reader.className="gb1";
	  document.getElementById("gbar").appendChild(reader);
	  
	  
var a=document.getElementById("prs").getElementsByTagName("b");
if(a[0].firstChild.nodeValue!=null)
{


/*
var val = document.getElementsById("sff").getElementsByTagName("input");
var wd = val[6].getAttribute("value");
*/
var wd = document.getElementsByName("q")[0].getAttribute("value");
var bai= document.createElement("a")
document.getElementById("prs").appendChild(bai);
var baitext=document.createTextNode("在百度中搜索");


bai.href="http://www.baidu.com/s?wd="+wd+"&ie=utf-8";
bai.appendChild(baitext);
bai.target="_blank";

}