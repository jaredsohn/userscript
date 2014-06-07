// ==UserScript==
// @name			Erepublik: Toggle companies for sale.
// @description	This will give you the ability to toggle different types of companies at the 'companies for sale' page.
// @author		Opaque
// @version		1
// @namespace		tag:littlefreaks.org,2008-06-20:Erepublik
// @include		http://www.erepublik.com/company_sell-*-*.html
// ==/UserScript==
GM_addStyle('#primaryfull .no-media .media,'+
		  '#primaryfull .no-moving .moving,'+
		  '#primaryfull .no-food .food,'+
		  '#primaryfull .no-weapons .weapons,'+
		  '#primaryfull .no-housing .housing,'+
		  '#primaryfull .no-hospitals .hospitals,'+
		  '#primaryfull .no-gifts .gifts { display:none !important; }');
String.prototype.setCharAt=function(i,c){return this.substr(0,i)+c+this.substr(i+1);}
mfsct={
	/* Minimized and altered Microformats Scanner Class Tool function wrapper. */
	check:function(e,n){n=n.replace(/\-/g,'\\-');var oRegExp=new RegExp('(^|\\s)'+n+'(\\s|$)');return oRegExp.test(e.className);},
	add:function(e,n){e.className+=e.className?' '+n:n;},
	remove:function(e,n){var rep=e.className.match(' '+n)?' '+n:n;e.className=e.className.replace(rep,'');e.className.replace(/^\s./,'');}
}
function toggle(c,m){var s=GM_getValue('toggled'),n=s.setCharAt(m,(s.charAt(m)==1?0:1)),e=document.getElementById('primaryfull').getElementsByTagName('table')[0];if(mfsct.check(e,c)){mfsct.remove(e,c);}else{mfsct.add(e,c);}GM_setValue('toggled',n);}
if(!GM_getValue('toggled')){GM_setValue('toggled','0000000');}else{
	var s=GM_getValue('toggled'),e=document.getElementById('primaryfull').getElementsByTagName('table')[0];
	if (s[0]==1) mfsct.add(e,'no-media');
	if (s[1]==1) mfsct.add(e,'no-moving');
	if (s[2]==1) mfsct.add(e,'no-food');
	if (s[3]==1) mfsct.add(e,'no-weapons');
	if (s[4]==1) mfsct.add(e,'no-housing');
	if (s[5]==1) mfsct.add(e,'no-hospitals');
	if (s[6]==1) mfsct.add(e,'no-gifts');
}
GM_registerMenuCommand('Toggle media companies',function(){toggle('no-media',0);},"m","shift alt","m");
GM_registerMenuCommand('Toggle moving companies',function(){toggle('no-moving',1);},"o","shift alt","o");
GM_registerMenuCommand('Toggle food companies',function(){toggle('no-food',2);},"f","shift alt","f");
GM_registerMenuCommand('Toggle weapon companies',function(){toggle('no-weapons',3);},"w","shift alt","w");
GM_registerMenuCommand('Toggle housing companies',function(){toggle('no-housing',4);},"u","shift alt","u");
GM_registerMenuCommand('Toggle hospitals',function(){toggle('no-hospitals',5);},"h","shift alt","h");
GM_registerMenuCommand('Toggle gift companies',function(){toggle('no-gifts',6);},"g","shift alt","g");
var companies=document.getElementById('primaryfull').getElementsByTagName('table')[0].getElementsByTagName('tr');
for(var i=1;i<companies.length;i++){companies[i].className=companies[i].className+' '+companies[i].getElementsByTagName('td')[4].firstChild.firstChild.nodeValue.toLowerCase();}