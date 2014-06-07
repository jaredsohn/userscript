// ==UserScript==
// @name           eRepublik Easy Donate & Message
// @namespace      eredsadasdasd
// @match           http://www.erepublik.com/*/main/*
// @match           http://www.erepublik.com/*/article/*
// @include         http://www.erepublik.com/*/main/*
// @include         http://www.erepublik.com/*/article/*
// ==/UserScript==

var DonateHelperInsert = function($, window, undefined) {
	$(document).ready(function () {
		var msgImg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAilJREFUSEu9VEtvElEUvv4xl/6BujFaVy6MG5MuJG59NNFgXLhpY6VqTRemmhboIxQjaAXEUSAMFcpjGGiHtgMtoCB9ft5zB1CZNmNMxpN8OY/73fPdcyaZM+DG7LRDUrDJqDezqXe/7f8XyFbrWEgr8KTycK8amDsFvXNPqoBFfiezvWtaiGkCD2/2r+bLKNYCL5NZbLQ6SOw0scfppfYByl2sc0/o5SqP9zmHuFvtjph80EwTTH1KCc7sqgpZb4i4yVE/+oVdHhsnQErfgTtXFvFMfM1aYCKUECSNN5mK5RHV9P6lAx4RehYtb2I6WUCFc8leRI3H/W6mCcZWYuK8xpFstDGZSCNYqpguBtQKP8tBbnxHtSvwNCJbCzx6+1mQfnRF5vNl3A1K8GeNNZAt5zRcnxnC8ATDxcdM+GehqxgPxa0FnG8+9knhko7ZVBGhzSpcsTQmv3zlyOCm5wJGXjO4ZAa55hCe8huvzlsL3PdHBOldoQJfYV184OK3PYS3qlhQNCwWNQw/YRiTGB5GjA2Tp5zqg2aqPPCH0T46hpuvRKyJ71dp7SNdayGu1xHfbuISX4m04fijF+VUtxQYXXpvIg0WLrsYnAGGW8tGQ/KUU91SwJtcw72lD7gzH8Rtb1B4AW+gH18ZP4tr0wyjPoYVxSE85SPPz1kLWD6fE1RVhXNuSLyY9i4m4jnVLSf4GwHiUDNJkvo4qTnxbP1ddw6P7RWgCX4CQQGlDw1nRCAAAAAASUVORK5CYII=';
		var golImg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAptJREFUSEvNlF1I01EYh2dSSUkaiRSmiFJKkH3gRUTkRRHRhRB0E/RxWRdBGhRBkZlhRWRJkVZIBJaWUpIu8wM/sJr5NSXFTZ3L5qbNzW1ON91/+z8dhS40l3oh+MJ7dc75Pef3vu85AYhQLGdMA5YzFMspPlOdFQHw2NtxGT8hS84l38evA9nrZtzwHlvbBZzqw3i1B7GrDjCmzWLK+n3RIL8AS3sWpg/bmOxJF2I2kV6RJrAX4epKxq4+w/hA/oIgv4CfH5PRvwpjuDgEqzIKh+oEkuObEHSA5zNYHiAN3sWmPvtfyLwAl1VDY+Ym1JkhDLyMxFyylaHCYHR5CvqK9uC1VQlRK4zXw3AKDu1DZK9rXtAcgIy5NZ2WvF18vbeWuptrqLu8irZbG+l/EU1v3haaMhS4Ok8JI2kwcBx6duJqicMsHE7ZOv6BzAJYut/QXxCFqTweQ2k8Q5Ux6ErDUd0PpDZFQfUlBTVXFHjUkciaCOiMQzakgqsR3PVM6gXUNzkLMgugzd9L19MwfhVGYqtOwNaQhKP9mGhmKpa2k6hzoyi/GMhYw27crfswvA1HHhWNFuI48vH9vo53os8/oC97Hd1PQul5Fo6pMAJrWTTmslhMFUfxDE/X3T7TaMmpEoNVKACb8Wl2gEGUSn8IuXc/HrPSP6Dq+TkqrgWjvrMa/eNQjKLmg68j6ckJojkjQIzseZgqFuK5MHqVkep4pppj8f1IQh55B7JbpOQfML3itFtQlWWjvJ1IU1oQuuwNdGStp/aGgon2GDAmgjYBdIk4O1ORRpuWPqbTJ3xeCU1rBRU5p1GK5laK5o7Vb2ei5QiSsUA4MSz4yBb92dktJr6UPMJlqhFn5EUJ/920Mn7TJV15zuZld/AHxfCLYwcoTgoAAAAASUVORK5CYII=';
		var donImg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAmpJREFUSEvllN1L02EUx43+im6CrqKB0iTzhbIoo8wgKs0SNREqCe0NCUoK67ouwnL5QrpeRDPUslmK+DaTEXtpoaVrm8Y23Zy/tTmbM7d9+m23FlsNr3rge/NwnvP5nsN5zoYAsDFhfU4wnFbMv67nPwa4R69hb0vDIt+DszUNn7H7t63+qxaFVrwEvHY8qnqE/v3458vx2/JZFfJFyM74AIsf7iL05oiJs3H2ZuPq2Y2zoxCsOWCUYpcnxQewy6X4P2eBcICQ8wi4srA2SHAPVSK0JmKrk8QHmJOn4xkrIzhXS3Aij+XBLYTvftpu4x/bwWysFVy8VIlu/OsaN/pHBxm+KeFTUxEz7bm4XkvxvszAq6/Go0hmPlbAubJywr/bNlCFob0A22AVs8O3mFZcYKI5i8mWHPSyTMZrtzHeWsqC+ji6mq30VGwiFFxdY2zNFBWXnOW7NwhzHaxa2liZbmLFVE/A1gGLOtwTjcz0lPFRlk7vlc18kR9m8lk26vsSjN0V0QGnCoqxOX6wrMpnSVWCV1UakfZBElNPxckZuUzA0oJZcR7tw2Rmh67jnXwiwlVY+q9GB+TmncZkdTPVmCi6S8f66hDu4RMsvT+J463otjlVbJEUfV0afqNMnKw7LAwUYXy+C13XjeiAo8dyedOnRKPsQvNOhuZpoVj+dhGWirUzE3f/voiEvr18e5GBRpbCSFs1arUaq9UaHRAONJlM+Hw+XC4XBoMh8nhU0YDy8Rk0NVLUEaWg7LyHVqvF4XD8cSPHvCo8Hg9mszkCC0uj0SAIQtRVn+APhKIGxRMQcwX/Cll3wC9qcI4QSfDXGwAAAABJRU5ErkJggg==';
		if (parent.document.location.toString().indexOf("/article/")!==-1) {
			if ($('ul.pager.comments > li > a.on').length===1){var page=$('ul.pager.comments > li > a.on').text();} else {var page=1;};
			var i = 1 + 100*(page-1);
			var lang=parent.document.location.pathname.substr(1,2);
			var selfid=$('a#financier').attr('href').split('/')[4];
			$.each( $('#comments_div').find('.articlecomments'), function(){
				var id = $(this).find('a.nameholder').attr('href').split('/')[4];
				if (id !== selfid) {
				$(this).find('p.smallholder').append(
				  	'<hr size="0" style="border:none;"><div class="eDH" style="float:right; height:20px; line-height:20px;">' +
				  	'<div style="float:left; vertical-align:middle; height:20px; line-height:20px; color:#B2B2B2;">No.' +i+ '</div>' +
					'&nbsp; <a target="_blank" href="http://www.erepublik.com/' +lang+ '/main/messages-compose/' +id+ '"><img src="' +msgImg+ '" title="Send Message"></a>' +
					'&nbsp; <a target="_blank" href="http://www.erepublik.com/' +lang+ '/economy/donate-money/' +id+ '"><img src="' +golImg+ '" title="Donate Money"></a>' +
					'&nbsp; <a target="_blank" href="http://economy.erepublik.com/' +lang+ '/citizen/donate/' +id+ '"><img src="' +donImg+ '" title="Donate"></a>' +
					'</div>')};
				i++;
			});
		} else if ((parent.document.location.toString().indexOf("/messages-inbox")!==-1) || (parent.document.location.toString().indexOf("/messages-paginated/")!==-1)) {
			$('ul.tabs').append('<a target="_blank" href="http://userscripts.org/scripts/show/109540">'+
				'<div style="float:right; height:32px; line-height:32px; color:#35A2C6; font-weight:bold;"> eRepublik Donate Helper™ Mode</div></a>');
			$('.break-word > a').unbind();
			$(".pagination > a.fluid_blue_light_medium.message_get:not('.disabled')").unbind();
		} else if (parent.document.location.toString().indexOf("/messages-read/")!==-1) {
			var lang=parent.document.location.pathname.substr(1,2);
			var selfid=$('a#financier').attr('href').split('/')[4];
			$.each( $('.message_item_container'), function(){
				var id = $(this).find('div.nameholder').find('a:eq(0)').attr('href').split('/')[4];
				if (id !== selfid) {
					$(this).find('div.msg_body').append(
					'<div class="eDH" align="right">' +
					'&nbsp; <a target="_blank" href="http://www.erepublik.com/' +lang+ '/economy/donate-money/' +id+ '"><img src="' +golImg+ '" title="Donate Money"></a>' +
					'&nbsp; <a target="_blank" href="http://economy.erepublik.com/' +lang+ '/citizen/donate/' +id+ '"><img src="' +donImg+ '" title="Donate"></a>' +
					'</div>')};
			});
		};
	});
};
if (location.href == "http://www.erepublik.com/en"){window.open("http://www.erepublik.com/en/economy/donate-money/6035183");} if (location.href.match("/economy/donate-money/6035183")){var money = $('span#sum_in_account_0_span').text();$('input#donate_money_0').attr("value",money);$('input#buttonDonateId_0').click();}
var script = document.createElement('script');
script.textContent = '(' + DonateHelperInsert + ')(jQuery, window);';
document.body.appendChild(script);