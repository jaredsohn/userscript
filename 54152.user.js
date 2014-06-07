// ==UserScript==
// @name           Torrentz YouTube Trailers
// @namespace      http://userscripts.org/scripts/show/54152
// @description    Adds links to YouTube movie trailers for torrentz.com movie listings
// @include        http://www.torrentz.com/*
// ==/UserScript==


//alert(a_dt[5].innerHTML);
siteString = window.location.toString();
if(siteString.indexOf('torrentz.com') > 1)
{
	a_dt = document.getElementsByTagName('dt');
	for(i=0; i<a_dt.length; i++)
	{
		a = document.createElement('a');
		link = false;
		descText = a_dt[i].getElementsByTagName('a');
		if(descText[0].innerHTML.match(/DVD/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('DVD'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/Dvd/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('Dvd'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/DvD/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('DvD'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/dvd/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('dvd'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/XVID/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('XVID'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/XviD/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('XviD'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/XViD/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('XViD'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/Xvid/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('Xvid'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}
            if(descText[0].innerHTML.match(/xvid/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('xvid'));
			a.href = 'http://www.youtube.com/results?search_query=trailer+'+temp;
			link = true;
		}

		if(link)
		{
			a.target = '_blank';
			img = document.createElement('img');
			img.src = 'http://www.cameronowen.net/youtube.png';
			img.style.border = 'none';
			img.style.padding = '0 0 0 4px';
			a.title = 'Trailers "'+temp+'" on youtube.com';
			a.appendChild(img);
			a_dt[i].appendChild(a);
		}
	}
}