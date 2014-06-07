// ==UserScript==
// @name           eRepublik Battle Stats
// @description    Generate battle stats based on a list of citizens
// @version        0.6
// @author		   eCitizen Maruishima
// @namespace      eCitizenMaruishima
// @include        http://www.erepublik.com/en/battles/show/*
// @include        http://www.zhunder.com/showbattle.php*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var erepBattleStats = new function() {
	var me		= this;

	this.bid	= parseInt(self.location.href.split("show/")[1]);
	this.page	= 0;
	this.ids	= [];

	$(document).ready(function() {
		$(
			'<div style="margin-top:20px;" id="erepBattleStats" class="holder">' +
			'    <h2 class="section">Battle Stats</h2>' +
			'    <p></p>' +
			'    <textarea style="width:100%;height:100px;margin-top:8px;" id="erepList" rows="2" cols="30"></textarea>' +
			'</div>'
		)
			.appendTo("#content");


		if (self.location.href.indexOf("erepublik.com") != -1)
			$("#erepBattleStats p").text("Paste citizen IDs, names, or profile links into the box below.  They should be separated by carriage returns.");
		else
			$("#erepBattleStats p").text("Paste citizen names separated by carriage returns into the box below.");


		$(
			'    <div style="margin-top:10px;" class="action">' +
			'        <span class="vround-btn-start">' +
			'            <span class="vround-btn-end"><a class="vround-btn-core" href="javascript:void(0);">Generate Stats</a></span>' +
			'        </span>' +
			'    </div>'
		)
			.appendTo("#content")
			.click(function() {
				$(this).remove();

				$(
					'<table id="statstable" style="width:100%;margin:10px 0;clear:both;">' +
					'    <tr>' +
					'        <td>Citizen</td>' +
					'        <td>Citizen ID</td>' +
					'        <td style="text-align:right;">Fights</td>' +
					'        <td style="text-align:right;">Red</td>' +
					'        <td style="text-align:right;">Green</td>' +
					'    </tr>' +
					'    <tr>' +
					'        <td colspan="5"><hr></td>' +
					'    </tr>' +
					'</table>'
				)
				.appendTo("#content")

				me.ids = $("#erepList").val().split("\n");

				me.populateTable();

				if (self.location.href.indexOf("erepublik.com") != -1)
					me.processAPI();
				else
					me.processZhunder();
			});

	});

	this.populateTable = function() {
		console.log("populate");
		for (user in me.ids) {
		console.log(user);
			if (me.ids[user].length > 0) {
				var c = "?";
				var i = "?";
				var u = $.trim(me.ids[user].replace("http://www.erepublik.com/en/citizen/profile/",""));

				if (isNaN(parseInt(u)))
					c = u;
				else
					i = u;

				$(
					"<tr id='c"+user+"'>" +
					"    <td class='cname'>"+c+"</td>" +
					"    <td class='cid'>"+i+"</td>" +
					"    <td class='fights' style='text-align:right;'>0</td>" +
					"    <td class='red'    style='text-align:right;'>0</td>" +
					"    <td class='green'  style='text-align:right;'>0</td>" +
					"</tr>"
				)
					.appendTo("#statstable");
			}
		}
	}

	this.processAPI = function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://api.erepublik.com/v1/feeds/battle_logs/"+me.bid+"/"+me.page,
			onload:function(x) {
				if ($(x.responseText).find("battle").length > 0) {
					for (user in me.ids) {
						var damage	= 0;
						var red		= 0;
						var green	= 0;
						var fights	= 0;

						if (me.ids[user].length > 0) {
							var u = $.trim(me.ids[user].replace("http://www.erepublik.com/en/citizen/profile/",""));
							var b = $(x.responseText)
										.find("citizen-id:Contains("+u+"),citizen:Contains("+u+")")

							//todo: replace contains with each loop for exact match

							if ($(b).length) {
								var c = $(b).parent().find("citizen").eq(0).text();
								var i = $(b).parent().find("citizen-id").eq(0).text();

								$(b)
									.siblings("damage")
									.each(function() { damage += parseInt($(this).text()); fights++; });

								if (damage > 0) green	= damage;
								if (damage < 0) red		= damage;

								$("#c"+user+" .cname"	).text(c);
								$("#c"+user+" .cid"		).text(i);
								$("#c"+user+" .fights"	).text(parseInt($("#c"+user+" .fights").text())	+ fights);
								$("#c"+user+" .red"		).text(parseInt($("#c"+user+" .red").text())	+ red);
								$("#c"+user+" .green"	).text(parseInt($("#c"+user+" .green").text())	+ green);
							}
						}
					}

					me.page++;
					me.processAPI();
				}
				else
					alert("Complete!");
			}
		});
	}

	this.processZhunder = function() {
		for (user in me.ids) {
			var damage	= 0;
			var red		= 0;
			var green	= 0;
			var fights	= 0;

			if (me.ids[user].length > 0) {
				var u = me.ids[user];
				var b = $("td.nombre a.nobold:Contains("+u+")").closest("tr")

				if ($(b).length) {
					fights = $(b).find("td.peleas").eq(0).text();
					damage = $(b).find("td.damage").eq(0).text();

					if (damage > 0) green	= damage;
					if (damage < 0) red		= damage;

					$("#c"+user+" .fights"	).text(fights);
					$("#c"+user+" .red"		).text(String(red).replace(".",","));
					$("#c"+user+" .green"	).text(String(green).replace(".",","));
				}
			}
		}
	}
}

jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};