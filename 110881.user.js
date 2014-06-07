// ==UserScript==
// @name           zpovednice ikonky uzivatelu
// @namespace      deamonicky script
// @description    přidá ikonky uživatelů do Zpovědnice
// @include        http://zpovednice.cz/detail.php?statusik=*
// @include        http://spovednica.sk/detail.php?statusik=*
// @include        http://www.zpovednice.cz/detail.php?statusik=*
// @include        http://www.spovednica.sk/detail.php?statusik=*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var width = 68;
var height = 60;

$(".signnick,.signunreg").each(function () {
	var id_with_url = $(this).children("a").attr("href"); 
	// http://api.jquery.com/children/ ... children can be selected :)
	// attribute is href
	if (id_with_url) { // it can be undefined !
		// DEBUG: alert('"'+id_with_url+'"');
		var ids = id_with_url.match(/\d+$/g); // last number of url, url is like profil.php?kdo=666
		if (ids && 0 < ids.length) {
			var id = ids[0];
			$(this).prepend('<img src="foto/id'+id+'.jpg" border=0 width="'+width+'" height="'+height+'">');
		}
	}
	//}
	//$(this).prepend('<img scr="http://zpovednice.cz/foto/id58931.jpg">');
	/*$(this).prepend("x");
	table:eq(9) > a
	"http://www.zpovednice.cz/foto/id"+64552+".jpg";
	<img src= 68 60
	* 
	* */
});
