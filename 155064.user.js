// ==UserScript==
// @name       tehODbot
// @namespace  
// @version    0.2
// @description  GG OD
// @match      http://m.odnoklassniki.ru/dk?st.cmd=usersOnline*
// @copyright  2012+, tehKost
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

var total = 0;
var i = 0;
$(document).ready(function(){
    $(document.body).prepend($("<div>").attr('id', 'tehSTATUS'));
    $("div#tehSTATUS").html("Total guests: " + total);
    for (var i = 0; i < 20; i++) {
       $(document.body).append($("<div>").attr('id', 'tehDIV'+i)); 
    }    
      
    fetch();
}); 

function fetch() {    
    if (i < 20) {           
        var link;
        $('.sclnk').each(function(index){   
            if (index == i){
                link = $(this).attr('href');
            }
        });
        $.ajax({
            url: link,
            success: function(result) {
                $("div#tehDIV"+i).html(result);
                var likelink = $("div#tehDIV"+i+" .lklnk").attr('href');
                if (likelink && total%2==0) { 
                    $("div#tehDIV"+i+" .lklnk").load(likelink);
                }
            },
            async:   false
        });  
        total++;
        i++;
        $("div#tehSTATUS").html("Total guests: " + total); 
        setTimeout(arguments.callee, 10000);
    } else {
        i = 0;
        var refreshLink = $('div.pnl2B div.acln.act a.ai.alnk').attr('href');
        if (refreshLink == null){
        	refreshLink = $('div.wrapper.portal a.ldm.ldmb').attr('href');
        }
        $("div#tehSTATUS").html("Total guests: " + total);        
        //console.log(refreshLink);s
        $('div.wrapper.portal').load(refreshLink);
        var timeshift = 0;
        if (total%240 == 0){
            window.close();
            timeshift = 1200000;
        }
        else if (total%80 == 0){
            timeshift = 600000;
        }
        else if (total%40 == 0){
            timeshift = 60000;
        }
        else{
            timeshift = 20000;
        }
        setTimeout(arguments.callee, timeshift);
    } 
}
