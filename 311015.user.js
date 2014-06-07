// ==UserScript==
// @name       Hattrick Player Page
// @namespace  *
// @version    0.1
// @description  *
// @match      http://*.hattrick.org/Club/Players/*
// @copyright  You
// ==/UserScript==

// id
var id = jQuery('#mainBody h1 .speedBrowser').next().text().replace("(","").replace(")","");
function getPlayerId() { return id; }

// name
var name = jQuery('#mainBody h1').text().trim().replace(" "+jQuery('#mainBody h1 .speedBrowser').next().text(),"");
function getPlayerName() { return name; }

// age
var age = jQuery('#mainBody .byline').text().trim().split(" dias,")[0].replace(" anos e ",".");
function getPlayerAge() { return age; }

// days
var days = jQuery('#mainBody .byline').text().trim().split(" dias,")[0].split(" anos e ")[1];
function getPlayerDays() { return days; }

// years
var years = jQuery('#mainBody .byline').text().trim().split(" dias,")[0].split(" anos e ")[0];
function getPlayerYears() { return years; }

// tsi
var tsi = jQuery('#mainBody .playerInfo td:contains("TSI")').next().text().trim().replace(/[^0-9]/gi, '');
function getPlayerTSI() { return tsi; }

// wage
var wage = jQuery('#mainBody .playerInfo td:contains("Ordenado")').next().text().split(" por")[0].trim();
wage = (wage ? wage : "");
function getPlayerWage() { return wage; }

// speciality
var spec = ""
try{
    spec = jQuery('#mainBody .playerInfo td:contains("Especialidade")').next().text().trim();
} catch(e) {}
function getPlayerSpec() { return spec; }

// exp
var exp = jQuery('#mainBody .playerInfo a:eq(5)').text().split(" (")[1].replace(")","");
function getPlayerExp() { return exp; }

// form
var form = jQuery('#mainBody .playerInfo a:eq(0)').text().split(" (")[1].replace(")","");
function getPlayerForm() { return form; }

// stamina
var stam = jQuery('#mainBody .playerInfo a:eq(1)').text().split(" (")[1].replace(")","");
function getPlayerStam() { return stam; }

// keeper
var keeper = jQuery('#mainBody .mainBox tr:eq(0) a').text().split(" (")[1].replace(")","");
function getPlayerKeeper() { return keeper; }

// playmaking
var pm = jQuery('#mainBody .mainBox tr:eq(2) a').text().split(" (")[1].replace(")","");
function getPlayerPM() { return pm; }

// passing
var pass = jQuery('#mainBody .mainBox tr:eq(4) a').text().split(" (")[1].replace(")","");
function getPlayerPass() { return pass; }

// winger
var wing = jQuery('#mainBody .mainBox tr:eq(3) a').text().split(" (")[1].replace(")","");
function getPlayerWing() { return wing; }

// defending
var def = jQuery('#mainBody .mainBox tr:eq(1) a').text().split(" (")[1].replace(")","");
function getPlayerDef() { return def; }

// scoring
var score = jQuery('#mainBody .mainBox tr:eq(5) a').text().split(" (")[1].replace(")","");
function getPlayerScore() { return score; }

// set pieces
var setp = jQuery('#mainBody .mainBox tr:eq(6) a').text().split(" (")[1].replace(")","");
function getPlayerSP() { return setp; }

// maxSkill
var maxSkill = [getPlayerWing(),getPlayerPM(),getPlayerPass(),getPlayerScore(),getPlayerDef(),getPlayerKeeper(),getPlayerSP()]
var max = parseInt(maxSkill[0]);
var maxIndex = 0;
for (var i = 1; i < maxSkill.length; i++) {
    if (parseInt(maxSkill[i]) > max) {
        maxIndex = i;
        max = parseInt(maxSkill[i]);
    }
}
var skillArray = ["Wing","PM","Pass","Score","Def","Keeper","SP"];
var skill = skillArray[maxIndex];
function getPlayerMaxSkill() { return [skill,max]; }

// player Transfer
$j.post("../Transfers/TransferCompare.aspx?playerId="+id,function(data){
    var prices = $j(data).find('#mainBody tbody tr:contains("€")');
    var medianPrice = 0;
    var avgPrice = 0;
   	var pricesLen = prices.length;
    var price = 0;
    for(var i = 0; i < pricesLen; i++) {
        price = parseInt($j(prices[i]).find("td:contains('€')").text().replace(/\s/g,"").replace("€",""));
        if(i > pricesLen/2) medianPrice = price;
        avgPrice += price/pricesLen;
    }
    medianPrice = (Math.floor(medianPrice/1000)*1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
    avgPrice = (Math.floor(avgPrice/1000)*1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
    
    var selector = "";
    if($j("#ctl00_ctl00_CPContent_CPMain_updBid").length > 0) {
        selector = "#ctl00_ctl00_CPContent_CPMain_updBid";
    } else {
        selector = "#mainBody";
    }
    
    $j(selector).append("<h2 class='compareTransfers'>Comparar Transferências</h2>");
    $j(selector).append("<table id='transfersTable' style='display:none'><tbody id='transfers'></tbody></table>");
    $j("#transfers").append($j(data).find('#mainBody tbody tr:contains("Preço"):contains("Data")'))
    $j("#transfers").append(prices);
    $j("#transfers").append("<tr class='bold'><td colspan=3>Median Price:</td><td class='right'>"+medianPrice+"</td></tr>");
    $j("#transfers").append("<tr class='bold'><td colspan=3>Average Price:</td><td class='right'>"+avgPrice+"</td></tr>");
    $j(selector).append("<br/>");
    $j(selector).find('h2.compareTransfers').css('cursor','pointer').click(function(){
        $j('#transfersTable').toggle();
    })
});

function getPlayerInfo() {

	// id
	var id = jQuery('#mainBody h1 .speedBrowser').next().text().replace("(","").replace(")","")

	// name
	var name = jQuery('#mainBody h1').text().trim().replace(" "+jQuery('#mainBody h1 .speedBrowser').next().text(),"");

	// age
	var age = jQuery('#mainBody .byline').text().trim().split(" dias,")[0].replace(" anos e ",".");

	// tsi
	var tsi = jQuery('#mainBody .playerInfo td:contains("TSI")').next().text().trim().replace(/[^0-9]/gi, '');

	// price
	var price = jQuery('#mainBody #ctl00_ctl00_CPContent_CPMain_txtBid').val();
    price = (price ? price : "");

	// speciality
	var spec = ""
	try{
		spec = jQuery('#mainBody .playerInfo td:contains("Especialidade")').next().text().trim();
	} catch(e) {}

	// exp
	var exp = jQuery('#mainBody .playerInfo a:eq(5)').text().split(" (")[1].replace(")","");

	// form
	var form = jQuery('#mainBody .playerInfo a:eq(0)').text().split(" (")[1].replace(")","");

	// stamina
	var stam = jQuery('#mainBody .playerInfo a:eq(1)').text().split(" (")[1].replace(")","");

	// keeper
	var keeper = jQuery('#mainBody .mainBox tr:eq(0) a').text().split(" (")[1].replace(")","");

	// playmaking
	var pm = jQuery('#mainBody .mainBox tr:eq(2) a').text().split(" (")[1].replace(")","");

	// passing
	var pass = jQuery('#mainBody .mainBox tr:eq(4) a').text().split(" (")[1].replace(")","");

	// winger
	var wing = jQuery('#mainBody .mainBox tr:eq(3) a').text().split(" (")[1].replace(")","");

	// defending
	var def = jQuery('#mainBody .mainBox tr:eq(1) a').text().split(" (")[1].replace(")","");

	// scoring
	var score = jQuery('#mainBody .mainBox tr:eq(5) a').text().split(" (")[1].replace(")","");

	// set pieces
	var setp = jQuery('#mainBody .mainBox tr:eq(6) a').text().split(" (")[1].replace(")","");

	var output = getPlayerId() + ";" + getPlayerName() + ";" + getPlayerAge() + ";";
    output += getPlayerTSI() + ";" + getPlayerSpec() + ";--;";
    output += getPlayerExp() + ";" + getPlayerForm() + ";" + getPlayerStam() + ";";
    output += getPlayerKeeper() + ";" + getPlayerPM() + ";" + getPlayerPass() + ";";
    output += getPlayerWing() + ";" + getPlayerDef() + ";" + getPlayerScore() + ";" + getPlayerSP();
    return output;
}

function getPlayerHeaders() {
    var output = "Id" + ";" + "Name" + ";" + "Age" + ";";
    output += "TSI" + ";" + "Price" + ";" + "Spec" + ";";
    output += "Exp" + ";" + "Form" + ";" + "Stam" + ";";
    output += "Keeper" + ";" + "PM" + ";" + "Pass" + ";";
    output += "Wing" + ";" + "Def" + ";" + "Score" + ";" + "SP";
    return output;
}

unsafeWindow.getPlayerInfo = getPlayerInfo;
unsafeWindow.gpi = getPlayerInfo;
unsafeWindow.getPlayerHeaders = getPlayerHeaders;
unsafeWindow.gph = getPlayerHeaders;

// unsafeWindow
unsafeWindow.getPlayerId = getPlayerId;
unsafeWindow.getPlayerName = getPlayerName;
unsafeWindow.getPlayerAge = getPlayerAge;
unsafeWindow.getPlayerTSI = getPlayerTSI;
unsafeWindow.getPlayerWage = getPlayerWage;
unsafeWindow.getPlayerSpec = getPlayerSpec;
unsafeWindow.getPlayerExp = getPlayerExp;
unsafeWindow.getPlayerForm = getPlayerForm;
unsafeWindow.getPlayerStam = getPlayerStam;
unsafeWindow.getPlayerKeeper = getPlayerKeeper;
unsafeWindow.getPlayerPM = getPlayerPM;
unsafeWindow.getPlayerPass = getPlayerPass;
unsafeWindow.getPlayerWing = getPlayerWing;
unsafeWindow.getPlayerDef = getPlayerDef;
unsafeWindow.getPlayerScore = getPlayerScore;
unsafeWindow.getPlayerSP = getPlayerSP;
unsafeWindow.getPlayerYears = getPlayerYears;
unsafeWindow.getPlayerDays = getPlayerDays;
unsafeWindow.getPlayerMaxSkill = getPlayerMaxSkill;