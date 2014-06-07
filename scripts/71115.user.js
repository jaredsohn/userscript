var meta = <><![CDATA[
// ==UserScript==
// @name 		Travian Mid Extender
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();
function mid_extender() {
  if (undefined===document.getElementById('side_navi')) {
    alert("Error: side navi not found");
  }
  mid_extender_hide_side_navi();
  document.getElementById('mid').style.background='none';
  document.getElementById('res').style.left='0px';
  document.getElementById('side_info').style.float='left';
  document.getElementById('side_info').style.position='relative';
  document.getElementById('side_navi').addEventListener("mouseover", mid_extender_show_side_navi,true);
  document.getElementById('side_navi').addEventListener("mouseout",mid_extender_hide_side_navi,true);
}
function mid_extender_show_side_navi() {
document.getElementById('side_navi').style.width='130px';
document.getElementById('side_navi').style.position='static';
document.getElementById('side_navi').style.background='transparent';
}
function mid_extender_hide_side_navi() {
document.getElementById('side_navi').style.width='10px';
document.getElementById('side_navi').style.overflow='hidden';
}
mid_extender();