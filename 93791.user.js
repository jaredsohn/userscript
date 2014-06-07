// ==UserScript==
// @name           Ressources
// @namespace      spaccon
// @description    Rend possible le remplissage automatique
// @include        http://*.spaccon.net/game/ship_send2.php?session=*
// ==/UserScript==

window.opera.defineMagicFunction('max_ressource', function (html, e, id)
{
	// Find and parse real capacity of the ships
	var consumption = document.getElementById("consumption").innerHTML;
	consumption = parseInt(consumption.replace('<font color="#99CC66">', '').replace('</font>', ''));    

	var Capacity = document.getElementById("capacity").value;
	Capacity -= consumption;

	var ress_1 = parseInt(check_number(document.getElementById("ress_1").value));
	var ress_2 = parseInt(check_number(document.getElementById("ress_2").value));
	var ress_3 = parseInt(check_number(document.getElementById("ress_3").value));
	if(isNaN(ress_1)) { ress_1=0; }
	if(isNaN(ress_2)) { ress_2=0; }
	if(isNaN(ress_3)) { ress_3=0; }
	var freeCapacity = Capacity - (ress_1+ress_2+ress_3);

	// Get selected resource quantity
	var ResourceToSend = parseInt(check_number(document.getElementById("ress_"+id).value));
	if(isNaN(ResourceToSend)) { ResourceToSend=0; }
	var Resource = parseInt(check_number(document.getElementById("resource_"+id).value)) - ResourceToSend;
	
	if(id==3){ Resource -= consumption; }
    
	if(freeCapacity <= Resource) {
		ResourceToSend += freeCapacity;
	}
	else {
		ResourceToSend += Resource;
	}
	
	// Set into the field
	document.getElementById("ress_"+id).value = ResourceToSend;
});
window.opera.defineMagicFunction('max_ressources', function ()
{
	// Initialize fields
	document.getElementById("ress_1").value = 0;
	document.getElementById("ress_2").value = 0;
	document.getElementById("ress_3").value = 0;

	// Find and parse real capacity of the ships
	var consumption = document.getElementById("consumption").innerHTML;
	consumption = parseInt(consumption.replace('<font color="#99CC66">', '').replace('</font>', ''));
	
	var Capacity = parseInt(check_number(document.getElementById("capacity").value));
	Capacity -= consumption;
	
	// Get ressources quantities
	var Resource = new Array();
	var ResourceToSend = parseInt(check_number(document.getElementById("ress_1").value))+parseInt(check_number(document.getElementById("ress_2").value))+parseInt(check_number(document.getElementById("ress_3").value));
	Resource[1] = parseInt(check_number(document.getElementById("resource_1").value));
	Resource[2] = parseInt(check_number(document.getElementById("resource_2").value));
	Resource[3] = parseInt(check_number(document.getElementById("resource_3").value))-consumption;

	// Calc how many resources should be sent for each type and set it into their fields
	for(var i=1; i<4; i++) {
		if(Capacity <= Resource[i]) {
			ResourceToSend = Capacity;
			document.getElementById("ress_"+i).value = ResourceToSend;
			break;
		}
		else {
			ResourceToSend = Resource[i];
			document.getElementById("ress_"+i).value = ResourceToSend;
		}
		Capacity -= ResourceToSend;
	}
});