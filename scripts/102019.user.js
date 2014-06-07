// ==UserScript==
// @author         Jinnie
// @name           Travian ☣ wrong attack protector
// @namespace      http://userscripts.org/users/103897
// @description    Warns when you are going to send defence troops on attack and attack army as defence.
// @include        http://*.travian.*/a2b.php*
// @version        1.0.0
// ==/UserScript==

// Types of troops
var atkTroops = [/*gauls*/
                 "unit u22" /*sword*/, "unit u24" /*TT*/, "unit u26" /*headuan*/, "unit u27" /*ram*/, "unit u28" /*cata*/,
				 /*roman*/
				 "unit u3" /*imperian*/, "unit u5" /*eq. imp.*/, "unit u6" /*eq. ceas.*/, "unit u7" /*ram*/, "unit u8" /*cata*/,
				 /*german*/
				 "unit u11" /*club*/, "unit u13" /*axe*/, "unit u16" /*TK*/, "unit u17" /*ram*/, "unit u18" /*cata*/
                 ];
var defTroops = [/*gauls*/
                 "unit u21" /*phalanx*/, "unit u25" /*Druid*/,
				 /*roman*/
				 "unit u1" /*legioner*/, "unit u2" /*praetorian*/,
				 /*german*/
				 "unit u12" /*spear*/, "unit u15" /*paladin*/
				];
// Setup troop change listeners
var troops = document.getElementById("troops");
var trs = troops.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for(var i=0; i<trs.length; i++){
   var tds = trs[i].getElementsByTagName("td");
   for(var j=0; j<tds.length; j++){
      var input = tds[j].getElementsByTagName("input")[0];
      if (input) {
         input.addEventListener("change", onChange, true);
         var anch = tds[j].getElementsByTagName("a")[0];
         if (anch) {
            anch.addEventListener("click", onChange, true);
         }
         var image = tds[j].getElementsByTagName("img")[0];
         image.addEventListener("click", onChange, true);
      }
   }
}
// Setup attack type listeners
var tr2s = document.getElementById("coords").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for(var z=0; z<tr2s.length; z++){
   var inp = tr2s[z].getElementsByTagName("td")[0].getElementsByTagName("label")[0].getElementsByTagName("input")[0];
   inp.addEventListener("click", onChange, true);
}

// Change handler
function onChange(e){
	for(var i=0; i<trs.length; i++){
	   var tds = trs[i].getElementsByTagName("td");
	   for(var j=0; j<tds.length; j++){
		  var input = tds[j].getElementsByTagName("input")[0];
		  if (input) {
		  	var image = tds[j].getElementsByTagName("img")[0];
			var tr2s = document.getElementById("coords").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
			var value = 0;
			for(var z=0; z<tr2s.length; z++){
			   var inp = tr2s[z].getElementsByTagName("td")[0].getElementsByTagName("label")[0].getElementsByTagName("input")[0];
			   if (inp.checked) {
			      value = inp.value;
			   }
			}
			var array = value==2 ? atkTroops : defTroops;
			if (input.value != "" && array.indexOf(image.getAttribute("class")) != -1) {
			   input.style.backgroundColor = "#FF9999";
			} else {
			   input.style.backgroundColor = "";
			}
		  }
	   }
	}
}