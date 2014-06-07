// ==UserScript==
// @name           الهجمات على المملكة
// @namespace      حرب القبائل
// @version        2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php*&mode=incomings&screen=overview_villages&type=unignored&subtype=attacks
// @include        http://ae*.tribalwars.ae/game.php*&screen=info_village
// ==/UserScript==

if(!document.URL.match(/screen=info_village/)){
    if(!document.URL.match(/mode=incomings/)){
        UI.InfoMessage("سيتم تحويلك الآن ...",3000,true);
		var ID = game_data.village.id;
        window.open("/game.php?village="+ID+"&mode=quickbar&mode=incomings&screen=overview_villages&type=unignored&subtype=attacks","_self");
    }
}else if(!document.URL.match(/mode=incomings/)){
    if(!document.URL.match(/screen=info_village/)){
        UI.InfoMessage("سيتم تحويلك الآن ...",3000,true);
		var ID = game_data.village.id;
        window.open("/game.php?village="+ID+"&mode=quickbar&mode=incomings&screen=overview_villages&type=unignored&subtype=attacks","_self");
    }
}
if(document.URL.match(/screen=info_village/)){
	function toggle(all){
		checkboxes = $("#Vlag").find("input[type='checkbox']");
		c = checkboxes.length;
		for(var p=0; p<c; p++){
			checkboxes[p].checked = all.checked;
		}
	}
	$(".vlag:first").remove();
    $("#content_value").find("table:first").after('<br>\
<div id="Vlag" class="vlag" style="border:2px solid black">\
<table class="vis" style="width:100%"><tbody></tbody></table></div>');
	var nm = VillageInfoData.coord;
	$.ajax({
		url:"/game.php?mode=quickbar&mode=incomings&screen=overview_villages&type=unignored&subtype=attacks",
		datatype:"html",
		cache:true,
		success:function(data){
			var village = $(data).find("#incomings_table").find(".nowrap");
			$("#Vlag tbody").append(village);
			switch(game_data.world){
				case "ae17":
				case "ae21":
				case "ae23":
				case "aep1":
					WS = 1;
					US = 1;
					break;
				case "ae18":
				case "ae22":
					WS = 1.5;
					US = 0.75;
					break;
				case "ae20":
					WS = 1.5;
					US = 0.667;
					break;
				case "aec1":
					WS = 4;
					US = 0.5;
					break;
				case "aes1":
					WS = 400;
					US = 1;
					break;
			}
			var spd = WS*US;
			if($("#Vlag").find(".nowrap:first").find("td").length == 6){
				$("#Vlag").find(".nowrap").find("td:eq(1)").after("<td></td>");
				$("#Vlag").find(".nowrap").each(function(){
					var nm = VillageInfoData.coord;
					var tid = $(this).find("td:eq(2)");
					var url = $(this).find("td:first").find("a:first").attr("href");
					$.ajax({
						url:url,
						datatype:"html",
						cache:true,
						success:function(data){
							var vill = $(data).find(".vis:first").find("tr:eq(2)").find("td:eq(1)").find("span").find("a");
							$(tid).append(vill);
							var N = $("#Vlag").find(".nowrap").length;
							var n = $("#Vlag").find(".nowrap").find("td:eq(2)").find("a").length;
							if(N == n){
								$("#Vlag").find(".nowrap").find("td:eq(2):contains("+nm+")").parent().addClass("wac");
								$("#Vlag").find(".nowrap:not('.wac')").remove();
								$("#Vlag").find(".nowrap").removeClass("selected");
								$("#Vlag").find(".nowrap").each(function(){
									$(this).find("td:last").find("a").remove();
									$(this).find("td:last").addClass("trp");
									var td = $(this).find(".trp");
									var local_village = $(this).find("td:eq(1)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
									var remote_village = $(this).find("td:eq(2)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
									var distance = Math.sqrt(Math.pow(local_village[0]-remote_village[0],2)+Math.pow(local_village[1]-remote_village[1],2)).toFixed(10);
									var timer = $(this).find("td:eq(5)").find(".timer").html().split(":");
									var unit = (((timer.split(":")[0]*3600)+(timer.split(":")[1]*60)+(timer.split(":")[2]*1))/(distance*60)).toFixed(10)*1;
									var SS = [30,22,18,11,10,9,0];
									var TT = ['<b style="color:red;">نبيل</b>','<b>محطمة الحائط</b>','<b>مقاتل السيف</b>','<b>مقاتل الفأس</b>','<b>فارس ثقيل</b>','<b>فارس خفيف</b>','<b style="color:blue;">كشافة</b>'];
									for(I=0; I<7; I++){
										if((SS[I]/spd).toFixed(10) < unit){
											alert('<center>'+TT[I]+'</center>');
											break;
										}
									}
								});
							}
						}
					});
				});
			}else{
				var nm = VillageInfoData.coord;
				$("#Vlag").find(".nowrap").find("td:eq(2):contains("+nm+")").parent().addClass("wac");
				$("#Vlag").find(".nowrap:not('.wac')").remove();
				$("#Vlag").find(".nowrap").removeClass("selected");
				$("#Vlag").find(".nowrap").each(function(){
					$(this).find("td:last").find("a").remove();
					$(this).find("td:last").addClass("trp");
					var td = $(this).find(".trp");
					var local_village = $(this).find("td:eq(1)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
					var remote_village = $(this).find("td:eq(2)").find("a:eq(0)").text().match(/\d+\|\d+/)[0].split("|");
					var distance = Math.sqrt(Math.pow(local_village[0]-remote_village[0],2)+Math.pow(local_village[1]-remote_village[1],2)).toFixed(10);
					var timer = $(this).find("td:eq(5)").find(".timer").html().split(":");
					var unit = (((timer.split(":")[0]*3600)+(timer.split(":")[1]*60)+(timer.split(":")[2]*1))/(distance*60)).toFixed(10)*1;
					var SS = [30,22,18,11,10,9,0];
					var TT = ['<b style="color:red;">نبيل</b>','<b>محطمة الحائط</b>','<b>مقاتل السيف</b>','<b>مقاتل الفأس</b>','<b>فارس ثقيل</b>','<b>فارس خفيف</b>','<b style="color:blue;">كشافة</b>'];
					for(I=0; I<7; I++){
						if((SS[I]/spd).toFixed(10) < unit){
							alert('<center>'+TT[I]+'</center>');
							break;
						}
					}
				});
			}
			var l = $("#Vlag").find(".nowrap").length;
			$("#Vlag").find("tbody").before('<thead><tr>\
<th width="120">الاوامر ('+l+')</th>\
<th width="*"><a href="#">الهدف</a></th>\
<th width="150"><a href="#">البداية</a></th>\
<th width="*"><a href="#">اللاعب</a></th>\
<th width="160"><a href="#">توقيت الوصول</a></th>\
<th style="width:80px;text-align:center"><a href="#">يصل في</a></th>\
<th style="width:15px;text-align:center">نوع الهجمة</th>\
</tr></thead>');
			$("#Vlag").find("tbody").append('<tr><th>\
<input name="all" type="checkbox" class="selectAll" id="select_all" onclick="toggle(this)"> \
<label for="select_all">اختر الكل</label>\
</th><th colspan="6">\
<input class="btn" id="nattk" type="button" name="id" value="تسمية الهجمات"></th></tr>');
			$("document").ready(function(){
				$(".quickedit").QuickEdit({
					url:TribalWars.buildURL("POST","info_command",{
						ajaxaction:"edit_other_comment",
						id:"__ID__"
					})
				});
			});
			$("#nattk").click(function(){
				$("#Vlag").find(".nowrap").find(":checked").each(function(){
					var tn = $(this).parents(".nowrap").find("td:last").find("b").text();
					$(this).parents(".nowrap").find(".rename-icon")[0].click();
					$(this).parents(".nowrap").find(".quickedit-edit").find("input:first").val(tn);
					$(this).parents(".nowrap").find(".quickedit-edit").find('input[type=button]').click();
				});
			});
		}
	});
}else if(document.URL.match(/mode=incomings/)){
    var from = $("#incomings_table").find("th:eq(2)").find("a").text();
    if(from !== "البداية"){
        $("#incomings_table").find("th:eq(1)").after('<th><a href="#">البداية</a></th>');
        $("#incomings_table").find(".nowrap").find("td:eq(1)").after("<td></td>");
        $("#incomings_table").find(".nowrap").each(function(){
            var tid = $(this).find("td:eq(2)");
            $.ajax({
                url:$(this).find("td:first").find("a:first").attr("href"),
                datatype:"html",
                cache:true,
                success:function(data){
                    var vill = $(data).find(".vis:first").find("tr:eq(2)").find("td:eq(1)").find("span").find("a");
                    $(tid).append(vill);
                    var N = $("#incomings_table").find(".nowrap").length;
                    var n = $("#incomings_table").find(".nowrap").find("td:eq(2)").find("a").length;
                    if(N == n){
                        for(var i=0; i<N; i++){
                            var a = $("#incomings_table").find(".nowrap:eq("+i+")").find("td:eq(2)").find("a").text().match(/\d+\|\d+/g);
                            $("#incomings_table").find(".nowrap").find("td:eq(2):contains("+a+")").parent(".nowrap").nextAll(".nowrap").find("td:eq(2):contains("+a+")").parent().remove();
                        }
                        var NN = $("#incomings_table").find(".nowrap").length;
						var T = prompt("أدخل عدد التابات التي تريد فتحها",""+NN+"");
						function opscr(){
							for(v=0; v<T; v++){
								window.open('javascript:$.getScript("http://userscripts.org/scripts/source/177686.user.js");void(0)',"vat_"+v);
							}
						}
						if(T > NN){
							T = NN;
						}
						for(var j=0; j<T; j++){
							var URL = $("#incomings_table").find(".nowrap").eq(j).find("td:eq(2)").find("a").attr("href");
							var opwin = window.open(URL,"vat_"+j);
							opwin.onload = opscr;
						}
                    }
                }
            });
        });
    }else{
        var N = $("#incomings_table").find(".nowrap").length;
        for(var i=0; i<N; i++){
            var a = $("#incomings_table").find(".nowrap:eq("+i+")").find("td:eq(2)").find("a").text().match(/\d+\|\d+/g);
            $("#incomings_table").find(".nowrap").find("td:eq(2):contains("+a+")").parent(".nowrap").nextAll(".nowrap").find("td:eq(2):contains("+a+")").parent().remove();
        }
        var NN = $("#incomings_table").find(".nowrap").length;
		var T = prompt("أدخل عدد التابات التي تريد فتحها",""+NN+"");
		function opscr(){
			for(v=0; v<T; v++){
				window.open('javascript:$.getScript("http://userscripts.org/scripts/source/177686.user.js");void(0)',"vat_"+v);
			}
		}
		if(T > NN){
			T = NN;
		}
        for(var j=0; j<T; j++){
			var URL = $("#incomings_table").find(".nowrap").eq(j).find("td:eq(2)").find("a").attr("href");
			var opwin = window.open(URL,"vat_"+j);
			opwin.onload = opscr;
        }
    }
}