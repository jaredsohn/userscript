// ==UserScript==
// @name        Strony po prawej
// @grant GM_getValue 
// @grant GM_setValue 
// @description  Przyczepia przełączanie stron do prawej strony ekranu.
// @include     http://www.sadistic.pl*
// @require        http://code.jquery.com/jquery-latest.min.js
// @version     1.0
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


var pagin = $(".pagination");

pagin.css({			"-webkit-transform":"rotate(90deg)", 
					"-moz-transform":"rotate(90deg)", 
					"-o-transform":"rotate(90deg)", 
					"display":"block",
					"margin":"0",
					"position":"fixed",
					"right":"1%",
					"width":"20px",
					"top":"10%"
					});
					
$(pagin).find("a").css({
				"padding":"1px 6px"
});

