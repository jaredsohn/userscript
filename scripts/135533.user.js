// ==UserScript==
// @name           FleetManager By Stratatel - Filter unallocated calls
// @namespace      fleetmanager
// @author	 	 Dan OShea
// @description    filter unallocated calls through fleetwatch application by Stratatel
// @include        https://fleetmanager.stratatel.com.au/html/advPersonalReport/advMobAllocation_3*
// @version 	   2.2
// ==/UserScript==

if (confirm("Would you like to filter unallocated calls? Ctrl-R will refresh the script.")) {

	var table = document.getElementsByClassName('stdTable');

	var tBody = table[0].getElementsByTagName("TBODY");

	var tr = tBody[0].getElementsByTagName("TR");

	for (var i=0; i < tr.length-1;i++){
		if (tr[i].innerHTML.length > 500){ 		
			if (tr[i].className == ""){
				tr[i].style.display = "none";
			}			
		}
	} 

}
else { // if no

}

if (window.event.shiftKey){
	if (window.event.keyCode == 82){
	var table = document.getElementsByClassName('stdTable');
	var tBody = table[0].getElementsByTagName("TBODY");
	var tr = tBody[0].getElementsByTagName("TR");

	for (var i=0; i < tr.length-1;i++){
		tr[i].style.display = "block";
	} 

}

}

