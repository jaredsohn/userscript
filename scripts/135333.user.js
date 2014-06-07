// ==UserScript==
// @name           TvEgy-BYPASS
// @namespace      Max789
// @description    Bypass TvEgy.com link protection
// @include        http://www.tvegy.info/*
// @version        2.1
// ==/UserScript==
(function(){
	var n=location.pathname;
	document.title = "ByPASSER TvEgy"
	var x= n.search(/m1.php/);
	function getHTMLSource (url) {
		var xhr = new XMLHttpRequest();
		xhr.open("get",url,false);
		xhr.send(null);
		var httpQuery = " ";
		httpQuery =" " + xhr.responseText;
		window.stop();
		n = httpQuery.slice((httpQuery.indexOf("NewWindow('")+11),httpQuery.indexOf("','name'"));
		location.href = n;
	}

	if (x == -1)	{
		var p=location.href;
		var p=p.split("o/")[1];
		n = "http://www.tvegy.info/m1.php?id="+p;
		getHTMLSource(n);
	}else{
		var s = document.getElementsByName('groovybtn1')[0].getAttribute("onclick");
		var s1= s.split("(\'")[1];
		var s1= s1.split("\',\'")[0];
		location.href = s1;	
	}//end else
}());//End Self-Invoking Function


