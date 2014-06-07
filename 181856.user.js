

// ==UserScript==
// @name           Mp's
// @namespace      Mp's
// @description	   affiche un message lorsque vous recevez un mp.


// @include        http://www.jeuxvideo.com/messages-prives/*
// @include        http://www.jeuxvideo.com/js/*
// @include        http://code.jquery.com/jquery-1.7.2.js



// @author         SmellGood

// ==/UserScript==



function new_mp () {
    
     jQuery.ajax({type: "GET",url: "http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php?skipmc=1*",dataType: "json",cache: false,async: true,success: function(a) 
	 {   
        if(parseInt(a.nb_message,10)>nb_msg_non_lu) {
    
            alert("Nouveau Mp biatch ! ");
            window.location.reload()
    
    } /*crochet du if */
    
    }/* crochet du function (a) */
    
    })/*crochet de Jquery.ajax */

        

    }/* crochet de la fonction new_mp() */
new_mp();
    