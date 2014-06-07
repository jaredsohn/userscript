// ==UserScript==
// @name           Neopets Gormball APer
// @namespace      kikareth
// @description    Gormball APer compatible with Opera. Will continue to play indefinitely.
// @include        http://*neopets.com/space/gormball2.phtml*
// @include        http://*neopets.com/space/gormball.phtml*
// @version        2010.04.20
// ==/UserScript==

function doScript()
{
    var lists = document.getElementsByTagName("select");
	var pagenum = document.getElementsByName("page_count");
	var first; //check if first playing page to get it started

    /*check if first gormball page*/
	if (window.pathname != "space/gormball2.phtml") {
		/*select player - replace the options[#] below:
			1 = Thyassa
			2 = Brian
			3 = Gargarox
			4 = Farvin III
			5 = Ember
			6 = Zargrold
			7 = Ursula
			8 = Kevin
		*/
		lists[0].options[1].selected = true;
		document.forms[1].submit();
	/*on playing page*/
	} else {
		/*exploded?*/
		if(document.body.innerHTML.indexOf("Play Again") > -1)
		  document.forms[1].submit();
		/*need to select on first playing page?*/
		else if(pagenum[0].value==1) {
			first = true;
			lists[0].options[2].selected = true;
			document.forms.gormform.submit();
		/*play the game*/
		} else {
			/*first playing page*/
			if (first == true) {
			  document.forms.gormform.submit();
			  first = false;
			/*refresh on all other pages*/
			} else
			  document.location.reload(true);
		}
	}
}

doScript();