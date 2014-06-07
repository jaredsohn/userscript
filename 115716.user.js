// ==UserScript==
// @name           TM Auxiliary - Advanced Training Overview
// @version 	   1.0.1
// @description	   Make the training overview page easier to digest
// @namespace      http://94.143.11.31
// @include        http://94.143.11.31/training-overview/advanced/*
// @include        http://94.143.11.31/training-overview/advanced/*
// @include        http://94.143.11.31/training-overview/advanced/*

// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {
    	
	// Black/gray alternating table background
	$('table.zebra tr').css('background-color', '#222222');
	$('table.zebra tr.odd').css('background-color', 'rgb(48, 48, 48)');

	// Small training increases
	$('span.training_small').css('border', '1px rgb(141, 182, 82) solid');
	$('span.training_small').css('background-color', '#45521E');

	// Small training decreases
	$('span.training_part_down').css('border', '1px #D7220E solid');
	$('span.training_part_down').css('background-color', '#502927');

	// Big training increases
	$('span.training_big').css('font-size', '13px');
	$('span.training_big').css('font-weight', 'normal');
	$('span.training_big').css('background-color', '#93B751');
	$('span.training_big').css('color', '#000000');

	// Big training decreases
	$('span.training_down').css('font-size', '13px');
	$('span.training_down').css('font-weight', 'normal');
	$('span.training_down').css('background-color', '#D7220E');
	$('span.training_down').css('color', '#000000');

	// Increase all skill space sizes
	$('span.training_big, span.training_small, span.training_part_down, span.training_down, span.subtle').css('width', '15px');

	// No changes
	$('span.subtle').css('color', '#FFFFFF');

	// Remove position background
	$('table.zebra tr .favposition').css('background-color', '#222222');
	$('table.zebra tr.odd .favposition').css('background-color', 'rgb(48, 48, 48)');

	// Add borders to sides of tables
	$('table.zebra').css('border-left', '3px #222222 solid');
	$('table.zebra').css('border-right', '3px #222222 solid');

	// Intensity & +/- alignment
	$('table.zebra tr td:nth-child(18)').css('padding-right', '12px');
	$('table.zebra tr th:nth-child(19)').css('width', '34px');
	$('table.zebra tr td:nth-child(19) span').css('width', '32px');

	// Intensity & +/- alignment for goalie coach
	$('table.zebra:eq(5) tr td:nth-child(15)').css('padding-right', '12px');
	$('table.zebra:eq(5) tr th:nth-child(15)').css('width', '34px');
	$('table.zebra:eq(5) tr td:nth-child(16) span').css('width', '32px');

	// Coach headers
	$('h3').css('background-color', '#222222');

	// Show the stars!
	$('span:contains("19")').html('<img src="/pics/star_silver.png">');
	$('span:contains("20")').html('<img src="/pics/star.png">');
});