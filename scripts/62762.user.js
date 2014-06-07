// ==UserScript==
// @name           HypemApp
// @author         gordon
// @description    makes you feel hypem as an app.
// @include        http://hypem.com/*
// ==/UserScript==


//======== Useful Sub-routines =====

function addGlobalStyle(css) {
  var head_elem=document.evaluate('//head', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!head_elem) { return; }
  var style_elem=document.createElement('style');
  style_elem.setAttribute('type','text/css');
  style_elem.textContent=css;
  head_elem.appendChild(style_elem);
}
// Add jQuery by http://joanpiedra.com/jquery/greasemonkey/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    //alert($); // check if the dollar (jquery) function works
}
addGlobalStyle(''
+' html {overflow-x:hidden;overflow-y:scroll}'
+' body { background-color:#fff!important;background-image:none!important; }'
+' #bmASH, #bmHeaderLink { display:none!important; }'
+' #recently-posted h2 { top:0; padding:37px 10px 3px; background:none!important; background:#FFFFFF url(http://img163.imageshack.us/img163/4250/bgheaderu.jpg) repeat-x!important; } '
//--- Header & Footer + fluid by http://userstyles.org/users/12677
+' #footer, #player-links, .buy, #content-left #filter #first, #menu-item-zeitgeist, #menu-item-radio  { display:none!important; }'
+' #content-left { width:auto!important; }'
+' #player-inner {width:100% !important;}'
+' #playerPrev {right:290px !important;}'
+' #player { top:23px; }'
+' #container {width: 100% !important;  }'
+' #content-wrapper { margin-top:43px!important; padding-top:1px; }' //background:url(http://img260.imageshack.us/img260/6356/unbenannt2m.jpg) repeat-x;
+' #content-left {width:100%!important;}'
+' #content-left p {width:85%!important;}'
//+' #loved a, #history a, #content-left #filter li a { width:78px!important; white-space:nowrap; }'
+' #content-left #filter #history a { content: "History"!important; }'
+' #content-left h2, #content-left #filter  { position:fixed; z-index:70; left:0; right:0; }'
+' #content-left #filter { top:64px; height:25px!important; border-bottom:1px solid #c8c8c8; z-index:130; }'
// Menubar
+' #header #header-inner { height:0!important; }'
+' #header #header-inner .ad_report_leaderboard, #header #header-inner #ad-leaderboard {display:none!important;}'
+' #header #header-inner .menu  {display:block!important; background:none; position:fixed; top:0px; left:0; right:0; z-index:100; padding-left:55px;}'
+' #header { background:none!important; height:1px!important; z-index:200; }'
+' #header #header-inner h1 { display:block; position:fixed; top:-6px; left:22px; z-index:300; width:40px; height:30px; background:url(http://img145.imageshack.us/img145/7470/icon2m.png) no-repeat; visibility:visible!important; }'
+' #header #header-inner h1 a { display:none; }'
+' #header #filter { position:fixed; top:2px; right:0; background:none; }'
+' #header div#search { z-index:102; background:none!important; }'
+' #header #search #q { border:2px solid black; background:white; font-size:12px; padding:2px 1px 2px 3px!important;position:fixed!important; top:3px!important; left:282px; width:165px!important; display:block!important; }'
+' #header a { font-size:10px!important; }'
+' #header #filter #menu-item-username { border:none!important; }'
+' #header #filter:hover #menu-item-username { border-bottom:2px solid black!important; }'
// FAVS
+' #content-right { margin-bottom:0!important; width:100%!important; }'
+' #content-right .fav-stuff { position:fixed; top:3px; left:458px; border:2px solid black; z-index:200!important; background:white; }'
+' #content-right #news, #content-right #copyright, #content-right #ad_report_skyscraper, #content-right #ad-skyscraper,  #content-right #ad_report_rectangle, #content-right #ad-rectangle, #content-right #tour-dates, #content-right #active-users, #content-right #get-badge { display:none!important; } '
+' #content-right .fav-stuff .section { max-height:600px; overflow:auto; }'
//+' #content-left .fav-stuff .section { padding:0 5px 10px!important; }'
+' .brk { height:9px!important; }'
+' #content-right .fav-stuff #fav_blogs, #content-right .fav-stuff #fav_blogs_rest, #content-right .fav-stuff #fav_searches, #content-right .fav-stuff #fav_searches_rest, #content-right .fav-stuff #fav-artists'
+' , #content-right .fav-stuff #fav_people'
+' , #content-right .fav-stuff #fav_people_rest'
+' , #content-right .fav-stuff .section ul'
+' { display:none; }'
+' #content-right .fav-stuff:hover #fav_blogs, #content-right .fav-stuff:hover #fav_blogs_rest, #content-right .fav-stuff:hover #fav_searches, #content-right .fav-stuff:hover #fav_searches_rest, #content-right .fav-stuff:hover #fav-artists,'
+ '#content-right .fav-stuff:hover #fav_people, '
+ '#content-right .fav-stuff:hover #fav_people_rest, '
+ '#content-right .fav-stuff:hover .section ul '
+'{ display:block; } ' /* <--- idiot for that: - _ what about an class? and what about putting the blog listener in the same .section ???? */
/*+' #content-right .fav-stuff div { display:none; }'
+' #content-right .fav-stuff:hover div { display:block; }'*/
+' #content-right .fav-stuff br { display:none;}' /* <-- idiot */
+' #content-right .fav-stuff h2 { padding:1px 2px 0!important; } '
+' #user-stats .bottom { position:fixed!important; background:transparent!important; top:69px; right:0; z-index:71; border:none!important; width:147px!important; } '
+' #user-stats .bottom strong { display:none; }'
//PAGES
+' .paginator { padding-left: 45px!important; } '
+' .paginator strong { left: 5px!important; }'
+' .paginator .next { margin-right: 5px!important; }'
+' #message { margin:25px auto 0 69px!important; padding:23px 0 20px 75px!important; width:auto!important; }'
+' #message p { white-space: nowrap; }'
//USERBADGE
+' #content-right #user-stats ul { position:fixed; top:67px; z-index:140; right:145px; height:29px; background:#F4F4F4; }'
+' #content-right #user-stats ul #avatar img { width:25px; height:25px; }'
+' #content-right #user-stats ul #avatar img:hover { width:auto; height:auto; border:2px solid white; }'
+' #content-right #user-stats ul #avatar { width:auto!important; margin-top:2px; }'
+' #content-right #user-stats ul { padding-left:40px!Important; }'
+' #content-right #user-stats ul .top { padding-top:7px; }'
+' #content-right #user-stats ul .top a, #content-right #user-stats ul .top a em { display:inline; margin-top:7px; color:#000!important; height:auto!important; width:auto!important; }'
+' #content-right #user-stats ul .top a em { color:#0063DC!important; }'
+' #content-right #user-stats ul .top a em { font-size:12px!important; display:inline!important; }'
+' #backtype { margin-top:31px; } '
//+' * { border:1px solid lime!important;}'
);


function injectHtml()
{
  var striptop = document.createElement('div');
  striptop.setAttribute('id', 'striptop');  
  document.body.appendChild(striptop);
  var stripbottom = document.createElement('div');
  stripbottom.setAttribute('id', 'stripbottom');
  document.body.appendChild(stripbottom);
  addGlobalStyle(''
  +' #striptop, #stripbottom { position:fixed; left:0; right:0; height:13px; }'
  +' #striptop {  z-index:125; top:64px; background:url(http://img403.imageshack.us/img403/2870/stripox.png) repeat-x bottom; }' //http://img230.imageshack.us/img230/3034/stripo.png
  +' #stripbottom {  z-index:150; bottom:36px; background:url(http://img524.imageshack.us/img524/5488/stripb.png) repeat-x top; }' //http://img163.imageshack.us/img163/5488/stripb.png
  );
}
function filterAfterAjax()
{
  if(document.getElementById("avatar"))  
  	addGlobalStyle(' #content-wrapper { padding-top:30px; }'
    +' #striptop { height:11px; top:100px;} ');
  else
    addGlobalStyle(' #content-wrapper { padding-top:1px; }'
    +' #striptop { height:13px; top:64px;} ');
}
function insertUpdateButton()
{
		/*
		var ul = document.getElementById("filter").getElementsByTagName("ul")[0];
		li = document.createElement("li");
		a = document.createElement("a");
		a.id = "pleaseUpdateMe";
		a.appendChild(document.createTextNode("Update Hypemapp"));
		//a.onclick="alert()";
		li.appendChild(a);
		ul.appendChild(li);
		document.getElementById('pleaseUpdateMe').onclick='alert()';
		*/
}


// ON LOAD
window.onload=injectHtml();
window.onload=filterAfterAjax();
window.onload=insertUpdateButton();

// ON AJAX
unsafeWindow.Ajax.Responders.register({
	onComplete: function() {
		filterAfterAjax();
	}
});

javascript:scroll(0,0)
//alert(window.innerWidth +", "+ window.innerHeight)
//window.resizeTo(917, 784);

//===============================================================================
//			- Weekly Auto-Update Check - @ http://userscripts.org/scripts/show/22372
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.

var script_title = "Hypemapp";
var source_location = "http://userscripts.org/scripts/source/62762.user.js";
var current_version = "1.1.1";
var latest_version = " ";
var gm_updateparam = "videofocus_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/RawDocContents?docID=df8kjzj6_0fxs3wsfp&justBody=false&revision=_latest&timestamp=1202175933804&editMode=true&strip=true";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("Check for HypemApp-Update", CheckVersion);

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
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						alert("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
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