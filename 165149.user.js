// ==UserScript==
// @name           Gladiatus auto quest
// @namespace      janis187
// @description    selects and completes arena quests!(defeat x opponents in..)
// @version  	    1.2
// @include        *.gladiatus.*/game/index.php?mod=quests*
// @require         	http://code.jquery.com/jquery-latest.js
// ==/UserScript==

( function($) {
    $.fn.or = function( fallbackSelector ) {
        return this.length ? this : $( fallbackSelector || 'body' );
    };
}( jQuery ));

var getonoff = GM_getValue("gladiatus_quest_onoff");

$('.pngfix.current').append("<input id='onoff' type='button' class='button' style='margin-left: 10px;' value='"+getonoff+"' name='onoff'/>");

$('#onoff').click(function(){
    var onoff =$(this).val();

    if ( onoff == 'off') {
        GM_setValue('gladiatus_quest_onoff', 'on');
        $(this).val('on');
    } else if ( onoff == 'on' ) {
        GM_setValue('gladiatus_quest_onoff', 'off');
        $(this).val('off');
    }
    else if ( onoff == 'undefined' ) {
        GM_setValue('gladiatus_quest_onoff', 'off');
        $(this).val('off');
    }

});

$(document).ready(function(){
    if (getonoff =='on'){
        var gameid = $(".quest_slot_icon:first").attr("style").match(/\d+/);
        var selector1='.contentboard_slot.contentboard_slot_inactive>.quest_slot_icon[style="background-image:url('+gameid+'/img/ui/quest/icon_combat_inactive.jpg)"]~.quest_slot_button.quest_slot_button_accept:first';
        var selector2='.contentboard_slot.contentboard_slot_inactive>.quest_slot_icon[style="background-image:url('+gameid+'/img/ui/quest/icon_arena_inactive.jpg)"]~.quest_slot_button.quest_slot_button_accept:first';
        var selector3='.contentboard_slot.contentboard_slot_inactive>.quest_slot_icon[style="background-image:url('+gameid+'/img/ui/quest/icon_grouparena_inactive.jpg)"]~.quest_slot_button.quest_slot_button_accept:first';
        var combiner=$(selector1).or(selector2).or(selector3);
        var done=$('.quest_slot_button.quest_slot_button_finish:first');
        var rr=$('.quest_slot_button.quest_slot_button_restart:first');
        var rld=$('.pngfix.current');
        var active=$(".contentboard_slot.contentboard_slot_active");
        var button=$("#quest_footer_reroll>.button1:not('.disabled')");

        if (combiner.length){window.location.href=$(combiner).attr("href")}
        else if (done.length){window.location.href=$(done).attr("href")}
        else if (rr.length){window.location.href=$(rr).attr("href")}
        else if (active.length<5 && button.length){$(button).trigger("click")}
        setTimeout(function(){window.location.href=rld.attr("href")},1000*61*6);
    }
});


