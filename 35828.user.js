// ==UserScript==
// @name          Grumblebee's Show-Metafilter-Profile-Pic script
// @namespace     http://www.grumblebee.com/Greasemonkeysripts/
// @description   Shows a Metafilter member's profile pic
// @include       http://*.metafilter.com/*
// @exclude       http://www.metafilter.com/contribute/activity/
// ==/UserScript==

window.addEventListener('load', init, true);

var PICS_AT_BOTTOM		= true;
var SPAN 				= "span";
var CLASS 				= "class";
var COPY 				= "copy";
var COMMENTS 			= "comments";
var COMMENTS_BESTLEFT 	= "comments bestleft";
var COMMENTS_BEST		= "comments best";
var DIV 				= "div";
var SMALLCOPY 			= "smallcopy";
var A 					= "a";
var USER_URL_PREFIX 	= "http://www.metafilter.com/user/";
var SHORT_URL_PREFIX	= "/user/";
var SMALL_SIZE 			= 50;
var PAD_SIZE 			= 5;
var BORDER_SIZE 		= 1;
var POSTED_BY 			= "posted by";
var LINK				= "link";
var PLAIN_CSS_FILE		= "tabs-white.css";

function init()
{
	var smallcopySpans	= getSmallCopySpans(  );
	var aTags 			= getATags( smallcopySpans );
	var userIds 		= getUserIds( aTags );
	var turnOffForPlain = isPlainStyle(  );
	
	//if you want pics on the plain-themed versions of pages
	//change the following line to: if ( true )	
	if ( !turnOffForPlain )	 
	{							
		loadPics( userIds );
	}							
}

function isPlainStyle(  )
{
	var links = document.getElementsByTagName( LINK );
	for ( var i = 0; i < links.length; i++ )
	{
		if ( links[ i ].href.match( "tabs-white.css" ) )
		{
			return true;
		}
	}
	
	return false;
}

function loadPics( userIds )
{
	var copyDivs = getCopyDivs(  );
    var smallCopySpans	= getSmallCopySpans();
	var copyDiv;
    var smallSpan;
	var newContent;
	//This version has a black border along the right edge.
	//var before 			= "<div style='padding-left:"  + PAD_SIZE + "px; border-left:"  + BORDER_SIZE + "px solid black; margin-left: "+ (PAD_SIZE + SMALL_SIZE) + "'>";
	var before 			= "<div style='padding-left:"  + PAD_SIZE + "px; margin-left: "+ (PAD_SIZE + SMALL_SIZE) + "'>";
	var after 			= "</div>";
			
	for ( var i = 0; i < userIds.length ; i++ )
	{
		copyDiv 			= copyDivs[ i ];
		
		if ( isDivOk( copyDiv ) )
		{
		
		// Production version
		newContent			= "<a href='http://www.metafilter.com/user/" + userIds[ i ] + "'>";
		newContent 			+= 	"<img style='float:left; clear: left;"
		
		if ( PICS_AT_BOTTOM )
		{
			newContent			+=  "position: relative; bottom:";
			newContent			+= ( BORDER_SIZE + SMALL_SIZE + 4 ) + "px;";
		}
		
		newContent		    += " margin-right:" + PAD_SIZE + "px;";
		newContent			+= " padding: 1px; border:";
		newContent		    += BORDER_SIZE + "px solid gray' onload='javascript:this.style.width="; 
		newContent 			+=	SMALL_SIZE + ";this.style.height= " + SMALL_SIZE;
		newContent 			+= 	";' onerror='this.src=\"http://images.metafilter.com/mefi/userphoto.png\";'";
		newContent 			+=	" src='http://www.metafilter.com/images/profile/square/" + userIds[ i ];
		newContent 			+=	".jpg'  width='0' height='0' /></a>";
		if ( PICS_AT_BOTTOM )
		{
			copyDiv.innerHTML 	=   before + copyDiv.innerHTML + after + newContent;
		}
		else
		{
			copyDiv.innerHTML 	= newContent + before + copyDiv.innerHTML + after;
		}
		
		//
	
		/*simple version for testing
		newContent = "<img src='http://www.metafilter.com/images/profile/square/" + userIds[ i ] + ".jpg' />";
		copyDiv.innerHTML 	=   before + copyDiv.innerHTML + after + newContent;
		*/
		}
	}
	
}

function isDivOk( aDiv )
{
	if ( aDiv.innerHTML.match( 'class="whitesmallcopy"' ) != null )
	{
		return false;
	}
	
	return true;
}

function getCopyDivs(  )
{
	var copyDivs 	= [];
	var allDivs 	= document.getElementsByTagName( DIV );
	var aDiv;
	
	for ( var i = 0; i < allDivs.length; i++ )
	{
		aDiv = allDivs[ i ];
	
		theClass = aDiv.getAttribute( CLASS );
		if ( theClass == COPY 				|| 
			 theClass == COMMENTS 			|| 
			 theClass == COMMENTS_BEST 		||
			 theClass == COMMENTS_BESTLEFT )
		{
			copyDivs.push( aDiv );
		}
	}
		
	return copyDivs;
}

function getSmallCopySpans(  )
{
	var spans			= document.getElementsByTagName( SPAN );
	var smallCopySpans 	= [];
	var aSpan;	
	for ( var i = 0; i < spans.length; i++ )
	{
		aSpan = spans[ i ];
		if ( aSpan.getAttribute( CLASS ) == SMALLCOPY ) 
		{
			smallCopySpans.push( aSpan );
		}
		
	}
	
	/*
	&&
  		( ( aSpan.innerHTML.indexOf( POSTED_BY ) == 0 ) ||
			aSpan.innerHTML.indexOf( POSTED_BY ) == -1 ) )
			*/
		
	return smallCopySpans;
}

function getATags( smallcopySpans )
{
	var spanATags 	= [];
	var aTags 		= [];
	var aSpan;
	
	for ( var i = 0; i < smallcopySpans.length; i++ )
	{
		aSpan = smallcopySpans[ i ];
		spanATags = aSpan.getElementsByTagName( A );
		for ( var j = 0; j < spanATags.length; j++ )
		{
			aTags.push( spanATags[ j ] );
		}
	}
	
	return aTags;
}

function getUserIds( aTags )
{
	var userIds = [];
	var aTag;
	
	for ( var i = 0; i < aTags.length; i++ )
	{
		aTag = aTags[ i ];
		if ( isUserLink( aTag ) )
		{
			userIds.push( getUserId( aTag ) );
		}
	}
	
	return userIds;
}

function getUserId( aTag )
{
	return String( aTag ).substr( 31 );
}

function isUserLink( aTag )
{
	var userLinkIndex = String( aTag ).match( USER_URL_PREFIX );
	var shortUserLinkIndex = String( aTag ).match( SHORT_URL_PREFIX );
	if ( userLinkIndex != null  )
	{
		return true;
	}
	
	if ( shortUserLinkIndex != null  )
	{
		return true;
	}
	
	return false;
}