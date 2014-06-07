// ==UserScript==
// @name           Facebook Mafia Wars News Feed Processor RELOADED
// @description    Accepts Mafia Wars job help requests
// @namespace      Facebook
// @version        0.2.30
// @include        http://www.facebook.com/home.php?filter=app_10979261223
// ==/UserScript==

/***** TODO *****/
// - Visual Settings
// - Achievement bonuses
// - Flag for 25 limit that will be reset 24h later.

/*****	config	*****/
/*****
    These values are set in oSettings directly below
    
    MinReloadWait       The shortest time to wait before reloading the feed automatically (in seconds)
                        Default: 5
    MaxReloadWait       The longest time to wait before reloading the feed automatically (in seconds)
                        Default: 10
    ShowOnlyJobs        Remove any message that's not a help/job request
                        Default: false
                        true|false
    UnCollapse          Will retrieve potential jobs/boosts from behind "SHOW X SIMILAR POSTS" items.
    DeleteComp		Remove processed jobs and bonuses from screen?
    DoBoosts		Attempt to grab Boosts if True, otherwise ignore them and filter out of feed.
    NextURL             If using an script on the req page, the URL pattern to trigger it
                        A valid URL (would be helpful) | set to '' to disable
    NextURLDelay        If you are using an auto-req page script, how often to go there (in minutes)
                        Default: 20
    UseScreenLog        Do you want to use the on-screen log?
                        Default: true
                        true|false
    ScreenLogSize       How many rows do you want int he on-screen log?
                        Default: 50
    LogThreshold        How much info do you want logged (in the FF logs)?
                        Default: 10
                        < 10 = script start/stop entries
                        10 = basic info
                        20 = process level actions (who you helped with what and where)
                        30 = everything relevant
                        > 50 = for debugging/dev only...its log-spam-tacular
*****/

// MARDL new MWURL_ constants
var SCRIPT = {
  url: 'http://userscripts.org/scripts/source/59850.user.js',
  version: '0.2.30',
  name: 'inthemafia',
  appID: 'app10979261223',
  MWURL_FB: 'http://apps.facebook.com/inthemafia/track.php?',
  MWURL_ZY: 'http://mwfb.zynga.com/mwfb/remote/html_server.php?'
};

oSettings =
{
	MinReloadWait : 3,   // in seconds
	MaxReloadWait : 8,  // in seconds
	ShowOnlyJobs  : false,
	UnCollapse    : true,
	GetAchiev     : false,
	DeleteComp    : false,
	DoBoosts      : true,
	NextURL       : '',
	NextURLDelay  : 20,  // in minutes
	UseScreenLog  : true,
	ShowSettings  : true,
	ScreenLogSize : 25,
	LogThreshold  : 10
}

/*****	global vars *****/
var	// used in development...spams logs a lot (=
	g_bDebugMode = false,
	// Feed variables
	// used to store newest story publish time
	g_NewestStoryTime = "",
	// Refresh URL
	g_refreshURL = "",
	// Feed Data
	g_myFeedData = "",
	// Used to store new story count
	g_NewStoryCount = "",
	// used to que settimeouts
	g_iCurDelay = 0,
	// the event listener obj
	g_ListenerLib = new ListenerLib(),
	// the screen log
	g_ScreenLog = new ScreenLog(),
	g_DOMUtils = new DOMUtils(),
	g_Utils = new Utilities(),
	g_Process = new Process(),
	
	// making the oSettings easier
	g_iMinReloadWait = oSettings.MinReloadWait,
	g_iMaxReloadWait = oSettings.MaxReloadWait,
	g_strNextURL = oSettings.NextURL,
	g_iNextURLDelay = oSettings.NextURLDelay,
	g_bUseScreenLog = oSettings.UseScreenLog,
	g_bShowSettings = oSettings.ShowSettings,
	g_iScreenLogSize = oSettings.ScreenLogSize,
	g_iLogThreshold = oSettings.LogThreshold,
	g_bUnCollapse = oSettings.UnCollapse;

/*****	begin	*****/
// see if we need to init the GM vars
if(!myGetValue('bInitialized', false) || g_bDebugMode || SCRIPT.version != myGetValue('lastVersion', '0.0.0'))
	Init();

// this starts the whole process once the DOM is loaded
window.addEventListener('load', g_ListenerLib.proc_Start, false);
	
/*****	script management	*****/
// register GM menu commands
GM_registerMenuCommand('MWNFP: Reinitialize script level variables', g_ListenerLib.menu_Reinit);

// 
if (myGetValue('bShowOnlyJobs', oSettings.ShowOnlyJobs))
	GM_registerMenuCommand('MWNFP: Show all feed posts.', g_ListenerLib.menu_ShowAll);
else
	GM_registerMenuCommand('MWNFP: Filter feed posts.', g_ListenerLib.menu_ShowJobs);

if (myGetValue('bDoBoosts', oSettings.DoBoosts))
	GM_registerMenuCommand('MWNFP: DO NOT get boosts.', g_ListenerLib.menu_DontBoosts);
else
	GM_registerMenuCommand('MWNFP: DO get boosts.', g_ListenerLib.menu_DoBoosts);

/* Dynamic when it works correctly MARDL
if (myGetValue('bDoAchievements', oSettings.GetAchiev))
	GM_registerMenuCommand('MWNFP: DO NOT get achievement bonuses.', g_ListenerLib.menu_DontAchievements);
else
	GM_registerMenuCommand('MWNFP: DO get achievement bonuses.', g_ListenerLib.menu_DoAchievements);
*/

if (myGetValue('bDeleteComp', oSettings.DeleteComp))
	GM_registerMenuCommand('MWNFP: Leave processed items in feed.', g_ListenerLib.menu_DontDeleteComp);
else
	GM_registerMenuCommand('MWNFP: Remove processed items from feed.', g_ListenerLib.menu_DoDeleteComp);

// Own GetValue with try catch
function myGetValue(_value,_default)
{
	try
	{ 	
		g_Utils.doLog('146:myGetValue', 20, 'GM_getValue:'+_value, false);
		return GM_getValue(_value, _default);
	}
	catch(_errObj)
	{
		// fallback to reload just in case
		g_Utils.doLogError('152:myGetValue', 'Greasemonkey GM_getValue fails:'+_value, _errObj, false);
		setTimeout('window.location.reload(true)', 1000);
	}
}

// initializes script (GM) variables
function Init()
{
	if(g_bDebugMode)
		g_iLogThreshold = 100;
	
	g_Utils.doLog('148:Script initialization', 0, 'Initializing...', false);

	GM_setValue('lastVersion', SCRIPT.version);

	// If user previously made changes to settings, attempt to retrieve these. If this fails, default to settings above.
	GM_setValue('bShowOnlyJobs', myGetValue('bShowOnlyJobs', oSettings.ShowOnlyJobs));
	GM_setValue('bDoBoosts', myGetValue('bDoBoosts', oSettings.DoBoosts));
	GM_setValue('bDoAchievements', myGetValue('bDoAchievements', oSettings.GetAchiev));	
	GM_setValue('bDeleteComp', myGetValue('bDeleteComp', oSettings.DeleteComp));
	

	
	GM_setValue('iLastReload', 0);
	GM_setValue('aJobLog', '');
	// how long to hold previous job assist records held in aJobLog
	GM_setValue('iPurgeTime', 30);
	// URL/remoting references
	GM_setValue('strHeaderInfo', '{ "User-Agent": "Mozilla/5.0", "Accept": "text/xml" }');
	// xpath patterns
	/******
 		strHTPat	gets the help text (link to click, job name, etc)
		strBoost	gets the boost text
 		strNHTPat	gets all non-help, non-boost related posts
		strRLLPat	where the hidden feed reload link lives...
	*****/					 
	// text in "UIStoryAttachment"
	GM_setValue('strHTPat', "//div[@class='GenericStory_Body' and (contains(., 'requested help') or contains(., 'needs help to')) and not(contains(., 'MWFP:'))]");
	GM_setValue('strBoost', "//div[@class='GenericStory_Body' and contains(., 'special bonus') and not(contains(., 'MWFP:'))]");
	GM_setValue('strAchiv', "//div[@class='GenericStory_Body' and contains(., 'achievement and wants') and not(contains(., 'MWFP:'))]");
	GM_setValue('strNHTPat', "//div[@class='UIIntentionalStream_Content UIStream']//div[contains(@id, 'div_story_') and contains(@class, 'aid_') and not(contains(., 'special bonus')) and not(contains(., 'requested help')) and not(contains(., 'needs help to')) and not(contains(., 'achievement and wants'))] ");
	GM_setValue('strDelJobsPat', "//div[@class='UIIntentionalStream_Content UIStream']//div[contains(@id, 'div_story_') and contains(@class, 'aid_') and contains(., 'MWFP:')]");
	GM_setValue('strRLLPat', "//div[@class='UIShowMore_ShowMore']");
	// logging info  (screen log)
	GM_setValue('strLogTable', '');
	// yada
	GM_setValue('bInitialized', true);
}

// i like meat
function Process()
{
	this.procContent = procContent;
	
	// gets new content to parse
	function loadContent()
	{
		var	oResults,
			eFBAnchor,
			eNewButton,
			eNewAnchor,
			eContainer;
			
			
		g_Utils.doLog('201:Content loader', 0, 'Starting looking for jobs & bonuses...', false);
		try
		{ 	
			if(!g_DOMUtils.getElem('NFAP_FBRLBlock'))
			{
				eContainer = g_Utils.getSnapshot("//div[@class='UIIntentionalStream_Content UIStream']");
				eContainer.snapshotItem(0).id = 'NFAP_FBStreamBlock';

				oResults = g_Utils.getSnapshot(myGetValue('strRLLPat'));
				oResults.snapshotItem(0).id = 'NFAP_FBRLBlock';
				oResults.snapshotItem(0).setAttribute('style', 'display:block;');
				
				eFBAnchor = oResults.snapshotItem(0).getElementsByTagName('a')[0];
				
				eNewButton = g_DOMUtils.getElem('NFAP_RLButton')
				eNewButton.type = 'button';
			}
			// since it's already there, show it and click the button
			g_DOMUtils.getElem('NFAP_ProcessRuningTitle').innerHTML = '<b>Looking for jobs & bonuses...</b>'; 
			// Our lovely refresh URL
			g_Utils.doLog('221:Mafia Wars Feed Processor', 20, 'Newest Story Publish Time: ' +g_NewestStoryTime + '.', false);
			g_refreshURL = "http://www.facebook.com/ajax/intent.php?filter=app_10979261223&newest=" + g_NewestStoryTime + "&hidden_count=1&ignore_self=false&load_newer=true&request_type=1&__a=1";
			g_Utils.doLog('223:Mafia Wars Feed Processor', 20, 'URL about to be retrieved: '+g_refreshURL+'.', false);
		    g_Utils.getURL(g_refreshURL,refreshContent);
			
		}
		catch(_errObj)
		{
			// fallback to reload just in case
			g_Utils.doLogError('230:Content loader', 'There was an error getting new content from FB...reloading the page.', _errObj, false);
			setTimeout('window.location.reload(true)', 1000);
		}
	}
	
	
	function refreshContent(_oHelpDetails)
	{

		// MARDL Check if Script startet		
		var firstStart;
		firstStart = g_NewestStoryTime == "";
		
		// Load feed data to variable
		
		g_myFeedData = _oHelpDetails.responseText.toString();
		// Check New Story count  {"storyCount":0,"hiddenCount"
		if(g_myFeedData.toLowerCase().indexOf('storycount') >= 0)
		{
			g_NewStoryCount = g_myFeedData.split('{"storyCount":')[1].split(',"')[0];
			g_Utils.doLog('249:Mafia Wars Feed Processor', 20, 'Newest Story Count: ' +g_NewStoryCount , false);
		}
		else
		{
			g_NewStoryCount = "0";
			g_Utils.doLog('255:Mafia Wars Feed Processor', 20, 'Newest Story Count = 0: ' +g_myFeedData , false);
		}
		// Feedback to user
		g_DOMUtils.getElem('NFAP_ProcessRuningTitle').innerHTML = '<b>Feed loaded: ' + g_NewStoryCount + ' new stories.</b>';
		// Skip these if new story count is zero because text is not in feed and will trigger exception, wastes time and puts garbage on screen
		if(g_NewStoryCount != "0")
		{
        		// Keep what we need
        		g_myFeedData = g_myFeedData.split('"html":"')[1];
        		g_myFeedData = g_myFeedData.split(',"oldestStoryTime')[0];
        		// Get newest story time for next feed refresh
        		g_NewestStoryTime = g_myFeedData.split('"newestStoryTime":')[1];
        		// cut neweststory data from feed data
        		g_myFeedData = g_myFeedData.split('","newestStoryTime')[0];
		}
      		// Do some fixing up
      		// The \n
      		g_myFeedData = g_myFeedData.replace(/\\n/img,String.fromCharCode(10));
      		// The rest of the \\
      		g_myFeedData = g_myFeedData.replace(/\\/img,"");
      		// Quotations
      		g_myFeedData = g_myFeedData.replace(/&quot;/img,"'");
      		// Ampersands
      		g_myFeedData = g_myFeedData.replace(/&amp;/img,"&");     
		// Skip if no new stories
		if(g_NewStoryCount != "0")
		{
        		// Display feed data on screen
        		if (firstStart) 
        		{
        			// MARDL First start, Show komplett stream
        			g_DOMUtils.getElem('NFAP_FBStreamBlock').innerHTML = g_myFeedData;
        		}
        		else
	        	{
	        		// MARDL Not First start, then save feed and set the new one bevor
        			var temp;
        			temp = g_DOMUtils.getElem('NFAP_FBStreamBlock').innerHTML;
        			g_DOMUtils.getElem('NFAP_FBStreamBlock').innerHTML = g_myFeedData + temp;
	        		
	        	}
		}
      		// Process it
		startProcContent();
		
		// Clear the variable to prevent re-use of identical data in case feed load failed
		g_myFeedData = "";
	}

	
	function startProcContent()
	{
		procContent();
		
		g_DOMUtils.getElem('NFAP_ProcessRuningTitle').innerHTML = '&nbsp;';
	}
	function procContent()
	{
		var	oJobResults,
			oNonHelpMsgs;
		// should happen first 
		if(isNextURLTimeout())
			return;
		
		g_iCurDelay = 0;

		// Uncollapse posts not currently showing on the wall
		if(g_bUnCollapse)
		{
                	var collapsedStories = g_Utils.getSnapshot("//div[@class='UIIntentionalStory_CollapsedStories']");
                	if(collapsedStories.snapshotLength > 0)
                	{
				g_Utils.doLog('318:Mafia Wars Feed Processor', 10, 'UnCollapse ' + collapsedStories.snapshotLength + ' stories...', false);
                		for(var i = 0; i < collapsedStories.snapshotLength; i++)
	          		{
                			if(collapsedStories.snapshotItem(i) != null)
                			{
          				var showLink = collapsedStories.snapshotItem(i).getElementsByTagName('a')[0];
          				var eNewButton = showLink.appendChild(document.createElement('input'));
          				eNewButton.id = 'myShowPost';
          				eNewButton.type = 'button';
          				eNewButton.setAttribute('style', 'display:none;');
          				eNewButton.setAttribute('onclick', showLink.getAttribute('onclick'));
          				document.getElementById('myShowPost').click();
          				eNewButton.id = 'myShowPostDone';
                			}
                		}
                	}
		}

		// show only jobs and bonuses?
		if(myGetValue('bShowOnlyJobs', oSettings.ShowOnlyJobs) && (oNonHelpMsgs = g_Utils.getSnapshot(myGetValue('strNHTPat'))).snapshotLength > 0)
		{
			g_Utils.doLog('339:Mafia Wars Feed Processor', 10, 'Show Only Jobs is ON so delete ' + oNonHelpMsgs.snapshotLength + ' non jobs...processing.', false);
			for(var i = 0; i < oNonHelpMsgs.snapshotLength; i++)
				oNonHelpMsgs.snapshotItem(i).parentNode.removeChild(oNonHelpMsgs.snapshotItem(i));
		}

		try
		{
			// get the job results and process
	
			oJobResults = g_Utils.getSnapshot(myGetValue('strHTPat'));
			if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('351:Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' new jobs...processing.', false);
				for(var i = 0; i < oJobResults.snapshotLength; i++)
					oJobResults.snapshotItem(i) != null ? procJob(oJobResults.snapshotItem(i)) : null;
	
				// all done...
				setTimeout(function(){ g_Utils.doLog('356:Mafia Wars Feed Processor', 10, 'All jobs processed.', false); }, g_Utils.addDelay(1));
			}
			else
			{
				g_Utils.doLog('360:Mafia Wars Feed Processor', 10, 'No new jobs found.', false)
			}
		}
		catch(_errObj)
		{
			// fallback to reload just in case
			g_Utils.doLog('366:Mafia Wars Feed Processor', 10, 'Failed to find Jobs. Pattern changed? '+myGetValue('strHTPat'), true);
			g_Utils.doLogError('367:procContent', 'Error while getSnapshot ans so on:'+myGetValue('strHTPat'), _errObj, false);
		}

		// get the bonus results and process
		if(myGetValue('bDoBoosts', oSettings.DoBoosts)) // 
		{
			oJobResults = 0;
			oJobResults = g_Utils.getSnapshot(myGetValue('strBoost'));
			
			if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('378:Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' new bonuses... processing.', false);
				for(var i = 0; i < oJobResults.snapshotLength; i++)
					oJobResults.snapshotItem(i) != null ? procBoost(oJobResults.snapshotItem(i)) : null;

				// all done...
				setTimeout(function(){ g_Utils.doLog('383:Mafia Wars Feed Processor', 10, 'All bonuses processed.', false); }, g_Utils.addDelay(1));
			}
			else
			{
				g_Utils.doLog('387:Mafia Wars Feed Processor', 10, 'No new bonuses found.', false)
			}

		}

		// get the achievement results and process
		if(myGetValue('bDoAchievements', oSettings.GetAchiev)) // 
		{
			oJobResults = 0;
			oJobResults = g_Utils.getSnapshot(myGetValue('strAchiv'));
			if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('399:Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' new achievements... processing.', false);
				for(var i = 0; i < oJobResults.snapshotLength; i++)
					oJobResults.snapshotItem(i) != null ? procAchievement(oJobResults.snapshotItem(i)) : null;

				// all done...
				setTimeout(function(){ g_Utils.doLog('404:Mafia Wars Feed Processor', 10, 'All achievements processed.', false); }, g_Utils.addDelay(1));
			}
			else
			{
				g_Utils.doLog('408:Mafia Wars Feed Processor', 10, 'No new achievements found.', false)
			}

		}

		// Delete processed jobs after doing all jobs! 
		if(myGetValue('bDeleteComp', oSettings.DeleteComp))
		{
			oJobResults = 0;
			oJobResults = g_Utils.getSnapshot(myGetValue('strDelJobsPat'));
	    		if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('420:Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' processed items... deleting.', false);
				for(var i = 0; i < oJobResults.snapshotLength; i++)
					oJobResults.snapshotItem(i).parentNode.removeChild(oJobResults.snapshotItem(i));
			}
		}

		// set up the next iteration...
		setTimeout(loadContent, g_Utils.addDelay((g_Utils.getRandRange(g_iMinReloadWait, g_iMaxReloadWait) * 1000)));
	}
	
	// uh, this does jobs? (=
	function procJob(_nJob)
	{
		var	aOldKey = new Array(),
			reKey = new Array(),
			aJobLog = myGetValue('aJobLog','').split('|'),
			fnSendToTimeout,
			oNextTimeout;

      		try
      		{
        			if(_nJob != null)
        			{
                		// already dealt with this one
                		if(_nJob.innerHTML.indexOf('NFAP_FeedMsg') > -1)
                			return;

                    	if(_nJob.innerHTML.indexOf('target_id%22%3A%22') == -1)
                    	{
	    					return;
                    	}
                    	// MARDL New iJobID to identify the job once
        				var oJob = 
        				{
							iJobID : _nJob.innerHTML.split('sendkey=')[1].split('%')[0],
        					iFriendId : _nJob.innerHTML.split('target_id%22%3A%22')[1].split('%')[0],
        					strMsgTitle : '<div id="NFAP_FeedMsg" style="color:{0};font-weight:bold;">{1}</div>',
        					strMsgContent : '',
        					strJob : _nJob.innerHTML,
	    					strNewInnerHTML : _nJob.innerHTML,
        					strResult : null,
	    					strMessage : '',
        					iCode : -1,
        					iCity : 1,
        					iXp : -1,
        					iMoney : -1
        				};
        						
      					// Figure out what city it is 
      					if (oJob.strJob.indexOf('request_job_help_short_cuba') != -1)
      					{
                        			oJob.iCity = 2;
                        		}
                        		else if (oJob.strJob.indexOf('give_help_moscow') != -1)
                        		{
                        			oJob.iCity = 3;
                        		}
                        		else
                    			{
                        			oJob.iCity = 1;
                    			}
                        
                        		// MARDL New iJobID to identify the job once
                        		reKey.push(oJob.iFriendId, '[\\d]+', oJob.iJobID, '-?[\\d]+', '-?[\\d]+')
                        		reKey = new RegExp(reKey.join(':'));
                        		aOldKey = myGetValue('aJobLog','').match(reKey);
                        		// we have helped them before, deal with the key as needed
                        		if(aOldKey)
                        		{
                        			aOldKey = aOldKey.toString().split(':');
                        			// checked if it's expired
                        			if(aOldKey[1] <= (g_Utils.getCurrentTime() - myGetValue('iPurgeTime', 60)))
                        			{
                        				aJobLog.splice(aJobLog.indexOf(aOldKey.join(':')), 1);
                        				GM_setValue('aJobLog', aJobLog.join('|'));
                        			}
                        			else if(aOldKey[2] == oJob.iJobID) // MARDL New iJobID to identify the job once
                        			{
                        				oJob.iCode = aOldKey[3];
                        				oJob.iXp = aOldKey[4];
                        				oJob = procJobObj(oJob);
                        				if (oJob.iCode > -1) // checked, if last process work right 
                        				{
                        					_nJob.innerHTML = "Again:"+oJob.strNewInnerHTML;
                        					return;
                        				}
                        			}
                        		}
                        		// sent to the initial timeout...
                        		fnSendToTimeout = function()
                        		{
		                			// MARDL search direkt to MWURL_
		                			var	strTrackURL = SCRIPT.MWURL_FB + oJob.strJob.split('<a href="'+SCRIPT.MWURL_FB)[1].split('"')[0].replace(/&amp;/g, '&'),
                        				fnTrackingURLCallback,
                        				fnHelpURLCallback,
                        				aNewKey = new Array(oJob.iFriendId, g_Utils.getCurrentTime(), oJob.iJobID); // MARDL New iJobID to identify the job once

										strTrackURL = g_Utils.formatForZynka(strTrackURL);
                        			
                        			fnTrackingURLCallback = function(_oTrackingDetails)
                        			{
		          						if(_oTrackingDetails.responseText.toString().split('top.location.href = "')[1] != null)
		          						{
		          	        				//var	strHelpURL = _oTrackingDetails.responseText.toString().split('top.location.href = "')[1].split('"')[0];
		          	        				var	strHelpURL = unescape(_oTrackingDetails.responseText.toString().split('&next=')[1].split('"')[0]);
		          	        				
		          	        				// Fix Cuba city just in case Zynga farted again
		          	        				if(oJob.iCity == 2)
		          	        				{
										// Sample Facebook/Facebook Mafia Wars News Feed Processor RELOADED: http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id=1850487210&job_city=1&skip_interstitial=1&sendtime=1258660701&friend=1850487210
		          	        					strHelpURL = strHelpURL.replace("job_city=1","job_city=2");
		          	        				}
		          	        			}
		          	        			else
		          	        			{
		          	        				g_Utils.doLog('533:Mafia Wars Feed Processor - fnTrackingURLCallback', 0, 'procJob encountered error processing this: ' + _oTrackingDetails.responseText.toString(), false)
		          	        			}
                        				strHelpURL = strHelpURL + '&skip_req_frame=1';
                        				g_Utils.doLog('536:Track URL callback', 20, strHelpURL, false);
                        				g_Utils.getURL(strHelpURL, fnHelpURLCallback); 
                        			}
                        			fnHelpURLCallback = function(_oHelpDetails)
                        			{
                        				oJob.strResult = _oHelpDetails.responseText.toString();
          								g_Utils.doLog('542:Mafia Wars Feed Processor - procJob', 20, 'Server response: ' + oJob.strResult, false);
                        				// Process response from server
                        				oJob = procJobObj(oJob);
                        				switch (oJob.iCode)
                        				{
                        					case 0 : // yes, you really missed it QQ
                        						g_ScreenLog.addStat('NFAP_Stats_JobsMissed', 1);
                        						if (oJob.iMoney != -1)
                        						{
	                        						g_ScreenLog.addStat('NFAP_Stats_MoneyGain_NY', oJob.iMoney);
	                        					}
                        					break;
                        					case 1 : // not active...need to explore this more
                        						// do nothing for now...
                        					break;
                        					case 4 : // success
                        						g_ScreenLog.addStat('NFAP_Stats_JobsCompleted', 1);
			          							if(oJob.iCity == 1)
			          							{
			          								g_ScreenLog.addStat('NFAP_Stats_MoneyGain_NY', oJob.iMoney);
			          							}
			          							else if(oJob.iCity == 2)
			          							{
			          								g_ScreenLog.addStat('NFAP_Stats_MoneyGain_CU', oJob.iMoney);
			          							}
			          							else if(oJob.iCity == 3)
			          							{
			          								g_ScreenLog.addStat('NFAP_Stats_MoneyGain_RU', oJob.iMoney);
			          							}
                        						g_ScreenLog.addStat('NFAP_Stats_XPGain', oJob.iXp);
                        					break;
                        					case 5 : // blocked by Zynga (25 limit)
                        						g_ScreenLog.addStat('NFAP_Stats_BlockedJobs', 1);
                        					break;
                        				}
           								// Just set to success, wenn job is complett 
										if (oJob.iCode > -1)
										{
	                        				aNewKey.push(oJob.iCode, oJob.iXp);
	                        				aJobLog.push(aNewKey.join(':'));
	                        				GM_setValue('aJobLog', aJobLog.join('|'));
	                        				_nJob.innerHTML = oJob.strNewInnerHTML;
											if (oJob.iCode != 3) //Already received
		                        				g_Utils.doLog('585:Help URL callback', 20, oJob.strMessage, true);
	                        			}
                        			}
                        			
                        			g_Utils.getURL(strTrackURL, fnTrackingURLCallback);
                        		}
			      		setTimeout(fnSendToTimeout, g_Utils.addDelay(1000));
                        	}
                }
                catch(myException)
                {
			g_Utils.doLog('598:Mafia Wars Feed Processor - procJob', 0, 'While processing job, the following exception ocured: \n\r\nError name: ' + myException.name + '\n\rError message: ' + myException.message+'\n\rJOB: '+oJob.strJob, true)
                }
	}


	function procBoost(_nBoost)
	{
		var	aOldKey = new Array(),
			reKey = new Array(),
			aJobLog = myGetValue('aJobLog','').split('|'),
			fnSendToTimeout,
			oNextTimeout;

		try
		{
			if(_nBoost != null)
			{
    				g_Utils.doLog('615:Mafia Wars Feed Processor - procBoost', 20, 'Feed Boost HTML code: '+_nBoost.innerHTML, false)
            		// already dealt with this one
            		if(_nBoost.innerHTML.indexOf('NFAP_FeedMsg') > -1)
            			return;

                	if(_nBoost.innerHTML.indexOf('friend_id%22%3A%22') == -1)
    					return;

    					
    				// MARDL New iJobID to identify the job once
    				var oJob = 
    				{
						iJobID : _nBoost.innerHTML.split('sendkey=')[1].split('%')[0],
						iFriendId : _nBoost.innerHTML.split('friend_id%22%3A%22')[1].split('%')[0],
    					strMsgTitle : '<div id="NFAP_FeedMsg" style="color:{0};font-weight:bold;">{1}</div>',
    					strMsgContent : '',
    					strBoost : _nBoost.innerHTML,
    					strNewInnerHTML : _nBoost.innerHTML,
    					strResult : null,
    					strMessage : '',
    					iCity : 0,
    					iCode : -1,
    					iXp : 0,
    				};
        
        				// MARDL New iJobID to identify the job once
                		reKey.push(oJob.iFriendId, '[\\d]+', oJob.iJobID, '-?[\\d]+', '-?[\\d]+')
                		reKey = new RegExp(reKey.join(':'));
                		aOldKey = myGetValue('aJobLog','').match(reKey);
                		// MARDL try boosts evertime
                		if(aOldKey)
                		{
                			aOldKey = aOldKey.toString().split(':');
                			// checked if it's expired
                			if(aOldKey[1] <= (g_Utils.getCurrentTime() - myGetValue('iPurgeTime', 60)))
                			{
                				aJobLog.splice(aJobLog.indexOf(aOldKey.join(':')), 1);
                				GM_setValue('aJobLog', aJobLog.join('|'));
                			}
                			else if(aOldKey[2] == oJob.iJobID) // MARDL New iJobID to identify the job once
                			{
                				oJob.iCode = aOldKey[3];
                				_nBoost.innerHTML = "Again:"+procBoostObj(oJob).strNewInnerHTML;
                				return;
                			}
                		}
                		// sent to the initial timeout...
                		fnSendToTimeout = function()
                		{
                			// MARDL search direkt to MWURL_
                			var	strTrackURL = SCRIPT.MWURL_FB + oJob.strBoost.split('<a href="'+SCRIPT.MWURL_FB)[1].split('"')[0].replace(/&amp;/g, '&'),
                				fnTrackingURLCallback,
                				fnHelpURLCallback,
                				aNewKey = new Array(oJob.iFriendId, g_Utils.getCurrentTime(), oJob.iJobID); // MARDL New iJobID to identify the job once
                			
								strTrackURL = g_Utils.formatForZynka(strTrackURL);
                			
                			fnTrackingURLCallback = function(_oTrackingDetails)
                			{
	        					if(_oTrackingDetails.responseText.toString().split('top.location.href = "')[1] != null)
	        					{
        	        				//var	strHelpURL = _oTrackingDetails.responseText.toString().split('top.location.href = "')[1].split('"')[0];
          	        				var	strHelpURL = unescape(_oTrackingDetails.responseText.toString().split('&next=')[1].split('"')[0]);
        	        			}
        	        			else
        	        			{
      								g_Utils.doLog('680:Mafia Wars Feed Processor - procBoost', 0, 'Encountered error processing this: ' + _oTrackingDetails.responseText.toString(), false)
        	        			}
                				
                   				strHelpURL = strHelpURL + '&skip_req_frame=1';
                				g_Utils.doLog('683:Track URL callback', 20, strHelpURL, false);
                				g_Utils.getURL(strHelpURL, fnHelpURLCallback); 
                			}
                			fnHelpURLCallback = function(_oHelpDetails)
                			{
                				oJob.strResult = _oHelpDetails.responseText.toString();
        					g_Utils.doLog('689:Mafia Wars Feed Processor - procBoost', 20, 'Server response: ' + oJob.strResult, false);
                      				// Process response from server
                				oJob = procBoostObj(oJob);
                				switch (oJob.iCode)
                				{
                					case 0 : // yes, you really missed it QQ
                						 // let it be
                					break;
                					case 1 : // Already received
                						// do nothing for now...
                					break;
                					case 2 : // success
                						g_ScreenLog.addStat('NFAP_Stats_BonusesGain', 1);
                					break;
                					case 3 : // non-friend?!
                						 // who knows?
                					break;
                				}

						// Just set to success, wenn job is complett 
						if (oJob.iCode > -1)
						{
        	        				aNewKey.push(oJob.iCode, oJob.iXp)
	                				aJobLog.push(aNewKey.join(':'));
                					GM_setValue('aJobLog', aJobLog.join('|'))
                					_nBoost.innerHTML = oJob.strNewInnerHTML;
									if (oJob.iCode != 1) //Already received
                						g_Utils.doLog('716:Help URL callback', 20, oJob.strMessage, true);
                				}
                			}
                			
                			g_Utils.getURL(strTrackURL, fnTrackingURLCallback);
                       		}
       		      		setTimeout(fnSendToTimeout, g_Utils.addDelay(1000));
                       	}
                }
                catch(myException)
                {
					g_Utils.doLog('272:Mafia Wars Feed Processor - procBoost', 0, 'While processing boost, the following exception ocured: \n\r\nError name: ' + myException.name + '\n\rError message: ' + myException.message+'\r\n innerhtml:'+_nBoost.innerHTML, true)
                }
	}

	function procAchievement(_nAchievement)
	{
		var	aOldKey = new Array(),
			reKey = new Array(),
			aJobLog = myGetValue('aJobLog','').split('|'),
			fnSendToTimeout,
			oNextTimeout;

		try
		{
			if(_nAchievement != null)
			{
    				g_Utils.doLog('743:Mafia Wars Feed Processor - procAchievement', 20, 'Feed Achievement HTML code: '+_nAchievement.innerHTML, false)
                		// already dealt with this one
                		if(_nAchievement.innerHTML.indexOf('NFAP_FeedMsg') > -1)
                			return;

				// if no friend id abort
	                      	if(_nAchievement.innerHTML.indexOf('sharer%22%3A%22') == -1)
    					return;
    					
				// setup 
				// MARDL New iJobID to identify the job once
    				var oAchievement = 
    				{
						iJobID : _nAchievement.innerHTML.split('sendkey=')[1].split('%')[0],
						iFriendId : _nAchievement.innerHTML.split('sharer%22%3A%22')[1].split('%')[0],
    					strMsgTitle : '<div id="NFAP_FeedMsg" style="color:{0};font-weight:bold;">{1}</div>',
    					strMsgContent : '',
    					strAchievement : _nAchievement.innerHTML,
    					strNewInnerHTML : _nAchievement.innerHTML,
    					strResult : null,
    					strMessage : '',
    					iCity : 0,
    					iCode : -1,
    					iXp : 0,
    				};
        
        				// MARDL New iJobID to identify the job once
                		reKey.push(oAchievement.iFriendId, '[\\d]+', oAchievement.iJobID, '-?[\\d]+', '-?[\\d]+')
                		reKey = new RegExp(reKey.join(':'));
                		aOldKey = myGetValue('aJobLog','').match(reKey);
                		// MARDL try Achievements evertime
                		if(aOldKey)
                		{
                			aOldKey = aOldKey.toString().split(':');
                			// checked if it's expired
                			if(aOldKey[1] <= (g_Utils.getCurrentTime() - myGetValue('iPurgeTime', 60)))
                			{
                				aJobLog.splice(aJobLog.indexOf(aOldKey.join(':')), 1);
                				GM_setValue('aJobLog', aJobLog.join('|'));
                			}
                			else if(aOldKey[2] == oAchievement.iJobID) // MARDL New iJobID to identify the job once
                			{
                				oAchievement.iCode = aOldKey[3];
                				_nAchievement.innerHTML = "Again:"+procAchievementObj(oAchievement).strNewInnerHTML;
                				return;
                			}
                		}
                		// sent to the initial timeout...
                		fnSendToTimeout = function()
                		{
                			// MARDL search direkt to MWURL_
                			var	strTrackURL = SCRIPT.MWURL_FB + oAchievement.strAchievement.split('<a href="'+SCRIPT.MWURL_FB)[1].split('"')[0].replace(/&amp;/g, '&'),
                				fnTrackingURLCallback,
                				fnHelpURLCallback,
                				aNewKey = new Array(oAchievement.iFriendId, g_Utils.getCurrentTime(), oAchievement.iJobID); // MARDL New iJobID to identify the job once
                			
								strTrackURL = g_Utils.formatForZynka(strTrackURL);

                			fnTrackingURLCallback = function(_oTrackingDetails)
                			{
        					if(_oTrackingDetails.responseText.toString().split('top.location.href = "')[1] != null)
        					{
        	        				//var	strHelpURL = _oTrackingDetails.responseText.toString().split('top.location.href = "')[1].split('"')[0];
          	        				var	strHelpURL = unescape(_oTrackingDetails.responseText.toString().split('&next=')[1].split('"')[0]);
        	        			}
        	        			else
        	        			{
      							g_Utils.doLog('808:Mafia Wars Feed Processor - procAchievement', 0, 'Encountered error processing this: ' + _oTrackingDetails.responseText.toString(), false)
        	        			}
                				
                   				strHelpURL = strHelpURL + '&skip_req_frame=1';
                				g_Utils.doLog('812:Track URL callback', 20, strHelpURL, false);
                				g_Utils.getURL(strHelpURL, fnHelpURLCallback); 
                			}
                			fnHelpURLCallback = function(_oHelpDetails)
                			{
                				oAchievement.strResult = _oHelpDetails.responseText.toString();
        					g_Utils.doLog('818:Mafia Wars Feed Processor - procAchievement', 20, 'Server response: ' + oAchievement.strResult, false);
                      				// Process response from server
                				oAchievement = procAchievementObj(oAchievement);
                				switch (oAchievement.iCode)
                				{
                					case 0 : // yes, you really missed it QQ
                						 // let it be
                					break;
                					case 1 : // Already received
                						// do nothing for now...
                					break;
                					case 2 : // success
                						g_ScreenLog.addStat('NFAP_Stats_MoneyGain_AB', 1);
                					break;
                					case 3 : // non-friend?!
                						 // who knows?
                					break;
                				}

							// Just set to success, wenn job is complett 
							if (oAchievement.iCode > -1)
							{
	        	        				aNewKey.push(oAchievement.iCode, oAchievement.iXp)
	                				aJobLog.push(aNewKey.join(':'));
                					GM_setValue('aJobLog', aJobLog.join('|'))
                					_nAchievement.innerHTML = oAchievement.strNewInnerHTML;
                					g_Utils.doLog('844:Help URL callback', 20, oAchievement.strMessage, true);
                				}
                			}
                			
                			g_Utils.getURL(strTrackURL, fnTrackingURLCallback);
                       		}
       		      		setTimeout(fnSendToTimeout, g_Utils.addDelay(1000));
                       	}
                }
                catch(myException)
                {
					g_Utils.doLog('855:Mafia Wars Feed Processor - procAchievement', 0, 'While processing Achievement, the following exception ocured: \n\r\nError name: ' + myException.name + '\n\rError message: ' + myException.message+'\r\n innerhtml:'+_nAchievement.innerHTML, true)
                }
	}
	
	function procJobObj(_oJob)
	{
		var	aTitles = new Array
					(     
						 'Missed (too late):red',		// code = 0
						 'Missed (not active):orangered',	// code = 1
						 'Cannot help non-friends or yourself:black',	// code = 2 
						 'Already helped:orange',		// code = 3
						 '{2} experience points:green',		// code = 4
						 'Daily city limit of 25 reached:red',	// code = 5
						 'WTF HAPPENED? 2=:red'			// code = 6 						 
					 );
					
		try
		{
			if(_oJob != null && _oJob.strResult != null )
			{
        			_oJob.strResult = _oJob.strResult.split('<td class="message_body">')[1];
        			if (typeof(_oJob.strResult) == "undefined")
        			{
        				
						g_Utils.doLog('881.Mafia Wars Feed Processor', 10, 'Scan jobs to fast for zynga changed the resultpage. I try again', false);
						_oJob.iCode = -1;
						return _oJob;
					}
					_oJob.strResult = _oJob.strResult.split('</td></tr>')[0];
        	
        			// buhuu - genuine missed job
        			if(_oJob.strResult.toLowerCase().indexOf('too late') >= 0)
        			{
        				_oJob.iCode = 0;
					// Retrieve money, if any
        				// <td class="message_body">You are too late to help on this job, but xyz thanks you for your offer with $1000.</td>
        				_oJob.iMoney = _oJob.strResult.split('your offer with $')[1];
        				if (typeof(_oJob.iMoney) == "undefined")
        				{
        					_oJob.iMoney = -1;
        				}
        				else
        				{
        					_oJob.iMoney = _oJob.iMoney.split('.</td>')[0];
	        				if (typeof(_oJob.iMoney) == "undefined")
	        				{
        						_oJob.iMoney = -1;
        					}
        				}
        			}
        			// missed - not active
        			else if(_oJob.strResult.toLowerCase().indexOf('job request is no longer active') >= 0)
        				_oJob.iCode = 1;
        			// this should only proc when on your own jobs...you shouldnt get non-friend feeds
        			else if(_oJob.strResult.toLowerCase().indexOf('not your friend') >= 0)
        				_oJob.iCode = 2;
        			else if(_oJob.strResult.toLowerCase().indexOf('not friends with') >= 0)
        				_oJob.iCode = 2;
        			else if(_oJob.strResult.toLowerCase().indexOf('you cannot respond to your own') >= 0)
        				_oJob.iCode = 2;
					else if(_oJob.strResult.toLowerCase().indexOf('only your mafia can') >= 0)        				
        				_oJob.iCode = 2;        				
        			// already helped
        			else if(_oJob.strResult.toLowerCase().indexOf('already helped') >= 0)
        				_oJob.iCode = 3;
        			// disco!
        			//if(_oJob.strResult.toLowerCase().indexOf('complete the job') >= 0)
        			else if(_oJob.strResult.toLowerCase().indexOf('you receive') >= 0)
        			{
        				_oJob.iCode = 4;
        				//_oJob.iMoney = /<(strong) class=\"money\">(C?\$[^<]+)<\/\1>/i.exec(_oJob.strResult)[2];
        				_oJob.iMoney = /<(strong) class=\"money\">(C?R?\$[^<]+)<\/\1>/i.exec(_oJob.strResult)[2];
        				// Sample: <strong class="money">$594,000</strong>				
        				g_Utils.doLog('930:Mafia Wars Feed Processor - procJobObj', 20, 'Money detected: ' + _oJob.iMoney, false);
        				// Find payout amount
        				_oJob.iMoney = _oJob.iMoney.replace(/[^\d]+/g, '');
        				_oJob.strResult = _oJob.strResult.replace(' class="money"', '');
        				_oJob.strResult = _oJob.strResult.replace(/<\/?span[^>]*>/gi, '');
        				_oJob.strResult = _oJob.strResult.replace(/(<img[^>]+>)/gi, '<div style="text-align:center">$1</div>');
        				_oJob.strResult = _oJob.strResult.replace('{0}', _oJob.strResult.split(' ').splice(2, 3).join(' '));
        				_oJob.iXp = _oJob.strResult.replace(/^\s*([.|\n]+)\s*$/m, '').split(' ')[2];
        				_oJob.strMsgContent = '  ' + _oJob.strResult;
        			}
        			// New Zynga limit of 25 jobs per town per day
        			else if(_oJob.strResult.toLowerCase().indexOf('you can only help 25') >= 0)
        			{
        				_oJob.iCode = 5;
        			}
        			else
        			{
        				g_Utils.doLog('947:ERROR', 10, 'UNRECOGNIZED RESPONSE _oJob.strResult=' + _oJob.strResult, false);
        				_oJob.iCode = 6; 
        			}
        		}
		}
		catch(myException)
		{
			g_Utils.doLog('954:Mafia Wars Feed Processor', 0, 'Job error details: \n\rFriend ID:'+_oJob.iFriendId+'\n\rMsgTitle: '+_oJob.strMsgTitle+'\n\rHTML Code: '+_oJob.strJob+'\n\n\rException details: Line '+myException.lineNumber+'\n\r'+myException.name+'\n\r'+myException.message, true);
			_oJob.strResult = 'Error occured, logged to debug window!';
			_oJob.iCode = -1;
		}
		
		if(_oJob.iCode < 0)
			return _oJob;
		
		return makeNiceMessage(_oJob,aTitles);
	}
	
	function procBoostObj(_oBoost)
	{
		var	aTitles = new Array
					(     
						 'Missed (too late):red',          				// code = 0
						 'Already received:orange',         				// code = 1
						 'Boost received:green',   	  				// code = 2
						 'Cannot get boost from non-friends or yourself:black',		// code = 3
						 'WTF HAPPENED? 2=:red',					// code = 4
						 'Missed boost(not active):green'      				// code = 5
					 );
		try
		{
			if(_oBoost != null && _oBoost.strResult != null)
			{
        			_oBoost.strResult = _oBoost.strResult.split('<td class="message_body">')[1];
        			if (typeof(_oBoost.strResult) == "undefined")
        			{
        				
						g_Utils.doLog('984:Mafia Wars Feed Processor', 10, 'Scan boosts too fast or zynga changed the resultpage. I try again', false);
						_oBoost.iCode = -1;
						return _oBoost;
					}
        			_oBoost.strResult = _oBoost.strResult.split('</td></tr>')[0];
        
        			g_Utils.doLog('990:Mafia Wars Feed Processor - procBoostObj', 20, 'Boost result: ' + _oBoost.strResult, false)
        
        			// buhuu - genuine missed Bonus
        			if(_oBoost.strResult.toLowerCase().indexOf('you are too late') >= 0)
        				_oBoost.iCode = 0;
        			// Ehm, already got it once
        			else if(_oBoost.strResult.toLowerCase().indexOf('you have already received') >= 0)
        				_oBoost.iCode = 1;
					// missed - not active
					else if(_oBoost.strResult.toLowerCase().indexOf('job request is no longer active') >= 0)
						_oBoost.iCode = 5;
        			// Got it!
        			else if(_oBoost.strResult.toLowerCase().indexOf('you received') >= 0)
        			{
        				_oBoost.iCode = 2;
        				_oBoost.strResult = _oBoost.strResult.slice(_oBoost.strResult.toLowerCase().indexOf('you received'));
        				_oBoost.strResult = _oBoost.strResult.split(' from')[0] + '.';
        				_oBoost.strMsgContent = '  ' + _oBoost.strResult;
        			}
        			// Can't help yoursefl or non-friends
				else if(_oBoost.strResult.toLowerCase().indexOf('not friends with') >= 0)        			
        				_oBoost.iCode = 3;
        			else if(_oBoost.strResult.toLowerCase().indexOf('not your friend') >= 0)
        				_oBoost.iCode = 3;
        			else if(_oBoost.strResult.toLowerCase().indexOf('you can') >= 0)
        				_oBoost.iCode = 3;
        			else
        			{
        				g_Utils.doLog('1018:ERROR', 10, 'UNRECOGNIZED RESPONSE _oBoost.strResult=' + _oBoost.strResult, false);
        				_oBoost.iCode = 4;
        			}
        
        			g_Utils.doLog('1022:Mafia Wars Feed Processor - procBoostObj', 20, 'iCode returned: ' + _oBoost.iCode.toString(), false)
        			g_Utils.doLog('1023:Mafia Wars Feed Processor - procBoostObj', 20, 'Boost received: ' + _oBoost.strMsgContent, false)
        		}
		}
		catch(myException)
		{
			g_Utils.doLog('1028:Mafia Wars Feed Processor', 0, 'Boost error details: \n\rFriend ID:'+_oBoost.iFriendId+'\n\rMsgTitle: '+_oBoost.strMsgTitle+'\n\rHTML Code: '+_oBoost.strBoost+'\n\n\rException details: Line '+myException.lineNumber+'\n\r'+myException.name+'\n\r'+myException.message, true);
			_oBoost.strResult = 'Error occured, logged to debug window!';
			_oBoost.iCode = -1;
		}

		if(_oBoost.iCode < 0)
			return _oBoost;

		return makeNiceMessage(_oBoost,aTitles);
	}

	function procAchievementObj(_oBoost)
	{
		var	aTitles = new Array
					(     
						 'Missed (too late):red',          				// code = 0
						 'Already received:orange',         				// code = 1
						 'Boost received:green',   	  				// code = 2
						 'Cannot get boost from non-friends or yourself:black',		// code = 3
						 'WTF HAPPENED? 2=:red',					// code = 4
						 'Missed boost(not active):green'      				// code = 5
					 );
		try
		{
			if(_oBoost != null && _oBoost.strResult != null)
			{
        			_oBoost.strResult = _oBoost.strResult.split('<td class="message_body">')[1];
        			if (typeof(_oBoost.strResult) == "undefined")
        			{
        				
						g_Utils.doLog('1058:Mafia Wars Feed Processor', 10, 'Scan achievement too fast or zynga changed the resultpage. I try again', false);
						_oBoost.iCode = -1;
						return _oBoost;
					}
        			_oBoost.strResult = _oBoost.strResult.split('</td></tr>')[0];
        
        			g_Utils.doLog('1064:Mafia Wars Feed Processor - procBoostObj', 20, 'Boost result: ' + _oBoost.strResult, false);
        
        			// buhuu - genuine missed Bonus
        			if(_oBoost.strResult.toLowerCase().indexOf('you are too late') >= 0)
        				_oBoost.iCode = 0;
        			// Ehm, already got it once
        			else if(_oBoost.strResult.toLowerCase().indexOf('you have already received') >= 0)
        				_oBoost.iCode = 1;
					// missed - not active
					else if(_oBoost.strResult.toLowerCase().indexOf('job request is no longer active') >= 0)
						_oBoost.iCode = 5;
        			// Got it!
        			else if(_oBoost.strResult.toLowerCase().indexOf('you received') >= 0)
        			{
        				_oBoost.iCode = 2;
        				_oBoost.strResult = _oBoost.strResult.slice(_oBoost.strResult.toLowerCase().indexOf('you received'));
        				_oBoost.strResult = _oBoost.strResult.split(' from')[0] + '.';
        				_oBoost.strMsgContent = '  ' + _oBoost.strResult;
        			}
        			// Can't help yoursefl or non-friends
				else if(_oBoost.strResult.toLowerCase().indexOf('not friends with') >= 0)        			
        				_oBoost.iCode = 3;
        			else if(_oBoost.strResult.toLowerCase().indexOf('not your friend') >= 0)
        				_oBoost.iCode = 3;
        			else if(_oBoost.strResult.toLowerCase().indexOf('you can') >= 0)
        				_oBoost.iCode = 3;
        			else
        			{
        				g_Utils.doLog('1092:ERROR', 10, 'UNRECOGNIZED RESPONSE _oBoost.strResult=' + _oBoost.strResult, false);
        				_oBoost.iCode = 4;
        			}
        
        			g_Utils.doLog('1096:Mafia Wars Feed Processor - procBoostObj', 20, 'iCode returned: ' + _oBoost.iCode.toString(), false)
        			g_Utils.doLog('1097:Mafia Wars Feed Processor - procBoostObj', 20, 'Boost received: ' + _oBoost.strMsgContent, false)
        		}
		}
		catch(myException)
		{
			g_Utils.doLog('1102:Mafia Wars Feed Processor', 0, 'Boost error details: \n\rFriend ID:'+_oBoost.iFriendId+'\n\rMsgTitle: '+_oBoost.strMsgTitle+'\n\rHTML Code: '+_oBoost.strBoost+'\n\n\rException details: Line '+myException.lineNumber+'\n\r'+myException.name+'\n\r'+myException.message, true);
			_oBoost.strResult = 'Error occured, logged to debug window!';
			_oBoost.iCode = -1;
		}

		if(_oBoost.iCode < 0)
			return _oBoost;

		return makeNiceMessage(_oBoost,aTitles);
	}

	function makeNiceMessage(_oJobOrBoosts,aTitles)
	{

		_oJobOrBoosts.strMsgTitle = _oJobOrBoosts.strMsgTitle.replace('{0}', aTitles[_oJobOrBoosts.iCode].split(':')[1]);
		_oJobOrBoosts.strMsgTitle = _oJobOrBoosts.strMsgTitle.replace('{1}', aTitles[_oJobOrBoosts.iCode].split(':')[0]);
		_oJobOrBoosts.strMsgTitle = _oJobOrBoosts.iXp > 0 ? _oJobOrBoosts.strMsgTitle.replace('{2}', _oJobOrBoosts.iXp) : _oJobOrBoosts.strMsgTitle;
		
		// MARDL changed regex und result for strMesasge and strNewInnerHTML
		var newText = "No copytext found!";//_oJobOrBoosts.strNewInnerHTML;
		if(_oJobOrBoosts.strNewInnerHTML.indexOf('UIStoryAttachment_Copy') >= 0)
			newText = _oJobOrBoosts.strNewInnerHTML.match(/UIStoryAttachment_Copy\">([^<]+)<\/div>/ig)? RegExp.$1 : newText;

		_oJobOrBoosts.strMessage =  _oJobOrBoosts.strMsgTitle + newText + "<div style='font-weight: bold;'>" + _oJobOrBoosts.strMsgContent + "</div>";
		
		var textOut = '<div style="font-weight: bold;">MWFP: ' + _oJobOrBoosts.strMsgTitle + _oJobOrBoosts.strMsgContent + '</div>';
		_oJobOrBoosts.strNewInnerHTML = _oJobOrBoosts.strNewInnerHTML.replace(/<div class=\"UIStoryAttachment_Copy\">([^<]+)<\/div>/ig, '$1'+textOut);

		// MARDL END

		
		_oJobOrBoosts.strMessage = _oJobOrBoosts.strMessage.replace("class="+String.fromCharCode(34)+"UIStoryAttachment_Title"+String.fromCharCode(34)," ");
		_oJobOrBoosts.strMessage = _oJobOrBoosts.strMessage.replace(/<a[^>]+>([^<]+)<\/a>/ig, '$1');
		return _oJobOrBoosts;
	}

	function isNextURLTimeout()
	{	
		var	aJobLog = myGetValue('aJobLog', '').split('|'),
			bReturnVal = false;
			
		// time to visit the req.php page?
		if(g_Utils.getCurrentTime() - parseInt(myGetValue('iLastReload')) >= parseInt(g_iNextURLDelay))
		{
			GM_setValue('iLastReload', g_Utils.getCurrentTime());
			// manage the helped key store
			for(var iJobKey in aJobLog)
			{
				if(aJobLog[iJobKey])
				{
					if((g_Utils.getCurrentTime() - aJobLog[iJobKey].split(':')[1]) > myGetValue('iPurgeTime', 30))
						aJobLog.splice(iJobKey, 1);
				}
			}
			GM_setValue('aJobLog', aJobLog.join('|'));
			// load the NextURL or reload the page if it's empty
			setTimeout
			(
				function()
				{
					g_Utils.doLog('1162:isNextURLTimeout', 10, 'Loading the NextURL...', false);
					g_strNextURL.length > 0 ? window.location.href = g_strNextURL : window.location.reload();
				}, 
				1000
			);
			bReturnVal = true;
		}
		return bReturnVal;
	}	
}

function DOMUtils()
{
	this.newElem = newElem;
	this.newText = newText;
	this.getElem = getElem;
	this.doAppend = doAppend;
	this.doPrepend = doPrepend;
	
	// creates a DOM element
	function newElem(_strType, _strId, _strClass)
	{
		var eElem = document.createElement(_strType);
		
		if(_strId)
			eElem.id = _strId;
			
		if(_strClass)
			eElem.setAttribute('class', _strClass);
		
		return eElem;
	}
	// creates a DOM element
	function newText(_strText)
	{
		return document.createTextNode(_strText);
	}
	//gets a DOM element
	function getElem(_strName, _bByTag)
	{
		eElem = null;
		
		if(!_bByTag)
			eElem = document.getElementById(_strName);
		else
			eElem = document.getElementsByTagName(_strName);
		
		return eElem;
	}
	// appends an object to a DOM element
	function doAppend(_ostrParentElem, _oChildElem)
	{
		if(typeof _ostrParentElem == 'string')
			getElem(_ostrParentElem).appendChild(_oChildElem);
		
		if(typeof _ostrParentElem == 'object')
			_ostrParentElem.appendChild(_oChildElem);
		
		return _oChildElem;
	}
	// prepends an object to a DOM element
	function doPrepend(_ostrParentElem, _oChildElem)
	{	
		if(typeof _ostrParentElem == 'string')
			getElem(_ostrParentElem).insertBefore(_oChildElem, getElem(_ostrParentElem).firstChild);
		
		if(typeof _ostrParentElem == 'object')
			_ostrParentElem.insertBefore(_oChildElem, _ostrParentElem.firstChild);
		
		return _oChildElem;
	}
}
function ListenerLib()
{
	// this starts the processing...called after the DOM is loaded
	this.proc_Start = function()
	{
		// starts the on-screen log
		g_ScreenLog.createContainer();
		// starts the processing...process (=
		g_Process.procContent();
	}
	
	this.click_HideLog = function()
	{
		var	eElem = g_DOMUtils.getElem('NFAP_LogRowContainer')
			strCurStyle = eElem.style.display;
		
		g_DOMUtils.getElem('NFAP_A_HideLog').innerHTML = strCurStyle == 'block' ? 'Show Log' : 'Hide Log';
		eElem.style.display = strCurStyle == 'block' || '' ? 'none' : 'block';
		GM_setValue('bLogHidden', eElem.style.display == 'block' ? false : true);
	}

	this.click_HideSettings = function()
	{
		var	eElem = g_DOMUtils.getElem('NFAP_SettingsContainer')
			strCurStyle = eElem.style.display;
		
		g_DOMUtils.getElem('NFAP_A_HideSettings').innerHTML = strCurStyle == 'block' ? 'Show Settings' : 'Hide Settings';
		eElem.style.display = strCurStyle == 'block' || '' ? 'none' : 'block';
		GM_setValue('bSettingsHidden', eElem.style.display == 'block' ? false : true);
	}
	
	this.click_CheckUpdate = function()
	{
		try {
		if (!myGetValue) {
		  return;
		}

		GM_xmlhttpRequest({
		  method: 'GET',
		  url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
		  onload: function(result) {
		    if (result.status != 200) {
		      return;
		    }
		    var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';
		    if (theOtherVersion != SCRIPT.version) {
		      if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
		        window.location.href = SCRIPT.url;
		      }
		    } else {
		      alert('You already have the latest version.');
		      return;
		    }
		  }
		});
		} catch (ex) {
			g_Utils.doLog('1291:Mafia Wars Feed Processor', 0, 'Check for updates failed\n\rException details: '+myException.name+'\n\r'+myException.message, true);
		}
	}
	this.click_ClearLog = function()
	{
		if(confirm('Are you sure you want to clear the log?'))
		{
			g_DOMUtils.getElem('NFAP_LogContainer').removeChild(g_DOMUtils.getElem('NFAP_LogTableContainer'));
			g_DOMUtils.doAppend('NFAP_LogContainer', g_DOMUtils.newElem('div', 'NFAP_LogTableContainer', 'UITitledBox_Content'));
			GM_setValue('strLogTable', '');
			g_ScreenLog.createLogTables();
			g_ScreenLog.newEntry('', '<strong>Log cleared.</strong>')
		}
	}
	// handles the menu command...
	this.menu_Reinit = function()
	{
		if(window.confirm('Are you sure you want to reinitialize your script variables?'))
		{
			Init();
			// Reinitialize after refresh again, for to be sure!
			GM_setValue('bInitialized', false);
			window.location.reload();
		}
	}
	this.menu_ShowAll = function()
	{
		GM_setValue('bShowOnlyJobs', false);
		window.location.reload();
	}
	this.menu_ShowJobs = function()
	{
		GM_setValue('bShowOnlyJobs', true);
		window.location.reload();
	}	
	this.menu_DoBoosts = function()
	{
		GM_setValue('bDoBoosts', true);
		window.location.reload();
	}
	this.menu_DontBoosts = function()
	{
		GM_setValue('bDoBoosts', false);
		window.location.reload();
	}
	this.menu_DoAchievements = function()
	{
		GM_setValue('bDoAchievements', true);
		window.location.reload();
	}
	this.menu_DontAchievements = function()
	{
		GM_setValue('bDoAchievements', false);
		window.location.reload();
	}
	this.menu_DoDeleteComp = function()
	{
		GM_setValue('bDeleteComp', true);
		window.location.reload();
	}
	this.menu_DontDeleteComp = function()
	{
		GM_setValue('bDeleteComp', false);
		window.location.reload();
	}
	
	
}

function ScreenLog()
{
	// public/exposed methods
	this.createContainer = createContainer;
	this.createLogTables = createLogTables;
	this.newEntry = newEntry;
	this.addStat = addStat;
	this.saveLog = saveLog;
	this.checkUpdateForInfo = checkUpdateForInfo;
	
	// ***** public methods *****/
	// creates the container where the log table will live
	function createContainer()
	{
		var	oSnapshot = g_Utils.getSnapshot("//div[@id='home_sidebar']"),
			eElem = g_DOMUtils.newElem('div', 'NFAP_TopContainer'),
			strStyle = '/** log table style **/';
			
		if(oSnapshot.snapshotLength < 1)
			return;
		
		// the style for the table
		strStyle += '#NFAP_LogRowContainer {height:400px;overflow:auto;}';
		strStyle += '#NFAP_LogRowContainer,#NFAP_LST,#NFAP_SettingsContainer {border:1px solid #AAA;}';
		strStyle += '#NFAP_LT tr td {vertical-align:top;border-bottom:1px solid #CCC;}';
		strStyle += '#NFAP_LT,#NFAP_LST,#NFAP_SettingsContainer {width:100%;}';
		strStyle += '.NFAP_LTB_D {width:65px;padding:3px;}';
		strStyle += '.NFAP_SR_C td, .NFAP_SR_C th {text-align:center;}';
		strStyle += '.NFAP_SR_L th,.NFAP_SR_L td {text-align:left;}';
		strStyle += '.NFAP_SR_B th,.NFAP_SR_B td {border-top:1px solid #CCC;}';
		// now stick all this in the head
		GM_addStyle(strStyle);
		
		// the complete top container - the innerHTML should be saved to a GM value to store the log
		eElem = g_DOMUtils.doPrepend(oSnapshot.snapshotItem(0), eElem);
		
		// the main/outer div
		eElem = g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('div', 'NFAP_LogContainer', 'UIHomeBox UITitledBox'));
		// the title main div
		eElem = g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('div', 'NFAP_TitleContainer', 'UITitledBox_Top'));
		// the title inner div
		eElem = g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('div', null, 'UITitledBox_TitleBar'));
		// the title text
		eElem = g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('span', null, 'UITitledBox_Title'));
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Mafia Wars Feed Processor - Build ' + SCRIPT.version + ' - Log'));
		
		
		eElem = g_DOMUtils.doAppend('NFAP_TitleContainer', g_DOMUtils.newElem('div', 'NFAP_ProcessRuning', 'NFAP_Titles'));
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('div', 'NFAP_ProcessRuningTitle'));
		eElem = g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('input', 'NFAP_RLButton'));
		eElem.setAttribute('style', 'display:none;');


		// the 'more' container - holds log clear/hide links
		eElem = g_DOMUtils.doAppend('NFAP_TitleContainer', g_DOMUtils.newElem('div', 'NFAP_TitleMoreContainer', 'NFAP_Titles'));
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('small'));
		
		// the link to hide/show the settings
		if(g_bShowSettings)
		{
			eElem = g_DOMUtils.newElem('a', 'NFAP_A_HideSettings');
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText(myGetValue('bSettingsHidden', true) ? 'Show Settings' : 'Hide Settings'));
			eElem.addEventListener('click', g_ListenerLib.click_HideSettings, false);
			g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, eElem);		
		}
		// link spacer
		g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, g_DOMUtils.newText(' | '));

		// the link to hide/show the log
		if(g_bUseScreenLog)
		{
			eElem = g_DOMUtils.newElem('a', 'NFAP_A_HideLog');
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText(myGetValue('bLogHidden', true) ? 'Show Log' : 'Hide Log'));
			eElem.addEventListener('click', g_ListenerLib.click_HideLog, false);
			g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, eElem);		
			// link spacer
			g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, g_DOMUtils.newText(' | '));
		}
		// the link to clear the log
		eElem = g_DOMUtils.newElem('a', 'NFAP_A_ClearLog', 'UIHomeBox_MoreLink');
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Clear Log'));
		eElem.addEventListener("click", g_ListenerLib.click_ClearLog, false);
		g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, eElem);
		// link spacer
		g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, g_DOMUtils.newText(' | '));

		// the link to check update
		eElem = g_DOMUtils.newElem('a', 'NFAP_A_CheckUpd', 'UIHomeBox_CheckUpdLink');
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Check for updates'));
		eElem.addEventListener("click", g_ListenerLib.click_CheckUpdate, false);
		g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, eElem);

		// the log table main div
		g_DOMUtils.doAppend('NFAP_LogContainer', g_DOMUtils.newElem('div', 'NFAP_LogTableContainer', 'UITitledBox_Content'));
		// restore from memory or create a new one
		if(myGetValue('strLogTable', '').length > 0)
			g_DOMUtils.getElem('NFAP_LogTableContainer').innerHTML = myGetValue('strLogTable');
		else
			createLogTables();
		// remember if its hidden or not
		g_DOMUtils.getElem('NFAP_LogRowContainer').style.display = (myGetValue('bLogHidden', true) || (g_bUseScreenLog == false)) ? 'none' : 'block';
		g_DOMUtils.getElem('NFAP_SettingsContainer').style.display = myGetValue('bSettingsHidden', true) ? 'none' : 'block';
		// finally save it
		saveLog();
		
		checkUpdateForInfo();
		

	}
	
	function checkUpdateForInfo()
	{
		try {
		if (!myGetValue) {
		  return;
		}

		GM_xmlhttpRequest({
		  method: 'GET',
		  url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
		  onload: function(result) {
		    if (result.status != 200) {
		      return;
		    }
		    var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';
		    if (theOtherVersion != SCRIPT.version) {
				g_DOMUtils.getElem('NFAP_A_CheckUpd').innerHTML = '<span style="text-decoration:blink">Update available!</span>';
		    } else {
		      return;
		    }
		  }
		});
		} catch (ex) {
			g_Utils.doLog('1491:Mafia Wars Feed Processor', 10, 'checkUpdateForInfo failed\n\rException details: '+myException.name+'\n\r'+myException.message, true);
		}
	}
	
	// adds log entries
	function newEntry(_strType, _strLogEntry)
	{
		var	dtNow = new Date(),
			MONTHS = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
			aDateStamp = new Array(),
			eTableBody,
			eRow,
			eCell;
		
		if(!g_bUseScreenLog)
			return;
		
		if(!g_DOMUtils.getElem('NFAP_LT'))
			createLogTables();
		
		aDateStamp.push((dtNow.getHours() > 12 ? dtNow.getHours() - 12 : dtNow.getHours()) + ':');
		aDateStamp.push((dtNow.getMinutes() < 10 ? '0' + dtNow.getMinutes() : dtNow.getMinutes()) + ':');
		aDateStamp.push((dtNow.getSeconds() < 10 ? '0' + dtNow.getSeconds() : dtNow.getSeconds()) + ' ');
		aDateStamp.push(dtNow.getHours() <= 12 ? 'AM' : 'PM');
		aDateStamp.push('<br>' + MONTHS[dtNow.getMonth()] + '. ');
		aDateStamp.push(dtNow.getDate());
		
		eTableBody = g_DOMUtils.getElem('NFAP_LTB');
		eRow = g_DOMUtils.newElem('tr');
		
		// cell contents are an HTML assignment so we dont have to create 90k text nodes everywere
		// date/time stamp
		eCell = g_DOMUtils.doAppend(eRow, g_DOMUtils.newElem('td', null, 'NFAP_LTB_D'));
		eCell.innerHTML = aDateStamp.join('');
		
		// event source...which process triggered this
		eCell = g_DOMUtils.doAppend(eRow, g_DOMUtils.newElem('td'));
		eCell.innerHTML = _strLogEntry;
		
		// add row to the log table
		g_DOMUtils.doPrepend('NFAP_LTB', eRow);
		
		// row count limiter
		try
		{
			// row count limiter
			if(eTableBody.rows.length > (parseInt(g_iScreenLogSize) ? parseInt(g_iScreenLogSize) : 50))
				while(eTableBody.rows.length > (parseInt(g_iScreenLogSize) ? parseInt(g_iScreenLogSize) : 50))
					eTableBody.removeChild(eTableBody.rows[eTableBody.rows.length - 1]);		
		}
		catch(_errObj)
		{
			g_Utils.doLogError('Output log newLogEntry()', 'An error occured when trying to delete log rows.', _errObj, false);
		}
		
		saveLog();
	}
	
	// adds a value to a stat
	function addStat(_strStat, _iVal)
	{
		var	strCurVal = g_DOMUtils.getElem(_strStat).innerHTML;
		
		// clean
		strCurVal = strCurVal.toString().replace(/[^\d]+/g, '');
		strCurVal = strCurVal.length == 0 ? 0 : strCurVal;
		strCurVal = (parseInt(strCurVal) + parseInt(_iVal)).toString();
		// format as nnn,nnn
		while (/(\d+)(\d{3})/.test(strCurVal))
			strCurVal = strCurVal.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
		
		g_DOMUtils.getElem(_strStat).innerHTML = strCurVal;
		
		saveLog();
	}
	function saveLog()
	{
		GM_setValue('strLogTable', g_DOMUtils.getElem('NFAP_LogTableContainer').innerHTML);
	}
	// creates the log table
	function createLogTables()
	{
		var eElem;
		
		// creates the main log table
		g_DOMUtils.doAppend('NFAP_LogTableContainer', g_DOMUtils.newElem('div', 'NFAP_LogRowContainer'));
		g_DOMUtils.doAppend('NFAP_LogRowContainer', g_DOMUtils.newElem('table', 'NFAP_LT'));
		g_DOMUtils.getElem('NFAP_LogRowContainer').style.display = g_bUseScreenLog ? 'block' : 'none';
		g_DOMUtils.doAppend('NFAP_LT', g_DOMUtils.newElem('tbody', 'NFAP_LTB'));
		g_DOMUtils.getElem('NFAP_LT').setAttribute('cellSpacing', 0);
		
		// creates the stat box table beneath it
		g_DOMUtils.doAppend('NFAP_LogTableContainer', g_DOMUtils.newElem('table', 'NFAP_LST'));
		g_DOMUtils.doAppend('NFAP_LST', g_DOMUtils.newElem('tbody'));
		g_DOMUtils.getElem('NFAP_LST').setAttribute('cellSpacing', 0);
		eElem = g_DOMUtils.getElem('NFAP_LST').tBodies[0];

		//starts the results/rewards row
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('tr', '', 'NFAP_SR_C'));
		
		eElem = g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_LST').tBodies[0].rows[0], g_DOMUtils.newElem('th'));
		eElem.setAttribute('colspan', 2);
		eElem.setAttribute('style', 'width:50%;');
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Job results'));
		
		eElem = g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_LST').tBodies[0].rows[0], g_DOMUtils.newElem('th'));
		eElem.setAttribute('colspan', 2);
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Rewards'));
		
		// for the stat cols
		eElem = g_DOMUtils.getElem('NFAP_LST').tBodies[0]
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('tr', '', 'NFAP_SR_C'));
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('tr', '', 'NFAP_SR_C'));
		
		createStatCol(eElem, 'NFAP_Stats_JobsCompleted', 'Completed');
		createStatCol(eElem, 'NFAP_Stats_JobsMissed', 'Missed');
		createStatCol(eElem, 'NFAP_Stats_XPGain', 'XP Gain');
		createStatCol(eElem, 'NFAP_Stats_BonusesGain', 'Bonuses');
		
		// and the money rows
		createStatRow(eElem, 3, 2, 'NFAP_Stats_BlockedJobs',  'Zynga Blocked Jobs:');
		createStatRow(eElem, 3, 2, 'NFAP_Stats_MoneyGain_NY', 'Money gained: NY');
		createStatRow(eElem, 3, 2, 'NFAP_Stats_MoneyGain_CU', 'Money gained: Cuba');
		createStatRow(eElem, 3, 2, 'NFAP_Stats_MoneyGain_RU', 'Money gained: Russia');
		createStatRow(eElem, 3, 2, 'NFAP_Stats_MoneyGain_AB', 'Money gained: Achiev.');
	
		// creates the settings box beneath results box
		g_DOMUtils.doAppend('NFAP_LogTableContainer', g_DOMUtils.newElem('table', 'NFAP_SettingsContainer'));
		g_DOMUtils.doAppend('NFAP_SettingsContainer', g_DOMUtils.newElem('tbody'));
		g_DOMUtils.getElem('NFAP_SettingsContainer').setAttribute('cellSpacing', 0);
		eElem = g_DOMUtils.getElem('NFAP_SettingsContainer').tBodies[0];
		
		// Add Settings boxes
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Visual Settings coming soon')); 
		
//		eElem.innerHTML = '<label>MinReloadWait<input type="text" name="tboxMinReloadWait" id="tboxMinReloadWait" /></label>';

		// creates a 2 row col to track stats
		function createStatCol(_oParentElem, _strId, _strTitle)
		{
			var	eElem;
			// top cell
			eElem = g_DOMUtils.doAppend(_oParentElem.rows[_oParentElem.rows.length - 2], g_DOMUtils.newElem('th'));
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText(_strTitle));
			// bottom cell
			eElem = g_DOMUtils.doAppend(_oParentElem.rows[_oParentElem.rows.length - 1], g_DOMUtils.newElem('td', _strId));
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('0'));
		}
		// row type stat block
		function createStatRow(_oParentElem, _iHeaderSpan, _iTotalCells, _strId, _strTitle)
		{
			var	eElem;
			
			g_DOMUtils.doAppend(_oParentElem, g_DOMUtils.newElem('tr', '', 'NFAP_SR_L NFAP_SR_B'));
			// left cell
			eElem = g_DOMUtils.doAppend(_oParentElem.rows[_oParentElem.rows.length - 1], g_DOMUtils.newElem('th'));
			eElem.setAttribute('colspan', _iHeaderSpan);
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText(_strTitle));
			// right cell
			eElem = g_DOMUtils.doAppend(_oParentElem.rows[_oParentElem.rows.length - 1], g_DOMUtils.newElem('td', _strId));
			eElem.setAttribute('colspan', _iTotalCells - _iHeaderSpan);
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('0'));
		}
	}
}
function Utilities()
{
	// making them public
	this.getSnapshot= getSnapshot;
	this.getURL= getURL;
	this.getCurrentTime = getCurrentTime;
	this.addDelay = addDelay;
	this.getRandRange = getRandRange;
	this.formatForZynka = formatForZynka;
	// logging (internal)
	this.doLog = doLog;
	this.doLogError = doLogError;
	// dev stuff
	this.dump = dump;
	
	// xpath results
	function getSnapshot(_strPattern)
	{
		return document.evaluate(_strPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	// gets a remote URL
	function getURL(_strURL, _fnCallback)
	{
		try
		{
			GM_xmlhttpRequest
			(
				{
					method:"GET", 
					url: _strURL, 
					headers : myGetValue('strHeaderInfo'), 
					onload : function(responseDetails)
					{
						var strToLog = 'getURL(): ' + _strURL;
						
						if(typeof _fnCallback == 'function')
							_fnCallback(responseDetails);
						
						strToLog = strToLog.concat('\r\nWith headers: ', myGetValue('strHeaderInfo'));
						strToLog = strToLog.concat('\r\nResponse text:\r\n', responseDetails.responseText);
						doLog('1696:getURL()', 50, strToLog, false);
					}
				}
			);
		}
		catch(_errObj)
		{
			g_Utils.doLogError('1703:Top level functions getURL()', 'An error ocured while trying to retrieve a URL.', _errObj, true);
		}
	}
	
	function formatForZynka(_theURL)
	{
		var strTrackURL = unescape(_theURL);

		strTrackURL = strTrackURL.replace(/next_params={\"/gi, '');
		strTrackURL = strTrackURL.replace(/\"\}/gi, '');
		strTrackURL = strTrackURL.replace(/\":\"/gi, '=');
		strTrackURL = strTrackURL.replace(/\",\"/gi, '&');
		strTrackURL = strTrackURL.replace(/\",\+\"/gi, '&');
		strTrackURL = strTrackURL.replace(SCRIPT.MWURL_FB, SCRIPT.MWURL_ZY);
		strTrackURL = strTrackURL.replace(/next_/gi, 'xw_');
		strTrackURL = strTrackURL.replace(/%22%3A%22/gi, '=');
		strTrackURL = strTrackURL.replace(/%22%2C+%22/gi, '&');
		strTrackURL = strTrackURL.replace(/xw_params=%7B%22/gi, 'skip_req_frame=1&');
		strTrackURL = strTrackURL.replace(/%22%7D/gi, '');
		strTrackURL = strTrackURL.replace(/sendkey=/gi, 'xw_city=&tmp=');

		doLog('1725:formatForZynka()', 20, strTrackURL, false);
		return strTrackURL;
	}
	
	// gets the current timestamp in minutes
	function getCurrentTime()
	{
		return Math.round(new Date().getTime() / 1000 / 60);
	}
	// adds time to the global delay cue
	function addDelay(_iNewDelay)
	{
		g_iCurDelay += parseInt(_iNewDelay);
		return g_iCurDelay;
	}	
	// gets a random num within a range
	function getRandRange(_iLow, _iHigh)
	{
		return Math.floor((_iHigh - _iLow) * Math.random()) + _iLow;
	}
	
	// logging
	function doLog(_strSource, _iLevel, _strMessage, _bToScreen)
	{
		if(g_iLogThreshold >= _iLevel)
			GM_log('Source: ' + _strSource + '\r\nMessage: ' + _strMessage);
		
		// add the friend Id back if you want...
		if(_bToScreen == true && g_bUseScreenLog)
			g_ScreenLog.newEntry(_strSource, _strMessage);
	}
	
	function doLogError(_strSource, _strMessage, _errObj, _bToScreen)
	{
		doLog(_strSource, 0, 'ERROR: ' + _strMessage.concat('\r\nDetails:\r\n', _errObj.message), false);
		
		if(_bToScreen == true)
			doLog(_strSource, 0, 'ERROR', _strMessage, true);
	}

	function dump(_strContent, _bToScreen)
	{
		//GM_log('dumping:\r\n' + _strContent);
		
		if(_bToScreen == true)
		{
			var	eDiv = g_DOMUtils.getElem('NFAP_DevDump'),
				bAddMore = false;
			
			if(!eDiv)
			{
				eDiv = g_DOMUtils.doAppend(g_DOMUtils.getElem('body', true).item(0), g_DOMUtils.newElem('div', 'NFAP_DevDump'));
				eDiv.setAttribute('style', 'border:1px solid red;position:fixed;bottom:0px;z-index:9999;width:99%;color:white;background:black;overflow:auto;max-height:250px;');
			}
			else
			{
				bAddMore = true;
			}
			
			if(_strContent.length > 0)
				eDiv.innerHTML = '<pre>' + (!bAddMore ? _strContent : _strContent + '</pre><hr><pre>' + eDiv.innerHTML) + '</pre>';
			else
				eDiv.innerHTML = 'The content string was empty or not able to be parsed';
		}
	}
}