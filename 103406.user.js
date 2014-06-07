// ==UserScript==
// @name			patimacro
// @namespace
// @version			1.0.0
// @include			http://forum.paticik.com/posting.php*
// @require			http://code.jquery.com/jquery-1.5.min.js
// ==/UserScript==

function patiMacro()
{

	var magickaList = {
		"Shield": [ /E/g, "http://www.magickapedia.net/images/3/36/Element_shield.png" ],
		"Steam": [ /(QF|FQ|T)/g, "http://www.magickapedia.net/images/d/d6/Element_steam.png" ],
		"Ice": [ /(QR|RQ|G)/g, "http://www.magickapedia.net/images/1/18/Element_ice.png" ], 
		"Water": [ /Q/g, "http://www.magickapedia.net/images/4/42/Element_water.png" ],
		"Lightning": [ /A/g, "http://www.magickapedia.net/images/c/c3/Element_lightning.png" ],
		"Life": [ /W/g, "http://www.magickapedia.net/images/3/32/Element_life.png" ],
		"Arcane": [ /S/g, "http://www.magickapedia.net/images/a/a1/Element_arcane.png" ],
		"Earth": [ /D/g, "http://www.magickapedia.net/images/6/68/Element_earth.png" ],
		"Cold": [ /R/g, "http://www.magickapedia.net/images/e/e8/Element_cold.png" ],
		"Fire": [ /F/g, "http://www.magickapedia.net/images/3/3d/Element_fire.png" ]
	};
	
	var imageMacros = {
		"DealWithIt": [ /dealwithit/g,  "http://i.imgur.com/xBSti.gif" ],
		"TLDR": [ /tldr/g,  "http://forum.paticik.com/thumbnails/41b/ba1/256/0f5/b87/751/5b6/3c4/c85/a98/78_450xNULL.gif" ],
		"CevabVeremedi": [ /cevabveremedi/g,  "http://www.itusozluk.com/img.php/f94c73eb8899289516658257d7698ff93443/cevab+veremedi" ],
		"CloseEnough": [ /closeenough/g,  "http://files.sharenator.com/close_enough_The_Newest_Sharenator-s367x279-103178-475.jpg" ]
	};
	
	var parsers = {
		"Magicka": [/\[magicka\=([QWERTASDFG]*)\]/, magickaList ],
		"ImageMacro": [/\[im=(dealwithit|tldr|cevabveremedi|closeenough)\]/, imageMacros ],
	};
	
	var textArea = $("textarea#body");
	
	this.init = function()
	{	
		$("form#post_form").submit(function(event) {
			$.each(parsers, function(k, p) {
				var oldText = textArea.val();
				var matches = null;
				var safe = 0;
				while((matches = oldText.match(p[0])) != null)
				{
					var spell = matches[1];
					$.each(p[1], function(i, v) {
						spell = spell.replace(v[0], "[img]" + v[1] + "[/img]");
					});
					oldText = oldText.replace(matches[0], spell);
					if(safe >= 50) break;
					safe++;
				}
				textArea.val(oldText);
			});
		});
	}
}

(new patiMacro).init();