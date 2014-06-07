// ==UserScript==
// @author          HSR
// @name            ZC
// @namespace       ZC
// @description     Zionist Crusaders
// @version         1.0.0 
// @match           http://www.erepublik.com/en
// @match           https://www.erepublik.com/en
// @include         http://www.erepublik.com/en
// @include         https://www.erepublik.com/en
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function init() {
    console.log('Checking for jQuery ...');
    if (typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(announce_loading, 100); 
        return false;
    } else {
        load_script();
    }
    return true;
}

init();

function load_script() {
    console.log('Loading script ...');
    if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }
    $('#content').prepend('<div id="orders"></div><div style="clear:both;"></div>');
    load_orders();
}

function load_orders() {
    console.log('Loading blocks ...');
    GM_xmlhttpRequest({
        method  : 'Get',
        url : 'http://erepublik.hsrco.net/zc/orders/id/' + parseFloat(unsafeWindow.flc.getVariable("citizen_id")),
        onload : function(data) {
        	if (data.responseText) {
        		var response = jQuery.parseJSON(data.responseText);
        		$('#orders').html(response.main);
        		if(response.js == "true"){
        			var go = confirm("A Joint Strike Is Available!\nDo you want to go to the battle field?");
        			if(go == true)
        				window.location.href = response.battle_link;
    			}
    		}else
            	$('#orders').html("Error Parsing");
		}
	});
}