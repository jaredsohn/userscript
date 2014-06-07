// ==UserScript==
// @name            VHF Award Whore
// @namespace       Dolan Duck
// @description     Adds awards to your profile
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @include         http://viphackforums.net/*
// @include         http://www.viphackforums.net/*
// @version         1.0
// ==/UserScript==

var str = $("#panel").find('a').attr('href');
var uid = str.replace(/[^0-9]/g, '')

if($.cookie("awards") != null){
    var awards = $.cookie("awards").split(",");
    for (var i=1;i<awards.length;i++){
        $('a[href="http://www.viphackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author_info').append('<img src=' + awards[i] + ' />');
    };
}

if(location.href == 'http://www.viphackforums.net/myawards.php'){      
    $("td.trow1 img").addClass('awards');
    $("td.trow2 img").addClass('awards');
    $(".thead").append(' - <button class="reset">Reset awards</button>');
    
    $(".awards").click(function(){
        ($(this).fadeTo('fast','0.2')); 
        $.cookie("awards",$.cookie("awards") + "," + $(this).attr('src'), {expires: 3650});   
    }); 
    
    $(".reset").click(function(){
        alert("Awards has been reset to default");
        $.cookie("awards", null, {expires: -1});
        document.location.reload(true);
    });
    
    $(".thead").append(' - Current awards: ')
    for (var i=1;i<awards.length;i++){
        $(".thead").append('<img src=' + awards[i] + ' />');
    }
}