// ==UserScript==
// @name McF Babysitter
// @description Keeps them Happy
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @version 12.07.90
// ==/UserScript==

//javascript:(function(){
	var BabySitterRunning = false;
	var stamOn = false, fightx_text = 'Start';
//	var healOn = false, aheal_text = 'Off';
	var WhoToKill = '1286941108\n p|37226251';
	var user_list_selector = 0; 
	var	user_list = [];
	var user_names = [];
	var autohealmeat = 30;
	var xw_city = $('#mw_city_wrapper').attr('class').substr(7);
	var ajax_error  = 0;
	var fightin_city = 1, fightin_city_text = 'New York';

function fixModuleUIerror(){
/*Noticed ModuleUI object not loading small fix
 *but zynga why? wtf?? no seriously WTF get your act together... 
 *Missing code object patch to stop inner_page error when loading a fight
 */    

//Detect if we have the issue

//create & load new object
window.ModuleUI = new Object();
window.ModuleUI = {
	dimButton: function(btn) {
		if ($('.'+btn+":visible").prop('disabled') == 'disabled') {
			return false;
		}

		$('.'+btn).prop('disabled','disabled');
		$('.'+btn).css('opacity', 0.5);

		return true;
	},

	undimButton: function(btn) {
		$('.'+btn).removeAttr('disabled');
		$('.'+btn).css('opacity', 1.0);
	},

	reloadModule: function(module, extra_data) {
         //not needed but to satisfy request
	},

	nothing: function() {
         //not needed but to satisfy request
	},

	redirectToInventory: function() {
         //not needed but to satisfy request   
	}	
};
}

	var target = {
		name:0,
		link: 0
	};

	function MakeSitterDiv(){
		WhoToKill = unescape(WhoToKill).replace(/,/g, '\n');
		var sidey = '<style>'+
			'#wrapper{position:fixed;top:5px;right:325px;width:225px;padding-top:2px;border:white solid 2px;background:black;z-index:9999;border-radius:10px;}'+
			'#drag_one::-moz-selection{background-color:#eaeaea;color:#252525;}'+
			'#drag_one::selection{background-color:#eaeaea;color:#252525;}'+
			'</style>'+
			'<div id="wrapper"><span style="float: left; width: 1px; text-align: left;"></span><span style="float: center; width: 98px; text-align: midle;"><font id="drag_one" style="cursor:move;">McFBabySitter.&#12324;</font></span><span style="float: right; width: -0.5px; text-align: right;"><img id="sitXQuit" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/iced.png"></span>'+//</div>
			//'<div><br>'+ 
			'<br><a id="FHELP" href="#">' + fightx_text + '</a><BR>'+
			'Autoheal @: <input id="healati" type="text" value="500" maxlength="4" onChange="updateAH(this);" style="resize:none;width:35px;"/><br>'+
			'Target IDs<textarea id="SitterWTK" class="sexy_input" onChange="updateGroupIds(this);">' + WhoToKill + '</textarea><br>Fight in: <a id="city_change" href="#"><span id="fightin_city">' + fightin_city_text + '</span></a></div>';
			$('body').append(sidey);
			
		document.getElementById("FHELP").onclick = function () {
		if (stamOn) {
			stamOn = false;
			SitterRunning = false;
//			clearInterval(killerintervals);			
//			startthekillmachine = false;		
			fightx_text = document.getElementById("FHELP").innerHTML = "Start"
		} else {
			stamOn = true;
			SitterRunning = true;
//			startthekillmachine = true;
//			killertiming = parseInt(document.getElementById("killertimingi").value);
//			killerintervals = setInterval(kill, killertiming);
			i_fight.fighting = false;
			updateGroupIds();
			updateAH();
			fightx_text = document.getElementById("FHELP").innerHTML = "Running"
			traveltoprofile();
		}
		return false
		};
		
				// drag drop code, thanks selfhtml
		var dragobjekt = null;var dragx = 0;var dragy = 0;var posx = 0;var posy = 0;

		function dragmove(ereignis) {
			posx = document.all ? window.event.clientX : ereignis.pageX;
			posy = document.all ? window.event.clientY : ereignis.pageY;
			if(dragobjekt != null){
				dragobjekt.style.left = (posx - dragx) + "px";
				dragobjekt.style.top = (posy - dragy) + "px";
			}
		};
		document.onmousemove = dragmove;
	
		function dragstart(element){
			document.onmousemove = dragmove;
			dragobjekt = element;
			dragx = posx - dragobjekt.offsetLeft;
			dragy = posy - dragobjekt.offsetTop;
		}

		document.getElementById("drag_one").onmousedown = function(e){dragstart(document.getElementById("wrapper"));}
		document.onmouseup = function(e){dragobjekt=null;document.onmousemove=null;}
		
	document.getElementById("city_change").onclick = function () {
		fightin_city++;
		fightin_city = (fightin_city > 9) ? 1 : fightin_city;
        switch (fightin_city) {
        case 1:
            fightin_city_text = document.getElementById("fightin_city").innerHTML = "New York";
			fightin_city = 1;
            break;
        case 2:
            fightin_city_text = document.getElementById("fightin_city").innerHTML = "Las Vegas";
			fightin_city = 5;
            break;
        case 6:
            fightin_city_text = document.getElementById("fightin_city").innerHTML = "Brazil";
            fightin_city = 7;
			break;
        case 8:
            fightin_city_text = document.getElementById("fightin_city").innerHTML = "Chicago";
            fightin_city = 8;
			break;
        case 9:
            fightin_city_text = document.getElementById("fightin_city").innerHTML = "London";
            fightin_city = 9;
			break;
        }
//        writeCookieStuff();
        return false
    };
		document.getElementById('sitXQuit').addEventListener("click", function(){sitQuit()}, false);

	}
	
	if($('#sidey').length == 0){
		MakeSitterDiv();
	}
	
/*    $('#sitXQuit').click(function(){
		sitQuit()
	});   */
	
	function sitQuit() {
//	alert('aadsasd');
			stamOn = false;
		SitterRunning = false;
		$('#wrapper').remove();
		return;
	}
	
	function updateAH() {
		autohealmeat = parseInt(document.getElementById("healati").value);
		return;
	}
	
	function updateGroupIds(){
		if(document.getElementById('SitterWTK').value.length == 0) {
			alert('Please enter target IDs');
			return;
		}
		if(document.getElementById('SitterWTK').value.length > 0) {
            user_list = document.getElementById('SitterWTK').value.split('\n');
            user_names = document.getElementById('SitterWTK').value.split('\n');
		}
		user_list_selector = 0;
	}
	
	function traveltoprofile(){
		do_ajax("inner_page", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=9&destination="+fightin_city+"&from=stats&zone=1&user=" + user_list[user_list_selector], 1, 1, 0, 0);
		setTimeout(IceCheckEm,6000);
		return;
	}
	
	function IceCheckEm() {
		if (!SitterRunning) {
            return;
        }
		var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}
		if (document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) {
		    traveltoprofile();
		    return;
		}
		health = parseInt(document.getElementById("user_health").innerHTML);
		if (health < autohealmeat||i_heal.current_health() < 30) {
			i_heal.me(IceCheckEm);
			return;
		}
		var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
		var tabtest = document.evaluate('//div[contains(@id, "tab_container")]//a[contains(., "Profile")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
		if(tabtest > 0){
//			logmsg('Ice Checking them..', 'status');
			var hitlist_url;
			var ATag = document.getElementsByTagName('a');
			user_names[user_list_selector] = /levels">\((.*?)\)/.exec(document.body.innerHTML)[1];
            user_list[user_list_selector] = 'p|' + /user=p\|(\d+)'.+>Profile/.exec(document.body.innerHTML)[1];
			userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
			tmpkeya = /tryBuy.*?tmp=([a-f0-9]+)/.exec(document.body.innerHTML)[1];
			pidkeya = 'p%7C' + (/user=p\|(\d+)'.+>Profile/.exec(document.body.innerHTML)[1]);
			pidkeyb = /user=p\|(\d+)'.+>Profile/.exec(document.body.innerHTML)[1];
			cbkeyya = /&cb=(.+?)&/.exec(document.body.innerHTML)[1];
			target.name = user_list[user_list_selector];
			target.link = 'remote/html_server.php?xw_controller=fight&xw_action=attack_pop&xw_city=9&tmp=' + tmpkeya + '&cb=' + cbkeyya + '&xw_person=' + userid.substr(2, userid.length) + '&view_style=json&opponent_id=' + pidkeya + '&origin=profile_page&clkdiv=btn_attack_p'+pidkeyb+'';
			for(var i=0; i<ATag.length; i++){
				if (hit=/xw_controller=hitlist&xw_action=set&xw_city=(\d+).*?tmp=([a-z0-9]+).*?cb=([a-z0-9]+).*?target_pid=(\d+).*?mwzy_token=([a-f0-9]+)/.exec(ATag[i].href)){
			hitlist_url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hitlist&xw_action=set&xw_city='+hit[1]+'&tmp='+hit[2]+'&cb='+hit[3]+'&xw_person='+userid.substr(2, userid.length)+'&target_pid='+hit[4]+'&mwzy_token='+hit[5]+'&xw_client_id=8';
				}
			}
		    var params = {
		        ajax: 1,
		        liteload: 1,
		        sf_xw_user_id: User.id,
		        sf_xw_sig: local_xw_sig
		    };
		    $.ajax({
		        type: "POST",
		        url: hitlist_url,
		        timeout: 30000,
		        data: params,
		        success: function (msg) {
					if (/is already dead or too weak!/.test(msg)) {
//						clearInterval(DroneX.SpeedCFG.startkilling);
						next_user();
						return;
					} else {
						if (/The action was not able to be completed/.test(msg)) {
							traveltoprofile();
							return;
						} else {
							if (/Sucker Punch/.test(document.body.innerHTML)) {
								attack_person(target.link)
								return;
			//					logmsg('Keeeeling them..', 'true_log');
			//				kill();
							}
						}
					}
		        },
		        error: function (req, status, err) {
				return
		        }
		    })
		} else {
		    traveltoprofile();
		    return;
		}
	}
	
	
	var i_heal = {
    //i_auto_healer.js by luke  
    //call i_heal.me(callback)
    current_health: function () {
        /*
         * @returns current health
         */
        if (User) {
            return (parseInt(User.health));
        } else {
            return (parseInt($('#user_health').text()));
        }
    },
    max_health: function () {
        /*
         * @returns max health
         */
        return (parseInt($('#user_max_health').text()));

    },
    need_to_heal: function () {
        /*
         *@returns true false if need to heal
         */
        if (i_heal.current_health() < i_heal.max_health()) {
            return true;
        } else {
            return false;
        }
    },
    updateStats: function () {
    },
    running:false,
    me: function (callback) {
        //check if we can heal.
        
        if (i_heal.running == true)
            return false;
        


        function checkHealer(html) {

            //log(html);
            try {
                var heal_timer = parseInt(/waitHealTimer:\s*(-?\d+),/i.exec(html)[1]);
            } catch (e) {
                heal_timer = 1
            }
            
            
            
            if (heal_timer > 1) {
                 var time_to_wait = heal_timer + 1;
                pauseme(function(){i_heal.iHeal(callback)},time_to_wait)
            }else{
                //log('Can heal..')
                i_heal.iHeal(callback)
            }
            


        } 
              
        if (i_heal.current_health() < Math.ceil(i_heal.max_health() / 2 + 20)) {
            i_heal.running = true;
            i_heal.AjaxIt('xw_controller=hospital&xw_action=view', checkHealer);
        }else{
             i_heal.running = false;
             if (typeof (callback) == 'function') callback && callback()
        }
        
    },
    iHeal: function (callback) {
 //       log('healing...')
       
        i_heal.AjaxIt('xw_controller=hospital&xw_action=heal', function (htmlresponse) {
            try {
                i_heal.running = false;
                var response = iTrim(htmlresponse);
                var user_update = JSON.parse(response);
                var hospital_success = JSON.parse(response).hospital_success;
                var hospital_message = JSON.parse(response).hospital_message;
                var waitHealTimer = JSON.parse(response).waitHealTimer;
                var current_health = parseInt(JSON.parse(response).current_health);
                //parse the wait timer to healer & back to the handler


                user_fields_update(user_update.user_fields);
                user_info_update(user_update.user_fields, user_update.user_info);
            } catch (e) {}
            if (/The doctor healed/.test(hospital_message)) {
                //log(hospital_message)
                 //log_toolbar(hospital_message)
   //                 log(hospital_message)
            } else {
                //wait for heal timer to parse
                if (waitHealTimer > 1 && current_health > i_heal.max_health()){
     //               log('Heal timer is @ ' + waitHealTimer + ' seconds before heal (shouldnt have landed here)');
                    pauseme(function(){i_heal.iHeal(callback)},time_to_wait)
                    return false;
                } 

                //setTimeout(function(){process_request();},time_to_wait)
            }

            if (typeof (callback) == 'function') callback && callback()
        });


    },
    AjaxIt: function (url, callback) {
        /*
         *Deals with ajax calls & also forces a update if possible
         */
		if (!SitterRunning) {
            return;
        }
				var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}
        var ajax_error = 0;
        User.clicks++;
        var prams = {
            'ajax': 1,
            'sf_xw_user_id': User.id,
            'sf_xw_sig': local_xw_sig,
            'liteload': 1,
            'cb': User.id + parseInt(new Date().getTime().toString().substring(0, 10)),
            'xw_client_id': 8,
            'xw_city': 1,
            'xcity': 1,
            'xw_person': User.id.substr(2),
            'clicks': User.clicks
        };

        function process_ajax() {
        		if (!SitterRunning) {
            return;
        }
				var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}
            $.ajax({
                type: "POST",
                url: '//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?' + url,
                data: prams,
                success: function (htmlresponse) {
                    var response = iTrim(htmlresponse);
                    try { //update game
                        var user_update = JSON.parse(response);
                        user_fields_update(user_update.user_fields);
                        user_info_update(user_update.user_fields, user_update.user_info);
                    } catch (e) {}
                    callback(htmlresponse)
                },
                error: function (opponent) {
                    if (ajax_error > 3) {
                        //log('Failed');
                        if (typeof (callback) == 'function') callback && callback()
                        return false;
                    } else {
                        ajax_error++
                        setTimeout(function () {
                            process_ajax();
                        }, 333)
                    }
                }
            });
        }

        process_ajax()
    }
}


var i_fight = {
    errors: 0,
    fighting: false,
    pid: null,
	burst_attack: 4,
	attacks_needed_to_ice: false,
	defenders_first_percent: false,
	attacks_to_win: 0
}

//added functions by luke
    function iTrim(text) {
        //trim white space    
        if (typeof ($) !== 'undefined') {
            return $.trim(text);
        } else {
            return text.replace(/^\s*|\s*$/, '');
        }
    }
                
function pauseme(callback, secs) {
    /*
     * Pause in seconds & returns to callback
     */
    // log_toolbar('Waiting '+secs+' seconds to heal')
      
      var time_to_pause = parseInt(secs) * 1000;

        setTimeout(function () {
            //log('parsing back to healer');
            if (typeof (callback) == 'function') callback && callback();

        }, time_to_pause)
    }

function substr(string, SearchStart, SearchEnd) {
try{

        var nStartPos = 0
        var nEndPos = 0
        var nStartIndex = 0
        var bUseLastIndex =0;
        var bIndex, aIndex = string.indexOf(SearchStart, nStartIndex);
        if (aIndex === -1) {
            return false;
        }
        if (bUseLastIndex !== true) {
            bIndex = string.indexOf(SearchEnd, aIndex + Math.max(nStartPos,1));
        } else {
            bIndex = string.lastIndexOf(SearchEnd);
        }
        if (bIndex === -1) {
            return false;
        }
        aIndex += nStartPos;
        bIndex += nEndPos;
        return string.substr(aIndex, bIndex - aIndex);
 }catch(e){return false;}
    }   
	
	function request(url, handler, errorhandler) {
	if (!SitterRunning) {
            return;
        }    
		var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}		

            url = url.replace('remote/', '');

        User.clicks++;
        var params = {
            'ajax': 1,
            'xw_client_id': 8,
            'liteload': 1,
            'sf_xw_user_id': User.id,
            'sf_xw_sig': local_xw_sig,
            'xw_city': xw_city,
            'clicks': User.clicks,
            'update':false
        };
        var ajax_error = 0

            function process_ajax() {
                /*to allow for dead packets*/
                $.ajax({
                    type: "POST",
                    url: url,
                    data: params,
                    cache: false,
                    timeout: 20000,
                    success: function(e){
                        //update our userfrield details from packet response
                        if (/var user_fields/.test(e)) {
                             //log(substr(String(e),'var user_fields', 'user_fields_update'),true)
                                var user_fields = [];
                                var user_info = [];
                                eval(substr(String(e),'var user_fields', 'user_fields_update'));
                                window.user_fields_update(user_fields);
                                window.user_info_update(user_fields, user_info);
                        }
                       
                            
                            if (/ERROR 500/.test(e)) {
                                //dead packet do something here
                                //log('detected error 500 empty packet, resending request',true)
                                if (ajax_error < 5) {
                                 setTimeout(function () {
                                    process_ajax()
                                    }, 333)
                                    ajax_error++
                                  
                                }
                            }else{
                                 handler(e)
                            }
                      
                    },
                    error: function (e) {
                        if (ajax_error > 2) {
                            if (/OK/.test(e)) {
                                //dead packet do something here
                            }
                            errorhandler(e)
                        } else {
                            setTimeout(function () {
                                process_ajax()
                            }, 333)
                            ajax_error++
                        }
                    }
                });
            }


        process_ajax()

    }
	
	function repeat_attack() {
		if (!SitterRunning) {
            return;
        }
				var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}

var target_url = $('#fightV2PowerAtkBtn').attr('href');
var normal_attack = $('#fightv2_poweratkbtn_boost_off').find('a').attr('href');

//use boost & set burst    

target_url  = target_url.replace('use_boost=1', '')


function rapid_attack(){
//log('rapid_attack()',true);
//sends a burst attack at player
    //setTimeout(function(){request(target_url,doattack)},333)
        //set burst
        var attack_url = target_url;
        i_fight.burst_attack = 4;
        
        
//        if (i_fight.burst_attack > 0){
                attack_url   = target_url + '&click_amt='+i_fight.burst_attack
                attack_url   = target_url.replace(/click_amt=(\d+)/, 'click_amt='+i_fight.burst_attack)
 //               log('Using burst attack  (x'+i_fight.burst_attack+')')
   /*     }else{
                attack_url  = normal_attack;     //target_url.replace(/click_amt=(\d+)/, 'click_amt=0')
                log('Using normal attack...')
                //log(attack_url)
        } */
       
     setTimeout(function(){request(attack_url,doattack)},333)

}
function doattack(r){
//log('doattack()',true);    
//trigger auto heal if need to but we wont stop attacking.


    if (parse_attack(r) === true){
        
        if (health < autohealmeat||i_heal.current_health() < 30){
            i_heal.me(rapid_attack)
    //        log('need to heal -> rapid_attack()',true);  
     //       log('pausing attack cant attack need to heal...')
            return;
        }else{
            
            //setTimeout(rapid_attack, 333);
            rapid_attack();
            //window.FightV2.powerAttack(r);
        }
   } else{
      
   
    //   log('finished attacking -> fightlist()',true)
       
    //   log('parse_attack(r) ->',true)
     //  log('finished attacking target returning to fightlist');
       i_fight.fighting = false;
       IceCheckEm();
       return
   }
      
}

rapid_attack()



}


function parse_attack(htmlResponse) {
/*
 *Updates User fields & returns true to attack again if okay
 */  
		if (!SitterRunning) {
            return;
        }
				var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}
var response = htmlResponse;
var opponent = [];

//var response = iTrim(htmlResponse)

    try {
        //update response
        var fight_data = JSON.parse(response.replace(/^(\s\d\s+)/, ''));
        window.user_fields_update(fight_data.user_fields);
        window.user_info_update(fight_data.user_fields, fight_data.user_info);

    } catch (err) {
        //log('catch',true)
        //log('error -> '+err+' response -> '+htmlResponse),true;
        //error 500 fixed
    }
     
      opponent = fight_data.fight_result;
      window.FightV2.powerAttack(fight_data);  //<-- create our own FightV2 module this is slowing us down....
      
    if (fight_data.fight_result == false){
        //this can be a fudged json result sometimes so we will retry 2 x before throwing
        //a false return error
        
         if  (i_fight.errors > 3){
             //log('fight_data.fight_result == false-> response'+htmlResponse,true)
             i_fight.errors = 0;
             return false;
         }else{
             i_fight.errors++;
             return true
         }
        
        
    }
        
   
   /*
    if (i_fight.attacks_to_win < 0 || i_fight.defenders_first_percent == false){
        //first percent attack was not correct enough reset
        i_fight.defenders_first_percent = opponent.defender.current_health_pct;
    }
   */
    //Determine how many attacks needed to win fight
    if (i_fight.defenders_first_percent == false){
        //first attack hasn't been passed from first punch
        i_fight.defenders_first_percent = opponent.defender.current_health_pct;
    }else{
        //Check the diff between first health & 2nd health / devide by power attack math ceil results = how many attacks to win
        var pct_deal = i_fight.defenders_first_percent - opponent.defender.current_health_pct;
        i_fight.attacks_to_win = Math.abs(Math.ceil(opponent.defender.current_health_pct / (pct_deal / opponent.power_attack.won)));
        //log('attacks_to_win -> '+i_fight.attacks_to_win)
    }
    
    
     

    
     if (opponent.attacker.other_damage > 0) {
         //opponet is trying to heal
         //log('Your under attack maybe...')
     }
    
    //control the burst attacks on there health... if health lower than 60 or attacks to win greater than 60
    if (opponent.defender.current_health_pct > 70){
       i_fight.burst_attack = 0;
    }
    else if (opponent.defender.current_health_pct > 60){
       i_fight.burst_attack = 1;
    }
    else if(opponent.defender.current_health_pct > 50 ){
       i_fight.burst_attack = 2;
    }
    else if(opponent.defender.current_health_pct < 40){ 
        //&& opponent.defender.current_health_pct  < 40
       i_fight.burst_attack = 4;
    }else{
       i_fight.burst_attack = 3;
    }
      
     
     if (opponent.defender.other_damage > 0){
      //opponet is under attack
      //log('Opponet is under attack burst set x4')
      // lets double rapid see if we can steal the ice  
       i_fight.burst_attack = 4;
    }
//after setting our fight parse pack  

var parsefight_results = parseFightResults(opponent);

if (opponent.defender.current_health_pct > 0 && parsefight_results == false ){

    //log('failed : parseFightResults ->'+parsefight_results,true)
    return parseFightResults(opponent)
}else{
    
    //log('parseFightResults ->'+parsefight_results,true)
    
    if (parsefight_results == true && opponent.defender.current_health_pct > 0){
        //log('target alive returning true',true)
        return true
    }else{
        
         //log('opponent.defender.current_health_pct ->'+opponent.defender.current_health_pct,true)
         //log('parseFightResults(opponent) ->'+parsefight_results,true)
         //log('returning flase target dead or we lost',true)
        return false;
    }
    
}
    
     
}

function parseFightResults(results_check){
		if (!SitterRunning) {
            return;
        }
				var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}

/*
 *Parse a fight object
       
if (typeof(pfightresults === 'string')){
    log('parseFightResults -> string',true)
     return false;
}
 */     

     
/*     if (results_check.feed_js){
          var feed = substr(results_check.feed_js, 'var feed = {', 'MW.Feed');
          try {
                eval ( feed );
                var link = feed.link;
                var description = feed.description;
                var previous_log = $('#fighters_ice_log').val();
                
                 $('#fighters_ice_log').val(description+'\n\n'+previous_log);
                
                //$('#fighter_ice_log').prepend('<a href="'+link+'">'+description+'</a><p></p>');
            }
            catch(err) {
               log(err,true)
            }
          
         
     } */
    
    
    
    
    try{  
    if (results_check.power_attack.won < 1 ) {
          //opponet won we should stop attacking maybe add in a black list
          //log('fightresults -> is win -> return true',true)
          i_fight.black_list.add();
          return false;
      } 
    }catch(e)
    {
        //log('e'+e,true)
        //log(concat(results_check),true)
        //alert('ouch')
    }        
    
    
    if (results_check.you_just_iced) {
     
    //   log_toolbar('Iced '+fight_list.current_target.name)
    //   i_fight.updateStats('ices');
       return false;
    }
    else if (results_check.you_just_killed) {
    //    log('Killed '+fight_list.current_target.name)
    //    log_toolbar('Killed '+fight_list.current_target.name)
    //    i_fight.updateStats('kills');
        return false;
    }else if (results_check.ice_was_just_stolen){
    //    log(fight_list.current_target.name+' stolen.[revenge attack coming soon]')
    //    i_fight.updateStats('stolen');
        //maybe add in revenge attack killing
        return false;
    }
    else if (results_check.isWin) {
        //we won keep attacking 
        //log('fightresults -> is win ->return true',true)
        return true;
    }else{
    //    log('shouldnt land here',true);
       return false;
    }    
    
}

function attack_person(){
		if (!SitterRunning) {
            return;
        }
		var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}
		if(getCurrCity() != fightin_city){
			do_ajax('inner_page', 'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=' + fightin_city + '&from=index&nextParams=&menu=travel', 1, 1, 0, 0);
			setTimeout(attack_person, 6000);
			return;
		}
/*
 * Parses starts attacking
 */

//target = fight_list.getTarget();
//wipe our log before next attack
/*
if (i_fight.log.count > i_fight.log.maxcount){
  $('#fighter_log').html('');
  log('Reset Log @ '+i_fight.log.maxcount)
  i_fight.log.count = 0;
}

log('Retrieved '+target.name+' from targetlist')

*/

i_fight.fighting = true;
i_fight.burst_attack = 1;


//alert(target.link)
//return;
request(target.link,function(response){
		if (!SitterRunning) {
            return;
        }
				var stamina = parseInt(document.getElementById("user_stamina").innerHTML);
		if (stamina < 25) {
        setTimeout(function(){
             $('#FHELP').click();
             alert('Not enough stamina stopped..');
        },500)
        
        return;
		}



//log_toolbar('Checking '+target.name)

    if (/ERROR 500/.test(response)){
 
            //log('Ajax Error',true)
            //fightlist()
            if (ajax_error > 3){
                 i_fight.fighting = false;
                 //log('Getting new target target')
                 IceCheckEm();
            }else{
                //error retry
                //log('retrying a ajax fix ',true)
                setTimeout(function(){attack_person(target.link)},333)
                ajax_error++;
            }
            
    }else{
        

    //var fight_result = substr(response,'fight_result = ',';FightV2.attack');
var fight_result_log = substr(response,'fight_result = ',';FightV2.attack');

if (fight_result_log === false){
 //   log('bad fight results heading back to fightlist',true)
     i_fight.fighting = false;
   IceCheckEm();
  // log('pased to fightlist',true)
   return false;
}

//eval("result = " + c + ";") 
//log('extracted fight json',true)
//inser_our_fight_v2();
var fight_result = [];
//log('fight_result'+response,true)
//return;
eval("result = " + fight_result_log + ";")
//fight_result = JSON.parse(fight_result)
//log('eval fight json',true)

    i_fight.attacks_needed_to_ice = false;
   //i_fight.defenders_first_percent = fight_result.defender.current_health_pct; //Math.ceil(parseInt($('#defender_hp').css('width')) / 215 * 100); 
    //log('fight_result.current_health_pct ->'+fight_result.defender.current_health_pct,true);
    try{
        
    var health_pct = fight_result.defender.current_health_pct;
    
    
    //log('error health_pct ->'+fight_result_log,true)   
    //log('health_pct -> '+health_pct,true)
    //log('fight_result.isWin -> '+fight_result.isWin,true)
   
    i_fight.defenders_first_percent = health_pct;
    // log('error response ->'+response,true) 
    
    //return    
    }catch(e){
        //log('e ->'+e,true);
        //log(fight_result_log,true);
        //log('fucked out fight_result_log->'+fight_result_log,true);
        //alert('fucked out')
        return;
    }
    
   fixModuleUIerror();
   try{$('#inner_page').html('<div id="fight_module2" style="position:relative:top:1000px">'+response+'</div>')}catch(e){}
   $('#wrapper_items_won').remove();
   $(".fv2_widget_all_wrappers").hide();  

   
   
    //log('loaded fight target')
    if (health_pct != false && health_pct > 0 && parseFightResults(fight_result) == true){
           //reset our json errors.
           i_fight.errors = 0;
           //var fight_parse = parseFightResults(fight_result)
        
            //log('There health @ '+i_fight.defenders_first_percent+'%');
            //log(target.name+' is alive '+i_fight.defenders_first_percent+'% health left attacking.')
           // log_toolbar('Attacking '+target.name)
            //log(response)
            repeat_attack()
            return;
        }else{
            i_fight.fighting = false;
            //log('Getting new target target')
            //
            
         //   log('fight_result.isWin ->'+fight_result.isWin,true)
            
            //check health before getting target
if (health < autohealmeat||i_heal.current_health() < 30){
    i_heal.me(IceCheckEm);
    //log('need to heal then go back to fight list',true)
    return
}else{
            IceCheckEm()
}
            
        return;
    }
    }
})    
}

	function next_user() {
        user_list_selector++;
        if (user_list_selector >= user_list.length) {
  //          logmsg('Reached last member, reloading..', 'attack_log');
            user_list_selector = 0
        }
		traveltoprofile();
//		DroneX.SpeedCFG.startkilling = setInterval(IceCheckEm, 15000);
//        setTimeout(attack_user, random_delay * 1000)
		return;
	}

	function getCurrCity(){
		var city = $('#mw_city_wrapper').attr('class');
		switch(city){
			case 'mw_city1':
				return '1';
			case 'mw_city2':
				return '2';
			case 'mw_city3':
				return '3';
			case 'mw_city4':
				return '4';
			case 'mw_city5':
				return '5';
			case 'mw_city6':
				return '6';
			case 'mw_city7':
				return '7';
			case 'mw_city8':
				return '8';
			case 'mw_city9':
				return '9';
			default:
				return 'UnknowCity';
		}
	}
	
	

	
/*
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

	*/
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
            var pageTracker=_gat._getTracker("UA-35022618-1");
            pageTracker._trackPageview("/GroupSitterX")
        }
        catch(err)
            {
        }
    }
//end analytics
	
//}())