// ==UserScript==
// @name         BetterThoughtBoxes
// @description  Improve thoughtboxes UI
// @id           me.zilliox.BetterThoughtBoxes
// @homepageURL  http://userscripts.org/scripts/show/135446
// @supportURL   http://userscripts.org/scripts/discuss/135446
// @updateURL    http://userscripts.org/scripts/source/135446.meta.js
// @version      2012.06.07
// @author       tzilliox
// @namespace    http://zilliox.me
// @include      https://www.thoughtbox.es/*/*
// ==/UserScript==
(function(){
	var execute = function(){

		/*** UTILS ***/
		function add_style( rules, media ) {
			el = document.createElement( 'style' );
			el.setAttribute( 'type', 'text/css' );
			for ( i=0; i<rules.length; i++ ) {
				el.innerHTML += rules[ i ] + "\n";
			}
			if ( typeof media != "undefined" ) {
				el.innerHTML = "@media " + media + " { \n" + el.innerHTML + "} \n";
			}
			document.head.appendChild( el );
		}

		/*** STYLE ***/
		add_style( [
			"#content              { padding-left: 30px; }",
			".box_item             { overflow: visible; }",
			".box_item       li    { list-style: none;  }",
			".box_item:hover li, \
			 .box_item .flagged    { list-style-position: outside; list-style-type: decimal-leading-zero; }",
			".thought_star         { margin-left: -16px; }",
			".boxfooter            { padding: 0; border: 1px solid #C9C9C9; border-top: 0px; }",
			".thoughtarea          { border: 0px; padding: 7px 10px; }",
			".thoughtarea:focus, \
			 .thoughtarea:hover    { border: 0px; box-shadow: 0 0 0 #FFFFFF inset; }",
			".thought_area_wrapper { background: #FFFFFF; display: block; width: auto; }",
			".create_thought, \
			 .create_thought:hover { height: 100%; top: 0; background: none; border-radius: 0; border: 0px; border-left: 1px solid #C9C9C9; color:#2A2A2A; }"
		] );

	}
	var script = document.createElement("script");
	script.innerHTML = '(' + execute.toString() + ')();';
	document.head.appendChild(script);
})();