// ==UserScript==
// @name           the-west_duell_skrill_perfekt
// @namespace      the-west
// @include        http://de10.the-west.de/game.php#
// ==/UserScript==



var Button = document.createElement("li");
	Button.id="Button";
	Button.innerHTML='<a href="#"><img src="http://i.imagehost.org/0321/twb_button.gif" alt="TWB Tools" style=\'position:relative; left:8px;\'></a>';
	document.getElementById('right_menu').appendChild(Button); // OK










var window_duel = document.getElementById("window_duel").innerHTML;
if(window_duel == "window_duel") {

  var schuss = document.getElementById("duel_skill_shot").innerHTML;
  var schlag = document.getElementById("duel_skill_punch").innerHTML;
  var wiederstand = document.getElementById("duel_skill_tough").innerHTML;
  var reflex = document.getElementById("duel_skill_reflex").innerHTML;
  var auftreten = document.getElementById("duel_skill_appearance").innerHTML;
  var taktik = document.getElementById("duel_skill_tactic").innerHTML;

    var number_schuss = Number(schuss) + Number(wiederstand) + Number(reflex) + Number(auftreten) + Number(taktik);
    var number_schlag = Number(schlag) + Number(wiederstand) + Number(reflex) + Number(auftreten) + Number(taktik);


  var keine_schlagwaffe = document.getElementById("duel_skill_punch").style.opacity;

  if(keine_schlagwaffe == "0.25") {
     alert(number_schuss);
     } else {
     document.getElementById("duel_skill_punch").innerHTML = number_schlag;
  }
}
