// ==UserScript==
// @name            Hack Forums Userbar Changer (all)
// @namespace       Snorlax
// @description     Changes your userbar with ease
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @include         *hackforums.net/showthread.php*
// @include         *hackforums.net/showgroups.php*
// @include         *hackforums.net/member.php?action=profile&uid=*
// @version         1.5
// ==/UserScript==

var str = $("#panel").find('a').attr('href');
var uid = str.replace(/[^0-9]/g, '')
if(GM_getValue("userbarChanger") != undefined){
    if(GM_getValue("userbarChanger") == "http://x.hackforums.net/images/blackreign/groupimages/english/red-lion.jpg"){
        if(window.location.href.indexOf(uid) > -1) {
            $(".trow1 > .largetext > strong:first > span").css("text-shadow","0px 2px 3px #000").css("color","white");
            $(".trow1 > .smalltext:first").find("img:first").replaceWith("<img src='"+GM_getValue('userbarChanger')+"'/>");
        }
        $('.largetext > a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"] > span').css("text-shadow","0px 2px 3px #000").css("color","white");
        $(".trow1 > .smalltext:first").find("img:not(:first)").attr("src","http://x.hackforums.net/images/blackreign/star.gif")
    }
    $('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author').find(".smalltext").find("img:last").attr("src",GM_getValue('userbarChanger'));
    $('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author').find(".smalltext").find("img:not(:last)").attr("src","http://x.hackforums.net/images/blackreign/star.gif");
    $('.largetext > a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"] > span').css("color","white");
}

if(window.location.href.indexOf("showgroups.php") > -1) {
    $(".trow1 img").addClass("userbarChanger");
    $(".userbarChanger").click(function(){
        ($(this).fadeTo('fast','0.2'));
        GM_setValue('userbarChanger', $(this).attr("src"));
    });
    $("strong:contains('Custom Forum Groups')").after(" - <a class='resetUserbar' style='color:white;cursor:pointer;'>Reset userbar</a> - <a class='customUserbar' style='color:white;cursor:pointer;'>Custom userbar (with URL)</a>");
    $(".resetUserbar").click(function(){
        GM_deleteValue('userbarChanger');
        $(this).text("Userbar has been reset");
    });
    $(".customUserbar").click(function(){
        var userbarChanger = prompt("Image URL", userbarChanger);
        GM_setValue('userbarChanger', userbarChanger);
        $(this).text("Custom userbar has been set");
    });
}