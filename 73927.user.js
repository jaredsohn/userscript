// ==UserScript==
// @name           Onemanga Chapter Loader
// @namespace      OnemangaChapterLoader
// @description    Click and load onemanga chapter
// @include        http://*.onemanga.com/*
// @include        http://*.1000manga.com/*
// @version        0.5
// ==/UserScript==

GM_registerMenuCommand("Clear Reload Data", clearReloadData);

if(document.location.toString().substring(0,"http://beta.onemanga.com/mypage/".length)=="http://beta.onemanga.com/mypage/"){
	var chap = document.evaluate("//td[@class='ch-read-progress']//a",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i=0;i<chap.snapshotLength;i++){
		getFirstPageOfChapter(chap.snapshotItem(i));
	}
}
else{
	var ads = document.evaluate("//div[@class='banner-chapter']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	if(ads!=null){
		scroll(0,0);
		var btnOpen = document.createElement("input");
		btnOpen.type = "button";
		btnOpen.value = "Open This Chapter";
		btnOpen.addEventListener("click", function(){
			createStyle();
			var pages = document.getElementById("id_page_select");
			var chap = document.location;
			var image = document.evaluate("//img[@class='manga-page']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
			var img = image.src;
			var imgSplit = img.split("/");
			var imgFolder = img.substring(0,img.lastIndexOf("/")+1);
			var imgExt = img.substring(img.lastIndexOf("."));
			var container = image.parentNode.parentNode;
			container.removeChild(image.parentNode);
			for(var i=pages.selectedIndex;i<pages.length;i++){
				var page = pages[i].value;
				var link = document.createElement("a");
				link.id = page;
				link.href = chap+"../"+page;
				var newImg = document.createElement("img");
				var cacheId = GM_getValue(imgFolder + page + imgExt);
				newImg.src = imgFolder + page + imgExt + (cacheId==null?"":"?"+cacheId);
				newImg.alt = "Loading...";
				var pageNo = document.createElement("div");
				pageNo.setAttribute("style","font-size:18px;color:#ddd;margin-top:20px;font-weight:bold");
				pageNo.appendChild(document.createTextNode(page));
				var reloadPage = document.createElement("a");
				reloadPage.name = page;
				reloadPage.setAttribute("class","reload");
				reloadPage.appendChild(document.createTextNode(" [Reload]"));
				reloadPage.addEventListener("click",function(){
					var reloadedImg = document.evaluate("//img[@src='"+imgFolder+this.name+imgExt+"']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
					if(reloadedImg!=null){
						var reloadedContainer = reloadedImg.parentNode;
						reloadedContainer.removeChild(reloadedImg);
						var newReloadedImg = document.createElement("img");
						cacheId = new Date().getTime();
						GM_setValue(imgFolder + this.name + imgExt, cacheId+"");
						newReloadedImg.src = imgFolder + this.name + imgExt + "?" + cacheId;
						newReloadedImg.alt = "Loading...";
						reloadedContainer.appendChild(newReloadedImg);
					}
				},true);
				link.appendChild(newImg);
				pageNo.appendChild(reloadPage);
				container.appendChild(pageNo);
				container.appendChild(link);
			}
			var manga = chap.protocol+"//"+chap.host+chap.pathname.substring(0,chap.pathname.indexOf("/",1)+1);
			var currChapIdx = document.getElementById("id_chapter_1").selectedIndex;
			var nextChapIdx = currChapIdx-1;
			if(nextChapIdx>=0){
				var nextChap = document.getElementById("id_chapter_1")[nextChapIdx].value;
			}
			else{
				var nextChap = parseInt(document.getElementById("id_chapter_1")[currChapIdx].value.split("/")[0])+"/"+pages[pages.length-1].value;
			}
			GM_openInTab(manga+nextChap);
			this.parentNode.removeChild(this);
		}, true);
		ads.parentNode.replaceChild(btnOpen,ads);
	}
}

function getFirstPageOfChapter(chap){
	GM_xmlhttpRequest({
		url:chap.href,
		method:"GET",
		onload:function(data){
			var dataText = data.responseText;
			var newLink = chap.protocol+"//"+chap.host+dataText.substring(dataText.indexOf("<li><a href=\"")+"<li><a href=\"".length, dataText.indexOf("\">Begin reading"));
			chap.href = newLink;
		}
	});
}

function createStyle(){
	
	var head = document.getElementsByTagName("head")[0];
	if(head==null) return;
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".reload{font-size:12px;color:#0d0;} a.reload:hover{color:#6f6;}";
	head.appendChild(style);
}

function clearReloadData(){
	var keys = GM_listValues();
	for(var i=0, key=null; key=keys[i]; i++){
		GM_deleteValue(key);
	}
}