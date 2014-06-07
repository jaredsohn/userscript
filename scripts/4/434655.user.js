// ==UserScript==
// @name        Marmeko
// @namespace   marmeko
// @version     0.7.12
// @description Small Grepolis addition.
// @include     http://*.grepolis.com/game*
// @include     http://*forum.*.grepolis.com/*.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @icon        http://marmeko.marekblomkvist.com/cdn/icon.png
// @iconURL     http://marmeko.marekblomkvist.com/cdn/icon.png
// @copyright   2014 Maltokor
// ==/UserScript==


//http://de44.grepolis.com/cache/js/libs/jquery-1.10.2.min.js

/*******************************************************************************************************************************
 * Global stuff
 *******************************************************************************************************************************/
var uw = unsafeWindow || window, data; // data??

var $ = uw.jQuery || jQuery; // (Game || Forum)
// Game values
var LID = "en", WID = "", AID = 0, PID  = 0;
if(uw.location.pathname === "/game/index"){
    LID = uw.Game.locale_lang.split("_")[0];
    WID = uw.Game.world_id;
    AID = uw.Game.alliance_id;
    PID = uw.Game.player_id;
}

/*******************************************************************************************************************************
 * Defensive form
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Adds a defensive form to the bbcode bar
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

function addForm(e){
    var textareaId = "", bbcodeBarId = "";
    
    switch (e) {
        case "/alliance_forum/forum": 
            textareaId = "#forum_post_textarea";
            bbcodeBarId = "#forum";
            break;
        case "/message/forward":
            textareaId = "#message_message";
            bbcodeBarId = "#message_bbcodes";
            break;
        case "/message/new":
            textareaId = "#message_new_message";
            bbcodeBarId = "#message_bbcodes";
            break;
        case "/message/view":
            textareaId = "#message_reply_message";
            bbcodeBarId = "#message_bbcodes";
            break;
        case "/player_memo/load_memo_content":
            textareaId = "#memo_text_area";
            bbcodeBarId = "#memo_edit";
            break;   
    }
    
    $('<a title="Marmeko" href="#" class="marmeko_bbcode_option def_form" name="def_form"></a>').appendTo(bbcodeBarId + ' .bb_button_wrapper');
    
    $('.def_form_button').css({
        cursor: 'pointer',
        marginTop:'3px'
    });
    
    $(bbcodeBarId + ' .marmeko_bbcode_option').css({
        background: 'url("http://s14.directupload.net/images/140126/lt3hyb8j.png")',
        display: 'block',
        float: 'left',
        width: '22px',
        height: '23px',
        margin: '0 3px 0 0',
        position: 'relative',
    });
    $(bbcodeBarId + ' .def_form').css({
        backgroundPosition: '-89px 0px'
    });
    var imgArray = { 
        wall:   'http://de.cdn.grepolis.com/images/game/main/wall.png',
        tower:  'http://de.cdn.grepolis.com/images/game/main/tower.png',
        hide:   'http://de.cdn.grepolis.com/images/game/main/hide.png',
        
        spy:    'http://s7.directupload.net/images/140114/yr993xwc.png',
        pop:    'http://s7.directupload.net/images/140114/4d6xktxm.png',
        
        rev1:   'http://s7.directupload.net/images/140115/9cv6otiu.png',
        rev0:   'http://s7.directupload.net/images/140115/aue4rg6i.png',
        eo1:    'http://s1.directupload.net/images/140115/fkzlipyh.png',
        eo0:    'http://s1.directupload.net/images/140115/hs2kg59c.png',
        att:    'http://s1.directupload.net/images/140115/3t6uy4te.png',
        sup:    'http://s7.directupload.net/images/140115/ty6szerx.png',
        
        zeus:       'http://s1.directupload.net/images/140114/cdxecrpu.png',
        hera:       'http://s1.directupload.net/images/140114/mve54v2o.png',
        athena:     'http://s14.directupload.net/images/140114/kyqyedhe.png',
        poseidon:   'http://s7.directupload.net/images/140114/tusr9oyi.png',
        hades:      'http://s7.directupload.net/images/140114/huins2gn.png',
        artemis:    'http://s7.directupload.net/images/140114/kghjhko8.png',
        nogod:      'http://s1.directupload.net/images/140114/e7vmvfap.png',
        
        captain:    'http://s14.directupload.net/images/140114/88gg75rc.png',
        commander:  'http://s14.directupload.net/images/140114/slbst52o.png',
        priest:     'http://s1.directupload.net/images/140114/glptekkx.png',
        
        phalanx:    'http://s7.directupload.net/images/140114/e97wby6z.png',
        ram:        'http://s7.directupload.net/images/140114/s854ds3w.png',
        
        militia:    'http://wiki.en.grepolis.com/images/9/9b/Militia_40x40.png',
        sword:      'http://wiki.en.grepolis.com/images/9/9c/Sword_40x40.png',
        slinger:    'http://wiki.en.grepolis.com/images/d/dc/Slinger_40x40.png',
        archer:     'http://wiki.en.grepolis.com/images/1/1a/Archer_40x40.png',
        hoplite:    'http://wiki.en.grepolis.com/images/b/bd/Hoplite_40x40.png',
        rider:      'http://wiki.en.grepolis.com/images/e/e9/Rider_40x40.png',
        chariot:    'http://wiki.en.grepolis.com/images/b/b8/Chariot_40x40.png',
        catapult:   'http://wiki.en.grepolis.com/images/f/f0/Catapult_40x40.png',
        godsent:    'http://wiki.de.grepolis.com/images/6/6e/Grepolis_Wiki_225.png',
        
        def_sum:    'http://s14.directupload.net/images/140127/6cxnis9r.png',
        
        minotaur:   'http://wiki.de.grepolis.com/images/7/70/Minotaur_40x40.png',
        manticore:  'http://wiki.de.grepolis.com/images/5/5e/Manticore_40x40.png',
        zyclop:     'http://wiki.de.grepolis.com/images/6/66/Zyklop_40x40.png',
        sea_monster:'http://wiki.de.grepolis.com/images/7/70/Sea_monster_40x40.png',
        harpy:      'http://wiki.de.grepolis.com/images/8/80/Harpy_40x40.png',
        medusa:     'http://wiki.de.grepolis.com/images/d/db/Medusa_40x40.png',
        centaur:    'http://wiki.de.grepolis.com/images/5/53/Centaur_40x40.png',
        pegasus:    'http://wiki.de.grepolis.com/images/5/54/Pegasus_40x40.png',
        cerberus:   'http://wiki.de.grepolis.com/images/6/67/Zerberus_40x40.png',
        fury:       'http://wiki.de.grepolis.com/images/6/67/Erinys_40x40.png',
        griffin:    'http://wiki.de.grepolis.com/images/d/d1/Unit_greif.png',
        calydonian_boar:    'http://wiki.de.grepolis.com/images/9/93/Unit_eber.png',
        
        big_transporter:    'http://wiki.en.grepolis.com/images/0/04/Big_transporter_40x40.png',
        bireme:             'http://wiki.en.grepolis.com/images/4/44/Bireme_40x40.png',
        attack_ship:        'http://wiki.en.grepolis.com/images/e/e6/Attack_ship_40x40.png',
        demolition_ship:    'http://wiki.en.grepolis.com/images/e/ec/Demolition_ship_40x40.png',
        small_transporter:  'http://wiki.en.grepolis.com/images/8/85/Small_transporter_40x40.png',
        trireme:            'http://wiki.en.grepolis.com/images/a/ad/Trireme_40x40.png',
        colonize_ship:      'http://wiki.en.grepolis.com/images/d/d1/Colonize_ship_40x40.png',
        
        move_icon:  'http://de.cdn.grepolis.com/images/game/unit_overview/',
        
        bordure: 'http://marmeko.marekblomkvist.com/cdn/header.png'
    };
    
    $('<div class="bb_def_chooser">'+
      '<div class="bbcode_box middle_center">'+
      '<div class="bbcode_box top_left"></div><div class="bbcode_box top_right"></div>'+
      '<div class="bbcode_box top_center"></div><div class="bbcode_box bottom_center"></div>'+
      '<div class="bbcode_box bottom_right"></div><div class="bbcode_box bottom_left"></div>'+
      '<div class="bbcode_box middle_left"></div><div class="bbcode_box middle_right"></div>'+
      '<div class="bbcode_box content clearfix" style="padding:5px">'+
      '<div id="f_uni" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">Detailed Landunits</div></div><br><br>'+
      '<div id="f_prm" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">Premium</div></div><br><br>'+
      '<div id="f_sil" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">Silver</div></div><br><br>'+
      '<div><a class="button" id="marmeko_insert" href="#"><span class="left"><span class="right"><span class="middle"><small>Insert</small></span></span></span><span></span></a></div>'+
      '</div></div></div>').appendTo(bbcodeBarId + ' .bb_button_wrapper');
    
    $('.bb_def_chooser').css({
        display: 'none',
        top: '38px',
        left: '510px',
        position: 'absolute',
        width: '190px',
        zIndex: 10000
    });
    
    $(bbcodeBarId + " .bb_def_chooser .checkbox_new").click(function () {
        $(this).toggleClass("checked");
    });
    
    $(bbcodeBarId + ' .def_form').toggle(function(){
        $(this).parent().find(".bb_def_chooser").get(0).style.display = "block";
    }, function(){
        $(this).parent().find(".bb_def_chooser").get(0).style.display = "none";
    });
    
    $(bbcodeBarId + ' #marmeko_insert').click(function(){
        var textarea = $(textareaId).get(0), text = $(textarea).val(), troop_table = "", troop_img = "", troop_count = "", separator = "", move_table = "", landunit_sum = 0;
        
        $('.def_form').get(0).click();
        
        if($('#f_uni').hasClass("checked")){
            $('.units_land .unit, .units_naval .unit').each(function(){
                troop_img   += separator + '[img]'      + imgArray[this.className.split(" ")[1]]    + '[/img]';
                troop_count += separator + '[center][font=monospace]'   + $(this).find(".value").get(0).innerHTML   + '[/font][/center]';
                separator = "[||]";
            });
        } else {
            $('.units_land .unit').each(function(){
                var a = this.className.split(" ")[1], def = (unitVal[a].def_hack + unitVal[a].def_pierce + unitVal[a].def_distance)/(3 * unitVal[a].population);
                if(def > 10){
                    landunit_sum += parseInt($(this).find(".value").get(0).innerHTML, 10) * unitVal[a].population * ((def > 20) ? 2 : 1); 
                }
            });
            landunit_sum = (landunit_sum > 10000) ? ((Math.round(landunit_sum / 100))/10) + "k" : landunit_sum;
            
            troop_img   += '[img]'+ imgArray.def_sum +'[/img]';
            troop_count += '[center]'+ landunit_sum +'[/center]';
            separator = "[||]";
            $('.units_naval .unit').each(function(){
                troop_img   += separator + '[img]'      + imgArray[this.className.split(" ")[1]]    + '[/img]';
                troop_count += separator + '[center][font=monospace]'   + $(this).find(".value").get(0).innerHTML   + '[/font][/center]';
            });
        }
        if(troop_img !== ""){ troop_table = "\n[table][**]" + troop_img + "[/**][**]" + troop_count + "[/**][/table]\n"; }
        
        var str = '[img]'+ imgArray.bordure + '[/img]' +
            '\n\n[font=serif][size=11][town]' + uw.ITowns.getTown(uw.Game.townId).getId() + '[/town] ([player]'+ uw.Game.player_name +'[/player])[/size][/font]'+
            '[img]'+ imgArray.bordure + '[/img]' +
            '\n\n[font=monospace]Informationen zur Stadt:[/font]' + troop_table +
            '[table][*]'+
            '[img]'+ imgArray.wall      +'[/img][|]\n'+
            '[img]'+ imgArray.tower     +'[/img][|]\n'+
            '[img]'+ imgArray.phalanx   +'[/img][|]\n'+
            '[img]'+ imgArray.ram       +'[/img][|]\n'+
            ($('#f_prm').hasClass("checked") ? '[img]'+ imgArray.commander  +'[/img][|]\n' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[img]'+ imgArray.captain    +'[/img][|]\n' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[img]'+ imgArray.priest +'[/img][|]\n' : ' ')+
            ($('#f_sil').hasClass("checked") ? '[center][img]'+imgArray.spy+'[/img][/center][|]\n' : ' ')+
            '[img]'+ imgArray.pop       +'[/img][|]\n'+
            '[img]'+ imgArray[(uw.ITowns.getTown(uw.Game.townId).god() || "nogod")] +'[/img][/*]\n'+
            '[**][center][font=monospace]' + uw.ITowns.getTown(uw.Game.townId).buildings().getBuildingLevel("wall")+ '[/font][/center][||]'+
            '[center][font=monospace]' + uw.ITowns.getTown(uw.Game.townId).buildings().getBuildingLevel("tower")+ '[/font][/center][||]'+
            '[center][font=monospace]' + (uw.ITowns.getTown(uw.Game.townId).researches().attributes.phalanx? '+' : '-') + '[/font][/center][||]'+
            '[center][font=monospace]' + (uw.ITowns.getTown(uw.Game.townId).researches().attributes.ram? '+' : '-')+ '[/font][/center][||]'+
            ($('#f_prm').hasClass("checked") ? '[center][font=monospace]' + ((uw.Game.premium_features.commander >= uw.Timestamp.now())? '+' : '-') + '[/font][/center][||]' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[center][font=monospace]' + ((uw.Game.premium_features.captain >= uw.Timestamp.now())? '+' : '-')+ '[/font][/center][||]' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[center][font=monospace]' + ((uw.Game.premium_features.priest >= uw.Timestamp.now())? '+' : '-') + '[/font][/center][||]' : ' ')+
            ($('#f_sil').hasClass("checked") ? '[center][font=monospace]' + Math.round(uw.ITowns.getTown(uw.Game.townId).getEspionageStorage()/1000) + 'k[/font][/center][||]': ' ')+
            '[center][font=monospace]' + uw.ITowns.getTown(uw.Game.townId).getAvailablePopulation() + '[/font][/center][||]'+
            '[center][font=monospace]' + $('.gods_favor_amount').get(0).innerHTML + '[/font][/center]'+
            '[/**][/table]';
        
        var bb_count_str = parseInt(str.match(/\[/g).length, 10), bb_count_move = 0;
        
        str += '[img]'+ imgArray.bordure + '[/img]';
        
        $(textarea).val(text.substring(0, $(textarea).get(0).selectionStart) + str + text.substring($(textarea).get(0).selectionEnd));
    });
}

function getArrivalTime(duration_time){
    var server_time = $('.server_time_area').get(0).innerHTML.split(" ")[0].split(":"), arrival_time, s, m, h;
    duration_time = duration_time.split(":");
    
    s = parseInt(server_time[2], 10) + parseInt(duration_time[2], 10);
    m = parseInt(server_time[1], 10) + parseInt(duration_time[1], 10) + ((s>=60)? 1 : 0);
    h = parseInt(server_time[0], 10) + parseInt(duration_time[0], 10) + ((m>=60)? 1 : 0);
    
    s = s%60; m = m%60; h = h%24;
    
    s = ((s<10) ? "0" : "") + s;
    m = ((m<10) ? "0" : "") + m;
    h = ((h<10) ? "0" : "") + h;
    
    arrival_time = h + ":" + m + ":" + s;
    
    return arrival_time;
}

var ch = ["BHEEABI", "BGIDEIB", "FBADAF", "BHDGBAC", "IGCCJB"], alpha = 'ABCDEFGHIJK', exc = false, pA = PID.toString(), pB = "", sum = 0; //BAEHGJ

for(var c in pA){ if(pA.hasOwnProperty(c)){ pB += alpha[pA[parseInt(c, 10)]];}}

/*******************************************************************************************************************************
 *  HTTP-Requests
 *******************************************************************************************************************************/
if(uw.location.pathname === "/game/index"){
    $(document).ajaxComplete(function (e, xhr, opt) {
        var url = opt.url.split("?"), action = url[0].substr(5) + "/" + url[1].split(/&/)[1].substr(7);
        //console.log(action);
        //if((ch.length == 5) && exc && (sum == 118)){
            console.log('Jah');
            switch (action) {  
                case "/alliance_forum/forum": case "/message/new": case "/message/forward": case "/message/view": case "/player_memo/load_memo_content":
                    addForm(action);
                    break;
            }   
        //}
    });
}