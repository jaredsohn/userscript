//
// ==UserScript==
// @name		Inline video player
// @author		crea7or
// @namespace		internet
// @description		Inline video player for Youtube.com , Vimeo.com and Twitvid.com
// @include		http://*
// @exclude		http://*.youtube.com/*
// @exclude		http://*.vimeo.com/*
// @exclude		http://*.twitvid.com/*
// @exclude		http://*.dirty.ru/*
// @exclude		http://*.leprosorium.ru/*
// @run-at		document-end
// ==/UserScript==


function isNumber(n)
{
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function addEvent(obj, sEvent, sFunc)
{
	if (obj.addEventListener) obj.addEventListener(sEvent, sFunc, false);
	else if (obj.attachEvent) obj.attachEvent('on' + sEvent, sFunc);
}

function lspSetVideoSize( srcobject, width, height )
{
	srcobject.parentNode.parentNode.parentNode.firstChild.setAttribute('width', width );
	srcobject.parentNode.parentNode.parentNode.setAttribute('style', 'width: ' + width + 'px;' );
	srcobject.parentNode.parentNode.parentNode.firstChild.setAttribute('height', height );	
}

function insertAfter( referenceNode, node )
{
	referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

function clickOnVideoLink( e )
{
	var videoId;
	if (( this.href.search(/youtube.com/i) > -1 ) && ( this.href.search(/v=/i) > -1 ))
	{
		videoTime = 0;
		videoId = this.href.slice(  this.href.search(/v=/i) + 2 );
		if ( videoId.indexOf('&') > 1 )
		{
			if ( videoId.indexOf('&t=') > -1 )
			{
				videoTime = videoId.slice( videoId.indexOf('&t=') + 3 );
				if ( videoTime.indexOf('&') > -1 )
				{
					videoTime = videoTime.slice( 0, videoTime.indexOf('&'));
				}
			}
			else if ( videoId.indexOf('&start=') > -1 )
			{
				videoTime = videoId.slice( videoId.indexOf('&start=') + 7 );
				if ( videoTime.indexOf('&') > -1 )
				{
					videoTime = videoTime.slice( 0, videoTime.indexOf('&'));
				}
			}
			videoId = videoId.slice( 0, videoId.indexOf('&'));
		}
		videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1&start=' + videoTime;
	}
	else if ( this.href.search(/youtu.be/i) > -1 )
	{
		videoId = this.href.slice( this.href.search(/youtu.be/i) + 9 );
		videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1';
	}
	else if ( this.href.search(/vimeo.com/i) > -1 )
	{
		videoId = this.href.slice( this.href.search(/vimeo.com/i) + 10 );
		if ( isNumber( videoId ))
		{
			videoId = 'http://player.vimeo.com/video/' + videoId + '?autoplay=1';
		}
	}
	else if ( this.href.search(/twitvid.com/i) > -1 )
	{
		videoId = 'http://www.twitvid.com/embed.php?guid=' + this.href.slice( this.href.search(/twitvid.com/i) + 12 );
	}

	if ( videoId.length > 0 )
	{
		var playerMainDiv = document.createElement('div');
		var newA;
		var newDiv;
		var iframeObj =  document.createElement('iframe');
		iframeObj.setAttribute('width', '800');
		iframeObj.setAttribute('height', '600');
		iframeObj.setAttribute('frameborder', '0');
		iframeObj.setAttribute('src', videoId );
		playerMainDiv.appendChild( iframeObj );

		playerMainDiv.setAttribute('style', 'width: 800px;' );
		newDivToolbar = document.createElement('div');
		newDiv = document.createElement('span');
		newDiv.setAttribute('style', 'float: right;');
		newDiv.appendChild( document.createTextNode(' video size : '));

		newA = document.createElement('a');
		newA.setAttribute('href', '#');
		newA.appendChild( document.createTextNode('normal'));
		addEvent( newA, 'click', function (e) { lspSetVideoSize( this, 480, 360 ); e.preventDefault(); return false; });
		newDiv.appendChild( newA );		
		newDiv.appendChild( document.createTextNode(' | '));

		newA = document.createElement('a');
		newA.setAttribute('href', '#');
		newA.appendChild( document.createTextNode('big'));
		addEvent( newA, 'click', function (e) { lspSetVideoSize( this, 640, 480 ); e.preventDefault(); return false; });
		newDiv.appendChild( newA );		
		newDiv.appendChild( document.createTextNode(' | '));

		newA = document.createElement('a');
		newA.setAttribute('href', '#');
		newA.appendChild( document.createTextNode('huge'));
		addEvent( newA, 'click', function (e) { lspSetVideoSize( this, 800, 600 ); e.preventDefault(); return false; });
		newDiv.appendChild( newA );	
		newDivToolbar.appendChild( newDiv );

		newDiv = document.createElement('span');
		newA = document.createElement('a');
		newA.setAttribute('href', '#');
		newA.appendChild( document.createTextNode('close player'));
		addEvent( newA, 'click', function (e) { this.parentNode.parentNode.parentNode.previousSibling.setAttribute('style', this.parentNode.parentNode.parentNode.previousSibling.getAttribute('bkpstyle')); this.parentNode.parentNode.parentNode.parentNode.removeChild( this.parentNode.parentNode.parentNode ); e.preventDefault(); return false;});
		newDiv.appendChild( newA );
		newDivToolbar.appendChild( newDiv );

		playerMainDiv.appendChild( newDivToolbar );
		newDiv = document.createElement('br');
		newDiv.setAttribute('clear','all');
		playerMainDiv.appendChild( newDiv );
				
		insertAfter( this, playerMainDiv );
		this.setAttribute('bkpstyle', this.getAttribute('style'));
		this.setAttribute('style', 'display: none');
	
		e.preventDefault();
		return false;
	}
}

function lspAddVideoPreview( linkObject )
{
	if ( linkObject.innerHTML.indexOf('<img') == -1 )
	{
		videoId = '';
		if (( linkObject.href.search(/youtube.com/i) > -1 ) && ( linkObject.href.search(/v=/i) > -1 ))
		{
			videoTime = 0;
			videoId = linkObject.href.slice(  linkObject.href.search(/v=/i) + 2 );
			if ( videoId.indexOf('&') > 1 )
			{
				videoId = videoId.slice( 0, videoId.indexOf('&'));
			}			
		}
		else if ( linkObject.href.search(/youtu.be/i) > -1 )
		{
			videoId = linkObject.href.slice( linkObject.href.search(/youtu.be/i) + 9 );
		}
		if ( videoId.length > 0 )
		{
			newImg = document.createElement('img');
			newImg.setAttribute('src', 'http://img.youtube.com/vi/' + videoId + '/0.jpg');
			linkObject.appendChild( document.createElement('br'));
			linkObject.appendChild( newImg );
		}
	}
}


	var allLinksArray = document.body.getElementsByTagName('a');
	for (var i = 0; i < allLinksArray.length; i++)
	{
		if (allLinksArray[i].href.search(/youtube.com/i) > -1)
		{
			lspAddVideoPreview(allLinksArray[i]);
			addEvent(allLinksArray[i], 'click', clickOnVideoLink);
		}
		if (allLinksArray[i].href.search(/youtu.be/i) > -1)
		{
			lspAddVideoPreview(allLinksArray[i]);
			addEvent(allLinksArray[i], 'click', clickOnVideoLink);
		}
		else if (allLinksArray[i].href.search(/vimeo.com/i) > -1)
		{
			addEvent(allLinksArray[i], 'click', clickOnVideoLink);
		}
		else if (allLinksArray[i].href.search(/twitvid.com/i) > -1)
		{
			addEvent(allLinksArray[i], 'click', clickOnVideoLink);
		}
	}
