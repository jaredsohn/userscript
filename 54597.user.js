//  _______   __   __             
// |__   __| / /  /_ |    _       _   
//    | |   / /_   | |  _| |_   _| |_ 
//    | |  | ._ \  | | |_   _| |_   _|     Version: 1.5
//    | |  | (_) | | |   |_|     |_|  
//    |_|   \___/  |_|
//
// Created by Matty McLean (mattymc) (www.mattymc.com) & James Robertson (rd3k)
//
// ------------------------------------------------------------------------------
// Use on www.thesixtyone.com to enhance your 61 fun.
// ------------------------------------------------------------------------------
//
// Changes:
// - 2009.07.22 MM Created (v0.5)
// - 2009.07.22 MM Added Max Bumps (v0.75)
// - 2009.07.22 MM Small Max Bump Fix (v0.85)
// - 2009.07.23 JR Now the remaining rep until level shows up beside a user’s rep in their profile (v0.9)
// - 2009.07.24 MM Added autoRB (v1.0)
// - 2009.07.25 JR New interface / MM Fixed the issue where "max!" showed up too much (v1.1)
// - 2009.08.04 MM Small text changes / Cleaned up code a little / Added compactCSS option / Improved autoRack
// - 2009.08.06 MM Fixed Max Bump issue where it took over the track click events
// - 2009.08.21 JR Rep you have earned since "daily login" is now tracked and displayed on your profile / Removed auto-repeat (added to thesixtyone) (v1.5)
//
// ==UserScript==
// @name           t61++
// @namespace      http://www.mattymc.com/
// @description    Use on www.thesixtyone.com to get some cool features
// @include        http://*thesixtyone.com*
// ==/UserScript==

const plusplusVersion = '1.5';
const mainTick = 1;

var t61ppDebugOn = false;

const rackTickNum = (60/mainTick);
var rackCheckOn = false;
var rackTickCount = 0;
var lastRackTime = '0:00';

const autoRBTickNum = ((60/mainTick)*5)+1;
var autoRBOn = false;
var autoRBTickCount = 0;
var autoRBuser = '';
var rbCount = 0;
var startrep = document.getElementById('user_points').innerHTML;
var myrep = document.getElementById('user_points').innerHTML;

var timerCount = 0;
var showOptions = false;

var autoCompact = false;
var customCSS = "@namespace url(http://www.w3.org/1999/xhtml); } /* -=[ general ]=- */ #page_layout, #page_content { width: 968px ! important; padding: 0px ! important; } #page_content { margin-top: 10px ! important; } .three_column_layout { width: 968px; } input.input_submit_button { background-color: #ECECEC ! important; border: 2px inset #ECECEC ! important; color: #000 ! important; } #num_listeners { color: #000 ! important; } /* -=[ main column ]=- */ .three_column_layout .main_column { width: 668px ! important; padding: 0px 0px ! important; } #main_column_contents { margin: 0px 9px ! important; } table.search_results_tab { margin-bottom: 3px ! important; } table.search_results_tab tr td.right_filler { } .pagination { margin-top: 1em ! important; } /* -=[ songlist items ]=- */ table.song_player { width: 650px ! important; margin-bottom: 6px ! important; } table.song_player:hover { background-color: #D9E3F0 ! important; } .song_player td.album_art { width: 31px ! important; } .song_player td.album_art div.album_art_container { height: auto ! important; width: 31px ! important; } .song_player td.album_art img { width: 25px ! important; height: 25px ! important; margin: 3px ! important; } .song_player .song_album_button { display: none ! important; } .song_player td.song_right_panel { height: auto ! important; width: 527px ! important; } .song_player td.song_right_panel .song_info { width: 527px ! important; } .song_player .title { float: left; width: 350px; font-size: 1em ! important; } .song_player .title a { font-weight: bold ! important; } .song_player .caption { float: left; width: 350px; } .song_player .actions { float: right; width: 177px; } .discovery_info { color: #5164B1; } .actions a.save:active, .actions a.save:hover, .song_player .actions a:active, .song_player .actions a:hover { background-color: #89BD41 ! important; text-decoration: none ! important; color: #fff ! important; } .song_player td.song_bump_panel {} /* -=[ resetting most of previous settings for proper display in two column layout ]=- */ #artist_songs_navigation table.song_player, #artist_songs table.song_player { width: 450px ! important; margin-bottom: 0px ! important; } #artist_songs_navigation .song_player td.album_art, #artist_songs .song_player td.album_art { width: 60px ! important; } #artist_songs_navigation .song_player td.album_art div.album_art_container, #artist_songs .song_player td.album_art div.album_art_container { height: 60px ! important; width: 60px ! important; } #artist_songs_navigation .song_player td.album_art img, #artist_songs .song_player td.album_art img { width: 50px ! important; height: 50px ! important; margin: 5px ! important; } #artist_songs_navigation .song_player td.song_right_panel, #artist_songss .song_player td.song_right_panel { height: auto ! important; width: auto ! important; } #artist_songs_navigation .song_player td.song_right_panel .song_info, #artist_songs .song_player td.song_right_panel .song_info { width: auto ! important; } #artist_songs_navigation .song_player .title, #artist_songs .song_player .title { float: none ! important; width: auto ! important; font-size: 1em ! important; } #artist_songs_navigation .song_player .caption, #artist_songs .song_player .caption { float: none ! important; width: auto ! important; } #artist_songs_navigation .song_player .actions, #artist_songs .song_player .actions { float: none ! important; width: auto ! important; } /* -=[ smaller album covers on the listener pages ]=- */ /* -=[ song drawer ]=- */ .song_player tr.drawer td { } .song_player .song_drawer_content { border-style: none solid ! important; border-width: 1px ! important; border-color: #999 ! important; } .song_player .song_drawer_content h4 { font-size: 0.9em ! important; } .song_player .song_drawer_content input { background-color: #ECECEC ! important; font-size: 0.9em ! important; } .song_player .song_drawer_content>div { width: 430px ! important; margin: 0px ! important; padding: 1em 3px 3px 3px ! important; } .mini_tab_button { border: 2px outset #ECECEC ! important; } .song_player .comments_header a.post_comment { } /* -=[ right column ]=- */ .three_column_layout .right_column { width: 100px ! important; } .genre_panel { width: 100px ! important; } .large_button a { font-size: 0.9em ! important; } .select_button a.selected:link, .select_button a.selected:visited, .select_button a:hover, .select_button a:active { background-color: #323D6D ! important;";
var partArray = new Array("*home*", "*browse*", "just_for_you", "top", "hot", "new", "cc");

function doIt()
{
	const usecookies = Cookie.accept(); //So it doesn't have to keep checking

	GM_addStyle(<><![CDATA[
		#ppdiv{position:fixed;top:180px;left:0;width:170px;}
		#pptab{float:left;width:26px;cursor:pointer;}
		#ppactions{background:#EEE;color:#000;width:150px;margin:5px;padding:8px;}
		#ppactions tr{overflow:hidden;}
		#ppactions td{padding:0;text-align:left;padding-top:5px;}
		#ppactions td label{float:left;}
		#ppactions td input{float:right;}
		#ppactions td .betatag{font-size:9px;color:red;}
		#pppanel{background:#888;position:absolute;z-index:9001;width:160px;margin-top:-50px;}
		#pppanel iframe{border:0;width:150px;overflow:hidden;height:50px;margin:5px;background:#EEE;margin-bottom:2px;}
		#closepp{font-size:12px;float:right;display:block;color:#FFF;cursor:pointer;margin:5px 5px 0 0;}
		#ppabout{color:#FFF;margin:5px;text-align:center;background:#666;padding:8px;margin-bottom:8px;line-height:20px;}
		#ppabout a{color:#FFF;text-decoration:underline;}
		#ppupdatenotice{width:150px;height:60px;padding:18px 10px 10px;text-align:center;background:#E4E4E4;border:2px #555 solid;position:relative;top:92px;left:26px;-moz-border-radius-topright:10px;-moz-border-radius-bottomright:10px;border-left:0;}
		#ppupdatenotice a{margin-top:15px;display:block;background:#CCC;padding:4px;color:#000;border:1px #777 solid;}
		#ppupdatenotice a:hover{background:#DDD;}
	]]></>);
	
	var ppdiv=document.createElement('div');
	ppdiv.id='ppdiv';
	ppdiv.innerHTML='<a id="pptab"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABcCAMAAABHlVWNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRFVVVV////1NTUgICAqqqqdXV19PT0ZmZm39/fv7+/mZmZzMzMioqKtLS06urq8T17LAAAANFJREFUeNrsldsSgyAMRNkECDf9/88tjrUt2LTq+Mi+HphsNmEwZmhoU6JJQxZ0FjnmiMDMskOEp/gMumbjNxJ2I40jadwpS2/FFnl8qG3azfDKLSMBRavm4EVjEUnNgq5mIfxlWpydkVib8n1FBiYT1o47lkFS4C2XDN8izMsk03qqrYdQl3fNY+pQqDdkDjUP9mhTKcCcaxmqVvoFSa+RhF2UMi1L6vMuSFGjrY7VbOn7qv9FiTeJ8oQWl6KizhEh2k3lHocq4ji+nqHDeggwAH/OBMJlTUHTAAAAAElFTkSuQmCC"/></a><div id="pppanel"><a id="closepp">CLOSE X</a><table id="ppactions"border="0"></table></div>';
	document.getElementById('page_layout').appendChild(ppdiv);
	
	// Check version
	GM_xmlhttpRequest({
		method:'GET',url:'http://jamesnet.co.uk/61pp/index.php?a=version&v='+plusplusVersion,
		onload:function(response){
			if(response.statusText=="OK"){
				
				if(response.responseText=="y"){
					ppdiv.innerHTML='<div id="ppupdatenotice">A new version is available<a href="http://userscripts.org/scripts/show/54597">Install</a></div>'+ppdiv.innerHTML;
				}
				
			}else{
							
				showMsg('Server "GET" failed - please notify rd3k!');
								
			}
		}
	});
	 
	//Add actions
	document.getElementById('ppactions').innerHTML+="<tr><td><label for='autoRack'>AutoRack</label><input type='checkbox' id='autoRack' title='Non-stop racking'/></td></tr>";
	document.getElementById('ppactions').innerHTML+="<tr><td><label for='autoRadioBump'>AutoRadio</label><input type='checkbox' id='autoRadioBump' title='Give many listens when you click once'/></td></tr>";
	document.getElementById('ppactions').innerHTML+="<tr style='display:none;'><td><label for='autoCompact'>AutoCompact <span class='betatag'>(beta)</span></label><input type='checkbox' id='autoCompact' title='Compact the big track lists'/></td></tr>";

	//Add info link
	document.getElementById('pppanel').innerHTML += "<div id='ppabout'>By <a href='#/mattymc/'>mattymc</a> & <a href='#/rd3k/'>rd3k</a> <a href='http://mattymc.com/2009/07/21/t61pp-thesixtyone-on-awesome/' target='_new'>Help? Ideas? Bugs?</a></div>";
	document.getElementById('pppanel').style.display="none";

	//Add action events
	document.getElementById('pptab').addEventListener('click',function(e){document.getElementById('pppanel').style.display="block";document.getElementById('ppupdatenotice').style.visibility="hidden";},true);
	document.getElementById('closepp').addEventListener('click',function(e){document.getElementById('pppanel').style.display="none";document.getElementById('ppupdatenotice').style.visibility="visible";},true);

	/* Today rep
	Give the notice a chance to appear (5 seconds)
	If a user is not logged in at run, notice won't be detected but local and server cookies will be checked for right value
	Server is used as "cookie" if local cookies are disabled
	*/
	window.setTimeout(logindelay=function(){
	
		// Search for "daily login" notice
		var ds=document.getElementsByTagName('div');
		var loginNotice=false;
		
		for(var i=0;i<ds.length;i++){
			if(ds[i].className=="notice_text"&&ds[i].innerHTML.toUpperCase().match("DAILY")){
			
				// Notice found
		
				// Store local
				if(usecookies){
					Cookie.erase('dayrep');
					startrep=myrep;
					Cookie.set('dayrep',startrep);
				}
				
				// Store server
				GM_xmlhttpRequest({
					method:'POST',
					url:'http://jamesnet.co.uk/61pp/index.php?a=store&u='+unsafeWindow.t61.my_username+'&r='+startrep,
					headers:{"Content-Type":"application/x-www-form-urlencoded"},
					onload:function(response){
						if(response.statusText!="OK"){
							showMsg('Server "POST" failed - please notify rd3k!');
						}
					}
				});
				
				loginNotice=true;
				GM_log('"Daily hearts" notice found');
				break;
				
			}
		}
		
		if(loginNotice==false){
		
			GM_log('"Daily hearts" notice not found');
			
			if(usecookies){
			
				GM_log("Cookies enabled");
				if(Cookie.get('dayrep')==""){
				
					GM_log("Local cookie not found");
					
					// Get Server
					GM_xmlhttpRequest({
						method:'GET',url:'http://jamesnet.co.uk/61pp/index.php?a=get&u='+unsafeWindow.t61.my_username,
						onload:function(response){
							if(response.statusText=="OK"){
							
								if(response.responseText=="-1"){
								
									GM_log("Server cookie not found");
									startrep=myrep;
									GM_log("Creating local and server cookie");
									
									// Store local
									Cookie.set('dayrep',startrep);
									
									// Store server
									GM_xmlhttpRequest({
										method:'POST',
										url:'http://jamesnet.co.uk/61pp/index.php?a=store&u='+unsafeWindow.t61.my_username+'&r='+startrep,
										headers:{"Content-Type":"application/x-www-form-urlencoded"},
										onload:function(response){
											if(response.statusText!="OK"){
												showMsg('Server "POST" failed - please notify rd3k!');
											}
										}
									});
									
								}else{
								
									GM_log("Using value from server cookie");
									startrep=response.responseText;
									
								}
								
							}else{
							
								showMsg('Server "GET" failed - please notify rd3k!');
								
							}
						}
					});
					
				}else{
				
					GM_log("Local cookie found");
					
					// Get local
					var cookieval=parseInt(Cookie.get('dayrep'));
					
					// Get server
					GM_log("Checking for server cookie");
					GM_xmlhttpRequest({
						method:'GET',
						url:'http://jamesnet.co.uk/61pp/index.php?a=get&u='+unsafeWindow.t61.my_username,
						onload:function(response){
							if(response.statusText=="OK"){
							
								if(response.responseText=="-1"){
								
									GM_log("No server cookie, creating");
									GM_log("Using value from local cookie");
									startrep=cookieval;
									
									// Store server
									GM_xmlhttpRequest({
										method:'POST',
										url:'http://jamesnet.co.uk/61pp/index.php?a=store&u='+unsafeWindow.t61.my_username+'&r='+startrep,
										headers:{"Content-Type":"application/x-www-form-urlencoded"},
										onload:function(response){
											if(response.statusText!="OK"){
												showMsg('Server "POST" failed - please notify rd3k!');
											}
										}
									});
									
								}else{
								
									GM_log("Server cookie found");
									var serverval=parseInt(response.responseText);
									
									// If server has different startrep, cookie is out of date
									if(serverval!=cookieval){
										GM_log("Server cookie != local cookie - using server value and updating local cookie");
										startrep=serverval;
										Cookie.set('dayrep',startrep);
									}else{
										GM_log("Local cookie value is fine - using it.");
										startrep=cookieval;
									}
								}
								
							}else{
							
								showMsg('Server "GET" failed - please notify rd3k!');
								
							}
							
						}
					});
				}
				
			}else{
			
				GM_log("Cookies disabled");
				GM_log("Getting from server");
				
				// Get Server
				GM_xmlhttpRequest({
					method:'GET',url:'http://jamesnet.co.uk/61pp/index.php?a=get&u='+unsafeWindow.t61.my_username,
					onload:function(response){
						if(response.statusText=="OK"){
						
							if(response.responseText=="-1"){
							
								GM_log("Server cookie not found - using current rep");
								GM_log("Storing on server");
								startrep=myrep;
															
								/* Store server */
								GM_xmlhttpRequest({
									method:'POST',
									url:'http://jamesnet.co.uk/61pp/index.php?a=store&u='+unsafeWindow.t61.my_username+'&r='+startrep,
									headers:{"Content-Type":"application/x-www-form-urlencoded"},
									onload:function(response){
										if(response.statusText!="OK"){
											showMsg('Server "POST" failed - please notify rd3k!');
										}
									}
								});
								
							}else{
							
								GM_log("Server cookie found - using value");
								startrep=response.responseText;
								
							}
							
						}else{
						
							showMsg('Server GET" failed - please notify rd3k!');
							
						}
					}
				});
				
			}
		}
	},5000);
	
	document.getElementById('autoRack').addEventListener('click',function(event){
		rackCheckOn=!rackCheckOn;
		var word="off";
		if(rackCheckOn){
			word="on";
			unsafeWindow.t61.therack.open();
		}else{
			unsafeWindow.t61.popup.hide({from_user:true});
		}
		showMsg("Auto-rack is "+word+".");
	},true);

	document.getElementById('autoRadioBump').addEventListener('click', function(event) {
		autoRBOn=!autoRBOn;
		if(autoRBOn) {
			autoRBuser = window.prompt('Enter user you want to lay the bumps on:','');
			if(autoRBuser == null){document.getElementById('autoRadioBump').checked=false;autoRBOn=false;return;}
			showMsg("Auto radio is on (" + autoRBuser + ")");
			rbCount = 0;
			triggerRadio();
		} else {
			showMsg("Auto radio is off (" + rbCount + " RBs)");
			rbCount = 0;
		}
	},true);

	document.getElementById('autoCompact').addEventListener('click',function(event){
		autoCompact = !autoCompact;
		if(autoCompact){
			setCompactCSS();
			if(usecookies){Cookie.set('compactCSS','Y');}
			showMsg("Auto compact is on");
		}else{
			clearCompactCSS();
			if(usecookies){Cookie.erase('compactCSS');}
			showMsg("Auto compact is off");
		}
	},true);

	autoCompact = (usecookies && Cookie.get("compactCSS") == 'Y');
	document.getElementById('autoCompact').checked = autoCompact;

	setTimeout(tickTock, 1000);
	showMsg("Loaded t61++ (v." + plusplusVersion + ") Phew! :)");

	//No more visuals
	document.getElementById('screensaver_wrapper').parentNode.removeChild(document.getElementById('screensaver_wrapper'));
	document.getElementById('miniplayer_visual').parentNode.removeChild(document.getElementById('miniplayer_visual'));

}

function tickTock() {
	if(rackCheckOn){
		if(++rackTickCount==rackTickNum){
			rackTickCount = 0;
			var timeLeft = document.getElementById('miniplayer_progress').innerHTML;
			if(timeLeft == '0:00' || timeLeft == lastRackTime){
				unsafeWindow.t61.playlist.play_next_song();
				showMsg("Rack auto restarted.");
			}
			lastRackTime = timeLeft;
		}
	}

	if(autoRBOn){
		if(++autoRBTickCount == autoRBTickNum){
			autoRBTickCount = 0;
			triggerRadio();
		}
	}

	//do UI changes
	if (document.getElementById('t61ppRepDif') == null) {
		var userLevel=0;
		var userInfoDiv=null;
		var divs = document.getElementsByTagName('div')
		for(var i=0;i<divs.length;i++){
			if(divs[i].className=="cur_level") {
				userLevel = parseInt(divs[i].innerHTML);
			}else if(divs[i].className=="user_info"){
				userInfoDiv = divs[i];
			}
		}

		var strUserInfoNew = '';
		var repTotal = 0;
		if (userInfoDiv != null){
			var index = userInfoDiv.innerHTML.indexOf('<b>reputation</b>');
			var str = userInfoDiv.innerHTML.substring(index);
			index = str.indexOf('<li>total: ');
			repTotal = parseInt(str.substring((index + '<li>total: '.length), str.indexOf('</li>')));

			var nextlevel = userLevel+1;
			var repNeeded = unsafeWindow.t61.level.xp_requirements[nextlevel];
			var refDif = repNeeded - repTotal;

			userInfoDiv.innerHTML = userInfoDiv.innerHTML.replace('<li>total: ' + repTotal + '</li>', '<li>total: '+repTotal+' <span id="t61ppRepDif" style="color:#CC00FF;">('+refDif+' til next level)</span></li>');
			
			//Add "todayrep" below "per song" counter if on users own profile 
			var as=document.getElementsByTagName('a');for(var i=0;i<as.length;i++){if(as[i].className=="username"){profilename=as[i].innerHTML;break;}}
			if(profilename==unsafeWindow.t61.my_username){
				todayrep='<li style="color:#CC00FF;">today: '+(parseInt(repTotal)-parseInt(startrep))+'</li>';
				strpart=userInfoDiv.innerHTML.substring(userInfoDiv.innerHTML.indexOf(')</span></li>')+20);
				strpart2=strpart.substring(strpart,strpart.indexOf('</li>')+5);
				userInfoDiv.innerHTML=userInfoDiv.innerHTML.replace(strpart2,strpart2+todayrep);
			}
		}
	}

	//Check custom CSS
	setCompactCSS();

	//Add MaxBump Link
	autoMaxBump();

	setTimeout(tickTock, 1000*mainTick);
	timerCount++;
}

function autoMaxBump() {
	var divCollection = document.getElementsByTagName("div");
	for (var i=0; i<divCollection.length; i++) {
		var oDiv = divCollection[i];
		if (oDiv != null) {
			var divId = oDiv.getAttribute("id");
			if (divId != null) {
				if(divId.indexOf("song_info_") > -1) {
					var trackId = divId.substring("song_info_".length);	
					if(document.getElementById('maxBump' + trackId) != null){return;}
					var divCollection2 = oDiv.getElementsByClassName("actions");
					var oDiv2 = divCollection2[0];
					if (oDiv2 != null) {
						oDiv2.innerHTML = oDiv2.innerHTML.replace(/&nbsp;/g, '')+'<a id="maxBump' + trackId + '" style="color:#CC00FF;" href="#" onclick="event.cancelBubble=true;return false;">max!</a>';
					}
					document.getElementById('maxBump' + trackId).addEventListener('click', function(event) {
						var trackId = this.getAttribute("id").substring("maxBump".length);
						var level = document.getElementById('top_profile_cur_level').innerHTML;
						var bumpsLeft = document.getElementById('user_bumps_available').innerHTML;
						var bumps = level;
						if (bumpsLeft == 0) {
							showMsg("How can you max bump if you have no hearts silly!");
							return;
						} else if (bumpsLeft < level) {
							showMsg("You got less hearts than your max. I'll do my best!");
							bumps = bumpsLeft;
						} else {
							//showMsg("Starting to max bump. Just sit back and relax ;)");
						}
						maxTrack(bumps, trackId);
					}, true);
				}
			}
		}
	}
}

function maxTrack(bumps, trackId, count) {
	if(count==null){count=1;}
	if(count==1){
		showMsg("Detecting how many hearts you've done so far! (Bump 1 of ??)");
	}else if (count==2){
		var curDiv = document.getElementById('song_score_' + trackId);
		if (curDiv == null) {
			showMsg("I can't figure it out :(. Sowwy! I'll do my best! (Bump " + count + " of " + bumps + ")");
		} else {
			var curBumpStr = curDiv.innerHTML;		
			if (curBumpStr.indexOf('+') <= -1) {
				showMsg("I can't figure it out :(. Sowwy! I'll do my best! (Bump " + count + " of " + bumps + ")");
			} else {
				curBumpStr = curBumpStr.substring(1);
				if(curBumpStr==null || curBumpStr.length<=0 || isNaN(curBumpStr)) {
					showMsg("I can't figure it out :(. Sowwy! I'll do my best! (Bump " + count + " of " + bumps + ")");
				} else {
					var curBump = parseInt(curBumpStr);
					bumps = (bumps - curBump) + count;
					if (bumps <= count) {
						showMsg("You don't gots enough hearts silly!");
					}
					showMsg("Okies Ladies and Gents! I figured it out! (Bump " + count + " of " + bumps + ")");
				}
			}
		}
	} else if (count == Math.ceil(bumps/2)) {
		showMsg("Half way there! We can do this! (Bump " + count + " of " + bumps + ")");
	} else if (bumps == count) {
		showMsg("Last one! Hope it was as fun for you as it was for me! (Bump " + count + " of " + bumps + ")");
	} else {
		showMsg("Bumping away! (Bump " + count + " of " + bumps + ")");
	}

	//Just in case
	var divCollection = document.getElementsByClassName("notice_text");
	for (var i=0; i<divCollection.length; i++) {
		var oDiv = divCollection[i];
		if (oDiv != null) {
			if (oDiv.innerHTML.indexOf('You must be level') > -1 || oDiv.innerHTML.indexOf('Sorry you ran out of hearts') > -1) {
				showMsg("It looks like we hit your max! We did what we could!");
				return;
			}
		}
	}

	if (bumps > count) {
		try{unsafeWindow.t61.song.bump(trackId);} catch(e) {showMsg("I can't bump the song for some reason! Damn you t61!!");}
		setTimeout((function(){maxTrack(bumps, trackId, ++count);}), 1000*4);
	}
}

function triggerRadio() {
	if(!autoRBOn) {
		return;
	} else {
		showMsg("BOOM! RB'd " + autoRBuser + " (#" + ++rbCount + ")");
		unsafeWindow.t61.load_url(autoRBuser+'/radio');
	}
}

function setCompactCSS() {
	if (autoCompact) {
		if (checkUrlItems(partArray))
		{		
			//These styles were stolen (with permission :D) from "The Sixtyone Browse Compact" by Evony. 
			//MM - I put back the ads. Don't worry t61 -- we love you!
			//You can find it here - http://userstyles.org/styles/18907
			if (typeof GM_addStyle != "undefined") {
				GM_addStyle(customCSS);
			} else if (typeof addStyle != "undefined") {
				addStyle(customCSS);
			} else {
				var heads = document.getElementsByTagName("head");
				if (heads.length > 0) {
					var node = document.createElement("style");
					node.type = "text/css";
					node.appendChild(document.createTextNode(customCSS));
					heads[0].appendChild(node); 
				}
			}
		} else {
			clearCompactCSS();
		}
	}
}

function clearCompactCSS() {
	var heads = document.getElementsByTagName("head");
	heads[0].innerHTML = heads[0].innerHTML.replace(customCSS, '');
}

// ***
//Generic Methods/Objects
// ***
function showMsg(msg,noPrefix){
	var imgUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAIAAACRuyQOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAM1JREFUeNrslf0NgjAQxX+ygSt0BVboCq7ACq7QFZiljgAjsAIr4B8Gc8pVGoom6r0QUq6v97ivFAwAHkIG7VgoE2CCCZo0x0ELU2o7zi6enig4rbCHRLjSz0al82wZodY8NIuzK1B5TtgHaKHRKtGJ9G5UClq4gxacL1TqRCM48Rl3V7ob/Zq71FaV2dz9vKjFG7iUTIz6RyetTuM76nQTi4/t5xIjlatk+GscXjfhOimbWX0sJlPaTSkmbszlFZzP/Ons2TyZkuEbcR0A3/GM6ef1MTYAAAAASUVORK5CYII=";
	unsafeWindow.t61.notice.create(msg,imgUrl);
}

function checkUrlItems(partArray) {
	var url = window.location + '';
	for (var i in partArray) {
		if (partArray[i] == '*home*' && (url.endsWith('thesixtyone.com/') || url.endsWith('thesixtyone.com/#/'))) {
			return true;
		} else if (partArray[i] == '*browse*' && (url.indexOf('/browse/') > -1)) {
			return true;
		} else if (url.endsWith('/' + partArray[i] + '/')) {
			return true;
		}
	}
	return false;
}

String.prototype.endsWith = function(str){return(this.match(str+"$")==str)}

var Cookie = {
	set: function(name, value) {
		var daysToExpire = 365;
		var expire = '';
		if (daysToExpire != undefined) {
			var d = new Date();
			d.setTime(d.getTime() + (86400000 * parseFloat(daysToExpire)));
			expire = '; expires=' + d.toGMTString();
		}
		return (document.cookie = escape(name) + '=' + escape(value || '') + expire);
	},
	get: function(name) {
		if (!Cookie.accept())
			return "";
		var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
		return (cookie ? unescape(cookie[2]) : "");
	},
	erase: function(name) {
		var cookie = Cookie.get(name) || true;
		Cookie.set(name, '', -1);
		return cookie;
	},
	accept: function() {
		if (typeof (navigator.cookieEnabled) == 'boolean') {
			return navigator.cookieEnabled;
		}
		Cookie.set('_test', '1');
		return (Cookie.erase('_test') == '1');
	}
};

function RemoveClassName(objElement, strClass)
{

// if there is a class
if ( objElement.className )
  {

  // the classes are just a space separated list, so first get the list
  var arrList = objElement.className.split(' ');

  // get uppercase class for comparison purposes
  var strClassUpper = strClass.toUpperCase();

  // find all instances and remove them
  for ( var i = 0; i < arrList.length; i++ )
	 {

	 // if class found
	 if ( arrList[i].toUpperCase() == strClassUpper )
		{

		// remove array item
		arrList.splice(i, 1);

		// decrement loop counter as we have adjusted the array's contents
		i--;

		}
	 }

  // assign modified class name attribute
  objElement.className = arrList.join(' ');

  }
// if there was no class
// there is nothing to remove

}


//go go go!
doIt();