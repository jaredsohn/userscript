// ==UserScript==
// @name          Torrentz IMDB
// @description   Adds linkage to imdb.com on torrentz.com for aXXo and KLAXXON 
// @include       *www.torrentz.com/*
// @include       *superfundo.org/*
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
		if(descText[0].innerHTML.match(/aXXo/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('DvDrip'));
			temp = temp.replace(/\[/, ' (');
			temp = temp.replace(/\]/, ')');
			temp = temp.replace(/\./g, ' ');
			a.href = 'http://imdb.com/find?s=all&q='+temp;
			link = true;
		}
		else if(descText[0].innerHTML.match(/KLAXXON/))
		{
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.substring(0, temp.indexOf('KLAXXON'));
			a.href = 'http://imdb.com/find?s=all&q='+temp;
			link = true;
		}
		if(link)
		{
			a.target = '_blank';
			img = document.createElement('img');
			img.src = 'http://skypher.com/Cipher/Greasemonkey/imdb.png';
			img.style.border = 'none';
			img.style.padding = '0 0 0 2px';
			a.title = 'Lookup "'+temp+'" on imdb.com';
			a.appendChild(img);
			a_dt[i].appendChild(a);
		}
	}
}
else if(siteString.indexOf('superfundo.org/download') > 1)
{
	//alert('analyzing');
	trs = document.getElementsByTagName('td');//.firstChild();
	
	//trs = tablet.getElementsByTagName('tr');
	a_dt = new Array();
	for(i=1; i<trs.length; i++)
	{
		if(trs[i].className == 'autoindex_td_right')
		{
			a_dt.push(trs[i]);
		}
	}
	//alert(a_dt.length);
	for(i=0; i<a_dt.length; i++)
	{
		a = document.createElement('a');
		link = false;
//(i>2) break;
		
		descText = a_dt[i].getElementsByTagName('a');
		if(descText[0].innerHTML.match(/aXXo/))
		{
			temp = descText[0].textContent;
			//alert(temp);
			temp = temp.substring(0, temp.indexOf('DvDrip'));
			temp = temp.substring(10, temp.length);
			temp = temp.replace(/\[/, ' (');
			temp = temp.replace(/\]/, ')');
			temp = temp.replace(/\./g, ' ');
			a.href = 'http://imdb.com/find?s=all&q='+temp;
			link = true;
		}
		else if(descText[0].innerHTML.match(/KLAXXON/))
		{
			temp = descText[0].textContent;
			temp = temp.substring(0, temp.indexOf('KLAXXON'));
			temp = temp.substring(10, temp.length);
			a.href = 'http://imdb.com/find?s=all&q='+temp;
			link = true;
		}
		if(link)
		{
			a.target = '_blank';
			img = document.createElement('img');
			img.src = 'http://skypher.com/Cipher/Greasemonkey/imdb.png';
			img.style.border = 'none';
			img.style.padding = '0 0 0 2px';
			//a.title = 'Lookup "'+temp+'" on imdb.com';
			a.appendChild(img);
			a_dt[i].appendChild(a);
		}
		
	}
}