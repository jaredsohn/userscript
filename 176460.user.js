// ==UserScript==
// @name            Leak Forums Award Whore
// @namespace       Snorlax & Hayashi
// @description     Adds awards to your profile
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @include         http://leakforums.org/*
// @include         http://leakforums.org/*
// @version         1.0.0
// ==/UserScript==
 
var str = $("#panel").find('a').attr('href');
var uid = str.replace(/[^0-9]/g, '')
 
if($.cookie("awards") != null){
    var awards = $.cookie("awards").split(",");
    for (var i=1;i<awards.length;i++){
        $('a[href="http://www.leakforums.org/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author_info').append('<img src=' + awards[i] + ' />');
    }
}
 
if(location.href == 'http://www.leakforums.org/myawards.php'){      
    $("td.trow1 img").addClass('awards');
    $("td.trow2 img").addClass('awards');
    $(".thead").append(' - <button class="reset">Reset Awards</button>');
   
    $(".awards").click(function(){
        ($(this).fadeTo('fast','0.2'));
        $.cookie("awards",$.cookie("awards") + "," + $(this).attr('src'), {expires: 3650});  
    });
   
    $(".reset").click(function(){
        alert("Awards has been reset.");
        $.cookie("awards", null, {expires: -1});
        document.location.reload(true);
    });
   
    $(".thead").append(' - Current awards: ')
    for (var i=1;i<awards.length;i++){
        $(".thead").append('<img src=' + awards[i] + ' />');
    }
}