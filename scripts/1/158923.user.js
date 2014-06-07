// ==UserScript==
// @name        Strategus Tool-belt (improved interface)
// @namespace   chy_strategus
// @description Improved information interface
// @include     http://strategus.c-rpg.net/*
// @downloadURL http://userscripts.org/scripts/source/158923.user.js
// @updateURL   http://userscripts.org/scripts/source/158923.meta.js
// @version     1.3
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
	
	script = document.createElement("script");
	script.setAttribute("src", "https://raw.github.com/padolsey/jQuery-Plugins/master/sortElements/jquery.sortElements.js");
	document.body.appendChild(script);
}
 
function main() {
	// define another variable for jquery to avoid conflict (eg:map)
	jq183 = jQuery.noConflict(true);
	
	// #### Redirect system #### //
	if(localStorage.getItem("chy_custom_redirect") == 1) {
		var currentPage = jq183(location).attr('href');
		const root = 'http://strategus.c-rpg.net/news.php';
		var route = currentPage.split(root);
		route = route[1];
		route = route[0] + route[1] + route[2] + route[3] + route[4];
		
		// if message redirect
		if(route == "?msg=") {
			// hidding info page elements for fancy redirect
			jq183("#message").css('display', 'none');
			jq183("#info_page").css('display', 'none');
			
			window.stop();
			
			// stocking message for display in the redirected page
			var message = currentPage.split('?msg=');
			message = message[1];
			localStorage.chy_message = message;
			
			jq183(location).attr('href', localStorage.chy_last_localtion);
		} else {
			// stocking the current page for any redirect
			localStorage.chy_last_localtion = jq183(location).attr('href');
			
			if(localStorage.chy_message !== null) {
				var oldString = localStorage.chy_message + "";
				var newString = "";
			
				jq183.each(oldString, function(key, value) {
					if(value != "+") {
						newString = newString + value;
					} else {
						newString = newString + " ";
					}
				});

				if(newString !== null && newString != "") {
					jq183("#header").append('<div id="message">'+newString+'</div>');
					localStorage.chy_message = "";
				}
			}
		}
	}
	
	jq183(document).ready(function() {
		// #### Options #### //
		jq183("#maintabs").append('<a id="chy_tool_box_button">Settings</a>');
		jq183("html").append('<div id="chy_tool_box"><div class="chy_content"><h2 style="float:left;">Chy\'s MegaBox Options</h2><a class="chy_select_btn" id="chy_tool_box_quit">X</a><div style="clear:both"></div><hr /><div id="chy_option_general"><h3>General</h3></div><hr /><div id="chy_option_info"><h3>Info</h3></div><hr /><div id="chy_option_submit" class="chy_select_btn">Apply</div></div></div>');
		jq183("html").append('<div id="chy_tool_box_bg"></div>');
		
		// Custom redirect - default true
		jq183("#chy_option_general").append('<p class="chy_input_text">Custom redirect</p><input type="checkbox" id="chy_custom_redirect" /><br />');
		if(localStorage.getItem("chy_custom_redirect") === null) {
			localStorage.setItem("chy_custom_redirect", 1);
			jq183("#chy_custom_redirect").attr('checked', 'checked');
		} else {
			if(localStorage.getItem("chy_custom_redirect") == 1)
				jq183("#chy_custom_redirect").attr('checked', 'checked');
		}
		
		// Moderns buttons
		jq183("#chy_option_general").append('<p class="chy_input_text">Use custom buttons</p><input type="checkbox" id="chy_custom_buttons" /><br />');
		if(localStorage.getItem("chy_custom_buttons") === null) {
			localStorage.setItem("chy_custom_buttons", 1);
			jq183("#chy_custom_buttons").attr('checked', 'checked');
		} else {
			if(localStorage.getItem("chy_custom_buttons") == 1)
				jq183("#chy_custom_buttons").attr('checked', 'checked');
		}
		
		// Intensified info colors - default 20%
		jq183("#chy_option_info").append('<p class="chy_input_text">Use intensified colors loom level</p><input type="checkbox" id="chy_color_intensity" /><br />');
		if(localStorage.getItem("chy_color_intensity") === null) {
			localStorage.setItem("chy_color_intensity", 0.2);
			jq183("#chy_color_intensity").attr('checked', 'checked');
		} else {
			if(localStorage.getItem("chy_color_intensity") == 0.2)
				jq183("#chy_color_intensity").attr('checked', 'checked');
		}
		
		// Default info filter operator - default >=
		jq183("#chy_option_info").append('<p class="chy_input_text">Default operator</p><select class="chy_input_select" id="chy_option_filter_operator"></select><br />');
		if(localStorage.getItem("chy_default_filter") === null)
			localStorage.chy_default_filter = '>=';
		if(localStorage.chy_default_filter == '<=')
			jq183('#chy_option_filter_operator').append('<option selected value="<=">&le;</option>');
		else
			jq183('#chy_option_filter_operator').append('<option value="<=">&le;</option>');
			
		if(localStorage.chy_default_filter == '>=')
			jq183('#chy_option_filter_operator').append('<option selected value=">=">&ge;</option>');
		else
			jq183('#chy_option_filter_operator').append('<option value=">=">&ge;</option>');
			
		if(localStorage.chy_default_filter == '=')
			jq183('#chy_option_filter_operator').append('<option selected value="=">=</option>');
		else
			jq183('#chy_option_filter_operator').append('<option value="=">=</option>');
			
		if(localStorage.chy_default_filter == '!=')
			jq183('#chy_option_filter_operator').append('<option selected value="!=">&ne;</option>');
		else
			jq183('#chy_option_filter_operator').append('<option value="!=">&ne;</option>');
			
		// Default info filter number - default -3
		jq183("#chy_option_info").append('<p class="chy_input_text">Default level</p><select class="chy_input_select" id="chy_option_filter_number"></select><br />');
		if(localStorage.getItem("chy_default_filter_number") === null)
			localStorage.chy_default_filter_number = '-3';
			
		jq183.each([-3, -2, -1, 0, 1, 2, 3], function(index, value) {
			if(localStorage.chy_default_filter_number == value)
				jq183('#chy_option_filter_number').append('<option selected value='+value+'>'+value+'</option>');
			else
				jq183('#chy_option_filter_number').append('<option value='+value+'>'+value+'</option>');
		});
		
		// Default info filter category - default cat01
		var categories = new Array();
		categories[0]  = new Array("cat00", "Trading goods");
		categories[1]  = new Array("cat01", "Horses");
		categories[2]  = new Array("cat14", "Throwing"); 
		categories[3]  = new Array("cat02", "Body armors"); 
		categories[4]  = new Array("cat03", "Head armors");
		categories[5]  = new Array("cat04", "Leg armors");
		categories[6]  = new Array("cat05", "Hand armors"); 
		categories[7]  = new Array("cat06", "Polearms");
		categories[8]  = new Array("cat07", "Two handed");
		categories[9]  = new Array("cat08", "One handed"); 
		categories[10] = new Array("cat09", "Shields"); 
		categories[11] = new Array("cat10", "Bows"); 
		categories[12] = new Array("cat11", "Arrows");
		categories[13] = new Array("cat12", "Crossbows"); 
		categories[14] = new Array("cat13", "Bolts");
		categories[15] = new Array("cat14", "Siege");
		categories[16] = new Array("-1", "All Items");
		
		jq183("#chy_option_info").append('<p class="chy_input_text">Default category</p><select class="chy_input_select" id="chy_option_filter_category"></select>');
		if(localStorage.getItem("chy_default_filter_category") === null)
			localStorage.chy_default_filter_category = 'cat01';
		jq183.each(categories, function(index, value) {
			if(localStorage.chy_default_filter_category == value[0])
				jq183('#chy_option_filter_category').append('<option selected value='+value[0]+'>'+value[1]+'</option>');
			else
				jq183('#chy_option_filter_category').append('<option value='+value[0]+'>'+value[1]+'</option>');
		});
		
		var height = jq183("#chy_tool_box").height();
		height = height/2 * -1;
		height = parseInt(height);
		jq183("#chy_tool_box").css('margin-top', height);
		
		jq183('#chy_tool_box_button').click(function() {
			jq183('#chy_tool_box').toggle(500);
			jq183('#chy_tool_box_bg').toggle(0);
		});
		
		jq183('#chy_tool_box_quit').click(function() {
			jq183('#chy_tool_box').toggle(500);
			jq183('#chy_tool_box_bg').toggle(0);
		});
		
		jq183('#chy_option_submit').click(function() {
			if(jq183('#chy_custom_redirect').attr('checked') == 'checked')
				localStorage.setItem("chy_custom_redirect", 1);
			else
				localStorage.setItem("chy_custom_redirect", 0);
				
			if(jq183('#chy_custom_buttons').attr('checked') == 'checked')
				localStorage.setItem("chy_custom_buttons", 1);
			else
				localStorage.setItem("chy_custom_buttons", 0);
				
			if(jq183('#chy_color_intensity').attr('checked') == 'checked')
				localStorage.setItem("chy_color_intensity", 0.2);
			else
				localStorage.setItem("chy_color_intensity", 0.1);
			
			localStorage.chy_default_filter = jq183('#chy_option_filter_operator option:selected').attr('value');
			localStorage.chy_default_filter_number = jq183('#chy_option_filter_number option:selected').attr('value');
			localStorage.chy_default_filter_category = jq183('#chy_option_filter_category option:selected').attr('value');
			
			location.reload();
		});

		// #### Information management #### //
		if(jq183(location).attr('href') == 'http://strategus.c-rpg.net/news.php?inv') {
			// in city
			if(jq183('.in.sellitemsinput').size() > 0) {
				var items = new Array();
				var itemsId = new Array(); 
				var itemsIcon = new Array();
				var itemsQuality = new Array();
				var started = 0;
				var finished = 0;
				
				jq183('#sub').append('<div class="block"><div style="padding-left:20px;padding-right:20px;"><h2>Strategus Tool-belt</h2><div id="chyLoadingProgress">Click here to update items pool</div></div></div>');
				
				function chyCheckAjax() {
					if(started == finished) {
						jq183('#chyLoadingProgress').text(finished + ' Items Loaded !');
						jq183('#chyLoadingProgress').css('color', 'green');
						localStorage.chy_items = items.toString();
						localStorage.chy_itemsIcon = itemsIcon.toString();
						localStorage.chy_itemsId = itemsId.toString();
						localStorage.chy_itemsQuality = itemsQuality.toString();
					}
				}
				
				// collect IDs
				jq183('#chyLoadingProgress').click(function() {
					if(started == 0) {
						// if item have ID
						jq183('#chyLoadingProgress').text('Loading items, please wait...');
						jq183('#chyLoadingProgress').css('color', 'red');
						jq183(".in.sellitemsinput").each(function(index) {
							if(jq183(this).parent().parent().parent().children().children('.itemstats').size() > 0) {
								// get UserItemId
								var id = jq183(this).attr('name');
								id = id.split('sell[');
								id = id[1];
								id = id.split(']');
								id = id[0];
								
								// get ItemId
								var itemId = jq183(this).parent().parent().parent().children().children('.itemstats').attr('rel');
								itemId = itemId.split('itemstats.php?i=');
								itemId = itemId[1];
								itemId = itemId.split('&m=');
								itemId = itemId[0];
								
								// set data
								items[index] = id;
								itemsId[index] = itemId;
								itemsIcon[index] = jq183(this).parent().parent().parent().children().children('.itemstats').attr('src');
								
								// load ajax data
								var quality;
								started++;
								jq183.ajax({
									url: jq183(this).parent().parent().parent().children().children('.itemstats').attr('rel'),
								}).done(function(html) {
									quality = html;
									quality = quality.split('<div class="itmstats">');
									quality = quality[1];
									quality = quality.split(' ');
									quality = quality[0];
									itemsQuality[index] = quality;
									finished++;
									chyCheckAjax();
								});
							}
						});
					}
				});
			}
		} else if(jq183(location).attr('href') == 'http://strategus.c-rpg.net/news.php?info') {
			// can transfer && have updated once
			if(jq183('#info_page fieldset table').size() > 0 && localStorage.getItem("chy_items") !== null) {
				jq183('#info_page').css('top','175px');
				jq183('#info_page').css('position','relative');
			
				// thanks to Dodnet for this list =)
				var allItems = new Array();
				allItems[0]  = new Array("cat00", "Trading goods", "/img/equip_inv.png", 0);
				allItems[1]  = new Array("cat01", "Horses", "/img/equip_horse.png", 1, 2, 3, 4, 10, 5, 6, 7, 8, 524, 525, 9, 526, 527);
				allItems[2]  = new Array("cat14", "Throwing", "/img/equip_throw.png", 23, 25, 26, 28, 29, 32, 34, 5142, 46, 47, 48, 36, 38, 30, 40, 42, 44); 
				allItems[3]  = new Array("cat02", "Body armors", "/img/equip_body.png", 364, 369, 366, 367, 368, 370, 372, 373, 374, 375, 376, 412, 413, 371, 378, 377, 379, 431, 432, 5393, 5498, 381, 382, 384, 383, 386, 385, 390, 389, 4722, 5500, 391, 5169, 387, 388, 394, 392, 399, 393, 395, 396, 397, 398, 416, 400, 417, 419, 472, 418, 403, 434, 420, 5501, 437, 438, 3971, 404, 440, 365, 401, 402, 414, 415, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 433, 5394, 5919, 442, 443, 3130, 444, 3137, 4952, 445, 4723, 5502, 447, 405, 454, 5738, 5741, 5507, 407, 408, 409, 410, 411, 459, 5506, 441, 448, 450, 458, 461, 4947, 4948, 4949, 4950, 4951, 446, 5916, 460, 451, 4957, 439, 5505, 4958, 5918, 449, 455, 457, 5739, 5740, 5742, 456, 452, 435, 406, 4955, 453, 4720, 4956, 5504, 5509, 5499, 462, 463, 4953, 4954, 436, 3972, 5917, 469, 5496, 464, 465, 466, 467, 5508, 473, 474, 475, 4721, 476, 477, 478, 480, 5503, 5497, 468, 547, 541, 545, 471, 380, 470, 479); 
				allItems[4]  = new Array("cat03", "Head armors", "/img/equip_head.png", 273, 283, 255, 256, 257, 258, 259, 260, 261, 262, 279, 280, 284, 5915, 263, 295, 268, 264, 265, 266, 267, 294, 298, 299, 5162, 270, 272, 274, 275, 276, 277, 278, 309, 495, 271, 286, 281, 285, 5484, 5168, 287, 288, 289, 290, 291, 292, 312, 348, 282, 269, 300, 293, 296, 5914, 302, 297, 301, 307, 303, 5159, 5160, 5161, 304, 353, 5155, 5156, 5157, 5163, 5164, 5165, 305, 317, 319, 321, 306, 308, 311, 3968, 5733, 310, 326, 347, 349, 350, 5158, 5730, 5737, 314, 323, 313, 320, 322, 330, 549, 4938, 5385, 5386, 315, 324, 325, 5486, 5487, 5913, 5494, 318, 327, 329, 328, 5492, 5736, 338, 5483, 5488, 5489, 5734, 5910, 494, 5493, 5731, 331, 504, 546, 5490, 332, 335, 4944, 5491, 333, 363, 4939, 4942, 5166, 334, 336, 337, 361, 3969, 4941, 4945, 5167, 5482, 5735, 5912, 316, 339, 359, 4943, 5485, 362, 5384, 340, 360, 507, 341, 4940, 5495, 5732, 5911, 342, 503, 540, 5885, 343, 4946, 5388, 5389, 506, 5390, 5391, 5392, 344, 345, 346, 351, 352, 356, 5154, 354, 355, 357, 5387, 358, 509, 492, 5383); 
				allItems[5]  = new Array("cat04", "Leg armors", "/img/equip_leg.png", 218, 219, 220, 5479, 5480, 5727, 5906, 222, 223, 221, 224, 4936, 225, 226, 228, 5153, 227, 229, 5907, 230, 3966, 4937, 5729, 5728, 234, 5908, 235, 238, 233, 3967, 5909, 236, 232, 4935, 244, 237, 231, 239, 243, 240, 242, 241); 
				allItems[6]  = new Array("cat05", "Hand armors", "/img/equip_hand.png", 245, 246, 5884, 253, 251, 252, 247, 248, 249, 550, 543, 542, 254, 5481, 533); 
				allItems[7]  = new Array("cat06", "Polearms", "/img/equip_polearm.png", 552, 89, 90, 91, 491, 132, 111, 101, 93, 92, 5371, 94, 99, 100, 123, 95, 107, 116, 103, 133, 104, 108, 4754, 96, 109, 4753, 112, 98, 120, 122, 110, 102, 5856, 118, 5855, 113, 106, 5857, 119, 105, 114, 5858, 117, 4692, 124, 115, 97, 126, 128, 531, 532, 530); 
				allItems[8]  = new Array("cat07", "Two handed", "/img/equip_twohand.png", 502, 129, 130, 137, 131, 136, 139, 134, 138, 519, 147, 143, 189, 140, 142, 149, 135, 150, 148, 146, 144, 517, 518, 145, 152, 151, 153, 154, 158, 141, 155, 156, 3320, 157, 159, 522, 521, 160);
				allItems[9]  = new Array("cat08", "One handed", "/img/equip_onehand.png", 489, 161, 162, 164, 165, 166, 168, 500, 3322, 167, 173, 172, 5900, 551, 171, 554, 169, 163, 178, 174, 170, 5372, 177, 180, 175, 184, 179, 185, 187, 183, 181, 190, 186, 499, 191, 188, 200, 192, 197, 196, 201, 182, 176, 205, 206, 202, 194, 3195, 195, 3194, 193, 207, 4755, 516, 203, 211, 209, 208, 204, 213, 198, 520, 215, 212, 3192, 214, 3196, 3298, 217, 3190, 216, 210, 3193, 3323, 199, 510, 523, 3191); 
				allItems[10] = new Array("cat09", "Shields", "/img/equip_shield.png", 490, 497, 488, 508, 52, 49, 53, 58, 51, 50, 54, 60, 59, 55, 74, 75, 79, 56, 57, 62, 80, 505, 496, 498, 61, 493, 72, 64, 66, 70, 73, 501, 77, 85, 76, 71, 83, 86, 81, 82, 78, 63, 65, 67, 68, 69, 84, 87, 544, 548, 88); 
				allItems[11] = new Array("cat10", "Bows", "/img/equip_bow.png", 17, 16, 18, 19, 21, 5141, 22, 20); 
				allItems[12] = new Array("cat11", "Arrows", "/img/equip_arrow.png", 481, 482, 484, 483);
				allItems[13] = new Array("cat12", "Crossbows", "/img/equip_crossbow.png", 11, 12, 13, 14, 15); 
				allItems[14] = new Array("cat13", "Bolts", "/img/equip_bolt.png", 485, 486);
				allItems[15] = new Array("cat15", "Siege", "http://i.imgur.com/hqOiC2p.png", 528, 536, 534, 529, 537, 535, 539, 538);
				
				// categories by item name (for fief's items filters)
				var allItemsNames = new Array();
				allItemsNames[0] = new Array("cat00");
				allItemsNames[1]  = new Array("cat01","Sumpter Horse","Rouncey","Steppe Horse","Desert Horse","Palfrey","Courser","Arabian Warhorse","Destrier","War Horse","Large Warhorse","Cataphract Horse","Charger","Mamluk Horse","Plated Charger");
				allItemsNames[2]  = new Array("cat14","Stones","Throwing Knives","Darts","Throwing Daggers","Smoke Bomb","War Darts","Francisca","Throwing Hammer","4-Point Shuriken","6-Point Shuriken","Snowflake","Throwing Axe","Heavy Throwing Axe","Javelins","Throwing Spear","Jarid","Throwing Lance");
				allItemsNames[3]  = new Array("cat02","Shirt","Linen Tunic","Dress","Blue Dress","Peasant Dress","Tunic with Green Cape","Short Tunic","Red Shirt","Red Tunic","Green Tunic","Blue Tunic","White Tunic","Yellow Tunic","Woolen Dress","Pelt Coat","Rawhide Coat","Robe","Black Sarranid Dress","Sarranid Dress","Monk's Robe","Turkish Robe","Worn Desert Robe","Worn Robe","Tunic with vest","Khergit Armor","Leather Apron","Leather Jacket","Fur Coat","Tabard","Kaftan","Deli Robe","Leather Vest","Kazakh Outfit","Leather Armor","Skirmisher Armor","Nomad Armor","Steppe Armor","Pilgrim Disguise","Gambeson","Blue Gambeson","Red Gambeson","Aketon","Padded Cloth","Nomad Vest","Leather Jerkin","Ragged Outfit","Sarranid Padded Vest","Padded Jack","Light Leather","Padded Armor","Tribal Warrior Outfit","Padded Leather","Peltastos Armor","Nomad Robe","Sarranid Leather Armor","Light Strange Armor","Heavy Aketon","Byrnie","Nord Nobleman Outfit","Courtly Outfit","Nobleman Outfit","Court Dress","Rich Outfit","Red Lady Dress","Green Lady Dress","Blue Lady Dress","Red Dress","Brown Dress","Green Dress","Khergit Lady Dress","Khergit Leather Lady Dress","Purple Sarranid Lady Dress","Orange Sarranid Lady Dress","Bride Dress","Priest's Robe","Eastern Civilian's Robe","Lamellar Vest","Khergit Lamellar Vest","Black Lamellar Vest","Cavalry Robe","Dark Cavalry Robe","Byrnja","Mail Shirt","Druzhina Mail Shirt","Skutatos Armor","Mail Hauberk","Red Brigandine over Aketon","Scale Armor","Blue Brigandine over Aketon","Green Brigandine over Aketon","Palace Guard Armor","Red Tunic over Mail","Green Tunic over Mail","Blue Tunic over Mail","Yellow Tunic over Mail","White Tunic over Mail","Heraldic Mail","Archon's Armor","Haubergeon","Sarranid Mail Shirt","Mail with Surcoat","Heraldic Mail with Surcoat","Heraldic Mail with Tabard","Black Surcoat over Mail","White Surcoat over Mail","Brown Surcoat over Mail","Purple Surcoat over Mail","Blue Surcoat over Mail","Strange Armor","Eastern Lamellar with Jacket","Heraldic Mail with Tunic","Surcoat over Mail","Light Kuyak","Studded Leather over Mail","Mongol Armor","Heavy Kuyak","Eastern Lamellar Robe","Sarranid Guard Armor","Banded Armor","Cuir Bouilli over Mail","Green Brigandine over Mail","Blue Brigandine over Mail","Red Brigandine over Mail","Mamluke Mail","Brigandine","Light Mail and Plate","Brown Rus Lamellar Cuirass","Green Rus Lamellar Cuirass","Lamellar Armor","Druzhina Lamellar Armor","Rus Scale Armor","Katafraktoi Armor","Pronoia Armor","Sipahi Yawshan","Black Coat of Plates","Red Coat of Plates","Blue Coat of Plates","Green Coat of Plates","Mail and Plate","Heavy Strange Armor","Eastern Star-Scale Armor","Black Armor","Black Armor with Stripes","Khergit Elite Armor","Vaegir Elite Armor","Sarranid Elite Armor","Khergit Guard Armor","Clibanarius Armor","Red Corrazina Armor","Green Corrazina Armor","Grey Corrazina Armor","Druzhina Elite Lamellar Armor","White Transitional Armor with Surcoat","Orange Transitional Armor with Surcoat","Blue Transitional Armor with Surcoat","Heraldic Transitional Armour","Varangopoulos Armor","Heavy Yawshan","Plate Armor","Blue Churburg Cuirass","Red Churburg Cuirass","Churburg Cuirass","Gothic Plate","Heavy Plate Armor","Milanese Plate","Gothic Plate with Bevor");
				allItemsNames[4]  = new Array("cat03","Straw Hat","Head Wrapping","Purple Lady Head Cloth","Orange Lady Head Cloth","Brown Head Cloth","Head Cloth","Headcloth","Khergit Lady Hat","Khergit Lady Leather Hat","Crown of Flowers","Wimple","Wimple with Veil","Sarranid Felt Hat","Eastern Civilian's Cap","Woolen Cap","Barbette","Arming Cap","Woolen Hood","Fur Hat","Felt Hat","Felt Cap","Plain Turret Hat","Blue Turret Hat","Red Turret Hat","Deli Cap","Nomad Cap","Leather Cap","Yellow Hood","Green and Yellow Hood","Purple and Green Hood","Blue Hood","Lady's Hood","Black Hood","Black Hood with Mask","Padded Coif","Turban","Horned Steppe Cap","Steppe Cap with Fur","Turban Hat","Kazakh Hat","Pilgrim Hood","Leather Steppe Cap","Desert Turban","Nordic Leather Helmet","Cap with Fur","Steppe Cap","Felt Steppe Cap","Turban Helmet","Leather Warrior Cap","Spiked Nomad Cap","Sarranid Warrior Cap","Skullcap","Nordic Leather Helmet with Rings","Eastern Soldier's Hat","Vaegir Helmet","Mail Coif","Footman's Helmet","Horseman Helmet","Nasal Helmet","Solak Helmet","Crested Solak Helmet","Crested Solak Helmet with Plume","Norman Helmet","Yellow Arena Helmet","Red Arena Helmet","Blue Arena Helmet","Green Arena Helmet","Boerk","Crested Boerk","Crested Boerk with Plume","Nordic Footman Helmet","Magyar Helmet","Sipahi Helmet","Rabati","Segmented Helmet","Helmet with Neckguard","Spiked Cap","Light Strange Helmet","Kettle Hat with Padded Coif","Flat Topped Helmet","Khergit Helmet","White Steppe Helmet","Green Steppe Helmet","Red Steppe Helmet","Blue Steppe Helmet","Iron Hat with Padded Coif","Chapel de Fer with Padded Coif","Nordic Fighter Helmet","Khergit War Helmet","Kettle Hat","Shahi","Sarranid Keffiyeh Helmet","Khergit Cavalry Helmet","Kettle Helmet","Light Strange War Mask","Broad Brimmed Kettle Helmet","Blue Kettle Helmet","Spiked Helmet","Nordic Helmet","Helmet with Lamellar Guard","Roman Helmet","Red Roman Helmet","Eastern Footman's Helmet","Skutatos Helmet","Rus Helmet","Nordic Huscarl's Helmet","Khergit Guard Helmet","Sarranid Mail Coif","Golden Horde Helmet","Chapel de Fer with Aventail","Strange Helmet","Turban Helmet","Roman Helmet with Veil","Red Roman Helmet with Veil","Kettle Hat with Aventail","Eastern Cavalry Helmet","Nordic Pot Helmet","Fluted Varangian Helmet","Iron Hat with Aventail","Bascinet","Nordic Conical Helmet","Onion Top Bascinet","Clibanarius Helmet","Bascinet with Aventail","Vaegir Nobleman Helmet","Tagancha Helm","Pronoia Helmet","Bascinet with Nose Guard","Blue Morion","Strange War Mask","Gnezdovo Helmet","Chichak","Guard Helmet","Sarranid Veiled Helmet","Vaegir War Helmet","Chapel de Fer","Heavy Strange Helmet","Novogrod Helm","Tagancha Helm with Veil","Elite Cavalry Chichak","Veiled Turban Helmet","Zitta Bascinet","Eastern Helm With Aventail","Byzantion Helmet","Nordic Warlord Helmet","Open Sallet","Nikolskoe Helm","Gjermundbu Helmet","Morion","Byzantion Helmet","Barbuta","Open Sallet with Coif","Barbutte","Faceplate","Heavy Strange War Mask","Varangopoulos Bascinet","Zitta Bascinet with Faceplate","Eastern Masked Cavalry Helmet","Vaegir War Mask","Klappvisier","Pigface Klappvisier","Black Helmet","Great Helmet","Litchina Helm","Blue Great Helmet","Red Great Helmet","Great Helmet with Hat","Gotland Helmet","Topfhelm","Rounded Topfhelm","Winged Great Helmet","White Tournament Helmet","Red Tournament Helmet","Green Tournament Helmet","Blue Tournament Helmet","Sugarloaf Helmet","Yellow Tournament Helmet","Hounskull Bascinet","Sugarloaf Helmet with Coif","Sallet with Visor","Great Bascinet","Sallet with Visor and Coif","Milanese Sallet","Armet","Weimar Helmet");
				allItemsNames[5]  = new Array("cat04","Wrapping Boots","Woolen Hose","Blue Hose","Bear Paw Shoes","Turkish Shoes","Green and Purple Hose","Eastern Cloth Shoes","Sarranid Shoes","Bride Shoes","Hunter Boots","Hide Boots","Rus Shoes","Ankle Boots","Khergit Leather Boots","Sarranid Leather Boots","Kazakh Boots","Nomad Boots","Light Leather Boots","Eastern Leather Greaves","Leather Boots","Light Strange Greaves","Rus Cavalry Boots","Red Hose with Kneecops","Green Hose with Kneecops","Strange Greaves","Eastern Lamellar Greaves","Mail Chausses","Sarranid Mail Boots","Splinted Leather Greaves over Mail","Heavy Strange Greaves","Eastern Black Greaves","Splinted Greaves","Plated Boots","Rus Splinted Greaves","Splinted Greaves with Spurs","Mail Boots","Khergit Guard Boots","Iron Greaves","Shynbaulds","Plate Boots","Cased Greaves","Black Greaves");
				allItemsNames[6]  = new Array("cat05","Leather Gloves","Mail Mittens","Light Strange Gloves","Mail Gauntlets","Wisby Gauntlets","Red Wisby Gauntlets","Scale Gauntlets","Lamellar Gauntlets","Gauntlets","Polished Gauntlets","Hourglass Gauntlets","Gilded Hourglass Gauntlets","Plate Mittens","Black Gauntlets","Heavy Gauntlets");
				allItemsNames[7]  = new Array("cat06","Trident","Pitch Fork","Staff","Scythe","Practice Lance","Voulge","Quarter Staff","Jousting Lance","Boar Spear","Shortened Spear","Fauchard","Bamboo Spear","Military Fork","Military Scythe","Great Lance","Spear","Long Spiked Club","Iron Staff","Light Lance","Long Voulge","Hafted Blade","Lance","Pike","Long Spear","Long Hafted Knobbed Mace","Red Tassel Spear","Long Hafted Spiked Mace","War Spear","Long Axe","Long Bardiche","Battle Fork","Long Maul","Ranseur","Swiss Halberd","Spetum","Awlpike","Double Sided Lance","Corseque","Long Awlpike","Ashwood Pike","Long Hafted Blade","Partisan","Heavy Lance","English Bill","Long War Axe","Glaive","Bec de Corbin","Great Long Axe","Great Long Bardiche","Poleaxe","German Poleaxe","Elegant Poleaxe");
				allItemsNames[8]  = new Array("cat07","Practice Longsword","Axe","Two Handed Axe","Battle Axe","Maul","Shortened Voulge","Shortened Military Scythe","Two Handed War Axe","War Axe","Studded Warclub","Goedendag","Bastard Sword","Mace","Persian War Axe","Bardiche","Dadao","Mallet","Heavy Bastard Sword","Long Iron Mace","Persian Battle Axe","Morningstar","Longsword","Bar Mace","Great Axe","War Cleaver","Great Bardiche","Two Handed Sword","Miaodao","Katana","Great Maul","Heavy Great Sword","Great Sword","Highland Claymore","Sword of War","Nodachi","German Greatsword","Danish Greatsword","Flamberge");
				allItemsNames[9]  = new Array("cat08","Practice Dagger","Wooden Stick","Cudgel","Sickle","Club","Hatchet","Peasant Knife","Practice Sword","Knife","Cleaver","Light Spiked Club","Dagger","Rondel Dagger","Torch","Pickaxe","Long Dagger","Khyber Knife","Hammer","Falchion","Spiked Club","Hand Axe","Short Falchion","Knobbed Mace","Fighting Pick","One Handed Axe","Short Sword","Nomad Sabre","Spiked Mace","Simple Sword","Simple Nordic Sword","Arabian Straight Sword","One Handed War Axe","Nordic Short Sword","Nordic Sword","Yanmaodao","Flanged Mace","Sword","Soldier's Cleaver","Military Sickle","Fighting Axe","Short Arming Sword","Light One Handed Battle Axe","Iron Mace","Nordic Short War Sword","Liuyedao","Iron Battle Axe","Winged Mace","Italian Falchion","Arabian Arming Sword","Scottish Sword","Scimitar","Iron War Axe","Shashka","Iberian Mace","Military Cleaver","Arming Sword","Nordic War Sword","Niuweidao","Military Pick","Arabian Guard Sword","One Handed Battle Axe","Broad Short Sword","Military Hammer","Long Arming Sword","Italian Sword","Arabian Cavalry Sword","Grosse Messer","Langes Messer","Wakizashi","Espada Eslavona","Broad One Handed Battle Axe","Elite Scimitar","Side Sword","Steel Pick","Knightly Arming Sword","Nordic Champion's Sword","Warhammer","Long Espada Eslavona");
				allItemsNames[10]  = new Array("cat09","Yellow Practice Shield","Red Practice Shield","Green Practice Shield","Blue Practice Shield","Hide Covered Round Shield","Old Round Shield","Wooden Shield","Leather Covered Round Shield","Old Heater Shield","Old Kite Shield","Old Board Shield","Plain Cavalry Shield","Nordic Shield","Plain Round Shield","Round Cavalry Shield","Horseman's Kite Shield","Horseman's Heater Shield","Plain Kite Shield","Plain Heater Shield","Plain Board Shield","Brown Lion Heater Shield","Green Crescent Heater Shield","Black and White Kite Shield","Brown Kite Shield","Round Shield","White Black and Red Kite Shield","Kite Shield","Green Norman Shield","Yellow Norman Shield","Blue Norman Shield","Heater Shield","Blue and Purple Kite Shield","Board Shield","Elite Cavalry Shield","Heavy Round Shield","Plate Covered Round Shield","Knightly Kite Shield","Knightly Heater Shield","Heavy Kite Shield","Heavy Heater Shield","Fur Covered Shield","Brown Heavy Norman Shield","Blue Heavy Norman Shield","Dark Blue Heavy Norman Shield","Dark Red Heavy Norman Shield","White Heavy Norman Shield","Heavy Board Shield","Huscarl's Round Shield","Steel Buckler","Round Steel Buckler","Steel Shield");
				allItemsNames[11]  = new Array("cat10","Short Bow","Bow","Nomad Bow","Tatar Bow","Horn Bow","Yumi","Rus Bow","Long Bow");
				allItemsNames[12]  = new Array("cat11","Arrows","Barbed Arrows","Tatar Arrows","Bodkin Arrows");
				allItemsNames[13]  = new Array("cat12","Hunting Crossbow","Light Crossbow","Crossbow","Heavy Crossbow","Arbalest");
				allItemsNames[14]  = new Array("cat13","Bolts","Steel Bolts");
				allItemsNames[15]  = new Array("cat15","Small Wooden Ladder","Wooden Ladder","Medium Wooden Ladder","Large Wooden Ladder","Siege Shield","Siege Ladder","Construction Material","Construction Site");
				
				const goldImage = 'http://diablo3.ingame.de/files/2011/08/goldsack.png';
				const troopsImage = 'http://image.eveonline.com/Corporation/176444979_128.png';
				const goodsImage = 'http://www.thesimalogue.com/uploads/4/4/2/1/4421597/_7340596_orig.png';
				
				var items = localStorage.chy_items.split(','); 
				var itemsIcon = localStorage.chy_itemsIcon.split(',');
				var itemsId = localStorage.chy_itemsId.split(',');
				var itemsQuality = localStorage.chy_itemsQuality.split(',');
				var itemCat = "cat00";
				var itemCatName = "Trading goods";
				var filterId = localStorage.chy_default_filter_category;

				jq183('table tbody tr').first().prepend('<td><b>Icon</b></td>');
				
				// -- controls --
				jq183('#info_page').prepend('<div id="chy_filter_controller"></div>');
				
				// loom filter bar
				jq183('#chy_filter_controller').append('<p class="chy_input_text">Show items</p> <select class="chy_input_select" id="chy_quality_bar_inter"></select> <select class="chy_input_select" id="chy_quality_bar"></select><br />');
				
				if(localStorage.chy_default_filter == '<=')
					jq183('#chy_quality_bar_inter').append('<option selected value="<=">&le;</option>');
				else
					jq183('#chy_quality_bar_inter').append('<option value="<=">&le;</option>');
					
				if(localStorage.chy_default_filter == '>=')
					jq183('#chy_quality_bar_inter').append('<option selected value=">=">&ge;</option>');
				else
					jq183('#chy_quality_bar_inter').append('<option value=">=">&ge;</option>');
					
				if(localStorage.chy_default_filter == '=')
					jq183('#chy_quality_bar_inter').append('<option selected value="=">=</option>');
				else
					jq183('#chy_quality_bar_inter').append('<option value="=">=</option>');
					
				if(localStorage.chy_default_filter == '!=')
					jq183('#chy_quality_bar_inter').append('<option selected value="!=">&ne;</option>');
				else
					jq183('#chy_quality_bar_inter').append('<option value="!=">&ne;</option>');
				
				jq183.each([-3, -2, -1, 0, 1, 2, 3], function(index, value) {
					if(localStorage.chy_default_filter_number == value)
						jq183('#chy_quality_bar').append('<option selected value='+value+'>'+value+'</option>');
					else
						jq183('#chy_quality_bar').append('<option value='+value+'>'+value+'</option>');
				});

				jq183('#chy_quality_bar').change(function() {
					chyFilter();
				});
				jq183('#chy_quality_bar_inter').change(function() {
					chyFilter();
				});
				
				// filter buttons
				jq183.each(allItems, function(key, value) {
					jq183('#chy_filter_controller').append('<img src="'+value[2]+'" class="chy_filter" id='+value[0]+' alt='+value[1]+' />');
				});
				jq183('#chy_filter_controller').append('<img src="/img/equip_inv.png" class="chy_filter" id="-1" alt="All items" />');
				
				// select "all items" filter
				jq183("#"+filterId).addClass('selected');
				jq183("#"+filterId).css('background-color', 'rgba(0, 0, 0, 0.5)');
				
				// click on filter
				jq183(".chy_filter").click(function() {
					filterId = jq183(this).attr('id');
					jq183(".chy_filter").each(function() {
						jq183(this).css('background-color', 'transparent');
						jq183(this).removeClass('selected');
					});
					jq183(this).css('background-color', 'rgba(0, 0, 0, 0.5)');
					jq183(this).addClass('selected');
					chyFilter();
				});
				
				// hover on filter
				jq183(".chy_filter").hover(
				function () {
					if(jq183(this).attr('class') != 'chy_filter selected')
						jq183(this).css('background-color', 'rgba(0, 0, 0, 0.25)');
				},
				function () {
					if(jq183(this).attr('class') != 'chy_filter selected')
						jq183(this).css('background-color', 'transparent');
				}
				);
				
				// search bar
				jq183('#chy_filter_controller').append('<br /><p class="chy_input_text">Search</p> <input class="chy_input_text" type="text" id="chy_search_bar" />');
				jq183('#chy_search_bar').keyup(function(key) {
					chyFilter();
				});
				
				// sort items by loom level then by type
				function chySort() {
					$('#playerInv .chy_item').sortElements(function(a, b){
						return jq183(a).attr('rank') < jq183(b).attr('rank') ? 1 : -1;
					});
					$('#playerInv .chy_item').sortElements(function(a, b){
						return jq183(a).attr('abbr') > jq183(b).attr('abbr') ? 1 : -1;
					});
					$('#fiefInv .chy_item').sortElements(function(a, b){
						return jq183(a).attr('abbr') > jq183(b).attr('abbr') ? 1 : -1;
					});
				}
				
				// -- filter function --
				function chyFilter() {
					var searchText = jq183('#chy_search_bar').attr('value');
					jq183(".chy_item").each(function(index) {
					
						var tempText = jq183(this).children('td').children('b').text();
						var itemQualityLevel = parseInt(jq183(this).attr('rank'));
						
						if(jq183(this).attr('abbr') == filterId || filterId == -1) {
							if(jq183('#chy_quality_bar_inter').attr('value') == '<=') {
								if(itemQualityLevel <= parseInt(jq183('#chy_quality_bar').attr('value'))) {
									if(tempText.toLowerCase().indexOf(searchText) >= 0)
											jq183(this).show(400);
									else
										jq183(this).hide(400);
								} else
									jq183(this).hide(400);
							}
							if(jq183('#chy_quality_bar_inter').attr('value') == '>=') {
								if(itemQualityLevel >= parseInt(jq183('#chy_quality_bar').attr('value'))) {
									if(tempText.toLowerCase().indexOf(searchText) >= 0)
											jq183(this).show(400);
									else
										jq183(this).hide(400);
								} else
									jq183(this).hide(400);
							}
							if(jq183('#chy_quality_bar_inter').attr('value') == '=') {
								if(itemQualityLevel == parseInt(jq183('#chy_quality_bar').attr('value'))) {
									if(tempText.toLowerCase().indexOf(searchText) >= 0)
											jq183(this).show(400);
									else
										jq183(this).hide(400);
								} else
									jq183(this).hide(400);
							}
							if(jq183('#chy_quality_bar_inter').attr('value') == '!=') {
								if(itemQualityLevel != parseInt(jq183('#chy_quality_bar').attr('value'))) {
									if(tempText.toLowerCase().indexOf(searchText) >= 0)
											jq183(this).show(400);
									else
										jq183(this).hide(400);
								} else
									jq183(this).hide(400);
							}
						} else
							jq183(this).hide(400);
					});
					chySort();
				}

				// -- set data on user inventory --
				jq183("fieldset table:first tr td .in").each(function(index) {
					jq183(this).parent().parent().parent().parent().attr('id', 'playerInv');

					jq183(this).parent().parent().prepend('<div class="header"><img class="chy_image" width="70" height="70" src="" /><div class="name"></div></div><div class="desc"><center><img class="abutton chy_minus" style="vertical-align:middle" src="img/ic_minus.png"><img class="abutton chy_plus" style="vertical-align:middle" src="img/ic_plus.png"></center></div>');
				
					var id = jq183(this).attr('name');
					id = id.split('transfer[');
					id = id[1];
					id = id.split(']');
					id = id[0];
					
					var i = jQuery.inArray(id, items);
					if(i > -1) {
						jq183.each(allItems, function(key, value) {
							var tmp = value;
							var tmpKey = value[0];
							var tmpName = value[1];
							jq183.each(tmp, function(key, value) {
								if(itemsId[i] == value) {
									itemCat = tmpKey;
									itemCatName = tmpName;
								}
							});
						});
						
						// retrieve rank in the image
						var rank = itemsIcon[i];
						rank = rank.split('&lvl=');
						rank = rank[1];
						if(rank == null)
							rank = 0;
						
						jq183(this).parent().parent().attr('abbr', itemCat);
						jq183(this).parent().parent().attr('id', itemsId[i]);
						jq183(this).parent().parent().attr('rank', rank);
						if(rank != 0)
							jq183(this).parent().parent().children('td').children('b').prepend(itemsQuality[i] + ' ');
						if(rank > 0)
							jq183(this).parent().parent().css('background-color', 'rgba(0, 100, 0, '+localStorage.getItem("chy_color_intensity")+')');
						if(rank < 0)
							jq183(this).parent().parent().css('background-color', 'rgba(100, 0, 0, '+localStorage.getItem("chy_color_intensity")+')');
						jq183(this).parent().parent().attr('class', 'item chy_item');
						jq183(this).parent().parent().children().children('img.chy_image').attr('src', itemsIcon[i]);
						jq183(this).parent().parent().children().children('img.chy_image').attr('rel', 'itemstats.php?i='+itemsId[i]+'&m='+rank);
						jq183(this).parent().parent().children().children('img.chy_image').attr('title', jq183(this).parent().parent().children('td').children('b').text());
					} else {
						// apply custom icons
						jq183(this).parent().parent().attr('class', 'item');
						if(jq183(this).parent().parent().children('td').children('b').text() == 'Gold:') {
							jq183(this).parent().parent().children().children('img.chy_image').attr('src', goldImage);
						} else if(jq183(this).parent().parent().children('td').children('b').text() == 'Troops:') { 
							jq183(this).parent().parent().children().children('img.chy_image').attr('src', troopsImage);
						}
						if(jq183(this).parent().parent().children().children('img.chy_image').attr('src') == '') {
							jq183(this).parent().parent().children().children('img.chy_image').attr('src', goodsImage);
							jq183(this).parent().parent().attr('class', 'item chy_item');
							jq183(this).parent().parent().attr('abbr', 'cat00');
							jq183(this).parent().parent().attr('rank', 0);
						}
					}
					
					// move some elements
					jq183(this).parent().parent().children('td').children('b').css('display', 'none');
					jq183(this).parent().parent().children().children('.name').text(jq183(this).parent().parent().children('td').children('b').text());
					var elem = jq183(this).parent().parent().children('.desc').children().children('.chy_plus');
					jq183(this).parent().parent().children('td:last').insertAfter(elem);
					elem = jq183(this).parent().parent().children('.desc').children().children('.chy_minus');
					jq183(this).addClass('ok');
					jq183(this).insertAfter(elem);
				});
				
				// -- set data on fief inventory if exist --
				jq183("fieldset table:last .in").each(function(index) {
					if(jq183(this).parent().parent().parent().parent().attr('id') != 'playerInv' && jq183(this).attr('class') != 'in ok') {
						jq183(this).parent().parent().parent().parent().attr('id', 'fiefInv');
						
						jq183(this).parent().parent().prepend('<div class="header"><img class="chy_image" width="70" height="70" src="" /><div class="name"></div></div><div class="desc"><center><img class="abutton chy_minus" style="vertical-align:middle" src="img/ic_minus.png"><img class="abutton chy_plus" style="vertical-align:middle" src="img/ic_plus.png"></center></div>');
						
						var thisName = jq183(this).parent().parent().children('td').children('b').text();
						thisName = thisName.split(':');
						thisName = thisName[0];
						
						var thisID = 0;
						var thisCat = "cat00";
						
						jq183.each(allItemsNames, function(key, value) {
							var tmp = value;
							var tmpkey = key;
							jq183.each(tmp, function(key, value) {
								if(value == thisName) {
									thisCat = tmp[0];
									var tmp2 = allItems[tmpkey];
									thisID = tmp2[key+2];
								}
							});
						});
						
						if(jq183(this).parent().parent().children('td').children('b').text() != 'Gold:' && jq183(this).parent().parent().children('td').children('b').text() != 'Troops:')
							jq183(this).parent().parent().attr('class', 'item chy_item');
						else
							jq183(this).parent().parent().attr('class', 'item');
						jq183(this).parent().parent().children().children('img.chy_image').attr('src', 'loadimage.php?id='+thisID+'&lvl=0');
						
						jq183(this).parent().parent().attr('abbr', thisCat);
						jq183(this).parent().parent().attr('id', thisID);
						jq183(this).parent().parent().attr('rank', 0);
						
						// apply custom icons
						if(jq183(this).parent().parent().children('td').children('b').text() == 'Gold:') {
							jq183(this).parent().parent().children().children('img.chy_image').attr('src', goldImage);
						} else if(jq183(this).parent().parent().children('td').children('b').text() == 'Troops:') {
							jq183(this).parent().parent().children().children('img.chy_image').attr('src', troopsImage);
						}
						if(jq183(this).parent().parent().children().children('img.chy_image').attr('src') == 'loadimage.php?id=0&lvl=0') {
							jq183(this).parent().parent().children().children('img.chy_image').attr('src', goodsImage);
						}
						
						// move some elements
						jq183(this).parent().parent().children('td').children('b').css('display', 'none');
						jq183(this).parent().parent().children().children('.name').text(jq183(this).parent().parent().children('td').children('b').text());
						var elem = jq183(this).parent().parent().children('.desc').children().children('.chy_plus');
						jq183(this).parent().parent().children('td:last').insertAfter(elem);
						elem = jq183(this).parent().parent().children('.desc').children().children('.chy_minus');
						jq183(this).addClass('ok');
						jq183(this).insertAfter(elem);
					}
				});
				
				// click on - button
				jq183(".chy_minus").click(function() {
					if(jq183(this).parent().children('input').attr('value') != "")
						var value = jq183(this).parent().children('input').attr('value');
					else
						var value = 0;
					
					value = parseInt(value) - 1;
					jq183(this).parent().children('input').attr('value', value);
				});
				
				// click on + button
				jq183(".chy_plus").click(function() {
					if(jq183(this).parent().children('input').attr('value') != "")
						var value = jq183(this).parent().children('input').attr('value');
					else
						var value = 0;
					
					value = parseInt(value) + 1;
					jq183(this).parent().children('input').attr('value', value);
				});
				
				// #### Global buttons ####
				jq183('#playerInv').prepend('<input type="text" id="chy_split_i_input" class="chy_input_text" /> <span class="chy_input_text">%</span>');
				jq183('#playerInv').prepend('<a id="chy_split_i" class="chy_select_btn">Split</a>');
				jq183('#playerInv').prepend('<a id="chy_invert_selection" class="chy_select_btn">Invert Selection</a>');
				jq183('#playerInv').prepend('<a id="chy_reset_all_inv" class="chy_select_btn">Reset all selections</a>');
				jq183('#playerInv').prepend('<a id="chy_select_all_inv" class="chy_select_btn">Select all in the current selection</a>');
				jq183('#playerInv').prepend('<a id="chy_select_all_i" class="chy_select_btn">Select all</a>');
				
				jq183('#fiefInv').prepend('<a id="chy_select_all_fief" class="chy_select_btn">Select all in the current selection</a>');
				jq183('#fiefInv').prepend('<a id="chy_select_all_f" class="chy_select_btn">Select all</a>');
				
				jq183("#chy_invert_selection").click(function() {
					jq183("#playerInv .chy_item").each(function(index) {
						if(jq183(this).css('display') != 'none') {
							var max = jq183(this).children('.desc').children().children('td').children().text();
							max = max.split(' (all)');
							max = max[0];
							var currentValue = jq183(this).children('.desc').children().children('input').attr('value');
							if($.isNumeric(currentValue))
								var calc = parseInt(max) - parseInt(currentValue);
							else
								var calc = parseInt(max);
							jq183(this).children('.desc').children().children('input').attr('value', calc);
						}
					});
				});
				jq183("#chy_split_i").click(function() {
					jq183("#playerInv .chy_item").each(function(index) {
						if(jq183(this).css('display') != 'none') {
							var percent = jq183("#chy_split_i_input").attr('value');
							if($.isNumeric(percent)) {
								var value = jq183(this).children('.desc').children().children('td').children().text();
								value = value.split(' (all)');
								value = value[0];
								var calc = Math.ceil(parseInt(value)*parseInt(percent)/100);
								jq183(this).children('.desc').children().children('input').attr('value', calc);
							}
						}
					});
				});
				jq183("#chy_select_all_i").click(function() {
					jq183("#playerInv .chy_item").each(function(index) {
						var value = jq183(this).children('.desc').children().children('td').children().text();
						value = value.split(' (all)');
						value = value[0];
						jq183(this).children('.desc').children().children('input').attr('value', value);
					});
				});
				jq183("#chy_select_all_f").click(function() {
					jq183("#fiefInv .chy_item").each(function(index) {
						var value = jq183(this).children('.desc').children().children('td').children().text();
						value = value.split(' (all)');
						value = value[0];
						jq183(this).children('.desc').children().children('input').attr('value', value);
					});
				});
				jq183("#chy_select_all_inv").click(function() {
					jq183("#playerInv .chy_item").each(function(index) {
						if(jq183(this).css('display') != 'none') {
							var value = jq183(this).children('.desc').children().children('td').children().text();
							value = value.split(' (all)');
							value = value[0];
							jq183(this).children('.desc').children().children('input').attr('value', value);
						}
					});
				});
				jq183("#chy_select_all_fief").click(function() {
					jq183("#fiefInv .chy_item").each(function(index) {
						if(jq183(this).css('display') != 'none') {
							var value = jq183(this).children('.desc').children().children('td').children().text();
							value = value.split(' (all)');
							value = value[0];
							jq183(this).children('.desc').children().children('input').attr('value', value);
						}
					});
				});
				jq183('#chy_reset_all_inv').click(function() {
					jq183.each(allItems, function(index, value) {
						jq183('#chy_count_'+value[0]+' .chy_del').text("");
						jq183('#chy_count_'+value[0]+' .chy_add').text("");
						jq183('#chy_count_'+value[0]+' .chy_result').text("");
					});
					jq183('table input').each(function() {
						jq183(this).attr('value', null);
					});
				});
				
				// #### items count ####
				jq183('#playerInv').prepend('<div id="chy_inv_count" style="width:900px"></div><div style="clear:both"></div><br />');
				jq183.each(allItems, function(index, value) {
					var count = 0;
					jq183('#playerInv .chy_item[abbr="'+value[0]+'"]').each(function() {
						var tmp = jq183(this).children('.desc').children().children('td').children('span').text();
						tmp = tmp.split(' (all)');
						tmp = parseInt(tmp[0]);
						count = count + tmp;
					});
					jq183('#chy_inv_count').append('<div style="float:left;width:300px;"><img width="20px" src="'+value[2]+'">' + value[1] + ': <b id="chy_count_'+value[0]+'"><span class="chy_value">' + count + '</span> <span class="chy_del"></span> <span class="chy_add"></span> <span class="chy_result"></span></b></div>');
				});
				if(jq183('#fiefInv').size() > 0) {
					jq183('#fiefInv').prepend('<div id="chy_fief_count" style="width:900px"></div><div style="clear:both"></div><br />');
					jq183.each(allItems, function(index, value) {
						var count = 0;
						jq183('#fiefInv .chy_item[abbr="'+value[0]+'"]').each(function() {
							var tmp = jq183(this).children('.desc').children().children('td').children('span').text();
							tmp = tmp.split(' (all)');
							tmp = parseInt(tmp[0]);
							count = count + tmp;
						});
						jq183('#chy_fief_count').append('<div style="float:left;width:300px;"><img width="20px" src="'+value[2]+'">' + value[1] + ': <b id="chy_count_'+value[0]+'"><span class="chy_value">' + count + '</span> <span class="chy_del"></span> <span class="chy_add"></span> <span class="chy_result"></span> </b></div>');
					});
				}
				
				// #### transfer simulation ####
				jq183('#playerInv .chy_item input').keyup(function() {
					chyPlayerCalc();
				});
				jq183('#playerInv #chy_select_all_inv').click(function() {
					chyPlayerCalc();
				});
				jq183('#playerInv .chy_item span').click(function() {
					chyPlayerCalc();
				});
				jq183('#playerInv .chy_item .abutton').click(function() {
					chyPlayerCalc();
				});
				jq183('#playerInv .chy_item .useall_hero').click(function() {
					chyPlayerCalc();
				});
				jq183('#playerInv #chy_select_all_i').click(function() {
					chyPlayerCalc();
				});
				jq183('#chy_split_i').click(function() {
					chyPlayerCalc();
				});
				jq183('#chy_invert_selection').click(function() {
					chyPlayerCalc();
				});
				
				function chyPlayerCalc() {
					var categoryCountArray = new Array();
					jq183.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], function(index, value) {
						categoryCountArray[index] = 0;
					});
					jq183('#playerInv .chy_item input').each(function() {
						var catId = jq183(this).parent().parent().parent().attr('abbr');
						var thisCount = jq183(this).attr('value');
						jq183.each(allItems, function(index, value) {
							if(value[0] == catId && thisCount) {
								categoryCountArray[index] = parseInt(categoryCountArray[index]) + parseInt(thisCount);
							}
						});
					});
					jq183.each(allItems, function(index, value) {
						if(categoryCountArray[index] != 0) {
							jq183('#playerInv #chy_count_'+value[0]+' .chy_del').text(categoryCountArray[index]);
							jq183('#fiefInv #chy_count_'+value[0]+' .chy_add').text(categoryCountArray[index]);
							
							var currentValue = jq183('#playerInv #chy_count_'+value[0]+' .chy_value').text();
							var currentFiefValue = jq183('#fiefInv #chy_count_'+value[0]+' .chy_value').text();
							var plusInv = jq183('#playerInv #chy_count_'+value[0]+' .chy_add').text();
							var minusInv = jq183('#playerInv #chy_count_'+value[0]+' .chy_del').text();
							var plusFief = jq183('#fiefInv #chy_count_'+value[0]+' .chy_add').text();
							var minusFief = jq183('#fiefInv #chy_count_'+value[0]+' .chy_del').text();
							if(plusInv)
								var calcInv = parseInt(currentValue) - parseInt(minusInv) + parseInt(plusInv);
							else
								var calcInv = parseInt(currentValue) - parseInt(minusInv);
							if(minusFief)
								var calcFief = parseInt(currentFiefValue) - parseInt(minusFief) + parseInt(plusFief) ;
							else
								var calcFief = parseInt(currentFiefValue) + parseInt(plusFief);
							
							jq183('#playerInv #chy_count_'+value[0]+' .chy_result').text('('+calcInv+')');
							jq183('#fiefInv #chy_count_'+value[0]+' .chy_result').text('('+calcFief+')');
						}
					});
				}
				
				if(jq183('#fiefInv').size() > 0) {
					jq183('#fiefInv .chy_item input').keyup(function() {
						chyFiefCalc();
					});
					jq183('#fiefInv #chy_select_all_fief').click(function() {
						chyFiefCalc();
					});
					jq183('#fiefInv .chy_item span').click(function() {
						chyFiefCalc();
					});
					jq183('#fiefInv .chy_item .abutton').click(function() {
						chyFiefCalc();
					});
					jq183('#fiefInv .chy_item .useall_hero').click(function() {
						chyFiefCalc();
					});
					jq183('#fiefInv #chy_select_all_f').click(function() {
						chyFiefCalc();
					});
					
					function chyFiefCalc() {
						var categoryCountArray = new Array();
						jq183.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], function(index, value) {
							categoryCountArray[index] = 0;
						});
						jq183('#fiefInv .chy_item input').each(function() {
							var catId = jq183(this).parent().parent().parent().attr('abbr');
							var thisCount = jq183(this).attr('value');
							jq183.each(allItems, function(index, value) {
								if(value[0] == catId && thisCount) {
									categoryCountArray[index] = parseInt(categoryCountArray[index]) + parseInt(thisCount);
								}
							});
						});
						jq183.each(allItems, function(index, value) {
							if(categoryCountArray[index] != 0) {
								jq183('#fiefInv #chy_count_'+value[0]+' .chy_del').text(categoryCountArray[index]);
								jq183('#playerInv #chy_count_'+value[0]+' .chy_add').text(categoryCountArray[index]);
								
								var currentValue = jq183('#fiefInv #chy_count_'+value[0]+' .chy_value').text();
								var currentInvValue = jq183('#playerInv #chy_count_'+value[0]+' .chy_value').text();
								var plusInv = jq183('#playerInv #chy_count_'+value[0]+' .chy_add').text();
								var minusInv = jq183('#playerInv #chy_count_'+value[0]+' .chy_del').text();
								var plusFief = jq183('#fiefInv #chy_count_'+value[0]+' .chy_add').text();
								var minusFief = jq183('#fiefInv #chy_count_'+value[0]+' .chy_del').text();
								if(minusInv)
									var calcInv = parseInt(currentInvValue) - parseInt(minusInv) + parseInt(plusInv);
								else
									var calcInv = parseInt(currentInvValue) + parseInt(plusInv);
								if(plusFief)
									var calcFief = parseInt(currentValue) - parseInt(minusFief) + parseInt(plusFief);
								else
									var calcFief = parseInt(currentValue) - parseInt(minusFief);
								
								jq183('#fiefInv #chy_count_'+value[0]+' .chy_result').text('('+calcFief+')');
								jq183('#playerInv #chy_count_'+value[0]+' .chy_result').text('('+calcInv+')');
							}
						});
					}
				}
				
				$('.chy_image').cluetip();
				
				// apply default filter
				chyFilter();
				
				// #### Simulation Function ####
				
				// add buttons
				jq183('#sub').append('<div class="block"><div style="padding-left:20px;padding-right:20px;"><h2>Strategus Tool-belt</h2><br /><div>Enter the simulation code to view the items and export the modifications</div><form action="#" id="chy_simulation_form"><input id="chy_simulation" type="text" /><input id="chy_simulation_submit" type="submit" value="Import" /></form><div>Exported code</div><input id="chy_simulation_export" type="text" /><input id="chy_simulation_export_submit" type="submit" value="Export" /></div></div>');
				
				// on submit import
				jq183('#chy_simulation_form').submit(function() {
					var simulation_code = jq183('#chy_simulation').val();
					var verification_code = simulation_code[0] + simulation_code[1];
					if(verification_code == '$_') {
						simulation_code = simulation_code.split('$_');
						simulation_code = simulation_code[1];
						
						// clear current list
						jq183("#playerInv .chy_item").each(function(index) {
							jq183(this).remove();
						});
						
						// parse list
						var lines = simulation_code.split('$');
						var simulationArray = new Array(null);
						jq183.each(lines, function(index, value) {
							var tmp;
							tmp = lines[index].split('|');
							simulationArray[index] = new Array(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4], tmp[5], tmp[6]);
							var block;
							
							if(tmp[2] > 0)
								var color = 'rgba(0, 100, 0, '+localStorage.getItem("chy_color_intensity")+')';
							if(tmp[2] < 0)
								var color = 'rgba(100, 0, 0, '+localStorage.getItem("chy_color_intensity")+')';
							
							var total = lines.length - 1;
							if(index != total) {
								var item = $('#playerInv tbody tr:first').clone();
								item.addClass('chy_item');
								item.attr('id', tmp[0]);
								item.attr('abbr', tmp[1]);
								item.attr('rank', tmp[2]);
								item.css('background-color', color);
								item.children('.header').children('.chy_image').attr('src', 'loadimage.php?id='+tmp[0]+'&lvl='+tmp[2]);
								item.children('.header').children('.chy_image').attr('rel', 'itemstats.php?i='+tmp[0]+'&m='+tmp[2]);
								item.children('.header').children('.chy_image').attr('title', tmp[5]);
								item.children('.header').children('.name').html(tmp[5]);
								item.children('.desc').children('center').children('#hero_transfer_item_troops').attr('name', 'transfer['+tmp[6]+']');
								item.children('.desc').children('center').children('#hero_transfer_item_troops').val(tmp[3]);
								item.children('.desc').children('center').children('#hero_transfer_item_troops').attr('id', 'hero_transfer_item_'+tmp[6]);
								item.children('.desc').children('center').children('td').children('span').attr('onclick', 'document.getElementById("hero_transfer_item_'+tmp[6]+'").value = '+tmp[4]+';');
								item.children('.desc').children('center').children('td').children('span').html(+tmp[4]+' (all)');
								jq183("#playerInv tbody").append(item);
							}
						});
						
						chyFilter();
						chyPlayerCalc();
						$('.chy_image').cluetip();
					}
					return false;
				});
				
				// on click export
				jq183('#chy_simulation_export_submit').click(function() {
					var exportString = '$_';
					jq183("#playerInv .chy_item").each(function(index) {
						var count = jq183(this).children('.desc').children().children('td').children('span').text();
						count = count.split(' (all)');
						count = parseInt(count[0]);
						var itemId = jq183(this).children('.desc').children().children('input').attr('name');
						itemId = itemId.split('transfer[');
						itemId = itemId[1];
						itemId = itemId.split(']');
						itemId = itemId[0];
						if(isNaN(count)) {
							count = 0;
						}
						if(jq183(this).children('.desc').children().children('input').attr('value') != '' && !isNaN(jq183(this).children('.desc').children().children('input').attr('value'))) {
							var currentCount = jq183(this).children('.desc').children().children('input').attr('value');
						} else {
							var currentCount = 0;
						}
						if(jq183(this).attr('id') !== undefined) {
							var id = jq183(this).attr('id');
							exportString = exportString + jq183(this).attr('id') + '|' + jq183(this).attr('abbr') + '|' + jq183(this).attr('rank') + '|' + currentCount + '|' + count + '|' + jq183(this).children('.header').children('.name').html() + '|' + itemId + '$';
						}
					});
					jq183('#chy_simulation_export').val(exportString);
					return false;
				});
				
				// #### END Simulation Function ####
				
			// if not in a fief
			} else {
				jq183('#info_page fieldset:first').prepend('<b class="chy_error">Update your inventory for the plug-in to work (you must be in a fief).</b>');
			}
		}
		
		jq183("#playerInv tr:first").remove();
		jq183("#fiefInv tr:first").remove();
		
		// #### CSS ####
		// custom display
		if(localStorage.getItem("chy_custom_buttons") == 1) {
			// error text
			jq183('.chy_error').css('-moz-box-shadow','inset 0px 1px 0px 0px #FF3314');
			jq183('.chy_error').css('-webkit-box-shadow','inset 0px 1px 0px 0px #FF3314');
			jq183('.chy_error').css('box-shadow','inset 0px 1px 0px 0px #FF3314');
			jq183('.chy_error').css('background-color','#F4583D');
			jq183('.chy_error').css('-moz-border-radius','6px');
			jq183('.chy_error').css('-webkit-border-radius','6px');
			jq183('.chy_error').css('border-radius','6px');
			jq183('.chy_error').css('border','1px solid #FF3314');
			jq183('.chy_error').css('display','inline-block');
			jq183('.chy_error').css('color','#ffffff');
			jq183('.chy_error').css('font-family','arial');
			jq183('.chy_error').css('font-size','15px');
			jq183('.chy_error').css('font-weight','bold');
			jq183('.chy_error').css('padding','6px 24px');
			jq183('.chy_error').css('text-decoration','none');
			jq183('.chy_error').css('text-shadow','1px 1px 0px #cd8a15');
			
			// filter block
			jq183('#chy_filter_controller').css('left','0');
			jq183('#chy_filter_controller').css('right','0');
			jq183('#chy_filter_controller').css('margin-left','348px');
			jq183('#chy_filter_controller').css('margin-right','55px');
			jq183('#chy_filter_controller').css('position','fixed');
			jq183('#chy_filter_controller').css('z-index','2');
			jq183('#chy_filter_controller').css('background','url("../img/border_c.png")');
			jq183('#chy_filter_controller').css('border-bottom','1px dashed #666');
			jq183('#chy_filter_controller').css('margin-top','-175px');
			
			// counters css
			jq183('.chy_add').css('color', 'green');
			jq183('.chy_del').css('color', 'red');
			jq183('.chy_result').css('color', 'black');
			
			// input text
			jq183('.chy_input_text').css('-moz-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_input_text').css('-webkit-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_input_text').css('box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_input_text').css('-moz-border-radius','6px');
			jq183('.chy_input_text').css('-webkit-border-radius','6px');
			jq183('.chy_input_text').css('border-radius','6px');
			jq183('.chy_input_text').css('border','1px solid #eda933');
			jq183('.chy_input_text').css('display','inline-block');
			jq183('.chy_input_text').css('font-family','arial');
			jq183('.chy_input_text').css('font-size','15px');
			jq183('.chy_input_text').css('font-weight','bold');
			jq183('.chy_input_text').css('padding','6px');
			jq183('.chy_input_text').css('text-decoration','none');
			jq183('.chy_input_text').css('text-shadow','1px 1px 0px #cd8a15');
			jq183('#chy_tool_box .chy_input_text').css('margin-right','10px');
			
			// custom input
			jq183('#chy_split_i_input').css('width','60px');
			jq183('#chy_split_i_input').css('text-align','center');
			
			// input select
			jq183('.chy_input_select').css('-moz-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_input_select').css('-webkit-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_input_select').css('box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_input_select').css('-moz-border-radius','6px');
			jq183('.chy_input_select').css('-webkit-border-radius','6px');
			jq183('.chy_input_select').css('border-radius','6px');
			jq183('.chy_input_select').css('border','1px solid #eda933');
			jq183('.chy_input_select').css('display','inline-block');
			jq183('.chy_input_select').css('font-family','arial');
			jq183('.chy_input_select').css('font-size','15px');
			jq183('.chy_input_select').css('font-weight','bold');
			jq183('.chy_input_select').css('padding','4px');
			jq183('.chy_input_select').css('text-decoration','none');
			jq183('.chy_input_select').css('text-shadow','1px 1px 0px #cd8a15');
			jq183('.chy_input_select').css('top','1px');
			jq183('.chy_input_select').css('position','relative');
			
			// button
			jq183('.chy_select_btn').css('cursor','pointer');
			jq183('.chy_select_btn').css('-moz-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_select_btn').css('-webkit-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_select_btn').css('box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('.chy_select_btn').css('background-color','#f6b33d');
			jq183('.chy_select_btn').css('-moz-border-radius','6px');
			jq183('.chy_select_btn').css('-webkit-border-radius','6px');
			jq183('.chy_select_btn').css('border-radius','6px');
			jq183('.chy_select_btn').css('border','1px solid #eda933');
			jq183('.chy_select_btn').css('display','inline-block');
			jq183('.chy_select_btn').css('color','#ffffff');
			jq183('.chy_select_btn').css('font-family','arial');
			jq183('.chy_select_btn').css('font-size','15px');
			jq183('.chy_select_btn').css('font-weight','bold');
			jq183('.chy_select_btn').css('padding','6px 24px');
			jq183('.chy_select_btn').css('text-decoration','none');
			jq183('.chy_select_btn').css('text-shadow','1px 1px 0px #cd8a15');
			jq183('.chy_select_btn').css('margin-right','10px');
			jq183('.chy_select_btn').mouseenter(function() {
				jq183(this).css('background-color','#d29105');
			}).mouseleave(function() {
				jq183(this).css('background-color','#f6b33d');
			});
			
			// options background
			jq183('#chy_tool_box_bg').css('background-color', 'rgba(0, 0, 0, 0.5)');
			jq183('#chy_tool_box_bg').css('height', '100%');
			jq183('#chy_tool_box_bg').css('width', '100%');
			jq183('#chy_tool_box_bg').css('z-index', '2');
			jq183('#chy_tool_box_bg').css('position', 'absolute');
			jq183('#chy_tool_box_bg').css('display', 'none');
			jq183('#chy_tool_box_bg').css('top', '0');
			jq183('#chy_tool_box_bg').css('left', '0');
			
			// options exit button
			jq183("#chy_tool_box_quit").css('float', 'right');
			jq183("#chy_tool_box_quit").css('cursor', 'pointer');
			jq183("#chy_tool_box_quit").css('font-weight', 'bold');
			jq183("#chy_tool_box_quit").css('margin-right', '6px');
			
			// option button
			jq183("#chy_tool_box_button").css('cursor', 'pointer');
			jq183('#chy_tool_box_button').css('-moz-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('#chy_tool_box_button').css('-webkit-box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('#chy_tool_box_button').css('box-shadow','inset 0px 1px 0px 0px #fed897');
			jq183('#chy_tool_box_button').css('background-color','#f6b33d');
			jq183('#chy_tool_box_button').css('background-image','none');
			jq183('#chy_tool_box_button').css('-moz-border-radius','6px 6px 0 0');
			jq183('#chy_tool_box_button').css('-webkit-border-radius','6px 6px 0 0');
			jq183('#chy_tool_box_button').css('border-radius','6px 6px 0 0');
			jq183('#chy_tool_box_button').css('border','1px solid #eda933');
			jq183('#chy_tool_box_button').css('display','inline-block');
			jq183('#chy_tool_box_button').css('color','#ffffff');
			jq183('#chy_tool_box_button').css('font-family','arial');
			jq183('#chy_tool_box_button').css('font-size','15px');
			jq183('#chy_tool_box_button').css('font-weight','bold');
			jq183('#chy_tool_box_button').css('padding','6px 24px');
			jq183('#chy_tool_box_button').css('text-decoration','none');
			jq183('#chy_tool_box_button').css('text-shadow','1px 1px 0px #cd8a15');
			jq183('#chy_tool_box_button').mouseenter(function() {
				jq183(this).css('background-color','#d29105');
			}).mouseleave(function() {
				jq183(this).css('background-color','#f6b33d');
			});
			
			// option box
			var cssObj = {
				'position':'absolute',
				'top':'50%',
				'left':'50%',
				'display':'none',
				'z-index':'3',
				'background':'url("../img/border_c.png")',
				'padding':'20px',
				'border-radius':'10px',
				'border':'1px solid #eda933',
				'box-shadow':'inset 0px 1px 0px 0px #fed897',
				'width':'400px',
				'margin-left':'-200px',
			};
			jq183("#chy_tool_box").css(cssObj);
		// Strategus style display
		} else {
			// error text
			jq183('.chy_error').css('color','#F4583D');
			
			// filter block
			jq183('#chy_filter_controller').css('left','0');
			jq183('#chy_filter_controller').css('right','0');
			jq183('#chy_filter_controller').css('margin-left','348px');
			jq183('#chy_filter_controller').css('margin-right','55px');
			jq183('#chy_filter_controller').css('position','fixed');
			jq183('#chy_filter_controller').css('z-index','2');
			jq183('#chy_filter_controller').css('background','url("../img/border_c.png")');
			jq183('#chy_filter_controller').css('border-bottom','1px dashed #666');
			jq183('#chy_filter_controller').css('margin-top','-175px');
			
			// counters css
			jq183('.chy_add').css('color', 'green');
			jq183('.chy_del').css('color', 'red');
			jq183('.chy_result').css('color', 'black');
			
			// custom input
			jq183('#chy_split_i_input').css('width','60px');
			jq183('#chy_split_i_input').css('text-align','center');
			
			// input text
			jq183('.chy_input_text').css('display','inline-block');
			
			// button
			jq183('.chy_select_btn').css('-moz-box-sizing',' border-box');
			jq183('.chy_select_btn').css('background',' url("../img/form_button_bg.png") repeat-x scroll 0 0 transparent');
			jq183('.chy_select_btn').css('border',' 1px solid #848484');
			jq183('.chy_select_btn').css('border-radius',' 2px 2px 2px 2px');
			jq183('.chy_select_btn').css('color',' rgba(0, 0, 0, 0.75)');
			jq183('.chy_select_btn').css('cursor',' pointer');
			jq183('.chy_select_btn').css('font-size',' 13px');
			jq183('.chy_select_btn').css('font-weight',' bold');
			jq183('.chy_select_btn').css('height',' 22px');
			jq183('.chy_select_btn').css('line-height',' 13px');
			jq183('.chy_select_btn').css('margin',' 0');
			jq183('.chy_select_btn').css('outline',' 0 none');
			jq183('.chy_select_btn').css('overflow',' visible');
			jq183('.chy_select_btn').css('padding',' 1px 10px');
			jq183('.chy_select_btn').css('text-shadow',' 0 1px 0 white');
			jq183('.chy_select_btn').css('width','auto');
			jq183('.chy_select_btn').css('margin-right','10px');
			jq183('.chy_select_btn').css('display','inline-block');
			
			// options background
			jq183('#chy_tool_box_bg').css('background-color', 'rgba(0, 0, 0, 0.5)');
			jq183('#chy_tool_box_bg').css('height', '100%');
			jq183('#chy_tool_box_bg').css('width', '100%');
			jq183('#chy_tool_box_bg').css('z-index', '2');
			jq183('#chy_tool_box_bg').css('position', 'absolute');
			jq183('#chy_tool_box_bg').css('display', 'none');
			jq183('#chy_tool_box_bg').css('top', '0');
			jq183('#chy_tool_box_bg').css('left', '0');
			
			// options exit button
			jq183("#chy_tool_box_quit").css('float', 'right');
			jq183("#chy_tool_box_quit").css('cursor', 'pointer');
			jq183("#chy_tool_box_quit").css('font-weight', 'bold');
			jq183("#chy_tool_box_quit").css('margin-right', '6px');
			
			// option button
			jq183("#chy_tool_box_button").css('background-attachment',' scroll, scroll');
			jq183("#chy_tool_box_button").css('background-clip',' border-box, padding-box');
			jq183("#chy_tool_box_button").css('background-color',' transparent');
			jq183("#chy_tool_box_button").css('background-image',' url("../img/bg_tab_current_start.png"), url("../img/bg_tab_current_end.png")');
			jq183("#chy_tool_box_button").css('background-origin',' border-box, border-box');
			jq183("#chy_tool_box_button").css('background-position',' left top, right top');
			jq183("#chy_tool_box_button").css('background-repeat',' no-repeat, no-repeat');
			jq183("#chy_tool_box_button").css('background-size',' auto auto, auto auto');
			jq183("#chy_tool_box_button").css('color',' #DDBE8F');
			jq183("#chy_tool_box_button").css('font-weight',' bold');
			jq183("#chy_tool_box_button").css('line-height',' 26px');
			jq183("#chy_tool_box_button").css('margin-top',' 0');
			jq183("#chy_tool_box_button").css('cursor', 'pointer');
			
			// option box
			var cssObj = {
				'position':'absolute',
				'top':'50%',
				'left':'50%',
				'display':'none',
				'z-index':'3',
				'background':'url("../img/border_c.png")',
				'padding':'20px',
				'border-radius':'10px',
				'border':'1px solid #848484',
				'width':'400px',
				'margin-left':'-200px',
			};
			jq183("#chy_tool_box").css(cssObj);
		}
		jq183('.chy_content').css('padding', '0 20 0 20');
		
		// inventory loading button
		jq183('#chyLoadingProgress').css('cursor', 'pointer');
		jq183('#chyLoadingProgress').css('color', '#C56200');
		
		// filter buttons
		jq183('.chy_filter').css('cursor', 'pointer');
	});
}

addJQuery(main);