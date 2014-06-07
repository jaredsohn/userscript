// ==UserScript==
// @name           سكربت إنشاء العروض على مستوى المملكة
// @namespace      حرب القبائل
// @version        2.2
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&screen=overview_villages&mode=prod
// @include        http://ae*.tribalwars.ae/game.php?*&mode=prod&screen=overview_villages
// ==/UserScript==

if(!document.URL.match(/mode=prod/)){
	UI.InfoMessage("سيتم تحويلك الآن ...",3000,true);
	var ID = window.document.URL.match(/\d+/g)[1];
	window.open("/game.php?village="+ID+"&screen=overview_villages&mode=prod","_self");
}
if(document.URL.match(/mode=prod/)){
	$("#production_table").find("tbody").find(".nowrap").each(function(){
		var a1 = $(this).find(".wood").text().replace(".","")*1;
		var b1 = $(this).find(".stone").text().replace(".","")*1;
		var c1 = $(this).find(".iron").text().replace(".","")*1;
		var r1 = (a1+b1+c1)/3;
		if(400000 == r1){
			$(this).remove();
		}
	});
	function Offer(){
		var Ln = $("#production_table").find("tbody").find(":checked").length;
		for(var i=0; i<Ln; i++){
			var tr = $("#production_table").find("tbody").find(":checked:eq("+i+")").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			var sl = $("#own_offer_form").find("input[name='sell']").val();
			var by = $("#own_offer_form").find("input[name='buy']").val();
			var mx = $("#own_offer_form").find("input[name='max_time']").val();
			var mt = $("#own_offer_form").find("input[name='multi']").val()*1;
			var ml = $("#own_offer_form").find("input[name='multi']").val()*1;
			if(ml > tr){
				var ml = tr;
			}
			var rs = $("#own_offer_form").find("input[name='res_sell']:checked").val();
			var rb = $("#own_offer_form").find("input[name='res_buy']:checked").val();
			var villageID = $("#production_table").find("tbody").find(":checked:eq("+i+")").parents(".nowrap").find("td:eq(1)").find("span:first").attr("data-id").match(/\d+/g)[0];
			$("#MRK").html($("#MRK").html().replace(/village=\d+/g, "village="+villageID+""));
			var URL = $("#MRK").find("#own_offer_form").attr("action");
			$("#own_offer_form").find("input[name='sell']").val(sl);
			$("#own_offer_form").find("input[name='buy']").val(by);
			$("#own_offer_form").find("input[name='max_time']").val(mx);
			$("#own_offer_form").find("input[name='multi']").val(mt);
			$("#own_offer_form").find("input[value="+rs+"]:first").click();
			$("#own_offer_form").find("input[value="+rb+"]:last").click();
			$.post(URL, {sell:sl,buy:by,max_time:mx,multi:ml,res_sell:rs,res_buy:rb}, function(data){
				$(data);
				var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
				var q = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[1]*1;
				var g = m-ml;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+g+"/"+q+"");
				var ch = $("#production_table").find("tbody").find("input:checked:first");
				ch.after('<img src="/graphic/confirm.png" width="17">');
				ch.remove();
				if($("#production_table").find("tbody").find(":checked").length == 0){
					alert("[ تم إنشاء العروض في السوق ]");
				}
			});
		}
	}
	function toggle(all){
		checkboxes = $("input[name='market']");
		k = checkboxes.length;
		for(var i=0; i<k; i++){
			checkboxes[i].checked = all.checked;
		}
	}
	$("#production_table").find("tbody").after('<tr><th colspan="3"></th><th colspan="7"><input name="all" type="checkbox" onclick="toggle(this)"></th></tr>');
	$("#production_table").find("tbody").find(".nowrap").each(function(){
		$(this).find("td:eq(3)").prepend('<input type="Checkbox" name="market">');
	});
	$(".vis_item").after('<table align="center"><tbody><tr><td><div id="MRK"><form id="own_offer_form" action="/game.php?village=01234&amp;mode=own_offer&amp;action=new_offer&amp;h=token&amp;screen=market" method="post">\
	<input type="hidden" id="premium_min" value="200000"><input type="hidden" id="premium_max" value="1">\
	<input type="hidden" id="premium_check" value="/game.php?village=01234&amp;ajax=check_premium&amp;feature=ResourcesTradeOffer&amp;screen=api">\
	<table class="vis"><tbody><tr><td>عرض</td><td><input name="sell" type="text" style="width: 50px" value="1000"></td><td>\
	<table cellspacing="0" cellpadding="0"><tbody><tr>\
	<td><input id="res_sell_wood" name="res_sell" type="radio" value="wood"></td><td width="30"><label for="res_sell_wood"><img src="/graphic/holz.png" title="خشب" alt="" class=""></label></td>\
	<td><input id="res_sell_stone" name="res_sell" type="radio" value="stone"></td><td width="30"><label for="res_sell_stone"><img src="/graphic/lehm.png" title="طمي" alt="" class=""></label></td>\
	<td><input id="res_sell_iron" name="res_sell" type="radio" value="iron"></td><td width="30"><label for="res_sell_iron"><img src="/graphic/eisen.png" title="حديد" alt="" class=""></label></td>\
	</tr></tbody></table></td></tr><tr><td>مقابل:</td><td><input name="buy" type="text" style="width: 50px" value="1000"></td><td>\
	<table cellspacing="0" cellpadding="0"><tbody><tr>\
	<td><input id="res_buy_wood" name="res_buy" type="radio" value="wood"></td><td width="30"><label for="res_buy_wood"><img src="/graphic/holz.png" title="خشب" alt="" class=""></label></td>\
	<td><input id="res_buy_stone" name="res_buy" type="radio" value="stone"></td><td width="30"><label for="res_buy_stone"><img src="/graphic/lehm.png" title="طمي" alt="" class=""></label></td>\
	<td><input id="res_buy_iron" name="res_buy" type="radio" value="iron"></td><td width="30"><label for="res_buy_iron"><img src="/graphic/eisen.png" title="حديد" alt="" class=""></label></td></tr></tbody></table></td></tr><tr><td>المده القصوى:</td>\
	<td><input id="time" name="max_time" type="text" style="width: 50px" value="24"></td><td>ساعات</td></tr><tr><td>عدد العروض:</td>\
	<td><input name="multi" type="text" style="width: 50px" value="1"></td><td>العروض</td></tr>\
	<tr id="premium_cost" style="display: none;"><td>التكلفة لكل 1000 وحدة</td>\
	<td><span id="premium_cost_value" class="error">1000</span></td><td><span id="premium_cost_error">اقل : 200000</span></td></tr>\
	</tbody></table></form><table class="vis" align="right"><tbody><tr><td><input class="btn" type="submit" value="انشاء" onclick="Offer()"></td></tr></tbody></table></div></td></tr></tbody></table><table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
	$("#MRK").css({"width":"361px","height":"156px","border-top":"2px solid #804000","border-left":"2px solid #602500","border-right":"2px solid #603000","border-bottom":"2px solid #402000"});
	var url = "/game.php?screen=market&mode=own_offer";
	$.ajax({
		url:url,
		datatype:"html",
		cache:true,
		success :function(data){
			var token = $(data).find("#own_offer_form").attr("action").match(/([a-z0-9]+)/g)[11];
			$("#own_offer_form").attr("action", $("#own_offer_form").attr("action").replace("token",token));
		}
	});
	function blnc(){
		function balance(){
			var tr = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			var sl = $("#own_offer_form").find("input[name='sell']").val();
			var by = $("#own_offer_form").find("input[name='buy']").val();
			var mx = $("#own_offer_form").find("input[name='max_time']").val();
			var mt = $("#own_offer_form").find("input[name='multi']").val()*1;
			var ml = $("#own_offer_form").find("input[name='multi']").val()*1;
			if(ml > tr){
				var ml = tr;
			}
			var rs = $("#own_offer_form").find("input[name='res_sell']:checked").val();
			var rb = $("#own_offer_form").find("input[name='res_buy']:checked").val();
			var villageID = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(1)").find("span:first").attr("data-id").match(/\d+/g)[0];
			$("#MRK").html($("#MRK").html().replace(/village=\d+/g, "village="+villageID+""));
			var URL = $("#MRK").find("#own_offer_form").attr("action");
			$("#own_offer_form").find("input[name='sell']").val(sl);
			$("#own_offer_form").find("input[name='buy']").val(by);
			$("#own_offer_form").find("input[name='max_time']").val(mx);
			$("#own_offer_form").find("input[name='multi']").val(mt);
			$("#own_offer_form").find("input[value="+rs+"]:first").click();
			$("#own_offer_form").find("input[value="+rb+"]:last").click();
			$.post(URL, {sell:sl,buy:by,max_time:mx,multi:ml,res_sell:rs,res_buy:rb}, function(data){
				$(data);
			});
		}
		var a = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find(".wood").text().replace(".","")*1;
		var b = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find(".stone").text().replace(".","")*1;
		var c = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find(".iron").text().replace(".","")*1;
		var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
		var n = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[1]*1;
		var r = (a+b+c)/3;
		if(a > r){
			var AA = ((a-r)/1000).toFixed(0);
			if(AA >= m){
				var AA = m;
			}
		}else if(a < r){
			var aa = ((r-a)/1000).toFixed(0);
			if(aa >= m){
				var aa = m;
			}
		}
		if(b > r){
			var BB = ((b-r)/1000).toFixed(0);
			if(BB >= m){
				var BB = m;
			}
		}else if(b < r){
			var bb = ((r-b)/1000).toFixed(0);
			if(bb >= m){
				var bb = m;
			}
		}
		if(c > r){
			var CC = ((c-r)/1000).toFixed(0);
			if(CC >= m){
				var CC = m;
			}
		}else if(c < r){
			var cc = ((r-c)/1000).toFixed(0);
			if(cc >= m){
				var cc = m;
			}
		}
		if(400000 == r){
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").remove();
		}
		if(AA !== undefined && BB !== undefined && CC == undefined){
			$("#res_sell_wood").click();
			$("#res_buy_iron").click();
			$("#own_offer_form").find("input[name='multi']").val(AA);
			balance();
			var m = m-AA;
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+m+"/"+n+"");
			var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			$("#res_sell_stone").click();
			$("#res_buy_iron").click();
			if(m < BB){
				$("#own_offer_form").find("input[name='multi']").val(m);
				balance();
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html("0/"+n+"");
			}else if(m > BB){
				$("#own_offer_form").find("input[name='multi']").val(BB);
				balance();
				var o = m-BB;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+o+"/"+n+"");
			}
			var ch = $("#production_table").find("tbody").find("input:checked:first");
			ch.after('<img src="/graphic/confirm.png" width="17">');
			ch.remove();
		}else if(AA !== undefined && BB == undefined && CC !== undefined){
			$("#res_sell_wood").click();
			$("#res_buy_stone").click();
			$("#own_offer_form").find("input[name='multi']").val(AA);
			balance();
			var m = m-AA;
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+m+"/"+n+"");
			var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			$("#res_sell_iron").click();
			$("#res_buy_stone").click();
			if(m < CC){
				$("#own_offer_form").find("input[name='multi']").val(m);
				balance();
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html("0/"+n+"");
			}else if(m > CC){
				$("#own_offer_form").find("input[name='multi']").val(CC);
				balance();
				var o = m-CC;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+o+"/"+n+"");
			}
			var ch = $("#production_table").find("tbody").find("input:checked:first");
			ch.after('<img src="/graphic/confirm.png" width="17">');
			ch.remove();
		}else if(AA == undefined && BB !== undefined && CC !== undefined){
			$("#res_sell_stone").click();
			$("#res_buy_wood").click();
			$("#own_offer_form").find("input[name='multi']").val(BB);
			balance();
			var m = m-BB;
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+m+"/"+n+"");
			var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			$("#res_sell_iron").click();
			$("#res_buy_wood").click();
			if(m < CC){
				$("#own_offer_form").find("input[name='multi']").val(m);
				balance();
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html("0/"+n+"");
			}else if(m > CC){
				$("#own_offer_form").find("input[name='multi']").val(CC);
				balance();
				var o = m-CC;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+o+"/"+n+"");
			}
			var ch = $("#production_table").find("tbody").find("input:checked:first");
			ch.after('<img src="/graphic/confirm.png" width="17">');
			ch.remove();
		}else if(AA !== undefined && BB == undefined && CC == undefined){
			$("#res_sell_wood").click();
			$("#res_buy_stone").click();
			$("#own_offer_form").find("input[name='multi']").val(bb);
			balance();
			var m = m-bb;
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+m+"/"+n+"");
			var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			$("#res_sell_wood").click();
			$("#res_buy_iron").click();
			if(m < cc){
				$("#own_offer_form").find("input[name='multi']").val(m);
				balance();
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html("0/"+n+"");
			}else if(m > cc){
				$("#own_offer_form").find("input[name='multi']").val(cc);
				balance();
				var o = m-cc;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+o+"/"+n+"");
			}
			var ch = $("#production_table").find("tbody").find("input:checked:first");
			ch.after('<img src="/graphic/confirm.png" width="17">');
			ch.remove();
		}else if(AA == undefined && BB !== undefined && CC == undefined){
			$("#res_sell_stone").click();
			$("#res_buy_wood").click();
			$("#own_offer_form").find("input[name='multi']").val(aa);
			balance();
			var m = m-aa;
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+m+"/"+n+"");
			var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			$("#res_sell_stone").click();
			$("#res_buy_iron").click();
			if(m < cc){
				$("#own_offer_form").find("input[name='multi']").val(m);
				balance();
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html("0/"+n+"");
			}else if(m > cc){
				$("#own_offer_form").find("input[name='multi']").val(cc);
				balance();
				var o = m-cc;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+o+"/"+n+"");
			}
			var ch = $("#production_table").find("tbody").find("input:checked:first");
			ch.after('<img src="/graphic/confirm.png" width="17">');
			ch.remove();
		}else if(AA == undefined && BB == undefined && CC !== undefined){
			$("#res_sell_iron").click();
			$("#res_buy_wood").click();
			$("#own_offer_form").find("input[name='multi']").val(aa);
			balance();
			var m = m-aa;
			$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+m+"/"+n+"");
			var m = $("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").text().split("/")[0]*1;
			$("#res_sell_iron").click();
			$("#res_buy_stone").click();
			if(m < bb){
				$("#own_offer_form").find("input[name='multi']").val(m);
				balance();
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html("0/"+n+"");
			}else if(m > bb){
				$("#own_offer_form").find("input[name='multi']").val(bb);
				balance();
				var o = m-bb;
				$("#production_table").find("tbody").find(":checked:first").parents(".nowrap").find("td:eq(5)").find("a").html(""+o+"/"+n+"");
			}
			var ch = $("#production_table").find("tbody").find("input:checked:first");
			ch.after('<img src="/graphic/confirm.png" width="17">');
			ch.remove();
		}
	}
	function baln(){
		var le = $("#production_table").find("tbody").find(":checked").length;
		for(var j=0; j<le; j++){
			blnc();
		}
	}
	function cncl(){
		var ln = $("#production_table").find("tbody").find(":checked").length;
		$("#production_table").find("tbody").find(":checked").parents(".nowrap").each(function(){
			var villageId = $(this).find("td:eq(1)").find("span:first").attr("data-id").match(/\d+/g)[0];
			var Td = $(this);
			var url = "/game.php?village="+villageId+"&screen=market&mode=own_offer";
			$.ajax({
				url:url,
				datatype:"html",
				success :function(dita){
					var Token = $(dita).find("#own_offer_form").attr("action").match(/([a-z0-9]+)/g)[11];
					$(dita).find("#own_offers_table").find("tr:contains('ساع')").each(function(){
						var w = $(this).find("input:first").attr("name");
						var dota = {};
						dota[w] = "on",dota["delete"] = "حذف";
						$.post("/game.php?village="+villageId+"&mode=own_offer&action=modify_offers&h="+Token+"&screen=market", dota, function(data){
							$(data);
							var Q = $(Td).find("td:eq(5)").find("a").text().split("/")[1]*1;
							$(Td).find("td:eq(5)").find("a").html(""+Q+"/"+Q+"");
							var ch = $("#production_table").find("tbody").find("input:checked:first");
							ch.after('<img src="/graphic/delete_14.png" width="16">');
							ch.remove();
							if($("#production_table").find("tbody").find(":checked").length == 0){
								alert("[ تم إلغاء العروض من السوق ]");
							}
						});
					});
				}
			});
		});
	}
	$("input[value='انشاء']").parent().after('<td><input class="btn btn-confirm-yes" type="submit" value="موازنة" onclick="baln()"></td>');
	$("#MRK").append('<table class="vis" align="left"><tbody><tr><td><input class="btn btn-cancel" type="submit" value="حذف" onclick="cncl()"></td></tr></tbody></table>');
	$("#time").on("blur",function(){
	   localStorage["max_time"] = $(this).val();
	});
	if(localStorage["max_time"]){
		$("#time").val(localStorage["max_time"]);
	}
}
void(0);