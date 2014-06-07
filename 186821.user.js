// ==UserScript==
// @name        putininfo
// @namespace   luis.com
// @include     https://heatprod.socalgas.com/Leads/LeadForm.*
// @version     1
// @grant       none
// ==/UserScript==
firstname=document.getElementById("ctl00_cphSiteMaster_txtFirstName").value
lastname=document.getElementById("ctl00_cphSiteMaster_txtLastName").value
primarynumber=document.getElementById("ctl00_cphSiteMaster_txtPrimaryPhone").value


document.getElementById("ctl00_cphSiteMaster_keyLanguage").value="1"
document.getElementById("ctl00_cphSiteMaster_keySourceCategory").value="12"
if (firstname="")
{
 document.getElementById("ctl00_cphSiteMaster_txtFirstName").value="First"
}
if (lastname="")
{
 document.getElementById("ctl00_cphSiteMaster_txtLastName").value="Last"
}
if (primarynumber="")
{
document.getElementById("ctl00_cphSiteMaster_txtPrimaryPhone").value="(111) 111-1111"
}
