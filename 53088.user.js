// ==UserScript==
// @name				Markt offers aanmaken
// @author				Laoujin / De Goede Fee
// @namespace			
// @description			
// @include			http://nl*.tribalwars.nl/game.php?*screen=market&mode=own_offer*
// ==/UserScript==

  // De configuratie:
  var sell_for = 1000;
  var buy_for = 1000;
  var tijd = 30;
  var aantalKeer = 110;
  
  var useConfig = false;
  // Bij useConfig=true wordt sell voor buy geruild
  var sell = 'leem';  // gebruik leem / hout / ijzer
  var buy = 'ijzer';
  
  // Bij useConfig=false worden de grondstoffen in het dorp bekeken
  // en als het verschil meeste - minste groter is dan minVerschil
  // wordt dat aanbod * offersCoef op de markt gezet
  var minVerschil = 75000;
  var offersCoef = new Array();
  offersCoef[0] = 0.5; // coef wanneer we hout verkopen
  offersCoef[1] = 0.5; // coef wanneer we leem verkopen
  offersCoef[2] = 0;	 // ijzer - ie niemand neemt een ijzer voor leem offer aan :)
  
  if (document.documentElement.innerHTML.indexOf('Ter beschikking gesteld') == -1) {
	  var reg = /Maximale transporthoeveelheid\s(\d*)/
	  var setOffer = true;
	  
	  var regexResult;
    if (regexResult = reg.exec(document.documentElement.innerHTML))
  	{
	  	var merchants;
	  	if (aantalKeer > Math.floor(regexResult[1] / buy_for))
	  		aantalKeer = Math.floor(regexResult[1] / buy_for);
		  
		  if (!useConfig) {
			  var res = new Array();
			  res[0] = document.getElementById('wood').innerHTML;
			  res[1] = document.getElementById('stone').innerHTML;
			  res[2] = document.getElementById('iron').innerHTML;
			  
			  var resExplain = new Array();
			  resExplain[0] = 'wood';
			  resExplain[1] = 'clay';
			  resExplain[2] = 'iron';
			  
			  var i;
			  var meeste = 0;
			  var minste = 400000;
			  for (i = 0; i < 3; i++) 
			  {
			  	if (res[i] * 1 > meeste) { meeste = res[i]; meesteIndex = i; }
			  	if (res[i] * 1 < minste) { minste = res[i]; minsteIndex = i; }
			  }
			  if (meeste - minste > minVerschil)
			  {
			  	sell = resExplain[meesteIndex];
			  	buy = resExplain[minsteIndex];
			  	
			  	merchants = Math.floor(((meeste - minste) * offersCoef[meesteIndex]) / buy_for);
			  }
			  else setOffer = false;
		  }
		  else {
		  	merchants = aantalKeer;
		  }
		  if (merchants > aantalKeer) merchants = aantalKeer;
		  
		  if (setOffer && merchants > 0) {
			  if (sell == 'leem' || sell == 'clay') sell = 'res_sell_stone';
			  if (sell == 'hout' || sell == 'wood') sell = 'res_sell_wood';
			  if (sell == 'ijzer' || sell == 'iron') sell = 'res_sell_iron';
			  if (buy == 'leem' || buy == 'clay') buy = 'res_buy_stone';
			  if (buy == 'hout' || buy == 'wood') buy = 'res_buy_wood';
			  if (buy == 'ijzer' || buy == 'iron') buy = 'res_buy_iron';  
		
		  	document.getElementsByName('multi')[0].value = merchants;
			  
			  document.getElementById(buy).checked = true;
			  document.getElementById(sell).checked = true;
			  
			  document.getElementsByName('max_time')[0].value = tijd;
			  document.getElementsByName('sell')[0].value = sell_for;
			  document.getElementsByName('buy')[0].value = buy_for;
			  
			  submitForm();
  }}}
  
  function submitForm() { var candidates = document.getElementsByTagName("input"); var t; for (t = 0; t < candidates.length; t++) { if (candidates[t].type == "submit") { break; } } candidates[t].click(); }
