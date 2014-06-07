// ==UserScript==
// @name           Personalizer - PW edition
// @namespace      it3
// @description    Personalise messages like a dream 
// @include        http://politicsandwar.com/inbox/message/receiver=*
// ==/UserScript==

//change these
var title = "Vengeance. Justice. Fire and Blood" ;
var message = "\n\n I am RagnarBuliwyf, from The Seven Kingdoms. And while I am sure you have received a few of these kinds of recruitment messages promising money and power. I think SK could offer you something more than those.\n\n A community with a rich, deep history that has spanned more than 4 years on different games. The Seven Kingdoms offers an elite alliance for you to possibly become a member of. We've got the smartest people in game working to make sure your building at the highest level of efficiency possible. We've got the biggest military in game, that's ready to defend you against any and all attacks against The Seven Kingdoms. We have IRC channels for you to join and speak to members of SK in real time for advice to help you, along with friendly chats about anything from other games to why a potato is so popular.\n\n If you think you have what it takes to be a part of the best alliance in the game, simply apply in game and on our forum post an application for membership.\n\n Regards, Earl RagnarBuliwyf the DragonKnight of Targaryen";
var intro = "Greetings, " ; 
// Don't change this
var ruler = document.getElementsByName("receiver")[0].value;
// avoid changing these
document.getElementsByName("subject")[0].value = title;
document.getElementsByName("body")[0].value = intro + ruler + message ;


/*
!!!!!!! IT HAS TO ALL BE ON ONE LINE!!!!! Use \n for line breaks!
 
 */