// ==UserScript==
// @name            Hack Forums - Quick subscription (NO EMAIL)
// @namespace       Snorlax
// @description     Subscribe to a thread with the click of 1 button
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.0
// ==/UserScript==

var tid = $("input[name='tid']").val();

if($("a:contains('Unsubscribe from this thread')").length >= 2) {
    $('a:contains("Thread Options")').after(' - <a href="javascript:void(0);" class="smalltext"><strong>Remove subscription</strong></a>');
} else {
	$('a:contains("Thread Options")').after(' - <a href="javascript:void(0);" class="smalltext"><strong>Quick subscribe</strong></a>');
}

$("strong:contains('Quick subscribe')").click(function(){
    $.post("http://www.hackforums.net/usercp2.php",
    {
        "my_post_key": my_post_key,
        "action": "do_addsubscription",
        "tid": tid,
        "notification": "0",
        "submit": "Subscribe+to+Thread",
    },
        function(data,status){
        console.log("Data: " + data + "\nStatus: " + status);
		$("strong:contains('Quick subscribe')").text('Remove subscription')
        return false;
    });
});

$("strong:contains('Remove subscription')").click(function(){
	$.get("http://www.hackforums.net/usercp2.php?action=removesubscription&tid="+tid+"&my_post_key="+my_post_key+"", function(data,status) {
        console.log("Data: " + data + "\nStatus: " + status);
		$("strong:contains('Remove subscription')").text('Quick subscribe')
    });
});