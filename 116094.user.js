// ==UserScript==
// @name           ST
// @author         gvozden
// @description    ST
// @version     ST
// ==/UserScript==

javascript:(function(){
	var targetid = "p|" + (/user=p\|(\d+)'.+>Profile/.exec(document.body.innerHTML)[1]);
	var xw_user = User.id;
	var xw_sig = local_xw_sig;
	
	function loadProfile(pid) {
		do_ajax("inner_page", "remote/html_server.php?xw_controller=stats&xw_action=view&user=" + pid, 1, 1, 0, 0)
	}
	
	function IceCheckEm() {
		if (isFightPopOpen()) {
		    return
		}
		if (document.getElementById("user_stamina").innerHTML <= 0) {
		    return
		}
		if (document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) {
		    setTimeout(IceCheckEm, 1500);
		    loadProfile(targetid);
		    return
		}
		health = parseInt(document.getElementById("user_health").innerHTML);
		if (health < 22) {
		    return
		}
		if (/Sucker Punch/.test(document.body.innerHTML)) {
		    var hitlist_url = /Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.exec(document.body.innerHTML)[1].replace(/&amp;/g, "&");
		    var params = {
		        ajax: 1,
		        liteload: 1,
		        sf_xw_user_id: xw_user,
		        sf_xw_sig: local_xw_sig
		    };
		    $.ajax({
		        type: "POST",
		        url: hitlist_url,
		        timeout: 30000,
		        data: params,
		        success: function (msg) {
					if (/is already dead or too weak!/.test(msg)) {
						return
					} else {
						if (/The action was not able to be completed/.test(msg)) {
							return
						} else {
							if (/Sucker Punch/.test(document.body.innerHTML)) {
								var elem = document.getElementById("btn_attack_" + targetid.replace("|", ""));
								var evt = document.createEvent("MouseEvents");
								evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
								elem.dispatchEvent(evt)
							kill();
							}
						}
					}
		        },
		        error: function (req, status, err) {
				return
		        }
		    })
		} else {
		    setTimeout(IceCheckEm, 1500);
		    loadProfile(targetid)
		}
	}
	
	function kill(){
		try{
			var didilose = $('#attacker_fight_status').text();
			var Checking = /Lost/g;
			var winneris = Checking.test(didilose);
			if (winneris == true){
			return;
			}
			if (document.getElementById("fv2_defender_was_iced").style.display == "block"){
				setTimeout(closeFightPop,500);
				return;
			}
			if (document.getElementById("fv2_defender_overlay_stolen").style.display == "block"){
				setTimeout(closeFightPop,500);
				return;
			}
			if (document.getElementById("fv2_defender_overlay_iced").style.display == "block") {
				setTimeout(closeFightPop,500);
				return;
			}
			if (document.getElementById("fv2_defender_overlay_killed").style.display == "block") {
				setTimeout(closeFightPop,500);
				return;
			}
		}catch(err){}
		health = parseInt(document.getElementById("user_health").innerHTML);
		DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
		if (health < 100) {
			return;
		}
		if (DoesIHaveStamina < 25) {
			return;
		}
		$("#fightv2_poweratkbtn_boost_off").children("a").click();
		setTimeout(kill,333);
		return;
	}

	function isFightPopOpen() {
            if (document.getElementById("fv2_widget_wrapper")) {
                if (document.getElementById("fv2_widget_wrapper").style.display != "none") {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
    }
	
	function closeFightPop() {
		CloseJS()
	}
		
	setInterval(IceCheckEm, 15000);
})()