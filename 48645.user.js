// ==UserScript==
// @name VLD Document Sorter
// @namespace HZVLD
// @author drie0025
// @version 0.1
// @description Sorteert documenten van andere gebruikers (dus niet lesmateriaal) op datum in plaats van op naam.
// @include http://infonet.hz.nl/*
// ==/UserScript==

var as = document.getElementsByTagName('a');
var months = new Array( 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' );

if (as.length > 1)
{
	for (var i=0; i < as.length; i++)
	{
		var a = as[i];
		if (a.getAttribute('href') == 'DocumentenMenuBekijk.asp' && a.getAttribute('class') != 'Menu')
		{
			var trs = document.getElementsByTagName('tr');
			var blarg = 0;
			var start = 0;
			for (var j=0; j < trs.length; j++)
			{
				if (blarg == 1)
				{
					j++;
					if (j < trs.length)
					{
						var myrow = trs[j];
						var mydate = myrow.getElementsByTagName('td')[1].innerHTML;
						var myday = Number(mydate.substr(0, 2));
						var mymonth = mydate.substr(3, 3);
						var myyear = Number(mydate.substr(7, 4));
						
						var mytd1 = myrow.getElementsByTagName('td')[0];
						var mytd2 = myrow.getElementsByTagName('td')[1];
						
						for (var m=0; m < months.length; m++)
						{
							if (months[m] == mymonth)
							{
							   mymonth = Number(m);
							}
						}

						for (var k = start; k < j; k = k + 2)
						{
							var thisrow = trs[k];
							var thisdate = thisrow.getElementsByTagName('td')[1].innerHTML;
							var thisday = Number(thisdate.substr(0, 2));
							var thismonth = thisdate.substr(3, 3);
							var thisyear = Number(thisdate.substr(7, 4));
							for (var s=0; s < months.length; s++)
							{
								if (months[s] == thismonth)
								{
								   thismonth = Number(s);
								}
							}

							var thistd1 = thisrow.getElementsByTagName('td')[0];
							var thistd2 = thisrow.getElementsByTagName('td')[1];
											
							if ((myyear < thisyear) || (myyear == thisyear && mymonth > thismonth) || (myyear == thisyear && mymonth == thismonth && myday > thisday))
							{
								myrow.nextSibling.parentNode.insertBefore(myrow.nextSibling, thisrow);
								myrow.parentNode.insertBefore(myrow, thisrow.previousSibling);		
								break;			
							}

						}
						
					}
				}
				else
				{
					var tds = trs[j].getElementsByTagName('td');
					if (tds[0].innerHTML == 'Document' && tds[1].innerHTML == 'Geplaatst')
					{
						blarg = 1;
						start = j + 2;
					}
				}
			}
		}
	}
}