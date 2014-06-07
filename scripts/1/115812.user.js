// ==UserScript==
// @name WH
// @namespace WH
// @version v0.1
// @description For Personal Use Only
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include http://www.facebook.com/plugins/serverfbml.php*
// @include https://apps.facebook.com/inthemafia/*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://www.facebook.com/plugins/serverfbml.php*
// ==/UserScript==

/*
	$Id: mission-war-hunter.js,v 1.13 2011-08-12 12:05:57 martin Exp $
	Derived from Stream Helper by Spockholm Mafia Tools
	Changes for War/Operation-checking by Eike  
  	
	Changelog:
	v1.00	First official release.
	v1.01	Rename of Missions to Operations
	v1.02	Autosave and load settings, Improved box
	v1.03   Bugfix
	v1.04	new Operations
	v1.05	new Operations
	v1.06	FB API changes
*/

javascript: (function () {
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
	}
	else if (document.getElementsByName('mafiawars')[0]) {
		window.location.href=document.getElementsByName('mafiawars')[0].src;
		return;
	}
	else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
		window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
		return;
	}
	else if (document.getElementById('some_mwiframe')) {
		//new mafiawars.com iframe
		window.location.href=document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
			if(typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent; 
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer=-1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);			
			document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
		}
		catch (fberr) {}
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
	}
	FB.init({
		appId  : '10979261223',
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		frictionlessRequests   : true
	});
	//FB.getLoginStatus();
	
  var userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
  var fbuserid = User.trackId;
  var version = 'Operation/War Hunter v1.06 beta',
    aft = '&skip_interstitial=1&skip_req_frame=1',
    mw_url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&user=',
    fb_url = 'http://www.facebook.com/profile.php?id=',
    manual = 0,
    combinedloot = '',
    money = [],
	jobsdone = [],
	jobsnum = [],
	other_apps = [],
    exp = 0,
    run = 0,
    wait = 0,
	t = new Date(),
    wait1 = 4,
    wait2 = 6,
	limit = 100,
	pause = 0,
	ratiolvl = 99,
	ratiolvl2 = 99,
	expneed = 0,
	reverse = false,
	retries=0,
    content = document.getElementById('popup_fodder'),
	preurl = 'http://facebook.mafiawars.zynga.com/mwfb/';
  var loots = new Array();
  var debug = false;
  var debug2 = false;
  var stash_filter = '';
//  if (debug) { console.log('In debug mode.'); }
	var stopimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7';
	var playimg = 'data:image/gif;base64,R0lGODlhEAAQAMQAAP8A/2K1SIHOEXbIAIPTHZXbMIDRFnbIAXfJA33OEM/vqIbWJHrMC5HLf3jKB/D/3/X/6fn/8uz/1ej/zJjcRc7vpv3/+qHfVP///+T/xAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAVqICCOZEk2QaqmTRlUSizHVTA21LXs/H5RLUCAQCRgikib0MA0WCzNpjKQqCYiWGt1yugyIGCIlzF1mB2P9OPsmCLeCIkc/p4e7ofJBI+fDv4DGYCDSg0Ch4iJh0FCBY6PkEo3KyuMJpcjIQA7';
	var pauseimg = 'data:image/gif;base64,R0lGODlhEAAQAOYAAP8A/zaa/3O4/xal/6jd//L6//r9/87s/8bp/+r3/+Dz/////9bv/xel/xim/xun/xyn/1zA/1a+/0q5/y6u/yWr/x6o/3nL/0S3/yGp/6fd/xqn/2fE/zmz/zmy/2jF/yKq/4rS/27H/3bK/026/zOw/zGw/z+0/1q//0i4/0O2/0m5/3HI/zax/3fK/ySq/067/1O8/1G8/1m//y2u/z20/2HC/5DU/3vM/1C7/yis/x+o/zCv/6vf/3LI/4vS/yOq/zqz/23H/z+1/z60/zuz/zWx/1i+/1vA/2LC/2rF/33N/0u6/2bE/3PJ/yyu/3jL/2nF/y+v/yms/2TD/4nR/6re/xmm/2DC/ySr/3rM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAewgACCg4SFhAIBiYqJAoUBPQSRkRoaBFYBgwI3IThaFxdQLiNLP1WNAAFOPiwLCyJCrUpRH5ioHE1UBgY2WLoRSCi1ATNHEgUFMTLHMCRMwhMrKQkJGCrTQ0Q1wkVBHQoKLUbfJjxSwhQ0TwwMUzrrFVkvwkAgGQcHOxb3EBAPwhsbriBA4MDBwAYNBtQSMKChwwYOHljIUOEUKgolPJzAMCGHhAhJamVatMiioZODAgEAOw%3D%3D';

	//new code for keeping track of last job checked
	var lastpost = readCookie('sh_timelast');
	if (lastpost) { lastpost=lastpost.replace(/[^0-9]/g,''); }
	if ((lastpost == null) || (lastpost.length == 0)) { lastpost = 0; }
	var tmp_currentDate = new Date();
	var tmp_timediff = parseInt(tmp_currentDate.getTime()-lastpost);
	var tmp_minutes = parseInt(tmp_timediff/60/1000);
	var sincelast = parseFloat(tmp_minutes/60).toFixed(1);
	
var missionMapLength = 35;
var missionMap = {
	0: '<span class="good">All Operations</span>',
	1: 'Bank Robbery <font color="yellow">(Medium)</font> <span class="more_in">(Code Breaker)</span>',
	2: 'Truck Hijacking <font color="green">(Easy)</font> <span class="more_in">(Blasting Caps)</span>',
	3: 'Steal A Dockyard Shipment <font color="red">(Hard)</font> <span class="more_in">(Earbud Shades)</span>',
	4: 'Fight Off a Rival Mafia <font color="yellow">(Medium)</font>',
	5: 'Take Out a Rival Operation <font color="red">(Hard)</font> <span class="more_in">(Fake Identity)</span>',
	6: 'Bribe a Government Official <font color="yellow">(Medium)</font> <span class="more_in">(Mook Jong)</span>',
	7: 'Unknown 7', // Halloween event
	8: 'Unknown 8', // Halloween event
	9: 'Unknown 9', // Halloween event
	10: 'Stuff The Bird <font color="orange">(Event)</font>', // Thanksgiving event
	11: 'Holiday Traffic <font color="orange">(Event)</font>', // Whatever event
	12: 'Bribe a Contact <font color="green">(Easy)</font> <span class="more_in">(Sniper Scope)</span>', 
	13: 'Transport Stolen Uranium <font color="red">(Hard)</font> <span class="more_in">(Stick Shift Grip)</span>',
	14: 'Secret Santa <font color="orange">(Event)</font>',
	15: 'Secure Rudolph <font color="orange">(Medium)</font>',
	16: 'Steal The Ball <font color="green">(Easy)</font>',
	17: 'Narco Trafficking <font color="red">(Easy)</font>',
	18: 'Hijack An Ocean Liner <font color="orange">(Medium)</font>',
	19: 'Evade The Coast Guard <font color="red">(Hard)</font>',
	20: 'Take Out a Rival Operation <font color="red">(Hard)</font>',
	21: 'Unknown 21',
	22: 'Unknown 22',
	23: 'Frame a Rival Don',
	24: 'Take Over Airport Control <font color="orange">(Medium)</font>',
	25: 'Fix the Triple Crown <font color="red">(Hard)</font>',
	26: 'Steal Government Research <font color="red">(Hard)</font>',
	27: 'Unknown 27',
	28: 'Unknown 28',
	29: 'Unknown 29',
	30: 'Unknown 30',
	31: 'Unknown 31',
	32: 'Unknown 32',
	33: 'Unknown 33',
	34: 'Unknown 34',
	35: 'Unknown 35'
}  

readCookieStuff();
var config_html = 
'<style type="text/css">' + 
        '.messages img{margin:0 3px;vertical-align:top};' + 
        '#close{display:inline};' + 
'</style>' + 
'<table class="messages" style="margin-bottom: 5px;";>' + 
        '<tr><td colspan="2"></td><td align="right" style="text-align:right;font-size:0.8em">' + version + ' - Visit <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a>  - <a href="#" id="close"><img src="'+stopimg+'" title="Close" width="16" height="16"></a></td></tr>' + 
        '<tr>' + 
                '<td>Status:</td>' + 
                '<td colspan="2" id="status"></td>' + 
        '</tr>' + 
        '<tr><td>Hours to load: </td><td><input type="text" id="text_hours" value="1" size="5"/></td><td>Decimals are usable, 0.5 for 30 minutes.';
		if (lastpost > 0) { config_html +=' <span class="good">'+sincelast+' since oldest checked post</span>.'; }
		config_html +=	'</td></tr>'+
		'<tr><td>Posts / request: </td><td><input type="text" id="limit" value="100" size="4"/></td><td>If you are having trouble, try lowering this value. <span id="limitmsg" class="bad"></span></td></tr>' + 
        '<tr><td>Delay interval:</td><td><input type="text" name="wait1" id="wait1" value="'+wait1+'" size="3">-<input type="text" name="wait2" id="wait2" value="'+wait2+'" size="3"></td><td>Delay in seconds between checks.</td></tr>' +
		'<tr><td>Operations: </td><td colspan="2"><input type="checkbox" id="cb_missions"/>Scan for active operations. <span class="more_in">(Manual clicking needed)</span></td></tr>' +
    '<tr id="cb_missions_row" style="display:none;"><td></td><td colspan="2">'+
	'<div id="div_missions" style="display:none;">'+
    getAllMissionsHTML() +
    '</div></td></tr>'+
        '<tr><td>War: </td><td colspan="2"><input type="checkbox" id="cb_wars"/>Scan for active wars. <span class="more_in">(Manual fighting only)</span></td></tr>' + 
		'<tr><td></td><td colspan="2"><a id="owh_askperm">Ask permission</a> to read news feed. Will only blink if already allowed.</td></tr>'+
		//'<tr><td><span class="more_in">Debug2:</span></td><td colspan="2"><input type="checkbox" id="cb_debug2"/><span class="more_in">Popup the result object (only for debugging purposes)</span></td></tr>' + 
        '<tr><td colspan="3"><a class="sexy_button_new medium green" id="start"><span><span>Scan Facebook feed</span></span></a></td></tr>' + 
'</table>';

var running_html = 
'<style type="text/css">' + 
        '.messages img{margin:0 3px;vertical-align:middle}' + 
        '.messages iframe{border:0;margin:0 3px}' + 
        '.messages input {border: 1px solid #111;margin 0; width: 25px;}' + 
		'.messages { padding-bottom: 50px; }'+
        '#close{display:inline}' + 
        '#play{display:inline}'+
        '#pause{display:none}'+
'</style>' + 
'<table class="messages" style="margin-bottom: 5px;";>' + 
        '<tr>' + 
                '<td width="17%"><a href="#" id="next">Next link</a></td>' + 
                '<td id="attempts"></td>' + 
                '<td align="right" style="text-align:right;font-size:0.8em">' + version + ' - Visit <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?OperationWarHunter" id="donate" alt="Donate to Spockholm" target="_blank">Donate</a> - <a href="#" id="play"><img src="'+playimg+'" title="Play" alt="Play" width="16" height="16" /></a> <a href="#" id="pause"><img src="'+pauseimg+'" title="Pause" alt="Pause" width="16" height="16" /></a> <a href="#" id="close"><img src="'+stopimg+'" title="Close" alt="Close" width="16" height="16" /></a></td>' + 
        '</tr>' + 
        '<tr>' +
          '<td colspan="3"><div id="spockcontent" class="player_updates">' +
          '<table>'+
          '<tr>' + 
                  '<td colspan="3" id="specialmsg"></td>' + 
          '</tr>' + 
          '<tr>' + 
                  '<td valign="top">Status:</td>' + 
                  '<td colspan="2" id="status"></td>' + 
          '</tr>' +
          '<tr id="war_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="war_logshow">Wars</a>:</td>' + 
                  '<td colspan="2"><span id="war_count"></span><table id="war_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="war2_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="war2_logshow">active Wars</a>:</td>' + 
                  '<td colspan="2"><span id="war2_count">0 wars</span><table id="war2_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="mission_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="mission_logshow">Operations</a>:</td>' + 
                  '<td colspan="2"><span id="mission_count"></span><table id="mission_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="mission2_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="mission2_logshow">open Operations</a>:</td>' + 
                  '<td colspan="2"><span id="mission2_count">0 operations</span><table id="mission2_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '</table></div></td></tr>' + 
'</table>';

function getAllMissionsHTML(){
	var result='';
	for(var i=0;i<missionMapLength;i++) {
		//if((i!=7)&&(i!=8)&&(i!=9)&&(i!=11)) {
			result += '<input type="checkbox" id="cb_mission_'+i+'"/>'+missionMap[i]+'<br>';
		//}
	}
	return result;
}

function create_div() {
	if (document.getElementById('spockdiv')) {
		document.getElementById('spockdiv').innerHTML = config_html;
    }
	else {
		var spock_div = document.createElement("div");
		spock_div.id = 'spockdiv';
		spock_div.innerHTML = config_html;
		content.insertBefore(spock_div, content.firstChild);
    }
}

create_div();

function close() {
	run = 0;
	content.removeChild(document.getElementById("spockdiv"));
	return false;
}
document.getElementById("close").onclick = close;
$('#owh_askperm').click(function() {
		FB.login(function (response) {},
		{ perms: 'read_stream' });
});
function my_toggle(s) {
	var p = document.getElementById(s);
	p.style.display = p.style.display == '' ? 'none' : '';
	return false;
}

document.getElementById('limit').onkeyup = function () {
	if (parseInt(document.getElementById('limit').value) > 100) {
		document.getElementById('limitmsg').innerHTML = 'Above 100 is not recommended!';
	}
	else {
		document.getElementById('limitmsg').innerHTML = '';
	}
};

if (debug) {
my_toggle()
}


document.getElementById('cb_missions').onclick = function () {
	my_toggle('cb_missions_row');
	my_toggle('div_missions');
}

// createCookie from Vern's Toolkit http://vern.com/mwtools/
function createCookie(name,value) {
	// expire one month from now
	var expires = new Date();
	expires.setDate(expires.getDate()+30);
	document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
}

// readCookie from Vern's Toolkit http://vern.com/mwtools/
function readCookie(name) {
	var i,
		cookie,
		nameEQ = name+"=",
		cookieArray = document.cookie.split(";");
	for (i=0; i< cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0)==' ')
			cookie = cookie.substring(1,cookie.length);
		if (cookie.indexOf(nameEQ) == 0)
			return cookie.substring(nameEQ.length,cookie.length);
	}
	return null;
}

function saveSettings(){
	var cook='';
	cook+=document.getElementById('limit').value+'|';
	cook+=document.getElementById('wait1').value+'|';
	cook+=document.getElementById('wait2').value+'|';
	cook+=document.getElementById("text_hours").value+'|';

	cook+=document.getElementById('cb_missions').checked+'|';
	cook+=document.getElementById('cb_wars').checked+'|';
	cook+=document.getElementById('cb_mission_0').checked+'|';
	
	var el;
	for(var i=1;i<missionMapLength;i++){
		if((el=document.getElementById('cb_mission_'+i)) != null) {
			if (el.checked) {
				cook+=i+'|';
			}
		}
	}
	createCookie('spowhsettings',cook);
}
function loadSettings(){
//	try {
	var cook=readCookie('spowhsettings');
	if (cook) {
		var fields=cook.split('|');
		if (fields.length>6) {
			document.getElementById('limit').value=fields[0];
			document.getElementById('wait1').value=fields[1];
			document.getElementById('wait2').value=fields[2];
			document.getElementById("text_hours").value=fields[3];

			document.getElementById('cb_missions').checked=(fields[4]=='true');
			if (fields[4]=='true') { 	my_toggle('cb_missions_row'); my_toggle('div_missions'); }
			document.getElementById('cb_wars').checked=(fields[5]=='true');
			document.getElementById('cb_mission_0').checked=(fields[6]=='true');
			for(var i=7;i<fields.length;i++){
				if (document.getElementById('cb_mission_'+fields[i])) {
					document.getElementById('cb_mission_'+fields[i]).checked='true';
				}
			}


		}
	}
}
loadSettings();

var dataObject = function () {
    var ach_count = 0,
      boss_count = 0,
      job_count = 0,
      launder_count = 0,
      loot_count = 0,
      war_count = 0,
      war2_count = 0,
	  mission_count = 0,
	  mission2_count = 0,
      stash_count = 0,
      bonus_count = 0,
	  loyal_count = 0,
      post_count = 0,
	  chop_count = 0,
	  crew_count = 0,
	  burner_count = 0,
	  fans_count = 0,
      objects = [],
      links = [],
      wars_over = [],
      stash_search = [],
	  do_reverse = false,
      do_wars = false,
  	  do_mission = false,
  	  do_missions = [],
  	  do_missions_all = false,
  	  do_missionbonus = false;
  	  
	var currentPageCount = 1;
    job_city = [false, false, false, false, false, false];
    hours = 1,
    start_time = new Date(),
    target_time = new Date(),
    self = {
      getHours: function () {
        return hours;
      },
      requestData: function () {
        //console.warn('start_time = ' + target_time.toString() + ' end_time=' + start_time.toString());
        //FB.Facebook.apiClient.stream_get('', (target_time.getTime() / 1000), (start_time.getTime() / 1000), limit, 'app_10979261223', self.dataReceived);
		//FB.Facebook.apiClient.stream_get('', (target_time.getTime() / 1000), (start_time.getTime() / 1000), limit, '', self.dataReceived);
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE filter_key='app_10979261223' AND created_time > (now() - 4*60*60) LIMIT 50";
		
		//orginal stream helper query
		var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+fbuserid+"') AND viewer_id = '"+fbuserid+"' AND app_id = '10979261223' AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;
		
		//query without app id
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+userid+"') AND viewer_id = '"+userid+"' AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;

		//big j app id added
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+userid+"') AND viewer_id = '"+userid+"' AND (app_id = '10979261223' OR app_id = '294376243098') AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;
		//console.log(fql);
		
		//get all posts with app id
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+userid+"') AND viewer_id = '"+userid+"' AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;
		
		//unknown query
		//var fql="SELECT post_id, actor_id, target_id, message FROM stream WHERE source_id in (SELECT target_id FROM connection WHERE source_id='"+FB.Facebook.apiClient.get_session().uid+"') AND is_hidden = 0";
		//FB.ensureInit(function() {
			//FB.Facebook.apiClient.fql_query(fql, self.dataReceived);
		//});
		FB.api({
            method: 'fql.query',
            query: fql
        },
		function (response) {
            self.dataReceived(response);
        });
		//FB.Facebook.apiClient.fql_query(fql, self.dataReceived);
      },
      init: function () {
		saveSettings();
		do_mission = document.getElementById('cb_missions').checked;
		do_wars = document.getElementById('cb_wars').checked;

		if (document.getElementById('cb_mission_0')) {
			do_missions_all = document.getElementById('cb_mission_0').checked;
		}
		
		var el;
		for(var i=1;i<missionMapLength;i++){
			if((el=document.getElementById('cb_mission_'+i)) == null) {
				do_missions[i] = false;
			} 
			else {
				do_missions[i] = el.checked;
			}
		}

 

		limit = parseInt(document.getElementById('limit').value);
        wait1 = parseInt(document.getElementById('wait1').value);
        wait2 = parseInt(document.getElementById('wait2').value);

        hours = parseFloat(document.getElementById("text_hours").value.replace(",","."));
        if (hours < 0) hours = 1;
        if (hours > 24) hours = 24;
        target_time.setTime(start_time.getTime() - 1000 * 60 * 60 * hours);
		//writeCookieStuff(); //Write the cookie for the secret stash
      },
      dataReceived: function (results, exception) {
		if (debug2) { 
			function dirtypop() {
				var generator=window.open('','name','height=500,width=600');
				generator.document.write('<html><head><title>Stream Helper debug window</title>');
				generator.document.write('</head><body>');
				generator.document.write('<pre>Response given when we tried to read the FB stream:</pre><textarea rows="20" cols="70">');
				generator.document.write(results.toSource()+'\n');
				// for(var key1 in results) {
					// var obj = results[key1];
					// for(var key2 in obj) {
						// var attrName = key2;
						// var attrValue = obj[key2];
						// generator.document.write(key1+' '+attrName+': '+attrValue+'\n');
					// }
				// }
				generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
				generator.document.write('</body></html>');
				generator.document.close();
			}
			dirtypop();
		}
        if (exception != null) msg("Error during execution: " + exception.toString());
        if (!results) {
          msg('<span class="bad">No matching links were found, increase time or add more categories.</span><br />You should try reloading the game.<br />Also make sure you have asked for permission on this account.<br />Check if Mafia Wars is <a href="http://www.facebook.com/home.php?sk=lf">visible in your news feed</a>.');
        }
        function includeJob(city, job) {
			try {
				var m = /\((.+)\)/.exec(cityJobMap[city][job]);
				var tier = cityTierMap[city][m[1]];
				return tier >= tier_city[city - 1];
			}
			catch (joberr) {
				return false;
			}
        }

        var i;
        var m;
        //var posts = results['posts'];
		var posts = results;
        //var profiles = results['profiles'];
        var names = {};
        var done = false;
        var last_time = new Date();
        var time_minus_6h = new Date();
        time_minus_6h.setTime(time_minus_6h.getTime() - 6 * 60 * 60 * 1000); // time cutoff for wars
        //for (i = 0; i < profiles.length; i++) {
          //var p = profiles[i];
          //names[p['id']] = p['name'];
        //}
        post_count += posts.length;
        msg('Received ' + post_count + ' posts');
		
		//start for each posts loop
        for (i = 0; i < posts.length; i++) {
			var res = posts[i];
			t = new Date(parseInt(res['created_time'])*1000);
			last_time = t;
			//console.log(res['app_data']['attachment_data']);
			//start app id if check
			//if ((res['app_id'] == 10979261223) || (res['app_id'] == 294376243098)) {
			if (res['app_id'] == 10979261223) {
				//if (debug && (res['action_links'] != null)) { console.log(res['action_links']); }
				if (res['action_links'] != null) {
					var a = res['action_links'][0]['href'].replace(/&amp;/g, '&');
					var text = res['action_links'][0]['text'];
					//console.warn('[' + i + ']=' + t.toString());
					//console.log(parseInt(res['created_time'])+' '+t);
					//var n = names[res['source_id']];
					var n = res['actor_id'];
					var str;
					var ts;

					if (do_wars && (m = /next_controller=war.*leader_id%22%3A%22(p%7C\d+)%22/.exec(a))) {

//next_controller=war&next_action=view&next_params=%7B%22leader_id%22%3A%22p%7Cxxxxxx%22%7D\
/*remote/html_server.php?
xw_controller=war&amp;
xw_action=view&amp;
xw_city=6&amp;
tmp=b4fbdc8f268368d3c6e4fdc7d1550304&amp;
cb=cad5da70fd1811dfbc986bf4d458df1c&amp;
xw_person=95497006&amp;
leader_id=p|xxxxx
*/					
            str = "remote/html_server.php?xw_controller=war&xw_action=view&leader_id=" + m[1];
//						if (! (m[1] in wars_over) && links.indexOf(str) == -1 && t.getTime() >= time_minus_6h.getTime()) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'war',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								leader_id: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a war!' + mwlink(m[1]) + original_link(a, 'War') + '</span>'
							};
							links[links.length] = str;
							war_count++;
//						}
					} 
					//new missions start
					//else if (do_mission && (m = /joinMission.*?owner_id%22%3A%22p%7C(\d+)%22%2C%22feed_key%22%3A%22(\d+)%22%2C%22instance_id%22%3A%22([a-f0-9]+)%22%2C%22mission_num%22%3A%22(.*?)%22/.exec(a))) {
					else if (do_mission && (m = /joinMission.*?owner_id%22%3A%22((p%7C)?\d+)%22%2C%22feed_key%22%3A%22(\d+)%22%2C%22instance_id%22%3A%22([a-f0-9]+)%22%2C%22mission_num%22%3A%22(.*?)%22/.exec(a))) {
/*remote/html_server.php?
xw_controller=socialmission&amp;
xw_action=joinMissionValid&amp;
xw_city=1&amp;tmp=0716ecb7e5235d04d4aab140eebd99ec&amp;
cb=7db711d0f5fe11dfa749ffea164022e3&amp;
xw_person=xxxxx&amp;
time_id=1290366560&amp;
instance_id=4ce816a34463c&amp;
owner_id=xxxxx&amp;
event_hash=4197363174ce96e7299fa7&amp;
event_type=3054&amp;
src=2
*/
						if (do_missions[m[5]] || do_missions_all) {
  						str = 'remote/html_server.php?xw_controller=socialmission&xw_action=joinMissionValid&owner_id='+m[1]+'&feed_key='+m[3]+'&instance_id='+m[4]+'&mission_num='+m[5]+'&event_type=3054&src=2';
  						if (links.indexOf(str) == -1) {
  							ts = timestamp(t);
  							var mission = missionMap[m[5]];
  							objects[objects.length] = {
  								name_str: n,
  								url: str,
  								original_url: a,
  								type: 'mission',
  								timestamp: ts,
  								original_time: parseInt(res['created_time'] * 1000),
  								friend: m[1],
  								loot: m[2],
  								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a ' + mission + ' Operation. '+original_link(a, 'Operation')
  							};
  							links[links.length] = str;
  							mission_count++;
  						}
  					}
  				}
				}
				//end app_id if check
				//count other apps
				else {
					other_apps[res['app_id']] > 0 ? other_apps[res['app_id']]++ : other_apps[res['app_id']] = 1;
				}
			  
				if (t.getTime() <= target_time.getTime()) {
					done = true;
					break;
				}
			}
        }
		//end for each posts loop
		
        if (results.length < limit) done = true;
        if (!done) {
          if (last_time.getTime() < start_time.getTime()) {
            msg('Requesting more data. '+post_count+' posts so far. Last timestamp was '+timestamp(last_time));
            start_time.setTime(last_time.getTime() - 1);
            //console.warn('Requesting data for start of ' + last_time.toString());
            self.requestData();
          } else done = true;
        }

        if (done) {

			if (debug) {
				var output3 = '';
				for (x in other_apps) {
					if (other_apps[x] > 0) {
						output3 += x +': '+ other_apps[x]+'\n';
					}
				}
//				console.log(output3);
			}
			
			links.reverse(); 
			objects.reverse();

			for (i = 0; i < objects.length; i++) {
				o = objects[i];
				log(o.msg, o.type);
			}
			
			document.getElementById('war_count').innerHTML = war_count + ' war' + (war_count == 1 ? '' : 's') + '<br/>';
			if ((war_count > 0)&&(debug)) {
				my_toggle('war_row');
			}
			document.getElementById('war_logshow').onclick = function () {
				my_toggle('war_log');
			};

			document.getElementById('mission_count').innerHTML = mission_count + ' mission' + (mission_count == 1 ? '' : 's') + '<br/>';
			if ((mission_count > 0)&&(debug)) {
				my_toggle('mission_row');
			}
			document.getElementById('mission_logshow').onclick = function () {
				my_toggle('mission_log');
			};

  		my_toggle('mission2_row');
  		my_toggle('war2_row');

			document.getElementById('mission2_logshow').onclick = function () {
				my_toggle('mission2_log');
			};
			document.getElementById('war2_logshow').onclick = function () {
				my_toggle('war2_log');
			};
			
			
			
			document.getElementById('pause').onclick = function (e) {
				run = 0;
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
				return false;
			};
			document.getElementById('play').onclick = function (e) {
				run = 1;
				document.getElementById("play").style.display = 'none';
				document.getElementById("pause").style.display = 'inline';



				msg('Checking all the found links...');
				nextlink();
				return false;
			};
		    document.getElementById('donate').onmouseover = function () {
				this.innerHTML = 'Donate a Pint';
				return false;
			};
			document.getElementById('donate').onmouseout = function () {
				this.innerHTML = 'Donate';
				return false;
			};

			function check_next() {
				//createCookie('sh_timelast',objects[manual]['original_time']);
				manual++;
				document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
        if (run == 0) {
					document.getElementById("pause").style.display = 'none';
					document.getElementById("play").style.display = 'inline';
					msg('Paused. Press play to resume again.');
				}
				else if (run == 1) {
				  wait = myRandom(parseInt(wait1), parseInt(wait2));
				  pausing(wait, 'Loading next link in ', nextlink);
				}
				else {
					msg('Do not know what to do...');
				}
			}

			function state_change(s) {
				currentPageCount = pageCount;
//				if (debug) { console.log(s) }
				//document.getElementById('inner_page').removeEventListener('DOMSubtreeModified',state_change,false);
        loot='';
				try {
					if (m=/\"fail_message\":\"([^\"]*)\"/.exec(s)) {
						// could be result of joinmission
            if ((n=/xw_controller\=socialmission/.exec(s)) && (/Something has gone wrong/.test(m[1]))) {
                // mission slots free
                if (debug) { console.log(links[manual]+' ok'); }
                mission2_count++;
                log(objects[manual].msg,'mission2');
                document.getElementById('mission2_count').innerHTML = mission2_count + ' operation' + (mission2_count == 1 ? '' : 's') + '<br/>';
            }
            else if (/Sorry, you are too late to help out/.test(m[1])) {
                // mission full
                if (debug) { console.log(links[manual]+' full'); }
            } 
            else {
              if (debug) { console.log('error: '+m[1]); }
            }
              
					} else if (m=/This war is already over/.test(s)) {
					  if (debug) { console.log("War is over"); }
					}
          else if (/You have already helped/.test(s)) {
            if (debug) { console.log(links[manual]+' already helped'); }
          }
					else if (m=/xw_action\=attack/.test(s)) {
					  war2_count++;
            log(objects[manual].msg,'war2');
            document.getElementById('war2_count').innerHTML = war2_count + ' war' + (war2_count == 1 ? '' : 's') + '<br/>';
					  
          } 
					

					//s=s.substr(s.indexOf('<table class="messages"'));
					//s=s.substr(0,sclick.indexOf('<div id="popup_fodder">'));
					//parselog(s,links[manual]);
					//console.log('Manual: '+manual+' Link: '+links[manual]);
					check_next();
				}
				catch (ignoree) { 
					if (debug) { console.log('Error in state_change: '+ignoree) }
					msg(timestamp()+'Error when loading page, retry #'+retries);
					retry('Some sort of problem when loading page, retrying...');
					return;
				}
			}

			function request(url) {
				if (debug) { console.log(url); }
				if (manual < links.length) {
				  var loadurl;
				  var type;
          if (url.match('http://')) {
            loadurl=url;
            type='GET';
          } else {
					  loadurl=preurl+url;
					  type='POST';
          }
          if (debug) { console.log('... using '+type+' url '+loadurl);}

					if (run == 1) {
						cb = fbuserid+unix_timestamp();
						var params = { 
							'ajax': 1, 
							'liteload': 1, 
							'sf_xw_user_id': userid,
							'sf_xw_sig': local_xw_sig,
							'xw_client_id': 8,
							'skip_req_frame': 1
						};
						$.ajax({
							type: type,
							url: loadurl,
							data: params,
							timeout: 10000,
							success: function (msg){
								state_change(msg);
							},
							error: function(request,status,error){
								if (debug) { console.log('Problem loading: '+url); }
								retry(timestamp()+status+' '+error+' Error when loading page, retry #'+retries); return;
							}
						});
					} else {
						msg('Paused searching.');
					}
					last_url=url;
				}
				else {
					msg('All links checked. Done.');
				}
			}
			function retry(s) {
				if (retries > 3) {
					msg(s + ', not retrying this link any more.');
					check_next();
				}
				else {
					retries++;
					//pausing(5, 'Retry #'+retries+' in ' , request(last_url));
					//pausing(5, 'Retry #'+retries+' in ' , console.log(last_url));
					pausing(5, 'Retry #'+retries+' in ' , check_next);
					return;
				}
			}
	
			//load the next link
			function nextlink() {
				if (manual < links.length) {
					//console.log('Next link to load is: '+links[manual]);
					currentPageCount = pageCount;
					//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
					//msg('Loading next link. Helping '+objects[manual]['timestamp']+objects[manual]['name_str']+'...');
					msg('Loading next link....');
					//do_ajax('inner_page', links[manual], 1, 0);
					request(links[manual]);
				}
				else {
					msg('All links checked. Done.');					
				}
			}

			document.getElementById('next').onclick = function () {
				document.getElementById('manual_loot').style.display = '';
				document.getElementById('manual_exp').style.display = '';
				document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
				nextlink();
				return false;
			};

			if (true) { 
				document.getElementById("play").style.display = 'none';
				document.getElementById("pause").style.display = 'inline';
				run = 1;
				nextlink();
			}
		}
      }
    };
    return self;
  }();

  function start() {
    dataObject.init();
    document.getElementById('spockdiv').innerHTML = running_html;
    document.getElementById("close").onclick = close;
    document.getElementById("close").style.display = 'inline';
    msg('Requesting data...');
    dataObject.requestData();
  }

  document.getElementById('start').onclick = start;

  function msg(s) {
    document.getElementById('status').innerHTML = s;
  }

  function timestamp(d) {
    now = d == undefined ? new Date() : d;
    var CurH = now.getHours();
    CurH = (CurH < 10 ? "0" + CurH : CurH);
    var CurM = now.getMinutes();
    CurM = (CurM < 10 ? "0" + CurM : CurM);
    return '<span class="more_in">[' + CurH + ':' + CurM + ']</span> ';
  }

  function log(s, r) {
    if (r != undefined) r = r + '_';
    else r = '';
    var l = document.getElementById(r + 'log');
    l = l.insertRow(-1);
    l = l.insertCell(0);
    l.innerHTML = s + '.';
  }

  function mwlink(f, n) {
    return '<span class="more_in">[<a href="' + mw_url + f + aft + '" target="_blank">' + (n == undefined ? 'MW' : n) + '</a>]</span>';
  }

  function fblink(f, n) {
    //return '<a href="' + fb_url + f + '" target="_blank">' + (n == undefined ? 'FB' : n) + '</a>';
	return '<a href="' + fb_url + n + '" target="_blank">' + (n == undefined ? 'FB' : n) + '</a>';
  }

  function achlink(l, t) {
    return '<span id="achlink" class="more_in">[<a href="http://facebook.mafiawars.zynga.com/mwfb/' + l + '" onclick="this.innerHTML=\'Visited\'; return do_ajax(\'inner_page\',\'' + l + '\',1,0); return false;">' + t + '</a>]</span>';
  }
  function original_link(l, t) {
    return '<span id="achlink" class="more_in">[<a href="'+l+'" target="_blank" onclick="this.innerHTML=\'Visited\';">' + t + ' (NW)</a>]</span>';
  }




  //add thousand comma

  function commas(s) {
    while (d = /(\d+)(\d{3}.*)/.exec(s)) {
      s = d[1] + ',' + d[2];
    }
    return s;
  }
  //random value for delay
  function myRandom(min, max) {
    return min + Math.floor(Math.round((Math.random() * (max - min))));
  }
  // deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
  // given a number of seconds, an optional message and a resume
  // function, will pause a few seconds and then execute the function
	

	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))+'';
	}
	
  function pausing(seconds, message, resume_func) {
    // if the message was left out, shuffle things a bit
    if (typeof(message) == 'function') {
      resume_func = message;
      message = null;
    }
    
    if (message) message = message;
    else message = 'Pausing';
    msg(message + ' <span id="seconds">' + seconds + ' second' + (seconds == 1 ? '' : 's') + '</span>...');
    //var me = this;
    var timer = setInterval(function () { //)
      seconds--;
      if (document.getElementById('seconds')) document.getElementById('seconds').innerHTML = seconds + ' second' + (seconds == 1 ? '' : 's');
      else clearInterval(timer);
      if (seconds <= 0) {
        clearInterval(timer);
        if (typeof(resume_func) == 'function') resume_func();
      }
    },
    1000);
  }

  //testing to add analytics
    function writeCookieStuff(){ }
    function readCookieStuff(){
        try{
            stash_filter = readCookie('StashFilter');
            if(!(stash_filter == null || stash_filter=='')){
                if(stash_filter==' '){
                    stash_filter='';
                }
                else{
                    stash_filter = unescape(stash_filter).replace(/,/g,'\n');
                }
            }
            else{
                stash_filter='';
            }

	} catch(err){}
    }
	
  function loadContent(file) {
    var head = document.getElementsByTagName('head').item(0)
    var scriptTag = document.getElementById('loadScript');
    if (scriptTag) head.removeChild(scriptTag);
    script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.id = 'loadScript';
    head.appendChild(script);
  }
  loadContent('http://www.google-analytics.com/ga.js');
  try {
    var pageTracker = _gat._getTracker("UA-8435065-3");
    pageTracker._trackPageview();
    pageTracker._trackPageview("/script/Operation-War-Hunter");
  } catch(err) {}
  //end analytics
}())