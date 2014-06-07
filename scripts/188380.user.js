// ==UserScript==
// @name           Bing Enhancer
// @author         Carlton Kenney
// @description    Revamps Bing by removing ads, etc.
// @copyright      2013 by Carlton Kenney
// @version        1.0a
// @lastupdated    11/21/2013
// @include        *.bing.com/search*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//------------Declare Variables-----------//
var searchBox = '#sb_form_q';
var addNumbers=0;

//------------Style Changes-----------//
GM_addStyle('.result_number { font-size: 18px;}'
+ 'h2 {font-family: arial,sans-serif; font-size: medium; padding-bottom: 0px;}'
+ 'h2 strong {font-weight: bold; }'
+ '.b_attribution {padding-bottom: 5px;}'
);

//------------Hide Ads-----------//
$('#b_context, .b_ans').hide();

if(addNumbers) {
    $('.b_algo').each(function(i) {
        $('h2 > a',this).prepend('<span class="result_number">' + i + '. </span>')
    });
}

//------------Enable focus on search box using "f"-----------//
function KeyCheck(e) {
	if(e.keyCode == 70 && !$(searchBox).is(':focus') && !e.ctrlKey) {
	    e.preventDefault();
    	var value = $(searchBox).val();
    	$(searchBox).focus().val('').val(value);
	}
}
window.addEventListener('keydown', KeyCheck, true);
