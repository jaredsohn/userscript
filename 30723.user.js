// ==UserScript==
// @name           tester
// @namespace      http://userscripts.org/users/59925
// @description    DO NOT USE THIS, IT IS A GARBAGE TEST
// @include        *cybernations.net/nation_drill_display.asp?Nation_ID=*
// @include        *cybernations.net/pay_bills.asp?Nation_ID=*
// @include        *cybernations.net/national_wonders_purchase.asp?Nation_ID=*
// @include        *google*
// ==/UserScript==


var backColor = new Array(); // don't change this


backColor[0] = '#FF0000';
backColor[1] = '#00FF00';
backColor[2] = '#0000FF';
backColor[3] = '#FFFFFF';
backColor[4] = '#4981CE';


//function changeBG(whichColor){
document.bgColor = backColor[4];
//}

function appendToTop(html, tobottom){
  var oldtext = document.getElementById('nationmessages').innerHTML;
  if (tobottom) oldtext += '<div style="margin-top:1.5em">'+html+'</div>';
  else oldtext = '<div style="margin-bottom:1.5em">'+html+'</div>'+oldtext;
  
  document.getElementById('nationmessages').innerHTML = oldtext;
}

document.body.getElementById("Last Donation</a>:").innerHTML = "Car Payment</a>:";
document.body.replace("images</a>:", "Car Payment</a>:");