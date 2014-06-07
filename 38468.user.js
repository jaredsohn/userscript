// ==UserScript==
// @name           kuku
// @namespace      comic
// @include        http://comic.kukudm.com/comiclist/*
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
var iframe=document.getElementsByTagName("iframe")
for(var i=0;i<iframe.length;i++)
iframe[0].parentNode.removeChild(iframe[0]);
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
var URL;
var stack=document.getElementsByTagName("img");
for(var i=0;i<stack.length;i++){
	if(stack[i].src.match(/d.gif/)){
	//alert(stack[i].src)
	 URL=stack[i].parentNode.href}
}
if (document.getElementById("comicpic"))
window.server=document.getElementById("comicpic").src.match(/(http)(.)+(?=kuku[0-9])/)[0];
else
window.server=document.getElementById("COMICpic").src.match(/(http)(.)+(?=kuku[0-9])/)[0];
window.downloadAllContent = function downloadAllContent(id){
	var url=id;
	if (url==null){
	return;
	}
	else{
		if (!url.match(/http/))
		url="http://comic.kukudm.com"+url;
		//alert("url:"+url)}
	GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
		
        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Language':	'zh-hk,zh-tw;q=0.8,en-us;q=0.5,en;q=0.3',
'Accept-Encoding':	"gzip,deflate",
'Accept-Charset':	'Big5-HKSCS,utf-8;q=0.7,*;q=0.7',
'Keep-Alive':	'300',
'Connection':	'keep-alive',
"Referer":	"http://comic.kukudm.com/",
		//'Referer': 'http://comic.kukudm.com/',
		'Cookie': 'BD_UTK_DVT=1',
    },
    onload: function(responseDetails) {
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		//alert(responseXML.innerHTML)
		var reg=responseXML.innerHTML.match(/(kuku)(.)+(jpg)/i)
		reg=reg[0]
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		var stack_2=newDoc.getElementsByTagName("img")
for(var i=0;i<stack_2.length;i++){
	if(stack_2[i].src.match(/d.gif/))
	//alert("stack2:"+stack_2[i].src)
	 window.url=stack_2[i].parentNode.href
	 //alert(window.url)
}
		
		var cache = document.createElement('img')
		var picURL=window.server+reg;
		cache.src=picURL
		
		var div=document.createElement('div')
		div.setAttribute("style","margin: 10px;text-align:center")
		div.appendChild(cache)
		//cache.setAttribute("style","display: none;");
		//alert(cache)
		window.document.getElementsByTagName("body")[0].appendChild(div);
		window.setTimeout(function(){window.downloadAllContent(String(window.url));},1000); 

    }
	});
	
}
}
var iframe=document.getElementsByTagName("iframe")
for(var i=0;i<iframe.length;i++)
iframe[0].parentNode.removeChild(iframe[0]);
downloadAllContent(URL);
