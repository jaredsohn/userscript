// ==UserScript==
// @name           eRep Allies and Enemies
// @description    Shows a tally of users with citizenship in allied or enemy countries
// @version        0.27
// @author         eCitizen Maruishima
// @namespace      http://www.erepublik.com/en/citizen/profile/
// @include        http://www.erepublik.com/en/citizen/profile/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var friendFoe = new function() {
	var me		= this;

	this.author	= null;
	this.pages	= null;

	this.acount	= 0;
	this.ecount	= 0;
	this.pcount	= 0;
	this.tcount	= 0;

	this.uid	= [];
	this.countries	= [];

	this.allies	= [
		"Australia",
		"Bosnia and Herzegovina",
		"Canada",
		"China",
		"Croatia",
		"Finland",
		"Greece",
		"India",
		"Ireland",
		"Israel",
		"Japan",
		"Moldova",
		"Norway",
		"Peru",
		"Philippines",
		"Poland",
		"Romania",
		"Slovakia",
		"South Africa",
		"Spain",
		"Sweden",
		"Switzerland",
		'USA'
	];

	this.enemies = [
		"Argentina",
		"Bolivia",
		"Brazil",
		"Bulgaria",
		"Colombia",
		"Denmark",
		"Estonia",
		"France",
		"Germany",
		"Hungary",
		"Indonesia",
		"Iran",
		"Italy",
		"Latvia",
		"Lithuania",
		"Mexico",
		"Netherlands",
		"North Korea",
		"Pakistan",
		"Paraguay",
		"Portugal",
		"Russia",
		"Serbia",
		"Slovenia",
		"Turkey",
		"United Kingdom",
		"Uruguay",
		"Venezuela"
	];

	$(window).load(function() {
		me.author = $("#author").val();

		$(
			'<div id="friendfoe" class="holder">' +
			'    <h2 class="section">Allies &amp; Enemies</h2>' +
			'</div>'
		)
			.insertAfter(".chat_rooms")

		$(
			'    <li>' +
			'        <a href="http://ereptools.net/battles/playerFights/id/'+me.author+'" target="_blank">Show fights</a>' +
			'    </li>'
		)
			.appendTo("#user_menu")

		$(
			'    <div class="action">' +
			'        <span class="vround-btn-start">' +
			'            <span class="vround-btn-end"><a class="vround-btn-core" href="javascript:void(0);">Ally/Enemy Tally</a></span>' +
			'        </span>' +
			'    </div>'
		)
			.appendTo("#friendfoe")
			.click(function() {
				$(this).unbind("click");

				$("#friendfoe div")
					.html(
						'<table style="width:100%;margin:10px 0;clear:both;">' +
						'    <tr class="acount">' +
						'        <td style="padding-right:10px;">Allies</td>' +
						'        <td style="font-weight:700;" class="count">0</td>' +
						'    </tr>' +
						'    <tr class="ecount">' +
						'        <td style="padding-right:10px;">Enemies</td>' +
						'        <td style="font-weight:700;" class="count">0</td>' +
						'    </tr>' +
						'    <tr class="tcount">' +
						'        <td style="padding-right:10px;">Processed</td>' +
						'        <td style="font-weight:700;" class="count">0</td>' +
						'    </tr>' +
						'    <tr>' +
						'        <td colspan="2"><hr></td>' +
						'    </tr>' +
						'</table>'
					);

				me.pages	= parseInt($("#number_of_pages").html());
				me.friends	= parseInt($("#number_of_friends").val());

				for (var page=0;page<=me.pages;page++) {
					$.getJSON("/citizen/friends/"+me.author+"/"+page+"&callback?", function(data) {
						me.tcount += data.length;

						$.each(data, function(idx, user) {
							if (user["xp"] != "Or") me.uid.push( user["url"].split("profile/")[1] );
						});

						if (me.tcount >= me.friends - 1) me.process();
					});
				}
			});
	});

	this.process = function() {
		if (me.pcount >= me.uid.length) return;

		var uid = me.uid[me.pcount];

		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://api.erepublik.com/v1/feeds/citizens/" + uid,
			onload:function(x) {
				var data	= x.responseText.split("<employer>")[0] + "</citizen>";

				var cid		= $(data).find("citizenship c-id").text();
				var country = $(data).find("citizenship country").text();

				console.log(cid+"="+country);

				if ($.inArray(country,me.allies)	!= -1) me.acount++;
				if ($.inArray(country,me.enemies)	!= -1) me.ecount++;

				me.pcount++;

				$(".acount .count").text(me.acount);
				$(".ecount .count").text(me.ecount);
				$(".tcount .count").text(me.pcount + " of " + me.uid.length);

				if (cid.length > 0) {
					if ($("#c"+cid).length == 0) {
						me.countries[cid] = 1;

						$("#friendfoe div table")
							.append(
								'<tr id="c'+cid+'">' +
								'<td style="padding-right:10px;">'+country+ '</td>' +
								'<td style="font-weight:700;" class="count">1</td>' +
								'</tr>'
							);
					}
					else {
						me.countries[cid]++;
						$("#c"+cid+" td.count").html(me.countries[cid]);
					}
				}

				me.process(me.pcount-1);
			}
		});
	}
}