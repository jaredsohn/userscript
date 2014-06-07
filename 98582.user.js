// ==UserScript==
// @name           Fullback
// @namespace      FullBack
// @description    Fullback
// @include        http*://*flashback.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require       http://plugins.jquery.com/files/jquery.cookie.js.txt
// ==/UserScript==
//Vars
if($.cookie("fullbackactivate")) {
	fullblockEnabled = $.cookie("fullbackactivate")
} else {
	var fullblockEnabled = false;
}

var loggedIn = false;

if ($('#top-tabs-icons').length) {
	loggedIn = true;
	var nickname = $("a:contains('Mina citerade inlägg')").attr("href").substring(11).slice(0, -10);
	var userId = $("a:contains('Min profil')").attr("href").substring(2);
} else {
	loggedIn = false;
}

var hideSiteRight = $.cookie("fullbackrightmenu");
var hideTopTabs = $.cookie("fullbacktoptabs");
var hideTop = $.cookie("fullbacktop");
var hideFooter = $.cookie("fullbackfooter");
var hideAds = $.cookie("fullbackads");
var changeMeny = $.cookie("fullbackactivatemeny");
var logoutLink = $('li.right a').attr('href');
var bodyHeight = $('body').height();
var pmCount = $('table.valignm tbody tr td:nth-child(2)').html();

//Make meny
	var fullbackTmp = "";
	fullbackTmp += '<div id="dialogCover" style="width: 100%;height: '+bodyHeight+'px;background-color: black;position: absolute;z-index: 50;opacity: 0.7;display: none;"></div>';
	fullbackTmp += '<div id="fullbackOptionsDialog" style="position: absolute;top: 50px;left: 50%;margin-left: -153px;background-color: white;border: 3px solid black;width: 300px;height: 250px;z-index: 100;opacity: 1;display: none;">';
	fullbackTmp += '<div id="dialogTop" style="width: 300px;background: #E3E3E3;border-bottom: 1px solid grey;padding-bottom: 3px;">';
	fullbackTmp += '<a href="#" id="dialogClose" style="float: right;margin-right: 10px;">Close</a><div style="clear: both;"></div>';
	fullbackTmp += '</div>';
	fullbackTmp += '<a href="http://www.diggan.se/"><img src="http://diggan.se/fullback_icons/logotype.png" alt="Fullback Logotype" border="0"/></a>';
	fullbackTmp += '<div id="dialogForm" style="padding-left: 5px;"><form>';
		if(fullblockEnabled == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbackactivate" checked="checked" style="display: inline;"/><label for="fullbackactivate">Aktivera Fullback</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbackactivate" style="display: inline;"/><label for="fullbackactivate">Aktivera Fullback</label><br/>';
		}
		if(hideSiteRight == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbackrightmenu" checked="checked" style="display: inline;"/><label for="fullbackrightmenu">Göm den högra menyn</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbackrightmenu" style="display: inline;"/><label for="fullbackrightmenu">Göm den högra menyn</label><br/>';
		}
		if(hideTopTabs == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbacktoptabs" checked="checked" style="display: inline;"/><label for="fullbacktoptabs">Göm "Chat", "Regler" mm</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbacktoptabs" style="display: inline;"/><label for="fullbacktoptabs">Göm "Chat", "Regler" mm</label><br/>';
		}
		if(hideTop == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbacktop" checked="checked" style="display: inline;"/><label for="fullbacktop">Göm logotyp och statistik</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbacktop" style="display: inline;"/><label for="fullbacktop">Göm logotyp och statistik</label><br/>';
		}
		if(hideFooter == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbackfooter" checked="checked" style="display: inline;"/><label for="fullbackfooter">Göm footer</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbackfooter" style="display: inline;"/><label for="fullbackfooter">Göm footer</label><br/>';
		}
		if(hideAds == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbackads" checked="checked" style="display: inline;"/><label for="fullbackads">Göm reklam</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbackads" style="display: inline;"/><label for="fullbackads">Göm reklam</label><br/>';
		}
		if(changeMeny == "true") {
			fullbackTmp += '<input type="checkbox" id="fullbackactivatemeny" checked="checked" style="display: inline;"/><label for="fullbackactivatemeny">Aktivera Fullback meny</label><br/>';
		} else {
			fullbackTmp += '<input type="checkbox" id="fullbackactivatemeny" style="display: inline;"/><label for="fullbackactivatemeny">Aktivera Fullback meny</label><br/>';
		}
	fullbackTmp += '</form></div>';
	fullbackTmp += '<div id="dialogBottom" style="width: 300px;background: #E3E3E3;border-top: 1px solid grey;padding-bottom: 3px;position: absolute;bottom: 0px;">';
	fullbackTmp += '<a href="#" style="float: left;margin-left: 10px;" onClick="location.reload();">Spara</a>';
	fullbackTmp += '<div style="clear: both;"></div></div></div>';
	$("body").prepend(fullbackTmp);
//Functions
function addFullbackSwitch() {
	$(".top-menu-sub").append('<li class="l2" id="fullbackOptions"><a href="#">Fullback alternativ</a></li>');
}
function addFullbackMeny() {
	$('.top-menu-sub li').remove();
	addFullbackSwitch();
}
//Script
if(fullblockEnabled == "true") {
	addFullbackSwitch();
	if(hideSiteRight == "true") {
		$('#site-right').remove();
		$('#site-left').css("width", "100%");
		$('#site-container').css("width", "100%");
		$('#site-main').css("width", "100%");
		$('#site-left-p10r').css("margin-right","10px");
		$('#site-left-p10r').css("padding-right","10px");
	}
	if(hideTopTabs == "true") {
		$('#top-tabs').remove();
	}
	if(hideTop == "true") {
		$('#top').remove();
	}
	if(hideFooter == "true") {
		$('#footer').remove();
	}
	if(hideAds == "true") {
		$('#top-banner').remove();
		$('.post_textmid').remove();
	}
	if(changeMeny == "true") {
		addFullbackMeny();
		if(loggedIn == 0) {
			$(".top-menu-sub").prepend('<li class="l2"><a href="login.php"><img src="http://diggan.se/fullback_icons/login.png"> Logga in</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="nya-amnen"><img src="http://diggan.se/fullback_icons/nya_amnen.png"> Nya ämnen</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="heta-amnen"><img src="http://diggan.se/fullback_icons/heta_amnen.png"> Heta ämnen</a></li>');
			$(".top-menu-sub").append('<li class="l2"><hr style="color: #B8C0C7"/></div>');
			$(".top-menu-sub").append('<li class="l2"><a href="#">Tema</a><ul style="left: -202px;" class="top-menu-sub2"><li class="l3"><a class="site-settings-theme" href="#0">Vitt</a></li><li class="l3"><a class="site-settings-theme" href="#4">Svart-vitt</a></li><li class="l3"><a class="site-settings-theme" href="#3">Skuggat</a></li><li class="l3"><a class="site-settings-theme" href="#1">Grått</a></li><li class="l3"><a class="site-settings-theme" href="#2">Mörkgrått</a></li><li class="l3"><a class="site-settings-theme" href="#5">Natt</a></li><li class="l3"><a class="site-settings-theme" href="#6">Futurism</a></li><li class="l3"><a class="site-settings-theme" href="#7">April 2010 #2</a></li><li class="l3"><a class="site-settings-theme" href="#8">Klean</a></li><li class="l3"><a class="site-settings-theme" href="#9">Klean #2</a></li><li class="l3"><a class="site-settings-theme" href="#10">Wood</a></li></ul></li>');
			$(".top-menu-sub").append('<li class="l2"><a href="#">Toppmenyn</a><ul style="left: -202px;" class="top-menu-sub2"><li class="l3"><a class="site-settings-topmenu" href="#0">Följ med</a></li><li class="l3"><a class="site-settings-topmenu" href="#1">Ligg kvar längst upp</a></li><li class="l3"><a class="site-settings-topmenu" href="#2">Dölj</a></li></ul></li>');
			$(".top-menu-sub").append('<li class="l2"><a href="#">Sidbredd</a><ul style="left: -202px;" class="top-menu-sub2"><li class="l3"><a class="site-settings-size" title="normal" href="#">Fast</a></li><li class="l3"><a class="site-settings-size" title="75" href="#">75%</a></li><li class="l3"><a class="site-settings-size" title="95" href="#">95%</a></li><li class="l3"><a class="site-settings-size" title="100" href="#">100%</a></li></ul></li>');
		} else {
			$(".top-menu-sub").append('<li class="l2"><a href="'+logoutLink+'">Logga ut</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="#">Tema</a><ul style="left: -202px;" class="top-menu-sub2"><li class="l3"><a class="site-settings-theme" href="#0">Vitt</a></li><li class="l3"><a class="site-settings-theme" href="#4">Svart-vitt</a></li><li class="l3"><a class="site-settings-theme" href="#3">Skuggat</a></li><li class="l3"><a class="site-settings-theme" href="#1">Grått</a></li><li class="l3"><a class="site-settings-theme" href="#2">Mörkgrått</a></li><li class="l3"><a class="site-settings-theme" href="#5">Natt</a></li><li class="l3"><a class="site-settings-theme" href="#6">Futurism</a></li><li class="l3"><a class="site-settings-theme" href="#7">April 2010 #2</a></li><li class="l3"><a class="site-settings-theme" href="#8">Klean</a></li><li class="l3"><a class="site-settings-theme" href="#9">Klean #2</a></li><li class="l3"><a class="site-settings-theme" href="#10">Wood</a></li></ul></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="#">Toppmenyn</a><ul style="left: -202px;" class="top-menu-sub2"><li class="l3"><a class="site-settings-topmenu" href="#0">Följ med</a></li><li class="l3"><a class="site-settings-topmenu" href="#1">Ligg kvar längst upp</a></li><li class="l3"><a class="site-settings-topmenu" href="#2">Dölj</a></li></ul></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="#">Sidbredd</a><ul style="left: -202px;" class="top-menu-sub2"><li class="l3"><a class="site-settings-size" title="normal" href="#">Fast</a></li><li class="l3"><a class="site-settings-size" title="75" href="#">75%</a></li><li class="l3"><a class="site-settings-size" title="95" href="#">95%</a></li><li class="l3"><a class="site-settings-size" title="100" href="#">100%</a></li></ul></li>');
			$('.top-menu-sub').prepend('<li class="l2"><a style="background: none repeat scroll 0% 0% transparent; color: rgb(103, 103, 103);" href="/usercp.php">Kontrollpanel</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><hr style="color: #B8C0C7"/></div>');
				if (pmCount >= 1) {
					$(".top-menu-sub").prepend('<li class="l2"><a href="private.php"><b>Privata meddelanden ('+pmCount+')</b></a></li>');
				} else {
					$(".top-menu-sub").prepend('<li class="l2"><a href="private.php">Privata meddelanden ('+pmCount+')</a></li>');
				}
			$(".top-menu-sub").prepend('<li class="l2"><a href="/sok/quote='+nickname+'?sp=1&amp;so=d">Mina citerade inlägg</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="/find_threads_by_user.php?userid='+userId+'">Mina startade ämnen</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="/find_posts_by_user.php?userid='+userId+'">Mina inlägg</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><hr style="color: #B8C0C7"/></div>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="search.php"><img src="http://diggan.se/fullback_icons/sok.png"> Sök</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="chat.php"><img src="http://diggan.se/fullback_icons/chat.png"> Chat</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="nya-amnen"><img src="http://diggan.se/fullback_icons/nya_amnen.png"> Nya ämnen</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="heta-amnen"><img src="http://diggan.se/fullback_icons/heta_amnen.png"> Heta ämnen</a></li>');
			$(".top-menu-sub").prepend('<li class="l2"><a href="index.php"><img src="http://diggan.se/fullback_icons/startsida.png"> Startsidan</a></li>');
		}
	}
} else {
	addFullbackSwitch();
}
$('#fullbackSwitch a').click(function(){
	if (fullblockEnabled == "true") {
		$.cookie("fullback_fullblockactivate", false);
		location.reload();
	} else {
		$.cookie("fullback_fullblockactivate", true);
		fullblockEnabled = true;
		location.reload();
	}
});
$('#fullbackOptions a').click(function(){
	$('#dialogCover').fadeIn('Slow');
	$('#fullbackOptionsDialog').fadeIn('Slow');
});
$('#dialogClose').click(function(){
	$('#dialogCover').fadeOut('Slow');
	$('#fullbackOptionsDialog').fadeOut('Slow');
});
$('input:checkbox').click(function(){
	var attribute = $(this).attr('id');
	if($(this).is(':checked')) {
		$.cookie(attribute, true);
	} else {
		$.cookie(attribute, false);
	}
});
