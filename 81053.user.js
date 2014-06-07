// ==UserScript==
// @name           Mangafox Chapter Loader
// @namespace      MangafoxChapterLoader
// @include        http://*.mangafox.com/manga/*
// @version        0.3
// ==/UserScript==

GM_registerMenuCommand("Clear Reload Data", clearReloadData);

var beta;
var mangaURL;
var chapURL;
var page;
var currPage;
var directoryURL;
var totalImages;
var pageList;
var chapList;
var currChap;
var prevChap;
var nextChap;
var imgRegex = /<img.*?src="(.*?)".*?id="image".*?>/
var startIdx;
var currentIdx;
var endIdx;

var ads = document.getElementById("topad");
if(ads!=null){
	scroll(0,0);
	while(ads.hasChildNodes()) ads.removeChild(ads.firstChild);
	var btnOpen = document.createElement("input");
	btnOpen.type = "button";
	btnOpen.value = "Open This Chapter";
	btnOpen.style.height = "27px";
	btnOpen.addEventListener("click", function(){
		createStyle();
		getData();
		startReplace();
		removeHeader();
		openNextChapter();
	}, true);
	ads.appendChild(btnOpen);
	var bottomAds = document.getElementById("bottom_ads");
	bottomAds.parentNode.removeChild(bottomAds);
}

function getData(){
	var tArray = (window.location.href+'/').match(/http:\/\/(www|beta)\.mangafox\.com\/manga\/([^\/]*)\/((?:v[^\/]*\/)?c[^\/]*)\/*(\d*)/);
	beta = tArray[1];
	mangaURL = tArray[2];
	chapURL = tArray[3];
	page = tArray[4] != "" ? parseInt(tArray[4]) : 1;
	currPage = page-1;
	directoryURL = "http://"+beta+".mangafox.com/manga/"+mangaURL+"/";
	var selects = document.getElementsByTagName('select');
	totalImages = selects[1].length;
	pageList = selects[1].innerHTML;
	var chapCmb = selects[0];
	chapList = chapCmb.innerHTML;
	currChap = chapCmb.selectedIndex;
	var dir = directoryURL;
	if(beta=="beta") dir="";
	prevChap = dir;
	if(currChap>0) prevChap+=chapCmb.options[currChap-1].value+"/";
	nextChap = dir;
	if(currChap+1<chapCmb.length) nextChap+=chapCmb.options[currChap+1].value+"/";
}

function startReplace(){
	var contentPlaceholder = document.getElementById("viewer");
	contentPlaceholder.style.width = (window.innerWidth-66)+"px";
	contentPlaceholder.style.backgroundColor = "#333333";
	var oldContent = document.evaluate("//div[@id='viewer']//a[@onclick='return enlarge();']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	oldContent.parentNode.removeChild(oldContent);
	document.getElementById("tool").style.display = "none";
	
	startIdx = currPage;
	currentIdx = startIdx;
	for(var i=currPage;i<totalImages;i++){
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
	}
	endIdx = totalImages-1;
	getChapterPage(currentIdx+1,false);
}

function loadNextPage(){
	getChapterPage(currentIdx+1,false);
	currentIdx++;
}

function getChapterPage(i,r){
	GM_xmlhttpRequest({
		url:directoryURL+chapURL+'/'+i+'.html',
		method:"GET",
		onload:function(data){
			var oldElement = document.getElementById("l"+i);
			if(oldElement!=null) oldElement.parentNode.removeChild(oldElement);
		
			if( beta == 'beta' ) { imgRegex = /defaultImg='(.*?\.(?:jpg|png))';/ }
			var imgURL = data.responseText.match(imgRegex)[1];
			var ih = document.getElementById("p"+i);
			var imgElement = document.createElement("img");
			imgElement.id = "i"+i;
			imgElement.style.maxWidth = (window.innerWidth-76)+"px";
			if(!r && currentIdx<=endIdx){
				imgElement.addEventListener("load", loadNextPage, false);
			}
			var cacheId;
			if(r){
				cacheId = new Date().getTime();
				GM_setValue(imgURL, cacheId+"");
			}
			cacheId = GM_getValue(imgURL);
			imgElement.src = imgURL+(cacheId==null?"":"?"+cacheId);
			imgElement.alt = "Loading...";
			var link = document.createElement("a");
			link.id = "l"+i;
			link.href = directoryURL+chapURL+'/'+i+'.html';
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
	style.innerHTML = ".pageNumber{font-size:18px;color:#ddd;margin-top:20px;font-weight:bold} .reload{font-size:12px;color:#0d0;} a.reload:hover{color:#6f6;cursor:pointer;}";
	head.appendChild(style);
}

function removeHeader(){
	var header = document.getElementsByClassName("widepage page")[0];
	header.parentNode.removeChild(header);
}

function openNextChapter(){
	GM_openInTab(nextChap);
}

function clearReloadData(){
	var keys = GM_listValues();
	for(var i=0, key=null; key=keys[i]; i++){
		GM_deleteValue(key);
	}
}