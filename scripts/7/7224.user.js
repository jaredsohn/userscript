// Greasemonkey user script - phpBB DR Spam Killer
//
// This script adds an ignore feature to the DR Board.
//
// Click on a poster's name in the forum list, and posts
// started by the user are removed. Click on the name in
// a forum topic, the post is removed. 
// click on "reset spammer list" at the bottom of the page
// to allow all the spammers back.
//
// Written by Jeff Bell 
//
// ==UserScript==
// @name          DR Spam Killer
// @namespace     belljw.com
// @include       http://2cents.dailyreckoning.com/viewforum.*
// @include       http://2cents.dailyreckoning.com/viewtopic.*
// @description	  DR Spam Killer
// @exclude
// ==/UserScript==

(function() {

	// ** JB: I swiped this from some other phpBB script and modified it.
	// Since it's executed oly on the DR site, it's not really needed. But
	// it could be ueful inthe future.

  // Here we look for the "Powered by phpBB" at the bottom of all phpBB pages.

	var alllinks =  document.getElementsByTagName("A");
	for (var i = (alllinks.length-1); i > (alllinks.length-20) ; i--)	// Only test the last 20 links on a page, for speed.
		if ((alllinks[i].className == "copyright") && (alllinks[i].href == "http://www.phpbb.com/") && (alllinks[i].firstChild.data == "phpBB")  && alllinks[i].previousSibling.data.match(/Powered by/) ) {

		  a = document.getElementsByTagName('BODY')[0];
		  b = document.createElement('INPUT');
		  b.textContent = 'reset spammer list';
		  b.defaultValue = 'reset spammer list';
		  a.appendChild(b);

			// main page
			if (document.baseURI[37] == 'f') {
			  KillSpammers();
			}
			else { // topics
				KillTopicSpammers();
			}

		  ClickOnName();
		  break;
    }


})();

function ClickOnName()
{

	document.addEventListener('click', function(event) {
		
		//GM_log('xClickOnName');



		var a = event.target.parentNode;
		var b = a.parentNode;

		//GM_log(a.className);
		//GM_log(a.tagName);
		//GM_log(document.baseURI[37]);
		//GM_log(b.className);


		if ((b.className == 'row3') && (event.target.textContent.length > 0) && (document.baseURI[37] == 'f') ) {
			
			a = event.target.textContent;

			//GM_log(a);

			x = GetSpammers();

			for (i = 0; i < x.length; i++) {
				if (x[i] == a)
					break;
			}

			x[i] = a;

			PutSpammers(x);
			KillSpammers();

			event.stopPropagation();
			event.preventDefault();
		}
		else if ( (a.className == 'name') && (a.tagName == 'SPAN') && (document.baseURI[37] == 't') ) {
			a = a.getElementsByTagName('B')[0];
			a = a.textContent;
			//GM_log(a);
			if (a.length > 0) {

			x = GetSpammers();

			for (i = 0; i < x.length; i++) {
				if (x[i] == a)
					break;
			}

			x[i] = a;

			PutSpammers(x);
			KillTopicSpammers();

				event.stopPropagation();
				event.preventDefault();
			}
		}
		else {
		
			a = event.target;
			if (a.nodeName == 'INPUT') {
			
				if (a.textContent = 'reset spammer list') {
					document.cookie ='spammers=wik; expires=Fri, 3 Aug 2021 20:47:11 UTC; path=/';
					event.stopPropagation();
					event.preventDefault();
					window.location.reload();
				}

			}

		}


	}, true);
}

function GetSpammers()
{

	var x, y;
	var z = [];

	//GM_log('GetSpammers');

	//GM_getValue('Spammers',x);

	var i, j;


	var nameEQ = 'spammers=';

	var ca = document.cookie.split(';');

	for(i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) {
			x = c.substring(nameEQ.length,c.length);
			break;
		}
	}


	//GM_log(x);

	z = x.split('|');


	return z;
}


function PutSpammers(z)
{
	var y = '';

	//GM_log('PutSpammers');

	for (var i = 0; i < z.length; i++) {

		if (z[i].length == 0)
			continue;

		//GM_log(z[i]);
	
		y = y + z[i];
		y = y + '|';
	
	}

	//GM_log(y);

	var cc = 'spammers=';
	cc = cc + y;
	cc = cc + '; expires=Fri, 3 Aug 2021 20:47:11 UTC; path=/';

	document.cookie = cc;

//	GM_setValue('Spammers',y);
}

function KillSpammers()
{

	//GM_log('kill spammers');

	var s = GetSpammers();

	var a,b,c,x;
	c = '$$$$';
	a = document.getElementsByTagName('TR');

	for (var i = 0; i < a.length; i++) {

		if (a[i].previousSibling == null)
			continue;

		b = a[i].getElementsByTagName('TD');

		for (var j = 0; j < b.length; j++) {

			if (b[j].className == 'row3') {
			
				c = b[j].getElementsByTagName('A')[0].text;

				for (var si = 0; si < s.length; si++) {
					if (c == s[si]) {

						x = a[i];

						//x.previousSibling = 
						//	x = x.nextSibling.nextSibling;

						x.parentNode.removeChild(x.nextSibling);
						x.parentNode.removeChild(x);
						a = document.getElementsByTagName('TR');
						i = 0;
						break;

					}
				}

				break;
			}
		}
	}
}

function KillTopicSpammers()
{

	//GM_log('kill topic spammers');

	var s = GetSpammers();

	a = document.getElementsByTagName('SPAN');

	for (i = 0; i < a.length; i++) {
		if (a[i].className == 'name') {

			c = a[i].getElementsByTagName('B')[0].textContent;
			//GM_log('wikwik');


			for (var si = 0; si < s.length; si++) {
				if (c == s[si]) {

					x = a[i].parentNode.parentNode;
					y = x.nextSibling;
					

					p = x.parentNode;

					for (r = 0; r < 6; r++) {
						p.removeChild(x);
						x = y;
						y = x.nextSibling;
					}


					a = document.getElementsByTagName('SPAN');
					i = 0;
					break;

				}
			}
		}
	}
}
