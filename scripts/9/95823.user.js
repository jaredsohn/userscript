// ==UserScript==
// @name          Screw The Spoiler
// @author        jnozsc
// @grant         none
// @namespace     http://www.douban.com/people/1563045/
// @description   clear the spoiler on douban.com by default, add a button to switch whether display the spoiler or not
// @include       http://movie.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @match         http://movie.douban.com/subject/*
// @match         http://book.douban.com/subject/*
// @exclude       http://movie.douban.com/subject/*interest*
// @exclude       http://book.douban.com/subject/*interest*
// @exclude       http://movie.douban.com/subject/*edit*
// @exclude       http://book.douban.com/subject/*edit*
// @exclude       http://book.douban.com/subject/*annotation*
// @exclude       http://book.douban.com/subject/*reviews*
// @exclude       http://movie.douban.com/subject/*reviews*
// @exclude       http://movie.douban.com/subject/*comments*
// @exclude       http://movie.douban.com/subject/*doulists*
// @exclude       http://book.douban.com/subject/*doulists*
// @version       1.5.2
// ==/UserScript==

function main($) {
	'use strict';
	jQuery.noConflict();

	// define the switch function
	$(function () {
		$("button#switch_display").click(function () {
			if (!display_flag) {
				$(".related-info").show("fast");
				$(".related_info").show("fast");
				$("#db-doulist-section").show("fast");
				$("h2:contains('以下豆列推荐')").show("fast");
				$("#subject-doulist").show("fast");
				$("#subject-others-interests").show("fast");
				$(".tags").show("fast");
				$("h2:contains('谁看这部电影?')").show("fast");
				$("h2:contains('谁读这本书?')").show("fast");
				$("#collector").show("fast");
				$("#comments-section").show("fast");
				$("#review_section").show("fast");
				$(".related-pic").show("fast");
				$("button#switch_display").text('unspoiler it!');
			} else {
				$(".related-info").hide("fast");
				$(".related_info").hide("fast");
				$("#db-doulist-section").hide("fast");
				$("h2:contains('以下豆列推荐')").hide("fast");
				$("#subject-doulist").hide("fast");
				$("#subject-others-interests").hide("fast");
				$(".tags").hide("fast");
				$("h2:contains('谁看这部电影?')").hide("fast");
				$("h2:contains('谁读这本书?')").hide("fast");
				$("#collector").hide("fast");
				$("#comments-section").hide("fast");
				$(".related-pic").hide("fast");
				$("#review_section").hide("fast");
				$("button#switch_display").text('Spoiler it!');
			}
			display_flag = !display_flag;
		});
	});

	// define the flag
	var display_flag = false;

	// default display nothing
	$(".related-pic").hide();
	$("#review_section").hide();
	$("#comments-section").hide();
	$(".related-info").hide();
	$(".related_info").hide();
	$("#db-doulist-section").hide();
	$("h2:contains('以下豆列推荐')").hide();
	$("#subject-doulist").hide();
	$("#subject-others-interests").hide();
	$(".tags").hide();
	$("h2:contains('谁看这部电影?')").hide();
	$("h2:contains('谁读这本书?')").hide();
	$("#collector").hide();

	// add a button to switch
	if ($("#interest_sectl").size() > 0) {
		$("#interest_sectl").append('<button id="switch_display">Spoiler it!</button>');
	} else {
		$('#info').append('<br/><span><button id="switch_display">Spoiler it!</button></span>');
	}
}

function thirdParty($) {
	'use strict';
	jQuery.noConflict();

	// Put third-party non-jQuery functions here.  They'll be wrapped into the 
	// jQuery prototype in a moment.
	var sayHello = function (who) {
		alert('Hello ' + who + '!');
	}

	jQuery.extend({
		// If you have any non-jQuery functions, they need to be wrapped in here.
		sayHellow: function (who) {
			return sayHello('World');
		}
	});

	// Put third-party jQuery plugins, extensions, etc. here
}

!
function loader(i) {
	var script, requires = ['http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'],
		head = document.getElementsByTagName('head')[0],
		makeScript = function () {
			script = document.createElement('script');
			script.type = 'text/javascript';
		},
		loadLocal = function (fn) {
			makeScript();
			script.textContent = '(' + fn.toString() + ')(jQuery);';
			head.appendChild(script);
		};
		(function (i) {
			makeScript();
			script.src = requires[i];
			script.addEventListener('load', function () {
				++i !== requires.length ? loader(i) : (loadLocal(thirdParty), loadLocal(main));
			}, true);
			head.appendChild(script);
		})(i || 0);
}();