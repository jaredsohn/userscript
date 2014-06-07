// ==UserScript==
// @name dontreallyhaveone
// @desription none
// ==/UserScript==

// all credit go to the man below, i take none

javascript:(function(){
	var xw_user = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
	var city = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
	var stamOn = false, fightx_text = 'Off';
	var healOn = false, aheal_text = 'Off';
	var CurHealth;
	var healInterval;
	var healat = 1000;
	var killertiming = 5000;
	var startthekillmachine = false;
	var killerintervals;
	
	var sidey = '<style>'+
'#wrapper{position:fixed;top:5px;right:5px;width:225px;padding-top:2px;border:white solid 2px;background:black;z-index:9999;border-radius:10px;}'+
'</style><div id="wrapper">Fight.&#12324; is <a id="FHELP" href="#">' + fightx_text + '</a><BR>Autohealer is <a id="AHEAL" href="#">' + aheal_text + '</a><BR>Attack Speed: <input id="killertimingi" type="text" value="777" maxlength="4" style="resize:none;width:35px;" /><BR>Autoheal @: <input id="healati" type="text" value="500" maxlength="4" style="resize:none;width:35px;"/><br></div>';

	if($('#sidey').length == 0){
		$('body').append(sidey);
	}

		$('#popup_fodder_zmc #pop_zmc').remove();
		$('#mw_like_button').remove();
		$('iframe[name="mafiawars_zbar"]').parent().remove();
		$('#snapi_zbar').parent().remove();
		$('#zbar').parent().remove();

document.getElementById("FHELP").onclick = function () {
		if (stamOn) {
			stamOn = false;
			clearInterval(killerintervals);			
//			startthekillmachine = false;		
			fightx_text = document.getElementById("FHELP").innerHTML = "Off"
		} else {
			stamOn = true;
//			startthekillmachine = true;
			killertiming = parseInt(document.getElementById("killertimingi").value);
			killerintervals = setInterval(kill, killertiming);
			fightx_text = document.getElementById("FHELP").innerHTML = "On"
		}
		return false
};

document.getElementById("AHEAL").onclick = function () {
		if (healOn) {
			healOn = false;
			clearInterval(healInterval);
			aheal_text = document.getElementById("AHEAL").innerHTML = "Off"
		} else {
			healInterval = setInterval(DoAutoHeal, 3000);
			healOn = true;
			aheal_text = document.getElementById("AHEAL").innerHTML = "On"
		}
		return false
};

	function DoAutoHeal(){
		healat = parseInt(document.getElementById("healati").value);
		var url = "html_server.php?xw_controller=survey&xw_action=show_nps_survey&xw_client_id=8";
		var maxHealth = parseInt(document.getElementById('user_max_health').innerHTML);
		var HealthPCent = parseInt(maxHealth * .20);
		if(HealthPCent > healat) {healat = HealthPCent}
		CurHealth = parseInt(document.getElementById('user_health').innerHTML);
		var client = new XMLHttpRequest();
		client.open("POST", url, true);
		client.setRequestHeader("X-Requested-With","XMLHttpRequest");
		client.setRequestHeader("Accept","*/*");
		client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		client.send("ajax=1&liteload=1&sf_xw_user_id="+xw_user+"&sf_xw_sig="+local_xw_sig+"&skip_req_frame=1");
		client.onreadystatechange = function() {
			if(this.readyState == 4) {
				response=client.responseText;
				CurHealth = parseInt(document.getElementById("user_health").innerHTML);
				if(parseInt(CurHealth) < healat){HealNY()}
			}
		}
	}

	function HealNY(){
		url = 'html_server.php?xw_controller=hospital&xw_action=heal&xcity=1';
		send = 'ajax=1&liteload=1&sf_xw_user_id='+xw_user+'&sf_xw_sig='+local_xw_sig;
		var client = new XMLHttpRequest();
		client.open("POST", url, true);
		client.setRequestHeader("X-Requested-With","XMLHttpRequest");
		client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		client.send(send);
		client.onreadystatechange = function() {
			if(this.readyState == 4) {
				response=client.responseText;
				CurHealth = parseInt(document.getElementById("user_health").innerHTML);
				document.getElementById('user_health').innerHTML = CurHealth;    
			}
		}
	}

	function kill(){
	killertiming = parseInt(document.getElementById("killertimingi").value);
	try{
			var didilose = $('#attacker_fight_status').text();
			var Checking = /Lost/g;
			var winneris = Checking.test(didilose);
			if (winneris == true){
			return;
			}
			if (document.getElementById("fv2_defender_was_iced").style.display == "block"){
				return;
			}
			if (document.getElementById("fv2_defender_overlay_stolen").style.display == "block"){
				return;
			}
			if (document.getElementById("fv2_defender_overlay_iced").style.display == "block") {
				return;
			}
			if (document.getElementById("fv2_defender_overlay_killed").style.display == "block") {
				return;
			}
		}catch(err){}
		health = parseInt(document.getElementById("user_health").innerHTML);
		DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
		if (health < healat) {
			return;
		}
		if (DoesIHaveStamina < 25) {
			return;
		}
		$("#fightv2_poweratkbtn_boost_off").children("a").click();
		clearInterval(killerintervals);		
		killerintervals = setInterval(kill, killertiming);		
//		setTimeout(kill,killertiming);
		return;
	}
	
/*	$("body").ajaxComplete(function (e, xhr, settings){
		if(document.getElementById("fightV2PowerAtkBtn")) {
			if(startthekillmachine){
				kill();
			}else{}
		}
	})*/

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
            pageTracker._trackPageview("/fightxn")
        }
        catch(err)
            {
        }
    }
//end analytics
	
}())