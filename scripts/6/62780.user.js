// ==UserScript==
// @name           Cadeau+
// @namespace      myprizee
// @include        http://*.prizee.com*/cadeaux/*
// @author		   matheod (matheoland)
// ==/UserScript==

$ = unsafeWindow.jQuery;
$("#tooltipCalendarGiftWon").after("<div id='myprizee_cadeauinfo'></div>");
info="#myprizee_cadeauinfo";
$(info).html('<div id="ajaxresult" style="height:350px;"></div><div id="infocadeauplus"><h3 class="titre">MyPrizee - Cadeau+</h3><div>Créé par matheod (matheoland)<br /><b>En construction ...</b></div></div>');
$(".gameListNoToolTip>ul").append('<li><a id="lieninfocadeauplus" class="lienMenuJeux" style="font-weight: normal;">MyPrizee - Cadeau+<span class="giftIcon25 gifts25"/></a></li>');
$('#lieninfocadeauplus').click(function(){
				$.nyroModalManual({
					url : '#infocadeauplus'
				});
				return false;
			});
$(".gridState .tooltipGrid2:not(.nyroModal)").click(function(){
idcadeau = this.parentNode.parentNode.getElementsByTagName('span')[0].id.substr(6);
$.ajax({
  url: "http://serv110.fr.prizee.com//cadeaux/grille/action?cmd=acheter&vid="+idcadeau,
  cache: false,
    async: false,
  success: function(html){
    $("#ajaxresult").html(html);
  } 
});
	$.nyroModalManual({
					url : '#ajaxresult'
				});
});