// ==UserScript==
// @name       NMC Moodle Login P1+P2
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Automatic login to NMC moodle site
// @match https://idp.nmc.edu/nidp/saml2/sso?id=new-nmc&sid=*
// @match https://idp.nmc.edu/nidp/idff/*
// @match https://elearn.nmc.edu
// @copyright  2014+, Evanjs
// 0.1 combined P1 and P2 scripts
// ==/UserScript==
if (window.location.href == "https://elearn.nmc.edu/") {
x = document.getElementsByClassName('profilename')[0].textContent;
y = 'Click Here To Log In';
if (x.search(y) > 0) {window.location.href = "https://elearn.nmc.edu/login/index.php"};
}
else {
document.getElementsByName('Ecom_User_ID')[0].value = "user";
document.getElementsByName('Ecom_Password')[0].value = "pass";
imageSubmit();
}