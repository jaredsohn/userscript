// ==UserScript==
// @name           Real Metacritic Scores
// @namespace      http://reddit.com
// @description    Replaces Metacritic game scores based on distribution
// @include        http://www.metacritic.com/games/*
// @include        http://metacritic.com/games/*
// ==/UserScript==

var allSpans = document.getElementsByTagName("span");

var rating = 0;

for (var i = 0; i < allSpans.length; i++)
{
    if (allSpans[i].parentNode.id != "userscore" && (allSpans[i].className == "green" || allSpans[i].className == "yellow" || allSpans[i].className == "red"))
    {
        rating = parseInt(allSpans[i].innerHTML);

        allSpans[i].title = "Real score = "+rating;

        if (rating <= 43) rating = "05";
        else if (rating <= 50) rating = 10;
        else if (rating <= 54) rating = 15;
        else if (rating <= 57) rating = 20;
        else if (rating <= 60) rating = 25;
        else if (rating <= 63) rating = 30;
        else if (rating <= 65) rating = 35;
        else if (rating <= 67) rating = 40;
        else if (rating <= 69) rating = 45;
        else if (rating <= 71) rating = 50;
        else if (rating <= 72) rating = 55;
        else if (rating <= 74) rating = 60;
        else if (rating <= 76) rating = 65;
        else if (rating <= 78) rating = 70;
        else if (rating <= 80) rating = 75;
        else if (rating <= 81) rating = 80;
        else if (rating <= 83) rating = 85;
        else if (rating <= 86) rating = 90;
        else if (rating <= 89) rating = 95;
        else if (rating <= 90) rating = 96;
        else if (rating <= 91) rating = 97;
        else if (rating <= 92) rating = 98;
        else if (rating <= 94) rating = 99;
        else rating = 100;

        allSpans[i].innerHTML = rating;
    }
}