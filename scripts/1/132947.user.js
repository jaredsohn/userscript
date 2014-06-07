// ==UserScript==
// @name        Mousehunt Assistant
// @author      Chau Nguyen
// @version    	1.5.0.1247
// @description A tool that assist you when playing on Mousehunt
// @grant       GM_xmlhttpRequest
// @include     http://mousehuntgame.com/*
// @include     https://mousehuntgame.com/*
// @include     http://www.mousehuntgame.com/*
// @include     https://www.mousehuntgame.com/*
// @include     http://apps.facebook.com/mousehunt/*
// @include     https://apps.facebook.com/mousehunt/*
// ==/UserScript==

// The public prefix for this script is MHA_ . All of the global variable and function will have this prefix.

// This script will run in global, not in GM
if ('undefined' == typeof __MHA_SCOPE_RUN__) {
	//opera script compatibility
	var __MHA_async__ = false;
	if (navigator.appName.toUpperCase() == "OPERA") {__MHA_async__ = true}
	
	// If we're _not_ already running in the page, grab the full source of this script.
	var my_src = __MHA_wrapper.toString();
	my_src = my_src.replace("function __MHA_wrapper() {","");
	my_src = my_src.substring(0,my_src.length - 1);
		
	// Create a script node holding this script, plus a marker that lets us
	// know we are running in the page scope (not the Greasemonkey sandbox).
	// Note that we are intentionally *not* scope-wrapping here.
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.textContent = "var __MHA_SCOPE_RUN__ = true;\n" + my_src;
	
	function MHA_async_main(script)
	{
		if ((document.body == null) || ((document.getElementById('overlayBg') == null) && (document.getElementsByClassName('mobileLinks').length == 0))) setTimeout(function () {MHA_async_main(script);}, 400);
		else document.body.appendChild(script);
	}
	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.  Use setTimeout to force execution "outside" of
	// the user script scope completely.
	if (__MHA_async__) setTimeout(function() {MHA_async_main(script);}, 100);
	else setTimeout(function() {document.body.appendChild(script);}, 0);

	// Do stuff in the sandbox (check for update,...)
	if (!window.localStorage.MHA_lastCheckUpdate) window.localStorage.MHA_lastCheckUpdate = 1;
	hourFromLastUpdate = ((new Date()) - (new Date(window.localStorage.MHA_lastCheckUpdate))) / (3600000);
	if (hourFromLastUpdate > 12)
	{
		window.localStorage.MHA_newversion = "error";
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/132947.meta.js",
			onload: function(response) {
				window.localStorage.MHA_newversion = response.responseText.substring(response.responseText.indexOf("// @version")+16,response.responseText.indexOf("// @namespace")-2);
				window.localStorage.MHA_lastCheckUpdate = new Date();
			}
		});
	}
}

function __MHA_wrapper() {
	// This line is marked for opera compatibility (no need to wait full element loading, which is very slow)
	var __MHA_async__ = false;
	if (navigator.appName.toUpperCase() == "OPERA") {__MHA_async__ = true;}

	// Global Setting Variable
	var MHA_version = "1.5.0.1247";
	var MHA_S_SecondTimer = 1;
	var MHA_S_ShortTimer = 5;
	var MHA_S_ModerateTimer = 30;
	var MHA_S_MinuteTimer = 60;

	// Global Constant Variable
	var MHA_C_LOCATION_TIMES = [
		{
			name: 'Seasonal Garden',
			shortname: 'SG',
			id: 'MHA_locationTimerSeasonalGarden',
			base: 1283328000,
			totaltime: 1152000,
			length: [288000, 288000, 288000, 288000],
			state: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'],
			shortstate: ['SPR','SUM','FALL','WIN'],
			color: ['LightGreen', 'Yellow', 'Orange', 'LightBlue'],
		},
		{
			name: "Balack's Cove",
			shortname: "BC",
			id: 'MHA_locationTimerBalacksCove',
			base: 1294680060,
			totaltime: 67200,
			length: [57600, 3600, 2400, 3600],
			state: ['LOW', 'MEDIUM', 'HIGH', 'MEDIUM'],
			shortstate: ['LOW','MED','HIGH','MED'],
			color: ['#E1C7E1', 'Orange', 'Red', 'Orange']
		},
		{
			name: 'Forbidden Grove',
			shortname: "FG",
			id: 'MHA_locationTimerForbiddenGrove',
			base: 1285704000,
			totaltime: 72000,
			length: [57600, 14400],
			state: ['OPEN', 'CLOSED'],
			shortstate: ['OPEN','CLOSED'],
			color: ['LightGreen', 'Red']
		},
		{
			name: 'Relic Hunter',
			shortname: "RH",
			id: 'MHA_locationTimerRelicHunter',
			base: 1346284800,
			totaltime: 604800,
			length: [86400, 86400, 86400, 86400, 86400, 86400, 86400],
			state: ['Mountain', 'Town of Digby', 'Laboratory', 'S. S. Huntington III', 'Seasonal Garden', 'Slushy Shoreline', 'Muridae Market'],
			shortstate: ['Mt.', 'ToD', 'Lab', 'SSH', 'SG', 'SS', 'MM'],
			color: ['#CD853F', '#8B4513', 'Skyblue', 'Blue', 'Green', 'Silver', '#B22222']
		}
	];

	// Global Control Variable
	var MHA_titleBar,MHA_titlePercentage;
	var MHA_huntTimer;
	var MHA_locationTimerParent;
	var MHA_mode;

	// Global MAIN
	if (__MHA_async__ == false) //if (typeof __MHA_async__ == 'undefined')
	{
		MHA_main();
	}
	else
	{
		setTimeout(function () { (MHA_async_main)() }, 100);
	}
	function MHA_priorityFunctions()
	{
		window.onunload = MHA_onunload;
		MHA_createGlobal();
		MHA_global.MHA_user = new Object;
		MHA_global.settings = new Object;
		MHA_global.MHA_settinggrouplength = new Array;
		MHA_global.MHA_callbackFunctions = new Object;
		MHA_global.MHA_callbackFunctions.MHA_page_process = MHA_page_process;
		MHA_global.MHA_callbackFunctions.MHA_sound = MHA_sound;
		MHA_global.MHA_callbackFunctions.MHA_syncUser = MHA_syncUser;
		MHA_global.MHA_callbackFunctions.MHA_syncTime = MHA_syncTime;
		MHA_global.MHA_callbackFunctions.MHA_updateHud = MHA_updateHud;
		MHA_global.MHA_callbackFunctions.MHA_updateSimpleHud = MHA_updateSimpleHud;
		MHA_global.MHA_callbackFunctions.MHA_updateJounal = MHA_updateJounal;
		MHA_global.MHA_callbackFunctions.MHA_HideContent = MHA_HideContent;
		MHA_global.MHA_callbackFunctions.MHA_ShowContent = MHA_ShowContent;
		MHA_global.MHA_callbackFunctions.MHA_toolboxShowContent = MHA_toolboxShowContent;
		MHA_global.MHA_callbackFunctions.MHA_travel = MHA_travel;
		MHA_global.MHA_callbackFunctions.MHA_mobiletab = MHA_mobiletab;
		MHA_global.MHA_callbackFunctions.MHA_SimulateTabBar = MHA_SimulateTabBar;
		MHA_global.MHA_callbackFunctions.MHA_trapcontentLoad = MHA_trapcontentLoad;
		MHA_global.MHA_callbackFunctions.MHA_shopcontentLoad = MHA_shopcontentLoad;
		MHA_global.MHA_callbackFunctions.MHA_travelcontentLoad = MHA_travelcontentLoad;
		MHA_global.MHA_callbackFunctions.MHA_toggleGroup = MHA_toggleGroup;
		MHA_global.MHA_objects = new Object;
		MHA_global.cpcontent = '<style type="text/css">#MHA_iframe, .MHAdrawertaskbar {font-family: "Segoe UI";font-size: 12px;color: #323232;}.MHAdrawertaskbar {background-color: #3c454f;height: 60px;position: relative;text-align: center;color: #fff;}.MHAbutton {background-color: transparent;border: 0;width: 85px;height: 60px;font-size: 9px;color: #fff;cursor: pointer;text-decoration: none;display:inline-block;}.MHAbuttonseparator {background-color: transparent;border: 0;width: 85px;display: inline-block;}.MHAbutton:hover {background-color: #505861;}.MHAbuttoniconwrapper {padding-top: 2px;}.MHAbuttonicon {position: relative;overflow: hidden;width: 32px;height: 32px;margin: 0 auto;padding: 4px 0 0;}.MHAbuttontext {text-align: center;text-transform: uppercase;line-height: 1em;word-wrap: break-word;padding: 0 2px;}.MHAsection h2 {border: 0;float: left;margin-bottom: 0;padding-bottom: 5px;font-size: 20px;border-bottom: 2px solid #88b9e3;margin: 10px 0 22px 0;font-family: "Segoe UI Light";font-weight: normal;min-width: 100%;}.MHAsettinggroup {transition: all 0.7s ease-in-out;-moz-transition: all 0.7s ease-in-out;-webkit-transition: all 0.7s ease-in-out;-o-transition: all 0.7s ease-in-out;opacity: 1;overflow: hidden;}.MHAsetting >label {display: block;padding-top: 10px;font-size: 11px;font-family: "Segoe UI Semibold";text-transform: uppercase;float: left;width: 158px;word-wrap: break-word;}.MHAsetting ul {list-style-type: none;}.MHAsetting {position: relative;border-bottom: 1px solid #d8d8d8;padding-bottom: 18px;margin-top: 18px;min-height: 37px;display: block;clear: both;display: block;}.MHAsettingvalue {display: inline-block;}.MHAsettingvalue ul {display: block;float: left;margin-top: 0px;margin-bottom: 0px;padding-left: 0px;}.MHAsettingvalue li {float:left;border:2px solid #ccc;margin-right:-2px}.MHAsettingvalue li:hover {background-color:#ddd}.MHAsettingvalue li[aria-checked="true"] {position:relative;background-color:#4f9dd7;border-color:#434343;color:#fff}.MHAsettingvalue.editted li[aria-checked="true"] {background-color:#c84fd7}.MHAsettingvalue li {min-width:46px;line-height:20px;padding:5px;text-align:center;text-transform:uppercase;color:#535353;cursor:default}.MHAsettingvalue input[type="text"] {vertical-align: bottom;width: 36px;}</style><div id="MHA_settting_general" class="MHAsettingtab"><div class="MHAsection"><h2>General</h2></div><div class="MHAsetting"><label class="MHAlabel">Skin</label><div class="MHAsettingvalue"><ul id="MHA_skin" role="radiogroup" aria-labelledby=""><li class="MHAsettingli" value="0" tabindex="0" aria-checked="false">NONE</li><li class="MHAsettingli" value="1" tabindex="-1" aria-checked="false">DEFAULT</li><li class="MHAsettingli" value="2" tabindex="-1" aria-checked="false">SIMPLE</li></ul></div></div><div class="MHAsetting"><label class="MHAlabel">Advertisement</label><div class="MHAsettingvalue"><ul id="MHA_ads" role="radiogroup" aria-labelledby=""><li class="MHAsettingli" value="0" tabindex="0" aria-checked="false">ON</li><li class="MHAsettingli" value="1" tabindex="-1" aria-checked="false">REMOVE</li><li class="MHAsettingli" value="2" tabindex="-1" aria-checked="false">REPLACE</li></ul></div></div><div class="MHAsetting"><label class="MHAlabel">Version</label><div class="MHAsettingvalue"><label>Version </label><span id="MHA_version"></span><br><div id="MHA_update_available" style="display:none"><img style="top: 3px;position: relative;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACQklEQVR4XqWRu2sUURSHv3vnkdndbB4bgxIDUVZUhFRW2in+AWIhFoKgpU0K6zQGLERQsYogCNYKWsfOQggYCxEECRgUVUKy67CbzOMes4fLTrCxcODHucw58/HdM0ZE+N/HPFtohsZwfbxh7k83bS2JACMgIA6teh7EiT9rpdPt3505v7QYJjGtKODO0emgdnjKEAfVh67IcXmOscFeYsQ5DzYK6kbFrZkzV16FSWiiJKY53YRaCM6pCFlR0Mkn2Q1nCXd/0pQfJLHVPiI6MxpjJOsesdaI7KUM7H5lId3qEp28SfvaG8bPPWJzM6XMRfuuBFcIlACEVhyq6LQKGhGKDGxjFoCRiTn6PSHbdaAzDqcVELDDxZVAKVql9AOuAKDMdwZHNfEzVaWCqI54GxwoTAxoW/xVQQ00VCb+xdAAXy1Q7GwBkPe2KHNA+/gZb40QVlStw+3X6yN01pb5/PU9nS8fsBJhjZpoqEwIRbxeaYd0J2BtRLn5ie31AcDQmkiwuia9Gsj+nTg81SkAJ5p0O2Xk9ALzS10OXXxI1u8P94W3xv0Nqe6pkCIDqR/EJE2CVps0hSIXkAqgs4KxWa9HWbrAGwyMVLlWj+mvLrP+9CobLxZxLtT+8O94GCJj5vvH1413jy89OTHWuTyegAj4JlkffncgK6AxupcEEI0CggPHfrVurNwzImK+rb08lb598GgqSudDa6xCAFy1RPBwBCkLY5LWzuiF2yvx3NnnA0gETAJt4DjQ4N+P9U4bwOofNUe978m0puEAAAAASUVORK5CYII="/> New update available !</div><div id="MHA_is_uptodate" style="display:none"><img style="top: 3px;position: relative;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAC2klEQVR4XqWQTWhcVRTHf/e+9+bDmaRmkklDasdYq0A0FaiCGFqFUQzuROjGXd24dCVdFRGkQqlUW2xB7Eq3FQoBCn6ViJW2SCyWtNAPtYVgbJPpy8vMvJl3z3F4F0J2Al74cQ5wz+H/O0ZV+b/PvHdsLDSGg5WqPT5Us+WoCAZQBVFFN8FXBFFQB3G8cbS558PD5v2T9fEgNEsTjbA2OmEJQjYHBvhF+L7b6ZEmIUExo1CytFotffeVWy/bMCIqlhgarhnCAmA0R1FEBdCcOF5nWGd5Y+ZranY/yXpKoWxMmq1PWWPQAW4AoLTbG6S9NFdwThER4ocxpf40c8+dYPfkazRGmtxf6dDPHBgNraDkqBCvZVSzWVw8wUbSBaN0Oiku2c7rez5lZGiK+2vX+WHxFN1uiIgCEKooKLQ7G4yX9jE38yVx+x7fXH6bTvoX2ivSfOYIjfGX6KcJ53/9gDsrSzSmHtm8nfUNgKHTWwWEHfW9NJ89SpY8yvONQ8w0DoAoF6+fZuG3s9TGClS3gfhZrKjgxBFGRVZ7i4OPn4HA7okmb77wFXt3HcSoZXn1MuevnEKjjNF6gL8ZXkdEEQGXOSrVMleXz/DU5Bw7x17kifp+RPu00xXmL33E8tptdu4qEUYgIojDJ1EV8jROADDFh1z4/WOc65NlXVQyFq59zsLVc16jonlyJ4ofUayoIsoAJXOOqBCynPzELzdO4yTlz5Wf+XbxBKUhy0jdICgiivq5rTrez4mCWqJqysXbn3Dj3o/c/fsacbvF9sdCgkDIcgV/Uac+vG13Epxzgajknm6ADUIoP+Bma57E/MH4joBimVxZZAsOBB02S3e+r3wx/9aZbZOtA6UqPqqAACKguom/gYLi+3r18X/e2XfhmFFVs3jz3PSlW8dPhtX1GRtYq94ZD1uq4BeoKUfD3Venj3zXGJ09a1Q1AkaAJ4GngQr//SygwF3gyr8kYdUGNVTZGQAAAABJRU5ErkJggg=="/> Mousehunt Assistant is up to date.</div><div id="MHA_cannot_update" style="display:none"><img style="top: 3px;position: relative;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACKElEQVR4XqWTu2tUQRTGv3Mf+8jdh3E3KyYGBNEiEGwsI1H8A8TGxkYCVhZWNhECqUWwsLewFMw/YFDQQjSFSiSKoIWlRTZr9pXcmfHMOXDHFUHBgY+Znbnnd858e4acc/jfQau3rydEWMmmKvebzXq1VEoAB3i4ddYv/Lr47eTMwhqH3o/e3aXly2u0fudGJ46jnbnZ9tF26wh4rUEArLGAwhRibYAxZHev666trC0nSRKnnL3eqGfgdfGhStYFIEB0LpcSOhiPTkZEcERkQKRlWpWxRmX+oFxnyyJwbk/U4CDAZ1M5zR7OdU+qMXqGxFqGiKzQe70exuODCQAcGGAEQESoVqsAQb73gytRKmPQ7e5iYfECzp67BILEKggshsAZfPzwCs+fbmCqVlOPPCRcw2E0HKHdmUealjA5xuIDIUbn+Dz2+wNQEiMm6YUAyfND1BtNvHj2GJ92XqsfJoexOc9aLRHh65fP3B991Bo1GGfgECDeaangcLCP7XcvMeSq1EBM/M1EEdqtaaRxLN7BQY1VWSmZmwbtmWMCZbj65c8VAkCBvFd4EhXX+a0XfvVKQSprRJpUoKBoOBz4oFhhEvzvMsb3WCO5eWt979HDexuD/uCqsykDQpNJueHRhbb3MhatmdnvlUpWJt6k7fdvFt5ubT4op1gkfoEeAgkKLxhQ73iCMTmVq9no/MUrm3MnTj/xkBTANOsU6wwrw99HJFTgG2vrJ5n2SP74Fl6MAAAAAElFTkSuQmCC"/> Fail to check for new update</div></div></div></div><div id="MHA_settting_bot" class="MHAsettingtab" style="display:none;"><div class="MHAsection"><h2>Bot Settings</h2></div><div class="MHAsetting"><label class="MHAlabel">BOT</label><div class="MHAsettingvalue"><ul id="MHA_auto" role="radiogroup" aria-labelledby="" onclick="MHA_global.MHA_callbackFunctions.MHA_toggleGroup(0);return true;"><li class="MHAsettingli" value="0" tabindex="0" aria-checked="false">ON</li><li class="MHAsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li></ul></div></div><div class="MHAsettinggroup"><div class="MHAsetting"><label class="MHAlabel">Rules of Mousehunt</label><div class="MHAsettingvalue"><div><label>+ Players are forbidden from using any scripts, programs, browser add-ons or other types of software to gain an unfair advantage in the game.</label><br><label>+ Thus includes, but is not limited to the following types of software:</label><br><br><label>- ...</label><br><label>- Anything which sounds the horn automatically or while the player is not at their computer</label><br><label>- ...</label><br><br><label>+ Please be aware that each player\'s gameplay is monitored for using automated page refreshers or other scripts. Accounts are automatically disabled upon the detection of scripts or software being used to sound the horn.</label></div></div></div><div class="MHAsetting"><label class="MHAlabel">Are you sure continue running ?</label><div class="MHAsettingvalue"><div class="MHAsettingvalue"><ul id="MHA_autoaccept" role="radiogroup" aria-labelledby=""><li class="MHAsettingli" value="0" tabindex="0" aria-checked="false">YES</li><li class="MHAsettingli" value="1" tabindex="-1" aria-checked="false">NO</li></ul></div></div></div></div></div>';
		MHA_global.cpprefix = '<style>#overlayPopup .jsDialogContainer .prefix {background-color: #3c454f;}</style><div class="MHAdrawertaskbar"><div class="MHAbutton" onclick="MHA_global.MHA_settingCommand[2](0)"><div class="MHAbuttoniconwrapper"><div class="MHAbuttonicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBENTVBOTA4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBENTVBOTE4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEQ1NUE4RThEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEQ1NUE4RjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlEc8wYAAAHGSURBVHja7JbNSsNAFIWbpnWhKBRcdlGLVXwFdSsqCBURcefGhUtxLT6C+AC+QMGlUKg7se7V1IUt1J+df1RREWs7nsFbGa6TNIkpXZgLH+k9mc4ckjt3YgghIt2MaKTLERoIDcQ02hDLqx40z2FotmGd5XEHzQBma66gnoBXrakx+CcDbuMVXIK838dvZ+DcpbYFdsELGAQp5d47uAMNPzWQYXmZaXLnXNEi8vcCWAcTypgS2AF7oOboQBpgvDF02hiQ5jdAU3xHDTzStRU5ENOs8YNO5MG1IoiCOdAg7QDMgkm6FpTxK0EbGCftmPJDkGBzJEiXcQ1MLwZKDFUraIxmbSbPKmOG7QzodsG8g6b7eLi3KS9VT4KK2214wvJeRZPdro+aj6A8DYqaedJ0/QS3XnZBuxpIkXZEuQVGlPdsUm7R/WrQRbhGi8yAD8XEKliiq6WMvwEZLwaqDK7tgwHSt8GDcA7ZJ07pqfxaT9cJ45rTUdUM0gR1wmmwSe+8h9pvmc6KKeV/Z2ARXLRrxX7PlCTxTGdHP8gxE3Lx0XZFGCQJ1hWf3NRAJ0zkqX6W3dRAJ8Kkeqm7OY7Dz/LQwP8y8CXAAOQNDNLkrjsHAAAAAElFTkSuQmCC"></div></div><div class="MHAbuttontext">General</div></div><div class="MHAbutton" onclick="MHA_global.MHA_settingCommand[2](1)"><div class="MHAbuttoniconwrapper"><div class="MHAbuttonicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM5QUQ3MDg4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM5QUQ3MDk4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzlBRDcwNjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzlBRDcwNzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrRjG84AAAIBSURBVHja7JdPKMNhGMc3k79z0Ka5KJMTB1xIK5KLrK3c/D2gleIwV8WRpLg4jbubxEEOigPCRaspZXESzTAutPj5vvUsj7ff/H77bSy1pz71e9/3eZ/32/s+7/NuZkVRTNm0PFOWLesC8tOYawdxEGN9XlAArsEleNKMInIgRUpABwiAeWCn/lbly0KgV088IzvQBQLARu1ycAjGmE8dYfqNHRhX9NkG7U4hcGZyB8IqfS8gCqyUG8LcYBbcgQawRnwzs846UEaBRYLNgR7qfwN7YIeEOYALtINqKUYENIIbI0cwCjbBLtviOJgGRSr+XnClciwDsq9eAUGVYKsac7wkMmFnoNmoANliwKFj3gGb06Tmo7cSiuS5YO0QJZeW7bNvSzqluJ/ueTSRvEn8PMDJk5x9L1OlTKsOhGk770GpNOYGj5Ssieo4CD6k4zOUA1bgkwL5JZ8pNhZgIpaYiAejArpVEvEWeCS/RfDORNiYCHEtF4wK6ExSbiNgArhAJfmKRaI0vgJq2LWsNSpAsA6ewSnBTeTEMPmJ6nrOxvp+ipuKAPGgTIJ64kR6fttAHuXGK/VvgapMCZCZoUVElWwBFhKosMUrtOKkI8DPFhftoVQXN/ocJ2wbHIFjahdToRKv3Qi9fppmzvDPch8IMlF/LiD3vyAnICfg/wn4FGAAfkF8N/5zo2sAAAAASUVORK5CYII="></div></div><div class="MHAbuttontext">Bot</div></div></div>';
		MHA_global.cpsuffix = '<style>#overlayPopup .jsDialogContainer .suffix {background-color: #3c454f;}</style><div class="MHAdrawertaskbar"><div class="MHAbutton" onclick="MHA_global.MHA_settingCommand[0]()"><div class="MHAbuttoniconwrapper"><div class="MHAbuttonicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVEOEJDRkU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVEOEJDRkY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIyNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NUQ4QkNGRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr3Wrw0AAAEQSURBVHjaYvz//z/DQAImhgEGow4YcAewEKkuCogDybRjMRBvwikLygUEcBQQP/1PPrgPxDq4zGckIhs+BWIpKBvkk/VA/IWAHgkgdgViPyj/IBA7YFNIjAOQFegB8WUig14XiC8h20UNBzCSGP8E9Q65bMhCbbNJdQCxWZEDiLOIUUhqGrgHxFeA+BcBPbxAbATEotROhJSA4ZEIB6wuQAbHgXgWntKQB4jTgNiSuJKCcF2ADgKJ0BOIRR/ZdQG6Ak4g/kFENvxOTCIkxwEwg1YjiYWSoI9kB1yEVkLoBhEq55HlQZWSPrm5YBIVEvskSnLBKiD+iEU8lIA+ZPmdlBTFo63iUQeMOmB4OwAgwAA4DRkrSEfzrgAAAABJRU5ErkJggg=="></div></div><div class="MHAbuttontext">Save</div></div><div class="MHAbutton" onclick="MHA_global.MHA_settingCommand[1]()"><div class="MHAbuttoniconwrapper"><div class="MHAbuttonicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU1NERCMUU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU1NERCMUY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIxQzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTU0REIxRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgDrifwAAAGwSURBVHja7NY9SwMxAAbgtvhNq2JLaScVdNDqoCBWnIqDOugguvkbnPwBLg7FLuLSSRShgovgIKhYENTZRVFUKujaKoJUUDnfwCuEox+XM+VQGnhIm8sl79EmF7dhGC4ni8flcPnzAYIQcCqAmHwDupwI8DP5JNT9JkCNjXv6Ic7JRRmCeriDjOpgbsVlOAprMCC1PUEesnAPp5C0PKIIoCBtlC9Z2IGglTFVA8zBuWnCZZiHFchI7fsQ0h1AiMCuNNEw270QhaR0bb0SAYR2SHCSmOmaH7Z47RMGKxFA8MEC9BW4FoYcQ8R1BOikVlO7WEUNRe7ZZoCLUmNb3YhSNGteRPBe5J5r1r06NqIo67TCnvHFulbHVnzD2qsQoIP1o44Ae6xnoNlCfx9M8/OZjp2wh0tKlCUL/RPSXhDTtQxXOeALQzQW6NMEi5Bn3yPwlBpX5WUU4E8xAh9wAgd8C4oSggkY439FvBnH4Vbnyyhi2mrf4IGepfZDbstlx3TbOBX7+ZRT1ML2V7iCTTgu++Q2zwNyCUM3tPF7jmeCy0oeSKrH8mqAaoD/F+BbgAEAp4jNfsnaJiYAAAAASUVORK5CYII="></div></div><div class="MHAbuttontext">Reset</div></div></div>';
		MHA_global.MHA_loadControlPanel = MHA_loadControlPanel;
		MHA_global.MHA_checkLi = MHA_checkLi;
		MHA_global.MHA_settingCommand = new Array;
		MHA_global.MHA_cX = 0;
		MHA_global.MHA_cY = 0;
		MHA_global.MHA_imageBox = null;
		MHA_global.MHA_imagePhoto = null;
		
		if (window.location.hostname.indexOf('facebook') != -1) {
			MHA_mode = 2;
			MHA_facebook_main();
		}
		else MHA_asyncUser();
	}

	function MHA_main()
	{
		MHA_priorityFunctions();
	}
	function MHA_async_main()
	{
		if ((document.body == null) || ((document.getElementById('overlayBg') == null) && (document.getElementsByClassName('mobileLinks').length == 0))) setTimeout(function () { (MHA_async_main)() }, 400);
		else MHA_main();
	}
	function MHA_page_process()
	{
		MHA_initAndLoadSettings();
		MHA_syncTime(true);
		if (document.getElementsByClassName('ui-mobile').length == 0) MHA_mode = 0;
		else MHA_mode = 1;
		switch (MHA_mode)
		{
			case 0:MHA_standard_main();break;
			case 1:MHA_mobile_main();break;
		}
		
		if (MHA_global.settings.MHA_auto == 0) MHA_auto();
	}
	function MHA_standard_main()
	{
		MHA_addControlPanel();
		if (MHA_global.settings.MHA_ads != 0 || MHA_global.settings.MHA_skin == 2) MHA_removeAds();
		switch (MHA_global.settings.MHA_skin)
		{
			case 1: MHA_defaultSkin();break;
			case 2: MHA_simpleSkin();break;
			default: break;
		}
		MHA_global.MHA_callbackFunctions.MHA_updateHud();
	}
	function MHA_mobile_main()
	{
		MHA_global.MHA_loadControlPanel = MHA_loadMobileControlPanel;
		MHA_mobileInitSkin();
		if (MHA_global.MHA_user.user.has_puzzle == true) return;
		switch (MHA_global.settings.MHA_skin)
		{
			case 1:MHA_mobileskin();
			case 2:MHA_mobileSimpleSkin();break;
			default: break;
		}
	}
	function MHA_facebook_main()
	{
		MHA_removeAds();
	}
	function MHA_onunload()
	{
		var tmp = document.getElementsByTagName('*');
		var i,j;
		for (i = 0;i < tmp.length;++i)
			for (j = tmp[i].attributes.length - 1; j > 0;--j)
				tmp[i].removeAttributeNode(tmp[i].attributes[j]);
		while (tmp.length > 0)
		{
			if (tmp[0].parentNode != null) MHA_removeObject(tmp[0],null);
		}
		tmp = undefined;
	}
	function MHA_removeObject(obj,parent)
	{
		if (obj.getElementsByTagName != null)
		{
			var tmp = obj.getElementsByTagName('*');
			var i,j;
			for (i = 0;i < tmp.length;++i)
				for (j = tmp[i].attributes.length - 1; j > 0;--j)
					tmp[i].removeAttributeNode(tmp[i].attributes[j]);
			for (j = obj.attributes.length - 1; j > 0;--j)
				obj.removeAttributeNode(obj.attributes[j]);
			tmp = undefined;
		}
		if (parent != null) parent.removeChild(obj); else obj.parentNode.removeChild(obj);
	}
	function MHA_cleanObject(obj)
	{
		if ((obj.innerHTML != null) || (obj.innerHTML != ""))
		{
			var tmp = obj.getElementsByTagName('*');
			var i,j;
			for (i = 0;i < tmp.length;++i)
				for (j = tmp[i].attributes.length - 1; j > 0;--j)
					tmp[i].removeAttributeNode(tmp[i].attributes[j]);
			tmp = undefined;
		}
		obj.innerHTML = "";
	}
	//THESE ARE tool
	function MHA_createGlobal()
	{
		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.textContent = "var MHA_global = new Object;";
		document.body.appendChild(script);
	}

	function MHA_addEvent(c)
	{
		if (document.body.addEventListener) {document.body.addEventListener(c, MHA_UpdateCursorPosition, false)}
		else {
			if (window.attachEvent) {document.body.attachEvent("on" + c, MHA_UpdateCursorPosition)}
			else {document.body["on" + c] = MHA_UpdateCursorPosition}
		}
	}

	function MHA_sound()
	{
		//please take note that the phrase is: "hornwaiting => hornready => hornsounding => hornsounded => hornwaiting"
		//we could catch and fire event when script caught in loop later
		if ((document.getElementById('header').className.indexOf('hornsounding') != -1) || (document.getElementById('header').className.indexOf('hornsounded') != -1))
		{
			setTimeout(function () { (MHA_global.MHA_callbackFunctions.MHA_sound)() }, 500);
			return;
		}
		//we only have sounded now
		MHA_global.MHA_callbackFunctions.MHA_syncTime(true);
		MHA_soundhornwaiting();
	}
	
	function MHA_soundhornwaiting()
	{
		if (MHA_global.MHA_user.user.next_activeturn_seconds == 0)
		{
			alert("Something is really wrong");
			setTimeout(function(){MHA_global.MHA_callbackFunctions.MHA_soundhornwaiting();},500);
			MHA_global.MHA_callbackFunctions.MHA_syncTime(true);
			return;
		}
		
		switch (MHA_global.settings.MHA_skin)
		{
			case 1:MHA_global.MHA_callbackFunctions.MHA_updateJounal();break;
			default: break;
		}
		
		MHA_global.MHA_callbackFunctions.MHA_updateHud();
	}

	//THESE ARE the script worker
	//TOOLBOX AREA
	//When use Toolbox, use this: onclick='MHA_global.MHA_callbackFunctions.MHA_toolboxShowContent(" + i + "," + j + ");return true;'
	function MHT_iframeLoaded() {
		var MHA_iframe = document.getElementById("MHA_iframe");
		MHA_iframe.height = Math.max(
			Math.max(MHA_iframe.contentDocument.body.scrollHeight, MHA_iframe.contentDocument.documentElement.scrollHeight),
			Math.max(MHA_iframe.contentDocument.body.offsetHeight, MHA_iframe.contentDocument.documentElement.offsetHeight),
			Math.max(MHA_iframe.contentDocument.body.clientHeight, MHA_iframe.contentDocument.documentElement.clientHeight));
		MHA_iframe.width = 646; //set to max
	}

	function MHA_toolboxShowContent(url)
	{
		var popup = new jsDialog();
		popup.addToken('{*content*}', '<iframe id="MHA_iframe"></iframe>');
		popup.show();
		var iframeRequest = document.getElementById('MHA_iframe');
		iframeRequest.src = url;
		iframeRequest.width = 0;
		iframeRequest.height = 0;
		iframeRequest.onload = MHT_iframeLoaded;
	}

	function MHA_travelcontentLoad() {
		var MHA_traveltarget = new XMLHttpRequest();
		var MHA_freeTravel,MHA_freeTravelMeadow;
		var MHA_travelcontentChild = MHA_global.MHA_objects.MHA_travelcontentChild;
		MHA_traveltarget.open("GET", "travel.php?quick=1", true);
		MHA_traveltarget.onreadystatechange = function()
		{
			if (MHA_traveltarget.readyState === 4)
			{
				if (MHA_traveltarget.status == 200)
				{
					MHA_cleanObject(MHA_travelcontentChild);
					MHA_travelcontentChild.innerHTML = MHA_traveltarget.responseText.substring(MHA_traveltarget.responseText.indexOf("<h2 style='margin-bottom:12px;'>Select a location to travel to</h2>"),MHA_traveltarget.responseText.indexOf("</div></div><div class='inactive' id='tabbarContent_page_1'>"));
					if (MHA_traveltarget.responseText.indexOf("travel.php?freeTravel=true") != -1)
					{
						appendbefore = MHA_travelcontentChild.firstChild.nextSibling;
						MHA_freeTravel = appendbefore.cloneNode(true);
						MHA_freeTravel.textContent = "Free Travel";
						MHA_freeTravelMeadow = appendbefore.nextSibling.cloneNode(true);
						MHA_cleanObject(MHA_freeTravelMeadow);
						MHA_freeTravelMeadow.innerHTML = "<a href='" + MHA_traveltarget.responseText.substring(MHA_traveltarget.responseText.indexOf("travel.php?freeTravel=true"),MHA_traveltarget.responseText.indexOf("'>Follow Larry back to the Meadow")) + "'>Meadow</a> (0 gold)";
						MHA_travelcontentChild.insertBefore(MHA_freeTravel,appendbefore);
						MHA_travelcontentChild.insertBefore(MHA_freeTravelMeadow,appendbefore);
						MHA_travelcontentChild.insertBefore(document.createElement("br"),appendbefore);
					}
					var MHA_travelcontentChildArr = MHA_travelcontentChild.childNodes;
					for (var _MHA_i = 0;_MHA_i < MHA_travelcontentChildArr.length;++_MHA_i)
					if (MHA_travelcontentChildArr[_MHA_i].nodeName == "DIV")
					{
						MHA_travelcontentChildArr[_MHA_i].firstChild.target = "_blank";
						MHA_travelcontentChildArr[_MHA_i].firstChild.setAttribute('onclick','MHA_global.MHA_callbackFunctions.MHA_travel(this.href); return false;');
					}
				}
				else
				{
					MHA_cleanObject(MHA_travelcontentChild);
					MHA_travelcontentChild.innerHTML = "Cannot load the page, please refresh";
				}
			}
		};
		MHA_traveltarget.send(null);
		return false;
	}

	//REMOVE ADS AREA
	function MHA_removeAds()
	{
		//remove mousehunt ads
		var rightCol = document.getElementById('hgSideBar'); //mousehunt ads
		if (rightCol != null)
		{
			while (rightCol.childElementCount > 1)
				if (rightCol != null) MHA_removeObject(rightCol.lastChild,rightCol);//rightCol.style.display = "none";
		}
		else
		{
			var rightCol = document.getElementById('rightCol'); //facebook ads
			if (rightCol == null) return; //no ads
			MHA_removeObject(rightCol,null);
		}
	}

	//mobile SKIN AREA
	function MHA_mobileInitSkin()
	{
		//add the needed CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".hiddenDiv {display:none;}.displayDiv {display:block;}.hiddenTab {}.displayTab {}.displayTab img, .hiddenTab img{height: 48px;width: 48px;}.hudstatlabel {color: rgb(116,207,70);font-weight: bold;}#MHA_hud, #MHA_traveldiv {font-size: 14px;}#mobileCountdown {	font-size: 14px}";
		document.head.appendChild(css);
		/*
		.hiddenDiv {
			display:none;
		}
		
		.displayDiv {
			display:block;
		}
		
		.displayTab img, .hiddenTab img{
			height: 48px;width: 48px;
		}
		
		.hudstatlabel {
			color: rgb(116,207,70);
			font-weight: bold;
		}
		
		#MHA_hud, #MHA_traveldiv {
			font-size: 14px;
		}
		
		#mobileCountdown {
			font-size: 14px
		}
		 */
		//create maindiv and hud
		var MHA_main_div = document.createElement('div');
		MHA_global.MHA_objects.MHA_main_div = MHA_main_div;
		MHA_main_div.id = "MHA_main_div";
		MHA_main_div.style.width = "375px";
		MHA_main_div.style.margin = "auto";
		var MHA_hud = document.createElement('div');
		MHA_main_div.appendChild(MHA_hud);
		MHA_hud.id = "MHA_hud";
		MHA_global.MHA_objects.MHA_hud = MHA_hud;
		
		//create maintab
		headerHolder = document.getElementsByClassName('headerHolder')[0];
		fullLink = document.getElementsByClassName('switch')[0].getElementsByTagName('a')[0].href;
		MHA_cleanObject(headerHolder); //headerHolder.innerHTML = "";
		headerHolder.style.width = "375px";
		//setTimeout(function (){headerHolder = document.getElementsByClassName('headerHolder')[0]; alert(headerHolder.style.width + " " + headerHolder.scrollWidth + " " + headerHolder.offsetWidth + " " + headerHolder.clientWidth);},3000);
		
		var MHA_tab = document.createElement('div');
		MHA_tab.id = "MHA_tab";
		MHA_global.MHA_objects.MHA_tab = MHA_tab;
		headerHolder.appendChild(MHA_tab);
		
		//add settingtab
		var MHA_settingdiv = document.createElement('div');
		MHA_settingdiv.id = "MHA_settingdiv";
		MHA_settingdiv.className = "hiddenDiv";
		var MHA_settingtab = document.createElement('div');
		MHA_settingtab.innerHTML = "<img src='data:image/png;base64,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'>";
		MHA_settingtab.className = "hiddenTab";
		MHA_settingtab.style.cssFloat = "right";
		MHA_settingtab.setAttribute('onclick','MHA_global.MHA_callbackFunctions.MHA_mobiletab(0);MHA_global.MHA_loadControlPanel();return;');
		MHA_tab.appendChild(MHA_settingtab);
		MHA_main_div.appendChild(MHA_settingdiv);
		
		//add mobile button
		var MHA_mobilediv = document.createElement('div'); //fake
		MHA_mobilediv.id = "MHA_mobilediv";
		MHA_mobilediv.className = "hiddenDiv";
		var MHA_mobiletab = document.createElement('div');
		MHA_mobiletab.innerHTML = "<img src='data:image/png;base64,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'>";
		MHA_mobiletab.className = "hiddenTab";
		MHA_mobiletab.style.cssFloat = "right";
		MHA_mobiletab.setAttribute('onclick','document.location.href="' + fullLink + '";return;');
		MHA_tab.appendChild(MHA_mobiletab);
		MHA_main_div.appendChild(MHA_mobilediv);
		
		if (MHA_global.MHA_user.user.has_puzzle == true) return;
		//add main_div by using mobile Journal
		var mobileJournal = document.getElementById('mobileJournal');
		mobileJournal.parentNode.insertBefore(MHA_main_div,mobileJournal);
		mobileJournal.parentNode.removeChild(mobileJournal);
		mobileJournal.className = "displayDiv";
		MHA_main_div.appendChild(mobileJournal);
		var MHA_journaltab = document.createElement('div');
		MHA_journaltab.innerHTML = "<img src='data:image/png;base64,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'>";
		MHA_journaltab.className = "displayTab";
		MHA_journaltab.setAttribute('onclick','MHA_global.MHA_callbackFunctions.MHA_mobiletab(2);return;');
		MHA_tab.appendChild(MHA_journaltab);
	}
	function MHA_mobileskin()
	{
		//get main_div and tab and hud
		var MHA_tab = MHA_global.MHA_objects.MHA_tab;
		var MHA_hud = MHA_global.MHA_objects.MHA_hud;
		var MHA_main_div = MHA_global.MHA_objects.MHA_main_div;
		
		//add traptab
		var MHA_trapdiv = document.createElement('div');
		MHA_main_div.appendChild(MHA_trapdiv);
		MHA_global.MHA_objects.MHA_trapdiv = MHA_trapdiv;
		MHA_trapdiv.id = "MHA_trapdiv";
		MHA_trapdiv.className = "hiddenDiv";
		MHA_trapdiv.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
		var MHA_traptab = document.createElement('div');
		MHA_traptab.innerHTML = "<img src='data:image/png;base64,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'>";
		MHA_traptab.className = "hiddenTab";
		MHA_global.MHA_trapLoaded = false;
		MHA_traptab.setAttribute('onclick','MHA_global.MHA_callbackFunctions.MHA_mobiletab(3);MHA_global.MHA_callbackFunctions.MHA_trapcontentLoad();return;');
		MHA_tab.appendChild(MHA_traptab);
		
		//add shoptab
		var MHA_shopdiv = document.createElement('div');
		MHA_global.MHA_objects.MHA_shopdiv = MHA_shopdiv;
		MHA_shopdiv.id = "MHA_shopdiv";
		MHA_shopdiv.className = "hiddenDiv";
		MHA_shopdiv.innerHTML = '<div id="MHA_shopcontentChild"><div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div></div>';
		MHA_global.MHA_objects.MHA_shopcontentChild = MHA_shopdiv.firstChild;
		var MHA_shoptab = document.createElement('div');
		MHA_shoptab.innerHTML = "<img src='data:image/png;base64,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'>";
		MHA_shoptab.className = "hiddenTab";
		MHA_global.MHA_shopLoaded = false;
		MHA_shoptab.setAttribute('onclick','MHA_global.MHA_callbackFunctions.MHA_mobiletab(4);MHA_global.MHA_callbackFunctions.MHA_shopcontentLoad();return;');
		MHA_tab.appendChild(MHA_shoptab);
		MHA_main_div.appendChild(MHA_shopdiv);
		
		//add traveltab
		var MHA_traveldiv = document.createElement('div');
		MHA_traveldiv.id = "MHA_traveldiv";
		MHA_traveldiv.className = "hiddenDiv";
		MHA_traveldiv.innerHTML = '<div id="MHA_travelcontentChild"><div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div></div>';
		MHA_global.MHA_objects.MHA_travelcontentChild = MHA_traveldiv.firstChild;
		var MHA_traveltab = document.createElement('div');
		MHA_traveltab.innerHTML = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAC0dJREFUeNrMWntQXNUZ/+3d3XvvvtmFZZdnQkAIhARIQgiB2MTHqGm0cRrzh44zNUnb0ak1ap1ptdU6nWKijdrBR5vYNONUE3Wqk/hOM4qKEoMmxIQQQx4ESICFZWGXfT9uzzkLCxsI8thqD/PN3bmP73y/3/c437kXGa4wJFuN8uhXn61wu5y3cxxXFQj4F+B7HJxcbpNB1sTzwnsV1dfvlKU+7JnoPtlEJw+9uXpNMBT8cygYKB05FwypIUGDgB+IRMbBvaIhY68oeTWUgjp2gZMrIZPJEAkHIUmjSiVyLRIOwOPsAMcFodFwblGU14Yl7dbVtx8YvCIAynp93XvU8IeiLJAJ1UVQiPPAKdSQK/goGL8boaAXY2eURqySRk2nfzJwEFQGyDg5MZYjBsnjwGkNVvCCZtgUiQGJRMIIBtxwOS6hs/UzDNrbwMlCEOTBU7ygXL/uvsbmCQHUv7HyrWDAv47+FrT54DVLiEoFURhiLI2McCgQY0yGqPEavRWi2sCOY/kfwSMnbIdDfgwNdMPncTCJ4pWYFxRKkRDGs6NamwJtUjpETTLChKiutkacPvoW3E4bHI6hdpXI33x3zbFv4gB89nr1kyPM89picHwhY5kaz3x6mVmUOWv2YmjIMSklZ9oxHgp44eg7h75LzXDYzsLndgz7RGLTUcAaQxqsc5aQudLg6DmNk4170d1+HP121xlRxa++76nmTgbg8zdWlpMkPczChs9EhCsYDgUpLpIFtRFZedVISS8i7BgTmrQO2xlcOn8Yl84dioWiNOw5CwEhkrmpN1q+eh0XzjQTcsO7fvPXU5sYgLpXl9eTkKiCTEBEUR5HOGXbaM5Ddv7VMGcU/8+rj3fIjovnGtDWchAhvycKQqGEzpgNc3oxujuOoP3benScPw+Vmq+Uf/zKshJiZg2LbWQjIokEQJgISRoS0wVltzLR6FO/l/JJK5XJko8sQpjP049BEmZhUpGCviEoyLVIOAQp7EV/XzfxQohXkGdY0kYkJYISqRYIMA/MKbwWeYvWMoU/xKDzllRvRkbuCjR98iI8rl5cPPMpFKRi0WRXa7RwDQ6s4ci9qxj7ES2rErTclV9/PwqXbvjBjB87UtKK8KNbtyIjrwqhkAe+oV74PXaIopISnUIBzGVVISRCR7K9+ubHkWydj/+noSSsL1l9Lxav+hUJIT+x1cvCnFRfKEYAGMwLCPMPs5tnMk4dP4T28yfR19PJjhOt0AXFy5E9rwjZOUUwW7KmPcec+deRdUKFwwe2xgDISBJL2qSrsHTNv6at8MihD4flADxuJxQKDnqdAOXwMbpIS6QNCcPp9JFjBE5XgJ2nIBZX3oCV122YNhiHrRVv79qE3u6eKICk1MUove7FKSv49OBreOuV7eizdcJiVqNwYSUWllVDrVKw650k2QZ6W+OeKa7cFPttd/jwzZF6HD/6Oby+EFZeuwG33vHgtIB0nj2M12vvBDcd5F83fIAH7lqG3bUPwqQdwjVVmVhaYgHn/xZdHS3MSCrX3PYceFGHqI+j8vXnb8Ib4JGzcD0DZ1TZcE11FiqXWHHyyH48sLECO57eAvfQ4JRsycxdFu1ap3IzVbrzmS14fttmGHXE8OpM5OcaoVYrmX1ef4iE0Qf4cN9OXDh3ghlffcsTY+1He/t5vFT7CNrPNaPuP/tJSDnY+WSTCpVL04hY0UKAPLipghE1pSGbAgBq0NbfrWcsXb08AwXEcJ6XxxmXQoxYMD8ZCpkPL2zdzACnZi5G8fKNsXvoc/R5vY5HZXkae+ZyHfR8ToYSLxCiXtnx6BTsl00OgLJFjRe5S0R5OmM8btbLxGrRIDPVj5eevZ89v2D5JgZk5LqSAFcq5ZPqyJlrwNWVGTj08cvM6zP2ADX+L49uQH6OwMJFNty6TiZ0WFM1GOhqwAESTnSsWFtD+n1t3D3fpUetUjJvnDn+LiFjy2T2TwzAQ0Jg+2MbUFKkQVaGbjLC4gXRIw2nd16rIWvDF8R4Hap+/MS4e75LeOKp8jILaerex6s7H7vy1nOik9seWY+cLCUMegFTtz7eOjr5i0/+nJFhzixDUcXG6SEYltKFqfiy7mVWJKYUQvv2bIco75oe88OCMbbRfCmYJ6C2Jlr/i5ZtJPlQGnfPVGXFsnTs2fEQWeU7Jg8hGvf1H76AgjwT2+bNVqwWLQJDJxkpdCy/qWYYwPT00MQvyldjzz8emzyE/v3y4yhdlDpthmKs66zjzhUXpqDu3edi+TATD1BJMgjw2A8zPTEPyMaU0W9PNCDgamEVYCYju+BG0mzdhNxF68ddW7o4DTv+8gvSLw3OqivNmZuEg/trJ/ZA3fu7MC/HMKNQoYbzKgv2732a7Cc0KCy/K+66huRDfq6I55/YPMzozEKSVibJd4p0u82j5Zg2c7Y+H862hVFUkDwjZppb+tBx0cW6TdaJ6nmSeBlkW3gj+rqa4HV1s/tOkPucLj+7NpvhjCzFnXdvR+1DhWw/QBhSICdbO1pKpjkWFJmZXD4MKVcxnR2noyWwmNzjdPpnPE+sm73YEPsdA+Dzc7PVOx5Ach7ZIGnR2Tpaww0GYdZ6k40Sy9mRHVmsMiDBAFLSSxH0D6Ep0cQQEjrONY56INbbJdAFydaS4f2sFknEE4P9ZxMKwtZ5lPEd54FEhhANnxiYtFI4HYkF0NP+FfjYOiDj2JvnmS5gEwk1mo4OUvLo70TqpmI1q0ZbCSWvJ6toWkJn0A97oPXER7DOqUaiEZgsRaPNHC+Sfp/jptTzT0XUWguR6Gt2e09TLCcSpZ+K2yfC6w2NrsQcl7gQ0o+J/yH7cdZCJFsTF0a8aILXE4TXF44CoN8AFLw2Ye6lxsZKqVmN1uZDsGRXJUy/QqlDMOAlXiAAgkFpIELficoS6AFjbgyAKTUfbafroDdFF7VE6Ffr58I5YGMvoTmlUtYUCg5BodCTPFAkZALTGA9Qo4f6T4zmwSx10zfTSSllcPR1kd5LAufzSU3hkAfhkAuCKnXWmxjKdNyuiXaRCgfstg5SOUpmrV9nLILHMwS7fRCiIO/jwiHsZkzJvTCmVsy6PBgtJeMXtSQRLccOki1l1ax001f/mblr0dZ6Am5vGCqBe4db+8vGYyQP2lz9R0m8lpD1IDdh8T92hXfYjkFFSiuVGS9ec34CidOh4ZN9EAQ5aUL57awK+bzYIuf86Dz9LubOv4NkuWHGNBlTSyZ8g9Pb+cVwUpfMSG9K+g0wZ67E+288g65uOywm4dUHnmk5wQDccnfjPo9b2u3q/QiO3gvIW/RraA3502ZISUqxSmsdlwPs1SEtpycbWIhNK2lJYcmYdxtMadV4Z+9T+LL+I6SliAMk/u+J21LaerAlIqHp/LG/oavtCNJyfkoQryGLRirJfHFKCTZR/I+A0Gh4tLd+AnPGiinpkis00CYtxNyie+D167Hn77/Hpx8fgNkkDJgM/KrfPt86GNdO3/WHxsF//ql8lV507m5p2LXuwukCZOVVECUrEArYSAJJCAed44wLh93sawkdRnPZuOvUEIVSH/0w4TjDvGSyVMDtujj+FQknsPBVCqnkOSP67XYceHsvvjnSQGzwITdL2yby3Dpi/LFJ/9lj77bS+7psgT8Gg+EktdYAlUpDJhZIeOjJih2/oxJETVzbLIjxH8A9ri4M9J1ivwcHXCgsu4Xsk48i4BuIthqkJRBELfwBCYEgR9oON9k79KDr4gUMOOwQlBII4zDqhd3JKbotlOjv/G8VOog3DD5fYF0gEPpZKBRZFQqG2eeiqQ7+Ct/aAn736OZ8KAhfIDKBJwAdCTlByTUJoqJOoZA/e++24xcm0vdfAQYAuBgsIC+Fko0AAAAASUVORK5CYII='>";
		MHA_traveltab.className = "hiddenTab";
		MHA_traveltab.setAttribute('onclick','MHA_global.MHA_callbackFunctions.MHA_mobiletab(5);MHA_global.MHA_callbackFunctions.MHA_travelcontentLoad();return;');
		MHA_tab.appendChild(MHA_traveltab);
		MHA_main_div.appendChild(MHA_traveldiv);
	}
	function MHA_mobileSimpleSkin() {
		//get main_div and tab and hud
		var MHA_tab = MHA_global.MHA_objects.MHA_tab;
		var MHA_hud = MHA_global.MHA_objects.MHA_hud;
		var MHA_main_div = MHA_global.MHA_objects.MHA_main_div;
		
		//=================add hud=====================
		//gold point
		var userObj = MHA_global.MHA_user.user;
		MHA_hud.innerHTML += "<span class='hudstatlabel'>Gold:</span> " + userObj.gold + " - <span class='hudstatlabel'>Points:</span> " + userObj.points + "<br>";
		//timer
		var locationTimerObject,states,hour,min,timetmp;
		var currentTime = Math.floor(new Date().getTime() / 1000);
		for (var i = 0;i < MHA_C_LOCATION_TIMES.length;++i)
		{
			timetmp = (currentTime - MHA_C_LOCATION_TIMES[i].base) % MHA_C_LOCATION_TIMES[i].totaltime;
			for (j = 0;j < MHA_C_LOCATION_TIMES[i].length.length;++j)
			{
				timetmp -= MHA_C_LOCATION_TIMES[i].length[j];
				if (timetmp < 0) break;
				else if (timetmp == 0)
				{
					j = (j + 1) % MHA_C_LOCATION_TIMES[i].length.length;
					timetmp = -MHA_C_LOCATION_TIMES[i].length[j];
					break;
				}
			}
			timetmp = -timetmp;
			hour = Math.floor(timetmp / 3600);
			min = Math.floor((timetmp % 3600) / 60);
			
			MHA_hud.innerHTML += "<span style='color: " + MHA_C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + MHA_C_LOCATION_TIMES[i].shortstate[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min) + " ";
		}
		MHA_hud.innerHTML += "<br>";
		
		//add tour
		if(userObj.viewing_atts.hasOwnProperty('tournament')){
			var secleft,minleft,hourleft;
			var timeleft = userObj.viewing_atts.tournament.seconds_remaining;
			var huntsleft = Math.floor((timeleft - userObj.next_activeturn_seconds)/900)+1;
			hourleft = Math.floor(timeleft / 3600);
			minleft = Math.floor(timeleft / 60) % 60;
			secleft = timeleft % 60;
			var textTime = hourleft +":"+(minleft < 10 ? '0'+minleft : minleft)+":"+(secleft < 10 ? '0'+secleft : secleft);
			MHA_hud.innerHTML += "<a href=\"tournament.php?tid=" + userObj.viewing_atts.tournament.tournament_id + "\" data-ajax=\"false\" target=\"_blank\" style='font-weight: bold;'>Tournament</a>" + " : " + userObj.viewing_atts.tournament.status[0].toUpperCase() + userObj.viewing_atts.tournament.status.slice(1) + " - " + textTime + " <span class='hudstatlabel'>Rank:</span> " + userObj.viewing_atts.tournament.rank + " <span class='hudstatlabel'>Score:</span> " + userObj.viewing_atts.tournament.score + "<br>";
			MHA_hud.innerHTML += '<a href=\"team.php\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Team</a> online:' + userObj.viewing_atts.tournament.team_members_online + ' <a href=\"team.php?tab=2\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Journals</a>' + " - Hunts left: " + huntsleft + ' <a href=\"team.php?invite=true\" data-ajax=\"false\" target=\"_blank\"  style="font-weight: bold;">Invite</a><br>'; 
		}
		//SG: Amplifier
		if (userObj.environment_id == 31){
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Amplifier:</span> " + userObj.viewing_atts.zzt_amplifier + "<br>";
		}
		
		//ZT: piece
		if (userObj.environment_id == 32){
			var piece = ['None','Pawn1','Pawn2','Pawn3','Pawn4','Pawn5','Pawn6','Pawn7','Pawn8','Kight1','Kight2','Bishop1','Bishop2','Rook1','Rook2','Queen','King']; 
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Amplifier: </span>" + userObj.viewing_atts.zzt_amplifier + " - <span class='hudstatlabel'>Tech:</span> " + piece[userObj.viewing_atts.zzt_tech_progress] + " - <span class='hudstatlabel'>Mystic:</span> " + piece[userObj.viewing_atts.zzt_mage_progress] + "<br>";
		}
		
		//Iceberg: Phase, ft
		if (userObj.environment_id == 40){
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Phase:</span> " + userObj.quests.QuestIceberg.current_phase + " - " + userObj.quests.QuestIceberg.user_progress + " ft - " + userObj.quests.QuestIceberg.turns_taken + " hunts<br>";
		}
		
		//FW
		if (userObj.environment_id == 33){
			var fwObj = userObj.viewing_atts.desert_warpath;
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Victories:</span> " + fwObj.victories + " - <span class='hudstatlabel'>Friends:</span> " + fwObj.friends_in_area + " - <span class='hudstatlabel'>Wave " + fwObj.wave + ":</span><br>";
			
			for (var wp in fwObj.wave_population)
			MHA_hud.innerHTML += "<p style=\"text-align:right;\">" + fwObj.wave_population[wp].name + " - <b style=\"color:blue;\">" + fwObj.wave_population[wp].population + "</b> [" + fwObj.wave_population[wp].status + "]<br>";
			
			for (var wp in fwObj.common_population)
			MHA_hud.innerHTML += fwObj.common_population[wp].name + " [" + fwObj.common_population[wp].status + "]<br>";
			
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Streak:</span> - " + fwObj.streak.mouse_type + " - <b style=\"color:green;\">" + fwObj.streak.quantity + "</b><br>";
			
			//if ( userObj.viewing_atts.desert_warpath.streak.quantity > 5) soundalert();
			
			MHA_hud.innerHTML += JSON.stringify(userObj.viewing_atts.desert_warpath.streak,null,'\t') ;
			
			//if (userObj.viewing_atts.desert_warpath.wave == 1) soundalert();
		}
		
		//LG
		if ((userObj.environment_id == 35)||(userObj.environment_id == 41)||(userObj.environment_id == 42)){
			for (var key in userObj.quests){
				if (userObj.quests[key].hasOwnProperty('essences')) {
					MHA_hud.innerHTML += '<em style=\"font-size:1.1em;color:limegreen;\" >Petals : ' + userObj.quests[key].loot_drops.dewthief_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.dreamfluff_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.duskshade_petal_crafting_item.quantity + ']-' + userObj.quests[key].loot_drops.graveblossom_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.plumepearl_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.lunaria_petal_crafting_item.quantity + ']</em><br>';
					i=8;
					while (userObj.quests[key].essences[i].quantity==0) i--;
					var sum=0;
					for (var j=0; j<9; j++){// j<=i
						if (j<=i) MHA_hud.innerHTML += '<em style=\"color:dodgerblue;\" >['+String.fromCharCode(j+65) + ':'+userObj.quests[key].essences[j].quantity + ']&emsp;</em>';
						if (j<7) sum = sum/3 + userObj.quests[key].essences[j].quantity;//Gur
					}
					MHA_hud.innerHTML += '<br>= ' + sum + '&emsp;<em style=\"color:dodgerblue;\" >' +  userObj.quests[key].essences[6].name + '<br></em>';//Gur
					MHA_hud.innerHTML += '<em style=\"font-size:0.8em;color:grey;\">' + JSON.stringify(userObj.quests[key].minigame ,null,'\t') + '</em><br>';
				} 
				break;
			}
			
			//minigamealert
			if (alerttext == 'minialert'){
				//Living Garden
				if (userObj.environment_id == 35){
					var smallObj = userObj.quests.QuestLivingGarden;
					if (smallObj.is_normal){
						if (smallObj.minigame.bucket_state == "filling"){
							if (smallObj.minigame.estimate == 35){
								MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
								soundalert();
								}else{// <35
								if (userObj.trinket_item_id != 1020){//sponge id
									MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****20 charms only****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
									soundalert();
								}
							}
						}
						}else{
						if (smallObj.minigame.vials_state == "filling"){
							if (smallObj.minigame.estimate == 35){
								MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
								soundalert();
								}else{// <35
								if ((userObj.trinket_item_id != 1017) && (userObj.trinket_item_id != 1022)){
									MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****10 charms each****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
									soundalert();
								}
							}
						}
					}
				}
				//Lost City
				if (userObj.environment_id == 41){
					var smallObj = userObj.quests.QuestLostCity;
					if (smallObj.is_normal){
						if (smallObj.minigame.curses[0].active && !smallObj.minigame.curses[0].charm.equipped){
							MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							soundalert();
						}
						}else{
						if (smallObj.minigame.is_cursed && !((smallObj.minigame.curses[0].active && smallObj.minigame.curses[0].charm.equipped) || (smallObj.minigame.curses[1].active && smallObj.minigame.curses[1].charm.equipped) || (smallObj.minigame.curses[2].active && smallObj.minigame.curses[2].charm.equipped) )){
							MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							soundalert();
						}
					}
				}
				//Sand Dunes
				if (userObj.environment_id == 42){
					var smallObj = userObj.quests.QuestSandDunes;
					if (smallObj.is_normal){
						if (smallObj.minigame.has_stampede && (userObj.trinket_item_id != 1016)){
							MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							soundalert();
						}
						}else{
						var salt = window.localStorage.getItem("KGSalt");
						if (salt == undefined || salt == null){
							window.localStorage.setItem("KGSalt", 20);
							salt = 20;
						}
						MHA_hud.innerHTML += 'min Salt to alert : <input type="number" id="SaltInput" name="Salt" value="' + salt.toString() + '"/>';
						MHA_hud.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" value="Save" onclick="window.localStorage.setItem(\'KGSalt\', document.getElementById(\'SaltInput\').value);window.location.href=\'/\';"/><br>';
						MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
						/*if (smallObj.minigame.salt_charms_used >= salt){
							if (userObj.trinket_item_id != 1015) soundalert();
							}
							if (smallObj.minigame.salt_charms_used == 0){
							if (userObj.trinket_item_id == 1015) soundalert();
						}*/
						if ((smallObj.minigame.salt_charms_used >= salt)&&(userObj.trinket_item_id != 1015)) soundalert();
						if ((smallObj.minigame.salt_charms_used == 0)&&(userObj.trinket_item_id == 1015)) soundalert();
					}
				}
				
				}else{
				MHA_hud.innerHTML += '<br> ****alert deactivated**** <br><br>';
			}
			
		}
	}
	function MHA_trapcontentLoad() {
		if (MHA_global.MHA_trapLoaded == true) return;
		
		var MHA_traptarget = new XMLHttpRequest();
		var MHA_trapdiv = MHA_global.MHA_objects.MHA_trapdiv;
		
		var cssArr = ["css/pages/en/CampPage.css",
		"platform/css/classes/en/default.css"];
		var jsArr = ["js/utils/en/TrapControl.js",
		"js/views/en/TrapControlView.js",
		"platform/js/classes/en/jsDialog.js"];
		
		var css,js;
		
		for (i = 0;i < cssArr.length;++i)
		{
			css = document.createElement('link');
			css.rel = 'stylesheet';
			css.href = cssArr[i];
			if (MHA_global.MHA_trapLoaded == true) return;
			
			document.head.appendChild(css);
		}
		for (i = 0;i < jsArr.length;++i)
		{
			js = document.createElement('script');
			js.type = 'text/javascript';
			js.src = jsArr[i];
			document.head.appendChild(js);
		}
		
		MHA_traptarget.open("GET", "/?switch_to=standard", true);
		MHA_traptarget.onreadystatechange = function()
		{
			if (MHA_traptarget.readyState === 4)
			{
				if (MHA_traptarget.status == 200)
				{
					var HTMLText = MHA_traptarget.responseText.substring(MHA_traptarget.responseText.indexOf('<div id="trapSpecialBar">'),MHA_traptarget.responseText.indexOf('<a name="huntingTips">'));
					var HTMLdiv = document.createElement('div');
					HTMLdiv.innerHTML = HTMLText;
					MHA_cleanObject(MHA_trapdiv);
					MHA_trapdiv.appendChild(HTMLdiv);
					
					js=document.createElement('script');
					js.type='text/javascript';
					js.innerHTML="userTrapSelector = new trapSelector(); " + MHA_traptarget.responseText.substring(MHA_traptarget.responseText.indexOf("userTrapSelector.populate"),MHA_traptarget.responseText.indexOf("HuntersHorn.init"));
					document.head.appendChild(js);
					
					var exdate=new Date();
					exdate.setDate(exdate.getDate() + 2000);
					document.cookie = "switch_to=mobile; expires=" + exdate.toUTCString();
					
				}
				else 
				{
					MHA_cleanObject(MHA_trapdiv);
					MHA_trapdiv.innerHTML = "Cannot load the page, please refresh";
				}
			}
		};
		MHA_traptarget.send(null);
	}
	function MHA_shopcontentLoad() {
		if (MHA_global.MHA_shopLoaded == false)
		{
			var cssArr = ["css/views/en/ItemPurchaseView.css"];
			var jsArr = ["js/views/en/ItemPurchaseView.js"];
			
			var css,js;
			
			for (i = 0;i < cssArr.length;++i)
			{
				css = document.createElement('link');
				css.rel = 'stylesheet';
				css.href = cssArr[i];
				if (MHA_global.MHA_trapLoaded == true) return;
				
				document.head.appendChild(css);
			}
			for (i = 0;i < jsArr.length;++i)
			{
				js = document.createElement('script');
				js.type = 'text/javascript';
				js.src = jsArr[i];
				document.head.appendChild(js);
			}
			
			css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = ".itempurchase .purchasecontrol {width: 200px;}";
			document.head.appendChild(css);
		}
		var MHA_shoptarget = new XMLHttpRequest();
		var MHA_shopdiv = MHA_global.MHA_objects.MHA_shopcontentChild;
		MHA_shoptarget.open("GET", "shops.php", true);
		MHA_shoptarget.onreadystatechange = function()
		{
			if (MHA_shoptarget.readyState === 4)
			{
				if (MHA_shoptarget.status == 200)
				{
					var HTMLText = MHA_shoptarget.responseText.substring(MHA_shoptarget.responseText.indexOf("<div class='pagetabbartop'>"),MHA_shoptarget.responseText.indexOf("</div></div><a href='#' name='hudbottom'></a>"));
					HTMLText += MHA_shoptarget.responseText.substring(MHA_shoptarget.responseText.indexOf("<div class='contentcontainer'>"),MHA_shoptarget.responseText.indexOf("<div class='footer'>"));
					
					js=document.createElement('script');
					js.type='text/javascript';
					js.innerHTML=MHA_shoptarget.responseText.substring(MHA_shoptarget.responseText.indexOf("app.views.ItemPurchaseView"),MHA_shoptarget.responseText.indexOf("user = {"));
					document.getElementsByTagName("head")[0].appendChild(js);
					
					HTMLText = HTMLText.replace(/app.views.TabBarView.page.show/g,'MHA_global.MHA_callbackFunctions.MHA_SimulateTabBar');
					HTMLText = HTMLText.replace(/tabbarContent_page/g,'MHA_tabbarContents_page');
					HTMLText = HTMLText.replace(/tabbarControls_page/g,'MHA_tabbarControls_page');
					
					var HTMLdiv = document.createElement('div');
					HTMLdiv.innerHTML = HTMLText;
					
					var tmp = HTMLdiv.getElementsByClassName('deets');while(tmp.length > 0) MHA_removeObject(tmp[0],null);
					tmp = HTMLdiv.getElementsByClassName('flexibleDialog');while(tmp.length > 0) MHA_removeObject(tmp[0],null);
					tmp = HTMLdiv.getElementsByClassName('subtabheading');while(tmp.length > 0) MHA_removeObject(tmp[0],null);
					tmp = HTMLdiv.getElementsByClassName('tradable');while(tmp.length > 0) MHA_removeObject(tmp[0],null);
					tmp = HTMLdiv.getElementsByClassName('anchorLink');while(tmp.length > 0) MHA_removeObject(tmp[0],null);
					tmp = HTMLdiv.getElementsByClassName('journalContainer');while(tmp.length > 0) MHA_removeObject(tmp[0],null);
					tmp = HTMLdiv.getElementsByClassName('control');tmp[tmp.length - 1].parentNode.style.display = "inline-block";
					
					MHA_cleanObject(MHA_shopdiv); //MHA_shopdiv.innerHTML = "";
					MHA_shopdiv.appendChild(HTMLdiv);
				}
				else
				{
					MHA_cleanObject(MHA_shopdiv);
					MHA_shopdiv.innerHTML = "Cannot load the page, please refresh";
				}
			}
		};
		MHA_shoptarget.send(null);
		return false;
	}
	
	function MHA_SimulateTabBar(x)
	{
		var MHA_main_div = document.getElementById('MHA_tabbarContents_page');
		var MHA_main_tab = document.getElementById('MHA_tabbarControls_page').getElementsByTagName('li');
		
		for (i = 0;i < MHA_main_div.childElementCount;++i) MHA_main_div.childNodes[i].className = "inactive";
		for (i = 0;i < MHA_main_tab.length;++i) MHA_main_tab[i].className = "inactive";
		MHA_main_div.childNodes[x].className = "active";
		MHA_main_tab[x].className = "active";
	}
	function MHA_mobiletab(x)
	{
		var MHA_main_div = MHA_global.MHA_objects.MHA_main_div;
		var MHA_main_tab = MHA_global.MHA_objects.MHA_tab;
		
		for (i = 1;i < MHA_main_div.childElementCount;++i) MHA_main_div.childNodes[i].className = "hiddenDiv";
		for (i = 0;i < MHA_main_tab.childElementCount;++i) MHA_main_tab.childNodes[i].className = "hiddenTab";
		MHA_main_div.childNodes[x + 1].className = "displayDiv";
		MHA_main_tab.childNodes[x].className = "displayTab";
	}

	//simple SKIN AREA
	function MHA_simpleSkin()
	{
		//=======================add things============================
		//add mobile button
		var hgRow = document.getElementById('hgRow');
		var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
		var mobile = document.getElementById('MHA_appControlPanel').cloneNode(true);
		mobile.id = "MHA_appMobile";
		mobile.className = "hgMenu";
		mobile.removeAttribute('onclick');
		mobile.firstChild.firstChild.href = document.getElementsByClassName('switch')[0].firstChild.href;
		mobile.firstChild.firstChild.firstChild.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACgRJREFUeNpMl21wVOd1x3/PvXff36SVtFppkRZJIFsWIEA2NjYOpswE2qSZtJ2hpp1xGnc6jd3EsePEmbTTWK2nk8kH52XaTuw4tqcel3Y6tT/Uqd1SKI2NgSIMRiAQICSklXal1e5Ku9q9d+/r0w/glDPzfDrP/P9zPpxzfkdIKe8DfIDL/4e483KO4+jLS0s7auvrD1Wr1QfzhfwuTfN1BANBLMvEMPR6V1f3eEtLy+lINDKe7kyfCYVCKtALKIB3l64K2EJKOQIEAOeuRB2YyeVyu9fW1r7mCeXLba0tgQ3d3SDE7V+OB5rya7VCvkBppYzE+yDRkvhZJpM5rmlaGmi/S1sDTCGl3AL47yR8wGKj0ajn8/nnAn7/WG82qwCs5tY4/+E4M7lpLs1cpaKvEfaF2dp3L309m9i5eyfd93YDsLCwQKPReC2VSv1Fa2urBWwC7Dum1t2mApgrlUqBYrH4+sa+7IFwKML85XneevU1joy/w9XmVcgAaSAG6EAeKECH0smhrX/Anz75Vbbu2QrA1LWpC4l44smurq5p4B5A3m0aAnKlSoWFhYWjI1uGtwpF5ciPjvDtV75NIVUg9DtBRh++n6HOzWTDGdpC3ZiOS97IM1mc5PQnJ6m8W8F3LcQPvvwSz//o+TvGV8vJRMdjqXR77o6xLqSUWwFpGMb0jenpX94zNLg/oAX48Xd+wrf+4Tl4Gu7/0gM8lH2EIeUeIl6YuBpDVQLYtk7JXaGu6dRkjdPF0xw7ehz5Y4+nd32Tv/+nn4AKFy9PTPX39j0Si8dagYg6NjbWBVybm5t/rr0t+SfxWIKf/uXf8tzbz8LfwMFDB3g4sgutHqbp6jiKw6pZIe2kGI7eS79vI7iST4pnSAfTbNjWy63tc5z+l48onVzit373i0Ti4faF3OKG1taWtxRFaVfHxsaUSqXSU63W3ty4cWPg3155jz96+QkYg737foNuvZeaY6BpDkFNZU3qPBzcxe74bi6Vp5gpLbHZGmVHeoi3S28hdR/tmTj5+/L87+vjJBZb2PuFvaxVV7fZln02FotNKMBysbjyza6udHxm8hYv/t334DC07mmlxUlQ89ZwNQNLM1kT67TaCR4IPsh7jfcpe2vE/EH+cfEIycI9PNX9FJPmBPVak0RfBJ6BH77zA8785zn6B/pZrVS+63leU9F1va9aW/39aCTKP796hE8Tk/BF0MsN5tZvovlVtKBGjjwn+YgNbg8fLp9mrjDHgeABBq1RvjT8GO+WjjDobkfRIG8WqK3rsAuWtxd5+43Xceo2tUZjT2ml9KhWLBb32o4Vm7lyg/++cBz2AS1g1jw+FRMsxW6Rctt4XP1jhjr7GFkfxPI8sqE9SE0n25biuPkGjbiD1MoUlTl0D3AFRIDPw/HXjnPuf8YJ9CZYr9X2aE29eV+YCOMfneNi8wKM3p5PSocDCizJGkunk5za/S3sBT/vTZ7Ei/oJrmu0DdfJ+eK8dPkav9r7dV6bOYpeU1FaXAQSzwU5BFPBG1wYv8jBTV+gVCqMakvLS8MRLcL8zTlWO1dR06DlOpDlPuT6ZjzrEdpWwjR35Hl8ssqxCRNSKlRWecZo8PQejZ+n/oqjU4IfvtcDwVdQYqcgNIuWvInsyuEMwvziApZRp1gqD2mFpUIm25ul1lxBVmOIf9+LUngQy+vCjXZDKoobmEf3alipDGxtpzeuMe+YxAMlOqTHU5evcqKqQWsGUW3i3EihVutIsYBIjyNWTzBrT7JWX8NynKBWr9fV4nKe+aV5vJlN0PYQzaQfWtchUoSgRDVdfJ8N+maTvA+oK8S7NBZirZxQkhB1UYwyBNaR0QaeUoaaRE49AlNF8rF5Zm/l8ISFphuGm5tbRdM0CCoQXgFfOxIfSBMcF911MLQAf572+E3FJhrSMBoGv92ZxBL+20vRc/GkhpAKQtgonoqHiQgXkCqEgi2UV5dwJVLJZDbcdF2FSCyEYlXBdZHSA9dCuBKkiSsdPCVCtJbnflHlfq3B5/xNVvUSDcMAow6OCbKB9EyEA55nIXGQjgtGia7udgIhPwqaoaRTnVOWA5nMBjoEoK8DEtW2kE4TbBPNsfB7LrMGTDYEs3WFy2aQoq7gWA1orKEZFophgW0hbQPhWAghwWyi2g1SHQmalku2t/eSku7qnHClTU/fJrKdEchdB9sF10HYJhgmqqNSbVYJ63VSPj8xTyLMCmEs6hULTBfXqiFMC9G0wLEQjn170a8s0Bvx0z8wTKOm05PtOacMDAx8lE6ny/Fkkl3bd8DsTVhbxsVDNJvQbGJbJhtTnYSjCWzVQ4R9xIMhWlsSbO7tBtNAGnVc00CaTTANPE8gG1W4+ikPDt5Lz8AA0WiEvr6+DxUhxOLIyMgRhODQ4T9kdGMKLp6DuonnuWBWcao5ZtdWibeESUb9xMI+4rEwqieZrxShvgp6E/QGmHWEaYNlw42L9AQdDh1+HF8gwMjIyLFkMnlGSCl7dF33nz179uzojgeSHx//JU/82TOspLfAtocgGEB1PSI+2NDZhlD9eFKiKRoSg6mqxPV8YDdQ7CbSdvFcG2avoJ7/Fa+OfZfDX/sGH5/6mNGdO/clk8mLQkq5Hbi+mF88VF4pv7ltZBv/+vYbPPn8d1jfsB2GtiNiUaQOKBJ8AVDEbX7TJHgeqgTXtVA9iWuYMH8ZZfIMLz/7PM9+/3vcuDmNdL2XBwcHXwC2qmNjY+1AKh6L/8f09I1N8/ML2z63/wCZRJTxD96lXlyBYAT8AfAJhLRQPA/hOgjbRUoT6TWhaSFra3D9AuGbE3z/6a/w9Rde4Nr1afKLC6dGRka+qqrqAKAIKeUWKWVQCLGyvr5ee/+D999Bsm/0gV2cPvo+P3vzDc7MLiNTvbBhAMLR29WignRBWrf7dHEe8jMMpWJ84/BXOHjo97hy/Rql0sqpgwcOPtHZ2VkD+j5jpC2e5/kty0JRlPPlcvnFY8f+a2xpucCW4VHMeoWTJ07wyeVLXM8XKDsqpt8HQkF4LprjkBSCgc4kI0Ob2PvYY6Szm5m4dAW/T7B///4Xs9nsX9u2vTMQCKCqqvVZpX7DMBxd168Cv2g0Gk+cOvUxE5cmCQSC9PdlcZo6C7MzLBWWMUwTT3qoioJf0+hIdZLt7yecSJDLFyhXygwObOLRRx+lo6Pjhuu6+8LhcDwUCoUURbG0O0SvCSFQVVVrNBol27bZuXOUWCzG+fPnOXv2LK7rEo8nSPf34/f5EEIgJdiOjWE0uXDlKkhJW1sbo9t3sGV4GFVVqdfrc9FotKooSscd2Ha1O+SNpmmupmmdgUDgF47j7G02m4Pd3RlisTi3bt1ibm6OSqVCuVxC1/VfnxOhUIhYLEZ7WxuZTIaBgQFaW1txPQ9FUZYCgcBLmqaFVFV1hBASsP9vAGBo5K7JH89qAAAAAElFTkSuQmCC";
		hgRow.appendChild(mobile);
		hgRow.appendChild(separator_left.cloneNode(true));
		
		//add hud
		var MHA_hud = document.createElement('div');
		MHA_hud.id = "MHA_hud";
		MHA_global.MHA_objects.MHA_hud = MHA_hud;
		var tmp = document.getElementById('tabbarContent_page');
		tmp.parentNode.insertBefore(MHA_hud,tmp);
		
		//add journal
		var cleanup;
		var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
		if (tabbar.length > 0)
		{
			cleanup = 1;
			tabbar = tabbar[0].firstChild;
			var journalbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
			journalbar.className = "inactive";

			var journalbarChild = journalbar.firstChild.firstChild;
			var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
			journalbarChild.setAttribute('onclick',journalbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
			journalbarChild = journalbarChild.childNodes[1];
			journalbarChild.id = "MHA_journalCampTab";
			journalbarChild.textContent = "Journal";
			tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(journalbar);
			
			var journalcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
			var campRight = document.getElementsByClassName('campRight')[0];
			if (campRight != null)
			{
				campRight.parentNode.removeChild(campRight);
				journalcontent.appendChild(campRight);
				journalcontent.style.width = "375px";
			}
			journalcontent.id = journalcontent.id.substring(0,journalcontent.id.length - 1) + numOfTabbar;
			var journalcontentChild = journalcontent.lastChild;
			journalcontentChild.id = "MHA_campjournal";
			tabbar.getElementsByClassName('tabbody')[0].appendChild(journalcontent);
			
			//add travel
			MHA_travelToTabBar();
			
			//add shop tab
			MHA_shopToTabBar();
			
			//remove them
			tmp = tabbar.getElementsByClassName('tabbody')[0];
			MHA_removeObject(tmp.firstChild.nextSibling,tmp);
			MHA_removeObject(tmp.firstChild.nextSibling,tmp);
			tmp = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive'); //delete 0 1
			MHA_removeObject(tmp[0],null);
			MHA_removeObject(tmp[0],null);
			tmp = document.getElementById('MHA_journalCampTab').parentNode;
			tmp.setAttribute('onclick',tmp.getAttribute('onclick').replace("show(3)","show(1)"));
			tmp = document.getElementById('MHA_campjournal').parentNode;
			tmp.id = tmp.id.substring(0,tmp.id.length - 1) + "1";
			tmp = document.getElementById('MHA_travelCampTab').parentNode;
			tmp.setAttribute('onclick',tmp.getAttribute('onclick').replace("show(4)","show(2)"));
			tmp = MHA_global.MHA_objects.MHA_campTravel.parentNode;
			tmp.id = tmp.id.substring(0,tmp.id.length - 1) + "2";
			tmp = document.getElementById('MHA_shopCampTab').parentNode;
			tmp.setAttribute('onclick',tmp.getAttribute('onclick').replace("show(5)","show(3)"));
			tmp = document.getElementById('MHA_shopcontentChild').parentNode;
			tmp.id = tmp.id.substring(0,tmp.id.length - 1) + "3";
		}
		
		//clean up king reward
		var tmp2;
		tmp2 = document.getElementsByClassName('puzzle');
		if (tmp2.length > 0)
		{
			tmp2 = tmp2[0];
			cleanup = 1;
			tmp = document.getElementsByClassName('puzzleImageContainer')[0].nextSibling;
			MHA_removeObject(tmp.firstChild,tmp);
			MHA_removeObject(tmp.firstChild,tmp);
			tmp.insertBefore(tmp2,tmp.firstChild);
			tmp2 = document.createElement("div");
			tmp2.id = "pagemessage";
			tmp.insertBefore(tmp2,tmp.firstChild);
			tmp = document.getElementsByClassName('puzzleImageContainer')[0];
			MHA_removeObject(tmp,null);
		}
		tmp = document.getElementById('pagemessage');
		if (tmp != null) tmp.style.width = "375px";
		
		//cleanup heading
		tmp = document.getElementById('hgbar');
		MHA_removeObject(document.getElementById('appRow'),tmp);
		MHA_removeObject(document.getElementById('newsRowHolder'),tmp);
		
		if (cleanup == 1)
		{
			//cleanup hud
			tmp = document.getElementsByClassName('gameinfo')[0];if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementsByClassName('gamelogo')[0];if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementsByClassName('donatebuttonarea')[0];if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementsByClassName('campbutton')[0];if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementsByClassName('dropdownmenu')[0];if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementsByClassName('marblesplash')[0];if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementsByClassName('switch')[0];if(tmp != null) {tmp=tmp.parentNode;MHA_removeObject(tmp,null);}
			tmp = document.getElementById('trapSpecialBar');if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementById('questBar');if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementById('huntingTips');if(tmp != null) MHA_removeObject(tmp,null);
			tmp = document.getElementById('journalContainer');if(tmp != null) MHA_removeObject(tmp.nextSibling,null);
			tmp = document.getElementById('overlayContainer');if(tmp != null) 
			for (i=0;i < 3;)
			{
				if ((tmp.lastChild.tagName != null) && (tmp.lastChild.tagName.toUpperCase() == "A")) ++i;
				MHA_removeObject(tmp.lastChild,tmp);
			}
			
			//==========================cleanup things=================
			tmp = document.getElementById('hgSideBar');
			if (tmp != null)
			{
				tmp.style.margin = "auto";
				tmp.style.display = "inline-block";
				tmp2 = 170;
			}
			else tmp2 = 0;
			tmp = document.getElementById('hgAppContainer');
			tmp.style.width = "375px";
			tmp.parentNode.style.width = (tmp2 + 375) + "px";
			document.getElementsByClassName('container')[0].style.width = "inherit";
			document.getElementsByClassName('headertop')[0].style.height = "auto";
			var headercontrol = document.getElementsByClassName('headercontrols')[0];
			headercontrol.style.width = "inherit";
			headercontrol.style.cssFloat = "none";
			headercontrol.style.height = "auto";
			headercontrol.style.backgroundColor = "white";
			document.getElementById('huntTimer').style.margin = "auto";
		}
		
		//cleanup hgRow
		var rightbanner = hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
		MHA_cleanObject(rightbanner); //rightbanner.innerHTML = "";
		rightbanner.setAttribute('class','rightEdge');
		
		MHA_removeObject(document.getElementById('appLogo'),hgRow);
		MHA_removeObject(document.getElementById('communityMenu'),hgRow); 
		MHA_removeObject(document.getElementById('supportMenu'),hgRow);
		var userGreeting = document.getElementById('userGreeting');
		MHA_removeObject(userGreeting.nextSibling,hgRow); 
		MHA_removeObject(userGreeting,hgRow); 
		
		separator_right = hgRow.getElementsByClassName('hgSeparator right');
		for (i = 1;i < separator_right.length;++i)
			MHA_removeObject(separator_right[i],hgRow); 
		
		//cleanup journal
		tmpArr = document.getElementsByClassName('journalimage');
		for (i = 0;i < tmpArr.length;++i)
		{
			tmp = tmpArr[i].getElementsByTagName('img')[0];
			if (tmp != null)
			{
				MHA_removeObject(tmpArr[i].firstChild,tmpArr[i]);
				tmpArr[i].appendChild(tmp);
			}
		}
		
		//detailed timer
		MHA_huntTimer = document.getElementById('huntTimer').cloneNode(true);
		document.getElementById('hornArea').appendChild(MHA_huntTimer);
		document.getElementById('huntTimer').style.display = "none";
		MHA_huntTimer.id = "MHA_huntTimerParent";
		MHA_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt:</span> <span id='MHA_huntTimer'></span>";
		MHA_huntTimer = document.getElementById('MHA_huntTimer');
		var hornbutton = document.getElementsByClassName('hornbutton')[0].firstChild;
		hornbutton.setAttribute("onclick",hornbutton.getAttribute("onclick").replace("return false;","MHA_global.MHA_callbackFunctions.MHA_sound(); return false;"));
		
		//start the timers
		MHA_secondTimerTasks();
	}
	function MHA_updateSimpleHud()
	{
		var MHA_hud = MHA_global.MHA_objects.MHA_hud;
		MHA_cleanObject(MHA_hud); //MHA_hud.innerHTML = "";
		
		//=================add hud=====================
		//gold point
		var userObj = MHA_global.MHA_user.user;
		MHA_hud.innerHTML += "<span class='hudstatlabel'>Gold:</span> " + userObj.gold + " ";
		//timer
		var locationTimerObject,states,hour,min,timetmp;
		var currentTime = Math.floor(new Date().getTime() / 1000);
		for (var i = 0;i < MHA_C_LOCATION_TIMES.length;++i)
		{
			timetmp = (currentTime - MHA_C_LOCATION_TIMES[i].base) % MHA_C_LOCATION_TIMES[i].totaltime;
			for (j = 0;j < MHA_C_LOCATION_TIMES[i].length.length;++j)
			{
				timetmp -= MHA_C_LOCATION_TIMES[i].length[j];
				if (timetmp < 0) break;
				else if (timetmp == 0)
				{
					j = (j + 1) % MHA_C_LOCATION_TIMES[i].length.length;
					timetmp = -MHA_C_LOCATION_TIMES[i].length[j];
					break;
				}
			}
			timetmp = -timetmp;
			hour = Math.floor(timetmp / 3600);
			min = Math.floor((timetmp % 3600) / 60);
			
			MHA_hud.innerHTML += "<span style='color: " + MHA_C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + MHA_C_LOCATION_TIMES[i].shortstate[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min) + " ";
		}
		MHA_hud.innerHTML += "<br>";
		
		//add tour
		if(userObj.viewing_atts.hasOwnProperty('tournament')){
			var secleft,minleft,hourleft;
			var timeleft = userObj.viewing_atts.tournament.seconds_remaining;
			var huntsleft = Math.floor((timeleft - userObj.next_activeturn_seconds)/900)+1;
			hourleft = Math.floor(timeleft / 3600);
			minleft = Math.floor(timeleft / 60) % 60;
			secleft = timeleft % 60;
			var textTime = hourleft +":"+(minleft < 10 ? '0'+minleft : minleft)+":"+(secleft < 10 ? '0'+secleft : secleft);
			MHA_hud.innerHTML += "<a href=\"tournament.php?tid=" + userObj.viewing_atts.tournament.tournament_id + "\" data-ajax=\"false\" target=\"_blank\" style='font-weight: bold;'>Tournament</a>" + " : " + userObj.viewing_atts.tournament.status[0].toUpperCase() + userObj.viewing_atts.tournament.status.slice(1) + " - " + textTime + " <span class='hudstatlabel'>Rank:</span> " + userObj.viewing_atts.tournament.rank + " <span class='hudstatlabel'>Score:</span> " + userObj.viewing_atts.tournament.score + "<br>";
			MHA_hud.innerHTML += '<a href=\"team.php\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Team</a> online:' + userObj.viewing_atts.tournament.team_members_online + ' <a href=\"team.php?tab=2\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Journals</a>' + " - Hunts left: " + huntsleft + ' <a href=\"team.php?invite=true\" data-ajax=\"false\" target=\"_blank\"  style="font-weight: bold;">Invite</a><br>'; 
		}
		//SG: Amplifier
		if (userObj.environment_id == 31){
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Amplifier:</span> " + userObj.viewing_atts.zzt_amplifier + "<br>";
		}
		
		//ZT: piece
		if (userObj.environment_id == 32){
			var piece = ['None','Pawn1','Pawn2','Pawn3','Pawn4','Pawn5','Pawn6','Pawn7','Pawn8','Kight1','Kight2','Bishop1','Bishop2','Rook1','Rook2','Queen','King']; 
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Amplifier: </span>" + userObj.viewing_atts.zzt_amplifier + " - <span class='hudstatlabel'>Tech:</span> " + piece[userObj.viewing_atts.zzt_tech_progress] + " - <span class='hudstatlabel'>Mystic:</span> " + piece[userObj.viewing_atts.zzt_mage_progress] + "<br>";
		}
		
		//Iceberg: Phase, ft
		if (userObj.environment_id == 40){
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Phase:</span> " + userObj.quests.QuestIceberg.current_phase + " - " + userObj.quests.QuestIceberg.user_progress + " ft - " + userObj.quests.QuestIceberg.turns_taken + " hunts<br>";
		}
		
		//FW
		if (userObj.environment_id == 33){
			var fwObj = userObj.viewing_atts.desert_warpath;
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Victories:</span> " + fwObj.victories + " - <span class='hudstatlabel'>Friends:</span> " + fwObj.friends_in_area + " - <span class='hudstatlabel'>Wave " + fwObj.wave + ":</span><br>";
			
			for (var wp in fwObj.wave_population)
			MHA_hud.innerHTML += "<p style=\"text-align:right;\">" + fwObj.wave_population[wp].name + " - <b style=\"color:blue;\">" + fwObj.wave_population[wp].population + "</b> [" + fwObj.wave_population[wp].status + "]<br>";
			
			for (var wp in fwObj.common_population)
			MHA_hud.innerHTML += fwObj.common_population[wp].name + " [" + fwObj.common_population[wp].status + "]<br>";
			
			MHA_hud.innerHTML += "<span class='hudstatlabel'>Streak:</span> - " + fwObj.streak.mouse_type + " - <b style=\"color:green;\">" + fwObj.streak.quantity + "</b><br>";
			
			//if ( userObj.viewing_atts.desert_warpath.streak.quantity > 5) soundalert();
			
			MHA_hud.innerHTML += JSON.stringify(userObj.viewing_atts.desert_warpath.streak,null,'\t') ;
			
			//if (userObj.viewing_atts.desert_warpath.wave == 1) soundalert();
		}
		
		//LG
		if ((userObj.environment_id == 35)||(userObj.environment_id == 41)||(userObj.environment_id == 42)){
			for (var key in userObj.quests){
				if (userObj.quests[key].hasOwnProperty('essences')) {
					MHA_hud.innerHTML += '<em style=\"font-size:1.1em;color:limegreen;\" >Petals : ' + userObj.quests[key].loot_drops.dewthief_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.dreamfluff_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.duskshade_petal_crafting_item.quantity + ']-' + userObj.quests[key].loot_drops.graveblossom_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.plumepearl_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.lunaria_petal_crafting_item.quantity + ']</em><br>';
					i=8;
					while (userObj.quests[key].essences[i].quantity==0) i--;
					var sum=0;
					for (var j=0; j<9; j++){// j<=i
						if (j<=i) MHA_hud.innerHTML += '<em style=\"color:dodgerblue;\" >['+String.fromCharCode(j+65) + ':'+userObj.quests[key].essences[j].quantity + ']&emsp;</em>';
						if (j<7) sum = sum/3 + userObj.quests[key].essences[j].quantity;//Gur
					}
					MHA_hud.innerHTML += '<br>= ' + sum + '&emsp;<em style=\"color:dodgerblue;\" >' +  userObj.quests[key].essences[6].name + '<br></em>';//Gur
					MHA_hud.innerHTML += '<em style=\"font-size:0.8em;color:grey;\">' + JSON.stringify(userObj.quests[key].minigame ,null,'\t') + '</em><br>';
				} 
				break;
			}
			
			//minigamealert
			if (alerttext == 'minialert'){
				//Living Garden
				if (userObj.environment_id == 35){
					var smallObj = userObj.quests.QuestLivingGarden;
					if (smallObj.is_normal){
						if (smallObj.minigame.bucket_state == "filling"){
							if (smallObj.minigame.estimate == 35){
								MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
								soundalert();
								}else{// <35
								if (userObj.trinket_item_id != 1020){//sponge id
									MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****20 charms only****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
									soundalert();
								}
							}
						}
						}else{
						if (smallObj.minigame.vials_state == "filling"){
							if (smallObj.minigame.estimate == 35){
								MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
								soundalert();
								}else{// <35
								if ((userObj.trinket_item_id != 1017) && (userObj.trinket_item_id != 1022)){
									MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****10 charms each****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
									soundalert();
								}
							}
						}
					}
				}
				//Lost City
				if (userObj.environment_id == 41){
					var smallObj = userObj.quests.QuestLostCity;
					if (smallObj.is_normal){
						if (smallObj.minigame.curses[0].active && !smallObj.minigame.curses[0].charm.equipped){
							MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							soundalert();
						}
						}else{
						if (smallObj.minigame.is_cursed && !((smallObj.minigame.curses[0].active && smallObj.minigame.curses[0].charm.equipped) || (smallObj.minigame.curses[1].active && smallObj.minigame.curses[1].charm.equipped) || (smallObj.minigame.curses[2].active && smallObj.minigame.curses[2].charm.equipped) )){
							MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							soundalert();
						}
					}
				}
				//Sand Dunes
				if (userObj.environment_id == 42){
					var smallObj = userObj.quests.QuestSandDunes;
					if (smallObj.is_normal){
						if (smallObj.minigame.has_stampede && (userObj.trinket_item_id != 1016)){
							MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							soundalert();
						}
						}else{
						var salt = window.localStorage.getItem("KGSalt");
						if (salt == undefined || salt == null){
							window.localStorage.setItem("KGSalt", 20);
							salt = 20;
						}
						MHA_hud.innerHTML += 'min Salt to alert : <input type="number" id="SaltInput" name="Salt" value="' + salt.toString() + '"/>';
						MHA_hud.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" value="Save" onclick="window.localStorage.setItem(\'KGSalt\', document.getElementById(\'SaltInput\').value);window.location.href=\'/\';"/><br>';
						MHA_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
						/*if (smallObj.minigame.salt_charms_used >= salt){
							if (userObj.trinket_item_id != 1015) soundalert();
							}
							if (smallObj.minigame.salt_charms_used == 0){
							if (userObj.trinket_item_id == 1015) soundalert();
						}*/
						if ((smallObj.minigame.salt_charms_used >= salt)&&(userObj.trinket_item_id != 1015)) soundalert();
						if ((smallObj.minigame.salt_charms_used == 0)&&(userObj.trinket_item_id == 1015)) soundalert();
					}
				}
				
				}else{
				MHA_hud.innerHTML += '<br> ****alert deactivated**** <br><br>';
			}
		}
	}

	//default SKIN AREA
	function MHA_defaultSkin()
	{
		//===========Change the top row of mousehunt=================
		var hgRow = document.getElementById('hgRow');
		var separator_right = hgRow.getElementsByClassName('hgSeparator right')[0];
		var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
		
		var rightbanner = hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
		MHA_cleanObject(rightbanner); //rightbanner.innerHTML = "";
		rightbanner.setAttribute('class','rightEdge');
		hgRow.insertBefore(separator_right.cloneNode(true),document.getElementById('supportMenu'));//end of remove rightbanner
		
		MHA_removeObject(document.getElementById('appLogo'),hgRow); //remove leftbanner (mousehunt)
		//fix the banners dropdown
		document.getElementById('hgDropDownCommunity').style.right = "91px";
		document.getElementById('hgDropDownSupport').style.right = "5px";
		
		//add SB+ and Inbox and mobile
		var sbplus = document.getElementById('userGreeting').cloneNode(true);
		sbplus.id = "MHA_appTabSuperBrie";
		sbplus.className = "hgMenu";
		sbplus.setAttribute('onclick','showCheckout("donatebutton"); return false;');
		sbplus.style.cssFloat = "right";
		sbplus.style.paddingTop = "0px";
		sbplus.style.paddingLeft = "0px";
		sbplus.style.paddingRight = "8px";
		sbplus.style.cursor = "pointer";
		sbplus.style.height = "35px";
		sbplus.firstChild.style.cssFloat = "left";
		sbplus.firstChild.style.width = "40px";
		sbplus.firstChild.style.position = "relative";
		
		sbplus.firstChild.firstChild.removeAttribute('href');
		sbplus.firstChild.firstChild.removeAttribute('onclick');
		
		MHA_removeObject(sbplus.firstChild.firstChild.firstChild,null);

		sbplus.firstChild.firstChild.firstChild.style.width = "29px";
		sbplus.firstChild.firstChild.firstChild.style.height = "29px";
		sbplus.firstChild.firstChild.firstChild.style.position = "relative";
		sbplus.firstChild.firstChild.firstChild.style.top = "3px";
		sbplus.firstChild.firstChild.firstChild.style.left = "0px";
		sbplus.firstChild.firstChild.firstChild.style.paddingLeft = "5px";
		sbplus.firstChild.firstChild.style.textDecoration = "none";
		sbplus.firstChild.firstChild.firstChild.removeAttribute('src');
		sbplus.firstChild.firstChild.firstChild.src = "images/items/bait/d3bb758c09c44c926736bbdaf22ee219.gif";

		sbplus.lastChild.style.cssFloat = "right";
		sbplus.lastChild.style.paddingTop = "10px";
		sbplus.lastChild.style.fontSize = "12px";
		sbplus.lastChild.style.color = "#64696D";
		sbplus.lastChild.style.fontFamily = '"lucida grande",tahoma,verdana,arial,sans-serif';
		sbplus.lastChild.style.fontWeight = "bold";
		sbplus.lastChild.firstChild.style.textDecoration = "none"

		sbplus.lastChild.firstChild.removeAttribute('href');
		sbplus.lastChild.firstChild.textContent = document.getElementById('appTabSuperBrie').getElementsByClassName('appTabMiddle')[0].childNodes[1].textContent;
		
		var inbox = document.getElementById('communityMenu').cloneNode(true);
		var oldinbox = document.getElementById('appInboxTab');
		var inboxnotification = document.getElementById('appInboxTab').getElementsByClassName('alerts')[0].cloneNode(true);
		oldinbox.id = "appoldInbox";
		inbox.id = "appInboxTab";
		MHA_removeObject(inbox.lastChild,inbox);
		inbox.appendChild(inboxnotification);
		inbox.setAttribute('onclick',"javascript:messenger.UI['notification'].showPopup(); return false;");
		inbox.style.marginLeft = "0px";
		inbox.style.cursor = "pointer";
		inbox.firstChild.style.color = "#4DA55A";
		inbox.firstChild.style.backgroundImage = "url(images/ui/hgbar/hgrow_middle_blue.png)";
		inbox.firstChild.style.cursor = "pointer";
		inbox.firstChild.textContent = "INBOX";
		inboxnotification.style.backgroundImage = "url(images/ui/hgbar/alert_badge.png)";
		inboxnotification.style.position = "absolute";
		inboxnotification.style.right = "0px";
		inboxnotification.style.top = "0px";
		inboxnotification.style.zIndex = "10";
		inboxnotification.style.width = "22px";
		inboxnotification.style.height = "20px";
		inboxnotification.style.paddingTop = "2px";
		inboxnotification.style.color = "white";
		inboxnotification.style.textAlign = "center";
		inboxnotification.style.fontWeight = "bold";
		inboxnotification.style.margin = "5px 205px 0px 0px";
		inboxnotification.style.cursor = "pointer";

		var mobile = document.getElementById('MHA_appControlPanel').cloneNode(true);
		mobile.id = "MHA_appMobile";
		mobile.className = "hgMenu";
		mobile.removeAttribute('onclick');
		mobile.firstChild.firstChild.href = document.getElementsByClassName('switch')[0].firstChild.href;
		mobile.firstChild.firstChild.firstChild.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACgRJREFUeNpMl21wVOd1x3/PvXff36SVtFppkRZJIFsWIEA2NjYOpswE2qSZtJ2hpp1xGnc6jd3EsePEmbTTWK2nk8kH52XaTuw4tqcel3Y6tT/Uqd1SKI2NgSIMRiAQICSklXal1e5Ku9q9d+/r0w/glDPzfDrP/P9zPpxzfkdIKe8DfIDL/4e483KO4+jLS0s7auvrD1Wr1QfzhfwuTfN1BANBLMvEMPR6V1f3eEtLy+lINDKe7kyfCYVCKtALKIB3l64K2EJKOQIEAOeuRB2YyeVyu9fW1r7mCeXLba0tgQ3d3SDE7V+OB5rya7VCvkBppYzE+yDRkvhZJpM5rmlaGmi/S1sDTCGl3AL47yR8wGKj0ajn8/nnAn7/WG82qwCs5tY4/+E4M7lpLs1cpaKvEfaF2dp3L309m9i5eyfd93YDsLCwQKPReC2VSv1Fa2urBWwC7Dum1t2mApgrlUqBYrH4+sa+7IFwKML85XneevU1joy/w9XmVcgAaSAG6EAeKECH0smhrX/Anz75Vbbu2QrA1LWpC4l44smurq5p4B5A3m0aAnKlSoWFhYWjI1uGtwpF5ciPjvDtV75NIVUg9DtBRh++n6HOzWTDGdpC3ZiOS97IM1mc5PQnJ6m8W8F3LcQPvvwSz//o+TvGV8vJRMdjqXR77o6xLqSUWwFpGMb0jenpX94zNLg/oAX48Xd+wrf+4Tl4Gu7/0gM8lH2EIeUeIl6YuBpDVQLYtk7JXaGu6dRkjdPF0xw7ehz5Y4+nd32Tv/+nn4AKFy9PTPX39j0Si8dagYg6NjbWBVybm5t/rr0t+SfxWIKf/uXf8tzbz8LfwMFDB3g4sgutHqbp6jiKw6pZIe2kGI7eS79vI7iST4pnSAfTbNjWy63tc5z+l48onVzit373i0Ti4faF3OKG1taWtxRFaVfHxsaUSqXSU63W3ty4cWPg3155jz96+QkYg737foNuvZeaY6BpDkFNZU3qPBzcxe74bi6Vp5gpLbHZGmVHeoi3S28hdR/tmTj5+/L87+vjJBZb2PuFvaxVV7fZln02FotNKMBysbjyza6udHxm8hYv/t334DC07mmlxUlQ89ZwNQNLM1kT67TaCR4IPsh7jfcpe2vE/EH+cfEIycI9PNX9FJPmBPVak0RfBJ6BH77zA8785zn6B/pZrVS+63leU9F1va9aW/39aCTKP796hE8Tk/BF0MsN5tZvovlVtKBGjjwn+YgNbg8fLp9mrjDHgeABBq1RvjT8GO+WjjDobkfRIG8WqK3rsAuWtxd5+43Xceo2tUZjT2ml9KhWLBb32o4Vm7lyg/++cBz2AS1g1jw+FRMsxW6Rctt4XP1jhjr7GFkfxPI8sqE9SE0n25biuPkGjbiD1MoUlTl0D3AFRIDPw/HXjnPuf8YJ9CZYr9X2aE29eV+YCOMfneNi8wKM3p5PSocDCizJGkunk5za/S3sBT/vTZ7Ei/oJrmu0DdfJ+eK8dPkav9r7dV6bOYpeU1FaXAQSzwU5BFPBG1wYv8jBTV+gVCqMakvLS8MRLcL8zTlWO1dR06DlOpDlPuT6ZjzrEdpWwjR35Hl8ssqxCRNSKlRWecZo8PQejZ+n/oqjU4IfvtcDwVdQYqcgNIuWvInsyuEMwvziApZRp1gqD2mFpUIm25ul1lxBVmOIf9+LUngQy+vCjXZDKoobmEf3alipDGxtpzeuMe+YxAMlOqTHU5evcqKqQWsGUW3i3EihVutIsYBIjyNWTzBrT7JWX8NynKBWr9fV4nKe+aV5vJlN0PYQzaQfWtchUoSgRDVdfJ8N+maTvA+oK8S7NBZirZxQkhB1UYwyBNaR0QaeUoaaRE49AlNF8rF5Zm/l8ISFphuGm5tbRdM0CCoQXgFfOxIfSBMcF911MLQAf572+E3FJhrSMBoGv92ZxBL+20vRc/GkhpAKQtgonoqHiQgXkCqEgi2UV5dwJVLJZDbcdF2FSCyEYlXBdZHSA9dCuBKkiSsdPCVCtJbnflHlfq3B5/xNVvUSDcMAow6OCbKB9EyEA55nIXGQjgtGia7udgIhPwqaoaRTnVOWA5nMBjoEoK8DEtW2kE4TbBPNsfB7LrMGTDYEs3WFy2aQoq7gWA1orKEZFophgW0hbQPhWAghwWyi2g1SHQmalku2t/eSku7qnHClTU/fJrKdEchdB9sF10HYJhgmqqNSbVYJ63VSPj8xTyLMCmEs6hULTBfXqiFMC9G0wLEQjn170a8s0Bvx0z8wTKOm05PtOacMDAx8lE6ny/Fkkl3bd8DsTVhbxsVDNJvQbGJbJhtTnYSjCWzVQ4R9xIMhWlsSbO7tBtNAGnVc00CaTTANPE8gG1W4+ikPDt5Lz8AA0WiEvr6+DxUhxOLIyMgRhODQ4T9kdGMKLp6DuonnuWBWcao5ZtdWibeESUb9xMI+4rEwqieZrxShvgp6E/QGmHWEaYNlw42L9AQdDh1+HF8gwMjIyLFkMnlGSCl7dF33nz179uzojgeSHx//JU/82TOspLfAtocgGEB1PSI+2NDZhlD9eFKiKRoSg6mqxPV8YDdQ7CbSdvFcG2avoJ7/Fa+OfZfDX/sGH5/6mNGdO/clk8mLQkq5Hbi+mF88VF4pv7ltZBv/+vYbPPn8d1jfsB2GtiNiUaQOKBJ8AVDEbX7TJHgeqgTXtVA9iWuYMH8ZZfIMLz/7PM9+/3vcuDmNdL2XBwcHXwC2qmNjY+1AKh6L/8f09I1N8/ML2z63/wCZRJTxD96lXlyBYAT8AfAJhLRQPA/hOgjbRUoT6TWhaSFra3D9AuGbE3z/6a/w9Rde4Nr1afKLC6dGRka+qqrqAKAIKeUWKWVQCLGyvr5ee/+D999Bsm/0gV2cPvo+P3vzDc7MLiNTvbBhAMLR29WignRBWrf7dHEe8jMMpWJ84/BXOHjo97hy/Rql0sqpgwcOPtHZ2VkD+j5jpC2e5/kty0JRlPPlcvnFY8f+a2xpucCW4VHMeoWTJ07wyeVLXM8XKDsqpt8HQkF4LprjkBSCgc4kI0Ob2PvYY6Szm5m4dAW/T7B///4Xs9nsX9u2vTMQCKCqqvVZpX7DMBxd168Cv2g0Gk+cOvUxE5cmCQSC9PdlcZo6C7MzLBWWMUwTT3qoioJf0+hIdZLt7yecSJDLFyhXygwObOLRRx+lo6Pjhuu6+8LhcDwUCoUURbG0O0SvCSFQVVVrNBol27bZuXOUWCzG+fPnOXv2LK7rEo8nSPf34/f5EEIgJdiOjWE0uXDlKkhJW1sbo9t3sGV4GFVVqdfrc9FotKooSscd2Ha1O+SNpmmupmmdgUDgF47j7G02m4Pd3RlisTi3bt1ibm6OSqVCuVxC1/VfnxOhUIhYLEZ7WxuZTIaBgQFaW1txPQ9FUZYCgcBLmqaFVFV1hBASsP9vAGBo5K7JH89qAAAAAElFTkSuQmCC";
		
		var freeSB = null;
		tmp = document.getElementsByClassName('freeoffers_button');
		if (tmp.length > 0)
		{
			tmp = tmp[0];
			freeSB = document.getElementById('MHA_appControlPanel').cloneNode(true);
			freeSB.id = "MHA_freeSB";
			freeSB.className = "hgMenu";
			freeSB.setAttribute('onclick',tmp.getAttribute('onclick'));
			var freeSBchild = freeSB.firstChild;
			freeSB.firstChild.style.width = "65px";
			freeSBchild = freeSBchild.firstChild.firstChild;
			freeSBchild.src = "images/ui/buttons/free_sb_offers_btn.gif";
			freeSBchild.style.width = "54px";
			MHA_removeObject(tmp,null);
		}
		
		var appendbefore = document.getElementById('communityMenu').nextSibling.nextSibling;
		hgRow.insertBefore(inbox,appendbefore);
		hgRow.insertBefore(separator_right.cloneNode(true),appendbefore);
		hgRow.insertBefore(sbplus,appendbefore);
		hgRow.insertBefore(separator_right.cloneNode(true),appendbefore);
		hgRow.appendChild(mobile);
		hgRow.appendChild(separator_left.cloneNode(true));
		if (freeSB != null)
		{
			hgRow.appendChild(freeSB);
			hgRow.appendChild(separator_left.cloneNode(true));
		}

		//wiki => community; livedevchat => Support; news => community
		var community = document.getElementById('hgDropDownCommunity').getElementsByClassName('hgDropdownMiddle')[0];
		var support = document.getElementById('hgDropDownSupport').getElementsByClassName('hgDropdownMiddle')[0];

		var hgdropdownitem = community.firstChild.cloneNode(true);
		hgdropdownitem.className = "hgDropDownItem";
		hgdropdownitem.firstChild.href = "http://mhwiki.hitgrab.com/wiki/";
		hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_game_rules.png"
		hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Hunter's Wiki";
		hgdropdownitem.firstChild.lastChild.innerHTML = "Contribute the knowledge<br>for the benefit of the community.";
		community.insertBefore(hgdropdownitem,community.lastChild);
		
		hgdropdownitem = support.firstChild.cloneNode(true);
		hgdropdownitem.className = "hgDropDownItem first";
		var lore = document.getElementById('nav1.lore').childNodes;
		for (i = lore.length - 1;i >= 0;--i) //because Live dev chat is near the end of the list, we just find it from the end for a bit faster ^^
		{
			if (lore[i].firstChild.textContent == "Live Dev Chat")
			{
				hgdropdownitem.firstChild.href = lore[i].firstChild.href;
				break;
			}
		}
		hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
		hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Live Dev Chat";
		hgdropdownitem.firstChild.lastChild.innerHTML = "Chat with the devs<br>on each friday.";
		support.firstChild.className = "hgDropDownItem";
		support.insertBefore(hgdropdownitem,support.firstChild);
		
		hgdropdownitem = community.firstChild.cloneNode(true);
		hgdropdownitem.className = "hgDropDownItem first";
		var news = document.getElementById('nav1.boards').childNodes;
		for (i = news.length - 1;i >= 0;--i)
		{
			if (news[i].firstChild.textContent == "News")
			{
				hgdropdownitem.firstChild.href = news[i].firstChild.href;
				break;
			}
		}
		hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_offense_appeals.png"
		hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "News";
		hgdropdownitem.firstChild.lastChild.innerHTML = "Get all the latest<br>news and updates!";
		community.firstChild.className = "hgDropDownItem";
		community.insertBefore(hgdropdownitem,community.firstChild);
		
		hgdropdownitem = community.firstChild.cloneNode(true);
		hgdropdownitem.className = "hgDropDownItem first";
		for (i = news.length - 1;i >= 0;--i)
		{
			if (news[i].firstChild.textContent == "Chat Room")
			{
				hgdropdownitem.firstChild.href = news[i].firstChild.href;
				break;
			}
		}
		hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
		hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Chat room";
		hgdropdownitem.firstChild.lastChild.innerHTML = "Join the Mousehunt<br>Chat room";
		community.firstChild.className = "hgDropDownItem";
		community.insertBefore(hgdropdownitem,community.firstChild);
		
		//move announcement to the Larry hunting tips
		var huntingTips = document.getElementById('huntingTips');
		var tickers = document.getElementsByClassName('ticker');
		var tickerlist = document.createElement("ul");
		if ((huntingTips != undefined) && tickers.length != 0) //if there are Larry around then he will announce it for us ^_^ or if there are something  to announce
		{
			huntingTips = huntingTips.getElementsByClassName('content')[0];
			var newHuntingNode = null;
			newHuntingNode = document.createElement("p");
			newHuntingNode.innerHTML = "_______________________________________________________<br>ANNOUNCEMENT:";
			huntingTips.appendChild(newHuntingNode);
			for (i = 0;i < tickers.length;++i)
			{
				newHuntingNode = document.createElement("li");
				newHuntingNode.innerHTML = tickers[i].innerHTML;
				tickerlist.appendChild(newHuntingNode);
			}
			tickerlist.style.listStyleType = "disc";
			tickerlist.style.marginLeft = "20px";
			huntingTips.appendChild(tickerlist);
		}
		
		//remove some others elements
		tmp = document.getElementById('hgbar');
		MHA_removeObject(document.getElementById('appRow'),tmp);//remove the appRow (Inbox,play,Free gift...)
		MHA_removeObject(document.getElementById('newsRowHolder'),tmp);//remove the News
		
		//==========Change the container (main page) of mousehunt==============
		var container = document.getElementsByClassName('container')[0];
		MHA_removeObject(container.getElementsByClassName('clear')[0],container);//remove the like button in the bottom of the pages
		
		//=======gameinfo changes=======
		//add Golden shield expires day (more obvious)
		if (MHA_global.MHA_user.user.has_shield)
			document.getElementsByClassName('gameinfo')[0].firstChild.lastChild.innerHTML = "<span style='font-weight: bold;'>LGS:</span> <span style='color: #3B5998; font-weight: bold;'>" + document.getElementsByClassName('gamelogo')[0].title.substr(37) + "</span>";
		else
			document.getElementsByClassName('gameinfo')[0].firstChild.lastChild.innerHTML = "<span style='font-weight: bold;'>No LGS</span>";
		
		//=======NAVIGATOR changes======
		//move camp and marketplace button
		var campbtn = document.getElementsByClassName('campbutton')[0];
		var donationarea = document.getElementsByClassName('donatebuttonarea')[0];
		campbtn.parentNode.removeChild(campbtn);//move the camp button to donation area for moving easier
		donationarea.insertBefore(campbtn,donationarea.firstChild);
		
		document.getElementsByClassName('marketplace_button')[0].style.margin = "49px 0px 0px -514px"; //move Marketplace
		document.getElementById('hornArea').style.marginLeft = "101px";
		
		//on the last version, we can't make button friend go a bit far because of list limited but
		//on this version, we will change the travel button into campbutton, so it look like the camp button moved back to it place
		//and camp button (on the right side) to friend button and have the toggle animation so it look like the old friend button
		//and so we just hide the friend button
		////change camp => friend
		campbtn = document.getElementById('campButton');
		campbtn.style.margin = "70px 0px 0px 20px";
		campbtn.id = "btn-friend";
		campbtn.parentNode.setAttribute('onmouseover',"javascript:toggleNavCategory('nav1.friends', 'visible');");
		campbtn.parentNode.setAttribute('onmouseout',"javascript:toggleNavCategory('nav1.friends', 'hidden');");
		campbtn.style.background = "url('images/ui/buttons/navbuttons.en.gif?v=4') no-repeat -313px -38px";
		campbtn.style.width = "74px";
		campbtn.style.height = "26px";
		////change travel => camp
		var travelbtn = document.getElementById('btn-travel');
		travelbtn.className = "navitem";
		travelbtn.style.height = "26px";
		travelbtn.style.width = "69px";
		travelbtn.style.background = "url('images/ui/buttons/navbuttons.en.gif?v=5') no-repeat 0px 0px";
		travelbtn.style.backgroundSize = "600%";
		travelbtn.id = "campButton";
		////change their href
		travelbtn.href = campbtn.href;
		campbtn.href = document.getElementById('btn-friends').href;
		
		
		//combining friend & team
		var teamnav = document.getElementById('nav1.teams');
		var teamnavarr = teamnav.childNodes;
		var friendnav = document.getElementById('nav1.friends');
		var friendnavarr = friendnav.childNodes;
		for (i = 0;i < friendnavarr.length;++i)
			if (friendnavarr[i].firstChild.textContent == "Invite Friends")//remove invite friend
			{
				MHA_removeObject(friendnavarr[i],friendnav);
				--i;
			}
		for (i = 0;i < teamnavarr.length;++i)
		{
			if (teamnavarr[i].firstChild.textContent == "View Team")
			{
				friendnav.insertBefore(teamnavarr[i],friendnav.firstChild);
				--i;
			}
			else if (teamnavarr[i].firstChild.textContent == "Tournaments")
			{
				friendnav.appendChild(teamnavarr[i]);
				--i;
			}
		}
		
		//add Mice to inventory
		var inventory = document.getElementById('nav1.inventory');
		var micepage = inventory.lastChild.cloneNode(true);
		inventory.appendChild(micepage);
		micepage = micepage.firstChild;
		micepage.href = document.getElementsByClassName('navitem micebutton')[0].href;
		micepage.innerHTML = "Mice";
		
		//remove the following button, it will be replaced on a different place: Donate, travel, mice, lore, forum, friend
		MHA_removeObject(document.getElementsByClassName('donatebutton')[0],donationarea);
		var mainnav = document.getElementsByClassName('navitem lorebutton')[0].parentNode.parentNode;
		document.getElementById('btn-friends').style.display = "none";	//mainnav.removeChild(document.getElementsByClassName('navitem travelbutton')[0].parentNode);
		MHA_removeObject(document.getElementsByClassName('navitem micebutton')[0].parentNode,mainnav);
		MHA_removeObject(document.getElementsByClassName('navitem lorebutton')[0].parentNode,mainnav);
		MHA_removeObject(document.getElementsByClassName('navitem newsbutton')[0].parentNode,mainnav);
		MHA_removeObject(document.getElementsByClassName('navitem forumsbutton')[0].parentNode,mainnav);
		//fix the dropdown
		document.getElementById('nav1.shops').style.left = "308px";
		document.getElementById('nav1.inventory').style.left = "213px";
		document.getElementById('nav1.friends').style.left = "645px";
		
		//======HUD change======
		var hud_base_parent = document.getElementById('hud_base').parentNode.parentNode.parentNode;
		MHA_removeObject(hud_base_parent,null);//remove the base. It does not necessary because the content showed that

		var hud_bait = document.getElementById('hud_baitName').parentNode;
		var hud_gold_list = hud_bait.parentNode;
		MHA_removeObject(hud_bait,hud_gold_list); //remove the bait
		
		var hud_team = document.getElementById('hud_team');
		if (hud_team != undefined)
		{
			hud_team = hud_team.parentNode;
			MHA_removeObject(hud_team,null); //and remove the old team list
			hud_gold_list.appendChild(hud_team); //move the "Team" information to the place of the bait we had just removed
		}
		
		MHA_travelToTabBar();
		MHA_shopToTabBar();
		
		//precious title advancing
		MHA_titleBar = document.getElementById('hud_titlebar');
		MHA_titlePercentage = document.getElementById('hud_titlePercentage');
		
		//detailed timer
		MHA_huntTimer = document.getElementById('huntTimer').cloneNode(true);
		document.getElementById('hornArea').appendChild(MHA_huntTimer);
		document.getElementById('huntTimer').style.display = "none";
		MHA_huntTimer.id = "MHA_huntTimerParent";
		MHA_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt:</span> <span id='MHA_huntTimer'></span>";
		MHA_huntTimer = document.getElementById('MHA_huntTimer');
		var hornbutton = document.getElementsByClassName('hornbutton')[0].firstChild;
		hornbutton.setAttribute("onclick",hornbutton.getAttribute("onclick").replace("return false;","MHA_global.MHA_callbackFunctions.MHA_sound(); return false;"));
		
		//location timer
		var headsup = document.getElementById('hud_statList1').parentNode;
		var headsuparr = headsup.getElementsByClassName('hudstatlist');
		MHA_locationTimerParent = document.createElement('div');
		MHA_locationTimerParent.className = 'hudstatlist';
		headsup.insertBefore(MHA_locationTimerParent,headsuparr[1].nextSibling);
		MHA_locationTimerParent.appendChild(document.createElement('ul'));
		MHA_locationTimerParent = MHA_locationTimerParent.firstChild;
		MHA_locationTimerParent.id = "MHA_locationTimerParent";
		
		var locationTimerObject;
		MHA_global.MHA_objects.locationTimer = new Array;
		for (var i = 0;i < 3;++i)
		{
			locationTimerObject = document.createElement('li');
			MHA_locationTimerParent.appendChild(locationTimerObject);
			locationTimerObject.innerHTML = "<span class='hudstatlabel'>" + MHA_C_LOCATION_TIMES[i].name + ":</span> <span id='" + MHA_C_LOCATION_TIMES[i].id + "'></span>";
			MHA_global.MHA_objects.locationTimer[i] = locationTimerObject.lastChild;
		}
		
		document.getElementsByClassName('gameinfo')[0].firstChild.firstChild.innerHTML = "<span style='font-weight: bold;'>" + MHA_C_LOCATION_TIMES[3].name + ":</span> <span id='" + MHA_C_LOCATION_TIMES[3].id + "'></span>";
		MHA_global.MHA_objects.locationTimer[3] = locationTimerObject.lastChild;
		
		//New bait number location
		var MHA_baitnum = document.getElementById('hud_baitIcon').parentNode;
		MHA_baitnum.insertBefore(document.createElement('div'),MHA_baitnum.firstChild);
		MHA_baitnum = MHA_baitnum.firstChild;
		MHA_baitnum.id = "MHA_baitnum";
		MHA_baitnum.setAttribute('style','position: absolute;right: 44px;z-index: 10;text-align: center;cursor: pointer;padding: 3px 5px;-moz-border-radius: 5px;border-radius: 5px;border: 0 none;color: #fff;background-color: #549906;background-image: -webkit-gradient(linear, center bottom, center top, from(#549906), to(#92c315));background-image: -moz-linear-gradient(90deg, #549906, #92c315);font-weight: bold;');
		MHA_baitnum.innerText = MHA_global.MHA_user.user.bait_quantity;
		MHA_global.MHA_objects.MHA_baitnum = MHA_baitnum;
		
		//mouse autozoom
		MHA_addEvent("mousemove");
		MHA_addEvent("mousewheel");
		MHA_global.MHA_imageBox = document.createElement("div");
		MHA_global.MHA_imageBox.id = "MHA__global.MHA_imagePhotoZoomBox";
		MHA_global.MHA_imageBox.setAttribute("style","display:none;padding-top: 5px;padding-right: 5px;padding-bottom: 5px;padding-left: 5px;-webkit-transition-duration: 0s;-moz-transition: opacity 0s ease-in-out;-webkit-transition: opacity 0s ease-in-out;transition: opacity 0s ease-in-out;position: absolute;overflow: hidden;font-size: 0;-moz-box-shadow: 0px 0px 10px rgba(0,0,0,1);-webkit-box-shadow: 0px 0px 10px rgba(0,0,0,1);box-shadow: 0px 0px 10px rgba(0,0,0,1);min-height: 50px;min-width: 50px;pointer-events: none;background: white url(data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBouNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7) no-repeat center center;z-index: 99999;");
		MHA_global.MHA_imageBox.innerHTML = "<img id=\"MHA__global.MHA_imagePhotoZoomPhoto\" style=\"position: relative; z-index: 2; width: auto; height: auto;\">";
		MHA_global.MHA_imagePhoto = MHA_global.MHA_imageBox.firstChild;
		document.body.appendChild(MHA_global.MHA_imageBox);
		MHA_updateJounal();
		
		//start the timers
		MHA_secondTimerTasks();
		MHA_shortTimerTasks();
		MHA_minuteTimerTasks();
	}
	function MHA_travelToTabBar()
	{
		//travel => tabbar
		var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
		if (tabbar.length > 0)
		{
			tabbar = tabbar[0].firstChild;
			
			var travelbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
			travelbar.className = "inactive";
			var travelbarChild = travelbar.firstChild.firstChild;

			var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
			travelbarChild.setAttribute('onclick',travelbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")").replace("return false;","MHA_global.MHA_callbackFunctions.MHA_travelcontentLoad();return false;"));
			
			travelbarChild = travelbarChild.childNodes[1];
			travelbarChild.id = "MHA_travelCampTab";
			travelbarChild.textContent = "Travel";
			tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(travelbar);
			
			var travelcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
			travelcontent.appendChild(document.getElementById('huntingTips').cloneNode(true));
			travelcontent.id = travelcontent.id.substring(0,travelcontent.id.length - 1) + numOfTabbar;
			var travelcontentChild = travelcontent.lastChild;
			MHA_global.MHA_objects.MHA_campTravel = travelcontentChild;
			MHA_global.MHA_objects.MHA_campTravelcontent = travelcontentChild.getElementsByClassName('content')[0];
			travelcontentChild.id = "MHA_campTravel";
			travelcontentChild.style.background = "transparent url('images/ui/camp/trap/head_larry.png') no-repeat scroll left top";
			travelcontentChild.firstChild.style.height = "50px";
			travelcontentChild.firstChild.style.marginBottom = "4px";
			travelcontentChild.firstChild.style.padding = "25px 0 8px 90px";
			travelcontentChild.firstChild.firstChild.style.fontSize = "16px";
			travelcontentChild.firstChild.firstChild.style.fontWeight = "bold";
			travelcontentChild.firstChild.firstChild.innerHTML = '<a href="travel.php">Travel</a> to Location';
			travelcontentChild.firstChild.lastChild.style.padding = "1px 0 2px";
			travelcontentChild.firstChild.lastChild.innerHTML = 'Traveling Service by <a href="profile.php?snuid=larry">Larry</a>';
			travelcontentChild.lastChild.style.marginTop = "0px";
			travelcontentChild.lastChild.style.background = "transparent url('images/ui/camp/trap/content_foot.png') 0 0 no-repeat";
			travelcontentChild = travelcontentChild.firstChild.nextSibling;
			travelcontentChild.style.background = "transparent url('images/ui/camp/trap/content_body.png') 0 0 repeat-y";
			travelcontentChild.style.padding = "1px 15px 2px";
			travelcontentChild.id = "MHA_travelcontentChild";
			MHA_global.MHA_objects.MHA_travelcontentChild = travelcontentChild;
			travelcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
			tabbar.getElementsByClassName('tabbody')[0].appendChild(travelcontent);
		}
	}
	function MHA_shopToTabBar()
	{
		//shop => tabbar
		var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
		if (tabbar.length > 0)
		{
			tabbar = tabbar[0].firstChild;
			
			var shopbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
			shopbar.className = "inactive";
			shopbar.style.display = "inline-block";
			var shopbarChild = shopbar.firstChild.firstChild;
			
			var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
			MHA_global.MHA_shopLoaded = false;
			shopbarChild.setAttribute('onclick',shopbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")").replace("return false;","MHA_global.MHA_callbackFunctions.MHA_shopcontentLoad();return false;"));
			
			shopbarChild = shopbarChild.childNodes[1];
			shopbarChild.id = "MHA_shopCampTab";
			shopbarChild.textContent = "Shop";
			tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(shopbar);
			
			var shopcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
			shopcontent.appendChild(document.createElement("div"));
			shopcontent.id = shopcontent.id.substring(0,shopcontent.id.length - 1) + numOfTabbar;
			var shopcontentChild = shopcontent.lastChild;
			shopcontentChild.id = "MHA_shopcontentChild";
			MHA_global.MHA_objects.MHA_shopcontentChild = shopcontentChild;
			shopcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
			tabbar.getElementsByClassName('tabbody')[0].appendChild(shopcontent);
		}
	}
	function MHA_updateHud()
	{
		if (MHA_global.MHA_objects.MHA_baitnum != null) MHA_global.MHA_objects.MHA_baitnum.innerText = MHA_global.MHA_user.user.bait_quantity;
		if ((MHA_global.settings.MHA_skin == 2) && (MHA_global.MHA_objects.MHA_hud != null)) MHA_global.MHA_callbackFunctions.MHA_updateSimpleHud();
	}
	//ADD FEATURES AREA
	function MHA_asyncUser()
	{
		if ('undefined' == typeof user)
		{
			setTimeout (function() {MHA_asyncUser();},100);
		}
		else
		{
			MHA_global.MHA_callbackFunctions.MHA_syncUser()
			MHA_global.MHA_callbackFunctions.MHA_page_process();
		}
	}
	
	function MHA_syncUser() //forceSync
	{
		MHA_global.MHA_user.user = user;
		/*
			var XMLHTTP_next_activeturn_seconds;
			var MHA_XMLHttpRequest = new XMLHttpRequest();
			MHA_XMLHttpRequest.open("GET", "managers/ajax/abtest.php", true);
			MHA_XMLHttpRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
			MHA_XMLHttpRequest.setRequestHeader("Pragma","no-cache");
			MHA_XMLHttpRequest.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
			MHA_XMLHttpRequest.onreadystatechange = function()
			{
				if (MHA_XMLHttpRequest.readyState === 4)
				{
					if (MHA_XMLHttpRequest.status == 200)
					{
						MHA_global.MHA_user = eval('(' + MHA_XMLHttpRequest.responseText + ')');
						MHA_global.MHA_user.status = 1;
					}
					else MHA_global.MHA_user.status = 2;
				}
			};
			MHA_XMLHttpRequest.send(null);
		*/
	}
	
	function MHA_syncTime(forceSyncUser)
	{
		if (forceSyncUser == true) MHA_global.MHA_callbackFunctions.MHA_syncUser();
		MHA_global.MHA_nextTurnTimestamp = MHA_global.MHA_user.user.next_activeturn_seconds * 1000 + new Date().getTime();
	}

	function MHA_secondTimerTasks()
	{
		//update sound timer
		if (MHA_global.MHA_user.user.has_puzzle) document.title = "King Reward";
		else
		{
			nextTurnSeconds = MHA_global.MHA_nextTurnTimestamp - new Date().getTime();
			if (nextTurnSeconds > 0)
			{
				nextTurnSeconds = Math.ceil(nextTurnSeconds / 1000);
				if (nextTurnSeconds > 1000) window.location.reload(1);  //if nextHorn is too high, something is wrong
				var min = Math.floor(nextTurnSeconds / 60);
				var sec = nextTurnSeconds % 60;
				var textTime = min+":"+(sec < 10 ? '0'+sec : sec)
				MHA_huntTimer.textContent = textTime;
				document.title = textTime;
			}
			else
			{
				MHA_huntTimer.textContent = "Ready";
				document.title = "Ready";
			}
		}

		//set the second time interval
		setTimeout(function () { (MHA_secondTimerTasks)() }, MHA_S_SecondTimer * 1000);
	}
	
	function MHA_shortTimerTasks()
	{
		MHA_syncUser();
		setTimeout(function () { (MHA_shortTimerTasks)() }, MHA_S_ShortTimer * 1000);
	}
	
	function MHA_moderateTimerTasks()
	{
		MHA_syncTime(false);
		MHA_updateHud();
		setTimeout(function () { (MHA_moderateTimerTasks)() }, MHA_S_ModerateTimer * 1000);
	}

	function MHA_minuteTimerTasks()
	{
		//update precious title advancing
		MHA_titlePercentage.textContent = MHA_global.MHA_user.user.title_percentage.toString();
			
		//update location timer
		var locationTimerObject,states,hour,min,timetmp;
		var currentTime = Math.floor(new Date().getTime() / 1000);
		var i,j;
		for (i = 0;i < MHA_C_LOCATION_TIMES.length;++i)
		{
			timetmp = (currentTime - MHA_C_LOCATION_TIMES[i].base) % MHA_C_LOCATION_TIMES[i].totaltime;
			for (j = 0;j < MHA_C_LOCATION_TIMES[i].length.length;++j)
			{
				timetmp -= MHA_C_LOCATION_TIMES[i].length[j];
				if (timetmp < 0) break;
				else if (timetmp == 0)
				{
					j = (j + 1) % MHA_C_LOCATION_TIMES[i].length.length;
					timetmp = -MHA_C_LOCATION_TIMES[i].length[j];
					break;
				}
			}
			timetmp = -timetmp;
			hour = Math.floor(timetmp / 3600);
			min = Math.floor((timetmp % 3600) / 60);
			
			locationTimerObject = document.getElementById(MHA_C_LOCATION_TIMES[i].id);
			locationTimerObject.innerHTML = "<span style='color: " + MHA_C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + MHA_C_LOCATION_TIMES[i].state[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min);
		}
		
		//set the minute time interval
		setTimeout(function () { (MHA_minuteTimerTasks)() }, MHA_S_MinuteTimer * 1000);
	}

	function MHA_UpdateCursorPosition(e) { MHA_global.MHA_cX = e.pageX; MHA_global.MHA_cY = e.pageY; }

	function MHA_HideContent()
	{
		MHA_global.MHA_imageBox.style.display = "none";
	}

	function MHA_ShowContent(img)
	{
		var rX = 0, rY = 0,	vW, vH;
		MHA_global.MHA_imagePhoto.src = img;
		
		if (self.innerWidth) vW = self.innerWidth;
		else if (document.documentElement && document.documentElement.clientWidth) vW = document.documentElement.clientWidth;
		else if (document.body) vW = document.body.clientWidth;
		if (self.innerWidth) vH = self.innerHeight;
		else if (document.documentElement && document.documentElement.clientHeight) vH = document.documentElement.clientHeight;
		else if (document.body) vH = document.body.clientHeight;
		if (self.pageYOffset) {rX = self.pageXOffset;rY = self.pageYOffset;}
		else if (document.documentElement && document.documentElement.scrollTop) {rX = document.documentElement.scrollLeft;rY = document.documentElement.scrollTop;}
		else if (document.body) {rX = document.body.scrollLeft;rY = document.body.scrollTop;}
		vW += rX;vH -= rY;
		
		var oW = MHA_global.MHA_imageBox.offsetWidth;
		var oH = MHA_global.MHA_imageBox.offsetHeight;
		if (MHA_global.MHA_cX + 10 + oW > vW) MHA_global.MHA_imageBox.style.left = (MHA_global.MHA_cX - 10 - oW) + "px";
		else MHA_global.MHA_imageBox.style.left = (MHA_global.MHA_cX+10) + "px";
		MHA_global.MHA_imageBox.style.top = (MHA_global.MHA_cY - Math.floor(oH / 2) + 10) + "px";
		
		MHA_global.MHA_imageBox.style.display = "block";
	}

	function MHA_updateJounal()
	{
		journalimages = document.getElementsByClassName('journalimage');
		for (var i = 0;i < journalimages.length;++i)
		{
			if ((journalimages[i].firstChild == null) || (journalimages[i].firstChild.tagName.toUpperCase() == "IMG")) continue;
			if (journalimages[i].firstChild.getAttribute('onmouseover') == null)
			{
				journalimages[i].firstChild.setAttribute('onmousemove','MHA_global.MHA_callbackFunctions.MHA_ShowContent(this.href); return true;');
				journalimages[i].firstChild.setAttribute('onmouseover','MHA_global.MHA_callbackFunctions.MHA_ShowContent(this.href); return true;');
				journalimages[i].firstChild.setAttribute('onmouseout','MHA_global.MHA_callbackFunctions.MHA_HideContent(); return true;');
			}
			else break;
		}
	}

	function MHA_travel(url)
	{
		var travelTab;
		if (MHA_mode == 0) travelTab = MHA_global.MHA_objects.MHA_campTravel.getElementsByClassName('content')[0]; else travelTab = MHA_global.MHA_objects.MHA_travelcontentChild;
		MHA_cleanObject(travelTab);
		travelTab.innerHTML = "Travelling...";
		var target = new XMLHttpRequest();
		target.open("GET", url, true);
		target.onreadystatechange = function()
		{
			if (target.readyState === 4)
			{
				if (target.status == 200)
				{
					travelTab.innerHTML = "Travel successful, refreshing....";
					travelTab.innerHTML += '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
					if (MHA_mode == 0) document.getElementById('MHA_travelCampTab').parentNode.click(); else
					{
						MHA_cleanObject(MHA_global.MHA_objects.MHA_shopdiv);
						MHA_global.MHA_objects.MHA_shopdiv.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
						MHA_global.MHA_objects.MHA_tab.childNodes[3].click();
					}
				}
				else
				{
					travelTab.innerHTML = "Something is wrong, please <a href='#' onclick='reload()'>refresh</a> the page. Automatic refresh page in 5 sec";
					setTimeout(function(){window.location.reload(1);}, 5000);
				}
			}
		};
		target.send(null);
	}
	//Control Panel things
	function MHA_addControlPanel()
	{
		var hgRow = document.getElementById('hgRow');
		var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
		
		var controlpanel = document.getElementById('userGreeting').cloneNode(true);
		controlpanel.id = "MHA_appControlPanel";
		controlpanel.className = "hgMenu";
		controlpanel.setAttribute('onclick','MHA_global.MHA_loadControlPanel(); return false;');
		controlpanel.style.cssFloat = "left";
		controlpanel.style.paddingTop = "0px";
		controlpanel.style.paddingLeft = "0px";
		controlpanel.style.paddingRight = "4px";
		controlpanel.style.cursor = "pointer";
		controlpanel.style.height = "35px";
		controlpanel.firstChild.style.cssFloat = "left";
		controlpanel.firstChild.style.width = "40px";
		controlpanel.firstChild.style.position = "relative";
		
		controlpanel.firstChild.firstChild.removeAttribute('href');
		controlpanel.firstChild.firstChild.removeAttribute('onclick');
		
		MHA_removeObject(controlpanel.firstChild.firstChild.firstChild,null);
		
		controlpanel.firstChild.firstChild.firstChild.style.width = "29px";
		controlpanel.firstChild.firstChild.firstChild.style.height = "29px";
		controlpanel.firstChild.firstChild.firstChild.style.position = "relative";
		controlpanel.firstChild.firstChild.firstChild.style.top = "3px";
		controlpanel.firstChild.firstChild.firstChild.style.left = "0px";
		controlpanel.firstChild.firstChild.firstChild.style.paddingLeft = "5px";
		controlpanel.firstChild.firstChild.style.textDecoration = "none";
		controlpanel.firstChild.firstChild.firstChild.removeAttribute('src');
		controlpanel.firstChild.firstChild.firstChild.src = "data:image/png;base64,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";
		
		MHA_removeObject(controlpanel.lastChild,controlpanel);
		
		document.getElementById('userGreeting').getElementsByClassName('userText')[0].style.paddingRight = "8px";
		
		hgRow.appendChild(separator_left.cloneNode(true));
		hgRow.appendChild(controlpanel);
		hgRow.appendChild(separator_left.cloneNode(true));
	}

	function MHA_initAndLoadSettings()
	{
		MHA_global.MHA_settingCommand[0] = MHA_saveSettings;
		MHA_global.MHA_settingCommand[1] = MHA_clearSettings;
		MHA_global.MHA_settingCommand[2] = MHA_tabSettings;
		
		if (!window.localStorage.MHA_settings)
		{
			window.localStorage.MHA_settings = "MHA_storage";
			window.localStorage.MHA_skin = 1;
			window.localStorage.MHA_auto = 1;
			window.localStorage.MHA_ads = 1;
		}
		
		MHA_global.settings.MHA_skin = Number(window.localStorage.MHA_skin);
		MHA_global.settings.MHA_auto = Number(window.localStorage.MHA_auto);
		MHA_global.settings.MHA_ads = Number(window.localStorage.MHA_ads);
	}

	function MHA_clearSettings()
	{
		delete window.localStorage.MHA_settings;
		
		window.location.reload(1);
	}

	function MHA_saveSettings()
	{
		MHA_global.settings.MHA_skin = document.getElementById("MHA_skin").getElementsByClassName("tick")[0].value;
		MHA_global.settings.MHA_auto = document.getElementById("MHA_auto").getElementsByClassName("tick")[0].value;
		MHA_global.settings.MHA_ads = document.getElementById("MHA_ads").getElementsByClassName("tick")[0].value;
		MHA_global.settings.MHA_autoaccept = document.getElementById("MHA_autoaccept").getElementsByClassName("tick")[0].value;
		if (MHA_global.settings.MHA_autoaccept == 1) MHA_global.settings.MHA_auto = 1;
		
		window.localStorage.MHA_skin = MHA_global.settings.MHA_skin;
		window.localStorage.MHA_auto = MHA_global.settings.MHA_auto;
		window.localStorage.MHA_ads = MHA_global.settings.MHA_ads;
		
		window.location.reload(1);
	}

	function MHA_tabSettings(tab)
	{
		var x = document.getElementsByClassName('MHAsettingtab');
		for (var i = 0;i < x.length;++i) x[i].style.display = "none";
		x[tab].style.display = "block";
	}

	function initControlPanel()
	{
		allLi = document.getElementsByClassName("MHAsettingli");
		for (i = 0;i < allLi.length;++i) allLi[i].setAttribute("onclick","MHA_global.MHA_checkLi(this);");
		tmp = document.getElementById("MHA_skin").childNodes[MHA_global.settings.MHA_skin];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
		tmp = document.getElementById("MHA_auto").childNodes[MHA_global.settings.MHA_auto];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
		tmp = document.getElementById("MHA_ads").childNodes[MHA_global.settings.MHA_ads];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
		tmp = document.getElementById("MHA_autoaccept").childNodes[MHA_global.settings.MHA_auto];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
		
		document.getElementById("MHA_version").innerHTML = MHA_version;
		if (MHA_version == window.localStorage.MHA_newversion) document.getElementById("MHA_is_uptodate").style.display = "block";
		else if (window.localStorage.MHA_newversion == "error") document.getElementById("MHA_cannot_update").style.display = "block";
		else document.getElementById("MHA_update_available").style.display = "block";
		
		tmp = document.getElementsByClassName('MHAsettinggroup');
		MHA_global.MHA_objects.MHAsettinggroup = tmp;
		i = 0;
		len = MHA_global.MHA_settinggrouplength[i] = 284;
		if (MHA_global.settings.MHA_auto == 1) len = 0;
		tmp[i].style.height = len + "px";
	}
		
	function MHA_checkLi(obj)
	{
		var parent = obj.parentNode;
		for (i = 0;i < parent.childElementCount;++i)
		{
			parent.childNodes[i].setAttribute("aria-checked","false");
			parent.childNodes[i].className = "";
		}
		obj.setAttribute("aria-checked","true");
		obj.className = "tick";
		if (obj.getAttribute("origin") == "true")
		{
			parent.parentNode.className = "MHAsettingvalue";
		}
		else
		{
			parent.parentNode.className = "MHAsettingvalue editted";
		}
	}

	function MHA_toggleGroup(num)
	{
		var state;
		switch (num) {
			case 0: state = "MHA_auto";break;
			case 1: state = "MHA_schedule";break;
			default: break;
		}
		state = document.getElementById(state).getElementsByClassName("tick")[0].value;
		if (state == 1) //1 = OFF
		{
			MHA_global.MHA_objects.MHAsettinggroup[num].style.height = "0px";
			MHA_global.MHA_objects.MHAsettinggroup[num].style.opacity = "0";
		}
		else
		{
			MHA_global.MHA_objects.MHAsettinggroup[num].style.height = MHA_global.MHA_settinggrouplength[num] + "px";
			MHA_global.MHA_objects.MHAsettinggroup[num].style.opacity = "1";
		}
	}

	function MHA_loadControlPanel()
	{
		var popup = new jsDialog();
		popup.setTemplate('ajax');
		popup.addToken('{*prefix*}', MHA_global.cpprefix);
		popup.addToken('{*content*}', '<div id="MHA_iframe"></div>');
		popup.addToken('{*suffix*}', MHA_global.cpsuffix);
		popup.show();
		
		var iframe = document.getElementById('MHA_iframe');
		iframe.width = 646;
		iframe.innerHTML = MHA_global.cpcontent;
		initControlPanel();
		
		delete popup;
	}

	function MHA_loadMobileControlPanel()
	{
		MHA_settingdiv.innerHTML = 	MHA_global.cpprefix + MHA_global.cpcontent + MHA_global.cpsuffix;
		initControlPanel();
	}
	
	function MHA_auto()
	{
		var popup = new jsDialog();
		popup.addToken('{*content*}', '<h1>Too bad, you have been banned !!!</h1>');
		popup.show();
		
		tmp = document.getElementsByClassName('journaldate');
		for (i = 0;i < tmp.length;++i)
			tmp[i].innerText = tmp[i].innerText.substring(0,tmp[i].innerText.indexOf('-')) + " - King's Stockade";
			
		tmp = document.getElementById('hud_location').firstChild.innerText = "King's Stockade";
	}
}