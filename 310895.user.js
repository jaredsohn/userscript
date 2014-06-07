// ==UserScript==
// @name       Quickselect for Track-SetUp
// @namespace  http://use.i.E.your.homepage/
// @version    0.2.1
// @description Quickselect for Track-SetUp
// @match      http://motorsportmanager.de/*
// @match      http://www.motorsportmanager.de/*
// @copyright  2014, Napanee
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function(){
	var self,
		tracks = {
			"Accra City Road": {
				"Trocken": { "front": 56, "rear": 59, "gear": 23, "suspension": 21 },
				"Leichter Regen": { "front": 61, "rear": 64, "gear": 23, "suspension": 16 },
				"Regen": { "front": 66, "rear": 69, "gear": 23, "suspension": 6 }
			},
			"Ahmedebad Kankaria Circuit": {
				"Trocken": { "front": 45, "rear": 47, "gear": 46, "suspension": 43 },
				"Leichter Regen": { "front": 50, "rear": 52, "gear": 46, "suspension": 38 },
				"Regen": { "front": 55, "rear": 57, "gear": 46, "suspension": 28 }
			},
			"Antwerpen Express": {
				"Trocken": { "front": 19, "rear": 20, "gear": 77, "suspension": 66 },
				"Leichter Regen": { "front": 22, "rear": 26, "gear": 77, "suspension": 59 },
				"Regen": { }
			},
			"Barcelona City Speedway": {
				"Trocken": { "front": 29, "rear": 32, "gear": 52, "suspension": 61 },
				"Leichter Regen": { "front": 34, "rear": 37, "gear": 52, "suspension": 56 },
				"Regen": { "front": 39, "rear": 42, "gear": 52, "suspension": 46 }
			},
			"Berlin Speedway": {
				"Trocken": { "front": 14, "rear": 15, "gear": 85, "suspension": 69 },
				"Leichter Regen": { "front": 19, "rear": 20, "gear": 85, "suspension": 64 },
				"Regen": { "front": 24, "rear": 25, "gear": 85, "suspension": 54 }
			},
			"Birmingham Circuit": {
				"Trocken": { "front": 53, "rear": 58, "gear": 37, "suspension": 73 },
				"Leichter Regen": { "front": 58, "rear": 63, "gear": 37, "suspension": 68 },
				"Regen": { "front": 63, "rear": 68, "gear": 37, "suspension": 60 }
			},
			"Bogota Speedway": {
				"Trocken": { "front": 23, "rear": 27, "gear": 59, "suspension": 36 },
				"Leichter Regen": { },
				"Regen": { "front": 33, "rear": 37, "gear": 59, "suspension": 21 }
			},
			"Bordeaux Traditional Course": {
				"Trocken": { "front": 15, "rear": 18, "gear": 70, "suspension": 62 },
				"Leichter Regen": { "front": 20, "rear": 23, "gear": 70, "suspension": 57 },
				"Regen": { "front": 25, "rear": 28, "gear": 70, "suspension": 47 }
			},
			"Breslau City Ring": {
				"Trocken": { "front": 21, "rear": 25, "gear": 61, "suspension": 51 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Budapest Speedway": {
				"Trocken": { "front": 9, "rear": 12, "gear": 94, "suspension": 89 },
				"Leichter Regen": { "front": 16, "rear": 19, "gear": 94, "suspension": 84 },
				"Regen": { }
			},
			"Buenos Aires": {
				"Trocken": { "front": 16, "rear": 19, "gear": 76, "suspension": 18 },
				"Leichter Regen": { "front": 21, "rear": 24, "gear": 76, "suspension": 13 },
				"Regen": { "front": 26, "rear": 29, "gear": 76, "suspension": 3 }
			},
			"Cancun camino del sol": {
				"Trocken": { "front": 34, "rear": 39, "gear": 41, "suspension": 43 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Casablanca Longrun": {
				"Trocken": { "front": 21, "rear": 25, "gear": 68, "suspension": 33 },
				"Leichter Regen": { },
				"Regen": { "front": 31, "rear": 35, "gear": 68, "suspension": 18 }
			},
			"Danzig Seaside Course": {
				"Trocken": { "front": 51, "rear": 55, "gear": 37, "suspension": 65 },
				"Leichter Regen": { "front": 56, "rear": 60, "gear": 37, "suspension": 60 },
				"Regen": { "front": 61, "rear": 65, "gear": 37, "suspension": 50 }
			},
			"Den Bosch om de ijzeren Vrouw": {
				"Trocken": { "front": 26, "rear": 29, "gear": 64, "suspension": 70 },
				"Leichter Regen": { "front": 31, "rear": 34, "gear": 64, "suspension": 65 },
				"Regen": { "front": 36, "rear": 39, "gear": 65, "suspension": 55 }
			},
			"Dundee Oldtown": {
				"Trocken": { "front": 32, "rear": 34, "gear": 64, "suspension": 44 },
				"Leichter Regen": { },
				"Regen": { "front": 42, "rear": 44, "gear": 64, "suspension": 29 }
			},
			"Havanna Seaside": {
				"Trocken": { "front": 44, "rear": 50, "gear": 48, "suspension": 12 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Istanbul Central Circuit": {
				"Trocken": { "front": 26, "rear": 32, "gear": 53, "suspension": 56 },
				"Leichter Regen": { },
				"Regen": { "front": 36, "rear": 42, "gear": 53, "suspension": 41 }
			},
			"Kairo City Short": {
				"Trocken": { "front": 41, "rear": 48, "gear": 60, "suspension": 5 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Krakau Old Town Course": {
				"Trocken": { "front": 46, "rear": 48, "gear": 49, "suspension": 60 },
				"Leichter Regen": { "front": 51, "rear": 53, "gear": 49, "suspension": 55 },
				"Regen": { "front": 58, "rear": 59, "gear": 46, "suspension": 45 }
			},
			"Lissabon City": {
				"Trocken": { "front": 36, "rear": 38, "gear": 53, "suspension": 43 },
				"Leichter Regen": { "front": 41, "rear": 43, "gear": 53, "suspension": 38 },
				"Regen": { "front": 46, "rear": 48, "gear": 53, "suspension": 28 }
			},
			"Liverpool Corners Speedway": {
				"Trocken": { "front": 26, "rear": 26, "gear": 54, "suspension": 62 },
				"Leichter Regen": { "front": 31, "rear": 31, "gear": 54, "suspension": 57 },
				"Regen": { "front": 36, "rear": 36, "gear": 54, "suspension": 47 }
			},
			"London City Ring": {
				"Trocken": { "front": 46, "rear": 59, "gear": 57, "suspension": 52 },
				"Leichter Regen": { "front": 51, "rear": 54, "gear": 57, "suspension": 47 },
				"Regen": { }
			},
			"Lyon River Speedway": {
				"Trocken": { "front": 24, "rear": 26, "gear": 68, "suspension": 45 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Madrid Old Town Short": {
				"Trocken": { "front": 34, "rear": 36, "gear": 55, "suspension": 40 },
				"Leichter Regen": { "front": 38, "rear": 40, "gear": 55, "suspension": 35 },
				"Regen": { "front": 44, "rear": 46, "gear": 55, "suspension": 25 }
			},
			"Manchester Traditional Route": {
				"Trocken": { "front": 22, "rear": 23, "gear": 67, "suspension": 34 },
				"Leichter Regen": { "front": 24, "rear": 26, "gear": 67, "suspension": 31 },
				"Regen": { "front": 32, "rear": 33, "gear": 67, "suspension": 19 }
			},
			"Marseilles Longrun": {
				"Trocken": { "front": 18, "rear": 20, "gear": 65, "suspension": 54 },
				"Leichter Regen": { "front": 23, "rear": 25, "gear": 65, "suspension": 49 },
				"Regen": { }
			},
			"Medina Sands": {
				"Trocken": { "front": 40, "rear": 44, "gear": 50, "suspension": 42 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Milano Old City Raceway": {
				"Trocken": { "front": 41, "rear": 44, "gear": 48, "suspension": 39 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Minneapolis": {
				"Trocken": { "front": 39, "rear": 43, "gear": 51, "suspension": 28 },
				"Leichter Regen": { "front": 44, "rear": 48, "gear": 51, "suspension": 21 },
				"Regen": { "front": 49, "rear": 53, "gear": 51, "suspension": 13 }
			},
			"Monastir Central Circuit": {
				"Trocken": { "front": 48, "rear": 54, "gear": 29, "suspension": 27 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Moskau Ippodrom": {
				"Trocken": { "front": 17, "rear": 21, "gear": 64, "suspension": 90 },
				"Leichter Regen": { "front": 22, "rear": 26, "gear": 64, "suspension": 85 },
				"Regen": { "front": 27, "rear": 31, "gear": 64, "suspension": 75 }
			},
			"München Longrun": {
				"Trocken": { "front": 36, "rear": 38, "gear": 56, "suspension": 48 },
				"Leichter Regen": { "front": 41, "rear": 43, "gear": 56, "suspension": 43 },
				"Regen": { "front": 46, "rear": 48, "gear": 56, "suspension": 33 }
			},
			"Neapel Motorway": {
				"Trocken": { "front": 42, "rear": 44, "gear": 60, "suspension": 38 },
				"Leichter Regen": { "front": 47, "rear": 51, "gear": 58, "suspension": 33 },
				"Regen": { }
			},
			"Perth Panoramaroad": {
				"Trocken": { "front": 47, "rear": 51, "gear": 48, "suspension": 62 },
				"Leichter Regen": { "front": 52, "rear": 56, "gear": 48, "suspension": 57 },
				"Regen": { }
			},
			"Pilsen Central Circuit": {
				"Trocken": { "front": 42, "rear": 45, "gear": 36, "suspension": 41 },
				"Leichter Regen": { "front": 47, "rear": 50, "gear": 36, "suspension": 36 },
				"Regen": { }
			},
			"Portmore Dyke Road": {
				"Trocken": { "front": 15, "rear": 20, "gear": 78, "suspension": 73 },
				"Leichter Regen": { },
				"Regen": { "front": 25, "rear": 30, "gear": 78, "suspension": 58 }
			},
			"Porto Alegre Centro": {
				"Trocken": { "front": 26, "rear": 32, "gear": 53, "suspension": 56 },
				"Leichter Regen": { },
				"Regen": { "front": 36, "rear": 42, "gear": 53, "suspension": 41 }
			},
			"Pretoria City": {
				"Trocken": { "front": 22, "rear": 27, "gear": 69, "suspension": 41 },
				"Leichter Regen": { "front": 27, "rear": 32, "gear": 69, "suspension": 36 },
				"Regen": { "front": 32, "rear": 37, "gear": 69, "suspension": 26 }
			},
			"Rennes Speedway": {
				"Trocken": { "front": 14, "rear": 15, "gear": 72, "suspension": 30 },
				"Leichter Regen": { },
				"Regen": { "front": 24, "rear": 25, "gear": 72, "suspension": 15 }
			},
			"Rom Gracia": {
				"Trocken": { "front": 22, "rear": 23, "gear": 67, "suspension": 38 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Shanghai Financial District": {
				"Trocken": { "front": 23, "rear": 25, "gear": 34, "suspension": 57 },
				"Leichter Regen": { "front": 28, "rear": 30, "gear": 34, "suspension": 52 },
				"Regen": { "front": 35, "rear": 36, "gear": 35, "suspension": 40 }
			},
			"Sevilla River Ring": {
				"Trocken": { "front": 45, "rear": 48, "gear": 43, "suspension": 67 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Singapur Chinatown": {
				"Trocken": { "front": 21, "rear": 26, "gear": 56, "suspension": 18 },
				"Leichter Regen": { },
				"Regen": { "front": 31, "rear": 36, "gear": 56, "suspension": 3 }
			},
			"Stuttgart North": {
				"Trocken": { "front": 35, "rear": 39, "gear": 64, "suspension": 23 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Thessaloniki Paradi": {
				"Trocken": { "front": 26, "rear": 30, "gear": 54, "suspension": 80 },
				"Leichter Regen": { "front": 30, "rear": 34, "gear": 53, "suspension": 74 },
				"Regen": { "front": 36, "rear": 40, "gear": 54, "suspension": 65 }
			},
			"Vancouver University Hill": {
				"Trocken": { "front": 29, "rear": 33, "gear": 58, "suspension": 80 },
				"Leichter Regen": { "front": 34, "rear": 38, "gear": 58, "suspension": 75 },
				"Regen": { "front": 39, "rear": 43, "gear": 58, "suspension": 65 }
			},
			"Verona Express": {
				"Trocken": { "front": 23, "rear": 26, "gear": 64, "suspension": 45 },
				"Leichter Regen": { "front": 28, "rear": 31, "gear": 64, "suspension": 40 },
				"Regen": { }
			},
			"Warschau Speedway": {
				"Trocken": { "front": 33, "rear": 36, "gear": 52, "suspension": 49 },
				"Leichter Regen": { "front": 38, "rear": 40, "gear": 52, "suspension": 43 },
				"Regen": { "front": 42, "rear": 42, "gear": 52, "suspension": 36 }
			},
			"Wellington Motorway": {
				"Trocken": { "front": 36, "rear": 39, "gear": 48, "suspension": 71 },
				"Leichter Regen": { },
				"Regen": { }
			},
			"Wien Oldtown Circuit": {
				"Trocken": { "front": 24, "rear": 27, "gear": 58, "suspension": 36 },
				"Leichter Regen": { "front": 29, "rear": 32, "gear": 58, "suspension": 31 },
				"Regen": { "front": 34, "rear": 37, "gear": 58, "suspension": 21 }
			},
			"Yokohama Harbor": {
				"Trocken": { "front": 26, "rear": 32, "gear": 53, "suspension": 56 },
				"Leichter Regen": { "front": 31, "rear": 37, "gear": 53, "suspension": 51 },
				"Regen": { "front": 36, "rear": 42, "gear": 53, "suspension": 41 }
			},
			"Zürich Stadtpark": {
				"Trocken": { "front": 18, "rear": 22, "gear": 61, "suspension": 35 },
				"Leichter Regen": { "front": 23, "rear": 28, "gear": 61, "suspension": 30 },
				"Regen": { }
			}
		},

		weather = {
			"weather1": "Trocken",
			"weather2": "Trocken",
			"weather3": "Leichter Regen",
			"weather4": "Regen",
		};

	window.QuickTrack = function(){
		this.initialize.apply(this, arguments);
	};

	$.extend(window.QuickTrack.prototype, {

		initialize: function(options){
			var activeNavi = $("#submenu .markedTab").text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			self = this;
			if(activeNavi === "Boxengasse"){
				self.createQuickTrackSelect();
			}
			self.bindEvents();
		},

		bindEvents: function(){
			var body = $("body");
			body.on("click", "#quicktrack-select a", self.onSelectTrackSetup);
			$('#content').bind("DOMSubtreeModified", self.onChangeContent);
		},

		onSelectTrackSetup: function(event){
			event.preventDefault();
			var driver = $(this).index(),
				selectedValue = $("#quicktrack-select select option:selected").val(),
				selectedValue = selectedValue.split(","),
				selectedTrack = selectedValue[0],
				selectedWeather = selectedValue[1],
				setup = tracks[selectedTrack][selectedWeather];

			if(driver > 0){
				$.each(setup, function(key, value){
					$("#" + key + driver).val(value);
				});
			} else {
				for (var i = 3; i > 0; i--) {
					$.each(setup, function(key, value){
						$("#" + key + i).val(value);
					});
				};
			}
			$("#carSubmit").click();
		},
		
		onChangeContent: function(){
			var activeNavi = $("#submenu .markedTab").text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if($("#quicktrack-select").length === 0 && activeNavi === "Boxengasse"){
				self.createQuickTrackSelect();
			} else if(activeNavi !== "Boxengasse"){
				$("#quicktrack-select").remove();
			}
		},

		createQuickTrackSelect: function(){
			var wrapper = $("<div />"),
				table = $("<table />"),
				tr = $("<tr />"),
				td,
				select = $("<select />"),
				option,
				link,
				actualTrack = $("#rightHeaderRow3 table td div").first().find("a").text(),
				actualWeather = $("#rightHeaderRow3 table td div").last().attr("class").replace(/ right/g, ""),
				actualWeather = weather[actualWeather],
				thisTrack;

			wrapper.attr("id", "quicktrack-select").addClass("left");
			table.addClass("autoWidth");

			td = $("<td />");
			option = $("<option />");
			option.val("").text("Bitte Strecken-SetUp auswählen");
			select.append(option);
			$.each(tracks, function(trackname, setups){
				thisTrack = trackname.split(" ");
				thisTrack = thisTrack[0];
				$.each(setups, function(weather, setup){
					if(setup["suspension"] !== undefined){
						option = $("<option />");
						option.val(trackname + "," + weather).text(trackname + " (" + weather + ")");
						if(thisTrack === actualTrack && actualWeather === weather){
							option.attr("selected", true);
						}
						select.append(option);
					}
				});
			});
			td.append(select);
			tr.append(td);
			td = $("<td />");
			link = $("<a />");
			link.addClass("button").text("alle Rennwagen");
			td.append(link);
			link = $("<a />");
			link.addClass("button").text("1. Rennwagen");
			td.append(link);
			link = $("<a />");
			link.addClass("button").text("2. Rennwagen");
			td.append(link);
			link = $("<a />");
			link.addClass("button").text("3. Rennwagen");
			td.append(link);
			tr.append(td);
			table.append(tr);

			wrapper.append(table);
			$("#contentMenu").prepend(wrapper);
		}
	});
})();

$(function(){
	new window.QuickTrack();
});