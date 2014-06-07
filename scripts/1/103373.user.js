// ==UserScript==
// @name clikkit
// @description Enhanced frame-based browsing for reddit
// @version 1.0
// @author Mangala Sadhu Sangeet Singh Khalsa
// @match http://www.reddit.com/*
// @namespace http://bitbucket.org/msssk/clikkit
// ==/UserScript==


/**
 * @class The clikkit browser for reddit
 * @description clikkit is wrapped in a function so it can be injected into the page
 *
 * An onclick handler is set for all main links on the page that returns false to override the default action.
 * When a link is clicked, the URL is analyzed - special cases are handled to open frame-busting sites
 * in a new window, youtube videos with an embed URL, and images sized to fit the frame (with onclick
 * toggling of size between fit and original).
 *
 * Link queue - each time a link is clicked, it is enqueued.  An iframe is immediately created so the
 * browser will start loading the content, but it is positioned out of the viewport. When the current
 * link being displayed is closed, its iframe is destroyed and the next link in the queue is displayed.
 * To display a new link, its iframe is appended to the contentPane and positioned so that it is visible.
 *
 * Images are handled specially - as with normal links, an iframe is created with the image URL as the source.
 * This is necessary so that the browser will consider the link visited (which it won't do if we just load the
 * image directly to an <img> element). When it is time to display an image, instead of making its iframe visible,
 * we make the ImageFrame div visible and set the image 'src' attribute to the image's URL. (For some reason
 * loading an image in an iframe disables the browser's built-in fit-to-window image resizing.)
 */
function clikkit() {
	var DEBUG = false;
	var isInitialized = false;

	// container is the top-level clikkit frame - it contains:
	// - edgePane on the left
	// - contentPane on the right
	var container;

	// edgePane is the narrow border pane that you can click on to close the current item
	var edgePane;

	// contentPane is the container for content-related elements
	// it contains:
	// - URI (jQuery div) at the top:  the URI of the currently displayed content
	// - Title (jQuery div) below URI:  the title of the reddit link for the currently displayed content
	// - Frame (jQuery iframe) below Title:  the iframe or div - iframe displays web pages, div displays images
	// - ImageFrame (jQuery div) below Title:  persistent, but toggled visible/hidden.  ImageFrame contains Image, the img element to load images to
	var contentPane;

	var links = [];
	var normalFGColor;
	var normalBGColor;
	var highlightFGColor;
	var highlightBGColor;
	var frameHeightCorrection = -8; // HACK:  frameHeight ends up a bit too tall for some reason


	function shrink() {
		container.width( 12 );
		container.css( 'opacity', 0.31 );
		//container.mouseover( expand );
	}


	function expand() {
		container.width( '75%' );
		container.css( 'opacity', 1 );
		//container.unbind( 'mouseover' );
	}


	/**
	 * @function
	 */
	function addURL( linkElem ) {
		var i;

		try
		{
			// if we have loaded a reddit page (comments, user, self, etc.) in clikkit, don't open a nested clikkit frame for links - just open them in a new window
			/* DISABLE:  (see bottom) disabled script injection altogether
			if( window.top.frames.length > 1 && location.hostname.indexOf( 'reddit.com' ) != -1 )
			{
				window.open( linkElem.href );
				return false;
			}*/

			// handle sites that break out of frames - open them in a new window
			var noFrameSites = ['flickr.com', 'nytimes.com', 'vimeo.com', 'facebook.com'];
			for( i = 0; i < noFrameSites.length; i++ ) {
				if( linkElem.href.indexOf( noFrameSites[i] ) !== -1 ) {
					window.open( linkElem.href );
					return false;
				}
			}

			var frameHeight = contentPane.innerHeight() - contentPane.URI.outerHeight() - contentPane.Title.outerHeight() + frameHeightCorrection;

			// this variable will be populated with a modified URL if needed (for youtube)
			var frameHREF = linkElem.href;

			if( linkElem.href.indexOf( 'youtube.com' ) !== -1 || linkElem.href.indexOf( 'youtu.be' ) !== -1 ) {
				frameHREF = getYoutubeEmbedURL( linkElem.href );
				
				// if we can't get an embed URL, open original link in new window
				if( frameHREF === '' ) {
					window.open( linkElem.href );
					return false;
				}
				
				frameHeight -= 26; // HACK:  youtube controls get pushed off bottom of screen for some reason
			}

			// enqueue the link
			links.push( { domNode: linkElem,
				jqFrame: $( '<iframe src="' + frameHREF + '" width="100%" height="' + frameHeight + '" frameborder="0" scrolling="auto" style="position: absolute; left: -5000px; border-top: 1px solid #8B8B8B;"></iframe>' )
			} );

			// append the iframe to the doc body
			$(document.body).append( links[links.length - 1].jqFrame );

			// if nothing is already being displayed, display current link
			if( links.length === 1 ) {
				showLink( links[0] );
				expand();
			}
			// otherwise, update link count display
			else {
				contentPane.Title.FrameCount.html( links.length );
			}
		}
		catch( e )
		{
			logError( e, 'addURL' );
			window.open( linkElem.href );
		}
		finally
		{
			return false;
		}
	}


	// 1. highlight reddit link
	// 2. set Title
	// 3. set URI
	// 4. set Frame to new content
	// 5. make new content visible
	function showLink( link ) {
		highlightSourceLink( link.domNode );
		
		contentPane.URI.html( '<a href="' + link.domNode.href + '" target="_blank">' + link.domNode.href + '</a>' );
		contentPane.Title.html( '<table style="margin-bottom: 1px;"><tr><td id="FrameCount" style="font-size: smaller; font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-align: center; border: 1px solid #B3B3B3; width: 18px; padding-top: 1px; background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.05, rgb(227,227,227)),color-stop(0.41, rgb(245,245,245))); background-image: -moz-linear-gradient(center bottom,rgb(227,227,227) 5%,rgb(245,245,245) 41%);">' + links.length + '</td><td style="padding-left: 4px;">' + link.domNode.firstChild.nodeValue +'</td></tr></table>' );
		contentPane.Title.FrameCount = $('#FrameCount');

		contentPane.Frame = link.jqFrame;

		var frameSrc = contentPane.Frame.attr( 'src' );
		var dotIndex = frameSrc.lastIndexOf( '.' );
		if( dotIndex !== -1 ) {
			var hrefEnd = frameSrc.substring( dotIndex + 1 ).toLowerCase();
			if( hrefEnd === 'jpeg' || hrefEnd === 'jpg' || hrefEnd === 'png' || hrefEnd === 'gif' ) {
				contentPane.ImageFrame.height( contentPane.Frame.height() );
				contentPane.ImageFrame.Image.attr( 'src', link.domNode.href );
				contentPane.ImageFrame.isActive = true;
				contentPane.ImageFrame.show();

				if( contentPane.ImageFrame.Image[0].complete && contentPane.ImageFrame.Image[0].width > 0 ) {
					// if the image is loaded and ready, set the size
					imgSetSize.apply( contentPane.ImageFrame.Image[0] );
				}
				else {
					// otherwise set a flag for the image's load handler to set the size
					contentPane.ImageFrame.Image[0].clikkitIsActive = true;
				}

				// exit the function so we don't make the normal iframe visible
				return;
			}
		}

		contentPane.append( link.jqFrame );
		contentPane.Frame.css( 'position', 'relative' );
		contentPane.Frame.css( 'left', 0 );
	}


	function closeLink() {
		try
		{
			contentPane.URI.html( '' );
			contentPane.Title.html( '' );

			var currentLink = links.shift();
			unhighlightSourceLink( currentLink.domNode );
			
			if( contentPane.ImageFrame.isActive ) {
				closeImageFrame();
			}

			contentPane.Frame.remove();
		}
		catch( e )
		{
			logError( e, 'closeLink' );
		}
		finally
		{
			if( links.length > 0 ) {
				showLink( links[0] );
			}
			else {
				links = [];
				shrink();
			}
		}
	}


	/**
	 * @param {HTMLAnchorElement} link The link to highlight (expects a link nested in a specific layout for reddit)
	 */
	function highlightSourceLink( link ) {
		if( !normalFGColor )
		{
			normalFGColor = $(link).css( 'color' );
			normalBGColor = $(link.parentNode.parentNode).css( 'background-color' );
			
			highlightFGColor = highlight( normalBGColor );
			highlightBGColor = highlight( normalFGColor );
TRACE( 'COLORS:  Normal[fg = ' + normalFGColor + ', bg = ' + normalBGColor + '], Highlight[fg = ' + highlightFGColor + ', bg = ' + highlightBGColor + ']' );
		}

		$(link).css( 'color', highlightFGColor );
		$(link.parentNode).css( 'background', highlightBGColor );
		$(link.parentNode).css( 'margin-bottom', 0 );
		$(link.parentNode).css( 'border-bottom', '1px solid ' + highlightBGColor );
		$(link.parentNode.nextSibling).css( 'background', highlightBGColor );
		$(link.parentNode.nextSibling.nextSibling).css( 'background', highlightBGColor );
	}


	/**
	 * @param {HTMLAnchorElement} link The link to un-highlight (expects a link nested in a specific layout for reddit)
	 */
	function unhighlightSourceLink( link ) {
		$(link).css( 'color', normalFGColor );
		$(link.parentNode).css( 'background', '' );
		$(link.parentNode).css( 'margin-bottom', '1px' );
		$(link.parentNode).css( 'border-bottom', 0 );
		$(link.parentNode.nextSibling).css( 'background', '' );
		$(link.parentNode.nextSibling.nextSibling).css( 'background', '' );
	}


	/**
	 * Brighten or darken a color to produce a suitable highlight color
	 * If any of the RGB values provided are greater than 128, the color will be darkened, otherwise brightened
	 * @param rgbString:  a string of the format "rgb(0, 0, 0)"
	 * @returns a highlight color of the format "rgb(28, 28, 28)"
	 */
	function highlight( rgbString ) {
		// WARNING: probably not a robust solution
		// observed behavior:  when there is no bgcolor, the value is "rgba(0, 0, 0, 0)"
		// In this case, assume it's white
		if( rgbString === 'rgba(0, 0, 0, 0)' )
		{
			return( 'rgb(244, 244, 244)' );
		}
		
		var startpos = rgbString.indexOf( '(' );
		var endpos = rgbString.indexOf( ',', startpos );
		var red = rgbString.substring( startpos + 1, endpos );
		red = parseInt( red, 10 );
		
		startpos = endpos + 1;
		endpos = rgbString.indexOf( ',', startpos );
		var green = rgbString.substring( startpos, endpos );
		green = parseInt( green, 10 );
		
		startpos = endpos + 1;
		endpos = rgbString.indexOf( ',', startpos );
		if( endpos === -1 ) {
			endpos = rgbString.indexOf( ')', startpos );
		}
		var blue = rgbString.substring( startpos, endpos );
		blue = parseInt( blue, 10 );
		
		var increment = 11;
		
		if( red > 128 || green > 128 || blue > 128 )
		{
			red -= increment;
			green -= increment;
			blue -= increment;
			
			red = red < 0 ? 0 : red;
			green = green < 0 ? 0 : green;
			blue = blue < 0 ? 0 : blue;
		}
		else
		{
			red += increment;
			green += increment;
			blue += increment;
			
			red = red > 255 ? 255 : red;
			green = green > 255 ? 255 : green;
			blue = blue > 255 ? 255 : blue;
		}
		
		return( 'rgb(' + red + ', ' + green + ', ' + blue + ')' );
	}


	function init() {
		if( isInitialized ) {
TRACE( 'WARNING:  init() called, already initialized.' );
			return;
		}

		// border color - blueish #2f48d1
		// border color - greyish #5b687a
		// translucent left-border challenges:
		// 1. div-inside-div:  inner div inherits translucence of outer div
		// 2. div-next-to-div:  alignment is hell, pixels are all wrong!
		// 3. table - it works!
		var borderHTML = '<td id="clikkitBorder" style="opacity: .42; box-shadow: -3px 0 5px #424242;"><div style="border-left: 1px solid #F5F5F5; border-right: 1px solid #F5F5F5; background: #5b687a; width: 4px; height: 100%;">&nbsp;</div></td>';
		var edgeHTML = '<td id="clikkitEdge" style="opacity: .88; font-size: small; font-weight: bold; letter-spacing: 4px; color: white; background: #90203c; cursor: pointer;"><p style="writing-mode: tb-rl; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); width: 14px;">CLOSE</p></td>';
		var contentHTML = '<td id="clikkitContent" style="width: 100%; height: 100%; background: #E3E3E3; vertical-align: top;"></td>';
		container = $( '<table border="0" cellpadding="0" cellspacing="0" style="opacity: .31; position: fixed; top: 0; right: 0; z-index: 100;"><tr>' + borderHTML + edgeHTML + contentHTML + '</tr></table>' );
		container.height( $(document.body.parentNode).innerHeight() );
		//container.height( $(window).innerHeight() );
		container.width( 12 );
		container.appendTo( document.body );

		edgePane = $( '#clikkitEdge' );
		edgePane.click( closeLink );

		contentPane = $( '#clikkitContent' );

		var URI = $( '<div style="font: small verdana, arial, helvetica, sans-serif; color: black; background-color: #F5F5F5; padding: 2px 2px 2px 3px; border: 1px solid #B3B3B3; border-radius: 4px; margin: 2px 2px 1px 2px;">Tj</div>' );
		contentPane.append( URI );
		contentPane.URI = URI;

		var Title = $( '<div style="font: medium verdana, arial, helvetica, sans-serif; color: #222222; padding: 2px 2px 2px 4px;">Tj</div>' );
		contentPane.append( Title );
		contentPane.Title = Title;

		contentPane.ImageFrame = $( '<div id="clikkitImagePane" style="width: 100%; height: 600px; overflow: auto; border-top: 1px solid #8B8B8B;"></div>' );
		contentPane.ImageFrame.Image = $( new Image() );
		contentPane.ImageFrame.Image.click( imgOnClick );
		contentPane.ImageFrame.Image.load( imgOnLoad );
		contentPane.append( contentPane.ImageFrame );
		contentPane.ImageFrame.append( contentPane.ImageFrame.Image );
		contentPane.ImageFrame.hide();

		isInitialized = true;
	}


	function closeImageFrame() {
		contentPane.ImageFrame.Image.attr( 'src', '' );
		contentPane.ImageFrame.Image[0].width = 320;
		contentPane.ImageFrame.Image[0].height = 240;
		contentPane.ImageFrame.Image[0].retryCount = 0;
		contentPane.ImageFrame.Image[0].clikkitIsActive = false;
		contentPane.ImageFrame.isActive = false;
		contentPane.ImageFrame.hide();
	}


	function imgSetSize() {
		this.fitWidth = contentPane.ImageFrame.innerWidth();
		
		var ratio = this.fitWidth / this.naturalWidth;
		this.fitHeight = parseInt( this.naturalHeight * ratio, 10 );
		
		var maxHeight = contentPane.ImageFrame.innerHeight();
		if( this.fitHeight > maxHeight ) {
			ratio = maxHeight / this.naturalHeight;
			this.fitWidth = parseInt( this.naturalWidth * ratio, 10 );
			this.fitHeight = maxHeight;
		}

		// HACK:  sanity checks
		if( this.fitWidth < 10 ) {
			this.fitWidth = 100;
		}
		if( this.fitHeight < 10 ) {
			this.fitHeight = 100;
		}
		
		this.width = this.fitWidth;
		this.height = this.fitHeight;
TRACE( 'imgSetSize:  w:' + this.naturalWidth + '->' + this.fitWidth + '; h:' + this.naturalHeight + '->' + this.fitHeight );
	}


	function imgOnClick() {
		if( this.width === this.naturalWidth ) {
			this.width = this.fitWidth ;
			this.height = this.fitHeight;
		}
		else {
			this.width = this.naturalWidth;
			this.height = this.naturalHeight;
		}
	}


	/**
	 * Image life-cycle dependencies
	 * 1. Create a new Image object
	 * 2. Set the onLoad handler for the Image
	 * 3. Append the Image object to the DOM
	 * 4. Set the image 'src' attribute to begin loading it
	 * 5. Once loaded, get the image dimensions
	 * 6. Size to frame
	 */
	function imgOnLoad() {
		if( this.width === 0 || this.height === 0 ) {
			this.retryCount = this.retryCount === undefined ? 1 : this.retryCount + 1;
			if( this.retryCount === 10 ) {
				// can't get image dimensions, open in new window
				window.open( this.src );
				this.src = '';
				this.width = 320;
				this.height = 240;
				this.retryCount = 0;
				return;
			}

			setTimeout( imgOnLoad.apply( this ), 250 );
			return;
		}

		if( this.naturalWidth === undefined ) {
			this.naturalWidth = this.width;
		}
		
		if( this.naturalHeight === undefined ) {
			this.naturalHeight = this.height;
		}
TRACE( 'img loaded:  ' + this.src + '; w=' + this.width + '; h=' + this.height );

		if( this.clikkitIsActive ) {
TRACE( 'imgOnLoad->imgSetSize' );
			imgSetSize.apply( this );
		}
	}


	function getYoutubeEmbedURL( originalHREF ) {
		var href = originalHREF;
		var startIndex;
		var endIndex;
		var videoID = '';
		var timeAnchor = '';
		var embedURL = '';

		try
		{
			startIndex = href.lastIndexOf( '#' );
			if( startIndex !== -1 ) {
				timeAnchor = href.substring( startIndex );
				href = href.substring( 0, startIndex );
			}

			if( href.indexOf( 'youtube.com' ) !== -1 )
			{
				startIndex = href.indexOf( '?v=' );

				if( startIndex === -1 ) {
					startIndex = href.indexOf( '/v/' );
					
					if( startIndex === -1 ) {
						startIndex = href.indexOf( '&v=' );
					}
					else {
						startIndex += 3;
						endIndex = href.indexOf( '?', startIndex );
						
						if( endIndex === -1 ) {
							videoID = href.substring( startIndex );
						}
						else {
							videoID = href.substring( startIndex, endIndex );
						}
					}
				}

				// we didn't get the videoID yet, but we got the startIndex of either '?v=' or '&v='
				if( videoID === '' && startIndex !== -1 ) {
					startIndex += 3;
					endIndex = href.indexOf( '&', startIndex );
					
					if( endIndex === -1 ) {
						videoID = href.substring( startIndex );
					}
					else {
						videoID = href.substring( startIndex, endIndex );
					}
				}
			}
			else if( href.indexOf( 'youtu.be' ) !== -1 )
			{
				startIndex = href.lastIndexOf( '/' );
				
				if( startIndex !== -1 ) {
					startIndex += 1;
					endIndex = href.indexOf( '?' );
					
					if( endIndex === -1 ) {
						videoID = href.substring( startIndex );
					}
					else {
						videoID = href.substring( startIndex, endIndex );
					}
				}
			}

			if( videoID.length !== 0 ) {
				embedURL = 'http://www.youtube.com/embed/' + videoID + timeAnchor;
			}
		}
		catch( e )
		{
			logError( e, 'getYoutubeEmbedURL' );
		}
		finally
		{
			return embedURL;
		}
	}


	function TRACE( msg ) {
		if( DEBUG && console ) {
			console.log( msg );
		}
	}


	function logError( e, source ) {
		if( console ) {
			if( source ) {
				source = ':' + source;
			} else {
				source = '';
			}
			var msg = 'ERROR(clikkit' + source + '):  ' + e.name + ':  ' + e.message;
			console.log( msg );
		}
	}


	function setLinkHandler( index ) {
		this.onclick = function() { addURL( this ); return false; };
	}


	init();
	$( 'a[class~="title"]' ).each( setLinkHandler );
	$( 'a[class~="comments"]' ).each( setLinkHandler );
}

// inject script into page, but only if we are in a top-level reddit page
// (as opposed to a reddit page opened in a clikkit frame)
if( window.top.frames.length === 1 ) {
	var script = document.createElement("script");
	script.textContent = "(" + clikkit.toString() + ")();";
	document.body.appendChild(script);
}
