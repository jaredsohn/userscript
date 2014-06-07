// ==UserScript==
// @name           ModifProfil
// @namespace       
// @description    Aperçu de la suggestion
// @include        http://www.jeuxvideo.com/profil/*.html
// ==/UserScript==

$ = unsafeWindow.jQuery;

$(window).ready(function() {
	$("#init_avatar").hide();
	$('div[id^="modif_bloc_"]').hide();
	$(".defautmsg").parent().parent().hide();
	
	var li = document.createElement("li");
		li.id = "o_modifs";
		li.style.cursor = "pointer";
	var a = document.createElement("a");
		a.innerHTML = "Modifications";
	$(li).click(function() {
		if ($("#init_avatar").css("display") == "none") {
			$("#init_avatar").show();
			$('div[id^="modif_bloc_"]').show();
			$(".defautmsg").parent().parent().show();
		} else {
			$("#init_avatar").hide();
			$('div[id^="modif_bloc_"]').hide();
			$(".defautmsg").parent().parent().hide();
		}
	}).append(a).appendTo("#onglets");
});