// ==UserScript==
// @name       Torna su navbar inforge
// @namespace  http://www.inforge.net/community/
// @version    0.1
// @description  Inserisce un torna su nella navbar
// @match http://inforge.net/community/*
// @match http://www.inforge.net/community/*
// @require https://code.jquery.com/jquery-latest.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js
// @copyright  2014, Sharu
// ==/UserScript==

function main () {
    $("#navtabs").append('<li><a href="#" class="backtotop" title="Cima" id="Torna_su_Sharu" style="display:none;" onclick="return false;"><span class="backtotop">');  
	
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
               
            $('#Torna_su_Sharu').fadeIn();     
        } else {
                        
            $('#Torna_su_Sharu').fadeOut();
        }
    });
    
    
    $('#Torna_su_Sharu').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
}

main();

