// ==UserScript==
// @name          TravianT4 Master Tools
// @namespace     http://albertomonteiro.net
// @description   Adiciona funcionalidades extras para o Travian
// @author        Alberto Monteiro
// @include       http://ts*.travian.*/*
// @include       http*://ts*.travian.*/*
// @exclude       http://ts*.travian.*/manual.php*
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.min.js
// ==/UserScript==
/// <reference path="jquery-16min.js" />
/// <reference path="jquerymin.js" />

var http = window.location.protocol;
var myHome = window.location.toString();
if (myHome.indexOf("a2b.php?d=") != -1) {
    document.getElementsByTagName("form")[0].submit()
}

if (window.location.pathname == '/allianz.php') {
    var total = 0;
    var totalVil = 0;
    var count = 0;
    $('.hab').each(function (intIndex) {
        total += parseInt($(this).html());
        count++;
    });
    $('.vil').each(function (intIndex) {
        totalVil += parseInt($(this).html());
    });
    $('#member tbody').prepend('<tr><td class="pla">População/Aldeia media</td><td class="hab">' + parseInt(total / count) + '</td><td class="vil">' + parseInt(totalVil / count) + '</td></tr>');
}

if (window.location.pathname == '/statistiken.php') {
	$(function(){
		$.each($(".hover"),function(i,item){
			$(item).find("td.val.lc").html(addCommas(parseInt($(item).find("td.val.lc").html())));
		});
		$('#top10_raiders tbody tr .hl').hide();
		var me = parseInt($('#top10_raiders tbody tr.hl').find("td.val.lc").html().replace(".","").replace(".","").replace(".",""));
		unsafeWindow.console.log(me);
		var last = parseInt($('#top10_raiders tbody tr.hl').prev().find(".val.lc").html().toString().replace(".","").replace(".","").replace(".",""));
		unsafeWindow.console.log(last);
		$('#top10_raiders tbody').append("<tr><td class='empty' colspan='3'></td></tr><tr class='hover'><td class='ra fc'>LoL</td><td class='pla'>Left</td><td class='val lc'>" + addCommas(last - me) + "</td></tr>");
	});
}
var allyes = ["GW NE-NO","CT-SUPER","TCO CT**","TCO CT++","CT**NE","CT TE","CT TTDT","CT-SUPER","CT™®NE","CT.NE","CT KOW","CT EC.NE","CT IR","CT#IR#NE","CT UT4","CTSUPER3","CT_B-BNe","C.T H&G","CTSUPER2","CT SE2","BOPE LG","CTSUPER4","CT™®NE","TCO|neD","TCO|NE","TCO|+NE+","TCO|swD","TCO-SW£","TCO|-SW-","TCO|SE+-","TCO|SE#","TCO|SE*","TCO|SE","TCO|NW","TCO-C*NF","TCO|-NW+","TCO|+&+","D.F.","S.O.F.T³","TCO|*NE*","TCO-NW+","S.O.F.T$","SOFTne 3","S.O.F.Ts","SOFT& AC","SOFT¢ Ac"];

function checkVillageAlly() {
    $("#save").hide();
    var data = { cmd : "viewTileDetails" , x: $("#xCoordInput").val(), y: $("#yCoordInput").val() };
    $.post("http://ts4.travian.com.br/ajax.php?cmd=viewTileDetails", data, function (resposta) {            
        var villageName = $($(resposta.data.html)).find("#village_info tr:first").next().find("a");
        var vName = $.trim(villageName.html());
        $("#raidListSlot h4").html("Adicionar assalto - ").append(villageName);
        if($.inArray(vName, allyes) === -1) {
            $("#save").show();
            document.getElementById("t1").focus();
        }
    });
}

function oi(){
	var sentTrops = [];
	var surviveTrops = [];
	$.each($("#attacker tbody").eq(1).find("td.unit"),function(i,item){ 
		sentTrops[i] = parseInt($.trim($(item).html())); 
		var dead = parseInt($.trim($("#attacker tbody").eq(2).find("td.unit").eq(i).html()));
		surviveTrops[i] = sentTrops[i] - dead;
		$(".carry").text().split('/')
		unsafeWindow.console.log($(".carry").text().split('/')[1]);
	});
}

$(function(){
	if (myHome.indexOf("berichte.php?") != -1) {
		oi();
	}
	if (myHome.indexOf("build.php") != -1 && myHome.indexOf("tt=99") != -1) {
		$(".iReport2").closest(".slotRow").find("td").css("backgroundColor", "#FFE063");		
		$(".iReport3").closest(".slotRow").find("td").css("backgroundColor", "#FF7070");
		var unMarkDangerous = $("<input id='unMarkDangerous' type='checkbox'/>").click(function () { 
			var linha = $(this).closest(".detail").find("table").find(".iReport2,.iReport3").closest(".slotRow");
			linha.find(":checkbox").prop("checked",!$(this).prop("checked"));
			var totalSelecionados = $(".troopSelectionValue .alert");
			var partes = $.trim(totalSelecionados.html()).toString().split("/");
			
			if($(this).prop("checked")) {
				window.total = 0;
				$.each(linha.find(".troopIconAmount"), function (i,item){
					window.total += parseInt($.trim($(item).text()));
				});				
				totalSelecionados.text((parseInt(partes[0]) - window.total)+"/"+partes[1]);
			}
			else {
				totalSelecionados.text((parseInt(partes[0]) + window.total)+"/"+partes[1]);
			}
		});							
		$(".markAll").append(unMarkDangerous).append($("<label for='unMarkDangerous'/>").text("Desmarcar perigosos"));
		$(".iReport2").closest(".lastRaid").click(function() {
			var urlTarget = $(this).find("a").attr("href");
			$.get(urlTarget, function(response) {
				urlTarget = $(response).find(".troopHeadline a").eq(3).attr("href");
				$.get(urlTarget, function(response2) {
					urlTarget = $(response2).find(".a.arrow").eq(1).attr("href");
					$.get(urlTarget, function(response3) {						
						unsafeWindow.console.log(document.snd.t4.value);
						document.snd.t4.value = 3;
						unsafeWindow.console.log(document.snd.t4.value);
						$(response3).find(":radio").val(4);
						urlTarget = $(response3).find("form[name='snd']").attr("action");
						var params = $(response3).find("form[name='snd']").serialize();
						unsafeWindow.console.log(params);
						$.post(urlTarget, params, function(response4){						
							var params2 = $(response4).find("#short_info").parent().serialize();							
							urlTarget = $(response4).find("#short_info").parent().attr("action");
							var params2 = $(response4).find("#short_info").parent().serialize();
							$.post(urlTarget, params2, function(){
								unsafeWindow.console.log("ok");
							});
						});
					});
				});
			});			
		});
	}
	if (myHome.indexOf("hero_inventory.php?add=defBonus") != -1) {
		if($.trim($("div.defBonus").find(".element.points").html()) != 100){
			location.href = $("div.defBonus").find(".element.add a").attr("href");
		}
	}
	
	if (myHome.indexOf("hero_inventory.php?add=power") != -1) {
		if($.trim($("div.power").find(".element.points").html()) != 100){
			location.href = $("div.power").find(".element.add a").attr("href");
		}
	}
	if (myHome.indexOf("hero_inventory.php?add=productionPoints") != -1) {
		if($.trim($("div.productionPoints").find(".element.productionPoints").html()) != 100){
			location.href = $("div.productionPoints").find(".element.add a").attr("href");
		}
	}
	if (myHome.indexOf("hero_inventory.php?add=offBonus") != -1) {
		if($.trim($("div.offBonus").find(".element.offBonus").html()) != 100){
			location.href = $("div.offBonus").find(".element.add a").attr("href");
		}
	}	
});

if (myHome.indexOf("build.php?gid=17&t=4") != -1) {
    $(".res :input").val(2000);
    $(".dropdown.rep").val(3);
    $(".dropdown.dur").change(function () {
        document.getElementById("tradeRouteEdit").submit();
    });    
}

if (myHome.indexOf("build.php?gid=16&tt=99") != -1) {
    $("#target_id").change(function () {
        checkVillageAlly();
    });
    
    var url = myHome;
    $("#edit_form").submit(function () {
        var pastValue = $("#target_id").val();
        var pastValue2 = $("#lid").val();        
        form = this;
        $.post($(this).attr("action"), $(this).serialize(), function (resposta) {
            $.get(url, function (resposta2) {
                var newHtml = $(resposta2).find("#edit_form").html();
                $(form).html(newHtml);
                $("#t6").val(10);
				$("#target_id").change(function () {                    
                    checkVillageAlly();
                });
				var nextVal = $("#target_id option[value="+pastValue+"]").next().attr("value");
                $("#target_id").val(nextVal);
				unsafeWindow.selectCoordinates();                
                document.getElementById("t1").focus();
				$(form).submit();
            });
        });
        return false;
    });
}

//if (window.location.pathname == '/dorf1.php') {
//    var elements = [];
//    $(".level").each(function (index) {
//        elements.push($(this));
//    });
//    $("area").each(function (index) {
//        var url = $(this).attr("href");
//        if (index <= 17) {
//            $.get(url, function (resultado) {
//                var can = $(resultado).find("#contract .contractLink button").html();
//                if (can == null)
//                    elements[index].css("color", "red").css("font-weight", "bold");
//                else
//                    elements[index].css("color", "green").css("font-weight", "bold");
//            });
//        }
//    });
//}

$(".details").each(function (index) {
    var total = GetNeededTotalResources(this);
    var totalTotal = GetActualTotalResource();
    $(this).find(".showCosts").append("<span style='margin:10px;'>Total Recursos: " + totalTotal + " - Total Unidade: " + total + " - Pode fazer: " + parseInt(totalTotal / total) + "</span>");
});


//Helper Functions
function GetNeededTotalResources(parent) {
    return GetNeededResourcesMadeira(parent) + GetNeededResourcesBarro(parent) + GetNeededResourcesFerro(parent) + GetNeededResourcesCereal(parent);
}

function GetNeededResourcesMadeira(parent) {
    return parseInt($(parent).find(".resources.r1").text());
}

function GetNeededResourcesBarro(parent) {
    return parseInt($(parent).find(".resources.r2").text());
}

function GetNeededResourcesFerro(parent) {
    return parseInt($(parent).find(".resources.r3").text());
}

function GetNeededResourcesCereal(parent) {
    return parseInt($(parent).find(".resources.r4").text());
}

function GetActualTotalResource() {
    return GetActualResourceMadeira() + GetActualResourceBarro() + GetActualResourceFerro() + GetActualResourceCereal();
}

function GetActualResourceMadeira() {
    return parseInt($("#l1").text().substr(0, $("#l1").text().indexOf('/')));
}

function GetActualResourceBarro() {
    return parseInt($("#l2").text().substr(0, $("#l2").text().indexOf('/')));
}

function GetActualResourceFerro() {
    return parseInt($("#l3").text().substr(0, $("#l3").text().indexOf('/')));
}

function GetActualResourceCereal() {
    return parseInt($("#l4").text().substr(0, $("#l4").text().indexOf('/')));
}

//Fast Links
$("#side_info").append("<div class='listing' id='villageList'><div class='head'><a href='#'>Links rápidos</a></div><div class='list'><ul id='fastLinks'></ul></div><div class='foot' /></div>");
$("#fastLinks").append("<li><a class='active' href='" + http + "//ts4.travian.com.br/build.php?gid=19'>Quartel</a></li>");
$("#fastLinks").append("<li><a class='active' href='" + http + "//ts4.travian.com.br/build.php?gid=20'>Cavalaria</a></li>");
$("#fastLinks").append("<li><a id='getTotalTrops' class='active' href='#'>Get Total Trops</a></li>");
if (window.location.pathname == '/warsim.php') {
    $("#fastLinks").append("<li><a id='fillWarSimWithtTotalTrops' class='active' href='#'>Fill with full trops</a></li>");
    $("#fastLinks").append("<li><a id='fillWarSimVillage' class='active' href='#'>Fill village Info</a></li>");
    $("#fastLinks").append("<li><a id='fillWarSimHero' class='active' href='#'>Fill hero Info</a></li>");
}

$(function () {
    $("#getTotalTrops").click(function () {
        var retorno = GetDetailsOfTroopsOffVilage(showFastTroops);
        showFastTroops(retorno);
    });

    $("#fillWarSimWithtTotalTrops").click(function () {
        var retorno = GetDetailsOfTroopsOffVilage(showFastTroops);
        var i = 0;
        for (; i < 10; i++) {
            $("input[name=a1_" + (i + 1) + "]").val(retorno[i]);
        }
    });

    $("#fillWarSimVillage").click(function () {
        var vilas = getAllVilagesFromPlayer();
        $.each(vilas, function (i, item) {
            if (item.nome == $("#villageNameField").text()) {
                $("input[name=ew1]").val(item.habitantes);
            }
        });
    });

    $("#fillWarSimHero").click(function () {
        var hero = getHeroInformation();
        $("input[name=h_off_bonus]").val(hero.bonusOfensivo);
        $("input[name=h_power]").val(hero.forca);
    });
});

function getHeroInformation() {
    var hero = { forca: 0, bonusOfensivo: 0, bonusDefensivo: 0, Recursos: 0, Vida: 0, Xp: 0, Level: 0 };
    $.ajax({
        url: 'hero_inventory.php',
        async: false,
        success: function (resultado) {
            hero.forca = Trim($(resultado).find(".attribute.power.tooltip").find(".element.current.power").html());
            hero.bonusOfensivo = Trim($(resultado).find(".attribute.offBonus.tooltip").find(".element.current.power").text().replace("%", ""));
            hero.bonusDefensivo = Trim($(resultado).find(".attribute.offBonus.tooltip").find(".element.current.power").text().replace("%", ""));
            hero.Recursos = Trim($(resultado).find(".attribute.productionPoints.tooltip").find(".element.current.power").text());
            hero.Vida = Trim($(resultado).find(".attribute.health.tooltip").find(".element.current.power span").text());
            hero.Xp = Trim($(resultado).find(".attribute.experience.tooltip").find(".element.current.power").text());
            hero.Level = Trim($(resultado).find(".attribute.level.tooltip").find(".element.current.power").text());
        },
        dataType: 'html'
    });
    return hero;
}

function getPerfilLink() {
    return $(".sideInfoPlayer a").attr("href");
}

function getAllVilagesFromPlayer() {
    vilages = [];
    $.ajax({
        url: getPerfilLink(),
        async: false,
        success: function (resultado) {
            villagesDetails = $(resultado).find("#villages");
            villagesDetails.find("tbody tr").each(function () {
                var nome = $(this).find(".name").text();
                var habitantes = $(this).find(".inhabitants").text();
                vilages.push({ nome: Trim(nome.replace("(Capital)", "")), habitantes: Trim(habitantes) });
            });
        },
        dataType: 'html'
    });
    return vilages;
}

//Fast Troops
function showFastTroops(totalDeTropas) {
    var race = WhatsMyRace();
    var imagesAlias = [race + 1, race + 2, race + 3, race + 4, race + 5, race + 6, race + 7, race + 8, race + 9, race + 10];
    $("#side_info").append("<div class='listing' id='villageList'><div class='head'><a href='#'>Tropas</a></div><div class='list'><ul id='fastTroops'></ul></div><div class='foot' /></div>");
    var i = 0;
    for (; i < 10; i++)
        $("#fastTroops").append('<li><img class="unit u' + imagesAlias[i] + '" src="img/x.gif"> ' + totalDeTropas[i] + '</li>');
    $("#fastTroops").append('<li><img class="unit uhero" src="img/x.gif"> ' + totalDeTropas[i] + '</li>');
}

function WhatsMyRace() {
    var iam = 0;
    switch ($(".sideInfoPlayer img").attr("alt")) {
        case "Romanos": iam = 0; break;
        case "Teutões": iam = 10; break;
        default: iam = 20; break;
    }
    return iam;
}

function GetDetailsOfTroopsOffVilage() {
    var totalDeTropas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $.ajax({
        url: http + '//ts4.travian.com.br/build.php?id=39&k',
        async: false,
        success: function (resultado) {            
            var troopDetails = $(resultado).find(".troop_details");
            var vilageName = $("#villageNameField").text();
            troopDetails.each(function (index) {
                var ownVilage = $(this).find("thead .role a").text() == vilageName;
                units = $(this).find(".units.last");
                units.each(function (index2) {
                    var unit = $(this).find(".unit");
                    unit.each(function (index3) {
                        if (ownVilage)
                            totalDeTropas[index3] += parseInt($(this).text());
                    });
                });
            });
            var did = ActualVillageId();
            $.ajax({        
                url: http + '//ts4.travian.com.br/ajax.php?cmd=loadTroopsOnTheWay',
                async: false,
                method: "POST",
                data: { cmd:"loadTroopsOnTheWay", qid:1, limit:"-1", offset:0, fromOrTo:"to", timer:20, did: did},
                success: function (resultado2) {
                    var troopDetails = $(resultado2.data.troopHtml);                    
                    var troopDetails = $(troopDetails);
                    var vilageName = $("#villageNameField").text();
                    troopDetails.each(function (index) {
                        var ownVilage = $(this).find("thead .role a").text() == vilageName;
                        units = $(this).find(".units.last");
                        units.each(function (index2) {
                            var unit = $(this).find(".unit");
                            unit.each(function (index3) {
                                if (ownVilage)
                                    totalDeTropas[index3] += parseInt($(this).text());
                            });
                        });
                    });
                },
                dataType: 'json'
            });
            $.ajax({        
                url: http + '//ts4.travian.com.br/ajax.php?cmd=loadTroopsOnTheWay',
                async: false,
                method: "POST",
                data: { cmd:"loadTroopsOnTheWay", qid:1, limit:"-1", offset:0, fromOrTo:"from", timer:20, did: did },
                success: function (resultado2) {
                    var troopDetails = $(resultado2.data.troopHtml);                    
                    var troopDetails = $(troopDetails);
                    var vilageName = $("#villageNameField").text();
                    troopDetails.each(function (index) {
                        var ownVilage = $(this).find("thead .role a").text() == vilageName;
                        units = $(this).find(".units.last");
                        units.each(function (index2) {
                            var unit = $(this).find(".unit");
                            unit.each(function (index3) {
                                if (ownVilage)
                                    totalDeTropas[index3] += parseInt($(this).text());
                            });
                        });
                    });
                },
                dataType: 'json'
            });
        },
        dataType: 'html'
    });
    return totalDeTropas;
}

function ActualVillageId(){
    return $("#villageList a.active").attr("href").replace("?newdid=","").replace("&id=1","");
}

function Trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}


/*
var romanTroops = [];

100		,100	,120	,65		,50,14,3};//Equites imperatoris
800		,180	,70		,180	,80,105,10,4};//Equites cesaris
500		,70		,0		,60		,30,75,4,3};//Areite
600		,90		,0		,75		,60,10,3,6};//Catapulta de fogo
45000	,37500	,0		,50		,40,30,4,5};//Senador
7200	,5500	,3000	,0		,80,80,5,1};//Colono

romanTroops[1]  = {madeira:120,		barro:100,	ferro:150,	cereal:30,	 carregamento:50,	ataque:40,  defInfantaria:35,	defCavalaria:50,qdrPorHora:6, consumo:1};
romanTroops[2]  = {madeira:100,		barro:130,	ferro:160,	cereal:70,	 carregamento:20,	ataque:30,	defInfantaria:65,	defCavalaria:35,qdrPorHora:5, consumo:1};
romanTroops[3]  = {madeira:150,		barro:160,	ferro:210,	cereal:80,	 carregamento:50,	ataque:70,	defInfantaria:40,	defCavalaria:25,qdrPorHora:7, consumo:1};
romanTroops[4]  = {madeira:140,		barro:160,	ferro:20,	cereal:40,	 carregamento:0,	ataque:0,	defInfantaria:20,	defCavalaria:10,qdrPorHora:16,consumo:2};

romanTroops[5]  = {madeira:550,		barro:320,	ferro:290,	cereal:75,	 carregamento:110,	ataque:55,	defInfantaria:100,	defCavalaria:40,qdrPorHora:10,consumo:2};
romanTroops[6]  = {madeira:550,		barro:640,	ferro:480,	cereal:80,	 carregamento:80,	ataque:150,	defInfantaria:50,	defCavalaria:75,qdrPorHora:9, consumo:3};
romanTroops[7]  = {madeira:900,		barro:360,	ferro:350,	cereal:70,	 carregamento:0,	ataque:65,	defInfantaria:30,	defCavalaria:80,qdrPorHora:4, consumo:3};
romanTroops[8]  = {madeira:950,		barro:1350,	ferro:600,	cereal:60,	 carregamento:0,	ataque:50,	defInfantaria:60,	defCavalaria:10,qdrPorHora:3, consumo:6};
romanTroops[9]  = {madeira:30750,	barro:27200,ferro:25000,cereal:27200,carregamento:0,	ataque:40,	defInfantaria:60,	defCavalaria:40,qdrPorHora:4, consumo:4};
romanTroops[10] = {madeira:5800,	barro:5300,	ferro:5800,	cereal:6500, carregamento:3000,	ataque:10,	defInfantaria:80,	defCavalaria:80,qdrPorHora:5, consumo:1};
*/
var teutonsTroops = [];
teutonsTroops[11] = {madeira:95,	barro:75,	ferro:40,	cereal:40,	 carregamento:60,	ataque:40,  defInfantaria:20,	defCavalaria:5,	qdrPorHora:7,	consumo:1};
teutonsTroops[12] = {madeira:145,	barro:70,	ferro:85,	cereal:40,	 carregamento:40,	ataque:10,	defInfantaria:35,	defCavalaria:60,qdrPorHora:7,	consumo:1};
teutonsTroops[13] = {madeira:130,	barro:120,	ferro:170,	cereal:70,	 carregamento:50,	ataque:60,	defInfantaria:30,	defCavalaria:30,qdrPorHora:6,	consumo:1};
teutonsTroops[14] = {madeira:160,	barro:100,	ferro:50,	cereal:50,	 carregamento:0,	ataque:0,	defInfantaria:10,	defCavalaria:5,	qdrPorHora:9,	consumo:1};
teutonsTroops[15] = {madeira:370,	barro:270,	ferro:290,	cereal:75,	 carregamento:110,	ataque:55,	defInfantaria:100,	defCavalaria:40,qdrPorHora:10,	consumo:2};
teutonsTroops[16] = {madeira:450,	barro:515,	ferro:480,	cereal:80,	 carregamento:80,	ataque:150,	defInfantaria:50,	defCavalaria:75,qdrPorHora:9,	consumo:3};
teutonsTroops[17] = {madeira:1000,	barro:300,	ferro:350,	cereal:70,	 carregamento:0,	ataque:65,	defInfantaria:30,	defCavalaria:80,qdrPorHora:4,	consumo:3};
teutonsTroops[18] = {madeira:900,	barro:1200,	ferro:600,	cereal:60,	 carregamento:0,	ataque:50,	defInfantaria:60,	defCavalaria:10,qdrPorHora:3,	consumo:6};
teutonsTroops[19] = {madeira:35500,	barro:26600,ferro:25000,cereal:27200,carregamento:0,	ataque:40,	defInfantaria:60,	defCavalaria:40,qdrPorHora:4,	consumo:4};
teutonsTroops[20] = {madeira:7200,	barro:5500,	ferro:5800,	cereal:6500, carregamento:3000,	ataque:10,	defInfantaria:80,	defCavalaria:80,qdrPorHora:5,	consumo:1};
/*
var gaulsTroops = [];
gaulsTroops[21] = {100,130,55,30,35,15,40,50,7,1};//Phalanx
gaulsTroops[22] = {140,150,185,60,45,65,35,20,6,1};//Swordsman
gaulsTroops[23] = {170,150,20,40,0,0,20,10,17,2};//Pathfinder
gaulsTroops[24] = {350,450,230,60,75,90,25,40,19,2};//Theutates thunder
gaulsTroops[25] = {360,330,280,120,35,45,115,55,16,2};//Druidrider
gaulsTroops[26] = {500,620,675,170,65,140,50,165,13,3};//Haeduan
gaulsTroops[27] = {950,555,330,75,0,50,30,105,4,3};//Ram
gaulsTroops[28] = {960,1450,630,90,0,70,45,10,3,6};//TrebgaulsTroopshet
gaulsTroops[29] = {30750,45400,31000,37500,0,40,50,50,5,4};//Chieftain
gaulsTroops[30] = {5500,7000,5300,4900,3000,0,80,80,5,1};//Settler
*/

function addCommas(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}