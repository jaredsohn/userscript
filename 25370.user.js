// ==UserScript==
// @author         mungushume  
// @version        1.0.4
// @name           IMDb Search A2f
// @namespace      http://www.monkeyr.com
// @description    Adds title search links to the most popular torrent sites. Imdb torrent search scriptinin düzenlenmiş halidir.
// @include        http://www.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==
/*

v1.0.4 - 10 Feb 2008
 - Added the pirate bay back in after FaeGiN's comments

v1.0.3 - 25 Jan 2008
 - Removed the pirate bay and torrentspy links in favour of torrentz and youtorrent 
 
v1.0.2 - 20 Aug 2007
 - Changed the link to The Pirate Bay to only show videos/movies. 
 - Changed the link to mininova to only show videos/movies. 
 	Thanks Dave Charlesworth! I really should have done a little more research!
 	
 - Outstanding. torrentspy needs the same thing doing but looks like you need to post
 	to the advanced search page to get any results displayed. I will look into this 
 	when i have more time. Works reasonably well as it is though.

v1.0.1 - 19 Aug 2007
 - Changed the link to isohunt to only show videos/movies. Thanks Idiomatic!

*/

var tr = document.evaluate ("//div[@class='strip toplinks']/table/tbody/tr", document, null,
									XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var title = document.evaluate ("//div[@id='tn15title']/h1", document, null,
									XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var adres=window.location.href;
var ilk='imdb.com/title/';
var imdbKod=adres.substring(adres.indexOf(ilk)+15);

if(imdbKod.indexOf('/')>0)
imdbKod=imdbKod.replace('/','');	
									
if(tr && title)
{
	var title = title.cloneNode(true);
	var span = document.evaluate (".//span", title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(span)
	{
		title.removeChild(span);
	}
	var txt = title.innerHTML;
	txt = txt.replace(/^\s+|\s+$/g, ''); //trim the title
	txt = txt.replace(/\s/g, "+"); //replace spaces with +'s
	txt = txt.replace(/[\?#]!"/g, ""); //remove bad chars

	tr = tr.parentNode.insertBefore(document.createElement("tr"), tr);

//	var img = "data:application/octet-stream;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D";
//	buildCell(tr, "ThePirateBay","http://thepiratebay.org/search/"+txt+"/0/7/200", img);

 	var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jWWSa0jTURjGf+fftv+slW5O02mpZEhmWJhF2YUCo5KCosQuYGVgUVFYRPSh6EoRBVlQRPQpELvZ1UJMK03IrlbeyjScZhenbVluzu30oZw6X3jgnPec5znneXkEIPCrzzV7w0qfPEuo+/Aj1uWC6cmBzW63q6b8fGXLhZf0+t8XfcjNjVVfVmSeOXY4xa2qSPgHvV6RazNiZWPdplpr04W5Azk+gcLCRSF1b7Jfr82YIAFpMuokIKOjRsjCm+ny7fMsaWvbL9vbjnlsbafX9/EUgEu5s80nT1SV37hdMznvai0ABoOG8eNMZGUm8qDoPcHmYEAgcCrw6+KzstUrAIYBosctLxeVtKY8LG1Gyn++7A43lnAVu72LJWkTiYuL+e8IwCtU1TD9t7P8rLh/a2HchuxHdW1fnYMGo9EIli2NITLChBASVaewM2fx/6kJBApfvr5boCl7+j3DnwwQPTYQu72byhfVBOg1eLyCdZnJmM2hAEjpISQ4YZrmfXV7kD85db6Fc2eWYxg5gu/fOqmutfKpoQOHo5vHZa+w2f4QYRlJQrwlXuNyuYe8HhM1CqPJDEBEZAARkRZ653k4eCifopIvfGzoAmDTxslBSnSU2esvcLWgic1b86iqavD17I4e8q83+sgAOq2nRUlKDLodoFcGCXT+dHHlej1btt/hl6MTEOzafY12W38ItVqYGG8qVrp6myqnTjG/GuID+NjYhdMJ0gtvqloHnSUnhbYYR/fcBRDncudMMRpVN/THtw8F+atkU/0eqdP190YHq54j+5LSGBjlrPWTssPDAz3+Atu2zJBrMib59mEhes/RXcm+KDNgIa7k7UhbszLRahyuDPmJwaCVC1PHfDp+ICV1IMen0ldW6yl9RUlR+q179bNc3V6Loh2OJSyweea0sOLWjheFOTktg1L3F21WIL5Z0YKNAAAAAElFTkSuQmCC";
 	buildCell(tr, "ShareBus","http://www.sharebus.com/index.php?act=Search&CODE=01&forums=all&keywords="+imdbKod, img);

	var img = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAptJREFUOE9j/P/h8fdu1ycvXrIwMzMy/P/HwMTE8P8/AxRAGIwMDH///pGVlGCvOsrwpUzJPqeWp3S1UMkyodLlQqXLhEuXAxGIXQJlC5Yu4y1b7ZFd9rNCieF6hoxs41atxrXajWu0G1ZrNazWqF+lVrsKyNBuAInoNK7RBAo2rJVt2PQgTZjhXq68ZNUa1sw5HFlz2DNnCxbMN21d59CzSbNuJWvGLKAgkOTOmatWt8qyZ9uTTFGGO1lyzlP2/oeBG8/fe07aZta23r57E1wQyMhZflSjacPLHAmGR3mK7tP2A4UaNp3OXnbk1advQLZ+0xq3CVuBjEl7L2csObTpwgMgW6lu7etcCYanhUo+Mw8C+UYtaxPm71eqWgZkpy855AHWYNyyDsjQql8JZOetPv0CaMPLYmX/2YeAfOfeza1bzxk0rQGyJ+657A7WsOzkrZatZ4/ffQFkG7Rt/lwkw/CuTC10/hEg32/qjvlHb2jXrwKye3ddCJy2A8j48evPh28/P3//Vbr2ZOKSY5+KpBk+VahHLzoGlAMGi0HT6qatZ4Hs2Ln7YueCQsK1f0vk7D0xc/fWbz47+/i9T4XSDN+qNeKXnkQOkEuP3yQs2J+6COSxxAX7d155tO7cvfXnHyw/+/hLsQzDr1qtyIXH0hYfTlt8EBggSQv2pyw6AHQ0MACAIqmLDx64+RSoZ8fVx9uvv/haLMvwvVr9zLMvJ+6/OnnvJRCdffj68pO3Zx68Ov/o9Yl7L4Hk6fuvQOjB6xOPPnwrkWX4Uatz4+P/268+3X718fbLj7eQEDL35qvPN9///lUuz/CvQOjt7fMvf/9/9R03+vEfqODttWP/8gQY/r+89b9R91+99r8GHXyoXvt/g87/d48BlSDxbEiqmwkAAAAASUVORK5CYII=";
	buildCell(tr, "DivxPlanet","http://www.divxplanet.com/index.php?arama="+imdbKod+"&page=arama", img)

	var img = "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAeP%2FPAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2FVAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FAF9%2F%2F8Bff%2F%2FAX3%2F%2FwF9%2F%2F8BZc%2F%2FAV6%2F%2FwF17%2F8Bff%2F%2FAX3%2F%2FwF9%2F%2F8hjf%2F%2FQZ7%2F%2FyGN%2F%2F8Bff%2F%2FAX3%2F%2FwF9%2F%2F8BgP%2F%2FAYD%2F%2FwGA%2F%2F8BgP%2F%2FACBA%2FwAAAP8BYL%2F%2FAYD%2F%2FwGA%2F%2F8BgP%2F%2FgMD%2F%2F%2F%2F%2F%2F%2F%2BAwP%2F%2FAYD%2F%2FwGA%2F%2F8BgP%2F%2FAYP%2F%2FwGD%2F%2F8Bg%2F%2F%2FAYP%2F%2FwAhQP8AAAD%2FAWK%2F%2FwGD%2F%2F8Bg%2F%2F%2FAYP%2F%2F4DB%2F%2F%2F%2F%2F%2F%2F%2FgMH%2F%2FwGD%2F%2F8Bg%2F%2F%2FAYP%2F%2FwKH%2F%2F8Ch%2F%2F%2FAof%2F%2FwKH%2F%2F8BIkD%2FAAAA%2FwFlv%2F8Ch%2F%2F%2FAof%2F%2FwKH%2F%2F%2BBw%2F%2F%2F%2F%2F%2F%2F%2F4HD%2F%2F8Ch%2F%2F%2FAof%2F%2FwKH%2F%2F8Ci%2F%2F%2FAov%2F%2FwKL%2F%2F8Ci%2F%2F%2FASNA%2FwAAAP8BaL%2F%2FAov%2F%2FwKL%2F%2F8Ci%2F%2F%2FgcX%2F%2F%2F%2F%2F%2F%2F%2BBxf%2F%2FAov%2F%2FwKL%2F%2F8Ci%2F%2F%2FA4%2F%2F%2FwOP%2F%2F8Dj%2F%2F%2FA4%2F%2F%2FwASIP8AAAD%2FAlmf%2FwOP%2F%2F8Dj%2F%2F%2FA4%2F%2F%2F4HH%2F%2F%2F%2F%2F%2F%2F%2Fgcf%2F%2FwOP%2F%2F8Dj%2F%2F%2FA4%2F%2F%2FwOT%2F%2F8Dk%2F%2F%2FA5P%2F%2FwJ3z%2F8AAAD%2FAAAA%2FwEuUP8Dk%2F%2F%2FA5P%2F%2FwOT%2F%2F%2BByf%2F%2F%2F%2F%2F%2F%2F4HJ%2F%2F8Dk%2F%2F%2FA5P%2F%2FwOT%2F%2F8El%2F%2F%2FBJf%2F%2FwSX%2F%2F8CS3%2F%2FAAAA%2FwAAAP8ACRD%2FBJf%2F%2FwSX%2F%2F8El%2F%2F%2Fgsv%2F%2F%2F%2F%2F%2F%2F%2BCy%2F%2F%2FBJf%2F%2FwSX%2F%2F8El%2F%2F%2FBJv%2F%2FwSb%2F%2F8Em%2F%2F%2FAR0w%2FwAAAP8AChD%2FAAAA%2FwNqr%2F8Em%2F%2F%2FBJv%2F%2F4LN%2F%2F%2F%2F%2F%2F%2F%2Fgs3%2F%2FwSb%2F%2F8Em%2F%2F%2FBJv%2F%2FwWf%2F%2F8Fn%2F%2F%2FBIvf%2FwAAAP8AChD%2FAk9%2F%2FwAAAP8CRnD%2FBZ%2F%2F%2F0S3%2F%2F%2Bh2%2F%2F%2F%2F%2F%2F%2F%2F6Hb%2F%2F9Et%2F%2F%2FFaX%2F%2FwWf%2F%2F8Fov%2F%2FBaL%2F%2FwNbj%2F8AAAD%2FAjNQ%2FwR5v%2F8AAAD%2FARQg%2FwWi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F0S5%2F%2F8Fov%2F%2FBaX%2F%2FwWl%2F%2F8DZ5%2F%2FAlJ%2F%2FwR8v%2F8Fpf%2F%2FAlJ%2F%2FwJSf%2F8Fpf%2F%2FgtL%2F%2F4LS%2F%2F%2BC0v%2F%2FgtL%2F%2F4LS%2F%2F8ksP%2F%2FBaX%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8Gqv%2FhBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2FnAABpYwAAdC4AAGF0AABsYQAAL2sAAD4KAAAJCQAAbnQAAGVyAAA8LwAAdGUAAHI%2BAAAJCQAAZGkAAD4KAAA8Lw%3D%3D";
	buildCell(tr, "youtorrent","http://www.youtorrent.com/tag/?q="+txt, img)

	var img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e%2F5%2BfUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N%2FMu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7%2BviadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7%2B%2FqUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj%2Fl2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC%2FrZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx%2FwAA8f8AAPH%2FAACR%2FwAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA%2F%2FEAAP%2FwAAD%2F%2BQAA";
	buildCell(tr, "isohunt","http://isohunt.com/torrents/"+txt+"?ihs1=2&iho1=d&iht=1", img)

	var img = "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ%2BRgDx0MEA%2FPLxAP%2F99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL%2BEzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
	buildCell(tr, "mininova","http://www.mininova.org/search/"+txt+"/4/seeds", img)

}

function buildCell(container, text, href, image)
{
	var a = document.createElement("a");
	a.href = href; 
	a.setAttribute("target","_blank");
	var img = document.createElement("img");
	img.src = image;
	with(img.style)
	{
		marginRight = "3px";
		border = "0";
	}
	a.appendChild(img);
	var txt = document.createTextNode(text);
	var b = document.createElement("b");
	b.appendChild(txt);
	a.appendChild(b);
	container.insertCell(0).appendChild(a);
}