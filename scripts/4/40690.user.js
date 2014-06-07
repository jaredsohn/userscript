// ==UserScript==
// @name           itu sozluk turkcelesir butonu
// @namespace      http://www.itusozluk.com/userinfo.php?user=togisama 
// @description    girilerinizi bir cirpida turkcelestiriviri buton c_=ç g_=ğ s_=ş i_=ı o_=ö u_=ü
// @include        http://www.itusozluk.com/*
// ==/UserScript==

var form,but, element,i;
but = document.getElementById("sub");

if (but) {
			element = document.createElement("input");
		    	element.setAttribute("class", "but");
		    	element.setAttribute("type", "button");
			element.setAttribute("value", "Türkçe");
			element.setAttribute("title", "giriyi türkçeleştir");
			element.setAttribute("style", "font-size:11px;float:left;width:40px;");
			element.addEventListener('click',myhen,true);
			but.parentNode.insertBefore(element, but);
}

function myhen(event)
{
	var k=document.getElementById('entry');

	if(!k)
		var k=document.getElementById('d');

	var txt=k.value;

	txt=r(txt,'c_','ç');
	txt=r(txt,'g_','ğ');
	txt=r(txt,'s_','ş');
	txt=r(txt,'i_','ı');
	txt=r(txt,'o_','ö');
	txt=r(txt,'u_','ü');

	k.value=txt;

	k.focus();
	event.preventDefault();
}

function r(dd,s,t) 
{ // Replace search string with translation
	if (s==t) 
		return (dd); 
	
	else 
	{
		var RegExpr = new RegExp(s,"g");
		return (dd.replace(RegExpr,t));
    }
}
