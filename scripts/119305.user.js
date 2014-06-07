// ==UserScript==
// @name           GraphTimeFix
// @namespace      Plornt
// @include        http://*torn.com/personalstats.php*
// ==/UserScript==
var buttons = []; 
var time = [7,30,90,180,360,9999];
//Load in all our buttons
buttons.push(document.getElementById("1week")); 
buttons.push(document.getElementById("1month"));
buttons.push(document.getElementById("3month"));
buttons.push(document.getElementById("6month"));
buttons.push(document.getElementById("12month"));
buttons.push(document.getElementById("all"));
//Loop through the buttons making it look nice and loading the correct data.
for (var i = 0; i < buttons.length; i++) {
 var elem = buttons[i];
elem.className = "button";
elem.style.width = "50px";
elem.id = "time" + elem.id;
}
buttons[0].parentNode.innerHTML = buttons[0].parentNode.innerHTML.replace(/ \| /g,"");