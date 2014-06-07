// ==UserScript==
// @name           MouseHunt Horn Tracker
// @namespace      FyreWare
// @description    With every click of the horn trap and log data is stored in an open database to help gather information about the game.
// @version        0.8.9
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://www.facebook.com/*
// @include        http://www.hitotext.com/mh/*
// @include        http://www.mousehuntgame.com/*
// @include        http://www.hi5.com/*
// @include        http://mousehuntgame.com/*
// @include        http://hi5.com/*
// @include        http://mousehunt.hi5.hitgrab.com/*
// @require        http://www.hitotext.com/mh/ff/jquery-1.3.2.js
// @require        http://www.hitotext.com/mh/ff/jquery.drag.js
// @require        http://www.hitotext.com/mh/ff/jquery.qtip.js
// @require        http://www.hitotext.com/mh/ff/updater.php?id=87402
// @author	   Written by Nick Alston, inspired by Rohan Mehta.
// ==/UserScript==

var _version = "0.8.9";

//Indices for hunter data
var _trap=0, _base=1, _location=2, _fbid=3, _title=4;
var _cheese=5, _shield=6, _status=7, _jdate=8, _jtext=9;
var _custom=10, _jdateArray=11, _jtextArray=12;
var _trinket=13;

//Seconds left
var _time_left = -1;

//Failed attempts.
var _fail=0;

init();

function init()
{
	var hButtonDoc = document;
	if (document.location.href.indexOf('hi5.com') != -1)
	{
		if (document.getElementById("canvas-iframe") == null)
		{
			timeout = setTimeout(function(){init()}, 8000);
			return;
		}
		else
		{
			if (document.getElementById("canvas-iframe").contentDocument == null)
			{
				timeout = setTimeout(function(){init()}, 8000);
				return;
			}
			
			hButtonDoc = document.getElementById("canvas-iframe").contentDocument;
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
		hButtonDoc.getElementsByClassName("hornbutton")[0].innerHTML = 
			hButtonDoc.getElementsByClassName("hornbutton")[0].innerHTML.replace(/href="(.+?)"/g, "href=\"javascript:;\"");				

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

		//TODO: For the next release. =)
		//createStatusBox();

		//updateTimer();
	}
}

function addCSS()
{
	var style='\n<style type="text/css">\n'
 		+ '#statusBox{position:absolute; z-index:100; border:1px solid #A3A2A2; padding:5px 5px; color:#600; font-family:Lucida Grande, Verdana, Arial, sans-serif; font-size:10px; min-width:125px; background:#FFFEEF; -webkit-border-radius: 4px; cursor:move;}\n'
	 	+ '</style>\n';

	$('head').append(style);
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
	$('body').append("<div id='statusBox'></div>");

	$('#statusBox').html("<a href='#' onclick='$(\"statusBox\").parentNode.removeChild($(\"statusBox\"))'>X</a> <span id='timeToHorn'></span><span id='statusMessage'></span>");

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

//Much of this function was taken from Rohan Mehta.
function showStatus(statToDisplay)
{	
	//Temp for this release.
	createStatusBox();
	
	//Temp for this release.
	//$('#statusMessage')[0].innerHTML = "<br>" + statToDisplay;
	$('#statusMessage')[0].innerHTML = statToDisplay;
	
	//Kill the box after x seconds, where x is currently 20.
	var secondsTillDeath = 20;
	
	sbTimeout = setTimeout(killStatusBox, secondsTillDeath * 1000);
	
	//TODO: For next release.
	//sbTimeout = setTimeout(killStatusText, secondsTillDeath * 1000);
}

function killStatusText()
{
	$('#statusMessage').text('');
}


function killStatusBox()
{
	if ($('#statusBox') === null)
	{
		//Already dead.
	}
	else
	{
		$('#statusBox').remove();
	}
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

	if ( hunter_html.indexOf('The King wants to give you a reward!') != -1 )
	{		
		hunter_data[_status] = "KINGS REWARD";
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

		while ((jtext.toLowerCase().indexOf('i can view my trophy crowns') != -1 ||
			   jtext.toLowerCase().indexOf('i crafted') != -1 ||
			   jtext.toLowerCase().indexOf('i created') != -1 ||
			   jtext.toLowerCase().indexOf('i sold') != -1 ||
			   jtext.toLowerCase().indexOf('i sent') != -1 ||
			   jtext.toLowerCase().indexOf('i won') != -1 ||
			   jtext.toLowerCase().indexOf('i received') != -1 ||
			   jtext.toLowerCase().indexOf('i used the hunter') != -1 ||
			   jtext.toLowerCase().indexOf('i purchased') != -1 ||
			   jtext.toLowerCase().indexOf('upon capturing a realm ripper') != -1 ||
			   jtext.toLowerCase().indexOf('i traveled') != -1 ||
			   jtext.toLowerCase().indexOf('i was transported') != -1 ||
			   jtext.toLowerCase().indexOf('i was guided') != -1 ||
			   jtext.toLowerCase().indexOf('from which the king deducted') != -1 ||
			   jtext.toLowerCase().indexOf('entire cove was flooded with water') != -1 ||
			   jtext.toLowerCase().indexOf('your donation has been') != -1 ||
			   jtext.toLowerCase().indexOf('that stole larry') != -1 ||
			   jtext.toLowerCase().indexOf('come by my trap') != -1 ||
			   jtext.toLowerCase().indexOf('i claimed') != -1) && 
		       jValidEntry < jCount)
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
	
	var sUIDArray = hunter_html.match(/sn_user_id(\\\"|\"):(.+?),/);
	var fbid = "";
	if (sUIDArray != null)
		fbid = sUIDArray[sUIDArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");		

	var sTrapArray = hunter_html.match(/weapon_name(\\\"|\"):(.+?),/);
	var sTrap = "";
	if (sTrapArray != null)
		sTrap = sTrapArray[sTrapArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");
	
	var sBaseArray = hunter_html.match(/base_name(\\\"|\"):(.+?),/);
	var sBase = "";
	if (sBaseArray != null)
		sBase = sBaseArray[sBaseArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");
	
	var sTrinketArray = hunter_html.match(/trinket_name(\\\"|\"):(.+?),/);
	var sTrinket = "";
	if (sTrinketArray != null)
		sTrinket = sTrinketArray[sTrinketArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");	

	var sLocationArray = hunter_html.match(/location(\\\"|\"):(.+?),/);
	var sLocation = "";
	if (sLocationArray != null)
		sLocation = sLocationArray[sLocationArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");
	
	var sTitleArray = hunter_html.match(/title_name(\\\"|\"):(.+?),/);
	var sTitle = "";
	if (sTitleArray != null)
		sTitle = sTitleArray[sTitleArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");
	
	var sCheeseArray = hunter_html.match(/bait_name(\\\"|\"):(.+?),/);
	var sCheese = "";
	if (sCheeseArray != null)
		sCheese = sCheeseArray[sCheeseArray.length - 1].replace(/\\/g, "").replace(/\"/g, "");

	//Use has_shield entry
	var shield='inactive';
	var sShield = hunter_html.match(/has_shield(\\\"|\"):(.+?),/);
	
	if (sShield != null)
	{
		if (sShield[sShield.length - 1].toLowerCase() == 'true')
			shield='active';
	}	
	
	var custom = "";
	//Get amp if it exists.
	if (sLocation.toLowerCase() == 'zugzwang\'s tower')
	{
		var tAmp = String( hunter_html.match(/showZugzwangsTowerHud\((.+?), /)[0] );
		tAmp = String( tAmp.replace(/showZugzwangsTowerHud\(/, "").replace(/\, /, "") );
		custom += ";amp-" + tAmp;
	}
	if (sLocation.toLowerCase() == 'seasonal garden')
	{
		var season = String( hunter_html.match(/showSeasonalGardenHud\((.+?), /)[0] );
		season = String( season.replace(/showSeasonalGardenHud\(/, "").replace(/\, /, "") );
		custom += ";season-" + season;
	}
	if (sLocation.toLowerCase() == 'haunted terrortories')
	{
		//showHauntedManorHud
		var eventLocation = String( hunter_html.match(/showHauntedManorHud\((.+?)\)/)[1] );
		custom += ";halloween_event-" + eventLocation;
	}	
	//TODO: Consider adding custom data to forbidden grove, and balack's cove with respect to the timers there.
	
	var prizePower = hunter_html.match(/prize_power(\\\"|\"):(.+?)}/);
	if (prizePower != null)
		custom += ";pp-" + prizePower[prizePower.length - 1];

	hunter_data[_trap] = sTrap;
	hunter_data[_base] = sBase;
	hunter_data[_location] = sLocation;
	hunter_data[_fbid] = fbid;
	hunter_data[_title] = sTitle;
	hunter_data[_cheese] = sCheese;
	hunter_data[_shield] = shield;
	hunter_data[_jdate] = jdate;
	hunter_data[_jtext] = jtext;
	hunter_data[_custom] = custom;
	hunter_data[_jdateArray] = jDateArray;
	hunter_data[_jtextArray] = jTextArray;
	hunter_data[_trinket] = sTrinket;
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
		
			//TODO: Use this to crosscheck data at some point.
			//if (hunter_data[_location].toLowerCase().indexOf(hunter_data[_jdate].toLowerCase().replace(/.../, "")) != -1)
			//{
			//	showStatus("Location data does not match log");
			//}

			//TODO: Location can change, on checkmate, realm ripper, or tide moving.
			//	Need to have a special 
			if (hunter_data_pre[_location] != hunter_data[_location])
			{
				if (hunter_data_pre[_location].toLowerCase() == 'zugzwang\'s tower' &&
				    hunter_data[_location].toLowerCase() == 'seasonal garden')
				{
					//TODO: More checks to ensure a checkmate actually occurred.
					//Checkmate!
					hunter_data[_location] = hunter_data_pre[_location];
				}
				else if(hunter_data_pre[_location].toLowerCase() == 'forbidden grove' &&
					hunter_data[_location].toLowerCase() == 'acolyte realm')
				{
					//TODO: More checks to ensure a realm ripper was caught.
					//Realm ripper caught!
					hunter_data[_location] = hunter_data_pre[_location];
				}
				else if(hunter_data_pre[_location].toLowerCase() == 'balack\'s cove' &&
					hunter_data[_location].toLowerCase() == 'jungle of dread')
				{
					//TODO: More checks to ensure a riptide mouse was caught.
					//Riptide mouse caught!
					hunter_data[_location] = hunter_data_pre[_location];
				}			
				else
				{
					//TODO: Anything else is currently not okay. Return message to user stating so.
					showStatus('<span style="color:#5C1015">Failed to submit data: Location unexepctedly changed between snapshots. <br>Before: ' + hunter_data_pre[_location] + '<br>After: ' + hunter_data[_location] + '</span>');
					return;
				}
			}

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
						sendMessageWOAction('http://www.hitotext.com/mh/failed.php?jDateArrayPre='+hunter_data_pre[_jdateArray]+'&jTextArrayPre='+hunter_data_pre[_jtextArray]+'&jDateArrayPost='+hunter_data[_jdateArray]+'&jTextArrayPost='+hunter_data[_jtextArray]);
						return;
					}

					timeout = setTimeout(function(){sendOutData(connectURL, hunter_data_snap_1, hunter_data_snap_2)}, 2000);
				}
				else if (hunter_data[_jdate] == "Also this.")
				{
					//Also failed, couldn't get entry correctly.
					showStatus('<span style="color:#5C1015">Failed to submit data: Journal could not be read correctly.</span>');
					sendMessageWOAction('http://www.hitotext.com/mh/failed.php?jDateArrayPre='+hunter_data_pre[_jdateArray]+'&jTextArrayPre='+hunter_data_pre[_jtextArray]+'&jDateArrayPost='+hunter_data[_jdateArray]+'&jTextArrayPost='+hunter_data[_jtextArray]);
				}
				else if (hunter_data[_cheese] == "None!")
				{
					//Failed because cheese was empty.
					showStatus('<span style="color:#5C1015">Failed to submit data: Cheese could not be determined.</span>');
				}
				else
				{
					//If in zug's tower, get amplifier after processing to get correct amp based on mouse caught/not caught.

					//NOTE: Using the pre_cheese if post_cheese is "None!".
					var cheeseToSubmit = hunter_data[_cheese];
					if (cheeseToSubmit == "None!")
						cheeseToSubmit = hunter_data_pre[_cheese];

					//NOTE: Using the pre_trinket if post_trinket is "null". They are consumable, so it's similar to cheese.
					var trinketToSubmit = hunter_data[_trinket];
					if (trinketToSubmit == "null")
						trinketToSubmit = hunter_data_pre[_trinket];


					//Send the data to a php page for processing.
					GM_xmlhttpRequest({
					    method: 'GET',
					    url: 'http://www.hitotext.com/mh/enter.php?trap='+hunter_data[_trap]+'&base='+hunter_data[_base]+'&loc='+hunter_data[_location]+'&cheese='+cheeseToSubmit+'&trinket='+trinketToSubmit+'&title='+hunter_data[_title]+'&shield='+hunter_data[_shield]+'&fbid='+hunter_data[_fbid]+'&log='+hunter_data[_jdate]+' '+hunter_data[_jtext]+'&custompre='+hunter_data_pre[_custom]+'&custompost='+hunter_data[_custom]+'&version='+_version+'&browser='+navigator.userAgent,
					    headers: {
						    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						    'Content-type':'application/x-www-form-urlencoded'
					    },
					    onload: function(enter_xhr) 
					    {
						var enter_html = enter_xhr.responseText;
							showStatus(enter_html);
					    }
					});
				}
			}
		}
	});
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