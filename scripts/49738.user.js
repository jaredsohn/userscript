// ==UserScript==
// @name          Pixiv - Full size and image search
// @namespace     http://userscripts.org/scripts/show/49738
// @include       http://www.pixiv.net/member_illust.php?*mode=*
// @description   Makes Pixiv use the largest image size for medium images and adds image search links
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// @grant         GM_openInTab
// @grant         GM_xmlhttpRequest
// @version       2013.09.08
// ==/UserScript==

var imageSearch = "http://danbooru.iqdb.org/?url=";//Danbooru
//var imageSearch = false;//Nothing
//var imageSearch = "http://iqdb.org/?url=";//Multi-service search


var mode = location.href.replace(/(.*(&|\?)mode=|&.*)/g,'');
var image = null;

if( mode == 'medium' )
{
	var link = document.evaluate("//div/a[contains(@href,'mode=big') or contains(@href,'mode=manga')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if( link )
	{
		//Make link open in same window
		link.removeAttribute('target');
		
		//For non-manga images, force the display of the full size (scaled) and link it to the image search
		if( /mode=big/.test(link.href) )
		{
			image = link.firstChild;
			image.setAttribute("style", "max-width: 740px; height: auto; width: auto;");
			image.src = image.src.replace(/(\/\d+)_m\./,'$1.');
			if( imageSearch )
				link.href = imageSearch + image.src.replace(/(\/[\d]+)\.[^\.]+$/,'/mobile$1_480mw.jpg') + "&fullimage=" + image.src;
			else
				link.removeAttribute('href');
		}
	}
}

else if( mode == 'manga' )
{
	var bigLink = 'http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=' + location.href.replace( /(.*illust_id=|[^\d].*)/g,'' ) + '&page=';
	var images = document.evaluate("//div[contains(@class,'item-container')]/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for( var i = 0; i < images.snapshotLength; i++ )
	{
		var thisImage = images.snapshotItem(i);
		var thisDiv = thisImage.parentNode.appendChild( createElement("div", { style:"font-size:x-large" } ) );
		
		//Force all images to display
		thisImage.src = thisImage.getAttribute("data-src") || thisImage.src;
		
		thisDiv.appendChild( createElement("a", { text: "Big Size", href: bigLink+i }) );
		if( imageSearch )
		{
			thisDiv.appendChild( createElement("text", " - ") );
			thisDiv.appendChild( createElement("a", { text: "Image Search", href: imageSearch+thisImage.src.replace(/(\/[\d]+)(_p[\d]+)\..*/,'/mobile$1_480mw$2.jpg')+'&fullimage='+bigLink+i }) );
		}
	}
}

else if( mode == 'manga_big' || mode == 'big' )
{
	image = document.getElementsByTagName("img")[0];
	if( image )
	{
		document.body.innerHTML = "";
		document.body.appendChild( document.createElement("img") ).src = image.src;
	}
}

//"View image" shortcut with Ctrl+x when viewing single image
if( image )
{
	window.addEventListener("keypress", function(key)
	{
		if( key.ctrlKey && String.fromCharCode(key.charCode) == 'x' )
			location.href = image.src;
	}, true);
}



function createElement(elem, props)
{
	if( elem == "text" && typeof(props) == "string" )
		return document.createTextNode(props);
	if( typeof(elem) == "string" )
		elem = document.createElement(elem);
	if( props )
	{
		for( var key in props )
			if( key == "text" || key == "textContent" )
				elem.textContent = props[key];
			else
				elem.setAttribute(key, props[key]);
	}
	return elem;
}
	
//Check for updates
function updateCheck()
{
	var scriptNum = 49738;
	
	//Only check for update if using Greasemonkey and no check has been made in the last day.
	if( typeof GM_getValue != "undefined" && parseInt( GM_getValue('last_check', 0) ) + 24*3600*1000 < new Date().getTime() ) GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+scriptNum+'.meta.js?'+new Date().getTime(),
		headers: { 'Cache-Control': 'no-cache' },
		onload: function(response)
		{
			GM_setValue( 'last_check', ''+new Date().getTime() );

			var localVersion = parseInt( GM_getValue( 'local_version', 0 ) );
			var remoteVersion = parseInt( /@uso:version\s*([0-9]+?)\s*$/m.exec(response.responseText)[1] );
			
			if( !localVersion || remoteVersion <= localVersion )
				GM_setValue( 'local_version', remoteVersion );
			else if( confirm( 'There is an update available for the Greasemonkey script "'+/@name\s*(.*?)\s*$/m.exec(response.responseText)[1]+'".\nWould you like to go to the install page now?' ) )
			{
				GM_openInTab( 'http://userscripts.org/scripts/show/'+scriptNum );
				GM_setValue( 'local_version', remoteVersion );
				GM_deleteValue( 'day_delay' );
			}
		}
	});
} updateCheck();
