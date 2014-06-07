// ==UserScript==
// @name            Hackforums Award whore FOR LEAKFORUMS 
// @namespace       BedsLF
// @description     Adds awards to your profile
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @include         http://leakforums.org*
// @include         http://www.Leakforums.org/*
// @version         1.0.2
// ==/UserScript==

var str = $("#panel").find('a').attr('href');
var uid = str.replace(/[^0-9]/g, '')

if($.cookie("") != null){
    var alt = $.cookie("alt").split(",");
    for (var i=1;i<alt.length;i++){
        $('a[href="http://www.Leakforums.org/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author_info').append('<img src=' + alt[i] + ' />');
    };
}

if(location.href == 'http://www.Leakforums.org/myawards.php'){      
    $("trow1 img").addalt('alt');
    $("trow2 img").addalt('alt');
    $(".thead").append(' - <button class="reset">Reset awards</button>');
    
    $(".alt").click(function(){
        ($(this).fadeTo('fast','0.2')); 
        $.cookie("alt",$.cookie("alt") + "," + $(this).attr('src'), {expires: 3650});   
    }); 
    
    $(".reset").click(function(){
        alert("Awards has been reset to default");
        $.cookie("alt", null, {expires: -1});
        document.location.reload(true);
    });
    
    $(".thead").append(' - Current awards: ')
    for (var i=1;i<alt.length;i++){
        $(".thead").append('<img src=' + alt[i] + ' />');
    }
}