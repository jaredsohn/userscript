// ==UserScript==
// @name          HATEMILL
// @namespace     http://konstochvanligasaker.se/hatemill/
// @description   Skriver om alla kommentarsfunktioner och räknare på den vidriga webbplatsen Newsmill så det alltid ser ut som att ingen har kommenterat.
// @include       http://www.newsmill.se/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/*

HATEMILL
av Markus Amalthea Magnuson
<markus.magnuson@gmail.com>

Det här lilla stycket kod skriver om alla kommentarsfunktioner och räknare på
den vidriga webbplatsen Newsmill så det alltid ser ut som att ingen har
kommenterat. Ljuva tanke.
  Du vet själv hur det är, oavsett hur mycket energi du lägger på att hålla dig
borta från denna webbens radioaktiva avskrädeshög så är det förr eller senare
någon av dina så kallade vänner som skickar en förklädd länk eller rentav
övertalar dig att besöka skiten. Du läser, du läser lite till, sen når du botten
(av webbsidan alltså; själsligt och moraliskt är du redan där) och  "råkar"
börja läsa kommentarerna och rätt vad det är så hatar du hela mänskligheten.
Ingen vet riktigt i detalj hur detta går till.
  Från och med nu är du fri. Alla artiklar på Newsmill ser ut som de gör innan
någon hunnit kommentera dem.

  “Someday a real rain will come
     and wash all this scum off the streets.”
       – Travis Bickle

*/

// jetpack.future.import("pageMods");

var callback = function(document) {
    /* Varför inte bara gömma alla kommentarräknare på hela Newsmill? */
    $(document).find("span.commentText").html("0");

    var comments = $(document).find("div#comments");

    /* Göm antalet kommentarer. */
    comments.find("p.writeComment").find("span.lightGrey").html("");

    /* Skriv om textsträngen "kommentarer" till "kommentera". */
    var newHTML = comments.find("p.writeComment").html().replace(/kommentarer/, "kommentera");
    comments.find("p.writeComment").html(newHTML);

    /* Göm kommentarer som kommer göra dig arg och upprörd, det vill säga alla. */
    comments.find("div.blogItem").remove();

    /* Göm också antalet kommentarer längst upp på sidan. */
    $(document).find("li.tool-co").find("span").html("0");
	
	/* Göm, åh, göm millningssystemet. */
	$("millings").style.display = 'none';
}

/*var options = {};
options.matches = ["http://www.newsmill.se/*"];

jetpack.pageMods.add(callback, options);
*/

callback(document);
