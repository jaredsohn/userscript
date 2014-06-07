// ==UserScript==
// @name           gw_res
// @namespace      galaxywars
// @include        *galaxywars.de/res.php*
// ==/UserScript==
// dieses script addiert vorhandene resourcen mit den einnahmen und verändert die schriftfarbe der felder "lagerkapazität" und "(davon sicher untergebracht)", 
// falls es in einer definierbaren zeit zu lager-engpässen kommt, bzw. nicht genug sicher untergebracht werden kann.
   
var saveA = 24; // wenn in x stunden die rohstoffmenge größer ist, als sicher untergebracht werden kann, wird die schrift GELB
var saveB = 12; // wenn in x stunden die rohstoffmenge größer ist, als sicher untergebracht werden kann, wird die schrift ORANGE
  // ist die rohstoffmenge bereits größer, ist die schrift automatisch ROT

var lagerA = 100; // wenn in x stunden die rohstoffmenge größer ist, als gelagert werden kann, wird  die schrift ORANGE
var lagerB =  50; // wenn in x stunden die rohstoffmenge größer ist, als gelagert werden kann, wird  die schrift ROT



function resOhnePunkt(ress) {

	if (ress.length > 4) {
		if (ress.length < 8) { //12.000.124
			var res0 = ress.substring(0, ress.length - 4);
			var res1 = ress.substring(ress.length - 3, ress.length);
			return (res0 + res1);
		}else {
			var res0 = ress.substring(0, ress.length - 4);
			var res1 = ress.substring(ress.length - 7, ress.length - 5);
			var res2 = ress.substring(ress.length - 3, ress.length);
			return (res0 + res1 + res2);
		}
	}else {return ress;}
	
}


document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 12].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 11].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 10].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 9].style.background = "#606060";

document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 8].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 7].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 6].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 5].style.background = "#606060";

document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 4].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 3].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 2].style.background = "#606060";
document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 1].style.background = "#606060";

var eisen 		= document.getElementById('res1').textContent;
var lutinum 	= document.getElementById('res2').textContent;
var wasser 		= document.getElementById('res3').textContent;
var wasserstoff = document.getElementById('res4').textContent;

var eisenH 		 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 12].textContent;
var lutinumH 	 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 11].textContent;
var wasserH		 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 10].textContent;
var wasserstoffH = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 9].textContent;

var eisenL 		 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 8].textContent;
var lutinumL 	 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 7].textContent;
var wasserL		 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 6].textContent;
var wasserstoffL = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 5].textContent;

var eisenS		 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 4].textContent;
var lutinumS 	 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 3].textContent;
var wasserS		 = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 2].textContent;
var wasserstoffS = document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 1].textContent;

var eisen 		= resOhnePunkt(eisen);
var lutinum 	= resOhnePunkt(lutinum);
var wasser 		= resOhnePunkt(wasser);
var wasserstoff = resOhnePunkt(wasserstoff);

var eisenH 		 = resOhnePunkt(eisenH);
var lutinumH 	 = resOhnePunkt(lutinumH);
var wasserH 	 = resOhnePunkt(wasserH);
var wasserstoffH = resOhnePunkt(wasserstoffH);

var eisenL 		 = resOhnePunkt(eisenL);
var lutinumL 	 = resOhnePunkt(lutinumL);
var wasserL 	 = resOhnePunkt(wasserL);
var wasserstoffL = resOhnePunkt(wasserstoffL);

var eisenS 		 = resOhnePunkt(eisenS);
var lutinumS 	 = resOhnePunkt(lutinumS);
var wasserS 	 = resOhnePunkt(wasserS);
var wasserstoffS = resOhnePunkt(wasserstoffS);

//alert(wasserstoffL);

// wenn rohstoffe nicht mehr geschützt sind
if ((parseInt(eisen) + (parseInt(eisenH) * parseInt(saveA))) > eisenS) {
	if ((parseInt(eisen) + (parseInt(eisenH) * parseInt(saveB))) > eisenS) {
		if (parseInt(eisen) > parseInt(eisenS)) {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 4].style.color = '#FF0000';
		}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 4].style.color = '#FF9900';
		}
	}else {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 4].style.color = '#FFFF00';
	}
}

if ((parseInt(lutinum) + (parseInt(lutinumH) * parseInt(saveA))) > lutinumS) {
	if ((parseInt(lutinum) + (parseInt(lutinumH) * parseInt(saveB))) > lutinumS) {
		if (parseInt(lutinum) > parseInt(lutinumS)) {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 3].style.color = '#FF0000';
		}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 3].style.color = '#FF9900';
		}
	}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 3].style.color = '#FFFF00';
	}
}

if ((parseInt(wasser) + (parseInt(wasserH) * parseInt(saveA))) > wasserS) {
	if ((parseInt(wasser) + (parseInt(wasserH) * parseInt(saveB))) > wasserS) {
		if (parseInt(wasser) > parseInt(wasserS)) {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 2].style.color = '#FF0000';
		}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 2].style.color = '#FF9900';
		}
	}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 2].style.color = '#FFFF00';
	}
}

if ((parseInt(wasserstoff) + (parseInt(wasserstoffH) * parseInt(saveA))) > wasserstoffS) {
	if ((parseInt(wasserstoff) + (parseInt(wasserstoffH) * parseInt(saveB))) > wasserstoffS) {
		if (parseInt(wasserstoff) > parseInt(wasserstoffS)) {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 1].style.color = '#FF0000';
		}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 1].style.color = '#FF9900';
		}
	}else {
			document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 1].style.color = '#FFFF00';
	}
}


// wenn lager bald voll

if ((parseInt(eisen) + (parseInt(eisenH) * parseInt(lagerA))) > eisenL) {
	if ((parseInt(eisen) + (parseInt(eisenH) * parseInt(lagerB))) > eisenL) {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 8].style.color = '#FF0000';
	}else {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 8].style.color = '#FF9900';
	}
}

if ((parseInt(lutinum) + (parseInt(lutinumH) * parseInt(lagerA))) > lutinumL) {
	if ((parseInt(lutinum) + (parseInt(lutinumH) * parseInt(lagerB))) > lutinumL) {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 7].style.color = '#FF0000';
	}else {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 7].style.color = '#FF9900';
	}
}

if ((parseInt(wasser) + (parseInt(wasserH) * parseInt(lagerA))) > wasserL) {
	if ((parseInt(wasser) + (parseInt(wasserH) * parseInt(lagerB))) > wasserL) {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 6].style.color = '#FF0000';
	}else {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 6].style.color = '#FF9900';
	}
}

if ((parseInt(wasserstoff) + (parseInt(wasserstoffH) * parseInt(lagerA))) > wasserstoffL) {
	if ((parseInt(wasserstoff) + (parseInt(wasserstoffH) * parseInt(lagerB))) > wasserstoffL) {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 5].style.color = '#FF0000';
	}else {
		document.getElementsByTagName('th')[document.getElementsByTagName('th').length - 5].style.color = '#FF9900';
	}
}

var gelb   = document.createElement('p');
var orange = document.createElement('p');
var rot    = document.createElement('p');

gelb.textContent   = "Grenze ist in "+saveA+"/"+lagerA+" Stunden überschritten";
orange.textContent = "Grenze ist in "+saveB+"/"+lagerB+" Stunden überschritten";
rot.textContent    = "Grenze überschritten";

gelb.style.fontFamily   = "arial";
orange.style.fontFamily = "arial";
rot.style.fontFamily    = "arial";

gelb.style.fontWeight   = "bold";
orange.style.fontWeight = "bold";
rot.style.fontWeight    = "bold";

gelb.style.fontSize   = "10pt";
orange.style.fontSize = "10pt";
rot.style.fontSize    = "10pt";

gelb.style.color   = "#D0D000";
orange.style.color = "#D08000";
rot.style.color    = "#D00000";

document.body.appendChild(document.createElement('br'));
document.body.appendChild(gelb);
document.body.appendChild(orange);
document.body.appendChild(rot);
