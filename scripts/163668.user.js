// ==UserScript==
// @name         Ypox script 4Fact or Fart n Guessing by rahulg007
// @namespace    Ypox
// @description  Just login n let the script wrk for u
// @include      *ypox.com*
// @grant        none
// @version      beta2
// @author       rahulg007

// ==/UserScript==

var path=window.location.href;
var i=document.getElementById("dashMenu")[0].getAttribute("ssid");
var ssid=i.replace("dashBoard.action?id=","");
if(path==("http://www.ypox.com/dashBoard.action?id="+ssid))
document.getElementById("sendSMSMenu").click();
else if(path==("http://www.ypox.com/main.action?id="+ssid))
	{	
		document.getElementById('txtMobile').value=9762225547;
                document.getElementById('txtaMess').value="Hi..., Happy Earning...! '"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
		document.sendsms1.submit();
		setTimeout("window.location.href = \"http://www.ypox.com/main.action?id=\";",500);		
	}