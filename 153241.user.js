// ==UserScript==
// @author         morion, excieve
// @name           Merciless boot
// @namespace      merciless_boot
// @description    Improves the combat module of Erepublik
// @version        0.18b
// @include        http://*erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource chobit1 http://dl.dropbox.com/u/578932/chobot2.png
// @resource chobit2 http://dl.dropbox.com/u/578932/chobot1.png

// ==/UserScript==

// Change-log:
// v0.18b
// Fixed damage formula for opponent with bazooka (now treated as Q5)
// Formula for bazooka's damage was corrected
// Killbox was redesigned
// v0.17
// Fixed major bug, caused by admins changes
// Added Q6 weapons in profile calculator
// Added 150 health house in profile calculator
// Moved native button responsible for fight's pop-up windows
// Weapon stat's are now shown permanently (improved)
// Logic changed in order to distinguish bazooka's from tanks
// Fixed Town hall health limit
// Fire power generic value replaced with damage against opponent
// v0.16
//- Style compatibility with "pulse"
//- Added "pulse" advertisements in profile and in battle screen
//- From now on, Merciless boot fights up to 0 hp
//- Fight calculator fix
//- Some minor fixes in profile
// v0.15
// - Fixed error with not showing stats for * ranks
// - Added counter to the next rank in profile
// - Added selects for town hall and house in boot menu in profile
// - Number of fights is calculated based on selects in boot menu in profile
// v0.14
// - Fixed and redesigned Merciless boot button in  profile
// - Fixed and redesigned weapon bars
// - SS medal count back timer
// - Better design for heal button, shows when disabled
// - Fights counter for heal for gold button
// v0.13
// - Heal for gold button
// - added input box to control expenses
// v0.12
// - Minor design fixes
// - Changes in design and functions of damage calculator
// - domination bars control added
// v0.11
// - Fixed damage formula
// - Removed useless auto-eat buttons
// - Minor design fixes
// - Links to region info on the battlefield
// - Calculation of the remaining rank points, before promotion
// v0.10
// - Added food consumption button to every page
// - Implemented blocking of buttons when action is impossible to perform
// - Improved damage calculation, fixed a bug in it
// - Added info on health replenishment to damage info block
// - Damage/food replenishment info is now updated on every Ajax request
// v0.9
// - New buttons design
// - Fixed some regressions
// - Implemented a better method for pop-up hiding
// - Added action button blocking and hiding when in process
// - Removed alerts that indicated end of actions
// v0.8 
// - Added time-out between eat and fight calls
// - "Add influence" pop-up now doesn't shop up during ninja fight
// - Refactored all code
// - Sidebar now shows up only on the account page
// - Script is now initialised only where it's needed
// - Some minor fixes and improvements
// =============================================================================
// v0.7 - Ninja Damage & Influence core by AMitrev
// =============================================================================

// Global timeout between any actions
var actionTimeout = 600;

ninjaInfo = {
    ranks: [
        'Recruit', 'Private', 'Private *', 'Private **', 'Private ***', 'Corporal',
        'Corporal *', 'Corporal **', 'Corporal ***', 'Sergeant', 'Sergeant *', 'Sergeant **',
        'Sergeant ***', 'Lieutenant', 'Lieutenant *', 'Lieutenant **', 'Lieutenant ***',
        'Captain', 'Captain *', 'Captain **', 'Captain ***', 'Major', 'Major *', 'Major **',
        'Major ***', 'Commander', 'Commander *', 'Commander **', 'Commander ***',
        'Lt Colonel', 'Lt Colonel *', 'Lt Colonel **', 'Lt Colonel ***', 'Colonel',
        'Colonel *', 'Colonel **', 'Colonel ***', 'General', 'General *', 'General **',
        'General ***', 'Field Marshal', 'Field Marshal *', 'Field Marshal **',
        'Field Marshal ***', 'Supreme Marshal', 'Supreme Marshal *', 'Supreme Marshal **',
        'Supreme Marshal ***', 'National Force', 'National Force *', 'National Force **',
        'National Force ***', 'World Class Force', 'World Class Force *', 'World Class Force **',
        'World Class Force ***', 'Legendary Force', 'Legendary Force *', 'Legendary Force **',
        'Legendary Force ***', 'God of War'
    ],

    init: function() {
        var info = this.getOptions(),
            container = $('.citizen_content'),
            weaponHtml = '';
            townHtml = '';
        this.addStyles();

          for (var i = 1; i <= 6; i++) {
          weaponHtml += 'Q' + i + ' <input type="checkbox" style="width: 10px; height: 10px;" id="DI_weapon_Q' + i + '" value="1" ' + (info.weapon[i] ? 'checked="checked"' : '') + ' />';
                                     }
         for (var i = 1; i <= 5; i++) {
         townHtml+=' <option value="'+i*10+'" '+(info.DI_town == i*10 ? 'selected="selected"' : '')+'>Q'+i+'</option>';	
		                      }
		                            //for pulse
		 GM_setValue('pulsecheck', 0);
		var pulsecheck=setInterval(function() {
	   var change=parseInt(GM_getValue('pulsecheck')+1)
	   GM_setValue('pulsecheck', change);
        if ($("#pulse_section_body").length > 0) { clearInterval(pulsecheck); $('#pulseadvert').remove(); }
        else {
      if (GM_getValue('pulsecheck')==2) {$('.logout').after('<a id="pulseadvert" href="http://pulse.servebeer.com/Pulse" target="_blank"><img src="http://pulse.servebeer.com/Pulse/Content/img/layout/logo.png" style="padding: 2px; width: 149px;"><br><small>Install pulse!</small></a>');}
      if (GM_getValue('pulsecheck')>12) clearInterval(pulsecheck);
             } }, 2000); 
		
        $('.user_notify').after('<div><div style="vertical-align: top; text-align:center;"><a onclick="if (document.getElementById(\'chobit_menu\').style.display==\'\') document.getElementById(\'chobit_menu\').style.display=\'none\'; else document.getElementById(\'chobit_menu\').style.display=\'\';" onmouseover="document.getElementById(\'chobit_img\').src=\''+ GM_getResourceURL('chobit2')+'\'" onmouseout="document.getElementById(\'chobit_img\').src=\''+ GM_getResourceURL('chobit1')+'\'"><img id="chobit_img" src="'+ GM_getResourceURL('chobit1')+'" style="opacity: 0.65; width:30px; height:21px;"></a>' +
 '<div id="chobit_menu" style="display:none;"><div class="DI_option"><strong>Str per day:</strong> <input type="text" id="DI_str_per_day" value="' + info.str_delta + '" />' +
                '<br/><strong>Town center:</strong><select id="DI_town_Q">'+townHtml +'</select><br/><strong>House:</strong><select id="DI_house_Q"><option value="0" '+(info.DI_house == 0 ? 'selected="selected"' : '')+'>0</option><option value="5" '+(info.DI_house == 5 ? 'selected="selected"' : '')+'>50</option><option value="10" '+(info.DI_house == 10 ? 'selected="selected"' : '')+'>100</option><option value="15" '+(info.DI_house == 15 ? 'selected="selected"' : '')+'>150</option></select><br/><strong>Weapons:</strong><br/>' +
                weaponHtml +
                '<br/><strong>Merciless boot v0.18</strong></div>' +
                '</div></div>');

        $('#DI_str_per_day, #DI_mod_weapon').keyup(function() {
            GM_setValue(this.id, $(this).val());
        });
            
        var setBoolValue = function() {
            GM_setValue(this.id, $(this).attr('checked'));
        };

        for(var i = 1; i <= 6; i++) {
            $('#DI_weapon_Q' + i).change(setBoolValue);
        }
        $('#DI_influence_Q0, #DI_influence_Q5').change(setBoolValue);
		$('#DI_town_Q').change(function(){
			GM_setValue('DI_town_Q', $('#DI_town_Q :selected').val())});
		$('#DI_house_Q').change(function(){
			GM_setValue('DI_house_Q', $('#DI_house_Q :selected').val())
		});

        if (container.length)
            this.showAccountInfo(container, info);

        GM_log('Bushido initialized');
    },

    addStyles: function() {
        GM_addStyle(
          '#DI_options { float: left; margin-top: 10px; }' +
          '#DI_opt_content { float: left; background-color: #eee; padding: 10px; width: 73px; -moz-border-radius: 5px 5px 5px 5px }'+
          '#DI_opt_content h2 { font-size: 12px; margin-bottom: 4px; text-shadow: #fff 0.2em 0.2em; } '+
          '.DI_option { font-size: 9px; -moz-border-radius: 5px 5px 5px 5px; border-top: 1px solid #E5E5E5; background: none repeat scroll 0 0 #FFFFFF; border-bottom: 1px solid #F0F0F0; display: block; float: left; padding: 0 3px; width: 148px; text-align:center; }' +
          '.DI_option input { width: 40px; font-size: 10px; margin: 2px; } '+
		   '.DI_option select { width: 40px; font-size: 10px; margin: 2px; } '+
          '.DI_option input[type=checkbox] { margin: 0; width: 36px; }' +
          '.weaponimg { width: 35px; height: 35px; margin: 5px 0px 0px 8px; float: left; }' 
        );
    },

    getOptions: function() {
        var info = {
            str_delta: parseFloat(GM_getValue('DI_str_per_day')) || 0,
            mod_weapon: parseInt(GM_getValue('DI_mod_weapon')) || 0,
            influence: {
                'q0': GM_getValue('DI_influence_Q0') || false,
                'q5': GM_getValue('DI_influence_Q5') || false
            },
            weapon: []
        };

        for (var i = 1; i <= 6; i++) {
            info.weapon[i] = GM_getValue('DI_weapon_Q' + i) || false;
        }
     info.DI_town=GM_getValue('DI_town_Q')|| false;
	 info.DI_house=GM_getValue('DI_house_Q')|| false;
        return info;
    },

    calcInfluence: function(rank, str, firepower) {
        var rankKoef   = (rank - 1)/20 + 0.3,
            strKoef    = (str / 10) + 40,
            weaponKoef = 1 + firepower/100;

        return Math.floor(rankKoef * strKoef * weaponKoef);
    },

    showAccountInfo: function(box, info) {
        var strength = parseFloat($('.citizen_military:eq(0) h4').text().trim().replace(',', '')),
		    new_rank =  $('.stat:eq(1) strong').text().replace(/,/g,"").split(' / '),
			rankIndex = this.ranks.indexOf($('.citizen_military:eq(1) h4').text().trim()) + 1,
            tomorrowStrength = strength + info.str_delta,
			fights=parseFloat(info.DI_town)+parseFloat(info.DI_house),
            influence = {
                today: [],
                tomorrow: []
            };
       $('.citizen_military:eq(0) h4').html($('.citizen_military:eq(0) h4').text() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get medal <img src="/images/achievements/icon_achievement_supersoldier_on.gif" style="width:20px; heigth:20px;">in ' + Math.ceil((250-(strength%250))/info.str_delta) + ' days'); //strength medal days
       var show_new_rank= new_rank[1]-new_rank[0];
	   $('.citizen_military:eq(1) h4').html($('.citizen_military:eq(1) h4').html() + '&nbsp;&nbsp;&nbsp;' + show_new_rank + ' to next');
	    if (!rankIndex) {
            return;
        }
		for (var i = 0; i <= 6; i++) {
            var nextDay = '';
            influence.today.push(this.calcInfluence(rankIndex, strength, i * 20));
            influence.tomorrow.push(this.calcInfluence(rankIndex, tomorrowStrength, i * 20));
            if (i == 0) {
                box.append('<h3>Influence per fight</h3>');
            }
            if (info.weapon[i] || i == 0) {
                nextDay = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color: #666666">Tomorrow (+' + info.str_delta + 'str):</b> &nbsp;&nbsp;' + influence.tomorrow[i];
                fights30 = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color: #666666">x'+ fights+':</b> &nbsp;&nbsp;' + influence.today[i]*fights +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color: #666666">x'+(fights+8)+' (max):</b>&nbsp;&nbsp; ' + influence.today[i]*(fights+8) ;              
if (i==0) var imgweapon='<img style="opacity: 0.3;" src="http://www.erepublik.com/images/icons/industry/2/q1.png" class="weaponimg">';
              else var imgweapon='<img src="http://www.erepublik.com/images/icons/industry/2/q'+ i +'.png" class="weaponimg">';
 box.append('<div class="citizen_military" style="margin-bottom: 2px;">' + imgweapon + '<strong>Q' + i + ': </strong> <h4 style="font-size:90%">' + influence.today[i] + fights30 + nextDay + '</h4></div>');
            }
        }
     /*   if (info.mod_weapon > 0) {
            var todayMod = this.calcInfluence(rankIndex, strength, info.mod_weapon),
                tomorrowMod = this.calcInfluence(rankIndex, tomorrowStrength, info.mod_weapon),
                nextDay = '<div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>' + tomorrowMod + '</strong></small></div>';
            box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Mod. weapon</strong> <h4>' + todayMod + '</h4>' + nextDay + '</div>');
        } */

    /*   $.each([5, 0], function(k, i) {
            if (info.influence['q' + i]) {
                box.append('<br clear="all"/><h3 style="margin-top: 15px;">Influence - Q' + i + ' weapon</h3>');
                box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Influence 30 fights</strong> <h4>Q' + i + ': ' + (30 * influence.today[i]) + '</h4> <div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>300 health with Q' + i + ': ' + (30 * influence.tomorrow[i]) + '</strong></small></div></div>');
                box.append('<div class="clear"></div>');
                box.append('<div class="citizen_military"><strong>Max Influence</strong> <h4>Q' + i + ': ' + (38 * influence.today[i]) + '</h4> <div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>380 health with Q' + i + ': ' + (38 * influence.tomorrow[i]) + '</strong></small></div></div>');
            }
        } 
); */
    }
};

ninjaMilitary = {
    state: {
        player: {
            strength: 0,
            weaponAttribute: 0,
            health: 0
        },
        enemy: {
            strength: 0,
            weaponAttribute: 0,
            health: 0
        }
    },
    minFighterHealth: 10,
    healthLimit: 300,
    ninjaPunching: false,
    ninjaEating: false,
    originalBattlePopup: null,
    punchButton: null,
    eatButton: null,

    init: function() {
        var self = this;

        if (unsafeWindow.SERVER_DATA.onlySpectator != 0)
            return;

        this.originalBattlePopup = unsafeWindow.battleFX.pop;

        this.updateHealthState();
        this.state.player.strength = parseFloat($('#fighter_skill').html().replace(',', ''));
       
       // this.state.player.weaponAttribute = parseInt($('.weapon_attributes p strong').html());
       this.state.player.weaponAttribute = parseInt($(".fighter_weapon_image").attr("src").match(/[0-9]+/g))*20;
        this.state.enemy = {   
            strength: parseFloat($('#enemy_skill').html().replace(',', '')),
            weaponAttribute: parseInt($("#enemy_weapon").attr("src").match(/[0-9]+/g))*20,
            health: parseInt($('#enemy_life').attr('title').match(/\d+/g))
        };

        unsafeWindow.$j("body").ajaxSuccess(function(e, res, opt) { self.handleHooks(e, res, opt) });

        this.showUI();

        GM_log('Shuriken initialized');
    },

    showUI: function() {
        var self = this;

        this.addStyles();

        $('#player_rank').append('<div id="myKillBox" class="chobit_killinfo"></div>');

        if (this.canFight()) {
            this.showKillInfo();
        }

        //bonus Fight button :D
        $('.beta_notice').remove();
        this.punchButton = $('<a id="ninjaFight" href="javascript: void(0);" title="Attack"></a>')
            .appendTo('#pvp')
            .css({
                background: 'url('+ GM_getResourceURL('chobit1') +') no-repeat',
                display: 'block',
                width: '51px',
                height: '35px',
                position: 'absolute',
                bottom: '13px',
                right: '118px'
            }
)
.hover(
  function () {
    $(this).css({background: 'url('+ GM_getResourceURL('chobit2') +') no-repeat'})
  }, 
  function () {
   $(this).css({background: 'url('+ GM_getResourceURL('chobit1') +') no-repeat'})
  }
)

            .bind('click', function() {
                if (!self.ninjaPunching && self.canFight()) {
                    self.ninjaPunching = true;
                    self.fight();
                    $(this).hide();
                } else {
                    alert('Cant\'t fight.');
                }
                return false;
            });

        $('.help_button').remove();
        $('.go_enemy_defeated').css({right: '7px', top: '470px'}); 
        GM_addStyle('.weapon_attributes { display:block !important; position:absolute; top:507px; left: 580px; opacity:1;}');
        GM_addStyle('.chobit_killinfo { position: absolute; top: -225px; left: 240px; background-color: #333333; border-bottom-left-radius: 7px; border-bottom-right-radius: 0;border-top-left-radius: 7px;border-top-right-radius: 0;margin-left: -105px; margin-top: 12px; padding-bottom: 5px;padding-left: 5px; padding-right: 0; padding-top: 5px;position: absolute;text-align: center; width: 102px; color: #FFFFFF;}');
        GM_addStyle('.chobit_hit { background-color: #83B70B; border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;border-top-left-radius: 3px; border-top-right-radius: 3px; color: #FFFFFF;display: inline;font-size: 10px; height: 16px;line-height: 13px;padding-bottom: 0;padding-left: 4px; padding-right: 4px;padding-top: 0;text-align: center;text-shadow: 0 -1px 0 #6E9C08;}');
        
        //for pulse battle screen;
  GM_setValue('pulsecheck', 0);
 var pulsecss=setInterval(function() {
 var change=parseInt(GM_getValue('pulsecheck')+1)
	   GM_setValue('pulsecheck', change);
 $('.pulse_button.help_button').css({right: '7px'}); 
 if ($(".pulse_button.help_button").length > 0) { clearInterval(pulsecss); $('#pulseadvert').remove(); }
 else {
        if (GM_getValue('pulsecheck')==2) {
        $('<a id="pulseadvert" target="_blank" original-title="Install Pulse!" href="http://pulse.servebeer.com/Pulse" class="help_button" style="background-image: url(&quot;http://img231.imageshack.us/img231/7091/pulsebutton80white65.png&quot;); background-position: 0pt 0pt; background-repeat: no-repeat; bottom: 7px; display: block; height: 46px; position: absolute; right: 7px; text-indent: -9999px; width: 45px;">Pulse</a>').appendTo('#pvp');
         }
        if (GM_getValue('pulsecheck')>12) clearInterval(pulsecss); 
      }
 }, 2000); 

//Make link to region
var LANG = document.location.href.split('/')[3];   
var region = jQuery('#pvp_header h2').html();
jQuery('#pvp_header h2').html('<a href="http://www.erepublik.com/' + LANG + '/region/' + region.split(' ').join('-') + '">' + region + '</a>');
//Adding rank points to next rank
var rankmin = jQuery('#rank_min').html();
jQuery('#rank_min').html(rankmin + ', ' +(parseInt(jQuery('#rank_max').attr('title').split(':')[1]) - rankmin.split(' ')[0]) + ' left');

      
        this.eatButton = $('<a id="ninjaEat" href="javascript: void(0);" title="Eat Salo"></a>')
            .appendTo('#pvp')
            .css({
                background: 'url("http://dl.dropbox.com/u/578932/health_disabled.png") no-repeat',
                display: 'block',
                width: '36px',
                height: '36px',
                position: 'absolute',
                right: '170px',
                bottom: '12px'
            })
            .bind('click', function() {
                if (!self.ninjaEating && self.canEat()) {
                    self.ninjaEating = true;
                    self.eat();
                    $(this).hide();
                } else {
                    alert('Can\'t heal!');
                }
                return false;
            });  
            
             this.goldcontroll = $('<input type="text" width="3" id="goldspendcontroll" value="'+parseInt($('#side_bar_gold_account_value').html())+'">')
              .appendTo('#pvp')
            .css({ display: 'block',
                width: '25px',
                height: '20px',
                position: 'absolute',
                right: '210px',
                bottom: '21px',
                border: '1px solid black',
                background: 'gray',
                opacity: '0.6'
            })
             .bind('change mouseleave focus', function() {
                if (jQuery('#goldspendcontroll').attr('value')<parseInt($('#side_bar_gold_account_value').html()))  { jQuery('#ninjaEat').css({background: 'url("http://dl.dropbox.com/u/578932/health.png") no-repeat'}); jQuery('#fightcontroll').html(Math.floor(((parseInt($('#side_bar_gold_account_value').html())-jQuery('#goldspendcontroll').attr('value'))/0.5))+ ' fights'); }
                else {jQuery('#ninjaEat').css({background: 'url("http://dl.dropbox.com/u/578932/health_disabled.png") no-repeat'});  jQuery('#fightcontroll').html("0 fights");}
            });  
            
             this.fightcontroll = $('<span id="fightcontroll">0 fights</span>')
              .appendTo('#pvp')
            .css({ display: 'block',
                 position: 'absolute',
                right: '170px',
                bottom: '1px',
				'font-weight': 'bold',
                'font-size': '10px'
            })
    },

    updateHealthState: function() {
            this.state.player.health = unsafeWindow.SERVER_DATA.health;
            this.healthLimit = unsafeWindow.food_remaining;
    },

    showKillInfo: function() {
     //   alert(this.toSource());
          var koefStr = 60 + (this.state.player.strength - this.state.enemy.strength) / 10;
            if (this.state.enemy.weaponAttribute==200) this.state.enemy.weaponAttribute=100; //bazook enemy experiment value as Q5
        var koefWeapon = 1 + (this.state.player.weaponAttribute - this.state.enemy.weaponAttribute) / 400,
            koefDamage =((koefStr * koefWeapon)/2),
            hit = Math.ceil(this.state.enemy.health /koefDamage);
            if (this.state.player.weaponAttribute==200) {hit =1; koefDamage=100;}
             healthLeft = this.state.player.health - (hit * 10),
            killInfo = '';
            $('div.wdamage').find('strong').html(koefDamage.toFixed(2));
            $('div.wdamage div.bar_progress div.progress').css({width:''+koefDamage+'%'});
          
          function pluralize(text, count) {
            return count == 1 ? text : text + 's';
        }

        // Show how much health needs to be restored to kill opponent
        // if there's not enough to perform a full attack.
        if (healthLeft < 0) {
            killInfo = 'Restore<br>' + '<div class="chobit_hit">' +(0 - healthLeft) + '</div>  health!';
        } else {
            killInfo ='Kill  opponent in<br><div class="chobit_hit">'+ hit +'</div>'+ pluralize('  fight', hit) +'!';
        }
        

        $('#myKillBox').html('<h4>' + killInfo + '</h4>');


    },

    handleHooks: function(e, res, opt) {
        var response = null,
            self = this;

//alert(response);
        if (opt.url.indexOf('change-weapon') != -1) {
            response = JSON.parse(res.responseText);
//  this.state.player.weaponAttribute = response.weaponDamage; 
          this.state.player.weaponAttribute=response.weaponId*20;
         } else if (opt.url.indexOf('/military/fight-shooot') != -1) {
            response = JSON.parse(res.responseText);

            // Block of handlers that only work if ninja fighting is enabled
            if (this.ninjaPunching) {
                // Simulate "add influence" pop-up closing if enemy was killed
                if (response.message == "ENEMY_KILLED") {
                        unsafeWindow.battleFX.pop = function(target, width) {
                        GM_log('killed an enemy');
                        unsafeWindow.closeAddDamagePopup();
                        // Restore original function. Hope this won't produce too big memory leaks.
                        unsafeWindow.battleFX.pop = self.originalBattlePopup;
                        return false;
                    };
                 }

                if (response.error && response.message == "SHOOT_LOCKOUT") {
                    setTimeout(this.fight, actionTimeout);
                }

                if (this.canFight(response)) {
                    setTimeout(this.fight, actionTimeout);
                }
                else {
                    this.ninjaPunching = false;
                    this.punchButton.show();
                }
            }

            //after fight :D
            this.state.enemy = {
                strength: parseFloat(response.enemy.skill.replace(',', '')),
                weaponAttribute: parseInt(response.enemy.damage),
                health: response.enemy.health
            };
            this.state.player.weaponAttribute = response.user.weaponDamage;
        } else if (opt.url.indexOf('/buy-health?') != -1 && this.ninjaEating) {
           
            response = res.responseText;
            //alert(response);
            //response = JSON.parse(response.slice(response.indexOf('(') + 1, -1));
           
            if (this.canEat(response)) {
               setTimeout(this.eat, actionTimeout);
            }
            else {
                this.ninjaEating = false;
                this.eatButton.show();
            }
           
        }  
        // Update damage and health replenishment info
        this.updateHealthState();
        this.showKillInfo();
    },

    fight: function() {
        unsafeWindow.$j('#fight_btn').click();
        GM_log('enemy punched: ' + new Date().getTime());
    },

    eat: function() {
        //unsafeWindow.$j('#DailyConsumtionTrigger').click();
        unsafeWindow.$j('#health_kit_btn').click();
       // alert('eaten');
        GM_log('food consumed: ' + new Date().getTime());
    },

   addStyles: function() {
      //  GM_addStyle('.battle_stats_button { bottom: 195px; right: 380px; }');
    },
//Gold
    canEat: function(response) {
        var hasFood = response ? response.has_food_in_inventory : !$('#DailyConsumtionTrigger').hasClass('buy');
        var goldLim = parseInt($('#side_bar_gold_account_value').html());
     //   alert(goldLim);
     //   alert($('#goldspendcontroll').val());
           GM_log("hasFood: " + hasFood + ' health: ' + this.state.player.health + ' limit: ' + this.food_remaining); 
       return unsafeWindow.SERVER_DATA.health <= 90 && goldLim>$('#goldspendcontroll').val();
    },

    canFight: function(response) {
        var playerHealth = response ? response.user.health : unsafeWindow.SERVER_DATA.health;
        return playerHealth >= this.minFighterHealth;
    }
};

ninjaDailyConsumption = {
    eatButton: null,
    eating: false,

    init: function() {
        var self = this;

        unsafeWindow.$j("body").ajaxSuccess(function(e, res, opt) { self.handleHooks(e, res, opt) });
        this.addStyles();
        this.showUI();

        GM_log('Daily consumption initialized.');
    },


    showUI: function() {
        var self = this;

        /*
        this.eatButton = $('<a href="#" class="eat_food" id="merciless-auto-eat"><strong>Auto</strong></a>')
            .insertAfter('#DailyConsumtion')
            .click(function() {
                if (!self.eating && self.canEat()) {
                    self.eating = true;
                    self.eat();
                    $(this).hide();
                } else {
                    alert('Can\'t eat.');
                }
                return false;
            });
            */
    },


    handleHooks: function(e, res, opt) {
        var response = null;

        GM_log('In handle hooks, url: ' + opt.url);
        if (this.eating && opt.url.indexOf('/eat') != -1) {
            response = res.responseText;
            response = JSON.parse(response.slice(response.indexOf('(') + 1, -1));
            if (this.canEat(response)) {
                setTimeout(this.eat, actionTimeout);
            } else {
                this.eating = false;
                this.eatButton.show();
            }
        }
    },

    eat: function() {
        //unsafeWindow.$j('#health_kit_btn').click();
        alert('eat');
        GM_log("Food consumed");
    },

    canEat: function(response) {
        var health = 0,
            foodRemaining = 0,
            hasFood = 0;

        if (response) {
            health = parseFloat(response.health);
            foodRemaining = response.food_remaining;
            hasFood = response.has_food_in_inventory;
        } else {  
            health = parseFloat($('#wellnessBar span').html());
            foodRemaining = unsafeWindow.food_remaining;
            hasFood = parseFloat($('#side_bar_gold_account_value').html());
        }
       
        return health <= 90 ;
    },

    addStyles: function() {
     //   GM_addStyle('#merciless-auto-eat { height: 24px; margin-top: 10px; padding-top: 5px; }');
    }
};

$(function() {
    var isPvp = false;

    if (typeof unsafeWindow.$j == 'undefined') {
        return;
    }

    GM_log('Initializing ninja');

    isPvp = $('div#pvp').length;

    if (!isPvp && $('#DailyConsumtion').length) {
        ninjaDailyConsumption.init();
    }

    if ($('body').attr('id') == 'citizenprofile') {
        ninjaInfo.init();
    } else if (isPvp) {
        ninjaMilitary.init();
//Domination bars show
var blue_domination=document.getElementById('blue_domination');
blue_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');
var  red_domination=document.getElementById('red_domination');
red_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');


function roundNumber(num,dec) {
		var snum=num.toString()+"000000000000000001";
		var sep=snum.indexOf(".");
		var beg=snum.substring(0,snum.indexOf("."));
		snum=snum.substring(eval(snum.indexOf(".")+1),snum.length);
		var dig=snum.substring(0,eval(dec-1));
		snum=snum.substring(eval(dec-1),dec);
		snum=parseInt(snum);
		gohigher=false;
		if (snum>4) {gohigher=true;}
		if (gohigher) {snum=parseInt(snum);snum++;}
		snum=snum.toString();
		num=beg+"."+dig+""+snum;
		return num;
	}
	
function fixwidth() {
getred=document.getElementsByClassName('domibar')[0].style.backgroundPosition.match(/(.*?)%/)[0]; 
red_domination.innerHTML = getred;
blue_domination.innerHTML = roundNumber((100-getred.replace('%','')),4)+'%';
	                }
setInterval(fixwidth, 3000);
}
});