// Poj Plus user script
// version 0.1 BETA!
// 2012-02-05
// Copyright (c) 2012, Philo Yang
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// version 0.1:first public version 12-02-05
// --------------------------------------------------------------------
// ==UserScript==
// @name          Shaidaima
// @namespace     http://shaidaima.com
// @description   upload or search code in shaidaima.com 
// @include       http://poj.org/status*
// @include       http://acm.hdu.edu.cn/status*
// @include		  http://acm.zju.edu.cn/onlinejudge/showRuns.do?contestId=1
// @include		  http://acm.zju.edu.cn/onlinejudge/showRuns.do?contestId=1&*
// ==/UserScript==
function getElementsByClassName(n) { 
    var el = [],
        _el = document.getElementsByTagName('*');
    for (var i=0; i<_el.length; i++ ) {
        if (_el[i].className == n ) {
            el[el.length] = _el[i];
        }
    }
    return el;
}
var url=location.toString();
if(url.indexOf("poj.org")!=-1)
{
var table = getElementsByClassName('a');
table=table[0].childNodes[0];
for(var i=2;i<table.childNodes.length;i+=2)
{
	var tr=table.childNodes[i];
	if(tr.childNodes[6].innerHTML.indexOf("showsource")!=-1)
	{
//	alert(tr.childNodes[3].innerHTML);
		if(tr.childNodes[3].innerHTML.indexOf("Accepted")!=-1)
		{
			var n=document.createElement("a");
			n.innerHTML="<a href=http://shaidaima.com/source/upload?"+"oj=pku&pid="+tr.childNodes[2].childNodes[0].text+"&lang="+tr.childNodes[6].childNodes[0].text+">晒代码</a>";
			tr.childNodes[3].appendChild(n);
		}
		else
		{
			var n=document.createElement("a");
			n.innerHTML="<a href=http://shaidaima.com/source/search/PKU/"+tr.childNodes[2].childNodes[0].text+">查代码</a>";
			tr.childNodes[3].appendChild(n);
		}
	}

}
}
else if(url.indexOf("hdu.edu.cn")!=-1)
{
	var table = getElementsByClassName('table_text');
	table=table[0].childNodes[0];
	for(var i=2;i<table.childNodes.length;i++)
	{
		var tr=table.childNodes[i];	
	if(tr.childNodes[6].innerHTML.indexOf("/viewcode.php")!=-1)
	{
		if(tr.childNodes[2].innerHTML.indexOf("Accepted")!=-1)
		{
			var n=document.createElement("a");
			n.innerHTML="<a href=http://shaidaima.com/source/upload?"+"oj=hdu&"+"pid="+tr.childNodes[3].childNodes[0].text+"lang="+tr.childNodes[7].innerHTML+">晒代码</a>";
			tr.childNodes[2].appendChild(n);
		}
		else
		{
			var n=document.createElement("a");
			n.innerHTML="<a href=http://shaidaima.com/source/search/HDU/"+tr.childNodes[3].childNodes[0].text+">查代码</a>";
			tr.childNodes[2].appendChild(n);
		}
	}
		
	}
	
}
			
	

else if(url.indexOf("zju.edu.cn")!=-1)
{

	var table =document.getElementsByTagName('table')[3].childNodes[1];
	for(var i=2; i<table.childNodes.length;i+=2)
	{
	var tr=table.childNodes[i];	
	//alert(tr.childNodes[9].innerHTML);
	if(tr.childNodes[9].innerHTML.indexOf("/onlinejudge/showSubmission.do")!=-1)
	{
		if(tr.childNodes[5].innerHTML.indexOf("Accepted")!=-1)
		{
			var n=document.createElement("a");
			n.innerHTML="<a href=http://shaidaima.com/source/upload?"+"oj=zju&"+"pid="+tr.childNodes[7].childNodes[0].text+"lang="+tr.childNodes[9].childNodes[0].text+">晒代码</a>";
			tr.childNodes[5].appendChild(n);
		}
		else
		{
			var n=document.createElement("a");
			n.innerHTML="<a href=http://shaidaima.com/source/search/ZJU/"+tr.childNodes[7].childNodes[0].text+">查代码</a>";
			tr.childNodes[5].appendChild(n);
		}
		
	}
	
	}

}
