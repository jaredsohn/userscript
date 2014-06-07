// ==UserScript==
// @name           ggyy8
// @namespace      comic
// @include        http://*.ggyy8.cn/Html*
// ==/UserScript==
window.getNextUrl=function getNextUrl(doc){
	var a=doc.getElementsByTagName("a")
	for(var i=0;i<a.length;i++)
	{
		//if (i<20)
		//alert(a[i].innerHTML+a[i].href)
		if((a[i].innerHTML.match(/下一页/)) || (a[i].innerHTML.match(/��һҳ/))){
			//alert(a[i].href)[��һҳ][��һҳ]
			if (a[i].href.match(/http/))
				return a[i].href
			else
			{
				var reg=window.location.href.match(/(.)+(\/)(?=[^\/])+/)[0]+a[i].nextSibling.nextSibling.href
				//alert(reg)
				return reg
			}
		}
	}
}
window.getImageSrc=function getImageSrc(doc){
	var img=doc.getElementsByTagName("img")
	for(var i=0;i<img.length;i++)
	{
		if (img[i].src.match(/http:\/\/images/))
		{
			//for(var j=i+1;j<img.length;j++)
			//{
				//if (img[j].src.match(/http/))
					return(img[i].src)
			//}
		}
	}
}
var URL=getNextUrl(document)
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
		'Accept-Language':	'zh-cn,zh-hk,zh-tw;q=0.8,en-us;q=0.5,en;q=0.3',
		'Accept-Encoding':	"gzip,deflate",
		'Accept-Charset':	'Big5-HKSCS,utf-8;q=0.7,*;q=0.7',
		'Keep-Alive':	'300',
		'Connection':	'keep-alive',
		"Referer":	"http://ggyy8.cn/",
    },
    onload: function(responseDetails) {
		//alert("1")
		var responseXML=document.createElement("div");
		responseXML.innerHTML=responseDetails.responseText;
		//alert(responseDetails.responseText)
		var newDoc = document.implementation.createDocument("","",null)
		newDoc.appendChild(responseXML);
		window.url=window.getNextUrl(newDoc)
		var picURL=window.getImageSrc(newDoc)
		//alert(window.url)
		//alert("2")
		var cache = new Image();
		//cache.setEventListener(Error,this.src=this.src)
		//alert(picURL)
		cache.src=picURL
		//alert("3")
		var div=document.createElement('div')
		div.setAttribute("style"," margin: 10px;text-align:center")
		div.appendChild(cache)
		//cache.setAttribute("style","display: none;");
		//alert(cache)
		//alert("4")
		window.document.getElementsByTagName("body")[0].appendChild(div);
		//alert(window.url)
		window.setTimeout(function(){window.downloadAllContent(window.url);},3000); 

    }
	});
	
}
}
window.setTimeout(function(){window.downloadAllContent(URL);},3000)

