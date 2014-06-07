// ==UserScript==
// @name		Ebay - Countdown
// @match		http://*/*
// @run-at		document-start
// @version		1.0
// ==/UserScript==

var a = location.toString();

if(	0 == a.search('http://www.ebay.[^./]+/itm/')
||	0 == a.search('http://www.ebay.co.uk(:[0-9]+|)/itm/'))
{
	D = document;
	S = setTimeout;
	Start = new Date;
	A = function()
	{
		if(	'undefined' == typeof C)

			if(	'' == D.title)

				S(A,99);

			else
			{
				C = D.title;

				for(	var a = D.getElementsByTagName('script'), b = a.length - 1; b >= 0; b --)
				{
					var	c = a[b].innerHTML,
						d = c.search("'timeLeftInMins' :"),
						e = c.search("'timeLeftInSec' :"),
						f = c.search('"endTime":');

					if(	0 <= d
					&&	0 <= e)
					{
						d = parseFloat(c.slice(d + 18));
						e = parseFloat(c.slice(e + 17));

						if(	!isNaN(d)
						&&	!isNaN(e))
						{
							Time = (60 * d) + e - 1;
							B();
							break
						}
					}

					else if(0 <= f)
					{
						f = parseFloat(c.slice(f + 10));

						if(	!isNaN(f))
						{
							Time = Math.floor((f - Start.getTime()) / 1E3) - 1;
							B();
							break
						}
					}
				}
			}
	};
	B = function()
	{
		var	a = Time - Math.round((new Date().getTime() - Start.getTime()) / 1E3),
			b = Math.floor((a % 86400) /3600),
			c = Math.floor((a % 3600) / 60),
			d = a % 60;

		if(	0 < a)

			D.title = Math.floor(a / 86400) + ':' + (10 > b ? ('0' + b) : b) + ':' + (10 > c ? ('0' + c) : c) + ':' + (10 > d ? ('0' + d) : d) + ' ' + C,
			S(B,1E3);

		else

			D.title = C
	};
	D.addEventListener('DOMContentLoaded',A)
}