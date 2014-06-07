// ==UserScript==
// @id             lolkingcolorblind
// @name           lol king colorblind enhancer
// @namespace      http://userscripts.org/users/475731
// @description    Enhances the user experience on lol king, credits for the script go to :http://www.reddit.com/r/leagueoflegends/comments/x4n0q/as_someone_whos_red_green_colourblind_this_is_a/c5j4xxb
// @version        1.0
// @date           2012-07-26
// @include        http://www.lolking.net/*
// ==/UserScript==
var circles = document.getElementsByTagName("circle");

for(var i = 0; i < circles.length; i++){

var oldFill =  circles[i].attr("fill");
var newFill = "#"+oldFill.substr(3,2)+oldFill.substr(3,2)+oldFill.substr(1,2); 

circles[i].attr("fill", newFill);

}