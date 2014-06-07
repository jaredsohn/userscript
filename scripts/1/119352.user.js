// ==UserScript==
// @author         www.nbyang.com
// @version        1.1
// @name           battlelog-ping
// @namespace      http://www.nbyang.com
// @description    显示battlelog服务器的延迟
// @include        http://battlelog.battlefield.com/bf3/*
// ==/UserScript==
function $Id (id) 
{
	return document.getElementById(id);
}
var userAgent = navigator.userAgent;
var isChrome = userAgent.indexOf("Chrome") > -1 ;

    var gor=$Id("server-settings");
    xx=gor.childNodes[41].childNodes[1].innerHTML
	gor.childNodes[41].innerHTML='服务器IP与端口<span>'+xx+'</span>'
	var info_ping=$Id("server-info-ping");
	ajax_get(xx)
			info_ping.addEventListener("click", function() {
					info_ping.innerHTML='Loading...'
					ajax_get(xx)
	       		   })
function getUrl(url){    //保证url带http://
        var strReg="^((https|http)?://){1}"
        var re=new RegExp(strReg); 
        return re.test(url)?url:"http://"+url+"/ping";
    }


function ajax_get(ip){
    var xmlHttp = false;
    try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            xmlHttp = false;
        }
    }

    if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
        xmlHttp = new XMLHttpRequest();
    }
    var ee = document.getElementById('content');
    var data = null;
	requestTime = new Date().getTime();
    xmlHttp.open("GET",getUrl(ip),true);
    xmlHttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-Length",1);
    xmlHttp.onreadystatechange = function()
    {
		if(isChrome){
						if (xmlHttp.onreadystatechange )
					{
						responseTime = new Date().getTime();
						ping = Math.abs(requestTime - responseTime);
						info_ping.innerHTML=Math.floor(ping/2)-100+'MS'
					}
			}else{
						if (xmlHttp.readyState == 2)
					{
						responseTime = new Date().getTime();
						ping = Math.abs(requestTime - responseTime);
						info_ping.innerHTML=Math.floor(ping/2)-100+'MS'
					}
				}
    }
    xmlHttp.send(data);
}