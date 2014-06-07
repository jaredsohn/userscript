// ==UserScript==
// @name           infowars_xtroll
// @namespace      http://userscripts.org
// @include        *infowars.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.js
// ==/UserScript==
//
//Author: Mark_13


/////////INPUT:////////////


//Put the names here to block, separated by commas:
var trolls=  new Array(

  "NWO_RULEZ",
  "It Takes a Pillage",
  "Patriot_Act_Forever"
  

);


//set to false to just remove troll posts;  to true to make trolls say random things:
var bTrollTalk=false;


//Put random statements here to make trolls say, separated by commas:
var troll_talk = new Array(

  "I didn't really understand the article.  Did I mention I'm not very bright?",
  "BWAAAHHHHHHHHHHH!"


);


////////////////////////////////



function x_talk(index) {
  if (index > 0)  
    this.parentNode.removeChild(this);
  else  {
    if (!troll_talk.length)  
      $(this).html("");
    else
      $(this).html(troll_talk[Math.floor(Math.random()*troll_talk.length)]);    
  }

}


function x(index) {
          
  for (t=0; t<trolls.length; t++) {
    if ($(this).html().indexOf(trolls[t]) >=0) {
      var pn = this;
      while ((pn = pn.parentNode) && (pn.nodeName != "LI"));    
      if (!bTrollTalk) 
        pn.parentNode.removeChild(pn);
      else 
	$("#div-"+pn.id).children("p").each(x_talk);
    }
  }  

}


function xtroll() {
  $('cite').each(x);
  $(".commentlist").css("display","inline");  
}


$(document).ready(xtroll);
