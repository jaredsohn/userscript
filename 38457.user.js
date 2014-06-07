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
location.href = 'javascript:void(document.onkeydown = null);'; 
window.body=document.getElementsByTagName("body")[0]
window.body.removeChild(document.getElementsByTagName("div")[1]);
window.toptop=document.getElementById("top")
//body.removeChild(document.getElementById("top"));
document.getElementById("control").setAttribute("style","display: none;");
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

var URL=window.document.getElementById('pic').parentNode.href;
document.getElementById("picture").childNodes[0].removeAttribute("href")
window.downloadAllContent = function downloadAllContent(id){
	
	var url=id;
	if (url==null){
		window.body.appendChild(window.toptop);
	return;
	}
	else{
		if (!url.match(/http/))
		url="http://comic.92wy.com/go/"+url
	GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		try{
		window.url=newDoc.getElementById('pic').parentNode.href
		var cache = document.createElement('img');
		var picURL=newDoc.getElementById("pic").src;
		}
		catch(e){
			window.body.appendChild(window.toptop);
		}
		//alert(picURL)
		cache.src=picURL
		
		var div=document.createElement('div')
		div.setAttribute("style","margin: 10px;text-align:center")
		div.appendChild(cache)
		//cache.setAttribute("style","display: none;");
		//alert(cache)
		window.document.getElementsByTagName("body")[0].appendChild(div);
		window.setTimeout(function(){window.downloadAllContent(String(window.url));},500); 

    }
	});
	
}
}
downloadAllContent(URL);
