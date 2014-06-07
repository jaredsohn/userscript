// ==UserScript==
// @name            WykopaliskoOnePage
// @description    Robi jedna strone z calego wykopaliska
// @namespace     wykop.pl
// @include       *wykop.pl/wykopalisko*
// ==/UserScript==
var howMuch = 2;
var howMuchDone =0;

//ile juz dodalismy podstron?
var added=0;
$ = unsafeWindow.jQuery;
$(document).ready(function()
{
	var pages = $('.pager a');
	pages.sort(linksort);

	
	//dodajemy podstrony od nastepnej (liczac od biezacej)
	for (var i=getNextPageFromHere(pages); i < pages.length; i++)
	{
		var page = pages[i];
		
		//kazdy link przechodzimy tylko raz. Duplikaty sa spowodowane przyciskami"poprzedni", "nastepny"
		var seen =0;
		for (var j=0; j<i; j++)
		{
			if (pages[i].href==pages[j].href)
			{
				seen=1;
				break;
			}
		}
		
		//jesli jeszcze jakiegos linku nie przechodzilismy, przejdzmy
		if (seen ==0)
		{
			addPage(page.href);
			added++;
		}
		//jesli nie chcemy dodawac calego wykopaliska, a juz dodalismy tyle ile trzeba
		if(added >=howMuch && howMuch >0)
		{
			break;
		}
	}
	toiletFlush();
	
	//zmieniamy linki na dole, wycinajac niepotrzebne linki do podstron, ktore juz sciagnelismy
	changePagination(howMuch);
});

function changePagination(hm)
{
	if (hm >0)
	{
		var whereAreWe = getHere();
		$('.pager a').each(function()
		{
			var indexArr = this.href.match(/strona\/(\d+)/);
			var index = parseInt(indexArr[1]);
			if ( ( (index-whereAreWe)% (hm+1) != 0) && index !=1)
			{
				$(this).parent().remove();
			}
			else
			{
				$(this).find('em').text(index + ' - ' + (index+hm));
			}
		
		});
		//usuwamy przycisk "poprzedni", ktory czasami potrafi zostac
		$('.prev-site').parent().remove();
	}
	else
	{
		//jesli wszystko sciagnelismy, nie mamy gdzie przejsc
		$('.pager').remove();
	}
}

function addPage(link)
{
$.get(link, function(data) {
	$('.entry',data).children().each(function(index) {
	//dodajemy na koncu listy nowe wykopy
	$('.entry').append(this);
  });
  
   howMuchDone++;
   if (howMuchDone==howMuch || howMuchDone == added)
   {
        $('a.jvote').unbind();
 	$(".jbury li").unbind();
	$("ol.entry > li blockquote > div > ul.options > li ul.slide-list > li > a").unbind();
   	$.getScript('http://s1.imgwykop.pl/js/core_build_no_269.js', function() {

});

  	//czyscimy dodane wykopy z gowna
	toiletFlush();
   }
});
}


//zwraca numer strony na ktorej jestesmy lub 1, gdy nie moze go znalezc
function getHere()
{
	var current = window.location.href.match(/strona\/(\d+)/);
	var toFind = 1;
	//jak wchodzimy na wykopalisko z glownej to nie ma "stona/1" w linku
	if (current != null)
	{
		toFind = parseInt(current[1]);
	}
	return toFind;
}

function getNextPageFromHere(pages)
{
	
	var toFind = getHere() +1;
	
	//przeszukujemy wszystkie linki, az znajdziemy taki do strony kolejnej
	for (var i =0; i<pages.length;i++)
	{
		var indexArr = pages[i].href.match(/strona\/(\d+)/);
		var index = parseInt(indexArr[1]);
		// jesli adres sie zgadza, zwracamy pozycje w tablicy
		if (index == toFind)
		{
			return i;
		}
	}
	//nic nie znalezlismy, moze jestes na ostatniej podstronie
	return pages.length;
}

function linksort(a2,b2)
{
	//http://www.wykop.pl/wykopalisko/strona/2/
	//porownujemy numery stron
	var c = a2.href.match(/strona\/(\d+)/);
	var d = b2.href.match(/strona\/(\d+)/);
	var a=parseInt(c[1]);
	var b=parseInt(d[1]);
	if (a > b)
	{
		return 1;
	}
	if (b>a)
	{
		return -1;
	}
	return 0;

}

//wywalamy syf, z wykopaliskoToiletFlush
function toiletFlush()
{
	var ratio = 2;
	var minimum = 3;
	$('li.sponsoredby').remove();
	$('.entry').children().each(function()
	{
		//wykopy
		var wykopy = parseInt($(this).find('.votecount').text());
		//zakopy
		var zakopy = parseInt($(this).find('em').find('strong').text());
		if ((wykopy < 100 && (zakopy >= minimum && wykopy < ratio*zakopy)) || ($(".user-panel").length>0 && $(this).find('.digin').length==0))
		{
			$(this).remove();
		}
	});
}
