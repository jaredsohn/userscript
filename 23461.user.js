// ==UserScript==
// @name           SweClockers.com - light theme
// @namespace      sweclockers
// @description    Changes the basic visuals at SweClockers.com; hiding ads, other - to me - unnecesary stuff + makes the news wider
// @include        *sweclockers.com/*
// ==/UserScript==

// CSS:
var css = "@namespace url(http://www.w3.org/1999/xhtml);"
		// General:
		+ "* { font-family: 'Trebuchet MS', Tahoma, sans-serif; }"
		+ "body { background-color: #FFF; }"
		+ "h1, h2, h3, h4, h5 { text-transform: uppercase; }"

		// Header:
		+ "#header { position: relative; top: -80px; }"
		
		// Content:
		+ "#wrapper { position: relative; top: -80px; width: 815px; margin: 5px 0 0 5px; border-width: 0 2px 2px 0; border-style: solid; border-color: #CCC #EEE #EEE #CCC; }"

		// Login form:
		+ "#header form { z-index: 2; position: relative; top: 115px; left: -25px; }"
		+ "#header form .submitbutton { display: none; }"
		+ "#header form .text { width: 60px; font-size: 9px; }"
		
		// Logged in, user information:
		+ "#logout { position: relative; left: 518px; top: 7px; background-color: #FAFAFA; width: 300px; padding: 0 5px 0 5px; -moz-border-radius: 5px; border: 1px solid #EAEAEA; }"
		+ "#logout strong { color: rgb(100, 160, 110); padding: 0; margin: 0; text-transform: uppercase; border-bottom: 1px dotted #CCC; width: 300px; }"

		// Hide stuff + remove bg's and borders:
		+ "#footer, .adcss, .banner, .bannerhorizontal, .middlecolumn, .narrowcolumn, #widecolumnextra iframe { display: none; }"
		+ "#more, .leftfloat, .newspost, .widecolumn, #widecolumnfoot, #widecolumnfoot p { border: 0; background: none; }"

		// Menu:
		+ "#subnav ul { width: 800px; left: -10px; background-color: #FFF; text-transform: uppercase; }"
		+ "#subnav ul li a, #subnav ul li a .selected *, #subnav ul li a:hover, #subnav a .selected, #subnav ul li a span { -moz-border-radius: 3px; background: none; }"
		+ "#subnav ul li a:visited { background: none; color: #000; }"
		+ "#subnav ul li a:hover { background-color: #333; color: #FFF; }"
		+ "#subnav .selected * { background: #000; color: #FFF; }"

		// Makes the news wider:
		+ "#widecolumnfocus { width: 800px; }"
		+ "#widecolumnfocus .newspost, .newspost, #more { width: 776px; }"

		// Main news - links:
		+ "#widecolumnfocus a { -moz-border-radius: 3px; text-decoration: none; padding: 2px 5px; background-color: #333; color: #FFF; }"
		+ "#widecolumnfocus a:hover { background-color: #FFF; color: #000; }"

		// News:
		+ ".newspost { border: 2px solid #CCC; background-color: #FEFEFE; margin: 10px 0 0 0; -moz-border-radius: 5px; }"
		+ ".newspost:hover { border: 2px solid #999; }"
		+ ".widecolumn .newspost h2, .widecolumn .newspost h2 a, #more h2 { font-family: 'Century Gothic', sans-serif; color: #39BEF2; text-transform: uppercase; padding-bottom: 5px; margin-bottom: 5px; color: #666; }"
		+ ".widecolumn .newspost h2 a:hover { color: #000; }"
		+ ".newspost h4, #more h4 { color: #267F89; }"
		+ ".newspost h2 { border-bottom: 1px #CCC dotted; }"
		+ ".newspost p { line-height: 1.6em; }"
		+ ".newspost .imageframe, .newspost img { margin: auto auto; border: 0; }"
		+ ".newspost .imageframe { background: #EAEAEA; color: #666; text-align: center; padding: 1px; }"

		// Reviews:
		+ ".wideheader #pagecounter { font-family: 'Century Gothic', sans-serif; }"
		+ ".wideheader { width: 780px; }"
		+ ".wideheader .neattable td { background: #000; float: left; }"
		+ ".widecolumn .widecolumntext { width: 780px; }"
		+ ".widecolumn .widecolumntext * { line-height: 1.6em; }"

		// Paging for reviews etc.:
		+ "#more a { -moz-border-radius: 3px; padding: 0 3px; }"
		+ "#more a:hover { background-color: #000; color: #FFF; }"

		// Special list; "More news":
		+ ".speciallist a { color: #000; padding: 1px 4px; -moz-border-radius: 3px; }"
		+ ".speciallist li a:hover { background-color: #000; color: #FFF; }"

		// Bottom information:
		+ "#widecolumnfoot { border-bottom: 1px solid #ABA59D; width: 100%; }"

		// Prices:
		+ ".widecolumntext, .widecolumntext *, .widecolumntext div *, .widecolumntext .pj_box_prislista, .widecolumntext .pj_box_prislista { background: none; background-color: #FFF; border: 0; }"
		
		// Forums:
		+ ".vbforum * { font-family: 'Trebuchet MS', sans-serif; }"
		+ ".widecolumn td { background: #F0F0F0; -moz-border-radius: 4px; }"
		
		// Name:
		+ ".vbforum tbody tr td font b { font-family: 'Century-Gothic', sans-serif; border-bottom: 1px dotted #CCC; color: #267F89; }"

		// Remove border:
		+ ".widecolumn .fluidcolumntext { border: 0; }"

		// Resize buttons:
		+ "#flapnav, #flapnav a { display: none; }"
		
		+ "";

if ( typeof GM_addStyle != 'undefined' ) {
	GM_addStyle(css);
} else if ( typeof addStyle != 'undefined' ) {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName('head');
	if ( heads.length > 0 ) {
		var node = document.createElement('style');
		node.type = 'text/css';
		node.innerHTML = css;
		heads[0].appendChild(node);
	}
}