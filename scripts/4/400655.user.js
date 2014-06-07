// ==UserScript==
// @name		 sign up for Yahoo iranian love 
// @description	This script is for sign up iranian to the yahoo and to bypass sanctions on Iran by the yahoo site. After install you can select Iran country and set cell phone to receive sms for activation account.  خلیج همیشه فارس  . با تشکر - محسن گرجی . این اسکریپت برای ثبت نام ایرانیان در سایت یاهو و دور زدن تحریم یاهو علیه ایران می باشد.thanks(mohsen abolghasem gorji)
// @version		3.0
// @createdate	2013-10-05
// @update		2014-01-11
// @namespace	http://www.arzibaei.com/
// @author		mohsen abolghasem gorji(from Iran)
// @homepage	http://www.arzibaei.com/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://edit.yahoo.com/registration*
// ==/UserScript==

["", "-rec"].forEach(function(entry) {
	var parent = document.getElementById('country-code'+entry);
	var child = parent.children[0];
	var node = document.createElement("option");
	node.value = '98';
	node.setAttribute('data-country-code', 'ir');
	node.setAttribute('aria-label', 'Iran');
	if (parent.value == '1')
		node.setAttribute('selected', 'selected');
	node.innerHTML = 'Iran (+98)';
	parent.insertBefore(node, child);
});
var referenceNode = document.getElementById('general-message');
var newNode = document.createElement("span");
newNode.setAttribute('style', 'display:block; direction:rtl; text-align:right; font:12px tahoma; color:#bbb;');
newNode.innerHTML = 'محسن گرجی : ايراني هميشه سربلند-خلیج همیشه فارس !';
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);