// ==UserScript==
// @name        Plushie Tycoon Sidebar
// @namespace   userscripts.org
// @description Adds Collapsible Sidebar with PT info.
// @include     http://*www.*neopets.com/*
// @exclude	http://www.neopets.com/games/tycoon/index.phtml
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// CHEAP PRICES (based on cat pages)
var $zero = 450; 
var $one = 400;
var $two = 1600;
var $three = 725;

// GRAB CURRENT TIME
function getNST(){
	$nst = $("#nst").text();
	if($("#nst:contains('pm')").length > 0){
		$pm = 1;
	}
	else{
		$pm = 0;
	}
	$nstSplit = $nst.split(":");
	$nstSplit[0] = Number($nstSplit[0]);
	$nstSplit[1] = Number($nstSplit[1]);
	if($pm == 1){
		$nstSplit[0] = $nstSplit[0] + 12;
	}
	return $nstSplit;
}

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.neopets.com/games/tycoon/index.phtml",
  onload: function(response) {
    GM_setValue("cashOnHand",response.responseText);
  }
});

$coh = GM_getValue("cashOnHand");

$start = $coh.indexOf("Cash on Hand: ");
$start = $start + 13;
$end = $coh.indexOf("<p>Plushie Tycoon time");

$cash = $coh.substring($start,$end);

// GET CURRENT PRICE OF CATEGORY
function getPrice(cat){
		$url = "http://www.neopets.com/games/tycoon/materials.phtml?Cat=" + cat;
		GM_xmlhttpRequest({
			method: "GET",
			url: $url,
			onload: function(response) {
				GM_setValue(cat,response.responseText);
		  	}
		});
		var source = GM_getValue(cat);
		//alert(source);
		var cost = source.indexOf("Cost per");
		$start = source.indexOf("<td align='center'><b>",cost);
		$start = $start + 22;
		$end = source.indexOf("</b></td>",$start);
		price = source.substring($start,$end);
		price = price.replace(' NP','');
		price = price.replace(',','');
		return price;
}

// GRAB ALL PRICES
function getAll(){
	var prices = new Array();
	for(i = 0; i < 4; i++){
		prices[i] = getPrice(i);
	}
	return prices;
}

var prices = new Array();
prices = getAll();

var difference = new Array();

if(Math.max(prices[0],$zero) == prices[0]){
	difference[0] = prices[0] - $zero;
}else{
	difference[0] = $zero - prices[0];
}

if(Math.max(prices[1],$one) == prices[1]){
	difference[1] = prices[1] - $one;
}else{
	difference[1] = $one - prices[1];
}

if(Math.max(prices[2],$two) == prices[2]){
	difference[2] = prices[2] - $two;
}else{
	difference[2] = $two - prices[2];
}

if(Math.max(prices[3],$three) == prices[3]){
	difference[3] = prices[3] - $three;
}else{
	difference[3] = $three - prices[3];
}

for(j = 0; j < 4; j++){
	if(j==0){
		if(prices[j] <= $zero){
			prices[j] = "<font color='green'><a href='http://www.neopets.com/games/tycoon/materials.phtml?Cat=0' style='color:green;'>" + getPrice(j) + "</a> (" + difference[j] + "NP under)</font>";
		}else{
			prices[j] = "<font color='red'>" + getPrice(j) + " (" + difference[j] + " NP over)</font>";
		}
	}
	if(j==1){
		if(prices[j] <= $one){
			prices[j] = "<font color='green'><a href='http://www.neopets.com/games/tycoon/materials.phtml?Cat=1' style='color:green;'>" + getPrice(j) + "</a> (" + difference[j] + " NP under)</font>";
		}else{
			prices[j] = "<font color='red'>" + getPrice(j) + " (" + difference[j] + " NP over)</font>";
		}
	}
	if(j==2){
		if(prices[j] <= $two){
			prices[j] = "<font color='green'><a href='http://www.neopets.com/games/tycoon/materials.phtml?Cat=2' style='color:green;'>" + getPrice(j) + "</a> (" + difference[j] + " NP under)</font>";
		}else{
			prices[j] = "<font color='red'>" + getPrice(j) + " (" + difference[j] + " NP over)</font>";
		}
	}
	if(j==3){
		if(prices[j] <= $three){
			prices[j] = "<font color='green'><a href='http://www.neopets.com/games/tycoon/materials.phtml?Cat=3' style='color:green;'>" + getPrice(j) + "</a> (" + difference[j] + " NP under)</font>";
		}else{
			prices[j] = "<font color='red'>" + getPrice(j) + " (" + difference[j] + " NP over)</font>";
		}
	}

}

$(".sidebarModule:last").css("margin-bottom","7px");
$(".sidebar").append('<div class="sidebarModule" style="margin-bottom: 7px;"><table width="158" cellpadding="2" cellspacing="0" border="0" class="sidebarTable"><tr><td valign="middle" class="sidebarHeader medText"><a href="http://www.neopets.com/games/tycoon/index.phtml">Plushie Tycoon</a></td></tr><tr><td class="neofriend" align="center"><b>Cash on Hand:</b> ' + $cash + '<br><b>Cloth:</b> ' + prices[0] + '<br><b>Stuffing:</b> ' + prices[1] + '<br><b>Gems:</b> ' + prices[2] + '<br><b>Packing:</b> ' + prices[3] + '</td></tr></table></div>');

$(".sidebarHeader:contains('Plushie Tycoon')").click(function(){
	$("tr:contains('Cash on Hand'):last").toggle();
});