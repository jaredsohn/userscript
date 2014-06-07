// ==UserScript==
// @name           Incomings Renamer Ay
// @namespace      Tribalwars
// @version        1.0
// @author         Aywac
// @description    Renaming Incomings + open multi tabs
// @include        http://ae*.tribalwars.ae/game.php*&mode=incomings&screen=overview_villages&type=unignored&subtype=attacks
// @include        http://ae*.tribalwars.ae/game.php*&screen=info_village
// ==/UserScript==


if (!document.URL.match("screen=info_village")) {
	if (!document.URL.match("mode=incomings")) {
		UI.InfoMessage('سيتم تحويلك الآن ...', 3000, true);
		self.location = document.URL.replace(/screen\=\w*/i, "mode=incomings&screen=overview_villages&type=unignored&subtype=attacks");
	}
} else if (!document.URL.match("mode=incomings")) {
	if (!document.URL.match("screen=info_village")) {
		UI.InfoMessage('سيتم تحويلك الآن ...', 3000, true);
		self.location = document.URL.replace(/screen\=\w*/i, "mode=incomings&screen=overview_villages&type=unignored&subtype=attacks");
	}
}

if (document.URL.match("screen=info_village")) {

	function attack_name() {
		$("#vlag").find(".vis").find(".nowrap").each(function() {
			var tn = $(this).find("td:last").find("b").html();
			$(this).find("td:first").find("span:last").find("input:first").val(tn);
			$(this).find("td:first").find("span:last").find("input:last").click();
		});
	}

	$(function() {
		$("#content_value").find("table:first").after('<br><div id="vlag" style="border-top:2px solid black;border-left:2px solid black;border-right:2px solid black;border-bottom:2px solid black;"><table class="vis" style="width:100%"><tbody></tbody></table></div>');
		var nm = VillageInfoData.coord;
		var url = "/game.php?mode=incomings&screen=overview_villages&type=unignored&subtype=attacks";

		$.ajax({
			url : url,
			datatype : "html",
			cache : true,
			success : function(data) {

				var village = $(data).find("#incomings_table").find("tr");

				$("#vlag tbody").append(village);

				switch(game_data.world) {
					case "ae20":
						WS = 1.5;
						US = 0.667;
						break;
					case "ae17":
					case "ae19":
					case "aep1":
						WS = 1;
						US = 1;
						break;
					case "ae16":
						WS = 2;
						US = 0.5;
						break;
					case "ae18":
						WS = 1.5;
						US = 0.75;
						break;
					case "aes1":
						WS = 400;
						US = 1;
						break;
				}

				var spd = WS * US;

				var from = $("#vlag").find("tbody").find("tr").find("th:eq(2)").find("a").text();
				if (from !== "البداية") {
					$("#vlag").find("tbody").find("tr:eq(0)").find("th:eq(1)").after('<th><a href="#">البداية</a></th>');
					$("#vlag").find("tbody").find("tr").find("td:eq(1)").after("<td></td>");
					$("#vlag").find("tbody").find("tr").each(function() {
						var nm = VillageInfoData.coord;
						var tid = $(this).find("td:eq(2)");
						var url = $(this).find("td:first").find("a:first").attr("href");

						$.ajax({
							url : url,
							datatype : "html",
							cache : true,
							success : function(data) {

								var vill = $(data).find(".vis:first").find("tr:eq(2)").find("td:eq(1)").find("span").find("a");

								$(tid).append(vill);
								var N = $("#vlag").find("tbody").find("tr").length - 2;
								var n = $("#vlag").find("tbody").find("tr").find("td:eq(2)").find("a").length;
								if (N == n) {
									$("#vlag").find("tbody").find("tr").find("td:eq(2):contains(" + nm + ")").parent("tr").attr("id", "wac");
									$("#vlag").find("tbody").find("tr:not('#wac')").remove();
									$(".vis").find("th:first").parents("#vlag").remove();
									$("#vlag").find("tbody").find("tr").each(function() {
										$(this).find("td:last").find("a").remove();
										$(this).find("td:last").attr("class", "trp");
										var td = $(this).find(".trp");

										var local_village = $(this).find("td:eq(1)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
										var remote_village = $(this).find("td:eq(2)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
										var distance = Math.sqrt(Math.pow(local_village[0] - remote_village[0], 2) + Math.pow(local_village[1] - remote_village[1], 2)).toFixed(5);
										var dst = distance / spd;

										var timer = $(this).find("td:eq(5)").find(".timer").html().split(":");
										var unit = ((((timer[0] * 3600) + (timer[1] * 60) + (timer[2] * 1)) / (dst * 60)).toFixed(2)).split(".");

										if (100 / spd >= unit[0] && 30 / spd <= unit[0]) {
											$(td).html('<center><b style="color:red;">نبيل</b></center>');
										} else if (29 / spd >= unit[0] && 22 / spd <= unit[0]) {
											$(td).html("<center><b>محطمة</b><center>");
										} else if (21 / spd >= unit[0] && 18 / spd <= unit[0]) {
											$(td).html("<center><b>سيف</b></center>");
										} else if (17 / spd >= unit[0] && 11 / spd <= unit[0]) {
											$(td).html("<center><b>فأس</b></center>");
										} else if (10 / spd >= unit[0] && 10 / spd <= unit[0]) {
											$(td).html("<center><b>ثقيل</b></center>");
										} else if (9 / spd >= unit[0] && 9 / spd <= unit[0]) {
											$(td).html("<center><b>خفيف</b></center>");
										} else if (8 / spd >= unit[0] && 0 / spd <= unit[0]) {
											$(td).html('<center><b style="color:blue;">كشافة</b></center>');
										}
									});
								}
							}
						});
					});
				} else {
					var nm = VillageInfoData.coord;
					$("#vlag").find("tbody").find("tr").find("td:eq(2):contains(" + nm + ")").parent("tr").attr("id", "wac");
					$("#vlag").find("tbody").find("tr:not('#wac')").remove();
					$(".vis").find("th:first").parents("#vlag").remove();

					$("#vlag").find("tbody").find("tr").each(function() {
						$(this).find("td:last").find("a").remove();
						$(this).find("td:last").attr("class", "trp");
						var td = $(this).find(".trp");

						var local_village = $(this).find("td:eq(1)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
						var remote_village = $(this).find("td:eq(2)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
						var distance = Math.sqrt(Math.pow(local_village[0] - remote_village[0], 2) + Math.pow(local_village[1] - remote_village[1], 2)).toFixed(2);
						var dst = distance / spd;

						var timer = $(this).find("td:eq(5)").find(".timer").html().split(":");
						var unit = ((((timer[0] * 3600) + (timer[1] * 60) + (timer[2] * 1)) / (dst * 60)).toFixed(2)).split(".");

						if (100 / spd >= unit[0] && 30 / spd <= unit[0]) {
							$(td).html('<center><b style="color:red;">نبيل</b></center>');
						} else if (29 / spd >= unit[0] && 22 / spd <= unit[0]) {
							$(td).html("<center><b>محطمة</b><center>");
						} else if (21 / spd >= unit[0] && 18 / spd <= unit[0]) {
							$(td).html("<center><b>سيف</b></center>");
						} else if (17 / spd >= unit[0] && 11 / spd <= unit[0]) {
							$(td).html("<center><b>فأس</b></center>");
						} else if (10 / spd >= unit[0] && 10 / spd <= unit[0]) {
							$(td).html("<center><b>ثقيل</b></center>");
						} else if (9 / spd >= unit[0] && 9 / spd <= unit[0]) {
							$(td).html("<center><b>خفيف</b></center>");
						} else if (8 / spd >= unit[0] && 0 / spd <= unit[0]) {
							$(td).html('<center><b style="color:blue;">كشافة</b></center>');
						}
					});
				}

				$("#vlag").before('<input class="bttn" type="button" name="id" value="تسمية الهجمات" onclick="attack_name()">');
				$(".bttn:eq(1)").remove();
			}
		});
	});
} else if (document.URL.match("mode=incomings")) {

	var from = $("#incomings_table").find("tr").find("th:eq(2)").find("a").text();
	if (from !== "البداية") {
		$("#incomings_table").find("tr:eq(0)").find("th:eq(1)").after('<th><a href="#">البداية</a></th>');
		$("#incomings_table").find("tr").find("td:eq(1)").after("<td></td>");
		$("#incomings_table").find("tr").each(function() {
			var tid = $(this).find("td:eq(2)");
			var url = $(this).find("td:first").find("a:first").attr("href");

			$.ajax({
				url : url,
				datatype : "html",
				cache : true,
				success : function(data) {

					var vill = $(data).find(".vis:first").find("tr:eq(2)").find("td:eq(1)").find("span").find("a");

					$(tid).append(vill);

					var N = $("#incomings_table").find("tr").length - 2;
					var n = $("#incomings_table").find("tr").find("td:eq(2)").find("a").length;
					if (N == n) {
						for (var i = 0; i < N; i++) {
							var a = $("#incomings_table").find("tr:eq(" + i + ")").find("td:eq(2)").find("a").text().match(/\d+\|\d+/g);

							$("#incomings_table").find("tr").find("td:eq(2):contains(" + a + ")").parent("tr").nextAll("tr").find("td:eq(2):contains(" + a + ")").parent("tr").remove();
						}

						var NN = $("#incomings_table").find("tr").length - 2;
						var T = prompt("أدخل عدد التابات التي تريد فتحها", "" + NN + "");

						for (var j = 0; j < T; j++) {
							$("#incomings_table").find("tr").find("td:eq(2)").find("a").attr("target", "_blank");
							$("#incomings_table").find("tr").find("td:eq(2)").find("a")[j].click();
						}
					}
				}
			});
		});
	} else {

		var N = $("#incomings_table").find("tr").length - 2;

		for (var i = 0; i < N; i++) {
			var a = $("#incomings_table").find("tr:eq(" + i + ")").find("td:eq(2)").find("a").text().match(/\d+\|\d+/g);

			$("#incomings_table").find("tr").find("td:eq(2):contains(" + a + ")").parent("tr").nextAll("tr").find("td:eq(2):contains(" + a + ")").parent("tr").remove();
		}

		var NN = $("#incomings_table").find("tr").length - 2;
		var T = prompt("أدخل عدد التابات التي تريد فتحها", "" + NN + "");

		for (var j = 0; j < T; j++) {
			$("#incomings_table").find("tr").find("td:eq(2)").find("a").attr("target", "_blank");
			$("#incomings_table").find("tr").find("td:eq(2)").find("a")[j].click();
		}
	}
}

