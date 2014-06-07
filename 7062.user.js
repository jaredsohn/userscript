// ==UserScript==
// @name	Google Reader Search
// @namespace	CasellOrg
// @include http://google.com/reader/*
// @include http://*.google.com/reader/*
// @include https://google.com/reader/*
// @include https://*.google.com/reader/*
// @include http://google.it/reader/*
// @include http://*.google.it/reader/*
// @include https://google.it/reader/*
// @include https://*.google.it/reader/*
// ==/UserScript==

//These are the defaults if you don't want to change them every time on the page change them here
var MAXNEWS=1000; // Max news to search on
var xmltimeout=60; // timeout for the cache in seconds (this is 1 minute)
var sortOrder='n'; // 'm' -> auto; 'n' -> newest; 'o' -> oldest
//End Defaults

var UID;
var OLDXML='';
var XMLCACHE='';
var st='';

function onHover(event) {
	trg=event.target;
	trgid=trg.getAttribute('id');
	newsp=document.createElement('span');
	newsp.setAttribute('id','tooltip-gsearch');
	newsp.setAttribute('style','position:absolute;top:'+event.pageY+'px;left:'+(event.pageX-158)+'px;background:#E1ECFE');
	if (trgid=="maxNewsInput") {
		newsp.innerHTML="max number of items to search on";
	}
	else if (trgid=="cacheTimeOut") {
		newsp.innerHTML="cache timeout";
	}
	else if (trgid=="search-sort-select") {
		newsp.innerHTML="result sort order";
	}
	trg.parentNode.appendChild(newsp);
}

function onOut(event) {
	trg=event.target;
	tools=trg.parentNode.getElementsByTagName("span");
	for (var i=0;i<tools.length;i++) {
		trg.parentNode.removeChild(tools[i]);
	}
}

function varsetup() {
	var linkcont=document.getElementById("reading-list-selector");
	var as=linkcont.getElementsByTagName("a");
	for (i=0;i<as.length;i++) {
		url=as[i].getAttribute('href');
		urlchunks=url.split("/");
		UID=urlchunks[4];
	}
	newmax=document.getElementById("maxNewsInput").value;
	if (MAXNEWS!=newmax) {
		OLDXML=0;
		MAXNEWS=newmax;
	}
	xmltimeout=document.getElementById("cacheTimeOut").value;
	var sortSelect=document.getElementById("search-sort-select");
	neworder=sortSelect.options[sortSelect.selectedIndex].value;
	if (sortOrder!=neworder) {
		OLDXML=0;
		sortOrder=neworder;
	}
	//alert(MAXNEWS);
	//alert(xmltimeout);
}

function closeSearch() {
	var mybody=document.getElementsByTagName("body")[0];
	var spopin = document.getElementById("searchpopin");
	if (spopin) {
		mybody.removeChild(spopin);
	}
}

function onSearchKeypress(event){
	if (event.keyCode==13){
		searchFeeds();
	}
}

function resHandler(responseDetails) {
	//alert('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' + 'Feed data:\n' + responseDetails.responseText);
	var la=document.getElementById('loading-area');
	if (responseDetails!=false) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
		XMLCACHE=dom;
		OLDXML=new Date();
	}
	else {
		dom=XMLCACHE;
	}
	var entries = dom.getElementsByTagName('entry');
	var title;
	var summs;
	var contfi;
// 	alert(st);
	var searchresults=document.createElement("div");
	var height=document.body.clientHeight-160;
	searchresults.setAttribute("id","searchpopin");
	searchresults.setAttribute('style','position:absolute;top:100px;left:100px;height: '+height+'px;width: 70%; visibility: visible;background:#A4C5FF;z-index:10001;');
	searchresults.setAttribute('class','single-source');
	var searchentries=document.createElement("div");
	searchentries.setAttribute('style','position:absolute;left:1px;top:20px;height:'+(height-21)+'px;width:99%;overflow: auto;');
	var found=false;
	for (var i = 0; i < entries.length; i++) {
		title = entries[i].getElementsByTagName('title')[0].textContent;
		if (summsel=entries[i].getElementsByTagName('summary')[0]) {
			summs=summsel.textContent;
		}
		else { summs='';}
		if (contel=entries[i].getElementsByTagName('content')[0]) {
			contfi=contel.textContent;
		}
		else { contfi='';}


		if (title.search(st)!=-1 || summs.search(st)!=-1 || contfi.search(st)!=-1) {
			found=true;
			searchentries.appendChild(getResult(entries[i]));
			//alert(title +"->"+ summs);
		}
	}
	var closeb=document.createElement("div");
	closeb.innerHTML="Close";
	closeb.addEventListener("click", closeSearch, false);
	searchresults.appendChild(closeb);
	searchresults.appendChild(searchentries);
	var mybody=document.getElementsByTagName("body")[0];
	la.style.display="";
	if (found) {
		mybody.appendChild(searchresults);
	}
	else {
		alert("No Results Found");
	}
	st="";
}

function getResult(entry) {
	var titletext=entry.getElementsByTagName("title")[0].textContent;
	var url=entry.getElementsByTagName("link")[1].getAttribute('href');
	var summel=entry.getElementsByTagName("summary")[0];
	var contel=entry.getElementsByTagName("content")[0];
	var result=document.createElement("div");
	result.className="entry";
	var title=document.createElement("a");
	title.className="entry-title";
	title.setAttribute("href",url);
	title.setAttribute("target","_blank");
	title.innerHTML=titletext;
	result.appendChild(title);
	if (summel) {
		var cont=document.createElement("div");
		cont.className="entry-body";
		cont.innerHTML=summel.textContent;
		result.appendChild(cont);
	}
	if (contel) {
		var contfi=document.createElement("div");
		contfi.className="entry-body";
		contfi.innerHTML=contel.textContent;
		result.appendChild(contfi);
	}
	return result;
}

function searchFeeds(event) {
	closeSearch();
	varsetup();
	var la=document.getElementById('loading-area');
	la.style.display="inline";
	st=new RegExp(document.getElementById('searchInput').value,"im");
	now=new Date();
// 	alert(now);
// 	alert(OLDXML);
// 	alert(now-OLDXML);
	if (now-OLDXML>(xmltimeout*1000)) {
		url=window.location.toString();
		urlchunks=url.split("/");
		baseurl=urlchunks[0]+"//"+urlchunks[2];
		GM_xmlhttpRequest({
			method: 'GET',
			url: baseurl+"/reader/atom/user/"+UID+"/state/com.google/reading-list?n="+MAXNEWS+"&r="+sortOrder,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: resHandler 
		});
	}
	else {
		resHandler(false);
	}
}

if (document.getElementById('logo')!=null && document.location.search.indexOf("gmail-embed") == -1)
	addSearchBox();

function addSearchBox(){
	mybody=document.getElementsByTagName("body")[0];
	var globalInfo = document.getElementById("global-info");
	var buttonContainer = document.createElement("div");
	buttonContainer.setAttribute('id','searchContainer');
	var searchInput = document.createElement("input");
	searchInput.value = "";
	searchInput.setAttribute('id','searchInput');
	searchInput.addEventListener('keypress',onSearchKeypress,false);
	buttonContainer.appendChild(searchInput);
	var searchFeed = document.createElement("button");
	searchFeed.appendChild(document.createTextNode("Go"));
	searchFeed.className = "searchFeedButton";
	searchFeed.addEventListener("click", searchFeeds, false);
	searchFeed.addEventListener('keypress',onSearchKeypress,false);
	buttonContainer.appendChild(searchFeed);
	var sortSelect = document.createElement("select");
	sortSelect.setAttribute("id","search-sort-select");
	sortSelect.options[0]=new Option("Newest","n");
	sortSelect.options[1]=new Option("Oldest","o");
	sortSelect.options[2]=new Option("Auto","m");
	sortSelect.addEventListener('keypress',onSearchKeypress,false);
	sortSelect.addEventListener('mouseover',onHover,false);
	sortSelect.addEventListener('mouseout',onOut,false);
	if (sortOrder == "o") {
		sortSelect.selectedIndex=1;
	}
	else if (sortOrder == "m") {
		sortSelect.selectedIndex=2;
	}
	else {
		sortSelect.selectedIndex=0;
	}
	buttonContainer.appendChild(sortSelect);
	var maxNewsInput = document.createElement("input");
	maxNewsInput.value = MAXNEWS;
	maxNewsInput.setAttribute('id','maxNewsInput');
	maxNewsInput.setAttribute('style','width:50px;');
	maxNewsInput.addEventListener('keypress',onSearchKeypress,false);
	maxNewsInput.addEventListener('mouseover',onHover,false);
	maxNewsInput.addEventListener('mouseout',onOut,false);
	buttonContainer.appendChild(maxNewsInput);
	var cacheTimeOut = document.createElement("input");
	cacheTimeOut.value = xmltimeout;
	cacheTimeOut.setAttribute('id','cacheTimeOut');
	cacheTimeOut.setAttribute('style','width:50px;');
	cacheTimeOut.addEventListener('keypress',onSearchKeypress,false);
	cacheTimeOut.addEventListener('mouseover',onHover,false);
	cacheTimeOut.addEventListener('mouseout',onOut,false);
	buttonContainer.appendChild(cacheTimeOut);
	buttonContainer.className = "buttonContainer";
	mybody.insertBefore(buttonContainer,globalInfo);
	var style="#searchContainer {position: absolute;top: 17px; left: 158px;margin: 0;}";
	GM_addStyle(style);
}

