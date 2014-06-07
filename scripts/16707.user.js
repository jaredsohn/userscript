// ==UserScript==

// @name            Maximize google calendar

// @description	    Makes the calendar bigger.

// @include         http://calendar.google.com/*

// @include         https://calendar.google.com/*

// @include         http://www.google.com/calendar*

// @include         https://www.google.com/calendar*

// ==/UserScript==



//Name:            Maximize google calendar 

//Version:         0.5

//Author:          Joaquin Moran 

//Last update :    26/04/2010



(function()

{
GM_addStyle('.printborder { border-left: 0px !important; }'); 

/*
// Creamos el boton para añadir un nuevo evento
printlink = document.getElementById('mtpPrintLk');
newev = document.createElement("div");
newev.innerHTML = "Hola";
newev.addEventListener("click", unsafeWindow._CreateNewEvent, true);
printlink.insertBefore(ne, printlink.nextSibling);
*/

// Creamos el boton para maximizar/minimizar el menu izquierdo

var nav, aaa, bbb, ccc, ddd, eee;
nav = document.getElementById('nav');
if (nav) {
    aaa = document.createElement('td');
    aaa.style.backgroundColor = "#BBCCFF";
    aaa.style.verticalAlign = "top";
    aaa.style.overflow = "hidden";
    aaa.style.width = "10px";
    aaa.style.cursor = "pointer";
    aaa.addEventListener("click", Toggle, true);

    bbb = document.createElement('div');
    bbb.setAttribute("class", "snt-wrapper");

    ccc = document.createElement('div');
    ccc.style.height = "0px";
    ccc.style.display = "none";
    ccc.setAttribute("class", "snt-spacer");

    ddd = document.createElement('div');
    ddd.style.height = "424px";
    ddd.setAttribute("class", "snt-container");

    eee = document.createElement('div');
    eee.setAttribute("class", "snt-pointer snt-closed");
    
    ddd.appendChild(eee);
    bbb.appendChild(ccc);
    bbb.appendChild(ddd);
    aaa.appendChild(bbb);
    nav.parentNode.insertBefore(aaa, nav.nextSibling);
}

//Functions

function Toggle() {

	navstatus = document.getElementById('nav');
        sidebarstatus = document.getElementById('sidebar');

	topstatus = document.getElementById('topBar');
	funstatus = document.getElementById('funbox');



	

	if (navstatus.style.visibility == 'visible') {

		navstatus.style.visibility = "collapse";

		navstatus.style.width = "0px";
		sidebarstatus.style.visibility = "collapse";
		sidebarstatus.style.width = "0px";

		topstatus.style.visibility = "collapse";
		funstatus.style.visibility = "collapse";

		unsafeWindow._SR_backToCalendar();

	}

	else {	

		navstatus.style.visibility = "visible";

		navstatus.style.width = "13em";
		sidebarstatus.style.visibility = "visible";
		sidebarstatus.style.width = "13em";

		topstatus.style.visibility = "visible";
		funstatus.style.visibility = "visible";

		unsafeWindow._SR_backToCalendar();

	}

}



navstatus = document.getElementById('nav');
sidebarstatus = document.getElementById('sidebar');

topstatus = document.getElementById('topBar');
funstatus = document.getElementById('funbox');

navstatus.style.visibility = "collapse";

navstatus.style.width = "0px";
sidebarstatus.style.visibility = "collapse";
sidebarstatus.style.width = "0px";

topstatus.style.visibility = "collapse";
funstatus.style.visibility = "collapse";


unsafeWindow._SR_backToCalendar();

})();