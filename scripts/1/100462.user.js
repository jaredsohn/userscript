// ==UserScript==
// @name           Userscripts Insert Donate Button
// @namespace      http://userscripts.org/users/23652
// @description    Inserts a donate button into the description area
// @include        http://userscripts.org/scripts/edit/*
// @copyright      JoeSimmons
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// OPTIONS ////////////////////////////////////////////////////
var donatecode = "<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="EQG6CBD5966PA">
<input type="image" src="https://www.paypalobjects.com/WEBSCR-640-20110306-1/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/WEBSCR-640-20110306-1/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
;
///////////////////////////////////////////////////////////////

function insert() {
var desc = document.getElementById('script_description_extended'),
	newD = desc.value;
var olddonatecode = "<a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=chargraph%40gmail%2ecom&item_name=Joyce&no_shipping=0&no_note=1&tax=0&currency_code=USD&lc=US&bn=PP%2dDonationsBF&charset=UTF%2d8\"><img src=\"http://www.chargraph.com/josh/images/donate.png\" style=\"width: 88px; height: 24px;\"></a>";
if(newD.indexOf(olddonatecode)!=-1) newD = newD.replace(olddonatecode,donatecode);
else if(newD.indexOf(donatecode)==-1) newD += donatecode;
desc.value = newD;
}

GM_registerMenuCommand('Insert Donate Button', insert);

var a = document.createElement('a'),
	desc = document.getElementById('script_description_extended');
a.setAttribute('href', 'javascript:void(0);');
a.setAttribute('style', 'display:block; font-size: 18px;');
a.addEventListener('click', insert, false);
a.appendChild(document.createTextNode('Add donate button'));
desc.parentNode.appendChild(a);