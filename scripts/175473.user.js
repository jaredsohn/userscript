// ==UserScript==
// @author          Akshay
// @name            iVote
// @namespace       iVote
// @description     IVote New Order Notifier
// @version         1.1.0 
// @match           http://www.erepublik.com/*
// @match           https://www.erepublik.com/*
// @include         http://www.erepublik.com/*
// @include         https://www.erepublik.com/*
// @exclude         http://www.erepublik.com/*/*
// @exclude         https://www.erepublik.com/*/*
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
    $('#content').prepend('<div id="ivote_orders"></div><div style="clear:both;"></div>');
    load_orders();
}

function load_orders() {
    console.log('Loading blocks ...');
    GM_xmlhttpRequest({
        method  : 'GET',
        url : 'http://ivoters.tk/id/' + parseFloat(unsafeWindow.flc.getVariable("citizen_id")),
        onload : function(data) {
        	if (data.responseText) {
        		var response = jQuery.parseJSON(data.responseText);
        		$('#ivote_orders').html(response.main);
        		if(response.js == "true"){
        			var go = confirm("A new order Available on iVote! \n Do you want to procced to iVote ?");
        			if(go == true)
        				window.location.href = response.site_link;
    			}
    		}else
            	$('#ivote_orders').html("Error Parsing");
		}
	});
}