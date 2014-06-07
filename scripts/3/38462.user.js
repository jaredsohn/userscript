
// ==UserScript==
// @name           finaleden
// @namespace      comic
// @include        http://www.finaleden.com/ShowDialog.aspx
// ==/UserScript==
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



//serializer = new XMLSerializer();
	//	serialized = serializer.serializeToString(parent.frames[1].document)
		//alert(serialized)




//var number=thisPage.match(/[0-9]+(?=\.jpg)/)[0]



//alert(parent.frames[1].array_img[2])
//alert(window.test)
//window.location.href=parent.frames[0].location.href
//window.url=parent.frames[1].location.href





function startFunction(){
	

		window.array_img=unsafeWindow.parent.frames[1].array_img
		window.pageNo=2
		window.url=unescape(window.array_img[window.pageNo])
		parent.frames[1].document.getElementById("pic2").setAttribute("style","margin: 10px;text-align:center")
		downloadAllContent()

}

window.downloadAllContent = function downloadAllContent(){
		/*if (parent.frames[1].document.getElementById("pic2").lastChild.previousSibling.previousSibling.firstChild)
		{
			if(parent.frames[1].document.getElementById("pic2").lastChild.previousSibling.previousSibling.firstChild.width<10)
		return
		}*/
		if (!window.array_img[window.pageNo])
		return
		else{
		
		var cache = new Image()
		
		
		cache.src=window.url
		
		
		var div=document.createElement('div')
		div.setAttribute("style","margin: 10px;text-align:center")
		div.appendChild(cache)
		parent.frames[1].document.getElementById("pic2").appendChild(div);	
		
		
		window.pageNo=parseInt(window.pageNo,10)+1
		window.url=unescape(window.array_img[window.pageNo])
		window.setTimeout(function(){window.downloadAllContent();},1000); 
		
    }
}

//
//removeiFrame
var iframe=document.getElementsByTagName("iframe")
for(var i=0;i<iframe.length;i++)
iframe[0].parentNode.removeChild(iframe[0]);



window.setTimeout(function(){startFunction()},3000);
