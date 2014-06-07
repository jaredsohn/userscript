// ==UserScript==
// @name           Mangashare Chapter Loader
// @namespace      MangashareChapterLoader
// @include        http://*.mangashare.com/*
// @version        0.1
// ==/UserScript==

var image;
var img;
var imgFolder;
var imgExt;
var container;

var bm = document.evaluate("//div[@id='readerbar']//div[@class='bookmark']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var ads = document.getElementById("sidead");
if(bm!=null && ads!=null){
	scroll(0,0);
	while(bm.hasChildNodes()) bm.removeChild(bm.firstChild);
	ads.parentNode.removeChild(ads);
	bm.setAttribute("style","text-align:left;padding:5px");
	document.getElementById("smwrapper").setAttribute("style","margin-left:0px");
	var btnOpen = document.createElement("input");
	btnOpen.type = "button";
	btnOpen.value = "Open This Chapter";
	btnOpen.addEventListener("click", function(){
		var pages = document.getElementsByName("pagejump")[0];
		var chap = document.location;
		image = document.evaluate("//div[@id='page']//a//img",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		img = image.src;
		imgFolder = img.substring(0,img.lastIndexOf("/")+1);
		imgExt = img.substring(img.lastIndexOf("."));
		container = image.parentNode.parentNode;
		container.removeChild(image.parentNode);
		for(var i=pages.selectedIndex;i<pages.length;i++){
			var page = pages[i].value;
			var link = document.createElement("a");
			link.id = page;
			link.href = chap+"/../page"+page+".html";
			var newImg = document.createElement("img");
			var cacheId = GM_getValue(imgFolder + page + imgExt);
			newImg.src = imgFolder + page + imgExt + (cacheId==null?"":"?"+cacheId);
			newImg.alt = "Loading...";
			var pageNo = document.createElement("div");
			pageNo.setAttribute("class","pageNumber");
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
		var manga = chap.protocol+"//"+chap.host+chap.pathname.substring(0,chap.pathname.indexOf("/",1)+1)+"chapter-";
		var currChapIdx = document.getElementsByName("chapterjump")[0].selectedIndex;
		var nextChapIdx = currChapIdx-1;
		if(nextChapIdx>=0){
			var nextChap = document.getElementsByName("chapterjump")[0][nextChapIdx].value+"/page001.html";
		}
		else{
			var nextChap = document.getElementsByName("chapterjump")[0][currChapIdx].value+"/page"+pages[pages.length-1].value+".html";
		}
		GM_openInTab(manga+nextChap);
		this.parentNode.removeChild(this);
		
		createStyle();
	}, true);
	bm.appendChild(btnOpen);
}

function createStyle(){
	var head = document.getElementsByTagName("head")[0];
	if(head==null) return;
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".pageNumber{font-size:18px;color:#666;margin-top:20px;font-weight:bold} .reload{font-size:12px;color:#060;} a.reload:hover{color:#0f0;}";
	head.appendChild(style);
}