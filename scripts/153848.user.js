// ==UserScript==
// @author          Krye Qendra
// @name            Albanian Battles
// @namespace       Albanian Battles
// @description     List of battles sorted by priority and module for calculating influence in those battles
// @version         2.0.2 
// @match           http://www.erepublik.com/en
// @match           https://www.erepublik.com/en
// @match           http://www.erepublik.com/
// @match           https://www.erepublik.com/mk
// @match           http://www.erepublik.com/*/military/battlefield/*
// @match           https://www.erepublik.com/*/military/battlefield/*
// @include         http://www.erepublik.com/en
// @include         https://www.erepublik.com/en
// @include         http://www.erepublik.com/mk
// @include         https://www.erepublik.com/mk
// @include         http://www.erepublik.com/*/military/battlefield/*
// @include         https://www.erepublik.com/*/military/battlefield/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require         http://arepublik.yzi.me/albanian-battles-ranks.js
// @require         http://arepublik.yzi.me/albanian-battles-language-al.js
// @downloadURL     http://userscripts.org/scripts/source/152669.user.js
// @updateURL       http://userscripts.org/scripts/source/152669.meta.js
// ==/UserScript==

// 

//console.log('Albanian Battles ...');

var forge_storage   = {};
var forge_config    = {};
var forge_version   = "2.0.2";
var forge_fight     = false;
var forge_finished    = false;

function forge_loading() {
    //console.log('Checking for jQuery ...');
    if (typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(forge_loading, 100); 
        return false;
    } else {
        forge_init();
         
    
        var forge_event_option_box = document.getElementById("nope");
        if (forge_event_option_box.addEventListener) {
            forge_event_option_box.addEventListener("click", function() { 
                forge_fight = true;
                if (forge_finished) {
                    $("#pvp_actions").find("div.action_holder").removeClass('disabled');
                }
            }, false);
        } 
    }

}
forge_loading();

function forge_init() {
    //console.log('Loading script ...');
    if (typeof unsafeWindow == 'undefined') {unsafeWindow = window;}
    forge_init_styles();
    forge_init_blocks();
    forge_init_battles();
}

function forge_init_events() {
    //console.log('Loading events ...');
    var forge_event_popup_show = document.getElementById("forge-panel-help");
    if (forge_event_popup_show.addEventListener) {
        forge_event_popup_show.addEventListener("click", function() { 
            $('#forge_overlay').show();
            $('#forge_help_popup').show();
        }, false);
    }
    
    var forge_event_popup_close = document.getElementById("forge_help_popup_close");
    if (forge_event_popup_close.addEventListener) {
        forge_event_popup_close.addEventListener("click", function() { 
            $('#forge_overlay').hide();
            $('#forge_help_popup').hide();
        }, false);
    } 
    
    var forge_event_influence_check = document.getElementById("forge-panel-check");
    if (forge_event_influence_check.addEventListener) {
        forge_event_influence_check.addEventListener("click", function() { 
            GM_xmlhttpRequest({
                method  : 'Get',
                url     : 'http://www.erepublik.com/en/military/battle-stats/' + forge_config.battle_id,
                onload:function(data) {
                    try {
                        var responce = jQuery.parseJSON(data.responseText);                             
                        if (responce) {
                            forge_update_storage(responce);
                        }
                    } catch(error) { 
                        //console.log(error);
                    }                                            
                }
            }); 
        }, false);
    } 
    
    var forge_event_influence_send = document.getElementById("forge-panel-send");
    if (forge_event_influence_send.addEventListener) {
        forge_event_influence_send.addEventListener("click", function() { 
            $(this).parent().addClass('active');
            $(this).find('span').text(translate('Prit'));
            $(this).attr('title', translate('Prit')).attr('id', 'forge-panel-sending');
            $("#pvp_actions").find("div.action_holder").addClass('disabled');
            
            var storages = JSON.parse(sessionStorage.getItem(forge_config.key));
            var formdata = { storage : storages };
            
            GM_xmlhttpRequest({
                method      : 'Post',
                url         : 'http://arepublik.yzi.me/influence.js',
                data        : jQuery.param(formdata),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function (data) {
                    $('#forge-panel').find('a#forge-panel-sending').parent().removeClass('active');
                    $('#forge-panel').find('a#forge-panel-sending').find('span').text(translate('Dergo'));
                    $('#forge-panel').find('a#forge-panel-sending').attr('title', translate('Dergo')).attr('id', 'forge-panel-send');
                    $("#pvp_actions").find("div.action_holder").removeClass('disabled');

                    if (data.status) {
                        var responce = jQuery.parseJSON(data.responseText);
                        //console.log(responce);

                        if (responce.status && responce.status == "success") {
                            storages.stats = [];
                            sessionStorage.setItem(forge_config.key, JSON.stringify(storages));
                            $('#forge-panel').find('a#forge-panel-send').parent().hide();
                        } else {

                        };                        
                    } else {

                    };
                },
                onerror: function (data) {
                    $("#pvp_actions").find("div.action_holder").removeClass('disabled');
                }
            }); 
            
        }, false);
    } 
}

function forge_init_battles() {
    if (typeof unsafeWindow.SERVER_DATA.battleFinished === 'undefined' || parseFloat(unsafeWindow.SERVER_DATA.battleFinished == 1)) {
        return false;
    };
    //console.log('Loading battles ...');
    
    forge_config                = forge_init_config();    
    forge_config.coefficient    = 0;
    forge_config.damage         = 0;
    forge_config.kills          = 0;
    forge_config.citizen_id     = parseFloat(unsafeWindow.flc.getVariable("citizen_id"));
    forge_config.battle_id      = parseFloat(unsafeWindow.SERVER_DATA.battleId);
    forge_config.country_id     = parseFloat(unsafeWindow.SERVER_DATA.countryId);
    forge_config.round_id       = parseFloat(unsafeWindow.SERVER_DATA.zoneId);
    forge_config.division       = parseFloat(unsafeWindow.SERVER_DATA.division);
    forge_config.battle         = false;
    forge_config.battle_obj     = false;
    forge_config.citizen_name   = $('.player.left_side .head_tag .info h4').attr('title');
    forge_config.key            = forge_config.battle_id + '-' + forge_config.round_id + '-' + forge_config.country_id;

    var domination = $('#pvp_header .domination .domibar').css('background-position');
    forge_config.domination = parseFloat(100 - parseFloat(domination.replace('% 0%','')));
        
    forge_hits();
    
    if (forge_config.battle_id) { 
        $("#pvp_battle_area").prepend('<div id="forge-info" class="forge-battle-info"></div>');
            $("#forge-info").append('<div class="info-header"></div>');
            $("#forge-info").append('<div class="info-top"></div>');
            $("#forge-info").append('<div class="info-middle"></div>');
                $("#forge-info").find('div.info-middle').append('<div class="info-content">' + translate("Ju lutem prisni") + '...</div>');

            $("#forge-info").append('<div class="info-bottom"></div>');        

        if (!sessionStorage) {
            $("#forge-info").find('div.info-middle').find('div.info-content').html(translate('Shfletuesi juaj nuk suporton web ruajtjen. Ju lutem perditeso shfletuesin tuaj, ose përdorni ndonjë shfletues tjetër si Chrome moderne, Firefox.'));
            return false;
        } else {
            if (sessionStorage.getItem(forge_config.key) == null) {
                //console.log('Creating session ...');
                var storage = {coefficient: 0, stats : [], damage : {current: 0, last: 0}, kills : {current: 0, last: 0}}
                sessionStorage.setItem(forge_config.key, JSON.stringify(storage));
            } else {
                //console.log('Loading session ...');
            };
        };
        
        GM_xmlhttpRequest({
            method  : 'Get',
            url     : 'http://arepublik.yzi.me/battle.js',
            onload:function(data) {
                try {
                    var responce = jQuery.parseJSON(data.responseText);
                    if (responce.length > 0) {
                        jQuery.each(responce, function(index, value) {
                            if (parseFloat(value.battle_code) == forge_config.battle_id) {
                                forge_config.battle = forge_config.battle_id;
                                forge_config.battle_obj = value;
                            }
                        });

                        if (forge_config.battle) {
                            $("#pvp_actions").find("div.action_holder").addClass('disabled');
                            
                            $("#forge-info").find('div.info-content').html('');
                            $("#forge-info").find('div.info-content').append('<div class="battle-content">' + translate('Prioriteti i betejes') + '</div>');
                                $("#forge-info").find('div.battle-content').append('<div class="ratings" id="raiting-container"></div>');
                                    $("#forge-info").find('div#raiting-container').append('<div id="rating-current" class="ratings-value priority-' + forge_config.battle_obj.battle_priority + '">&nbsp;</div>');

                                $("#forge-info").find('div.battle-content').append('<div class="battle-bars"></div>');
                                    $("#forge-info").find('div.battle-bars').append('<div class="battle-coefficient"></div>');
                                        $("#forge-info").find('div.battle-coefficient').append('<p>' + translate('Koeficient') + '<strong id="bar-value">' + forge_config.coefficient + '%</strong></p>');
                                        $("#forge-info").find('div.battle-coefficient').append('<div class="bar-progress"></div>');
                                            $("#forge-info").find('div.battle-coefficient .bar-progress').append('<div style="width: ' + forge_config.coefficient + '%;" class="progress"></div>');

                            GM_xmlhttpRequest({
                                method  : 'Get',
                                url     : 'http://www.erepublik.com/en/military/battle-stats/' + forge_config.battle_id,
                                onload:function(data) {
                                    try {
                                        var responce = jQuery.parseJSON(data.responseText);                             
                                        if (responce) {                               
                                            forge_rounds_track(responce);                                                
                                        }
                                    } catch(error) {
                                        //console.log(error);
                                    }                                            
                                }
                            });                             

                        } else {
                            $("#forge-info").find('div.info-content').html(translate('Ju mund te luftoni ne kete beteje'));
                        };
                    } else {
                        $("#forge-info").find('div.info-content').html(translate("Nuk eshte ndonje beteje aktive"));
                    };                        
                } catch(error) { 
                    //console.log(error);
                    $("#forge-info").find('div.info-content').html(translate("Gabim") + ': ' + translate("Për disa arsye, ne nuk ishin në gjendje për të shfaqur në betejat e rëndësishme"));
                };
            },
            onerror:function(data) {
                $("#forge-info").find('div.info-content').html(translate("Gabim") + ': ' + translate("Për disa arsye, ne nuk ishin në gjendje për të shfaqur në betejat e rëndësishme"));
            }
        });
    }
}

function forge_check_version() {
    GM_xmlhttpRequest({
        method  : 'Get',
        url     : 'http://arepublik.yzi.me/version.js/',
        onload:function(data) {
            if (data.responseText) {
                try {
                    var responce = jQuery.parseJSON(data.responseText);
                    if (responce.version && responce.link) {
                        if (responce.version != forge_version) {
                            var link = '<a target="_blank" href="' + responce.link + '">here</a>';
                            var html = 'New script is available now. Click ' + link + ' to update your script';
                            $("#forge-panel").find('div.panel-container').find('div.panel-container-version').html(html);
                            return false;
                        } else {
                            $("#forge-panel").find('div.panel-container').find('div.panel-container-header').show();
                            $("#forge-panel").find('div.panel-container').find('div.panel-container-content').show();
                            $("#forge-panel").find('div.panel-container').find('div.panel-container-footer').show();
                            $("#forge-panel").find('div.panel-container').find('div.panel-container-version').hide();
                            forge_config.version.status = true;
                            return true;
                        };
                    } else {
                        //forge_remove_panel();
                        return false;
                    };
                } catch (error) {
                    //console.log(error);
                    //forge_remove_panel();
                    return false;
                };
            };
        },
        onerror:function(data) {
            //forge_remove_panel();
            return false;
        }
    });
}

function forge_rounds_track(responce) {
    //console.log('Checking round ...');
    forge_create_panel();
    
    setTimeout(function() {
        forge_check_version();
        forge_battles_track(responce);    
    }, 15000);
}

function forge_battles_track(initial) {
    if (!forge_config.version.status) {
        forge_config.version.errors++;
        if (forge_config.version.errors > 20) {
            return false;
        }
        setTimeout(function() {
            forge_battles_track(initial);
        }, 2000);
        return false;
    }
    
    //console.log('Battle track ...');
    var interval = null;    
    var storage = JSON.parse(sessionStorage.getItem(forge_config.key));
    
    forge_finished = true;
    if (forge_fight || forge_finished) {
        $("#pvp_actions").find("div.action_holder").removeClass('disabled');
    }
    
    forge_init_events();
    
    if (forge_config.country_id && forge_config.division && forge_config.round_id && forge_config.battle_id && forge_config.battle_obj ) {
        storage.coefficient = forge_config.calculation[forge_config.battle_obj.battle_priority]["main"];

        var strings = parseInt(parseFloat(storage.coefficient) * 100);
        $("#forge-info").find('div.battle-coefficient').find('strong#bar-value').html('?');
        $("#forge-info").find('div.battle-coefficient .bar-progress').find('div').css("width", '0%');

        if (typeof initial !== 'undefined') {              
            storage.coefficient     = forge_battles_calculate_coefficient(initial);
            storage.damage.current  = forge_battles_calculate_damage(initial);
            storage.damage.last     = forge_battles_calculate_damage(initial);
            storage.kills.current   = forge_battles_calculate_kills(initial);
            storage.kills.last      = forge_battles_calculate_kills(initial);
            sessionStorage.setItem(forge_config.key, JSON.stringify(storage));

            if (storage.stats.length > 0) {
                $("#forge-panel").find('div.panel-container-footer').find('div#footer_columns2').show();
            } else {
                $("#forge-panel").find('div.panel-container-footer').find('div#footer_columns2').hide();
            };                

            $("#forge-panel").find('span#forge-battle-round-damage').html(storage.damage.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' (' + forge_config.hitQ7 + ')');
            $("#forge-panel").find('span#forge-battle-round-kills').html(storage.kills.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

            forge_pannel_slider(initial);
        };

        clearInterval(forge_config.interval);
        forge_config.interval = setInterval(function(){  
            GM_xmlhttpRequest({
                method  : 'Get',
                url     : 'http://www.erepublik.com/en/military/battle-stats/' + forge_config.battle_id,
                onload:function(data) {
                    try {
                        var responce = jQuery.parseJSON(data.responseText);                             
                        if (responce) {
                            forge_update_storage(responce);                                
                        };
                    } catch(error) { 
                        //console.log(error);
                    };
                }
            });
        },15000);
    };
}

function forge_update_storage (responce) {    
    //console.log('Updating storage ...');
    
    if (forge_fight || forge_finished) {
        $("#pvp_actions").find("div.action_holder").removeClass('disabled');
    }
    
    clearInterval(forge_config.slider);
    forge_pannel_slider(responce);

    var storages = JSON.parse(sessionStorage.getItem(forge_config.key));  
    storages.coefficient = forge_battles_calculate_coefficient(responce);

    var dmg = forge_battles_calculate_damage(responce);
    if ((parseInt(dmg) > storages.damage.current)) {
        storages.damage.last = storages.damage.current;
        storages.damage.current = forge_battles_calculate_damage(responce);
        storages.kills.last = storages.kills.current;
        storages.kills.current = forge_battles_calculate_kills(responce);

        var stats = {};
        stats.config    = forge_config;
        stats.created   = new Date().toString();
        stats.responce  = {personal : responce.stats.personal, division : responce.division};
        stats.storage   = {coefficient : storages.coefficient, damage : { }, kills: { }};
        stats.storage.damage    = {current : storages.damage.current, last: storages.damage.last};
        stats.storage.kills     = {current : storages.kills.current, last: storages.kills.last};
        storages.stats.push(stats);                                    

        $("#forge-panel").find('span#forge-battle-round-damage').html(storages.damage.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' (' + forge_config.hitQ7 + ')');
        $("#forge-panel").find('span#forge-battle-round-kills').html(storages.kills.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    };

    if (storages.stats.length > 0) {
        $("#forge-panel").find('div.panel-container-footer').find('div#footer_columns2').show();
    } else {
        $("#forge-panel").find('div.panel-container-footer').find('div#footer_columns2').hide();
    };
    sessionStorage.setItem(forge_config.key, JSON.stringify(storages));
}

function forge_battles_calculate_damage (damage) {
    if (typeof damage.stats.personal.kills !== 'undefined' && parseInt(damage.stats.personal.kills) == 0) {
        forge_config.damage = 0;
    } else {
        jQuery.each(damage.stats.personal, function(round_index, round_value) {
            if (parseInt(round_index) == forge_config.round_id) {
                jQuery.each(round_value, function(country_index, country_value) {
                    if (parseInt(country_index) == forge_config.country_id) {
                        var temp_damage = 0;
                        jQuery.each(country_value, function(damage_index, damage_value) {
                            if (typeof damage_value.damage !== 'undefined') {
                                temp_damage = parseInt(temp_damage) + parseInt(damage_value.damage);
                            }
                        });
                        if (temp_damage >= forge_config.damage) {
                            forge_config.damage = temp_damage;
                        }
                    }
                });
            }
        }); 
    };
    return forge_config.damage;    
};

function forge_battles_calculate_kills (responce) {
    if (typeof responce.stats.personal.kills !== 'undefined' && parseInt(responce.stats.personal.kills) == 0) {
        forge_config.kills = 0;
    } else {
        jQuery.each(responce.stats.personal, function(round_index, round_value) {
            if (parseInt(round_index) == forge_config.round_id) {
                jQuery.each(round_value, function(country_index, country_value) {
                    if (parseInt(country_index) == forge_config.country_id) {
                        var temp_kills = 0;
                        jQuery.each(country_value, function(kills_index, kills_value) {
                            if (typeof kills_value.kills !== 'undefined') {
                                temp_kills = parseInt(temp_kills) + parseInt(kills_value.kills);
                            }
                        });
                        if (temp_kills >= forge_config.kills) {
                            forge_config.kills = temp_kills;
                        }
                    }
                });
            }
        }); 
    };
    return forge_config.kills;
};

function forge_battles_calculate_coefficient (responce) {
    var result = 0;var vars = {};
    var domination = $('#pvp_header .domination .domibar').css('background-position');

    result          = forge_config.calculation[forge_config.battle_obj.battle_priority]["main"];
    vars.division   = responce.division[forge_config.country_id][forge_config.division];
    vars.bars       = parseInt(responce.division.bar[forge_config.division]);
    vars.domination = parseFloat(100 - parseFloat(domination.replace('% 0%','')));

    if (vars.bars == forge_config.country_id) {       
        var domination = parseInt(Math.round(vars.domination));
        if (domination <= 52) {
            result = forge_config.calculation[forge_config.battle_obj.battle_priority]["52"]["value"];
        } else if (domination > 52 &&  domination <= 55) {
            result = forge_config.calculation[forge_config.battle_obj.battle_priority]["55"]["value"];
        } else {
            result = 0;
        }
    };

    var strings = parseInt(parseFloat(result) * 100);
    $("#forge-info").find('div.battle-coefficient').find('strong#bar-value').html(strings + '%');
    $("#forge-info").find('div.battle-coefficient .bar-progress').find('div').css("width", (strings + '%'));

    forge_config.domination = vars.domination;
    forge_config.coefficient = result;
    return result;    
};

function forge_create_panel() {

    $("div#content").append('<div class="clear"></div><div id="forge-panel" class="forge-battle-panel"></div>');
    $("#forge-panel").append('<h4 class="panel-heading">' + translate('Republika e Shqiperise') + '</h4>');
    $("#forge-panel").append('<div class="panel-container"></div>');
        $("#forge-panel").find('div.panel-container').append('<div class="panel-container-header"></div>');
            $("#forge-panel").find('div.panel-container-header').append('<div class="columns1" id="header_columns1"><strong>' + translate('Kontrollo influencen') + '</strong></div>');
            $("#forge-panel").find('div.panel-container-header').append('<div class="columns2" id="header_columns2"><strong>' + translate('Informacione') + '</strong></div>');
        $("#forge-panel").find('div.panel-container').append('<div class="panel-container-content"></div>');
            $("#forge-panel").find('div.panel-container-content').append('<div class="columns1" id="content_columns1"></div>');
                $("#forge-panel").find('div.panel-container-content .columns1#content_columns1').append('<div class="update-progress-info"></div>');
                    $("#forge-panel").find('div.panel-container-content .update-progress-info').append('<div class="label force-left">' + translate('azhornimi i fundit') + '</div>');
                    $("#forge-panel").find('div.panel-container-content .update-progress-info').append('<div class="value force-right">-</div>');
                    $("#forge-panel").find('div.panel-container-content .update-progress-info').append('<div class="clear"></div>');
                $("#forge-panel").find('div.panel-container-content .columns1#content_columns1').append('<div class="update-progress update-progress-striped active"><div class="bar" style="width: 0%;"></div></div>');

            $("#forge-panel").find('div.panel-container-content').append('<div class="columns2" id="content_columns2"></div>');
                $("#forge-panel").find('div.panel-container-content .columns2#content_columns2').append('<div>' + translate('Gjithesej dem ne kete raund') + ' (Q7)<br><span id="forge-battle-round-damage">0 (' + forge_config.hitQ7 + ')</span></div>');
                $("#forge-panel").find('div.panel-container-content .columns2#content_columns2').append('<div>' + translate('Shuma e vrasjeve') + '<br><span id="forge-battle-round-kills">0</span></div>');                

        $("#forge-panel").find('div.panel-container').append('<div class="panel-container-footer"></div>');
            $("#forge-panel").find('div.panel-container-footer').append('<div class="columns1" id="footer_columns1"></div>');
                $("#forge-panel").find('div.panel-container-footer .columns1#footer_columns1').append('<a title="" class="fluid_blue_dark_medium" id="forge-panel-help" href="javascript:;" style="margin-left:0px; left: 5px;"><span>?</span></a>');
                $("#forge-panel").find('div.panel-container-footer .columns1#footer_columns1').append('<a title="" class="fluid_blue_dark_medium" id="forge-panel-check" href="javascript:;" style="margin-left:0px; left: 15px;"><span>' + translate('Kontrollo demin') + '</span></a>');
                $("#forge-panel").find('div.panel-container-footer .columns1#footer_columns1').append('<a title="" class="fluid_blue_dark_medium" id="forge-panel-stats" href="http://arepublik.yzi.me/version.js" target=_blank" style="margin-left:0px; left: 25px;"><span>' + translate('Statistikat') + '</span></a>');
            $("#forge-panel").find('div.panel-container-footer').append('<div class="columns2" id="footer_columns2"></div>');
                $("#forge-panel").find('div.panel-container-footer .columns2#footer_columns2').append('<a id="forge-panel-send" title="Start" href="javascript:;"><span id="forge-panel-button-label">' + translate('Dergo') +'</span></a>');

        $("#forge-panel").find('div.panel-container').append('<div class="panel-container-version">' + translate("Ju lutem prisni") + '...</div>');

    $("#forge-panel").append('<div class="panel-script-version">Script version: ' + forge_version + '</div>');

        // Dialogs
    $('body').append('<div id="forge_overlay" class="lb_overlay js_lb_overlay" style="display:none; height: 1754px; position: absolute; width: 100%; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 20003; background: none repeat scroll 0% 0% black; opacity: 0.5;"></div>');
    $('body').append('<div id="forge_help_popup" class="solid_pop stripped" style="display: none; left: 50%; margin-left: -274px; z-index: 20004; position: fixed; top: 30%; margin-top: -150.5px;"></div>');
    $('#forge_help_popup').append('<a id="forge_help_popup_close" class="close close_pop_up" title="Close window" href="javascript:;">Close</a>');
    $('#forge_help_popup').append('<div class="content"><div class="fixer"><div class="inner"><div class="message"><div class="text" style="color:white;"></div></div></div></div></div><div class="bottom"></div>');
    $('#forge_help_popup .text').append('<div><strong> </strong> </div><br/>');
}

function forge_remove_panel() {
    $("#forge-panel").hide();
}

function forge_pannel_slider (responce) {
    var width = 0;var date = new Date();
    var string_date = new format_date();

    $("#forge-panel").find('div.update-progress').find('div.bar').css('width', '0%');
    $("#forge-panel").find('div.update-progress-info').find('div.value').html(string_date.format(new Date(),"%d.%m.%y - %H:%M:%S"));
    clearInterval(forge_config.slider);

    forge_config.slider = setInterval(function(){
        if (width > 100) {
            clearInterval(forge_config.slider);
            return false;
        };

        width += parseFloat(3.5);
        $("#forge-panel").find('div.update-progress').find('div.bar').css('width', width +'%');
    }, 500);
};


// Forge homepage blocks
function forge_init_blocks() {
    if ($('#orderContainer').length > 0) {    
        $('#orderContainer').before('<div id="forge-battles-list"></div><div style="clear:both;"></div>');    
        //console.log('Loading blocks ...');
        // Check if profile exist ...
        forge_profiles();
        
        GM_xmlhttpRequest({
            method  : 'Get',
            url     : 'http://arepublik.yzi.me/arepublikscript.js',
            onload:function(data) {
                if (data.responseText) {
                    try {
                        var responce = jQuery.parseJSON(data.responseText);
                        if (jQuery.isArray(responce.battles) && responce.battles.length > 0) {
                            $("#forge-battles-list").append('<h1>' + translate('Betejat kryesore') + '</h1><div id="forge-battles-main"></div>');
                            jQuery.each(responce.battles, function(index, value) { 
                                forge_add_block(value, "forge-battles-main");
                            });
                        };

                        if (jQuery.isArray(responce.other_battles) && responce.other_battles.length > 0) {
                            $("#forge-battles-list").append('<h1>' + translate('Beteja tjera') + '</h1><div id="forge-battles-other"></div>');
                            jQuery.each(responce.other_battles, function(index, value) { 
                                forge_add_block(value, "forge-battles-other");
                            });
                        };

                        if (jQuery.isArray(responce.divisions_battles) && responce.divisions_battles.length > 0) {
                            $("#forge-battles-list").append('<h1>' + translate('Urdhërat ditore për divizionet') + '</h1><div id="forge-battles-divisions"></div>');
                            jQuery.each(responce.divisions_battles, function(index, value) { 
                                forge_add_block(value, "forge-battles-divisions");
                            });
                        };
                    } catch (error) {
                        //console.log(error);
                        $('#forge-battles-list').hide();
                    };

                };
            },
            onerror:function(data) {
                $('#forge-battles-list').hide();
            }
        });
    };    
};

function forge_add_block (battle, container) {
    //console.log('Adding blocks ...');
    var code = battle.battle_code;
    var attacker = battle.attacker[0];
    var defender = battle.defender[0];

    $("#" + container).append('<a id="forge-' + code + '" href="/en/military/battlefield/' + code + '" class="forge-battles-item"></a>');    
        $("#forge-" + code).append('<div class="battle-region">' + battle.battle_region_name + '</div>');        
        $("#forge-" + code).append('<div class="battle-countries"></div>');
            $("#forge-" + code).find('div.battle-countries').append('<span class="blue-text">' + attacker.attacker_name.replace('(FYROM)', '') + '</span>');
            $("#forge-" + code).find('div.battle-countries').append(' vs. ');
            $("#forge-" + code).find('div.battle-countries').append('<span class="red-text">' + defender.defender_name.replace('(FYROM)', '') + '</span>');

        $("#forge-" + code).append('<div class="battle-priority"></div>');
            $("#forge-" + code).find('div.battle-priority').append('<div class="forge-text">' + translate('Prioriteti i betejes') + ':</div>');
            $("#forge-" + code).find('div.battle-priority').append('<div class="ratings" id="raiting-container"></div>');
                $("#forge-" + code).find("#raiting-container").append('<div id="rating-current" class="ratings-value priority-' + battle.battle_priority + '">&nbsp;</div>');        

    if (battle.battle_division != 0) {
        $("#" + container).append('<div class="battle-division"></div>');
            $("#" + container).find('div.battle-division').append(translate('Divizion'));
            $("#" + container).find('div.battle-division').append('<span class="forge-text">' + battle.battle_division + '</span>');
    };
};
// END Forge homepage blocks

function forge_hits() {
    var strength = $('#fighter_skill').text().replace(",","");
    var rank_string = $('#rank_icon').attr('title').split(':')[1].trim();
    var military_rank = forge_rank[rank_string];
    forge_config.hitQ7 = forge_hits_calculate(military_rank, strength, 200, 1, 1);
};
    
function forge_hits_calculate (military_rank, strength, weapon_power, fights, bonus) {
    var rank	= parseFloat((parseFloat(military_rank) - 1)/20 + 0.3);
    var strenght        = parseFloat((parseFloat(strength) / 10) + 40);
    var weapon	= parseFloat(1 + parseFloat(weapon_power)/100);	
    return Math.floor(rank * strenght * weapon * parseFloat(fights) * parseFloat(bonus));
};

function forge_profiles() {
    //console.log('Check if profile exist ...');
    if (localStorage.getItem('forge-profile-check') == null) {
        GM_xmlhttpRequest({
            method  : 'Get',
            url     : 'http://arepublik.yzi.me/citizens.js' + unsafeWindow.flc.getVariable("citizen_id"),
            onload:function(data) {
                if (data.responseText) {
                    try {
                        var responce = jQuery.parseJSON(data.responseText);
                        localStorage.setItem('forge-profile-registered', true);
                    } catch (error) { };
                };
            }
        });
    };
};

function forge_init_config() {
    forge_config = {
        version     : {status: false, errors: 0},
        slider      : null,
        interval    : null,
        key         : false,
        coefficient : 0,
        damage      : 0,
        kills       : 0,
        citizen_id  : 0,
        citizen_name: "",
        battle_id   : 0,
        country_id  : 0,
        round_id    : 0,
        division    : 0,
        hitQ7       : 0,
        domination  : 0,
        battle      : false,
        battle_obj  : false,
        calculation : {
            0 : { // Very high priority
                "main"  : 1,
                52 : {"index" : 52, "value" : 1}, 
                55 : {"index" : 55, "value" : 0.8} 
            }, 
            1 : { // High priority
                "main"  : 0.8,
                52 : {"index" : 52, "value" : 0.8}, 
                55 : {"index" : 55, "value" : 0.6} 
            }, 
            2 : { // Average
                "main"  : 0.6,
                52 : {"index" : 52, "value" : 0.6}, 
                55 : {"index" : 55, "value" : 0.4} 
            }, 
            3 : { // Low priority
                "main"  : 0.4,
                52 : {"index" : 52, "value" : 0.4}, 
                55 : {"index" : 55, "value" : 0.2} 
            }, 
            4 : { // Releasing
                "main"  : 0,
                52 : {"index" : 52, "value" : 0}, 
                55 : {"index" : 55, "value" : 0} 
            } 
        }
    };
    
    return forge_config;
}


function forge_init_styles() {
    //console.log('Loading styles ...');
    // Hide battle master center box ...
    GM_addStyle("#myOverBox { display:none !important; }");
    GM_addStyle("#campaign_left_top5 { display:none !important; }");
    GM_addStyle("#top5_refresh { display:none !important; }");

    // Homepage ...
    GM_addStyle(".force-left { float:left !important; }");
    GM_addStyle(".force-right { float:right !important; }");
    GM_addStyle("#forge-battles-list h1 { margin-bottom:0px; }");
    GM_addStyle(".forge-battles-item { background:transparent url('http://i48.tinypic.com/2qc2jxw.png') no-repeat left top; display:block; width:335px; height:146px; overflow:hidden; margin:0px 0px 10px 0px; }");
    GM_addStyle(".forge-battles-item .blue-text { color:#004D80; }");
    GM_addStyle(".forge-battles-item .red-text { color:#B43837; }");
    GM_addStyle(".forge-battles-item .battle-region { text-shadow:1px 1px 2px #000; font-size:26px; font-family:'Open Sans Condensed',Helvetica,Arial,sans-serif; color: white; font-weight: bold; line-height: 49px; margin: 24px 0px 0px 0px;  padding: 10px 20px; }");
    GM_addStyle(".forge-battles-item .battle-countries { font-size:13px; font-family:'Open Sans Condensed',Helvetica,Arial,sans-serif; color: black; font-weight: bold; padding:3px 25px 3px 25px; text-align: center; text-shadow: 1px 1px 2px #FFFFFF; }");
    GM_addStyle(".forge-battles-item .battle-priority { font-family:'Open Sans Condensed',Helvetica,Arial,sans-serif; }");
    GM_addStyle(".forge-battles-item .battle-priority .forge-text { text-align:right; width:116px; color: black; display: inline; float: left; font-weight: bold; line-height: 18px; margin: 0px 5px 0px 45px; text-shadow: 1px 1px 2px #FFFFFF; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings { float:left; display: block; width: 119px; height: 18px; overflow: hidden; position: relative; margin: 0px 0px 0px 0px; background: transparent url('http://i49.tinypic.com/5mbx2f.png') no-repeat 0px 0px; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value { display: block; height: 18px; overflow: hidden; position: absolute; z-index: 1; background: transparent url('http://i49.tinypic.com/5mbx2f.png') no-repeat 0px -25px; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value.priority-0 { width: 100%; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value.priority-1 { width: 80%; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value.priority-2 { width: 60%; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value.priority-3 { width: 40%; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value.priority-4 { width: 0%; }");
    GM_addStyle(".forge-battles-item .battle-priority .ratings .ratings-value.priority-5 { width: 0%; }");
    GM_addStyle(".forge-battles-item .battle-division { font-size: 10px; margin:-34px 0px 10px 0px; padding: 0 20px; text-align: right; text-shadow: 1px 1px 2px #333333; text-transform: uppercase; }");
    GM_addStyle(".forge-battles-item .battle-division .forge-text { font-size: 30px; font-weight: bold; text-shadow: 1px 1px 2px #333333; }");

    // Battles ...
    GM_addStyle("#pvp_battle_area .player.left_side { margin-left: 30px; }");
    GM_addStyle("#pvp_battle_area .player.right_side { margin-right: 30px; }");
    GM_addStyle(".forge-battle-info { margin:65px 0px 0px 284px; cursor: default; display: block; height: 25px; position: absolute; width: 196px; }");
    GM_addStyle(".forge-battle-info .info-header { background:transparent url('http://i47.tinypic.com/okoqkw.png') no-repeat left top; width:196px; height:15px; overflow:hidden; }");
    GM_addStyle(".forge-battle-info .info-top { background:transparent url('http://i46.tinypic.com/16c7ud4.png') no-repeat left top; width:196px; height:5px; overflow:hidden; }");
    GM_addStyle(".forge-battle-info .info-middle { background:transparent url('http://i49.tinypic.com/9jd9qt.png') repeat-y left top; width:196px; }");
    GM_addStyle(".forge-battle-info .info-bottom { background:transparent url('http://i45.tinypic.com/64e3af.png') no-repeat left top; width:196px; height:5px; overflow:hidden; }");
    GM_addStyle(".forge-battle-info .info-middle .info-content { font-size:11px; text-shadow:0 1px 1px #333333; color:white; padding:0px 10px; }");
    GM_addStyle(".forge-battle-info .battle-content { text-align:center; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings { float:none; display: block; width: 119px; height: 18px; overflow: hidden; position: relative; margin: 0px auto; background: transparent url('http://i49.tinypic.com/5mbx2f.png') no-repeat 0px 0px; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value { display: block; height: 18px; overflow: hidden; position: absolute; z-index: 1; background: transparent url('http://i49.tinypic.com/5mbx2f.png') no-repeat 0px -25px; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value.priority-0 { width: 100%; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value.priority-1 { width: 80%; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value.priority-2 { width: 60%; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value.priority-3 { width: 40%; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value.priority-4 { width: 0%; }");
    GM_addStyle(".forge-battle-info .battle-content .ratings .ratings-value.priority-5 { width: 0%; }");
    GM_addStyle(".forge-battle-info .battle-content .battle-bars { text-align:left; padding:10px 0px 0px 0px; }");
    GM_addStyle(".forge-battle-info .battle-content .battle-bars p { display: block; padding: 0 25px 0 0; position: relative; }")
    GM_addStyle(".forge-battle-info .battle-content .battle-bars p strong { color: #FFFFFF; position: absolute; right: 0;}");
    GM_addStyle(".forge-battle-info .battle-content .battle-coefficient .bar-progress { background-image: url('http://i50.tinypic.com/2wcikc8.png'); background-repeat: no-repeat; display: block; height: 9px; width: 176px; }");
    GM_addStyle(".forge-battle-info .battle-content .battle-coefficient .progress { text-align: center; overflow: visible; background-image: url('http://i47.tinypic.com/2mdnwcp.png'); background-repeat: no-repeat; display: block; height: 9px; margin: 1px 0px 0px 1px; width: auto;}");

    // Battles panel
    GM_addStyle(".forge-battle-panel { -moz-border-radius: 6px; -webkit-border-radius: 6px; border-radius: 6px;  margin:10px 0px; width: 750px; padding: 0; float: left; padding: 0px 0px 0px 10px; background-image: url('/images/modules/manager/dashboard_repeat.png?1333974833'); background-repeat: repeat-y; }");
    GM_addStyle(".forge-battle-panel h4.panel-heading { width: 736px; height: 27px; text-shadow: white 0px 1px 0px; float: left; margin: 10px 0; text-indent: 10px; color: #868686; line-height: 26px; background-image: url('/images/modules/storage/h4.png'); background-repeat: no-repeat; }");
    GM_addStyle(".forge-battle-panel .panel-container { -moz-border-bottom-colors: none; -moz-border-image: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; background: none repeat scroll 0 0 #D5E3EF; border-color: #C5D2DD #CFDDE8 #CFDDE8; border-radius: 5px 5px 5px 5px; border-right: 1px solid #CFDDE8; border-style: solid; border-width: 1px; box-shadow: 0 1px 1px #C8D8E5 inset, 0 1px 0 rgba(255, 255, 255, 0.7); float: left; margin-bottom: 5px; padding: 8px; width: 718px; }");
    GM_addStyle(".forge-battle-panel .panel-container-header { display:none; background-color: #F3F3F3; background-image: -moz-linear-gradient(center top , #FBFBFB 0%, #F3F3F3 100%); border-bottom: 1px solid #E3E3E3; border-radius: 3px 3px 0 0; box-shadow: 0 1px 0 white inset, 0 1px 5px rgba(0, 0, 0, 0.1); float: left; height: 45px; line-height: 45px; position: relative; text-shadow: 0 1px 0 white; z-index: 2; }");
    GM_addStyle(".forge-battle-panel .panel-container-header .columns1, .forge-battle-panel .panel-container-header .columns2 { float: left; height: 45px; position: relative; text-align: center; }");
    GM_addStyle(".forge-battle-panel .panel-container-header .columns1, .forge-battle-panel .panel-container-content .columns1 { width: 517px; }");
    GM_addStyle(".forge-battle-panel .panel-container-header .columns2, .forge-battle-panel .panel-container-content .columns2 { width: 200px; }");    
    GM_addStyle(".forge-battle-panel .panel-container-content { display:none; background: none repeat scroll 0 0 #FBFBFB; border-radius: 0 0 3px 3px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.1); float: left; }");
    GM_addStyle(".forge-battle-panel .panel-container-content .columns1 { width:497px; text-align: center; float: left; padding:10px; }");
    GM_addStyle(".forge-battle-panel .panel-container-content .columns2 { width: 199px; border-left: 1px solid #EFEFEF; text-align: center; float: left; background: none repeat scroll 0 0 #F6F6F6; }");
    GM_addStyle(".forge-battle-panel .panel-container-content .columns2 div { border-bottom: 1px solid #E3E3E3; color: #999999; padding: 5px 0; }");
    GM_addStyle(".forge-battle-panel .panel-container-content .columns2 div span { color: #000000; font-weight: bold; } ");
    GM_addStyle(".forge-battle-panel .panel-container-content .update-progress-info { padding:3px 1px; text-shadow:1px 1px 1px #ACACAC; }");

    GM_addStyle(".forge-battle-panel .panel-container-footer { display:none; float: left; height: auto; position: relative; text-shadow: 0 1px 0 white; width: 717px; z-index: 200; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns1 { padding: 15px 0px 0px 0px; float: left; height: auto; position: relative; text-shadow: 0 1px 0 white; width: 520px; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2 { display:none; margin-bottom:0px; float:right; margin-top: 10px; -moz-transition: background 0.2s ease 0s; background-color: #AFD5E7; background-image: -moz-linear-gradient(center top , #C3DCE9 0%, #AFD5E7 100%); border-radius: 8px 8px 8px 8px; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 1px 1px rgba(0, 0, 0, 0.1) inset; padding: 4px 6px 4px 4px; width: 140px; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2 a { -moz-border-bottom-colors: none; -moz-border-image: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; background-color: #5E9621; background-image: url('/images/modules/manager/noiz.png?1337588804'), -moz-linear-gradient(center top , #90CA48 0%, #5E9621 100%);    border-color: #83B941 #5E9228 #456E18; border-left: 1px solid #5E9228; border-right: 1px solid #5E9228; border-style: solid; border-width: 1px 1px 2px; background-clip: padding-box; border-radius: 3px 3px 3px 3px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.3) inset; color: #FFFFFF; display: block; font-size: 11px; font-weight: bold; margin: 3px auto; padding: 8px 0; text-align: center; text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2); width: 134px; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2.active a { -moz-border-bottom-colors: none; -moz-border-image: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; background-color: #9F2A29; background-image: url('/images/modules/manager/noiz.png?1337588804'), -moz-linear-gradient(center top , #CD5756 0%, #9F2A29 100%); border-color: #C45855 #A53D3B #7C2322; border-left: 1px solid #A53D3B; border-right: 1px solid #A53D3B; border-style: solid; border-width: 1px 1px 2px; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2 a:hover { background-color: #6BAB26; background-image: url('/images/modules/manager/noiz.png?1337588804'), -moz-linear-gradient(center top , #9CD05C 0%, #6BAB26 100%); }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2.active a:hover { background-color: #B32F2E; background-image: url('/images/modules/manager/noiz.png?1337588804'), -moz-linear-gradient(center top , #D36B6A 0%, #B32F2E 100%); }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2 a span { background-image: url('/images/modules/manager/upgrade.png?1337588804'); background-position: left center; background-repeat: no-repeat; padding-left: 20px; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns2.active a span { background-image: url('/images/modules/manager/downgrade.png?1337588804'); background-position: left center; background-repeat: no-repeat; padding-left: 20px; }");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns1 label { display:block; } ");
    GM_addStyle(".forge-battle-panel .panel-container-footer .columns1 input { border-radius: 4px 4px 4px 4px; width:300px; float:left; padding: 9px 5px; margin:0px 10px 0px 0px; border:1px solid #CCC; } ");

    GM_addStyle(".panel-container-content .update-progress { background-color: #F7F7F7; background-image: linear-gradient(to bottom, #F5F5F5, #F9F9F9); background-repeat: repeat-x; border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; height: 20px; margin-bottom: 0px; overflow: hidden !important; }");
    GM_addStyle(".panel-container-content .update-progress .bar { margin:0px; -moz-box-sizing: border-box; background-color: #0E90D2; background-image: linear-gradient(to bottom, #149BDF, #0480BE); background-repeat: repeat-x; box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset; color: #FFFFFF; float: left; font-size: 12px; height: 100%; text-align: center; text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); transition: width 0.6s ease 0s; width: 0; }");
    //GM_addStyle(".panel-container-content .update-progress .bar { margin:0px; -moz-box-sizing: border-box; background-color: #0E90D2; background-image: linear-gradient(to bottom, #149BDF, #0480BE); background-repeat: repeat-x; box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset; color: #FFFFFF; float: left; font-size: 12px; height: 100%; text-align: center; text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }");
    GM_addStyle(".panel-container-content .update-progress .bar + .bar { box-shadow: 1px 0 0 rgba(0, 0, 0, 0.15) inset, 0 -1px 0 rgba(0, 0, 0, 0.15) inset; }");
    GM_addStyle(".panel-container-content .update-progress-striped .bar { background-color: #149BDF; background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); background-size: 40px 40px; }");
    GM_addStyle(".panel-container-content .update-progress.active .bar { animation: 2s linear 0s normal none infinite progress-bar-stripes; }");        

    GM_addStyle(".panel-script-version { margin-bottom:10px; text-align:right; width:734px; padding:0px; color:#FFF; text-shadow:1px 1px 2px #787878; }");

    GM_addStyle(".solid_pop { float: left; width: 548px; }");
    GM_addStyle(".solid_pop .close { background-image: url('/images/modules/manager/close_pop.png?1337588804'); background-position: center top; background-repeat: no-repeat; float: left; height: 22px; position: absolute; right: 13px; text-indent: -9999px; top: 13px; width: 22px; }");
    GM_addStyle(".solid_pop .close:hover { background-position: center bottom; }");
    GM_addStyle(".solid_pop .bottom { height:20px; }");
}

// Helper functions ...
function translate(s) {
    var string = lang_strings[s];    
    if (typeof string !== 'undefined') {
        return string;
    };
    return s;    
};

function format_date() {
    this.dateMarkers = { 
        d:['getDate',function(v) {return ("0"+v).substr(-2,2)}], 
        m:['getMonth',function(v) {return ("0"+(v+1)).substr(-2,2)}],
        n:['getMonth',function(v) {
            var mthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            return mthNames[v];
                }],
        w:['getDay',function(v) {
            var dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            return dayNames[v];
                }],
        y:['getFullYear'],
        H:['getHours',function(v) {return ("0"+v).substr(-2,2)}],
        M:['getMinutes',function(v) {return ("0"+v).substr(-2,2)}],
        S:['getSeconds',function(v) {return ("0"+v).substr(-2,2)}],
        i:['toISOString',null]
    };

    this.format = function(date, fmt) {
        var dateMarkers = this.dateMarkers
        var dateTxt = fmt.replace(/%(.)/g, function(m, p){
            var rv = date[(dateMarkers[p])[0]]()

            if (dateMarkers[p][1] != null) rv = dateMarkers[p][1](rv)

            return rv
        });
        return dateTxt
    };
};