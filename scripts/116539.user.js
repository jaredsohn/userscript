// ==UserScript==
// @author         Demios
// @name           tanpa
// @namespace      tanpa
// @description    tanpa
// @version        1.2
// @include        http://www.e-sim.org/battle*
// @include        http://e-sim.org/battle*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// @require        http://www.bramstein.com/projects/text-overflow/jquery.text-overflow.min.js
// ==/UserScript==

var es_monitor = false;
var es_resistance = false;

function rand( min, max ) { // Generate a random integer
    if( max ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (min + 1));
    }
}


Function.prototype.process= function( state ){
    var process= function( ){
        var args= arguments;
        var self= arguments.callee;
        setTimeout( function( ){
            self.handler.apply( self, args );
        }, 0 )
    }
    for( var i in state ) process[ i ]= state[ i ];
    process.handler= this;
    return process;
}


function es_add_advanced() {
    jQuery('<tr id="esimAdvanced"><td id="esimAContent" colspan="3"></td></tr>').insertAfter('navigationRow');
}

function es_show_battle() {
    if ($('.fightButton').length == 2) {
        es_resistance = true;        
    }
    var es_battle_bar =
        'Food: <select id="es_food"></select>'+
        ' Gift: <select id="es_gift"></select>';
    if (es_resistance) {
        es_battle_bar = es_battle_bar + ' Fight for: <select id="es_fightfor"><option value="Occupant">Occupant</option><option value="Resistance">Resistance</option></select>';
    }
    es_battle_bar = es_battle_bar + ' Weapon: <select id="es_weapon"></select>'+
        ' Hit: <input type="text" id="es_hit" val="1" style="width:40px" />'+
        ' Timeout: <select id="es_timeout"><option value="1000">1-1.5</option><option value="1500">1.5-2</option><option value="2000">2-2.5</option><option value="3000">2.5-3</option></select>'+
        ' <button id="es_gohit">Go HIT!</button>'+
        ' <button id="es_gomonitor">Monitor on!</button>';
    jQuery('#esimAContent').append(es_battle_bar);
}

function es_init_battle() {
    $this = this;
    this.monitor_interval = false;
    this.monitor_parser_run = false;
    this.hit_interval = false;
    this.hit_go = false;
    this.hit_count = 0;
    this.hit_run = false;
    this.hit_total_damage = 0;
    this.hit_result_damage = 0;
    this.hit_last_damage = 0;
    this.current_health = 0;
    this.health_run = false;
    this.food_limit = 0;
    this.gift_limit = 0;

    this.top_defender = jQuery('#contentRow').find('div').filter(function(index){
        return jQuery(this).html()=='Top defenders';
    }).parent();
    this.top_attacker = jQuery('#contentRow').find('div').filter(function(index){
        return jQuery(this).html()=='Top attackers';
    }).parent();

    this.init = function() {
        $this.battle_id = jQuery('#battleId').val();
        jQuery('#es_food').html(jQuery('#foodQuality').html());
        jQuery('#es_gift').html(jQuery('#giftQuality').html());
        jQuery('#es_weapon').html(jQuery('#weaponQuality').html());
        jQuery('#es_gomonitor').click(function(){
            if ( es_monitor ) {
                jQuery(this).html('Monitor On!');
                clearTimeout($this.monitor_interval);
                es_monitor = false;
            } else {
                jQuery(this).html('Monitor Off!');
                $this.monitor_interval = setInterval(function(){$this.monitor_battle();}, 10000);
                es_monitor = true;
            }
        });
        jQuery('#es_gohit').click(function(){
            if ( $this.hit_go ) {
                $this.stop_hit();
            } else {
                $this.hit_count = 0;
                $this.go_hit();
            }
        });
        $this.limit_refresh();
    };
    
    this.monitor_battle = function() {
        if ($this.monitor_parser_run) {
            return;
        }
        $this.end_round_time = parseInt(jQuery('#roundCountdown').children('span').html().replace(/:/g,''),10);
        if ($this.end_round_time<30) {
            jQuery('#es_gomonitor').html('Monitor On!');
            clearTimeout($this.monitor_interval);
            es_monitor = false;
            return;
        }
        $this.monitor_parser_run = true;
        jQuery.get('/battle.html', {'id':$this.battle_id}, function(data){
            var es_bar = jQuery(data).find('#battleBar').html();
            jQuery('#battleBar').html(es_bar);
            var es_top_defender = jQuery(data).find('div').filter(function(index){
               return jQuery(this).html()=='Top defenders';
            }).parent().html();
            $this.top_defender.html(es_top_defender)
            var es_top_attackers = jQuery(data).find('div').filter(function(index){
               return jQuery(this).html()=='Top attackers';
            }).parent().html();
            $this.top_attacker.html(es_top_attackers)
            $this.monitor_parser_run = false;
        });
    };

    this.limit_refresh = function() {
        $this.current_health = parseInt(jQuery("#wellness").text(),10);
        $this.food_limit = parseInt(jQuery('#foodLimit').text());
        $this.gift_limit = parseInt(jQuery('#giftLimit').text());
    };

    this.get_timeout_rnd = function() {
        var min = parseInt(jQuery('#es_timeout').val(),10),
        max = min+500;
        return rand(min,max);
    };

    this.hit_result_show = function() {
        if (!jQuery('#es_totaldamage').length) {
            var div_insert = jQuery('#userName').parent();
            jQuery(
                '<br/>Total damage:<b id="es_totaldamage">0</b><br/>'+
                'Current damage:<b id="es_currentdamage">0</b><br/>'+
                'Last damage:<b id="es_lastdamage">0</b><br/>'+
                'Error:<b id="es_error"></b><br/>'
            ).insertBefore(div_insert);
        }
        jQuery('#es_totaldamage').text($this.hit_total_damage);
        jQuery('#es_currentdamage').text($this.hit_result_damage);
        jQuery('#es_lastdamage').text($this.hit_last_damage);
    };

    this.check_wellness_up = function() {
        if ($this.health_run) {
            return false;
        }
        $this.health_run = true;
        if($this.current_health>0) {
            $this.health_run = false;
            return true;
        } else {
            var es_food = parseInt(jQuery('#es_food').val());
            var es_gift = parseInt(jQuery('#es_gift').val());
            if (!es_food && !es_gift) {
                $this.health_run = false;
                return false;
            }
            if (es_food && $this.food_limit) {
                $this.stop_hit();
                var eat_interval = setInterval(function(){
                    $.post('eat.html', {'quality':es_food},function(data){
                        var data = jQuery.parseJSON(data);
                        if (data.error!='') {
                            clearInterval(eat_interval);
                            if (!$this.current_health) {
                                jQuery('#es_error').text(data.error);
                            } else {
                                $this.go_hit();
                            }
                            $this.health_run = false;
                        }
                        $this.user_param_update(data);
                        if ($this.current_health==100) {
                            clearInterval(eat_interval);
                            $this.health_run = false;
                            $this.go_hit();
                        }
                    });
                },$this.get_timeout_rnd());
                return false;
            }
            if (es_gift && $this.gift_limit) {
                $this.stop_hit();
                var gift_interval = setInterval(function(){
                    $.post('gift.html', {'quality':es_gift},function(data){
                        var data = jQuery.parseJSON(data);
                        if (data.error!='') {
                            clearInterval(gift_interval);
                            if (!$this.current_health) {
                                jQuery('#es_error').text(data.error);
                            } else {
                                $this.go_hit();
                            }
                            $this.health_run = false;
                        }
                        $this.user_param_update(data);
                        if ($this.current_health==100) {
                            clearInterval(gift_interval);
                            $this.health_run = false;
                            $this.go_hit();
                        }
                    });
                },$this.get_timeout_rnd());
                return false;
            }
            $this.health_run = false;
            return false;
        }
    };

    this.user_param_update = function(json) {
        $("#foodLimit").html(json.foodLimit);
        $("#giftLimit").html(json.giftLimit);
        $("#wellness").html(json.wellness);
        $("#q1FoodStorage").html("Q1 Food ("+json.q1FoodStorage+" left)");
        $("#q2FoodStorage").html("Q2 Food ("+json.q2FoodStorage+" left)");
        $("#q3FoodStorage").html("Q3 Food ("+json.q3FoodStorage+" left)");
        $("#q4FoodStorage").html("Q4 Food ("+json.q4FoodStorage+" left)");
        $("#q5FoodStorage").html("Q5 Food ("+json.q5FoodStorage+" left)");
        $("#q1GiftStorage").html("Q1 Gift ("+json.q1GiftStorage+" left)");
        $("#q2GiftStorage").html("Q2 Gift ("+json.q2GiftStorage+" left)");
        $("#q3GiftStorage").html("Q3 Gift ("+json.q3GiftStorage+" left)");
        $("#q4GiftStorage").html("Q4 Gift ("+json.q4GiftStorage+" left)");
        $("#q5GiftStorage").html("Q5 Gift ("+json.q5GiftStorage+" left)");
        $this.limit_refresh();
    };

    this.on_hit = function() {
        if ($this.hit_run) {
            return;
        }
        if (!$this.check_wellness_up()) {
            return; 
        }
        $this.hit_run = true;
        var param_hit = {'side':'Fight!'};
        param_hit.battleId = $this.battle_id;
        param_hit.weaponQuality = jQuery('#es_weapon').val();
        if (es_resistance) {
            param_hit.side = jQuery('#es_fightfor').val();
        }
        jQuery.post('fight.html',param_hit,function(data) {
            var healthUpdate = jQuery(data).find("#healthUpdate").text();
            var error = jQuery(data).find("table.redTable").length;
            if (error) {
                jQuery('#es_error').text(jQuery(data).find("p").text());
                $this.stop_hit();
                return;
            }
            $this.hit_total_damage = parseInt(jQuery(data).find('#totalDamageUpdate').text(),10);
            var firstDiv = jQuery(data).find('div.importantMessage');
            $this.hit_last_damage = parseInt(firstDiv.children('b').text(),10);
            $this.hit_result_damage += $this.hit_last_damage;
            var xpUp = parseInt(firstDiv.next().children('b').text(),10);
            $this.hit_result_show();
            $this.hit_count += 1;
            if (healthUpdate!="") {
                $("#wellness").text(healthUpdate.substr(0, healthUpdate.length-3 ));
                $this.limit_refresh();
            } 
            if (parseInt(jQuery('#es_hit').val())==$this.hit_count) {
                $this.stop_hit();
            }
            $this.hit_run = false;
        });
    };

    this.stop_hit = function() {
        jQuery('#es_gohit').html('Go HIT!');
        clearTimeout($this.hit_interval);
        $this.hit_go = false;
    };

    this.go_hit = function() {
        if (!parseInt(jQuery('#es_hit').val())) return;
        jQuery('#es_gohit').html('Stop HIT!');
        $this.hit_interval = setInterval(function(){$this.on_hit();}, $this.get_timeout_rnd());
        $this.hit_go = true;
        $this.on_hit();
    };

    this.init();
}

jQuery(document).ready(function(){
    //jQuery('navigationRow').length
    //alert(2);
    es_add_advanced();
    es_show_battle();
    es_init_battle();
    //jQuery(".esimAdvanced").button();
});