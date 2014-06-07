// ==UserScript==
// @name           MWTurbo 5 Free EDIT 1 CHRISBIMMERMD
// @namespace      http://userscripts.org/users/63868
// @include        *apps*.facebook.com/mobwars*
// @version        5.0 Beta 4
// @copyright      2008, Tim Smart & 'MWTurbo'
// ==/UserScript==
var product_name = "MWTurbo Free Version";
var script_version = "5.0 Beta 4";
var script_timestamp = 1236384796519;
var script_update_url = 'http://www.mwturbo.com/download.php';
var script_menu = '<div style="height:25px;color:#ffffff;background:#3b5998;width:100%;font-size:14px;font-weight:bold;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;text-align:center;padding:6px 0 0 0;">MWTurbo</div> <div id="mwt_menucontent" style="background-color:#ffffff;padding:5px;width:188px;border:solid #3b5998;border-width:0 1px 1px;"> <center> <div id="mwt_menu_links" style="padding:0 0 16px 0;"> <span><button type="button" id="mwt_console" class="inputsubmit">Start MWT</button></span> <button type="button" id="mwt_options" class="inputsubmit">Options</button> </div> <div id="mwt_menu_options" style="display:none;padding:0 0 16px;"> <span id="mwt_reset">Reset MWTurbo</span> <span id="mwt_version">Current Version</span> <button type="button" id="mwt_return" class="inputsubmit">Main Menu</button> </div> <button type="button" id="mwt_pref_button" class="inputsubmit">Preferences</button> </center></div> <div id="sound_player" style="overflow: hidden; height: 0pt; width: 0pt;"></div>';
var pref_html = '<div class="generic_dialog_popup" style="top: 30px;"> <table id="pop_dialog_table" class="pop_dialog_table"> <tbody> <tr> <td class="pop_topleft"></td> <td class="pop_border pop_top"></td> <td class="pop_topright"></td> </tr> <tr> <td class="pop_border pop_side"></td> <td id="pop_content" class="pop_content"> <h2 class="dialog_title"><span>MWTurbo Preferences</span></h2> <div class="dialog_content"> <div class="dialog_body"> <h3 class="mwt_pref_title" style="margin-top:0;">General</h3> <setline> <preflabel>Bank Cash:</preflabel> <input id="pref_bank" type="checkbox" style="display:block;float:left;" /> <description title="Do you want to bank your cash went it reaches the limit?">?</description> </setline> <setline> <preflabel>Bank Limit:</preflabel> <input id="pref_bank_limit" type="text" class="pref number" /> <description title="Bank cash when reaches this amount?">?</description> </setline> <setline> <preflabel>Heal:</preflabel> <input id="pref_heal" type="checkbox" style="display:block;float:left;" /> <description title="Do you want your boss healed when below set health?">?</description> </setline> <setline> <preflabel>Min Health: (%)</preflabel> <input id="pref_min_health" type="text" class="pref number" /> <description title="Minimum health as a %">?</description> </setline> <setline> <preflabel>Max Health: (%)</preflabel> <input id="pref_max_health" type="text" class="pref number" /> <description title="Stops healing once above this %. Maximum is 60%.">?</description> </setline> <setline> <preflabel>Min Refresh:</preflabel> <input id="pref_min_refresh" type="text" class="pref number" /> <description title="Minimum page refresh time in seconds.">?</description> </setline> <setline> <preflabel>Max Refresh:</preflabel> <input id="pref_max_refresh" type="text" class="pref number" /> <description title="Maximum page refresh time in seconds.">?</description> </setline> <setline> <preflabel>Script Repeat:</preflabel> <input id="pref_script_repeat" type="text" class="pref number" /> <span class="infinite">[Infinite]</span> <description title="How many times you want to do a action.">?</description> </setline> <setline> <preflabel>Captcha Sound:</preflabel> <input id="pref_captcha_sound" type="checkbox" style="display:block;float:left;" /> <description title="Do you want to play a sound when a captcha is found?">?</description> </setline> <h3 class="mwt_pref_title">Fight Script</h3> <setline> <preflabel>Stamina:</preflabel> <input id="pref_fight_stamina" type="text" class="pref number" /> <description title="When stamina reaches 0, recharge to this amount.">?</description> </setline> <setline> <preflabel>Max Mob Size:</preflabel> <input id="pref_max_mob_size" type="text" class="pref number" /> <description title="The biggest Mob you want to fight.">?</description> </setline> <setline> <preflabel>Min Mob Size:</preflabel> <input id="pref_min_mob_size" type="text" class="pref number" /> <description title="The smallest Mob you want to fight.">?</description> </setline> <setline> <preflabel>Fight Repeat:</preflabel> <span class="inputlabel">Exp:</span><input id="pref_exp_repeat" name="repeattype" class="prefradio" type="radio" /> <span class="inputlabel">Cash:</span><input id="pref_cash_repeat" name="repeattype" class="prefradio" type="radio" /> <span class="inputlabel">Threshold:</span><input id="pref_repeat_threshold" type="text" class="pref number" /> </setline> <setline> <preflabel>Repeat Limit:</preflabel> <input id="pref_repeat_limit" type="text" class="pref number" /> <span class="infinite">[Infinite]</span> <span class="off">[Off]</span> <description title="Maximum number of times to repeativly attack a Mob.">?</description> </setline> <setline> <preflabel>Ignore Reset:</preflabel> <input id="pref_fight_reset" type="text" class="pref number" /> <span class="off">[Off]</span> <description title="Reset ignore list after this many attacks.">?</description> </setline> <h3 class="mwt_pref_title">Hitlist Script</h3> <setline> <preflabel>Stamina:</preflabel> <input id="pref_hitlist_stamina" type="text" class="pref number" /> <description title="When stamina reaches 0, recharge to this amount.">?</description> </setline> <setline> <preflabel>Min Bounty:</preflabel> <input id="pref_min_bounty" type="text" class="pref number" /> <description title="What is the smallest bounty you want to attack?">?</description> <span class="off">[Off]</span> </setline> <setline> <preflabel>Max Bounty:</preflabel> <input id="pref_max_bounty" type="text" class="pref number" /> <description title="What is the largest bounty you want to attack?">?</description> <span class="off">[Off]</span> </setline> <h3 class="mwt_pref_title">Job Script</h3> <setline> <preflabel>Job Number:</preflabel> <input id="pref_job_number" type="text" class="pref number" /> <description title="What job to do. 1 = Mugging, 2 = House Burglary etc.">?</description> </setline> <h3 class="mwt_pref_title">Defend Script</h3> <setline> <preflabel>Wait Time:</preflabel> <input id="pref_defend_time" type="text" class="pref number" /> <description title="How long to wait before rechecking stats.">?</description> </setline> <h3 class="mwt_pref_title">MWcaptcha Account <span id="mwc_points">My Captcha Points</span></h3> <setline> <preflabel>Enable:</preflabel> <input id="pref_mwcaptcha" type="checkbox" style="display:block;float:left;" /> <description title="If you have a MWcaptcha account and you want to use it, enable this option.">?</description> </setline> <setline> <preflabel>Mode:</preflabel> <span class="inputlabel">Earn Points:</span><input id="pref_mwc_earn" name="mwc" class="prefradio" type="radio" /> <span class="inputlabel">Use Points:</span><input id="pref_mwc_use" name="mwc" class="prefradio" type="radio" /> </setline> <setline> <preflabel>Username:</preflabel> <input id="pref_mwc_username" type="text" class="pref number" /> <description title="Your MWcaptcha Username.">?</description> </setline> <setline> <preflabel>Password:</preflabel> <input id="pref_mwc_password" type="password" class="pref number" /> <description title="Your MWcaptcha Password.">?</description> </setline> </div> <div class="dialog_buttons"> <input id="mwtp_save" value="Save" name="save" class="inputsubmit" type="button"> <input id="mwtp_cancel" value="Cancel" name="cancel" class="inputsubmit inputaux" type="button"> </div> </div> </td> <td class="pop_border pop_side"></td> </tr> <tr> <td class="pop_bottomleft"></td> <td class="pop_border pop_bottom"></td> <td class="pop_bottomright"></td> </tr> </tbody> </table> </div>';
var script_console='<div class="generic_dialog_popup" style="top: 50px;"> <table id="pop_dialog_table" class="pop_dialog_table" style="width:600px !important;"> <tbody> <tr> <td class="pop_topleft"></td> <td class="pop_border pop_top"></td> <td class="pop_topright"></td> </tr> <tr> <td class="pop_border pop_side"></td> <td id="pop_content" class="pop_content"> <h2 class="dialog_title" style="position:relative;"><span>MWTurbo Console</span> <img id="mwt_working" style="display:none; position: absolute; top: 6px; right: 6px;" src="http://www.mwturbo.com/work.gif" /> </h2> <div class="dialog_content"> <div class="dialog_body"> <h3 class="mwt_pref_title" style="margin-top:0;">Stats</h3> <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;"> <tbody> <tr> <td width="50%">Cash: <span id="mwt_cash">$0</span></td> <td width="50%">Health: <span id="mwt_health">0/0</span></td> </tr> <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;"> <tbody> <tr> <td width="50%">Energy: <span id="mwt_energy">0/0</span></td> <td width="50%">Stamina: <span id="mwt_stamina">0/0</span></td> </tr> <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;"> <tbody> <tr> <td width="50%">Total Damage Dealt: <span id="mwt_damaged">0</span></td> <td width="50%">Total Damage Recieved: <span id="mwt_damager">0</span></td> </tr> </tbody> </table> <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;"> <tbody> <tr> <td width="50%">Total $ Won: <span id="mwt_won">$0</span></td> <td width="50%">Total Exp Gain: <span id="mwt_exp">0</span></td> </tr> </tbody> </table> <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;"> <tbody> <tr> <td width="50%">Total Bounties: <span id="mwt_bount">0</span></td> <td width="50%">Total Wins: <span id="mwt_wins">0</span></td> </tr> </tbody> </table> <h3 class="mwt_pref_title">Status</h3> <table id="mwt_status" style="width:100%;border:none:padding:0;margin:0;"> <tbody> <tr> <td class="script_name"><span id="mwt_hitlist">Hitlist</span></td> <td id="status_hitlist">Only available in Full Version</td> </tr> <tr> <td class="script_name"><span id="mwt_fight">Fight</span></td> <td id="status_fight">Only available in Full Version</td> </tr> <tr> <td class="script_name"><span id="mwt_job">Job</span></td> <td id="status_job">Click to begin</td> </tr> <tr> <td class="script_name"><span id="mwt_property">Property</span></td> <td id="status_property">Click to begin</td> </tr> <tr> <td class="script_name"><span id="mwt_defend">Defend</span></td> <td id="status_defend">Click to begin</td> </tr> </tbody> </table> <h3 class="mwt_pref_title">Log</h3> <select multiple="multiple" id="mwt_logger" style="width:100%;height:120px;"></select> <div id="mwt_captcha_box" style="display:none;"><h3 class="mwt_pref_title">Captcha Found!</h3> <img id="captcha_image" style="display: block;float:left;" src="" alt="captcha" /> <input id="captcha_answer" style="display: block;float:left;width: 150px;margin:18px 0 0 15px;" type="text" /> <input id="captcha_submit" style="display: block;float:left;margin: 17px 0pt 0pt 15px;" value="Submit" name="save" class="inputsubmit" type="button"> <div style="clear:both;"></div></div> <div id="mwc_captcha_box" style="display:none;"><h3 class="mwt_pref_title">You have a MWcaptcha to solve!</h3> <img id="mwcaptcha_image" style="display: block;float:left;" src="" alt="captcha" /> <input id="mwcaptcha_answer" style="display: block;float:left;width: 150px;margin:18px 0 0 15px;" type="text" /> <input id="mwcaptcha_submit" style="display: block;float:left;margin: 17px 0pt 0pt 15px;" value="Submit" name="save" class="inputsubmit" type="button"> <div style="clear:both;"></div></div> </div> <div class="dialog_buttons"> <input id="mwtc_close" value="Shut Down" name="save" class="inputsubmit" type="button"> </div> </div> </td> <td class="pop_border pop_side"></td> </tr> <tr> <td class="pop_bottomleft"></td> <td class="pop_border pop_bottom"></td> <td class="pop_bottomright"></td> </tr> </tbody> </table> </div>';
var script_announce='<div class="generic_dialog_popup" style="top: 95px;"> <table id="pop_dialog_table" class="pop_dialog_table"> <tbody> <tr> <td class="pop_topleft"></td> <td class="pop_border pop_top"></td> <td class="pop_topright"></td> </tr> <tr> <td class="pop_border pop_side"></td> <td id="pop_content" class="pop_content"> <h2 class="dialog_title"><span id="a_title"></span></h2> <div class="dialog_content"> <div id="a_content" class="dialog_body"></div> <div class="dialog_buttons"> <input id="mwta_close" value="Close" name="cancel" class="inputsubmit inputaux" type="button"> </div> </div> </td> <td class="pop_border pop_side"></td> </tr> <tr> <td class="pop_bottomleft"></td> <td class="pop_border pop_bottom"></td> <td class="pop_bottomright"></td> </tr> </tbody> </table> </div>';
var script_css = "div#mwt_menu { position:fixed; bottom:27px; right:2px; width:200px; overflow:hidden; z-index:10; } div#mwt_menu_links span, div#mwt_menu_options span { display:block; color:#3B5998; cursor:pointer; margin:16px 0; } div#mwt_menu_links span:hover, div#mwt_menu_options span:hover { text-decoration:underline; } h3.mwt_pref_title { margin:3px 0; padding:0; color:#333333; font-size:13px; font-weight:bold; width:100%; border:solid #D8DFEA; border-width:0 0 1px; } table.mwt_stats td { color:gray; } table.mwt_stats span { color:#000000; font-size:12px; } table#mwt_status td { color:gray; font-size:11px; vertical-align:baseline; } table#mwt_status span{ font-size:14px; color:#BF0000; cursor:pointer; padding:0 10px 0 0; } table#mwt_status span:hover{ text-decoration:underline; } span.running { color:#00AA00 !important; } td.script_name { text-align:right; width:70px; } select#mwt_logger option{ padding: 6px 0pt 0pt; height:18px; font-size: 9px; } setline { margin:0; padding:0; display:block; overflow:hidden; height:22px; } preflabel { margin:0; padding:4px 0 0; font-size:11px; display:block; float:left; width:90px; color:gray; clear:left; } description { display:block; height:18px; width:18px; background-color:#3B5998; font-size:12px; font-weight:bold; color:#FFF; float:right; clear:right; text-align:center; cursor:help; } input.pref { display: block; float:left; border:1px solid #BDC7D8; padding:3px; font-size:11px; } input.number { width:79px; } input.small { width:30px !important; } input.string { width:100px; } input.prefradio { display:block; float:left; } span.inputlabel { margin:0; padding:4px 2px 0 3px; font-size:11px; display:block; float:left; color:#000000; } span.infinite, span.off { display:block; float:left; padding:3px 2px 0; color:#3B5998; cursor:pointer; } span.infinite:hover, span.off:hover { text-decoration:underline; } span#mwc_points{ text-decoration:underline; color:#3B5998; font-size:11px; cursor:pointer; }";

/**
 * Function: Script Update Checker
 * Description: Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
var version_scriptNum=41406; // Change this to the number given to the script by userscripts.org (check the address bar)
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/script_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > script_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

var Page={};
var Menu={};
var Console={};
var Preferences={};
var Boss={
	cash:0,
	cash_str:'$0',
	stamina:0,
	stamina_total:0,
	energy:[0,0],
	health:1
};
var Cache={};
var Task={};
var Job={};
var Property={};
var Defend={};
var Ajax=function(url,fn,method)
{
	method=method || 'GET';
	method=method.toUpperCase();
	var data='';
	if(method=='POST')
	{
		url=url.match(new RegExp('(.*)\\?(.*)'));
		GM_xmlhttpRequest({
			method:'POST',
			url:url[1],
			data:url[2],
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:fn
		});
		return;
	}
	GM_xmlhttpRequest({
		method:'GET',
		url:url,
		onload:fn
	});
	return;
};
var Utility={};
var Settings=default_settings={
	bank:false,
	bank_limit:1000000,
	heal:true,
	min_health:0.25,
	max_health:0.6,
	invite:false,
	captcha_sound:false,
	fight_stamina:5,
	max_mob_size:20,
	min_mob_size:5,
	fight_repeat:true,
	repeat_type:'exp',
	repeat_threshold:10,
	repeat_limit:-1,
	fight_reset:0,
	script_repeat:-1,
	hitlist_stamina:1,
	min_refresh:1,
	max_refresh:4,
	min_bounty:0,
	max_bounty:0,
	job_number:1,
	defend_time:30,
	defend_refresh:true,
	mwcaptcha:false,
	mwc_earn:true,
	mwc_use:false,
	mwc_username:'',
	mwc_password:''
};
Page.domain="http://apps.facebook.com";
Page.init=function()
{
	Menu.init();
	Preferences.update();
	Mwcaptcha.username=Settings.mwc_username;
	Mwcaptcha.password=Settings.mwc_password;
	return;
};
Mwcaptcha={
	trans_id:'',
	image:'',
	solution:'',
	username:'',
	password:'',
	stop:false,
	solving:false,
	getting:false,
	add:function(image)
	{
		GM_xmlhttpRequest({
			method:'POST',
			url:'https://www.mwturbo.com/mwcaptcha/api.php',
			data:'act=add&username='+escape(this.username)+'&password='+escape(this.password)+'&image='+escape(image),
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(xhr)
			{
				var resp=xhr.responseText;
				if(resp=="USERNAME")
				{
					alert('MWcaptcha Username is missing!');
				}
				else if(resp=="PASSWORD")
				{
					alert('MWcaptcha Password is missing or incorrect!');
				}
				else if(resp=="SUBMIT")
				{
					return;
				}
				else if(resp=="POINTS")
				{
					alert('You don\t have enough MWcaptcha points!');
				}
				else if(resp=="SUSPEND")
				{
					alert('Your MWcaptcha account has been suspended due to incorrect answers!');
				}
				else if(Mwcaptcha.stop==false)
				{
					Mwcaptcha.trans_id=resp;
					if(Mwcaptcha.getting==false)
					{
						Mwcaptcha.getting=true;
						Mwcaptcha.get();
					}
				}
				return;
			}
		});
	},
	get:function()
	{
		GM_xmlhttpRequest({
			method:'POST',
			url:'https://www.mwturbo.com/mwcaptcha/api.php',
			data:'act=get&trans_id='+escape(this.trans_id),
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(xhr)
			{
				var resp=xhr.responseText;
				if(resp=="TRANS_ID")
				{
					alert('MWcaptcha Transaction ID is missing or invalid!');
				}
				else if(resp=="POINTS")
				{
					alert('You don\t have enough MWcaptcha points!');
				}
				else if(resp=="CONTINUE"&&Mwcaptcha.stop==false)
				{
					if(Mwcaptcha.getting==true)
					{
						Mwcaptcha.get();
						return;
					}
				}
				else if(Mwcaptcha.stop==false)
				{
					Mwcaptcha.getting=false;
					Page.captcha_submit(resp);
				}
				Mwcaptcha.getting=false;
				return;
			}
		});
	},
	result:function(success)
	{
		if(success==false)
		{
			success="FAIL";
		}
		else
		{
			success="SUCCESS";
		}
		GM_xmlhttpRequest({
			method:'POST',
			url:'https://www.mwturbo.com/mwcaptcha/api.php',
			data:'act=result&trans_id='+escape(this.trans_id)+'&result='+escape(success),
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(xhr)
			{
				var resp=xhr.responseText;
				if(resp=="TRANS_ID")
				{
					alert('MWcaptcha Transaction ID is missing or invalid!');
				}
				else if(resp=="ANSWER")
				{
					alert('MWcaptcha Result missing!');
				}
				return;
			}
		});
	},
	solve:function()
	{
		GM_xmlhttpRequest({
			method:'POST',
			url:'https://www.mwturbo.com/mwcaptcha/api.php',
			data:'act=solve&username='+escape(this.username)+'&password='+escape(this.password),
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(xhr)
			{
				var resp=xhr.responseText;
				if(resp=="USERNAME")
				{
					alert('MWcaptcha Username is missing!');
				}
				else if(resp=="PASSWORD")
				{
					alert('MWcaptcha Password is missing or incorrect!');
				}
				else if(resp=="SUSPEND")
				{
					alert('Your MWcaptcha account has been suspended due to incorrect answers!');
				}
				else if(resp=="CONTINUE"&&Mwcaptcha.stop===false)
				{
					if(Settings.mwc_earn===true&&Mwcaptcha.solving===true)
					{
						Mwcaptcha.solve();
						return;
					}
				}
				else if(Mwcaptcha.stop===false)
				{
					Mwcaptcha.image=resp;
					Mwcaptcha.solving=false;
					Page.show_mwcaptcha();
				}
				Mwcaptcha.solving=false;
				return;
			}
		});
	},
	answer:function()
	{
		GM_xmlhttpRequest({
			method:'POST',
			url:'https://www.mwturbo.com/mwcaptcha/api.php',
			data:'act=answer&username='+escape(this.username)+'&password='+escape(this.password)+'&answer='+escape(this.solution),
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(xhr)
			{
				var resp=xhr.responseText;
				if(resp=="USERNAME")
				{
					alert('MWcaptcha Username is missing!');
				}
				else if(resp=="PASSWORD")
				{
					alert('MWcaptcha Password is missing or incorrect!');
				}
				else if(resp=="ANSWER")
				{
					alert('MWcaptcha Answer is missing!');
				}
				else if(resp=="SUSPEND")
				{
					alert('Your MWcaptcha account has been suspended due to incorrect answers!');
				}
				else if(resp=="EXPIRED"&&Mwcaptcha.stop==false)
				{
					alert('You took too long! You only have 35 seconds to solve someone elses Captcha!');
					if(Settings.mwc_earn==true&&Mwcaptcha.solving==false)
					{
						Mwcaptcha.solving=true;
						Mwcaptcha.solve();
					}
				}
				else if(resp=="SUCCESS"&&Mwcaptcha.stop==false)
				{
					if(Settings.mwc_earn==true&&Mwcaptcha.solving==false)
					{
						Mwcaptcha.solving=true;
						Mwcaptcha.solve();
					}
				}
				return;
			}
		});
	},
	points:function()
	{
		GM_xmlhttpRequest({
			method:'POST',
			url:'https://www.mwturbo.com/mwcaptcha/api.php',
			data:'act=points&username='+escape(this.username),
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(xhr)
			{
				var resp=xhr.responseText;
				if(resp=="USERNAME")
				{
					alert('MWcaptcha Username is missing!');
				}
				else
				{
					alert('You have '+resp+' MWcaptcha Captcha points.');
				}
				return;
			}
		});
	}
};
Page.toggle=function(script)
{
	var switching=false;
	if(script=='job')
	{
		if(Job.running)
		{
			Job.log('Stopped running');
			Job.running=false;
		}
		else
		{
			switching=true;
			Job.init();
		}
	}
	else if(script=='property')
	{
		if(Property.running)
		{
			Property.log('Stopped running');
			Property.running=false;
		}
		else
		{
			switching=true;
			Property.init();
		}
	}
	else if(script=='defend')
	{
		if(Defend.running)
		{
			Defend.log('Stopped running');
			Defend.running=false;
		}
		else
		{
			switching=true;
			Defend.init();
		}
	}
	if(switching)
	{
		$('#mwt_'+script).className='running';
	}
	else
	{
		$('#status_'+script).innerHTML='Click to begin';
		$('#mwt_'+script).className='';
	}
	if(Job.running||Property.running||Defend.running)$('#mwt_working').style.display='block';
	else $('#mwt_working').style.display='none';
	return;
};
Page.bcast=function(script)
{
	if(script=='job')
	{
		return Job.running;
	}
	else if(script=='property')
	{
		return Property.running;
	}
	else if(script=='defend')
	{
		return Defend.running;
	}
	return null;
};
Page.wait=function()
{
	var refresh_range = Settings.max_refresh - Settings.min_refresh + 1;
	return Math.floor(Math.random() * refresh_range + Settings.min_refresh);
};
Page.pausing=false;
Page.pause_cbs=[];
Page.pause_cb=function(cb)
{
	for(var i=Page.pause_cbs.length-1;i>=0;i--)
	{
		if (Page.pause_cbs[i].toSource()==cb.toSource())
		{
			return;
		}
	};
	Page.pause_cbs.push(cb);
	return;
};
Page.resume=function()
{
	Page.pausing=false;
	Page.special_pause=false;
	for(var i=0;i<Page.pause_cbs.length;i++)
	{
		var cb=Page.pause_cbs[i];
		cb();
	}
	Page.pause_cbs=[];
	return;
};
Page.halt=function()
{
	Job.running=false;
	Property.running=false;
	Defend.running=false;
	return;
};
Page.captcha_data={
	data:'',
	url:''
};
Page.special_pause=false;
Page.captcha_src='';
Page.captcha=function(html)
{
	if(html.match('Are You Human?'))
	{
		if(Page.pausing)return;
		Page.pausing=true;
		var ire=new RegExp('src="(http://.*?/img/captcha.*?)"');
		var fa_re=new RegExp('method="post" action="(.*?)"');
		var a_re=new RegExp('type="hidden" (?:name="action"|value="(.*?)") (?:name="action"|value="(.*?)")');
		Page.captcha_data.url=html.match(fa_re)[1];
		if(m=html.match(a_re))
		{
			if(m[1])
			{
				var action=m[1];
			}
			else
			{
				var action=m[2];
			}
		}
		var image=html.match(ire)[1];
		image=image.replace(new RegExp('&amp;','g'),'&');
		Page.captcha_src=image;
		if(Settings.mwcaptcha&&Settings.mwc_use)
		{
			$('#captcha_answer').disabled=true;
			$('#captcha_answer').value="Waiting to be answered";
			Mwcaptcha.add(Page.captcha_src);
		}
		Page.captcha_data.image=escape(image);
		$('#captcha_image').src=image+'&tmp=1';
		$('#mwt_captcha_box').style.display='';
		Page.captcha('refresh');
		Page.captcha_data.data='cap_action=bust_cap&action='+action+'&cap_answer=';
		if(Settings.captcha_sound)
		{
			Page.captcha('play');
		}
		return true;
	}
	else if(html.match('Enter the number in the box')) // Hitlist captcha
	{
		if(Page.pausing)return;
		Page.pausing=true;
		var ire=new RegExp('src="(http://.*?/img/captcha_image.*?)"');
		var fa_re=new RegExp('method="post" action="(.*?)"');
		Page.captcha_data.url=html.match(fa_re)[1];
		var image=html.match(ire)[1];
		image=image.replace(new RegExp('&amp;','g'),'&');
		Page.captcha_src=image;
		if(Settings.mwcaptcha&&Settings.mwc_use)
		{
			$('#captcha_answer').disabled=true;
			$('#captcha_answer').value="Waiting to be answered";
			Mwcaptcha.add(Page.captcha_src);
		}
		Page.captcha_data.image=escape(image);
		$('#captcha_image').src=image+'&tmp=1';
		$('#mwt_captcha_box').style.display='';
		Page.captcha('refresh');
		Page.captcha_data.data='action=allow_access&cap_value=';
		if(Settings.captcha_sound)
		{
			Page.captcha('play');
		}
		return true;
	}
	else if(html.match('This page is being heavily rate limited'))
	{
		Page.special_pause=true;
		Page.pausing=true;
		$('#a_title').innerHTML='Page being heavily rate limited!';
		$('#a_content').innerHTML='This Mob Wars page is being heavily rate limited. Wait for the timer to finish or click \'Retry\' to continue';
		$('#mwt_a').style.display='';
		if(Console.a_timer)
		{
			Console.a_timer.stop();
		}
		Console.a_timer=new Utility.a_timer({
			time:180,
			message:'Retry [[time]]',
			fn:function()
			{
				Page.resume();
				Console.a_close();
				return;
			}
		});
		Console.a_timer.start();
		return true;
	}
	else if(html=='play')
	{
		if(Page.pausing)
		{
			Utility.play_sound('http://www.mwturbo.com/sound.wav');
			setTimeout(Page.captcha,180000,'play');
		}
	}
	else if(html=='refresh')
	{
		if(Page.pausing)
		{
			$('#captcha_image').src=Page.captcha_src+'&tmp='+new Date().getTime();
			setTimeout(Page.captcha,5000,'refresh');
		}
	}
	return false;
};
Page.captcha_submit=function(answer)
{
	answer=answer||$('#captcha_answer').value;
	$('#mwt_captcha_box').style.display='none';
	Page.captcha_data.answer=answer;
	Ajax(Page.captcha_data.url+'?'+Page.captcha_data.data+answer,function(xhr)
	{
		Page.resume();
		Boss.update(xhr.responseText);
		Page.captcha(xhr.responseText);
		if(Settings.mwc_use)
		{
			Page.send_catpcha();
		}
		return;
	},'POST');
	return;
};
Page.send_catpcha=function()
{
	if(Page.pausing!=true)
	{
		Mwcaptcha.result(true);
	}
	else
	{
		Mwcaptcha.result(false);
	}
	return;
};
Page.show_mwcaptcha=function()
{
	Page.mwcaptcha_showing=true;
	$('#mwcaptcha_image').src=Mwcaptcha.image;
	$('#mwc_captcha_box').style.display="";
	Page.mwcaptcha_refresh();
	if(Settings.captcha_sound)
	{
		Utility.play_sound('http://www.mwturbo.com/sound.wav');
	}
	return;
};
Page.mwcaptcha_refresh=function()
{
	if(Page.mwcaptcha_showing)
	{
		$('#mwcaptcha_image').src=Mwcaptcha.image+'&tmp='+new Date().getTime();
		setTimeout(Page.mwcaptcha_refresh,5000);
	}
	return;
}
Page.mwcaptcha_submit=function()
{
	Page.mwcaptcha_showing=false;
	var answer=$('#mwcaptcha_answer').value;
	Mwcaptcha.solution=answer;
	Mwcaptcha.answer();
	$('#mwc_captcha_box').style.display="none";
};
Menu.init=function()
{
	GM_addStyle(script_css);
	//MWH Check
	if(mwh=$('#ScriptStatus'))
	{
		mwh.style.right='0';
		mwh.style.left='1px';
	}
	var div=document.createElement('div');
	div.id='mwt_menu';
	div.innerHTML=script_menu;
	document.body.insertBefore(div,document.body.lastChild);
	Event.add('#mwt_console','click',function()
	{
		if(Console.visable)
		{
			return;
		}
		Console.toggle();
		return;
	});
	Event.add('#mwt_return','click',function()
	{
		Menu.toggle('links');
		return;
	});
	Event.add('#mwt_options','click',function()
	{
		Menu.toggle('options');
		return;
	});
	Event.add('#mwt_pref_button','click',function()
	{
		if(Preferences.displayed)
		{
			return;
		}
		Preferences.show();
		return;
	});
	Event.add('#mwt_reset','click',function()
	{
		GM_setValue('preferences','null');
		Preferences.update();
		alert('MWTurbo has been reset!');
		return;
	});
	Event.add('#mwt_version','click',function()
	{
		alert(product_name+"\n"+"Version: "+script_version+"\n"+"Version Timestamp: "+script_timestamp);
		return;
	});
	return;
};
Menu.toggle=function(page)
{
	var divs=$('div*a=id|mwt_menu_.*',$('#mwt_menu'));
	for(var i=0;i<divs.length;i++)
	{
		var div = divs[i];
		div.style.display = 'none';
	}
	$('#mwt_menu_'+page).style.display='';
	return true;
};
Console.visable=false;
Console.toggle=function()
{
	if(this.visable)
	{
		Page.halt();
		Mwcaptcha.stop=true;
		var console=$('#mwt_console_pop');
		console.parentNode.removeChild(console);
		this.visable=false;
		return;
	}
	var div=document.createElement('div');
	div.setAttribute('style','z-index:99 !important;');
	div.id="mwt_console_pop";
	div.className="generic_dialog pop_dialog";
	div.innerHTML=script_console;
	document.body.insertBefore(div, document.body.lastChild);
	var div=document.createElement('div');
	div.setAttribute('style','z-index:100 !important;display:none;');
	div.id="mwt_a";
	div.className="generic_dialog pop_dialog";
	div.innerHTML=script_announce;
	document.body.insertBefore(div, $('#mwt_console_pop'));
	Event.add('#mwtc_close','click',function()
	{
		Console.toggle();
		return;
	});
	Event.add($('span',$('#mwt_status')),'click',function()
	{
		Page.toggle(this.id.match(/mwt_(.+)/)[1]);
		return;
	});
	Event.add('#captcha_submit','click',function()
	{
		Page.captcha_submit();
		return;
	});
	Event.add('#mwcaptcha_submit','click',function()
	{
		Page.mwcaptcha_submit();
		return;
	});
	Event.add('#mwta_close','click',Console.a_close);
	Boss.update(document.body.innerHTML);
	this.visable=true;
	if(Settings.mwcaptcha&&Settings.mwc_earn)
	{
		Mwcaptcha.stop=false;
		if(Mwcaptcha.solving==false)
		{
			Mwcaptcha.solving=true;
			Mwcaptcha.solve();
		}
	}
	return;
};
Console.log_memory=[];
Console.log=function(details)
{
	if(!details)
	{
		return;
	}
	var time=new Date();
	var min=time.getMinutes();
	var seconds=time.getSeconds();
	if (10>min)
	{
		min='0'+min;
	}
	if(10>seconds)
	{
		seconds='0'+seconds;
	}
	details.push({name:'Time',value:time.getHours()+':'+min+':'+seconds});
	Console.log_memory.push(details);
	var h="<option>";
	for(var i=0;i<details.length;i++)
	{
		h+=details[i].name+": "+details[i].value+"; ";
	}
	h+="</option>";
	var log=$('#mwt_logger');
	log.innerHTML=h+log.innerHTML;
	var options=$('option',log);
	if(options.length>=100)
	{
		options[options.length-1].parentNode.removeChild(options[options.length-1]);
	}
	return;
};
Console.clear=function()
{
	$('#mwt_logger').innerHTML='';
	return;
};
Console.status=function(script,str)
{
	$('#status_'+script).innerHTML=str;
	return;
};
Console.update_stats=function()
{
	$('#mwt_cash').innerHTML=Boss.cash_str;
	$('#mwt_health').innerHTML=Math.floor(Boss.health*100)+'%';
	$('#mwt_energy').innerHTML=Boss.energy[0]+'/'+Boss.energy[1];
	$('#mwt_stamina').innerHTML=Boss.stamina+'/'+Boss.stamina_total;
	return;
};
Console.a_timer=null;
Console.announce=function(details)
{
	$('#a_title').innerHTML=details.title;
	$('#a_content').innerHTML=details.content;
	$('#mwt_a').style.display='';
	if(Console.a_timer)
	{
		Console.a_timer.stop();
	}
	Console.a_timer=new Utility.a_timer({
		time:5,
		message:'Close [[time]]',
		fn:Console.a_close
	});
	Console.a_timer.start();
	return;
};
Console.a_close=function()
{
	if(Console.a_timer)
	{
		Console.a_timer.stop();
	}
	$('#mwt_a').style.display='none';
	if(Page.special_pause===true)
	{
		Page.resume();
	}
	return;
};
Preferences.displayed = false;
Preferences.show = function()
{
	this.update();
	this.temp = Settings;
	var div = document.createElement('div');
	div.className = 'generic_dialog pop_dialog';
	div.id = 'mwt_pref';
	div.innerHTML = pref_html;
	document.body.insertBefore(div, document.body.lastChild);
	var prefs=$('#mwt_pref');
	Event.add($('#mwtp_save'), 'click', function()
	{
		var pref=$('#mwt_pref');
		Settings = Preferences.temp;
		Preferences.save();
		pref.parentNode.removeChild(pref);
		Preferences.displayed = false;
		return true;
	});
	
	Event.add($('#mwtp_cancel'), 'click', function()
	{
		var pref=$('#mwt_pref');
		pref.parentNode.removeChild(pref);
		Preferences.displayed = false;
		return true;
	});
	// Prefrence setting events
	Event.add($('input',prefs),'change',function()
	{
		Preferences.change_temp_value(this);
		return true;
	});
	Event.add($('span.infinite',prefs),'click',function()
	{
		var input = this.parentNode.getElementsByTagName('input')[0];
		input.value = -1;
		Preferences.change_temp_value(input);
		return true;
	});
	Event.add($('span.off',prefs),'click',function()
	{
		var input = this.parentNode.getElementsByTagName('input')[0];
		input.value = 0;
		Preferences.change_temp_value(input);
		return true;
	});
	// Add MWcaptcha points link event
	Event.add('#mwc_points','click',function()
	{
		Mwcaptcha.username=Settings.mwc_username;
		Mwcaptcha.password=Settings.mwc_password;
		Mwcaptcha.points();
		return;
	});
	// Inject Values
	var inputs = $('input',prefs);
	for (var i=0;i<inputs.length;i++)
	{
		var id = '';
		var input = inputs[i];
		if (id = input.id.match(/pref_(.+)/))
		{
			id = id[1];
			if(input.type == 'checkbox')
			{
				input.checked = eval('this.temp.' + id);
			}
			else if(input.type=='radio')
			{
				input.checked = eval('this.temp.' + id);
			}
			else
			{
				input.value = eval('this.temp.'+id);
			}
		}
	}
	$('#pref_min_health').value = this.temp.min_health * 100;
	$('#pref_max_health').value = this.temp.max_health * 100;
	if (this.temp.repeat_type == 'cash')
	{
		$('#pref_cash_repeat').checked = true;
	}
	else
	{
		$('#pref_exp_repeat').checked = true;
	}
	if (this.temp.mwc_earn == true)
	{
		$('#pref_mwc_earn').checked = true;
	}
	else
	{
		$('#pref_mwc_use').checked = true;
	}
	this.displayed = true;
	return true;
};
Preferences.change_temp_value = function(a)
{
	var id = a.id;
	if (id == 'pref_exp_repeat')
	{
		this.temp.repeat_type = 'exp';
	}
	else if (id == "pref_mwc_earn")
	{
		this.temp.mwc_earn = true;
		this.temp.mwc_use = false;
	}
	else if (id == "pref_mwc_use")
	{
		this.temp.mwc_earn = false;
		this.temp.mwc_use = true;
	}
	else if (id == 'pref_cash_repeat')
	{
		this.temp.repeat_type = 'cash';
	}
	else if (id == 'pref_min_health')
	{
		this.temp.min_health = a.value / 100;
	}
	else if (id == 'pref_max_health')
	{
		if (a.value > 60)
		{
			a.value = 60;
		}
		this.temp.max_health = a.value / 100;
	}
	else if (id == 'pref_mwc_username')
	{
		this.temp.mwc_username = a.value;
	}
	else if (id == 'pref_mwc_password')
	{
		this.temp.mwc_password = a.value;
	}
	else
	{
		var var_name = a.id.replace('pref_', '');
		if (a.type == 'checkbox')
		{
			eval('this.temp.' + var_name + ' = a.checked;');
		}
		else if (a.type == 'radio')
		{
			eval('this.temp.' + var_name + ' = a.checked;');
		}
		else
		{
			var value=(parseInt(a.value,0)==-1)?-1:Utility.make_number(a.value);
			eval('this.temp.' + var_name + ' = value;');
		}
	}
	return true;
};
Preferences.save = function()
{
	GM_setValue('preferences', Settings.toSource());
	if(Settings.mwc_earn)
	{
		Mwcaptcha.getting=false;
	}
	else if(Settings.mwc_use)
	{
		Mwcaptcha.solving=false;
	}
	Mwcaptcha.username=Settings.mwc_username;
	Mwcaptcha.password=Settings.mwc_password;
	return true;
};
Preferences.update = function()
{
	var save = eval(GM_getValue('preferences',null));
	if (save)
	{
		Settings=save;
	}
	else
	{
		Settings=default_settings;
	}
	this.save();
	return true;
};
Boss.update=function(html)
{
	if(m=html.match(/<span id="app8743457343_cur_cash" fbcontext=".*?">(.*?)<\/span>/))
	{
		Boss.cash_str=m[1];
		Boss.cash=Utility.make_number(Boss.cash_str);
	}
	if(m=html.match(new RegExp('<span id="app8743457343_cur_health" fbcontext=".*?">(.*?)</span>/([0-9]*)')))
	{
		Boss.health=parseInt(m[1],0)/parseInt(m[2],0);
	}
	if(m=html.match(new RegExp('<span id="app8743457343_cur_energy" fbcontext=".*?">(.*?)</span>/([0-9]*)')))
	{
		Boss.energy=[parseInt(m[1],0),parseInt(m[2],0)];
	}
	if(m=html.match(new RegExp('<span id="app8743457343_cur_recovery" fbcontext=".*?">(.*?)</span>/([0-9]*)')))
	{
		Boss.stamina=parseInt(m[1],0);
		Boss.stamina_total=parseInt(m[2],0);
	}
	Console.update_stats();
	return;
};
// The useful functions
Utility.make_number = function(string)
{
	var number = 0;
	var number_string = '';
	for (var i = 0; i < string.length; i++)
	{
		var character = string.charAt(i);
		if (parseInt(character,0) || parseInt(character,0) == 0)
		{
			number_string += parseInt(character,0);
		}
	}
	number = parseInt(number_string,0);
	return number;
};
Utility.a_timer=function(details)
{
	this.fn = details.fn||function(){};
	if(details.time==0)
	{
		this.time=0;
	}
	else
	{
		this.time = details.time||5;
	}
	this.message = details.message||false;
	this.stopping=false;
	this.stop=function(){this.stopping=true;return;};
	this.start = function()
	{
		if(this.stopping)
		{
			this.stopping=false;
			return;
		}
		this.time = parseInt(this.time,0);
		if (this.message)
		{
			var html = this.message.replace('[time]', this.time);
			$('#mwta_close').value=html;
		}
		if (this.time > 0)
		{
			this.time = this.time - 1;
			var func = function(ob)
			{
				ob.start();
			};
			setTimeout(func, 1000, this);
		}
		else
		{
			this.fn();
		}
		return true;
	};
	return;
};
Utility.timer = function (details)
{
	this.fn = details.fn||function(){};
	if(details.time==0)
	{
		this.time=0;
	}
	else
	{
		this.time = details.time||5;
	}
	this.message = details.message||false;
	this.script = details.script||false;
	this.stopping=false;
	this.stop=function(){this.stopping=true;return;};
	this.start = function()
	{
		if(Page.bcast(this.script)===false||this.stopping)
		{
			return;
		}
		this.time = parseInt(this.time,0);
		if (this.message)
		{
			var html = this.message.replace('[time]', Utility.seconds_to_string(this.time));
			Console.status(this.script,html);
		}
		if (this.time > 0)
		{
			this.time = this.time - 1;
			var func = function(ob)
			{
				ob.start();
			};
			setTimeout(func, 1000, this);
		}
		else
		{
			this.fn();
		}
		return true;
	};
	return;
};
Utility.seconds_to_string = function(seconds)
{
	if (seconds>60)
	{
		var minutes = Math.floor(seconds/60);
		seconds = seconds - (minutes*60);
		if (minutes>60)
		{
			var hours = Math.floor(minutes/60);
			minutes = minutes-(hours*60);
			return hours+'h:'+minutes+'m:'+seconds+'s';
		}
		return minutes+'m:'+seconds+'s';
	}
	return seconds+'s';
};
Utility.int_dollars=function(num)
{
	num = num || 0;
	var str = "";
	var tmp;
	while (num >= 1000)
	{
		var tmp = num % 1000;
		if (tmp > 99) tmp = "" + tmp;
		else if (tmp > 9) tmp = "0" + tmp;
		else tmp = "00" + tmp;
		str = "," + tmp + str;
		num = Math.floor(num / 1000);
	}
	str = "$" + num + str;
	return str;
};
Utility.play_sound = function(src)
{
	var html = '<embed src="'+src+'" hidden="true" autostart="true" loop="false">';
	$('#sound_player').innerHTML = html;
	return true;
};
function $(a,b){if(!a){return null;}b=b||document;if(typeof a=="string"){if(s=a.match(/^(\\*|.*?)(?:([#.*@<])(.*))?$/)){var c=s[1];if(c==""){c="*";}var d=s[2];a=s[3];}else{return;}if(d=="#"){return b.getElementById(a);}else{if(d=="."){var e=[];var f=b.getElementsByTagName(c);var g=new RegExp("\\b"+a+"\\b");for(var i=0;i<f.length;i++){if(f[i].className.match(g)){e.push(f[i]);}}if(1>e.length){return null;}return e;}else{if(d=="@"){var h=new Array();var j=document.evaluate(a,b,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);var n;while(n=j.iterateNext()){h.push(n);}return h;}else{if(d=="*"){var e=[];if(s=a.match(/(.+?)(?:=(.*?))?\|(.*)/)){var k=s[1];var l=s[2];var m=s[3];}else{return;}var g=new RegExp(m);var f=b.getElementsByTagName(c);if(k=="h"){for(var i=0;i<f.length;i++){if(f[i].innerHTML.match(g)){e.push(f[i]);}}}else{if(k=="t"){for(var i=0;i<f.length;i++){if(f[i].textContent.match(g)){e.push(f[i]);}}}else{if(k=="a"){for(var i=0;i<f.length;i++){if(el=f[i].getAttribute(l)){if(el.match(g)){e.push(f[i]);}}}}}}if(1>e.length){return null;}return e;}else{return b.getElementsByTagName(c);}}}}}else{if(a.nodeType){return a;}else{if(a[0].nodeType){return a;}}}return null;};
var Event={
	add:function(el,type,fn)
	{
		var els=$(el);
		if(els.nodeType)
		{
			els.addEventListener(type,fn,false);
			return;
		}
		else if(els)
		{
			for(var i=0;i<els.length;i++)
			{
				els[i].addEventListener(type,fn,false);
			}
			return;
		}
		return null;
	}
};
String.prototype.trim = function()
{
	return this.replace(/^\s*|\s*$/g,'');
};
String.prototype.ltrim = function()
{
	return this.replace(/^\s*/g,'');
};
String.prototype.rtrim = function()
{
	return this.replace(/\s*$/g,'');
};
//The scripts
//Cache variables
Cache.banking=false;
Cache.healing=false;
Cache.bank_cb=null;
Cache.heal_cb=null;
Cache.heal_v=false;
Cache.tdd=0;
Cache.tdr=0;
Cache.tw=0;
Cache.texp=0;
Cache.tb=0;
Cache.twins=0;
//General Tasks
Task.bank=function(cb)
{
	Cache.banking=true;
	if(cb)
	{
		Cache.bank_cb=cb;
	}
	Ajax(Page.domain+'/mobwars/bank/do.php?action=deposit&deposit_amount='+Boss.cash,function(xhr)
	{
		Page.captcha(xhr.responseText);
		if(Page.pausing===true){Page.pause_cb(function(){Task.bank();return;});return;};
		Cache.banking=false;
		Boss.update(xhr.responseText);
		Cache.bank_cb();
		return;
	},'POST');
	return;
};
Task.heal=function(cb)
{
	Cache.healing=true;
	if(cb)
	{
		Cache.heal_cb=cb;
	}
	if(Cache.heal_v===false)
	{
		Ajax(Page.domain+'/mobwars/hospital/',function(xhr)
		{
			Page.captcha(xhr.responseText);
			if(Page.pausing===true){Cache.heal_v=false;Page.pause_cb(function(){Task.heal();return;});return;};
			Boss.update(xhr.responseText);
			if(m=xhr.responseText.match(/<input type="hidden" name="verify" value="(.*?)" \/>/))
			{
				Cache.heal_v=m[1];
			}
			else if(m=xhr.responseText.match(/<input type="hidden" value="(.*?)" name="verify" \/>/))
			{
				Cache.heal_v=m[1];
			}
			Task.heal();
			return;
		});
	}
	else
	{
		Ajax(Page.domain+'/mobwars/hospital/do.php?'+'action=heal&verify='+Cache.heal_v,function(xhr)
		{
			Page.captcha(xhr.responseText);
			if(Page.pausing===true){Cache.heal_v=false;Page.pause_cb(function(){Task.heal();return;});return;};
			Boss.update(xhr.responseText);
			if(Boss.health>=Settings.max_health)
			{
				Cache.heal_v=false;
				Cache.healing=false;
				Cache.heal_cb();
				return;
			}
			if(m=xhr.responseText.match(/<input type="hidden" name="verify" value="(.*?)" \/>/))
			{
				Cache.heal_v=m[1];
			}
			else if(m=xhr.responseText.match(/<input type="hidden" value="(.*?)" name="verify" \/>/))
			{
				Cache.heal_v=m[1];
			}
			Task.heal();
			return;
		},'POST');
	}
	return;
};
Task.announce=function(html)
{
	if(match=html.match(new RegExp('<div class="announcement">(?:.|\\s)*?</div></div>')))
	{
		html=match[0];
	}
	var are=new RegExp('<div class="announcement">.*?<span class="announceTitle">(.*?)</span>((?:.|\\s)*)</div>');
	if(divh=html.match(are))
	{
		Console.announce({
			title:divh[1],
			content:divh[2]
		});
	}
	var b_re=new RegExp('claimed the bounty of (\\$[0-9]{1,4}(?:,[0-9]{3})*?)\\.');
	var bounty=false;
	var bounty_win=0;
	if(m=html.match(b_re))
	{
		bounty=true;
		bounty_win=Utility.make_number(m[1]);
		Cache.tb++;
		$('#mwt_bount').innerHTML=Cache.tb;
	}
	var won_re=new RegExp('You won the fight, taking ([0-9]*?) damage and dealing ([0-9]*?) damage to your enemy\. You gained (.*?) and ([0-9]*?) experience');
	if(m=html.match(won_re))
	{
		var dr=parseInt(m[1],0);
		var dd=parseInt(m[2],0);
		var cash=Utility.make_number(m[3])+bounty_win;
		var exp=parseInt(m[4],0);
		Cache.tdd+=dd;
		Cache.tdr+=dr;
		Cache.texp+=exp;
		Cache.tw+=cash;
		Cache.twins++;
		$('#mwt_damaged').innerHTML=Cache.tdd;
		$('#mwt_damager').innerHTML=Cache.tdr;
		$('#mwt_won').innerHTML=Utility.int_dollars(Cache.tw);
		$('#mwt_exp').innerHTML=Cache.texp;
		$('#mwt_wins').innerHTML=Cache.twins;
		return {bounty:bounty,won:true,lost:false,damager:dr,damaged:dd,cash_str:m[3],cash:cash,exp:exp};
	}
	var lost_re=new RegExp('lost the fight, taking ([0-9]*?) damage and dealing ([0-9]*?) damage');
	if(m=html.match(lost_re))
	{
		Cache.tdd+=parseInt(m[2],0);
		Cache.tdr+=parseInt(m[1],0);
		Cache.tw+=bounty_win;
		$('#mwt_won').innerHTML=Utility.int_dollars(Cache.tw);
		$('#mwt_damaged').innerHTML=Cache.tdd;
		$('#mwt_damager').innerHTML=Cache.tdr;
		return {bounty:bounty,cash:bounty_win,won:false,lost:true,damager:parseInt(m[1],0),damaged:parseInt(m[2],0)};
	}
	var re=new RegExp('<div class="error">(.*?)<br');
	if(m=html.match(re))
	{
		return {won:false,lost:false,captcha:false,message:m[1]};
	}
	return null;
};
//Job
Job.running=false;
Job.list=false;
Job.prep=false;
Job.energy=false;
Job.job_id=false
Job.wait=300;
Job.count=0;
Job.status;
Job.init=function(resume)
{
	if(resume)
	{
		if(Job.running===false){Page.toggle('job');}return;
	}
	Job.count=0;
	Job.running=true;
	Job.list=false;
	Job.prep=false;
	Job.wait=300;
	Job.energy=false;
	Job.job_id=false;
	Job.status="";
	Job.log('Initiating Job Automation');
	Ajax($('a*a=href|mobwars/profile')[0].href,function(xhr)
	{
		Page.captcha(xhr.responseText);
		if(Page.pausing===true){Page.pause_cb(function(){Job.init(true);return;});return;};
		Boss.update(xhr.responseText);
		if(m=xhr.responseText.match(/>.*?Level [0-9]*? (.*?)<\/h1>/))
		{
			if('insomniac'==m[1].toLowerCase())Job.wait=240;
		}
		else {Job.init();return;};
		Job.calculate();
		return;
	});
	return;
};
Job.log=function(action)
{
	var log=[{name:'Script',value:'Job'},
		{name:'Action',value:action}];
	Console.log(log);
	Console.status('job', action);
	return;
};
Job.update_list=function(html)
{
	if(Job.running===false){return;};
	if(Page.pausing===true){Page.pause_cb(function(){Job.check_stats();return;});return;};
	if(match=html.match(new RegExp('<h1>The Job List</h1>((?:.|\\s)*?)Job Prep</h1>((?:.|\\s)*)')))
	{
		var jobs_list=match[1];
		var prep_list=match[2];
		var re_job=new RegExp('<b style="font-size: 15px; color: silver;">(.|\\s)*?type="submit".*/>','g');
		var jobs_html=jobs_list.match(re_job);
		var prep_html=prep_list.match(re_job);
		var re_name=new RegExp('<b style="font-size: 15px; color: silver;">(.*?)</b>');
		var re_energy=new RegExp('<br />Energy:&nbsp;([0-9]*)');
		var re_prep=new RegExp('/mobwars/jobs/#item_([0-9]*?)".*?\\(use ([0-9]*?)\\)');
		var re_prep_g=new RegExp('/mobwars/jobs/#item_[0-9]*?".*?\\(use [0-9]*?\\)','g');
		var re_id=new RegExp('name="jobid" value="([0-9]*?)"');
		var re_prep_id=new RegExp('/mobwars/jobs/#item_([0-9]*?)".*?\\+');
		var re_prep_owned=new RegExp('Owned: ([0-9]*)');
		var jobs=[];
		var prep=[];
		var item;
		for(var i=0;i<jobs_html.length;i++)
		{
			html=jobs_html[i];
			item={};
			item.id=html.match(re_id)[1];
			item.name=html.match(re_name)[1];
			item.energy=Utility.make_number(html.match(re_energy)[1]);
			item.prep=[];
			if(match=html.match(re_prep_g))
			{
				var prep_match;
				for(var j=0;j<match.length;j++)
				{
					prep_match=match[j].match(re_prep);
					item.prep.push({item_id:prep_match[1],required:Utility.make_number(prep_match[2])});
				}
			}
			jobs.push(item);
		}
		for(i=0;i<prep_html.length;i++)
		{
			html=prep_html[i];
			item={};
			item.id=html.match(re_id)[1];
			item.item_id=html.match(re_prep_id)[1];
			item.name=html.match(re_name)[1];
			item.energy=Utility.make_number(html.match(re_energy)[1]);
			item.owned=html.match(re_prep_owned)[1];
			prep.push(item);
		}
		Job.list=jobs;
		Job.prep=prep;
		return true;
	}
	return false;
};
Job.find_prep=function(prep,item_id)
{
	var prep_id;
	item_id=Utility.make_number(item_id);
	for(var i=0;i<prep.length;i++)
	{
		prep_id=Utility.make_number(prep[i].item_id);
		if(item_id==prep_id)
		{
			return prep[i];
		}
	}
	return false;
};
Job.calculate=function()
{
	if(Job.running===false){return;};
	if(Page.pausing===true){Page.pause_cb(function(){Job.calculate();return;});return;};
	if(Job.list===false)
	{
		Job.log('Loading Job List');
		Ajax(Page.domain+'/mobwars/jobs/',function(xhr)
		{
			Page.captcha(xhr.responseText);
			if(Page.pausing===true){Page.pause_cb(function(){Job.calculate();return;});return;};
			Boss.update(xhr.responseText);
			Job.update_list(xhr.responseText);
			Job.calculate();
			return;
		});
		return;
	}
	Job.log('Checking Job List');
	if(c_job=Job.list[Settings.job_number-1])
	{
		if(c_job.energy>Boss.energy[1])
		{
			Job.log('Not Enough Total Energy');
			var timer=new Utility.timer({
				time:5,
				message:'Not Enough Total Energy [[time]]...',
				script:'job',
				fn:function()
				{
					Page.toggle('job');
					return;
				}
			});
			timer.start();
			return;
		}
		var energy=false;
		var prep;
		for(var i=0;i<c_job.prep.length;i++)
		{
			prep=Job.find_prep(Job.prep,c_job.prep[i].item_id);
			if(prep.owned<c_job.prep[i].required)
			{
				energy=prep.energy;
				Job.job_id=prep.id;
				Job.status="PREP";
			}
		}
		if(energy===false)
		{
			energy=c_job.energy;
			Job.job_id=c_job.id;
			Job.status="JOB";
		}
		Job.energy=energy;
		Job.check_stats();
		return;
	}
	else
	{
		Job.log('Can\'t Find Job');
		var timer=new Utility.timer({
			time:5,
			message:'Can\'t Find Job [[time]]...',
			script:'job',
			fn:function()
			{
				Page.toggle('job');
				return;
			}
		});
		timer.start();
	}
	return;
};
Job.check_stats=function()
{
	if(Job.running===false){return;};
	if(Page.pausing===true){Page.pause_cb(function(){Job.check_stats();return;});return;};
	Job.log('Checking Boss\'s Stats');
	var updating=false;
	if(Boss.cash>=Settings.bank_limit && Settings.bank && Cache.banking===false)
	{
		Job.log('Banking '+Utility.int_dollars(Boss.cash));
		Task.bank(Job.calculate);
		updating=true;
	}
	if(Job.energy>Boss.energy[0])
	{
		Job.log('Recharging Boss\'s Energy to '+Job.energy);
		var timer=new Utility.timer({
			script:'job',
			message:'Waiting [[time]] for '+Job.energy+' Energy...',
			time:Job.wait*(Job.energy-Boss.energy[0]),
			fn:function()
			{
				Job.calculate();
				return;
			}
		});
		timer.start();
		updating=true;
	}
	if(updating)
	{
		Job.list=false;
		return;
	}
	Job.log('Stats Check Complete');
	if(Job.status=="PREP")
	{
		var status="Doing Job Prep";
	}
	else
	{
		var status='Doing Job Number '+Settings.job_number;
	}
	Job.log(status);
	var timer=new Utility.timer({
		time:Page.wait(),
		message:status+' [[time]]...',
		script:'job',
		fn:function()
		{
			if(Job.running===false){return;}
			Job.do_job();
			return;
		}
	});
	timer.start();
	return;
};
Job.do_job=function()
{
	Ajax(Page.domain+'/mobwars/jobs/do.php?action=dojob&jobid='+Job.job_id,function(xhr)
	{
		Page.captcha(xhr.responseText);
		if(Page.pausing===true){Page.pause_cb(function(){Job.calculate();return;});return;};
		Boss.update(xhr.responseText);
		Job.update_list(xhr.responseText);
		Task.announce(xhr.responseText);
		Job.count++;
		if(Job.count>=Settings.script_repeat && Settings.script_repeat!=-1)
		{
			Page.toggle('job');
			return;
		}
		Job.calculate();
		return;
	},'POST');
	return;
};
//Property
Property.count=0;
Property.running=false;
Property.prop;
Property.log=function(action)
{
	var log=[{name:'Script',value:'Property'},
		{name:'Action',value:action}];
	Console.log(log);
	Console.status('property', action);
	return;
};
Property.init=function(resume)
{
	if(resume)
	{
		if(Property.running===false)return;
	}
	Property.count=0;
	Property.log('Initiating the Property Automation');
	Property.running=true;
	Property.prop=null;
	Ajax(Page.domain+'/mobwars/city/',function(xhr)
	{
		Property.update_list(xhr.responseText);
		return;
	});
	return;
};
Property.update_list=function(html)
{
	if(Property.running===false)return;
	if(Page.pausing===true){Page.pause_cb(function(){Property.update_list();return;});return;};
	if(!html)
	{
		Property.log('Loading Property List');
		Ajax(Page.domain+'/mobwars/city/',function(xhr)
		{
			Page.captcha(xhr.responseText);
			if(Property.running===false){return;};
			if(Page.pausing===true){Page.pause_cb(function(){Property.update_list();return;});return;};
			Boss.update(xhr.responseText);
			Property.update_list(xhr.responseText);
			return;
		});
		return;
	}
	Property.log('Checking Property List');
	var re_split=new RegExp('Undeveloped Land</td>((?:.|\\s)*?)Establishment</td>((?:.|\\s)*)');
	if(match=html.match(re_split))
	{
		var undev_list=match[1];
		var dev_list=match[2];
		re_html=new RegExp('<a name="item_[0-9]*?"></a>(?:.|\\s)*?</form>','g');
		var undev_html=undev_list.match(re_html);
		var dev_html=dev_list.match(re_html);
		var name_re=new RegExp('<b style="font-size: 15px; color: silver;">(.*?)</b>');
		var cost_re = new RegExp('\\$([0-9]{1,4}(,[0-9]{3})*)</span>');
		var income_re = new RegExp('Income:.*?\\$([0-9]{1,4}(,[0-9]{3})*)');
		var req_re = new RegExp('<br />Built.+?On:.+?(.+?)(  )');
		var owned_re = new RegExp('([0-9]+?)</b></span>');
		var id_re=new RegExp('name="item" value="(.*?)"');
		var props=[];
		for(var i=0;i<dev_html.length;i++)
		{
			tr = dev_html[i];
			var prop = {};
			prop.undev = false;
			if (match = tr.match(name_re))
			{
				prop.name = match[1];
			}
			if (match = tr.match(id_re))
			{
				prop.id = Utility.make_number(match[1]);
			}
			if (match = tr.match(cost_re))
			{
				prop.cost = Utility.make_number(match[1]);
			}
			if (match = tr.match(income_re))
			{
				prop.income = Utility.make_number(match[1]);
			}
			if (match = tr.match(req_re))
			{
				prop.require = match[1];
			}
			if (prop.cost && prop.income)
			{
				prop.ror = (prop.income/prop.cost)*1000000000;
			}
			props.push(prop);
		}
		for(var i=0;i<undev_html.length;i++)
		{
			tr = undev_html[i];
			var prop = {};
			prop.undev = true;
			prop.require = false;
			if (match = tr.match(name_re))
			{
				prop.name = match[1];
			}
			if (match = tr.match(id_re))
			{
				prop.id = Utility.make_number(match[1]);
			}
			if (match = tr.match(cost_re))
			{
				prop.cost = Utility.make_number(match[1]);
			}
			if (match = tr.match(income_re))
			{
				prop.income = Utility.make_number(match[1]);
			}
			if (match = tr.match(owned_re))
			{
				prop.owned = Utility.make_number(match[1]);
			}
			if (prop.cost && prop.income)
			{
				prop.ror = (prop.income/prop.cost)*1000000000;
			}
			props.push(prop);
		}
		props.sort(function(a, b){return (b.ror-a.ror);});
		Property.process(props);
		return;
	}
	Property.list=false;
	return;
};
Property.process=function(props)
{
	var prop = props[0];
	if (!prop.undev)
	{
		var require = prop.require;
		var c_require = '';
		var c_prop = {};
		var i = 0;
		while(require != c_require)
		{
			c_prop = props[i];
			if (c_prop.undev)
			{
				c_require = c_prop.name;
			}
			i++;
		}
		if (c_prop && 10>c_prop.owned)
		{
			Property.check_stats(c_prop);
			return;
		}
	}
	Property.prop=prop;
	Property.check_stats();
	return;
};
Property.check_stats=function()
{
	var prop=Property.prop;
	if(Property.running===false)return;
	if(Page.pausing===true){Page.pause_cb(function(){Property.update_list();return;});return;};
	Property.log('Checking Boss\'s Stats');
	var updating=false;
	if(Boss.cash<(prop.cost*10))
	{
		var timer=new Utility.timer({
			script:'property',
			message:'Re-checking for more cash in [[time]]...',
			time:180,
			fn:function()
			{
				Property.log('Re-checking Boss\'s cash balance');
				if(Property.running===false){return;};
				if(Page.pausing===true){Page.pause_cb(function(){Property.update_list();return;});return;};
				Ajax(Page.domain+'/mobwars/city/',function(xhr)
				{
					Page.captcha(xhr.responseText);
					if(Property.running===false){return;};
					if(Page.pausing===true){Page.pause_cb(function(){Property.update_list();return;});return;};
					Boss.update(xhr.responseText);
					Property.update_list(xhr.responseText);
					return;
				});
				return;
			}
		});
		timer.start();
		return;
	}
	if(updating)
	{
		return;
	}
	Property.log('Stat checks complete');
	var wait=Page.wait();
	Property.log('Buying 10 '+prop.name);
	var timer=new Utility.timer({
		script:'property',
		message:'Proceeding to buy 10 '+prop.name+' in [[time]]...',
		time:wait,
		fn:function()
		{
			if(Property.running===false){return;};
			Property.buy();
			return;
		}
	});
	timer.start();
	return;
};
Property.buy=function()
{
	var prop=Property.prop;
	Ajax(Page.domain+'/mobwars/city/do.php?action=buy&qty=10&item='+prop.id,function(xhr)
	{
		Property.count++;
		Page.captcha(xhr.responseText);
		if(Property.running===false){return;};
		if(Page.pausing===true){Page.pause_cb(function(){Property.update_list();return;});return;};
		Boss.update(xhr.responseText);
		Task.announce(xhr.responseText);
		Property.update_list(xhr.responseText);
		return;
	});
	return;
};
// Defend script
Defend.count=0;
Defend.running=false;
Defend.log=function(action)
{
	var log=[{name:'Script',value:'Defend'},
		{name:'Action',value:action}];
	Console.log(log);
	Console.status('defend', action);
	return;
};
Defend.init=function(resume)
{
	Defend.count=0;
	if(resume)
	{
		if(Fight.running===false)return;
	}
	Defend.running=true;
	Defend.individual=false;
	Defend.log('Initiating Defend Automation');
	Ajax(Page.domain+'/mobwars/fight/',function(xhr)
	{
		Page.captcha(xhr.responseText);
		if(Page.pausing===true){Page.pause_cb(function(){Defend.init(true);return;});return;};
		Boss.update(xhr.responseText);
		Defend.check_stats();
		return;
	});
	return;
};
Defend.refresh=function()
{
	if(Defend.running===false){return;};
	if(Page.pausing===true){Page.pause_cb(function(){Defend.refresh();return;});return;};
	if(Defend.count>=Settings.script_repeat&&-1!=Settings.script_repeat)
	{
		Page.toggle('defend');
		return;
	}
	Ajax(Page.domain+'/mobwars/',function(xhr)
	{
		Page.captcha(xhr.responseText);
		if(Page.pausing===true){Page.pause_cb(function(){Defend.refresh();return;});return;};
		Boss.update(xhr.responseText);
		Defend.check_stats();
		return;
	});
	return;
};
Defend.check_stats=function()
{
	if(Defend.running===false){return;};
	if(Page.pausing===true){Page.pause_cb(function(){Defend.refresh();return;});return;};
	Defend.log('Checking Boss\'s Stats');
	var updating=false;
	Defend.count++;
	if(Boss.cash>=Settings.bank_limit && Settings.bank && Cache.banking===false)
	{
		Defend.log('Banking '+Utility.int_dollars(Boss.cash));
		Task.bank(Defend.refresh);
		updating=true;
	}
	if(Boss.health<=Settings.min_health && Settings.heal && Cache.healing===false)
	{
		Defend.log('Healing your Boss');
		Task.heal(Defend.refresh);
		updating=true;
	}
	if(updating)
	{
		Defend.list=null;
		return;
	}
	Defend.log('Stat checks complete');
	var timer=new Utility.timer({
		time:Settings.defend_time,
		message:'Checking stats again in [[time]]...',
		script:'defend',
		fn:function()
		{
			Defend.refresh();
			return;
		}
	});
	timer.start();
	return;
};
Page.init();