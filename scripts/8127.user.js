// 
// by njkrut (njkrut{at}gmail.com)
//
// ==UserScript==
// @name	Woot.com Auto Select 3 on BoCs
// @namespace	http://nikru.com
// @description	Auto Selects 3 items on BoCs
// @include	https://www.woot.com/Member/Order.aspx
// ==/UserScript==

var doMyPostBack = function()
{
	if(theForm && wantthreebutton)
	{
		eventTarget.value = 'ctl00$ContentPlaceHolder$Shoppingcartcontrol1$WantedThreeButton';
		eventArgument.value = '';
		theForm.submit();
	} else {
		alert('Could Not Select Three for Unknown Reasons');
	}
}


var eventTarget = document.getElementById('__EVENTTARGET');
var eventArgument = document.getElementById('__EVENTARGUMENT');
var item = document.getElementById('ctl00_ContentPlaceHolder_Shoppingcartcontrol1_SaleTitleLabel');
var wantthree = document.getElementById('ctl00_ContentPlaceHolder_Shoppingcartcontrol1_YouWantPanel');
var wantthreebutton = document.getElementById('ctl00_ContentPlaceHolder_Shoppingcartcontrol1_WantedThreeButton');
var passwordBox = document.getElementById('ctl00_ContentPlaceHolder_WootPasswordTextBox');
var theForm = document.getElementById('aspnetForm');

// Put your password here for autofill:
var myPassword = '';

if (item.innerHTML.substring(0, 11) == "Random Crap" && wantthree.className != "YouWant3")
	doMyPostBack();

if (passwordBox && myPassword != '')
	passwordBox.value = myPassword;
