// ==UserScript==
// @name       NMC Moodle Login P2
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Automatic login to NMC moodle site
// @match      https://idp.nmc.edu/nidp/saml2/sso?id=new-nmc&sid=*
// @copyright  2014+, Evanjs
// ==/UserScript==

document.getElementsByName('Ecom_User_ID')[0].value = "username";
document.getElementsByName('Ecom_Password')[0].value = "password";
imageSubmit();