// ==UserScript==
// @name            Hack Forums - Hide IPs on profile
// @namespace       Snorlax
// @description     Hide and show the IPs from your profile (usercp.php) with a single click
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/usercp.php*
// @version         1.0
// ==/UserScript==

$('a').filter(function() {
	return $(this).text().match(/\d+\.\d+\.\d+\.\d+/);
}).addClass('ips').hide();


$('td:contains("These are your latest logins.")').append(' - <a style="cursor:pointer;color:white;" class="showIp">Show/hide the IPs</a>');

$(".showIp").click(function(){
    $('.ips').toggle();
});