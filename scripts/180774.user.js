// ==UserScript==
// @name       TF2WH Filters
// @namespace  http://use.i.E.your.homepage/
// @version    1.3
// @description  Adds javascript filters for colors
// @match      http://tf2wh.com/*
// @match      https://tf2wh.com/*
// @match      http://*.tf2wh.com/*
// @match      https://*.tf2wh.com/*
// @copyright  2013+, {FM} [Linux] PIKACHU
// ==/UserScript==

var applyFilter = false, docustom = true, doafford = false;
unsafeWindow.$(function() {
	var sfilter = {},
		ufilter = {},
		typetimer = false;

	function updateAffordable() {
		var avail = parseInt(available_credits.replace(/\D+/g, ''));
		$("div.entry").each(function(p, item) {
			var i = $(item);
			if (i.attr('price')) {
				var price = parseInt(i.attr('price').replace(/\D+/g, ''));
				if (price <= avail) {
					i.addClass('afford').removeClass('unafford');
				}
				else {
					i.removeClass('afford').addClass('unafford');;
				}
			}
		})
	}

	applyFilter = function applyFilter() {
		if (typetimer != false) clearTimeout(typetimer);
		typetimer = false;
		updateAffordable();

		var entries = $("div.entry"),
			sel = entries,
			match = false,
			sub,
			hasFilter = false;

		if (!docustom) {
			match = $("div.entry.custom");
			sel = sel.not(match);
			hasFilter = true;
			match = false;
		}

		if (doafford) {
			match = $("div.entry.unafford");
			sel = sel.not(match);
			hasFilter = true;
			match = false;
		}

		for (var key in sfilter) {
			if (sfilter.hasOwnProperty(key)) {
				hasFilter = true;
				sub = $("div.entry.slot-" + key);
				if (!match) {
					match = sub;
				}
				else {
					match = match.add(sub);
				}
			}
		}
		if (match) {
			sel = sel.not(entries.not(match));
		}

		match = false;
		for (var key in ufilter) {
			if (ufilter.hasOwnProperty(key)) {
				hasFilter = true;
				sub = $("div.entry.used-" + key);
				if (!match) {
					match = sub;
				}
				else {
					match = match.add(sub);
				}
			}
		}
		if (match) {
			sel = sel.not(entries.not(match));
		}

		match = false;
		var search = $('#substr').val();
		if (search != '') {
			try {
				var ltPrice = false;
				hasFilter = true;
				match = $();
				if (/^<\d+c$/i.test(search)) {
					ltPrice = Number(search.substr(1,search.length-2));
				}
				else if (/^<=\d+c$/i.test(search)) {
					ltPrice = Number(search.substr(2,search.length-3)) + 1;
				}
				if (ltPrice !== false) {
					sel.each(function(pos, el) {
						var e = $(el);
						if (Number(e.attr('price')) < ltPrice) {
							if (!match) {
								match = e;
							}
							else {
								match = match.add(e);
							}
						}
					});
				}
				else {
					var pat = new RegExp(search, 'i');
					sel.each(function(pos, el) {
						var e = $(el);
						if (pat.test(e.attr('name'))) {
							if (!match) {
								match = e;
							}
							else {
								match = match.add(e);
							}
						}
					});
				}
			}
			catch (e) {
			}
		}
		if (match) {
			sel = sel.not(entries.not(match));
		}

		if (!hasFilter) {
			entries.show();
		}
		$(".pikaFilterShown").show();
		if (sel.length > 0) {
			entries.not(sel).hide();
			sel.show();
		}
		else {
			entries.hide();
		}
		$(".pikaHidden").hide();
		reheight();
        $('.allitems').css('height', '');
	};

	function typed() {
		if (typetimer != false) clearTimeout(typetimer);
		typetimer = setTimeout(applyFilter, 500);
	}

	$(".filter-class").unbind("click");

	$(".filter-class").click(function() {
		var el = $(this),
			name = el.data('filter');

		if (el.is(".active")) {
			delete ufilter[name];
			el.removeClass('active');
		}
		else {
			ufilter[name] = true;
			el.addClass('active');
		}
		applyFilter();
	});

	$(".filter-slot").unbind("click");

	$(".filter-slot").click(function() {
		var el = $(this),
			name = el.data('filter');

		if (el.is(".active")) {
			delete sfilter[name];
			el.removeClass('active');
		}
		else {
			sfilter[name] = true;
			el.addClass('active');
		}
		applyFilter();
	});

	$("#substr").unbind();

	$('#substr').change(applyFilter).keyup(typed);

	setTimeout(applyFilter,0);
});

unsafeWindow.filterReverseSplotch = function(splotchName, show) {
	var splotchTable = [
		"8208497-8208497",
		"8289918-8289918",
		"3100495-3100495",
		"13421772-13421772",
		"1-1",
		"16776960-16776960",
		"13595446-13595446",
		"16738740-16738740",
		"4345659-4345659",
		"4732984-3686984",
		"1315860-1315860",
		"65535-65535",
		"2490623-2490623",
		"7511618-7511618",
		"8421376-8421376",
		"16737280-16737280",
		"12073019-5801378",
		"5322826-5322826",
		"16711935-16711935",
		"12377523-12377523",
		"255-255",
		"12955537-12955537",
		"14204632-14204632",
		"15308410-15308410",
		"6901050-6901050",
		"8400928-2452877",
		"15132390-15132390",
		"13369344-13369344",
		"15185211-15185211",
		"15787660-15787660",
		"10843461-10843461",
		"205-205",
		"12807213-12091445",
		"16744192-16744192",
		"16741656-16741656",
		"65280-65280",
		"11049612-8626083",
		"16711680-16711680",
		"16742399-16742399",
		"14540032-14540032",
		"3329330-3329330",
		"2960676-2960676",
		"6637376-2636109",
		"8154199-8154199",
		"39168-39168",
		"9109759-9109759",
		"12517631-12517631",
		"3874595-1581885"
	];
	splotchNames = {
		"black": [4, 10, 45],
		"teamcolors": [16, 25, 32, 36, 42, 47],
		"white": [3, 19, 26],
		"gross": [18, 35],
		"nothing": []
	};
	if(show == undefined) {
		splotchName = "nothing";
	}
	// 4,5,8.10,11,16,18,19,25,26,32,36,37,39,42,43,47
	$(".entry").addClass("pikaHidden");
	$(".pikaFilterShown").removeClass("pikaHidden");
	for(var i = 0; i < splotchNames[splotchName.toLowerCase()].length; i++) {
		var splotchid = splotchNames[splotchName.toLowerCase()][i];
		if(show) {
			$(".filter-color-"+splotchName.toLowerCase()).addClass("active");
			$(".splotch-"+splotchTable[splotchid]).closest("div").removeClass("pikaHidden");
			$(".splotch-"+splotchTable[splotchid]).closest("div").addClass("pikaFilterShown");
		} else {
			$(".filter-color-"+splotchName.toLowerCase()).removeClass("active");
			$(".splotch-"+splotchTable[splotchid]).closest("div").removeClass("pikaFilterShown");
			$(".splotch-"+splotchTable[splotchid]).closest("div").addClass("pikaHidden");
		}
	}
	if(!($(".pikaFilterShown").length)) {
		$(".pikaHidden").removeClass("pikaHidden");
	}
	applyFilter();
}

unsafeWindow.filterReverseSplotchClick = function(obj) {
	var jobj = $(obj);
	var color = jobj.data('filter');
	var active = jobj.hasClass('active');
	filterReverseSplotch(color, !active);
};

var htmlToAppend = "<br>";
var splotchNames = {"black":"Black", "teamcolors":"Team Colors", "white":"White", "gross":"Gross"};
for(var i in splotchNames) {
	htmlToAppend += '<span class="filter filter-color-'+i+'" onclick="filterReverseSplotchClick(this);" style="background-image:none; text-align:center; vertical-align:middle" data-filter="'+i+'"><strong><small>'+splotchNames[i]+'</small></strong></span>';
};

$('.filter-tool').after(htmlToAppend);

console.log("TF2WH Filters loaded!");