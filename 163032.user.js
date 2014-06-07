// ==UserScript==
// @name       Check Usage
// @namespace  http://indie-elitist.blogspot.com/
// @version    1.0
// @description  A script to automatically get my usage data.
// @match      http://www.isp.ca/checkusage.php
// @copyright  2012+, You
// ==/UserScript==

document.getElementsByName("accountnumber")[0].value = "11111111";
document.getElementsByName("servicenumber")[0].value = "ST-1111";
if(document.body.textContent.substring(1, 11) != "Usage for ")
{
	document.forms[0].submit.click();
}