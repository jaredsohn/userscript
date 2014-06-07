// ==UserScript==
// @name           kogo komentowano
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/komentator*
// @copyright	   bozar
// @version        1.0.1
// ==/UserScript==

var $ = unsafeWindow.$;

$(".komentarz").each(function(){
	var kto = $(this).find("div span span a span").html();	
	var kogo = $(this).find("div div div div a").attr("href");
	var info = document.createElement("div");
	if(kogo.match("\/albumy\/")){
		kogo = kogo.split("/")[2];
		$(info).html("<a href='http://www.fotka.pl/profil/"+kto+"'>"+kto+"</a> => <a href='http://www.fotka.pl/profil/"+kogo+"'>"+kogo+"</a>");
	}else{	
		kogo = "Grupa \""+kogo.split("/")[3]+"\"";
		$(info).html("<a href='http://www.fotka.pl/profil/"+kto+"'>"+kto+"</a> => "+kogo);
	}
	$(info).css({marginRight: "10px", fontSize: "8pt"});	
	$(this).children(":last").prev().children(":first").children(":first").append(info);
});