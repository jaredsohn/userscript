// ==UserScript==
// @name           Hofmann
// @namespace      https://menueweb.hofmann-menue.de
// @include        https://menueweb.hofmann-menue.de/*
// @include        https://menueweb.menue-manufakturen.at/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// ==/UserScript==

var einwaage = 0;
var highestFatMeal;
var highestCarbMeal;
var highestProteinMeal;
var fatPart = 0;
var carbPart = 0;
var proteinPart = 0;

function waage(einwaage, fett)
{
	var fett = parseInt(fett);
	einwaage = parseInt(einwaage);
	var newFett = (einwaage / 100) * fett;
	return Math.round(newFett);
}
function percent(einwaage, fett)
{
	var fett = parseInt(fett);
	var einwaage = parseInt(einwaage);
	var fatPercent = fett / (einwaage / 100);
	return Math.round(fatPercent);
}
$(".clsTableItemBestell").each(function(index) {
	if ($('td[id$=captionMenueEinwaage]', this).length > 0){
		var einwaage = $('td[id$=captionMenueEinwaage]', this).next().find(".clsNwHeader").text();
		var kohlenhydrate = $('td[id$=captionMenueKohlenhydrate]', this).next().find(".clsNwHeader");
		var eiweiss = $('td[id$=captionMenueEiweiss]', this).next().find(".clsNwHeader");
		var fett = $('td[id$=captionMenueFett]', this).next().find(".clsNwHeader");
		var brennwert = $('div[id$=divBrennwert]', this);
		
		var totalFat = waage(einwaage, $(fett).text());
		var totalCarbs = waage(einwaage, $(kohlenhydrate).text());
		var totalProtein = waage(einwaage, $(eiweiss).text());
		
		var fatPercent = percent(einwaage, totalFat);
		if ((fatPercent > fatPart) && (einwaage > 150)) { highestFatMeal = $(this); fatPart = fatPercent; }
		
		var carbPercent = percent(einwaage, totalCarbs);
		if ((carbPercent > carbPart)&& (einwaage > 150)) { highestCarbMeal = $(this); carbPart = carbPercent; }
		
		var proteinPercent = percent(einwaage, totalCarbs);
		if ((proteinPercent > proteinPart)&& (einwaage > 150)) { highestProteinMeal = $(this); proteinPart = proteinPercent; }
		
		$(this).attr("title",einwaage + "g: " + fatPercent + "% is fat," +
			carbPercent + "% are carbohydrates and " +
			proteinPercent + "% is protein"
		);
		
/* 		$(kohlenhydrate).text(totalCarbs + "g" + carbPercent +"%");
		$(eiweiss).text(totalProtein + "g" + proteinPercent +"%");
		$(fett).text(totalFat + "g" + fatPercent +"%"); */
		$(kohlenhydrate).text(totalCarbs + "g");
		$(eiweiss).text(totalProtein + "g");
		$(fett).text(totalFat + "g");
		
		var werte = brennwert.text().split(" ");
		var kilojoule = parseInt(werte[0]);
		var kcal = parseInt(werte[2].substr(1));
		kilojoule = Math.round((einwaage / 100) * kilojoule);
		kcal = Math.round((einwaage / 100) * kcal);
		$(brennwert).text(kilojoule + " kJ (" + kcal + " kcal)");
	}

});
  $("td:first", highestFatMeal).css("background-color", "red");
  $("a", highestFatMeal).css("color", "black");
  $('td[id$=captionMenueFett]', highestFatMeal).next().find(".clsNwHeader").css("background-color", "red").css("color", "black");
  
  $("td:first", highestCarbMeal).css("background-color", "grey");
  $('td[id$=captionMenueKohlenhydrate]', highestCarbMeal).next().find(".clsNwHeader").css("background-color", "grey").css("color", "black");
  
  $("td:first", highestProteinMeal).css("background-color", "green");
  $('td[id$=captionMenueEiweiss]', highestProteinMeal).next().find(".clsNwHeader").css("background-color", "green").css("color", "black");
  
  
$("td[id$='captionMenueNaehrwerte']").text("Nährwerte (g)");