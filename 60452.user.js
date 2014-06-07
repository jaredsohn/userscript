// ==UserScript==
// @name           tae
// @description    tae
// @namespace      tae
// @version        0.2.23
// @include        http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true
// ==/UserScript==

/***** TODO *****/

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


window.setTimeout(function (){
	var d = document.body.insertBefore(document.createElement('div'), document.body.firstChild )
	b = d.appendChild(document.createElement('button') )
	b.id = 'AH_RLButton'
	b.type = 'button';
	b.style.display = 'none'
	b.setAttribute('onclick', document.getElementsByClassName('UIIntentionalStream_ShowNewStories_Msg')[0].getAttribute('onclick') )
	d.style.marginLeft = d.style.marginTop = "1em"
	links = d.appendChild(document.createElement('span'))
	links.innerHTML = '|AUTO HELP | '
	t = d.appendChild(document.createElement('table'))
	tr = t.appendChild(document.createElement('tr'))
	tr.innerHTML = '<th><a href="http://userscripts.org/scripts/show/57429" target="_blank">autohelp</a> version <span id="version">79</span></th><th>attempt</th><th>success</th><th>percent</th><th>exp gain</th>'
	makeCheckbox('cuba', true)
	makeCheckbox('moscow', true)
	makeCheckbox('ny', true)
	makeCheckbox('boost', true)
	makeCheckbox('war', false)
	tr = t.appendChild(document.createElement('tr'))
	tr.id = 'overall'
	tr.innerHTML = '<td>overall</td><td>0</td><td>0</td><td>NA</td><td>0</td>'
	b = d.appendChild(document.createElement('button'))
	b.type = 'button'
	b.setAttribute('onclick', "tb = document.getElementsByTagName('table')[0].childNodes;for(i=1;i<tb.length-1;i++)tb[i].childNodes[2].textContent = tb[i].childNodes[1].textContent = tb[i].childNodes[4].textContent = 0")
	b.textContent = 'reset all counters'
	refreshTimer = d.appendChild(document.createElement('input'))
	refreshTimer.value = GM_getValue('refreshDelay', 10)
	refreshTimer.id = 'AH_refreshDelay'
	refreshTimer.parentNode.appendChild(document.createElement('span')).textContent = '(ms) refresh delay.'
	b = d.appendChild(document.createElement('button'))
	b.id = 'AH_updateButton'
	b.textContent = 'check 4 updates'
	b.addEventListener('click', AH_updateCheck, false)
	function makeCheckbox(name, defaultval) {
		r = t.appendChild(document.createElement('tr'))
		r.id = name
		n = r.appendChild(document.createElement('td'))
		n.innerHTML = '<label><input type="checkbox" /> ' + name + '</label>'
		if (name == 'war') {
			n.innerHTML = n.innerHTML + '<label title="if checked, picks a side for wars where both sides are friends"><input type="checkbox" id="AH_betray" /> betray</label>'
			n.getElementsByTagName('input')[1].checked = GM_getValue('betray', true)
		}
		if (name == 'cuba' || name == 'ny')
		{
			n.innerHTML = n.innerHTML + '<label title="if checked, only attempts top 3 jobs for this city and disables auto-uncheck when 25 limit is reached"><input type="checkbox" /> filter</label>'
			n.getElementsByTagName('input')[1].checked = GM_getValue(name + 'Filter', true)
		}
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Attempt', 0)
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Success', 0)
		r.appendChild(document.createElement('td'))
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Exp', 0)
		n.getElementsByTagName('input')[0].checked = GM_getValue(name, defaultval)
		return r
	}

	div = d.appendChild(document.createElement('div'))
	div.id = 'AH_log'
	
	window.setInterval(function(){
		document.getElementById('cuba').getElementsByTagName('input')[0] = true
		document.getElementById('ny').getElementsByTagName('input')[0] = true
		}, 1800000 )
	window.setInterval(function(){
		tb = document.getElementsByTagName('table')[0].children
		for( var i = 1; i < tb.length - 1; i++ ) {
			n = tb[i].id
			GM_setValue(n + 'Attempt', parseInt(tb[i].childNodes[1].textContent))
			GM_setValue(n + 'Success', parseInt(tb[i].childNodes[2].textContent))
			GM_setValue(n + 'Exp', parseInt(tb[i].childNodes[4].textContent))
			GM_setValue(n, tb[i].getElementsByTagName('input')[0].checked)
			if (n == 'war')
				GM_setValue('betray', tb[i].getElementsByTagName('input')[1].checked)
			else if (n == 'cuba' || n == 'ny')
				GM_setValue(n + 'Filter', tb[i].getElementsByTagName('input')[1].checked)
		}
	}, 18000)
	window.setTimeout(function(){AH_go()}, 200)
	s = document.getElementById('home_sidebar')
	while(s.childNodes[1])
		s.removeChild(s.childNodes[1])
}, 3000)

function AH_updateCheck(){
	GM_xmlhttpRequest({method:'get', url:'http://userscripts.org/scripts/source/57429.meta.js', onload:function(r){
		s = r.responseText.toString()
		if( m = /@version\s+(\S+)/.exec(s) ){
			v = document.getElementById('version').textContent
			u = document.getElementById('AH_updateButton')
			if (m[1] == v)
				u.textContent = 'you have the latest version: ' + v
			else {
				u.textContent = 'update now! your version: ' + v + ' latest: ' + m[1]
				u.addEventListener( 'click', function(){
					u=document.getElementById('AH_updateButton')
					u.textContent = 'reload the page'
					u.addEventListener('click', function(){window.location.reload()}, false )
					window.location.href = 'http://userscripts.org/scripts/source/57429.user.js'
				}, false)
			}
		}
	} } )
}

function AH_go() {
	document.getElementById('AH_RLButton').click()
	v = parseInt(document.getElementById('AH_refreshDelay').value)
	if(!v || v < 10 || v > 22000)
		 v = 10
	GM_setValue('refreshDelay', v)
	document.getElementById('AH_refreshDelay').value = v
	var p = document.getElementById('home_stream').getElementsByClassName('UIIntentionalStream_Content')[0]
	var c = a = s = 0
	tb = document.getElementsByTagName('table')[0].children
	for(i = 1; i < tb.length - 1; i++){
		c += parseInt(tb[i].childNodes[4].textContent)
		a += parseInt(tb[i].childNodes[1].textContent)
		s += parseInt(tb[i].childNodes[2].textContent)
		num = tb[i].childNodes[1].textContent == '0' ? 100 : parseInt(tb[i].childNodes[2].textContent)*100.0/parseInt(tb[i].childNodes[1].textContent)
		tb[i].childNodes[3].textContent = Math.round(num) + '%'
	}
	row = tb[tb.length - 1].childNodes
	row[4].textContent = c
	row[1].textContent = a
	row[2].textContent = s
	num = a == '0' ? 100 : s *100.0 / a
	row[3].textContent=(Math.round(num * 100) / 100) + '%'

	functions = [function(s){job(s,1)}, function(s){job(s,2)}, function(s){job(s,3)}, boost, war]
	visted = {}
	while( d = p.firstChild ){
		var link = d.getElementsByTagName('a')
		while(l = link[0]) {
			if (URL = /(\/track\.php\?.*sendkey=(\w+?)&.+)/.exec(l.href) ){
				k = URL[2]
				if (!visted[k]){
					URL = URL[1]
					if (m = /(requestjobhelpshort_cuba|give_help_m|give_help|boost_claim|story_war_helped|story_war_declared)/.exec(URL) ){
						function procHelp(i){
							row = tb[i] 
							inputs = row.getElementsByTagName('input')
							if(inputs[0].checked ) {
								if ( i == 1 || i == 3)
									if ( inputs[1].checked && !/Take Over The Havana Reconstruction|Loot The National Museum|Launder Money Through A Resort|Shake Down a City Council Member|Take Control of a Casino|Travel to the Old Country/.test(d.textContent) )
									return
								tb[i].childNodes[1].textContent = parseInt(tb[i].childNodes[1].textContent) + 1
								URL = 'http://mwfb.zynga.com/mwfb' + URL
								httpHelp(URL, function(s){httpHelp(s.split('top.location.href = "', 2)[1].split('"', 2)[0], functions[i - 1] )})
							}
						}
						switch( m[1] ) {
							case 'requestjobhelpshort_cuba': procHelp(1); break;
							case 'give_help_m': procHelp(2); break
							case 'give_help': procHelp(3); break
							case 'boost_claim': procHelp(4);break
							case 'story_war_helped' : case 'story_war_declared': procHelp(5)
						}
						
					}
					visted[k] = true
				}
			}
			l.parentNode.removeChild(l)
		}
		p.removeChild(d)
	}
	window.setTimeout(AH_go, v)
}

function job(s, r){
	row = document.getElementsByTagName('table')[0].children[r]
	if (q = /<span class="good">(\d+) experience points<\/span>/.exec(s) ) {
		row.childNodes[4].textContent = parseInt(row.childNodes[4].textContent) + parseInt(q[1])
		row.childNodes[2].textContent = parseInt(row.childNodes[2].textContent) + 1
	}
	else if( /Sorry, you can only help 25 friends/.test(s) && !row.getElementsByTagName('input')[1].checked)
		row.getElementsByTagName('input')[0].checked = false
}

function boost(s){
	if( /You received a/.test(s) ){
		success = document.getElementById('boost').children[2]
		success.textContent = parseInt(success.textContent) + 1
	}
}

function war(s){
	function attack(s, n) {
		if (n > 5) return true
		var end = s.lastIndexOf('<span class="sexy_fight">Attack</span>')
		if (end == -1) return false
		start = s.lastIndexOf('href="http://apps.facebook.com/inthemafia/remote/html_server.php?', end)
		end = s.indexOf('"',start + 8)
		httpHelp(  s.substring(start + 6, end).replace(/&amp;/g, '&'), function(s){
			if(/WON|LOST/.test(s)) {
				row = document.getElementById('war').children
				row[4].textContent = parseInt(row[3].textContent) + 3
				row[2].textContent = parseInt(row[2].textContent) + 1
			}
			else
				attack(s, n+1)
		} )
		return true
	}
	if( !attack(s, 0) ) {
		var end = s.lastIndexOf( '<span class="sexy_fight">Betray')
		if (end == -1 || !document.getElementById('war').getElementsByTagName('input')[1].checked) return
		start = s.lastIndexOf('href="http://apps.facebook.com/inthemafia/remote/html_server.php?', end)
		end = s.indexOf('"',start + 8)
		httpHelp( 'http://apps.facebook.com/inthemafia/index.php?'  + s.substring(start + 65, end).replace(/&amp;/g, '&'), attack)
	}
}

function httpHelp(u, func, n){
	GM_xmlhttpRequest({method:'get', url:u, onload:function(r){
			if (n == undefined) n = 0
			else if (n > 5) return
			s = r.responseText.toString()
			if (!s) httpHelp(u, func, n + 1)
			else func(s)
		}
	})
}





var SCRIPT = {
  url: 'http://userscripts.org/scripts/source/59850.user.js',
  version: '0.2.23',
  name: 'inthemafia',
  appID: 'app10979261223'
};

oSettings =
{
	MinReloadWait : 2,   // in seconds
	MaxReloadWait : 2,  // in seconds
	ShowOnlyJobs  : true,
	DeleteComp    : true,
	DoBoosts      : false,
	NextURL       : 'http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true',
	NextURLDelay  : 0.500,  // in minutes
	UseScreenLog  : false,
	ScreenLogSize : 25,
	LogThreshold  : 10
}

/*****	global vars *****/
var	// used in development...spams logs a lot (=
	g_bDebugMode = false,
	// Used to make sure it's running the right version
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
	g_iScreenLogSize = oSettings.ScreenLogSize,
	g_iLogThreshold = oSettings.LogThreshold;

/*****	begin	*****/
// see if we need to init the GM vars
if(!GM_getValue('bInitialized', false) || g_bDebugMode || SCRIPT.version != GM_getValue('lastVersion', '0.0.0'))
	Init();

// this starts the whole process once the DOM is loaded
window.addEventListener('load', g_ListenerLib.proc_Start, false);
	
/*****	script management	*****/
// register GM menu commands
GM_registerMenuCommand('MWNFP: Reinitialize script level variables', g_ListenerLib.menu_Reinit);

// MARDL
if (GM_getValue('bShowOnlyJobs', oSettings.ShowOnlyJobs))
	GM_registerMenuCommand('MWNFP: Show all feeds', g_ListenerLib.menu_ShowAll);
else
	GM_registerMenuCommand('MWNFP: Show only Jobs', g_ListenerLib.menu_ShowJobs);

if (GM_getValue('bDoBoosts', oSettings.DoBoosts))
	GM_registerMenuCommand('MWNFP: Do no boosts. Jobs only', g_ListenerLib.menu_DontBoosts);
else
	GM_registerMenuCommand('MWNFP: Do boosts and jobs', g_ListenerLib.menu_DoBoosts);

if (GM_getValue('bDeleteComp', oSettings.DeleteComp))
	GM_registerMenuCommand('MWNFP: Show processed jobs and bonuses', g_ListenerLib.menu_DontDeleteComp);
else
	GM_registerMenuCommand('MWNFP: Remove processed jobs and bonuses from screen', g_ListenerLib.menu_DoDeleteComp);

// initializes script (GM) variables

function Init()
{
	if(g_bDebugMode)
		g_iLogThreshold = 100;
	
	g_Utils.doLog('Script initialization', 0, 'Initializing...', false);

	GM_setValue('lastVersion', SCRIPT.version);

	// If user previously made changes to settings, attempt to retrieve these. If this fails, default to settings above.
	GM_setValue('bShowOnlyJobs', GM_getValue('bShowOnlyJobs', oSettings.ShowOnlyJobs));
	GM_setValue('bDoBoosts', GM_getValue('bDoBoosts', oSettings.DoBoosts));
	GM_setValue('bDeleteComp', GM_getValue('bDeleteComp', oSettings.DeleteComp));
	

	
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
		strBoost	gets the boost text
 		strNHTPat	gets all non-help, non-boost related posts
		strRLLPat	where the hidden feed reload link lives...
	*****/					 
	GM_setValue('strHTPat', "//div[@class='UIStoryAttachment' and (contains(., 'help') or contains(., 'help') ) and not(contains(., 'MWFP:'))]");
	GM_setValue('strBoost', "//div[@class='UIStoryAttachment' and contains(., 'special bonus') and not(contains(., 'MWFP:'))]");
//	GM_setValue('strHTPat', "//div[@class='UIStoryAttachment_Copy']//div[@class = 'UIStoryAttachment_Title' and (contains(., 'help') or contains(., 'help') )]");
//	GM_setValue('strBoost', "//div[@class='UIStoryAttachment_Copy' and contains(., 'special bonus')]");

	GM_setValue('strNHTPat', "//div[@class='UIIntentionalStream_Content UIStream']//div[contains(@id, 'div_story_') and contains(@class, 'aid_') and not(contains(., 'special bonus')) and not(contains(., 'help')) and not(contains(., 'need'))] ");
	GM_setValue('strDelJobsPat', "//div[@class='UIIntentionalStream_Content UIStream']//div[contains(@id, 'div_story_') and contains(@class, 'aid_') and contains(., 'MWFP:')]");
	GM_setValue('strRLLPat', "//div[@class='UIIntentionalStream_ShowNewStories']");
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
			
		g_Utils.doLog('Content loader', 0, 'Starting looking for jobs & bonuses...', false);
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
			g_DOMUtils.getElem('NFAP_RLAnchor').innerHTML = 'Looking for jobs & bonuses...';
			g_DOMUtils.getElem('NFAP_RLButton').click();
			setTimeout(procContent, 1000);
		}
		catch(_errObj)
		{
			// fallback to reload just in case
			g_Utils.doLogError('Content loader', 'There was an error getting new content from FB...reloading the page.', _errObj, false);
			procContent();
			setTimeout('window.location.reload(true)', g_Utils.addDelay(g_Utils.getRandRange(g_iMinReloadWait, g_iMaxReloadWait) * 200));
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

		// show only jobs and bonuses?
		
		/*
		if(oSettings.DoBoosts)
		{
		*/
			if(GM_getValue('bShowOnlyJobs', oSettings.ShowOnlyJobs) && (oNonHelpMsgs = g_Utils.getSnapshot(GM_getValue('strNHTPat'))).snapshotLength > 0)
			{
				g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Show Only Jobs ' + oNonHelpMsgs.snapshotLength + ' non jobs deleting...processing.', false);
				for(var i = oNonHelpMsgs.snapshotLength - 1; i >= 0; i--)
					oNonHelpMsgs.snapshotItem(i).parentNode.removeChild(oNonHelpMsgs.snapshotItem(i));
			}
		/*
		} Don't need anymore, do the same like above GM_getValue('bShowOnlyJobs', oSettings.ShowOnlyJobs) ist used for jobs and boosts MARDL
		else
		{
			if(GM_getValue('bShowOnlyJobs', oSettings.ShowOnlyJobs) && (oNonHelpMsgs = g_Utils.getSnapshot(GM_getValue('strNHTPatNoBoost'))).snapshotLength > 0)
			{
				for(var i = oNonHelpMsgs.snapshotLength - 1; i >= 0; i--)
					oNonHelpMsgs.snapshotItem(i).parentNode.removeChild(oNonHelpMsgs.snapshotItem(i));
			}

		}
		*/
		try
		{
			// get the job results and process
			oJobResults = g_Utils.getSnapshot(GM_getValue('strHTPat'));
			if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' new jobs...processing.', false);
				for(var i = oJobResults.snapshotLength - 1; i >= 0; i--)
					oJobResults.snapshotItem(i) != null ? procJob(oJobResults.snapshotItem(i)) : null;
	
				// all done...
				setTimeout(function(){ g_Utils.doLog('Mafia Wars Feed Processor', 10, 'All jobs processed.', false); }, g_Utils.addDelay(1));
			}
			else
			{
				g_Utils.doLog('Mafia Wars Feed Processor', 10, 'No new jobs found.', false)
			}
		}
		catch(_errObj)
		{
			// fallback to reload just in case
			g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Failed to find Jobs. Pattern changed? '+GM_getValue('strHTPat'), true);
			g_Utils.doLogError('procContent', 'Error while getSnapshot ans so on:'+GM_getValue('strHTPat'), _errObj, false);
		}


		// get the bonus results and process
		if(GM_getValue('bDoBoosts', oSettings.DoBoosts)) // Mardl
		{
			oJobResults = 0;
			oJobResults = g_Utils.getSnapshot(GM_getValue('strBoost'));
			if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' new bonuses...processing.', false);
				for(var i = oJobResults.snapshotLength - 1; i >= 0; i--)
					oJobResults.snapshotItem(i) != null ? procBoost(oJobResults.snapshotItem(i)) : null;

				// all done...
				setTimeout(function(){ g_Utils.doLog('Mafia Wars Feed Processor', 10, 'All bonuses processed.', false); }, g_Utils.addDelay(1));
			}
			else
			{
				g_Utils.doLog('Mafia Wars Feed Processor', 10, 'No new bonuses found.', false)
			}

		}
		// Delete processed jobs after doing all jobs! MARDL
		if(GM_getValue('bDeleteComp', oSettings.DeleteComp))
		{
			oJobResults = 0;
			oJobResults = g_Utils.getSnapshot(GM_getValue('strDelJobsPat')); ;
    		if(oJobResults.snapshotLength > 0)
			{
				g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Found ' + oJobResults.snapshotLength + ' processed items... deleting.', false);
				for(var i = oJobResults.snapshotLength - 1; i >= 0; i--)
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
			aJobLog = GM_getValue('aJobLog','').split('|'),
			fnSendToTimeout,
			oNextTimeout;

      		try
      		{
        			if(_nJob != null)
        			{
        				g_Utils.doLog('Mafia Wars Feed Processor - procJob', 20, 'Feed Job HTML code: '+_nJob.innerHTML, false)
                		// already dealt with this one
                		if(_nJob.innerHTML.indexOf('NFAP_FeedMsg') > -1)
                			return;

                    	if(_nJob.innerHTML.indexOf('target_id%22%3A%22') == -1)
                    	{
	    					return;
                    	}
        				var oJob = 
        				{
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
        					iCurrency : -1,
        					iMoney : -1
        				};
        						
								// Figure out what city it is MARDL
								if (oJob.strJob.indexOf('requestjobhelpshort_cuba') != -1)
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
                        				oJob = procJobObj(oJob);
                        				if (oJob.iCode > -1) // checked, if last process work right MARDL
                        				{
                        					_nJob.innerHTML = oJob.strNewInnerHTML;
                        					return;
                        				}
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
          					if(_oTrackingDetails.responseText.toString().split('top.location.href = "')[1] != null)
          					{
          	        				var	strHelpURL = _oTrackingDetails.responseText.toString().split('top.location.href = "')[1].split('"')[0];
          	        			}
          	        			else
          	        			{
          	        				g_Utils.doLog('Mafia Wars Feed Processor', 0, 'procJob encountered error processing this: ' + _oTrackingDetails.responseText.toString(), false)
          	        			}
                        				
                        				g_Utils.doLog('Track URL callback', 20, strHelpURL, false);
                        				g_Utils.getURL(strHelpURL, fnHelpURLCallback); 
                        			}
                        			fnHelpURLCallback = function(_oHelpDetails)
                        			{
                        				oJob.strResult = _oHelpDetails.responseText.toString();
          						g_Utils.doLog('Mafia Wars Feed Processor - procJob', 20, 'Server response: ' + oJob.strResult, false);
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
			          							if(oJob.iCurrency == 1)
			          							{
			          								g_ScreenLog.addStat('NFAP_Stats_MoneyGain_NY', oJob.iMoney);
			          							}
			          							else if(oJob.iCurrency == 2)
			          							{
			          								g_ScreenLog.addStat('NFAP_Stats_MoneyGain_CU', oJob.iMoney);
			          							}
			          							else if(oJob.iCurrency == 3)
			          							{
			          								g_ScreenLog.addStat('NFAP_Stats_MoneyGain_RU', oJob.iMoney);
			          							}
                        						g_ScreenLog.addStat('NFAP_Stats_XPGain', oJob.iXp);
                        					break;
                        					case 5 : // blocked by Zynga (25 limit)
                        						g_ScreenLog.addStat('NFAP_Stats_BlockedJobs', 1);
                        					break;
                        				}
           								// Just set to success, wenn job is complett MARDL
										if (oJob.iCode > -1)
										{
	                        				aNewKey.push(oJob.iCode, oJob.iXp);
	                        				aJobLog.push(aNewKey.join(':'));
	                        				GM_setValue('aJobLog', aJobLog.join('|'));
	                        				_nJob.innerHTML = oJob.strNewInnerHTML;
	                        				g_Utils.doLog('Help URL callback', 20, oJob.strMessage, true);
	                        			}
                        			}
                        			
                        			g_Utils.getURL(strTrackURL, fnTrackingURLCallback);
                        		}
			      		setTimeout(fnSendToTimeout, g_Utils.addDelay(1000));
                        	}
                }
                catch(myException)
                {
			g_Utils.doLog('Mafia Wars Feed Processor - procJob', 0, 'While processing job, the following exception ocured: \n\r\nError name: ' + myException.name + '\n\rError message: ' + myException.message+'\n\rJOB: '+oJob.strJob, true)
                }
	}


	function procBoost(_nBoost)
	{
		var	aOldKey = new Array(),
			reKey = new Array(),
			aJobLog = GM_getValue('aJobLog','').split('|'),
			fnSendToTimeout,
			oNextTimeout;

		try
		{
			if(_nBoost != null)
			{
    				g_Utils.doLog('Mafia Wars Feed Processor - procBoost', 20, 'Feed Boost HTML code: '+_nBoost.innerHTML, false)
            		// already dealt with this one
            		if(_nBoost.innerHTML.indexOf('NFAP_FeedMsg') > -1)
            			return;

                	if(_nBoost.innerHTML.indexOf('friend_id%22%3A%22') == -1)
    					return;

    					
    				var oJob = 
    				{
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
                				_nBoost.innerHTML = procBoostObj(oJob).strNewInnerHTML;
                				return;
                			}
                		}
                		// sent to the initial timeout...
                		fnSendToTimeout = function()
                		{
                			var	strTrackURL = oJob.strBoost.split('<a href="')[1].split('"')[0].replace(/&amp;/g, '&'),
                				fnTrackingURLCallback,
                				fnHelpURLCallback,
                				aNewKey = new Array(oJob.iFriendId, g_Utils.getCurrentTime(), oJob.iCity);
                			
                			strTrackURL = strTrackURL.replace(GM_getValue('strMWURL_FB', 'http://apps.facebook.com/inthemafia'), GM_getValue('strMWURL_Zy', 'http://mwfb.zynga.com/mwfb'));
                			
                			fnTrackingURLCallback = function(_oTrackingDetails)
                			{
        					if(_oTrackingDetails.responseText.toString().split('top.location.href = "')[1] != null)
        					{
        	        				var	strHelpURL = _oTrackingDetails.responseText.toString().split('top.location.href = "')[1].split('"')[0];
        	        			}
        	        			else
        	        			{
      							g_Utils.doLog('Mafia Wars Feed Processor - procBoost', 0, 'Encountered error processing this: ' + _oTrackingDetails.responseText.toString(), false)
        	        			}
                				
                				g_Utils.doLog('Track URL callback', 20, strHelpURL, false);
                				g_Utils.getURL(strHelpURL, fnHelpURLCallback); 
                			}
                			fnHelpURLCallback = function(_oHelpDetails)
                			{
                				oJob.strResult = _oHelpDetails.responseText.toString();
        					g_Utils.doLog('Mafia Wars Feed Processor - procBoost', 20, 'Server response: ' + oJob.strResult, false);
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
                				aNewKey.push(oJob.iCode, oJob.iXp)
                				aJobLog.push(aNewKey.join(':'));
                				GM_setValue('aJobLog', aJobLog.join('|'))
                				_nBoost.innerHTML = oJob.strNewInnerHTML;
                				g_Utils.doLog('Help URL callback', 20, oJob.strMessage, true);
                			}
                			
                			g_Utils.getURL(strTrackURL, fnTrackingURLCallback);
                       		}
       		      		setTimeout(fnSendToTimeout, g_Utils.addDelay(1000));
                       	}
                }
                catch(myException)
                {
					g_Utils.doLog('Mafia Wars Feed Processor - procBoost', 0, 'While processing boost, the following exception ocured: \n\r\nError name: ' + myException.name + '\n\rError message: ' + myException.message+'\r\n innerhtml:'+_nBoost.innerHTML, true)
                }
	}

	
	function procJobObj(_oJob)
	{
		var	aTitles = new Array
					(     
						 'Missed (too late):red',		// code = 0
						 'Missed (not active):orangered',	// code = 1
						 'Cannot help non-friends or yourself:black',	// code = 2 MARDL text changed
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
        				
						g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Scan jobs to fast for zynga changed the resultpage. I try again', false);
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
        				g_Utils.doLog('Mafia Wars Feed Processor - procJobObj', 20, 'Money detected: ' + _oJob.iMoney, false);
        				// Find Currency
        				_oJob.iCurrency = _oJob.iCity; // MARDL 
        				/*
        				if(_oJob.iMoney.indexOf('C$') != -1)
        				{
        					_oJob.iCurrency = 2;
        				}
        				else if(_oJob.iMoney.indexOf('R$') != -1)
        				{
        					_oJob.iCurrency = 3;
        				}
        				else //if(_oJob.iMoney.indexOf('$') != -1) has to be Dollar
        				{
        					_oJob.iCurrency = 1;
        				}
        				*/
        				//_oJob.iCurrency = _oJob.iMoney.indexOf('C') != -1 ? _oJob.iMoney.indexOf('R') != -1 ? 3 : 2;
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
        				g_Utils.doLog('ERROR', 10, 'UNRECOGNIZED RESPONSE _oJob.strResult=' + _oJob.strResult, false);
        				_oJob.iCode = 6; 
        			}
        		}
		}
		catch(myException)
		{
			g_Utils.doLog('Mafia Wars Feed Processor', 0, 'Job error details: \n\rFriend ID:'+_oJob.iFriendId+'\n\rMsgTitle: '+_oJob.strMsgTitle+'\n\rHTML Code: '+_oJob.strJob+'\n\n\rException details: Line '+myException.lineNumber+'\n\r'+myException.name+'\n\r'+myException.message, true);
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
        				
						g_Utils.doLog('Mafia Wars Feed Processor', 10, 'Scan boosts too fast or zynga changed the resultpage. I try again', false);
						_oBoost.iCode = -1;
						return _oBoost;
					}
        			_oBoost.strResult = _oBoost.strResult.split('</td></tr>')[0];
        
        			g_Utils.doLog('Mafia Wars Feed Processor - procBoostObj', 20, 'Boost result: ' + _oBoost.strResult, false)
        
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
        			else if(_oJob.strResult.toLowerCase().indexOf('not friends with') >= 0)
        				_oBoost.iCode = 3;
        			else if(_oBoost.strResult.toLowerCase().indexOf('not your friend') >= 0)
        				_oBoost.iCode = 3;
        			else if(_oBoost.strResult.toLowerCase().indexOf('you can') >= 0)
        				_oBoost.iCode = 3;
        			else
        			{
        				g_Utils.doLog('ERROR', 10, 'UNRECOGNIZED RESPONSE _oBoost.strResult=' + _oBoost.strResult, false);
        				_oBoost.iCode = 4;
        			}
        
        			g_Utils.doLog('Mafia Wars Feed Processor - procBoostObj', 20, 'iCode returned: ' + _oBoost.iCode.toString(), false)
        			g_Utils.doLog('Mafia Wars Feed Processor - procBoostObj', 20, 'Boost received: ' + _oBoost.strMsgContent, false)
        		}
		}
		catch(myException)
		{
			g_Utils.doLog('Mafia Wars Feed Processor', 0, 'Boost error details: \n\rFriend ID:'+_oBoost.iFriendId+'\n\rMsgTitle: '+_oBoost.strMsgTitle+'\n\rHTML Code: '+_oBoost.strBoost+'\n\n\rException details: Line '+myException.lineNumber+'\n\r'+myException.name+'\n\r'+myException.message, true);
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
		
		var newText = _oJobOrBoosts.strNewInnerHTML;
		if(newText.indexOf('UIStoryAttachment_Copy') >= 0)
			newText = newText.match(/UIStoryAttachment_Copy\">(.*)<\/div>/)? RegExp.$1 : newText;

		_oJobOrBoosts.strMessage =  _oJobOrBoosts.strMsgTitle + newText + "<div style='font-weight: bold;'>" + _oJobOrBoosts.strMsgContent + "</div>";
		_oJobOrBoosts.strNewInnerHTML =  _oJobOrBoosts.strNewInnerHTML + "<div style='font-weight: bold;'>MWFP: " + _oJobOrBoosts.strMsgTitle + _oJobOrBoosts.strMsgContent + "</div>";
		
		_oJobOrBoosts.strMessage = _oJobOrBoosts.strMessage.replace("class="+String.fromCharCode(34)+"UIStoryAttachment_Title"+String.fromCharCode(34)," ");
		_oJobOrBoosts.strMessage = _oJobOrBoosts.strMessage.replace(/<a[^>]+>([^<]+)<\/a>/ig, '$1');
		return _oJobOrBoosts;
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
	
	this.click_CheckUpdate = function()
	{
		try {
		if (!GM_getValue) {
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
			g_Utils.doLog('Mafia Wars Feed Processor', 0, 'Check for updates failed\n\rException details: '+myException.name+'\n\r'+myException.message, true);
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
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Mafia Wars Feed Processor - Build ' + SCRIPT.version + ' - Log'));
		
		// the 'more' container - holds log clear/hide links
		eElem = g_DOMUtils.doAppend('NFAP_TitleContainer', g_DOMUtils.newElem('div', 'NFAP_TitleMoreContainer', 'UIHomeBox_More'));
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newElem('small'));
		// the link to check update
		eElem = g_DOMUtils.newElem('a', 'NFAP_A_CheckUpd', 'UIHomeBox_CheckUpdLink');
		g_DOMUtils.doAppend(eElem, g_DOMUtils.newText('Check for updates'));
		eElem.addEventListener("click", g_ListenerLib.click_CheckUpdate, false);
		g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, eElem);
		// link spacer
		g_DOMUtils.doAppend(g_DOMUtils.getElem('NFAP_TitleMoreContainer').firstChild, g_DOMUtils.newText(' | '));
		
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
		
		checkUpdateForInfo();
		

	}
	
	function checkUpdateForInfo()
	{
		try {
		if (!GM_getValue) {
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
				g_DOMUtils.getElem('NFAP_A_CheckUpd').innerHTML = '<span style="text-decoration:blink">updates '+theOtherVersion+' available</span>';
		    } else {
		      return;
		    }
		  }
		});
		} catch (ex) {
			g_Utils.doLog('Mafia Wars Feed Processor', 10, 'checkUpdateForInfo failed\n\rException details: '+myException.name+'\n\r'+myException.message, true);
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
		createStatCol(eElem, 'NFAP_Stats_BonusesGain', 'Bonuses');
		
		// and the money rows
		createStatRow(eElem, 2, 4, 'NFAP_Stats_BlockedJobs',  'Zynga Blocked Jobs: ');
		createStatRow(eElem, 2, 4, 'NFAP_Stats_MoneyGain_NY', 'Money gained: NY');
		createStatRow(eElem, 2, 4, 'NFAP_Stats_MoneyGain_CU', 'Money gained: Cuba');
		createStatRow(eElem, 2, 4, 'NFAP_Stats_MoneyGain_RU', 'Money gained: Russia');
		
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









