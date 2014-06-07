// ==UserScript==
// @name		FireGoogle
// @author		Homer Bond 005 and Seoester
// @description	Ändert die Google-Startseite in FireGoogle.
// @include		*.google.*
// @exclude		*support*
// ==/UserScript==

// Die Idee zum Script stammt von Seoester, der eine vorherige Version auf http://userscripts.org/scripts/show/66444 bereitstellt.
// Es ist nicht erlaubt die unten stehenden URLs zu verändern und es als neuen Script hochzuladen!
// You are not allowed to edit the URLs in this script and upload it as new script!
var standardlogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogle.png";
var backgroundimage = "http://dl.dropbox.com/u/3456054/test.jpg";
var suchelogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogle.png";
var mapslogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogleMaps.png";
var bilderlogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogleBilder.png";
var videoslogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogleVideos.png";
var newslogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogleNews.png";
var shoppinglogo = "http://dl.dropbox.com/u/3456054/Scripts/FireGoogleShopping.png";
switch (document.title){
	case ("Google"):
		var logo = document.getElementById("logo");
		logo.removeAttribute("style");
		logo.setAttribute("style","background: url(\"" + standardlogo + "\") no-repeat scroll 0% 0% transparent; height: 110px; width: 276px;");
		break;
	case ("* - Google-Suche"):
		var logo = document.getElementById("logo").getElementsByTagName("img")[0];
		logo.removeAttribute("src");
		logo.setAttribute("src", suchelogo);

		for(var i = 0; i<10; i++) {
			var button = document.getElementsByTagName("input")[i];
			switch (button.value){
				case "Suche":
					button.value = "Fire-Suche";
					break;
				default:
					break;
			}
		}
		break;
	case ("Google Maps"):
		var logo = document.getElementsById("logo").getElementsByTagName("img")[0];
		logo.removeAttribute("src");
		logo.setAttribute("src",mapslogo);
		break;
	case ("Google Bilder"):
		var logo = document.getElementById("logo");
		logo.removeAttribute("src");
		logo.setAttribute("src",bilderlogo);
		for(var i = 0; i<10; i++) {
			var button = document.getElementsByTagName("input")[i];
			switch (button.value){
				case "Bilder suchen":
					button.value = "FireImages-Suche";
					break;
			}
		}
		break;
	case ("Google Videos"):
		var logo = document.getElementsByTagName("img")[0];
		logo.removeAttribute("src");
		logo.setAttribute("src",videoslogo);
		for(var i = 0; i<10; i++) {
			var button = document.getElementsByTagName("input")[i];
			switch (button.value){
				case "Videos suchen":
					button.value = "FireVideos-Suche";
					break;
			}
		}
	break;
	case ("Google News"):
		var logo = document.getElementById("page-header").getElementsByTagName("img")[0];
		logo.removeAttribute("src");
		logo.setAttribute("src",newslogo);
		for(var i = 0; i<10; i++) {
			var button = document.getElementsByTagName("input")[i];
			switch (button.value){
				case "News-Suche":
					button.value = "FireNews-Suche";
					break;
			}
		}
	break;
	case ("Google Produktsuche"):
		var logo = document.getElementById("hp-logo").getElementsByTagName("img")[0];
		logo.removeAttribute("src");
		logo.setAttribute("src",shoppinglogo);
		for(var i = 0; i<10; i++) {
			var button = document.getElementsByTagName("input")[i];
			switch (button.value){
				case "Suchen":
					button.value = "FireProducts-Suche";
					break;
			}
		}
	break;
}