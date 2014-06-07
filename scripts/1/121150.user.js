// ==UserScript==
// @name           Bazooka saver
// @namespace      shurmano
// @description    Bazooka saver - fuuuuuuuuuuuuu
// @version        1.0.0
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

// Si te gusta, doname algun GOLD shurmano! :p

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main() {

	var bsaver_state = 1;

	function renderState() {
		var on_url = "http://i921.photobucket.com/albums/ad52/tatowaki/b_on.png";
		var off_url = "http://i921.photobucket.com/albums/ad52/tatowaki/b_off.png";

		var current_url = "";
		var current_alt = "";
		if (bsaver_state == 0) {
			current_url = on_url;
			current_alt = "Bazookas allowed";
		}
		else {
			current_url = off_url;
			current_alt = "Bazookas blocked";
		}

		var n_style = "cursor: pointer; position: absolute; bottom: 20px; left: 15px; height: 45px; width: 61px; display: block;";
		$("#bsaver_holder").remove();
		$("#pvp_actions").after("<div id='bsaver_holder' style='" + n_style + "'><img src='" + current_url + "' alt='" + current_alt + "'></div>");
		$("#bsaver_holder").bind("click", function() {
			if (bsaver_state == 0) {
				bsaver_state = 1;
			}
			else {
				bsaver_state= 0;
			}
			setTimeout(renderState, 100);
		});

		////

	}

	function setAltImage() {
		$(".fighter_weapon_image").each(function () {
			var weapon_url = $(this).attr("src");
			if (weapon_url == "/images/modules/pvp/weapons/weapon_q10.png") {
				$(this).attr("alt","Q10");
			}
			else if (weapon_url == "/images/modules/pvp/weapons/weapon_q5.png") {
				$(this).attr("alt","Q5");
			}
			else {
				$(this).attr("alt","<Q5");
			}
		});
	}

	function checkBazooka() {
		setAltImage();

		var length = $j(".player.left_side").find(".fighter_weapon_image").length;
		if (length == 0)
			return;

		var fighter_weapon_image = $j(".player.left_side").find(".fighter_weapon_image")[length - 1];
		var src = $(fighter_weapon_image).attr("src");
		if (src == "/images/modules/pvp/weapons/weapon_q10.png") {
			$j("#change_weapon").trigger("click");
		}

	}

	$j(document).ready(function() {

		checkBazooka();

		$j(document).ajaxSuccess(function(e, xhr, settings) {
			if (bsaver_state == 0)
				return;

			if (settings.url.match(/military\/fight-shoot$/)) {
				setTimeout(checkBazooka, 500);
			}
			else if (settings.url.match(/military\/change-weapon$/)) {
				setAltImage();
			}
		}); // ajaxSuccess

		$j("#add_damage_btn").bind("click", function(e) {
			if (bsaver_state == 0)
				return;

			setTimeout(checkBazooka, 500);
		});

		renderState();

	}); // ready


} // main

addJQuery(main);
