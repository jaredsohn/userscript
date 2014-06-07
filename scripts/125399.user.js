// ==UserScript==
// @name           UPW
// @namespace      
// @include        http://www.pixiv.net/*
// @description    
// @updated        2012-01-26
// ==/UserScript==

//Minimum height remaining to scroll before loading the next page.
var scrollBuffer = 1000;

//Seconds to wait for a response from the next page before attempting to fetch the page again.
var timeToFailure = 30;

//Options to add links below each thumb; set to false to disable
var addIQDB = false;//IQDB image search (Danbooru)
var addSourceSearch = false;//Danbooru post search (looks for matching source)

//Source search options; login info is required
var danbooruLogin = "";//e.g. "UserName"
var danbooruPassHash = "";//e.g. "ab3718d912849aff02482dbadf00d00ab391283a"
var styleSourceFound = "color:green; font-weight: bold;";
var styleSourceMissing = "color:red;";
var sourceTimeout = 20;//seconds to wait before retrying query


//////////////////////////////////////////////////////////////////////////////////////
//////////// Don't mess with the below unless you really know your stuff. ////////////
//////////////////////////////////////////////////////////////////////////////////////


//Stop script if this page is inside an iframe.
if( window != window.top ) return;

//Startup variables.
var pending = false, sourceSearchDone = addSourceSearch, thumbIndex = 0, illustList = {}, artistList = {}, thumbList = [], sourceTimer = -1, firstList = true;

//Fix hidden thumbs and add links if necessary
processThumbs();

//Stop script if there are no thumbnails.
if( (mainTable = getMainTable(document)) == null ) return;
var bottomMarker = mainTable.nextSibling.nextSibling;

//Stop script if there are no more pages.
if( (nextPage = getNextPage(document)) == null ) return;

//iframe to hold new pages
var iframe = document.createElement("iframe");
	iframe.addEventListener("load", pullingMore, false);
	iframe.width = 0;
	iframe.height = 0;
	iframe.style.visibility = "hidden";
	document.body.appendChild(iframe);

//Adjust buffer height
scrollBuffer += window.innerHeight;

//Prevent page from being cut off after ~35 added pages
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#pixiv { overflow:visible; ! important }';
document.getElementsByTagName('head')[0].appendChild(style);

//Clear bottom page list.
getBottomPager(document).innerHTML = "";

//Watch scrolling
window.addEventListener("scroll", testScrollPosition, false);
testScrollPosition();

//====================================== Functions ======================================
function processThumbs()
{
	var thumbSearch = null;
	
	if( firstList )
		thumbSearch = document.evaluate("//li/a[contains(@href,'mode=medium') or contains(@href,'/novel/show.php')]/img[not(@endless)] | //div/a[contains(@href,'mode=medium') or contains(@href,'/novel/show.php')]/img[not(@endless)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if( !thumbSearch || thumbSearch.snapshotLength == 0 )
	{
		firstList = false;
		thumbSearch = document.evaluate("//li[@class='image']/a/p/img[not(@endless)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	for( var i = 0; i < thumbSearch.snapshotLength; i++ )
	{
		var thumbImg = thumbSearch.snapshotItem(i);
		var thumbPage = (firstList ? thumbImg.parentNode : thumbImg.parentNode.parentNode);
		var thumbDiv = thumbPage.parentNode;
		var bookmarkLink = document.evaluate( ".//a[contains(@href,'bookmark_detail.php')]", thumbDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		
		//Mark thumb so it gets skipped when the next page loads.
		thumbImg.setAttribute("endless","done");
		
		//Disable pixiv's "lazy loading" so that the thumbs on the added pages show.  This only seems to come up on /search.php now.
		if( thumbImg.getAttribute("data-src") )
		{
			thumbImg.src = thumbImg.getAttribute("data-src");
			thumbImg.removeAttribute("class");
		}

		if( !bookmarkLink )
		{
			if( thumbDiv.getElementsByTagName("ul").length == 0 )
				thumbDiv.appendChild( document.createElement("br") );
			bookmarkLink = thumbDiv.appendChild( document.createElement("a") );
		}	
		
		if( addIQDB )
		{
			bookmarkLink.setAttribute("class", "bookmark-count");
			bookmarkLink.href = "http://danbooru.iqdb.org/?url="+thumbImg.src+"&fullimage="+thumbPage.href;
			bookmarkLink.innerHTML = "(IQDB)";
		}
		
		if( addSourceSearch )
		{
			thumbList.push({ link: bookmarkLink.parentNode.appendChild( document.createElement("a") ), source: thumbImg.src.replace(/_(s|100)\..*/,'') });
		}
	}
	
	if( sourceSearchDone )
	{
		sourceSearchDone = false;
		sourceSearch();
	}
}

function sourceSearch(attempt)
{
	//thumbList[index] = { link, source }
	//artistList[name] = { fullSearchLen }
	//illustList[illustID] = [] list of post IDs
	
	clearTimeout(sourceTimer);
	
	//Login info is required.
	if( danbooruPassHash.length == 0 || danbooruLogin.length == 0 )
		return;
	
	//If attempt not specified, start at 0.
	if( attempt == undefined )
		attempt = 0;
	
	//Processed all existing thumbs
	if( thumbIndex >= thumbList.length )
	{
		sourceSearchDone = true;
		return;
	}
	
	//If this thumb has already been processed successfully, stop.
	if( thumbList[thumbIndex].link.textContent.length > 0 &&
		!/attempt/.test( thumbList[thumbIndex].link.textContent ) )
			return;
	
	//Keep a count of how many times we've tried to run this search
	thumbList[thumbIndex].link.textContent = " (attempt "+(++attempt)+")";

	sourceTimer = setTimeout( function(){ sourceSearch(); }, sourceTimeout*1000 );
	
	//Function to extract illustID from pixiv URL
	function indexFromURL(url) { return "x"+url.replace(/(.*pixiv.net\/img\/[^\/]+\/|(\.|_).*)/g,''); }
	
	var artistName = thumbList[thumbIndex].source.replace(/(.*\/img\/|\/.*)/g,'');// ...pixiv.net/img/artistName/...
	var wantedIndex = indexFromURL( thumbList[thumbIndex].source );
	var searchURL = thumbList[thumbIndex].source+"*";
		
	if( illustList[wantedIndex] && illustList[wantedIndex].length > 0 )
	{
		if( illustList[wantedIndex].length == 1 )
		{
			//Found one post
			thumbList[thumbIndex].link.textContent = " post #"+illustList[wantedIndex][0];
			thumbList[thumbIndex].link.href = "http://danbooru.donmai.us/post/show/"+illustList[wantedIndex][0];
			thumbList[thumbIndex].link.setAttribute("style",styleSourceFound);
		}
		else
		{
			//Found multiple posts
			thumbList[thumbIndex].link.textContent = " ("+illustList[wantedIndex].length+" sources)";
			thumbList[thumbIndex].link.href = "http://danbooru.donmai.us/post/index?tags=status:any+source:"+searchURL;
			thumbList[thumbIndex].link.setAttribute("style",styleSourceFound);
		}
		thumbIndex++;
		return sourceSearch(0);
	}
	else if( !artistList[artistName] || artistList[artistName].fullSearchLen < 0 )
	{
		//First time searching for this artist; try to find everything by this artist
		searchURL = "*.pixiv.net/img/"+artistName+"/*";
		artistList[artistName] = { fullSearchLen: -1 };
	}		
	else if( artistList[artistName].fullSearchLen < 100 ||
			 ( illustList[wantedIndex] && illustList[wantedIndex].length == 0 ) )
	{
		//Either the full search didn't return the maximum amount or we did a specific search and still didn't find it.
		thumbList[thumbIndex].link.textContent = " (no sources)";
		thumbList[thumbIndex].link.setAttribute("style",styleSourceMissing);
		thumbIndex++;
		return sourceSearch(0);
	}
	
	if( typeof(GM_xmlhttpRequest) != "undefined" ) GM_xmlhttpRequest(
	{
		method: "GET",
		url: 'http://danbooru.donmai.us/post/index.json?limit=100&tags=status:any+source:'+searchURL+"&login="+danbooruLogin+"&password_hash="+danbooruPassHash,
		onload: function(responseDetails)
		{
			if( /^ *$/.test(responseDetails.responseText) )
				return sourceSearch( attempt );//Error, retry
			
			var result;
			
			try { result = JSON.parse(responseDetails.responseText); }
			catch(err) { return sourceSearch( attempt ); /*Error, retry*/ }
						
			//Remember the post IDs associated with each illustID
			for( var i = 0; i < result.length; i++ )
			{
				if( !illustList[indexFromURL(result[i]["source"])] )
					illustList[indexFromURL(result[i]["source"])] = [];
				illustList[indexFromURL(result[i]["source"])].push( result[i]["id"] );
			}
			
			//If we're doing a full search, record total results to compare to 100 later
			if( artistList[artistName].fullSearchLen < 0 )
				artistList[artistName].fullSearchLen = result.length;
			//If we're doing a specific search, note that no posts have that illust ID
			else if( !illustList[wantedIndex] )
				illustList[wantedIndex] = [];
			
			return sourceSearch( attempt );
		},
		onerror: function(x) { sourceSearch( attempt ); },
		onabort: function(x) { sourceSearch( attempt ); }
	});
}

function getMainTable(source)
{
	return new XPathEvaluator().evaluate(".//node()[contains(@class,'linkStyleWorks') or contains(@class,'list_box') or @id='search-result']", source, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getBottomPager(source)
{
	var pager = new XPathEvaluator().evaluate(".//node()[@class='pages' or @class='pager']", source, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	return pager.snapshotItem(pager.snapshotLength-1);
}

function getNextPage(source)
{
	var next = new XPathEvaluator().evaluate(".//node()[@class='pages' or @class='pager']/node()/li/a[@rel='next']", source, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	if( !next )
		return null;//No (more) pages
	else if( next.href.indexOf("http://www.pixiv.net/") < 0 )
		return "http://www.pixiv.net/"+next.href;//relative URL --> absolute URL
	
	return next.href;
}

function testScrollPosition()
{
	if( !pending && window.pageYOffset + scrollBuffer > bottomMarker.offsetTop )
	{
		pending = true;
		timeout = setTimeout(function(){pending=false;testScrollPosition();},timeToFailure*1000);
		iframe.contentDocument.location.replace(nextPage);
	}
}

function pullingMore(responseDetails)
{
	var newTable, nextElem, pageLink = document.createElement("div");
	clearTimeout(timeout);
	
	//Make sure page loaded properly
	if( (newTable = getMainTable(iframe.contentDocument)) == null )
	{
		pending = false;
		return;
	}
	
	//Add page link
	pageLink.setAttribute("style","font-size:large; text-align:left;");
	pageLink.innerHTML = '<hr style="clear: both;"><a href="'+nextPage+'">Page '+nextPage.replace(/.*(\?|&)p=([0-9]+).*/,'$2')+'</a>';
	mainTable.appendChild(pageLink);
	
	//Copy content from retrieved page to current page.
	while( (nextElem = newTable.firstChild) )
		mainTable.appendChild( document.adoptNode(nextElem) );
	
	//Fix hidden thumbs and add links if necessary
	processThumbs();
	
	//If no more pages, append the proper page list and stop the script.
	if( nextPage = getNextPage(iframe.contentDocument) )
	{
		pending = false;
		testScrollPosition();
	}
	else
	{
		testScrollPosition = function() { }
		getBottomPager(document).innerHTML = getBottomPager(iframe.contentDocument).innerHTML;
	}
}

function updateCheck()
{
	var scriptNum = 57567;
	
	//Only check for update if using Greasemonkey and no check has been made in the last day.
	if( typeof(GM_getValue) != "undefined" &&
		GM_getValue('a', 'b') != undefined &&
		parseInt( GM_getValue('last_check', 0) ) + 24*3600*1000 < new Date().getTime() )
	{
		GM_setValue( 'last_check', ''+new Date().getTime() );
		GM_deleteValue( 'day_delay' );
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+scriptNum+'.meta.js?'+new Date().getTime(),
			headers: { 'Cache-Control': 'no-cache' },
			onload: function(response)
			{
				var localVersion = parseInt( GM_getValue( 'local_version', 0 ) );
				var remoteVersion = parseInt( /@uso:version\s*([0-9]+?)\s*$/m.exec(response.responseText)[1] );
				
				if( !localVersion || remoteVersion <= localVersion )
					GM_setValue( 'local_version', remoteVersion );
				else if( confirm( 'There is an update available for the Greasemonkey script "'+/@name\s*(.*?)\s*$/m.exec(response.responseText)[1]+'".\nWould you like to go to the install page now?' ) )
				{
					GM_openInTab( 'http://userscripts.org/scripts/show/'+scriptNum );
					GM_setValue( 'local_version', remoteVersion );
				}
			}
		});
	}
}

//So as I pray, Unlimited Pixiv Works.