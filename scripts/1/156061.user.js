// ==UserScript==
// @name        FDXVA HELPER
// @namespace   http://giwiganz.com
// @include     http://www.airfrontierva.com/fedex/scheduling_file.php*
// @include     http://www.airfrontierva.com/fedex/scheduling_view.php*
// @version     2
// ==/UserScript==


if (!document.forms.length) return;

var f=document.forms[0];
for (var i=1; i<document.forms.length; i++){
	if (document.forms[i].elements.length>f.elements.length)
		f=document.forms[i];
}
		
var div=document.createElement("div");
div.appendChild(document.createTextNode("Script by Garen Evans, FDX12"));
f.parentNode.insertBefore(div, f);

start();


function fillTextBox(input)
{

	var dT = new Date();
	
	if (match(input,/depday2/)) input.value=pad(dT.getUTCDate(),2);
	if (match(input,/depmonth2/)) input.value=pad(dT.getUTCMonth()+1,2);
	if (match(input,/depyear2/)) input.value=dT.getUTCFullYear();	
	if (match(input,/arrday/)) input.value=pad(dT.getUTCDate(),2);
	if (match(input,/arrmonth/)) input.value=pad(dT.getUTCMonth()+1,2);
	if (match(input,/arryear/)) input.value=dT.getUTCFullYear();	
	if (match(input,/dephour2/)) input.tabIndex = "2";
	if (match(input,/depmin2/)) input.tabIndex = "3";
	if (match(input,/arrhour/)) input.tabIndex = "4";
	if (match(input,/arrmin/)) input.tabIndex = "5";
	
	
	//Specifically for scheduling_view.php:
	var hhmm = pad(dT.getUTCHours(),2) + pad(dT.getUTCMinutes(),2);
	if (match(input,/datetime/)){
		input.focus();
		input.value = hhmm;
	}
	

	
		
}	



function fieldModify(input)
{
	if (input.type=="text") fillTextBox(input);
	if (input.type=="password") fillTextBox(input);
	if (input.type=="submit") input.tabIndex = "6";
		

	//Change hidden name=hid_route to name=route
	//Change textarea name=route to name=hid_route, and enable it.
	if (input.type=="hidden"){
		if (match(input,/hid_route/)){
			input.name="route";
		}
	}
	if (input.type=="textarea"){
		if (match(input,/route/) || match(input,/hid_route/)){
			input.disabled=false;
			input.name="hid_route";
			input.focus();
			input.tabIndex="1";
		}
	}
	

}

function start() {

	for (var i=0; i<f.elements.length; i++){
		fieldModify(f.elements[i]);
	}
	
}


function match(input, regexp){
	return ((input.name && input.name.match(regexp)) || (input.id && input.id.match(regexp)));
}

function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}


