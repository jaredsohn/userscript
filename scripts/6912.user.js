// ==UserScript==
// @name                Google Reader Custom Search (2)
// @namespace      		http://google.com/reader/userscript
// @description       	Search your Google Reader feeds using Google Co-op inside Google Reader
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// ==/UserScript==

//Based on my other reader search script: http://userscripts.org/scripts/show/5958
//Directions for setting up the script with a custom search engine from:
//http://googlesystem.blogspot.com/2006/12/script-for-google-reader-search.html
// Go to your custom search engine at google.com/coop/cse . Do a search for test.
// You will get a URL like:
// http://www.google.com/custom?cx=003884673279755833555%3A_8kirrqzcjs&q=test&sa=Search&cof=CX%3AGoogle%2520Reader%2520Search%3BFORID%3A1
// Remove this from the URL: "&q=test" and copy the result here, where it says: "REPLACE-THIS"
var SearchURL="REPLACE-THIS";

var start=0;
var num=100;
var sort="r";
var searchType=0;
if (document.getElementById('logo')!=null && document.location.search.indexOf("gmail-embed") == -1)
	addSearchBox();
function addSearchBox(){
	var mybody = document.getElementsByTagName("body")[0];
	var globalInfo = document.getElementById("global-info");
	var buttonContainer = document.createElement("div");
	buttonContainer.setAttribute('id','searchContainer');
	var searchInput = document.createElement("input");
    	searchInput.value = "";
    	searchInput.setAttribute('id','searchInput');
    	searchInput.addEventListener('keypress',onSearchKeypress,false);
    	buttonContainer.appendChild(searchInput);
	buttonContainer.className = "buttonContainer";
	var searchFeed = document.createElement("button");
	searchFeed.appendChild(document.createTextNode("Search Feed"));
	searchFeed.className = "searchFeedButton";
	searchFeed.addEventListener("click", onSearchFeed, false);
	buttonContainer.appendChild(searchFeed);
	var searchWebButton = document.createElement("button");
	searchWebButton.appendChild(document.createTextNode("Search All"));
	searchWebButton.className = "searchWebButton";
	searchWebButton.addEventListener("click", onSearchAll, false);
	buttonContainer.appendChild(searchWebButton);
	mybody.insertBefore(buttonContainer,globalInfo);
	var style="#searchContainer {position: absolute;top: 17px; left: 158px;margin: 0;}";
	GM_addStyle(style);
}

function onSearchKeypress(event){
	if (event.keyCode==13){
		onSearchFeed();
	}
}

function onSearchFeed(event){
	debug('search feed-'+sort);
	searchType=0;
	var query=document.getElementById('searchInput').value;
	var feed=document.getElementById("chrome-stream-title").firstChild
	try{
		if (feed!=null)
			feed.getAttribute("href");
		else
			feed="";
	}
	catch(e){feed="";}
	if (feed!=""){
		start=0;
		var rss="http://blogsearch.google.com/blogsearch_feeds?q=site:"+feed+"+"+encodeURIComponent(query)+"&start="+start+"&num="+num+"&scoring="+sort+"&output=atom";
		debug(rss);
		GM_xmlhttpRequest({
    		method: 'GET',
    		url: rss,
    		headers: {},
  			onload: function(responseDetails) {
        			searchComplete(responseDetails);
   			 }
		});
		/*
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml',
		*/
	}
	else
		onSearchAll(event,query);
}

function onSearchAll(event,query){
	debug("onSearchAll "+sort);
	searchType=1;
	query=query?query:document.getElementById('searchInput').value;
	start=0;
	if (SearchURL=="REPLACE-THIS"){
	  alert("You need to setup your custom search engine first\nFollow the steps at the top of this script");
	}
	else{
  	var realURL=SearchURL+"&q="+encodeURIComponent(query);//+"&start="+start+"&num="+num;
  	GM_xmlhttpRequest({
  		method: 'GET',
  		url: realURL,
  		headers: {},
  		onload: function(responseDetails) {
      		searchComplete(responseDetails);
  		}
  	});
  }
}


function searchComplete(details){
	debug("search completed..."+details.status);
	if (details.status==200){
		var parser = new DOMParser();
		var response=details.responseText;	
		if (searchType==1){
			var pos1=response.indexOf("<head>");
			var pos2=response.indexOf("</head>");
			var headText=response.substring(pos1,pos2+7);
			response=response.replace(headText,"");
			response=response.replace(/<body\s(.+?)>/,"<body>");
		}
		var entries;
		if (searchType==0){
			var dom = parser.parseFromString(response,"application/xml");
			entries=dom.getElementsByTagName("entry");
		}
		else{
			entries=new Array();
  		var divPos=response.indexOf("<div class=g>");
			do{
  			response=response.substring(divPos+13);
				divPos=response.indexOf("</div>");
				var entry=response.substring(0,divPos);
				response=response.substring(divPos+6);
				var div=document.createElement("div");
				div.innerHTML=entry;
				entries.push(div);
				divPos=response.indexOf("<div class=g>");				
			}while(divPos>=0);
		}
		showSearch(entries);
	}
}
function showSearch(entries){
	debug("show search");
	var viewer=document.createElement("div");
	viewer.setAttribute("id","viewer-box-table");
	//viewer.setAttribute('style','height: 100% !important;');
	var topLinks=document.createElement('div'); topLinks.setAttribute('id','viewer-top-links');
		var spanLinksParent=document.createElement('span'); spanLinksParent.setAttribute('id','viewer-all-new-links-parent');
		if (searchType==0){							
			var spanLinks=document.createElement('span'); spanLinks.setAttribute('id','viewer-new-links'); 
			spanLinks.innerHTML="Sort by: ";
			spanLinksParent.appendChild(spanLinks);
			var spanRelevance=document.createElement('span'); spanRelevance.setAttribute('id','score-relevance');
			spanRelevance.innerHTML="Relevance";
			spanRelevance.className='link';
			if (sort=='r') spanRelevance.setAttribute('style','font-weight: bold;');
			spanRelevance.addEventListener('click',scoreRelevance,false);
			spanLinksParent.appendChild(spanRelevance);
			var spanDate=document.createElement('span'); spanDate.setAttribute('id','score-date');
			spanDate.innerHTML="Date";
			spanDate.className='link';
			if (sort=='d') 
				spanDate.setAttribute('style','padding-left: 5px; font-weight: bold;');
			else
				spanDate.setAttribute('style','padding-left: 5px;');
			spanDate.addEventListener('click',scoreDate,false);
			spanLinksParent.appendChild(spanDate);
		}
		topLinks.appendChild(spanLinksParent);
		var divider=document.createElement("div"); divider.className="clr";
		topLinks.appendChild(divider);
	viewer.appendChild(topLinks);
  var searchresults=document.createElement("div");
		var height=document.body.clientHeight-160;
		searchresults.setAttribute("id","entries");
		searchresults.setAttribute('style','height: '+height+'px;width: 100%; visibility: visible;');
		for (var i=0;i<entries.length;i++){
			searchresults.appendChild(getResult(entries[i]));
		}
		var scrollfiller=document.createElement('div'); scrollfiller.setAttribute('id','scroll-filler'); scrollfiller.setAttribute('style','height: 0px;');
		var scrollfillermessage=document.createElement('div'); scrollfillermessage.setAttribute('id','scroll-filler-message'); 
			scrollfillermessage.innerHTML="No more items";
		scrollfiller.appendChild(scrollfillermessage);
		searchresults.appendChild(scrollfiller);
	viewer.appendChild(searchresults);
	var footer=document.createElement('div'); footer.setAttribute('id','chrome-footer-container');
		footer.innerHTML="&nbsp;"
		var btnContainer=document.createElement('div'); btnContainer.className='button-container';
		footer.appendChild(btnContainer);
	viewer.appendChild(footer);
	var inside = document.getElementById("viewer-page-container");
	debug("inside: "+inside+" class: "+inside.className+"\n");
	if (inside && inside.className.indexOf("hidden")==-1)
  	inside.replaceChild(viewer,inside.firstChild);
  else{
    inside = document.getElementById("viewer-box-inner");
    inside.parentNode.replaceChild(viewer,inside);
  }
	debug("end show search");
}

function getResult(entry){
	debug("getresult-"+searchType);
	var title; var url; var content; var bottomGroup;
	if (searchType==0){	
		title=entry.getElementsByTagName("title")[0].firstChild.nodeValue;
		url=entry.getElementsByTagName("link")[0].getAttribute("href");
		content=entry.getElementsByTagName("content")[0].firstChild.nodeValue;
		bottomGroup="";
		try{
			buttomGroup=entry.getElementsByTagName("author")[0].getElementsByTagName("uri")[0];
			debug(bottomGroup);
  		bottomGroup=bottomGroup.textContent;
			debug(bottomGroup);
		}catch(e){}
		if (bottomGroup==null){
			bottomGroup=url;
		}
	}
	else{
		//debug(entry);
		//debug(entry.innerHTML);
		var nodeStart=0;
		do{
			title=entry.childNodes[nodeStart];
			nodeStart++;
		} while(title.tagName!="H2");
		title=title.firstChild;
		debug("title: "+title);
		url=title.getAttribute("href"); debug("url: "+url);
		content=entry.childNodes[nodeStart].firstChild.firstChild.firstChild.firstChild;
		var options=content.childNodes[content.childNodes.length-1];
		debug("content nodes: "+content.childNodes.length);
		var linkText=null;
		if (content.childNodes.length>1)
			linkText=content.childNodes[content.childNodes.length-2]; 
		content.removeChild(options);
		if (linkText!=null)
			content.removeChild(linkText);
		bottomGroup=document.createElement("div");
		if (linkText!=null)
			bottomGroup.appendChild(linkText);
		bottomGroup.appendChild(options);
	}
	debug("create entry");
	return createEntry(title,url,content,bottomGroup);
}

function createEntry(title,url,content,bottomGroup){
	var result=document.createElement("div");
	result.className="entry";
	var table=document.createElement("table");
	table.className="card";
		var tbody=document.createElement("tbody");
		tbody.className="card-tbody";
			var tr1=document.createElement("tr");
				var td1=document.createElement("td"); td1.className="ctl"; tr1.appendChild(td1);
				var td2=document.createElement("td"); td2.className="ct";  tr1.appendChild(td2);
				var td3=document.createElement("td"); td3.className="ctr"; tr1.appendChild(td3);
		tbody.appendChild(tr1);
			 var tr2=document.createElement("tr");
				var td12=document.createElement("td"); td12.className="cl";  tr2.appendChild(td12);
				var td22=document.createElement("td"); td22.className="cc"; 
					var container=document.createElement('div');
					container.className="entry-container";
					var main=document.createElement('div');
					main.className="entry-main";
						var eleDate=document.createElement('div');
						eleDate.className="entry-date";
						var eleTitle;
  					if (searchType==0){
							eleTitle=document.createElement("h2");
							eleTitle.className="entry-title";
								var eleTitleLink=document.createElement("a");
								eleTitleLink.setAttribute("target","_blank");
								eleTitleLink.setAttribute("href",url);
									var eleTitleSpan=document.createElement('span');
									eleTitleSpan.innerHTML=title;
									//eleTitleSpan.appendChild(document.createTextNode(title));
									var eleTitleImg=document.createElement("img");
									eleTitleImg.setAttribute("width","18");
									eleTitleImg.setAttribute("height","18");
									eleTitleImg.setAttribute("src","/reader/ui/1416249330-go-to.gif");
								eleTitleLink.appendChild(eleTitleSpan);
							eleTitle.appendChild(eleTitleLink);
							eleTitle.appendChild(eleTitleImg);
  					}
						else{
							eleTitle=title;
						}
  				main.appendChild(eleTitle);
						var body=document.createElement("div");
						body.className="entry-body";
						if (searchType==0)
							body.innerHTML="<P>"+content+"</P>";
						else
							body.appendChild(content);
					main.appendChild(body);
					container.appendChild(main);
				td22.appendChild(container);
				tr2.appendChild(td22);
				var td32=document.createElement("td"); td32.className="cr"; tr2.appendChild(td32);
		tbody.appendChild(tr2);	
			var tr3=document.createElement("tr");
			tr3.className="card-actionrow";
				var td13=document.createElement("td"); td13.className="cal"; tr3.appendChild(td13);
				var td23=document.createElement("td"); td23.className="ca";  
					var actions=document.createElement("div"); actions.className="entry-actions";
						var blogSpan=document.createElement("span");
							if (searchType==0)
								blogSpan.innerHTML=bottomGroup;
							else{
  							blogSpan.innerHTML=bottomGroup.innerHTML;
							}
							blogSpan.setAttribute('style','padding-left: 20px;');
					actions.appendChild(blogSpan);
				td23.appendChild(actions);
				tr3.appendChild(td23);
				var td33=document.createElement("td"); td33.className="car"; tr3.appendChild(td33);
		tbody.appendChild(tr3);
			var tr4=document.createElement("tr");
			//tr4.className="card-bottomrow";
				var td14=document.createElement("td"); td14.className="cbl";  tr4.appendChild(td14);
				var td24=document.createElement("td"); td24.className="cb";   tr4.appendChild(td24);
				var td34=document.createElement("td"); td34.className="cbr";  tr4.appendChild(td34);
		tbody.appendChild(tr4);
	table.appendChild(tbody);
	result.appendChild(table);
	debug("entry created");
	return result;
}
function scoreRelevance(){
	debug('score rel');
	sort='r';
	if (searchType==0){
		onSearchFeed();
	}
	else{
		onSearchAll();
	}
}
function scoreDate(){
	debug('score date-'+searchType);
	sort='d';
	if (searchType==0){
		onSearchFeed();
	}
	else{
		onSearchAll();
	}
}

function debug(msg){  //GM_log(msg);}
