// ==UserScript==
// @name            Hack Forums Highlight line on group management
// @namespace       Snorlax
// @description     Highlights the line when you select someone on the managegroup.php page
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/managegroup.php?gid=*
// @version         1.0.1
// ==/UserScript==

$('.tborder input:checkbox').live('change', function(){
    if($(this).is(':checked')){
        $(this).parent().siblings().andSelf().css("background","#242424");
    } else {
        $(this).parent().siblings().andSelf().css("background","");
    }
});

$('.tborder input:checkbox').each(function() {
    username = $(this).parent().siblings().first().find("span").text();
    $(this).attr("title", username)
});