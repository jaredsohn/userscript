// ==UserScript==
// @name           grepoSimulator
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.*/game/building_place?*action=simulator*
// @include        http://*.grepolis.*/game/report*
// @version        1.1
// @description    Simulator helper : adds mythologic units and select gods, boats capacity limitation and autofill, milita reporting, luck -30 
// ==/UserScript==

//@require greasekit

(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var isreport = /game\/report/.test(window.location.href);
    //var lang = (n[1] || 'en'), server = (n[1] + n[2]);
    //var townId = parseInt(uW.Game.townId, 10);
    
    var DATA = {
        boats: {
            big_transporter: 20,
            small_transporter: 10
        },
        units: {
            sword: 1,
            slinger: 1,
            archer: 1,
            hoplite: 1,
            rider: 3,
            chariot: 4,
            catapult: 15
        },
        mythics: {
            zeus: {
                minotaur: 30,
                manticore: 45
            },
            poseidon: {
                zyklop: 40,
                sea_monster: 50
            },
            hera: {
                harpy: 0, //14,
                medusa: 18
            },
            athena: {
                centaur: 12,
                pegasus: 20
            }
        }
    };
    
    $(document).ready(function(){
        if (isreport) {
            setTimeout(simlink, 100);
        } else {
            fillmissing();
            initCapacity();
        }
    });
    
    function simlink(){
        var button = $('.game_list_footer a.button').last();
        if (button.length > 0) {
            var farm = $('#building_farm .place_unit_white');
            if (farm.length > 0) {
                var farm = parseInt(farm.text(), 10);
                var url = button.attr('href');
                url += '&farm=' + farm;
                button.attr('href', url);
            }
        }
    }
    function fillmissing(){
        var url = window.location.search;
        var m = /\?units=([^&]+)&/.exec(url);
        if (m && m[1]) {
            var o = decodeSimData(m[1]);
            if (o) {
                //def god
                _log('def god');
                var attack = 'def';
                var select = $('.place_sim_select_gods .place_' + attack).next('select');
                $.each(DATA.mythics, function(god, units){
                    $.each(units, function(unit, capacity){
                        if (o[attack][unit]) {
                            select.val(god).change();
                            setTimeout(function(){
                                $n('sim[units][' + attack + '][' + unit + ']').val(o[attack][unit]);
                            }, 100);
                        }
                    });
                });
                
                
            }
        }
        
        _log('farm');
        var n = /\&farm=(\d+)/.exec(url);
        if (n && n[1]) {
            //milice
            var militia = 10 * parseInt(n[1], 10);
            $n('sim[units][def][militia]').val(militia);
        }
        //luck -30
        $n('sim[mods][att][luck]').val('-30');
        
        //att god
        _log('att god');
        var urlgod = $('#god_mini').attr('src');
        var g = /\/favor_(\w+)\.png/.exec(urlgod);
        if (g) {
            var select2 = $('.place_sim_select_gods .place_att').next('select');
            select2.val(g[1]).change();
        }
    }
    function decodeSimData(a){
        var o, s = decodeURIComponent(decodeURIComponent(a));
        try {
            o = JSON.parse(s);
        } catch (e) {
        }
        return o;
    }
    function encodeSimData(o){
        var s = JSON.stringify(o);
        s = encodeURIComponent(encodeURIComponent(s));
        return s;
    }
    function autofill(){
        update(true);
    }
    function update(autofill){
        var boat_capacity = 0, unit_capacity = 0;
        $.each(DATA.units, function(unit, capacity){
            unit_capacity += capacity * parseInt($n('sim[units][att][' + unit + ']').val() || 0, 10);
        });
        $.each(DATA.mythics, function(god, units){
            $.each(units, function(unit, capacity){
                unit_capacity += capacity * parseInt($n('sim[units][att][' + unit + ']').val() || 0, 10);
            });
        });
        
        $.each(DATA.boats, function(unit, capacity){
            if (autofill !== unit) {
                boat_capacity += capacity * parseInt($n('sim[units][att][' + unit + ']').val() || 0, 10);
            }
        });
        
        if (autofill) {
            var cap = DATA.boats[autofill];
            var n = Math.ceil((unit_capacity - boat_capacity) / cap);
            $n('sim[units][att][' + autofill + ']').val(n).change();
            boat_capacity += n * cap;
        }
        
        $('#capacity_boats').text(boat_capacity);
        $('#capacity_units').text(unit_capacity);
        
        var ok = (unit_capacity <= boat_capacity);
        $('.cap1').css('color', ok ? 'black' : 'white');
        $('.cap2').css('color', ok ? 'white' : 'red');
        $('.cap3').css('background-color', ok ? 'transparent' : 'red');
    }
    function onchange(){
        var m = /sim\[units\]\[(\w+)\]\[(\w+)\]/.exec(this.name);
        var attack = (m[1] === 'att'), unit = m[2];
        var count = $(this).val() || 0;
        count = parseInt(count, 10);
        var capacity = DATA.boats[unit] || DATA.units[unit] || 0;
        var v = count * capacity;
        $('#capacity1_' + unit).text(v);
        $('#capacity2_' + unit).text(v);
        update();
    }
    
    function addCapacity(unit, capacity){
        $('<div class="capacity"><span class="cap1" id="capacity1_' + unit + '" style="color: black;position: absolute;left: 11px;top: -19px;" class="bold">0</span>' +
        '<span class="cap2" id="capacity2_' +
        unit +
        '" style="color: white;position: absolute;left: 10px;top: -20px;" class="bold">0</span></div>').appendTo($('#building_place_' + unit).parent('td'));
        $n('sim[units][att][' + unit + ']').keyup(onchange).change(onchange).blur(onchange);
    }
    
    function initCapacity(){
        $.each(DATA.units, addCapacity);
        $.each(DATA.boats, function(boat, units){
            addCapacity(boat, units);
            $('#building_place_' + boat).wrap('<a href="javascript:void();"></a>').click(function(){
                update(boat);
            });
        });
        
        $.each(DATA.mythics, function(god, units){
            $.each(units, addCapacity);
        });
        $('.place_sim_sea_wrap h4').append('&nbsp;&gt;<span class="cap3" id="capacity_boats"></span>');
        $('#simulator_body h4').last().append('&nbsp;&gt;<span id="capacity_units"></span>');
    }
    
    function _log(o){
        if (GM_log) {
            GM_log(o);
        } else if (console) {
            console.log(o);
        }
    }
    function getDate(){
        var now = new Date();
        return (now.getDay() + '/' + now.getMonth() + '/' + (1900 + now.getYear()) + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
    }
    function $n(name){
        var els = document.getElementsByName(name);
        if (!els || els.length == 0) {
            _log('By name not found : ' + name);
        }
        return $(els[0]);
    }
    
})();
