// ==UserScript==
// @name        PaisaKamavo Auto Clicker
// @description Auto Clicker for Paisakamavo.com For more Update
// @namespace   http://chintanpatel.in/labs/PaisaKamavo_Auto_Clicker.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://www.paisakamavo.com/?ads
// @include     http://*.paisakamavo.com/?ads
// @include     http://www.paisakamavo.com/index.php?ads
// @include     http://*.paisakamavo.com/index.php?ads
// @version     1
// ==/UserScript==


$(document).ready(function(){
	var Location = $("img[src='yes.png']").parent().attr("href");
	if(typeof Location != "undefined"){
	$("body").append("<script>window.location = '"+Location+"';</script>");
	}
});