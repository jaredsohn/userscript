//Based on Script: Auto-Block Facebook Apps 1.1 @ http://userscripts.org/scripts/show/12393 by Ali Karbassi
//
//This Script adds BLOCK ALL button on request page. 
//When you click that button this script will block app invites sent to you by friends. 
//Do not worry though, you can go to http://facebook.com/privacy.php?view=platform&tab=all and unblock them. It
//
// ==UserScript==
// @name        Block ALL Facebook Application 
// @author      Rahul Bansal
// @namespace   http://www.devilsworkshop.org/BlockAllApplication
// @description BLOCK All Facebook application invitations with just one click. 
// @include     http://*facebook.tld/reqs.php*
// ==/UserScript==

//Aux Function
function xpath(query){
		return document.evaluate(query, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	}

	
//Function to Add a button	
function addBlockAllButton () {	
	var loc = xpath("//div[@id='home_sidebar']/div/div[1]/div[1]");
	if(loc) {
		loc.innerHTML  += "<br/><input style='float:left ; font-weight:bold' name=blockAllButton' class='inputbutton' value='Block ALL Only' type='button'/>";
		loc.innerHTML  += "<br/><input style='float:left ; font-weight:bold' name='blockIgnoreAllButton' class='inputbutton' value='Block & Ignore ALL' type='button'/>";
		}
	}

//Intercept User Clicks to see if our function has been called
function testClick(event)
	{
		if ("blockAllButton" == event.target.name) {
			BlockAllApps();
		}
		if ("blockIgnoreAllButton" == event.target.name) {
			BlockAllApps();
			clickAllIgnores();
		}
	}
   
//Attach our code to pages  	
window.addEventListener("load", addBlockAllButton, false);
document.addEventListener('click', testClick, true);   

function BlockAllApps(){
// Get links on the request page
	var anchors = document.getElementsByTagName('a');
 	var appReqExp = /reqs\.php#confirm_(\d*)_(.*)/;
	for( var i = 0; i < anchors.length; i++ )		{
		if( appReqExp.exec( anchors[i].href ) )	{
			prep(RegExp.$1, anchors[i]);
			}
		}
	}

//CODE ADDED BY ME ENDS HERE

// Find Subdomain
var subDomain = getSubDomain();

// Functions
// PLEASE DO NOT TOUCH IF YOU HAVE NO IDEA WHAT YOU'RE DOING. YOU MIGHT BREAK IT.

// Prepares everything. When things are correct, it calls BlockApp.
function prep(appID, appNode)
{
	var postformMatch = /name="post_form_id" value="(\w+)"/;
	var post_form_id = 0;

	GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://www.facebook.com/apps/block.php?id=' + appID + '&action=block',
			headers:
			{
				'User-Agent': window.navigator.userAgent,
				'Accept': 'text/html',
			},
			onload: function(responseDetails)
			{
				if( (responseDetails.status == 200) && (responseDetails.responseText.indexOf('This will not prevent you from seeing') != -1) )
				{
					// Show that we are working on it.
					appNode.removeAttribute('href');
					appNode.innerHTML = 'Reading confirmation page...';
					
					postformMatch.exec( responseDetails.responseText );

					// Calls function to block the app
					BlockApp(RegExp.$1, appID, appNode);
				}
			}
		}
	);
}

function BlockApp(post_form_id, appID, appNode)
{
	GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'http://' + subDomain + 'facebook.com/apps/block.php?id=' + appID + '&action=block',
			headers:
			{
				'User-Agent': window.navigator.userAgent,
				'Accept': 'text/xml',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data:'post_form_id=' + post_form_id + '&save=1',
			onload: function (responseDetails)
			{
				if( (responseDetails.status == 200) && (responseDetails.responseText.indexOf('You have blocked this application') != -1) )
				{
					appNode.innerHTML = 'App Blocked!'
					appNode.href = 'http://facebook.com/reqs.php';
				}
			},
			onerror: function (responseDetails)
			{
				appNode.removeAttribute('href');
				appNode.innerHTML = 'App Block failed!';
			}
		}
	);
}

function getSubDomain()
{
	var subDomainRegExp = /http:\/\/(.*\.)facebook\.com/;
	var subDomain = '';
	if (subDomainRegExp.exec(document.location) != 0)
	{
		subDomain = RegExp.$1;
	}
	return subDomain;
}

// This function is by zetx from his script: http://userscripts.org/scripts/show/14084
// I also used this in facebook Ignore ALL App request script: http://userscripts.org/scripts/show/16118 

function clickAllIgnores()	{
		var unparsedHideIds = document.evaluate('//input[contains(@onclick, "click_add_platform_app")]/@onclick', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var pattern = /null/;

		for(var c = 0, unparsedHideId; unparsedHideId = unparsedHideIds.snapshotItem(c); c++) {

		    hideId = unparsedHideId.value;
		    if(pattern.test(hideId))
		    {
		        // hackish
		        var doThis = hideId;
		        doThis = doThis.substring(7, hideId.length - 2);

		        // safer than unsafeWindow:
		        location.href = 'javascript:void(' + doThis + '));';
		    }
		}

	}
