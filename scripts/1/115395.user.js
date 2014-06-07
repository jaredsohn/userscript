// ==UserScript==
// @name           D2
// @author         gvozden
// @description    D2
// @version     d2
// ==/UserScript==

javascript:(function(){
	var whichjob = false, jobbing_text = 'Create A Distraction [2.328]';
	var RobOrFoB = false, SMD_text = 'Question Some Meth Heads [2.2250]';
	var StopOn = false, finish_text = 'Let me know';
	var abcd = true, opts_text = 'Show Options';
	var DroneOnOff = true;
	var JobberInterval;
	var FightLVInterval;
	var onoffInterval;
	var MeepInterval;
	var att_apply = '';
	var def_apply = '';	
	var health_apply = '';
	var energy_apply = '';
	var stam_apply = '';
	var EnAlways = 'checked';
	var StaAlways = '';
	var WhereAmI = HereYouIs();
	var RobWhere = getCity();
	var cheater = 0;
	var Meep = 0;
    var xw_user = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
	var xw_sig = local_xw_sig;
	var rref = 7000;
	var rjref = 1000;
	var plref = 4000;
	var robslowdown = 750;
	var restartref = 1800000;
	var doireallynothaveenorstam = 0;
	var RobOn;
	var lolkey;
	var trimdlolkey;
	var cheeta = 0;
	var gxpic = 'data:image/png;base64,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';

/*	function topshelfstuff() {
		// Start Esailija & Mr Sim y0 Magic edit
			var mlbarr = 0;
			mlbarr = window.setInterval( function(){
				if( document.getElementById("mw_like_button") ) {
					$('#mw_like_button').remove();
					window.clearInterval ;
				}
			}, 50 );
			var sbarr = 0;
			sbarr = window.setInterval( function(){
				if( document.getElementById("snapi_zbar") ) {
					$('#snapi_zbar').parent().remove();
					window.clearInterval ;
				}
			}, 50 );
		// End Esailija & Mr Sim y0 Magic edit
	}topshelfstuff()
*/	
	function rzc() {
		$('#popup_fodder_zmc #pop_zmc').remove();
		$('#mw_like_button').remove();
		$('iframe[name="mafiawars_zbar"]').parent().remove();
		$('#snapi_zbar').parent().remove();
		$('#zbar').parent().remove();
		$('#mafia_two_banner').remove();		
	}rzc()
		
	function create_div() {
		if(document.getElementById('gxDiv')) {
			document.getElementById('gxDiv').innerHTML = config_html;
		} else {
			var gxDiv=document.createElement("div");
			gxDiv.id = 'gxDiv';
			content.insertBefore(gxDiv, content.firstChild);
			document.getElementById('gxDiv').innerHTML = config_html;
		}
	}
	
	function createaproblem() {
		if(document.getElementById('gxDiv')) {
			document.getElementById('gxDiv').innerHTML = problems;
		} else {
			var gxDiv=document.createElement("div");
			gxDiv.id = 'gxDiv';
			content.insertBefore(gxDiv, content.firstChild);
			document.getElementById('gxDiv').innerHTML = problems;
		}
	}
	
	var problems = '<style>'+
'#wrapper{position:fixed;top:105px;right:550px;width:225px;padding-top:2px;border:white solid 2px;background:white;z-index:9999;border-radius:10px;}'+
'</style><div id="wrapper"><img id="prevs" src="http://www.creallaborate.com/guessx/probsm.png"></div>';
		
	var version='<a href="http://www.creallaborate.com/guessx/">GuessX\'s</a> Drone.&#12324; - v2.64';
	var content=document.getElementById('content_row');
	var config_html =
		'<div class="messages" style="margin:5px">'+
		'<div style="text-align:right;vertical-align:top;">'+version+' - <img id="close" src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16" /></div>'+
		'<div><div style="background-image:url('+gxpic+'); background-position:right; background-repeat: no-repeat;">'+
		'<p>Energy is set to do this job: <a href="#" id="jobbrz" class="sexy_button_new short green sexy_energy_new"><span><span>' + jobbing_text + '</span></span></a></p>'+
		'<p>Stamina is set to do this: <a href="#" id="FobOrRob" class="sexy_button_new short orange sexy_attack_new impulse_buy"><span><span>' + SMD_text + '</span></span></a></p>'+
		'<p>When im out of stamina &amp; energy: <a href="#" id="whatfinish" class="sexy_button_new short black"><span><span>' + finish_text + '</span></span></a></p>Use Energy whenever you have enough? <input id="EnAlways" type="radio" checked="CHECKED" name="zoomy" '+EnAlways+'/><br>Use Stamina whenever you have enough? <input id="StaAlways" type="radio" name="zoomy" '+StaAlways+'/></div>'+
		'<br><BR><a id="Skillz" href="#">' + opts_text + '</a><br>'+
		'<span id="skillz-row" style="display:none">'+
		'<center><table width="99%" border="1">'+
		'<tr><th>Apply Skillpoints?</th><th>Speed Options</th></tr>'+
		'<tr>'+
		'<td width="50%"><input type="radio" checked="CHECKED" name="zoom">No!</td>'+
		'<td>Robbing Refresh Rate&nbsp;<input value="' + (rref / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid1"> seconds.</td>'+
		'</tr>'+
		'<tr>'+
		'<td><input type="radio" name="zoom" id="att_apply">Skill points to Attack.</td><td>RepeatJob Refresh Rate&nbsp;<input value="' + (rjref / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid2"> seconds.</td>'+
		'</tr>'+
		'<tr>'+
		'<td><input type="radio" name="zoom" id="def_apply">Skill points to Defense.<br></td><td>Pageload Rate&nbsp;<input value="' + (plref / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid3"> seconds.</td>'+
		'</tr>'+
		'<tr>'+
		'<td><input type="radio" name="zoom" id="health_apply">Skill points to Health.</td><td>Restart in&nbsp;<input value="' + (restartref / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid4"> seconds. (1800 = 30mins)</td>'+
		'</tr>'+
		'<tr>'+
		'<td><input type="radio" name="zoom" id="energy_apply">Skill points to Energy.</td><td>Rob Individual Speed&nbsp;<input value="' + (robslowdown / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid5"> seconds. (.75 is a safe speed)</td>'+
		'</tr>'+
		'<tr>'+
		'<td><input type="radio" name="zoom" id="stam_apply">Skill points to Stamina.</td>'+
		'</tr>'+
		'</table></center>'+
		'</span><br>'+		//pah doopid formatting that didnt wanna work for me!!
		'<div style="text-align:right;vertical-align:top;"><font size="1">*The last version of Drone can be found on my site. If you encounter errors with this version let me know.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><a href="#" id="start" class="sexy_button_new short white"><span><span>Start</span></span></a></div>'+
		'</div>';

		create_div();

	$('#close').click(function(){
		$('#gxDiv').remove();
	});
	
	document.getElementById("start").onclick=GoTime;
	
	document.getElementById("Skillz").onclick = function () {
		if (abcd){
			abcd=false;
			document.getElementById("skillz-row").style.display = ''		
			opts_text = document.getElementById("Skillz").innerHTML = "Hide Options"
		} else {
			abcd=true;
			document.getElementById("skillz-row").style.display = 'none';
			opts_text = document.getElementById("Skillz").innerHTML = "Show Options"
		}
	};

	document.getElementById('EnAlways').onchange=function() {
		EnAlways = (document.getElementById('EnAlways').checked ? "checked" : "");
	};
	document.getElementById('StaAlways').onchange=function() {
		StaAlways = (document.getElementById('StaAlways').checked ? "checked" : "");
	};
	document.getElementById('att_apply').onchange=function() {
		att_apply = (document.getElementById('att_apply').checked ? "checked" : "");
	};
	document.getElementById('def_apply').onchange=function() {
		def_apply = (document.getElementById('def_apply').checked ? "checked" : "");
	};
	document.getElementById('health_apply').onchange=function() {
		health_apply = (document.getElementById('health_apply').checked ? "checked" : "");
	};
	document.getElementById('energy_apply').onchange=function() {
		energy_apply = (document.getElementById('energy_apply').checked ? "checked" : "");
	};
	document.getElementById('stam_apply').onchange=function() {
		stam_apply = (document.getElementById('stam_apply').checked ? "checked" : "");
	};
	
	document.getElementById("jobbrz").onclick = function () {
		    if (whichjob == true){
				whichjob = 2;
                document.getElementById("jobbrz").setAttribute("class", "sexy_button_new short white sexy_energy_new");
                jobbing_text = document.getElementById("jobbrz").innerHTML = "<span><span>Stash The Take [1.9879]</span></span>";
            }else if (whichjob == 2) {
				whichjob = 3;
                document.getElementById("jobbrz").setAttribute("class", "sexy_button_new short purple sexy_energy_new");
                jobbing_text = document.getElementById("jobbrz").innerHTML = "<span><span>Trap Di Rossi's Top Capo [1.8982]</span></span>";
            } else if (whichjob == 3) {
                whichjob = 4;
                document.getElementById("jobbrz").setAttribute("class", "sexy_button_new short orange sexy_energy_new");
                jobbing_text = document.getElementById("jobbrz").innerHTML = "<span><span>Bribe a Taubate Prison Worker [2.221]</span></span>";
            } else if (whichjob == 4) {
                whichjob = 5;
                document.getElementById("jobbrz").setAttribute("class", "sexy_button_new short green sexy_energy_new");
                jobbing_text = document.getElementById("jobbrz").innerHTML = "<span><span>Secure Hooch to Sell [2.136]</span></span>";
            } else if (whichjob == 5) {
                whichjob = false;
                document.getElementById("jobbrz").setAttribute("class", "sexy_button_new short orange sexy_energy_new");
                jobbing_text = document.getElementById("jobbrz").innerHTML = "<span><span>Create A Distraction [2.328]</span></span>";
            }else {
                whichjob = true;
                document.getElementById("jobbrz").setAttribute("class", "sexy_button_new short red sexy_energy_new");
                jobbing_text = document.getElementById("jobbrz").innerHTML = "<span><span>Assassinate the Neo-Imperium [2.191]</span></span>";
            } 		
	};
	
	document.getElementById("FobOrRob").onclick = function () {  
		    if (RobOrFoB == true){
				RobOrFoB = 2;
				RobOn = false;				
                document.getElementById("FobOrRob").setAttribute("class", "sexy_button_new short purple sexy_attack_new impulse_buy");
                jobbing_text = document.getElementById("FobOrRob").innerHTML = "<span><span>Eliminate A Hill Supplier [2.2578]</span></span>";
            }else if (RobOrFoB == 2) {
				RobOrFoB = 3;
				RobOn = true;								
                document.getElementById("FobOrRob").setAttribute("class", "sexy_button_new short green sexy_attack_new impulse_buy");
                jobbing_text = document.getElementById("FobOrRob").innerHTML = "<span><span>Rob in "+RobWhere+"</span></span>";
            } else if (RobOrFoB == 3) {
                RobOrFoB = 4;
				RobOn = true;				
                document.getElementById("FobOrRob").setAttribute("class", "sexy_button_new short white sexy_attack_new impulse_buy");
                jobbing_text = document.getElementById("FobOrRob").innerHTML = "<span><span>Rob in NY [2.669]</span></span>";
            } else if (RobOrFoB == 4) {
                RobOrFoB = false;
				RobOn = false;				
                document.getElementById("FobOrRob").setAttribute("class", "sexy_button_new short orange sexy_attack_new impulse_buy");
                jobbing_text = document.getElementById("FobOrRob").innerHTML = "<span><span>Question Some Meth Heads [2.2250]</span></span>";
            } else {
                RobOrFoB = true;
				RobOn = false; 
                document.getElementById("FobOrRob").setAttribute("class", "sexy_button_new short red sexy_attack_new impulse_buy");
// Old Styling->document.getElementById("FobOrRob").setAttribute("class", "sexy_button_new short red sexy_energy_new");				
                jobbing_text = document.getElementById("FobOrRob").innerHTML = "<span><span>Escape From Rome Police [2.0430]</span></span>";
            } 		
	};

	document.getElementById("whatfinish").onclick = function () {
		if (StopOn) {
			StopOn = false;
            document.getElementById("whatfinish").setAttribute("class", "sexy_button_new short black");
			finish_text = document.getElementById("whatfinish").innerHTML = "<span><span>Let me know</span></span>"
		} else {
			StopOn = true;
            document.getElementById("whatfinish").setAttribute("class", "sexy_button_new short purple");
			finish_text = document.getElementById("whatfinish").innerHTML = "<span><span>Restart in a bit!</span></span>"
		}
		return false
	};	

		function HereYouIs() {
			if ($('#mw_city_wrapper').hasClass('mw_city1')) {
				return 1
			} else if ($('#mw_city_wrapper').hasClass('mw_city2')) {
				return 2
			} else if ($('#mw_city_wrapper').hasClass('mw_city3')) {
				return 3
			} else if ($('#mw_city_wrapper').hasClass('mw_city4')) {
				return 4
			} else if ($('#mw_city_wrapper').hasClass('mw_city5')) {
				return 5
			} else if ($('#mw_city_wrapper').hasClass('mw_city6')) {
				return 6
			} else if ($('#mw_city_wrapper').hasClass('mw_city7')) {
				return 7
			} else if ($('#mw_city_wrapper').hasClass('mw_city8')) {
				return 8
			}	
		}
		
		function getCity(){
			var city = $('#mw_city_wrapper').attr('class');
			switch(city){
			case 'mw_city1':
				return 'New York';
			case 'mw_city2':
				return 'Cuba';
			case 'mw_city3':
				return 'Moscow';
			case 'mw_city4':
				return 'Bangkok';
			case 'mw_city5':
				return 'Las Vegas';
			case 'mw_city6':
				return 'Italy';
			case 'mw_city7':
				return 'Brazil';
			case 'mw_city8':
				return 'Chicago';	
			default:
				return 'UnknowCity';
			}
		}
		
		function GoTime() {
//			onoffInterval = setInterval(offon,1000)
//			offon();
			try {
			rref = parseInt(document.getElementById("postformid1").value) * 1000;
			rjref = parseInt(document.getElementById("postformid2").value) * 1000;	
			plref = parseInt(document.getElementById("postformid3").value) * 1000;
			restartref = parseInt(document.getElementById("postformid4").value) * 1000;
			robslowdown = parseInt(document.getElementById("postformid5").value) * 1000;
//			var selected = $("input[@name=zoom]:checked").attr('id');
			}catch (err){}
			var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEn = parseInt(document.getElementById('user_energy').innerHTML);
			var stamy = 120;
			if (RobOn) {
				stamy = 50;
			}else if(RobOrFoB == 3){
				stamy = 128;
			}else if(RobOrFoB == 4){
				stamy = 279;
			}
			var howmuchy = 594;
			if (whichjob == true) {
				howmuchy = 810;
			}
			else if (whichjob == 2) {
				howmuchy = 226;
			}
			else if (whichjob == 3) {
				howmuchy = 165;
			}
			else if (whichjob == 4) {
				howmuchy = 648;
			}
			else if (whichjob == 5) {
				howmuchy = 324;
			}
			if ((DoesIHaveStamina < stamy) && (DoesIHaveEn < howmuchy)) {
					alert('You need a minimum of '+howmuchy+' Energy or '+stamy+' Stamina to run this!');
					return;
					}
			if (DoesIHaveEn < howmuchy) {
					setTimeout(FobOrRobTravelr,3500);
					return;
			}else {
				setTimeout(JobTravelr,3500);
				return;
			}
		}

		function offon() {
			thenumber = document.getElementById('exp_to_next_level').innerHTML;
			document.getElementsByClassName('experience')[0].innerHTML = 'Exp to level <span id="exp_to_next_level">'+thenumber+'</span><br><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"> <a href="#" id="killzdrone">Drone.&#12324;</a> <span id="showstatus" style="display:none">Off</span>';
		
//			thenumber = document.getElementById('exp_to_next_level').innerHTML;
//			document.getElementById('exp_to_next_level').innerHTML = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"> <a href="#" id="killzdrone">Drone.&#12324;<span id="showstatus" style="display:none">Off</span></a> '+thenumber+'';
			
			document.getElementById("killzdrone").onclick = function () {
				if (DroneOnOff) {
					DroneOnOff = false;
					document.getElementById("showstatus").style.display = ''		
	//				clearInterval(onoffInterval);
				} else {
					DroneOnOff = true;
					GoTime();
					document.getElementById("showstatus").style.display = 'none';
				}
			};
		}		
		
//		function TakeMeToRobNow(){
//			do_ajax ('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination=1&from=robbing&zone=1&nextParams=&menu=travel')
//			setTimeout(LetThereBeRobberies, (plref));
//			setTimeout(offon,4800);
//			return;
//		}
		
		function Travelmeepmeep(){
			do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=5&tab=8');
			setTimeout(Meepmeep,(plref));
			return;
		}
		
		function Meepmeep() {
			clearInterval(MeepInterval);
			if(Meep==3){
				setTimeout(JobTravelr,3500);
				return;
			}
			else{
				ExpertMapController.selectNode(73);
				MapController.panelButtonDoJob(73);
				Meep++;
			}
		MeepInterval = setInterval(Meepmeep,(rjref));
		}
		
		function GetFobKeys() { // All Credit to Sam!
			lolkey = /Job\((.+)\)/.exec(document.getElementById("fight_list0").onclick)[1];
			if (RobOrFoB == 2){
				lolkey = /Job\((.+)\)/.exec(document.getElementById("fight_list4").onclick)[1];
			}
			else if (RobOrFoB == true){
				lolkey = /Job\((.+)\)/.exec(document.getElementById("fight_list4").onclick)[1];
			}
			trimdlolkey = lolkey.replace(/"/g, "'");
//			alert(trimdlolkey);
//			return;
			setTimeout(DoFobFight, 500);
			return;
		}
		
		function FobOrRobTravelr(){
			if (RobOrFoB == true){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=6&tab=8');
				}
			else if (RobOrFoB == 2){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=5&tab=6');
			}
			else if (RobOrFoB == 3){
				do_ajax ('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination='+WhereAmI+'&from=robbing&zone=1&nextParams=&menu=travel')
			}
			else if (RobOrFoB == 4){
				do_ajax ('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination=1&from=robbing&zone=1&nextParams=&menu=travel')
			}
			else {
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=5&tab=8');
			}
			if (RobOn){
				setTimeout(LetThereBeRobberies, (plref));
				setTimeout(offon,4800);
				return;
			}
			else {
//				setTimeout(GetFobKeys,(plref));
				cheeta = 0;
				setTimeout(DoFobFight,(plref));
				setTimeout(offon,4800);
				return;
			}
		}

		function JobTravelr(){
			if (whichjob == true){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=7&tab=8');
			}
			else if (whichjob == 2){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=5&tab=5');
			}
			else if (whichjob == 3){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=6&tab=8');
			}
			else if (whichjob == 4){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=7&tab=8');
			}
			else if (whichjob == 5){
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=8&tab=2');
			}			
			else {
//				createaproblem();
//				return;
				do_ajax('mainDiv','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=7&tab=103');
			}
			cheater = 0;
			Meep = 0;
			setTimeout(DoAJob,(plref));
			setTimeout(offon,6000);
			return;
		}
				
		// Esailija magik popupfix	
		function CloseDoopidPopup() { 
			if($('.pop_bg').length>0){
				$('.pop_bg').each( function(){
					var id = this.id;
					MW.Popup.hide( id.substr( id.lastIndexOf("_") +1 ) )
				});
			}
		} // Esailija magik end
		
		function LetThereBeRobberies() {
			var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEn = parseInt(document.getElementById('user_energy').innerHTML);
			var gotskills = parseInt($('#user_skill').text());
			//offon();
			if (!DroneOnOff){
					return;
			}
			if ((gotskills > 0) && (att_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=attack&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (def_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=defense&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (health_apply == 'checked')) {
				do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_health&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (energy_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_energy&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (stam_apply == 'checked')) {
				do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_stamina&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			var stamy = 120;
			if (RobOn) {
				stamy = 50;
			}else if(RobOrFoB == 2){
				stamy = 128;
			}else if(RobOrFoB == true){
				stamy = 279;
			}
			var howmuchy = 594;
			if (whichjob == true) {
				howmuchy = 810;
			}
			else if (whichjob == 2) {
				howmuchy = 226;
			}
			else if (whichjob == 3) {
				howmuchy = 165;
			}
			else if (whichjob == 4) {
				howmuchy = 648;
			}
			else if (whichjob == 5) {
				howmuchy = 324;
			}			
			if ((DoesIHaveStamina < stamy) && (DoesIHaveEn < howmuchy)) {
				if(DoesIHaveEn > 165){
					setTimeout(Travelmeepmeep,3500);
					return;
				}
				if (doireallynothaveenorstam < 5){
					doireallynothaveenorstam++
					setTimeout(FobOrRobTravelr,3500);
					return;
				}
				if (StopOn){
						setTimeout(GoTime,(restartref));
						return;
					}
					else {
						alert('Not enough Energy or Stamina to continue!');
						return;
					}
			}
			if (DoesIHaveStamina < stamy) {
					setTimeout(JobTravelr,3500);
					return;
				}
			if ((EnAlways == 'checked') && (DoesIHaveEn > howmuchy)) {
				setTimeout(JobTravelr,3500);
				return;
				}
				else {
				doireallynothaveenorstam = 0;
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=0', 1, 0, RobbingController.preRob(0), RobbingController.rob);
					setTimeout(slotone, (robslowdown));
					return;
				}
		}
				function slotone() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=1', 1, 0, RobbingController.preRob(1), RobbingController.rob);
					setTimeout(slottwo, (robslowdown));
					return;
				}
				function slottwo() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=2', 1, 0, RobbingController.preRob(2), RobbingController.rob);
					setTimeout(slotfee, (robslowdown));
					return;
				}
				function slotfee() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=3', 1, 0, RobbingController.preRob(3), RobbingController.rob);
					setTimeout(slotthaw, (robslowdown));
					return;
				}					
				function slotthaw() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=4', 1, 0, RobbingController.preRob(4), RobbingController.rob);
					setTimeout(slotthumb, (robslowdown));
					return;
				}
				function slotthumb() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=5', 1, 0, RobbingController.preRob(5), RobbingController.rob);
					setTimeout(slotumm, (robslowdown));
					return;
				}					
				function slotumm() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=6', 1, 0, RobbingController.preRob(6), RobbingController.rob);
					setTimeout(slotdumb, (robslowdown));
					return;
				}
				function slotdumb() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=7', 1, 0, RobbingController.preRob(7), RobbingController.rob);
					setTimeout(slotsome, (robslowdown));
					return;
				}
				function slotsome() {
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+WhereAmI+'&slot=8', 1, 0, RobbingController.preRob(8), RobbingController.rob);
					setTimeout(RefreshMe, (rref));
				return;
				}
		
		function RefreshMe() {
			try{ 
				var IsEveryoneDeadYet = document.evaluate("//a[@id=\"rob_refresh_cost\"]//span//span[contains(string(),'Refresh: 0')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
				if(IsEveryoneDeadYet.snapshotLength >= 1){
					do_ajax ('', 'remote/html_server.php?xw_controller=robbing&xw_action=refresh');
					setTimeout(KickMeBackToThirdGrade, (plref));
					return;
				} else {
					LetThereBeRobberies(); 
					return;
				}
			} catch(err){}
		}
	
		function KickMeBackToThirdGrade() {
			CloseDoopidPopup(); 
			LetThereBeRobberies()
			return;
		}

		function xpathFirst(p, c) { //Big thank you to Ronny for this & In association with donnaB who btw lives under the patio
			return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		}
		
		function DoFobFight() {
			var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEn = parseInt(document.getElementById('user_energy').innerHTML);
			var gotskills = parseInt($('#user_skill').text());
//			var WhichTab = $('#map_container').text();
//			var FindItNow = /NORTH LAS VEGAS/g;
//			var Annnnd = FindItNow.test(WhichTab);
//			offon();
			if (!DroneOnOff){
					return;
			}
			if ((gotskills > 0) && (att_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=attack&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (def_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=defense&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (health_apply == 'checked')) {
				do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_health&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (energy_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_energy&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (stam_apply == 'checked')) {
				do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_stamina&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			var stamy = 120;
			if (RobOn) {
				stamy = 50;
			}else if(RobOrFoB == 2){
				stamy = 128;
			}else if(RobOrFoB == true){
				stamy = 279;
			}
			var howmuchy = 594;
			if (whichjob == true) {
				howmuchy = 810;
			}
			else if (whichjob == 2) {
				howmuchy = 226;
			}
			else if (whichjob == 3) {
				howmuchy = 165;
			}
			else if (whichjob == 4) {
				howmuchy = 648;
			}
			else if (whichjob == 5) {
				howmuchy = 324;
			}			
			clearInterval(FightLVInterval);
//			if (Annnnd == true){
//				setTimeout(FobOrRobTravelr,3500);
//				return;
//			}
				if ((DoesIHaveStamina < stamy) && (DoesIHaveEn < howmuchy)) {
					if (doireallynothaveenorstam < 5){
						doireallynothaveenorstam++;
						setTimeout(FobOrRobTravelr,3500);
						return;
					}
					if((DoesIHaveEn > 165) && (DoesIHaveEn < howmuchy)){
						setTimeout(Travelmeepmeep,3500);
						return;
					}
				if (StopOn){
						setTimeout(GoTime,(restartref));
						return;
					}
					else {
						alert('Not enough Energy or Stamina to continue!');
						return;
					}
				}
			if (DoesIHaveStamina < stamy) {
					setTimeout(JobTravelr,3500);
					return;
				}				
			if ((EnAlways == 'checked') && (DoesIHaveEn > howmuchy)) {
				setTimeout(JobTravelr,3500);
//				cheater = 0;
				return;
				}	
				else {
				doireallynothaveenorstam = 0;

//Big thank you to Ronny for this & In association with donnaB who btw lives under the patio
				var clickMeV = xpathFirst('.//a[contains(@onclick,"doFightJob(72")]');
				if (RobOrFoB == true) {
					clickMeV = xpathFirst('.//a[contains(@onclick,"doFightJob(82")]');
				} 
				else if (RobOrFoB == 2) {
					clickMeV = xpathFirst('.//a[contains(@onclick,"doFightJob(54")]');
				} 
				var evtV = document.createEvent("MouseEvents");
					if (clickMeV == null){
						setTimeout(FobOrRobTravelr,3500);
						return;
					}
				evtV.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				clickMeV.dispatchEvent(evtV);
				}
			CloseDoopidPopup();	
			FightLVInterval = setInterval(DoFobFight,(rjref));
		}	
	
		function DoAJob() {
			var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
			var DoesIHaveEn = parseInt(document.getElementById('user_energy').innerHTML);
			var gotskills = parseInt($('#user_skill').text());

	//	offon();
			if (!DroneOnOff){
					return;
			}
			if ((gotskills > 0) && (att_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=attack&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (def_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=defense&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (health_apply == 'checked')) {
				do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_health&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (energy_apply == 'checked')) {
                 do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_energy&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			if ((gotskills > 0) && (stam_apply == 'checked')) {
				do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=max_stamina&upgrade_amt=5&no_load=1&source=level_up_popup');
			}
			var stamy = 120;
			if (RobOn) {
				stamy = 50;
			}else if(RobOrFoB == 2){
				stamy = 128;
			}else if(RobOrFoB == true){
				stamy = 279;
			}
			var howmuchy = 594;
			if (whichjob == true) {
				howmuchy = 810;
			}
			else if (whichjob == 2) {
				howmuchy = 226;
			}
			else if (whichjob == 3) {
				howmuchy = 165;
			}
			else if (whichjob == 4) {
				howmuchy = 648;
			}
			else if (whichjob == 5) {
				howmuchy = 324;
			}			
			clearInterval(JobberInterval);
				if ((DoesIHaveStamina < stamy) && (DoesIHaveEn < howmuchy)) {
					if (doireallynothaveenorstam < 5){
						doireallynothaveenorstam++;
						setTimeout(JobTravelr,3500);
						return;
					}
					if((DoesIHaveEn > 165) && (DoesIHaveEn < howmuchy)){
						setTimeout(Travelmeepmeep,3500);
						return;
					}
					if (StopOn){
						setTimeout(GoTime,(restartref));
						return;
					}
					else {
						alert('Not enough Energy or Stamina to continue!');
						return;
					}
				}
				if (DoesIHaveEn < howmuchy) {
					if (RobOrFoB){
						setTimeout(FobOrRobTravelr,3500);
						return;
					}
					else {
						setTimeout(FobOrRobTravelr,3500);
						return;
					}
				}
				if ((StaAlways == 'checked') && (DoesIHaveStamina > stamy)) {
					if (RobOrFoB){
						setTimeout(FobOrRobTravelr,3500);
						return;
					}
					else {
						setTimeout(FobOrRobTravelr,3500);
						return;
					}
				}
				else {
				doireallynothaveenorstam = 0;
				if (whichjob == true) {
						var clickMe = document.getElementById("btn_dojob_95"); //d8
						var evt = document.createEvent("MouseEvents");
						if (clickMe == null){
						setTimeout(JobTravelr,3500);
						return;
						}
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						clickMe.dispatchEvent(evt);
					}
					else if (whichjob == 2) {// v5
						ExpertMapController.selectNode(44); MapController.panelButtonDoJob(44)
					}
					else if (whichjob == 3){ // i8 
						ExpertMapController.selectNode(78); MapController.panelButtonDoJob(78)
					}
					else if (whichjob == 4){ // d8 money job 
						var clickMe = document.getElementById("btn_dojob_87"); //d8
						var evt = document.createEvent("MouseEvents");
						if (clickMe == null){
						setTimeout(JobTravelr,3500);
						return;
						}
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						clickMe.dispatchEvent(evt);
					} else if (whichjob == 5){ // d2 Chicago 
						var clickMe = document.getElementById("btn_dojob_10"); 
						var evt = document.createEvent("MouseEvents");
						if (clickMe == null){
						setTimeout(JobTravelr,3500);
						return;
						}
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						clickMe.dispatchEvent(evt);	
					} else { 
						var clickMe = document.getElementById("btn_dojob_306"); //district is a secret
						var evt = document.createEvent("MouseEvents");
						if (clickMe == null){
						setTimeout(JobTravelr,3500);
						return;
						}
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						clickMe.dispatchEvent(evt);
/*						if(cheater == 0){
						var whatisit = /tmp=(.*?)&/.exec(document.getElementsByClassName('sexy_button_new short orange sexy_energy_new impulse_buy')[1])[1];
						do_ajax('mainDiv','remote/html_server.php?xw_controller=job&xw_action=dojob&xw_city=2&tmp='+whatisit+'&job=1&tab=1');
						cheater++;
						JobberInterval = setInterval(DoAJob,(plref));
						return;
						}
    Job = document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    Job = Job.snapshotItem(0).innerHTML;
                    city = /mw_city(\d)/.exec(document.getElementById("mw_city_wrapper").className)[1];
                    url = "html_server.php?xw_controller=job&xw_action=dojob&xw_city=" + city + "&tmp=" + (/tmp=([\da-f]+)/.exec(Job))[1] + "&cb=" + (/cb=([\da-f]+)/.exec(Job))[1] + "&xw_person=" + (/person=([\d]+)/.exec(Job))[1] + "&job=" + (/job=([\d]+)/.exec(Job))[1] + "&tab=" + (/tab=([\d]+)/.exec(Job))[1]
                var client = new XMLHttpRequest();
                client.open("POST", url, true);
                client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
 */ //                client.setRequestHeader("Accept", "*/*");
 /*               client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + xw_sig + "&skip_req_frame=1");
                client.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        response = client.responseText;
                        if ((/user_cash_nyc":"([$\d,]+)"/.test(response))) {
                            document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
                            document.getElementById("level_bar").setAttribute("style", "overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: " + (/percent_complete":([\d]+),"/.exec(response))[1] + "%;");
                            document.getElementById("user_stamina").innerHTML = (/"user_stamina":([\d]+),"user_max_stamina/.exec(response))[1]
                        } else {
                            if ((/user_cash_nyc'\] = "([$\d,]+)/.test(response))) {
                                document.getElementById("inner_page").innerHTML = response;
                                document.getElementById("user_energy").innerHTML = (/user_energy'\] = parseInt\("([\d]+)/.exec(response))[1];
                                document.getElementById("level_bar").setAttribute("style", "overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: " + (/percent_complete'\] = "([\d]+)/.exec(response))[1] + "%;");
                                document.getElementsByClassName("cur_cash").innerHTML = (/user_cash'\] = parseInt\("([\d]+)/.exec(response))[1];
                                document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
                                document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_brazil").innerHTML = (/'user_cash_brazil'\] = "([BRL$\d,]+)"/.exec(response))[1]
                            }
                        }
                    }
                } */
					}
				}
			CloseDoopidPopup();	
			JobberInterval = setInterval(DoAJob,(rjref));
		}

//add analytics
	function loadContent(file) {
        var head=document.getElementsByTagName('head').item(0);
        var scriptTag=document.getElementById('loadScript');
        if(scriptTag)head.removeChild(scriptTag);
        script=document.createElement('script');
        script.src=file;
        script.type='text/javascript';
        script.id='loadScript';
        head.appendChild(script);
        setTimeout(load,1000)
    }
    loadContent('http://www.google-analytics.com/ga.js');
    function load() {
        try
            {
            var pageTracker=_gat._getTracker("UA-22157492-1");
            pageTracker._trackPageview("/gxsdrone")
        }
        catch(err)
            {
        }
    }
//end analytics

}())