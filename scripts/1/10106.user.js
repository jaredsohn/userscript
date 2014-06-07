// ==UserScript==

// @name           XL Redirector - kepeto
// @namespace      XL Redirector
// @description    Auto link maker for XL
// @include        *
// ==/UserScript==

// versi 			0.1a
//NOT YET OPTIMIZED!!!
//kalo pingin modif silahkan, tapi jangan lupa naroh KREDIT nya

var kepetologo = "http://img207.imageshack.us/img207/8425/xlkepetoix8.jpg?%";

var title = function()
{
	document.title = document.title+" [XL-Redirector|kepeto]";
}

var iswml = function()
{
	
	if(document.contentType.match(/application\/xhtml\+xml/i)!=null)
		return true;
	else
		return false;
}

var inject = function()
{
	logo = '<div id="t2l-button" style="border: 2px solid rgb(0, 0, 0); padding: 5px; position: fixed; bottom: 40px; right: 10px; background-color: rgb(255, 255, 255); text-align: center;"><p style="margin: 0pt; padding: 0pt; font-family: Arial,Helvetica,sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal; color: rgb(102, 97, 152); text-decoration: none;"><span id="t2l-span-1" style="color: rgb(255, 0, 0); cursor: pointer;"><div align="center"><a href="http://kepeto.profilku.com">XL Redirector|Active</a></div></span></p></div>';
	
	if(iswml()==true)
		logo = '<div align="center"><b>kepeto</b></div>';
	elements = document.getElementsByTagName("body");
	for (i = 0; i < elements.length; i++){
		elements[i].innerHTML = logo+elements[0].innerHTML;
	}
}

var parse_link = function()
{
	var gret = '?%';
	var tag = document.getElementsByTagName('*');
	var x = '';
	for(i=0; i<tag.length; i++)
	{
		if(tag[i].tagName.match(/form/i)!=null)
			tag[i].action += gret;
		if(tag[i].tagName.match(/a/i)!=null)
			tag[i].href += gret;
		if(tag[i].tagName.match(/img/i)!=null)
			tag[i].src += gret;
		if(tag[i].tagName.match(/go/i)!=null)
			tag[i].href += gret;
	}
}

title();
inject();
parse_link();
