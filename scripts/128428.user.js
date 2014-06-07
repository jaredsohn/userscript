// ==UserScript==
// @name                    SupLyon Logo & Menu on Campus Booster
// @namespace               http://userscripts.org/scripts/show/128428
// @namespace               http://www.suplyon.fr/
// @description             Add SupLyon Logo & Menu on Campus Booster (SUPINFO).
// @version                 1.0.0
// @date                    05:10 16/03/2012
// @author                  Carsso
// @include                 http://www.campus-booster.net/Booster/students/*
// @license                 Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// @license                 http://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main(){
	if($('.table-boutton tr:last-child td:eq(1)')){
		var suplyon_link = '<a target="_blank" href="https://suplyon.fr"><img alt="SupLyon" src="http://suplyon.fr/images/supinfo_square.png"></a>';
		$('.table-boutton tr:last-child td:eq(1)').html(suplyon_link);
	}
	if($('#SlideMenu1')){
		var suplyon_menu = '<div id="smiSupLyon" onclick="eval(window.open(\'https://suplyon.fr\'))" class="SMParentSelected"><b>SupLyon</b></div>';
		$('#SlideMenu1').append(suplyon_menu);
	}
}
	

addJQuery(main);