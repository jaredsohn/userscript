// ==UserScript==
// @name            Hack Forums Reputation page fix
// @namespace       Snorlax
// @description     Changes back to regular reputation page
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/reputation.php?uid=*
// @version         1.0
// ==/UserScript==

$('.repvoteright:parent').each(function () {
    $(this).contents().last().before(" ");
    $(this).insertBefore($(this).prev('.repvoteleft'));
    $(this).find("br").remove().append(" ");
    $(this).next(".repvoteleft").after("<br />");
});

$(".repvote li").removeClass("repvoteright repvoteleft");
$(".repvote").css("color","white");
$("span[class*='reputation_']").css("font-weight","bold");