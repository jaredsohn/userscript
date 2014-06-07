// ==UserScript==
// @name           Gllitch Wardrobe Improver
// @author         DeusAphor
// @namespace      http://beta.glitch.com/profiles/PHVM97IIJG92HGS/
// @version        0.0.1
// @include        http://*.glitch.com/wardrobe/*
// ==/UserScript==
// Messy, needs to be re-written but I am just so busy. This was a product of 30 seconds every hour or so. 


var SUC_script_num = 114620; 
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}




var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);//

function main() {	

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}}
var tags = ["3/4 length", "3/4 sleeves", "80s", "Amerigo outfit", "ancient butterfly outfit", "animal", "antlers", "apricot", "apron", "aqua", "armor", "artsy", "aviation", "ballet", "baseball", "basic", "basics", "Bavarian", "beach", "beads", "bear", "beige", "bellbottoms", "belly", "belly top", "belt", "belted", "bikini", "bird", "bizarre", "black", "black and white", "black bikini outfit", "black body suit outfit", "black chicken outfit", "black dinosaur outfit", "black gorilla outfit", "black ladycat outfit", "black martial outfit", "black polka dot bikini outfit", "black sherwani outfit", "blouse", "blue", "blue martial outfit", "blue sherwani outfit", "boardwalk", "boater", "bobbles", "body suit", "bolero", "Bollywood", "bones", "boots", "bow tie", "bow ties", "bowling", "bows", "box", "boxite", "briefs", "bright", "bronze", "bronze armor outfit", "brown", "brown unicorn outfit", "buckle", "buckled", "buckles", "Buddhist", "bunny", "burgundy", "burlap", "business", "butterfly", "buttoned", "buttons", "cap", "capris", "cardboard", "cardigan", "carnation", "casual", "censored", "ceremonial", "chain", "chains", "chaps", "charcoal", "checkered", "cheerful", "chicken", "Chinese", "Christopher Marlowe outfit", "classic", "claws", "cleaning", "cloak", "clogs", "closed toe", "coat", "coconut", "collar", "collared", "color", "colors", "comfort", "comfortable", "comfy", "cooking", "corset", "Cosma", "Cosma outfit", "costume", "costumes", "cow", "cowboy", "cozy", "crazy", "cross-strap", "cupcake", "cute", "cycling", "cyclist suit", "dance", "dark", "dark knight outfit", "Day of the Dead", "deer", "demin", "denim", "desert", "detailed", "dinosaur", "dirndl", "dirty", "doctor", "draped", "drawstrings", "dress", "dressy", "Dutch", "ears", "elegant", "elephant", "Elizabethan", "Emilio Muñoz Torero outfit", "Emilio Muñoz torero outfit", "Enrique Ponce torero outfit", "equestrian", "Estonian", "ethnic", "European", "evil", "faded", "fairy tale", "fall", "fancy", "feathers", "fedora", "feet", "feline", "felt", "feminine", "festive", "fish", "fishing", "fishnets", "fitted", "flared", "flat cap", "flats", "flip-flops", "flower", "flowers", "flowery", "flowy", "food", "formal", "fox", "French", "frills", "frilly", "fringes", "fuchsia", "functional", "funky", "fur", "furry", "fusion", "fuzzy", "gaming", "German", "girlla", "girly", "Glitchmas", "gold", "golden", "gorilla", "gothic", "grass", "gray", "grayscale", "Greek", "green", "green dinosaur outfit", "green man outfit", "greencolors", "grey", "greyscale", "hair", "halter top", "hat", "Hawaii", "headpiece", "hearts", "heels", "helmet", "hi tech", "high collar", "high waist", "hockey", "honorary", "hoodie", "horns", "hosiery", "hot dog", "hula dancer outfit", "hunting", "iconic", "Indian", "indigenous", "jacket", "jamaican", "Japadog", "Japanese", "jeans", "jersey", "jingly", "Juan Belmonte torero outfit", "khaki", "knee highs", "knee length", "knits", "lace", "laces", "land dragon outfit", "lavender", "layered", "layers", "leather", "lederhosen", "Lederhosen outfit", "LEDs", "leggings", "legwarmers", "leopard", "leopard print", "light", "light blue", "light blue martial outfit", "light blue unicorn outfit", "light green", "light-boned butterfly outfit", "lightweight", "lilac", "lime", "lizard", "log", "long", "long sleeves", "Lord Burghley outfit", "luck dragon outfit", "macabre", "magenta", "maki sushi outfit", "maroon", "mary janes", "mask", "medallion", "medical", "medieval", "metal", "metallic", "Mexican", "military", "mini skirt", "minimal", "mining", "mint", "modest", "Mongolian", "monkey", "monochrome", "monster", "moose", "multilayered", "mushroom", "mythological", "natural", "nature", "navy", "navy rookist outfit", "neon", "Nuxalk outfit", "nylon", "occult", "ocean", "octopus", "office", "old-skool", "olive", "open toe", "orange", "orange gorilla outfit", "orange sherwani outfit", "orange sporty outfit", "original rookist outfit", "overcoat", "panda", "paper", "parachute pants", "pastels", "patched", "patterns", "paws", "pea coat", "pearls", "Pedro Romero Torero outfit", "peony", "Peruvian", "pink", "pink body suit outfit", "pink gorilla outfit", "pink polka dot bikini outfit", "plaid", "plain", "plum", "pockets", "polka dot", "polka dots", "polkadot", "poofy", "practical", "prehistoric", "printed", "prints", "prison", "professional", "protective", "protective armor bronze metal medieval", "provocative", "pugsleys", "pumps", "punky", "purple", "purple dinosaur outfit", "purple rookist outfit", "rain gear", "rainbow", "raingear", "ram", "ramen", "red", "red dinosaur outfit", "Red dirndl outfit", "red ladycat outfit", "red martial outfit", "red sherwani outfit", "regal", "restraints", "retro", "revolutionary", "rice", "robe", "robot", "rolled sleeves", "rook", "rose", "royalty", "safari", "sage", "sailing", "sailor", "sandals", "sassy", "sassy sailor outfit", "scarf", "scary", "science", "Scottish", "scuba", "sea", "sea dragon outfit", "sealife", "seaweed", "sherwani", "shining armor outfit", "shiny", "shirt", "shoes", "shoets", "short", "short sleeved", "short sleeves", "shorts", "sichuan dragon outfit", "silly", "silver", "simple", "Sir Francis Drake outfit", "Sir Walter Raleigh outfit", "sirwal", "skirt", "skull", "skulls", "sleeveless", "sleeves", "slippers", "slit", "sneakers", "snorkel", "snow gorilla outfit", "snow leopard", "socks", "sophisticated", "Space Crusader outfit", "spandex", "specialty", "spiritual", "split neck", "sports", "sporty", "spring", "stars", "stitched", "stitches", "stockings", "straight cut", "strapless", "straps", "straw", "strings", "striped", "stripes", "subscriber only", "suede", "summer", "summery", "superhero", "surf", "sushi", "sushi outfit", "suspenders", "swoosh", "symbols", "t-shirt", "tan", "tank top", "teal", "teeth", "tennis", "Tibetan", "tie", "tied", "tights", "toe socks", "top", "top seller", "toque", "torero", "torn", "tough", "traditional", "transparent", "tribal", "triclops", "trimmed", "trousers", "tube top", "tunic", "turban", "Turkish", "turquoise", "turtleneck", "tweed", "underwear", "unicorn", "uniform", "unique", "v-neck", "velvet", "Venetian", "vest", "viking", "vintage", "vinyl", "violet", "warm", "wave", "wedding", "wellingtons", "white", "white bikini outfit", "white chicken outfit", "white unicorn outfit", "wide sleeves", "wide strap", "wild west", "winter", "wintery", "wooden", "wool", "yellow", "yeti", "yoga", "zille-o-ween", "zipper", "zippers", "zombie"];

	function GetCodeDialog(){
		var OutfitString = Base64.encode('Outfit:'+ wearing.hat +'&'+ wearing.coat +'&'+ wearing.shirt +'&'+ wearing.pants +'&'+ wearing.dress +'&'+ wearing.skirt +'&'+ wearing.shoes);
		var Select = $('<textarea id="stat_update" style="height: 2.5em; width: 500px; margin: -20px 0 5px 0;">Outfit:'+OutfitString+'</textarea>');
		var DialogueCont = $('<div class="dialog" id="DialogueCont"></div>');
		var Dialogue = $('<div class="dialog-inner" id="Dialogue">'
			+ '<a class="close" href="javascript: void(0);" id="Dialogueclose">Close</a>'
			+ '<h2>Copy this code and send it to your friend!</h2>'
			+ 'Outfit Code: </div>');
		Dialogue.append(Select);
		DialogueCont.append(Dialogue);
		$("body").append(DialogueCont);
		$("#Dialogueclose").click(function() {$("#DialogueCont").remove();});
	}

	function EnterCodeDialog(){
		
		var TextArea = $('<textarea id="textarea_code" style="height: 2.5em; width: 500px; margin: -20px 0 5px 0;"></textarea>');
		var DialogueCont = $('<div class="dialog" id="DialogueCont"></div>');
		var SubmitButton = $('<a id="SubmitBtn" href="javascript: void(0);" class="button-tiny button-minor">Submit!</a>');
		var Dialogue = $('<div class="dialog-inner" id="Dialogue">'
			+ '<a class="close" href="javascript: void(0);" id="GetCodeDialogclose">Close</a>'
			+ '<h2>Copy this code and send it to your friend!</h2>'
			+ 'Outfit Code: </div>');
		Dialogue.append(TextArea);
		Dialogue.append(SubmitButton);
		DialogueCont.append(Dialogue);
		$("body").append(DialogueCont);
		$("#GetCodeDialogclose").click(function() {$("#DialogueCont").remove();});
		$("#SubmitBtn").click(function() 
		{
			var EncodedCode = $("#textarea_code").attr("value");
			if(EncodedCode.indexOf("Outfit:")!= -1)
			{
				var DecodedCode = Base64.decode(EncodedCode.replace("Outfit:",""));
				if(DecodedCode.indexOf("Outfit:")!= -1)
				{
					var DecodedCodeArray = DecodedCode.replace("Outfit:","").split("&");
					wearNothing();
					wearing.hat = DecodedCodeArray[0];
					wearing.coat = DecodedCodeArray[1];
					wearing.shirt = DecodedCodeArray[2];
					wearing.pants = DecodedCodeArray[3];
					wearing.dress = DecodedCodeArray[4];
					wearing.skirt = DecodedCodeArray[5];
					wearing.shoes = DecodedCodeArray[6];
					updateControls();
					updateAvatarState();
					rebuildWardrobeView();
					rebuildRHItem();
					rebuildMainView();
					$("#DialogueCont").remove();
				}
				else alert('Invalid Code');
			}
			else alert('Invalid Code');
		});
	}
	
	var URL = window.location.pathname;
	if((URL.indexOf("wardrobe/") != -1))
	{
		$("#checkout-button").html("Save");
		$("div.action").append("</br><a class=\"button-tiny button-minor\" id=\"Remove-button\" onclick=\"	getNaked();\" >RemoveAll</a>");

		var TagSelectSelect = $('<select style="margin-right: 10px; margin: left: 10px;" id="TagSelect"><option value="">Choose!</option></select>');
		for (tag in tags) {
		
			TagSelectSelect.append($('<option style="border-top: dotted 1px #ccc;" value = "">' + tags[tag] + '</option>'));
		}
		$("div.action").append(TagSelectSelect);
		$("#TagSelect").change(function () {
          var str = "";
          $("select option:selected").each(function () {
                str += $(this).text() + " ";
              });
		  window.location = "#!tag."+str;
        })

		
		$('div.wardrobe').prepend($('#left-nav'));
		$('#left-nav').css('top', '25px');
		$("div.wardrobe").append("<a style=\"top: 180px; position: absolute; right: 200px;\" class=\"button-tiny button-minor\" id=\"GetCode-button\"  >Get Code</a>");
		$('#GetCode-button').click(function() {
			GetCodeDialog();
		});	
		
		$("div.wardrobe").append("<a style=\"top: 180px; position: absolute; right: 20px;\" class=\"button-tiny button-minor\" id=\"SubmitCode-button\"  >Submit Code</a>");
		$('#SubmitCode-button').click(function() {
			EnterCodeDialog();
		});
	}
}