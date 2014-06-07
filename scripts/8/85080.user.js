// ==UserScript==
// @name           cloaky cloaky
// @namespace      userscripts.org/36866
// @description    cloaky cloaky
// @include        http://*.pardus.at/hack.php*
// @include        http://*.pardus.at/main.php*
// @version        1.0

// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var showAutoHack = true;
var showAutoCloak = true;

var daysToKeepCookies = 9999;
var defaultRemainingAPs = 5000;  //Number of APs to default to if no cookie is stored

var cookieName = 'autoCloakHack';

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

var hacking_form;
var name_lookup_form;
var hacking_temp_form;

var cloaking_form;

var APsLeft;

var page = document.URL.substring(document.URL.lastIndexOf('/') + 1, (document.URL.indexOf('?') > 0 ? document.URL.indexOf('?') : document.URL.length));

var hackToAPs = defaultRemainingAPs;
var cloakToAPs = defaultRemainingAPs;

var processAutoHack = 'false';
var processAutoCloak = 'false';

var contents = readCookie(cookieName);

if(contents) {

	temp = contents.split('~');

	hackToAPs = temp[0];
	processAutoHack = temp[1];
	
	cloakToAPs = temp[2];
	processAutoCloak = temp[3];
} else {
	writeNewCookie();
}

//alert('hacktoaps:' + hackToAPs + '\nprocessautohack: ' + processAutoHack + '\n\ncloakToAPs:' + cloakToAPs + '\nprocessAutoCloak:' + processAutoCloak);


if(page == 'main.php' && showAutoCloak) {
	window.addEventListener("load",autoCloakerInit,false);
} else if(page == 'hack.php' && showAutoHack) {
	window.addEventListener("load",autoHackerInit,false);
}


// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value,days) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}

function stripTags(str) {

	var done = false;

	while(!done) {
		var ltIdx = str.indexOf('<');
		var gtIdx = str.indexOf('>');

		if(ltIdx < 0 && gtIdx < 0) {
			
			//Strip leading and trailing spaces
			if(str.substr(0, 1) == ' ') {
				str = str.substr(1);
				continue;
			} else if(str.substr(str.length - 1, str.length) == ' ') {
				str = str.substr(0, str.length - 1);
				continue;
			}

			done = true;
			continue;
		}

		if(gtIdx < 0) {
			str = str.substr(0, ltIdx);
		} else if(ltIdx == 0 || gtIdx < ltIdx || ltIdx < 0) {
			str = str.substr(gtIdx + 1);
		} else if(gtIdx == str.length - 1) {
			str = str.substr(0, ltIdx);
		} else {
			str = str.substr(0, ltIdx) + str.substr(gtIdx + 1);
		}
	}

	return str.replace('&nbsp;', '');
}

// ////////////////////////////////////////////////////////////////////////
// Imported -- This function taken from: 
//             http://www.codetoad.com/javascript/isnumeric.asp
//             Edited by Rhindon -- Removed '.' from ValidChars
// ////////////////////////////////////////////////////////////////////////
function IsNumeric(sText)
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
   }


// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////

function writeNewCookie() {

	createCookie(cookieName, hackToAPs + '~' + processAutoHack + '~' + cloakToAPs + '~' + processAutoCloak);

}

function autoHack() {

	hackToAPs = document.getElementById('txtAPs').value
	processAutoHack = 'true';
	writeNewCookie();
	
	buttons = document.getElementsByTagName('button');
	
	for(var i = 0; i < buttons.length; i++) {
	  if(buttons[i].innerHTML == 'Hack') buttons[i].click();
	}
}

function autoCloak() {

	cloakToAPs = document.getElementById('txtAPs').value
	processAutoCloak = 'true';
	writeNewCookie();

	cloaking_form.submit();

}

function addAutoHackElements() {
	//Add Auto-Hack Elements

	var label = document.createElement("b");
	label.appendChild(document.createTextNode("APs to REMAIN after hacking: "));

        var txtAPs = document.createElement('input');
        txtAPs.id = 'txtAPs';
        txtAPs.type = 'text';
        txtAPs.size = '5';
        txtAPs.value = hackToAPs;

	var btnAH = document.createElement("input");
	btnAH.id = "btnAH";
	btnAH.type = "button";
	btnAH.value = "Auto-Hack";
	btnAH.addEventListener("click", autoHack, false);

	var hackDiv = document.getElementsByTagName("div")[0];
	var table = hackDiv.getElementsByTagName("table")[0];
	table = table.getElementsByTagName("table")[0];
	var row = table.insertRow(-1);
	var cell = row.insertCell(-1);
	cell.colSpan = 2;
	cell.align = "center";
	cell.appendChild(label);
	cell.appendChild(txtAPs);
	cell.appendChild(document.createTextNode(' '));
	cell.appendChild(btnAH);

}

function addAutoCloakElements() {

	var rule = document.createElement("hr");

	var label = document.createElement("b");
	label.appendChild(document.createTextNode("APs to REMAIN after cloaking: "));

        var txtAPs = document.createElement('input');
        txtAPs.id = 'txtAPs';
        txtAPs.type = 'text';
        txtAPs.size = '5';
        txtAPs.value = cloakToAPs;

	var btnAC = document.createElement("input");
	btnAC.id = "btnAC";
	btnAC.type = "button";
	btnAC.value = "Auto-Cloak";
	btnAC.addEventListener("click", autoCloak, false);

	var autoCloakDiv = document.createElement('div');
	autoCloakDiv.id = 'autoCloakDiv';
	autoCloakDiv.appendChild(rule);
	autoCloakDiv.appendChild(label);
	autoCloakDiv.appendChild(txtAPs);
	autoCloakDiv.appendChild(btnAC);

	inputs = document.getElementsByTagName('input');

	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].name == 'cloak' || inputs[i].name == 'uncloak') {
			inputs[i].parentNode.appendChild(autoCloakDiv, inputs[i].parentNode.lastChild);
		}
	}
}

function autoHackerInit() {

	addAutoHackElements();

        //Get number of APs left
        bs = document.getElementsByTagName('b');
        APsLeft = bs[0].innerHTML;

	//Get the forms and put them in local variables
	forms = document.getElementsByTagName('form');

	for(var i = 0; i < forms.length; i++) {
	  if(forms[i].name == 'hacking') hacking_form = forms[i];
	  if(forms[i].name == 'hacking_temp') hacking_temp_form = forms[i];
	  if(forms[i].name == 'name_lookup') name_lookup_form = forms[i];
	}

    if(processAutoHack == 'true') {

          var apCost = 250;

	  var method = hacking_form.elements[2].value;

          //Get hack type & APs used for calc type
	  if(method == 'tradelog') apCost = 50;
          if(method == 'brute'   ) apCost = 100;
          if(method == 'skilled' ) apCost = 150;
          if(method == 'freak'   ) apCost = 200;
          if(method == 'guru'    ) apCost = 250;

	  if(IsNumeric(APsLeft)) {
	    var calcAPsLeft = APsLeft - apCost;

	    if(calcAPsLeft >= hackToAPs) {
		  autoHack();
	    } else {
		  //Turn off auto-hack if the hack will go below the min value
		  processAutoHack = 'false';
		  writeNewCookie();
	    }

	  }
    }
}

function autoCloakerInit() {

	addAutoCloakElements();

	//Get number of APs left
	spans = document.getElementsByTagName('span');
	for(var i = 0; i < spans.length; i++) {
		if(spans[i].title.indexOf('Maximum in') == 0) {
			APsLeft = stripTags(spans[i].innerHTML);
		}
	}

	//Get the forms and put them in local variables
	forms = document.getElementsByTagName('form');

	for(var i = 0; i < forms.length; i++) {
	  if(forms[i].name == 'cloaking') cloaking_form = forms[i];
	}

    if(processAutoCloak == 'true') {

          var apCost = 100;

	  if(IsNumeric(APsLeft)) {
	    var calcAPsLeft = APsLeft - apCost;

	    if(calcAPsLeft >= cloakToAPs) {
		  autoCloak();
	    } else {
		  //Turn off auto-hack if the hack will go below the min value
		  processAutoCloak = 'false';
		  writeNewCookie();
	    }
	  }
    }
}