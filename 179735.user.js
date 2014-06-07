// ==UserScript==
// @name        t3ster 100
// @namespace   Adam Nutkase
// @include     http://zl.storm8.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// ==/UserScript==



 

//alert('hello');
//Defeat Unknown error occurred. Please try again later. 

/*<div class="messageBoxFail">
<span class="fail">Defeat</span>
Unknown error occurred. Please try again later.
</div>
*/



var autoheal      = GM_getValue("autoHeal", false);
var healthLimit   = parseInt(GM_getValue("healthLimit",28));
var healthTimer   = parseInt(GM_getValue("healthTimer", 10));
var healing       = GM_getValue("healing", false);
var currentPage   = GM_getValue("currentPage", "home.php");
var autoKill      = GM_getValue("autoKill", false);
         
  
// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","S8console");
var hchecked = "";
var kchecked = "";
if (autoheal)
	hchecked = " checked";
if (autoKill)
	kchecked = " checked";	
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> Autoheal when health is below <input type=\"text\" style=\"border: 1px solid yellow; width: 4em; color: #ffffff; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /><br>\
<input type=\"checkbox\" id=\"autoKill\" "+kchecked+" /> AutoKill<br>\
<div id=\"wwfixernextbuilding\" style=\"margin-top: 4px;\"></div>";

// var x = 1;
var x = 1;
if (document.body.children[1].id == "wwhelpermenu")
	x = 2;
document.body.insertBefore(menu, document.body.children[x]);


var page = String(location).split('/')[3].split('.php')[0];

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
    $('a[href*="profile"]:contains("ᏨᎻ͢Ꮛͪͭ​Ꮢ͡ᏒᎽ😷🔪​🍒")')
 .closest('tr').find('.fightActionInnerInner').click();
});
 
 $(document).ready(function() {
    $('a[href*="profile"]:contains("-N͢͡εм​͠зѕ͜וS​😷༄")')
 .closest('tr').find('.fightActionInnerInner').click();
});
 
 
 
$(document).ready(function() {
    $('a[href*="profile"]:contains("00￡λᏯ⚖​⃝😷")')
 .closest('tr').find('.fightActionInnerInner').click();
});



$(document).ready(function() {
    $('a[href*="profile"]:contains("lཀཬҜཇl​😷lཀyཟ༱​ཧ")')
 .closest('tr').find('.fightActionInnerInner').click();
});

$(document).ready(function() {
    $('a[href*="profile"]:contains("0😷0 Ꭷྀϯབཀཥ 0😷0")')
 .closest('tr').find('.fightActionInnerInner').click();
});

 

 



// ***** DO NOT EDIT OR MOVE !!! *****
//*********************************************************
/*
	Mཞ😷H∉Լ​Լs
	TarZom​bie
	lཀཬҜཇl​😷lཀyཟ༱​ཧ
X	Feisty​🌺One😷
X	W͢⋏ཞR͡​͠༏😷འ
	0😷0 Ꭷྀϯབཀཥ 0😷0
	T͠͡ɧ⍺༩​ཪ͜😷
	I͢א∨⃔i​ઠiᏰl૯⃗​ 😷
	-N͢͡εм​͠зѕ͜וS​😷༄
	ᏨᎻ͢Ꮛͪͭ​Ꮢ͡ᏒᎽ😷🔪​🍒
	00￡λᏯ⚖​⃝😷
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
 
 