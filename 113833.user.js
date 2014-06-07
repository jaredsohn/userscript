// ==UserScript==// @name KingsAge : Auto troop script

// @namespace http://userscripts.org/scripts/admin/62078

// @description Auto update units in village

// @date 2009-11-16
// @creator retnug

// @include http://*.kingsage.*/game.php?village=*&s=build_barracks&m=recruit
// @include http://*.kingsage.it/game.php?a=login*
// @include http://www.upandgo.org/trooper.js
// @exclude

// ==/UserScript==
(
function(){

	var table
;
	var table2;

	var titile;	var split_title;

	var settlement;

	var split_settlement;

	var username;

	var name_village;

	var i;

	var j;	var text;	var voiska;

	var voiski = new Array(10);

	var temp_voiski;

	var x;

	var y;

	
	title = document.getElementsByTagName('title');
	text = title[0].textContent;

	split_title = text.split(' - ');
	username = split_title[1];
	name_village = split_title[2];

	settlement = document.getElementById('settlement');
	text = settlement.textContent;
	split_settlement = text.split('|');
	x = split_settlement[0];
	y = split_settlement[1];


	table2 = document.getElementsByTagName('form');
	table = table2[0].getElementsByTagName('span');
	j=1;

	for (i=0; i<table.length; i++){

		text = table[i].textContent;

		text = text.replace(".","","gi");

		
		if (text.search("/") != -1) {
			temp_voiski = text.split(' / ');
			voiski[j]=temp_voiski[1];j=j+1;
	 	}
else {
			if (text.length > 30) {
				voiski[j]=0;
				j=j+1;
			} 
		}
  	
	}

	
	for (i=j; i<11; i++){
		voiski[i]=0;
	}

	voiska = username + "|" + name_village + "|" + x + "|" + y + "|";


	for (i=1; i<11; i++){
		voiska=voiska+voiski[i];
		 voiska=voiska+"|";
	}


	table2 = document.getElementsByTagName('table');

	table = table2[24].getElementsByTagName('tr');	
	var oLink = document.createElement("td");


	oLink.innerHTML = "<a href='http://kings.x10hosting.com/auto_update.php?voiska="+voiska+"' target='_blank'><b>UPDATE NEL SERVER!</b></a>";

			oLink.title = "Update";

			table[0].appendChild(oLink);

	
}

)()