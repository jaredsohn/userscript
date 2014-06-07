// ==UserScript==
// @name            Hack Forums - Quick subscription (EMAIL)
// @namespace       Snorlax
// @description     Subscribe to a thread with the click of 1 button
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.0
// ==/UserScript==

var str = $(location).attr('href');
var tid = str.replace(/[^0-9]/g, '')

$('a:contains("Thread Options")').after(' - <a class="quicksub" style="font-size:11px;cursor:pointer;font-weight:bold;color:white;">Quick subscribe</a>');

$(".quicksub").click(function(){
    $.post("http://www.hackforums.net/usercp2.php",
    {
        "my_post_key": my_post_key,
        "action": "do_addsubscription",
        "tid": tid,
        "notification": "1",
        "submit": "Subscribe+to+Thread",
    },
        function(data,status){
        console.log("Data: " + data + "\nStatus: " + status);
		$(".quicksub").text('Subscribed!')
    });
});