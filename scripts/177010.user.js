// ==UserScript==
// @name           سكربت إرسال القطارات
// @namespace      حرب القبائل
// @version        3.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php*&screen=info_player
// @include        http://ae*.tribalwars.ae/game.php*&screen=place
// ==/UserScript==

if(!document.URL.match(/screen=info_player/)){
	if(!document.URL.match(/screen=place/)){
		UI.InfoMessage("السكربت يشتغل من بروفيل اللاعبين",3000,true);
	}
}else if(!document.URL.match(/screen=place/)){
	if(!document.URL.match(/screen=info_player/)){
		UI.InfoMessage("السكربت يشتغل من بروفيل اللاعبين",3000,true);
	}
}
if(document.URL.match(/screen=place/)){
	if(document.URL.match(/axe/)){
		var axe_c = document.URL.match(/\d+/g)[3];
		$("#unit_input_axe").val(axe_c);
	}if(document.URL.match(/spy/)){
		var spy_c = document.URL.match(/\d+/g)[4];
		$("#unit_input_spy").val(spy_c);
	}if(document.URL.match(/light/)){
		var light_c = document.URL.match(/\d+/g)[5];
		$("#unit_input_light").val(light_c);
	}if(document.URL.match(/ram/)){
		var ram_c = document.URL.match(/\d+/g)[6];
		$("#unit_input_ram").val(ram_c);
	}if(document.URL.match(/snob/)){
		var snob_c = document.URL.match(/\d+/g)[7];
		$("#unit_input_snob").val(snob_c);
	}
}else if(document.URL.match(/screen=info_player/)){
	if(game_data.player.premium == false){
		var lnk = "game.php?screen=overview_villages #production_table";
	}else if(game_data.player.premium == true){ 
		var lnk = "game.php?screen=overview_villages&mode=prod #production_table";
	}
	function replace(e){
		$("#production_table").find(".nowrap").each(function(){
			var villageID = $(e).parent().attr("data-id");
			var villagID = $("#production_table").find(".quickedit-content:last").find("a").attr("link").match(/\d+/g)[1];
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(""+villagID+"",""+villageID+""));
		});
	}
	function troops(){
		$("#production_table").find(":checked").parents(".nowrap").each(function(){
			var axe = $(this).find(".axea").val();
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/axe=\d+/,"axe="+axe));
		});
		$("#production_table").find(":checked").parents(".nowrap").each(function(){
			var spy = $(this).find(".spya").val();
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/spy=\d+/,"spy="+spy));
		});
		$("#production_table").find(":checked").parents(".nowrap").each(function(){
			var light = $(this).find(".lighta").val();
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/light=\d+/,"light="+light));
		});
		$("#production_table").find(":checked").parents(".nowrap").each(function(){
			var ram = $(this).find(".rama").val();
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/ram=\d+/,"ram="+ram));
		});
		$("#production_table").find(":checked").parents(".nowrap").each(function(){
			var snob = $(this).find(".snoba").val();
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/snob=\d+/,"snob="+snob));
		});
	}
	function five(){
		$("#production_table").find(".quickedit-content:first").find("a").attr("onclick","tran();clcks();");
	}
	function tran(){
	   var vill = $("#production_table").find(":checked").next(".quickedit-content").find("a");
	   var opera = navigator.appName;
	   if(opera == "Opera"){
		  if(vill.hasClass("brown")){
			 var axec = $("#units").find("tr").find(".axeb").val();
			 var spyc = $("#units").find("tr").find(".spyb").val();
			 var lightc = $("#units").find("tr").find(".lightb").val();
			 var ramc = $("#units").find("tr").find(".ramb").val();
			 var snobc = $("#units").find("tr").find(".snobb").val();
			 $("#production_table").find(":checked").parents(".nowrap").find(".axea").val(axec);
			 $("#production_table").find(":checked").parents(".nowrap").find(".spya").val(spyc);
			 $("#production_table").find(":checked").parents(".nowrap").find(".lighta").val(lightc);
			 $("#production_table").find(":checked").parents(".nowrap").find(".rama").val(ramc);
			 $("#production_table").find(":checked").parents(".nowrap").find(".snoba").val(snobc);
			 troops();
			 $("#production_table").find(":checked").next(".quickedit-content").find("a").removeClass("brown").addClass("red");
		  }else if(vill.hasClass("red")){
			 var a1 = $(".axea:last").val();
			 var a2 = $(".spya:last").val();
			 var a3 = $(".lighta:last").val();
			 var a4 = $(".rama:last").val();
			 var a5 = $(".snoba:last").val();
			 $("#production_table").find(":checked").parents(".nowrap").find(".axea").val(a1);
			 $("#production_table").find(":checked").parents(".nowrap").find(".spya").val(a2);
			 $("#production_table").find(":checked").parents(".nowrap").find(".lighta").val(a3);
			 $("#production_table").find(":checked").parents(".nowrap").find(".rama").val(a4);
			 $("#production_table").find(":checked").parents(".nowrap").find(".snoba").val(a5);
			 troops();
			 $("#production_table").find(":checked").next(".quickedit-content").find("a").removeClass("red").addClass("black");
		  }
	   }else if(opera !== "Opera"){
		  if(vill.hasClass("brown")){
			 $("#production_table").find(":checked").next(".quickedit-content").find("a").removeClass("brown").addClass("red");
		  }else if(vill.hasClass("red")){
			 var axec = $(".axeb").val();
			 var spyc = $(".spyb").val();
			 var lightc = $(".lightb").val();
			 var ramc = $(".ramb").val();
			 var snobc = $(".snobb").val();
			 $("#production_table").find(":checked").parents(".nowrap").find(".axea").val(axec);
			 $("#production_table").find(":checked").parents(".nowrap").find(".spya").val(spyc);
			 $("#production_table").find(":checked").parents(".nowrap").find(".lighta").val(lightc);
			 $("#production_table").find(":checked").parents(".nowrap").find(".rama").val(ramc);
			 $("#production_table").find(":checked").parents(".nowrap").find(".snoba").val(snobc);
			 troops();
			 $("#production_table").find(":checked").next(".quickedit-content").find("a").removeClass("red").addClass("black");
		  }
	   }
	}
	function clck(){
	   var URL = $("#production_table").find(":checked").parents(".nowrap").find("a").attr("link");
	   var vill = $("#production_table").find(":checked").next(".quickedit-content").find("a");
	   var opera = navigator.appName;
	   if(opera == "Opera"){
		  if(vill.hasClass("red")){
			 window.open(URL);
		  }else if(vill.hasClass("black")){
			 for(i=0; i<3; i++){
				window.open(URL);
			 }
			 $("#production_table").find(":checked").parents(".nowrap").remove();
		  }
	   }else if(opera !== "Opera"){
		  if(vill.hasClass("red")){
			 for(i=0; i<3; i++){
				window.open(URL);
			 }
		  }else if(vill.hasClass("black")){
			 window.open(URL);
			 $("#production_table").find(":checked").parents(".nowrap").remove();
		  }
	   }
	}
	function clcks(){
	   var URL = $("#production_table").find(":checked").parents(".nowrap").find("a:first").attr("link");
	   var vill = $("#production_table").find(":checked").next(".quickedit-content").find("a:first");
	   var opera = navigator.appName;
	   if(opera == "Opera"){
		  if(vill.hasClass("red")){
			 window.open(URL);
		  }else if(vill.hasClass("black")){
			 for(i=0; i<4; i++){
				window.open(URL);
			 }
			 $("#production_table").find(":checked").parents(".nowrap").remove();
		  }
	   }else if(opera !== "Opera"){
		  if(vill.hasClass("red")){
			 for(i=0; i<4; i++){
				window.open(URL);
			 }
		  }else if(vill.hasClass("black")){
			 window.open(URL);
			 $("#production_table").find(":checked").parents(".nowrap").remove();
		  }
	   }
	}
	$(".vis:first").after('<br><table class="vis bbcodetable" align="center"><tbody>\
<tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr>\
</tbody></table>');
	$("head").append('<style>.brown {color: #603000;}.red {color: red;}.black {color: black;}</style>');
	$("#villages_list").find(".village_anchor").prepend('<input name="rdo" type="radio" onclick="replace(this)">');
	$("#content_value").find("td:first + td").load(lnk,function(){
		$(this).find(".rename-icon").remove();
		if(game_data.player.premium == false){
			for(i=0; i<4; i++){
				$("#production_table").find("th:nth-child(2)").remove();
				$("#production_table").find("td:nth-child(2)").remove();
			}
		}else if(game_data.player.premium == true){
			$("#production_table").find("th:nth-child(1)").remove();
			$("#production_table").find("td:nth-child(1)").remove();
			for(i=0; i<8; i++){
				$("#production_table").find("th:nth-child(2)").remove();
				$("#production_table").find("td:nth-child(2)").remove();
			}
		}
		$("#production_table").find("th:first").after('\
<th><img src="graphic/unit/unit_axe.png" onclick=\'$(".axea").val(prompt("أدخل عدد مقاتلي الفأس","100"));troops()\' title="مقاتل الفأس"></th>\
<th><img src="graphic/unit/unit_spy.png" onclick=\'$(".spya").val(prompt("أدخل عدد الكشافة","0"));troops()\' title="كشافة"></th>\
<th><img src="graphic/unit/unit_light.png" onclick=\'$(".lighta").val(prompt("أدخل عدد الفرسان الخفيفة","0"));troops()\' title="فارس خفيف"></th>\
<th><img src="graphic/unit/unit_ram.png" onclick=\'$(".rama").val(prompt("أدخل عدد محطمات الحائط","0"));troops()\' title="محطمة الحائط"></th>\
<th><img src="graphic/unit/unit_snob.png" onclick=\'$(".snoba").val(prompt("أدخل عدد النبلاء","1"));troops()\' title="نبيل"></th>');
		$("#production_table").find(".nowrap").find("td:first").after('\
<td><input type="text" style="width:40px" value="100" class="axea" onchange="troops()"></td>\
<td><input type="text" style="width:40px" value="0" class="spya" onchange="troops()"></td>\
<td><input type="text" style="width:40px" value="0" class="lighta" onchange="troops()"></td>\
<td><input type="text" style="width:40px" value="0" class="rama" onchange="troops()"></td>\
<td><input type="text" style="width:40px" value="1" class="snoba" onchange="troops()"></td>');
		$("#production_table").find(".nowrap").find(".quickedit-vn").prepend('<input name="box" type="radio" onclick="troops()">');
		$("#production_table").before('<table class="vis bbcodetable"><tbody>\
<tr><td><input name="bx" onclick="five()" type="checkbox"> <b>قطار خماسي</b></td></tr>\
</tbody></table>');
		$("#production_table").before('<table id="units" class="vis" width="100%"><tbody><tr>\
<th><img src="graphic/unit/unit_axe.png" title="مقاتل الفأس"></th>\
<th><img src="graphic/unit/unit_spy.png" title="كشافة"></th>\
<th><img src="graphic/unit/unit_light.png" title="فارس خفيف"></th>\
<th><img src="graphic/unit/unit_ram.png" title="محطمة الحائط"></th>\
<th><img src="graphic/unit/unit_snob.png" title="نبيل"></th>\
</tr><tr>\
<td><input type="text" style="width:40px" value="6700" class="axeb"></td>\
<td><input type="text" style="width:40px" value="4" class="spyb"></td>\
<td><input type="text" style="width:40px" value="3000" class="lightb"></td>\
<td><input type="text" style="width:40px" value="200" class="ramb"></td>\
<td><input type="text" style="width:40px" value="1" class="snobb"></td>\
</tr></tbody></table>');
		$("#production_table").find(".nowrap").find("a").attr("target","_blank").attr("onclick","tran();clck()").addClass("brown");
		$("#production_table").find(".nowrap").each(function(){
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/screen=overview/g,'target=000&screen=place&axe=0&spy=0&light=0&ram=0&snob=0'));
		});
		$("#production_table").find(".nowrap").each(function(){
			$(this).find(".quickedit-content").html($(this).find(".quickedit-content").html().replace(/href/g,"link"));
		});
	});
}