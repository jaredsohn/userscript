// ==UserScript== 
// @name           twitterForceHttps
// @description    Redirect a twitter page to a secure connection and render all twitter links on page as secure protocol (https)
// @author         Stephen Breen
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.1
// ==/UserScript==
/* 	

	Author: Stephen Breen 
	Taken from a script by Micah Wittman | http://wittman.org/ (http://userscripts.org/scripts/show/53674). Literally a find and replace.
	
	Versions:

        * 2009-07-14 - version 0.1 - Initial Release. Redirect a twitter page to a secure connection and render all twitter links on page as secure protocol (https).
*/

/*
**************************************
*********** Configuration ***********
*/

//NOTE: 

var redirectCurrentPage = true; //Set to true to redirect to current page with secure connection.

var forceInternalLinks = true; //Set to true to reset all internal links (twitter.com and ff.im) to secure (https) references.

var forceAllLinks = false; //Set to true to force ALL links, even non-twitter domains (warning: many sites do not support secure connections in which case the link may not route you to a working page).


/*
**************************************
*/


/*** Global Variables ***/
/********************************/
var realtimeToUse = null;
var lastSuccessPrev;


/*** Initializing Functions ***/
/********************************/
function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
            jQuery = unsafeWindow.jQuery;
        }
    }
    if(typeof jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = jQuery;
		//if($('#feed').length > 0) //only continue and enter recursive loop if on a page with feed entries
		//{
		SetOnDemand();
		letsJQuery();
		//}
    }
}

function letsJQuery()
{
	SetRealtime();
	lastSuccessPrev = realtimeToUse.lastSuccess;

	ForceHttps();	
	ForceHttps_wait();
}


/*** Helper Functions ***/
/********************************/
function SetRealtime()
{
	if(typeof unsafeWindow == 'undefined')
	{
		realtimeToUse = realtime;
	}
	else
	{
		if(typeof unsafeWindow.realtime != 'undefined'){
			realtimeToUse = unsafeWindow.realtime;
		}		
	}
}

function SetOnDemand()
{
	$('.l_expandcomments').click(function(){
		ForceHttpsOnDemand_wait();
	});
}


/*** Main Processing Functions ***/
/********************************/
function RedirectToHttps()
{
	//Redirect to secure connection if current twitter page is not one
	var href = window.location.href;
	if(href.indexOf('https://') == -1)
	{
		window.location.href = href.replace('http://', 'https://');
	}
}

function ForceHttps_wait(){
	if(lastSuccessPrev == realtimeToUse.lastSuccess)
	{
		window.setTimeout(ForceHttps_wait,50);
	}
	else
	{
		lastSuccessPrev = realtimeToUse.lastSuccess; //sync variables
		letsJQuery();
	}
}

function ForceHttpsOnDemand_wait(){
	window.setTimeout(ForceHttps, 2000);
}

function ForceHttps()
{
	var href;
	var hrefSecure;
	$('a').each(function(){
		href = $(this).attr('href');
		if( forceAllLinks || href.indexOf('http://twitter.com') > -1 || href.indexOf('http://ff.com') > -1 )
		{
			hrefSecure = href.replace('http://','https://');
			this.href = hrefSecure;
		}
	});
}



/********** RUN SCRIPT **********/
/********************************/
if(window.location.href.indexOf('twitter.com/') > -1) //greasekit doesn't support @include directs, so test URL for context
{
	if(redirectCurrentPage)
	{
		RedirectToHttps()
	}
	if(forceInternalLinks)
	{
		GM_wait();
	}
}