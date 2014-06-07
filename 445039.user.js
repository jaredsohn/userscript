 

 

// ==UserScript==
// @name        S3nT!n3L*
// @namespace   Killer Klown
// @include     http://zl.storm8.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// ==/UserScript==

 



 

//alert('hello');
 
var game = String(location).split('/')[2].split('.')[0];
 


// GM variables
var autoheal      = GM_getValue("autoHeal", false);
var healthLimit   = parseInt(GM_getValue("healthLimit",28));
var healthTimer   = parseInt(GM_getValue("healthTimer", 10));
var healing       = GM_getValue("healing", false);
var currentPage   = GM_getValue("currentPage", "home.php");
var autoKill      = GM_getValue("autoKill", false);
var showorhide = GM_getValue("showorhide", "block");

var page = String(location).split('/')[3].split('.php')[0];



// Menu builder
var hchecked = "";
var kchecked = "";
if (autoheal)
	hchecked = " checked";
if (autoKill)
	kchecked = " checked";	




  
// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","s8fixermenu");
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> Autoheal when health is below <input type=\"text\" style=\"border: 1px solid yellow; width: 4em; color: #ffffff; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /><br>\
<input type=\"checkbox\" id=\"autoKill\" "+kchecked+" /> HL refresh<br>\
Kill <select style=\"border: 1px solid green; width: 23em; background: black; text-align: left; color: #00ff00;\" id=\"selectboxPUID\" /> </select><br><input type=\"button\" value=\"GET\" input id=\"btnGETPUID\" /> <INPUT type=\"button\" value=\"CLR\" input id=\"btnCLRPUID\" /> <INPUT type=\"button\" value=\"CLR ALL\" input id=\"btnCLRALL\" /> <INPUT type=\"button\" value=\"SET\" input id=\"btnSET\" /> <br>\
<input type=\"button\" value=\"Hide\" id=\"menutog\" style=\"border: 1px solid red; background: yellow; text-align: center;\"     />";
menu.style.padding = 'px';
menu.style.display = showorhide; 
menu.style.position = 'floating'; 
menu.style.background = 'red';
menu.style.top = '0%';
menu.style.zIndex = '1001';
menu.style.backgroundRepeat = "no-repeat";
menu.style.backgroundPosition = "top right";
document.body.insertBefore(menu, document.body.firstChild);


var displaytoggle = document.createElement('input');
displaytoggle.setAttribute('id', 'hiddentog');
displaytoggle.setAttribute('type', 'button');
displaytoggle.setAttribute('value', '');
displaytoggle.style.padding = '20px';
displaytoggle.style.position = 'fixed';
displaytoggle.style.top = '0%';
displaytoggle.style.background = 'none';
displaytoggle.style.border = '1px none';
displaytoggle.style.zIndex = '1001';
document.body.insertBefore(displaytoggle, document.body.firstChild);


var mtogbtn = document.getElementById('menutog');
var htogbtn = document.getElementById('hiddentog');
 
mtogbtn.addEventListener('click', togglevisibility);
htogbtn.addEventListener('click', togglevisibility);

//***************************************************************************************
 

 
  

// ***** function checkOptions ****************************
function checkOptions()
{
 
 
 
	// ***** auto healing ******
	if (document.getElementById('autoheal').checked)
		GM_setValue("autoHeal", true);
	else
		GM_setValue("autoHeal", false);
	var oldhealth = healthLimit;
	var newhealth = document.getElementById('healthlimit').value;
	if (oldhealth != newhealth)
	{
		healthLimit = newhealth;
		GM_setValue("healthLimit",parseInt(healthLimit));
 	}
	
	// ***** autoKill  ***** 
	if (document.getElementById('autoKill').checked)
		GM_setValue("autoKill",true);
	else
		GM_setValue("autoKill",false);

 
}

function click(e, type) {
	if (!e) {
		return;
	}
	if (typeof e == 'string') e = document.getElementById(e);
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type || 'click'), true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	e.dispatchEvent(evObj);
}

function togglevisibility() {
	var vismenu = document.getElementById('s8fixermenu');
	var vismenudisp = window.getComputedStyle(vismenu, null).getPropertyValue("display");
	if (vismenudisp == "block") {
		vismenu.style.display = 'none';
		GM_setValue("showorhide", "none");
	}
	if (vismenudisp == "none") {
		vismenu.style.display = 'block';
		GM_setValue("showorhide", "block");
	}
} 

 
 // ***** autokilling *****
	if (autoKill)

 
{
	 setTimeout(function() { window.location.reload(); }, 1000); // 1 seconds, e.g.
}
  
 




	// ***** autohealing *****
	if (autoheal)
{
	// *****set page refresh timer *****
	if (healthTimer > 0)
		setTimeout("document.location = document.location", healthTimer * 60 * 1000);
	
	// ***** store current page *****
	if (page != 'hospital')
	{
		var cp = "http://zl.storm8.com/"+page+".php";
		GM_setValue('currentPage', cp);
	}
	
	// ***** check current health *****
	if (parseInt(document.getElementById('healthCurrent').innerHTML) < healthLimit)
	{
		
		if (page != "hospital")
			document.location = "http://zl.storm8.com/hospital.php";
		else
		{
			GM_setValue('healing', true);
			document.location = document.getElementsByClassName('healBtn')[0].getElementsByTagName('a')[0].href;
		}
	}
	else if (healing)
	{
		GM_setValue('healing', false);
		document.location = currentPage;
	}
	
}
//********************    KILL LIST    *************************
 
 
 
 

$(document).ready(function() {
    $('a[href*="profile"]:contains("βLΩΩDΨ​😷SҜULL​")')
 .closest('tr').find('.fightActionInnerInner').click();
});

 


// ***** DO NOT EDIT OR MOVE !!! *****
//*********************************************************
/*
 
"-N͢͡εм​͠зѕ͜וS​😷༄"
"Ꮋ͢ꅛɭɭՀ​༱༮ՀᏫ༱🔪​🔗😷"
"βLΩΩDΨ​😷SҜULL​"
 
 
$(document).ready(function() {
    $('a[href*="profile"]:contains("-N͢͡εм​͠зѕ͜וS​😷༄")')
 .closest('tr').find('.fightActionInnerInner').click();
});	 
 
	
*/






// *****  FUNCTION POSTWITH ****
function postwith (to,p) {
  var myForm = document.createElement("form");
  myForm.method="post" ;
  myForm.action = to ;
  for (var k in p) {
    var myInput = document.createElement("input") ;
    myInput.setAttribute("name", k) ;
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput) ;
  }
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;
}


// ***** Click by JoeSimmons ******************************
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e) {return;}
if(typeof e=='string') e=document.getElementById(e);
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}


// ***** TIMERS ********************************************
 setInterval(checkOptions,  1000);
 
 

 
