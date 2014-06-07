// ==UserScript==
// @name           eRepublik Multi Message by Sir Rui
// @description    Hopefully sends multi messages (if eRepublik Message GET Fix by s0beit 1.5 is plugged in)
// @version        0.1
// @include        http://www.erepublik.com/*/main/messages-compose/*
// @include        http://erepublik.com/*/main/messages-compose/*
// ==/UserScript==

(function() {
        var player = [ "946631", "1340547" ];
        var subject = "script+bonito";
        var msg = "esta+mensagem+ignora";

        for(i=0; i<=player.length; i++){
            alert("entra");
            window.location = "http://www.erepublik.com/en/main/messages-compose/"+player[i]+"/|citizen_subject="+subject+"&citizen_message="+msg;
            
            var myform=document.getElementById("message_form");
            myform.submit();
        }
})();
