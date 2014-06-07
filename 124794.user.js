// ==UserScript==
// @name           Test
// @namespace      test
// @require			http://code.jquery.com/jquery-1.3.2.min.js
// @include        *skybyen.no*
// ==/UserScript==




$.get('http://skybyen.no/65811', function(data) {
	$('#skybyen-mainsite-fullwrap').html(data);
});

$(document).ready(function(){

});
