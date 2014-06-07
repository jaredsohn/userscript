// ==UserScript==
// @name           One Manga Full Chapter Loader
// @namespace      sillymokona
// @description    This script strips all elements from the page, then creates a navigator that loads entire manga chapters for you.
// @include        http://www.onemanga.com/*/
// @include        http://beta.onemanga.com/*/
// @include        http://www.1000manga.com/*/
// @version        2.3i
// ==/UserScript==

//TODO: hash, faster search

if( window.top == window.self )
{
	var configPrefix = "_omfcl";

	var statusFadeDuration = 1500;
	var navFadeDuration = 500;
	var descriptionFadeDuration = 500;
	var navFadeInInterval;
	var navFadeOutInterval;
	var statusFadeOutInterval;
	var descriptionFadeInInterval;
	var descriptionFadeOutInterval;

	var mangaList;
	
	var userAgent = navigator.userAgent.match( /(chrome|firefox)\/([0-9]+)/i );
	var browser = userAgent[1].toUpperCase();
	var browserVersion = parseInt( userAgent[2] );

	var showMsg = "SHOW";
	var hideMsg = "HIDE";

	var delimiter = "||||";
	var delimiter2 = "#||#";

	var mangaInterval;

	var doChapterSelect = false;
	var loadedBookmarkChapter;

	var manga = window.location.href.split('/')[3];
	var chapter = window.location.href.split('/')[4];
	var page = window.location.href.split('/')[5];

	var body = document.body;
	var head = document.getElementsByTagName( "head" )[0];

	var chapterSelect, bookmarkSelect;
	var navDiv, navDiv2, containerDiv, mangaDiv, chapterDiv, statusDiv, tabSpaceDiv, bookmarkDiv;
	var paddingDiv1, paddingDiv2;
	var toggleShow;
	var statusUl;
	
	var descriptionToggle;
	var descriptionShown = false;

	var loadButtonEnabled = false;

	var dummyResponse;
	var dummyResponse2;
	
	var mangaCombo;
	
	var descriptionDiv, descriptionDiv2;
	
	var imgScale = 1;

	var scrollsHorizontally;
	
	var selectBookmarkedChapter = false;
	var bookmarkedChapter = null;
	
	var url;
	var anchors;
	if( chapter == '' || chapter == null )
	{
		anchors = document.getElementsByClassName( "ch-table" )[0].getElementsByTagName( "a" );
	}
	else
	{
		anchors = document.getElementsByTagName( "a" );
	}
	var maxi = anchors.length;
	if( maxi != 0 )
	{
		for( var i = 0; i < maxi && !url && anchors; i++ )
		{
			var split = anchors[i].href.split("/");
			if( ( manga == anchors[i].href.split("/")[3] && '' != anchors[i].href.split("/")[4] ) || ( manga == split[3] && chapter == split[4] && '' != split[5] ) )
			{
				url = anchors[i].href;
				anchors = null;
			}
		}

		if( !( manga
			&& manga != ''
			&& manga != 'directory'
			&& manga != 'recent'
			&& manga != 'policy'
			&& manga != 'recent'
			&& manga != 'contactus'
			&& manga != 'news'
			&& manga != 'account'
			&& manga != 'mypage'
			&& url
			&& url != '' ) )
		{
		}
		else
		{
			if( page && page != '' )
			{
				dummyResponse = {
					responseText : body.innerHTML
				};
			}
			if( chapter && chapter != '' )
			{
				dummyResponse2 = {
					responseText : body.innerHTML
				};
			}
			descriptionDiv = document.createElement( "div" );
			descriptionDiv2 = document.createElement( "div" );
			var grabDescription = false;
			var grabReadingListLink = null;
			if( ( !chapter || chapter == '' ) && ( !page || page == '' ) )
			{
				var contentSide = null;
				if( document.domain.match( /onemanga/ ) )
				{
					contentSide = document.getElementById( "content-side" );
				}
				else
				{
					contentSide = document.getElementById( "wrapRight" );
				}
				var paragraphs = contentSide.getElementsByTagName( "p" );
				var img = contentSide.getElementsByTagName( "img" );
				img = img && img.length > 0 ? img[0] : null;
				div = document.createElement( "div" );
				descriptionDiv.appendChild( div );
				
				var match = contentSide.innerHTML.match( /OM Rank.+?([0-9]+).+?span>/ );
				if( match.length >= 2 )
				{
					var subdiv = document.createElement( "div" );
					subdiv.innerHTML = "<b>OM Rank:</b> " + match[1];
					div.appendChild( subdiv );
				}
				
				match = contentSide.innerHTML.match( /(Categories:)([, ]+<span.+?\/span>)+/ );
				if( match.length >= 1 )
				{
					subdiv = document.createElement( "div" );
					subdiv.innerHTML = "<b>Categories:</b> " + match[0].replace( /<\/*(span|a).+?>/g, "" ).replace( /Categories: /, "" );
					div.appendChild( subdiv );
				}
				
				var max = paragraphs.length;
				for( var i = 0; i < max; i++ )
				{
					var p = paragraphs[i];
					subdiv = document.createElement( "div" );
					subdiv.innerHTML = p.innerHTML.replace( /<[^>]+>/mg, "" ).replace( /(^[a-zA-Z]+:)/, "<b>$1</b>" );
					div.appendChild( subdiv );
				}
				if( img )
				{
					var imgSrc = img.src;
					img = document.createElement( "img" );
					img.src = imgSrc;
					img.style.margin = "none";
					descriptionDiv.appendChild( img );
				}
				grabReadingListLink = document.body.innerHTML;
			}
			else
			{
				grabDescription = true;
			}

			while( body.childNodes.length > 0 )
			{
				body.removeChild( body.firstChild );
			}
			while( head.childNodes.length > 0 )
			{
				head.removeChild( head.firstChild );
			}
			
			if( grabDescription )
			{
				makeXmlHttpRequest( "http://" + document.domain + "/" + manga + "/", updateDescription );
			}
			if( grabReadingListLink )
			{
				getReadingListCommandLink( grabReadingListLink, div );
				grabReadingListLink = null;
			}

			loadStyler();
			loadNav();

			var listenerRemoval = document.createElement( "script" );
			listenerRemoval.type = "text/javascript";
			listenerRemoval.innerHTML = "document.onkeydown = null;";
			body.appendChild( listenerRemoval );
			body.removeChild( listenerRemoval );

			window.addEventListener( "resize", resizeListener, true );
			if( browser == "CHROME" )
			{
				// CHROME KEY SUPPRESSION HACKS!!!
				window.onkeydown = function( e ){
					keyListener( e );
					if( mangaCombo.hasFocus() && ( e.keyCode == 33 || e.keyCode == 34 ) )
					{
						return false;
					}
				};
				window.onkeypress = function( e ){
					if( mangaCombo.hasFocus() && ( e.keyCode == 33 || e.keyCode == 34 ) )
					{
						return false;
					}
				};
			}
			else
			{
				window.addEventListener( "keydown", keyListener, true );
			}

			if( dummyResponse )
			{
				loadScripts( dummyResponse );
				dummyResponse = null;
			}
			else
			{
				//makeXmlHttpRequest( url, (chapter == '' ? getLists : loadScripts) );
				if( !chapter || chapter == '' )
				{
					makeXmlHttpRequest( url, getLists );
				}
				else
				{
					getLists( dummyResponse2 );
				}
			}
		}
	}
}

function makeXmlHttpRequest( url, callback )
{
	if( browser == "CHROME" )
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if( xhr.readyState == 4 )
			{
				if( xhr.status == 200 )
				{
					callback( xhr );
				}
				else
				{
					alert( "There has been an error with retrieving data from One Manga's site. Please refresh the page to try again." );
				}
			}
		};
		xhr.open( "GET", url, true );
		xhr.send( null );
	}
	else
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: callback,
			onerror: function(response) {
				alert( "There has been an error with retrieving data from One Manga's site. Please refresh the page to try again." );
			}
		});
	}
}

function makeScriptRequest( url, callback )
{
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.addEventListener( "load", function( e ) {
		callback( null );
		head.removeChild( script );
	} );
	script.src = url;
	head.appendChild( script );
}

function keyListener( e )
{
	var isValid = false;
	if( pageSet && pageSet != null )
	{
		switch( e.keyCode )
		{
			case 107:
				zoomIn();
				break;
			case 187:
				zoomIn();
				break;
			case 109:
				zoomOut();
				break;
			case 189:
				zoomOut();
				break;
			case 96:
				zoomReset();
				break;
			case 48:
				zoomReset();
				break;
		}
	}
}

function getSavedValue( key )
{
	if( browser == "CHROME" )
	{
		var id = "cookieQuery" + new Date().getTime();
		var script = document.createElement( "script" );
		var div = document.createElement( "div" );
		div.style.display = "none";
		div.style.visibility = "hidden";
		div.style.height = "1px";
		div.style.width = "1px";
		div.id = id;
		script.innerHTML = "\
			var cookieDiv = document.getElementById( '" + id + "' );\
			match = document.cookie.match( '" + configPrefix + key + "=[^;]+' );\
			if( match ) { cookieDiv.innerHTML = match[0]; }\
		";
		body.appendChild( div );
		body.appendChild( script );
		body.removeChild( script );
		var cookie = div.innerHTML;
		body.removeChild( div );
		if( cookie != "" )
		{
			return unescape( cookie.split( "=" )[1] );
		}
		return "";
	}
	else
	{
		return GM_getValue( key, "" );
	}
}

function setSavedValue( key, value )
{
	if( browser == "CHROME" )
	{
		var cookie = [
			configPrefix + key + "=",
			"expires=Thu, 01-Jan-70 00:00:01 GMT",
		].join( "; " );
		document.cookie = cookie;
		
		cookie = [
			configPrefix + key + "=",
			"expires=Thu, 01-Jan-70 00:00:01 GMT",
			"domain=" + document.domain
		].join( "; " );
		document.cookie = cookie;
		
		cookie = [
			configPrefix + key + "=",
			"expires=Thu, 01-Jan-70 00:00:01 GMT",
			"domain=" + document.domain,
			"path=/"
		].join( "; " );
		document.cookie = cookie;
		
		var date = new Date( 8999, 1, 1 );
		cookie = [
			configPrefix + key + "=" + escape( value ),
			"expires=" + date.toUTCString(),
			"domain=" + document.domain,
			"path=/"
		].join( "; " );
		document.cookie = cookie;
	}
	else
	{
		GM_setValue( key, value );
	}
}

function zoomIn()
{
	imgScale += 0.05;
	zoom();
}

function zoomOut()
{
	imgScale -= 0.05;
	if( imgScale <= 0.05 )
	{
		imgScale = 0.05;
	}
	zoom();
}

function zoomReset()
{
	imgScale = 1;
	zoom();
}

function zoom()
{
	var xOffset = window.pageXOffset;
	var yOffset = window.pageYOffset;
	var oldHeight = containerDiv.offsetHeight;
	
	var images = pageSet.childNodes;
	var max = images.length;
	for( var i = 0; i < max; i++ )
	{
		var image = images[i];
		image.style.width = "auto";
		image.style.width = ( image.width * imgScale ) + "px";
	}
	
	var newHeight = containerDiv.offsetHeight;
	window.scrollTo( xOffset, ( newHeight / oldHeight ) * yOffset );
	adjustNavDiv2();
	updateStatus( Math.round( imgScale * 100 ) + "% Zoom", true );
}

function getLists( response )
{
	checkForMature( response );
	
	var aHref = response.responseText.match( /<a href=.+Begin reading[^<]+<\/a>/igm )[0];
	var url = "http://" + document.domain + aHref.split("\"")[1];

	makeXmlHttpRequest( url, loadScripts );

	updateStatus( "Finding lists..." );
}

function loadScripts( response )
{
	var chapterSource = null;
	if( document.domain.match( /onemanga/ ) )
	{
		chapterSource = response.responseText.match( /http:\/\/(content.s-onemanga|om-content.onemanga).com\/manga-.+\.js/gm )[0];
	}
	else
	{
		chapterSource = response.responseText.match( /http:\/\/www.1000manga.com\/manga-.+\.js/gm )[0];
	}

	if( document.domain.match( /onemanga/ ) )
	{
		mangaSource = "http://content.s-onemanga.com/lookup-items.js";
	}
	else
	{
		mangaSource = "http://www.1000manga.com/lookup-items.js";
	}

	startLoader( mangaSource, chapterSource );
	
	updateStatus( "Lists found!" );
}

function startLoader( mangaSource, chapterSource )
{
	if( browser == "CHROME" )
	{
		makeScriptRequest( chapterSource, loadChapterJs );
		makeScriptRequest( mangaSource, function( response ){
			var replacement = browserVersion > 4 ? "&#92;&#34;" : "&#92;&#92;&#34;";
			var tempDiv = document.createElement( "div" );
			tempDiv.id = "tempDiv";
			tempDiv.style.display = "none";
			tempDiv.style.visibility = "none";
			var script = document.createElement( "script" );
			script.type = "text/javascript";
			script.innerHTML = "var tempDiv = document.getElementById( 'tempDiv' );\n\
			var mangaItems = [];\n\
			for( i = 0; i < lookup_items.length; i++ )\n\
			{\n\
				mangaItems.push( '[\"' + lookup_items[i][0].replace( '\"', '" + replacement + "' ) + '\",\"' + lookup_items[i][1] + '\"]' );\n\
			}\n\
			tempDiv.innerHTML = '[' + mangaItems.join( ',' ) + ']';\n\
			mangaItems = null;";
			body.appendChild( tempDiv );
			head.appendChild( script );
			var evalString = "mangaList = " + tempDiv.innerHTML + ";";
			eval( evalString );
			body.removeChild( tempDiv );
			head.removeChild( script );
			for( var i = 0; i < mangaList.length; i++ )
			{
				var option = document.createElement( "option" );
				option.innerHTML = mangaList[i][0];
				option.value = mangaList[i][1];
				mangaCombo.add( mangaList[i][0], mangaList[i][1] );
			}
			mangaCombo.initialize();
			mangaCombo.selectValueLike( manga );
			mangaCombo.onclick = function() {
				manga = mangaCombo.getSelectedValue();
				loadManga();
			};
		} );
	}
	else
	{
		makeXmlHttpRequest( mangaSource, loadMangaJs );
		makeXmlHttpRequest( chapterSource, loadChapterJs );
	}
	
	var bookmarkValues = getSavedValue( "bookmarkValues" ).split( delimiter2 );
	var bookmarkTexts = getSavedValue( "bookmarkTexts" ).split( delimiter2 );
	var maxi = bookmarkValues.length;
	for( var i = 0; i < maxi; i++ )
	{
		var option = document.createElement( "option" );
		option.innerHTML = bookmarkTexts[i];
		option.value = bookmarkValues[i];
		
		bookmarkSelect.appendChild( option );
	}

	mangaInterval = setInterval( checkMangaScriptLoaded, 100 );
	
	updateStatus( "Getting lists..." );
}

function checkMangaScriptLoaded()
{
	if( mangaCombo.size() > 0 && chapterSelect.options.length > 0 )
	{
		clearInterval( mangaInterval );
		
		if( chapter != '' )
		{
			var maxi = chapterSelect.childNodes.length;
			for( i = 0; i < maxi; i++ )
			{
				if( chapterSelect.options[i].value.split('/')[0] == chapter )
				{
					chapterSelect.selectedIndex = i;
					loadChapter();
					break;
				}
			}
		}
		updateStatus( "Both lists loaded!", true );
	}
}

function loadMangaJs( response )
{
	if( browser != "CHROME" )
	{
		var script = new String( response.responseText );
		var manga_js = script.replace( /\n/gm, "" ).match( /\[.+?\];/ );
		eval( "mangaList = " + manga_js );
		
		for( var i = 0; i < mangaList.length; i++ )
		{
			var option = document.createElement( "option" );
			option.value = mangaList[i][1];
			option.text = mangaList[i][0];
			
			mangaCombo.add( option.text, option.value );
		}
		mangaCombo.initialize();
		mangaCombo.selectValueLike( manga );
		mangaCombo.onclick = function() {
			manga = mangaCombo.getSelectedValue();
			loadManga();
		};
	}
	
	updateStatus( "Manga list loaded!" );
}

function loadChapterJs( response )
{
	if( browser != "CHROME" )
	{
		var script = response.responseText.replace( /(\n|\r)/gm, '' );

		var chapter_js = script.match( /new Array[(][^)]+[)];/ );
		eval( "var chapterlisting = " + chapter_js );
		
		for( var i = 0; i < chapterlisting.length; i++ )
		{
			var option = document.createElement( "option" );
			option.value = chapterlisting[i][1];
			option.text = chapterlisting[i][0];
		
			chapterSelect.add( option, null );
		}
	}
	else
	{
		chapterSelect.onchange = null;
	}
	
	loadButtonEnabled = true;

	mangaCombo.enable();
	chapterSelect.disabled = false;
	bookmarkSelect.disabled = false;
	
	if( doChapterSelect )
	{
		doChapterSelect = false;
		selectLoadedBookmarkedChapter();
	}

	if( selectBookmarkedChapter )
	{
		for( var i = 0; i < chapterSelect.options.length; i++ )
		{
			if( bookmarkedChapter == chapterSelect.options[i].value )
			{
				chapterSelect.selectedIndex = i;
				break;
			}
		}
		selectBookmarkedChapter = false;
	}
	
	//window.location = document.URL + "#manga=" + manga.replace( /\//g, "" ) + "&chapter=" + chapter.replace( /\/.*$/g, "" );
	
	updateStatus( "Chapters loaded!", true );
}

function selectLoadedBookmarkedChapter()
{
	var maxi = chapterSelect.options.length;
	for( var i = 0; i < maxi; i++ )
	{
		if( chapterSelect.options[i].value == loadedBookmarkChapter )
		{
			chapterSelect.options.selectedIndex = i;
			break;
		}
	}
}

function toggleNavVisibility()
{
	if( navDiv.style.display == 'none' )
	{
		toggleShow.innerHTML = hideMsg;
		fadeNavIn();
	}
	else
	{
		toggleShow.innerHTML = showMsg;
		fadeNavOut();
	}
}

function resizeListener( e )
{
	navDiv.style.width = window.innerWidth + "px";
	navDiv2.style.width = window.innerWidth + "px";
	adjustNavDiv2();
	//navDiv2.style.top = (window.innerHeight - 28) + "px";
	statusDiv.style.top = ( window.innerHeight / 2 ) + "px";
	statusDiv.style.left = ( window.innerWidth / 2 - 62.5 ) + "px";
	
	/*if( navDiv.style.display == 'none' )
	{
		paddingDiv1.style.display = "block";
		paddingDiv2.style.display = "block";
	}
	else
	{
		paddingDiv1.style.display = "none";
		paddingDiv2.style.display = "none";
	}*/
	descriptionDiv.style.top = (window.innerHeight * 0.5 - descriptionDiv.offsetHeight * 0.5) + "px";
	descriptionDiv.style.left = (window.innerWidth * 0.5 - descriptionDiv.offsetWidth * 0.5) + "px";
}

function updateStatus( message, fade )
{
	if( statusDiv )
	{
		statusDiv.style.display = "block";
		statusDiv.style.opacity = 1;
		statusDiv.firstChild.innerHTML = message;
		if( fade )
		{
			fadeStatus();
		}
		else
		{
			try
			{
				clearInterval( statusFadeOutInterval );
			} catch( e ){ }
		}
	}
}

function fadeStatus()
{
	var lastIter = Date.now();
	var elapsedTime = 0;
	try
	{
		clearInterval( statusFadeOutInterval );
	} catch( e ){ }
	statusFadeOutInterval = setInterval( function(){
		var thisIter = Date.now();
		elapsedTime += thisIter - lastIter;
		lastIter = thisIter;
		statusDiv.style.opacity = 1 - elapsedTime / statusFadeDuration;
		if( elapsedTime >= statusFadeDuration )
		{
			statusDiv.style.display = "none";
			try
			{
				clearInterval( statusFadeOutInterval );
			} catch( e ){ }
		}
	}, 0 );
}

function fadeNavOut()
{
	try
	{
		clearInterval( fadeNavInInterval );
	}
	catch( e ) { }
	var lastIter = Date.now();
	var elapsedTime = 0;
	var fadeNavOutInterval = setInterval( function(){
		var thisIter = Date.now();
		elapsedTime += thisIter - lastIter;
		lastIter = thisIter;
		var opacity = 1 - elapsedTime / navFadeDuration;
		navDiv.style.opacity = opacity;
		navDiv2.style.opacity = opacity;
		if( elapsedTime >= navFadeDuration )
		{
			navDiv.style.display = "none";
			navDiv2.style.display = "none";
			clearInterval( fadeNavOutInterval );
		}
	}, 0 );
}

function fadeNavIn()
{
	try
	{
		clearInterval( fadeNavOutInterval );
	}
	catch( e ) { }
	var lastIter = Date.now();
	var elapsedTime = 0;
	navDiv.style.display = "block";
	navDiv2.style.display = "block";
	var fadeNavInInterval = setInterval( function(){
		var thisIter = Date.now();
		elapsedTime += thisIter - lastIter;
		lastIter = thisIter;
		var opacity = elapsedTime / navFadeDuration;
		navDiv.style.opacity = opacity;
		navDiv2.style.opacity = opacity;
		if( elapsedTime >= navFadeDuration )
		{
			navDiv.style.opacity = 1;
			navDiv2.style.opacity = 1;
			clearInterval( fadeNavInInterval );
		}
	}, 0 );
}

function getManga( response )
{
	var text = new String( response.responseText );
	var pattern = new RegExp( '<td class="ch-subject"><a href=".+">.+</a></td>' );
	var result = new String( pattern.exec( text ) );
	var url = 'http://' + document.domain + result.split("\"")[3];

	makeXmlHttpRequest( url, getMangaChapters );
	
	updateStatus( "Locating chapters..." );
	
	updateDescription( response )
}

function updateSubDescription( text )
{
	if( text.match( /This series is read from right to left/ ) )
	{
		descriptionDiv2.innerHTML = "";//"<font size='5'>&larr;</font> &nbsp; This series is read from right to left &nbsp; <font size='5'>&larr;</font>";
	}
	else if( text.match( /This series is read from left to right/ ) )
	{
		descriptionDiv2.innerHTML = "<font size='5'>&rarr;</font> &nbsp; This series is read from left to right &nbsp; <font size='5'>&rarr;</font>";
	}
}

function updateDescription( response )
{
	var description = new String( response.responseText ).replace( /\n/gm, "" ).match( /<div[^>]+id[^>]+(content-side|wrapRight).+<div[^>]+id[^>]+footer[^>]+>/gm )[0];
	var paragraphs = description.match( /<p>.+?<\/p>/gm );
	var img = description.match( /<img[^>]+>/gm );
	img = img && img.length > 0 ? img[0] : null;
	while( descriptionDiv.hasChildNodes() )
	{
		descriptionDiv.removeChild( descriptionDiv.firstChild );
	}
	
	var div = document.createElement( "div" );
	var match = description.match( /OM Rank.+?([0-9]+).+?span>/ );
	if( match && match.length >= 2 )
	{
		var paragraph = document.createElement( "div" );
		paragraph.innerHTML = "<b>OM Rank:</b> " + match[1];
		div.appendChild( paragraph );
	}
	match = description.match( /(Categories:)([, ]+<span.+?\/span>)+/ );
	if( match && match.length >= 1 )
	{
		paragraph = document.createElement( "div" );
		paragraph.innerHTML = "<b>Categories:</b> " + match[0].replace( /<\/*(span|a).+?>/g, "" ).replace( /Categories: /, "" );
		div.appendChild( paragraph );
	}
	
	var max = paragraphs.length;
	for( var i = 0; i < max; i++ )
	{
		paragraph = document.createElement( "div" );
		paragraph.innerHTML = paragraphs[i].replace( /<[^>]+>/gm, "" ).replace( /(^[a-zA-Z]+:)/, "<b>$1</b>" );
		div.appendChild( paragraph );
	}
	
	descriptionDiv.appendChild( div );
	if( img )
	{
		var imgSrc = img.split( "\"" )[1];
		img = document.createElement( "img" );
		img.src = imgSrc;
		img.style.margin = "none";
		img.addEventListener( "load", function resizeDescription( e ){
			descriptionDiv.style.width = (350 + img.offsetWidth) + "px";
			descriptionDiv.style.top = (window.innerHeight * 0.5 - descriptionDiv.offsetHeight * 0.5) + "px";
			descriptionDiv.style.left = (window.innerWidth * 0.5 - descriptionDiv.offsetWidth * 0.5) + "px";
			img.removeEventListener( "load", resizeDescription, true );
		}, true );
		descriptionDiv.appendChild( img );
	}
	else
	{
		descriptionDiv.style.width = "350px";
		descriptionDiv.style.top = (window.innerHeight * 0.5 - descriptionDiv.offsetHeight * 0.5) + "px";
		descriptionDiv.style.left = (window.innerWidth * 0.5 - descriptionDiv.offsetWidth * 0.5) + "px";
	}
	getReadingListCommandLink( response.responseText, div );
}

function getReadingListCommandLink( text, target )
{
	var readingListLink = new String( text ).replace( /\n/gm, "" ).match( /http:\/\/(beta|www).onemanga.com\/account\/js\/series-reading\/[0-9]+\/\?container=id_logo/gm );
	if( readingListLink )
	{
		makeXmlHttpRequest( readingListLink[0], function( response ) {
			var linkString = response.responseText.match( /link.href.+/gm );
			if( linkString )
			{
				linkString = linkString[0].split( " = " );
				if( linkString.length > 1 )
				{
					var link = document.createElement( "a" );
					var href = eval( linkString[1] );
					link.innerHTML = response.responseText.match( /link.innerHTML.+/gm )[0].split( '"' )[1];
					link.addEventListener( "click", function(){
						window.location = href;
					}, true );
					var anotherDiv = document.createElement( "div" );
					anotherDiv.appendChild( link );
					target.appendChild( anotherDiv );
				}
			}
		} );
	}
}

function checkForMature( response )
{
	if( document.domain.match( /onemanga/ ) )
	{
		var readAt1000 = response.responseText.match( /<a href=.+read this series at 1000manga.com[^<]*<\/a>/i );
		if( readAt1000 )
		{
			window.location = readAt1000[0].split('"')[1];
		}
	}
}

function getMangaChapters( response )
{
	checkForMature( response );
	var pattern = new RegExp( /<a href=.+Begin reading[^<]+<\/a>/i );
	var aHref = new String( pattern.exec( response.responseText ) );
	var url = "http://" + document.domain + aHref.split("\"")[1];

	makeXmlHttpRequest( url, getChapterScript );

	updateStatus( "Chapters found! Loading..." );
}

function getChapterScript( response )
{
	var pattern = null;
	if( document.domain.match( /onemanga/ ) )
	{
		pattern = new RegExp( '<script type="text/javascript" src="http://(content.s-onemanga|om-content.onemanga).com/manga.+</script>' );
	}
	else
	{
		pattern = new RegExp( '<script type="text/javascript" src="http://www.1000manga.com/manga.+</script>' );
	}
	var chapterSource = new String( pattern.exec( response.responseText ) ).split('"')[3];

	if( pattern.exec( response.responseText ) == null )
	{
		if( document.domain.match( /onemanga/ ) )
		{
			chapterSource = response.responseText.match( /http:\/\/(content.s-onemanga|om-content.onemanga).com\/manga-.+\.js/gm )[0];
		}
		else
		{
			chapterSource = response.responseText.match( /http:\/\/www.1000manga.com\/manga-.+\.js/gm )[0];
		}
	}

	maxi = chapterSelect.childNodes.length;
	for( i = maxi - 1; i >= 0; i-- )
	{
		chapterSelect.removeChild( chapterSelect.childNodes[i] );
	}

	if( browser == "CHROME" )
	{
		makeScriptRequest( chapterSource, loadChapterJs );
	}
	else
	{
		makeXmlHttpRequest( chapterSource, loadChapterJs );
	}

	updateStatus( "Loading chapters..." );
}

function getPages( response )
{
	imgScale = 1;

	div = document.createElement( "div" );
	div.innerHTML = response.responseText;
	text = div.innerHTML;
	var pattern = new RegExp( '<img.+src="http://((media|img-[a-z]).+onemanga|img.1000manga).com/mangas/[^"]+".+>' );
	var match = pattern.exec( text );
	div.innerHTML = match;
	imageSrc = div.childNodes[0].src.split('/');
	imageMime = imageSrc.pop().split(".")[1];
	imageSrc = imageSrc.join("/");

	var pageSelect = text.replace( /\n/gm, "" ).match( /<select[^>]*id[^>]*=[^>]*id_page_select[^>]*>.+<\/select>/g )[0];
	var matches = pageSelect.match( /<option[^<]*<\/option>/gm );

	var now = new Date().getTime();
	pageSet = document.createElement( "div" );
	pageSet.id = "pageSet" + now;
	
	pageSet.appendChild( descriptionDiv2 );

	maxi = matches.length;
	var imgCount = 0;
	var firstPage = null;
	var lastPage = null;
	for( i = 0; i < maxi; i++ )
	{
		item = matches[i].split("\"")[1];
		if( item != '' )
		{
			var img = document.createElement( "img" );
			img.alt = "Page " + ( i + 1 ) + " of " + manga + " is still loading.";
			img.src = imageSrc + '/' + item + '.' + imageMime;
			img.addEventListener( "load", function imgLoad( e ) {
				adjustNavDiv2();
				if( --imgCount == 0 )
				{
				}
				img.removeEventListener( "load", imgLoad, true );
			}, true );
			imgCount++;
			pageSet.appendChild( img );
			
			if( firstPage == null && !isNaN( parseInt( item ) ) )
			{
				firstPage = item;
			}
			else if( !isNaN( parseInt( item ) ) )
			{
				lastPage = item;
			}
		}
	}
	while( containerDiv.childNodes.length > 0 )
	{
		containerDiv.removeChild( containerDiv.firstChild );
	}
	//containerDiv.appendChild( paddingDiv1 );
	containerDiv.appendChild( pageSet );
	//containerDiv.appendChild( paddingDiv2 );
	
	updateSubDescription( response.responseText );
	
	loadButtonEnabled = true;
	
	var readTrack = response.responseText.match( /http:\/\/(www|beta).onemanga.com\/account\/js\/[0-9]+\/[0-9.]+\/read-track.js\?path=/m );
	if( readTrack && readTrack.length > 0 )
	{
		readTrack = readTrack[0];
		var readTrackSplit = readTrack.split( "/" );
		var chapterIndex = readTrackSplit[6];
		chapterIndex = ( parseInt( chapterIndex.split( "." )[0] ) + 1 ) + "." + chapterIndex.split( "." )[1];
		var mangaIndex = readTrackSplit[5];
		readTrack = "http://" + document.domain + "/account/js/" + mangaIndex + "/" + chapterIndex + "/read-track.js?path=";
		var trackFirst = readTrack + encodeURIComponent( manga + chapter.split("/")[0] + "/" + firstPage + "/" ) + "&" + new Date().getTime().toString();
		makeXmlHttpRequest( trackFirst, function( response ){
			var trackLast = readTrack + encodeURIComponent( manga + chapter.split("/")[0] + "/" + lastPage + "/" ) + "&" + new Date().getTime().toString();
			makeXmlHttpRequest( trackLast, function( response ){  } );
		} );
	}
	
	updateStatus( "Pages loaded!", true );
}

function loadManga()
{
	mangaCombo.disable();
	chapterSelect.disabled = true;
	
	var url = "http://" + document.domain + manga;

	makeXmlHttpRequest( url, getManga );
	
	updateStatus( "Loading manga..." );
}

function loadNextChapter()
{
	if( chapterSelect.options.selectedIndex > 0 )
	{
		chapterSelect.options.selectedIndex--;
		loadChapter();
	}
	else
	{
		alert( "You are already viewing the latest chapter for this manga." );
	}
}

function loadPreviousChapter()
{
	if( chapterSelect.options.selectedIndex < chapterSelect.options.length - 1 )
	{
		chapterSelect.options.selectedIndex++;
		loadChapter();
	}
	else
	{
		alert( "You are already viewing the oldest chapter for this manga." );
	}
}

function loadChapter()
{
	if( mangaCombo.isDisabled() || chapterSelect.disabled || ! loadButtonEnabled )
	{
		alert( 'Wait a bit, then try again.' );
		return;
	}

	loadButtonEnabled = false;

	chapter = chapterSelect.options[ chapterSelect.selectedIndex ].value;
	manga = mangaCombo.getSelectedValue();
	
	var url = "http://" + document.domain + manga + chapter + '/';
	makeXmlHttpRequest( url, getPages );
		
	updateStatus( "Loading chapter..." );
}

function adjustNavDiv2()
{
	window.scrollBy( 1, 0 );
	var horizontallyScrollable = window.scrollX > 0;
	if( horizontallyScrollable )
	{
		window.scrollBy( -1, 0 );
		navDiv2.style.top = (window.innerHeight - 43) + "px";
	}
	else
	{
		navDiv2.style.top = (window.innerHeight - 28) + "px";
	}
}

function saveBookmarks()
{
	var bookmarkValues = new Array();
	var bookmarkTexts = new Array();
	var maxi = bookmarkSelect.options.length;
	for( var i = 0; i < maxi; i++ )
	{
		bookmarkTexts[i] = bookmarkSelect.options[i].innerHTML;
		bookmarkValues[i] = bookmarkSelect.options[i].value;
	}
	
	setSavedValue( "bookmarkValues", bookmarkValues.join( delimiter2 ) );
	setSavedValue( "bookmarkTexts", bookmarkTexts.join( delimiter2 ) );
}

function addBookmark()
{
	if( bookmarkSelect.disabled )
	{
		alert( "Please wait until the manga and chapter listings have been loaded completely." );
		return;
	}
	var option = document.createElement( "option" );
	var selectedChapter = chapterSelect.options[chapterSelect.options.selectedIndex];
	option.value = mangaCombo.getSelectedValue() + delimiter + selectedChapter.value;
	option.innerHTML = mangaCombo.getSelectedText() + " " + selectedChapter.innerHTML;
	bookmarkSelect.appendChild( option );
	bookmarkSelect.selectedIndex = bookmarkSelect.options.length - 1;
	
	saveBookmarks();
}

function removeBookmark()
{
	if( bookmarkSelect.options.length <= 0 )
	{
		alert( "There are no bookmarks to remove." );
		return;
	}
	bookmarkSelect.removeChild( bookmarkSelect.options[bookmarkSelect.options.selectedIndex] );
	saveBookmarks();
}

function loadBookmark()
{
	if( mangaCombo.isDisabled() || chapterSelect.disabled || ! loadButtonEnabled )
	{
		alert( 'Wait a bit, then try again.' );
		return;
	}
	else if( bookmarkSelect.options.length <= 0 )
	{
		alert( "There are no bookmarks to load." );
		return;
	}
	var bookmark = bookmarkSelect.options[bookmarkSelect.options.selectedIndex];
	var m = bookmark.value.split( delimiter )[0];
	var c = bookmark.value.split( delimiter )[1];
	var url = "http://" + document.domain + m + c + '/';
	makeXmlHttpRequest( url, function( response ){
		getPages( response );
		selectBookmarkedChapter = true;
		bookmarkedChapter = c;
		mangaCombo.selectValueLike( m );
		mangaCombo.triggerSelection();
	} );
	
	updateStatus( "Loading bookmark..." );
}

function showDescription()
{
	if( descriptionShown )
	{
		return;
	}
	descriptionShown = true;
	descriptionDiv.style.display = "block";
	descriptionToggle.style.background = "#CC0033";
	descriptionDiv.style.width = (350 + (descriptionDiv.childNodes.length > 1 ? descriptionDiv.childNodes[1].offsetWidth : 0)) + "px";
	descriptionDiv.style.top = (window.innerHeight * 0.5 - descriptionDiv.offsetHeight * 0.5) + "px";
	descriptionDiv.style.left = (window.innerWidth * 0.5 - descriptionDiv.offsetWidth * 0.5) + "px";
	descriptionDiv.style.opacity = 0;
	try
	{
		clearInterval( descriptionFadeInInterval );
	} catch( e ){ }
	try
	{
		clearInterval( descriptionFadeOutInterval );
	} catch( e ){ }
	var fadeTimeElapsed = 0;
	var lastIteration = Date.now();
	descriptionFadeInInterval = setInterval( function(){
		var thisIteration = Date.now();
		var frameTime = thisIteration - lastIteration;
		lastIteration = thisIteration;
		fadeTimeElapsed += frameTime;
		descriptionDiv.style.opacity = fadeTimeElapsed / descriptionFadeDuration;
		if( fadeTimeElapsed >= descriptionFadeDuration )
		{
			descriptionDiv.style.opacity = 1;
			clearInterval( descriptionFadeInInterval );
		}
	}, 0 );
}

function hideDescription()
{
	if( !descriptionShown )
	{
		return;
	}
	descriptionShown = false;
	descriptionDiv.style.display = "block";
	descriptionToggle.style.background = "";
	descriptionDiv.style.opacity = 1;
	try
	{
		clearInterval( descriptionFadeInInterval );
	} catch( e ){ }
	try
	{
		clearInterval( descriptionFadeOutInterval );
	} catch( e ){ }
	var fadeTimeElapsed = 0;
	var lastIteration = Date.now();
	descriptionFadeOutInterval = setInterval( function(){
		var thisIteration = Date.now();
		var frameTime = thisIteration - lastIteration;
		lastIteration = thisIteration;
		fadeTimeElapsed += frameTime;
		descriptionDiv.style.opacity = 1 - fadeTimeElapsed / descriptionFadeDuration;
		if( fadeTimeElapsed >= descriptionFadeDuration )
		{
			descriptionDiv.style.display = "none";
			clearInterval( descriptionFadeOutInterval );
		}
	}, 0 );
}

function loadNav()
{
	navDiv = document.createElement( "div" );
	navDiv.id = "navDiv";
	
	navDiv2 = document.createElement( "div" );
	navDiv2.id = "navDiv2";
	
	containerDiv = document.createElement( "div" );
	containerDiv.id = "containerDiv";
	
	toggleShow = document.createElement( "a" );
	toggleShow.innerHTML = hideMsg;
	toggleShow.id = "toggle";
	toggleShow.addEventListener( "click", toggleNavVisibility, true );
	
	statusDiv = document.createElement( "div" );
	statusDiv.id = "statusDiv";
	span = document.createElement( "span" );
	statusDiv.appendChild( span );
	
	body.appendChild( toggleShow );
	body.appendChild( navDiv );
	body.appendChild( containerDiv );
	body.appendChild( navDiv2 );
	body.appendChild( statusDiv );
	body.appendChild( descriptionDiv );
	
	descriptionDiv.id = "descriptionDiv";
	descriptionDiv.style.width = (350 + (descriptionDiv.childNodes.length > 1 ? descriptionDiv.childNodes[1].offsetWidth : 0)) + "px";
	descriptionDiv.style.top = (window.innerHeight * 0.5 - descriptionDiv.offsetHeight * 0.5) + "px";
	descriptionDiv.style.left = (window.innerWidth * 0.5 - descriptionDiv.offsetWidth * 0.5) + "px";
	descriptionDiv.style.display = "none";
	descriptionDiv.addEventListener( "click", hideDescription, true );
	
	descriptionDiv2.id = "descriptionDiv2";
	
	chapterSelect = document.createElement( "select" );
	chapterSelect.id = "id_chapter_1";
	chapterSelect.disabled = true;
	bookmarkSelect = document.createElement( "select" );
	bookmarkSelect.id = "bookmarkSelect";
	bookmarkSelect.disabled = true;
	
	bookmarkDiv = document.createElement( "div" );
	bookmarkDiv.id = "bookmarkDiv";
	bookmarkSpan = document.createElement( "span" );
	bookmarkSpan.innerHTML = "Bookmarks :";
	bookmarkLoad = document.createElement( "a" );
	bookmarkLoad.id = "bookmarkLoad";
	bookmarkLoad.innerHTML = "LOAD";
	bookmarkLoad.addEventListener( "click", loadBookmark, true );
	bookmarkAdd = document.createElement( "a" );
	bookmarkAdd.id = "bookmarkAdd";
	bookmarkAdd.innerHTML = "ADD";
	bookmarkAdd.addEventListener( "click", addBookmark, true );
	bookmarkRemove = document.createElement( "a" );
	bookmarkRemove.id = "bookmarkRemove";
	bookmarkRemove.innerHTML = "REMOVE";
	bookmarkRemove.addEventListener( "click", removeBookmark, true );
	bookmarkDiv.appendChild( bookmarkSpan );
	bookmarkDiv.appendChild( bookmarkSelect );
	bookmarkDiv.appendChild( bookmarkLoad );
	bookmarkDiv.appendChild( bookmarkAdd );
	bookmarkDiv.appendChild( bookmarkRemove );
	
	mangaDiv = document.createElement( "div" );
	mangaDiv.id = "mangaDiv";
	span = document.createElement( "span" );
	span.innerHTML = "Manga :";
	mangaDiv.appendChild( span );
	mangaCombo = new Combo( mangaDiv );
	mangaCombo.onclick = loadManga;
	mangaCombo.disable();
	descriptionToggle = document.createElement( "a" );
	descriptionToggle.id = "descriptionToggle";
	descriptionToggle.innerHTML = "?";
	descriptionToggle.style.cssFloat = "left";
	descriptionToggle.style.height = "12px";
	descriptionToggle.addEventListener( "click", function(){
		if( !descriptionShown )
		{
			showDescription();
		}
		else
		{
			hideDescription();
		}
	}, true );
	mangaDiv.appendChild( descriptionToggle );
	/*mangaRandom = document.createElement( "a" );
	mangaRandom.innerHTML = "?!";
	mangaRandom.title = "Pick a random manga!";
	mangaDiv.appendChild( mangaRandom );*/
	
	chapterDiv = document.createElement( "div" );
	chapterDiv.id = "chapterDiv";
	span = document.createElement( "span" );
	span.innerHTML = "Chapter :";
	chapterLoad = document.createElement( "a" );
	chapterLoad.innerHTML = "LOAD";
	chapterLoad.id = "chapterLoad";
	chapterLoad.addEventListener( "click", loadChapter, true );
	chapterNext = document.createElement( "a" );
	chapterNext.innerHTML = "NEXT";
	chapterNext.id = "chapterNext";
	chapterNext.addEventListener( "click", loadNextChapter, true );
	chapterPrev = document.createElement( "a" );
	chapterPrev.innerHTML = "PREV";
	chapterPrev.id = "chapterPrev";
	chapterPrev.addEventListener( "click", loadPreviousChapter, true );
	chapterDiv.appendChild( span );
	chapterDiv.appendChild( chapterSelect );
	chapterDiv.appendChild( chapterLoad );
	chapterDiv.appendChild( chapterNext );
	chapterDiv.appendChild( chapterPrev );

	var subnavDiv = document.createElement( "div" );
	subnavDiv.id = "subnavDiv";
	subnavDiv.appendChild( chapterDiv );
	subnavDiv.appendChild( mangaDiv );
	navDiv.appendChild( subnavDiv );

	navDiv2.appendChild( bookmarkDiv );
	
	paddingDiv1 = document.createElement( "div" );
	paddingDiv2 = document.createElement( "div" );
	paddingDiv1.innerHTML = "&nbsp;";
	paddingDiv2.innerHTML = "&nbsp;";
	paddingDiv1.style.height = "10px";
	paddingDiv2.style.height = "10px";
	
	updateStatus( "Navbar loaded! Please wait..." );
}

function loadStyler()
{
	var rules = [
		"body {\
			background-color: #000000;\
			color: #FFFFFF;\
			font-family: verdana,sans-serif;\
			font-weight: bold;\
			font-size: 11px;\
			line-height: 1.5em;\
		}",
		"select {\
			width: 120px;\
			margin: 2px 1px;\
			border: thin solid #FFFFFF;\
		}",
		"span {\
			width: 50px;\
			padding: 2px 2px;\
			margin: 2px 2px;\
			cursor: default;\
		}",
		"a {\
			padding: 3px 10px;\
			border: thin solid #FFFFFF;\
			margin: 2px 2px;\
		}",
		"a:hover {\
			background: #CC0033 none repeat scroll 0 0;\
			cursor: pointer;\
		}",
		"a#chapterNext {\
			-moz-border-radius-topleft: 12px;\
			-webkit-border-top-left-radius: 12px;\
		}",
		"a#chapterPrev {\
			-moz-border-radius-bottomright: 12px;\
			-webkit-border-bottom-right-radius: 12px;\
		}",
		"a#bookmarkAdd {\
			-moz-border-radius-topleft: 12px;\
			-webkit-border-top-left-radius: 12px;\
			-moz-border-radius-bottomleft: 12px;\
			-webkit-border-bottom-left-radius: 12px;\
		}",
		"a#bookmarkRemove {\
			-moz-border-radius-topright: 12px;\
			-webkit-border-top-right-radius: 12px;\
			-moz-border-radius-bottomright: 12px;\
			-webkit-border-bottom-right-radius: 12px;\
		}",
		"a#toggle {\
			position: fixed;\
			margin: 3px;\
			top: 0;\
			background: black;\
			z-index: 1;\
		}",
		"a:hover#toggle {\
			background: #CC0033;\
		}",
		"img {\
			display: block;\
			margin: 20px auto;\
		} ",
		"div#mangaDiv, div#chapterDiv, div#statusDiv, div#tabControlDiv {\
			padding: 2px 2px 2px 2px;\
			float: right;\
		}",
		"div#mangaDiv {\
			width: 216px;\
		}",
		"div#mangaDiv span {\
			float: left;\
		}",
		"div#chapterDiv {\
			width: 370px;\
		}",
		"div#bookmarkDiv {\
			text-align: center;\
			display: table;\
			padding-top: 2px;\
			margin-left: auto;\
			margin-right: auto;\
		}",
		"div#statusDiv {\
			width: 125px;\
			text-align: center;\
			padding: 15px;\
			background: black;\
			position: fixed;\
			top: " + ( window.innerHeight / 2 ) + "px;\
			left: " + ( window.innerWidth / 2 - 62.5 ) + "px;\
			font-size: larger;\
			border: solid;\
			-moz-border-radius: 15px;\
			-webkit-border-radius: 15px;\
		}",
		"div#navDiv, div#navDiv2 {\
			height: 28px;\
			width: " + window.innerWidth + "px;\
			margin-left: auto;\
			margin-right: auto;\
			position: fixed;\
			background: black;\
		}",
		"div#navDiv {\
			top: 0;\
		}",
		"div#navDiv2 {\
			top: " + (window.innerHeight - 28) + "px;\
		}",
		"div#containerDiv {\
			height: auto;\
			width: auto;\
			margin-left: auto;\
			margin-right: auto;\
		}",
		"div#tabSpaceDiv {\
			width: " + (window.innerWidth * 0.95) + ";\
		}",
		"div.tabDiv {\
			float: left;\
			height: 30px;\
		}",
		"div#subnavDiv {\
			margin-left: auto;\
			margin-right: auto;\
			width: 594px;\
		}",
		"div#descriptionDiv {\
			-moz-border-radius: 12px;\
			-webkit-border-radius: 12px;\
			border: solid 3px;\
			background: black;\
			position: fixed;\
			font-weight: normal;\
			padding-left: 3px;\
			padding-right: 3px;\
		}",
		"div#descriptionDiv div {\
			float: left;\
			width: 350px;\
		}",
		"div#descriptionDiv img {\
			float: right;\
			padding: 10px;\
			margin: 0px;\
		}",
		"div#descriptionDiv div div {\
			margin: 5px;\
		}",
		"div#descriptionDiv2 {\
			width: 305px;\
			margin-left: auto;\
			margin-right: auto;\
			margin-top: 25px;\
		}"
	];
	
	var style = document.createElement( "style" )
	style.type = "text/css";
	head.appendChild( style );
	
	var max = rules.length;
	for( i = 0; i < max; i++ )
	{
		document.styleSheets[0].insertRule( rules[i], i );
	}
	
	updateStatus( "Styles loaded!" );
}

function Combo( parent )
{
	//console.profile();
	var combo = this;
	var keyboardMode = false;
	var scrollTop;
	var lastValue = "";
	var items = [];
	var shown = [];
	var interval;
	var highlighted = -1;
	var selected = -1;
	var selectedValue;
	var hideInterval;
	var scrollListen = true;
	var hasFocus = false;
	var selectMap = new Object();
	var itemMap = new Object();
	var container = document.createElement( "div" );
    var textBox = document.createElement( "input" );
	var dropBox = document.createElement( "div" );
	var innerBox = document.createElement( "div" );
	
	container.style.width = "120px";
	container.style.margin = "1.5px";
	if( browser != "CHROME" )
	{
		container.style.border = "solid 1px white";
	}
	container.style.fontWeight = "normal";
	container.style.cssFloat = "left";
	textBox.type = "text";
	textBox.style.width = "120px";
	textBox.style.border = "none";
	textBox.style.background = "white";
	dropBox.style.border = "thin solid white";
	dropBox.style.width = "300px";
	dropBox.style.background = "white";
	dropBox.style.color = "#000000";
	dropBox.style.overflowX = "hidden";
	dropBox.style.overflowY = "scroll";
	dropBox.style.display = "none";
	
	dropBox.appendChild( innerBox );
	container.appendChild( textBox );
	container.appendChild( dropBox );
	parent.appendChild( container );
	
	this.initialize = function() {
		var max = items.length;
		for( var i = 0; i < max; i++ )
		{
			addChild( items[i], i );
		}
	};
	this.add = function( text, url ) {
		items.push( { text: text, lower: text.toLowerCase(), url: url, index: items.length } );
	};
	this.selectValueLike = function( val ) {
		var max = items.length;
		for( var i = 0; i < max; i++ )
		{
			if( items[i].url.replace( /\//gm, "" ) == val.replace( /\//gm, "" ) )
			{
				selected = i;
				textBox.value = items[i].text;
				break;
			}
		}
	};
	this.selectRandom = function() {
		selected = items[Math.floor( Math.random() * items.length)];
		textBox.value = items[selected].text;
	};
	this.triggerSelection = function() {
		if( combo.onclick != null )
		{
			combo.onclick();
		}
	};
	this.getSelectedValue = function() {
		return items[selected].url;
	};
	this.getSelectedText = function() {
		return items[selected].text;
	};
	this.hasFocus = function() {
		return hasFocus;
	};
	this.isDisabled = function() {
		return textBox.disabled;
	}
	this.disable = function() {
		textBox.blur();
		textBox.disabled = true;
	};
	this.enable = function() {
		textBox.disabled = false;
	};
	this.size = function() {
		return innerBox.childNodes.length;
	};
	this.onclick;
	
	var optionOver = function( e ) {
		if( !keyboardMode )
		{
			highlight( parseInt( itemMap[e.target.childNodes[0].textContent] ) );
		}
	};
	var optionClick = function( e ) {
		selected = parseInt( selectMap[e.target.childNodes[0].textContent] );
		if( combo.onclick != null )
		{
			combo.onclick();
		}
	};
	var highlight = function( index ) {
		var count = shown.length;
		var option;
		if( highlighted > -1 && highlighted < count )
		{
			option = shown[highlighted];
			option.style.background = "#FFFFFF";
			option.style.color = "#000000";
		}
		if( index < 0 )
		{
			index = 0;
		}
		if( index > count - 1 )
		{
			index = count - 1;
		}
		option = shown[index];
		option.style.background = "#555555";
		option.style.color = "#FFFFFF";

		scrollListen = false;
		if( index < scrollTop )
		{
			scrollTop = index;
			dropBox.scrollTop = index * Math.ceil( innerBox.offsetHeight / count );
		}
		else if( index > scrollTop + 19 )
		{
			scrollTop = index - 19;
			dropBox.scrollTop = scrollTop * Math.ceil( innerBox.offsetHeight / count );
		}
		scrollListen = true;
		highlighted = index;
	};
	var unhighlight = function() {
		if( highlighted > -1 )
		{
			var option = shown[highlighted];
			option.style.background = "#FFFFFF";
			option.style.color = "#000000";
			highlighted = -1;
			scrollTop = 0;
			dropBox.scrollTop = 0;
		}
	};
	var addChild = function( item, index, filter ) {
		var div = document.createElement( "div" );
		div.style.height = "17px";
		div.style.overflow = "hidden";
		div.style.cursor = "default";
		div.innerHTML = item.text;
		div.addEventListener( "mouseover", optionOver, true );
		div.addEventListener( "mousedown", optionClick, true );
		selectMap[item.text] = item.index;
		itemMap[item.text] = item.index;
		innerBox.appendChild( div );
		shown.push( div );
		return true;
	};
	var removeChildren = function() {
		while( innerBox.hasChildNodes() )
		{
			innerBox.firstChild.removeEventListener( "mouseover", optionOver, true );
			innerBox.removeChild( innerBox.firstChild );
		}
	};
	var changeListen = function() {
		if( textBox.value != lastValue )
		{
			keyboardMode = false;
			unhighlight();
			var filter = textBox.value.toLowerCase().replace( /[$^[\\/]/ );
			var max = items.length;
			var count = 0;
			shown.splice( 0, shown.length );
			if( filter == "" || filter == null )
			{
				var max = items.length;
				for( var i = 0; i < max; i++ )
				{
					var option = innerBox.childNodes[i];
					itemMap[option.childNodes[0].textContent] = i;
					option.style.display = "block";
					shown.push( option );
					count++;
				}
			}
			else
			{
				//console.time( "searchMatch" );
				var pattern = new RegExp( filter, "i" );
				for( var i = 0; i < max; i++ )
				{
					var option = innerBox.childNodes[i];
					if( items[i].lower.match( pattern ) )
					{
						itemMap[option.childNodes[0].textContent] = count;
						option.style.display = "block";
						shown.push( option );
						count++;
					}
					else
					{
						option.style.display = "none";
					}
				}
				//console.timeEnd( "searchMatch" );
			}
			if( count >= 20 )
			{
				dropBox.style.height = "340px";
			}
			else
			{
				dropBox.style.height = ( 17 * count ) + "px";
			}
		}
		lastValue = textBox.value;
	};
	
	dropBox.addEventListener( "mousemove", function( e ) {
		keyboardMode = false;
	}, true );
	dropBox.addEventListener( "scroll", function( e ){
		if( browser == "CHROME" )
		{
			textBox.focus();
			try
			{
				clearTimeout( hideInterval );
			} catch( e ){ }
		}
		if( scrollListen )
		{
			scrollTop = Math.ceil( dropBox.scrollTop / ( innerBox.offsetHeight / shown.length ) );
		}
	}, true );
	
	textBox.addEventListener( "keydown", function( e ) {
		switch( e.keyCode )
		{
			case 13:
				selected = parseInt( selectMap[shown[highlighted].childNodes[0].textContent] );
				if( combo.onclick != null )
				{
					combo.onclick();
				}
				textBox.blur();
				break;
			case 33:
				highlight( highlighted - 19 );
				keyboardMode = true;
				break;
			case 34:
				highlight( highlighted + 19 );
				keyboardMode = true;
				break;
			case 36:
				highlight( 0 );
				keyboardMode = true;
				break;
			case 35:
				highlight( shown.length - 1 );
				keyboardMode = true;
				break;
			case 38:
				highlight( highlighted - 1 );
				keyboardMode = true;
				break;
			case 40:
				highlight( highlighted + 1 );
				keyboardMode = true;
				break;
		}
		return false;
	}, true );
	textBox.addEventListener( "blur", function( e ) {
		if( browser == "CHROME" )
		{
			hideInterval = setTimeout( function(){
				e.returnValue = false;
				hasFocus = false;
				dropBox.style.display = "none";
				textBox.value = items[selected].text;
				try
				{
					clearInterval( interval );
				} catch( exception ) {  }
				try
				{
					clearTimeout( hideInterval );
				} catch( e ){ }
			}, 50 );
		}
		else
		{
			e.returnValue = false;
			hasFocus = false;
			dropBox.style.display = "none";
			textBox.value = items[selected].text;
			try
			{
				clearInterval( interval );
			} catch( exception ) {  }
		}
	}, true );
	textBox.addEventListener( "focus", function( e ) {
		hasFocus = true;
		scrollTop = 0;
		textBox.value = "";
		dropBox.style.height = "340px";
		dropBox.style.display = "block";
		highlight( selected );
		interval = setInterval( changeListen, 50 );
	}, true );
}