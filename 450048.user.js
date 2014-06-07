// ==UserScript==
// @name		YAHOO! Register for Persian
// @description	sabte nam dar YAHOO!
// @version		1.0
// @createdate	2014-01-05
// @update		2014-01-06
// @namespace	http://userscripts.org/scripts/review/450048
// @author		Mojtaba Shateri
// @homepage	http://barnamenevis.org/member.php?302800-Mojtaba-Shateri
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://edit.yahoo.com/registration*
// ==/UserScript==

    //Mobile Number....
    var PhoneSelectTag = document.getElementById('country-code-rec');
    var newOption = document.createElement("option");
	newOption.setAttribute('selected', 'selected');
	newOption.value = '98';
	newOption.setAttribute('data-country-code', 'ir');
	newOption.setAttribute('aria-label', 'Iran');
	newOption.innerHTML = 'Islamic Republic Of Iran (+98)';
	PhoneSelectTag.add(newOption);
    
    //Optional Recovery Mobile Number...
        PhoneSelectTag = document.getElementById('country-code');
        newOption = document.createElement("option");
        newOption.setAttribute('selected', 'selected');
   	newOption.value = '98';
	newOption.setAttribute('data-country-code', 'ir');
	newOption.setAttribute('aria-label', 'Iran');
	newOption.innerHTML = 'Islamic Republic Of Iran (+98)';
	PhoneSelectTag.add(newOption);
