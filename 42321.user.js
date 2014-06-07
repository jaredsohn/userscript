// ==UserScript==
// @name           Search for TV episodes on TV Calendar at Binsearch and torrent sites
// @namespace      http://world3.net
// @description    Adds 'search' links to every episode
// @include        http://www.pogdesign.co.uk/cat/*
// ==/UserScript==
/* */

var allSpans;
var lastName;
var loops;

//allSpans = document.getElementsByClassName('seasep');
allSpans=document.getElementsByTagName('a');

function padZeros(theNumber, max) { var numStr = String(theNumber); while ( numStr.length < max) { numStr = '0' + numStr; } return numStr; }

for (var i = 0; i < allSpans.length; i++ )
{
	if(allSpans[i].text.indexOf("Ep:") != -1)
	{
		newline = document.createElement('br');
		gap = document.createElement('span');
		gap.setAttribute('class', 'seasep');
		gap.innerHTML = ' / ';
		gap2 = document.createElement('span');
		gap2.setAttribute('class', 'seasep');
		gap2.innerHTML = ' / ';
		gap3 = document.createElement('span');
		gap3.setAttribute('class', 'seasep');
		gap3.innerHTML = ' / ';

		var ep = allSpans[i].textContent.match(/S: ([0-9]+) - Ep: ([0-9]+)/);

		search = document.createElement('a');
		search.style.color = 'lightblue';
		search.style.textDecoration = 'underline';
		search.appendChild( document.createTextNode('(BS)') );
		search.setAttribute('href', 'http://binsearch.net/index.php?q=' + lastName + ' S' + padZeros(ep[1],2) + 'E' + padZeros(ep[2],2) + ' 720p'+ '&max=100&adv_age=120');

		search3 = document.createElement('a');
		search3.style.color = 'lightblue';
		search3.style.textDecoration = 'underline';
		search3.appendChild( document.createTextNode('(BTJ)') );
		search3.setAttribute('href', 'http://btjunkie.org/search?q=' + lastName + ' S' + padZeros(ep[1],2) + 'E' + padZeros(ep[2],2) + ' 720p');

		search4 = document.createElement('a');
		search4.style.color = 'lightblue';
		search4.style.textDecoration = 'underline';
		search4.appendChild( document.createTextNode('(TZ)') );
		search4.setAttribute('href', 'http://www.torrentz.com/search?q=' + lastName + ' S' + padZeros(ep[1],2) + 'E' + padZeros(ep[2],2) + ' 720p');

		allSpans[i].parentNode.appendChild( newline );
		allSpans[i].parentNode.appendChild( search );
		allSpans[i].parentNode.appendChild( gap );
		allSpans[i].parentNode.appendChild( search3 );
		allSpans[i].parentNode.appendChild( gap2 );
		allSpans[i].parentNode.appendChild( search4 );
		// allSpans[i].parentNode.appendChild( gap3 );
		// allSpans[i].parentNode.appendChild( search2 );

	}
	else
	{
		// Get the program name from previous-previous element
		//prev = allSpans[i].previousSibling;
		//lastName = prev.previousSibling.text;
		lastName = allSpans[i].text;
	}
}
