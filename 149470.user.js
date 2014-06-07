// ==UserScript==
// @name       tf2wh scrolling ticker
// @version    1.1
// @description Keeps the ticker, find and menu visible at all times.
// @match      http://www.tf2wh.com/*
// @copyright  -
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
	
	$("#nav").clone().insertAfter("#nav").attr('id', 'fakeNav');
	$('#fakeNav').empty();
	
	$('body').append('<style>#fakeNav { border: 2px solid #000000; border-radius: 4px 4px 4px 4px; box-shadow: 2px 2px 2px #333333; font-family: TF2Build,arial,helvetica,sans-serif; height: 25px; margin: 10px 25px 10px 10px; padding: 6px; display: none; }</style>');
	$('body').append('<style>.fixedFake { display: block !important; }</style>');
	$('body').append('<style>.fixedFind { position: fixed; top: 45px; background-color: #a97932; }</style>');
	$('body').append('<style>.fixedSidebar { position: fixed; top: 120px; height: 550px !important; background-color: #a97932; }</style>');
	$('body').append('<style>.fixedMenu { position: fixed; top: 0; width: 1000px; z-index: 1100; margin: 0px 25px 10px 10px !important; background-color: #a97932 !important; }</style>');

	var div_top = $('.find').offset().top;
	var nav_top = $('#nav').offset().top;
	
	$(document).scroll(function() {
		
		var useFixedFind = $(document).scrollTop() > div_top - 45;
			$('.find').toggleClass('fixedFind', useFixedFind);
		var useFixedSidebar = $(document).scrollTop() > div_top - 45;
			$('.ticker').toggleClass('fixedSidebar', useFixedSidebar);
		var useFixedMenu = $(document).scrollTop() > nav_top;
			$('#nav').toggleClass('fixedMenu', useFixedMenu);
			$('#fakeNav').toggleClass('fixedFake', useFixedMenu);
		
	});
}

addJQuery(main);


