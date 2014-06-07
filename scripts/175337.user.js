// ==UserScript==
// @name        Suportal auto-login script
// @namespace   Suportal auto-login script
// @include     *portal.opalonline.co.uk*
// @version     1
// @grant
// ==/UserScript==


/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/



var funkcja;
var storage = localStorage;


function forget_details(_alert) {
	storage.removeItem('configured_username');
	storage.removeItem('configured_password');
	storage.removeItem('configured');

	if (_aler != "0")
	{
		alert('Saved login details for suportal has been deleted :)');
	}
}

function init() 
{
    if (document.body.innerHTML.match('Invalid user name or password.')) 
	{
        forget_details("0"); 
	}
    if (document.body.innerHTML.match('This account has been locked. Please try again later.')) 
	{
        forget_details("0"); 
	}

	var url = document.URL;
	
	if (url.match('SignIn') || url.match('Signin')) 
	{
		login();
	} 
	else 
	{
		if (url.match('DELETE')) 
		{
			forget_details("1");
		}
	}
}

function login() {

	var username = storage.configured_username;
	var password = storage.configured_password;

	if (storage.configured) {
		document.getElementById('ctl00_MasterContentContentPane_Signin1_userID_txt').value = username;
		document.getElementById('ctl00_MasterContentContentPane_Signin1_password_txt').value = password;
		document.getElementById('ctl00_MasterContentContentPane_Signin1_SigninBtn').click(); 
	} else {
		document.getElementById('ctl00_MasterContentContentPane_Signin1_userID_txt').value = '';
		document.getElementById('ctl00_MasterContentContentPane_Signin1_password_txt').value = '';
		document.getElementById('ctl00_MasterContentContentPane_Signin1_SigninBtn').addEventListener("click", witaj, false);
	}
}

function witaj() {
	storage.configured_username = document.getElementById('ctl00_MasterContentContentPane_Signin1_userID_txt').value;
	storage.configured_password = document.getElementById('ctl00_MasterContentContentPane_Signin1_password_txt').value;
	storage.configured = true;
}


setTimeout(init, 250);



/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/
