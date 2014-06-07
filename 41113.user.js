// ==UserScript==
// @name	Itamaram's Hobopolis Clanstash helper
// @namespace	http://itamaram.selfip.com:8621/
// @description	Groups the hobopolis sewer items at the top of the clan stash dropdown box
// @include	http://*kingdomofloathing.com/clan_stash.php
// @include	http://127.0.0.1:60080/clan_stash.php
// ==/UserScript==

//v1.1 fixed fatal bug which made some item not appear in the group.
//(the removal of the element was not necessary. My bad)

//v1.0

var hoboVals = [
	3221,//Gator skin
	3222,//Gatorskin umbrella
	3223,//Sewer nuggets
	3224,//Sewer wad
	3225,//Bottle of sewage schnapps
	3226,//Bottle of Ooze-O
	3227,//C. H. U. M. chum
	3228,//Unfortunate dumplings
	3229,//Decaying goldfish liver
	3230,//Oil of oiliness
];

var table = document.getElementById('additems');
table.addEventListener('DOMNodeInserted',function(){hobosort(table);},true)

hobosort(document.body);

function hobosort(e){
	//loop over all values, if the value is in range, move to group, else nothing
	var cBoxes = e.getElementsByTagName('select');
	for ( var i = 0 ; i < cBoxes.length ; i++){
		if (cBoxes[i].getElementsByTagName('optgroup').length > 0)
			continue;
		var hobgp = document.createElement('optgroup');
		hobgp.label = 'Sewer Items';
		var usegp = false;
		var ops = cBoxes[i].getElementsByTagName('option');
		for ( var j = 0 ; j < ops.length ; j++){
			if(ops[j].value >= 3221 && ops[j].value <= 3231){
				usegp = true;
				hobgp.appendChild(ops[j]);
				j-=1;
			} 	
		}
		if(usegp){
			if (ops[0].value == 0 && ops.length > 1)
				cBoxes[i].insertBefore(hobgp, ops[0].nextSibling)
			else if (ops[0].value == 0 && ops.length == 1)
				cBoxes[i].appendChild(hobgp);
			else
				cBoxes[i].insertBefore(hobgp, cBoxes[i].firstChild)
		}
	}	
}