// ==UserScript==
// @name        HP Fortify Login
// @namespace   http://userscripts.org/ewolfman
// @include     https://www.hpfod.com/login.aspx*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginTenantID = document.getElementById("loginTenantID");

var email = GM_getValue("email");
if(email != null){
	loginEmail.value=email;
}

var password = GM_getValue("password");
if(password != null){
	loginPassword.value=password;
}

var tenant = GM_getValue("tenant");
if(tenant != null){
	loginTenantID.value=tenant;
}

document.getElementById("logincontrolokbutton").addEventListener('click', function(){
	GM_setValue("email", loginEmail.value);
	GM_setValue("password", loginPassword.value);
	GM_setValue("tenant", loginTenantID.value);
});