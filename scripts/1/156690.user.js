// ==UserScript==
// @name	Script
// @namespace	http://userscripts.org/scripts/review/156690
// @author	Navin
// @version	0.71
// @description	Just a test script
// @include	http*://whentheycry.wikia.com/*/*
// ==/UserScript==

function init(){
$("span, p").each(function() {
    var text = $(this).text();
    text = text.replace("Onikakushi-hen", "First Arc");
    text = text.replace("Watanagashi-hen", "Second Arc");
    text = text.replace("Tatarigoshi-hen", "Third Arc");
    text = text.replace("Himatsubushi-hen", "Fourth Arc");
    text = text.replace("Meakashi-hen", "Fifth Arc");
    text = text.replace("Tusmihirobashi-hen", "Sixth Arc");
    $(this).text(text);
});
}

init();