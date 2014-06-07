// ==UserScript==
// @name mendigoGame
// @description recoge tu chatarra en 10 minutos.
// @include *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var initTrash = function () {
    //alert("Welcome stranger!!!");

    if(jQuery == undefined) {
        //alert("jQuery undefined.");
        setTimeout("initTrash", 2000);
    } else {
        //alert("jQuery defined.");
        // detect the actitivities path in the host.
        if(window.location.pathname == "/activities/") {
            // if enable to collect trash, go for it.
            if (jQuery("input[type=button][value=Salir a recoger]").length > 0) {
                 
                 // collect time for 10 minutes.
                 jQuery(".dropdown[name=time]").val(0);
                 jQuery("input[type=button][value=Salir a recoger]").click();
                 //alert('Recoger');
                 // if collecting trash then wait for 10 minutes
            } else if (jQuery("input[type=submit][value=Interrumpir]").length > 0) {
                 //var time = jQuery('span[id=counter3]').text(); 
                 //var minute =  parseFloat(time.split(":")[0]);
                 //var seconds =  parseFloat((time.split(":")[1]/60));
                 //var newTime = minute + seconds;
                 //alert('newTime:'+newTime);
                 setTimeout("window.location.href = window.location.href;",1000*60);
                 //alert('Interrumpir');
                 // if enable to empty
            } else if (jQuery("input[type=submit][value=Vaciar el carro de la compra]").length > 0) {
                 jQuery("input[type=submit][value=Vaciar el carro de la compra]").click();
                 //alert('Vaciar');
            }
        } else {
            // Click on trash page.
           //alert("go to Trash!!!");
            window.location = jQuery(".rank a").attr("href");
        }
        
    }
    
};


if(window.location.hostname == "buenosaires.mendigogame.com") {
   //alert("location.hostname detected!!!");
   setTimeout(function(){initTrash();},10000);   
//window.addEventListener("load",initTrash,false);
}
