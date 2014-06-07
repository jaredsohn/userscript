// ==UserScript==
// @name           ESL PL Admin Helper
// @include        http://www.esl.eu/pl/lol/go4lol/*/*/admin_exceptions/add/*/
// @exclude        view-source://*
// @version        1.1
// @copyright      yetj
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// ==/UserScript==

void(function(){

jQuery('[name="admindescription"]').after('<br /><a href="#" class="opti" id="mg" onclick="return false;">Missing Gameaccount</a><br />\
<a href="#" class="opti" id="wg" onclick="return false;">Wrong Gameaccount</a><br />\
<a href="#" class="opti" id="pnitp" onclick="return false;">Player does not belong to team Player</a><br />\
<a href="#" class="opti" id="pnitt" onclick="return false;">Player does not belong to team Team</a><br />\
<a href="#" class="opti" id="pna" onclick="return false;">Player has non registered ESL account</a><br />\
<a href="#" class="opti" id="freerot" onclick="return false;">Champion not from free rotation</a><br />');

jQuery('.opti').bind("click", function(e) {
	x = jQuery(this).attr('id');
    jQuery('[name="admindescription"]').height(100);
    jQuery('[name="admindescription"]').width(400);
    if(x == 'mg'){
        jQuery('[name="admindescription"]').text("Penalty Points: 1\nReason: Missing gameaccount\nLink: \n"+ESLuserName+" ["+ESLuserID+":5571 - LoL]"); 
        jQuery('[name="points"]').val('1');
        jQuery('[name="exception_other"]').val('Missing gameaccount');
    }
    if(x == 'wg'){
        jQuery('[name="admindescription"]').text("Penalty Points: 1\nReason: Wrong gameaccount\nLink: \n"+ESLuserName+" ["+ESLuserID+":5571 - LoL]"); 
        jQuery('[name="points"]').val('1');
        jQuery('[name="exception_other"]').val('Wrong gameaccount');
    }
    if(x == 'pnitp'){
        jQuery('[name="admindescription"]').text("Penalty Points: 3\nReason: Player does not belong to team\nLink: \n"+ESLuserName+" ["+ESLuserID+":5571 - LoL]"); 
        jQuery('[name="points"]').val('3');
        jQuery('[name="exception_other"]').val('Player does not belong to team');
    }
    if(x == 'pnitt'){
        jQuery('[name="admindescription"]').text("Penalty Points: 2\nReason: Player does not belong to team\nLink: \n"+ESLuserName+" ["+ESLuserID+":5571 - LoL]"); 
        jQuery('[name="points"]').val('2');
        jQuery('[name="exception_other"]').val('Player does not belong to team');
    }

    if(x == 'pna'){
        jQuery('[name="admindescription"]').text("Penalty Points: 2\nReason: Player has non registered ESL account\nLink: \n"+ESLuserName+" ["+ESLuserID+":5571 - LoL]"); 
        jQuery('[name="points"]').val('2');
        jQuery('[name="exception_other"]').val('Player has non registered ESL account');
    }
    if(x == 'freerot'){
        jQuery('[name="admindescription"]').text("Penalty Points: 1\nReason: Champion not from free rotation\nLink: \n"+ESLuserName+" ["+ESLuserID+":5571 - LoL]"); 
        jQuery('[name="points"]').val('1');
        jQuery('[name="exception_other"]').val('Champion not from free rotation');
    }
});

})();