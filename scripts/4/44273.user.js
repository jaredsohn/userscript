// ==UserScript==
// @name           Brainstorm Enhancements
// @copyright      2009, Andrew Keyes (http://www.ahotw.com/)
// @author         Andrew Keyes
// @homepage       http://www.ahotw.com/
// @version        0.1.1
// @description    Hides the solutions to make it easier to quickly scan a list of Ideas. Solutions can be restored by a simple click.
// @namespace      http://www.ahotw.com/
// @include        http://brainstorm.ubuntu.com/*
// @exclude        http://brainstorm.ubuntu.com/idea/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$ = unsafeWindow.jQuery;
var buttonStyle = {
	'-moz-border-radius':	'5px',
	'cursor':				'pointer',
	'padding':				'.2em 1em',
	'text-align':			'center',
	'border':				'1px solid #EAEADA',
	'background-color':		'#EAEADA',
	'color':				'#5A3320',
	'font-weight':			'bold'
}
$(".choicelisting > tbody > tr > td > table:last-child").each(function () {
	$(this).after("<div class='hide hideshow'>Hide Solutions</div>");
	$(this).before("<div class='hide hideshow'>Hide Solutions</div>");
	$(this).hide();
	$(this).siblings(".hide").hide();
	$(this).before("<div class='show hideshow'>Show Solutions</div>");
	$(".hideshow").css(buttonStyle);
	$(this).siblings(".show").click(function () {
		$(this).siblings("table:last").slideDown();
		$(this).hide();
		$(this).siblings(".hide").show();
	});
	$(this).siblings(".hide").click(function() {
		$(".hide").hide();
		$(this).siblings("table:last").slideUp();
		$(this).siblings(".show").show();
	});
});