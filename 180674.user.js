// ==UserScript==
// @name           Personalizer
// @namespace      it3
// @description    Personalise messages like a dream
// @include        http://www.cybernations.net/send_message.asp*
// ==/UserScript==

//change these
var title = "Who's got your back, " ;
var message = ", from one of the largest alliance in CyberNations, the New Pacific Order. \n\n For six years the New Pacific Order has been at the forefront of CyberNations, serving as a shining example of what efficiency and organization can achieve however none of this could have been made possible without a dedicated membership to draw from. Are you up to the challenge? \n\n We Pacificans enjoy a bustling and vibrant community based on our private forum, IRC channels and dedicated MineCraft servers! We have created tons of guides, tools and programs to help our newer nations grow and to equip them with the knowledge they need to prosper.\n\n Interested in being a DJ? A Writer? A Diplomat? A Recruiter? A Trade Specialist? Well in the NPO you can be all of these and more with our many departments.\n\n The NPO has a proud and rich history and we are looking for new members to help build on our accomplishments. Visit www.cn.npowned.net and post your application today! \n\n- italia" ;
var intro = "Greetings, " ; 
// Don't change this
var ruler = document.forms["FrontPage_Form1"].elements["messaging_toid"].value ;
// avoid changing these
document.forms["FrontPage_Form1"].elements["messaging_subject"].value = title + ruler +"?" ;
document.forms["FrontPage_Form1"].elements["messaging_message"].value = intro + ruler + message ;


/*
!!!!!!! IT HAS TO ALL BE ON ONE LINE!!!!! Use \n for line breaks!
 
 */