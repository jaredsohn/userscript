// ==UserScript==
// @name          Grumblebee's Show-Metafilter-Profile-Pic script
// @namespace     http://www.grumblebee.com/Greasemonkeysripts/
// @description   Shows a Metafilter member's profile pic
// @include       http://*.metafilter.com/*
// ==/UserScript==

window.addEventListener('load', init, true);

var SPAN 				= "span";
var CLASS 				= "class";
var COPY 				= "copy";
var COMMENTS 			= "comments";
var COMMENTS_BESTLEFT 	= "comments bestleft"
var DIV 				= "div";
var SMALLCOPY 			= "smallcopy";
var A 					= "a";
var USER_URL_PREFIX 	= "http://www.metafilter.com/user/";
var SMALL_SIZE 			= 50;
var PAD_SIZE = 5;
var BORDER_SIZE = 5;
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
		
	for ( var i = 0; i < copyDivs.length-3; i++ )
	{
		copyDiv 			= copyDivs[ i ];
		newContent 			= 	"<img style='float:left;  padding-right:"  + PAD_SIZE+"px; margin-right:"  + BORDER_SIZE+"px; border-right:"  + BORDER_SIZE+"px solid black' onload='javascript:this.style.width=" 
		newContent 			+=	SMALL_SIZE + ";this.style.height= " + SMALL_SIZE;
		newContent 			+= 	";' onerror='this.src=\"http://images.metafilter.com/mefi/userphoto.png\";'";
		newContent 			+=	" src='http://www.metafilter.com/images/profile/square/" + userIds[ i ];
		newContent 			+=	".jpg'  width='0' height='0' />";
    var before = "<div style='padding-left:"  + PAD_SIZE+"px; border-left:"  + BORDER_SIZE+"px solid black; margin-left: "+(PAD_SIZE+ SMALL_SIZE)+"'>";
    var after = "</div>";
		copyDiv.innerHTML 	=  newContent + before + copyDiv.innerHTML + after;
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
		if ( aDiv.getAttribute( CLASS ) == COPY || 
				 aDiv.getAttribute( CLASS ) == COMMENTS || 
				 aDiv.getAttribute( CLASS ) == COMMENTS_BESTLEFT )
		{
			copyDivs.push( aDiv );
		}
	}
	
	return copyDivs;
}

function getSmallCopySpans(  )
{
	var spans	= document.getElementsByTagName("span");
	var smallCopySpans = [];
	var aSpan;	
	for ( var i = 0; i < spans.length; i++ )
	{
		aSpan = spans[ i ];
		if ((aSpan.getAttribute( "class" ) == "smallcopy" ) &&
      (aSpan.innerHTML.indexOf("posted by")==0))
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
	if ( userLinkIndex != null )
	{
		return true;
	}
	
	return false;
}