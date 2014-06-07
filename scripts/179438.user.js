// ==UserScript==
// @name          DS tools
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Tools API
// @version 	  1.0.0
// ==/UserScript==


Array.prototype.removeAt = function (index) {  
	this.splice(index, 1);  
};
Array.prototype.indexOf = function (val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) {  
            return i;  
        }  
    }  
    return -1;  
};  
Array.prototype.remove = function (val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
};

function getRandom(Min,Max)
{
    var Range = Max - Min;   
    var Rand = Math.random();   
    return(Min + Math.round(Rand * Range));   
}

function xhttpRequest(ahref){
	var hr=new XMLHttpRequest();
	hr.onreadystatechange=function(){XHR_loadover(hr,ahref)};
	hr.open("GET",ahref,false);
	hr.overrideMimeType('text/html; charset=' + document.characterSet);
	hr.send(null)
};

function XHR_loadover(hr,ahref){
	if(hr.readyState == 4){
		var str=hr.responseText;
		//alert(str);
		detailHtmlInfo = str;
		
	};
};

function Log(l){
	console.log(l);
}

function setCookie(objName,objValue,objHours){
	var str = objName + "=" + escape(objValue); 
	if(objHours > 0){
	var date = new Date(); 
	var ms = objHours*3600*1000; 
	date.setTime(date.getTime() + ms); 
	str += "; expires=" + date.toGMTString(); 
	} 
	document.cookie = str; 
}

function getCookie(objName, def){
	var arrStr = document.cookie.split("; "); 
	for(var i = 0;i < arrStr.length;i ++){ 
	var temp = arrStr[i].split("="); 
	if(temp[0] == objName) return unescape(temp[1]); 
	}
	return def;
}

function delCookie(name){
	var date = new Date(); 
	date.setTime(date.getTime() - 10000); 
	document.cookie = name + "=a; expires=" + date.toGMTString(); 
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}