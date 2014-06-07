// ==UserScript==
// @name         script
// @description  script
// @include      *ypox.com*
// @author       Yastika
// ==/UserScript==


var path=window.location.href;
var i=document.getElementsByTagName("a")[0].getAttribute("href");
var a=i.replace("dashBoard.action?id=","");
if(path==("http://www.ypox.com/dashBoard.action?id="+a))
document.getElementById("sendSMSMenu").click();
else if(path==("http://www.ypox.com/main.action?id="+a))
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";
    if(content.search(pat)<0)
	{	
		document.getElementById('txtMobile').value=8528228412;
                document.getElementById('txtaMess').value=Math.floor((Math.random() * 200000000000000000) + 2);
		document.sendsms1.submit();
		setTimeout("window.location.href = \"http://www.ypox.com/main.action?id=\";",500);		
	}