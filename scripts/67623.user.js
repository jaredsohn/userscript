// ==UserScript==
// @name           better ingatlan.com
// @namespace      *.ingatlan.com/*
// @include        http://*ingatlan.com/*
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.scr = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"
document.getElementsByTagName("head")[0].appendChild(script);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	$("#main2 > div:first > table").attr("cellspacing", "3");

	$.each($("tr.normaleven > td:nth-child(3), tr.normalodd > td:nth-child(3)"), function() {
		var price = $(this).prev().text().match(/\d+(\.\d+\s|\s)(e|m)/ig)[0];
		price.match("M") ? price = parseFloat(price) * 1000 : price = parseFloat(price);
		var squaremeters = parseFloat($(this).text());
		var squareprice = price / squaremeters;
		$(this).append("<br>(" + squareprice.toFixed(0) + "&nbsp;eFt/m²)");
	});

	if ($("div.d2_box_header").length != 0 && $("div.d2_box_header:first").text() == "Hirdetés adatai") {
		// calculate and add the price by squaremeters
		var price = $("table.reszletes > tbody > tr:nth-child(3):first").text().match(/\d+(\.\d+\s|\s)(e|m)/ig)[0];
		price.match("M") ? price = parseFloat(price) * 1000 : price = parseFloat(price);
		var squaremeters = parseFloat($("table.reszletes > tbody > tr:nth-child(4):first").text().match(/\d+\s|\d+\.\d+\s/));
		var squareprice = price / squaremeters;
		var address = $("td.cim:contains('Cím:')").next("td").text().replace(/\s/g,"+");
		$("table.reszletes > tbody > tr:nth-child(4):first").after('<tr><td width="45%" class="cim">Négyzetméterár:</td><td class="adat">' + squareprice.toFixed(0) + '&nbsp;eFt/m²</td></tr>');
		
		// add map
		var mainrow = $("#main2 > div:first > table > tbody > tr");
		var mapWidth = $(window).width() <= 1024 ? 405 : $(window).width() - 780;
		var mapHeight = $(window).height() < $("#header2").height() + 450 ? 450 : $(window).height() - parseInt($("#header2").height()) - 100;
		var iframe = '<iframe width="' + (parseInt(mapWidth)-20) + '" height="' + mapHeight + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?q=' + address + '&amp;output=embed&amp;iwloc=near&amp;z=15"></iframe><br /><small><a target="_blank" href="http://maps.google.com/maps?q=' + address + '" style="color:#0000FF;text-align:left">Nagyobb térkép</a></small>';
		$("#main2 > div:first > table > tbody > tr").append("<td valign='top'><table class='d2_box' cellspacing='0' style='width: " + mapWidth + "px;'><tr><td class='d2_box_left' style='padding: 0px;'><div></div></td><td class='d2_box_top' style='padding: 0px;'><div class='d2_box_bottom'><div class='d2_box_header'>Térkép</div><div class='d2_box_content' id='google_map'>" + iframe + "</div></div></td><td class='d2_box_right' style='padding: 0px;'><div></div></td></tr><tr></tr></tbody></table></td>");

		//additional mods
		$("table.reszletes > tbody > tr:contains('A kapcsolatfelvétel és a hirdető elérhetőségei')").hide();
		var desc = $("table.reszletes:eq(0) > tbody > tr:last").text();
						
		var indicators = new Array(
			new RegExp("mag(a|á)nszem(e|é)[^\\s]+", "gi"),
			new RegExp("s(u|ü|ű)rg(o|ö|ő)s[^\\s]+", "gi"),
			new RegExp("(a|á)ron\\sa(l|ll)ul[^\\s]+", "gi"),
			new RegExp("vil(a|á)gos[^\\s]+", "gi")
		);
		for (var i = 0; i <= indicators.length; i++) {
			if (desc.match(indicators[i])) {
				$("td.cim:contains('Ajánlat:')").parent().before('<tr><td width="45%" class="cim" style="color:green; font-size:1.3em;">' + desc.match(indicators[i]) + '</td></tr>')
			}
		}
		// add date to the end of the table
		// $("td.cim:contains('Cím:')").css("padding", "0px");
		// $("td.cim:contains('Cím:')").next("td").css("padding", "0px");
		// $("td.cim:contains('Cím:')").parent().after('<tr><td width="45%" class="cim" style="padding-bottom: 8px;">Dátum</td><td class="adat" style="padding-bottom: 8px;">' + $("span.db > span.uj:first").text() + '</td></tr>');
		// $("span.db").html($("span.db").html().match(/azo(.|\n)+/)[0])

		// remove background images and strech the elements with fixed size
		$("#main2, #header2").css({ "width" : "auto", "backgroundImage" : "url('')" });

		// uncomment the following two lines when CSS3 is supported by firefox to strech the background to 100%
		// $("#main2").css({ "backgroundImage" : $("#main2").css("backgroundImage"), "backgrdounRepeat" : "repeat-y", "backgroundPosition" : "left top", "backgroundColor" : "#FAFAFA", "backgroundSize" : "100%" });
		// $("#head2").css({ "backgroundImage" : $("#head2").css("backgroundImage"), "backgrdounRepeat" : "repeat-y", "backgroundPosition" : "left top", "backgroundColor" : "#FAFAFA", "backgroundSize" : "100%" });
	}
}