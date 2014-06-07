// ==UserScript==
// @id             MediaFire
// @name           MediaFire
// @version        1.01
// @namespace      
// @author         Tast
// @description    
// @include        http://www.mediafire.com/*
// ==/UserScript==
// @run-at         document-end

function foldername(){
	var foldername = document.getElementsByClassName("foldername");
	//alert(foldername.length);
	
	var txt = '';
	for(var i = 0; i < foldername.length; i++) {
		txt = txt + "\n" + foldername[i].href;
	}
	if(txt) alert(txt);
}

GM_registerMenuCommand("文件下載列表", foldername);

function viewtab2(){
	//Open http://www4.mediafire.com/convkey/378f/vq148apuv83go23fg.jpg
	//btn_showimages changeview_active
	//Close
	//btn_showimages
	
	//alert(document.getElementById('viewtab2').className);
	
	var viewtab2 = document.getElementById('viewtab2');
	if(viewtab2.className !== 'btn_showimages changeview_active'){
		alert('本功能僅支援縮圖頁面.');
		viewtab2.click();
	}
	else {
		var txt = '';
		var IPC = document.getElementsByClassName("image-preview-container");
		for(var i = 0; i < IPC.length; i++) {
			var IPCs = IPC[i];
			var IPCBG = IPCs.style.backgroundImage;
			
			if(IPCBG.match('url')) {
				var IPCURL = IPCBG.split('url("')[1].split('")')[0]; 		// 原始圖片網址
				var ext = '.' + IPCURL.split('convkey')[1].split('.')[1];	// 附檔名標籤
				
				txt = txt + "\n" + "http:" + IPCURL.replace('2g' + ext,'fg' + ext);
			}
		}
		
		if(txt){
			alert(txt);
		}
	}
}

GM_registerMenuCommand("圖片顯示列表", viewtab2);



















