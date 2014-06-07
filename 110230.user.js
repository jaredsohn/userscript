// ==UserScript==
// @name           OPAC+ Modoki for nakatsugawa
// @namespace      http://lib.city.nakatsugawa.gifu.jp
// @description    OPAC+ Modoki for nakatsugawa
// @include        http://lib.city.nakatsugawa.gifu.jp*
// ==/UserScript==
(function(){
	var simple_search = false;
	var divs = document.getElementsByTagName( "div" );
	for ( var i = 0; i < divs.length; i += 1 ) {
		var div = divs[i];
		if ( div.className == "top-bar" ) {
			var td = div.getElementsByTagName( "td" )[0];
			//alert(td);
			td.innerHTML = "";
			var table = div.getElementsByTagName( "table" )[0];
			//alert(table);
			table.style.backgroundImage = 'url("http://nlib.jp/wp-content/uploads/2011/01/tosho2.jpg.pagespeed.ce.pDHtuz6PEo.jpg")';
			table.style.height = '165px';
		}
		if ( div.className == "top-title" && div.innerHTML == "簡易検索・検索条件入力" ) {
			div.style.display = "none";
			simple_search = true;
		}
		if ( div.className.indexOf( "copyright" ) != -1 ) {
			var today = new Date;
			div.innerHTML = "Copyright (C) "+ today.getFullYear() +" 中津川市立図書館 All Rights Reserved.";
		}
	}
	//alert( location.href );
	if ( simple_search ) {
		var buttons = document.getElementsByTagName( "input" );
		for ( var i = 0; i < buttons.length; i += 1 ) {
			var button = buttons[i];
			//alert("{" + button.value + "}" );
			if ( button.value == "クリア" || button.name == "btnClear" ) {
				button.style.display = "none";
				//alert( button.parentNode );
				var button_html = button.parentNode.innerHTML;
				//alert(  button_html );
				button.parentNode.style.display = "none";
				var inputs = document.getElementsByTagName( "input" );
				for ( var j = 0; j < inputs.length; j += 1 ) {
					var input = inputs[j];
					//alert( "{"+input.innerHTML+"}" );
					if ( input.id == 'simpleSearchForm:txtKeyword' ) {
						input.parentNode.innerHTML += button_html;
						break;
					}
				}
				break;
			}
		}
	}
})();
