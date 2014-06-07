// ==UserScript==
// @name			patimagicka
// @namespace
// @version			1.0.1
// @include			http://forum.paticik.com/posting.php*
// @require			http://code.jquery.com/jquery-1.5.min.js
// ==/UserScript==

function patiMagicka()
{
	var elementList = {
		"Shield": [ /E/g, "http://www.magickapedia.net/images/3/36/Element_shield.png"],
		"Steam": [ /(QF|FQ|T)/g, "http://www.magickapedia.net/images/d/d6/Element_steam.png"],
		"Ice": [ /(QR|RQ|G)/g, "http://www.magickapedia.net/images/1/18/Element_ice.png"], 
		"Water": [ /Q/g, "http://www.magickapedia.net/images/4/42/Element_water.png"],
		"Lightning": [ /A/g, "http://www.magickapedia.net/images/c/c3/Element_lightning.png"],
		"Life": [ /W/g, "http://www.magickapedia.net/images/3/32/Element_life.png"],
		"Arcane": [ /S/g, "http://www.magickapedia.net/images/a/a1/Element_arcane.png"],
		"Earth": [ /D/g, "http://www.magickapedia.net/images/6/68/Element_earth.png"],
		"Cold": [ /R/g, "http://www.magickapedia.net/images/e/e8/Element_cold.png"],
		"Fire": [ /F/g, "http://www.magickapedia.net/images/3/3d/Element_fire.png"]
	};
	
	var textArea = $("textarea#body");
	
	this.init = function()
	{
		/*var mBtn = $("<a>").html("");
		var mImg = $("<img>").html("");
		$(mImg).addClass("editor-tools-button").css("width", 21).css("height", 20).attr("src", "http://www.magickapedia.net/images/a/a1/Element_arcane.png").css("padding", "2px").attr("alt", "Magicka");
		$(mImg).appendTo(mBtn);
		//$(mBtn).appendTo("div#editor_tools");*/
		$("form#post_form").submit(function(event) {
			var oldText = textArea.val();
			var matches = null;
			while((matches = oldText.match(/\[magicka\=([QWERTASDFG]*)\]/)) != null)
			{
				var spell = matches[1];
				$.each(elementList, function(i, v) {
					spell = spell.replace(v[0], "[img]" + v[1] + "[/img]");
				});
				//for(var k in elementList) spell = spell.replace(k[0], "[img]"+k[0][1]+"[/img]");
				oldText = oldText.replace(matches[0], spell);
			}
			textArea.val(oldText);
		});
	}
}

(new patiMagicka).init();