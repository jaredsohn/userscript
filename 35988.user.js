// ==UserScript==
// @name           Metafilter-Profile-Pic based on Grumblebee
// @namespace      http://www.metafilter.com/user/16268
// @description    Shows a Metafilter memeber's profile pic, modified.
// @include        http://*.metafilter.com/*
// ==/UserScript==


window.addEventListener('load', init, true);

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

function init()
{
	var smallcopySpans	= getSmallCopySpans();
	var aTags 			= getATags( smallcopySpans );
	var userIds 		= getUserIds( aTags );
			
	loadPics( userIds );
}


function loadPics( userIds )
{
	var copyDivs = getCopyDivs();
    var smallCopySpans	= getSmallCopySpans();
	var copyDiv;
    var smallSpan;
	var newContent;
	var before 			= "<div style='padding-left:"  + PAD_SIZE + "px; margin-left: "+ (PAD_SIZE + SMALL_SIZE) + "'>";
	var after 			= "</div>";
    
    
		
	for ( var i = 0; i < copyDivs.length-3; i++ )
	{
		copyDiv 			= copyDivs[ i ];
		newContent 			= 	"<img style='float:left; clear: left; position: relative; bottom:" + (BORDER_SIZE+SMALL_SIZE+4) + "px; margin-right:"  + PAD_SIZE+"px; padding: 1px; border:"  + BORDER_SIZE+"px solid gray' onload='javascript:this.style.width=" 
		newContent 			+=	SMALL_SIZE + ";this.style.height= " + SMALL_SIZE;
		newContent 			+= 	";' onerror='this.src=\"http://images.metafilter.com/mefi/userphoto.png\";'";
		newContent 			+=	" src='http://www.metafilter.com/images/profile/square/" + userIds[ i ];
		newContent 			+=	".jpg'  width='0' height='0' />";
		copyDiv.innerHTML 	=   before + copyDiv.innerHTML + after + newContent;
	}
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
		if ( theClass == COPY || 
			 theClass == COMMENTS || 
			 theClass == COMMENTS_BEST ||
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
	if ( userLinkIndex != null || shortUserLinkIndex != null )
	{
		return true;
	}
	
	return false;
}
