// ==UserScript==
// @name       Forces of War utilities (lite)
// @namespace  http://asbra.net/forces-of-war-utilities-bot-script/
// @version    0.1
// @description  Useful utilities for the Facebook game Forces of War
// @match      https://fb-forces.uken.com/*
// @copyright  2013 Johan / Asbra.net
// ==/UserScript==

var version = 0.1;

var authenticity_token;

var battle_bot = 0;
var min_stamina = 0;
var heal_bot = 0;
var min_health = 0;
var collect_bot = 0;

function conlog(text) {
    if(console && console.log) {
        console.log(text);
    }
    
    var d = new Date();
    var newlog = '['+(d.getHours()<10?'0':'')+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes()+':'+(d.getSeconds()<10?'0':'')+d.getSeconds()+'] '+text;
    var el_conlog = $('#conlog');
    
    if(el_conlog.length == 1) {
        if(el_conlog.html() && el_conlog.html().length > 0) {
            var curlog = el_conlog.html().split('<br>');
            if(curlog.length > 0) {
                newlog = curlog[1] + '<br />' + newlog;
            } else {
                newlog = el_conlog.html() + '<br />' + newlog;
            }
        }
        
        $('#conlog').html(newlog);
    }
}

function condeb(text) {
    if(console && console.debug) {
        console.debug(text);
    }
    
    var d = new Date();
    var newlog = '['+(d.getHours()<10?'0':'')+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes()+':'+(d.getSeconds()<10?'0':'')+d.getSeconds()+'] '+text;
    var el_deblog = $('#deblog');
    
    if(el_deblog.length == 1) {
        if(el_deblog.html() && el_deblog.html().length > 0) {
            var curlog = el_deblog.html().split('<br>');
            if(curlog.length > 0) {
                newlog = curlog[1] + '<br />' + newlog;
            } else {
                newlog = el_deblog.html() + '<br />' + newlog;
            }
        }
        
        $('#deblog').html(newlog);
    }
}

function do_action(action) {
    $('<form action="'+action+'" method="post">'+
      '<input name="authenticity_token" value="'+authenticity_token+'">'+
      '</form>').submit();
}

function repeated_checks() {
    condeb('repeated_checks');
        
        if(collect_bot) {
            var money_bar = $('#money_bar > div > a.loader');
            if(money_bar.length == 1 && money_bar.attr('href') == '/empire') {
                // There is money to collect!
                conlog('There is money to collect!');
                window.location.href = money_bar.attr('href');
                return;
            }
        }
    
    if(heal_bot && U_HEALTH < min_health) {
        conlog('health '+U_HEALTH+' < '+min_health);
        do_action('/regeneration_chamber/regenerate?type=full');
        return;
    }
    
    if(battle_bot && U_STAMINA > min_stamina) {
        if($('div#battle_list_container table#battle_list').length == 0) {
            conlog('Time for PvP!');
            window.location.href = '/battles';
            return;
        } else if($('div#battle_list_container table#battle_list').length == 1) {
            conlog('Looking for an opponent..');
            var found = false;
            
            $.each($('#battle_list tr'),function(index,value){
                if(found == false) {
                    var player = $('.profile',value).html();
                    var level = $('p',value).html().split(' ')[1];
                    var winloss = $('b',value).html().split(' ');
                    var wins = winloss[0].substr(0,winloss[0].length-1);
                    var loss = winloss[2].substr(0,winloss[2].length-1);
                    
                    if(level <= (U_LEVEL+1)) {
                        if(loss < (wins-1)) {
                            // If opponent is lower level, has a smaller alliance, and has lost alot..
                            // Attack him!
                            conlog('Attacking '+player);
                            $('form',value).submit();
                            found = true;
                        }
                    }
                }
            });
        }
            }
    
    setTimeout(function(){repeated_checks();}, 1000);
}

$(document).ready( function() {
    conlog('-[ FOW Utils v'+version+' initializing ]-');
    
    // Hide the Facebook Like button (it's in the way of my menu)
    $('#body .fb-like').hide();
    
    // Load settings
    collect_bot = GM_getValue('fow_collect_bot',0);
    battle_bot = GM_getValue('fow_pvp_bot',0);
    min_stamina = GM_getValue('fow_min_stamina',0);
    heal_bot = GM_getValue('fow_heal_bot',0);
    min_health = GM_getValue('fow_min_health',0);
    
    conlog('collect_bot '+collect_bot);
    conlog('battle_bot '+battle_bot);
    conlog('min_stamina '+min_stamina);
    conlog('heal_bot '+heal_bot);
    conlog('min_health '+min_health);
    
    // Initialize data
    authenticity_token = $('meta[name=csrf-token]').attr('content');
    
    if(collect_bot && $('form[action=/empire/collect_income]').length > 0) {
        // There's money to collect!
        conlog('Collecting money..');
        do_action('/empire/collect_income');
        return;
    }
    
    // Run main loop
    repeated_checks();
    
    // Inject controls
    var el = document.createElement( 'div' );
    el.id = 'fow_bot_settings';
    el.style.zIndex = 99;
    el.style.position = 'fixed';
    el.style.top = 0;
    el.style.left = 0;
    el.style.padding = '5px';
    el.style.width = '100%';
    el.style.height = '110px';
    el.style.backgroundColor = 'rgba(0,0,0,0.75)';
    el.style.color = 'white';
    el.innerHTML = '';
    
    el_left = document.createElement( 'div' );
    el_left.id = 'fow_bot_settings_left';
    el_left.style.verticalAlign = 'top';
    el_left.style.display = 'inline-block';
    el_left.style.width = '49%';
    el_left.innerHTML = '';
    el_left.innerHTML += '<input id="collect_bot" type="checkbox"'+(collect_bot?' checked':'')+' /> Automatically collect income<br />';
    el_left.innerHTML += '<input id="battle_bot" type="checkbox"'+(battle_bot?' checked':'')+' /> PvP bot &nbsp; When above <input id="min_stamina" type="text" value="'+min_stamina+'" placeholder="" size="4" /> stamina<br />';
    el_left.innerHTML += '<input id="heal_bot" type="checkbox"'+(heal_bot?' checked':'')+' /> Heal me if below <input id="min_health" type="text" value="'+min_health+'" placeholder="0" size="6" /> health<br />';
    
    el_right = document.createElement( 'div' );
    el_right.id = 'fow_bot_settings_right';
    el_left.style.verticalAlign = 'top';
    el_right.style.display = 'inline-block';
    el_right.style.width = '49%';
    el_right.innerHTML = '';
    el_right.innerHTML += 'Status:<br /><span id="conlog"></span><br />';
    el_right.innerHTML += '<br />';
    el_right.innerHTML += 'Debug:<br /><span id="deblog"></span><br />';
    
    el.appendChild(el_left);
    el.appendChild(el_right);
    document.body.appendChild(el);
    
    $('#fow_bot_settings #collect_bot').bind('change',function(){collect_bot = !collect_bot;GM_setValue('fow_collect_bot',collect_bot);condeb('collect_bot '+collect_bot);});
    $('#fow_bot_settings #battle_bot').bind('change',function(){battle_bot = !battle_bot;GM_setValue('fow_pvp_bot',battle_bot);condeb('battle_bot '+battle_bot);});
    $('#fow_bot_settings #min_stamina').bind('change',function(){min_stamina = $('#fow_bot_settings #min_stamina').val();GM_setValue('fow_min_stamina',min_stamina);condeb('min_stamina '+min_stamina);});
    $('#fow_bot_settings #heal_bot').bind('change',function(){heal_bot = !heal_bot;GM_setValue('fow_heal_bot',heal_bot);condeb('heal_bot '+heal_bot);});
    $('#fow_bot_settings #min_health').bind('change',function(){min_health = $('#fow_bot_settings #min_health').val();GM_setValue('fow_min_health',min_health);condeb('min_health '+min_health);});
});