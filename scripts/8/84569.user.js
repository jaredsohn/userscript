// ==UserScript==
// @name           Carrier Loader
// @namespace      http://whofuckingcares.com
// @include        http://www.war-facts.com/carrier.php
// ==/UserScript==

var button=0;
var contload=0;
var maxships=0;
var loaddesign = GM_getValue("wf_al_design",0);

function setDesign(design) {
	//alert(design.target.name);
	GM_setValue('wf_al_design', design.target.name);
	//alert(loaddesign);
	window.location.reload();
}


var center = document.getElementsByClassName('centerbox');
//alert(center);
var rows = center[0].getElementsByTagName('tr');
//alert(rows);
for (i=0;i<rows.length;i++) {
	//alert(rows[i].innerHTML);
	var shipcheck = rows[i].innerHTML.match(/\#\sships/m);
	//alert(shipcheck);
	if (shipcheck) {
		
		var cols = rows[i].getElementsByTagName('td');
		var inputs = cols[0].getElementsByTagName('input');
		var design = inputs[1].value
		if (design==loaddesign) {
			contload=1;
			maxships = cols[2].innerHTML.match(/\d+/g);
		}
		
		//alert(design);
		var loadbutton = document.createElement('input');
		loadbutton.setAttribute("type", "button");
		loadbutton.setAttribute("value", "AutoLoad");
		loadbutton.setAttribute("name", design);
		//savebutton.setAttribute("onClick", "javascript:save_ae_config(),ae_settings();");
		//ctinp.setAttribute("onclick", "javascript:saveConfigNode();");
		loadbutton.setAttribute("onclick", "button=234;");
		loadbutton.addEventListener("click", setDesign, false);
		cols[2].appendChild(loadbutton);
	}
}
//alert(rows[4].innerHTML);

//cols[2].innerHTML += "<input type='button' value='AutoLoad' onClick=\"setDesign('1');\">";

var foundcarrier=0;
if (contload==1) {
	var carriers = document.getElementsByTagName('option');
	for (var i=1;i<carriers.length;i++) {
		//alert("value: "+carriers[i].value);
		//alert("text: "+carriers[i].innerHTML);
		var numbers = carriers[i].innerHTML.match(/\d+/g);
		var capacity = numbers[numbers.length-1];
		var loaded = numbers[numbers.length-2];
		//alert("capacity: "+capacity+"\nLoaded: "+loaded);
		if (loaded < capacity) {
			foundcarrier=1;
			var amount = capacity-loaded;
			if (maxships < amount) { amount = maxships; }
			var colony;
			var fleet;
			var types;
			// Load the ship
			
			// amount, 
			var fields = document.getElementsByTagName('input');
			for (var fi=0;fi<fields.length;fi++) {
				if (fields[fi].type=='hidden') {
					//alert("Name: "+fields[fi].name+"\nValue: "+fields[fi].value);
					
					if (fields[fi].name=='colony') {
						colony = fields[fi].value;
					} else if (fields[fi].name=='fleet') {
						fleet = fields[fi].value;
					} else if (fields[fi].name=='types') {
						types = fields[fi].value;
					} else if (fields[fi].name=='design') {
						alert(fields[fi].value);
					}
					
				}
			}
			var loadurl = "http://www.war-facts.com/carrier.php?amount1="+amount+"&fleet="+fleet+"&colony="+colony+"&types="+types+"&ship="+carriers[i].value+"&design1="+loaddesign+"&addships";
			//alert(loadurl);
			window.location.href = loadurl;
			break;
		}
	
		
	}
} else if (loaddesign>0) {
	alert('no more ships');
	GM_setValue('wf_al_design', 0);
}
if (foundcarrier==0 && loaddesign>0) {
	alert('no more carrier capacity.');
}