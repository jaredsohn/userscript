// ==UserScript==
// @name           allegro foto
// @namespace      c:\af.user.js
// @description    wylacza automatyczny filtr "kup teraz dla kategorii foto"
// @include        http*://*allegro.pl*
// ==/UserScript==

(function(){

function allegrofoto()
{
  for(var i = 0; i < document.links.length; i++)
  {
	if (document.links[i].href =="http://allegro.pl/obiektywy-50590" || 
		document.links[i].href =="http://allegro.pl/fotografia-obiektywy-50590")
		document.links[i].href = "listing.php/showcat?id=50590&buy=0&change_view=1";
	if (document.links[i].href =="http://allegro.pl/aparaty-fotograficzne-cyfrowe-8942")
		document.links[i].href = "listing.php/showcat?id=8942&buy=0&change_view=1";
	if (document.links[i].href =="http://allegro.pl/lampy-blyskowe-urzadzenia-53191")
		document.links[i].href = "listing.php/showcat?id=53191&buy=0&change_view=1";
	if (document.links[i].href =="http://allegro.pl/komputery-stacjonarne-486" || 
		document.links[i].href =="http://allegro.pl/komputery-komputery-stacjonarne-486")
		document.links[i].href = "listing.php/showcat?id=486&buy=0&change_view=1";
	if (document.links[i].href =="http://allegro.pl/laptopy-491" || 
		document.links[i].href =="http://allegro.pl/komputery-laptopy-491")
		document.links[i].href = "listing.php/showcat?id=491&buy=0&change_view=1";
	if (document.links[i].href =="http://allegro.pl/dyski-i-napedy-dyski-zewnetrzne-77939")
		document.links[i].href = "listing.php/showcat?id=77939&buy=0&change_view=1";
	if (document.links[i].href =="http://allegro.pl/tusze-zamienniki-9110")
		document.links[i].href = "listing.php/showcat?id=9110&buy=0&change_view=1";
	
	
	
	if ((document.links[i].href.search('search?')!=-1) && (document.links[i].href.search('buy=')==-1))
	{
		if ((document.links[i].href.search('category=50590')!=-1) ||
			(document.links[i].href.search('category=8942')!=-1) ||
			(document.links[i].href.search('category=53191')!=-1) ||
			(document.links[i].href.search('category=486')!=-1) ||
			(document.links[i].href.search('category=491')!=-1) ||
			(document.links[i].href.search('category=77939')!=-1) ||
			(document.links[i].href.search('category=9110')!=-1))
			document.links[i].href+='&buy=0';
	}
	
  }

}
allegrofoto()

})();
