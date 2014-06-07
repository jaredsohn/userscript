// ==UserScript==
// @name           Glitch Profile Stats
// @author         DeusAphor
// @namespace      http://beta.glitch.com/profiles/PHVM97IIJG92HGS/
// @version        0.0.7
// @Date           9/16/2011
// @description    This is just one of my many small scripts that I don't have a problem sharing with the rest of my fellow glitches. In short this script just displays the Energy, Mood, EXP( on hover ) and Currents of other Glitches when their profile is viewed. This does not require any permissions, this is not "hacking" this is using the public Glitch API. 
// @include        http://*.glitch.com/profiles/*/

//Special thanks to Kevbob, although he does not know it he was a great help with my script. It's hard to make something like this when everyone has been reset and their stats are the same. :P

// ==/UserScript== 

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

//GLOBAL
Animate_Glitch = true;
//




var SUC_script_num = 113198; 
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


//auctions/item
function main() {

	function SetMood(Current, Max)
	{
		var Percent = (Current/Max) * 100
		
		var Offset;
		if(Percent >= 90) Offset = "0px";
		else if(Percent >= 80) Offset = "-44px";
		else if(Percent >= 70) Offset = "-88px";
		else if(Percent >= 60) Offset = "-132px";
		else if(Percent >= 50) Offset = "-176px";
		else if(Percent >= 40) Offset = "-220px";
		else if(Percent >= 30) Offset = "-264px";
		else if(Percent >= 20) Offset = "-308px";
		else if(Percent >= 10) Offset = "-352px";
		else Offset = "-396px";
		$('div.metabolics div.tipbottom:first').attr('title', Current+'/'+Max+' Mood <br>-'+ (Max - Current));
		$('div.metabolics div.mood').css('background-position', '50% '+Offset);
		
		return;
	}
	
	function SetEnergy(Current, Max)
	{
		var Percent = (Current/Max) * 100;
		
		var Offset;
		if(Percent >= 90) Offset = "0px";
		else if(Percent >= 80) Offset = "-50px";
		else if(Percent >= 70) Offset = "-100px";
		else if(Percent >= 60) Offset = "-150px";
		else if(Percent >= 50) Offset = "-200px";
		else if(Percent >= 40) Offset = "-250px";
		else if(Percent >= 30) Offset = "-300px";
		else if(Percent >= 20) Offset = "-350px";
		else if(Percent >= 10) Offset = "-400px";
		else Offset = "-450px";
		$('div.metabolics div.tipbottom:nth-child(2)').attr('title', Current+'/'+Max+' Energy <br>-'+ (Max - Current));
		$('div.metabolics div.energy').css('background-position', '50% '+Offset);
		$('div.metabolics div.energy').html(Current+'<span>'+Max+'</span>');
		
		return;
	}
	
	function SetEXP(Current, Max)
	{
		var Percent = (Current/Max) * 80;
		$('div.metabolics div.xp-section div.tipbottom').attr('title', Current+'/'+Max+' EXP <br> '+ (Max - Current) +' EXP needed');
		$('div.metabolics div.xp-section div.xp-back').css('background-position','-100px '+Percent+'%');
		
		return;
	}
	
	function SetLevel(Current)
	{
		$('div.metabolics div.xp-section span.big-number').html(Current);
		
		return;
	}
	function SetCurrents(Current)
	{
		$('div.metabolics div:nth-child(4) span.big-number:nth-child(2)').html(Current);
		
		return;
	}
	function localTimezone(){
		var d = new Date(); var gmtHours = -d.getTimezoneOffset()/60; var xc=""; if(gmtHours>-1)xc="+";
		return "GMT" +xc+gmtHours;
	}

	
	function ModLocation(Player_Location_tsid,Player_Location_name, Player_Online, Player_Last_Online)
	{
		var Output;
		if(Player_Online)Output = 'In the game right now exploring ';
		else Output = 'Offline right now. Last seen exploring ';
		Output += '<a href="http:\/\/beta.glitch.com\/locations\/'+Player_Location_tsid+'\/">'+Player_Location_name+'<\a>'+
		'<\a> <form method="post" action="/locations/'+Player_Location_tsid+'/"><input type="hidden" value="1" name="set_as_destination"><input class="button-tiny" type="submit" style="margin: 0px 0 0 0;" value="Set as destination"></form>';
		if(!Player_Online)
		{
			var datum = new Date(Player_Last_Online*1000);
			var localeString = datum.toLocaleString();
			var localeStringEnd = localeString.search(/GMT/i);
			if(localeStringEnd>0){ localeString=localeString.substring(0,localeStringEnd); }		
			
			Output += "<hr class=\"lefthr\">";
			Output += "<b>Last Login</b>: <span title=\""+datum.toLocaleString()+"\">"+localeString+"</span> "+localTimezone()+"";
		}
		
		$('p.profile-point:first').html(Output);
		return;
	}

	//Canvis crap, Really... Unneeded but just wanted to toy with it.. :P
	function Animate_Glitch(Player_Online, Player_TSID)
	{
		if(!!document.createElement('canvas').getContext)
		{
			var canvas_w = 200,
				canvas_h = 200,

				g_sheets = {},
				g_anims = {},
				g_index = {},

				g_anim = '',
				g_next_frame = 0;
			
			function load_sheets(){
				for (var i in g_sheets){
					g_sheets[i].img = new Image();
					g_sheets[i].img.onload = function(i){
						return function(){
							image_loaded(i);
						};
					}(i);
					g_sheets[i].loaded = false;
					g_sheets[i].img.src = g_sheets[i].url;
				}
			}
			function build_index(){
				for (var i in g_sheets){
					for (var j=0; j<g_sheets[i].frames.length; j++){

						g_index[g_sheets[i].frames[j]] = [i, j % g_sheets[i].cols, Math.floor(j / g_sheets[i].cols)];
					}
				}
			}
			
			function image_loaded(idx){
				
				g_sheets[idx].loaded = true;
				g_sheets[idx].frame_width = Math.round(g_sheets[idx].img.width  / g_sheets[idx].cols );
				g_sheets[idx].frame_height = Math.round(g_sheets[idx].img.height  / g_sheets[idx].rows);

				var done = 0;
				var num = 0;
				for (var i in g_sheets){
					num++;
					if (g_sheets[i].loaded) done++;
				}
				if (done == num){
					$('body div.container div.section div img').replaceWith('<canvas id="my-canvas" width="200" height="400"></canvas><br />');
					animate();
				}
			}
			
					
			function animate(){
				if(Player_Online)g_anim = 'walk1x';
				else g_anim = 'idleSleepyLoop';
				g_next_frame = 0;
				window.setInterval(nextFrame, 33);
			}

			function nextFrame(){
				var id = g_anims[g_anim][g_next_frame],
					f_w = g_sheets[g_index[id][0]].frame_width,
					f_h = g_sheets[g_index[id][0]].frame_height,

					context = document.getElementById("my-canvas").getContext("2d");
				
				context.clearRect(0, 0, canvas_w *1.8, canvas_h*1.8);
				context.drawImage(g_sheets[g_index[id][0]].img, f_w * g_index[id][1], f_h * g_index[id][2], f_w , f_h , (canvas_w / 2) - (f_w / 2) *1.7, (canvas_h / 2) - (f_h / 2) *1.3, f_w *1.5, f_h *1.5 );
				g_next_frame++;
				if (g_next_frame >= g_anims[g_anim].length){
					g_next_frame = 0;
				}
			}


			api_call("players.getAnimations", { player_tsid : Player_TSID}, function (e) { 
				if (e.ok){
					g_sheets = e.sheets;
					g_anims = e.anims;
					build_index();
					load_sheets();
				}
			});
		}
	}

	
	//End Canvis Crap
	
	var URL = window.location.pathname;
	if((URL.indexOf("profiles/") != -1))
	{	
		$(document).ready(function(){
			Player_TSID = URL.replace(/\/profiles\//i,"").replace(/\//i,"");
			api_call("players.fullInfo", { player_tsid : Player_TSID}, function (e) { 
				if (!e.ok) { return; }
				var	
					Player_Name				= e.player_name,
					Player_Online			= e.is_online,
					Player_Last_Online		= e.last_online,
					
					Player_Stats_Level 		= e.stats.level,
					Player_Stats_XP			= e.stats.xp,
					Player_Stats_XP_Max		= e.stats.xp_max,
					Player_Stats_Currents 	= e.stats.currants,
					Player_Stats_Energy		= e.stats.energy,
					Player_Stats_Energy_Max = e.stats.energy_max,
					Player_Stats_Mood 		= e.stats.mood,
					Player_Stats_Mood_Max	= e.stats.mood_max
					
					Player_Location_tsid	= e.location.tsid,
					Player_Location_name	= e.location.name;
					

				SetMood(Player_Stats_Mood, Player_Stats_Mood_Max);
				SetEnergy(Player_Stats_Energy, Player_Stats_Energy_Max);
				SetEXP(Player_Stats_XP, Player_Stats_XP_Max);
				SetLevel(Player_Stats_Level);
				SetCurrents(Player_Stats_Currents);
				
				ModLocation(Player_Location_tsid,Player_Location_name, Player_Online, Player_Last_Online);

				if(Animate_Glitch)
				{
					Animate_Glitch(Player_Online, Player_TSID);
				}
			});
		});
	}
}


