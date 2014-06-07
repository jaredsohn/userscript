// ==UserScript==
// @name        Download.verycd
// @namespace   echoer
// @author      echoer
// @include     http://www.verycd.com/topics/*
// @version     1
// ==/UserScript==


//document.getElementById("iptcomED2K").innerHTML
var download=document.getElementById("iptcomED2K").childNodes[0];
if(download && /该内容尚未提供权利证明/.test(download.innerHTML)){


var info = /http:\/\/www\.verycd\.com\/topics\/([0-9]+)/.exec(document.URL)
//http://www.verycd.com/topics/2939326/
var ct;
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.verycd.gdajie.com/topics/"+info[1],
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Cache-Control": "max-age=0",
    "Origin": "http://www.verycd.com",
    "Referer": location,
    //"Cookie": document.cookies
  },
  onload: function(response) {
    // alert(response.responseText);    
    var link=/table id=\"emuleFile\"[\s\S]*table/.exec(response.responseText)
    ct="<"+link[0]+">";
	var link2=ct.replace(/如果.*朋友吧！/,"");

	//alert(ct);
	document.getElementById("iptcomED2K").innerHTML=link2;
  }
});









}

