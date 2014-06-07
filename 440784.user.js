// ==UserScript==
// @name       UTSW_WebC_Drug_List_Flash_Cards
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.2
// @description  Turn the WebC Drug List into Flashcards
// @match      http://medschool.swmed.edu/resources/drugs/*/drug*.php
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

execute(flashcards);

function flashcards() {

$('.info-halfright').toggle();
$('.table-drugs tr').click(function (e) {
 $(e.currentTarget).find('.info-halfright').toggle();
});

}