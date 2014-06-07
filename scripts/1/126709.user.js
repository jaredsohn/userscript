// ==UserScript==
// @name           Manga FOX LOADER
// @namespace      MangaChapterLoader
// @version        1.6
// @include        http://www.mangafox.com/manga/*/*
// @include        http://www.7manga.com/online_manga/* 
// @include        http://www.mangahere.com/manga/*
// ==/UserScript==

GM_registerMenuCommand("Clear Data", clearData);

var imagePlaceHolder;
var chapterPages = new Array();
var currentPageIdx;
var maxQueue = 2;
var currentQueue;
var nextChapterURL;
var imgRegex;

var maxmangasImageRoot;
var maxmangasImageList;

function createUI(){
	var panel = document.createElement("div");
	panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:2px solid #000; padding:5px; position:fixed; top:0px; left:0px; text-align:left;");
	document.body.appendChild(panel);
	panel.innerHTML = "<table>"
		+"<tr><td>Maximum queued pages</td><td>&nbsp;:&nbsp;</td><td><input type=\"text\" id=\"pagesQueue\" style=\"width:35px\" value=\""+getMaxQueue()+"\" /></td></tr>"
		+"<tr><td></td><td></td><td><input type=\"button\" id=\"saveSetting\" value=\"Save Setting\" style=\"height:27px\" /></td></tr>"
		+"</table>"
		+"<hr>"
		+"<input type=\"button\" id=\"openChapter\" value=\"Open This Chapter\" style=\"height:27px\" />"
	var btnSave = document.getElementById("saveSetting");
	btnSave.addEventListener("click", function(){
		if(isNaN(document.getElementById("pagesQueue").value) || document.getElementById("pagesQueue").value<1 || document.getElementById("pagesQueue").value>999){
			alert("incorrect number");
			document.getElementById("pagesQueue").value = getMaxQueue();
		}
		else{
			GM_setValue("maxQueue"+window.location.host, document.getElementById("pagesQueue").value);
			alert("saved");
		}
			
	}, true);
	var btnOpen = document.getElementById("openChapter");
	btnOpen.addEventListener("click", function(){
		init();
		generateImageList();
		createStyle();
		while(currentQueue<maxQueue){
			currentQueue++;
			loadNextPage();
		}
		panel.parentNode.removeChild(panel);
		GM_openInTab(nextChapterURL);
	}, true);
	
}

function init(){
	switch(window.location.host){
		case "www.mangafox.com":
			imagePlaceHolder = document.getElementById("viewer");
			var ads = document.getElementsByClassName("b160x600")[0];
			if(ads!=undefined)
				ads.parentNode.removeChild(ads);
			
			var tArray = (window.location.href+'/').match(/http:\/\/www\.mangafox\.com\/manga\/([^\/]*)\/((?:v[^\/]*\/)?c[^\/]*)\/*(\d*)/);
			var mangaURL = tArray[1];
			var chapURL = tArray[2];
			var directoryURL = "http://www.mangafox.com/manga/"+mangaURL+"/";
			var pagesSelect = document.getElementsByTagName('select')[1];
			for(var i=0;i<pagesSelect.length;i++){
				chapterPages[i] = directoryURL+chapURL+'/'+(i+1)+'.html';
			}
			
			currentPageIdx = pagesSelect.selectedIndex;
			
			var chapterSelect = document.getElementsByTagName('select')[0];
			var currChap = chapterSelect.selectedIndex;
			if(currChap+1<chapterSelect.length) nextChapterURL=directoryURL+chapterSelect.options[currChap+1].value+"/";
			else nextChapterURL = chapterPages[pagesSelect.length-1];
			
			imgRegex = /<img.*?src="(.*?)".*?id="image".*?>/
			break;
		case "read.mangashare.com":
			imagePlaceHolder = document.getElementById("page");
			var ads = document.getElementById("sidead");
			if(ads!=undefined)
				ads.parentNode.removeChild(ads);
			document.getElementById("smwrapper").setAttribute("style","margin-left:0px");
			
			var pagesSelect = document.getElementsByName("pagejump")[0];
			var chapterSelect = document.getElementsByName("chapterjump")[0];
			var manga = document.location.protocol+"//"+document.location.host+document.location.pathname.substring(0,document.location.pathname.indexOf("/",1)+1)+"chapter-";
			for(var i=0;i<pagesSelect.length;i++){
				chapterPages[i] = manga+chapterSelect.value+"/page"+pagesSelect[i].value+".html";
			}
			
			currentPageIdx = pagesSelect.selectedIndex;
			
			var currChapIdx = chapterSelect.selectedIndex;
			var nextChapIdx = currChapIdx-1;
			if(nextChapIdx>=0) nextChapterURL = manga+chapterSelect[nextChapIdx].value+"/page001.html";
			else nextChapterURL = chapterPages[pagesSelect.length-1];
			
			imgRegex = /<img.*?src="(.*?)".*?alt=".*?Chapter.*?Page.*?".*?>/
			break;
		case "www.7manga.com":
			imagePlaceHolder = document.getElementById("TheImg").parentNode;
			document.getElementById("td_left").parentNode.removeChild(document.getElementById("td_left"));
			document.getElementById("td_right").parentNode.removeChild(document.getElementById("td_right"));
			
			var chapURL = (window.location+"").substring(0,(window.location+"").indexOf("?"));
			if(chapURL.length==0) chapURL = window.location+"";
			var pagesSelect = document.getElementById("pageindex");
			for(var i=0;i<pagesSelect.length;i++){
				chapterPages[i] = chapURL+"?t=1&n="+pagesSelect[i].value;
			}
			
			currentPageIdx = pagesSelect.selectedIndex;
			
			if(document.getElementById("nextvol").style.display!="none"){
				var l = window.location.href;
				var manga = l.substring(0,l.indexOf("-"));
				var ch = l.substring(l.indexOf("-")+1,l.indexOf(".html"));
				nextChapterURL=manga+"-"+(parseInt(ch)+1)+".html";
			}
			else nextChapterURL = chapterPages[pagesSelect.length-1];
			
			var currImg = document.getElementById("TheImg");
			maxmangasImageList = document.getElementById("pic").value.split("\n");
			for(var i=0;i<maxmangasImageList.length;i++){
				maxmangasImageList[i] = maxmangasImageList[i].replace("\r","");
				if(currImg.src.indexOf(maxmangasImageList[i])!=-1){
					maxmangasImageRoot = currImg.src.substring(0,currImg.src.indexOf(maxmangasImageList[i]));
					break;
				}
			}
			break;
		case "www.mangareader.net":
			imagePlaceHolder = document.getElementById("imgholder");
			
			var pagesSelect = document.getElementById("pageMenu");
			for(var i=0;i<pagesSelect.length;i++){
				chapterPages[i] = "http://www.mangareader.net"+pagesSelect.options[i].value;
			}
			
			currentPageIdx = pagesSelect.selectedIndex;
			
			var chap = document.getElementById("chapterMenu");
			if(chap.selectedIndex+1<chap.length) nextChapterURL="http://www.mangareader.net"+chap.options[chap.selectedIndex+1].value;
			else nextChapterURL = chapterPages[pagesSelect.length-1];
			
			imgRegex = /<img.*?id="img".*?src="(.*?)".*?>/;
			break;
		case "manga.animea.net":
			imagePlaceHolder = document.getElementsByClassName("mangaimg")[0].parentNode.parentNode;
			
			var pagesSelect = document.getElementsByName("page")[0];
			var chapterSelect = document.getElementById("chapterlistheader");
			
			var manga = document.location.protocol+"//"+document.location.host+document.location.pathname.substring(0,document.location.pathname.indexOf("-chapter-",1));
			for(var i=0;i<pagesSelect.length;i++){
				chapterPages[i] = manga+chapterSelect.value+"-page-"+pagesSelect[i].value+".html";
			}
			
			currentPageIdx = pagesSelect.selectedIndex;
			
			if(chapterSelect.selectedIndex+1<chapterSelect.length) nextChapterURL=manga+chapterSelect.options[chapterSelect.selectedIndex+1].value+"-page-1.html";
			else nextChapterURL = manga+chapterSelect.options[chapterSelect.selectedIndex].value+"-page-"+pagesSelect[pagesSelect.length-1].value+".html";
			
			imgRegex = /<img.*?src="(.*?)".*?class="mangaimg"(.*?)>/
			break;
		case "www.mangahere.com":
			imagePlaceHolder = document.getElementById("viewer");
			
			var pagesSelect = document.getElementsByClassName("wid60")[0];
			var chapterSelect = document.getElementById("top_chapter_list");

			for(var i=0;i<pagesSelect.length;i++){
				chapterPages[i] = pagesSelect[i].value;
			}
			
			currentPageIdx = pagesSelect.selectedIndex;
			
			var currChapIdx = chapterSelect.selectedIndex;
			if(currChapIdx+1<chapterSelect.length) nextChapterURL = chapterSelect[currChapIdx+1].value;
			else nextChapterURL = pagesSelect[pagesSelect.length-1].value;
			
			imgRegex = /<img.*?src="(.*?)".*?id="image"(.*?)>/
			break;
		default:
		
	}
	while(imagePlaceHolder.hasChildNodes()) imagePlaceHolder.removeChild(imagePlaceHolder.firstChild);
	imagePlaceHolder.style.width = (window.innerWidth-66)+"px";
	imagePlaceHolder.style.border = "4px solid #333";
	imagePlaceHolder.style.backgroundColor = "#000";
	imagePlaceHolder.style.textAlign = "center";
	
	currentQueue=0;
	maxQueue = getMaxQueue();
}

function generateImageList(){
	for(var i=currentPageIdx;i<chapterPages.length;i++){
		var ih = document.createElement("div");
		ih.id = "p"+(i+1);
		imagePlaceHolder.appendChild(ih);

		var pageNo = document.createElement("div");
		pageNo.setAttribute("class","pageNumber");
		pageNo.innerHTML = (i+1);
		ih.appendChild(pageNo);

		var reloadPage = document.createElement("a");
		reloadPage.name = i;
		reloadPage.setAttribute("class","reload");
		reloadPage.appendChild(document.createTextNode(" [Reload]"));
		reloadPage.addEventListener("click",function(){
			getChapterPage(parseInt(this.name),true);
		},true);
		pageNo.appendChild(reloadPage);
	}
}

function getChapterPage(i,r){
	if(i<chapterPages.length){
		if(window.location.host=="www.7manga.com")
			addImage(maxmangasImageRoot+maxmangasImageList[i]+".jpg",i,r);
		else{
			GM_xmlhttpRequest({
				url:chapterPages[i],
				method:"GET",
				onload:function(data){
					var oldElement = document.getElementById("l"+(i+1));
					if(oldElement!=null) oldElement.parentNode.removeChild(oldElement);

					addImage(data.responseText.match(imgRegex)[1],i,r);
				}
			});
		}
	}
}

function addImage(imgPath, i, r){
	var ih = document.getElementById("p"+(i+1));
	if(ih==null)GM_log(i+1);
	var imgElement = document.createElement("img");
	imgElement.id = "i"+(i+1);
	imgElement.style.maxWidth = (window.innerWidth-50)+"px";
	if(!r){
		imgElement.addEventListener("load", loadNextPage, false);
	}
	var cacheId;
	if(r){
		cacheId = new Date().getTime();
		GM_setValue(window.location.host+imgPath, cacheId+"");
	}
	cacheId = GM_getValue(window.location.host+imgPath);
	imgElement.src = imgPath+(cacheId==null?"":"?"+cacheId);
	imgElement.alt = "Loading...";
	var link = document.createElement("a");
	link.id = "l"+(i+1);
	link.href = chapterPages[i];
	link.appendChild(imgElement);
	ih.appendChild(link);
}

function loadNextPage(){
	getChapterPage(currentPageIdx++,false);
}

function createStyle(){
	var head = document.getElementsByTagName("head")[0];
	if(head==null) return;
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".pageNumber{font-size:18px;color:#666;margin-top:20px;font-weight:bold} .reload{font-size:12px;color:#060;} a.reload:hover{color:#0f0;}";
	head.appendChild(style);
}

function getMaxQueue(){
	var mq = GM_getValue("maxQueue"+window.location.host);
	return mq==null?999:mq;
}

function clearData(){
	var keys = GM_listValues();
	for(var i=0, key=null; key=keys[i]; i++){
		if(key.match("^"+window.location.host)==window.location.host){
			GM_deleteValue(key);
		}
	}
}

createUI();