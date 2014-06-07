// ==UserScript==
// @name           Endless Pixiv Pages
// @namespace      http://userscripts.org/scripts/show/57567
// @include        http://www.pixiv.net*
// @description    Makes Pixiv searches "bottomless", removes bookmark links, and adds links to Danbooru and the IQDB image search.
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @version        2014.03.02
// ==/UserScript==

//Minimum height remaining to scroll before loading the next page.
var scrollBuffer = 500;

//Seconds to wait for a response from the next page before attempting to fetch the page again.
var timeToFailure = 30;

//Options to add links below each thumb; set to false to disable
var addIQDB = true;//IQDB image search (Danbooru)
var addSourceSearch = false;//Danbooru post search (looks for matching source)

//Default minimum number of favorites for a thumb to be displayed; only affects certain pages.
var minFavs = 0;

//Source search options; login info is required
var danbooruLogin = "";//e.g. "UserName"
var danbooruPassHash = "";//e.g. "ab3718d912849aff02482dbadf00d00ab391283a"
var styleSourceFound = "color:green; font-weight: bold;";
var styleSourceMissing = "color:red;";
var sourceTimeout = 20;//seconds to wait before retrying query
var maxAttempts = 20;//# of times to try a query before completely giving up on source searches

//////////////////////////////////////////////////////////////////////////////////////
//////////// Don't mess with the below unless you really know your stuff. ////////////
//////////////////////////////////////////////////////////////////////////////////////

//Stop script if this page is inside an iframe.
if( window != window.top ) return;

//Remove Amazon ads from mode=medium pages
var ads = document.evaluate("//div/div[@class='ads_amazon_outer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if( ads )
	ads.parentNode.parentNode.removeChild(ads.parentNode);

//Remove Premium-only options
var premium = document.getElementsByClassName("require-premium");
for( var i = premium.length - 1; i >= 0; i-- )
	premium[i].parentNode.removeChild( premium[i] );
setTimeout( function()
{
	var filter = document.getElementById("thumbnail-filter-container");
	if( filter )
		filter.parentNode.removeChild(filter);
}, 300 );
	
if( typeof(GM_getValue) == "undefined" || !GM_getValue('a', 'b') )
{
	GM_getValue = function(name,defV){ var value = localStorage.getItem("endless_pixiv."+name); return( value ? value : defV ); };
	GM_setValue = function(name,value) { localStorage.setItem("endless_pixiv."+name, value ); }
}

if( typeof(custom) != "undefined" )
	custom();

//Source search requires GM_xmlhttpRequest()
addSourceSearch = ( addSourceSearch && typeof(GM_xmlhttpRequest) != "undefined" );

if( typeof(GM_deleteValue) != "undefined" )
	GM_deleteValue("illustCache");
else
	localStorage.removeItem("endless_pixiv.illustCache");

//Startup variables.
var nextPage = null, timeout, pending = false, firstList = true, anyBookmarks = false, sourceTimer;

//Manga images have to be handled specially
if( location.search.indexOf("mode=manga") >= 0 )
{
	if( addSourceSearch )
	{
		var thumbList = [];
		var images = document.evaluate("//div[contains(@class,'item-container')]/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
		for( var i = 0; i < images.snapshotLength; i++ )
		{
			var thisImage = images.snapshotItem(i);
			thumbList.push({ link: thisImage.parentNode.appendChild( document.createElement("div") ).appendChild( document.createElement("a") ),
							 pixiv_id: pixivIllustID( thisImage.getAttribute("data-src") || thisImage.src ), page: i });
		}
		sourceSearch( thumbList );
	}
	return;
}

//Add ability to set minFavs inside Search Options
var addSearch = document.getElementById("word-and");	
if( addSearch )
{
	anyBookmarks = true;
	
	//Load "minFavs" setting
	if( GM_getValue("minFavs") )
		minFavs = parseInt( GM_getValue("minFavs") );
	
	//Set option
	addSearch = addSearch.parentNode.parentNode;
	var favTr = document.createElement("tr");
	favTr.appendChild( document.createElement("th") ).textContent = "Minimum favorites";
	favInput = favTr.appendChild( document.createElement("td") ).appendChild( document.createElement("input") );
	favInput.type = "text";
	favInput.value = ""+minFavs;
	favInput.addEventListener("input", function()
	{
		if( /^ *\d+ *$/.test(this.value) )
		{
			GM_setValue("minFavs", this.value.replace(/ +/g,''));
			minFavs = parseInt( this.value );
		}
	}, true);
	addSearch.parentNode.insertBefore( favTr, addSearch );
}

//Fix thumbs and add links if requested
processThumbs();
if( ( addIQDB || addSourceSearch ) && location.href.indexOf("mode=medium") > 0 )
	processThumbs(null,true);
window.addEventListener( "DOMNodeInserted", function(e) { setTimeout( function() { processThumbs(e) }, 1 ) }, true );

//Prevent page from being cut off after ~35 added pages
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#pixiv { overflow:visible; ! important } ul.images li.image, li.image-item{ height:auto !important; min-height:250px !important; padding:5px 0px !important } ';
document.getElementsByTagName('head')[0].appendChild(style);

//Stop script if there are no thumbnails.
if( (mainTable = getMainTable(document)) == null ) return;
var bottomDoc = getBottomPager(document);
if( bottomDoc == null ) return;
bottomDoc.parentNode.removeChild(bottomDoc);
mainTable.parentNode.parentNode.appendChild(bottomDoc);

//Stop script if there are no more pages.
if( (nextPage = getNextPage(bottomDoc)) == null ) return;

//Hide the showcase on search pages
var showcase = document.getElementsByClassName("user-ad-container")[0];
if( showcase ) showcase.style.display = "none";

//iframe to hold new pages
var iframe = document.createElement("iframe");
	iframe.addEventListener("load", pullingMore, false);
	iframe.width = 0;
	iframe.height = 0;
	iframe.style.visibility = "hidden";
	document.body.appendChild(iframe);

//Adjust buffer height
scrollBuffer += window.innerHeight;

//Watch scrolling
window.addEventListener("scroll", testScrollPosition, false);
testScrollPosition();

//====================================== Functions ======================================

function processThumbs(e,separateQuery)
{
	if( !addIQDB && !addSourceSearch && !minFavs )
		return;
	
	var thumbSearch = null, thumbList = [], thisFirstList = firstList || e || separateQuery;
	
	if( e && e.target.tagName != "LI" && e.target.tagName != "UL" && e.target.tagName != "DIV" )
		return;
	
	if( separateQuery )
	{
		firstList = true;
		thumbSearch = document.evaluate("//div[@class = 'works_display']/a/img[not(@endless)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else
	{
		if( thisFirstList )
			thumbSearch = document.evaluate("descendant-or-self::li/a[contains(@href,'mode=medium') or contains(@href,'/novel/show.php')]/img[not(@endless)] | //div/a[contains(@href,'mode=medium') or contains(@href,'/novel/show.php')]/img[not(@endless)]", (e ? e.target : document), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( !thumbSearch || thumbSearch.snapshotLength == 0 )
		{
			if( !e ) firstList = false;
			thisFirstList = false;
			thumbSearch = document.evaluate("descendant-or-self::li[@class='image']/a/p/img[not(@endless)]", (e ? e.target : document), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
	}
	
	for( var i = 0; i < thumbSearch.snapshotLength; i++ )
	{
		var thumbImg = thumbSearch.snapshotItem(i);
		var thumbPage = (thisFirstList ? thumbImg.parentNode : thumbImg.parentNode.parentNode);
		var thumbDiv = thumbPage.parentNode;
		var bookmarkCount = 0, bookmarkLink = document.evaluate( ".//a[contains(@href,'bookmark_detail.php')]", thumbDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		var sourceContainer = thumbDiv;
		
		//Mark thumb so it gets skipped when the next page loads.
		thumbImg.setAttribute("endless","done");
		
		//Skip generic restricted thumbs
		if( thumbImg.src.indexOf("http://source.pixiv.net/") == 0 )
			continue;
		
		//Skip special thumbs except on image pages
		if( thumbImg.src.indexOf("_100.") > 0 && location.search.indexOf("mode=") < 0 )
			continue;
		
		if( bookmarkLink )
		{
			//Thumb has bookmark info
			bookmarkCount = parseInt( bookmarkLink.getAttribute("data-tooltip","x").replace(/([^\d]+)/g,'') ) || 1;
			sourceContainer = bookmarkLink.parentNode;
		}
		else if( addIQDB )
		{
			//Thumb doesn't have bookmark info.  Add a fake bookmark link to link with the IQDB.
			bookmarkLink = document.createElement("a");
			bookmarkLink.className = "bookmark-count";
			if( anyBookmarks )
			{
				bookmarkLink.className += " ui-tooltip";
				bookmarkLink.setAttribute("data-tooltip", "Received 0 bookmarks");
			}
			
			//Dummy div to force new line when needed
			thumbDiv.appendChild( document.createElement("div") );
			thumbDiv.appendChild( bookmarkLink );
		}
		
		if( anyBookmarks && bookmarkCount < minFavs )
		{
			thumbDiv.parentNode.removeChild(thumbDiv);
			continue;
		}
		
		if( addIQDB )
		{
			bookmarkLink.href = "http://danbooru.iqdb.org/?url="+thumbImg.src+"&fullimage="+thumbPage.href;
			bookmarkLink.innerHTML = "(IQDB)";
		}
		
		if( addSourceSearch )
		{
			sourceContainer.appendChild( document.createTextNode(" ") );
			thumbList.push({ link: sourceContainer.appendChild( document.createElement("a") ), pixiv_id: pixivIllustID(thumbImg.src), page: -1 });
		}
	}
	
	sourceSearch( thumbList );
}

function pixivIllustID(url) { return url.replace( /.*\/(\d+)(_|\.)[^\/]+$/g, '$1' ); }
function pixivPageNumber(url) { return /_p\d+\./.test(url) ? url.replace( /.*_p(\d+)\..*/g, '$1' ) : "" }

function sourceSearch( thumbList, attempt, page )
{
	var retry = (function(a,b,c){ return function(){ sourceSearch(a,b,c); }; })( thumbList, attempt, page );
	
	//Login info is required.
	if( danbooruPassHash.length == 0 || danbooruLogin.length == 0 )
		return;
	
	//thumbList[index] = { link, id, page? }
	
	if( attempt === undefined )
	{
		//First call.  Finish initialization
		attempt = page = 1;
		
		for( var i = 0; i < thumbList.length; i++ )
		{
			thumbList[i].status = thumbList[i].link.parentNode.appendChild( document.createElement("span") );
			thumbList[i].link.textContent = "Searching...";
			thumbList[i].posts = [];
		}
	}
	if( attempt >= maxAttempts )
	{
		//Too many failures (or Downbooru); give up. :(
		for( var i = 0; i < thumbList.length; i++ )
		{
			thumbList[i].link.textContent = "(error)";
			thumbList[i].link.setAttribute("style","color:blue; font-weight: bold;");
		}
		return;
	}
	
	//Is there actually anything to process?
	if( thumbList.length == 0 )
		return;
	
	//Retry this call if timeout
	sourceTimer = setTimeout( retry, sourceTimeout*1000 );
	
	// Combine the IDs from the thumbList into a single search string
	var query = "status:any+pixiv:";
	for( var i = 0; i < thumbList.length; i++ )
	{
		thumbList[i].status.textContent = " ["+attempt+"]";
		query += thumbList[i].pixiv_id+",";
	}
	
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: 'http://danbooru.donmai.us/posts.json?limit=100&tags='+query+'0&login='+danbooruLogin+'&password_hash='+danbooruPassHash+'&page='+page,
		onload: function(responseDetails)
		{
			clearTimeout(sourceTimer);
			
			if( responseDetails.responseText.indexOf("<title>Downbooru</title>") > 0 )
			{
				//Set all links to "error" and stop
				maxAttempts = 0;
				return retry();
			}
			if( /^ *$/.test(responseDetails.responseText) )
				return retry();
			
			var result;
			
			try { result = JSON.parse(responseDetails.responseText); }
			catch(err) { return retry(); }
			
			for( var i = 0; i < thumbList.length; i++ )
			{
				//Collect the IDs of every post with the same pixiv_id/page as the pixiv image
				for( var j = 0; j < result.length; j++ )
					if( thumbList[i].pixiv_id == result[j].pixiv_id && ( thumbList[i].page < 0 || thumbList[i].page == pixivPageNumber( result[j].source ) ) )
						thumbList[i].posts.push( result[j].id );
				
				if( thumbList[i].posts.length == 1 )
				{
					//Found one post
					thumbList[i].link.textContent = "post #"+thumbList[i].posts[0];
					thumbList[i].link.href = "http://danbooru.donmai.us/posts/"+thumbList[i].posts[0];
					thumbList[i].link.setAttribute("style",styleSourceFound);
				}
				else if( thumbList[i].posts.length > 1 )
				{
					//Found multiple posts
					thumbList[i].link.textContent = "("+thumbList[i].posts.length+" sources)";
					thumbList[i].link.href = "http://danbooru.donmai.us/posts?tags=status:any+pixiv:"+thumbList[i].pixiv_id;
					thumbList[i].link.setAttribute("style",styleSourceFound);
				}
			}
			
			if( result.length == 100 )
				sourceSearch( thumbList, attempt + 1, page + 1 );//Max results returned, so fetch the next page
			else for( var i = 0; i < thumbList.length; i++ )
			{
				//No more results will be forthcoming; hide the status counter and set the links for the images without any posts
				thumbList[i].status.style.display = "none";
				if( thumbList[i].posts.length == 0 )
				{
					thumbList[i].link.textContent = "(no sources)";
					thumbList[i].link.setAttribute("style",styleSourceMissing);
				}
			}
		},
		onerror: retry,
		onabort: retry
	});
}

function getMainTable(source)
{
	var result = null, tableFun =
	[	
		//bookmarks: user
		//new_illust
		function(src){ src = src.getElementById("search-result"); return src ? src.getElementsByTagName("ul")[0] : null; }
		,
		//default
		function(src){ src = src.getElementsByClassName("linkStyleWorks")[0]; return src ? src.getElementsByTagName("ul")[0] : null; }
		,
		//search (conflicts with personal bookmarks)
		function(src){ return src.getElementsByClassName("image-items")[0]; }
	];
	
	for( var i = 0; i < tableFun.length; i++ )
	{
		getMainTable = tableFun[i];
		if( (result = getMainTable(source)) != null )
			return result;
	}
	
	return null;
}

function getBottomPager(source)
{
	var result = null, pagerFun =
	[
		//search
		function(src){ src = src.getElementsByClassName("pager-container"); return src.length ? src[src.length - 1].parentNode : null; },
		
		//default
		function(src){ src = src.getElementsByClassName("pages"); return src.length ? src[src.length - 1] : null; }
	];
	
	for( var i = 0; i < pagerFun.length; i++ )
	{
		getBottomPager = pagerFun[i];
		if( (result = getBottomPager(source)) != null )
			return result;
	}
	
	return null;
}

function getNextPage(pager)
{
	var links = pager.getElementsByTagName("a");
	if( links.length == 0 || links[links.length-1].getAttribute("rel") != "next" )
		return null;//No more pages
	else if( links[links.length-1].href.indexOf("http://www.pixiv.net/") < 0 )
		return "http://www.pixiv.net/"+links[links.length-1].href;
	else
		return links[links.length-1].href;
}

function testScrollPosition()
{
	if( !pending && window.pageYOffset + scrollBuffer > bottomDoc.offsetTop )
	{
		pending = true;
		timeout = setTimeout(function(){pending=false;testScrollPosition();},timeToFailure*1000);
		iframe.contentDocument.location.replace(nextPage);
	}
}

function pullingMore(responseDetails)
{
	var bottomPage, newTable, nextElem, pageLink;
	
	if( timeout != undefined )
		clearTimeout(timeout);
	
	//Make sure page loaded properly
	if( (newTable = getMainTable(iframe.contentDocument)) == null )
	{
		pending = false;
		return;
	}
	
	//Add page link
	pageLink = mainTable.parentNode.appendChild( document.createElement("div") );
	pageLink.setAttribute("style","font-size:large; text-align:left; margin-left: 10px");
	pageLink.setAttribute("class","clear");
	pageLink.innerHTML = '<hr style="clear: both;"><a href="'+nextPage+'">Page '+nextPage.replace(/.*(\?|&)p=([0-9]+).*/,'$2')+'</a>';
	
	//Remove the paginator in case it's in mainTable, then refresh the visible bottom paginator.
	bottomPage = getBottomPager(iframe.contentDocument);
	bottomPage.parentNode.removeChild(bottomPage);
	bottomDoc.innerHTML = bottomPage.innerHTML;
	
	mainTable.parentNode.appendChild( document.adoptNode(newTable) );
	
	//Check for the next page, and disable the script if there isn't one.
	if( nextPage = getNextPage(bottomPage) )
	{
		pending = false;
		testScrollPosition();
	}
	else
	{
		pageLink = mainTable.parentNode.appendChild( document.createElement("div") );
		pageLink.setAttribute("class","clear");
		testScrollPosition = function() { }
	}
}

function updateCheck()
{
	var scriptNum = 57567;
	
	//Only check for update if using Greasemonkey and no check has been made in the last day.
	if( typeof(GM_xmlhttpRequest) != "undefined" &&
		parseInt( GM_getValue('last_check', 0) ) + 24*3600*1000 < new Date().getTime() )
	{
		GM_setValue( 'last_check', ''+new Date().getTime() );
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
