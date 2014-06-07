// ==UserScript==
// @name        Filmweb - powieksz zdjecia obsady ver3
// @namespace   http://userscripts.org/users/27225
// @description Powieksza zdjecie aktora/aktorki po najechaniu myszka na nazwe postaci
// @include        http://www.filmweb.pl/*
// @exclude        http://www.filmweb.pl/person/*
// @version     3.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==

var $miniActorImage = $('a.personPhoto').find("img");
if($miniActorImage.length > 0)
{
	var miniHeight = $miniActorImage.attr("height");
	var miniWidth = $miniActorImage.attr("width");
}
else
{
	var miniHeight = 53;
	var miniWidth = 40;
}
$(".roleDesc").each(function(){
	$(this).hover(
	  function () {
		var name = $(this).parent().find("span.personName").find("a").text();
		var $actorImage = $('img[alt="'+name+'"]');
		$actorImage.css("position","absolute");
		$actorImage.css("z-index","100");
		var imgSrc = $actorImage.attr("src");
		if(imgSrc.search("pNoImg50.jpg") > -1) //there is no actor image
			return;
		var bigImgSrc = imgSrc.replace("2.jpg", "1.jpg");
		$actorImage.attr("src",bigImgSrc);
		$actorImage.attr("height",200);
		$actorImage.attr("width",150);
		$actorImage.css("max-width","150px");
	  }, 
	  function () {
		var name = $(this).parent().find("span.personName").find("a").text();
		var $actorImage = $('img[alt="'+name+'"]');
		// $actorImage.css("position","rela");
		$actorImage.css("z-index","0");
		var imgSrc = $actorImage.attr("src");
		if(imgSrc.search("pNoImg50.jpg") > -1) //there is no actor image
			return;
		var smallImgSrc = imgSrc.replace("1.jpg", "2.jpg");
		$actorImage.attr("src",smallImgSrc);
		$actorImage.attr("height",miniHeight);
		$actorImage.attr("width",miniWidth);
	  }
	);

})