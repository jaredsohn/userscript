// ==UserScript==
// @name           e-sąd
// @namespace      StarExterminator
// @description    Skrypt naprawiający niektóre błędy w na stronie e-sądu
// @version        0.01
// @include        https://www.e-sad.gov.pl/uzytkownik/podpisz.aspx?ident=*
// ==/UserScript==

if(unsafeWindow.document.applets[0] && unsafeWindow.document.applets[0].name == 'epuapplet')
{
	unsafeWindow['epuapplet'] = unsafeWindow.document.applets[0];
}
