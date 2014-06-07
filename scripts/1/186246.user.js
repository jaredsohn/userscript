// ==UserScript==
// @name        NoSolutionForTGS
// @namespace   TGS
// @description Decoche automatiquement la case "Poser une question a la communaute" 
// @include     *tomsguide.fr/forum/*/nouveau_sujet.htm
// @version     1
// @grant       none
// ==/UserScript==


$(function() {
    try{
        $("#post_question").prop("checked", false);
    }
    catch (err) {
        console.log("Le script a besoin d'une maj");
        console.log("http://userscripts.org/scripts/show/186246");
    }
});
