// ==UserScript==
// @name        Automatically select the last set from weheartit.com
// @version     1.0
// @include     https://weheartit.com/heart-it/new_entry*
// @require	http://code.jquery.com/jquery-latest.min.js
// @author      Jarai Csaba
// ==/UserScript==

if(!(localStorage.lastSet == undefined)){
	$('select[name=set]').val(localStorage.lastSet);
}

$('form#create-entry-form').submit(function(){localStorage.lastSet = $('select[name=set]').val();});