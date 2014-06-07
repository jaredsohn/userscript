// ==UserScript==
// @name           FatBoy
// @namespace      UnleashTheFuryMitch
// @include        http://www.erepublik.com/*/military/battlefield/*
// @include        http://www.erepublik.com/*/citizen/profile/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//

GM_addStyle(
  '#DI_options { float: left; margin-top: 10px; }' +
  '#DI_opt_content { float: left; background-color: #eee; padding: 10px 5px; width: 73px; -moz-border-radius: 5px 5px 5px 5px }' +
  '#DI_opt_content h2 { font-size: 12px; margin-bottom: 4px; text-shadow: #fff 0.2em 0.2em; } ' +
  '.DI_option { font-size: 10px; -moz-border-radius: 5px 5px 5px 5px; border-top: 1px solid #E5E5E5; background: none repeat scroll 0 0 #FFFFFF; border-bottom: 1px solid #F0F0F0; display: block; float: left; padding: 0 3px; width: 65px; }' +
  '.DI_option input { width: 58px; font-size: 10px; margin: 2px; } ' +
  '.DI_option input[type=checkbox] { margin: 0; width: 35px; }'
);

// Global vars
// =============================================================================



var MIN_FIGHTER_HEALTH = 80;
var CURRENT_HEALTH = 100;
var HEALT_LIMIT = 300;
var NINJA_PUNCH = 0;
var NINJA_EAT = 0;
var USE_GOLD = 0;
var GOLD_TO_SPEND = 0;
var DELAY = 99;


// Functions
// =============================================================================


function getStatus() {
    CURRENT_HEALTH = unsafeWindow.SERVER_DATA.health;
    HEALT_LIMIT = unsafeWindow.food_remaining;
}



function fight() {
    unsafeWindow.$j('#fight_btn').click();
   // add_damage();
    //unsafeWindow.$j('#add_damage_btn').click();
}

function eat() {

   setTimeout(function () { unsafeWindow.$j('.food_btn').click(); }, DELAY);
    //setTimeout(function () { unsafeWindow.$j('#DailyConsumtionTrigger').click(); }, DELAY);

}

function getOptions() {
    var info = new Array();

    info['DI_weapon_Q1'] = GM_getValue('DI_weapon_Q1');
    if (typeof info['DI_weapon_Q1'] == 'undefined')
        info['DI_weapon_Q1'] = false;
    

    info['DI_mod_weapon'] = GM_getValue('DI_mod_weapon');
    if (typeof info['DI_mod_weapon'] == 'undefined')
        info['DI_mod_weapon'] = 0;

    return info;
}


function eat_gold() {

    unsafeWindow.$j('#health_kit_btn').click();
    //add_damage();
    // alert('eatGold')


}

function add_damage() {


    //window.setInterval(foo, 100);

    /*if ($('#enemy_defeated').is(':visible'))
    unsafeWindow.$j('#add_damage_btn').click(); */
}

function cevap() {
    NINJA_EAT = 1;
    eat();
}


// MAIN function
// =============================================================================
function main() {
    if (typeof unsafeWindow.$j == 'undefined')
        window.setTimeout(main, 1000);
    else {
        var info = getOptions();



        //alert($('#enemy_defeated').is(':visible'))
        $('#sidebar').append('<div id="DI_options" class ="opt" ><div id="DI_opt_content"><h2>Options</h2>' + '<div class="DI_option"><strong></strong><br />' + 'Eat Gold<input type="checkbox" id="DI_weapon_Q1" checked = false  ' + (info['DI_weapon_Q1'] == true ? 'checked="checked"' : 'unchecked') + ' />' + '<div class="DI_option"><strong></strong><br />' + 'Golds<input type="text" id="DI_mod_weapon" value = 0 ' + info['DI_mod_weapon'] + ' /> Min Health<input type="text" class = "watch-me" id="min_health" value = 20 /> Delay (ms)<input type="text" id="delay" value = 600 /></div>' + '</div>');



        $('#DI_weapon_Q1').attr('checked', false);
        $('#DI_mod_weapon').attr('disabled', 'disabled');

        MIN_FIGHTER_HEALTH = parseInt($('#min_health').val());
        DELAY = parseInt($('#delay').val());
        GOLD_TO_SPEND = parseFloat($('#DI_mod_weapon').val())



        $('#DI_weapon_Q1').click(function () {
            if ($(this).attr('checked') == true) {
                $('#DI_mod_weapon').removeAttr('disabled');
                USE_GOLD = 1;
                $('#min_health').show();

            }
            else {
                $('#DI_mod_weapon').attr('disabled', 'disabled');
                USE_GOLD = 0;
                $('#min_health').hide();

            }
        })



        $('#DI_mod_weapon').change(function () {
            GOLD_TO_SPEND = parseFloat($('#DI_mod_weapon').val())
            //alert(GOLD_TO_SPEND);
        });

        $('#min_health').change(function () {
            MIN_FIGHTER_HEALTH = parseInt($('#min_health').val());
            //alert(MIN_FIGHTER_HEALTH )
        });

        $('#delay').change(function () {
            DELAY = parseInt($('#delay').val());
            //alert(DELAY)
        });

        $('#DI_weapon_Q1').live('change', function () {
            var val = $('#DI_weapon_Q1').attr('checked');
            GM_setValue('DI_weapon_Q1', val);
        });



        $('#DI_mod_weapon').live('keyup', function () {
            var val = parseInt($('#DI_mod_weapon').val());
            GM_setValue('DI_mod_weapon', val);
        });

        //$("#min_health").watch("display", function () { alert("changed") });

        unsafeWindow.$j("body").ajaxSuccess(function (e, res, opt) {
            getStatus();

            //alert(res.responseText)
            if (opt.url.indexOf('/buy-health') > -1) {

                //alert(unsafeWindow.$j('.food_btn').click())
                //alert('ok')

                var temp = eval("(" + res.responseText + ")");

                //alert(GOLD_TO_SPEND-0.1)
                GOLD_TO_SPEND = GOLD_TO_SPEND - 0.5
                $('#DI_mod_weapon').val(GOLD_TO_SPEND)




                if (temp.msg == 'success') {
                    if (CURRENT_HEALTH <= 90 && GOLD_TO_SPEND > 0) {
                        NINJA_PUNCH = 1;
                        fight();
                    }
                    /* else {
                        
                    eat_gold();
                    }*/
                }

            }



            if (opt.url.indexOf('/military/fight-shoot') != -1) {
                var k = eval("(" + res.responseText + ")");
                if (k.error && k.message == "SHOOT_LOCKOUT")
                    if (NINJA_PUNCH == 1)
                        setTimeout(function () { fight(); }, 800);
                    else
                        return;

                if (k.user.health > MIN_FIGHTER_HEALTH && NINJA_PUNCH == 1)
                    fight();

                else if (k.user.health <= MIN_FIGHTER_HEALTH && NINJA_PUNCH == 1) {
                    //alert('MIN_FIGHTER_HEALTH')
                    if ((($('#hospital_btn').hasClass('food_btn') && $('#hospital_btn').hasClass('disabled')) || HEALT_LIMIT == 0) && USE_GOLD == 1) { // we don't have any food, so buy it !!!
                        //alert('before eat gold')

                        eat_gold();
                    }
                    //else if ((($('#hospital_btn').hasClass('food_btn') && !$('#hospital_btn').hasClass('disabled')) || HEALT_LIMIT == 0) && USE_GOLD == 0) { add_damage(); }
                    else {
                        //alert('else')
                        NINJA_PUNCH = 0;
                        cevap();
                    }
                }


                //after fight :D
            } //end Fight
            else if (opt.url.indexOf('/eat?') != -1) {
                var eatRes = res.responseText;
                eatRes = eval(eatRes.substring(eatRes.indexOf('(')));


                if (NINJA_EAT == 1 && eatRes.has_food_in_inventory > 0 && CURRENT_HEALTH <= 90 && HEALT_LIMIT > 0)
                    eat();

                else if (NINJA_EAT == 1 && (CURRENT_HEALTH > 90 || HEALT_LIMIT == 0 || eatRes.has_food_in_inventory == 0)) {
                    NINJA_EAT = 0;
                    //add_damage();
                    if (USE_GOLD == 1 && (eatRes.has_food_in_inventory == 0 || HEALT_LIMIT == 0)) {
                        eat_gold();
                    }



                }
            }
        });

        if (unsafeWindow.SERVER_DATA.onlySpectator != 0)
            return false;



        
        getStatus();

        $('.beta_notice').remove();
        $('<a class="beta_notice" href="javascript: void(0);" title="Auto Fight & Eat"></a>').appendTo('#pvp');
        var fb = $('.beta_notice');

        fb.css('background', 'url(data:image/jpeg;base64,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) no-repeat');
        fb.css('display', 'block');
        fb.css('width', '100px');
        fb.css('height', '100px');

        fb.bind('click', function () {
            NINJA_PUNCH = 1;
            fight();
        });

       // $('.help_button').remove();

        $('<a id="ninjaEat" href="javascript: void(0);" title="Just Eat Food"></a>').appendTo('#pvp');
        var eb = $('#ninjaEat');
        eb.css('background', 'url(data:image/jpeg;base64,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) no-repeat');
        eb.css('display', 'block');
        eb.css('width', '50px');
        eb.css('height', '50px');
        eb.css('position', 'absolute');
        eb.css('left', '140px');
        eb.css('bottom', '45px');

        eb.bind('click', function () {
            cevap();
        });       



        $('#enemy_defeated').watch("display",
             function () {
                 //alert($(this).is(':visible'))
                 //if ($(this).is(':visible'))
                 unsafeWindow.$j('#add_damage_btn').click();
             },
             100, "_shadowMove");







    } // end je sad ovdje
}
// Start action :D
// =============================================================================
jQuery(document).ready(function () {
    main();
});

$.fn.watch = function (props, func, interval, id) {
    /// <summary>
    /// Allows you to monitor changes in a specific
    /// CSS property of an element by polling the value.
    /// when the value changes a function is called.
    /// The function called is called in the context
    /// of the selected element (ie. this)
    /// </summary>    
    /// <param name="prop" type="String">CSS Property to watch. If not specified (null) code is called on interval</param>    
    /// <param name="func" type="Function">
    /// Function called when the value has changed.
    /// </param>    
    /// <param name="func" type="Function">
    /// optional id that identifies this watch instance. Use if
    /// if you have multiple properties you're watching.
    /// </param>
    /// <param name="id" type="String">A unique ID that identifies this watch instance on this element</param>  
    /// <returns type="jQuery" /> 
    if (!interval)
        interval = 200;
    if (!id)
        id = "_watcher";

    return this.each(function () {
        var _t = this;
        var el = $(this);
        var fnc = function () { __watcher.call(_t, id) };
        var itId = null;

        if (typeof (this.onpropertychange) == "object")
            el.bind("propertychange." + id, fnc);
        else if ($.browser.mozilla)
            el.bind("DOMAttrModified." + id, fnc);
        else
            itId = setInterval(fnc, interval);

        var data = { id: itId,
            props: props.split(","),
            func: func,
            vals: []
        };
        $.each(data.props, function (i) { data.vals[i] = el.css(data.props[i]); });
        el.data(id, data);
    });

    function __watcher(id) {
        var el = $(this);
        var w = el.data(id);

        var changed = false;
        var i = 0;
        for (i; i < w.props.length; i++) {
            var newVal = el.css(w.props[i]);
            if (w.vals[i] != newVal) {
                w.vals[i] = newVal;
                changed = true;
                break;
            }
        }
        if (changed && w.func) {
            var _t = this;
            w.func.call(_t, w, i)
        }
    }
}
$.fn.unwatch = function (id) {
    this.each(function () {
        var w = $(this).data(id);
        var el = $(this);
        el.removeData();

        if (typeof (this.onpropertychange) == "object")
            el.unbind("propertychange." + id, fnc);
        else if ($.browser.mozilla)
            el.unbind("DOMAttrModified." + id, fnc);
        else
            clearInterval(w.id);
    });
    return this;
}
