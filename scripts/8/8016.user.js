
// EmotToText
// version 0.1 BETA!
// 2006-10-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that converts graphical
// smilies to their text equivalents.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Frownies", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          EmotsToText
// @description   converts graphical smilies to their text equivalents
// @include       *forum*
// ==/UserScript==

(function() {
	/*
	*	Quick and dirty HashTable thingy
	*	Add items to the table in order: 
	*	"key1", "value1", "key2", "value2", "key3", "value3"
	*/
	var phpBB = [ 	"icon_biggrin.gif", 	":-D",
					"icon_smile.gif", 		":-)", 
					"icon_sad.gif", 		":-(", 
					"icon_surprised.gif", 	":-0", 
					"icon_eek.gif", 		":-o", 
					"icon_confused.gif", 	":-?", 
					"icon_cool.gif", 		"8-)", 
					"icon_lol.gif", 		"LOL", 
					"icon_mad.gif", 		">:-(", 
					"icon_razz.gif", 		":-P", 
					"icon_redface.gif", 	":-$", 
					"icon_cry.gif", 		":'-)", 
					"icon_evil.gif", 		">:-<", 
					"icon_twisted.gif", 	">:->", 
					"icon_rolleyes.gif", 	":-/", 
					"icon_wink.gif", 		";-)", 
					"icon_exclaim.gif", 	"!!!", 
					"icon_question.gif", 	"???", 
					"icon_idea.gif", 		"!-)", 
					"icon_arrow.gif", 		"==>", 
					"icon_neutral.gif", 	":-|", 
					"icon_mrgreen.gif", 	":-D"];
		
	var woobiedoobie = [ "emotka_2363.gif", ":pismo<-", 
					"emotka_2375.gif", 		":punk:", 
					"emotka_2378.gif", 		":kop:", 
					"emotka_2403.gif", 		":ochlaj:", 
					"emotka_2414.gif", 		":dupa:", 
					"emotka_2462.gif", 		":biba:", 
					"emotka_2497.gif", 		":toast:", 
					"emotka_2504.gif", 		":spaw:", 
					"emotka_2506.gif", 		":zonk:", 
					"emotka_2755.gif", 		":piwko:", 
					"emotka_2767.gif", 		":solo:", 
					"emotka_2778.gif", 		":NIE:", 
					"emotka_2797.gif", 		":?!?:", 
					"emotka_2831.gif", 		"WTF", 
					"emotka_2848.gif", 		":peace:", 
					"emotka_2857.gif", 		":-/", 
					"emotka_2887.gif", 		":wisi:", 
					"emotka_2899.gif", 		":gul:", 
					"emotka_2934.gif", 		":szacun:", 
					"emotka_2935.gif", 		":fuck:", 
					"emotka_2940.gif", 		":zassany:", 
					"emotka_2995.gif", 		":strzela:", 
					"emotka_3014.gif", 		":młotek:", 
					"emotka_3017.gif", 		"X_X", 
					"emotka_3031.gif", 		":mur:", 
					"emotka_3032.gif", 		":fiu:", 
					"emotka_3035.gif", 		":patyk:", 
					"emotka_3048.gif", 		":spokój:", 
					"emotka_3079.gif", 		"[OT]", 
					"emotka_3118.gif", 		":afro:", 
					"emotka_1522.gif", 		":shit:", 
					"emotka_1864.gif", 		":banan:", 
					"emotka_1924.gif", 		":krzyk:", 
					"emotka_1941.gif", 		"GOOGLE", 
					"emotka_1951.gif", 		":skrzypek:", 
					"emotka_2029.gif", 		":yeah:", 
					"emotka_2067.gif", 		":gitarul:", 
					"emotka_2074.gif", 		":dupa:", 
					"emotka_2283.gif", 		":wojak:", 
					"emotka_2298.gif", 		":boks:", 
					"emotka_2392.gif", 		":demon:", 
					"emotka_2467.gif", 		":harfa:", 
					"emotka_2468.gif", 		":band:", 
					"emotka_2477.gif", 		":band2:", 
					"emotka_2481.gif", 		":spaw:", 
					"piano.gif", 			":piano:", 
					"sax.gif", 				":sax:", 
					"ironia.gif", 			":ironia:", 
					"ironia666.gif", 		":ironia666:", 
					"zlituj.gif", 			":zlituj:", 
					"chytry.gif", 			":->", 
					"siano.gif", 			":siano:", 
					"diablo.gif", 			":666:", 
					"twoja5lh.gif", 		":stara:", 
					"zjoby.gif",			":zjoby:"];
		
	var khoomei = [	"eusa_angel.gif", 		":angel:",
					"eusa_hand.gif",  		":speak2hand:",
					"eusa_liar.gif",  		":liar:",
					"eusa_naughty.gif",  	":shame:",
					"eusa_snooty.gif",  	":snooty:",
					"eusa_clap.gif",  		":brawo:",
					"eusa_pray.gif",  		":pray:",
					"eusa_shhh.gif",  		":shhh:",
					"eusa_dance.gif",  		":dancing:",
					"eusa_shifty.gif",  	":anxious:",
					"eusa_sick.gif",  		":sick:",
					"eusa_drool.gif",  		":drool:",
					"eusa_eh.gif",  		":eh?:",
					"eusa_think.gif",  		":hmmm:",
					"eusa_silenced.gif",	":-x",
					"eusa_whistle.gif", 	":whistle:",
					"eusa_wall.gif",  		":wall:",
					"eusa_doh.gif",  		":d'oh!:",
					"eusa_boohoo.gif",  	":violin:",
					"icon_adore.gif",		":adore:",
					"icon_banghead.gif", 	":headbang:",
					"icon_coffee.gif", 		":coffe:",
					"icon_evil5.gif", 		":rules<-",
					"icon_think.gif",		":thinking:",
					"rockon.gif",			":rockon:"];

	var emotsTable = [ "phpBB", 				phpBB,
					"forum.woobiedoobie.com",	woobiedoobie,
					"khoomei.com",				khoomei];
					
	function ReturnByKey (searchIn, key, defaultValue){
		/*
		*	Searches the table for specific key and returns value
		*/
		for(var i = 0; i < searchIn.length; i = i + 2){
			if(key == searchIn[i]){
				value = searchIn[i + 1];
				return value;
			}
		}
		return defaultValue;
	}
		
	var images = document.getElementsByTagName("img");
	for (var n = 0; n < images.length; n++)
	{
		var img = images[n];
		var attribute = img.getAttribute("src");
		if (attribute.match(".smiles."))
		{
			if((window.location.pathname.match(".posting.")) && !((window.location.search.match(".smilies")))) {
				img.parentNode.replaceChild(document.createTextNode(""), img);
				n--;
				continue;
			}
			
			attribute = attribute.substring(attribute.lastIndexOf("smiles") + 7);
			var replace = ReturnByKey(ReturnByKey(emotsTable, "phpBB", ""), attribute, attribute);
			if (replace == attribute)
				replace = ReturnByKey(ReturnByKey(emotsTable, window.location.host, ""), attribute, attribute);
									
			var replacement = document.createElement("span");
			replacement.setAttribute("style", "color:red");
			replacement.appendChild(document.createTextNode(replace));
			img.parentNode.replaceChild(replacement, img);
						
			n--;
		}
	}
})();




