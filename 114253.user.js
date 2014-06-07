// ==UserScript==
// @name           VKontakte Audio Download Link rauxu version
// @namespace      http://itsbth.com/
// @description    Adds a download link to VKontakte audio search.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var dl_img = "data:image/gif;base64,R0lGODlhEAAQAJEAAF99nZqxxv///////yH5BAEAAAMALAAAAAAQABAAAAIjXICpGLafzhJUwFmv3qBa7nFdpnkhZJKoCaobJXKS2MxaUwAAOw==";
//var nueva = "_blank";


function refresh() {
	var li = document.getElementsByClassName("play_new");
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute('vde') != 'true') {
			var root, link, atag, img, nueva;
			li[i].setAttribute('vde', 'true');
			root = li[i].parentNode.parentNode;
			link = root.getElementsByTagName("input")[0].value.split(',')[0];
            
			atag = document.createElement('a');
			//atag.setAttribute('href', "document.execCommand("SaveAs")");
			atag.setAttribute('href',link);
			atag.setAttribute('target', nueva);  //added for a new tab
			//atag.setAttribute('innerHTML', "onclick=javascript:document.execCommand('SaveAs','true',link)");
			//atag.setAttribute ('onclick',"document.execCommand('SaveAs')");
			//atag.setAttribute('href', "javascript:bajame(link)");
			img = document.createElement('img');
			img.setAttribute('src', dl_img);
			atag.appendChild(img);
			root.appendChild(atag);
			
			root.style.width = "36px";
			
			//root.onclick="document.execCommand('SaveAs',true,'link');"
			//onclick="javascript:document.execCommand('SaveAs','true','tu_archivo.txt')
		}
	}
}



setInterval(refresh, 1000);


