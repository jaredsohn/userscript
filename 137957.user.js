// ==UserScript== 
// @name Pimp My e-Sim
// @version 1.8
// @author secura   Krisko
// @namespace http://localhost 
// @include http://primera.e-sim.org*
// @include http://secura.e-sim.org*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript== 


// ---- SETTINGS ---- //
// Influence Calculator
var hits = 120;
var MUbonus = 1.15;
var Lbonus = 1.2;
// MU link
var MUid = "132";
// ---- SETTINGS END ---- //


GM_addStyle("body { background: url(http://www.erepublik.com/images/modules/ambients/external/bg.jpg) no-repeat top center !important; } .header { position:relative; width:990px; height:100px; margin:-10px auto 20px;} .SearchBar { position:absolute; background-color:#fff; border-radius:5px 5px 5px 5px !important; padding:10px 3px 3px 5px; top:20px; right:0px; box-shadow:0 0 7px 7px rgba(20, 20, 20, 0.4);} .SearchBar br { display:none; } .SearchBar td { position:relative !important; width: 250px; background:none transparent !important; } .SearchBar a { margin:0px 0px 0px 65px !important; } .SearchBar td img { margin:-6px 10px 0px 0px !important; } .SearchBar td b { margin:0px 7px 0px 0px !important; } .SearchBar .mShaded { width:100%; } #searchForm { width: 200px !important; } #logo { width:300px; height:100px; } #logo img { margin:7px auto auto; } /* .rightTabGrey { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/tabRightGrey.png') no-repeat scroll right top transparent !important; } .leftTabGrey { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/tabLeftGrey.png') no-repeat scroll left top transparent !important; padding-top:5px !important; } .rightTabBlue { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/tabRight.png') no-repeat scroll right top transparent !important; } .leftTabBlue { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/tabLeft.png') no-repeat scroll left top transparent !important; padding-top:5px !important; }*/ .miniContent { width:349px; border:1px solid #85acd5; background: #f0f0f0 !important; margin:0px; padding:5px 4px 5px 5px !important; } .littleDashedLine { border-top:1px solid white; border-bottom:1px solid #AAA; } .dashedLine { border-bottom:2px solid #AAA; } .shout2 { margin-bottom:7px !important; } /*.fightIcon, .crossIcon, .workIcon, .trainIcon { background:none !important; text-indent:0px !important; text-align:center !important; } a.button { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/button2.jpg') no-repeat scroll 0px 0px !important; text-shadow:0 -1px 0 #A63301 !important; font-weight:bold !important; font-size:14px !important; line-height:28px !important; color: #fff !important; margin-top:10px !important; } a.button:hover { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/button2.jpg') no-repeat scroll 0px -36px !important; line-height:32px !important; } #userMenu { width:183px !important; border-radius:5px 5px 5px 5px !important; border:1px solid black !important; } #userMenu a.button { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/button2_blue-1.png') no-repeat scroll 0px 0px !important; text-shadow:0 -1px 0 #666 !important; font-weight:bold !important; font-size:14px !important; line-height:35px !important; color: #fff !important; margin-top:10px !important; } #userMenu a.button:hover { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/button2_blue-1.png') no-repeat scroll 0px -36px !important; } .smallArticleTab{ background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/artTabSmall.png') repeat scroll 0 0 transparent !important; color:white !important; text-shadow:0 -1px 0 #666 !important; } .bigArticleTab { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/artTab.png') repeat scroll 0 0 transparent !important; color:white !important; text-shadow:0 -1px 0 #666 !important; } #voteButton { margin-top:7px !important; } #subButton { margin-top:-1px !important; } .smallHeader { margin-top:10px !important; }*/ #battleBar { border-radius:2px !important; border:1px solid #999; } .BattleScore img { border:none!important; } .AtackerBarEdge { background: url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/battleBarAttackerEdge.png') !important; } .AtackerBar { background: url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/battleBarAttacker.png') !important; } .DefenderBarEdge { background: url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/battleBardefenderEdge.png') !important; } .DefenderBar { background: url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/battleBardefender.png') repeat scroll 0% 0% transparent !important; } #defenderPercent { color:white !important; }/* .productList { margin-bottom:10px; } .productList input { display:block; float:left; margin:6px 4px 0px 4px; } .productList label { display:block; float:left; clear:right; margin-top: 5px; } */.DailyOrder { background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/DO.png') no-repeat scroll 0px 0px !important; padding:19px 0px 0px 15px; color:#DDD; margin-left:9px; } .DailyOrder a { color:#FFF !important; text-shadow:0 -1px 0 #000 !important; text-decoration:inherit !important; } .DailyOrder a:hover { color:#fff !important; text-shadow:0px 0px 5px #000 !important; } .DailyOrder center b { margin-left: -46px; } h1 { text-shadow:none !important; } h2 { text-shadow:none !important; } /*.ProfileLink { display:block; clear:right; text-align:center; vertical-align:text-bottom; background-color:red;} .voteIcon { background: none !important;} .storageMini{background:url('http://i1169.photobucket.com/albums/r510/proxyboy/Used/storageMini.png') no-repeat scroll 0px 0px !important;}  .storageMini>div:first-child{background:none !important; color:#fff;} .storageMini>div:nth-child(2){background:none !important;} */.InflContainer{ position:relative; float:left; height:30px; margin:-7px 10px 0px 0px; line-height:30px;} .InfluenceCalculator{margin-top:14px; } .MUlink { position:absolute; left:-1px; top:-1px; padding:5px 11px 5px 8px; background-color:#191919; border-radius:0 0 5px 0; color:#FFF; } .MU a,.MU a:active,.MU a:visited { color:#fff; font-weight:bold; } .MU a:hover{ color:#DDD; } #userMenu:hover{ background-color:#191919 !important; } .plate {position:relative !important; } ");

var rank = new Array;
rank['Rookie'] = 1.00;
rank['Private'] = 1.10;
rank['Private First Class'] = 1.20;
rank['Corporal'] = 1.30;
rank['Sergeant'] = 1.40;
rank['Staff Sergeant'] = 1.50;
rank['Sergeant First Class'] = 1.60;
rank['Master Sergeant'] = 1.65;
rank['First Sergeant'] = 1.70;
rank['Sergeant Major'] = 1.75;
rank['Command Sergeant Major'] = 1.80;
rank['Sergeant Major of the Army'] = 1.85;
rank['Second Lieutenant'] = 1.90;
rank['First Lieutenant'] = 1.93;
rank['Captain'] = 1.96;
rank['Major'] = 2.00;
rank['Lieutenant Colonel'] = 2.03;
rank['Colonel'] = 2.06;
rank['Brigadier General'] = 2.10;
rank['Major General'] = 2.12;
rank['Lieutenant General'] = 2.14;
rank['General'] = 2.16;
rank['General of the Army'] = 2.18;
rank['Marshall'] = 2.20;
rank['Field Marshall'] = 2.22;
rank['Supreme Marshall'] = 2.24;
rank['Generalissimus'] = 2.26;

function dmgCalc(militaryRank, strength, weaponPower, fights) {
  return Math.floor(militaryRank*strength*weaponPower*fights);
}

// Seperate Numbers
function digits (number) { 
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
}

function Hits(){
	hits = $("#HITS").val();
	MUbonus = $("#MUb").val();
	Lbonus = $("#Lb").val();
	$('.InfluenceCalculator').remove(); //so they dont stack
	Main(hits);
	$("#HITS").attr("value",hits);
	$("#MUb").attr("value",MUbonus);
	$("#Lb").attr("value",Lbonus);
}

function Main(hits){
var str = $('.smallTableFont tr:eq(4) td:eq(1) b').text().trim();
var mRank = $('.smallStatsLabel b:eq(0)').text().trim();
	
$('.medal').parent().parent().after('<div class="testDivblue InfluenceCalculator" style="width:500px;"><div class="InflContainer">Hits: <input type="text" id="HITS" value="'+ hits + '" style="width:20px;"></div><div class="InflContainer">MU Bonus: <input type="text" id="MUb" value="'+ MUbonus + '" style="width:20px;"></div><div class="InflContainer">Location Bonus: <input type="text" id="Lb" value="'+ Lbonus + '" style="width:20px;"></div><div class="InflContainer" style="clear:left;"><b>Unarmed:</b> '+digits(Math.floor(dmgCalc(rank[mRank], str, 0.5, hits)*MUbonus*Lbonus))+'</div><div class="InflContainer"><b>Q1:</b> '+digits(Math.floor(dmgCalc(rank[mRank], str, 1.2, hits)*MUbonus*Lbonus))+'</div><div class="InflContainer"><b>Q2:</b> '+digits(Math.floor(dmgCalc(rank[mRank], str, 1.4, hits)*MUbonus*Lbonus))+'</div><div class="InflContainer"><b>Q3:</b> '+digits(Math.floor(dmgCalc(rank[mRank], str, 1.6, hits)*MUbonus*Lbonus))+'</div><div class="InflContainer"><b>Q4:</b> '+digits(Math.floor(dmgCalc(rank[mRank], str, 1.8, hits)*MUbonus*Lbonus))+'</div><div class="InflContainer"><b>Q5:</b> '+digits(Math.floor(dmgCalc(rank[mRank], str, 2.0, hits)*MUbonus*Lbonus))+'</div><div style="clear:both;"></div></div>');
$('#HITS').blur(Hits);
$('#MUb').blur(Hits);
$('#Lb').blur(Hits);
}
Main(hits);

$('table.mainTable:eq(0)').before('<div class="header"><a id="logo" href="http://e-sim.org"><img src="http://i1169.photobucket.com/albums/r510/proxyboy/Used/logo_sim.png"/></a><div class="SearchBar"></div></div>');
$('.shadedTable td:eq(0)').prependTo($('.SearchBar'));
$('table.mainTable:eq(0)').hide();
/*
$('#voteButton').attr("src","http://i1169.photobucket.com/albums/r510/proxyboy/Used/voteButton.png");
$('#subButton').attr("src","http://i1169.photobucket.com/albums/r510/proxyboy/Used/subButton.png");
$('.unsubDiv img').attr("src","http://i1169.photobucket.com/albums/r510/proxyboy/Used/unsubButton.png");
$('.unsubDiv img').attr("style","margin-top:-1px;");
*/
$('#battleBar div:eq(0)').attr("class","AtackerBarEdge");
$('#battleBar div:eq(0)').attr("style","width: 5px; height: 25px; float: right; background: url(http://i1169.photobucket.com/albums/r510/proxyboy/Used/battleBarAttackerEdge.png);");
$('#battleBar div:eq(1)').attr("class","AtackerBar");
$('#battleBar div:eq(2)').attr("class","DefenderBarEdge"); 
$('#battleBar div:eq(3)').attr("class","DefenderBar");
$('#battleBar img:eq(0)').attr("src","http://i1169.photobucket.com/albums/r510/proxyboy/Used/battleBarCenter2.png");
$('.testDivblue:contains("Your military unit orders:")').attr("class","DailyOrder");
$('#battleBar').next().next().next().next().attr("class","BattleScore");
$('#battleBar').next().next().next().next().next().attr("class","BattleScore");

$('.BattleScore img').attr('style',' ');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore0.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore0.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore1.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore1.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore2.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore2.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore3.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore3.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore4.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore4.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore5.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore5.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore6.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore6.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore7.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore7.png');
$('img[src="http://e-sim.home.pl/testura/img/defenderScore8.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/defenderScore8.png');

$('img[src="http://e-sim.home.pl/testura/img/attackerScore0.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore0.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore1.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore1.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore2.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore2.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore3.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore3.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore4.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore4.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore5.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore5.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore6.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore6.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore7.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore7.png');
$('img[src="http://e-sim.home.pl/testura/img/attackerScore8.png"]').attr('src','http://i1169.photobucket.com/albums/r510/proxyboy/Used/attackerScore8.png');


// Total units produced
$('#productivityTable tbody').after('<tr class="Totals"><td>Total units produced:</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
var sum=0;
var tmp = $('#productivityTable tbody tr');
for(var j=2;j<13;j++)//cols
{
	for(var i=1;i<tmp.length;i++)//rols
	{
		sum += Number($('#productivityTable tbody tr:eq('+i+') td:eq('+j+') div:eq(1)').text().slice(1,-1));
	}
	$('#productivityTable .Totals td:eq('+j+')').text(sum.toFixed(2));
	sum=0;
}

// MU link
$('#userMenu .plate:eq(0) div:eq(0)').after('<div class="MU"><a class="MUlink" href="http://secura.e-sim.org/militaryUnit.html?id='+MUid+'">MU</a></div>');