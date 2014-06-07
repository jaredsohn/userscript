// ==UserScript==
// @name          KoL: Missing Bones List
// @description   Generates a list of which dusty animal bones you're missing.
// @namespace     http://axisofevil.net/~xtina/
// @include       http://kingdomofloathing.com/inventory.php*
// @include       http://www*.kingdomofloathing.com/inventory.php*
// @include       http://dev.kingdomofloathing.com/inventory.php*
// ==/UserScript==

/*

THIS IS NOT ORIGINALLY MINE.  Original:

http://kol.coldfront.net/thekolwiki/index.php/Greasemonkey#General_2

*/

bones = [
	[776084641, 'dusty animal cranium', true],
	[280207387, 'dusty animal jawbone', true],
	[283592398, 'dusty first cervical vertebra', true],
	[139201842, 'dusty second cervical vertebra', true],
	[199820966, 'dusty third cervical vertebra', true],
	[464464293, 'dusty fourth cervical vertebra', true],
	[572586064, 'dusty fifth cervical vertebra', true],
	[979135235, 'dusty sixth cervical vertebra', true],
	[416359760, 'dusty seventh cervical vertebra', true],
	[677057753, 'dusty first thoracic vertebra', true],
	[136895778, 'dusty second thoracic vertebra', true],
	[674310808, 'dusty third thoracic vertebra', true],
	[871123039, 'dusty fourth thoracic vertebra', true],
	[594276656, 'dusty fifth thoracic vertebra', true],
	[617594616, 'dusty sixth thoracic vertebra', true],
	[326929002, 'dusty seventh thoracic vertebra', true],
	[512207372, 'dusty eighth thoracic vertebra', true],
	[200801789, 'dusty ninth thoracic vertebra', true],
	[410298358, 'dusty tenth thoracic vertebra', true],
	[781458184, 'dusty eleventh thoracic vertebra', true],
	[718700718, 'dusty twelfth thoracic vertebra', true],
	[542968475, 'dusty first lumbar vertebra', true],
	[889729561, 'dusty second lumbar vertebra', true],
	[262250050, 'dusty third lumbar vertebra', true],
	[996934313, 'dusty fourth lumbar vertebra', true],
	[869757769, 'dusty fifth lumbar vertebra', true],
	[735495301, 'dusty sixth lumbar vertebra', true],
	[451506791, 'dusty seventh lumbar vertebra', true],
	[937999144, 'dusty sacral vertebrae', true],
	[538784101, 'dusty first caudal vertebra', true],
	[784458556, 'dusty second caudal vertebra', true],
	[461288025, 'dusty third caudal vertebra', true],
	[822991447, 'dusty fourth caudal vertebra', true],
	[973404628, 'dusty fifth caudal vertebra', true],
	[733675714, 'dusty sixth caudal vertebra', true],
	[884258285, 'dusty seventh caudal vertebra', true],
	[385568430, 'dusty eighth caudal vertebra', true],
	[353909753, 'dusty ninth caudal vertebra', true],
	[795931224, 'dusty tenth caudal vertebra', true],
	[946485920, 'dusty left first rib', true],
	[279163616, 'dusty left second rib', true],
	[248996408, 'dusty left third rib', true],
	[337408241, 'dusty left fourth rib', true],
	[732576450, 'dusty left fifth rib', true],
	[926571171, 'dusty left sixth rib', true],
	[608651199, 'dusty left seventh rib', true],
	[721853940, 'dusty left eighth rib', true],
	[552100663, 'dusty left ninth rib', true],
	[430552699, 'dusty left tenth rib', true],
	[858350968, 'dusty left eleventh rib', true],
	[942223349, 'dusty left twelfth rib', true],
	[805531817, 'dusty right first rib', true],
	[750728373, 'dusty right second rib', true],
	[718204837, 'dusty right third rib', true],
	[598558935, 'dusty right fourth rib', true],
	[296603101, 'dusty right fifth rib', true],
	[309625860, 'dusty right sixth rib', true],
	[916883133, 'dusty right seventh rib', true],
	[265626845, 'dusty right eighth rib', true],
	[596305969, 'dusty right ninth rib', true],
	[764708188, 'dusty right tenth rib', true],
	[965785021, 'dusty right eleventh rib', true],
	[441861408, 'dusty right twelfth rib', true],
	[212834556, 'dusty animal pelvis', true],
	[614645916, 'dusty left scapula', true],
	[510694162, 'dusty right scapula', true],
	[825016770, 'dusty left clavicle', true],
	[728355425, 'dusty right clavicle', true],
	[445561826, 'dusty left humerus', true],
	[361606014, 'dusty right humerus', true],
	[958784528, 'dusty left radius', true],
	[630739594, 'dusty right radius', true],
	[501538567, 'dusty left ulna', true],
	[824684583, 'dusty right ulna', true],
	[873103785, 'dusty left femur', true],
	[255136849, 'dusty right femur', true],
	[739896964, 'dusty left tibia', true],
	[670668492, 'dusty right tibia', true],
	[146567396, 'dusty left fibula', true],
	[756415788, 'dusty right fibula', true],
	[641043300, 'dusty left kneecap', true],
	[533501663, 'dusty right kneecap', true],
	[732612328, 'dusty left first front claw', true],
	[112948970, 'dusty left second front claw', true],
	[674760201, 'dusty left third front claw', true],
	[414848974, 'dusty left fourth front claw', true],
	[422571639, 'dusty right first front claw', true],
	[890112211, 'dusty right second front claw', true],
	[543869177, 'dusty right third front claw', true],
	[817416272, 'dusty right fourth front claw', true],
	[727965358, 'dusty left thumb', true],
	[380550598, 'dusty right thumb', true],
	[634734064, 'dusty left first rear claw', true],
	[555594663, 'dusty left second rear claw', true],
	[849586609, 'dusty left third rear claw', true],
	[526178044, 'dusty left fourth rear claw', true],
	[791073230, 'dusty right first rear claw', true],
	[246691801, 'dusty right second rear claw', true],
	[562758972, 'dusty right third rear claw', true],
	[476588644, 'dusty right fourth rear claw', true],
];
numberfound = 0;
function got(id) {
	for (i = 0; i < bones.length; i++) {
		if (bones[i][0] == id) {
			if (bones[i][2])
				numberfound++;
			bones[i][2] = false;
			return;
		}
	}
}

a = document.getElementById("section131072");
if (!a) return;
b = document.evaluate(".//*[contains(@onclick,'descitem')]", a, null, XPathResult.ANY_TYPE, null);
while (c = b.iterateNext()) {
	matches = c.getAttribute('onclick').match(/\((\d*),/);
	if (!matches) continue;
	id = parseInt(matches[1], 10);
	if (id == 590504391) { // skull counts as both cranium and jawbone
		got(776084641);
		got(280207387);
	} else {
		got(id);
	}
}
d = document.createElement('div');
a.appendChild(d);
d.style.fontSize = "80%";
if (numberfound >= bones.length) {
	d.appendChild(document.createTextNode("You've found all of them!"));
} else {
	ol = document.createElement('ol');
	for (i = 0; i < bones.length; i++) {
		if (bones[i][2]) {
			span = document.createElement('span');
			span.appendChild(document.createTextNode(bones[i][1]));
			span.setAttribute('onclick', "descitem(" + bones[i][0] + ")");
			span.style.fontWeight = 'bolder';
			span.style.cursor = 'pointer';
			li = document.createElement('li');
			li.appendChild(span);
			ol.appendChild(li);
		}
	}
	var x = "You are still missing " + ol.childNodes.length + " bone";
	if (ol.childNodes.length == 1) {
		x += ":";
	} else {
		x += "s:";
	}
	d.appendChild(document.createTextNode(x));
	d.appendChild(ol);
}
