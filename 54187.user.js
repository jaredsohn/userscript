// t61++!
// Version: 1.2
// Created by Matty McLean (www.mattymc.com)
// - Many contributions from rd3k (thanks!)
//
//Changes:
// - 2009.07.22 MM Created (v0.5)
// - 2009.07.22 MM Added Max Bumps (v0.75)
// - 2009.07.22 MM Small Max Bump Fix (v0.85)
// - 2009.07.23 MM Now the remaining rep until level shows up beside a user’s rep in their profile (Thanks r3dk)(v0.9)
// - 2009.07.24 MM Added autoRB (v1.0)
// - 2009.07.25 MM rd3k made a new wicked interface ;) / Fixed the issue where "max!" showed up too much (v1.1)
//
// --------------------------------------------------------------------
//
// Use on www.thesixtyone.com to enhance your 61 fun.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           t61++
// @namespace      http://www.mattymc.com/
// @description    Use on www.thesixtyone.com to get some cool features
// @include        http://*thesixtyone.com*
// ==/UserScript==

const mainTick = 5;

var t61ppDebugOn = false;

const rackTickNum = 12;
var rackCheckOn = false;
var rackTickCount = 0;

const autoRBTickNum = (12*5)+1;
var autoRBOn = false;
var autoRBTickCount = 0;
var autoRBuser = '';
var rbCount = 0;

var timerCount = 0;
var showOptions = false;


function doIt()
{
	//define css
	GM_addStyle(<><![CDATA[
		#plusplusdiv{position:fixed;top:180px;left:0;width:140px;}
		#plusplustab{float:left;width:26px;}
		#plusplusactions{float:left;background:#000;color:#FFF;width:140px;padding:5px;margin-left: -26px;}
		#plusplusactions td{width: 140px;text-align:left;padding-top:5px;}
		#plusplusactions td#linky{padding-top:20px;text-align:center;}
		#plusplusactions td a{color:#FFFF66;}
		#plusplusactions td input{float: right;}
		#plusplusclose{width:140px;float:left;background:#CCC;line-height:30px;color:#000;margin-left: -26px;}}
	]]></>);
 	
	var plusplusdiv = document.createElement('div');
	plusplusdiv.id='plusplusdiv';
	plusplusdiv.innerHTML = '<a href="#" id="plusplustab"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABcCAMAAABHlVWNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRFVVVV////1NTUgICAqqqqdXV19PT0ZmZm39/fv7+/mZmZzMzMioqKtLS06urq8T17LAAAANFJREFUeNrsldsSgyAMRNkECDf9/88tjrUt2LTq+Mi+HphsNmEwZmhoU6JJQxZ0FjnmiMDMskOEp/gMumbjNxJ2I40jadwpS2/FFnl8qG3azfDKLSMBRavm4EVjEUnNgq5mIfxlWpydkVib8n1FBiYT1o47lkFS4C2XDN8izMsk03qqrYdQl3fNY+pQqDdkDjUP9mhTKcCcaxmqVvoFSa+RhF2UMi1L6vMuSFGjrY7VbOn7qv9FiTeJ8oQWl6KizhEh2k3lHocq4ji+nqHDeggwAH/OBMJlTUHTAAAAAElFTkSuQmCC"/></a><div id="pluspluspanel"><a href="#" id="plusplusclose">Click here to close</a><table id="plusplusactions"></table></div>';
	document.getElementById('page_layout').appendChild(plusplusdiv);
	 
	document.getElementById('pluspluspanel').style.display = "none";
	document.getElementById('plusplustab').addEventListener('click', function(event) {document.getElementById('pluspluspanel').style.display = "block";}, true);
	document.getElementById('plusplusclose').addEventListener('click', function(event) {document.getElementById('pluspluspanel').style.display = "none";}, true);    
 
	//Add actions
	document.getElementById('plusplusactions').innerHTML += "<tr><td><label for='autoRepeat''>AutoRepeat</label><input type='checkbox' id='autoRepeat'/></td></tr>";
	document.getElementById('plusplusactions').innerHTML += "<tr><td><label for='autoRack''>AutoRack</label><input type='checkbox' id='autoRack'/></td></tr>";
	document.getElementById('plusplusactions').innerHTML += "<tr><td><label for='autoRadioBump''>AutoRadio</label><input type='checkbox' id='autoRadioBump'/></td></tr>";

	//Add info link
	document.getElementById('plusplusactions').innerHTML += "<tr><td id='linky'><a href='http://mattymc.com/2009/07/21/t61pp-thesixtyone-on-awesome/' target='_new'>Help? Ideas? Bugs?</a></td></tr>";

	document.getElementById('plusplusactions').innerHTML += "<tr><td id='linky'><a href='http://userscripts.org/scripts/show/54597/' target='_new'>Your script is outdated. Get the new version here.</a></td></tr>";


	document.getElementById('autoRepeat').addEventListener('click', function(event) {
		unsafeWindow.t61.song._autorepeat_on=!unsafeWindow.t61.song._autorepeat_on;
		var word="off";
		if(unsafeWindow.t61.song._autorepeat_on)
			word="on";
		
		setTimeout((function(){showMsg("Auto-repeat is "+word+".");}), 10);
	}, true);

	document.getElementById('autoRack').addEventListener('click', function(event) {
		rackCheckOn=!rackCheckOn;
		var word="off";
		if(rackCheckOn){
			word="on";
			unsafeWindow.t61.therack.open();
		}		
		else
			unsafeWindow.t61.popup.hide({from_user:true});
	
		setTimeout((function(){showMsg("Auto-rack is "+word+".");}), 10);
	}, true);

	document.getElementById('autoRadioBump').addEventListener('click', function(event) {
		autoRBOn=!autoRBOn;
		var word="off";
		if(autoRBOn){
			autoRBuser = window.prompt('Enter user you want to lay the bumps on:','');
			if(autoRBuser == null){document.getElementById('autoRadioBump').checked = false;autoRBOn=false; return;}
			showMsg("Auto radio is on (" + autoRBuser + ")");
			word="on";
			rbCount = 0;
			triggerRadio();
		}else{
			showMsg("Auto radio is off (" + rbCount + " RBs)");
			rbCount = 0;
		}
	}, true);

	setTimeout(tickTock, 1000);
	setTimeout((function(){showMsg("Loaded T61++ (beta). Phew! :)");}), 10);
}

function tickTock() {
	if (rackCheckOn)
	{
		if (++rackTickCount == rackTickNum)
		{
			rackTickCount = 0;
			var timeLeft = document.getElementById('miniplayer_progress').innerHTML;
			if (timeLeft == '0:00')
			{
				unsafeWindow.t61.playlist.play_next_song();
				setTimeout((function(){showMsg("Rack auto restarted.");}), 10);
			}

		}
	}

	if (autoRBOn)
	{
		if (++autoRBTickCount == autoRBTickNum)
		{
			autoRBTickCount = 0;
			triggerRadio();
		}
	}

	//do UI changes
	if (document.getElementById('t61ppRepDif') == null)
	{
		var userLevel=0;
		var userInfoDiv=null;
		var divs = document.getElementsByTagName('div')
		for (var i=0;i<divs.length;i++) 
		{
			if (divs[i].className=="cur_level")
				userLevel = parseInt(divs[i].innerHTML);
			else if (divs[i].className=="user_info")
				userInfoDiv = divs[i];
		}

		var strUserInfoNew = '';
		var repTotal = 0;
		if (userInfoDiv != null)
		{
			var index = userInfoDiv.innerHTML.indexOf('<b>reputation</b>');
			var str = userInfoDiv.innerHTML.substring(index);
			index = str.indexOf('<li>total: ');
			repTotal = parseInt(str.substring((index + '<li>total: '.length), str.indexOf('</li>')));

			var nextlevel = userLevel+1;
			var repNeeded = unsafeWindow.t61.level.xp_requirements[nextlevel];
			var refDif = repNeeded - repTotal;

			userInfoDiv.innerHTML = userInfoDiv.innerHTML.replace('<li>total: ' + repTotal + '</li>', '<li>total: '+repTotal+' <span id="t61ppRepDif" style="color:#CC00FF;">('+refDif+' til next level)</span></li>')
		}
	}

	//Add MaxBump Link
	autoMaxBump();

	setTimeout(tickTock, 1000*mainTick); //every ten seconds
	timerCount++;
}

function autoMaxBump()
{
	var divCollection = document.getElementsByTagName("div");
	for (var i=0; i<divCollection.length; i++) 
	{
		var oDiv = divCollection[i];
		if (oDiv != null)
		{
			var divId = oDiv.getAttribute("id");
			if (divId != null)
			{
				if(divId.indexOf("song_info_") > -1) 
				{
					var trackId = divId.substring("song_info_".length);	
					if (document.getElementById('maxBump' + trackId) != null)
						return;

					//oDiv.parentNode.innerHTML += '<a id="maxBump' + trackId + '" style="color:#CC00FF;" href="#" onclick="event.cancelBubble=true;return false;">!</a>'
					oDiv.innerHTML = oDiv.innerHTML.replace(/&nbsp;/g, '').replace('>flag</a>', '>flag</a><a id="maxBump' + trackId + '" style="color:#CC00FF;" href="#" onclick="event.cancelBubble=true;return false;">max!</a>');
					
					document.getElementById('maxBump' + trackId).addEventListener('click', function(event) {
						var trackId = this.getAttribute("id").substring("maxBump".length);
						var level = document.getElementById('top_profile_cur_level').innerHTML;
						var bumpsLeft = document.getElementById('user_bumps_available').innerHTML;
						
						var bumps = level;
						if (bumpsLeft == 0)
						{
							setTimeout((function(){showMsg("How can you max bump if you have no hearts silly!");}), 10);
							return;
						}
						else if (bumpsLeft < level)
						{
							setTimeout((function(){showMsg("You got less hearts than your max. I'll do my best!");}), 10);
							bumps = bumpsLeft;
						}
						else
							setTimeout((function(){showMsg("Starting to max bump. Just sit back and relax ;)");}), 10);

						setTimeout((function(){maxTrack(bumps, trackId);}), 10);
					}, true);
				}
			}
		}
	}
}

function maxTrack(bumps, trackId, count)
{
	if (count == null)
		count = 1;

	if (count == 1)
		setTimeout((function(){showMsg("Well here goes! Wish me luck! (Bump " + count + " of " + bumps + ")");}), 10);
	else if (count == Math.ceil(bumps/2))
		setTimeout((function(){showMsg("Half way there! We can do this! (Bump " + count + " of " + bumps + ")");}), 10);
	else if (bumps == count)
		setTimeout((function(){showMsg("Last one! Hope it was as fun for you as it was for me! (Bump " + count + " of " + bumps + ")");}), 10);
	else
		setTimeout((function(){showMsg("Bumping away! (Bump " + count + " of " + bumps + ")");}), 10);
	
	if (bumps > count)
	{
		try{unsafeWindow.t61.song.bump(trackId);} catch(e) {setTimeout((function(){showMsg("I can't bump the song for some reason! Damn you t61!!");}), 10);}
		setTimeout((function(){maxTrack(bumps, trackId, ++count);}), 1000*4);
	}
}

function triggerRadio(){
	if(!autoRBOn)
		return;
	else{
		showMsg("BOOM! RB'd " + autoRBuser + " (#" + ++rbCount + ")");
		unsafeWindow.t61.load_url(autoRBuser+'/radio');
	}
}

function showMsg(msg, noPrefix)
{
	if (noPrefix == null)
		noPrefix = false;

	var imgUrl = 'http://mattymc99.wordpress.com/files/2009/07/t61pp1.png';
	if (noPrefix)
		unsafeWindow.t61.notice.create(msg, imgUrl);
	else
		unsafeWindow.t61.notice.create(msg, imgUrl);
}

doIt();
