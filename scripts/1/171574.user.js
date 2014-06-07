// ==UserScript==
// @name            Hack Forums Award Whore v2
// @namespace       Snorlax
// @description     Adds awards to your profile
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @include         *hackforums.net/*
// @version         1.0.3
// ==/UserScript==

uid = $("#panel").find('a').attr('href').replace(/[^0-9]/g, '');
array = [];
if(GM_getValue("awards") != undefined) {
    array = JSON.parse(GM_getValue("awards"));
}
if(array == undefined){
    array = [];
}

if(GM_getValue("awards") != null){
    for (var i=0;i<array.length;i++){
        $('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author_info').append('<img src=' + array[i] + ' />');
    };
}

if(location.href == 'http://www.hackforums.net/myawards.php'){        
    $(".thead").append('<button style="float: right;" onclick="javascript:return false;" class="button reset">Reset awards</button>');
    $(".thead").append(" Displaying current awards: ");
    for (var i=0;i<array.length;i++){
        $(".thead").append('<img src=' + array[i] + ' />');
    };  
    
    $("td[class*='trow'] img").click(function(){
        $(this).fadeTo('fast','0.2');
        array.push($(this).attr("src"));
        GM_setValue("awards", JSON.stringify(array));
        console.log(array);
        console.log(GM_getValue("awards"));
    }); 
    
    $(".reset").on("click", function() {
        GM_deleteValue("awards");
        array = [];
        $(this).text("Awards has been reset");
        $this = $(this);
        interval = setInterval(function() {
            $this.text("Reset awards");
            clearInterval(interval);
        }, 5000);
    });
}