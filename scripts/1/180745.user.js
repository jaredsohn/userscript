// ==UserScript==
// @name           سكربت مخطط الهجمات
// @namespace      حرب القبائل
// @version        2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&mode=combined&screen=overview_villages
// @include        http://ae*.tribalwars.ae/game.php?*&screen=memo
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

if(window.document.URL.match(/mode=combined/) == null){
	if(window.document.URL.match(/screen=memo/) == null){
		UI.InfoMessage('سيتم تحويلك الآن ...',3000,true);
		var ID = window.document.URL.match(/\d+/g)[1];
		window.open("/game.php?village="+ID+"&screen=overview_villages&mode=combined","_self");
	}
}

if(window.document.URL.match(/mode=combined/) !== null){
	function targets_villages(){
		var tl = $("#targets").val().match(/\d+\|\d+/g).length;
		$("#count").find("input:eq(0)").val(tl);
		$("#tg").html("عدد الأهداف : <span style='color:red;'>"+tl+"</span>");
	}

	$("#overview_menu").after('<br><div id="oper" style="border-top:2px solid #804000;border-left:2px solid #804000;border-right:2px solid #603000;border-bottom:2px solid #402000;"></div>');
	$("#oper").append('<br><table class="coords" align="center"><tbody><tr><td valign="top"><table class="vis bbcodetable"><tbody><tr><th><b>التاريخ :</b> <input id="day" name="date" type="date" style="width: 110px" tabindex="3" value=""></th><th><b>التوقيت :</b> <input id="hours" name="hours" type="text" style="width: 60px" tabindex="3" value=""></th><th id="tg">عدد الأهداف : <span style="color:red;">0</span></th></tr></tbody></table></td></tr></tbody></table>');
	$("#oper").append('<textarea id="targets" cols="160" rows="30" onchange="targets_villages()"></textarea>');
	$("#hours").val("00:00:00");
	$("#combined_table").find("tr").find("th:first").find("span").remove();
	$("#oper").nextAll("br:eq(0)").remove();
	$("#oper").nextAll("a:eq(0)").remove();
	$("#oper").css("background","transparent url(http://cdn2.tribalwars.net/8.16/18758/graphic/index/iconbar-mc.png) scroll left top repeat");
	$("#combined_table").find("tr").find(".unit-item:last").next("td").find("a").contents().unwrap();

	switch(game_data.world){
		case "ae10":
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
		case "ae20":
			WS = 1.5;
			US = 0.667;
			break;
		case "aes1":
			WS = 400;
			US = 1;
			break;
	}

	var spd = WS*US;

	function toggle(all){
		checkboxes = $("input[name='vlg']");
		n = checkboxes.length;
		for(var i=0; i<n; i++){
			checkboxes[i].checked = all.checked;
		}
	}

	function rmov(chk){
		$(chk).parent("td").parent("tr").remove();
	}

	$("#combined_table").find("tr").find("td:first").append('<input name="vlg" type="checkbox" ondblclick="rmov(this)">');
	$("#combined_table").find("tr").find("th:first").append('<input name="all" type="checkbox" onclick="toggle(this)">');
	$("#combined_table").after('<div style="border-top:2px solid #804000;border-left:2px solid #804000;border-right:2px solid #603000;border-bottom:2px solid #402000;"><textarea id="ops" cols="160" rows="30" onfocus="this.select();">[table]\n\
[**]توقيت الإرسال[||]من[||]إلى[||]الوحدة[||]النوع[/**]\n\
</textarea></div>');
	$("#ops").parent().css("background","transparent url(http://cdn2.tribalwars.net/8.16/18758/graphic/index/iconbar-mc.png) scroll left top repeat");

	function divo(dvd){
		var IN = $(dvd).parent("tr").find("input:first");
		if(IN.is(":checked")){
			$(dvd).parent("tr").find("input:first").click();
		}
		$(dvd).parent("tr").find("div").wrap('<td class="unit-item" onclick="diva(this)"></td>');
		$(dvd).parent("td").parent("tr").find("div").contents().unwrap();
		var snobs = $("#combined_table").find(".snob").length;
		var rams = $("#combined_table").find(".ram").length;
		var spears = $("#combined_table").find(".spear").length;
		var swords = $("#combined_table").find(".sword").length;
		var def = ((spears*1)+(swords*1));
		$("#count").find("tr:eq(0)").find("td:last").html("<b><span style='color:red;'>"+snobs+"</span></b>");
		$("#count").find("tr:eq(1)").find("td:last").html("<b><span style='color:red;'>"+rams+"</span></b>");
		$("#count").find("tr:eq(2)").find("td:last").html("<b><span style='color:red;'>"+def+"</span></b>");
	}

	function diva(dvdv){
		$(dvdv).parent("tr").find("div").wrap('<td class="unit-item" onclick="diva(this)"></td>');
		$(dvdv).parent("tr").find("div").contents().unwrap();
		var In = $(dvdv).parent("tr").find("input:first");
		if(!In.is(":checked")){
			$(dvdv).parent("tr").find("input:first").click();
		}
		var a = $(dvdv).index();
		var b = (a*1)+(1*1);
		$(dvdv).wrap('<div style="border-top:2px solid #804000;border-left:2px solid #804000;border-right:2px solid #603000;border-bottom:2px solid #402000;text-align:center;" onclick="divo(this)"></div>');
		$("#combined_table").find(".row_a").find("div").find("td").contents().unwrap();
		$("#combined_table").find(".row_a").find("div").css("background","#f0e2be");
		$("#combined_table").find(".row_b").find("div").find("td").contents().unwrap();
		$("#combined_table").find(".row_b").find("div").css("background","#fff5da");
		$("#combined_table").find(".selected").find("div").css("background","#ffe0a2");
		var cls = $("#combined_table").find(":nth-child("+b+")").closest("th").find("a").attr("href").match(/order=([a-z]+)/)[1];
		$("#combined_table").find(":nth-child("+b+")").closest("div").attr("class",""+cls+"");
		var snobs = $("#combined_table").find(".snob").length;
		var rams = $("#combined_table").find(".ram").length;
		var spears = $("#combined_table").find(".spear").length;
		var swords = $("#combined_table").find(".sword").length;
		var def = ((spears*1)+(swords*1));
		$("#count").find("tr:eq(0)").find("td:last").html("<b><span style='color:red;'>"+snobs+"</span></b>");
		$("#count").find("tr:eq(1)").find("td:last").html("<b><span style='color:red;'>"+rams+"</span></b>");
		$("#count").find("tr:eq(2)").find("td:last").html("<b><span style='color:red;'>"+def+"</span></b>");
	}

	$("#combined_table").find("tr").find(".unit-item").attr("onclick","diva(this)");
	$("#combined_table").find("tr").find(".unit-item:last").next("td").attr("onclick","diva(this)");

	function trans(){
		$("#combined_table").find("tr").each(function(){
			var sna = $(this).find("td:eq(19)").text();
			var snb = $(this).find("td:eq(18)").text();
			if(sna>=3){
				$(this).find("td:eq(19)").click();
			}else if(snb>=3){
				$(this).find("td:eq(18)").click();
			}
		});
		var tg1 = $("#tg").html().match(/\d+/g);
		var vl1 = $("#count").find("input:eq(0)").val();
		var snobs = $("#combined_table").find(".snob").length;
		var vv1 = (snobs-vl1);
		for(var i=0; i<vv1; i++){
			$("#combined_table").find(".snob:last").click();
		}
		var snbs = $("#combined_table").find("tr").find(".snob").parent("tr");
		var rams = $("#combined_table").find(".ram").length;
		if(rams >= 1){
			$("#combined_table").find(".ram:first").parent("tr").before(snbs);
		}else{
			$("#combined_table").find("tr:first").after(snbs);
		}
	}

	function nukes(){
		$("#combined_table").find("tr").each(function(){
			var snobs = $(this).find(".snob").length;
			var rm = $(this).find("td:eq(16)").text();
			var ax = $(this).find("td:eq(10)").text();
			var lg = $(this).find("td:eq(13)").text();
			var mr = $(this).find("td:eq(14)").text();
			if(rm>=50 && ax>=5400 && lg>=2200 && snobs == 0){
				$(this).find("td:eq(16)").click();
			}
			if(rm>=50 && ax>=5400 && mr>=2200 && snobs == 0){
				$(this).find("td:eq(16)").click();
			}
			if(rm>=50 && ax>=8500 && snobs == 0){
				$(this).find("td:eq(16)").click();
			}
		});
		var tg2 = $("#combined_table").find(".snob").length;
		var vl2 = $("#count").find("input:eq(1)").val();
		var rams = $("#combined_table").find(".ram").length;
		var vv2 = (rams-(vl2*tg2));
		for(var i=0; i<vv2; i++){
			$("#combined_table").find(".ram:last").click();
		}
		var rms = $("#combined_table").find("tr").find(".ram").parent("tr");
		var snobs = $("#combined_table").find(".snob").length;
		if(snobs >= 1){
			$("#combined_table").find(".snob:last").parent("tr").after(rms);
		}else{
			$("#combined_table").find("tr:first").after(rms);
		}
	}

	function defences(){
		$("#combined_table").find("tr").each(function(){
			var sp = $(this).find("td:eq(8)").text();
			var sw = $(this).find("td:eq(9)").text();
			var ar = $(this).find("td:eq(11)").text();
			var hv = $(this).find("td:eq(15)").text();
			if(sp>=6000 && hv>=1400){
				$(this).find("td:eq(8)").click();
			}
			if(sp>=6000 && ar>=6000){
				$(this).find("td:eq(8)").click();
			}
			if(sp>=6000 && sw>=6000){
				$(this).find("td:eq(9)").click();
			}
			if(sp>=4000 && sw>=4000 && ar>=4000){
				$(this).find("td:eq(9)").click();
			}
			if(sp>=4000 && sw>=2000 && hv>=1000){
				$(this).find("td:eq(9)").click();
			}
		});
		var tg3 = $("#combined_table").find(".snob").length;
		var vl3 = $("#count").find("input:eq(2)").val();
		var spears = $("#combined_table").find(".spear").length;
		var swords = $("#combined_table").find(".sword").length;
		var def = ((spears*1)+(swords*1));
		var vv3 = (def-(vl3*tg3));
		for(var i=0; i<vv3; i++){
			if(spears > swords){
				$("#combined_table").find(".spear:last").click();
			}else if(spears < swords){
				$("#combined_table").find(".sword:last").click();
			}
		}
		var spr = $("#combined_table").find("tr").find(".spear").parent("tr");
		var swr = $("#combined_table").find("tr").find(".sword").parent("tr");
		var snobs = $("#combined_table").find(".snob").length;
		var rams = $("#combined_table").find(".ram").length;
		if(snobs >= 1 && rams >= 1){
			$("#combined_table").find(".ram:last").parent("tr").after(spr);
			$("#combined_table").find(".ram:last").parent("tr").after(swr);
		}else if(snobs >= 1 && rams == 0){
			$("#combined_table").find(".snob:last").parent("tr").after(spr);
			$("#combined_table").find(".snob:last").parent("tr").after(swr);
		}else if(rams >= 1 && snobs == 0){
			$("#combined_table").find(".ram:last").parent("tr").after(spr);
			$("#combined_table").find(".ram:last").parent("tr").after(swr);
		}else{
			$("#combined_table").find("tr:first").after(spr);
			$("#combined_table").find("tr:first").after(swr);
		}
	}

	function all_troupes(){
		$(".vis_item").find(".hrf:eq(0)")[0].click();
		$(".vis_item").find(".hrf:eq(1)")[0].click();
		$(".vis_item").find(".hrf:eq(2)")[0].click();
	}

	function cancel(){
		$("#combined_table").find("tr").each(function(){
			$(this).find("div").click();
		});
	}

	var tg = $("#tg").html().match(/\d+/g);
	$(".vis_item").append("<br>");
	$(".vis_item").find("br:last").after('<a href="#" style="color:red;" onclick="trans(); return false;" class="hrf">[القطارات] </a>');
	$(".vis_item").find("a:last").after('<a href="#" style="color:red;" onclick="nukes(); return false;" class="hrf">[النيوكات] </a>');
	$(".vis_item").find("a:last").after('<a href="#" style="color:red;" onclick="defences(); return false;" class="hrf">[الدفاعات] </a>');
	$(".vis_item").find("a:last").after('<a href="#" style="color:red;" onclick="all_troupes(); return false;">[الكل] </a>');
	$(".vis_item").find("a:last").after('<a href="#" style="color:red;" onclick="cancel(); return false;">[إلغاء]</a>');
	$(".vis_item").after('<table align="center"><tbody><tr><td><div id="count" style="width:auto;border-top:2px solid black;border-left:2px solid black;border-right:2px solid black;border-bottom:2px solid black;"><table><tbody><tr><td><b>● عدد القطارات على الأهداف :</b></td><td><input name="trn" type="text" style="width:25px;text-align:center;" value='+tg+'></td><td><b>● مجموع القطارات المختارة :</b></td><td><b><span style="color:red;">0</span></b></td></tr><tr><td><b>● عدد النيوكـات على كل قرية :</b></td><td><input name="nk" type="text" style="width:25px;text-align:center;" value="3"></td><td><b>● مجموع النيوكـات المختارة :</b></td><td><b><span style="color:red;">0</span></b></td></tr><tr><td><b>● عدد الدفاعـات إلى كل قرية :</b></td><td><input name="df" type="text" style="width:25px;text-align:center;" value="1"></td><td><b>● مجموع الدفاعات المختارة :</b></td><td><b><span style="color:red;">0</span></b></td></tr></tbody></table></div></td></tr></tbody></table>');
	$("#count").css("background","transparent url(http://cdn2.tribalwars.net/8.16/18758/graphic/index/iconbar-mc.png) scroll left top repeat");

	function Operation(){
		$("#combined_table").find("tr").each(function(){
			var inp = $(this).find("input");
			if(!inp.is(":checked")){
				inp.parent("td").parent("tr").remove();
			}
		});
		var B = $("#combined_table").find("tr").find("td:first").find(":checked").parent("td").parent("tr").find("td:eq(1)").find("a:eq(0)").find("span").text().match(/\d+\|\d+/g).length;
		var L = $("#combined_table").find("tr").find("td:first").find(":checked").parent("td").parent("tr").find("td:eq(1)").find("a:eq(0)").find("span").text().match(/\d+\|\d+/g);

		var rvlg = $("#targets").val().match(/\d+\|\d+/g)+",";
		var arr = Array(2).join(L);
		var arra = Array(10000).join(rvlg);
		var LV = arr.split(",");
		var RV = arra.split(",");
			
		for(var i=0; i<B; i++){
			var hah = RV[i];
			var gag = LV[i];

			var local_villages = gag.split("|");
			var remote_village = hah.split("|");
		
			var rma = local_villages[1];
			var rmb = local_villages[0];
			var dst = Math.sqrt(Math.pow(remote_village[0] - rmb, 2) + Math.pow(remote_village[1] - rma, 2)).toFixed(5);

			var days = $("#day").val().split("-");
			var hours = $("#hours").val().split(":");
			var serverDate = $("#serverDate").text().split("/");
			var day = days[2]*24*3600;
			if(serverDate[0] > days[2]){
				var month = (new Date().getMonth())+1;
				var dy;
				switch(month){
					case 1:dy = 31;break;case 2:dy = 28;break;
					case 3:dy = 31;break;case 4:dy = 30;break;
					case 5:dy = 31;break;case 6:dy = 30;break;
					case 7:dy = 31;break;case 8:dy = 31;break;
					case 9:dy = 30;break;case 10:dy = 31;break;
					case 11:dy = 30;break;case 12:dy = 31;break;
				}
				var day = ((dy*1)+(days[2]*1))*24*3600;
			}
			var hour = hours[0]*3600;
			var minuts = hours[1]*60;
			var seconde = hours[2];
			var ra = (hour*1)+(day*1)+(minuts*1)+(seconde*1);
			var wa = days[1];
			var wb = days[0];
			var g = (i*1)+(1*1);
			var div = $("#combined_table").find("tr:eq("+g+")").find("td:first").find(":checked").parent("td").parent("tr").find("div");
			
			if(div.hasClass("spear")){
				var tm = ((dst*18*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]spear[/unit][|][i]دعم[/i][/*]\r");
			}else if(div.hasClass("sword")){
				var tm = ((dst*22*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]sword[/unit][|][i]دعم[/i][/*]\r");

			}else if(div.hasClass("axe")){
				var tm = ((dst*18*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]axe[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("archer")){
				var tm = ((dst*18*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]archer[/unit][|][i]دعم[/i][/*]\r");
			}else if(div.hasClass("spy")){
				var tm = ((dst*09*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]spy[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("light")){
				var tm = ((dst*10*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]light[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("marcher")){
				var tm = ((dst*10*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]marcher[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("heavy")){
				var tm = ((dst*11*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]heavy[/unit][|][i]دعم[/i][/*]\r");
			}else if(div.hasClass("ram")){
				var tm = ((dst*30*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]ram[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("catapult")){
				var tm = ((dst*30*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]catapult[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("knight")){
				var tm = ((dst*10*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]knight[/unit][|][i]هجوم[/i][/*]\r");
			}else if(div.hasClass("snob")){
				var tm = ((dst*35*60));
				var x = ra-tm;
				var dt = (x/3600)/24;
				var dd = ("0" + parseInt(dt)).slice(-2);
				var ht = x-(dd*24*3600);
				var hh = ("0" + parseInt(ht/3600)).slice(-2);
				var mt = ht-(hh*3600);
				var mm = ("0" + parseInt(mt/60)).slice(-2);
				var st = mt-(mm*60);
				var ss = ("0" + st.toFixed(0)).slice(-2);
				if(dd > dy){
					var dd = ("0" + parseInt(dd-dy)).slice(-2);
				}
				if(dd > days[2]){
					var wa = serverDate[1];
				}
				var VL = $("#ops").val();
				$("#ops").val(VL+"[*][b]"+dd+"/"+wa+"/"+wb+" [color=#ff0000]"+hh+":"+mm+":"+ss+"[/color][/b][|][coord]"+gag+"[/coord][|][coord]"+hah+"[/coord][|][unit]snob[/unit][|][i]احتلال[/i][/*]\r");
			}
		}
		$("#ops").val($("#ops").val().replace("[/table]",""));
		var VL = $("#ops").val();
		$("#ops").val(VL+"[/table]");
	}

	function players(){
		var player = $(".play").val();
		$.post("/game.php?village=608&mode=player&search=&screen=ranking", {name:player}, function(data){
			var ply = $(data).find(".lit").find(".lit-item:eq(1)").attr("style","display:none");
			$("#search").after(ply);
			$(".lit-item:first").each(function(){
				var url = $(this).find("a:first").attr("href");
				$.ajax({
					url:url,
					datatype:"html",
					cache:true,
					success :function(data){
						var villages = $(data).find("#villages_list").attr("style","width:auto");
						$("#vlag").append(villages);
						$("#vlag").find(".vis:last").wrap('<td valign="top" style="min-width:240px"><div style="border-top:2px solid black;border-left:2px solid black;border-right:2px solid black;border-bottom:2px solid black;"></div></td>');
						$("#vlag").css("background","transparent url(http://cdn2.tribalwars.net/8.16/18758/graphic/index/iconbar-mc.png) scroll left top repeat");
						if(!$("#set").is(":checked")){
							$("#vlag").find(".vis:last").find("tbody").find("tr").each(function(){
								var trv = $("#targets").val();
								var CR = $(this).find("td:eq(1)").text().match(/\d+\|\d+/g);
								if(trv == 0){
									$("#targets").val(CR);
								}else{
									$("#targets").val(trv+"\r"+CR);
								}
								var tl = $("#targets").val().match(/\d+\|\d+/g).length;
								$("#count").find("input:eq(0)").val(tl);
								$("#tg").html("عدد الأهداف : <span style='color:red;'>"+tl+"</span>");
							});
						}
						$("#vlag").find(".vis:last").find("tbody").find("tr").each(function(){
							var td = $(this).find("td:last");
							var url = $(this).find("td:first").find("span:first").find("a:first").attr("href");
							$.ajax({
								url:url,
								datatype:"html",
								cache:true,
								success :function(data){
									var rsrv = $(data).find(".vis:first").find("tr:eq(5)").find("td:eq(1)").find("a:first").html();
									var pl = game_data.player.name;
									if($("#set").is(":checked")){
										if(pl !== rsrv){
											$(td).parent("tr").remove();
										}else if(pl == rsrv){
											var trv = $("#targets").val();
											var CR = $(td).parent("tr").find("td:eq(1)").text().match(/\d+\|\d+/g);
											if(trv == 0){
												$("#targets").val(CR);
											}else{
												$("#targets").val(trv+"\r"+CR);
											}
											var tl = $("#targets").val().match(/\d+\|\d+/g).length;
											$("#count").find("input:eq(0)").val(tl);
											$("#tg").html("عدد الأهداف : <span style='color:red;'>"+tl+"</span>");
										}
									}
								}
							});
						});
					}
				});
			});
		});
	}

	$("#oper").before('<table id="search" class="vis bbcodetable" align="center"><tbody><tr><th>البحث عن اللاعب : <input name="name" type="text" value="" size="20" class="play" autocomplete="on"><input class="btn" type="submit" value="موافق" onclick="players()"></th><th><input id="set" name="set" type="checkbox"> القرى المحجوزة فقط</th></tr></tbody></table>');
	$("#oper").before('<br><div id="vlag" style="border-top:2px solid #804000;border-left:2px solid #804000;border-right:2px solid #603000;border-bottom:2px solid #402000;max-height:300px;overflow:auto;"></div><br>');

	function clean(){
		$("#ops").val('[table]\n[**]توقيت الإرسال[||]من[||]إلى[||]الوحدة[||]النوع[/**]\n');
	}

	$("#ops").before('<table class="vis"><tbody><tr><td><button class="btn btn-confirm-yes" onclick="Operation()">خطط للأوب!!</button></td></tr></tbody></table>');
	$("#ops").after('<table class="vis cln"><tbody><tr><td><button class="btn btn-confirm-yes" onclick="clean()">تفريغ</button></td></tr></tbody></table>');
	$(".cln:last").after('<table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table><br>');

$(document).on("click", "#set", function(){
   var co_check = $(this);
   if(co_check.is(":checked")){
	  createCookie("co_check", co_check, 120);
   }else{
	  eraseCookie("co_check");
   }
   return true;
});
var co_check = readCookie("co_check");
if(co_check){
	$("#set").click();
}

$(document).on("change", "#day", function(){
   var co_day = $(this).val();
   if($("#day").val().match(/\d+/)){
	  createCookie("co_day", co_day, 120);
   }else{
	  eraseCookie("co_day");
   }
   return true;
});
var co_day = readCookie("co_day");
if(co_day){
	$("#day").val(co_day);
}

$(document).on("change", "#hours", function(){
   var co_hours = $(this).val();
   if($("#hours").val() !== "00:00:00"){
	  createCookie("co_hours", co_hours, 120);
   }else if($("#hours").val() == "00:00:00"){
	  eraseCookie("co_hours");
   }
   return true;
});
var co_hours = readCookie("co_hours");
if(co_hours){
	$("#hours").val(co_hours);
}

$(document).on("change", "#targets", function(){
   var co_targets = $(this).val().match(/\d+\|\d+/g).join(" ");
   if($("#targets").val().match(/\d+\|\d+/g).length > 0){
	  createCookie("co_targets", co_targets, 120);
   }else if($("#targets").val().length == 0){
	  eraseCookie("co_targets");
   }
   return true;
});
var co_targets = readCookie("co_targets");
if(co_targets){
    var ctr = co_targets.match(/\d+\|\d+/g).join("\r");
	$("#targets").val(ctr);
	var tl = $("#targets").val().match(/\d+\|\d+/g).length;
	$("#count").find("input:eq(0)").val(tl);
	$("#tg").html("عدد الأهداف : <span style='color:red;'>"+tl+"</span>");
}

$(document).on("change", "input[name=nk]", function(){
   var co_nk = $(this).val();
   if($("input[name=nk]").val() > 0){
	  createCookie("co_nk", co_nk, 120);
   }else{
	  eraseCookie("co_nk");
   }
   return true;
});
var co_nk = readCookie("co_nk");
if(co_nk){
	$("input[name=nk]").val(co_nk);
}

$(document).on("change", "input[name=df]", function(){
   var co_df = $(this).val();
   if($("input[name=df]").val() > 0){
	  createCookie("co_df", co_df, 120);
   }else{
	  eraseCookie("co_df");
   }
   return true;
});
var co_df = readCookie("co_df");
if(co_df){
	$("input[name=df]").val(co_df);
}

function createCookie(name,value,days){
    if(days){
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++){
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name){
    createCookie(name,"",-1);
}

}else if(window.document.URL.match(/screen=memo/) !== null){
	$(".memo_container[style!='display: none;']").find(".bbcodetable:first").find("tr:first").nextAll("tr").sort(dec_sort).appendTo(".memo_container[style!='display: none;'] .bbcodetable:first tbody");
	function dec_sort(a, b){
		return ($(b).find("td:first").text()) < ($(a).find("td:first").text()) ? 1 : -1;    
	}
	$(".memo_container[style!='display: none;']").find(".bbcodetable:first").find("tr:first").find("th:last").after("<th>المدة | اليوم</th>");
	$(".memo_container[style!='display: none;']").find(".bbcodetable:first").find("tr:first").nextAll("tr").each(function(){
		$(this).find("td:last").after('<td align="center"><b><span class="timers"></span></b></td>');
	});

	$(".memo_container[style!='display: none;']").find(".bbcodetable:first").after('<br><table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');

	var counter = setInterval(timer, 1000);
	function timer(){
		$(".memo_container[style!='display: none;']").find(".bbcodetable:first").find("tr:first").nextAll("tr").each(function(){
			var Td = $(this).find(".timers");
			var TM = $(this).find("td:first").text().split(" ");
			var Date1 = TM[0].split("/");
			var Time1 = TM[1].split(":");
			var Month1 = Date1[1]*1;
			var Dy1;
			switch(Month1){
				case 1:Dy1 = 31;break;case 2:Dy1 = 28;break;
				case 3:Dy1 = 31;break;case 4:Dy1 = 30;break;
				case 5:Dy1 = 31;break;case 6:Dy1 = 30;break;
				case 7:Dy1 = 31;break;case 8:Dy1 = 31;break;
				case 9:Dy1 = 30;break;case 10:Dy1 = 31;break;
				case 11:Dy1 = 30;break;case 12:Dy1 = 31;break;
			}
			var Month1 = Dy1*24*3600;
			var Day1 = Date1[0]*24*3600;
			var sec1 = (Month1*1)+(Day1*1);
			var Hours1 = Time1[0]*3600;
			var Minuts1 = Time1[1]*60;
			var Seconde1 = Time1[2];
			var sec2 = (Hours1*1)+(Minuts1*1)+(Seconde1*1);
			var result1 = (sec1*1)+(sec2*1);

			var Date2 = $("#serverDate").text().split("/");
			var Time2 = $("#serverTime").text().split(":");
			var Month2 = Date2[1]*1;
			var Dy2;
			switch(Month2){
				case 1:Dy2 = 31;break;case 2:Dy2 = 28;break;
				case 3:Dy2 = 31;break;case 4:Dy2 = 30;break;
				case 5:Dy2 = 31;break;case 6:Dy2 = 30;break;
				case 7:Dy2 = 31;break;case 8:Dy2 = 31;break;
				case 9:Dy2 = 30;break;case 10:Dy2 = 31;break;
				case 11:Dy2 = 30;break;case 12:Dy2 = 31;break;
			}
			var Month2 = Dy2*24*3600;
			var Day2 = Date2[0]*24*3600;
			var Sec1 = (Month2*1)+(Day2*1);
			var Hours2 = Time2[0]*3600;
			var Minuts2 = Time2[1]*60;
			var Seconde2 = Time2[2];
			var Sec2 = (Hours2*1)+(Minuts2*1)+(Seconde2*1);
			var result2 = (Sec1*1)+(Sec2*1);

			var Timer = result1-result2;
			var Dy3 = (Timer/3600)/24;
			var Day3 = ("0" + parseInt(Dy3)).slice(-2);
			var Ht = Timer-(Day3*24*3600);
			var Hours3 = ("0" + parseInt(Ht/3600)).slice(-2);
			var Mt = Ht-(Hours3*3600);
			var Minuts3 = ("0" + parseInt(Mt/60)).slice(-2);
			var St = Mt-(Minuts3*60);
			var Seconde3 = ("0" + St.toFixed(0)).slice(-2);

			$(Td).html(Hours3+":"+Minuts3+":"+Seconde3+" | "+Day3);
		});
	}
}
void(0);