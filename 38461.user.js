// ==UserScript==
// @name           sky-fire
// @namespace      comic
// @include        http://pic.sky-fire.com/AllComic/Browser.htm*
// ==/UserScript==
// ==UserScript==
// @name           92wy
// @namespace      comic
// @include        http://comic.92wy.com/go
// ==/UserScript==
//document.addEventListener('keydown',nextpage,false)
/*var cache = document.createElement('iframe');
		cache.src=unsafeWindow.document.getElementById('down').href;
		cache.setAttribute("style","display: none;")
		unsafeWindow.document.getElementsByTagName("body")[0].appendChild(cache);
*/
// remove toolbars
/*old implementation
var firstURL=unsafeWindow.document.getElementById('pic').parentNode.href
var secondURL=null;
var thirdURL=null;
//alert(firstURL)
GM_xmlhttpRequest({
    method: 'GET',
    url: unsafeWindow.document.getElementById('down').href,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		secondURL=newDoc.getElementById('pic').parentNode.href
		var cache = document.createElement('img');
		var picURL=newDoc.getElementById("pic").src;
		//alert(picURL)
		cache.src=picURL
		//cache.setAttribute("style","display: none;");
		//alert(cache)
		unsafeWindow.document.getElementsByTagName("body")[0].appendChild(cache);
		alert('end_first')
		secondLoading();
    }
});
function secondLoading(){
GM_xmlhttpRequest({
    method: 'GET',
    url: secondURL,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		thirdURL=newDoc.getElementById('pic').parentNode.href;
		var cache = document.createElement('img');
		var picURL=newDoc.getElementById("pic").src;
		cache.src=picURL
		cache.setAttribute("style","display: none;");
		unsafeWindow.document.getElementsByTagName("body")[0].appendChild(cache);
		alert('end_second')
		thirdLoading();
    }
});}
function thirdLoading(){
GM_xmlhttpRequest({
    method: 'GET',
    url: thirdURL,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		var cache = document.createElement('img');
		var picURL=newDoc.getElementById("pic").src;
		cache.src=picURL
		cache.setAttribute("style","display: none;");
		unsafeWindow.document.getElementsByTagName("body")[0].appendChild(cache);
		alert('end_third')
    }
});
}
*/
/*
window.curIndex=unsafeWindow.curIndex
window.curIndex=parseInt(window.curIndex,10)+1
window.picAy=unsafeWindow.picAy
window.picCount=unsafeWindow.picCount
window.url=window.location.href.replace(/p=(\d+)/i,"p="+window.curIndex)
window.downloadAllContent = function downloadAllContent(id){
	var url=id;
	if (url==null){
	return;
	}
	else{
	GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
          'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9;q=0.8',
		'Accept-Language':	'zh-hk,zh-tw;q=0.8,en-us;q=0.5,en;q=0.3',
'Accept-Encoding':	"gzip,deflate",
'Accept-Charset':	'Big5-HKSCS,utf-8;q=0.7,*;q=0.7',
'Keep-Alive':	'300',
'Connection':	'keep-alive',
"Referer":	"http://sky-fire.com/",
    },
    onload: function(responseDetails) {
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		//document.write(responseDetails.responseText)
		//var code=document.createElement("pre")
		//code.innerHTML=responseDetails.responseText;
		//unsafeWindow.document.getElementsByTagName("body")[0].appendChild(code)
		//document.getElementById("aaa")
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		
		var cache = document.createElement('img');
		//alert(window.curIndex)
		var picURL=window.picAy[window.curIndex]
		//alert(window.picAy)
		cache.src=picURL
		
		var div=document.createElement('div')
		div.setAttribute("style","margin: 10px;text-align:center")
		div.appendChild(cache)
		//cache.setAttribute("style","display: none;");
		//alert(cache)
		window.curIndex=parseInt(window.curIndex)+1
		window.url=window.url.replace(/p=(\d+)/i,"p="+window.curIndex);
		window.document.getElementsByTagName("body")[0].appendChild(div);
		window.setTimeout(function(){window.downloadAllContent(String(window.url));},1000); 

    }
	});
	
}
}
downloadAllContent(window.url);

*/
window.curIndex=unsafeWindow.curIndex
window.curIndex=parseInt(window.curIndex,10)
window.picAy=unsafeWindow.picAy
window.picCount=unsafeWindow.picCount

window.downloadAllContent = function downloadAllContent(){
	if (window.curIndex>=parseInt(window.picCount)){
	var end=document.createElement('div')
	end.setAttribute("style","width:100%; margin: 10px;text-align:center")
	end.innerHTML="末頁"
	window.document.getElementById("curPic").parentNode.parentNode.appendChild(end);
	return}
	else{
	var cache = document.createElement('img');
		//alert(window.curIndex)
		var picURL=window.picAy[window.curIndex]
		//alert(window.picAy)
		cache.src=picURL
		cache.setAttribute("style","width:95%")
		var div=document.createElement('div')
		div.setAttribute("style","border: 0px; margin: 10px;text-align:center")
		div.appendChild(cache)
		//cache.setAttribute("style","display: none;");
		//alert(cache)
		window.curIndex=parseInt(window.curIndex,10)+1
		window.document.getElementById("curPic").parentNode.parentNode.appendChild(div);
		window.setTimeout(function(){window.downloadAllContent();},1000); 
	}
    }
	var iframe=document.getElementsByTagName("iframe")[0]
	iframe.parentNode.removeChild(iframe)
	document.getElementById("pframe").setAttribute("style","height:1000; width:100%")
	downloadAllContent()