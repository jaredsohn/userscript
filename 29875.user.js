// ==UserScript==
// @name           Pardus Trade Defaults
// @namespace      pardus.at
// @description    Sets the default number of each resource to buy and sell based on your current location
// @include        http://*.pardus.at/*trade.php
// @author         Rhindon
// @version        1.1
// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////
var daysToKeepCookies = 9999;
var showCheckboxes    = true;




// ////////////////////////////////////////////////////////////////////////
//Beginning of Code
// ////////////////////////////////////////////////////////////////////////

var buildingName = "";


window.addEventListener("load",trade_defaults_init,false);

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

// ////////////////////////////////////////////////////////////////////////
// End of Imported Code
// ////////////////////////////////////////////////////////////////////////

function trade_defaults_init() {

	//Get the SB/Planet Name or Building Type    
    var headers = document.getElementsByTagName('h1');
    
    if(headers[0]) {
      for (j = 0; j < headers[0].childNodes.length; j++) {
        if(headers[0].childNodes[j].href) {
          buildingName = headers[0].childNodes[j].innerHTML;
        };
      }
    }

    //Get the building name in the format "Pilot's Asteroid Mine"
    var bolds = document.getElementsByTagName('b');
    
    for(i = 0; i < bolds.length; i++) {
      if(bolds[i].innerHTML.indexOf(buildingName) >= 0) {
        buildingName = bolds[i].innerHTML;
      }
    }
     
    //Loop through the input boxes and add a checkbox after each one.
    var inputs = document.getElementsByTagName('input');
    
    for (i = 0; i < inputs.length; i++) {
      if(inputs[i].name.indexOf("sell") >= 0 || inputs[i].name.indexOf("buy") >= 0) {

        //Initialize the checked_txt field; this will be changed if a value is entered
        checked_txt = "";

        //Check to see if a value has been stored for this field, and fill it out if needed
        var val = readCookie(buildingName + '_' + inputs[i].name);

        if(val) {
          inputs[i].value = val;
          checked_txt = ' checked="CHECKED" ';
        }

        //Show the checkboxes, if desired
  		if(showCheckboxes) {

  		  var child = "<input type='checkbox' name='" + inputs[i].name + "_chk" + "' "
  		            + "id='" + inputs[i].name + "_chk" + "'" + checked_txt + " />";
  		  
  		  var e = inputs[i].parentNode;
  		  
  		  if(e.innerHTML.indexOf('checkbox') < 0) {

            e.setAttribute("nowrap", "nowrap");
  		  	temp = e.innerHTML;
  		  	temp = child + temp;
  		  	e.innerHTML = temp;
  		  	document.getElementById(inputs[i].id).addEventListener('change',checkboxChecked,true);
  		  }
  		  
		}        
  
      }

    }
}

function checkboxChecked(e) {

  checkbox = e.target;

  textboxName = checkbox.name.substring(0, checkbox.name.length - 4);
  textboxValue = document.getElementById(textboxName).value;
    
  //If checked, then set the cookie
  if(checkbox.checked) {
	createCookie(buildingName + '_' + textboxName, textboxValue, daysToKeepCookies);
  } else {
  //otherwise, erase the cookie
    eraseCookie(buildingName + '_' + textboxName);
  }  
}