// ==UserScript==
// @name           Personalizer - PWNPO edition
// @namespace      it3
// @description    Personalise messages like a dream 
// @include        http://politicsandwar.com/inbox/message/receiver=*
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/154322.user.js
// ==/UserScript==

//change these
var title = "Who has got your back, " ;
var message = "\n\nIt is a cold, cruel world out there. Without true Comrades, your life in Planet Orbis can be bleak. That is why most rulers choose to join an alliance. \n\n But which alliance should you choose? One that offers you money for your loyalty? Or one that promises loyalty in exchange for loyalty. One that will never leave you on the field of battle. One that will teach you what you need to learn in order to be great. \n\n The New Pacific Order is that alliance. We believe that every member has the potential to rise to greatness. We believe that loyalty to each other is not only the best way, it is the only way. We believe that when the chips are down, you need someone to watch your back.If you are looking for true loyalty and commitment, I invite you to visit http://pw.npowned.net and apply for membership. \n\n Good luck to you, \n italiarule";
var intro = "Hello " ; 
// Don't change this
var ruler = document.getElementsByName("receiver")[0].value;
// avoid changing these
document.getElementsByName("subject")[0].value = title + ruler + "?";
document.getElementsByName("body")[0].value = intro + ruler + message ;
//send to pastebin
Persist.write({
    service : "PASTEBIN2",
    mode    : -1,   // prepend
    key     : "3s3TQrJX",
    value   : ruler + " \n",
    data    : {
        api_dev_key     : "c929b7ed3199f19d500d0b0e6f03681c",
        api_user_key    : "b5d20de2fd7ae4e67b3780d53aefcc7a",
    },
    onload  : function (result) {
        alert( ruler + "added to list of names");
    }
});

/*
!!!!!!! IT HAS TO ALL BE ON ONE LINE!!!!! Use \n for line breaks!
 
 */