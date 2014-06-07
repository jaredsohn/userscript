// ==UserScript==
// @name family-boss-fighter
// @namespace http://userscripts.org/scripts/show/113315
// @version v 1.39
// @description  http://spocklet.com/bookmarklet/family-boss-fighter.js
// @copyright  - spockholm
// ==/UserScript==

/*
        $Id: family-boss-fighter.js,v 1.39 2011-11-05 12:16:20 martin Exp $
        Copyright Spockholm Mafia Tools
*/

javascript:(function (){
        var spocklet = 'bofi',
        rev=/,v (\d+\.\d+)\s201/.exec("$Id: family-boss-fighter.js,v 1.39 2011-11-05 12:16:20 martin Exp $")[1],
        version = 'Family Boss Fighter v'+rev,
        run = false,
//      attacks = 0,
//      stamina_used = 0,
        max_stamina = 5,
        max_rage = 250,
//      xp_gained = 0,
//      damage_dealed = 0,
        stamina_required = 0,
        restart_in,
        heal_time = timestamp(),
        debug = false,
        statuslog = [],
        timer_fighting,
        button,
        paused = false,
        startScore=parseInt($('#userScoreValue').text()),
        dur_stats={ xp_gained:0, attacks:0, damage_dealed:0, stamina_used:0, asked:0, sent:0 },stats={ xp_gained:0, attacks:0, damage_dealed:0, stamina_used:0, asked:0, sent:0 },
        rage_meter=['super (rage<250)','high (rage<500)','middle (rage<750)','low (attack always)'],
        rage_values=[250,500,750,1001];


        window.resizeIframe=function(){}
        $('body').ajaxComplete(function(e,xhr,settings){
                var text = xhr.responseText;
                // if (User.page == 'Epicclanboss' && User.stamina > 5) {
                        // if (jQuery.parseJSON($(button).attr('requirements')).stamina == 5) {
                                // setTimeout(click_attack_button, 4000);
                        // }
                // }
                if (!paused) {
                        parseBoss(text);
                        clearTimeout(timer_fighting);
                        timer_fighting = setTimeout(function() { read_state(); }, parseInt(Math.random()*1000)+500 );
                }
        });

        function loadStats(){
                try {
                        var str=window.localStorage.getItem(spocklet+'_stats_'+User.trackId);
                        dur_stats=JSON.parse(str);
                        if (!dur_stats.xp_gained) { throw "error"; }
                } catch(error) { dur_stats={ xp_gained:0, attacks:0, damage_dealed:0, stamina_used:0, asked:0, sent:0 };}
        }
        loadStats();

        function saveStats(){
                tmp_stats={ xp_gained:stats.xp_gained+dur_stats.xp_gained, attacks: stats.attacks+dur_stats.attacks, damage_dealed: stats.damage_dealed+dur_stats.damage_dealed, stamina_used: stats.stamina_used+dur_stats.stamina_used, asked:stats.asked+dur_stats.asked, sent: stats.sent+dur_stats.sent }
                window.localStorage.setItem(spocklet+'_stats_'+User.trackId,JSON.stringify(tmp_stats));
        }

        function parseBoss(text){
                try {
                        var json = JSON.parse(text);
                        var data = JSON.parse(json.data);
                        stats.damage_dealed += data.damage.toBoss;
                        saveStats();
                }
                catch (notmypage) {}
        }

        function update_stats(){
                html='';
                html+='<p>Attacks: '+stats.attacks+'.<br>';
                html+='Stamina: '+stats.stamina_used+'. XP: '+stats.xp_gained+'. Ratio: '+(stats.xp_gained/stats.stamina_used).toFixed(2)+'.<br>';
                html+='Score:'+(parseInt($('#userScoreValue').text())-startScore)+'. Dmg: '+stats.damage_dealed+'. Dmg/Att: '+parseInt(stats.damage_dealed/stats.attacks)+'.</p>';
                html+='Total Damage: '+(stats.damage_dealed+dur_stats.damage_dealed)+'<br>';
                html+='Total Stamina:'+(stats.stamina_used+dur_stats.stamina_used)+'<br>';
                html+='Boosts sent:'+(stats.sent+dur_stats.sent)+'<br>';
                html+='Boosts asked:'+(stats.asked+dur_stats.asked)+'<br>';

                html+='<a href="#" style="font-size:small;" id="'+spocklet+'_reset">(clear)</a>';

                $('#'+spocklet+'_status').html(html);
                $('#'+spocklet+'_reset').click(function(){
                        // whatever
                        dur_stats={ xp_gained:0, attacks:0, damage_dealed:0, stamina_used:0, asked:0, sent:0 }
                        update_stats();
                });
        }

        function read_state() {
                update_stats();
                stamina_required = jQuery.parseJSON($('#attackBtn a:first').attr('requirements')).stamina;
                button = false;

                // if ($('#role_select_bg').length > 0 && $('#role_select_bg').parent().parent().css('display') != 'none') {
                        // $('#role_select_bg #racketeer').trigger('click');
                        // $('#role_select_bg a.rightArrow:first').trigger('click');
                // }
                if ($('#'+spocklet+'_ask:checked').length>0) {
                        if ($('#needBoost_1').css('display') == 'block' && $('#boostAskHelp_1').css('display') == 'block') {
                                button = $('#boostAskHelp_1 a:first');
                                if (debug) console.log('Clicked boost 1');
                                stats.asked++;
                                saveStats();
                        }
                        else if ($('#needBoost_2').css('display') == 'block' && $('#boostAskHelp_2').css('display') == 'block') {
                                button = $('#boostAskHelp_2 a:first');
                                if (debug) console.log('Clicked boost 2');
                                stats.asked++;
                                saveStats();
                        }
                        else if ($('#needBoost_3').css('display') == 'block' && $('#boostAskHelp_3').css('display') == 'block') {
                                button = $('#boostAskHelp_3 a:first');
                                if (debug) console.log('Clicked boost 3');
                                stats.asked++;
                                saveStats();
                        }
                }
                if ($('#'+spocklet+'_send:checked').length>0 && !button) {
                        var buttons=[];
                        $('[id^="player_"]').each(function() {
                                if ($(this).find('.helpButton:first').css('display') == 'block') {
                                        if (parseInt($('#chargeCounter').text()) > 0) {
                                                buttons.push($(this).find('.helpButton a:first'));
                                        }
                                }
                        });
                        if (buttons.length>0) {
                                if ($('input.'+spocklet+'_boosts[@name="'+spocklet+'_boosts"]:checked').val()=="random") {
                                        button = buttons[parseInt(Math.random()*(buttons.length+1))];
                                        if (debug) console.log('Send random');
                                }
                                else if ($('input.'+spocklet+'_boosts[@name="'+spocklet+'_boosts"]:checked').val()=="top") {
                                        button = buttons[0];
                                        if (debug) console.log('Send top');
                                }
                                else  {
                                        button = buttons[buttons.length-1];
                                        if (debug) console.log('Send bottom');
                                }
                        stats.sent++;
                        }
                }
                if (button) {
                        saveStats();
                        click_button(button);
                        return;
                }
                else if (mayAttack()) {
                        click_attack_button();
                        return;
                }
                else {
                        log('No valid action found...');
                        if ($('#'+spocklet+'_restart:checked').length>0) {
                                if (parseInt($('.bossInfo .health:first').text())==0) {
                                        log('Boss is done.');
                                        $('#'+spocklet+'_switch').trigger('click');
                                } else {
                                        if (parseInt($('#'+spocklet+'_restarttimer').val())<10) { $('#'+spocklet+'_restarttimer').val("10") }
                                        restart_in=timestamp()+parseInt($('#'+spocklet+'_restarttimer').val());
                                        wait_for_reload();
                                }
                        }
                }
                // try again after
                // reload_boss()
        }


        function wait_for_reload(){
                if (!paused) {
                        if (timestamp()>restart_in) {
                                if ($('#'+spocklet+'_switchrestart:checked').length>0) {
                                                $('#'+spocklet+'_switch').trigger('click'); // switch
                                        } else {
                                                reload_boss();
                                        }
                        } else {
                                log('Retry in '+(restart_in-timestamp())+'s');
                                clearTimeout(timer_fighting);
                                timer_fighting = setTimeout(wait_for_reload,1000);
                        }
                }
        }

        function mayAttack(){
                stamina_required = jQuery.parseJSON($('#attackBtn a:first').attr('requirements')).stamina;
                var bosshealth = parseInt($('.bossInfo .health:first').text());
                var is_rage_ok=getRage()<max_rage,
                        is_fatique_ok=stamina_required <= max_stamina,
                        is_rage_boost=($('#boostIndCount_2').css('display')=="block"),
                        is_fatique_boost=($('#boostIndCount_3').css('display')=="block"),
                        is_stamina_ok = (stamina_required < User.stamina);
                //if (debug) console.log(getRage() + ' ' + max_rage);
                //if (debug) console.log((is_rage_ok +' '+ is_rage_boost +' '+ is_fatique_ok +' '+ is_fatique_boost+' -> '+((is_rage_ok || is_rage_boost) && (is_fatique_ok || is_fatique_boost))));
                return ((is_rage_ok || is_rage_boost) && (is_fatique_ok || is_fatique_boost) && (bosshealth>0) && is_stamina_ok);
        }

        function reload_boss() {
                log('Reloading boss page...');
                var bossid=0;
                        try {
                                bossid=parseInt(/boss_id\=(\d+)/.exec($('#attackBtn > a').attr('href'))[1]);
                        } catch(e) { }
                        if (!isNaN(bossid) ){
                                BossOperationController.goToFight(bossid);
                        }

        }

        function stats_good() {
                return ($('.impulse_buy_prompt:first').css('display') != 'block');
        }

        function output_status() {
                var output = '';
                for (var x=0;x<statuslog.length;x++) {
                        output += x+': '+statuslog[x]+' <br />';
                }
                return output;
        }

        function getRage(){
                try {
                        return parseInt(/RAGE: (\d+)\/1000/.exec($('#bossRage span:first').text())[1]);
                } catch(error) {
                        return 0;
                }
        }

        function click_button(button) {
                //log('Clicking button: '+button.text())
                if (debug) console.log($(button).attr('href'));
                $(button).trigger('click');
        }

        function click_attack_button() {
                stamina_required = jQuery.parseJSON($('#attackBtn a:first').attr('requirements')).stamina;

                if ((parseInt($('#'+spocklet+'_stopat').val())>0) && (parseInt($('#'+spocklet+'_stopat').val())<parseInt($('#userScoreValue').text()))) {
                        log('Stopping because points limit reached');
                        paused=true;
                        clearTimeout(timer_fighting);
                        $('#'+spocklet+'_pause').removeClass('green').addClass('orange').find('span > span').html('Paused');
                        return;
                }

                //if (debug) console.log(getRage() + ', '+max_rage);
                if (mayAttack()) {
                        var button = $('#attackBtn a:first');
                        stats.attacks++;
                        stats.stamina_used += jQuery.parseJSON($(button).attr('requirements')).stamina;
                        stats.xp_gained += 15;
                        saveStats();
                        $(button).trigger('click');
                }
                else {
                        log('Fatigue! Stamina required was '+stamina_required);
                        reload_boss();
                }
        }
        function timestamp() {
                return parseInt(new Date().getTime().toString().substring(0, 10));
        }

        function create_control_box() {
                var box_html = 
                '<div id="'+spocklet+'_main" style="text-align:center;">'+
                        '<span id="'+spocklet+'_header">'+version+'</span><br />'+
                        //'<a href="http://www.spockholm.com/mafia/donate.php" target="_blank">Spockholm Mafia Tools</a><br />'+
                        '<a href="#" id="'+spocklet+'_attack" title="Try to attack!" alt="Try to attack!" class="sexy_button_new short black sexy_attack_new"><span><span>Att</span></span></a>&nbsp;'+
                        '<a href="#" id="'+spocklet+'_switch" title="Switch boss!" alt="Switch boss!" class="sexy_button_new short black"><span><span>Boss</span></span></a>&nbsp;'+
                        '<a href="http://www.spockholm.com/mafia/donate.php" target="_blank" class="sexy_button_new short black" title="Support Team Spockholm!" alt="Support Team Spockholm!"><span><span><span class="cash"></span></span>&nbsp;</span></a>&nbsp;'+
                        //'<a href="#" id="'+spocklet+'_toggle_auto_attack" class="sexy_button_new short black sexy_attack_new"><span><span>Auto</span></span></a>&nbsp;'+
                        '<a href="#" id="'+spocklet+'_pause" title="Pause" alt="Pause" class="sexy_button_new short green"><span><span>Pause</span></span></a>&nbsp;'+
                        '<a href="#" id="'+spocklet+'_close" title="Close" alt="Close" class="sexy_button_new short black"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/black_close_button_14x14_01.gif" /></span></span></a>'+
                             '<br /><label><input type=checkbox id="'+spocklet+'_send" checked />送出道具</label>'+
                        '<br />把道具給 <label><input type=radio name="'+spocklet+'_boosts" class="'+spocklet+'_boosts" value="random" checked />隨機</label>'+
                        '<label><input type=radio name="'+spocklet+'_boosts" class="'+spocklet+'_boosts" value="top" />上層人員</label>'+
                        '<label><input type=radio name="'+spocklet+'_boosts" class="'+spocklet+'_boosts" value="bottom" />剛來打的</label>'+
                        '<br /><label><input type=checkbox id="'+spocklet+'_ask" checked />發出道具請求</label>'+
                        '<br />分數在 <input type=text id="'+spocklet+'_stopat" style="border: 1px solid #888;margin 0;padding 0;background: #000; color: #fff; width: 48px;" /> 停止<br />'+
                        '<br /><br /><div id="'+spocklet+'_slider" style="width:230px; text-align:center;"></div>最大子彈使用: <span id="'+spocklet+'_slider_value">5</span><br />'+
                        '<br /><br /><div id="'+spocklet+'_slider_rage" style="width:230px; text-align:center;"></div>最小攻擊憤怒值: <span id="'+spocklet+'_slider_rage_value">'+rage_meter[0]+'</span><br />'+
                        '<label><input type="checkbox" checked id="'+spocklet+'_restart">再次攻擊在 <input id="'+spocklet+'_restarttimer" type="text" value=20 style="border: 1px solid #888;margin 0;padding 0;background: #000; color: #fff; width: 32px;" />秒後</label><br />'+
                        '<label><input type=checkbox id="'+spocklet+'_switchrestart" />Switch bosses on restart</label><br />'+
                        '<span id="'+spocklet+'_status"></span>'+
                        '<span id="'+spocklet+'_statuslog"></span>'+
                        '<span id="'+spocklet+'_health"></span>'+
                        '<span id="'+spocklet+'_log"></span>'+
                '</div>';

                if ($('#'+spocklet+'_main').length > 0) {
                        $('#'+spocklet+'_main').html(box_html);
                }
                else {
                        $('#mw_city_wrapper').append(box_html);
                }

                $('#'+spocklet+'_attack').click(function() {
                        paused=false;
                        click_attack_button();
                        $('#'+spocklet+'_pause').removeClass('orange').addClass('green').find('span > span').html('Pause');
                        return false;
                });

                $('#'+spocklet+'_switch').click(function() {
                        log('Switching boss...');
                        var bossid=0;
                        try {
                                bossid=parseInt(/boss_id\=(\d+)/.exec($('#attackBtn > a').attr('href'))[1]);
                        } catch(e) { }
                        if (bossid==1) {
                                BossOperationController.goToFight(2);
                        } else if (bossid==2) {
                                BossOperationController.goToFight(3);
                        } else if (bossid==3){
                                BossOperationController.goToFight(4);
                        } else if (bossid==4){
                                BossOperationController.goToFight(3);
                        }
                        return false;
                });

                $('#'+spocklet+'_pause').click(function() {
                        if (paused) {
                                paused=false;
                                click_attack_button();
                                $(this).removeClass('orange').addClass('green').find('span > span').html('Pause');
                        } else {
                                paused=true;
                                clearTimeout(timer_fighting);
                                $(this).removeClass('green').addClass('orange').find('span > span').html('Paused');
                        }
                        return false;
                });

                $('#'+spocklet+'_close').click(function() {
                        run = false;
                        $('#'+spocklet+'_main').remove();
                        $('body').unbind('ajaxComplete');
                        clearTimeout(timer_fighting);
                });

                $('#'+spocklet+'_header').mouseover(function() {
                        $(this).css('cursor', 'move');
                });
                $('#'+spocklet+'_main').draggable( { handle: "#"+spocklet+'_header' } );

                $('#'+spocklet+'_slider').slider({
                        //range: "min",
                        min: 5,
                        max: 150,
                        stepValues: [5,15,45,90,150],
                        slide: function(event, ui) {
                                var stepValues = $(this).slider("option", "stepValues"),
                                        distance = [],
                                        minDistance = $(this).slider("option", "max"),
                                        minI;
                                $.each(stepValues, function(i, val) {
                                        distance[i] = Math.abs( ui.value - val );
                                        if ( distance[i] < minDistance ) {
                                                minDistance = distance[i];
                                                minI = i;
                                        }
                                });
                                if ( minDistance ) {
                                        $(this).slider("value", stepValues[ minI ]);
                                        $('#'+spocklet+'_slider_value').html(stepValues[ minI ]);
                                        max_stamina=parseInt(stepValues[ minI ]);
                                        return false;
                                }
                        },
                        change: function(event,ui) {
                                $('#'+spocklet+'_slider_value').html(ui.value);
                                max_stamina=parseInt(ui.value);
                        }
                }).css('margin','10px').css('background','#0080ff').find('div').css('background','blue');;

                $('#'+spocklet+'_slider_rage').slider({
                        range: "min",
                        min: 0,
                        max: 3,
                        value: 0
                }).css('margin','10px').css('background','#ff8040').find('div').css('background','#ff8040');
                $('#'+spocklet+'_slider_rage').bind('slide', function(event, ui) {
                        $('#'+spocklet+'_slider_rage_value').html(rage_meter[ui.value]);
                        max_rage=rage_values[ui.value];
                });

                var position = $('#inner_page').position();
                $('#'+spocklet+'_main').css({
                        'padding':'5px',
                        'background':'#c0c0c0',
                        'color':'#000',
                        'position':'fixed',
                        'top': '350px',
                        'left': '250px',
                        'z-index':'100',
                        'width':'275px',
                        'border':'2px solid #888',
                        '-moz-border-radius':'3px',
                        'border-radius':'3px',
                        '-webkit-border-radius':'2px'
                });
        }

        function log(s) {
                if (debug) {
                        $('#'+spocklet+'_log').html('<p>'+s+'</p>');
                        if (console) {
                                console.log(s);
                        }
                }
                else {
                        $('#'+spocklet+'_log').html('<p>'+s+'</p>');
                }
                $('#'+spocklet+'_statuslog').html(output_status());
        }

        create_control_box();

        //add analytics
        function loadContent(file){
                var head = document.getElementsByTagName('head').item(0);
                var scriptTag = document.getElementById('loadScript');
                if(scriptTag) head.removeChild(scriptTag);
                        script = document.createElement('script');
                        script.src = file;
                        script.type = 'text/javascript';
                        script.id = 'loadScript';
                        head.appendChild(script);
        }
        loadContent('http://www.google-analytics.com/ga.js');
        try {
                var pageTracker = _gat._getTracker("UA-8435065-3");
                pageTracker._trackPageview();
                pageTracker._trackPageview("/script/Family-Boss-Fighter");
        }
        catch(err) {}
        //end analytics
}())
