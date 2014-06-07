// ==UserScript==
// @name           Gladiatus auto expedition
// @namespace      http://userscripts.org/users/janis187
// @description    runs expeditions automaticly. select target or turn it off.
// @author         janis187
// @version  	    1.1
// @include       *.gladiatus.*/game/index.php?mod=location&loc=*
// @include         *.gladiatus.*/game/index.php?mod=reports&submod=showCombatReport&*t=0*
// @require         	http://code.jquery.com/jquery-latest.js
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

var $ = jQuery.noConflict();

var getonoff = GM_getValue("gladiatus_exp_onoff");
var buttons = $(".expedition_button");

$(document).ready(function(){
    var expbutton = $('li.pngfix:eq(2)>a');

    if (buttons.length){
        select();
        var rubycheck = buttons.attr("onclick").match(/\d+/g);
        if(Number(rubycheck[2]) === 0){
            if (getonoff>0){
                setTimeout(function(){buttons.eq(getonoff-1).trigger('click');}, 3000);
            }
        }
    }
    else if (expbutton.length){
        if (getonoff>0){
            setTimeout(function(){window.location.href=expbutton.attr("href")}, 3000);
        }
    }

});

function select(){

    $("#blackoutDialogbuyBonus").before("<div style='background-color: #deb887;border: 3px solid #daa520;padding: 8px;'>"+
        "<select id='controler' ><option value='0'>OFF</option>" +
        "</select>"+
        "</div>");

    var ctrl = $("#controler");

    $.each(buttons,function(i){
        var title = $(".expedition_name").eq(i).text();
        ctrl.append("<option value='"+(i+1)+"'>"+title+"</option>");
    });

    if (!getonoff || buttons.length < getonoff){GM_setValue("gladiatus_exp_onoff",buttons.length)}
    else {ctrl[0].options[getonoff].selected = true}

    $(ctrl).change(function(){
        var i = this.value;
        GM_setValue("gladiatus_exp_onoff",i);
        window.location.reload();
    });
}