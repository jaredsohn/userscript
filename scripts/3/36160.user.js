// ==UserScript==
// @name           {Katbox: Bonus Comics} Page Title Identification
// @namespace      http://wolfey.sillydog.org/
// @description    Replaces "Bonus Comic" or "Las Lindas" in the page title with the name of the comic being viewed.
// @include        http://www.katbox.net/bonus_*
// ==/UserScript==

// [Last Updated] October 28, 2008

// Set a variable for the comic's title

var comic_title = "";

// Determine comic title based on its URL

if (document.URL.split("/")[3] === "bonus_boobs") {
	comic_title = "Breasts are the Best";
}
else if (document.URL.split("/")[3] === "bonus_crest") {
	comic_title = "The Crest Diaries";
}
else if (document.URL.split("/")[3] === "bonus_curve") {
	comic_title = "Learning Curves";
}
else if (document.URL.split("/")[3] === "bonus_dames") {
	comic_title = "Dungeons and Dames";
}
else if (document.URL.split("/")[3] === "bonus_empire") {
	comic_title = "Building an Empire";
}
else if (document.URL.split("/")[3] === "bonus_kittens") {
	comic_title = "Lost Kittens";
}
else if (document.URL.split("/")[3] === "bonus_knight") {
	comic_title = "Knighthood";
}
else if (document.URL.split("/")[3] === "bonus_obsess") {
	comic_title = "Obsessions";
}
else if (document.URL.split("/")[3] === "bonus_times") {
	comic_title = "Simpler Times";
}
else if (document.URL.split("/")[3] === "bonus_taffy") {
	comic_title = "Making Taffy";
}

// Set the replacement page title

var page_title = document.title.replace(/^(Bonus Comics?|Las Lindas?)/, comic_title);

// Replace the page title

document.title = page_title;