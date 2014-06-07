// ==UserScript==
// @name           fumbbl_enhanced_gamefinder
// @namespace      http://userscripts.org/users/58057
// @description    Denotes Black and White listed coaches on Gamefinder
// @include        http://fumbbl.com/FUMBBL.php?page=lfg*
// @author         SeraphimRed
// @version        1.3
// @history		   1.0 13/08/08 - Original script, denotes listed coaches on gamefinder via colour and font size.
//				   1.1 14/08/08 - Added a Hide List to hide coaches on Gamefinder until removed. 
//								- Removed Font Sizing for listed teams.
//								- Default colour for Whitelist is now Green.
//				   1.2 25/08/08 - Refind the coach search criteria, i.e. coach Ro in Robin will not be found
//								- Remove Coach links now added even if the Coach is on GameFinder and (IG)
//				   1.3 25/08/08 - Own teams placed on Gamefinder are no longer listsed amongst WhiteList teams
// ==/UserScript==


/******************************************************
			CONFIG
******************************************************/

var blacklist_colour = "Red";
var whitelist_colour = "Green";
var cache_data_timeout = 300;    // Seconds. Caches data to limit unnecessary hits on the server.

/******************************************************
	utility routines
******************************************************/
//binds an object with a function. useful to store data with a callback (use 'this' in callback to access object)
function bound(func, object) {
	return function() { return func.apply(object, arguments); }
}

//cache script data for periodic data retreval from server
function cache(key, content, timeout) 
{ //timeout in seconds
	if (!timeout) return;
	GM_setValue(' cache '+key, content.toString());
	GM_setValue(' cache '+key+' expiry', ((new Date()).getTime() + (timeout*1000)).toString());	
}

function getCached(key) 
{
	//returns -1 if expired or nothing cached
	var expiry = parseInt(GM_getValue(' cache '+key+' expiry', '0'));
	if ((new Date()).getTime() < expiry) 
	{
		GM_log('cache expires in '+ ((expiry - (new Date()).getTime())/1000)+ ' seconds');
		return GM_getValue(' cache '+key);
	}
	else 
	{
		return -1;
	}
}

//retrieves text/html data from any remote address with a GET request:
// call with one argument, an Object:
//  params required: url (string), callback (function), error_callback (function), onloading_callback (function)
//   callback is sent the retrieved content on success
//   onloading_callback is sent the original params when loading a remote address (as opposed to using cached data)
//   error_callback is sent a responseDetails object on failure 
//    (response status !=200.. or another error. see GM_xmlhttpRequest documentation)
//  params optional: cache_timeout (int seconds), on_error_timeout (int seconds)
//   (on_error_timeout is time to wait after an error. cache will be cleared and subsequent calls will succeed but return blank data)
function getPage(params) {
	var html = getCached(params.url);
	
	if (html != -1) {
		//cache data is still valid and persistent so use this
		params.callback(html);
		return;
	}
	if (params.onloading_callback)
		params.onloading_callback(params);

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: params.url,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html',
	    },
	    onerror: bound(getPageErrorCallback, params),
	    onload: bound(getPageCallback, params)
	});
}
function getPageCallback(responseDetails) {
	if (responseDetails.status != 200)
		getPageErrorCallback.apply(this, [responseDetails]);

	if (this.cache_timeout)
		cache(this.url, responseDetails.responseText, this.cache_timeout);

	this.callback(responseDetails.responseText);
}
function getPageErrorCallback(responseDetails) {
	if (this.error_timeout)
		cache(this.url, '', this.on_error_timeout);

	this.error_callback(responseDetails);
}

//brief notifications
var g_notification = null;
function notify(html, close_btn) {
	if (g_notification) {
      		document.body.removeChild(g_notification);
      		delete g_notification;
      		g_notification = undefined;
	}
	if (!html)
		return;
	GM_log(html);
	
	g_notification = document.createElement('div');
	g_notification.style.position = 'absolute';
	g_notification.style.zIndex = '200000';
	g_notification.style.background = 'black';
	g_notification.style.color = '#00FFFF';
	g_notification.style.font = 'bold 10pt verdana, sans-serif';
	g_notification.style.padding = '2px';
	g_notification.innerHTML = html;
	if (close_btn) {
		var btn = document.createElement('a');
		btn.innerHTML = '<sup style="padding:0px 0px 2px 4px;float:right;color:red;font-weight:bold;font-size:80%;">[x]</sup>';
		btn.href = 'javascript:void(1);';
		g_notification.insertBefore(btn, g_notification.firstChild);
		btn.addEventListener('click', closeNotification, false);
	}
	document.body.appendChild(g_notification);
	repositionNotification();
}
function closeNotification() { notify(); }
//notifications hug top left
function repositionNotification() {
	if (!g_notification)
		return;
	g_notification.style.left = document.body.scrollLeft+'px';
	g_notification.style.top = document.body.scrollTop+'px';
}
document.addEventListener('scroll', repositionNotification, false);

function gamesPageResponseError(responseDetails) {
	notify('Gamefinder error<br>Status '+responseDetails.status+'<br>'+responseDetails.statusText, true);
}
function notifyPageLoad() {
	notify('Loading Lists...');
}

/******************************************************
	application routines
******************************************************/

function addLists() 
{
	getPage({
		url:'http://fumbbl.com/FUMBBL.php?page=lists',
		callback: buildGamefinder,
		error_callback: gamesPageResponseError,
		cache_timeout: cache_data_timeout,
		on_error_timeout: cache_data_timeout,
		onloading_callback: notifyPageLoad
	});
}

function addControls()
{
	var links = document.getElementsByTagName('a');
	
	for(x = 0; x < links.length; x++)
	{
		if(links[x].innerHTML == "Remove all my teams")
		{
			var a = document.createElement('a');
			var node = links[x].parentNode;
			var hideList = GM_getValue('hide_list','');
	      	node.innerHTML += "<br><a href='http://fumbbl.com/FUMBBL.php?page=lfg&enhance&removehidden'>Remove Hidden Coaches</a><br>Hidden Coaches:"+hideList;
		}
	}
}

function buildGamefinder(html) 
{	
	var htmlLists = new Array();
	var whiteList;
	var blackList;
	var hideList = GM_getValue('hide_list','');
	var hidden = location.href.split('&');
	
	closeNotification();
	
	//check url for an enhanced parameter
	if(hidden[1] == 'enhance' && hidden[2] != null)
	{
		if(hidden[2] == 'removehidden')
		{
			hideList = '';
		}
		else
		{
			if(hideList.indexOf(hidden[2]) == -1)
			{
				hideList += hidden[2];
			}
		}
		GM_setValue('hide_list', hideList);	
	}

	htmlLists = html.split('>Whitelist<');
	htmlLists = htmlLists[1].split('>Blacklist<');
	
	if(htmlLists.length==2)
	{
		whiteList = htmlLists[0].match(/\/~([^\"]*)">/g);
		blackList = htmlLists[1].match(/\/~([^\"]*)">/g);

		var rows = document.getElementsByTagName('tr');
		var listed = false;

		for (var x=0; x<rows.length; x++) 
		{
			var links = rows[x].getElementsByTagName('a');
		
			if(links.length == 2 || links.length == 3)
			{
				//hide any coaches marked as such
				if((hideList != '') && (hideList.indexOf('~'+links[1].innerHTML) > -1))
				{
					rows[x].style.display = 'none';
				}
				else
				{	
					//add a hide command to each coach			
					var a = document.createElement('a');
					var str = "~" + links[1].innerHTML + "\">"; //build a delimited search pattern for full match

					a.href = "http://fumbbl.com/FUMBBL.php?page=lfg&enhance&~"+links[1].innerHTML+',';
	      			a.innerHTML = '<sup >(x)</sup>';
	      			a.style.textDecoration='none';

	      			links[1].parentNode.insertBefore(a, links[1].nextSibling);
		      		
		      		//denote listed coaches 
	      			listed = false;

					for (var i=0; i<blackList.length; i++) 
					{
						if(blackList[i].indexOf(str) > -1)
						{
						
							links[1].style.color = blacklist_colour;
							listed = true;
							break;
						}
					}
					if(listed == false)
					{
						for (var i=0; i<whiteList.length; i++) 
						{
							if(whiteList[i].indexOf(str) > -1)
							{
								links[1].style.color = whitelist_colour;
								break;
							}
						}
					}
				}
			}
		} 
	}
	else
	{
		GM_Log("Error Parsing Coach Lists");
	}
	addControls();
}

addLists();