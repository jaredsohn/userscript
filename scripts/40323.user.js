// ==UserScript==
// @name           Facepunch Join Date Adder
// @author         What is Q?
// @description    Uses ajax to get join dates and post counts for facepunch posts.
// @namespace	http://userscripts.org/scripts/show/40323
// @include	http://forums.facepunchstudios.com/*
// @version 	1.8(14.01.2008)
// ==/UserScript==

const memberpage = 'http://forums.facepunchstudios.com/member.php?u=';
const debug_mode = false;
const max_waitajax = 15;

var cachehits = 0;
var cachemisses = 0;
var keepexecuting = true;
var infocache = new Array();
var matchcounter = 0;
var nummatches = 0;
var showday = GM_getValue("showday", false);
if (debug_mode)
{
	GM_registerMenuCommand('Save cache', saveInfo);
	GM_registerMenuCommand('Load cache', loadInfo);
	GM_registerMenuCommand('View cache', function()
											{
												//pickle = GM_getValue("cachedInfo");
													var p = document.createElement("div");												
													p.style.width = "70%";
													p.style.backgroundColor = "white";
													p.style.marginLeft = "auto";
													p.style.marginRight = "auto";
													p.style.padding = "10px";
													for (var x = 0; x<infocache.length; x++)
													{
														if (infocache[x])
															p.innerHTML += x + "->\t" + infocache[x].join(",&nbsp;") + "<br>";													
													}
													//p.innerHTML = pickle;													
													document.body.insertBefore(p, document.body.firstChild);
													window.scrollTo(0,0);
											});
}
GM_registerMenuCommand('FP Join Dates - '+(showday? "Hide" : "Show")+' Day of Month', toggleshowday);
GM_registerMenuCommand('FP Join Dates - Clear Cache', clearcache)
main();

function main()
{
	loadInfo();
	matchcounter++;
	var allposts = document.getElementById("posts").innerHTML;	
	if (!allposts)
	{
		fp_log('No posts div, probably not on a thread page.');
		return;
	}
	var getposts_regexp = /<!-- post #(\d*) -->[^\0]*?href="member.php\?u=(\d*)/g;	
	//this probably isn't the best way to do this, but i'm too lazy to change it now. feel free to modify
	while (arrmatch = getposts_regexp.exec(allposts))
	{
		matchcounter++;
		nummatches++;
		updatePostInfo(arrmatch[1], arrmatch[2], false, true);
		if (!keepexecuting) return;
	}
	matchcounter--;
	window.setTimeout(waitforajax, 2000);
}

function waitforajax()
{
    if ( typeof waitforajax.counter == 'undefined' ) {
        waitforajax.counter = 0;
    }
    waitforajax.counter++; //settimeout with parameters doesn't work so this is a pseudo-static counter

	if (!matchcounter)
	{
		saveInfo();
		GM_log(cachehits + ' cache hits, ' + cachemisses + ' cache misses (' + Math.round(100 * cachehits/(cachehits+cachemisses)) + '%)');
	}
	else if (waitforajax.counter <= max_waitajax)
	{
		window.setTimeout(waitforajax, 2000);
		fp_log('ajax requests are not finished, waiting 2 more seconds (' + waitforajax.counter + ')');
	}
}

function addinfotopost(postid, info, userid)
{
	fp_log('Post ID: '+postid+'\nJoin Date: '+info[0]+'\nPosts: '+info[1]);
	var xpathquery = "//div[@id='posts']/div[@id='edit" + postid + "']/div/div[@class='userinfo']";
	var userInfoNode;
	if ( userInfoNode = document.evaluate(xpathquery, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext() )
	{	
		var datenode = document.createElement('p');
		datenode.style.fontSize = "8pt";
		datenode.style.textAlign = "center";	
		datenode.id =  'refresh'+postid;
		var date = info[0];
		if (!showday) date = date.substring(date.indexOf(' ')+1, date.length);		
		datenode.innerHTML = date;
		userInfoNode.appendChild(datenode);
		//show post count if available
		if (info[1])
		{
			var elapseddays = 999;
			if (info[2] && info[3])
			{
				var now = new Date();
				elapseddays = (now.getTime() - parseFloat(info[3]))/86400000;				
				var postcount = Math.round( parseFloat(info[1]) + elapseddays * parseFloat(info[2]) );
			} else var postcount = info[1];
			
			var postcountnode = document.createElement('a');
			postcountnode.setAttribute('href', '#');
			postcountnode.setAttribute('title', 'Using cached data from ' + (elapseddays<0.5? 'today' : Math.round(elapseddays) + ' day(s) ago') + '. Click to update. (Cached Posts: '+info[1]+', '+info[2]+' per day)');
			postcountnode.setAttribute('onclick', 'return false;');		
			postcountnode.addEventListener('click', function()
														{
															var oldnode = document.getElementById('refresh' + postid);
															oldnode.parentNode.removeChild(oldnode);
															matchcounter++;
															updatePostInfo(postid, userid, true, false);
															waitforajax.counter = 0;
															window.setTimeout(waitforajax, 2000);
														}, true);
			postcountnode.innerHTML = postcount;
			datenode.innerHTML += '<br>';
			datenode.appendChild(postcountnode);
		}		
	}
	else
	{
		fp_log("Couldn't find post container for post #" + postid);	
	}
}

function updatePostInfo(postid, userid, forceupdate, logcache)
{	
	if (keepexecuting)
	{
		if (!forceupdate && infocache[userid] != null)
		{
			if (logcache)
			{
				fp_log('cache hit');
				cachehits++;
			}
			addinfotopost(postid, infocache[userid], userid);
			matchcounter--;
		}
		else
		{
			if (logcache)
			{
				fp_log('cache miss, fetching via ajax');
				cachemisses++;
			}		
			ajax_updatePostInfo(postid, userid);			
		}
	}
}

function ajax_updatePostInfo(postid, userid)
{
	if (keepexecuting)
	{
		if (!userid) return false;
		if (!GM_xmlhttpRequest)
		{
			alert('Your version of GreaseMonkey is outdated. This script will not work until it is updated.');
			keepexecuting = false;
			return;
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: memberpage + userid,
			onload: function(responseDetails)
			{		
				if (responseDetails.status == 200)
				{
					waitforajax.counter = 0;
					var regex = /"shade">Total Posts:<\/span> ([\d,]*)[^\0]*?Per Day:<\/span> ([\d.]*)[^\0]*?Join Date:<\/span> ([\d\w ]*)/;
					var match = regex.exec(responseDetails.responseText);
					if (match != null && match.length > 1)
					{
						var now = new Date();
						//[0] join date, [1] post count, [2] posts per day, [4] current unix time (in ms)
						infocache[userid] = [match[3], parseInt(match[1].replace(/,/g,"")), parseFloat(match[2]), now.getTime()];
						if (postid != null) updatePostInfo(postid, userid, false, false);
					}
					else
					{
						fp_log('Could not parse profile page. Stopping script...');
						keepexecuting = false;
					}
				}
				else //invalid http response
				{
					fp_log('Could not get profile page.');
					keepexecuting = false;
				}
			},
			onerror: function(responseDetails)
			{
				fp_log('Ajax Error, stopping script...');
				keepexecuting = false;			
			}
		});
	}
}

function saveInfo()
{
	fp_log('serializing...');
	var pickle = "";
	for (var i = 0; i < infocache.length; i++)
	{
		if (infocache[i])
		{
			pickle += i + ':' + infocache[i].join(';') + '/';
		}
	}
	GM_setValue("cachedInfo", pickle);
}
function loadInfo()
{
	var pickle;
	if (pickle = GM_getValue("cachedInfo"))
	{
		fp_log(pickle);
		var user = pickle.split('/');
		for (var i = 0; i < user.length; i++)
		{
			var t = user[i].split(':');
			if (t[0])
			{
				infocache[parseInt(t[0])] = t[1].split(';');
				//fp_log( t[0] + ' -> ' + t[1] );
			}
		}
	}
}
function clearcache()
{
	GM_setValue("cachedInfo", "");
	alert('Cache cleared.');
}
function fp_log(s)
{
	if (debug_mode) GM_log(s);
}

function toggleshowday()
{	
	GM_setValue("showday", !showday);
	window.location.reload();
}