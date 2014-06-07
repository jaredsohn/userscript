// ==UserScript==
// @name           Gladiatus Healer
// @namespace      http://userscripts.org/users/janis187
// @description    heals you when your hp is below 50% (uses first found food in your bag)
// @author         janis187
// @version  	    1.1
// @include       *.gladiatus.*/game/index.php?mod=overview*
// @exclude       /buddylist/
// @exclude       /achievements/
// @exclude       /stats/
// @require         	http://code.jquery.com/jquery-latest.js
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

var $ = jQuery.noConflict();

// change line below if you like it to heal at another hp %
var healBelow = 50;


var getonoff = GM_getValue("gladiatus_healer_onoff");
$('.pngfix.current').append("<input id='onoff' type='button' class='button' style='margin-left: 10px;' value='"+getonoff+"' name='onoff'>");

$('#onoff').click(function(){
    var onoff =$(this).val();

    if ( onoff == 'off') {
        GM_setValue('gladiatus_healer_onoff', 'on');
        $(this).val('on');
    } else if ( onoff == 'on' ) {
        GM_setValue('gladiatus_healer_onoff', 'off');
        $(this).val('off');
    }
    else if ( onoff == 'undefined' ) {
        GM_setValue('gladiatus_healer_onoff', 'off');
        $(this).val('off');
    }

});

var hash= window.location.href.replace(/.+sh=/,"");
var db = [];

$(document).ready(function(){
    if(getonoff == "on"){
        var check = $("#char_leben");
        var hp = parseInt(check.text());
        if (check.length){
            getGealingItems();
            if (hp < healBelow){
                if (db.length){
                    eat(db[0],hash);
                    setTimeout(function(){window.location.reload()},1000*3);
                }
            }
            setTimeout(function(){window.location.reload()},1000*60);
        }
    }
});

function getGealingItems(){
    var items = $("#inv").find("div");
    items.each(function(){
        var id = $(this).attr("id");
        var tooltip = $("#tOoLtIp_"+id).text().match(/:.*\s\d+\s.*:.*\d+/);
        if (tooltip){db.push(id)}
    });
}

function eat(ID,HASH){
    var t = new Date(), a = t.getTime();
    $.ajax({
        url: "/game/ajax.php?mod=overview&submod=useItem&item="+ID+"&doll=1&a="+a+"&sh="+HASH,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {}
    });
    db.shift();
}
