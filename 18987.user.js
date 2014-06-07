// ==UserScript==
// @name           spoiler butonu
// @namespace      http://www.itusozluk.com/userinfo.php?user=togisama
// @include        http://www.itusozluk.com/*
// @desription     itüsözlük için giri kismindaki spoilerları sarmalama butonu ekleme aparati
// ==/UserScript==

var form,but, element,i;
form = document.getElementById("entryform");
but = form.getElementsByTagName("INPUT");

if (but) {
	for (i = 0; i < but.length; i++)
	{
		if(but[i].value=="``")
		{
			element = document.createElement("input");
		    element.setAttribute("class", "but");
		    element.setAttribute("type", "button");
			element.setAttribute("value", "---spoiler---");
			element.setAttribute("title", "spoiler ver");
			element.setAttribute("style", "font-size:10px;float:left;width:70px;");
			element.addEventListener('click',myhen,true);
			but[i].parentNode.insertBefore(element, but[i].nextSibling);
		}
	}
}

function myhen(event)
{
var k=document.getElementById('entry');
var a="--- `spoiler` ---\n\n";
var b="\n\n--- `spoiler` ---";
if(document.selection && !window.opera)
{
	var tn=document.selection.createRange();
	if(tn.parentElement()==k)
	{ 
		tn.text = a+tn.text+b;
		tn.select();
	} 
	else alert("önce bakınız vermek istediğiniz metni seçiyorsunuz.");
}
else if(k.selectionStart||k.selectionStart=='0')
{
	var u = k.value;
	var end = k.selectionEnd;
	var start = k.selectionStart;
	k.value = u.substring(0,start)+a+u.substring(start,end)+b+u.substring(end);
	end += a.length+b.length;
	k.setSelectionRange(end, end);
} 
else k.value += a+b;
k.focus();

	event.preventDefault();
}
