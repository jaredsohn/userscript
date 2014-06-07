// ==UserScript==
// @name           Facebook Mafia Wars News Feed Processor
// @description    Accepts Mafia Wars job help requests
// @namespace      Facebook
// @version        0.1.16
// @include        http://www.facebook.com/home.php?filter=app_10979261223
// ==/UserScript==

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
oSettings =
{
	MinReloadWait : 5,   // in seconds
	MaxReloadWait : 10,  // in seconds
	ShowOnlyJobs  : true,
	NextURL       : '',
	NextURLDelay  : 20,  // in minutes
	UseScreenLog  : true,
	ScreenLogSize : 25,
	LogThreshold  : 10
}

/*****	global vars *****/
var	// used in development...spams logs a lot (=
	g_bDebugMode = false,
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
	g_bShowOnlyJobs = oSettings.ShowOnlyJobs,
	g_strNextURL = oSettings.NextURL,
	g_iNextURLDelay = oSettings.NextURLDelay,
	g_bUseScreenLog = oSettings.UseScreenLog,
	g_iScreenLogSize = oSettings.ScreenLogSize,
	g_iLogThreshold = oSettings.LogThreshold;

/*****	begin	*****/
// see if we need to init the GM vars
if(!GM_getValue('bInitialized', false) || g_bDebugMode)
	Init();

// this starts the whole process once the DOM is loaded
window.addEventListener('load', g_ListenerLib.proc_Start, false);
	
/*****	script management	*****/
// register GM menu commands
GM_registerMenuCommand('MW News Feed Processor: Reinitialize script level variables', g_ListenerLib.menu_Reinit);

// initializes script (GM) variables
function Init()
{
	if(g_bDebugMode)
		g_iLogThreshold = 100;
	
	g_Utils.doLog('Script initialization', 0, 'Initializing...', false);
	
	GM_setValue('iLastReload', 0);
	GM_setValue('aJobLog', '');
	// how long to hold previous job assist records held in aJobLog
	GM_setValue('iPurgeTime', 30);
	// URL/remoting references
	GM_setValue('strMWURL_FB', 'http://apps.facebook.com/inthemafia');
	GM_setValue('strMWURL_Zy', 'http://mwfb.zynga.com/mwfb');
	GM_setValue('strHeaderInfo', '{ "User-Agent": "Mozilla/5.0", "Accept": "text/xml" }');
	// xpath patterns
	/******
 		strHTPat	gets the help text (link to click, job name, etc)
 		strNHTPat	gets all non-help related posts
		strRLLPat	where the hidden feed reload link lives...
	*****/
	GM_setValue('strHTPat', "//div[@class='UIStoryAttachment_Copy']//div[@class = 'CopyTitle' and contains(., 'requested help')]");
	GM_setValue('strNHTPat', "//div[@class='UIStream']//div[contains(@id, 'div_story_') and contains(@class, 'aid_') and not(contains(., 'requested help'))]");
	GM_setValue('strRLLPat', "//div[@class='UIIntentionalStream_ShowNewStories UIOneOff_Container']");
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
			
		g_Utils.doLog('Content loader', 0, 'Starting looking for jobs...', false);
		try
		{ 	
			if(!g_DOMUtils.getElem('NFAP_RLButton'))
			{
				// handle the current hidden reload link
				oResults = g_Utils.getSnapshot(GM_getValue('strRLLPat'));
				oResults.snapshotItem(0).id = 'NFAP_FBRLBlock';
				oResults.snapshotItem(0).setAttribute('style', 'display:block;');
				eFBAnchor = oResults.snapshotItem(0).getElementsByTagName('a')[0];
				eFBAnchor.id = 'NFAP_RLAnchor';
				eContainer = g_DOMUtils.doPrepend(oResults.snapshotItem(0).parentNode, g_DOMUtils.newElem('div'));
				eContainer.setAttribute('style', 'height:20px;');
				g_DOMUtils.doPrepend(eContainer, oResults.snapshotItem(0));
				// and the button
				eNewButton = g_DOMUtils.doAppend(eContainer, g_DOMUtils.newElem('input', 'NFAP_RLButton'));
				eNewButton.type = 'button';
				eNewButton.setAttribute('style', 'display:none;');
				eNewButton.setAttribute('onclick', eFBAnchor.getAttribute('onclick'));
			}
			// since it's already there, show it and click the button
			g_DOMUtils.getElem('NFAP_FBRLBlock').setAttribute('style', 'display:block;');
			g_DOMUtils.getElem('NFAP_RLAnchor').innerHTML = 'Looking for jobs...';
			g_DOMUtils.getElem('NFAP_RLButton').click();
			setTimeout(procContent, 1000);
		}
		catch(_errObj)
		{
			// fallback to reload just in case
			g_Utils.doLogError('Content loader', 'There was an error getting new content from FB...reloading the page.', _errObj, false);
			procContent();
			setTimeout('window.location.reload(true)', g_Utils.addDelay(g_Utils.getRandRange(g_iMinReloadWait, g_iMaxReloadWait) * 1000));
		}
	}
	function procContent()
	{
		var	oJobResults,
			oNonHelpMsgs;
		// should happen first 
		if(isNextURLTimeout())
			return;
		
		g_iCurDelay = 0;
		// get the job results and process
		oJobResults = g_Utils.getSnapshot(GM_getValue('strHTPat'));
		if(oJobResults.snapshotLength > 0)
		{
			g_Utils.doLog('Content processor', 10, 'Found ' + oJobResults.snapshotLength + ' jobs...processing.', false);
			for(var i = oJobResults.snapshotLength - 1; i >= 0; i--)
				oJobResults.snapshotItem(i) != null ? procJob(oJobResults.snapshotItem(i)) : null;
			
			// all done...
			setTimeout(function(){ g_Utils.doLog('Content processor', 10, 'All jobs processed.', false); }, g_Utils.addDelay(1));
		}
		else
		{
			g_Utils.doLog('Content processor', 10, 'No jobs found.', false)
		}
		// show only jobs?
		if(g_bShowOnlyJobs && (oNonHelpMsgs = g_Utils.getSnapshot(GM_getValue('strNHTPat'))).snapshotLength > 0)
		{
			for(var i = oNonHelpMsgs.snapshotLength - 1; i >= 0; i--)
				oNonHelpMsgs.snapshotItem(i).parentNode.removeChild(oNonHelpMsgs.snapshotItem(i));
		}
		
		// set up the next iteration...
		setTimeout(loadContent, g_Utils.addDelay((g_Utils.getRandRange(g_iMinReloadWait, g_iMaxReloadWait) * 1000)));
	}
	
	// uh, this does jobs? (=
	function procJob(_nJob)
	{
		var	aOldKey = new Array(),
			reKey = new Array(),
			aJobLog = GM_getValue('aJobLog','').split('|'),
			fnSendToTimeout,
			oNextTimeout,
			oJob = 
			{
				iFriendId : _nJob.innerHTML.split('target_id%22%3A%22')[1].split('%')[0],
				strMsgTitle : '<div id="NFAP_FeedMsg" style="color:{0};font-weight:bold;">{1}</div>',
				strMsgContent : '',
				strJob : _nJob.innerHTML,
				strResult : null,
				iCode : -1,
				iCity : _nJob.innerHTML.indexOf('requestjobhelpshort_cuba') == -1 ? 1 : 2,
				iXp : -1,
				iCurrency : -1,
				iMoney : -1
			};
		
		// already dealt with this one
		if(oJob.strJob.indexOf('NFAP_FeedMsg') > -1)
			return;
						
		reKey.push(oJob.iFriendId, '[\\d]+', oJob.iCity, '-?[\\d]+', '-?[\\d]+')
		reKey = new RegExp(reKey.join(':'));
		aOldKey = GM_getValue('aJobLog','').match(reKey);
		// we have helped them before, deal with the key as needed
		if(aOldKey)
		{
			aOldKey = aOldKey.toString().split(':');
			// checked if it's expired
			if(aOldKey[1] <= (g_Utils.getCurrentTime() - GM_getValue('iPurgeTime', 60)))
			{
				aJobLog.splice(aJobLog.indexOf(aOldKey.join(':')), 1);
				GM_setValue('aJobLog', aJobLog.join('|'));
			}
			else if(aOldKey[2] == oJob.iCity)
			{
				oJob.iCode = aOldKey[3];
				oJob.iXp = aOldKey[4];
				_nJob.innerHTML = procJobObj(oJob).strMessage;
				return;
			}
		}
		// sent to the initial timeout...
		fnSendToTimeout = function()
		{
			var	strTrackURL = oJob.strJob.split('<a href="')[1].split('"')[0].replace(/&amp;/g, '&'),
				fnTrackingURLCallback,
				fnHelpURLCallback,
				aNewKey = new Array(oJob.iFriendId, g_Utils.getCurrentTime(), oJob.iCity);
			
			strTrackURL = strTrackURL.replace(GM_getValue('strMWURL_FB', 'http://apps.facebook.com/inthemafia'), GM_getValue('strMWURL_Zy', 'http://mwfb.zynga.com/mwfb'));
			
			fnTrackingURLCallback = function(_oTrackingDetails)
			{
				var	strHelpURL = _oTrackingDetails.responseText.toString().split('top.location.href = "')[1].split('"')[0];
				
				g_Utils.doLog('Track URL callback', 20, strHelpURL, false);
				g_Utils.getURL(strHelpURL, fnHelpURLCallback); 
			}
			fnHelpURLCallback = function(_oHelpDetails)
			{
				oJob.strResult = _oHelpDetails.responseText.toString();
				oJob = procJobObj(oJob);
				switch (oJob.iCode)
				{
					case 0 : // yes, you really missed it QQ
						g_ScreenLog.addStat('NFAP_Stats_JobsMissed', 1);
					break;
					case 1 : // not active...need to explore this more
						// do nothing for now...
					break;
					case 4 : // success
						g_ScreenLog.addStat('NFAP_Stats_JobsCompleted', 1);
						g_ScreenLog.addStat
						(
							oJob.iCurrency == 1 ? 'NFAP_Stats_MoneyGain_NY' : 'NFAP_Stats_MoneyGain_CU',
							oJob.iMoney
						);
						g_ScreenLog.addStat('NFAP_Stats_XPGain', oJob.iXp);
					break;
				}
				aNewKey.push(oJob.iCode, oJob.iXp)
				aJobLog.push(aNewKey.join(':'));
				GM_setValue('aJobLog', aJobLog.join('|'))
				_nJob.innerHTML = oJob.strMessage;
				g_Utils.doLog('Help URL callback', 20, oJob.strMessage.replace(/<a[^>]+>([^<]+)<\/a>/ig, '$1'), true);
			}
			
			g_Utils.getURL(strTrackURL, fnTrackingURLCallback);
		}
		setTimeout(fnSendToTimeout, g_Utils.addDelay(1000));
	}
	
	function procJobObj(_oJob)
	{
		var	aTitles = new Array
					(     
						 'Missed (too late):red',          // code = 0
						 'Missed (not active):green',      // code = 1
						 'Cannot help non-friends:black',  // code = 2
						 'Already helped:green',           // code = 3
						 '{2} experience points:green'     // code = 4
					 );
					
		if(_oJob.strResult)
		{
			_oJob.strResult = _oJob.strResult.split('<table class="messages" style=""><tr><td class="message_body">')[1];
			_oJob.strResult = _oJob.strResult.split('</td></tr></table>')[0];
			
			// buhuu - genuine missed job
			if(_oJob.strResult.toLowerCase().indexOf('more than 10 mafia members') >= 0)
				_oJob.iCode = 0;
			// missed - not active
			if(_oJob.strResult.toLowerCase().indexOf('job request is no longer active') >= 0)
				_oJob.iCode = 1;
			// this should only proc when on your own jobs...you shouldnt get non-friend feeds
			if(_oJob.strResult.toLowerCase().indexOf('not your friend') >= 0)
				_oJob.iCode = 2;
			// already helped
			if(_oJob.strResult.toLowerCase().indexOf('you have already helped') >= 0)
				_oJob.iCode = 3;
			// disco!
			if(_oJob.strResult.toLowerCase().indexOf('complete the job') >= 0)
			{
				_oJob.iCode = 4;
				_oJob.iMoney = /<(strong) class=\"money\">(C?\$[^<]+)<\/\1>/i.exec(_oJob.strResult)[2];
				_oJob.iCurrency = _oJob.iMoney.indexOf('C') == -1 ? 1 : 2;
				_oJob.iMoney = _oJob.iMoney.replace(/[^\d]+/g, '');
				_oJob.strResult = _oJob.strResult.replace(' class="money"', '');
				_oJob.strResult = _oJob.strResult.replace(/<\/?span[^>]*>/gi, '');
				_oJob.strResult = _oJob.strResult.replace(/(<img[^>]+>)/gi, '<div style="text-align:center">$1</div>');
				_oJob.strResult = _oJob.strResult.replace('{0}', _oJob.strResult.split(' ').splice(2, 3).join(' '));
				_oJob.iXp = _oJob.strResult.replace(/^\s*([.|\n]+)\s*$/m, '').split(' ')[2];
				_oJob.strMsgContent = '  ' + _oJob.strResult;
			}
		}
		if(_oJob.iCode < 0)
			return _oJob;
		
		_oJob.strMsgTitle = _oJob.strMsgTitle.replace('{0}', aTitles[_oJob.iCode].split(':')[1]);
		_oJob.strMsgTitle = _oJob.strMsgTitle.replace('{1}', aTitles[_oJob.iCode].split(':')[0]);
		_oJob.strMsgTitle = _oJob.iXp > 0 ? _oJob.strMsgTitle.replace('{2}', _oJob.iXp) : _oJob.strMsgTitle;
		_oJob.strMessage = _oJob.strMsgTitle + _oJob.strJob + _oJob.strMsgContent;
		return _oJob;
	}
	
	function isNextURLTimeout()
	{	
		var	aJobLog = GM_getValue('aJobLog', '').split('|'),
			bReturnVal = false;
			
		// time to visit the req.php page?
		if(g_Utils.getCurrentTime() - parseInt(GM_getValue('iLastReload')) >= parseInt(g_iNextURLDelay))
		{
			GM_setValue('iLastReload', g_Utils.getCurrentTime());
			// manage the helped key store
			for(var iJobKey in aJobLog)
			{
				if(aJobLog[iJobKey])
				{
					if((g_Utils.getCurrentTime() - aJobLog[iJobKey].split(':')[1]) > GM_getValue('iPurgeTime', 30))
						aJobLog.splice(iJobKey, 1);
				}
			}
			GM_setValue('aJobLog', aJobLog.join('|'));
			// load the NextURL or reload the page if it's empty
			setTimeout
			(
				function()
				{
					g_Utils.doLog('isNextURLTimeout', 10, 'Loading the NextURL...', false);
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
		GM_setValue('boolLogHidden', eElem.style.display == 'block' ? true : false);
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
			window.location.reload();
		}
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
		strStyle += '#NFAP_LogRowContainer,#NFAP_LST {border:1px solid #AAA;}';
		strStyle += '#NFAP_LT tr td {vertical-align:top;border-bottom:1px solid #CCC;}';
		strStyle += '#NFAP_LT,#NFAP_LST {width:100%;}';
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
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Auto-processor log'));
		
		// the 'more' container - holds log clear/hide links
		eElem = g_DOMUtils.doAppend('NFAP_TitleContainer', g_DOMUtils.newElem('div', 'NFAP_TitleMoreContainer', 'UIHomeBox_More'));
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('small'));
		// the more links
		// the link to hide/show the log
		if(g_bUseScreenLog)
		{
			eElem = g_DOMUtils.newElem('a', 'NFAP_A_HideLog');
			g_DOMUtils.doAppend(eElem, g_DOMUtils.newText(GM_getValue('bLogHidden', true) ? 'Hide Log' : 'Show Log'));
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
		
		// the log table main div
		g_DOMUtils.doAppend('NFAP_LogContainer', g_DOMUtils.newElem('div', 'NFAP_LogTableContainer', 'UITitledBox_Content'));
		// restore from memory or create a new one
		if(GM_getValue('strLogTable', '').length > 0)
			g_DOMUtils.getElem('NFAP_LogTableContainer').innerHTML = GM_getValue('strLogTable');
		else
			createLogTables();
		// remember if its hidden or not
		g_DOMUtils.getElem('NFAP_LogRowContainer').style.display = GM_getValue('bLogHidden', true) ? 'block' : 'none';
		g_DOMUtils.getElem('NFAP_LogRowContainer').style.display = g_bUseScreenLog ? 'block' : 'none';
		// finally save it
		saveLog();
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
		
		if(!g_DOMUtils.getElem('NFAP_TopContainer'))
			createLogContainer();
		
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
		createStatCol(eElem, 'NFAP_Stats_BonusesGain', 'Loot');
		
		// and the money rows
		createStatRow(eElem, 2, 4, 'NFAP_Stats_MoneyGain_NY', 'Money gained: NY');
		createStatRow(eElem, 2, 4, 'NFAP_Stats_MoneyGain_CU', 'Money gained: Cuba');
		
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
					headers : GM_getValue('strHeaderInfo'), 
					onload : function(responseDetails)
					{
						var strToLog = 'getURL(): ' + _strURL;
						
						if(typeof _fnCallback == 'function')
							_fnCallback(responseDetails);
						
						strToLog = strToLog.concat('\r\nWith headers: ', GM_getValue('strHeaderInfo'));
						strToLog = strToLog.concat('\r\nResponse text:\r\n', responseDetails.responseText);
						doLog('getURL()', 50, strToLog, false);
					}
				}
			);
		}
		catch(_errObj)
		{
			g_Utils.doLogError('Top level functions getURL()', 'An error ocured while trying to retrieve a URL.', _errObj, true);
		}
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