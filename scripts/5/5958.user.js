// ==UserScript==
// @name                Google Reader Search
// @namespace      	http://google.com/reader/userscript
// @description       	Lets you search using Google's blogsearch directly from Google Reader
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// ==/UserScript==
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
	searchWebButton.appendChild(document.createTextNode("Search All Blogs"));
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
	try{;
		if (feed!=null)
			feed.getAttribute("href");
		else
			feed="";
	}
	catch(e){feed="";}
	if (feed!=""){
		start=0;
		var rss="http://blogsearch.google.com/blogsearch_feeds?q=site:"+feed+"+"+query+"&start="+start+"&num="+num+"&scoring="+sort+"&output=atom";
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
		//window.location=blogsearch;
		//var inside = document.getElementById("chrome")
		//inside.parentNode.removeChild(inside);//.setAttribute("hidden","true");
	}
	else
		onSearchAll(event,query);
}

function onSearchAll(event,query){
	searchType=1;
	query=query?query:document.getElementById('searchInput').value;
	//var websearch="http://www.google.com/search?q="+query.replace(' ','+');
	//window.location=websearch;
	start=0;
	//http://blogsearch.google.com/blogsearch_feeds?q=Google&num=100&output=atom&scoring=d
	var rss="http://blogsearch.google.com/blogsearch_feeds?q="+query+"&start="+start+"&num="+num+"&scoring="+sort+"&output=atom";
	debug(rss);
	debug('All: '+query);
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: rss,
    		headers: {},
  		onload: function(responseDetails) {
        		searchComplete(responseDetails);
   		 }
	});
}

function searchComplete(details){
	//debug(details.statusText);
	if (details.status==200){
		var parser = new DOMParser();
        	var dom = parser.parseFromString(details.responseText,
           		 "application/xml");
		
		var viewer=document.createElement("table");
		viewer.setAttribute("cellspacing","0"); 
		viewer.setAttribute("cellpadding","0"); 
		viewer.setAttribute("border","0"), 
		viewer.className="round-box"; 
		viewer.setAttribute("id","viewer-box");
		//viewer.setAttribute('style','height: 100% !important;');
		var viewerBody=document.createElement('tbody');
			var tr=document.createElement("tr");
				var td1=document.createElement("td"); td1.className="s tl"; tr.appendChild(td1);
				var td2=document.createElement("td"); td2.className="s";  tr.appendChild(td2);
				var td3=document.createElement("td"); td3.className="s tr sq"; tr.appendChild(td3);
		viewerBody.appendChild(tr);
			var tr=document.createElement("tr");
				var td1=document.createElement("td"); td1.className="s"; tr.appendChild(td1);
				var td2=document.createElement("td"); td2.className="c";  tr.appendChild(td2);				
					var topLinks=document.createElement('div'); topLinks.setAttribute('id','viewer-top-links');
						var spanLinksParent=document.createElement('span'); spanLinksParent.setAttribute('id','viewer-all-new-links-parent');
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
						topLinks.appendChild(spanLinksParent);
						var hiddenDiv=document.createElement('div'); hiddenDiv.setAttribute('id','message-area-internal'); hiddenDiv.className='hidden';
						topLinks.appendChild(hiddenDiv);
					td2.appendChild(topLinks);
					
					var searchresults=document.createElement("div");
					var height=document.body.clientHeight-160;
					searchresults.setAttribute("id","entries");
					searchresults.setAttribute('style','height: '+height+'px;width: 100%; visibility: visible;');//height: 240px; //overflow: auto; overflow-x: visible;
					searchresults.setAttribute('class','single-source');
					var entries=dom.getElementsByTagName("entry");
					debug("Entries: "+entries.length);
					for (var i=0;i<entries.length;i++){
						searchresults.appendChild(getResult(entries[i]));
					}
					var scrollfiller=document.createElement('div'); scrollfiller.setAttribute('id','scroll-filler'); scrollfiller.setAttribute('style','height: 0px;');
						var scrollfillermessage=document.createElement('div'); scrollfillermessage.setAttribute('id','scroll-filler-message'); scrollfillermessage.innerHTML="No more items";
						scrollfiller.appendChild(scrollfillermessage);
					searchresults.appendChild(scrollfiller);
					td2.appendChild(searchresults);
					
					var footer=document.createElement('div'); footer.setAttribute('id','chrome-footer-container');
						footer.innerHTML="&nbsp;"
						var btnContainer=document.createElement('div'); btnContainer.className='button-container';
							/*var nextpage = document.createElement("button");
							nextpage.appendChild(document.createTextNode("Next Page"));
							nextpage.className = "searchFeedButton";
							//nestpage.addEventListener("click", onSearchFeed, false);
							btnContainer.appendChild(nextpage);
							*/
						footer.appendChild(btnContainer);
					td2.appendChild(footer);
				tr.appendChild(td2);
				var td3=document.createElement("td"); td3.className="cr"; tr.appendChild(td3);
		viewerBody.appendChild(tr);
			var tr=document.createElement("tr");
				var td1=document.createElement("td"); td1.className="cbl"; tr.appendChild(td1);
				var td2=document.createElement("td"); td2.className="cb";  tr.appendChild(td2);
				var td3=document.createElement("td"); td3.className="cbr"; tr.appendChild(td3);
		viewerBody.appendChild(tr);
		viewer.appendChild(viewerBody);		
		var inside = document.getElementById("viewer-box");//chrome
		//inside.parentNode.removeChild(inside);//.setAttribute("hidden","true");
		inside.parentNode.replaceChild(viewer,inside);
		//debug(details.responseText);
	}

}

function getResult(entry){
	var title=entry.getElementsByTagName("title")[0].firstChild.nodeValue;
	var url=entry.getElementsByTagName("link")[0].getAttribute("href");
	var content=entry.getElementsByTagName("content")[0].firstChild.nodeValue;
	var blogTitle="";
	try{
		blogTitle=entry.getElementsByTagName("author")[0].getElementsByTagName("uri")[0];
		blogTitle=blogTitle.textContent;
	}catch(e){}
	var result=document.createElement("div");
	result.className="entry";
	var table=document.createElement("table");
	table.className="card";
		var tbody=document.createElement("tbody");
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
						var eleTitle=document.createElement("h2");
						eleTitle.className="entry-totle";
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
					main.appendChild(eleTitle);
						var body=document.createElement("div");
						body.className="entry-body";
						body.innerHTML="<P>"+content+"</P>";
					main.appendChild(body);
					container.appendChild(main);
				td22.appendChild(container);
				tr2.appendChild(td22);
				var td32=document.createElement("td"); td32.className="cr"; tr2.appendChild(td32);
		tbody.appendChild(tr2);	
			var tr3=document.createElement("tr");
				var td13=document.createElement("td"); td13.className="cbl"; tr3.appendChild(td13);
				var td23=document.createElement("td"); td23.className="cb";  
					var actions=document.createElement("div"); actions.className="entry-actions";
						var blogSpan=document.createElement("span");
							blogSpan.innerHTML=blogTitle;
							blogSpan.setAttribute('style','padding-left: 20px;');
					actions.appendChild(blogSpan);
				td23.appendChild(actions);
				tr3.appendChild(td23);
				var td33=document.createElement("td"); td33.className="cbr"; tr3.appendChild(td33);
		tbody.appendChild(tr3);
	table.appendChild(tbody);
	result.appendChild(table);
	
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

function debug(msg){
	//GM_log(msg);
}