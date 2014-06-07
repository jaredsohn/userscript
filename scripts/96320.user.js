// ==UserScript==
// @name           Mangareader Chapter Loader
// @namespace      MangareaderChapterLoader
// @include        http://www.mangareader.net/*/*
// @version        0.3
// ==/UserScript==

GM_registerMenuCommand("Clear Reload Data", clearReloadData);

var chapURL;
var ads = document.getElementById("adtop");
var maxPageOpened = 20;
var isrc1;
var isrc2;
var isrc3;
var pages;
var imgRegex = /<img.*?id="img".*?src="(.*?)".*?>/
var startIdx;
var currentIdx;
var endIdx;

if(ads!=null){
	scroll(0,0);
	while(ads.hasChildNodes()) ads.removeChild(ads.firstChild);
	ads.setAttribute("align","center");
	var txtOpen = document.createElement("input");
	txtOpen.type = "text";
	if(GM_getValue("maxPageOpened")==undefined)
		GM_setValue("maxPageOpened", 0);
	txtOpen.value = GM_getValue("maxPageOpened");
	txtOpen.style.height = "24px";
	txtOpen.style.width = "35px";
	ads.appendChild(txtOpen)
	var btnOpen = document.createElement("input");
	btnOpen.type = "button";
	btnOpen.value = "Open This Chapter";
	btnOpen.style.height = "29px";
	btnOpen.addEventListener("click", function(){
		if(!isNaN(txtOpen.value)){
			if(parseInt(txtOpen.value)<0) txtOpen.value=0;
			GM_setValue("maxPageOpened", txtOpen.value);
		}
		createStyle();
		startReplace();
	}, true);
	ads.appendChild(btnOpen);
}

function startReplace(){
	var isrc = document.evaluate('//img[@id="img"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src;
	if (isrc.substring(isrc.lastIndexOf("/")+1).indexOf("_") > -1){
		isrc1 = isrc.substring(0, isrc.lastIndexOf("/")+1);
		isrc2 = isrc.substring(isrc.lastIndexOf("/")+1, isrc.lastIndexOf("_"));
		isrc3 = isrc.substring(isrc.lastIndexOf("_"));
	}
	else{
		isrc1 = isrc.substring(0, isrc.lastIndexOf("-")+1);
		isrc2 = isrc.substring(isrc.lastIndexOf("-")+1, isrc.lastIndexOf("."));
		isrc3 = isrc.substring(isrc.lastIndexOf("."));
	}

	var contentPlaceholder = document.getElementById("imgholder");
	while(contentPlaceholder.hasChildNodes()) contentPlaceholder.removeChild(contentPlaceholder.firstChild);
	
	contentPlaceholder.setAttribute("align","center");
	contentPlaceholder.setAttribute("style","width:"+(window.innerWidth-30)+"px");
	pages = document.getElementById("pageMenu");
	
	maxPageOpened = parseInt(GM_getValue("maxPageOpened"));
	startIdx = pages.selectedIndex;
	currentIdx = startIdx;
	for(var i=pages.selectedIndex, j=1;i<pages.length;i++, j++){
		var ih = document.createElement("div");
		ih.id = "p"+(i+1);
		contentPlaceholder.appendChild(ih);

		var pageNo = document.createElement("div");
		pageNo.setAttribute("class","pageNumber");
		pageNo.innerHTML = (i+1);
		ih.appendChild(pageNo);

		var reloadPage = document.createElement("a");
		reloadPage.name = (i+1);
		reloadPage.setAttribute("class","reload");
		reloadPage.appendChild(document.createTextNode(" [Reload]"));
		reloadPage.addEventListener("click",function(){
			getChapterPage(this.name,true);
		},true);
		pageNo.appendChild(reloadPage);
		if(j==maxPageOpened && i+1<pages.length && maxPageOpened>0){
			endIdx = i;
			getChapterPage(currentIdx+1,false);
			removeHeader();
			GM_openInTab("http://www.mangareader.net"+pages.options[i+1].value);
			return;
		}
	}
	endIdx = pages.length-1;
	getChapterPage(currentIdx+1,false);
	removeHeader();
	openNextChapter();
}

function loadNextPage(){
	getChapterPage(currentIdx+1,false);
	currentIdx++;
}

function getChapterPage(i,r){
	GM_xmlhttpRequest({
		url:"http://www.mangareader.net"+pages.options[i-1].value,
		method:"GET",
		onload:function(data){
			var oldElement = document.getElementById("l"+i);
			if(oldElement!=null) oldElement.parentNode.removeChild(oldElement);
			
			var imgPath = data.responseText.match(imgRegex)[1];
			
			var ih = document.getElementById("p"+i);
			var imgElement = document.createElement("img");
			imgElement.id = "i"+i;
			imgElement.style.maxWidth = (window.innerWidth-50)+"px";
			if(!r && currentIdx<=endIdx){
				imgElement.addEventListener("load", loadNextPage, false);
			}
			var cacheId;
			if(r){
				cacheId = new Date().getTime();
				GM_setValue(imgPath, cacheId+"");
			}
			cacheId = GM_getValue(imgPath);
			imgElement.src = imgPath+(cacheId==null?"":"?"+cacheId);
			imgElement.alt = "Loading...";
			var link = document.createElement("a");
			link.id = "l"+i;
			link.href = pages.options[i-1].value;
			link.appendChild(imgElement);
			ih.appendChild(link);
		}
	});
}

function createStyle(){
	var head = document.getElementsByTagName("head")[0];
	if(head==null) return;
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".pageNumber{font-size:18px;color:#ddd;margin-top:30px;font-weight:bold} .reload{font-size:12px;color:#0d0;} a.reload:hover{color:#6f6;cursor:pointer;}";
	head.appendChild(style);
}

function removeHeader(){
	ads.parentNode.removeChild(ads);
}

function openNextChapter(){
	var chap = document.getElementById("chapterMenu");
	if(chap.selectedIndex+1<chap.length){
		GM_openInTab("http://www.mangareader.net"+chap.options[chap.selectedIndex+1].value);
	}
}

function clearReloadData(){
	var keys = GM_listValues();
	for(var i=0, key=null; key=keys[i]; i++){
		GM_deleteValue(key);
	}
}