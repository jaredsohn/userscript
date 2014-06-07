// ==UserScript==
// @name           Pooflinger's Mongerizer
// @namespace      Pooflinger
// @description	   Show MythMonger timer on your page
// @include        http://apps.facebook.com/mythmonger/*
// @include		   http://mm.furoma.com/*
// ==/UserScript==

// http://docs.google.com/Doc?docid=0AZRLQUEm_qKAZGNqNm16bXJfNWg3enIyamZy&hl=en

var version_holder = "http://mm.furoma.com/mongerizer/version.txt";

var your_version = '0.0.5';
var usr_chk_tm_mm = GM_getValue('usr_chk_tm_mm', true);
var usr_chk_tm_pz = GM_getValue('usr_chk_tm_pz', true);
var usr_chk_tm_alarm = GM_getValue('usr_chk_tm_alarm', true);
var usr_chk_tm_alarm_cnfm = GM_getValue('usr_chk_tm_alarm_cnfm', true);
var usr_chk_tm_alarm_file = GM_getValue('usr_chk_tm_alarm_file', 'sound1.wav');
var usr_chk_tm_alarm_wmp = GM_getValue('usr_chk_tm_alarm_wmp', true);
var usr_chk_tm_alarm_vol = GM_getValue('usr_chk_tm_alarm_vol', 40);
var usr_chk_tm_title = GM_getValue('usr_chk_tm_title', true);
var usr_chk_tm_update = GM_getValue('usr_chk_tm_update', 1);
var usr_chk_sell_card = GM_getValue('usr_chk_sell_card', true);

var usr_chk_tm_fb = false;

function $(id) {
  return document.getElementById(id);
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function soundAlarm(){

if (!$('alarm'))
	{
	var alarm = document.createElement("span");
	alarm.id = 'alarm';
	document.body.appendChild(alarm);
	}

$('alarm').innerHTML = "<embed type="+
	((usr_chk_tm_alarm_wmp)? "application/x-mplayer2":"audio/wav") +
	" loop=false hiddren=true width=0 height=0 src=\"http://furoma.com/mousehunt_horn_timer_"+
	usr_chk_tm_alarm_file+"\" autostart=true volume="+
	usr_chk_tm_alarm_vol+"/>";//*/
	
}


function setMin()
{

	if(HornTime==null)
		{
		if (sMsg==null)
			return;
		
		var LoadTime = new Date();
		LoadTime = LoadTime.getTime();
		HornTime = LoadTime + (sMsg*1000);
		
		}
	var NowTime = new Date();
	NowTime = NowTime.getTime();
	sMsg = Math.ceil((HornTime - NowTime)/1000);

	var puzzle_success = false;
	
	if ($('app79378246206_mainContent') &&
		$('app79378246206_mainContent').innerHTML.indexOf('<h3>Success!</h3>')!=-1)
		{
		puzzle_success = true;
		usr_chk_tm_alarm = false;
		usr_chk_tm_alarm_cnfm = false;
		}
	
	if (!puzzle_success && document.title.indexOf('Puzzle')!=-1)
		{
		$('mm_min').innerHTML = '<b style=font-size:18pt>Puzzle!</b>';
		if (usr_chk_tm_alarm)
			soundAlarm();
		return;
		}
	else if ($('app79378246206_mainContent') && $('app79378246206_mainContent').innerHTML.indexOf('	x0')!=-1)
		{
		$('mm_min').innerHTML = '<b style=font-size:18pt>No challenge card!</b>';
		if (!puzzle_success && usr_chk_tm_alarm)
			soundAlarm();
		return;
		}
	else if (sMsg<=0)
		{
		$('mm_min').innerHTML = '<b style=font-size:18pt>Time to play!</b>';
		if (usr_chk_tm_title)
			document.title = 'Turn\'s ready! | ' + Doctitle;
		
		usr_chk_tm_last = GM_getValue('usr_chk_tm_last',0);
		usr_chk_tm_last = (usr_chk_tm_last==0)? 0:Date.parse(usr_chk_tm_last);
		
		if (Date.parse(Date())-usr_chk_tm_last>120000) // last horn is older than 2 minutes ago
			{
			GM_setValue('usr_chk_tm_last',Date());
			
			if (!puzzle_success && usr_chk_tm_alarm)
				soundAlarm();
			if (!puzzle_success && usr_chk_tm_alarm_cnfm && confirm("It's time to play your turn!\nDo you want to play now?\n\nNOTE: By clicking OK, your turn will be played on this tab, so please click cancel if you are in the middle of completing a form."))
				document.location.href = "http://apps.facebook.com/mythmonger/turn.php";
			}
			
		return;
		}
	else
		{var mm_min = Math.floor(sMsg/60);
		var mm_sec = Math.ceil(sMsg)%60;
		if (mm_sec<10)
			mm_sec = '0'+mm_sec;
		$('mm_min').innerHTML = '<span class="pretitle">Next turn</span> <b style=font-size:16pt>'+mm_min+':'+mm_sec+'</b> <span class=pretitle>min</span>';
		
		if (usr_chk_tm_title)
			document.title = mm_min+':'+mm_sec+ ' | ' + Doctitle;
		}
	
	//if (usr_chk_tm_pz)
	if (false)
		{
		var PzC = Math.ceil((PzTime - NowTime)/1000);
		$('mm_min').innerHTML += ' | <span class="pretitle">Next puzzle '+PzTime.toLocaleString()+'</span>';
		}
	
	setTimeout(setMin, usr_chk_tm_update*1000);
}

var MsgObj, sMsg, PzTime, HornTime;
var Doctitle = document.title;

function printMsg() {

	

	if (!usr_chk_tm_mm)
		return;

	//sMsg = document.body.innerHTML.match (/_remainingActiveTurnWaitSeconds = (.+); \\n\"}/)[1];
	sMsg = document.body.innerHTML.match (/_remainingActiveTurnWaitSeconds = ([^;]+);/);
	

	if (!sMsg)
		return;
	
	sMsg = sMsg[1];

	/*
	var RPzTime = document.body.innerHTML.match (/next_puzzle_date\\\":\\\"(.+)\\\",\\\"country_code/)[1];
	if (RPzTime)
		{
		PzTime = new Date(); //2009-10-22 10:49:40
		PzTime.setFullYear(parseInt(RPzTime.substr(0,4)));
		PzTime.setMonth(parseInt(RPzTime.substr(5,2))-1);
		PzTime.setDate(parseInt(RPzTime.substr(8,2)));
		PzTime.setHours(parseInt(RPzTime.substr(11,2)));
		PzTime.setMinutes(parseInt(RPzTime.substr(14,2)));
		PzTime.setSeconds(parseInt(RPzTime.substr(17,2)));
		}
	//PzTime=PzTime+"<br>"+RPzTime;
	*/
	
	var oMsgBox = document.createElement("div");
	
	oMsgBox.id = "ttq_message";
	oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' style='z-index:100; margin-top:-85px; margin-left:5px; color:inherit; font:10pt inherit; width:400px'><span id=mm_min></span></div>";
	
	var progbar = xpathFirst('//div[@class="progbar"]');
	progbar.appendChild(oMsgBox);

	
	setMin();
		
}

printMsg();


if (window.location.toString().indexOf('http://apps.facebook.com/mythmonger/shop.php')==0
	&& usr_chk_sell_card)
	sell_card();
	
function sell_card()
{
	var cc = document.getElementsByTagName('div');
	//for (var i=0; i<cc.length; i++)
	
	var coin, power, inven, first_found=-1;
	var cc_array = new Array();
	var cc_anow;
	
	for (var i=0, j=0; i<cc.length; i++)
		{
		if (cc[i].getAttribute('class')!='statmid')
			continue;
			
		coin = cc[i].innerHTML.match(/<span class=\"label\">Value: <\/span>(.+) Coins/);
		if (!coin)
			continue;
		
		power = cc[i].innerHTML.match(/<span class=\"label\">Power: <\/span>([^<]+)/);
		
		if (!power)
			continue;
			
		//if (first_found==-1)
			//first_found=i;
		
		coin=coin[1];
		power=power[1];
		
		
		
		power_value = document.createElement("div");
		power_value.setAttribute('class', 'list');
		power_value.innerHTML = '<span class="label">Power/value: </span>'+round(power/coin,4);
		
		cc[i].childNodes[1].childNodes[0].insertBefore(power_value,cc[i].childNodes[1].childNodes[0].childNodes[0]);

		cc_anow = new Array(2);
		cc_anow[0] = power/coin;
		cc_anow[1] = cc[i].parentNode.parentNode.innerHTML;
		cc_array.push(cc_anow);
		
		cc[i].parentNode.parentNode.id='cc'+(j++);
		
		}

	cc_array.sort();
	
	
	//$('app79378246206_sellCharacterCard')
	for (var i=0; i<cc_array.length; i++)
		$('cc'+i).innerHTML=cc_array[i][1];

}

function round(x,y)
{
if (!y)
	return Math.round(x);
return Math.round(x*Math.pow(10,y))/Math.pow(10,y);

}


//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
// http://userscripts.org/scripts/show/22372
//===============================================================================

var script_title = "Pooflinger's Mongerizer";
var source_location = "http://userscripts.org/scripts/source/57769.user.js";

var latest_version = " ";
var gm_updateparam = "pooflinger_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");


CheckForUpdate();


//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("MM - Check for Pooflinger updates!", CheckVersion);
GM_registerMenuCommand("MM - Pooflinger Options", function () {document.location.href='http://mm.furoma.com/mongerizer';});

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder+'?'+Math.random(),
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(your_version != latest_version && latest_version != "undefined" && document.location.href.indexOf('/mongerizer')==-1)
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?\n\n(please uninstall the old version before installing the new one.)"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(your_version == latest_version && document.location.href.indexOf('/mongerizer')==-1)
						alert("You have the latest version of " + script_title + ".");
					else if(document.location.href.indexOf('/mongerizer')!=-1)
						{
						
						if (latest_version == your_version)
							{
							$('chk_latest_version').innerHTML = 'OK';
							//$('update_link').style.display='none';
							
							if ($('version') &&
								$('version').getAttribute('version')!=your_version &&	// config page is out of date
								gup(window.location.href,'rand')==''					// never been refreshed
								)
								{
								window.location.href+='?rand='+Date();	// refresh config page
								}
							}
						else
							{
							$('chk_latest_version').innerHTML = '';
							$('update_link').style.display='inline';
							}
						}
					
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author <mousehunt@peterstrategy.com>.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}


////////////////////////////////////////////////////////////////////////////////





if (document.location.href.indexOf('/mongerizer')!=-1)
	{


	$('chk_install').innerHTML = 'OK';
	$('chk_version').innerHTML = your_version;
	$('chk_latest_version').innerHTML = '(checking)';
	$('update_link').style.display='none';
	$('outputtext').style.display='';

	if (latest_version == " ")
		CheckVersion();
	

	
	$('usr_chk_tm_mm_yes').checked=usr_chk_tm_mm;
	$('usr_chk_tm_mm_no').checked=!usr_chk_tm_mm;
	$('usr_chk_tm_pz_yes').checked=usr_chk_tm_pz;
	$('usr_chk_tm_pz_no').checked=!usr_chk_tm_pz;
	
	$('usr_chk_tm_alarm_yes').checked=usr_chk_tm_alarm;
	$('usr_chk_tm_alarm_no').checked=!usr_chk_tm_alarm;
	$('usr_chk_tm_alarm_cnfm_yes').checked=usr_chk_tm_alarm_cnfm;
	$('usr_chk_tm_alarm_cnfm_no').checked=!usr_chk_tm_alarm_cnfm;
	$('usr_chk_tm_title_yes').checked=usr_chk_tm_title;
	$('usr_chk_tm_title_no').checked=!usr_chk_tm_title;
	$('usr_chk_sell_card_yes').checked=usr_chk_sell_card;
	$('usr_chk_sell_card_no').checked=!usr_chk_sell_card;
	
	$('usr_chk_tm_alarm_file').value=usr_chk_tm_alarm_file;

	
	$('usr_chk_tm_alarm_vol').selectedIndex = (usr_chk_tm_alarm_wmp)? 5:usr_chk_tm_alarm_vol/20-1;
	
	
	for (var i=0; i<$("usr_chk_tm_alarm_file").options.length; i++)
		if ($("usr_chk_tm_alarm_file").options[i].value==usr_chk_tm_alarm_file)
			{
			$("usr_chk_tm_alarm_file").selectedIndex=i;
			break;
			}
	for (var i=0; i<$("usr_chk_tm_update").options.length; i++)
		if ($("usr_chk_tm_update").options[i].value==usr_chk_tm_update)
			{
			$("usr_chk_tm_update").selectedIndex=i;
			break;
			}
				
	$('usr_chk_tm_mm_yes').addEventListener('click', function () {usr_chk_tm_mm=true;chk_valid();}, true);
	$('usr_chk_tm_mm_no').addEventListener('click', function () {usr_chk_tm_mm=false;chk_valid();}, true);
	$('usr_chk_tm_pz_yes').addEventListener('click', function () {usr_chk_tm_pz=true;chk_valid();}, true);
	$('usr_chk_tm_pz_no').addEventListener('click', function () {usr_chk_tm_pz=false;chk_valid();}, true);

	$('usr_chk_tm_alarm_yes').addEventListener('click', function () {usr_chk_tm_alarm=true;chk_valid();}, true);
	$('usr_chk_tm_alarm_no').addEventListener('click', function () {usr_chk_tm_alarm=false;chk_valid();}, true);
	$('usr_chk_tm_alarm_cnfm_yes').addEventListener('click', function () {usr_chk_tm_alarm_cnfm=true;chk_valid();}, true);
	$('usr_chk_tm_alarm_cnfm_no').addEventListener('click', function () {usr_chk_tm_alarm_cnfm=false;chk_valid();}, true);
	$('usr_chk_tm_title_yes').addEventListener('click', function () {usr_chk_tm_title=true;chk_valid();}, true);
	$('usr_chk_tm_title_no').addEventListener('click', function () {usr_chk_tm_title=false;chk_valid();}, true);
	$('usr_chk_sell_card_yes').addEventListener('click', function () {usr_chk_sell_card=true;chk_valid();}, true);
	$('usr_chk_sell_card_no').addEventListener('click', function () {usr_chk_sell_card=false;chk_valid();}, true);
	
	$('usr_chk_tm_update').addEventListener('change', function () {usr_chk_tm_update=parseInt($('usr_chk_tm_update').value);chk_valid();}, true);
		
	$('usr_chk_tm_alarm_file').addEventListener('change', function () {usr_chk_tm_alarm_file=$('usr_chk_tm_alarm_file').value;soundAlarm();chk_valid();}, true);
	
	$('usr_chk_tm_alarm_vol').addEventListener('change', function () {
		var arr=$('usr_chk_tm_alarm_vol').value.split(',');
		if (arr[0]=="false")
			{
			if (usr_chk_tm_alarm_wmp)
				{
				if (confirm("Usually a default player is Quicktime, which may cause a temporary freeze when the alarm sounds.\nDo you want to proceed?"))
					{
					usr_chk_tm_alarm_wmp=false;
					}
				else 
					{
					$('usr_chk_tm_alarm_vol').selectedIndex=5;
					return;
					}
				}
			}
		else
			usr_chk_tm_alarm_wmp=true;
		usr_chk_tm_alarm_vol=arr[1];
		soundAlarm();
		chk_valid();}, true);
	//$('reset_on').addEventListener('click', function () {usr_chk_k=usr_chk_fr=usr_chk_pt=usr_chk_rk=usr_chk_ls=usr_chk_lp=usr_ld_msg=usr_chk_tm_mh=usr_chk_tm_fb=usr_rm_fb=true;chk_valid();chk_reset();}, true);
	
	}

function chk_valid()
{


	/*if(!usr_chk_k && (usr_chk_pt || usr_chk_rk || usr_chk_tm_fb))
		{
		alert('King\'s reward is turned on for you.\nBecause you need it in order to display points, rank, or timer on FB webboards!');
		$('usr_chk_k_yes').checked = usr_chk_k =  true;
		
		}*/
		
	GM_setValue('usr_chk_tm_mm',usr_chk_tm_mm);
	GM_setValue('usr_chk_tm_pz',usr_chk_tm_pz);
	GM_setValue('usr_chk_tm_alarm',usr_chk_tm_alarm);
	GM_setValue('usr_chk_tm_alarm_wmp',usr_chk_tm_alarm_wmp);
	GM_setValue('usr_chk_tm_alarm_vol',usr_chk_tm_alarm_vol);
	GM_setValue('usr_chk_tm_alarm_file',usr_chk_tm_alarm_file);
	GM_setValue('usr_chk_tm_alarm_cnfm',usr_chk_tm_alarm_cnfm);
	GM_setValue('usr_chk_tm_title',usr_chk_tm_title);
	GM_setValue('usr_chk_tm_update',usr_chk_tm_update);
	GM_setValue('usr_chk_sell_card',usr_chk_sell_card);
}
	
