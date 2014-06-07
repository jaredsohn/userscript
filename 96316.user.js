// ==UserScript==
// @name           MaxMangas Chapter Loader
// @namespace      MaxMangasChapterLoader
// @include        http://www.maxmangas.net/online_manga/*
// @version        0.2
// ==/UserScript==

GM_registerMenuCommand("Clear Reload Data", clearReloadData);

var chapURL;
var ads = document.getElementById("TheImg");
var adsCont;
var maxPageOpened = 20;
var listImg;
var imgRoot;
var startIdx;
var currentIdx;
var endIdx;

if(ads!=null){
	scroll(0,0);
	adsCont = ads.parentNode.parentNode.parentNode.firstChild.getElementsByTagName("td")[0];
	while(adsCont.hasChildNodes()) adsCont.removeChild(adsCont.firstChild);
	var txtOpen = document.createElement("input");
	txtOpen.type = "text";
	if(GM_getValue("maxPageOpened")==undefined)
		GM_setValue("maxPageOpened", 0);
	txtOpen.value = GM_getValue("maxPageOpened");
	txtOpen.style.height = "27px";
	txtOpen.style.width = "35px";
	adsCont.appendChild(txtOpen)
	var btnOpen = document.createElement("input");
	btnOpen.type = "button";
	btnOpen.value = "Open This Chapter";
	btnOpen.style.height = "27px";
	btnOpen.addEventListener("click", function(){
		if(!isNaN(txtOpen.value)){
			if(parseInt(txtOpen.value)<0) txtOpen.value=0;
			GM_setValue("maxPageOpened", txtOpen.value);
		}
		createStyle();
		startReplace();
	}, true);
	adsCont.appendChild(btnOpen);
}

function startReplace(){
	chapURL = (window.location+"").substring(0,(window.location+"").indexOf("?"));
	if(chapURL.length==0) chapURL = window.location+"";
	var currImg = document.getElementById("TheImg");
	var contentPlaceholder = currImg.parentNode;
	while(contentPlaceholder.hasChildNodes()) contentPlaceholder.removeChild(contentPlaceholder.firstChild);
	listImg = document.getElementById("pic").value.split("\n");
	var currImgIdx = 0;
	for(var i=0;i<listImg.length;i++){
		listImg[i] = listImg[i].replace("\r","");
		if(currImg.src.indexOf(listImg[i])!=-1){
			imgRoot = currImg.src.substring(0,currImg.src.indexOf(listImg[i]));
			currImgIdx = i;
			break;
		}
	}
	
	maxPageOpened = parseInt(GM_getValue("maxPageOpened"));
	startIdx = currImgIdx;
	currentIdx = startIdx;
	for(var i=currImgIdx, j=1;i<listImg.length;i++, j++){
		if(listImg[i].length == 0) continue;
		var ih = document.createElement("div");
		ih.id = "p"+(i+1);
		contentPlaceholder.appendChild(ih);

		var pageNo = document.createElement("div");
		pageNo.setAttribute("class","pageNumber");
		pageNo.innerHTML = (i+1);
		ih.appendChild(pageNo);

		var reloadPage = document.createElement("a");
		reloadPage.name = (i+1);
		reloadPage.id = imgRoot+listImg[i]+".jpg";
		reloadPage.setAttribute("class","reload");
		reloadPage.appendChild(document.createTextNode(" [Reload]"));
		reloadPage.addEventListener("click",function(){
			getChapterPage(this.id,this.name,true);
		},true);
		pageNo.appendChild(reloadPage);
		if(j==maxPageOpened && i+2<listImg.length && maxPageOpened>0){
			endIdx = i;
			getChapterPage(imgRoot+listImg[currentIdx]+".jpg",currentIdx+1,false);
			removeHeader();
			GM_openInTab(chapURL+"?t=1&n="+(i+2));
			return;
		}
	}
	endIdx = listImg.length-1;
	getChapterPage(imgRoot+listImg[currentIdx]+".jpg",currentIdx+1,false);
	removeHeader();
	openNextChapter();
}

function loadNextPage(){
	getChapterPage(imgRoot+listImg[currentIdx]+".jpg",currentIdx+1,false);
	currentIdx++;
}

function getChapterPage(imgPath,i,r){
	var oldElement = document.getElementById("l"+i);
	if(oldElement!=null) oldElement.parentNode.removeChild(oldElement);
	var ih = document.getElementById("p"+i);
	var imgElement = document.createElement("img");
	imgElement.id = "i"+i;
	imgElement.style.maxWidth = (window.innerWidth-100)+"px";
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
	link.href = chapURL+"?t=1&n="+i
	link.appendChild(imgElement);
	ih.appendChild(link);
}

function createStyle(){
	var head = document.getElementsByTagName("head")[0];
	if(head==null) return;
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".pageNumber{font-size:18px;color:#ddd;margin-top:20px;font-weight:bold} .reload{font-size:12px;color:#0d0;} a.reload:hover{color:#6f6;cursor:pointer;}";
	head.appendChild(style);
}

function removeHeader(){
	var header = adsCont.parentNode;
	header.parentNode.removeChild(header);
}

function openNextChapter(){
	if(document.getElementById("nextvol").style.display!="none"){
		var l = window.location.href;
		var manga = l.substring(0,l.indexOf("-"));
		var ch = l.substring(l.indexOf("-")+1,l.indexOf(".html"));
		GM_openInTab(manga+"-"+(parseInt(ch)+1)+".html");
	}
}

function clearReloadData(){
	var keys = GM_listValues();
	for(var i=0, key=null; key=keys[i]; i++){
		GM_deleteValue(key);
	}
}